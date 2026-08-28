---
artifact_id: "fix-authoring-smoke-bootstrap.s01.restate"
artifact_family: workflow-step
work_item_slug: "fix-authoring-smoke-bootstrap"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: "CHANGE-006"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/fix-authoring-smoke-bootstrap.md"
spec_status: draft
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
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
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "changes/CHANGE-004/tasks.md"
  - "changes/CHANGE-004/archive-metadata.md"
  - "work-items/approval-path-defects/approval-path-defects.s08.verification.md"
linked_artifacts:
  - "changes/CHANGE-006/proposal.md"
  - "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Materialize one low-risk brownfield bug fix for REL-F01: make the stale authoring-smoke fixture
> agree with the already-approved TD-01 bootstrap behavior, restore the release guardrail, and
> produce a new patch release without rewriting the immutable v2.6.0 tag.

## Step Contract
```yaml
step: "s01 Clarify"
goal: "Establish one reviewable, evidence-backed boundary for resolving REL-F01 and restoring a trustworthy release signal without changing the approved bootstrap behavior or rewriting v2.6.0."
value: "Reviewers can approve a narrowly scoped patch work item knowing exactly which stale assertion failed, which behavior remains authoritative, and which release evidence must turn green before v2.6.1 may be published."
scope_in:
  - "Materialize CHANGE-006 and the fix-authoring-smoke-bootstrap work item."
  - "Trace REL-F01 to the mismatch between runCaseMutatingActionRequiresReport and approved TD-01 behavior."
  - "Define draft acceptance evidence for the 13-case authoring smoke, full Workflow Guardrails chain, exact candidate, rollback, and immutable tagging."
  - "Carry a successful fix through a separately approved GitHub patch release v2.6.1 and then reassess CHANGE-004 archive readiness."
scope_out:
  - "Editing production code, tests, package metadata, tags, releases, or CHANGE-004 during s01."
  - "Moving, deleting, or recreating v2.6.0 or changing its uploaded artifact."
  - "Changing work-item approval semantics, receipt semantics, TTY controls, or TD-01."
  - "Modifying unrelated dirty worktree paths or publishing to npm without separate credentials and release scope."
inputs_required:
  - "GitHub Actions run 32704618485 and its failed Workflow Authoring Smoke log."
  - "A clean-export reproduction against v2.6.0 target commit 7c88f7d564f4c49daecc6eaec345002163f9e9ec."
  - "approval-path-defects REQ-001/AC-001 and its approved TD-01 implementation evidence."
  - "Current run-workflow-authoring-smoke.js fixture and Workflow Guardrails job graph."
outputs_required:
  - "Reviewed CHANGE-006 proposal and materialized work-item protocol report."
  - "Complete s01 requirement analysis plus SA and TA driver blocks."
  - "Explicit open questions, initial risks, release boundary, and draft acceptance criteria."
done_when:
  - "The new work item is distinct from the DONE approval-path-defects item and dedup_result is no_conflict."
  - "The failure is reproducible and the authoritative behavior is traced without selecting the implementation approach."
  - "Scope, non-goals, human gates, drivers, thresholds, verification methods, and next human action are explicit."
  - "No implementation path, release mutation, or approval is inferred."
constraints:
  hard_constraints:
    - "AI proposes; humans approve the work item, CHANGE-006, Spec, DoR, Approach, Task Plan, DoD, Release, and Business Acceptance gates."
    - "Tag v2.6.0 and artifact SHA-256 5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9 remain immutable."
    - "Approved TD-01 bootstrap behavior remains the source of truth unless a separately approved spec change says otherwise."
    - "Unrelated user changes in the shared main worktree must remain untouched."
  soft_constraints:
    - "Prefer the smallest test/release delta that restores the guardrail."
    - "Avoid duplicating approval-path regression coverage when one smoke assertion can prove the end-to-end path."
  prohibited_actions:
    - "Do not edit run-workflow-authoring-smoke.js or any production/release surface before s04 and s06 gates pass and s07 activates."
    - "Do not rerun or overwrite the v2.6.0 release tag as a substitute for a patch release."
    - "Do not mark REL-F01 resolved from local evidence alone."
  compliance_checks:
    - "Verify work-item/change approvals and trusted receipts before activation."
    - "Verify v2.6.0 remote tag target and artifact digest remain unchanged."
    - "Require green local regression and GitHub Workflow Guardrails evidence before v2.6.1 Release approval."
risks:
  - id: "RISK-001"
    description: "A superficial assertion change could make the smoke suite green while no longer proving the approved TD-01 bootstrap behavior."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Lock observable report provenance and approval-state assertions at s04 before choosing the test edit."
    contingency: "Reject the implementation and return to the acceptance/spec boundary."
    owner: "developer/qc"
    status: OPEN
  - id: "RISK-002"
    description: "Publishing v2.6.1 before the dependent Node 18/22 matrix runs would repeat the v2.6.0 release sequencing defect."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Make successful completion of all required Workflow Guardrails jobs a release prerequisite."
    contingency: "Keep the candidate unpublished and block Release."
    owner: "devops/qc"
    status: OPEN
  - id: "RISK-003"
    description: "The shared main worktree contains unrelated user changes that could contaminate the patch."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Use exact owned paths and a dedicated worktree at s07 if overlap or multi-session risk remains."
    contingency: "Stop and isolate before editing."
    owner: "developer"
    status: OPEN
timebox:
  target_duration: "One s01 authoring and validation pass"
  deadline: ""
  escalation_rule: "Push any disagreement about authoritative TD-01 behavior, release scope, or reviewer authority into s03; do not infer it."
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes; humans approve."
  - "Spec and design before code, including for a small test-only behavior alignment."
  - "Brownfield baseline and smallest correct delta."
  - "Release tags are immutable and promotion uses the verified artifact."
  - "A red required CI gate is evidence, not a result to hide or relabel."
required_reviews:
  - "po for Work Item, CHANGE-006, and Business Acceptance"
  - "ba for Spec"
  - "ba and qc for DoR"
  - "developer for Approach and Task Plan"
  - "qc for technical verification and DoD"
  - "devops and qc for Release"
prohibited_actions:
  - "Do not change the v2.6.0 tag, asset, or release target."
  - "Do not edit the failing smoke case before the Light s04 and s06 receipts are approved."
  - "Do not treat a rerun of the unchanged failing commit as remediation."
  - "Do not archive CHANGE-004 while REL-F01 remains open."
open_governance_questions:
  - "Which named humans will execute each required review receipt?"
  - "Should npm remain outside the v2.6.1 release boundary unless credentials are explicitly supplied?"
```

