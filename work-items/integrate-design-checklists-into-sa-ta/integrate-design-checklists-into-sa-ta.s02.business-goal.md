---
artifact_id: "integrate-design-checklists-into-sa-ta.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "integrate-design-checklists-into-sa-ta"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CHANGE-004"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-004/spec-delta/brd.delta.md"
  - "changes/CHANGE-004/spec-delta/srs.delta.md"
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
  - "integrate-design-checklists-into-sa-ta.s01.restate.md"
linked_artifacts:
  - "changes/CHANGE-004/proposal.md"
  - "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Improve architecture-readiness decisions by making SA and TA surface portable, evidence-oriented design concerns before solution selection, without leaking internal HCP decisions or taking authority from downstream design skills.

## Step Contract
```yaml
step: "s02 Business Goal"
goal: "CHANGE-004 has one measurable business objective, observable user outcomes, and explicit non-goals before open questions and acceptance criteria are locked."
value: "Maintainers and architecture practitioners can judge whether the change improves early architecture readiness without confusing checklist activity with business success or authorizing a technical design."
scope_in:
  - "Business value of adding domain-neutral design-readiness guidance to SA and TA"
  - "User outcomes for earlier concern discovery, safe reuse, and trustworthy bundle behavior"
  - "Measurable success outcomes, non-goals, and business risks"
  - "Continuity with OBJ-001 through OBJ-003 and the SA/TA authority boundary from s01"
scope_out:
  - "Selecting the checklist representation, schema shape, storage location, or release version"
  - "Choosing technologies, patterns, system boundaries, data models, or architecture views"
  - "Editing canonical skills, generated runtimes, tests, manifests, or release files"
  - "Approving Spec, Contract, DoR, Approach, Task Plan, or any later gate"
inputs_required:
  - "Approved CHANGE-004 and approved work-item protocol"
  - "s01 restatement, 34-rule routing matrix, SA drivers, and TA drivers"
  - "Current SA/TA contract, ownership, bilingual, runtime, and confidentiality constraints"
outputs_required:
  - "A product-thinking business-goal artifact"
  - "Observable success outcomes and metric candidates"
  - "Explicit non-goals, business risks, and s03 handoff"
done_when:
  - "The user problem and business goal describe outcomes rather than an implementation"
  - "Every s01 objective has at least one observable success outcome"
  - "Measures cover source-rule routing, role boundaries, confidentiality, compatibility, and distributed-copy parity"
  - "Non-goals prevent solution selection, source leakage, unrelated redesign, and premature publication"
  - "No new SA or TA driver is introduced and no s05 authority is moved upstream"
constraints:
  hard_constraints:
    - "Only domain-neutral, redaction-safe concepts may enter publishable SA/TA content."
    - "SA and TA remain pre-design driver skills at s01-s04; system-design and architecture-modeling retain design and modeling authority at s05."
    - "Existing required output blocks and their ownership meanings remain compatible unless the Contract gate explicitly approves an additive change."
    - "Human-controlled gates remain pending until their trusted receipts are sealed."
  soft_constraints:
    - "Prefer a small supplementary change whose value can be verified with existing bundle audit and contract-test lanes."
    - "Avoid checklist volume that creates ceremony without changing a driver, question, handoff, or verification obligation."
  prohibited_actions:
    - "Do not copy HCP-specific products, system names, exact thresholds, decisions, or confidential prose into publishable skill artifacts."
    - "Do not choose the public checklist shape or a technical implementation during discovery."
    - "Do not edit production skill or runtime files before s04-s06 approvals and s07 activation."
  compliance_checks:
    - "Trace business outcomes to OBJ-001 through OBJ-003."
    - "Retain the 34/34 source-rule accounting requirement and zero-leakage requirement."
    - "Keep Contract, Release, and Business Acceptance gates required."
risks:
  - id: "S02-R01"
    description: "A long checklist could add review ceremony without improving architecture decisions."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Require each adopted check to have a trigger, evidence, owner lens, handoff, and verification path."
    contingency: "Remove or defer checks that cannot change an owned driver, question, or downstream obligation."
    owner: "ba"
    status: MONITORING
  - id: "S02-R02"
    description: "Context-specific HCP guidance could be presented as a universal public rule."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Use domain-neutral wording, private R-ID provenance, explicit exclusions, and human Spec/Contract review."
    contingency: "Exclude the affected rule and block Release until leakage checks pass."
    owner: "ba/developer"
    status: MONITORING
  - id: "S02-R03"
    description: "SA or TA could start prescribing a solution rather than exposing a concern."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Measure representative behavior for driver/question extraction and zero solution selection."
    contingency: "Rewrite prescriptive guidance as a downstream handoff or remove it."
    owner: "developer"
    status: MONITORING
timebox:
  target_duration: "One focused s02 authoring and validation pass"
  deadline: ""
  escalation_rule: "Return to s01 if a requested outcome requires HCP-specific publication, a new role boundary, or a scope beyond approved CHANGE-004."
```

