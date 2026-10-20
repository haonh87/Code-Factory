---
artifact_id: "add-diagram-design-adapter.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "add-diagram-design-adapter"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CHANGE-005"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-005/spec-delta/brd.delta.md"
  - "changes/CHANGE-005/spec-delta/srs.delta.md"
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
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
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
  release:
    - "devops"
    - "qc"
  business_acceptance:
    - "po"
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
  - "workflow-governance-router"
  - "codex-workflow-chain"
  - "product-thinking"
  - "sa"
  - "ta"
  - "step-goal-contract"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "add-diagram-design-adapter.s01.restate.md"
linked_artifacts:
  - "changes/CHANGE-005/proposal.md"
  - "work-items/add-diagram-design-adapter/add-diagram-design-adapter.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Architecture stakeholders need audience-appropriate visuals without losing the authority, editability, and traceability of canonical engineering artifacts. CHANGE-005 will be successful when SA/TA can express presentation intent, downstream readers can understand the declared architecture question, and every presented fact remains governed by the canonical architecture model.

## Step Contract
```yaml
step: "s02 Business Goal"
goal: "Establish a reviewable business goal, user value, observable success outcomes, candidate metrics, and non-goals for the governed presentation-adapter capability without selecting its technical design."
value: "The team can evaluate whether the change is worth delivering and what success means before committing to an adapter contract, dependency model, packaging path, or implementation."
scope_in:
  - "Define the user problem for architecture stakeholders and the business value of an audience-appropriate presentation derivative."
  - "Translate the approved s01 boundary and SA/TA objectives into observable business outcomes and candidate metrics."
  - "Preserve the approved role-authority, source-of-truth, artifact-ownership, security, and CHANGE-004 isolation boundaries as business non-goals."
  - "Route unresolved audience, measurement, ownership, distribution, repeatability, and release decisions to s03 with named role owners."
scope_out:
  - "Selecting the adapter contract, technical architecture, renderer, dependency-distribution model, package layout, or release version."
  - "Freezing acceptance criteria or passing Spec, Contract, DoR, Approach, Task Plan, Release, Business Acceptance, or DoD."
  - "Editing or installing SA, TA, architecture-modeling, diagram-design, runtime, test, manifest, or release assets."
  - "Changing active CHANGE-004-owned paths or the authority of canonical architecture artifacts."
inputs_required:
  - "Trusted PO approval receipts for CHANGE-005 and the add-diagram-design-adapter work item."
  - "The s01 restatement, requirement analysis, SA objectives and drivers, TA drivers, and s01 audit."
  - "The strict governance profile and approved brownfield change boundary."
outputs_required:
  - "A product-thinking artifact containing the restated request, user problem, business goal, user value, success outcomes, non-goals, priority reason, business risks, candidate metrics, and s03 notes."
  - "A traceability map from business outcomes to s01 objectives, architecture drivers, and draft acceptance criteria."
  - "An explicit handoff of unresolved decisions to s03 and an evidence-based s02 audit."
done_when:
  - "The user problem, business goal, and user value are concrete and distinct from a technical solution."
  - "Success outcomes are observable and candidate metrics identify their target or explicitly record missing calibration."
  - "Non-goals preserve the approved SA/TA, canonical-artifact, security, and CHANGE-004 boundaries."
  - "Every success outcome traces to s01 objectives and relevant SA/TA drivers or draft acceptance criteria."
  - "Every unresolved business decision is routed to s03 with a named role owner."
  - "No technical approach, implementation permission, or downstream gate approval is implied."
constraints:
  hard_constraints:
    - "The approved CHANGE-005 and work-item boundary remains unchanged."
    - "SA and TA remain pre-design driver skills and do not render, model, or select a solution."
    - "The canonical architecture model and governed canonical views remain the source of truth."
    - "No fabricated baseline, adoption result, or user-comprehension measurement may be presented as observed evidence."
    - "Only humans with the required authority may pass downstream workflow gates."
  soft_constraints:
    - "Prefer outcome language understandable to PO, BA, architecture reviewers, engineering, QC, and DevOps."
    - "Use the smallest business scope that supports the selected adapter direction."
  prohibited_actions:
    - "Do not choose the contract location, dependency model, rendering implementation, packaging path, or release version in s02."
    - "Do not modify production skills, managed runtimes, tests, manifests, or external installation state."
    - "Do not mark Spec, Contract, DoR, Approach, Task Plan, Release, Business Acceptance, or DoD as passed."
  compliance_checks:
    - "Verify both trusted approval receipts before authoring s02 and keep their PO reviewer evidence traceable."
    - "Cross-map the business outcomes and non-goals against the s01 SA/TA role and canonical-source constraints."
    - "Mark unmeasured business metrics as candidates requiring calibration rather than as achieved results."
    - "Confirm the s02 frontmatter retains every required downstream gate and signoff role from s01."
risks:
  - id: "S02-RISK-001"
    description: "Stakeholders may treat a polished presentation derivative as the approved architecture source."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Make canonical authority, derivative identity, fact traceability, and ownership clarity explicit success conditions."
    contingency: "Withdraw the derivative from decision use and retain only the canonical artifact until labeling and traceability pass."
    owner: "po/ba"
    status: OPEN
  - id: "S02-RISK-002"
    description: "The business goal may expand into direct SA/TA rendering or a replacement for canonical architecture-modeling outputs."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Carry the approved role and source-of-truth boundaries into non-goals and every downstream handoff."
    contingency: "Return the work item to s01 for scope correction before any approach is reviewed."
    owner: "po/ba"
    status: OPEN
  - id: "S02-RISK-003"
    description: "A proposed comprehension or adoption target could be mistaken for a measured baseline."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Label unmeasured metrics as candidates and assign calibration to PO, BA, or QC in s03."
    contingency: "Remove the numeric target from s04 until a measurement method and reviewer are approved."
    owner: "po/qc"
    status: OPEN
  - id: "S02-RISK-004"
    description: "Unknown first-release audiences and formats may produce an outcome definition too broad to validate."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Route audience profiles, mandatory formats, and decision tasks to s03 before Acceptance + DoR."
    contingency: "Limit the first release to the smallest human-approved audience and format set."
    owner: "po/ba"
    status: OPEN
timebox:
  target_duration: "One s02 authoring and validation pass"
  deadline: ""
  escalation_rule: "Move any unresolved audience, KPI, ownership, distribution, repeatability, release, or reviewer question to s03 with a role owner; do not answer it by choosing a technical approach."
```

