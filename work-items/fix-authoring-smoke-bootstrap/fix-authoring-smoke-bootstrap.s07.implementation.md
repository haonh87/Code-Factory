---
artifact_id: "fix-authoring-smoke-bootstrap.s07.implementation"
artifact_family: workflow-step
work_item_slug: "fix-authoring-smoke-bootstrap"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
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
interaction_mode: self
execution_roles:
  - "developer"
  - "qc"
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
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: ["devops", "qc"]
  business_acceptance: ["po"]
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-08-24T10:42:16.000Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["ba", "qc"]
  dor_reviewed_at: "2026-08-24T10:42:16.000Z"
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-08-24T14:25:32.000Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-08-24T14:25:32.000Z"
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "ci-cd-release"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s04.acceptance-criteria.md"
  - "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s06.task-breakdown.md"
  - "product-specs/cards/fix-authoring-smoke-bootstrap.md"
  - "changes/CHANGE-006/proposal.md"
linked_artifacts:
  - "changes/CHANGE-006/execution/task-status.md"
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Implementation is active in the required isolated worktree. The approved scope is a verification-harness correction plus v2.6.1 release preparation; no production approval semantics, tag, or release has changed yet.

## Step Contract
```yaml
step: "s07 Implement"
goal: "Produce a reviewed, locally verified v2.6.1 candidate whose 13-case authoring smoke proves the approved bootstrap contract without changing production approval behavior or historical v2.6.0 identity."
value: "Replace the contradictory release signal with trustworthy evidence ready for independent s08 verification."
scope_in:
  - "Correct and rename the one stale authoring-smoke case."
  - "Advance current package/release surfaces to v2.6.1/42 with v2.6.0/42 as immutable rollback."
  - "Align every existing release compatibility fixture that the required 39-file unit suite proves is version-bound."
  - "Run early spec-compliance then code-quality review and local candidate verification."
scope_out:
  - "Production approval semantics, public CLI contract, schema, runtime topology, and managed-skill inventory."
  - "GitHub tag/release publication before s08 Release approval; npm publication."
  - "Unrelated dirty-main changes and other work items."
inputs_required:
  - "Approved work item, CHANGE-006, Spec, DoR, Approach, and Task Plan receipts."
  - "Approved Spec Card REQ-001 through REQ-007 and AC-001 through AC-008."
  - "Deterministic stale smoke failure, approved TD-01 baseline, and retained v2.6.0 rollback artifact."
outputs_required:
  - "Bug reproduction, hypothesis, experiment, RED-to-GREEN evidence, and smallest-correct edits."
  - "Two-tier review plus local and exact candidate/rollback evidence for s08."
done_when:
  - "Authoring smoke is 13/13 and TD-01/authority controls remain green."
  - "v2.6.1/42 surfaces agree and historical v2.6.0 evidence is unchanged."
  - "Review and required local/candidate/rollback checks pass with no open blocker."
  - "Handoff is READY_FOR_VERIFY without claiming DoD, Release, or Business Acceptance."
constraints:
  hard_constraints:
    - "Use codex/fix-authoring-smoke-bootstrap in the approved in-repo worktree."
    - "Do not import unrelated main changes or change production approval semantics/CI topology."
    - "Do not move v2.6.0 or publish v2.6.1 before human Release approval."
  soft_constraints:
    - "Keep the smoke correction to one existing case and avoid blind version replacement."
  prohibited_actions:
    - "No tag, GitHub Release, npm publish, worktree cleanup, unapproved drift, or delegation in s07."
  compliance_checks:
    - "Scoped diff, workflow/SDD/change/planning/execution validation, and exact digest controls."
risks:
  - id: "S07-RISK-001"
    description: "A broad version update could rewrite historical v2.6.0 evidence."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Use structured bump tooling, inspect every diff, and protect the historical digest."
    contingency: "Discard only owned-path edits and regenerate from the clean anchor."
    owner: "developer"
    status: OPEN
  - id: "S07-RISK-002"
    description: "Dirty-main content could contaminate the candidate."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Use this clean worktree and audit changed paths before each checkpoint."
    contingency: "Stop candidate work and restore only this branch to the governed anchor."
    owner: "developer"
    status: MONITORING
  - id: "S07-RISK-003"
    description: "A candidate could be promoted before complete evidence and human approval."
    likelihood: LOW
    impact: HIGH
    severity: HIGH
    mitigation: "Keep publication prohibited in s07; s08 DevOps/QC Release approval remains mandatory."
    contingency: "Block promotion and invalidate any candidate whose source/payload changes."
    owner: "devops/qc"
    status: MONITORING
timebox:
  target_duration: "One isolated implementation and local-evidence pass before s08."
  deadline: ""
  escalation_rule: "Return to s04/s06 for any production-contract, ungranted-path, or release-control change."
```

