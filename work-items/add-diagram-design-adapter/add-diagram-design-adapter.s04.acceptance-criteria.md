---
artifact_id: "add-diagram-design-adapter.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "add-diagram-design-adapter"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: CHANGE
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
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "developer"
  - "qc"
  - "devops"
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
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-21T07:40:03Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-08-21T07:40:03Z"
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-08-21T07:40:03Z"
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
  - "sa"
  - "ta"
  - "step-goal-contract"
  - "definition-of-ready-gate"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "add-diagram-design-adapter.s01.restate.md"
  - "add-diagram-design-adapter.s02.business-goal.md"
  - "add-diagram-design-adapter.s03.open-questions.md"
linked_artifacts:
  - "changes/CHANGE-005/proposal.md"
  - "changes/CHANGE-005/spec-delta/brd.delta.md"
  - "changes/CHANGE-005/spec-delta/srs.delta.md"
  - "work-items/add-diagram-design-adapter/add-diagram-design-adapter.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> The human approved the business Spec as BA, the behavioral Contract as Developer, and DoR as BA and QC. The source artifact is finalized as `approved`; the three trusted receipts must now be sealed against this exact content hash before s05 opens.

## Step Contract
```yaml
step: "s04 Acceptance + DoR"
goal: "Produce a review-ready, measurable and option-neutral acceptance baseline that defines the business Spec, public behavioral Contract, brownfield compatibility boundary, verification direction, and Definition of Ready recommendation for CHANGE-005."
value: "BA, developer, and QC can approve or reject the exact behavior and evidence boundary before any technical approach or implementation path is selected."
scope_in:
  - "Translate the approved s03 audience, format, metric, contract, semantic, sequencing, and provenance decisions into BRD/SRS deltas."
  - "Define positive, negative, security, accessibility, compatibility, parity, rollback, reader-task, and traceability acceptance criteria."
  - "Record the current brownfield baseline and preserve SA/TA, architecture-modeling, artifact-owner, and CHANGE-004 boundaries."
  - "Assess the strict governance checklist and propose a Definition of Ready verdict for human review."
scope_out:
  - "Selecting the dependency distribution mechanism, adapter implementation location, package layout, stack, renderer implementation, or release version."
  - "Writing production skills, runtime files, tests, manifests, generated diagrams, or release assets."
  - "Changing SA/TA schemas, canonical architecture formats, render ownership, or CHANGE-004-owned paths."
  - "Approving Spec, Contract, DoR, Approach, Task Plan, Release, Business Acceptance, or DoD."
inputs_required:
  - "Approved CHANGE-005 and work-item receipts."
  - "Reviewed s02 outcomes and metrics plus s03 READY input assessment."
  - "Human-approved OQ-001:A, OQ-002:A, OQ-003:A, OQ-004:A, OQ-006:A, and OQ-007:A decisions."
  - "OQ-009-DIGEST-001 and the current SA/TA and architecture-modeling contracts."
  - "Strict and inherited default governance checklists."
outputs_required:
  - "A BRD delta with business requirements, audience scope, formats, measures, non-goals, and decision evidence."
  - "An option-neutral SRS behavioral contract with required inputs, outputs, fail-closed behavior, quality thresholds, reader protocol, and dependency evidence."
  - "Eleven measurable acceptance criteria, edge cases, invariants, and verification directions."
  - "An Existing System Baseline, governance checklist result, Definition of Ready recommendation, traceability map, audit, and human-gate handoff."
done_when:
  - "Every approved s03 decision and every s01 SA/TA driver is represented by a business requirement, technical requirement, acceptance criterion, or explicit deferred item."
  - "Every acceptance criterion has a numeric or binary threshold, verification method, and upstream trace."
  - "The Contract states observable behavior and fail-closed conditions without selecting an implementation placement or distribution option."
  - "The brownfield baseline, compatibility boundary, rollback constraints, and CHANGE-004 sequencing are explicit."
  - "The strict governance checks and DoR recommendation are evidence-based and distinguish assessment from human approval."
  - "No downstream human-controlled gate is passed or implied."
constraints:
  hard_constraints:
    - "SA and TA remain pre-design driver skills and emit no diagram, model, renderer selection, or solution decision."
    - "The canonical architecture model and governed canonical view remain authoritative; the presentation artifact is a separate derivative."
    - "The presentation contract fails closed on incomplete facts, unresolved ownership, invalid destination, semantic drift, provenance mismatch, or forbidden URL/active-content behavior."
    - "Implementation and overlapping runtime activation remain closed until s04-s06 receipts pass and CHANGE-004 sequencing is satisfied."
    - "The external upstream identity remains pinned by repository, commit, capability scope, and digest; distribution remains an s05 decision."
  soft_constraints:
    - "Prefer the smallest first-release behavior covering the two approved audience profiles and HTML/SVG/PNG outputs."
    - "Use verification language that QC can implement without reinventing the business intent."
  prohibited_actions:
    - "Do not choose vendoring, a pinned runtime dependency, or a separately installed plugin."
    - "Do not require pixel-identical output."
    - "Do not record a target as an achieved measurement."
    - "Do not fill gate_reviews or create trusted receipts without explicit human approval."
  compliance_checks:
    - "Map BR, FR/NFR, AC, driver, and verification references bidirectionally."
    - "Check frontmatter gate/signoff parity with s02 and s03."
    - "Apply the strict governance checklist, including reviewer coverage, compatibility, release impact, and rollback."
    - "Validate workflow structure, planning, protocol mirror, YAML/JSON, and UTF-8 encoding."
risks:
  - id: "S04-RISK-001"
    description: "Acceptance wording could accidentally select an implementation or distribution mechanism before s05."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Specify observable behavior and invariants only; mark implementation location and distribution mechanism DEFERRED_TO_S05."
    contingency: "Return the affected requirement to s04 draft and remove design-specific wording before Spec/Contract review."
    owner: "ba/developer"
    status: MONITORING
  - id: "S04-RISK-002"
    description: "The 90% reader target could be mistaken for observed adoption evidence."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Define READER-TASK-001 as a future verification protocol and mark its observed baseline NOT_MEASURED."
    contingency: "Block Business Acceptance until representative results are collected at verify."
    owner: "po/ba/qc"
    status: MONITORING
  - id: "S04-RISK-003"
    description: "The upstream plugin/SKILL version mismatch could be used as an ambiguous dependency identity."
    likelihood: LOW
    impact: HIGH
    severity: MEDIUM
    mitigation: "Make commit plus deterministic content digest the governing identity and treat version labels as informational."
    contingency: "Reject packaging or update evidence that does not reproduce the governing digest."
    owner: "developer/security"
    status: MONITORING
  - id: "S04-RISK-004"
    description: "CHANGE-004 may alter the SA/TA or runtime baseline after this acceptance draft."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Keep s04-s06 authoring additive and require a verified CHANGE-004 status plus baseline re-read before granting overlapping s07 paths."
    contingency: "Return affected s05/s06 content to review and refresh receipts if the verified baseline changes the Contract or AC."
    owner: "developer/devops"
    status: MONITORING
timebox:
  target_duration: "One s04 authoring and validation pass followed by one human gate-review interaction"
  deadline: ""
  escalation_rule: "If any criterion cannot be made testable without choosing the technical approach, return it to s03 or mark the exact s05 dependency; do not guess or open implementation."
```

