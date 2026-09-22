---
artifact_id: "cr008-legacy-blocker-disposition.s08.verification"
artifact_family: workflow-step
work_item_slug: "cr008-legacy-blocker-disposition"
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
  - "testing"
  - "step-goal-contract"
  - "definition-of-done-gate"
  - "branch-finish-discipline"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "cr008-legacy-blocker-disposition.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Technical evidence supports all five maintenance criteria. Human QC DoD is pending; no cleanup or integration is inferred from this verification draft.

## Step Contract

```yaml
step_goal: "Verify the two signed dispositions, unchanged archived evidence and bounded finish readiness for QC review."
owner: qc
inputs: ["Approved Spec Card and s06", "s07 implementation and two-tier review", "Original byte snapshots and signed history"]
done_when: ["AC-01..05 have reproducible evidence", "QC explicitly decides DoD", "Branch/worktree finish conditions are distinct from delivery verification"]
```

## Main Artifact

```yaml
verification_scope:
  - "Exactly two parent dispositions, CLI projection, dated metadata and owning workflow artifacts"
  - "Preservation of historical gate hosts, receipts, original entries and unrelated working state"
evidence_refs:
  - "s07 T1 and T2-T4 Results And Review"
  - "Parent report resolved_state_history: two exact signed operations"
  - "CR-008 dated task-status and archive-metadata reconciliation"
  - "/private/tmp/cf-cr008-parent-disposition-2mp1xs1h: baseline, inventory and verification.json"
summary_verdict: PASS
```

## Verification Results

| Check | Result | Evidence |
| --- | --- | --- |
| V1 original entries/signatures | PASS | Exactly two new distinct history records; both Maintainer signatures verify against the real trusted public key and both original objects match T1. Three admission signatures also remain valid. |
| V2 lifecycle and projection | PASS | Parent remains ARCHIVED/s08, zero blockers/actions; every other raw report field, including protocol_events, is unchanged. Parent prose outside the CLI projection is unchanged. |
| V3 historical evidence | PASS | Nine protected workflow files in the snapshot remain byte-identical, including parent s04-s08 and the child report. Parent DoD/Release/Business Acceptance and child DoD are signature-valid and digest-matched. |
| V4 scope and text | PASS | 11 changed files fit exactly six granted path entries; UTF-8/no BOM and whitespace checks pass. Historical CR-008 metadata remains a byte-identical prefix; the dated disposition is appended. |
| V5 workspace attribution | PASS for readiness | Old workspace is clean, 88 commits behind/zero ahead of main cf866d8; all 462 ignored runtime paths have byte-identical canonical owners in durable Git history. Repeat immediately before removal after DoD and integration. |

The approved s06 defines AC-05 cleanup as conditional: no removal may occur before QC DoD, durable integration and fresh per-path verification. The current HOLD_OPEN decision enforces that condition; this evidence does not claim removal has happened.

The original 33-path preservation manifest now has 28 unchanged paths and five authorized changes owned by this maintenance item: its report, the parent report and s01 projection, and the two CR-008 metadata files. All original root untracked files and the protected master register remain untouched. `backup/local-main-2026-09-16` and `evals/behaviour-axis` each retain one unique commit and are excluded from cleanup.

## Commands And Reproduction

Use Node 22 and this updated worktree. The scratch verifier is read-only apart from its scratch result JSON.

```bash
node /private/tmp/cf-cr008-parent-disposition-2mp1xs1h/verify.cjs
node packages/workflow-bundle/bin/wfc.js validate --workflow-root work-items --project-root .
node packages/workflow-bundle/bin/wfc.js sdd --workflow-root work-items --project-root .
node packages/workflow-bundle/bin/wfc.js exec --workflow-root work-items --project-root .
node packages/workflow-bundle/bin/wfc.js plan --workflow-root work-items --project-root .
node packages/workflow-bundle/bin/wfc.js protocol --workflow-root work-items --project-root .
node packages/workflow-bundle/bin/wfc.js change --workflow-root work-items --project-root .
git diff --check
```

The owner report controls the six grants. Reproduce V1 by validating each signed intent with `verifyRecordedDisposition`; reproduce V2 by comparing the captured original report with the current report excluding only blockers and resolved_state_history. Compare parent s04-s08 bytes directly against main cf866d8. For each old ignored runtime path, remove `packages/workflow-bundle/runtime/<harness>/` to find its canonical source (`AGENTS.global.md` maps to `policies/codex/AGENTS.global.md`); compare bytes with the owning commit recorded by T1. This keeps the evidence reproducible from Git even if temporary snapshots are later unavailable.

## Required Checks And Applicability

