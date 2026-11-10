class InvalidAmountError extends Error {
    constructor(amount : number){
        super(`Amount must be a positive interger , received : ${amount}`)
        this.name = "InvalidAmountError"
    }
}


function assertValidAmount(amount: number): void {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new InvalidAmountError(amount);
  }
}


export interface PaymentResult {
  readonly method: string;
  readonly reference: string;
  readonly fee: number; // minor units
}

export interface PaymentStrategy {
  readonly method: string;
  pay(amount: number): Promise<PaymentResult>;
}


class CardPayment implements PaymentStrategy {
    readonly method = "card";
    
    async pay(amount: number): Promise<PaymentResult> {
        const fee = Math.round(amount * 0.029) + 30; // 2.9% + 30
        return { 
            method : this.method,
            reference : `card_${Date.now()}`,
            fee 
         }
    }
}

class MobileWalletPayment implements PaymentStrategy {
    readonly method = "mobile_wallet";

    async pay(amount: number): Promise<PaymentResult> {
        const fee = Math.round(amount * 0.015);
        return { method: this.method, reference: `mw_${Date.now()}`, fee };
    }
}

export class BankTransferPayment implements PaymentStrategy {
  readonly method = 'bank_transfer';

  async pay(): Promise<PaymentResult> {
    return { method: this.method, reference: `bt_${Date.now()}`, fee: 0 };
  }
}

class CheckoutService {
  async checkout(amount: number, strategy: PaymentStrategy): Promise<PaymentResult> {
    assertValidAmount(amount);
    return strategy.pay(amount); // polymorphic call
  }
}


async function main(): Promise<void> {
  const checkout = new CheckoutService();
  const strategies: PaymentStrategy[] = [
    new CardPayment(),
    new MobileWalletPayment(),
    new BankTransferPayment(),
  ];

  for (const s of strategies) {
    console.log(await checkout.checkout(10_000, s));
  }
}

void main()