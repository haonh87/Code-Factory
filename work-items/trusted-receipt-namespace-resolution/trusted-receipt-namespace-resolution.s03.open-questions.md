---
artifact_id: "trusted-receipt-namespace-resolution.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "trusted-receipt-namespace-resolution"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
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
execution_roles: []
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
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
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "trusted-receipt-namespace-resolution.s01.restate.md"
  - "trusted-receipt-namespace-resolution.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> One question blocks `s04` and three block `s05`. The `s04` blocker is `GOV-Q1`: if the receipt
> address counts as a data contract, `approval_gates.contract` flips from `not_applicable` to
> `required` and the acceptance criteria have to carry a compatibility story. That is a `po`
> decision, so `s04` is **BLOCKED** rather than assumed.

## Step Contract
```yaml
step_goal: "Consolidate every unknown from s01 and s02 into questions with a named owner and the step each one blocks, then give an honest readiness verdict for s04 - without pre-answering anything to make the verdict look better."
input_summary:
  - "s01 restate: OQ-1..OQ-4, GOV-Q1, GOV-Q2, assumptions A1..A3, risks S01-R01..R04"
  - "s02 business goal: SM-1..SM-6 and the non-goals"
output_summary:
  - "Questions with owner, blocked step, and what a usable answer looks like"
  - "Missing inputs distinguished from open decisions"
  - "A readiness verdict for s04 with the specific blocker named"
done_when:
  - "Every question names an owner and the step it blocks"
  - "The verdict follows from the blockers rather than from optimism"
owner: "developer"
```

