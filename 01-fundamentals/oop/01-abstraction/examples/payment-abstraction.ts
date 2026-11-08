interface PaymentGateway {
    processPayment(amount: number): boolean;
    refund(tnxID: string): boolean;
}

class BkashPayment implements PaymentGateway {
    processPayment(amount: number): boolean {
        console.log(`Processing BDT ${amount} via bKash...`);
        // bkash payment API call logic
        return true;
    }

    refund(tnxID: string): boolean {
        console.log(`Refunding transaction ${tnxID} via bKash...`);
        return true;
    }
}

class NagadPayment implements PaymentGateway {
    processPayment(amount: number): boolean {
        console.log(`Processing BDT ${amount} via Nagad...`);
        // nogad payment API call logic
        return true;
    }

    refund(tnxID: string): boolean {
        console.log(`Refunding transaction ${tnxID} via Nagad...`);
        return true;
    }
}

class StripePayment implements PaymentGateway {
    processPayment(amount: number): boolean {
        console.log(`Processing USDT ${amount} via Stripe...`);
        // stripe payment API call logic
        return true;
    }

    refund(tnxID: string): boolean {
        console.log(`Refunding transaction ${tnxID} via Stripe...`);
        return true;
    }
}


class CheckoutService {
    private readonly gateway : PaymentGateway
    constructor(gateway : PaymentGateway){
        this.gateway = gateway;
    }

    
    payment(amount : number){
        this.gateway.processPayment(amount)
    }

    refund(tnxID : string){
        this.gateway.refund(tnxID)
    }

}



const bkash = new BkashPayment();
const payment = new CheckoutService(bkash)
payment.payment(1000);