---
artifact_id: "claude-hooks-instincts-adoption.s07.implementation"
artifact_family: workflow-step
work_item_slug: "claude-hooks-instincts-adoption"
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
  - "claude-hooks-instincts-adoption.s06.task-breakdown.md"
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
step_goal: "Thi công T-1..T-5 theo task plan approved; evidence cho s08."
input_summary:
  - "s06 approved (Task Plan passed 2026-07-20)"
output_summary:
  - "Commit aafcab1 trên release/v2.2.1 (6 file + gitignore); main junk đã dọn"
done_when:
  - "T-1..T-5 verify path pass"
owner: "claude (implement) -> human (s08 DoD)"
```

## Artifact Chính
```yaml
implemented_changes:
  - "T-1: xóa scripts/.claude/ junk ở main; copy 6 file untracked sang worktree release-v2-2-1, cmp khớp 100%, exec bits giữ (DONE)"
  - "T-2: +exit 0 tường minh cuối load-workflow-context.sh (chạy lại exit 0); gitignore +scripts/.claude/ +.claude/worktrees/ (check-ignore pass) (DONE)"
  - "T-3: commit aafcab1 — AC-2 HARD grep /Users/ staged diff = 0; AC-1 đủ 5 script settings.json trỏ tới; review 2 tầng PASS (DONE)"
  - "T-4: degrade matrix 5 hook × (empty, broken-json) = exit 0 toàn bộ; profile matrix minimal/standard=0, strict block=2, disabled-list=0; wfc validate 68+64 worktree (DONE)"
  - "T-5: rollback rehearsal worktree tạm — revert sạch, 6 file rời tracking, tdd-enforce pre-existing giữ, validate PASS trạng thái revert (DONE)"
doc_changes:
  - "s07 note này"
operational_notes:
  - "Main worktree không đổi hành vi (hooks untracked vẫn chạy như cũ cho tới khi release/v2.2.1 merge về main)"
```

## Delivery Rule Evidence
```yaml
behavior_change: NO
tdd_status: NOT_REQUIRED
tdd_test_refs: []
tdd_exception_reason: ""
tdd_alternative_verify_path:
  - "Adopt-as-is + 1 dòng defensive fix; verify = degrade matrix + profile matrix chạy thật (bảng exit codes ở trên)"
change_risk_profile: STANDARD
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/release-v2-2-1 (workspace commit, main không đụng)"
worktree_reason: "Theo s06: commit trên release/v2.2.1, cô lập khỏi main"
review_status: DONE
review_refs:
  - "T-3 review 2 tầng (2026-07-20): spec compliance PASS (đúng 7 file staged theo OPT-A, adopt-as-is, 0 path máy, junk đã dọn trước) -> code quality PASS (exec bits 555 giữ, settings.json parse OK, gitignore đúng phạm vi)"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Commit thẳng release/v2.2.1 (aafcab1), revertable 1 commit (rehearsed)"
verify_path:
  - "T-3: grep /Users/ = 0; 5/5 script tồn tại theo settings.json"
  - "T-4: bảng exit codes — 5 hook degrade exit 0; tdd-enforce: minimal=0 standard=0 strict=2(block) disabled=0"
  - "T-5: revert rehearsal + validate PASS"
```

## Implementation Notes
```yaml
framework_notes:
  - "Copy bằng cp -p giữ mode 555; load-workflow-context.sh chmod tạm u+w để append rồi trả lại 555"
known_limitations:
  - "Chưa test trên máy thiếu node (mitigation: Claude Code bỏ qua hook lỗi, đã ghi edge case s04; residual cho s08)"
  - "Hiệu lực team chỉ sau khi release/v2.2.1 merge về main + teammate pull"
```

## Traceability
```yaml
upstream:
  - "claude-hooks-instincts-adoption.s06.task-breakdown.md (approved)"
next_step: "s08 Verify + DoD"
```

## Handoff
- Outputs actual: commit aafcab1 trên release/v2.2.1; main junk sạch.
- AC scoreboard tạm: AC-1 ✓, AC-2 HARD ✓, AC-3 HARD ✓ (matrix), AC-4 ✓ (matrix), AC-5 HARD ✓ (validate), AC-6 ✓ (exit-0 fix).
- Next: s08 verify + DoD (human).
