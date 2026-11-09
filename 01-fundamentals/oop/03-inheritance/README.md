# Inheritance in OOP

Inheritance lets a class (child) reuse and specialize the state and behavior
of another class (parent). Use it for genuine **is-a** relationships.

## Key concepts

- `extends`: child inherits from parent
- `super`: call the parent constructor (`super(...)`) or method (`super.method()`)
- `override`: explicitly marks an overridden method (enable `noImplicitOverride`)
- `abstract`: base class that cannot be instantiated; forces subclasses to implement members
- `protected`: visible to the class and its subclasses

## Rules of thumb

| Situation                          | Use                    |
|------------------------------------|------------------------|
| True is-a, shared algorithm        | Inheritance (abstract) |
| Reuse a capability, has-a          | Composition + DI       |
| Different implementations of a role| Interface              |
| Child cannot honor parent contract | Don't inherit (LSP)    |

Prefer **composition over inheritance**; keep hierarchies shallow (2 levels max).

## Files
```
03-inheritance/
├── examples
│   ├── animal.bad.ts
│   ├── animal.good.ts
│   ├── composition.ts
│   ├── errors.ts
│   └── lsp-violation.ts
├── exercises
│   ├── 01-payment-gateway.ts
│   ├── 02-fix-lsp-violation.ts
│   └── 03-composition-refactor.ts
└── README.md
```

## Contents

- `examples/`: duplication problem, abstract base, LSP violation, composition
- `exercises/`: template method, LSP fix, inheritance to composition refactor