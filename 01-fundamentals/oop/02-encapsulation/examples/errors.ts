export class InvalidAmountError extends Error {
    constructor(amount : number){
        super(`Amount must be a positive interger , received : ${amount}`)
        this.name = "InvalidAmountError"
    }
}


export class InsufficientFundsError extends Error {
  constructor(requested: number, available: number) {
    super(`Insufficient funds: requested ${requested}, available ${available}`);
    this.name = 'InsufficientFundsError';
  }
}

export function assertValidAmount(amount: number): void {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new InvalidAmountError(amount);
  }
}