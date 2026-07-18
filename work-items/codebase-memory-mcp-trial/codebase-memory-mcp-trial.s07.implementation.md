---
artifact_id: "codebase-memory-mcp-trial.s07.implementation"
artifact_family: workflow-step
work_item_slug: "codebase-memory-mcp-trial"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "codebase-memory-mcp-trial.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.

## Step Contract
```yaml
step_goal: "Triển khai trial codebase-memory-mcp theo OPT-B: T-1..T-5 tuần tự, review sớm T-3 (HARD gate AC-3), ghi evidence cho s08."
input_summary:
  - "s06: 5 task T-1..T-5 với owned_scope + verify path + checkpoint"
  - "s05: OPT-B (MCP only, không hook), Brownfield Impact Analysis"
  - "s04: AC-1..AC-8 (AC-3/8 HARD, AC-7 NOT_REQUIRED)"
output_summary:
  - "Thay đổi thực tế: .gitignore, .claude/.mcp.json, npm install, index, evidence đo"
  - "Delivery Rule Evidence: worktree/TDD/review/delegation verdict"
  - "Evidence cho s08: baseline wfc validate, smoke đo, rollback test"
done_when:
  - "T-1..T-5 hoàn tất, verify path pass (AC-1..AC-6, AC-8)"
  - "AC-3 HARD gate pass (wfc validate trước/sau khớp)"
  - "Review sớm T-3/T-4 done (spec compliance -> code quality)"
  - "Delivery Rule Evidence điền đầy đủ"
owner: "claude (implement) -> human (review s08 DoD)"
```

## Artifact Chính
```yaml
implemented_changes:
  - "T-1: .gitignore add .codebase-memory/ + /.mcp.json (DONE, 2026-07-17)"
  - "T-2: npm install --no-save codebase-memory-mcp@0.9.0 + index Code-Factory 4740 nodes/6252 edges (DONE; DB tại ~/.cache, ngoài repo)"
  - "T-3: <repo>/.mcp.json add server codebase-memory, git-ignored (DONE; deviation từ .claude/.mcp.json — xem Task Execution Log)"
  - "T-4: smoke query call graph getRuntimeContext + đo (DONE; AC-4 ✓, AC-6 ✓, AC-5 fail marginal ~10%)"
  - "T-5: rollback test PASS + entry khôi phục chờ s08 (DONE)"
doc_changes:
  - "s07 implementation note (file này) — ghi evidence từng task"
operational_notes:
  - "Trial cục bộ 1 session, không commit .mcp.json chung, không commit binary"
  - "MCP server chạy song song mcp/session-search"
```

## Delivery Rule Evidence
```yaml
behavior_change: NO
tdd_status: NOT_REQUIRED
tdd_test_refs: []
tdd_exception_reason: ""
tdd_alternative_verify_path:
  - "Scope là tooling/config trial (MCP server + .gitignore), không tạo/sửa behavior production -> không bắt buộc strict TDD (rule TDD Cho Behavior Change)"
  - "Verify path = chạy wfc validate trước/sau (AC-3) + smoke query (AC-4/5/6) + rollback test (AC-8)"
change_risk_profile: STANDARD
worktree_status: NOT_REQUIRED
worktree_refs: []
worktree_reason: >-
  OPT-B boundary nhỏ: chỉ chạm .gitignore + .claude/.mcp.json (trial cục bộ), không chạm hook
  PreToolUse, không chạm production code workflow-bundle/skill. Xong trong 1 session, ít file,
  conflict risk thấp, rollback 1 bước (xóa entry .mcp.json). T-4 cần MCP server registered với
  session live -> worktree cô lập không phù hợp (MCP config là session-level). Rule cho phép bỏ
  qua worktree cho change ít file, 1 session, conflict risk thấp. (OQ-2 chốt NOT_REQUIRED.)
review_status: DONE
review_refs:
  - "T-3 targeted review (2026-07-17): spec compliance PASS (AC-3 HARD wfc validate 60+56 khớp baseline; .mcp.json không commit chung — git-ignored; không dùng vendor install để tránh hook, đúng OPT-B) -> code quality PASS (.mcp.json JSON hợp lệ, absolute path binary, không side effect)"
  - "T-4 review (2026-07-17): evidence đo ghi đầy đủ, phương pháp đo đồng nhất 2 path (chars/4); AC-5 fail marginal ghi trung thực làm residual cho s08"
  - "T-5 review (2026-07-17): rollback path 1 bước xác nhận hoạt động, không leak git status"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Không merge: trial cục bộ, .mcp.json không commit chung. Giữ thay đổi local cho s08 verify."
verify_path:
  - "T-1: git check-ignore + wfc validate baseline (60 files + 56 notes)"
  - "T-2: index exit 0 + graph.db tạo + bị ignore (AC-1)"
  - "T-3: MCP tool available (AC-2) + wfc validate PASS sau (AC-3 HARD)"
  - "T-4: call graph khớp grep (AC-4) + token ≤ (AC-5) + tool call ≤ (AC-6)"
  - "T-5: rollback -> wfc validate PASS lại (AC-8 HARD)"
```

