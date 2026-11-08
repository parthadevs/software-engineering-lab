import { assertValidAmount, InsufficientFundsError } from "./errors.ts";

export class Wallet {
  #balance = 0;

  deposit(amount: number): void {
    assertValidAmount(amount);
    this.#balance += amount;
  }

  withdraw(amount: number): void {
    assertValidAmount(amount);
    if (amount > this.#balance) {
      throw new InsufficientFundsError(amount, this.#balance);
    }
    this.#balance -= amount;
  }

  getBalance(): number {
    return this.#balance;
  }
}

const wallet = new Wallet();
wallet.deposit(50000);
wallet.withdraw(2000);
console.log("available balance : ",wallet.getBalance());