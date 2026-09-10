---
artifact_id: "closeout-bundle-repeat-cycle-reconciliation.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-repeat-cycle-reconciliation"
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
execution_roles:
  - "ba"
  - "developer"
  - "qc"
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "not_applicable"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
  dod: "required"
role_signoffs:
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: ["devops", "qc"]
  business_acceptance: ["po"]
  dod: ["qc"]
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
  - "closeout-bundle-repeat-cycle-reconciliation.s01.restate.md"
  - "closeout-bundle-repeat-cycle-reconciliation.s02.business-goal.md"
linked_artifacts:
  - "closeout-bundle-repeat-cycle-reconciliation.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../closeout-bundle-legacy-dod-compatibility/closeout-bundle-legacy-dod-compatibility.s08.verification.md"
  - "../../packages/workflow-bundle/scripts/work-item-protocol.js"
  - "../../packages/workflow-bundle/test/work-item-protocol.test.js"
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Input readiness for `s04 Acceptance + DoR` is **READY**. BA, Developer, and QC approved
> `OQ-RCR-001 Option B`; Developer and QC approved `OQ-RCR-002 Option A`; BA, Developer, and
> QC approved `OQ-RCR-003 Option A`. The decisions distinguish a committed cycle from an
> unchanged retry, preserve coarse audit compatibility while adding one attributable event per
> committed cycle, and limit reconciliation to mutable current-state surfaces. No implementation
> authority is created.

## Step Contract
```yaml
step: "s03 Open Questions"
goal: >-
  Isolate and disposition every ambiguity that could change the acceptance criteria for repeated
  closeout reconciliation, while reusing existing authority and avoiding technical design.
value: >-
  Prevent s04 from encoding an ambiguous cycle boundary, duplicate-event behavior, or an unsafe
  cleanup scope, without forcing humans to repeat decisions already locked by CR-008.
scope_in:
  - "Business meaning of a new committed closeout cycle versus an unchanged retry"
  - "Audit semantics for current-cycle evidence and immutable history"
  - "Mutable state surfaces and canonical post-closeout next action"
  - "Existing candidate, rollback, prior-defect, and parent-release decisions"
  - "Input readiness for measurable acceptance criteria and DoR"
scope_out:
  - "Selecting a helper, fingerprint algorithm, transaction structure, or code location"
  - "Changing the receipt schema, signer, authority model, or public command"
  - "Reopening the resolved legacy mandatory-DoD selector defect"
  - "Implementing tests or production behavior"
  - "Publishing, tagging, merging, installing, cleanup, or branch finalization"
inputs_required:
  - "PO-approved s02 Business Goal and KPI-RCR-001..006"
  - "s01 RCR-01..06 and SA/TA drivers"
  - "F-AG11-001 observed persisted state and root-cause evidence"
  - "Current closeout reconciliation code and regression fixtures"
  - "CR-008 exact-candidate and historical-evidence policy"
outputs_required:
  - "Three option-based open questions with owners and recommendations"
  - "Resolved-by-existing-authority decisions"
  - "Conflict and assumption register"
  - "Input Readiness verdict using the canonical schema"
  - "Evidence-based s03 audit and a concrete human action"
done_when:
  - "Every ambiguity that changes s04 criteria has an ID, owner, options, and recommendation"
  - "Existing human decisions are reused instead of reopened"
  - "Requirement semantics are separated from s05 technical design"
  - "Readiness is BLOCKED while decision-bearing questions remain unapproved"
  - "The next human action names the exact bundle, options, roles, and sequence"
constraints:
  hard_constraints:
    - "AI must not infer approval for OQ-RCR-001..003"
    - "A successful new cycle and an unchanged retry must remain distinguishable"
    - "Historical receipts and protocol events must remain immutable"
    - "One human interaction must preserve independent gate authority and receipts"
    - "Parent release and branch finalization remain blocked by F-AG11-001"
  soft_constraints:
    - "Ask only questions that materially change s04 acceptance or readiness"
    - "Prefer the smallest correction compatible with existing protocol schemas"
  prohibited_actions:
    - "Choose the s05 implementation pattern in s03"
    - "Use global audit-event presence as proof of current-cycle completion"
    - "Rewrite historical evidence to make the current state look consistent"
    - "Open s04 as READY before the recommendation bundle is approved"
  compliance_checks:
    - "OQ-RCR-001 distinguishes committed transition from invocation and global history"
    - "OQ-RCR-002 distinguishes per-cycle protocol evidence from coarse audit markers"
    - "OQ-RCR-003 distinguishes mutable current-state surfaces from immutable history"
    - "Input Readiness lists OQ-RCR-001..003 as missing decisions"
    - "Parent and linked-defect handoffs retain the implementation and release holds"
risks:
  - id: "R-S03-RC-001"
    description: "An ambiguous cycle boundary could create either a missing event or duplicates on retry."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Require an explicit human decision separating committed state transition from command invocation and history."
    contingency: "Keep s04 blocked and retain F-AG11-001 if the semantics remain ambiguous."
    owner: "ba/developer/qc"
    status: OPEN
  - id: "R-S03-RC-002"
    description: "Duplicating coarse audit markers could damage idempotency or existing consumers."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Separate append-only per-cycle protocol evidence from the coarse audit marker in the recommendation."
    contingency: "Require compatibility criteria at s04 before any design is approved."
    owner: "developer/qc"
    status: OPEN
  - id: "R-S03-RC-003"
    description: "Over-broad cleanup could rewrite historical notes or suppress a valid next action."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Pin current-state mutable surfaces and the canonical close action before acceptance criteria are written."
    contingency: "Reject any s04 criteria that authorize generic history rewriting."
    owner: "ba/developer/qc"
    status: OPEN
timebox:
  target_duration: "One evidence and recommendation pass"
  deadline: "Before s04 Acceptance + DoR authoring"
  escalation_rule: "Remain BLOCKED if any question changes cycle identity, event evidence, or reconciliation scope."
```

