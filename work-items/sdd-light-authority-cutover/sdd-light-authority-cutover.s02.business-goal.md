---
artifact_id: "sdd-light-authority-cutover.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "sdd-light-authority-cutover"
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
  - "sdd-light-authority-cutover.s01.restate.md"
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
step_goal: "Kế thừa SM từ plan (AC-14, AC-15, exit_criteria)."
input_summary:
  - "s01 confirmed; plan T8/T9 outputs_expected + exit_criteria"
output_summary:
  - "business_goal + SM + non_goals"
done_when:
  - "SM khớp đúng AC-14/AC-15 + exit_criteria, không tự thêm"
owner: "claude (kế thừa plan) -> human (review Spec gate s04)"
```

## Artifact Chính
```yaml
user_problem: >-
  T1-T7 cung cấp code/validator cho SDD Light nhưng authority layer (nơi router/protocol
  thật sự đọc rule khi vận hành) chưa biết Light tồn tại — không ai dùng được qua flow thật.
business_goal: >-
  Authority source (AGENTS.global.md, workflow-chain.md, spec-driven-development.md,
  work-item-materialization.md, router SKILL.md) mô tả đầy đủ, chính xác rule Light đã
  implement ở T1-T7; canary evidence chứng minh đạt budget; rollback rehearsal khả thi;
  KHÔNG tự động bật default cho toàn team.
success_metrics:
  - "SM-1 (=AC-14): authority source, router, workflow-chain, installed-copy version đồng bộ — schema-version-sync test PASS + đối chiếu nội dung tay"
  - "SM-2 (=AC-15): preview/canary metrics chứng minh đạt artifact/prompt/interaction/lead-time budget (đo thật qua 1 work item mẫu chạy preview)"
  - "SM-3 (=exit_criteria): 100% eligibility/escalation golden fixture pass"
  - "SM-4 (=exit_criteria): strict/full/legacy fixture pass không đổi expected behavior (regression toàn bộ 100 file work-items/ hiện có)"
  - "SM-5 (=exit_criteria): không silent skipped invariant trong compact profile"
  - "SM-6 (=exit_criteria): CR multi-work-item mismatch bị phát hiện trước ACCEPTED (đã có từ T7, chỉ re-verify)"
  - "SM-7 (=exit_criteria): rollback rehearsal pass, không release blocker"
non_goals:
  - "Chuyển sdd_light_profile sang default cho team (quyết định riêng của human, không tự động — dù T8/T9 code xong)"
  - "Đổi/xóa nội dung EN đã dịch bởi community-pack-i18n ngoài phần bổ sung Light"
  - "Redesign authority layer ngoài phạm vi Light (không chạm rule full/strict hiện có)"
constraints:
  - "Additive only trên 5 file authority; regression toàn bộ work-items/ hiện có là gate cứng"
assumptions:
  - "T1-T7 code đã đúng (có test) — T8 chỉ document đúng, không sửa lại logic T1-T7 trừ khi phát hiện gap khi đối chiếu"
```

## Traceability
```yaml
upstream:
  - "sdd-light-authority-cutover.s01.restate.md"
next_step: "s03 Open Questions"
```

## Handoff
- User problem đã chốt: authority chưa biết Light tồn tại.
- Non-goals: không tự bật default, không đổi nội dung EN ngoài phần cần.
- Điều kiện sang step 3: human review cùng Spec gate s04.
