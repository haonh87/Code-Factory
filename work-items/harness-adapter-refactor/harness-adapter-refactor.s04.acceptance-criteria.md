---
artifact_id: "harness-adapter-refactor.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "harness-adapter-refactor"
step_id: "s04"
step_slug: "acceptance-criteria"
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
  contract: "required"
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
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "harness-adapter-refactor.s01.restate.md"
  - "harness-adapter-refactor.s02.business-goal.md"
  - "harness-adapter-refactor.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Tóm tắt acceptance criteria, edge case, DoR và governance checks cho readiness.

## Step Contract
```yaml
step_goal: "Chốt AC đo được cho SCOPE-A (human chọn 2026-07-20), contract baseline cho adapter schema, DoR; human pass Spec + Contract + DoR."
input_summary:
  - "s02 SM-1..SM-5; s03: bug precedence, 2 risk, lead test sdd-light-t1; SCOPE-A chốt (manifest legacy giữ, new-format fixture-only)"
output_summary:
  - "AC-1..AC-7 + contract baseline + baseline + DoR verdict"
done_when:
  - "Human pass Spec + Contract + DoR"
owner: "claude (draft) -> human (pass gates)"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "harness-adapter-refactor.s01.restate.md (confirmed 2026-07-20)"
  - "harness-adapter-refactor.s02.business-goal.md (SM-1..SM-5)"
  - "s03 scope_fork: SCOPE-A chọn bởi human 2026-07-20"
decision_notes:
  - "WIP đi trước spec — work item này spec hóa adapter format; H-track (pending approval) KHÔNG được viện dẫn làm spec"
```

