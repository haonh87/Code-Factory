---
artifact_id: "fix-update-source-resolution.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "fix-update-source-resolution"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: BUG
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
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: ["developer"]
  contract: []
  dor: ["qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
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
  - "fix-update-source-resolution.s01.restate.md"
  - "fix-update-source-resolution.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Open Questions — Resolved implementation boundaries

## Main Artifact

```yaml
open_questions: []
resolved_decisions:
  - "Default source belongs to the running CLI; explicit --repo-root remains authoritative"
  - "Reject downgrade only for update; deliberate reinstall uses existing install with explicit source"
  - "Compare documented stable X.Y.Z release versions numerically; fail on unsupported nonempty version metadata"
  - "Check affected runtime metadata and selected project manifests before any mutation"
  - "Fresh/no-version legacy state preserves bootstrap compatibility"
  - "No new flags, dependencies, publication or fleet rollout"
remaining_dependencies: ["Human trusted readiness signature"]
```

## Session Handoff

No product question blocks the proposed patch. The readiness packet makes the
compatibility choice and deliberate rollback path reviewable before signing.

