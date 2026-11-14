import type { Message, Sender } from './sender.ts';
import { EmailSender, SmsSender, FlakySender, DeliveryError } from './sender.ts';
export { DeliveryError };

export class WithLogging implements Sender {
  private readonly inner: Sender;
  constructor(inner : Sender) {
    this.inner = inner;
  }

  get channel(): string {
    return this.inner.channel;
  }

  async send(m: Message): Promise<void> {
    console.log(`-> sending ${m.id} via ${this.channel}`);
    try {
      await this.inner.send(m);
      console.log(`<- sent ${m.id}`);
    } catch (e) {
      console.error(`!! failed ${m.id}: ${(e as Error).message}`);
      throw e;
    }
  }
}

export class WithRetry implements Sender {
  private readonly inner: Sender;
    private readonly maxAttempts: number;
  constructor(
    inner : Sender, maxAttempts : number
  ) {
    this.inner = inner;
    this.maxAttempts = maxAttempts;
  }

  get channel(): string {
    return this.inner.channel;
  }

  async send(m: Message): Promise<void> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
      try {
        await this.inner.send(m);
        return;
      } catch (e) {
        lastError = e;
        if (!(e instanceof DeliveryError) || !e.retriable) throw e;
      }
    }
    throw lastError;
  }
}


async function main(): Promise<void> {
  const msg: Message = { id: 'm-1', to: 'a@x.com', body: 'Welcome' };

  const email: Sender = new WithRetry(new WithLogging(new EmailSender()), 3);
  const sms: Sender = new WithLogging(new SmsSender());
  const flaky: Sender = new WithRetry(new FlakySender(2), 3);

  await email.send(msg);
  await sms.send({ ...msg, id: 'm-2', to: '+8801700000000' });
  await flaky.send({ ...msg, id: 'm-3' });
}

void main();