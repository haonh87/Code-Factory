---
artifact_id: "add-diagram-design-adapter.s01.restate"
artifact_family: workflow-step
work_item_slug: "add-diagram-design-adapter"
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
change_id: "CHANGE-005"
change_status: draft
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
execution_roles: []
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
  - "requirement-analysis"
  - "sa"
  - "ta"
  - "step-goal-contract"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s08.verification.md"
  - "work-items/artifact-governance-model/artifact-governance-model.s08.verification.md"
  - "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.s01.restate.md"
linked_artifacts:
  - "changes/CHANGE-005/proposal.md"
  - "work-items/add-diagram-design-adapter/add-diagram-design-adapter.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Tóm tắt yêu cầu, phạm vi ban đầu, ràng buộc và governance context mở đầu.

## Step Contract
```yaml
step: "s01 Clarify"
goal: "Establish one reviewable brownfield change boundary for a governed presentation adapter downstream of architecture-modeling, without changing SA/TA pre-design authority or canonical architecture ownership."
value: "Reviewers can decide whether the adapter is safe, traceable, non-competing, and distributable before any skill, runtime, dependency, or installation state is changed."
scope_in:
  - "Normalize the user-selected adapter direction and materialize CHANGE-005."
  - "Record the SA and TA drivers that constrain artifact ownership, traceability, security, packaging, and rollback."
  - "Draft measurable acceptance criteria for a canonical-model-to-presentation-artifact handoff."
  - "Record collisions with active or completed work items and keep their owned scope unchanged."
scope_out:
  - "Editing SA, TA, architecture-modeling, runtime, test, manifest, or release files."
  - "Installing diagram-design or architecture-modeling globally."
  - "Selecting the final adapter shape, vendoring model, release version, or installation mechanism."
  - "Approving Work Item, Change, Spec, Contract, DoR, Approach, Task Plan, DoD, Release, or Business Acceptance."
inputs_required:
  - "User selection of the adapter direction."
  - "Current SA/TA contracts and their s01-s04 authority boundary."
  - "Current architecture-modeling model, view, and exactly-one render-owner contracts."
  - "Reviewed diagram-design capability, security, output-format, and provenance evidence."
  - "Existing work items and changes used for dedup and baseline review."
outputs_required:
  - "A materialized CHANGE-005 proposal and work-item protocol report with approvals pending."
  - "A complete requirement-analysis artifact with measurable draft acceptance criteria."
  - "SA and TA driver artifacts with owned handoffs, visible gaps, and reproducible metrics."
  - "An evidence-based s01 audit and handoff to human review."
done_when:
  - "The adapter is one distinct work item, linked to CHANGE-005, with no unresolved dedup collision."
  - "Direct rendering inside SA/TA and replacement of canonical architecture artifacts are explicitly out of scope."
  - "Every declared driver is anchored, traceable, verifiable, and routed to a downstream owner."
  - "All unresolved design, distribution, release, and approval questions are routed to s03 or a named human role."
  - "No implementation, installation, or human-controlled gate approval is implied."
constraints:
  hard_constraints:
    - "AI proposes and humans approve every mandatory workflow and change gate."
    - "SA and TA remain pre-design driver skills at s01-s04 and must not generate presentation artifacts."
    - "Architecture-modeling remains owner of canonical architecture facts and governed canonical views."
    - "A presentation artifact may not introduce any fact absent from its declared source_fact_ids."
    - "Each artifact ID has exactly one render owner; canonical and presentation outputs must be distinct artifacts."
  soft_constraints:
    - "Prefer an additive adapter and existing handoff surfaces over changing the fixed SA/TA output schema."
    - "Keep the external presentation dependency pinned and updatable without copying unnecessary upstream content."
  prohibited_actions:
    - "Do not edit production skill or managed runtime files before s04-s06 approvals and s07 activation."
    - "Do not run arbitrary URL onboarding or treat fetched page content as trusted instructions."
    - "Do not publish, globally install, or auto-update an unapproved external dependency."
    - "Do not modify the active CHANGE-004 artifacts or owned implementation paths."
  compliance_checks:
    - "Require Contract review for the adapter handoff and public skill behavior."
    - "Verify source_fact_ids coverage, artifact ownership, dependency provenance, security defaults, rollback, runtime parity, and UTF-8 encoding."
    - "Run workflow, planning, change, protocol, pack, reference, and representative behavior checks at the applicable steps."
risks:
  - id: "RISK-001"
    description: "The adapter could move rendering or design authority into SA/TA."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Keep SA/TA limited to question, audience, and handoff intent; enforce negative contract tests for direct rendering or solution selection."
    contingency: "Remove upstream invocation and return all model/render work to s05 architecture-modeling plus the downstream adapter."
    owner: "developer"
    status: OPEN
  - id: "RISK-002"
    description: "Canonical and presentation outputs could become competing sources of truth or use two renderers for one artifact."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Assign separate artifact IDs, one source model, source_fact_ids, and exactly one owner per artifact."
    contingency: "Block the presentation artifact and retain only the canonical architecture output."
    owner: "developer/qc"
    status: OPEN
  - id: "RISK-003"
    description: "An unpinned external skill or URL onboarding path could create supply-chain or prompt-injection exposure."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Pin a reviewed commit and digest, record license/capabilities, disable arbitrary URL onboarding by default, and verify packaged checks."
    contingency: "Keep the adapter disabled and use the existing canonical renderer only."
    owner: "security/developer"
    status: OPEN
  - id: "RISK-004"
    description: "Generated presentation content could be visually polished but semantically drift from the architecture model."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Reject facts without source_fact_ids and validate content traceability before aesthetic review."
    contingency: "Discard the derivative artifact and regenerate only after the model handoff is corrected."
    owner: "qc"
    status: OPEN
  - id: "RISK-005"
    description: "The new scope could collide with active CHANGE-004 SA/TA edits or create runtime parity drift."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Do not edit SA/TA; sequence shared runtime packaging after CHANGE-004 and use canonical-to-runtime sync plus recursive diff."
    contingency: "Pause packaging until CHANGE-004 lands, then rebase the adapter change on the verified baseline."
    owner: "developer"
    status: OPEN
timebox:
  target_duration: "One s01 authoring and validation pass"
  deadline: ""
  escalation_rule: "Move unresolved adapter shape, dependency distribution, versioning, or approval authority to s03 with a named owner; do not guess."
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes; humans approve."
  - "Spec and design before code."
  - "Brownfield baseline and smallest correct delta."
  - "One canonical fact model and exactly one render owner per artifact."
  - "Strict governance for public skill contracts, external dependencies, runtime parity, and release claims."
required_reviews:
  - "po for work-item/change boundary and Business Acceptance"
  - "ba for Spec and business-facing outcome"
  - "developer for Contract and Technical Approach"
  - "qc for DoR, traceability/security evidence, and DoD"
  - "devops or qc for Release if a bundle or installation artifact is produced"
prohibited_actions:
  - "Do not edit or invoke SA/TA as renderers."
  - "Do not replace canonical Draw.io, Mermaid, or Structurizr outputs with presentation derivatives."
  - "Do not fetch arbitrary brand URLs or follow page-provided instructions."
  - "Do not publish or install before the matching human-controlled gates pass."
open_governance_questions:
  - "Will the external skill be vendored, installed as a pinned dependency, or wrapped without redistribution?"
  - "Which bundle version and release vehicle will carry the adapter?"
  - "Which named humans will approve Work Item, CHANGE-005, Spec, Contract, DoR, Approach, Task Plan, DoD, Release, and Business Acceptance?"
```

