---
artifact_id: "<scope-slug>.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: draft
spec_version: "0.1"
owner: "ba"
reviewers:
  - "developer"
source_of_truth: true
linked_work_items: []
linked_crs: []
---

# Spec Card - <scope-title>

> Spec Card là source-of-truth duy nhất cho work item chạy `sdd_mode=light`.
> Thay cho BRD + SRS riêng, Light gộp business goal, requirement, acceptance,
> provenance, freeze và open decision vào một card. Validator kiểm semantic:
> REQ/AC mapping, provenance (`BASELINE` hoặc `CR-###`), freeze authority và
> no-duplicate-trace.

## Business Goal
```yaml
business_goal: ""
in_scope:
  - ""
out_scope:
  - ""
```

## Requirements
```yaml
# Mỗi requirement phải có provenance. BASELINE = có sẵn trong spec hiện tại;
# CR-### = requirement delta đến từ change request đã approve. cr_required=true
# bắt buộc provenance là CR-###.
requirements:
  - id: REQ-001
    description: ""
    provenance: BASELINE
    cr_required: false
```

## Acceptance Criteria
```yaml
# Mỗi AC phải map về một requirement id tồn tại ở trên. Mỗi requirement phải
# có ít nhất một AC (no-duplicate-trace / full mapping).
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    description: ""
```

## Assumptions And Open Decisions
```yaml
assumptions:
  - id: ASM-001
    description: ""
    owner: "ba"
open_decisions:
  - id: ODC-001
    description: ""
    owner: "po"
```

## Spec Freeze
```yaml
# authority là người có quyền freeze spec (theo governance role model).
# Thiếu authority làm validator fail.
status: draft
authority: ""
decided_at: ""
```