## Input Readiness
```yaml
step: "s07 Implement"
status: READY
available_inputs:
  - "Approach and Task Plan receipts are APPROVED by developer with digest_match=true."
  - "Spec/DoR, work item, and CHANGE-006 approvals remain valid."
  - "Protocol is ACTIVE at s07 with explicit write roots."
  - "Clean worktree at anchor 7fe68b38c6c5c3193dcf6c09351e7730c9768b79."
missing_inputs: []
invalid_inputs: []
conflicts: []
assumptions:
  - "Retained v2.6.0 stays the exact rollback artifact; publication waits for s08."
risk_level: MEDIUM
next_action: "Capture the unchanged 13-case failure as RED evidence, then correct the one stale case."
```

## Main Artifact
```yaml
recommended_design: "Option A - rewrite and rename the existing smoke case; production behavior stays unchanged."
implementation_mode: BUGFIX
tasks_completed:
  - "TASK-001: receipts verified, protocol activated, anchor committed, and worktree created."
  - "TASK-002: stale smoke case corrected and early B1 review passed."
  - "TASK-003: v2.6.1 structured identity, tests, current EN/VI docs, release note, and v2.6.0 rollback surfaces aligned."
  - "TASK-004: B1 and B2 reviews passed in the required spec-compliance then code-quality order."
  - "TASK-005: integrated local verification passed, including the required 13-case smoke, 39-file unit suite, release compatibility matrix, pack/runtime checks, and workflow validators."
bug_repro_evidence:
  - "Unchanged npm run validate:workflow:authoring-smoke: 12 cases passed; mutating-action-requires-report failed because approve returned Missing required argument '--reviewed-by' while the fixture expected Missing work item report."
hypothesis_log:
  - assumption: "The stale case omits --reviewed-by and expects a missing-report refusal while approved behavior bootstraps on explicit approval."
    status: CONFIRMED
    evidence: "The unchanged RED run failed at the omitted reviewer; adding the approved reviewer/provenance assertions made the renamed case pass."
debug_experiments:
  - goal: "Confirm the failure is a stale harness contract rather than a production regression."
    action: "Run the full unchanged 13-case authoring smoke, then run TD-01 through TD-04 independently."
    result: "Smoke failed only at the stale 13th case; TD-01 through TD-04 all passed against production behavior."
  - goal: "Detect cross-case effects after successful report bootstrap."
    action: "Rerun all 13 cases after the one-case correction."
    result: "A later shared-temp capability scan saw the case-owned pending bootstrap report; removing that owned fixture after its assertions restored full isolation and 13/13."
tdd_evidence:
  - behavior: "Legacy scaffold explicit approval bootstraps a provenance-bearing approved report while read-only status persists nothing."
    failing_test: "npm run validate:workflow:authoring-smoke -> stale case failed with Missing required argument '--reviewed-by'."
    passing_test: "npm run validate:workflow:authoring-smoke -> 13/13 PASS; approval-path-defects.test.js -> TD-01 through TD-04 PASS."
safe_refactor_notes:
  - "No production refactor planned; only one smoke function/case changes."
code_changes:
  - "Renamed the stale smoke function/case to legacy-scaffold-approval-bootstraps-report."
  - "Asserted no report after status, approved with reviewed_by=ba, and asserted request_source, REPORT_BOOTSTRAPPED, APPROVED, and reviewed_by provenance."
  - "Removed the successful case-owned workflow after assertions so the shared temp project cannot contaminate later capability cases."
doc_changes:
  - "Initialized this s07 contract and evidence note."
  - "Updated reviewed current-candidate EN/VI docs and added the lifecycle-stable v2.6.1 release note."
config_changes:
  - "Advanced root/package manifests, package version, and public wfc flow label to 2.6.1."
  - "Aligned release-candidate, release-surface, and exact v2.6.1-to-v2.6.0 rollback test contracts."
  - "Aligned the existing install-all release compatibility fixture to the approved v2.6.1 candidate after the full unit suite exposed its stale v2.6.0 constant."
review_checkpoints:
  - "TASK-001 isolation check passed: clean approved branch/path with no dirty-main import."
  - "B1 SPEC_COMPLIANCE PASS: AC-001/AC-002 covered; 13-case inventory preserved; only the approved smoke file changed; production approval paths untouched."
  - "B1 CODE_QUALITY PASS: bootstrap-oriented name, direct failure messages, existing helpers, scoped cleanup, node --check and diff --check all pass."
  - "B2 SPEC_COMPLIANCE PASS: all paths match TASK-003; v2.6.0 release-note digest remains 12e2e49d61d7145a71e12eaf6c2c82e7fcdc46d349ce16716daa9b858dc45151; no publication claim, production-path edit, or npm scope."
  - "B2 CODE_QUALITY PASS: structured bump plus targeted review, EN/VI consistency, exact rollback assertions, syntax/JSON/UTF-8/diff checks, and all three source release preflights pass."
  - "B2R SPEC_COMPLIANCE PASS: the planning-time install-all path correction remains inside TASK-003/TEST-006, preserves v2.6.0 rollback and all approved boundaries, and introduces no Spec or Approach drift."
  - "B2R CODE_QUALITY PASS: the one-line fixture constant is consistent with every v2.6.1 release surface; targeted install-all and the complete 39-file unit suite pass."
outputs_actual:
  - "Protocol ACTIVE at s07; isolated branch/worktree at governed anchor 7fe68b3."
  - "Authoring smoke 13/13 PASS and approval-path-defects TD-01 through TD-04 PASS."
  - "Release surface, candidate source contract, and v2.6.1-to-v2.6.0 rollback source preflights PASS at 42 skills."
  - "Integrated local verification PASS: smoke 13/13; unit 39/39; install-all codex/claude x global/project at 42 skills; pack audit and bundle smoke; workflow, SDD, change, planning, and execution validators; six JavaScript syntax checks; four JSON parses; fifteen UTF-8 files; diff check."
  - "Workflow Guardrails definition is byte-identical to anchor 7fe68b3 (Git object 3f66ca629842b39122efd48187c7c48abfdf9c11); v2.6.0 release-note and rollback-tarball SHA-256 values remain 12e2e49d61d7145a71e12eaf6c2c82e7fcdc46d349ce16716daa9b858dc45151 and 5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9."
known_limitations:
  - "Exact candidate, remote CI, and s08 gates remain pending."
  - "The bump tool resolves the outermost manifest by default; an in-repo worktree must pass --repo-root explicitly to avoid writing the parent main tree."
follow_up_items:
  - "Track worktree-aware default root resolution for bump-version separately; this change uses the supported explicit --repo-root mitigation and does not widen CHANGE-006."
  - "Implementation path correction: add release-install-all-smoke.test.js to granted paths after the required 39-file unit suite exposed its stale v2.6.0 constant; this is an existing release-test compatibility surface, not a Spec or Approach change."
notes_for_testing: "Run the unchanged authoring smoke first and preserve the exact failing case/message before editing."
```

