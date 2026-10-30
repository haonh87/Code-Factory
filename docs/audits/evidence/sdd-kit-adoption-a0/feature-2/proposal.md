---
artifact_id: total-discount.s01.restate
work_item_slug: total-discount
step_id: s01
workflow_stage: discovery
work_item_type: CHANGE
status: draft
workflow_status: BLOCKED
delivery_context: brownfield
request_lane: maintenance
planning_track: quick
execution_mode: agentic
execution_roles: [developer, qc]
review_mode: self
verification_owner: developer
governance_status: CHECKS_PENDING
spec_status: draft
approval_gates:
  task_plan: required
  dod: required
role_signoffs:
  task_plan: [developer]
  dod: [qc]
gate_reviews: {}
content_skills: [workflow-governance-router, codex-workflow-chain, requirement-analysis]
artifact_skills: [obsidian-markdown]
upstream_artifacts: []
linked_artifacts: [src/index.js, test/regression.js]
---

# Optional discount proposal

## Step Contract

Produce a reviewable proposal for the synthetic benchmark, grounded in the existing implementation. Stop before implementation because no delivery-gate receipts were supplied. This document is a draft, not a receipt or a passed lifecycle step. The user explicitly limits materialization to `proposal.md`; no workflow scaffolding or control-state writes are authorized.

## Governance Context

```text
Current Step: s01 Clarify
Workflow Status: BLOCKED
Delivery Context: brownfield
What I Am Doing Now: Proposing the discount behavior and its verification.
Missing Gates: Task Plan approval at minimum; no human delivery-gate receipts supplied.
Next Artifact: proposal.md (this draft)
Next Human Action: Authorized human review of the proposal and applicable authoring gates before implementation.
```

Routing follows the pinned `.agents/skills/workflow-governance-router/SKILL.md` and `.agents/skills/codex-workflow-chain/SKILL.md`. The adaptive planning reference selects the bounded technical maintenance lane (`LANE_MAINTENANCE`), with developer and QC roles and Task Plan/developer and DoD/QC review authority. Those role names identify authority, not actual reviewers or approvals. No public service, migration, security, regulated, foundation, release, or mixed-intent trigger is established by this fixture request. An exported local function alone is insufficient evidence of a public service contract escalation.

Adaptive runtime activation/parity has not been established; this proposal does not activate the adaptive writer or claim that legacy gates have been waived. The general workflow also requires acceptance/DoR, approach and task-plan evidence and explicit work-item approval before implementation. None is supplied. Exact runtime gate materialization remains unresolved; even the smallest maintenance gate set blocks implementation. Foundation and release scope are absent. Human DoD remains pending for any future implemented change and is not asserted here.

## Main Artifact

The existing CommonJS `total` function in `src/index.js` reduces `price * quantity` into a subtotal starting at zero. The single regression checks that two items priced at 100 cents total 200 cents. `package.json` runs that file with Node; there are no dependencies to add.

The requested benefit is a percentage reduction on the final integer-cent subtotal while preserving existing one-argument calls and leaving the input array and its objects unchanged.

## Requirement Analysis Spec

```yaml
raw_request: "Add an optional integer discountPercent argument to total(items, discountPercent=0)."
restated_request: "Validate the supplied discount, sum item amounts, discount the subtotal, and floor the result once without modifying items."
request_type: CHANGE
business_context: "Synthetic A0 benchmark of a bounded arithmetic change."
scope_in: [src/index.js, test/*.js, proposal.md]
scope_out: [storage, services, dependencies, new item-validation rules, agents, commits, pushes, global configuration]
open_questions:
  - "Should explicitly supplied undefined be rejected, or use JavaScript default-parameter behavior?"
assumptions:
  - "The existing item shape and integer-cent arithmetic baseline remain unchanged."
  - "No new monetary limits or numeric representation are authorized."
dependencies: [human gate review before implementation]
risks_initial:
  - "Rounding each line would violate subtotal-only rounding."
  - "Coercion could accept invalid discount types or throw TypeError instead of RangeError."
  - "Number precision for very large subtotals is unspecified by the existing fixture."
acceptance_criteria_draft:
  - id: AC1
    description: "Omitted discount preserves existing results; explicit zero preserves integer-cent subtotals."
    measurable: true
  - id: AC2
    description: "Accept integer Number values from 0 through 100 inclusive."
    measurable: true
  - id: AC3
    description: "Reject all other supplied values with RangeError, subject to resolving explicit undefined."
    measurable: true
  - id: AC4
    description: "Sum first, multiply the subtotal by the remaining percentage, divide by 100, and round down once."
    measurable: true
  - id: AC5
    description: "Do not mutate the array or item objects on success or rejection."
    measurable: true
notes_for_next_step: "Resolve undefined semantics and review the proposal; no approval is implied."
```

