---
artifact_id: "closeout-bundle-repeat-cycle-reconciliation.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-repeat-cycle-reconciliation"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: final
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
  - "qc"
  - "devops"
  - "po"
review_mode: independent
verification_owner: "qc"
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
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-09-10T03:09:26Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["ba", "qc"]
  dor_reviewed_at: "2026-09-10T03:09:26Z"
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
  - "sa"
  - "ta"
  - "step-goal-contract"
  - "definition-of-ready-gate"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "closeout-bundle-repeat-cycle-reconciliation.s01.restate.md"
  - "closeout-bundle-repeat-cycle-reconciliation.s02.business-goal.md"
  - "closeout-bundle-repeat-cycle-reconciliation.s03.open-questions.md"
linked_artifacts:
  - "closeout-bundle-repeat-cycle-reconciliation.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s07.implementation.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../closeout-bundle-legacy-dod-compatibility/closeout-bundle-legacy-dod-compatibility.s08.verification.md"
  - "../../packages/workflow-bundle/scripts/work-item-protocol.js"
  - "../../packages/workflow-bundle/test/work-item-protocol.test.js"
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> The proposed Spec makes the approved B/A/A decisions testable: each committed closeout cycle
> contributes one attributable protocol event; an unchanged retry changes nothing; and a successful
> closeout reconciles the report plus s01 protocol mirror to one close action and a `protocol-close`
> handoff without rewriting history. BA approved Spec, and BA plus QC approved DoR at
> `2026-09-10T03:09:26Z`. Input readiness is `READY`; the two independent trusted receipts must
> still be sealed against this finalized host before s05 can open.

