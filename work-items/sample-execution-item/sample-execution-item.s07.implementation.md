---
artifact_id: "sample-execution-item.s07.implementation"
artifact_family: workflow-step
work_item_slug: "sample-execution-item"
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
  - "backend-builder"
  - "frontend-builder"
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sample-execution-item.s06.task-breakdown.md"
linked_artifacts:
  - "sample-execution-item.s07.worker-handoff-report.md"
  - "sample-execution-item.s07.merge-report.md"
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Summarize the implemented change, remaining limits and notes for verify.

## Step Contract
```yaml
step_goal: "Execute the change per owned scope and return enough evidence for merge + audit."
input_summary:
  - "task breakdown and worker assignment"
  - "technical approach and execution policy"
output_summary:
  - "implemented changes"
  - "merge report"
done_when:
  - "a handoff report from the worker exists"
  - "the coordinator has merged and is ready for audit"
owner: "coordinator"
```

## Main Artifact
```yaml
implemented_changes:
  - "the backend callback flow is implemented per owned scope"
  - "the frontend login state is updated and its path is clearly separated"
doc_changes:
  - "update the execution runtime artifacts for step 7"
operational_notes:
  - "no separate release artifact yet"
```

## Implementation Notes
```yaml
framework_notes:
  - "this sample describes the runtime contract and does not ship a real code path"
known_limitations:
  - "the worker assignment is not yet materialized into a separate file per worker"
```

## Execution Runtime
```yaml
execution_mode: multi_agent
review_mode: independent
verification_owner: "auditor"
runtime_artifacts:
  - "sample-execution-item.s07.worker-handoff-report.md"
  - "sample-execution-item.s07.merge-report.md"
```

## Traceability
```yaml
upstream:
  - "sample-execution-item.s06.task-breakdown.md"
  - "sample-execution-item.s06.worker-assignment.md"
next_step: "sample-execution-item.s08.verification.md"
```

## Handoff
- Outputs actual: the builder handoff report and the coordinator merge report.
- Known limitations: the sample keeps only one canonical handoff report to illustrate the contract.
- Notes for testing: the verify owner must check the evidence before closing the audit.
- Notes for deployment if any: no separate deployment review yet.