## Artifact Chính
```yaml
raw_request: "Tôi muốn dùng skill diagram-design cho role SA, TA. Dùng hướng adapter."
restated_request: "Create a governed presentation adapter downstream of architecture-modeling so SA and TA can request polished diagram-design derivatives without drawing directly, changing their fixed output ownership, or replacing canonical architecture artifacts."
request_type: CHANGE
user_problem_initial: "SA and TA can decide that a visual is needed, but the current runtime has no governed path from their intent through canonical architecture facts to a polished stakeholder-facing derivative."
business_context_initial: "Architecture stakeholders need presentation-quality visuals while engineering still needs a trustworthy model, editable canonical diagrams, explicit ownership, and evidence that no architecture fact was invented during rendering."
scope_draft:
  in:
    - "Adapter handoff from SA/TA visual intent to architecture-modeling model/view output and then to a presentation renderer."
    - "Separate canonical and presentation artifact identities with exactly one owner each."
    - "source_fact_ids traceability, security defaults, dependency provenance, packaging, rollback, parity, and verification."
    - "Representative business and engineering presentation scenarios."
  out:
    - "Direct drawing inside SA/TA or changes to their fixed schema/block ownership."
    - "Replacing architecture-modeling or canonical Draw.io, Mermaid, or Structurizr artifacts."
    - "Arbitrary URL-based brand extraction."
    - "Editing CHANGE-004 or unrelated dirty files."
    - "Global installation, auto-update, or registry publication before approval."
constraints_initial:
  - "SA/TA operate at s01-s04; modeling and rendering happen downstream after readiness and approach gates."
  - "diagram-design outputs HTML/SVG/PNG, not canonical editable Draw.io or Structurizr source."
  - "The current personal Codex runtime has neither architecture-modeling nor diagram-design installed."
  - "The reviewed upstream baseline is commit 5f1b6ddc66036554dd68701798bd12aa5e3ef3f9; later updates require a new review."
  - "The repository currently has active user-owned CHANGE-004 work touching SA/TA, so this work item must avoid those paths."
assumptions_initial:
  - "The user's adapter selection means canonical architecture artifacts remain authoritative and the polished output is a derivative."
  - "No MCP client is required because the selected external capability is a file-based skill/plugin."
  - "A new public adapter capability needs a separate change package and Contract review."
open_questions_initial:
  - "Should the adapter vendor the reviewed skill, declare a pinned external dependency, or require a separately installed plugin?"
  - "Which presentation formats and audiences are mandatory for the first release?"
  - "Where should the adapter contract live without changing the SA/TA schema?"
  - "Which bundle version, rollout sequence, and rollback boundary should be used?"
  - "Which human reviewers own the pending gates?"
dependencies_initial:
  - "Canonical SA/TA contracts and active CHANGE-004 sequencing."
  - "Canonical architecture-modeling model, view, render-ownership, and quality contracts."
  - "Reviewed diagram-design source at the pinned candidate commit."
  - "Artifact-governance, runtime sync, pack audit, and workflow/change validators."
risks_initial:
  - "Authority or source-of-truth drift."
  - "Untraceable model facts in a polished derivative."
  - "External dependency and URL onboarding exposure."
  - "Non-deterministic layout masking semantic regression."
  - "Runtime/version conflicts with active CHANGE-004."
notes_for_step_2: "Lock the user value and measurable success of a presentation derivative while keeping the final adapter structure and distribution model open for s03-s05."
```

