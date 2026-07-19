---
artifact_id: "codebase-memory-team-rollout.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "codebase-memory-team-rollout"
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
  task_plan_reviewed_at: "2026-07-19"
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
  - "codebase-memory-team-rollout.s05.technical-approach.md"
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
step_goal: "Chuyển OPT-A thành task plan thi công được: 6 task có file chạm cụ thể, thứ tự, verify path per task, checkpoint review; human pass Task Plan để mở s07."
input_summary:
  - "s05 approved (Approach passed 2026-07-19): OPT-A + V-1 verify bắt buộc đầu s07"
  - "s04: AC-1..AC-7 (HARD: AC-3/AC-4/AC-7)"
output_summary:
  - "T-1..T-6 với owned_scope, verify path, dependency, checkpoint"
done_when:
  - "Không task nào là placeholder; mỗi task nêu rõ chạm đâu + kiểm thế nào"
  - "Human pass Task Plan (role_signoffs.task_plan + gate_reviews)"
owner: "claude (draft) -> human (pass Task Plan)"
```

## Artifact Chính
```yaml
tasks:
  - id: T-1
    name: "V-1: chuyển command sang portable path và verify expansion"
    owned_scope: ".mcp.json (root, hiện vẫn git-ignored)"
    steps:
      - "Sửa command thành \"${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/codebase-memory-mcp\""
      - "Chạy `claude mcp list` từ repo root"
    verify: "Output có codebase-memory ✓ Connected -> V-1 PASS. Nếu ✘: thử biến thể (npx), ghi DEVIATION; nếu phải đổi option -> DỪNG, quay lại human re-approve s05"
    maps_to: "AC-1 (một phần), V-1"
  - id: T-2
    name: "AC-3 HARD: mô phỏng máy thiếu binary"
    owned_scope: ".mcp.json (tạm thời)"
    steps:
      - "Tạm đổi command trỏ \"${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/khong-ton-tai\""
      - "Chạy `claude mcp list` -> kỳ vọng ✘ Failed to connect, không side effect nào khác"
      - "Khôi phục command đúng của T-1, `claude mcp list` lại -> ✓"
    verify: "2 trạng thái đúng kỳ vọng + session hiện tại không bị ảnh hưởng -> AC-3 evidence (test đầy đủ hơn ở T-6 sau restart)"
    maps_to: "AC-3 HARD"
  - id: T-3
    name: "Viết docs onboarding + limitation guidance"
    owned_scope: "docs/codebase-memory.md (mới) + .claude/CLAUDE.md (1 dòng pointer mục MCP Servers)"
    steps:
      - "Docs gồm 4 phần: (1) 3 lệnh setup: npm install --no-save codebase-memory-mcp@0.9.0 / lệnh index repo / restart + approve prompt; (2) bước approval + opt-out disabledMcpjsonServers; (3) limitation: depth>1 import boundary + workaround re-trace per-function, Markdown không LSP, detect_changes/re-index khi code đổi; (4) rollback"
      - "Thêm pointer vào .claude/CLAUDE.md: mục MCP Servers, 1 dòng trỏ docs/codebase-memory.md"
    verify: "UTF-8 valid; lệnh index trong docs được dry-run chạy thật trên máy này; đối chiếu limitation với docs/research/codebase-memory-depth2-measurement.md"
    maps_to: "AC-5, AC-6"
  - id: T-4
    name: "AC-4 HARD: gỡ guard .gitignore + track config + review batch"
    owned_scope: ".gitignore (bỏ dòng /.mcp.json, GIỮ .codebase-memory/)"
    steps:
      - "wfc validate baseline TRƯỚC (kỳ vọng 68+64)"
      - "Bỏ dòng /.mcp.json + comment liên quan khỏi .gitignore; git add .mcp.json"
      - "grep .mcp.json: không /Users/, không $HOME literal (AC-1)"
      - "wfc validate SAU -> khớp baseline"
      - "REVIEW BATCH (trước commit): spec compliance (đúng OPT-A, đủ AC-1/4/5/6, không lệch scope) -> code quality (JSON hợp lệ, docs rõ ràng, gitignore không thừa thiếu)"
    verify: "validate 2 lần khớp + grep sạch + review 2 tầng PASS"
    maps_to: "AC-1, AC-4 HARD"
  - id: T-5
    name: "Commit + rollback rehearsal AC-7 HARD"
    owned_scope: "git history (1 commit: .mcp.json + .gitignore + docs + CLAUDE.md pointer)"
    steps:
      - "Commit 1 commit duy nhất (rollback = revert 1 bước)"
      - "Rehearsal: git revert --no-commit HEAD -> kiểm .gitignore có lại guard + .mcp.json rời index -> wfc validate PASS -> git reset --hard HEAD (hủy rehearsal)"
    verify: "Revert áp sạch không conflict + validate PASS trong trạng thái revert -> AC-7 evidence"
    maps_to: "AC-7 HARD"
  - id: T-6
    name: "AC-2 re-verify sau restart (human action)"
    owned_scope: "session mới"
    steps:
      - "Human restart session (có thể gặp approval prompt lại nếu config đổi)"
      - "Claude gọi list_projects + 1 query trace_path depth 1 -> so với evidence trial"
    verify: "Tool available + kết quả đúng -> AC-2 PASS; evidence ghi vào s08"
    maps_to: "AC-2"