## Requirement Baseline
```yaml
status: APPROVED
review_state: "APPROVED"
approved_spec_refs:
  - "changes/CHANGE-005/spec-delta/brd.delta.md"
  - "changes/CHANGE-005/spec-delta/srs.delta.md"
approved_spec_digests:
  - ref: "changes/CHANGE-005/spec-delta/brd.delta.md"
    sha256: "7c9f9f1394c771ddc07eee4bbe54dcc04fc0e87fa9ed01c9ef37e23e7926f326"
  - ref: "changes/CHANGE-005/spec-delta/srs.delta.md"
    sha256: "d8cdd88d29e49656769d760975ebf2586012020755fe14888c19bf7b3b305288"
draft_spec_refs: []
requirement_ids:
  business: ["BR-001", "BR-002", "BR-003", "BR-004", "BR-005", "BR-006", "BR-007", "BR-008"]
  functional: ["FR-001", "FR-002", "FR-003", "FR-004", "FR-005", "FR-006", "FR-007", "FR-008", "FR-009", "FR-010", "FR-011"]
  non_functional: ["NFR-001", "NFR-002", "NFR-003", "NFR-004", "NFR-005", "NFR-006"]
decision_notes:
  - "The s03 PO decision receipt approves the first-release audience, formats, thresholds, contract source/owner, semantic rule, and sequencing."
  - "Human explicitly approved the Spec with BA authority on 2026-08-21; the trusted receipt remains to be sealed against this finalized host note."
gate_status: "APPROVED_PENDING_TRUSTED_RECEIPT"
required_reviewer_role: "ba"
```

