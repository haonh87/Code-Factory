# Publish Surface

Tài liệu này chốt public publish surface cho `v1.0.0`.

## Canonical Release Refs

- Tag: `v1.0.0`
- Branch: `release/v1.0.0`

Khi chia sẻ workflow này cho người mới dùng, ưu tiên trỏ vào một trong hai ref trên thay vì working tree hiện tại.

## Public Docs

Đây là bộ tài liệu nên dùng để public onboarding:

1. [`../README.md`](../README.md)
2. [`workflow-docs-map.md`](workflow-docs-map.md)
3. [`workflow-contracts-quickstart.md`](workflow-contracts-quickstart.md)
4. [`../skills/orchestration/codex-workflow-chain/references/workflow-versioning.md`](../skills/orchestration/codex-workflow-chain/references/workflow-versioning.md)
5. [`../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md`](../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
6. [`../skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](../skills/orchestration/codex-workflow-chain/references/workflow-chain.md)
7. [`../skills/orchestration/codex-workflow-chain/references/execution-runtime.md`](../skills/orchestration/codex-workflow-chain/references/execution-runtime.md)
8. [`../packages/workflow-contracts/README.md`](../packages/workflow-contracts/README.md)

## Internal Or Maintainer Docs

Các tài liệu dưới đây không nên là entrypoint khi publish public:

- `memory-bank/`
- `skills/orchestration/codex-workflow-chain/references/workflow-overview.md`
- `skills/orchestration/codex-workflow-chain/references/implementation-blueprint.md`
- `skills/orchestration/codex-workflow-chain/references/target-architecture.md`
- `packages/workflow-contracts/tests/fixtures/workflow-governance/`

## Excluded Working Assets

Các file dưới đây là working assets cục bộ, không phải source-of-truth:

- `.obsidian/`
- `docs/workflow-process.canvas`
- `docs/workflow-work-items.canvas`
- `docs/workflow-work-items.canvas.png`
- `docs/workflow-work-items.png`

## Publish Rule

- nếu nói về public baseline, dùng ngôn ngữ của `v1.0.0`
- không dùng `memory-bank/` làm đường đọc cho người dùng ngoài repo
- không dùng internal docs làm onboarding mặc định
