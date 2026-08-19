# workflow-bundle v2.5.0

Candidate prepared: `2026-08-18`

## Release Preparation

CHANGE-003 is an additive release candidate that completes the `artifact-governance` skill for
public bundle use and registers the existing 42-skill source inventory as `v2.5.0`. It does not
change command syntax, workflow schemas, receipt formats, or managed/unmanaged ownership.

This candidate remains unpublished until the human Release gate passes. No tag, registry publish,
live global update, merge, or worktree cleanup is implied by this note.

## Included Changes

- 42 managed skills in canonical source and in each generated Codex and Claude runtime.
- Complete English/Vietnamese `artifact-governance` content and recursive runtime parity.
- Machine enforcement for artifact placement, ownership duplication, section-first execution
  readers, plural role sections, and registered role-indexed handoff artifacts.
- Version-scoped release tests that preserve `v2.4.0 = 41` and `v2.3.2 = 40` as historical facts.
- Exact-artifact install/update and rollback harnesses with SHA-256 identity checks.

## Compatibility

- The public `wfc` command surface is unchanged from v2.4.0.
- Existing legacy workflow artifacts remain readable through the approved compatibility path.
- Clean and update installs add `artifact-governance` as managed skill 42.
- Unmanaged files, hashes, and modes remain outside bundle ownership.

## Known Limitations

- Registry installation is unavailable until the human Release gate approves publication.
- The exact candidate digest and the final 4/4 install/update and rollback evidence are recorded
  only after the verified candidate is built; this note does not infer them early.
- Global live installations are not modified during candidate verification.

## Verification

- Pre-candidate source gate: full unit suite, workflow validators, fixtures, planning validation,
  workflow-pack audit, source bundle smoke, syntax/security heuristics, UTF-8, and diff checks.
- Candidate gate: one retained `workflow-bundle-2.5.0.tgz`, package inventory, source identifier,
  and SHA-256; Codex/Claude × global/project install/update must pass 4/4.
- Rollback gate: the exact retained v2.4.0 tarball with SHA-256
  `44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e` must pass 4/4.

## Rollback

Capture mode, scope, project roots, and status before replacement. Install the retained immutable
v2.4.0 tarball, then run `wfc install` for each recorded target. The expected transition is
`v2.5.0/42 -> v2.4.0/41`; `artifact-governance` is removed and unmanaged state is unchanged.

Do not use the v2.4.0 `wfc update` command for this downgrade because the saved v2.5.0 managed
state contains `artifact-governance`. Use the retained v2.4.0 tarball and `wfc install` instead.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Release Gates

- DoD: human QC approval after s08 evidence.
- Release: human QC or DevOps approval after exact candidate and rollback evidence.
- Business Acceptance: human PO approval after the technical and release gates are reviewable.
- Until all required gates pass, describe v2.5.0 as a release candidate, not a current public release.
