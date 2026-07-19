---
artifact_id: "codebase-memory-team-rollout.s08.verification"
artifact_family: workflow-step
work_item_slug: "codebase-memory-team-rollout"
step_id: "s08"
step_slug: "verification"
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
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod:
    - "qc"
    - "po"
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
  dod_reviewed_by:
    - "qc"
    - "po"
  dod_reviewed_at: "2026-07-19"
content_skills:
  - "codex-workflow-chain"
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "codebase-memory-team-rollout.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Tóm tắt kết quả verify, governance compliance, residual risk và kết luận DoD.

## Step Contract
```yaml
step_goal: "Verify AC-1..AC-7 với evidence (AC-2 sau restart), Regression & Compatibility Summary, đề xuất DoD verdict cho human pass."
input_summary:
  - "s07: T-1..T-5 DONE (commit 51ff5e7), AC-2 pending restart"
  - "Session mới 2026-07-19 sau restart: config portable path đã commit"
output_summary:
  - "AC scoreboard cuối: 7/7 PASS (3 HARD gate pass)"
  - "DoD proposal — chờ human verdict"
done_when:
  - "AC-2 verified session thật; wfc validate re-run PASS; human pass DoD"
owner: "claude (evidence) -> human (pass DoD)"
```

## Artifact Chính
```yaml
verification_scope:
  - "AC-1..AC-7 theo s04 (HARD: AC-3/AC-4/AC-7)"
  - "Regression: wfc validate 68+64; repo hygiene"
evidence_refs:
  - "AC-1 PASS (s07 T-1/T-4): command ${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/codebase-memory-mcp; grep không /Users/|$HOME; JSON parse OK; claude mcp list ✔ Connected"
  - "AC-2 PASS (s08, 2026-07-19, session mới sau restart với config ĐÃ COMMIT): tool codebase-memory available; list_projects trả đúng project (4844 nodes, HEAD 006dc74 — index tự refresh incremental); trace_path getRuntimeContext depth 1 = 8 callees + 3 callers khớp evidence trial; không lỗi connect"
  - "AC-3 HARD PASS (s07 T-2): command trỏ path không tồn tại -> claude mcp list ✘ Failed to connect, không crash, session hiện hành + MCP tool không ảnh hưởng; khôi phục -> ✔ Connected"
  - "AC-4 HARD PASS (s07 T-4 + re-run s08): wfc validate 68+64 trước/sau gỡ guard khớp; re-run sau T-6 vẫn PASS"
  - "AC-5 PASS (s07 T-3): docs 3 lệnh copy-paste, lệnh index dry-run exit clean 4831 nodes; bước approval prompt + opt-out có trong docs. Residual: dry-run trên máy đã có binary, chưa test máy fresh 100%"
  - "AC-6 PASS (s07 T-3): limitation guidance đầy đủ trong docs/codebase-memory.md — depth>1 import boundary + workaround re-trace per-function (link research note), Markdown không LSP, detect_changes/re-index"
  - "AC-7 HARD PASS (s07 T-5): rollback rehearsal trong worktree tạm — revert --no-commit áp sạch, guard /.mcp.json khôi phục, .mcp.json + docs rời index, wfc validate PASS trạng thái revert; worktree removed sạch"
  - "Encoding UTF-8 PASS cho mọi file .md thay đổi (docs, CLAUDE.md, note s01-s08)"
summary_verdict: PASS
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md (governance_profile=default)"
checks:
  - "3 HARD gate AC-3/AC-4/AC-7 đều PASS có evidence tái lập được"
  - "Behavioral invariants giữ đủ: validator không đổi, session không bị block bởi MCP config, không production code sửa behavior, không binary/snapshot/lockfile-entry vào repo"
  - "Review 2 tầng đã chạy trong s07 (bắt + fix 1 lỗi scope thật ở T-4)"
  - "TDD/worktree/subagent verdict đúng như s06 chốt, có lý do ghi trong Delivery Rule Evidence"
blocking_items: []
owner: "human (pass DoD)"
next_action: "DONE — DoD passed 2026-07-19"
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
notes:
  - "Regression: wfc validate 68+64 không đổi qua toàn bộ chain (baseline s07, sau gỡ guard, trong revert rehearsal, sau restart s08)"
  - "Compatibility: máy đang dùng (máy này) — tool hoạt động với config mới sau restart (AC-2); máy thiếu binary — failed non-fatal (AC-3); teammate decline approval — hợp lệ"
  - "Rollback: 1 revert commit 51ff5e7 (đã rehearse); cá nhân opt-out qua disabledMcpjsonServers"
```

## Scan Summary
```yaml
status: PASS
notes:
  - "Không diff code production — thay đổi gồm config JSON, .gitignore, 2 file docs"
  - "Security: không secret trong .mcp.json; version pin 0.9.0 chính chủ trong docs; không curl|bash"
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "approval_gates.uat=not_applicable (chốt từ s04); teammate onboard thực tế là feedback loop sau rollout"
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "Không promote môi trường; hiệu lực khi teammate pull + restart"
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: []
```

## Audit
```yaml
audit_status: PASS
notes:
  - "Step goal đạt: 7/7 AC PASS có evidence, regression/compatibility/rollback đủ"
  - "Traceability đủ: user problem (s02) -> SM-1..SM-5 -> AC-1..AC-7 (s04) -> OPT-A (s05) -> T-1..T-6 (s06/s07) -> evidence (s08)"
  - "DoD verdict thuộc human (rule Không Tự Tuyên Bố Done)"
```

## Definition of Done
```yaml
status: DONE
dod_passed_by: "human (qc/po), 2026-07-19 — accept 2 residual risks bên dưới"
residual_risks:
  - "AC-5 dry-run trên máy đã có binary — máy fresh chưa test 100%; mitigation: lệnh copy-paste nguyên văn + AC-3 đảm bảo worst case vô hại; teammate đầu tiên onboard là verify thực tế"
  - "Limitation depth>1 tồn tại đến khi upstream fix (0.9.0 latest); guidance đã có, follow-up tùy chọn: file issue DeusData/codebase-memory-mcp"
owners:
  - "human (qc/po): đã pass DoD 2026-07-19; residual accepted"
```

## Traceability
```yaml
upstream:
  - "codebase-memory-team-rollout.s07.implementation.md"
  - "codebase-memory-team-rollout.s04.acceptance-criteria.md"
next_step: "Work item DONE (DoD passed 2026-07-19)"
```

## Handoff
- Overall status: DONE — DoD passed bởi human (qc/po) 2026-07-19. 7/7 AC PASS (3 HARD gate pass), verification verdict PASS.
- Residual risks: máy fresh chưa test 100% (mitigated); depth>1 chờ upstream.
- Recommendation: pass DoD, đóng work item; thông báo team pull + đọc docs/codebase-memory.md; follow-up tùy chọn: file issue upstream về import-boundary.
- Release recommendation khi có: NOT_APPLICABLE.
- Next action: không còn action bắt buộc. Thông báo team: pull + đọc docs/codebase-memory.md. Follow-up tùy chọn: file issue upstream về import-boundary depth>1.
