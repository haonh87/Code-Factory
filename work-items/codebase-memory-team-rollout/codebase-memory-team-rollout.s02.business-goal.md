---
artifact_id: "codebase-memory-team-rollout.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "codebase-memory-team-rollout"
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
  - "codebase-memory-team-rollout.s01.restate.md"
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
step_goal: "Chốt user problem, business goal, success metrics đo được và non-goals cho rollout team-wide codebase-memory MCP."
input_summary:
  - "s01 restate (human confirmed 2026-07-18): scope in/out, constraints, OQ ban đầu"
  - "Trial evidence: giá trị đã chứng minh ở depth-1 query (AC-4/AC-6)"
output_summary:
  - "business_goal + success_metrics đo được + non_goals"
done_when:
  - "success_metrics không cảm tính, đo được ở s08"
  - "non_goals loại rõ phần không làm"
owner: "claude (draft) -> human (review cùng Spec gate ở s04)"
```

## Artifact Chính
```yaml
user_problem: >-
  Giá trị của codebase-memory MCP đang bị khóa trên 1 máy: config git-ignored với absolute
  path đặc thù máy, teammate không thấy tool, không có hướng dẫn install/index, và không
  biết limitation đã đo (depth>1 đứt ở import boundary) — dễ dùng sai hoặc không dùng.
business_goal: >-
  Mọi teammate mở session Claude Code trong repo này đều dùng được codebase-memory MCP
  với kỳ vọng đúng (biết limitation), onboard rẻ, và teammate CHƯA cài binary không bị
  ảnh hưởng workflow.
success_metrics:
  - "SM-1: Teammate mới setup được tool bằng số lệnh documented hữu hạn (mục tiêu <= 3 lệnh, <= 10 phút, không cần hỏi ai)"
  - "SM-2: Config chia sẻ không chứa path đặc thù máy — hoạt động trên máy khác không sửa tay"
  - "SM-3: Session trên máy CHƯA cài binary vẫn hoạt động bình thường (không block tool khác, wfc validate PASS)"
  - "SM-4: Guidance limitation (depth>1 import boundary, Markdown không LSP, re-index khi code đổi) có mặt trong tài liệu chung của repo"
  - "SM-5: wfc validate PASS trước/sau mọi thay đổi config (gate cứng kế thừa trial)"
non_goals:
  - "Tích hợp CI/CD hoặc benchmark đa-query chính thức"
  - "Hook PreToolUse auto-intercept Grep/Glob (giữ OPT-B)"
  - "Tự fix upstream limitation depth>1 (chỉ ghi nhận, có thể file issue)"
  - "Commit binary/snapshot/lockfile-entry vào repo"
  - "Bắt buộc 100% teammate phải cài — opt-in là chấp nhận được nếu s05 chọn hướng đó"
constraints:
  - "Kế thừa s01: wfc validate gate cứng; degrade êm khi thiếu binary; binary không vào repo/lockfile"
assumptions:
  - "Team dùng Claude Code mode claude, project-scope .mcp.json đọc từ repo root"
  - "v0.9.0 là version mục tiêu (OQ-3 s03: đã xác nhận là latest, chưa có fix)"
```

## Traceability
```yaml
upstream:
  - "codebase-memory-team-rollout.s01.restate.md"
next_step: "s03 Open Questions (resolve OQ-1..OQ-4, readiness verdict)"
```

## Handoff
- User problem đã chốt: giá trị tool bị khóa 1 máy, thiếu hướng dẫn + limitation guidance cho team.
- Non-goals: CI/CD, hook auto-intercept, fix upstream, commit binary, bắt buộc 100% adoption.
- Điều kiện sang step 3: business goal + SM-1..SM-5 được human review (gộp vào Spec gate s04 theo planning_track=full).
