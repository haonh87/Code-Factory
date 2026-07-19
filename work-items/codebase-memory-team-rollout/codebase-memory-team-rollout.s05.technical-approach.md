---
artifact_id: "codebase-memory-team-rollout.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "codebase-memory-team-rollout"
step_id: "s05"
step_slug: "technical-approach"
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
  approach:
    - "developer"
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
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-07-19"
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "codebase-memory-team-rollout.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Tóm tắt option được khuyến nghị, trade-off và boundary kỹ thuật cần giữ.

## Step Contract
```yaml
step_goal: "Chốt approach nhỏ nhất đủ đúng cho rollout: cơ chế chia sẻ config (OQ-2), command portable, vị trí docs (OQ-4), validation plan map AC-1..AC-7; human pass Approach để mở s06."
input_summary:
  - "s04 approved (Spec+DoR passed 2026-07-19): AC-1..AC-7, HARD AC-3/4/7"
  - "Facts đã xác minh: per-user approval bắt buộc; thiếu binary non-fatal; env expansion hỗ trợ ${VAR}; relative path trần không documented"
output_summary:
  - "Option analysis 3 phương án + recommended + trade-offs"
  - "Brownfield Impact Analysis + validation plan"
done_when:
  - "Có >= 2 option so sánh thật, 1 recommended có lý do, điều cần kiểm chứng rõ"
  - "Human pass Approach (role_signoffs.approach + gate_reviews)"
owner: "claude (draft) -> human (pass Approach)"
```

## Option Analysis
```yaml
options:
  - "OPT-A: Commit .mcp.json chung, command ${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/codebase-memory-mcp"
  - "OPT-B: Commit .mcp.json.example, teammate copy tay (opt-in, giữ guard git-ignore)"
  - "OPT-C: Commit .mcp.json chung, command npx -y codebase-memory-mcp@0.9.0"
recommended_option: "OPT-A"
trade_offs:
  - "Chấp nhận: server hiện 'failed' trong /mcp trên máy chưa install -> đổi lấy 1 nguồn sự thật config + onboard rẻ nhất (per-user approval đã là lớp opt-in sẵn)"
  - "Chấp nhận: KHÔNG dùng enabledMcpjsonServers pre-approve — nhỏ nhất đủ đúng, không mở surface settings.json; cân nhắc lại nếu team phàn nàn approval prompt"
  - "Loại OPT-B vì example và config thật dễ drift + thêm bước copy làm SM-1 sát trần (<=3 lệnh)"
  - "Loại OPT-C vì npx tải ~273MB im lặng lúc session start (cần network, chậm) và version pin nằm trong config chung"
```

### Option Details

**OPT-A — Commit .mcp.json chung với portable path (recommended)**
- Summary: rewrite command hiện tại (absolute path) thành `${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/codebase-memory-mcp`, gỡ guard `/.mcp.json` khỏi `.gitignore` trong cùng commit, commit config chung.
- Pros: onboard rẻ nhất — teammate chỉ cần npm install + index + restart/approve (SM-1 đạt); per-user approval của Claude Code là lớp opt-in sẵn, decline hợp lệ; thiếu binary non-fatal (AC-3 by design); không phụ thuộc network lúc chạy; 1 nguồn sự thật không drift.
- Cons: phải gỡ guard .gitignore (mitigation: cùng commit với đổi path, diff review được); máy chưa install thấy server failed trong /mcp (vô hại, có docs).
- Check before implement: V-1 — `${CLAUDE_PROJECT_DIR:-.}` expand đúng trong command của project .mcp.json trên máy này (docs xác nhận cơ chế expansion, chưa test path cụ thể); test TRƯỚC khi gỡ guard .gitignore.

**OPT-B — .mcp.json.example + copy tay (opt-in)**
- Summary: commit file example, giữ guard git-ignore cho .mcp.json thật, teammate tự copy khi muốn dùng.
- Pros: không đổi .gitignore; máy không muốn dùng sạch hoàn toàn (không cả trạng thái server failed).
- Cons: onboard thêm bước copy (+1 lệnh, SM-1 sát trần); example và config thật dễ drift; không có 1 nguồn sự thật — sửa config chung phải nhắc mọi người copy lại.
- Check before implement: như OPT-A về nội dung example.

