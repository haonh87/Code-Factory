---
artifact_id: "stabilize-architecture-skill-bundle.s01.restate"
artifact_family: workflow-step
work_item_slug: "stabilize-architecture-skill-bundle"
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
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CHANGE-002"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
  - "changes/CHANGE-002/spec-delta/srs.delta.md"
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
    - "ba"
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
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "work-items/architecture-role-skills/architecture-role-skills.s08.verification.md"
  - "work-items/arch-role-skills-release/arch-role-skills-release.s08.verification.md"
linked_artifacts:
  - "changes/CHANGE-002/proposal.md"
  - "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.work-item-report.json"
  - "product-specs/cards/architecture-role-skills.md"
  - "product-specs/cards/arch-role-skills-release.md"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Tóm tắt yêu cầu, phạm vi ban đầu, ràng buộc và governance context mở đầu.

## Step Contract
```yaml
step_goal: "Clarify the corrective v2.4.0 release boundary, normalize the seven reviewed finding groups, expose architecture drivers, and identify the human gates required before design or implementation."
input_summary:
  - "User request to fix the v2.3.2 findings and add architecture-modeling to the bundle"
  - "User selection of option A: one CHANGE-002 targeting v2.4.0"
  - "Review evidence from the exact v2.3.2 tag"
  - "Frozen architecture-role-skills and arch-role-skills-release spec cards"
  - "Read-only local architecture-modeling candidate under .claude/skills"
output_summary:
  - "Materialized CHANGE-002 and the stabilize-architecture-skill-bundle workflow"
  - "Normalized scope, assumptions, dependencies, risks, and draft acceptance criteria"
  - "SA and TA architecture-driver artifacts"
  - "Explicit open questions and approval handoff"
done_when:
  - "The work-item boundary and v2.4.0 release intent are unambiguous"
  - "All reviewed findings map to draft acceptance criteria"
  - "Architecture ownership seams and measurable technical constraints are recorded"
  - "No implementation gate is represented as passed"
owner: "ba"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes; humans approve"
  - "Spec and design before code"
  - "Brownfield baseline and smallest sufficient delta"
  - "Strict governance for packaging, compatibility, rollback, and release impact"
  - "Historical approvals must not be rewritten as if new evidence had existed at the original review time"
required_reviews:
  - "po and ba for work-item/change scope and business acceptance"
  - "ba and qc for Spec and DoR"
  - "developer for Technical Approach"
  - "developer with qc/devops coverage for Task Plan"
  - "qc and devops for DoD and Release"
prohibited_actions:
  - "Do not edit bundle or production source before s04-s06 trusted approvals and work-item activation"
  - "Do not silently reopen the frozen/completed architecture-role-skills work items"
  - "Do not overwrite unrelated dirty files, including workflow-trusted-approval-utils.js"
  - "Do not publish or update global installations before Release approval"
open_governance_questions:
  - "Which human identities and roles will sign work-item, change, Spec, DoR, Approach, Task Plan, Release, and DoD receipts?"
  - "Should invalid historical approval artifacts be corrected and re-reviewed, or preserved and explicitly superseded by CHANGE-002 evidence?"
```

