---
language: vi
name: database-change-review
description: Rà soát an toàn và tính đúng đắn của thay đổi dữ liệu trước khi bàn giao hoặc rollout. Dùng khi feature có thay đổi schema, migration, backfill, query quan trọng, retention hoặc logic dữ liệu; đánh giá migration safety, compatibility, lock risk, rollback, query risk và khuyến nghị release.
---

# Database Change Review

> English: SKILL.md

Rà soát thay đổi liên quan đến database để quyết định có thể rollout an toàn hay còn khoảng trống cần xử lý.

## Mục Tiêu

- Đánh giá rủi ro rollout của migration, backfill và query thay đổi.
- Kiểm tra backward compatibility, rollback và lock/downtime risk.
- Kiểm tra các thay đổi dữ liệu có còn phù hợp với schema design và retention rule đã chốt hay không.
- Tạo khuyến nghị release rõ ràng trước khi bàn giao hoặc triển khai.

## Khi Sử Dụng

- Khi feature có migration schema, index mới, đổi constraint hoặc backfill dữ liệu.
- Khi query chính thay đổi và có khả năng tác động performance.
- Khi thay đổi retention, archive, purge hoặc audit rule.
- Khi cần quyết định rollout một thay đổi database trên môi trường thật.

## Không Thuộc Phạm Vi

- Không thay thế cho bước thiết kế schema ban đầu.
- Không viết migration từ đầu nếu chưa có thay đổi cụ thể.
- Không benchmark chi tiết toàn bộ hệ thống production.
- Không thay thế kiểm thử chức năng tổng thể của feature.

## Đầu Vào Tối Thiểu

- `database_design`: artifact từ `database-design`.
- `change_set`: migration, DDL, query change, retention change hoặc diff liên quan.
- `deployment_context`: môi trường rollout, kích thước dữ liệu ước tính, mô hình deploy.
- `verification_evidence`: test, explain plan, log, dry-run hoặc kết quả kiểm tra hiện có.

Nếu chưa có `change_set` hoặc không xác định được môi trường rollout, dừng và yêu cầu bổ sung.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

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

## Ý Nghĩa Từng Output

- `review_scope`: phạm vi thay đổi database được rà soát.
- `migration_plan`: thứ tự rollout an toàn cho các thay đổi schema hoặc data.
- `backfill_plan`: chiến lược xử lý dữ liệu cũ nếu schema mới cần.
- `rollback_plan`: có thể quay lui hay không và cách quay lui thực tế.
- `compatibility_risks`: rủi ro do app cũ/app mới cùng chạy hoặc do schema chuyển tiếp.
- `lock_risks`: nguy cơ khóa bảng, downtime hoặc chậm hệ thống khi rollout.
- `query_risks`: nguy cơ query regression, thiếu index hoặc N+1 logic ở tầng truy vấn.
- `retention_risks`: rủi ro do archive/purge/audit không khớp yêu cầu.
- `release_recommendation`: kết luận cuối cùng về việc rollout.
- `required_actions`: việc bắt buộc phải làm thêm trước khi release.
- `evidence`: bằng chứng dùng để chấm khuyến nghị release.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 8 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Database Review`.
- Chỉ tạo block này khi thay đổi thực sự chạm schema, query, migration, retention hoặc rollback concern của database.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.

## Luồng Đánh Giá

1. Xác định phạm vi thay đổi database trong `review_scope`.
2. So sánh `change_set` với `database_design` để tìm lệch thiết kế.
3. Kiểm tra migration order, backward compatibility và lock risk.
4. Đánh giá nhu cầu backfill, batch strategy và safety control.
5. Kiểm tra rollback feasibility trong điều kiện deploy thực tế.
6. Soát `query_risks` theo query pattern chính và bằng chứng hiện có.
7. Soát `retention_risks` nếu dữ liệu có archive, purge hoặc audit requirement.
8. Kết luận `release_recommendation` và liệt kê `required_actions`.

## Quy Tắc Chấm Trạng Thái

- `GO`: thay đổi có bằng chứng đủ, không còn risk nghiêm trọng chưa kiểm soát.
- `GO_WITH_GUARDS`: có thể rollout nhưng phải kèm guard rõ như batch, feature flag, monitor, manual step.
- `NO_GO`: còn compatibility risk, lock risk hoặc rollback gap nghiêm trọng.

## Quy Tắc Chất Lượng

- Không kết luận `GO` nếu chưa có bằng chứng tối thiểu cho migration order và rollback.
- Nếu không có số liệu dữ liệu thật, phải ghi rõ giả định và nâng mức rủi ro tương ứng.
- Không bỏ qua retention hoặc audit khi change set chạm vào vòng đời dữ liệu.
- Nếu query risk chưa chứng minh được, phải liệt kê `required_actions` thay vì mặc định an toàn.
- Tài liệu phải lưu UTF-8 và giữ nguyên tiếng Việt có dấu.

## Điều Kiện Hoàn Tất

- Có `release_recommendation` rõ ràng.
- Có `required_actions` cho mọi rủi ro chưa đóng.
- Có `evidence` hoặc nêu rõ lỗ hổng bằng chứng nếu chưa đủ.
- Có `migration_plan`, `rollback_plan` và `query_risks` cho mọi thay đổi database đáng kể.
