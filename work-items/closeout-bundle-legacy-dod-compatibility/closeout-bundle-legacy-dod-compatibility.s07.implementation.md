---
artifact_id: "closeout-bundle-legacy-dod-compatibility.s07.implementation"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
step_id: "s07"
step_slug: "implementation"
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "code-scan-review"
  - "testing"
  - "workflow-pack-audit"
  - "step-goal-contract"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.s04.acceptance-criteria.md"
  - "closeout-bundle-legacy-dod-compatibility.s05.technical-approach.md"
  - "closeout-bundle-legacy-dod-compatibility.s06.task-breakdown.md"
linked_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "../../packages/workflow-bundle/test/work-item-protocol.test.js"
  - "../../packages/workflow-bundle/test/workflow-gate-review.test.js"
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> T0-T3 are implemented in the existing worktree. The true legacy fixtures reproduced the missing-DoD
> defect before one focused selector correction made them green. Successful, retry, optional-gate, and
> all eight transaction-failure cases now pass. B1 Spec Compliance was approved by QC at
> 2026-09-04T09:44:27Z. B2 Code Quality was approved by Developer and QC at 2026-09-04T10:19:43Z.
> T5 local regression, pack audit, exact candidate, and guarded rollback checks pass; s07 is ready to
> hand SHA-256 `b2d9ba416e54ec2cd1517a98f1a9b05e010c519a1721651534caf42b44f3b83e` to s08.

## Step Contract
```yaml
step: "s07 Implement"
goal: "Implement the approved canonical legacy closeout correction through a recorded RED-to-GREEN cycle."
value: "Restore mandatory DoD without weakening authority, transaction atomicity, compatibility, or release provenance."
scope_in:
  - "T0 baseline, T1 legacy RED fixtures, T2 selector correction, T3 atomicity/retry/compatibility evidence"
  - "T4 independent Spec Compliance then Code Quality review"
  - "T5 full regression and exact-candidate handoff after review"
scope_out:
  - "Transaction coordinator, receipt, signer, schema, adaptive_v1, readiness, OBS-CLD-001, publication, merge, and cleanup"
inputs_required:
  - "Digest-matched Spec, DoR, Approach, and Task Plan receipts"
  - "ACTIVE protocol at s07 with three bounded write roots"
outputs_required:
  - "Bug reproduction, hypothesis, debug, TDD, change, worktree, and review evidence"
done_when:
  - "T0-T5 evidence is recorded"
  - "Spec Compliance precedes Code Quality and both pass"
  - "No unresolved high finding remains before s08 handoff"
constraints:
  - "No production code before an expected failing fixture"
  - "Only the legacy selector branch may change production"
  - "No done, merge, tag, publication, or cleanup claim in s07"
owner: "developer"
```

