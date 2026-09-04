---
artifact_id: "closeout-bundle-legacy-dod-compatibility.s01.restate"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
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
execution_roles:
  - "ba"
  - "sa"
  - "ta"
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
  - "sa"
  - "ta"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
linked_artifacts:
  - "../../changes/CR-008/spec-delta/srs.delta.md"
  - "../../changes/CR-008/design.md"
  - "../../changes/CR-008/tasks.md"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> A post-approval CR-008 closeout run exposed a legacy compatibility defect: the bundle sealed
> Release and Business Acceptance but omitted mandatory DoD. This linked BUG isolates the correction,
> preserves the approved CR-008 contract, and keeps the parent release/worktree open until re-verification.

## Step Contract
```yaml
step_goal: >-
  Clarify the observed legacy closeout gate-selection defect, its exact compatibility boundary,
  and the constraints that a later correction must satisfy without selecting an implementation.
input_summary:
  - "The user-approved linked-defect decision"
  - "CR-008 AG-08 and approval-bundle contract"
  - "Observed closeout receipts and protocol reconciliation at 2026-09-03"
  - "Current gate derivation and legacy finalized-step defaults"
output_summary:
  - "Normalized BUG scope and preliminary acceptance criteria"
  - "SA/TA architecture drivers and downstream handoffs"
  - "Explicit parent-release blocker and s02/s03 handoff"
done_when:
  - "The observed and expected terminal gate sets are stated exactly"
  - "Scope excludes protocol reopen and unrelated approval redesign"
  - "Every architecture driver has provenance, threshold, verification, and handoff"
  - "No technical option or production edit is selected"
owner: "agent"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes; humans retain every applicable approval authority"
  - "A mandatory terminal gate cannot disappear because a legacy artifact omits an explicit key"
  - "Brownfield fixes use the smallest correct delta and preserve existing receipt-v1 evidence"
  - "New verification evidence supersedes a prior release-readiness conclusion"
required_reviews:
  - "BA reviews Spec and BA/QC review DoR"
  - "Developer reviews Approach and Task Plan"
  - "QC verifies AG-08 and DoD; DevOps/QC and PO repeat terminal review for the new candidate"
prohibited_actions:
  - "Seal DoD individually only to hide the incorrect bundle gate set"
  - "Rewrite historical trusted receipts or treat their signatures as current after artifact drift"
  - "Add a generic workflow reopen transition or redesign approval sessions in this defect"
  - "Publish, tag, merge, or clean the parent branch before the linked defect closes"
open_governance_questions: []
```

## Artifact Chính
```yaml
raw_request: >-
  Approve creation of the recommended linked defect work item after the CR-008 closeout bundle
  omitted the mandatory DoD receipt.
restated_request: >-
  Correct the legacy closeout-bundle behavior so a product-release legacy s08 always includes
  mandatory DoD together with configured Release and Business Acceptance, commits receipts and
  derived protocol state atomically, and can be re-verified as a new v2.6.2 candidate.
request_type: BUG
user_problem_initial: >-
  The single closeout interaction appeared successful but left DoD missing and recorded a partial
  bundle approval, forcing the operator back into manual diagnosis and extra approval actions.
business_context_initial: >-
  CR-008 exists to reduce approval friction without weakening authority. Omitting DoD violates that
  promise and blocks an evidence-backed v2.6.2 release.
scope_draft:
  in:
    - "Legacy closeout terminal-gate derivation when s08 omits approval_gates.dod"
    - "Regression coverage for DoD-only maintenance and DoD+Release+Business Acceptance product release"
    - "Atomic receipt and report/protocol reconciliation for the exact selected gate set"
    - "Candidate CLI/version parity and new v2.6.2 verification evidence"
    - "Parent CR-008 finding, receipt invalidation, and release hold"
  out:
    - "A general VERIFIED-to-ACTIVE reopen transition"
    - "Changes to the adaptive_v1 gate list contract"
    - "Signer, passphrase, receipt schema, telemetry, or unrelated routing changes"
    - "Publication, tag creation, merge, global install, or worktree cleanup"
constraints_initial:
  - "DoD remains mandatory for every technical closeout under the legacy host contract"
  - "Optional UAT, Release, and Business Acceptance remain driven by explicit applicability"
  - "A successful bundle produces no partial gate subset and no contradictory pending state"
  - "Historical receipts are retained but cannot authorize a changed artifact or candidate"
assumptions_initial:
  - "The defect source is the legacy gate-selection branch, reproduced in current source"
  - "CR-008 AG-08 already defines the expected behavior; no requirement expansion is needed"
  - "The same CR-008 worktree remains the isolated delivery workspace"
open_questions_initial: []
dependencies_initial:
  - "CR-008 approved Spec/Approach and AG-08"
  - "Legacy finalized-step rule that requires DoD at s08"
  - "Trusted receipt-v1 signer and approval transaction coordinator"
  - "Hosted Guardrails and exact-candidate verification"
risks_initial:
  - "A narrow fix may correct selection but still reconcile a stale partial protocol claim"
  - "Existing tests may cover only adaptive reports with explicit gate arrays"
  - "A new candidate invalidates previous QC, Release, and Business Acceptance evidence"
notes_for_step_2: >-
  Lock the value as restored authority plus one-interaction closeout; do not broaden the work item
  into protocol lifecycle reopening or approval-system redesign.
```

