---
artifact_id: "terminal-archive-legacy-state-reconciliation.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "terminal-archive-legacy-state-reconciliation"
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
change_id: "CR-009"
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
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-09-16T12:50:27Z"
  contract_reviewed_by: ["developer"]
  contract_reviewed_at: "2026-09-16T12:50:27Z"
  dor_reviewed_by: ["ba","qc"]
  dor_reviewed_at: "2026-09-16T12:50:27Z"
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
  - "terminal-archive-legacy-state-reconciliation.s01.restate.md"
  - "terminal-archive-legacy-state-reconciliation.s02.business-goal.md"
  - "terminal-archive-legacy-state-reconciliation.s03.open-questions.md"
linked_artifacts:
  - "product-specs/cards/terminal-archive-legacy-state-reconciliation.md"
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Human approval for BA Spec, Developer Contract, and BA/QC DoR is recorded for the exact Spec Card and this note. Trusted gate receipts remain separate and pending; no implementation gate is opened by authoring or reviewing alone.

## Step Contract
```yaml
step: s04
goal: "Make the archive invariant, disposition contract, and compatibility obligations testable before choosing an implementation approach."
value: "BA, Developer, and QC can review one bounded public contract without inferring decisions from historical text."
scope_in:
  - "Lock CR-009 requirements and AC-TAR-01..10 in the Spec Card."
  - "Propose the supported CLI and resolved-state data contract for Developer review."
  - "Assess DoR and brownfield compatibility using s01-s03 evidence."
scope_out:
  - "Choose persistence mechanics or implement production behavior."
  - "Dispose live CR-008 entries, reopen its release, or clean its worktree."
inputs_required:
  - "Maintainer-approved CR-009 and work-item receipts."
  - "s01 SA/TA drivers, s02 business goal, and s03 OQ-TAR-001..007 decisions."
  - "Current protocol runtime, report corpus, and CR-008 archive evidence."
outputs_required:
  - "Draft Spec Card with requirements, public contract, and AC-TAR-01..10."
  - "This s04 baseline, governance check, and DoR assessment."
done_when:
  - "Every requirement and public-contract behavior is covered by a measurable AC."
  - "Existing behavior, compatibility, and rollback boundaries are explicit."
  - "No open question forces the Developer to invent a contract in s05."
  - "BA Spec, Developer Contract, and BA+QC DoR reviews are separately recorded before s05 is opened."
constraints:
  hard_constraints:
    - "No archive with active blockers."
    - "Exact original legacy text remains in append-only history after explicit disposition."
    - "No core transition interprets display text."
  soft_constraints:
    - "Use the smallest compatible extension of the existing wfc protocol."
  prohibited_actions:
    - "Do not treat OQ approval as a Spec, Contract, or DoR gate receipt."
    - "Do not mutate CR-008 historical reports or published v2.6.2 evidence."
  compliance_checks:
    - "Map archive rejection to AC-TAR-01 and 09."
    - "Map exact history to AC-TAR-03, 05, 08, and 09."
    - "Map no text inference to AC-TAR-02 and 04."
risks:
  - id: R-TAR-S04-01
    description: "A public CLI shape is treated as approved before Developer contract review."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Keep card contract_status PROPOSED and s04 Contract Baseline PARTIAL until a trusted Developer receipt exists."
    contingency: "Amend the card and re-review all affected s04 gates before s05."
    owner: developer
    status: OPEN
timebox:
  target_duration: "one authoring and human review cycle"
  deadline: ""
  escalation_rule: "If a criterion changes the approved OQ direction, return to s03 for a new human decision."
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "product-specs/cards/terminal-archive-legacy-state-reconciliation.md"
approved_spec_digests:
  - ref: "product-specs/cards/terminal-archive-legacy-state-reconciliation.md"
    sha256: "a8b23b62de1003fb108593871d9a3be3d52b17551b6144ef77571a4f16abb6bf"
decision_notes:
  - "BA accepted Spec for REQ-TAR-01..06 and AC-TAR-01..10 on 2026-09-16; the trusted receipt is pending."
```

## Contract Baseline
```yaml
status: APPROVED
api_contract_refs:
  - "product-specs/cards/terminal-archive-legacy-state-reconciliation.md#Public Contract"
ux_contract_refs: []
notes:
  - "Developer accepted the additive status inventory, dispose-state operation, optional resolved_state_history[], and archive guard on 2026-09-16; the trusted receipt is pending."
  - "No release gate is inferred from this authoring step."
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "packages/workflow-bundle/scripts/work-item-protocol.js: archive currently permits the CR-008 parent to remain ARCHIVED with two active legacy blockers."
  - "packages/workflow-bundle/scripts/work-item-protocol-utils.js: legacy strings are normalized for dual-read and the protocol report owns active blockers and required_actions."
  - "changes/CR-008/archive-metadata.md#Branch Finish Audit: HOLD_OPEN due to F-CR008-ARCH-001."
impacted_surfaces:
  - "wfc work-item public CLI status and disposition behavior."
  - "Persisted report readers and terminal state transitions."
  - "Protocol fixtures and validators."
compatibility_constraints:
  - "Existing tracked reports load without bulk migration; recount corpus at s08."
  - "Existing fields and approved CR-008/v2.6.2 evidence remain intact."
rollback_constraints:
  - "Do not alter published v2.6.2; if the new operation fails before release, retain its old artifacts and keep CR-008 branch HOLD_OPEN."
```

