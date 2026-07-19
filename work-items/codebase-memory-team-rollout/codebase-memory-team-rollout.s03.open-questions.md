---
artifact_id: "codebase-memory-team-rollout.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "codebase-memory-team-rollout"
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
  - "codebase-memory-team-rollout.s01.restate.md"
  - "codebase-memory-team-rollout.s02.business-goal.md"
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
step_goal: "Resolve hoặc gán owner cho OQ-1..OQ-4 từ s01, bổ sung finding mới, chốt readiness verdict để sang s04."
input_summary:
  - "s01: OQ-1 (thiếu binary), OQ-2 (commit vs opt-in), OQ-3 (version mới), OQ-4 (vị trí docs)"
  - "Điều tra 2026-07-19: npm registry + config trial hiện tại"
output_summary:
  - "OQ status + owner + finding mới (absolute path không commit được)"
  - "Input Readiness verdict"
done_when:
  - "Không còn OQ nào chặn s04 mà thiếu owner hoặc verify path"
owner: "claude (điều tra + draft) -> human (quyết OQ-2/OQ-4 ở s05)"
```

## Artifact Chính
```yaml
open_questions:
  - id: OQ-1
    question: "Claude Code xử lý thế nào khi .mcp.json trỏ binary chưa install trên máy teammate?"
    status: PARTIALLY_RESOLVED
    finding: >-
      Hành vi đã biết của Claude Code: MCP server spawn fail là non-fatal — server hiện
      failed trong /mcp, tool không xuất hiện, session và các tool khác chạy bình thường.
      Chưa có test mô phỏng trực tiếp trên repo này.
    verify_path: "s07/s08: test mô phỏng (đổi command sang path không tồn tại -> restart -> session vẫn hoạt động, wfc validate PASS) — map vào SM-3"
    owner: "claude (test ở delivery)"
  - id: OQ-2
    question: "Commit .mcp.json chung hay dùng .mcp.json.example + copy opt-in?"
    status: OPEN_FOR_S05
    finding: >-
      FINDING MỚI (2026-07-19): .mcp.json trial hiện dùng ABSOLUTE PATH đặc thù máy
      (/Users/haonguyen87/.../node_modules/.bin/codebase-memory-mcp) — không commit as-is
      được. Mọi option ở s05 đều phải đổi sang relative path hoặc npx.
    owner: "human quyết ở s05 (option analysis: commit chung vs example opt-in)"
  - id: OQ-3
    question: "Có version codebase-memory-mcp mới hơn 0.9.0 fix depth>1 không?"
    status: RESOLVED
    finding: >-
      npm registry 2026-07-19: 0.9.0 là latest (publish 2026-07-08). Chưa có fix.
      Limitation depth>1 giữ nguyên trong guidance; file issue upstream là follow-up
      tùy chọn, không chặn rollout.
    owner: "closed"
  - id: OQ-4
    question: "Hướng dẫn install + guidance đặt ở đâu?"
    status: OPEN_FOR_S05
    finding: "Ứng viên: docs/ (research note đã ở đó), README trong mcp/, hoặc ONBOARDING. Đề xuất sơ bộ: docs/ + pointer từ .claude/CLAUDE.md mục MCP Servers."
    owner: "human quyết ở s05 (đi cùng option OQ-2)"
missing_inputs: []
conflicts: []
assumptions:
  - "Teammate dùng darwin/macOS hoặc platform có binary npm tương ứng (binary per-platform do package cung cấp)"
  - "npm install --no-save (hoặc tương đương) vẫn là cách cài không đụng lockfile"
```

## Input Readiness
```yaml
status: READY
blocking_items: []
owner_actions:
  - "human: quyết OQ-2 + OQ-4 khi review option analysis ở s05 (không chặn s04)"
  - "claude: draft s04 acceptance criteria map SM-1..SM-5"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "OQ-3 resolved bằng evidence npm registry; OQ-1 có verify path rõ ở delivery; OQ-2/OQ-4 là design decision thuộc s05, không chặn readiness"
  - "Finding absolute-path là constraint cứng mới cho s05 — đã ghi vào OQ-2"
```

## Traceability
```yaml
upstream:
  - "codebase-memory-team-rollout.s01.restate.md"
  - "codebase-memory-team-rollout.s02.business-goal.md"
next_step: "s04 Acceptance + DoR (map SM-1..SM-5 thành AC đo được; human pass Spec + DoR)"
```

## Handoff
- Trạng thái readiness: READY — không OQ nào chặn s04; OQ-2/OQ-4 chờ human quyết ở s05 qua option analysis.
- Điều cần làm để sang step 4: draft s04 acceptance criteria + Existing System Baseline (brownfield), rồi human pass Spec + DoR.
