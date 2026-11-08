
interface PaymentGateway {
    processPayment(amount: number): boolean;
    refund(trxId: string): boolean;
}

interface Logger {
    log(message: string): void;
}

class ConsoleLogger implements Logger {
    log(message: string): void {
        const timestamp = new Date().toISOString();
        console.log(`[LOG - ${timestamp}]: ${message}`);
    }
}

class BkashPayment implements PaymentGateway {
    processPayment(amount: number): boolean {
        console.log(`Processing BDT ${amount} via bKash...`);
        return true;
    }

    refund(trxId: string): boolean {
        console.log(`Refunding transaction ${trxId} via bKash...`);
        return true;
    }
}

class NagadPayment implements PaymentGateway {
    processPayment(amount: number): boolean {
        console.log(`Processing BDT ${amount} via Nagad...`);
        return true;
    }

    refund(trxId: string): boolean {
        console.log(`Refunding transaction ${trxId} via Nagad...`);
        return true;
    }
}

class RocketPayment implements PaymentGateway {
    processPayment(amount: number): boolean {
        console.log(`Processing BDT ${amount} via Rocket...`);
        return true;
    }

    refund(trxId: string): boolean {
        console.log(`Refunding transaction ${trxId} via Rocket...`);
        return true;
    }
}

class CheckoutService {
    private readonly paymentGateway: PaymentGateway;
    private readonly logger: Logger;

    constructor(paymentGateway: PaymentGateway, logger: Logger) {
        this.paymentGateway = paymentGateway;
        this.logger = logger;
    }

    processCheckout(amount: number): void {
        this.logger.log(`Attempting to process payment of BDT ${amount}`);
        
        const success = this.paymentGateway.processPayment(amount);
        
        if (success) {
            this.logger.log(`Payment successfully completed for amount: ${amount}`);
        } else {
            this.logger.log(`Payment failed for amount: ${amount}`);
        }
    }

    processRefund(trxId: string): void {
        this.logger.log(`Attempting refund for transaction: ${trxId}`);
        this.paymentGateway.refund(trxId);
        this.logger.log(`Refund processed for transaction: ${trxId}`);
    }
}

const logger = new ConsoleLogger();

const rocketGateway = new RocketPayment();
const checkoutService = new CheckoutService(rocketGateway, logger);

checkoutService.processCheckout(1500);
checkoutService.processRefund("TRX987654XYZ");