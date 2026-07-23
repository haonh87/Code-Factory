---
title: Skill Pack Review 2026-07-23
date: 2026-07-23
tags:
  - audit/workflow-pack
  - codex/skills
  - review
status: resolved
bundle_version: 2.3.0
---

# Skill Pack Review 2026-07-23

> [!danger] Kết luận (tại thời điểm audit)
> Bộ skill có nền tảng và mapping workflow tốt, nhưng chưa nên publish hoặc update runtime. Trạng thái audit hiện tại là `FAIL` do còn lỗi YAML frontmatter, audit gate không đáng tin cậy và cross-reference DevOps không resolve trong runtime phẳng.

> [!success] Cập nhật 2026-07-23 — đã xử lý
> Bảy finding bên dưới đã được sửa và verify. Chi tiết resolution + evidence ở report sau khi sửa: `docs/skill-pack-audit-report-2026-07-23-post-fix.md`. Node audit mới (`npm run validate:workflow:pack-audit`) trả `WORKFLOW_PACK_AUDIT=PASS`. Lưu ý: khuyến nghị MEDIUM-01 gốc dùng `../` cho toàn bộ 10 reference chưa chính xác — 6 reference nằm trong `references/` cần `../../` (đã sửa đúng theo độ sâu). Phần findings bên dưới giữ nguyên làm lịch sử.

## Phạm Vi

- Toàn bộ `skills/`.
- `policies/codex/AGENTS.global.md`.
- `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`.
- Runtime mirror Codex và Claude trong `packages/workflow-bundle/runtime/`.
- Audit tooling và báo cáo audit hiện có.
- Trạng thái bundle đang cài trong Codex global runtime.

## Tóm Tắt Kết Quả

| Hạng mục | Kết quả | Bằng chứng chính |
|---|---|---|
| Skill inventory | PASS | 37 `SKILL.md`, tên duy nhất, folder khớp `name` |
| YAML frontmatter | FAIL | 3 file không parse được bằng YAML chuẩn |
| Audit script | FAIL | Logic hiện tại sẽ trả 37/37 frontmatter `FAIL` |
| Workflow mapping | PASS | Mapping, template và schema step 5/7/8 đầy đủ |
| Governance authority | PASS có lưu ý | 17 Hard Rule được phủ bởi 15 rule trong chain và 2 rule trong router |
| Runtime cross-reference | FAIL | 10 reference DevOps EN/VI thiếu `../` |
| Runtime mirror | PASS | Source skills khớp mirror Codex và Claude |
| Bundle smoke | PASS | `npm run validate:workflow:bundle-smoke` |
| Unit tests | PASS | 25 workflow-bundle unit test files pass |
| Installed runtime | WARN | Source `2.3.0`, global runtime `2.2.1`, managed 36/37 skill |

## Findings Theo Mức Độ Ưu Tiên

### HIGH-01 — YAML Frontmatter Không Hợp Lệ

Ba file có plain scalar `description` chứa dấu `: ` nhưng không được quote hoặc chuyển sang block scalar:

- `skills/delivery/code-scan-review/SKILL.md:4`
- `skills/orchestration/codex-workflow-chain/SKILL.md:4`
- `skills/guardrails/karpathy-coding-discipline/SKILL.vi.md:3`

Ảnh hưởng:

- Parser YAML chuẩn từ chối các frontmatter này.
- Bundle installer hiện dò skill theo tên folder nên smoke test vẫn pass và không phát hiện lỗi.
- Runtime hoặc công cụ publish dùng YAML parser chuẩn có thể bỏ qua hoặc từ chối skill.

Khuyến nghị:

- Quote toàn bộ `description`, hoặc dùng YAML folded block scalar `>-`.
- Thêm một YAML parse check thực sự vào audit gate.

### HIGH-02 — Audit Script False-Fail Toàn Bộ Skill

Tại `skills/guardrails/workflow-pack-audit/scripts/audit-workflow-pack.ps1:44`, regex yêu cầu:

```text
---
name: ...
description: ...
---
```

Repo hiện cho phép `language` nằm trước, giữa hoặc sau `name` và `description`. Kiểm tra tương đương 1:1 với logic PowerShell cho kết quả:

```yaml
skill_files: 37
parsed_by_current_regex: 0
invalid_frontmatter: 37
equivalent_overall: FAIL
```

Script còn thiếu check so sánh Hard Rule dù checklist yêu cầu tại `skills/guardrails/workflow-pack-audit/references/checklist.md`, mục `Script And Automatic Checks`.

Khuyến nghị:

- Parse frontmatter bằng YAML thay vì regex phụ thuộc thứ tự field.
- Không hạ lỗi regex hiện tại thành `WARN`; cần sửa nguyên nhân.
- Bổ sung kiểm tra Hard Rule, cross-reference runtime và YAML validity.
- Thêm test fixture cho field-order variation và description chứa dấu `:`.

### MEDIUM-01 — Cross-Reference DevOps Không Resolve Trong Flat Runtime

Các reference chéo đang dùng dạng:

```text
deployment-devops/references/promotion-flow.md
ci-cd-release/references/promotion-controls.md
```

