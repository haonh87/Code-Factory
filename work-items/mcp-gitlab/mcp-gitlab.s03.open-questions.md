---
artifact_id: "mcp-gitlab.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "mcp-gitlab"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
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
spec_status: reviewed
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
  spec:
    - "po"
  contract: []
  dor:
    - "po"
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  spec_reviewed_by:
    - "po"
  spec_reviewed_at: "2026-04-23"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "po"
  dor_reviewed_at: "2026-04-23"
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
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "mcp-gitlab.s01.restate.md"
  - "mcp-gitlab.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Tóm tắt câu hỏi mở, missing input, conflict và readiness verdict.

## Step Contract
```yaml
step_goal: "Tách rõ các điểm còn mơ hồ đang chặn acceptance criteria và technical approach cho MCP GitLab phase 1."
input_summary:
  - "Scope phase 1 đã khóa: repo GitLab đã tồn tại, chỉ pull/push"
  - "Repo có pattern sẵn ở mcp/github-push"
  - "Đã chốt dùng zereight/gitlab-mcp làm chuẩn cho lane GitLab"
output_summary:
  - "Danh sách open questions có owner"
  - "Readiness verdict cho bước s04"
done_when:
  - "Các quyết định còn thiếu được liệt kê rõ để human chốt"
  - "Nêu rõ vì sao work item chưa sẵn sàng sang s04 đầy đủ"
owner: "developer"
```

## Artifact Chính
```yaml
open_questions: []
missing_inputs:
  - "Mức can thiệp tối thiểu để khớp nhu cầu inspect/pull/push: dùng trực tiếp hay cần wrapper mỏng quanh runtime chuẩn"
  - "Kỳ vọng behavior khi local branch có uncommitted changes trước pull"
conflicts:
  - "Standard runtime được chọn thiên về GitLab platform/API, trong khi phase 1 cần local git workflow inspect/pull/push cho repo đã tồn tại"
assumptions:
  - "GitLab API create project không thuộc scope phase 1"
  - "Remote repository target đã tồn tại và do team quản lý sẵn"
  - "Phase 1 ưu tiên SSH auth; HTTPS + PAT có thể để phase sau nếu cần"
  - "Tool surface MVP chỉ gồm inspect, pull và push"
  - "Pull mặc định dùng ff-only để giảm merge behavior ngoài ý muốn"
  - "Tên work item và MCP/package phase 1 dùng hướng ngắn gọn `mcp-gitlab`"
  - "Workflow phải ghi explicit provider target thay vì suy diễn GitHub/GitLab"
```

## Input Readiness
```yaml
status: READY
blocking_items: []
owner_actions:
  - "Developer chốt ở step 5 cách dùng trực tiếp hay wrap runtime chuẩn"
  - "Developer materialize technical approach theo approval step 4"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "Scope đã rõ hơn đáng kể so với raw request ban đầu"
  - "Auth, pull strategy, tool surface MVP và standard runtime đã được user xác nhận"
  - "Conflict còn lại là technical-fit issue cho step 5, không chặn s04"
```

## Traceability
```yaml
upstream:
  - "mcp-gitlab.s01.restate.md"
next_step: "mcp-gitlab.s04.acceptance-criteria.md"
```

## Handoff
- Trạng thái readiness: READY
- Điều cần làm tiếp: dùng approval của step 4 để materialize technical approach; conflict adopt-vs-wrap sẽ được xử lý ở step 5.
