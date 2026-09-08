---
artifact_id: "align-adaptive-sa-ta-applicability.s01.restate"
artifact_family: workflow-step
work_item_slug: "align-adaptive-sa-ta-applicability"
step_id: "s01"
step_slug: "restate"
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
  - "sa"
  - "ta"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "work-items/code-factory-holistic-audit-remediation/code-factory-holistic-audit-remediation.s03.open-questions.md"
  - "work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s01.restate.md"
  - "changes/CR-008/proposal.md"
linked_artifacts:
  - "align-adaptive-sa-ta-applicability.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Align the repository's SA/TA skill requirement with CR-008 adaptive admission: SA and TA are
> required only when a named architecture trigger applies, while all hard-risk triggers remain
> deterministic and auditable.

## Step Contract
```yaml
step: "s01 Clarify"
goal: >-
  Lock the CF-019 defect boundary, architecture-driver evidence, and safe handoff without selecting
  a technical solution or granting implementation authority.
value: >-
  Remove the contradiction that can re-introduce unconditional SA/TA ceremony after the adaptive
  router has correctly classified those roles as not applicable.
scope_in:
  - "Clarify the conflicting policy clauses and the intended Option C semantics"
  - "Define draft acceptance criteria for trigger-based SA/TA participation"
  - "Extract SA and TA architecture drivers without choosing an approach"
  - "Link the child defect to CR-008 and its parent release work item"
scope_out:
  - "Approve the child work item or any downstream gate"
  - "Choose the final policy wording, rule-source structure, or test location"
  - "Modify production policy, runtime copies, validators, or tests"
  - "Release, merge, tag, publish, or install CR-008"
inputs_required:
  - "PO, BA, Developer, and QC approval of OQ-CF-004 Option C"
  - "The master holistic-audit remediation artifacts"
  - "CR-008 policy and runtime copies containing the conflicting clauses"
outputs_required:
  - "Normalized defect statement and scope"
  - "Draft measurable acceptance criteria"
  - "SA and TA driver handoffs"
  - "Owned open questions for s03"
done_when:
  - "The contradiction and intended Option C behavior are explicit"
  - "Every architecture driver has provenance, threshold, verification, and handoff"
  - "The child work-item approval is recorded through a valid PO trusted receipt before s02"
constraints:
  hard_constraints:
    - "The workflow router remains the authority for role applicability"
    - "Public-contract, migration, security-sensitive, regulated, greenfield-foundation, and release triggers cannot be downgraded"
    - "Human-controlled gates remain explicit trusted receipts"
    - "Codex and Claude runtime policy semantics remain aligned with the source policy"
  soft_constraints:
    - "Prefer the smallest policy and fixture delta that resolves CF-019"
    - "Reuse CR-008 instead of creating a second change package"
  prohibited_actions:
    - "Treat OQ approval as work-item approval"
    - "Enter s02 or implementation before the applicable human action"
    - "Alter unrelated user WIP or historical release tags"
risks:
  - id: "R-AR-001"
    description: "Generic wording continues to override the router and recreates unconditional SA/TA participation."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Make router precedence and named trigger semantics explicit and cover them with semantic fixtures."
    contingency: "Keep the CR-008 release worktree open and block release until parity evidence passes."
    owner: "developer"
    status: OPEN
  - id: "R-AR-002"
    description: "Relaxed wording accidentally suppresses SA/TA for hard-risk work."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Retain an enumerated hard-trigger matrix and negative downgrade tests."
    contingency: "Revert the child delta while retaining the parent CR-008 baseline."
    owner: "qc"
    status: OPEN
timebox:
  target_duration: "one focused authoring pass"
  deadline: ""
  escalation_rule: "Move unresolved vocabulary or fixture ownership to s03; do not invent it in s01."
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Router before action"
  - "AI proposes; human approves"
  - "Applicable roles and gates must follow deterministic risk triggers"
  - "Brownfield changes use the smallest correct delta"
  - "Source policy and packaged runtimes require semantic parity"
required_reviews:
  - "PO approval of this child work item before s02: complete through trusted receipt"
  - "BA and QC review of Spec and DoR at s04"
  - "Developer review of Approach and Task Plan before s07"
  - "QC review of spec compliance, code quality, Technical Verification, and DoD"
prohibited_actions:
  - "Use the generic SA/TA requirement to bypass the router's applicability result"
  - "Remove or weaken any hard-risk trigger"
  - "Infer work-item approval from OQ-CF-004 approval"
  - "Finalize the parent release while this linked defect is unresolved"
open_governance_questions:
  - "OQ-AR-001: Which stable reason-code vocabulary must be normative? Owner: BA/Developer/QC"
  - "OQ-AR-002: Which fixture is the canonical semantic-parity test? Owner: Developer/QC"
```

