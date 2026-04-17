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
  - po
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
upstream_artifacts:
  - "payment-cutover.s05.technical-approach.md"
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s08
---

# Step 8 - Verify + DoD

## Step Contract
```yaml
step_goal: "Đánh giá evidence cutover và chốt waiver còn mở."
exit_when:
  - "Compliance verdict rõ."
  - "Waiver authority đã được ghi nhận."
```

## Artifact Chính
```yaml
verification_scope:
  - "Cutover runbook"
  - "Rollback readiness"
summary_verdict: PASS_WITH_WAIVER
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/regulated.md"
checks:
  - id: GOV-CHK-301
    status: PASS
    evidence: "Runbook, monitoring và rollback evidence đã có"
blocking_items: []
owner: "qc"
next_action: "Đóng release gate với waiver còn hiệu lực"
```

## Governance Exceptions
```yaml
exception_id: GOV-EX-900
principle_ref: release-readiness
reason: "Không có production-like rehearsal hoàn chỉnh"
impact: "Chấp nhận deviation có điều kiện trong release window đầu"
mitigation:
  - "Theo dõi error rate 30 phút đầu"
  - "Rollback nếu vượt ngưỡng"
owner: "devops"
approved_by: "po,qc,devops"
review_date: "2026-04-13"
status: APPROVED
```

## Spec Coverage
```yaml
coverage:
  - ref: "REL-001"
    status: PASS
```

## Audit
```yaml
status: PASS
notes:
  - "Waiver đã trace vào register"
```

## Definition of Done
```yaml
status: DONE_WITH_WAIVER
residual_risks:
  - "Release đầu cần monitor chặt"
```

## Traceability
```yaml
upstream:
  - "payment-cutover.s05.technical-approach.md"
```

## Handoff
- Điều đã rõ: waiver đã được approve và trace vào register.
- Điều còn cần theo dõi: monitor sau cutover.
- Điều kiện đóng work item: release window hoàn tất không có incident nghiêm trọng.
