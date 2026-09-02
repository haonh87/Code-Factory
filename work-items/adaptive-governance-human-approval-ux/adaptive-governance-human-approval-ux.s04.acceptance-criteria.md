---
artifact_id: "adaptive-governance-human-approval-ux.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "adaptive-governance-human-approval-ux"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CR-008"
change_status: approved
spec_delta_refs:
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CR-008/spec-delta/brd.delta.md"
  srs: "changes/CR-008/spec-delta/srs.delta.md"
spec_status: approved
planning_track: enterprise
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
  - "qc"
  - "devops"
review_mode: independent
verification_owner: "auditor"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
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
  spec_reviewed_at: "2026-08-28T14:23:15Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-08-28T14:23:15Z"
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-08-28T14:23:15Z"
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
  - "definition-of-ready-gate"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "adaptive-governance-human-approval-ux.s01.restate.md"
  - "adaptive-governance-human-approval-ux.s02.business-goal.md"
  - "adaptive-governance-human-approval-ux.s03.open-questions.md"
linked_artifacts:
  - "changes/CR-008/proposal.md"
  - "changes/CR-008/design.md"
  - "adaptive-governance-human-approval-ux.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Spec, Contract và DoR đã được human phê duyệt với đúng authority. Artifact đã được finalize;
> trusted receipts vẫn phải được seal trước khi router coi ba gate là PASS.

## Step Contract
```yaml
step: "s04 Acceptance + DoR"
goal: >-
  Khóa measurable acceptance criteria, public workflow behavior contract, brownfield baseline,
  strict-governance checks và readiness evidence cho CR-008 mà không chọn technical approach.
value: >-
  Cho BA, Developer và QC một baseline chung để review; ngăn implementation phải tự suy diễn lane,
  authority, compatibility, telemetry privacy hoặc tiêu chuẩn giảm interaction.
scope_in:
  - "Request-lane behavior and hard-escalation acceptance"
  - "Applicable role/gate and approval-bundle behavior contract"
  - "Compatibility, runtime parity, telemetry and approval-state invariants"
  - "Existing-system baseline, edge cases, governance checks and DoR evidence"
scope_out:
  - "Module ownership, internal schema design or transaction mechanism"
  - "Exact implementation sequence beyond trace to draft T0-T9"
  - "Production code, runtime update, release or migration execution"
inputs_required:
  - "s01 requirement and SA/TA driver outputs"
  - "s02 business goal and KPI candidates"
  - "s03 accepted OQ-AG-001..003 decisions"
  - "CR-008 BRD/SRS deltas and current brownfield source/runtime evidence"
outputs_required:
  - "Requirement and Contract baselines ready for human review"
  - "AG-01..AG-13 measurable acceptance criteria and edge cases"
  - "Existing System Baseline and behavioral invariants"
  - "Strict Governance Checks and Definition of Ready assessment"
  - "Spec Freeze recommendation with explicit pending human gates"
done_when:
  - "Every accepted business/architecture driver maps to measurable acceptance evidence"
  - "Public contract distinguishes lane classification, role/gate applicability and bundle semantics"
  - "Brownfield compatibility and rollback constraints are explicit"
  - "DoR checks have evidence and no unresolved discovery blocker"
  - "The note names the separate Spec, Contract and DoR human approvals still required"
constraints:
  hard_constraints:
    - "No applicable human-controlled gate may be omitted, inferred or self-approved"
    - "Hard-risk triggers always override a lower lane or normal preset"
    - "Failed approval bundles leave zero partial receipts and zero derived-state writes"
    - "Adaptive writes require supported runtime parity; historical signed receipts are never auto-rewritten"
    - "Telemetry is opt-in, local-only in CR-008 and allowlist-only"
  soft_constraints:
    - "Expose the smallest role/gate surface that remains correct for the request"
    - "Reason codes should be stable, concise and suitable for CLI plus machine validation"
  prohibited_actions:
    - "Choose implementation architecture or expand into signer-session caching"
    - "Treat authoring READY as human Spec, Contract or DoR approval"
    - "Modify unrelated CHANGE-005 or diagram-design-adapter WIP"
  compliance_checks:
    - "Strict checklist records reviewer coverage, compatibility, release impact and rollback"
    - "BA owns Spec; Developer owns Contract; BA/QC own DoR"
    - "Release remains DevOps/QC-controlled and Business Acceptance remains PO-controlled"
risks:
  - id: "RISK-S04-001"
    description: "Lane ambiguity causes either unsafe downgrade or unnecessary escalation."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Lock eight lane values, hard-trigger precedence and deterministic golden fixtures."
    contingency: "Fail closed to product_delivery and require a visible human override reason."
    owner: "ba/qc"
    status: OPEN
  - id: "RISK-S04-002"
    description: "Bundle UX hides independent authority or creates partial approval state."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Require complete decision summary, per-gate receipts and atomic failure evidence."
    contingency: "Disable bundle operation and retain individual gate approval commands."
    owner: "developer/qc"
    status: OPEN
  - id: "RISK-S04-003"
    description: "Installed runtime 2.3.2 cannot consume adaptive 2.6.x writes."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Make matching-minor runtime parity an activation and release blocker."
    contingency: "Keep adaptive writer disabled and continue legacy canonical-write."
    owner: "developer/devops"
    status: OPEN
timebox:
  target_duration: "One focused acceptance-authoring pass"
  deadline: "Before s05 Technical Approach"
  escalation_rule: "If reviewers dispute a criterion or contract field, return to s03 instead of selecting an approach."
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
approved_spec_digests:
  - ref: "changes/CR-008/spec-delta/brd.delta.md"
    sha256: "5fd82e8df53a79bfc8304f4d8863727b2b84f7c02ba9c3b1e475a41d29b7aab4"
  - ref: "changes/CR-008/spec-delta/srs.delta.md"
    sha256: "01667dd97faff3861534dc0d400ccfff51283de8305d360d69e0982abf1295eb"
requirement_scope:
  - "BR-AG-001..BR-AG-006"
  - "REQ-AG-001..REQ-AG-011"
decision_notes:
  - "OQ-AG-001..003 are accepted inputs."
  - "AG-01..AG-13 below are the measurable review baseline."
  - "BA approved the Spec at 2026-08-28T14:23:15Z; trusted receipt sealing remains pending."
```