## Main Artifact
```yaml
raw_request: >-
  Approve OQ-CF-004 Option C with PO, BA, Developer, and QC roles.
restated_request: >-
  Adopt Option C as the proposal direction: the adaptive router decides whether SA and TA apply;
  the generic skill requirement must defer to that result, while named hard-risk triggers still
  require the corresponding architecture roles. Materialize a linked child defect proposal only.
request_type: BUG
user_problem_initial: >-
  The repository simultaneously says SA/TA are conditionally selected by adaptive admission and
  that they must always run during s01-s04, which can recreate the role friction CR-008 was designed
  to remove.
business_context_initial: >-
  Code-Factory needs fewer irrelevant role acknowledgements without losing architecture oversight
  when a request changes public contracts, migrations, security, regulated evidence, foundations, or release scope.
scope_draft:
  in:
    - "Reconcile the source Codex policy's Adaptive Admission rule and Skill Requirement"
    - "Apply semantically equivalent wording to packaged Codex and Claude runtime policies"
    - "Add or update semantic fixtures for no-trigger and trigger-positive cases"
    - "Preserve reason-code evidence and release traceability under CR-008"
  out:
    - "Change the SA or TA skill contracts themselves"
    - "Redesign adaptive admission, approval bundling, or trusted receipts"
    - "Create a new change package"
    - "Modify unrelated work items or user WIP"
constraints_initial:
  - "The router's applicable/not_applicable result is authoritative"
  - "Hard escalation always overrides a low-ceremony request or preset"
  - "The child is brownfield, full-track, strict-governance, and linked to CR-008"
  - "Source and packaged runtime copies must remain semantically equivalent"
assumptions_initial:
  - "Option C means conditional-by-router applicability, not removal of SA/TA"
  - "The existing trigger taxonomy remains valid unless s03 finds a vocabulary gap"
  - "A focused policy and fixture delta is sufficient; no new service or schema is needed"
open_questions_initial:
  - id: "OQ-AR-001"
    question: "Which stable reason-code vocabulary must be normative across router, policy, and fixtures?"
    owner: "ba/developer/qc"
    blocking_step: "s04"
  - id: "OQ-AR-002"
    question: "Which existing test file should own the canonical no-trigger versus trigger-positive semantic matrix?"
    owner: "developer/qc"
    blocking_step: "s05"
dependencies_initial:
  - "CR-008 parent work item and approved change package"
  - "Adaptive Admission policy clauses in source and runtime copies"
  - "Existing policy, routing, SA/TA, pack-audit, and runtime-parity tests"
risks_initial:
  - "Generic policy wording continues to reintroduce unconditional roles"
  - "A wording change creates an unsafe architecture-role downgrade"
  - "Source and runtime policy copies drift"
  - "A keyword-only test passes while semantics remain contradictory"
notes_for_step_2: >-
  Define the user and operational value of resolving CF-019, including zero irrelevant architecture
  role actions for no-trigger maintenance and zero missed role assignments for hard-trigger cases.
```