**OPT-C — Commit .mcp.json chung với npx**
- Summary: như OPT-A nhưng command là `npx -y codebase-memory-mcp@0.9.0`.
- Pros: không cần bước npm install riêng (npx tự tải khi thiếu).
- Cons: lần đầu tải ~273MB im lặng khi session start, cần network, startup chậm; version pin nằm trong config chung — bump version phải sửa config; vẫn cần bước index thủ công nên không tiết kiệm lệnh như kỳ vọng.
- Check before implement: đo thời gian session start lần đầu nếu chọn.

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: ""
selected_stack: []
selected_runtime: []
decision_notes:
  - "Additive tooling config, không chạm architectural baseline (kế thừa verdict trial OQ-5)"
```

## Artifact Chính
```yaml
recommended_approach: >-
  OPT-A: commit .mcp.json chung với command ${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/codebase-memory-mcp,
  gỡ guard /.mcp.json khỏi .gitignore trong cùng commit; viết docs/codebase-memory.md
  (install 3 lệnh + approval + limitation guidance + re-index) và thêm 1 dòng pointer
  vào .claude/CLAUDE.md mục MCP Servers (chốt OQ-4).
why: >-
  Nhỏ nhất đủ đúng: đạt cả 7 AC với 3 file chạm (config, gitignore, docs) + 1 dòng pointer;
  không mở surface mới (không settings.json, không hook, không script); tận dụng approval
  mặc định của Claude Code làm lớp opt-in thay vì tự xây cơ chế.
boundaries:
  - "Chạm: .mcp.json (rewrite command portable), .gitignore (bỏ dòng /.mcp.json), docs/codebase-memory.md (mới), .claude/CLAUDE.md (1 dòng pointer)"
  - "Không chạm: production code, hooks, mcp/session-search, package.json/lockfile, settings.json"
risk_notes:
  - "V-1 fail (${CLAUDE_PROJECT_DIR} không expand như kỳ vọng) -> fallback npx (OPT-C) hoặc giữ example (OPT-B); quyết ở s07 với evidence, ghi deviation"
  - "Docs vị trí docs/ + pointer CLAUDE.md: teammate đọc CLAUDE.md mỗi session nên pointer là đủ discovery"
```

## Architecture Details
```yaml
domain_boundaries: []
integration_points:
  - "Claude Code project-scope MCP (.mcp.json root) — per-user approval flow"
  - "npm registry: codebase-memory-mcp@0.9.0 (pin version trong docs, install --no-save)"
data_or_runtime_notes:
  - "Graph DB per-machine tại ~/.cache/codebase-memory-mcp/ — không bao giờ vào repo"
  - "Re-index guidance: detect_changes trước khi tin graph; re-index khi changed_count lớn"
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - ".mcp.json (root): từ git-ignored absolute-path -> committed portable-path"
  - ".gitignore: bỏ guard /.mcp.json (giữ .codebase-memory/)"
  - "docs/: thêm codebase-memory.md; .claude/CLAUDE.md: +1 dòng pointer"
compatibility_risks:
  - "Máy anh (đang trial): config mới phải giữ tool hoạt động như cũ (AC-2 re-verify sau restart)"
  - "Máy teammate chưa install: server failed non-fatal (AC-3 HARD test mô phỏng)"
  - "wfc validate không đọc .mcp.json nhưng vẫn chạy trước/sau làm gate (AC-4 HARD)"
migration_notes:
  - "Không cần migration dữ liệu; index per-machine tự tạo khi teammate chạy lệnh index lần đầu"
rollback_notes:
  - "Revert 1 commit (config + gitignore + docs) -> về trạng thái trial git-ignored hiện tại (AC-7 HARD)"
  - "Tắt cá nhân không cần revert: disabledMcpjsonServers trong settings.local.json"
```

## Traceability
```yaml
upstream:
  - "codebase-memory-team-rollout.s04.acceptance-criteria.md (approved)"
  - "codebase-memory-team-rollout.s03.open-questions.md (OQ-2/OQ-4 resolve tại đây)"
next_step: "s06 Task Plan (execution-oriented: thứ tự file chạm + verify path per task; human pass Task Plan)"
```

## Handoff
- Recommended option: OPT-A — commit .mcp.json chung với ${CLAUDE_PROJECT_DIR:-.} path; docs tại docs/codebase-memory.md + pointer trong .claude/CLAUDE.md.
- Trade-off chấp nhận: server failed hiển thị trên máy chưa install; không pre-approve qua settings.
- Điều kiện sang step 6: human pass Approach (OQ-2 chốt = OPT-A, OQ-4 chốt = docs/ + pointer); V-1 là verify bắt buộc đầu s07.
- Deployment note khi có: không deploy — thay đổi config trong repo, hiệu lực khi teammate pull + restart session.
