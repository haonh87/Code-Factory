# workflow-bundle v2.3.1

Released: `2026-07-24`
Tag: `v2.3.1`
Branch: `release/v2.3.1`

## Changelog

`workflow-bundle v2.3.1` is a minor release that adds the `goal-griller` skill to the pack (37 → 38 skills). No workflow-chain, gate, or governance behavior changes.

### Added

- **`goal-griller`** (`skills/orchestration/goal-griller/`): a standalone skill that turns a vague ask into a precise, verifiable `/goal` prompt an autonomous agent can run to completion without a re-prompt per step.
  - Trigger: the user mentions goal mode, `/goal`, `create_goal`, autopilot, autonomous work, or asks for an interview before setting a long-running goal.
  - Enforces a six-field hard gate (Outcome, Success condition, Scope boundary, Context, Validation loop, Stop/pause rules) before drafting the final goal.
  - Routes output to the target agent's native `/goal` format via one of five references: `references/claude-code.md`, `references/codex.md`, `references/pi.md`, `references/opencode.md`, `references/generic.md`.
  - Imported EN-only (no `.vi.md` siblings), following the same convention as `notebooklm`.

### Changed

- (none)

### Fixed

- **`bump-version.js` repo-root resolution**: `resolveRepoRoot()` returned the first `workflow-bundle.manifest.json` found while walking up from the script dir, which is the inner `packages/workflow-bundle/` manifest, not the repo root — causing a doubled-up path (`packages/workflow-bundle/packages/workflow-bundle/…`) and an ENOENT crash when `wfc version bump` ran without an explicit `--repo-root`. It now returns the outermost manifest (repo root). Regression test added (`bump-version.test.js`).

## Scope

- New skill files only under `skills/orchestration/goal-griller/` plus the standard version bump across manifests, `package.json`, `wfc` help text, and public docs.
- `goal-griller` is a meta prompt-authoring skill for autonomous `/goal` mode. It does not participate in the `s01 -> s08` workflow chain and does not appear in the step tables; it does not alter the `AI proposes, human approves` gates. Note the philosophical tension: the skill supports long-running autonomous goals, whereas the pack's backbone is human-gated — the skill's own "Stop / pause rules" clause stays the safety boundary.

## Verification

- `npm run validate:workflow:pack-audit` → `WORKFLOW_PACK_AUDIT=PASS` (38 skills; goal-griller frontmatter, folder match, YAML scalar, and cross-references all pass).
- `npm run build:workflow:bundle-runtime` → mirror synced (38 × 2 modes).
- `npm run validate:workflow:bundle-smoke` → PASS (installed version 2.3.1).
- `npm run validate:workflow:unit` → PASS.
- `git diff --check` clean; changed text files valid UTF-8.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Notes

- `v2.3.0` is the previous release.
- `v2.3.1` is the current release.
