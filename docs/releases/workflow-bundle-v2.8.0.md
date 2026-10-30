# Workflow Bundle v2.8.0

Status: **PUBLISHED on GitHub** at `2026-10-30T04:15:18Z`.
[GitHub Release v2.8.0](https://github.com/haonh87/Code-Factory/releases/tag/v2.8.0).
Tag `v2.8.0` points to verified commit `6c70a4ef9758948acf3d3e3add94c8c7f407846c`,
which was integrated into `main` before publication. The release is neither draft nor prerelease.

The original verified tarball and `SHA256SUMS` are published. Both were downloaded
again: the tarball matches its frozen SHA-256 and size; the checksum file matches
the expected bytes. The downloaded tarball also passes all four isolated
Codex/Claude global/project install/update scenarios. No live installation changed.

## Release Scope

48 managed skills per Codex/Claude runtime. Five new maintenance skills:
`bug-triage`, `log-investigation`, `metric-correlation`, `root-cause-analysis`,
`evidence-handoff`. Maintenance delivery has signed human QC DoD and is merged
at `6f7303d`; its implementation is `248feb4`.

The package also includes CF-023 current-host receipt binding validation (`0f0f5ad`),
with signed QC DoD and merge `7dce033`.

The Git tag and source archive include SEC-01 legacy Codex installer containment
(already included in v2.7.0; closure `d2add91`) and SEC-02 physical-root containment
for github-push, gitlab and session-search MCPs (`ad0c953`, closure `8161211`).
SEC-02's signed QC DoD was checked before integration: APPROVED, digest_match=true,
reviewed_at `2026-10-29T10:48:23.975Z`.

MCP servers and direct shell/PowerShell installers are outside the workflow npm
package allowlist. Consumers receive those fixes from the tagged repository source;
installing the workflow tarball alone does not update a running MCP server.
The prior diagram presentation adapter remains available.

## Compatibility

No new command family, dependency, gate authority or application schema change.
Five skills are additive. CF-023 binds contradictions to current gate-host evidence.
SEC-02 intentionally rejects physical paths outside permitted roots, contradictory
metadata and stale/outside search results while preserving tool names and schemas.
The release preparation changes version constants, release expectations and public
instructions only; it does not implement A1/A2 scenario/task contracts.

## Verification

Verification ran in an isolated Git worktree based on main `6f7303d` plus the
completed SEC-02 branch. [Workflow Guardrails run 41001143561](https://github.com/haonh87/Code-Factory/actions/runs/41001143561)
passed all ten jobs on the tagged commit, including Node 18/22 unit/regression,
pack audit, source install/update and exact-candidate smoke checks.

All 945 file contents and modes match the CI tarball. Its archive SHA-256 is
`1042cc3e99414d3efeadbb56ae8962ba6ef64955ed68cf340a2d53d41982a3e6`;
archive bytes differ from the original locally tested tarball, which was retained
unchanged for publication. The release asset and checksums are the durable package
identity; temporary local preparation logs are not a permanent evidence store.

An earlier archive-only check could not satisfy a regression test that requires Git
metadata; the complete suite subsequently passed in a Git worktree. Initial 2.8.0
checks rejected stale release expectations, which were updated to the actual
2.8.0 -> 2.7.0 inventory transition without removing preservation assertions.

## Known Limitations

Native Windows SEC-02 verification has not run; Windows MCP rollout remains a
separate follow-up. The approved threat model assumes a trusted filesystem without
concurrent hostile writers and excludes hard links, hostile executable/index and
repository hooks/config. No performance benchmark or general-purpose SAST scan is
claimed. Python/Playwright/Chromium for optional PNG output remain separately
provisioned. No live MCP deployment, managed-home update or npm registry publication
is performed by this GitHub release.

## Rollback

Retain the published workflow-bundle-2.7.0.tgz, 43 skills per runtime, SHA-256
`ecc194da5398b6b5ef321549600711bd4b96cf6f2621f0b95ca958547e5061ac`.
Verify the digest and rehearse against isolated Codex/Claude global/project targets
before a live managed downgrade. Preserve unmanaged content and existing trusted
receipts. Workflow-package rollback does not revert MCP source. Reverting SEC-02
would restore its security exposure and needs a separate explicit decision.

## Release Gates

Existing completed work-item DoD and their signed hosts are preserved unchanged.
The maintainer explicitly authorized publishing the completed scope in this session:
“SEC-01, SEC-02 cũng xong, 5 skill mới đủ phát hành hãy phát hành”.
This record documents that operational release instruction; it does not mint a
trusted gate receipt or alter a work item's approval state. The integrated candidate's technical checks passed before publication. This operation uses the existing
GitHub release channel; there is no registry or live-deployment approval inferred.

## Verification Evidence

- Artifact: `workflow-bundle-2.8.0.tgz`, 945 files, 1,621,314 bytes.
- SHA-256: `397108e725d22111f328fd5d7bc5765090d7f5e441eb3256860b1a3e579e0d1f`.
- Local runtime: Node 26.5.0 on macOS; all 50 workflow unit test files passed.
- Three MCP package checks passed: 82 tests plus syntax checks.
- Pack audit PASS; all six Guardrails validator lanes, authoring smoke and bundle smoke passed.
- Exact tarball install/update matrix: Codex/Claude x global/project 4/4 passed.
- Exact 2.8.0 -> published 2.7.0 rollback: 4/4 passed, unmanaged hashes/modes preserved.
- Rollback rehearsal explicitly adds/removes all five new maintenance skills and verifies
  their removal on downgrade while retaining the pre-existing presentation adapter.
- Signed DoD status for SEC-01, SEC-02, maintenance skills and CF-023: APPROVED,
  digest_match=true. Their signed hosts and historical release records remain unchanged.
- Changed text UTF-8 validation and `git diff --check` passed.
- Semantic review inherits the accepted skill-family scope and checks the release delta:
  no skill/template authority changes; source/package boundaries and 48-skill inventory
  are explicit. No behavior implementation or new dependency is introduced here.
- Hosted Node 18/22 Guardrails: 10/10 jobs passed before tagging/publication.
- Published-asset re-download: checksum/size verified; isolated install/update 4/4 passed.
