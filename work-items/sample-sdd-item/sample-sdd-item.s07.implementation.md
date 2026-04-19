---
artifact_id: "sample-sdd-item.s07.implementation"
artifact_family: workflow-step
work_item_slug: "sample-sdd-item"
step_id: "s07"
step_slug: "implementation"
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
spec_status: implemented
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
  - "implementation"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sample-sdd-item.s06.task-breakdown.md"
linked_artifacts:
  - "product-specs/brd/sample-sdd-item.md"
  - "product-specs/srs/sample-sdd-item.md"
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.

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
implemented_changes:
  - "thêm optional workspace filter vào flow query"
  - "giữ fallback path cũ khi workspace filter trống"
doc_changes:
  - "cập nhật note implementation và verify scope"
operational_notes:
  - "không cần migration"
```

## Implementation Notes
```yaml
framework_notes:
  - "path được normalize trước khi query"
known_limitations:
  - "sample này chưa triển khai runner runtime riêng"
```

## Spec Change
```yaml
change_id: "CHANGE-001"
detected_in_step: s07
impact_area: technical
current_spec_refs:
  - "SRS-FR-001"
  - "SRS-FR-002"
problem: "Không phát sinh spec gap mới trong implementation sample."
proposed_change: "Không cập nhật BRD/SRS ở vòng này."
decision: DEFERRED
decision_owner: "developer"
updated_artifacts: []
required_followups: []
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
  - "sample-sdd-item.s06.task-breakdown.md"
next_step: "sample-sdd-item.s08.verification.md"
```

## Handoff
- Outputs actual: workspace filter flow, compatibility guard và error handling.
- Known limitations: sample chưa có runtime adapter riêng cho multi-agent.
- Notes for testing: cần chứng minh AC-001 tới AC-004 bằng evidence rõ.
- Notes for deployment khi có: release impact thấp, không migration.
