---
artifact_id: "adaptive-governance-human-approval-ux.s01.restate"
artifact_family: workflow-step
work_item_slug: "adaptive-governance-human-approval-ux"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: CHANGE
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
change_id: "CR-008"
change_status: approved
spec_delta_refs:
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CR-008/spec-delta/brd.delta.md"
  srs: "changes/CR-008/spec-delta/srs.delta.md"
spec_status: draft
planning_track: enterprise
execution_mode: agentic
execution_roles:
  - "ba"
  - "sa"
  - "ta"
review_mode: independent
verification_owner: "auditor"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
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
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "changes/CR-008/proposal.md"
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
linked_artifacts:
  - "adaptive-governance-human-approval-ux.work-item-report.json"
  - "adaptive-governance-human-approval-ux.s06.task-breakdown.md"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Code-Factory must route requests by intent and risk, require only applicable roles and gates,
> and reduce repeated human approval interactions without weakening high-risk controls.

## Step Contract
```yaml
step: "s01 Clarify"
goal: >-
  Establish one unambiguous, traceable boundary for adaptive workflow admission, role/gate
  applicability, approval interaction reduction, and the controls that must not be weakened.
value: >-
  Prevent later design and implementation from treating every request as product delivery or from
  reducing ceremony by silently bypassing human authority.
scope_in:
  - "Normalize the request, scope, constraints, assumptions, dependencies, and initial risks"
  - "Extract SA and TA architecture drivers without choosing a solution"
  - "Capture the observed approval-state reconciliation defect"
  - "Hand business-value questions to s02 and unresolved decisions to s03"
scope_out:
  - "Choose the technical approach, stack, pattern, schema, or implementation boundary"
  - "Approve Spec, Contract, DoR, Approach, Task Plan, Release, Business Acceptance, or DoD"
  - "Implement production runtime changes"
  - "Redesign passphrase or signer-session security"
inputs_required:
  - "User feedback about fixed roles and repetitive human confirmations"
  - "Approved CR-008 and work-item trusted receipts"
  - "Existing workflow policy, runtime behavior, and audit findings"
outputs_required:
  - "Clarified request and full requirement-analysis artifact"
  - "SA solution/system drivers and downstream handoff"
  - "TA technical drivers and downstream handoff"
  - "Owned open questions for s03"
done_when:
  - "Scope in/out and prohibited actions are explicit"
  - "Every architecture driver has provenance, threshold status, verification, and handoff"
  - "The receipt/report contradiction is recorded as a requirement and test target"
  - "No technical approach is selected"
constraints:
  hard_constraints:
    - "Applicable human-controlled gates remain human-approved through trusted receipts"
    - "Public-contract, migration, security, regulated, and release triggers cannot be downgraded"
    - "Brownfield compatibility and unrelated WIP must be preserved"
  soft_constraints:
    - "Prefer the smallest interaction surface that remains correct and auditable"
    - "Keep EN/VI and Codex/Claude-facing semantics aligned"
  prohibited_actions:
    - "AI self-approval or inferred gate pass"
    - "Implementation before s04-s06 evidence and receipts pass"
    - "Storing passphrases, receipt secrets, or sensitive request content in telemetry"
  compliance_checks:
    - "Trusted receipts prove CR-008 and work-item approval"
    - "Hard-trigger fixtures must prove zero unsafe downgrades"
    - "Compatibility fixtures must cover legacy and adaptive artifact shapes"
risks:
  - id: "R-S01-01"
    description: "Friction reduction is implemented as weakened governance."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Separate applicability from authority and keep deterministic hard triggers."
    contingency: "Revert to the fixed-shape routing path while retaining compatibility readers."
    owner: "developer"
    status: OPEN
  - id: "R-S01-02"
    description: "Approved receipts and persisted protocol state disagree."
    likelihood: HIGH
    impact: MEDIUM
    severity: HIGH
    mitigation: "Add transactional state reconciliation and contradiction fixtures to T5/T9."
    contingency: "Treat the signed receipt as trust evidence and repair derived artifact state."
    owner: "qc"
    status: OPEN
timebox:
  target_duration: "one focused authoring pass"
  deadline: ""
  escalation_rule: "Push unresolved targets or ownership decisions to s03; do not invent them."
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes; human approves only the gates that are applicable"
  - "Request admission precedes the product-delivery workflow"
  - "Brownfield changes use the smallest correct delta"
  - "Public workflow and approval contracts require strict governance"
required_reviews:
  - "PO approval of CR-008 and the work item: complete through valid trusted receipts"
  - "BA/QC review of Spec and DoR: complete through valid trusted receipts"
  - "Developer review of Contract, Approach, and Task Plan: complete through valid trusted receipts"
  - "QC and DevOps/PO closeout reviews only where the final release scope makes them applicable"
prohibited_actions:
  - "Treat a non-delivery request as a delivery work item without an explicit trigger or human override"
  - "Create pending actions for a role or gate marked not_applicable"
  - "Use an approval bundle to hide reviewer, artifact digest, gate, or consequence"
  - "Activate s07 before every required authoring receipt is valid"
open_governance_questions:
  - "OQ-AG-001: What measurable interaction-reduction target should s02 adopt? Owner: PO"
  - "OQ-AG-002: How long must legacy fixed-shape artifacts remain supported? Owner: Developer/DevOps"
  - "OQ-AG-003: What telemetry retention and redaction policy is acceptable? Owner: PO/QC"
```

