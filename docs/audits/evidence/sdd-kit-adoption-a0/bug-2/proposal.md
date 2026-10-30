---
title: Event ID deduplication proposal
work_item_type: BUG
workflow_stage: discovery
step_id: s01
status: draft
workflow_status: BLOCKED
delivery_context: brownfield
request_lane: maintenance
planning_track: quick
execution_mode: agentic
execution_roles: [developer, qc]
review_mode: self
gate_reviews: {}
content_skills: [workflow-governance-router, codex-workflow-chain]
artifact_skills: [obsidian-markdown]
---

# Event ID deduplication proposal

## Step Contract

Analyze the existing fixture, reproduce the defect without changing implementation or tests, and propose a bounded fix and verification plan. This is a benchmark proposal at the user-required path, not a delivery receipt or a finalized workflow step. Only `proposal.md` is changed.

## Governance Context

```text
Current Step: s01 Clarify
Workflow Status: BLOCKED
Delivery Context: brownfield
What I Am Doing Now: Recording reproduction evidence and a proposed maintenance fix.
Missing Gates: Human Task Plan approval and work item approval; broader authoring-gate applicability remains unresolved.
Next Artifact: proposal.md for review
Next Human Action: An authorized human must resolve gate applicability and approve the applicable authoring gates before implementation.
```

The user explicitly supplied no delivery-gate receipts. Benchmark authorization is not a receipt. No approvals, signoffs, or human DoD verdict are asserted here.

The pinned router requires proof of `s07`, `ACTIVE`, and no missing gates before implementation. Its adaptive-planning reference classifies bounded maintenance as `LANE_MAINTENANCE`, with developer and QC roles and Task Plan / DoD gates. Task Plan has developer reviewer authority; DoD has QC reviewer authority. No trigger in this request warrants adding product, architecture, or release roles.

The broader policy also lists work item approval and Spec, DoR, Approach, and Task Plan authoring gates. Adaptive writer activation depends on runtime parity and version evidence, which was not established here. Accordingly, the broader authoring-gate list is not asserted as definitively applicable, nor treated as passed. Missing Task Plan approval alone blocks implementation under either interpretation. DoD is a later human closeout gate, not an approval this proposal can supply. No runtime, protocol, telemetry, or capability-control records are written.

Policy sources: [router](.agents/skills/workflow-governance-router/SKILL.md), [workflow chain](.agents/skills/codex-workflow-chain/SKILL.md), and [adaptive planning](.agents/skills/codex-workflow-chain/references/adaptive-planning.md).

## Main Artifact

### Existing system baseline and cause

`src/index.js` creates a separate `Set` and ledger inside each `createProcessor()` invocation. The `process` method checks and stores the event object itself. JavaScript Set membership for objects compares identity, so fresh objects with equal IDs are accepted independently.

`test/regression.js` tests repeated submission of the same object only. It misses redelivery as a fresh object. The fixture uses CommonJS and built-in Node assertions; `package.json` maps `test` to `node test/regression.js`.

### Reproduction evidence

Actual commands executed against unchanged source:

- `node test/regression.js`: passed, printing `existing regression PASS`.
- An inline `node` script created distinct objects `{ id: 'one', amount: 100 }` and `{ id: 'one', amount: 200 }`, asserted their distinct identities, and processed both with one processor. It logged results `[true,true]` and ledger `[{"id":"one","amount":100},{"id":"one","amount":200}]`. The assertion that the second result must be `false` failed with `ERR_ASSERTION`, actual `true`, expected `false`, exit status 1. Runtime: Node v26.5.0.

This is diagnostic reproduction, not a completed TDD cycle or verification of a fix.

### Proposed acceptance criteria

1. A first event with ID `one` and amount `100` returns `true` and appends exactly that ledger entry.
2. A distinct object with ID `one` and amount `200` returns `false`; the ledger remains exactly one entry with amount `100`.
3. A distinct object with ID `one` and the same amount also returns `false` without appending.
4. Reprocessing the original object continues to return `false`.
5. A different ID, such as `two` with amount `50`, returns `true` and adds its own entry.
6. A second processor accepts ID `one` independently; processing in either instance does not modify the other instance's ledger.

Inputs are guaranteed to have nonempty string IDs and positive integer amounts. Validation, persistence, concurrency, retries, and new public contracts are outside this proposal.

### Proposed technical approach and option comparison

Recommend retaining the existing per-instance Set and using `event.id` for both its membership check and insertion. Keep ledger insertion and boolean return behavior intact. This changes the identity key at the existing boundary and preserves instance isolation and the first recorded amount.

Alternative: scan the ledger for an existing matching ID on every call. That could meet the stated cases, but introduces linear lookup and changes the existing deduplication mechanism unnecessarily. A shared/global Set is unsuitable because it violates instance isolation.

Brownfield impact is limited to the deduplication key in `src/index.js` and regression coverage in `test/regression.js`. No dependency, package script, exported API shape, runtime, or storage change is proposed. The key validation is redelivery with a different object and amount, followed by exact ledger comparison.

### Proposed execution plan after applicable approvals

1. Extend `test/regression.js` with the six acceptance cases, using distinct object literals and exact ledger assertions. Keep the original same-object case. Run `node test/regression.js` against unchanged production code and confirm failure specifically on duplicate-ID rejection.
2. Change only the Set membership and insertion key in `src/index.js` to the event ID. Rerun `node test/regression.js` and require all cases to pass.
3. Review acceptance and scope compliance first, then code quality: verify both Set operations use IDs, the Set remains inside the factory, and duplicates return before ledger insertion.
4. Run `node --check src/index.js`, `node --check test/regression.js`, and the regression command. Check UTF-8 encoding of changed text and inspect the final diff for allowed paths only. Keep this a single-agent, small local change.
5. Present evidence for human QC review; do not declare human DoD, commit, push, or finalize a delivery.

## Traceability

The reported fresh-object redelivery defect maps to criteria 1–4 and the proposed Set key change. Different IDs map to criterion 5; processor isolation maps to criterion 6. Each criterion is to be verified in the existing regression script after implementation is permitted.

## Handoff

The defect is reproduced and the proposed fix is concrete. Implementation, saved regression changes, and a green TDD run are blocked by missing gates. The current bug remains in source.

No lint or build scripts are defined in this fixture. No dependency installation, external service access, or global configuration inspection is needed. Workflow scaffolding and validation were not run: this user-scoped proposal does not materialize the delivery runtime or establish its activation state. The only outstanding scope question is gate applicability; no additional behavior requirements are needed.
