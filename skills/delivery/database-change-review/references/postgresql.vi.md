---
language: vi
---

# PostgreSQL

> English: postgresql.md

Dùng reference này khi `database_design` hoặc `change_set` nhắm tới PostgreSQL.

## Rủi Ro Migration & Lock

- `ALTER TABLE ... ADD COLUMN ... DEFAULT <value>` rewrite toàn bộ table trên PostgreSQL < 11; từ bản 11+ default là hằng số thì chỉ đổi metadata, nhưng default volatile (vd `now()`, gọi hàm) vẫn rewrite.
- Thêm `NOT NULL` trực tiếp giữ lock `ACCESS EXCLUSIVE` và scan toàn bảng; ưu tiên `ADD CONSTRAINT ... NOT NULL NOT VALID` rồi `VALIDATE CONSTRAINT` ở bước sau để tránh giữ exclusive lock trong lúc scan.
- Ưu tiên `CREATE INDEX CONCURRENTLY` cho index mới trên bảng đang live; `CREATE INDEX` thường sẽ block write suốt thời gian tạo.
- `ALTER TYPE ... ADD VALUE` (enum) không thể chạy cùng transaction với việc dùng giá trị đó ngay sau; kiểm tra pattern này trong thứ tự migration.

## Rollback

- DDL cộng thêm (thêm cột, thêm index, thêm constraint nullable) thường reversible; đổi type/enum và `DROP COLUMN` thì không — coi là one-way và phải có rollback strategy rõ trong `rollback_plan`.
- Down-migration phải idempotent; xác nhận đã được chạy thử thật, không chỉ viết ra.

## Backfill

- Batch theo khoảng primary key hoặc `ctid`, không chạy 1 `UPDATE` trên toàn bảng — update lớn kéo dài giữ row lock và làm phình WAL.
- Theo dõi áp lực autovacuum sau backfill lớn; ghi vào `required_actions` nếu bảng lớn và đang có traffic cao.

## Rủi Ro Query / Tooling

- Yêu cầu `EXPLAIN (ANALYZE, BUFFERS)` cho query hot-path bị thay đổi, không chỉ `EXPLAIN` thường.
- Kiểm chứng bằng evidence `pg_locks`/`pg_stat_activity` khi `lock_risks` khẳng định migration an toàn trên bảng đang live.

## Fallback

- Nếu không có output `EXPLAIN ANALYZE`, liệt kê rủi ro query vào `required_actions` thay vì giả định là an toàn.
