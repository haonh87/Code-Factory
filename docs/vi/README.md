---
language: vi
---

# Code-Factory — Hướng dẫn onboarding (Tiếng Việt)

> Trang này là bản **bổ trợ tiếng Việt** dành cho cộng đồng Việt Nam làm quen với repo.
> Nội dung nguồn sự thật (operative) bằng **tiếng Anh**. Trang VI này tóm tắt để bạn định hướng,
> rồi đọc tiếp bản EN chính thức khi cần chi tiết chính xác.
>
> English source of truth: [`../../README.md`](../../README.md)

## Repo này là gì

Code-Factory (repo "AI Agent Ops") lưu trữ **policy, workflow, skill và adapter** cho các tác vụ AI agent.
Public release hiện tại là `workflow-bundle v2.1.1`: một workflow bundle cài được cho Codex và Claude Code,
cho phép agent chủ động đề xuất `work-item` và `change`, còn **human giữ quyền approve** ở các gate
trước khi delivery tiếp tục.

Tagline cộng đồng: **"The Charter for Governed AI Delivery"**.

## Nguyên tắc cốt lõi (đọc EN để chính xác)

- **AI đề xuất, human phê duyệt** ở mọi gate (`AI proposes, human approves`).
- **Spec/Design trước Code** — không vào implement khi chưa qua `s04 DoR`, `s05 Approach`, `s06 Task Plan`.
- **Giải pháp nhỏ nhất đủ đúng** — không mở boundary/abstraction chỉ vì nhu cầu giả định.
- **Evidence trước khi tuyên bố done** — `DoD` là gate đóng work item, không phải cảm tính.
- **Exception/waiver phải tường minh** — không suy diễn approval từ artifact tồn tại sẵn.

> Wording chính thức của các hard-rule nằm ở bản EN (`project-context/constitution.md`,
> `governance-decision-model.md`, `governance-role-model.md`). Trang VI chỉ tóm tắt.

## Workflow 8 bước (backbone)

| Step | Mục đích |
|---|---|
| `s01` Clarify | Làm rõ yêu cầu, context, scope ban đầu |
| `s02` Business Goal | Mục tiêu business, giá trị mong đợi, non-goals |
| `s03` Open Questions | Missing input, conflict, governance blocker |
| `s04` Acceptance + DoR | Acceptance criteria đo được, readiness verdict |
| `s05` Technical Approach | Approach nhỏ nhất đủ đúng, boundary tác động |
| `s06` Task Plan | Task plan có thứ tự, verify được, checkpoint review |
| `s07` Implement | Code/test/config, worktree khi change lớn, review sớm |
| `s08` Verify + DoD | Evidence, governance compliance, verdict `DoD` |

## Governance pack

- `project-context/constitution.md` — 8 nguyên tắc nền (GOV-01..GOV-08).
- `project-context/governance-role-model.md` — model quyền: `po`, `ba`, `designer`, `developer`, `qc`, `devops`.
- `project-context/governance-decision-model.md` — chọn profile, trạng thái, trigger mở exception.
- `project-context/checklists/{default,strict,regulated}.md` — checklist theo độ rủi ro.
- `project-context/governance-exception-register.md` — đăng ký exception/waiver đang mở.

## Lệnh thường dùng

- Validate workflow: `npm run validate:workflow -- --workflow-root work-items`
- Scaffold work item: `npm run scaffold:workflow -- --work-item <slug>`
- Scaffold step: `npm run scaffold:workflow-step -- --work-item <slug> --step <sNN>`
- Status: `npm run workflow:status` hoặc `npx wfc status --mode claude`
- Cài/cập nhật: `npx wfc install --mode claude --scope global`

## Đọc tiếp bằng tiếng Việt (bản bổ trợ)

Các file `.vi.md` dưới đây là bản **bổ trợ tiếng Việt** đi kèm bản EN nguồn sự thật.
Khi cần chính xác về governance/contract, luôn đối chiếu bản EN (`<name>.md`) cùng thư mục.

**Root & package:**

- [`../../README.vi.md`](../../README.vi.md) — README gốc tiếng Việt.
- [`../../packages/workflow-bundle/README.vi.md`](../../packages/workflow-bundle/README.vi.md) — README bundle.

**Public docs (`docs/`):**

- [`../workflow-bundle-quickstart.vi.md`](../workflow-bundle-quickstart.vi.md) — quickstart.
- [`../workflow-docs-map.vi.md`](../workflow-docs-map.vi.md) — sơ đồ tài liệu workflow.
- [`../workflow-human-review-gates.vi.md`](../workflow-human-review-gates.vi.md) — review gate.
- [`../workflow-keywords-glossary.vi.md`](../workflow-keywords-glossary.vi.md) — glossary từ khóa.
- [`../workflow-rule-checklist-alignment.vi.md`](../workflow-rule-checklist-alignment.vi.md) — checklist alignment.
- [`../publish-surface.vi.md`](../publish-surface.vi.md) — publish surface.
- [`../hybrid-superpowers-policy.vi.md`](../hybrid-superpowers-policy.vi.md) — hybrid policy.
- [`../hybrid-superpowers-decision-matrix.vi.md`](../hybrid-superpowers-decision-matrix.vi.md) — decision matrix.

**Workflow-chain references (15) & Skills (33):**

Mỗi file `SKILL.md` và reference `.md` đều có sibling `.vi.md` cùng thư mục. Trong skill dir, mở `SKILL.vi.md`;
trong `skills/orchestration/codex-workflow-chain/references/`, mở file `<name>.vi.md` tương ứng.

## Ghi chú

- Trang VI này **không** là bản dịch từng dòng; nó là bản đồ định hướng.
- Khi hai bản lệch nhau, bản EN (`<name>.md`) là nguồn sự thật operative.
- Các hard-rule governance phải đọc bản EN chính thức để tránh sai ngữ nghĩa.