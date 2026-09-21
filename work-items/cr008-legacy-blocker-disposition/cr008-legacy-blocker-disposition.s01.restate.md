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
spec_status: draft
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
> Proposed bounded maintenance: preserve and explicitly disposition two obsolete CR-008 blocker entries using the shipped 2.6.3 command, then verify whether its merged worktree can be removed. No live disposition, approval, lifecycle transition, or cleanup has occurred.

## Router Status

```text
Request Lane: maintenance
Current Step: s01 Clarify
Workflow Status: BLOCKED
Delivery Context: brownfield
What I Am Doing Now: Prepare the evidence and bounded execution proposal for human review.
Missing Gates: Admission reconciliation; trusted work-item approval; developer task_plan approval. Maintainer signatures are required for each future disposition, QC DoD for closeout.
Next Artifact: Supported reconciliation of the PROPOSED admission report; then s04/s06 authoring and task_plan receipt.
Next Human Action: Maintainer reviews the admission issue and exact two-entry disposition proposal; authorized reviewers later seal the applicable receipts in a human-controlled terminal.
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
  - "The materializer's needs_review proposal has no supported CLI promotion/review override in 2.6.3; the admission recovery mechanism remains unresolved."
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

The CLI generated `cr008-legacy-blocker-disposition.work-item-report.json` at 2026-09-21T13:10:10.810Z with `PROPOSED`, `PENDING_REVIEW`, `dedup_result=needs_review`. It remains unchanged. Only an s01 draft and its draft Spec Card have been authored; no later step or ACTIVE state is claimed.

| Candidate returned by the materializer | Existing ownership | Assessment |
| --- | --- | --- |
| `closeout-bundle-legacy-dod-compatibility` | Archived fix for missing legacy DoD in closeout selection | Does not own live disposition of the two entries. |
| `terminal-archive-legacy-state-reconciliation` | Archived CR-009 implementation of exact-ID disposition and archive guards | Its s08 Business Acceptance explicitly excludes live CR-008 parent disposition and worktree cleanup. This task applies that implementation. |
| `worktree-and-closure-integrity` | DONE worktree/runtime closure-integrity fixes | Different code-change boundary; no ownership of these live entries. |

Recommendation: one separate maintenance item, not a duplicate or a split request. This is an agent analysis, not a signed admission decision. The materializer uses shared request/slug tokens; all three matches have score 1.

Admission limitation: `materialize-work-item.js` has no reviewed-dedup override. Re-running against this now-existing folder produces an exact-match collision. `work-item approve` records approval but leaves `PROPOSED` unchanged, and the public action set has no `materialize-ready`/`materialize` transition. Signed `dispose-state` can resolve selected entries, but does not promote the lifecycle. Therefore signing alone is not presented as a complete recovery. Do not delete/relabel this proposal or hand-edit its report to force activation; a supported admission recovery or an explicitly approved repair boundary is still needed.

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

## Proposed Write Scope

No grant has been issued. The eventual scope requested for review is:

- `work-items/cr008-legacy-blocker-disposition/` — this item's authoring, implementation evidence and verification.
- `product-specs/cards/cr008-legacy-blocker-disposition.md` — the draft requirement/acceptance source required by the selected Light profile.
- `work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.work-item-report.json` — CLI-owned signed dispositions only.
- `work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s01.restate.md` — CLI-managed projection only.
- `changes/CR-008/execution/task-status.md` — dated resolution of F-CR008-ARCH-001 and its handoff, preserving delivery evidence.
- `changes/CR-008/archive-metadata.md` — dated branch-finish reassessment after verified disposition, preserving release facts and prior decision provenance.

The last two paths still carry OPEN/HOLD_OPEN and need attribution in the final maintenance scope; clearing only JSON blockers would leave the recorded cleanup decision stale. This does not authorize edits to the protected master finding register. Git administrative changes for conditional worktree/local merged branch removal must be recorded in the new item's s08; remote branch deletion is excluded.

## Draft Acceptance And Execution Proposal

The single requirement/acceptance owner is [the draft Spec Card](../../product-specs/cards/cr008-legacy-blocker-disposition.md). Verification links for review:

| Card criterion | Proposed verification |
| --- | --- |
| AC-01 | Compare resolved-history original_entry objects; verify signatures and operation uniqueness. |
| AC-02 | Inspect live parent protocol status, pending collections and event history. |
| AC-03 | Before/after gate-host hashes and read-only trusted gate status. |
| AC-04 | Scope review of dated CR-008 metadata reconciliation. |
| AC-05 | Scoped diff, UTF-8/workflow validators, ancestor/status check and per-path ignored-file comparison. |

Options: keep the worktree indefinitely (safe but leaves misleading state), or use the shipped signed disposition flow and verify cleanup eligibility (recommended). Hand-deleting legacy entries is rejected because it destroys disposition provenance.

Proposed sequence after admission and authoring approval:

1. Materialize the required Light authoring notes using the supported recovery path once decided. Reference the Spec Card from s04 and transfer the bounded approach/plan into s06. Seal only applicable work-item/task_plan authority, establish exact grants, and activate this item before target writes.
2. Capture fresh parent report bytes, original entries, history count and gate-host hashes. Check no other worktree has changed those paths. Keep all target edits in this worktree based on main.
3. Maintainer uses `wfc work-item dispose-state` for entry 1 after checking its current exact ID. Suggested operation ID: `cr008-legacy-20260921-f-ag11-001`. Suggested reason: "Superseded by transaction 597aa5f9-1043-447e-b762-b6a7858f1b9c, receipt-backed reconciliation at 2026-09-15T06:47:56Z, and subsequent DONE/ARCHIVED events; retain original entry in signed history."
4. Re-read `wfc work-item status --work-item adaptive-governance-human-approval-ux --json`. Review the remaining entry and its NEW ID; do not reuse the initial second ID. Maintainer signs entry 2 with operation ID `cr008-legacy-20260921-linked-child`. Suggested reason: "Superseded by linked child closeout-bundle-repeat-cycle-reconciliation closing after AC-RCR-08 and archiving on 2026-09-16; current child DoD is approved and no child blockers remain."
5. If the CLI reports projection-refresh failure after committing, preserve the executed state ID/reason and retry the identical operation ID. Validate exactly one history record per operation. Stop on conflicts or unexpected source changes.
6. Review spec/scope compliance then artifact quality. Reconcile only the dated CR-008 finding and finish metadata within the approved scope; preserve the earlier evidence. Record implementation evidence in the new s07.
7. Run AC-01..05, author s08, and obtain QC DoD. No production behavior changes are planned, so TDD, build and broad code/security scans are not applicable; retain signed-history validation, targeted runtime validators and preservation checks.
8. Integrate and preserve the verified maintenance result before removing the old workspace. Recheck the CR-008 branch has zero unique commits and its worktree is clean. Re-inventory ignored files and compare them to their canonical sources. If any file is unattributed or different, stop cleanup and preserve it. Remove only the eligible CR-008 worktree; delete its merged local branch only if the recorded finish decision allows it. Keep this proposal worktree until its own finish decision passes.

No executable signing step is opened by this draft. The normal runtime requires a human-controlled TTY and existing Maintainer key; the agent must not collect the passphrase in chat or use fixture mode. A new blocker requiring source-code changes needs its own approved repair scope, not an unrecorded expansion of this maintenance item.

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
  - "Read-only evidence review and draft this maintenance proposal"
blocked_actions:
  - "Remove the CR-008 worktree or branch while F-CR008-ARCH-001 lacks signed live disposition and approved handoff"
cleanup_sequence: []
merge_conditions:
  - "New maintenance s08 DoD and verified durable handoff"
residual_risks:
  - "Two live parent blockers; admission recovery unresolved; new maintenance gates unsealed"
final_recommendation: HOLD_OPEN
notes_for_closeout: "PASS entries describe the existing archived CR-008 delivery only, not this maintenance proposal."
```