## Implementation Notes
```yaml
worktree_plan:
  worktree_target: "fix-authoring-smoke-bootstrap"
  planning_track: quick
  risk_signals:
    - "Dirty shared main and exact artifact/tag/release risk."
  worktree_decision: REQUIRED
  decision_reason:
    - "Approved s06 isolation requirement remains applicable."
    - "Resolved path stays inside the repository boundary."
  isolation_strategy:
    branch_name: "codex/fix-authoring-smoke-bootstrap"
    worktree_path: ".claude/worktrees/fix-authoring-smoke-bootstrap"
    owned_paths:
      - "TASK-002/TASK-003 source and release paths in s06."
      - "fix-authoring-smoke-bootstrap and CHANGE-006 evidence."
      - "CHANGE-004 evidence only during TASK-009."
    expected_duration: "s07 through final s08 closeout."
  execution_guards:
    - "Run implementation in this worktree; audit paths; never import dirty-main content."
  skip_reason: ""
  cleanup_preconditions:
    - "Explicit s08 DoD, Release, and Business Acceptance remain valid with no open findings."
  notes_for_implementation: "Retain this worktree until branch-finish-discipline runs after s08."
review_plan:
  review_target: "TASK-002 smoke correction and TASK-003 release surfaces"
  planning_track: quick
  review_mode: SELF
  review_order: [SPEC_COMPLIANCE, CODE_QUALITY]
  review_batches:
    - batch: "B1 smoke harness"
      scope: ["packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"]
      trigger: "After RED-to-GREEN and before release-surface work."
      reviewer_role: "developer"
    - batch: "B2 release surface"
      scope: ["Structured version, release tests, current docs, and v2.6.1 release note from TASK-003."]
      trigger: "Before integrated local verification."
      reviewer_role: "developer"
  required_checks:
    spec_compliance:
      - "AC-001/AC-002, 13 cases, zero production-path change, immutable v2.6.0, GitHub-only boundary."
    code_quality:
      - "Clear assertions, existing helpers, targeted version/docs changes, no needless abstraction."
  finding_policy:
    blocker_threshold: "Any drift, production edit, historical mismatch, test failure, or unowned path blocks progress."
    reopen_conditions:
      - "Any path/payload edit after review or any check failure."
  handoff_to_verify:
    - "Provide resolved findings, scoped diff, local checks, candidate/rollback identity, and risks."
  notes_for_implementation_or_verify: "In every batch conclude spec compliance before code quality."
ci_cd_release_plan_ref: "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s06.task-breakdown.md#CI/CD-Release-Controls"
```