## Contract Baseline
```yaml
status: APPROVED
api_contract_refs: []
ux_contract_refs: []
behavioral_contract_refs:
  - "changes/CHANGE-005/spec-delta/srs.delta.md#Behavioral Contract"
contract_id: "diagram-design-presentation-adapter-v1"
source_of_truth: "changes/CHANGE-005/spec-delta/srs.delta.md"
review_state: "APPROVED"
gate_status: "APPROVED_PENDING_TRUSTED_RECEIPT"
required_reviewer_role: "developer"
notes:
  - "The Contract fixes behavior, required evidence, failure rules, outputs, and quality thresholds."
  - "Implementation placement, dependency distribution, package layout, and release version remain deferred to s05."
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "skills/analysis/sa/SKILL.md"
  - "skills/analysis/ta/SKILL.md"
  - "skills/architecture/architecture-modeling/SKILL.md"
  - "skills/architecture/architecture-modeling/references/model-contract.md"
  - "skills/architecture/architecture-modeling/references/render-routing.md"
  - "skills/architecture/architecture-modeling/references/quality-contract.md"
  - "packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
  - "packages/workflow-bundle/test/architecture-modeling-contract.test.js"
  - "packages/workflow-bundle/test/architecture-modeling-drawio.test.js"
  - "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.work-item-report.json"
current_behavior:
  - "SA and TA extract drivers in s01-s04 and explicitly do not draw, model, or select a technical solution."
  - "architecture-modeling owns one canonical model and derives governed views whose visible facts are listed in source_fact_ids."
  - "architecture-modeling resolves exactly one owner for each canonical diagram-tool artifact and currently treats a presentation skill as a competing renderer, not a derivative lane."
  - "No diagram-design adapter capability is installed or active in the current managed runtime baseline."
  - "CHANGE-004 is MATERIALIZED at s01 with no granted implementation paths and may later affect SA/TA/runtime packaging."
impacted_surfaces:
  - "public workflow skill routing and capability inventory"
  - "architecture-modeling downstream handoff for a separately identified presentation derivative"
  - "managed runtime packaging, parity, install/update/disable/rollback checks"
  - "contract, representative behavior, security, accessibility, provenance, and release verification"
compatibility_constraints:
  - "No change to the current SA/TA output schema, block ownership, or s01-s04 authority."
  - "No mutation or replacement of canonical Draw.io, Mermaid, Structurizr, model, or governed view artifacts."
  - "Exactly one owner remains mandatory per artifact ID; the presentation derivative uses a different ID from every canonical artifact."
  - "Existing architecture-modeling format routing and canonical renderer behavior remain valid when the adapter is absent or disabled."
  - "All existing architecture role/modeling contract tests and runtime parity checks must continue to pass."
rollback_constraints:
  - "The adapter and its runtime exposure form one removable rollback unit."
  - "Rollback restores the pre-CHANGE-005 source/runtime inventory with zero canonical artifact or SA/TA behavior change."
  - "A failed presentation request falls back to canonical artifacts; it never weakens or bypasses the canonical path."
  - "Overlapping runtime paths are not granted until CHANGE-004 is verified and the resulting baseline is re-read."
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: "AC-001"
    criterion: "For the four representative role/audience combinations (SA and TA crossed with AUD-BUSINESS and AUD-ENGINEERING), 100% produce a complete downstream presentation request and produce zero diagram artifacts, canonical-model mutations, renderer selections, or solution decisions in s01-s04."
    threshold: "4/4 conforming combinations; 0 prohibited outputs or decisions"
    verification: "Run and inspect four representative role/audience fixtures plus file-change evidence."
    traces_to: ["BR-001", "BR-002", "FR-002", "SA-DRV-001", "OUT-001"]
  - id: "AC-002"
    criterion: "Every accepted request contains the required behavioral-contract inputs and every successful result records a distinct presentation artifact ID, exactly one owner, canonical source, audience, declared question, complete source_fact_ids, output references, and validation evidence references."
    threshold: "100% required fields present; 1 owner per presentation artifact ID; 0 canonical/presentation ID collisions"
    verification: "Schema/contract tests over representative accepted requests and returned metadata."
    traces_to: ["BR-004", "FR-001", "FR-004", "SA-DRV-003", "TA-DRV-001", "OUT-002"]
  - id: "AC-003"
    criterion: "The adapter returns REJECTED and emits no presentation artifact for each fail-closed condition: missing model/view, empty or unknown source_fact_ids, unresolved/duplicate ownership, invalid/colliding destination, unsupported format, invented or contradictory content, provenance mismatch, forbidden URL/active-content request, or blocked CHANGE-004 overlap."
    threshold: "100% negative fixtures rejected; 0 emitted artifacts on rejection"
    verification: "One explicit negative fixture per Behavioral Contract fail_closed_conditions row."
    traces_to: ["FR-003", "FR-007", "FR-008", "FR-011", "TA-DRV-001", "TA-DRV-004", "TA-DRV-006"]
  - id: "AC-004"
    criterion: "Canonical models and governed Draw.io, Mermaid, or Structurizr artifacts remain byte-for-byte unchanged and authoritative; every HTML/SVG/PNG presentation output is visibly labeled non-canonical and links to its canonical source."
    threshold: "0 canonical artifact diffs; 100% derivative labels and canonical links present"
    verification: "Pre/post canonical diff plus derivative metadata/content inspection."
    traces_to: ["BR-004", "FR-004", "SA-DRV-002", "SA-DRV-003", "OUT-002"]
  - id: "AC-005"
    criterion: "Every visible architecture fact and relationship in each representative derivative maps to a declared canonical source_fact_id and normalized semantic comparison reports zero added, removed, reversed, merged, or contradictory meaning; layout variation is allowed and pixel equality is not tested."
    threshold: "100% fact/relationship coverage; semantic diff count 0; pixel-equality checks 0"
    verification: "Normalize derivative content against canonical elements/relationships and compare IDs, directions, labels with architecture meaning, and status annotations."
    traces_to: ["BR-005", "BR-006", "FR-005", "NFR-001", "NFR-005", "SA-DRV-002", "TA-DRV-002"]
  - id: "AC-006"
    criterion: "Each representative output set contains one self-contained static HTML primary artifact plus SVG and PNG exports; HTML/SVG have accessible names and descriptions, PNG has an accessible HTML/SVG counterpart, and the set passes packaged static, accessibility, and security checks with no required remote asset, arbitrary URL fetch, unapproved script, or blocking finding."
    threshold: "100% three-format sets present; 100% applicable checks pass; 0 blocking findings; 0 forbidden network/active-content actions"
    verification: "Output inventory, offline-open smoke, accessibility assertions, static/security scan, and tool/network-call inspection."
    traces_to: ["BR-003", "BR-006", "BR-007", "FR-006", "FR-007", "NFR-004", "TA-DRV-003", "TA-DRV-006"]
  - id: "AC-007"
    criterion: "READER-TASK-001 records two independent representative reviewers, 10 binary tasks per approved audience profile, correct canonical/derivative/owner identification by both reviewers, at least 18 of 20 correct declared-question tasks, and zero semantic contradictions."
    threshold: "2/2 source-of-truth checks; >=18/20 reader tasks; 0 contradictions"
    verification: "Execute READER-TASK-001 during verification and retain the anonymized score/evidence record; do not claim the target as achieved before execution."
    traces_to: ["BR-002", "BR-005", "NFR-002", "NFR-003", "METRIC-003", "METRIC-004", "OUT-003"]
  - id: "AC-008"
    criterion: "Dependency evidence reproduces the pinned repository, commit, 155-file capability scope, MIT license, Read/Write capabilities, key-file digests, and aggregate manifest digest; any changed identity is rejected until a new review and receipt exist."
    threshold: "100% identity fields match OQ-009-DIGEST-001; aggregate digest exact match; 0 default-branch or auto-update acceptance"
    verification: "Recompute sha256-manifest-v1 at the pinned commit and compare repository, trees, counts, license, capabilities, and digest."
    traces_to: ["BR-007", "FR-008", "FR-009", "TA-DRV-004", "OUT-004", "OQ-009-DIGEST-001"]
  - id: "AC-009"
    criterion: "The s05-selected distribution option demonstrates supported isolated install, update, disable, and rollback scenarios with zero canonical/runtime diff and restores the previous runtime inventory without changing SA/TA or canonical architecture behavior."
    threshold: "100% supported lifecycle scenarios pass; 0 parity diffs; 0 canonical or SA/TA behavior diffs"
    verification: "Package dry-run, isolated lifecycle smoke tests, recursive parity diff, rollback smoke, and baseline contract regression tests."
    traces_to: ["BR-007", "FR-010", "NFR-006", "TA-DRV-005", "METRIC-005", "OUT-004"]
  - id: "AC-010"
    criterion: "Before any overlapping s07 path is granted, CHANGE-004 is VERIFIED, its post-change baseline is re-read, the affected CHANGE-005 Contract/AC/Approach/Plan are reassessed, and implementation changes no CHANGE-004-owned SA/TA path."
    threshold: "Verified CHANGE-004 evidence present; baseline re-read recorded; 0 overlapping unauthorized path changes"
    verification: "Protocol status check, changed-path ownership comparison, and explicit baseline-impact note before activation."
    traces_to: ["BR-008", "FR-011", "SA-DRV-004", "OQ-007:A", "OUT-004"]
  - id: "AC-011"
    criterion: "Contract, positive/negative behavior, traceability, provenance, security, accessibility, runtime parity, packaging, rollback, workflow, change, pack-audit, recursive diff, and UTF-8 checks either pass with evidence or retain an explicit blocker; no Release or Business Acceptance claim is made from local checks alone."
    threshold: "100% applicable check lanes have PASS evidence or a named blocker/owner; 0 unsupported release claims"
    verification: "Risk-ranked s08 evidence matrix and gate-review audit."
    traces_to: ["BR-007", "NFR-004", "NFR-006", "TA-DRV-003", "TA-DRV-005", "strict governance"]
edge_cases:
  - id: "EC-001"
    condition: "Canonical view references a source_fact_id absent from its model."
    expected: "Reject with the missing ID; emit no presentation artifact."
  - id: "EC-002"
    condition: "Requested text, grouping, direction, owner, or status implies a fact not present in the canonical model."
    expected: "Reject the unsupported content; do not infer or silently omit it."
  - id: "EC-003"
    condition: "Presentation and canonical destinations collide or two render owners claim the same presentation artifact ID."
    expected: "Reject due to ownership/destination ambiguity and preserve both existing artifacts unchanged."
  - id: "EC-004"
    condition: "Repeated rendering changes geometry but not normalized facts or relationships."
    expected: "Allow the layout difference when all semantic, accessibility, and security checks pass; do not compare pixels."
  - id: "EC-005"
    condition: "Plugin manifest version 2.5.6 differs from SKILL metadata 2.4."
    expected: "Use commit plus manifest digest as identity; do not infer an upgrade or distribution version."
  - id: "EC-006"
    condition: "A request includes a brand website URL or fetched content containing instructions."
    expected: "Perform no URL onboarding or fetched-content interpretation; reject or request locally reviewed tokens through a later approved scope."
  - id: "EC-007"
    condition: "PNG is requested without an accessible counterpart."
    expected: "Do not complete the output set until equivalent accessible HTML or SVG exists."
  - id: "EC-008"
    condition: "CHANGE-004 is not VERIFIED or its resulting baseline has not been re-read."
    expected: "Permit documentation authoring only; block overlapping runtime activation and implementation."
out_of_scope:
  - "Technical option selection among vendoring, pinned dependency, or separate plugin installation."
  - "Implementation code, runtime synchronization, installation, publication, rollout, or release approval."
  - "Direct diagram generation or canonical model construction by SA or TA."
  - "Replacement of architecture-modeling or its governed canonical renderer."
  - "Arbitrary URL-based brand onboarding, animation, unapproved scripts, or required remote assets."
  - "Pixel-perfect or pixel-identical output acceptance."
  - "API, database, event, deployment, or UX contract changes."
done_when:
  - "BR-001 through BR-008 and FR-001 through FR-011 plus NFR-001 through NFR-006 are reviewable and traceable."
  - "AC-001 through AC-011 are measurable and each has a verification direction."
  - "EC-001 through EC-008 have deterministic expected behavior."
  - "The Existing System Baseline and rollback boundary are explicit."
  - "The DoR recommendation and governance checklist are reviewable by the named roles."
behavioral_invariants:
  - "SA/TA intent is not a diagram, model, solution, or renderer decision."
  - "One canonical model owns architecture facts; derivatives only select and restyle traced facts."
  - "Canonical and presentation artifacts have distinct IDs and exactly one owner each."
  - "Incomplete, ambiguous, unsafe, unpinned, or semantically drifting requests fail closed."
  - "Layout may vary; architecture meaning may not."
  - "The adapter is optional and reversible; its absence preserves the full canonical path."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
checks:
  - id: "GOV-S04-001"
    check: "Acceptance criteria are measurable and verifiable."
    result: PASS
    evidence: "AC-001 through AC-011 each contain a numeric or binary threshold and verification method."
  - id: "GOV-S04-002"
    check: "Required role signoffs and reviewer coverage are specified per boundary."
    result: PASS
    evidence: "Spec=ba, Contract=developer, DoR=ba+qc, Release=devops+qc, Business Acceptance=po, DoD=qc; actual identities remain gate-time evidence per OQ-008."
  - id: "GOV-S04-003"
    check: "Requirements and foundational rules are reflected in the Spec and Contract."
    result: PASS
    evidence: "BR-001 through BR-008 and FR/NFR requirements preserve SA/TA, canonical-source, owner, security, provenance, and sequencing rules."
  - id: "GOV-S04-004"
    check: "Brownfield compatibility and migration assumptions are recorded."
    result: PASS
    evidence: "Existing System Baseline records current behavior, impacted surfaces, compatibility constraints, and no schema/data migration."
  - id: "GOV-S04-005"
    check: "Release impact and rollback expectations are identified before implementation."
    result: PASS
    evidence: "AC-009/AC-011 and rollback_constraints require isolated lifecycle, parity, recovery, and later Release evidence."
  - id: "GOV-S04-006"
    check: "External dependency provenance and update boundary are reproducible."
    result: PASS
    evidence: "OQ-009-DIGEST-001 is carried into FR-008/FR-009 and AC-008; changed identity requires renewed review."
  - id: "GOV-S04-007"
    check: "No technical approach or distribution mechanism is selected early."
    result: PASS
    evidence: "Behavioral Contract and AC-009 are option-neutral; implementation_location and distribution_mechanism are DEFERRED_TO_S05."
  - id: "GOV-S04-008"
    check: "CHANGE-004 ownership and activation sequencing are protected."
    result: PASS
    evidence: "BR-008, FR-011, AC-010, EC-008, and rollback constraints block overlapping implementation until verified baseline re-read."
blocking_items: []
owner: "ba/developer/qc"
next_action: "Human reviewers exercise the separate Spec, Contract, and DoR gates; governance alignment does not substitute for those receipts."
exceptions: []
waivers: []
```

