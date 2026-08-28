---
artifact_id: "trusted-receipt-namespace-resolution.s01.restate"
artifact_family: workflow-step
work_item_slug: "trusted-receipt-namespace-resolution"
step_id: "s01"
step_slug: "restate"
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
> Trusted approval receipts are addressed by a namespace derived from `projectRoot`, so from any
> git worktree **every** receipt reads as MISSING. The repo's own policy makes a worktree mandatory
> for large or risky changes, so the governance layer is unreadable exactly where policy sends you.
> Carried out of `worktree-and-closure-integrity` as decision F-02, with its residual `L-01` folded in.

## Step Contract
```yaml
step_goal: "Restate the receipt-namespace defect and the folded-in DONE-transition gap, lock the classification, and record what must not break - without choosing a fix."
input_summary:
  - "Measured evidence from worktree-and-closure-integrity T0/T6 (2026-08-19)"
  - "Human decision F-02: this is filed as its own work item, not an extension of that scope"
  - "Human decision F-01/AMENDMENT-001 context: that work item's boundary deliberately fenced off receipt-trust machinery"
output_summary:
  - "Restated defect with reproduction evidence"
  - "Classification: BUG, brownfield, full/strict"
  - "Compatibility constraints - the 43 existing receipts and the four unchanged controls"
  - "Open questions that must be answered before an approach is chosen"
done_when:
  - "The defect is reproducible from the note alone"
  - "The non-negotiable invariants are written down"
  - "The spec impact is classified, or recorded as an open question owned by a named role"
owner: "developer"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Prefer the smallest solution that is correct"
  - "TDD for behavior change"
  - "Worktree for large or risky changes"
  - "Do not self-declare done"
  - "AI proposes, human approves"
required_reviews:
  - "Spec + Contract if the receipt address is judged a contract"
  - "DoR at s04"
  - "Approach at s05"
  - "Task Plan at s06"
prohibited_actions:
  - "Weakening any gate control: TTY, passphrase, per-gate receipt, digest binding, human-filled gate_reviews"
  - "Any change that makes an existing sealed receipt unreadable or invalid"
  - "Relocating or rewriting the 43 receipts on disk as a way to make lookup work"
  - "Treating an operator-set environment variable as the fix rather than a workaround"
open_governance_questions:
  - id: "GOV-Q1"
    question: "Is the receipt namespace a data contract? It is the on-disk address of audit evidence, and 43 receipts already live at the current address. If yes, this needs the contract gate and a compatibility story rather than a plain defect fix."
    owner: "po"
  - id: "GOV-Q2"
    question: "L-01 tightens the DONE transition, which four already-closed work items passed under the looser rule. Reconfirm the prospective-only precedent set as GOV-Q1 in worktree-and-closure-integrity, or decide differently."
    owner: "po"
```

