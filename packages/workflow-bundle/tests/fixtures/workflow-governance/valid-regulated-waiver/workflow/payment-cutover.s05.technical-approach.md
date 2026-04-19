---
artifact_id: "payment-cutover.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "payment-cutover"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: CHANGE
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: regulated
governance_status: EXCEPTION_RECORDED
checklist_refs:
  - "project-context/checklists/regulated.md"
sdd_mode: strict
spec_refs:
  brd: "product-specs/brd/payment-cutover.md"
  srs: "product-specs/srs/payment-cutover.md"
spec_status: approved
execution_mode: multi_agent
execution_roles:
  - developer
  - devops
  - qc
role_signoffs:
  dor: []
  approach:
    - developer
    - devops
  task_plan: []
  release:
    - devops
  business_acceptance:
    - po
  dod:
    - qc
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - developer
    - devops
  approach_reviewed_at: "2026-04-14T10:30:00Z"
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - codex-workflow-chain
artifact_skills:
  - obsidian-markdown
upstream_artifacts: []
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s05
---

# Step 5 - Technical Approach

## Step Contract
```yaml
step_goal: "Chọn approach cho payment cutover có rollback path rõ."
exit_when:
  - "Approach đã chốt boundary và release path."
```

## Option Analysis
```yaml
options:
  - "Blue/green cutover"
  - "In-place switch"
recommended_option: "Blue/green cutover"
```

## Artifact Chính
```yaml
recommended_approach: "Blue/green cutover với dual-write ngắn hạn"
why: "Giảm risk khi rollback"
```

## Architecture Details
```yaml
runtime_impact:
  - "Cần window giám sát 30 phút sau cutover"
rollback_path: "Quay về payment gateway cũ nếu error rate vượt ngưỡng"
```

## Governance Exceptions
```yaml
exception_id: GOV-EX-900
principle_ref: release-readiness
reason: "Không thể chứng minh full parity trên production-like data trước cutover"
impact: "Cần accepted deviation ở release window đầu tiên"
mitigation:
  - "Theo dõi error rate"
  - "Chuẩn bị rollback script"
owner: "devops"
status: PROPOSED
```

## Traceability
```yaml
next_step: "payment-cutover.s06.task-breakdown.md"
```

## Handoff
- Điều đã rõ: approach ưu tiên rollback nhanh.
- Điều còn cần theo dõi: acceptance của release waiver.
- Điều kiện sang step 6: task plan phải cover mitigation và monitoring.