## Artifact Chính
```yaml
open_questions:
  - id: "OQ-3 / GOV-Q1"
    question: "Is the trusted-receipt namespace a data contract? It is the on-disk address of audit evidence and 43 receipts already live at the current address."
    owner: "po"
    blocks: "s04"
    why_it_blocks: "It decides whether approval_gates.contract is required or not_applicable, and whether the acceptance criteria must carry an explicit compatibility clause rather than a plain regression check."
    what_a_usable_answer_looks_like: "Either 'yes - treat the receipt address as a contract, require the contract gate' or 'no - it is an internal storage detail, a defect fix is enough', with the reason recorded so the next work item that touches receipt storage does not re-litigate it."
    agent_recommendation: "Treat it as a contract. The address is how every future reader finds the evidence, and 43 receipts are already published to it - that is the shape of a contract even though nothing external consumes it over a wire. Recommending the stricter reading because the cost of being wrong is asymmetric: an unnecessary gate wastes one review, an unnoticed contract break loses audit evidence."
    status: ANSWERED
    answer: "YES - the trusted-receipt namespace is a data contract."
    answered_by: "po (human, interactive)"
    answered_at: "2026-08-20"
    consequences_applied:
      - "approval_gates.contract: not_applicable -> required, in all 8 notes"
      - "role_signoffs.contract: developer"
      - "s04 carries a Contract Baseline block and a compatibility clause as a first-class acceptance criterion (AC-002), not a regression footnote"
      - "The contract gate must be sealed by a human before s07, in addition to spec, dor, approach and task_plan"
    precedent_recorded: "The on-disk address of audit evidence is a contract even when nothing consumes it over a wire, because it is how every future reader finds the evidence and receipts are already published to it. A later work item touching receipt storage should not re-litigate this."
  - id: "OQ-1"
    question: "What is the stable project identity that replaces sha256(projectRoot)?"
    owner: "developer"
    blocks: "s05"
    candidates:
      - "git common directory - all worktrees of one repo share it; this is the leading candidate because it is exactly the 'same logical project, different path' relation the defect is about"
      - "remote URL - stable across clones but absent for a repo with no remote, and identical for two clones that should arguably stay separate"
      - "explicit key in workflow-bundle.config.json - fully predictable, but requires every existing project to add it, which S01-R01 warns against"
      - "marker file at the project root - self-describing, but a new file in every adopter's repo"
    what_a_usable_answer_looks_like: "One primary derivation plus the defined behaviour when it is unavailable, since A2's reject_if is precisely a project with no git repository."
  - id: "OQ-2"
    question: "Read-fallback to the legacy namespace, or an explicit one-time migration command?"
    owner: "po"
    blocks: "s05"
    trade_off: "Fallback keeps every existing user working with zero action and satisfies SM-2 without touching disk, at the cost of two addresses for one project. Migration keeps exactly one address, at the cost of a manual step - and s02's constraints already say a fix requiring a manual step is worse than the defect for anyone who does not run it."
    agent_recommendation: "Read-fallback, write-new. It satisfies SM-2 by construction and never touches a sealed receipt. If a single canonical address is wanted later, a migration can be added on top once the fallback has proved the identity derivation is right."
  - id: "OQ-4"
    question: "For E-B, where does a waiver granted at the dod seal live so the DONE transition can honour it?"
    owner: "developer"
    blocks: "s05"
    context: "This is exactly why L-01 was left open in the sibling work item: the waiver reason had nowhere to travel that was inside that work item's boundary. Here the receipt file is in scope, so the option exists - but it means touching the receipt payload, which is a non-goal in s02 unless deliberately reopened."
    tension_to_resolve: "s02 lists 'changing receipt format' as a non-goal, and the most natural home for the waiver is the receipt. Either the non-goal is narrowed to 'no change to signature or digest binding' while allowing an additive field, or the waiver lives elsewhere - for example re-evaluated at transition time from the same git state."
    agent_recommendation: "Re-evaluate at transition time rather than storing the waiver. It keeps the receipt format non-goal intact and avoids a stored exemption that outlives the condition it was granted for. The operator passes the hatch again at the transition, which is a small cost for not persisting an exemption."
  - id: "GOV-Q2"
    question: "Does the tightened DONE transition apply to the four work items that already closed under the looser rule?"
    owner: "po"
    blocks: "s05"
    precedent: "worktree-and-closure-integrity resolved the equivalent question as GOV-Q1: prospective only, no closed work item reopened, because reopening would invalidate sealed receipts to enforce a rule that did not exist when they were sealed."
    agent_recommendation: "Reconfirm the same precedent. Deliberately raised again rather than inherited silently - it is a governance decision, and the fact that a sibling work item answered it once is not the same as it being answered for this one."
    status: ANSWERED
    answer: "PROSPECTIVE ONLY - the tightened DONE transition applies only to work items that close after it ships. The four already-DONE work items are not reopened, not re-sealed and not re-verified."
    answered_by: "po (human, interactive)"
    answered_at: "2026-08-21"
    reasoning: "Reopening would invalidate sealed receipts in order to enforce a rule that did not exist when they were sealed."
    scope_of_answer: "approval-path-defects, artifact-governance-enforcement, artifact-governance-model, stabilize-architecture-skill-bundle - the four work items at protocol_status=DONE, verified 2026-08-21."
    consulted_lens: "sa and ta, per the reasoning recorded in s04 blocking_items. They informed the decision but did not sign it: sa and ta are skills in this repo, not governance roles, and that gap is tracked as F-04."
    consequences_applied:
      - "T4 and T5 are unblocked on the governance axis. The SIBLING-MERGE blocker is independent and still stands."
      - "AC-004 asserts only that the four closed work items keep their receipts valid; it does not re-verify them."
      - "No governance-exception needed. The retroactive option would have required one, because reopening sealed receipts contradicts s02 non_goals."
    precedent_recorded: "Second confirmation of prospective-only for a retroactive invariant over sealed evidence. A later work item tightening a gate should apply the same rule rather than re-litigate it - but should still raise the question, as this one did."

missing_inputs:
  - id: "MI-1"
    input: "Whether any adopter outside this machine already depends on the current namespace layout."
    why_it_matters: "It changes OQ-2 from a local convenience question into a released-behaviour question."
    owner: "po"
    blocks: "s05"
    current_state: "Unknown. 43 receipts exist on this machine. The bundle is published at v2.5.0, so other installations may hold receipts under their own path-derived namespaces."
    can_be_de_risked: "Yes - the read-fallback recommended in OQ-2 makes this question non-blocking, because a fallback is correct whether or not other installations exist. Recorded so the answer is not needed to proceed rather than pretended to be known."

conflicts:
  - id: "CF-1"
    conflict: "s02 lists 'changing receipt format' as a non-goal, while the most natural place for E-B's waiver is the receipt payload."
    between: "s02 non_goals vs OQ-4"
    resolution_owner: "developer, with po sign-off if the non-goal is narrowed"
    proposed_resolution: "Resolve by design rather than by amendment: re-evaluate cleanliness at transition time so no waiver needs storing. If that proves unworkable at s05, narrow the non-goal explicitly and record it as a scope amendment rather than quietly widening scope."
  - id: "CF-2"
    conflict: "This work item must edit workflow-trusted-approval-utils.js, which the sibling work item's approved boundary listed as explicitly_untouched."
    between: "worktree-and-closure-integrity s06 boundary vs this work item's scope"
    resolution_owner: "po"
    proposed_resolution: "Not an actual conflict - that boundary constrained that work item, and F-02 was decided precisely so this file could be opened under its own gates. Recorded because a reviewer comparing the two boundaries will otherwise read it as drift."

assumptions:
  - "Inherited unchanged from s01 A1..A3, each with its own reject_if. None are promoted to fact by this note."
  - "No assumption here substitutes for OQ-3, which is a gate-shaping decision and not the agent's to make."
```

