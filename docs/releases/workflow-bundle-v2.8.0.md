# Workflow Bundle v2.8.0

Status: **AUTHORIZED; local candidate verification passed; hosted CI pending**. Publication outcome will
be recorded here after the GitHub assets have been downloaded and verified.

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

Verification runs in an isolated Git worktree based on main `6f7303d` plus the
completed SEC-02 branch. Logs and candidate assets are retained at
`/private/tmp/cf-release-280-evidence` during preparation. Final results and artifact
identity are recorded below when checks finish. An earlier archive-only check was
invalid because a regression test requires Git metadata; no product failure was
inferred from that run. Initial 2.8.0 checks correctly rejected stale 2.7.0 release
expectations; those metadata expectations were updated without removing invariants.

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
trusted gate receipt or alter a work item's approval state. Publication is conditional
on the integrated candidate's technical checks. This operation uses the existing
GitHub release channel; there is no registry or live-deployment approval inferred.

## Candidate Evidence

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
- Hosted Node 18/22 Guardrails verification is required before tagging/publication.