## Step Contract
```yaml
step: "s04 Acceptance + DoR"
goal: >-
  Convert the approved repeat-cycle semantics into deterministic acceptance criteria and a
  reviewable readiness decision without choosing the implementation mechanism.
value: >-
  Give Developer and QC an exact behavioral target that closes F-AG11-001 while preserving
  immutable evidence, independent gate authority, retry idempotency, and parent release safety.
scope_in:
  - "Committed-cycle classification for first and later closeout cycles"
  - "One attributable protocol event per committed cycle and one coarse compatibility marker"
  - "Semantic reconciliation of mutable report and s01 protocol surfaces"
  - "Canonical work-item close action and protocol-close handoff"
  - "Zero-write unchanged retry and closeout transaction atomicity"
  - "Legacy, adaptive, receipt-v1, exact-candidate, and parent CR-008 regression evidence"
scope_out:
  - "Selecting a cycle fingerprint, helper API, transaction primitive, or code structure"
  - "Changing the public CLI, receipt-v1 schema, signer, trusted root, or reviewer authority"
  - "Rewriting historical workflow notes, receipts, or protocol events"
  - "Reopening the resolved legacy mandatory-DoD selector defect"
  - "Implementation, release execution, publication, tagging, merge, install, cleanup, or branch finalization"
inputs_required:
  - "PO-approved s02 Business Goal and KPI-RCR-001..006"
  - "s01 RCR-01..06 plus SA/TA architecture drivers"
  - "Human-approved OQ-RCR-001 Option B, OQ-RCR-002 Option A, and OQ-RCR-003 Option A"
  - "F-AG11-001 observed-state and root-cause evidence"
  - "Current reconciliation source and first-cycle, legacy, retry, and atomicity fixtures"
  - "CR-008 exact-candidate, rollback, and terminal reapproval constraints"
outputs_required:
  - "Proposed Requirement and Contract baselines"
  - "Brownfield Existing System Baseline"
  - "Measurable acceptance criteria, edge cases, out-of-scope boundaries, and invariants"
  - "Strict governance checklist result"
  - "Definition of Ready assessment and independent human gate proposal"
done_when:
  - "Every acceptance criterion has deterministic given, when, then, and verification evidence"
  - "First cycle, later committed cycle, and unchanged retry are distinguishable"
  - "Mutable current state and immutable history boundaries are explicit"
  - "Atomicity, compatibility, reviewer authority, rollback, and parent release impact are covered"
  - "No unresolved input or governance conflict blocks independent Spec and DoR review"
  - "The artifact names exact reviewers and the conditions for entering s05"
constraints:
  hard_constraints:
    - "A committed closeout cycle contributes exactly one attributable protocol event"
    - "An unchanged retry contributes zero receipt, event, report, or s01 mutations"
    - "Successful reconciliation leaves one work-item close action and a protocol-close handoff"
    - "Historical receipts, notes, audit markers, and protocol-event entries are not rewritten"
    - "Every applicable gate retains its independent receipt and configured reviewer authority"
    - "Parent CR-008 remains blocked until one corrected exact candidate passes re-verification and new terminal approvals"
    - "Implementation remains closed until trusted Spec, DoR, Approach, and Task Plan receipts pass"
  soft_constraints:
    - "Prefer the smallest correct correction inside the existing protocol and test boundaries"
    - "Reuse the current receipt-v1 and append-only protocol-event models"
  prohibited_actions:
    - "Treat this draft, readiness verdict, governance check, or audit PASS as human gate approval"
    - "Use global CLOSEOUT_BUNDLE_APPROVED presence as proof of current-cycle completion"
    - "Delete history or broadly rewrite workflow notes to obtain surface agreement"
    - "Select an s05 implementation pattern in this artifact"
    - "Use historical parent terminal receipts as corrected-candidate authority"
  compliance_checks:
    - "All approved OQ decisions map to at least one acceptance criterion"
    - "Strict reviewer, compatibility, release, and rollback checks are present"
    - "Contract and Foundation applicability are explicit"
    - "No governance exception or waiver is required"
risks:
  - id: "R-S04-RC-001"
    description: "A weak cycle definition may still suppress a later valid event or duplicate one on retry."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "AC-RCR-01, AC-RCR-02, and AC-RCR-04 require separate first-cycle, later-cycle, and byte-identical retry evidence."
    contingency: "QC keeps F-AG11-001 open and rejects Technical Verification."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S04-RC-002"
    description: "Semantic cleanup may erase historical or unrelated evidence."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "AC-RCR-03 and AC-RCR-05 limit mutation to report/s01 current-state fields and require historical prefix/digest preservation."
    contingency: "Reject the correction and restore the before-state snapshot."
    owner: "ba/developer/qc"
    status: MONITORING
  - id: "R-S04-RC-003"
    description: "New reconciliation writes may expose partial state during a failure."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "AC-RCR-06 requires failure injection across receipt, event, report, and s01 persistence boundaries."
    contingency: "Retain individual terminal approvals and keep release blocked."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S04-RC-004"
    description: "A corrected child may be accepted against stale parent candidate evidence."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "AC-RCR-08 requires one new exact local/hosted candidate and repeated parent terminal decisions."
    contingency: "Retain the current candidate and receipts only as historical pre-finding evidence."
    owner: "devops/qc/po"
    status: MONITORING
timebox:
  target_duration: "One acceptance and readiness authoring pass"
  deadline: "Before s05 Technical Approach"
  escalation_rule: "Return to s03 if a reviewer disputes cycle identity, event semantics, mutable surfaces, or history preservation."
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "changes/CR-008/spec-delta/srs.delta.md"
approved_spec_digests:
  - ref: "changes/CR-008/spec-delta/srs.delta.md"
    sha256: "01667dd97faff3861534dc0d400ccfff51283de8305d360d69e0982abf1295eb"
source_refs:
  - "closeout-bundle-repeat-cycle-reconciliation.s01.restate.md"
  - "closeout-bundle-repeat-cycle-reconciliation.s02.business-goal.md"
  - "closeout-bundle-repeat-cycle-reconciliation.s03.open-questions.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md#F-AG11-001-Reopen-And-Evidence-Invalidation"
approved_decisions:
  - id: "OQ-RCR-001"
    option: "B"
    reviewed_by: ["ba", "developer", "qc"]
    reviewed_at: "2026-09-10T02:30:56Z"
  - id: "OQ-RCR-002"
    option: "A"
    reviewed_by: ["developer", "qc"]
    reviewed_at: "2026-09-10T02:30:56Z"
  - id: "OQ-RCR-003"
    option: "A"
    reviewed_by: ["ba", "developer", "qc"]
    reviewed_at: "2026-09-10T02:30:56Z"
decision_notes:
  - "A committed cycle requires at least one new current receipt or equivalent committed current-state transition for the exact artifact and applicable gate set."
  - "Each committed cycle appends one attributable protocol event; CLOSEOUT_BUNDLE_APPROVED remains a coarse compatibility marker."
  - "Only the mutable report and synchronized s01 protocol state are reconciled to the canonical close action and handoff."
  - "Human BA approved this Spec at 2026-09-10T03:09:26Z; trusted Spec receipt sealing remains pending."
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
event_contract_refs: []
data_contract_refs: []
ux_contract_refs: []
notes:
  - "The public wfc gate approve-closeout-bundle command is unchanged."
  - "Trusted receipt-v1, signer, approval root, reviewer identity, and independent-gate semantics are unchanged."
  - "The existing protocol-event record is reused; s05 may choose an internal identity mechanism without opening a public contract."
```

