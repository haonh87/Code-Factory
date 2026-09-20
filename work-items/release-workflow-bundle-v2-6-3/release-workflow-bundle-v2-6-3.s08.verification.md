---
artifact_id: "release-workflow-bundle-v2-6-3.s08.verification"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-3"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
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
change_id: "CHANGE-007"
change_status: approved
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
  - "po"
  - "ba"
  - "developer"
  - "qc"
  - "devops"
review_mode: independent
verification_owner: "qc"
artifact_shape: adaptive_v1
request_lane: product_delivery
workflow_required: true
routing_reasons:
  - "LANE_PRODUCT_DELIVERY"
escalation_reasons:
  - "HARD_RELEASE"
role_reasons:
  po:
    - "ROLE_PO_PRODUCT_OUTCOME"
  ba:
    - "ROLE_BA_REQUIREMENTS"
  developer:
    - "ROLE_DEVELOPER_DELIVERY"
  qc:
    - "ROLE_QC_VERIFICATION"
  devops:
    - "ROLE_DEVOPS_RELEASE"
gate_reasons:
  spec:
    - "GATE_SPEC_PRODUCT_DELIVERY"
  dor:
    - "GATE_DOR_PRODUCT_DELIVERY"
  approach:
    - "GATE_APPROACH_PRODUCT_DELIVERY"
  task_plan:
    - "GATE_TASK_PLAN_PRODUCT_DELIVERY"
  dod:
    - "GATE_DOD_PRODUCT_DELIVERY"
  release:
    - "GATE_RELEASE_PUBLICATION"
  business_acceptance:
    - "GATE_BUSINESS_ACCEPTANCE_PRODUCT_OUTCOME"
    - "GATE_BUSINESS_ACCEPTANCE_RELEASE_OUTCOME"
adaptive_activation:
  source_version: "2.6.2"
  installed_versions:
    - "2.6.2"
  parity_passed: true
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
  spec: ["ba"]
  dor: ["ba","qc"]
  approach: ["developer"]
  task_plan: ["developer"]
  dod: ["qc"]
  release: ["devops","qc"]
  business_acceptance: ["po"]
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: ["qc"]
  dod_reviewed_at: "2026-09-20T14:40:54Z"
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
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
  - "release-workflow-bundle-v2-6-3.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Branch Technical Verification evidence is ready for independent QC review for PR #9. The current
> PR head and corroboration run pass all 10 hosted jobs, and exact candidate plus rollback checks pass
> for CLI and all four Codex/Claude global/project modes. The overall work item remains PARTIAL because
> this PR artifact is PRE_MERGE_ONLY and AC-R263-09/11/12/13 belong to later main, Release, publication,
> and Business Acceptance tasks. QC approved Technical Verification for the exact branch identity;
> QC then approved technical DoD in a separate decision. Merge, Release, publication, and Business
> Acceptance remain independent, while T9-T13 stay mandatory.

## Step Contract
```yaml
step_goal: "Verify the reviewed v2.6.3 branch and PRE_MERGE_ONLY PR artifact against the locked release criteria, surface every residual gate, and prepare independent QC decisions without inferring DoD or Release."
input_summary:
  - "T0-T7 implementation, B1/B2/B3 ordered review, and QC-approved s08 handoff."
  - "Technical Verification source 09eed7d2573ebf6fad9400de6748862c1035d947; reviewed release source afefacae95639aa0fab0135038f6bb421e0cebb5."
  - "Current PR head ab56593be9ff31f77e9b1a0cbcde91a44379f176; corroboration run 35516877406 passes 10/10 with the same PRE_MERGE_ONLY tarball SHA-256 f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f."
output_summary:
  - "Risk-ranked branch verification and AC-R263-01..13 coverage."
  - "Exact candidate and immutable v2.6.2 rollback compatibility evidence."
  - "Governance, scan, public-state, residual-risk, and downstream-gate status."
done_when:
  - "QC independently approves or rejects Technical Verification for the named source/run/digest."
  - "QC decides DoD separately after Technical Verification; no merge occurs before that decision."
  - "T9-T13 obligations remain explicit and are not represented as completed."
owner: "qc"
```

