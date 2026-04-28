---
artifact_id: "mcp-gitlab.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "mcp-gitlab"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: FEATURE
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
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
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
  - "codex-workflow-chain"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "mcp-gitlab.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Tóm tắt user problem, business outcome, success metric và non-goals.

## Step Contract
```yaml
step_goal: "Khóa giá trị business và user value của MCP GitLab phase 1 trước khi chốt acceptance criteria."
input_summary:
  - "Yêu cầu đã được restate ở step 1"
  - "User đã xác nhận phase 1 chỉ tập trung inspect + pull + push"
  - "User đã chốt dùng zereight/gitlab-mcp làm chuẩn cho lane GitLab"
  - "Auth ưu tiên SSH và pull mặc định ff-only"
output_summary:
  - "User problem và business goal rõ ràng"
  - "Success metrics, standard runtime và non-goals đủ để khóa scope"
done_when:
  - "Không còn hiểu nhầm phase 1 là full GitLab lifecycle"
  - "Non-goals đủ rõ để chặn create repo, MR và CI/CD"
owner: "developer"
```

## Artifact Chính
```yaml
user_problem: "Workflow hiện chưa có lane GitLab chuẩn hóa tương đương mức rõ ràng của lane GitHub, nên agent dễ phải suy diễn sai provider, auth và runtime khi làm việc với GitLab self-hosted."
business_goal: "Chuẩn hóa lane GitLab trên workflow bằng cách dùng zereight/gitlab-mcp làm chuẩn runtime/reference cho gitlab.ggg.com.vn, đồng thời vẫn đạt được nhu cầu phase 1 là inspect, pull và push trên repository đã tồn tại."
success_metrics:
  - "Lane GitLab có runtime chuẩn được gọi tên rõ thay vì tự viết mới hoặc suy diễn từ lane GitHub"
  - "Workflow artifact chỉ rõ provider target=gitlab, host và runtime chuẩn khi scope chạm provider-specific MCP"
  - "Phase 1 vẫn đáp ứng inspect, pull và push cho repository GitLab đã tồn tại mà không kéo scope sang project lifecycle khác"
non_goals:
  - "Tạo mới GitLab repository hoặc project"
  - "Quản lý merge request"
  - "Quản lý GitLab CI/CD hoặc project settings"
  - "Thiết kế full Git provider abstraction cho nhiều nền tảng trong phase 1"
  - "Xây một GitLab MCP mới từ đầu nếu standard runtime hiện có đủ hoặc chỉ cần wrapper mỏng"
constraints:
  - "GitLab host mục tiêu là gitlab.ggg.com.vn"
  - "Auth phase 1 ưu tiên SSH"
  - "Pull mặc định là ff-only"
  - "MVP chỉ gồm inspect, pull, push"
  - "Provider distinction GitHub/GitLab phải explicit trong workflow artifact khi scope chạm runtime/auth/host riêng"
assumptions:
  - "Repository GitLab đích đã tồn tại và team đã có quyền truy cập phù hợp"
  - "Máy chạy MCP có Git CLI và SSH credential dùng được với GitLab nội bộ"
  - "zereight/gitlab-mcp có thể được dùng trực tiếp hoặc làm chuẩn để wrap mà không cần redesign lane GitLab từ đầu"
```

## Traceability
```yaml
upstream:
  - "mcp-gitlab.s01.restate.md"
next_step: "mcp-gitlab.s03.open-questions.md"
```

## Handoff
- User problem đã chốt: thiếu MCP GitLab self-hosted tối thiểu cho repo nội bộ đã tồn tại.
- Non-goals: create repo, merge request, CI/CD và admin workflow không thuộc phase 1.
- Điều kiện sang step 3: xác nhận các quyết định còn lại không còn blocker cho step 4.
