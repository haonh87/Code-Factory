---
language: en
---

# Publish Surface

> Vietnamese: publish-surface.vi.md

This document pins the public publish surface for `workflow-bundle v2.3.0`.

`v2.3.0` is the current public release of this workflow:
- installable into Codex or Claude Code via `wfc install|update|status|skills`
- author workflows with `wfc init|scaffold|validate`
- lets the agent proactively propose `work-item` and `change`
- but the human still holds approval authority at each gate before delivery continues

`v2.0.0` remains the first public release. `v2.3.0` is the next release on the same public surface, and it makes no breaking change:
- `v2.2.x` added the harness adapter registry and internal hooks/instincts tooling.
- `v2.3.0` adds an English-first public surface (with Vietnamese `*.vi.md` supplements) and an `sdd_mode=light` profile for lower-ceremony work items.

All of the above are additive — the public promise below is unchanged.

## Canonical Release Refs

- Tag: `v2.3.0`
- Branch: `release/v2.3.0`

When sharing this workflow with new users, prefer pointing to one of the two refs above rather than the current working tree.

## System Requirements

- `node >= 18`
- `npm >= 9`
- `~/.codex` or `~/.claude` writable when using `wfc install|update|skills`
- `git` when cloning the source repo instead of installing from the npm registry
- `bash` for the Linux/macOS adapter or `PowerShell` for the Windows adapter when not using the CLI directly

## Public Docs

This is the document set to use for public onboarding:

1. [`../README.md`](../README.md)
2. [`workflow-docs-map.md`](workflow-docs-map.md)
3. [`workflow-bundle-quickstart.md`](workflow-bundle-quickstart.md)
4. [`../packages/workflow-bundle/README.md`](../packages/workflow-bundle/README.md)
5. [`../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md`](../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
6. [`../skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](../skills/orchestration/codex-workflow-chain/references/workflow-chain.md)

## Public Promise Of `v2.3.0`

- Installable workflow bundle for Codex and Claude Code via `wfc install|update|status|skills`
- Core authoring CLI via `wfc init`, `wfc scaffold`, `wfc`, `wfc sdd|change|exec|plan`
- Agentic proposal flow via `wfc materialize`, `wfc change-item`, `wfc work-item`, `wfc protocol`
- Human approval gates for `change`, `work-item`, and workflow gate receipts
- Trusted signed receipts outside the project root for the mandatory human gates
- Migration from legacy state `.codex-workflow-pack.*` to `.codex-workflow-bundle.*`

## Not In The Public Promise

- Fully autonomous delivery with no human approval
- Support for runtimes other than `Codex` and `Claude Code`
- Any compatibility contract broader than:
  - legacy config `workflow-contracts.config.json`
  - legacy state `.codex-workflow-pack.*`

The two legacy layers above are still kept to make migration smoother, but they should not be treated as the core public story of `v2.3.0`.

## Internal Or Maintainer Docs

The documents below should not be the entry point when publishing publicly:

- `memory-bank/`
- `skills/orchestration/codex-workflow-chain/references/workflow-overview.md`
- `skills/orchestration/codex-workflow-chain/references/implementation-blueprint.md`
- `skills/orchestration/codex-workflow-chain/references/target-architecture.md`
- `skills/orchestration/codex-workflow-chain/references/workflow-versioning.md`
- `packages/workflow-bundle/tests/fixtures/workflow-governance/`

## Excluded Working Assets

The files below are local working assets, not source-of-truth:

- `.obsidian/`
- `docs/workflow-process.canvas`
- `docs/workflow-work-items.canvas`
- `docs/workflow-work-items.canvas.png`
- `docs/workflow-work-items.png`

## Publish Rule

- when talking about the public release, use the language of `v2.3.0`
- when talking about the approval model, state clearly `agent proposes, human approves`
- do not use internal docs or memory-bank as the public onboarding path