## Main Artifact
```yaml
raw_request: "Fix the findings and add architecture-modeling to the bundle."
restated_request: "Deliver one corrective v2.4.0 change that closes all seven reviewed v2.3.2 finding groups, adds architecture-modeling to the canonical bundle source and both runtimes, aligns the drawing capability with the frozen drawio contract, and produces trustworthy verification and release evidence."
request_type: CHANGE
user_problem_initial: "A clean v2.3.2 installation exposes sa and ta but does not reliably upgrade, cannot fulfill the required landscape path, and contains semantic/documentation defects that mechanical validation did not catch."
business_context_initial: "The bundle is intended to be a reusable workflow pack. Users need a release whose installed behavior, skill contracts, governance evidence, and public documentation agree."
scope_draft:
  in:
    - "Repeat-install and update permission handling for managed runtime roots"
    - "sa/ta YAML schema, threshold enum, block ownership, examples, metrics, and coverage bookkeeping"
    - "Negative validation for evidence-free approved workflow artifacts and inconsistent coverage"
    - "Truthful correction or supersession path for v2.3.2 workflow/release evidence"
    - "architecture-modeling as a canonical source skill with EN/VI content, references, agents metadata, and deterministic drawing support"
    - "Bundle runtime synchronization, inventory, manifests, package metadata, smoke tests, and v2.4.0 release notes"
    - "UTF-8 and bilingual semantic-parity checks for changed documentation"
  out:
    - "Publishing the package or updating global user installations before Release approval"
    - "Changing unrelated workflow features or application code"
    - "Editing the untracked .claude architecture-modeling source in place"
    - "Rewriting historical reviewer identity or timestamps"
    - "Multi-agent delegation"
constraints_initial:
  - "The canonical skill source remains under skills/; runtime trees are generated artifacts"
  - "The architecture-role-skills spec is frozen and requires a change package for semantic changes"
  - "System landscape and integration architecture must satisfy the existing drawio contract"
  - "The current worktree contains unrelated user changes that must be preserved"
  - "Implementation requires a dedicated worktree because the full-track change is cross-cutting and release-sensitive"
assumptions_initial:
  - "The seven finding groups are the findings reported in the preceding v2.3.2 review"
  - "The local .claude/skills/architecture-modeling directory is a read-only candidate baseline, not yet canonical bundle source"
  - "Option A means one CHANGE-002 and one v2.4.0 release, not approval of downstream gates"
open_questions_initial:
  - "Who will sign each required human-controlled gate?"
  - "Will the historical v2.3.2 notes be re-reviewed after factual correction or retained unchanged and superseded by explicit corrective evidence?"
  - "At s05, should deterministic drawio rendering live directly in architecture-modeling or in a bundled helper invoked by that skill?"
dependencies_initial:
  - "Existing installer, runtime sync, manifest, audit, smoke, and workflow validator scripts"
  - "Frozen product specs and CHANGE-002 delta lifecycle"
  - "Local architecture-modeling candidate and sa/ta landscape-quality contracts"
  - "Trusted approval receipts outside the project root"
risks_initial:
  - "Changing approved notes invalidates any digest-based receipt and requires a new human review"
  - "Copying architecture-modeling unchanged would leave the drawio finding unresolved"
  - "Permission hardening can regress either first install, repeat update, or unmanaged-file preservation"
  - "A broad release diff can overlap the user's existing modification to workflow-trusted-approval-utils.js"
  - "Drawio structural validation may pass while first-open visual behavior remains unverified"
notes_for_step_2: "Confirm business value and release success measures while retaining the seven-finding scope boundary."
```

## Requirement Analysis Spec
```yaml
raw_request: "Hãy fix findings và bổ sung architecture-modeling lên bundle"
restated_request: "Create a single corrective v2.4.0 release that fixes all seven reviewed v2.3.2 finding groups and adds an architecture-modeling skill that fulfills the existing sa/ta landscape contract."
request_type: CHANGE
business_context: "Restore trust in the installable workflow bundle by making runtime behavior, architecture capabilities, governance evidence, and public release documentation consistent."
scope_in:
  - "Installer permission remediation with repeat-install regression coverage"
  - "sa/ta contract, ownership, example, metric, and coverage corrections"
  - "Workflow evidence validator improvements and corrective release evidence"
  - "architecture-modeling canonicalization, drawio compatibility, runtime inclusion, and validation"
  - "v2.4.0 metadata, docs, release notes, package dry-run, and UTF-8 checks"
scope_out:
  - "Registry publication and global installation before Release approval"
  - "Unrelated workflow refactors"
  - "Direct modification of user-owned untracked skill files"
open_questions:
  - "Gate approver identities and roles"
  - "Historical evidence correction versus explicit supersession"
  - "The exact renderer/helper boundary to be selected at s05"
assumptions:
  - "All seven findings from the prior review are mandatory"
  - "The target is one v2.4.0 release under CHANGE-002"
  - "The local architecture-modeling skill is reference input only until canonicalized"
dependencies:
  - "workflow bundle installer and runtime sync"
  - "workflow validators and trusted gate receipts"
  - "sa/ta frozen product contract"
  - "drawio XML generation and geometry validation"
risks_initial:
  - "approval evidence can become stale after artifact correction"
  - "runtime permission changes can damage unmanaged content if scope is too broad"
  - "model/render ownership can drift between sa, ta, architecture-modeling, and house presentation skills"
acceptance_criteria_draft:
  - id: AC-001
    description: "Fresh install followed by update succeeds without EACCES for Codex and Claude global/project scopes while unmanaged files remain unchanged."
    measurable: true
  - id: AC-002
    description: "All sa/ta EN/VI schema examples parse as YAML, accept binary threshold status, and contain no compact-map syntax defect."
    measurable: true
  - id: AC-003
    description: "Worked examples obey block ownership: sa emits no TA-owned driver kind or to_devops content, ta emits no SA-owned objective/to_ba content, and their artifacts are not byte-identical."
    measurable: true
  - id: AC-004
    description: "Negative fixtures prove validators reject approved/frozen workflow artifacts with required empty or placeholder evidence and reject inconsistent coverage summaries."
    measurable: true
  - id: AC-005
    description: "M01 through M10, the stated metric count, examples, and verification coverage totals are internally consistent in both languages."
    measurable: true
  - id: AC-006
    description: "architecture-modeling is present in canonical source and both runtimes; the managed inventory is 41 skills per runtime and source-to-runtime diffs are empty."
    measurable: true
  - id: AC-007
    description: "A representative landscape generated through architecture-modeling opens as valid drawio XML with zero box overlaps, zero non-endpoint edge intersections, correct containment, and no more than one stated manual step."
    measurable: true
  - id: AC-008
    description: "Public docs, agent metadata, publish surface, release notes, manifests, and package version truthfully describe the v2.4.0 scope and verification evidence."
    measurable: true
  - id: AC-009
    description: "Unit tests, workflow validators, planning/SDD/change validators, bundle smoke tests, pack audit, package dry-run, security/static checks, and UTF-8 checks pass or record an explicit blocker."
    measurable: true
notes_for_next_step: "The work item and CHANGE-002 are approved; proceed to Business Goal, Open Questions, and the s04 review draft without treating them as Spec/Contract/DoR approval."
```

