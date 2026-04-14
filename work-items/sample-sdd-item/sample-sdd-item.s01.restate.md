---
artifact_id: "sample-sdd-item.s01.restate"
artifact_family: workflow-step
work_item_slug: "sample-sdd-item"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
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
spec_status: reviewed
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
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts:
  - "product-specs/brd/sample-sdd-item.md"
  - "product-specs/srs/sample-sdd-item.md"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Tóm tắt yêu cầu, phạm vi ban đầu, ràng buộc và governance context mở đầu.

## Step Contract
```yaml
step_goal: ""
input_summary: []
output_summary: []
done_when: []
owner: ""
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles: []
required_reviews: []
prohibited_actions: []
open_governance_questions: []
```

## Artifact Chính
```yaml
raw_request: "Add workspace-aware session search sample feature."
restated_request: "Bổ sung workspace filter cho flow session search và giữ behavior mặc định hiện có."
request_type: FEATURE
user_problem_initial: "Người dùng phải tự lọc kết quả session theo workspace nên mất thời gian và dễ nhầm."
business_context_initial: "Repo cần sample SDD có BRD/SRS thật để chứng minh traceability end-to-end."
scope_draft:
  in:
    - "thêm workspace filter vào flow search"
    - "giữ trace từ BRD/SRS tới verify"
  out:
    - "migration dữ liệu session"
    - "thay đổi schema storage của cass"
constraints_initial:
  - "không phá backward compatibility khi không truyền workspace filter"
assumptions_initial:
  - "workspace path được normalize trước khi query"
open_questions_initial:
  - "hành vi khi path không hợp lệ phải rõ ở SRS"
dependencies_initial:
  - "cass read-only query layer"
risks_initial:
  - "normalize path sai có thể làm miss kết quả"
notes_for_step_2: "Business Goal phải chốt compatibility là rule bắt buộc."
```

## SDD Traceability
```yaml
requirement_refs: [BRD-001, BRD-002]
acceptance_refs: []
task_refs: []
test_refs: []
```

## Traceability
```yaml
source_inputs:
  - "ticket: workspace-aware session search"
  - "product-specs/brd/sample-sdd-item.md"
next_step: "sample-sdd-item.s02.business-goal.md"
```

## Handoff
- Điều đã rõ: cần filter kết quả theo workspace và phải giữ backward compatibility.
- Điều còn cần theo dõi: rule validate path và thông điệp lỗi khi path không hợp lệ.
- Điều kiện sang step 2: chốt business goal, KPI và non-goals trong BRD.
