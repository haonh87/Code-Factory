---
language: vi
---

# MySQL

> English: mysql.md

Dùng reference này khi `database_design` hoặc `change_set` nhắm tới MySQL hoặc MariaDB (InnoDB).

## Rủi Ro Migration & Lock

- Kiểm tra thuật toán online-DDL mà InnoDB thực sự dùng: `ALGORITHM=INSTANT` (chỉ đổi metadata, an toàn nhất), `ALGORITHM=INPLACE` (thường cho phép DML đồng thời nhưng vẫn tốn I/O), hoặc `ALGORITHM=COPY` (rebuild toàn bảng, lock bảng suốt thời gian) — `COPY` trên bảng lớn mặc định là `NO_GO` trừ khi có maintenance window.
- Với bảng lớn, ưu tiên công cụ online schema-change (`gh-ost`, `pt-online-schema-change`) thay vì `ALTER TABLE` thô; bắt buộc dùng khi bảng vượt ngưỡng kích thước của dự án.
- DDL trong MySQL không transactional — không có rollback tự động nếu migration nhiều bước bị lỗi giữa chừng; `migration_plan.steps` phải an toàn để dừng ở bất kỳ bước nào.

## Rollback

- Coi rollback schema là một migration xuôi riêng, không phải `ROLLBACK`; viết và validate DDL đảo ngược tường minh trong `rollback_plan`.
- Xoá cột hoặc index không dễ hoàn tác — mất dữ liệu hoặc trạng thái index; xác nhận điều này chấp nhận được trước khi đánh dấu `rollback_plan.possible: true`.

## Backfill

- Batch `UPDATE ... LIMIT n` theo vòng lặp, khoá theo primary key, không chạy 1 statement duy nhất — theo dõi replication lag trên read replica trong và sau khi backfill.
- Với replication dựa trên binlog, transaction đơn lớn có thể làm stall replica; giữ mỗi batch transaction ngắn.

## Rủi Ro Query / Tooling

- Yêu cầu `EXPLAIN` (hoặc `EXPLAIN ANALYZE` từ MySQL 8.0.18+) cho query hot-path bị thay đổi.
- Chú ý implicit type conversion (vd so sánh cột string với literal integer) âm thầm vô hiệu hoá index — nguồn regression phổ biến sau khi đổi kiểu cột.

## Fallback

- Nếu không có output `EXPLAIN` hoặc evidence replica-lag, liệt kê rủi ro query/replication vào `required_actions` thay vì giả định an toàn.
