---
artifact_id: "sample-sdd-item.srs"
artifact_family: product-spec
spec_type: SRS
spec_status: frozen
spec_version: "1.0"
owner: "ba"
reviewers:
  - "developer"
  - "qc"
  - "devops"
source_of_truth: true
linked_work_items:
  - "work-items/sample-sdd-item"
linked_changes: []
---

# SRS - Sample SDD Item

## Metadata
```yaml
scope_slug: "sample-sdd-item"
source_refs:
  - "product-specs/brd/sample-sdd-item.md"
dependency_refs: []
```

## Requirement Spec
```yaml
functional_requirements:
  - id: SRS-FR-001
    description: "Flow search phải chấp nhận workspace filter dạng path chuẩn hóa."
    source_refs: [BRD-001]
    acceptance_refs: [AC-001]
  - id: SRS-FR-002
    description: "Kết quả trả về chỉ gồm session thuộc workspace được yêu cầu."
    source_refs: [BRD-001, BRD-002]
    acceptance_refs: [AC-002]
non_functional_requirements:
  - id: SRS-NFR-001
    category: compatibility
    description: "Khi không có workspace filter, hành vi và output shape phải tương thích với flow hiện tại."
    acceptance_refs: [AC-003]
ux_system_behavior:
  - id: SRS-UX-001
    description: "Nếu workspace path không hợp lệ, hệ thống phải trả về thông báo lỗi rõ nghĩa để role vận hành biết cách sửa input."
    acceptance_refs: [AC-004]
constraints:
  - "Không thay đổi schema session hiện có"
dependencies:
  - "cass read-only query layer"
open_questions: []
```
