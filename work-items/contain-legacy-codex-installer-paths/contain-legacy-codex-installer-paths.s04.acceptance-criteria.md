---
artifact_id: "contain-legacy-codex-installer-paths.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "contain-legacy-codex-installer-paths"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: BUG
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
  card: "product-specs/cards/contain-legacy-codex-installer-paths.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "ta"
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "required"
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
  release: []
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: [ba]
  spec_reviewed_at: "2026-10-13T13:22:58Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: [ba, qc]
  dor_reviewed_at: "2026-10-13T13:22:58Z"
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
  - "contain-legacy-codex-installer-paths.s01.restate.md"
  - "contain-legacy-codex-installer-paths.s02.business-goal.md"
  - "contain-legacy-codex-installer-paths.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 — Acceptance + DoR

> [!summary]
> Six ACs and the CI/fixture contract are reviewable. AI DoR recommendation is READY; human Spec/DoR remain pending.

## Step Contract

```yaml
step: "s04"
step_goal: "Bind measurable acceptance to source baseline and state readiness honestly."
input_summary:
  - "Accepted parent containment scope and three verified Maintainer admission dispositions."
  - "Existing scripts at main 5a81126; user-selected Windows CI and the proposed source-bound fixture contract."
output_summary:
  - "Concrete draft artifact with owner, evidence and remaining gates."
done_when:
  - "The draft is reviewable and its missing inputs are explicit; this does not mean the human gate passed."
owner: "ba"
constraints:
  - "No production/test implementation, installer execution or signing by the agent."
timebox: "One authoring pass; unresolved external verification input remains explicit."
```

## Requirement Baseline

```yaml
status: "APPROVED"
approved_spec_refs:
  - "product-specs/cards/contain-legacy-codex-installer-paths.md"
approved_spec_digests:
  - "product-specs/cards/contain-legacy-codex-installer-paths.md: sha256:978229c0a52ca6f6e100b9455843dc24bdf3d9125d6e0de550a38b07e015307d"
approved_spec_ref: "product-specs/cards/contain-legacy-codex-installer-paths.md"
approved_spec_sha256: "978229c0a52ca6f6e100b9455843dc24bdf3d9125d6e0de550a38b07e015307d"
decision_notes:
  - "Parent scope acceptance is retained; the detailed child name/encoding/topology rules are now explicitly human-accepted."
  - "Card placement provides one spec owner without changing the CLI-selected SDD mode."
  - "Spec v0.2 incorporates the user-selected Windows CI and explicit three-job evidence; no human Spec receipt has been sealed."
```

## Contract Baseline

```yaml
status: "NOT_APPLICABLE"
api_contract_refs: []
ux_contract_refs: []
notes:
  - "No public API/event/data or UX contract is introduced. Installer input compatibility is explicit in the spec card."
```

## Existing System Baseline

```yaml
source_commit: "5a81126c69a0c6e193b416c7c93c5b8bb5277ec7"
current_behavior_refs:
  - "adapters/codex/install-codex-workflow.sh"
  - "adapters/codex/install-codex-workflow.ps1"
source_sha256:
  bash: "046b85485c6331596c78be75d13a72db75fdc9a6d1548aec5c432b796969b669"
  powershell: "3c531911114afd054cf70165966a0b5ce67ac499d04745e537f1358cdf2990d8"
impacted_surfaces:
  - "Direct managed-skill installation and stale cleanup."
compatibility_constraints:
  - "product-specs/cards/contain-legacy-codex-installer-paths.md#Input and Compatibility Contract"
rollback_constraints:
  - "Revert only the reviewed source/test commit; do not execute the reverted unsafe path or assume deleted user data can be restored."
```

## Main Artifact

