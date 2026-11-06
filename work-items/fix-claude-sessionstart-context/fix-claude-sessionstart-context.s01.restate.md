---
artifact_id: "fix-claude-sessionstart-context.s01.restate"
artifact_family: workflow-step
work_item_slug: "fix-claude-sessionstart-context"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
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
  card: "product-specs/cards/fix-claude-sessionstart-context.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec: ["developer"]
  dor: ["qc"]
  approach: ["developer"]
  task_plan: ["developer"]
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Clarify — Restore Claude SessionStart context

The user reported a reproducible defect in published 2.10.0 and explicitly said
`accept, hãy fix` after reviewing the diagnosis, envelope and three-level verification plan.
The recording time in gate metadata is not a reconstructed chat timestamp.

## Governance Context

```yaml
governance_ref: "project-context/project-context.md"
applicable_principles: ["Smallest bounded maintenance lane", "Human acceptance with trusted receipts", "Failing regression before production edits"]
required_reviews: ["developer: implementation", "qc: verification and DoD"]
prohibited_actions: ["Publish or mass-update downstream projects without a separate rollout decision"]
open_governance_questions: []
```

## Main Artifact

```yaml
raw_request: "accept, hãy fix the confirmed Claude SessionStart briefing defect"
restated_request: "Restore delivery of the existing briefing through the documented hook output format"
request_type: BUG
request_lane: maintenance
scope_ref: "product-specs/cards/fix-claude-sessionstart-context.md#Business Goal"
constraints_initial: ["Baseline d9e2103 contains published 2.10.0 source", "Source fix and tests only; release and 26-project rollout are separate"]
assumptions_initial: ["Reported 26-project scope is user evidence, not an independently audited inventory"]
open_questions_initial: []
dependencies_initial: ["Installed Claude executable and authentication for native observation"]
risks_initial: ["Exit zero can be mistaken for model receipt", "JSON escaping expands the hook envelope"]
```

## Business Goal

```yaml
business_goal: "Claude receives canonical project context and active handoff automatically at SessionStart"
success_metrics: ["Hook-format regression passes", "A fresh tool-disabled Claude session can reproduce a hook-only sentinel"]
non_goals: ["Change policy, approval semantics, companion or dependency versions", "Publish or update real downstream projects"]
```

## Open Questions

```yaml
open_questions: []
missing_inputs: []
conflicts: []
```

## Materialization Decision

Single BUG `fix-claude-sessionstart-context`; change strategy `none`. Existing CR-013
introduced and published this functionality and is DONE; this item repairs its output
adapter without reopening signed history. A3–A4 concerns execution/review evidence and
is unrelated. Searches found no existing work item owning this defect. Light/quick
is appropriate: brownfield, medium risk, two production/test paths, no public schema
change (restore vendor contract), security boundary change, migration or release.
The user-approved plan is recorded here; no chat decision is represented as a receipt.

## Reproduction

`evidence/repro.json` was produced from the retained published archive with checksum
`aa0b87b9c80f621fd073dfa602925a1894b46cf36b6e88661491fac6aaa8ae6b`.
Its helper matches tag commit `34d8b61`. Hook start returned zero and raw JSON with
no `hookSpecificOutput`; both checkpoint events and direct Codex JSON passed.
The existing 25 lifecycle tests also passed. Vendor contract:
https://code.claude.com/docs/en/hooks#sessionstart-decision-control

## Session Handoff

Scope/design/verification were accepted in chat. Prepare trusted receipt sealing,
then activate only the dedicated worktree and this item's implementation/evidence
paths. Do not alter original CR-013 signed notes.

## SDD Traceability

```yaml
requirement_refs: [REQ-001, REQ-002, REQ-003]
acceptance_refs: [AC-001, AC-002, AC-003, AC-004, AC-005]
task_refs: [T1, T2, T3]
test_refs: ["packages/workflow-bundle/test/project-context-lifecycle.test.js"]
```

## Work Item Protocol
```yaml
protocol_status: DONE
approval_status: APPROVED
review_required: true
work_item_slug: "fix-claude-sessionstart-context"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/fix-claude-sessionstart-context"
current_step: "s08"
granted_write_paths:
  - ".worktrees/fix-claude-sessionstart-context"
  - "work-items/fix-claude-sessionstart-context/fix-claude-sessionstart-context.s07.implementation.md"
  - "work-items/fix-claude-sessionstart-context/fix-claude-sessionstart-context.s08.verification.md"
  - "work-items/fix-claude-sessionstart-context/evidence"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "coordinator"
protocol_owner: "developer"
reviewed_by: "maintainer"
reviewed_at: "2026-11-06T06:50:18.931Z"
handoff_target: "archive-lifecycle"
last_transition_action: "close"
last_transition_at: "2026-11-06T07:14:02.670Z"
required_actions:
  - {"id":"se:59c625c9768efc1c74009edec61fad2b0b44dcef89d4e849bad61d9efcc03194","kind":"workflow_followup","text":"Review and continue workflow backbone s01 -> s08."}
  - {"id":"se:5702c18bf4f1f0192b4f045972ef61a3f761115aaef1fd6290e5e2dd59849e71","kind":"workflow_followup","text":"Archive the work item when all downstream lifecycle actions are complete."}
blockers: []
review_notes:
  - "Maintainer explicitly accepted the diagnosed SessionStart fix and verification plan in chat."
refs:
  - "work-items/fix-claude-sessionstart-context"
audit_events:
  - "REPORT_BOOTSTRAPPED"
  - "WORK_ITEM_APPROVED"
  - "READINESS_BUNDLE_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "VERIFICATION_CONFIRMED"
  - "DONE_CONFIRMED"
```