## SA Architecture Drivers
```yaml
invocation:
  skill: sa
  directives_parsed:
    - raw: "fix findings and add architecture-modeling to the bundle"
      interpreted_as: extra_output
      effect: "include the missing architecture-modeling capability in the corrective release boundary"
    - raw: "A"
      interpreted_as: profile
      effect: "single CHANGE-002 targeting v2.4.0"
  directives_unresolved: []
  selected_profile: driver+landscape
  profile_source: escalated
  escalation_reasons:
    - "The change modifies public skill contracts and spans canonical source, two runtimes, installer, validators, and release surfaces."
objectives:
  applicable: true
  reason: ""
  items:
    - id: OBJ-001
      statement: "Restore trust in repeat installation and update of the workflow bundle."
      measure: "All four mode/scope install-update scenarios complete with zero permission failures and preserve unmanaged files."
      source: "v2.3.2 review finding and user corrective request"
      confidence: stated
    - id: OBJ-002
      statement: "Complete the architecture skill lane on a clean bundle installation."
      measure: "Both runtimes ship 41 managed skills and a representative required landscape is produced and accepted."
      source: "user selection of option A and frozen sa/ta landscape requirements"
      confidence: stated
    - id: OBJ-003
      statement: "Make release and governance claims auditable rather than mechanically green but semantically empty."
      measure: "Known evidence-free approval and coverage-mismatch fixtures are rejected, and v2.4.0 release claims cite passing evidence."
      source: "v2.3.2 review findings"
      confidence: stated
drivers:
  applicable: true
  reason: ""
  items:
    - id: SA-DRV-001
      kind: constraint
      statement: "The seven finding groups and architecture-modeling must ship under one corrective v2.4.0 release boundary."
      origin: { stakeholder: "user", concern: "selected option A", constraint_ref: "CHANGE-002" }
      traces_to: [OBJ-001, OBJ-002, OBJ-003]
      threshold: { status: binary, value: "one v2.4.0 change", reason: "Release boundary is a yes/no constraint." }
      verification: "Check one linked work item, one change package, and v2.4.0 across release metadata."
      architectural_significance: "Controls whether frozen contract changes, corrective fixes, and release evidence are governed together."
      priority: high
    - id: SA-DRV-002
      kind: regulatory
      statement: "Frozen specifications and trusted approvals may only change through CHANGE-002 and new human receipts."
      origin: { stakeholder: "ba/qc", concern: "audit integrity", constraint_ref: "Human-Controlled Gates and trusted receipt policy" }
      traces_to: [OBJ-003]
      threshold: { status: binary, value: "no inferred or fabricated approval", reason: "Audit integrity is pass/fail." }
      verification: "Validate change refs and trusted receipts after each gated artifact is finalized."
      architectural_significance: "Prevents corrective edits from silently rewriting delivery history."
      priority: high
    - id: SA-DRV-003
      kind: system_boundary
      statement: "Canonical skills are owned under skills/, while Claude and Codex runtime trees are derived outputs."
      origin: { stakeholder: "bundle maintainer", concern: "single source of truth", constraint_ref: "runtime sync baseline" }
      traces_to: [OBJ-001, OBJ-002]
      threshold: { status: binary, value: "source-to-runtime diff is empty", reason: "Ownership boundary is structural." }
      verification: "Run runtime sync then recursively compare each managed skill against both runtimes."
      architectural_significance: "Prevents three independently edited copies from drifting."
      priority: high
    - id: SA-DRV-004
      kind: system_boundary
      statement: "sa/ta own the landscape-required decision and acceptance bar; architecture-modeling owns the model, render, and render evidence unless a house presentation skill is explicitly detected."
      origin: { stakeholder: "architecture users", concern: "no missing or competing diagram owner", constraint_ref: "architecture-role-skills REQ-018/020/023/024" }
      traces_to: [OBJ-002]
      threshold: { status: binary, value: "exactly one render owner per invocation", reason: "Ownership ambiguity is categorical." }
      verification: "Exercise no-house-skill and house-skill fixtures and inspect the handoff owner."
      architectural_significance: "Determines whether a required landscape is actually produced or merely commissioned."
      priority: high
    - id: SA-DRV-005
      kind: data_ownership
      statement: "Managed-skill inventory, bundle version, and release verification each need one canonical fact source with derived copies checked for equality."
      origin: { stakeholder: "release owner", concern: "public metadata drift", constraint_ref: "v2.3.2 review findings" }
      traces_to: [OBJ-001, OBJ-002, OBJ-003]
      threshold: { status: quantified, value: "0 conflicting values across canonical and derived surfaces", reason: "" }
      verification: "Run inventory/version/coverage consistency checks over source, runtimes, manifests, docs, and release artifacts."
      architectural_significance: "Conflicting public facts make install, rollback, and verification decisions unreliable."
      priority: high
landscape:
  applicable: true
  reason: "The public contract and multiple runtime/system boundaries require a system-axis landscape at s05."
  question_answered: "Which source, runtime, installer, validator, approval, and release surfaces own each fact or capability in v2.4.0?"
  render_format: drawio
  view_axis: system
  quality_checks: []
  manual_steps: []
  produced_by: ""
input_issues:
  unanchored_drivers: []
  contested_ownership:
    - "The local architecture-modeling candidate hands diagram-tool output to a presentation lane, while sa/ta require architecture-modeling to produce drawio when no such lane exists."
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers: []
  unquantified_nfrs: []
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability:
    - "architecture-modeling is not installed in the current managed Codex runtime; the landscape decision is recorded but no s01 drawing was produced."
metrics:
  applicable: true
  items:
    - { id: M-01, name: "Objective traceability", formula: "drivers tracing to objectives / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "SA-DRV-001..005" }
    - { id: M-02, name: "Objective support", formula: "supported objectives / total objectives", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "OBJ-001..003 traces" }
    - { id: M-03, name: "Driver provenance", formula: "anchored drivers / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "origin fields on SA-DRV-001..005" }
    - { id: M-04, name: "NFR quantification", formula: "quantified drivers / drivers where a number is meaningful", value: "1/1 = 100%; binary drivers excluded", threshold: "100%", calibration: uncalibrated, evidence: "SA-DRV-005 quantified; SA-DRV-001..004 binary" }
    - { id: M-05, name: "Verification coverage", formula: "drivers with verification / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "verification fields on SA-DRV-001..005" }
    - { id: M-06, name: "Handoff coverage", formula: "drivers mapped to downstream blocks / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "handoff.to_ba/to_dev/to_qc" }
    - { id: M-07, name: "Open-item ownership", formula: "owned s03 items / total s03 items", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "stop_condition.pushed_to_s03" }
    - { id: M-08, name: "Option discipline", formula: "direction choices with rejected alternatives / direction choices", value: "not applicable at s01", threshold: "100%", calibration: uncalibrated, evidence: "No technical direction locked" }
    - { id: M-09, name: "Landscape element ownership", formula: "owned landscape elements / total elements", value: "not measured; landscape not yet produced", threshold: "100%", calibration: uncalibrated, evidence: "landscape.produced_by is empty" }
    - { id: M-10, name: "Capability ownership clarity", formula: "capabilities with exactly one owner / capabilities in scope", value: "4/5 = 80%", threshold: "100%", calibration: uncalibrated, evidence: "Drawio render ownership remains contested; other four boundaries are named" }
handoff:
  to_ba:
    applicable: true
    reason: ""
    items:
      - "Turn all seven finding groups and the 41-skill runtime target into s04 acceptance criteria."
      - "Choose the audit-safe treatment for corrected historical approval artifacts."
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Preserve skills/ as canonical and treat runtime trees as generated outputs."
      - "Lock exactly one drawio render owner for the no-house-skill path."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Require negative fixtures for every validator gap and count every release claim."
  to_devops:
    applicable: false
    reason: "owned by /ta"
    items: []
stop_condition:
  met: false
  reason: "The s01 driver extraction is complete, but audit treatment and gate authorities must be resolved before DoR."
  pushed_to_s03:
    - { question: "Correct and re-review historical artifacts, or preserve and supersede them?", owner: "ba/qc" }
    - { question: "Who signs CHANGE-002 and business acceptance?", owner: "po" }
    - { question: "Who signs the v2.4.0 release gate?", owner: "devops/qc" }
```

