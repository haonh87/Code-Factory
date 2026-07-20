---
artifact_id: "harness-adapter-refactor.s01.restate"
artifact_family: workflow-step
work_item_slug: "harness-adapter-refactor"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: REFACTOR
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Tóm tắt yêu cầu, phạm vi ban đầu, ràng buộc và governance context mở đầu.

## Step Contract
```yaml
step_goal: "Làm rõ scope hoàn tất WIP harness-adapter: manifest format content+harnesses, sync theo adapter; đủ để sang s02."
input_summary:
  - "WIP hiện có: 3 file modified (sync-workflow-bundle-runtime.js, workflow-bundle-cli.js, workflow-bundle-utils.js) + untracked adapters/claude/, adapters/codex/adapter.json"
  - "Research liên quan: docs/research/harness-engineering-2026.md, docs/plans/ (untracked)"
output_summary:
  - "restated_request + scope in/out + constraints + OQ ban đầu"
done_when:
  - "Human confirm restated_request + scope_draft"
owner: "claude (draft) -> human (confirm)"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes, human approves"
  - "TDD Cho Behavior Change: parsing manifest format mới + fallback legacy là behavior change của wfc -> TDD bắt buộc ở s07"
required_reviews:
  - "Spec + DoR (s04), Approach (s05), Task Plan (s06), DoD (s08)"
prohibited_actions:
  - "Không commit WIP hiện tại trước khi work item mở implementation path"
open_governance_questions:
  - "Format manifest mới có phải public contract của bundle (ảnh hưởng người dùng wfc ngoài repo) không? Nếu có -> Contract gate = required"
```

## Artifact Chính
```yaml
raw_request: "Hoàn tất refactor harness-adapter đang dở trong working tree: sync runtime theo adapters/<harness>/adapter.json, manifest format mới content+harnesses, giữ tương thích format cũ."
restated_request: >-
  Đưa WIP harness-adapter thành change hoàn chỉnh: wfc sync/bundle đọc danh sách harness từ
  adapters/ registry thay vì hardcode ["codex","claude"], hỗ trợ manifest format mới
  (content + harnesses) với fallback legacy, chmod fix cho file copy từ source read-only;
  có test cho cả 2 format, bundle-smoke pass, và không phá install/update path hiện có.
request_type: REFACTOR
user_problem_initial: >-
  Thêm harness mới (vd Gemini, Zed) hiện phải sửa code hardcode; WIP đã bắt đầu giải nhưng
  đang treo trong working tree không test, chặn cả việc commit các thay đổi khác vào
  packages/workflow-bundle.
business_context_initial: "Bundle là public release (v2.2.0 sắp tới) — adapter registry là nền cho mở rộng multi-harness."
scope_draft:
  in:
    - "Hoàn tất + test 3 file scripts đang modified; adapters/claude/, adapters/codex/adapter.json"
    - "Backward compat: manifest legacy (top-level mode key) vẫn hoạt động"
    - "Cập nhật docs bundle nếu format mới là public surface"
  out:
    - "Thêm harness mới thực tế (Gemini/Zed...) — chỉ làm registry, không làm adapter mới"
    - "Publish v2.2.0 (thuộc release lane)"
constraints_initial:
  - "wfc bundle-smoke + validate PASS; TDD cho parsing/fallback behavior"
  - "Không đổi CLI surface hiện có (install/update/sync giữ nguyên interface)"
assumptions_initial:
  - "WIP hiện tại là hướng đúng đã được nghĩ trước (docs/plans) — cần đối chiếu trước khi viết tiếp"
open_questions_initial:
  - "OQ-1: docs/plans/ có spec/design đã viết cho adapter format chưa? Mức độ hoàn thiện WIP tới đâu?"
  - "OQ-2: manifest format mới có cần Contract gate (public surface của bundle)?"
  - "OQ-3: WIP giữ nguyên làm base hay stash/reset viết lại theo TDD từ đầu?"
dependencies_initial:
  - "Merge target: branch release/v2.2.0"
  - "Đụng cùng file với mọi thay đổi packages/workflow-bundle khác -> làm trong worktree riêng (change nhiều file, risk trung bình)"
risks_initial:
  - "WIP chưa test — parsing sai làm hỏng install/update của người dùng bundle"
  - "Fallback legacy sai -> break repo đang dùng manifest cũ"
notes_for_step_2: "Success metric: thêm harness mới = thêm 1 adapter.json không sửa code; cả 2 format manifest đều pass smoke."
```

## Traceability
```yaml
source_inputs:
  - "git diff packages/workflow-bundle/scripts/ (WIP)"
  - "docs/research/harness-engineering-2026.md"
next_step: "s02 Business Goal"
```

## Handoff
- Điều đã rõ: WIP tồn tại + hướng adapter registry; merge target release/v2.2.0; TDD bắt buộc.
- Điều còn cần theo dõi: OQ-1 (đối chiếu docs/plans) quyết định s05 nhanh hay chậm; OQ-3 (giữ WIP hay viết lại).
- Điều kiện sang step 2: ĐÃ ĐẠT — human confirm 2026-07-20.
