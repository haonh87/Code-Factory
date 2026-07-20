---
artifact_id: "sdd-light-code-factory.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "sdd-light-code-factory"
step_id: "s05"
step_slug: "technical-approach"
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-light-code-factory.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Tóm tắt option được khuyến nghị, trade-off và boundary kỹ thuật cần giữ.

## Step Contract
```yaml
step_goal: "Chốt OQ-1: tách work item (T1-T7 = scope này, T8/T9 = work item kế tiếp) hay làm trọn 9 task; human pass Approach."
input_summary:
  - "s04 Spec+DoR (chờ pass); AC-01..AC-13 PASS, AC-14/AC-15 HARD chưa đạt vì T8/T9"
output_summary:
  - "Option analysis OQ-1 + brownfield impact"
done_when:
  - "Human pass Approach (kiêm quyết OQ-1)"
owner: "claude (draft) -> human (pass Approach)"
```

## Option Analysis
```yaml
options:
  - "OPT-A: Tách — chốt scope work item này = T1-T7 (đã DONE, có evidence); mở work item riêng cho T8+T9 sau"
  - "OPT-B: Làm trọn — tiếp tục ngay T8 (authority cutover) + T9 (rollout) trong cùng work item này"
  - "OPT-C: Giữ nguyên uncommitted — không formalize, để nguyên trong worktree chờ quyết định sau"
recommended_option: "OPT-A"
trade_offs:
  - "Chấp nhận: work item này KHÔNG đạt AC-14/AC-15 (T8/T9) — nhưng T1-T7 tự đứng được vì sdd_light_profile chưa cutover vào authority thật, không ảnh hưởng workflow đang chạy cho work item khác"
  - "Loại OPT-B: T8 sửa policies/codex/AGENTS.global.md + router + workflow-chain.md — authority layer điều khiển MỌI work item khác trong repo, bao gồm 2 work item vừa DONE trong chính session này (harness-adapter-refactor, claude-hooks-instincts-adoption). Làm vội trong cùng phiên, cùng lúc với nhiều thay đổi khác, là rủi ro không cần thiết. T9 cần canary/rollback rehearsal thật — không hợp lý ép vào cùng batch với T1-T7"
  - "Loại OPT-C: để nguyên uncommitted 2160 dòng là đúng loại rủi ro mà 'dọn worktree' ban đầu muốn giải quyết — mất governance trail, dễ conflict, dễ mất nếu worktree bị xóa nhầm"
```

### Option Details

**OPT-A — Tách scope (recommended)**
- Summary: track evidence T1-T7 chính thức, commit vào 1 nhánh/worktree riêng, đưa qua review + DoD cho ĐÚNG phần đã hoàn thành; mở work item mới (vd `sdd-light-authority-cutover`) cho T8+T9 khi human sẵn sàng.
- Pros: DoD trung thực (không tuyên bố xong cái chưa xong); T8/T9 được xử lý với đủ thời gian + review riêng cho phần rủi ro cao nhất; T1-T7 giá trị (code + test) không bị treo vô thời hạn.
- Cons: cần quyết định thêm 1 work item mới; sdd_light chưa "sống" thật (chưa cutover) nên giá trị business chưa hiện thực hóa ngay.
- Check before implement: xác nhận T1-T7 KHÔNG có phụ thuộc ẩn vào T8 (đã kiểm: authority files 0 diff, nghĩa là T1-T7 hoàn toàn độc lập code-wise).

**OPT-B — Làm trọn ngay**
- Summary: tiếp tục T8+T9 ngay trong work item này.
- Pros: đạt full AC-01..AC-15 trong 1 lần.
- Cons: rủi ro cao nhất của cả plan (authority cutover) bị dồn chung với nhiều việc khác đã làm trong phiên; T9 cần canary thật (không chỉ code) — không nên rush.

**OPT-C — Giữ nguyên uncommitted**
- Summary: không làm gì thêm, để nguyên worktree.
- Pros: không risk gì thêm ngay lập tức.
- Cons: đúng loại "việc dở dang không governance trail" mà session này đang cố dọn; mất traceability, rủi ro mất việc nếu worktree bị xóa.

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: ""
selected_stack: []
selected_runtime: []
decision_notes:
  - "T1-T7 là additive tooling trong package hiện có, không đổi stack/runtime"
```

## Artifact Chính
```yaml
recommended_approach: >-
  OPT-A: track T1-T7 trong worktree riêng (đổi tên từ sdd-light-t1 hoặc worktree mới sạch),
  review 2 tầng, commit theo task, verify bằng test suite + 7 verification_commands đã có,
  merge vào main khi DoD pass cho ĐÚNG scope T1-T7. Mở work item riêng cho T8+T9 sau.
why: >-
  Nhỏ nhất đủ đúng: ghi nhận đúng giá trị đã tạo ra (T1-T7, có evidence), không ép DoD lên
  phần chưa xong, cô lập rủi ro cao nhất (authority cutover) sang chu trình riêng có đủ thời
  gian review.
boundaries:
  - "Chạm: 21 file modified + 2 file mới (T1-T7) + ~22 test file tương ứng (loại 2 file T9: workflow-telemetry.js + test — quyết ở s06 có gộp vào T1-T7 batch hay để dành T9 work item sau)"
  - "Không chạm: T8 files (policies/codex/AGENTS.global.md, workflow-chain.md, spec-driven-development.md, work-item-materialization.md, router SKILL.md)"
risk_notes:
  - "workflow-telemetry.js (T9) không phụ thuộc T8 — có thể gộp vào batch T1-T7 nếu test đã pass độc lập (quyết ở s06)"
  - "cr-aggregate-reconcile.js (T7) mới, cần track cẩn thận theo TDD discipline dù test đã pass (viết trước hay sau cần làm rõ ở s07)"
```

## Architecture Details
```yaml
domain_boundaries:
  - "SDD/planning/change definitions (schema, profile, eligibility) tách khỏi authority layer (T8) — đúng ranh giới OPT-A"
integration_points:
  - "wfc CLI (validate:workflow:sdd|change|governance|protocol|planning|authoring-smoke) tiêu thụ các định nghĩa T1-T7"
data_or_runtime_notes:
  - "sdd_light_profile mặc định vẫn off/preview — không ai dùng qua flow thật cho tới T8"
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "packages/workflow-bundle/scripts/ (~15 file T1-T7) + packages/workflow-bundle/test/ (~22 file)"
  - "product-specs/templates/spec-card.template.md (mới)"
compatibility_risks:
  - "Legacy CHANGE-001 dual-read đã verify PASS; strict/full fixture đã verify PASS qua 7 verification_commands"
migration_notes:
  - "Không migration bắt buộc cho T1-T7 (chưa cutover); T8 sẽ cần migration authority khi làm"
rollback_notes:
  - "T1-T7 không cutover -> rollback = revert commit, 0 side effect lên workflow đang chạy"
```

## Traceability
```yaml
upstream:
  - "sdd-light-code-factory.s04.acceptance-criteria.md"
next_step: "s06 Task Plan"
```

## Handoff
- Recommended option: OPT-A tách scope — T1-T7 (+ T9 telemetry nếu độc lập) là scope work item này; T8+T9 còn lại mở work item riêng.
- Trade-off chấp nhận: work item này không đạt AC-14/AC-15 — ghi rõ là out-of-scope theo quyết định, không phải fail ẩn.
- Điều kiện sang step 6: human pass Approach (= chốt OQ-1 = OPT-A).
- Deployment note khi có: không deploy/cutover trong scope này.
