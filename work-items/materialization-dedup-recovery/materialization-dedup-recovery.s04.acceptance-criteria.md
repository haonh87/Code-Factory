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
  srs: "product-specs/srs/materialization-dedup-recovery.md"
spec_status: draft
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
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
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
> Review packet only. Requirements and the proposed public CLI/report contract are owned by the linked SRS; no Spec, Contract or DoR approval is recorded.

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
status: PARTIAL
approved_spec_refs: []
decision_notes: ["Draft: product-specs/srs/materialization-dedup-recovery.md; BA Spec review pending."]
```

## Contract Baseline

```yaml
status: PARTIAL
api_contract_refs: ["product-specs/srs/materialization-dedup-recovery.md#Proposed CLI And Report Contract"]
ux_contract_refs: []
notes: ["Developer Contract review pending. Existing approve, gate and disposition signatures remain unchanged."]
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
acceptance_criteria: ["SRS AC-DR-01", "SRS AC-DR-02", "SRS AC-DR-03", "SRS AC-DR-04", "SRS AC-DR-05", "SRS AC-DR-06", "SRS AC-DR-07", "SRS AC-DR-08"]
edge_cases: ["Forged/mismatched history", "New unresolved state", "Snapshot race", "Partial scaffold", "Wrong slug in existing note", "Projection failure after report commit", "Unsupported or terminal state"]
out_of_scope: ["Live report repair", "Changing signing identity or receipt schema", "Release"]
done_when: ["Applicable human gates and trusted receipts are present before ACTIVE"]
behavioral_invariants: ["Materialization is authoring only", "Every history record retains its original bytes/fields", "No prose-based resolution"]
```

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Public CLI/state boundary identified", "No foundation or release trigger", "Spec/Contract/DoR reviewer roles are explicit in frontmatter"]
blocking_items: ["Spec, Contract and DoR review/signatures pending"]
owner: ba
next_action: "Review the SRS and this host, then finalize only the decisions actually approved and seal their receipts."
```

## Definition of Ready

```yaml
work_item_slug: materialization-dedup-recovery
status: BLOCKED
checks:
  restated_request_clear: PASS
  business_goal_clear: PASS
  scope_defined: PASS
  open_questions_non_blocking: FAIL
  acceptance_criteria_testable: PASS
  dependencies_known: PASS
  verification_direction_present: PASS
blocking_gaps: ["Human decisions OQ-DR-01..05 and authoring approvals are pending."]
accepted_assumptions: []
residual_risks: ["Partial filesystem writes require explicit retry tests."]
next_action: "Human review of this packet; implementation stays closed."
```

## Traceability

```yaml
upstream: ["materialization-dedup-recovery.s01.restate.md", "materialization-dedup-recovery.s02.business-goal.md", "materialization-dedup-recovery.s03.open-questions.md"]
requirement_refs: ["product-specs/srs/materialization-dedup-recovery.md"]
next_step: "s05 proposal; do not treat the approach as locked until gates pass"
```

## Handoff

s05 and s06 are prepared drafts to make review concrete. Their existence does not pass DoR or open implementation.
