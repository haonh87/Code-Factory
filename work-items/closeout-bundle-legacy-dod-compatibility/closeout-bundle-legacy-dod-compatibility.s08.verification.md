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
status: approved
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
  release_reviewed_by:
    - "devops"
    - "qc"
  release_reviewed_at: "2026-09-04T13:20:37Z"
  business_acceptance_reviewed_by:
    - "po"
  business_acceptance_reviewed_at: "2026-09-07T14:06:08Z"
  dod_reviewed_by:
    - "qc"
  dod_reviewed_at: "2026-09-04T13:04:29Z"
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
> `b2d9ba416e54ec2cd1517a98f1a9b05e010c519a1721651534caf42b44f3b83e`. The corrected source was
> committed as `373d91072dcc8dd02371bb4a37289c81d7299788`; hosted run `33867082744` passed all ten
> required jobs and produced candidate SHA-256 `da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690`.
> The local and hosted tarball bytes differ, but their extracted 545-file trees and corrected production
> script are identical. QC approved the amended Technical Verification artifact binding at
> 2026-09-04T12:54:06Z. Technical Verification was recorded at 2026-09-04T13:04:21Z and DoD followed
> at 2026-09-04T13:04:29Z. DevOps and QC approved Release at 2026-09-04T13:20:37Z for the same
> hosted candidate and immutable v2.6.1 rollback. PO approved Business Acceptance at
> 2026-09-07T14:06:08Z for the same hosted candidate. Every applicable terminal reviewer is now
> recorded; the work item remains `VERIFIED` until trusted closeout receipts are sealed against this
> finalized s08 artifact.

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
    status: CLOSED
  - id: "R-S08-02"
    description: "Terminal or parent approvals bind to stale evidence."
    likelihood: LOW
    impact: HIGH
    severity: HIGH
    mitigation: "Seal only after artifact/candidate identities are frozen and verified."
    contingency: "Reject stale receipts and repeat the affected review against the current digest."
    owner: "qc/devops/po"
    status: MONITORING
  - id: "R-S08-03"
    description: "The pre-host local tarball and hosted build-once tarball have different byte digests despite identical extracted content."
    likelihood: CONFIRMED
    impact: HIGH
    severity: HIGH
    mitigation: "Treat the hosted build-once artifact as the proposed canonical candidate, retain both digests, and require explicit QC binding amendment before Technical Verification."
    contingency: "Keep DoD blocked if QC does not accept the hosted binding; do not substitute either digest silently."
    owner: "qc/devops"
    status: CLOSED
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
    result: PASS
    evidence: "Hosted run 33867082744 passes all ten required jobs for source 373d91072dcc8dd02371bb4a37289c81d7299788 and build-once candidate da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690. Downloaded exact-candidate and guarded rollback smoke both pass 4/4. QC approved the hosted binding at 2026-09-04T12:54:06Z; the opened local digest remains historical content-equivalent evidence."
  - criterion: "AC-CLD-08"
    result: PASS
    evidence: "The parent remains on HOLD with F-AG08-001 open, stale terminal approvals remain historical only, and the required post-child Technical Verification, Release, and Business Acceptance sequence is preserved. This passes the child handoff/control criterion without claiming parent closure."
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
    - "hosted run 33867082744 -> PASS, all 10 required jobs including Node 18 and Node 22"
    - "downloaded hosted candidate da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690 -> PASS, four install/update scenarios"
    - "downloaded hosted candidate to immutable v2.6.1 rollback -> PASS, four rollback scenarios"
commands_run:
  - "All workflow validator lanes used by Workflow Guardrails"
  - "npm run validate:workflow:unit"
  - "npm run validate:workflow:pack-audit"
  - "npm run validate:workflow:bundle-smoke"
  - "Exact candidate and rollback artifact smoke"
  - "node --check, git diff --check, unchanged-workflow check, and UTF-8 check"
  - "gh run watch/view/download for run 33867082744"
  - "Independent SHA-256, extracted-tree comparison, hosted exact-artifact smoke, and hosted rollback smoke"
skipped_checks:
  - "ESLint: no project wrapper/configuration."
  - "Semgrep: unavailable; manual diff-aware security review is recorded below."