## Input Readiness
```yaml
status: READY
scope_of_verdict: "Entry to s04 only. This says the inputs for writing acceptance criteria exist - it does not say any gate has passed. The spec, contract, dor, approach and task_plan gates are all still unsealed."
verdict_history:
  - "BLOCKED as first written, on OQ-3 / GOV-Q1"
  - "READY after po answered OQ-3 = YES on 2026-08-20. The blocker was removed by a decision, not by re-grading it."
blocking_items: []
resolved_blocking_items:
  - "OQ-3 / GOV-Q1 - ANSWERED yes. approval_gates.contract is now required and the compatibility clause is mandatory in s04."
non_blocking_for_s04:
  - "OQ-1, OQ-2, OQ-4, GOV-Q2 - all block s05, not s04. Acceptance criteria can be written without knowing which identity derivation is chosen, because SM-1..SM-6 are stated as outcomes rather than mechanisms."
  - "MI-1 - de-risked by the read-fallback recommendation; the answer would refine the approach, not gate the criteria."
owner_actions:
  - "po: answer OQ-3 / GOV-Q1. That single answer unblocks s04."
  - "po: confirm the dedup verdict recorded in s01, then approve the work item - it has no report yet, so it is not protocol-managed and no gate has been proposed."
  - "po: at s05, answer OQ-2 and reconfirm GOV-Q2."
  - "developer: at s05, decide OQ-1 and OQ-4, and resolve CF-1 by design if possible."
why_not_partial: "One unanswered question is enough to make an s04 acceptance criterion either wrong or silent about a required gate. Safe default is to treat the gate as not passed rather than to grade the readiness generously."
```

## Audit
```yaml
audit_status: PARTIAL
notes:
  - "s01 and s02 are complete and internally consistent: every s02 success metric traces to a measured s01 baseline."
  - "PARTIAL rather than PASS solely because s04 entry is blocked by OQ-3. Nothing in s01..s03 is known to be wrong."
  - "No gate has been claimed, proposed or passed by this note. The work item still has no .work-item-report.json."
  - "Agent recommendations are recorded against four of the six questions. They are proposals for the named owner to accept or reject, not answers - the distinction is the whole point of the AI-proposes model."
```

## Traceability
```yaml
upstream:
  - "trusted-receipt-namespace-resolution.s01.restate.md"
  - "trusted-receipt-namespace-resolution.s02.business-goal.md"
next_step: "s04 Acceptance + DoR - BLOCKED on OQ-3"
question_to_step_map:
  s04: ["OQ-3 / GOV-Q1"]
  s05: ["OQ-1", "OQ-2", "OQ-4", "GOV-Q2", "MI-1", "CF-1"]
```

## Handoff
- **Readiness:** `BLOCKED` for `s04`. Exactly one question blocks it — `OQ-3 / GOV-Q1`, owned by `po`.
- **To enter step 4:** answer whether the receipt namespace is a data contract. My recommendation is yes, on asymmetric-cost grounds, but it shapes a gate so it is not mine to decide.
- **Everything else is sequenced, not stuck:** `OQ-1`, `OQ-2`, `OQ-4`, `GOV-Q2`, `MI-1` and `CF-1` all land at `s05`, and `s04` can be authored without them.
- **Status of this work item overall:** three discovery notes authored, no report, no gate proposed. Nothing here authorises implementation.