## Requirement Analysis Spec
```yaml
raw_request: "Approve OQ-CF-004 Option C with PO, BA, Developer, and QC roles."
restated_request: >-
  Reconcile the unconditional SA/TA skill requirement with adaptive admission so the router's
  trigger-based applicability result is authoritative and high-risk escalation remains mandatory.
request_type: BUG
business_context: >-
  CF-019 is a policy contradiction inside CR-008. If it remains unresolved, users can still be
  forced through irrelevant SA/TA role handling despite the approved adaptive-governance direction.
scope_in:
  - "Source Codex policy wording"
  - "Packaged Codex and Claude runtime policy wording"
  - "No-trigger and trigger-positive semantic fixtures"
  - "CR-008 child-work-item traceability"
scope_out:
  - "Change SA/TA internal output contracts"
  - "Redesign the router or approval subsystem"
  - "Create a new change package"
  - "Finalize the parent release"
open_questions:
  - "OQ-AR-001 reason-code vocabulary; owner BA/Developer/QC"
  - "OQ-AR-002 semantic-fixture ownership; owner Developer/QC"
assumptions:
  - "The existing hard-trigger taxonomy remains the baseline"
  - "A focused policy and fixture delta can resolve the defect"
dependencies:
  - "CR-008 approved change package"
  - "Adaptive governance parent work item"
  - "Existing routing and policy test harnesses"
risks_initial:
  - "Unconditional wording remains effective through one runtime copy"
  - "Conditional wording allows an unsafe downgrade"
  - "Fixtures assert keywords instead of end-to-end semantics"
acceptance_criteria_draft:
  - id: "DRAFT-AC-AR-001"
    description: "A no-trigger maintenance fixture yields zero SA/TA execution roles, zero SA/TA pending actions, and zero SA/TA gates."
    measurable: true
  - id: "DRAFT-AC-AR-002"
    description: "Each named architecture hard-trigger fixture retains the expected SA and/or TA role with at least one stable reason code."
    measurable: true
  - id: "DRAFT-AC-AR-003"
    description: "The generic skill requirement explicitly defers to the router and cannot re-add a role marked not_applicable."
    measurable: true
  - id: "DRAFT-AC-AR-004"
    description: "Source Codex, packaged Codex, and packaged Claude policies express equivalent conditional applicability semantics."
    measurable: true
  - id: "DRAFT-AC-AR-005"
    description: "A fail-first semantic fixture demonstrates the current contradiction before the corrective delta is applied."
    measurable: true
  - id: "DRAFT-AC-AR-006"
    description: "Existing policy, routing, SA/TA contract, runtime parity, pack-audit, and workflow validations remain green."
    measurable: true
  - id: "DRAFT-AC-AR-007"
    description: "The child hands an exact candidate SHA to CR-008 without independently approving Release, Business Acceptance, merge, tag, publish, or install."
    measurable: true
notes_for_next_step: >-
  The PO trusted receipt opened s02. Business value and success measures are now captured in s02;
  proceed to s03 to resolve OQ-AR-001 and OQ-AR-002.
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
    - id: "OBJ-AR-001"
      statement: "Eliminate irrelevant SA/TA workflow obligations for requests with no architecture trigger."
      measure: "No-trigger maintenance fixtures produce 0 SA/TA roles, pending actions, or gates."
      source: "OQ-CF-004 Option C approved by PO, BA, Developer, and QC"
      confidence: stated
    - id: "OBJ-AR-002"
      statement: "Preserve architecture oversight for requests with a named hard-risk trigger."
      measure: "100% of the approved trigger matrix produces the expected architecture roles and reason codes."
      source: "Adaptive Admission hard-trigger policy"
      confidence: stated
    - id: "OBJ-AR-003"
      statement: "Keep policy semantics aligned across canonical and packaged runtime surfaces."
      measure: "0 semantic parity findings across source Codex, runtime Codex, and runtime Claude policies."
      source: "CR-008 runtime parity contract"
      confidence: stated
drivers:
  applicable: true
  reason: ""
  items:
    - id: "SA-DRV-AR-001"
      kind: system_boundary
      statement: "The workflow router owns SA/TA applicability; a downstream generic skill requirement may not re-add a role marked not_applicable."
      origin:
        stakeholder: "user"
        concern: "fixed architecture roles make ordinary non-product requests frustrating"
        constraint_ref: "OQ-CF-004 Option C"
      traces_to: ["OBJ-AR-001", "OBJ-AR-002"]
      threshold:
        status: quantified
        value: "0 downstream role re-additions across the routing fixture matrix"
        reason: ""
      verification: "Inspect the policy precedence contract and assert normalized router output against downstream required actions."
      architectural_significance: "This is the authority seam between request admission and step-skill invocation."
      priority: high
    - id: "SA-DRV-AR-002"
      kind: constraint
      statement: "Named architecture and hard-risk triggers remain mandatory and override any lower-ceremony preference."
      origin:
        stakeholder: "governance owner"
        concern: "friction reduction must not suppress material architecture review"
        constraint_ref: "Adaptive Admission And Applicability"
      traces_to: ["OBJ-AR-002"]
      threshold:
        status: quantified
        value: "100% expected-role match and 0 accepted downgrades for approved trigger fixtures"
        reason: ""
      verification: "Run public-contract, migration, security-sensitive, regulated, greenfield-foundation, and release fixtures."
      architectural_significance: "The trigger boundary protects governance while conditional applicability reduces ceremony."
      priority: high
    - id: "SA-DRV-AR-003"
      kind: data_ownership
      statement: "The source Codex policy owns applicability semantics; packaged Codex and Claude policies remain derived equivalents."
      origin:
        stakeholder: "bundle maintainer"
        concern: "distributed policy copies can impose different role obligations"
        constraint_ref: "workflow-bundle canonical/runtime ownership"
      traces_to: ["OBJ-AR-003"]
      threshold:
        status: quantified
        value: "0 semantic differences across 3 policy surfaces"
        reason: ""
      verification: "Run runtime sync/parity checks and inspect the conditional rule in all three surfaces."
      architectural_significance: "Policy ownership prevents installed clients from diverging from repository governance."
      priority: high
    - id: "SA-DRV-AR-004"
      kind: constraint
      statement: "CF-019 stays a linked child defect under CR-008 and does not create a second change authority."
      origin:
        stakeholder: "release owner"
        concern: "duplicate change packages would fragment release and rollback traceability"
        constraint_ref: "CR-008 parent release boundary"
      traces_to: ["OBJ-AR-003"]
      threshold:
        status: quantified
        value: "1 owning change package and 0 duplicate change records"
        reason: ""
      verification: "Validate child references to CR-008 and confirm no new change scaffold exists."
      architectural_significance: "One release authority keeps candidate evidence and rollback ownership coherent."
      priority: medium
landscape:
  applicable: false
  reason: "The defect changes one repository-local policy authority seam and does not move a system or integration topology."
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
    - pair: ["OBJ-AR-001", "OBJ-AR-002"]
      nature: "Reducing irrelevant roles must not weaken hard-trigger architecture oversight."
      owner: "po/ba/developer/qc"
  unquantified_nfrs: []
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability: []
metrics:
  applicable: true
  items:
    - { id: "M-01", applicable: true, reason: "", name: "Objective traceability", formula: "drivers tracing to objectives / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "traces_to on SA-DRV-AR-001..004" }
    - { id: "M-02", applicable: true, reason: "", name: "Objective support", formula: "supported objectives / total objectives", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "OBJ-AR-001..003 each have drivers" }
    - { id: "M-03", applicable: true, reason: "", name: "Driver provenance", formula: "anchored drivers / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "origin on every SA driver" }
    - { id: "M-04", applicable: true, reason: "", name: "NFR quantification", formula: "quantified drivers / drivers where numbers are meaningful", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "numeric thresholds on every SA driver" }
    - { id: "M-05", applicable: true, reason: "", name: "Verification coverage", formula: "drivers with verification / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "verification on every SA driver" }
    - { id: "M-06", applicable: true, reason: "", name: "Handoff coverage", formula: "drivers in at least one handoff / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "BA, DEV, and QC handoffs" }
    - { id: "M-07", applicable: true, reason: "", name: "Open-item ownership", formula: "owned open items / total open items", value: "2/2 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "OQ-AR-001..002 owners" }
    - { id: "M-08", applicable: false, reason: "Technical options are not selected at s01.", name: "Option discipline", formula: "direction choices with alternatives / total choices", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "s05 not opened" }
    - { id: "M-09", applicable: false, reason: "No landscape is required.", name: "Landscape element ownership", formula: "owned elements / total elements", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "landscape.applicable = false" }
    - { id: "M-10", applicable: true, reason: "", name: "Capability ownership clarity", formula: "capabilities with one owner / capabilities in scope", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "router, source policy, and derived runtime ownership are explicit" }
handoff:
  to_ba:
    applicable: true
    reason: ""
    items:
      - "Lock no-trigger and trigger-positive behavior as measurable acceptance criteria."
      - "Resolve the normative reason-code vocabulary in OQ-AR-001."
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Preserve router authority and canonical-to-runtime ownership at s05."
      - "Choose the smallest correction that cannot be overridden by generic wording."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Verify zero role re-additions, zero unsafe downgrades, and zero runtime parity findings."
  to_devops:
    applicable: false
    reason: "No packaging or deployment decision is made in s01; parent CR-008 owns release coordination."
    items: []
stop_condition:
  met: true
  reason: "The s01 driver set and PO work-item approval are complete; the two owned decisions are handed to s03."
  pushed_to_s03:
    - { question: "Which reason-code vocabulary is normative?", owner: "ba/developer/qc" }
    - { question: "Which fixture owns the semantic matrix?", owner: "developer/qc" }
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
objectives:
  applicable: false
  reason: "owned by /sa"
  items: []
drivers:
  applicable: true
  reason: ""
  items:
    - id: "TA-DRV-AR-001"
      kind: quality_attribute
      statement: "Role applicability must be deterministic for identical request and governance inputs."
      origin:
        stakeholder: "developer/qc"
        concern: "policy prose must not produce inconsistent role obligations"
        constraint_ref: "OQ-CF-004 Option C"
      traces_to: ["OBJ-AR-001", "OBJ-AR-002"]
      threshold:
        status: quantified
        value: "100% identical normalized role, action, gate, and reason-code output across repeated fixture runs"
        reason: ""
      verification: "Repeat the no-trigger and trigger-positive matrix and compare normalized output."
      architectural_significance: "Determinism is necessary for auditability and stable human expectations."
      priority: high
    - id: "TA-DRV-AR-002"
      kind: quality_attribute
      statement: "The no-trigger path and every hard-trigger path must be tested semantically rather than by keyword presence alone."
      origin:
        stakeholder: "qc"
        concern: "text can appear correct while downstream behavior remains contradictory"
        constraint_ref: "CF-019 reviewed finding"
      traces_to: ["OBJ-AR-001", "OBJ-AR-002"]
      threshold:
        status: quantified
        value: "1 fail-first no-trigger fixture plus 100% expected outcomes across the hard-trigger matrix"
        reason: ""
      verification: "Demonstrate RED on the current contradictory policy, then GREEN after the smallest corrective delta."
      architectural_significance: "The fixture boundary proves behavior and prevents a phrase-only repair."
      priority: high
    - id: "TA-DRV-AR-003"
      kind: integration
      statement: "Canonical and generated runtime policies must expose equivalent applicability and precedence semantics."
      origin:
        stakeholder: "bundle operator"
        concern: "installed Codex or Claude clients may behave differently from repository source"
        constraint_ref: "workflow-bundle runtime sync contract"
      traces_to: ["OBJ-AR-003"]
      threshold:
        status: quantified
        value: "0 semantic parity findings and recursive runtime diff count = 0 after sync"
        reason: ""
      verification: "Run runtime generation/sync, recursive comparison, policy tests, and workflow pack audit."
      architectural_significance: "Runtime copies are the integration surface users actually execute."
      priority: high
    - id: "TA-DRV-AR-004"
      kind: constraint
      statement: "The change must preserve existing SA/TA contracts, workflow state rules, and trusted-receipt semantics."
      origin:
        stakeholder: "maintainer"
        concern: "a narrow applicability fix must not destabilize adjacent governance contracts"
        constraint_ref: "CR-008 compatibility boundary"
      traces_to: ["OBJ-AR-002", "OBJ-AR-003"]
      threshold:
        status: quantified
        value: "0 regressions in existing policy, router, SA/TA contract, protocol, and pack-audit suites"
        reason: ""
      verification: "Run the targeted suites first, followed by the parent candidate verification matrix."
      architectural_significance: "Compatibility limits the blast radius of the policy correction."
      priority: high
landscape:
  applicable: false
  reason: "No system topology or integration ownership boundary moves; only one policy authority seam is reconciled."
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
  conflicting_drivers: []
  unquantified_nfrs: []
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability: []
metrics:
  applicable: true
  items:
    - { id: "M-01", applicable: true, reason: "", name: "Objective traceability", formula: "drivers tracing to objectives / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "traces_to on TA-DRV-AR-001..004" }
    - { id: "M-02", applicable: false, reason: "Objectives are owned and measured by SA.", name: "Objective support", formula: "supported objectives / total objectives", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "objectives.reason = owned by /sa" }
    - { id: "M-03", applicable: true, reason: "", name: "Driver provenance", formula: "anchored drivers / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "origin on every TA driver" }
    - { id: "M-04", applicable: true, reason: "", name: "NFR quantification", formula: "quantified drivers / drivers where numbers are meaningful", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "numeric thresholds on every TA driver" }
    - { id: "M-05", applicable: true, reason: "", name: "Verification coverage", formula: "drivers with verification / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "verification on every TA driver" }
    - { id: "M-06", applicable: true, reason: "", name: "Handoff coverage", formula: "drivers in at least one handoff / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "DEV and QC handoffs" }
    - { id: "M-07", applicable: true, reason: "", name: "Open-item ownership", formula: "owned open items / total open items", value: "2/2 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "OQ-AR-001..002 owners" }
    - { id: "M-08", applicable: false, reason: "No technical option is selected at s01.", name: "Option discipline", formula: "direction choices with alternatives / total choices", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "s05 not opened" }
    - { id: "M-09", applicable: false, reason: "No landscape is required.", name: "Landscape element ownership", formula: "owned elements / total elements", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "landscape.applicable = false" }
    - { id: "M-10", applicable: false, reason: "Capability ownership is measured by the SA system lens.", name: "Capability ownership clarity", formula: "capabilities with one owner / total capabilities", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "SA metric M-10" }
handoff:
  to_ba:
    applicable: false
    reason: "owned by /sa"
    items: []
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Choose a focused precedence correction and explicit reason-code contract at s05."
      - "Use a fail-first semantic fixture before changing policy behavior."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Verify determinism, hard-trigger coverage, runtime parity, and adjacent-suite regression."
  to_devops:
    applicable: true
    reason: ""
    items:
      - "Keep the child candidate bound to the parent CR-008 release evidence and rollback path."
stop_condition:
  met: false
  reason: "Technical drivers are complete, but reason-code and canonical-fixture decisions remain open."
  pushed_to_s03:
    - { question: "Which reason-code vocabulary is normative?", owner: "ba/developer/qc" }
    - { question: "Which existing fixture owns the semantic matrix?", owner: "developer/qc" }
```

