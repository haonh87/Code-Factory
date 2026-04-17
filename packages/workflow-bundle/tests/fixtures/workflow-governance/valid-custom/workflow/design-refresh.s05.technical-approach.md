---
artifact_id: "design-refresh.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "design-refresh"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: FEATURE
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
sdd_mode: light
spec_refs:
  brd: "product-specs/brd/design-refresh.md"
  srs: "product-specs/srs/design-refresh.md"
spec_status: approved
execution_mode: agentic
execution_roles:
  - designer
  - developer
role_signoffs:
  dor: []
  approach:
    - designer
    - developer
  release: []
  business_acceptance:
    - po
  dod:
    - qc
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

## Traceability
```yaml
next_step: "design-refresh.s06.task-breakdown.md"
```

## Handoff
- Điều đã rõ: custom governance dùng cho design review.
- Điều còn cần theo dõi: verify accessibility trong step 8.
- Điều kiện sang step 6: task plan phải cover UI review và accessibility checks.
