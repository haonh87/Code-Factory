---
artifact_id: "sdd-light-authority-cutover.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "sdd-light-authority-cutover"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
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
spec_status: approved
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
  contract:
    - "po"
    - "developer"
  dor: []
  approach:
    - "developer"
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by:
    - "po"
    - "developer"
  contract_reviewed_at: "2026-07-20"
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-07-20"
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
  - "sdd-light-authority-cutover.s04.acceptance-criteria.md"
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
step_goal: "Chốt nội dung chính xác bổ sung vào 5 file authority + cách canary/rollback rehearsal; human pass Approach + Contract."
input_summary:
  - "s04 approved (Spec+DoR); AC-14/AC-15/AC-EXIT-1..4"
output_summary:
  - "Option analysis + đặc tả nội dung insert cho từng file"
done_when:
  - "Human pass Approach + Contract"
owner: "claude (draft) -> human (pass Approach + Contract)"
```

## Option Analysis
```yaml
options:
  - "OPT-A: Thêm 1 section 'Hard Rule: SDD Light Profile' tập trung trong AGENTS.global.md + section tương ứng ngắn gọn ở 4 file còn lại, trỏ về AGENTS.global.md làm nguồn chính"
  - "OPT-B: Viết đầy đủ chi tiết Light y hệt ở cả 5 file (duplicate toàn bộ rule)"
  - "OPT-C: Chỉ sửa router SKILL.md + work-item-materialization.md (nơi thực sự chạy), bỏ qua AGENTS.global.md/workflow-chain.md/spec-driven-development.md (coi là tài liệu tham khảo phụ)"
recommended_option: "OPT-A"
trade_offs:
  - "Chấp nhận: 4 file phụ chỉ có bản tóm tắt + link, không tự đứng độc lập hoàn toàn — đổi lấy tránh duplicate/drift giữa 5 file (rủi ro lớn nhất của authority multi-file là nội dung lệch nhau theo thời gian)"
  - "Loại OPT-B: duplicate 5 lần là chính xác loại rủi ro F-10 của plan đã cảnh báo (nguồn authority lệch nhau) — không chọn"
  - "Loại OPT-C: router SKILL.md đọc rule từ đâu nếu AGENTS.global.md không có? Report template của router cần trỏ đúng nguồn; bỏ qua AGENTS.global.md làm router thiếu authority gốc — không chọn"
```

### Option Details

**OPT-A — 1 nguồn chính + 4 tóm tắt trỏ về (recommended)**
- Summary: `AGENTS.global.md` chứa đầy đủ: eligibility matrix, hard escalation, physical note mapping, gate host contract, ready-bundle note. 4 file còn lại chỉ thêm đoạn ngắn "xem AGENTS.global.md § SDD Light Profile" + phần đặc thù riêng của chính nó (workflow-chain.md: chi tiết output template cho note Light; spec-driven-development.md: Spec Card schema; work-item-materialization.md: routing logic tại thời điểm materialize; router SKILL.md: bước router đọc `sdd_mode`+`sdd_light_profile` để chọn gate host map).
- Pros: 1 nguồn sự thật, đúng tinh thần F-10 của plan; dễ maintain, dễ audit AC-14.
- Cons: đọc 1 file phải nhảy sang AGENTS.global.md để hiểu đầy đủ — chấp nhận được vì đây vốn là entrypoint policy layer.
- Check before implement: đối chiếu từng đoạn insert với code T1-T7 thật (không bịa rule mới, chỉ document đúng cái đã implement).

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: ""
selected_stack: []
selected_runtime: []
decision_notes:
  - "Bổ sung policy/doc, không đổi stack/runtime"
```

