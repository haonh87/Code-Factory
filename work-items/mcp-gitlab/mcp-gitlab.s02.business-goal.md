---
artifact_id: "mcp-gitlab.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "mcp-gitlab"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
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
spec_status: draft
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "mcp-gitlab.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Summarize the user problem, business outcome, success metric and non-goals.

## Step Contract
```yaml
step_goal: "Lock the business value and user value of the MCP GitLab phase 1 before locking the acceptance criteria."
input_summary:
  - "The request was restated in step 1"
  - "The user confirmed that phase 1 focuses on inspect + pull + push only"
  - "The user locked zereight/gitlab-mcp as the standard for the GitLab lane"
  - "Auth prefers SSH and the default pull is ff-only"
output_summary:
  - "The user problem and the business goal are clear"
  - "The success metrics, standard runtime and non-goals are enough to lock the scope"
done_when:
  - "There is no longer a misunderstanding that phase 1 is the full GitLab lifecycle"
  - "The non-goals are clear enough to block repo creation, MR and CI/CD"
owner: "developer"
```

## Main Artifact
```yaml
user_problem: "The workflow does not yet have a standardized GitLab lane on par with the clarity of the GitHub lane, so the agent has to infer the wrong provider, auth and runtime when working with self-hosted GitLab."
business_goal: "Standardize the GitLab lane on the workflow by using zereight/gitlab-mcp as the standard runtime/reference for gitlab.ggg.com.vn, while still meeting the phase 1 need to inspect, pull and push on existing repositories."
success_metrics:
  - "The GitLab lane has a named standard runtime instead of being written from scratch or inferred from the GitHub lane"
  - "The workflow artifact states the provider target=gitlab, the host and the standard runtime when the scope touches a provider-specific MCP"
  - "Phase 1 still supports inspect, pull and push for an existing GitLab repository without dragging the scope into another project lifecycle"
non_goals:
  - "Create a new GitLab repository or project"
  - "Manage merge requests"
  - "Manage GitLab CI/CD or project settings"
  - "Design a full Git provider abstraction for multiple platforms in phase 1"
  - "Build a new GitLab MCP from scratch if the standard runtime is enough or only needs a thin wrapper"
constraints:
  - "The target GitLab host is gitlab.ggg.com.vn"
  - "Phase 1 auth prefers SSH"
  - "The default pull is ff-only"
  - "The MVP only includes inspect, pull and push"
  - "The GitHub/GitLab provider distinction must be explicit in the workflow artifact when the scope touches a separate runtime/auth/host"
assumptions:
  - "The target GitLab repository already exists and the team has the right access"
  - "The machine running the MCP has a Git CLI and SSH credentials that work with the internal GitLab"
  - "zereight/gitlab-mcp can be used directly or as a standard to wrap without redesigning the GitLab lane from scratch"
```

## Traceability
```yaml
upstream:
  - "mcp-gitlab.s01.restate.md"
next_step: "mcp-gitlab.s03.open-questions.md"
```

## Handoff
- User problem locked: a minimal self-hosted GitLab MCP is missing for existing internal repos.
- Non-goals: repo creation, merge requests, CI/CD and admin workflow are not part of phase 1.
- Conditions to move to step 3: confirm the remaining decisions are no longer a blocker for step 4.