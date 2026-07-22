---
language: en
name: database-change-review
description: Review the safety and correctness of data changes before handoff or rollout. Use when a feature has schema changes, migrations, backfills, important queries, retention, or data logic; assess migration safety, compatibility, lock risk, rollback, query risk, and recommend a release decision.
---

# Database Change Review

> Vietnamese: SKILL.vi.md

Review database-related changes to decide whether they can roll out safely or whether gaps still need handling.

## Goal

- Assess the rollout risk of migrations, backfills, and changed queries.
- Check backward compatibility, rollback, and lock/downtime risk.
- Check whether data changes still fit the locked schema design and retention rules.
- Produce a clear release recommendation before handoff or rollout.

## When To Use

- When a feature has a schema migration, a new index, a changed constraint, or a data backfill.
- When a main query changes and may affect performance.
- When changing retention, archive, purge, or audit rules.
- When you need to decide rolling out a database change on a real environment.

## Out Of Scope

- Does not replace the initial schema design step.
- Does not write a migration from scratch when there is no concrete change.
- Does not benchmark the entire production system in detail.
- Does not replace the overall functional testing of the feature.

## Minimum Input

- `database_design`: the artifact from `database-design`.
- `change_set`: migration, DDL, query change, retention change, or related diff.
- `deployment_context`: rollout environment, estimated data size, deploy model.
- `verification_evidence`: tests, explain plans, logs, dry-runs, or existing check results.

If there is no `change_set` or the rollout environment cannot be determined, stop and ask for more.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
review_scope: []
migration_plan:
  steps: []
  deployment_order: []
backfill_plan:
  required: true|false
  strategy: ""
  safety_controls: []
rollback_plan:
  possible: true|false
  strategy: ""
compatibility_risks: []
lock_risks: []
query_risks: []
retention_risks: []
release_recommendation: GO|GO_WITH_GUARDS|NO_GO
required_actions: []
evidence: []
```

## Meaning Of Each Output

- `review_scope`: the database change scope being reviewed.
- `migration_plan`: the safe rollout order for schema or data changes.
- `backfill_plan`: the strategy for handling old data if the new schema needs it.
- `rollback_plan`: whether you can roll back and how, in practice.
- `compatibility_risks`: risks from old/new apps running together or from schema transitions.
- `lock_risks`: risk of table locks, downtime, or system slowness during rollout.
- `query_risks`: risk of query regression, missing indexes, or N+1 logic at the query layer.
- `retention_risks`: risks from archive/purge/audit not matching requirements.
- `release_recommendation`: the final rollout conclusion.
- `required_actions`: work that must be done before release.
- `evidence`: the evidence used to score the release recommendation.

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 8 template in `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Database Review` block.
- Only create this block when the change truly touches schema, query, migration, retention, or rollback concerns of the database.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.

## Choosing The Reference By Engine

- Determine the database engine from `database_design` and `deployment_context`.
- Only read the reference directly related to the current engine:
  - `PostgreSQL`: `references/postgresql.md`
  - `MySQL`/`MariaDB`: `references/mysql.md`
  - `MongoDB`: `references/mongodb.md`
- If the engine has no matching reference yet, fall back to the general lock/rollback/backfill reasoning in this skill and note the gap in `required_actions`.

## Evaluation Flow

1. Identify the database change scope in `review_scope`.
2. Compare `change_set` against `database_design` to find design drift.
3. Check migration order, backward compatibility, and lock risk.
4. Assess backfill needs, batch strategy, and safety controls.
5. Check rollback feasibility under real deploy conditions.
6. Review `query_risks` against the main query patterns and existing evidence.
7. Review `retention_risks` if the data has archive, purge, or audit requirements.
8. Conclude the `release_recommendation` and list `required_actions`.

## Status Scoring Rule

- `GO`: the change has enough evidence and no serious unmanaged risk remains.
- `GO_WITH_GUARDS`: can roll out but must carry clear guards such as batching, feature flags, monitoring, or manual steps.
- `NO_GO`: serious compatibility risk, lock risk, or rollback gap remains.

## Quality Rules

- Do not conclude `GO` without minimum evidence for migration order and rollback.
- If there is no real data volume, state the assumption clearly and raise the risk level accordingly.
- Do not skip retention or audit when the change set touches the data lifecycle.
- If a query risk cannot be proven, list it in `required_actions` instead of assuming it is safe.
- Store documents as UTF-8 and preserve accented characters in `*.vi.md` supplement files.

## Completion Conditions

- A clear `release_recommendation`.
- `required_actions` for every unclosed risk.
- `evidence`, or a clear statement of evidence gaps if insufficient.
- `migration_plan`, `rollback_plan`, and `query_risks` for every notable database change.