The wording “every other supplied value” favors rejecting explicit `undefined`; the displayed default-parameter signature favors treating it as zero. This is a review question, not a silently invented rule. Omission clearly defaults to zero under both interpretations.

## Proposed approach and brownfield impact

Recommend retaining the existing reducer and CommonJS export, validating the discount without coercion before arithmetic, then applying one floor operation to subtotal times (100 minus discount) divided by 100. Preserve the existing path for omitted discounts to avoid changing legacy behavior beyond the request. Only `src/index.js` and `test/regression.js` would need implementation edits after approval.

Rejected alternative: discount and round each line before summing. Two separate one-cent lines at 50 percent would incorrectly return zero instead of one cent. A reusable pricing abstraction or decimal dependency adds scope without a demonstrated need.

Validation must precede an empty-cart early return so invalid discounts still throw for empty carts. Do not introduce validation of prices, quantities, or monetary limits. Large-number precision beyond the existing Number model remains unspecified rather than gaining a new product rule.

## Proposed examples and acceptance evidence

These are expected outcomes for future tests, not executed discount tests. Prices are cents.

| Case | Items / subtotal | Discount | Expected |
| --- | --- | --- | --- |
| Normal (AC2, AC4) | 199 × 2 plus 102 × 1 = 500 | 15 | 425 |
| Fractional final cent (AC4) | 101 × 1 | 25 | 75 |
| Round once (AC4) | Two separate 1 × 1 lines | 50 | 1 |
| Lower boundary (AC1, AC2) | 100 × 2 | 0 | 200 |
| Upper boundary (AC2) | 100 × 2 | 100 | 0 |
| Near boundaries (AC2) | 100 × 1 | 1 and 99 | 99 and 1 respectively |
| Empty input (AC1, AC2) | Empty array | omitted, 0, 50, 100 | 0 each |
| Existing regression (AC1) | 100 × 2 | omitted | 200 |
| Multiple-line regression (AC1) | 199 × 2 plus 102 × 1 | omitted | 500 |
| Out of range (AC3) | Valid cart and empty cart | -1, 101 | RangeError each |
| Noninteger/nonfinite (AC3) | Valid cart and empty cart | 0.5, NaN, Infinity, -Infinity | RangeError each |
| Invalid types (AC3) | Valid cart and empty cart | string "10", empty string, null, true, false, object, array, boxed Number, BigInt, Symbol, function | RangeError each |
| Explicit undefined | Valid cart | undefined | Pending clarification: RangeError or default zero |
| Immutability (AC5) | Frozen array of frozen objects and an unfrozen snapshot comparison | valid and invalid discounts | Same item values, order and references; no mutation |

Also enumerate all 101 accepted integer percentages on a 100-cent subtotal: each must return 100 minus the percentage. Include negative zero as a valid numeric zero under the integer/range rule.

## Proposed task plan and verification path

1. Resolve the explicit-undefined question and obtain applicable human authoring approvals. Do not treat this proposal or benchmark authorization as a receipt.
2. Extend `test/regression.js` using its existing Node assert harness with AC1–AC5 cases above, including exact `RangeError` checks. Run `node test/regression.js` against the unchanged implementation and record a failure caused by the missing discount behavior.
3. Make the smallest implementation change in `src/index.js`; rerun the same tests to establish green. Preserve the old regression and avoid package-script changes.
4. Review against the approved requirements first, then check validation order, arithmetic and mutation behavior. Run `node --check src/index.js`, `node --check test/regression.js`, and `node test/regression.js`; check UTF-8 for changed files and review the final diff for scope.
5. Record actual evidence in `proposal.md`. Human QC retains the DoD decision. No agents, dependency installation, network access, commits, push or external repository work are part of this plan.

## Execution Topology

One agent prepares this proposal. Developer verification would own the focused local checks after approval; QC owns human DoD. No delegation or branch finalization is proposed.

## Traceability

User discount request → AC1–AC5 → proposed `src/index.js` delta → `test/regression.js` cases above → future focused verification → human QC review. The current state stops at the proposal; no implementation coverage is claimed.

## Evidence and Handoff

- Ran `node test/regression.js` against the unchanged baseline: exit 0, `existing regression PASS`.
- Only `proposal.md` was authored. Source and test files remain unchanged.
- Proposal UTF-8 verification is performed separately at handoff.
- TDD, new discount tests, implementation verification and human DoD have not run; implementation is blocked by missing gates.
- No standalone lint/build/type-check or workflow-validator script is supplied in `package.json`. No tooling was installed or invoked from outside the fixture.
- Next human action: review this concrete proposal, resolve explicit `undefined`, and provide applicable gate decisions through the authorized workflow. No approval is fabricated or requested to be backdated.
