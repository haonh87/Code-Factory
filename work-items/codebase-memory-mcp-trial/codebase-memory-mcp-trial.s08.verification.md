---
artifact_id: "codebase-memory-mcp-trial.s08.verification"
artifact_family: workflow-step
work_item_slug: "codebase-memory-mcp-trial"
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
verification_owner: "claude (evidence) -> human (DoD verdict)"
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
  dod_reviewed_at: "2026-07-17"
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
  - "codebase-memory-mcp-trial.s07.implementation.md"
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
step_goal: "Verify AC-1..AC-8 với evidence (đặc biệt AC-2 sau restart session), chốt regression/compatibility, đề xuất DoD verdict cho human pass."
input_summary:
  - "s07: T-1..T-5 DONE, AC scoreboard (AC-2 PENDING chờ restart, AC-5 fail marginal)"
  - "s04: AC-1..AC-8 với HARD gate AC-3/AC-7/AC-8"
  - "Session mới 2026-07-17 sau restart: MCP tool codebase-memory đã load"
output_summary:
  - "AC scoreboard cuối: 6 PASS, 1 FAIL marginal (AC-5), 1 NOT_REQUIRED (AC-7)"
  - "Regression & Compatibility Summary (brownfield bắt buộc)"
  - "DoD proposal PARTIAL — chờ human verdict + quyết định giữ/dọn trial"
done_when:
  - "AC-2 verified trong session Claude Code thật (không chỉ stdio handshake)"
  - "wfc validate re-run PASS khớp baseline 60+56"
  - "Encoding UTF-8 check pass cho note thay đổi"
  - "Human pass DoD (ghi role_signoffs.dod + gate_reviews.dod_reviewed_by/at)"
owner: "claude (evidence) -> human (pass DoD)"
```

## Artifact Chính
```yaml
verification_scope:
  - "AC-1..AC-8 theo s04 acceptance-criteria"
  - "Regression: wfc validate baseline 60 files + 56 notes"
  - "Repo hygiene: không leak binary/snapshot/.mcp.json vào git"
evidence_refs:
  - "AC-1 PASS (s07 T-2): index exit 0, nodes=4740 edges=6252, status=indexed; DB tại ~/.cache ngoài repo"
  - "AC-2 PASS (s08, 2026-07-17, session mới sau restart): 14 MCP tool codebase-memory available trong session Claude Code; gọi list_projects trả đúng project Code-Factory (4740 nodes/6252 edges, branch main, HEAD 3447969); index_status = ready; không lỗi connect"
  - "AC-3 HARD PASS (re-run s08 2026-07-17): 'OK: validated workflow naming (60 files) and governance (56 notes)' — khớp baseline T-1, không lệch"
  - "AC-4 PASS (re-confirm s08 qua MCP tool thật): trace_path getRuntimeContext depth 1 trả 8 callees + 3 callers, khớp 100% với ground truth grep/read của T-4 (assertBundleSources, collectSourceSkills, getBundlePaths, loadBundleManifest, normalizeSingleValue, resolveRepoRoot, resolveRuntimeHome, resolveRuntimeMode / applyInstallOrUpdate, applySkillsAction, runCli)"
  - "AC-5 FAIL marginal (s07 T-4): token MCP 578 > manual 527 (~10%) cho query single-hop; nguyên nhân qualified_name dài ~120 chars × 11 nodes; kỳ vọng đảo chiều với query depth 2+ — chưa đo, residual"
  - "AC-6 PASS (s07 T-4): tool call MCP = 1 <= manual = 3"
  - "AC-7 NOT_REQUIRED: OPT-B không cài hook PreToolUse (chốt ở s05)"
  - "AC-8 HARD PASS (s07 T-5): rollback 1 bước xóa entry .mcp.json -> wfc validate PASS lại baseline; entry đã khôi phục chờ verdict"
  - "Encoding check s08 (2026-07-17): s07 + s08 note UTF-8 valid, không ký tự lỗi"
  - "Repo hygiene s08 (2026-07-17): .mcp.json git-ignored (.gitignore:23), git status không leak binary/snapshot/node_modules; chỉ work-items/ (canonical artifact) untracked"
  - "Human verdict (2026-07-17): chấp nhận AC-5 fail marginal như known limitation của query single-hop (business goal chính đã đạt); pass DoD; quyết định GIỮ entry codebase-memory trong .mcp.json"