## Contract Baseline
```yaml
status: APPROVED
api_contract_refs:
  - "changes/CR-008/spec-delta/srs.delta.md"
ux_contract_refs:
  - "adaptive-governance-human-approval-ux.s04.acceptance-criteria.md#Workflow Contract"
contract_surfaces:
  - "routing decision output"
  - "applicable role/gate decision output"
  - "ready-bundle and closeout-bundle behavior"
  - "legacy/adaptive reader and runtime activation behavior"
  - "telemetry schema and retention behavior"
notes:
  - "This is a public CLI/artifact behavior contract; Contract approval is required from Developer."
  - "Exact internal modules and persistence design remain for s05."
  - "Developer approved the Contract at 2026-08-28T14:23:15Z; trusted receipt sealing remains pending."
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "policies/codex/AGENTS.global.md requires the current s01-s08 and human-gate model"
  - "packages/workflow-bundle/scripts/materialize-work-item.js owns current admission/materialization behavior"
  - "packages/workflow-bundle/scripts/scaffold-workflow.js and workflow-step-definitions.js emit fixed workflow-note surfaces"
  - "packages/workflow-bundle/scripts/workflow-gate-review.js seals individual and Light ready-bundle receipts"
  - "packages/workflow-bundle/scripts/workflow-telemetry.js is opt-in and currently stores work_item_slug without retention cleanup"
  - "wfc status reports source bundle 2.6.1 and installed Codex runtime 2.3.2"
impacted_surfaces:
  - "Global policy, router skill and adaptive-planning documentation"
  - "Materialize, scaffold, governance validation and work-item protocol"
  - "Trusted gate review, activation and closeout commands"
  - "Telemetry call sites, CLI help and public EN/VI documentation"
  - "Canonical source plus Codex and Claude installed runtime payloads"
compatibility_constraints:
  - "New runtime dual-reads legacy and adaptive artifacts."
  - "Legacy support lasts 3 minor releases or 180 days after stable activation, whichever is longer."
  - "Old runtimes are not promised forward-read of adaptive artifacts."
  - "Supported harnesses must match the source minor before adaptive writes are enabled."
  - "Historical signed receipts remain readable/verifiable and are never auto-rewritten."
rollback_constraints:
  - "Adaptive routing/writers must be disableable without removing dual-read support."
  - "Individual gate commands remain the fallback if a bundle path is disabled."
  - "Rollback must preserve already valid receipts and reconcile all derived status surfaces."
```

