---
language: en
---

# PostgreSQL

> Vietnamese: postgresql.vi.md

Use this reference when the `database_design` or `change_set` targets PostgreSQL.

## Migration & Lock Risk

- `ALTER TABLE ... ADD COLUMN ... DEFAULT <value>` rewrites the whole table on PostgreSQL < 11; on 11+ a constant default is metadata-only, but a volatile default (e.g. `now()`, a function call) still rewrites.
- Adding `NOT NULL` directly takes `ACCESS EXCLUSIVE` and scans the table; prefer `ADD CONSTRAINT ... NOT NULL NOT VALID` then `VALIDATE CONSTRAINT` in a second step to avoid holding the exclusive lock during the scan.
- Prefer `CREATE INDEX CONCURRENTLY` for new indexes on a live table; plain `CREATE INDEX` blocks writes for the table's duration.
- `ALTER TYPE ... ADD VALUE` (enum) cannot run inside the same transaction as a later use of that value; check for this pattern in the migration order.

## Rollback

- Additive DDL (new column, new index, new nullable constraint) is usually reversible; type/enum changes and `DROP COLUMN` are not — treat them as one-way and require an explicit rollback strategy in `rollback_plan`.
- Down-migrations must be idempotent; verify they were actually exercised, not just written.

## Backfill

- Batch by primary key range or `ctid`, not a single `UPDATE` over the whole table — a long-running bulk update holds row locks and bloats WAL.
- Watch for autovacuum pressure after a large backfill; note it in `required_actions` if the table is large and hot.

## Query Risk / Tooling

- Require `EXPLAIN (ANALYZE, BUFFERS)` for changed hot-path queries, not just `EXPLAIN`.
- Check `pg_locks`/`pg_stat_activity` evidence when `lock_risks` claims a migration is safe on a live table.

## Fallback

- If no `EXPLAIN ANALYZE` output is available, list the query risk in `required_actions` instead of assuming the query is safe.
