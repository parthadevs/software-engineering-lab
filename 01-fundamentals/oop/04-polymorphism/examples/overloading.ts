// typescript overloads  multiple signatures, ONE implementation.
// overloads are compile time only, the runtime still branches inside.
export class Formatter {
  format(value: number): string;
  format(value: Date): string;
  format(value: string[]): string;
  format(value: number | Date | string[]): string {
    if (typeof value === 'number') return value.toFixed(2);
    if (value instanceof Date) return value.toISOString();
    return value.join(', ');
  }
}

const f = new Formatter();
console.log(f.format(1234.5));
console.log(f.format(new Date('2026-01-01')));
console.log(f.format(['a', 'b']));
// f.format(true); // compile error, no matching overload

export function first<T>(items: readonly T[]): T | undefined {
  return items[0]; // parametric polymorphism
}

console.log(first([1, 2, 3]));
console.log(first(['x', 'y']));