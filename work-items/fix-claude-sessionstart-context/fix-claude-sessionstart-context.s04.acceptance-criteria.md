---
artifact_id: "fix-claude-sessionstart-context.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "fix-claude-sessionstart-context"
step_id: "s04"
step_slug: "acceptance-criteria"
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
  spec_reviewed_by: ["developer"]
  spec_reviewed_at: "2026-11-06T02:53:09Z"
  dor_reviewed_by: ["qc"]
  dor_reviewed_at: "2026-11-06T02:53:09Z"
  approach_reviewed_by: []
  approach_reviewed_at: ""
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
  - "fix-claude-sessionstart-context.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Acceptance + DoR — Accepted maintenance scope

## Existing System Baseline

```yaml
current_behavior_refs: ["evidence/repro.json", "packages/workflow-bundle/scripts/workflow-session-context.js:318"]
impacted_surfaces: ["Installed Claude context.cjs stdout on SessionStart"]
compatibility_constraints: ["Direct CLI/Codex JSON remains raw", "Checkpoint hook stdout remains empty", "Node >=18 and existing safety checks remain"]
rollback_constraints: ["Revert the source commit; later installed upgrades use managed manifests"]
```

## Main Artifact

```yaml
acceptance_criteria:
  - id: AC-001
    criterion: "product-specs/cards/fix-claude-sessionstart-context.md#Acceptance Criteria.AC-001"
    verification: "Installed helper start/default-start plus startup/resume/clear/compact inputs"
  - id: AC-002
    criterion: "product-specs/cards/fix-claude-sessionstart-context.md#Acceptance Criteria.AC-002"
    verification: "Direct helper JSON and Codex compatibility checks"
  - id: AC-003
    criterion: "product-specs/cards/fix-claude-sessionstart-context.md#Acceptance Criteria.AC-003"
    verification: "Installed PreCompact/SessionEnd checkpoint and per-session cache checks"
  - id: AC-004
    criterion: "product-specs/cards/fix-claude-sessionstart-context.md#Acceptance Criteria.AC-004"
    verification: "Unicode, escaped near-budget payload, missing-context and mismatch regressions"
  - id: AC-005
    criterion: "product-specs/cards/fix-claude-sessionstart-context.md#Acceptance Criteria.AC-005"
    verification: "Native Claude with tools disabled and sentinel only in hook briefing"
```

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks: ["Bounded maintenance restoring documented SessionStart behavior", "Maintainer accepted the concrete fix and verification plan in chat", "Readiness still requires trusted signatures"]
blocking_items: []
owner: "developer"
next_action: "Seal accepted readiness and activate the scoped worktree"
```

## Definition of Ready

```yaml
status: READY
blockers: []
owners: ["developer", "qc"]
notes: ["Exact failure reproduced and fix/verification accepted", "Native live verification must not infer delivery from hook exit status"]
```

## Spec Freeze

```yaml
status: READY
requirement_ids: [REQ-001, REQ-002, REQ-003]
accepted_assumptions: ["Restore existing vendor contract; do not redesign briefing semantics"]
blockers: []
```

## SDD Traceability

```yaml
requirement_refs: [REQ-001, REQ-002, REQ-003]
acceptance_refs: [AC-001, AC-002, AC-003, AC-004, AC-005]
task_refs: [T1, T2, T3]
test_refs: ["packages/workflow-bundle/test/project-context-lifecycle.test.js"]
```

