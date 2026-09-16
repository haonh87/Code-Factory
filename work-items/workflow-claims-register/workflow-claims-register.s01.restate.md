---
artifact_id: "workflow-claims-register.s01.restate"
artifact_family: workflow-step
work_item_slug: "workflow-claims-register"
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
> Every control the pack owns checks one of two things: whether an artifact is well-formed, or
> whether the right human approved exactly these bytes. Nothing checks whether the statements inside
> the artifact are true. In one review session on 2026-09-11 the validators caught 5 of 5 form
> errors and 0 of 4 false beliefs, and each of the four false beliefs propagated into a sealed
> decision. This FEATURE adds the missing axis: factual claims carry their derivation, the
> derivation runs when the claim is written, and a claim goes stale when the world it described
> moves.

## Step Contract
```yaml
step_goal: >-
  Clarify what a checkable factual claim is, fix the boundary against the two control axes that
  already exist and the two that are separate work, and record why this cannot be built on the
  current gate-evidence code.
input_summary:
  - "Error ledger from the 2026-09-11 review session: 5 form errors caught, 4 belief errors uncaught"
  - "Existing evidence_state CONFIRMED|INFERRED|OPEN in skills/architecture/architecture-modeling/references/model-contract.md"
  - "Executable acceptance criteria in work-items/upgrade-guardrails-actions-node24 s04"
output_summary: ["Restated request", "Scope in/out against four control axes", "Constraints, assumptions, open questions, risks"]
done_when:
  - "The four axes are distinguished and this work item is scoped to exactly one"
  - "The dependency on the typed-state restructure is recorded with its reason"
owner: "ba"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Hard Rule: Do Not Self-Declare Done - a claim is a self-declaration until something re-derives it"
  - "Hard Rule: Human-Controlled Gates - a receipt binds a digest, not a truth"
  - "Hard Rule: Prefer The Smallest Solution That Is Correct"
required_reviews:
  - "Spec at s04"
  - "Contract at s04 - the claim entry is a persisted data contract"
  - "DoR at s04"
  - "Approach at s05"
  - "Foundation Decision at s05 - this adds an evidence layer that gates read"
  - "Task Plan at s06"
prohibited_actions:
  - "Do not weaken any existing gate, receipt, or validator"
  - "Do not touch packages/workflow-bundle while adaptive-governance-human-approval-ux holds its grant"
open_governance_questions:
  - "OQ-01: may a gate be sealed while a claim it rests on is stale, or is that a hard refusal?"
```