## Artifact Chính
```yaml
verification_target: "v2.6.3 branch contribution and PRE_MERGE_ONLY PR artifact"
risk_ranked_test_matrix:
  - risk: "Source, release diff, hosted run, or tarball identity drift"
    severity: HIGH
    required_evidence: ["full source SHA", "release diff SHA-256", "run ID", "tarball SHA-256", "checksum match"]
  - risk: "Candidate fails a supported CLI/Codex/Claude installation mode"
    severity: HIGH
    required_evidence: ["standalone CLI version", "Codex global/project", "Claude global/project", "42-skill parity"]
  - risk: "Rollback rebuilds or does not restore immutable v2.6.2"
    severity: HIGH
    required_evidence: ["retained v2.6.2 digest", "five-mode identity", "unmanaged-file preservation", "timing below 15 minutes"]
  - risk: "Historical records mutate or v2.6.3 becomes public before terminal gates"
    severity: HIGH
    required_evidence: ["historical SHA locks", "remote tag check", "GitHub Release check", "npm version/dist-tag check"]
  - risk: "A skipped scanner hides a release blocker"
    severity: MEDIUM
    required_evidence: ["syntax/unit/pack/release wrappers", "diff-aware secret scan", "explicit skip reasons"]
test_strategy:
  unit_test:
    required: true
    rationale: "Release contracts, version surfaces, historical locks, materialization expectations, and workflow regression behavior are covered by the 45-file package suite."
  integration_test:
    required: true
    rationale: "The tarball must install and update isolated CLI, Codex, and Claude homes rather than only pass source assertions."
  database_test:
    required: false
    rationale: "The release delta has no database, schema, query, or persistence change."
  feature_test:
    required: true
    rationale: "The complete pack-once, download, install/update, rollback, and public-state guard flows are release-level behavior."
negative_cases:
  - "Candidate or rollback SHA mismatch is rejected before installation."
  - "Stale active v2.6.2 claims and any historical release hash mutation fail release-surface tests."
  - "A rebuilt downstream substitute is prohibited; Node consumers resolve the build-once checksum."
  - "Premature tag, GitHub Release, npm v2.6.3, or latest movement is treated as a blocker."
regression_targets:
  - "CLI version identity and 42-skill Codex/Claude runtime parity."
  - "CR-009 exact disposition/resolved-state behavior remains candidate-only and disappears on v2.6.2 rollback."
  - "Unmanaged files and modes survive candidate install/update and rollback."
  - "All historical v2.0.0-v2.6.2 release records remain byte-stable."
manual_exploration:
  flows_checked:
    - "PR #9 source/base/merge state and 10 hosted jobs."
    - "All check-run annotations classified by severity."
    - "Downloaded artifact contents, package identity, checksum file, and tar entry count."
    - "Remote tag, GitHub Release, npm v2.6.3, and npm latest read-only state."
  issues_found: []
criteria_results:
  - criterion: AC-R263-01
    result: PASS
    evidence: "Reviewed release source afefacae... is a release-only descendant of baseline 3204749e...; 21-file release diff SHA-256 c838bef1... is unchanged and reviewed B1/B2/B3."
  - criterion: AC-R263-02
    result: PASS
    evidence: "Active structured and bilingual surfaces identify 2.6.3; release-surface checks freeze v2.0.0-v2.6.2 historical hashes."
  - criterion: AC-R263-03
    result: PASS
    evidence: "The v2.6.3 release record separates Complete Packaged Delta from Non-Packaged Repository Changes and passed B2 review."
  - criterion: AC-R263-04
    result: PASS
    evidence: "Run 35516336889 builds once; both Node jobs consume tarball SHA-256 f496aed3...; authority is explicitly PRE_MERGE_ONLY pending T9 main binding."
  - criterion: AC-R263-05
    result: PASS
    evidence: "45/45 unit files and local workflow, pack, bundle, release, rollback, diff, and UTF-8 checks pass; unavailable ESLint/Semgrep are disclosed."
  - criterion: AC-R263-06
    result: PASS
    evidence: "Current PR-head run 35516336889 passes 10/10 jobs including Node 18/22; annotations are 10 notice, 0 warning, 0 failure, 0 Node deprecation."
  - criterion: AC-R263-07
    result: PASS
    evidence: "Downloaded exact artifact reports CLI 2.6.3 and passes Codex/Claude global/project 4/4 with 42 managed skills."
  - criterion: AC-R263-08
    result: PASS
    evidence: "Exact retained rollback af49a958... reports CLI 2.6.2 and passes Codex/Claude global/project 4/4; entire rehearsal completes in 2 seconds, so every mode is below 15 minutes."
  - criterion: AC-R263-09
    result: PARTIAL
    evidence: "Public collision/latest state is checked, but formal GitHub/npm principal and permission preflight belongs to T11 after authoritative main binding."
  - criterion: AC-R263-10
    result: PASS
    evidence: "No remote v2.6.3 tag, GitHub Release, or npm version exists; npm latest remains 2.6.2 and terminal gates remain unapproved."
  - criterion: AC-R263-11
    result: PARTIAL
    evidence: "The staged publication sequence is locked but cannot execute before T11 Release approval."
  - criterion: AC-R263-12
    result: PARTIAL
    evidence: "No public v2.6.3 identity exists yet; final cross-channel equality belongs to T12."
  - criterion: AC-R263-13
    result: PARTIAL
    evidence: "Business Acceptance must evaluate the future published candidate under T13."
test_evidence:
  unit_test:
    - "npm run validate:workflow:unit -> PASS, 45/45 files."
  integration_test:
    - "Run 35516336889 -> PASS 10/10 jobs; Node 18 and Node 22 consume the same tarball checksum."
    - "Exact candidate smoke -> PASS CLI plus Codex/Claude global/project 4/4."
    - "Exact rollback smoke -> PASS Codex/Claude global/project 4/4; standalone rollback CLI reports 2.6.2."
  database_test: []
  feature_test:
    - "Candidate SHA-256 f496aed3... and immutable rollback SHA-256 af49a958... pass exact transition rehearsal."
    - "Read-only public-state probe confirms no v2.6.3 collision and latest=2.6.2."
commands_run:
  - "gh run watch/view/download for runs 35515273824, 35515671125, 35516336889, and 35516877406"
  - "GitHub Actions artifact/check-run annotation API queries"
  - "release-candidate-artifact-smoke.test.js in exact-artifact mode"
  - "release-rollback-smoke.test.js in exact-artifact mode"
  - "npm install retained v2.6.2 tarball and wfc version"
  - "git ls-remote, gh release view, npm view version/dist-tags"
skipped_checks:
  - "ESLint: no repository script or configuration; Developer and QC accepted this as non-blocking in B1/B3."
  - "Semgrep: unavailable in the environment; Developer and QC accepted this as non-blocking in B1/B3."
release_blockers: []
status: PARTIAL
gaps:
  - "Authoritative post-merge main source/run/artifact binding is pending T9/T10."
  - "GitHub/npm permission preflight, Release approval, staged publication, and Business Acceptance are pending T11-T13."
residual_risks:
  - "PR artifact is non-publishable and must never substitute for the post-merge main candidate."
  - "ubuntu-latest migration notice is non-blocking now but runner behavior changes after 2026-10-19."
recommendation: DOD_HUMAN_APPROVED_T9_T13_PENDING
notes_for_review: "QC approved Technical Verification for source 09eed7d.../run 35516336889 and separately approved DoD after current head ab56593.../run 35516877406 corroborated 10/10 PASS with the same PRE_MERGE_ONLY tarball f496aed3.... T9/T10 must rebind and refresh after a separately authorized merge."
```

