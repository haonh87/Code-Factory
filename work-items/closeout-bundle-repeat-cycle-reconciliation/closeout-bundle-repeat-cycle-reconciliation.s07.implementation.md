---
artifact_id: "closeout-bundle-repeat-cycle-reconciliation.s07.implementation"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-repeat-cycle-reconciliation"
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
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "changes/CR-008/spec-delta/srs.delta.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["ba", "developer", "qc", "devops", "po"]
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
  spec_reviewed_at: "2026-09-10T03:09:26Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["ba", "qc"]
  dor_reviewed_at: "2026-09-10T03:09:26Z"
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-09-10T08:12:02Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-09-10T08:56:19Z"
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
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "closeout-bundle-repeat-cycle-reconciliation.s06.task-breakdown.md"
linked_artifacts:
  - "closeout-bundle-repeat-cycle-reconciliation.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s07.implementation.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../packages/workflow-bundle/scripts/work-item-protocol.js"
  - "../../packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "../../packages/workflow-bundle/scripts/workflow-approval-transaction.js"
  - "../../packages/workflow-bundle/test/work-item-protocol.test.js"
  - "../../packages/workflow-bundle/test/workflow-gate-review.test.js"
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> The Developer Task Plan receipt was sealed at `2026-09-10T10:11:42.373Z` and matches
> finalized s06 SHA-256 `7fbb8b9d55027293cd806f51edfdad6d339406718edff42b24e24eae7cb0d3d9`.
> The work item was explicitly activated at `2026-09-10T10:13:59.704Z`. T0 records a clean
> pre-production source baseline at `edc9454d38126d51ad9e5a85afc475d2915ac9bd`; both focused
> baseline suites pass. T1 produced the expected four-assertion RED, and T2 is GREEN: the coordinator
> now validates and reuses an optional canonical UUID while omitted callers retain generated IDs.
> T3 produced the expected three-assertion RED, and T4 is GREEN at source
> `a65704aa0be26f99988d6d5c13f632fc76907ddd`: marker-only history, a later cycle with
> an older event, deterministic gate order, shared transaction attribution, and two byte-stable
> retries all pass. Human QC approved B1 Spec Compliance at `2026-09-10T11:27:32Z`.
> Human Developer and QC approved B1 Code Quality at `2026-09-10T11:38:58Z` with no findings.
> B1 is complete in the required order. T5 then produced the expected three-assertion RED at
> `6e16006`, and T6 is GREEN at source `9ac8d95d29b0edd9681cfb1320eb848170bd14ca`:
> selected-gate pending state is removed, the exact close action and `protocol-close` handoff are
> projected, unrelated blockers and ordered history are preserved, and both focused suites pass.
> B2 later failed on the `uat`/`situation` alias collision, then T6a recorded an expected RED and
> the bounded-alias GREEN source `f9533c4de66fdb04e75008382b39b4fc413e3caa`. Human QC approved
> refreshed Spec Compliance, followed by Human Developer/QC approval of refreshed Code Quality;
> `F-RCR-B2-001` is resolved. T7 began and its focused 20-cycle fixture passed, but the owner then
> expanded scope to a persisted structured-state contract. Those patch reviews remain historical.
> Current structural execution resumed at s07/ACTIVE on 2026-09-12T06:06:04.440Z with sixteen
> explicitly approved roots and five digest-matched authoring receipts. The existing partial T7
> test remains quarantined until TS7. The structural execution contract below supersedes the
> earlier patch execution contract; new RCR-SB1/2/3 reviews remain independent.
> TS0..TS2 are ready for batch-level Spec Compliance review at source
> `964e1c7cf879c6d244253b3ee294f9cdaff60f77`. The protocol is BLOCKED on the RCR-SB1 pair.
> Full regression is not GREEN: three existing protocol assertions await TS3/TS4 conversion.

## Step Contract
```yaml
step: "s07 Implement"
goal: >-
  Implement the approved repeat-cycle reconciliation through three fail-first behavior batches,
  with independent Spec Compliance before Code Quality review at each batch boundary.
value: >-
  Make every committed closeout cycle attributable and canonical while unchanged retries remain
  byte-stable NOOPs and human approval authority remains unchanged.
scope_in:
  - "T0 receipt/source/worktree baseline"
  - "T1-T4 transaction identity and cycle classification"
  - "T5-T6 canonical report/s01 projection"
  - "T7 atomicity, concurrency, retry, compatibility, and regression matrix"
  - "B1-B3 independent two-tier reviews and T8 exact-candidate handoff"
scope_out:
  - "Public CLI, receipt-v1, schema, authority, gate applicability, or lifecycle redesign"
  - "Publication, tag, merge, install, cleanup, or branch/worktree finalization"
inputs_required:
  - "Digest-matched Spec, DoR, Approach, and Task Plan receipts"
  - "ACTIVE s07 protocol with seven bounded write roots"
  - "Approved s06 T0-T8 order and verification path"
outputs_required:
  - "RED/GREEN evidence, minimum source delta, early reviews, and exact-candidate handoff"
done_when:
  - "T0-T8 implementation evidence is recorded"
  - "B1-B3 each pass Spec Compliance before Code Quality"
  - "No unresolved HIGH finding remains before the s08 handoff"
constraints:
  - "No production behavior change before its expected failing test"
  - "One validated transaction identity is shared by event, journal, and result"
  - "Historical receipts and events remain immutable"
  - "No done, release, merge, tag, publication, install, or cleanup claim in s07"
owner: "developer"
```