## Release Execution Controls
```yaml
pipeline_scope: "Local source checks, exact GitHub candidate, remote Workflow Guardrails, immutable GitHub Release."
source_strategy:
  branch_model: "Isolated topic branch; reviewed commit becomes the exact CI/tag target."
  triggers: ["Local checks per batch", "Remote Workflow Guardrails for exact target"]
build_and_verify:
  stages: ["Focused RED-to-GREEN", "Full local validation", "Candidate/rollback 4/4", "Remote 9/9"]
  cache_strategy: ["Isolated npm cache for one retained tarball build"]
  required_checks: ["13/13 smoke", "39/39 unit", "42/42/42 inventory", "candidate/rollback digests", "remote 9/9"]
artifact_flow:
  registry: "GitHub Release asset only; npm excluded."
  artifact_types: ["workflow-bundle-2.6.1.tgz"]
  tagging_strategy: ["Immutable annotated v2.6.1 after Release approval", "Never move v2.6.0/v2.6.1"]
  provenance_controls: ["Commit, payload fingerprint, SHA-256, size, npm pack inventory"]
promotion_flow:
  - from: local
    to: dev
    conditions: ["Reviewed candidate", "Remote 9/9", "DevOps/QC Release approval"]
    automation_level: "Manual GitHub publication after approval."
approval_controls: ["QC: Technical Verification/DoD; DevOps+QC: Release; PO: Business Acceptance"]
release_controls:
  pre_release: ["No publication in s07; promote the same verified artifact"]
  post_release: ["Hash downloaded asset; verify target and unchanged v2.6.0"]
rollback_controls: ["Install immutable v2.6.0 and prove four mode/scope cases"]
pipeline_risks: ["Any post-freeze source/payload edit invalidates candidate evidence"]
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: "Run through local candidate and remote CI; publication remains blocked until s08 Release approval."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "npm run validate:workflow:authoring-smoke (unchanged RED, then corrected GREEN)"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/fix-authoring-smoke-bootstrap"
  - "codex/fix-authoring-smoke-bootstrap at anchor 7fe68b3"
worktree_reason: "Dirty main plus exact artifact/tag/release risk requires isolation."
review_status: COMPLETED
review_refs:
  - "B1 SPEC_COMPLIANCE PASS and B1 CODE_QUALITY PASS in Main Artifact review_checkpoints."
  - "B2 SPEC_COMPLIANCE PASS and B2 CODE_QUALITY PASS in Main Artifact review_checkpoints."
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: ["Single tightly sequenced owner; no delegation used"]
merge_path: "Reviewed topic commits -> main for remote CI; retain worktree until s08 closeout."
verify_path:
  - "Focused smoke/TD-01 -> two-tier review -> full local -> exact candidate/rollback -> remote 9/9 -> s08 gates."
```