## Main Artifact
```yaml
restated_request: "Use the reusable rules and checklists demonstrated by the selected internal design document to strengthen SA and TA as architecture-readiness aids, while keeping the result domain-neutral, confidentiality-safe, and within their pre-design role."
user_problem: "SA and TA currently identify architecture drivers, but practitioners can still miss ownership, authority, lifecycle, integration, compliance, and measurable-transition concerns until the technical design is already being reviewed."
business_goal: "Increase confidence and reduce late architecture rework by making SA and TA consistently surface the relevant, evidence-oriented design-readiness concerns before solution selection, without turning internal HCP decisions into public policy or creating a competing design authority."
user_value: "An architecture practitioner receives earlier, structured prompts about what must be owned, measured, handed off, or verified, while remaining free to evaluate and choose the actual technical design in the established downstream skills."
success_outcome:
  - "All 34 source rules have exactly one auditable route: adopted pre-design check, converted driver question or handoff, deferred to s05+, or excluded as HCP-specific."
  - "Every adopted SA/TA check identifies its trigger, owner lens, expected evidence, downstream handoff, and verification method."
  - "Publishable skill content contains zero HCP-specific system or product names, exact HCP operational thresholds, HCP decisions, or verbatim confidential passages."
  - "At least 6 representative cases correctly surface applicable drivers or questions, with zero cases selecting a technology, pattern, schema, domain boundary, or architecture model."
  - "The existing required SA/TA output blocks retain their ownership meanings, with zero schema-ownership regressions."
  - "Canonical English and Vietnamese resources and both generated runtimes have zero unresolved semantic, reference, or recursive parity differences."
  - "No bundle publication or global installation occurs before Release approval, and the final public inventory and release claims match the verified contents."
non_goals:
  - "Choosing the implementation shape, technology, architecture pattern, domain boundary, schema, diagram, or model"
  - "Copying or publishing the internal HCP document, its system-specific decisions, or its exact operational thresholds"
  - "Turning every source rule into a mandatory universal check"
  - "Redesigning system-design, architecture-modeling, the workflow chain, or unrelated skills"
  - "Editing the external human-capability-documents source"
  - "Using multi-agent execution"
  - "Publishing a release or changing global installations before Release approval"
priority_reason: "Late discovery of ownership, lifecycle, authority, integration, or evidence gaps causes avoidable architecture rework; the internal document supplies a concrete rule corpus that can improve early review if it is generalized, bounded, and verified safely."
risks_business:
  - "Over-generalization could convert a project-specific draft into misleading universal guidance."
  - "Checklist fatigue could increase process cost without improving decisions."
  - "Role drift could make SA/TA prescribe solutions and weaken the established s05 authority boundary."
  - "Confidential source details could leak into distributable bundle content."
  - "Canonical, bilingual, or runtime drift could make the public capability inconsistent across clients."
metrics_candidate:
  - "Source-rule route coverage: 34/34 with exactly one primary route"
  - "Adopted-check evidence completeness: 100% with trigger, owner lens, evidence, handoff, and verification"
  - "Confidentiality leakage: 0 HCP-specific or verbatim confidential items in publishable content"
  - "Representative role-boundary accuracy: at least 6/6 correct driver/question cases and 0 solution-selection cases"
  - "Contract compatibility: 0 required-block ownership regressions and 0 unresolved reference failures"
  - "Distribution parity: 0 unresolved EN/VI semantic mismatches and 0 canonical/runtime recursive differences"
  - "Post-release adoption and architecture-defect escape rate: uncalibrated until a release baseline and observation period are approved"
notes_for_next_step: "At s03, resolve the release/version vehicle, classify which representation questions may wait for s05, confirm rule-publication authority, and identify any missing human inputs that would block measurable s04 criteria."
```