release_blockers: []
status: PASS
gaps: []
residual_risks:
  - "Actions v4 reports a non-blocking Node 20 deprecation warning and is currently forced onto Node 24 by GitHub."
recommendation: "Finalize this s08 host and seal the DoD, Release, and Business Acceptance receipts atomically against hosted candidate da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690."
notes_for_review: "QC explicitly approved Technical Verification first and DoD second; DevOps and QC then approved Release; PO explicitly approved Business Acceptance. No receipt is inferred before the human TTY closeout action."
```

## Candidate Binding Review
```yaml
status: APPROVED
opened_by: "qc"
opened_at: "2026-09-04T10:58:54Z"
opened_candidate_sha256: "b2d9ba416e54ec2cd1517a98f1a9b05e010c519a1721651534caf42b44f3b83e"
hosted_source_sha: "373d91072dcc8dd02371bb4a37289c81d7299788"
hosted_run_id: "33867082744"
hosted_run_url: "https://github.com/haonh87/Code-Factory/actions/runs/33867082744"
proposed_canonical_candidate_sha256: "da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690"
rollback_sha256: "7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
comparison:
  tarball_byte_identity: DIFFERENT
  extracted_file_count_local: 545
  extracted_file_count_hosted: 545
  extracted_tree_content: IDENTICAL
  corrected_script_sha256_local: "e547e6efce9e040d00d4615f91c30abb05c6b337ca38c241c335c95eaab34305"
  corrected_script_sha256_hosted: "e547e6efce9e040d00d4615f91c30abb05c6b337ca38c241c335c95eaab34305"
hosted_evidence:
  required_jobs: 10
  passed_jobs: 10
  failed_jobs: 0
  skipped_required_jobs: 0
  node_18: PASS
  node_22: PASS
  downloaded_exact_candidate_smoke: PASS
  downloaded_exact_rollback_smoke: PASS
decision: "Bind Technical Verification to hosted candidate SHA-256 da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690; retain local b2d9ba41... as historical pre-host evidence and v2.6.1 as rollback."
reviewed_by:
  - "qc"
reviewed_at: "2026-09-04T12:54:06Z"
```

## Technical Verification
```yaml
status: APPROVED
verdict: PASS
candidate_sha256: "da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690"
source_sha: "373d91072dcc8dd02371bb4a37289c81d7299788"
hosted_run_id: "33867082744"
acceptance_criteria:
  passed: 8
  failed: 0
  partial: 0
required_hosted_jobs:
  passed: 10
  failed: 0
  skipped: 0
local_and_artifact_evidence:
  workflow_unit_files: 44
  exact_hosted_candidate_scenarios: "4/4 PASS"
  exact_rollback_scenarios: "4/4 PASS"
  extracted_candidate_files: "545/545 identical"
  production_script_sha256: "e547e6efce9e040d00d4615f91c30abb05c6b337ca38c241c335c95eaab34305"
governance_and_compatibility:
  spec_compliance: PASS
  code_quality: PASS
  regression: PASS
  compatibility: PASS
  rollback_readiness: READY
scan_disposition: "PASS_WITH_JUSTIFIED_TOOL_GAPS"
blocking_findings: []
residual_risks:
  - "Non-blocking GitHub Actions v4 Node 20 runtime deprecation warning; candidate jobs themselves pass."
review_authority: "qc"
reviewed_by:
  - "qc"
reviewed_at: "2026-09-04T13:04:21Z"
review_note: "QC approved Technical Verification before DoD for the bound hosted candidate."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - id: "GOV-S08-001"
    result: PASS
    evidence: "The change follows approved Option A and no governance/spec exception exists."
  - id: "GOV-S08-002"
    result: PASS
    evidence: "B1 preceded B2, both have explicit human approvals, and s07 audit passed."
  - id: "GOV-S08-003"
    result: PASS
    evidence: "Hosted run and rollback provenance are exact; QC explicitly approved the amended hosted candidate binding at 2026-09-04T12:54:06Z."
  - id: "GOV-S08-004"
    result: PASS
    evidence: "Parent remains on HOLD; Release and Business Acceptance are explicitly approved, while close, merge, and cleanup are not inferred."
