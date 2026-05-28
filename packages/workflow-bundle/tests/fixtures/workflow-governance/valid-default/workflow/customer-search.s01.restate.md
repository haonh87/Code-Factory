---
artifact_id: "customer-search.s01.restate"
artifact_family: workflow-step
work_item_slug: "customer-search"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
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
  srs: ""
spec_status: reviewed
execution_mode: agentic
execution_roles:
  - ba
  - po
role_signoffs:
  dor:
    - ba
    - po
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
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
  - workflow/s01
---

# Step 1 - Clarify

## Step Contract
```yaml
step_goal: "Làm rõ phạm vi feature customer search và ràng buộc ban đầu."
exit_when:
  - "Đã chốt phạm vi đầu vào cho step 2."
  - "Không còn ambiguity trọng yếu ở mức discovery."
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "backbone-first"
required_reviews:
  - "po"
  - "ba"
prohibited_actions:
  - "Chuyển sang approach khi scope chưa rõ"
open_governance_questions: []
```

## Artifact Chính
```yaml
raw_request: "Thêm ô tìm kiếm khách hàng theo tên và email."
restated_request: "Cho phép người dùng tìm khách hàng theo tên hoặc email trong màn hình danh sách."
request_type: FEATURE
user_problem_initial: "Tìm khách hàng thủ công quá chậm."
business_context_initial: "CS team cần tìm hồ sơ nhanh khi hỗ trợ khách."
scope_draft:
  in:
    - "Tìm theo tên"
    - "Tìm theo email"
  out:
    - "Tìm full-text toàn hệ thống"
constraints_initial:
  - "Không đổi flow phân quyền"
assumptions_initial:
  - "Dữ liệu email đã được index"
open_questions_initial: []
dependencies_initial:
  - "API customer list"
risks_initial:
  - "Kết quả quá lớn nếu không có debounce"
notes_for_step_2: "Tập trung vào time-to-find và accuracy."
```

## Traceability
```yaml
source_inputs:
  - "user-request"
next_step: "customer-search.s02.business-goal.md"
```

## Handoff
- Điều đã rõ: phạm vi search theo tên và email.
- Điều còn cần theo dõi: verify UX với danh sách lớn.
- Điều kiện sang step 2: business outcome và success metric phải được chốt.
