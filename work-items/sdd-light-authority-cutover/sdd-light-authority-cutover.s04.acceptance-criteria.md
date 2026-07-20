---
artifact_id: "sdd-light-authority-cutover.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "sdd-light-authority-cutover"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "po"
  contract:
    - "po"
    - "developer"
  dor:
    - "po"
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  spec_reviewed_by:
    - "po"
  spec_reviewed_at: "2026-07-20"
  contract_reviewed_by:
    - "po"
    - "developer"
  contract_reviewed_at: "2026-07-20"
  dor_reviewed_by:
    - "po"
  dor_reviewed_at: "2026-07-20"
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
  - "sdd-light-authority-cutover.s01.restate.md"
  - "sdd-light-authority-cutover.s02.business-goal.md"
  - "sdd-light-authority-cutover.s03.open-questions.md"
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
step_goal: "Chốt AC (=AC-14, AC-15, exit_criteria), Existing System Baseline (5 file authority hiện tại, EN, 0 mention Light), DoR verdict."
input_summary:
  - "s02 SM-1..SM-7; s03: 2 OQ resolved"
output_summary:
  - "AC + baseline + DoR"
done_when:
  - "Human pass Spec + DoR (Contract required vì đây là authority/policy surface)"
owner: "claude (draft) -> human (pass Spec + Contract + DoR)"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "docs/plans/sdd-light-code-factory-plan-review.md (approved 2026-07-16, T8/T9)"
  - "sdd-light-code-factory (T1-T7 DONE 2026-07-20) — code/validator nguồn"
decision_notes:
  - "Spec kế thừa từ plan; work item này chỉ formalize + audit + implement phần T8/T9"
```

## Contract Baseline
```yaml
status: APPROVED
api_contract_refs:
  - "Contract cần chốt ở s05: nội dung chính xác bổ sung vào 5 file authority (AGENTS.global.md, workflow-chain.md, spec-driven-development.md, work-item-materialization.md, router SKILL.md)"
ux_contract_refs: []
notes:
  - "approval_gates.contract=required vì đây LÀ authority/policy surface điều khiển mọi work item khác — rủi ro cao nhất toàn plan"
  - "Contract pass khi human duyệt nội dung cụ thể ở s05"
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "policies/codex/AGENTS.global.md (484 dòng, EN): có Mandatory Workflow Chain, Spec/Design Before Code, Human-Controlled Gates — 0 mention Light"
  - "skills/orchestration/codex-workflow-chain/references/workflow-chain.md (3114 dòng, EN): có planning_track=quick shortening rule — 0 mention Light gate host"
  - "skills/orchestration/codex-workflow-chain/references/spec-driven-development.md (257 dòng, EN): Spec Lifecycle, Step Mapping, Spec Freeze Gate — 0 mention Spec Card"
  - "skills/orchestration/codex-workflow-chain/references/work-item-materialization.md (607 dòng, EN): sdd_mode: none|light|strict đã là field enum (dòng 111-112) — chưa có eligibility routing logic mô tả"
  - "skills/orchestration/workflow-governance-router/SKILL.md (204 dòng, EN): Step 3-5 (Current Step, Missing Gates, Workflow Status) viết theo giả định 8 note đầy đủ — 0 mention Light"
impacted_surfaces:
  - "5 file authority trên — additive only"
compatibility_constraints:
  - "Full/strict path phải giữ nguyên hành vi 100% — regression toàn bộ work-items/ hiện có (100 file, 96 note) là gate cứng"
  - "5 file vừa được dịch EN bởi community-pack-i18n cùng ngày — bổ sung phải viết EN, khớp văn phong"
rollback_constraints:
  - "Revert merge commit; sdd_light_profile mặc định vẫn off/preview, không rewrite artifact đã tạo"
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: AC-14
    criterion: "Authority source, router, workflow-chain, installed-copy version đồng bộ"
    measure: "schema-version-sync test PASS + đối chiếu nội dung Light giữa 5 file authority và code T1-T7 (không lệch rule)"
    gate: HARD
  - id: AC-15
    criterion: "Preview/canary metrics chứng minh đạt artifact/prompt/interaction/lead-time budget"
    measure: "Tạo 1 work item mẫu thật qua Light preview, đo qua workflow-telemetry.js, so budget AC-02/AC-03, ghi canary report"
    gate: HARD
  - id: AC-EXIT-1
    criterion: "100% eligibility/escalation golden fixture pass"
    measure: "run-workflow-authoring-smoke.js Light fixture (đã có từ T1) PASS sau khi router/authority cập nhật"
  - id: AC-EXIT-2
    criterion: "Strict/full và legacy fixture pass không đổi expected behavior"
    measure: "Toàn bộ work-items/ hiện có (100 file) qua wfc validate + 24 unit test + 7 verification_commands PASS không lệch baseline"
    gate: HARD
  - id: AC-EXIT-3
    criterion: "Không có silent skipped invariant trong compact profile"
    measure: "Đối chiếu router logic mới với validator T1-T4 — không có đường nào bypass gate check"
  - id: AC-EXIT-4
    criterion: "Rollback rehearsal pass"
    measure: "Revert authority changes trong worktree tạm -> validate PASS lại trạng thái trước T8"
    gate: HARD
edge_cases:
  - "Work item cũ (đã DONE trước khi có Light, sdd_mode=none hoặc không có field) phải không bị router hiểu nhầm là Light"
  - "Work item Light nhưng có Foundation=required phải auto-escalate full ngay ở router, không chờ tới s06"
out_of_scope:
  - "Chuyển default (quyết định riêng human)"
done_when:
  - "AC-14/AC-15/AC-EXIT-1..4 PASS; DoD ở s08"
behavioral_invariants:
  - "Full/strict path không đổi hành vi"
  - "Router không tự động default Light cho work item cũ"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Contract required — authority/policy surface, rủi ro cao nhất"
  - "Regression toàn bộ work-items/ hiện có là hard gate trước khi merge"
  - "TDD: authority docs không có 'test' theo nghĩa code, nhưng verify path = regression suite đầy đủ + đối chiếu nội dung tay"
  - "Worktree BẮT BUỘC (đã tạo feat/sdd-light-authority)"
blocking_items: []
owner: "human (pass Spec + Contract + DoR)"
next_action: "human pass gates -> s05 (nội dung chính xác cần bổ sung vào từng file)"
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners:
  - "human: pass Spec + Contract (nội dung ở s05) + DoR"
notes:
  - "Contract thực tế pass khi human duyệt nội dung s05 (giống pattern harness-adapter-refactor)"
```

## Traceability
```yaml
upstream:
  - "sdd-light-authority-cutover.s01.restate.md"
  - "sdd-light-authority-cutover.s02.business-goal.md"
  - "sdd-light-authority-cutover.s03.open-questions.md"
next_step: "s05 Technical Approach"
```

## Handoff
- Criteria bắt buộc: AC-14, AC-15, AC-EXIT-1..4 (HARD: AC-14, AC-15, AC-EXIT-2, AC-EXIT-4).
- Edge case phải giữ: work item cũ không bị hiểu nhầm Light; Foundation=required auto-escalate ngay.
- Điều kiện sang step 5: human pass Spec + DoR.
