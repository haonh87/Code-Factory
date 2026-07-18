---
artifact_id: "codebase-memory-mcp-trial.s01.restate"
artifact_family: workflow-step
work_item_slug: "codebase-memory-mcp-trial"
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
step_goal: "Làm rõ yêu cầu triển khai codebase-memory-mcp (DeusData) vào Code-Factory ở mức trial: scope, assumption, dependency, risk ban đầu và governance context, đủ để human approve mở s04."
input_summary:
  - "Proposal docs/plans/apply-trending-ai-research-2026-06.md (WI-2, status proposal, pending human review)"
  - "Research docs/research/trending-ai-github-2026-06.md (repo #1 DeusData/codebase-memory-mcp)"
  - "Human đã approve mở WI-2 theo hướng scaffold + viết s01"
output_summary:
  - "Bản hiểu chung yêu cầu + scope draft (in/out) + assumption/dependency/risk ban đầu"
  - "Governance context: delivery_context=brownfield, boundary chạm MCP config + hook + wfc validate"
  - "Open questions ban đầu cho s03"
done_when:
  - "raw_request và restated_request đã rõ"
  - "scope_draft.in / scope_draft.out đã phân ranh trial cục bộ vs rollout team-wide"
  - "risks_initial đã nêu rủi ro hook intercept Grep/Glob ảnh hưởng wfc validate"
  - "governance_context đã nêu boundary bị tác động và gate dự kiến (Spec/DoR/Approach/Task Plan)"
  - "human đã review và approve s01 (role_signoffs.spec + gate_reviews.spec_reviewed_by/at)"
owner: "claude (author) -> human (reviewer/approver)"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Brownfield Baseline And Delta Discipline (Code-Factory đang vận hành, delta nhỏ nhất đủ đúng)"
  - "Spec/Design Trước Code (không vào s07 trước s04-s06)"
  - "Human-Controlled Gates (work item approval + Approach gate do human pass)"
  - "Default An Toàn (chưa đủ chắc thì fallback an toàn hơn)"
  - "Worktree Cho Change Lớn Hoặc Rủi Ro (s07 sẽ cần đánh giá worktree-discipline)"
required_reviews:
  - "Spec review ở s01/s04"
  - "DoR review ở s04"
  - "Approach review ở s05 (chạm MCP config baseline)"
  - "Task Plan review ở s06"
prohibited_actions:
  - "Không tự install binary, sửa .mcp.json, thêm hook PreToolUse trước khi gate pass"
  - "Không tự enable hook intercept Grep/Glob trước khi đo wfc validate trước/sau"
  - "Không commit binary codebase-memory vào repo"
  - "Không coi proposal doc đã tồn tại = gate đã pass"
open_governance_questions:
  - "WI-2 chạm governance baseline MCP -> có cần mở approval_gates.foundation không, hay chỉ Approach gate đủ?"
  - "Trial cục bộ (không commit config chung) có cần release gate không, hay not_applicable?"
  - "Hook non-blocking intercept Grep/Glob có xung đột workflow validator dùng grep không -> cần đo ở s05/s07"
```

## Artifact Chính
```yaml
raw_request: "Triển khai codebase-memory-mcp (DeusData/codebase-memory-mcp) vào Code-Factory."
restated_request: >-
  Thiết lập trial cục bộ codebase-memory-mcp cho Code-Factory: install binary ephemeral,
  add MCP config cho mode claude, thử nghiệm hook PreToolUse non-blocking intercept Grep/Glob
  inject graph context, đo wfc validate trước/sau khi enable hook để xác nhận không break
  workflow validator. Scope pilot 1 codebase (Code-Factory), không rollout team-wide,
  không commit binary, không sửa production behavior.
request_type: FEATURE
user_problem_initial: >-
  Agent tốn nhiều token grep/read để hiểu call graph của Code-Factory (workflow-bundle CLI,
  hooks, 36 skill). Muốn thử index codebase thành knowledge graph qua MCP để agent query nhanh hơn.
business_context_initial: >-
  Mượn kỹ thuật trending #1 (docs/research/trending-ai-github-2026-06.md) để tăng chất lượng
  agent ops của Code-Factory. Là WI-2 trong plan áp dụng, độ ưu tiên trung bình, đặt sau WI-1/WI-3.