## Artifact Chính
```yaml
raw_request: "F-02 from worktree-and-closure-integrity: the trusted-receipt namespace is derived from projectRoot, so from any worktree all 43 receipts are invisible. Decided: own work item. Plus L-01, the residual seal-then-dirty window at the DONE transition."
restated_request: "Make trusted approval receipts resolvable from any checkout of the same project - worktree, moved clone, CI workspace - without moving, rewriting or weakening the existing receipts; and close the window where a work item can reach DONE after its declared scope was dirtied post-seal."
request_type: BUG
defect_source: code
spec_impact: UNCLASSIFIED

user_problem_initial: "The repo's policy makes a worktree mandatory for large or risky changes. Inside a worktree, every gate receipt and every work-item receipt reads as MISSING, so `wfc protocol` cannot pass and the governance layer is effectively unreadable in the one workspace policy tells you to use. An operator sees 'Missing trusted approval receipt' for gates that are demonstrably APPROVED and digest-matched from the main tree, which reads as lost audit evidence rather than a lookup bug."
business_context_initial: "workflow-bundle v2.5.0 is published. An adopter who follows the mandatory worktree rule hits this on their first large change. It is the second half of a defect whose first half (workflow_root comparison) was fixed in worktree-and-closure-integrity; that fix removed the mismatch error and left this one fully exposed."

defects:
  - id: "E-A"
    requirement_hint: "primary"
    symptom: "Every trusted receipt reads as MISSING when any wfc command runs from a git worktree."
    location: "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js - buildProjectApprovalNamespace(projectRoot)"
    mechanism: "The namespace is basename(projectRoot) plus the first 12 hex of sha256(projectRoot). Both halves change with the absolute path, so a worktree addresses a directory that was never written."
    measured_2026_08_19:
      main_tree_namespace: "code-factory-916d1d6e915b - exists, holds 43 receipts"
      worktree_namespace: "worktree-and-closure-integrity-e9691c40f465 - absent"
      method: "Recomputed with the same algorithm and cross-checked against the namespaces present under ~/.workflow-bundle/trusted-approvals/"
      observed_errors: "6 errors from `wfc protocol` in the worktree: 5 'Missing trusted approval receipt for gate <spec|dor|approach|task_plan|dod>' plus 1 'Missing trusted work-item approval receipt'"
    already_confirmed_not_the_other_defect: "worktree-and-closure-integrity T2 fixed the workflow_root comparison; mismatch lines from a worktree are now 0. What remains is entirely this defect."
  - id: "E-B"
    requirement_hint: "folded in as L-01"
    symptom: "A work item can reach DONE after its declared delivery was dirtied following a clean dod seal."
    context: "worktree-and-closure-integrity T5 added a dirty-tree guard at the dod seal. DONE is protected transitively because it requires an APPROVED dod receipt digest-matched to the s08 note, but nothing re-checks cleanliness at the transition itself."
    why_it_was_not_closed_there: "A hatch at DONE would have to carry its reason either in the receipt payload (workflow-trusted-approval-utils.js, fenced off as receipt format) or through work-item-protocol.js (not in that work item's granted_write_paths). An unhatched check was rejected because it would refuse a legitimately waived close."
    why_here: "This work item already owns workflow-trusted-approval-utils.js, so the fence that blocked it there does not apply."

grouping_rationale: "E-A and E-B are grouped because both live behind the same file boundary this work item must open anyway, not because they share a cause. E-A is path resolution; E-B is a missing re-check. If E-B turns out to need a separate approach, it can be split at s05 without disturbing E-A."

scope_draft:
  in:
    - "Make receipt lookup resolve for the same logical project across different absolute paths"
    - "Keep all 43 existing receipts readable and digest-valid with no on-disk move"
    - "Close the seal-then-dirty window at the DONE transition, with a visible reason-bearing hatch"
    - "Fixtures reproducing both symptoms before any fix"
  out:
    - "Changing receipt format, signing, digest binding, TTY or passphrase controls"
    - "Reopening or re-sealing any closed work item"
    - "Rewriting or relocating existing receipts"
    - "The tdd-enforce hook, workflow_root comparison, and anything else already delivered by worktree-and-closure-integrity"
    - "Multi-agent execution"

constraints_initial:
  - "The 43 receipts must still report digest_match=true afterwards - this is the same ASM-001-class constraint that governed the sibling work item"
  - "No gate control weakens. This work item touches the file that implements them, which raises the bar rather than lowering it."
  - "Two work items already depend on the current namespace on this machine; a fix that requires manual migration is a worse outcome than the defect for anyone who does not run it"
  - "Behaviour change in both defects, so TDD applies: each gets a fixture observed failing first"

assumptions_initial:
  - id: "A1"
    assumption: "Receipts must stay outside the project root - resolveTrustedApprovalRoot already refuses an in-root approval root unless explicitly overridden, which is a deliberate anti-tampering control."
    reject_if: "That control is judged the wrong trade-off, which would be a much larger decision than this defect."
  - id: "A2"
    assumption: "A stable project identity exists that does not depend on the absolute path - the git common directory is the obvious candidate, since all worktrees of one repo share it."
    reject_if: "A project legitimately has no git repository, in which case the current path-derived namespace may have to remain as a fallback."
  - id: "A3"
    assumption: "Backward compatibility can be achieved by reading the legacy namespace as a fallback rather than by migrating receipts."
    reject_if: "Two addresses for one logical project is judged an unacceptable ambiguity in audit evidence."

open_questions_initial:
  - id: "OQ-1"
    question: "What is the stable project identity? git common dir, remote URL, an explicit config key, or a marker file? Each behaves differently for a bare clone, a fork, and a project with no remote."
    owner: "developer"
    blocking: "s05"
  - id: "OQ-2"
    question: "Read-fallback to the legacy namespace, or an explicit one-time migration command? Fallback keeps existing users working with no action; migration keeps exactly one address per project."
    owner: "po"
    blocking: "s05"
  - id: "OQ-3"
    question: "GOV-Q1 - does changing the receipt address count as a contract change requiring the contract gate?"
    owner: "po"
    blocking: "s04"
  - id: "OQ-4"
    question: "For E-B, where does the waiver reason live so the DONE transition can honour a waiver granted at seal time?"
    owner: "developer"
    blocking: "s05"

dependencies_initial:
  - "worktree-and-closure-integrity must land its T2 fix first - already committed on codex/worktree-and-closure-integrity, not yet merged. Without it the mismatch error masks this defect."
  - "A worktree, to reproduce E-A at all"
  - "packages/workflow-bundle test suite and governance fixtures"

risks_initial:
  - id: "S01-R01"
    description: "A namespace change silently orphans the 43 existing receipts, turning a lookup bug into apparent loss of audit evidence."
    severity: HIGH
    mitigation: "Compatibility is an acceptance criterion, not a nice-to-have: 43 of 43 digest_match=true is the gate. A1/A3 and OQ-2 exist to force the decision explicitly."
  - id: "S01-R02"
    description: "This work item edits the file that implements TTY, passphrase, signing and digest binding. A careless diff weakens a control the whole model rests on."
    severity: HIGH
    mitigation: "Narrow the change to namespace resolution. Assert the four controls unchanged as explicit non-regression checks, not as a claim."
  - id: "S01-R03"
    description: "E-B tightens DONE for work items that already closed under the looser rule."
    severity: MEDIUM
    mitigation: "GOV-Q2 - reconfirm the prospective-only precedent before implementing."
  - id: "S01-R04"
    description: "Fixing lookup could mask a genuinely wrong namespace, the same way over-broad normalisation nearly did for workflow_root."
    severity: MEDIUM
    mitigation: "Mirror the EDGE-003 pattern from the sibling work item: a negative fixture where the receipt genuinely belongs to a different project must still be refused."

notes_for_step_2: "The business goal is not 'make wfc protocol green in a worktree'. It is that audit evidence stays addressable for one logical project regardless of which checkout reads it, because a governance layer that cannot be read where the work happens is not a governance layer."
```

