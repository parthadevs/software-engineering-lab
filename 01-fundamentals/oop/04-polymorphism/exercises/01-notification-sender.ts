
export interface Notification {
  readonly to: string;
  readonly body: string;
}

export interface NotificationSender {
  readonly channel: string;
  send(notification: Notification): Promise<void>;
}

export class EmailSender implements NotificationSender {
  readonly channel = 'email';

  async send(n: Notification): Promise<void> {
    console.log(`[email] to=${n.to} body=${n.body}`);
  }
}

export class SmsSender implements NotificationSender {
  readonly channel = 'sms';

  async send(n: Notification): Promise<void> {
    console.log(`[sms] to=${n.to} body=${n.body}`);
  }
}

export class PushSender implements NotificationSender {
  readonly channel = 'push';

  async send(n: Notification): Promise<void> {
    console.log(`[push] to=${n.to} body=${n.body}`);
  }
}

// lookup by channel, no if/else chain
export class NotificationService {
  readonly #senders: ReadonlyMap<string, NotificationSender>;

  constructor(senders: readonly NotificationSender[]) {
    this.#senders = new Map(senders.map((s) => [s.channel, s]));
  }

  async notify(channel: string, notification: Notification): Promise<void> {
    const sender = this.#senders.get(channel);
    if (!sender) throw new Error("Unsupporded Channel");
    await sender.send(notification);
  }
}

// Demo
async function main(): Promise<void> {
  const service = new NotificationService([new EmailSender(), new SmsSender(), new PushSender()]);
  await service.notify('email', { to: 'a@x.com', body: 'Welcome' });
  await service.notify('sms', { to: '+8801700000000', body: 'OTP 123456' });

  try {
    await service.notify('fax', { to: '1', body: 'hi' });
  } catch (e) {
    console.error((e as Error).name); // Error
  }
}

void main();