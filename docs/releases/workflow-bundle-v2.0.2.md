# workflow-bundle v2.0.2

Released: `2026-04-20`
Tag: `v2.0.2`
Branch: `release/v2.0.2`

## Changelog

`workflow-bundle v2.0.2` is the patch release after `v2.0.1`, focused on capability control and trusted human approval enforcement to reduce the chance of bypassing gates that require human review/approve.

### Added

- Add `workflow-capability-control.js` to lock the implementation path at the filesystem level until the protocol opens `ACTIVE + s07 + granted_write_paths`.
- Add `wfc capability status|sync|check` to inspect and sync capability control.
- Add `workflow-trusted-approval-utils.js` to create and verify trusted signed receipts outside the project root.
- Add `workflow-gate-review.js` and the `wfc gate approve|reject|status` command for trusted human approval at the workflow gates.
- Add a `capability-control` smoke case to test the real lock/unlock of the implementation path.
- Add a `greenfield-qr-voucher-proposal` regression smoke to block a raw greenfield feature request with UI + API + brand tone from going straight to scaffold or code.

### Changed

- `wfc work-item activate|resume` now requires `--write-root` or an existing `granted_write_paths`.
- `work-item`, `change-item` and workflow gate approval no longer rely only on metadata in the note/report; the protocol cross-checks trusted signed receipts before opening `ACTIVE`, `VERIFIED`, `DONE`.
- `greenfield bootstrap` no longer accepts self-attested CLI metadata like `--bootstrap-reviewed-by`; bootstrap approval must go through a trusted gate receipt.
- `materialize`, `init`, `scaffold`, `scaffold-change` and protocol transitions will sync capability control automatically for a more consistent write policy.
- Public docs, quickstart, help text and the protocol reference have been updated to the new flow.

### Fixed

- Fix the gap between `human-controlled gates` and runtime enforcement when the agent not only goes through the validator but also edits the implementation path directly.
- Fix the legacy bootstrap footgun and the mutating-action bootstrap report.
- Fix the "AI self-declares reviewed_by is enough" gap with signed receipts tied to the artifact digest.
- Fix the semantic drift in the router status block: if there are still `Missing Gates`, it must not report `ACTIVE` and `Next Human Action` must not be `NONE`.

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
  - `wfc gate`
  - `wfc capability`
  - `wfc protocol`

## Verification

The checks run for this release:

- `npm run bundle:workflow-bundle-runtime`
- `git diff --check`
- `node packages/workflow-bundle/scripts/validate-workflow-governance.js --workflow-root work-items --project-root .`
- `node packages/workflow-bundle/scripts/validate-work-item-protocol.js --workflow-root work-items --project-root .`
- `node packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js`
- `node packages/workflow-bundle/scripts/run-workflow-bundle-smoke.js`
- `node packages/workflow-bundle/bin/wfc.js help`

Results:

- governance validator passed
- protocol validator passed
- authoring smoke passed
- bundle smoke passed
- help surface passed

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Notes

- `v2.0.0` is still the first public release.
- `v2.0.1` is the hardening semantics/protocol patch release.
- `v2.0.2` is the patch release tightening capability control and trusted human approval enforcement.