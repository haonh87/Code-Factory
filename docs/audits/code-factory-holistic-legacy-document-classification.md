# Code-Factory legacy and document classification

Observed: `2026-09-13T04:37:54Z`. Canonical audit source: `5b85d7f943fff4fc9e0f559faed43e79f9483b12`; tracked main comparator: `2e3aaded1779787d993b7e5cacc96bfae008b3bc`. Evidence tier: unmerged-child, except explicitly identified ignored/root historical inputs and external trusted receipts.

M3 is IN_PROGRESS. The current 25-entry tracked portfolio was recounted: 9 managed and 16 legacy. Classifications below are evidence-backed AI recommendations for the ordered CF-MB1 review, not retrospective approvals, migration, retirement or cleanup. Prior-plan/successor recovery remains incomplete.

## Interpretation rules

- CURRENT means a tracked, resolvable authority or current-facing navigation subject in its stated scope; it does not certify freshness or released/installed parity.
- LEGACY_CLOSED means direct historical human-closure evidence is recorded in the pinned note. It does not create a modern signed receipt or open any next gate.
- ambiguous includes illustrative examples and contradictory closure metadata. Examples are not empty directories and must not become real pending approvals.
- HISTORICAL/HISTORICAL_INPUT below classifies audit use; changing a public label, promoting an ignored plan or retiring it requires the owning child/human authority.
- A prose DONE or technical PASS without an unambiguous applicable human decision never establishes delivery completion.

## Prior authority/input classification — partial recovery

| Input | Classification | Evidence / scope | Owner / next boundary |
| --- | --- | --- | --- |
| docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md | CURRENT | Tracked portfolio authority; frozen SHA-256 e9f84613af3ca7b5788ad3d948f56f5c8650fc7d9fbc463076950435d75b7a8d | PO/BA; remain immutable |
| docs/plans/memory-standardization-plan.md | HISTORICAL_INPUT | Ignored root-owner input, not tracked authority; SHA-256 25ff8af65e2e834dfd2dd9acaf635e0026ff2e838ec1da12e9911ca5ce99d557; header/classification evidence only; full plan completion revalidation pending | PO/BA; M4/M8 reduced scope/experiment/retirement or selective-promotion proposal, no approval inferred |
| docs/plans/sa-ta-skill-metrics-deep-dive.md | HISTORICAL_INPUT | Ignored root-owner input, not tracked authority; SHA-256 ce0cb800418b11214a0e08ade2627072b0b85ed67b915f993cb9422007c7e780; header/classification evidence only; full plan completion revalidation pending | PO/BA; M4/M8 reduced scope/experiment/retirement or selective-promotion proposal, no approval inferred |
| docs/plans/apply-trending-ai-research-2026-06.md | HISTORICAL_INPUT | Ignored root-owner input, not tracked authority; SHA-256 a46757a56f2b0d03ff56d76d42d338a4b214b28f711e1ff98a0519cb81eb4862; header/classification evidence only; full plan completion revalidation pending | PO/BA; M4/M8 reduced scope/experiment/retirement or selective-promotion proposal, no approval inferred |
| docs/plans/sdd-light-code-factory-plan-review.md | HISTORICAL_INPUT | Tracked source input; SHA-256 fa52e98d7e3cc522076c6a7de006e05b42661ca55be1e340be52e0f3ef0ad5b3; header/classification evidence only; full plan completion revalidation pending | PO/BA; M4/M8 reduced scope/experiment/retirement or selective-promotion proposal, no approval inferred |

The three ignored plans were found in the root-owner workspace, not in the clean tracked audit tree. The SDD Light plan is selectively tracked despite the broader ignore rule. Memory and metrics headers remain proposal/draft; the trending input preserves WI-1/WI-3 proposals and WI-2 trial scope. Only header/classification evidence has been read for memory/metrics/SDD Light, not their full completion claims. Remaining prior audit, architecture/productization, adaptive/diagram and research inputs need tracked canonical/successor mapping at M3/M4; no duplicated CURRENT portfolio authority is created.

## Legacy work-item classification — 16/16

Counts: 8 LEGACY_CLOSED, 1 actionable, 7 ambiguous, 0 empty-invalid. Protocol validator skips all sixteen; read-only work-item list presents every legacy row as MATERIALIZED/PENDING_REVIEW/s01. The listing is a bootstrap projection, not their historical lifecycle verdict.