dependencies:
  - "T-1 -> T-2 (cần path đúng trước khi mô phỏng sai)"
  - "T-1 -> T-4 (không gỡ guard trước khi V-1 PASS — rule an toàn từ s05)"
  - "T-3 độc lập sau T-1, có thể song song T-2"
  - "T-4 -> T-5 -> T-6 (tuần tự; T-6 chờ human restart)"
handoff_points:
  - "Sau T-1 nếu V-1 FAIL và phải đổi option: dừng, human re-approve s05"
  - "Sau T-5: bàn giao chờ human restart cho T-6, rồi sang s08"
```

## Verification Plan
- Check bắt buộc: `claude mcp list` sau mỗi lần đổi .mcp.json (T-1/T-2); wfc validate trước/sau T-4 và trong rehearsal T-5; UTF-8 cho docs + note; grep AC-1.
- Risk note: AC-5 chỉ dry-run được trên máy này (đã có binary) — không test được máy fresh 100%; ghi làm residual cho s08, mitigation là docs viết theo lệnh copy-paste nguyên văn.
- Rollout note nếu có: hiệu lực với teammate khi pull + restart; không deploy.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "TDD: NOT_REQUIRED (config+docs, không behavior production) — verify path = per-task verify ở trên"
  - "Worktree: NOT_REQUIRED — 4 file chạm, 1 session, conflict risk thấp, rollback 1 revert; lý do sẽ ghi lại trong s07 Delivery Rule Evidence"
  - "Review sớm: bắt buộc ở T-4 (trước commit), 2 tầng spec compliance -> code quality"
  - "Subagent: không dùng — task tuần tự phụ thuộc nhau, không đạt điều kiện task độc lập"
blocking_items: []
owner: "human (pass Task Plan)"
next_action: "human review T-1..T-6 -> pass Task Plan -> mở s07 Implement"
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "wfc validate 68+64 tại: trước T-4, sau T-4, trong rehearsal T-5"
  - "claude mcp list ✓ tại: sau T-1, sau khôi phục T-2, sau T-5"
compatibility_checkpoints:
  - "Máy đang trial (máy anh): T-6 xác nhận tool vẫn hoạt động với config mới"
  - "Máy thiếu binary: T-2 mô phỏng ✘ Failed non-fatal"
migration_or_backfill_steps:
  - "Không có — index per-machine tự tạo khi teammate chạy lệnh index lần đầu theo docs"
rollback_or_restore_steps:
  - "git revert <commit T-5> -> khôi phục guard gitignore + bỏ track .mcp.json (đã rehearse ở T-5)"
  - "Cá nhân: disabledMcpjsonServers trong .claude/settings.local.json"
```

## Traceability
```yaml
upstream:
  - "codebase-memory-team-rollout.s05.technical-approach.md (approved, OPT-A)"
  - "codebase-memory-team-rollout.s04.acceptance-criteria.md (AC-1..AC-7)"
next_step: "s07 Implement (T-1..T-5 trong session này; T-6 sau human restart)"
```

## Handoff
- Task thực hiện trước: T-1 (V-1 gate an toàn — không gỡ guard nếu expansion fail).
- Phụ thuộc chặn: T-6 cần human restart session; V-1 fail + đổi option cần human re-approve s05.
- Điều kiện sang step 7: human pass Task Plan (role_signoffs.task_plan + gate_reviews).
