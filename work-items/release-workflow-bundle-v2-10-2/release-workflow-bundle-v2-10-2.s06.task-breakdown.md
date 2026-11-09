---
artifact_id: "release-workflow-bundle-v2-10-2.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-10-2"
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
execution_roles: ["developer", "qc", "devops"]
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
  task_plan_reviewed_at: "2026-11-07T15:08:28.455715+00:00"
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
  - "release-workflow-bundle-v2-10-2.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Task Plan — Verify, merge and publish

## Main Artifact
```yaml
implementation_goal: "Publish the approved update-source fix as immutable2.10.2"
task_breakdown:
  - id: R1
    owner_role: developer
    name: "Prepare release metadata and documentation"
    objective: "Set2.10.2 consistently, copy canonical fix evidence and document scope/limits"
    paths_in_scope: ["workflow-bundle.manifest.json", "packages/workflow-bundle", "README.md", "README.vi.md", "docs", ".claude/CLAUDE.md", "work-items/fix-update-source-resolution", "work-items/release-workflow-bundle-v2-10-2", "product-specs/cards/fix-update-source-resolution.md"]
    dependencies: []
    outputs_expected: ["Reviewable release diff", "Versioned release record"]
    review_checkpoint: "Production guard/helper bytes match approved fix; A3/A4 excluded"
    verification_hint: "Version/help/diff checks and public doc review"
  - id: R2
    owner_role: qc
    name: "Verify exact candidate and compatibility"
    objective: "Pack once and verify stable source plus exact artifact across both harnesses/runtimes"
    paths_in_scope: [".release-candidate/v2.10.2", "work-items/release-workflow-bundle-v2-10-2/evidence"]
    dependencies: [R1]
    outputs_expected: ["Core/audit/validator evidence", "Exact archive Node18/22 checks", "Upgrade and rollback evidence"]
    review_checkpoint: "No result inferred from old2.10.1 test archive"
    verification_hint: "Core suite, existing release smoke and installed old-cwd/downgrade regressions"
  - id: R3
    owner_role: devops
    name: "Review CI and seal release"
    objective: "Push PR, pass required checks, compare payload, prepare immutable release evidence"
    paths_in_scope: ["GitHub PR/Actions", "work-items/release-workflow-bundle-v2-10-2"]
    dependencies: [R2]
    outputs_expected: ["Green source CI", "CI payload parity", "Human DoD/Release receipts"]
    review_checkpoint: "Exact head and archive match signed evidence"
    verification_hint: "GitHub checks, artifact hash/content comparison and trusted gate validation"
  - id: R4
    owner_role: devops
    name: "Merge and publish verified bytes"
    objective: "Merge approved source, wait for main CI, publish tag/assets and validate public downloads"
    paths_in_scope: ["GitHub main/tag/release", "docs/releases/workflow-bundle-v2.10.2.md", "work-items/release-workflow-bundle-v2-10-2"]
    dependencies: [R3]
    outputs_expected: ["Published immutable release", "Public download verification", "Closed protocol and durable handoff"]
    review_checkpoint: "Preserve signed s08; record outcomes in release record and s07"
    verification_hint: "Tag ancestry; exact public checksums; installed download smoke"
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints: ["53-file baseline regression plus any release expectation changes", "Workflow validators and pack audit"]
compatibility_checkpoints: ["Node18/22", "Codex/Claude48skills", "Actual stale checkout", "Intentional rollback"]
migration_or_backfill_steps: []
rollback_or_restore_steps: ["Retain exact2.10.1; never mutate old tag/assets"]
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["User explicitly authorized merge and publication", "Approved fix 676e8f2 and trusted DoD", "Exact artifact promotion", "Known hook size limit disclosed", "No npm publication or machine rollout"]
blocking_items: []
owner: "devops"
next_action: "Seal readiness, then prepare and verify the exact release"
```

## Session Handoff
Execute R1-R4 after trusted readiness. Source changes beyond release metadata and
approved676e8f2 require a return to the owning maintenance work item.

