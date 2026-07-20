---
artifact_id: "mcp-gitlab.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "mcp-gitlab"
step_id: "s05"
step_slug: "technical-approach"
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
  task_plan: []
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "mcp-gitlab.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Summarize the recommended option, trade-offs and the technical boundary to preserve.

## Step Contract
```yaml
step_goal: "Pick the smallest technical approach that is still correct for the GitLab lane, using zereight/gitlab-mcp as the standard while still fitting the inspect/pull/push need on an existing repository."
input_summary:
  - "The acceptance criteria were approved by the requester in step 4 on 2026-04-23"
  - "The GitLab lane must state the provider target, host and standard runtime explicitly"
  - "Phase 1 scope is only inspect repository, pull current branch and push current branch"
  - "Auth prefers SSH and the default pull is ff-only"
output_summary:
  - "A comparison of the direct-use, thin-wrapper and build-from-scratch options"
  - "The approach recommended for phase 1"
  - "The technical boundary to keep the GitHub lane unaffected"
done_when:
  - "A chosen option with clear trade-offs exists"
  - "The boundary and compatibility risk are concrete enough to move to the task plan"
  - "No material ambiguity remains about the phase 1 technical direction"
owner: "developer"
```

## Option Analysis
```yaml
options:
  - id: OPT1
    name: "Use zereight/gitlab-mcp directly"
    summary: "Adopt the standard runtime as-is and map the phase 1 need onto the existing tool surface of the reference repo."
    pros:
      - "Stays as close as possible to the decision to use a standard runtime/reference"
      - "Reuses the self-hosted GitLab configuration that is already designed in"
      - "Reduces the cost of adding another adapter layer in this repo"
    cons:
      - "The reference repo leans toward the GitLab platform/API workflow rather than local git inspect/pull/push"
      - "Hard to keep the phase 1 tool surface minimal if used as-is"
      - "Higher risk of a mismatch between the acceptance criteria and the actual behavior"
    fit_verdict: "PARTIAL"
  - id: OPT2
    name: "Use zereight/gitlab-mcp as the standard, add a thin wrapper for the local git workflow"
    summary: "Keep the standard runtime/reference for the GitLab lane but add a thin adapter layer to expose inspect/pull/push correctly for an existing repository."
    pros:
      - "Respects the decision to use a standard runtime/reference"
      - "Maps directly to the phase 1 acceptance criteria for the repo-local workflow"
      - "Lets the provider distinction stay explicit and isolates the GitHub lane"
      - "Easy to roll back by removing the GitLab lane without touching the GitHub lane"
    cons:
      - "Adds one integration layer that needs maintenance"
      - "Needs discipline so the wrapper does not grow into a new runtime"
    fit_verdict: "BEST_FIT"
  - id: OPT3
    name: "Build a new GitLab MCP from scratch"
    summary: "Design a separate GitLab runtime for this repo only to serve inspect/pull/push."
    pros:
      - "The tool surface can be optimized absolutely for the phase 1 need"
      - "Full control over the local git workflow behavior"
    cons:
      - "Goes against the decision to take zereight/gitlab-mcp as the standard"
      - "Raises the maintenance cost and duplicates capability"
      - "Unnecessary while phase 1 is still small"
    fit_verdict: "REJECT"
recommended_option: "OPT2"
trade_offs:
  - "Accept a thin wrapper layer in exchange for a better fit for the local git workflow"
  - "Do not use the broad tool surface of the standard runtime directly in phase 1 to avoid scope drift"
  - "Keep the GitLab standard at the runtime/reference and config level; do not let the wrapper become a full replacement implementation"
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: "brownfield MCP lane extension"
selected_stack:
  - "Node.js MCP tooling already present in the repo"
  - "Local Git CLI for inspect/pull/push"
selected_runtime:
  - "zereight/gitlab-mcp as the standard runtime/reference for the GitLab lane"
decision_notes:
  - "This is a work-item-level approach decision, not a new foundation gate for the whole repo"
  - "The existing GitHub lane is unchanged; the GitLab lane is added independently"
  - "The self-hosted GitLab host is fixed in the artifact instead of inferred from context"
```

