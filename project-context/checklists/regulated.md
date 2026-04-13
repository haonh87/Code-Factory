# Governance Checklist Profile: `regulated`

Profile này kế thừa toàn bộ `strict` và thêm các kiểm tra cho scope cần audit hoặc approval chặt.

## Khi Dùng

- cần audit trail rõ hơn bình thường
- cần approval chain hoặc waiver approval rõ
- cần giữ evidence, decision log hoặc exception xuyên nhiều step
- có policy/compliance/control ngoài delivery lane thông thường

## Kiểm Tra Bổ Sung So Với `strict`

### Clarify Và Open Questions

- nguồn rule hoặc policy ngoài repo đã được nêu rõ trong evidence hoặc reference
- owner phê duyệt hoặc review authority đã được xác định

### Acceptance + DoR

- acceptance, review scope và evidence expectation đã được mô tả đủ để audit lại
- không để assumption quan trọng chỉ tồn tại ở chat log

### Technical Approach Và Implement

- mọi lệch chuẩn phải có `governance-exception` hoặc `waiver` ID rõ
- exception không được xem là approved nếu thiếu `approved_by` hoặc `review_date`

### Verify + DoD

- evidence đủ để audit lại decision chính
- release hoặc business acceptance phải nêu rõ residual risk và waiver còn mở nếu có
- exception register đã được cập nhật trước khi step 8 đóng

## Cách Materialize

- `checklist_name`: `regulated`
- `checklist_refs`: trỏ file này; có thể cộng thêm checklist chuyên ngành của work item nếu cần
