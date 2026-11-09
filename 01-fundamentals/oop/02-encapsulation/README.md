# Encapsulation in OOP

Encapsulation means keeping an object's internal state protected and exposing
only a controlled way to interact with it.

## Bad Example

```typescript
class Wallet {
  balance = 1000;
}

const wallet = new Wallet();
wallet.balance = -5000; // no rules
```

**Problem:** anyone can mutate `balance` and bypass business rules.

## Better Example

```typescript
class InvalidAmountError extends Error {
  constructor(amount: number) {
    super(`Amount must be a positive integer, received: ${amount}`);
    this.name = 'InvalidAmountError';
  }
}

class InsufficientFundsError extends Error {
  constructor(requested: number, available: number) {
    super(`Insufficient funds: requested ${requested}, available ${available}`);
    this.name = 'InsufficientFundsError';
  }
}

class Wallet {
  #balance = 0; // balance in minor units to avoid float errors

  deposit(amount: number): void {
    this.assertValidAmount(amount);
    this.#balance += amount;
  }

  withdraw(amount: number): void {
    this.assertValidAmount(amount);
    if (amount > this.#balance) {
      throw new InsufficientFundsError(amount, this.#balance);
    }
    this.#balance -= amount;
  }

  getBalance(): number {
    return this.#balance;
  }

  private assertValidAmount(amount: number): void {
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new InvalidAmountError(amount);
    }
  }
}
```

## Modifiers

| Modifier    | Accessible from              | Enforced at |
|-------------|------------------------------|-------------|
| `public`    | Anywhere                     | n/a         |
| `protected` | The class and its subclasses | Compile time |
| `private`   | The class only               | Compile time |
| `#field`    | The class only               | Runtime     |
## Benefits

- **Invariants are protected:** the balance can never go negative.
- **Single point of change:** validation lives in one place.
- **Implementation can change** without breaking callers.
- **Easier testing:** behavior is tested through the public API.

