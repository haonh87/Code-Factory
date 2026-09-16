---
artifact_id: "closeout-bundle-legacy-dod-compatibility.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
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
  - "sa"
  - "ta"
  - "developer"
  - "qc"
  - "devops"
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
  spec:
    - "ba"
  contract: []
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release:
    - "devops"
    - "qc"
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-09-03T08:06:40Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-09-03T08:06:40Z"
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
  - "closeout-bundle-legacy-dod-compatibility.s01.restate.md"
  - "closeout-bundle-legacy-dod-compatibility.s02.business-goal.md"
  - "closeout-bundle-legacy-dod-compatibility.s03.open-questions.md"
linked_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../changes/CR-008/spec-delta/srs.delta.md"
  - "../../packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "../../packages/workflow-bundle/test/work-item-protocol.test.js"
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> The linked defect is ready for BA/QC review. The proposed Spec defines exact legacy gate sets,
> closeout-only atomicity, adaptive compatibility, candidate identity, and a guarded v2.6.1
> rollback. Contract is not applicable because the correction restores the already approved AG-08 behavior.

## Step Contract
```yaml
step: "s04 Acceptance + DoR"
goal: >-
  Produce a measurable defect Spec and a reviewable DoR decision that lock what the legacy
  closeout must do, what evidence must exist, and which boundaries must not change.
value: >-
  Give Developer and QC a precise behavioral target for a failing-first implementation cycle while
  preserving human authority, compatibility, rollback safety, and exact-candidate release evidence.
scope_in:
  - "Exact legacy maintenance and product-release terminal gate sets"
  - "Successful closeout receipt and derived-state consistency"
  - "Closeout transaction failure atomicity and retry safety"
  - "Regression protection for adaptive_v1 and existing readiness bundles"
  - "Corrected v2.6.2 candidate and guarded v2.6.1 rollback"
scope_out:
  - "A new public CLI or receipt contract"
  - "General workflow reopening"
  - "Work-item approval atomicity from OBS-CLD-001"
  - "Signer, passphrase, schema, telemetry, or unrelated routing changes"
  - "Implementation, release execution, tagging, merge, or cleanup"
inputs_required:
  - "s01 clarified defect and CLD draft criteria"
  - "s02 business outcomes, metrics, and invariants"
  - "s03 READY input report and OQ-CLD-001..004 dispositions"
  - "Parent CR-008 AG-07, AG-08, AG-11, AG-13 and F-AG08-001"
  - "Current legacy derivation, finalized-step default, and adaptive-only fixture evidence"
outputs_required:
  - "Proposed requirement and contract baselines"
  - "Existing System Baseline for brownfield delivery"
  - "Measurable acceptance criteria, edge cases, non-goals, and invariants"
  - "Strict governance checklist result"
  - "Definition of Ready assessment and human gate proposal"
done_when:
  - "Every criterion has deterministic setup, action, expected result, and verify evidence"
  - "Maintenance and product-release legacy cases differ only by configured optional gates"
  - "Failure atomicity is explicitly limited to the closeout bundle transaction"
  - "Adaptive, readiness, receipt-v1, and rollback compatibility are protected"
  - "Reviewer coverage, release impact, and rollback expectations are explicit"
  - "The artifact is ready for independent BA Spec and BA/QC DoR review"
constraints:
  hard_constraints:
    - "Legacy technical closeout always includes DoD"
    - "Every selected terminal gate retains its configured reviewer authority and independent receipt"
    - "No failed closeout attempt may expose a partial new authority state"
    - "Changed evidence invalidates old terminal receipts and requires reapproval"
    - "The implementation path remains closed until trusted Spec, DoR, Approach, and Task Plan receipts exist"
  soft_constraints:
    - "Prefer the smallest correction within existing gate derivation and transaction boundaries"
    - "Reuse existing test harnesses and receipt-v1 format"
  prohibited_actions:
    - "Treat a draft or audit PASS as human gate approval"
    - "Repair the parent by adding an approval_gates.dod key that hides the compatibility failure"
    - "Use global v2.6.1 command output as corrected-candidate evidence"
    - "Expand into OBS-CLD-001 without separate approval"
  compliance_checks:
    - "Strict Acceptance + DoR checklist is complete"
    - "All eight acceptance criteria trace to CLD, AG, driver, and verification evidence"
    - "Contract and Foundation applicability are explicit"
    - "No governance exception or waiver is required"
risks:
  - id: "R-S04-001"
    description: "A fix may add DoD but still persist a partial or contradictory closeout state."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "AC-CLD-03 and AC-CLD-04 require full state equality and before/after failure snapshots."
    contingency: "QC rejects Technical Verification and keeps F-AG08-001 open."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S04-002"
    description: "A legacy correction may regress adaptive closeout or readiness bundling."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "AC-CLD-05 requires both existing adaptive fixture sets and legacy-specific regression cases."
    contingency: "Revert the candidate delta and retain individual gate commands."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S04-003"
    description: "Rollback to v2.6.1 could re-enable the known defective bundle."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "AC-CLD-07 requires a rollback guard that disables bundled closeout and uses individual terminal gates."
    contingency: "Block closeout on v2.6.1 until each required gate is sealed and digest-verified independently."
    owner: "devops/qc"
    status: MONITORING
  - id: "R-S04-004"
    description: "Human review could approve an artifact that later changes before receipt sealing."
    likelihood: LOW
    impact: HIGH
    severity: MEDIUM
    mitigation: "Trusted receipts bind to the finalized host artifact digest and status checks require digest_match=true."
    contingency: "Repeat review and reseal after any artifact change."
    owner: "ba/qc"
    status: MONITORING
timebox:
  target_duration: "One acceptance and readiness authoring pass"
  deadline: "Before s05 Technical Approach"
  escalation_rule: "Return to s03 if a reviewer disputes gate authority, rollback safety, or the closeout-only scope."
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "changes/CR-008/spec-delta/srs.delta.md"
approved_spec_digests:
  - ref: "changes/CR-008/spec-delta/srs.delta.md"
    sha256: "01667dd97faff3861534dc0d400ccfff51283de8305d360d69e0982abf1295eb"
authoritative_baseline_refs:
  - "../../changes/CR-008/spec-delta/srs.delta.md#REQ-AG-007"
  - "../../changes/CR-008/spec-delta/srs.delta.md#REQ-AG-008"
  - "../../changes/CR-008/spec-delta/srs.delta.md#REQ-AG-009"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md#Technical-Verification"
decision_notes:
  - "This child Spec restores AG-08 behavior; it does not create a new product capability."
  - "CLD-04 applies only to the closeout bundle transaction; OBS-CLD-001 remains outside scope."
  - "Human BA approved the Spec at 2026-09-03T08:06:40Z; trusted receipt sealing remains pending."
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
event_contract_refs: []
data_contract_refs: []
ux_contract_refs: []
notes:
  - "The public approve-closeout-bundle action and receipt-v1 shape are unchanged."
  - "The correction restores the already approved mandatory-DoD contract; no separate Contract gate is needed."
```

