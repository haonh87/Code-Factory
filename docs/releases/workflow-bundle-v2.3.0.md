# workflow-bundle v2.3.0

Released: `2026-07-21`
Tag: `v2.3.0`
Branch: `release/v2.3.0`

## Changelog

`workflow-bundle v2.3.0` ships two independent, additive changes since `v2.2.1`:
1. The whole public docs and skill surface is now written in English by default, with Vietnamese kept as supplementary reference files, for the community-facing release.
2. A new `sdd_mode=light` profile — a lighter-weight, lower-paperwork way to run the same eight-step workflow — is now fully wired up: eligibility router, Spec Card, compact CR, and the authority-layer update that makes agents actually follow the new rules.

### Added

- **`sdd_mode=light` profile** (SDD Light, plan v5, approved 2026-07-16): the same eight-step workflow, but with fewer required documents and less required approval overhead, for eligible brownfield/quick/agentic/low-risk work items.
  - Eligibility router + hard-escalation matrix (`workflow-sdd-definitions.js`), budget assertions (artifact count, generated line count, required prompts).
  - Spec Card (`product-specs/templates/spec-card.template.md`) replaces separate `BRD`/`SRS` for Light — semantic validation of `REQ`/`AC` mapping, provenance (`BASELINE`/`CR-###`), and freeze authority (`validate-workflow-sdd.js`).
  - Compact scaffold with lazy `s07`/`s08` note creation (`scaffold-workflow.js`).
  - Profile-aware gate host map: `Spec+DoR` at `s04`, `Approach+Task Plan` at `s06` (no separate `s05` note); a work item that needs a `Foundation Decision` auto-escalates to the full workflow instead (`validate-workflow-governance.js`, `workflow-gate-review.js`, `work-item-protocol.js`).
  - Materializer eligibility routing and classification (`materialize-work-item.js`).
  - Compact Change Request (`cr_profile=compact`, one `request.md`) with canonical `CR`/`cr_*` vocabulary and dual-read of legacy `CHANGE`/`change_*` during the migration window (`workflow-change-definitions.js`, `scaffold-change-package.js`, `validate-workflow-change.js`).
  - CR aggregate reconciliation and atomic `ACCEPTED` spec version bump, with no-self-accept and waiver handling (`cr-aggregate-reconcile.js`, new).
  - Telemetry recorder for rollout metrics (`workflow-telemetry.js`, new); `wfc cr-aggregate` CLI command; `npm run validate:workflow:unit` to run the full unit suite.
  - Authority cutover: `policies/codex/AGENTS.global.md` gains the authoritative `Hard Rule: SDD Light Profile` section; `workflow-chain.md`, `spec-driven-development.md`, `work-item-materialization.md`, and the `workflow-governance-router` skill were updated to recognize and correctly gate `sdd_mode=light` work items.
  - Manifest schema versioning (`workflowSchemaVersion`, `crSchemaVersion`) propagated through bundle sync for install/authority-copy consistency checks.
- **English-first public surface**: `README.md`, `docs/publish-surface.md`, `docs/workflow-docs-map.md`, `docs/workflow-bundle-quickstart.md`, `packages/workflow-bundle/README.md`, `project-context/`, and the full `skills/` tree are now English by default, with Vietnamese preserved as `*.vi.md` siblings (and `docs/vi/` for the community-facing overview). `policies/codex/AGENTS.global.md` (the installed global policy) is English-first as well; a user's own personal `~/.claude/CLAUDE.md` is untouched by this change.
- `LICENSE` (MIT) and `CONTRIBUTING.md` at the repo root for the public/community release.

### Changed

- `.gitignore`: `memory-bank/`, `docs/plans/`, and `docs/research/` are now excluded as internal working assets — they are not part of the public surface. A single file in one of these folders can still be committed on purpose (`git add -f`) when a work item genuinely needs to keep it as its approved authority source.

### Fixed

- Nothing new in `v2.3.0` itself. The one bug fixed this development cycle — a precedence bug in `normalizeInstallState` — already shipped in `v2.2.0`.

### Compatibility

- Full/strict work items are unaffected: this release is additive only. Verified before and after every change in this cycle: `wfc validate` (108 files / 104 governance notes, 0 delta), the full unit suite (24/24 files), all 7 plan verification commands, and `wfc bundle-smoke`.
- Legacy `CHANGE`/`change_*` vocabulary is still dual-read with a migration warning; the canonical writer only emits `CR`/`cr_*`.
- `sdd_light_profile` rollout flag defaults to `preview` (an eligible work item auto-selects Light unless the flag is set to `off`); the flag has **not** been switched to `default` for the whole team as part of this release — that remains a separate, explicit human decision based on real usage data.

## Scope

- Work items `community-pack-i18n` (i18n rollout, DoD passed 2026-06-24, merged 2026-07-20) and `sdd-light-code-factory` + `sdd-light-authority-cutover` (SDD Light T1-T9, both DoD passed 2026-07-20/21) — all three DONE and merged directly to `main` prior to this release branch being cut.
- Not included: switching `sdd_light_profile` to `default` for the team; full automation of the three SDD Light telemetry metrics (`required_prompt_count`, `approval_interaction_count`, `lead_time_ms`) that are not yet wired into any CLI call site (known residual, tracked in `sdd-light-authority-cutover`'s DoD).

## Verification

- `node packages/workflow-bundle/test/run-all.js` — 24/24 unit test files PASS.
- The plan's 7 verification commands (`validate:workflow:governance|sdd|change|planning|protocol|authoring-smoke`, `validate:workflow`) — all PASS, including the legacy `CHANGE-001` dual-read regression check.
- `wfc bundle-smoke` — PASS.
- A real canary run (`wfc materialize --sdd-preset light --auto-scaffold --telemetry on`) produced 3 artifacts / 434 generated lines for a sample eligible bug fix — within the Light budget (≤4 artifacts, ≤450 lines pre-implementation).
- A rollback rehearsal (reverting the 5 authority files in a scratch worktree) restored the pre-cutover state cleanly, with `wfc validate` and `wfc bundle-smoke` passing.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Notes

- `v2.2.1` is the previous release.
- `v2.3.0` is the current release.