## Main Artifact
```yaml
recommended_approach: "Use zereight/gitlab-mcp as the standard runtime/reference for the GitLab lane, and create a thin wrapper/integration layer in this repo to expose inspect_repository, pull_current_branch and push_current_branch correctly for an existing GitLab repository."
why: "This is the smallest option that still keeps both goals: follow the GitLab standard chosen by the user and meet the phase 1 local git workflow exactly."
boundaries:
  - "The workflow artifact must always record git_provider_target=gitlab, gitlab_host=gitlab.ggg.com.vn and the corresponding standard runtime"
  - "The wrapper only covers inspect/pull/push and the related guardrails; it does not expand to repo creation, MR or CI/CD"
  - "The default pull is ff-only; if ff-only is not possible, fail clearly"
  - "Phase 1 auth prefers SSH; do not open HTTPS + PAT without a delivery reason"
  - "Do not change the contract or behavior of the existing github-push lane"
risk_notes:
  - "If the wrapper grows thick, the repo will accidentally maintain a second GitLab runtime"
  - "If the standard runtime is used directly without an adapter, the phase 1 acceptance criteria may not map cleanly to the tool behavior"
  - "Provider routing must be explicit; otherwise the GitHub/GitLab lane can easily use the wrong runtime"
```

## Architecture Details
```yaml
domain_boundaries:
  - "Workflow governance lane: the provider target and the runtime lane are decided in the artifact upfront"
  - "GitHub lane: continues to use the existing github-push MCP, unchanged"
  - "GitLab lane: the GitLab standard based on zereight/gitlab-mcp and the phase 1 thin wrapper"
integration_points:
  - "Codex MCP config for the GitLab runtime"
  - "A local adapter/wrapper in the repo to map inspect/pull/push onto the local git workflow"
  - "SSH Git remote to the self-hosted GitLab at gitlab.ggg.com.vn"
data_or_runtime_notes:
  - "The base host for the GitLab lane is gitlab.ggg.com.vn; the API/runtime config must be explicit"
  - "Branch operations only apply to an existing repository and the current branch"
  - "The default pull behavior is fast-forward only to avoid implicit merge/rebase"
  - "A dirty working tree, missing upstream and auth failure must fail fast with a clear message"
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "work-items/mcp-gitlab/*"
  - "MCP integration/config for the GitLab lane"
  - "if needed, a new adapter module for the GitLab local workflow"
compatibility_risks:
  - "If the provider distinction is not explicit enough, the agent picks the wrong GitHub/GitLab lane"
  - "If the wrapper is implemented too broadly, it drifts from the standard runtime/reference"
  - "If SSH/ff-only handling is unclear, the behavior differs from the acceptance criteria"
migration_notes:
  - "No data migration or repository migration in phase 1"
  - "The adoption path only adds the GitLab lane alongside the existing GitHub lane"
rollback_notes:
  - "Can roll back by removing the GitLab lane config and wrapper"
  - "Rollback must not require any change to or revert of the github-push MCP"
```

## Traceability
```yaml
upstream:
  - "mcp-gitlab.s04.acceptance-criteria.md"
  - "https://github.com/zereight/gitlab-mcp"
  - "mcp/github-push/README.md"
next_step: "mcp-gitlab.s06.task-breakdown.md"
```

## Handoff
- Recommended option: OPT2, use zereight/gitlab-mcp as the standard and add a thin wrapper for inspect/pull/push.
- Accepted trade-off: add a thin integration layer in exchange for a correct fit for phase 1 and an unaffected GitHub lane.
- Conditions to move to step 6: the task plan must show owned paths, config touch points, the verify path for SSH/ff-only/error cases and a guard against drifting into the GitHub lane.
- Deployment note if any: phase 1 is mostly config/integration and local workflow wiring; there is no data migration.