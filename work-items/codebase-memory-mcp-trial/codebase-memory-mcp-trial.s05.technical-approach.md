---
artifact_id: "codebase-memory-mcp-trial.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "codebase-memory-mcp-trial"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
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
  approach:
    - "developer"
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
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-07-02"
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "codebase-memory-mcp-trial.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Tóm tắt option được khuyến nghị, trade-off và boundary kỹ thuật cần giữ.

## Step Contract
```yaml
step_goal: "Chốt technical approach nhỏ nhất đủ đúng cho trial codebase-memory-mcp: option analysis (2-3 phương án), Brownfield Impact Analysis, validation plan; human pass Approach gate để mở s06."
input_summary:
  - "s04: 8 acceptance criteria (AC-3/7/8 HARD: wfc validate pass trước/sau, hook non-blocking, rollback), Existing System Baseline, governance ALIGNED"
  - "s03: OQ-1 npm, OQ-4 .gitignore snapshot, OQ-5 foundation=not_applicable"
output_summary:
  - "Option analysis 3 phương án + recommended_option + trade_offs"
  - "Recommended approach + boundaries + risk_notes"
  - "Brownfield Impact Analysis (impacted_modules, compatibility_risks, migration, rollback)"
  - "Validation plan (đo trước/sau, smoke query, rollback verify)"
done_when:
  - "Có 2-3 option với mục tiêu/phương án khuyến nghị/lý do/điều kiểm chứng"
  - "Recommended approach là giải pháp nhỏ nhất đủ đúng (rule Ưu Tiên Giải Pháp Nhỏ Nhất Đủ Đúng)"
  - "Brownfield Impact Analysis đủ để biết boundary bị tác động và rollback"
  - "Validation plan map tới AC-3/AC-7/AC-8 (HARD gate)"
  - "Human pass Approach gate (role_signoffs.approach + gate_reviews.approach_reviewed_by/at)"
owner: "claude (draft) -> human (pass Approach)"
```

## Option Analysis
```yaml
options:
  - "OPT-A: MCP server + hook non-blocking intercept Grep/Glob đầy đủ (theo research)"
  - "OPT-B: MCP server only, KHÔNG hook intercept — agent gọi MCP tool thủ công"
  - "OPT-C: Index only, KHÔNG wire MCP vào agent — chỉ đo graph quality"
recommended_option: "OPT-B"
trade_offs:
  - "Chấp nhận: agent phải chủ động gọi MCP tool thay vì tự nhận context -> đổi lấy loại bỏ rủi ro chính break wfc validate"
  - "Chấp nhận: không full automation research -> đổi lấy boundary nhỏ nhất, rollback 1 bước, planning_track có thể quick"
  - "Loại OPT-A vì chạm hook + MCP cùng lúc là rủi ro không đáng tiêu cho trial cục bộ (AC-3 HARD gate)"
  - "Loại OPT-C vì không đạt business goal giảm token trong agent ops (agent không wire được graph)"
```

### Option Details

**OPT-A — MCP + hook intercept Grep/Glob đầy đủ (theo research)**
- Summary: install codebase-memory-mcp qua npm, add `.claude/.mcp.json`, add PreToolUse hook intercept Grep/Glob (exit 0, inject graph context).
- Pros: agent tự nhận graph context khi Grep/Glob → giảm token chủ động; đúng kiến trúc research.
- Cons: chạm hook + MCP config cùng lúc → rủi ro cao nhất (AC-3 wfc validate); phải đo hook không break validator.
- Check before implement: wfc validate PASS sau khi enable cả MCP + hook (AC-3); hook exit 0, không block Grep/Glob gốc (AC-7).

**OPT-B — MCP server only, KHÔNG hook intercept (recommended)**
- Summary: install codebase-memory-mcp qua npm, add `.claude/.mcp.json` cho 14 MCP tool, KHÔNG add PreToolUse hook. Agent gọi MCP tool thủ công khi cần.
- Pros: giải pháp nhỏ nhất đủ đúng — agent vẫn có graph query qua MCP tool → giảm token (AC-4/5/6); KHÔNG chạm hook → loại bỏ rủi ro chính break wfc validate (AC-3 an toàn hơn); rollback đơn giản chỉ xóa entry `.mcp.json` (AC-8); boundary nhỏ, planning_track có thể hạ quick.
- Cons: agent không tự nhận context khi Grep/Glob → phải chủ động gọi MCP tool; không tận dụng full automation research.
- Check before implement: MCP tool query trả call graph đúng vs grep (AC-4); token giảm so với grep manual (AC-5).

