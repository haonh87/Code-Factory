---
artifact_id: "cr008-legacy-blocker-disposition.s07.implementation"
artifact_family: workflow-step
work_item_slug: "cr008-legacy-blocker-disposition"
step_id: "s07"
step_slug: "implementation"
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
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "implementation"
  - "step-goal-contract"
  - "worktree-discipline"
  - "review-discipline"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "cr008-legacy-blocker-disposition.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> T1-T4 implementation evidence is complete: two exact entries have signed dispositions, metadata has a dated reconciliation, and early review passed. The QC decision is owned by s08; the operational T6 handoff is owned by s01.

## Step Contract

```yaml
step_goal: "Apply the accepted exact-entry maintenance plan without changing archived delivery evidence."
owner: developer
input_refs: ["Approved s06 T1-T6", "Trusted work-item and Task Plan receipts", "Six exact activation grants"]
done_when: ["T1-T4 have evidence and early review", "s08 can independently verify AC-01..05"]
```

## Main Artifact

```yaml
recommended_design: "Apply the existing signed disposition CLI to two exact parent entries, then reconcile dated finding and finish metadata."
implementation_mode: HARDENING
tasks_completed: ["T1: baseline and ownership attribution", "T2: two verified signed dispositions", "T3: dated finding/finish reconciliation", "T4: scope/preservation review and verification handoff"]
bug_repro_evidence:
  - "Parent is ARCHIVED/s08 with exactly two raw legacy blockers; finding F-CR008-ARCH-001 and metadata retain OPEN/HOLD_OPEN."
hypothesis_log:
  - assumption: "These entries are stale relative to valid parent reconciliation and archived child evidence."
    status: CONFIRMED
    evidence: "s01 baseline, unchanged parent/child report hashes, three parent terminal receipts and child DoD all signature-valid and digest-matched."
debug_experiments:
  - goal: "Confirm removal inventory has no unique ignored content."
    action: "Compare each of 462 ignored runtime files with its exact canonical source in durable Git history."
    result: "462 attributed byte-for-byte; zero unattributed. Old worktree clean, old branch 88 behind and zero ahead of current main."
tdd_evidence: []
safe_refactor_notes: ["No source-code refactor or production behavior change."]
code_changes: []
doc_changes: ["Own workflow evidence", "Parent report and CLI-managed s01 projection", "Dated CR-008 finding and finish metadata"]
config_changes: []
review_checkpoints:
  - "T1 spec compliance PASS: only six approved paths are granted; parent remains unchanged."
  - "T1 artifact quality PASS: backups and hashes are reproducible; no decision relies on old validators."
outputs_actual: ["Fresh 14-path snapshot and 462-entry ownership inventory", "Two exact-entry signed parent dispositions", "Parent ARCHIVED/s08 with zero pending entries", "Dated finding and conditional finish evidence", "s08 verification packet"]
known_limitations: ["Cleanup requires valid closeout authority, durable integration and a fresh final inventory; current progress is owned by s01/s08."]
follow_up_items: ["T5: QC DoD review and sealing", "T6: conditional durable integration and eligible local cleanup"]
notes_for_testing: "Use V1-V5 in the sealed s06; retain original snapshots and compare signed history, state, gate hosts and scope."
```

## T1 Evidence

- Owner work item: ACTIVE/s07 with exactly the six paths in sealed s06. Work-item receipt: Maintainer, 2026-09-22T07:36:46.859Z; Task Plan receipt: developer, 2026-09-22T07:36:50.028Z. Both signatures verified; ACTIVE gate check returned zero errors.
- Baseline snapshot: `/private/tmp/cf-cr008-parent-disposition-2mp1xs1h/` contains 14 original files and SHA-256 manifest, including all parent workflow hosts, parent/child reports, CR-008 metadata and this item's ACTIVE report.
- Parent report SHA-256 remains `64f67605beab120ffa4fffe8407fc5e9c900d04c5d6727c3ecddf8ebabf785cc`; child report remains `59967a9f0530ea75a401e59c94ed6a17ff9ebfa8ad28878b2bb96e99b3088a37`. Parent ARCHIVED/s08, two blockers, no required actions, no prior disposition history.
- Parent DoD, Release and Business Acceptance have valid signatures and match s08 digest `e994f4292829e77d06ba809e897c3efd6d2c6cff562b579ed1536f5e92d0cc93`. Child DoD also validates against digest `e3159a438678242069c8045058b3d1c1664fa6451207a37cec123cfb8736af2e`.
- Old workspace `.claude/worktrees/cr-008-adaptive-governance` is clean at `3cce566218fc2106e37ad29cab9806ff5821ce36`, 88 behind/zero ahead of main cf866d8. All 462 ignored paths are under generated bundle runtime trees and have byte-identical canonical files in durable Git commits; per-path ownership is in `old-worktree-inventory.json` beside the snapshot. Repeat immediately before any removal.
- The lazy s07 scaffold received the approved adaptive maintenance frontmatter during authoring, keeping developer/qc and task_plan/dod applicability identical to s04/s06. No runtime code was changed.