| Work item | Classification | Direct evidence | Owner / next action |
| --- | --- | --- | --- |
| arch-role-skills-release | LEGACY_CLOSED | s08 explicit QC closure: status DONE, gate_closed true, closed_by_person Hao, Nguyen Huu, 6/6 AC PASS; closure date 2026-08-14. | developer/QC; Preserve historical closure; classify-first child may repair listing without backdated receipts |
| architecture-role-skills | ambiguous | s08 is approved but its DoD and closure_verdict are PARTIAL/conditional; multiple inconsistent coverage totals and carried-forward work. Map successors/accepted residuals before interpreting terminality. | PO/BA/QC; Resolve contradictory authority/successor evidence in a bounded child |
| claude-hooks-instincts-adoption | LEGACY_CLOSED | s08 explicit historical human QC/PO DoD and DevOps Release, 2026-07-20; records v2.2.1 merge and accepted residuals. | developer/QC; Preserve historical closure; classify-first child may repair listing without backdated receipts |
| codebase-memory-mcp-trial | LEGACY_CLOSED | s08 historical human QC/PO DoD, 2026-07-17; AC-5 marginal FAIL explicitly recorded as accepted known limitation. No umbrella memory or team rollout approval inherited. | developer/QC; Preserve historical closure; classify-first child may repair listing without backdated receipts |
| codebase-memory-team-rollout | LEGACY_CLOSED | s08 historical human QC/PO DoD, 2026-07-19; 7/7 AC, fresh-machine/depth residuals recorded. | developer/QC; Preserve historical closure; classify-first child may repair listing without backdated receipts |
| community-pack-i18n | LEGACY_CLOSED | s08 records human DoD 2026-06-24 and later merge 3033a6f; older unfinalized-branch text remains. Preserve chronology; no current branch cleanup authority inferred. | developer/QC; Preserve historical closure; classify-first child may repair listing without backdated receipts |
| decouple-tests-from-tree-layout | actionable | No s08. s06 T1 is explicitly SUPERSEDED by a9888a9; live T0 -> T2 -> T3 remain (fixture cross-file test and two-tree regression). Statement 'none blocked' is not execution approval. | developer/QC; Separate authoring/materialization approval and current residual verify path |
| harness-adapter-refactor | LEGACY_CLOSED | s08 historical human QC/PO DoD and DevOps Release, 2026-07-20; scope-B/new-format integration remains a separate follow-up. | developer/QC; Preserve historical closure; classify-first child may repair listing without backdated receipts |
| mcp-gitlab | ambiguous | s08 frontmatter draft conflicts with body DONE and handoff asking for review; no unambiguous human DoD decision is established. Windows installer/live-host checks skipped. | developer/QC; Resolve contradictory authority/successor evidence in a bounded child |
| sample-enterprise-item | ambiguous | Explicit sample artifact, draft frontmatter and no human DoD review timestamp. Some examples carry illustrative DONE; others retain enum placeholders. Not real delivery approval. | maintainer/QC; Proposal: exclude/label examples in real-portfolio listing; do not ask for fake approvals |
| sample-execution-item | ambiguous | Explicit sample artifact, draft frontmatter and no human DoD review timestamp. Some examples carry illustrative DONE; others retain enum placeholders. Not real delivery approval. | maintainer/QC; Proposal: exclude/label examples in real-portfolio listing; do not ask for fake approvals |
| sample-quick-item | ambiguous | Explicit sample artifact, draft frontmatter and no human DoD review timestamp. Some examples carry illustrative DONE; others retain enum placeholders. Not real delivery approval. | maintainer/QC; Proposal: exclude/label examples in real-portfolio listing; do not ask for fake approvals |
| sample-sdd-item | ambiguous | Explicit sample artifact, draft frontmatter and no human DoD review timestamp. Some examples carry illustrative DONE; others retain enum placeholders. Not real delivery approval. | maintainer/QC; Proposal: exclude/label examples in real-portfolio listing; do not ask for fake approvals |
| sample-workflow-item | ambiguous | Explicit sample artifact, draft frontmatter and no human DoD review timestamp. Some examples carry illustrative DONE; others retain enum placeholders. Not real delivery approval. | maintainer/QC; Proposal: exclude/label examples in real-portfolio listing; do not ask for fake approvals |
| sdd-light-authority-cutover | LEGACY_CLOSED | s08 historical human QC/PO DoD, 2026-07-21; accepted AC-15 telemetry residual; preview/default decision remains separate. | developer/QC; Preserve historical closure; classify-first child may repair listing without backdated receipts |
| sdd-light-code-factory | LEGACY_CLOSED | s08 historical human QC/PO DoD, 2026-07-20, scope T1-T7 only; later T8/T9 are owned by authority-cutover. | developer/QC; Preserve historical closure; classify-first child may repair listing without backdated receipts |

### Exact legacy note identities

