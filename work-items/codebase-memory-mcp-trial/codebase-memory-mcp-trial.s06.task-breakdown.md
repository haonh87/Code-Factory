---
artifact_id: "codebase-memory-mcp-trial.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "codebase-memory-mcp-trial"
step_id: "s06"
step_slug: "task-breakdown"
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
  approach: []
  foundation: []
  task_plan:
    - "developer"
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
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-07-02"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "codebase-memory-mcp-trial.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.

## Step Contract
```yaml
step_goal: "Chốt task plan execution-oriented cho trial codebase-memory-mcp (OPT-B): task có owned_scope, thứ tự, verify path, checkpoint review; human pass Task Plan gate để mở s07."
input_summary:
  - "s05: recommended OPT-B (MCP server only, không hook), Brownfield Impact Analysis, Validation Plan"
  - "s04: AC-1..AC-8 (AC-3/8 HARD, AC-7 NOT_REQUIRED vì không hook), Existing System Baseline"
  - "s03: OQ-1 npm, OQ-4 .gitignore snapshot, OQ-2 worktree đánh giá ở s07"
output_summary:
  - "tasks có owned_scope + verify path + thứ tự + checkpoint review"
  - "Verification Plan + Governance Checks + Brownfield Delivery Plan"
done_when:
  - "Mỗi task có owned_scope (file/path chính) và verify path cụ thể (không placeholder)"
  - "Thứ tự task rõ, dependency rõ"
  - "Brownfield Delivery Plan có regression/compatibility/rollback checkpoint"
  - "human pass Task Plan gate (role_signoffs.task_plan + gate_reviews.task_plan_reviewed_by/at)"
owner: "claude (draft) -> human (pass Task Plan)"
```

## Artifact Chính
```yaml
tasks:
  - id: T-1
    name: "Chuẩn bị .gitignore + baseline wfc validate"
    owned_scope:
      - ".gitignore — add .codebase-memory/ (và sub-path nếu cần) để không commit snapshot/binary"
    order: 1
    depends_on: []
    verify_path:
      - "git check-ignore .codebase-memory/graph.db.zst trả match (sau khi add)"
      - "wfc validate --workflow-root work-items --project-root . PASS (baseline trước trial, ghi lại 60 files + 56 notes)"
    checkpoint_review: "self-review .gitignore entry trước khi sang T-2"
  - id: T-2
    name: "Install codebase-memory-mcp qua npm + index Code-Factory"
    owned_scope:
      - "npm install codebase-memory-mcp (local, không commit binary, không commit package-lock của trial vào repo chung nếu lệch)"
      - "chạy index Code-Factory -> tạo .codebase-memory/graph.db"
    order: 2
    depends_on: ["T-1"]
    verify_path:
      - "binary chạy được trên darwin (npm install exit 0)"
      - "index exit 0, .codebase-memory/graph.db tồn tại (AC-1)"
      - ".codebase-memory/ bị git ignore (không xuất hiện git status)"
    checkpoint_review: "targeted review: confirm binary không commit, graph.db bị ignore"
  - id: T-3
    name: "Add MCP server vào .claude/.mcp.json (trial cục bộ)"
    owned_scope:
      - ".claude/.mcp.json — add server entry codebase-memory (trial cục bộ, KHÔNG commit file này vào repo chung)"
    order: 3
    depends_on: ["T-2"]
    verify_path:
      - "file .mcp.json hợp lệ (JSON parse OK)"
      - "restart agent -> MCP tool của codebase-memory available (AC-2)"
      - "wfc validate --workflow-root work-items --project-root . PASS sau add (AC-3 HARD: so sánh baseline T-1, không lệch)"
    checkpoint_review: "spec compliance review: .mcp.json không commit chung (trial cục bộ); wfc validate pass"
  - id: T-4
    name: "Smoke query call graph + đo token/tool-call"
    owned_scope:
      - "query 1 call graph cấu trúc qua MCP tool (vd workflow-bundle-cli.js -> utils liên quan)"
      - "query tương đương bằng grep manual, đếm token + tool call"
    order: 4
    depends_on: ["T-3"]
    verify_path:
      - "call graph MCP khớp tập function/utils mà grep manual tìm thấy (AC-4)"
      - "token MCP <= token grep manual (AC-5)"
      - "tool call MCP <= tool call grep manual (AC-6)"
    checkpoint_review: "review kết quả đo, ghi evidence vào s07 implementation note"
  - id: T-5
    name: "Rollback test + dọn dẹp trial"
    owned_scope:
      - "xóa entry codebase-memory trong .claude/.mcp.json (giữ .gitignore)"
      - "re-run wfc validate"
    order: 5
    depends_on: ["T-4"]
    verify_path:
      - "sau rollback, wfc validate PASS lại trạng thái trước trial (AC-8 HARD)"
      - "agent không thấy codebase-memory MCP tool sau restart"
      - "git status sạch (không binary/snapshot commit)"
    checkpoint_review: "review rollback path hoạt động; quyết định giữ MCP enable hay dọn dẹp trial"
dependencies:
  - "T-1 -> T-2 -> T-3 -> T-4 -> T-5 (tuần tự, không song song vì trial nhỏ 1 session)"
  - "codebase-memory-mcp npm package (DeusData/codebase-memory-mcp, MIT) — verify package chính thức trước install"
  - "wfc CLI (`packages/workflow-bundle/bin/wfc.js`) cho validate trước/sau"
handoff_points:
  - "Sau T-1: baseline wfc validate ghi rõ (60 files + 56 notes) để so sánh AC-3."
  - "Sau T-3: AC-3 HARD gate check — nếu wfc validate fail -> rollback ngay (không sang T-4)."
  - "Sau T-5: evidence đầy đủ cho s08 Verify + DoD."
```

