---
artifact_id: "cr008-legacy-blocker-disposition.s01.restate"
artifact_family: workflow-step
work_item_slug: "cr008-legacy-blocker-disposition"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: CHANGE
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
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Proposed bounded maintenance: preserve and explicitly disposition two obsolete CR-008 blocker entries using the shipped 2.6.3 command, then verify whether its merged worktree can be removed. The maintenance admission has three signed dispositions and is MATERIALIZED; the archived parent and all worktrees remain unchanged.

## Router Status

```text
Request Lane: maintenance
Current Step: s06 Task Plan
Workflow Status: WAITING_APPROVAL
Delivery Context: brownfield
What I Am Doing Now: Record explicit authoring approval and prepare trusted work-item/task_plan sealing.
Missing Gates: Trusted work-item and developer task_plan receipts. Human decisions are explicit; QC DoD remains a later closeout gate.
Next Artifact: Approved authoring hosts and trusted readiness receipts; then exact-scope activation.
Next Human Action: Seal the accepted work-item and task_plan receipts using the existing key in a human-controlled terminal.
```

## Step Contract

```yaml
step_goal: "Attribute the two CR-008 entries, review dedup candidates, and prepare an executable maintenance boundary without mutating the archived parent."
owner: developer
input_summary:
  - "User accepted the proposal to prepare CR-008 disposition and publish the audit checkpoint, then instructed continuation."
  - "main 0dc985dcabd6c86132cd8c2d4a7a412b3a8014cd and installed workflow-bundle 2.6.3"
output_summary:
  - "Evidence-backed disposition recommendation for each blocker"
  - "Proposed write paths, acceptance criteria, sequence, and remaining authority requirements"
done_when:
  - "Each selected raw entry has its own evidence and proposed disposition."
  - "Runtime limitations and missing signatures are explicit."
  - "No target state or protected path changes during proposal preparation."
```

## Governance Context

```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Smallest applicable maintenance lane: developer and qc only."
  - "Original opaque entries belong in signed append-only resolved_state_history, not deletion."
  - "Every live write needs an approved owner and scope."
  - "Branch/worktree finalization waits for s08 DoD and finding disposition."
required_reviews:
  - "Developer: task_plan, GATE_TASK_PLAN_BOUNDED_CHANGE"
  - "QC: dod, GATE_DOD_TECHNICAL_CLOSEOUT"
  - "Maintainer: authenticated per-entry state disposition under the existing CLI contract"
prohibited_actions:
  - "Forge receipts, unlock keys through agent-controlled credentials, or enable fixture approval mode."
  - "Hand-edit protocol control fields to bypass admission, approval, or disposition."
  - "Rewrite historical s04-s08 gate hosts or reopen the 2.6.3 release."
  - "Edit the protected holistic finding register or dispose CF findings outside M4."
open_governance_questions:
  - "No technical admission question remains; the required authoring approvals are still pending."
```

## Artifact Chính

```yaml
raw_request: "accept đề xuất của bạn, hãy làm; Tiếp tục"
restated_request: "Publish the preserved audit branch, prepare explicit CR-008 legacy blocker dispositions, and remove its worktree only when verified eligible."
request_type: CHANGE
user_problem_initial: "Archived delivery has misleading active legacy blockers and prevents trustworthy cleanup."
business_context_initial: "The release is settled; this task concerns local repository state and historical finding disposition."
scope_draft:
  in:
    - "This maintenance proposal and its eventual workflow artifacts"
    - "Two signed dispositions in the CR-008 parent report and the CLI-managed s01 projection"
    - "After verification, a dated finding/branch-finish reconciliation in CR-008 metadata"
    - "Conditional removal of the merged CR-008 worktree after DoD and durable handoff"
  out:
    - "Production code, signer changes, receipt-format changes, release or publication"
    - "Master audit M4, CF-004/CHANGE-005, scratch files, or other worktrees"
    - "Remote branch deletion"
constraints_initial:
  - "Read from main; do not run current validators from the 81-commit-old CR-008 checkout."
  - "No mutation of the archived parent until this maintenance item is admitted, approved, and ACTIVE."
  - "No cleanup until signed dispositions, s08 DoD, durable integration, and fresh path attribution pass."
assumptions_initial:
  - "The two reviewed entries remain unchanged until the Maintainer executes disposition; otherwise refresh all IDs and evidence."
dependencies_initial:
  - "Shipped CR-009 disposition implementation in workflow-bundle 2.6.3"
  - "Existing trusted Maintainer key unlocked in a human-controlled terminal"
risks_initial:
  - "Legacy IDs depend on the entire raw report snapshot; the second ID changes after the first write."
  - "The CLI may commit a disposition before projection refresh fails; retry the same operation ID, never create a duplicate."
notes_for_step_2: "Goal and open questions are hosted below under the Light note mapping; no business role is added."
```

