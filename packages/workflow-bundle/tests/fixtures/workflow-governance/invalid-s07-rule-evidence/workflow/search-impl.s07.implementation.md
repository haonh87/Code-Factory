---
artifact_id: "search-impl.s07.implementation"
artifact_family: workflow-step
work_item_slug: "search-impl"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: implemented
execution_mode: agentic
execution_roles:
  - developer
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
  - codex-workflow-chain
artifact_skills:
  - obsidian-markdown
upstream_artifacts: []
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s07
---

# Step 7 - Implement

## Step Contract
```yaml
step_goal: "Fixture fail cho delivery rule evidence."
done_when:
  - "Validator phải bắt sai TDD và review."
owner: "developer"
```

## Artifact Chính
```yaml
implemented_changes:
  - "Thêm behavior search mới"
doc_changes: []
operational_notes: []
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: NOT_REQUIRED
tdd_test_refs: []
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: STANDARD
worktree_status: NOT_REQUIRED
worktree_refs: []
worktree_reason: ""
review_status: COMPLETED
review_refs: []
spec_compliance_status: PASS
code_quality_status: NOT_RUN
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: ""
verify_path: []
```

## Implementation Notes
```yaml
framework_notes: []
known_limitations: []
```
