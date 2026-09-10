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
> baseline suites pass. T1 is next and must establish fail-first transaction-ID evidence before
> any production change.

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
tasks_next:
  - "T1 RED: prove optional supplied transaction-ID validation and reuse are absent"
  - "T2 GREEN: add the minimum optional validated transaction-ID input"
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
tdd_evidence: []
code_changes: []
doc_changes:
  - "Recorded the s07 activation and T0 baseline in child and parent workflow evidence."
config_changes: []
review_checkpoints:
  - "B1 after T4: QC Spec Compliance, then Developer/QC Code Quality"
  - "B2 after T6: QC Spec Compliance, then Developer/QC Code Quality"
  - "B3 after T7: QC Spec Compliance, then Developer/QC Code Quality"
known_limitations:
  - "TDD and production correction have not started; T1 is next."
  - "F-AG11-001 keeps parent verification, release, protocol close, and branch finalization blocked."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: PARTIAL
tdd_test_refs: []
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
  - "B1-B3 are scheduled after their approved implementation batches; none has run yet."
spec_compliance_status: NOT_RUN
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

## Traceability
```yaml
upstream:
  - "s04 AC-RCR-01..08 and EDGE-RCR-01..06"
  - "s05 approved transaction-delta projector"
  - "s06 approved T0..T8 Task Plan"
current:
  - "T0 PASS; s07 ACTIVE; no production edit"
next_step: "T1 fail-first optional transaction identity tests"
```

## Handoff
- Outputs actual: s07 activation and T0 baseline evidence.
- Known limitations: implementation and B1 review remain pending.
- Notes for testing: create the T1 failure before changing `workflow-approval-transaction.js`.
- Notes for deployment: none in s07; corrected candidate and rollback binding are T8/s08 work.
