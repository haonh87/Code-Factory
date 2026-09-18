---
artifact_id: "terminal-archive-legacy-state-reconciliation.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "terminal-archive-legacy-state-reconciliation"
step_id: "s02"
step_slug: "business-goal"
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
change_id: "CR-009"
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
  - "po"
  - "ba"
  - "sa"
  - "ta"
  - "developer"
  - "qc"
review_mode: self
verification_owner: ""
artifact_shape: adaptive_v1
request_lane: product_delivery
workflow_required: true
routing_reasons:
  - "LANE_PRODUCT_DELIVERY"
escalation_reasons:
  - "HARD_PUBLIC_CONTRACT"
role_reasons:
  po:
    - "ROLE_PO_PRODUCT_OUTCOME"
  ba:
    - "ROLE_BA_REQUIREMENTS"
  sa:
    - "ROLE_SA_PUBLIC_CONTRACT_BOUNDARY"
  ta:
    - "ROLE_TA_PUBLIC_CONTRACT_RISK"
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
  source_version: "2.6.2"
  installed_versions:
    - "2.6.2"
    - "2.6.2"
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
  - "product-thinking"
  - "sa"
  - "ta"
  - "step-goal-contract"
artifact_skills:
  - "artifact-governance"
  - "obsidian-markdown"
upstream_artifacts:
  - "terminal-archive-legacy-state-reconciliation.s01.restate.md"
linked_artifacts:
  - "changes/CR-009/proposal.md"
  - "changes/CR-008/archive-metadata.md"
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> CR-008 can be marked `ARCHIVED` while two opaque legacy blockers remain active. This defect aims to make terminal state truthful without losing historical evidence.

## Step Contract
```yaml
step: s02
goal: "Establish the operational outcome and non-goals for F-CR008-ARCH-001."
value: "Maintainers can distinguish current blockers from resolved history and trust an ARCHIVED status."
scope_in:
  - "Define the user problem, outcome, measurable success, priority, and non-goals."
  - "Carry forward the SA and TA constraints already recorded in s01."
scope_out:
  - "Choose an identifier scheme, command syntax, persisted schema, or transaction mechanism."
  - "Approve downstream gates, alter existing trusted receipts, or implement behavior."
inputs_required:
  - "Approved CR-009 and work-item trusted receipts."
  - "F-CR008-ARCH-001 finding and CR-008 branch-finish HOLD_OPEN evidence."
  - "Human-approved defect direction in s01."
outputs_required:
  - "This s02 Business Goal note."
done_when:
  - "The failure and affected operator are named."
  - "The desired terminal state is observable without interpreting prose."
  - "Measurable outcomes and non-goals retain the exact-text and no-inference boundaries."
  - "Unresolved choices are routed to s03, not silently decided."
constraints:
  hard_constraints:
    - "No active blocker may coexist with a new ARCHIVED transition."
    - "Opaque legacy text must survive disposition exactly."
    - "No text inference may select or resolve a state entry."
  soft_constraints:
    - "Prefer the smallest compatible change to the existing protocol runtime."
  prohibited_actions:
    - "Do not modify v2.6.2 artifacts or existing signed receipts."
    - "Do not claim s04-s06 are approved from these receipts."
  compliance_checks:
    - "Check success outcomes include archive rejection with active blockers."
    - "Check success outcomes include exact text in resolved history."
    - "Check non-goals prohibit regex, substring, fuzzy, and semantic inference."
risks:
  - id: R-TAR-S02-01
    description: "The goal is mistaken for permission to rewrite historical data."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Keep forward-only repair and immutable v2.6.2 in the non-goals."
    contingency: "Return to s03 for Maintainer scope clarification before s04."
    owner: maintainer
    status: MONITORING
timebox:
  target_duration: "one authoring session"
  deadline: ""
  escalation_rule: "If scope expands beyond one defect outcome, return to s01 materialization."
```

