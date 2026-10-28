---
artifact_id: "workflow-pack-security-baseline.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "workflow-pack-security-baseline"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: RESEARCH
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
  card: "product-specs/cards/workflow-pack-security-baseline.md"
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles: ["po", "ba", "ta", "developer", "qc"]
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "required"
role_signoffs:
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: ["po"]
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "workflow-pack-security-baseline.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 — Business Goal

Draft for readiness review. Admission is complete; no readiness gate is passed by this document.

## Main Artifact

```yaml
business_goal: "Provide maintainers with a current, reproducible and honestly bounded security risk baseline before prioritizing fixes."
user_value: "Reviewable evidence replaces unsupported whole-pack safety claims."
success_metrics: ["All manifest entries accounted for", "All detected findings have an owner and evidence", "No source or credential exposure"]
non_goals_ref: "product-specs/cards/workflow-pack-security-baseline.md#Scope.out_of_scope"
acceptance_ref: "product-specs/cards/workflow-pack-security-baseline.md#Acceptance Criteria"
owner: "po"
```
