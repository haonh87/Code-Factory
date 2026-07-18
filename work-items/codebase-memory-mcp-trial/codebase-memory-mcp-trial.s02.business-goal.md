---
artifact_id: "codebase-memory-mcp-trial.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "codebase-memory-mcp-trial"
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
  - "codebase-memory-mcp-trial.s01.restate.md"
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
step_goal: "Chốt user problem, business outcome, success metric đo được và non-goals cho trial codebase-memory-mcp, đủ để s03 bóc open question."
input_summary:
  - "s01 restate: trial cục bộ codebase-memory-mcp, brownfield, chạm MCP config + hook + wfc validate"
  - "Research: codebase-memory-mcp giảm 99.2% token cho query cấu trúc, ít 10× token, ít 2.1× tool call trên 31 repo"
output_summary:
  - "user_problem + business_goal rõ"
  - "success_metrics đo được (token, tool call, wfc validate pass trước/sau)"
  - "non_goals chốt ranh scope"
done_when:
  - "business_goal nêu outcome nghiệp vụ đo được"
  - "success_metrics có chỉ số cụ thể (không cảm tính)"
  - "non_goals chốt rõ cái không làm"
owner: "claude (author) -> human (reviewer)"
```

## Artifact Chính
```yaml
user_problem: >-
  Agent phải grep/read nhiều file để hiểu call graph của Code-Factory (workflow-bundle CLI,
  hooks, 36 skill, MCP). Tốn token và tool call lớn cho mỗi lần khám phá cấu trúc, đặc biệt
  khi query cross-file (vd workflow-bundle-cli.js gọi tới utils nào, hook đọc report.json ở đâu).
business_goal: >-
  Giúp agent ops của Code-Factory hiểu call graph nhanh hơn và tốn ít token hơn khi query cấu trúc,
  bằng cách index codebase thành knowledge graph qua codebase-memory-mcp (trial cục bộ 1 codebase).
  Giữ nguyên governance/validator: wfc validate vẫn pass trước/sau khi enable MCP/hook.
success_metrics:
  - "wfc validate --workflow-root work-items PASS cả trước và sau khi enable MCP/hook (gate bắt buộc, không được break)"
  - "Smoke query 1 call graph cấu trúc (vd workflow-bundle-cli.js -> utils liên quan) cho kết quả đúng với grep manual"
  - "Token cho 1 query cấu trúc thử nghiệm giảm đáng kể so với grep/read file-by-file (đo so sánh cùng query)"
  - "Tool call count cho query đó không tăng (mục tiêu giảm, ít nhất không tăng)"
  - "Hook PreToolUse non-blocking: exit 0, không bao giờ block tool call gốc"
  - "Rollback path rõ: disable MCP/hook trong 1 bước, codebase về trạng thái trước trial"
non_goals:
  - "Không rollout config team-wide / commit .mcp.json chung trong trial này"
  - "Không commit binary codebase-memory vào repo"
  - "Không thay workflow-chain 8 step hay governance baseline"
  - "Không sửa production behavior code của workflow-bundle / hooks / skill"
  - "Không self-host LLM inference (LMCache out-of-scope, WI khác)"
  - "Không đảm bảo mọi ngôn ngữ trong Code-Factory đều có type-resolution (hybrid LSP chỉ 11 ngôn ngữ)"
constraints:
  - "delivery_context=brownfield: Code-Factory đang vận hành, không break wfc validate"
  - "planning_track=full: chạm nhiều boundary (MCP config + hook + governance baseline)"
  - "Trial cục bộ 1 session, không yêu cầu team-wide"
  - "Hook non-blocking (exit 0) theo default an toàn"
  - "AI proposes, human approves ở mọi gate"
  - "UTF-8 cho file .md tiếng Việt"
assumptions:
  - "Binary codebase-memory-mcp chạy được trên darwin/macOS môi trường hiện tại"
  - "codebase-memory-mcp support Claude Code qua .claude/.mcp.json + PreToolUse hook non-blocking"
  - "Số liệu research (99.2% token giảm) là tham chiếu, không phải cam kết cho Code-Factory cụ thể -> phải đo lại"
```

## Traceability
```yaml
upstream:
  - "codebase-memory-mcp-trial.s01.restate.md (scope_draft, risks_initial, governance context)"
next_step: "s03 Open Questions (bóc missing input/conflict/governance blocker + owner)"
```

## Handoff
- User problem đã chốt: agent tốn token/tool call grep/read để hiểu call graph Code-Factory.
- Business goal: giảm token + tăng tốc query cấu trúc qua graph MCP, giữ wfc validate pass.
- Success metrics: wfc validate pass trước/sau, smoke query đúng vs grep, token giảm, tool call không tăng, hook exit 0, rollback path rõ.
- Non-goals: không rollout team-wide, không commit binary, không thay workflow-chain, không self-host inference.
- Điều kiện sang step 3: human OK business goal + success metrics (có thể ghi note), sau đó s03 bóc open question về install method, worktree, rollback, snapshot gitignore.
