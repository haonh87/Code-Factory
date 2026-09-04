---
artifact_id: "closeout-bundle-legacy-dod-compatibility.s08.verification"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: BUG
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
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "developer"
  - "qc"
  - "devops"
  - "po"
review_mode: independent
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
  dod: "required"
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
  spec_reviewed_at: "2026-09-03T08:06:40Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-09-03T08:06:40Z"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-09-04T04:24:12Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-09-04T04:46:28Z"
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
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.s07.implementation.md"
linked_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.s07.implementation.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "../../packages/workflow-bundle/test/work-item-protocol.test.js"
  - "../../.github/workflows/workflow-guardrails.yml"
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> QC opened s08 at 2026-09-04T10:58:54Z for candidate SHA-256
> `b2d9ba416e54ec2cd1517a98f1a9b05e010c519a1721651534caf42b44f3b83e`. Local source,
> package, rollback, regression, governance, and encoding evidence pass. Overall verification and
> DoD remain BLOCKED until the same corrected source is committed, the hosted Node 18/22 matrix passes,
> and QC explicitly reviews Technical Verification and DoD.

## Step Contract
```yaml
step: "s08 Verify + DoD"
goal: "Establish complete, candidate-bound technical and governance evidence for the legacy closeout correction before any terminal approval or parent closure."
value: "Prevent a locally green but unhosted or digest-mismatched fix from being accepted as release-ready."
scope_in:
  - "AC-CLD-01..08 and EDGE-CLD-01..06"
  - "Corrected source, exact v2.6.2 candidate, hosted Node 18/22, and guarded v2.6.1 rollback"
  - "Technical Verification, DoD, release-readiness evidence, and brownfield compatibility"
scope_out:
  - "npm publication, tag creation, merge, worktree cleanup, and parent CR-008 terminal re-approval"
  - "OBS-CLD-001 and unrelated CHANGE-* migration warnings"
inputs_required:
  - "Approved s07 with B1/B2 evidence"
  - "Candidate SHA-256 b2d9ba416e54ec2cd1517a98f1a9b05e010c519a1721651534caf42b44f3b83e"
  - "Immutable rollback SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
  - "Explicit QC authorization to open s08 at 2026-09-04T10:58:54Z"
outputs_required:
  - "Testing, scan, governance, compatibility, and deployment-review evidence"
  - "Hosted Node 18/22 run identity bound to the corrected candidate source"
  - "QC-reviewable Technical Verification and DoD verdicts"
done_when:
  - "AC-CLD-01..07 have passing source, package, hosted, and rollback evidence"
  - "AC-CLD-08 remains correctly gated for parent follow-up"
  - "All required checks pass or have an explicit justified disposition"
  - "QC explicitly approves Technical Verification and DoD"
constraints:
  hard_constraints:
    - "Do not infer Technical Verification, DoD, Release, or Business Acceptance."
    - "Hosted evidence must come from the corrected committed source and one build-once candidate per run."
    - "Do not merge, tag, publish, close, or clean the worktree in this gate."
  soft_constraints:
    - "Reuse existing GitHub Guardrails without pipeline changes."
  prohibited_actions:
    - "Treating the installed global v2.6.1 bundle as corrected-candidate evidence"
    - "Repacking per Node version or replacing exact digests with a mutable label"
  compliance_checks:
    - "Compare candidate/source digest and hosted run identity."
    - "Retain independent reviewer authority and parent HOLD status."
risks:
  - id: "R-S08-01"
    description: "Hosted Node behavior differs from local Node 26 evidence."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Run the unchanged build-once Node 18/22 Guardrails matrix and require every job to pass."
    contingency: "Keep DoD BLOCKED, fix on the same branch, and rebuild a new explicitly identified candidate."
    owner: "devops/qc"
    status: OPEN
  - id: "R-S08-02"
    description: "Terminal or parent approvals bind to stale evidence."
    likelihood: LOW
    impact: HIGH
    severity: HIGH
    mitigation: "Seal only after artifact/candidate identities are frozen and verified."
    contingency: "Reject stale receipts and repeat the affected review against the current digest."
    owner: "qc/devops/po"
    status: MONITORING
timebox:
  target_duration: "One hosted Guardrails run plus evidence review"
  deadline: ""
  escalation_rule: "Any failed or skipped required hosted job, digest mismatch, or new high finding keeps Technical Verification and DoD blocked."
```

