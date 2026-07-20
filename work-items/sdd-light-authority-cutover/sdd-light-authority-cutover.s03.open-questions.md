---
artifact_id: "sdd-light-authority-cutover.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "sdd-light-authority-cutover"
step_id: "s03"
step_slug: "open-questions"
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
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-light-authority-cutover.s01.restate.md"
  - "sdd-light-authority-cutover.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Tóm tắt câu hỏi mở, missing input, conflict và readiness verdict.

## Step Contract
```yaml
step_goal: "Resolve OQ-1 (router auto-detect), OQ-2 (định nghĩa canary) bằng đọc code thật; chốt readiness."
input_summary:
  - "Điều tra 2026-07-20: 5 file authority hiện KHÔNG có mention nào về 'Light' như khái niệm vận hành (chỉ có sdd_mode: none|light|strict như enum giá trị ở work-item-materialization.md dòng 111-112); spec-driven-development.md và router SKILL.md có 0 mention"
output_summary:
  - "OQ resolve + readiness verdict"
done_when:
  - "Readiness rõ"
owner: "claude (điều tra) -> human (review ở s04/s05)"
```

## Artifact Chính
```yaml
open_questions:
  - id: OQ-1
    question: "Router SKILL.md hiện có tự detect sdd_mode=light từ work item note không?"
    status: RESOLVED
    finding: >-
      KHÔNG — router SKILL.md hiện có 0 mention về Light/sdd_mode. Step 3 (Determine
      Current Step), Step 4 (Check Missing Gates), Step 5 (Choose Workflow Status) đều
      viết theo giả định 8 physical note đầy đủ. Cần bổ sung: router phải đọc
      sdd_mode=light từ work item note và áp gate host map tương ứng (s04 Spec+DoR,
      s06 Approach+Task Plan, không check s05 physical note, s07/s08 lazy).
    owner: "closed — input cho s05"
  - id: OQ-2
    question: "Canary 'chạy thử' nghĩa là gì cụ thể?"
    status: RESOLVED
    finding: >-
      Theo plan T9 outputs_expected: 'Preview/canary telemetry report'. Định nghĩa: tạo
      1 work item mẫu thật với sdd_mode=light, sdd_light_profile=preview, chạy qua
      scaffold (s01/s04/s06) -> đo artifact count/dòng/prompt qua workflow-telemetry.js
      (đã có từ T9 T1-T7) -> so với budget AC-02/AC-03 -> ghi report. Không phải chỉ
      chạy lại authoring-smoke fixture (đó là regression, không phải canary evidence).
    owner: "closed — input cho s06 task T-canary"
missing_inputs: []
conflicts: []
assumptions:
  - "5 file authority sẽ được sửa TRONG worktree riêng feat/sdd-light-authority, KHÔNG động vào main cho tới khi regression toàn diện PASS"
```

## Input Readiness
```yaml
status: READY
blocking_items: []
owner_actions:
  - "human: review option analysis s05 (cách bổ sung router + authority docs)"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "2/2 OQ resolved bằng đọc code + doc thật, không suy diễn"
```

## Traceability
```yaml
upstream:
  - "sdd-light-authority-cutover.s01.restate.md"
  - "sdd-light-authority-cutover.s02.business-goal.md"
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Trạng thái readiness: READY.
- Điều cần làm để sang step 4: draft AC (=AC-14/AC-15/exit_criteria) + DoR.
