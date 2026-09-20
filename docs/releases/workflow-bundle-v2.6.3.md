# workflow-bundle v2.6.3

Prepared: `2026-09-19`
Planned tag after Release approval: `v2.6.3`
Change package: `CHANGE-007`
Baseline: public `v2.6.2`, with release preparation starting from main `3204749e9fac592e9f38e327dbd85a87b84b2325`
Status: `UNPUBLISHED`; human Release and Business Acceptance gates remain authoritative

## Summary

`v2.6.3` is a backward-compatible hardening candidate for the existing workflow-bundle command surface and its 42 managed skills. It packages CR-009: exact ID-based disposition for active work-item state, signed append-only history for resolved state, and a terminal archive guard that refuses unresolved blockers and required actions. It does not weaken gate authority or convert a prepared candidate into a public release.

## Complete Packaged Delta

The complete packaged behavior delta from `v2.6.2` to this candidate is:

- `wfc work-item status --json` exposes snapshot-bound `disposition_targets[]` for active blockers and required actions. Duplicate display text does not identify an entry.
- `wfc work-item dispose-state` selects one exact `state_id`, validates the report snapshot, collection, and position, and requires a Maintainer-authorized signed disposition.
- successful disposition removes only the selected active entry and appends an immutable record to `resolved_state_history[]`, including operation identity, reviewer evidence, reason, source collection, and the exact original value.
- identical `operation_id` retries are idempotent; conflicting operation reuse, stale IDs, and mismatched targets fail closed.
- legacy string state remains compatible without semantic inference. Unknown legacy values are treated as opaque data rather than parsed by regex, substring, fuzzy alias, or Unicode word-boundary rules.
- per-work-item locking, snapshot verification, and atomic replacement protect state mutation across retry and failure boundaries.
- archive and resume transitions preserve unrelated typed state and refuse unresolved opaque or active state. Archive does not clear blockers as a side effect.
- terminal reports cannot be silently overwritten by materialization; validators and authoring smoke cover the disposition, history, archive, retry, and compatibility contracts.
- Codex and Claude Code retain the same five install modes, Node `>=18`, npm `>=9`, public command families, and 42 managed skills.

## Non-Packaged Repository Changes

Workflow documentation and planning history accumulated after `v2.6.2` records governance decisions, audits, work-item evidence, and release preparation. That repository history does not add files to the npm tarball unless a path is already part of the package manifest. This release record therefore separates packaged runtime behavior from repository-only traceability instead of presenting every intervening commit as an npm-package feature.

## Compatibility

- Existing `wfc` command families, install state, Codex/Claude modes, managed-skill count, Node `>=18`, and npm `>=9` remain supported.
- Legacy string state entries remain readable and are preserved byte-for-byte in signed resolved-state history.
- Existing typed state that does not carry a resolvable exact identity remains active until an authorized disposition targets it; core transitions never infer clearance from human-readable text.
- No database, API, event, deployment, or user-configuration migration is introduced.
- Rollback to the retained `v2.6.2` artifact removes the CR-009 disposition/history behavior while retaining the earlier adaptive-governance runtime and public command surface.

## Verification

Completed locally during release preparation:

- fail-first contracts pin `v2.6.3` identity, immutable historical release-record digests, complete release documentation, and exact `v2.6.3 -> v2.6.2` rollback behavior.
- source-mode checks confirm the candidate exposes `dispose-state` and `resolved_state_history`, while the rollback source does not.
- generated Codex and Claude runtimes retain 42 managed skills each.

Remote and human evidence is intentionally not inferred. At the initial candidate cut, B1/B2/B3 review, s08 Technical Verification, DoD, Release, and Business Acceptance remain pending. The current review state is:

- GitHub-hosted Workflow Guardrails has not run for the v2.6.3 release branch.
- B1 Spec Compliance and Code Quality passed in order for source `4e78c868c097b553e29116f23aea78a7528ec42a` with unchanged B1 diff SHA-256 `db70b5bad2d473d0a620c7d0d002b0e8fe009aeb3dc233cec3c380a56fc718a2`.
- B2/B3 review, s08 Technical Verification, DoD, Release, and Business Acceptance remain pending.
- The candidate tarball SHA-256 will be bound only after the hosted build-once run; the same artifact must pass Node 18 and Node 22 without per-environment rebuild.

## Rollback

Retained immutable fallback:

- artifact: `workflow-bundle-2.6.2.tgz`
- SHA-256: `af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f`
- expected identity after rollback: `v2.6.2/42`

Before replacing an installation, capture mode, scope, project roots, and `wfc status`. Install the retained artifact by absolute path, rerun `wfc install` for each recorded Codex or Claude target, verify `v2.6.2/42`, and confirm unmanaged files and permissions are unchanged. Do not use a mutable registry alias as rollback evidence.

## Known Limitations

- The exact `v2.6.3` tarball digest, hosted run ID, Node 18/22 matrix evidence, and zero-annotation result remain pending until Workflow Guardrails runs on the reviewed release branch.
- Public npm authentication, package-name ownership, version collision, GitHub tag, GitHub Release, and `latest` movement are preflight or publication concerns and are not proven by local tests.
- Rollback removes exact state disposition. Operators must preserve historical reports and signed receipts; rollback must not rewrite or re-sign them.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Release Gates

- B1 metadata and release contracts: Spec Compliance PASS, then Code Quality PASS; missing local ESLint and Semgrep were accepted as non-blocking scan gaps.
- B2 active documentation and this release record: pending ordered Spec Compliance then Code Quality review.
- B3 integrated branch candidate: pending ordered Spec Compliance then Code Quality review.
- s08 Technical Verification and DoD: pending exact hosted candidate evidence.
- Release: pending DevOps and QC approval for the exact main candidate.
- Publication: prohibited until Release approval; tag, GitHub Release, npm publication, and `latest` must remain one controlled transaction.
- Business Acceptance, terminal archive, branch/worktree cleanup: pending successful public verification.