blocking_items: []
owner: "human-operator"
next_action: "Seal the closeout bundle in one human TTY interaction against this finalized s08 host."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
evidence:
  - "All 44 unit/regression files and focused true-legacy cases pass."
  - "Adaptive, readiness, receipt-v1, transaction, runtime parity, install/update, and legacy readers remain green."
  - "Exact rollback installs v2.6.1 in Codex/Claude global/project while preserving unmanaged files."
  - "Hosted Node 18 and Node 22 exact-candidate jobs both pass in run 33867082744."
pending: []
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
notes_for_verify: "Tool gaps are explicit and justified; hosted runtime verification and the QC-approved candidate binding both pass."
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
status: APPROVED
reviewers:
  - "devops"
  - "qc"
reviewed_at: "2026-09-04T13:20:37Z"
candidate_sha256: "da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690"
rollback_version: "2.6.1"
rollback_sha256: "7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
notes:
  - "Hosted build-once candidate and guarded rollback evidence pass."
  - "Technical Verification and DoD are approved by QC."
  - "DevOps and QC explicitly approved Release for the bound hosted candidate and immutable rollback."
  - "Publication, tag creation, merge, and promotion execution remain outside this approval until the parent and final lifecycle gates allow them."
```

## Business Acceptance Summary
```yaml
status: APPROVED
reviewers:
  - "po"
reviewed_at: "2026-09-07T14:06:08Z"
decision_source: "User explicitly approved Business Acceptance with role PO for this work item and hosted candidate SHA-256 da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690."
accepted_candidate_sha256: "da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690"
accepted_release_version: "2.6.2"
rollback_version: "2.6.1"
rollback_sha256: "7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
receipt_state: READY_TO_SEAL
notes:
  - "PO approval was recorded only after Technical Verification, DoD, and Release approval."
  - "The parent CR-008 terminal approvals remain historical and must be repeated after this child closes."
  - "This approval does not publish, tag, merge, or clean the worktree."
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
    - "Run 33867082744 binds source 373d91072dcc8dd02371bb4a37289c81d7299788 to hosted artifact SHA-256 da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690."
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
  - "DevOps and QC approved Release at 2026-09-04T13:20:37Z for candidate da49e51167... and rollback v2.6.1 7c1d2c7...f0b9."
  - "PO approved Business Acceptance at 2026-09-07T14:06:08Z for the same hosted candidate."
release_controls:
  pre_release:
    - "No publication/tag/merge before hosted checks and terminal approvals."
  post_release:
    - "Repeat parent CR-008 terminal evidence and close F-AG08-001 only against the corrected candidate."
rollback_controls:
  - "Known-good v2.6.1 artifact SHA-256 is 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9."
  - "After rollback, disable bundled closeout and approve applicable terminal gates individually."
pipeline_risks:
  - "Local and hosted pack environments produce byte-different tarballs; the explicit QC-approved hosted binding prevents silent digest substitution."
  - "GitHub warns that Actions v4 Node 20 internals are deprecated and currently forced onto Node 24."
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: "Retain both historical local and QC-approved hosted identities; promote only the hosted build-once artifact after the required human gates."
```

## Audit
```yaml
step: "s08 Verify + DoD"
status: PASS
checks:
  - criterion: "Candidate-bound local verification"
    result: PASS
    evidence: "Regression, pack, exact candidate, rollback, scan fallback, and encoding evidence are recorded."
  - criterion: "Hosted compatibility and provenance"
    result: PASS
    evidence: "Run 33867082744 succeeded all ten required jobs for source 373d91072dcc8dd02371bb4a37289c81d7299788; Node 18 and Node 22 consumed the same hosted artifact da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690."
  - criterion: "Candidate artifact binding"
    result: PASS
    evidence: "QC approved the hosted binding at 2026-09-04T12:54:06Z after confirming the opened local digest remains historical and extracted content is identical."
  - criterion: "Human-controlled technical gates"
    result: PASS
    evidence: "QC explicitly approved Technical Verification first at 2026-09-04T13:04:21Z and DoD second at 2026-09-04T13:04:29Z; later Release and Business Acceptance decisions remain separately attributable."
  - criterion: "Release authority and immutable artifact controls"
    result: PASS
    evidence: "DevOps and QC approved Release at 2026-09-04T13:20:37Z for hosted candidate da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690 with rollback v2.6.1 SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9."
  - criterion: "Business acceptance authority and sequencing"
    result: PASS
    evidence: "PO explicitly approved Business Acceptance at 2026-09-07T14:06:08Z for the same hosted candidate after Technical Verification, DoD, and Release approval."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Hosted run completed successfully at 2026-09-04T11:17:56Z; evidence reconciliation completed at 2026-09-04T12:47:23Z."