## T2-T4 Results And Review

| Task | Actual evidence | Result |
| --- | --- | --- |
| T2 entry 1 | Maintainer signed `cr008-legacy-20260921-f-ag11-001` at 2026-09-22T09:09:04.253Z, state `di:02fbe34b491da0943b0b79043862f7d1574166660932157dac1c6b12ee23c32a`. | Signature valid; exact raw object preserved. |
| T2 entry 2 | Fresh state ID `di:b6c00b9cc6390befa7853adcf7c56a33a8d868112a7d3ba88d2fe1bf6f4eca8c`; Maintainer signed `cr008-legacy-20260921-linked-child` at 2026-09-22T09:09:07.065Z. | Signature valid; exact raw object preserved; no duplicate operation. |
| T3 | Appended dated sections to CR-008 task-status and archive-metadata. Earlier content remains a byte-identical prefix. | Finding RESOLVED; cleanup HOLD_OPEN pending DoD and integration. |
| T4 | Verification script compares signed objects, unchanged lifecycle/events, projection boundary, protected files, receipt digests, grants and UTF-8. | PASS; 11 changed files fit six grants. |

Parent report after disposition: `111c425d97214dcf5b8720e931e6b6d32a3269bb93245de795362e51327b9761`. Status remains ARCHIVED/s08; no reopen, close or archive event was added. All three terminal receipts and the child's DoD still validate. The three signed admission records are also retained and valid.

Early review followed the required order:

1. **Spec compliance — PASS.** AC-01..05 map to the actual changes and verification. Original objects are retained, parent status/events and protected hosts are unchanged, and the diff is contained in the approved six-path boundary. The broader audit, release and other worktrees remain outside scope.
2. **Artifact quality — PASS.** Metadata clearly distinguishes release-era evidence from the current dated finding disposition. Exact operation IDs and signed history are the evidence source. The CLI changed only the parent s01 protocol projection; prose outside it is unchanged. No production code exists in this maintenance diff.

The baseline manifest has 28 untouched paths and five explicitly attributed maintenance changes: parent report, parent s01 projection, the two CR-008 metadata files, and the owning work-item report. All 19 files across the five root untracked paths remain untouched. Both protected branches retain their unique commit. Scratch verification code was adjusted for the CLI's normalized directory grant spelling and these five authorized changes; no production or acceptance rule was changed.

## Implementation Notes

```yaml
worktree_target: cr008-legacy-blocker-disposition
planning_track: quick
risk_signals: ["Multi-session work", "Signed archived-state application and later worktree handoff"]
worktree_decision: REQUIRED
decision_reason: ["Isolate live report/metadata changes from root untracked work and the stale CR-008 checkout."]
isolation_strategy:
  branch_name: codex/cr008-legacy-blocker-disposition
  worktree_path: .claude/worktrees/cr008-legacy-blocker-disposition
  owned_paths: ["Exact six-path grant in s06 Owned Scope"]
  expected_duration: "Through maintenance verification and durable integration"
execution_guards: ["Check exact current state ID before each signature", "Keep protected hosts and root dirty paths unchanged"]
skip_reason: ""
cleanup_preconditions: ["Maintenance QC DoD", "Durable integration", "Fresh clean/ancestor/per-path inventory", "No open finding or unattributed path"]
notes_for_implementation: "Keep the old workspace until all finish conditions pass; do not run git clean or force removal."
```

## Delivery Rule Evidence

```yaml
behavior_change: NO
tdd_status: NOT_REQUIRED
tdd_test_refs: []
tdd_exception_reason: "No production behavior change; this applies an existing signed protocol and updates documentation."
tdd_alternative_verify_path: ["V1 signed original-entry preservation", "V2 unchanged lifecycle/events", "V3 receipt and host hashes", "V4 scope/encoding/validators", "V5 ownership inventory"]
change_risk_profile: STANDARD
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/cr008-legacy-blocker-disposition"
worktree_reason: "Multi-session isolated maintenance"
review_status: COMPLETED
review_refs:
  - "T1 preflight review"
  - "T2-T4 Results And Review"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "After s08 QC DoD, PR integration into main with required CI and human authorization"
verify_path:
  - "s06 V1-V5"
  - "s08 AC-01..05 evidence"
```

## SDD Traceability

```yaml
requirement_refs: ["Spec Card REQ-001..005"]
acceptance_refs: ["Spec Card AC-01..05"]
task_refs: ["s06 T1-T6"]
test_refs: ["s06 V1-V5"]
```
