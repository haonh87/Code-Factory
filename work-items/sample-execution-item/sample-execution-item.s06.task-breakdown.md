---
artifact_id: "sample-execution-item.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "sample-execution-item"
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
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
execution_mode: multi_agent
execution_roles:
  - "coordinator"
  - "planner"
  - "dependency-reviewer"
review_mode: independent
verification_owner: "auditor"
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
  - "sample-execution-item.s05.technical-approach.md"
linked_artifacts:
  - "sample-execution-item.s06.worker-assignment.md"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.

## Step Contract
```yaml
step_goal: "Tách task đủ nhỏ để nhiều worker thực hiện song song nhưng vẫn merge được an toàn."
input_summary:
  - "technical approach đã chốt"
  - "execution policy đã có coordinator và verification owner"
output_summary:
  - "task breakdown"
  - "worker assignment seed"
done_when:
  - "task split rõ boundary"
  - "verify path map được về step 8"
owner: "coordinator"
```

## Artifact Chính
```yaml
tasks:
  - "TASK-EXEC-001: chốt backend callback implementation scope"
  - "TASK-EXEC-002: chốt frontend login state/update scope"
  - "TASK-EXEC-003: chuẩn bị verification checklist và evidence refs"
dependencies:
  - "provider constraints từ step 5"
  - "role ownership không được overlap path lõi"
handoff_points:
  - "planner -> backend-builder"
  - "planner -> frontend-builder"
  - "coordinator -> auditor"
```

## Verification Plan
- Check bắt buộc: evidence cho login happy path, callback path và fallback path.
- Risk note: worker có thể đụng cùng auth module nếu split không đủ kỹ.
- Rollout note nếu có: chưa có release artifact riêng; giữ ở mức sample runtime contract.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "execution runtime không bypass workflow note làm source of truth"
  - "verification owner tách khỏi builder chính"
blocking_items: []
owner: "coordinator"
next_action: "phát assignment cho step 7"
```

## Execution Runtime
```yaml
execution_mode: multi_agent
review_mode: independent
verification_owner: "auditor"
runtime_artifacts:
  - "sample-execution-item.s06.worker-assignment.md"
```

## Traceability
```yaml
upstream:
  - "sample-execution-item.s05.technical-approach.md"
next_step: "sample-execution-item.s07.implementation.md"
```

## Handoff
- Task thực hiện trước: backend callback boundary, frontend login boundary, verify checklist.
- Phụ thuộc chặn: chưa có.
- Điều kiện sang step 7: mọi worker phải có owned_scope và done_when rõ.
