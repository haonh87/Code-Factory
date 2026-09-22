---
artifact_id: "cr008-legacy-blocker-disposition.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "cr008-legacy-blocker-disposition"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: verified
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/cr008-legacy-blocker-disposition.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
execution_roles:
  - "developer"
  - "qc"
review_mode: self
artifact_shape: adaptive_v1
request_lane: maintenance
workflow_required: true
routing_reasons:
  - "LANE_MAINTENANCE"
escalation_reasons: []
role_reasons:
  developer:
    - "ROLE_DEVELOPER_BOUNDED_CHANGE"
  qc:
    - "ROLE_QC_DOD_VERIFICATION"
gate_reasons:
  task_plan:
    - "GATE_TASK_PLAN_BOUNDED_CHANGE"
  dod:
    - "GATE_DOD_TECHNICAL_CLOSEOUT"
adaptive_activation:
  source_version: "2.6.3"
  installed_versions:
    - "2.6.3"
    - "2.6.3"
  parity_passed: true
approval_gates:
  spec: "not_applicable"
  contract: "not_applicable"
  dor: "not_applicable"
  approach: "not_applicable"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
  dod: "required"
role_signoffs:
  task_plan: ["developer"]
  dod: ["qc"]
gate_reviews:
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-09-22T07:33:21Z"
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "cr008-legacy-blocker-disposition.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Technical Approach + Task Plan

> [!summary]
> The user approved the exact T1-T6 plan and six-path scope at commit a00ce83. Trusted work-item/task_plan sealing and ACTIVE remain pending; no parent entry has been changed.

## Human Review Decision

The repository owner explicitly answered `accept` to the Work Item + Task Plan review for commit `a00ce83c625d529d4480d07b97543853c7ffbe9b`. Recorded at 2026-09-22T07:33:21Z (observation time). Authority: Maintainer for work-item approval and developer for Task Plan. The accepted scope is the six-path grant and T1-T6, including all conditional finish prerequisites. This does not pass QC DoD or authorize early cleanup. Trusted receipts must still be sealed and verified before ACTIVE.

## Step Contract

```yaml
step_goal: "Provide an executable, minimal maintenance plan with exact ownership, authority and verification checkpoints."
owner: developer
input_refs: ["s01 reviewed admission and exact-entry evidence", "s04 readiness and AC mapping", "Spec Card"]
done_when: ["Tasks have paths, dependencies and verification", "Developer review and trusted Task Plan receipt are explicit prerequisites for ACTIVE"]
```

## Option Analysis

```yaml
options:
  - "A: Keep both legacy entries and retain the worktree indefinitely. Preserves all evidence but leaves current status and finish metadata misleading."
  - "B: Apply two explicit signed dispositions, reconcile dated finding metadata, and assess cleanup. Requires human signatures and verification; satisfies all five acceptance criteria without source-code changes."
  - "C: Delete blockers directly or remove the old worktree immediately. Rejected: loses provenance or bypasses the existing finish hold."
recommended_option: B
validation: "Verify original-entry preservation, receipt digests and current state before declaring removal readiness."
```

## Technical Approach

```yaml
recommended_approach: "Use the source CLI on main cf866d8 in the isolated maintenance worktree, with exact-ID human-signed disposition and append-only history."
why: "The shipped CR-009 contract already implements the required behavior; only live application and evidence reconciliation remain."
boundaries:
  - "The archived parent lifecycle, gate hosts and receipt formats remain unchanged."
  - "Only this item's six declared paths may be written after its scope is approved."
  - "No new library, abstraction, validator, test fixture, or production code is needed."
failure_handling:
  - "Pin original bytes and operation IDs before the first disposition; refresh the exact state ID before the second."
  - "On committed disposition/projection failure, retry the identical operation and intent; do not append a replacement operation."
  - "Unexpected target state, changed gate host, invalid signature or missing attribution stops dependent work."
```

