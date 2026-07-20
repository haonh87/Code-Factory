# workflow-bundle v2.0.0

Released: `2026-04-17`  
Tag: `v2.0.0`  
Commit: `05c4cda80ac736166a551e8d231d62fc546d68ad`

## Summary

`workflow-bundle v2.0.0` is the first public release of an installable workflow bundle for Codex. This release gathers authoring, validation, agentic work-item proposal and human approval gates into a single short CLI called `wfc`.

The approval model of this release is: `agent proposes, human approves`.

## Highlights

- Rename the public package identity from `workflow-contracts` to `workflow-bundle@2.0.0`.
- Standardize the short command surface via `wfc install`, `wfc update`, `wfc status`, `wfc skills`.
- Package the workflow bundle runtime so the published package can install `AGENTS.global.md`, skills and support policies on its own without needing the original source repo.
- Open the public agentic flow via `wfc materialize`, `wfc change-item`, `wfc work-item`, `wfc protocol`.
- Require human approval for a change package and work item proposed by the agent before activation or delivery continues.
- Add `wfc work-item list` to list first and then view detail instead of having to dig directly in `work-items/`.
- Sync docs and help to the `workflow-bundle v2.0.0` story with clear system requirements.

## Included In This Release

- Workflow bundle install surface:
  - `wfc install --scope global|project|both`
  - `wfc update`
  - `wfc status`
  - `wfc skills list|add|remove`
- Core authoring CLI:
  - `wfc init`
  - `wfc scaffold`
  - `wfc scaffold-step`
  - `wfc scaffold-change`
  - `wfc`
  - `wfc naming|governance|sdd|change|exec|plan`
- Agentic governance flow:
  - `wfc materialize`
  - `wfc change-item`
  - `wfc work-item`
  - `wfc protocol`
- Publishable package runtime:
  - `workflow-bundle.manifest.json`
  - bundled `runtime/codex/**`
  - package tarball `workflow-bundle-2.0.0.tgz`

## Breaking Changes And Renames

- Package rename:
  - from `workflow-contracts`
  - to `workflow-bundle`
- Package source tree rename:
  - from `packages/workflow-contracts/`
  - to `packages/workflow-bundle/`
- Config naming now prefers `workflow-bundle.config.json`.
- The public CLI no longer uses old aliases like `wfc pack ...`.
- The governance fixture root moved to `packages/workflow-bundle/tests/fixtures/workflow-governance/`.

## Upgrade Notes

If you are on a machine that previously used the old package:

```bash
npm uninstall -g workflow-contracts
npm install -g workflow-bundle
wfc version
wfc update
```

`wfc update` will overwrite the bundle per the current install state and migrate legacy state if it finds:

- legacy config: `workflow-contracts.config.json`
- legacy install state: `.codex-workflow-pack.*`
- current install state: `.codex-workflow-bundle.*`

## System Requirements

- `node >= 18`
- `npm >= 9`
- `~/.codex` writable if using `wfc install|update|skills`
- `git` if cloning the source repo instead of installing directly from the npm registry
- `bash` for the Linux/macOS adapter or `PowerShell` for the Windows adapter

## Verification

The checks run for this release:

- `npm run build:workflow:bundle-runtime`
- `npm run validate:workflow:authoring-smoke`
- `npm run validate:workflow:bundle-smoke`
- `npm run validate:workflow:fixtures`
- `npm pack --json --pack-destination /tmp --cache /tmp/npm-cache-workflow-bundle-release`

Results:

- runtime bundle build succeeded
- authoring smoke passed
- bundle smoke passed
- fixture suite passed
- tarball publish `workflow-bundle-2.0.0.tgz` built successfully

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Known Boundaries

- This is the first public release, focused on Codex.
- It is not positioned as a fully autonomous delivery release.
- The human is still the approval authority for a change package and work item.
- Legacy compatibility is kept to make migration smoother, not as a long-term core product promise.