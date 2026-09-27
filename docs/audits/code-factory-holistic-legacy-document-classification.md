# Code-Factory legacy and document classification

Historical initial observation: `2026-09-13T04:37:54Z`. Initial audit source: `5b85d7f943fff4fc9e0f559faed43e79f9483b12`; tracked main comparator: `2e3aaded1779787d993b7e5cacc96bfae008b3bc`. Evidence tier: unmerged-child, except explicitly identified ignored/root historical inputs and external trusted receipts.

M3 is IN_PROGRESS. The September 13 historical portfolio had 25 entries: 9 managed and 16 legacy. Current recount below has 41 tracked entries: 20 managed and 21 legacy; the older classifications are not a complete current census. Classifications below are evidence-backed AI recommendations for the ordered CF-MB1 review, not retrospective approvals, migration, retirement or cleanup. Prior-plan/successor recovery remains incomplete.

## Current workspace and lifecycle checkpoint

Observed `2026-09-27T06:00:10.803553Z` from audit `1b2af7be87301c62965f2339b5199aa48ae9e358` and main `a36b1852ca13dd5209fad319400e769c5b22cabf`. The protocol validator passed for 20 managed work items and skipped 21 legacy entries. The primary checkout additionally contains the untracked adapter pair; it is excluded from the tracked audit census and is preserved.