## Main Artifact
```yaml
recommended_design: "Project the current closeout transaction delta and reuse its validated identity; never use global event history as cycle identity."
implementation_mode: BUGFIX
tasks_completed:
  - "T0: verified every authoring receipt, activated s07, inventoried the worktree, and ran both focused baselines"
  - "T1 RED: four assertions proved supplied-ID reuse and malformed-ID fail-before-write behavior were absent"
  - "T2 GREEN: added optional canonical UUID validation/reuse and preserved generated-ID defaults"
  - "T3 RED: three assertions proved later-cycle event creation and first/later transaction attribution were absent"
  - "T4 GREEN: classified receipt/pre-event state delta before event construction and bound one event to the shared transaction ID"
  - "T5 RED: three assertions proved semantic pending-state cleanup, canonical protocol-close handoff, and blocker filtering were absent"
  - "T6 GREEN: projected exact close-ready current state while preserving unrelated blockers, history prefixes, and report/s01 parity"
tasks_next:
  - "Resolve OQ-RCR-004..006 with the assigned BA, Developer, and QC roles."
  - "Draft and reapprove amended Spec, Contract, DoR, Approach, and Task Plan before replacing T7."
bug_repro_evidence:
  - behavior: "A later successful closeout is suppressed when historical CLOSEOUT_BUNDLE_APPROVED evidence exists."
    observed: "reconcileApprovalBundleReport uses report.audit_events.includes(auditEvent) as a global eventAlreadyRecorded condition."
  - behavior: "A successful closeout can retain stale action prose and its pre-closeout handoff."
    observed: "Reconciliation removes only literal command-shaped text and assigns a new handoff only for readiness."
hypothesis_log:
  - assumption: "Global historical-event presence is incorrectly used as current-cycle identity."
    status: CONFIRMED
    evidence: "work-item-protocol.js suppresses protocol-event creation whenever the marker exists anywhere in audit history."
  - assumption: "The coordinator currently cannot bind a preallocated cycle ID to its journal/result."
    status: CONFIRMED
    evidence: "executeApprovalTransaction always allocates crypto.randomUUID() internally."
  - assumption: "The existing atomic transaction mechanism must be replaced."
    status: REJECTED
    evidence: "The focused transaction and protocol baseline suites pass; the approved approach extends the existing coordinator."
debug_experiments:
  - goal: "Verify governance and write authority before source edits."
    action: "Checked four digest-matched gate receipts and activated the work item with the seven approved write roots."
    result: "protocol_status=ACTIVE, current_step=s07, handoff_target=step-s07-owner."
  - goal: "Freeze the pre-change behavior baseline."
    action: "Ran work-item-protocol.test.js and workflow-gate-review.test.js at source edc9454d38126d51ad9e5a85afc475d2915ac9bd."
    result: "Both suites PASS before production edits."
  - goal: "Separate a real current cycle from historical marker/event evidence."
    action: "Ran the real closeout CLI for marker-only history, a later re-verified host, then two unchanged retries."
    result: "Two committed cycles have distinct matching journal/event IDs; both retries are NOOP and report/s01 remain byte-identical."
  - goal: "Bound semantic cleanup to selected terminal approval meaning."
    action: "Mixed literal/case/whitespace bundle commands, individual gate prose, an unrelated blocker, divergent s01 input, and audit/event digest canaries in one real closeout fixture."
    result: "Before T6 exactly three projection assertions failed; after T6 every assertion and both focused suites pass."
  - goal: "Challenge the selected-gate blocker predicate with an unrelated word containing a short gate alias."
    action: "Called reconcileApprovalBundleReport in memory for gate uat with one unrelated blocker: 'Security approval remains pending because the situation is unresolved.'"
    result: "FAIL: blocker count changed from 1 to 0 because 'situation' contains the substring 'uat'."
tdd_evidence:
  - behavior: "A caller-supplied valid transaction_id is reused by the journal and COMMITTED result."
    failing_test: "workflow-gate-review.test.js failed: valid caller-supplied transaction_id was not reused."
    passing_test: "The same assertion passes after the optional identity input was added."
  - behavior: "Malformed supplied identity fails before target, journal, lock, or directory writes."
    failing_test: "Three assertions failed because malformed identity was ignored and the transaction committed writes."
    passing_test: "Malformed identity now throws a canonical UUID error before transaction-path creation; every no-write assertion passes."
  - behavior: "Historical CLOSEOUT_BUNDLE_APPROVED evidence does not suppress the current committed-cycle event."
    failing_test: "work-item-protocol.test.js failed event-count plus first/later transaction-attribution assertions."
    passing_test: "Marker-only and older-event histories now each receive exactly one current event with matching journal ID and ordered gates."
  - behavior: "A fully reconciled retry is not a cycle."
    failing_test: "The RED fixture retained existing NOOP behavior as a guard while event attribution failed."
    passing_test: "Two unchanged retries return NOOP with no transaction_id and byte-identical report/s01."
  - behavior: "Approved closeout exposes one canonical current state without rewriting unrelated or historical evidence."
    failing_test: "Commit 6e16006 records exactly three failures: stale semantic actions, stale closeout-review handoff, and selected-gate blockers survive."
    passing_test: "At source 9ac8d95d29b0edd9681cfb1320eb848170bd14ca the exact close command, protocol-close handoff, unrelated blocker canary, history digests, appended event, and s01 parity all pass."
code_changes:
  - path: "packages/workflow-bundle/scripts/workflow-approval-transaction.js"
    change: "Validate an optional canonical UUID before transaction recovery/preflight writes and reuse it for the existing lock, journal, stage, and result identity."
  - path: "packages/workflow-bundle/test/workflow-gate-review.test.js"
    change: "Add fail-first valid/invalid supplied-ID cases and pin the existing generated-ID default."
  - path: "packages/workflow-bundle/scripts/workflow-gate-review.js"
    change: "Classify closeout from receipt or pre-event report/s01 operations, allocate one identity only for a real cycle, then construct the final event operation."
  - path: "packages/workflow-bundle/scripts/work-item-protocol.js"
    change: "Allow explicit event sequencing, include shared transaction_id in the existing event note, and canonicalize approved-closeout actions, handoff, and selected-gate blockers without changing event shape."
  - path: "packages/workflow-bundle/test/work-item-protocol.test.js"
    change: "Add real marker-only, older-event, second-host, exact event-attribution, marker-dedup, two-retry, semantic-variant, unrelated-blocker, history-digest, and report/s01-parity fixtures."
doc_changes:
  - "Recorded the s07 activation and T0 baseline in child and parent workflow evidence."
config_changes: []
review_checkpoints:
  - "B1 Spec Compliance: APPROVED_BY_QC at 2026-09-10T11:27:32Z"
  - "B1 Code Quality: APPROVED_BY_DEVELOPER_AND_QC at 2026-09-10T11:38:58Z"
  - "B2 historical pass was reopened after F-RCR-B2-001."
  - "Refreshed B2 Spec Compliance: APPROVED_BY_QC for f9533c4de66fdb04e75008382b39b4fc413e3caa."
  - "Refreshed B2 Code Quality: APPROVED_BY_DEVELOPER_AND_QC; F-RCR-B2-001 RESOLVED."
  - "B3 is withdrawn pending the replacement structured-state plan and reviews."
known_limitations:
  - "The bounded-alias patch resolves the observed collision but leaves prose as machine state; the owner rejected further patching in favor of a structural contract."
  - "Legacy adapter semantics, structured entry identity, and transaction-backed event identity remain open."
  - "The uncommitted 20-cycle fixture still reads identity from note and is not a valid baseline for the proposed contract."
  - "F-AG11-001 keeps parent verification, release, protocol close, and branch finalization blocked."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: PARTIAL
tdd_test_refs:
  - "testOptionalTransactionIdentityIsValidatedAndReused"
  - "testAtomicCommitAndIndependentReceipts generated-ID compatibility assertion"
  - "testRepeatedCloseoutCyclesHaveTransactionAttributedEventsAndNoopRetry"
  - "testApprovedCloseoutCanonicalizesSemanticStateWithoutHistoryLoss"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/cr-008-adaptive-governance"
  - "branch codex/adaptive-governance-human-approval-ux at pre-production source edc9454d38126d51ad9e5a85afc475d2915ac9bd"
worktree_reason: "Full planning, multi-session parent history, open HIGH finding, and release/merge risk require the existing isolated worktree."
review_status: PARTIAL
review_refs:
  - "B1 Spec Compliance APPROVED_BY_QC at 2026-09-10T11:27:32Z for source a65704aa0be26f99988d6d5c13f632fc76907ddd."
  - "B1 Code Quality opened only after the Spec Compliance decision was recorded."
  - "B1 Code Quality APPROVED_BY_DEVELOPER_AND_QC at 2026-09-10T11:38:58Z for source a65704aa0be26f99988d6d5c13f632fc76907ddd."
  - "B2 Spec Compliance APPROVED_BY_QC at 2026-09-11T03:20:17Z for source 9ac8d95d29b0edd9681cfb1320eb848170bd14ca."
  - "B2 Code Quality opened after Spec Compliance; F-RCR-B2-001 is proposed HIGH from a reproducible substring false positive."
spec_compliance_status: PASS_WITH_REOPEN_RECOMMENDED
code_quality_status: PARTIAL
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs:
  - "The transaction, projector, and shared fixtures are tightly coupled; s06 explicitly prohibits subagent delegation."
merge_path: "Remain on the current worktree branch; no merge or cleanup before child and parent s08 permit finalization."
verify_path:
  - "node packages/workflow-bundle/test/workflow-gate-review.test.js"
  - "node packages/workflow-bundle/test/work-item-protocol.test.js"
  - "T7 full workflow-bundle regression and validators"
  - "T8 exact local/hosted candidate plus parent AG-01..AG-13 re-verification"
```

