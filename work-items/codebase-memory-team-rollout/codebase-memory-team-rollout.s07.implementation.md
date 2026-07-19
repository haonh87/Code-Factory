---
artifact_id: "codebase-memory-team-rollout.s07.implementation"
artifact_family: workflow-step
work_item_slug: "codebase-memory-team-rollout"
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
  - "codebase-memory-team-rollout.s06.task-breakdown.md"
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
step_goal: "Thi công T-1..T-5 theo task plan approved; T-6 (AC-2) chờ human restart; ghi evidence cho s08."
input_summary:
  - "s06 approved (Task Plan passed 2026-07-19): T-1..T-6"
output_summary:
  - "Commit 51ff5e7: .mcp.json + .gitignore + docs/codebase-memory.md + CLAUDE.md pointer"
  - "Evidence per-task + Delivery Rule Evidence"
done_when:
  - "T-1..T-5 verify path pass; T-6 bàn giao human restart"
owner: "claude (implement) -> human (restart cho T-6, review s08 DoD)"
```

## Artifact Chính
```yaml
implemented_changes:
  - "T-1: .mcp.json command -> ${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/codebase-memory-mcp (DONE, V-1 PASS)"
  - "T-2: mô phỏng thiếu binary -> ✘ Failed non-fatal -> khôi phục ✓ (DONE, AC-3 evidence)"
  - "T-3: docs/codebase-memory.md mới + 1 dòng pointer .claude/CLAUDE.md (DONE)"
  - "T-4: gỡ guard /.mcp.json khỏi .gitignore, track .mcp.json + docs (DONE, AC-1/AC-4 PASS)"
  - "T-5: commit 51ff5e7 + rollback rehearsal trong worktree tạm (DONE, AC-7 PASS)"
doc_changes:
  - "docs/codebase-memory.md (mới): setup 3 lệnh, approval, opt-out, limitation, rollback"
  - ".claude/CLAUDE.md: +1 dòng mục MCP Servers"
operational_notes:
  - "Hiệu lực với teammate khi pull + restart; per-user approval prompt lần đầu"
```

## Delivery Rule Evidence
```yaml
behavior_change: NO
tdd_status: NOT_REQUIRED
tdd_test_refs: []
tdd_exception_reason: ""
tdd_alternative_verify_path:
  - "Config + docs, không behavior production; verify = per-task verify path (claude mcp list, wfc validate, grep, dry-run lệnh docs, revert rehearsal)"
change_risk_profile: STANDARD
worktree_status: NOT_REQUIRED
worktree_refs: []
worktree_reason: >-
  4 file chạm, 1 session, conflict risk thấp, rollback 1 revert (chốt ở s06). Riêng rollback
  rehearsal T-5 DÙNG worktree tạm (scratchpad) để không đụng thay đổi unstaged ngoài scope
  trong cây làm việc chính; đã remove sạch sau rehearsal.
review_status: DONE
review_refs:
  - "T-4 review 2 tầng (2026-07-19): spec compliance lượt 1 FAIL — staged .gitignore lẫn 3 dòng .claude/*-state.json ngoài scope (thuộc việc session-persistence hooks); FIX: reset + re-stage chỉ hunk rollout qua git apply --cached. Lượt 2 PASS: diff đúng 4 surface OPT-A -> code quality PASS (JSON hợp lệ, lệnh docs đã dry-run, comment gitignore nhất quán)"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Commit thẳng main (convention repo), 1 commit revertable 51ff5e7"
verify_path:
  - "T-1: claude mcp list -> ✔ Connected với portable path (V-1)"
  - "T-2: path sai -> ✘ Failed to connect, lệnh không crash; khôi phục -> ✔; MCP tool session hiện tại vẫn trả kết quả (index_status ready)"
  - "T-3: UTF-8 OK; lệnh index dry-run exit clean (4831 nodes); limitation đối chiếu research note"
  - "T-4: wfc validate 68+64 trước/sau khớp; grep .mcp.json không /Users/|$HOME; JSON parse OK"
  - "T-5: revert --no-commit trong worktree tạm: guard khôi phục dòng /.mcp.json, .mcp.json+docs rời index, wfc validate PASS; worktree removed"
```

## Implementation Notes
```yaml
framework_notes:
  - "claude mcp list là proxy verify không cần restart session: exercise expansion + connect thật"
  - "Sandbox chặn ghi .mcp.json qua shell (PermissionError) — dùng Edit/Write tool; ghi nhận cho instinct tương lai"
  - "Index tự refresh incremental khi query (4740 -> 4831 nodes theo HEAD mới) — giảm nhẹ R3 nhưng guidance re-index vẫn giữ"
known_limitations:
  - "AC-5 dry-run trên máy đã có binary — chưa test máy fresh 100% (residual cho s08)"
  - "AC-2 full cần restart session (T-6, human action)"
```

## Traceability
```yaml
upstream:
  - "codebase-memory-team-rollout.s06.task-breakdown.md (approved)"
next_step: "T-6: human restart session -> AC-2 re-verify -> s08 Verify + DoD"
```

## Handoff
- Outputs actual: commit 51ff5e7 (4 file); T-1..T-5 DONE với verify path pass đầy đủ.
- AC scoreboard tạm cho s08: AC-1 ✓, AC-2 PENDING (T-6 chờ restart), AC-3 HARD ✓ (mô phỏng; xác nhận thêm ở T-6), AC-4 HARD ✓, AC-5 ✓ (residual: chưa test máy fresh), AC-6 ✓, AC-7 HARD ✓ (rehearsed).
- Next human action: restart session (có thể gặp approval prompt do config đổi) -> Claude verify AC-2 -> s08 chốt DoD.