## Artifact Chính
```yaml
raw_request: "Add a mechanism that verifies the factual claims a work item rests on, not just the shape of its notes."
restated_request: >-
  Give every factual statement in a workflow note a declared kind. A measured claim carries the
  command that produced it and is recorded by running that command, not by typing its result. A
  claim records what would invalidate it, so CI can re-derive it when the world moves. A gate reads
  claim freshness alongside the note digest.
request_type: FEATURE
user_problem_initial: >-
  A sealed receipt proves the note has not changed. It does not prove the note is still true. A
  decision sealed on Monday can describe a repository state that stopped existing on Tuesday, and
  every validator stays green while it happens. This is not hypothetical: a Task Plan was sealed in
  this repository on a claim about branch ownership that a single git command would have falsified,
  and the work item reached s07 before anyone noticed.
business_context_initial: >-
  Agents fail differently from people. A person who is unsure usually says so. An agent produces a
  confident, well-formed, plausible artifact that is wrong - precisely the shape that passes
  conformance checks. The more conformance is instrumented, the more the surviving errors are
  well-formed wrong ones. Schema cannot close that gap; only re-derivation against reality can.
control_axes:
  - axis: conformance
    question: "Is the artifact well-formed?"
    status: "Covered by validators, pack-audit, CI. Working well."
  - axis: authority
    question: "Did the right human approve exactly these bytes?"
    status: "Covered by receipts, passphrase, digest binding."
  - axis: truth
    question: "Are the statements inside the artifact true, and still true?"
    status: "Not covered. This work item."
  - axis: behaviour
    question: "Does a skill activate when it should, and change the outcome?"
    status: "Not covered. Separate work item, needs claude plugin eval with ablation."
scope_draft:
  in:
    - "Claim kinds: measured, cited, derived, asserted"
    - "A claim block in workflow notes, with the same treatment across steps"
    - "Recording a measured claim by executing its command and capturing the output, so a measured claim cannot be typed without being taken"
    - "invalidated_by: the refs or paths whose movement makes a claim stale"
    - "CI re-derivation of claims whose invalidated_by moved"
    - "Gate reads claim freshness in addition to note digest"
  out:
    - "Adversarial refuters for judgement claims that have no command - separate work item"
    - "Behavioural evaluation of skills - separate work item"
    - "Any change to gate semantics, receipt format, signing, or reviewer identity"
    - "Retrofitting claims onto the 207 existing notes"
constraints_initial:
  - "C1: every implementation path sits inside packages/workflow-bundle/scripts and test, both held in full by adaptive-governance-human-approval-ux. Nothing can be built until that grant releases."
  - "C2: gate binding requires workflow-gate-evidence-utils.js and workflow-trusted-approval-utils.js, which are mid-restructure in the closeout defect work."
  - "C3: a command recorded as evidence runs on a developer machine and in CI. It must be deterministic across both, or the staleness check produces false positives that train people to ignore it."
assumptions_initial:
  - "A1: most factual claims in a workflow note are executable. Evidence: of the four false beliefs in the review session, all four were falsifiable by one shell command."
  - "A2: the typed state entry shape emerging from the closeout work - id, kind, text, selectors, no inference over text - is the same idea as a typed claim and should share one model rather than sit beside a second one."
open_questions_initial:
  - "OQ-02: is an asserted claim allowed to gate a decision, or must a blocking claim be measured or cited?"
  - "OQ-03: what is the unit of staleness - the individual claim, the note, or the work item?"
  - "OQ-04: does a stale claim block a sealed gate retroactively, or only block the next transition?"
  - "OQ-05: where do claims live - a block inside each step note, or one register per work item that notes reference?"
  - "OQ-06: how is a non-deterministic command handled, for example one whose output includes a timestamp or a run id?"
dependencies_initial:
  - "D1: adaptive-governance-human-approval-ux releases its grant on packages/workflow-bundle"
  - "D2: the typed state entry contract from closeout-bundle-repeat-cycle-reconciliation lands, so claims are built on that model rather than beside it"
risks_initial:
  - "R1: building on workflow-gate-evidence-utils.js in its current shape is building on code that is being replaced. D2 exists to prevent this."
  - "R2: a claim whose command is slow or network-dependent makes CI unreliable, and an unreliable staleness check is worse than none because it teaches people to override it."
  - "R3: authors route around the cost by declaring everything asserted. The rule must make measured the cheaper path, not the more virtuous one."
  - "R4: two typed-entry models - state entries and claims - drift apart if built separately. A2 and D2 exist to prevent this."
notes_for_step_2: >-
  Business goal is fewer decisions built on false premises, measured by rework. Non-goal: more
  process. If this adds a step an author must remember, it has failed; the command must run as a
  side effect of writing the claim.
```

## Traceability
```yaml
source_inputs:
  - "Independent review session 2026-09-11, error ledger and four-axis analysis"
  - "work-items/ci-guardrails-parallelisation s07 GOV-EX-002 - the sealed-then-falsified Task Plan"
  - "work-items/closeout-bundle-repeat-cycle-reconciliation s04 state_entry_contract"
next_step: "s02 Business Goal"
```

## Handoff
- Settled: this work item owns exactly one control axis. Refuters and behavioural evaluation are named and excluded.
- Still open: OQ-02 and OQ-04 decide how much force the mechanism has. OQ-05 decides where claims live.
- Condition to start execution: D1 and D2. D2 is a design dependency, not a scheduling one - claims and typed state entries are the same idea applied twice, and building them separately produces two models that drift.