Khi mỗi skill được cài vào `~/.codex/skills/<skill-name>/`, path phải dùng sibling traversal:

```text
../deployment-devops/references/promotion-flow.md
../ci-cd-release/references/promotion-controls.md
```

Các vị trí bị ảnh hưởng:

- `skills/delivery/ci-cd-release/SKILL.md`
- `skills/delivery/ci-cd-release/SKILL.vi.md`
- `skills/delivery/ci-cd-release/references/promotion-controls.md`
- `skills/delivery/ci-cd-release/references/promotion-controls.vi.md`
- `skills/delivery/deployment-devops/SKILL.md`
- `skills/delivery/deployment-devops/SKILL.vi.md`
- `skills/delivery/deployment-devops/references/promotion-flow.md`
- `skills/delivery/deployment-devops/references/promotion-flow.vi.md`

Tổng cộng có 10 lần tham chiếu không resolve.

### MEDIUM-02 — Báo Cáo Audit Cũ Overstate Trạng Thái PASS

`docs/skill-pack-audit-report.md` và bản `.vi.md` có các điểm không khớp với hành vi thực tế:

- Ghi 36 skill trong khi source hiện có 37.
- Diễn giải kết quả frontmatter là 37 `WARN`, nhưng script thực tế cộng vào `failCount` và thoát mã 1.
- Tuyên bố không có cross-reference gãy nhưng chỉ kiểm tra path bắt đầu trực tiếp bằng `references/`, bỏ sót cross-skill path.
- Kết luận `PASS` dù audit entrypoint hiện không thể pass trên source tree.

Khuyến nghị:

- Giữ báo cáo cũ làm lịch sử.
- Sau khi sửa các finding, chạy lại audit và ghi một report mới thay vì chỉnh nghĩa của bằng chứng cũ.

### MEDIUM-03 — Checklist Và Hard Rule Reference Chưa Hoàn Toàn Nhất Quán

Kết quả so sánh:

```yaml
policy_hard_rules: 17
codex_workflow_chain_rules: 15
workflow_governance_router_rules: 2
workflow_chain_reference_rules: 15
missing_from_skill_union: []
missing_from_workflow_chain_reference:
  - Router Before Action
  - Generic Coding Defaults Do Not Open A Gate
```

Skill union phủ đủ authority, nhưng checklist vừa cho phép hai rule entry-level nằm trong router, vừa yêu cầu `references/workflow-chain.md` khớp policy 1:1.

Khuyến nghị:

- Chọn một rule rõ ràng:
  - áp dụng cùng exception cho `references/workflow-chain.md`; hoặc
  - thêm hai entry-level rule vào reference.
- Audit script phải triển khai đúng rule đã chọn.

### LOW-01 — Trigger Của NotebookLM Chưa Rõ Trong Frontmatter

`skills/notebooklm/SKILL.md` hiện có:

```yaml
description: Use Google NotebookLM through notebooklm-mcp-cli.
```

Body đã có trigger rõ hơn nhưng frontmatter chưa nêu điều kiện gọi skill. Nên đưa ý “use when the task explicitly requires NotebookLM through terminal or MCP” vào `description`.

### LOW-02 — Unit Test Telemetry Chưa Cô Lập Hoàn Toàn

`npm run validate:workflow:unit` ban đầu thất bại trong sandbox vì test telemetry ghi vào:

```text
~/.workflow-telemetry/mix.json
```

Test pass khi chạy ngoài sandbox. Đây không phải lỗi nội dung skill, nhưng là rủi ro isolation của verification pipeline.

Khuyến nghị:

- Override telemetry output sang temporary directory trong unit test.
- Không để unit test ghi hoặc overwrite dữ liệu dưới home thật của người chạy.

## Những Phần Đang Tốt

- 37 primary skill có tên duy nhất và folder cuối khớp `name`.
- 33 skill có bản `.vi.md`; bốn skill tool/integration không có bản VI là `notebooklm` và ba skill Obsidian.
- Boundary giữa các skill frontend/React rõ:
  - `frontend-experience-design`: screen và interaction design trước code.
  - `frontend-architecture`: source boundary và ownership.
  - `react-web-implementation`: guidance ở step 7.
  - `frontend-quality-review`: screen-level UX, accessibility và responsive review.
  - `react-best-practices-review`: React render/data boundary review.
- Mapping và schema trong `workflow-chain.md` có đủ:
  - `## Architecture Details` ở step 5.
  - `## Implementation Notes` ở step 7.
  - `## Review Findings` ở step 8.
- Source `skills/` đồng bộ với runtime mirror Codex và Claude.
- `git diff --check` pass.
- Bundle smoke pass.
- 25 workflow-bundle unit test files pass khi test được cấp quyền ghi telemetry ngoài sandbox.

## Audit YAML

