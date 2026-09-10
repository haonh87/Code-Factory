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
> retries all pass. B1 Spec Compliance is ready for QC review; Code Quality remains unopened.

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
tasks_next:
  - "B1: QC reviews Spec Compliance before Developer/QC may review Code Quality"
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
code_changes:
  - path: "packages/workflow-bundle/scripts/workflow-approval-transaction.js"
    change: "Validate an optional canonical UUID before transaction recovery/preflight writes and reuse it for the existing lock, journal, stage, and result identity."
  - path: "packages/workflow-bundle/test/workflow-gate-review.test.js"
    change: "Add fail-first valid/invalid supplied-ID cases and pin the existing generated-ID default."
  - path: "packages/workflow-bundle/scripts/workflow-gate-review.js"
    change: "Classify closeout from receipt or pre-event report/s01 operations, allocate one identity only for a real cycle, then construct the final event operation."
  - path: "packages/workflow-bundle/scripts/work-item-protocol.js"
    change: "Allow explicit event sequencing and include shared transaction_id in the existing event note without changing event shape."
  - path: "packages/workflow-bundle/test/work-item-protocol.test.js"
    change: "Add real marker-only, older-event, second-host, exact event-attribution, marker-dedup, and two-retry fixtures."
doc_changes:
  - "Recorded the s07 activation and T0 baseline in child and parent workflow evidence."
config_changes: []
review_checkpoints:
  - "B1 Spec Compliance: READY_FOR_QC_REVIEW; Code Quality: BLOCKED_BY_REVIEW_ORDER"
  - "B2 after T6: QC Spec Compliance, then Developer/QC Code Quality"
  - "B3 after T7: QC Spec Compliance, then Developer/QC Code Quality"
known_limitations:
  - "B1 approval and T5-T7 canonical projection, atomicity, compatibility, and later review work remain."
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
  - "B1 Spec Compliance proposal prepared at 2026-09-10T11:13:29Z for source a65704aa0be26f99988d6d5c13f632fc76907ddd; human QC verdict pending."
  - "B1 Code Quality is not started because Spec Compliance must pass first."
spec_compliance_status: PARTIAL
code_quality_status: NOT_RUN
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
review_mode: independent
review_order: ["spec_compliance", "code_quality"]
batches:
  - { id: "B1", after: "T4", spec_owner: "qc", quality_owners: ["developer", "qc"] }
  - { id: "B2", after: "T6", spec_owner: "qc", quality_owners: ["developer", "qc"] }
  - { id: "B3", after: "T7", spec_owner: "qc", quality_owners: ["developer", "qc"] }
review_gate: "Do not begin the next implementation batch until both reviews for the current batch pass."
```

## B1 Review
```yaml
batch: B1
source_sha: "a65704aa0be26f99988d6d5c13f632fc76907ddd"
scope: ["T1", "T2", "T3", "T4"]
spec_compliance:
  status: READY_FOR_REVIEW
  recommended_verdict: PASS
  reviewer_role: qc
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
  status: NOT_RUN
  blocked_by: "B1 Spec Compliance human QC approval"
```

## Traceability
```yaml
upstream:
  - "s04 AC-RCR-01..08 and EDGE-RCR-01..06"
  - "s05 approved transaction-delta projector"
  - "s06 approved T0..T8 Task Plan"
current:
  - "T0-T4 complete at a65704aa0be26f99988d6d5c13f632fc76907ddd"
  - "B1 Spec Compliance READY_FOR_REVIEW; B1 Code Quality NOT_RUN"
next_step: "Human QC reviews B1 Spec Compliance"
```

## Handoff
- Outputs actual: T0-T4 RED/GREEN evidence and B1 Spec Compliance proposal.
- Known limitations: B1 human reviews and T5-T8 remain pending.
- Notes for testing: both focused suites pass; do not start T5 until B1 Spec Compliance then Code Quality pass in order.
- Notes for deployment: none in s07; corrected candidate and rollback binding are T8/s08 work.