## Main Artifact
```yaml
restated_request: "Add one governed adapter capability that consumes approved architecture-modeling facts and produces a separately identified diagram-design presentation derivative requested by SA/TA, without changing SA/TA authority or canonical architecture ownership."
user_problem: "Architecture stakeholders currently face a false choice: use governed canonical diagrams that may not suit the intended audience, or create polished presentation visuals whose facts, ownership, and relationship to the approved architecture are difficult to verify. SA and TA can identify the need for a visual, but the workflow has no governed business outcome for the downstream presentation lane."
business_goal: "Enable architecture decision-makers to receive audience-appropriate presentation visuals while preserving one trusted architecture fact source, clear role authority, explicit artifact ownership, safe adoption, and reversible release behavior."
user_value: "Business and engineering readers get a visual tailored to the question they need to answer, while architects and reviewers can still prove where every architecture fact came from, which artifact is authoritative, and how to reject or remove an unsafe derivative."
success_outcome:
  - id: "OUT-001"
    statement: "SA and TA can express an actionable presentation need for every representative applicable case without producing a diagram, selecting a solution, or crossing their s01-s04 authority boundary."
    observable_signal: "Representative SA and TA cases produce a complete downstream presentation intent and zero direct diagram artifacts or model decisions."
  - id: "OUT-002"
    statement: "Every presentation derivative is recognizably separate from the canonical artifact and contains only architecture facts traceable to the approved canonical model."
    observable_signal: "Each derivative has a distinct artifact ID and owner, identifies its canonical source, maps every visible architecture fact to source_fact_ids, and introduces zero unsupported facts."
  - id: "OUT-003"
    statement: "The intended business or engineering reader can use the derivative to answer its declared architecture question without receiving information that contradicts the canonical artifact."
    observable_signal: "A representative reader-task review records whether the declared question was answered and reports zero semantic contradictions; the success threshold remains to be calibrated in s03."
  - id: "OUT-004"
    statement: "The presentation capability can be reviewed, released, updated, disabled, and rolled back without silently changing SA/TA or canonical architecture behavior."
    observable_signal: "Provenance, security, compatibility, packaging, update, runtime-parity, and rollback evidence is complete, with zero unapproved installs, updates, or release claims."
non_goals:
  - "Direct diagram rendering, canonical model construction, or solution selection inside SA or TA."
  - "Replacing or weakening architecture-modeling, Draw.io, Mermaid, Structurizr, or another governed canonical artifact."
  - "Changing the fixed SA/TA output schema, block ownership, or the active CHANGE-004-owned paths."
  - "Choosing the final adapter contract, dependency-distribution model, renderer implementation, package layout, or release version in s02."
  - "Supporting arbitrary URL-based brand onboarding or treating fetched page content as trusted instructions."
  - "Installing globally, auto-updating, publishing, or claiming release readiness before the required gates pass."
priority_reason: "The approved adapter direction closes a visible capability gap between governed architecture evidence and stakeholder-facing communication. Deferring the boundary leaves teams with either low audience fit or ad hoc, untraceable visuals; prioritization remains conditional on s03 calibrating the first-release audience and success measures."
risks_business:
  - id: "BUS-RISK-001"
    risk: "Visual polish could cause decision-makers to trust the derivative over the canonical architecture source."
    response: "Require visible derivative labeling, canonical linkage, complete fact traceability, and explicit owner separation."
  - id: "BUS-RISK-002"
    risk: "Two artifact types could increase review effort or confuse readers about which artifact answers which question."
    response: "Define the audience, declared question, and artifact purpose before release; measure source-of-truth clarity in representative reviews."
  - id: "BUS-RISK-003"
    risk: "An external presentation dependency could create maintenance, security, licensing, or rollback cost larger than the communication benefit."
    response: "Require pinned provenance, capability and license review, safe defaults, update ownership, isolated verification, and a tested rollback unit."
  - id: "BUS-RISK-004"
    risk: "An overly broad first release could delay value while audiences, formats, and repeatability expectations remain unsettled."
    response: "Use s03 to identify the smallest valuable audience and format set before acceptance criteria are frozen."
  - id: "BUS-RISK-005"
    risk: "Packaging work could collide with active CHANGE-004 and obscure ownership or release evidence."
    response: "Keep SA/TA paths untouched and sequence shared runtime packaging against the verified post-CHANGE-004 baseline."
metrics_candidate:
  - id: "METRIC-001"
    name: "Role-boundary conformity"
    definition: "Applicable representative SA/TA cases with a complete downstream intent and no direct render or model decision / total applicable representative cases."
    proposed_target: "100% conforming cases; 0 direct diagram artifacts or model decisions."
    calibration: "Target inherited from SA OBJ-001 and SA-DRV-001; representative fixture set must be locked in s04."
    owner: "ba/qc"
  - id: "METRIC-002"
    name: "Semantic traceability"
    definition: "Visible architecture facts mapped to approved source_fact_ids / total visible architecture facts."
    proposed_target: "100% mapped facts; 0 unsupported or contradictory facts."
    calibration: "Target inherited from OBJ-002, SA-DRV-002, and TA-DRV-002; comparison method remains open for s03-s04."
    owner: "qc"
  - id: "METRIC-003"
    name: "Source-of-truth clarity"
    definition: "Representative reviewers who correctly identify the canonical artifact, derivative purpose, and owner / total representative reviewers."
    proposed_target: "Not yet quantified; calibrate with PO, BA, and QC in s03."
    calibration: "No current baseline or approved reader-review protocol exists."
    owner: "po/ba/qc"
  - id: "METRIC-004"
    name: "Declared-question comprehension"
    definition: "Representative reader tasks that answer the derivative's declared architecture question correctly without contradicting the canonical artifact / total representative reader tasks."
    proposed_target: "Not yet quantified; calibrate after the first-release audience and question types are selected in s03."
    calibration: "No current audience, task set, or baseline exists."
    owner: "po/ba/qc"
  - id: "METRIC-005"
    name: "Governed adoption and reversibility"
    definition: "Supported install, update, disable, and rollback scenarios passing provenance, security, parity, and recovery checks / total supported scenarios."
    proposed_target: "100% supported scenarios pass; 0 unapproved installs, updates, URL onboarding actions, or release claims."
    calibration: "Supported runtime and distribution scenarios must be selected at s05 and locked at s06."
    owner: "developer/devops/qc"
notes_for_next_step: "At s03, resolve the first-release audiences and formats, calibrate source-of-truth clarity and declared-question comprehension, assign the public contract and update owners, select reviewers, and clarify distribution, repeatability, and CHANGE-004 release sequencing. Do not choose the technical approach until these business and governance questions have owners and disposition."
```

