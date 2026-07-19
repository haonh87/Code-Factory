---
artifact_id: "codebase-memory-team-rollout.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "codebase-memory-team-rollout"
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
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "po"
  contract: []
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
  spec_reviewed_at: "2026-07-19"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "po"
  dor_reviewed_at: "2026-07-19"
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
  - "codebase-memory-team-rollout.s01.restate.md"
  - "codebase-memory-team-rollout.s02.business-goal.md"
  - "codebase-memory-team-rollout.s03.open-questions.md"
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
step_goal: "Chốt acceptance criteria đo được (map SM-1..SM-5 + risk mitigations đã xác minh), Existing System Baseline, DoR verdict; human pass Spec + DoR để mở s05."
input_summary:
  - "s02: SM-1..SM-5; s03: OQ-3 resolved, OQ-1 de-risked, OQ-2/OQ-4 chờ s05"
  - "De-risk 2026-07-19: Claude Code docs (per claude-code-guide) — thiếu binary là non-fatal; project .mcp.json cần per-user approval; env expansion ${VAR} được hỗ trợ; relative path không documented"
  - "Test thật: detect_changes phát hiện 46 file đổi/556 impacted symbols kể từ HEAD đã index"
output_summary:
  - "AC-1..AC-7 đo được + edge cases + behavioral invariants"
  - "Existing System Baseline (brownfield) + governance checks + DoR verdict"
done_when:
  - "AC map đủ SM-1..SM-5 và 4 rủi ro R1-R4 đều có AC hoặc invariant tương ứng"
  - "Human pass Spec + DoR (role_signoffs.spec/dor + gate_reviews)"
owner: "claude (draft) -> human (pass Spec + DoR)"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "codebase-memory-team-rollout.s01.restate.md (human confirmed 2026-07-18)"
  - "codebase-memory-team-rollout.s02.business-goal.md (SM-1..SM-5)"
decision_notes:
  - "Spec = restate + business-goal + OQ resolved (sdd_mode=none, không BRD/SRS)"
  - "Spec pass khi human review s01-s04 và chốt acceptance_criteria"
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
ux_contract_refs: []
notes:
  - "Rollout chỉ chạm config + docs, không API/UX contract"
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - ".mcp.json root (git-ignored, .gitignore:23): 1 server codebase-memory, command ABSOLUTE PATH đặc thù máy"
  - ".gitignore: guard /.mcp.json + .codebase-memory/ (từ trial)"
  - "Binary: npm install --no-save codebase-memory-mcp@0.9.0 (không vào lockfile); index tại ~/.cache/codebase-memory-mcp/"
  - "wfc validate baseline hiện tại: PASS 68 files + 64 notes"
  - "Trial DONE: depth-1 đúng (AC-4/AC-6), depth>1 đứt ở import boundary (docs/research/codebase-memory-depth2-measurement.md)"
impacted_surfaces:
  - ".mcp.json: chuyển thành file commit chung (hoặc .example) với command portable"
  - ".gitignore: gỡ guard /.mcp.json nếu chọn commit chung (cùng commit với thay path)"
  - "Docs: hướng dẫn install + approve + limitation guidance (vị trí chốt ở s05, OQ-4)"
  - "Tùy chọn theo s05: .claude/settings.json enabledMcpjsonServers để pre-approve"
compatibility_constraints:
  - "wfc validate PASS trước/sau (gate cứng kế thừa trial)"
  - "Máy thiếu binary: session bình thường, server chỉ failed trong /mcp (hành vi Claude Code đã xác minh qua docs)"
  - "Không đổi production behavior code; không đụng mcp/session-search"