## Implementation Notes

### Worktree Decision
```yaml
worktree_target: "CR-008 repeat-cycle reconciliation linked defect"
planning_track: full
risk_signals:
  - "Implementation spans an existing multi-session parent branch."
  - "Transaction semantics and terminal release evidence are affected."
  - "F-AG11-001 blocks release and branch finalization."
worktree_decision: REQUIRED
decision_reason:
  - "The in-repo CR-008 worktree already isolates the correct branch and parent evidence."
isolation_strategy:
  branch_name: "codex/adaptive-governance-human-approval-ux"
  worktree_path: ".claude/worktrees/cr-008-adaptive-governance"
  worktree_path_inside_repo: true
  owned_paths:
    - "packages/workflow-bundle/scripts/work-item-protocol.js"
    - "packages/workflow-bundle/scripts/workflow-gate-review.js"
    - "packages/workflow-bundle/scripts/workflow-approval-transaction.js"
    - "packages/workflow-bundle/test/work-item-protocol.test.js"
    - "packages/workflow-bundle/test/workflow-gate-review.test.js"
    - "work-items/closeout-bundle-repeat-cycle-reconciliation"
    - "work-items/adaptive-governance-human-approval-ux"
  expected_duration: "Through child s08 and corrected-candidate parent re-verification"
execution_guards:
  - "Preserve unrelated parent and user changes."
  - "Do not edit receipt-bound s04, s05, or s06."
  - "Do not merge, publish, tag, install, or clean before DoD and terminal decisions."
skip_reason: ""
cleanup_preconditions:
  - "Child DoD passes and F-AG11-001 closes on corrected evidence."
  - "Parent Technical Verification and DoD pass for the exact corrected candidate."
  - "Required Release and Business Acceptance decisions pass."
```

