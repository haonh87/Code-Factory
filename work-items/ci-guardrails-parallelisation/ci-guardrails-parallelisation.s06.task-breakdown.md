---
artifact_id: "ci-guardrails-parallelisation.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "ci-guardrails-parallelisation"
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
  card: "product-specs/cards/ci-guardrails-parallelisation.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
execution_roles:
  - "devops"
  - "developer"
review_mode: self
verification_owner: "devops"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "ba"
  contract: []
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
    - "devops"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
  business_acceptance: []
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-09-11T04:49:59.000Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-09-11T04:49:59.000Z"
  approach_reviewed_by:
    - "developer"
    - "devops"
  approach_reviewed_at: "2026-09-11T04:49:59.000Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-09-11T04:49:59.000Z"
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
  - "ci-guardrails-parallelisation.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> One file, four tasks, each with its own verify step. Chosen option is a single matrix job over
> the six validators with `fail-fast: false`, which is what makes one run report every failure.
> `authoring-smoke` stays gated behind the validators. Actions move v4 to v7 in the same change
> because both edits touch the same preamble and splitting them would mean writing it twice.

> [!note] SDD Light
> This note hosts Option Analysis, Technical Approach, Brownfield Impact and Task Plan. There is
> no separate `s05`.

## Step Contract
```yaml
step_goal: "Choose the smallest correct pipeline shape and produce a task plan executable without re-deriving the design."
input_summary: ["s04 acceptance criteria", "existing workflow-guardrails.yml", "GitHub API action majors read 2026-09-11"]
output_summary: ["Option analysis with a recommendation", "Target YAML shape", "Four tasks with verify paths"]
done_when: ["Every task names its files and its verify step", "No placeholder tasks"]
owner: "devops"
```

## Option Analysis
```yaml
goal: "Make one CI run report every validator failure instead of the first, and keep the pipeline alive past the 2026-09-23 Node 20 removal, with the smallest correct change to one file."
ba_lane:
  business_goal: "A maintainer fixing CI sees every broken validator in one run instead of discovering them one round trip at a time."
  user_scenarios:
    - "A maintainer pushes a branch where three validators are broken and the run summary names all three."
    - "A release reviewer opens a green run after 2026-09-23 and finds no deprecation annotations and no missing checks."
  business_rules:
    - "No validator may be dropped, renamed in behaviour, or given different arguments."
    - "release-candidate stays terminal - it never runs against a tree that failed validation."
    - "A red validator still fails the workflow."
  scope_notes:
    - "Pipeline shape and action versions only; validator behaviour is out of scope."
    - "npm caching is deliberately excluded - it has its own correctness questions."
  open_questions: []
dev_lane:
  repo_constraints:
    - "Eight jobs form one needs: chain; six of them are independent validators."
    - "Each job repeats an identical checkout + setup-node + version-echo preamble."
    - "release-candidate needs fetch-depth 0 and a node 18/22 matrix; both are product support claims, not conveniences."
    - "packages/workflow-bundle/** is owned by open branch codex/adaptive-governance-human-approval-ux and must not be touched."
  technical_risks:
    - "Skipping three action majors at once can change defaults for fetch-depth, submodules, credential persistence or cache."
    - "Parallelisation could silently drop a validator if the command list is not compared before and after."
    - "Order-dependent validator behaviour, if any exists, would surface as a new failure."
  integration_points:
    - "GitHub Actions runners and the checkout/setup-node actions"
    - "npm scripts in package.json - read, never modified"
    - "Branch protection and required status checks - confirmed absent on 2026-09-11"
  nfr_notes:
    - "Target: green-run wall-clock below the recorded pre-change baseline; actual figure recorded, not predicted."
    - "Target: zero Node deprecation annotations on a hosted green run."
  baseline_context: "Brownfield. One workflow file at commit 2e3aade, eight chained jobs, actions pinned at v4 on the Node 20 runtime that GitHub removes on 2026-09-23."
options:
  - "Option A - Single matrix job over the validators with fail-fast false"
  - "Option B - Six separate jobs with the needs edges removed"
  - "Option C - Keep the chain and only upgrade the actions"
option_details:
  - name: "Option A - Single matrix job over the validators with fail-fast false"
    summary: "One job named Validate with a strategy.matrix.include list of name and run pairs. Six entries today; a seventh validator is one list line. authoring-smoke stays gated on Validate, release-candidate on authoring-smoke."
    pros:
      - "fail-fast false makes every failure visible in one run, which is AC-001 and the reason the work item exists."
      - "The checkout and setup-node contract exists once, satisfying AC-005 and REQ-004."
      - "Adding or removing a validator is a single list entry with no copied job block."
    cons:
      - "Check names become Validate (Artifacts) rather than Workflow Artifacts."
    risks:
      - "Renamed checks would read as missing to any branch protection rule - measured absent on 2026-09-11, so this risk is closed rather than mitigated."
  - name: "Option B - Six separate jobs with the needs edges removed"
    summary: "Keep the existing job blocks exactly as they are and delete the needs line from the six validator jobs."
    pros:
      - "Check names stay identical, so nothing downstream can be surprised."
      - "Smallest possible diff - six deleted lines."
    cons:
      - "The preamble stays duplicated six times, so REQ-004 and AC-005 are not met."
      - "A seventh validator still means copying an entire job block, which is how the current drift risk arose."
    risks:
      - "The duplication that this work item exists partly to remove survives, and the next edit to the runner contract must be applied six times."
  - name: "Option C - Keep the chain and only upgrade the actions"
    summary: "Bump checkout and setup-node from v4 to v7 and change nothing else."
    pros:
      - "Closes CF-018 with a two-line diff before the 2026-09-23 deadline."
    cons:
      - "One run still reports one failure, so the reason the work item exists is untouched."
      - "Leaves the eight-job chain and its per-job setup cost in place."
    risks:
      - "Closing the urgent half makes the remaining half easy to defer indefinitely."
recommended_option: "Option A - Single matrix job over the validators with fail-fast false"
recommendation_reason: "Option A is the only option that satisfies AC-001 and AC-005 together. Option B is smaller but leaves the duplication intact, so it is the smallest change rather than the smallest change that is correct. Option C addresses only the deadline and none of the feedback problem. Option A's single drawback, renamed checks, was measured harmless on 2026-09-11: main carries no branch protection and no rulesets."
validation_plan:
  - "Record the pre-change wall-clock baseline before editing, since it is unrecoverable afterwards."
  - "Read the release notes for checkout v5, v6, v7 and setup-node v5, v6, v7 for default changes before editing."
  - "Compare the extracted run: line set before and after the change; they must be identical."
  - "One hosted green run with zero Node deprecation annotations."
  - "One deliberate double-failure run on a throwaway branch showing two failed matrix entries in the same run."
notes_for_next_step: "Technical Approach and Task Plan follow in this same Light host. Developer and DevOps approve the recommendation before s07."
```