## Main Artifact
```yaml
recommended_design: "Use getRequiredFinalizedGateKeys for legacy s08, filter to CLOSEOUT_GATES, and retain the existing transaction path."
implementation_mode: BUGFIX
tasks_completed:
  - "T0: baseline and bounded worktree scope recorded"
  - "T1: true legacy maintenance/product fixtures reproduced missing DoD"
  - "T2: canonical resolver wired into only the legacy closeout selector"
  - "T3: success, optional gates, atomic failure matrix, retry, and compatibility evidence pass"
  - "T4: B1 Spec Compliance and B2 Code Quality passed in mandatory order with human approval"
  - "T5: full local regression, pack audit, candidate smoke, exact rollback smoke, and s08 handoff prepared"
bug_repro_evidence:
  - behavior: "Legacy maintenance without approval_gates rejected closeout instead of selecting DoD."
    command: "node packages/workflow-bundle/test/work-item-protocol.test.js"
    observed: "ERROR: Legacy closeout bundle has no required terminal gates in the s08 host note."
  - behavior: "Legacy product s08 without approval_gates.dod sealed only explicit optional gates."
    command: "node packages/workflow-bundle/test/work-item-protocol.test.js"
    observed: "Exact [dod, release, business_acceptance] assertion and independent DoD receipt assertion failed."
hypothesis_log:
  - assumption: "The defect is caused by legacy closeout filtering only explicitly required approval_gates keys."
    status: CONFIRMED
    evidence: "Both true-legacy RED cases failed exactly at legacy gate selection; adaptive baseline stayed green."
  - assumption: "The exported finalized-gate resolver already expresses mandatory legacy DoD and optional terminal applicability."
    status: CONFIRMED
    evidence: "One resolver call changed maintenance to [dod] and product to [dod, release, business_acceptance]."
  - assumption: "The approval transaction coordinator needs a production correction."
    status: REJECTED
    evidence: "All eight failure points, rollback, crash recovery, locking, receipt independence, and retry evidence pass unchanged."
debug_experiments:
  - goal: "Distinguish legacy from adaptive test behavior."
    action: "Created raw reports without artifact_shape/gates and s08 hosts without a DoD applicability key."
    result: "Fixture-shape assertions passed and the two expected missing-DoD failures appeared."
  - goal: "Test the smallest approved authority correction."
    action: "Called getRequiredFinalizedGateKeys only after the adaptive/readiness early returns and filtered its result to CLOSEOUT_GATES."
    result: "Core and optional legacy gate sets passed without changing adaptive/readiness behavior."
  - goal: "Check whether complete gate selection remains atomic."
    action: "Drove the real closeout CLI across all eight transaction-fail-at points and reran the unchanged coordinator suite."
    result: "No partial receipts or derived state remained; journal/lock/stage residue was absent; signer keypair remained expected fixture state."
tdd_evidence:
  - behavior: "Legacy maintenance always includes mandatory DoD."
    failing_test: "testLegacyMaintenanceCloseoutRestoresImplicitDod failed with no required terminal gates."
    passing_test: "The same test passes with exact sealed gate set [dod]."
  - behavior: "Legacy product closeout prepends mandatory DoD to configured terminal gates."
    failing_test: "testLegacyProductReleaseCloseoutRestoresImplicitDod failed exact-set and DoD-receipt assertions."
    passing_test: "The same test passes with [dod, release, business_acceptance] and QC/DevOps/PO receipts."
safe_refactor_notes:
  - "After GREEN, reused makeCloseoutHostNoteFrontmatter and added shared closeout runner/environment helpers to reduce fixture duplication."
  - "All focused tests were rerun after refactoring; production behavior remained green."
code_changes:
  - path: "packages/workflow-bundle/scripts/workflow-gate-review.js"
    change: "Import getRequiredFinalizedGateKeys and replace the legacy explicit-key filter with canonical s08 resolution filtered to terminal gates."
  - path: "packages/workflow-bundle/test/work-item-protocol.test.js"
    change: "Add true legacy shapes, core/optional selection, authority, state reconciliation, idempotent retry, and eight-point atomic rollback coverage."
doc_changes:
  - "This s07 implementation and review evidence artifact."
config_changes: []
review_checkpoints:
  - "B1 Spec Compliance APPROVED_BY_QC at 2026-09-04T09:44:27Z."
  - "B2 Code Quality APPROVED_BY_DEVELOPER_AND_QC at 2026-09-04T10:19:43Z."
outputs_actual:
  - "Production diff: 7 additions and 1 deletion in workflow-gate-review.js."
  - "All workflow validators and 44 workflow-bundle unit test files pass."
  - "Pack audit, source install/update smoke, exact candidate install smoke, and exact v2.6.1 rollback smoke pass."
  - "Syntax, git diff whitespace, unchanged Guardrails workflow, and UTF-8 checks for 14 changed text files pass."
  - "Candidate workflow-gate-review.js SHA-256 equals the source file SHA-256."
  - "No transaction coordinator, dependency, schema, config, adaptive, or readiness production edit."
known_limitations:
  - "Hosted Node 18/22 evidence for the exact candidate remains s08 work."
  - "ESLint is not configured and Semgrep is unavailable; these scan gaps remain explicit."
  - "F-AG08-001 and parent terminal gates remain open until child s08 and repeated parent approvals."
follow_up_items:
  - "OBS-CLD-001 remains a separate out-of-scope work-item approval atomicity follow-up."
notes_for_testing: "Open s08 only after QC approval; use candidate SHA-256 b2d9ba416e54ec2cd1517a98f1a9b05e010c519a1721651534caf42b44f3b83e and retain v2.6.1 rollback SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "testLegacyMaintenanceCloseoutRestoresImplicitDod"
  - "testLegacyProductReleaseCloseoutRestoresImplicitDod"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/cr-008-adaptive-governance"
  - "branch codex/adaptive-governance-human-approval-ux at baseline 18a07bc9b422ee0ef1370ea9885a0f56985f9538"
worktree_reason: "Planning track full, multi-session CR-008 history, open parent finding, and release/merge risk require isolation."
review_status: COMPLETED
review_refs:
  - "B1 Spec Compliance APPROVED_BY_QC at 2026-09-04T09:44:27Z"
  - "B2 Code Quality APPROVED_BY_DEVELOPER_AND_QC at 2026-09-04T10:19:43Z"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs:
  - "T1-T3 share one fixture and selector boundary; delegation would create ownership overlap."
merge_path: "Remain on the current worktree branch; no merge or cleanup before s08 DoD and parent finding closure."
verify_path:
  - "node packages/workflow-bundle/test/work-item-protocol.test.js"
  - "node packages/workflow-bundle/test/workflow-gate-review.test.js"
  - "node --check for both changed JavaScript files"
  - "T5 full repository/package checks after B1/B2"
```

