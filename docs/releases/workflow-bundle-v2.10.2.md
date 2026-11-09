# Workflow Bundle v2.10.2

Status: **PUBLISHED** — [GitHub Release](https://github.com/haonh87/Code-Factory/releases/tag/v2.10.2), 2026-11-09T01:37:08Z.
Approved production fix: `676e8f25f6a3eb97037a2f0198af86bfbaaf1c14`.
Release branch: `release/v2.10.2`; predecessor: published immutable v2.10.1.

## Release Scope

A globally installed 2.10.1 CLI could select a 2.7.0 checkout from its working
directory and silently downgrade managed installations. The defect was reproduced
in an isolated home/project, where 40 files changed. Version 2.10.2 defaults to the
bundle belonging to the running CLI, independently of cwd. An explicit `--repo-root`
still selects another source and fails if that source is invalid.

`wfc update` now refuses a source older than the installed runtime or any selected
project before changing bytes, permissions or install state. It also checks the
running CLI's lifecycle-helper version: a newer alternate source cannot conceal an
older helper. Unselected projects are not preflighted or changed. Equal and forward
updates, fresh/legacy bootstrap, explicit install and context rollback remain usable.
Stable X.Y.Z versions compare numerically; unsupported nonempty version metadata
stops update conservatively. For an intentional downgrade, review backups and use
`install` with the chosen source and explicit scope/targets.

No new dependency, skill or flag is added. Both harnesses retain 48 managed skills.
Claude SessionStart envelope, direct helper JSON and checkpoint behavior are unchanged.
A3/A4 and the large-hook payload fix are excluded. The optional [Session Search
companion0.2.0](https://github.com/haonh87/Code-Factory/releases/tag/v2.10.0) is unchanged.
GitHub Releases is the delivery channel; no npm registry publication or fleet rollout.

## Upgrade

Download `workflow-bundle-2.10.2.tgz` and `SHA256SUMS` from this release, then:

```bash
shasum -a 256 -c SHA256SUMS
npm install -g ./workflow-bundle-2.10.2.tgz
wfc version
wfc status --mode codex --json
wfc update --mode codex --scope both --project-root /absolute/path/to/project
wfc update --mode claude --scope both --project-root /absolute/path/to/project
```

Install the new CLI first so its source-selection fix applies. Review status and
repeat managed updates only for selected projects. Publication itself does not
update any global home or project helper. Conflicting managed edits are reported;
unmanaged instructions, context and custom hooks are preserved.

For source authoring, run `npm run build:workflow:bundle-runtime` from the source
root or pass `--repo-root /absolute/path/to/source` explicitly.

## Known Limitations

The inherited hook helper allows a 16 KiB serialized envelope, while Claude caps
individual additionalContext strings at 10,000 characters. Above that cap Claude
supplies a saved-file path and only a 2,000-character preview, without asking the
model to read the file. A native Code-Factory session on Claude2.1.318 received its
project-context hash but missed the ACTIVE item/handoff from a 12,352-character
briefing. This patch does not fix that issue or claim full native rollout acceptance.
See [Claude's output limits](https://code.claude.com/docs/en/hooks#json-output) and
[recorded limitation](../../work-items/release-workflow-bundle-v2-10-2/evidence/native-limit.json).

Local native checks run on macOS arm64; native Windows lifecycle execution remains
unverified. Automated Linux Node18/22 checks are required through GitHub Actions.
No separate ESLint runner is configured and Semgrep was unavailable for the source
fix; syntax, regression, manual review and Gitleaks evidence are recorded.

## Rollback

Retain the exact published `workflow-bundle-2.10.1.tgz`, SHA256
`99ce8b8b8af89861d228decd07655d94e2d377beb99bbcf0c3b302d350b03d3f`.
When restoring a previous project integration, run `wfc update --rollback-context`
with explicit mode/project before replacing the CLI; edited managed files cause a
conflict. For deliberate package/source reinstall, use `install` with explicit scope
and source. Returning to2.10.1 restores the known cwd-selection/downgrade vulnerability:
use an explicit installed `--repo-root` and inspect versions until upgrading again.
Preserve canonical context, handoffs and signed receipts; never rewrite old tags/assets.

## Verification And Publication Evidence

Candidate verification passed:53 core test files; all workflow/SDD/change/execution/
planning validators; authoring smoke, governance fixtures and pack audit. The same
archive passed all4 Codex/Claude global/project scenarios on Node18.20.8 and22.23.4.
Published2.10.1 upgrade/rollback and downgrade no-write checks passed all4 Node/harness
combinations, preserving custom instructions/hooks and file modes. Gitleaks found no
leaks in the54 changed source/docs/evidence files. [Source CI](https://github.com/haonh87/Code-Factory/actions/runs/42385698676) passed all10 jobs.
All947 CI payload file contents, modes and sizes match the local archive.

| Asset | SHA-256 |
|---|---|
| workflow-bundle-2.10.2.tgz | `b846fa659cd8d1526631efe4cd0fb1dc9e29e45582b9ea294d28c437084cd2d0` |

Archive size: 1654846 bytes;947 files. These verified bytes are frozen.
[PR24](https://github.com/haonh87/Code-Factory/pull/24) merged at
`8475d058259d4b745f484b7bc0e71c90d38b2508`, the immutable `v2.10.2` tag target.
[Final-head CI](https://github.com/haonh87/Code-Factory/actions/runs/42386382955)
and [merge CI](https://github.com/haonh87/Code-Factory/actions/runs/42545999770)
each passed all 10 jobs. Both downloaded release assets match the approved bytes;
the public archive passes all 4 Codex/Claude global/project install/update scenarios
on Node 22.23.4. No tag replacement, repacking or CI bypass was used.
See [publication evidence](../../work-items/release-workflow-bundle-v2-10-2/evidence/publication.json)
and [public smoke log](../../work-items/release-workflow-bundle-v2-10-2/evidence/public-smoke.log).
Evidence: [verification](../../work-items/release-workflow-bundle-v2-10-2/release-workflow-bundle-v2-10-2.s08.verification.md).

## Release Gates

The maintainer explicitly requested merge and publication. Release work item
`release-workflow-bundle-v2-10-2` uses full/strict readiness and separate trusted DoD
and Release receipts for the exact archive. The signed s08 remains immutable after
approval; public execution results belong in this release record and the s07 handoff.

Trusted QC DoD and DevOps Release receipts were verified before merge/publication.
The signed s08 SHA256 is `dcc5d024b6c637983b214f0c229ce87f7a3ef6d4219c367f068358b507f715cf`
and remains unchanged. AC-R4 public execution is complete. Existing installations
remain at their prior versions until an explicit managed update is performed.
