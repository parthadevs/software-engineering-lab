export class InvalidAmountError extends Error {
  constructor(amount: number) {
    super(`Amount must be a positive integer, received: ${amount}`);
    this.name = 'InvalidAmountError';
  }
}

export function assertValidAmount(amount: number): void {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new InvalidAmountError(amount);
  }
}