# Composition over Inheritance

Build behavior by combining small objects (**has-a**) instead of
extending class trees (**is-a**).

## Why inheritance hurts

| Problem             | What happens                                          |
|---------------------|-------------------------------------------------------|
| Class explosion     | N channels x M behaviors = N*M subclasses             |
| Fragile base class  | Child breaks when parent internals change             |
| Tight coupling      | Child is locked to one parent, chosen at compile time|
| Hard to test        | Cannot swap the parent for a fake                     |

## Composition tools

- Interface + injected collaborator (Strategy)
- Wrapper with the same interface (Decorator)
- Map of small behavior objects (abilities, rules, handlers)

## Decorator pipeline (examples)

Each decorator wraps a `Sender` and delegates `send()`:

- `WithLogging` — logs before/after and re-throws on failure
- `WithRetry` — retries only `DeliveryError` with `retriable === true`
- `WithTimeout` (exercise) — races the inner send against a timer, rejects with `DeliveryError`
- `WithIdempotency` (exercise) — deduplicates by message `id`

Stack them: `new WithIdempotency(new WithRetry(new WithTimeout(new WithLogging(new EmailSender()), 2000), 3))`.

## Report exporter (exercises)

`ReportService` decouples **formatting** (`Formatter`) from **delivery** (`Destination`):

- Formatters: `CsvFormatter`, `JsonFormatter`
- Destinations: `ConsoleDestination`, `MemoryDestination`

Swap either without touching `ReportService.run()`.

## When inheritance is still fine

- True is-a with a stable, small hierarchy (1-2 levels)
- Template Method where the base class owns the algorithm
- Framework requirements (e.g. extending `Error`)

## Decision rule

Ask "is it ALWAYS an X, for its whole life?"
Yes: inheritance is OK. No, or "it can do X": compose.

## Run

    node examples/composition.good.ts
    node examples/inheritance-problem.fixed.ts
    node exercises/01-sender-decorators.ts
    node exercises/02-report-exporter.ts

## Contents

- `examples/sender.ts` — shared interfaces and channel classes (`Message`, `Sender`, `EmailSender`, `SmsSender`, `FlakySender`, `DeliveryError`)
- `examples/inheritance-problem.ts` — the inheritance pain points (channels × behaviors = class explosion)
- `examples/inheritance-problem.fixed.ts` — same scenario rebuilt with composition (channels + `RetryNotifier` + `AlertService`)
- `examples/composition.good.ts` — decorator pipeline (`WithLogging`, `WithRetry`) wrapping channel senders
- `exercises/01-sender-decorators.ts` — add `WithTimeout` and `WithIdempotency` decorators
- `exercises/02-report-exporter.ts` — pluggable formatters (`CsvFormatter`, `JsonFormatter`) and destinations (`ConsoleDestination`, `MemoryDestination`) wired through `ReportService`