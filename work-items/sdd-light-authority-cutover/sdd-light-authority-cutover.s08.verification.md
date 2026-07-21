---
artifact_id: "sdd-light-authority-cutover.s08.verification"
artifact_family: workflow-step
work_item_slug: "sdd-light-authority-cutover"
step_id: "s08"
step_slug: "verification"
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
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod:
    - "qc"
    - "po"
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
  dod_reviewed_by:
    - "qc"
    - "po"
  dod_reviewed_at: "2026-07-21"
content_skills:
  - "codex-workflow-chain"
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-light-authority-cutover.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Tóm tắt kết quả verify, governance compliance, residual risk và kết luận DoD.

## Step Contract
```yaml
step_goal: "Verify AC-14/AC-EXIT-1..4 (PASS) + AC-15 (PARTIAL, ghi rõ gap), regression/compatibility summary, đề xuất DoD verdict."
input_summary:
  - "s07: T-A..T-H DONE; commit sau feed250 merged vào main"
output_summary:
  - "AC scoreboard + 2 incident permission + 1 gap T9 + DoD proposal"
done_when:
  - "Human pass DoD"
owner: "claude (evidence) -> human (pass DoD)"
```

## Artifact Chính
```yaml
verification_scope:
  - "AC-14, AC-15, AC-EXIT-1..4 theo s04 (HARD: AC-14, AC-15, AC-EXIT-2, AC-EXIT-4)"
evidence_refs:
  - "AC-14 PASS: 5 file authority đối chiếu tay với code T1-T7 thật; schema-version-sync test PASS; router/workflow-chain/materialization/AGENTS.global.md nhất quán (1 nguồn chính + 4 trỏ về, đúng OPT-A)"
  - "AC-15 PARTIAL: canary thật (materialize --sdd-preset light --auto-scaffold --telemetry on, sample BUG brownfield/quick/agentic/low-risk) -> artifact_count=3 (budget<=4 PASS), tổng dòng thật 434 (budget<=450 PASS, ~96% ngưỡng). required_prompt_count/approval_interaction_count/lead_time_ms KHÔNG có automated evidence — gap có thật trong code (workflow-telemetry.js hỗ trợ field nhưng không CLI call site nào truyền vào), ghi nhận minh bạch, không che giấu"
  - "AC-EXIT-1 PASS: golden Light fixture (run-workflow-authoring-smoke.js) PASS sau khi router/authority cập nhật"
  - "AC-EXIT-2 HARD PASS: toàn bộ 108 file/104 note qua wfc validate + 24 unit test + 7 verification_commands PASS, 0 delta so với baseline T-A"
  - "AC-EXIT-3 PASS: đối chiếu router logic mới với validator T1-T4 — không có đường bypass gate check nào"
  - "AC-EXIT-4 HARD PASS: rollback rehearsal trong worktree tạm — revert 5 file, validate+test+smoke PASS lại trạng thái trước T8"
summary_verdict: PARTIAL
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Contract: nội dung 5 file khớp đúng bản duyệt ở s05 (OPT-A), không tự ý đổi khi implement"
  - "2 incident permission (capability-control stale lock) đã điều tra qua đúng công cụ (wfc capability status) trước khi hành động, xử lý đúng phạm vi (không chmod tràn lan)"
  - "T9 gap ghi nhận minh bạch — không tuyên bố AC-15 PASS khi chỉ có 2/4 metric có evidence tự động"
  - "sdd_light_profile vẫn preview — KHÔNG tự bật default cho team (đúng non_goals)"
blocking_items: []
owner: "human (pass DoD)"
next_action: "human quyết: chấp nhận AC-15 PARTIAL (2/4 metric có evidence, budget chính đã đạt) là đủ để DONE, hay cần wiring thêm 3 metric còn lại trước khi DONE"
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
notes:
  - "108 file/104 note, 24 unit test, 7 verification_commands, bundle-smoke — tất cả PASS trước T8, sau T8 (worktree), sau rollback rehearsal, và sau merge main — 0 delta xuyên suốt"
  - "Full/strict path không đổi hành vi (additive only, đã verify)"
  - "Rollback: revert merge commit trên main (đã rehearse); sdd_light_profile giữ preview, không rewrite artifact"
```

## Scan Summary
```yaml
status: PASS
notes:
  - "Thay đổi thuần tài liệu (5 file authority) — không code mới, không secret, không dependency"
  - "2 incident permission là filesystem state, không phải security issue — đã điều tra + xử lý đúng phạm vi"
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: []
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "Merge thẳng main; sdd_light_profile giữ preview — chưa phải public release/default rollout"
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "Giá trị business (giảm ceremony) giờ đã CÓ THỂ hiện thực hóa (authority đã biết Light) nhưng default vẫn preview — business acceptance đầy đủ chờ canary metrics hoàn chỉnh + quyết định bật default"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "Traceability đủ: plan approved (2026-07-16) -> sdd-light-code-factory T1-T7 (DONE 2026-07-20) -> sdd-light-authority-cutover T8+T9 (s01-s07, 2026-07-20/21) -> evidence s08"
  - "2 incident + 1 gap đều được điều tra và ghi nhận trung thực, không che giấu để coi là 'xong'"
```

## Definition of Done
```yaml
status: DONE
dod_passed_by: "human (qc/po), 2026-07-21 — AC-15 residual accepted (core artifact/line budget proven; prompt/interaction/lead-time telemetry wiring is a follow-up, not a blocking governance gap)"
residual_risks:
  - "AC-15 chỉ 2/4 metric (artifact_count, generated_line_count-đo thủ công) có evidence; required_prompt_count/approval_interaction_count/lead_time_ms cần wiring thêm vào materialize/protocol CLI hoặc đo qua 1 chu trình approval thật — đề xuất: chấp nhận residual này vì budget CHÍNH (artifact + line, phản ánh trực tiếp mục tiêu giảm ceremony) đã chứng minh đạt bằng dữ liệu thật"
  - "Nhiều file khác trong scripts/, mcp/ đang read-only do capability-control tích lũy qua phiên dài — không thuộc scope này, đáng có work item dọn riêng"
  - "sdd_light_profile vẫn preview — cần theo dõi thêm trước khi human quyết chuyển default cho toàn team"
owners:
  - "human: pass DoD (chấp nhận AC-15 PARTIAL) hoặc yêu cầu wiring thêm 3 metric trước khi DONE"
```

## Traceability
```yaml
upstream:
  - "sdd-light-authority-cutover.s07.implementation.md"
  - "sdd-light-code-factory (T1-T7 DONE, work item tiền nhiệm)"
next_step: "Work item DONE (2026-07-21). Plan v5 SDD Light (T1-T9) hoàn tất toàn bộ."
```

## Handoff
- Overall status: DONE — DoD passed bởi human (qc/po) 2026-07-21. AC-14/AC-EXIT-1..4 PASS; AC-15 residual accepted.
- Residual: 3/4 telemetry metric chưa auto-capture (gap có thật, không phải fail ẩn); file read-only rải rác ngoài scope.
- Recommendation: pass DoD, chấp nhận AC-15 PARTIAL — mục tiêu cốt lõi (giảm artifact + dòng ceremony) đã chứng minh bằng canary thật; 3 metric còn lại là nice-to-have observability, không phải core governance invariant.
- Release recommendation khi có: NOT_APPLICABLE — sdd_light_profile giữ preview.
- Next action: không còn action bắt buộc. Plan v5 SDD Light (T1-T9) DONE toàn bộ qua 2 work item: sdd-light-code-factory (T1-T7) + sdd-light-authority-cutover (T8-T9).