## Artifact Chính
```yaml
restated_request: "Repair terminal archive and legacy-state reconciliation through explicit ID-based disposition, exact historical-text retention, and no text inference."
user_problem: "A maintainer sees ARCHIVED for the CR-008 parent even though blockers[] still contains two opaque legacy entries. They cannot tell from the current projection whether those entries were genuinely resolved, and cannot safely finalize the old branch/worktree."
business_goal: "A terminal work item must truthfully show zero active blockers; formerly active legacy entries remain auditable as resolved history only after an explicit authorized disposition."
user_value: "Maintainers and reviewers can trust the archive status without reading or guessing the meaning of historical prose, while preserving an exact audit trail."
success_outcome:
  - "Every archive attempt with at least one active blocker is rejected without changing state."
  - "Every explicitly disposed legacy entry is absent from active state and present exactly once in resolved-state history with its original text unchanged."
  - "Unknown, duplicate, stale, or missing identifiers fail safely; text wording never changes selection."
  - "Existing tracked reports remain readable without pre-migration."
  - "The real CR-008 case can be reconciled through the new approved path without altering v2.6.2 or its signed evidence."
non_goals:
  - "Republish or rewrite v2.6.2, its release evidence, tag, package, or trusted receipts."
  - "Delete the two CR-008 legacy entries by hand or infer their status from words such as OPEN or BLOCKED."
  - "Bulk-migrate every historical report before readers can load it."
  - "Use regex, substring, fuzzy alias, Unicode-boundary, or other semantic inference over display text in core transitions."
  - "Treat CR-009 approval as implementation, release, or CR-008 branch-cleanup approval."
priority_reason: "F-CR008-ARCH-001 keeps the CR-008 branch-finish verdict at HOLD_OPEN and exposes a misleading terminal-state invariant in the released runtime."
risks_business:
  - "Operators may mistake ARCHIVED for clean completion while unresolved historical entries remain active."
  - "An overbroad repair could erase audit evidence or create unnecessary approval burden."
  - "A partial repair may leave legacy required_actions subject to silent removal at terminal transitions."
metrics_candidate:
  - "100% of archive attempts with active blockers rejected; 0 state mutations on rejection."
  - "100% of explicit dispositions retain original text and one identity-bound history record."
  - "0 core transition decisions based on display text."
  - "All tracked protocol reports load without bulk migration; baseline count is recomputed at verification time."
success_metrics:
  - "Archive invariant: 100% rejection when active blockers > 0."
  - "Disposition integrity: 0 lost original-text values and 0 duplicate history records."
constraints:
  - "SA drivers DRV-SA-TAR-001..004 and TA drivers DRV-TA-TAR-001..005 remain the design envelope."
  - "Current CR-008 parent entries remain untouched until an approved operation is available."
assumptions:
  - "The initial maintenance classification was superseded by OQ-TAR-007:A; the supported wfc CLI and persisted-state contract require product_delivery/public_contract routing."
  - "No release or external integration deployment is opened by the contract repair itself."
notes_for_next_step: "s03 resolves OQ-TAR-001..007 and records the public-contract route before s04 acceptance/readiness."
```

## Traceability
```yaml
upstream:
  - "terminal-archive-legacy-state-reconciliation.s01.restate.md"
  - "changes/CR-008/archive-metadata.md#Branch Finish Audit"
  - "changes/CR-009/proposal.md"
objective_ids: [OBJ-TAR-001, OBJ-TAR-002, OBJ-TAR-003]
driver_refs: [DRV-SA-TAR-001, DRV-SA-TAR-002, DRV-SA-TAR-003, DRV-SA-TAR-004, DRV-TA-TAR-001, DRV-TA-TAR-002, DRV-TA-TAR-003, DRV-TA-TAR-004, DRV-TA-TAR-005]
next_step: "s03 Open Questions"
```

## Handoff
- Problem: ARCHIVED must not coexist with active blockers; the current CR-008 parent does.
- Non-goals: historical mutation, text inference, and implicit implementation approval are excluded.
- Step 3: compare bounded options for unresolved identity, operation, authority, collection, compatibility, and cleanup decisions.
