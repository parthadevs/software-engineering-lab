import type { Message, Sender } from "../examples/sender.ts";
import { EmailSender } from "../examples/sender.ts";
import {
  WithRetry,
  WithLogging,
  DeliveryError,
} from "../examples/composition.good.ts";

export class WithTimeout implements Sender {
  private readonly inner: Sender;
  private readonly ms: number;

  constructor(inner: Sender, ms: number) {
    this.inner = inner;
    this.ms = ms;
  }

  get channel(): string {
    return this.inner.channel;
  }

  async send(m: Message): Promise<void> {
    let timer: ReturnType<typeof setTimeout>;

    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        reject(
          new DeliveryError(this.channel, true, `Timed out after ${this.ms}ms`),
        );
      }, this.ms);
    });

    try {
      await Promise.race([this.inner.send(m), timeout]);
    } finally {
      clearTimeout(timer!);
    }
  }
}

export class WithIdempotency implements Sender {
  private readonly seen = new Set<string>();
  private readonly inner: Sender;

  constructor(inner: Sender) {
    this.inner = inner;
  }

  get channel(): string {
    return this.inner.channel;
  }

  async send(m: Message): Promise<void> {
    if (this.seen.has(m.id)) {
      return;
    }

    await this.inner.send(m);

    this.seen.add(m.id);
  }
}

async function main(): Promise<void> {
  const sender: Sender = new WithIdempotency(
    new WithRetry(new WithTimeout(new WithLogging(new EmailSender()), 2000), 3),
  );

  const message: Message = {
    id: "m-9",
    to: "a@x.com",
    body: "Hi",
  };

  await sender.send(message);
  await sender.send(message);
}

void main();