## Business Goal

```yaml
business_goal: "Make current CR-008 state consistent with its valid archived evidence while retaining every original blocker and its disposition authority."
success_metrics:
  - "Exactly two original entries preserved in signature-verified resolved history; zero remaining parent blockers or required actions."
  - "Parent remains ARCHIVED and all three terminal receipts remain digest-matched."
  - "No unrelated file or unmerged commit is lost."
non_goals:
  - "Reopening any release or declaring the broader holistic audit complete"
```

## Admission Review

The CLI generated `cr008-legacy-blocker-disposition.work-item-report.json` at 2026-09-21T13:10:10.810Z with `PROPOSED`, `PENDING_REVIEW`, `dedup_result=needs_review`. That original snapshot is retained outside the repository; the signed recovery below supersedes its current admission state without discarding its candidate evidence.

| Candidate returned by the materializer | Existing ownership | Assessment |
| --- | --- | --- |
| `closeout-bundle-legacy-dod-compatibility` | Archived fix for missing legacy DoD in closeout selection | Does not own live disposition of the two entries. |
| `terminal-archive-legacy-state-reconciliation` | Archived CR-009 implementation of exact-ID disposition and archive guards | Its s08 Business Acceptance explicitly excludes live CR-008 parent disposition and worktree cleanup. This task applies that implementation. |
| `worktree-and-closure-integrity` | DONE worktree/runtime closure-integrity fixes | Different code-change boundary; no ownership of these live entries. |

Recommendation: one separate maintenance item, not a duplicate or a split request. The reasons below were subsequently signed by the Maintainer; this admission decision does not pass Task Plan. The materializer uses shared request/slug tokens; all three matches have score 1.