## Main Artifact
```yaml
verification_target: "Legacy closeout correction and exact v2.6.2 candidate"
risk_ranked_test_matrix:
  - risk: "Mandatory DoD remains absent from a supported legacy closeout."
    severity: HIGH
    required_evidence:
      - "Exact maintenance/product/optional gate-set integration fixtures"
  - risk: "A failure exposes partial receipts or derived state."
    severity: HIGH
    required_evidence:
      - "Eight-point transaction failure matrix and deterministic retry/recovery"
  - risk: "Candidate, hosted jobs, and rollback do not use immutable identities."
    severity: HIGH
    required_evidence:
      - "Full candidate and rollback SHA-256 values"
      - "Build-once hosted Node 18/22 run identity"
test_strategy:
  unit_test:
    required: true
    rationale: "Resolver, protocol, receipt, and transaction helpers require regression coverage."
  integration_test:
    required: true
    rationale: "The defect crosses CLI, filesystem receipts, and protocol reconciliation."
  database_test:
    required: false
    rationale: "No database surface exists in this work item."
  feature_test:
    required: true
    rationale: "Installed candidate and rollback behavior must pass across Codex/Claude and global/project modes."
negative_cases:
  - "Missing whole approval_gates block and missing DoD key"
  - "Only one optional terminal gate configured"
  - "All eight transaction failure boundaries"
  - "Unchanged retry and crash recovery"
  - "Adaptive and readiness paths remain separate"
regression_targets:
  - "Adaptive_v1 and readiness selection"
  - "Receipt-v1 signing and role authority"
  - "Protocol reconciliation, lock, recovery, and dirty-delivery guards"
  - "Runtime parity and package install/update"
manual_exploration:
  flows_checked:
    - "Exact production/test diff and unchanged Guardrails workflow"
    - "Source/tarball workflow-gate-review.js digest equality"
    - "Workflow-pack semantic checklist and UTF-8 decoding"
  issues_found:
    - "Default npm cache ownership caused one environmental EPERM; isolated cache succeeded without source changes."
criteria_results:
  - criterion: "AC-CLD-01..06"
    result: PASS
    evidence: "Focused integration cases and the full 44-file suite pass exact selection, authority, atomicity, compatibility, and retry requirements."
  - criterion: "AC-CLD-07"
    result: PARTIAL
    evidence: "Local exact candidate and rollback pass; hosted Node 18/22 run is pending."
  - criterion: "AC-CLD-08"
    result: PARTIAL
    evidence: "Parent F-AG08-001 remains open until child DoD and repeated terminal approvals, as required."
test_evidence:
  unit_test:
    - "npm run validate:workflow:unit -> PASS, 44 files"
  integration_test:
    - "work-item-protocol.test.js and workflow-gate-review.test.js -> PASS"
  database_test: []
  feature_test:
    - "bundle smoke -> PASS"
    - "exact candidate artifact smoke -> PASS, four scenarios"
    - "exact v2.6.2 to v2.6.1 rollback smoke -> PASS, four scenarios"
commands_run:
  - "All workflow validator lanes used by Workflow Guardrails"
  - "npm run validate:workflow:unit"
  - "npm run validate:workflow:pack-audit"
  - "npm run validate:workflow:bundle-smoke"
  - "Exact candidate and rollback artifact smoke"
  - "node --check, git diff --check, unchanged-workflow check, and UTF-8 check"
skipped_checks:
  - "Hosted Node 18/22: pending commit and push of the corrected source."
  - "ESLint: no project wrapper/configuration."
  - "Semgrep: unavailable; manual diff-aware security review is recorded below."
release_blockers:
  - "Hosted Node 18/22 evidence is absent."
  - "Technical Verification and DoD have not been approved by QC."
status: PARTIAL
gaps:
  - "Hosted run identity and full required-job result"
  - "QC Technical Verification and DoD decision"
residual_risks:
  - "Hosted Node 18 or 22 may expose a runtime difference not present on local Node 26."
recommendation: "Commit and push the reviewed scope, run the unchanged hosted matrix, and update this artifact before asking QC to approve Technical Verification/DoD."
notes_for_review: "The candidate digest is frozen for local evidence; no terminal gate is passed by opening s08."
```