## Implementation Notes
```yaml
framework_notes:
  - "codebase-memory-mcp pure C/C++ zero-dependency, install qua npm (DeusData/codebase-memory-mcp, MIT)"
  - "Tree-sitter 158 ngôn ngữ; hybrid LSP 11 (JS/TS có -> Code-Factory JS đủ dùng, OQ-7 verify ở T-2/T-4)"
  - "MCP expose 14 tool query graph; agent gọi thủ công (OPT-B, không hook auto-intercept)"
known_limitations:
  - "Markdown/skill .md không có type-resolution -> chỉ index text, không call chain (giới hạn, không fail)"
  - "Trial cục bộ: teammate không thấy MCP config (không commit chung) -> phải install riêng nếu muốn dùng"
```

## Traceability
```yaml
upstream:
  - "codebase-memory-mcp-trial.s06.task-breakdown.md (T-1..T-5)"
  - "codebase-memory-mcp-trial.s05.technical-approach.md (OPT-B)"
  - "codebase-memory-mcp-trial.s04.acceptance-criteria.md (AC-1..AC-8)"
next_step: "s08 Verify + DoD (evidence + coverage + governance compliance + DoD verdict)"
```

## Handoff
- Outputs actual: T-1..T-5 DONE (2026-07-17). Thay đổi thực tế: `.gitignore` (+.codebase-memory/, +/.mcp.json), `.mcp.json` root (git-ignored, server codebase-memory), npm install --no-save (không đổi package.json/lock), index 4740 nodes/6252 edges tại ~/.cache.
- AC scoreboard cho s08: AC-1 ✓, AC-2 PENDING (cần human restart session -> check tool codebase-memory available), AC-3 HARD ✓, AC-4 ✓, AC-5 ✗ (marginal, 578 vs 527 est tokens, ~10% — single-hop query; residual: chưa đo query sâu), AC-6 ✓, AC-7 NOT_REQUIRED, AC-8 HARD ✓.
- Known limitations: Markdown không LSP; trial cục bộ không team-wide; v0.9.0 không tạo .codebase-memory/ artifact trong repo (DB ở ~/.cache); AC-5 chỉ đo 1 query shape.
- Notes for testing: raw đo lưu scratchpad session (mcp-trace-depth1.json, manual-grep-*.txt); re-run được bằng `node_modules/.bin/codebase-memory-mcp cli trace_path --function-name getRuntimeContext --project Users-haonguyen87-...-Code-Factory --depth 1`.
- Notes for deployment: không deploy; trial cục bộ; rollback 1 bước = xóa entry codebase-memory trong .mcp.json (đã test PASS, entry hiện đang giữ để chờ AC-2).
- Next human action: (1) restart session để verify AC-2, (2) review s07 evidence, (3) sang s08 Verify + DoD chốt verdict — bao gồm quyết định giữ hay dọn trial dựa trên AC-5 fail marginal.

