---
artifact_id: "fix-authoring-smoke-bootstrap.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "fix-authoring-smoke-bootstrap"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: "CHANGE-006"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-006/proposal.md"
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/fix-authoring-smoke-bootstrap.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
execution_roles:
  - "ba"
  - "qc"
  - "developer"
  - "devops"
  - "po"
review_mode: self
verification_owner: "qc"
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
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-24T10:42:16.000Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-08-24T10:42:16.000Z"
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
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "definition-of-ready-gate"
  - "step-goal-auditor"
  - "sa"
  - "ta"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s01.restate.md"
  - "changes/CHANGE-006/proposal.md"
  - "product-specs/cards/approval-path-defects.md"
  - "changes/CHANGE-004/tasks.md"
linked_artifacts:
  - "product-specs/cards/fix-authoring-smoke-bootstrap.md"
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> The Spec Card turns REL-F01 into seven traceable requirements and eight measurable criteria.
> Human BA approved Spec and human BA/QC approved DoR on 2026-08-24. The note is finalized for
> trusted sealing; no technical option or implementation path is selected here.

## Step Contract
```yaml
step: "s04 Acceptance + DoR"
goal: "Produce a reviewable Spec Card and readiness decision that preserve approved TD-01 behavior, define complete patch-release evidence, and allow design planning without blind inference."
value: "BA, QC, Developer, and DevOps can evaluate one measurable contract before any test edit or release mutation occurs."
scope_in:
  - "Create the SDD Light Spec Card with CR-006 provenance and complete REQ-to-AC mapping."
  - "Record the v2.6.0, TD-01, failing-CI, local-suite, remote-job, candidate, rollback, and release baselines."
  - "Classify Contract and Foundation gates, evaluate governance alignment, and issue a DoR recommendation."
  - "Define the human reviewers needed for Spec, DoR, Release, Business Acceptance, and DoD."
scope_out:
  - "Choosing rewrite-versus-replace for the smoke case; that is s05 content hosted in s06."
  - "Editing the smoke harness, production approval path, package version, workflow, tag, release, or CHANGE-004 disposition."
  - "Approving or freezing Spec, passing DoR, or opening s07."
  - "Adding npm publication, public contracts, migrations, runtime changes, or unrelated worktree changes."
inputs_required:
  - "Approved CHANGE-006 classification and approved work-item receipt."
  - "s01 requirement analysis plus SA and TA driver thresholds."
  - "Approved approval-path-defects REQ-001/AC-001 and s08 TD-01 verification."
  - "REL-F01 GitHub run 32704618485, clean-export reproduction, and v2.6.0 release identity."
  - "Current authoring-smoke case inventory and Workflow Guardrails dependency graph."
outputs_required:
  - "product-specs/cards/fix-authoring-smoke-bootstrap.md"
  - "Completed Existing System Baseline, acceptance boundary, governance checks, DoR report, Spec Freeze report, and SDD trace in this note."
done_when:
  - "Every in-scope requirement has CR or baseline provenance and at least one measurable AC."
  - "Contract applicability, compatibility invariants, edge cases, verification direction, and release boundary are explicit."
  - "The DoR schema concludes READY or BLOCKED from evidence, with assumptions and residual risks owned."
  - "The Spec Freeze block accurately waits for human receipts and no downstream gate is inferred."
constraints:
  hard_constraints:
    - "Approved TD-01 is the production source of truth; this patch may not reverse or weaken it."
    - "v2.6.0 target and asset digest remain immutable."
    - "All nine required remote job instances must pass before v2.6.1 Release approval."
    - "Spec and DoR remain human-controlled gates with BA and BA/QC authority respectively."
  soft_constraints:
    - "Prefer criteria that test observable behavior rather than implementation structure."
    - "Keep the standard patch-release flow and GitHub-only boundary unless humans approve an expansion."
  prohibited_actions:
    - "Do not select a technical option, write code, alter a tag, or publish a release in s04."
    - "Do not count a skipped Node matrix job as successful release evidence."
    - "Do not weaken an acceptance criterion merely to make the historical run green."
  compliance_checks:
    - "Run semantic SDD, workflow, change, planning, UTF-8, and whitespace validation on the draft."
    - "Check that all Spec/DoR review fields and trusted receipts are empty before human approval."
    - "Check that Contract and Foundation are explicitly not applicable with reasons."
risks:
  - id: "S04-RISK-001"
    description: "A smoke criterion could become too shallow and stop proving TD-01 bootstrap provenance."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "AC-001 names request_source, REPORT_BOOTSTRAPPED, and the explicit approval transition; AC-002 protects authority controls."
    contingency: "BA or QC blocks Spec/DoR and returns the card for revision."
    owner: "ba/qc"
    status: OPEN
  - id: "S04-RISK-002"
    description: "Release could be approved after the sequential chain but before both matrix jobs finish."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "AC-004 requires 9/9 job instances with zero failed or skipped jobs before Release approval."
    contingency: "DevOps and QC keep Release blocked and do not create the tag."
    owner: "devops/qc"
    status: OPEN
  - id: "S04-RISK-003"
    description: "Unrelated dirty-worktree changes could enter the patch candidate."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "The card excludes unrelated changes; s06 must declare exact owned paths and candidate composition."
    contingency: "Isolate the approved patch before implementation or candidate assembly."
    owner: "developer"
    status: OPEN
timebox:
  target_duration: "One s04 authoring and validation pass"
  deadline: ""
  escalation_rule: "Return to s03 if TD-01 authority, release boundary, or a required reviewer becomes disputed."
```

