---
artifact_id: "harness-adapter-refactor.s07.implementation"
artifact_family: workflow-step
work_item_slug: "harness-adapter-refactor"
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
  - "harness-adapter-refactor.s06.task-breakdown.md"
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
step_goal: "Thi công T-1..T-7 theo task plan approved; evidence cho s08."
input_summary:
  - "s06 approved (Task Plan passed 2026-07-20)"
output_summary:
  - "Merge 0fbe396 vào release/v2.2.0 (feat e5ee1d3); main working tree sạch WIP"
done_when:
  - "T-1..T-7 verify path pass"
owner: "claude (implement) -> human (s08 DoD)"
```

## Artifact Chính
```yaml
implemented_changes:
  - "T-1: worktree .claude/worktrees/harness-adapter từ release/v2.2.0, WIP patch 688 dòng apply, smoke baseline PASS (DONE)"
  - "T-2: characterization tests — test/workflow-bundle-utils.test.js: loadAdapter (5 error paths), listAvailableHarnesses (sorted/vắng/hỏng-skip), detectActiveHarness (explicit/fallback/env/ambiguity 0-1-nhiều), getRuntimeConfigFromAdapter (DONE)"
  - "T-3: TDD bug 634 — test repro FAIL đúng lý do (custom_home=undefined) -> fix 'context.repoRoot || getDefaultRepoRoot()' -> PASS (DONE)"
  - "T-4: edge tests gộp trong T-2 file + chốt hành vi chmod 644-flat là chủ đích (DONE)"
  - "T-5: fixture new-format test (manifest content+harnesses inline; manifest root KHÔNG đổi) (DONE)"
  - "T-6: full suite + smoke + validate + AC-4 shim/bin PASS; review 2 tầng PASS; merge --no-ff 0fbe396 vào release/v2.2.0 (DONE)"
  - "T-7: main checkout -- 3 script + gỡ WIP untracked; main về nguyên trạng 2.1.1 (DONE — có 1 sự cố recover, xem log)"
doc_changes:
  - "s07 note này"
operational_notes:
  - "Đường legacy sản xuất không đổi; adapter registry hoạt động (list/detect/home-resolution)"
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: PARTIAL_EXCEPTION
tdd_test_refs:
  - "packages/workflow-bundle/test/workflow-bundle-utils.test.js (7 nhóm assert)"
  - "packages/workflow-bundle/test/sync-workflow-bundle-runtime.test.js (chmod behavior)"
tdd_exception_reason: "Code WIP đã tồn tại trước work item (viết ngoài chu trình) — không thể test-first phần đó"
tdd_alternative_verify_path:
  - "Characterization tests bọc TOÀN BỘ hàm mới TRƯỚC khi sửa bất kỳ dòng code nào (khóa hành vi)"
  - "Bug fix 634 đi đúng chu kỳ TDD: test fail đúng lý do (evidence output) -> fix -> pass"
  - "Export copyDirectory cũng test-first: test fail vì thiếu export -> thêm export -> pass"
change_risk_profile: ELEVATED
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/harness-adapter (feat/harness-adapter)"
worktree_reason: "Bắt buộc theo s06: nhiều file, đụng release branch"
review_status: DONE
review_refs:
  - "T-6 review 2 tầng (2026-07-20): spec compliance PASS — SCOPE-A giữ (manifest root untouched; package manifest generated chỉ reorder key theo sort, nội dung y hệt — đã kiểm diff), contract schema đủ key theo bản duyệt s05, không caller ngoài đổi. Code quality PASS — fix 634 minimal đúng ngữ nghĩa (khớp getDefaultInstallState), test style plain-assert khớp repo"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "feat/harness-adapter -> merge --no-ff 0fbe396 -> release/v2.2.0 (revertable 1 merge commit)"
verify_path:
  - "T-1: bundle-smoke PASS trên WIP+v2.2.0 base"
  - "T-3: test output FAIL->PASS lưu trong transcript; fail message 'custom_home=undefined' đúng root cause precedence"
  - "T-6: 3 test file pass + smoke PASS + wfc validate 68+64 (worktree) + shim exit 0 + bin version 2.2.0 + status OK"
  - "Sau merge: smoke + utils test PASS trên release/v2.2.0"
```

## Implementation Notes
```yaml
framework_notes:
  - "tdd-enforce hook tự chặn Edit production .js cho tới khi test đúng convention tồn tại (packages/X/scripts/foo.js -> packages/X/test/foo.test.js) — hook hoạt động đúng thiết kế, buộc đổi tên test file theo convention"
  - "INCIDENT + RECOVER (T-7): rm -rf adapters/ ở main xóa nhầm file tracked có sẵn (install scripts cũ) vì adapters/ không thuần untracked; khôi phục ngay bằng git checkout -- adapters/, không mất dữ liệu (WIP đã commit e5ee1d3). Bài học: kiểm git ls-files trước khi rm thư mục hỗn hợp"
known_limitations:
  - "New-format manifest chỉ được test bằng fixture (SCOPE-A) — kích hoạt end-to-end là SCOPE-B tương lai"
  - "Test file trùng tên với bản sdd-light-t1 (workflow-bundle-utils.test.js, sync-...) nhưng khác nội dung — khi sdd-light land phải merge nội dung 2 bản (đã lường trước ở s06)"
```

## Traceability
```yaml
upstream:
  - "harness-adapter-refactor.s06.task-breakdown.md (approved)"
next_step: "s08 Verify + DoD"
```

## Handoff
- Outputs actual: feat e5ee1d3 + merge 0fbe396 trên release/v2.2.0; main sạch.
- AC scoreboard tạm: AC-1 ✓, AC-2 HARD ✓ (fail->pass evidence), AC-3 HARD ✓ (smoke + fixture), AC-4 ✓, AC-5 ✓ (chmod test), AC-6 ✓ (ambiguity test), AC-7 HARD ✓.
- Next: s08 verify + DoD (human).