## Main Artifact
```yaml
raw_request: >-
  Fixed recording of PO, BA, SA, TA, Developer, QC, and DevOps roles and repeated human
  confirmations are frustrating, especially for requests that do not originate from product
  development. Turn the proposed adaptive model into an executable plan.
restated_request: >-
  Change Code-Factory so it first classifies request intent and risk, applies the product-delivery
  workflow only when required, derives only relevant roles and gates with reasons, and presents
  applicable approvals as compact human decision bundles while retaining independent trusted
  receipts and deterministic high-risk escalation.
request_type: CHANGE
user_problem_initial: >-
  Users must repeatedly acknowledge irrelevant roles and approvals, making the workflow feel
  obstructive and discouraging correct use.
business_context_initial: >-
  Code-Factory needs lower interaction cost for research, documentation, analysis, and maintenance
  while preserving auditable authority for changes with material delivery risk.
scope_draft:
  in:
    - "Deterministic request-lane admission and hard-escalation reasons"
    - "Trigger-based SA/TA and other execution-role participation"
    - "Applicable-only gate and role derivation"
    - "Compact new artifact shape with legacy dual-read compatibility"
    - "Atomic readiness and closeout decision bundles with independent receipts"
    - "Approval-state reconciliation across receipts, reports, blockers, and protocol blocks"
    - "Opt-in interaction and routing telemetry"
    - "Policy, runtime, validator, documentation, and adapter parity"
  out:
    - "AI self-approval or implicit human approval"
    - "Downgrading public-contract, migration, security, regulated, or release controls"
    - "Signer-session or approval-passphrase caching"
    - "Mandatory rewrite of historical workflow notes"
    - "CHANGE-005, add-diagram-design-adapter WIP, or immutable release tags"
constraints_initial:
  - "The existing signed-receipt trust boundary remains authoritative"
  - "New output must remain readable by supported runtimes during the compatibility window"
  - "Telemetry must be optional and exclude secrets and sensitive request text"
  - "This enterprise-risk change requires independent review and a dedicated worktree at s07"
assumptions_initial:
  - "Request intent and hard-risk triggers can be derived from explicit request and project metadata"
  - "One human interaction may seal several independent receipts without merging gate semantics"
  - "Legacy readers can be retained while new writers emit a compact applicable-only shape"
open_questions_initial:
  - id: "OQ-AG-001"
    question: "What quantitative target defines a meaningful reduction in human interactions?"
    owner: "po"
    blocking_step: "s04"
  - id: "OQ-AG-002"
    question: "What compatibility window and removal criteria apply to legacy fixed-shape notes?"
    owner: "developer/devops"
    blocking_step: "s05"
  - id: "OQ-AG-003"
    question: "What telemetry retention, redaction, and default-enable policy is acceptable?"
    owner: "po/qc"
    blocking_step: "s04"
dependencies_initial:
  - "Existing trusted-receipt signature and digest contract"
  - "Current materialization, scaffold, governance-validator, and protocol runtime"
  - "Codex and Claude adapter/runtime parity"
  - "Architecture-modeling capability for a system landscape is not installed"
risks_initial:
  - "Unsafe downgrade from delivery to non-delivery"
  - "A bundle partially writes receipts or derived state"
  - "Compact artifacts weaken required-evidence validation"
  - "Legacy artifact or installed-runtime incompatibility"
  - "Telemetry captures sensitive content"
notes_for_step_2: >-
  Define user value and measurable outcomes for lower interaction count, correct routing, preserved
  authority, compatibility, and state consistency. Do not select a technical approach in s02.
```

