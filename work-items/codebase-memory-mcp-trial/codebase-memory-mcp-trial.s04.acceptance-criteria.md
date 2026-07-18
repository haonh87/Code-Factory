---
artifact_id: "codebase-memory-mcp-trial.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "codebase-memory-mcp-trial"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
spec_status: approved
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
  spec_reviewed_at: "2026-07-02"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "po"
  dor_reviewed_at: "2026-07-02"
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
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "codebase-memory-mcp-trial.s01.restate.md"
  - "codebase-memory-mcp-trial.s02.business-goal.md"
  - "codebase-memory-mcp-trial.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Tóm tắt acceptance criteria, edge case, DoR và governance checks cho readiness.

## Step Contract
```yaml
step_goal: "Chốt acceptance criteria đo được, edge case, DoR verdict và governance checks cho trial codebase-memory-mcp; human pass Spec + DoR để mở s05."
input_summary:
  - "s01 restate: scope_draft (in/out), constraints, risks_initial"
  - "s02 business-goal: success_metrics (wfc validate pass trước/sau, token giảm, hook exit 0, rollback path), non_goals"
  - "s03 open-questions: OQ-1 npm, OQ-4 .gitignore snapshot, OQ-5 foundation=not_applicable; readiness READY"
output_summary:
  - "acceptance_criteria đo được + behavioral_invariants + edge_cases + out_of_scope"
  - "Existing System Baseline (brownfield) + governance checks + DoR verdict"
  - "approval_gates chốt: spec=required, contract=not_applicable, foundation=not_applicable, uat=not_applicable, release=not_applicable"
done_when:
  - "acceptance_criteria có chỉ số đo được, không cảm tính"
  - "Existing System Baseline có current_behavior_refs (wfc validate, hook setup hiện tại)"
  - "Governance checks pass (no blocking_items)"
  - "DoR verdict READY (human pass Spec + DoR, ghi role_signoffs.spec/dor + gate_reviews)"
owner: "claude (draft) -> human (pass Spec + DoR)"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "codebase-memory-mcp-trial.s01.restate.md (scope_draft)"
  - "codebase-memory-mcp-trial.s02.business-goal.md (business_goal + success_metrics)"
decision_notes:
  - "Spec = restate + business-goal + open-questions resolved. Không có BRD/SRS (sdd_mode=none)."
  - "Spec pass khi human review s01-s04 và chốt acceptance_criteria."
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
ux_contract_refs: []
notes:
  - "Trial không tạo/sửa API contract hay UX contract. codebase-memory-mcp expose 14 MCP tool nhưng là tooling phụ trợ, không phải API production của Code-Factory."
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "wfc validate --workflow-root work-items --project-root . (validator governance, hiện PASS 60 files + 56 notes)"
  - ".claude/settings.json hooks (SessionStart, PreToolUse Edit|Write, PostToolUse Edit|Write, PreCompact, Stop) — hiện chỉ TDD/context hooks, chưa có PreToolUse intercept Grep/Glob"
  - "scripts/hooks/*.sh (load-workflow-context.sh, persist-context.sh, tdd-track.sh, tdd-track-write.sh, tdd-enforce) — không intercept Grep/Glob"
  - "mcp/session-search (MCP server hiện có) — codebase-memory-mcp sẽ add song song, không thay"
  - "scripts/*.js shim delegate sang packages/workflow-bundle/scripts/"
impacted_surfaces:
  - ".claude/.mcp.json (hoặc tương đương mode claude) — add MCP server codebase-memory (trial cục bộ, không commit config chung)"
  - "PreToolUse hook intercept Grep/Glob — add mới (non-blocking, exit 0)"
  - "wfc validate behavior — RỦI RO: hook intercept có thể thay đổi kết quả grep của validator"
  - ".gitignore — add .codebase-memory/ để không commit snapshot/binary"
compatibility_constraints:
  - "wfc validate phải PASS cả trước và sau khi enable MCP/hook (gate cứng)"
  - "Hook non-blocking (exit 0) — không block tool call gốc, không thay exit code"
  - "Không sửa production behavior code của workflow-bundle / hooks / skill"
  - "codebase-memory-mcp chạy song song mcp/session-search, không xung đột port (UI graph optional ở localhost:9749, không bật mặc định)"
rollback_constraints:
  - "Rollback 1 bước: xóa entry codebase-memory trong .mcp.json + xóa hook PreToolUse intercept Grep/Glob -> re-run wfc validate phải PASS lại trạng thái trước trial"
  - "Disable hook tạm: dùng CF_DISABLED_HOOKS hoặc xóa entry hook (cần xác định hook ID cụ thể ở s05)"
  - "Không để lại binary/snapshot trong repo sau rollback (đã .gitignore)"
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: AC-1
    criterion: "codebase-memory-mcp binary cài qua npm chạy được trên môi trường darwin/macOS hiện tại (index Code-Factory thành công, không crash)"
    measure: "Lệnh index hoàn thành exit 0; graph.db được tạo trong .codebase-memory/ (đã .gitignore)"
  - id: AC-2
    criterion: "MCP server codebase-memory connect thành công với mode claude (agent thấy MCP tool available)"
    measure: "agent query 1 MCP tool của codebase-memory trả kết quả không lỗi connect"
  - id: AC-3
    criterion: "wfc validate --workflow-root work-items --project-root . PASS cả trước và sau khi enable MCP/hook"
    measure: "Output 'OK: validated ...' cả 2 lần; số files/notes không lệch bất ngờ"
    gate: HARD
  - id: AC-4
    criterion: "Smoke query 1 call graph cấu trúc (vd workflow-bundle-cli.js -> utils liên quan) cho kết quả đúng so với grep manual"
    measure: "Call graph từ codebase-memory khớp tập function/utils mà grep manual tìm thấy (không thiếu/ thừa node chính)"
  - id: AC-5
    criterion: "Token cho smoke query giảm so với grep/read file-by-file cùng query"
    measure: "So sánh token 2 cách cùng query; codebase-memory thấp hơn (mục tiêu giảm, không tăng)"
  - id: AC-6
    criterion: "Tool call count cho smoke query không tăng so với grep/read manual"
    measure: "Đếm tool call 2 cách; codebase-memory <= grep manual"
  - id: AC-7
    criterion: "Hook PreToolUse non-blocking: intercept Grep/Glob exit 0, không block tool call gốc"
    measure: "Tool call Grep/Glob vẫn chạy và trả kết quả gốc; hook chỉ inject thêm context, không thay exit code"
    gate: HARD
  - id: AC-8
    criterion: "Rollback path hoạt động: disable MCP/hook -> wfc validate PASS lại trạng thái trước trial"
    measure: "Sau rollback, wfc validate PASS + agent không thấy codebase-memory MCP tool"
    gate: HARD
edge_cases:
  - "JS/TS có hybrid LSP type-resolution -> call graph đúng; Markdown/skill .md không có type-resolution -> chỉ index text, không call chain (giới hạn, không fail)"
  - "Repo có binary codebase-memory local nhưng không commit (.gitignore) -> teammate không thấy, phải install riêng (đúng scope trial)"
  - "wfc validate fail sau enable hook -> rollback ngay (AC-8), không cố fix validator"
  - "codebase-memory MCP server crash/disconnect -> agent fallback về grep manual, không block workflow"
out_of_scope:
  - "Rollout config team-wide / commit .mcp.json chung (sau trial, work item riêng)"
  - "Commit snapshot graph.db.zst (đã .gitignore)"
  - "Tích hợp codebase-memory vào CI/CD (sau trial)"
  - "Đo benchmark chính thức đa-query (chỉ smoke 1 query)"
done_when:
  - "Tất cả AC-1..AC-8 measure PASS (đặc biệt AC-3/AC-7/AC-8 HARD gate)"
  - "DoD pass ở s08 (không tuyên bố done ở s07)"
behavioral_invariants:
  - "wfc validate behavior không đổi (PASS trước = PASS sau)"
  - "Tool call Grep/Glob gốc vẫn chạy, chỉ thêm context không block"
  - "Không file production code của Code-Factory bị sửa behavior"
  - "Repo không có binary/snapshot commit (gitignore)"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md (governance_profile=default)"
checks:
  - "Spec gate: s01-s04 artifact đủ + acceptance_criteria đo được -> required"
  - "Contract gate: không chạm API/UX contract -> not_applicable"
  - "Foundation gate: add MCP là additive tooling, không chạm architectural baseline (runtime/stack/deployment) -> not_applicable (OQ-5 chốt)"
  - "UAT gate: trial cục bộ không deploy -> not_applicable (OQ-6 default)"
  - "Release gate: trial cục bộ không promote môi trường -> not_applicable (OQ-6 default)"
  - "Brownfield: Existing System Baseline đã có (current_behavior_refs + impacted_surfaces + compatibility + rollback)"
  - "TDD: scope trial là tooling/config (không behavior change production) -> không bắt buộc strict TDD; verify path = chạy scan/đo (rule TDD Cho Behavior Change)"
  - "Worktree: change rủi ro chạm MCP+hook -> worktree-discipline sẽ đánh giá ở s07 (OQ-2)"
  - "Security: npm install (không curl|bash) -> tránh supply-chain risk; codebase-memory-mcp zero-dependency + không cần API key/Docker"
  - "Encoding: file .md tiếng Việt phải UTF-8 (Cổng Chất Lượng)"
blocking_items: []
owner: "human (pass Spec + DoR)"
next_action: "human review acceptance_criteria + governance checks -> pass DoR -> mở s05"
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners:
  - "human: pass Spec gate (review s01-s04 + acceptance_criteria)"
  - "human: pass DoR gate (review governance checks + Existing System Baseline)"
  - "claude: propose s05 approach sau khi DoR pass"
notes:
  - "Tất cả open question chặn s04 đã resolve (OQ-1/OQ-4/OQ-5)."
  - "approval_gates chốt: spec=required, contract=not_applicable, foundation=not_applicable, uat=not_applicable, release=not_applicable."
  - "DoR READY nhưng CHƯA PASS — cần human explicit approval (role_signoffs.spec/dor + gate_reviews) trước khi mở s05."
  - "AC-3/AC-7/AC-8 là HARD gate: wfc validate pass trước/sau, hook non-blocking, rollback path."
```

## Traceability
```yaml
upstream:
  - "codebase-memory-mcp-trial.s01.restate.md"
  - "codebase-memory-mcp-trial.s02.business-goal.md"
  - "codebase-memory-mcp-trial.s03.open-questions.md (OQ-1/OQ-4/OQ-5 resolved)"
next_step: "s05 Technical Approach (option analysis + Brownfield Impact Analysis + validation plan; gate Approach human pass)"
```

## Handoff
- Criteria bắt buộc: AC-1..AC-8, đặc biệt HARD gate AC-3 (wfc validate pass trước/sau), AC-7 (hook non-blocking exit 0), AC-8 (rollback path hoạt động).
- Edge case phải giữ: JS/TS có LSP, Markdown không; wfc fail -> rollback; MCP crash -> fallback grep.
- Điều kiện sang step 5:
  - human pass Spec gate (review s01-s04 + chốt acceptance_criteria).
  - human pass DoR gate (review governance checks + Existing System Baseline).
  - Cập nhật role_signoffs.spec/dor + gate_reviews.spec_reviewed_by/at + dor_reviewed_by/at.