## Artifact Chính
```yaml
raw_request: "hãy theo khuyến nghị"
restated_request: "Create a separately governed patch work item that resolves REL-F01 by aligning the stale authoring-smoke scenario with approved TD-01 behavior, proves the full guardrail chain green, and publishes v2.6.1 without changing v2.6.0."
request_type: BUG
defect_source: code
spec_impact:
  classified: true
  classification: "test_and_release_only"
  public_api_event_data_contract_change: false
  production_behavior_change: false
user_problem_initial: "The public v2.6.0 release exists, but its required Workflow Guardrails run is red because one legacy smoke assertion contradicts the already-approved bootstrap behavior; the dependent release-candidate matrix never ran."
business_context_initial: "A release signal cannot be trusted while a required end-to-end gate is deterministically red, even when the package artifact itself is byte-stable and its focused smoke checks pass."
scope_draft:
  in:
    - "REL-F01 reproduction and trace to the stale mutating-action-requires-report scenario."
    - "The smallest approved test/harness correction that proves TD-01 rather than weakening it."
    - "Authoring smoke, full unit, pack audit, bundle smoke, exact candidate/rollback, and GitHub Workflow Guardrails verification."
    - "A separately approved v2.6.1 GitHub release/tag and CHANGE-004 finding disposition."
  out:
    - "Changing TD-01, production approval semantics, receipt controls, or public APIs."
    - "Rewriting v2.6.0, hiding its failed historical run, or deleting REL-F01 evidence."
    - "Unrelated worktree-and-closure-integrity, CHANGE-005, diagram, or trusted-receipt changes."
    - "npm publication unless explicitly added with valid credentials and Release approval."
constraints_initial:
  - "v2.6.0 annotated tag resolves to 7c88f7d564f4c49daecc6eaec345002163f9e9ec and must remain there."
  - "The retained v2.6.0 artifact digest must remain 5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9."
  - "approval-path-defects is DONE; this new finding must not be backfilled into its sealed artifacts."
  - "The main worktree is dirty with unrelated user-owned changes."
assumptions_initial:
  - "The user's instruction to follow the recommendation selects a new v2.6.1 patch path, not an exception for v2.6.0."
  - "The authoritative behavior is approval-path-defects REQ-001/AC-001: a scaffold-created item can be approved and persists a bootstrap report with auditable provenance."
  - "The v2.6.1 release vehicle remains GitHub Release plus an exact artifact; npm stays outside scope unless separately enabled."
open_questions_initial:
  - "At s05, should the obsolete smoke case be rewritten around successful bootstrap or replaced by a narrower end-to-end scenario while dedicated TD-01 regression coverage remains unchanged?"
  - "Which named reviewers will seal the required human gates?"
dependencies_initial:
  - "GitHub run 32704618485 and clean-export reproduction against v2.6.0."
  - "approval-path-defects Spec Card, s07 implementation evidence, and s08 verification."
  - "Workflow Guardrails job graph, Node 18/22 release-candidate matrix, and release tooling."
  - "CHANGE-004 REL-F01 evidence and archive blocker."
risks_initial:
  - "A green test could be achieved by deleting meaningful coverage."
  - "A patch release could be published before the previously skipped matrix completes."
  - "Shared-worktree contamination could include unrelated edits."
notes_for_step_2: "Lock the value of a trustworthy green release signal and preserve TD-01/v2.6.0 invariants; do not choose the test rewrite until s05 content in the Light s06 host."
```

