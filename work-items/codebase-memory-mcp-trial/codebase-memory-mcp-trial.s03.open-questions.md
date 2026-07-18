---
artifact_id: "codebase-memory-mcp-trial.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "codebase-memory-mcp-trial"
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
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "codebase-memory-mcp-trial.s01.restate.md"
  - "codebase-memory-mcp-trial.s02.business-goal.md"
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
step_goal: "Bóc tách open questions, missing input, conflict và governance blocker cho trial codebase-memory-mcp; chốt readiness verdict và owner cho từng câu hỏi."
input_summary:
  - "s01 restate: scope_draft, open_questions_initial, risks_initial, governance context"
  - "s02 business-goal: success_metrics (wfc validate pass trước/sau, token giảm, hook exit 0, rollback path), non_goals, assumptions"
output_summary:
  - "Danh sách open questions có owner và loại (install/worktree/rollback/snapshot/governance)"
  - "Missing inputs + conflict + governance blocker"
  - "Input Readiness verdict (READY/BLOCKED/PARTIAL) + blocking items"
done_when:
  - "Mỗi open question có owner rõ (human/claude/external)"
  - "Mỗi blocking item có owner_action cụ thể"
  - "Readiness verdict rõ để quyết định có sang s04 không"
owner: "claude (author) -> human (owner cho câu hỏi cần quyết định)"
```

## Artifact Chính
```yaml
open_questions:
  - id: OQ-1
    question: "Cài codebase-memory-mcp qua method nào: curl install script, npm, hay homebrew?"
    why: "curl|bash install script có thể bị SkillSpector flag (supply chain, liên quan WI-1). npm/homebrew an toàn supply-chain hơn nhưng cần verify binary build."
    owner: human
    type: install
    default_safe_fallback: "Ưu tiên npm/homebrew; nếu phải dùng curl script thì scan qua SkillSpector trước (WI-1)."
    resolved: true
    decision: "npm (human chốt 2026-06-30). Tránh curl|bash supply-chain risk; dependency chéo WI-1 không còn bắt buộc."
  - id: OQ-2
    question: "Có cần tách worktree ở s07 không?"
    why: "Trial chạm nhiều boundary (MCP config + hook + governance baseline), rủi ro break wfc validate. Rule Worktree Cho Change Lớn Hoặc Rủi Ro áp dụng khi change lớn/rủi ro."
    owner: claude-propose -> human-approve
    type: worktree
    default_safe_fallback: "Theo default an toàn: dùng worktree vì change có dấu hiệu rủi ro (chạm MCP config + hook). Quyết định cuối ở worktree-discipline s07."
  - id: OQ-3
    question: "Rollback path cụ thể khi hook break wfc validate là gì?"
    why: "success_metric yêu cầu rollback 1 bước rõ. Cần chốt cơ chế disable hook/MCP ngay khi wfc validate fail sau enable."
    owner: claude-propose (ở s05 approach) -> human-approve
    type: rollback
    default_safe_fallback: "Disable hook qua CF_DISABLED_HOOKS hoặc xóa entry .mcp.json + hook PreToolUse, re-run wfc validate. Phải đo trước/sau ở s07."
  - id: OQ-4
    question: ".codebase-memory/graph.db.zst snapshot nên .gitignore hay commit?"
    why: "Commit giúp team skip reindex nhưng tăng repo size; .gitignore giữ repo sạch nhưng mỗi người phải reindex. Tradeoff team-share vs repo size."
    owner: human
    type: snapshot
    default_safe_fallback: "Trial cục bộ: .gitignore (không commit snapshot, không commit binary). Quyết định team-wide để sau trial."
    resolved: true
    decision: ".gitignore snapshot, không commit (human chốt 2026-06-30). Trial cục bộ, Code-Factory nhỏ reindex nhanh, tránh tăng repo size."
  - id: OQ-5
    question: "WI-2 chạm governance baseline MCP -> cần mở approval_gates.foundation không, hay chỉ Approach gate đủ?"
    why: "Foundation gate dành cho thay đổi architectural baseline (rewrite boundary, đổi stack/runtime/deployment). Add MCP server additive có thể không phải foundation."
    owner: human (governance authority)
    type: governance
    default_safe_fallback: "Default: foundation=not_applicable, chỉ cần Approach gate (s05) vì chạm MCP config baseline. Nếu human thấy chạm architectural baseline thì mở foundation."
    resolved: true
    decision: "foundation=not_applicable, chỉ Approach gate s05 (human chốt 2026-06-30 theo best practice: add MCP là additive tooling, không chạm architectural baseline runtime/stack/deployment)."
  - id: OQ-6
    question: "Trial cục bộ có cần release gate / UAT không?"
    why: "Trial không rollout team-wide, không deploy. Nhưng nếu config chung bị commit thì ảnh hưởng team."
    owner: human
    type: governance
    default_safe_fallback: "Default: uat=not_applicable, release=not_applicable (trial cục bộ, không deploy). Chỉ mở nếu lỡ chạm config chung."
  - id: OQ-7
    question: "Hybrid LSP chỉ 11 ngôn ngữ - Code-Factory chủ yếu JS/Markdown. JS có type-resolution không, đủ dùng cho call graph muốn đo?"
    why: "Research: 11 ngôn ngữ có LSP là Python/TS/JS/JSX/TSX/PHP/C#/Go/C/C++/Java/Kotlin/Rust. JS/TS có -> OK. Markdown không -> note giới hạn."
    owner: claude (verify ở s05/s07)
    type: scope
    default_safe_fallback: "JS/TS có type-resolution -> đủ cho call graph workflow-bundle (JS). Markdown note sẽ không có type-resolution."
