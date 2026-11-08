interface Notifier {
    send(message: string): void;
}

class EmailNotification implements Notifier {
    send(message: string): void {
        console.log(`Sending Email notification: ${message}`);
    }
}

class PushNotification implements Notifier {
    send(message: string): void {
        console.log(`Sending Push notification: ${message}`);
    }
}

class SmsNotification implements Notifier { 
    send(message: string): void {
        console.log(`Sending SMS notification: ${message}`);
    }
}

class NotificationService {
    private readonly notification: Notifier;

    constructor(notification: Notifier) {
        this.notification = notification;
    }

    sendNotification(message: string): void {
        this.notification.send(message);
    }
}

const smsNotification = new EmailNotification()
const notification = new NotificationService(smsNotification);

notification.sendNotification("Your OTP verification code is 482910");