## Brownfield Impact Analysis

```yaml
impacted_modules:
  - "CR-008 protocol report and derived s01 pending-state projection"
  - "CR-008 finding and branch-finish metadata"
compatibility_risks:
  - "Snapshot IDs change after each report write."
  - "The old CR-008 checkout is stale; use it only for final inventory, never as the validator source."
migration_notes: ["No migration, runtime rollout or release change."]
rollback_notes:
  - "Preserve snapshots and signed history. Stop for a reviewed correction if intent or evidence changes; do not reset away an applied signed disposition."
```

## Owned Scope

These six entries are the exact proposed activation grant:

```yaml
granted_write_paths_proposed:
  - "work-items/cr008-legacy-blocker-disposition/"
  - "product-specs/cards/cr008-legacy-blocker-disposition.md"
  - "work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.work-item-report.json"
  - "work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s01.restate.md"
  - "changes/CR-008/execution/task-status.md"
  - "changes/CR-008/archive-metadata.md"
```

Git administration for the old CR-008 workspace is conditional post-DoD work. It grants no file-content writes to that stale checkout. The protected master audit register, parent s04-s08 and all other workspace contents are excluded.

## Main Artifact

```yaml
implementation_goal: "Reconcile CR-008's two stale pending entries with signed provenance and an evidence-based finish decision."
ba_lane:
  acceptance_coverage: ["T1-T2: AC-01..03", "T3: AC-04", "T4-T5: AC-01..05", "T6: conditional AC-05 cleanup"]
  scope_guards: ["Existing maintenance boundary only", "No business or release gate is introduced"]
  human_review_points: ["Maintainer work-item approval", "Developer Task Plan", "Two Maintainer parent dispositions", "QC DoD"]
dev_lane:
  path_map: ["Owned Scope is the exact grant; task-specific paths below narrow it"]
  technical_sequence: ["Approve and activate", "T1", "T2", "T3", "T4", "T5", "T6 if eligible"]
  tdd_targets: ["Not applicable: no production behavior change; verify existing signed disposition behavior against real evidence."]
task_breakdown:
  - id: T1
    owner_role: developer
    name: "Pin live baseline and authority"
    objective: "Establish a fresh snapshot only after trusted work-item/task_plan approval and exact-scope activation."
    paths_in_scope: ["work-items/cr008-legacy-blocker-disposition/*.s07.*", "read-only parent report, s04-s08, receipts, child report and old worktree"]
    dependencies: ["Applicable readiness receipts verified", "ACTIVE/s07 with the six exact grants"]
    outputs_expected: ["Before-bytes backup and hashes", "Original entries and report/event history counts", "Parent terminal receipt validity", "Per-path ownership inventory"]
    review_checkpoint: "Stop if baseline differs from s01 evidence or any protected receipt is invalid."
    verification_hint: "V1 baseline assertions; V3 receipt/hash baseline; no target mutation in T1."
  - id: T2
    owner_role: developer
    name: "Record two human-signed dispositions"
    objective: "Resolve only the two reviewed parent entries, preserving original objects and current lifecycle."
    paths_in_scope: ["work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.work-item-report.json", "work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s01.restate.md", "own s07 evidence"]
    dependencies: ["T1", "Maintainer signature for each exact entry"]
    outputs_expected: ["Two additional signed history records", "Zero parent blockers/actions", "Unchanged ARCHIVED/s08 and protocol_events"]
    review_checkpoint: "Before each signature inspect the exact current ID, raw entry and reason; verify the first record before selecting the second."
    verification_hint: "V1 and V2; exact intent/retry contract and proposed reasons are in Parent Disposition Intents below."
  - id: T3
    owner_role: developer
    name: "Reconcile dated finding and finish evidence"
    objective: "Record how the actual signed operations resolve F-CR008-ARCH-001 while retaining prior evidence."
    paths_in_scope: ["changes/CR-008/execution/task-status.md", "changes/CR-008/archive-metadata.md", "own s07 evidence"]
    dependencies: ["T2 verified"]
    outputs_expected: ["Dated finding disposition with operation IDs and evidence links", "Dated finish reassessment retaining HOLD_OPEN until QC DoD and integration checks pass"]
    review_checkpoint: "Review spec/scope compliance first, then artifact quality; do not rewrite historical release facts or previous verdicts."
    verification_hint: "V3 and V4; verify every claimed disposition against signed history and identify remaining finish conditions explicitly."
  - id: T4
    owner_role: developer
    name: "Verify scope, preservation and compatibility"
    objective: "Produce AC evidence and early two-tier review before final QC verification."
    paths_in_scope: ["own s07 evidence", "own s08 verification"]
    dependencies: ["T3"]
    outputs_expected: ["V1..V5 results", "Spec-compliance then artifact-quality review", "Explicit skipped checks and residual risks"]
    review_checkpoint: "A failed receipt, unexpected diff or unattributed path prevents a cleanup recommendation."
    verification_hint: "Run V1..V5 from this updated worktree; no fresh production tests are needed for document/protocol application."
  - id: T5
    owner_role: qc
    name: "Review verification and seal DoD"
    objective: "Decide this maintenance item's completion and conditional old-worktree finish eligibility."
    paths_in_scope: ["own s08 verification", "own protocol through supported CLI"]
    dependencies: ["T4", "Committed delivery and reviewable s08"]
    outputs_expected: ["QC decision and trusted DoD receipt", "Protocol VERIFIED/DONE only after applicable evidence", "Explicit branch-finish decision"]
    review_checkpoint: "AI prepares evidence; the human QC reviewer passes DoD. No UAT, Release or Business Acceptance gate applies."
    verification_hint: "Verify DoD signature and current host digest; require every AC mapped and all findings resolved or explicitly retained."
  - id: T6
    owner_role: developer
    name: "Conditional post-DoD integration and local cleanup"
    objective: "Durably integrate maintenance through PR, then remove only the old eligible CR-008 workspace."
    paths_in_scope: ["own unsealed handoff evidence", "Git metadata for .claude/worktrees/cr-008-adaptive-governance and codex/adaptive-governance-human-approval-ux"]
    dependencies: ["T5 passed", "Human-authorized PR integration", "Required CI passed", "Fresh finish checks passed"]
    outputs_expected: ["Durable integration reference", "Per-path attribution and zero unique commits", "Removal receipt or explicit HOLD_OPEN reason"]
    review_checkpoint: "Never use force removal or git clean. If any path is unique/unattributed, retain the workspace. Keep this maintenance worktree until its own finish decision."
    verification_hint: "V5 immediately before cleanup; after removal check registered worktrees and both protected branches still exist."
dependencies_global:
  - "Source recovery integrated in PR #10; global published version remains 2.6.3."
  - "Human-controlled Maintainer/developer/QC authority for applicable actions."
risk_notes:
  - "A signed report write can succeed before projection refresh; retry must keep the same operation ID and intent."
  - "Ignored runtime files are not disposable by name; every path needs a durable byte-identical owner or the worktree stays."
verification_plan: ["V1 exact-entry history", "V2 parent state/event preservation", "V3 sealed evidence", "V4 metadata/scope/encoding/validators", "V5 finish inventory"]
notes_for_implementation: "Do not start T1 target work until applicable receipts and exact grants are valid. Do not treat this draft as Task Plan pass. No delegation is needed."
```