## Main Artifact
```yaml
open_questions:
  - id: "OQ-RCR-001"
    question: "What constitutes a new committed closeout cycle, distinct from an unchanged retry?"
    decision_type: "requirement semantics"
    owners: ["ba", "developer", "qc"]
    status: "APPROVED"
    decision: "B"
    reviewed_by: ["ba", "developer", "qc"]
    reviewed_at: "2026-09-10T02:30:56Z"
    options:
      - id: "A"
        statement: "Treat every command invocation as a new cycle."
        tradeoff: "Simple to observe, but a retry would create duplicate event evidence and violate KPI-RCR-003."
      - id: "B"
        statement: "Treat a cycle as new only when the transaction commits at least one new current gate receipt or equivalent current-state transition for the exact artifact and applicable gate set."
        tradeoff: "Separates committed work from retries while leaving the exact fingerprint mechanism to s05."
      - id: "C"
        statement: "Treat the first global CLOSEOUT_BUNDLE_APPROVED marker as the only cycle."
        tradeoff: "Preserves current code shape but suppresses evidence for every later valid cycle."
    recommendation: "B"
    rationale: "It satisfies one event per committed cycle and zero mutation on unchanged retry without selecting an implementation algorithm."
    acceptance_effect: "s04 must test first cycle, second committed cycle, and unchanged retry as three distinct states."
  - id: "OQ-RCR-002"
    question: "How should current-cycle success be recorded while historical evidence stays immutable?"
    decision_type: "audit contract"
    owners: ["developer", "qc"]
    status: "APPROVED"
    decision: "A"
    reviewed_by: ["developer", "qc"]
    reviewed_at: "2026-09-10T02:30:56Z"
    options:
      - id: "A"
        statement: "Append exactly one attributable protocol event for each committed cycle; retain the coarse audit_events marker as a compatibility indicator and do not rewrite history."
        tradeoff: "Provides cycle-level evidence while preserving existing consumers and receipt history."
      - id: "B"
        statement: "Append another identical CLOSEOUT_BUNDLE_APPROVED string to audit_events for every cycle."
        tradeoff: "Avoids protocol-event semantics but makes the coarse list an ambiguous event log and can break idempotency assumptions."
      - id: "C"
        statement: "Replace the previous closeout event with the current one."
        tradeoff: "Keeps one visible event but destroys immutable audit history."
    recommendation: "A"
    rationale: "It separates compatibility markers from per-cycle evidence and works with the existing append-only protocol-event model."
    acceptance_effect: "s04 must assert one new protocol event for a committed second cycle, no historical mutation, and no event on unchanged retry."
  - id: "OQ-RCR-003"
    question: "Which state is reconciled after commit, and what is the canonical next action?"
    decision_type: "completion boundary"
    owners: ["ba", "developer", "qc"]
    status: "APPROVED"
    decision: "A"
    reviewed_by: ["ba", "developer", "qc"]
    reviewed_at: "2026-09-10T02:30:56Z"
    options:
      - id: "A"
        statement: "Reconcile the mutable report and s01 protocol mirror semantically, remove satisfied approval blockers/actions regardless of prose form, and leave only the work-item close action with a protocol-close handoff."
        tradeoff: "Produces one authoritative current state while preserving historical notes, receipts, and events."
      - id: "B"
        statement: "Remove only literal approve-closeout-bundle command strings and retain the previous handoff."
        tradeoff: "Smallest textual change, but repeats the observed F-AG11-001 failure for prose and stale navigation."
      - id: "C"
        statement: "Rewrite every historical workflow note so all prior sections show the current state."
        tradeoff: "Makes search results look uniform but destroys historical meaning and creates a large blast radius."
    recommendation: "A"
    rationale: "It makes the current source and mirror agree without converting immutable history into mutable state."
    acceptance_effect: "s04 must enumerate mutable surfaces, semantic cleanup, canonical close action, and preserved history."
missing_inputs: []
conflicts:
  - id: "CONFLICT-RCR-001"
    sources: ["Global audit-event presence check", "Requirement for one event per committed cycle"]
    conflict: "Historical success currently suppresses evidence for a later committed cycle."
    disposition: "Resolved by OQ-RCR-001 Option B and OQ-RCR-002 Option A; mechanism selection remains deferred to s05."
    owner: "developer/qc"
    blocking: false
  - id: "CONFLICT-RCR-002"
    sources: ["Literal command-string cleanup", "KPI-RCR-001 zero stale approval surfaces"]
    conflict: "Equivalent prose or alternate command formatting survives a successful closeout."
    disposition: "Resolved by OQ-RCR-003 Option A: reconcile semantic current state rather than literal command text."
    owner: "ba/developer/qc"
    blocking: false
  - id: "CONFLICT-RCR-003"
    sources: ["Retained pre-closeout handoff", "KPI-RCR-004 post-closeout surface agreement"]
    conflict: "Receipts say complete while navigation still points to the completed approval."
    disposition: "Resolved by OQ-RCR-003 Option A: leave the work-item close action and protocol-close handoff."
    owner: "ba/developer/qc"
    blocking: false
  - id: "CONFLICT-RCR-004"
    sources: ["Parent protocol_status=VERIFIED", "QC-reopened s07 delivery lane for F-AG11-001"]
    conflict: "The enum has no VERIFIED-to-s07 transition, while governance evidence blocks current release authority."
    disposition: "Retain VERIFIED as a historical protocol projection and enforce BLOCKED through the parent delivery-lane state and artifacts."
    owner: "qc"
    blocking: false
assumptions:
  - "The public approve-closeout-bundle command and trusted receipt-v1 contract remain unchanged."
  - "The existing protocol event record can carry attributable cycle evidence; s05 must prove whether extra identity data is necessary."
  - "The mutable current-state pair is the work-item report plus its synchronized s01 protocol block."
  - "The canonical post-closeout action remains wfc work-item close for a VERIFIED work item."
  - "The current CR-008 worktree remains the delivery isolation boundary."
resolved_by_existing_authority:
  - id: "RDA-RCR-001"
    subject: "Candidate and rollback identity"
    decision: "Build and host one corrected v2.6.2 candidate; retain immutable v2.6.1 as rollback under its known closeout limitation."
    source: "Prior DevOps/QC release decisions and parent F-AG11-001 hold"
  - id: "RDA-RCR-002"
    subject: "Prior missing-DoD defect"
    decision: "Keep closeout-bundle-legacy-dod-compatibility closed and use it only as regression evidence."
    source: "Completed linked defect and s01 dedup decision"
  - id: "RDA-RCR-003"
    subject: "Public contract and foundation"
    decision: "No public CLI, receipt, authority, stack, runtime, or deployment contract change is in scope."
    source: "Approved s01 and s02 scope boundaries"
  - id: "RDA-RCR-004"
    subject: "Release authority"
    decision: "Historical parent terminal receipts do not authorize a corrected candidate; parent gates must be repeated after re-verification."
    source: "QC F-AG11-001 invalidation and human-controlled gate policy"
recommendation_bundle:
  sequence: ["OQ-RCR-001", "OQ-RCR-002", "OQ-RCR-003"]
  selections:
    OQ-RCR-001: "B"
    OQ-RCR-002: "A"
    OQ-RCR-003: "A"
  reviewers:
    OQ-RCR-001: ["ba", "developer", "qc"]
    OQ-RCR-002: ["developer", "qc"]
    OQ-RCR-003: ["ba", "developer", "qc"]
  effect_if_approved: "Resolve blocking conflicts and open s04 Acceptance + DoR authoring; no implementation authority is created."
  approval_status: "APPROVED"
  approved_at: "2026-09-10T02:30:56Z"
  decision_source: "User explicitly approved all three options with the assigned BA, Developer, and QC roles."
```

