---
artifact_id: "sample-sdd-item.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "sample-sdd-item"
step_id: "s06"
step_slug: "task-breakdown"
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
spec_status: frozen
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sample-sdd-item.s05.technical-approach.md"
linked_artifacts:
  - "product-specs/brd/sample-sdd-item.md"
  - "product-specs/srs/sample-sdd-item.md"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.

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
tasks:
  - "TASK-001: thêm workspace filter vào request parsing và query path"
  - "TASK-002: giữ backward compatibility khi filter trống"
  - "TASK-003: thêm test và evidence cho invalid workspace path"
dependencies:
  - "SRS frozen"
handoff_points:
  - "developer -> qc sau khi xong TASK-001 và TASK-002"
```

## Verification Plan
- Check bắt buộc: verify AC-001 tới AC-004.
- Risk note: path normalize sai có thể làm miss kết quả.
- Rollout note nếu có: không có migration hoặc promotion guard đặc biệt.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "task plan đã cover build, verify và compatibility check"
blocking_items: []
owner: "developer"
next_action: "thực hiện TASK-001 tới TASK-003"
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
  - "sample-sdd-item.s05.technical-approach.md"
next_step: "sample-sdd-item.s07.implementation.md"
```

## Handoff
- Task thực hiện trước: TASK-001 rồi TASK-002 và TASK-003.
- Phụ thuộc chặn: SRS phải giữ frozen.
- Điều kiện sang step 7: code change và test hook đủ cho verify.
