---
artifact_id: "sample-sdd-item.brd"
artifact_family: product-spec
spec_type: BRD
spec_status: frozen
spec_version: "1.0"
owner: "po"
reviewers:
  - "ba"
  - "qc"
source_of_truth: true
linked_work_items:
  - "work-items/sample-sdd-item"
linked_changes: []
---

# BRD - Sample SDD Item

## Metadata
```yaml
scope_slug: "sample-sdd-item"
decision_log_refs:
  - "work-items/sample-sdd-item/sample-sdd-item.s02.business-goal.md"
source_inputs:
  - "ticket: add workspace-aware session search"
```

## Business Context
```yaml
stakeholders:
  - "po"
  - "ba"
  - "developer"
problem_statement: "Người dùng cần giới hạn kết quả tra cứu session theo workspace để giảm nhiễu khi review history."
business_goals:
  - id: BRD-001
    description: "Cho phép tra cứu session theo workspace mà không phá behavior mặc định hiện có."
    kpi_refs: ["giảm thời gian lọc session bằng tay"]
scope:
  in:
    - "bổ sung workspace filter vào flow tra cứu session"
    - "giữ trace rõ từ business goal sang requirement và verify"
  out:
    - "thay đổi schema lưu session"
    - "thay đổi permission model của cass"
business_rules:
  - id: BRD-002
    rule: "Nếu không truyền workspace filter thì hành vi phải giữ tương thích ngược."
assumptions:
  - "workspace được biểu diễn bằng path chuẩn hóa"
decision_log:
  - "Ưu tiên thay đổi nhỏ, không mở migration"
acceptance_notes:
  - "PO chấp nhận nếu search theo workspace trả đúng tập kết quả mong muốn và fallback giữ nguyên"
```
