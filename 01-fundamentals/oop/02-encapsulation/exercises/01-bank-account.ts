import { InsufficientFundsError, assertValidAmount } from '../examples/errors.ts';

export abstract class BankAccount {
  #balance = 0;

  constructor(id: string) {}

  protected get balance(): number {
    return this.#balance;
  }

  protected abstract withdrawLimit(): number;

  deposit(amount: number): void {
    assertValidAmount(amount);
    this.#balance += amount;
  }

  withdraw(amount: number): void {
    assertValidAmount(amount);
    const limit = this.withdrawLimit();
    if (amount > limit) {
      throw new InsufficientFundsError(amount, limit);
    }
    this.#balance -= amount;
  }

  getBalance(): number {
    return this.#balance;
  }
}

export class SavingsAccount extends BankAccount {
  protected withdrawLimit(): number {
    return this.balance;
  }
}

export class CheckingAccount extends BankAccount {
  private readonly overdraftLimit: number; 

  constructor(id: string, overdraftLimit: number) {
    super(id);
    this.overdraftLimit = overdraftLimit;
  }

  protected withdrawLimit(): number {
    return this.balance + this.overdraftLimit;
  }
}

// Demo

const savings = new SavingsAccount('sav-1');
savings.deposit(500);
try {
  savings.withdraw(600);
} catch (e) {
  console.error((e as Error).name); // InsufficientFundsError
}