---
artifact_id: "harness-adapter-refactor.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "harness-adapter-refactor"
step_id: "s02"
step_slug: "business-goal"
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "harness-adapter-refactor.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Tóm tắt user problem, business outcome, success metric và non-goals.

## Step Contract
```yaml
step_goal: "Chốt user problem, business goal, success metrics và non-goals cho hoàn tất harness-adapter."
input_summary:
  - "s01 confirmed 2026-07-20; điều tra WIP 2026-07-20: utils đã implement đủ hàm adapter, 2 adapter đúng schema, backward compat giữ; THIẾU test, manifest root vẫn legacy (new-format path chưa từng chạy), 1 bug precedence"
output_summary:
  - "business_goal + SM đo được + non_goals"
done_when:
  - "SM đo được ở s08; non_goals rõ"
owner: "claude (draft) -> human (review cùng Spec gate s04)"
```

## Artifact Chính
```yaml
user_problem: >-
  Thêm harness mới hiện phải sửa code hardcode ["codex","claude"]; WIP adapter-registry đã
  viết phần lớn nhưng treo trong working tree: không test, new-format manifest chưa từng được
  kích hoạt, có bug precedence, và chặn mọi commit khác vào packages/workflow-bundle.
business_goal: >-
  wfc hỗ trợ harness qua adapter registry có test đầy đủ: thêm harness mới = thêm 1 thư mục
  adapters/<id>/adapter.json, không sửa code; hành vi hiện tại của người dùng bundle
  (install/update/sync codex+claude) không đổi.
success_metrics:
  - "SM-1: Unit test cover các hàm adapter mới (loadAdapter, listAvailableHarnesses, detectActiveHarness, getRuntimeConfigFromAdapter) + fallback legacy — chạy pass trong npm test"
  - "SM-2: Bug precedence normalizeInstallState có test tái hiện fail trước khi fix, pass sau khi fix (TDD)"
  - "SM-3: wfc bundle-smoke PASS với cả manifest legacy (hiện tại) và manifest new-format (fixture hoặc migrate thật — theo scope s04/s05 chốt)"
  - "SM-4: Không caller ngoài package bị đổi interface (shims + bin/wfc.js hoạt động nguyên trạng)"
  - "SM-5: wfc validate PASS; skill file giữ nguyên executable bit sau sync (guard side-effect chmod)"
non_goals:
  - "Thêm adapter cho harness thứ ba thực tế (Gemini/Zed...) — chỉ chứng minh bằng test fixture"
  - "Thực thi H-track (H1-H4) trong sdd-light plan — đó là governance layer riêng, đang pending human approval"
  - "Publish v2.2.0 (thuộc release lane)"
constraints:
  - "TDD bắt buộc (behavior change wfc); worktree riêng khi implement (chạm nhiều file, đụng release branch)"
  - "Backward compat legacy manifest là bất khả xâm phạm"
assumptions:
  - "WIP hiện tại giữ làm base (chất lượng đủ), viết test bọc trước khi sửa tiếp — xác nhận ở s05"
```

## Traceability
```yaml
upstream:
  - "harness-adapter-refactor.s01.restate.md"
next_step: "s03 Open Questions"
```

## Handoff
- User problem đã chốt: hardcode harness + WIP treo không test.
- Non-goals: không harness mới thật, không H-track, không publish.
- Điều kiện sang step 3: human review cùng Spec gate s04.
