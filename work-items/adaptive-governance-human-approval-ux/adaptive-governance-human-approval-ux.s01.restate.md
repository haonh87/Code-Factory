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
> and reduce repeated human approval interactions without weakening high-risk controls. Parent release
> remains blocked by `F-AG11-001`; the linked defect has all authoring receipts digest-matched,
> is `ACTIVE` at s07, and T1-T4 RED/GREEN are complete at source
> `a65704aa0be26f99988d6d5c13f632fc76907ddd`. Human QC approved B1 Spec Compliance,
> then Human Developer and QC approved B1 Code Quality at `2026-09-10T11:38:58Z`.
> Child T5 recorded the expected RED at `6e16006`; T6 is GREEN at source
> `9ac8d95d29b0edd9681cfb1320eb848170bd14ca`. B2 Spec Compliance awaits human QC review;
> parent release remains blocked.

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
handoff_target: "parent-exact-candidate-QC-binding-review"
last_transition_action: "record-parent-exact-candidate-13-of-13-evidence-prepared"
last_transition_at: "2026-09-15T02:06:06.548Z"
required_actions:
  - {"kind":"legacy","text":"Complete the three amended child s04 human reviews and seal fresh independent receipts."}
  - {"kind":"legacy","text":"Refresh and approve the child s05/s06 design and execution plan before resuming implementation."}
  - {"kind":"legacy","text":"Re-verify parent CR-008 and repeat terminal approvals for one corrected candidate before protocol close or branch finalization."}
  - {"id":"se:6bff872b1ec110f421ab4be71e8a2c08535a5d8a1a0e25b93e50d841486bdfab","kind":"workflow_followup","text":"QC reviews the current parent artifact binding and Technical Verification for source af70276fe14317417365c06dd06186da1996c401, run 34802149041 and candidate SHA-256 af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f; DoD, Release and Business Acceptance remain later independent gates."}
blockers:
  - {"kind":"legacy","text":"F-AG11-001 is OPEN: repeated closeout success leaves stale pending state and no current-cycle event."}
  - {"kind":"legacy","text":"Linked defect closeout-bundle-repeat-cycle-reconciliation is BLOCKED at s04; structural decisions are approved but fresh downstream gate receipts are pending."}
  - {"id":"se:9099dbc3f27490fc6b16a65e265df0a52396886fa1efc32f37b78577d90155e7","kind":"delivery_blocker","text":"Parent AG-01..AG-13 evidence is prepared at 13/13 PASS for the exact candidate. Current QC artifact-binding/Technical Verification, QC DoD, DevOps/QC Release and PO Business Acceptance remain pending; no closeout, Release or branch finalization is authorized."}