## Work Item Materialization
```yaml
materialization_status: READY
decision_owner: "agent"
raw_request_summary: "Make router-derived SA/TA applicability authoritative while preserving deterministic hard-risk escalation."
split_decision: single
dedup_result: no_conflict
work_item_slug: "align-adaptive-sa-ta-applicability"
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
  - "work-items/code-factory-holistic-audit-remediation/code-factory-holistic-audit-remediation.s03.open-questions.md"
  - "work-items/adaptive-governance-human-approval-ux"
  - "work-items/arch-role-skills-release"
  - "work-items/architecture-role-skills"
  - "work-items/sdd-light-authority-cutover"
  - "changes/CR-008"
blockers: []
```

## Work Item Protocol
```yaml
protocol_status: MATERIALIZED
approval_status: APPROVED
review_required: true
work_item_slug: "align-adaptive-sa-ta-applicability"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/cr-008-adaptive-governance/work-items/align-adaptive-sa-ta-applicability"
current_step: "s04"
granted_write_paths: []
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "agent"
protocol_owner: "po"
reviewed_by: "po"
reviewed_at: "2026-09-08T03:03:41.551Z"
handoff_target: "human-s04-receipt-sealing"
last_transition_action: "record-s04-human-gate-approvals"
last_transition_at: "2026-09-08T06:08:19Z"
required_actions:
  - "Human runs wfc gate approve for Spec with reviewed-by ba."
  - "Human runs wfc gate approve for Contract with reviewed-by developer."
  - "Human runs wfc gate approve for DoR with reviewed-by qc; joint BA/QC provenance remains in gate_reviews."
  - "Validate all three receipt digest matches before authoring s05."
blockers:
  - "SPEC_RECEIPT_PENDING"
  - "CONTRACT_RECEIPT_PENDING"
  - "DOR_RECEIPT_PENDING"
review_notes:
  - "Human review approved."
  - "Trusted work-item receipt is APPROVED by PO at 2026-09-08T03:03:41.551Z."
  - "A repeated approve invocation at 2026-09-08T03:29:34.925Z was retained in protocol history; the original trusted receipt remains authoritative."
  - "OQ-CF-004 Option C approval authorizes conditional SA/TA applicability but does not approve downstream workflow gates."
  - "OQ-AR-001 Option B was approved by BA, Developer, and QC at 2026-09-08T04:39:20Z."
  - "OQ-AR-002 Option A was approved by Developer and QC at 2026-09-08T04:39:20Z."
  - "BA approved Spec, Developer approved Contract, and BA/QC approved DoR at 2026-09-08T06:08:19Z."
  - "s04 is finalized; all three trusted receipts remain pending human CLI sealing."
refs:
  - "work-items/align-adaptive-sa-ta-applicability"
  - "work-items/adaptive-governance-human-approval-ux"
  - "changes/CR-008"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "S01_REQUIREMENT_AND_ARCHITECTURE_DRIVERS_DRAFTED"
  - "WORK_ITEM_APPROVED"
  - "S02_BUSINESS_GOAL_DRAFTED"
  - "S03_RECOMMENDATION_BUNDLE_DRAFTED"
  - "S03_OPEN_QUESTIONS_APPROVED"
  - "S04_SPEC_CONTRACT_DOR_DRAFTED"
  - "S04_HUMAN_GATES_APPROVED_PENDING_RECEIPTS"
```

## Traceability
```yaml
source_inputs:
  - "OQ-CF-004 Option C approval by PO, BA, Developer, and QC"
  - "CF-019 master audit finding"
  - "CR-008 Adaptive Admission And Applicability rule"
  - "Conflicting generic SA/TA Skill Requirement in source and packaged runtime policies"
next_step: "Seal Spec, Contract, and DoR trusted receipts; author s05 only after all digest matches pass"
```

## Handoff
- Locked: Option C makes router-derived SA/TA applicability authoritative; hard triggers remain mandatory.
- Decided: OQ-AR-001 Option B and OQ-AR-002 Option A with all required human roles.
- Human review: Spec, Contract, and DoR are approved with the required role provenance.
- Gate: three trusted receipts remain pending; s05 stays closed until all digest matches pass.