scope_draft:
  in:
    - "Install binary codebase-memory-mcp local (curl install script hoặc npm/homebrew), ephemeral, không commit binary"
    - "Index Code-Factory repo thành knowledge graph local"
    - "Add MCP config cho mode claude (.claude/.mcp.json hoặc tương đương) - trial cục bộ"
    - "Thử nghiệm hook PreToolUse non-blocking intercept Grep/Glob (exit 0, inject graph context, không block)"
    - "Đo wfc validate --workflow-root work-items TRƯỚC và SAU khi enable hook, so sánh kết quả"
    - "Smoke: query 1 call graph (vd workflow-bundle-cli.js -> utils), so token vs grep manual"
    - "Document cách enable/disable trong docs/"
  out:
    - "Rollout config team-wide / commit .mcp.json vào repo chung (chờ human approve riêng sau trial)"
    - "Commit binary codebase-memory vào repo"
    - "Sửa production behavior code của workflow-bundle / hooks / skill"
    - "Thay workflow-chain 8 step hay governance baseline"
    - "Self-host LLM inference (nằm ở WI khác, LMCache out-of-scope)"
constraints_initial:
  - "delivery_context=brownfield: Code-Factory đang vận hành, không được break wfc validate / validator"
  - "planning_track=full (chạm nhiều boundary: MCP config + hook + governance baseline)"
  - "Hook phải non-blocking (exit 0) theo nguyên tắc default an toàn"
  - "UTF-8 cho mọi file .md tiếng Việt"
  - "AI proposes, human approves ở mọi gate"
assumptions_initial:
  - "Binary codebase-memory-mcp chạy được trên darwin (macOS) của môi trường hiện tại"
  - "Trial chạy cục bộ 1 session, không yêu cầu team-wide rollout"
  - "codebase-memory-mcp support Claude Code qua .claude/.mcp.json + PreToolUse hook"
  - "wfc validate không phụ thuộc grep behavior mà hook sẽ thay đổi -> cần đo để xác minh"
open_questions_initial:
  - "Cài qua curl install script hay npm/homebrew? curl|bash có thể bị SkillSpector flag (WI-1 liên quan)"
  - "Trial cục bộ có cần tách worktree không (change rủi ro chạm MCP config + hook)?"
  - "Nếu hook break wfc validate -> có fallback disable hook ngay không, path rollback cụ thể?"
  - ".codebase-memory/graph.db.zst snapshot có nên .gitignore hay commit (tradeoff team-share vs repo size)?"
dependencies_initial:
  - "codebase-memory-mcp binary (DeusData/codebase-memory-mcp, MIT)"
  - "Tree-sitter + nomic-embed-code bundle đi kèm (zero-dependency, không cần API key/Docker)"
  - "Proposal docs/plans/apply-trending-ai-research-2026-06.md (đã có)"
  - "Research docs/research/trending-ai-github-2026-06.md (đã có)"
risks_initial:
  - "Hook PreToolUse intercept Grep/Glob có thể break wfc validate (validator có thể dùng grep) -> RỦI RO CHÍNH"
  - "curl|bash install script có thể bị SkillSpector flag (supply chain) -> nên verify trước"
  - ".codebase-memory/graph.db.zst tăng repo size nếu commit"
  - "Hook intercept thay đổi behavior mà agent dependency -> drift kết quả validate"
  - "Trial cục bộ nếu lỡ commit config chung -> ảnh hưởng team"
notes_for_step_2: >-
  Business goal dự kiến: giảm token/ tăng tốc độ agent hiểu call graph Code-Factory qua graph MCP,
  giữ nguyên governance/validator. Non-goals: không thay workflow-chain, không self-host inference.
  Giá trị mong đợi cần đo được ở s04 (vd % token giảm cho 1 query cấu trúc, wfc validate pass trước/sau).
```

## Traceability
```yaml
source_inputs:
  - "docs/research/trending-ai-github-2026-06.md (research repo #1)"
  - "docs/plans/apply-trending-ai-research-2026-06.md (WI-2 proposal)"
next_step: "s02 Business Goal (xác định mục tiêu business + giá trị đo được + non-goals)"
```

## Handoff
- Điều đã rõ:
  - Yêu cầu: trial cục bộ codebase-memory-mcp cho Code-Factory, không rollout team-wide.
  - delivery_context=brownfield, planning_track=full, chạm MCP config + hook + wfc validate.
  - Gate dự kiến: Spec -> DoR -> Approach (chạm baseline MCP) -> Task Plan -> s07.
- Điều còn cần theo dõi:
  - Rủi ro hook break wfc validate (phải đo trước/sau ở s05/s07).
  - Có cần worktree ở s07 không (change rủi ro, chạm nhiều boundary).
  - curl|bash install có bị SkillSpector flag không (liên quan WI-1).
- Điều kiện sang step 2:
  - Human review và approve s01 (cập nhật role_signoffs.spec + gate_reviews.spec_reviewed_by/at).
  - scope_draft.in/out đã chốt ranh trial cục bộ vs rollout.