## Requirement Analysis Spec
```yaml
raw_request: "Create the approved linked defect for the CR-008 closeout DoD omission."
restated_request: >-
  Make legacy closeout bundles include mandatory DoD and all configured terminal gates in one
  atomic decision, with a regression test that reproduces the observed Release+Business Acceptance
  partial success and with new release evidence before CR-008 can close.
request_type: BUG
business_context: >-
  A friction-reduction feature is unacceptable if its compact interaction silently weakens a
  mandatory human-controlled gate or leaves contradictory state.
scope_in:
  - "Legacy terminal-gate selection"
  - "Atomic closeout regression and state reconciliation"
  - "Local and hosted v2.6.2 candidate re-verification"
scope_out:
  - "Workflow reopen capability"
  - "Receipt schema or signer changes"
  - "Unrelated CR-008 behavior"
open_questions: []
assumptions:
  - "AG-08 is the locked behavioral baseline"
  - "The observed legacy s08 intentionally exercises missing approval_gates.dod compatibility"
dependencies:
  - "workflow-gate-review legacy fallback"
  - "work-item-protocol closeout fixtures"
  - "trusted approval transaction"
risks_initial:
  - "False green tests if fixtures always use artifact_shape=adaptive_v1"
  - "Stale terminal receipts after the parent s08 evidence changes"
acceptance_criteria_draft:
  - id: "CLD-01"
    description: "A legacy maintenance closeout with no explicit DoD key selects exactly DoD."
    measurable: true
  - id: "CLD-02"
    description: "A legacy product release selects exactly DoD, Release, and Business Acceptance."
    measurable: true
  - id: "CLD-03"
    description: "One successful bundle writes one matching receipt per selected gate and reconciles all derived state."
    measurable: true
  - id: "CLD-04"
    description: "Any preflight or persistence failure leaves zero new partial receipts or derived-state writes."
    measurable: true
  - id: "CLD-05"
    description: "The exact corrected v2.6.2 candidate passes local and hosted release checks before terminal reapproval."
    measurable: true
notes_for_next_step: "s02 should define restored-authority and one-interaction outcomes; s03 has no known decision blocker."
```

