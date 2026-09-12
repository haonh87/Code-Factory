---
artifact_id: "capability-grant-reconciliation.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "capability-grant-reconciliation"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: FEATURE
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
  - "ba"
  - "developer"
  - "qc"
review_mode: independent
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
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
  - "capability-grant-reconciliation.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> This is not a new control. It is a debt. Four rules already in force treat `owned_paths` as
> trustworthy, and none of them can be relied on, because nothing has ever checked that a work item
> wrote what it said it would. The goal is to make a field honest that the rest of the system has
> already borrowed against.

## Step Contract
```yaml
step_goal: "State the value in terms of the controls that already depend on this field, and fix a counter-metric so the outcome requirement cannot decay into a rubber stamp."
input_summary: ["capability-grant-reconciliation.s01.restate.md"]
output_summary: ["User problem", "Business goal", "Success metrics", "Non-goals"]
done_when:
  - "The dependent controls are named, so the value is not argued in the abstract"
  - "A counter-metric exists that detects the mechanism becoming ceremonial"
owner: "ba"
```

## Artifact Chính
```yaml
user_problem: >-
  A work item closes, and nobody knows whether it wrote what it declared. On 2026-09-12 the parent
  branch of CR-008 was found to have modified thirteen files that no grant covers - package.json,
  the bundle manifest, .claude/CLAUDE.md, six docs files, product-specs/cards. Every gate passed.
  Every validator was green. The gap was found by an outside reviewer running a script by hand, and
  would otherwise not have been found at all.

business_goal: >-
  Make granted_write_paths correspond to what actually changed, so the four controls that already
  assume it does can be relied on. This work item does not introduce a new rule; it pays for rules
  already written.

controls_already_depending_on_this_field:
  - control: "Hard Rule: Subagent Only For Independent Tasks"
    assumption: "Independence is established by disjoint owned_scope or owned_paths."
    reality: "Disjointness is asserted at planning time and never checked against what was written."
  - control: "Parallel work item admission"
    assumption: "Two work items may run together when their granted paths do not intersect."
    reality: "The intersection is computed from declarations that may not describe the work. In this session that computation was performed by hand, twice, and was wrong the first time."
  - control: "Merge path and handoff planning in s06"
    assumption: "owned_paths tells the coordinator where conflict will occur."
    reality: "It tells the coordinator where conflict was forecast, which is not the same thing."
  - control: "Capability scoping at activation"
    assumption: "Granting a scope constrains the implementer."
    reality: "It informs the implementer. Nothing prevents or reports a write outside it."

success_metrics:
  - id: M-01
    metric: "Files changed by a work item that no grant covers and that have no recorded outcome"
    baseline: "13 on the one branch measured, all with no outcome. Population unknown - only one branch has ever been checked."
    target: "Zero without a recorded outcome. Uncovered files are permitted; unexamined ones are not."
    why: "This is the point. The goal is not that grants are always right, but that being wrong is visible."
  - id: M-02
    metric: "Time from an uncovered file appearing to that fact being visible to a human"
    baseline: "Unbounded. The measured case had gone unnoticed across 62 commits and nine days, through four sealed gates."
    target: "Bounded by the reconciliation point, wherever s05 places it."
    why: "A control that reports late reports when the fix is most expensive."
  - id: M-03
    metric: "Branches carrying work items that have a resolvable work-item association"
    baseline: "0. No mechanism exists. The association was reconstructed by hand for this analysis."
    target: "Every branch that carries at least one work item."
    why: "Without this, M-01 has no correct object to compute against."
  - id: M-04
    metric: "Share of uncovered files resolved as disowned rather than amended or excepted"
    baseline: "Not applicable - no outcome is recorded today"
    target: "Low, and watched. A high share means the outcome requirement has become a rubber stamp and the field has gone back to meaning nothing."
    why: "Counter-metric. This is how the work item detects that it has produced ceremony instead of a control. Carried from s01 R2."

non_goals:
  - "Filesystem enforcement. The grant stays a declaration reconciled after the fact, not a sandbox. Making it a sandbox is a different risk profile and a different work item."
  - "One work item per branch. That is a working-agreement change. This work item makes the current practice observable, not illegal."
  - "Retroactive reconciliation of closed work items. The debt is stopped, not repaid."
  - "Audit tidiness. If every work item reconciles cleanly and nothing about delivery changes, the mechanism has cost time and bought a report."
  - "Grant granularity. Separate work item. Direction reversed at s04 on 2026-09-12: it runs first and this work item depends on it."

constraints:
  - "Implementation sits inside packages/workflow-bundle, held in full by adaptive-governance-human-approval-ux. Carried from s01 C1."
  - "Every open branch violates any enforcement that could be written, so enforcement cannot start from today's state without grandfathering. Carried from s01 C2."
  - "A merged branch whose ref was deleted has no diff left to reconcile, which constrains where in the lifecycle this can run. Carried from s01 C3."

assumptions:
  - "One branch was measured. Thirteen uncovered files on one branch is a data point, not a rate. s03 must check at least one more before s04 sets the M-01 target as an expectation rather than an aspiration."
  - "The value is in the four dependent controls, not in reconciliation itself. If those controls turn out not to matter in practice - if nobody ever runs two work items in parallel and no subagent is ever delegated - this work item buys a report and should be closed rather than built."
```

## Traceability
```yaml
upstream: ["capability-grant-reconciliation.s01.restate.md"]
next_step: "s03 Open Questions"
```

## Handoff
- Value stated as debt: four controls already treat this field as true. Naming them is what keeps the goal concrete.
- Counter-metric M-04 recorded: if uncovered files are mostly disowned, the mechanism is ceremonial and must be redesigned rather than tightened.
- Honest limit: one branch measured. s03 must widen the sample before s04 turns M-01 into an expectation.
- Condition to enter s03: none.