- arch-role-skills-release: work-items/arch-role-skills-release/arch-role-skills-release.s08.verification.md; SHA-256 345e9a7a75883f02848ba7086f6dc16020ce89375f69c3dd8d2e7f1ce8159253.
- architecture-role-skills: work-items/architecture-role-skills/architecture-role-skills.s08.verification.md; SHA-256 76fb5afb6f1f2d4b43dfb6c33cc192ac2dd77235756629c11bf2f1a8b69474f0.
- claude-hooks-instincts-adoption: work-items/claude-hooks-instincts-adoption/claude-hooks-instincts-adoption.s08.verification.md; SHA-256 fddae43678a0ecd93768e4242eab4e5b151a04950f710c2be40aa0f553e72e2d.
- codebase-memory-mcp-trial: work-items/codebase-memory-mcp-trial/codebase-memory-mcp-trial.s08.verification.md; SHA-256 98b7cba88010c3ebc8481ff36fac3ae0e5e7969c80d01ae4e505b106dd0a0b03.
- codebase-memory-team-rollout: work-items/codebase-memory-team-rollout/codebase-memory-team-rollout.s08.verification.md; SHA-256 63869f6e63619a93c9ed76366b93146ae44e9eca76835d5f829343ac9c8aa8b8.
- community-pack-i18n: work-items/community-pack-i18n/community-pack-i18n.s08.verification.md; SHA-256 88fc42f4dfcf547e71db67ff81f7136e5165faf1a171d75b7fffed194755081f.
- decouple-tests-from-tree-layout: s08 absent; evidence is s06 T0/T1/T2/T3 read, no terminal artifact.
- harness-adapter-refactor: work-items/harness-adapter-refactor/harness-adapter-refactor.s08.verification.md; SHA-256 6fc9577b52849466220940ad22ce4271d411c70f3deced84b7a7916f87f2a757.
- mcp-gitlab: work-items/mcp-gitlab/mcp-gitlab.s08.verification.md; SHA-256 2b2cb99e64834963076f59647c356470435d59c268a78f5300438528c316f55b.
- sample-enterprise-item: work-items/sample-enterprise-item/sample-enterprise-item.s08.verification.md; SHA-256 646b93e487247e9018480e62a1c121991c9e2db575cc5d7165c7be640ec3d59f.
- sample-execution-item: work-items/sample-execution-item/sample-execution-item.s08.verification.md; SHA-256 3f9f54c93efbade0ba2e1f5b1b8d816bc3f1dd4f86a1263927293c68c65931d2.
- sample-quick-item: work-items/sample-quick-item/sample-quick-item.s08.verification.md; SHA-256 fd5b49ec66724b8e8eba028404ee2e964d6655bf324082baa3266175642e1aa8.
- sample-sdd-item: work-items/sample-sdd-item/sample-sdd-item.s08.verification.md; SHA-256 5133134bd1e41e8177e0b92e6bb94798444a46f807c3f5df7dbbbc9dc317980b.
- sample-workflow-item: work-items/sample-workflow-item/sample-workflow-item.s08.verification.md; SHA-256 fbc186e63dd69a39da5080dd465aa4bfaa17c190775967165c1fa36da3fd6352.
- sdd-light-authority-cutover: work-items/sdd-light-authority-cutover/sdd-light-authority-cutover.s08.verification.md; SHA-256 30aba0b2acef76fb23701cfe73d45b7b137e103f9836383469cdd60499fab6e7.
- sdd-light-code-factory: work-items/sdd-light-code-factory/sdd-light-code-factory.s08.verification.md; SHA-256 cf2bea9099b6c294c980aaa3c465a897eb8e3b5da4f2393404e48a7b514b3700.

`work-items/wfc-demo/` is absent from the pinned tracked tree; list reports 25 valid entries. There is no current empty-invalid entry to delete. No file or report was written by the read-only list/status/protocol checks.

## Managed work-item terminal evidence

Eight historical managed work items were checked through the normal read-only gate-status path; all eight DoD receipts are APPROVED and digest_match=true. Required Release/Business Acceptance receipts checked for four release subjects also match. These observations do not certify every earlier authoring receipt, every branch finalization, live hosted publication, or installed parity.

