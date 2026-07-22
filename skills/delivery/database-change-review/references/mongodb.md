---
language: en
---

# MongoDB

> Vietnamese: mongodb.vi.md

Use this reference when the `database_design` or `change_set` targets MongoDB.

## Migration & Lock Risk

- MongoDB has no enforced schema by default, so a "migration" is usually an application-level contract change (new required field, changed field shape) plus an optional `$jsonSchema` validator update — the risk moves from DDL locking to dual-write/backfill correctness.
- Foreground index builds block all operations on the collection for their duration; require a rolling/background index build (or `createIndex` with the background option on the driver/version in use) on any collection taking live traffic.
- A `$jsonSchema` validator change with `validationAction: error` rejects writes from documents not yet migrated — sequence validator tightening strictly after the backfill completes, never before.

## Rollback

- There is no schema to roll back; the rollback unit is the validator change and the backfill script. Confirm a reverse script exists if the backfill is not purely additive (e.g. it renames or removes a field).
- Removing a field added by a prior release needs its own backfill/cleanup step; do not assume it disappears on deploy.

## Backfill

- Use bulk writes (`bulkWrite`) in bounded batches, not a single unbounded update across the collection — watch oplog window/replication lag on large backfills, especially on a replica set with limited oplog size.
- Prefer backfilling via a cursor over `_id` ranges to make the job resumable if interrupted.

## Query Risk / Tooling

- Require `explain("executionStats")` for changed hot-path queries; check for a `COLLSCAN` where an index was expected.
- Watch for unbounded `$in` arrays and queries that can't use a compound index due to field order mismatch.

## Fallback

- If no `explain()` output is available, list the query risk in `required_actions` instead of assuming an index is used.
