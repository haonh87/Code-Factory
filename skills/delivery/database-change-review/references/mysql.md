---
language: en
---

# MySQL

> Vietnamese: mysql.vi.md

Use this reference when the `database_design` or `change_set` targets MySQL or MariaDB (InnoDB).

## Migration & Lock Risk

- Check the online-DDL algorithm InnoDB will actually use: `ALGORITHM=INSTANT` (metadata-only, safest), `ALGORITHM=INPLACE` (usually allows concurrent DML, still costs I/O), or `ALGORITHM=COPY` (rebuilds the table, locks it for the duration) — `COPY` on a large table is a `NO_GO` by default unless there is a maintenance window.
- For large tables, prefer an online schema-change tool (`gh-ost`, `pt-online-schema-change`) over a raw `ALTER TABLE`; require this for tables above the project's size threshold.
- DDL in MySQL is not transactional — there is no automatic rollback if a multi-statement migration fails partway; the `migration_plan.steps` must be safe to stop at any point.

## Rollback

- Treat schema rollback as a separate forward migration, not a `ROLLBACK`; write and validate the reverse DDL explicitly in `rollback_plan`.
- Dropping a column or index is not free to undo — data or index state is lost; confirm this is acceptable before marking `rollback_plan.possible: true`.

## Backfill

- Batch `UPDATE ... LIMIT n` in a loop keyed by primary key, not a single statement — check replication lag on read replicas during and after the backfill.
- For binlog-based replication, large single transactions can stall replicas; keep each batch transaction short.

## Query Risk / Tooling

- Require `EXPLAIN` (or `EXPLAIN ANALYZE` on MySQL 8.0.18+) for changed hot-path queries.
- Watch for implicit type conversion (e.g. comparing a string column to an integer literal) silently defeating an index — a common regression source after a column type change.

## Fallback

- If no `EXPLAIN` output or replica-lag evidence is available, list the query/replication risk in `required_actions` instead of assuming it is safe.
