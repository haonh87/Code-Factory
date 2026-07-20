---
artifact_id: "claude-hooks-instincts-adoption.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "claude-hooks-instincts-adoption"
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
  - "claude-hooks-instincts-adoption.s01.restate.md"
  - "claude-hooks-instincts-adoption.s02.business-goal.md"
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
step_goal: "Resolve OQ-1..OQ-4 của s01 bằng điều tra thật, chốt readiness."
input_summary:
  - "Điều tra 2026-07-20 (read-only agent): đọc 5 hook scripts, settings.json, scripts/.claude/, instincts.yaml"
output_summary:
  - "OQ status + blockers + readiness verdict"
done_when:
  - "Không OQ nào chặn s04 thiếu owner/verify path"
owner: "claude (điều tra) -> human (quyết OQ-1 ở s05)"
```

## Artifact Chính
```yaml
open_questions:
  - id: OQ-1
    question: "settings.json commit chung (hooks auto-on) hay opt-in?"
    status: OPEN_FOR_S05
    finding: >-
      Dữ kiện mới cho quyết định: mọi hook non-blocking + respect CF_HOOK_PROFILE/CF_DISABLED_HOOKS;
      riêng tdd-enforce (đã tracked sẵn từ trước) block Edit/Write bằng exit 2 khi profile=strict
      (default). Auto-on nghĩa là teammate mặc định bị enforce TDD ngay khi pull.
      Option s05 sẽ so: (a) auto-on strict, (b) auto-on nhưng default profile standard,
      (c) opt-in qua settings.local.json.
    owner: "human quyết ở s05"
  - id: OQ-2
    question: "scripts/.claude/ chứa gì?"
    status: RESOLVED
    finding: "JUNK — 1 file tdd-session-state.json từ test run cũ (session_id test-session-123), chứa absolute path máy cá nhân, KHÔNG được gitignore. Xử lý: xóa + thêm ignore pattern (BLOCKER trước commit)."
    owner: "closed (task s06)"
  - id: OQ-3
    question: "tdd-enforce hook nằm ở đâu?"
    status: RESOLVED
    finding: "scripts/hooks/tdd-enforce.sh (8343 bytes) — ĐÃ tracked/commit từ trước. CLAUDE.md reference đúng, không thiếu. Nghĩa là adopt = commit nốt 4 hook còn lại + settings.json + instincts.yaml."
    owner: "closed"
  - id: OQ-4
    question: "instincts.yaml có nội dung cá nhân cần lọc?"
    status: RESOLVED
    finding: "KHÔNG — 5 instincts đều là technical pattern về codebase này, không tên người/path máy/secret. An toàn commit chung."
    owner: "closed"
missing_inputs: []
conflicts: []
assumptions:
  - "4 hook untracked đều executable (555) và không path máy — commit as-is được sau khi dọn blocker"
findings_extra:
  - "BLOCKER 1: scripts/.claude/tdd-session-state.json junk — xóa + ignore"
  - "BLOCKER 2: .claude/worktrees/ chưa gitignore — thêm ignore trước khi add .claude/"
  - "MINOR: load-workflow-context.sh thiếu exit 0 tường minh cuối file — fix 1 dòng cho nhất quán"
derisk_evidence_2026_07_20:
  - "CONFIRMED degrade-êm (chạy thật): cả 4 hook exit 0 với stdin rỗng VÀ JSON hỏng"
  - "CONFIRMED profile controls: CF_HOOK_PROFILE=minimal -> tdd-track/tdd-track-write/tdd-enforce đều exit 0 sớm"
  - "CONFIRMED tdd-enforce đúng design: production file thiếu test -> exit 2; file exempt (docs/*.md) -> exit 0"
  - "Hệ quả: AC-3/AC-4 của s04 đã có pre-evidence, s07 chỉ cần lặp lại làm evidence chính thức"
```

## Input Readiness
```yaml
status: READY
blocking_items: []
owner_actions:
  - "human: quyết OQ-1 (profile/opt-in) khi review option analysis s05"
  - "claude: draft s04 map SM-1..SM-5 + 2 blocker thành AC"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "3/4 OQ resolved bằng evidence đọc file thật; OQ-1 là design decision có đủ dữ kiện cho s05"
```

## Traceability
```yaml
upstream:
  - "claude-hooks-instincts-adoption.s01.restate.md"
  - "claude-hooks-instincts-adoption.s02.business-goal.md"
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Trạng thái readiness: READY — 2 blocker đã có cách xử lý rõ, OQ-1 chờ human ở s05.
- Điều cần làm để sang step 4: draft s04 AC + baseline; human pass Spec + DoR.
