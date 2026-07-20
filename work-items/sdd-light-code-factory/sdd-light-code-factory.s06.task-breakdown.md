---
artifact_id: "sdd-light-code-factory.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "sdd-light-code-factory"
step_id: "s06"
step_slug: "task-breakdown"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-light-code-factory.s05.technical-approach.md"
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
step_goal: "Task plan đưa T1-T7 (+telemetry) từ uncommitted worktree thành commit sạch trên worktree riêng, xử lý 2 file test trùng tên với main, verify đầy đủ, merge; human pass Task Plan."
input_summary:
  - "s05 approved OPT-A: scope = T1-T7 + workflow-telemetry.js (độc lập T8); T8+T9 còn lại mở work item riêng sau"
output_summary:
  - "T-1..T-6 với owned_scope + verify path + thứ tự"
done_when:
  - "Human pass Task Plan"
owner: "claude (draft) -> human (pass Task Plan)"
```

## Artifact Chính
```yaml
tasks:
  - id: T-1
    name: "Worktree sạch từ main + apply patch T1-T7"
    owned_scope: "worktree mới .claude/worktrees/sdd-light-authoring từ main; patch toàn bộ diff hiện có trong sdd-light-t1 (0 diff ở T8 nên KHÔNG cần loại trừ gì — patch đã đúng scope T1-T7+telemetry)"
    steps:
      - "git diff (modified) + copy (untracked) từ sdd-light-t1 -> patch/snapshot"
      - "worktree add -b feat/sdd-light-authoring main; apply patch + copy file mới"
      - "KHÔNG copy docs/plans/ nội dung khác ngoài sdd-light-code-factory-plan-review.md nếu có file khác lẫn vào (kiểm tra trước)"
    verify: "git status trong worktree mới khớp đúng danh sách file đã audit ở s03 (23 modified + 26 untracked, trừ 2 file test trùng tên xử lý riêng ở T-2)"
  - id: T-2
    name: "Merge 2 file test trùng tên với main (schema-version-sync vs adapter/chmod tests)"
    owned_scope: "packages/workflow-bundle/test/workflow-bundle-utils.test.js, packages/workflow-bundle/test/sync-workflow-bundle-runtime.test.js"
    steps:
      - "Đọc cả 2 phiên bản (main: adapter+chmod tests từ harness-adapter-refactor; sdd-light: schema-version-sync tests)"
      - "Merge nội dung: giữ toàn bộ assert function của cả 2 phiên bản trong 1 file, gộp phần console.log/exit code"
      - "KHÔNG để 1 bản ghi đè bản kia — cả 2 bộ test đều phải chạy"
    verify: "File merged chạy PASS toàn bộ assertion của CẢ 2 nguồn gốc (adapter + chmod + schema-version)"
  - id: T-3
    name: "Full verify trong worktree mới"
    owned_scope: "toàn bộ worktree feat/sdd-light-authoring"
    steps:
      - "node packages/workflow-bundle/test/run-all.js (23+ file, kỳ vọng tất cả PASS)"
      - "7 verification_commands từ plan (governance, sdd, change, planning, protocol, authoring-smoke, validate tổng)"
      - "wfc bundle-smoke (đảm bảo không phá vỡ smoke test đã fix ở release/v2.2.1)"
    verify: "Tất cả lệnh trên PASS; 0 regression so với baseline main hiện tại"
  - id: T-4
    name: "Review 2 tầng + commit"
    owned_scope: "toàn bộ diff T1-T7"
    steps:
      - "Spec compliance: đối chiếu từng task T1-T7 với outputs_expected trong plan — đủ, đúng, không lệch scope_guards"
      - "Code quality: đọc qua các file core đã đổi (đặc biệt cr-aggregate-reconcile.js mới, work-item-protocol.js, workflow-gate-review.js — nhạy cảm nhất vì liên quan gate enforcement)"
      - "Commit 1 hoặc vài commit theo nhóm task (T1-T2, T3-T4, T5-T6, T7) để traceability rõ, kèm co-author"
    verify: "Review verdict PASS cả 2 tầng trước khi merge"
  - id: T-5
    name: "Merge vào main"
    owned_scope: "git merge --no-ff vào main"
    verify: "Sau merge: run-all.js + 7 verification_commands + bundle-smoke + wfc validate đều PASS trên main"
  - id: T-6
    name: "Dọn worktree sdd-light-t1 (worktree gốc) sau khi merge an toàn"
    owned_scope: ".claude/worktrees/sdd-light-t1"
    steps:
      - "Xác nhận nội dung đã merge đầy đủ (diff review vs commit đã merge)"
      - "git worktree remove; xóa branch worktree-sdd-light-t1 nếu có track"
    verify: "worktree list sạch; không mất nội dung (đã merge vào main)"
dependencies:
  - "T-1 -> T-2 -> T-3 -> T-4 -> T-5 -> T-6 tuần tự"
handoff_points:
  - "Sau T-5: mở work item riêng cho T8+T9 khi human sẵn sàng (không tự động mở ngay)"
  - "T-2 là điểm rủi ro merge cao nhất — nếu phát hiện thêm xung đột semantic (không chỉ tên file), dừng và báo cáo trước khi tự quyết"
```

## Verification Plan
- Check bắt buộc: run-all.js toàn bộ; 7 verification_commands; bundle-smoke; wfc validate trước/sau ở mỗi mốc T-3 và T-5.
- Risk note: cr-aggregate-reconcile.js là file mới core (CR ACCEPT logic) — review kỹ nhất dù test đã pass, vì đây là nơi dễ có bug tinh vi nhất (atomic bump, no-self-accept).
- Rollout note nếu có: không rollout/cutover — T1-T7 chưa nối vào authority (T8), an toàn.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "TDD: code đã có sẵn (viết trước khi work item này tồn tại) — 23/23 test đã PASS là evidence, không cần viết lại; T-2 merge test là phần MỚI cần cẩn thận không phá test có sẵn của cả 2 nguồn"
  - "Worktree BẮT BUỘC: nhiều file, core protocol/gate engine, risk cao"
  - "Review sớm T-4 trước merge, 2 tầng"
  - "Subagent không dùng (tuần tự, cùng boundary)"
blocking_items: []
owner: "human (pass Task Plan)"
next_action: "human pass Task Plan -> s07"
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "run-all.js + 7 verification_commands tại T-3 (worktree mới) và T-5 (sau merge main)"
compatibility_checkpoints:
  - "Legacy CHANGE-001 dual-read; strict/full fixture — đã verify PASS, re-verify sau merge"
migration_or_backfill_steps:
  - "Không có (T8 cutover là work item khác)"
rollback_or_restore_steps:
  - "Revert merge commit trên main; T1-T7 chưa cutover nên rollback không ảnh hưởng workflow khác"
```

## Traceability
```yaml
upstream:
  - "sdd-light-code-factory.s05.technical-approach.md (approved OPT-A)"
next_step: "s07 Implement"
```

## Handoff
- Task thực hiện trước: T-1 (worktree sạch + patch).
- Phụ thuộc chặn: T-2 (merge test trùng tên) là điểm rủi ro nhất, dừng lại báo cáo nếu phát sinh xung đột semantic.
- Điều kiện sang step 7: human pass Task Plan.
