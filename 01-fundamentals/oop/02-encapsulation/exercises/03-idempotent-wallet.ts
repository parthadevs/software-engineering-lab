import {
  InsufficientFundsError,
  assertValidAmount,
} from "../examples/errors.ts";

export type TxResult = "APPLIED" | "DUPLICATE";

export class IdempotentWallet {
  #balance = 0;
  readonly #processed = new Set<string>();

  deposit(txId: string, amount: number) : TxResult {
    assertValidAmount(amount);
    if (this.#processed.has(txId)) return "DUPLICATE";

    this.#balance += amount;
    this.#processed.add(txId);
    return "APPLIED";
  }

  withdrow(txId: string, amount: number) : TxResult {
    assertValidAmount(amount);
    if (this.#processed.has(txId)) return "DUPLICATE";

    if (amount > this.#balance) {
      throw new InsufficientFundsError(amount, this.#balance);
    }

    this.#balance -= amount;
    this.#processed.add(txId);
    return "APPLIED";
  }

  getBalance(): number {
    return this.#balance;
  }
}


const w = new IdempotentWallet();
console.log(w.deposit('tx-1', 1000)); // APPLIED
console.log(w.deposit('tx-1', 1000)); // DUPLICATE
console.log(w.getBalance()); // 1000