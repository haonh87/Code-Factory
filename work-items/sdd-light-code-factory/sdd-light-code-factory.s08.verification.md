---
artifact_id: "sdd-light-code-factory.s08.verification"
artifact_family: workflow-step
work_item_slug: "sdd-light-code-factory"
step_id: "s08"
step_slug: "verification"
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
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-light-code-factory.s07.implementation.md"
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
step_goal: "Verify AC-01..AC-13 (scope T1-T7), regression/compatibility summary, đề xuất DoD verdict cho ĐÚNG scope đã chốt ở s05 (OPT-A)."
input_summary:
  - "s07: T-1..T-6 DONE; commit 87a7f79+a999b09 merged vào main (0e44c60)"
output_summary:
  - "AC scoreboard 13/13 (scope) + 2 AC out-of-scope ghi rõ + DoD proposal"
done_when:
  - "Human pass DoD"
owner: "claude (evidence) -> human (pass DoD)"
```

## Artifact Chính
```yaml
verification_scope:
  - "AC-01..AC-13 theo s04 (scope T1-T7 + telemetry). AC-14/AC-15 KHÔNG thuộc scope (T8/T9, xem s05 OPT-A)"
evidence_refs:
  - "AC-01 PASS: eligibility router + hard-escalation matrix — golden + negative fixture (run-workflow-authoring-smoke.js) PASS"
  - "AC-02 PASS: Light compact tạo 4 artifact ban đầu / tối đa 6 hoàn tất — scaffold-workflow (Light compact) test PASS"
  - "AC-03 PASS: budget dòng/prompt — assertion trong golden fixture PASS"
  - "AC-04 PASS: Spec Card semantic validation — 18 test case (1 valid + 15 negative + 2 regression strict) PASS"
  - "AC-05 PASS: lazy s07/s08 + no-premature-s08 — work-item-protocol (Light) test PASS"
  - "AC-06 PASS: gate host map (s04 Spec/DoR, s06 Approach/Task Plan, Foundation->full) — workflow-gate-evidence (Light) test PASS"
  - "AC-07 PASS: ready bundle 4 receipt độc lập — approve-ready-bundle test PASS"
  - "AC-08 PASS: classification BUG/FEATURE/spec-delta — materialize-work-item (Light routing) test PASS"
  - "AC-09 PASS: compact CR 1 file / full CR giữ package — scaffold-change-package (compact CR) test PASS"
  - "AC-10 PASS: CR aggregate coverage toàn bộ required work item — T7 aggregate reconciliation test PASS (waiver, no-self-accept)"
  - "AC-11 PASS: atomic ACCEPTED spec bump — T7 atomic bump test PASS"
  - "AC-12 PASS: canonical CR/cr_* + dual-read legacy — change-item-utils dual-read test PASS + validate:workflow:change trên CHANGE-001 thật (warning đúng thiết kế)"
  - "AC-13 PASS: strict/full/legacy không regression — 7/7 verification_commands PASS trên main sau merge, kể cả trước/sau dọn stale build artifact"
  - "AC-14 OUT_OF_SCOPE: authority source chưa sync — T8 chưa làm, ghi nhận rõ ràng, không phải fail"
  - "AC-15 OUT_OF_SCOPE: canary/rollback rehearsal chưa có — T9 phần còn lại, ghi nhận rõ ràng, không phải fail"
summary_verdict: PASS
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "13/13 AC trong scope PASS có evidence tái lập được (24/24 test + 7/7 verification_commands, chạy lại nhiều lần: worktree mới, sau merge main)"
  - "2 AC ngoài scope (HARD) ghi minh bạch — không tuyên bố DoD toàn bộ plan v5, chỉ DoD cho T1-T7"
  - "Regression: strict/full/legacy CHANGE-001 giữ nguyên hành vi qua toàn bộ quá trình"
  - "Incident bundle-smoke ENOTEMPTY đã điều tra root cause trước khi hành động, không phải guess-and-fix"
blocking_items: []
owner: "human (pass DoD)"
next_action: "human chốt DoD cho scope T1-T7; quyết định thời điểm mở work item T8+T9"
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
notes:
  - "T1-T7 chưa cutover vào authority (T8) -> sdd_light_profile mặc định không đổi, không ảnh hưởng work item khác đang chạy full/strict"
  - "Legacy CHANGE-001 dual-read + warning verify PASS nhiều lần qua toàn bộ quá trình merge"
  - "Rollback: revert 2 commit (87a7f79 + a999b09) merge vào main; T1-T7 chưa cutover nên rollback 0 side effect"
```

## Scan Summary
```yaml
status: PASS
notes:
  - "cr-aggregate-reconcile.js (core mới) đã review kỹ: atomic bump, no-self-accept, waiver rõ ràng, không side channel bypass"
  - "sync-workflow-bundle-runtime.js merge giữ đúng 2 luồng logic (adapter registry + schema version), không mất tính năng bên nào"
  - "Không secret, không network call mới, không dependency mới"
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "T1-T7 là internal tooling, chưa cutover; UAT thật sự (nếu cần) thuộc phạm vi T9 rollout"
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "Không tag/release riêng cho work item này — đã merge thẳng main, chưa cutover authority nên chưa phải 'release' theo nghĩa public"
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "Giá trị business (giảm ceremony) chỉ hiện thực hóa sau T8 cutover — chưa tới điểm business acceptance"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "Traceability đủ: plan approved (2026-07-16) -> work item formalize (s01-s06, 2026-07-20) -> T-1..T-6 implement/merge (s07) -> evidence (s08)"
  - "Scope split OPT-A giữ nguyên kỷ luật: không tự làm T8/T9 khi chưa có chỉ đạo, không tuyên bố DoD vượt scope đã chốt"
```

## Definition of Done
```yaml
status: PARTIAL
residual_risks:
  - "T8 (authority/router/docs cutover) chưa làm — là work item riêng, rủi ro cao nhất của toàn plan (ảnh hưởng mọi work item khác)"
  - "T9 phần còn lại (canary, rollback rehearsal, CHANGE-WFC-001 fixture) chưa làm — cần môi trường thử nghiệm thật, không chỉ code"
  - "sdd_light_profile chưa cutover nên chưa ai dùng Light qua flow thật — giá trị business chưa hiện thực hóa"
owners:
  - "human: pass DoD cho scope T1-T7 (đã đạt); quyết định thời điểm mở work item T8+T9"
```

## Traceability
```yaml
upstream:
  - "sdd-light-code-factory.s07.implementation.md"
  - "docs/plans/sdd-light-code-factory-plan-review.md (authority source)"
next_step: "Human pass DoD (scope T1-T7) -> mở work item riêng cho T8+T9 khi sẵn sàng"
```

## Handoff
- Overall status: 13/13 AC trong scope PASS, verification verdict PASS cho T1-T7 — chờ human pass DoD.
- Residual: T8 (authority cutover, rủi ro cao nhất) + T9 phần rollout chưa làm, đã tách work item theo OPT-A.
- Recommendation: pass DoD cho scope T1-T7 (giá trị code + test đã chứng minh); khi sẵn sàng, mở work item mới cho T8+T9 với đủ thời gian review vì đây là phần chạm authority layer.
- Release recommendation khi có: NOT_APPLICABLE — chưa cutover, chưa phải public release.
- Next action: human chốt DoD.
