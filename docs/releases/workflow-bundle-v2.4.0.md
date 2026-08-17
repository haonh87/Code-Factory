# workflow-bundle v2.4.0

Release candidate prepared: `2026-08-17`
Planned tag: `v2.4.0`
Change: [`CHANGE-002`](../../changes/CHANGE-002/proposal.md)
Status: `UNPUBLISHED — Release, Business Acceptance, and DoD remain human-controlled gates`

## Changelog

`workflow-bundle v2.4.0` is the corrective release for the reviewed v2.3.2 findings. It makes
repeat updates recover safely, corrects the `sa` and `ta` public contracts, strengthens strict and
regulated workflow evidence validation, and completes the architecture lane with
`architecture-modeling` in both runtimes.

### Added

- `architecture-modeling` at `skills/architecture/architecture-modeling/`, with paired English and
  Vietnamese instructions and references.
- One stable architecture model with business and engineering views traced by `source_fact_ids`.
- Explicit routing for `ARCHITECTURE_YAML`, `STRUCTURIZR_DSL`, draw.io, Mermaid, and Structurizr.
- Exactly-one render ownership across house renderer, bundled renderer, and unresolved paths.
- Deterministic, zero-dependency mxGraph draw.io rendering and validation for allowlisted landscape
  and integration views.
- A 41-managed-skill inventory in each generated Codex and Claude runtime.

### Changed

- `sa` and `ta` now use the exact threshold enum, distinct lens ownership, separate worked examples,
  complete M-01 through M-10 metrics, recomputed coverage, and aligned EN/VI metadata.
- Strict and regulated workflow validation now rejects empty or placeholder required evidence,
  stale receipt digests, inconsistent coverage totals, and contradictory protocol state.
- The version bump utility updates structured metadata only; public and historical documentation is
  an explicit review boundary instead of a blind search-and-replace target.

### Fixed

- Repeat install/update and runtime sync recover owner access only on explicit managed targets.
- Unmanaged siblings retain content and mode across managed updates.
- Managed symbolic-link targets are refused instead of followed.
- Tampered managed-skill state containing traversal names is rejected before any `chmod` or removal
  can escape `skillsHome`.
- The stale Task Plan blocker in the active CHANGE-002 protocol state is cleared without rewriting
  protocol history.
- Historical v2.3.2 evidence defects are recorded append-only in
  [`CHANGE-002/evidence-correction.md`](../../changes/CHANGE-002/evidence-correction.md); no prior
  reviewer, timestamp, receipt, or artifact digest is fabricated.

## Inventory

- Canonical source: 41 managed skills.
- Codex runtime: 41 managed skills, recursively byte-equal to canonical source.
- Claude runtime: 41 managed skills, recursively byte-equal to canonical source.
- Package dry-run: 82 runtime `SKILL.md` entries plus both complete `architecture-modeling` trees.

## Compatibility

- Existing `wfc` commands, flags, state filenames, legacy-state migration, Node `>=18`, and npm
  `>=9` requirements remain compatible.
- Existing explicit managed-skill subsets remain subsets during update; install-all includes 41
  skills.
- House presentation/modeling skills retain render ownership when present. The bundled renderer
  must not create a competing diagram artifact.
- Existing default-profile finalized notes remain compatible. Strict or regulated finalized notes
  with required evidence defects now fail with actionable validation messages.
- No database, application-data, runtime-topology, or deployment migration is introduced.

## Known Limitations

- Automated draw.io quality is `PASS`, while the representative diagram remains
  `PENDING_QC_FIRST_OPEN`; the agent has not inferred visual approval.
- The bundled draw.io renderer supports landscape and integration views. Deployment topology remains
  routed to draw.io but requires a house renderer or returns `BLOCK_RENDER`.
- General-purpose graph layout and arbitrary diagram shapes are outside this release.
- The host lacks PyYAML, so `skill-creator`'s optional `quick_validate.py` was skipped; the
  dependency-free contract tests and workflow pack audit are the recorded alternative.
- The host has no configured `eslint` or `semgrep`; native syntax, 34 unit test files, negative
  fixtures, and diff-aware manual security/performance review are recorded, while the automated
  pre-handoff code-scan verdict remains `PARTIAL`.
- Tagging, registry publication, live global installation/update, merge, and worktree cleanup are
  not authorized by this candidate.

## Verification

- T1: managed permission and hardened Codex/Claude × global/project update checks pass with unchanged
  unmanaged hashes and modes.
- T2–T4: architecture-role, architecture-modeling, semantic evidence, protocol, authoring-smoke,
  and pack-audit checks pass.
- T5: renderer refusal, XML escaping, deterministic digest, stable IDs, containment, geometry,
  tamper detection, `xmllint`, and automated quality metrics pass. The retained representative
  draw.io SHA-256 is `1585d15d0a9520e0940fcb389afbc7de6bb22e4ddb6fdb80f16958551017485d`.
- T6: runtime sync reports 82 generated copies; canonical/Codex/Claude counts are 41/41/41;
  recursive byte equality and `diff -qr` pass; bundle smoke and package dry-run inclusion pass.
- T8: 34 unit test files, all workflow validator lanes, 13 authoring-smoke cases, 10 governance
  fixtures, pack audit, bundle smoke, UTF-8/JSON/syntax checks, install-all 4/4, and isolated
  v2.3.2 rollback for Codex and Claude pass.
- The retained tarball filename, SHA-256, package inventory, and source commit are recorded in
  CHANGE-002 execution evidence after packaging; QC first-open and the final human gates remain
  pending.

## Rollback

- Before Release approval, invalidate and discard the candidate while leaving v2.3.2 as the
  published release; do not tag or publish v2.4.0.
- Before replacing the package, capture `wfc status --mode codex|claude`, the saved scope, and every
  project root. After publication, rollback must resolve to the retained immutable v2.3.2 artifact
  or tag, never a convenience tag.
- Install that v2.3.2 package, then run `wfc install --mode codex|claude --scope global|project|both
  [--project-root <repo-root>]` for every captured target. Verify `installed_version=2.3.2`, the
  40-skill inventory, absence of `architecture-modeling`, and unchanged unmanaged hashes/modes.
- Do not use the v2.3.2 `wfc update` command for this downgrade. The older CLI rejects the newer
  `architecture-modeling` managed-state entry; v2.3.2 `wfc install` is the tested replacement path.
- Rehearse only in isolated Codex and Claude roots before touching a live installation because the
  documented v2.3.2 hardened-update permission defect still applies. Application data is unaffected
  because this release has no data migration.
- Keep the implementation branch/worktree until s08 DoD and branch-finish review authorize merge or
  cleanup.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Release Gates

- Approved: work item, CHANGE-002, Spec (`ba`), Contract (`developer`), DoR (`qc`), Approach
  (`developer`), and Task Plan (`developer`), each with a digest-matched trusted receipt.
- Pending: QC first-open of the retained draw.io and the human DoD, Release, and Business Acceptance
  decisions.
- Do not create `v2.4.0`, publish to a registry, update live global installations, merge, or clean
  the worktree until the corresponding human-controlled gate authorizes that action.