| Managed subject | Protocol observation | DoD receipt / exact host SHA-256 | Remaining interpretation |
| --- | --- | --- | --- |
| approval-path-defects | DONE/s08 | APPROVED, digest_match=true; 9b2bb2742a06e702f2a3373921fda08185bf62eae53e7caace68b1366be96098 | No DoD-binding contradiction observed in this check; preserve source/history |
| artifact-governance-enforcement | DONE/s08 | APPROVED, digest_match=true; c96a78a5a17e5a5ad8cdf76e6ab0572d805e4afbc151053e9c9745c6946b7146 | No DoD-binding contradiction observed in this check; preserve source/history |
| artifact-governance-model | DONE/s08 | APPROVED, digest_match=true; 77fa772288024df780065fc9129032e415caa9ea0cda78ba9db3d252f005e32d | No DoD-binding contradiction observed in this check; preserve source/history |
| fix-authoring-smoke-bootstrap | ARCHIVED/s08 | APPROVED, digest_match=true; f87100519f4cf45d5df7d89d292f608ae3136d604171eba0ae84321a3e58e56f | No DoD-binding contradiction observed in this check; preserve source/history |
| integrate-design-checklists-into-sa-ta | DONE/s08 | APPROVED, digest_match=true; 89f0b65a37d8cf63147c6152526024635a93eedda437fb8499c761759eb4c017 | No DoD-binding contradiction observed in this check; preserve source/history |
| stabilize-architecture-skill-bundle | DONE/s08 | APPROVED, digest_match=true; 2a84806c915fe2c773459cd45d95c21d76e4bd1c2d82670c57b59ce84a5b08c3 | No DoD-binding contradiction observed in this check; preserve source/history |
| trusted-receipt-namespace-resolution | DONE/s08 | APPROVED, digest_match=true; 4e6439bdd03a3151d647f76266e3280867ac2413ff10595e12cbfa97d1e30c04 | No DoD-binding contradiction observed in this check; preserve source/history |
| worktree-and-closure-integrity | DONE/s08 | APPROVED, digest_match=true; f359fef48a878460474e68f23411337ce516bc5ed121e950b6e8b61793adfb44 | No DoD-binding contradiction observed in this check; preserve source/history |
| code-factory-holistic-audit-remediation | ACTIVE/s07 in the current audit worktree | DoD not opened; s08 is draft | Four authoring receipts match; current activation is separate from terminal approval |

Release + Business Acceptance checked for artifact-governance-enforcement, fix-authoring-smoke-bootstrap, integrate-design-checklists-into-sa-ta and stabilize-architecture-skill-bundle: eight receipts total, all APPROVED/digest_match=true.

M3-OBS-02: root README and the v2.6.1 release note still say terminal/hosted evidence or Release is pending, although fix-authoring-smoke-bootstrap is ARCHIVED and its DoD/Release/Business Acceptance receipts match. Local tag object `feb5b3ee4be7109a0eccab9835dee513fbf275cc` exists at refs/tags/v2.6.1. Record stale documentation separately from the valid receipts. No live GitHub Release/registry query or publication claim is made.

## Public-document classification allowlist — 27 subjects

This is a source-navigation/identity classification, not the full mandatory-surface M7 language review. CURRENT files can still FAIL freshness. The two positioning files explicitly describe June 2026 brand proposals, hence HISTORICAL advisory inputs; labeling or unlinking them is only a proposal. The current-facing community README pair and Vietnamese onboarding page must not be silently reclassified to hide their stale v2.1.1/36-skill claims.

