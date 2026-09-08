---
artifact_id: "align-adaptive-sa-ta-applicability.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "align-adaptive-sa-ta-applicability"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: review
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
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
  - "qc"
review_mode: targeted
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
  dod: "required"
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
  release: []
  business_acceptance: []
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
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "align-adaptive-sa-ta-applicability.s01.restate.md"
  - "align-adaptive-sa-ta-applicability.s02.business-goal.md"
linked_artifacts:
  - "align-adaptive-sa-ta-applicability.work-item-report.json"
  - "../../packages/workflow-bundle/scripts/workflow-adaptive-governance.js"
  - "../../packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
  - "../../packages/workflow-bundle/test/scaffold-workflow.test.js"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Readiness for s04 is **READY**. BA, Developer, and QC approved OQ-AR-001 Option B; Developer and
> QC approved OQ-AR-002 Option A. The existing stable reason-code allowlists are normative and
> `workflow-adaptive-governance.test.js` owns the canonical semantic fixture.

## Step Contract
```yaml
step: "s03 Open Questions"
goal: >-
  Present bounded, evidence-based options and one recommendation for every unresolved decision
  that can change CF-019 acceptance criteria or verification ownership.
value: >-
  Prevent s04 from inventing a new reason-code taxonomy or choosing a fixture at the wrong contract
  boundary, while preserving explicit human authority over both decisions.
scope_in:
  - "Normative reason-code vocabulary for SA/TA applicability"
  - "Canonical owner of the no-trigger and trigger-positive semantic fixture"
  - "Conflicts between adaptive admission, generic skill wording, and existing runtime behavior"
  - "Readiness evidence and owner actions required before s04"
scope_out:
  - "Approve either recommendation on behalf of BA, Developer, or QC"
  - "Choose final policy wording or implementation structure"
  - "Add a new adaptive hard trigger or redesign the trigger taxonomy"
  - "Modify production policies, runtime copies, or tests"
inputs_required:
  - "PO-approved work-item trusted receipt"
  - "s01 architecture drivers and DRAFT-AC-AR-001..007"
  - "s02 KPI-AR-001..008 and INV-AR-001..004"
  - "Current adaptive-governance definitions and tests"
  - "Current source and packaged runtime policy clauses"
outputs_required:
  - "Open-question option matrix and recommendation bundle"
  - "Conflict and scope-drift dispositions"
  - "Canonical Input Readiness report"
  - "Evidence-based audit and exact human handoff"
done_when:
  - "Every open question has mutually exclusive options, trade-offs, a recommendation, and named approvers"
  - "Existing reason codes and fixture ownership are traced to repository evidence"
  - "Agent-introduced trigger-taxonomy drift is corrected rather than silently propagated"
  - "Adjacent approval idempotency evidence is recorded without expanding CF-019"
  - "The readiness verdict and next human action are explicit"
constraints:
  hard_constraints:
    - "No recommendation is treated as approved without explicit human decision"
    - "The approved CR-008 reason-code allowlists remain the baseline unless amended"
    - "The six current adaptive hard triggers cannot be weakened or silently expanded"
    - "s04 cannot open while either blocking decision is unresolved"
  soft_constraints:
    - "Prefer an existing canonical contract and test owner over a new parallel surface"
    - "Keep supporting integration and SA/TA contract tests at their current responsibility boundaries"
  prohibited_actions:
    - "Interpret the user's generic accept as approval of a bundle that did not yet exist"
    - "Use free-form reason text as normative machine-readable evidence"
    - "Move policy applicability ownership into the SA/TA skills"
    - "Absorb duplicate work-item approval behavior into this defect"
  compliance_checks:
    - "workflow-adaptive-governance.js exposes current lane, hard-trigger, role, and gate reason codes"
    - "workflow-adaptive-governance.test.js owns the golden lane, determinism, reason-entry, and hard-trigger matrix"
    - "scaffold-workflow.test.js owns generated-note integration behavior"
    - "architecture-role-skills-contract.test.js owns SA/TA output contracts rather than workflow admission"
risks:
  - id: "R-S03-AR-001"
    description: "A new reason namespace duplicates current constants and creates migration drift."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Recommend the existing allowlists as normative and permit human-readable explanation as additive metadata only."
    contingency: "Return to s03 if a missing semantic cannot be expressed by an existing code."
    owner: "ba/developer/qc"
    status: MONITORING
  - id: "R-S03-AR-002"
    description: "A fixture at the SA/TA skill boundary can pass while the router/policy contradiction remains."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Place the canonical semantic matrix with adaptive governance and retain downstream suites as supporting regressions."
    contingency: "Block s04 if the chosen fixture cannot demonstrate the current fail-first contradiction."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S03-AR-003"
    description: "The duplicate approve event becomes an unreviewed expansion of CF-019."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Record OBS-AR-001 as an adjacent follow-up and keep CF-019 scoped to applicability."
    contingency: "Create or link a separate approved BUG if the behavior is prioritized."
    owner: "po/developer/qc"
    status: MONITORING
timebox:
  target_duration: "one evidence and recommendation pass"
  deadline: "before s04 Acceptance + DoR authoring"
  escalation_rule: "Remain BLOCKED until the named human roles explicitly decide both recommendations."
```

