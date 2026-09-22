---
artifact_id: "materialization-dedup-recovery.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "materialization-dedup-recovery"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: verified
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
  srs: "product-specs/srs/materialization-dedup-recovery.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "sa"
  - "ta"
  - "developer"
  - "qc"
review_mode: self
verification_owner: "qc"
artifact_shape: adaptive_v1
request_lane: product_delivery
workflow_required: true
routing_reasons:
  - "LANE_PRODUCT_DELIVERY"
escalation_reasons:
  - "HARD_PUBLIC_CONTRACT"
  - "HARD_SECURITY_SENSITIVE"
role_reasons:
  po:
    - "ROLE_PO_PRODUCT_OUTCOME"
  ba:
    - "ROLE_BA_REQUIREMENTS"
  sa:
    - "ROLE_SA_PUBLIC_CONTRACT_BOUNDARY"
  ta:
    - "ROLE_TA_PUBLIC_CONTRACT_RISK"
    - "ROLE_TA_SECURITY_RISK"
  developer:
    - "ROLE_DEVELOPER_DELIVERY"
  qc:
    - "ROLE_QC_VERIFICATION"
gate_reasons:
  spec:
    - "GATE_SPEC_PRODUCT_DELIVERY"
  contract:
    - "GATE_CONTRACT_PUBLIC_CONTRACT"
  dor:
    - "GATE_DOR_PRODUCT_DELIVERY"
  approach:
    - "GATE_APPROACH_PRODUCT_DELIVERY"
  task_plan:
    - "GATE_TASK_PLAN_PRODUCT_DELIVERY"
  dod:
    - "GATE_DOD_PRODUCT_DELIVERY"
  business_acceptance:
    - "GATE_BUSINESS_ACCEPTANCE_PRODUCT_OUTCOME"
adaptive_activation:
  source_version: "2.6.3"
  installed_versions:
    - "2.6.3"
    - "2.6.3"
  parity_passed: true
approval_gates:
  spec: "required"
  contract: "required"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "required"
  dod: "required"
role_signoffs:
  spec: ["ba"]
  contract: ["developer"]
  dor: ["ba","qc"]
  approach: ["developer"]
  task_plan: ["developer"]
  dod: ["qc"]
  business_acceptance: ["po"]
gate_reviews:
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-09-22T01:44:34Z"
  contract_reviewed_by: ["developer"]
  contract_reviewed_at: "2026-09-22T01:44:34Z"
  dor_reviewed_by: ["ba","qc"]
  dor_reviewed_at: "2026-09-22T01:44:34Z"
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "materialization-dedup-recovery.s01.restate.md"
  - "materialization-dedup-recovery.s02.business-goal.md"
  - "materialization-dedup-recovery.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> The user explicitly approved this packet. Spec, Contract and DoR decisions are recorded below; their trusted receipts remain pending. The linked SRS is the single requirement/contract owner.

## Step Contract

```yaml
step_goal: "Make the repair contract and readiness testable before implementation."
input_summary: ["s01-s03", "Existing CLI and report behavior"]
output_summary: ["SRS acceptance/contract reference", "Readiness assessment"]
done_when: ["Each invariant has a verification target", "Human decisions and receipts are distinguished"]
owner: ba
```

## Requirement Baseline

```yaml
status: APPROVED
approved_spec_refs:
  - "product-specs/srs/materialization-dedup-recovery.md"
approved_spec_digests:
  - "sha256:f56366ec93523e1b15185d3f760232e36bae6799225be9326d1819f36b642323"
decision_notes: ["Explicit user acceptance of the complete review packet observed at 2026-09-22T01:44:34Z; trusted Spec receipt pending."]
```

## Contract Baseline

```yaml
status: APPROVED
api_contract_refs: ["product-specs/srs/materialization-dedup-recovery.md#Proposed CLI And Report Contract"]
ux_contract_refs: []
notes: ["Developer Contract decision accepted in the user-approved packet; receipt pending. Existing approve, gate and disposition signatures remain unchanged."]
```

## Existing System Baseline

