---
artifact_id: "sdd-light-authority-cutover.s01.restate"
artifact_family: workflow-step
work_item_slug: "sdd-light-authority-cutover"
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
step_goal: "Formalize T8+T9 (phần còn lại của plan v5 đã human-approved) thành work item riêng, tiếp nối sdd-light-code-factory (T1-T7 DONE)."
input_summary:
  - "docs/plans/sdd-light-code-factory-plan-review.md (approved 2026-07-16) — T8 (owner_role: maintainer), T9 (owner_role: maintainer)"
  - "sdd-light-code-factory DONE 2026-07-20: T1-T7 merged vào main, 24/24 test PASS, 7/7 verification_commands PASS"
  - "Quyết định 2026-07-20: human chọn làm T8+T9 ngay (không delay như OPT-A dự kiến ban đầu)"
output_summary:
  - "restated_request kế thừa plan; risk cao nhất của toàn bộ initiative"
done_when:
  - "Human confirm formalize đúng ý"
owner: "claude (draft) -> human (confirm)"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Đây là rủi ro cao nhất trong toàn bộ plan v5: T8 sửa authority layer (policies/codex/AGENTS.global.md 484 dòng, workflow-chain.md 3114 dòng, spec-driven-development.md 257 dòng, work-item-materialization.md 607 dòng, router SKILL.md 204 dòng — tổng 4666 dòng) điều khiển MỌI work item khác trong repo, kể cả các work item vừa DONE hôm nay (harness-adapter-refactor, claude-hooks-instincts-adoption, community-pack-i18n, sdd-light-code-factory)"
  - "5 file này VỪA được dịch sang tiếng Anh bởi community-pack-i18n (merge cùng ngày) — T8 phải cộng tác trên bản EN hiện tại, KHÔNG dùng bản tiếng Việt cũ trong plan review làm nguồn copy-paste"
  - "Default-enable (sdd_light_profile=off->default) là quyết định RIÊNG của human, không tự động — dù T8/T9 code xong"
required_reviews:
  - "s04-s06 review nhanh (kế thừa plan approved) nhưng s07 implement phải cực kỳ cẩn thận: mọi thay đổi phải additive, không phá vỡ full/strict path hiện có"
  - "Regression suite ĐẦY ĐỦ trên TOÀN BỘ work-items/ hiện có (100 files, 96 notes) sau khi sửa authority — không chỉ sample-sdd-item"
prohibited_actions:
  - "Không tự động chuyển sdd_light_profile sang default — chỉ preview, chờ canary + human quyết"
  - "Không xóa hoặc rewrite nội dung EN đã dịch — chỉ bổ sung rule Light, giữ nguyên phần full/strict"
open_governance_questions: []
```

## Artifact Chính
```yaml
raw_request: "Làm nốt T8+T9 của plan SDD Light ngay trong phiên này."
restated_request: >-
  Hoàn tất T8 (Authority, router và documentation cutover — bổ sung profile-aware
  gate host map, eligibility routing rule, Spec Card contract, canonical CR vocabulary
  vào 5 file authority nguồn hiện đã là tiếng Anh) và T9 phần còn lại (canary
  telemetry report, rollback rehearsal, changes/CHANGE-WFC-001 regression fixture),
  với regression đầy đủ trên toàn bộ work-items/ hiện có trước khi coi là DONE.
  Default-enable KHÔNG nằm trong scope — chỉ preview + evidence cho human quyết sau.
request_type: FEATURE
user_problem_initial: >-
  T1-T7 đã cung cấp code + validator cho SDD Light nhưng CHƯA CÓ AI dùng được qua
  flow thật vì authority layer (nơi router/protocol thực sự đọc rule) chưa biết
  về Light. Giá trị business (giảm ceremony) chưa hiện thực hóa.
business_context_initial: >-
  Đây là bước cuối cùng để SDD Light thực sự "sống" — nhưng cũng là bước rủi ro
  nhất vì sửa nguồn authority ảnh hưởng toàn bộ hệ thống governance.
scope_draft:
  in:
    - "T8: bổ sung rule Light vào 5 file authority (AGENTS.global.md, workflow-chain.md, spec-driven-development.md, work-item-materialization.md, router SKILL.md)"
    - "T9: canary report (chạy thử 1 work item mẫu qua Light preview), rollback rehearsal, CHANGE-WFC-001 regression fixture nếu cần"
    - "Regression đầy đủ: toàn bộ work-items/ hiện có + wfc validate + bundle-smoke + 24 unit test + 7 verification_commands"
  out:
    - "Chuyển sdd_light_profile sang default (quyết định riêng của human, không tự động)"
    - "Đổi/xóa nội dung EN đã dịch của community-pack-i18n ngoài phần cần bổ sung Light"
constraints_initial:
  - "5 file authority nguồn hiện là tiếng Anh (i18n mới merge) — mọi bổ sung phải viết bằng tiếng Anh, khớp văn phong hiện có"
  - "Additive only — không rewrite cấu trúc hiện có của full/strict path"
assumptions_initial:
  - "T1-T7 code (validator, gate host map logic) đã đúng và có test — T8 chỉ cần DOCUMENT đúng rule đã implement, không cần sửa code T1-T7 nữa (trừ khi phát hiện gap khi đối chiếu)"
open_questions_initial:
  - "OQ-1: Router SKILL.md (workflow-governance-router) hiện có tự detect sdd_mode=light từ work item note không, hay cần thêm logic mới?"
  - "OQ-2: Canary 'chạy thử' nghĩa là tạo 1 work item thật với sdd_light_profile=preview, hay chỉ chạy lại authoring-smoke fixture đã có?"
dependencies_initial:
  - "sdd-light-code-factory (T1-T7, DONE 2026-07-20) — code/validator nguồn để đối chiếu khi viết authority doc"
risks_initial:
  - "Sai sót ở authority layer ảnh hưởng MỌI work item khác — cần regression toàn diện trước khi merge"
  - "5 file lớn (4666 dòng tổng) — dễ bỏ sót chỗ cần update nếu không đọc kỹ"
notes_for_step_2: "Business goal + SM lấy từ AC-14/AC-15 + exit_criteria của plan."
```

## Traceability
```yaml
source_inputs:
  - "docs/plans/sdd-light-code-factory-plan-review.md (T8, T9, release_phases R0-R5)"
  - "work-items/sdd-light-code-factory/ (T1-T7 DONE)"
next_step: "s02 Business Goal"
```

## Handoff
- Điều đã rõ: T8/T9 là phần rủi ro cao nhất, 5 file authority đã là EN, phải additive.
- Điều còn cần theo dõi: OQ-1 (router auto-detect), OQ-2 (định nghĩa canary) cần resolve ở s03.
- Điều kiện sang step 2: human confirm restated_request.