## Input Readiness
```yaml
step: "s04 Acceptance + DoR"
status: READY
available_inputs:
  - "PO-approved Business Goal with KPI-RCR-001..006"
  - "Approved work-item receipt and complete s01 SA/TA driver set"
  - "Observed repeated-closeout receipts, stale actions/handoff, and missing current-cycle event"
  - "Source evidence for literal action filtering, retained handoff, and global event-presence dedup"
  - "Existing first-cycle, legacy gate-set, atomicity, and exact-candidate regression evidence"
  - "Existing authority for v2.6.2 candidate, v2.6.1 rollback, and parent release hold"
  - "Human-approved OQ-RCR-001 Option B cycle-boundary semantics"
  - "Human-approved OQ-RCR-002 Option A audit-event contract"
  - "Human-approved OQ-RCR-003 Option A reconciliation boundary and canonical next action"
missing_inputs: []
invalid_inputs:
  - "Historical parent DoD, Release, and Business Acceptance receipts are pre-finding evidence only."
  - "Global CLOSEOUT_BUNDLE_APPROVED presence alone cannot prove current-cycle completion."
conflicts:
  - "CONFLICT-RCR-001..003 are resolved by the approved B/A/A decisions."
  - "CONFLICT-RCR-004 is contained by the parent BLOCKED delivery-lane projection and is non-blocking for child discovery."
assumptions:
  - "The correction can remain within existing work-item protocol and test boundaries."
  - "No public contract or foundation gate becomes applicable unless later evidence contradicts the approved scope."
risk_level: MEDIUM
next_action: "Draft measurable s04 Spec and DoR evidence from the approved B/A/A decisions, then request independent BA and QC gate review."
```

