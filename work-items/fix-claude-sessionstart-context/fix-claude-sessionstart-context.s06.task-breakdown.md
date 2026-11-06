---
artifact_id: "fix-claude-sessionstart-context.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "fix-claude-sessionstart-context"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
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
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-11-06T02:53:09Z"
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-11-06T02:53:09Z"
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "fix-claude-sessionstart-context.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Task Plan — Accepted fix and verification

## Main Artifact

```yaml
implementation_goal: "Deliver the existing briefing through the documented SessionStart envelope"
task_breakdown:
  - id: T1
    owner_role: developer
    name: "Pin installed helper output contract"
    objective: "Add regressions that fail on the published raw-hook output"
    paths_in_scope: ["packages/workflow-bundle/test/project-context-lifecycle.test.js"]
    dependencies: []
    outputs_expected: ["Recorded failing hook envelope and transport-budget assertions"]
    review_checkpoint: "Check assertions against AC-001..004 before fixing source"
    verification_hint: "node --test packages/workflow-bundle/test/project-context-lifecycle.test.js"
  - id: T2
    owner_role: developer
    name: "Repair hook output adapter"
    objective: "Emit the SessionStart envelope while preserving raw CLI, silent checkpoint and bounded output"
    paths_in_scope: ["packages/workflow-bundle/scripts/workflow-session-context.js", "packages/workflow-bundle/test/project-context-lifecycle.test.js"]
    dependencies: [T1]
    outputs_expected: ["Minimal adapter fix", "Passing installed-helper regression suite"]
    review_checkpoint: "Review spec compliance then code quality"
    verification_hint: "Run lifecycle suite, syntax check and full discovered unit suite"
  - id: T3
    owner_role: qc
    name: "Verify actual consumer delivery and packaging"
    objective: "Observe the briefing-only sentinel in tool-disabled Claude and verify a local package install"
    paths_in_scope: ["work-items/fix-claude-sessionstart-context"]
    dependencies: [T2]
    outputs_expected: ["Native consumer evidence", "Installed package check", "s08 verification handoff"]
    review_checkpoint: "Do not infer model receipt from exit zero or CLAUDE.md fallback"
    verification_hint: "Isolated Claude session with tools disabled; local tarball install/output checks; scoped validators"
```

## Option Analysis

```yaml
options:
  - "A: documented hookSpecificOutput envelope; explicit consumer contract, stable CLI; account for JSON escaping in byte budget"
  - "B: prefix JSON with plain text; smaller delta, but relies on implicit text fallback"
recommended_option: "A: accepted by the maintainer"
trade_offs: ["Keep collection and cache unchanged except serialization-aware output accounting"]
```

## Technical Approach

```yaml
recommended_approach: "Wrap only hook start with hookEventName SessionStart and a string additionalContext containing the serialized existing briefing"
why: "Matches the documented Claude consumer contract without changing direct callers"
boundaries: ["Output serializer and its byte-budget checks", "Installed-helper tests"]
failure_behavior: ["Invalid input remains stderr/nonzero with no successful envelope", "Missing context and selection-required states remain visible inside additionalContext"]
```

## Brownfield Impact Analysis

```yaml
impacted_modules: ["workflow-session-context output adapter"]
compatibility_risks: ["Double-escaped JSON expands stdout", "Test-only formatting assertions can miss live consumer delivery"]
migration_notes: ["No data migration; future managed installer update replaces helper bytes"]
rollback_notes: ["Revert the two-file code/test patch; retain diagnostic evidence"]
```

## Verification Plan

Run RED then GREEN on installed helper subprocesses; retain plain CLI/quiet checkpoint
regressions and test Unicode, JSON escaping and output bounds. Run the complete core
unit suite, scoped governance/SDD validators and a tarball install/output smoke.
Run a native Claude session in an isolated fixture with tools disabled, no instruction
fallback and an unpredictable sentinel present only in the briefing. Record exact
Claude/Node versions and any native test limitation. No package publication or fleet
update is included.

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks: ["Bounded maintenance restoring documented SessionStart behavior", "Maintainer accepted the concrete fix and verification plan in chat", "Readiness still requires trusted signatures"]
blocking_items: []
owner: "developer"
next_action: "Seal accepted readiness and activate the scoped worktree"
```

## Brownfield Delivery Plan

```yaml
regression_checkpoints: ["Installed lifecycle regression", "Core unit suite"]
compatibility_checkpoints: ["Direct Codex JSON", "Quiet checkpoint", "Node >=18 syntax"]
migration_or_backfill_steps: []
rollback_or_restore_steps: ["Revert source patch; managed installer handles future deployed rollback"]
```

## SDD Traceability

```yaml
requirement_refs: [REQ-001, REQ-002, REQ-003]
acceptance_refs: [AC-001, AC-002, AC-003, AC-004, AC-005]
task_refs: [T1, T2, T3]
test_refs: ["packages/workflow-bundle/test/project-context-lifecycle.test.js"]
```

## Session Handoff

Execute T1→T2→T3 after trusted readiness and CLI activation. The user accepted the
previous diagnosis, proposed JSON envelope and verification scope. Use branch
`fix/claude-sessionstart-context` at `.worktrees/fix-claude-sessionstart-context`;
base `d9e2103` has the published 2.10.0 code. Keep the branch for review/integration.
