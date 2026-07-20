---
language: vi
---

# Workflow Docs Map

> Tiếng Anh / English: workflow-docs-map.md

Tài liệu này tách rõ đâu là public onboarding path của `workflow-bundle v2.1.1`, đâu là deep-dive docs, và đâu là maintainer context.

## Public Onboarding Docs

Đây là bộ nên đọc khi muốn bắt đầu đúng public release `v2.1.1`.

1. [`../README.md`](../README.md)
2. [`publish-surface.md`](publish-surface.md)
3. [`workflow-bundle-quickstart.md`](workflow-bundle-quickstart.md)
4. [`../packages/workflow-bundle/README.md`](../packages/workflow-bundle/README.md)
5. [`../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md`](../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
6. [`../skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](../skills/orchestration/codex-workflow-chain/references/workflow-chain.md)

Quy tắc đọc:

- `README` trả lời repo này là gì và public promise của `v2.1.1` là gì.
- `publish-surface` chốt tag hoặc branch canonical và system requirements.
- `quickstart` trả lời cài `wfc`, cài workflow bundle, init repo và chạy flow đầu tiên như thế nào.
- package `README` trả lời install, upgrade, command overview và publish mechanics ở mức package.
- `workflow-overview-author-edition` giải thích workflow ở góc nhìn delivery.
- `workflow-chain` là contract và naming source-of-truth.

## Public Deep-Dive Docs

Các tài liệu dưới đây vẫn thuộc public surface, nhưng chỉ cần đọc khi đi sâu vào một capability cụ thể:

- [`../skills/orchestration/codex-workflow-chain/references/execution-runtime.md`](../skills/orchestration/codex-workflow-chain/references/execution-runtime.md)
- [`../skills/orchestration/codex-workflow-chain/references/adaptive-planning.md`](../skills/orchestration/codex-workflow-chain/references/adaptive-planning.md)
- [`workflow-keywords-glossary.md`](workflow-keywords-glossary.md)
- [`workflow-human-review-gates.md`](workflow-human-review-gates.md)
- [`workflow-rule-checklist-alignment.md`](workflow-rule-checklist-alignment.md)
- [`../skills/orchestration/codex-workflow-chain/references/work-item-materialization.md`](../skills/orchestration/codex-workflow-chain/references/work-item-materialization.md)
- [`../skills/orchestration/codex-workflow-chain/references/work-item-protocol.md`](../skills/orchestration/codex-workflow-chain/references/work-item-protocol.md)
- [`../skills/orchestration/codex-workflow-chain/references/spec-driven-development.md`](../skills/orchestration/codex-workflow-chain/references/spec-driven-development.md)

Quy tắc đọc:

- `execution-runtime` chỉ cần khi work item dùng execution metadata hoặc artifacts.
- `adaptive-planning` chỉ cần khi dùng planning track ngoài flow quick mặc định.
- `workflow-keywords-glossary` là chỗ tra cứu ngữ nghĩa các keyword chính của workflow, gate, execution và SDD.
- `workflow-human-review-gates` là bản tóm tắt gate nào bắt buộc human phải review/pass và flow AI-human khuyến nghị.
- `workflow-rule-checklist-alignment` là bản audit ngữ nghĩa xem rule, checklist, gate và validator đang bổ trợ nhau ra sao, kèm flowchart và residual gaps.
- `work-item-materialization` và `work-item-protocol` là deep dive cho `agent proposes, human approves`.
- `spec-driven-development` chỉ cần khi repo dùng `BRD` hoặc `SRS` làm source-of-truth chính.
- comparative hoặc hybrid policy không thuộc public deep-dive trừ khi được promote rõ vào publish surface.

## Maintainer And Historical Docs

Các tài liệu dưới đây thiên về mechanics, rollout, history hoặc roadmap:

- [`../skills/orchestration/workflow-governance-router/SKILL.md`](../skills/orchestration/workflow-governance-router/SKILL.md)
- [`../skills/orchestration/codex-workflow-chain/references/workflow-overview.md`](../skills/orchestration/codex-workflow-chain/references/workflow-overview.md)
- [`../skills/orchestration/codex-workflow-chain/references/workflow-versioning.md`](../skills/orchestration/codex-workflow-chain/references/workflow-versioning.md)
- [`hybrid-superpowers-policy.md`](hybrid-superpowers-policy.md)
- [`hybrid-superpowers-decision-matrix.md`](hybrid-superpowers-decision-matrix.md)
- [`../skills/orchestration/codex-workflow-chain/references/implementation-blueprint.md`](../skills/orchestration/codex-workflow-chain/references/implementation-blueprint.md)
- [`../skills/orchestration/codex-workflow-chain/references/target-architecture.md`](../skills/orchestration/codex-workflow-chain/references/target-architecture.md)
- [`../skills/orchestration/codex-workflow-chain/references/workflow-ci-enforcement.md`](../skills/orchestration/codex-workflow-chain/references/workflow-ci-enforcement.md)
- [`../packages/workflow-bundle/tests/fixtures/workflow-governance/README.md`](../packages/workflow-bundle/tests/fixtures/workflow-governance/README.md)
- [`../memory-bank/projectbrief.md`](../memory-bank/projectbrief.md)
- [`../memory-bank/activeContext.md`](../memory-bank/activeContext.md)
- [`../memory-bank/progress.md`](../memory-bank/progress.md)

Quy tắc đọc:

- `workflow-governance-router` là entrypoint meta-skill của mô hình prompt nhiều khối; nó chốt current step, delivery context và missing gates trước khi step skill chạy.
- `hybrid-superpowers-policy` là policy tham chiếu nội bộ cho mô hình hybrid giữa backbone workflow của repo và execution discipline từ Superpowers.
- `hybrid-superpowers-decision-matrix` là cheat sheet để quyết định nhanh khi nào bật `TDD`, `worktree`, `subagent` và `review mode`.

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

- dùng `workflow bundle` làm tên artifact publishable
- dùng `agent proposes, human approves` khi mô tả governance model
- dùng `scaffold` cho việc sinh note hoặc package từ CLI
- dùng `materialize` cho bước chuyển raw request thành work item candidate
- nếu cần giải thích keyword theo ngữ cảnh workflow, ưu tiên link `workflow-keywords-glossary.md` thay vì giải thích lại theo nhiều biến thể