## Implementation Notes

### Worktree Discipline
```yaml
worktree_target: "CR-008 linked defect implementation"
planning_track: full
risk_signals:
  - "Work spans multiple sessions inside an existing CR branch."
  - "Parent F-AG08-001 blocks release and branch finalization."
  - "A faulty closeout change could weaken terminal human authority."
worktree_decision: REQUIRED
decision_reason:
  - "The existing in-repo worktree already isolates the approved branch and release-risk scope."
  - "Reusing it avoids a second overlapping worktree for the same parent finding."
isolation_strategy:
  branch_name: "codex/adaptive-governance-human-approval-ux"
  worktree_path: ".claude/worktrees/cr-008-adaptive-governance"
  owned_paths:
    - "packages/workflow-bundle/scripts/workflow-gate-review.js"
    - "packages/workflow-bundle/test/work-item-protocol.test.js"
    - "work-items/closeout-bundle-legacy-dod-compatibility"
  expected_duration: "Through child s08 and parent F-AG08-001 re-verification"
execution_guards:
  - "Preserve unrelated parent and user changes."
  - "Do not edit frozen s04/s05/s06 after trusted receipts."
  - "Do not publish, merge, or clean before DoD."
skip_reason: ""
cleanup_preconditions:
  - "Child s08 Technical Verification and DoD pass."
  - "Exact candidate terminal gates pass and parent F-AG08-001 closes."
  - "Branch/worktree scope is committed and no open finding remains."
notes_for_implementation: "Continue only in the current in-repo worktree; branch finalization belongs after verify."
```

### Review Discipline
```yaml
review_target: "Legacy closeout selector and true-legacy CLI regression batch"
planning_track: full
review_mode: INDEPENDENT
review_order:
  - SPEC_COMPLIANCE
  - CODE_QUALITY
review_batches:
  - batch: "B1 Spec Compliance"
    scope:
      - "AC-CLD-01..06 and EDGE-CLD-01/02"
      - "Approved Option A and explicit scope exclusions"
    trigger: "T0-T3 focused suites and syntax checks pass"
    reviewer_role: "qc"
  - batch: "B2 Code Quality"
    scope:
      - "Canonical ownership, legacy/adaptive branch separation, fixture realism, failure cleanup, retry, and maintainability"
    trigger: "B1 has an explicit PASS or approved exception"
    reviewer_role: "developer/qc"
required_checks:
  spec_compliance:
    - "Exact maintenance/product/optional gate sets and reviewer authority"
    - "Atomic failure and retry semantics"
    - "No adaptive/readiness/receipt/schema/transaction drift"
  code_quality:
    - "Minimal production delta and no duplicated authority rule"
    - "Tests exercise real CLI and raw legacy shape without leaking fixture secrets"
    - "Cleanup is deterministic and no unrelated file changed"
finding_policy:
  blocker_threshold: "Any spec drift, authority omission, partial-state risk, high-severity defect, or unapproved production boundary blocks T5 and s08."
  reopen_conditions:
    - "Production needs transaction/schema/signing changes"
    - "A required legacy or adaptive scenario fails"
handoff_to_verify:
  - "B1 and B2 PASS evidence"
  - "TDD RED/GREEN evidence and focused command outputs"
  - "T5 full regression and exact candidate digest"
notes_for_implementation_or_verify: "Do not begin B2 before explicit B1 approval; do not treat local tests as DoD."
```

