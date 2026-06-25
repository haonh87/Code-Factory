# workflow-bundle v2.0.1

Released: `2026-04-20`  
Tag: `v2.0.1`  
Branch: `release/v2.0.1`

## Changelog

`workflow-bundle v2.0.1` is the patch release after `v2.0.0`, focused on hardening and syncing semantics across policy, protocol, validator and CLI.

### Added

- Add a machine-enforced gate for `release` and `business_acceptance` at `s08`.
- Add `Delivery Rule Evidence` at `s07` to trace `TDD`, `worktree`, two-tier review and the delegation conditions.
- Add `workflow-gate-evidence-utils.js` to share gate-evidence logic across governance and protocol.
- Add audit alignment documentation at `docs/workflow-rule-checklist-alignment.md`.
- Add the `v2.0.1` release note and new fixtures for `invalid-option-count`, `invalid-s07-rule-evidence`, `s07 implementation`.

### Changed

- Tighten the `work-item protocol` so `ACTIVE` only opens when the approval gate, the bootstrap gate when present, and the `s04-s06` evidence are sufficient.
- Remove the bypass path via `decision_owner=human`, `review_required=false` or `approval_status=NOT_REQUIRED` on a protocol-managed item/change.
- Standardize `greenfield|brownfield` more clearly in the scaffold, protocol, governance validator and docs.
- Change the default `wfc work-item activate` to the execution step `s07`.
- Sync docs, glossary, human review gates, quickstart, package README and help text to the new semantics.

### Fixed

- Fix the drift between the "human-controlled gates" policy and the runtime/protocol enforcement.
- Fix the drift between frontmatter/template docs and the actual scaffold for `approval_gates`, `role_signoffs`, `gate_reviews`.
- Fix command examples so they no longer imply "scaffold then activate immediately".
- Fix the old fixture path reference in `project-context/README.md`.

## Scope

- Workflow bundle install surface:
  - `wfc install --mode codex|claude --scope global|project|both`
  - `wfc update --mode codex|claude`
  - `wfc status --mode codex|claude`
  - `wfc skills list|add|remove --mode codex|claude`
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

## Upgrade

If the machine is on `workflow-bundle@2.0.0`:

```bash
npm install -g workflow-bundle@2.0.1
wfc version
wfc update --mode codex
wfc update --mode claude
```

If using the source repo:

```bash
cd packages/workflow-bundle
npm run bundle:workflow-bundle-runtime
npm link
wfc version
```

## Verification

The checks run for this release:

- `git diff --check`
- `node packages/workflow-bundle/scripts/validate-workflow-governance.js --workflow-root work-items --project-root .`
- `node packages/workflow-bundle/scripts/validate-work-item-protocol.js --workflow-root work-items --project-root .`
- `node packages/workflow-bundle/scripts/validate-workflow-change.js --workflow-root work-items --project-root .`
- `cd packages/workflow-bundle && node scripts/run-workflow-governance-fixtures.js`
- `cd packages/workflow-bundle && node scripts/run-workflow-authoring-smoke.js`

Results:

- governance validator passed
- protocol validator passed
- change validator passed
- governance fixtures passed
- authoring smoke passed

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Notes

- `v2.0.0` is still the first public release.
- `v2.0.1` is a patch release focused on hardening, clarity and CLI/runtime consistency.