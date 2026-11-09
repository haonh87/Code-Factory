---
artifact_id: "fix-update-source-resolution.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "fix-update-source-resolution"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["developer", "qc", "devops"]
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: ["developer"]
  contract: []
  dor: ["qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: []
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-11-07T06:28:17.933695+00:00"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "fix-update-source-resolution.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Task Plan — Source-selection regression and fix

## Main Artifact

```yaml
implementation_goal: "Prevent stale cwd source selection and accidental backward update"
ba_lane:
  acceptance_coverage: ["AC-001 through AC-006"]
  scope_guards: ["No release or real-machine mutation", "No large-hook fix", "No new command/flag"]
  human_review_points: ["Trusted readiness", "DoD"]
dev_lane:
  path_map: ["packages/workflow-bundle/scripts/workflow-bundle-utils.js", "packages/workflow-bundle/scripts/workflow-bundle-cli.js", "packages/workflow-bundle/test/bundle-source-resolution.test.js", "packages/workflow-bundle/README.md", "packages/workflow-bundle/README.vi.md", "docs/workflow-bundle-quickstart.md", "docs/workflow-bundle-quickstart.vi.md"]
  technical_sequence: ["Failing focused regressions", "Minimal resolver and preflight guard", "Compatibility and packed verification"]
  tdd_targets: ["Implicit source must ignore stale cwd", "Refused downgrade must leave bytes and modes unchanged"]
task_breakdown:
  - id: T1
    owner_role: developer
    name: "Reproduce unsafe update as regressions"
    objective: "Capture desired selection/guard behavior before source edits"
    paths_in_scope: ["packages/workflow-bundle/test/bundle-source-resolution.test.js"]
    dependencies: []
    outputs_expected: ["Recorded RED failures"]
    review_checkpoint: "Assert public outcomes and unchanged file/mode snapshots"
    verification_hint: "Run focused node:test suite"
  - id: T2
    owner_role: developer
    name: "Fix source ownership and update preflight"
    objective: "Prefer CLI-owned source; reject unsafe versions before sync"
    paths_in_scope: ["packages/workflow-bundle/scripts/workflow-bundle-utils.js", "packages/workflow-bundle/scripts/workflow-bundle-cli.js", "packages/workflow-bundle/README.md", "packages/workflow-bundle/README.vi.md", "docs/workflow-bundle-quickstart.md", "docs/workflow-bundle-quickstart.vi.md"]
    dependencies: [T1]
    outputs_expected: ["Minimal fix", "Updated source/rollback instructions", "Focused GREEN"]
    review_checkpoint: "Spec compliance then code quality; review affected-project version checks"
    verification_hint: "Focused regressions and syntax check"
  - id: T3
    owner_role: qc
    name: "Verify compatibility and packed behavior"
    objective: "Prove the fixed artifact and supported runtime/harness combinations"
    paths_in_scope: ["work-items/fix-update-source-resolution"]
    dependencies: [T2]
    outputs_expected: ["Full regression and audit evidence", "Packed stale-cwd smoke", "s08 handoff"]
    review_checkpoint: "No real global writes or new release artifact publication"
    verification_hint: "Core suite, pack audit, Node18/22 focused verification"
dependencies_global: ["Readiness signed and scoped protocol activation"]
risk_notes: ["Root checkout is old 2.7.0; use isolated origin/main 8e4fae4 worktree"]
```

## Brownfield Delivery Plan

```yaml
regression_checkpoints: ["Focused selection/downgrade tests", "Full core suite"]
compatibility_checkpoints: ["Node18/22", "Codex/Claude", "Explicit source", "Fresh/legacy installs"]
migration_or_backfill_steps: []
rollback_or_restore_steps: ["Revert scoped source patch; use explicit install for intentional managed reinstall"]
```

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Repro uses isolated homes/projects", "Source and rollback behavior bounded", "No publication or real-installation mutation", "Trusted readiness signatures required"]
blocking_items: []
owner: "developer"
next_action: "Seal the user-requested readiness scope before source implementation"
```

## Session Handoff

Readiness packet prepared; no production code has been edited. After signing,
activate `.worktrees/fix-update-source-resolution` and execute T1 -> T2 -> T3.