## Requirement Analysis Spec
```yaml
raw_request: >-
  Reduce fixed role recording and repetitive human confirmation, particularly when a request is not
  part of a product-development lifecycle, and turn the recommendation into a plan.
restated_request: >-
  Introduce risk-aware workflow admission, applicable-only role and gate routing, atomic approval
  bundles, state reconciliation, and privacy-safe telemetry without weakening mandatory controls.
request_type: CHANGE
business_context: >-
  The current governance experience imposes product-delivery ceremony on unrelated request types,
  increasing lead time and user frustration while obscuring which controls actually matter.
scope_in:
  - "Request-lane classification and hard triggers"
  - "Role/gate applicability with reason codes"
  - "Atomic readiness and closeout bundles"
  - "Receipt/report/protocol reconciliation"
  - "Legacy compatibility and runtime parity"
  - "Opt-in privacy-safe telemetry"
scope_out:
  - "Self-approval or weakened authority"
  - "Signer/passphrase session redesign"
  - "Unrelated diagram adapter and release-tag work"
open_questions:
  - "OQ-AG-001 interaction-reduction target; owner PO"
  - "OQ-AG-002 compatibility window; owner Developer/DevOps"
  - "OQ-AG-003 telemetry policy; owner PO/QC"
assumptions:
  - "Hard-risk signals can be represented deterministically"
  - "Independent receipts can be sealed through one reviewed decision summary"
dependencies:
  - "Trusted approval subsystem"
  - "Workflow materialization and scaffold contracts"
  - "Governance, planning, change, protocol, and pack validators"
risks_initial:
  - "Unsafe downgrade"
  - "Partial or contradictory persisted approval state"
  - "Compatibility regression"
  - "Sensitive telemetry"
acceptance_criteria_draft:
  - { id: "AG-01", description: "Non-delivery lanes create zero delivery artifacts unless a human explicitly overrides.", measurable: true }
  - { id: "AG-02", description: "Maintenance requests receive no product or architecture roles without a named trigger.", measurable: true }
  - { id: "AG-03", description: "Every required role and gate has at least one deterministic reason code.", measurable: true }
  - { id: "AG-04", description: "Every public-contract, migration, security, regulated, and release fixture escalates and cannot be downgraded.", measurable: true }
  - { id: "AG-05", description: "A not_applicable role or gate creates zero pending human actions.", measurable: true }
  - { id: "AG-06", description: "One readiness interaction can seal each applicable gate as an independent signed receipt.", measurable: true }
  - { id: "AG-07", description: "A failed bundle leaves zero partial new receipts or derived-state updates.", measurable: true }
  - { id: "AG-08", description: "Closeout requests only the terminal gates applicable to that lane and release scope.", measurable: true }
  - { id: "AG-09", description: "All supported legacy and adaptive artifact fixtures remain readable and enforce required evidence.", measurable: true }
  - { id: "AG-10", description: "Disabled telemetry writes zero events; enabled telemetry records no secret or sensitive request content.", measurable: true }
  - { id: "AG-11", description: "After approval succeeds, zero persisted surfaces claim that the same approval remains pending.", measurable: true }
notes_for_next_step: >-
  s02 must choose measurable value targets; s03 must resolve the three owned open questions before
  s04 locks Spec and DoR.
```