## SA/TA Continuity Check
```yaml
objective_links:
  - "OBJ-001 -> 34/34 routing, adopted-check evidence completeness, and representative driver/question outcomes"
  - "OBJ-002 -> zero HCP-specific leakage and no universalization of source-specific decisions"
  - "OBJ-003 -> zero schema-ownership, bilingual, reference, and canonical/runtime parity regressions"
new_architecture_drivers: []
role_boundary_status: "preserved"
landscape:
  applicable: false
  reason: "This step locks a business outcome for one textual skill-capability change and introduces no cross-system topology or model."
deferred_to_s05:
  - "Checklist representation and placement"
  - "Any compatible additive schema surface"
  - "Canonical-to-runtime materialization mechanics"
```

## Traceability
```yaml
upstream:
  - "integrate-design-checklists-into-sa-ta.s01.restate.md#Main Artifact"
  - "integrate-design-checklists-into-sa-ta.s01.restate.md#Source Rule Classification"
  - "integrate-design-checklists-into-sa-ta.s01.restate.md#SA Architecture Drivers"
  - "integrate-design-checklists-into-sa-ta.s01.restate.md#TA Architecture Drivers"
  - "changes/CHANGE-004/proposal.md"
objective_links:
  - "OBJ-001 -> earlier, measurable architecture-readiness concern discovery"
  - "OBJ-002 -> confidentiality-safe and context-neutral reuse"
  - "OBJ-003 -> contract compatibility and distribution parity"
next_step: "s03 Open Questions"
```

## Audit
```yaml
step: "s02 Business Goal"
status: PASS
checks:
  - criterion: "The user problem and business goal describe outcomes rather than an implementation"
    result: PASS
    evidence: "Main Artifact frames earlier architecture-readiness discovery and reduced rework; representation, schema, and mechanics are deferred."
  - criterion: "Every s01 objective has at least one observable success outcome"
    result: PASS
    evidence: "SA/TA Continuity Check maps OBJ-001, OBJ-002, and OBJ-003 to quantified outcomes."
  - criterion: "Measures cover source-rule routing, role boundaries, confidentiality, compatibility, and distributed-copy parity"
    result: PASS
    evidence: "Metrics Candidate defines 34/34 routing, 100% evidence completeness, zero leakage, at least 6/6 representative cases, zero ownership regressions, and zero unresolved parity differences."
  - criterion: "Non-goals prevent solution selection, source leakage, unrelated redesign, and premature publication"
    result: PASS
    evidence: "Main Artifact explicitly excludes implementation choices, HCP publication, downstream-skill redesign, external-source edits, and release before approval."
  - criterion: "No new SA or TA driver is introduced and no s05 authority is moved upstream"
    result: PASS
    evidence: "SA/TA Continuity Check records new_architecture_drivers as empty, role_boundary_status as preserved, and representation decisions as deferred to s05."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one focused authoring and validation pass."
gaps: []
risk_level: LOW
next_action: "Proceed to s03 Open Questions; no human gate is passed or requested by this audit."
```

## Handoff
- User problem pinned: important architecture-readiness concerns can surface too late even when SA/TA driver extraction is otherwise valid.
- Business outcome pinned: earlier, owned, evidence-oriented concern discovery with zero role drift and zero confidential leakage.
- Non-goals pinned: no solution choice, public HCP content, unrelated redesign, implementation, publication, or gate approval.
- Condition to move to step 3: classify release/version, publication authority, representation timing, and reviewer inputs as answered, blocking, or safely deferred.
