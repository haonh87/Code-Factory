---
language: en
---

# Publish Surface

> Vietnamese: publish-surface.vi.md

This document pins the planned public publish surface for `workflow-bundle v2.6.2`.

`v2.6.2` is a release candidate. It remains unpublished until the human Release gate passes. Once approved, its planned public surface will:
- installable into Codex or Claude Code via `wfc install|update|status|skills`
- author workflows with `wfc init|scaffold|validate`
- lets the agent proactively propose `work-item` and `change`
- but the human still holds approval authority at each gate before delivery continues

`v2.0.0` remains the first public release. If approved, `v2.6.2` will continue on the same public surface and make no breaking command-line change:
- `v2.2.x` added the harness adapter registry and internal hooks/instincts tooling.
- `v2.3.x` added the English-first public surface, Vietnamese `*.vi.md` supplements, `sdd_mode=light`, and the `sa`/`ta` architecture-driver skills.
- `v2.4.0` fixes managed repeat updates and evidence validation, corrects the `sa`/`ta` contracts, and adds `architecture-modeling` to both 41-skill runtimes.
- `v2.5.0` adds `artifact-governance` as managed skill 42 and ships its placement, ownership, execution-reader, and role-indexed handoff enforcement.
- `v2.6.0` adds additive design-readiness guidance for the existing `sa` and `ta` skills while retaining 42 managed skills and the existing output contract.
- `v2.6.1` aligns the stale authoring smoke with approved legacy-scaffold bootstrap behavior while retaining 42 managed skills and the public contract.
- `v2.6.2` adds adaptive request routing, applicable-only roles and gates, recoverable approval bundles, privacy-bounded telemetry, and build-once candidate verification without weakening human authority.

All of the above are additive — the public promise below is unchanged.

## Planned Canonical Release Ref

- Tag after Release approval: `v2.6.2`
- Candidate evidence before approval: source commit and immutable tarball digest recorded in CR-008

Do not create the tag, present a candidate branch as canonical, or publish the package until the human Release gate passes.

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

## Public Promise Of `v2.6.2`

- Installable workflow bundle for Codex and Claude Code via `wfc install|update|status|skills`
- Core authoring CLI via `wfc init`, `wfc scaffold`, `wfc`, `wfc sdd|change|exec|plan`
- Agentic proposal flow via `wfc materialize`, `wfc change-item`, `wfc work-item`, `wfc protocol`
- Human approval gates for `change`, `work-item`, and workflow gate receipts
- Trusted signed receipts outside the project root for the mandatory human gates
- Migration from legacy state `.codex-workflow-pack.*` to `.codex-workflow-bundle.*`
- 42 managed skills in each Codex and Claude runtime, with canonical/runtime byte parity
- Architecture-driver analysis through `sa` and `ta`, followed by model/view production through `architecture-modeling` at `s05`
- Deterministic built-in draw.io rendering for allowlisted landscape and integration views when no house renderer owns the artifact
- Artifact placement and one-fact/one-owner guidance through `artifact-governance`, with English/Vietnamese parity
- Conditional design-readiness guidance through `sa` and `ta`, mapped into existing driver, question, stop-condition, and handoff fields without moving design authority out of s05
- Read-only legacy-scaffold observation plus explicit approval bootstrap with auditable provenance; later mutating lifecycle actions still require a persisted report

## Not In The Public Promise

- Fully autonomous delivery with no human approval
- Support for runtimes other than `Codex` and `Claude Code`
- Any compatibility contract broader than:
  - legacy config `workflow-contracts.config.json`
  - legacy state `.codex-workflow-pack.*`

The two legacy layers above are still kept to make migration smoother, but they should not be treated as the core public story of `v2.6.2`.

## Compatibility And Rollback

- Existing `wfc` commands, flags, state files, SA/TA output blocks, block ownership, Node `>=18`, and npm `>=9` requirements remain compatible.
- Before publication, rollback restores only CR-008-managed source and candidate surfaces to the verified `v2.6.1/42` baseline.
- After an authorized publication, use the retained immutable v2.6.1 artifact and `wfc install` for a managed downgrade, verify `v2.6.1/42`, and preserve unmanaged files and modes.
- No database, API, event, deployment, user-configuration, or live global-install migration is part of this candidate.

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

- until Release approval, call `v2.6.2` a release candidate rather than the current public release
- when talking about the approval model, state clearly `agent proposes, human approves`
- do not use internal docs or memory-bank as the public onboarding path
