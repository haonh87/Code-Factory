# Publish Surface

Tài liệu này chốt public publish surface cho `workflow-bundle v2.0.0`.

`v2.0.0` là first public release của workflow này:
- cài được vào Codex bằng `wfc install|update|status|skills`
- author workflow bằng `wfc init|scaffold|validate`
- cho agent chủ động đề xuất `work-item` và `change`
- nhưng human vẫn giữ quyền approve ở các gate trước khi delivery tiếp tục

## Canonical Release Refs

- Tag: `v2.0.0`
- Branch: `release/v2.0.0`

Khi chia sẻ workflow này cho người mới dùng, ưu tiên trỏ vào một trong hai ref trên thay vì working tree hiện tại.

## System Requirements

- `node >= 18`
- `npm >= 9`
- `~/.codex` writable nếu dùng `wfc install|update|skills`
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

## Public Promise Of `v2.0.0`

- Installable workflow bundle cho Codex qua `wfc install|update|status|skills`
- Core authoring CLI qua `wfc init`, `wfc scaffold`, `wfc`, `wfc sdd|change|exec|plan`
- Agentic proposal flow qua `wfc materialize`, `wfc change-item`, `wfc work-item`, `wfc protocol`
- Human approval gates cho `change` và `work-item`
- Migration từ state legacy `.codex-workflow-pack.*` sang `.codex-workflow-bundle.*`

## Not In The Public Promise

- Delivery hoàn toàn autonomous không cần human approve
- Support chính thức cho agent runtime ngoài Codex
- Bất kỳ compatibility contract nào rộng hơn:
  - legacy config `workflow-contracts.config.json`
  - legacy state `.codex-workflow-pack.*`

Hai lớp legacy trên hiện vẫn được giữ để migration êm hơn, nhưng không nên coi đó là core public story của `v2.0.0`.

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

- nếu nói về public release, dùng ngôn ngữ của `v2.0.0`
- nếu nói về approval model, phải nêu rõ `agent proposes, human approves`
- không dùng tài liệu internal hoặc memory-bank làm public onboarding path