### Review Plan
```yaml
review_target: "Repeat-cycle transaction identity, classification, projection, and regression batches"
planning_track: full
review_mode: INDEPENDENT
review_order: ["SPEC_COMPLIANCE", "CODE_QUALITY"]
review_batches:
  - { batch: "B1", scope: ["T1", "T2", "T3", "T4"], trigger: "Cycle identity and event attribution GREEN", reviewer_role: "QC first; Developer and QC second" }
  - { batch: "B2", scope: ["T5", "T6"], trigger: "Canonical state projection GREEN", reviewer_role: "QC first; Developer and QC second" }
  - { batch: "B3", scope: ["T7"], trigger: "Atomicity, concurrency, and compatibility matrix complete", reviewer_role: "QC first; Developer and QC second" }
required_checks:
  spec_compliance:
    - "Match the locked acceptance criteria, approach, task scope, and public-boundary constraints."
    - "Reject unrecorded spec or governance drift."
  code_quality:
    - "Review correctness, readability, duplication, error handling, and smallest-delta discipline."
    - "Confirm focused tests, syntax checks, and diff checks pass without weakened assertions."
finding_policy:
  blocker_threshold: "Any HIGH finding, spec/governance drift, authority regression, atomicity risk, or failing required check blocks the next batch."
  reopen_conditions:
    - "A later code change touches a previously reviewed B1/B2 boundary."
    - "A new fixture disproves an approved review assumption."
handoff_to_verify:
  - "All B1-B3 two-tier reviews pass in order."
  - "s07 Delivery Rule Evidence is complete and T7 full regression is green."
notes_for_implementation_or_verify: "B2 Code Quality is human-approved FAIL, F-RCR-B2-001 is OPEN, QC reopened B2 Spec Compliance, and Developer approved T6a. Execute T6a with a fail-first fixture before the bounded production correction; T7 remains blocked until refreshed B2 reviews pass in order."
```

## B1 Review
```yaml
batch: B1
source_sha: "a65704aa0be26f99988d6d5c13f632fc76907ddd"
scope: ["T1", "T2", "T3", "T4"]
spec_compliance:
  status: APPROVED
  verdict: PASS
  reviewer_role: qc
  reviewed_by: qc
  reviewed_at: "2026-09-10T11:27:32Z"
  decision_source: "User explicitly approved B1 Spec Compliance with role QC."
  evidence:
    - "AC-RCR-01: first-cycle controls remain green; a changed host commits a later cycle; two unchanged retries are NOOP."
    - "AC-RCR-02: marker-only and older-event histories each append one current event; its note matches transaction_id and ordered gates; marker count stays one."
    - "AC-RCR-04 partial-to-B1 scope: two unchanged retries expose no transaction ID and keep report/s01 byte-identical."
    - "AC-RCR-06 B1 scope: malformed identity fails before targets or transaction directories; existing failure/recovery matrix remains green."
    - "EDGE-RCR-01/02/05: marker-only, older event, and changed exact host cases are explicit fixtures."
    - "No public CLI, receipt-v1, authority, gate-set, event-object, config, dependency, or lifecycle contract changed."
  checks:
    - "Expected RED commits c6cc787 and bf7b451 precede GREEN commits d80ae43 and a65704a."
    - "Both focused suites PASS and all three changed production files pass node --check."
  findings: []
code_quality:
  status: APPROVED
  verdict: PASS
  reviewed_by: ["developer", "qc"]
  reviewed_at: "2026-09-10T11:38:58Z"
  decision_source: "User explicitly approved B1 Code Quality with roles Developer and QC."
  prepared_at: "2026-09-10T11:32:30Z"
  evidence:
    - "Correctness: event construction follows receipt/pre-event delta classification; the event operation cannot classify itself as a new cycle."
    - "Atomicity: one validated canonical UUID is reused by lock, journal, staged filenames, result, and event note; the existing rollback/recovery coordinator remains intact."
    - "Compatibility: omitted transaction_id still generates the existing UUID-shaped result; readiness, rejection, first-cycle, adaptive, legacy, authority, and receipt-v1 tests remain green."
    - "Security: caller-supplied identity is validated before path creation or writes, preventing path/control-character injection into stage and backup filenames."
    - "Maintainability: the production delta is limited to 69 additions and 11 deletions across the three approved internal modules; no dependency, schema, config, or public command was added."
    - "Performance: classification performs at most one extra in-memory reconciliation/render comparison per closeout; unchanged retries avoid transaction persistence."
    - "Test integrity: RED commits precede GREEN commits, new assertions are additive, both focused suites pass, all changed production files pass node --check, and git diff --check passes."
  findings: []
  residual_notes:
    - "T5-T7 will separately review semantic projection plus the expanded failure/concurrency/full-compatibility matrix."
```

## B2 Review
```yaml
batch: B2
source_sha: "9ac8d95d29b0edd9681cfb1320eb848170bd14ca"
scope: ["T5", "T6"]
spec_compliance:
  status: REOPENED
  prior_verdict: PASS
  reviewer_role: qc
  reviewed_by: qc
  reviewed_at: "2026-09-11T03:20:17Z"
  decision_source: "User explicitly approved B2 Spec Compliance with role QC."
  reopened_by: qc
  reopened_at: "2026-09-11T03:46:13Z"
  reopen_source: "User explicitly approved reopening B2 Spec Compliance with role QC."
  reopen_reason: "F-RCR-B2-001 disproved the prior unrelated-blocker preservation evidence; the PASS remains historical for source 9ac8d95d29b0edd9681cfb1320eb848170bd14ca."
  prepared_at: "2026-09-11T03:08:45Z"
  evidence:
    - "AC-RCR-03: approved closeout leaves exactly one work-item close action, protocol-close handoff, zero selected-terminal pending blockers/actions, and a synchronized s01 projection."
    - "AC-RCR-05: prose, case, whitespace, bundle-command, and individual-gate variants are covered; unrelated blocker and ordered audit/protocol-event digest canaries remain unchanged."
    - "EDGE-RCR-03/04: alternate pending forms and initially divergent report/s01 state converge through one real atomic closeout command."
    - "TDD order is explicit: T5 RED commit 6e16006 precedes T6 GREEN commit 9ac8d95."
    - "The production delta is confined to the approved closeout projector in work-item-protocol.js; no public CLI, schema, receipt, authority, gate selection, dependency, or config changes."
    - "work-item-protocol.test.js and workflow-gate-review.test.js PASS; three production syntax checks and git diff --check PASS."
  findings: []
  post_review_status: "REOPENED; a refreshed Spec Compliance review is required after T6a GREEN."
code_quality:
  status: APPROVED
  verdict: FAIL
  reviewed_by: ["developer", "qc"]
  reviewed_at: "2026-09-11T03:46:13Z"
  decision_source: "User explicitly approved the B2 Code Quality FAIL verdict with roles Developer and QC."
  opened_at: "2026-09-11T03:20:17Z"
  evidence:
    - "Pure in-memory reproduction: gate uat plus unrelated blocker 'Security approval remains pending because the situation is unresolved.' changes blocker count from 1 to 0."
    - "Root cause: isSelectedCloseoutApprovalBlocker uses text.includes(alias); the short alias uat occurs inside situation, and dod can likewise occur inside unrelated words."
    - "Both focused suites still pass, demonstrating a missing negative-boundary fixture rather than invalidating their recorded results."
  findings:
    - id: "F-RCR-B2-001"
      severity: HIGH
      status: OPEN
      title: "Short gate aliases delete unrelated blockers by substring"
      criterion: "AC-RCR-05"
      impact: "A successful closeout can silently erase an unrelated pending blocker, weakening the canonical state and safety evidence."
      recommendation: "Use token/phrase-bounded alias matching, add fail-first uat/dod false-positive fixtures, and rerun B2 reviews."
```

