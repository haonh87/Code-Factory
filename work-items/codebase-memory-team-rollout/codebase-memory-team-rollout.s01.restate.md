---
artifact_id: "codebase-memory-team-rollout.s01.restate"
artifact_family: workflow-step
work_item_slug: "codebase-memory-team-rollout"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
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
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "codebase-memory-mcp-trial.s08.verification.md"
linked_artifacts:
  - "docs/research/codebase-memory-depth2-measurement.md"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Rollout codebase-memory MCP từ trial cục bộ (1 máy, git-ignored) thành cấu hình dùng chung
> cho team, kế thừa evidence và limitation từ work item codebase-memory-mcp-trial (DONE).

## Step Contract
```yaml
step_goal: "Làm rõ yêu cầu rollout team-wide cho codebase-memory MCP: scope, ràng buộc, giả định, rủi ro và governance context; đủ để sang s02 Business Goal."
input_summary:
  - "codebase-memory-mcp-trial DONE 2026-07-17: 6/8 AC pass, trial OPT-B (MCP only), entry .mcp.json git-ignored"
  - "docs/research/codebase-memory-depth2-measurement.md (2026-07-18): depth>1 outbound đứt ở import boundary v0.9.0 — limitation phải đưa vào guidance"
  - "Yêu cầu human 2026-07-18: mở work item rollout team-wide"
output_summary:
  - "restated_request + scope_draft in/out + constraints + assumptions + open questions ban đầu"
done_when:
  - "Human xác nhận restated_request và scope_draft đúng ý định"
  - "Open questions ban đầu đã liệt kê đủ để s03 xử lý"
owner: "claude (draft) -> human (confirm hiểu đúng)"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes, human approves — mọi gate human pass explicit"
  - "Giải pháp nhỏ nhất đủ đúng — không mở surface config ngoài nhu cầu rollout"
  - "Brownfield delta discipline — baseline là trial đang chạy + .mcp.json git-ignored"
required_reviews:
  - "Spec + DoR (s04), Approach (s05), Task Plan (s06), DoD (s08)"
prohibited_actions:
  - "Không commit config/secret đặc thù máy cá nhân vào repo"
  - "Không implement trước khi s04-s06 pass (rule Spec/Design Trước Code)"
open_governance_questions:
  - "Commit .mcp.json chung có ảnh hưởng teammate chưa cài binary không (MCP server fail khi thiếu binary)?"
```

## Artifact Chính
```yaml
raw_request: "Mở work item rollout team-wide: đưa codebase-memory MCP thành config chung cho team (commit .mcp.json, hướng dẫn install)."
restated_request: >-
  Chuyển codebase-memory MCP từ trial cục bộ (entry .mcp.json git-ignored trên 1 máy) thành
  cấu hình team-wide: config MCP được commit vào repo (hoặc cơ chế opt-in tương đương),
  kèm hướng dẫn install binary + index cho teammate, và guidance sử dụng có ghi rõ
  limitation đã biết (depth>1 đứt ở import boundary, Markdown không LSP, cần re-index khi code đổi).
request_type: CHANGE
user_problem_initial: >-
  Hiện chỉ 1 máy dùng được codebase-memory (config git-ignored, binary install riêng);
  teammate không thấy tool, không có hướng dẫn, không biết limitation — giá trị trial
  không nhân rộng được.
business_context_initial: >-
  Trial đã chứng minh giá trị ở query single-hop (call graph đúng, 1 tool call thay 3);
  repo là AI Agent Ops nên tool giúp agent đọc codebase hiệu quả có giá trị trực tiếp
  cho mọi session của team.
scope_draft:
  in:
    - "Cơ chế chia sẻ config MCP codebase-memory cho team (commit .mcp.json hoặc opt-in mechanism — quyết ở s05)"
    - "Hướng dẫn install binary (npm) + index repo lần đầu cho teammate"
    - "Guidance sử dụng + limitation đã biết (từ trial + đo depth-2)"
    - "Gỡ guard /.mcp.json trong .gitignore nếu chọn commit config chung"
  out:
    - "Tích hợp CI/CD (vẫn out như trial)"
    - "Hook PreToolUse auto-intercept Grep/Glob (OPT-B của trial giữ nguyên)"
    - "Fix upstream limitation depth>1 (chỉ ghi nhận + có thể file issue, không tự fix)"
    - "Commit binary/snapshot graph vào repo"
constraints_initial:
  - "wfc validate phải PASS trước/sau mọi thay đổi config (gate cứng như trial)"
  - "Teammate chưa cài binary không được bị block workflow (MCP fail phải degrade êm)"
  - "Binary 273MB install qua npm --no-save hoặc tương đương — không vào lockfile/repo"
assumptions_initial:
  - "Team dùng Claude Code mode claude (project-scope .mcp.json được đọc từ repo root)"
  - "v0.9.0 vẫn là version mục tiêu trừ khi version mới fix import-boundary (check ở s03/s05)"
open_questions_initial:
  - "OQ-1: Claude Code xử lý thế nào khi .mcp.json trỏ binary chưa install? (cần verify hành vi degrade)"
  - "OQ-2: Commit .mcp.json chung hay dùng .mcp.json.example + hướng dẫn copy (opt-in)?"
  - "OQ-3: Có version codebase-memory-mcp mới hơn 0.9.0 fix depth>1 không? Có file issue upstream không?"
  - "OQ-4: Hướng dẫn đặt ở đâu — ONBOARDING, docs/, hay README của mcp/?"
dependencies_initial:
  - "codebase-memory-mcp-trial (DONE) — evidence + rollback path"
  - "docs/research/codebase-memory-depth2-measurement.md — limitation input"
risks_initial:
  - "Commit .mcp.json chung có thể làm session teammate báo lỗi MCP nếu thiếu binary (OQ-1)"
  - ".mcp.json hiện git-ignored — gỡ guard sai cách có thể leak config cá nhân khác nếu file chứa server ngoài scope"
  - "Index per-machine gắn HEAD — teammate quên re-index sẽ tin kết quả graph cũ"
notes_for_step_2: >-
  Business goal nên đo bằng: số máy/team dùng được tool sau rollout, thời gian onboard
  (install + index) và việc guidance limitation có mặt trong tài liệu chung.
```

## Traceability
```yaml
source_inputs:
  - "work-items/codebase-memory-mcp-trial/codebase-memory-mcp-trial.s08.verification.md"
  - "docs/research/codebase-memory-depth2-measurement.md"
next_step: "s02 Business Goal (mục tiêu, giá trị, non-goals đo được)"
```

## Handoff
- Điều đã rõ: baseline trial đang chạy tốt ở depth 1; limitation depth>1 đã đo và có root cause; scope rollout là config + docs, không đổi production code.
- Điều còn cần theo dõi: OQ-1 (hành vi khi thiếu binary) quyết định hướng s05 (commit chung vs opt-in); OQ-3 (version mới) có thể đổi version mục tiêu.
- Điều kiện sang step 2: ĐÃ ĐẠT — human confirm restated_request + scope_draft 2026-07-18.