| Worktree | Direct state | Disposition / owner |
| --- | --- | --- |
| `cr008-legacy-blocker-disposition` | ARCHIVED/s08, no blockers/actions; two relevant receipts revalidated, zero unique commits at removal | Local worktree and branch removed 2026-09-23T03:10:59.753Z under its own closeout authority. Archive/handoff integrated by [PR #13](https://github.com/haonh87/Code-Factory/pull/13). Remote branch retained. |
| `materialization-dedup-recovery` | ARCHIVED/s08, no blockers/actions; seven relevant receipts revalidated; 462 ignored files attributed to identical canonical content; zero unique commits | Local worktree and branch removed in the same guarded operation after PR #13. Remote branch retained. |
| `cf-023-receipt-binding` | Detached `0dc985d`; tracked clean, 22 behind main; 468 ignored files retained. Owning `protocol-receipt-binding-check` is PROPOSED with dedup blocker | HOLD_OPEN. Materialization repair did not dispose this item's own blocker. Owner must resolve overlap and establish lawful lifecycle/DoD before cleanup. |
| `code-factory-holistic-audit-remediation` | ACTIVE/s07; `1b2af7b` contains latest main and original WIP commits; three ahead/zero behind main before this checkpoint | HOLD_OPEN. Priority is approved M2/M3 evidence; no master DoD or M4 opening inferred. |
| `publish-planning-work` | `19efbaa`; clean, zero ahead/80 behind main; capability-grant plans lack s08 | HOLD_OPEN. Published plans and merged commits do not establish completion. Classification/successor evidence precedes any later owned closeout. |
| Primary checkout | `main` at `a36b185`; five untracked roots, 19 files | Preserve CHANGE-005 and adapter work item as a matched CF-004 pair; preserve superseded community README filename variant; keep both unattributed scratch notes pending user attribution. |

The earlier `cr-008-adaptive-governance` worktree removal is recorded in its maintenance owner and [PR #12](https://github.com/haonh87/Code-Factory/pull/12). There are now four registered worktrees including the primary checkout. `backup/local-main-2026-09-16` and `evals/behaviour-axis` remain; each carries one commit absent from main. No additional cleanup is performed by this audit.

The guarded removal observation is retained at `/private/tmp/cf-two-done-cleanup-ywnmmreq/result.json`; its durable authorization and archive evidence live in each owning s01/report on main. This audit records observed effects, not a new closeout approval.

Current M3 coverage: all 21 tracked legacy entries have one classification below; the earlier sixteen directories are byte-identical to the prior reviewed source. All 20 managed protocol states are enumerated, and all required terminal receipts for the 17 DONE/ARCHIVED subjects are verified below. Full prior-authority and public-navigation classification remains pending; these completed subchecks do not finish M3.

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

## Legacy work-item classification — 21/21

Counts: 8 LEGACY_CLOSED, 6 actionable, 7 ambiguous, 0 empty-invalid. Protocol validation skips exactly these 21 tracked legacy directories. The original sixteen directories are byte-identical between initial source `5b85d7f943fff4fc9e0f559faed43e79f9483b12` and current source `1b2af7be87301c62965f2339b5199aa48ae9e358`; their earlier direct evidence remains applicable. A bootstrap listing or an unfilled s08 template is not a lifecycle verdict. The root-only untracked adapter is a separate preserved subject, not one of these 21.

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
| architecture-modeling-audience-views | actionable | s01 and s04 directly read. s04 records four FOLD_IN research recommendations; AC-003 is PARTIAL, repository preservation deferred, no s08. Approved-looking frontmatter does not complete delivery. Archive recovered below. | BA/QC; verify the recorded research decision and outstanding preservation under its own authority; no source fold-in or cleanup from master audit |
| capability-grant-granularity | actionable | s06 authoring is approved and names T0 before T1-T5, but no protocol report, s07 or s08 exists. Task Plan says seal and wait for CR-008; CR-008 is now archived, so that dated dependency needs owner reconciliation. | developer/QC; lawful admission and receipt/grant verification before T0, then current feasibility review; published plan is not execution permission |
| capability-grant-reconciliation | actionable | s04 remains draft with empty reviewer fields and no Spec Card; body READY is explicitly authoring-only. It orders granularity first; no s05-s08 or report. | BA/developer/QC; complete requirement/contract decisions and predecessor evidence before design; retain as separate plan |
| plugin-marketplace-distribution | actionable | Meaningful s01 proposal, but later scaffold including s08 is unfilled/draft with enum placeholders. Distribution/consumer claims are dated September 11; no DoD evidence. Not an empty directory and not terminal. | PO/maintainer/developer; revalidate migration and consumer assumptions before any materialization/implementation; no repository visibility or installer change authorized |
| workflow-claims-register | actionable | Only substantive draft s01 exists; truth/derivation axis and dependencies are proposals, no authoring or delivery closure. CR-008 and typed-state blockers are dated inputs. | PO/BA/developer; revalidate need/dependencies and continue discovery only through its own admission; do not implement from this audit |

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

## Recovered architecture prototype input

Classification: **HISTORICAL_INPUT**. Recovered read-only at `2026-09-27T06:06:01.570119Z` from `~/.claude/backups/architecture-modeling-prototype-2026-08-13.tar.gz`; archive SHA-256 `cde6db73308145f5a27efe326270143decc80ece569ea147cc88122c8bb94cee`. Its canonical successor remains tracked `skills/architecture/architecture-modeling/`. This recovery does not restore an override or prove historical harness precedence. AppleDouble `._*` metadata was identified separately; no extraction or deletion occurred.

| Archived member | Bytes | SHA-256 | Read scope |
| --- | ---: | --- | --- |
| `architecture-modeling/SKILL.md` | 18177 | `03f3824b042f9d2a7ce4e9fca5f60178b44dd49a3e9ed257dbbff8a7d53edf5f` | full content read |
| `architecture-modeling/SKILL.vi.md` | 19671 | `9f0be0aa76fd10c5b7f207b00d192535a725c7a6288efee3ee0b7e5e83c45e14` | hash only |
| `architecture-modeling/references/diagram-quality.md` | 5310 | `29fe992de55dc3a1adf688a5be4757d53ae67421824c9509765bbcb2ac7f2214` | full content read |
| `architecture-modeling/references/house-conventions.md` | 6618 | `b5d28d99167f06210a6ca37301e41c5ee7ec857caf572df8675b6d3ed9331539` | full content read |
| `architecture-modeling/references/two-axis-views.md` | 4280 | `8f5652860c818a16b2e41236d0f64356eb49b211d6956f67f67044de1789fc7b` | full content read |
| `architecture-modeling/references/interface-catalog.md` | 4138 | `c4f2008747a2e251bcb7fa98796b45095354c0e5d2654fe54ddcb33221c07e83` | full content read |

The English skill and four references show house-convention discovery, domain/tag audience views, notation/C4 guidance and interface ownership/volume/version fields. The four references total 20,346 bytes, agreeing with the research s04. That s04 is the existing owner of the FOLD_IN recommendation; it remains without s08 and with the repository-copy half of AC-003 outstanding. The prototype also has different rendering and incompleteness rules from current canonical source, so copying it wholesale would change behavior. Owner: BA/QC for the research decision and a separately admitted source owner for any approved fold-in. The archive is preserved; its classification creates no authority to delete or install it.

## Managed work-item terminal evidence

Current read-only check: `2026-09-27T06:03:08.085Z` at `1b2af7be87301c62965f2339b5199aa48ae9e358`. All 20 managed reports are enumerated. For all 17 DONE/ARCHIVED subjects, the runtime's applicability/Light host mapping selected 33 terminal receipts; every selected receipt is APPROVED with `digest_match=true`. The CLI computes a positive digest match only after verifying approved receipt/signature validity. Host references, reviewers, times and hashes were captured using `wfc gate status --work-item <slug> --gate <required-gate> --json`; no receipt was written.

| Managed subject | Protocol / s08 host status | Required terminal gates / evidence | Interpretation / owner |
| --- | --- | --- | --- |
| adaptive-governance-human-approval-ux | ARCHIVED / final | dod, release, business_acceptance: APPROVED / digest matched | Sealed s08 contains pre-seal pending prose; report records signed closeout, exact-candidate reconciliation, close/archive and separately signed legacy disposition. Preserve chronology. |
| align-adaptive-sa-ta-applicability | ARCHIVED / final | dod: APPROVED / digest matched | No terminal receipt-binding contradiction. Historical pre-seal next actions and scoped residuals stay in the frozen host; owner handles any later follow-up. |
| approval-path-defects | DONE / approved | dod: APPROVED / digest matched | Human-approved PARTIAL closure, TD-01..04 only; AC-007 and disclosed residuals remain separate. Protocol DONE does not convert coverage to full PASS. |
| artifact-governance-enforcement | DONE / approved | dod, release, business_acceptance: APPROVED / digest matched | No terminal receipt-binding contradiction. Historical pre-seal next actions and scoped residuals stay in the frozen host; owner handles any later follow-up. |
| artifact-governance-model | DONE / approved | dod: APPROVED / digest matched | P1 closure only; P2-P4 excluded. Later enforcement has its own owner; preserve the frozen historical scope. |
| ci-guardrails-parallelisation | BLOCKED / absent | Not checked as terminal; no terminal completion claimed | BLOCKED report / absent s08. GOV-EX-002 ownership premise is dated; Node24 successor is ARCHIVED, but T3/T4 and exception disposition need their owner. No automatic resume. |
| closeout-bundle-legacy-dod-compatibility | ARCHIVED / approved | dod, release, business_acceptance: APPROVED / digest matched | No terminal receipt-binding contradiction. Historical pre-seal next actions and scoped residuals stay in the frozen host; owner handles any later follow-up. |
| closeout-bundle-repeat-cycle-reconciliation | ARCHIVED / final | dod: APPROVED / digest matched | Sealed child checkpoint retains BLOCKED/MISSING prose; report records parent exact-candidate contribution on September 15 before close/archive. Qualified child verdict and later contribution are distinct. |
| code-factory-holistic-audit-remediation | ACTIVE / draft | Not checked as terminal; no terminal completion claimed | ACTIVE/s07 with draft s08; M2/M3 ongoing and M4/CF-MB1/DoD not opened. |
| cr008-legacy-blocker-disposition | ARCHIVED / verified | dod: APPROVED / digest matched | Archive and authorized local cleanup integrated by PR #13; report has no blockers/actions. Operational removal checked separately above. |
| fix-authoring-smoke-bootstrap | ARCHIVED / reviewed | dod, release, business_acceptance: APPROVED / digest matched | No terminal receipt-binding contradiction. Historical pre-seal next actions and scoped residuals stay in the frozen host; owner handles any later follow-up. |
| integrate-design-checklists-into-sa-ta | DONE / approved | dod, release, business_acceptance: APPROVED / digest matched | No terminal receipt-binding contradiction. Historical pre-seal next actions and scoped residuals stay in the frozen host; owner handles any later follow-up. |
| materialization-dedup-recovery | ARCHIVED / verified | business_acceptance, dod: APPROVED / digest matched | Archive and authorized local cleanup integrated by PR #13; report has no blockers/actions. Operational removal checked separately above. |
| protocol-receipt-binding-check | PROPOSED / draft | Not checked as terminal; no terminal completion claimed | PROPOSED dedup blocker; s07/s08 are placeholders. Materialization repair does not approve or close this separate item. |
| release-workflow-bundle-v2-6-3 | ARCHIVED / approved | release, business_acceptance, dod: APPROVED / digest matched | Current terminal receipts supersede the frozen pre-seal next-action wording. Release remains ARCHIVED; no reopening or publication from this audit. |
| stabilize-architecture-skill-bundle | DONE / approved | dod, release, business_acceptance: APPROVED / digest matched | No terminal receipt-binding contradiction. Historical pre-seal next actions and scoped residuals stay in the frozen host; owner handles any later follow-up. |
| terminal-archive-legacy-state-reconciliation | ARCHIVED / approved | business_acceptance, dod: APPROVED / digest matched | No terminal receipt-binding contradiction. Historical pre-seal next actions and scoped residuals stay in the frozen host; owner handles any later follow-up. |
| trusted-receipt-namespace-resolution | DONE / approved | dod: APPROVED / digest matched | No terminal receipt-binding contradiction. Historical pre-seal next actions and scoped residuals stay in the frozen host; owner handles any later follow-up. |
| upgrade-guardrails-actions-node24 | ARCHIVED / approved | dod: APPROVED / digest matched | No terminal receipt-binding contradiction. Historical pre-seal next actions and scoped residuals stay in the frozen host; owner handles any later follow-up. |
| worktree-and-closure-integrity | DONE / approved | dod: APPROVED / digest matched | Human accepted PARTIAL REQ-004; E-B carried to trusted-receipt-namespace-resolution. Do not erase accepted partial scope or other residuals. |

Exact current identities (source-owned reports and terminal hosts; a hash does not imply that every statement is current):

| Subject | Report SHA-256 | s08 SHA-256 |
| --- | --- | --- |
| adaptive-governance-human-approval-ux | `111c425d97214dcf5b8720e931e6b6d32a3269bb93245de795362e51327b9761` | `e994f4292829e77d06ba809e897c3efd6d2c6cff562b579ed1536f5e92d0cc93` |
| align-adaptive-sa-ta-applicability | `558d98a58c2be7d12b46b4b78ac995b1742413c82bc21acb9f80259b8ee1c8f0` | `186049911f4e04cea6406a095935849207551c200dabfd3e8e81a4db6daca249` |
| approval-path-defects | `a39fe8dcfb4e36adc763eee54ad07be912884b318e514a6604556312afa75d44` | `9b2bb2742a06e702f2a3373921fda08185bf62eae53e7caace68b1366be96098` |
| artifact-governance-enforcement | `138f5405e961aad4af666a09a4f12ef14c87aa961de1b4272787de758feb0a10` | `c96a78a5a17e5a5ad8cdf76e6ab0572d805e4afbc151053e9c9745c6946b7146` |
| artifact-governance-model | `f54410e2eda732e9e3d319346c8ce415a8a2578d3b23fe5ea9c03f45eeebd0a6` | `77fa772288024df780065fc9129032e415caa9ea0cda78ba9db3d252f005e32d` |
| ci-guardrails-parallelisation | `6b7e71786d39581fa11745917d447ba1e42c524ca54aad25d5fd478925f3f7ab` | `ABSENT` |
| closeout-bundle-legacy-dod-compatibility | `6bcd5fa4fe3d5b4176b0ec1b465aab548eb9ec0ca7120a54e3b2c5f577b47ede` | `acdd6b392f2661efcfe636c8916fde5207d0fe19c41633200e276e1d5b20dde9` |
| closeout-bundle-repeat-cycle-reconciliation | `59967a9f0530ea75a401e59c94ed6a17ff9ebfa8ad28878b2bb96e99b3088a37` | `e3159a438678242069c8045058b3d1c1664fa6451207a37cec123cfb8736af2e` |
| code-factory-holistic-audit-remediation | `ae4d0c89b9069a131988cd843fd7df58d0b368c5bfa2c8aea7c39d3cab3527c6` | `18359a8680a722ada1587c7f6442d3751fb81d63f011d8a1919ef09e41c5ee1f` |
| cr008-legacy-blocker-disposition | `5da9f70feb09352ddd26b063a33a0f4c718d746949e9e3ea69a6059bde30ec0b` | `ab273cc0559306bcd005f2d870e4e03af9c63529a265b52dc13c29f07e9ad32d` |
| fix-authoring-smoke-bootstrap | `e10aca509b9e7a9092f0338a0413b2b3261aae2bacc955215c8420ae8ed5a59e` | `f87100519f4cf45d5df7d89d292f608ae3136d604171eba0ae84321a3e58e56f` |
| integrate-design-checklists-into-sa-ta | `0c301c3e386a6cdf788c8219d2ac075ec9e5fb636a09075629822b594a9434f2` | `89f0b65a37d8cf63147c6152526024635a93eedda437fb8499c761759eb4c017` |
| materialization-dedup-recovery | `225c9ce75afbabb111974247b3a469a64812c4a11e4ec2517c22731e9726ce77` | `88c13121c981ac7205585f6dbacf6b5edb6e1ae2797d4f753c6675d6169f373b` |
| protocol-receipt-binding-check | `62f334ed692cd39fe32f668704ca6d673008f97763cdef44bda0c9c522033b8c` | `d2b97ecc89b000a70f2867b3774d57e8c406d850f28dc2e0c7c433925d18573a` |
| release-workflow-bundle-v2-6-3 | `5fe3114104e1575a4587afb833559b7eee1600a93d67fee1d95ed422afe5ce00` | `410035c80d7192f678f07c03ec7a92ae26b0874c0545f6bea9c456b7b8e35074` |
| stabilize-architecture-skill-bundle | `ebeb704212e12549b8051db5789570394641c2d78e19774686b82b21bd9e457c` | `2a84806c915fe2c773459cd45d95c21d76e4bd1c2d82670c57b59ce84a5b08c3` |
| terminal-archive-legacy-state-reconciliation | `5ab6d81cfb38beeedbf057048d4e48e13f1d4e1d96285c7a947da8f4fd96e4a4` | `53b3605efce97513f7659da1621d61734afef9c68a9744323105841339d57536` |
| trusted-receipt-namespace-resolution | `d24994830f43612386faa92d91feb65d255b2352acc293f98bb04aadc9a2b0d4` | `4e6439bdd03a3151d647f76266e3280867ac2413ff10595e12cbfa97d1e30c04` |
| upgrade-guardrails-actions-node24 | `bee75858270fb40284bb8babc70a8fdf258fe00a4b1b9a71a35edf983f8351f3` | `e02623f4d54ee2f13eb3abad0c9b1ee69782c9273528eb13693304a396dfc6c2` |
| worktree-and-closure-integrity | `34ee19d045bf4573ef85ec45352e092a0cd6e2a6ccb6c9e8fd815ff62bc559f3` | `f359fef48a878460474e68f23411337ce516bc5ed121e950b6e8b61793adfb44` |

M3-OBS-03: signed host text can legitimately preserve pre-seal instructions and historical qualified scope after the protocol advances. In particular, the parent and repeat-cycle child report events at `2026-09-15T06:47:56Z` bind reconciliation to transaction `597aa5f9-1043-447e-b762-b6a7858f1b9c` and parent s08 digest `e994f4292829e77d06ba809e897c3efd6d2c6cff562b579ed1536f5e92d0cc93`, followed by close and archive. Current parent terminal receipts and child DoD match. Classify the earlier pending prose as historical; do not edit signed hosts or invent a new gate.

M3-OBS-04: CI parallelisation remains an actual BLOCKED report even though the CR-008 ownership premise and Node24 dependency have advanced. Developer/DevOps owns fresh T3/T4 scope and the existing exception; audit classification is not permission to clear the blocker. Likewise, the receipt-binding proposal retains its own dedup review action. These are owned follow-ups for M4 routing, not new source changes.

These checks establish lifecycle/receipt classifications, not every earlier authoring gate, every residual closure, branch cleanup permission or live release/installed provenance. Root README and v2.6.1 wording flagged in historical M3-OBS-02 still require current-document comparison below; old wording is not used to revoke valid terminal receipts.

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

R-02/R-04/R-06 original independent-review documents remain unrecovered. The historical 18KB architecture prototype has now been recovered and classified above; historical effective precedence is still unproven. No source deletion, ignored-directory promotion, legacy report normalization, gate sealing or retrospective receipt is authorized by these audit classifications. CF-MB1 remains unopened until full M2/M3/M4 evidence is complete.