## T6a Amendment
```yaml
amendment_id: T6a
status: APPROVED
trigger: "F-RCR-B2-001"
reviewed_by: developer
reviewed_at: "2026-09-11T03:46:13Z"
decision_source: "User explicitly approved Task Plan amendment T6a with role Developer."
scope:
  - "Add a RED fixture proving unrelated words containing uat/dod substrings survive reconciliation."
  - "Replace raw substring matching for short aliases with the smallest token/phrase-bounded predicate."
  - "Rerun both focused suites, syntax checks, diff checks, then repeat B2 Spec Compliance and Code Quality in order."
owned_paths:
  - "packages/workflow-bundle/scripts/work-item-protocol.js"
  - "packages/workflow-bundle/test/work-item-protocol.test.js"
verify_path:
  - "node packages/workflow-bundle/test/work-item-protocol.test.js"
  - "node packages/workflow-bundle/test/workflow-gate-review.test.js"
approval_required:
  finding_and_reopen: "qc"
  task_plan_amendment: "developer"
implementation_status: COMPLETE
red_commit: "0d1ac48c0adb43279f67503a318187295688a463"
red_result: "EXPECTED_FAIL; exactly one assertion proved that selected aliases uat/dod deleted unrelated blockers containing situation/dodgy."
green_commit: "f9533c4de66fdb04e75008382b39b4fc413e3caa"
green_result: "PASS; both focused suites, three production syntax checks, and git diff --check are green."
```

## Refreshed B2 Review
```yaml
batch: B2
source_sha: "f9533c4de66fdb04e75008382b39b4fc413e3caa"
scope: ["T5", "T6", "T6a"]
spec_compliance:
  status: APPROVED
  verdict: PASS
  reviewer_role: qc
  reviewed_by: qc
  reviewed_at: "2026-09-11T04:04:57Z"
  decision_source: "User explicitly approved refreshed B2 Spec Compliance with role QC for source f9533c4de66fdb04e75008382b39b4fc413e3caa."
  prepared_at: "2026-09-11T03:59:37Z"
  evidence:
    - "AC-RCR-03: approved closeout still projects exactly one work-item close action, protocol-close handoff, selected-terminal blocker cleanup, and report/s01 parity."
    - "AC-RCR-05: fail-first source 0d1ac48 proves uat inside situation and dod inside dodgy were deleted before the correction; GREEN source f9533c4 preserves both unrelated blockers while retaining all prior prose/case/whitespace cleanup fixtures."
    - "EDGE-RCR-03/04: the existing alternate-form and divergent-state fixtures remain green through the real atomic closeout command."
    - "TDD order is explicit: T6a RED commit 0d1ac48 precedes T6a GREEN commit f9533c4."
    - "The correction is limited to one internal bounded-alias predicate in work-item-protocol.js: 10 additions and 1 replacement; no public CLI, schema, receipt, authority, selected-gate, dependency, or config contract changed."
    - "work-item-protocol.test.js and workflow-gate-review.test.js PASS; work-item-protocol.js, workflow-gate-review.js, and workflow-approval-transaction.js pass node --check; git diff --check PASS."
  findings: []
code_quality:
  status: APPROVED
  verdict: PASS
  reviewed_by: ["developer", "qc"]
  reviewed_at: "2026-09-11T04:21:48Z"
  decision_source: "User explicitly approved refreshed B2 Code Quality with roles Developer and QC for source f9533c4de66fdb04e75008382b39b4fc413e3caa."
  opened_at: "2026-09-11T04:04:57Z"
  prepared_at: "2026-09-11T04:05:58Z"
  evidence:
    - "Correctness: bounded matching preserves uat/situation and dod/dodgy canaries while retaining all selected-gate cleanup behavior."
    - "Security: every dynamic alias is regex-escaped before compilation; no path, command, receipt, authority, or persistence surface changed."
    - "Compatibility: NFKC/case/separator/whitespace normalization is unchanged, punctuation-delimited aliases remain matchable, and legacy plus adaptive closeout fixtures pass."
    - "Maintainability: one named helper replaces one raw substring predicate; the T6a production delta is 10 additions and 1 replacement with no new dependency or configuration."
    - "Performance: one small Unicode regex is evaluated per blocker/selected-alias pair; the terminal gate and blocker sets are bounded and no I/O was added."
    - "Test integrity: T6a RED 0d1ac48 precedes GREEN f9533c4; the negative fixtures are additive, both focused suites pass, three production syntax checks pass, and the B2 diff is whitespace-clean."
  findings: []
  finding_disposition:
    id: "F-RCR-B2-001"
    status: RESOLVED
    resolved_by: ["developer", "qc"]
    resolved_at: "2026-09-11T04:21:48Z"
    resolution_source: "f9533c4de66fdb04e75008382b39b4fc413e3caa"
    resolution_evidence: "Refreshed B2 Code Quality PASS approved after the QC-approved refreshed Spec Compliance."
```

