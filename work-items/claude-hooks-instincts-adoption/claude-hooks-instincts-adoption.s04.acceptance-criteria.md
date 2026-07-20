---
artifact_id: "claude-hooks-instincts-adoption.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "claude-hooks-instincts-adoption"
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
  - "claude-hooks-instincts-adoption.s01.restate.md"
  - "claude-hooks-instincts-adoption.s02.business-goal.md"
  - "claude-hooks-instincts-adoption.s03.open-questions.md"
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
step_goal: "Chốt AC đo được cho adopt hooks + instincts (map SM-1..SM-5 + 2 blocker), baseline, DoR; human pass Spec + DoR."
input_summary:
  - "s02 SM-1..SM-5; s03: OQ-2/3/4 resolved, 2 blocker, OQ-1 chờ s05"
output_summary:
  - "AC-1..AC-6 + edge cases + invariants + baseline + DoR verdict"
done_when:
  - "Human pass Spec + DoR"
owner: "claude (draft) -> human (pass Spec + DoR)"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "claude-hooks-instincts-adoption.s01.restate.md (confirmed 2026-07-20)"
  - "claude-hooks-instincts-adoption.s02.business-goal.md (SM-1..SM-5)"
decision_notes:
  - "Spec = restate + business goal + OQ findings (sdd_mode=none)"
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
ux_contract_refs: []
notes:
  - "Hooks là internal repo tooling, không public surface của bundle"
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "scripts/hooks/tdd-enforce.sh ĐÃ tracked; 4 hook còn lại untracked, executable 555, không path máy"
  - ".claude/settings.json (untracked): 5 hook đăng ký qua ${CLAUDE_PROJECT_DIR}, timeout 5-10s"
  - ".claude/instincts.yaml (untracked): 5 instinct kỹ thuật, sạch"
  - "State files .claude/*-state.json đã gitignore (commit trước)"
  - "wfc validate baseline: 84 files + 80 notes"
impacted_surfaces:
  - "git tracking: +4 hook scripts, +settings.json, +instincts.yaml"
  - ".gitignore: +scripts/.claude/ (hoặc pattern state file rộng hơn), +.claude/worktrees/"
  - "scripts/hooks/load-workflow-context.sh: +1 dòng exit 0 (fix minor duy nhất)"
  - "Xóa junk: scripts/.claude/tdd-session-state.json"
compatibility_constraints:
  - "Hook behavior không đổi (adopt as-is); máy thiếu node: hook fail -> Claude Code bỏ qua hook lỗi, không block session"
  - "wfc validate PASS trước/sau"
rollback_constraints:
  - "Revert 1 commit -> về untracked như cũ; cá nhân: CF_HOOK_PROFILE=minimal hoặc CF_DISABLED_HOOKS"
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: AC-1
    criterion: "Commit đủ bộ: 5 hook + settings.json + instincts.yaml tracked; settings không trỏ script thiếu (SM-1)"
    measure: "git ls-files khớp; đối chiếu settings.json commands với file tồn tại"
  - id: AC-2
    criterion: "Không leak nội dung máy cá nhân (SM-2 + blockers s03)"
    measure: "scripts/.claude/ đã xóa + ignore; .claude/worktrees/ ignore; grep /Users/ trên diff commit = rỗng"
    gate: HARD
  - id: AC-3
    criterion: "Hooks degrade êm (SM-3)"
    measure: "Chạy từng hook với stdin rỗng/JSON hỏng -> exit 0 (riêng tdd-enforce: exit 2 CHỈ khi block đúng design, exit 0 các nhánh khác)"
    gate: HARD
  - id: AC-4
    criterion: "Profile controls hoạt động (SM-4)"
    measure: "CF_HOOK_PROFILE=minimal -> tdd hooks exit 0 sớm (test env var thật); CF_DISABLED_HOOKS=tdd-enforce -> hook đó tắt"
  - id: AC-5
    criterion: "wfc validate PASS trước/sau (SM-5)"
    measure: "84+80 khớp (hoặc tăng đúng artifact chủ đích)"
    gate: HARD
  - id: AC-6
    criterion: "Fix minor: load-workflow-context.sh có exit 0 tường minh"
    measure: "Dòng cuối script + chạy thử hook exit 0"
edge_cases:
  - "Teammate không có node -> hook command fail -> Claude Code báo hook error nhưng session tiếp tục (xác nhận ở verify)"
  - "settings.local.json của teammate override settings.json -> hợp lệ, không xung đột"
  - "Hook chạy trong worktree -> ${CLAUDE_PROJECT_DIR} trỏ worktree, project-root detection của script tự xử lý"
out_of_scope:
  - "Đổi behavior hook, default profile (OQ-1 quyết ở s05), publish vào bundle"
done_when:
  - "AC-1..AC-6 PASS (AC-2/3/5 HARD); DoD ở s08"
behavioral_invariants:
  - "Hook không bao giờ block session vì lỗi nội bộ"
  - "Không file commit chứa path máy/nội dung cá nhân"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Spec required; Contract/Foundation/UAT/Release/Business not_applicable"
  - "Brownfield baseline đủ; TDD NOT_REQUIRED (adopt as-is + 1-line fix, verify = chạy hook thật)"
  - "Security: commit settings.json = teammate auto-chạy shell khi pull -> review kỹ nội dung 5 script (đã điều tra: sạch), opt-out documented"
blocking_items: []
owner: "human (pass Spec + DoR)"
next_action: "human pass Spec + DoR -> s05 option analysis OQ-1 (auto-on strict / auto-on standard / opt-in)"
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners:
  - "human: pass Spec + DoR"
notes:
  - "OQ-1 (profile default) là quyết định s05, không chặn DoR"
```

## Traceability
```yaml
upstream:
  - "claude-hooks-instincts-adoption.s01.restate.md"
  - "claude-hooks-instincts-adoption.s02.business-goal.md"
  - "claude-hooks-instincts-adoption.s03.open-questions.md"
next_step: "s05 Technical Approach"
```

## Handoff
- Criteria bắt buộc: AC-1..AC-6, HARD AC-2/AC-3/AC-5.
- Edge case phải giữ: thiếu node không block session; settings.local override hợp lệ.
- Điều kiện sang step 5: human pass Spec + DoR.