## B1 Spec Compliance Review
```yaml
status: APPROVED_BY_QC
reviewer_role: "qc"
reviewed_by: "qc"
reviewed_at: "2026-09-04T09:44:27Z"
verdict: PASS
scope:
  - "packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "packages/workflow-bundle/test/work-item-protocol.test.js"
checks:
  - criterion: "AC-CLD-01 and EDGE-CLD-01"
    result: PASS
    evidence: "A legacy host with the whole approval_gates block absent seals exactly [dod]."
  - criterion: "AC-CLD-02 and EDGE-CLD-02"
    result: PASS
    evidence: "Product seals [dod, release, business_acceptance]; one-optional cases seal [dod, configured gate] only."
  - criterion: "AC-CLD-03"
    result: PASS
    evidence: "Real CLI emits independent QC/DevOps/PO receipts and reconciles report/s01/actions/audit as one COMMITTED transaction."
  - criterion: "AC-CLD-04"
    result: PASS
    evidence: "All eight exported failure points leave zero terminal receipt and byte-identical report/s01 with no transaction residue."
  - criterion: "AC-CLD-05"
    result: PASS
    evidence: "Existing adaptive closeout, readiness, receipt-v1, transaction, and dirty-delivery cases remain green."
  - criterion: "AC-CLD-06"
    result: PASS
    evidence: "An unchanged product closeout retry returns NOOP and leaves report/s01 byte-identical."
  - criterion: "Approved Approach and scope"
    result: PASS
    evidence: "Only the legacy branch calls getRequiredFinalizedGateKeys; transaction, adaptive, readiness, schema, signer, and parent artifacts are unchanged."
governance_drift: NONE
spec_drift: NONE
findings: []
next_action: "Run B2 Code Quality review, then obtain explicit Developer and QC approval before T5."
```

## Scan Summary
```yaml
scan_target: "Pre-handoff B2 review of the legacy closeout selector and its regression fixtures"
scan_scope:
  mode: DIFF_ONLY
  changed_files:
    - "packages/workflow-bundle/scripts/workflow-gate-review.js"
    - "packages/workflow-bundle/test/work-item-protocol.test.js"
  affected_modules:
    - "workflow-gate-review legacy closeout selection"
    - "work-item protocol closeout regression fixtures"
language_stack:
  - "JavaScript"
  - "Node.js >=18 CommonJS"
available_scan_tools:
  - "Node.js parser v26.5.0"
  - "focused repository test scripts"
  - "git diff --check"
  - "ripgrep 15.2.0"
false_positive_policy: "Diff-aware and evidence-based; dismiss only with a recorded reason."
scan_plan:
  syntax:
    - "Run node --check on both changed JavaScript files."
  static_analysis:
    - "Check for a configured ESLint wrapper, then review the exact semantic delta and run focused suites."
  security:
    - "Check for Semgrep, inspect only added lines for execution, environment, file-write, parsing, and approval-authority risks."
  performance_heuristic:
    - "Review gate traversal, fixture recursion, transaction-matrix bounds, allocation, and I/O patterns."
syntax_scan_results:
  - command: "node --check packages/workflow-bundle/scripts/workflow-gate-review.js && node --check packages/workflow-bundle/test/work-item-protocol.test.js"
    scope:
      - "both changed JavaScript files"
    status: PASS
    evidence: "Both files parsed with exit code 0."
    blocker_files: []
static_analysis_results:
  - command: "command -v eslint; inspect package scripts and ESLint config"
    config_used: "none available"
    scope:
      - "affected workflow-bundle package"
    status: SKIP
    findings: []
    new_blockers: []
  - command: "node packages/workflow-bundle/test/work-item-protocol.test.js; node packages/workflow-bundle/test/workflow-gate-review.test.js; git diff --check"
    config_used: "repository test harness and Git whitespace validation"
    scope:
      - "legacy and adaptive closeout behavior"
      - "approval transaction behavior"
      - "exact changed-file diff"
    status: PASS
    findings: []
    new_blockers: []
security_scan_results:
  - command_or_check: "Semgrep availability check plus ripgrep-assisted and manual diff review"
    scope:
      - "added production selector lines"
      - "added fixture environment, file cleanup, parsing, and failure-injection lines"
    status: PASS
    findings: []
    evidence: "No new command construction, external input, secret persistence, path authority, signer, receipt, or role-authority path was introduced; transaction-fail-at remains fixture-gated in unchanged production code."
performance_heuristic_results:
  - check: "Review new iteration, recursion, allocation, and I/O patterns"
    scope:
      - "canonical terminal-gate filter"
      - "test-only recursive cleanup inspection and eight-point failure matrix"
    status: PASS
    expected_impact: LOW
    confidence: HIGH
    trigger_condition: "Production filters a fixed gate catalog; added recursion and repeated CLI I/O run only in bounded temporary test fixtures."
    evidence: "Production adds one fixed-size resolver/filter operation and no hot-path I/O, serialization, query, network, or cache behavior."
skipped_scans:
  - "ESLint: no project wrapper, dependency, or config is present."
  - "Semgrep: executable is unavailable; no dependency installation was authorized for this review."
overall_status: PARTIAL
remediation_actions: []
notes_for_verify: "This is s07 pre-handoff evidence, not the formal s08 scan verdict. Preserve the two explicit tool gaps in T5/s08 and run the approved full candidate matrix before DoD."
```

