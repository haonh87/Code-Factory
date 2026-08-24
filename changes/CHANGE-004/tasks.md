---
change_id: "CHANGE-004"
artifact_kind: "change-tasks"
status: approved
linked_work_items:
  - "integrate-design-checklists-into-sa-ta"
---

# Change Tasks - CHANGE-004

## Tasks
```yaml
source_ref: "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.s06.task-breakdown.md"
review_state: "S08_ALL_HUMAN_GATES_APPROVED_READY_TO_SEAL"
reviewed_by: "developer"
reviewed_at: "2026-08-24T04:02:07.380Z"
tasks:
  - { id: "T0", owner: "developer", action: "After activation, create and verify the ignored v2.6.0 implementation worktree from the recorded main HEAD." }
  - { id: "T1", owner: "developer", action: "Add fail-first architecture-role assertions for the approved checklist/reference behavior." }
  - { id: "T2", owner: "developer", action: "Add the minimum canonical SA/TA EN/VI references and hooks to turn T1 green." }
  - { id: "T3", owner: "developer", action: "Review the canonical/test batch in order: spec compliance, then code/content quality." }
  - { id: "T4", owner: "developer", action: "Regenerate Codex/Claude runtimes and prove scoped parity plus unchanged unaffected-skill digests." }
  - { id: "T5", owner: "developer", action: "Add fail-first release assertions and prepare internally consistent v2.6.0/42 candidate surfaces." }
  - { id: "T6", owner: "devops", action: "Freeze, hash, inventory, and smoke the exact retained unpublished candidate artifact." }
  - { id: "T7", owner: "developer", action: "Review runtime/release batches in order: spec compliance, then code/content quality." }
  - { id: "T8", owner: "developer", action: "Run integrated pre-verify checks and hand evidence to QC without declaring DoD or Release." }
dependencies:
  - "Amended s05 Approach receipt APPROVED with digest_match=true before this Task Plan is reviewed."
  - "This Task Plan receipt APPROVED with digest_match=true before s07 activation."
  - "T0 -> T1 -> T2 -> T3 -> T4 -> T5 -> T6 -> T7 -> T8."
  - "Any canonical change after T4 reruns T4; any source change after T6 invalidates and rebuilds the candidate."
verification_tasks:
  - "Prove 34/34 private route coverage; 13/13 portable checks; 10/10 converted prompts; 6/6 representative cases; zero confidential leakage."
  - "Run architecture-role contract regression, canonical/runtime parity, workflow pack audit, bundle smoke, release-surface and exact-candidate smoke tests."
  - "Verify 42 canonical, 42 Codex, and 42 Claude skills; unchanged unaffected-skill digests; YAML/UTF-8/whitespace/diff checks."
  - "QC maps AC-001 through AC-010 to evidence at s08 and alone determines the DoD verdict."
release_tasks:
  - "Prepare but do not publish workflow-bundle v2.6.0 with 42 managed skills."
  - "Retain one tarball and record SHA-256, contents, source HEAD, Node/npm versions, compatibility, and rollback evidence."
  - "Require separate trusted Release and Business Acceptance receipts before tag, registry publication, or live installation."
  - "Keep v2.5.0/42 as the verified rollback baseline."
```

## T8 Execution Evidence
```yaml
recorded_at: "2026-08-24T03:30:07Z"
task_id: T8
execution_status: BLOCKED
evidence_ref: "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.s07.implementation.md#T8 Integrated Pre-Verify Evidence"
passing_lanes:
  - "AC-001 route accounting 34/34 with 13/10/8/3 totals"
  - "Focused architecture-role contract"
  - "Canonical/runtime parity at 42/42/42"
  - "Workflow pack audit and bundle smoke"
  - "Release surface and exact candidate smoke at SHA-256 5da823c9..."
  - "Workflow, planning, change, execution, and target-filtered protocol validation"
  - "Scoped leakage, stale-current-claim, diff, JSON, UTF-8, digest, and no-tag guards"
blocking_command: "npm run validate:workflow:unit"
blocking_result: "exit 1; 36/39 test files pass"
blockers:
  - id: T8-F01
    owner: developer
    paths:
      - "packages/workflow-bundle/test/release-install-all-smoke.test.js"
      - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
    reason: "Unchanged release regression tests still require v2.5.0/v2.4.0 and fail on the approved v2.6.0/v2.5.0 transition."
  - id: T8-F02
    owner: developer
    paths:
      - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
    reason: "Unchanged live-fixture assertion requires P2 ACTIVE while the referenced protocol source-of-truth is DONE."
proposed_amendment:
  amendment_id: S06-AMEND-003
  status: PROPOSED_WAITING_DEVELOPER_APPROVAL
  exact_paths:
    - "packages/workflow-bundle/test/release-install-all-smoke.test.js"
    - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
    - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
  recovery: "Approve and reseal the Task Plan, apply the smallest test-only fix against the existing RED evidence, rerun full unit, then repeat T6 rebuild/retest, T7 review, and T8 integrated checks."
candidate_guard:
  source_state_sha256: "753ada5184b7475495399d608632963ff57d639213c58dcdb9f17b685424b52e"
  candidate_sha256: "5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9"
  source_or_candidate_changed_during_t8: false
human_gates:
  s06_amendment: "WAITING_DEVELOPER_APPROVAL"
  s08_qc: "NOT_OPEN"
  dod: "NOT_CLAIMED"
  release: "NOT_CLAIMED"
  business_acceptance: "NOT_CLAIMED"
```

