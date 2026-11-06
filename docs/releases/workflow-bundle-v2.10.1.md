# Workflow Bundle v2.10.1

Status: **PUBLISHED on GitHub** at `2026-11-06T14:30:16Z`.
[GitHub Release v2.10.1](https://github.com/haonh87/Code-Factory/releases/tag/v2.10.1), neither draft nor prerelease.
Immutable tag commit: `df55da6ade22ac0acd1c175203fedc8ebf61eb7c`, merged via [PR #22](https://github.com/haonh87/Code-Factory/pull/22).

## Release Scope

Patch release for the accepted Claude SessionStart defect. Claude interprets valid JSON on hook stdout as hook-control data. Version 2.10.0 emitted the briefing object directly, so its unrecognized keys were ignored. Version 2.10.1 wraps the briefing in `hookSpecificOutput` with `hookEventName: SessionStart` and string `additionalContext`. The existing 16 KiB output limit now measures the complete serialized envelope, including escaped text.

Direct CLI/Codex JSON remains unchanged. PreCompact and SessionEnd stay silent while recording checkpoints. No dependencies, new configuration or extra skill are added. A3-A4 is excluded. Optional [Session Search companion 0.2.0](https://github.com/haonh87/Code-Factory/releases/tag/v2.10.0) is unchanged and is not rebuilt for this release. GitHub Releases is the delivery channel; npm registry publication is separate.

## Compatibility

Core requires Node >=18 and npm >=9. Both Codex and Claude retain 48 managed skills. Existing installed project helpers must be explicitly updated; publication does not update the 26 projects reported by the maintainer automatically.

## Verification

The signed hotfix work item records 29 lifecycle scenarios and 52 core test files, package installation checks, pack audit and actual Claude Code 2.1.318 delivery. In a native probe with tools disabled and empty CLAUDE.md, the published helper returned NOT_SEEN while the fixed helper delivered the exact briefing-only sentinel. See [signed hotfix evidence](../../work-items/fix-claude-sessionstart-context/fix-claude-sessionstart-context.s08.verification.md).

Release candidate checks passed on Node 18.20.8 and 22.23.4 (macOS arm64): the same tarball installs/updates all four Codex/Claude global/project combinations and preserves unmanaged files. Published 2.10.0 upgrade/rollback, custom hook/instruction preservation, raw JSON and quiet checkpoint checks passed. The source helper remains byte-identical to accepted commit e41bea1. [Source CI](https://github.com/haonh87/Code-Factory/actions/runs/42227522966) passed all ten jobs. All 947 payload file contents, sizes and modes match the independently packed CI archive. The public download checks below also passed.

## Upgrade

Download `workflow-bundle-2.10.1.tgz` and `SHA256SUMS` from this release, verify the checksum, then:

```bash
shasum -a 256 -c SHA256SUMS
npm install -g ./workflow-bundle-2.10.1.tgz
wfc update --mode claude --project-root /absolute/path/to/project
wfc status --mode claude --project-root /absolute/path/to/project --json
```

Repeat the managed update for each selected project and open a new Claude session. Existing custom hooks/instructions are preserved; conflicting managed edits are reported. The same update command with `--mode codex` refreshes Codex installations if desired. Installing the CLI alone does not replace project-local context.cjs.

## Known Limitations

Native Windows lifecycle execution has not been verified. The claimed 26-project impact is from the maintainer report, not an independent rollout inventory. No claim is made that Claude 2.1.316 handled unknown JSON differently from 2.1.318. Historical retrieval/index maintenance remains explicit and unchanged.

## Rollback

Retain exact `workflow-bundle-2.10.0.tgz`, SHA-256 `aa0b87b9c80f621fd073dfa602925a1894b46cf36b6e88661491fac6aaa8ae6b`. If needed, run `wfc update --rollback-context --mode claude --project-root /absolute/path/to/project` before downgrading the CLI. Hash conflicts stop restoration. Downgrading to 2.10.0 restores the known SessionStart defect; direct helper invocation remains the fallback. Never overwrite existing tags/assets or delete canonical decisions and trusted receipts.

## Release Gates

The maintainer explicitly requested publication. Release work item `release-workflow-bundle-v2-10-1` uses strict/full planning, valid signed readiness and a separate DoD/Release seal for the exact tested archive. All six readiness/terminal receipts validate. Human QC/DevOps signed the exact release at `2026-11-06T13:48:20.682Z`; signed s08 SHA-256 `6c6d7266fed31144106a62bf283d307b46954753cf80d984d91abd560e895e95`. [Approved-head CI](https://github.com/haonh87/Code-Factory/actions/runs/42228927606) and [main CI](https://github.com/haonh87/Code-Factory/actions/runs/42229239358) passed before publication. Public download verification passed before protocol closure.

## Published Immutable Assets

| Asset | SHA-256 |
|---|---|
| workflow-bundle-2.10.1.tgz | `99ce8b8b8af89861d228decd07655d94e2d377beb99bbcf0c3b302d350b03d3f` |

Core archive: 1,652,917 bytes, 947 files. These exact retained bytes and SHA256SUMS were published without rebuilding.

## Publication Verification

Both public assets were downloaded again and compared byte-for-byte with the retained approved files. Core: 1,652,917 bytes; SHA256SUMS: 93 bytes. The downloaded core passed all four Codex/Claude global/project install/update scenarios on Node22.23.4. The public tag resolves to the merge commit above. Earlier Node18/22 verification used the identical archive bytes. Evidence: [publication result](../../work-items/release-workflow-bundle-v2-10-1/evidence/publication.json).

The signed s08 remains unchanged. No global/user-owned harness installation or downstream project was changed by publication. Existing projects require the explicit managed update shown above.
