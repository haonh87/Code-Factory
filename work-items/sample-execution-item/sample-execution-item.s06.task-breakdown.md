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
> Summarize the task plan, dependencies, verify checkpoints and review checkpoints.

## Step Contract
```yaml
step_goal: "Split tasks small enough that several workers can run in parallel but still merge safely."
input_summary:
  - "technical approach locked"
  - "execution policy has a coordinator and a verification owner"
output_summary:
  - "task breakdown"
  - "worker assignment seed"
done_when:
  - "the task split has clear boundaries"
  - "the verify path maps to step 8"
owner: "coordinator"
```

## Main Artifact
```yaml
tasks:
  - "TASK-EXEC-001: lock the backend callback implementation scope"
  - "TASK-EXEC-002: lock the frontend login state/update scope"
  - "TASK-EXEC-003: prepare the verification checklist and evidence refs"
dependencies:
  - "provider constraints from step 5"
  - "role ownership must not overlap on the core path"
handoff_points:
  - "planner -> backend-builder"
  - "planner -> frontend-builder"
  - "coordinator -> auditor"
```

## Verification Plan
- Mandatory check: evidence for the login happy path, the callback path and the fallback path.
- Risk note: workers can collide on the same auth module if the split is not fine enough.
- Rollout note if any: no separate release artifact; keep it at the sample runtime contract level.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "the execution runtime does not bypass the workflow note as the source of truth"
  - "the verification owner is separated from the main builder"
blocking_items: []
owner: "coordinator"
next_action: "issue the assignment for step 7"
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
- Tasks to do first: backend callback boundary, frontend login boundary, verify checklist.
- Blocking dependencies: none yet.
- Conditions to move to step 7: every worker must have a clear owned_scope and done_when.
