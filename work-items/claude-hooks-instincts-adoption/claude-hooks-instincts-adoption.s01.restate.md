---
artifact_id: "claude-hooks-instincts-adoption.s01.restate"
artifact_family: workflow-step
work_item_slug: "claude-hooks-instincts-adoption"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Tóm tắt yêu cầu, phạm vi ban đầu, ràng buộc và governance context mở đầu.

## Step Contract
```yaml
step_goal: "Làm rõ scope adopt chính thức bộ Claude hooks + instincts đang chạy thật nhưng chưa commit; đủ để sang s02."
input_summary:
  - "Hiện trạng: scripts/hooks/*.sh (4 file untracked), .claude/settings.json, .claude/instincts.yaml, scripts/.claude/ — đang hoạt động trên máy này"
  - ".claude/CLAUDE.md (ĐÃ commit) đang reference instincts.yaml + Hook Runtime Controls -> teammate pull về thấy reference gãy"
output_summary:
  - "restated_request + scope in/out + constraints + OQ ban đầu"
done_when:
  - "Human confirm restated_request + scope_draft"
owner: "claude (draft) -> human (confirm)"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes, human approves"
  - "Hooks auto-run là surface nhạy cảm: commit settings.json chung = mọi teammate tự động chạy shell script khi pull -> cần review kỹ + opt-out rõ"
required_reviews:
  - "Spec + DoR (s04), Approach (s05), Task Plan (s06), DoD (s08)"
prohibited_actions:
  - "Không implement trước khi s04-s06 pass"
open_governance_questions:
  - "Commit settings.json (hooks auto-on cho mọi người) có cần treat như release-risk change không?"
```

## Artifact Chính
```yaml
raw_request: "Chốt bộ session-persistence hooks + TDD hooks + instincts: commit vào repo để teammate dùng được, hết reference gãy trong CLAUDE.md."
restated_request: >-
  Formalize hạ tầng hooks + instincts đang chạy cục bộ thành phần được commit: 4 hook script
  (load-workflow-context, persist-context, tdd-track, tdd-track-write), cấu hình
  .claude/settings.json, .claude/instincts.yaml và scripts/.claude/ liên quan — kèm verify
  hooks hoạt động/degrade êm trên máy teammate và tôn trọng CF_HOOK_PROFILE/CF_DISABLED_HOOKS.
request_type: CHANGE
user_problem_initial: >-
  CLAUDE.md đã commit mô tả hooks/instincts nhưng file thật chưa commit — teammate pull về
  không có hooks, reference gãy, behavior khác máy chính; công sức instincts không nhân rộng.
business_context_initial: "Repo AI Agent Ops — hooks/instincts là một phần của sản phẩm harness, không chỉ tiện ích cá nhân."
scope_draft:
  in:
    - "Commit 4 hook scripts + settings.json (hoặc cơ chế opt-in) + instincts.yaml + scripts/.claude/ (cần kiểm nội dung)"
    - "Verify hooks trên góc nhìn teammate: exit 0, degrade êm khi thiếu dependency, CF_HOOK_PROFILE hoạt động"
    - "Đối chiếu CLAUDE.md hiện tại với behavior thật, sửa lệch nếu có"
  out:
    - "Viết hook mới hoặc đổi behavior hooks hiện có"
    - "Đưa hooks vào workflow-bundle publish surface (cân nhắc riêng)"
constraints_initial:
  - "Hook phải non-blocking, exit 0 khi lỗi nội bộ (baseline đã có từ trial codebase-memory)"
  - "wfc validate PASS trước/sau"
assumptions_initial:
  - "tdd-enforce hook được reference trong CLAUDE.md nhưng KHÔNG có file scripts/hooks/tdd-enforce* untracked -> cần xác minh tồn tại ở đâu (OQ)"
open_questions_initial:
  - "OQ-1: settings.json commit chung (hooks auto-on) hay hướng dẫn opt-in qua settings.local.json?"
  - "OQ-2: scripts/.claude/ chứa gì — thuộc scope này hay rác?"
  - "OQ-3: tdd-enforce hook (PreToolUse) nằm ở đâu? CLAUDE.md nói có nhưng không thấy file untracked tương ứng"
  - "OQ-4: instincts.yaml có nội dung đặc thù máy/cá nhân cần lọc trước khi commit không?"
dependencies_initial:
  - "Merge target: branch release/v2.2.1 (nối tiếp v2.2.0)"
risks_initial:
  - "Commit settings.json = teammate auto-chạy shell script khi pull — cần security review + opt-out rõ"
  - "Hook script có thể chứa path đặc thù máy (giống bài học .mcp.json)"
  - "tdd-enforce chặn Write có thể gây phiền teammate chưa quen -> profile default phải cân nhắc"
notes_for_step_2: "Success metric nên đo: teammate pull về hooks chạy được hoặc degrade êm; reference CLAUDE.md hết gãy; opt-out 1 bước."
```

## Traceability
```yaml
source_inputs:
  - ".claude/CLAUDE.md (mục Instincts + Hook Runtime Controls)"
  - "memory/session-persistence-hook.md (Claude memory)"
next_step: "s02 Business Goal"
```

## Handoff
- Điều đã rõ: hiện trạng file + reference gãy; merge target release/v2.2.0.
- Điều còn cần theo dõi: OQ-1 (auto-on vs opt-in) là quyết định lớn nhất — security-sensitive.
- Điều kiện sang step 2: ĐÃ ĐẠT — human confirm 2026-07-20.