## Technical Verification Decision
```yaml
proposed_verdict: PASS
human_verdict: PASS
reviewer_role: "qc"
reviewed_by: "qc"
reviewed_at: "2026-09-20T14:30:26Z"
approval_source: "Explicit user QC approval for the exact PR #9 branch identity."
pr_number: 9
source_sha: "09eed7d2573ebf6fad9400de6748862c1035d947"
run_id: 35516336889
candidate_authority: PRE_MERGE_ONLY
candidate_sha256: "f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f"
rollback_version: "2.6.2"
rollback_sha256: "af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f"
criteria_passed:
  - "AC-R263-01..08"
  - "AC-R263-10"
downstream_obligations:
  - "AC-R263-09 under T11"
  - "AC-R263-11 under T11"
  - "AC-R263-12 under T12"
  - "AC-R263-13 under T13"
retained_scan_gaps:
  - "R263-SG-003: ESLint is not configured."
  - "R263-SG-004: Semgrep is unavailable."
verdict: PASS_FOR_BRANCH_TECHNICAL_VERIFICATION
corroborating_source_sha: "ab56593be9ff31f77e9b1a0cbcde91a44379f176"
corroborating_run_id: 35516877406
corroborating_result: "10/10 jobs PASS; candidate SHA-256 unchanged"
dod_status: HUMAN_APPROVED_PENDING_SHARED_HOST_RECEIPT
authority_boundary: "Technical Verification did not itself approve DoD; QC approved DoD separately. Neither decision authorizes merge, main-candidate binding, Release, publication, Business Acceptance, archive, or cleanup."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - "PASS - s04/s05/s06 trusted authoring receipts remain approved."
  - "PASS - T6 B1/B2/B3 review order is Spec Compliance then Code Quality."
  - "PASS - QC explicitly approved T7 handoff and s08 opening."
  - "PASS - source/run/tarball authority is PRE_MERGE_ONLY; Release and publication are not inferred."
  - "PASS - release diff SHA-256 remains c838bef1... and no production edit followed review."
blocking_items: []
owner: "qc"
next_action: "Request a separate merge authorization; preserve T9-T13 and all remaining terminal gates."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
candidate_modes: "PASS - CLI + Codex global/project + Claude global/project"
rollback_modes: "PASS - CLI + Codex global/project + Claude global/project"
rollback_version: "2.6.2"
rollback_sha256: "af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f"
rollback_total_seconds: 2
compatibility_boundary: "Branch evidence only; repeat against authoritative main candidate under T9/T10."
```

