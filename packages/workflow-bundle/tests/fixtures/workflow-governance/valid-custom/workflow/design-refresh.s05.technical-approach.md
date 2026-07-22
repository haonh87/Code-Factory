---
artifact_id: "design-refresh.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "design-refresh"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/custom/design-review.md"
governance_profile: custom
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
  - "project-context/checklists/design-review.md"
sdd_mode: strict
spec_refs:
  brd: "product-specs/brd/design-refresh.md"
  srs: "product-specs/srs/design-refresh.md"
spec_status: approved
execution_mode: agentic
execution_roles:
  - designer
  - developer
approval_gates:
  spec: required
  contract: required
  foundation: required
  uat: not_applicable
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach:
    - designer
    - developer
  foundation:
    - designer
    - developer
  task_plan: []
  uat: []
  release: []
  business_acceptance:
    - po
  dod:
    - qc
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - designer
    - developer
  approach_reviewed_at: "2026-04-14T10:00:00Z"
  foundation_reviewed_by:
    - designer
    - developer
  foundation_reviewed_at: "2026-04-14T10:05:00Z"
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
  - workflow/s05
---

# Step 5 - Technical Approach

## Step Contract
```yaml
step_goal: "Chọn approach cho design refresh với custom design governance."
exit_when:
  - "Approach phù hợp với design constraint và custom review rule."
```

## Option Analysis
```yaml
options:
  - "Refactor tại chỗ"
  - "Tách component mới"
recommended_option: "Tách component mới"
```

## Foundation Decision
```yaml
status: APPROVED
solution_class: "frontend-module-refresh"
selected_stack:
  - "React"
  - "existing design system"
selected_runtime:
  - "client-rendered web"
decision_notes:
  - "Scope này chạm app shell và design-system contract nên vẫn cần human chốt foundation decision."
```

## Artifact Chính
```yaml
recommended_approach: "Tách component mới để tránh regression trên flow cũ"
why: "Dễ review UI consistency và accessibility hơn"
```

## Architecture Details
```yaml
ui_boundaries:
  - "Search form"
  - "Result card"
accessibility_baseline:
  - "Keyboard focus"
  - "Color contrast"
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "existing search form"
  - "result card component"
compatibility_risks:
  - "Có thể lệch spacing với theme cũ"
migration_notes: []
rollback_notes:
  - "Giữ component cũ cho tới khi visual QA pass"
```

## Traceability
```yaml
next_step: "design-refresh.s06.task-breakdown.md"
```

## Handoff
- Điều đã rõ: custom governance dùng cho design review.
- Điều còn cần theo dõi: verify accessibility trong step 8.
- Điều kiện sang step 6: task plan phải cover UI review và accessibility checks.