## Governance Checks
```yaml
checklist_applied: []
  - "project-context/checklists/strict.md"
checks:
  - id: "GOV-S08-001"
    result: PASS
    evidence: "The change follows approved Option A and no governance/spec exception exists."
  - id: "GOV-S08-002"
    result: PASS
    evidence: "B1 preceded B2, both have explicit human approvals, and s07 audit passed."
  - id: "GOV-S08-003"
    result: PARTIAL
    evidence: "Candidate and rollback provenance are exact locally; hosted provenance is pending."
  - id: "GOV-S08-004"
    result: PASS
    evidence: "Parent remains on HOLD and no Release, Business Acceptance, close, merge, or cleanup is inferred."
blocking_items:
  - "Hosted Node 18/22 run"
  - "QC Technical Verification and DoD review"
owner: "qc/devops"
next_action: "Commit/push the reviewed source and obtain hosted evidence."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PARTIAL
breaking_changes: []
rollback_readiness: READY
evidence:
  - "All 44 unit/regression files and focused true-legacy cases pass."
  - "Adaptive, readiness, receipt-v1, transaction, runtime parity, install/update, and legacy readers remain green."
  - "Exact rollback installs v2.6.1 in Codex/Claude global/project while preserving unmanaged files."
pending:
  - "Hosted Node 18/22 compatibility"
```

## Scan Summary
```yaml
scan_target: "Diff-only formal s08 scan of workflow-gate-review.js and work-item-protocol.test.js"
scan_scope:
  mode: DIFF_ONLY
  changed_files:
    - "packages/workflow-bundle/scripts/workflow-gate-review.js"
    - "packages/workflow-bundle/test/work-item-protocol.test.js"
  affected_modules:
    - "Legacy closeout selection and regression fixtures"
language_stack:
  - "JavaScript"
  - "Node.js CommonJS"
available_scan_tools:
  - "Node parser v26.5.0"
  - "Repository unit/integration wrappers"
  - "git diff --check"
  - "ripgrep 15.2.0"
false_positive_policy: "Diff-aware, evidence-based, dismiss only with a recorded reason."
scan_plan:
  syntax:
    - "Parse both changed JavaScript files."
  static_analysis:
    - "Use repository tests and exact semantic diff review; record missing ESLint."
  security:
    - "Inspect approval authority, fixture environment, execution, parsing, file-write, and secret paths."
  performance_heuristic:
    - "Review fixed gate traversal and bounded test-only recursion/I/O."
syntax_scan_results:
  - command: "node --check on both changed JavaScript files"
    scope:
      - "Changed production and test files"
    status: PASS
    evidence: "Both parse with exit code 0."
    blocker_files: []
static_analysis_results:
  - command: "npm run validate:workflow:unit and exact diff review"
    config_used: "Repository harness; ESLint unavailable"
    scope:
      - "Workflow bundle and exact changed files"
    status: PASS
    findings: []
    new_blockers: []
security_scan_results:
  - command_or_check: "Ripgrep-assisted and manual diff-aware security review"
    scope:
      - "Approval gate derivation and new test fixture code"
    status: PASS
    findings: []
    evidence: "No production command construction, external input, signer, receipt, path authority, or reviewer-role behavior was added; fixture failure injection remains guarded by unchanged fixture-mode code."
performance_heuristic_results:
  - check: "Fixed catalog traversal, allocation, recursion, serialization, and I/O review"
    scope:
      - "Production selector and bounded temporary fixtures"
    status: PASS
    expected_impact: LOW
    confidence: HIGH
    trigger_condition: "Production resolves and filters a fixed gate catalog; recursive filesystem inspection exists only in temporary tests."
    evidence: "No hot-path network, query, cache, large parse/serialize, or unbounded production loop is introduced."
skipped_scans:
  - "ESLint: no wrapper, dependency, or config exists."
  - "Semgrep: executable unavailable; no installation was authorized."
overall_status: PARTIAL
remediation_actions: []
notes_for_verify: "Tool gaps are explicit and justified; hosted runtime verification remains mandatory before Technical Verification can pass."
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "UAT is not applicable to this internal workflow CLI bug."
```

## Release Summary
```yaml
status: PARTIAL
reviewers: []
notes:
  - "Exact local candidate and rollback evidence pass."
  - "Hosted matrix and explicit DevOps/QC Release approval remain pending."
```

## Business Acceptance Summary
```yaml
status: PARTIAL
reviewers: []
notes:
  - "PO Business Acceptance belongs after Technical Verification, DoD, and Release approval."
```