## Artifact Chính
```yaml
recommended_approach: >-
  OPT-A. Nội dung cụ thể từng file (đối chiếu trực tiếp code T1-T7):

  1. AGENTS.global.md — thêm section mới "## Hard Rule: SDD Light Profile" ngay sau
     "Hard Rule: Spec/Design Before Code": eligibility conditions (brownfield,
     planning_track=quick, governance_profile=default, execution_mode=agentic,
     Foundation not_required, không contract/migration/regulated), hard escalation
     list, physical note mapping (s01 hosts s02/s03/classification; s04 hosts Spec+DoR;
     s06 hosts Option Analysis+Brownfield+Approach+Task Plan; s07 lazy tại ACTIVE;
     s08 lazy tại Verify), explicit preset chỉ là preference, Spec Card thay BRD/SRS.
     Thêm 1 dòng trong "Hard Rule: Human-Controlled Gates": ready-bundle vẫn tạo
     trusted receipt độc lập từng gate.

  2. workflow-chain.md — thêm subsection ngắn trỏ AGENTS.global.md + mô tả output
     template cụ thể cho s01/s04/s06 khi sdd_mode=light (đã có sẵn từ scaffold-workflow.js
     T3, chỉ cần document đúng field/block).

  3. spec-driven-development.md — thêm "Spec Card" như 1 nhánh song song BRD/SRS trong
     SDD Artifact Stack + Spec Lifecycle + ID Vocabulary (REQ/AC với provenance
     BASELINE|CR-###), trỏ template product-specs/templates/spec-card.template.md.

  4. work-item-materialization.md — thêm eligibility routing logic vào phần mô tả
     materialize flow: input classification (BUG/FEATURE/REFACTOR + defect_source) ->
     eligibility check -> selected_profile + escalation_reasons output.

  5. workflow-governance-router/SKILL.md — Step 3 (Determine Current Step) và Step 4
     (Check Missing Gates) thêm nhánh: nếu work item note có `sdd_mode: light`, áp
     gate host map Light (không check s05 physical note, check s04+s06 trusted receipt
     thay vào đó); Step 5 giữ nguyên invariant nhưng áp dụng đúng gate host.
why: >-
  Nhỏ nhất đủ đúng: 1 nguồn chính tránh drift (đúng bài học F-10); mọi nội dung đối
  chiếu trực tiếp code đã có test, không phát minh rule mới ở tầng authority.
boundaries:
  - "Chạm: đúng 5 file đã audit ở s04, additive only"
  - "Không chạm: nội dung full/strict hiện có trong cả 5 file"
risk_notes:
  - "Nếu đối chiếu phát hiện code T1-T7 có gap so với plan (vd router logic thật sự cần code mới, không chỉ doc) -> dừng, báo cáo, không tự ý mở rộng sang sửa code ngoài kế hoạch"
```

## Architecture Details
```yaml
domain_boundaries:
  - "AGENTS.global.md = authority gốc; 4 file còn lại = specialized reference trỏ về"
integration_points:
  - "wfc CLI (protocol, gate, validate) đọc rule từ chính code T1-T7 (đã đúng); authority docs chỉ mô tả cho HUMAN VÀ AGENT đọc, không phải nguồn thực thi runtime"
data_or_runtime_notes:
  - "sdd_light_profile=preview trong canary test — không đổi default cho work item khác"
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "5 file authority (~4666 dòng, ước tính bổ sung ~400-600 dòng mới)"
compatibility_risks:
  - "Regression toàn bộ work-items/ hiện có (100 file) là gate cứng trước merge"
migration_notes:
  - "Không có (bổ sung, không đổi cấu trúc cũ)"
rollback_notes:
  - "Revert merge commit; rehearsal trong worktree tạm trước khi merge thật"
```

## Traceability
```yaml
upstream:
  - "sdd-light-authority-cutover.s04.acceptance-criteria.md"
next_step: "s06 Task Plan"
```

## Handoff
- Recommended option: OPT-A — AGENTS.global.md là nguồn chính, 4 file trỏ về + phần đặc thù riêng.
- Trade-off chấp nhận: đọc đầy đủ Light phải nhảy sang AGENTS.global.md — chấp nhận để tránh drift.
- Điều kiện sang step 6: human pass Approach + Contract (duyệt cấu trúc nội dung ở trên).
- Deployment note khi có: không deploy — merge vào main, sdd_light_profile giữ preview/off.