## T8 Recovery Evidence
```yaml
recorded_at: "2026-08-24T04:23:07Z"
task_id: T8
execution_status: PASS_READY_FOR_QC
evidence_ref: "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.s07.implementation.md#T8 Recovery After S06-AMEND-003"
amendment:
  amendment_id: S06-AMEND-003
  approved_by: developer
  task_plan_receipt_reviewed_at: "2026-08-24T04:02:07.380Z"
  task_plan_artifact_sha256: "455e3c0ecaf7a061963c3b7ee5997b60c29b5947ffd56e5af70978f13ed04775"
  digest_match: true
  exact_paths:
    - "packages/workflow-bundle/test/release-install-all-smoke.test.js"
    - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
    - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
recovery_results:
  focused_red_to_green: PASS
  full_unit: "PASS - 39/39 test files"
  source_state_sha256: "2b4650d788269c1d066f47d4a150d9b790224fba5a7134435b1b4c80f3efa108"
  successful_rebuild_count: 1
  candidate_sha256: "5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9"
  candidate_entries: 544
  exact_candidate_smoke: "PASS - Codex/Claude x global/project 4/4"
  rollback_sha256: "36615668ad2bcc752998d33e4e7e6f837aef3f1feabf83b04aecd612cabb92ec"
  exact_rollback_smoke: "PASS - v2.6.0/42 -> v2.5.0/42 at 4/4; unmanaged markers preserved"
repeat_t7:
  spec_compliance: PASS
  code_quality: PASS
  unresolved_high_or_medium_findings: 0
t8_matrix:
  ac_001_through_ac_010: PASS
  route_coverage: "PASS - 34/34; 13/10/8/3"
  runtime_inventory_and_parity: "PASS - 42/42/42"
  pack_audit_and_bundle_smoke: PASS
  leakage: "PASS - 0 matches across 125 publishable files"
  utf8: "PASS - 30/30 changed/untracked text files"
  workflow_planning_change_execution_validators: PASS
  target_filtered_protocol: "PASS - production validator 1/1"
  no_tag_or_publication_action: true
residual_risks:
  - "Full-root protocol validation is red only for four stale receipts in unrelated worktree-and-closure-integrity; CHANGE-004 target passes."
  - "ESLint and Semgrep are unavailable; node syntax, full unit, pack audit, diff-aware security patterns, and manual review are recorded fallbacks."
human_gates:
  s08_qc: "NOT_OPEN"
  dod: "NOT_CLAIMED"
  release: "NOT_CLAIMED"
  business_acceptance: "NOT_CLAIMED"
next_action: "QC independently opens s08 Verify + DoD against the frozen source, candidate, and rollback digests."
```

