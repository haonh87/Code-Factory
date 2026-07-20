---
artifact_id: "claude-hooks-instincts-adoption.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "claude-hooks-instincts-adoption"
step_id: "s02"
step_slug: "business-goal"
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "claude-hooks-instincts-adoption.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Tóm tắt user problem, business outcome, success metric và non-goals.

## Step Contract
```yaml
step_goal: "Chốt user problem, business goal, success metrics và non-goals cho adopt hooks + instincts."
input_summary:
  - "s01 confirmed 2026-07-20; điều tra 2026-07-20: 5 hook script sạch (không path máy), tdd-enforce đã tracked, 4 hook còn lại + settings.json + instincts.yaml untracked"
output_summary:
  - "business_goal + SM đo được + non_goals"
done_when:
  - "SM đo được ở s08; non_goals rõ"
owner: "claude (draft) -> human (review cùng Spec gate s04)"
```

## Artifact Chính
```yaml
user_problem: >-
  Hạ tầng hooks + instincts đang commit DỞ DANG: tdd-enforce.sh đã tracked nhưng 4 hook,
  settings.json và instincts.yaml chưa — teammate pull về có CLAUDE.md mô tả hệ thống
  không tồn tại, hook config trỏ script thiếu, instincts không nhân rộng.
business_goal: >-
  Teammate pull repo là có đủ bộ hooks + instincts hoạt động đúng như CLAUDE.md mô tả,
  với quyền kiểm soát rõ (profile/opt-out), không leak nội dung máy cá nhân.
success_metrics:
  - "SM-1: git ls-files chứa đủ 5 hook scripts + settings.json + instincts.yaml; settings.json không trỏ script nào thiếu"
  - "SM-2: Không file commit nào chứa path đặc thù máy hoặc session state cá nhân (grep /Users/ sạch)"
  - "SM-3: Hooks degrade êm trên máy thiếu dependency: mọi hook exit 0 khi lỗi nội bộ (trừ tdd-enforce exit 2 đúng design khi block)"
  - "SM-4: CF_HOOK_PROFILE=minimal tắt được TDD hooks thật (test bằng env var); opt-out documented"
  - "SM-5: wfc validate PASS trước/sau; behavior hooks không đổi (adopt as-is, không refactor)"
non_goals:
  - "Viết hook mới / đổi behavior hook hiện có (trừ fix nhỏ đã phát hiện: thêm exit 0 cuối load-workflow-context.sh)"
  - "Đưa hooks vào workflow-bundle publish surface"
  - "Chốt default profile khác strict (nếu muốn đổi default là decision riêng ở s05)"
constraints:
  - "Kế thừa s01: non-blocking, wfc validate gate"
  - "Blocker phải dọn trước commit: scripts/.claude/ junk (có path máy), .claude/worktrees/ chưa ignore"
assumptions:
  - "Teammate có node + bash (hooks chỉ cần 2 thứ này, đã xác minh)"
```

## Traceability
```yaml
upstream:
  - "claude-hooks-instincts-adoption.s01.restate.md"
next_step: "s03 Open Questions"
```

## Handoff
- User problem đã chốt: commit dở dang + reference gãy.
- Non-goals: không refactor behavior, không publish vào bundle.
- Điều kiện sang step 3: human review cùng Spec gate s04.