| Document | Classification | Source SHA-256 | Disposition / owner |
| --- | --- | --- | --- |
| README.md | CURRENT | 7968bf6e0893b1b147906392c48473cff11ccff6162b99867e87d5cf266727fc | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| README.vi.md | CURRENT | 4b5aa10b8ef8eed56d23f2a250f7daafbbe7467a8d3ed1979abca95214977042 | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| docs/vi/README.md | CURRENT | 74894683248c0e9a5df8f6439dbe6f76c6d238fcd7d50b6a099a018af912e86b | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| docs/workflow-docs-map.md | CURRENT | 68f23651d050c3f4fa1c5ee9472018378ac22804fb76cbf2f667cbab58cf86d7 | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| docs/workflow-docs-map.vi.md | CURRENT | 937b5f5ac8cf8c002e17c1bfd47cf4f18e887b30945326d88504f4149788d3fa | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| docs/workflow-bundle-quickstart.md | CURRENT | 36f2b051381725912e9cdf02118a523a7fb45b240f8fca0286cf91df8ed8b5ef | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| docs/workflow-bundle-quickstart.vi.md | CURRENT | 8d23684f334139912e831b300a54fd9b00b0b33a1dc9f5855cf163dd402aeb71 | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| docs/publish-surface.md | CURRENT | 670d67d513908f33cd01411ab13b1a3e0def02966d9ff3b9c06595587e06dda3 | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| docs/publish-surface.vi.md | CURRENT | df763dc59e99347d5012343d5b02199123391a685ec8abd7d1ba8e648727221f | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| packages/workflow-bundle/README.md | CURRENT | 287c395ae5eabee657276364b16d3f1e75c38a521bd1c82f61b79468d9b90b46 | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| packages/workflow-bundle/README.vi.md | CURRENT | e2c5ea8001876c304f438eacba409b7c37c311a9eb3e1e3d2231afe1aa40bdcf | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| docs/release/community-pack-readme.md | CURRENT | 03a0e0cad8ce06cdbf0ce2c71873de25e58df748a08237b6f31011cd92379c20 | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| docs/release/community-pack-readme.vi.md | CURRENT | 75607083c0e8e8f1f45e449a1321981f640c40c94128c4378f4d120abe183c21 | Retain current-facing subject; M7/CF-020 verify wording/version claims against governed released identity; BA/DevOps |
| docs/release/community-pack-positioning.md | HISTORICAL | 429a38a53d1defd73d69738621ec83888ac5bc6ccdae5e1742d420278e7422e7 | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; PO/BA |
| docs/release/community-pack-positioning.vi.md | HISTORICAL | aa9d3ab458846745b3bd08728b4ce7bd826b9723cbcb5793d34b11680191a7f3 | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; PO/BA |
| docs/releases/workflow-bundle-v2.0.0.md | HISTORICAL | 2305427a8a6aea5e54c046ac3951fcc8a5b93ac5c2201d548b2b8e7d94e317c8 | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; BA/DevOps |
| docs/releases/workflow-bundle-v2.0.1.md | HISTORICAL | fc4bb384e41db5588db47bcd76eb81c4ff82ada9e3344dfe22bb7a3093b11a9e | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; BA/DevOps |
| docs/releases/workflow-bundle-v2.0.2.md | HISTORICAL | 3bad363ef358875311dd67bb29e95704cc88f7458e3903abe2cbf7bf10bc27a4 | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; BA/DevOps |
| docs/releases/workflow-bundle-v2.2.0.md | HISTORICAL | 887b53947eba084b8ed17dae326d8c4be21238f80bb22a9a0b2b5266db1da97e | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; BA/DevOps |
| docs/releases/workflow-bundle-v2.2.1.md | HISTORICAL | a9dccebb33a2b8e63516c59afd98d8f7fb8ec0a2281cb9a2c9aba63f0edccee1 | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; BA/DevOps |
| docs/releases/workflow-bundle-v2.3.0.md | HISTORICAL | 299b4cedd5fcb0fbd9fdf3dd97f17f057e279e6f7904fcf6ef4f617e7185f9a5 | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; BA/DevOps |
| docs/releases/workflow-bundle-v2.3.1.md | HISTORICAL | 8017d38477643d0a9e5eece0299c9595653cc67128ed6505e0ca2cd0d6c1d050 | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; BA/DevOps |
| docs/releases/workflow-bundle-v2.3.2.md | HISTORICAL | 476b3804e3fb901feb0ede4f817c31475072b1c578de4bdeab8c2d2a10fed98d | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; BA/DevOps |
| docs/releases/workflow-bundle-v2.4.0.md | HISTORICAL | 2b84621cccae1e0126287d9de48fa425dada7fd833b92d722fac33e2c15755a5 | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; BA/DevOps |
| docs/releases/workflow-bundle-v2.5.0.md | HISTORICAL | ff383e19db45d43888627c46a332aba85f24aca45eb3edb6e4d3f1cae7b3da4d | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; BA/DevOps |
| docs/releases/workflow-bundle-v2.6.0.md | HISTORICAL | 12e2e49d61d7145a71e12eaf6c2c82e7fcdc46d349ce16716daa9b858dc45151 | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; BA/DevOps |
| docs/releases/workflow-bundle-v2.6.1.md | HISTORICAL | e5fd05b23ce86184309429e5ad7228cb618c008da215ed96424aff0e59bd6d2d | Preserve versioned record or brand proposal; propose explicit historical label/navigation boundary; BA/DevOps |

All 27 listed files exist and match the pinned source bytes. The full M1 public/navigation surface family includes additional governance/help/glossary subjects; this starter allowlist does not claim that those have been fully classified or language-reviewed. Final CURRENT-doc parity is still M10/M11, after independent release/installation evidence.

## Remaining evidence and scope boundaries

R-02/R-04/R-06 original independent-review documents remain unrecovered. The reported historical 18KB architecture overlay is absent now, but its historical content/precedence/disposition is unknown. No source deletion, ignored-directory promotion, legacy report normalization, gate sealing or retrospective receipt is authorized by these audit classifications. CF-MB1 remains unopened until full M2/M3/M4 evidence is complete.