## Existing System Baseline
```yaml
baseline_date: "2026-09-10"
current_behavior_refs:
  - id: "BASE-RCR-001"
    behavior: "Closeout cleanup recognizes bundle CLI strings, individual approve commands for selected gates, and rejected-bundle wording."
    evidence: "packages/workflow-bundle/scripts/work-item-protocol.js:428-456"
  - id: "BASE-RCR-002"
    behavior: "Successful closeout keeps the existing handoff target; only readiness explicitly changes its handoff."
    evidence: "packages/workflow-bundle/scripts/work-item-protocol.js:458-463"
  - id: "BASE-RCR-003"
    behavior: "A global audit-event presence check suppresses later protocol-event append operations."
    evidence: "packages/workflow-bundle/scripts/work-item-protocol.js:457-480"
  - id: "BASE-RCR-004"
    behavior: "Existing closeout fixtures verify first-cycle cleanup, one coarse marker, legacy gate selection, atomic failure, and unchanged retry."
    evidence: "packages/workflow-bundle/test/work-item-protocol.test.js:726-929"
  - id: "BASE-RCR-005"
    behavior: "The real parent repeat cycle sealed valid receipts but retained stale actions/handoff and omitted the current protocol event."
    evidence: "F-AG11-001 in parent s07 and s08"
impacted_surfaces:
  - "Closeout bundle current-state reconciliation in work-item-protocol.js"
  - "Protocol report required_actions, blockers, handoff_target, audit_events, and protocol_events"
  - "Synchronized s01 Work Item Protocol mirror"
  - "Closeout integration fixtures and failure matrix"
  - "CR-008 child and parent verification/release evidence"
compatibility_constraints:
  - "First-cycle maintenance and product closeout behavior remains valid."
  - "Legacy mandatory-DoD and adaptive declared-gate selection remain unchanged."
  - "Readiness bundle behavior and receipt-v1 verification remain unchanged."
  - "Historical notes, receipts, audit markers, and protocol events remain readable and attributable."
rollback_constraints:
  - "v2.6.1 SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9 remains the immutable rollback artifact."
  - "After rollback, bundled closeout remains guarded under the known limitation and applicable terminal gates are handled individually."
  - "Pre-finding parent receipts and candidate evidence remain historical only."
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: "AC-RCR-01"
    traces_to: ["RCR-02", "RCR-04", "KPI-RCR-002", "KPI-RCR-003", "OQ-RCR-001", "DRV-SA-RC-002", "DRV-TA-RC-002"]
    scenario: "First cycle, later committed cycle, and unchanged retry have distinct outcomes"
    criterion: "Cycle classification is based on committed current authority/state, never command invocation or global history alone."
    given:
      - "A fixture can represent no prior closeout, a prior successful closeout, and a fully reconciled current closeout."
      - "The exact host artifact and applicable gate set are known."
    when: "The closeout command runs in each state."
    then:
      - "A first valid transaction that commits current authority/state is one committed cycle."
      - "A later valid transaction that commits at least one new current gate receipt or equivalent current-state transition for the exact artifact and gate set is one new committed cycle."
      - "A retry with no new receipt and no current-state transition is not a new cycle and finishes as NOOP."
    verification: "A three-state integration fixture asserts transaction status and before/after receipt, report, s01, audit, and protocol-event counts."
  - id: "AC-RCR-02"
    traces_to: ["RCR-02", "RCR-05", "KPI-RCR-002", "KPI-RCR-005", "OQ-RCR-002", "DRV-SA-RC-002", "DRV-TA-RC-002"]
    scenario: "Current-cycle success is auditable despite historical closeout evidence"
    criterion: "Each committed cycle appends exactly one attributable protocol event while the coarse compatibility marker remains deduplicated."
    given:
      - "The report already contains historical CLOSEOUT_BUNDLE_APPROVED evidence and may contain an older closeout protocol event."
      - "A new closeout cycle commits for the exact current host and applicable gate set."
    when: "The transaction completes successfully."
    then:
      - "Exactly one new protocol event is appended for the current committed cycle."
      - "The event can be deterministically correlated with the current transaction and applicable gate set using the existing event model."
      - "The CLOSEOUT_BUNDLE_APPROVED audit marker remains present exactly once for compatibility."
      - "No historical event or marker is replaced, reordered, or backfilled."
    verification: "Compare ordered audit_events and protocol_events before and after a second committed cycle and correlate the appended event with the transaction output."
  - id: "AC-RCR-03"
    traces_to: ["RCR-01", "RCR-03", "KPI-RCR-001", "KPI-RCR-004", "OQ-RCR-003", "DRV-SA-RC-001", "DRV-SA-RC-003", "DRV-TA-RC-001"]
    scenario: "Successful closeout produces one authoritative current state"
    criterion: "The report and s01 protocol mirror agree that all selected terminal gates are complete and expose only the canonical close transition."
    given:
      - "Every applicable terminal gate has a valid current receipt and successful closeout commits."
      - "Current-state fields include literal, prose, or alternate-format approval instructions from a prior cycle."
    when: "Post-commit reconciliation finishes."
    then:
      - "Zero selected terminal gate remains represented as pending in blockers or required_actions."
      - "required_actions contains exactly wfc work-item close --work-item closeout-bundle-repeat-cycle-reconciliation."
      - "handoff_target equals protocol-close."
      - "The report and s01 Work Item Protocol block match for blockers, required actions, handoff, and audit events; protocol-event history remains canonical in the report."
    verification: "Run the repeated-cycle fixture 20 times; parse both mutable surfaces after each commit and assert zero mismatches plus zero satisfied-approval prompts."
  - id: "AC-RCR-04"
    traces_to: ["RCR-04", "KPI-RCR-003", "OQ-RCR-001", "OQ-RCR-002", "DRV-TA-RC-002"]
    scenario: "An unchanged closeout retry is byte-stable"
    criterion: "Retrying a fully reconciled current cycle performs zero persistent mutation."
    given:
      - "All current receipts exist and AC-RCR-02..03 state has already committed."
      - "Byte snapshots exist for receipts, report, s01, audit markers, protocol events, and transaction residue."
    when: "The identical closeout command is retried without an artifact, gate, reviewer, or state change."
    then:
      - "The transaction status is NOOP."
      - "Zero receipt, audit event, protocol event, report field, s01 block, journal, lock, or stage file changes."
    verification: "Compare file digests and normalized transaction output before and after two unchanged retries."
  - id: "AC-RCR-05"
    traces_to: ["RCR-01", "RCR-05", "KPI-RCR-001", "KPI-RCR-005", "OQ-RCR-003", "DRV-SA-RC-003"]
    scenario: "Semantic cleanup preserves immutable history"
    criterion: "Cleanup recognizes equivalent pending-approval meanings only in mutable current-state fields and never rewrites historical evidence."
    given:
      - "Fixtures contain literal bundle commands, individual gate commands, natural-language pending instructions, and alternate whitespace/formatting."
      - "Historical notes, signed receipt files, prior protocol-event entries, and unrelated archived artifacts have recorded digests."
    when: "A successful current closeout reconciles state."
    then:
      - "Every satisfied terminal-approval variant is absent from current blockers and required_actions."
      - "Historical note content, existing receipt bytes, and prior protocol-event entries preserve their order and digests."
      - "Only the new current event and canonical current-state projection are added or changed."
    verification: "Run a semantic-variant matrix and compare immutable-file digests plus ordered event prefixes."
  - id: "AC-RCR-06"
    traces_to: ["RCR-05", "KPI-RCR-004", "KPI-RCR-005", "DRV-SA-RC-004", "DRV-TA-RC-003"]
    scenario: "Receipt, event, report, or mirror failure is atomic"
    criterion: "Every supported failure boundary leaves no partial current-cycle authority, event, or derived-state mutation."
    given:
      - "A closeout plan contains the exact applicable gates and configured reviewers."
      - "Failures are injected before and during receipt commit, event append, report persistence, and s01 synchronization."
    when: "The closeout transaction fails or recovery runs."
    then:
      - "No partial new receipt, protocol event, audit marker, report mutation, or s01 mutation remains visible."
      - "Retry is deterministic and every applicable gate keeps its configured reviewer and independent receipt."
      - "No journal, lock, or stage residue survives a completed rollback/recovery."
    verification: "Extend the existing transaction failure matrix and compare byte-level before/after state for every supported failure point."
  - id: "AC-RCR-07"
    traces_to: ["RCR-05", "KPI-RCR-005", "DRV-TA-RC-004", "AG-07", "AG-08", "AG-09", "AG-11"]
    scenario: "Existing protocol behavior remains compatible"
    criterion: "The correction preserves first-cycle, legacy, adaptive, readiness, receipt-v1, authority, and historical-read behavior."
    given:
      - "Existing fixtures and signed-evidence readers are unchanged except for explicit new repeat-cycle cases."
    when: "The full affected regression suite runs."
    then:
      - "Maintenance, product, legacy mandatory-DoD, adaptive declared-gate, and readiness bundle selection remain exact."
      - "Receipt-v1 signature/digest verification and reviewer attribution remain green."
      - "The public CLI and error behavior remain backward compatible."
    verification: "Run existing protocol, gate-review, trusted-receipt, compatibility, and workflow validator suites without weakening assertions."
  - id: "AC-RCR-08"
    traces_to: ["RCR-06", "KPI-RCR-006", "F-AG11-001", "AG-01", "AG-13"]
    scenario: "One corrected candidate re-establishes parent CR-008 authority"
    criterion: "F-AG11-001 closes only after the corrected child and one exact local/hosted v2.6.2 candidate pass the full parent evidence chain."
    given:
      - "AC-RCR-01..07 and child Technical Verification/DoD have passed."
      - "A new v2.6.2 candidate is built from the corrected source."
    when: "Local, packaged, hosted, rollback, and parent re-verification execute."
    then:
      - "One full candidate SHA-256 binds local and hosted results with zero failed or skipped required jobs."
      - "Parent AG-01..AG-13 achieve 13/13 PASS for that exact candidate."
      - "Historical source 38bb0d178aa994e2a7c6e841b58b3e6b4263c56d, run 34322150024, candidate 2a5ae7015a205bfe6f1b54abfbc551da95a65e2db001edc451f48ba558d363e5, and terminal receipts remain historical pre-finding evidence."
      - "QC repeats Technical Verification and DoD; DevOps/QC repeat Release; PO repeats Business Acceptance before close, release, or branch finalization."
    verification: "Check source SHA, run ID, candidate digest, AG coverage, new gate-receipt digests/reviewers/timestamps, rollback evidence, and F-AG11-001 disposition."
edge_cases:
  - id: "EDGE-RCR-01"
    case: "A historical coarse audit marker exists but no historical closeout protocol event exists."
    expected: "Append one event for the new committed cycle without inventing or backfilling an event for the old cycle."
  - id: "EDGE-RCR-02"
    case: "A historical marker and an older attributable event both exist."
    expected: "Append exactly one later-cycle event and keep the coarse marker deduplicated."
  - id: "EDGE-RCR-03"
    case: "Current pending instructions use prose, case variation, extra whitespace, or individual gate wording."
    expected: "Remove every satisfied terminal-approval meaning from mutable fields and leave the exact close action."
  - id: "EDGE-RCR-04"
    case: "Report and s01 start with different stale pending forms."
    expected: "A successful transaction makes their mutable protocol projections semantically identical."
  - id: "EDGE-RCR-05"
    case: "The host artifact or applicable gate set changes after the prior cycle."
    expected: "Treat a successfully committed current receipt/state transition as a new cycle; never reuse stale receipt authority."
  - id: "EDGE-RCR-06"
    case: "A fully reconciled cycle is retried concurrently or after recovery with no current change."
    expected: "At most one committed cycle event exists and all completed retries are NOOP with no residue."
out_of_scope:
  - "Legacy terminal-gate selection behavior already owned by closeout-bundle-legacy-dod-compatibility"
  - "Generic lifecycle reopening or a new VERIFIED-to-s07 transition"
  - "Receipt-v2, multi-reviewer receipt schema, signer session, passphrase, or trusted-root changes"
  - "New public commands, public flags, telemetry payloads, or configuration surfaces"
  - "General-purpose prose classification outside closeout current-state reconciliation"
  - "npm publication, GitHub tag/release creation, merge, install, cleanup, or branch finalization"
done_when:
  - "AC-RCR-01..08 have PASS evidence bound to corrected source and, where required, one exact hosted candidate."
  - "The repeated-cycle regression fails before implementation for F-AG11-001 and passes after the smallest correct change."
  - "A successful second committed cycle adds one protocol event, reconciles both mutable surfaces, and preserves immutable history."
  - "Twenty repeated executions produce zero report/s01 current-state mismatches."
  - "Two unchanged retries are NOOP and byte-identical across every persisted surface."
  - "Atomicity, compatibility, static, security, package, workflow, and UTF-8 checks pass or have explicit residual-risk evidence."
  - "Parent AG-01..AG-13 pass 13/13 on one corrected exact candidate before new terminal decisions."
behavioral_invariants:
  - "Committed authority/state transition, not invocation or global history, defines a new cycle."
  - "One committed cycle produces one attributable protocol event; one unchanged retry produces none."
  - "CLOSEOUT_BUNDLE_APPROVED remains a coarse deduplicated compatibility marker."
  - "The report and s01 protocol mirror are mutable current state; historical evidence is append-only or immutable."
  - "One bundled interaction never collapses independent gate receipts or reviewer authority."
  - "No partial authority or derived state is visible after a failed transaction."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
checks:
  - id: "GOV-RCR-01"
    check: "Intent, scope, non-goals, and governance context are clear"
    status: PASS
    evidence: "s01-s03 and the Requirement Baseline lock repeat-cycle reconciliation while excluding contract, lifecycle, and prior-defect redesign."
  - id: "GOV-RCR-02"
    check: "Acceptance criteria are measurable and verification-ready"
    status: PASS
    evidence: "AC-RCR-01..08 each define setup, action, exact outcomes, and a concrete verify path."
  - id: "GOV-RCR-03"
    check: "Required reviewer coverage is explicit"
    status: PASS
    evidence: "BA owns Spec; BA/QC own DoR; Developer owns Approach/Task Plan; QC owns DoD; DevOps/QC own Release; PO owns Business Acceptance."
  - id: "GOV-RCR-04"
    check: "Brownfield compatibility assumptions are recorded"
    status: PASS
    evidence: "The Existing System Baseline covers first-cycle, legacy, adaptive, readiness, receipt-v1, historical-read, and public CLI compatibility."
  - id: "GOV-RCR-05"
    check: "Release impact and rollback expectations are identified"
    status: PASS
    evidence: "AC-RCR-08 requires one corrected exact candidate, full parent re-verification, repeated terminal gates, and guarded v2.6.1 rollback."
  - id: "GOV-RCR-06"
    check: "Open questions and high risks have a resolution or owner"
    status: PASS
    evidence: "OQ-RCR-001..003 are explicitly approved; R-S04-RC-001..004 have mitigations, contingencies, and assigned owners."
  - id: "GOV-RCR-07"
    check: "Human gates are not inferred from readiness or audit evidence"
    status: PASS
    evidence: "The user explicitly approved Spec as BA and DoR as BA/QC; gate_reviews records the human decision while trusted receipts remain separate and pending."
  - id: "GOV-RCR-08"
    check: "No governance exception is required"
    status: PASS
    evidence: "The proposed criteria preserve all strict controls and open no larger boundary."
blocking_items:
  - "BA must seal the trusted Spec receipt against this finalized host artifact."
  - "QC must seal the trusted DoR receipt after the recorded joint BA/QC approval."
owner: "ba/qc"
next_action: "Seal independent digest-bound Spec and DoR receipts before s05."
```

