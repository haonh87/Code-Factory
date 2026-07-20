---
language: en
name: domain-architecture
description: Design a domain-oriented architecture for a backend system or business service. Use when you need to determine domain modules, bounded contexts, ownership, layer rules, interaction boundaries, and DOD, DDD, or DDD-lite architecture decisions before splitting tasks or implementing.
---

# Domain Architecture

> Vietnamese: SKILL.vi.md

Design a domain-centered architecture to lock boundaries, ownership, and dependency rules before implementation.

## Goal

- Identify the domain modules or bounded contexts of the problem.
- Lock ownership for each business area, data, and processing responsibility.
- Design layer rules and interaction boundaries to reduce coupling.
- Choose the right application level among `DOD`, `DDD-lite`, and `DDD`.
- Produce a blueprint clear enough for `system-design`, `database-design`, and `task-breakdown-planner` to use next.

## When To Use

- When a new feature or service touches many domains or many business groups.
- When you need to decide whether to organize the system by `DOD`, `DDD-lite`, or `DDD`.
- When the codebase is mixing responsibilities across many modules or teams.
- When you need to lock boundaries before designing the database, API, or detailed use cases.

## Out Of Scope

- Does not design detailed tables, columns, indexes, or migrations.
- Does not write production code or a detailed execution task split.
- Does not replace `system-design` at the API, message flow, cache, or infra detail level.
- Does not expand the business scope beyond the clarified request on its own.

## Minimum Input

- `business_goal`: the locked business goal or user outcome.
- `acceptance_criteria`: the main functional criteria of the request.
- `domain_terms`: business terms, core concepts, actors, and related processes.
- `current_context`: the current state of the codebase or existing system.
- `known_constraints`: constraints around team, ownership, integration, compliance, or scale.

If `business_goal` cannot be determined or there are not enough `domain_terms`, stop and ask for more clarification.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
architecture_style: DOD|DDD_LITE|DDD
domain_modules:
  - name: ""
    purpose: ""
    responsibilities: []
    owned_data: []
bounded_contexts:
  - name: ""
    language_scope: ""
    upstream_dependencies: []
    downstream_dependencies: []
ownership_map:
  - area: ""
    owner_module: ""
    notes: ""
interaction_rules:
  - from: ""
    to: ""
    allowed_via: ""
    forbidden_patterns: []
layer_rules:
  presentation: []
  application: []
  domain: []
  infrastructure: []
aggregate_candidates: []
architecture_risks: []
notes_for_next_step: ""
```

## Meaning Of Each Output

- `architecture_style`: the domain architecture application level fitting the problem.
- `domain_modules`: the main business modules and each module's responsibilities.
- `bounded_contexts`: language and integration boundaries when contexts need to be separated.
- `ownership_map`: who owns the logic, data, and change decisions in each area.
- `interaction_rules`: the allowed interaction channels between modules or contexts.
- `layer_rules`: dependency rules across presentation, application, domain, and infrastructure.
- `aggregate_candidates`: hints for areas that need deeper design at the data or domain model step.
- `architecture_risks`: risks if the boundary is wrong or ownership is unclear.
- `notes_for_next_step`: notes for handing off to `database-design`, `system-design`, or `task-breakdown-planner`.

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 5 template in `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Architecture Details` block.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.
- Only write this block when the problem truly needs to lock a backend boundary, ownership, or dependency rule.

## Execution Flow

1. Identify the main business terms and actors.
2. Group use cases by responsibility to find `domain_modules`.
3. Check whether separated `bounded_contexts` are needed or module boundaries suffice.
4. Choose the fitting `architecture_style` among `DOD`, `DDD-lite`, and `DDD`.
5. Assign ownership for data, business rules, and integration points.
6. Write `interaction_rules` to block uncontrolled cross dependencies.
7. Write `layer_rules` to lock the dependency direction.
8. Record `aggregate_candidates` and `architecture_risks`.

## Quality Rules

- Default to writing and communicating in English.
- Do not use `DDD` as a formal label without pointing to concrete boundaries and ownership.
- If you choose `DOD`, default to a `module-first` structure; do not use `layer-first` as the root structure for all business code unless the system truly has only one domain module.
- Do not merge all business into one shared module like `core`, `common`, `shared` without a clear reason.
- Each module must have a clear responsibility and not overlap in meaning with another module.
- If the same term carries multiple meanings, consider splitting `bounded_contexts`.
- Store documents as UTF-8 and do not corrupt Vietnamese diacritics in `*.vi.md` supplement files.

## Decision Rule

- Choose `DOD` when the focus is organizing by domain/module and business complexity is moderate.
- Choose `DDD_LITE` when you need aggregates, value objects, and invariants but not full strategic design.
- Choose `DDD` when there are many bounded contexts, many teams, or complex domain rules.
- In `DOD`, the `domain module` is the mandatory source-code structure unit; a `subdomain` is only an analysis label in docs unless there is a reason to split it into its own module.
- If a dependency between two modules exists only to read data, prefer going through an interface, contract, or read model instead of allowing direct access to internal logic.
- If ownership is unclear, mark it as an `architecture_risk` instead of inferring it.

## DOD Canonical Pattern

Apply this section when `architecture_style = DOD`.

### 1. Standardization Goal

- Standardize all business source code to the same shape, regardless of service or framework.
- Use the `domain module` as the main organization unit instead of starting with a global technical layer.
- Keep domain boundaries, ownership, and dependency rules clear without forcing full `DDD`.

### 2. Mandatory Structure Unit

- The `domain module` is the highest business folder level and must be present in source code.
- A `subdomain` is only used to analyze the landscape or group capabilities in docs; do not create an extra folder level by default just to describe business in more detail.
- A `bounded context` is only added if there is a real language, rule, or ownership difference; in that case consider moving to `DDD_LITE` or `DDD`.

### 3. Standard Source Code Shape

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

### 4. Standard Dependency Rule

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

### 5. Standard Ownership Rule

- Each important business capability must have exactly one `owner_module`.
- Each main business data source must have a module responsible for changing it.
- Do not split ownership by controller, endpoint, single table, or team convenience if the business capability is not separated.
- If two modules edit the same set of rules or own the same lifecycle, that is a sign the boundary is wrong.

### 6. Module Naming

- Name by business capability or a stable business noun, e.g. `customer`, `order`, `voucher`, `payment`.
- Do not name by framework, channel, or technical concern such as `http`, `job`, `repository`, `service`.
- Do not use vague names like `core`, `common`, `base`, `manager` for a business module.

### 7. When To Split A Module

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

### 8. When It Is No Longer Pure DOD

- When you need many `bounded_contexts` with a clear language map.
- When you need aggregate root, invariant, and value object as the backbone for many hotspot modules.
- When you need a context map across many teams or many independent services.

These cases should move up to `DDD_LITE` or `DDD`.

### 9. DOD Review Checklist

- Does top-level business code follow `modules/<module>`?
- Does each module have a clear `purpose`, `responsibilities`, `owned_data`?
- Is there a clear public contract for cross-module interaction?
- Is there any cross import into another module's `domain/` or `infrastructure/`?
- Is any business rule pushed into `shared`, `common`, `core`?
- Is any module named by technical layer instead of business capability?

## Completion Conditions

- An `architecture_style` and a clear enough reason for the choice.
- `domain_modules` or `bounded_contexts` clear enough that the next step is not vague about ownership.
- `interaction_rules` and `layer_rules` sufficient to control dependencies.
- If `DOD` is chosen, a standard source-code shape at `module-first` level, with public contracts and dependency rules clear enough for the team to apply consistently.
- `architecture_risks` for points not yet locked or still disputed.