## Scan Summary
```yaml
status: PARTIAL
notes:
  - "Syntax, unit/regression, pack audit, bundle smoke, secret-pattern scan, diff, UTF-8, and hosted checks pass."
  - "ESLint is not configured and Semgrep is unavailable; both gaps were explicitly accepted as non-blocking by Developer and QC."
  - "10 hosted annotations are runner-migration notices; warning=0, failure=0, Node deprecation=0."
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "No separate UAT gate is applicable; exact package integration evidence covers the branch contribution."
```

## Release Summary
```yaml
status: PARTIAL
reviewers: []
notes:
  - "Release is required but not approved."
  - "Authoritative main candidate, authority preflight, and collision checks remain T9-T11."
  - "No tag, GitHub Release, npm v2.6.3, or latest movement has occurred."
```

## Business Acceptance Summary
```yaml
status: PARTIAL
reviewers: []
notes:
  - "PO Business Acceptance is required only after the actual GitHub/npm publication is verified."
```

## Audit
```yaml
audit_status: PARTIAL
finish_target: "codex/release-workflow-bundle-v2-6-3"
workspace_kind: BOTH
verify_inputs:
  - "QC-approved Technical Verification for source 09eed7d..., run 35516336889, and PRE_MERGE_ONLY candidate f496aed3...."
  - "QC-approved DoD corroboration at current head ab56593..., run 35516877406, with 10/10 jobs PASS and the same candidate digest."
  - "Immutable v2.6.2 rollback SHA-256 af49a958...."
finish_gate_checks:
  verify_complete: PASS
  dod_complete: PASS
  findings_closed: PASS
  exceptions_resolved: PASS
allowed_actions:
  - "Record the separately approved QC DoD decision."
  - "Prepare the separate merge decision without publishing or tagging."
blocked_actions:
  - "Merge PR #9."
  - "Remove the branch or worktree."
  - "Bind or publish a main release candidate."
  - "Create a tag or GitHub Release."
  - "Publish workflow-bundle@2.6.3 or move npm latest."
  - "Archive or clean up the work item."
cleanup_sequence: []
merge_conditions:
  - "A separate merge action is explicitly authorized."
  - "PR #9 remains mergeable and every required check is green at merge time."
  - "The merge does not create a tag, GitHub Release, npm publication, or latest movement."
residual_risks:
  - "The verified candidate is PRE_MERGE_ONLY and is not publishable."
  - "ESLint and Semgrep remain explicitly accepted scan gaps."
  - "T9-T13 remain mandatory after merge."
final_recommendation: HOLD_OPEN
notes_for_closeout: "Technical Verification and DoD are human-approved, but merge still needs separate authorization and T9-T13 remain open. Keep the branch and worktree open."
```