summary_verdict: PARTIAL
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md (governance_profile=default)"
checks:
  - "HARD gate AC-3: wfc validate PASS trước/sau/re-run — behavioral invariant 'wfc validate behavior không đổi' giữ vững"
  - "HARD gate AC-8: rollback path đã test PASS, 1 bước, không side effect"
  - "AC-7 NOT_REQUIRED hợp lệ theo OPT-B (không hook) — không phải bypass gate"
  - "Behavioral invariants s04 giữ đủ: validator không đổi, không sửa production code, không binary/snapshot commit"
  - "Encoding UTF-8 pass cho file .md tiếng Việt thay đổi (Cổng Chất Lượng)"
  - "TDD NOT_REQUIRED: tooling/config trial, không behavior change production (evidence s07)"
  - "Worktree NOT_REQUIRED có lý do ghi rõ ở s07 (ít file, 1 session, MCP config session-level)"
blocking_items: []
owner: "human (qc/po)"
next_action: "DONE — DoD passed 2026-07-17, giữ entry .mcp.json; không còn action bắt buộc"
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
notes:
  - "Regression: wfc validate 60+56 không đổi qua toàn bộ trial (T-1 baseline, T-3 sau enable, T-5 sau rollback/khôi phục, s08 re-run)"
  - "Compatibility: codebase-memory chạy song song mcp/session-search không xung đột (stdio riêng process); SessionStart/TDD hooks hoạt động bình thường trong session mới"
  - "Rollback: 1 bước xóa entry codebase-memory trong .mcp.json (đã test PASS ở T-5)"
```

## Scan Summary
```yaml
status: PASS
notes:
  - "Scope không chạm production code — thay đổi chỉ gồm .gitignore (+2 dòng) và .mcp.json (git-ignored, config trial)"
  - "Security: npm install chính chủ DeusData/codebase-memory-mcp@0.9.0 MIT, 0 vulnerabilities, --no-save không đổi lockfile; không curl|bash; không API key/secret trong config"
  - "Không cần code scan 4 lane đầy đủ: không có diff code production để scan"
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "Trial cục bộ không deploy (approval_gates.uat=not_applicable, chốt từ s04)"
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "Không promote môi trường nào (approval_gates.release=not_applicable)"
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "Trial nội bộ agent-ops (approval_gates.business_acceptance=not_applicable)"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "Step goal s08 đạt đủ: AC-2 verified trong session thật, AC-3 re-run PASS, encoding + hygiene check PASS"
  - "AC-5 FAIL marginal đã có human verdict chấp nhận làm known limitation (2026-07-17); DoD gate đã được human pass explicit (role_signoffs.dod + gate_reviews)"
  - "Traceability đủ: business goal (s02 token/tool-call metric) -> AC (s04) -> OPT-B (s05) -> T-1..T-5 (s07) -> evidence (s08)"
```

## Definition of Done
```yaml
status: DONE
dod_passed_by: "human (qc/po), 2026-07-17 — chấp nhận AC-5 residual làm known limitation, giữ entry .mcp.json"
residual_risks:
  - "ACCEPTED — AC-5 fail marginal (~10% token cao hơn) chỉ đo 1 query single-hop; query depth 2+/cross-file chưa đo (có thể đo trong quá trình dùng thực tế)"
  - "Markdown/skill .md không có LSP type-resolution — call graph chỉ đúng cho JS/TS, giới hạn đã biết"
  - "Trial cục bộ: teammate không thấy MCP config; rollout team-wide là work item riêng (out_of_scope)"
  - "Index gắn với HEAD 3447969 — code mới sau đó cần re-index (detect_changes/index_repository) trước khi tin kết quả graph"
owners:
  - "human (qc/po): đã pass DoD 2026-07-17; residual risks accepted"
```

## Traceability
```yaml
upstream:
  - "codebase-memory-mcp-trial.s07.implementation.md (T-1..T-5 + AC scoreboard)"
  - "codebase-memory-mcp-trial.s04.acceptance-criteria.md (AC-1..AC-8)"
  - "codebase-memory-mcp-trial.s02.business-goal.md (success metrics)"
next_step: "Work item DONE (DoD passed 2026-07-17). Follow-up nếu muốn: work item riêng cho rollout team-wide hoặc đo benchmark đa-query."
```

## Handoff
- Overall status: DONE — DoD passed bởi human (qc/po) 2026-07-17. 6/8 AC PASS (gồm cả HARD gate AC-3/AC-8, AC-7 not-required), AC-2 verified trong session mới sau restart; AC-5 FAIL marginal được human chấp nhận làm known limitation.
- Residual risks (accepted): AC-5 chưa đo query sâu; Markdown không LSP; trial cục bộ không team-wide; index gắn HEAD 3447969 (cần re-index khi code đổi).
- Decision: GIỮ entry codebase-memory trong .mcp.json (git-ignored) để dùng tiếp; rollback path 1 bước vẫn sẵn sàng nếu muốn dọn sau.
- Release recommendation khi có: NOT_APPLICABLE (trial cục bộ, không release).
- Next action: không còn action bắt buộc. Optional follow-up: (1) work item rollout team-wide, (2) đo AC-5 với query depth 2+ trong quá trình dùng thực tế.
