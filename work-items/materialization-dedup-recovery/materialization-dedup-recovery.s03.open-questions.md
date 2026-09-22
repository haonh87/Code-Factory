---
artifact_id: "materialization-dedup-recovery.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "materialization-dedup-recovery"
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
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "materialization-dedup-recovery.s01.restate.md"
  - "materialization-dedup-recovery.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> The evidence is sufficient to draft a repair. The following choices are recommendations for human review, not approvals.

## Step Contract

```yaml
step_goal: "Expose the proposed decisions and remaining authority requirements."
input_summary: ["s01 reproduction", "s02 outcome"]
output_summary: ["Explicit decision table and gate prerequisites"]
done_when: ["No implementation choice is hidden as an assumption"]
owner: ba
```

## Main Artifact

| ID | Proposed decision | Reviewer |
| --- | --- | --- |
| OQ-DR-01 | Add an explicit resume mode to materialize; keep ordinary approve semantics unchanged. | developer |
| OQ-DR-02 | Near-match recovery consumes only already completed, exact-ID Maintainer dispositions; it never interprets prose as approval. | developer, qc |
| OQ-DR-03 | Support READY/no_conflict and PROPOSED/needs_review only, brownfield/single/change_strategy=none. Refuse damaged reuse_work_item history. | ba, developer |
| OQ-DR-04 | Preserve authored files; recover partial scaffold by validating and reusing owned drafts. No force overwrite. | developer, qc |
| OQ-DR-05 | Keep live CR-008 disposition and installation/publication out of this repair. | po |

## Input Readiness

```yaml
status: PARTIAL
blocking_items: ["Contract choices and authoring gates are not human-passed."]
owner_actions: ["Review s04-s06 together; record explicit decisions before sealing receipts."]
```

## Audit

```yaml
audit_status: PARTIAL
notes: ["Source evidence and bounded proposal are complete; no authority is inferred from prior acceptance of opening the repair."]
```

## Traceability

```yaml
upstream: ["materialization-dedup-recovery.s01.restate.md", "materialization-dedup-recovery.s02.business-goal.md"]
next_step: "s04 Acceptance + DoR draft"
```

## Handoff

No extra discovery interview is needed. Human review can accept or amend the concrete decisions in the packet.