## S08 Independent Verification Evidence Draft
```yaml
recorded_at: "2026-08-24T04:37:38Z"
review_state: S08_DONE_PROTOCOL_CLOSED
evidence_ref: "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.s08.verification.md"
protocol:
  status: VERIFIED
  current_step: s08
  opened_by: qc
  opened_at: "2026-08-24T04:31:12Z"
  verified_by: qc
  verified_at: "2026-08-24T04:47:10.948Z"
technical_verification:
  status: PASS
  acceptance_coverage: "10/10 PASS"
  full_unit: "PASS - 39/39 test files"
  exact_candidate_smoke: "PASS - SHA-256 5da823c9...; Codex/Claude x global/project 4/4"
  exact_rollback_smoke: "PASS - SHA-256 36615668...; Codex/Claude x global/project 4/4"
  runtime_parity: "PASS - 42/42/42"
  pack_audit: "PASS - 42 skills and 166 references"
  source_state_stable: "PASS - 2b4650d788269c1d066f47d4a150d9b790224fba5a7134435b1b4c80f3efa108 before and after verification"
  candidate_stable: "PASS - 5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9"
scan:
  status: PARTIAL
  justification: "ESLint and Semgrep are unavailable; node syntax, JSON parsing, full tests, pack audit, diff-aware security scan, and manual performance/security review pass."
governance:
  profile: strict
  status: ALIGNED
  exception_or_waiver: NONE
external_residual:
  - "Full-root protocol validation reports only four stale receipts owned by worktree-and-closure-integrity; no CHANGE-004 protocol error remains after s08 synchronization."
human_gates:
  technical_verification: "APPROVED_BY_QC_AT_2026-08-24T04:45:23Z"
  dod: "APPROVED_BY_QC_RECEIPT_MATCH_AT_2026-08-24T04:45:23Z"
  release: "APPROVED_BY_DEVOPS_AND_QC_RECEIPT_MATCH_AT_2026-08-24T04:58:36Z"
  business_acceptance: "APPROVED_BY_PO_RECEIPT_MATCH_AT_2026-08-24T05:07:41Z"
release_decision:
  status: APPROVED
  reviewed_by:
    - devops
    - qc
  reviewed_at: "2026-08-24T04:58:36Z"
  receipt_status: APPROVED
  receipt_artifact_sha256: "89f0b65a37d8cf63147c6152526024635a93eedda437fb8499c761759eb4c017"
  digest_match: true
  source_state_sha256: "2b4650d788269c1d066f47d4a150d9b790224fba5a7134435b1b4c80f3efa108"
  candidate_sha256: "5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9"
  rollback_sha256: "36615668ad2bcc752998d33e4e7e6f837aef3f1feabf83b04aecd612cabb92ec"
  external_actions_performed: []
business_acceptance_decision:
  status: APPROVED
  reviewed_by: po
  reviewed_at: "2026-08-24T05:07:41Z"
  receipt_status: APPROVED
  receipt_artifact_sha256: "89f0b65a37d8cf63147c6152526024635a93eedda437fb8499c761759eb4c017"
  digest_match: true
  acceptance_coverage: "AC-001 through AC-010: 10/10 PASS"
  source_state_sha256: "2b4650d788269c1d066f47d4a150d9b790224fba5a7134435b1b4c80f3efa108"
  candidate_sha256: "5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9"
protocol_close:
  status: DONE
  closed_by: coordinator
  closed_at: "2026-08-24T06:23:09.530Z"
  s08_artifact_sha256: "89f0b65a37d8cf63147c6152526024635a93eedda437fb8499c761759eb4c017"
  required_gate_receipts:
    dod:
      status: APPROVED
      reviewer: qc
      digest_match: true
    release:
      status: APPROVED
      reviewer: devops
      digest_match: true
    business_acceptance:
      status: APPROVED
      reviewer: po
      digest_match: true
  external_actions_performed: []
branch_finalization:
  status: COMPLETED
  branch_commit: "26591a2301999b433a3fec58bbe8af2ef8c637fa"
  branch_committed_at: "2026-08-24T06:45:01Z"
  merge_commit: "af29ed3c89d8e45a8e84cb7b4c17458744c5d181"
  merged_into: main
  merged_at: "2026-08-24T06:45:29Z"
  merge_strategy: NO_FF
  post_merge_verification:
    merge_tree_matches_reviewed_branch: PASS
    full_unit: "PASS - 39/39 test files"
    runtime_parity: "PASS - 42/42/42"
    pack_audit: "PASS - 42 skills and 166 references"
    exact_candidate_smoke: "PASS - Codex/Claude x global/project 4/4"
    exact_rollback_smoke: "PASS - v2.6.0/42 -> v2.5.0/42 at 4/4"
    utf8: "PASS - 30/30 committed text files"
    receipt_digest_match: true
  candidate_retention:
    path: "packages/workflow-bundle/workflow-bundle-2.6.0.tgz"
    sha256: "5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9"
  cleanup:
    completed_at: "2026-08-24T06:49:57Z"
    worktree: REMOVED
    local_branch: DELETED
    unrelated_main_changes_preserved: true
  non_blocking_format_warning:
    classification: ACCEPTED_EXACT_ARTIFACT_STYLE_WARNING
    detail: "git diff --cached --check reports one terminal blank line in each of the four approved checklist files; bytes were kept unchanged to preserve the approved source and candidate identities."
  external_release_actions_performed: []
branch_and_worktree: FINALIZED
next_action: "Execute the separately scoped guarded release with the retained exact candidate, or explicitly conclude the no-publication path before archiving the work item and change package."
```