## SA Architecture Drivers
```yaml
invocation:
  skill: sa
  directives_parsed: []
  directives_unresolved: []
  selected_profile: driver+landscape
  profile_source: escalated
  escalation_reasons:
    - "CR-008 changes a public workflow and approval contract."
    - "Canonical policy, runtime, validators, and multiple harness surfaces are affected."
objectives:
  applicable: true
  reason: ""
  items:
    - id: "OBJ-001"
      statement: "Reduce irrelevant workflow roles and repeated human approval interactions."
      measure: "Interaction count and request-to-active lead time improve from a recorded baseline; target is owned by OQ-AG-001."
      source: "user"
      confidence: stated
    - id: "OBJ-002"
      statement: "Preserve human authority for every applicable high-risk gate."
      measure: "Zero unsafe downgrades across the hard-trigger fixture matrix."
      source: "AGENTS.global.md and user-approved CR-008"
      confidence: stated
    - id: "OBJ-003"
      statement: "Keep supported artifacts and runtimes compatible during rollout."
      measure: "All legacy/adaptive and runtime-parity checks pass."
      source: "CR-008"
      confidence: stated
drivers:
  applicable: true
  reason: ""
  items:
    - id: "DRV-SA-001"
      kind: system_boundary
      statement: "Workflow admission must decide delivery versus non-delivery before delivery artifacts are materialized."
      origin: { stakeholder: "user", concern: "Non-product requests receive product-delivery ceremony.", constraint_ref: "BR-AG-001" }
      traces_to: ["OBJ-001"]
      threshold: { status: binary, value: "Decision occurs before any delivery write.", reason: "" }
      verification: "Assert zero delivery writes for every non-delivery fixture without explicit override."
      architectural_significance: "It moves the system seam ahead of materialization and changes which capability is invoked."
      priority: high
    - id: "DRV-SA-002"
      kind: system_boundary
      statement: "Role and gate applicability must have one canonical contract consumed by policy, runtime, validators, and adapters."
      origin: { stakeholder: "maintainer", concern: "Duplicated rules drift and create inconsistent user obligations.", constraint_ref: "REQ-AG-003" }
      traces_to: ["OBJ-001", "OBJ-003"]
      threshold: { status: binary, value: "One canonical rule source with parity evidence.", reason: "" }
      verification: "Pack-audit and parity checks find zero semantic divergence."
      architectural_significance: "The ownership seam determines whether derived role/gate state can remain consistent."
      priority: high
    - id: "DRV-SA-003"
      kind: constraint
      statement: "Human authority must remain unchanged for applicable high-risk decisions."
      origin: { stakeholder: "governance owner", concern: "Friction reduction could become implicit self-approval.", constraint_ref: "REQ-AG-004" }
      traces_to: ["OBJ-002"]
      threshold: { status: binary, value: "No applicable gate passes without a valid human receipt.", reason: "" }
      verification: "Negative fixtures reject missing, stale, mismatched, or unauthorized receipts."
      architectural_significance: "It constrains admission, approval, activation, and closeout boundaries."
      priority: high
    - id: "DRV-SA-004"
      kind: business_goal
      statement: "The new interaction model must measurably reduce unnecessary human actions."
      origin: { stakeholder: "user", concern: "Current confirmations are frustrating and obstructive.", constraint_ref: "BR-AG-003" }
      traces_to: ["OBJ-001"]
      threshold: { status: not_quantified, value: "", reason: "No interaction baseline or target has been approved; OQ-AG-001 owns it." }
      verification: "Compare lane, role, gate, interaction, retry, and lead-time telemetry before and after rollout."
      architectural_significance: "The target decides whether bundling and lane routing are sufficient."
      priority: high
    - id: "DRV-SA-005"
      kind: constraint
      statement: "Supported legacy fixed-shape artifacts must remain readable during a defined compatibility window."
      origin: { stakeholder: "maintainer", concern: "Adaptive writers could strand existing work items.", constraint_ref: "REQ-AG-007" }
      traces_to: ["OBJ-003"]
      threshold: { status: binary, value: "All supported legacy fixtures remain readable.", reason: "" }
      verification: "Run the legacy/adaptive compatibility matrix and record removal criteria."
      architectural_significance: "It constrains the writer/readers and rollout sequence."
      priority: high
landscape:
  applicable: true
  reason: "Public contract and multiple workflow surfaces trigger a system landscape."
  question_answered: "Which workflow surfaces own admission, applicability, receipt state, validation, and adapter parity?"
  render_format: drawio
  view_axis: system
  quality_checks: []
  manual_steps: []
  produced_by: ""
input_issues:
  unanchored_drivers: []
  contested_ownership:
    - "Admission, applicability, receipt reconciliation, and telemetry ownership are not yet allocated; s05 must choose without duplicating rules."
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers:
    - pair: ["OBJ-001", "OBJ-002"]
      nature: "Reducing interactions must not weaken human authority."
      owner: "po"
  unquantified_nfrs:
    - "OQ-AG-001 has no approved interaction-reduction target."
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability:
    - "architecture-modeling is not installed; the landscape question is recorded but no drawing is produced."
metrics:
  applicable: true
  items:
    - { id: "M-01", name: "Objective traceability", formula: "5/5", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-SA-001..005 all have traces_to." }
    - { id: "M-02", name: "Objective support", formula: "3/3", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "OBJ-001..003 each have supporting drivers." }
    - { id: "M-03", name: "Driver provenance", formula: "5/5", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Every SA driver has stakeholder concern and constraint_ref." }
    - { id: "M-04", name: "NFR quantification", formula: "0/1 where a number is meaningful", value: "0%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-SA-004 declares the missing target and OQ-AG-001." }
    - { id: "M-05", name: "Verification coverage", formula: "5/5", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Every SA driver has verification." }
    - { id: "M-06", name: "Handoff coverage", formula: "5/5", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Every SA driver appears in at least one handoff." }
    - { id: "M-07", name: "Open-item ownership", formula: "3/3", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "OQ-AG-001..003 have owners." }
    - { id: "M-08", name: "Option discipline", formula: "0 direction choices", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "SA does not choose an approach." }
    - { id: "M-09", name: "Landscape element ownership", formula: "0 produced elements", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "Missing architecture-modeling capability is declared." }
    - { id: "M-10", name: "Capability ownership clarity", formula: "0/4 allocated capabilities", value: "0%", threshold: "100%", calibration: uncalibrated, evidence: "Contested ownership is explicit and deferred to s05." }
handoff:
  to_ba:
    applicable: true
    reason: ""
    items:
      - "Turn DRV-SA-001 into zero-write criteria for non-delivery lanes."
      - "Turn DRV-SA-003 into receipt and hard-trigger negative criteria."
      - "Resolve the measurable target for DRV-SA-004."
      - "Define the compatibility window for DRV-SA-005."
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Preserve the pre-materialization admission seam and one canonical applicability contract."
      - "Do not allocate duplicate owners for admission, gate derivation, receipt state, or telemetry."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Verify zero unsafe downgrades, zero non-delivery writes, and full legacy readability."
      - "Compare interaction evidence against the target approved at s02/s04."
  to_devops: { applicable: false, reason: "owned by /ta", items: [] }
stop_condition:
  met: false
  reason: "Business targets, compatibility duration, and telemetry policy remain owned open questions."
  pushed_to_s03:
    - { question: "What interaction-reduction target is required?", owner: "po" }
    - { question: "What is the legacy compatibility window?", owner: "developer/devops" }
    - { question: "What telemetry retention and redaction policy applies?", owner: "po/qc" }
```