missing_inputs:
  - "Xác nhận môi trường darwin/macOS hiện tại chạy được binary codebase-memory-mcp (verify ở s07 smoke)"
  - "Baseline token/tool-call cho 1 query cấu trúc bằng grep manual (đo ở s07 trước khi enable, làm comparison baseline)"
  - "SkillSpector scan install script nếu dùng curl|bash (liên quan WI-1, có thể cần làm trước)"
conflicts:
  - "Hook PreToolUse intercept Grep/Glob (codebase-memory-mcp) vs wfc validate (có thể dùng grep behavior) -> CONFLICT TIỀM ẨN, phải đo trước/sau để giải"
  - "Bảng 4 kỹ thuật ưu tiên WI-1 (SkillSpector) trước WI-2 -> nhưng nếu OQ-1 chọn curl|bash thì cần SkillSpector trước, tạo dependency chéo"
assumptions:
  - "JS/TS có hybrid LSP type-resolution trong codebase-memory-mcp -> đủ cho call graph Code-Factory"
  - "wfc validate không phụ thuộc hard vào grep behavior mà hook sẽ thay đổi -> giả định cần verify, không chốt vội"
  - "Trial cục bộ không ảnh hưởng team nếu không commit config chung"
  - "codebase-memory-mcp hook là non-blocking (exit 0) theo docs research"
```

## Input Readiness
```yaml
status: READY
blocking_items: []
owner_actions:
  - "claude: propose OQ-2 (worktree), OQ-3 (rollback) ở s05; verify OQ-7 (LSP JS) ở s05/s07"
note: >-
  OQ-1 (npm), OQ-4 (.gitignore snapshot), OQ-5 (foundation=not_applicable) đã chốt bởi human 2026-06-30.
  Dependency chéo WI-1 (SkillSpector) không còn bắt buộc vì không dùng curl|bash.
  OQ-2/OQ-3/OQ-6/OQ-7 là propose/verify ở s05-s07, không chặn sang s04.
```

## Audit
```yaml
audit_status: PASS
notes:
  - "Mỗi open question đã có owner và default_safe_fallback -> đủ để không kẹt vô hạn"
  - "OQ-1/OQ-4/OQ-5 đã resolve với decision rõ"
  - "CONFLICT Grep/Glob vs wfc validate là rủi ro chính, đưa vào verify path s07 (đo trước/sau) thay vì giải ở s03"
  - "OQ-7 (LSP JS) cần verify ở s05/s07 nhưng JS/TS có type-resolution theo research -> assumption hợp lý"
  - "Không có governance blocker cứng; readiness READY"
```

## Traceability
```yaml
upstream:
  - "codebase-memory-mcp-trial.s01.restate.md (open_questions_initial, risks_initial)"
  - "codebase-memory-mcp-trial.s02.business-goal.md (success_metrics, non_goals, assumptions)"
next_step: "s04 Acceptance + DoR (chốt acceptance criteria đo được + readiness verdict + approval_gates: spec=required, foundation=not_applicable, uat/release=not_applicable; human pass DoR)"
```

## Handoff
- Trạng thái readiness: READY — OQ-1/OQ-4/OQ-5 đã chốt, không còn blocker chặn sang s04.
- Điều đã rõ: install qua npm, snapshot .gitignore, foundation not_applicable, scope trial cục bộ, success metrics, rủi ro chính (hook vs wfc validate).
- Điều cần làm để sang step 4:
  - claude vào s04 draft acceptance criteria + DoR với approval_gates đã chốt.
  - OQ-2 (worktree) và OQ-3 (rollback) propose ở s05; OQ-7 (LSP JS) verify ở s05/s07.