## Main Artifact
```yaml
open_questions:
  - id: "OQ-AR-001"
    question: "Which reason-code vocabulary is normative for conditional SA/TA applicability?"
    owners: ["ba", "developer", "qc"]
    blocking_step: "s04"
    status: "APPROVED"
    decision: "Option B"
    approved_by: ["ba", "developer", "qc"]
    approved_at: "2026-09-08T04:39:20Z"
    options:
      - id: "A"
        direction: "Allow free-form reason strings wherever a role is derived."
        benefits:
          - "Lowest immediate authoring constraint."
        costs_risks:
          - "Cannot be reliably validated, compared, sanitized, or kept stable across runtimes."
          - "Duplicates existing allowlists and weakens audit semantics."
        verdict: "REJECT"
      - id: "B"
        direction: >-
          Reuse the existing LANE_*, HARD_*, ROLE_*, and GATE_* constants from
          workflow-adaptive-governance.js as the normative machine-readable allowlists; permit a
          separate human-readable explanation that never substitutes for a code.
        benefits:
          - "Matches current runtime behavior and telemetry sanitization."
          - "Avoids a new migration and provides stable validation targets."
          - "Keeps role-specific SA and TA reasons explicit."
        costs_risks:
          - "Any genuinely missing semantic requires a reviewed additive constant."
        verdict: "RECOMMENDED"
      - id: "C"
        direction: "Create a new generic ARCH_* namespace and migrate current role reasons."
        benefits:
          - "Could look conceptually uniform."
        costs_risks:
          - "Duplicates existing constants, changes a public evidence contract, and expands release scope."
        verdict: "REJECT"
    recommendation: "Option B"
    recommendation_reason: >-
      It is the smallest correct choice: current code already exposes stable lane, hard-trigger,
      role, and gate allowlists, including ROLE_SA_* and ROLE_TA_* values required by CF-019.
    approval_record: "Satisfied by BA, Developer, and QC at 2026-09-08T04:39:20Z."
  - id: "OQ-AR-002"
    question: "Which fixture should own the canonical no-trigger versus trigger-positive semantic matrix?"
    owners: ["developer", "qc"]
    blocking_step: "s05"
    status: "APPROVED"
    decision: "Option A"
    approved_by: ["developer", "qc"]
    approved_at: "2026-09-08T04:39:20Z"
    options:
      - id: "A"
        direction: >-
          Extend workflow-adaptive-governance.test.js as the canonical semantic matrix; keep
          scaffold-workflow.test.js as generated-artifact integration evidence and
          architecture-role-skills-contract.test.js as SA/TA contract regression evidence.
        benefits:
          - "Places behavior tests next to the router and reason-code authority."
          - "Already covers eight lanes, 20x determinism, reasoned entries, and six hard triggers."
          - "Preserves existing test ownership boundaries."
        costs_risks:
          - "Policy-text parity still needs a focused assertion or pack-audit supplement."
        verdict: "RECOMMENDED"
      - id: "B"
        direction: "Make architecture-role-skills-contract.test.js the canonical applicability fixture."
        benefits:
          - "The file already mentions SA and TA."
        costs_risks:
          - "It owns skill output contracts, not workflow admission or policy precedence."
          - "Can pass while router applicability remains wrong."
        verdict: "REJECT"
      - id: "C"
        direction: "Create a new standalone applicability-policy test file."
        benefits:
          - "Strong isolation and descriptive naming."
        costs_risks:
          - "Adds a parallel owner and duplicates the existing golden matrix for a small defect."
        verdict: "REJECT_UNLESS_EXISTING_FIXTURE_CANNOT_EXPRESS_FAIL_FIRST"
    recommendation: "Option A"
    recommendation_reason: >-
      Adaptive governance already owns the semantic contract and its golden matrix. Extending it is
      the smallest delta; scaffold and SA/TA suites remain supporting evidence rather than competing owners.
    approval_record: "Satisfied by Developer and QC at 2026-09-08T04:39:20Z."
missing_inputs: []
conflicts:
  - id: "CONFLICT-AR-001"
    sources:
      - "Adaptive Admission And Applicability: roles derive from named triggers"
      - "Generic Skill Requirement: use SA and TA at every s01-s04"
    conflict: "A downstream generic mandate can re-add roles the router omitted."
    disposition: "Human-approved Option B; s04 encodes router precedence and the stable reason-code allowlists as the contract."
    owner: "ba/developer/qc"
    blocking: false
  - id: "CONFLICT-AR-002"
    sources:
      - "Canonical and runtime policies are byte/semantically aligned"
      - "All aligned copies contain the same unconditional SA/TA sentence"
    conflict: "Copy parity proves consistency but does not prove correctness."
    disposition: "Human-approved Option A; the adaptive-governance fixture owns semantic expectations and runtime parity remains separate evidence."
    owner: "developer/qc"
    blocking: false
  - id: "CONFLICT-AR-003"
    sources:
      - "s01 draft wording mentioned multi-system as an adaptive hard trigger"
      - "workflow-adaptive-governance.js defines exactly six current hard triggers and no multi_system trigger"
    conflict: "The s01 wording accidentally mixed SDD-Light escalation vocabulary into adaptive admission."
    disposition: >-
      Correct s01 to the existing six-trigger baseline. Adding multi_system would require a separate
      reviewed scope amendment and is not part of CF-019.
    owner: "agent/ba"
    blocking: false
assumptions:
  - "Existing reason codes are already a public evidence surface and should remain backward compatible."
  - "Human-readable rationale may be additive but cannot replace a stable machine-readable code."
  - "CF-019 corrects authority precedence; it does not redesign the role derivation algorithm."
  - "The parent CR-008 worktree remains the delivery and candidate-isolation boundary."
follow_up_observations:
  - id: "OBS-AR-001"
    title: "Repeated work-item approve mutates report history while retaining the original trusted receipt"
    evidence: >-
      Two approve events were recorded at 03:03:41Z and 03:29:34Z, while the trusted receipt stayed
      bound to the first approval. Derived reviewed_at was normalized back to the receipt time.
    current_scope: "OUT_OF_SCOPE"
    recommended_action: "Link to the approval-path/idempotency remediation stream; do not expand CF-019."
```

