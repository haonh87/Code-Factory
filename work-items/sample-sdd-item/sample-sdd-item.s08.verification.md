---
artifact_id: "sample-sdd-item.s08.verification"
artifact_family: workflow-step
work_item_slug: "sample-sdd-item"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: FEATURE
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: "CHANGE-001"
change_status: verified
spec_delta_refs:
  - "changes/CHANGE-001/spec-delta/brd.delta.md"
  - "changes/CHANGE-001/spec-delta/srs.delta.md"
archive_status: ready_to_archive
sdd_mode: strict
spec_refs:
  brd: "product-specs/brd/sample-sdd-item.md"
  srs: "product-specs/srs/sample-sdd-item.md"
spec_status: verified
execution_mode: agentic
execution_roles: []
role_signoffs:
  dor: []
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
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
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "testing"
  - "code-scan-review"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sample-sdd-item.s07.implementation.md"
linked_artifacts:
  - "product-specs/brd/sample-sdd-item.md"
  - "product-specs/srs/sample-sdd-item.md"
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Tóm tắt kết quả verify, governance compliance, residual risk và kết luận DoD.

## Step Contract
```yaml
step_goal: ""
input_summary: []
output_summary: []
done_when: []
owner: ""
```

## Artifact Chính
```yaml
verification_scope:
  - "AC-001 tới AC-004"
  - "backward compatibility khi workspace filter trống"
evidence_refs:
  - "TEST-001"
  - "TEST-002"
  - "TEST-003"
  - "TEST-004"
summary_verdict: PASS
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "governance context đã được phản ánh tới verify verdict"
  - "không còn exception mở"
blocking_items: []
owner: "qc"
next_action: "chốt DoD và business acceptance readiness"
```

## Spec Coverage
```yaml
coverage:
  - requirement_id: SRS-FR-001
    acceptance_refs: [AC-001]
    task_refs: [TASK-001]
    test_refs: [TEST-001]
    status: PASS
    evidence: "workspace filter được parse và apply"
    gaps: []
  - requirement_id: SRS-FR-002
    acceptance_refs: [AC-002]
    task_refs: [TASK-001]
    test_refs: [TEST-002]
    status: PASS
    evidence: "kết quả chỉ chứa session thuộc workspace yêu cầu"
    gaps: []
  - requirement_id: SRS-NFR-001
    acceptance_refs: [AC-003]
    task_refs: [TASK-002]
    test_refs: [TEST-003]
    status: PASS
    evidence: "behavior giữ tương thích khi filter trống"
    gaps: []
  - requirement_id: SRS-UX-001
    acceptance_refs: [AC-004]
    task_refs: [TASK-003]
    test_refs: [TEST-004]
    status: PASS
    evidence: "path invalid trả lỗi rõ nghĩa"
    gaps: []
status: PASS
```

## Scan Summary
```yaml
status: PASS
notes:
  - "không có issue blocker từ code scan trong sample"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "traceability BRD/SRS -> AC -> TASK -> TEST đầy đủ cho sample"
```

## Definition of Done
```yaml
status: DONE
residual_risks: []
owners:
  - "qc"
  - "po"
```

## SDD Traceability
```yaml
requirement_refs: [SRS-FR-001, SRS-FR-002, SRS-NFR-001, SRS-UX-001]
acceptance_refs: [AC-001, AC-002, AC-003, AC-004]
task_refs: [TASK-001, TASK-002, TASK-003]
test_refs: [TEST-001, TEST-002, TEST-003, TEST-004]
```

## Traceability
```yaml
upstream:
  - "sample-sdd-item.s07.implementation.md"
  - "product-specs/brd/sample-sdd-item.md"
  - "product-specs/srs/sample-sdd-item.md"
next_step: ""
```

## Handoff
- Overall status: PASS, DoD đạt.
- Residual risks: không có risk mở trọng yếu trong sample.
- Recommendation: có thể dùng work item này làm canonical SDD sample cho validator và CI.
- Release recommendation khi có: READY.
- Next action: giữ sample đồng bộ khi contract SDD thay đổi.
