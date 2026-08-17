# workflow-bundle v2.3.2

Released: `2026-08-14`
Tag: `v2.3.2`
Branch: `release/v2.3.2`

> Superseded on `2026-08-17` by `v2.4.0` in the prepared release surface. The v2.4.0 tag and
> publication remain subject to the human Release gate. Verification figures below are preserved as
> the original v2.3.2 record and must not be reused as corrective-release evidence; see
> [`CHANGE-002/evidence-correction.md`](../../changes/CHANGE-002/evidence-correction.md).

## Changelog

`workflow-bundle v2.3.2` adds the `sa` and `ta` skills to the pack (38 → 40 skills) and wires them
into the policy layer and the step map. No gate, governance, or workflow-chain behavior changes.

### Added

- **`sa`** (`skills/analysis/sa/`): the Solution and System Architect lens. Turns a request into
  solution-level and system-level architecture drivers — objectives with measures, business and
  regulatory constraints, which system should own which capability, where the seams between systems
  sit, and which data needs a single source of truth.
  - Runs at `s01`–`s04`, before `s04` locks acceptance criteria and before any technical approach is
    chosen at `s05`.
  - Carries **both** the Solution and System lens deliberately: in digital-transformation work the
    two roles are rarely staffed separately, so splitting them would draw a line most organisations
    do not have.
- **`ta`** (`skills/analysis/ta/`): the Technical Architect lens. Turns a request into quality
  attribute scenarios with numeric thresholds, technical constraints, integration realities and
  legacy limits.
- Both skills share five reference files kept byte-identical across the two skill folders
  (`output-schema`, `metric-table`, `block-ownership`, `landscape-quality-bar`, `invocation-rules`)
  plus a worked `example`. A `diff` between the copies is part of the verify path.
- Both ship EN + `.vi.md` siblings and an `agents/openai.yaml`, following existing pack convention.

### Changed

- **`policies/codex/AGENTS.global.md` § Skill Requirement**: added the `s01`–`s04` clause naming
  when to use `sa` and when to use `ta`, including the exclusions that keep `system-design` (`s05`)
  and `domain-architecture` in their own lanes.
- **`codex-workflow-chain/references/workflow-chain.md` + `.vi.md`**: `sa` and `ta` added to the
  `S1 Clarify` block, after `requirement-analysis` and `product-thinking`.

### Fixed

- (none)

## Scope

- New skill files under `skills/analysis/sa/` and `skills/analysis/ta/`, the two documentation
  changes above, plus the standard version bump across manifests, `package.json`, `wfc` help text,
  and public docs.
- **Not included**: the four verification items still open on the authoring work item — a real
  multi-system case run, an independent trigger-disambiguation check, visual confirmation of the
  generated `drawio` output, and a downstream reader test of the handoff blocks. The skills are
  usable; those four close the remaining acceptance criteria.
- `sa` and `ta` produce **constraints, not designs**. Neither names a technology, and neither
  allocates a capability to a specific system — both stay inputs to `s05`, which still owns the
  choice. This keeps the `AI proposes, human approves` gates untouched.

## Known Issues

- **Upgrading over an existing install can fail with `EACCES`.** Files written by a previous
  `wfc install` land at mode `0444`, and `copyFileSync` preserves source permissions, so the second
  install cannot overwrite them. The error names a single file, so it reads like one corrupt file
  rather than a systemic permission problem. Workaround before upgrading:

  ```sh
  chmod -R u+w ~/.claude/policies ~/.codex/policies ~/.claude/skills ~/.codex/skills
  ```

  The same cause makes `npm run build:workflow:bundle-runtime` fail when it writes the package
  manifest. Not fixed in this release.

## Verification

- `npm run validate:workflow:pack-audit` → `WORKFLOW_PACK_AUDIT=PASS` (40 skills; `sa` and `ta`
  frontmatter, folder match, and YAML scalar all pass).
- `npm run build:workflow:bundle-runtime` → mirror synced (40 × 2 modes = 80); `diff -r` between
  source and runtime empty for `sa` and `ta` in both modes.
- `npm run validate:workflow:bundle-smoke` → PASS (installed version 2.3.2).
- `npm run validate:workflow:unit` → PASS (26 unit test files).
- `npm run validate:workflow` / `wfc sdd` / `wfc plan` → PASS (114 notes).
- `wfc install` run for all four mode × scope combinations; `wfc status` reports
  `installed_version=2.3.2, managed_skills=40` for both `claude` and `codex`.
- Changed text files valid UTF-8.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Notes

- `v2.3.1` is the previous release.
- `v2.3.2` is the historical release superseded by the prepared `v2.4.0` release surface.
- Version step follows the pack's own precedent: `v2.3.1` also added one skill (37 → 38) as a patch
  bump. Adding skills is treated as additive and backward-compatible here, not as a minor release.