## T7 Matrix
```yaml
task_id: T7
status: SUSPENDED_BY_SCOPE_AMENDMENT
opened_at: "2026-09-11T04:21:48Z"
suspended_at: "2026-09-11T07:26:14.837Z"
dependencies:
  refreshed_b2_spec_compliance: PASS
  refreshed_b2_code_quality: PASS
  finding_F_RCR_B2_001: RESOLVED
scope:
  - "Enumerate every supported transaction failure point and confirm rollback/recovery leaves zero partial state."
  - "Confirm concurrent retry permits at most one commit and later unchanged attempts are NOOP."
  - "Execute twenty controlled repeat cycles with zero report/s01 mismatch or stale approval prompt."
  - "Run first-cycle, legacy, adaptive, readiness, rejection, receipt-v1, reviewer, public CLI, full unit, and workflow validator regressions."
partial_evidence_before_suspension:
  - "An uncommitted 20-cycle deterministic fixture passed the focused work-item-protocol suite."
  - "The fixture still reads transaction identity from event.note, so it must not be committed as the structural contract baseline."
  - "Focused transaction, recovery, and lock suites passed."
  - "Full unit reached one runtime-parity failure caused by two ignored, byte-identical generated files named workflow-artifact-naming 2.md; source files were unchanged."
scope_change:
  - "Owner directed replacement of prose-derived state with structured blockers/required_actions and first-class approval-event transaction identity."
  - "The change opens a persisted Contract and invalidates the assumptions that kept the prior s04 Contract gate not_applicable."
  - "OQ-RCR-004..006 plus fresh Spec, Contract, DoR, Approach, and Task Plan receipts are required before any T7 replacement or production edit."
next_review: "None in s07. Return to s03 and then follow the amended authoring gates in order."
```

## Traceability
```yaml
upstream:
  - "s04 AC-RCR-01..08 and EDGE-RCR-01..06"
  - "s05 approved transaction-delta projector"
  - "s06 approved T0..T8 Task Plan"
current:
  - "T0-T4 complete at a65704aa0be26f99988d6d5c13f632fc76907ddd"
  - "B1 Spec Compliance PASS; B1 Code Quality PASS"
  - "T5 RED at 6e16006; T6 GREEN at 9ac8d95d29b0edd9681cfb1320eb848170bd14ca"
  - "B2 Code Quality FAIL approved by Developer/QC; F-RCR-B2-001 OPEN"
  - "QC reopened B2 Spec Compliance and Developer approved T6a"
  - "T6a expected RED at 0d1ac48; bounded-alias GREEN at f9533c4de66fdb04e75008382b39b4fc413e3caa"
  - "Refreshed B2 Spec Compliance approved by QC; Code Quality PASS recommendation ready"
  - "Refreshed B2 Code Quality approved by Developer/QC; F-RCR-B2-001 RESOLVED; T7 OPEN"
  - "Owner structural scope decision suspended T7 and returned the work item to s03 for OQ-RCR-004..006"
next_step: "Approve the structural contract questions, then re-seal amended s04-s06 before resuming s07."
```

## Handoff
- Outputs actual: T0-T6 plus T6a RED/GREEN evidence, completed B1, refreshed B2 reviews, resolved `F-RCR-B2-001`, and partial pre-amendment T7 evidence.
- Historical boundary: the patch-oriented T7 was suspended by the structural amendment.

## Structural Execution Contract

```yaml
step: "s07 Implement"
goal: "Remove prose-derived state through TS0..TS8 with fail-first boundary, producer and event batches."
value: "Preserve unrelated and unknown blockers while making current approval state and transaction attribution explicit."
scope_in: ["Approved sixteen roots", "TS0..TS8", "RCR-SB1/2/3 ordered independent reviews"]
scope_out: ["CI action upgrade", "Skill restructure", "Public CLI/signer/receipt-v1 changes", "Publish/tag/install/merge/cleanup"]
inputs_required: ["Five current digest-matched authoring receipts", "PO work-item receipt", "Approved s04/s05/s06", "Explicit s07 resume with sixteen roots"]
outputs_required: ["TS0 baseline", "RED/GREEN tests", "Typed contract and exact consumers", "Direct event identity", "Compatibility/atomicity evidence", "Independent review handoffs"]
done_when: ["TS0..TS8 evidence complete", "Each batch passes Spec Compliance before Code Quality", "QC explicitly opens s08 after implementation review"]
constraints:
  hard_constraints: ["text/note human-only", "Exact typed selectors", "Unknown legacy exact preservation", "Immutable historical evidence", "WIP quarantined until TS7"]
  soft_constraints: ["Existing shared utility boundary", "Smallest sufficient delta"]
  prohibited_actions: ["Fuzzy text semantics in core", "Historical identity backfill", "Unapproved gate or scope inheritance", "Self-declared DoD"]
  compliance_checks: ["Boundary/producer/event negative tests", "Legacy canaries", "Historical prefix/digest checks", "WIP digest comparison", "Review receipt/subject order"]
risks:
  - { id: "R-STRUCT-01", description: "Mixed writers/consumers remain between structural batches.", likelihood: HIGH, impact: HIGH, severity: HIGH, mitigation: "No candidate/release until TS7 full regression and all structural reviews.", contingency: "Stop at each review boundary; retain individual gates.", owner: "developer/qc", status: MONITORING }
timebox:
  target_duration: "One reviewable structural batch per execution pass"
  deadline: "2026-09-18 stop-and-reassess checkpoint"
  escalation_rule: "Reassess unfinished scope with the owner; never silently cut AC-RCR-06/08."
```

## Structural Input Readiness

```yaml
step: "s07 Implement"
status: READY
available_inputs: ["PO receipt APPROVED", "Spec/Contract/DoR s04 digest_match=true", "Approach s05 digest_match=true", "Task Plan s06 digest_match=true", "s07 ACTIVE with all sixteen approved roots"]
missing_inputs: []
invalid_inputs: []
conflicts: []
assumptions: ["Existing patch reviews are historical, not structural-batch approval."]
risk_level: HIGH
next_action: "TS0 baseline, TS1 RED, TS2 GREEN, then RCR-SB1 Spec Compliance before Code Quality."
```