## Audit
```yaml
step: "s03 Open Questions"
status: PASS
checks:
  - criterion: "Every acceptance-changing ambiguity has an ID, owner, options, and recommendation"
    result: PASS
    evidence: "OQ-RCR-001..003 each contain owners, three options, one recommendation, rationale, and acceptance effect."
  - criterion: "Existing human decisions are reused instead of reopened"
    result: PASS
    evidence: "RDA-RCR-001..004 retain candidate, rollback, prior-defect, contract, and release-hold authority."
  - criterion: "Requirement semantics are separated from technical design"
    result: PASS
    evidence: "The bundle specifies observable cycle, event, and state semantics while deferring mechanisms to s05."
  - criterion: "Readiness stays blocked until every decision-bearing question is approved"
    result: PASS
    evidence: "The artifact remained BLOCKED until the user explicitly approved OQ-RCR-001=B, OQ-RCR-002=A, and OQ-RCR-003=A with their assigned roles."
  - criterion: "Every blocking question has a human decision"
    result: PASS
    evidence: "All three questions record APPROVED status, exact option, reviewer roles, timestamp, and decision source."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed classification and recommendation in one evidence pass; human review remains outside the authoring timebox."
gaps: []
risk_level: MEDIUM
next_action: "Proceed to s04 Acceptance + DoR authoring; keep Spec and DoR as independent human-controlled gates."
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes; BA, Developer, and QC retain the question decisions assigned to them"
  - "Current lifecycle state and immutable history have distinct ownership"
  - "A completed approval must not remain represented as pending"
  - "Human interaction bundling never collapses independent gate authority"
required_reviews:
  - "BA, Developer, and QC review OQ-RCR-001"
  - "Developer and QC review OQ-RCR-002"
  - "BA, Developer, and QC review OQ-RCR-003"
prohibited_actions:
  - "Infer the recommended options as approved"
  - "Open s04 readiness before all three decisions are recorded"
  - "Choose implementation mechanics or edit production code"
  - "Use historical terminal receipts as current release authority"
open_governance_questions: []
```

## Traceability
```yaml
source_inputs:
  - "PO-approved closeout-bundle-repeat-cycle-reconciliation.s02.business-goal.md"
  - "F-AG11-001 in parent s07 and s08"
  - "packages/workflow-bundle/scripts/work-item-protocol.js reconciliation behavior"
  - "packages/workflow-bundle/test/work-item-protocol.test.js closeout fixtures"
decision_mapping:
  - { question: "OQ-RCR-001", drivers: ["DRV-SA-RC-002", "DRV-TA-RC-002"], criteria: ["RCR-02", "RCR-04"], metrics: ["KPI-RCR-002", "KPI-RCR-003"] }
  - { question: "OQ-RCR-002", drivers: ["DRV-SA-RC-002", "DRV-TA-RC-002"], criteria: ["RCR-02", "RCR-05"], metrics: ["KPI-RCR-002", "KPI-RCR-005"] }
  - { question: "OQ-RCR-003", drivers: ["DRV-SA-RC-001", "DRV-SA-RC-003", "DRV-TA-RC-001"], criteria: ["RCR-01", "RCR-03"], metrics: ["KPI-RCR-001", "KPI-RCR-004"] }
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Readiness status: `READY`; s03 audit is `PASS` after explicit human decisions.
- Approved sequence: `OQ-RCR-001 Option B → OQ-RCR-002 Option A → OQ-RCR-003 Option A`.
- Recorded roles: BA/Developer/QC for OQ-RCR-001 and OQ-RCR-003; Developer/QC for OQ-RCR-002.
- Next gate: draft s04, then BA reviews Spec and BA/QC review DoR; implementation remains closed.
