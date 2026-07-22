---
language: en
---

# DOD Canonical Pattern

> Vietnamese: dod-pattern.vi.md

Apply this reference only when `architecture_style = DOD`. If a different style was chosen, skip this file entirely.

## 1. Standardization Goal

- Standardize all business source code to the same shape, regardless of service or framework.
- Use the `domain module` as the main organization unit instead of starting with a global technical layer.
- Keep domain boundaries, ownership, and dependency rules clear without forcing full `DDD`.

## 2. Mandatory Structure Unit

- The `domain module` is the highest business folder level and must be present in source code.
- A `subdomain` is only used to analyze the landscape or group capabilities in docs; do not create an extra folder level by default just to describe business in more detail.
- A `bounded context` is only added if there is a real language, rule, or ownership difference; in that case consider moving to `DDD_LITE` or `DDD`.

## 3. Standard Source Code Shape

Default suggestion:

```text
src/
  modules/
    <module-name>/
      api/
      presentation/
      application/
      domain/
      infrastructure/
  shared/
    kernel/
```

Where:

- `modules/<module-name>/` is the main boundary of a business area.
- `api/` is the public contract for other modules to interact, e.g. command/query facade, DTO contract, event contract.
- `presentation/` is the inbound adapter such as HTTP controller, gRPC handler, consumer, scheduler, CLI command.
- `application/` is the use case, internal use-case DTO, port interface, orchestration, and transaction boundary.
- `domain/` is entity, value object, policy, domain service, domain event, and pure business rules.
- `infrastructure/` is repository implementation, external client, mapper, outbox publisher, technical adapter.
- `shared/kernel/` only holds technical primitives or domain-neutral utilities; it must never hold cross-module business rules.

## 4. Standard Dependency Rule

Valid dependencies:

- `presentation -> application`
- `application -> domain`
- `application -> api` of another module when calling its public contract
- `infrastructure -> application` and `infrastructure -> domain` to implement ports or map data

Forbidden dependencies:

- `module A/domain -> module B/domain`
- `module A/application -> module B/infrastructure`
- `module A/presentation -> module B/domain`
- Any direct access from one module into the repository, ORM model, or internal service of another module

Interaction principles:

- Cross-module writes go through the use case, facade, or command contract of the owning module.
- Cross-module reads prefer a read model, query contract, or clearly exposed view.
- A module may only expose what lives in `api/`; the remaining folders are private by default.

## 5. Standard Ownership Rule

- Each important business capability must have exactly one `owner_module`.
- Each main business data source must have a module responsible for changing it.
- Do not split ownership by controller, endpoint, single table, or team convenience if the business capability is not separated.
- If two modules edit the same set of rules or own the same lifecycle, that is a sign the boundary is wrong.

## 6. Module Naming

- Name by business capability or a stable business noun, e.g. `customer`, `order`, `voucher`, `payment`.
- Do not name by framework, channel, or technical concern such as `http`, `job`, `repository`, `service`.
- Do not use vague names like `core`, `common`, `base`, `manager` for a business module.

## 7. When To Split A Module

Only split into a new module when at least one of these signals is present:

- Different ownership of business rules or main data.
- Different change lifecycle or release cadence.
- Different data source of truth.
- Different integration boundary with external systems.
- The same term means different things by context.

Do not split a module just because:

- There are many endpoints.
- There are many screens.
- There are many tables.
- You want a tidier folder layout.

## 8. When It Is No Longer Pure DOD

- When you need many `bounded_contexts` with a clear language map.
- When you need aggregate root, invariant, and value object as the backbone for many hotspot modules.
- When you need a context map across many teams or many independent services.

These cases should move up to `DDD_LITE` or `DDD`.

## 9. DOD Review Checklist

- Does top-level business code follow `modules/<module>`?
- Does each module have a clear `purpose`, `responsibilities`, `owned_data`?
- Is there a clear public contract for cross-module interaction?
- Is there any cross import into another module's `domain/` or `infrastructure/`?
- Is any business rule pushed into `shared`, `common`, `core`?
- Is any module named by technical layer instead of business capability?
