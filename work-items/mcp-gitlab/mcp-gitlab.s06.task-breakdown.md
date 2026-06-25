---
artifact_id: "mcp-gitlab.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "mcp-gitlab"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
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
spec_status: reviewed
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "po"
  contract: []
  dor:
    - "po"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  spec_reviewed_by:
    - "po"
  spec_reviewed_at: "2026-04-23"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "po"
  dor_reviewed_at: "2026-04-23"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-04-23"
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
  - "mcp-gitlab.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Summarize the task plan, dependencies, verify checkpoints and review checkpoints.

## Step Contract
```yaml
step_goal: "Turn the approved approach into a task plan concrete enough to implement the GitLab lane as a thin wrapper without blurring the path, the verify path or the scope guard."
input_summary:
  - "Step 5 was approved on 2026-04-23"
  - "Phase 1 only includes inspect repository, pull current branch and push current branch"
  - "The GitLab lane uses zereight/gitlab-mcp as the standard runtime/reference"
  - "The existing GitHub lane must keep its behavior unchanged"
output_summary:
  - "A BA lane maps the acceptance criteria to tasks and scope guards"
  - "A DEV lane maps paths, dependency order and TDD targets"
  - "A task breakdown with ownership, review checkpoints and verification hints"
done_when:
  - "No placeholder like 'do the rest' remains"
  - "Every task has an objective, paths_in_scope, outputs_expected and a verification_hint"
  - "A clear verify path exists for SSH, ff-only, dirty tree, missing upstream and lane isolation"
owner: "developer"
```