## Open Questions

```yaml
open_questions:
  - id: OQ-01
    owner: maintainer
    question: "Which supported recovery will promote the needs_review PROPOSED report without rewriting control state or discarding the proposal?"
    status: OPEN
missing_inputs:
  - "Signed new work-item/task_plan approval after admission and complete authoring"
  - "Human-controlled Maintainer execution of both disposition operations"
conflicts:
  - "The 2.6.3 materializer can create this proposal, but has no exposed reviewed-dedup promotion action."
```

## SDD Traceability

```yaml
requirement_refs:
  - "User-approved maintenance proposal and original path-preservation instructions"
acceptance_refs:
  - "product-specs/cards/cr008-legacy-blocker-disposition.md: AC-01..AC-05"
task_refs:
  - "Draft sequence 1..8; transfer to s06 after admission"
test_refs:
  - "Read-only gate status, raw report hashes, protocol-state review and preservation snapshot"
```


## Preparation Verification

- `wfc validate --workflow-root work-items/cr008-legacy-blocker-disposition`: PASS, one note (naming and governance).
- `wfc plan` and `wfc exec` with the same root: PASS, one note each.
- `wfc sdd` with the same root: PASS, one note linked to the draft Spec Card.
- `wfc protocol --workflow-root work-items`: PASS, 19 protocol-managed items; 21 legacy scaffolds skipped by existing policy.
- UTF-8 decoding and preservation hash comparison: PASS. All 33 captured files remained byte-identical, including the generated admission report, archived parent files, CR-008 metadata, protected master register and 19 files in the five root untracked paths.
- Initial checks identified a missing generated protocol projection and draft Spec Card; both authoring omissions were corrected without changing report state. The checks above are the final results.
- No production code changed. No live signature, disposition or cleanup test was attempted; the remaining admission and human authority requirements still block implementation. These preparation checks are not s08 DoD.