## Input Readiness
```yaml
step: "s04 Acceptance + DoR"
status: READY
available_inputs:
  - "PO-approved work-item trusted receipt"
  - "OQ-CF-004 Option C approval by PO, BA, Developer, and QC"
  - "s01 requirement analysis and architecture drivers"
  - "s02 measurable business outcomes and invariants"
  - "Existing reason-code constants in workflow-adaptive-governance.js"
  - "Existing semantic, scaffold-integration, and SA/TA contract test boundaries"
  - "Exact contradictory clauses in all three policy surfaces"
missing_inputs: []
invalid_inputs: []
conflicts:
  - "CONFLICT-AR-001 is resolved by human-approved OQ-AR-001 Option B."
  - "CONFLICT-AR-002 is resolved by human-approved OQ-AR-002 Option A."
  - "CONFLICT-AR-003 is corrected to the existing scope and does not block s04."
assumptions:
  - "OQ-AR-001 Option B and OQ-AR-002 Option A are explicit human decisions, not inferred approvals."
  - "No new hard-trigger taxonomy is needed to resolve CF-019."
risk_level: HIGH
next_action: "Draft s04 Spec, Contract, and DoR for independent human gate review."
```

## Audit
```yaml
step: "s03 Open Questions"
status: PASS
checks:
  - criterion: "Every open question has options, trade-offs, a recommendation, and approvers"
    result: PASS
    evidence: "OQ-AR-001 and OQ-AR-002 each contain mutually exclusive options and exact approval roles."
  - criterion: "Recommendations trace to repository evidence"
    result: PASS
    evidence: "OQ-AR-001 cites current constant families; OQ-AR-002 cites the existing semantic and supporting test boundaries."
  - criterion: "Agent-introduced taxonomy drift is corrected"
    result: PASS
    evidence: "CONFLICT-AR-003 restores the exact six-trigger adaptive baseline and excludes a new trigger from scope."
  - criterion: "Adjacent approval behavior does not expand CF-019"
    result: PASS
    evidence: "OBS-AR-001 is explicitly OUT_OF_SCOPE with a separate remediation handoff."
  - criterion: "Readiness verdict and next human action are explicit"
    result: PASS
    evidence: "Input Readiness is READY after both decisions were explicitly approved by their named roles."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one bounded evidence and recommendation pass."
gaps: []
risk_level: HIGH
next_action: "Author s04 Spec, Contract, and DoR proposal; retain separate human-controlled gate approvals."
```

## Traceability
```yaml
upstream:
  - "align-adaptive-sa-ta-applicability.s01.restate.md"
  - "align-adaptive-sa-ta-applicability.s02.business-goal.md"
  - "../../packages/workflow-bundle/scripts/workflow-adaptive-governance.js"
  - "../../packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
outputs:
  - "OQ-AR-001 decision: Option B, approved by BA, Developer, and QC"
  - "OQ-AR-002 decision: Option A, approved by Developer and QC"
  - "CONFLICT-AR-001..003 dispositions"
  - "OBS-AR-001 out-of-scope follow-up"
next_step: "s04 Acceptance + DoR proposal"
```

## Handoff
- Readiness: READY; both open questions have explicit human decisions.
- Approved bundle: OQ-AR-001 Option B by BA/Developer/QC; OQ-AR-002 Option A by Developer/QC.
- Condition for s04 authoring: met. Spec, Contract, and DoR remain separate human-controlled gates.