**OPT-C — Index only, KHÔNG wire MCP vào agent**
- Summary: install codebase-memory-mcp qua npm, chỉ chạy index local tạo graph.db, dùng CLI query trực tiếp (không wire vào agent MCP). Đo baseline token trước khi quyết định wire MCP.
- Pros: giải pháp nhỏ nhất tuyệt đối — không chạm MCP config, không chạm hook; không rủi ro break wfc validate hay agent behavior; cho baseline đo trước.
- Cons: agent không dùng được graph trong session (phải query CLI tay) → không đạt business goal giảm token trong agent ops; chỉ đo được graph quality, không đo được agent token saving.
- Check before implement: index Code-Factory thành công (AC-1); CLI query call graph đúng (AC-4 dạng manual).

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: "additive tooling (MCP server phụ trợ + graph index local)"
selected_stack: []
selected_runtime: []
decision_notes:
  - "Add codebase-memory-mcp là additive tooling, không thay runtime/stack/deployment Code-Factory (OQ-5 chốt foundation=not_applicable)"
  - "Không mở Foundation Decision vì không chạm architectural baseline"
```

## Artifact Chính
```yaml
recommended_approach: >-
  OPT-B: install codebase-memory-mcp qua npm, add MCP server vào .claude/.mcp.json (trial cục bộ,
  không commit config chung), KHÔNG add PreToolUse hook intercept Grep/Glob. Agent gọi MCP tool
  thủ công khi cần query call graph. .gitignore .codebase-memory/ (không commit snapshot/binary).
  Đo wfc validate trước/sau, smoke query 1 call graph, rollback bằng xóa entry .mcp.json.
why: >-
  Giải pháp nhỏ nhất đủ đúng (rule Ưu Tiên Giải Pháp Nhỏ Nhất Đủ Đúng): vẫn đạt business goal giảm
  token (AC-4/5/6 qua MCP tool) mà loại bỏ rủi ro chính break wfc validate (không chạm hook).
  OPT-A chạm hook + MCP cùng lúc là boundary lớn hơn không cần thiết cho trial cục bộ. OPT-C
  không wire agent nên không đạt business goal.
boundaries:
  - "Chạm: .claude/.mcp.json (add MCP server entry, trial cục bộ không commit chung)"
  - "Chạm: .gitignore (add .codebase-memory/)"
  - "KHÔNG chạm: hooks PreToolUse (giữ nguyên TDD/context hooks hiện có)"
  - "KHÔNG chạm: production code workflow-bundle / hooks / skill"
  - "KHÔNG chạm: architectural baseline (runtime/stack/deployment)"
risk_notes:
  - "Rủi ro chính (OPT-A) đã loại bỏ bằng cách không add hook intercept -> AC-3 an toàn hơn"
  - "Rủi ro còn: MCP server crash/disconnect -> agent fallback grep manual (edge case đã ghi s04)"
  - "Rủi ro còn: npm package supply-chain -> verify package chính thức (DeusData/codebase-memory-mcp, MIT); không dùng curl|bash"
  - "Rủi ro còn: .codebase-memory/ lỡ commit -> .gitignore + check ở s07/s08"
```

## Architecture Details
```yaml
domain_boundaries:
  - "codebase-memory-mcp chạy song song mcp/session-search, không xung đột (không dùng port mặc định, UI graph optional không bật)"
  - "Graph index nằm trong .codebase-memory/graph.db (local, .gitignore)"
  - "MCP tool expose 14 tool query graph, agent gọi thủ công (không auto-intercept)"
integration_points:
  - ".claude/.mcp.json (mode claude) — add server entry codebase-memory"
  - "Agent (Claude Code) — gọi MCP tool qua protocol MCP stdio"
  - "KHÔNG integrate vào wfc validate / hooks / CI (trial cục bộ)"
