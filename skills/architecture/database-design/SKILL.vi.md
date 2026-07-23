---
language: vi
name: database-design
description: Thiết kế mô hình dữ liệu cho hệ thống backend hoặc service nghiệp vụ. Dùng khi cần chốt entity, table, relationship, ownership, constraint, index, retention, audit và các quyết định schema trung lập ngôn ngữ trước khi chia task hoặc implement.
---

# Database Design

> English: SKILL.md

Thiết kế mô hình dữ liệu và các quyết định schema cốt lõi để hỗ trợ domain, truy vấn chính và vòng đời dữ liệu.

## Mục Tiêu

- Chuyển domain model và use case thành mô hình dữ liệu rõ ràng.
- Chốt table/entity, relationship, ownership và constraint quan trọng.
- Chốt index cơ bản dựa trên query pattern chính.
- Thiết kế retention, archive, purge và audit ở mức đủ để implement an toàn.
- Tạo artifact thiết kế để `task-breakdown-planner`, `implementation` và `database-change-review` dùng tiếp.

## Khi Sử Dụng

- Khi feature mới thêm dữ liệu mới hoặc thay đổi dữ liệu hiện có.
- Khi cần thiết kế schema cho service, module hoặc bounded context mới.
- Khi phải quyết định ownership dữ liệu, read/write pattern hoặc vòng đời dữ liệu.
- Khi có nguy cơ lệch giữa business invariant và schema hiện tại.

## Không Thuộc Phạm Vi

- Không viết migration cụ thể hoặc kế hoạch rollout chi tiết.
- Không review an toàn triển khai của migration trên môi trường thật.
- Không tối ưu truy vấn ở mức benchmark chi tiết sau khi code đã chạy.
- Không ràng buộc vào ORM, framework hay ngôn ngữ cụ thể.

## Đầu Vào Tối Thiểu

- `business_goal`: mục tiêu business của feature hoặc domain change.
- `acceptance_criteria`: tiêu chí chức năng và dữ liệu cần đáp ứng.
- `domain_modules`: module hoặc bounded context liên quan.
- `query_patterns`: các luồng đọc/ghi chính, filter, sort, join hoặc report quan trọng.
- `data_constraints`: yêu cầu về uniqueness, integrity, compliance, retention, audit.

Nếu chưa có `query_patterns` hoặc chưa xác định rõ ownership dữ liệu, dừng và yêu cầu làm rõ.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

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

## Ý Nghĩa Từng Output

- `data_model`: mô hình khái niệm giữa entity, aggregate và trách nhiệm dữ liệu.
- `tables`: danh sách bảng hoặc logical store cần có cùng owner cụ thể.
- `relationships`: quan hệ dữ liệu và quy tắc ownership giữa các bảng.
- `constraints`: các ràng buộc integrity cần được enforce.
- `indexes`: index cơ bản gắn với query pattern thực tế.
- `read_write_patterns`: khác biệt giữa luồng ghi và luồng đọc để tránh schema lệch mục đích.
- `retention_rules`: thời gian giữ dữ liệu, archive và purge theo loại dữ liệu.
- `audit_rules`: lịch sử thay đổi, log nghiệp vụ hoặc yêu cầu truy vết.
- `design_risks`: các rủi ro về scale, consistency, coupling hoặc retention.
- `notes_for_next_step`: ghi chú để chia task hoặc review thay đổi dữ liệu.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 5 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Architecture Details`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Chỉ ghi block này khi bài toán thực sự cần khóa schema, ownership, relation, retention hoặc audit rule.

## Luồng Thực Thi

1. Xác định entity, aggregate và ownership từ domain boundary đã chốt.
2. Liệt kê query pattern chính cho write, read và reporting.
3. Thiết kế `tables` và `relationships` theo domain và ownership.
4. Chốt `constraints` để bảo vệ invariant ở mức database khi phù hợp.
5. Chọn `indexes` tối thiểu theo query pattern quan trọng nhất.
6. Thiết kế `retention_rules` và `audit_rules` cho vòng đời dữ liệu.
7. Ghi `design_risks` cho các điểm có thể ảnh hưởng scale, consistency hoặc migration.

## Quy Tắc Chất Lượng

- Mỗi bảng phải có owner rõ trong `owner_module`.
- Khi `domain-architecture` đã chạy cho hệ thống này, mỗi giá trị `owner_module` phải trace về đúng entry trong `ownership_map` của nó; nếu owner của bảng không khớp, ghi mismatch vào `design_risks` thay vì để lệch âm thầm.
- Không thiết kế quan hệ chéo domain vô tội vạ chỉ để tiện join.
- Không thêm index nếu không gắn với query pattern cụ thể.
- Không coi retention là việc xử lý sau; phải chốt ngay trong design nếu dữ liệu có vòng đời rõ.
- Nếu business invariant quan trọng, phải nêu rõ enforce ở domain, database hay cả hai.
- Tài liệu phải lưu UTF-8 và giữ nguyên tiếng Việt có dấu.

## Luật Ra Quyết Định

- Ưu tiên ownership theo domain/module trước khi tối ưu theo technical convenience.
- Giữ transaction boundary càng gần aggregate càng tốt.
- Nếu write model và read model có mục tiêu khác nhau rõ rệt, ghi rõ trong `read_write_patterns` thay vì ép vào một schema mơ hồ.
- Nếu dữ liệu cần purge hoặc archive theo compliance, bắt buộc có `retention_rules`.
- Nếu rủi ro performance chưa chắc chắn, ghi vào `design_risks` để chuyển sang `database-change-review` hoặc `query-performance` ở bước verify.

## Điều Kiện Hoàn Tất

- Có `tables`, `relationships`, `constraints` và `indexes` ở mức đủ để implement.
- Có `owner_module` cho từng bảng hoặc logical store chính.
- Có `retention_rules` và `audit_rules` nếu dữ liệu không phải dạng ephemeral.
- Có `design_risks` và `notes_for_next_step` đủ để chia task hoặc review rollout.