## Work Item Protocol
```yaml
protocol_status: MATERIALIZED
approval_status: APPROVED
review_required: true
work_item_slug: "add-diagram-design-adapter"
work_item_type: CHANGE
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/add-diagram-design-adapter"
current_step: "s06"
granted_write_paths: []
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: create_new
change_id: "CHANGE-005"
decision_owner: "agent"
protocol_owner: "po"
reviewed_by: "po"
reviewed_at: "2026-08-21T03:47:48.570Z"
handoff_target: "t0-prerequisite-resolution"
last_transition_action: "readiness-check"
last_transition_at: "2026-08-21T14:44:48Z"
required_actions:
  - "Complete CHANGE-004 to VERIFIED, then re-read the resulting baseline and recheck CHANGE-005 compatibility"
  - "Explicitly approve and provision Python Playwright plus compatible Chromium, then pass import and launch preflight"
  - "After all T0 prerequisites pass, revalidate trusted receipts and activate s07 with explicit write roots"
blockers:
  - "CHANGE-004 is MATERIALIZED at s01, not VERIFIED"
  - "Python Playwright is not installed; Chromium launch preflight cannot run"
review_notes:
  - "Human review approved."
refs:
  - "changes/CHANGE-005"
  - "work-items/add-diagram-design-adapter"
  - "work-items/integrate-design-checklists-into-sa-ta"
  - "work-items/artifact-governance-model"
  - "work-items/stabilize-architecture-skill-bundle"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "CHANGE_CREATED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "WORK_ITEM_APPROVED"
  - "STEP_OPENED"
  - "STEP_OPENED"
  - "GATE_REVIEW_RECORDED"
  - "STEP_OPENED"
  - "STEP_OPENED"
  - "GATE_REVIEW_RECORDED"
  - "GATE_REVIEW_RECORDED"
  - "INPUT_READINESS_BLOCKED"
```

## Traceability
```yaml
source_inputs:
  - "User selection: Dùng hướng adapter"
  - "skills/analysis/sa/SKILL.md"
  - "skills/analysis/ta/SKILL.md"
  - "skills/architecture/architecture-modeling/SKILL.md"
  - "skills/architecture/architecture-modeling/references/render-routing.md"
  - "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s08.verification.md"
  - "work-items/artifact-governance-model/artifact-governance-model.s08.verification.md"
  - "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.work-item-report.json"
  - "diagram-design reviewed candidate commit 5f1b6ddc66036554dd68701798bd12aa5e3ef3f9"
next_step: "s02 Business Goal after human review of Work Item, CHANGE-005, and this s01 boundary"
```

## Handoff
- Điều đã rõ: adapter là presentation lane downstream; SA/TA không vẽ; architecture-modeling và canonical artifacts giữ source-of-truth ownership.
- Điều còn cần theo dõi: distribution model, first-release formats, adapter contract placement, release version, sequencing with CHANGE-004, and named reviewers.
- Điều kiện sang step 2: human reviews the singular CHANGE-005 boundary and confirms the business-goal authoring path; implementation gates remain closed.