## Existing System Baseline
```yaml
baseline_date: "2026-09-03"
current_behavior_refs:
  - id: "BASE-CLD-001"
    behavior: "Legacy closeout derives terminal gates by filtering only keys explicitly equal to required."
    evidence: "packages/workflow-bundle/scripts/workflow-gate-review.js:265-286"
  - id: "BASE-CLD-002"
    behavior: "The legacy finalized-step map always requires DoD at s08."
    evidence: "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js:332-336"
  - id: "BASE-CLD-003"
    behavior: "Existing maintenance and product closeout integration fixtures create adaptive_v1 reports with explicit gate arrays."
    evidence: "packages/workflow-bundle/test/work-item-protocol.test.js:305-355,635-703"
  - id: "BASE-CLD-004"
    behavior: "The observed CR-008 legacy closeout sealed Release and Business Acceptance while DoD remained missing."
    evidence: "F-AG08-001 and CLOSEOUT_BUNDLE_APPROVED audit evidence in the parent work item"
impacted_surfaces:
  - "Legacy closeout gate derivation"
  - "Closeout transaction preflight/staging and derived-state reconciliation"
  - "Integration fixtures for legacy and adaptive artifact shapes"
  - "v2.6.2 candidate verification and parent CR-008 terminal evidence"
compatibility_constraints:
  - "Adaptive_v1 gate-array behavior remains unchanged."
  - "Readiness bundle selection remains unchanged."
  - "Receipt schema v1, signer semantics, and reviewer identities remain unchanged."
  - "Supported legacy artifacts remain readable without rewriting signed history."
rollback_constraints:
  - "v2.6.1 remains the immutable runtime rollback artifact."
  - "Bundled closeout is disabled after rollback; DoD, Release, and Business Acceptance are sealed individually as applicable."
  - "Historical CR-008 receipts remain audit-only when digest_match=false."
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: "AC-CLD-01"
    traces_to: ["CLD-01", "DRV-SA-CL-001", "DRV-TA-CL-001", "AG-08"]
    scenario: "Legacy maintenance missing the DoD applicability key"
    criterion: "A supported legacy maintenance closeout with no DoD key selects exactly mandatory DoD."
    given:
      - "The protocol report is legacy rather than artifact_shape=adaptive_v1."
      - "The finalized s08 host omits approval_gates.dod and has no optional terminal gate required."
      - "QC DoD reviewer evidence is present."
    when: "approve-closeout-bundle derives its closeout plan."
    then:
      - "The selected gate list is exactly [dod]."
      - "No Release or Business Acceptance receipt is staged."
      - "The DoD reviewer remains QC."
    verification: "A failing-first integration fixture asserts exact selected-gate and receipt sets."
  - id: "AC-CLD-02"
    traces_to: ["CLD-02", "DRV-SA-CL-001", "DRV-TA-CL-004", "AG-08"]
    scenario: "Legacy product release missing the DoD applicability key"
    criterion: "A supported legacy product closeout selects DoD plus exactly the configured Release and Business Acceptance gates."
    given:
      - "The protocol report is legacy."
      - "The finalized s08 host omits approval_gates.dod and explicitly requires Release and Business Acceptance."
      - "QC, DevOps, and PO reviewer evidence is present for their respective terminal gates."
    when: "approve-closeout-bundle derives its closeout plan."
    then:
      - "The selected gate list is exactly [dod, release, business_acceptance] in canonical order."
      - "Every selected gate retains its configured reviewer authority."
      - "No terminal gate is omitted or added."
    verification: "A legacy product-release integration fixture compares the exact ordered gate and reviewer maps."
  - id: "AC-CLD-03"
    traces_to: ["CLD-03", "DRV-SA-CL-002", "DRV-TA-CL-002", "AG-07", "AG-11"]
    scenario: "Successful legacy closeout commits one complete decision"
    criterion: "One successful closeout interaction commits one independent receipt per selected gate and one consistent derived state."
    given:
      - "All selected gate hosts, reviewers, and candidate evidence pass preflight."
    when: "The user approves the closeout bundle once."
    then:
      - "Exactly one valid independent trusted receipt exists for every selected gate."
      - "The report, s01 protocol block, blockers, required actions, and audit event agree with the complete gate set."
      - "The interaction count is one and the receipt count equals the selected-gate count."
    verification: "Inspect receipts plus reconciled artifacts and assert exact state equality after COMMITTED."
  - id: "AC-CLD-04"
    traces_to: ["CLD-04", "DRV-SA-CL-002", "DRV-TA-CL-002", "AG-07", "AG-11"]
    scenario: "Closeout preflight or persistence failure is atomic"
    criterion: "Every supported closeout failure boundary leaves zero new partial receipts and zero partial derived-state mutation."
    given:
      - "A failure is injected at each supported closeout preflight, staging, commit, or reconciliation boundary."
      - "Before-state snapshots exist for receipts, report, s01, blockers, actions, and journal."
    when: "approve-closeout-bundle fails."
    then:
      - "No new partial trusted receipt is visible."
      - "No derived source-of-truth state is partially changed."
      - "Recovery or retry is deterministic and preserves the complete planned gate set."
    verification: "Compare byte-level before/after snapshots for each injected closeout failure and retry case."
  - id: "AC-CLD-05"
    traces_to: ["CLD-01", "CLD-02", "DRV-TA-CL-004", "AG-08", "AG-09"]
    scenario: "Existing adaptive and readiness bundle behavior remains compatible"
    criterion: "The legacy correction preserves adaptive closeout, readiness bundling, receipt-v1 verification, and historical reads."
    given:
      - "Existing adaptive_v1 maintenance/product fixtures and readiness-bundle fixtures are unchanged."
    when: "The corrected test suite runs."
    then:
      - "Adaptive gate arrays still select exactly their declared applicable gates."
      - "Readiness bundles still preserve their existing four-gate compatibility behavior."
      - "Receipt-v1 verification and historical artifact reading remain green."
    verification: "Run the existing work-item protocol, trusted receipt, and compatibility suites without fixture weakening."
  - id: "AC-CLD-06"
    traces_to: ["CLD-03", "CLD-04", "AG-11"]
    scenario: "Repeated successful closeout is idempotent"
    criterion: "Retrying an unchanged successful legacy closeout preserves one complete, non-duplicative terminal state."
    given:
      - "A complete legacy closeout has already committed for one unchanged host artifact."
    when: "The same closeout decision is retried."
    then:
      - "The final receipt and derived-state set remains complete and non-duplicative."
      - "No stale terminal required action or contradictory pending claim reappears."
    verification: "Run the command twice against the same fixture and compare the normalized final state."
  - id: "AC-CLD-07"
    traces_to: ["CLD-05", "DRV-SA-CL-004", "DRV-TA-CL-003", "AG-09", "AG-13"]
    scenario: "Corrected candidate and rollback evidence are exact"
    criterion: "One exact v2.6.2 candidate passes local, packaged, hosted, and guarded v2.6.1 rollback verification."
    given:
      - "A new v2.6.2 package candidate is built after the correction."
    when: "Local, clean-install, update, rollback, and hosted Guardrails checks run."
    then:
      - "Every result is bound to the same full candidate SHA-256 and exposes the v2.6.2 action surface."
      - "The hosted required matrix passes with zero failed or skipped required jobs."
      - "Rollback to v2.6.1 disables bundled closeout and uses individual terminal gates."
      - "The global v2.6.1 installation is not accepted as corrected-candidate evidence."
    verification: "Record package digest, installed version/action surface, hosted run identity, and guarded rollback smoke."
  - id: "AC-CLD-08"
    traces_to: ["CLD-05", "OBJ-CL-003", "F-AG08-001"]
    scenario: "Parent CR-008 terminal authority is re-established"
    criterion: "CR-008 closes F-AG08-001 only after new QC, Release, and Business Acceptance evidence binds to the corrected candidate."
    given:
      - "AC-CLD-01..07 and child Technical Verification/DoD have passed."
      - "The corrected exact candidate evidence is frozen."
    when: "CR-008 terminal review resumes."
    then:
      - "Prior digest-mismatched Release and Business Acceptance receipts remain historical only."
      - "QC repeats Technical Verification and DoD against the corrected candidate."
      - "DevOps/QC repeat Release review and PO repeats Business Acceptance."
      - "F-AG08-001 closes only after the new terminal evidence is complete."
    verification: "Check new receipt digests, reviewers, timestamps, candidate SHA, parent s08 verdict, and protocol close eligibility."
edge_cases:
  - id: "EDGE-CLD-01"
    case: "The whole approval_gates block or only dod is missing from a legacy s08."
    expected: "Legacy mandatory DoD is still selected; optional gates follow explicit legacy applicability."
  - id: "EDGE-CLD-02"
    case: "Legacy s08 explicitly requires Release but not Business Acceptance, or vice versa."
    expected: "Select DoD plus exactly the optional gate marked required."
  - id: "EDGE-CLD-03"
    case: "A reviewer or gate-host timestamp is absent for one selected gate."
    expected: "Preflight fails before any trusted or derived state changes."
  - id: "EDGE-CLD-04"
    case: "The host artifact changes after review but before or after receipt creation."
    expected: "Digest mismatch prevents the receipt from authorizing the changed artifact."
  - id: "EDGE-CLD-05"
    case: "An explicit adaptive_v1 report has no applicable closeout gates."
    expected: "Preserve the existing error; do not apply the legacy mandatory-default path."
  - id: "EDGE-CLD-06"
    case: "v2.6.1 rollback is invoked during an open closeout."
    expected: "Disable the bundle and complete applicable gates individually before any close/cleanup decision."
out_of_scope:
  - "OBS-CLD-001 work-item approve preflight atomicity"
  - "VERIFIED-to-ACTIVE lifecycle reopening"
  - "Receipt-v2 or multi-reviewer receipt schema"
  - "Signer session, passphrase cache, or secret persistence"
  - "New telemetry, request routing, or applicability contract"
  - "npm publication or changes outside the existing GitHub release lane"
done_when:
  - "AC-CLD-01..08 each have passing evidence bound to the corrected source or candidate."
  - "The legacy missing-key regression fails before implementation and passes after the minimum correction."
  - "Existing adaptive, readiness, receipt, protocol, and compatibility suites pass unchanged."
  - "Text encoding, static checks, security heuristics, and package build checks pass."
  - "The parent remains on HOLD until new QC, Release, and Business Acceptance evidence exists."
behavioral_invariants:
  - "DoD is mandatory for every supported legacy technical closeout."
  - "One human bundle interaction creates one independent receipt per applicable gate."
  - "Failure exposes no partial authority or derived source-of-truth mutation."
  - "Legacy correction does not change adaptive_v1 gate applicability."
  - "Historical signed evidence is never silently rewritten or reused for a changed artifact."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
checks:
  - id: "GOV-CLD-01"
    check: "Intent, scope, non-goals, and governance context are clear"
    status: PASS
    evidence: "s01-s03 lock the closeout-only defect, authority invariants, and OBS-CLD-001 boundary."
  - id: "GOV-CLD-02"
    check: "Acceptance criteria are measurable and verification-ready"
    status: PASS
    evidence: "AC-CLD-01..08 specify setup, action, exact results, and evidence paths."
  - id: "GOV-CLD-03"
    check: "Role sign-offs cover every main boundary"
    status: PASS
    evidence: "BA owns Spec; BA/QC own DoR; Developer owns Approach/Task Plan; QC owns DoD; DevOps/QC own Release; PO owns Business Acceptance."
  - id: "GOV-CLD-04"
    check: "Brownfield compatibility assumptions are recorded"
    status: PASS
    evidence: "Existing System Baseline covers legacy/adaptive shapes, readiness behavior, receipt-v1, and historical artifacts."
  - id: "GOV-CLD-05"
    check: "Release and rollback impact are identified before implementation"
    status: PASS
    evidence: "AC-CLD-07 requires exact v2.6.2 evidence and disables bundled closeout on v2.6.1 rollback."
  - id: "GOV-CLD-06"
    check: "Human gates are not inferred from AI readiness assessment"
    status: PASS
    evidence: "The user explicitly approved Spec as BA and DoR as BA/QC; trusted receipts remain a separate required step."
  - id: "GOV-CLD-07"
    check: "No governance exception is required"
    status: PASS
    evidence: "No weaker guard or out-of-baseline behavior is accepted; adjacent scope requires separate approval."
blocking_items:
  - "Seal the BA Spec trusted receipt against this finalized artifact."
  - "Seal the QC DoR trusted receipt after the recorded joint BA/QC review."
owner: "ba/qc"
next_action: "Seal independent Spec and DoR receipts against the unchanged s04 artifact."
```

