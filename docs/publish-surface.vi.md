---
language: vi
---

# Publish Surface

> Tiếng Anh / English: publish-surface.md

Tài liệu này ghim bề mặt phát hành công khai dự kiến cho `workflow-bundle v2.5.0`.

`v2.5.0` là một ứng viên phát hành và vẫn chưa được phát hành cho đến khi human Release gate phê duyệt. Khi được phê duyệt, public surface dự kiến sẽ:
- cài được vào Codex hoặc Claude Code bằng `wfc install|update|status|skills`
- author workflow bằng `wfc init|scaffold|validate`
- cho agent chủ động đề xuất `work-item` và `change`
- nhưng human vẫn giữ quyền approve ở các gate trước khi delivery tiếp tục

`v2.0.0` vẫn là first public release. Nếu được phê duyệt, `v2.5.0` tiếp tục trên cùng public surface và không tạo breaking change cho command line:

- `v2.2.x` thêm harness adapter registry và hooks/instincts tooling nội bộ.
- `v2.3.x` thêm English-first public surface, Vietnamese `*.vi.md`, `sdd_mode=light` và hai architecture-driver skill `sa`/`ta`.
- `v2.4.0` sửa repeat update và evidence validation, sửa contract `sa`/`ta`, đồng thời thêm `architecture-modeling` vào hai runtime 41 skill.
- `v2.5.0` thêm `artifact-governance` thành skill được quản lý thứ 42 cùng enforcement cho placement, ownership, execution reader và role-indexed handoff.

Tất cả thay đổi trên đều additive; public promise bên dưới không đổi.

## Planned Canonical Release Ref

- Tag sau Release approval: `v2.5.0`
- Candidate evidence trước approval: source commit và immutable tarball digest ghi trong CHANGE-003

Không tạo tag, không gọi candidate branch là canonical và không publish package trước khi human Release gate pass.

## System Requirements

- `node >= 18`
- `npm >= 9`
- `~/.codex` hoặc `~/.claude` writable nếu dùng `wfc install|update|skills`
- `git` nếu clone source repo thay vì cài từ npm registry
- `bash` cho adapter Linux/macOS hoặc `PowerShell` cho adapter Windows nếu không dùng CLI trực tiếp

## Public Docs

Đây là bộ tài liệu nên dùng để public onboarding:

1. [`../README.md`](../README.md)
2. [`workflow-docs-map.md`](workflow-docs-map.md)
3. [`workflow-bundle-quickstart.md`](workflow-bundle-quickstart.md)
4. [`../packages/workflow-bundle/README.md`](../packages/workflow-bundle/README.md)
5. [`../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md`](../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
6. [`../skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](../skills/orchestration/codex-workflow-chain/references/workflow-chain.md)

## Public Promise Of `v2.5.0`

- Installable workflow bundle cho Codex và Claude Code qua `wfc install|update|status|skills`
- Core authoring CLI qua `wfc init`, `wfc scaffold`, `wfc`, `wfc sdd|change|exec|plan`
- Agentic proposal flow qua `wfc materialize`, `wfc change-item`, `wfc work-item`, `wfc protocol`
- Human approval gates cho `change`, `work-item` và workflow gate receipts
- Trusted signed receipts ngoài project root cho các gate human bắt buộc
- Migration từ state legacy `.codex-workflow-pack.*` sang `.codex-workflow-bundle.*`
- 42 skill được quản lý trong mỗi Codex và Claude runtime, với canonical/runtime byte parity
- Phân tích architecture driver qua `sa` và `ta`, sau đó dựng model/view bằng `architecture-modeling` ở `s05`
- Built-in draw.io renderer deterministic cho landscape và integration view được allowlist khi không có house renderer sở hữu artifact
- Hướng dẫn artifact placement và one-fact/one-owner qua `artifact-governance`, với English/Vietnamese parity

## Not In The Public Promise

- Delivery hoàn toàn autonomous không cần human approve
- Support runtime ngoài `Codex` và `Claude Code`
- Bất kỳ compatibility contract nào rộng hơn:
  - legacy config `workflow-contracts.config.json`
  - legacy state `.codex-workflow-pack.*`

Hai lớp legacy trên hiện vẫn được giữ để migration êm hơn, nhưng không nên coi đó là core public story của `v2.5.0`.

## Internal Or Maintainer Docs

Các tài liệu dưới đây không nên là entrypoint khi publish public:

- `memory-bank/`
- `skills/orchestration/codex-workflow-chain/references/workflow-overview.md`
- `skills/orchestration/codex-workflow-chain/references/implementation-blueprint.md`
- `skills/orchestration/codex-workflow-chain/references/target-architecture.md`
- `skills/orchestration/codex-workflow-chain/references/workflow-versioning.md`
- `packages/workflow-bundle/tests/fixtures/workflow-governance/`

## Excluded Working Assets

Các file dưới đây là working assets cục bộ, không phải source-of-truth:

- `.obsidian/`
- `docs/workflow-process.canvas`
- `docs/workflow-work-items.canvas`
- `docs/workflow-work-items.canvas.png`
- `docs/workflow-work-items.png`

## Publish Rule

- cho tới khi Release được phê duyệt, gọi `v2.5.0` là ứng viên phát hành thay vì public release hiện tại
- nếu nói về approval model, phải nêu rõ `agent proposes, human approves`
- không dùng tài liệu internal hoặc memory-bank làm public onboarding path