The `ba_lane` keys are the planner's coverage perspective; they do not activate a BA role or gate. The canonical adaptive roles remain developer and qc.

## Parent Disposition Intents

These are proposed exact intents, executed only after T1 and the required activation checks. s01 owns their supporting baseline evidence.

| Entry | Operation ID | Reason to review before signing |
| --- | --- | --- |
| F-AG11-001 legacy entry | `cr008-legacy-20260921-f-ag11-001` | Superseded by transaction 597aa5f9-1043-447e-b762-b6a7858f1b9c, receipt-backed reconciliation at 2026-09-15T06:47:56Z, and subsequent DONE/ARCHIVED events; retain original entry in signed history. |
| Linked-child legacy entry | `cr008-legacy-20260921-linked-child` | Superseded by linked child closeout-bundle-repeat-cycle-reconciliation closing after AC-RCR-08 and archiving on 2026-09-16; current child DoD is approved and no child blockers remain. |

Resolve the current `di:` ID from read-only status immediately before each signature. The operation IDs are stable across retries; the initial second entry ID must not be reused after the first write.

## Verification Plan

- **V1:** Snapshot raw parent report bytes. Require exactly two new distinct `resolved_state_history` records. Compare each `original_entry` structurally and its text byte-for-byte; validate signatures with `verifyRecordedDisposition` against the real trusted public key.
- **V2:** Require parent status ARCHIVED, current_step s08, zero blockers/actions and byte-equivalent protocol event content. Confirm the completed child remains unchanged. Run read-only `work-item status --json` after each disposition.
- **V3:** Compare every parent s04-s08 SHA-256 against T1. Read `gate status` for dod, release and business_acceptance; require APPROVED, valid signature and digest_match=true. Do not reseal those historical gates.
- **V4:** Run source `wfc validate`, `plan`, `exec`, `sdd` for this work-item root; run `protocol` with `--workflow-root work-items` so managed reports are actually inspected, and `change` for CR-008 references. Check the entire branch diff against the six grants, `git diff --check`, strict UTF-8/no BOM and original admission-history preservation. TDD/build/lint/security scanner runs are not applicable to this scope with no source changes; signature and path validation remain required.
- **V5:** After QC DoD and integration, compare the old branch with main (`rev-list --left-right --count`), inventory tracked, untracked and ignored files, and attribute each ignored file to a byte-identical current/historical durable source or verified reproducible output. Zero unique commits, clean worktree and zero unowned files are required. Preserve backups; do not force removal. Report the held or removed outcome and retained protected branches.

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "PASS: each task maps to Spec Card acceptance and has an owner, path, dependency and verify method."
  - "PASS: existing isolated worktree covers the multi-session maintenance scope."
  - "PASS: production behavior is unchanged, so TDD is not applicable; early two-tier review remains required."
  - "PASS: the user explicitly accepted Work Item and Task Plan at a00ce83; observed 2026-09-22T07:33:21Z."
  - "PENDING: trusted work-item/task_plan receipts and exact-scope activation."
