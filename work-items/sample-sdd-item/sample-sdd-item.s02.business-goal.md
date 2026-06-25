---
artifact_id: "sample-sdd-item.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "sample-sdd-item"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
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
spec_status: reviewed
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sample-sdd-item.s01.restate.md"
linked_artifacts:
  - "product-specs/brd/sample-sdd-item.md"
  - "product-specs/srs/sample-sdd-item.md"
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Summarize the user problem, business outcome, success metric and non-goals.

## Step Contract
```yaml
step_goal: ""
input_summary: []
output_summary: []
done_when: []
owner: ""
```

## Main Artifact
```yaml
user_problem: "The operator role needs to constrain search results by workspace to review local Codex sessions more accurately."
business_goal: "Allow search by workspace without changing the default behavior of the current flow."
success_metrics:
  - "the review role finds the right session by workspace without manual filtering"
  - "a request without a workspace filter still produces a backward-compatible output"
non_goals:
  - "do not change the session schema"
  - "do not add write or repair rights to the read-only flow"
constraints:
  - "keep mcp/session-search in the read-only scope"
assumptions:
  - "the workspace filter is an optional input"
```

## SDD Traceability
```yaml
requirement_refs: [BRD-001, BRD-002]
acceptance_refs: [AC-001, AC-002, AC-003]
task_refs: []
test_refs: []
```

## Traceability
```yaml
upstream:
  - "sample-sdd-item.s01.restate.md"
  - "product-specs/brd/sample-sdd-item.md"
next_step: "sample-sdd-item.s03.open-questions.md"
```

## Handoff
- User problem locked: filter results by workspace to reduce noise.
- Non-goals: do not touch the cass schema, do not open a write flow.
- Conditions to move to step 3: resolve the input gap so the BRD/SRS is clear enough for AC and freeze.