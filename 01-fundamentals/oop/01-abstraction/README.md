# What is Abstraction In OOP
It's means exposing what an object does without forcing cousumers to undorstand how it work.

Consider a payment system where i don't need to know the internal implementation of every payment provider to initiate a payment.


```typescript
interface PaymentGateway {
  charge(amount: number): Promise<void>;
}

class StripeGateway implements PaymentGateway {
  async charge(amount: number): Promise<void> {
    console.log(`Charging ${amount} through Stripe`);
  }
}

class PaypalGateway implements PaymentGateway {
  async charge(amount: number): Promise<void> {
    console.log(`Charging ${amount} through PayPal`);
  }
}
```

The consumer depends on the contract (`interface`)

```typescript
class PaymentService {
  constructor(
    private readonly gateway: PaymentGateway,
  ) {}

  async pay(amount: number): Promise<void> {
    await this.gateway.charge(amount);
  }
}
```
The payment service doesn't need to know which provider implements the payment.


## Files
```
01-abstraction/
├── examples
│   ├── basic-abstraction.ts
│   └── payment-abstraction.ts
├── exercises
│   └── payment-gateway.exercise.ts
└── README.md
```