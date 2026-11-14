
class EmailNotifier {
  send(message: string): void {
    console.log(`Sending Email: ${message}`);
  }
}

class SmsNotifier extends EmailNotifier {
  override send(message: string): void {
    console.log(`Sending SMS: ${message}`);
  }
}

// problem 1 : if want to use email and sms both together
// typeScript not support multiple inheritance 
class EmailAndSmsNotifier extends EmailNotifier {
  override send(message: string): void {
    super.send(message); // Email পাঠাবে
    // sms notification code duplicate to use together
    console.log(`Sending SMS: ${message}`);
  }
}

// problem 2: if want to add email retry logic
class RetryingEmailNotifier extends EmailNotifier {
  override send(message: string): void {
    console.log("Retrying up to 3 times...");
    super.send(message);
  }
}

// problem 3: if need retrying email and sms 