## Requirement Analysis Spec
```yaml
raw_request: "Tôi muốn dùng skill diagram-design cho role SA, TA. Dùng hướng adapter."
restated_request: "Add one governed adapter capability that consumes approved architecture-modeling facts and produces a separately identified diagram-design presentation derivative requested by SA/TA, without changing SA/TA authority or canonical architecture ownership."
request_type: CHANGE
business_context: "Give architecture stakeholders polished, audience-specific visuals while preserving trustworthy engineering artifacts, ownership, traceability, and rollback."
scope_in:
  - "Define the request and handoff path from SA/TA visual intent through architecture-modeling to a presentation derivative."
  - "Keep canonical and presentation artifacts separate, with one render owner per artifact ID."
  - "Require complete source_fact_ids coverage and reject invented architecture facts."
  - "Pin external dependency provenance and define safe security defaults, packaging, update, and rollback behavior."
  - "Verify canonical/runtime parity and representative business and engineering scenarios."
scope_out:
  - "Direct rendering, model construction, or solution selection inside SA/TA."
  - "Changing the current SA/TA schema or block-ownership meanings."
  - "Replacing canonical Draw.io, Mermaid, or Structurizr artifacts."
  - "Arbitrary URL onboarding, global installation, auto-update, or publication before approval."
  - "Changing active CHANGE-004 content or unrelated user-owned worktree changes."
open_questions:
  - "Distribution model: vendored adapter, pinned external dependency, or separately installed plugin."
  - "Mandatory first-release formats and audience profiles."
  - "Smallest compatible contract location that does not change the SA/TA schema."
  - "Bundle version, rollout sequence, rollback boundary, and named gate reviewers."
  - "Acceptable visual repeatability tolerance for a model-driven but non-deterministic renderer."
assumptions:
  - "The canonical model and governed architecture artifact remain the source of truth."
  - "The presentation derivative has a different artifact ID and purpose from the canonical artifact."
  - "The reviewed upstream commit is a candidate pin, not permission to auto-update."
  - "No MCP server or client is required."
dependencies:
  - "Current SA/TA, architecture-modeling, artifact-governance, and workflow-bundle contracts."
  - "Reviewed diagram-design candidate source and MIT license."
  - "Runtime sync, validation, packaging, and rollback tooling."
  - "Sequencing with active CHANGE-004 before shared runtime packaging."
risks_initial:
  - "Role and source-of-truth authority drift."
  - "Competing artifact ownership or invented visual facts."
  - "External dependency, prompt-injection, and update provenance exposure."
  - "Semantic regression hidden by visual polish or layout variability."
  - "Runtime parity and release collision with active changes."
acceptance_criteria_draft:
  - id: "AC-001"
    description: "Representative SA and TA runs can request a presentation derivative but generate zero diagram artifacts and make zero model or solution decisions before the s05 handoff."
    measurable: true
  - id: "AC-002"
    description: "Every presentation artifact declares a unique artifact ID, one render owner, its canonical model source, audience, question answered, and complete source_fact_ids."
    measurable: true
  - id: "AC-003"
    description: "The adapter rejects rendering when ownership is unresolved, the canonical model/view is missing, required source_fact_ids are absent, or requested content introduces a fact outside the model."
    measurable: true
  - id: "AC-004"
    description: "Canonical Draw.io, Mermaid, or Structurizr artifacts remain unchanged and authoritative; presentation HTML/SVG/PNG files are explicitly marked as non-canonical derivatives."
    measurable: true
  - id: "AC-005"
    description: "The selected external dependency is pinned by repository, commit, and digest; its license, Read/Write capabilities, optional dependencies, update policy, and rollback path are recorded."
    measurable: true
  - id: "AC-006"
    description: "Every emitted presentation artifact passes the packaged self-check and security policy with zero blocking findings, zero arbitrary URL onboarding, and no unapproved active content."
    measurable: true
  - id: "AC-007"
    description: "Contract, negative behavior, traceability, provenance, parity, packaging, rollback, workflow, change, pack-audit, diff, and UTF-8 checks pass or record an explicit blocker."
    measurable: true
  - id: "AC-008"
    description: "Implementation touches no CHANGE-004-owned SA/TA paths; any shared runtime packaging is sequenced against the verified post-CHANGE-004 baseline."
    measurable: true
notes_for_next_step: "Proceed to Business Goal only after Work Item and CHANGE-005 review; keep adapter structure, dependency distribution, version, and repeatability tolerance open for s03-s05."
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
    - id: OBJ-001
      statement: "Allow SA/TA stakeholders to request polished architecture presentation artifacts without moving design or rendering authority into s01-s04."
      measure: "Representative SA and TA cases emit 0 diagram artifacts and produce an actionable downstream request in 100% of applicable cases."
      source: "user-selected adapter direction and current SA/TA authority contract"
      confidence: stated
    - id: OBJ-002
      statement: "Preserve one trusted architecture fact source while offering audience-specific presentation derivatives."
      measure: "100% of presentation facts trace to the canonical model and 0 derivatives are labeled canonical."
      source: "architecture-modeling one-model/many-views and artifact-governance contracts"
      confidence: stated
    - id: OBJ-003
      statement: "Adopt the external presentation capability through a reviewable, reversible, and separately releasable change."
      measure: "Pinned provenance and rollback evidence exist, with 0 unapproved installs, updates, or release claims."
      source: "user request and strict governance context"
      confidence: stated
drivers:
  applicable: true
  reason: ""
  items:
    - id: SA-DRV-001
      kind: system_boundary
      statement: "SA and TA own architecture-driver analysis and presentation intent only; canonical modeling and downstream rendering remain outside s01-s04."
      origin:
        stakeholder: "architecture role owners"
        concern: "avoid competing design and rendering authorities"
        constraint_ref: "current SA/TA Out Of Scope and workflow step ownership"
      traces_to: [OBJ-001, OBJ-002]
      threshold:
        status: binary
        value: "no model construction, solution selection, or artifact rendering inside SA/TA"
        reason: "Authority separation is pass/fail."
      verification: "Run representative and negative prompts; inspect SA/TA output and file changes for direct rendering or design decisions."
      architectural_significance: "Crossing this boundary would turn pre-design analysis into a second design authority."
      priority: high
    - id: SA-DRV-002
      kind: data_ownership
      statement: "The architecture model owns stable facts; a presentation derivative may select and restyle only facts named by source_fact_ids."
      origin:
        stakeholder: "architecture reviewers"
        concern: "prevent polished visuals from becoming an unverifiable source of truth"
        constraint_ref: "architecture-modeling model contract"
      traces_to: [OBJ-002]
      threshold:
        status: quantified
        value: "100% visible facts mapped; 0 invented facts"
        reason: ""
      verification: "Compare every visible element and relationship against the declared source_fact_ids and canonical model rows."
      architectural_significance: "A derivative that invents facts cannot be trusted for architecture decisions."
      priority: high
    - id: SA-DRV-003
      kind: constraint
      statement: "Canonical and presentation outputs use distinct artifact IDs and each artifact has exactly one render owner."
      origin:
        stakeholder: "artifact governance owner"
        concern: "avoid competing renderers and ambiguous authority"
        constraint_ref: "architecture-modeling exactly-one-owner rule"
      traces_to: [OBJ-002, OBJ-003]
      threshold:
        status: quantified
        value: "1 owner per artifact ID; 0 competing artifacts"
        reason: ""
      verification: "Validate render plans, artifact IDs, owner fields, and emitted paths for canonical and presentation outputs."
      architectural_significance: "Ambiguous ownership causes drift and makes rollback or review inconclusive."
      priority: high
    - id: SA-DRV-004
      kind: constraint
      statement: "The adapter is additive and must not modify the active CHANGE-004 SA/TA-owned scope."
      origin:
        stakeholder: "repository maintainer"
        concern: "avoid overlapping ownership and merge risk"
        constraint_ref: "CHANGE-004 work-item scope and dirty-worktree policy"
      traces_to: [OBJ-001, OBJ-003]
      threshold:
        status: binary
        value: "no CHANGE-004-owned SA/TA path modification"
        reason: "Scope isolation is pass/fail."
      verification: "Compare changed paths with CHANGE-004 owned scope before every implementation review."
      architectural_significance: "Overlapping public contract edits would make provenance and review ownership ambiguous."
      priority: high
landscape:
  applicable: false
  reason: "This work item changes one workflow-bundle capability and does not move a product-system or owning-team boundary; any adapter flow view belongs to s05."
  question_answered: ""
  render_format: drawio
  view_axis: system
  quality_checks: []
  manual_steps: []
  produced_by: ""
input_issues:
  unanchored_drivers: []
  contested_ownership:
    - "The final owner and contract location for the presentation adapter are not yet locked; developer owns resolution at s05."
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers: []
  unquantified_nfrs:
    - "Visual repeatability tolerance has not been decided; developer and qc must define it before DoR."
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability:
    - "The current personal Codex runtime has neither architecture-modeling nor diagram-design installed; installation remains outside s01."
metrics:
  applicable: true
  items:
    - id: M-01
      applicable: true
      reason: ""
      name: "Objective traceability"
      formula: "drivers tracing to at least one objective / total drivers"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "SA-DRV-001 through SA-DRV-004 all contain non-empty traces_to."
    - id: M-02
      applicable: true
      reason: ""
      name: "Objective support"
      formula: "objectives supported by at least one driver / total objectives"
      value: "3/3 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "OBJ-001 through OBJ-003 are referenced by the SA driver set."
    - id: M-03
      applicable: true
      reason: ""
      name: "Driver provenance"
      formula: "anchored drivers / total drivers"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "Every SA driver contains a stakeholder concern and constraint_ref."
    - id: M-04
      applicable: true
      reason: ""
      name: "NFR quantification"
      formula: "quantified drivers / drivers where a number is meaningful"
      value: "2/2 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "SA-DRV-002 and SA-DRV-003 are quantified; binary authority constraints are excluded."
    - id: M-05
      applicable: true
      reason: ""
      name: "Verification coverage"
      formula: "drivers with verification / total drivers"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "Every SA driver has a non-empty verification field."
    - id: M-06
      applicable: true
      reason: ""
      name: "Handoff coverage"
      formula: "drivers mapped to at least one handoff / total drivers"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "All four SA driver IDs appear in to_ba, to_dev, or to_qc."
    - id: M-07
      applicable: true
      reason: ""
      name: "Open-item ownership"
      formula: "s03 items with named owner / total s03 items"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "All four pushed_to_s03 entries name developer, qc, po, or devops."
    - id: M-08
      applicable: true
      reason: ""
      name: "Option discipline"
      formula: "direction choices with a rejected alternative and reason / total direction choices"
      value: "1/1 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "User selected adapter; direct SA/TA attachment and canonical-renderer replacement were rejected for authority and format reasons."
    - id: M-09
      applicable: false
      reason: "No landscape is required at s01."
      name: "Landscape element ownership"
      formula: "owned landscape elements / total landscape elements"
      value: "n/a"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "landscape.applicable is false."
    - id: M-10
      applicable: true
      reason: ""
      name: "Capability ownership clarity"
      formula: "capabilities with exactly one owner / total capabilities"
      value: "2/3 = 67%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "SA/TA analysis and canonical modeling owners are fixed; presentation adapter ownership remains open for s05."
handoff:
  to_ba:
    applicable: true
    reason: ""
    items:
      - "SA-DRV-001 and SA-DRV-004 -> acceptance criteria for zero direct rendering and zero CHANGE-004 path overlap."
      - "SA-DRV-002 and SA-DRV-003 -> criteria for complete fact traceability and one owner per artifact ID."
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Preserve the s01-s04 versus s05 authority boundary from SA-DRV-001."
      - "Design only within one canonical model, source_fact_ids, separate artifact IDs, and exactly-one-owner constraints from SA-DRV-002 and SA-DRV-003."
      - "Avoid all CHANGE-004-owned SA/TA paths per SA-DRV-004."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Verify representative role boundaries, fact coverage, owner cardinality, and path isolation for SA-DRV-001 through SA-DRV-004."
  to_devops:
    applicable: false
    reason: "owned by /ta"
    items: []
stop_condition:
  met: false
  reason: "SA drivers are complete, but adapter ownership, distribution, release sequencing, and reviewer authority remain open."
  pushed_to_s03:
    - question: "Where should the adapter contract live without changing SA/TA schema ownership?"
      owner: "developer"
    - question: "What visual repeatability threshold is acceptable for presentation derivatives?"
      owner: "qc"
    - question: "Which release version and change sequence should carry the adapter after CHANGE-004?"
      owner: "po/devops"
    - question: "Who are the named reviewers for every required gate?"
      owner: "po"
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
    - id: TA-DRV-001
      kind: integration
      statement: "The presentation adapter consumes an explicit architecture-modeling handoff and fails closed when the canonical model, requested view, artifact ownership, destination, or source_fact_ids are incomplete."
      origin:
        stakeholder: "developer and qc"
        concern: "prevent rendering from incomplete or ambiguous architecture input"
        constraint_ref: "architecture-modeling model and render-routing contracts"
      traces_to: [OBJ-001, OBJ-002]
      threshold:
        status: binary
        value: "render only from a complete accepted handoff"
        reason: "Contract completeness is pass/fail."
      verification: "Run positive and negative adapter fixtures for every required handoff field and ownership state."
      architectural_significance: "A permissive handoff would let the renderer infer missing architecture facts."
      priority: high
    - id: TA-DRV-002
      kind: quality_attribute
      statement: "Every visible system, relationship, label carrying architecture meaning, and status annotation in the derivative traces to a canonical source_fact_id."
      origin:
        stakeholder: "architecture reviewers"
        concern: "semantic correctness must be stronger than visual polish"
        constraint_ref: "one-model/many-views traceability invariant"
      traces_to: [OBJ-002]
      threshold:
        status: quantified
        value: "100% visible architecture facts traced; 0 invented facts"
        reason: ""
      verification: "Compare normalized derivative content with the declared fact IDs and fail on unmapped content."
      architectural_significance: "Untraceable visual content creates a second undocumented architecture model."
      priority: high
    - id: TA-DRV-003
      kind: quality_attribute
      statement: "Every emitted presentation artifact passes the packaged static, accessibility, and security self-check before handoff."
      origin:
        stakeholder: "qc and security"
        concern: "self-contained output must not introduce active-content or accessibility regressions"
        constraint_ref: "diagram-design self-check and repository quality gate"
      traces_to: [OBJ-002, OBJ-003]
      threshold:
        status: quantified
        value: "100% self-check pass; 0 blocking findings; 0 unapproved scripts or remote assets"
        reason: ""
      verification: "Run the pinned self-check and adversarial fixtures on every representative output."
      architectural_significance: "The presentation artifact is distributable content and must be safe to open and review."
      priority: high
    - id: TA-DRV-004
      kind: integration
      statement: "The external presentation capability is consumed only from an explicitly pinned and reviewed repository commit with recorded digest, license, capabilities, and update decision."
      origin:
        stakeholder: "bundle maintainer"
        concern: "avoid silent supply-chain drift"
        constraint_ref: "strict external-dependency governance"
      traces_to: [OBJ-003]
      threshold:
        status: binary
        value: "unpinned or unreviewed dependency is rejected"
        reason: "Dependency identity and review are categorical."
      verification: "Validate repository URL, commit, content digest, license, manifest capabilities, and update receipt."
      architectural_significance: "Following a fast-moving main branch would make behavior and security evidence non-reproducible."
      priority: high
    - id: TA-DRV-005
      kind: quality_attribute
      statement: "Canonical source, managed runtimes, installation behavior, and rollback remain mutually consistent across the supported runtime modes."
      origin:
        stakeholder: "bundle maintainer and devops"
        concern: "avoid availability in source but absence or drift in installed runtimes"
        constraint_ref: "workflow-bundle canonical-to-runtime and rollback contracts"
      traces_to: [OBJ-001, OBJ-003]
      threshold:
        status: quantified
        value: "0 canonical/runtime diffs; 100% supported install/update/rollback cases pass"
        reason: ""
      verification: "Run runtime sync, recursive diff, package dry-run, isolated install/update, and rollback smoke tests."
      architectural_significance: "An adapter that cannot be discovered or safely removed is not an operable capability."
      priority: high
    - id: TA-DRV-006
      kind: quality_attribute
      statement: "The default adapter path performs no arbitrary URL-based brand onboarding or interpretation of fetched page content."
      origin:
        stakeholder: "security reviewer"
        concern: "avoid indirect prompt injection and uncontrolled network access"
        constraint_ref: "reviewed external-skill security finding"
      traces_to: [OBJ-003]
      threshold:
        status: quantified
        value: "0 arbitrary URL fetches in default and representative adapter flows"
        reason: ""
      verification: "Run negative prompts containing brand URLs and inspect tool/network calls and generated profiles."
      architectural_significance: "Untrusted page content could alter agent behavior outside the architecture handoff."
      priority: high
landscape:
  applicable: false
  reason: "This is a workflow capability change; its contract flow belongs to s05 and no product-system landscape question is present."
  question_answered: ""
  render_format: drawio
  view_axis: system
  quality_checks: []
  manual_steps: []
  produced_by: ""
input_issues:
  unanchored_drivers: []
  contested_ownership:
    - "The public adapter contract owner and package/update owner are not yet signed off; developer and devops own resolution."
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers: []
  unquantified_nfrs:
    - "No tolerance exists yet for expected layout variation across repeated generations from identical facts."
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability:
    - "architecture-modeling and diagram-design are absent from the current personal Codex skill installation."
metrics:
  applicable: true
  items:
    - id: M-01
      applicable: true
      reason: ""
      name: "Objective traceability"
      formula: "drivers tracing to at least one objective / total drivers"
      value: "6/6 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "TA-DRV-001 through TA-DRV-006 all contain non-empty traces_to to SA objectives."
    - id: M-02
      applicable: true
      reason: "Computed against the SA objective context without taking ownership of the objectives block."
      name: "Objective support"
      formula: "objectives supported by at least one technical driver / total SA objectives"
      value: "3/3 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "OBJ-001 through OBJ-003 are referenced by the TA driver set."
    - id: M-03
      applicable: true
      reason: ""
      name: "Driver provenance"
      formula: "anchored drivers / total drivers"
      value: "6/6 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "Every TA driver contains a stakeholder concern and constraint_ref."
    - id: M-04
      applicable: true
      reason: ""
      name: "NFR quantification"
      formula: "quantified drivers / drivers where a number is meaningful"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "TA-DRV-002, TA-DRV-003, TA-DRV-005, and TA-DRV-006 are quantified; binary contracts are excluded."
    - id: M-05
      applicable: true
      reason: ""
      name: "Verification coverage"
      formula: "drivers with verification / total drivers"
      value: "6/6 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "Every TA driver has a non-empty verification field."
    - id: M-06
      applicable: true
      reason: ""
      name: "Handoff coverage"
      formula: "drivers mapped to at least one handoff / total drivers"
      value: "6/6 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "All six TA driver IDs appear in to_dev, to_qc, or to_devops."
    - id: M-07
      applicable: true
      reason: ""
      name: "Open-item ownership"
      formula: "s03 items with named owner / total s03 items"
      value: "5/5 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "All five TA pushed_to_s03 entries name developer, qc, devops, security, or po."
    - id: M-08
      applicable: true
      reason: ""
      name: "Option discipline"
      formula: "direction choices with a rejected alternative and reason / total direction choices"
      value: "1/1 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "Adapter selected; direct attachment and canonical renderer replacement rejected."
    - id: M-09
      applicable: false
      reason: "No landscape is required at s01."
      name: "Landscape element ownership"
      formula: "owned landscape elements / total landscape elements"
      value: "n/a"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "landscape.applicable is false."
    - id: M-10
      applicable: true
      reason: ""
      name: "Capability ownership clarity"
      formula: "technical capabilities with exactly one owner / total technical capabilities"
      value: "2/3 = 67%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "Canonical modeling and self-check responsibilities are known; adapter package/update ownership remains open."
handoff:
  to_ba:
    applicable: false
    reason: "owned by /sa"
    items: []
  to_dev:
    applicable: true
    reason: ""
    items:
      - "TA-DRV-001 and TA-DRV-002 -> define a fail-closed handoff with complete fact traceability."
      - "TA-DRV-003, TA-DRV-004, and TA-DRV-006 -> preserve self-check, pinned provenance, and no-URL security constraints."
      - "TA-DRV-005 -> preserve runtime parity, installability, and rollback."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Build positive and negative fixtures for all six TA drivers, including missing fields, invented facts, scripts, URLs, drift, and rollback."
  to_devops:
    applicable: true
    reason: ""
    items:
      - "TA-DRV-004 and TA-DRV-005 -> pin artifact provenance and verify isolated package install/update/rollback without publication."
stop_condition:
  met: false
  reason: "Technical constraints are explicit, but distribution, repeatability, ownership, release, and reviewer decisions remain open."
  pushed_to_s03:
    - question: "Will the adapter vendor, depend on, or require separate installation of the pinned external skill?"
      owner: "developer/security"
    - question: "What layout-repeatability tolerance and semantic comparison method will gate generated presentation output?"
      owner: "qc"
    - question: "Who owns package updates and what rollback unit restores the previous runtime?"
      owner: "devops"
    - question: "Which formats and optional dependencies are mandatory in the first release?"
      owner: "developer/po"
    - question: "Which named humans hold each gate authority?"
      owner: "po"
```