## Definition of Ready
```yaml
work_item_slug: "closeout-bundle-repeat-cycle-reconciliation"
status: READY
gate_status: APPROVED_PENDING_RECEIPTS
checks:
  restated_request_clear: PASS
  business_goal_clear: PASS
  scope_defined: PASS
  open_questions_non_blocking: PASS
  acceptance_criteria_testable: PASS
  dependencies_known: PASS
  verification_direction_present: PASS
blocking_gaps: []
accepted_assumptions:
  - "The correction can remain inside existing closeout protocol and integration-test boundaries."
  - "The current protocol-event shape can carry attributable cycle evidence without a public schema change; s05 must validate the internal mechanism."
  - "The mutable current-state pair remains the report plus synchronized s01 Work Item Protocol block."
  - "The public closeout and work-item close commands remain unchanged."
residual_risks:
  - "s05 still must compare at least two internal cycle-identity/reconciliation options and select the smallest correct one."
  - "Failure-injection support for newly touched persistence boundaries must be confirmed before s06 closes."
  - "A corrected exact hosted candidate and parent terminal evidence cannot exist before s07/s08."
next_action: "BA seals the Spec receipt and QC seals the DoR receipt; verify both with digest_match=true before s05."
```

## Human Gate Proposal
```yaml
decisions:
  - gate: "spec"
    status: "HUMAN_APPROVED_PENDING_RECEIPT"
    reviewer_roles: ["ba"]
    receipt_sealer: "ba"
    decided_by: ["ba"]
    decided_at: "2026-09-10T03:09:26Z"
  - gate: "contract"
    status: "NOT_APPLICABLE"
    reviewer_roles: []
    reason: "No public CLI, event, data, UX, receipt, or authority contract changes."
  - gate: "dor"
    status: "HUMAN_APPROVED_PENDING_RECEIPT"
    reviewer_roles: ["ba", "qc"]
    receipt_sealer: "qc"
    decided_by: ["ba", "qc"]
    decided_at: "2026-09-10T03:09:26Z"
receipt_model_note: >-
  The receipt schema stores one reviewed_by identity. Joint BA/QC DoR provenance remains in
  gate_reviews; QC seals the cryptographic DoR receipt only after both human roles approve.
```