- PASS: full workflow naming checks 280 files and governance checks 276 notes; SDD checks 57 notes; planning and execution each check 276 notes; protocol checks 20 managed items with 21 permitted legacy skips; change checks 58 notes. Existing legacy CHANGE-001/002 vocabulary warnings do not fail validation and are outside this scope.
- Direct signature/history checks, actual CLI application, exact scope, preservation, UTF-8 and whitespace checks are required and passed.
- Unit tests, production lint/typecheck/build, broad security scanners, container/deploy and runtime performance checks are not applicable to this documentation/protocol-application diff. No source, dependency, schema or production behavior changes were made. The cryptographic signature checks remain required and passed.
- The earlier release's disclosed scanner limitations remain historical facts; this maintenance does not relabel them as scanner passes or reopen the release.

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "PASS: explicit Work Item and Task Plan decisions have valid trusted receipts; exact six-path activation precedes parent writes."
  - "PASS: each parent entry has its own human-controlled Maintainer signature."
  - "PASS: early spec compliance precedes artifact-quality review; no delegation or source-code scope expansion."
  - "PASS: protected release/gate evidence and unrelated paths are retained."
blocking_items: ["QC DoD decision and trusted receipt pending"]
owner: qc
next_action: "Review this concrete evidence, explicitly decide DoD, then seal its trusted receipt; operational integration/cleanup remains conditional."
```

## Regression & Compatibility Summary

```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
```

This uses the existing CLI contract. Parent state remains ARCHIVED/s08 and original entries are preserved verbatim inside signed history. No historical gate is resealed. Before a failed preflight, stop without target writes; after an applied signed disposition, preserve the history and use identical-intent retry for projection repair. Arbitrary report reset is not a rollback strategy. A different correction would require explicit reviewed authority.

## Spec Coverage

```yaml
status: PASS
coverage:
  - id: AC-01
    status: PASS
    evidence: "V1: two distinct signed history records preserve both exact original entries."
  - id: AC-02
    status: PASS
    evidence: "V2: ARCHIVED/s08, zero pending entries, no lifecycle/event mutation."
  - id: AC-03
    status: PASS
    evidence: "V3: unchanged gate hosts; three parent terminal receipts and child DoD remain valid."
  - id: AC-04
    status: PASS
    evidence: "T3 and V4: dated finding resolution and conditional finish reassessment retain prior release evidence and link the maintenance handoff."
  - id: AC-05
    status: PASS
    evidence: "V4-V5: exact grants, encoding/validators and full ownership inventory; HOLD_OPEN enforces DoD/integration/fresh-check prerequisites."
summary: {total: 5, pass: 5, fail: 0, partial: 0}
```

## Definition of Done

```yaml
work_item_slug: cr008-legacy-blocker-disposition
status: BLOCKED
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: ["QC human decision and trusted DoD receipt are pending."]
residual_risks:
  - "The old-worktree inventory must be repeated immediately before removal."
  - "Until integration, the signed maintenance result is not yet durable on main."
follow_up_items: ["T6 conditional PR integration and local cleanup after QC DoD"]
next_action: "QC reviews the evidence and explicitly decides DoD; do not self-declare DONE."
```

## Audit

```yaml
finish_target: "codex/cr008-legacy-blocker-disposition and old codex/adaptive-governance-human-approval-ux workspace"
workspace_kind: BOTH
verify_inputs: ["V1-V5", "s07 two-tier review", "Signed exact-entry history"]
finish_gate_checks:
  verify_complete: PASS
  dod_complete: PENDING
  findings_closed: PASS
  exceptions_resolved: PASS
allowed_actions: ["Commit verification evidence", "Request QC DoD review"]
blocked_actions: ["Merge or clean up before QC DoD", "Delete any remote branch or unrelated workspace"]
cleanup_sequence:
  - "Seal and verify maintenance QC DoD; close protocol with no remaining blockers."
  - "Integrate the maintenance branch through an authorized PR with required CI passing."
  - "Refresh the old workspace's zero-ahead, clean and 462-path attribution checks."
  - "Remove only the eligible old CR-008 worktree, then its merged local branch if allowed."
  - "Retain this maintenance workspace until its own finish decision is executed."
merge_conditions: ["QC DoD receipt", "Human integration authority", "Required CI pass"]
residual_risks: ["A changed, unique or unattributed file requires HOLD_OPEN and preservation."]
final_recommendation: HOLD_OPEN
notes_for_closeout: "This work item establishes removal readiness; actual removal is a guarded post-DoD operation under T6."
```

## SDD Traceability

```yaml
requirement_refs:
  - "Spec Card REQ-001..005"
acceptance_refs:
  - "Spec Card AC-01..05"
task_refs:
  - "s06 T1-T6; s07 T1-T4 actual evidence"
test_refs:
  - "V1-V5 and Commands And Reproduction"
```
