---
artifact_id: "correct-workflow-authority-guidance.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "correct-workflow-authority-guidance"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
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
planning_track: full
execution_mode: agentic
execution_roles:
  - developer
  - qc
  - ba
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: [ba]
  contract: []
  dor: [qc]
  approach: [developer]
  foundation: []
  task_plan: [developer]
  uat: []
  release: []
  business_acceptance: []
  dod: [qc]
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
  - "correct-workflow-authority-guidance.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Review proposal only. Protocol remains MATERIALIZED at s01; work-item and authoring gate approvals are pending. No implementation grant is open.

## Step Contract

```yaml
step_goal: "State the value and measurable limits of this maintenance repair."
input_summary:
  - "correct-workflow-authority-guidance.s01.restate.md"
output_summary:
  - "Bounded user outcome, measures and non-goals."
done_when:
  - "The repair cannot be mistaken for whole-M7 remediation or a new release."
owner: "developer; BA contributes the named M7 meaning check."
```

## Main Artifact

```yaml
user_problem: "Agents/readers encounter contradictory instructions about editing, prerequisites, activation and who can conclude DoD."
business_goal: "Make the four repaired guidance boundaries accurately direct the next action and identify human approval authority in both languages."
success_metrics:
  - "AC-AUTH-001..004: all four authority boundaries correct in both languages."
  - "AC-AUTH-005: zero critical flags, mean >=4/5 and every dimension >=3/5 for the declared eight-file repaired scopes."
  - "AC-AUTH-006: old defects RED; corrected prose GREEN; targeted negative mutations rejected."
non_goals:
  - "All other M7 units, missing VI files and CLI bump wording."
  - "Runtime gate implementation, approval model, schemas, public contracts, policy source and lifecycle semantics."
  - "Master protected finding register and frozen s04/s05/s06; parent review/DoD decisions."
  - "P-HOOKS, P-MCP, P-INSTALL and CURRENT release/publication corrections."
  - "Global installs, registry publication, tagging, merging and branch/worktree cleanup."
constraints:
  - "Preserve existing schema identifiers, runtime gate behavior and trusted receipt requirements."
  - "Language ratings require BA review and QC verification; tests cannot supply those decisions."
assumptions:
  - "No user latency or interaction-count improvement is claimed or measured."
  - "This contributes to parent AC-CF-006/007 without closing CF-010/012 or the master work item automatically."
```

## Traceability

```yaml
upstream:
  - "correct-workflow-authority-guidance.s01.restate.md"
next_step: "correct-workflow-authority-guidance.s03.open-questions.md"
```

## Handoff

Proceed with proposed acceptance and technical preparation. Human scope and gate decisions are still pending; this value statement creates no additional product role or gate.
