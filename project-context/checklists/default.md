# Governance Checklist Profile: `default`

Đây là checklist mặc định cho phần lớn work item.

## Khi Dùng

- bug, feature hoặc change thông thường
- scope không có yêu cầu audit đặc biệt
- không có migration hoặc release risk quá lớn

## Checklist Gợi Ý

### Clarify Và Open Questions

- intent, scope boundary và non-goals đã đủ rõ
- `governance context` đã được ghi nhận trong step note khi có rule liên quan
- blocker hoặc `governance blocker` còn lại đều có owner hoặc resolution path

### Acceptance + DoR

- acceptance criteria đo được và có thể verify
- role signoff cần thiết đã được nhận diện
- requirement hoặc rule nền đã được phản ánh vào `SRS` hoặc note workflow nếu cần

### Task Plan

- task plan có coverage cho build, verify và docs trong phạm vi thật sự cần
- nếu scope chạm release hoặc rollout, đã có task kiểm tra tối thiểu cho packaging/runtime/release
- nếu thấy khả năng lệch chuẩn, đã xác định trước cách ghi `governance-exception`

### Verify + DoD

- evidence đạt/chưa đạt đã được ghi rõ
- docs/spec liên quan đã được sync nếu behavior thay đổi
- gap còn lại có owner và next action

## Cách Materialize

- `checklist_name`: `default`
- `checklist_refs`: trỏ file này
- chỉ copy các check thực sự áp dụng vào block `## Governance Checks` của step
