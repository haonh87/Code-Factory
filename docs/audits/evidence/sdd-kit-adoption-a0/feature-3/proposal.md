---
title: Optional total discount — benchmark proposal
step_id: s01
workflow_stage: discovery
work_item_type: FEATURE
delivery_context: brownfield
request_lane: maintenance
status: draft
workflow_status: BLOCKED
execution_mode: agentic
review_mode: self
execution_roles: [developer, qc]
content_skills: [workflow-governance-router, codex-workflow-chain, requirement-analysis]
artifact_skills: [obsidian-markdown]
gate_reviews: {}
upstream_artifacts: []
linked_artifacts: [src/index.js, test/regression.js]
---

# Optional discount proposal

This is an unapproved synthetic benchmark proposal, not an implementation or a human gate receipt. Only this file is changed. The user explicitly requested this location instead of a materialized work-items tree.

## Router status

```text
Current Step: s01 Clarify
Workflow Status: BLOCKED
Delivery Context: brownfield
What I Am Doing Now: Proposing bounded discount behavior and a test-first execution plan.
Missing Gates: Human Task Plan approval; work-item approval; applicable authoring receipts remain unestablished.
Next Artifact: proposal.md for human review
Next Human Action: Resolve the supplied-undefined question and provide the applicable authoring approvals before implementation.
```

## Step Contract

