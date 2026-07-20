---
artifact_id: "sdd-light-code-factory.s07.implementation"
artifact_family: workflow-step
work_item_slug: "sdd-light-code-factory"
step_id: "s07"
step_slug: "implementation"
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-light-code-factory.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.

## Step Contract
```yaml
step_goal: "Thi công T-1..T-6 theo task plan approved; ghi evidence cho s08."
input_summary:
  - "s06 approved (Task Plan passed 2026-07-20): T-1..T-6, scope T1-T7 + telemetry"
output_summary:
  - "Commit 87a7f79 (T1-T7 code) + a999b09 (docs: plan + Spec Card template) merged vào main (0e44c60)"
done_when:
  - "T-1..T-6 verify path pass"
owner: "claude (implement) -> human (s08 DoD)"
```

## Artifact Chính
```yaml
implemented_changes:
  - "T-1: worktree feat/sdd-light-authoring từ main; apply patch (git apply --reject cho 5 file có conflict do đã bị đổi bởi việc khác từ khi sdd-light-t1 tách nhánh); copy 26 file untracked (DONE)"
  - "T-2: merge 2 file test trùng tên (workflow-bundle-utils.test.js, sync-workflow-bundle-runtime.test.js) — gộp assertion của cả 2 nguồn gốc (adapter/chmod tests + schema-version tests), cả 2 bộ PASS (DONE)"
  - "T-3: run-all.js (24 file) PASS + 7 verification_commands PASS + bundle-smoke PASS trên worktree mới (DONE)"
  - "T-4: review 2 tầng — spec compliance (đối chiếu T1-T7 với outputs_expected, đủ đúng scope_guards) + code quality (đọc kỹ cr-aggregate-reconcile.js — atomic bump, no-self-accept, waiver, có comment giải thích rationale); commit 87a7f79 (code) + a999b09 (docs, cần git add -f vì docs/plans/ bị gitignore từ việc trước — plan là authority source, không phải scratch) (DONE)"
  - "T-5: merge --no-ff vào main (0fbe396 -> ...  merge commit riêng), không conflict; PHÁT HIỆN + FIX: bundle-smoke fail ENOTEMPTY do stale build artifact packages/workflow-bundle/runtime/ (permission dr-xr-xr-x, gitignored, không liên quan merge) — xóa + rerun PASS (DONE)"
  - "T-6: xác nhận nội dung sdd-light-t1 khớp 100% với main (cmp 3 file core) rồi xóa cả 2 worktree (sdd-light-authoring, sdd-light-t1) + branch tương ứng (DONE)"
doc_changes:
  - "docs/plans/sdd-light-code-factory-plan-review.md (force-added, gitignore không áp dụng cho authority source)"
  - "product-specs/templates/spec-card.template.md (mới), product-specs/README.md (mô tả cards/ dir)"
operational_notes:
  - "sdd_light_profile mặc định KHÔNG đổi — T1-T7 chưa cutover vào authority (T8 out of scope)"
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: NOT_REQUIRED
tdd_test_refs:
  - "24 file test đã có sẵn từ trước khi work item này tồn tại (viết trong quá trình implement T1-T7 gốc, ngoài phạm vi work item formalize)"
tdd_exception_reason: "Code + test được viết trước khi work item chính thức mở (work item này chỉ formalize/audit/merge công việc đã có evidence)"
tdd_alternative_verify_path:
  - "23/23 (nay 24/24 sau merge test) test PASS + 7/7 verification_commands PASS là evidence đủ tin cậy, đã re-verify độc lập nhiều lần (worktree mới, sau merge main)"
  - "Riêng phần MERGE thật sự làm trong s07 này (T-2 gộp 2 file test, T-1 xử lý 5 file conflict) được làm cẩn thận: đọc cả 2 nguồn, giữ đủ assertion của cả 2, chạy lại xác nhận PASS trước khi commit"
change_risk_profile: ELEVATED
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/sdd-light-authoring (feat/sdd-light-authoring, đã xóa sau merge)"
worktree_reason: "Bắt buộc theo s06: nhiều file, core protocol/gate engine, risk cao"
review_status: DONE
review_refs:
  - "T-4 review 2 tầng (2026-07-20): spec compliance PASS (T1-T7 đúng outputs_expected của plan, không đụng T8/T9-rollout, scope_guards giữ nguyên) -> code quality PASS (cr-aggregate-reconcile.js: atomic bump + no-self-accept + waiver rõ ràng, có comment giải thích; sync-workflow-bundle-runtime.js merge giữ đúng cả 2 luồng adapter-registry và schema-version)"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "feat/sdd-light-authoring -> merge --no-ff -> main (revertable 1 merge commit + 1 doc commit trước đó, đã merge cùng)"
verify_path:
  - "T-3: 24/24 test PASS trên worktree mới; 7/7 verification_commands PASS"
  - "T-5: re-verify sau merge trên main — 24/24 test PASS, 7/7 verification_commands PASS, bundle-smoke PASS (sau khi dọn stale build artifact không liên quan), wfc validate PASS 100+96"
  - "T-6: cmp 3 file core (materialize-work-item.js, cr-aggregate-reconcile.js, workflow-telemetry.js) giữa sdd-light-t1 và main — IDENTICAL trước khi xóa worktree gốc"
```

## Implementation Notes
```yaml
framework_notes:
  - "INCIDENT + RECOVER (T-5): bundle-smoke fail ENOTEMPTY ngay sau merge — điều tra kỹ trước khi hành động: xác nhận packages/workflow-bundle/runtime/ gitignored + chưa từng track (git log rỗng) + permission dr-xr-xr-x bất thường (không phải do code chmod fix nào tạo ra, 755 != 555) -> kết luận là stale cruft từ trước, không phải regression -> xóa an toàn + rerun PASS. KHÔNG revert merge hay nghi ngờ code T1-T7 khi chưa xác minh root cause."
  - "sync-workflow-bundle-runtime.js có 2 refactor độc lập hội tụ tại cùng 1 hàm main() — bài học: khi nhiều nhánh dài hạn cùng refactor 1 hàm lõi, patch --reject + đọc kỹ semantic mỗi bên là cách xử lý đúng, không nên tự động lấy 1 bên"
known_limitations:
  - "T8 (authority/router/docs cutover) và phần còn lại T9 (canary, rollback rehearsal, CHANGE-WFC-001 fixture) KHÔNG thuộc scope work item này — xem s05 OPT-A"
  - "sdd_light_profile chưa cutover nên chưa ai dùng được qua flow thật; giá trị business (giảm ceremony) chưa hiện thực hóa cho tới khi có work item T8/T9"
```

## Traceability
```yaml
upstream:
  - "sdd-light-code-factory.s06.task-breakdown.md (approved)"
  - "docs/plans/sdd-light-code-factory-plan-review.md (approved-by-human 2026-07-16, authority source)"
next_step: "s08 Verify + DoD"
```

## Handoff
- Outputs actual: commit 87a7f79 (T1-T7 code) + a999b09 (docs) merged vào main; cả 2 worktree (sdd-light-authoring, sdd-light-t1) đã xóa an toàn.
- AC scoreboard: AC-01..AC-13 PASS (đã đạt từ trước, re-verify OK); AC-14/AC-15 (HARD) NOT_MET — ĐÚNG NHƯ DỰ KIẾN, thuộc T8/T9 ngoài scope work item này (không phải fail phát hiện muộn).
- Next: s08 verify + DoD cho ĐÚNG scope T1-T7 (human).
