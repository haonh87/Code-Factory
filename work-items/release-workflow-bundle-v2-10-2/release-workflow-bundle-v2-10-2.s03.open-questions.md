---
artifact_id: "release-workflow-bundle-v2-10-2.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-10-2"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: CHANGE
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
  release: "required"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: ["developer"]
  contract: []
  dor: ["qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: ["devops"]
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
  - "release-workflow-bundle-v2-10-2.s01.restate.md"
  - "release-workflow-bundle-v2-10-2.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Open Questions — Release boundaries resolved

## Main Artifact
```yaml
open_questions: []
resolved_decisions:
  - "Version 2.10.2 is available after published 2.10.1"
  - "One PR carries approved fix ancestry plus release metadata and canonical evidence"
  - "GitHub Release publishes workflow-bundle-2.10.2.tgz and SHA256SUMS only"
  - "Same local archive tested on Node18/22; compare CI payload before publication"
  - "Companion 0.2.0 stays at its existing release link"
  - "Retain immutable 2.10.1 as patch rollback baseline"
  - "CLI metadata/helpers update requires explicit user rollout later"
  - "Large SessionStart payload can still be truncated by Claude; release notes must disclose this"
remaining_dependencies: ["Signed readiness", "Green exact-head and merge CI", "Human DoD and Release receipts"]
```

## Session Handoff
No missing product decision blocks preparing the release. Publication is conditional
on the exact archive checks and trusted Release receipt.

