---
artifact_id: "recover-proposals-with-new-change.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "recover-proposals-with-new-change"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
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
  srs: "product-specs/srs/recover-proposals-with-new-change.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["developer", "qc"]
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
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: []
  dod: []
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
  task_plan_reviewed_at: "2026-10-15T08:31:25Z"
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
  - "recover-proposals-with-new-change.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.

## Step Contract
```yaml
step_goal: "Prepare s06 for human review"
input_summary: ["Accepted scope", "main 54243b7", "product-specs/srs/recover-proposals-with-new-change.md"]
output_summary: ["Reviewable s06 proposal"]
done_when: ["Content reviewed; applicable human gates recorded separately"]
owner: "developer"
```

## Main Artifact
```yaml
implementation_goal: "Implement AC-RC-01 through AC-RC-07 with preserved human authority."
ba_lane:
  acceptance_coverage: ["SRS owns AC-RC-01 through AC-RC-07"]
  scope_guards: ["create_new full only", "No release publication"]
  human_review_points: ["Spec/DoR", "Approach", "Task Plan", "DoD"]
dev_lane:
  path_map: ["packages/workflow-bundle/scripts/materialize-work-item.js", "packages/workflow-bundle/scripts/scaffold-change-package.js", "packages/workflow-bundle/test/materialize-work-item.test.js", "packages/workflow-bundle/test/scaffold-change-package.test.js", "skills/orchestration/codex-workflow-chain/references/work-item-materialization.md", "skills/orchestration/codex-workflow-chain/references/work-item-materialization.vi.md"]
  technical_sequence: ["T1", "T2", "T3", "T4"]
  tdd_targets: ["Eligible create_new", "Conflict refusal", "Partial-write retry", "Concurrent claims"]
task_breakdown:
  - id: T1
    owner_role: developer
    name: "Add isolated signed create_new fixtures in materializer tests; run and capture correct red failure."
    verify: "Valid candidate fails none-only guard; fixture signatures valid. AC-RC-01/02."
  - id: T2
    owner_role: developer
    name: "Extract pure full-change preparation and extend recovery validation/ownership/write sequence in the two scripts."
    verify: "Canonical output equals ordinary scaffold; AC-RC-01/02/03/06 tests green; review spec compliance then quality."
  - id: T3
    owner_role: developer
    name: "Add fault injection and subprocess competing-claim tests in materializer tests."
    verify: "AC-RC-03/04/05; all failure boundaries and same/conflicting retries; review invariants."
  - id: T4
    owner_role: developer
    name: "Update EN/VI references, run regression and authoring checks, assemble s08 evidence."
    verify: "AC-RC-06/07; full unit, pack audit, runtime parity, UTF-8; request human DoD."
verification_owner: qc
execution_mode: agentic
handoff: "After DoD and merge, resume the separate release with its current hash and preserved signatures."
```

## Verification Plan
Run targeted materialize-work-item.test.js and scaffold-change-package.test.js (confirm actual existing test filename before execution), then work-item-protocol.test.js. Run npm run validate:workflow:unit in the isolated worktree so runtime prebuild cannot mutate the main workspace. Run workflow, governance, planning, protocol and pack-audit checks for affected authoring/runtime references. Decode changed text strictly as UTF-8; check git diff --check. Record unavailable scanners explicitly, never infer pass. All behavior tests use disposable repositories and fixture-only keys, never user credentials.

## Governance Checks
User accepted the work-item scope and s04/s05/s06 packet; trusted receipts remain pending; do not run T1 production-behavior test edits before ACTIVE. At implementation: TDD red/green, worktree isolation, spec-first early review, sequential execution without subagents. Final technical evidence does not self-approve DoD.

## Brownfield Delivery Plan
Owned scope: the two scripts, corresponding existing tests, EN/VI materialization references, this work item and its SRS. Create a dedicated worktree before code. Keep original release report and archived work item byte-identical. Generated runtime is derived via the standard sync command, not hand-edited. No version bump or release tags in this prerequisite.

## Traceability
```yaml
upstream: ["product-specs/srs/recover-proposals-with-new-change.md"]
next_step: "s07 after applicable approval"
```

## Handoff
User accepted this authoring packet in chat; recorded at 2026-10-15T08:31:25Z. Trusted receipt sealing and verification are required before activation. Release authorization remains separate.