## Input Readiness
```yaml
step: "s04 Acceptance + DoR"
status: READY
available_inputs:
  - "PO-approved work item receipt and amended CHANGE-006 receipt with defect_source=code and spec_impact_classified=true."
  - "Complete s01 business goal, open questions, requirement analysis, and SA/TA driver blocks."
  - "Approved TD-01 Spec Card and verified s08 behavior evidence."
  - "GitHub run 32704618485, clean-export reproduction, and immutable v2.6.0 target/digest."
  - "Current 13-case authoring-smoke inventory, seven-job sequential chain, and Node 18/22 matrix."
missing_inputs: []
invalid_inputs: []
conflicts: []
assumptions:
  - "The stale smoke assertion is subordinate to the approved TD-01 Spec Card; this resolves the observed contradiction without changing production behavior."
  - "The release remains GitHub-only; npm requires a separate approved expansion."
risk_level: MEDIUM
next_action: "Author and validate the Spec Card and s04 gate evidence, then request BA Spec review and BA/QC DoR review."
```

## Requirement Baseline
```yaml
status: PROPOSED_FOR_REVIEW
spec_ref: "product-specs/cards/fix-authoring-smoke-bootstrap.md"
authoritative_baseline_refs:
  - "product-specs/cards/approval-path-defects.md#REQ-001"
  - "work-items/approval-path-defects/approval-path-defects.s08.verification.md#Technical Verification"
change_ref: "CR-006 (legacy package path changes/CHANGE-006)"
notes:
  - "REQ-001 preserves approved TD-01 as BASELINE. REQ-002 through REQ-007 are the approved remediation delta from CR-006."
  - "The Spec Card owns requirements and acceptance; this note references them instead of creating a competing copy."
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
event_contract_refs: []
data_contract_refs: []
ux_contract_refs: []
reason: "The patch changes verification and release evidence only. Approved CLI approval semantics remain unchanged, and no public API, event, data, schema, or UX contract moves."
```

## Existing System Baseline
```yaml
baseline_date: "2026-08-24"
current_behavior_refs:
  - "product-specs/cards/approval-path-defects.md#REQ-001"
  - "work-items/approval-path-defects/approval-path-defects.s08.verification.md#Technical Verification"
  - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js#runCaseMutatingActionRequiresReport"
  - "https://github.com/haonh87/Code-Factory/actions/runs/32704618485"
measured_state:
  authoring_smoke_cases: 13
  stale_case: "mutating-action-requires-report"
  historical_failure: "Expected Missing work item report; observed Missing required argument '--reviewed-by'."
  remote_required_job_instances: 9
  remote_run_result: "7 job instances passed, Workflow Authoring Smoke failed, 2 Release Candidate matrix jobs skipped."
  baseline_unit_files: 39
  v2_6_0_tag_target: "7c88f7d564f4c49daecc6eaec345002163f9e9ec"
  v2_6_0_asset_sha256: "5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9"
impacted_surfaces:
  - "Authoring-smoke verification contract for the stale scenario."
  - "Local release-candidate evidence and remote Workflow Guardrails evidence."
  - "v2.6.1 GitHub release record and CHANGE-004 REL-F01 disposition."
compatibility_constraints:
  - "TD-01 observable behavior and all human-approval controls remain unchanged."
  - "Zero production approval-path files change."
  - "v2.6.0 tag target, asset bytes, release record, and failed-run history remain unchanged."
  - "The patch candidate excludes unrelated shared-worktree changes."
rollback_constraints:
  - "Before publication, discard the candidate if exact candidate or rollback smoke fails."
  - "After publication, do not move v2.6.1; issue another patch if remediation is needed."
  - "Never use v2.6.0 mutation as rollback or remediation."
```