## Audit
```yaml
step: "s01 Clarify"
status: PASS
checks:
  - criterion: "The adapter is one distinct work item linked to CHANGE-005 with no unresolved dedup collision."
    result: PASS
    evidence: "Manual review separates active CHANGE-004 from the adapter and identifies the other semantic matches as DONE baselines; the materialization report records no_conflict."
  - criterion: "Direct rendering inside SA/TA and replacement of canonical architecture artifacts are explicitly out of scope."
    result: PASS
    evidence: "Step Contract, Main Artifact, Requirement Analysis Spec, SA-DRV-001, and AC-001/AC-004 state the boundary."
  - criterion: "Every declared driver is anchored, traceable, verifiable, and routed downstream."
    result: PASS
    evidence: "SA M-01/M-03/M-05/M-06 and TA M-01/M-03/M-05/M-06 each report 100% with row-level evidence."
  - criterion: "Unresolved design, distribution, release, and authority questions have named owners."
    result: PASS
    evidence: "SA and TA stop_condition blocks route nine questions to developer, qc, security, devops, or po with M-07 at 100%."
  - criterion: "No implementation, installation, or gate approval is implied."
    result: PASS
    evidence: "All artifacts remain draft/PENDING_REVIEW, granted_write_paths is empty, and no production skill/runtime path was edited."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one s01 authoring and validation pass."
gaps:
  - "Human Work Item and CHANGE-005 approvals remain pending; this PASS is only the s01 goal audit."
risk_level: MEDIUM
next_action: "Human reviews the work-item/change boundary and authorizes s02 Business Goal; keep all implementation and downstream gates closed."
```