## SA Architecture Drivers
```yaml
invocation:
  skill: sa
  directives_parsed: []
  directives_unresolved: []
  selected_profile: driver-only
  profile_source: default
  escalation_reasons: []
objectives:
  applicable: true
  reason: ""
  items:
    - { id: "OBJ-CL-001", statement: "Restore mandatory terminal-gate authority in legacy closeout.", measure: "0 omitted mandatory gates across supported legacy fixtures.", source: "user and CR-008 AG-08", confidence: stated }
    - { id: "OBJ-CL-002", statement: "Keep closeout to one trustworthy human interaction.", measure: "1 interaction produces 1 independent receipt for each applicable terminal gate.", source: "CR-008 approval bundle contract", confidence: stated }
    - { id: "OBJ-CL-003", statement: "Return v2.6.2 to an evidence-backed release path.", measure: "Corrected candidate passes local and hosted verification before terminal reapproval.", source: "user-approved linked defect", confidence: stated }
drivers:
  applicable: true
  reason: ""
  items:
    - id: "DRV-SA-CL-001"
      kind: constraint
      statement: "DoD is mandatory for every legacy technical closeout even when approval_gates.dod is absent."
      origin: { stakeholder: "qc", concern: "The observed closeout omitted the completion authority.", constraint_ref: "AG-08 and legacy s08 host contract" }
      traces_to: ["OBJ-CL-001"]
      threshold: { status: binary, value: "DoD is always selected.", reason: "" }
      verification: "Exercise legacy maintenance and product-release fixtures with the DoD key absent."
      architectural_significance: "This rule defines the authority boundary of terminal gate selection."
      priority: high
    - id: "DRV-SA-CL-002"
      kind: system_boundary
      statement: "Gate applicability and mandatory legacy defaults must produce one complete closeout decision before any receipt or protocol write."
      origin: { stakeholder: "user", concern: "A successful-looking bundle wrote only a subset and reconciled partial state.", constraint_ref: "AG-07, AG-08, AG-11" }
      traces_to: ["OBJ-CL-001", "OBJ-CL-002"]
      threshold: { status: quantified, value: "0 partial gate subsets and 0 contradictory state after success or failure.", reason: "" }
      verification: "Compare selected gates, receipts, report, protocol block, blockers, and required actions in success/failure fixtures."
      architectural_significance: "It fixes the seam between applicability, transaction planning, and state reconciliation."
      priority: high
    - id: "DRV-SA-CL-003"
      kind: business_goal
      statement: "The corrected product closeout must retain the one-interaction experience."
      origin: { stakeholder: "user", concern: "The workaround would reintroduce repetitive approvals.", constraint_ref: "CR-008 BR-AG-003" }
      traces_to: ["OBJ-CL-002"]
      threshold: { status: quantified, value: "1 reviewed interaction for all applicable terminal gates.", reason: "" }
      verification: "The end-to-end closeout fixture records one bundle interaction and independent per-gate receipts."
      architectural_significance: "It prevents solving authority by abandoning the approved bundled interaction contract."
      priority: high
    - id: "DRV-SA-CL-004"
      kind: constraint
      statement: "The correction must preserve historical receipt-v1 files and supported legacy artifact readability."
      origin: { stakeholder: "maintainer", concern: "A compatibility fix must not rewrite signed history.", constraint_ref: "CR-008 compatibility contract" }
      traces_to: ["OBJ-CL-003"]
      threshold: { status: quantified, value: "100% supported legacy receipt/artifact fixtures remain readable without rewrite.", reason: "" }
      verification: "Run legacy receipt and artifact compatibility matrices plus rollback smoke."
      architectural_significance: "It constrains the correction to the existing compatibility boundary."
      priority: high
landscape:
  applicable: false
  reason: "One package and one existing authority boundary are affected; no system seam moves."
  question_answered: ""
  render_format: drawio
  view_axis: system
  quality_checks: []
  manual_steps: []
  produced_by: ""
input_issues:
  unanchored_drivers: []
  contested_ownership: []
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers:
    - { pair: ["DRV-SA-CL-001", "observed CLOSEOUT_BUNDLE_APPROVED event"], nature: "Persisted bundle success omitted mandatory DoD.", owner: "developer/qc" }
  unquantified_nfrs: []
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability: []
metrics:
  applicable: true
  items:
    - { id: "M-01", name: "Objective traceability", formula: "4/4", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-SA-CL-001..004 each trace to objectives." }
    - { id: "M-02", name: "Objective support", formula: "3/3", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "OBJ-CL-001..003 each have supporting drivers." }
    - { id: "M-03", name: "Driver provenance", formula: "4/4", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Every SA driver names concern and constraint_ref." }
    - { id: "M-04", name: "NFR quantification", formula: "3/3 numeric drivers", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-SA-CL-002..004 carry measurable thresholds; binary DRV-SA-CL-001 is excluded." }
    - { id: "M-05", name: "Verification coverage", formula: "4/4", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Every SA driver has a verification method." }
    - { id: "M-06", name: "Handoff coverage", formula: "4/4", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Every SA driver appears in BA, DEV, or QC handoff." }
    - { id: "M-07", name: "Open-item ownership", formula: "0 open items", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "No unresolved item is pushed to s03." }
    - { id: "M-08", name: "Option discipline", formula: "0 direction choices", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "SA does not choose an approach." }
    - { id: "M-09", name: "Landscape element ownership", formula: "landscape not applicable", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "No system seam moves." }
    - { id: "M-10", name: "Capability ownership clarity", formula: "2/2 existing capabilities", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Gate selection and approval transaction owners are identifiable in the current baseline." }
handoff:
  to_ba: { applicable: true, reason: "", items: ["Lock exact legacy terminal gate sets and zero partial-state criteria.", "Retain one-interaction and compatibility outcomes."] }
  to_dev: { applicable: true, reason: "", items: ["Preserve mandatory DoD, optional configured terminal gates, atomic decision-before-write, and receipt-v1 history."] }
  to_qc: { applicable: true, reason: "", items: ["Reproduce the observed missing-DoD behavior and verify exact gate/receipt/state sets after correction."] }
  to_devops: { applicable: false, reason: "owned by /ta", items: [] }
stop_condition:
  met: true
  reason: "The expected authority, interaction, compatibility, and release outcomes are explicit."
  pushed_to_s03: []
```