## TA Architecture Drivers
```yaml
invocation:
  skill: ta
  directives_parsed: []
  directives_unresolved: []
  selected_profile: driver+landscape
  profile_source: escalated
  escalation_reasons:
    - "CR-008 changes a public workflow and approval contract."
    - "Canonical and generated runtime surfaces must remain compatible."
objectives:
  applicable: false
  reason: "owned by /sa"
  items: []
drivers:
  applicable: true
  reason: ""
  items:
    - id: "DRV-TA-001"
      kind: quality_attribute
      statement: "The same request and governance inputs must produce the same lane, roles, gates, and reason codes."
      origin: { stakeholder: "developer", concern: "Inference-driven routing cannot be audited or reproduced.", constraint_ref: "REQ-AG-001" }
      traces_to: ["OBJ-001", "OBJ-002"]
      threshold: { status: quantified, value: "100% identical output across repeated golden-fixture runs.", reason: "" }
      verification: "Repeat the golden matrix and compare normalized outputs."
      architectural_significance: "Determinism constrains the admission and derivation contracts."
      priority: high
    - id: "DRV-TA-002"
      kind: quality_attribute
      statement: "Hard-risk triggers must reject every attempted normal-preset or agent-inferred downgrade."
      origin: { stakeholder: "governance owner", concern: "Adaptive routing could bypass mandatory controls.", constraint_ref: "REQ-AG-004" }
      traces_to: ["OBJ-002"]
      threshold: { status: quantified, value: "0 accepted downgrades across all hard-trigger fixtures.", reason: "" }
      verification: "Run public-contract, migration, security, regulated, and release negative fixtures."
      architectural_significance: "It constrains precedence and failure behavior at admission."
      priority: high
    - id: "DRV-TA-003"
      kind: quality_attribute
      statement: "Approval bundles must persist receipts and derived state atomically."
      origin: { stakeholder: "qc", concern: "Partial success leaves authority and state inconsistent.", constraint_ref: "REQ-AG-006" }
      traces_to: ["OBJ-002", "OBJ-003"]
      threshold: { status: quantified, value: "0 partial receipts or partial derived-state writes after any failed bundle.", reason: "" }
      verification: "Inject failures at each write boundary and prove rollback or no-op."
      architectural_significance: "Atomicity constrains the transaction boundary of the approval operation."
      priority: high
    - id: "DRV-TA-004"
      kind: integration
      statement: "Existing artifact readers and trusted receipts must remain compatible with both legacy and adaptive writers."
      origin: { stakeholder: "maintainer", concern: "A new shape could break active or historical work items.", constraint_ref: "REQ-AG-007" }
      traces_to: ["OBJ-003"]
      threshold: { status: quantified, value: "100% pass across the supported legacy/adaptive compatibility matrix.", reason: "" }
      verification: "Read, validate, approve, and transition representative old and new fixtures; failures block rollout."
      architectural_significance: "It fixes the compatibility seam and rollout order across writers and readers."
      priority: high
    - id: "DRV-TA-005"
      kind: quality_attribute
      statement: "Telemetry must be disabled by default unless configured and must exclude secrets and sensitive request content."
      origin: { stakeholder: "user", concern: "Friction measurement must not create a privacy or credential leak.", constraint_ref: "REQ-AG-008" }
      traces_to: ["OBJ-001", "OBJ-002"]
      threshold: { status: quantified, value: "0 events when disabled and 0 prohibited fields when enabled.", reason: "" }
      verification: "Inspect event schemas and exercise enabled/disabled call sites with secret canaries."
      architectural_significance: "Privacy and opt-in behavior constrain telemetry boundaries and payload ownership."
      priority: high
    - id: "DRV-TA-006"
      kind: quality_attribute
      statement: "Successful approval must reconcile trusted receipt, report, protocol block, blockers, and required actions."
      origin: { stakeholder: "user", concern: "A completed approval still appears pending and forces repeated action.", constraint_ref: "REQ-AG-009" }
      traces_to: ["OBJ-001", "OBJ-003"]
      threshold: { status: quantified, value: "0 contradictory pending claims after a successful approval.", reason: "" }
      verification: "Approve CR-008-like fixtures and run the protocol contradiction validator immediately afterward."
      architectural_significance: "The observed defect proves receipt and derived-state updates currently cross an unsafe boundary."
      priority: high
    - id: "DRV-TA-007"
      kind: integration
      statement: "Canonical policy and every supported installed runtime must expose equivalent routing and approval semantics."
      origin: { stakeholder: "maintainer", concern: "One harness may enforce different obligations from another.", constraint_ref: "CR-008 impact areas" }
      traces_to: ["OBJ-003"]
      threshold: { status: quantified, value: "100% semantic parity across supported runtime fixtures.", reason: "" }
      verification: "Run pack-audit, runtime parity, local-link, and end-to-end authoring smoke checks."
      architectural_significance: "Generated runtime boundaries make semantic drift a release risk."
      priority: high
landscape:
  applicable: true
  reason: "A public integration contract and multiple runtime surfaces are affected."
  question_answered: "Where are request admission, gate derivation, receipt signing, state reconciliation, validation, and runtime parity boundaries?"
  render_format: drawio
  view_axis: system
  quality_checks: []
  manual_steps: []
  produced_by: ""
input_issues:
  unanchored_drivers: []
  contested_ownership:
    - "The canonical owner of approval-state reconciliation is not yet locked."
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers:
    - pair: ["DRV-TA-003", "DRV-TA-004"]
      nature: "Atomic new behavior must coexist with legacy readers during rollout."
      owner: "developer"
  unquantified_nfrs: []
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability:
    - "architecture-modeling is not installed; the required landscape is not produced."
metrics:
  applicable: true
  items:
    - { id: "M-01", name: "Objective traceability", formula: "7/7", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-TA-001..007 all trace to SA objectives." }
    - { id: "M-02", name: "Objective support", formula: "owned by /sa", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "TA does not fill objectives." }
    - { id: "M-03", name: "Driver provenance", formula: "7/7", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Every TA driver has concern and constraint_ref." }
    - { id: "M-04", name: "NFR quantification", formula: "7/7", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "All numeric-meaningful TA drivers have thresholds." }
    - { id: "M-05", name: "Verification coverage", formula: "7/7", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Every TA driver has verification." }
    - { id: "M-06", name: "Handoff coverage", formula: "7/7", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Every TA driver appears in DEV, QC, or DevOps handoff." }
    - { id: "M-07", name: "Open-item ownership", formula: "2/2", value: "100%", threshold: "100%", calibration: uncalibrated, evidence: "Compatibility and telemetry questions have owners." }
    - { id: "M-08", name: "Option discipline", formula: "0 direction choices", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "TA does not choose an approach." }
    - { id: "M-09", name: "Landscape element ownership", formula: "0 produced elements", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "Missing architecture-modeling capability is declared." }
    - { id: "M-10", name: "Capability ownership clarity", formula: "owned by /sa", value: "not_applicable", threshold: "100%", calibration: uncalibrated, evidence: "TA does not allocate system ownership." }
handoff:
  to_ba: { applicable: false, reason: "owned by /sa", items: [] }
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Preserve deterministic routing, hard-trigger precedence, atomic bundle semantics, and state reconciliation."
      - "Maintain dual-read compatibility and one canonical semantic source across runtimes."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Verify deterministic repeats, zero unsafe downgrade, zero partial write, zero stale pending claim, and full compatibility."
      - "Use secret canaries to prove telemetry redaction and disabled no-op behavior."
  to_devops:
    applicable: true
    reason: ""
    items:
      - "Require parity, compatibility, rollback, and telemetry-privacy evidence before publication."
      - "Keep release approval applicable because CR-008 changes the distributed workflow contract."
stop_condition:
  met: false
  reason: "Compatibility duration and telemetry policy require owned decisions before DoR."
  pushed_to_s03:
    - { question: "What compatibility window and removal criteria apply?", owner: "developer/devops" }
    - { question: "What telemetry retention and redaction policy applies?", owner: "po/qc" }
```

