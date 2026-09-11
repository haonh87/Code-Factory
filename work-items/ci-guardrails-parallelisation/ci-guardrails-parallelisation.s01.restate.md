---
artifact_id: "ci-guardrails-parallelisation.s01.restate"
artifact_family: workflow-step
work_item_slug: "ci-guardrails-parallelisation"
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
sdd_mode: light
spec_refs:
  card: "product-specs/cards/ci-guardrails-parallelisation.md"
spec_status: draft
planning_track: quick
execution_mode: agentic
execution_roles:
  - "devops"
  - "developer"
review_mode: self
verification_owner: "devops"
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
> `workflow-guardrails.yml` chains eight jobs with `needs:`. Six are independent validators that
> read the same tree and hand nothing to each other, so the chain only serialises them and stops at
> the first failure - one run never reports more than one broken validator. The same file pins
> `actions/checkout@v4` and `actions/setup-node@v4`, both on Node 20, which GitHub removes from
> runners on **2026-09-23**. This is a dated break, twelve days out at the time of writing.

> [!note] SDD Light
> `s01` hosts Clarify, Business Goal and Open Questions. `s04` hosts Acceptance, DoR and the Spec
> Card. `s06` hosts Option Analysis, Brownfield Impact, Technical Approach and Task Plan; there is
> no separate `s02`, `s03` or `s05`. `Foundation Decision` is not applicable.

## Step Contract
```yaml
step_goal: >-
  Clarify why the guardrails workflow serialises independent work, fix the scope against the
  validators themselves, and record the dated runtime break that makes this urgent.
input_summary:
  - ".github/workflows/workflow-guardrails.yml as of commit 2e3aade"
  - "Independent review finding R-05, 2026-09-11"
  - "Finding CF-018 in the holistic remediation plan"
  - "GitHub changelog: Node 20 removed from runners 2026-09-23"
output_summary:
  - "Restated request with an explicit scope boundary against validator behaviour"
  - "Business goal and non-goals"
  - "Open questions"
done_when:
  - "The boundary between pipeline shape and validator behaviour is unambiguous"
  - "The runtime deadline is recorded with its source"
owner: "devops"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Hard Rule: Prefer The Smallest Solution That Is Correct"
  - "Hard Rule: Brownfield Baseline And Delta Discipline"
  - "Hard Rule: SDD Light Profile"
required_reviews:
  - "Spec + DoR at s04"
  - "Approach + Task Plan at s06"
prohibited_actions:
  - "Do not change what any validator asserts"
  - "Do not touch packages/workflow-bundle/** - owned by the open Codex branch"
  - "Do not change package.json scripts"
open_governance_questions: []
```

## Artifact Chính
```yaml
raw_request: "Parallelise the guardrails CI and upgrade the deprecated actions."
restated_request: >-
  Replace the eight-job linear chain with a parallel group of independent validators followed by
  the release-candidate job, and move actions/checkout and actions/setup-node to majors whose
  runtime is supported. Validator commands and arguments stay byte-identical.
request_type: CHANGE
user_problem_initial: >-
  A failing pipeline reports one broken validator per run, so fixing three problems takes three
  round trips. Every job also pays a fresh checkout and Node setup it did not need.
business_context_initial: >-
  Code-Factory is heading toward being a product, and CI is the only mechanical evidence that a
  release candidate is sound. A pipeline that hides failures behind each other makes that evidence
  slow to read. Separately, the pipeline stops working on 2026-09-23 if the actions are not moved.
scope_draft:
  in:
    - "Job graph in .github/workflows/workflow-guardrails.yml"
    - "actions/checkout and actions/setup-node major versions"
    - "Deduplicating the repeated checkout and setup-node block"
  out:
    - "What any validator asserts"
    - "The release-candidate matrix, its four steps, and its fetch-depth: 0"
    - "npm or node_modules caching"
    - "package.json scripts"
    - "Any file under packages/workflow-bundle/"
constraints_initial:
  - "C1: branch codex/adaptive-governance-human-approval-ux is open and owns packages/workflow-bundle/**; this work item must not touch that tree"
  - "C2: Node 20 leaves GitHub runners on 2026-09-23"
  - "C3: renaming jobs breaks any branch protection rule that names a required check"
assumptions_initial:
  - "A1: the six validators are independent - none uploads or consumes an artifact, and each passed standalone on 2026-09-11"
  - "A2: latest majors are checkout v7.0.1 and setup-node v7.0.0, read from the GitHub API on 2026-09-11"
open_questions_initial:
  - "OQ-01: does a branch protection rule currently require any of the eight job names?"
  - "OQ-02: does workflow-authoring-smoke join the parallel group, or stay gated behind the validators?"
dependencies_initial:
  - "D1: none. This work item touches one file that no open branch owns."
risks_initial:
  - "R1: parallelisation silently drops a validator; mitigated by AC-006, a before-and-after command comparison"
  - "R2: renamed checks read as missing to branch protection; mitigated by resolving OQ-01 before merge"
  - "R3: a newer action major changes default behaviour, for example checkout's submodule or credential defaults; mitigated by reading each major's release notes during implementation rather than bumping blind"
notes_for_step_2: >-
  Not applicable under Light. Business goal is stated above: one run reports every failure, and the
  pipeline survives 2026-09-23. Non-goal: making any validator stricter or faster in itself.
```

## Work Item Protocol
```yaml
protocol_status: BLOCKED
approval_status: APPROVED
review_required: true
work_item_slug: "ci-guardrails-parallelisation"
work_item_type: CHANGE
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/ci-guardrails-parallelisation"
current_step: "s07"
granted_write_paths:
  - ".github/workflows/workflow-guardrails.yml"
  - "work-items/ci-guardrails-parallelisation"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "coordinator"
protocol_owner: "po"
reviewed_by: "po"
reviewed_at: "2026-09-11T05:05:20.242Z"
handoff_target: "blocker-owner"
last_transition_action: "block"
last_transition_at: "2026-09-11T11:42:18.861Z"
required_actions:
  - "Resolve blockers before resuming the work item."
blockers:
  - "GOV-EX-002: T3 collides with codex/adaptive-governance-human-approval-ux ownership of .github/workflows/workflow-guardrails.yml (+60/-2). REQ-002 transferred to that branch as work item upgrade-guardrails-actions-node24."
review_notes:
  - "Human review approved."
refs:
  - "work-items/ci-guardrails-parallelisation"
audit_events:
  - "REPORT_BOOTSTRAPPED"
  - "WORK_ITEM_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "WORK_ITEM_BLOCKED"
```

## Traceability
```yaml
source_inputs:
  - "Independent review R-05, 2026-09-11"
  - "docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md#CF-018"
  - "GitHub API tags for actions/checkout and actions/setup-node, read 2026-09-11"
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Settled: the change is to pipeline shape and action versions only. No validator behaviour moves.
- Still open: OQ-01 and OQ-02. OQ-01 must be answered before merge, not before authoring.
- Condition to enter s04: none.