The original admission limitation is resolved by the separately owned, human-verified `materialization-dedup-recovery` work item. Its [PR #10](https://github.com/haonh87/Code-Factory/pull/10) merged as `cf866d82077a13d77e63fe63548a8800a378ced3` on 2026-09-22 after all ten CI checks passed. The user explicitly accepted integration and continuation; that instruction was recorded at 2026-09-22T07:17:27Z (observation time, not message-delivery time). This proposal was rebased onto that main commit; all three original proposal files were byte-identical across the rebase.

The source CLI now supports `materialize --resume-proposal` after the three admission concerns have trusted signed dispositions. The global installed release remains 2.6.3 and does not yet contain this source change. Use this updated worktree's `packages/workflow-bundle/bin/wfc.js` for recovery. Ordinary re-materialization, manual report relabeling, and work-item approval alone are not recovery paths.

### Admission Decisions For Maintainer Signature

These decisions belong to this proposal, not the archived CR-008 parent. Each preserves its exact original entry in signed history. Stable producer IDs identify the reviewed concern; execution refreshes the snapshot-bound `di:` ID immediately before each command.

| Concern | Stable producer ID | Proposed signed reason |
| --- | --- | --- |
| Near-match review | `se:db2ddb0d5e7ac10cb949c301bc1cd22f1169197fec13e4d4c6e4d22a3eb361e3` | The three matched work items own earlier runtime fixes; none owns the two live CR-008 dispositions or the resulting cleanup reassessment. Retain this distinct maintenance proposal. |
| Single versus split scope | `se:6e883e07166ee862060dea9ecc18843de5470cbc581eed5dd539b9cc61fac453` | One bounded maintenance item owns exactly two parent dispositions, their projection, dated finding/finish metadata, and conditional verified local cleanup. No production, release, or unrelated audit work is included. |
| Existing work/change review | `se:2b1b5b8d31cf90ea804bd2af3187717ac96e6d874b3533a3d603a1f93fd78f86` | Existing work items and CR-008/CR-009 evidence have been reviewed. CR-009 s08 explicitly excludes live CR-008 disposition and worktree cleanup, so this separately owned item is required. |

All three decisions were signed in human-controlled TTY mode at 2026-09-22T07:22:34.367Z, 07:22:38.090Z and 07:22:41.149Z; their original entries and signatures are owned by `resolved_state_history` in this item's report. Read-only verification confirmed all three signatures and unchanged report fields outside the selected collections/history.

Supported recovery completed at 2026-09-22T07:23:32.354Z with operation `ec6bcd8d-7f21-4c2e-8818-e78b56e5c116` and source SHA-256 `222c8b6670a8b52e473270c67eefa8deedb078843c7bc72224ce7921acc84b37`. Current result: MATERIALIZED/s01, PENDING_REVIEW, no grants. The logical authoring review is at s06; protocol current_step remains s01 until authorized activation. No parent disposition has occurred.

## Existing System Baseline And Per-entry Disposition

Evidence was read on 2026-09-21 from main `0dc985d` in the isolated proposal worktree. The archived parent report SHA-256 is `64f67605beab120ffa4fffe8407fc5e9c900d04c5d6727c3ecddf8ebabf785cc`.

| Entry | Exact initial state ID | Proposed disposition and supporting evidence |
| --- | --- | --- |
| 1 | `di:02fbe34b491da0943b0b79043862f7d1574166660932157dac1c6b12ee23c32a` | Resolve as superseded by receipt-backed current-cycle reconciliation. Parent event `reconcile-F-AG11-001` at 2026-09-15T06:47:56Z binds closeout transaction `597aa5f9-1043-447e-b762-b6a7858f1b9c`. It was followed by DONE and ARCHIVED. All three terminal receipts are APPROVED and digest_match=true. The reconciliation event alone does not authorize disposition. |
| 2 | `di:5626ac48f6e0f53de65c8a307e08be74ecfb9b2e45ca34819c0ce94a8516cf46` | Resolve as superseded by completed linked delivery. `closeout-bundle-repeat-cycle-reconciliation` is ARCHIVED/s08, has no blockers or required actions, passed DoD, closed at 2026-09-15T06:54:27.675Z, and archived at 2026-09-16T03:18:53.132Z. Its report SHA-256 is `59967a9f0530ea75a401e59c94ed6a17ff9ebfa8ad28878b2bb96e99b3088a37`. Refresh this ID after entry 1. |

Exact source objects, to be retained unchanged inside signed history:

```json
[
  {"kind":"legacy","text":"F-AG11-001 is OPEN: repeated closeout success leaves stale pending state and no current-cycle event."},
  {"kind":"legacy","text":"Linked defect closeout-bundle-repeat-cycle-reconciliation is BLOCKED at s04; structural decisions are approved but fresh downstream gate receipts are pending."}
]
```

Parent s08 SHA-256 remains `e994f4292829e77d06ba809e897c3efd6d2c6cff562b579ed1536f5e92d0cc93`. DoD/QC receipt: 2026-09-15T06:35:16.290Z; Release/DevOps: 06:35:27.640Z; Business Acceptance/PO: 06:35:58.981Z. These historical approvals cover CR-008 delivery, not the new maintenance task.

## Authoring Handoff

The [Spec Card](../../product-specs/cards/cr008-legacy-blocker-disposition.md) owns REQ-001..005 and AC-01..05. [s04](cr008-legacy-blocker-disposition.s04.acceptance-criteria.md) owns readiness and verification mappings. [s06](cr008-legacy-blocker-disposition.s06.task-breakdown.md) now owns the option analysis, exact six-path grant, disposition intents, T1-T6 sequence and V1-V5 checks. The earlier proposal has been transferred there, rather than retained as a competing plan.

No grant or implementation permission is issued by these drafts. Work-item approval and Task Plan pass require explicit human decisions and trusted receipts. Parent signing remains through a human-controlled TTY; a source-code blocker would require a separate repair owner.

## Audit

```yaml
finish_target: "codex/adaptive-governance-human-approval-ux"
workspace_kind: BOTH
verify_inputs:
  - "Parent and child ARCHIVED states, current digest-matched terminal receipts"
  - "CR-008 branch is 81 behind and 0 ahead of main; worktree clean at inspection"
  - "462 ignored runtime files matched their corresponding canonical sources at the earlier read-only inventory; repeat before any removal"
finish_gate_checks:
  verify_complete: PASS
  dod_complete: PASS
  findings_closed: FAIL
  exceptions_resolved: PASS
allowed_actions:
  - "Author and review this maintenance packet; preserve all old workspaces"
blocked_actions:
  - "Remove the CR-008 worktree or branch while F-CR008-ARCH-001 lacks signed live disposition and approved handoff"
cleanup_sequence: []
merge_conditions:
  - "New maintenance s08 DoD and verified durable handoff"
residual_risks:
  - "Two live parent blockers; new maintenance work-item/task_plan gates remain unsealed"
final_recommendation: HOLD_OPEN
notes_for_closeout: "PASS entries describe the existing archived CR-008 delivery only, not this maintenance proposal."
```

## Open Questions

```yaml
open_questions: []
resolved_questions:
  - "OQ-01: integrated PR #10 supplied supported recovery, executed after all three admission signatures verified."
missing_inputs:
  - "Explicit work-item and Task Plan approval for the complete s04/s06 packet"
  - "Human-controlled Maintainer signatures for both parent dispositions after ACTIVE"
conflicts: []
```

## SDD Traceability

```yaml
requirement_refs:
  - "User-approved maintenance proposal and original path-preservation instructions"
acceptance_refs:
  - "product-specs/cards/cr008-legacy-blocker-disposition.md: AC-01..AC-05"
task_refs:
  - "cr008-legacy-blocker-disposition.s06.task-breakdown.md: T1..T6"
test_refs:
  - "Read-only gate status, raw report hashes, protocol-state review and preservation snapshot"
```


## Preparation Verification — Initial Proposal

- `wfc validate --workflow-root work-items/cr008-legacy-blocker-disposition`: PASS, one note (naming and governance).
- `wfc plan` and `wfc exec` with the same root: PASS, one note each.
- `wfc sdd` with the same root: PASS, one note linked to the draft Spec Card.
- `wfc protocol --workflow-root work-items`: PASS, 19 protocol-managed items; 21 legacy scaffolds skipped by existing policy.
- UTF-8 decoding and preservation hash comparison: PASS. All 33 captured files remained byte-identical, including the generated admission report, archived parent files, CR-008 metadata, protected master register and 19 files in the five root untracked paths.
- Initial checks identified a missing generated protocol projection and draft Spec Card; both authoring omissions were corrected without changing report state. The checks above are the final results.
- No production code changed. No live signature, disposition or cleanup test was attempted; the remaining admission and human authority requirements still block implementation. These preparation checks are not s08 DoD.

## Authoring Verification — 2026-09-22

- PASS: all three admission signatures verify against the trusted public key; supported recovery retains the original candidate and signed history.
- PASS: `validate`, `sdd`, `exec` and `plan` inspect all three current Light authoring notes. `protocol --workflow-root work-items` validates 20 managed items, with 21 legacy scaffolds skipped under existing policy.
- PASS: s04/s06 semantic preflight has no missing acceptance, readiness, task or traceability fields. UTF-8/no-BOM checks cover all five work-item files; `git diff --check` passes after trimming a generated extra trailing blank line in the unsealed s01 projection.
- PASS: 32 preservation-manifest paths remain byte-identical. The only changed manifest path is this item's report, through the three authorized signed admission dispositions and supported recovery. The parent/child reports in this worktree also retain their reviewed hashes.
- Authoring review only: s04/s06 and the Spec Card remain draft; work-item and Task Plan receipts are still missing. No parent disposition, release change or workspace cleanup has occurred.

## Authoring Approval — 2026-09-22T07:33:21Z

The user explicitly accepted the Work Item + Task Plan question for commit a00ce83. s04/s06 and the Spec Card now record that reviewed baseline; s06 owns the human Task Plan decision. Work-item and Task Plan receipts remain to be sealed. No other gate is inferred from this approval, and parent CR-008 writes remain locked until ACTIVE.

## Handoff

Audit checkpoint publication is complete separately: remote `origin/codex/code-factory-holistic-audit-remediation` points to `b4984bcc59ee5e927f1d907a5d42f31c3bf3eea8`. That branch remains an ACTIVE audit with its preserved unique commits; pushing did not merge or finish it.

Global CLI, source bundle and installed Codex/Claude harnesses are 2.6.3. This proposal changes none of them. Root remains on main. The five root untracked paths, two unmerged branches, protected audit register, archived release, and every pre-existing worktree are retained. This maintenance item is not ACTIVE or DONE.

## Work Item Protocol
```yaml
protocol_status: MATERIALIZED
approval_status: PENDING_REVIEW
review_required: true
artifact_shape: adaptive_v1
request_lane: maintenance
workflow_required: true
routing_reasons:
  - "LANE_MAINTENANCE"
escalation_reasons: []
role_applicability:
  - "{\"role\":\"developer\",\"reasons\":[\"ROLE_DEVELOPER_BOUNDED_CHANGE\"]}"
  - "{\"role\":\"qc\",\"reasons\":[\"ROLE_QC_DOD_VERIFICATION\"]}"
gate_applicability:
  - "{\"gate\":\"task_plan\",\"reasons\":[\"GATE_TASK_PLAN_BOUNDED_CHANGE\"],\"reviewer_roles\":[\"developer\"]}"
  - "{\"gate\":\"dod\",\"reasons\":[\"GATE_DOD_TECHNICAL_CLOSEOUT\"],\"reviewer_roles\":[\"qc\"]}"
work_item_slug: "cr008-legacy-blocker-disposition"
work_item_type: CHANGE
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/cr008-legacy-blocker-disposition/work-items/cr008-legacy-blocker-disposition"
current_step: "s01"
granted_write_paths: []
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "agent"
protocol_owner: ""
reviewed_by: ""
reviewed_at: ""
handoff_target: "human-review"
last_transition_action: "materialize"
last_transition_at: "2026-09-22T07:23:32.354Z"
required_actions:
  - {"id":"se:bbe49e85f96cec9dc377cac422ed9f1676d8acbdb1d21bff33e88f12696b0717","kind":"workflow_followup","text":"wfc work-item approve --work-item cr008-legacy-blocker-disposition --reviewed-by <role>"}
  - {"id":"se:f748d4e1b5dc816200464ffd6da2aac310c6eb39839b967ee2aafe85eb59ab47","kind":"gate_approval","text":"wfc gate approve --work-item cr008-legacy-blocker-disposition --gate task_plan --reviewed-by developer","gate":"task_plan"}
  - {"id":"se:3a6ed2bdfd961ca0dfa340ea0b65f4fe9e0cacb25bc4f2aaa9441a10c009cb71","kind":"work_item_activation","text":"wfc work-item activate --work-item cr008-legacy-blocker-disposition --step s07 --write-root <path>"}
blockers: []
review_notes: []
refs:
  - "work-items/closeout-bundle-legacy-dod-compatibility"
  - "work-items/terminal-archive-legacy-state-reconciliation"
  - "work-items/worktree-and-closure-integrity"
  - "work-items/cr008-legacy-blocker-disposition"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
```
