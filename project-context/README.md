# Governance Pack

Thư mục này là source-of-truth cho `governance layer` ở mức project.

## Thành Phần

- `constitution.md`: các nguyên tắc nền bắt buộc phải tôn trọng trong workflow.
- `project-context.md`: bối cảnh đang có hiệu lực của repo, default profile, rule chọn checklist và các shortcut bị cấm.
- `governance-role-model.md`: authority model cho role, signoff, exception và waiver.
- `checklists/default.md`: checklist mặc định cho phần lớn work item.
- `checklists/strict.md`: checklist tăng cường cho change có nhiều rủi ro hoặc nhiều boundary.
- `checklists/regulated.md`: checklist tăng cường thêm cho scope có yêu cầu audit, approval hoặc compliance chặt.
- `governance-exception-register.md`: register theo dõi `governance-exception` hoặc `waiver` đang mở và lịch sử xử lý.

## Cách Dùng Trong Workflow

- `governance_ref`:
  mặc định trỏ `project-context/project-context.md`.
- `governance_profile`:
  dùng một trong `default|strict|regulated|custom`.
- `checklist_refs`:
  trỏ tới một hoặc nhiều checklist trong `project-context/checklists/`.
- approval authority:
  tra theo `governance-role-model.md`, không suy diễn chỉ từ `role_signoffs`.
- `governance-exception`:
  phải xuất hiện trong note step liên quan, đồng thời được ghi vào `governance-exception-register.md` nếu exception còn mở hoặc cần audit xuyên step.

## Chọn Profile

| Profile | Khi dùng |
|---|---|
| `default` | feature hoặc bug thông thường, scope vừa phải, không có migration/runtime/release risk đáng kể |
| `strict` | change đụng nhiều boundary, migration, release path, external integration, data change hoặc rollback risk |
| `regulated` | scope cần audit trail, approval chain, evidence retention hoặc compliance/control chặt hơn bình thường |
| `custom` | khi project hoặc work item có rule riêng; vẫn nên kế thừa ít nhất một profile nền |

## Quy Ước Tối Thiểu

- Không tạo workflow governance riêng.
- Không dùng checklist profile như source-of-truth thay cho note step.
- Không đóng `DoR`, `DoD`, `release` hoặc `business_acceptance` nếu requirement governance còn đang mở mà không có owner hoặc waiver rõ.