## Workflow Contract
```yaml
contract_version: "adaptive-governance-v1"
request_lanes:
  non_delivery: ["qa", "translation", "summarization", "research", "documentation", "read_only_analysis"]
  delivery: ["maintenance", "product_delivery"]
routing_decision:
  required_fields:
    request_lane: "one value from request_lanes"
    workflow_required: "boolean"
    routing_reasons: "one or more stable reason codes"
    escalation_reasons: "zero or more stable hard-trigger reason codes"
  deterministic_rule: "Equivalent normalized inputs produce byte-equivalent normalized decisions."
  precedence: "Hard escalation overrides lane default, preset and agent inference."
applicability_decision:
  required_role_shape: "Each required role includes role plus one or more reason codes."
  required_gate_shape: "Each required gate includes gate, authorized reviewer roles and one or more reason codes."
  not_applicable_behavior: "Omitted or explicit not_applicable entries create zero pending actions."
approval_bundle:
  readiness: "One reviewed interaction may seal every applicable readiness gate as independent trusted receipts."
  closeout: "One reviewed interaction may seal only the applicable terminal gates as independent trusted receipts."
  summary_minimum: ["gate", "reviewer role", "artifact digest", "decision consequence"]
  failure_rule: "Any validation or write failure leaves zero new partial receipts and zero partial derived-state updates."
state_reconciliation:
  surfaces: ["trusted receipt", "step note", "work-item report", "protocol block", "blockers", "required actions"]
  invariant: "After success, no surface says the same decision is pending."
compatibility:
  reader: "dual-read legacy and adaptive"
  writer: "adaptive after activation; legacy writer retained as rollback path during the window"
  activation: "all supported harnesses match source minor and parity checks pass"
telemetry:
  default: "OFF"
  transport: "local-only; no automatic remote upload"
  identifier: "omit raw work_item_slug or use a per-install pseudonymous hash"
  raw_retention: "30 days maximum"
  aggregate_retention: "90 days maximum"
  payload_rule: "allowlist-only; no raw prompt, path, username, secret, signature, receipt body or free-form note"
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: "AG-01"
    criterion: "Non-delivery requests create no delivery workflow state unless a human explicitly overrides materialization."
    verification: "Run golden non-delivery fixtures and assert no artifact, protocol, change package or approval receipt appears in the filesystem diff."
    given: "A request is classified as qa, translation, summarization, research, documentation or read_only_analysis with no explicit materialization override."
    when: "Admission runs."
    then: "workflow_required=false and zero delivery artifact, protocol, change package or approval receipt is written."
    evidence: "Golden non-delivery fixtures plus filesystem before/after assertion."
    traces_to: ["BR-AG-001", "REQ-AG-001", "REQ-AG-002", "DRV-SA-001"]
  - id: "AG-02"
    criterion: "Low-risk maintenance requests omit PO, BA, SA, TA and DevOps actions unless a named trigger makes a role applicable."
    verification: "Run the maintenance golden fixture and compare the exact role, gate and reason-code set with the expected decision."
    given: "A low-risk maintenance request has no product, architecture, release or hard-risk trigger."
    when: "Roles and gates are derived."
    then: "No PO, BA, SA, TA or DevOps role/action is requested; every included role has a named trigger."
    evidence: "Maintenance golden fixture asserts exact applicable roles, gates and reasons."
    traces_to: ["BR-AG-002", "REQ-AG-003"]
  - id: "AG-03"
    criterion: "Equivalent normalized inputs produce identical lane, workflow, role, gate and reason-code decisions in 100% of repeated evaluations."
    verification: "Evaluate each golden-matrix input at least 20 times and compare its normalized serialized decision byte for byte."
    given: "The same normalized request and governance inputs are evaluated repeatedly."
    when: "Routing and applicability run at least 20 times."
    then: "100% of normalized request_lane, workflow_required, roles, gates and reason codes are identical."
    evidence: "Repeated golden-matrix comparison."
    traces_to: ["REQ-AG-001", "REQ-AG-003", "DRV-TA-001"]
  - id: "AG-04"
    criterion: "Every hard-risk trigger overrides a lower lane, normal preset and agent inference, with zero accepted unsafe downgrades."
    verification: "Execute the negative hard-trigger matrix and assert escalation plus rejection of every attempted downgrade."
    given: "A request contains a public contract, migration/backfill/cutover, security-sensitive, regulated, greenfield/foundation or release trigger."
    when: "A normal preset, lower lane or agent inference attempts to downgrade it."
    then: "The request escalates and 0 downgrade attempts are accepted."
    evidence: "Negative hard-trigger matrix."
    traces_to: ["REQ-AG-004", "DRV-SA-003", "DRV-TA-002"]
  - id: "AG-05"
    criterion: "A role or gate classified not applicable creates zero pending actions, blockers and required receipts on every derived state surface."
    verification: "Render representative not-applicable fixtures and compare the note, report, protocol, blockers and required actions."
    given: "A role or gate is not applicable to the routed request."
    when: "The note, report, protocol status and next action are rendered."
    then: "It produces 0 pending human actions, blockers or required receipts."
    evidence: "Cross-surface not_applicable fixtures."
    traces_to: ["REQ-AG-U02"]
  - id: "AG-06"
    criterion: "One accepted readiness bundle seals one independently verifiable trusted receipt for every applicable readiness gate."
    verification: "Run a successful bundle fixture and verify each receipt digest, reviewer, timestamp and decision independently."
    given: "A delivery item has multiple applicable readiness gates and valid reviewer authority."
    when: "The human accepts one complete readiness decision summary."
    then: "One interaction seals one independently verifiable receipt per applicable gate with reviewer and timestamp."
    evidence: "Bundle success fixture plus per-gate receipt verification."
    traces_to: ["BR-AG-003", "REQ-AG-005"]
  - id: "AG-07"
    criterion: "A bundle failure at any validation or persistence boundary leaves zero partial receipts and zero partial derived-state updates."
    verification: "Inject a failure at every write boundary and compare receipt plus derived-state digests before and after each attempt."
    given: "A readiness or closeout bundle fails validation or persistence at any injected boundary."
    when: "The operation exits."
    then: "There are 0 partial new receipts and 0 partial report/protocol/blocker/action updates."
    evidence: "Failure injection at every write boundary with before/after digest comparison."
    traces_to: ["REQ-AG-006", "DRV-TA-003"]
  - id: "AG-08"
    criterion: "Terminal gate applicability distinguishes maintenance closeout from product release without weakening configured release authority."
    verification: "Run maintenance and release closeout fixtures and assert their exact DoD, Release and Business Acceptance gate sets."
    given: "A maintenance or product/release item reaches technical closeout."
    when: "Applicable terminal gates are derived."
    then: "Maintenance requests DoD only unless triggered; release scope still requests DoD, Release and Business Acceptance as configured."
    evidence: "Maintenance and release closeout fixtures."
    traces_to: ["REQ-AG-003", "REQ-AG-005"]
  - id: "AG-09"
    criterion: "Supported new readers preserve full enforcement for 100% of representative legacy and adaptive artifacts throughout the compatibility window."
    verification: "Run the compatibility matrix across the supported window, including historical receipt verification and the deprecation path."
    given: "Legacy fixed-shape notes/receipts and adaptive notes exist during the accepted compatibility window."
    when: "Supported new readers validate, approve, transition and close representative fixtures."
    then: "100% of supported legacy/adaptive fixtures remain readable and required evidence is still enforced."
    evidence: "Compatibility matrix covering 3 minor releases or 180 days, historical receipt verification and deprecation path."
    traces_to: ["REQ-AG-007", "DRV-SA-005", "DRV-TA-004"]
  - id: "AG-10"
    criterion: "Telemetry is a complete no-op when disabled and, when enabled, is local, allowlisted, purgeable and bounded to 30/90-day raw/aggregate retention."
    verification: "Run disabled no-op, schema allowlist, retention, purge and secret-canary tests across materialize-to-close paths."
    given: "Telemetry is disabled or enabled for a representative workflow."
    when: "Materialize, approve, activate, verify and close paths execute."
    then: "Disabled mode writes 0 events/files; enabled mode contains only allowlisted fields, retains raw/aggregate data for at most 30/90 days and exposes a purge path."
    evidence: "Disabled no-op, schema allowlist, retention/purge and secret-canary tests."
    traces_to: ["REQ-AG-008", "DRV-TA-005"]
  - id: "AG-11"
    criterion: "After an approval succeeds, no persisted source or derived surface reports that same approval as pending."
    verification: "Run the approval-state reconciliation regression fixture and reload receipt, note, report, protocol, blockers and required actions."
    given: "A work-item, change or gate approval succeeds."
    when: "Receipt, note, report, protocol, blockers and required actions are reloaded."
    then: "0 persisted surface claims that the same approval remains pending."
    evidence: "CR-008-like approval-state reconciliation regression fixture."
    traces_to: ["REQ-AG-009", "DRV-TA-006"]
  - id: "AG-12"
    criterion: "After at least 20 adaptive runs, median intake-to-ACTIVE interactions improve by at least 50%, each authoring phase uses at most one bundle, and retries stay at or below 5%."
    verification: "Compare segmented T0 evidence with at least 20 controlled or telemetry-backed adaptive runs and calculate every threshold."
    given: "T0 records representative current interaction evidence before production behavior changes."
    when: "At least 20 representative adaptive runs complete."
    then: "Median intake-to-ACTIVE interactions improve by >=50%, readiness and closeout each use <=1 bundle, and approval retry rate is <=5%."
    evidence: "Segmented T0 versus adaptive telemetry/controlled-fixture report."
    traces_to: ["BR-AG-004", "KPI-AG-003", "KPI-AG-004", "KPI-AG-005", "KPI-AG-006"]
  - id: "AG-13"
    criterion: "Version-minor mismatch or failed runtime parity blocks adaptive activation and Release while preserving legacy write and dual-read rollback paths."
    verification: "Run version-skew, runtime parity and rollback smoke fixtures for every supported harness."
    given: "A supported installed harness version differs from the source bundle minor or parity check fails."
    when: "Adaptive writer activation or Release is requested."
    then: "Activation/Release is blocked while legacy canonical-write and dual-read rollback remain available."
    evidence: "Version-skew, runtime parity and rollback smoke fixtures."
    traces_to: ["REQ-AG-010", "DRV-TA-007", "OQ-AG-002"]
edge_cases:
  - "Ambiguous mixed-intent request fails closed to product_delivery and explains the escalation reason."
  - "Explicit human override from a non-delivery lane records actor, timestamp and reason before materialization."
  - "A hard trigger inside documentation or research overrides the non-delivery default."
  - "A bundle with mixed authorized reviewer roles rejects an absent or unauthorized role without partial writes."
  - "Stale digest, expired context, duplicate retry and crash-after-sign scenarios remain idempotent or roll back."
  - "A legacy scaffold without a report remains read-only only when project policy explicitly allows it."
  - "Telemetry slug containing sensitive business text is omitted or pseudonymized."
  - "CR-008 itself continues under current strict gates; adaptive rules apply only after verified release."
out_of_scope:
  - "AI self-approval or inferred human approval"
  - "Signer-session or passphrase caching"
  - "Automatic rewrite of historical notes or signed receipts"
  - "Remote telemetry exporter or centralized analytics service"
  - "Foundation/stack/runtime-platform redesign"
  - "Unrelated CHANGE-005 and diagram-design-adapter changes"
done_when:
  - "AG-01..AG-13 have passing evidence or an explicitly owned release blocker."
  - "Spec, Contract and DoR have valid human receipts before s05 gate progression is treated as passed."
  - "Approach and Task Plan later trace every criterion to implementation and verification."
behavioral_invariants:
  - "Applicability reduction never reduces authority for a gate that remains required."
  - "Interaction count and trusted-receipt count are separate measures."
  - "Hard escalation wins over lane default, preset and inference."
  - "Receipt truth and every derived status surface remain consistent."
  - "Privacy and compatibility failures block activation/release, not merely warn."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - check: "Reviewer coverage is specified per main boundary"
    status: PASS
    evidence: "BA owns Spec; Developer owns Contract; BA/QC own DoR; DevOps/QC own Release; PO owns Business Acceptance."
  - check: "Backward compatibility and migration assumptions are recorded"
    status: PASS
    evidence: "Existing System Baseline and AG-09/AG-13 lock dual-read, bounded legacy support, no receipt rewrite and runtime parity."
  - check: "Release impact and rollback expectations are identified"
    status: PASS
    evidence: "Public contract keeps Release required; rollback disables adaptive writer while retaining dual-read and individual approvals."
  - check: "Human authority and atomicity are protected"
    status: PASS
    evidence: "AG-04, AG-06, AG-07, AG-08 and behavioral invariants prohibit downgrade or partial authority."
  - check: "Privacy evidence is testable"
    status: PASS
    evidence: "AG-10 specifies opt-in no-op, allowlist, 30/90-day retention, purge and secret-canary evidence."
  - check: "A governance exception is required"
    status: PASS
    evidence: "No intentional deviation is accepted at s04; no exception or waiver is required."
blocking_items:
  - "Seal Spec trusted receipt with BA reviewer metadata"
  - "Seal Contract trusted receipt with Developer reviewer metadata"
  - "Seal DoR trusted receipt with the joint BA/QC review recorded; QC is the receipt sealer"
owner: "ba/qc"
next_action: "Seal the three independent trusted receipts from the finalized s04 artifact."
```

