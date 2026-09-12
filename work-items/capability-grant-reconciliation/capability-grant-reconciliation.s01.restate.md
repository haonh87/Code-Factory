---
artifact_id: "capability-grant-reconciliation.s01.restate"
artifact_family: workflow-step
work_item_slug: "capability-grant-reconciliation"
step_id: "s01"
step_slug: "restate"
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
  contract: "required"
  dor: "required"
  approach: "required"
  foundation: "required"
  task_plan: "required"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "not_applicable"
  dod: "required"
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
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> `granted_write_paths` is written at activation and never read again. On 2026-09-12 the parent
> branch of CR-008 was measured against its own grant: 111 files changed, 66 covered, 45 not. Of the
> 45, thirteen have no covering grant from any work item - `package.json`, the bundle manifest,
> `.claude/CLAUDE.md`, six docs files, `product-specs/cards`. No validator, gate, or CI job objected
> at any point. The control is advisory. This FEATURE makes it real, and fixes the unit mismatch
> that would otherwise make it uncheckable.

## Step Contract
```yaml
step_goal: >-
  Clarify what it means to reconcile a declared write scope against what actually changed, and why
  that cannot be done today without first resolving that a grant describes a work item while a diff
  describes a branch.
input_summary:
  - "git diff --name-only main...codex/adaptive-governance-human-approval-ux against its granted_write_paths, 2026-09-12"
  - "capability-grant-granularity.s04, layers 1 and 2 of the reframed problem"
output_summary: ["Restated request", "Scope in/out", "Constraints, assumptions, open questions, risks"]
done_when:
  - "The two layers are stated as one problem with a dependency between them, not two"
  - "The retroactive-violation constraint is recorded"
owner: "ba"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Hard Rule: Human-Controlled Gates - granted_write_paths is set at a human-controlled transition and should mean something afterwards"
  - "Hard Rule: Do Not Self-Declare Done - a work item currently closes without anyone checking what it changed"
  - "Hard Rule: Subagent Only For Independent Tasks - independence is asserted through owned_paths and never verified"
required_reviews:
  - "Spec at s04"
  - "Contract at s04 - the meaning of granted_write_paths changes"
  - "DoR at s04"
  - "Approach at s05"
  - "Foundation Decision at s05 - a branch-to-work-item association is a new object in the protocol model"
  - "Task Plan at s06"
prohibited_actions:
  - "Do not touch packages/workflow-bundle while adaptive-governance-human-approval-ux holds its grant"
  - "Do not turn the grant into a filesystem sandbox"
open_governance_questions:
  - "OQ-01: does an unreconciled work item block DoD, or produce a finding a human dispositions?"
```

## Artifact Chính
```yaml
raw_request: "Make granted_write_paths mean something. Today it is written once and never checked."
restated_request: >-
  Reconcile what a work item declared it would write against what its branch actually changed, and
  make the result a recorded outcome rather than silence. Because one branch carries several work
  items, reconciliation must resolve against the union of the grants that branch carries, which
  requires an association between branches and work items that does not exist today.
request_type: FEATURE
user_problem_initial: >-
  A work item can close having modified files it never declared, and nothing notices. Thirteen such
  files exist on the current parent branch, including package.json and the bundle manifest. They
  were found by an ad-hoc script during an external review, not by the system. Every downstream
  control that assumes owned_paths is meaningful - delegation independence, parallel work item
  admission, conflict prediction - rests on a field nobody verifies.
business_context_initial: >-
  Two agent systems write to one repository. The only machine-readable statement of who owns what is
  granted_write_paths. If that statement is never checked, collision detection is guesswork, and the
  cost lands as rework: in this session a sealed Task Plan became unexecutable because a claim about
  path ownership was never verified against a diff.
two_layers:
  - id: L1
    name: "Reconciliation"
    statement: "Compare declared scope against actual change, and require an outcome."
    blocked_by: "L2 - there is no correct object to compare against while a branch carries several work items"
  - id: L2
    name: "Unit alignment"
    statement: "Associate a branch with the work items it carries, so reconciliation resolves against the union of their grants."
    note: "L2 exists only to make L1 correct. It is not independently valuable and should not be split out again."
scope_draft:
  in:
    - "A branch-to-work-item association, however minimal, recorded where the protocol can read it"
    - "A reconciliation report: files changed on the branch, files covered by the union of grants, files covered by neither"
    - "A required outcome for uncovered files: grant amended, exception raised, or explicitly disowned"
    - "Where reconciliation runs - close, verify, or CI - and what it does when it finds something"
  out:
    - "Grant granularity. Separate work item, and it depends on this one."
    - "Filesystem enforcement or sandboxing"
    - "Forcing one work item per branch - a working-agreement change, not tooling"
    - "Retroactive reconciliation of closed work items"
constraints_initial:
  - "C1: implementation sits inside packages/workflow-bundle, held in full by adaptive-governance-human-approval-ux. Blocked until that grant releases."
  - "C2: every branch currently open violates any enforcement that could be written. Enforcement cannot start from today's state without a grandfathering rule."
  - "C3: a branch whose work item merged and whose ref was deleted has no diff left to reconcile. Reconciliation must run before the branch disappears, which constrains where it can sit in the lifecycle."
assumptions_initial:
  - "A1: the association between branch and work items can be derived rather than declared, for example from the work-item directories the branch touches. If it must be declared, the cost rises and A1 should be revisited at s05."
  - "A2: thirteen uncovered files on one branch is representative of a systemic gap rather than one careless branch. Only one branch was measured; s03 should test a second."
open_questions_initial:
  - "OQ-02: is an uncovered file a failure or a finding? A failure at close blocks work that is otherwise done; a finding risks becoming noise nobody reads."
  - "OQ-03: what covers a genuinely shared file such as package.json, which several work items legitimately touch on one branch?"
  - "OQ-04: does reconciliation run per work item at close, or once per branch at merge?"
  - "OQ-05: how are grandfathered branches marked, and does that marking expire?"
dependencies_initial:
  - "D1: adaptive-governance-human-approval-ux releases its grant on packages/workflow-bundle"
risks_initial:
  - "R1: reconciliation that fires late - at close - reports a problem when it is most expensive to fix. Earlier is better and harder."
  - "R2: an outcome requirement that is easy to satisfy with disown becomes a rubber stamp, and the field goes back to meaning nothing."
  - "R3: deriving the branch association from touched work-item directories is circular if a work item's own directory is what identifies it. A2 and OQ under s03 should test this."
notes_for_step_2: >-
  The business goal is that owned_paths becomes trustworthy, because several other controls already
  assume it is. Concurrency is a downstream benefit shared with capability-grant-granularity, not
  this work item's own measure.
```

## Traceability
```yaml
source_inputs:
  - "capability-grant-granularity.s04.acceptance-criteria.md, layers 1 and 2"
  - "Measurement of codex/adaptive-governance-human-approval-ux against its grant, 2026-09-12"
next_step: "s02 Business Goal"
```

## Handoff
- Settled: L1 and L2 are one work item. L2 has no independent value and exists to make L1 correct.
- Still open: OQ-02 decides how much force the mechanism has; OQ-03 decides whether shared files break the model.
- Relationship to `capability-grant-granularity`: that work item depends on this one. Narrowing a declaration nothing reconciles changes no behaviour.
- Condition to start execution: D1.
