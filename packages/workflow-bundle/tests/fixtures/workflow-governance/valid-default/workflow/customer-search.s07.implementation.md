---
artifact_id: "customer-search.s07.implementation"
artifact_family: workflow-step
work_item_slug: "customer-search"
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
sdd_mode: light
spec_refs:
  brd: "product-specs/brd/customer-search.md"
  srs: "product-specs/srs/customer-search.md"
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
upstream_artifacts:
  - "customer-search.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s07
---

# Step 7 - Implement

## Step Contract
```yaml
step_goal: "Implement customer search đúng task plan và chuẩn bị evidence cho verify."
done_when:
  - "Behavior mới đã pass test."
  - "Review trong s07 đã có evidence rõ."
owner: "developer"
```

## Artifact Chính
```yaml
implemented_changes:
  - "Thêm debounce cho search input"
  - "Mở rộng API filter theo email"
doc_changes: []
operational_notes:
  - "Không cần migration"
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "tests/customer-search.spec.ts"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: STANDARD
worktree_status: NOT_REQUIRED
worktree_refs: []
worktree_reason: ""
review_status: COMPLETED
review_refs:
  - "reviews/customer-search-s07.md"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: ""
verify_path:
  - "npm test -- customer-search"
```

## Implementation Notes
```yaml
framework_notes:
  - "Giữ nguyên query shape hiện có"
known_limitations: []
```

## Traceability
```yaml
upstream:
  - "customer-search.s06.task-breakdown.md"
next_step: "customer-search.s08.verification.md"
```

## Handoff
- Outputs actual: debounce + API filter + tests.
- Known limitations: chưa benchmark dataset rất lớn.
- Notes for testing: tập trung no-result và email case-insensitive.
- Notes for deployment khi có: không có.