## Deployment Review
```yaml
pipeline_scope: "GitHub Workflow Guardrails exact v2.6.2 candidate verification"
source_strategy:
  branch_model: "Existing codex/adaptive-governance-human-approval-ux pull-request branch"
  triggers:
    - "push to the existing PR branch"
    - "pull_request"
build_and_verify:
  stages:
    - "Workflow validators and authoring smoke"
    - "Build one package candidate and record SHA-256"
    - "Download that artifact into Node 18 and Node 22 jobs"
    - "Run unit, pack audit, bundle smoke, and exact artifact smoke"
  cache_strategy:
    - "Use isolated npm cache locally; hosted Actions owns its runner cache state."
  required_checks:
    - "Every Workflow Guardrails job succeeds with no skipped required job."
artifact_flow:
  registry: "GitHub Actions artifact for verification; npm publication remains out of scope"
  artifact_types:
    - "workflow-bundle-2.6.2.tgz"
    - "workflow-bundle.sha256"
  tagging_strategy:
    - "Full SHA-256 is the candidate identity; semantic tag is forbidden before Release approval."
  provenance_controls:
    - "Pack once in release-candidate-build and download the same artifact into both Node jobs."
promotion_flow:
  - from: local
    to: dev
    conditions:
      - "Hosted Guardrails matrix passes for committed corrected source."
      - "QC approves Technical Verification and DoD."
    automation_level: "Automated verification with explicit human gates"
approval_controls:
  - "QC controls Technical Verification and DoD."
  - "DevOps and QC control Release; PO controls Business Acceptance."
release_controls:
  pre_release:
    - "No publication/tag/merge before hosted checks and terminal approvals."
  post_release:
    - "Repeat parent CR-008 terminal evidence and close F-AG08-001 only against the corrected candidate."
rollback_controls:
  - "Known-good v2.6.1 artifact SHA-256 is 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9."
  - "After rollback, disable bundled closeout and approve applicable terminal gates individually."
pipeline_risks:
  - "Hosted digest or runtime result may differ from local evidence."
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: "Push only the reviewed branch scope; retain the exact candidate and rollback identities in the hosted evidence update."
```

## Audit
```yaml
step: "s08 Verify + DoD"
status: PARTIAL
checks:
  - criterion: "Candidate-bound local verification"
    result: PASS
    evidence: "Regression, pack, exact candidate, rollback, scan fallback, and encoding evidence are recorded."
  - criterion: "Hosted compatibility and provenance"
    result: FAIL
    evidence: "No hosted Node 18/22 run exists yet for the corrected committed source."
  - criterion: "Human-controlled terminal gates"
    result: FAIL
    evidence: "Technical Verification, DoD, Release, and Business Acceptance are intentionally pending."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "The hosted-run portion has not started."
gaps:
  - "Hosted run identity and result"
  - "QC Technical Verification and DoD approval"
risk_level: HIGH
next_action: "Commit and push the reviewed scope, monitor Guardrails, then update the exact-candidate evidence."
```

## Definition of Done
```yaml
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
status: BLOCKED
checks:
  acceptance_criteria_evidenced: FAIL
  implementation_recorded: PASS
  required_verification_completed: FAIL
  code_scan_completed_or_justified: PASS
  traceability_complete: FAIL
  residual_risks_documented: PASS
gaps:
  - "AC-CLD-07 hosted evidence is incomplete."
  - "AC-CLD-08 remains a parent follow-up after child terminal approval."
residual_risks:
  - "Hosted Node compatibility is not yet known."
follow_up_items:
  - "Repeat parent Technical Verification, DoD, Release, and Business Acceptance after this child is done."
  - "OBS-CLD-001 remains separate."
next_action: "Obtain hosted evidence, then present Technical Verification and DoD to QC; do not close or finalize the branch."
```

## Traceability
```yaml
upstream:
  - "closeout-bundle-legacy-dod-compatibility.s04.acceptance-criteria.md"
  - "closeout-bundle-legacy-dod-compatibility.s05.technical-approach.md"
  - "closeout-bundle-legacy-dod-compatibility.s06.task-breakdown.md"
  - "closeout-bundle-legacy-dod-compatibility.s07.implementation.md"
candidate_sha256: "b2d9ba416e54ec2cd1517a98f1a9b05e010c519a1721651534caf42b44f3b83e"
rollback_sha256: "7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
next_step: "Remain in s08 until hosted evidence and QC Technical Verification/DoD approvals are complete."
```

## Handoff
- Overall status: PARTIAL; s08 is open but Technical Verification and DoD are not approved.
- Residual risks: hosted Node 18/22 result and terminal evidence binding.
- Recommendation: commit/push the reviewed source and use the unchanged build-once Guardrails flow.
- Release recommendation when present: BLOCKED pending hosted evidence and explicit terminal gates.
- Next action: run and monitor hosted Guardrails for the corrected source.
