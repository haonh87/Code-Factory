---
artifact_id: "sdd-light-code-factory.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "sdd-light-code-factory"
step_id: "s04"
step_slug: "acceptance-criteria"
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
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-light-code-factory.s01.restate.md"
  - "sdd-light-code-factory.s02.business-goal.md"
  - "sdd-light-code-factory.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Tóm tắt acceptance criteria, edge case, DoR và governance checks cho readiness.

## Step Contract
```yaml
step_goal: "Kế thừa AC-01..AC-15 từ plan đã duyệt; chốt Existing System Baseline (brownfield) + DoR verdict cho scope T1-T7 (đề xuất, chờ s05 xác nhận OQ-1)."
input_summary:
  - "s02 SM-1..SM-7; s03: T1-T9 ledger, OQ-1 chờ s05"
output_summary:
  - "AC-01..AC-15 (nguyên văn từ plan) + baseline + DoR"
done_when:
  - "Human pass Spec + DoR"
owner: "claude (draft) -> human (pass Spec + DoR)"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "docs/plans/sdd-light-code-factory-plan-review.md (revision 5, approved-by-human, 2026-07-16, reviewer Hao Nguyen Huu)"
decision_notes:
  - "Spec = plan review document, ĐÃ approved trước khi work item này tồn tại; s01-s04 ở đây chỉ formalize, không re-derive"
  - "sdd_mode=none cho work item NÀY (meta: work item về hệ thống SDD, tự nó không chạy Light)"
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
ux_contract_refs: []
notes:
  - "T1-T7 là internal tooling contract (schema, validator, protocol) — không phải public API/UX; T8 (nếu làm) là authority policy, cũng không phải API contract theo nghĩa thường"
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "Track full hiện tại: 8 note, BRD/SRS, 7-file CR package, 1269 dòng scaffold baseline (đo trong plan)"
  - "Uncommitted trong worktree sdd-light-t1: 23 file modified + 2 file mới (cr-aggregate-reconcile.js, workflow-telemetry.js) + 24 test file mới, ~2160 dòng"
  - "23/23 test PASS; 7/7 verification_commands của plan PASS (bao gồm regression legacy CHANGE-001 dual-read warning đúng thiết kế)"
impacted_surfaces:
  - "T1-T7: workflow-sdd-definitions, workflow-planning-definitions, workflow-change-definitions, run-workflow-authoring-smoke, scaffold-workflow, workflow-step-definitions, validate-workflow-governance, workflow-gate-review, workflow-gate-evidence-utils, workflow-trusted-approval-utils, work-item-protocol, materialize-work-item, change-item-utils, change-item, scaffold-change-package, validate-workflow-change, validate-workflow-sdd, cr-aggregate-reconcile (mới)"
  - "T8 (chưa làm): policies/codex/AGENTS.global.md, workflow-chain.md, spec-driven-development.md, work-item-materialization.md, workflow-governance-router/SKILL.md — authority layer điều khiển MỌI work item khác"
  - "T9 (partial): workflow-telemetry (mới, done); changes/CHANGE-WFC-001, canary report, rollback rehearsal (chưa có)"
compatibility_constraints:
  - "Strict/full và legacy CHANGE/change_* phải dual-read + warning trong migration window (đã verify)"
  - "sdd_light_profile mặc định vẫn off/preview cho tới khi T8 cutover — không silent-flip default"
rollback_constraints:
  - "T1-T7 chưa cutover vào authority thật -> rollback = không commit / revert commit, không ảnh hưởng workflow đang chạy"
  - "Nếu T8 được làm: rollback = sdd_light_profile=off, không rewrite artifact đã tạo (theo plan)"
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: AC-01
    criterion: "Router trả eligibility và auto-escalate mọi hard trigger với reason testable"
    measure: "Golden + negative fixture cho từng hard trigger"
    status: PASS
  - id: AC-02
    criterion: "Light không CR tạo 4 artifact ban đầu, tối đa 6 khi hoàn tất"
    measure: "Đếm artifact sinh ra qua scaffold Light compact"
    status: PASS
  - id: AC-03
    criterion: "Generated artifact <=450 dòng + <=20 required prompt trước implement; <=600 dòng + không tính CR khi hoàn tất"
    measure: "Budget assertion trong golden fixture test"
    status: PASS
  - id: AC-04
    criterion: "Spec Card có REQ/AC, provenance, freeze, authority đủ semantic validation"
    measure: "18 test case (1 valid + 15 negative + 2 regression) PASS"
    status: PASS
  - id: AC-05
    criterion: "s07 tạo khi ACTIVE, s08 tạo khi Verify; thiếu s07/evidence thì không tạo/finalize s08"
    measure: "work-item-protocol (Light) test: lazy note + failed-verify-no-premature-s08"
    status: PASS
  - id: AC-06
    criterion: "Spec/DoR host s04; Approach/Task Plan host s06; Foundation required auto-escalate full"
    measure: "workflow-gate-evidence (Light) test: gate-host-map, s05-skip cho Light, non-Light vẫn check s05"
    status: PASS
  - id: AC-07
    criterion: "Ready bundle tạo receipt độc lập, đúng hash/reviewer/timestamp từng gate"
    measure: "approve-ready-bundle test: 4 receipt độc lập"
    status: PASS
  - id: AC-08
    criterion: "Classification route đúng BUG implementation, BUG spec, FEATURE spec delta"
    measure: "materialize-work-item (Light routing) test"
    status: PASS
  - id: AC-09
    criterion: "Compact CR tạo 1 request.md; full CR giữ package hiện tại"
    measure: "scaffold-change-package (compact CR) test"
    status: PASS
  - id: AC-10
    criterion: "CR chỉ ACCEPTED khi aggregate coverage toàn bộ required linked work item pass"
    measure: "T7 aggregate reconciliation test: waiver, no-self-accept, atomic bump"
    status: PASS
  - id: AC-11
    criterion: "Current spec chỉ merge/bump version atomic tại ACCEPTED"
    measure: "T7 atomic ACCEPTED bump test"
    status: PASS
  - id: AC-12
    criterion: "New writer chỉ emit CR/cr_*; legacy CHANGE/change_* vẫn dual-read + warning"
    measure: "change-item-utils dual-read warning test + validate:workflow:change trên CHANGE-001 thật"
    status: PASS
  - id: AC-13
    criterion: "Strict/full fixtures giữ hành vi hiện tại; không silent-skip invariant"
    measure: "validate-workflow-governance (light gate guard) regression test + 7 verification_commands PASS"
    status: PASS
  - id: AC-14
    criterion: "Authority source, router, workflow-chain, installed-copy version đồng bộ"
    measure: "schema-version-sync test (khung đã có) nhưng NỘI DUNG authority chưa sync vì T8 chưa làm"
    status: NOT_MET
    gate: HARD
  - id: AC-15
    criterion: "Preview/canary metrics chứng minh đạt artifact/prompt/interaction/lead-time budget"
    measure: "Cần canary report thật — CHƯA CÓ"
    status: NOT_MET
    gate: HARD
edge_cases:
  - "Legacy CHANGE-001 vẫn đọc được qua dual-read, có warning — đã verify thật, không phải giả định"
  - "Ambiguous classification phải dừng PROPOSED hoặc escalate, không silent-guess (test đã cover)"
out_of_scope:
  - "T8/T9 hoàn chỉnh — CHỜ quyết định OQ-1 ở s05 (có thể tách work item riêng)"
done_when:
  - "AC-01..AC-13 PASS (đã đạt); AC-14/AC-15 (HARD) — quyết định ở s05: làm tiếp hay tách scope"
behavioral_invariants:
  - "sdd_light_profile mặc định KHÔNG đổi cho tới khi T8 cutover + human explicit enable"
  - "Strict/full/legacy behavior không đổi (đã verify)"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md (governance_profile=default)"
checks:
  - "Spec required, ĐÃ approved qua plan document (không phải suy diễn — có checklist tick + reviewer + ngày tường minh)"
  - "13/15 AC đã PASS có evidence thật; 2 AC còn lại (HARD gate) là đúng phần T8/T9 chưa làm"
  - "Không tự tuyên bố DoD toàn bộ khi AC-14/AC-15 HARD chưa đạt (rule Không Tự Tuyên Bố Done)"
blocking_items: []
owner: "human (pass Spec + DoR)"
next_action: "human pass Spec + DoR -> s05 option analysis cho OQ-1 (tách scope hay làm tiếp T8/T9)"
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners:
  - "human: pass Spec + DoR"
notes:
  - "Spec đã approved từ trước (plan document) — DoR ở đây xác nhận formalize đúng, không re-litigate quyết định đã tick"
  - "AC-14/AC-15 HARD chưa đạt là đã biết, không phải gap phát hiện muộn — quyết định xử lý ở s05"
```

## Traceability
```yaml
upstream:
  - "sdd-light-code-factory.s01.restate.md"
  - "sdd-light-code-factory.s02.business-goal.md"
  - "sdd-light-code-factory.s03.open-questions.md"
next_step: "s05 Technical Approach"
```

## Handoff
- Criteria bắt buộc: AC-01..AC-15, HARD AC-14 (authority sync) + AC-15 (canary evidence).
- Edge case phải giữ: legacy dual-read; ambiguous classification không silent-guess.
- Điều kiện sang step 5: human pass Spec + DoR.
