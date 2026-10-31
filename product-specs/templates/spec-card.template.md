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

## Optional Behavior Scenarios

Use this section only when scenarios clarify changed behavior. Keep the accepted
behavior here in the owning specification and reference its IDs from workflow
notes. For an inapplicable change, state the reason and omit the scenario payload.
Do not invent a missing product decision to complete an example.

```yaml
# Illustrative fields, not a new mandatory artifact/schema. Replace with accepted facts.
# scenarios:
#   - id: SC-001
#     actor_or_context: "Event consumer receives a previously processed event ID"
#     preconditions: ["The ID was accepted successfully once"]
#     success_outcome: "Outcome determined by the accepted duplicate-event rule"
#     failure_outcome: "Observable handling determined by the accepted error rule"
#     rule_refs: ["<existing rule ID>"]
#     acceptance_refs: ["<existing AC ID>"]
# Missing first-value/last-value or error policy belongs in the existing open decisions.
```