## Artifact Chính
```yaml
acceptance_criteria:
  - { id: AC-TAR-01, criterion: "Spec Card AC-TAR-01", verification: "Archive rejection fixture for every active blocker kind and unchanged report." }
  - { id: AC-TAR-02, criterion: "Spec Card AC-TAR-02", verification: "Status inventory and invalid/stale/duplicate-ID fixtures across both collections." }
  - { id: AC-TAR-03, criterion: "Spec Card AC-TAR-03", verification: "Authorized disposition fixture and exact history-field assertions." }
  - { id: AC-TAR-04, criterion: "Spec Card AC-TAR-04", verification: "Core-transition scan and adversarial text fixtures." }
  - { id: AC-TAR-05, criterion: "Spec Card AC-TAR-05", verification: "Byte-equality checks for misleading and Unicode legacy text." }
  - { id: AC-TAR-06, criterion: "Spec Card AC-TAR-06", verification: "Idempotent retry and operation-ID conflict fixtures." }
  - { id: AC-TAR-07, criterion: "Spec Card AC-TAR-07", verification: "Failure injection at each persistence boundary." }
  - { id: AC-TAR-08, criterion: "Spec Card AC-TAR-08", verification: "Load full tracked report corpus and compare original text bytes." }
  - { id: AC-TAR-09, criterion: "Spec Card AC-TAR-09", verification: "CR-008 parent fixture before and after two explicit dispositions." }
  - { id: AC-TAR-10, criterion: "Spec Card AC-TAR-10", verification: "Diff and branch-finish audit against immutable v2.6.2 evidence." }
acceptance_criteria_ref: "product-specs/cards/terminal-archive-legacy-state-reconciliation.md#Acceptance Criteria"
acceptance_criteria_ids: [AC-TAR-01, AC-TAR-02, AC-TAR-03, AC-TAR-04, AC-TAR-05, AC-TAR-06, AC-TAR-07, AC-TAR-08, AC-TAR-09, AC-TAR-10]
edge_cases:
  - "Equal-text entries in one or both active collections must have distinct IDs."
  - "A stale snapshot ID, changed report, missing reason, wrong actor, and conflicting operation_id must fail closed."
  - "Failure before or after write must not leave entry removal without a matching history append."
  - "Unknown legacy strings with misleading approval/review words must remain active until selected by ID."
out_of_scope_ref: "product-specs/cards/terminal-archive-legacy-state-reconciliation.md#Business Goal.out_scope"
done_when:
  - "All ten ACs are testable and linked to the six requirements."
  - "The Developer can approve or reject one concrete proposed public contract."
  - "DoR has a reasoned evidence assessment, separate from its human receipt."
behavioral_invariants:
  - "ARCHIVED implies blockers[] is empty at transition time."
  - "Active-state removal by disposition has one exact history record and no text inference."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - "Public contract escalated to product_delivery with HARD_PUBLIC_CONTRACT and applicable BA/SA/TA/Developer/QC/PO roles."
  - "Work item and change have separate Maintainer trusted approvals."
  - "Human s04 reviews are recorded in gate_reviews; digest-bound trusted receipts are still missing."
blocking_items:
  - "Seal Spec, Contract, and DoR trusted receipts against the finalized s04 note."
owner: "ba"
next_action: "Human reviewers run the three interactive wfc gate approvals without editing the host note afterward."
```

## Definition of Ready
```yaml
work_item_slug: "terminal-archive-legacy-state-reconciliation"
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
  - "The exact report corpus size is remeasured at s08; initial observed count was 14."
residual_risks:
  - "The public contract is proposed and may change under Developer review."
  - "Atomic persistence mechanics remain for s05; AC-TAR-07 fixes the outcome to prove."
next_action: "Seal the three digest-bound trusted receipts before opening s05."
```

## Audit
```yaml
step: s04
status: PARTIAL
checks:
  - { criterion: "Every requirement and public-contract behavior has a measurable AC", result: PASS, evidence: "Spec Card REQ-TAR-01..06 and AC-TAR-01..10" }
  - { criterion: "Brownfield compatibility and rollback boundaries are explicit", result: PASS, evidence: "Existing System Baseline and Spec Card Business Goal" }
  - { criterion: "No unresolved question forces a contract invention in s05", result: PASS, evidence: "s03 OQ-TAR-001..007 RESOLVED; Developer accepted the Spec Card Public Contract" }
  - { criterion: "Separate BA, Developer, and QC s04 reviews are recorded", result: PASS, evidence: "User accepted the exact role/gate request; gate_reviews populated at 2026-09-16T12:50:27Z" }
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Draft completed in the current authoring session; human review remains outside the authoring timebox."
gaps:
  - "Spec, Contract, and DoR trusted receipts remain pending; status is not a gate pass until their hashes match this note."
risk_level: MEDIUM
next_action: "Human reviewers seal Spec, Contract, and DoR receipts; do not open s05 until all three are valid."
```

## Traceability
```yaml
upstream:
  - "changes/CR-009/proposal.md"
  - "terminal-archive-legacy-state-reconciliation.s01.restate.md"
  - "terminal-archive-legacy-state-reconciliation.s02.business-goal.md"
  - "terminal-archive-legacy-state-reconciliation.s03.open-questions.md"
requirement_refs: [REQ-TAR-01, REQ-TAR-02, REQ-TAR-03, REQ-TAR-04, REQ-TAR-05, REQ-TAR-06]
acceptance_criteria_ref: "product-specs/cards/terminal-archive-legacy-state-reconciliation.md#Acceptance Criteria"
next_step: "s05 Technical Approach only after independent s04 trusted gate receipts"
```

## Handoff
- BA Spec, Developer Contract, and BA+QC DoR human approvals are recorded; trusted receipts remain pending.
- s05 remains closed until the separate trusted receipts are present and digest-bound to this finalized s04 note.