blocking_items: ["Trusted work-item approval", "Developer task_plan receipt"]
owner: developer
next_action: "Seal the approved work-item and task_plan receipts in a human-controlled TTY, verify them, then activate only the declared scope."
```

## Brownfield Delivery Plan

```yaml
regression_checkpoints:
  - "Parent lifecycle/events and child state unchanged; two originals retained in signed history."
  - "CLI projection changes only the managed protocol block."
compatibility_checkpoints:
  - "Parent s04-s08 bytes and terminal receipts remain valid; release/global bundle stay 2.6.3."
migration_or_backfill_steps: ["Not applicable; use the existing signed disposition contract."]
rollback_or_restore_steps:
  - "Keep pre-operation snapshots outside the governed artifact tree."
  - "Before any signature, stop safely on a failed preflight. After a signed write, retain history and repair only through the supported identical-intent retry or a separately reviewed correction."
```

## SDD Traceability

```yaml
requirement_refs:
  - "product-specs/cards/cr008-legacy-blocker-disposition.md#Requirements"
acceptance_refs:
  - "product-specs/cards/cr008-legacy-blocker-disposition.md#Acceptance Criteria"
task_refs:
  - "T1..T6 in Main Artifact"
test_refs:
  - "V1..V5 in Verification Plan"
```