## Technical Approach
```yaml
target_shape: |
  jobs:
    validate:              # 6 entries, parallel, fail-fast: false
      strategy:
        fail-fast: false
        matrix:
          include:
            - {name: Fixtures,  run: "npm run validate:workflow:fixtures"}
            - {name: Artifacts, run: "npm run validate:workflow -- --workflow-root work-items --project-root ."}
            - {name: SDD,       run: "npm run validate:workflow:sdd -- --workflow-root work-items --project-root ."}
            - {name: Changes,   run: "npm run validate:workflow:change -- --workflow-root work-items --project-root ."}
            - {name: Execution, run: "npm run validate:workflow:execution -- --workflow-root work-items"}
            - {name: Planning,  run: "npm run validate:workflow:planning -- --workflow-root work-items"}
    authoring-smoke:       # needs: validate
    release-candidate:     # needs: authoring-smoke, matrix node 18/22, fetch-depth 0
action_versions:
  - "actions/checkout@v4 -> v7   (v7.0.1 latest on 2026-09-11)"
  - "actions/setup-node@v4 -> v7 (v7.0.0 latest on 2026-09-11)"
unchanged:
  - "Every validator command string and its arguments"
  - "release-candidate: node 18 and 22 matrix, fetch-depth 0, four steps in order"
  - "Triggers: pull_request, push to main, workflow_dispatch"
  - "permissions: contents: read"
  - "timeout-minutes per job"
dropped:
  - "The 'Show runtime versions' echo step - it exists once per job and setup-node already logs the version"
```

## CI/CD Release Controls
```yaml
gate_before_merge:
  - "ODC-001 RESOLVED 2026-09-11: haonh87/Code-Factory main has no branch protection and no rulesets, checked via gh api. No required status check names any job, so renaming checks breaks nothing. This is no longer a merge blocker."
  - "One hosted green run with zero Node deprecation annotations"
promotion: "No promotion. This changes the pipeline that guards releases, not any released artifact."
rollback: "git revert of the single commit. No state to unwind."
observability:
  - "Record pre-change and post-change wall-clock from the run list; both figures go in s08"
```

