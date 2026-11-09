import { assertValidAmount, InsufficientFundsError } from "../examples/errors.ts";

export interface StockEvent {
    readonly type : 'RESERVE' | 'RELEASE';
    readonly quantity : number;
    readonly at : Date;
}

export class ProductStock {
    #available : number;
    #reserved = 0
    readonly #history: StockEvent[] = [];

    constructor(initial : number){
        if(!Number.isInteger(initial) || initial < 0){
            throw new RangeError("Initial stock must be a non-negative integer");
        }
        this.#available = initial;
    }

    reserve(quantity : number){
        assertValidAmount(quantity);

        if(quantity > this.#available){
            throw new InsufficientFundsError(quantity, this.#available);
        }

        this.#available -= quantity;
        this.#reserved += quantity;
        this.#history.push(Object.freeze({ type: 'RESERVE', quantity, at: new Date() }))
    }

    release(quantity: number): void {
        assertValidAmount(quantity);
        if(quantity > this.#reserved){
            throw new InsufficientFundsError(quantity, this.#reserved);
        }
        this.#reserved -= quantity;
        this.#available += quantity;
        this.#history.push(Object.freeze({ type: "RELEASE", quantity, at: new Date() }))
    }

    getAvailable() : number {
        return this.#available;
    }

    getHistory() : readonly StockEvent[]{
        return [...this.#history]
    }

}


// Demo
const stock = new ProductStock(10);
stock.reserve(4);
stock.release(1);
console.log(stock.getAvailable());
console.log(stock.getHistory().length);