# Workflow Docs Map

Tài liệu này tách rõ tài liệu nào dành cho người mới dùng workflow, tài liệu nào là extension, và tài liệu nào dành cho maintainer.

## Public Docs

Đây là bộ nên đọc khi muốn áp dụng workflow theo đúng `v1.0.0`.

1. [`../README.md`](../README.md)
2. [`publish-surface.md`](publish-surface.md)
3. [`workflow-contracts-quickstart.md`](workflow-contracts-quickstart.md)
4. [`../skills/orchestration/codex-workflow-chain/references/workflow-versioning.md`](../skills/orchestration/codex-workflow-chain/references/workflow-versioning.md)
5. [`../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md`](../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
6. [`../skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](../skills/orchestration/codex-workflow-chain/references/workflow-chain.md)
7. [`../skills/orchestration/codex-workflow-chain/references/execution-runtime.md`](../skills/orchestration/codex-workflow-chain/references/execution-runtime.md)

Quy tắc đọc:

- `README` trả lời repo này là gì và nên bắt đầu ở đâu.
- `publish-surface` chốt tag/branch nào là canonical public release.
- `quickstart` trả lời dùng `wfc` như thế nào.
- `workflow-versioning` chốt phạm vi `v1.0.0`.
- `workflow-overview-author-edition` giải thích workflow ở góc nhìn delivery.
- `workflow-chain` là contract và naming source-of-truth.
- `execution-runtime` chỉ đọc khi work item dùng `agentic` hoặc `multi_agent`.

## Extension Docs

Các tài liệu dưới đây không thuộc public baseline `v1.0.0`.

- [`../skills/orchestration/codex-workflow-chain/references/work-item-materialization.md`](../skills/orchestration/codex-workflow-chain/references/work-item-materialization.md)
- [`../skills/orchestration/codex-workflow-chain/references/work-item-protocol.md`](../skills/orchestration/codex-workflow-chain/references/work-item-protocol.md)

Quy tắc đọc:

- chỉ đọc khi muốn đi xa hơn flow manual scaffold của `v1.0.0`
- không dùng chúng để mô tả baseline public

## Maintainer Docs

Các tài liệu dưới đây thiên về mechanics, rollout hoặc roadmap.

- [`../skills/orchestration/codex-workflow-chain/references/workflow-overview.md`](../skills/orchestration/codex-workflow-chain/references/workflow-overview.md)
- [`../skills/orchestration/codex-workflow-chain/references/implementation-blueprint.md`](../skills/orchestration/codex-workflow-chain/references/implementation-blueprint.md)
- [`../skills/orchestration/codex-workflow-chain/references/target-architecture.md`](../skills/orchestration/codex-workflow-chain/references/target-architecture.md)
- [`../skills/orchestration/codex-workflow-chain/references/workflow-ci-enforcement.md`](../skills/orchestration/codex-workflow-chain/references/workflow-ci-enforcement.md)
- [`../packages/workflow-contracts/tests/fixtures/workflow-governance/README.md`](../packages/workflow-contracts/tests/fixtures/workflow-governance/README.md)
- [`../memory-bank/projectbrief.md`](../memory-bank/projectbrief.md)
- [`../memory-bank/activeContext.md`](../memory-bank/activeContext.md)
- [`../memory-bank/progress.md`](../memory-bank/progress.md)

## Excluded Working Assets

Các file dưới đây không thuộc public docs surface và được xem là working files cục bộ:

- `.obsidian/`
- `docs/workflow-process.canvas`
- `docs/workflow-work-items.canvas`
- `docs/workflow-work-items.canvas.png`
- `docs/workflow-work-items.png`

Quy tắc:

- không dùng các file này làm source-of-truth cho workflow
- không trỏ onboarding public tới các file này
- nếu cần publish diagram thật, tạo bản docs canonical riêng rồi link từ `README` hoặc docs map

## Vocabulary

Khi viết docs:

- dùng `scaffold` cho việc sinh note hoặc package từ CLI
- dùng `implemented` hoặc `available` cho capability đã có trong repo
- chỉ dùng `materialize` cho extension `Work Item Materialization`