## Audit
```yaml
step: "s01 Clarify"
status: PASS
checks:
  - criterion: "Scope in/out and prohibited actions are explicit"
    result: PASS
    evidence: "Main Artifact and Requirement Analysis Spec define the boundary and exclusions."
  - criterion: "Every architecture driver has provenance, threshold status, verification, and handoff"
    result: PASS
    evidence: "DRV-SA-001..005 and DRV-TA-001..007 satisfy the driver and metric contracts."
  - criterion: "The receipt/report contradiction is recorded as a requirement and test target"
    result: PASS
    evidence: "REQ-AG-009, AG-11, DRV-TA-006, and T5/T9 cover the observed validator failure."
  - criterion: "No technical approach is selected"
    result: PASS
    evidence: "The artifact records constraints, drivers, and open ownership questions only."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one focused authoring pass after trusted-receipt verification."
gaps:
  - "OQ-AG-001..003 remain intentionally owned by s02/s03 before DoR."
  - "The required system landscape is not produced because architecture-modeling is unavailable."
risk_level: MEDIUM
next_action: "Proceed to s02 Business Goal; resolve owned questions by s03 before locking s04."
```

## SDD Traceability
```yaml
requirement_refs:
  - "BR-AG-001"
  - "BR-AG-002"
  - "BR-AG-003"
  - "BR-AG-004"
  - "REQ-AG-001"
  - "REQ-AG-002"
  - "REQ-AG-003"
  - "REQ-AG-004"
  - "REQ-AG-005"
  - "REQ-AG-006"
  - "REQ-AG-007"
  - "REQ-AG-008"
  - "REQ-AG-009"
acceptance_refs: ["AG-01", "AG-02", "AG-03", "AG-04", "AG-05", "AG-06", "AG-07", "AG-08", "AG-09", "AG-10", "AG-11"]
task_refs: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"]
test_refs:
  - "golden-routing-matrix"
  - "unsafe-downgrade"
  - "legacy-adaptive-compatibility"
  - "atomic-bundle"
  - "approval-state-reconciliation"
  - "telemetry-privacy"
```

