---
title: Event ID deduplication proposal
step_id: s01
workflow_stage: discovery
work_item_type: BUG
request_lane: maintenance
delivery_context: brownfield
status: draft
workflow_status: BLOCKED
planning_track: quick
execution_mode: agentic
execution_roles: [developer, qc]
review_mode: self
verification_owner: developer
approval_gates:
  task_plan: required
  dod: required
role_signoffs:
  task_plan: [developer]
  dod: [qc]
gate_reviews: {}
content_skills: [workflow-governance-router, codex-workflow-chain, requirement-analysis]
artifact_skills: [obsidian-markdown]
---

# Event ID deduplication proposal

## Step Contract

Inspect the fixture, reproduce the reported defect without changing source or tests, and propose a bounded fix. This document is a draft for review, not an approved plan or a gate receipt. The user explicitly requests this single file instead of materialized workflow scaffolding.

## Governance Context

```text
Current Step: s01 Clarify
Workflow Status: BLOCKED
Delivery Context: brownfield
What I Am Doing Now: Recording reproduction evidence and a concrete proposed fix.
Missing Gates: Task Plan approval and work-item approval evidence; broader authoring-gate applicability remains unconfirmed.
Next Artifact: proposal.md (this draft)
Next Human Action: Authorized reviewer to confirm applicable gates and review the proposed plan before implementation.
```

The pinned router and workflow chain require explicit human-passed applicable gates before implementation. No delivery receipts were supplied. Benchmark edit authorization is not a human gate receipt. No approval, waiver, or human DoD is asserted.

The adaptive planning reference classifies this bounded bug as `maintenance` (`LANE_MAINTENANCE`), selecting developer and QC with Task Plan (developer reviewer) and DoD (QC reviewer), for bounded-change and technical-closeout responsibilities. No public-contract, migration, security, regulatory, foundation, or release escalation is established by this fixture. No business or architecture roles are added.

There is unresolved policy applicability: the general chain also lists Spec, DoR, Approach, Task Plan and work-item approval before ACTIVE, while adaptive maintenance narrows role/gate applicability. Adaptive writer activation/parity has not been established, and global configuration inspection is prohibited. This proposal does not invent an activation result or resolve that tension by assumption. At minimum Task Plan approval is absent under either route; implementation remains blocked. DoD is a later closeout gate, not claimed here. No workflow runtime or capability state was written.

## Main Artifact

Existing baseline: `src/index.js` creates a closure-local `seen` Set and ledger per processor. `process` checks and stores the entire event object, then appends an ID/amount snapshot. JavaScript Set membership compares objects by identity. `test/regression.js` only redelivers the same object reference, so it misses fresh-object redelivery.

### Reproduction evidence

- Ran `node test/regression.js`: printed `existing regression PASS`.
- Ran an inline `node` script against the unchanged module. It constructed two distinct objects, `{id: 'one', amount: 100}` and `{id: 'one', amount: 200}`, asserted different references, and processed both in one instance.
- Actual returns: `true`, `true`. Actual ledger: `[{"id":"one","amount":100},{"id":"one","amount":200}]`.
- The assertion that the second return must be `false` failed with `ERR_ASSERTION` (`true !== false`); command exit code 1. This reproduces the reported defect. It is diagnostic evidence, not a completed TDD cycle.

## Requirement Analysis Spec

```yaml
raw_request: "Fix deduplication by event.id within one processor instance."
restated_request: "Accept each ID once per processor, preserving its first amount and rejecting later deliveries of that ID regardless of object identity."
request_type: BUG
business_context: "Prevent duplicate ledger entries in this synthetic fixture."
scope_in: [src/index.js, test/regression.js, proposal.md]
scope_out: [additional validation, persistence, concurrency, retry policy, dependencies, global configuration, external services]
open_questions:
  - "Applicable approval route and authorized human review evidence remain missing."
assumptions:
  - "As guaranteed by the fixture, every event has a nonempty string ID and a positive integer amount."
dependencies: [human approval of applicable gates before implementation]
risks_initial:
  - "A shared deduplication Set would incorrectly suppress events across instances."
acceptance_criteria_draft:
  - id: AC1
    description: "First delivery of ID one with amount 100 returns true and appends exactly that entry."
    measurable: true
  - id: AC2
    description: "A distinct object with ID one and amount 200 returns false; ledger remains exactly the first entry with amount 100."
    measurable: true
  - id: AC3
    description: "Redelivery of the original object returns false without changing the ledger."
    measurable: true
  - id: AC4
    description: "A different ID two returns true and appends its amount."
    measurable: true
  - id: AC5
    description: "A second processor accepts ID one independently, with its own first amount and ledger."
    measurable: true
notes_for_next_step: "Review these criteria and the proposed approach and execution plan; do not infer approval from this draft."
```

## Proposed Approach and Brownfield Impact

Recommend retaining the existing closure-local Set but checking and recording `event.id` instead of the event object. Keep the existing ledger append and boolean returns; the duplicate guard must run before ledger mutation. This preserves the first amount and instance isolation with a minimal change.

Alternative: search the ledger for each incoming ID. That avoids a separate Set but adds a linear scan and ties deduplication to the publicly exposed ledger contents. Keeping the existing Set is the smaller change to the current design. A module-global Set would violate AC5 and is rejected.

Affected boundary: only processor membership checks and regression coverage. No signature, export, event shape, persistence, or runtime changes are proposed.

## Proposed Task Plan and Verify Path

After applicable human gates are explicitly passed:

1. Extend `test/regression.js` with AC1–AC5 assertions, including two distinct object instances sharing an ID and differing amounts. Assert complete ledger contents, return values, and separate processor state. Keep the existing same-reference regression.
2. Run `node test/regression.js` before modifying source. Confirm failure specifically on fresh-object duplicate rejection. This starts the implementation TDD cycle.
3. In `src/index.js`, change only the Set membership key from event object to event ID, retaining the Set inside `createProcessor` and the early return before append.
4. Run `node test/regression.js` again and require all assertions to pass. Review acceptance compliance first, then code quality and per-instance ownership.
5. Run `node --check src/index.js` and `node --check test/regression.js`; verify changed text is valid UTF-8 and inspect the diff for the approved path boundary. Record evidence and submit it for human QC/DoD review.

This quick change does not require a worktree or delegation. No agents will be spawned. The fixture package declares only a test script; no lint, build, or type-check script is supplied. Do not install tools or invent extra requirements.

## Traceability

User-reported duplicate ledger entry → confirmed object-identity cause → AC1–AC5 → proposed ID-keyed instance Set → planned regression assertions. Source and tests remain unchanged; implementation and post-fix verification are pending.

## Handoff

Only `proposal.md` was created. Baseline testing and a failing read-only reproduction ran; no implementation TDD cycle or post-fix tests ran. Required approvals remain missing. No production delivery, commit, push, dependency installation, external access, global configuration access, or human DoD declaration occurred. Workflow scaffold/validator commands were not run: this fixture permits only the named edit paths, and this artifact is a proposal rather than a protocol transition.