rollback_constraints:
  - "Rollback 1 bước: revert commit config+gitignore -> trạng thái trial (git-ignored) như hiện tại"
  - "Teammate muốn tắt riêng: disabledMcpjsonServers trong settings.local.json (không cần revert chung)"
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: AC-1
    criterion: "Config MCP chia sẻ không chứa path đặc thù máy (SM-2, mitigation R2)"
    measure: "grep .mcp.json không có /Users/ hay $HOME literal; command dùng ${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/... hoặc npx; JSON parse OK"
  - id: AC-2
    criterion: "Máy CÓ binary: sau restart + approve, MCP tool codebase-memory available và query trả kết quả đúng"
    measure: "Gọi list_projects/index_status trả kết quả không lỗi connect (lặp lại phép verify AC-2 của trial trên config mới)"
  - id: AC-3
    criterion: "Máy KHÔNG có binary: session hoạt động bình thường (SM-3, mitigation R1)"
    measure: "Test mô phỏng: command trỏ path không tồn tại -> restart -> server failed trong /mcp nhưng tool khác + workflow chạy bình thường, không popup lỗi lặp"
    gate: HARD
  - id: AC-4
    criterion: "wfc validate PASS trước và sau mọi thay đổi config/gitignore (SM-5)"
    measure: "Output OK cả 2 lần, số files/notes chỉ tăng theo artifact chủ đích, không lệch bất ngờ"
    gate: HARD
  - id: AC-5
    criterion: "Hướng dẫn onboarding đủ để teammate tự setup (SM-1)"
    measure: "Docs liệt kê <= 3 lệnh (install binary, index, restart+approve) + bước approval prompt; dry-run theo docs từ đầu hoàn thành không cần hỏi thêm"
  - id: AC-6
    criterion: "Limitation guidance có mặt trong tài liệu chung (SM-4, mitigation R4)"
    measure: "Docs ghi rõ: depth>1 đứt ở import boundary (kèm workaround re-trace per-function), Markdown không LSP, re-index/detect_changes khi code đổi (mitigation R3, đã test 2026-07-19)"
  - id: AC-7
    criterion: "Rollback path hoạt động (kế thừa trial)"
    measure: "Revert commit config -> wfc validate PASS lại; hoặc teammate tắt riêng qua disabledMcpjsonServers"
    gate: HARD
edge_cases:
  - "Teammate decline approval prompt -> server không chạy, session bình thường (chấp nhận, opt-in)"
  - "npx path: lần chạy đầu tải package (chậm + cần network) -> nếu chọn npx phải ghi rõ trade-off trong s05"
  - "Env var ${VAR} thiếu không có default -> config vẫn load, chỉ warning + connect error (không block session)"
  - "Workspace chưa trust -> enabledMcpjsonServers bị bỏ qua tới khi trust (nếu s05 dùng pre-approve)"
out_of_scope:
  - "CI/CD, hook auto-intercept, fix upstream depth>1, commit binary/snapshot, benchmark đa-query (non-goals s02)"
done_when:
  - "AC-1..AC-7 measure PASS (AC-3/AC-4/AC-7 HARD)"
  - "DoD pass ở s08 (không tuyên bố done ở s07)"
behavioral_invariants:
  - "wfc validate behavior không đổi"
  - "Session không bao giờ bị block bởi MCP config, kể cả máy thiếu binary"
  - "Không production code bị sửa behavior; không binary/snapshot/lockfile-entry vào repo"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md (governance_profile=default)"
checks:
  - "Spec gate: s01-s03 đủ + AC đo được -> required"
  - "Contract/Foundation/UAT/Release/Business gate: not_applicable (config+docs, additive tooling, không deploy)"
  - "Brownfield: Existing System Baseline đủ current_behavior + impacted + compatibility + rollback"
  - "TDD: config+docs, không behavior change production -> NOT_REQUIRED; verify path = AC measures"
  - "Security: giữ npm chính chủ 0.9.0; không secret trong .mcp.json commit chung"
  - "Encoding UTF-8 cho file .md tiếng Việt (Cổng Chất Lượng)"
blocking_items: []
owner: "human (pass Spec + DoR)"
next_action: "human review AC-1..AC-7 + baseline -> pass Spec + DoR -> mở s05 (option analysis OQ-2/OQ-4)"
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners:
  - "human: pass Spec gate (review s01-s04)"
  - "human: pass DoR gate (review governance checks + baseline)"
  - "claude: propose s05 option analysis sau khi DoR pass"
notes:
  - "4 rủi ro s01 đều đã de-risk có evidence: R1 (docs Claude Code), R2 (AC-1 + rollback), R3 (detect_changes test PASS), R4 (đo depth-2 + guidance AC-6)"
  - "OQ-2 (commit vs example) + OQ-4 (vị trí docs) là design decision ở s05, không chặn DoR"
  - "DoR READY nhưng CHƯA PASS — cần human explicit approval trước khi mở s05"
```

## Traceability
```yaml
upstream:
  - "codebase-memory-team-rollout.s01.restate.md"
  - "codebase-memory-team-rollout.s02.business-goal.md"
  - "codebase-memory-team-rollout.s03.open-questions.md"
  - "docs/research/codebase-memory-depth2-measurement.md"
next_step: "s05 Technical Approach (option analysis: commit chung vs example opt-in; vị trí docs; pre-approve hay không)"
```

## Handoff
- Criteria bắt buộc: AC-1..AC-7, HARD gate AC-3 (máy thiếu binary không bị ảnh hưởng), AC-4 (wfc validate trước/sau), AC-7 (rollback).
- Edge case phải giữ: decline approval hợp lệ; npx trade-off; env var thiếu chỉ warning; workspace trust điều kiện của pre-approve.
- Điều kiện sang step 5: human pass Spec + DoR, cập nhật role_signoffs.spec/dor + gate_reviews tương ứng.