## B2 Code Quality Review
```yaml
status: APPROVED_BY_DEVELOPER_AND_QC
reviewer_roles:
  - "developer"
  - "qc"
assessed_at: "2026-09-04T09:46:56Z"
reviewed_by:
  - "developer"
  - "qc"
reviewed_at: "2026-09-04T10:19:43Z"
verdict: PASS
scope:
  - "Canonical ownership and legacy/adaptive branch separation"
  - "True-legacy fixture realism, atomic failure cleanup, retry, security, and maintainability"
checks:
  - criterion: "Minimal and canonical production delta"
    result: PASS
    evidence: "The production diff is 7 additions/1 deletion: one existing resolver import and one legacy-only selector replacement; authority rules are not duplicated."
  - criterion: "Adaptive and readiness separation"
    result: PASS
    evidence: "Both early-return branches are byte-unchanged and both focused suites pass."
  - criterion: "Fixture realism and reviewer authority"
    result: PASS
    evidence: "Raw legacy reports omit adaptive fields; s08 omits DoD applicability; the real CLI produces independent QC/DevOps/PO receipts."
  - criterion: "Atomic cleanup and idempotency"
    result: PASS
    evidence: "All eight exported failure points leave no terminal receipt, derived-state mutation, journal, lock, stage, or backup residue; unchanged retry is NOOP."
  - criterion: "Security and secret handling"
    result: PASS
    evidence: "No production input/execution/signing surface changed; fixture passphrase remains process-local and all temporary roots are removed in finally blocks."
  - criterion: "Performance and maintainability"
    result: PASS
    evidence: "Production work is fixed-size; shared fixture helpers avoid repeated setup; test-only recursive inspection is bounded by a temporary approval root."
automated_scan_status: PARTIAL
automated_scan_gaps:
  - "No configured ESLint wrapper or config."
  - "Semgrep is not installed."
findings: []
governance_drift: NONE
spec_drift: NONE
rationale: "The explicit tool gaps reduce automated scan coverage but reveal no implementation defect; focused semantic, security, and failure-path evidence is sufficient to propose B2 PASS for human review."
next_action: "Run T5 full regression and prepare one immutable v2.6.2 candidate for s08 handoff."
```