review_notes:
  - "Human review approved."
  - "Both linked child work items are DONE. Parent source 38bb0d178aa994e2a7c6e841b58b3e6b4263c56d passed the full local verification matrix and hosted Guardrails run 34322150024."
  - "Hosted candidate SHA-256 2a5ae7015a205bfe6f1b54abfbc551da95a65e2db001edc451f48ba558d363e5 passed supplied-checksum verification, extracted-payload parity, and exact artifact smoke. F-AG08-001 is resolved."
  - "Human QC approved the exact parent hosted binding at 2026-09-09T08:06:32Z."
  - "Human QC approved Technical Verification at 2026-09-09T08:13:53Z for the same exact binding and AG-01..AG-13 at 13/13 PASS."
  - "Human QC approved DoD at 2026-09-09T08:19:40Z for the same Technical Verification evidence binding."
  - "Human DevOps and QC approved Release at 2026-09-09T08:47:09Z for the exact current candidate and rollback; no publish or tag action was inferred or executed."
  - "Human PO approved Business Acceptance at 2026-09-09T09:00:31Z for the same exact Release-approved candidate. The finalized s08 host is ready for atomic trusted-receipt sealing; no publish or tag action was inferred or executed."
  - "The 2026-09-09T09:57:16.873Z closeout receipts are retained as historical pre-finding evidence against s08 SHA-256 1c5f5d81bcdfde07638d0ce379a66f22976e99a2932b8789801626b86ae5e9b3."
  - "QC recorded F-AG11-001 and reopened the parent delivery lane; release, protocol close, and branch finalization are blocked pending the linked defect and corrected-candidate re-verification."
  - "Human PO approved linked defect closeout-bundle-repeat-cycle-reconciliation at 2026-09-09T13:32:51Z; receipt sealing and every later gate remain separate."
  - "The linked defect trusted receipt was verified APPROVED with SHA-256 4ae668c9dc20dfaa1ff8979da9ce43485511c2d19e59e98e18c08427e7485b0d; s02 Business Goal is drafted for review."
  - "Human PO approved the linked defect s02 Business Goal at 2026-09-10T01:36:42Z."
  - "Human BA, Developer, and QC approved linked defect OQ-RCR-001=B, OQ-RCR-002=A, and OQ-RCR-003=A with their assigned role sets at 2026-09-10T02:30:56Z."
  - "The linked defect s04 Spec and DoR were drafted; before the current human decision, implementation and parent release remained blocked pending independent child gates and delivery."
  - "Human BA approved the linked defect Spec and human BA/QC approved its DoR at 2026-09-10T03:09:26Z."
  - "The linked defect BA Spec receipt at 2026-09-10T04:55:23.729Z and QC DoR receipt at 2026-09-10T04:55:36.637Z both match finalized s04 SHA-256 b50db12a977a007b8785baff4153ad54d8049e0003d030deaf4329bebff9f60b."
  - "Human Developer approved the linked defect s05 Approach at 2026-09-10T08:12:02Z."
  - "The linked defect Developer Approach receipt at 2026-09-10T08:20:46.196Z matches finalized s05 SHA-256 5635bebed29077d34cec2a8cf0883ea5af6ff59146656e09a5283b6d86f33d5a."
  - "The linked defect s06 Task Plan was proposed for Developer review."
  - "Human Developer approved the linked defect s06 Task Plan at 2026-09-10T08:56:19Z."
  - "The linked defect Task Plan receipt matches finalized s06 SHA-256 7fbb8b9d55027293cd806f51edfdad6d339406718edff42b24e24eae7cb0d3d9; s07 is ACTIVE and T0 focused baselines pass at source edc9454d38126d51ad9e5a85afc475d2915ac9bd."
  - "Linked defect T1-T4 are complete at source a65704aa0be26f99988d6d5c13f632fc76907ddd. QC B1 Spec Compliance review is next; Code Quality has not started and parent release remains blocked."
  - "Human QC approved linked defect B1 Spec Compliance at 2026-09-10T11:27:32Z with no findings. B1 Code Quality is now READY_FOR_REVIEW by Developer and QC."
  - "Linked defect B1 Code Quality recommendation PASS was prepared at 2026-09-10T11:32:30Z; Developer/QC approval remains pending."
  - "Human Developer and QC approved linked defect B1 Code Quality at 2026-09-10T11:38:58Z with no findings. Child T5 fail-first work is open; parent release remains blocked."
  - "Linked defect T5 recorded exactly three expected RED assertions at 6e16006 before T6 production code. T6 GREEN source 9ac8d95d29b0edd9681cfb1320eb848170bd14ca passes both focused suites; B2 Spec Compliance is READY_FOR_REVIEW by QC and parent release remains blocked."
  - "Human QC approved linked defect B2 Spec Compliance at 2026-09-11T03:20:17Z; Code Quality opened next."
  - "Linked defect B2 Code Quality recommends FAIL due the reproducible uat/situation false positive. Proposed HIGH F-RCR-B2-001 blocks T7 and parent re-verification pending human disposition."
  - "Human Developer and QC approved linked defect B2 Code Quality FAIL and opened HIGH F-RCR-B2-001 at 2026-09-11T03:46:13Z. Human QC reopened child B2 Spec Compliance and human Developer approved T6a; parent release remains blocked."
  - "Linked defect T6a RED commit 0d1ac48c0adb43279f67503a318187295688a463 produced exactly one expected alias-collision assertion failure before bounded-alias GREEN source f9533c4de66fdb04e75008382b39b4fc413e3caa. Both focused suites, three syntax checks, and git diff --check pass; refreshed child B2 Spec Compliance is READY_FOR_REVIEW by QC."
  - "Human QC approved refreshed child B2 Spec Compliance at 2026-09-11T04:04:57Z. Independent child Code Quality review recommends PASS with no new findings; Developer/QC approval remains pending, F-RCR-B2-001 stays OPEN, and parent release remains blocked."
  - "Human Developer and QC approved refreshed child B2 Code Quality PASS at 2026-09-11T04:21:48Z for source f9533c4de66fdb04e75008382b39b4fc413e3caa. F-RCR-B2-001 is RESOLVED and child T7 is OPEN; parent release, protocol close, and branch finalization remain blocked."
  - "Owner scope direction replaced further prose-matching patches with a structured-state contract. Child T7 is suspended and the child is BLOCKED at s03 pending OQ-RCR-004..006 plus fresh Spec, Contract, DoR, Approach, and Task Plan gates."
  - "Human reviewers approved the child structural B/A/B question bundle at 2026-09-11T07:59:12Z. Amended s04 now awaits fresh independent Spec, Contract, and DoR decisions and receipts; parent release remains blocked."
