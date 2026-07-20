---
artifact_id: "sdd-light-code-factory.s01.restate"
artifact_family: workflow-step
work_item_slug: "sdd-light-code-factory"
step_id: "s01"
step_slug: "restate"
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
step_goal: "Formalize plan đã human-approved (docs/plans/sdd-light-code-factory-plan-review.md, revision 5, approved 2026-07-16) thành work item canonical; thừa kế approval đã có, không tái duyệt từ đầu."
input_summary:
  - "docs/plans/sdd-light-code-factory-plan-review.md — revision 5, status: approved, approval: approved-by-human, reviewer: Hao Nguyen Huu, 2026-07-16"
  - "Plan note: 'Human đã duyệt nguyên revision 5 theo Option B (lazy five-checkpoint) và mở s07 Implement... S07 chạy trong worktree sdd-light-t1, bắt đầu từ T1'"
  - "Điều tra 2026-07-20: worktree sdd-light-t1 có ~2160 dòng uncommitted trên 23 file + 24 test file mới; 23/23 test PASS; cả 7 verification_commands của plan PASS"
output_summary:
  - "restated_request + scope in/out kế thừa từ plan; risk ban đầu"
done_when:
  - "Human confirm việc formalize đúng ý (không đổi nội dung plan đã duyệt)"
owner: "claude (draft, dựa trên plan đã duyệt) -> human (confirm formalize)"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes, human approves — ĐÃ thỏa qua approval trong chính plan document (không phải suy diễn từ artifact tồn tại sẵn theo rule cấm, vì đây là approval tường minh ghi rõ reviewer + ngày + checklist tick)"
  - "Plan này TỰ THÂN là governance overhaul: sửa authority layer (AGENTS.global.md), router, protocol, validator — rủi ro cao nhất trong toàn bộ session"
  - "T8 (authority/router/docs cutover) là maintainer-owned, chưa bắt đầu — không được tự ý làm nếu chưa có chỉ đạo rõ"
required_reviews:
  - "Plan review: ĐÃ PASS (xem Definition of Plan Approval trong plan doc, toàn bộ 15 checkbox đã tick)"
  - "s07 evidence: cần audit trung thực T1-T9 (agent tự làm, không suy diễn done)"
  - "s08 DoD: chỉ pass khi T8 cutover + T9 rollout có evidence hoặc scope được thu hẹp tường minh"
prohibited_actions:
  - "Không tự ý làm T8 (sửa policies/codex/AGENTS.global.md, workflow-chain.md, router SKILL.md) mà không có chỉ đạo — đây là authority layer điều khiển toàn bộ workflow"
  - "Không tự tuyên bố DoD khi T8/T9 chưa xong hoặc chưa có quyết định thu hẹp scope"
open_governance_questions:
  - "T8 + phần còn lại của T9 (canary, rollback rehearsal) có làm tiếp trong work item này không, hay tách work item riêng và chốt T1-T7 là scope DONE?"
```

## Artifact Chính
```yaml
raw_request: "Mở work item chính thức s01->s08 cho phần việc SDD Light đang nằm uncommitted trong worktree sdd-light-t1."
restated_request: >-
  Formalize triển khai SDD Light (revision 5 plan, đã human-approved 2026-07-16) thành work item
  canonical trong work-items/. Plan tự thân đã đóng vai trò s01-s06 (business goal, option analysis,
  technical approach, task plan T1-T9) và đã được duyệt tường minh. Việc còn lại: (1) audit trung
  thực T1-T9 đã làm tới đâu bằng evidence chạy thật, (2) ghi s07 implementation ledger, (3) human
  quyết định scope s08 — hoàn tất T8/T9 hay chốt DONE ở T1-T7 và tách phần còn lại.
request_type: FEATURE
user_problem_initial: >-
  Code-Factory hiện chỉ có 1 track workflow đầy đủ (8 note, BRD/SRS, 7-file CR package) — quá nặng
  cho work item nhỏ/quick. SDD Light giảm ceremony nhưng vẫn giữ đủ invariant governance (freeze,
  trusted approval, review timing, traceability, backward compatibility).
business_context_initial: >-
  Plan đã định lượng: giảm 8 note xuống 3 (khởi tạo)/5 (hoàn tất), giảm 1269 dòng scaffold xuống
  <=450 dòng trước implement, giảm CR package 7 file xuống 1 file (compact). Đây là thay đổi vận
  hành cốt lõi của chính hệ thống workflow, không phải feature nghiệp vụ thông thường.
scope_draft:
  in:
    - "T1-T7 đã implement trong worktree sdd-light-t1 (eligibility router, Spec Card, compact scaffold, profile-aware gate/protocol, materializer routing, compact CR, CR aggregate reconciliation)"
    - "T9 phần đã làm (telemetry) — audit và ghi nhận"
    - "Quyết định của human về T8 + phần còn lại T9"
  out:
    - "Tự ý viết thêm code cho T8/T9 khi chưa có chỉ đạo (xem prohibited_actions)"
    - "Đổi nội dung plan đã duyệt (chỉ formalize, không re-litigate quyết định đã tick)"
constraints_initial:
  - "Không đổi physical root changes/ trong increment đầu (theo scope_guards của plan)"
  - "Strict/full và legacy CHANGE-001 phải giữ nguyên hành vi (đã verify: warning dual-read đúng thiết kế, không phải lỗi)"
  - "Không tự động ACCEPT CR từ một work item hoặc chỉ từ VERIFIED (BR-05)"
assumptions_initial:
  - "23/23 test pass + 7/7 verification command pass là evidence đủ tin cậy cho T1-T7, không cần viết lại từ đầu"
  - "T8 là điểm rủi ro cao nhất — sửa authority layer ảnh hưởng MỌI work item khác trong repo, kể cả các work item vừa DONE trong session này"
open_questions_initial:
  - "OQ-1: Có làm T8+T9 tiếp trong work item này không, hay tách work item riêng?"
  - "OQ-2: Nếu tách, T1-T7 có đủ điều kiện DoD độc lập không (Light hoạt động nhưng chưa cutover authority = chưa ai dùng được qua router thật)?"
dependencies_initial:
  - "Không phụ thuộc 2 work item vừa DONE (harness-adapter-refactor, claude-hooks-instincts-adoption) — khác file, khác layer"
risks_initial:
  - "T8 sửa AGENTS.global.md/workflow-chain.md/router SKILL — nếu sai có thể phá vỡ toàn bộ gate hiện hành của mọi work item khác"
  - "T9 cần canary + rollback rehearsal thật (không chỉ code) — cần môi trường thử nghiệm, không chỉ unit test"
notes_for_step_2: "Business goal + success metrics lấy trực tiếp từ 'Baseline Và Mục Tiêu Định Lượng' + AC-01..AC-15 của plan, không tự nghĩ lại."
```

## Traceability
```yaml
source_inputs:
  - "docs/plans/sdd-light-code-factory-plan-review.md (approved 2026-07-16)"
next_step: "s02 Business Goal"
```

## Handoff
- Điều đã rõ: plan đã duyệt đầy đủ; T1-T7 có evidence chạy thật (test + verification commands); T8 chưa đụng; T9 partial.
- Điều còn cần theo dõi: OQ-1/OQ-2 (scope s08) cần human quyết trước khi implement thêm.
- Điều kiện sang step 2: human confirm restated_request đúng ý (formalize, không đổi nội dung đã duyệt).