## Work Item Protocol
```yaml
protocol_status: VERIFIED
approval_status: APPROVED
review_required: true
work_item_slug: "adaptive-governance-human-approval-ux"
work_item_type: CHANGE
delivery_context: brownfield
workflow_root: "work-items/adaptive-governance-human-approval-ux"
current_step: "s08"
granted_write_paths:
  - "policies/codex/AGENTS.global.md"
  - "skills/orchestration"
  - "packages/workflow-bundle/scripts"
  - "packages/workflow-bundle/test"
  - "packages/workflow-bundle/bin/wfc.js"
  - "packages/workflow-bundle/runtime"
  - ".github/workflows/workflow-guardrails.yml"
  - "README.md"
  - "README.vi.md"
  - "packages/workflow-bundle/README.md"
  - "docs/workflow-bundle-quickstart.md"
  - "work-items/adaptive-governance-human-approval-ux"
  - "changes/CR-008"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: create_new
change_id: "CR-008"
decision_owner: "agent"
protocol_owner: "developer"
reviewed_by: "po"
reviewed_at: "2026-08-28T13:15:42.373Z"
handoff_target: "linked-defect-s01"
last_transition_action: "record-ag08-finding"
last_transition_at: "2026-09-03T07:30:43.021Z"
required_actions:
  - "Complete closeout-bundle-legacy-dod-compatibility through corrected-candidate verification."
  - "Repeat Technical Verification, DoD, Release and Business Acceptance for the corrected v2.6.2 candidate before CR-008 closeout."
blockers:
  - "F-AG08-001: legacy product closeout omitted mandatory DoD and recorded a partial closeout bundle as successful."
review_notes:
  - "Human review approved."
refs:
  - "changes/CR-008"
  - "work-items/adaptive-governance-human-approval-ux"
  - "work-items/arch-role-skills-release"
  - "work-items/integrate-design-checklists-into-sa-ta"
  - "work-items/architecture-role-skills"
  - "work-items/closeout-bundle-legacy-dod-compatibility"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "CHANGE_CREATED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "PLAN_DRAFTED"
  - "WORK_ITEM_APPROVED"
  - "OPEN_QUESTIONS_RESOLVED"
  - "S04_GATES_APPROVED"
  - "S05_APPROACH_PROPOSED"
  - "S05_APPROACH_REVIEWED"
  - "APPROACH_GATE_APPROVED"
  - "S06_TASK_PLAN_PROPOSED"
  - "S06_TASK_PLAN_REVIEWED"
  - "WORK_ITEM_ACTIVATED"
  - "VERIFICATION_CONFIRMED"
  - "HOSTED_GUARDRAILS_PASSED"
  - "HOSTED_ARTIFACT_DIGEST_MISMATCH_RECORDED"
  - "QC_ARTIFACT_REBIND_PENDING"
  - "HOSTED_ARTIFACT_BINDING_APPROVED"
  - "RELEASE_APPROVED"
  - "BUSINESS_ACCEPTANCE_APPROVED"
  - "S08_FINALIZED_FOR_CLOSEOUT"
  - "CLOSEOUT_BUNDLE_APPROVED"
  - "AG08_CLOSEOUT_COMPATIBILITY_FINDING_RECORDED"
  - "LINKED_DEFECT_CREATED"
```

## Traceability
```yaml
source_inputs:
  - "User workflow-friction feedback"
  - "changes/CR-008/proposal.md"
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
  - "CR-008 and work-item trusted approval receipts"
outputs:
  - "clarified adaptive-governance boundary"
  - "AG-01..AG-11 acceptance draft"
  - "SA and TA architecture-driver handoffs"
next_step: "s02 Business Goal"
```

## Handoff
- Clear: admission precedes delivery; roles/gates are trigger-based; applicable authority remains human-controlled.
- Track: interaction target, compatibility window, telemetry policy, and architecture-modeling availability.
- Condition for step 2: satisfied; s02 must define measurable business value without choosing an approach.