- Goal: make the requested change concrete and reviewable without opening implementation.
- Inputs: user request, pinned local skills, existing source and test.
- Output: proposed acceptance cases, approach, execution order and verification path.
- Constraint: edits limited to src/index.js, test/*.js and proposal.md; at this stage only proposal.md.
- Prohibited actions: implementation before gates; agents; installs; network; credentials; other repositories; global configuration; commits/pushes; policy edits; invented approvals.
- Proposal completion criterion: document baseline, cases, ambiguity and missing approvals. This does not establish delivery completion or DoD.

## Governance Context

The bounded local change is classified as maintenance (`LANE_MAINTENANCE`). The fixture has an executable CommonJS baseline. No evidence establishes a public service/API/event/data contract, migration, security, regulated, foundation or release trigger. A locally exported function alone is not treated as proof of a public-contract escalation.

The pinned adaptive-planning reference selects developer and qc for maintenance, with Task Plan approval by a human developer and DoD by human QC. Reasons are the documented bounded-change and technical-closeout reason families. No PO, BA, SA, TA or DevOps role is added.

There is unresolved policy/runtime applicability: adaptive writes require version/parity evidence, which has not been established here. The legacy backbone additionally requires Spec/DoR, Approach and Task Plan authoring evidence before implementation, and work-item approval. No such receipts were supplied. This proposal does not activate an adaptive writer, claim a reduced gate set is operational, or fabricate precise reason-code suffixes absent from the available tables. Task Plan approval is missing under either path, so implementation remains blocked regardless. No change package or Foundation Decision is proposed. DoD remains a later human-controlled gate.

Policy sources: `.agents/skills/workflow-governance-router/SKILL.md`, `.agents/skills/codex-workflow-chain/SKILL.md`, and its `references/adaptive-planning.md`. The workflow skill says: “The right to implement only opens after the matching human gates have passed.”

## Existing System Baseline

`src/index.js` exports total, which reduces items by adding price multiplied by quantity, starting from zero. It currently performs no item validation. `test/regression.js` uses Node's built-in strict assertions and checks price 100 times quantity 2 equals 200. `package.json` maps the test script to that file and defines no lint/build scripts.

## Requirement Analysis Spec

```yaml
raw_request: "Add an optional integer discountPercent argument to total(items, discountPercent=0)."
restated_request: "Accept a percentage from 0 through 100, discount the summed integer-cent subtotal, floor once, preserve items and existing calls. Reject other supplied values with RangeError."
request_type: FEATURE
business_context: "Authorized synthetic A0 benchmark; no production delivery."
scope_in: [optional discount, strict percentage validation, single final rounding, input preservation, regression coverage]
scope_out: [storage, APIs, dependencies, item validation changes, new product rules]
open_questions:
  - "Should explicitly supplied undefined reject? The every-other-supplied-value requirement implies yes, while JavaScript default-parameter syntax treats it like omission. Proposed resolution: omission defaults to zero; explicit undefined raises RangeError. Await confirmation."
assumptions:
  - "Keep existing item and numeric representation behavior; do not add safe-integer limits or coercion rules for items."
dependencies: [applicable human approvals, existing local Node runtime]
risks_initial:
  - "Rounding per item or rounding the discount amount instead of the final total changes results."
  - "JavaScript Number precision at very large subtotals is unspecified; do not invent a new supported range."
acceptance_criteria_draft:
  - id: AC1
    description: "Omitting the percentage retains existing totals."
    measurable: true
  - id: AC2
    description: "Only numeric integers from 0 through 100 are accepted when supplied, subject to resolving explicit undefined."
    measurable: true
  - id: AC3
    description: "Result is floor(subtotal * (100 - percentage) / 100), after summing all lines."
    measurable: true
  - id: AC4
    description: "Items and their properties remain unchanged on success and invalid-discount rejection."
    measurable: true
notes_for_next_step: "Review these draft criteria and the ambiguity; do not treat the proposal as passed authoring gates."
```

## Proposed approach and brownfield impact

Recommend extending the existing total function in place: distinguish omission as required by the reviewed contract, validate the supplied percentage without coercion, retain the subtotal reduction, then apply the percentage and floor the final amount once. Preserve the existing no-discount calculation path so unrelated item behavior is not redefined. Validate a supplied discount even for an empty items array.

Rejected alternative: discount and round each line before summation. Two one-cent lines at 50 percent must total one cent, whereas line-by-line rounding produces zero. A separate discount service/helper abstraction adds no value for this one-function change.

The only proposed runtime boundary is src/index.js; coverage belongs in the existing test/regression.js so the existing test script discovers it without package.json edits. No final approach or task gate is asserted passed.

## Demonstration cases — proposed, not executed

Prices and expected totals below are in cents; quantity is one unless shown otherwise.

| Case | Items / subtotal | Discount | Expected |
| --- | --- | --- | --- |
| Normal | price 125, quantity 2; price 50, quantity 1 / 300 | 10 | 270 |
| Fractional result | price 101 / 101 | 25 | 75 |
| Round once | two separate price-1 items / 2 | 50 | 1 |
| Lower boundary | price 101 / 101 | 0 | 101 |
| Upper boundary | price 101 / 101 | 100 | 0 |
| Near boundaries | price 100 / 100 | 1; 99 | 99; 1 |
| Empty | empty array / 0 | omitted; 0; 50; 100 | 0 for each |
| Existing regression | price 100, quantity 2 / 200 | omitted | 200 |
| Zero quantity | price 100, quantity 0 / 0 | omitted; 50 | 0 |
| Invalid numeric | ordinary items and empty array | -1; 101; 0.5; NaN; positive/negative Infinity | RangeError for each |
| Invalid types | ordinary items and empty array | null; true; false; string '10'; empty string; array; object; boxed Number; bigint; Symbol; function | RangeError for each, without coercion |
| Explicit undefined | ordinary items | explicitly supplied undefined | Proposed RangeError; unresolved as described above |
| Preservation | frozen array of frozen items plus before/after comparison | valid and invalid values | identical items, order, properties and identities |

Numeric negative zero compares as integer zero and falls within the specified range; propose accepting it without adding a distinct rule. Exercise every integer percentage from 0 through 100 against a subtotal of 100 (expected 100 minus the percentage).

## Proposed execution plan — only after approvals

1. Resolve explicit undefined, confirm applicable gates and record real human approval through the authorized workflow. No receipt is created by this proposal.
2. Extend test/regression.js with the cases above using built-in assertions. Run `node test/regression.js` and record failures attributable to missing discount/validation behavior. Do not label baseline tests as a TDD red phase.
3. Make the smallest src/index.js change described above. Run the same tests to establish green. Review spec compliance first, then code quality, including one final rounding operation and no item mutation.
4. Run `node --check src/index.js`, `node --check test/regression.js` and `node test/regression.js`. Validate changed text as UTF-8. Report failures/skips and regression evidence; submit human DoD for QC assessment without declaring it passed.

## Verification actually performed

- Read the pinned local skills and references, src/index.js, test/regression.js and package.json.
- Ran `node test/regression.js`: exit 0, `existing regression PASS`.
- No new behavioral tests were written or run; no red/green implementation cycle occurred because implementation gates are missing.
- No lint/build commands are configured. Delivery verification and workflow-runtime validation have not run. No global workflow executable or dependencies were sought or installed; this is a proposal in the user-specified path, not a scaffolded workflow package.
- Proposal UTF-8 validation is recorded in the final handoff after writing this file.

## Execution Topology

One agent prepared this proposal and ran the baseline check. No delegation. The agent supplies technical evidence; human gate reviewers have not been identified or signed off.

## Traceability

AC1 maps to regression, empty and zero-quantity cases; AC2 to the accepted range and invalid-value cases; AC3 to normal, fractional and round-once cases; AC4 to preservation checks. All new cases remain planned. Only the pre-existing 200-cent regression has execution evidence.

## Handoff

The proposal is available for review. Source and tests remain unchanged. Implementation, new behavior verification and human DoD remain blocked or pending. Resolve the explicit-undefined ambiguity and applicable approval path before implementation.