## Audit
```yaml
step: "s04 Acceptance + DoR"
status: PASS
checks:
  - criterion: "Every acceptance criterion is deterministic and evidence-backed"
    result: PASS
    evidence: "AC-RCR-01..08 each define given, when, then, and verification fields."
  - criterion: "Cycle states and event semantics are distinguishable"
    result: PASS
    evidence: "AC-RCR-01 separates first, later committed, and unchanged retry states; AC-RCR-02 specifies exact event and marker counts."
  - criterion: "Mutable state and immutable history boundaries are explicit"
    result: PASS
    evidence: "AC-RCR-03 and AC-RCR-05 name the report/s01 mutable projection and preserved historical evidence."
  - criterion: "Atomicity, compatibility, reviewer authority, rollback, and release are covered"
    result: PASS
    evidence: "AC-RCR-06..08 and GOV-RCR-03..05 cover all strict-profile concerns."
  - criterion: "No unresolved input or governance conflict blocks review"
    result: PASS
    evidence: "s03 is READY/PASS, all OQ decisions are recorded, and blocking_gaps/open governance questions are empty."
  - criterion: "Reviewer and s05 entry conditions are exact"
    result: PASS
    evidence: "BA Spec and BA/QC DoR approvals are recorded; independent digest-matched receipts remain mandatory before s05."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one bounded acceptance and readiness authoring pass."
gaps:
  - "Trusted Spec and DoR receipt sealing is pending."
risk_level: HIGH
next_action: "Stop before s05 until BA Spec and QC-sealed DoR receipts verify against this unchanged artifact."
```