## Traceability
```yaml
approval_evidence:
  change:
    id: "CHANGE-005"
    status: "APPROVED"
    reviewed_by: "po"
    reviewed_at: "2026-08-21T03:47:32.755Z"
    trusted_receipt: "APPROVED"
  work_item:
    id: "add-diagram-design-adapter"
    status: "APPROVED"
    reviewed_by: "po"
    reviewed_at: "2026-08-21T03:47:48.570Z"
    trusted_receipt: "APPROVED"
  s02_review:
    status: "APPROVED"
    reviewed_by: "po"
    reviewed_at: "2026-08-21T04:08:30Z"
    evidence: "User instruction: Phê duyệt s02, tiếp tục s03."
upstream:
  - "add-diagram-design-adapter.s01.restate.md#Requirement Analysis Spec"
  - "add-diagram-design-adapter.s01.restate.md#SA Architecture Drivers"
  - "add-diagram-design-adapter.s01.restate.md#TA Architecture Drivers"
  - "changes/CHANGE-005/proposal.md"
business_chain:
  - outcome_ref: "OUT-001"
    objective_refs: ["OBJ-001"]
    driver_refs: ["SA-DRV-001", "SA-DRV-004"]
    draft_acceptance_refs: ["AC-001", "AC-008"]
  - outcome_ref: "OUT-002"
    objective_refs: ["OBJ-002"]
    driver_refs: ["SA-DRV-002", "SA-DRV-003", "TA-DRV-001", "TA-DRV-002"]
    draft_acceptance_refs: ["AC-002", "AC-003", "AC-004"]
  - outcome_ref: "OUT-003"
    objective_refs: ["OBJ-001", "OBJ-002"]
    driver_refs: ["SA-DRV-001", "SA-DRV-002", "TA-DRV-002", "TA-DRV-003"]
    draft_acceptance_refs: ["AC-002", "AC-006"]
  - outcome_ref: "OUT-004"
    objective_refs: ["OBJ-003"]
    driver_refs: ["SA-DRV-003", "SA-DRV-004", "TA-DRV-003", "TA-DRV-004", "TA-DRV-005", "TA-DRV-006"]
    draft_acceptance_refs: ["AC-005", "AC-006", "AC-007", "AC-008"]
unresolved_to_s03:
  - question: "Which business and engineering audience profiles, declared questions, and presentation formats are mandatory for the first release?"
    owner: "po/ba"
  - question: "What success threshold and review protocol will be used for source-of-truth clarity and declared-question comprehension?"
    owner: "po/ba/qc"
  - question: "Who owns the public adapter contract, dependency updates, and rollback unit?"
    owner: "developer/devops"
  - question: "Which dependency-distribution and security boundary is acceptable?"
    owner: "developer/security"
  - question: "What semantic comparison and layout-repeatability tolerance will gate representative output?"
    owner: "qc"
  - question: "Which release sequence follows CHANGE-004, and which named humans review the remaining gates?"
    owner: "po/devops"
next_step: "add-diagram-design-adapter.s03.open-questions.md after human review of the s02 problem, goal, value, outcomes, metrics candidates, and non-goals"
```

