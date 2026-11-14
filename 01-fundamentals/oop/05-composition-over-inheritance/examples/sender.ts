export interface Message {
  readonly id: string;
  readonly to: string;
  readonly body: string;
}

export interface Sender {
  readonly channel: string;
  send(message: Message): Promise<void>;
}

export class DeliveryError extends Error {
  public readonly channel: string;
  public readonly retriable: boolean;
  constructor(
    channel : string,
    retriable : boolean,
    message: string,
  ) {
    super(message);
    this.channel = channel;
    this.retriable = retriable;
    this.name = 'DeliveryError';
  }
}

export class EmailSender implements Sender {
  readonly channel = "email";

  async send(m: Message): Promise<void> {
    console.log(`[email] to=${m.to} body=${m.body}`);
  }
}

export class SmsSender implements Sender {
  readonly channel = "sms";

  async send(m: Message): Promise<void> {
    console.log(`[sms] to=${m.to} body=${m.body}`);
  }
}

export class FlakySender implements Sender {
  readonly channel = "flaky";
  #calls = 0;
  private readonly failures: number;
  constructor(failures: number) {
    this.failures = failures;
  }

  async send(m: Message): Promise<void> {
    this.#calls += 1;
    if (this.#calls <= this.failures) {
      throw new DeliveryError(this.channel, true, `Attempt ${this.#calls} failed`);
    }
    console.log(`[flaky] delivered to=${m.to} on attempt ${this.#calls}`);
  }
}