## Task Execution Log
```yaml
T-1:
  status: DONE
  evidence:
    - ".gitignore add block '.codebase-memory/' (kèm comment work-item, OQ-4)"
    - "git check-ignore -v .codebase-memory/graph.db.zst -> match .gitignore:21 (exit 0)"
    - "Baseline wfc validate 2026-07-17: 'OK: validated workflow naming (60 files) and governance (56 notes)' — khớp baseline kỳ vọng 60+56"
T-2:
  status: DONE
  evidence:
    - "npm view xác nhận package chính chủ: codebase-memory-mcp@0.9.0, MIT, repo git+https://github.com/DeusData/codebase-memory-mcp.git"
    - "npm install --no-save codebase-memory-mcp -> exit 0, 0 vulnerabilities; --no-save nên package.json/package-lock.json KHÔNG đổi (grep codebase-memory-mcp package-lock.json = 0 match)"
    - "Binary darwin chạy được: bin/codebase-memory-mcp (273MB static), --version = 0.9.0"
    - "Index exit 0: nodes=4740, edges=6252, status=indexed; index_status = ready (AC-1 pass)"
    - "DEVIATION ghi nhận: v0.9.0 lưu graph DB tại ~/.cache/codebase-memory-mcp/<project>.db (ngoài repo), KHÔNG tạo .codebase-memory/ trong repo kể cả với persistence=true (artifact_present=false — quirk khi index đã up-to-date). .gitignore guard .codebase-memory/ vẫn giữ nguyên làm phòng hờ."
    - "git status: không binary/snapshot/lock leak (node_modules ignored, package-lock không đổi)"
    - "Checkpoint review: binary không commit ✓, graph DB nằm ngoài repo nên không thể commit ✓"
T-3:
  status: DONE
  evidence:
    - "DEVIATION ghi nhận: dùng <repo>/.mcp.json (project-scope chuẩn của Claude Code) thay vì .claude/.mcp.json như s06 ghi — .claude/.mcp.json chỉ là vị trí user-scope (~/.claude/.mcp.json); project-scope đọc từ root .mcp.json. Intent 'trial cục bộ, không commit' giữ nguyên."
    - "KHÔNG dùng lệnh vendor 'codebase-memory-mcp install' vì nó ghi config global (~/.claude/.mcp.json, ~/.claude.json) + cài PreToolUse/SessionStart hooks — vi phạm OPT-B (MCP only, không hook). Entry được viết tay."
    - ".mcp.json: server codebase-memory, command node_modules/.bin/codebase-memory-mcp (absolute path); JSON parse OK"
    - ".gitignore add '/.mcp.json' -> git check-ignore match .gitignore:23, git status không hiển thị file (không commit chung ✓)"
    - "AC-3 HARD PASS: wfc validate sau add = 'OK: 60 files + 56 notes' — khớp baseline T-1, không lệch"
    - "AC-2 partial: stdio handshake trực tiếp -> serverInfo codebase-memory-mcp 0.9.0, tools/list trả 8 tools (index_repository, search_graph, query_graph, trace_path, get_code_snippet, get_graph_schema, get_architecture, search_code). Full AC-2 (tool available trong session Claude Code) cần restart session — human action, verify ở s08."
    - "Compatibility: chạy song song mcp/session-search không xung đột (server stdio riêng process, không port cố định; UI HTTP mặc định tắt)"
T-4:
  status: DONE
  evidence:
    - "Smoke query: call graph getRuntimeContext (workflow-bundle-cli.js) — callees + callers, depth 1"
    - "MCP path: 1 tool call trace_path -> callees 8 hàm (assertBundleSources, collectSourceSkills, getBundlePaths, loadBundleManifest, normalizeSingleValue, resolveRepoRoot, resolveRuntimeHome, resolveRuntimeMode), callers 3 hàm (applyInstallOrUpdate, applySkillsAction, runCli); output 2313 chars ≈ 578 tokens"
    - "Manual path tương đương (cùng độ đầy đủ thông tin): 3 tool calls (grep call sites + read body 190-214 + grep function map để suy tên caller); output 2111 chars ≈ 527 tokens"
    - "AC-4 PASS: callees khớp 8/8, callers khớp 3/3 với ground truth grep/read"
    - "AC-5 FAIL (marginal): token MCP 578 > manual 527 (~10% cao hơn). Nguyên nhân: mỗi node trong output MCP kèm qualified_name ~120 chars (prefix project dài) × 11 nodes ≈ 1300 chars. Query single-hop nhỏ nên overhead này lấn át lợi ích; kỳ vọng đảo chiều với query sâu hơn (depth 2+, cross-file) vì manual path tăng tuyến tính theo số grep còn MCP giữ 1 call — chưa đo, ghi làm residual cho s08."
    - "AC-6 PASS: tool call MCP = 1 <= manual = 3"
    - "Ghi chú đo: chạy qua 'cli' mode (cùng engine với MCP server, cùng output) vì MCP tool trong session Claude Code chỉ load sau restart (gắn với AC-2 pending). Token đếm theo ước lượng chars/4, cùng phương pháp cho cả 2 path."
    - "Raw outputs lưu scratchpad session: mcp-trace-depth1.json, manual-grep-1.txt, manual-read-2.txt"
T-5:
  status: DONE
  evidence:
    - "Rollback test: xóa entry codebase-memory khỏi .mcp.json (mcpServers={}) -> JSON parse OK"
    - "AC-8 HARD PASS: wfc validate sau rollback = 'OK: 60 files + 56 notes' — khớp baseline T-1"
    - "git status sau rollback: không .mcp.json, không binary/snapshot trial nào xuất hiện (chỉ còn thay đổi pre-existing không thuộc trial)"
    - "Sau test: entry codebase-memory được KHÔI PHỤC lại trong .mcp.json (vẫn git-ignored) để human restart session verify AC-2; wfc validate sau khôi phục vẫn PASS 60+56"
    - "Checkpoint 'giữ MCP enable hay dọn dẹp trial': đề xuất giữ enable đến khi s08 chốt DoD; quyết định cuối thuộc human ở s08 (rule Không Tự Tuyên Bố Done)"
    - "Rollback path xác nhận hoạt động: 1 bước xóa entry, không side effect vào validator/workflow"
```
