---
artifact_id: "workflow-pack-security-baseline.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "workflow-pack-security-baseline"
step_id: "s03"
step_slug: "open-questions"
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "workflow-pack-security-baseline.s01.restate.md"
  - "workflow-pack-security-baseline.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 — Open Questions

Draft for readiness review. Admission is complete; no readiness gate is passed by this document.

## Main Artifact

```yaml
questions: [{"id": "Q1", "decision": "Admit this independent child despite release near-matches", "owner": "maintainer", "status": "SIGNED_AND_RECOVERED"}, {"id": "Q2", "decision": "Approve scanner isolation, provenance and evidence contract in s05", "owner": "developer", "status": "DRAFT_FOR_REVIEW"}, {"id": "Q3", "decision": "Accept coverage limits and completion criteria in the Spec Card", "owner": "ba/qc", "status": "DRAFT_FOR_REVIEW"}]
execution_preconditions: ["Verified pinned acquisition and a working no-network isolation runtime are checked at T2. If unavailable, stop; do not silently fall back to host scanning."]
input_readiness: "Sufficient to review drafts; insufficient to execute without applicable receipts."
```
