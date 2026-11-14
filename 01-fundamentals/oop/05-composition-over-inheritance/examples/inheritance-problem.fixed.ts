
interface Notifier {
  send(message: string): Promise<void>;
}

export class EmailChannel implements Notifier {
  private attempts = 0;

  async send(message: string): Promise<void> {
    this.attempts++;

    console.log(`Email attempt: ${this.attempts}`);

    // first 2 attempts will fail
    if (this.attempts <= 2) {
      console.log('Email provider temporarily unavailable');
    }

    console.log(`[Email] Sent: ${message}`);
  }
}


export class SmsChannel implements Notifier {
  async send(message: string): Promise<void> {
    console.log(`[SMS] Sent: ${message}`);
  }
}

export class SlackChannel implements Notifier {
  async send(message: string): Promise<void> {
    console.log(`[Slack] Sent: ${message}`);
  }
}

// added retry behavior
export class RetryNotifier implements Notifier {
  private readonly notifier: Notifier;
  private readonly maxAttempts: number;

  constructor(
    notifier: Notifier,
    maxAttempts: number = 3,
  ) {
    if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
      throw new Error('maxAttempts must be a positive integer');
    }

    this.notifier = notifier;
    this.maxAttempts = maxAttempts;
  }

  async send(message: string): Promise<void> {
    for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
      try {
        await this.notifier.send(message);
        return;
      } catch (error) {
        if (attempt === this.maxAttempts) {
          throw error;
        }

        console.log(`Attempt ${attempt} failed. Retrying...`);
      }
    }
  }
}


export class AlertService {
  private readonly channels: Notifier[]
  constructor(channels: Notifier[]) {
    this.channels = channels;
  }

  async triggerAlert(message: string): Promise<void> {
    console.log('--- Triggering Alert ---');

    for (const channel of this.channels) {
      await channel.send(message);
    }
  }
}

// Main
async function run(): Promise<void> {
  const email = new EmailChannel();
  const sms = new SmsChannel();
  const slack = new SlackChannel();

  // normal alert
  const basicAlert = new AlertService([email, slack]);
  await basicAlert.triggerAlert('Server CPU usage is 80%');

  // critical alert : retry email, then send SMS
  const reliableEmail = new RetryNotifier(email, 3);
  const criticalAlert = new AlertService([reliableEmail,sms,]);
  await criticalAlert.triggerAlert('Database connection lost!');
}

run()
