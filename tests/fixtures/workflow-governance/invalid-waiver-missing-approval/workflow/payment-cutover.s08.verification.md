---
artifact_id: "payment-cutover.s08.verification"
artifact_family: workflow-step
work_item_slug: "payment-cutover"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: CHANGE
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: regulated
governance_status: WAIVER_APPROVED
checklist_refs:
  - "project-context/checklists/regulated.md"
sdd_mode: strict
spec_refs:
  brd: "product-specs/brd/payment-cutover.md"
  srs: "product-specs/srs/payment-cutover.md"
spec_status: verified
execution_mode: multi_agent
execution_roles:
  - qc
  - devops
role_signoffs:
  dor: []
  approach: []
  release:
    - devops
  business_acceptance:
    - po
  dod:
    - qc
content_skills:
  - codex-workflow-chain
artifact_skills:
  - obsidian-markdown
upstream_artifacts: []
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s08
---

# Step 8 - Verify + DoD

## Step Contract
```yaml
step_goal: "Case fail vì WAIVER_APPROVED nhưng thiếu approval metadata."
```

## Artifact Chính
```yaml
verification_scope:
  - "Cutover evidence"
summary_verdict: PASS_WITH_WAIVER
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/regulated.md"
checks:
  - id: GOV-CHK-501
    status: PASS
    evidence: "Checks vẫn pass để cô lập lỗi approval"
blocking_items: []
owner: "qc"
next_action: "Không có"
```

## Governance Exceptions
```yaml
exception_id: GOV-EX-901
principle_ref: release-readiness
reason: "Cần accepted deviation ngắn hạn"
impact: "Có waiver nhưng note cố tình thiếu approved_by và review_date"
mitigation:
  - "Theo dõi sau release"
owner: "devops"
status: APPROVED
```

## Definition of Done
```yaml
status: DONE_WITH_WAIVER
```

## Traceability
```yaml
next_step: ""
```

## Handoff
- Điều đã rõ: fixture này phải fail vì thiếu `approved_by` và `review_date`.