```yaml
acceptance_criteria_ref: "product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria"
acceptance_criteria:
  - id: "AC-PI-001"
    criterion: "Apply AC-PI-001 from product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria; that card owns the normative text."
    verification: "Execute the corresponding spec fixture cases under the s05 CI Verification Contract, preserve source-bound results and map evidence to AC-PI-001 in s08."
  - id: "AC-PI-002"
    criterion: "Apply AC-PI-002 from product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria; that card owns the normative text."
    verification: "Execute the corresponding spec fixture cases under the s05 CI Verification Contract, preserve source-bound results and map evidence to AC-PI-002 in s08."
  - id: "AC-PI-003"
    criterion: "Apply AC-PI-003 from product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria; that card owns the normative text."
    verification: "Execute the corresponding spec fixture cases under the s05 CI Verification Contract, preserve source-bound results and map evidence to AC-PI-003 in s08."
  - id: "AC-PI-004"
    criterion: "Apply AC-PI-004 from product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria; that card owns the normative text."
    verification: "Execute the corresponding spec fixture cases under the s05 CI Verification Contract, preserve source-bound results and map evidence to AC-PI-004 in s08."
  - id: "AC-PI-005"
    criterion: "Apply AC-PI-005 from product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria; that card owns the normative text."
    verification: "Execute the corresponding spec fixture cases under the s05 CI Verification Contract, preserve source-bound results and map evidence to AC-PI-005 in s08."
  - id: "AC-PI-006"
    criterion: "Apply AC-PI-006 from product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria; that card owns the normative text."
    verification: "Execute the corresponding spec fixture cases under the s05 CI Verification Contract, preserve source-bound results and map evidence to AC-PI-006 in s08."
edge_cases_ref: "product-specs/cards/contain-legacy-codex-installer-paths.md#Fixture Matrix"
out_of_scope_ref: "product-specs/cards/contain-legacy-codex-installer-paths.md#Scope"
done_when:
  - "All six ACs have direct evidence at child s08, followed by human DoD and applicable Business Acceptance."
behavioral_invariants:
  - "Invalid input yields zero mutation before all validation completes."
  - "No claimed concurrency protection or silent skip of Windows evidence."
```

## Governance Checks

```yaml
checklist_applied:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
checks:
  - check: "Bounded ownership, human reviewer roles, rollback and compatibility risks recorded"
    status: "PASS"
  - check: "Disposable CI matrix and safe fixture invocation specified in s05; future platform preflight must pass before RED"
    status: "PASS"
blocking_items: []
owner: "ba/qc"
next_action: "Request human Spec/DoR on this exact spec digest and CI/fixture contract."
```

## Definition of Ready

```yaml
work_item_slug: "contain-legacy-codex-installer-paths"
status: "READY"
checks:
  restated_request_clear: "PASS"
  business_goal_clear: "PASS"
  scope_defined: "PASS"
  open_questions_non_blocking: "PASS"
  acceptance_criteria_testable: "PASS"
  dependencies_known: "PASS"
  verification_direction_present: "PASS"
blocking_gaps: []
accepted_assumptions:
  - "Parent-approved single-writer threat model."
residual_risks:
  - "Unusual historical/custom names or symlinked installations may now fail closed."
  - "Hosted image/engine/link capability is asserted in T1; mismatch stops execution and cannot be called a behavioral RED."
next_action: "Human BA/QC review of Spec/DoR; no approval implied by the AI READY recommendation."
```

## Traceability

```yaml
spec_ref: "product-specs/cards/contain-legacy-codex-installer-paths.md"
next_step: "s05 after DoR"
```

## Handoff

The user explicitly accepted packet `89131d9`. Content approval is recorded; trusted receipt sealing and CLI activation remain pending. The CLI lifecycle remains MATERIALIZED/s01 with no implementation grants.

## Human Approval Record

The repository owner replied **accept** to the explicit request covering Work-item, Spec/DoR, Approach A and Task Plan at checkpoint `89131d9`. Recorded at `2026-10-13T13:22:58Z` (recording time, not a claimed chat timestamp). This records the human decision, not an agent approval or a trusted signature. Scope, requirements, ACs, approach and task order are unchanged. Normal CLI sealing and verification must precede activation.
