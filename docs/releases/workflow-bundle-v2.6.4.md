---
language: en
---

# workflow-bundle v2.6.4

Status: **UNPUBLISHED** release candidate. CR-010 owns preparation; approval of preparation does not authorize publication. Branch: `release/v2.6.4`.

Baseline: `cbf6c095b303f6979ac135b08c063bfdf2ad9fb2` on main, including P-INSTALL merge `54243b7c327c31abf30733ea013afa4c7fb49315` and proposal recovery. Candidate-specific DoD, Release, and Business Acceptance require human approval. The final commit, hosted runs and artifact SHA-256 are recorded in the release work item's s08 evidence before publication.

## Complete Packaged Delta

This inventories changes from immutable v2.6.3 through the preparation baseline plus the v2.6.4 release metadata. The npm allowlist remains `bin`, `README.md`, `runtime`, `scripts`, `tests/fixtures/workflow-governance`, and `workflow-bundle.manifest.json` (plus npm's automatic package metadata, license and README inclusion, including README.vi.md). No new dependency or skill: **42 managed skills** per runtime.

| Package paths | Change |
| --- | --- |
| `package.json`, `workflow-bundle.manifest.json`, `bin/wfc.js` | Candidate version/help become 2.6.4; command families remain compatible. |
| `README.md`, `README.vi.md` | Candidate, recovery support, source/package boundary and immutable v2.6.3 rollback instructions. |
| `scripts/materialize-work-item.js` | Explicit `--resume-proposal`, snapshot hash and UUID identity, eligibility preflight, signed disposition verification, create_new/full change-package recovery, per-change locking, recovery manifest and safe retry/projection repair. Ordinary materialization refuses overwrites. |
| `scripts/scaffold-change-package.js` | Shared pure canonical template renderer for new change recovery. |
| `scripts/scaffold-workflow.js` | Non-destructive workflow projection planning for eligible recovery. |
| `scripts/work-item-protocol-utils.js`, `scripts/work-item-protocol.js` | Preserve optional recovery identity across normalization/lifecycle; reconcile current state without erasing historical candidate snapshots. |
| `scripts/workflow-trusted-approval-utils.js` | Verify recorded signed disposition evidence before proposal recovery. |
| `runtime/{codex,claude}/skills/analysis/requirement-analysis/SKILL{,.vi}.md` | Analysis is read-only; clarity is not permission to write. |
| `runtime/{codex,claude}/skills/guardrails/definition-of-done-gate/SKILL{,.vi}.md` | AI assessment is advisory; authorized human QC decides DoD. |
| `runtime/{codex,claude}/skills/orchestration/codex-workflow-chain/SKILL{,.vi}.md` | All applicable authoring gates require human approval; Light uses s04/s06, with distinct receipts. |
| `runtime/{codex,claude}/skills/orchestration/codex-workflow-chain/references/work-item-materialization{,.vi}.md` | Persisted proposal recovery support, identity, retry and failure contract. |
| `runtime/{codex,claude}/skills/orchestration/codex-workflow-chain/references/work-item-protocol{,.vi}.md` | Correct activation/approval semantics, existing list command, recovery identity and current versus historical state. |
| `runtime/{codex,claude}/skills/orchestration/workflow-governance-router/SKILL.vi.md` | Vietnamese Light gate-host guidance aligned with English. |

Runtime copies are generated from canonical source with the standard sync command. Exact archive file/hash differences are captured in s08 against the retained v2.6.3 asset; this release does not claim that the installer-only change is the whole packaged delta.

### Exact Archive Delta

Archive comparison against retained v2.6.3 finds 545 files in both archives: zero added, zero removed and 33 changed (content/size/mode comparison). npm includes `README.vi.md` automatically although the explicit allowlist names `README.md`. The changed archive paths are:

```text
package/README.md
package/README.vi.md
package/bin/wfc.js
package/package.json
package/runtime/claude/skills/analysis/requirement-analysis/SKILL.md
package/runtime/claude/skills/analysis/requirement-analysis/SKILL.vi.md
package/runtime/claude/skills/guardrails/definition-of-done-gate/SKILL.md
package/runtime/claude/skills/guardrails/definition-of-done-gate/SKILL.vi.md
package/runtime/claude/skills/orchestration/codex-workflow-chain/SKILL.md
package/runtime/claude/skills/orchestration/codex-workflow-chain/SKILL.vi.md
package/runtime/claude/skills/orchestration/codex-workflow-chain/references/work-item-materialization.md
package/runtime/claude/skills/orchestration/codex-workflow-chain/references/work-item-materialization.vi.md
package/runtime/claude/skills/orchestration/codex-workflow-chain/references/work-item-protocol.md
package/runtime/claude/skills/orchestration/codex-workflow-chain/references/work-item-protocol.vi.md
package/runtime/claude/skills/orchestration/workflow-governance-router/SKILL.vi.md
package/runtime/codex/skills/analysis/requirement-analysis/SKILL.md
package/runtime/codex/skills/analysis/requirement-analysis/SKILL.vi.md
package/runtime/codex/skills/guardrails/definition-of-done-gate/SKILL.md
package/runtime/codex/skills/guardrails/definition-of-done-gate/SKILL.vi.md
package/runtime/codex/skills/orchestration/codex-workflow-chain/SKILL.md
package/runtime/codex/skills/orchestration/codex-workflow-chain/SKILL.vi.md
package/runtime/codex/skills/orchestration/codex-workflow-chain/references/work-item-materialization.md
package/runtime/codex/skills/orchestration/codex-workflow-chain/references/work-item-materialization.vi.md
package/runtime/codex/skills/orchestration/codex-workflow-chain/references/work-item-protocol.md
package/runtime/codex/skills/orchestration/codex-workflow-chain/references/work-item-protocol.vi.md
package/runtime/codex/skills/orchestration/workflow-governance-router/SKILL.vi.md
package/scripts/materialize-work-item.js
package/scripts/scaffold-change-package.js
package/scripts/scaffold-workflow.js
package/scripts/work-item-protocol-utils.js
package/scripts/work-item-protocol.js
package/scripts/workflow-trusted-approval-utils.js
package/workflow-bundle.manifest.json
```

The complete 545-file SHA-256/size/mode inventory is retained in s08 evidence. Direct adapters are absent from both npm archives and must instead be checked in the tagged source archive.

## Non-Packaged Repository Changes

**P-INSTALL** protects direct Codex installer destinations against unsafe containment and symlink paths while preserving unmanaged content. Both files must be present in the new tag and GitHub source archive with these canonical LF SHA-256 values:

| Source path | SHA-256 |
| --- | --- |
| `adapters/codex/install-codex-workflow.sh` | `20e54a10ef2e3fdadda39623913dd3bec8367a1249bc4207eef35e82a4438ce5` |
| `adapters/codex/install-codex-workflow.ps1` | `859c41118ae1a9c3e8d0bf6154e7d00083a999dae08eb81b0eb60f818f475afa` |

The source installer work does not add files to the npm tarball. Its native matrix covers Linux, macOS and Windows PowerShell 5.1. Source regression tests, the containment CI workflow, EN/VI public documentation, specs, audit records, and Workflow documentation and planning history are repository/source artifacts, not added package payload. Existing runtime policies remain unchanged except for the explicitly listed generated skill/reference copies.

## Compatibility

- Existing exact ID-based disposition, `resolved_state_history`, terminal archive guard, approval bundles and adaptive dual-read remain supported.
- Legacy string state entries remain readable and are preserved byte-for-byte in signed resolved-state history when explicitly disposed by an authorized human.
- Recovery accepts eligible single brownfield, unapproved proposals without write grants. `change_strategy=none` remains supported; `create_new` requires the full template profile and an unused, validated change identity.
- Recovery ends at MATERIALIZED/PENDING_REVIEW. It neither approves work nor opens execution. Authoring, DoD and Release receipts remain independently required.
- No registry publication or live global install is implied by preparation or a GitHub Release asset.

## Known Limitations

- CHANGE-NNN and CR-NNN share a logical numeric identity but the current allocator/recovery collision checks do not fully normalize both spellings. Inspect both forms before selecting an unused ID; CR-010 was checked explicitly. This release does not silently repair that separate defect.
- Recovery rejects unsupported profiles/states, existing conflicting artifacts, stale hashes, symlinks and altered manifest-owned bytes. Do not retry after authoring or approval. A recovery manifest is provenance, not permission to overwrite.
- Older protocol writers may drop `materialization_recovery`; do not use them to mutate a recovered work item. A v2.6.3 runtime rollback does not erase or downgrade workflow evidence.
- P-INSTALL direct adapters are available from source archives, not the npm tarball. No claim is made that all parent audit findings are closed.

## Verification

The preparation plan requires fail-first identity/rollback tests, immutable historical release digests, complete unit and fixture/authoring suites, runtime parity/pack audit and UTF-8 checks. Workflow Guardrails builds once; Node 18 and 22 must install and smoke the same SHA-256-verified tarball. Native installer containment must pass on the final source candidate. Exact candidate and fallback tarballs must pass the isolated Codex/Claude global/project rollback matrix, preserving unmanaged bytes and modes.

Only dated evidence in `work-items/release-workflow-bundle-v2-6-4-cr010/release-workflow-bundle-v2-6-4-cr010.s08.verification.md` constitutes a test result. Preparation requirements here are not claims of completed hosted checks.

## Rollback

The retained fallback is `workflow-bundle-2.6.3.tgz`, SHA-256 `f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f`. Verify this digest before installing. Record current mode/scope/project roots and status, finish or recover any approval-bundle journal, and stop adaptive writes before downgrade. Rehearse in isolated homes first.

```bash
npm install -g /absolute/path/to/workflow-bundle-2.6.3.tgz
wfc install --mode codex --scope global
wfc install --mode codex --scope project --project-root <repo-root>
wfc status --mode codex
wfc skills list --mode codex
```

Repeat for Claude and all recorded targets. The fallback preserves 42 skills, exact state disposition and signed history but has no proposal recovery. Never rewrite existing receipts or histories. Before publication, discard only the unpromoted candidate or revert its scoped preparation commit; do not move/delete an existing release tag.

The v2.6.3 annotated tag object remains `41ae8213a02de994333ddf25993e16ec99644560`, peeled commit `7f810352ca253b9b8356f9116335cc03713adae4`. Its release records and assets remain immutable.

## Release Gates

Preparation approval covers CR-010 implementation and verification only. Human QC must review DoD and the authorized Release reviewers must approve the exact commit and retained candidate SHA-256 before v2.6.4 tagging/publication. Publication promotes those verified bytes without rebuilding. Verify the remote tag, downloaded source installer hashes and downloaded assets afterward; Business Acceptance is required before closing the item. npm registry distribution needs separate explicit authorization.
