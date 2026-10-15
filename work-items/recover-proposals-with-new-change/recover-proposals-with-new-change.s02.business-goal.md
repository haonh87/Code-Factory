---
artifact_id: "recover-proposals-with-new-change.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "recover-proposals-with-new-change"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: CHANGE
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
  srs: "product-specs/srs/recover-proposals-with-new-change.md"
spec_status: draft
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
  - "recover-proposals-with-new-change.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Tóm tắt user problem, business outcome, success metric và non-goals.

## Step Contract
```yaml
step_goal: "Prepare s02 for human review"
input_summary: ["Accepted scope", "main 54243b7", "product-specs/srs/recover-proposals-with-new-change.md"]
output_summary: ["Reviewable s02 proposal"]
done_when: ["Content reviewed; applicable human gates recorded separately"]
owner: "developer"
```

## Artifact Chính
```yaml
business_goal: "Resume reviewed release authoring with signed evidence intact."
user_value: "Avoid repeated intake and manual state repair."
success_metrics: ["All AC-RC criteria pass", "No auto-approved gate", "One owner per change ID"]
non_goals: ["Publish v2.6.4", "Close parent audit", "Support arbitrary linked changes"]
priority: "Release prerequisite"
```

## Traceability
```yaml
upstream: ["product-specs/srs/recover-proposals-with-new-change.md"]
next_step: "s03 after applicable approval"
```

## Handoff
Draft for human review. No implementation, gate approval, or release authorization is implied.
