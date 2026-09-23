---
artifact_id: "cr008-legacy-blocker-disposition.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "cr008-legacy-blocker-disposition"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "cr008-legacy-blocker-disposition.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Evidence and scope are ready for bounded maintenance planning. The required human gates are work-item approval, developer Task Plan and later QC DoD. The user accepted this readiness evidence as part of the a00ce83 Task Plan review; omitted gates remain not_applicable.

## Step Contract

```yaml
step_goal: "Define verifiable maintenance acceptance against the unchanged archived CR-008 baseline."
owner: developer
inputs: ["s01 signed admission review", "Spec Card REQ-001..005 and AC-01..05"]
done_when: ["Each criterion has a verification path", "Preservation and authority constraints are explicit"]
```

## Existing System Baseline

```yaml
current_behavior_refs:
  - "main cf866d82077a13d77e63fe63548a8800a378ced3 contains the verified proposal-recovery command from PR #10."
  - "CR-008 parent adaptive-governance-human-approval-ux is ARCHIVED/s08 with two opaque legacy blockers and zero required actions."
  - "Parent report SHA-256: 64f67605beab120ffa4fffe8407fc5e9c900d04c5d6727c3ecddf8ebabf785cc; checked again 2026-09-22."
  - "Linked child closeout-bundle-repeat-cycle-reconciliation is ARCHIVED without pending state; SHA-256: 59967a9f0530ea75a401e59c94ed6a17ff9ebfa8ad28878b2bb96e99b3088a37."
  - "The exact original objects, reconciliation transaction, terminal receipts and initial IDs are owned by s01 Existing System Baseline And Per-entry Disposition."
impacted_surfaces:
  - "Parent protocol report and its CLI-owned s01 projection"
  - "CR-008 task-status finding F-CR008-ARCH-001 and archive-metadata finish assessment"
compatibility_constraints:
  - "Preserve ARCHIVED/s08, protocol event history, original blocker objects, and all parent s04-s08 host bytes."
  - "Preserve terminal DoD, Release and Business Acceptance signatures and artifact digests."
  - "Global/source package version remains 2.6.3; this maintenance does not publish or reinstall the source repair."
rollback_constraints:
  - "Take byte snapshots before disposition; do not erase already signed history or reuse an operation ID with different intent."
  - "Stop on unexpected state; same-intent retry may repair the projection. Any other correction requires a separately reviewed disposition."
```

## Main Artifact

The [Spec Card](../../product-specs/cards/cr008-legacy-blocker-disposition.md) owns requirement and acceptance wording. The entries below provide execution evidence mappings.

```yaml
acceptance_criteria:
  - id: AC-01
    criterion: "Spec Card AC-01 / REQ-001"
    verification: "Compare two new history.original_entry objects with captured originals; verify both trusted signatures and unique operation IDs."
  - id: AC-02
    criterion: "Spec Card AC-02 / REQ-002"
    verification: "Compare parent lifecycle, current step and protocol_events before/after; assert zero pending blockers/actions."
  - id: AC-03
    criterion: "Spec Card AC-03 / REQ-003"
    verification: "Compare s04-s08 SHA-256 values; read DoD, Release and Business Acceptance status and signature/digest validity."
  - id: AC-04
    criterion: "Spec Card AC-04 / REQ-004"
    verification: "Review the dated finding and finish assessments against both actual signed operations and this work item's s08 evidence."
  - id: AC-05
    criterion: "Spec Card AC-05 / REQ-005"
    verification: "Compare diff against six approved path entries; run applicable workflow and UTF-8 checks; require fresh per-path attribution, clean Git state, no unique commits and durable integration before cleanup."
edge_cases:
  - "After each report mutation, recompute the remaining entry's snapshot-bound ID."
  - "If projection refresh fails after the atomic disposition, retry the identical operation ID and intent."
  - "If target bytes, receipt validity or ownership change, stop the corresponding task and refresh evidence."
  - "An ignored or untracked path without a byte-identical durable owner prevents worktree removal."
out_of_scope:
  - "Production code, signer or receipt format, release, remote branch deletion"
  - "Protected holistic audit register, CF-004 pair, scratch files and other worktrees"
done_when:
  - "AC-01..05 have evidence and QC has explicitly passed DoD; cleanup remains conditional on its separate finish checks."
behavioral_invariants:
  - "Apply the existing exact-ID contract; no new production behavior."
  - "No silent blocker deletion, manufactured lifecycle event, or inference that a plan draft passes Task Plan."
```

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "PASS: developer/qc maintenance lane, stable role/gate reasons, and omitted business/release gates retained."
  - "PASS: admission concerns have three signature-verified Maintainer dispositions; recovery is MATERIALIZED/s01."
  - "PASS: parent and child baseline hashes still match the reviewed evidence."
blocking_items:
  - "Work-item approval and developer Task Plan receipt are pending before ACTIVE."
owner: developer
next_action: "Review s06, then obtain only the applicable readiness receipts."
```

## Definition of Ready

```yaml
work_item_slug: cr008-legacy-blocker-disposition
status: READY
checks:
  restated_request_clear: PASS
  business_goal_clear: PASS
  scope_defined: PASS
  open_questions_non_blocking: PASS
  acceptance_criteria_testable: PASS
  dependencies_known: PASS
  verification_direction_present: PASS
blocking_gaps: []
accepted_assumptions:
  - "Every selected raw entry and snapshot-bound ID is checked immediately before signing."
residual_risks:
  - "A human-controlled TTY is needed for each parent disposition."
  - "Fresh attribution may require retaining the old worktree."
next_action: "Review the s06 plan and seal required work-item/task_plan authority before implementation."
```

READY is an input-readiness assessment. The adaptive lane marks the DoR gate not_applicable; no human DoR approval is claimed or requested.

## Spec Freeze

```yaml
status: READY
requirement_ids: ["REQ-001", "REQ-002", "REQ-003", "REQ-004", "REQ-005"]
accepted_assumptions: ["ASM-001: refresh evidence after any snapshot change"]
blockers: []
```

The Spec Card is baselined by the explicit Task Plan decision at a00ce83. The adaptive Spec gate is not_applicable; this section adds no Spec gate or claimed receipt.

## SDD Traceability

```yaml
requirement_refs: ["product-specs/cards/cr008-legacy-blocker-disposition.md#Requirements"]
acceptance_refs: ["product-specs/cards/cr008-legacy-blocker-disposition.md#Acceptance Criteria"]
task_refs: ["cr008-legacy-blocker-disposition.s06.task-breakdown.md#Main Artifact"]
test_refs: ["s06 Verification Plan: V1..V5"]
```