## Business Goal
```yaml
business_goal: "Restore a trustworthy release gate by resolving the deterministic authoring-smoke mismatch, then publish v2.6.1 from a commit whose full guardrail chain is green while preserving v2.6.0 as immutable history."
success_metrics:
  - "The authoring smoke completes 13/13 cases with zero failures."
  - "Workflow Guardrails concludes SUCCESS with all seven sequential guardrail jobs and both Node 18/22 Release Candidate jobs passing."
  - "The v2.6.1 exact artifact passes candidate and rollback smoke, and its remote uploaded digest matches the approved candidate."
  - "v2.6.0 tag target and artifact digest remain unchanged."
non_goals:
  - "Redesign work-item approval or trusted receipt behavior."
  - "Erase the historical failed v2.6.0 CI run."
  - "Bundle unrelated defects into the patch."
```

## Open Questions
```yaml
open_questions:
  - id: "OQ-001"
    question: "Which minimal smoke-case shape best proves approved TD-01 behavior without duplicating the dedicated regression fixture?"
    owner: "developer"
    due_step: "s05 content hosted in s06"
  - id: "OQ-002"
    question: "Which named people will provide the required Work Item, CHANGE-006, Spec, DoR, Approach, Task Plan, DoD, Release, and Business Acceptance receipts?"
    owner: "po/coordinator"
    due_step: "before each human gate"
  - id: "OQ-003"
    question: "Does v2.6.1 remain GitHub-only, with npm publication explicitly excluded unless credentials are supplied?"
    owner: "devops/po"
    due_step: "s04 release boundary"
missing_inputs:
  - "Named human reviewers for each gate."
conflicts:
  - "The legacy smoke case asserts that approve must not bootstrap a missing report, while approved TD-01 requires approve to bootstrap and persist that report with provenance."
```

