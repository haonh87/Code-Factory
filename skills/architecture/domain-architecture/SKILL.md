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
- `ownership_map`: who owns the logic, data, and change decisions in each area; this is the trace target for `owner_module` in `database-design` and `frontend-architecture` when both skills run for the same system.
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

Apply this section only when `architecture_style = DOD`. Read `references/dod-pattern.md` for the full standard source-code shape, dependency rule, ownership rule, module naming, split criteria, and review checklist — do not re-derive them here. For any other `architecture_style`, skip that reference entirely.

## Completion Conditions

- An `architecture_style` and a clear enough reason for the choice.
- `domain_modules` or `bounded_contexts` clear enough that the next step is not vague about ownership.
- `interaction_rules` and `layer_rules` sufficient to control dependencies.
- If `DOD` is chosen, a standard source-code shape at `module-first` level, with public contracts and dependency rules clear enough for the team to apply consistently.
- `architecture_risks` for points not yet locked or still disputed.