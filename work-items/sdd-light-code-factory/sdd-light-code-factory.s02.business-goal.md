---
artifact_id: "sdd-light-code-factory.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "sdd-light-code-factory"
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
  - "sdd-light-code-factory.s01.restate.md"
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
step_goal: "Kế thừa business goal + success metrics từ plan đã duyệt (Baseline Và Mục Tiêu Định Lượng)."
input_summary:
  - "s01 confirmed; plan doc section 'Baseline Và Mục Tiêu Định Lượng' + 15 AC (AC-01..AC-15)"
output_summary:
  - "business_goal + SM đo được (= budget trong plan, đã là acceptance gate) + non_goals (= scope_guards)"
done_when:
  - "SM khớp đúng budget đã duyệt, không tự thêm/bớt"
owner: "claude (kế thừa từ plan) -> human (review cùng Spec gate s04)"
```

## Artifact Chính
```yaml
user_problem: >-
  Track workflow đầy đủ (8 note, BRD/SRS, 7-file CR) tạo ceremony quá nặng cho work item quick/nhỏ,
  nhưng rút gọn không kỷ luật sẽ làm yếu freeze, trusted approval, review timing và traceability.
business_goal: >-
  Vận hành hóa SDD Light thành profile có eligibility router rõ ràng, giảm >=60% artifact
  authoring ban đầu, giữ s07 review evidence đúng thời điểm (không hậu kiểm), và chuẩn hóa
  CR theo compact/full mà không regression strict/full hoặc legacy data.
success_metrics:
  - "SM-1 (=budget): Light không CR tạo 4 artifact ban đầu, tối đa 6 khi hoàn tất (AC-02)"
  - "SM-2 (=budget): Generated artifact <=450 dòng + <=20 required prompt trước implement; <=600 dòng khi hoàn tất, chưa tính CR (AC-03)"
  - "SM-3: Router trả eligibility + auto-escalate mọi hard trigger với reason testable (AC-01)"
  - "SM-4: s07 tạo khi ACTIVE, s08 tạo khi Verify; thiếu evidence thì không finalize (AC-05)"
  - "SM-5: CR chỉ ACCEPTED khi aggregate coverage toàn bộ required linked work item pass (AC-10)"
  - "SM-6: Strict/full fixtures giữ nguyên hành vi, không silent-skip invariant (AC-13)"
  - "SM-7: Authority source, router, workflow-chain và installed-copy version đồng bộ (AC-14) — THUỘC T8, CHƯA ĐẠT"
non_goals:
  - "Thêm SDD mode mới hoặc đổi 8 logical step (scope_guards)"
  - "Đưa Foundation-required, public contract, migration/cutover hoặc regulated flow vào Light"
  - "Đổi physical root changes/ trong increment đầu"
  - "Xóa legacy reader cùng release với canonical cutover"
  - "Redesign strict/full template ngoài phần cần cho compatibility"
constraints:
  - "Budget là acceptance gate, không phải số tham khảo (chốt từ plan)"
assumptions:
  - "T1-T7 evidence (test + verification commands) đủ tin cậy để coi các AC tương ứng đã đạt kỹ thuật; DoD toàn work item vẫn chờ T8/T9"
```

## Traceability
```yaml
upstream:
  - "sdd-light-code-factory.s01.restate.md"
next_step: "s03 Open Questions"
```

## Handoff
- User problem đã chốt: ceremony nặng vs governance kỷ luật, đã có lời giải đã duyệt.
- Non-goals: đúng scope_guards của plan, không tự mở rộng.
- Điều kiện sang step 3: human review cùng Spec gate s04.