## Requirement Analysis Spec
```yaml
raw_request: "hãy theo khuyến nghị"
restated_request: "Follow the recommended patch path: resolve REL-F01 in a new governed work item, prove all release guardrails green, and publish v2.6.1 without moving or recreating v2.6.0."
request_type: BUG
business_context: "The v2.6.0 artifact and focused checks are valid, but a deterministic required CI failure makes the release signal incomplete and prevents honest archive closure."
scope_in:
  - "Preserve the observed RED reproduction for the stale mutating-action-requires-report smoke case."
  - "Align end-to-end smoke expectations with approved TD-01 bootstrap behavior without weakening approval controls."
  - "Run the 13-case authoring smoke, 39-file unit suite, pack audit, bundle smoke, exact candidate/rollback checks, and full GitHub Workflow Guardrails."
  - "Prepare and publish v2.6.1 only after human gates and green remote CI, then update REL-F01 disposition."
scope_out:
  - "Changing work-item approval behavior, report provenance, TTY enforcement, receipt formats, or digest binding."
  - "Moving or replacing v2.6.0 or rewriting its historical CI result."
  - "Fixing unrelated workflow, worktree, receipt, diagram, community-pack, or CHANGE-005 work."
  - "npm publication without credentials and an explicit release boundary."
open_questions:
  - "OQ-001: exact minimal smoke assertion shape, owned by developer at s05/s06."
  - "OQ-002: named human reviewers, owned by po/coordinator."
  - "OQ-003: GitHub-only versus npm-inclusive patch release, owned by devops/po."
assumptions:
  - "The user selected the recommended v2.6.1 patch path rather than accepting REL-F01 as an exception."
  - "approval-path-defects REQ-001/AC-001 is authoritative and remains unchanged."
  - "The patch is low-risk and SDD Light eligible because it is brownfield, quick, default-governance, agentic, self-operated, single-system, and has known code provenance."
dependencies:
  - "CHANGE-004 REL-F01 evidence and GitHub run 32704618485."
  - "approval-path-defects Spec Card and DONE implementation/verification evidence."
  - "Workflow Guardrails on Node 22 plus Release Candidate matrix on Node 18 and 22."
risks_initial:
  - "Removing or weakening a smoke assertion could conceal a real approval regression."
  - "Local green evidence could be mistaken for remote release readiness."
  - "A release metadata bump could expand the diff beyond the reviewed patch boundary."
acceptance_criteria_draft:
  - id: "DRAFT-AC-001"
    description: "A clean export of v2.6.0 reproduces REL-F01 with the exact authoring-smoke mismatch, and the evidence remains linked to run 32704618485."
    measurable: true
  - id: "DRAFT-AC-002"
    description: "The approved implementation proves scaffold-created approval succeeds, persists an auditable legacy-scaffold report, and does not weaken reviewed-by, TTY, or receipt controls."
    measurable: true
  - id: "DRAFT-AC-003"
    description: "The authoring smoke reports 13/13 cases PASS and the dedicated TD-01 regression remains green."
    measurable: true
  - id: "DRAFT-AC-004"
    description: "The 39-file unit suite, workflow pack audit, source bundle smoke, exact candidate smoke, and exact rollback smoke all pass against the patch candidate."
    measurable: true
  - id: "DRAFT-AC-005"
    description: "GitHub Workflow Guardrails concludes SUCCESS with all seven sequential jobs plus both Node 18/22 Release Candidate jobs passing before Release approval."
    measurable: true
  - id: "DRAFT-AC-006"
    description: "The v2.6.1 annotated tag resolves to its approved release commit, its downloaded asset matches the frozen candidate SHA-256, and v2.6.0 target/digest are unchanged."
    measurable: true
  - id: "DRAFT-AC-007"
    description: "CHANGE-004 records REL-F01 as resolved by the v2.6.1 evidence and is reassessed for archive readiness without editing its frozen s08 artifact."
    measurable: true
notes_for_next_step: "Proceed within the compact Light s01 host only after Work Item and CHANGE-006 approval; do not implement or lock the test rewrite from this draft."
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
    - id: "OBJ-001"
      statement: "Restore a trustworthy release signal for the workflow bundle."
      measure: "Workflow Guardrails concludes SUCCESS with all nine required job instances passing before v2.6.1 Release approval."
      source: "user-selected recommendation and REL-F01"
      confidence: stated
    - id: "OBJ-002"
      statement: "Preserve the approved approval-path behavior while removing contradictory smoke evidence."
      measure: "TD-01 observable behavior and controls remain green with zero production-semantic changes."
      source: "approval-path-defects REQ-001/AC-001"
      confidence: stated
    - id: "OBJ-003"
      statement: "Keep published release history auditable and immutable."
      measure: "v2.6.0 target and artifact digest remain unchanged; v2.6.1 has its own approved commit, tag, artifact, and evidence."
      source: "ci-cd release policy and existing v2.6.0 record"
      confidence: stated
drivers:
  applicable: true
  reason: ""
  items:
    - id: "SA-DRV-001"
      kind: business_goal
      statement: "A patch release may be promoted only when the required release guardrail represents the actual approved behavior and completes successfully."
      origin:
        stakeholder: "user/po"
        concern: "v2.6.0 visibly reports a failed required run"
        constraint_ref: "REL-F01 and GitHub run 32704618485"
      traces_to: ["OBJ-001", "OBJ-002"]
      threshold:
        status: quantified
        value: "9/9 required Workflow Guardrails job instances PASS; 0 failed; 0 skipped"
        reason: ""
      verification: "Inspect the remote run after the approved patch commit and before Release approval."
      architectural_significance: "The CI chain is the release-control seam between reviewed source and public artifact."
      priority: high
    - id: "SA-DRV-002"
      kind: constraint
      statement: "Approved TD-01 behavior remains authoritative; the patch changes stale verification expectations rather than approval semantics."
      origin:
        stakeholder: "workflow governance owner"
        concern: "a quick green fix must not reverse a previously approved defect correction"
        constraint_ref: "approval-path-defects REQ-001/AC-001 and DONE evidence"
      traces_to: ["OBJ-001", "OBJ-002"]
      threshold:
        status: binary
        value: "TD-01 preserved with no weakened authority control"
        reason: "Behavioral authority is categorical."
      verification: "Review spec compliance first, then run dedicated TD-01 and end-to-end smoke assertions."
      architectural_significance: "Contradictory authorities make governance automation untrustworthy."
      priority: high
    - id: "SA-DRV-003"
      kind: data_ownership
      statement: "v2.6.0 owns its immutable historical release evidence; CHANGE-006 owns the remediation and v2.6.1 evidence; CHANGE-004 only receives a linked finding disposition after success."
      origin:
        stakeholder: "release maintainer"
        concern: "do not rewrite closed artifacts or blur which release fixed the defect"
        constraint_ref: "branch/tag finalization policy and CHANGE-004 REL-F01"
      traces_to: ["OBJ-003"]
      threshold:
        status: quantified
        value: "0 moved tags; 0 overwritten v2.6.0 assets; exactly 1 remediation work item and 1 patch release record"
        reason: ""
      verification: "Compare remote tag objects, asset digests, CHANGE-004 links, and CHANGE-006 release evidence."
      architectural_significance: "Single-source release evidence is required for rollback and audit decisions."
      priority: high
landscape:
  applicable: false
  reason: "One bundle repository and one owning workflow-tooling boundary are affected; no system or integration seam moves."
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
    - { id: M-01, applicable: true, reason: "", name: "Objective traceability", formula: "drivers tracing to at least one objective / total drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "SA-DRV-001 through SA-DRV-003 traces_to" }
    - { id: M-02, applicable: true, reason: "", name: "Objective support", formula: "objectives supported by at least one driver / total objectives", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "OBJ-001 through OBJ-003" }
    - { id: M-03, applicable: true, reason: "", name: "Driver provenance", formula: "anchored drivers / total drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "origin fields on all SA drivers" }
    - { id: M-04, applicable: true, reason: "", name: "NFR quantification", formula: "quantified drivers / drivers where numbers are meaningful", value: "2/2 = 100%; one binary driver excluded", threshold: "100%", calibration: uncalibrated, evidence: "SA-DRV-001 and SA-DRV-003 quantified; SA-DRV-002 binary" }
    - { id: M-05, applicable: true, reason: "", name: "Verification coverage", formula: "drivers with a stated verification / total drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "verification fields on all SA drivers" }
    - { id: M-06, applicable: true, reason: "", name: "Handoff coverage", formula: "drivers mapped to at least one downstream block / total drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "handoff.to_ba, to_dev, and to_qc" }
    - { id: M-07, applicable: true, reason: "", name: "Open-item ownership", formula: "owned s03 items / total s03 items", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "stop_condition.pushed_to_s03" }
    - { id: M-08, applicable: false, reason: "Technical options are not selected at s01.", name: "Option discipline", formula: "direction choices with a rejected alternative / total direction choices", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "OQ-001 is deferred to s05/s06" }
    - { id: M-09, applicable: false, reason: "No landscape is required.", name: "Landscape element ownership", formula: "owned landscape elements / total elements", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "landscape.applicable = false" }
    - { id: M-10, applicable: true, reason: "", name: "Capability ownership clarity", formula: "capabilities with exactly one evidence owner / capabilities in scope", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "v2.6.0 history, CHANGE-006 remediation, and CHANGE-004 disposition ownership are explicit" }
handoff:
  to_ba:
    applicable: true
    reason: ""
    items:
      - "Turn the immutable-release, TD-01 preservation, and 9/9 remote-CI thresholds into s04 criteria."
      - "Keep npm outside the patch boundary unless OQ-003 is explicitly changed."
  to_dev:
    applicable: true
    reason: ""
    items:
      - "At s05 choose the smallest assertion change that proves approved bootstrap behavior without editing production semantics."
      - "Keep v2.6.0 history, CHANGE-006 remediation, and CHANGE-004 disposition as separate owned evidence."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Verify remote CI completeness, TD-01 preservation, tag immutability, and release evidence linkage."
  to_devops:
    applicable: false
    reason: "owned by /ta"
    items: []
stop_condition:
  met: false
  reason: "SA driver extraction is complete; OQ-001 through OQ-003 and human approvals remain open."
  pushed_to_s03:
    - question: "Which minimal smoke-case shape should be selected?"
      owner: "developer"
    - question: "Who will provide each required human review?"
      owner: "po/coordinator"
    - question: "Is npm excluded from v2.6.1?"
      owner: "devops/po"
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
    - id: "TA-DRV-001"
      kind: quality_attribute
      statement: "REL-F01 must remain deterministically reproducible before the fix and absent after it for the right observable behavior."
      origin:
        stakeholder: "developer/qc"
        concern: "avoid treating a transient GitHub condition as the defect"
        constraint_ref: "clean-export reproduction and run 32704618485"
      traces_to: ["OBJ-001", "OBJ-002"]
      threshold:
        status: quantified
        value: "1/1 clean v2.6.0 export reproduces the expected mismatch; 0 occurrences after the approved patch"
        reason: ""
      verification: "Run the authoring smoke against immutable v2.6.0 evidence and then against the patch worktree."
      architectural_significance: "The same harness gates local authoring behavior and downstream release-candidate execution."
      priority: high
    - id: "TA-DRV-002"
      kind: quality_attribute
      statement: "The smoke change must verify successful report bootstrap and approval provenance without altering production approval code."
      origin:
        stakeholder: "workflow governance owner"
        concern: "green CI must still detect a broken or silently approved bootstrap path"
        constraint_ref: "approval-path-defects TD-01 and human-controlled gate rules"
      traces_to: ["OBJ-002"]
      threshold:
        status: quantified
        value: "13/13 authoring smoke cases PASS; dedicated TD-01 fixture PASS; 0 production approval files changed"
        reason: ""
      verification: "Inspect the scoped diff and assert report request_source, approval_status, reviewed_by, and audit provenance in controlled fixtures."
      architectural_significance: "Test semantics are the executable contract at the CLI-to-protocol boundary."
      priority: high
    - id: "TA-DRV-003"
      kind: integration
      statement: "The GitHub guardrail chain must execute through the authoring smoke into both supported release-candidate runtimes."
      origin:
        stakeholder: "devops/qc"
        concern: "v2.6.0 published before the Node matrix could run"
        constraint_ref: ".github/workflows/workflow-guardrails.yml needs chain"
      traces_to: ["OBJ-001", "OBJ-003"]
      threshold:
        status: quantified
        value: "7/7 sequential jobs PASS and Node 18 + Node 22 release-candidate jobs PASS; 0 skipped required jobs"
        reason: ""
      verification: "Query the GitHub Actions run for the approved patch commit and retain all job conclusions/URLs."
      architectural_significance: "The dependency chain controls whether exact packaging verification is reachable."
      priority: high
    - id: "TA-DRV-004"
      kind: quality_attribute
      statement: "The patch candidate and rollback evidence must be immutable and independently verifiable before publication."
      origin:
        stakeholder: "release operator"
        concern: "avoid a tag or uploaded asset that differs from the candidate approved by QC and DevOps"
        constraint_ref: "ci-cd release artifact flow and v2.6.0 release lessons"
      traces_to: ["OBJ-003"]
      threshold:
        status: quantified
        value: "candidate SHA-256 matches locally and after remote download; rollback smoke 4/4; tag resolves to exactly one approved commit"
        reason: ""
      verification: "Freeze the candidate digest, run exact candidate/rollback smoke, dereference the annotated tag, and compare the downloaded asset byte-for-byte."
      architectural_significance: "Artifact identity and rollback viability are the technical release contract."
      priority: high
landscape:
  applicable: false
  reason: "The patch affects one repository-local test/release path and moves no system or integration boundary."
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
    - { id: M-01, applicable: true, reason: "", name: "Objective traceability", formula: "drivers tracing to at least one objective / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "TA-DRV-001 through TA-DRV-004 traces_to" }
    - { id: M-02, applicable: false, reason: "Objectives are owned and measured by SA.", name: "Objective support", formula: "supported objectives / total objectives", value: "not applicable in TA-owned output", threshold: "100%", calibration: uncalibrated, evidence: "objectives.reason = owned by /sa" }
    - { id: M-03, applicable: true, reason: "", name: "Driver provenance", formula: "anchored drivers / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "origin fields on all TA drivers" }
    - { id: M-04, applicable: true, reason: "", name: "NFR quantification", formula: "quantified drivers / drivers where numbers are meaningful", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "thresholds on TA-DRV-001 through TA-DRV-004" }
    - { id: M-05, applicable: true, reason: "", name: "Verification coverage", formula: "drivers with a stated verification / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "verification fields on all TA drivers" }
    - { id: M-06, applicable: true, reason: "", name: "Handoff coverage", formula: "drivers mapped to at least one downstream block / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "handoff.to_dev, to_qc, and to_devops" }
    - { id: M-07, applicable: true, reason: "", name: "Open-item ownership", formula: "owned s03 items / total s03 items", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "stop_condition.pushed_to_s03" }
    - { id: M-08, applicable: false, reason: "No technical option is selected at s01.", name: "Option discipline", formula: "direction choices with a rejected alternative / total direction choices", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "OQ-001 deferred to s05/s06" }
    - { id: M-09, applicable: false, reason: "No landscape is required.", name: "Landscape element ownership", formula: "owned landscape elements / total elements", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "landscape.applicable = false" }
    - { id: M-10, applicable: false, reason: "Capability ownership clarity is measured by the SA system lens.", name: "Capability ownership clarity", formula: "capabilities with exactly one owner / total capabilities", value: "not applicable in TA-owned output", threshold: "100%", calibration: uncalibrated, evidence: "SA metric M-10" }
handoff:
  to_ba:
    applicable: false
    reason: "owned by /sa"
    items: []
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Preserve the RED reproduction, production approval semantics, and exact owned-path boundary."
      - "At s05 compare rewrite-versus-replace smoke options and select the smallest behavior-proving delta."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Verify 13/13 authoring smoke, TD-01 regression, scoped diff, full regression suite, and remote 9/9 job completion."
  to_devops:
    applicable: true
    reason: ""
    items:
      - "Block v2.6.1 publication until both Node release-candidate jobs pass and the exact artifact digest is frozen."
      - "Preserve v2.6.0 tag and artifact identity while recording the v2.6.1 remediation link."
stop_condition:
  met: false
  reason: "TA driver extraction is complete; option selection, release boundary, and human approvals remain open."
  pushed_to_s03:
    - question: "Rewrite the obsolete case or replace it with a narrower controlled scenario?"
      owner: "developer"
    - question: "Which exact remote job set is mandatory for Release approval?"
      owner: "devops/qc"
    - question: "Is npm explicitly excluded?"
      owner: "devops/po"
```

