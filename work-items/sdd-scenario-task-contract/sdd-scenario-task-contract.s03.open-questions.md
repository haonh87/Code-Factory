---
artifact_id: "sdd-scenario-task-contract.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "sdd-scenario-task-contract"
step_id: "s03"
step_slug: "open-questions"
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-scenario-task-contract.s01.restate.md"
  - "sdd-scenario-task-contract.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Tóm tắt câu hỏi mở, missing input, conflict và readiness verdict.

## Step Contract

```yaml
step_goal: "Record the accepted s03 authoring outcome for A1-A2 receipt sealing."
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
open_questions:
  - id: "ODC-001"
    question: "Accept the v1 JSON payload boundary rather than a new general YAML parser?"
    recommendation: "Accept the explicit opt-in JSON subset; preserve legacy YAML."
    owner: "developer"
    decision: "ACCEPTED in user chat: opt-in JSON payload; preserve legacy YAML."
    blocking: "Trusted Contract/Approach receipts remain required."
  - id: "ODC-002"
    question: "Accept explicit file paths and per-task argv/test_refs with no automatic execution?"
    recommendation: "Accept; wider scopes require a separately reviewed contract evolution."
    owner: "developer"
    decision: "ACCEPTED in user chat: explicit file paths and structured checks; no validator execution."
    blocking: "Trusted Contract receipt remains required."
  - id: "ODC-003"
    question: "Select the exact integration base when opening the implementation worktree."
    decision: "Main 4f4cf4d3234e0b71c220531c36f2b283bce80bdb; affected A1-A2 skill/template/validator sources are unchanged from the A0 baseline. Recheck before implementation worktree creation."
    owner: "developer"
    blocking: "Before s07."
missing_inputs:
  - "Trusted authoring receipts; chat reviewer is the repository maintainer acting in the existing self-review role lanes."
conflicts:
  - "A0 fixture explicit-undefined ambiguity belongs to later evaluation, not this product contract."
```

## Input Readiness

```yaml
status: "PARTIAL"
blockers:
  - "Human acceptance recorded; CLI signatures remain pending."
owners:
  - "developer"
  - "ba"
  - "qc"
```

## Audit

```yaml
status: "PARTIAL"
evidence:
  - "docs/audits/code-factory-sdd-kit-adoption-plan.md"
next_action: "Review the concrete spec, contract and task plan."
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