## TA Architecture Drivers
```yaml
invocation:
  skill: ta
  directives_parsed:
    - raw: "fix findings and add architecture-modeling to the bundle"
      interpreted_as: extra_output
      effect: "analyze installer, validator, render, runtime, compatibility, and release constraints"
  directives_unresolved: []
  selected_profile: driver+landscape
  profile_source: escalated
  escalation_reasons:
    - "Public skill contracts and multiple generated runtimes are affected."
objectives:
  applicable: false
  reason: "owned by /sa"
  items: []
drivers:
  applicable: true
  reason: ""
  items:
    - id: TA-DRV-001
      kind: quality_attribute
      statement: "Install followed by update must remain writable for managed operations and re-hardened afterward without changing unmanaged content."
      origin: { stakeholder: "bundle operator", concern: "repeat update fails with EACCES", constraint_ref: "v2.3.2 installer reproduction" }
      traces_to: [OBJ-001]
      threshold: { status: quantified, value: "4/4 mode-scope scenarios pass; 0 EACCES; 0 unmanaged-file changes", reason: "" }
      verification: "Run isolated Codex/Claude project/global install-update fixtures with hardened managed roots."
      architectural_significance: "Permission handling controls whether the bundle can be safely maintained after first install."
      priority: high
    - id: TA-DRV-002
      kind: quality_attribute
      statement: "Every published YAML example and schema must parse and preserve the declared threshold enum."
      origin: { stakeholder: "skill consumer", concern: "invalid machine-readable contract", constraint_ref: "sa/ta output-schema findings" }
      traces_to: [OBJ-003]
      threshold: { status: quantified, value: "0 parse failures; binary present in every threshold enum copy", reason: "" }
      verification: "Parse fenced YAML from EN/VI schemas and examples in automated tests."
      architectural_significance: "Downstream automation cannot consume malformed or contradictory contracts."
      priority: high
    - id: TA-DRV-003
      kind: quality_attribute
      statement: "Validators must reject every known evidence-free approval and coverage-accounting defect."
      origin: { stakeholder: "qc", concern: "mechanical PASS hides semantic failure", constraint_ref: "v2.3.2 release artifact findings" }
      traces_to: [OBJ-003]
      threshold: { status: quantified, value: "100% of named negative fixtures rejected; 0 false PASS on empty required evidence", reason: "" }
      verification: "Add red fixtures first, observe failure, then update validators and rerun the full suite."
      architectural_significance: "Gate enforcement is part of the bundle's runtime control surface."
      priority: high
    - id: TA-DRV-004
      kind: integration
      statement: "Canonical skill sync must produce exactly 41 managed skills in both runtimes with no source/runtime drift."
      origin: { stakeholder: "release owner", concern: "architecture-modeling missing from clean bundle", constraint_ref: "bundle inventory contract" }
      traces_to: [OBJ-002]
      threshold: { status: quantified, value: "41 skills in each runtime; recursive diff count = 0", reason: "" }
      verification: "Run runtime sync, inventory assertions, bundle smoke, and package dry-run."
      architectural_significance: "The generated runtime is the actual user-facing capability surface."
      priority: high
    - id: TA-DRV-005
      kind: quality_attribute
      statement: "The no-house-skill landscape path must emit structurally valid drawio with computable geometry quality."
      origin: { stakeholder: "architecture reviewer", concern: "required landscape cannot be produced", constraint_ref: "REQ-020/023/024 and landscape-quality-bar" }
      traces_to: [OBJ-002]
      threshold: { status: quantified, value: "0 overlaps; 0 non-endpoint edge intersections; 0 containment errors; <=1 manual step", reason: "" }
      verification: "Generate a representative multi-domain landscape, parse drawio XML, run geometry checks, and perform first-open visual confirmation."
      architectural_significance: "This closes the contract seam between sa/ta commissioning and architecture-modeling production."
      priority: high
    - id: TA-DRV-006
      kind: integration
      statement: "The v2.4.0 package must preserve rollback and compatibility with v2.3.2 installations while making new capability observable."
      origin: { stakeholder: "devops", concern: "release and rollback risk", constraint_ref: "strict governance release lane" }
      traces_to: [OBJ-001, OBJ-002, OBJ-003]
      threshold: { status: binary, value: "rollback instructions and compatibility evidence present", reason: "Release compatibility is verified as a contract." }
      verification: "Install v2.3.2 fixture, update to candidate v2.4.0, inspect status/inventory, and execute documented rollback in isolation."
      architectural_significance: "The release changes installer state, managed inventory, and public contracts together."
      priority: high
landscape:
  applicable: true
  reason: "The change crosses source, generated runtime, installed runtime, validator, approval, and release boundaries."
  question_answered: "Where can a source, permission, schema, model, render, evidence, or version change fail as it moves into the installed v2.4.0 bundle?"
  render_format: drawio
  view_axis: system
  quality_checks: []
  manual_steps: []
  produced_by: ""
input_issues:
  unanchored_drivers: []
  contested_ownership:
    - "The architecture-modeling candidate and sa/ta contract disagree on who produces drawio when no house presentation skill exists."
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers: []
  unquantified_nfrs: []
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability:
    - "The current managed runtime does not expose architecture-modeling, so the required landscape cannot yet be commissioned through the installed bundle."
metrics:
  applicable: true
  items:
    - { id: M-01, name: "Objective traceability", formula: "drivers tracing to objectives / total drivers", value: "6/6 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "TA-DRV-001..006" }
    - { id: M-02, name: "Objective support", formula: "supported objectives / total objectives", value: "not emitted by ta; measured in sa", threshold: "100%", calibration: uncalibrated, evidence: "objectives owned by /sa" }
    - { id: M-03, name: "Driver provenance", formula: "anchored drivers / total drivers", value: "6/6 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "origin fields on TA-DRV-001..006" }
    - { id: M-04, name: "NFR quantification", formula: "quantified drivers / drivers where a number is meaningful", value: "5/5 = 100%; binary driver excluded", threshold: "100%", calibration: uncalibrated, evidence: "TA-DRV-001..005 quantified; TA-DRV-006 binary" }
    - { id: M-05, name: "Verification coverage", formula: "drivers with verification / total drivers", value: "6/6 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "verification fields on TA-DRV-001..006" }
    - { id: M-06, name: "Handoff coverage", formula: "drivers mapped to downstream blocks / total drivers", value: "6/6 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "handoff.to_dev/to_qc/to_devops" }
    - { id: M-07, name: "Open-item ownership", formula: "owned s03 items / total s03 items", value: "2/2 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "stop_condition.pushed_to_s03" }
    - { id: M-08, name: "Option discipline", formula: "direction choices with rejected alternatives / direction choices", value: "not applicable at s01", threshold: "100%", calibration: uncalibrated, evidence: "No technical approach selected" }
    - { id: M-09, name: "Landscape element ownership", formula: "owned landscape elements / total elements", value: "not measured; landscape not produced", threshold: "100%", calibration: uncalibrated, evidence: "landscape.produced_by is empty" }
    - { id: M-10, name: "Capability ownership clarity", formula: "capabilities with exactly one owner / capabilities in scope", value: "reported by sa system lens", threshold: "100%", calibration: uncalibrated, evidence: "SA metric M-10" }
handoff:
  to_ba:
    applicable: false
    reason: "owned by /sa"
    items: []
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Design permission recovery/hardening as an idempotent managed-operation boundary."
      - "Select the smallest deterministic drawio renderer/helper that satisfies the frozen contract."
      - "Preserve canonical-source to generated-runtime direction."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Use red fixtures for installer, schema, ownership, evidence, coverage, render geometry, and inventory defects."
  to_devops:
    applicable: true
    reason: ""
    items:
      - "Define candidate install/update/rollback smoke paths for v2.3.2 to v2.4.0."
      - "Require release approval before registry publication or global update."
stop_condition:
  met: false
  reason: "Technical drivers are extracted; the rendering boundary and historical evidence policy remain human-gated inputs to s04/s05."
  pushed_to_s03:
    - { question: "Which audit-safe historical evidence policy is approved?", owner: "ba/qc" }
    - { question: "Who owns Release approval and rollback acceptance?", owner: "devops/qc" }
```

