---
language: en
---

# Workflow Docs Map

> Vietnamese: workflow-docs-map.vi.md

This document separates the public onboarding path of `workflow-bundle v2.2.1` from the deep-dive docs and the maintainer context.

## Public Onboarding Docs

This is the set to read when starting with the `v2.2.1` public release.

1. [`../README.md`](../README.md)
2. [`publish-surface.md`](publish-surface.md)
3. [`workflow-bundle-quickstart.md`](workflow-bundle-quickstart.md)
4. [`../packages/workflow-bundle/README.md`](../packages/workflow-bundle/README.md)
5. [`../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md`](../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
6. [`../skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](../skills/orchestration/codex-workflow-chain/references/workflow-chain.md)

Reading guide:

- `README` answers what this repo is and what the public promise of `v2.2.1` is.
- `publish-surface` pins the canonical tag or branch and the system requirements.
- `quickstart` answers how to install `wfc`, install the workflow bundle, init a repo, and run the first flow.
- the package `README` covers install, upgrade, command overview, and publish mechanics at the package level.
- `workflow-overview-author-edition` explains the workflow from a delivery perspective.
- `workflow-chain` is the contract and naming source-of-truth.

## Public Deep-Dive Docs

The documents below are still part of the public surface, but are only needed when going deeper into a specific capability:

- [`../skills/orchestration/codex-workflow-chain/references/execution-runtime.md`](../skills/orchestration/codex-workflow-chain/references/execution-runtime.md)
- [`../skills/orchestration/codex-workflow-chain/references/adaptive-planning.md`](../skills/orchestration/codex-workflow-chain/references/adaptive-planning.md)
- [`workflow-keywords-glossary.md`](workflow-keywords-glossary.md)
- [`workflow-human-review-gates.md`](workflow-human-review-gates.md)
- [`workflow-rule-checklist-alignment.md`](workflow-rule-checklist-alignment.md)
- [`../skills/orchestration/codex-workflow-chain/references/work-item-materialization.md`](../skills/orchestration/codex-workflow-chain/references/work-item-materialization.md)
- [`../skills/orchestration/codex-workflow-chain/references/work-item-protocol.md`](../skills/orchestration/codex-workflow-chain/references/work-item-protocol.md)
- [`../skills/orchestration/codex-workflow-chain/references/spec-driven-development.md`](../skills/orchestration/codex-workflow-chain/references/spec-driven-development.md)

Reading guide:

- `execution-runtime` is only needed when a work item uses execution metadata or artifacts.
- `adaptive-planning` is only needed when using a planning track other than the default quick flow.
- `workflow-keywords-glossary` is the reference for the semantics of the main workflow, gate, execution, and SDD keywords.
- `workflow-human-review-gates` is a summary of which gates require human review/pass and the recommended AI-human flow.
- `workflow-rule-checklist-alignment` is a semantic audit of how rules, checklists, gates, and validators support each other, with a flowchart and residual gaps.
- `work-item-materialization` and `work-item-protocol` are deep dives for `agent proposes, human approves`.
- `spec-driven-development` is only needed when the repo uses `BRD` or `SRS` as the primary source-of-truth.
- comparative or hybrid policies are not public deep-dive unless explicitly promoted into the publish surface.

## Maintainer And Historical Docs

The documents below are oriented toward mechanics, rollout, history, or roadmap:

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

Reading guide:

- `workflow-governance-router` is the meta-skill entrypoint of the multi-block prompt model; it pins the current step, delivery context, and missing gates before step skills run.
- `hybrid-superpowers-policy` is the internal reference policy for the hybrid model between the repo workflow backbone and the execution discipline from Superpowers.
- `hybrid-superpowers-decision-matrix` is a cheat sheet for deciding quickly when to enable `TDD`, `worktree`, `subagent`, and `review mode`.

## Excluded Working Assets

The files below are not part of the public docs surface and are treated as local working files:

- `.obsidian/`
- `docs/workflow-process.canvas`
- `docs/workflow-work-items.canvas`
- `docs/workflow-work-items.canvas.png`
- `docs/workflow-work-items.png`

Rules:

- do not use these files as the source-of-truth for the workflow
- do not point public onboarding at these files
- if a real diagram must be published, create a separate canonical docs version and link it from `README` or the docs map

## Vocabulary

When writing docs:

- use `workflow bundle` as the publishable artifact name
- use `agent proposes, human approves` when describing the governance model
- use `scaffold` for generating a note or package from the CLI
- use `materialize` for the step that turns a raw request into a work item candidate
- if a keyword needs to be explained in the workflow context, prefer linking `workflow-keywords-glossary.md` over re-explaining it in many variants