## Definition of Ready
```yaml
work_item_slug: "adaptive-governance-human-approval-ux"
status: READY
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
  - "No remote telemetry exporter is added by CR-008."
  - "The existing trusted signer remains the receipt authority; bundle changes interaction and atomic orchestration only."
residual_risks:
  - "Source 2.6.1 versus installed Codex runtime 2.3.2 remains an activation/release blocker."
  - "Opt-in telemetry may require controlled fixtures to supplement low real-run sample size."
  - "Cross-surface approval reconciliation needs failure-injection evidence before release."
next_action: >-
  Seal the DoR receipt from this finalized artifact. BA and QC review provenance is recorded in
  gate_reviews; QC is the single cryptographic receipt sealer supported by the current receipt shape.
```

## Human Gate Decisions
```yaml
decisions:
  - gate: "spec"
    status: "APPROVED_PENDING_RECEIPT"
    reviewed_by: ["ba"]
    reviewed_at: "2026-08-28T14:23:15Z"
  - gate: "contract"
    status: "APPROVED_PENDING_RECEIPT"
    reviewed_by: ["developer"]
    reviewed_at: "2026-08-28T14:23:15Z"
  - gate: "dor"
    status: "APPROVED_PENDING_RECEIPT"
    reviewed_by: ["ba", "qc"]
    receipt_sealer: "qc"
    reviewed_at: "2026-08-28T14:23:15Z"
decision_source: "User explicitly approved Spec as BA, Contract as Developer, and DoR as BA/QC."
receipt_model_note: >-
  The current trusted receipt stores one reviewed_by value per gate. Joint BA/QC review remains in
  gate_reviews while QC seals the DoR receipt; CR-008 must not lose this provenance in the target model.
```