## Work Item Materialization
```yaml
materialization_status: READY
decision_owner: agent
raw_request_summary: "Fix all reviewed v2.3.2 findings and add architecture-modeling in one v2.4.0 release."
split_decision: single
dedup_result: no_conflict
delivery_context: brownfield
work_item_slug: "stabilize-architecture-skill-bundle"
work_item_type: CHANGE
change_strategy: create_new
change_id: "CHANGE-002"
decision_reason:
  - "The user explicitly selected option A."
  - "Existing near matches are frozen/completed and the original spec explicitly assigns architecture-modeling to a separate work item."
existing_refs:
  - "work-items/architecture-role-skills"
  - "work-items/arch-role-skills-release"
blockers: []
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
```

## Work Item Protocol
```yaml
protocol_status: DONE
approval_status: APPROVED
review_required: true
work_item_slug: "stabilize-architecture-skill-bundle"
work_item_type: CHANGE
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/stabilize-architecture-skill-bundle"
current_step: "s08"
granted_write_paths:
  - ".claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0"
  - "work-items/stabilize-architecture-skill-bundle"
  - "changes/CHANGE-002"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: create_new
change_id: "CHANGE-002"
decision_owner: "agent"
protocol_owner: "developer"
reviewed_by: "po"
reviewed_at: "2026-08-14T14:04:13.699Z"
handoff_target: "archive-lifecycle"
last_transition_action: "close"
last_transition_at: "2026-08-17T11:19:42.182Z"
required_actions:
  - "Archive the work item when all downstream lifecycle actions are complete."
blockers: []
review_notes:
  - "Human review approved."
refs:
  - "changes/CHANGE-002"
  - "work-items/stabilize-architecture-skill-bundle"
  - "work-items/architecture-role-skills"
  - "work-items/arch-role-skills-release"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "CHANGE_CREATED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "WORK_ITEM_APPROVED"
  - "S04_GATES_APPROVED"
  - "TECHNICAL_APPROACH_DRAFTED"
  - "APPROACH_REVIEWED"
  - "APPROACH_GATE_APPROVED"
  - "TASK_PLAN_DRAFTED"
  - "TASK_PLAN_REVIEWED"
  - "WORK_ITEM_ACTIVATED"
  - "VERIFICATION_CONFIRMED"
  - "DONE_CONFIRMED"
```

## Traceability
```yaml
source_inputs:
  - "User request and option-A selection"
  - "Exact-tag v2.3.2 review findings"
  - "product-specs/cards/architecture-role-skills.md"
  - "product-specs/cards/arch-role-skills-release.md"
  - ".claude/skills/architecture-modeling/SKILL.md (read-only candidate source)"
  - "skills/analysis/sa and skills/analysis/ta"
next_step: "s06 Task Plan review; s07 remains closed until the Task Plan trusted receipt passes"
```

## Handoff
- Clear: one CHANGE-002, one full-track/strict-governance work item, and target release v2.4.0.
- Track: T0-T8 execution order, required worktree, TDD targets, targeted two-tier reviews, and release-candidate controls.
- Condition for step 7: human developer approval of s06 with a digest-matched trusted receipt; implementation remains closed.