## Definition of Done
```yaml
work_item_slug: "release-workflow-bundle-v2-6-3"
proposed_status: DONE
status: DONE
human_gate_status: APPROVED
human_decision: DOD_APPROVED_FOR_BRANCH_TECHNICAL_SCOPE
reviewed_by: ["qc"]
reviewed_at: "2026-09-20T14:40:54Z"
approval_source: "Explicit user QC DoD approval after the separately approved Technical Verification."
technical_verification_source_sha: "09eed7d2573ebf6fad9400de6748862c1035d947"
technical_verification_run_id: 35516336889
corroborating_source_sha: "ab56593be9ff31f77e9b1a0cbcde91a44379f176"
corroborating_run_id: 35516877406
candidate_authority: PRE_MERGE_ONLY
candidate_sha256: "f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f"
trusted_receipt_status: PENDING_FINAL_SHARED_S08_HOST
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: []
residual_risks:
  - "PR artifact is PRE_MERGE_ONLY; authoritative main re-verification is mandatory."
  - "ESLint is not configured and Semgrep is unavailable; Developer and QC accepted both scan gaps as non-blocking."
  - "AC-R263-09/11/12/13 remain mandatory downstream obligations under T11-T13."
follow_up_items:
  - "T9/T10: merge only after separate authorization, then bind and verify the authoritative main candidate."
  - "T11: complete GitHub/npm authority preflight and obtain the independent DevOps/QC Release decision."
  - "T12: publish in the locked order and prove cross-channel identity equality."
  - "T13: obtain PO Business Acceptance, archive the release record, and clean up only after terminal reconciliation."
next_action: "Obtain separate merge authorization, execute T9/T10 exact-main binding, then complete T11-T13 and seal terminal receipts against the final shared s08 host."
```

## Traceability
```yaml
upstream:
  - "release-workflow-bundle-v2-6-3.s04.acceptance-criteria.md"
  - "release-workflow-bundle-v2-6-3.s05.technical-approach.md"
  - "release-workflow-bundle-v2-6-3.s06.task-breakdown.md"
  - "release-workflow-bundle-v2-6-3.s07.implementation.md"
branch_coverage: "AC-R263-01..08 and AC-R263-10 PASS; AC-R263-09/11/12/13 remain downstream."
edge_case_controls:
  EC-R263-01: "Sequence keeps latest=2.6.2 on staging/GitHub partial failure."
  EC-R263-02: "No rebuild/overwrite rule and existing-artifact promotion are locked."
  EC-R263-03: "Read-only collision checks currently show no v2.6.3 identity."
  EC-R263-04: "Historical hashes and ownership-sensitive version text are frozen."
  EC-R263-05: "Digest mismatch is assertion-blocking in exact-artifact tests."
  EC-R263-06: "Functional and timing evidence are separate; measured rollback total is 2 seconds."
  EC-R263-07: "Formal authority preflight is pending T11 and failure leaves public state unchanged."
next_step: "Separate merge authorization, followed by T9/T10 authoritative-main binding; T11-T13 remain mandatory."
```

## Handoff
- Overall status: VERIFIED at the protocol level; QC separately approved Technical Verification and technical DoD for the PRE_MERGE_ONLY branch candidate.
- Residual risks: PRE_MERGE_ONLY authority, two accepted scanner gaps, future Ubuntu runner migration, and mandatory T9-T13 re-verification/release work.
- Recommendation: Keep PR #9 and its worktree open pending separate merge authorization; preserve T9-T13 as mandatory downstream obligations.
- Release recommendation khi có: HOLD; Release is not yet eligible and no public mutation is authorized.
- Next action: Human explicitly authorizes or rejects merge of PR #9. Merge must not publish, tag, or move npm latest.
