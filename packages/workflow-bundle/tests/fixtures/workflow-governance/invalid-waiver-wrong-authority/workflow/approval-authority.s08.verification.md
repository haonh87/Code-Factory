---
artifact_id: "approval-authority.s08.verification"
artifact_family: workflow-step
work_item_slug: "approval-authority"
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
  - po
role_signoffs:
  dor: []
  approach: []
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
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by:
    - qc
  dod_reviewed_at: "2026-04-15T09:30:00Z"
content_skills:
  - codex-workflow-chain
artifact_skills:
  - obsidian-markdown
upstream_artifacts:
  - "approval-authority.s05.technical-approach.md"
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s08
---

# Step 8 - Verify + DoD

## Step Contract
```yaml
step_goal: "Case fail vì waiver không đúng authority tối thiểu."
exit_when:
  - "Validator phải bắt authority sai."
```

## Artifact Chính
```yaml
verification_scope:
  - "Release gate"
summary_verdict: PASS_WITH_WAIVER
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/regulated.md"
checks:
  - id: GOV-CHK-401
    status: PASS
    evidence: "Cutover checklist đã đủ"
blocking_items: []
owner: "qc"
next_action: "Không nên pass vì authority sai"
```

## Governance Exceptions
```yaml
exception_id: GOV-EX-902
principle_ref: release-readiness
reason: "Chấp nhận cutover không có rehearsal đầy đủ"
impact: "Release và business acceptance đều bị ảnh hưởng"
mitigation:
  - "Monitor 30 phút đầu"
owner: "devops"
approved_by: "devops"
review_date: "2026-04-13"
status: APPROVED
```

## Audit
```yaml
status: FAIL
notes:
  - "Authority cố ý sai để validator bắt lỗi"
```

## Definition of Done
```yaml
status: DONE_WITH_WAIVER
residual_risks:
  - "Authority approval chưa đúng"
```