## TA Architecture Drivers
```yaml
invocation:
  skill: ta
  directives_parsed: []
  directives_unresolved: []
  selected_profile: driver-only
  profile_source: default
  escalation_reasons: []
objectives: { applicable: false, reason: "owned by /sa", items: [] }
drivers:
  applicable: true
  reason: ""
  items:
    - id: "DRV-TA-CL-001"
      kind: quality_attribute
      statement: "Legacy terminal-gate derivation must be deterministic and complete."
      origin: { stakeholder: "qc", concern: "The legacy path selected only two of three required gates.", constraint_ref: "AG-08" }
      traces_to: ["OBJ-CL-001"]
      threshold: { status: quantified, value: "100% exact gate-set equality across repeated legacy maintenance and release fixtures.", reason: "" }
      verification: "Repeat each normalized fixture and compare ordered selected-gate output."
      architectural_significance: "Determinism and completeness constrain the gate-selection contract."
      priority: high
    - id: "DRV-TA-CL-002"
      kind: quality_attribute
      statement: "Closeout planning, receipts, and derived-state reconciliation must remain atomic for the complete gate set."
      origin: { stakeholder: "developer/qc", concern: "Partial authority was persisted as a successful bundle.", constraint_ref: "AG-07 and AG-11" }
      traces_to: ["OBJ-CL-001", "OBJ-CL-002"]
      threshold: { status: quantified, value: "0 partial visible writes at every injected failure boundary.", reason: "" }
      verification: "Run preflight, staged-write, commit, crash, retry, and reconciliation fixtures with the legacy gate set."
      architectural_significance: "The complete selection must be fixed before transaction staging begins."
      priority: high
    - id: "DRV-TA-CL-003"
      kind: integration
      statement: "The command entrypoint used for verification must expose the same minor version and action set as the packaged candidate."
      origin: { stakeholder: "operator", concern: "The global v2.6.1 CLI rejected the v2.6.2-only action.", constraint_ref: "AG-13 runtime parity" }
      traces_to: ["OBJ-CL-003"]
      threshold: { status: quantified, value: "100% command/action parity for the exact candidate across supported Node and harness matrices.", reason: "" }
      verification: "Verify package version, help/action surface, install matrix, and hosted artifact digest before terminal approval."
      architectural_significance: "A mismatched entrypoint can mimic a product defect or bypass corrected behavior."
      priority: high
    - id: "DRV-TA-CL-004"
      kind: integration
      statement: "Legacy missing-key defaults and explicit adaptive gate arrays must converge on the same mandatory DoD invariant."
      origin: { stakeholder: "maintainer", concern: "Legacy finalized-step validation requires DoD while closeout derivation defaulted it to not_applicable.", constraint_ref: "legacy s08 finalized-signoff contract" }
      traces_to: ["OBJ-CL-001", "OBJ-CL-003"]
      threshold: { status: binary, value: "Both artifact shapes enforce mandatory DoD.", reason: "" }
      verification: "Run paired legacy/adaptive closeout fixtures and compare mandatory gate evidence."
      architectural_significance: "It is the compatibility seam between old artifact defaults and new adaptive applicability."
      priority: high
landscape:
  applicable: false
  reason: "The defect is confined to an existing in-process package boundary."
  question_answered: ""
  render_format: drawio
  view_axis: system
  quality_checks: []
  manual_steps: []
  produced_by: ""
input_issues:
  unanchored_drivers: []
  contested_ownership: []
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers:
    - { pair: ["legacy default DoD requirement", "legacy closeout explicit-key filter"], nature: "Two readers assign different defaults to the same missing key.", owner: "developer" }
  unquantified_nfrs: []
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability: []
metrics:
  applicable: true
  items:
    - { id: "M-01", name: "Objective traceability", formula: "4/4", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-TA-CL-001..004 trace to SA objectives." }
    - { id: "M-02", name: "Objective support", formula: "owned by /sa", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "TA does not fill objectives." }
    - { id: "M-03", name: "Driver provenance", formula: "4/4", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Every TA driver names concern and constraint_ref." }
    - { id: "M-04", name: "NFR quantification", formula: "3/3 numeric drivers", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-TA-CL-001..003 are quantified; binary DRV-TA-CL-004 is excluded." }
    - { id: "M-05", name: "Verification coverage", formula: "4/4", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Every TA driver has verification." }
    - { id: "M-06", name: "Handoff coverage", formula: "4/4", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Every TA driver appears in DEV, QC, or DevOps handoff." }
    - { id: "M-07", name: "Open-item ownership", formula: "0 open items", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "No unresolved item is pushed to s03." }
    - { id: "M-08", name: "Option discipline", formula: "0 direction choices", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "TA does not choose an approach." }
    - { id: "M-09", name: "Landscape element ownership", formula: "landscape not applicable", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "No landscape is required." }
    - { id: "M-10", name: "Capability ownership clarity", formula: "owned by /sa", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "TA does not allocate capability ownership." }
handoff:
  to_ba: { applicable: false, reason: "owned by /sa", items: [] }
  to_dev: { applicable: true, reason: "", items: ["Keep selection deterministic, mandatory DoD compatible across shapes, and complete before transaction staging.", "Do not couple the correction to global CLI installation or lifecycle reopen behavior."] }
  to_qc: { applicable: true, reason: "", items: ["Verify exact gate sets, zero partial writes, idempotent retry, state reconciliation, and paired legacy/adaptive behavior."] }
  to_devops: { applicable: true, reason: "", items: ["Use only the exact corrected candidate CLI and digest for hosted verification and repeat Release review."] }
stop_condition:
  met: true
  reason: "The technical compatibility, atomicity, determinism, and release constraints are measurable."
  pushed_to_s03: []
```