## Existing System Baseline
```yaml
current_behaviour:
  - "resolveTrustedApprovalRoot: approval root defaults to ~/.workflow-bundle/trusted-approvals and REFUSES to sit inside the project root unless WORKFLOW_BUNDLE_ALLOW_INSECURE_APPROVAL_ROOT=true. Deliberate anti-tampering control."
  - "buildProjectApprovalNamespace: basename(projectRoot) + sha256(projectRoot).slice(0,12)"
  - "Layout: <approvalRoot>/<namespace>/{gates/<slug>/<gate>.json, work-items/<slug>.json, changes/<CR>.json}"
  - "43 receipts on disk under code-factory-916d1d6e915b: 34 gate, 6 work-item, 3 change"
  - "DONE requires an APPROVED dod receipt digest-matched to the s08 note"
untouched_by_this_work_item:
  - "Receipt schema, signature, and digest binding"
  - "TTY and passphrase enforcement"
  - "One independent receipt per gate"
  - "gate_reviews / role_signoffs filled by a human before sealing"
```

## Work Item Protocol
```yaml
protocol_status: VERIFIED
approval_status: APPROVED
review_required: true
work_item_slug: "trusted-receipt-namespace-resolution"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/trusted-receipt-namespace-resolution"
current_step: "s08"
granted_write_paths:
  - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js"
  - "packages/workflow-bundle/scripts/work-item-protocol.js"
  - "packages/workflow-bundle/test"
  - "packages/workflow-bundle/tests/fixtures"
  - ".claude/worktrees/trusted-receipt-namespace-resolution"
  - "work-items/trusted-receipt-namespace-resolution"
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
reviewed_at: "2026-08-22T15:11:50.848Z"
handoff_target: "definition-of-done"
last_transition_action: "verify"
last_transition_at: "2026-08-28T06:26:08.772Z"
required_actions:
  - "Collect DoD evidence and close the work item when ready."
blockers: []
review_notes:
  - "Human review approved."
refs:
  - "work-items/trusted-receipt-namespace-resolution"
audit_events:
  - "REPORT_BOOTSTRAPPED"
  - "WORK_ITEM_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "VERIFICATION_CONFIRMED"
```

## Traceability
```yaml
source_inputs:
  - "work-items/worktree-and-closure-integrity/worktree-and-closure-integrity.s07.implementation.md#Open Scope Decisions - F-02"
  - "work-items/worktree-and-closure-integrity/worktree-and-closure-integrity.s07.implementation.md#known_limitations - L-01"
  - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js"
next_step: "s02 Business Goal"
dedup_review:
  near_match: "worktree-and-closure-integrity (score=1)"
  verdict: "Not a duplicate."
  evidence: "Its only mention of buildProjectApprovalNamespace is in its own s07 note, recording this defect as out of scope - 'Decided: own work item. NOT fixed here.' A handoff reference, not ownership. Its approved s06 boundary lists receipt format, signing, digest binding, TTY and passphrase controls as explicitly_untouched."
  reviewed_by: "PENDING - human confirmation required; the materialize dedup gate returned needs_review and has no override flag"
```

## Handoff
- **Settled:** the mechanism is measured and reproducible, the classification is BUG/brownfield/full/strict, and the four controls that must not move are written down. The sibling work item's T2 fix has already removed the error that used to mask this one.
- **Still open:** `OQ-1` through `OQ-4`. `spec_impact` is deliberately left `UNCLASSIFIED` - that is what escalated the profile to strict, and asserting a classification here to make the router quieter would be backwards.
- **Condition to enter step 2:** none blocking. `OQ-3` must be answered before `s04`, `OQ-1`/`OQ-2`/`OQ-4` before `s05`.
- **Not started:** no report exists yet, so no gate has been proposed, let alone passed. Nothing here authorises implementation.