## Definition of Ready
```yaml
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
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
  - "The missing DoD key is a supported legacy compatibility shape."
  - "AG-08 is authoritative; the child restores rather than changes its behavior."
  - "v2.6.1 rollback uses individual terminal approvals because its bundled closeout is known defective."
residual_risks:
  - "The smallest implementation option is not selected until s05 option analysis."
  - "Exact corrected candidate and hosted evidence cannot exist before s07/s08."
  - "OBS-CLD-001 remains a separate follow-up and must not be lost after this defect."
next_action: "Seal the BA Spec receipt and QC DoR receipt before entering s05."
```

## Human Gate Proposal
```yaml
decisions:
  - gate: "spec"
    status: "HUMAN_APPROVED_PENDING_RECEIPT"
    reviewer_roles: ["ba"]
    receipt_sealer: "ba"
    decided_by: ["ba"]
    decided_at: "2026-09-03T08:06:40Z"
  - gate: "contract"
    status: "NOT_APPLICABLE"
    reviewer_roles: []
    reason: "No new public or integration contract; AG-08 behavior is restored."
  - gate: "dor"
    status: "HUMAN_APPROVED_PENDING_RECEIPT"
    reviewer_roles: ["ba", "qc"]
    receipt_sealer: "qc"
    decided_by: ["ba", "qc"]
    decided_at: "2026-09-03T08:06:40Z"
receipt_model_note: >-
  The receipt schema stores one reviewed_by identity. Joint BA/QC DoR provenance will remain in
  gate_reviews; QC seals the cryptographic DoR receipt after both human roles approve.
```