## Artifact Chính
```yaml
acceptance_ref: "product-specs/cards/fix-authoring-smoke-bootstrap.md#Acceptance Criteria"
acceptance_ids:
  - "AC-001 controlled bootstrap report and provenance"
  - "AC-002 no production-semantic or authority-control change"
  - "AC-003 13/13 authoring smoke plus local regression tiers"
  - "AC-004 remote Workflow Guardrails 9/9, no failed or skipped required job"
  - "AC-005 exact v2.6.1 candidate, rollback 4/4, and remote digest match"
  - "AC-006 v2.6.0 target and digest immutability"
  - "AC-007 REL-F01 evidence linkage and archive reassessment"
  - "AC-008 GitHub-only release boundary"
edge_cases:
  - id: "EDGE-001"
    case: "The controlled fixture starts without a protocol report."
    expected: "Approval bootstraps the report, but the report has no approval authority before the explicit approve action."
  - id: "EDGE-002"
    case: "Approval is attempted without reviewed-by or without an interactive human."
    expected: "The existing refusal still fires; aligning the smoke must not bypass either control."
  - id: "EDGE-003"
    case: "Workflow Authoring Smoke passes but a Node matrix job fails or is skipped."
    expected: "Release remains blocked because AC-004 requires all 9 job instances."
  - id: "EDGE-004"
    case: "The uploaded v2.6.1 asset digest differs from the frozen candidate."
    expected: "Release evidence fails; do not relabel or promote the mismatched asset."
  - id: "EDGE-005"
    case: "A rerun is requested on the unchanged v2.6.0 commit."
    expected: "It may reproduce evidence but cannot resolve REL-F01 or replace the separately governed patch."
  - id: "EDGE-006"
    case: "The shared worktree contains unrelated modified or untracked files."
    expected: "Those files are excluded from the implementation diff and release candidate."
out_of_scope_ref: "product-specs/cards/fix-authoring-smoke-bootstrap.md#Business Goal"
done_when:
  - "AC-001 through AC-008 have PASS evidence in s08."
  - "QC passes Technical Verification and DoD; DevOps/QC pass Release; PO passes Business Acceptance."
  - "REL-F01 is dispositioned and CHANGE-004 archive readiness is reassessed."
behavioral_invariants:
  - "Approved TD-01 bootstrap semantics remain unchanged."
  - "Missing reviewed-by and non-interactive approval refusals remain unchanged."
  - "Trusted receipt signature, passphrase, per-gate receipt, and digest binding remain unchanged."
  - "Published tags and assets are immutable."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - id: "GOV-01"
    check: "Acceptance criteria are measurable and verifiable."
    result: PASS
    evidence: "All eight ACs name observable fields, pass counts, job conclusions, digests, or immutable identities."
  - id: "GOV-02"
    check: "Required role sign-offs are identified."
    result: PASS
    evidence: "BA owns Spec; BA/QC own DoR; Developer owns Approach/Task Plan; QC owns DoD; DevOps/QC own Release; PO owns Business Acceptance."
  - id: "GOV-03"
    check: "SDD Light eligibility remains classified."
    result: PASS
    evidence: "Brownfield, quick, default, agentic/self, known code defect, classified test/release-only impact, one system, no public contract/migration/foundation/multi-agent trigger."
  - id: "GOV-04"
    check: "Contract and Foundation gates are not bypassed."
    result: PASS
    evidence: "Both are explicitly not applicable: production semantics and public contracts do not move, and no architectural baseline changes."
  - id: "GOV-05"
    check: "Default governance profile remains proportionate."
    result: PASS
    evidence: "The patch reuses the existing artifact and GitHub release flow; it adds no packaging/runtime topology and has an explicit QC+DevOps Release gate."
  - id: "GOV-06"
    check: "Failing-first evidence is required for the automation behavior change."
    result: REQUIRED
    evidence: "The immutable v2.6.0 reproduction is retained as RED evidence; s07 must show the approved minimal delta turns the same behavior GREEN."
  - id: "GOV-07"
    check: "No human-controlled gate is self-declared."
    result: PASS
    evidence: "The explicit human instruction approved Spec as BA and DoR as BA/QC; the matching reviewer identities and timestamp are recorded before trusted sealing."
blocking_items: []
owner: "ba/qc"
next_action: "Seal the trusted Spec receipt as BA and DoR receipt as QC."
```

