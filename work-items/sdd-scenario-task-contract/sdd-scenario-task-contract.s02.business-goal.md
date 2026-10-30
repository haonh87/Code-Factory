---
artifact_id: "sdd-scenario-task-contract.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "sdd-scenario-task-contract"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: "CR-011"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "product-specs/brd/sdd-scenario-task-contract.md"
  srs: "product-specs/srs/sdd-scenario-task-contract.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
  - "qc"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
  dod: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
    - "qc"
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
  business_acceptance: []
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  uat_reviewed_by: []
  uat_reviewed_at: ""
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
  - "sdd-scenario-task-contract.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Tóm tắt user problem, business outcome, success metric và non-goals.

## Step Contract

```yaml
step_goal: "Record the accepted s02 authoring outcome for A1-A2 receipt sealing."
input_summary:
  - "docs/audits/code-factory-sdd-kit-adoption-plan.md"
  - "product-specs/brd/sdd-scenario-task-contract.md"
  - "product-specs/srs/sdd-scenario-task-contract.md"
output_summary:
  - "Human chat acceptance recorded; trusted receipts remain required before activation."
done_when:
  - "Scope, evidence and dependent decisions are explicit."
owner: "ba"
```

## Main Artifact

```yaml
business_goal_ref: "product-specs/brd/sdd-scenario-task-contract.md#Business Context"
baseline_evidence_ref: "docs/audits/code-factory-sdd-kit-adoption-plan.md#Resumed pilot outcome and semantic review"
success_measure: "All in-scope contract negatives fail deterministically; legacy cases retain behavior; semantic reviewers can map scenarios to bounded tasks without duplicate authority."
non_goal: "No speed-improvement claim from five proposal completions."
```

## Traceability

```yaml
upstream:
  - "docs/audits/code-factory-sdd-kit-adoption-plan.md"
  - "product-specs/brd/sdd-scenario-task-contract.md"
  - "product-specs/srs/sdd-scenario-task-contract.md"
next_step: "human authoring review; implementation remains locked"
```

## Handoff

Human chat acceptance is recorded below. This note creates no trusted receipt; implementation remains locked until CLI approval checks pass.


## Human Review Record

- Decision source: repository maintainer's explicit `accept` after the A1-A2 scope,
  nine acceptance criteria and six-task packet were presented.
- Recorded at: `2026-10-30T07:15:09Z`.
- Scope: A1 scenario guidance then A2 opt-in task/trace validation, explicit file
  paths and structured checks; legacy compatibility retained; no validator execution.
- Reviewer labels `ba` and `developer` identify the applicable roles fulfilled by
  the same human maintainer in this self-review item, not separate independent reviewers.
- Trust status: chat decision recorded; CLI receipts have not been minted and
  protocol approval/activation have not been changed by this authoring edit.
