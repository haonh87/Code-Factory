---
artifact_id: "protocol-receipt-binding-check.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "protocol-receipt-binding-check"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: FEATURE
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
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
  card: "product-specs/cards/protocol-receipt-binding-check.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "ta"
  - "developer"
  - "qc"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: []
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-10-27T02:46:56.257Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["ba"]
  dor_reviewed_at: "2026-10-27T02:46:56.257Z"
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
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "protocol-receipt-binding-check.s01.restate.md"
  - "protocol-receipt-binding-check.s02.business-goal.md"
  - "protocol-receipt-binding-check.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 — Acceptance + DoR

> [!summary]
> Nine measurable criteria have been reviewed by the human BA. Admission is complete; DoR is
> READY. Implementation still requires valid readiness receipts and explicit s07 activation.

## Step Contract

```yaml
step_goal: "Bind acceptance to one draft spec and make remaining readiness gates explicit."
input_summary: ["s01-s03", "Current source diagnostic", "Spec Card v0.1"]
output_summary: ["Acceptance references", "Existing-system baseline", "Readiness recommendation"]
done_when: ["Every criterion has a verify path and approval status is unambiguous."]
owner: ba
```

## Requirement Baseline

```yaml
status: APPROVED
approved_spec_refs: ["product-specs/cards/protocol-receipt-binding-check.md"]
approved_spec_digests: ["sha256:09a1918aa8e4145f5a930be62e8e83af7a568d5b3915fe46ce53844cb44edd5c"]
decision_notes: ["Human approved the bounded scope, compatibility contract and nine acceptance criteria; the card digest above is frozen by this review."]
```

## Contract Baseline

```yaml
status: NOT_APPLICABLE
api_contract_refs: []
ux_contract_refs: []
notes: ["Internal implementation of existing artifact-binding invariant; no new public API/event/data schema or UX contract. Existing messages and shared namespace remain stable."]
```

## Existing System Baseline

```yaml
current_behavior_refs:
  - "packages/workflow-bundle/scripts/validate-work-item-protocol.js:468-480"
  - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js:getTrustedReceiptArtifactErrors"
impacted_surfaces: ["Protocol contradiction diagnostic", "Synthetic actual-validator regression fixtures"]
compatibility_constraints: ["Existing trusted receipt schema/signature and namespace", "Lifecycle guard and Light/full hosts", "Opaque legacy state"]
rollback_constraints: ["Revert bounded source/test commits; no receipt/report rollback or resealing."]
```

## Main Artifact

```yaml
acceptance_criteria_ref: "product-specs/cards/protocol-receipt-binding-check.md#Acceptance Criteria.acceptance_criteria"
acceptance_ids: [AC-RB-001, AC-RB-002, AC-RB-003, AC-RB-004, AC-RB-005, AC-RB-006, AC-RB-007, AC-RB-008, AC-RB-009]
acceptance_criteria:
  - id: AC-RB-001
    criterion: "product-specs/cards/protocol-receipt-binding-check.md#Acceptance Criteria.acceptance_criteria[AC-RB-001]"
    verification: "Actual-validator matching receipt with and without typed pending entry; assert expected contradiction count."
  - id: AC-RB-002
    criterion: "product-specs/cards/protocol-receipt-binding-check.md#Acceptance Criteria.acceptance_criteria[AC-RB-002]"
    verification: "Actual-validator stale hash at MATERIALIZED plus ACTIVE stale-evidence rejection."
  - id: AC-RB-003
    criterion: "product-specs/cards/protocol-receipt-binding-check.md#Acceptance Criteria.acceptance_criteria[AC-RB-003]"
    verification: "Actual-validator wrong ref with identical bytes; preserve ACTIVE ref rejection."
  - id: AC-RB-004
    criterion: "product-specs/cards/protocol-receipt-binding-check.md#Acceptance Criteria.acceptance_criteria[AC-RB-004]"
    verification: "Missing-host actual-validator fixture; no uncaught ENOENT and ACTIVE rejects absence."
  - id: AC-RB-005
    criterion: "product-specs/cards/protocol-receipt-binding-check.md#Acceptance Criteria.acceptance_criteria[AC-RB-005]"
    verification: "Missing/rejected/invalid-signature/wrong-key/corrupt-JSON fixtures; check exact diagnostic outcome."
  - id: AC-RB-006
    criterion: "product-specs/cards/protocol-receipt-binding-check.md#Acceptance Criteria.acceptance_criteria[AC-RB-006]"
    verification: "Full s05 and Light s06 matching/stale fixtures; run shared-namespace trust regressions."
  - id: AC-RB-007
    criterion: "product-specs/cards/protocol-receipt-binding-check.md#Acceptance Criteria.acceptance_criteria[AC-RB-007]"
    verification: "Snapshot fixture bytes before and after validation; inject EACCES and assert visible failure."
  - id: AC-RB-008
    criterion: "product-specs/cards/protocol-receipt-binding-check.md#Acceptance Criteria.acceptance_criteria[AC-RB-008]"
    verification: "Run opaque-legacy and typed-state lifecycle regressions through ACTIVE, VERIFIED and DONE."
  - id: AC-RB-009
    criterion: "product-specs/cards/protocol-receipt-binding-check.md#Acceptance Criteria.acceptance_criteria[AC-RB-009]"
    verification: "Capture focused stale hash/ref RED then GREEN, focused suites and registered full suite."
edge_cases: ["Missing host", "Wrong ref but identical bytes", "Rejected or corrupt receipt", "Unexpected I/O", "Light approach at s06", "Opaque legacy state"]
behavioral_invariants_ref: "product-specs/cards/protocol-receipt-binding-check.md#Compatibility and Error Contract"
```

## Technical Risk Input

Approval attribution is the security-sensitive driver: zero stale/other-host receipts may be
counted as current approval; all valid controls must remain valid. Read-only mutation budget is
zero bytes. Trust-store/namespace/schema changes are prohibited. These binary thresholds trace
to REQ-RB-001/003/004; there is no service latency target because this change adds no online
service and no measured performance problem. TA input is advisory, not a separate approval gate.

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks:
  - "No production code changed; admission was signed by the human and recovered by the source CLI."
  - "Existing proposal, signed-history boundary and scope acceptance preserved."
blocking_items: []
owner: "developer/qc"
next_action: "Human review is recorded; verify all independent receipts and exact activation scope before implementation."
```

## Definition of Ready

```yaml
work_item_slug: protocol-receipt-binding-check
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
accepted_assumptions: ["Human reviewer accepts the historical FEATURE metadata, current-host binding behavior and all listed compatibility constraints."]
residual_risks: ["Legacy FEATURE metadata retained explicitly", "Missing-host behavior and profile mapping require negative tests"]
next_action: "Seal and verify the readiness receipts, then validate the isolated execution scope before s07 activation."
```

## Traceability

```yaml
upstream: ["protocol-receipt-binding-check.s03.open-questions.md"]
requirement_refs: [REQ-RB-001, REQ-RB-002, REQ-RB-003, REQ-RB-004]
next_step: "Human Spec/DoR review recorded; the signed readiness bundle binds s04, s05 and s06 independently."
```
