---
artifact_id: "release-workflow-bundle-v2-10-1.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-10-1"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: CHANGE
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
execution_roles:
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: ["developer"]
  contract: []
  dor: ["qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: ["devops"]
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
  task_plan_reviewed_at: "2026-11-06T09:18:18.083093Z"
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
  - "release-workflow-bundle-v2-10-1.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Release v2.10.1 — Task Plan

## Main Artifact
```yaml
tasks:
  - id: R1
    title: "Prepare version and public docs"
    owner: developer
    owned_scope: "Structured bundle metadata, CLI label, release-candidate expected version, current docs"
    owned_paths: ["workflow-bundle.manifest.json", "packages/workflow-bundle", "README.md", "README.vi.md", "docs", ".claude/CLAUDE.md"]
    verify: "Review version-only delta and helper source hash; syntax and UTF-8"
  - id: R2
    title: "Freeze and verify exact candidate"
    owner: qc
    depends_on: ["R1"]
    owned_paths: [".release-candidate/v2.10.1", "work-items/release-workflow-bundle-v2-10-1/evidence"]
    verify: "52 test files, 29 lifecycle tests, pack audit, exact Node18/22 four-way smoke, installed helper envelope"
  - id: R3
    title: "Integrate and publish"
    owner: devops
    depends_on: ["R2"]
    owned_scope: "GitHub PR, green checks, merge, immutable release and exact assets"
    verify: "Trusted DoD/Release; CI candidate payload parity; tag target; public checksum/download smoke"
dependencies: ["R1 -> R2 -> human terminal gate -> R3"]
handoff_points: ["Spec compliance then code quality review before R2", "Frozen artifact and green CI before publication"]
```

## Verification Plan
Run repository validators and existing unit/pack checks. Use the exact retained candidate for Node18/22 install/update matrix. Compare installed context helper hash against approved e41bea1. Download published bytes and recheck hash plus install smoke. No rebuild is promoted after sealing.

## Brownfield Delivery Plan
```yaml
regression_checkpoints: ["29 lifecycle cases", "52 core test files"]
compatibility_checkpoints: ["Node18/22", "4 harness/scope combinations", "48 skills"]
migration_or_backfill_steps: []
rollback_or_restore_steps: ["Preserve old immutable archive", "Use update --rollback-context before downgrade; SessionStart bug returns"]
```

## Session Handoff
All release preparation is isolated at `.worktrees/release-v2.10.1`. Existing signed fix notes are frozen. Authorize writes only to that worktree and this release work item; preserve unrelated root changes.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Explicit publication authorization", "Isolated release source", "Immutable artifact verification", "Trusted human receipts"]
blocking_items: []
owner: "developer"
next_action: "Seal readiness then execute the accepted release plan"
```