refs:
  - "changes/CR-008"
  - "work-items/adaptive-governance-human-approval-ux"
  - "work-items/arch-role-skills-release"
  - "work-items/integrate-design-checklists-into-sa-ta"
  - "work-items/architecture-role-skills"
  - "work-items/closeout-bundle-legacy-dod-compatibility"
  - "work-items/align-adaptive-sa-ta-applicability"
  - "work-items/closeout-bundle-repeat-cycle-reconciliation"
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
  - "LINKED_DEFECTS_DONE"
  - "PARENT_REVERIFICATION_PASS"
  - "PARENT_HOSTED_BINDING_READY"
  - "PARENT_HOSTED_BINDING_APPROVED"
  - "PARENT_TECHNICAL_VERIFICATION_APPROVED"
  - "PARENT_DOD_APPROVED"
  - "PARENT_RELEASE_APPROVED"
  - "PARENT_BUSINESS_ACCEPTANCE_APPROVED"
  - "PARENT_S08_FINALIZED_FOR_CLOSEOUT"
  - "AG11_REPEAT_CYCLE_FINDING_RECORDED"
  - "LINKED_REPEAT_CYCLE_DEFECT_MATERIALIZED"
  - "PARENT_RELEASE_BLOCKED_BY_F_AG11_001"
  - "LINKED_REPEAT_CYCLE_DEFECT_WORK_ITEM_APPROVED"
  - "LINKED_REPEAT_CYCLE_DEFECT_RECEIPT_VERIFIED"
  - "LINKED_REPEAT_CYCLE_DEFECT_S02_DRAFTED"
  - "LINKED_REPEAT_CYCLE_DEFECT_S02_APPROVED"
  - "LINKED_REPEAT_CYCLE_DEFECT_S03_DRAFTED"
  - "LINKED_REPEAT_CYCLE_DEFECT_OPEN_QUESTIONS_RESOLVED"
  - "LINKED_REPEAT_CYCLE_DEFECT_S04_DRAFTED"
  - "LINKED_REPEAT_CYCLE_DEFECT_S04_HUMAN_APPROVED_PENDING_RECEIPTS"
  - "LINKED_REPEAT_CYCLE_DEFECT_S04_RECEIPTS_VERIFIED"
  - "LINKED_REPEAT_CYCLE_DEFECT_S05_DRAFTED"
  - "LINKED_REPEAT_CYCLE_DEFECT_S05_HUMAN_APPROVED_PENDING_RECEIPT"
  - "LINKED_REPEAT_CYCLE_DEFECT_S05_RECEIPT_VERIFIED"
  - "LINKED_REPEAT_CYCLE_DEFECT_S06_DRAFTED"
  - "LINKED_REPEAT_CYCLE_DEFECT_S06_HUMAN_APPROVED_PENDING_RECEIPT"
  - "LINKED_REPEAT_CYCLE_DEFECT_S06_RECEIPT_VERIFIED"
  - "LINKED_REPEAT_CYCLE_DEFECT_S07_ACTIVATED"
  - "LINKED_REPEAT_CYCLE_DEFECT_T0_BASELINE_PASS"
  - "LINKED_REPEAT_CYCLE_DEFECT_B1_SPEC_COMPLIANCE_READY"
  - "LINKED_REPEAT_CYCLE_DEFECT_B1_SPEC_COMPLIANCE_APPROVED"
  - "LINKED_REPEAT_CYCLE_DEFECT_B1_CODE_QUALITY_OPENED"
  - "LINKED_REPEAT_CYCLE_DEFECT_B1_CODE_QUALITY_APPROVED"
  - "LINKED_REPEAT_CYCLE_DEFECT_T5_OPENED"
  - "LINKED_REPEAT_CYCLE_DEFECT_T5_EXPECTED_RED_RECORDED"
  - "LINKED_REPEAT_CYCLE_DEFECT_T6_GREEN_RECORDED"
  - "LINKED_REPEAT_CYCLE_DEFECT_B2_SPEC_COMPLIANCE_READY"
  - "LINKED_REPEAT_CYCLE_DEFECT_B2_SPEC_COMPLIANCE_APPROVED"
  - "LINKED_REPEAT_CYCLE_DEFECT_B2_CODE_QUALITY_OPENED"
  - "LINKED_REPEAT_CYCLE_DEFECT_B2_CODE_QUALITY_FINDING_PROPOSED"
  - "LINKED_REPEAT_CYCLE_DEFECT_B2_CODE_QUALITY_FAILED"
  - "LINKED_REPEAT_CYCLE_DEFECT_F_RCR_B2_001_OPENED"
  - "LINKED_REPEAT_CYCLE_DEFECT_B2_SPEC_COMPLIANCE_REOPENED"
  - "LINKED_REPEAT_CYCLE_DEFECT_T6A_TASK_PLAN_APPROVED"
  - "LINKED_REPEAT_CYCLE_DEFECT_T6A_OPENED"
  - "LINKED_REPEAT_CYCLE_DEFECT_T6A_EXPECTED_RED_RECORDED"
  - "LINKED_REPEAT_CYCLE_DEFECT_T6A_GREEN_RECORDED"
  - "LINKED_REPEAT_CYCLE_DEFECT_B2_SPEC_COMPLIANCE_REFRESHED_READY"
  - "LINKED_REPEAT_CYCLE_DEFECT_B2_SPEC_COMPLIANCE_REFRESHED_APPROVED"
  - "LINKED_REPEAT_CYCLE_DEFECT_B2_CODE_QUALITY_REOPENED"
  - "LINKED_REPEAT_CYCLE_DEFECT_B2_CODE_QUALITY_RECOMMENDATION_PREPARED"
  - "LINKED_REPEAT_CYCLE_DEFECT_B2_CODE_QUALITY_REFRESHED_APPROVED"
  - "LINKED_REPEAT_CYCLE_DEFECT_F_RCR_B2_001_RESOLVED"
  - "LINKED_REPEAT_CYCLE_DEFECT_T7_OPENED"
  - "LINKED_REPEAT_CYCLE_DEFECT_STRUCTURAL_CONTRACT_REOPENED"
  - "LINKED_REPEAT_CYCLE_DEFECT_STRUCTURAL_QUESTIONS_APPROVED"
  - "LINKED_REPEAT_CYCLE_DEFECT_AMENDED_S04_DRAFTED"
  - "PARENT_EXACT_CANDIDATE_REFRESH_BLOCKED_RUNTIME_PARITY"
  - "PARENT_EXACT_CANDIDATE_13_OF_13_EVIDENCE_PREPARED"