## Main Artifact
```yaml
implementation_goal: "Ship the GitLab lane phase 1 as a thin MCP wrapper/integration for inspect, pull and push on an existing GitLab repository, while keeping an explicit provider distinction and not changing the GitHub lane behavior."
ba_lane:
  acceptance_coverage:
    - "AC1 + AC2 are covered by T1 and T3 through package/config naming, explicit provider metadata and host/runtime wiring"
    - "AC3 + AC4 + AC5 are covered by T2 and T4 through the inspect/pull/push tool surface, SSH-first and ff-only guardrails"
    - "AC6 is covered by T3 and T5 through installer/config registration and a smoke check"
    - "AC7 is covered by T1, T4 and T5 through the lane isolation rule, the read-only reference to github-push and regression checks"
  scope_guards:
    - "Do not add a create repository, merge request, pipeline or project-settings flow"
    - "Do not open HTTPS + PAT in phase 1 unless there is a real delivery blocker"
    - "Do not change the tool surface or contract of the existing github-push"
    - "Do not let a pull auto-merge or rebase; the default must be ff-only"
  human_review_points:
    - "Approve the task plan before opening the step 7 implementation"
    - "Review the final naming for the GitLab lane package/server/config if it differs from the default `mcp/gitlab` package and the `gitlab` server"
    - "Review the fail-fast behavior for a dirty working tree and a diverged branch before the implementation is considered complete"
dev_lane:
  path_map:
    - "New GitLab lane package: mcp/gitlab/package.json, mcp/gitlab/codex-config.toml.template, mcp/gitlab/src/index.js, mcp/gitlab/src/core.js, mcp/gitlab/README.md, mcp/gitlab/test/core.test.js"
    - "Installer/config wiring: adapters/mcp/install-gitlab.sh, adapters/mcp/install-gitlab.ps1"
    - "Read-only reference baseline: mcp/github-push/src/core.js, mcp/github-push/src/index.js, mcp/github-push/README.md, adapters/mcp/install-github-push.sh"
    - "Workflow evidence only: work-items/mcp-gitlab/*"
  technical_sequence:
    - "T1 locks the package boundary, the server name, the config template and the explicit provider/host metadata"
    - "T2 implements the core wrapper tools and the local git guardrails in src/core.js + src/index.js"
    - "T3 wires the installer/config for Codex and ensures the GitHub lane is not overwritten"
    - "T4 adds tests + docs for the success path and the failure path"
    - "T5 runs the package checks, the workflow validation and a smoke check on an existing GitLab repository if the environment allows it"
  tdd_targets:
    - "T2/T4: pull_current_branch fails when the working tree is dirty"
    - "T2/T4: pull_current_branch fails when the branch diverged and ff-only is not possible"
    - "T2/T4: push_current_branch fails clearly when the upstream is missing or SSH auth fails"
    - "T2/T4: inspect_repository only reports metadata within the allowed root and rejects a path outside the boundary"
task_breakdown:
  - id: T1
    owner_role: developer
    name: "Scaffold the GitLab lane and lock the config boundary"
    objective: "Create the `mcp/gitlab` skeleton following the existing pattern, lock the short naming and an explicit config template for the GitLab provider, the self-hosted host and the allowed root."
    paths_in_scope:
      - "mcp/gitlab/package.json"
      - "mcp/gitlab/codex-config.toml.template"
      - "mcp/gitlab/README.md"
    dependencies: []
    outputs_expected:
      - "A new MCP package for the GitLab lane with start/test/check scripts"
      - "A config template with the server name, entry point, allowed root and an explicit GitLab host"
      - "A README stating that the standard runtime/reference is zereight/gitlab-mcp and that phase 1 scope is only local inspect/pull/push"
    review_checkpoint: "Review the boundary after scaffolding to make sure the new package does not drag the scope into the GitLab platform API."
    verification_hint: "Compare against the `mcp/github-push` pattern and check that the config template does not overwrite the GitHub lane."
  - id: T2
    owner_role: developer
    name: "Implement the core wrapper tools and the local git guardrails"
    objective: "Expose exactly three tools `inspect_repository`, `pull_current_branch`, `push_current_branch` with SSH-first, ff-only guardrails and explicit failure for a dirty tree, missing upstream and a path outside the allowed root."
    paths_in_scope:
      - "mcp/gitlab/src/core.js"
      - "mcp/gitlab/src/index.js"
    dependencies:
      - "T1"
    outputs_expected:
      - "Core helpers for inspect/pull/push of an existing GitLab repository"
      - "Validation for the current branch, upstream tracking, the allowed root and the expected GitLab host"
      - "Clear failure messages for a dirty working tree, a diverged branch, an auth failure and a missing upstream"
    review_checkpoint: "Early review after the tool surface contract and the guardrails are done, before moving to the installer."
    verification_hint: "Follow TDD for the main behavior changes: fail first on a dirty tree/diverged branch, then pass after the implementation."
  - id: T3
    owner_role: developer
    name: "Wire the installer and the Codex integration for the GitLab lane"
    objective: "Register the GitLab MCP into the Codex config with a shell/PowerShell installer following the existing repo pattern, but keep a managed block separate from `github-push`."
    paths_in_scope:
      - "adapters/mcp/install-gitlab.sh"
      - "adapters/mcp/install-gitlab.ps1"
      - "mcp/gitlab/codex-config.toml.template"
    dependencies:
      - "T1"
      - "T2"
    outputs_expected:
      - "Shell and PowerShell installers for the GitLab lane"
      - "A separate managed config block for the GitLab server"
      - "No touch on the GitHub credential helper because phase 1 is SSH-first"
    review_checkpoint: "Review the config merge logic to avoid overwriting or removing the GitHub lane block."
    verification_hint: "Dry-run with a temp config file or inspect the logic to make sure the GitLab managed block is independent."
  - id: T4
    owner_role: developer
    name: "Add tests and operational docs"
    objective: "Cover the success/failure path for inspect/pull/push and write the install guide, the boundary, the non-goals and the expected error behavior."
    paths_in_scope:
      - "mcp/gitlab/test/core.test.js"
      - "mcp/gitlab/README.md"
      - "mcp/gitlab/package-lock.json"
    dependencies:
      - "T2"
      - "T3"
    outputs_expected:
      - "Test cases for a dirty tree, missing upstream, a diverged branch, the allowed root and lane isolation"
      - "A README describing SSH-first setup, ff-only pull, the self-hosted host and the rollback by removing the config"
      - "A package lock reflecting the real dependency if a new package is added"
    review_checkpoint: "Review that the coverage is enough for the edge cases in the acceptance criteria before moving to verify."
    verification_hint: "Run `npm test` and `npm run check` inside `mcp/gitlab`."
  - id: T5
    owner_role: developer
    name: "Run the smoke check and collect the handoff evidence"
    objective: "Run the minimum verify for the new package and collect the lane isolation evidence to hand off to step 8."
    paths_in_scope:
      - "work-items/mcp-gitlab/mcp-gitlab.s07.implementation.md"
      - "work-items/mcp-gitlab/mcp-gitlab.s08.verification.md"
    dependencies:
      - "T4"
    outputs_expected:
      - "Evidence check for the GitLab package and the workflow validator"
      - "A clear record of what was smoke tested and the residual risk left"
      - "A checklist that github-push had no contract or config change"
    review_checkpoint: "Review the evidence completeness before closing the implementation batch."
    verification_hint: "Run the package check, the workflow validator and, if the environment allows, a smoke run on an existing GitLab SSH repository."
dependencies_global:
  - "T1 must be done before the tool surface is implemented to avoid naming/config drift"
  - "T2 is the blocking dependency for tests and the installer because the tool contract must be stable first"
  - "T3 and T4 must be done before T5 so the smoke run has enough package + config + docs"
risk_notes:
  - "Risk that the wrapper grows into a separate runtime if T2 adds capability beyond inspect/pull/push"
  - "Risk of overwriting the GitHub lane config if T3 does not separate the managed block properly"
  - "Risk of a mismatch with the standard runtime/reference if the README/config does not state clearly that zereight/gitlab-mcp is only the GitLab lane standard"
  - "Risk of false confidence if only the happy path is tested and the dirty tree, diverged branch and missing upstream are skipped"
verification_plan:
  - "The workflow note must still pass `npm run validate:workflow -- --workflow-root work-items/mcp-gitlab --project-root .`"
  - "The new package must pass `npm test` and `npm run check` inside `mcp/gitlab`"
  - "The installer logic must be checked to only add or update the GitLab block, not delete the GitHub block"
  - "If an SSH GitLab repo is available in the allowed root, run the smoke `inspect -> pull ff-only -> push` on the current branch"
  - "If no real smoke environment is available, the residual risk on SSH/auth/network must be recorded clearly in step 8"
notes_for_implementation: "Keep the implementation minimal: reference the `github-push` pattern, but do not copy all the GitHub logic into GitLab. The wrapper only serves the phase 1 local git workflow; any other GitLab platform/API capability stays out of scope."
```

