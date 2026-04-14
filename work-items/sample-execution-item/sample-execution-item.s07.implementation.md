---
artifact_id: "sample-execution-item.s07.implementation"
artifact_family: workflow-step
work_item_slug: "sample-execution-item"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: FEATURE
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
execution_mode: multi_agent
execution_roles:
  - "coordinator"
  - "backend-builder"
  - "frontend-builder"
review_mode: independent
verification_owner: "auditor"
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance: []
  dod: []
content_skills:
  - "codex-workflow-chain"
  - "implementation"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sample-execution-item.s06.task-breakdown.md"
linked_artifacts:
  - "sample-execution-item.s07.worker-handoff-report.md"
  - "sample-execution-item.s07.merge-report.md"
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.

## Step Contract
```yaml
step_goal: "Thực thi thay đổi theo owned scope và trả evidence đủ cho merge + audit."
input_summary:
  - "task breakdown và worker assignment"
  - "technical approach và execution policy"
output_summary:
  - "implemented changes"
  - "merge report"
done_when:
  - "có handoff report từ worker"
  - "coordinator merge xong và sẵn sàng cho audit"
owner: "coordinator"
```

## Artifact Chính
```yaml
implemented_changes:
  - "backend callback flow đã được implement theo owned scope"
  - "frontend login state đã được cập nhật và tách path rõ"
doc_changes:
  - "cập nhật execution runtime artifacts cho step 7"
operational_notes:
  - "chưa phát sinh release artifact riêng"
```

## Implementation Notes
```yaml
framework_notes:
  - "sample này mô tả runtime contract, không kèm code path thật"
known_limitations:
  - "chưa materialize worker assignment thành nhiều file riêng theo từng worker"
```

## Execution Runtime
```yaml
execution_mode: multi_agent
review_mode: independent
verification_owner: "auditor"
runtime_artifacts:
  - "sample-execution-item.s07.worker-handoff-report.md"
  - "sample-execution-item.s07.merge-report.md"
```

## Traceability
```yaml
upstream:
  - "sample-execution-item.s06.task-breakdown.md"
  - "sample-execution-item.s06.worker-assignment.md"
next_step: "sample-execution-item.s08.verification.md"
```

## Handoff
- Outputs actual: handoff report của builder và merge report của coordinator.
- Known limitations: sample chỉ giữ một handoff report canonical để minh họa contract.
- Notes for testing: verify owner phải kiểm evidence trước khi chốt audit.
- Notes for deployment khi có: chưa có deployment review riêng.
