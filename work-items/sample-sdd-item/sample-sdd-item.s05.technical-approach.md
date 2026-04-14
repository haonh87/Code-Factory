---
artifact_id: "sample-sdd-item.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "sample-sdd-item"
step_id: "s05"
step_slug: "technical-approach"
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
change_id: "CHANGE-001"
change_status: verified
spec_delta_refs:
  - "changes/CHANGE-001/spec-delta/brd.delta.md"
  - "changes/CHANGE-001/spec-delta/srs.delta.md"
archive_status: ready_to_archive
sdd_mode: strict
spec_refs:
  brd: "product-specs/brd/sample-sdd-item.md"
  srs: "product-specs/srs/sample-sdd-item.md"
spec_status: frozen
execution_mode: agentic
execution_roles: []
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance: []
  dod: []
content_skills:
  - "codex-workflow-chain"
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sample-sdd-item.s04.acceptance-criteria.md"
linked_artifacts:
  - "product-specs/brd/sample-sdd-item.md"
  - "product-specs/srs/sample-sdd-item.md"
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Tóm tắt option được khuyến nghị, trade-off và boundary kỹ thuật cần giữ.

## Step Contract
```yaml
step_goal: ""
input_summary: []
output_summary: []
done_when: []
owner: ""
```

## Option Analysis
```yaml
options:
  - "lọc sau khi lấy toàn bộ kết quả"
  - "đẩy workspace filter xuống query layer read-only"
recommended_option: "đẩy workspace filter xuống query layer read-only"
trade_offs:
  - "cần normalize path sớm hơn"
  - "được lợi về đúng tập kết quả và ít nhiễu hơn"
```

## Artifact Chính
```yaml
recommended_approach: "thêm workspace filter optional vào flow query và giữ fallback path cũ khi input trống"
why: "đáp ứng BRD-001 và SRS-FR-001/002 mà không phá SRS-NFR-001"
boundaries:
  - "adapter input parsing"
  - "read-only query filtering"
  - "error handling cho path invalid"
risk_notes:
  - "normalize path sai có thể làm miss kết quả"
```

## Architecture Details
```yaml
domain_boundaries:
  - "session-search request parsing"
  - "cass query adapter"
integration_points:
  - "cass read-only search"
data_or_runtime_notes:
  - "không có migration và không thay session schema"
```

## Spec Change
```yaml
change_id: "CHANGE-001"
detected_in_step: s05
impact_area: technical
current_spec_refs:
  - "SRS-FR-001"
  - "SRS-FR-002"
problem: "Chưa phát hiện spec gap cần mở change ở thời điểm chốt approach."
proposed_change: "Giữ section này để trace nếu gap phát sinh sau freeze."
decision: DEFERRED
decision_owner: "developer"
updated_artifacts: []
required_followups: []
```

## SDD Traceability
```yaml
requirement_refs: [SRS-FR-001, SRS-FR-002, SRS-NFR-001, SRS-UX-001]
acceptance_refs: [AC-001, AC-002, AC-003, AC-004]
task_refs: [TASK-001, TASK-002, TASK-003]
test_refs: [TEST-001, TEST-002, TEST-003, TEST-004]
```

## Traceability
```yaml
upstream:
  - "sample-sdd-item.s04.acceptance-criteria.md"
  - "product-specs/srs/sample-sdd-item.md"
next_step: "sample-sdd-item.s06.task-breakdown.md"
```

## Handoff
- Recommended option: filter ngay trong query layer read-only.
- Trade-off chấp nhận: cần normalize path sớm hơn để giữ tập kết quả đúng.
- Điều kiện sang step 6: task phải map đủ về requirement và test.
- Deployment note khi có: không cần migration; release risk thấp.
