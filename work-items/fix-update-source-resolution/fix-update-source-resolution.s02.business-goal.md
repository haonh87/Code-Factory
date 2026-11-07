---
artifact_id: "fix-update-source-resolution.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "fix-update-source-resolution"
step_id: "s02"
step_slug: "business-goal"
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "fix-update-source-resolution.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Business Goal — Predictable managed updates

## Main Artifact

```yaml
business_goal: "Keep an update tied to its chosen CLI/source and prevent silent version regression"
user_value: "Running wfc from an old checkout cannot undo the installed release"
success_metrics: ["Old-cwd update keeps the CLI source version", "Rejected downgrades leave byte/mode snapshots unchanged", "Codex and Claude upgrades remain functional"]
in_scope: ["REQ-001 through REQ-004 in the canonical spec"]
out_of_scope: ["Release publication", "Real machine rollout", "Large-hook payload follow-up", "A3/A4"]
```

## Session Handoff

The observable result is safe source selection and pre-write refusal, not merely a
version printed by status. Verification must execute update against disposable installs.

