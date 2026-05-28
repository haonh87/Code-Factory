---
artifact_id: "billing-export.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "billing-export"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: CHANGE
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: light
spec_refs:
  brd: "product-specs/brd/billing-export.md"
  srs: "product-specs/srs/billing-export.md"
spec_status: approved
execution_mode: agentic
execution_roles:
  - developer
  - qc
role_signoffs:
  dor: []
  approach:
    - developer
  task_plan:
    - developer
  release: []
  business_acceptance: []
  dod:
    - qc
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by:
    - developer
  task_plan_reviewed_at: "2026-04-14T11:30:00Z"
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
  - workflow/s06
---

# Step 6 - Task Plan

## Step Contract
```yaml
step_goal: "Case fail vì checklist không khớp profile strict."
```

## Artifact Chính
```yaml
tasks:
  - id: T1
    title: "Refactor export job"
```

## Verification Plan
```yaml
test_refs:
  - "Export smoke"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - id: GOV-CHK-401
    status: PASS
    evidence: "Block này tồn tại để cô lập lỗi checklist"
blocking_items: []
owner: "developer"
next_action: "Không có"
```

## Traceability
```yaml
next_step: "billing-export.s07.implementation.md"
```

## Handoff
- Điều đã rõ: fixture này phải fail vì checklist mismatch.