## Definition of Ready
```yaml
work_item_slug: "fix-authoring-smoke-bootstrap"
status: READY
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
  - "ASM-001: approved TD-01 is the authoritative production baseline."
  - "ASM-002: the standard GitHub artifact/release path is reused unchanged."
  - "ASM-003: npm is excluded unless humans approve a later scope expansion."
residual_risks:
  - "ODC-001 still requires Developer option analysis in s06, but both options are constrained by the same ACs and do not block readiness."
  - "Release remains blocked until remote 9/9 and exact-artifact evidence exist."
next_action: "Seal the trusted Spec and DoR receipts; then author s05 content and Task Plan in the Light s06 host."
```

## Spec Freeze
```yaml
work_item_slug: "fix-authoring-smoke-bootstrap"
status: APPROVED_WITH_ASSUMPTIONS
checks:
  brd_owner_present: PASS
  srs_owner_present: PASS
  requirement_ids_present: PASS
  acceptance_criteria_mapped: PASS
  blocking_questions_resolved: PASS
  role_reviewers_recorded: PASS
accepted_assumptions:
  - "ASM-001: approved TD-01 is the authoritative production baseline."
  - "ASM-002: the standard GitHub artifact/release path is reused unchanged."
  - "ASM-003: npm is outside this patch boundary."
blocking_gaps: []
next_action: "Seal Spec with BA and DoR with QC; both receipts must bind to this finalized s04 note."
```

## SDD Traceability
```yaml
requirement_refs:
  - "product-specs/cards/fix-authoring-smoke-bootstrap.md#REQ-001 through REQ-007"
acceptance_refs:
  - "product-specs/cards/fix-authoring-smoke-bootstrap.md#AC-001 through AC-008"
task_refs: []
test_refs:
  - "TEST-001 proposed: controlled bootstrap/provenance authoring-smoke case"
  - "TEST-002 proposed: approval-path-defects TD-01 regression"
  - "TEST-003 proposed: full local release-candidate tiers"
  - "TEST-004 proposed: remote Workflow Guardrails 9/9"
  - "TEST-005 proposed: exact candidate, rollback, tag, and asset digest checks"
```

## Traceability
```yaml
business_goal_ref: "product-specs/cards/fix-authoring-smoke-bootstrap.md#Business Goal"
driver_refs:
  - "fix-authoring-smoke-bootstrap.s01.restate.md#SA Architecture Drivers"
  - "fix-authoring-smoke-bootstrap.s01.restate.md#TA Architecture Drivers"
requirement_to_acceptance:
  REQ-001: [AC-001]
  REQ-002: [AC-002]
  REQ-003: [AC-003]
  REQ-004: [AC-004]
  REQ-005: [AC-005, AC-008]
  REQ-006: [AC-006]
  REQ-007: [AC-007]
downstream_gate_refs:
  approach: "s06 pending"
  task_plan: "s06 pending"
  implementation: "s07 not opened"
  verification: "s08 not created"
```

## Audit
```yaml
step: "s04 Acceptance + DoR"
status: PASS
checks:
  - criterion: "Every in-scope requirement has CR or baseline provenance and at least one measurable AC."
    result: PASS
    evidence: "Semantic SDD validation passes; Spec Card REQ-001 through REQ-007 map completely to AC-001 through AC-008."
  - criterion: "Contract applicability, compatibility invariants, edge cases, verification direction, and release boundary are explicit."
    result: PASS
    evidence: "Contract Baseline, Existing System Baseline, Artifact Chính, Governance Checks, and Spec Card out_scope record each boundary."
  - criterion: "The DoR schema concludes READY or BLOCKED from evidence, with assumptions and residual risks owned."
    result: PASS
    evidence: "Definition of Ready is READY with seven checks PASS, three accepted assumptions, and residual risks assigned to downstream gates."
  - criterion: "The Spec Freeze block accurately waits for human receipts and no downstream gate is inferred."
    result: PASS
    evidence: "The explicit human decision is recorded as APPROVED_WITH_ASSUMPTIONS; note/card are approved, reviewer fields are complete, trusted seals remain the next action, and s07 is unopened."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one s04 authoring and validation pass."
gaps:
  - "Trusted BA Spec receipt is pending."
  - "Trusted QC DoR receipt is pending; BA is recorded as co-reviewer in the source note."
risk_level: MEDIUM
next_action: "Seal the trusted Spec and DoR receipts; only valid digest-matched receipts permit the next handoff."
```

## Handoff

- Mandatory criteria: `AC-001` through `AC-008` in the Spec Card.
- Edge cases to preserve: bootstrap without implicit approval, authority refusals, complete matrix execution, exact artifact identity, immutable historical tags, and dirty-worktree exclusion.
- Conditions to move to s05 content in s06: human Spec and DoR receipts both valid and digest-matched.