```

## Current Governance Router Status
```yaml
workflow_status: BLOCKED
current_step: s07
reopened_by: qc
reopened_at: "2026-09-09T10:12:13Z"
finding: "F-AG11-001"
protocol_projection_status: VERIFIED
projection_note: >-
  The current protocol enum has no VERIFIED-to-s07 reopen transition. Keep the last valid protocol
  projection for validator compatibility while this governance-router state and the s07/s08 source
  artifacts block release and direct work to the linked defect.
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
next_step: "Execute linked defect T7 matrix; parent release remains blocked"
```

## Handoff
- Current state: `F-AG11-001` is OPEN and the parent delivery lane is reopened; the prior candidate and terminal receipts are historical pre-finding evidence only.
- Linked defect: all authoring receipts match; T1-T6 RED/GREEN are complete at source `9ac8d95d29b0edd9681cfb1320eb848170bd14ca`, and QC approved B2 Spec Compliance at `2026-09-11T03:20:17Z`.
- Code Quality: Developer/QC approved FAIL and opened HIGH `F-RCR-B2-001`; QC reopened B2 Spec Compliance and Developer approved T6a.
- Next action: execute child T7 matrix, then prepare B3 Spec Compliance for QC; parent release remains blocked.
- Branch/worktree decision: `HOLD_OPEN`; no merge, tag, publication, release, cleanup, global install, or branch finalization is authorized.