## Handoff

Audit checkpoint publication is complete separately: remote `origin/codex/code-factory-holistic-audit-remediation` points to `b4984bcc59ee5e927f1d907a5d42f31c3bf3eea8`. That branch remains an ACTIVE audit, two commits ahead of main; pushing did not merge or finish it.

Global CLI, source bundle and installed Codex/Claude harnesses are 2.6.3. This proposal changes none of them. Root remains on main. The five root untracked paths, two unmerged branches, protected audit register, archived release, and every pre-existing worktree are retained. This maintenance item is not ACTIVE or DONE.

## Work Item Protocol
```yaml
protocol_status: PROPOSED
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
current_step: ""
granted_write_paths: []
materialization_status: PROPOSED
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
handoff_target: "human-clarify"
last_transition_action: "propose"
last_transition_at: "2026-09-21T13:10:10.810Z"
required_actions:
  - {"id":"se:6e883e07166ee862060dea9ecc18843de5470cbc581eed5dd539b9cc61fac453","kind":"workflow_followup","text":"Làm rõ scope để chốt single hay split."}
  - {"id":"se:2b1b5b8d31cf90ea804bd2af3187717ac96e6d874b3533a3d603a1f93fd78f86","kind":"workflow_followup","text":"Review existing work-items/changes trước khi scaffold."}
blockers:
  - {"id":"se:db2ddb0d5e7ac10cb949c301bc1cd22f1169197fec13e4d4c6e4d22a3eb361e3","kind":"delivery_blocker","text":"Có work item gần nghĩa cần review: closeout-bundle-legacy-dod-compatibility, terminal-archive-legacy-state-reconciliation, worktree-and-closure-integrity"}
review_notes: []
refs:
  - "work-items/closeout-bundle-legacy-dod-compatibility"
  - "work-items/terminal-archive-legacy-state-reconciliation"
  - "work-items/worktree-and-closure-integrity"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
```