## Audit
```yaml
step: "s04 Acceptance + DoR"
status: PASS
checks:
  - criterion: "Every criterion is deterministic and evidence-backed"
    result: PASS
    evidence: "AC-CLD-01..08 each define given, when, then, and verify fields."
  - criterion: "Legacy maintenance and product-release applicability is exact"
    result: PASS
    evidence: "AC-CLD-01 selects DoD only; AC-CLD-02 selects DoD, Release, and Business Acceptance."
  - criterion: "Atomicity is scoped to the approved defect"
    result: PASS
    evidence: "AC-CLD-04 names approve-closeout-bundle boundaries; OBS-CLD-001 is excluded."
  - criterion: "Compatibility and rollback are protected"
    result: PASS
    evidence: "AC-CLD-05 and AC-CLD-07 cover adaptive/readiness/receipt compatibility and guarded v2.6.1 rollback."
  - criterion: "Reviewer and release coverage are explicit"
    result: PASS
    evidence: "Governance checks name every gate owner, candidate evidence, and terminal reapproval sequence."
  - criterion: "The artifact is ready for BA/QC review"
    result: PASS
    evidence: "DoR is READY with no blocking gaps, and the explicit BA/QC human decision is recorded."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one acceptance and readiness authoring pass."
gaps:
  - "Trusted Spec and DoR receipt sealing is pending."
risk_level: HIGH
next_action: "Stop before s05 until the BA Spec and QC DoR receipts are digest-matched."
```