## Audit
```yaml
step: "s01 Clarify"
status: PASS
checks:
  - { criterion: "Observed and expected behavior are exact", result: PASS, evidence: "Observed release+business_acceptance is contrasted with required dod+release+business_acceptance." }
  - { criterion: "Scope prevents unrelated redesign", result: PASS, evidence: "Reopen, signer, schema, telemetry, publication, and unrelated routing are excluded." }
  - { criterion: "SA/TA drivers are complete", result: PASS, evidence: "Eight drivers have provenance, threshold status, verification, traceability, and handoff." }
  - { criterion: "No approach selected", result: PASS, evidence: "Only constraints and expected outcomes are recorded." }
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "One bounded linked-defect clarification pass."
gaps:
  - "Trusted work-item approval receipt remains pending."
risk_level: HIGH
next_action: "Seal the user-approved work-item receipt, then continue to s02 Business Goal."
```

## SDD Traceability
```yaml
requirement_refs: ["REQ-AG-005", "REQ-AG-006", "REQ-AG-007", "REQ-AG-009", "REQ-AG-010"]
acceptance_refs: ["AG-07", "AG-08", "AG-09", "AG-11", "AG-13", "CLD-01", "CLD-02", "CLD-03", "CLD-04", "CLD-05"]
task_refs: ["T8b"]
test_refs: ["legacy-closeout-missing-dod", "closeout-atomic-reconciliation", "exact-candidate-parity"]
```

