# Workflow Bundle v2.10.0

Status: **PUBLISHED on GitHub** at `2026-11-05T08:30:29Z`.
[GitHub Release v2.10.0](https://github.com/haonh87/Code-Factory/releases/tag/v2.10.0). The release is neither draft nor prerelease.
Immutable tag commit: `34d8b612193b663e7a552031bff5b225c2c48f84`, merged via [PR #20](https://github.com/haonh87/Code-Factory/pull/20).
CR-013 work item `project-context-session-continuity` is DONE; its nine human gate receipts validate and the signed s08 remains byte-identical.

## Release Scope

Project context, native instructions, session handoff and Codex/Claude harness integration are installed as a reusable lifecycle. Core 2.10.0 adds merge-aware instruction/config updates, per-target preflight, conflict checks, backups, explicit-root updates, context diagnostics and project rollback. `init` now wires project lifecycle for the selected harnesses. Startup uses canonical context/work-item references and bounded output; caches cannot approve work. Global Codex receives a native AGENTS.md entrypoint while retaining the legacy filename as a compatibility bridge.

Optional Session Search companion 0.2.0 is a separate artifact in the same release. It bundles pinned SDK/Zod dependencies, requires explicit project scope, supports Claude top-level cwd metadata, and preserves physical-root containment. No index rebuild or cross-project root expansion runs automatically. A3–A4 is not included: its independent QC closeout is still required.

User communication now defaults to Vietnamese (with diacritics), including native entrypoints and skill guidance, unless the user explicitly requests another language. Exact published 2.9.0 policy hashes remain recognized when upgrading across this wording change.

## Compatibility

Core remains Node >=18; companion requires Node >=20 and separately provisioned cass. Codex uses instruction-driven start/checkpoint fallback; Claude uses supported lifecycle hooks. Existing user instruction text, other hooks and MCP entries are preserved. Overrides and conflicting managed edits are reported. Verified on macOS 27.0.1 arm64, Codex 0.166.0 and Claude Code 2.1.316. Core was exercised on Node 18.20.8 and 22.23.4; companion on Node 20.20.2 and 22.23.4 with cass 0.2.7. Native Windows lifecycle hooks are unverified. The 48 managed skills, A1/A2 task contract, SEC-01/SEC-02 and CF-023 baseline remain.

## Verification

Verification passed: 52 core test files, 25 lifecycle scenarios, 39 companion tests, exact core Node18/22 install checks, exact companion Node20/22 protocol checks, four-way published 2.9.0 upgrade/rollback, runtime parity, pack audit, syntax/UTF-8, changed-source secret scanning and dependency audit (zero known vulnerabilities). Fresh Codex/Claude sessions, reopen and Claude compaction were observed, including the existing-project pilot and default Vietnamese responses.

[Workflow Guardrails](https://github.com/haonh87/Code-Factory/actions/runs/41989286467) and [Session search companion](https://github.com/haonh87/Code-Factory/actions/runs/41989286404) passed on source `ad43f1fa299c6ef0950259082bea1be487f28725`. All 947 core payload file contents, modes and sizes match the independently packed CI candidate. The locally tested archive remains frozen; container archive bytes need not match between pack environments. Approved-metadata [Guardrails](https://github.com/haonh87/Code-Factory/actions/runs/41993179300) and [companion CI](https://github.com/haonh87/Code-Factory/actions/runs/41993179406) passed before merge. Post-merge [Guardrails](https://github.com/haonh87/Code-Factory/actions/runs/41993872261) and [companion CI](https://github.com/haonh87/Code-Factory/actions/runs/41993872339) also passed on the tag commit.

## Known Limitations

No claim of complete conversational recall: durable decisions must be saved in canonical sources. Native vendor auto memory is supplemental. Configured hooks are not operational proof. No native Windows verification has run for this candidate. Historical retrieval requires an explicitly maintained usable cass index; degraded index state must remain visible.

## Rollback

Retain the published `workflow-bundle-2.9.0.tgz`, SHA-256 `08ebdd2757f01ac69c10d3792e8c1758ade46aa97269194ee65721b554baa32b`. The new `update --rollback-context` restores the prior managed project files and manifest only if current hashes match. Intervening user edits stop rollback. Package downgrade is separate; do not use the old overwrite-based installer on project instructions without restoring/reviewing integration first. Canonical decisions, history and approval receipts are preserved.

## Release Gates

Spec, Contract, DoR, Approach, Task Plan, DoD, UAT, Release and Business Acceptance are APPROVED with matching artifact digests. The human signed the amended s08 at `2026-11-05T08:11:07.912Z`; signed host SHA-256 `b721203de626ee0d55d378a5349c8bb6114445b569d022c5da9d406e327e688a`. The exact assets below were published after approved-metadata synchronization and green CI. GitHub Releases remains the delivery channel; npm registry publication is separate.

## Upgrade Guide

See [English quickstart](../workflow-bundle-quickstart.md#project-lifecycle-repair-in-2100) and [Vietnamese quickstart](../workflow-bundle-quickstart.vi.md). The assets are available from the GitHub Release linked above.

## Approved Immutable Assets

| Asset | SHA-256 |
|---|---|
| workflow-bundle-2.10.0.tgz | `aa0b87b9c80f621fd073dfa602925a1894b46cf36b6e88661491fac6aaa8ae6b` |
| code-factory-session-search-mcp-0.2.0.tgz | `20d4384baae1784a54c0eb4b98e8c0945e0e75f37ab71b663c11f23deb70d51f` |

The approved exact bytes and SHA256SUMS are published unchanged; a later rebuild is a new
candidate and requires artifact verification. Optional history requires a healthy,
explicitly maintained index. The pilot's pre-existing index was stale and was not
silently rebuilt. Dependency/package downgrade is separate from project rollback.

## Publication Verification

All three public release assets were downloaded again and compared byte-for-byte with the retained approved files. Core: 1,652,406 bytes; companion: 3,418,849 bytes; SHA256SUMS: 201 bytes. The downloaded core passed Codex/Claude global/project install/update smoke (4/4) on Node 22.23.4. The downloaded companion passed its real stdio protocol smoke on Node 22.23.4. The public tag resolves to the exact merge commit above. Earlier Node18/22 core and Node20/22 companion checks used the same approved archive bytes.

The ai-maintainer pilot has the final native instructions, policy and context helper. Fresh Codex/Claude language checks returned Vietnamese; 113 pre-existing files were preserved outside integration. Optional real history remains explicitly maintained; its pre-existing stale index was not rebuilt. Private pilot transcripts and local caches are excluded from this repository and all release assets. No global/user-owned harness installation was silently updated.