## SDD Traceability
```yaml
requirement_refs: ["REQ-AG-007", "REQ-AG-008", "REQ-AG-009"]
acceptance_refs: ["AG-07", "AG-08", "AG-09", "AG-11", "AG-13", "AC-CLD-01", "AC-CLD-02", "AC-CLD-03", "AC-CLD-04", "AC-CLD-05", "AC-CLD-06", "AC-CLD-07", "AC-CLD-08"]
task_refs: ["CR-008/T8b"]
test_refs:
  - "legacy-maintenance-closeout"
  - "legacy-product-release-closeout"
  - "atomic-closeout-failure-matrix"
  - "idempotent-closeout-retry"
  - "adaptive-readiness-regression"
  - "exact-candidate-local-hosted"
```

## Traceability
```yaml
upstream:
  - "closeout-bundle-legacy-dod-compatibility.s01.restate.md"
  - "closeout-bundle-legacy-dod-compatibility.s02.business-goal.md"
  - "closeout-bundle-legacy-dod-compatibility.s03.open-questions.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
outputs:
  - "AC-CLD-01..08"
  - "EDGE-CLD-01..06"
  - "Strict governance checks GOV-CLD-01..07"
  - "Human-approved Spec and DoR pending trusted receipt sealing"
next_step: "s05 Technical Approach after trusted Spec and DoR receipts"
```

## Handoff
- Mandatory criteria: exact legacy gate sets, complete success state, zero partial closeout writes, compatibility, exact candidate, and parent reapproval.
- Edge cases: missing whole gate block, optional terminal permutations, missing reviewer evidence, digest drift, empty adaptive set, and guarded v2.6.1 rollback.
- Condition for step 5: the BA Spec and QC DoR trusted receipts must have `digest_match=true` against this unchanged artifact.