## Contract Baseline
```yaml
status: PARTIAL
api_contract_refs:
  - "Contract cần chốt ở s05: schema adapters/<id>/adapter.json (harnessId, harnessLabel, version, detection{homeDirMarker,envVar,defaultHomeDir}, naming{...}, paths{...}, content{...}, runtime{installStateHomeKey}) + quy tắc fallback legacy manifest"
ux_contract_refs: []
notes:
  - "approval_gates.contract=required: adapter.json là public surface bundle (dù SCOPE-A giữ manifest legacy, adapter vẫn ship thật cho list/detect/home-resolution)"
  - "Contract pass khi human duyệt schema tại s05 (văn bản hóa trong technical approach)"
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "WIP diff 3 file scripts (đã điều tra full 2026-07-20): utils implement đủ hàm adapter + validate + cache; cli auto-detect; sync fan-out động; backward compat có fallback"
  - "adapters/codex + adapters/claude: cùng schema, khác giá trị; claude dùng chung policies/codex"
  - "Manifest root LEGACY (không content/harnesses) -> nhánh new-format chưa từng chạy"
  - "Test hiện có: chỉ bump-version.test.js; smoke luôn truyền --mode tường minh (không test auto-detect)"
  - "Bug: normalizeInstallState precedence bỏ qua context.repoRoot"
impacted_surfaces:
  - "packages/workflow-bundle/scripts/{workflow-bundle-utils,workflow-bundle-cli,sync-workflow-bundle-runtime}.js (hoàn tất WIP + fix bug)"
  - "packages/workflow-bundle/test/: +unit tests mới"
  - "adapters/codex/, adapters/claude/: commit lần đầu"
  - "Docs bundle: mô tả adapter registry (public surface)"
compatibility_constraints:
  - "Manifest legacy là đường chạy production — không đổi hành vi install/update/sync codex+claude"
  - "Interface shims + bin/wfc.js không đổi"
rollback_constraints:
  - "Toàn bộ trong worktree riêng, merge vào release/v2.2.0 bằng 1 merge revertable; main không đụng"
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: AC-1
    criterion: "Unit test cover hàm adapter mới + fallback legacy (SM-1)"
    measure: "loadAdapter (hợp lệ/thiếu file/JSON hỏng/sai harnessId), listAvailableHarnesses (rỗng/lỗi-bị-bỏ-qua/sort), detectActiveHarness (explicit/env/marker/0-1-nhiều), getRuntimeConfigFromAdapter — tất cả pass trong npm test"
  - id: AC-2
    criterion: "Bug precedence normalizeInstallState fix theo TDD (SM-2)"
    measure: "Test tái hiện fail đúng lý do TRƯỚC fix (evidence), pass SAU fix"
    gate: HARD
  - id: AC-3
    criterion: "bundle-smoke PASS manifest legacy + new-format có fixture test (SM-3, SCOPE-A)"
    measure: "wfc bundle-smoke PASS nguyên trạng; unit/fixture test cho getRuntimeConfig new-format path (KHÔNG migrate manifest root)"
    gate: HARD
  - id: AC-4
    criterion: "Interface ngoài không đổi (SM-4)"
    measure: "shims + bin/wfc.js chạy nguyên trạng; help text đổi mô tả nhưng flags giữ nguyên"
  - id: AC-5
    criterion: "Executable bit của skill file giữ sau sync (SM-5, risk chmod)"
    measure: "Test: file có bit thực thi trong source -> sau copyDirectory vẫn thực thi được (hoặc quyết định chốt + test hành vi mới nếu 644-flat là chủ đích)"
  - id: AC-6
    criterion: "Hành vi ambiguity của detectActiveHarness được chốt + test (risk s03)"
    measure: "Cả ~/.codex và ~/.claude tồn tại: TTY -> prompt, non-TTY -> lỗi có message rõ hướng dẫn --mode; có test"
  - id: AC-7
    criterion: "wfc validate PASS trước/sau"
    measure: "Khớp baseline"
    gate: HARD
edge_cases:
  - "adapters/ không tồn tại (repo cũ dùng bundle) -> fallback legacy hoàn toàn, không lỗi"
  - "adapter.json hỏng -> listAvailableHarnesses bỏ qua im lặng (giữ, nhưng phải có test khẳng định)"
  - "Máy chỉ có 1 harness -> auto-detect không prompt"
out_of_scope:
  - "Migrate manifest root (SCOPE-B); harness thứ ba thật; H-track; publish"
done_when:
  - "AC-1..AC-7 PASS (AC-2/3/7 HARD); DoD ở s08"
behavioral_invariants:
  - "Đường legacy manifest hành xử y hệt trước refactor"
  - "Không caller ngoài package đổi interface"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Spec required; Contract REQUIRED (adapter schema public surface); Foundation not_applicable (registry là additive, không đổi stack/runtime)"
  - "TDD BẮT BUỘC: AC-2 bug-repro-first; code WIP có sẵn -> characterization test bọc trước khi sửa (exception ghi ở s07)"
  - "Worktree BẮT BUỘC: nhiều file, đụng release branch, hơn 1 session khả năng cao"
blocking_items: []
owner: "human (pass Spec + Contract + DoR)"
next_action: "human pass gates -> s05 (văn bản hóa contract schema + approach + đối chiếu test sdd-light-t1)"
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners:
  - "human: pass Spec + Contract (schema duyệt ở s05) + DoR"
notes:
  - "Contract gate pass thực tế xảy ra ở s05 khi schema được văn bản hóa — DoR không chặn vì schema de-facto đã tồn tại trong 2 adapter"
```

## Traceability
```yaml
upstream:
  - "harness-adapter-refactor.s01.restate.md"
  - "harness-adapter-refactor.s02.business-goal.md"
  - "harness-adapter-refactor.s03.open-questions.md (SCOPE-A + bug + risks)"
next_step: "s05 Technical Approach"
```

## Handoff
- Criteria bắt buộc: AC-1..AC-7, HARD AC-2/AC-3/AC-7.
- Edge case phải giữ: repo không có adapters/ -> legacy nguyên vẹn.
- Điều kiện sang step 5: human pass Spec + DoR (Contract văn bản hóa + pass tại s05).