## Spec Freeze
```yaml
status: READY
artifact_readiness: READY
gate_status: APPROVED_PENDING_RECEIPT
requirement_ids:
  - "BR-AG-001"
  - "BR-AG-002"
  - "BR-AG-003"
  - "BR-AG-004"
  - "BR-AG-005"
  - "BR-AG-006"
  - "REQ-AG-001"
  - "REQ-AG-002"
  - "REQ-AG-003"
  - "REQ-AG-004"
  - "REQ-AG-005"
  - "REQ-AG-006"
  - "REQ-AG-007"
  - "REQ-AG-008"
  - "REQ-AG-009"
  - "REQ-AG-010"
  - "REQ-AG-011"
accepted_assumptions:
  - "OQ-AG-001..003 decisions are binding inputs for the candidate spec."
blockers:
  - "Spec, Contract and DoR trusted receipts are not sealed yet."
```

## Audit
```yaml
step: "s04 Acceptance + DoR authoring"
status: PASS
checks:
  - criterion: "Every accepted business/architecture driver maps to measurable acceptance evidence"
    result: PASS
    evidence: "AG-01..AG-13 trace to BR/REQ, drivers, KPIs and owned test evidence."
  - criterion: "Public behavior contract is explicit without choosing internal architecture"
    result: PASS
    evidence: "Workflow Contract locks inputs/outputs/invariants while deferring modules and persistence to s05."
  - criterion: "Brownfield compatibility and rollback are explicit"
    result: PASS
    evidence: "Existing System Baseline, AG-09 and AG-13 cover reader, writer, version skew and rollback."
  - criterion: "DoR evidence has no discovery blocker"
    result: PASS
    evidence: "Definition of Ready has seven PASS checks and no blocking gap."
  - criterion: "Separate human approvals remain visible"
    result: PASS
    evidence: "Human Gate Decisions and frontmatter record BA, Developer and BA/QC approval separately; receipts remain pending."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one focused acceptance-authoring pass."
gaps:
  - "Human reviews are complete; three trusted receipts still need sealing."
risk_level: MEDIUM
next_action: "Seal Spec, Contract and DoR receipts; verify digest_match before advancing to s05."
```