## Definition of Ready
```yaml
work_item_slug: "add-diagram-design-adapter"
status: READY
gate_status: "APPROVED_PENDING_TRUSTED_RECEIPT"
checks:
  restated_request_clear: PASS
  business_goal_clear: PASS
  scope_defined: PASS
  open_questions_non_blocking: PASS
  acceptance_criteria_testable: PASS
  dependencies_known: PASS
  verification_direction_present: PASS
blocking_gaps: []
accepted_assumptions:
  - "The canonical architecture model and governed view remain authoritative."
  - "Commit plus content digest governs upstream identity despite informational version-label mismatch."
  - "The distribution mechanism is intentionally deferred to s05 because every s04 invariant is option-neutral."
  - "CHANGE-005 s04-s06 authoring is independent, while overlapping s07 execution waits for verified CHANGE-004 and a baseline re-read."
residual_risks:
  - "The s05 distribution choice may change packaging and lifecycle verification detail but may not weaken AC-008/AC-009."
  - "READER-TASK-001 targets are not observed results and must be executed before Business Acceptance."
  - "A verified CHANGE-004 baseline change may require s04-s06 re-review before activation."
next_action: "Seal the separate Spec, Contract, and DoR trusted receipts against this finalized artifact; only then open s05."
```

## Audit
```yaml
step: "s04 Acceptance + DoR authoring"
status: PASS
checks:
  - criterion: "Every approved s03 decision and every s01 SA/TA driver is represented or explicitly deferred."
    result: PASS
    evidence: "BR/FR/NFR and AC traceability covers the approved OQ bundle and all SA-DRV/TA-DRV IDs; only OQ-005 implementation distribution is explicitly deferred."
  - criterion: "Every acceptance criterion has a threshold, verification method, and upstream trace."
    result: PASS
    evidence: "AC-001 through AC-011 each contain threshold, verification, and traces_to."
  - criterion: "The Contract is fail-closed and option-neutral."
    result: PASS
    evidence: "The SRS Behavioral Contract defines required fields, result states, nine fail-closed groups, semantic/security/accessibility rules, and DEFERRED_TO_S05 implementation/distribution fields."
  - criterion: "Brownfield compatibility, rollback, and CHANGE-004 sequencing are explicit."
    result: PASS
    evidence: "Existing System Baseline, AC-009/AC-010, EC-008, and rollback constraints preserve the existing canonical path and sequencing A."
  - criterion: "Governance and DoR distinguish human content approval from signed trusted-receipt enforcement."
    result: PASS
    evidence: "Governance is ALIGNED; the user explicitly approved Spec as BA, Contract as Developer, and DoR as BA+QC; frontmatter captures reviewer roles and time while the three external receipts remain unsealed."
  - criterion: "No downstream gate, approach, or implementation permission is implied."
    result: PASS
    evidence: "The artifact is finalized as approved, granted_write_paths remain empty, and handoff still requires three independent trusted receipts before s05."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one s04 authoring and validation pass before human gate review."
gaps: []
risk_level: MEDIUM
next_action: "Human runs the three interactive gate-approval commands to seal Spec, Contract, and DoR receipts; do not open s05 from metadata alone."
```

