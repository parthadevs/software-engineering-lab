import { assertValidAmount } from '../examples/errors.ts';

export interface ChargeResult {
  readonly gateway: string;
  readonly reference: string;
  readonly amount: number;
}

export abstract class PaymentGateway {
  abstract readonly name: string;

  async charge(amount: number): Promise<ChargeResult> {
    assertValidAmount(amount);
    const reference = await this.doCharge(amount);
    return { gateway: this.name, reference, amount };
  }

  protected abstract doCharge(amount: number): Promise<string>;
}

export class StripeGateway extends PaymentGateway {
  override readonly name = 'stripe';

  protected override async doCharge(amount: number): Promise<string> {
    return `stripe_${amount}_${Date.now()}`; // call the real SDK here
  }
}

export class BkashGateway extends PaymentGateway {
  override readonly name = 'bkash';

  protected override async doCharge(amount: number): Promise<string> {
    return `bkash_${amount}_${Date.now()}`;
  }
}


async function main(): Promise<void> {
  const gateways: PaymentGateway[] = [new StripeGateway(), new BkashGateway()];
  for (const g of gateways) {
    console.log(await g.charge(5000));
  }
}

void main();