```yaml
current_behavior_refs: ["s01 Reproduction And Attribution", "packages/workflow-bundle/scripts/materialize-work-item.js", "packages/workflow-bundle/scripts/work-item-protocol-utils.js"]
impacted_surfaces: ["materialize CLI arguments", "Persisted proposal continuation", "Optional recovery metadata and projection"]
compatibility_constraints: ["Keep legacy/adaptive reports readable", "Keep unrelated fields and signed history unchanged", "Do not change existing approval authority"]
rollback_constraints: ["Do not downgrade a recovered report or erase history", "Use an explicit pre-operation backup for disaster recovery only"]
```

## Main Artifact

```yaml
acceptance_criteria:
  - id: AC-DR-01
    criterion: "product-specs/srs/materialization-dedup-recovery.md#AC-DR-01: approved criterion by reference"
    verification: "Eligible READY resume fixtures and note validation"
  - id: AC-DR-02
    criterion: "product-specs/srs/materialization-dedup-recovery.md#AC-DR-02: approved criterion by reference"
    verification: "Signed admission-resolution fixture plus raw-history preservation comparison"
  - id: AC-DR-03
    criterion: "product-specs/srs/materialization-dedup-recovery.md#AC-DR-03: approved criterion by reference"
    verification: "Invalid authority/input cases with before/after byte snapshots"
  - id: AC-DR-04
    criterion: "product-specs/srs/materialization-dedup-recovery.md#AC-DR-04: approved criterion by reference"
    verification: "Pending approval and empty grants assertions; activation-negative test"
  - id: AC-DR-05
    criterion: "product-specs/srs/materialization-dedup-recovery.md#AC-DR-05: approved criterion by reference"
    verification: "Same-operation retry and conflict tests; exact event/history counts"
  - id: AC-DR-06
    criterion: "product-specs/srs/materialization-dedup-recovery.md#AC-DR-06: approved criterion by reference"
    verification: "Scaffold/commit/projection failure injection and path/lock checks"
  - id: AC-DR-07
    criterion: "product-specs/srs/materialization-dedup-recovery.md#AC-DR-07: approved criterion by reference"
    verification: "Default rerun byte-preservation and legacy/adaptive regression tests"
  - id: AC-DR-08
    criterion: "product-specs/srs/materialization-dedup-recovery.md#AC-DR-08: approved criterion by reference"
    verification: "Documentation, runtime parity, workflow and UTF-8 checks"
edge_cases: ["Forged/mismatched history", "New unresolved state", "Snapshot race", "Partial scaffold", "Wrong slug in existing note", "Projection failure after report commit", "Unsupported or terminal state"]
out_of_scope: ["Live report repair", "Changing signing identity or receipt schema", "Release"]
done_when: ["Applicable human gates and trusted receipts are present before ACTIVE"]
behavioral_invariants: ["Materialization is authoring only", "Every history record retains its original bytes/fields", "No prose-based resolution"]
```

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Public CLI/state boundary identified", "No foundation or release trigger", "Spec/Contract/DoR reviewer roles are explicit in frontmatter"]
blocking_items: ["Trusted Spec, Contract and DoR receipts pending"]
owner: ba
next_action: "Seal the finalized host through the readiness bundle; do not edit it after sealing."
```

## Definition of Ready

```yaml
work_item_slug: materialization-dedup-recovery
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
accepted_assumptions: ["Bounded support matrix and existing per-entry disposition interactions accepted in OQ-DR-01..05."]
residual_risks: ["Partial filesystem writes require explicit retry tests."]
next_action: "Authoring decision is approved; seal trusted receipts before implementation."
```

## Traceability

```yaml
upstream: ["materialization-dedup-recovery.s01.restate.md", "materialization-dedup-recovery.s02.business-goal.md", "materialization-dedup-recovery.s03.open-questions.md"]
requirement_refs: ["product-specs/srs/materialization-dedup-recovery.md"]
next_step: "s05 approved approach; trusted gate receipts remain required"
```

## Handoff

The user-approved packet includes s05 and s06. Authoring decisions are finalized; the router still waits for trusted receipts and ACTIVE scope.
## Human Decision Record

```yaml
human_actor: "user"
source: "Explicit accept in this conversation after review packet f1d3efd and the gate-approval question"
decision: APPROVED
observed_at: "2026-09-22T01:44:34Z"
reviewed_revision: "f1d3efd"
trusted_receipts: PENDING
scope_limit: "Authoring only; no DoD, Business Acceptance, release, live disposition or cleanup"
```