## Traceability
```yaml
upstream:
  - "add-diagram-design-adapter.s01.restate.md#Requirement Analysis Spec"
  - "add-diagram-design-adapter.s01.restate.md#SA Architecture Drivers"
  - "add-diagram-design-adapter.s01.restate.md#TA Architecture Drivers"
  - "add-diagram-design-adapter.s02.business-goal.md#Main Artifact"
  - "add-diagram-design-adapter.s03.open-questions.md#Main Artifact"
  - "add-diagram-design-adapter.s03.open-questions.md#Input Readiness"
spec_chain:
  - requirement_refs: ["BR-001", "BR-002", "FR-001", "FR-002"]
    acceptance_refs: ["AC-001", "AC-002"]
    driver_refs: ["SA-DRV-001", "TA-DRV-001"]
    outcome_refs: ["OUT-001"]
  - requirement_refs: ["BR-004", "BR-006", "FR-004", "FR-005", "NFR-001", "NFR-005"]
    acceptance_refs: ["AC-004", "AC-005"]
    driver_refs: ["SA-DRV-002", "SA-DRV-003", "TA-DRV-002"]
    outcome_refs: ["OUT-002"]
  - requirement_refs: ["BR-003", "FR-006", "NFR-004"]
    acceptance_refs: ["AC-006"]
    driver_refs: ["TA-DRV-003", "TA-DRV-006"]
    outcome_refs: ["OUT-003", "OUT-004"]
  - requirement_refs: ["BR-005", "NFR-002", "NFR-003"]
    acceptance_refs: ["AC-007"]
    driver_refs: ["SA-DRV-001", "SA-DRV-002", "TA-DRV-002"]
    outcome_refs: ["OUT-003"]
  - requirement_refs: ["BR-007", "FR-008", "FR-009", "FR-010", "NFR-006"]
    acceptance_refs: ["AC-008", "AC-009", "AC-011"]
    driver_refs: ["TA-DRV-004", "TA-DRV-005"]
    outcome_refs: ["OUT-004"]
  - requirement_refs: ["BR-008", "FR-011"]
    acceptance_refs: ["AC-003", "AC-010"]
    driver_refs: ["SA-DRV-004"]
    outcome_refs: ["OUT-001", "OUT-004"]
deferred_to_s05:
  - id: "OQ-005"
    decision: "Dependency distribution mechanism"
    guardrails: ["AC-008", "AC-009", "AC-011"]
gate_evidence:
  spec: "APPROVED_PENDING_TRUSTED_RECEIPT"
  contract: "APPROVED_PENDING_TRUSTED_RECEIPT"
  dor: "APPROVED_PENDING_TRUSTED_RECEIPT"
next_step: "s05 Technical Approach only after separate trusted Spec, Contract, and DoR receipts are present and the human explicitly continues"
```

## Handoff
- Mandatory criteria: `AC-001` through `AC-011`, with `AC-003` fail-closed behavior, `AC-005` semantic invariants, `AC-008` provenance, and `AC-010` sequencing treated as release blockers.
- Edge cases to preserve: `EC-001` through `EC-008`; layout variation is allowed, semantic variation is not.
- Spec review: approved explicitly with role BA on 2026-08-21; seal its trusted receipt against this finalized note.
- Contract review: `diagram-design-presentation-adapter-v1` approved explicitly with role Developer on 2026-08-21; seal its trusted receipt.
- DoR review: approved explicitly with roles BA and QC on 2026-08-21; seal its trusted receipt using QC as the receipt signer while preserving both reviewed roles in this artifact.
- Condition to move to s05: all three signed receipts are present and match this artifact digest; metadata approval alone does not open s05.
