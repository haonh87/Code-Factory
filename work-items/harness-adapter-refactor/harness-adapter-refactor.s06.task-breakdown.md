---
artifact_id: "harness-adapter-refactor.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "harness-adapter-refactor"
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
  - "harness-adapter-refactor.s05.technical-approach.md"
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
step_goal: "Task plan thi công OPT-A trong worktree riêng từ release/v2.2.0; human pass Task Plan."
input_summary:
  - "s05 approved: giữ WIP + characterization-first + bug-repro TDD; contract schema đã duyệt"
output_summary:
  - "T-1..T-7 với owned_scope + verify path + thứ tự + TDD discipline"
done_when:
  - "Human pass Task Plan"
owner: "claude (draft) -> human (pass Task Plan)"
```

## Artifact Chính
```yaml
tasks:
  - id: T-1
    name: "Worktree + apply WIP"
    owned_scope: "worktree mới .claude/worktrees/harness-adapter từ release/v2.2.0; 3 script + adapters/"
    steps:
      - "git diff main WIP -> patch; worktree add -b feat/harness-adapter release/v2.2.0; apply patch; copy adapters/"
      - "KHÔNG sửa gì ở main worktree trong suốt s07 (WIP gốc giữ nguyên làm safety cho tới T-7)"
    verify: "wfc bundle-smoke PASS trong worktree (baseline WIP hoạt động trên nền v2.2.0)"
  - id: T-2
    name: "Characterization tests bọc 4 hàm adapter + legacy fallback"
    owned_scope: "packages/workflow-bundle/test/workflow-bundle-adapter.test.js (mới, style plain assert; đối chiếu run-all.js sdd-light-t1 trước khi đặt tên/cách chạy)"
    verify: "Test pass với code WIP hiện tại (khóa hành vi trước khi sửa); node test file exit 0"
  - id: T-3
    name: "TDD bug 634: repro -> fix -> pass"
    owned_scope: "test (case mới) + workflow-bundle-utils.js dòng 634"
    steps:
      - "Test: normalizeInstallState với context.repoRoot=custom-path -> kỳ vọng adapter load từ custom-path; chạy thấy FAIL đúng lý do precedence (evidence)"
      - "Fix: '(context.repoRoot) || getDefaultRepoRoot()' đúng ngữ nghĩa; chạy lại PASS"
    verify: "2 lần chạy test ghi output fail->pass vào s07 (AC-2 HARD)"
  - id: T-4
    name: "Edge tests: ambiguity + adapter hỏng + adapters/ vắng + exec-bit"
    owned_scope: "test file T-2 mở rộng; KHÔNG đổi code trừ khi test lộ bug mới (nếu có -> lặp chu kỳ TDD như T-3)"
    verify: "non-TTY 2-harness -> throw message có '--mode'; adapter JSON hỏng bị bỏ qua; không adapters/ -> legacy y hệt (so output getRuntimeConfig trước/sau); hành vi chmod 644 được khóa bằng test (chốt: 644-flat là chủ đích, 0 skill có exec bit)"
  - id: T-5
    name: "Fixture test new-format (SCOPE-A)"
    owned_scope: "test + fixture manifest {content, harnesses} inline trong test"
    verify: "getRuntimeConfig/bundleRuntimeMode với fixture new-format trả runtimeConfig đúng từ adapter; manifest root KHÔNG đổi"
  - id: T-6
    name: "Tổng verify + review 2 tầng + merge vào release/v2.2.0"
    owned_scope: "worktree; merge --no-ff vào release/v2.2.0"
    steps:
      - "wfc bundle-smoke + wfc validate + chạy toàn bộ test mới"
      - "AC-4: node scripts/workflow-bundle-cli.js (shim) + bin/wfc.js help/status chạy nguyên trạng"
      - "Review: spec compliance (đúng SCOPE-A, đúng contract schema, không migrate manifest) -> code quality"
      - "Merge 1 merge-commit revertable vào release/v2.2.0"
    verify: "Trên release/v2.2.0 sau merge: smoke + validate PASS"
  - id: T-7
    name: "Dọn WIP khỏi main working tree"
    owned_scope: "main worktree: 3 file modified + adapters/ untracked"
    steps:
      - "CHỈ SAU khi T-6 merge xong: git checkout -- 3 file; rm -rf adapters/ ở main (nội dung đã an toàn trên release/v2.2.0)"
    verify: "git status main sạch phần workflow-bundle; diff giữa main-checkout và branch = đúng phần refactor"
dependencies:
  - "T-1 -> T-2 -> T-3 -> T-4 -> T-5 -> T-6 -> T-7 tuần tự (TDD chain, cùng boundary)"
  - "MERGE COORDINATION: nếu sdd-light land trước vào cùng test/ -> đối chiếu run-all.js lại ở T-6"
handoff_points:
  - "Sau T-6: evidence sang s08; T-7 là cleanup có điều kiện"
  - "Test lộ bug mới ngoài scope -> ghi finding, không silent-fix ngoài AC"
```

## Verification Plan
- Check bắt buộc: bundle-smoke tại T-1/T-6; test suite mới pass toàn bộ; fail->pass evidence T-3; validate; UTF-8 note.
- Risk note: worktree build trên release/v2.2.0 (đã bump 2.2.0) — smoke assertion version phải khớp 2.2.0 (instinct smoke-test-version-bump: bump command đã xử lý, T-1 xác nhận).
- Rollout note nếu có: land vào release/v2.2.0; publish thuộc release lane.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "TDD: T-3 bug-repro-first đúng chu kỳ; code WIP có sẵn -> characterization T-2 bọc trước, exception ghi s07 (đã chốt s05)"
  - "Worktree BẮT BUỘC: dùng .claude/worktrees/harness-adapter (T-1)"
  - "Review sớm T-6 trước merge; subagent không dùng (TDD chain tuần tự)"
  - "Contract: mọi thay đổi schema adapter.json trong lúc implement = spec-change, phải quay lại human"
blocking_items: []
owner: "human (pass Task Plan)"
next_action: "human pass Task Plan -> s07"
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "Characterization tests T-2 khóa legacy path; smoke tại T-1 (trước sửa) và T-6 (sau sửa)"
compatibility_checkpoints:
  - "AC-4 shims/bin nguyên trạng tại T-6; legacy manifest y hệt (T-4 so output)"
migration_or_backfill_steps:
  - "Không có (SCOPE-A)"
rollback_or_restore_steps:
  - "Revert merge-commit trên release/v2.2.0; main không bị đụng cho tới T-7 (checkout-- chỉ sau merge an toàn)"
```

## Traceability
```yaml
upstream:
  - "harness-adapter-refactor.s05.technical-approach.md (approved OPT-A + contract)"
next_step: "s07 Implement"
```

## Handoff
- Task thực hiện trước: T-1 (bảo toàn WIP bằng patch trước mọi thao tác).
- Phụ thuộc chặn: sdd-light merge coordination (theo dõi ở T-6); độc lập với work item hooks.
- Điều kiện sang step 7: human pass Task Plan.
