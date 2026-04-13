# Governance Exception Register

Register này dùng để theo dõi `governance-exception` hoặc `waiver` còn mở, hoặc cần audit xuyên nhiều step.

## Khi Nào Phải Ghi Vào Register

- exception còn mở sau step đang xử lý
- exception ảnh hưởng tới `DoD`, `release` hoặc `business_acceptance`
- exception cần được theo dõi qua nhiều step hoặc nhiều role
- work item chạy profile `regulated`

## Quy Trình Tối Thiểu

1. Ghi `governance-exception` trong note step liên quan.
2. Thêm một dòng vào register này.
3. Cập nhật trạng thái khi mitigation hoàn tất, waiver được approve hoặc exception được đóng.

## Template Nhanh

```yaml
exception_id: GOV-EX-001
work_item_ref: ""
step_ref: ""
principle_ref: ""
reason: ""
impact: ""
mitigation: []
owner: ""
approved_by: ""
status: PROPOSED|APPROVED|REJECTED|EXPIRED|RESOLVED
review_date: ""
notes: ""
```

## Register

| Exception ID | Work Item | Step | Principle | Owner | Status | Review Date | Notes |
|---|---|---|---|---|---|---|---|
| _none_ |  |  |  |  |  |  | Chưa có exception đang mở ở mức project |