## Verification Plan
- Check bắt buộc:
  - "AC-1: index exit 0, graph.db tạo (T-2)"
  - "AC-2: MCP tool available sau restart (T-3)"
  - "AC-3 HARD: wfc validate PASS trước (T-1) và sau (T-3) — không lệch"
  - "AC-4: call graph MCP khớp grep manual (T-4)"
  - "AC-5: token MCP <= grep manual (T-4)"
  - "AC-6: tool call MCP <= grep manual (T-4)"
  - "AC-7: NOT_REQUIRED (OPT-B không add hook)"
  - "AC-8 HARD: rollback -> wfc validate PASS lại (T-5)"
- Risk note:
  - "Rủi ro chính đã loại bỏ (không hook) -> AC-3 an toàn hơn, nhưng vẫn verify MCP add không leak vào validator"
  - "npm supply-chain: verify package chính thức DeusData/codebase-memory-mcp (MIT), không dùng curl|bash"
  - "Nếu AC-3 fail bất ngờ -> rollback T-5, ghi exception, không cố fix validator"
- Rollout note nếu có:
  - "Trial cục bộ 1 session, không deploy, không commit config chung. Nếu sau trial muốn rollout team-wide -> mở work item riêng (s04-s07 đầy đủ)."

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md (governance_profile=default)"
checks:
  - "Task Plan gate: task plan execution-oriented, không placeholder (rule Planning Execution-Oriented) -> required"
  - "Brownfield Delivery Plan: regression/compatibility/rollback checkpoint đủ (rule Brownfield Baseline)"
  - "TDD: scope là tooling/config (không behavior change production) -> không bắt buộc strict TDD; verify path = chạy validate/đo (rule TDD Cho Behavior Change)"
  - "Worktree: change nhỏ (chạm .mcp.json + .gitignore, không chạm hook/production) -> OQ-2 đánh giá lại ở s07, khả năng NOT_REQUIRED (rule Worktree Cho Change Lớn Hoặc Rủi Ro)"
  - "Subagent: trial nhỏ 1 session, task tuần tự tightly coupled -> KHÔNG dùng subagent (rule Subagent Chỉ Cho Task Độc Lập)"
  - "Security: npm install (không curl|bash), codebase-memory zero-dependency"
  - "Encoding: file .md tiếng Việt UTF-8 (Cổng Chất Lượng)"
blocking_items: []
owner: "human (pass Task Plan)"
next_action: "human review task plan + verification plan + brownfield delivery plan -> pass Task Plan -> mở s07"
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "T-1: baseline wfc validate (60 files + 56 notes) — regression target"
  - "T-3: wfc validate sau add MCP phải khớp baseline (AC-3 HARD) — regression check chính"
  - "T-5: wfc validate sau rollback phải khớp baseline (AC-8 HARD)"
compatibility_checkpoints:
  - "MCP server codebase-memory chạy song song mcp/session-search — verify không xung đột port/state (T-3)"
  - ".mcp.json trial cục bộ không commit chung — verify git status không stage file này (T-3)"
migration_or_backfill_steps:
  - "Không migration code: không sửa production behavior (OPT-B)"
  - "Add .gitignore .codebase-memory/ trước index (T-1) để tránh lỡ commit snapshot"
rollback_or_restore_steps:
  - "T-5 rollback: xóa entry codebase-memory trong .claude/.mcp.json -> restart agent -> wfc validate PASS lại"
  - "Tùy chọn dọn disk: xóa .codebase-memory/ local (không bắt buộc, đã .gitignore)"
  - "Không để lại dấu vết hooks/production code (vì OPT-B không chạm)"
```

## Traceability
```yaml
upstream:
  - "codebase-memory-mcp-trial.s05.technical-approach.md (OPT-B, Validation Plan)"
  - "codebase-memory-mcp-trial.s04.acceptance-criteria.md (AC-1..AC-8)"
next_step: "s07 Implement (T-1..T-5 tuần tự; worktree-discipline đánh giá OQ-2; review sớm T-3/T-4)"
```

## Handoff
- Task thực hiện trước: T-1 (.gitignore + baseline) -> T-2 (install + index) -> T-3 (add MCP) -> T-4 (smoke đo) -> T-5 (rollback test).
- Phụ thuộc chặn: T-1 chặn T-2..T-5 (baseline + gitignore phải xong trước); T-3 AC-3 HARD chặn T-4 (fail thì rollback).
- Điều kiện sang step 7:
  - human pass Task Plan gate (review tasks + verification plan + brownfield delivery plan).
  - Cập nhật role_signoffs.task_plan + gate_reviews.task_plan_reviewed_by/at.
  - OQ-2 worktree sẽ chốt ở s07 (dự kiến NOT_REQUIRED vì OPT-B boundary nhỏ).