## Governance Exceptions
```yaml
status: NONE
exceptions: []
implementation_path_corrections:
  - path: "packages/workflow-bundle/test/release-install-all-smoke.test.js"
    trigger: "Required full-unit run failed because the existing install/update compatibility test was still bound to v2.6.0."
    classification: "Planning-time owned-path correction within TASK-003 release-test alignment; no change to requirements, recommended option, production behavior, public contract, or release controls."
    authorization: "Added to protocol granted_write_paths and mirrored in the s01 protocol block before editing."
```

## Spec Change
```yaml
status: NOT_REQUIRED
reason: "The fix corrects a stale verification harness and current release surfaces without changing the frozen behavior or public contract."
```

## SDD Traceability
```yaml
requirement_refs:
  - "REQ-001 -> TASK-002"
  - "REQ-002 -> TASK-002, TASK-004, TASK-005"
  - "REQ-003 -> TASK-005"
  - "REQ-004 -> TASK-007"
  - "REQ-005 -> TASK-003, TASK-006, TASK-008, TASK-009"
  - "REQ-006 -> TASK-006, TASK-009"
  - "REQ-007 -> TASK-009"
acceptance_refs:
  - "AC-001 -> TEST-001, TEST-002"
  - "AC-002 -> TEST-002, TEST-003 and scoped diff"
  - "AC-003 -> TEST-001, TEST-002, TEST-004, TEST-005"
  - "AC-004 -> TEST-007"
  - "AC-005 -> TEST-006, TEST-008"
  - "AC-006 -> TEST-009"
  - "AC-007 -> TEST-010"
  - "AC-008 -> release audit and no npm publication"
task_refs: ["TASK-001 through TASK-005 complete; TASK-006 through TASK-009 remain sequenced by s06"]
test_refs: ["TEST-001 through TEST-010 in s06 verification_plan"]
```

## Traceability
```yaml
upstream: ["Approved s04/Spec Card", "Approved s06 Approach/Task Plan"]
current: ["Active s07 implementation and Delivery Rule Evidence"]
downstream: ["s08 coverage, compatibility, Technical Verification, DoD, Release, Business Acceptance"]
```

## Handoff

- Actual outputs: TASK-001 through TASK-005 complete; RED-to-GREEN, v2.6.1 release surfaces, early review including the path-correction reopen, and integrated local verification are recorded without changing the approved requirements or approach.
- Known limitations: exact candidate, remote CI, and s08 gates remain pending.
- Notes for testing: preserve the unchanged smoke failure before editing and follow s06 exact-artifact controls.
- Notes for deployment: no publication until DevOps/QC Release approval; npm remains excluded.
