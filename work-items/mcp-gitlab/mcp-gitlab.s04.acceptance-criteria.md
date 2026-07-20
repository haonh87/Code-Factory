---
artifact_id: "mcp-gitlab.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "mcp-gitlab"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
  approach: []
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "mcp-gitlab.s01.restate.md"
  - "mcp-gitlab.s02.business-goal.md"
  - "mcp-gitlab.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Summarize the acceptance criteria, edge cases, DoR and governance checks for readiness.

## Step Contract
```yaml
step_goal: "Turn the locked discovery into measurable acceptance criteria and a DoR conclusion that is enough to move to the technical approach."
input_summary:
  - "Step 1 restated the phase 1 scope for self-hosted GitLab"
  - "Step 2 locked the business goal and the non-goals"
  - "The user locked SSH auth, ff-only pull and an MVP of inspect + pull + push"
  - "The user locked zereight/gitlab-mcp as the standard for the GitLab lane"
output_summary:
  - "Measurable acceptance criteria for phase 1"
  - "The brownfield baseline and compatibility constraints"
  - "A DoR verdict to move to step 5"
done_when:
  - "The criteria are clear enough to design the technical approach without inferring the scope"
  - "No remaining discovery blocker blocks the design"
owner: "developer"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "mcp-gitlab.s01.restate.md"
  - "mcp-gitlab.s02.business-goal.md"
  - "mcp-gitlab.s03.open-questions.md"
decision_notes:
  - "Phase 1 only applies to an existing GitLab repository"
  - "The MVP tool surface is inspect + pull + push"
  - "Auth prefers SSH and the default pull is ff-only"
  - "The GitLab standard runtime/reference is zereight/gitlab-mcp"
  - "The workflow must record the explicit provider target and host when it touches a provider-specific MCP"
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
ux_contract_refs: []
notes:
  - "Phase 1 does not open a separate API contract or UX contract; how to fit the tool surface to the standard runtime will be locked in step 5"
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "mcp/github-push/README.md"
  - "mcp/github-push/src/core.js"
  - "mcp/github-push/src/index.js"
  - "adapters/mcp/install-github-push.sh"
  - "https://github.com/zereight/gitlab-mcp"
impacted_surfaces:
  - "the workflow artifact of the GitLab lane"
  - "the Codex MCP config/integration for the standard GitLab runtime"
  - "if needed, a thin wrapper or repo-local adapter around the standard runtime"
compatibility_constraints:
  - "Do not change the behavior of the existing github-push MCP"
  - "The GitHub/GitLab provider distinction must be explicit, not inferred"
  - "The guardrails and boundaries of the GitLab lane must not break the existing GitHub lane"
  - "Do not automatically merge or rebase on pull; the default is ff-only"
rollback_constraints:
  - "Can roll back by removing the GitLab lane config/integration without affecting the existing GitHub MCP"
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: AC1
    description: "The GitLab lane of this work item uses zereight/gitlab-mcp as the standard runtime/reference for the self-hosted host gitlab.ggg.com.vn."
    measurable: true
  - id: AC2
    description: "The workflow artifact states clearly that the provider target is GitLab, the GitLab host and the standard runtime; it does not infer from context."
    measurable: true
  - id: AC3
    description: "The phase 1 solution supports inspect repository, pull current branch and push current branch for an existing GitLab repository."
    measurable: true
  - id: AC4
    description: "The default pull uses fast-forward only; if the branch state does not allow ff-only, the tool must fail clearly instead of auto-merging or rebasing."
    measurable: true
  - id: AC5
    description: "Phase 1 auth prefers SSH and does not require a flow to create a new GitLab repository."
    measurable: true
  - id: AC6
    description: "A Codex integration/config exists for the GitLab lane per the chosen standard runtime."
    measurable: true
  - id: AC7
    description: "The GitLab lane decision does not change the behavior or the contract of the existing GitHub lane."
    measurable: true
edge_cases:
  - "The local repo has uncommitted changes before a pull"
  - "The GitLab remote is unreachable or SSH auth fails"
  - "The current branch has no suitable upstream to pull/push"
  - "A pull cannot be ff-only because the local and remote have diverged"
  - "The standard runtime needs an extra wrapper or adapter to fit the local git workflow"
out_of_scope:
  - "Create a new GitLab project/repository"
  - "The merge request lifecycle"
  - "GitLab CI/CD or project settings"
  - "HTTPS + PAT support if not really needed in phase 1"
  - "Build a new GitLab MCP from scratch if the standard runtime is enough or only needs a thin wrapper"
done_when:
  - "The acceptance criteria can map directly to a test/verification path"
  - "The brownfield compatibility constraints are recorded clearly"
  - "No material discovery blocker remains for the technical approach"
behavioral_invariants:
  - "No force push and no history rewrite"
  - "Do not implicitly infer the GitHub/GitLab provider"
  - "Do not change the workflow or config of the existing github-push MCP"
  - "Do not auto-merge or rebase in the default pull"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - "Raised to the strict profile because the scope touches an external integration"
  - "Locked the non-goals to avoid slipping into repo creation and the MR flow"
  - "Reflected the decision to use zereight/gitlab-mcp as the standard for the GitLab lane"
  - "Recorded the explicit provider distinction rule at the artifact level"
blocking_items: []
owner: "developer"
next_action: "The spec and DoR were approved by the requester on 2026-04-23; move to step 5 to lock the technical approach."
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners:
  - "po/developer review gate owners"
notes:
  - "The restated request is clear and the scope is locked"
  - "The provider target, host and standard runtime have been locked by the user"
  - "The remaining conflict is a technical-fit problem for step 5 and does not block the design"
  - "The requester approved step 4 on 2026-04-23; the work item is ready for the technical approach"
```

## Traceability
```yaml
upstream:
  - "mcp-gitlab.s01.restate.md"
  - "mcp-gitlab.s02.business-goal.md"
  - "mcp-gitlab.s03.open-questions.md"
next_step: "mcp-gitlab.s05.technical-approach.md"
```

## Handoff
- Mandatory criteria: the standard runtime is zereight/gitlab-mcp, the provider distinction is explicit, inspect + pull + push for an existing GitLab repo, SSH-first, ff-only pull.
- Edge case to preserve: local dirty state, missing upstream, auth failure, a diverged branch that cannot be ff-only, and the adopt-vs-wrap problem around the standard runtime.
- Conditions to move to step 5: met; next, pick the smallest approach that fits the goal between direct-use and a thin wrapper around the standard runtime.