## Audit
```yaml
step: "s01 Clarify"
status: PASS
checks:
  - criterion: "The new work item is distinct from the DONE approval-path-defects item and dedup_result is no_conflict."
    result: PASS
    evidence: "Work Item Materialization records fix-authoring-smoke-bootstrap as a single BUG with dedup_result=no_conflict and CHANGE-006 as a new package."
  - criterion: "The failure is reproducible and the authoritative behavior is traced without selecting the implementation approach."
    result: PASS
    evidence: "Requirement Analysis links run 32704618485 and the clean-export mismatch to approval-path-defects REQ-001/AC-001; OQ-001 explicitly defers rewrite-versus-replace selection to s05 content hosted in s06."
  - criterion: "Scope, non-goals, human gates, drivers, thresholds, verification methods, and next human action are explicit."
    result: PASS
    evidence: "The Step Contract, Governance Context, Requirement Analysis Spec, SA/TA Architecture Drivers, and Work Item Protocol contain these fields; SA and TA metric tables report complete trace and verification coverage."
  - criterion: "No implementation path, release mutation, or approval is inferred."
    result: PASS
    evidence: "Protocol remains MATERIALIZED/PENDING_REVIEW at s01; all edited paths are workflow/change artifacts, and v2.6.0 immutability is a hard constraint."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one s01 authoring and validation pass."
gaps:
  - "Named human reviewers and trusted approval receipts remain pending by design."
  - "The GitHub-only versus npm-inclusive v2.6.1 boundary remains open for s04."
risk_level: MEDIUM
next_action: "A human PO reviews and approves CHANGE-006 and the fix-authoring-smoke-bootstrap work item; do not advance or implement until both receipts exist."
```

