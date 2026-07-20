---
artifact_id: "sdd-light-authority-cutover.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "sdd-light-authority-cutover"
step_id: "s06"
step_slug: "task-breakdown"
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
  task_plan:
    - "developer"
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
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-07-20"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-light-authority-cutover.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.

## Step Contract
```yaml
step_goal: "Task plan cho T8 (5 file authority) + T9 (canary + rollback rehearsal) + regression toàn diện; human pass Task Plan."
input_summary:
  - "s05 approved OPT-A: AGENTS.global.md nguồn chính, 4 file trỏ về"
output_summary:
  - "T-A..T-H với owned_scope + verify path"
done_when:
  - "Human pass Task Plan"
owner: "claude (draft) -> human (pass Task Plan)"
```

## Artifact Chính
```yaml
tasks:
  - id: T-A
    name: "Baseline regression TRƯỚC khi sửa authority (worktree feat/sdd-light-authority)"
    owned_scope: "toàn bộ work-items/ hiện có + 24 unit test + 7 verification_commands + bundle-smoke"
    verify: "Ghi lại kết quả PASS làm baseline so sánh sau T8"
  - id: T-B
    name: "AGENTS.global.md — Hard Rule: SDD Light Profile (nguồn chính)"
    owned_scope: "policies/codex/AGENTS.global.md"
    steps:
      - "Thêm section sau 'Hard Rule: Spec/Design Before Code': eligibility, hard escalation, physical note mapping, gate host contract, Spec Card thay BRD/SRS"
      - "Thêm 1 dòng ở 'Hard Rule: Human-Controlled Gates': ready-bundle vẫn tạo trusted receipt độc lập"
    verify: "Đối chiếu từng câu với code T1-T7 thật (workflow-sdd-definitions.js eligibility matrix, workflow-gate-evidence-utils.js gate host map) — không bịa thêm rule"
  - id: T-C
    name: "workflow-chain.md — trỏ về + output template Light"
    owned_scope: "skills/orchestration/codex-workflow-chain/references/workflow-chain.md"
    verify: "Đối chiếu output template với scaffold-workflow.js T3 thật (field/block sinh ra)"
  - id: T-D
    name: "spec-driven-development.md — Spec Card"
    owned_scope: "skills/orchestration/codex-workflow-chain/references/spec-driven-development.md"
    verify: "Đối chiếu với validate-workflow-sdd.js T2 thật (REQ/AC/provenance/freeze rule) + product-specs/templates/spec-card.template.md"
  - id: T-E
    name: "work-item-materialization.md — eligibility routing"
    owned_scope: "skills/orchestration/codex-workflow-chain/references/work-item-materialization.md"
    verify: "Đối chiếu với materialize-work-item.js T5 thật"
  - id: T-F
    name: "router SKILL.md — gate host theo profile"
    owned_scope: "skills/orchestration/workflow-governance-router/SKILL.md"
    steps:
      - "Step 3 (Determine Current Step): thêm nhánh đọc sdd_mode từ note"
      - "Step 4 (Check Missing Gates): thêm nhánh gate host Light (s04+s06 thay vì s04+s05+s06)"
    verify: "Đối chiếu với workflow-gate-evidence-utils.js T4 thật (gate-host-map-light)"
  - id: T-G
    name: "Regression toàn diện SAU khi sửa authority"
    owned_scope: "toàn bộ work-items/ hiện có + 24 unit test + 7 verification_commands + bundle-smoke + wfc validate"
    verify: "So với baseline T-A — 0 lệch; đặc biệt work item cũ (sdd_mode=none hoặc thiếu field) không bị router hiểu nhầm Light"
  - id: T-H
    name: "T9: Canary evidence + rollback rehearsal"
    owned_scope: "1 work item mẫu mới (sdd_mode=light, sdd_light_profile=preview) + rollback rehearsal trong worktree tạm"
    steps:
      - "Scaffold 1 work item mẫu qua Light (s01/s04/s06) -> đo artifact count/dòng qua workflow-telemetry.js -> so budget AC-02/AC-03 -> ghi canary report"
      - "Rollback rehearsal: revert 5 file authority trong worktree tạm -> validate PASS lại trạng thái trước T8"
    verify: "Canary report đạt budget; rollback rehearsal PASS"
dependencies:
  - "T-A -> T-B -> T-C -> T-D -> T-E -> T-F -> T-G -> T-H tuần tự"
  - "T-B là nền tảng cho T-C..T-F (4 file sau trỏ về AGENTS.global.md)"
handoff_points:
  - "Nếu T-G phát hiện regression thật (không phải cruft máy như bundle-smoke ENOTEMPTY lần trước) -> DỪNG, không merge, báo cáo trước khi tự sửa"
  - "Sau T-H: merge vào main, sang s08"
```

## Verification Plan
- Check bắt buộc: baseline T-A vs T-G phải khớp 100% (không lệch số file/note); canary report đạt budget; rollback rehearsal PASS.
- Risk note: đây là phần rủi ro cao nhất toàn bộ plan — nếu có bất kỳ nghi ngờ nào về regression, dừng lại báo cáo thay vì tự quyết tiếp.
- Rollout note nếu có: merge vào main nhưng sdd_light_profile giữ preview/off — KHÔNG bật default.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Contract: nội dung 5 file đã duyệt ở s05, không tự ý đổi khác khi implement"
  - "Worktree bắt buộc (đã có); review 2 tầng trước merge; không subagent (tuần tự, cùng boundary)"
blocking_items: []
owner: "human (pass Task Plan)"
next_action: "human pass Task Plan -> s07"
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "T-A (baseline) và T-G (sau sửa) phải khớp"
compatibility_checkpoints:
  - "Work item cũ không sdd_mode hoặc sdd_mode=none/strict không bị ảnh hưởng"
migration_or_backfill_steps:
  - "Không có"
rollback_or_restore_steps:
  - "T-H rollback rehearsal; sau đó merge thật vẫn giữ revert path 1 bước"
```

## Traceability
```yaml
upstream:
  - "sdd-light-authority-cutover.s05.technical-approach.md (approved OPT-A)"
next_step: "s07 Implement"
```

## Handoff
- Task thực hiện trước: T-A (baseline trước khi sửa gì).
- Phụ thuộc chặn: T-G phát hiện regression thật thì dừng, không tự sửa tiếp.
- Điều kiện sang step 7: human pass Task Plan.