gaps: []
risk_level: LOW
next_action: "Seal the closeout bundle receipts in one human TTY interaction; keep parent CR-008 and the branch/worktree open until the receipts digest-match."
```

## Spec Coverage
```yaml
status: PASS
coverage:
  - id: "AC-CLD-01"
    status: PASS
    evidence: "True legacy maintenance fixtures select mandatory DoD."
  - id: "AC-CLD-02"
    status: PASS
    evidence: "Legacy product-release fixtures select DoD, Release, and Business Acceptance exactly."
  - id: "AC-CLD-03"
    status: PASS
    evidence: "Reviewer authority is preserved for all selected terminal gates."
  - id: "AC-CLD-04"
    status: PASS
    evidence: "All eight transaction failure boundaries prove zero partial terminal writes and deterministic recovery."
  - id: "AC-CLD-05"
    status: PASS
    evidence: "Adaptive, readiness, receipt-v1, and historical-read regression suites pass."
  - id: "AC-CLD-06"
    status: PASS
    evidence: "Repeated unchanged legacy closeout is idempotent and non-duplicative."
  - id: "AC-CLD-07"
    status: PASS
    evidence: "QC-bound hosted candidate da49e511... passes all ten hosted jobs, exact installed-artifact smoke, and guarded rollback smoke."
  - id: "AC-CLD-08"
    status: PASS
    evidence: "Parent remains on HOLD with stale terminal approvals historical; post-child reapproval sequencing remains enforced."
summary:
  total: 8
  pass: 8
  fail: 0
  partial: 0
gaps: []
```

## Definition of Done
```yaml
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
status: DONE
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: []
residual_risks:
  - "Actions v4 Node runtime deprecation warning requires later pipeline maintenance but did not fail this candidate."
follow_up_items:
  - "Repeat parent Technical Verification, DoD, Release, and Business Acceptance after this child is done."
  - "OBS-CLD-001 remains separate."
next_action: "Preserve the verified branch/worktree and seal the trusted closeout receipts before protocol DONE or branch finalization."
```

## Traceability
```yaml
upstream:
  - "closeout-bundle-legacy-dod-compatibility.s04.acceptance-criteria.md"
  - "closeout-bundle-legacy-dod-compatibility.s05.technical-approach.md"
  - "closeout-bundle-legacy-dod-compatibility.s06.task-breakdown.md"
  - "closeout-bundle-legacy-dod-compatibility.s07.implementation.md"
opened_candidate_sha256: "b2d9ba416e54ec2cd1517a98f1a9b05e010c519a1721651534caf42b44f3b83e"
canonical_hosted_candidate_sha256: "da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690"
candidate_binding_status: "APPROVED_BY_QC"
candidate_binding_reviewed_at: "2026-09-04T12:54:06Z"
release_status: "APPROVED_BY_DEVOPS_AND_QC"
release_reviewed_at: "2026-09-04T13:20:37Z"
business_acceptance_status: "APPROVED_BY_PO"
business_acceptance_reviewed_at: "2026-09-07T14:06:08Z"
hosted_source_sha: "373d91072dcc8dd02371bb4a37289c81d7299788"
hosted_run_id: "33867082744"
rollback_sha256: "7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
next_step: "Seal trusted DoD, Release, and Business Acceptance receipts against this finalized s08 host."
```

## Handoff
- Overall status: VERIFIED; QC approved Technical Verification then DoD, DevOps/QC approved Release, and PO approved Business Acceptance.
- Residual risks: non-blocking Actions Node runtime deprecation warning.
- Recommendation: retain hosted candidate `da49e511...` and immutable v2.6.1 rollback while sealing closeout receipts.
- Release recommendation when present: APPROVED for the bound candidate and rollback; no publication/tag/merge is executed by this gate alone.
- Next action: run the human TTY closeout-bundle approval so all terminal receipts bind to this finalized s08 digest.
