# Workflow Bundle v2.9.0

Status: **PUBLISHED on GitHub** at `2026-10-31T14:59:04Z`.
[GitHub Release v2.9.0](https://github.com/haonh87/Code-Factory/releases/tag/v2.9.0).
The release is neither draft nor prerelease.
Tag commit: `864e7a6cf51de0ced1132fddb6e3a83cf9a2f28e`, merged via [PR #19](https://github.com/haonh87/Code-Factory/pull/19).

## Release Scope

A1 optional scenario guidance and A2 opt-in `task_contract_version: 1` are
integrated by [PR #18](https://github.com/haonh87/Code-Factory/pull/18), main
`2c138315d1ed101199e3745881e8037827e67658`. The work item
`sdd-scenario-task-contract` is DONE with human QC DoD reviewed at
`2026-10-31T06:14:10.294Z`; its signed s08 digest is
`94f7db460cc5a7a54ca05480911ef52a00cbef958c45c3a59e6c26c6b0bed63f`.

A1 enriches requirement analysis, brainstorming, DoR and Spec Card/SRS guidance
in English and Vietnamese. A2 validates the opt-in JSON Main Artifact and
Traceability owners, unique IDs, dependency DAG, bounded file paths, structured
verification command data and exact acceptance-criteria-to-task coverage.
Recorded commands are data and are never executed by validation.

48 managed skills per Codex/Claude runtime remain available. Prior maintenance
skills, diagram presentation adapter and CF-023 validation are retained.
SEC-01 and SEC-02 remain in the tagged source; direct installers and MCP servers
are outside the npm package allowlist. A3–A6 and later roadmap work are outside
this release.

## Compatibility

Legacy YAML authoring and default scaffolds remain supported. Contract v1 is
explicitly enabled by an integer version marker; it does not add mandatory roles,
new gate authority, services or dependencies. Existing signed hosts and receipts
are preserved. Consumers must use v2.9.0 to validate v1 task artifacts. Adaptive
writes still require source/installed minor-version and runtime parity; upgrading
the source alone does not update installed harnesses.

Release preparation changes version metadata, public documentation and release
expectations only. No additional production behavior is introduced here.

## Verification

The A1–A2 baseline passed all ten hosted Guardrails jobs on main, including
Node 18/22: [run 41176484587](https://github.com/haonh87/Code-Factory/actions/runs/41176484587).
The release candidate is prepared in an isolated in-repository worktree. The
publish boundary requires all unit/regression checks, pack audit, six validator
lanes, authoring smoke, exact package install/update and rollback rehearsal.
[Release Guardrails run 41212092460](https://github.com/haonh87/Code-Factory/actions/runs/41212092460) passed all ten jobs, including Node 18/22. All 945 package file contents and modes match the CI candidate (SHA-256 `6905add68a6f4a9a09072a20890a4b5001a89b49730732b4ab3d24d189b00971`). Archive bytes differ; the original locally verified tarball is published unchanged.

## Known Limitations

Native Windows verification for the inherited SEC-02 MCP scope remains a separate
follow-up. No new general-purpose SAST scan or performance benchmark is claimed.
Optional PNG dependencies remain separately provisioned. GitHub publication does
not install global Codex/Claude, deploy MCP servers or publish to the npm registry.

## Rollback

Use the exact published `workflow-bundle-2.8.0.tgz`, 48 skills per runtime,
SHA-256 `397108e725d22111f328fd5d7bc5765090d7f5e441eb3256860b1a3e579e0d1f`.
Rehearse Codex/Claude global/project managed downgrade with `wfc install`,
preserving unmanaged files, modes and existing receipts. Retain v1 task artifacts
unchanged and keep v2.9.0 available for those work items: v2.8.0 cannot validate
the new contract. Package rollback does not convert artifacts or re-sign hosts,
and it does not revert MCP source.

## Release Gates

The maintainer explicitly authorized v2.9.0 publication in this session:
“hãy thực hiện publish”, following the recommendation to package A1–A2 as v2.9.0,
verify installation/rollback, then publish the verified artifact. This records the
operational release instruction; it does not mint a trusted gate receipt or alter
completed work-item approval state. Publication uses the existing GitHub release
channel and an immutable tag. Global installation and npm registry publication
are separate operations.

## Candidate Evidence

- Frozen artifact: `workflow-bundle-2.9.0.tgz`, 945 files, 1,635,673 bytes.
- SHA-256: `08ebdd2757f01ac69c10d3792e8c1758ade46aa97269194ee65721b554baa32b`.
- Local Node 26.5.0: 51/51 unit/regression test files passed.
- All six Guardrails validator lanes, authoring smoke and bundle smoke passed.
- Exact tarball install/update: Codex/Claude x global/project, 4/4 passed.
- Exact published 2.8.0 upgrade -> 2.9.0 -> rollback: 4/4 passed; 48 skills,
  explicit skill remove/add, unmanaged hashes and modes preserved.
- Changed text UTF-8 and `git diff --check` passed.
- Review order: scope/spec compliance passed (version/docs/release expectations
  only); code quality passed (no production behavior/dependency delta).
- Historical release records and direct installers are hash-locked by the release
  surface test. Completed signed workflow hosts have no release-preparation diff.
- Initial npm pack was blocked by sandbox cache permissions; the retry used an
  isolated temporary npm cache. No cache ownership repair or live install occurred.

```yaml
audit_scope: "v2.9.0 release delta and complete generated workflow pack"
checks:
  - id: mechanical-pack-audit
    status: PASS
    evidence: "npm run validate:workflow:pack-audit; 179 flat-layout references resolve"
  - id: semantic-release-delta
    status: PASS
    evidence: "Reviewed checklist: 48 skills, existing mapping/authority retained; A1/A2 opt-in and legacy default documented"
  - id: historical-integrity
    status: PASS
    evidence: "release-surface.test.js hashes historical records/installers; no signed-host diff"
findings: []
overall_status: PASS
follow_up_actions: []
notes: "Hosted Node 18/22 passed; published-asset identity and all four install/update scenarios passed."
```

## Publication Verification

The release assets were downloaded again. The tarball matches the frozen SHA-256
and 1,635,673-byte size; `SHA256SUMS` matches the original bytes. The downloaded
tarball passed all four isolated Codex/Claude global/project install/update
scenarios, including unmanaged-content preservation. No live harness was changed.

[Post-merge Guardrails run 41212362446](https://github.com/haonh87/Code-Factory/actions/runs/41212362446)
also passed on main merge commit `d140b5401c1acc74037374add22bcd4793768601`.
Its source tree is identical to the tagged, pre-merge verified commit.
The immutable GitHub assets and these hosted runs are durable evidence;
local temporary preparation logs are not a permanent evidence store.
