---
artifact_id: "capability-grant-granularity.s01.restate"
artifact_family: workflow-step
work_item_slug: "capability-grant-granularity"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: CHANGE
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
  foundation: "not_applicable"
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
> A work item can be granted a whole directory as its write scope. `adaptive-governance-human-approval-ux`
> holds `packages/workflow-bundle/scripts` and `packages/workflow-bundle/test` in full, plus
> `skills/orchestration` and `policies/codex/AGENTS.global.md`. It actually modifies 12 of the 37
> scripts. The other 25, and every new file either directory could hold, are locked for the life of
> that work item. One work item therefore locks the package, and no second work item can proceed in
> parallel regardless of how disjoint its real footprint is. This CHANGE makes the declared scope
> match the real footprint.

## Step Contract
```yaml
step_goal: >-
  Clarify why directory-level write grants serialise all work in a package, fix the boundary against
  gate semantics which are not in scope, and record the migration constraint that existing
  directory grants create.
input_summary:
  - "granted_write_paths of adaptive-governance-human-approval-ux, read 2026-09-12"
  - "git diff --name-only main..codex/adaptive-governance-human-approval-ux -- packages/workflow-bundle/scripts"
  - "granted_write_paths of ci-guardrails-parallelisation, two named files"
output_summary: ["Restated request", "Scope in/out", "Constraints, assumptions, open questions, risks"]
done_when:
  - "The difference between declared scope and real footprint is quantified"
  - "The chicken-and-egg constraint is recorded"
owner: "ba"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Hard Rule: Human-Controlled Gates - granted_write_paths is set at activation, a human-controlled transition"
  - "Hard Rule: Subagent Only For Independent Tasks - independence is asserted through owned_paths, which this makes checkable"
  - "Hard Rule: Brownfield Baseline And Delta Discipline"
required_reviews: ["Spec at s04", "Contract at s04", "DoR at s04", "Approach at s05", "Task Plan at s06"]
prohibited_actions:
  - "Do not change which gates exist or what they mean"
  - "Do not touch packages/workflow-bundle while adaptive-governance-human-approval-ux holds its grant"
open_governance_questions:
  - "OQ-01: is a directory grant ever legitimate, or always a smell?"
  - "OQ-02: who approves a directory grant when one is genuinely needed?"
```

## Artifact Chính
```yaml
raw_request: "Force granted_write_paths to be file-level so one work item cannot lock a whole package."
restated_request: >-
  Make a work item's declared write scope match its real footprint. Grants enumerate files by
  default. A directory grant remains possible but becomes an explicit, reasoned, separately
  approved exception rather than the path of least resistance.
request_type: CHANGE
user_problem_initial: >-
  Two work items with genuinely disjoint footprints cannot run in parallel, because the first one
  declared a directory and the second one has nowhere to stand. The serialisation is created by the
  declaration, not by the work.
business_context_initial: >-
  Code-Factory is one operator running two agent systems against one repository. Parallelism is the
  only lever on throughput available without adding people. Directory grants remove that lever, and
  they remove it silently - nothing reports that a work item is blocked by a grant it does not need.
scope_draft:
  in:
    - "Validation of granted_write_paths shape at activation"
    - "A declared-versus-actual footprint report, so drift is visible rather than inferred"
    - "An escape hatch for a legitimately broad grant, requiring a stated reason"
    - "Migration handling for work items that already hold directory grants"
  out:
    - "Which gates exist, what they mean, or who signs them"
    - "Receipt, digest, or passphrase mechanics"
    - "Any change to how a work item is activated, beyond the shape of the paths argument"
    - "Enforcement of grants at the filesystem level - this is a declaration contract, not a sandbox"
constraints_initial:
  - "C1: the implementing file, packages/workflow-bundle/scripts/workflow-capability-control.js, sits inside the very grant this work item exists to narrow. It cannot be changed until adaptive-governance-human-approval-ux releases its scope. This is not a scheduling inconvenience; it is the problem demonstrating itself."
  - "C2: at least one live work item holds a directory grant. Enforcement cannot be retroactive without invalidating it."
  - "C3: a grant is written at activation, before implementation, when the real footprint is a forecast rather than a fact. The rule must tolerate a wrong forecast without punishing it."
assumptions_initial:
  - "A1: most directory grants are convenience, not necessity. Evidence: the one measured case declares two directories and touches 12 of 37 files in one of them."
  - "A2: a work item author can name the files it expects to touch at s06, because the Task Plan already requires owned_paths per task."
open_questions_initial:
  - "OQ-03: what happens when implementation needs a file the grant does not list? Refuse, or allow with a recorded amendment? Refusing punishes an honest forecast; allowing silently makes the grant decorative."
  - "OQ-04: warn-then-enforce over some period, or enforce for new work items only and leave existing ones alone?"
  - "OQ-05: does the rule apply to test directories, where a new fixture file is routine and unpredictable?"
  - "OQ-06: should the declared-versus-actual report be a validator failure, or a report a human reads?"
dependencies_initial:
  - "D1: adaptive-governance-human-approval-ux releases its grant, which requires CR-008 to close"
risks_initial:
  - "R1: strict enforcement makes activation a guessing game and pushes authors toward broader grants with a pro-forma reason, producing worse declarations than today"
  - "R2: the amendment path, if too easy, turns the grant into documentation; if too hard, it blocks legitimate discovery mid-implementation"
  - "R3: test directories may need a standing exception, which weakens the rule where new files are most common"
notes_for_step_2: >-
  Business goal is parallelism, not compliance. The measure is whether two work items with disjoint
  footprints can run at the same time - not whether grants look tidy.
```

## Traceability
```yaml
source_inputs:
  - "Independent review session 2026-09-11 to 2026-09-12"
  - "granted_write_paths of adaptive-governance-human-approval-ux and ci-guardrails-parallelisation"
next_step: "s02 Business Goal"
```

## Handoff
- Settled: this is about the shape of a declaration, not about gate semantics or enforcement mechanics.
- Still open: OQ-03 is the design crux. Everything else follows from how a wrong forecast is handled.
- Condition to start execution: D1. The file to change is inside the grant this work item narrows.