## Handoff
- Pinned user problem: stakeholders need audience-appropriate architecture visuals without accepting an untraceable or competing source of truth.
- Pinned business value: decision-ready communication with canonical fact authority, role separation, safe adoption, and reversibility intact.
- Non-goals: no direct SA/TA rendering, no canonical replacement, no technical-design decision, no arbitrary URL onboarding, no CHANGE-004 path overlap, and no unapproved installation or release.
- Conditions to move to s03: satisfied by explicit PO review on 2026-08-21; unresolved audience, KPI, ownership, distribution, repeatability, release, and reviewer questions remain open with the role owners recorded above.

## Audit
```yaml
step: "s02 Business Goal"
status: PASS
checks:
  - criterion: "The user problem, business goal, and user value are concrete and distinct from a technical solution."
    result: PASS
    evidence: "The Main Artifact describes the stakeholder choice, desired decision outcome, and review value without selecting a contract, dependency model, package layout, renderer implementation, or release version."
  - criterion: "Success outcomes are observable and candidate metrics identify their target or explicitly record missing calibration."
    result: PASS
    evidence: "OUT-001 through OUT-004 each contain an observable_signal; METRIC-001 through METRIC-005 state either a proposed target with source or an explicit uncalibrated status and owner."
  - criterion: "Non-goals preserve the approved SA/TA, canonical-artifact, security, and CHANGE-004 boundaries."
    result: PASS
    evidence: "The non_goals block repeats zero direct SA/TA rendering, zero canonical replacement, no arbitrary URL onboarding, no CHANGE-004 overlap, and no unapproved installation or release."
  - criterion: "Every success outcome traces to s01 objectives and relevant SA/TA drivers or draft acceptance criteria."
    result: PASS
    evidence: "The Traceability business_chain contains one row for every OUT-001 through OUT-004 with objective_refs, driver_refs, and draft_acceptance_refs."
  - criterion: "Every unresolved business decision is routed to s03 with a named role owner."
    result: PASS
    evidence: "The unresolved_to_s03 block records six questions covering audience, metrics, ownership, distribution, repeatability, release sequencing, and reviewers; every question has a role owner."
  - criterion: "No technical approach, implementation permission, or downstream gate approval is implied."
    result: PASS
    evidence: "The Step Contract keeps technical choices out of scope; frontmatter leaves every downstream gate review empty and the work item has no granted implementation write path."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one s02 authoring and validation pass."
gaps:
  - "Audience, comprehension thresholds, ownership, distribution, repeatability, release sequencing, and named reviewers intentionally remain unresolved for s03."
risk_level: MEDIUM
next_action: "Proceed to s03 Open Questions; Spec, Contract, DoR, Approach, Task Plan, Release, Business Acceptance, and DoD remain unpassed."
```
