---
language: en
name: database-design
description: Design a data model for a backend system or business service. Use when you need to lock entities, tables, relationships, ownership, constraints, indexes, retention, audit, and language-neutral schema decisions before splitting tasks or implementing.
---

# Database Design

> Vietnamese: SKILL.vi.md

Design the data model and core schema decisions to support the domain, the main queries, and the data lifecycle.

## Goal

- Turn the domain model and use cases into a clear data model.
- Lock tables/entities, relationships, ownership, and important constraints.
- Lock basic indexes based on the main query patterns.
- Design retention, archive, purge, and audit at a level sufficient to implement safely.
- Produce a design artifact for `task-breakdown-planner`, `implementation`, and `database-change-review` to use next.

## When To Use

- When a new feature adds new data or changes existing data.
- When you need to design a schema for a new service, module, or bounded context.
- When you must decide data ownership, read/write patterns, or the data lifecycle.
- When there is a risk of drift between a business invariant and the current schema.

## Out Of Scope

- Does not write a concrete migration or a detailed rollout plan.
- Does not review the safety of running a migration on a real environment.
- Does not do detailed benchmark-level query optimization after the code is running.
- Does not bind to a specific ORM, framework, or language.

## Minimum Input

- `business_goal`: the business goal of the feature or domain change.
- `acceptance_criteria`: the functional and data criteria to meet.
- `domain_modules`: the modules or bounded contexts involved.
- `query_patterns`: the main read/write flows, filters, sorts, joins, or important reports.
- `data_constraints`: requirements for uniqueness, integrity, compliance, retention, audit.

If `query_patterns` are missing or data ownership is not clear, stop and ask for clarification.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
data_model:
  entities: []
  aggregates: []
tables:
  - name: ""
    purpose: ""
    owner_module: ""
    columns: []
    primary_key: []
relationships:
  - from: ""
    to: ""
    cardinality: ""
    ownership: ""
constraints:
  uniques: []
  foreign_keys: []
  checks: []
indexes:
  - table: ""
    columns: []
    purpose: ""
read_write_patterns:
  writes: []
  reads: []
retention_rules:
  - data_class: ""
    retention_period: ""
    archive_strategy: ""
    purge_rule: ""
audit_rules: []
design_risks: []
notes_for_next_step: ""
```

## Meaning Of Each Output

- `data_model`: the conceptual model across entities, aggregates, and data responsibilities.
- `tables`: the list of tables or logical stores needed, each with a concrete owner.
- `relationships`: data relationships and ownership rules between tables.
- `constraints`: the integrity constraints to enforce.
- `indexes`: basic indexes tied to actual query patterns.
- `read_write_patterns`: the difference between write flows and read flows to avoid a schema that drifts from its purpose.
- `retention_rules`: how long data is kept, archived, and purged by data class.
- `audit_rules`: change history, business logs, or traceability requirements.
- `design_risks`: risks around scale, consistency, coupling, or retention.
- `notes_for_next_step`: notes for splitting tasks or reviewing the data change.

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 5 template in `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Architecture Details` block.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.
- Only write this block when the problem truly needs to lock schema, ownership, relation, retention, or audit rules.

## Execution Flow

1. Identify entities, aggregates, and ownership from the locked domain boundary.
2. List the main query patterns for write, read, and reporting.
3. Design `tables` and `relationships` from the domain and ownership.
4. Lock `constraints` to protect invariants at the database level when appropriate.
5. Choose the minimum `indexes` for the most important query patterns.
6. Design `retention_rules` and `audit_rules` for the data lifecycle.
7. Record `design_risks` for points that may affect scale, consistency, or migration.

## Quality Rules

- Each table must have a clear owner in `owner_module`.
- Do not design cross-domain relationships indiscriminately just for convenient joins.
- Do not add an index unless it is tied to a concrete query pattern.
- Do not treat retention as an afterthought; lock it in the design if the data has a clear lifecycle.
- If a business invariant is important, state clearly whether it is enforced at the domain, the database, or both.
- Store documents as UTF-8 and preserve accented characters in `*.vi.md` supplement files.

## Decision Rule

- Prefer ownership by domain/module before optimizing for technical convenience.
- Keep the transaction boundary as close to the aggregate as possible.
- If the write model and read model have clearly different goals, record it in `read_write_patterns` instead of forcing one vague schema.
- If data must be purged or archived for compliance, `retention_rules` are mandatory.
- If a performance risk is uncertain, record it in `design_risks` to pass to `database-change-review` or `query-performance` at the verify step.

## Completion Conditions

- `tables`, `relationships`, `constraints`, and `indexes` at a level sufficient to implement.
- An `owner_module` for each main table or logical store.
- `retention_rules` and `audit_rules` if the data is not ephemeral.
- `design_risks` and `notes_for_next_step` clear enough to split tasks or review rollout.