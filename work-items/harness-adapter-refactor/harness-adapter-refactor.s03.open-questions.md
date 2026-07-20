---
artifact_id: "harness-adapter-refactor.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "harness-adapter-refactor"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "harness-adapter-refactor.s01.restate.md"
  - "harness-adapter-refactor.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Tóm tắt câu hỏi mở, missing input, conflict và readiness verdict.

## Step Contract
```yaml
step_goal: "Resolve OQ-1..OQ-3 của s01 bằng điều tra WIP + docs, nêu scope fork cho human, chốt readiness."
input_summary:
  - "Điều tra 2026-07-20 (read-only agent): full diff 3 script, schema 2 adapter, grep docs/plans, test coverage, callers"
output_summary:
  - "OQ status + findings + scope fork + readiness"
done_when:
  - "Không OQ chặn s04 thiếu owner/verify path; scope fork trình human"
owner: "claude (điều tra) -> human (quyết scope ở s04, approach ở s05)"
```

## Artifact Chính
```yaml
open_questions:
  - id: OQ-1
    question: "docs/plans có spec cho adapter format chưa? WIP hoàn thiện tới đâu?"
    status: RESOLVED
    finding: >-
      KHÔNG có plan nào định nghĩa schema adapter.json/content+harnesses (grep 0 kết quả).
      Neo gần nhất là Harness Track H1-H4 trong sdd-light plan (mức governance, đang
      pending-human-approval) — WIP là triển khai đi trước spec. Mức hoàn thiện: utils
      implement đủ + validate + cache; 2 adapter đúng schema; cli/sync đã nối dây;
      backward compat giữ. Thiếu: test (0 unit test cho path mới ở main tree), manifest
      root vẫn legacy nên nhánh new-format CHƯA TỪNG chạy end-to-end, chưa có harness thứ 3.
    owner: "closed — hệ quả: work item này CHÍNH LÀ nơi spec hóa format (s04/s05)"
  - id: OQ-2
    question: "Manifest format mới có cần Contract gate?"
    status: RESOLVED_PROPOSED
    finding: >-
      CÓ — adapter.json schema + manifest content/harnesses là public surface của bundle
      (người dùng wfc ngoài repo phụ thuộc). Đề xuất: approval_gates.contract=required ở s04,
      contract = schema adapter.json + quy tắc fallback legacy.
    owner: "human xác nhận khi pass Spec+DoR (s04)"
  - id: OQ-3
    question: "Giữ WIP làm base hay viết lại theo TDD từ đầu?"
    status: RESOLVED_PROPOSED
    finding: >-
      Đề xuất GIỮ WIP làm base: code có validate/cache/fallback tử tế, viết lại là lãng phí.
      Bù TDD bằng: viết test bọc (characterization) cho toàn bộ hàm mới TRƯỚC, test tái hiện
      bug precedence (fail đúng lý do), rồi mới fix/sửa tiếp — ghi TDD exception cho phần
      code đã viết sẵn trong Delivery Rule Evidence s07.
    owner: "human xác nhận ở s05"
findings_extra:
  - "BUG CONFIRMED (2026-07-20, verbatim workflow-bundle-utils.js:634): 'context.repoRoot || context.manifest ? getDefaultRepoRoot() : process.cwd()' — precedence nuốt context.repoRoot thật; phải fix trong scope (AC-2)"
  - "RISK CONFIRMED nhưng behavior hiện tại chấp nhận được: detectActiveHarness trên máy có cả ~/.codex + ~/.claude, non-TTY -> throw với message rõ ('Specify --mode <harness>') — AC-6 chỉ cần test khóa hành vi, không cần đổi code"
  - "RISK HẠ XUỐNG LOW (đo thật): 0 skill file trong skills/ có executable bit -> chmod đệ quy 755/644 không phá gì với nội dung hiện tại; AC-5 giữ ở mức chốt-hành-vi + test, không phải blocker"
derisk_evidence_2026_07_20:
  - "sdd-light-t1 test files KHÔNG phải adapter test (cover schema-version readers) -> không salvage nội dung được"
  - "NHƯNG xác lập test style chuẩn của repo: plain assert + console + exit 1, chạy qua run-all.js, không framework — test mới của work item này PHẢI theo style đó"
  - "MERGE RISK MỚI: sdd-light-t1 chứa cả bộ test/ 24 file + sửa package.json/wfc.js chưa commit — work item này thêm file test vào cùng thư mục -> phối hợp merge với sdd-light khi cả 2 land (ghi vào s06 dependency)"
scope_fork_for_human:
  - "SCOPE-A (minimal): giữ manifest root legacy; new-format chỉ test bằng fixture; ship adapter registry cho list/detect/home-resolution như WIP đang dùng thật"
  - "SCOPE-B (full): migrate manifest root sang content+harnesses, kích hoạt new-format end-to-end, giữ legacy làm fallback được test"
missing_inputs: []
conflicts:
  - "WIP đi trước spec (H-track pending) — work item này phải tự spec hóa format ở s04/s05, không được viện dẫn H-track như spec đã duyệt"
assumptions:
  - "Test trong sdd-light-t1 worktree là bản nháp cùng hướng — chưa xác minh nội dung"
```

## Input Readiness
```yaml
status: READY
blocking_items: []
owner_actions:
  - "human: chọn SCOPE-A/B khi pass Spec+DoR (s04); xác nhận contract=required; xác nhận giữ-WIP-làm-base ở s05"
  - "claude: draft s04 theo scope được chọn"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "3 OQ resolved/proposed bằng evidence diff + grep thật; 1 bug + 2 risk + 1 lead test được phát hiện thêm"
```

## Traceability
```yaml
upstream:
  - "harness-adapter-refactor.s01.restate.md"
  - "harness-adapter-refactor.s02.business-goal.md"
next_step: "s04 Acceptance + DoR (sau khi human chọn SCOPE-A/B)"
```

## Handoff
- Trạng thái readiness: READY — scope fork A/B cần human chọn trước khi draft s04.
- Điều cần làm để sang step 4: human chọn scope + confirm contract gate -> claude draft s04 -> human pass Spec + DoR.
