function assertValidAmount(amount: number): void {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error("Invalid Amount");
  }
}

export interface CartContext {
  readonly subtotal: number;
  readonly itemCount: number;
  readonly isFirstOrder: boolean;
}

export interface DiscountRule {
  readonly name: string;
  calculate(ctx: CartContext): number;
}

export class FirstOrderDiscount implements DiscountRule {
  readonly name = "first-order-10pct";

  calculate(ctx: CartContext): number {
    return ctx.isFirstOrder ? Math.floor(ctx.subtotal * 0.1) : 0;
  }
}

export class BulkDiscount implements DiscountRule {
  readonly name = "bulk-5-items";

  calculate(ctx: CartContext): number {
    return ctx.itemCount >= 5 ? Math.floor(ctx.subtotal * 0.05) : 0;
  }
}

export class FlatDiscount implements DiscountRule {
  readonly name = "flat-500";

  calculate(ctx: CartContext): number {
    return ctx.subtotal >= 5000 ? 500 : 0;
  }
}

export class PricingService {
  private readonly rules: readonly DiscountRule[];
  constructor(rules: readonly DiscountRule[]) {
    this.rules = rules;
  }

  total(ctx: CartContext): { total: number; applied: string[] } {
    assertValidAmount(ctx.subtotal);

    const applied: string[] = [];
    let discount = 0;

    for (const rule of this.rules) {
      const value = rule.calculate(ctx);
      if (value > 0) {
        discount += value;
        applied.push(rule.name);
      }
    }

    discount = Math.min(discount, ctx.subtotal);
    return { total: ctx.subtotal - discount, applied };
  }
}


const pricing = new PricingService([
  new FirstOrderDiscount(),
  new BulkDiscount(),
  new FlatDiscount(),
]);

console.log(
  pricing.total({ subtotal: 5000, itemCount: 6, isFirstOrder: true }),
);

console.log(
  pricing.total({ subtotal: 3000, itemCount: 6, isFirstOrder: false }),
);
