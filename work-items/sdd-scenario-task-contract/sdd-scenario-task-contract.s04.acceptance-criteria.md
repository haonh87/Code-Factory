---
artifact_id: "sdd-scenario-task-contract.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "sdd-scenario-task-contract"
step_id: "s04"
step_slug: "acceptance-criteria"
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
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-10-30T07:15:09Z"
  contract_reviewed_by: ["developer"]
  contract_reviewed_at: "2026-10-30T07:15:09Z"
  dor_reviewed_by: ["ba"]
  dor_reviewed_at: "2026-10-30T07:15:09Z"
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-scenario-task-contract.s01.restate.md"
  - "sdd-scenario-task-contract.s02.business-goal.md"
  - "sdd-scenario-task-contract.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Tóm tắt acceptance criteria, edge case, DoR và governance checks cho readiness.

## Step Contract

```yaml
step_goal: "Record the accepted s04 authoring outcome for A1-A2 receipt sealing."
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

## Requirement Baseline

```yaml
status: "APPROVED"
approved_spec_refs:
  - "product-specs/brd/sdd-scenario-task-contract.md"
  - "product-specs/srs/sdd-scenario-task-contract.md"
decision_notes:
  - "User accepted the bounded A1-A2 packet; formal signing is pending."
```

## Contract Baseline

```yaml
status: "APPROVED"
api_contract_refs:
  - "product-specs/srs/sdd-scenario-task-contract.md#Contract Proposal"
ux_contract_refs: []
notes:
  - "Opt-in task artifact consumer contract accepted in chat; trusted receipt pending."
```

## Existing System Baseline

```yaml
current_behavior_refs:
  - "docs/audits/code-factory-sdd-kit-adoption-plan.md#Validator capability and measured checks"
impacted_surfaces:
  - "Scenario authoring"
  - "Versioned task and trace reader"
compatibility_constraints:
  - "Unversioned notes retain their previous interpretation and bytes."
rollback_constraints:
  - "Do not author v1 notes on unsupported installed readers."
```

## Main Artifact

```yaml
acceptance_criteria_ref: "product-specs/srs/sdd-scenario-task-contract.md#Acceptance Criteria"
acceptance_refs:
  - "AC-001"
  - "AC-002"
  - "AC-003"
  - "AC-004"
  - "AC-005"
  - "AC-006"
  - "AC-007"
  - "AC-008"
  - "AC-009"
edge_cases:
  - "Malformed/duplicate JSON keys"
  - "Unknown version"
  - "Task cycles"
  - "Planned nonexisting test files"
  - "Symlink escape"
  - "Invented AC and duplicated mapping"
out_of_scope_ref: "product-specs/brd/sdd-scenario-task-contract.md#Business Context.scope.out"
behavioral_invariants:
  - "No validator command execution"
  - "No approval or history rewrite"
```

## Governance Checks

```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Owner references and brownfield constraints recorded."
blocking_items:
  - "Trusted authoring gate receipts pending."
owner: "qc"
next_action: "Seal accepted host artifacts in the human terminal; do not activate before receipt verification."
```

## Definition of Ready

```yaml
status: "READY"
blockers: []
owners:
  - "ba"
  - "developer"
  - "qc"
notes:
  - "Nine measurable criteria and bounded design/task plan accepted by the maintainer; receipt sealing is required before activation."
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