## Brownfield Impact Analysis
```yaml
affected_boundary: [".github/workflows/workflow-guardrails.yml"]
not_touched:
  - "packages/workflow-bundle/** - owned by branch codex/adaptive-governance-human-approval-ux"
  - "package.json, work-items/**, skills/**"
regression_surface:
  - "Any consumer that reads CI check names: branch protection, status badges, dashboards"
  - "Order-dependent validator behaviour, if any exists - surfaced by AC-006 and the edge case in s04"
compatibility: "No runtime, API, schema or artifact compatibility surface."
```

## Artifact Chính
```yaml
tasks:
  - id: T1
    title: "Record the pre-change baseline"
    owned_paths: []
    detail: "Read wall-clock and job count from the most recent green hosted run. Write both figures into this note before editing anything, so AC-002 has something to compare against."
    verify: "Baseline figures present in s06 with the run id they came from"
  - id: T2
    title: "Read the action release notes for the majors being skipped"
    owned_paths: []
    detail: "checkout v5, v6, v7 and setup-node v5, v6, v7. Looking for default changes to fetch-depth, submodules, credential persistence and cache behaviour. Record anything that would change current behaviour."
    verify: "A written list of behaviour changes, or an explicit 'none found' with the versions checked"
  - id: T3
    title: "Rewrite the job graph"
    owned_paths: [".github/workflows/workflow-guardrails.yml"]
    detail: "Replace the six chained validator jobs with one matrix job per the target shape. Keep authoring-smoke gated on validate, release-candidate gated on authoring-smoke. Bump both actions to v7. Drop the per-job version-echo step."
    verify: "Local: the command set before and after is identical - AC-006, done with a diff of extracted run: lines, not by eye. Hosted: one run, all jobs green, zero Node annotations - AC-003, AC-004."
  - id: T4
    title: "Prove AC-001 with a deliberate double failure"
    owned_paths: []
    detail: "On a throwaway branch, break two validators - for example rename a fixture and corrupt one frontmatter field. Push, observe the run, confirm both are reported failed in the same run. Delete the branch."
    verify: "Run summary shows two failed matrix entries, not one. Screenshot or run id recorded in s08."
dependencies:
  - "T1 before T3 - the baseline is unrecoverable once the change lands"
  - "T2 before T3 - a default change found late means redoing T3"
  - "T3 before T4"
  - "ODC-001 resolved 2026-09-11; no longer a dependency"
handoff_points:
  - "After T3: self review of the diff against AC-005 and AC-006 before pushing"
  - "After T4: hand run ids to s08"
```

## Verification Plan
- Mandatory checks: one hosted green run with zero Node annotations; one deliberate-failure run showing two failures; a before-and-after comparison of extracted `run:` lines.
- Risk note: R3 from s01 - skipping three majors at once can change action defaults silently. T2 exists to catch that before T3 rather than after a red run.
- Rollout note: none. A workflow file takes effect on the next run; there is no environment to promote through.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "Option analysis present with a rejected option - PASS"
  - "Smallest correct option justified against the smaller OPT-B - PASS"
  - "Task plan names files and verify paths, no placeholders - PASS"
  - "TDD: no production behaviour change; T4 is the equivalent observed-failure-first step - documented deviation with reason"
  - "Worktree: single file, one session - not required, reason recorded"
blocking_items: []
owner: "devops"
next_action: "Seal Approach and Task Plan via ready-bundle, then s07"
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "AC-006 command-set comparison at T3"
  - "Full green hosted run at T3"
compatibility_checkpoints:
  - "ODC-001 closed: no branch protection, no rulesets on main as of 2026-09-11"
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "git revert of the T3 commit; next run uses the old graph"
```

## SDD Traceability
```yaml
requirement_refs:
  - "REQ-001 -> T3, T4"
  - "REQ-002 -> T2, T3"
  - "REQ-003 -> T3"
  - "REQ-004 -> T3"
acceptance_refs:
  - "AC-001 -> TEST-001"
  - "AC-002 -> T1 baseline vs post-change run"
  - "AC-003 -> TEST-002"
  - "AC-004 -> TEST-004"
  - "AC-005 -> diff review at T3"
  - "AC-006 -> TEST-003"
task_refs:
  - "T1 through T4 in Artifact Chính"
test_refs:
  - "TEST-001 through TEST-004 in Verification Plan"
```

## Traceability
```yaml
upstream: ["ci-guardrails-parallelisation.s04.acceptance-criteria.md"]
next_step: "s07 Implement - blocked until Approach and Task Plan are sealed"
```

## Handoff
- First task: T1. The pre-change baseline disappears the moment the change lands, so it is recorded first.
- Blocking dependency: none. ODC-001 was resolved on 2026-09-11 - main carries no branch protection and no rulesets, so renamed checks break nothing.
- Condition to enter s07: Approach and Task Plan sealed with their own receipts. Under Light both seal in one ready-bundle interaction.