## T5 Verification Handoff
```yaml
verification_target: "Pre-s08 verification of the corrected legacy closeout source and one immutable v2.6.2 package candidate"
risk_ranked_test_matrix:
  - risk: "Mandatory legacy DoD is still omitted."
    severity: HIGH
    required_evidence:
      - "True legacy maintenance and product CLI fixtures with exact ordered gate sets"
      - "Independent reviewer-bound receipt assertions"
  - risk: "A multi-gate closeout leaves partial trusted or derived state."
    severity: HIGH
    required_evidence:
      - "All eight exported transaction failure boundaries"
      - "Byte-identical report/s01 state and zero transaction residue"
  - risk: "Adaptive, readiness, receipt-v1, or transaction behavior regresses."
    severity: HIGH
    required_evidence:
      - "Full 44-file unit/regression suite"
      - "Workflow validators and package smoke"
  - risk: "The tested source and distributed package differ."
    severity: HIGH
    required_evidence:
      - "One candidate SHA-256"
      - "Source/candidate workflow-gate-review.js digest equality"
      - "Exact installed-artifact smoke"
  - risk: "Rollback installs the wrong or unsafe artifact."
    severity: HIGH
    required_evidence:
      - "Retained immutable v2.6.1 digest"
      - "Codex/Claude global/project rollback transition smoke"
test_strategy:
  unit_test:
    required: true
    rationale: "The canonical resolver, authority, transaction, receipt, and protocol helpers have direct regression coverage."
  integration_test:
    required: true
    rationale: "The defect occurs through the real closeout CLI, filesystem receipts, and protocol reconciliation path."
  database_test:
    required: false
    rationale: "No database, query, migration, or persistence engine is in scope."
  feature_test:
    required: true
    rationale: "Package install/update and rollback must be proven through complete CLI flows."
negative_cases:
  - "Whole approval_gates block missing"
  - "Only approval_gates.dod missing"
  - "Only Release or only Business Acceptance configured"
  - "All eight transaction failure boundaries"
  - "Repeated unchanged successful closeout"
  - "Adaptive report with its own explicit gate array"
regression_targets:
  - "Adaptive closeout and readiness bundle selection"
  - "Receipt schema v1 and signer authority"
  - "Protocol reconciliation, failure recovery, locking, and uncommitted-delivery guard"
  - "Codex/Claude global/project install and update"
manual_exploration:
  flows_checked:
    - "Reviewed the exact production/test diff and verified .github/workflows/workflow-guardrails.yml is unchanged."
    - "Compared source and tarball workflow-gate-review.js SHA-256; both equal e547e6efce9e040d00d4615f91c30abb05c6b337ca38c241c335c95eaab34305."
    - "Reviewed the workflow-pack semantic checklist for script, schema, template, runtime, and documentation drift."
  issues_found:
    - "Initial npm pack hit a root-owned default cache; rerun with an isolated /private/tmp cache succeeded and the failed attempt produced no candidate."
criteria_results:
  - criterion: "AC-CLD-01..06"
    result: PASS
    evidence: "Focused CLI regression and full unit suites prove exact gate sets, authority, atomicity, compatibility, and idempotency."
  - criterion: "AC-CLD-07"
    result: PARTIAL
    evidence: "Local source, package, clean install/update, and exact v2.6.1 rollback pass for candidate b2d9ba416e54ec2cd1517a98f1a9b05e010c519a1721651534caf42b44f3b83e; hosted Node 18/22 remains for s08."
  - criterion: "AC-CLD-08"
    result: PARTIAL
    evidence: "Parent F-AG08-001 remains open as required; child s08 and repeated parent terminal approvals have not been inferred."
test_evidence:
  unit_test:
    - "npm run validate:workflow:unit -> PASS, 44 test files"
  integration_test:
    - "work-item-protocol.test.js -> PASS including true-legacy success, retry, optional gates, and eight failure points"
    - "workflow-gate-review.test.js -> PASS with unchanged transaction/recovery/locking evidence"
  database_test: []
  feature_test:
    - "npm run validate:workflow:bundle-smoke -> PASS"
    - "release-candidate-artifact-smoke.test.js exact artifact mode -> PASS, four install/update scenarios"
    - "release-rollback-smoke.test.js exact artifact mode -> PASS, four rollback scenarios"
commands_run:
  - "npm run validate:workflow:fixtures"
  - "npm run validate:workflow -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:sdd -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:change -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:execution -- --workflow-root work-items"
  - "npm run validate:workflow:planning -- --workflow-root work-items"
  - "npm run validate:workflow:authoring-smoke"
  - "npm run validate:workflow:unit"
  - "npm run validate:workflow:pack-audit"
  - "npm run validate:workflow:bundle-smoke"
  - "npm pack once with an isolated cache, followed by exact candidate and rollback smoke"
  - "node --check for both changed JavaScript files; git diff --check; UTF-8 check for 14 changed text files"
skipped_checks:
  - "Hosted Node 18/22 Guardrails matrix: intentionally handed to s08 because the candidate source is not yet committed/pushed."
  - "ESLint: no repository wrapper, dependency, or configuration exists."
  - "Semgrep: executable is unavailable; manual diff-aware security review is recorded in Scan Summary."
release_blockers:
  - "Hosted Node 18/22 must pass for the exact corrected candidate before child DoD."
  - "Child Technical Verification/DoD and repeated parent Release/Business Acceptance remain human-controlled."
status: PARTIAL
gaps:
  - "Hosted run identity and Node 18/22 results"
  - "s08 Technical Verification and DoD"
residual_risks:
  - "A hosted environment difference may still fail despite complete local evidence."
recommendation: "Approve opening s08 with QC, preserve the exact candidate digest, and run the hosted matrix before any DoD or release conclusion."
notes_for_review: "Local T5 is complete and sufficient for s07 handoff; PARTIAL reflects deliberately pending s08/parent gates, not a local test failure."
```

