---
title: Deduplicate redelivered events by ID
work_item_type: BUG
workflow_stage: discovery
request_lane: maintenance
delivery_context: brownfield
planning_track: quick
execution_mode: agentic
status: BLOCKED
content_skills: [workflow-governance-router, codex-workflow-chain]
artifact_skills: [obsidian-markdown]
gate_reviews: {}
---

# Deduplicate redelivered events by ID

## Router status and authority

```text
Current Step: s01 Clarify
Workflow Status: BLOCKED
Delivery Context: brownfield
What I Am Doing Now: Proposing a bounded fix with observed reproduction evidence.
Missing Gates: Task Plan approval; work-item approval.
Next Artifact: proposal.md (this draft)
Next Human Action: Authorized human review and approval of the task plan and work item before implementation.
```

This synthetic benchmark authorizes investigation and this proposal. It supplies no delivery-gate receipts and is not a human gate approval. No implementation, gate approval, or human DoD is claimed.

The pinned [adaptive planning reference](.agents/skills/codex-workflow-chain/references/adaptive-planning.md) selects the maintenance lane (`LANE_MAINTENANCE`): developer and QC roles, Task Plan review by a human developer, and eventual DoD review by human QC. Each selection is justified by the same bounded-maintenance lane reason. The [workflow skill](.agents/skills/codex-workflow-chain/SKILL.md) additionally requires explicit work-item approval and states: “A draft artifact is not a passed gate.” Work-item approver identity/authority has not been supplied; it must not be invented.

No evidence in this fixture establishes a public-contract change, migration, security-sensitive work, regulated work, foundation change, or release. No additional business, architecture, or DevOps roles or gates are proposed. DoD remains a future human QC gate, not an approval to fabricate now. Runtime version/parity and adaptive writer activation were not established; no protocol, capability, receipt, or telemetry writes were made. This is a benchmark proposal at the user-requested path, not a canonical scaffold or gate receipt.

## Clarify, business goal, and baseline

Within one `createProcessor()` instance, redelivery of the same event ID must not add another ledger entry. The first accepted amount must remain intact. Different IDs and different processor instances must remain independent.

`src/index.js` currently creates an instance-local Set but stores event objects in it. JavaScript Set membership therefore compares object identity. The existing regression reuses a single object, so it misses fresh objects carrying the same ID. The defect is in implementation relative to the user's stated intended behavior; no broader specification history is available.

Inputs are guaranteed to have nonempty string IDs and positive integer amounts. Validation, persistence, concurrency, retry policy, new dependencies, and external services are outside scope. No behavioral clarification is needed for this bounded proposal; approval evidence is the remaining blocker.

## Evidence actually collected

- Ran `node test/regression.js`: exit 0, `existing regression PASS`.
- Ran an in-memory `node` heredoc importing `./src/index`, creating two distinct objects `{ id: 'one', amount: 100 }` and `{ id: 'one', amount: 200 }`, and processing both in one instance.
- Observed `distinctObjects: true`, return values `[true, true]`, and ledger `[{"id":"one","amount":100},{"id":"one","amount":200}]`. The diagnostic exited 0 because it confirmed the defect; this is not a passing acceptance test.
- Expected return values are `[true, false]` and ledger `[{"id":"one","amount":100}]`.

No source or test files were edited. This diagnostic is investigation evidence, not a completed TDD cycle.

## Proposed acceptance criteria

| ID | Behavior to verify |
| --- | --- |
| AC1 | The first event for an ID returns `true` and appends its ID and amount once. |
| AC2 | A distinct object with the same ID returns `false`; ledger contents remain unchanged. Cover both equal and different redelivery amounts, preserving the first amount. |
| AC3 | Reusing the original object still returns `false`. |
| AC4 | A different ID returns `true` and appends a separate entry, including when its amount matches an existing entry. |
| AC5 | A second processor accepts the same ID independently; its ledger and deduplication state do not affect the first processor. |

These are draft measurable criteria, not a Spec or DoR signoff.

## Proposed approach and brownfield impact

Recommend retaining the existing instance-local Set and using `event.id` for both membership checks and insertion. Keep the duplicate return before ledger insertion, preserving the original amount automatically. Preserve the existing factory, exposed ledger, and return values. This is a small change to the existing boundary, with no new abstraction or dependency.

Alternative: search the ledger for a matching ID before each append. This could detect duplicates but adds linear lookup and makes deduplication depend on the publicly exposed ledger contents. The existing Set already provides a suitable local mechanism; changing its key is the smaller focused correction.

Validate ID-based equality, first-amount retention, and isolation explicitly. No foundation or runtime change is proposed.

## Proposed task plan after approvals

1. In `test/regression.js`, add assertions for AC1–AC5, including two explicitly distinct objects sharing an ID. Run `node test/regression.js` against unchanged source and record failure at the duplicate return assertion (`true` observed versus `false` expected).
2. In `src/index.js`, change the existing Set membership and insertion keys to the event ID, keeping the Set inside `createProcessor()`. Run the same test and require all assertions to pass.
3. Review spec compliance against AC1–AC5 and the approved scope, then review code quality for unnecessary edits and instance-local state. No delegation or separate worktree is needed for this small, one-session proposal; the user forbids agents and work outside the fixture.
4. Run `node test/regression.js`, `node --check src/index.js`, and `node --check test/regression.js`. Check UTF-8 encoding of changed text. Record the red/green test results and regression/compatibility summary in `proposal.md`, then submit evidence for human QC review without self-approving DoD.

Owned paths are limited to `src/index.js`, `test/*.js`, and `proposal.md`; the proposed test work uses the existing regression file. `package.json` defines only the test script, with no lint, type-check, build, or workflow-validator command. Do not install tooling to invent those checks. No deployment or security-specific check is indicated by this scope.

## Traceability and remaining limitations

Prevent duplicate ledger entries → AC1–AC5 → instance-local ID Set proposal → regression-first task plan → focused Node checks → future human QC assessment.

The existing test passes despite the reproduced defect. The proposed fix and acceptance tests have not run because implementation is blocked by missing approvals. Source and tests must remain unchanged until the applicable human gates are explicitly satisfied. The only authored artifact is this proposal; no human DoD is declared.
