---
artifact_id: "claude-hooks-instincts-adoption.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "claude-hooks-instincts-adoption"
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
  task_plan_reviewed_at: "2026-07-20"
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
  - "claude-hooks-instincts-adoption.s05.technical-approach.md"
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
step_goal: "Task plan thi công OPT-A (auto-on strict) trên branch release/v2.2.1; human pass Task Plan."
input_summary:
  - "s05 approved: adopt-as-is + dọn 2 blocker + fix exit-0; merge target release/v2.2.1"
output_summary:
  - "T-1..T-5 với owned_scope + verify path + thứ tự"
done_when:
  - "Human pass Task Plan"
owner: "claude (draft) -> human (pass Task Plan)"
```

## Artifact Chính
```yaml
tasks:
  - id: T-1
    name: "Dọn blocker trong main worktree + chuẩn bị file"
    owned_scope: "scripts/.claude/ (xóa), copy 4 hook + settings.json + instincts.yaml sang worktree release-v2-2-1"
    steps:
      - "rm -rf scripts/.claude/ (junk có path máy — đã xác minh nội dung ở s03)"
      - "Copy 6 file untracked vào .claude/worktrees/release-v2-2-1 đúng vị trí (worktree không share untracked)"
    verify: "git status main không còn scripts/.claude/; diff file copy khớp bản gốc (cmp)"
  - id: T-2
    name: "Fix exit-0 + gitignore (trong worktree release-v2-2-1)"
    owned_scope: "scripts/hooks/load-workflow-context.sh (+1 dòng exit 0 cuối), .gitignore (+scripts/.claude/ +.claude/worktrees/)"
    verify: "bash script với stdin rỗng -> exit 0; git check-ignore scripts/.claude/x .claude/worktrees/x pass"
  - id: T-3
    name: "Commit adopt 1 commit revertable + review 2 tầng"
    owned_scope: "git tracking: +4 hook, +settings.json, +instincts.yaml, +gitignore, +fix T-2"
    steps:
      - "Trước commit: grep -r /Users/ trên staged diff = rỗng (AC-2 HARD); đối chiếu settings.json commands -> mọi script tồn tại (AC-1)"
      - "Review: spec compliance (đúng OPT-A, đủ 6 file, không lệch adopt-as-is) -> code quality (executable bits giữ, JSON/YAML hợp lệ)"
    verify: "AC-1 + AC-2 measure pass; review verdict ghi note"
  - id: T-4
    name: "Verify chính thức AC-3/AC-4/AC-5"
    owned_scope: "chạy trong worktree release-v2-2-1"
    steps:
      - "Degrade matrix: 5 hook × (stdin rỗng, JSON hỏng) -> exit đúng bảng s03"
      - "Profile matrix: minimal/standard/strict + CF_DISABLED_HOOKS -> đúng design; tdd-enforce block-case exit 2, exempt-case exit 0"
      - "wfc validate trước/sau trong worktree"
    verify: "Bảng exit codes ghi vào s07 làm evidence"
  - id: T-5
    name: "Rollback rehearsal (AC edge)"
    owned_scope: "worktree tạm scratchpad từ HEAD release/v2.2.1"
    verify: "git revert --no-commit HEAD -> 6 file rời tracking, gitignore về cũ, wfc validate PASS -> hủy rehearsal, dọn worktree tạm"
dependencies:
  - "T-1 -> T-2 -> T-3 -> T-4 -> T-5 tuần tự (1 người, 1 boundary)"
handoff_points:
  - "Sau T-5: sang s08 (không cần restart session — hooks không đổi behavior, main worktree không đổi cho tới khi release merge)"
```

## Verification Plan
- Check bắt buộc: grep /Users/ staged diff; degrade + profile matrix; wfc validate trước/sau; UTF-8 note.
- Risk note: hooks trên main worktree vẫn là bản untracked cho tới khi release/v2.2.1 merge về main — hai bản phải giữ giống nhau (T-1 copy + không sửa gì thêm ở main).
- Rollout note nếu có: hiệu lực team khi release/v2.2.1 merge + teammate pull.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "TDD NOT_REQUIRED (adopt-as-is + 1-line defensive fix); verify = matrix chạy thật"
  - "Worktree: dùng worktree release-v2-2-1 sẵn có làm workspace commit (main không đụng) — thỏa rule cô lập"
  - "Review sớm tại T-3 trước commit; subagent không dùng (tuần tự)"
blocking_items: []
owner: "human (pass Task Plan)"
next_action: "human pass Task Plan -> s07"
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "wfc validate trong worktree trước/sau T-3; degrade matrix T-4 khớp bảng s03"
compatibility_checkpoints:
  - "Máy này: hooks main worktree không đổi; máy teammate: chỉ ảnh hưởng sau release merge"
migration_or_backfill_steps:
  - "Không có"
rollback_or_restore_steps:
  - "Revert 1 commit trên release/v2.2.1 (rehearsed T-5); cá nhân: 3 lớp opt-out"
```

## Traceability
```yaml
upstream:
  - "claude-hooks-instincts-adoption.s05.technical-approach.md (approved OPT-A)"
next_step: "s07 Implement"
```

## Handoff
- Task thực hiện trước: T-1 (dọn junk trước mọi git add).
- Phụ thuộc chặn: không — độc lập với work item harness (khác branch, khác file).
- Điều kiện sang step 7: human pass Task Plan.