## Workflow Pack Audit
```yaml
audit_scope: "Full workflow pack mechanical audit plus semantic review of the changed closeout selector and package boundary"
checks:
  - id: "MECHANICAL_PACK_AUDIT"
    status: PASS
    evidence: "validate:workflow:pack-audit reports WORKFLOW_PACK_AUDIT=PASS, 42 unique skills, 170 resolved flat-layout references, and synchronized hard-rule headings."
  - id: "SCRIPT_BOUNDARY"
    status: PASS
    evidence: "Only the legacy closeout selector changes production; no skill, workflow-chain, template, schema, manifest, adapter, or runtime-layout contract changed."
  - id: "RUNTIME_AND_PACKAGE_PARITY"
    status: PASS
    evidence: "Runtime parity passes in the full unit suite, package smoke passes, and candidate/source script digests match."
  - id: "README_AND_PUBLIC_CONTRACT"
    status: PASS
    evidence: "No new command, gate, schema, role, or installation behavior was introduced, so existing documentation remains accurate."
findings: []
overall_status: PASS
follow_up_actions:
  - "Run the unchanged hosted Node 18/22 exact-candidate workflow in s08."
notes: "Legacy CHANGE-* deprecation warnings are pre-existing migration notices and are outside this linked defect."
```

## Audit
```yaml
step: "s07 Implement"
status: PASS
checks:
  - criterion: "Bug reproduction and TDD"
    result: PASS
    evidence: "Two expected true-legacy failures were recorded before the production edit and now pass."
  - criterion: "Smallest approved production delta"
    result: PASS
    evidence: "One import and one legacy selector replacement; no other production module changed."
  - criterion: "Worktree and delegation discipline"
    result: PASS
    evidence: "Required worktree is used; tightly coupled work remains agentic without subagents."
  - criterion: "Early review"
    result: PASS
    evidence: "B1 passed first with QC approval; B2 then passed with explicit Developer and QC approval."
  - criterion: "Full regression and candidate handoff"
    result: PASS
    evidence: "All local T5 validators, 44 unit files, pack audit, bundle smoke, exact candidate/rollback, syntax, diff, workflow-unchanged, and UTF-8 checks pass; hosted work is explicitly handed to s08."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "No fixed step timebox was declared; evidence was completed in the approved session."
gaps: []
risk_level: MEDIUM
next_action: "Obtain QC approval to open s08 Verify + DoD for the exact candidate."
```

## Traceability
```yaml
upstream:
  - "closeout-bundle-legacy-dod-compatibility.s04.acceptance-criteria.md"
  - "closeout-bundle-legacy-dod-compatibility.s05.technical-approach.md"
  - "closeout-bundle-legacy-dod-compatibility.s06.task-breakdown.md"
task_status:
  T0: COMPLETE
  T1: COMPLETE
  T2: COMPLETE
  T3: COMPLETE
  T4: COMPLETE
  T5: COMPLETE
next_step: "Request QC approval to open s08; do not infer Technical Verification or DoD."
```

## Handoff

- Outputs actual: focused selector correction, complete local regression, and immutable candidate/rollback evidence.
- Completed reviews: B1 and B2 passed in the required order with the required human roles.
- Candidate: `workflow-bundle-2.6.2.tgz`, SHA-256 `b2d9ba416e54ec2cd1517a98f1a9b05e010c519a1721651534caf42b44f3b83e`.
- Current gate: QC approval to open s08 Verify + DoD; no Technical Verification or DoD verdict is inferred.
- Known limitations: hosted Node 18/22, child terminal gates, parent closure, Release, and Business Acceptance remain pending.
