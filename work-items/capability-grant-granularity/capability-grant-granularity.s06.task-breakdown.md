---
artifact_id: "capability-grant-granularity.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "capability-grant-granularity"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
  - "qc"
review_mode: independent
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
  task_plan: []
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
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
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
  - "capability-grant-granularity.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Six tasks. T0 is a gate, not a warm-up: if `owned_paths` turns out to be mostly empty across
> existing `s06` notes, the derivation the approach rests on has nothing to derive from and `s05`
> must be reopened rather than worked around. T1 through T4 follow TDD because the activation path
> is a behaviour change. A worktree is required - not for the file count, but because a defect in
> `activate` blocks every work item rather than corrupting one.

## Step Contract
```yaml
step_goal: "Produce a plan executable without re-deriving the approach, with a verify path per task and a first task that can stop the work item."
input_summary: ["capability-grant-granularity.s05.technical-approach.md", "s04 AC-04, AC-06, AC-07"]
output_summary: ["Six tasks with owned paths and verify paths", "Review checkpoints", "Worktree and TDD decisions with reasons"]
done_when: ["Every task names its files and how it is verified", "No placeholder task"]
owner: "developer"
```

## Artifact Chính
```yaml
tasks:
  - id: T0
    title: "Confirm owned_paths is populated enough for derivation to be worth doing"
    kind: GATE
    owned_paths: []
    detail: >-
      Count s06 notes that carry a non-empty owned_paths across the work items in this repository.
      The approach in s05 derives the grant from that field; if it is usually empty, derivation
      produces an empty grant and the whole option collapses to Option A with extra steps.
    verify: "A recorded count. Threshold for continuing: owned_paths populated in a clear majority of s06 notes that reached s07."
    on_failure: "Stop. Reopen s05 rather than degrade Option C into Option A silently. Record as a finding, not as a task that failed."

  - id: T1
    title: "Path classification as a pure function"
    kind: TDD
    owned_paths:
      - "packages/workflow-bundle/scripts/workflow-capability-control.js"
      - "packages/workflow-bundle/test/workflow-capability-control.test.js"
    detail: >-
      classify(path, slug) returns one of own_artifact_directory, own_worktree, generated_output,
      test_or_fixture, source. Order matters and is fixed: own artifact directory first, because
      work-items/<slug>/tests must not classify as test_or_fixture.
    verify: >-
      RED first: a table test with one path per class plus three ambiguous paths -
      work-items/<slug>/tests, packages/workflow-bundle/runtime/skills/test,
      and a source path containing the word test in a filename rather than a segment.
      GREEN: all pass. No file outside owned_paths is touched.

  - id: T2
    title: "Reason required for a hand-added source directory"
    kind: TDD
    owned_paths:
      - "packages/workflow-bundle/scripts/workflow-capability-control.js"
      - "packages/workflow-bundle/test/workflow-capability-control.test.js"
    depends_on: ["T1"]
    detail: >-
      An explicitly supplied --write-root that classifies as source and is a directory is refused
      unless a reason accompanies it. The reason is persisted as granted_write_path_reasons, a map
      keyed by path, absent when empty.
    verify: >-
      RED: refusal case and acceptance-with-reason case both fail first. GREEN: both pass, and a
      report written without any hand-added source directory has no reasons key at all.

  - id: T3
    title: "Derive the proposed grant from s06 owned_paths"
    kind: TDD
    owned_paths:
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
    depends_on: ["T1"]
    detail: >-
      resolveGrantedWritePaths gains a derivation path used when no --write-root is supplied: read
      owned_paths from the work item's s06 note, add the work item's own artifact directory and its
      worktree if one exists, and return the union. Explicit --write-root continues to bypass
      derivation entirely.
    verify: >-
      RED: a fixture work item with a populated s06 produces the expected grant; a fixture with an
      empty s06 falls back to requiring explicit paths rather than producing an empty grant.
      GREEN: both pass. Existing explicit-path tests are untouched and still pass.

  - id: T4
    title: "CLI surface and the confirmation step"
    kind: TDD
    owned_paths:
      - "packages/workflow-bundle/bin/wfc.js"
      - "packages/workflow-bundle/test/wfc.test.js"
    depends_on: ["T3"]
    detail: >-
      Add --write-root-reason. When activate derives a grant, print the proposed paths grouped by
      class before the confirmation prompt, so the human sees what was derived rather than a count.
    verify: >-
      RED then GREEN on argument parsing and on the printed output containing every derived path.
      Non-interactive activation with explicit paths behaves exactly as today.

  - id: T5
    title: "Regression against the five measured work items"
    kind: REGRESSION
    owned_paths:
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
    depends_on: ["T2", "T3"]
    detail: >-
      The grants of the five work items measured on 2026-09-12 still load, and their protocol still
      validates. Enforcement is prospective; no existing report is rewritten or refused.
    verify: "wfc validate and wfc protocol pass over the full work-items root with no new failures, and a fixture asserts an existing directory-only grant still loads."

dependencies:
  - "T0 before everything. It can end the work item."
  - "T1 before T2 and T3 - both need the classifier."
  - "T3 before T4 - the CLI prints what derivation produced."
  - "T2 and T3 before T5."
  - "D1 from s01: adaptive-governance-human-approval-ux releases its grant on packages/workflow-bundle. Every owned_path above is inside it."

handoff_points:
  - "After T0: if the count fails the threshold, hand back to s05 rather than continuing."
  - "After T2: batch 1 review - spec compliance, then code quality."
  - "After T4: batch 2 review - spec compliance, then code quality."
  - "After T5: hand to s08 with the M-05 baseline recorded."
```