## SDD Traceability
```yaml
requirement_refs:
  - "product-specs/cards/approval-path-defects.md#REQ-001"
  - "changes/CHANGE-004/tasks.md#REL-F01"
acceptance_refs:
  - "DRAFT-AC-001 through DRAFT-AC-007 in Requirement Analysis Spec"
task_refs: []
test_refs:
  - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js#runCaseMutatingActionRequiresReport"
  - "packages/workflow-bundle/test/approval-path-defects.test.js#TD-01"
  - "GitHub Actions run 32704618485"
```

## Work Item Materialization
```yaml
materialization_status: READY
decision_owner: "agent"
raw_request_summary: "Resolve REL-F01 by aligning the stale mutating-action-requires-report smoke fixture with approved TD-01 bootstrap behavior; rerun guardrail CI and publish patch v2.6.1 without moving v2.6.0."
split_decision: single
dedup_result: no_conflict
work_item_slug: "fix-authoring-smoke-bootstrap"
work_item_type: BUG
delivery_context: brownfield
sdd_preset: "light"
selected_profile: "sdd-light"
sdd_mode: light
sdd_escalation_reasons: []
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
change_strategy: create_new
change_id: "CHANGE-006"
decision_reason:
  - "split_decision=single"
  - "work_item_type=BUG"
  - "delivery_context=brownfield"
  - "dedup_result=no_conflict"
  - "change_strategy=create_new"
  - "planning_track=quick"
  - "governance_profile=default"
  - "sdd_preset=light"
  - "selected_profile=sdd-light"
  - "sdd_mode=light"
  - "sdd_escalation_reasons="
existing_refs: []
blockers: []
```

