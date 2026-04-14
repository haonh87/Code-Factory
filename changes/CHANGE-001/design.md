---
change_id: "CHANGE-001"
artifact_kind: "change-design"
status: approved
linked_work_items:
  - "sample-sdd-item"
---

# Change Design - CHANGE-001

## Design
```yaml
summary: "Đẩy workspace filter xuống query path read-only và giữ fallback hành vi cũ khi input trống."
technical_changes:
  - "thêm workspace filter optional vào request parsing"
  - "apply filter ở query layer"
ux_or_runtime_changes:
  - "path invalid phải trả lỗi rõ nghĩa"
risk_notes:
  - "normalize path sai có thể làm miss kết quả"
```
