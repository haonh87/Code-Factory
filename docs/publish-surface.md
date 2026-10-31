---
language: en
---

# Publish Surface

> Vietnamese: publish-surface.vi.md

This document pins the public publish surface for `workflow-bundle v2.9.0`.

The maintainer has authorized the v2.9.0 release. Its public surface provides:
- installation into Codex or Claude Code via `wfc install|update|status|skills`
- workflow authoring with `wfc init|scaffold|validate`
- proactive agent proposals for `work-item` and `change`
- continued human approval authority at each gate before delivery proceeds

`v2.0.0` remains the first public release. `v2.9.0` continues on the same public surface and makes no breaking command-line change:
- `v2.2.x` added the harness adapter registry and internal hooks/instincts tooling.
- `v2.3.x` added the English-first public surface, Vietnamese `*.vi.md` supplements, `sdd_mode=light`, and the `sa`/`ta` architecture-driver skills.
- `v2.4.0` fixes managed repeat updates and evidence validation, corrects the `sa`/`ta` contracts, and adds `architecture-modeling` to both 41-skill runtimes.
- `v2.5.0` adds `artifact-governance` as managed skill 42 and ships its placement, ownership, execution-reader, and role-indexed handoff enforcement.
- `v2.6.0` adds additive design-readiness guidance for the existing `sa` and `ta` skills while retaining 42 managed skills and the existing output contract.
- `v2.6.1` aligns the stale authoring smoke with approved legacy-scaffold bootstrap behavior while retaining 42 managed skills and the public contract.
- `v2.6.2` adds adaptive request routing, applicable-only roles and gates, recoverable approval bundles, privacy-bounded telemetry, and build-once candidate verification without weakening human authority.
- `v2.6.4` adds exact ID-based state disposition, signed resolved-state history, and terminal archive guards while retaining the same command families, five install modes, and 42 managed skills.

All of the above are additive — the public promise below is unchanged.

## Canonical Release Ref

- Tag: `v2.9.0`
- Publication outcome, verification and immutable artifact digest: [release record](releases/workflow-bundle-v2.9.0.md)

Publish only the verified artifact under the immutable tag authorized by the maintainer.

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

## Public Promise Of `v2.9.0`

- Installable workflow bundle for Codex and Claude Code via `wfc install|update|status|skills`
- Core authoring CLI via `wfc init`, `wfc scaffold`, `wfc`, `wfc sdd|change|exec|plan`
- Agentic proposal flow via `wfc materialize`, `wfc change-item`, `wfc work-item`, `wfc protocol`
- Human approval gates for `change`, `work-item`, and workflow gate receipts
- Trusted signed receipts outside the project root for the mandatory human gates
- Migration from legacy state `.codex-workflow-pack.*` to `.codex-workflow-bundle.*`
- 48 managed skills in each Codex and Claude runtime, with canonical/runtime byte parity
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

The two legacy layers above are still kept to make migration smoother, but they should not be treated as the core public story of `v2.9.0`.

## Compatibility And Rollback

- Existing `wfc` commands, flags, state files, SA/TA output blocks, block ownership, Node `>=18`, and npm `>=9` requirements remain compatible.
- Keep the immutable `v2.8.0/48` package as the workflow rollback baseline.
- After an authorized publication, use the retained immutable v2.8.0 artifact and `wfc install` for a managed downgrade, verify `v2.8.0/48`, and preserve unmanaged files and modes.
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

- publication status is owned by the versioned release record
- when talking about the approval model, state clearly `agent proposes, human approves`
- do not use internal docs or memory-bank as the public onboarding path

### v2.9.0 Source And Package Boundary

Version 2.9.0 adds optional scenario guidance (A1) and opt-in integer
`task_contract_version: 1` (A2). The JSON task contract validates task IDs,
dependencies, bounded file paths, structured verification commands and exact
acceptance-criteria coverage. Validation never executes the recorded commands.
Legacy YAML authoring and default scaffolds remain supported; human gates are unchanged.
Codex and Claude retain 48 skills, including the five maintenance skills and
`diagram-design-presentation-adapter` from earlier releases, plus CF-023 validation.
SEC-01 and SEC-02 remain in tagged source; direct installers and MCP servers are
outside the workflow tarball. Optional PNG dependencies are provisioned separately.
See the v2.9.0 release record for checksum, verification, limits and rollback.
npm registry publication is separate.
