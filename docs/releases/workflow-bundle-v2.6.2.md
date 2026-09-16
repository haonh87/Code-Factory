# workflow-bundle v2.6.2

Prepared: `2026-09-01`
Planned tag after Release approval: `v2.6.2`
Change package: `CR-008`

## Summary

`workflow-bundle v2.6.2` is the adaptive-governance release candidate. It reduces irrelevant workflow
ceremony through deterministic request lanes, applicable-only roles and gates, recoverable approval
bundles, and privacy-bounded local telemetry while preserving human authority and independent trusted
receipts.

## Changes

- Add eight deterministic request lanes and fail-closed hard triggers for public contracts, migrations,
  security-sensitive work, regulated work, greenfield foundations, and releases.
- Render only applicable roles, gates, and human actions while preserving the existing authority model.
- Add journaled readiness and closeout approval bundles with preflight, locking, rollback, crash recovery,
  and one receipt-v1 file per gate.
- Add opt-in local telemetry with an absolute field allowlist, pseudonymous identifiers, bucketed timing,
  30/90-day retention, and ownership-safe purge behavior.
- Synchronize the canonical policy and 42 managed skills into the Codex and Claude runtime payloads.
- Build one package candidate in Workflow Guardrails and verify the same SHA-256 bytes on Node 18 and
  Node 22 instead of rebuilding per environment.
- Move the current candidate identity from published `v2.6.1` to unique version `v2.6.2`; historical
  `v2.6.1` tags, notes, and artifacts remain immutable.

## Compatibility

- Node `>=18`, npm `>=9`, Codex/Claude, global/project, and unmanaged-content preservation remain in scope.
- Legacy fixed-shape workflow artifacts and trusted receipt schema v1 remain readable without rewrite.
- Adaptive writes require matching source/installed minor versions and runtime parity; version skew fails
  before delivery state is written.
- Individual approval commands remain available when adaptive bundle writes are disabled.
- No database, API, event, container, deployment-topology, or live global-install migration is included.

## Verification

- The governed T9 evidence records 44/44 workflow-bundle test files on Node 18, Node 22, and the current
  runtime, plus 13/13 authoring smoke and a passing workflow-pack audit.
- Twenty controlled real-kernel runs reduce median human interactions from 7 to 3 (57.14%) with zero
  retries while preserving ten independent receipts per run.
- The exact `workflow-bundle-2.6.2.tgz` candidate has SHA-256
  `ec0007aea70c69f02a3982b649b1ee594472d901259be253293ead676fe1f0c5`; the same bytes pass the
  Codex/Claude x global/project matrix on Node 18 and Node 22.
- The immutable `v2.6.1` rollback asset has SHA-256
  `7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9` and passes the same rollback
  matrix. Runtime parity, syntax, UTF-8, YAML, local-link, secret, and network-surface checks are included
  in the local candidate evidence.
- Passing local checks do not substitute for B4, Technical Verification, DoD, or Release approval.

## Rollback

- Use the retained immutable `workflow-bundle-2.6.1.tgz` GitHub Release asset with SHA-256
  `7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9` and `wfc install` for downgrade.
- Re-run Codex/Claude global/project scenarios and verify installed version `2.6.1`, 42 managed skills,
  and unchanged unmanaged hashes and modes.
- Complete or recover any in-progress approval transaction before disabling adaptive writes or changing
  an installed bundle.
- Never retarget or overwrite `v2.6.1`; issue a later governed patch if roll-forward is needed.

## Known Limitations

- GitHub-hosted Workflow Guardrails has not run on the unpushed CR-008 worktree.
- The unchanged github-push MCP test has one macOS failure caused by a Windows-only fixture path; MCP
  content is outside this candidate.
- Semgrep and ESLint are unavailable in the current local environment; syntax, full tests, secret and
  network-surface scans, and manual diff review are the recorded fallback.
- B4 QC review, s08 Technical Verification, DoD, Release, and Business Acceptance remain pending.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Release Gates

- B4 review: human QC approval in order, Spec Compliance then Code Quality.
- Technical Verification and DoD: human QC approval required in s08.
- Release: human DevOps and QC approval required before tag or GitHub Release publication.
- Business Acceptance: human PO approval required after the release-scoped evidence is complete.
- Publication status: blocked until every required gate and exact `v2.6.2` artifact check passes.