```yaml
audit_scope: "Toàn bộ skills/, workflow-chain, governance policy, runtime mirrors và audit tooling"
checks:
  - id: skill_inventory
    status: PASS
    evidence: "37 SKILL.md; tên duy nhất; folder khớp name"
  - id: yaml_frontmatter
    status: FAIL
    evidence: "3/70 SKILL.md hoặc SKILL.vi.md không parse được bằng YAML chuẩn"
  - id: audit_script
    status: FAIL
    evidence: "Môi trường thiếu pwsh; kiểm tra tương đương 1:1 cho thấy script sẽ trả 37/37 frontmatter FAIL"
  - id: workflow_mapping
    status: PASS
    evidence: "Mapping, template và schema frontend/React ở step 5/7/8 đầy đủ"
  - id: governance_union
    status: PASS
    evidence: "17 Hard Rule của policy = 15 trong codex-workflow-chain + 2 trong workflow-governance-router"
  - id: runtime_cross_references
    status: FAIL
    evidence: "10 reference DevOps EN/VI không resolve theo flat runtime"
  - id: runtime_mirror
    status: PASS
    evidence: "skills/ khớp runtime mirror Codex và Claude"
  - id: bundle_tests
    status: PASS
    evidence: "bundle smoke PASS; 25 workflow-bundle unit test files PASS"
  - id: installed_runtime
    status: WARN
    evidence: "Source bundle 2.3.0; installed Codex bundle 2.2.1; 36/37 source skills được quản lý"
findings:
  - severity: HIGH
    area: SKILL
    path: "skills/delivery/code-scan-review/SKILL.md; skills/orchestration/codex-workflow-chain/SKILL.md; skills/guardrails/karpathy-coding-discipline/SKILL.vi.md"
    issue: "YAML frontmatter không hợp lệ"
    recommendation: "Quote description hoặc dùng YAML block scalar"
  - severity: HIGH
    area: SCRIPT
    path: "skills/guardrails/workflow-pack-audit/scripts/audit-workflow-pack.ps1"
    issue: "Audit gate false-fail toàn bộ skill và thiếu governance comparison"
    recommendation: "Parse YAML độc lập thứ tự field; bổ sung Hard Rule và cross-reference checks"
  - severity: MEDIUM
    area: RUNTIME_LAYOUT
    path: "skills/delivery/ci-cd-release; skills/delivery/deployment-devops"
    issue: "Cross-skill reference thiếu ../"
    recommendation: "Chuẩn hóa thành ../<skill-name>/references/<file>"
  - severity: MEDIUM
    area: DOC
    path: "docs/skill-pack-audit-report.md; docs/skill-pack-audit-report.vi.md"
    issue: "Bằng chứng và kết luận PASS không khớp hành vi thực tế"
    recommendation: "Tạo audit report mới sau khi sửa và verify"
  - severity: MEDIUM
    area: WORKFLOW_CHAIN
    path: "skills/guardrails/workflow-pack-audit/references/checklist.md"
    issue: "Rule 1:1 cho workflow-chain reference mâu thuẫn với router exception"
    recommendation: "Làm rõ exception hoặc đồng bộ đủ 17 heading"
  - severity: LOW
    area: SKILL
    path: "skills/notebooklm/SKILL.md"
    issue: "Frontmatter description chưa nêu trigger rõ"
    recommendation: "Đưa điều kiện Use when từ body lên description"
  - severity: LOW
    area: SCRIPT
    path: "packages/workflow-bundle/test/workflow-telemetry.test.js"
    issue: "Unit test ghi telemetry vào home thật"
    recommendation: "Cô lập output trong temporary directory"
overall_status: FAIL
follow_up_actions:
  - "Sửa ba frontmatter YAML."
  - "Sửa audit-workflow-pack.ps1 và thêm regression tests."
  - "Sửa 10 cross-reference DevOps EN/VI."
  - "Làm rõ governance checklist so với router exception."
  - "Cập nhật trigger NotebookLM."
  - "Cô lập telemetry unit test."
  - "Chạy lại audit bằng pwsh và tạo report mới."
  - "Chỉ update global runtime sau khi source đạt PASS."
notes: "Global Codex hiện ở bundle 2.2.1 trong khi source là 2.3.0; 36/37 skill đang được quản lý và karpathy-coding-discipline chưa được cài."
```

## Thứ Tự Xử Lý Đề Xuất

1. Sửa YAML frontmatter để bảo đảm skill discovery/publish an toàn.
2. Sửa audit script và thêm regression tests trước khi dùng nó làm gate.
3. Sửa cross-reference DevOps và kiểm tra trên một runtime install phẳng tạm thời.
4. Chốt lại rule Hard Rule 1:1 so với router exception.
5. Sửa các finding LOW.
6. Chạy lại:

```bash
npm run validate:workflow:pack-audit
npm run build:workflow:bundle-runtime
npm run validate:workflow:bundle-smoke
npm run validate:workflow:unit
```

7. Tạo audit report mới và update global runtime từ `2.2.1` lên bản source đã đạt `PASS`.

## Tài Liệu Liên Quan

- [[skill-pack-audit-report]]
- [[skill-pack-audit-report.vi]]
- [[workflow-docs-map]]
- `skills/guardrails/workflow-pack-audit/SKILL.md`
- `skills/guardrails/workflow-pack-audit/references/checklist.md`