## Structural Implementation Notes

```yaml
worktree_target: "closeout-bundle-repeat-cycle-reconciliation"
planning_track: full
risk_signals: ["Multi-session", "Shared CR-008 branch", "Sixteen owned roots", "State/event contract regression risk"]
worktree_decision: REQUIRED
decision_reason: ["Continue in the existing isolated worktree inside the repository; no main mutation."]
isolation_strategy:
  branch_name: "codex/adaptive-governance-human-approval-ux"
  worktree_path: ".claude/worktrees/cr-008-adaptive-governance"
  owned_paths: ["The sixteen exact roots in approved s06 and current report grant"]
  expected_duration: "Through child and parent verification"
execution_guards: ["Protected s04/s05/s06 digests immutable", "WIP file and diff digests frozen", "No adjacent Node24/parallelisation/restructure work"]
skip_reason: ""
cleanup_preconditions: ["Child and parent verification", "Applicable independent terminal gates", "Separate finalization authority"]
notes_for_implementation: "Keep this shared branch/worktree HOLD_OPEN."
```

```yaml
review_target: "Structural RCR implementation"
planning_track: full
review_mode: INDEPENDENT
review_order: ["SPEC_COMPLIANCE", "CODE_QUALITY"]
review_batches:
  - { batch: "RCR-SB1", scope: ["TS1", "TS2"], trigger: "Typed boundary GREEN", reviewer_role: "QC then Developer/QC" }
  - { batch: "RCR-SB2", scope: ["TS3", "TS4"], trigger: "All writers/selectors GREEN", reviewer_role: "QC then Developer/QC" }
  - { batch: "RCR-SB3", scope: ["TS5", "TS6", "TS7"], trigger: "Identity and full matrix GREEN", reviewer_role: "QC then Developer/QC" }
required_checks:
  spec_compliance: ["Approved AC/contract/scope", "Exact legacy preservation", "No authority or semantic drift"]
  code_quality: ["TDD integrity", "No hidden text inference", "Failure/compatibility regression", "Focused syntax/static/security checks"]
finding_policy:
  blocker_threshold: "Any HIGH finding or contract/authority drift blocks the next batch."
  reopen_conditions: ["Reviewed boundary changes", "New evidence disproves a prior result"]
handoff_to_verify: ["All three review pairs passed", "TS7 full evidence complete", "QC explicit s08 opening"]
notes_for_implementation_or_verify: "No TS3 before the independent RCR-SB1 review pair."
```

## Structural TS0 Evidence

- Baseline source: `096c2ffc69e965c9dd531f03195799f55bbb8537`.
- [structural-ts0-baseline.json](structural-ts0-baseline.json) freezes thirteen report digests,
  ordered event counts/digests and both historical unbound approval events.
- The resume appends one lifecycle event and updates only current report/s01 scope; this is not
  a load-only compatibility check and does not rewrite the frozen historical prefix.
- `work-item-protocol.test.js` and `workflow-gate-review.test.js`: baseline PASS.
- WIP file SHA-256: `8b0d15de455cae2f0aed5603916e49c610e3b5acb6edda219764de5f0142ee1e`;
  diff SHA-256: `554af6e279da86bec7634585a4fa5cb08d47d04c59abd7302180b4fec46efb91`.
- s04/s05/s06 remain bound respectively to `26b85c2d…`, `d075290f…`, `ae1a733d…`.
- No production edit, WIP adoption, new event identity or terminal verdict is claimed by TS0.

## Structural TS1 RED

- New isolated `work-item-protocol-state.test.js`: 8 tests, 0 PASS / 8 expected FAIL.
  The first failure proves `{id,kind,text,gate}` becomes `"[object Object]"`.
  Other failures pin exact legacy preservation, constructor/selector availability, invalid-shape
  rejection, known import, structured rendering and load-only behavior.
- An initial load fixture used a relative workflow root resolved against the process directory.
  The fixture was corrected to its absolute temporary root and rerun; the remaining failure is
  the expected legacy-object assertion, not a missing-file/setup error.
- `validate-work-item-protocol.test.js`: existing path-equivalence assertions PASS;
  two expected assertions FAIL because typed-collection and mirror validators are not exposed.
- No production code was changed before these RED runs. TS2 is now permitted by the approved plan.

## Structural TS2 GREEN

```yaml
recommended_design: "One shared typed-state normalizer/constructor/adapter/selector/renderer boundary."
implementation_mode: BUGFIX
tasks_completed: ["TS0 baseline", "TS1 expected RED", "TS2 shared boundary GREEN"]
bug_repro_evidence: ["35ec1a2: 8/8 isolated tests FAIL; object collapses to [object Object]", "Two validator export assertions FAIL"]
hypothesis_log:
  - { assumption: "Generic scalar normalization destroys typed state.", status: CONFIRMED, evidence: "TS1 deep-equality RED and TS2 preservation GREEN." }
  - { assumption: "Overly broad options classify unrelated command input.", status: CONFIRMED, evidence: "Additional guard RED on gate --write-root; verb-specific whitelist GREEN." }
debug_experiments:
  - { goal: "Pin bounded import.", action: "Full-consumption, owning-subject and unsupported-option tests.", result: "Unknown/foreign text stays exact legacy." }
tdd_evidence:
  - { behavior: "Typed boundary", failing_test: "35ec1a2: 8/8 isolated FAIL and two validator assertions FAIL", passing_test: "964e1c7: 9/9 isolated PASS; validator suite PASS" }
  - { behavior: "Bounded option grammar", failing_test: "Added guard RED: gate command accepts unrelated --write-root", passing_test: "Verb-specific options and exact subject binding GREEN" }
safe_refactor_notes: ["normalizeArray unchanged for unrelated metadata; only state collections use the new boundary."]
code_changes: ["work-item-protocol-utils.js", "validate-work-item-protocol.js"]
doc_changes: ["structural-ts0-baseline.json", "Current s01/report/s07"]
config_changes: []
review_checkpoints: ["RCR-SB1 QC Spec Compliance READY_FOR_REVIEW", "Code Quality NOT_OPEN"]
outputs_actual: ["Approved enum", "Canonical tuple SHA-256 IDs", "Shape/unique-ID validation", "Exact constants and command grammar", "Text-free selectors", "Stable YAML flow mappings and dual-read mirror equality"]
known_limitations: ["TS3/TS4 writers and assertions unconverted", "TS5/TS6 direct event identity pending", "Old protocol suite: 3 unresolved integration assertions", "TS7/TS8 full matrix and candidate/parent evidence pending"]
follow_up_items: ["Independent RCR-SB1 review pair", "Remaining approved batches"]
notes_for_testing: "9/9 isolated and validator suite PASS; 13 frozen/live reports load with zero disk changes; gate-review suite PASS. No full verification/DoD."
```