## SDD Traceability
```yaml
requirement_refs: ["BR-AG-001", "BR-AG-002", "BR-AG-003", "BR-AG-004", "BR-AG-005", "BR-AG-006", "REQ-AG-001", "REQ-AG-002", "REQ-AG-003", "REQ-AG-004", "REQ-AG-005", "REQ-AG-006", "REQ-AG-007", "REQ-AG-008", "REQ-AG-009", "REQ-AG-010", "REQ-AG-011"]
acceptance_refs: ["AG-01", "AG-02", "AG-03", "AG-04", "AG-05", "AG-06", "AG-07", "AG-08", "AG-09", "AG-10", "AG-11", "AG-12", "AG-13"]
task_refs: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"]
test_refs:
  - "golden-routing-matrix"
  - "unsafe-downgrade"
  - "not-applicable-cross-surface"
  - "atomic-bundle-failure-injection"
  - "approval-state-reconciliation"
  - "legacy-adaptive-compatibility"
  - "telemetry-privacy-retention"
  - "interaction-baseline-comparison"
  - "runtime-parity-rollback"
```

## Traceability
```yaml
upstream:
  - "adaptive-governance-human-approval-ux.s01.restate.md"
  - "adaptive-governance-human-approval-ux.s02.business-goal.md"
  - "adaptive-governance-human-approval-ux.s03.open-questions.md"
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
outputs:
  - "adaptive-governance-v1 workflow behavior contract"
  - "AG-01..AG-13 formal acceptance baseline"
  - "DoR READY recommendation"
  - "Spec/Contract/DoR review bundle"
next_step: "Seal s04 trusted receipts; s05 only after all three digest matches are valid."
```

## Handoff
- Criteria bắt buộc: AG-01..AG-13, đặc biệt zero unsafe downgrade/partial write/stale pending state và runtime parity trước activation.
- Edge case phải giữ: mixed-intent fail-closed, explicit override audit, stale digest, crash boundary, legacy scaffold và telemetry identifier privacy.
- Điều kiện sang step 5: human review đã hoàn tất; cần seal và verify ba trusted receipt Spec, Contract, DoR trước khi handoff.