data_or_runtime_notes:
  - "Binary codebase-memory-mcp pure C/C++ zero-dependency, không cần Docker/API key"
  - "Tree-sitter vendored 158 ngôn ngữ; hybrid LSP 11 ngôn ngữ (JS/TS có -> Code-Factory JS đủ dùng, OQ-7)"
  - "Nomic embed code bundle đi kèm (768d int8) — không cần API key"
  - "Index Code-Factory (nhỏ) mili giây; reindex mỗi lần code đổi (không commit snapshot)"
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - ".claude/.mcp.json — add 1 entry server (trial cục bộ, không commit chung vào repo)"
  - ".gitignore — add .codebase-memory/ để không commit snapshot/binary"
  - "KHÔNG impacted: scripts/hooks/, packages/workflow-bundle/, skills/, mcp/session-search"
compatibility_risks:
  - "THẤP: MCP server thêm chạy song song session-search, không share port/state"
  - "THẤP: .mcp.json trial cục bộ không commit chung -> không ảnh hưởng team"
  - "LOẠI BỎ (vs OPT-A): rủi ro hook intercept Grep/Glob break wfc validate — không add hook"
  - "CẦN VERIFY ở s07: wfc validate PASS trước/sau (AC-3) dù không chạm hook (đảm bảo MCP add không leak vào validator)"
migration_notes:
  - "Không migration code: không sửa production behavior"
  - "Install binary npm local, không commit binary"
  - "Add .gitignore entry trước khi index (tránh lỡ commit .codebase-memory/)"
rollback_notes:
  - "Rollback 1 bước (AC-8): xóa entry codebase-memory trong .claude/.mcp.json -> restart agent -> wfc validate PASS lại trạng thái trước trial"
  - "Tùy chọn: xóa .codebase-memory/ local để dọn disk (không bắt buộc, đã .gitignore)"
  - "Không để lại dấu vết trong hooks/production code (vì không chạm)"
```

## Validation Plan
```yaml
verify_path:
  - "Trước enable: chạy wfc validate --workflow-root work-items --project-root . ghi baseline (current PASS 60 files + 56 notes)"
  - "Install: npm install codebase-memory-mcp (theo OQ-1); index Code-Factory -> graph.db tạo (AC-1)"
  - "Add .gitignore .codebase-memory/ trước index"
  - "Add .claude/.mcp.json entry (trial cục bộ) -> restart agent -> MCP tool available (AC-2)"
  - "Sau enable: chạy lại wfc validate -> so sánh baseline (AC-3 HARD: PASS, không lệch)"
  - "Smoke: query 1 call graph (workflow-bundle-cli.js -> utils) qua MCP tool vs grep manual (AC-4/5/6)"
  - "Rollback test: xóa entry .mcp.json -> wfc validate PASS lại (AC-8 HARD)"
gates_to_pass:
  - "Approach gate (s05) — human pass sau khi review option analysis + brownfield impact"
  - "AC-3/AC-7/AC-8 HARD gate verify ở s07/s08 (AC-7 hook non-blocking giờ N/A vì OPT-B không add hook -> ghi NOT_REQUIRED)"
note: >-
  OPT-B không add hook nên AC-7 (hook non-blocking) chuyển thành NOT_REQUIRED (không có hook để đo).
  Giữ AC-3 (wfc validate pass trước/sau) và AC-8 (rollback) làm HARD gate chính.
```

## Traceability
```yaml
upstream:
  - "codebase-memory-mcp-trial.s04.acceptance-criteria.md (AC-1..AC-8, Existing System Baseline)"
  - "codebase-memory-mcp-trial.s03.open-questions.md (OQ-1 npm, OQ-4 gitignore, OQ-5 foundation NA, OQ-2 worktree chờ s07)"
next_step: "s06 Task Plan (execution-oriented, owned_scope + verify path + checkpoint; gate Task Plan human pass)"
```

## Handoff
- Recommended option: OPT-B (MCP server only, không hook intercept) — giải pháp nhỏ nhất đủ đúng.
- Trade-off chấp nhận: agent chủ động gọi MCP tool thay vì tự nhận context -> loại bỏ rủi ro break wfc validate.
- Điều kiện sang step 6:
  - human pass Approach gate (review option analysis + Brownfield Impact Analysis + validation plan).
  - Cập nhật role_signoffs.approach + gate_reviews.approach_reviewed_by/at khi pass.
- Deployment note: trial cục bộ, không deploy; .mcp.json không commit chung; rollback xóa entry.
- OQ-2 (worktree): với OPT-B boundary nhỏ (chạm .mcp.json + .gitignore, không chạm hook/production), có thể không cần worktree -> worktree-discipline đánh giá lại ở s07 (rủi ro giảm vs OPT-A).
