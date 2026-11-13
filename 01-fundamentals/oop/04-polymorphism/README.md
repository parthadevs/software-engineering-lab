# Polymorphism in OOP

Polymorphism means one interface, many implementations. Callers depend on a
contract, not on a concrete class.

## Types

- Subtype (runtime): `Animal` reference, `Dog` / `Cat` behavior
- Parametric: generics (`Repository<T>`)
- Ad hoc: method overloading

## Run

    npx ts-node examples/shape.good.ts

## Contents

- `examples/`: if/else problem, subtype polymorphism, overloading, interfaces
- `exercises/`: notifications, payment strategy, discount rules