## Work Item Materialization
```yaml
materialization_status: READY
decision_owner: "agent"
raw_request_summary: "Fix the CR-008 legacy closeout bundle so mandatory DoD cannot be omitted and partial terminal state cannot be recorded as success."
split_decision: single
dedup_result: no_conflict
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
work_item_type: BUG
delivery_context: brownfield
sdd_preset: "strict"
selected_profile: "strict"
sdd_mode: none
sdd_escalation_reasons: []
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
change_strategy: none
change_id: ""
decision_reason:
  - "split_decision=single"
  - "work_item_type=BUG"
  - "delivery_context=brownfield"
  - "dedup_result=no_conflict"
  - "change_strategy=none"
  - "planning_track=full"
  - "governance_profile=strict"
  - "sdd_preset=strict"
  - "selected_profile=strict"
  - "sdd_mode=none"
  - "sdd_escalation_reasons="
existing_refs:
  - "work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
blockers: []
```

## Work Item Protocol
```yaml
protocol_status: ACTIVE
approval_status: APPROVED
review_required: true
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/cr-008-adaptive-governance/work-items/closeout-bundle-legacy-dod-compatibility"
current_step: "s08"
granted_write_paths:
  - "packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "packages/workflow-bundle/test/work-item-protocol.test.js"
  - "work-items/closeout-bundle-legacy-dod-compatibility"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "agent"
protocol_owner: "qc"
reviewed_by: "po"
reviewed_at: "2026-09-03T07:45:40.233Z"
handoff_target: "agent-s08-hosted-verification"
last_transition_action: "open-s08"
last_transition_at: "2026-09-04T10:58:54Z"
required_actions:
  - "Commit and push the reviewed scope, then collect hosted Node 18/22 evidence before QC Technical Verification and DoD review."
blockers: []
review_notes:
  - "Approved creation of the recommended linked defect for CR-008 finding F-AG08-001."
  - "QC approved opening s08 for candidate SHA-256 b2d9ba416e54ec2cd1517a98f1a9b05e010c519a1721651534caf42b44f3b83e at 2026-09-04T10:58:54Z."
refs:
  - "work-items/closeout-bundle-legacy-dod-compatibility"
  - "work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "changes/CR-008"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "WORK_ITEM_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "S08_OPENED_BY_QC"
```

## Traceability
```yaml
source_inputs:
  - "User-approved linked-defect decision"
  - "CR-008 AG-08 and legacy compatibility contract"
  - "Observed trusted receipt statuses and partial closeout reconciliation"
next_step: "s02 Business Goal after trusted work-item approval"
```

## Handoff
- Clear: this is one code-sourced compatibility BUG; expected gate sets and non-goals are locked.
- Follow-up: parent CR-008 remains release-blocked and its terminal evidence must be repeated for the corrected candidate.
- Condition for s02: the user-approved work item must have a valid trusted approval receipt.