## Work Item Protocol
```yaml
protocol_status: VERIFIED
approval_status: APPROVED
review_required: true
work_item_slug: "fix-authoring-smoke-bootstrap"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/fix-authoring-smoke-bootstrap"
current_step: "s08"
granted_write_paths:
  - "package.json"
  - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"
  - "workflow-bundle.manifest.json"
  - "packages/workflow-bundle/workflow-bundle.manifest.json"
  - "packages/workflow-bundle/package.json"
  - "packages/workflow-bundle/bin/wfc.js"
  - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
  - "packages/workflow-bundle/test/release-install-all-smoke.test.js"
  - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
  - "packages/workflow-bundle/test/release-surface.test.js"
  - ".claude/CLAUDE.md"
  - "README.md"
  - "README.vi.md"
  - "docs/publish-surface.md"
  - "docs/publish-surface.vi.md"
  - "docs/workflow-docs-map.md"
  - "docs/workflow-docs-map.vi.md"
  - "docs/workflow-bundle-quickstart.md"
  - "docs/workflow-bundle-quickstart.vi.md"
  - "packages/workflow-bundle/README.md"
  - "packages/workflow-bundle/README.vi.md"
  - "docs/releases/workflow-bundle-v2.6.1.md"
  - "packages/workflow-bundle/workflow-bundle-2.6.1.tgz"
  - "work-items/fix-authoring-smoke-bootstrap"
  - "changes/CHANGE-006"
  - "changes/CHANGE-004/tasks.md"
  - "changes/CHANGE-004/archive-metadata.md"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: create_new
change_id: "CHANGE-006"
decision_owner: "agent"
protocol_owner: "developer"
reviewed_by: "po"
reviewed_at: "2026-08-24T09:36:44.436Z"
handoff_target: "main-root-s08-receipt-sealing"
last_transition_action: "gate-review-recorded"
last_transition_at: "2026-08-28T03:46:09Z"
required_actions:
  - "Seal the main-root DoD, Release, and Business Acceptance receipts, validate all three digest matches, then close the protocol before branch/worktree cleanup."
blockers: []
review_notes:
  - "Human review approved."
refs:
  - "work-items/fix-authoring-smoke-bootstrap"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "CHANGE_CREATED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "WORK_ITEM_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "STEP_OPENED"
  - "VERIFICATION_CONFIRMED"
  - "GATE_REVIEW_RECORDED"
  - "RELEASE_EXECUTED"
  - "BUSINESS_ACCEPTANCE_CONFIRMED"
```
