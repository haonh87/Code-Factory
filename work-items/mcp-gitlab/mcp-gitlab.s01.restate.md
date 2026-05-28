---
artifact_id: "mcp-gitlab.s01.restate"
artifact_family: workflow-step
work_item_slug: "mcp-gitlab"
step_id: "s01"
step_slug: "restate"
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
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Tóm tắt yêu cầu, phạm vi ban đầu, ràng buộc và governance context mở đầu.

## Step Contract
```yaml
step_goal: "Chốt lại yêu cầu MCP GitLab ở mức đủ rõ để không hiểu nhầm scope trước khi sang business goal và open questions."
input_summary:
  - "User muốn tạo MCP cho git workflow với GitLab self-hosted tại gitlab.ggg.com.vn"
  - "Scope đã được thu hẹp: chỉ pull và push trên repository đã tồn tại"
  - "Không tạo mới repository GitLab"
  - "Đã chốt dùng repo zereight/gitlab-mcp làm chuẩn cho lane GitLab"
output_summary:
  - "Yêu cầu được restate rõ theo context brownfield"
  - "Phạm vi draft in/out được khóa ở mức MVP"
  - "Provider target, host và runtime chuẩn được phản ánh vào work item"
  - "Các câu hỏi mở quan trọng được tách sang step 3"
done_when:
  - "Không còn hiểu nhầm rằng phase 1 phải tạo project GitLab"
  - "Scope MVP không lẫn sang merge request, CI/CD hay admin workflow"
owner: "developer"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Router trước action"
  - "Spec/design trước code"
  - "AI proposes, human approves"
required_reviews:
  - "spec"
  - "dor"
  - "approach"
  - "task_plan"
prohibited_actions:
  - "Không implement MCP server trước khi chốt spec, DoR, approach và task plan"
  - "Không mở scope sang create repo, merge request hoặc CI/CD khi chưa được approve"
open_governance_questions:
  - "Workflow artifact nên ghi provider/host/runtime ở field riêng hay decision notes chuẩn"
```

## Artifact Chính
```yaml
raw_request: "Tôi muốn tạo mcp cho phần git workflow với gitlab có domain gitlab.ggg.com.vn. Không, tôi chỉ cần pull, push code trên repo đã tồn tại. Không thực hiện tạo mới repo gitlab"
restated_request: "Chuẩn hóa lane GitLab của workflow bằng cách dùng repo zereight/gitlab-mcp làm chuẩn MCP GitLab cho self-hosted host https://gitlab.ggg.com.vn, đồng thời đáp ứng nhu cầu phase 1 là inspect, pull và push trên repository đã tồn tại."
request_type: FEATURE
user_problem_initial: "Agent hiện có lane GitHub rõ hơn GitLab, trong khi GitLab self-hosted nội bộ cần một runtime chuẩn và rule workflow rõ ràng để không phải suy diễn giữa GitHub và GitLab."
business_context_initial: "Repo này đang chuẩn hóa MCP và workflow theo hướng Codex-first, nên cần chốt chuẩn GitLab runtime, host và rule phân biệt provider trước khi đi vào technical approach."
scope_draft:
  in:
    - "dùng zereight/gitlab-mcp làm chuẩn runtime/reference cho lane GitLab"
    - "xác định cách đáp ứng inspect, pull, push cho repository GitLab đã tồn tại"
    - "ghi rõ rule workflow để phân biệt GitLab và GitHub khi scope chạm provider-specific MCP, auth hoặc host"
    - "Codex integration/config cho runtime GitLab đã chọn"
  out:
    - "tạo mới GitLab project hoặc repository"
    - "merge request workflow"
    - "branch protection, admin settings hoặc project provisioning"
    - "GitLab CI/CD pipeline management"
    - "viết lại một GitLab MCP mới từ đầu nếu repo chuẩn hiện có dùng được hoặc chỉ cần wrapper mỏng"
constraints_initial:
  - "GitLab host cố định là https://gitlab.ggg.com.vn"
  - "Workflow phải chỉ rõ provider target thay vì suy diễn GitLab/GitHub từ ngữ cảnh"
  - "GitHub lane hiện có không được bị ảnh hưởng bởi quyết định của lane GitLab"
  - "Không hỗ trợ destructive git actions như force push hoặc rewrite history trong phase 1"
assumptions_initial:
  - "Repository GitLab đích đã tồn tại sẵn"
  - "zereight/gitlab-mcp là chuẩn GitLab runtime/reference đã được user chốt"
  - "GitLab lane sẽ cần khai báo rõ provider target, host và runtime trong artifact"
  - "Có sẵn ít nhất một cơ chế auth hợp lệ để làm việc với GitLab nội bộ"
open_questions_initial:
  - "Repo chuẩn zereight/gitlab-mcp sẽ được dùng trực tiếp hay cần wrapper mỏng để khớp local git workflow phase 1"
  - "Behavior khi local working tree dirty trước pull sẽ được xử lý thế nào"
dependencies_initial:
  - "Git CLI trên máy chạy MCP"
  - "Kết nối tới GitLab self-hosted tại gitlab.ggg.com.vn"
  - "Credential GitLab nội bộ theo cơ chế auth được chọn"
  - "Repo chuẩn https://github.com/zereight/gitlab-mcp"
risks_initial:
  - "Repo chuẩn zereight/gitlab-mcp thiên về GitLab platform/API nên có thể cần quyết định adopt trực tiếp hay wrap thêm cho local pull/push workflow"
  - "Nếu không ghi explicit provider target, workflow dễ drift giữa GitHub và GitLab"
  - "Nếu mở rộng scope quá sớm sang MR hoặc create repo, work item sẽ mất focus"
notes_for_step_2: "Business goal nên chốt rõ GitLab lane dùng zereight/gitlab-mcp làm chuẩn, đồng thời provider distinction là explicit rule của workflow."
```

## Traceability
```yaml
source_inputs:
  - "chat: yêu cầu tạo MCP cho GitLab self-hosted"
  - "chat: scope phase 1 chỉ pull/push trên repo đã tồn tại"
  - "chat: quyết định dùng repo zereight/gitlab-mcp làm chuẩn cho GitLab"
  - "https://github.com/zereight/gitlab-mcp"
  - "mcp/github-push/README.md"
next_step: "mcp-gitlab.s02.business-goal.md"
```

## Handoff
- Điều đã rõ: phase 1 không tạo repo GitLab mới, GitLab lane dùng zereight/gitlab-mcp làm chuẩn, và provider distinction phải explicit.
- Điều còn cần theo dõi: có cần wrapper mỏng quanh runtime chuẩn để khớp inspect/pull/push local workflow hay không.
- Điều kiện sang step 2: business goal phải khóa rõ giá trị của standard runtime và non-goals.
