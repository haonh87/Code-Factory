---
artifact_id: "mcp-gitlab.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "mcp-gitlab"
step_id: "s03"
step_slug: "open-questions"
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
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "mcp-gitlab.s01.restate.md"
  - "mcp-gitlab.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Summarize the open questions, missing input, conflicts and the readiness verdict.

## Step Contract
```yaml
step_goal: "Separate the open points that still block the acceptance criteria and the technical approach for the MCP GitLab phase 1."
input_summary:
  - "Phase 1 scope is locked: existing GitLab repo, pull/push only"
  - "The repo already has a pattern in mcp/github-push"
  - "zereight/gitlab-mcp has been locked as the standard for the GitLab lane"
output_summary:
  - "A list of open questions with owners"
  - "A readiness verdict for step s04"
done_when:
  - "The missing decisions are listed clearly for the human to lock"
  - "It states why the work item is not yet fully ready for s04"
owner: "developer"
```

## Main Artifact
```yaml
open_questions: []
missing_inputs:
  - "The minimum intervention to fit the inspect/pull/push need: use it directly or add a thin wrapper around the standard runtime"
  - "The expected behavior when the local branch has uncommitted changes before a pull"
conflicts:
  - "The selected standard runtime leans toward the GitLab platform/API, while phase 1 needs the local git workflow inspect/pull/push for an existing repo"
assumptions:
  - "The GitLab API create project is not part of the phase 1 scope"
  - "The target remote repository already exists and is managed by the team"
  - "Phase 1 prefers SSH auth; HTTPS + PAT can be deferred to a later phase if needed"
  - "The MVP tool surface only includes inspect, pull and push"
  - "The default pull uses ff-only to reduce unexpected merge behavior"
  - "The work item and the phase 1 MCP/package name use the short `mcp-gitlab` convention"
  - "The workflow must record the provider target explicitly instead of inferring GitHub/GitLab"
```

## Input Readiness
```yaml
status: READY
blocking_items: []
owner_actions:
  - "The developer locks in step 5 whether to use the standard runtime directly or wrap it"
  - "The developer materializes the technical approach per the step 4 approval"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "The scope is now significantly clearer than the original raw request"
  - "Auth, the pull strategy, the MVP tool surface and the standard runtime have been confirmed by the user"
  - "The remaining conflict is a technical-fit issue for step 5 and does not block s04"
```

## Traceability
```yaml
upstream:
  - "mcp-gitlab.s01.restate.md"
next_step: "mcp-gitlab.s04.acceptance-criteria.md"
```

## Handoff
- Readiness status: READY.
- What to do next: use the step 4 approval to materialize the technical approach; the adopt-vs-wrap conflict will be handled in step 5.