## Structural Delivery Rule Evidence

```yaml
behavior_change: true
tdd_status: PASS
worktree_status: PASS
review_status: PENDING
spec_compliance_status: READY_FOR_REVIEW
code_quality_status: NOT_OPEN
delegation_mode: agentic
independence_status: NOT_APPLICABLE
merge_path: "No merge in s07; shared worktree HOLD_OPEN."
verify_path: "TS2 focused tests/syntax/compatibility/encoding; TS7 full regression and TS8 child/parent candidate later."
evidence:
  - "RED 35ec1a2 precedes GREEN 964e1c7."
  - "WIP T7 file/diff digests unchanged and unstaged."
  - "Historical RCR event prefix deep-equal to frozen source."
  - "Three old integration assertions remain visible; they were not weakened to pass this batch."
```

## RCR-SB1 Spec Compliance

```yaml
batch: "RCR-SB1"
source_sha: "964e1c7cf879c6d244253b3ee294f9cdaff60f77"
scope: ["TS1", "TS2"]
spec_compliance:
  status: READY_FOR_REVIEW
  recommendation: "PASS within this boundary batch; complete AC-RCR-09 remains PARTIAL until producer/core conversion."
  reviewer_role: "qc"
  human_decision: PENDING
  reviewed_by: []
  reviewed_at: ""
  checks:
    - { criterion: "Approved utility/vocabulary", result: PASS, evidence: "No new module/dependency/kind; shared boundary for both collections." }
    - { criterion: "Typed shape and ID contract", result: PASS, evidence: "Required fields, gate conditions, duplicate-ID rejection and stable JSON-tuple SHA-256 IDs." }
    - { criterion: "Unknown exact legacy preservation", result: PASS, evidence: "Accent/case/Unicode/whitespace/empty input preserved; legacy objects never reinterpreted." }
    - { criterion: "Bounded adapter", result: PASS, evidence: "Exact constants/full consumed commands only, verb-specific flags and subject binding." }
    - { criterion: "Text-free selectors and mirror", result: PASS, evidence: "Throwing display getter cannot affect selection; stable flow maps and legacy scalar parity." }
    - { criterion: "Compatibility/history", result: PASS, evidence: "13 frozen/live loads, zero file changes; historical prefix intact, no identity backfill." }
    - { criterion: "Correct scope and incomplete-work boundary", result: PASS, evidence: "Only TS1/TS2 claimed; all later batches independent and T7 WIP preserved." }
code_quality:
  status: NOT_OPEN
  reason: "Independent QC Spec Compliance must pass first."
next_action: "QC reviews this source; only then open Developer/QC Code Quality."
```

### File Identity

| Path | SHA-256 |
| --- | --- |
| work-item-protocol-utils.js | d9dda155f663e07eebd9aed7e1c9dad261f5c50820ece6abe283659c4298c0b7 |
| validate-work-item-protocol.js | 9482fdcb46bc52e2fae403eba1dee4942a9a1fe73f0760172618f721d910a63a |
| work-item-protocol-state.test.js | 4bfde7a118ee12ceee5a22586606a686f37383bc47a39f688cd8360449b19d42 |
| validate-work-item-protocol.test.js | a33ce3a10b669989d06f88b348005da74614d5d3e89f716191d2bbe5fe2dfdd8 |

### Scoped Pack Audit

```yaml
audit_scope: "TS1/TS2 script/note boundary; no source-skill or policy rewrite."
checks:
  - { id: "mechanical", status: PASS, evidence: "WORKFLOW_PACK_AUDIT=PASS" }
  - { id: "template_scope", status: PASS, evidence: "Existing step/implementation/discipline schemas retained; no new skill/schema catalog boundary." }
  - { id: "semantic_completion", status: WARN, evidence: "Legacy text consumers remain in the next approved batch; mechanical PASS is not semantic completion." }
findings: []
overall_status: PARTIAL
follow_up_actions: ["Complete TS3..TS8 and independent reviews before candidate/release."]
notes: "Semantic checklist reviewed for changed scripts/notes; source-only audit does not resolve external skill overrides."
```

### Current Structural Handoff

- Protocol BLOCKED at s07, retaining sixteen roots; next human action is QC RCR-SB1 Spec Compliance.
- Developer/QC Code Quality is NOT_OPEN. TS3 requires both verdicts in order.
- Old protocol suite has three failures: readiness gate cleanup, readiness s01 mirror assertion,
  and old prose-based selected-closeout blocker expectation. TS3/TS4 must convert behavior and
  assertions while preserving unknown canaries; no cosmetic green run.
- Full unit/static/security/package/hosted/parent verification remains pending in later tasks.
  No candidate build, Technical Verification, DoD or finalization is opened by this handoff.
- Known limitations: structural contract authoring, replacement TDD/reviews, T8 exact candidate, and child/parent verification remain pending.
- Notes for testing: the fail-first `uat`/`dod` substring fixture now passes without weakening any existing semantic projection or transaction assertion.
- Notes for deployment: none in s07; corrected candidate and rollback binding are T8/s08 work.
