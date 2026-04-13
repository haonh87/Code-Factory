# Governance Checklist Profile: `strict`

Profile này kế thừa toàn bộ `default` và thêm các kiểm tra chặt hơn.

## Khi Dùng

- change đụng nhiều boundary hoặc nhiều owner
- migration, data compatibility, external integration
- packaging/runtime/release impact đáng kể
- rollback cost cao hoặc khó sửa nóng

## Kiểm Tra Bổ Sung So Với `default`

### Acceptance + DoR

- reviewer coverage đã được chỉ rõ theo boundary chính
- backward compatibility hoặc migration assumption đã được ghi rõ
- release impact và rollback expectation đã được nhận diện trước khi implement

### Technical Approach

- trade-off đã chỉ ra vì sao approach được chọn vẫn chấp nhận được theo `governance`
- nếu có lệch chuẩn, `governance-exception` đã có owner và mitigation trước khi step đóng

### Task Plan

- plan có task riêng cho migration, verify compatibility hoặc rollout khi scope yêu cầu
- task review không bị gộp ngầm vào build task nếu boundary đủ lớn để tách

### Verify + DoD

- evidence có đủ cho release decision, không chỉ đủ cho local correctness
- rollback path hoặc remediation path đã được nêu nếu release risk còn mở
- exception còn mở phải có trạng thái rõ và owner rõ

## Cách Materialize

- `checklist_name`: `strict`
- `checklist_refs`: trỏ file này, và có thể giữ thêm `default.md` nếu muốn trace rõ profile kế thừa
