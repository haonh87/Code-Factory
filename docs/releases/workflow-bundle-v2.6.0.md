# workflow-bundle v2.6.0

Candidate prepared: `2026-08-23`
Change: [`CHANGE-004`](../../changes/CHANGE-004/proposal.md)
Status: `UNPUBLISHED — Release, Business Acceptance, and DoD remain human-controlled gates`

## Release Preparation

`workflow-bundle v2.6.0` is an additive candidate that introduces domain-neutral design-readiness
guidance for the existing `sa` and `ta` skills. It keeps the managed inventory at 42, preserves
their s01-s04 architecture-driver boundary, and leaves solution selection and architecture modeling
with downstream s05 skills.

No tag, registry publication, live global installation/update, merge, or worktree cleanup is
claimed or authorized by this note.

## Included Changes

- One shared English design-readiness contract and one shared Vietnamese counterpart, each copied
  byte-for-byte between the canonical `sa` and `ta` skill trees.
- 13 conditional `DR-C` checks and 10 `DR-Q` questions/handoffs that map only into existing output
  fields and remain advisory unless a named authority makes a check blocking.
- Concise English/Vietnamese hooks in both skills and generated canonical/runtime parity for Codex
  and Claude Code.
- Structured metadata and public candidate surfaces aligned to `v2.6.0/42`.

## Inventory

- Canonical source: 42 managed skills.
- Codex runtime: 42 managed skills, recursively equal to canonical source.
- Claude runtime: 42 managed skills, recursively equal to canonical source.
- No skill is added, removed, renamed, or reassigned by CHANGE-004.

## Compatibility

- Existing `wfc` commands, flags, state files, Node `>=18`, and npm `>=9` requirements are unchanged.
- Existing SA/TA invocation triggers, required output blocks, ownership meanings, metrics, examples,
  and downstream consumers remain compatible.
- The new guidance enriches existing drivers, input issues, stop conditions, and handoffs; it adds
  no required top-level block and requires no consumer migration.
- No API, event, database, deployment, user-configuration, or application-data migration is
  introduced.

## Known Limitations

- The retained exact candidate is frozen at SHA-256
  `5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9`; any later source fix
  invalidates that provenance and requires a recorded rebuild plus exact-artifact verification.
- Registry installation remains unavailable until the human Release gate approves publication.
- Live global installations are not modified during candidate verification.
- Final acceptance coverage, regression conclusions, DoD, Release, and Business Acceptance remain
  pending until s08 and their named human reviewers.

## Verification

- T1 recorded the expected fail-first contract assertions against the missing reference and hooks.
- T2 and T3 made the canonical contract green and closed the two targeted-review findings.
- T4 synchronized both runtimes, retained 42/42/42 skills, and proved unaffected-skill digests were
  unchanged.
- T5 records fail-first v2.6.0 release assertions, structured metadata alignment, reviewed candidate
  wording, compatibility, rollback, historical-digest protection, and source preflight.
- T6 retained the exact candidate and passed offline install/update smoke for Codex and Claude across
  global and project scopes, with 42 managed skills in each scenario.
- T7 targeted review resolved generated-runtime drift and release-note status drift, then repeated
  runtime parity, release-surface, package-audit, and exact-artifact checks without claiming Release.
- s08 independent QC evidence remains pending; this note does not infer DoD, Release, or Business
  Acceptance.

## Rollback

- Before publication, restore only CHANGE-004-managed source, generated, test, metadata, and
  candidate-document surfaces to the verified `v2.5.0/42` baseline.
- After an authorized publication: Use the retained immutable v2.5.0 artifact and `wfc install` for the downgrade; do not rely on a mutable registry alias. Verify `installed_version=2.5.0`, 42
  managed skills, canonical/runtime parity, and unchanged unmanaged hashes and modes.
- Rehearse the downgrade in isolated Codex and Claude roots before touching any authorized live
  installation. No database or application-data rollback is required.
- Keep the implementation worktree until s08 DoD and branch-finish review authorize merge or
  cleanup.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Release Gates

- Approved authoring gates: work item, CHANGE-004, Spec, Contract, DoR, Approach, and Task Plan,
  each with its required human authority and trusted receipt.
- Completed implementation evidence: exact-candidate verification and targeted runtime/release/package
  review. Pending: integrated verification, QC DoD, DevOps/QC Release, and PO Business Acceptance.
- Do not create the `v2.6.0` tag, publish to a registry, mutate live global installations, merge, or
  clean the worktree until the corresponding human-controlled gate authorizes that action.