## Traceability
```yaml
upstream:
  - "closeout-bundle-repeat-cycle-reconciliation.s01.restate.md"
  - "closeout-bundle-repeat-cycle-reconciliation.s02.business-goal.md"
  - "closeout-bundle-repeat-cycle-reconciliation.s03.open-questions.md"
decision_to_acceptance:
  OQ-RCR-001: ["AC-RCR-01", "AC-RCR-04"]
  OQ-RCR-002: ["AC-RCR-02", "AC-RCR-04", "AC-RCR-05"]
  OQ-RCR-003: ["AC-RCR-03", "AC-RCR-05"]
verification_targets:
  - "packages/workflow-bundle/test/work-item-protocol.test.js repeat-cycle regression and failure matrix"
  - "packages/workflow-bundle test, validator, package, and runtime parity suites"
  - "One corrected local and hosted v2.6.2 candidate"
  - "Parent CR-008 AG-01..AG-13 and new terminal receipts"
outputs:
  - "AC-RCR-01..08"
  - "EDGE-RCR-01..06"
  - "GOV-RCR-01..08"
  - "Human-approved Spec and DoR pending independent trusted receipts"
next_step: "s05 Technical Approach after trusted Spec and DoR receipts verify"
```

## Handoff
- Mandatory criteria: exact cycle classification, one current-cycle protocol event, semantic state reconciliation, byte-stable retry, immutable history, atomicity, compatibility, and parent exact-candidate re-verification.
- Edge cases: historical marker with or without older event, prose/format variants, divergent mutable surfaces, changed host/gate set, and concurrent/recovery retry.
- Gate state: Contract and Foundation are `NOT_APPLICABLE`; Spec and DoR are `HUMAN_APPROVED_PENDING_RECEIPT`.
- Condition for step 5: BA seals Spec, QC seals DoR after the recorded joint review, and both trusted receipts have `digest_match=true` against this unchanged s04 artifact.