## Verification Plan
- Mandatory: T0's count before any code; RED observed before GREEN on T1 through T4; `wfc validate` and `wfc protocol` clean over the whole work-items root at T5.
- Risk note: the activation path gates every work item. A defect here does not corrupt data, it stops work. That is why T5 asserts existing grants still load rather than only asserting the new behaviour.
- Counter-metric: M-05 from s02 - the share of source-directory grants carrying a reason - is measurable only after the first activation under the new rule. Record the baseline at s08, not at s06.
- Rollout: none. A CLI and validator change takes effect on the next activation; there is no environment to promote through.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "Execution-oriented plan: every task names owned_paths and a verify path - PASS"
  - "No placeholder tasks - PASS"
  - "TDD required: activation behaviour changes, so T1 through T4 are RED-then-GREEN - PASS"
  - "Two-tier review: two batches, spec compliance before code quality in each - PASS"
  - "Smallest correct solution: T0 exists to catch the case where the chosen option was wrong - PASS"
blocking_items: []
owner: "developer"
next_action: "Seal Task Plan, then wait on D1 before s07"
```

## Delivery Rule Decisions
```yaml
tdd_status: REQUIRED
tdd_reason: "Activation behaviour changes. T1 through T4 observe RED before GREEN."
worktree_status: REQUIRED
worktree_reason: >-
  Not because of the file count, which is five. Because activate is the transition that grants
  capability to every work item, so a defect blocks all work rather than damaging one artifact. The
  worktree also isolates this from whatever state packages/workflow-bundle is in when CR-008 lands,
  which is the condition under which this work starts.
review_mode: independent
review_batches:
  - "Batch 1 - T1, T2: classification and refusal"
  - "Batch 2 - T3, T4: derivation and CLI"
delegation_mode: agentic
delegation_reason: >-
  No subagent. All five files sit on one call path and T1 is a dependency of everything else, so
  owned_scope cannot be split disjointly. This fails the independent-task test in the delegation
  rule.
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "T5: five existing grants load, protocol validates, no report rewritten"
  - "T3: existing explicit-path tests untouched and passing"
compatibility_checkpoints:
  - "granted_write_path_reasons is optional; a report without it is valid"
  - "Explicit --write-root behaves exactly as today"
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "Revert the commits. Reports carrying a reasons map stay valid because the field is optional."
```

## Traceability
```yaml
upstream:
  - "capability-grant-granularity.s05.technical-approach.md"
  - "capability-grant-granularity.s04.acceptance-criteria.md"
next_step: "s07 Implement - blocked on D1"
```

## Handoff
- First task is a gate. T0 can end the work item, and its failure route is to reopen `s05`, not to quietly become Option A.
- Worktree required for blast radius, not size. `activate` gates every work item.
- No delegation. T1 is a dependency of everything, so the tasks are not independent.
- Condition to enter s07: Task Plan sealed **and** D1 - the grant on `packages/workflow-bundle` released.