## Verification Plan
- Mandatory check: the workflow validator for the work item, `npm test`, `npm run check`, the installer block isolation and the smoke path `inspect -> pull ff-only -> push` if a real SSH repo exists.
- Risk note: SSH/auth and remote reachability may not be fully provable by a unit test; if a real smoke run is not possible, keep the residual risk clear in step 8.
- Rollout note if any: the rollout only adds a new GitLab lane; the rollback removes this lane's config/installer without touching the GitHub lane.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - "Step 5 was approved and materialized into a task plan with clear ownership"
  - "The path map clearly separates the new GitLab lane paths from the read-only GitHub lane paths"
  - "The verify path covers SSH-first, ff-only, dirty tree, diverged branch and missing upstream"
  - "The task plan keeps the non-goals clear and does not expand into repo creation, MR or CI/CD"
blocking_items: []
owner: "developer"
next_action: "Wait for the human to review/approve the task plan before opening the step 7 implementation."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "Confirm `mcp/github-push/*` was not changed outside the reference scope"
  - "Confirm the GitLab installer does not delete or overwrite the `github-push` block in the Codex config"
compatibility_checkpoints:
  - "The GitLab/GitHub provider distinction is explicit in config and docs"
  - "The GitLab tool surface is only inspect/pull/push for an existing repo"
  - "The default pull is still ff-only and fail-fast when diverged"
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "Remove the GitLab server block from the Codex config"
  - "Drop the GitLab lane package and installer if the rollout does not pass"
  - "No data or repository-state migration rollback is needed"
```

## Traceability
```yaml
upstream:
  - "mcp-gitlab.s04.acceptance-criteria.md"
  - "mcp-gitlab.s05.technical-approach.md"
next_step: "mcp-gitlab.s07.implementation.md"
```

## Handoff
- Tasks to do first: T1 to lock the naming/config boundary, then T2 to stabilize the tool contract before the installer and the tests.
- Blocking dependencies: no new technical blocker; the missing gate is the human approval of the task plan.
- Conditions to move to step 7: approve `s06`, then implement in the order T1 -> T2 -> T3 -> T4 -> T5 and do not go beyond the `inspect + pull + push` scope.