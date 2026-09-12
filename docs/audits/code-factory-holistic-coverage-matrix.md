# Code-Factory holistic coverage matrix

Audit source: `5b85d7f943fff4fc9e0f559faed43e79f9483b12`; tracked main comparator: `2e3aaded1779787d993b7e5cacc96bfae008b3bc`.
Evidence tier: unmerged-child. M0/M1 are observed; M2 semantics and final AC closure are not yet approved.

## Inventory coverage

42/42 unique canonical skills across seven groups; 227 tracked supporting files are pinned in [inventory](code-factory-holistic-inventory.json). All 42 SKILL.md files match the tracked main comparator. Eight surface families are enumerated, with deliberately overlapping membership. Generated runtime is absent and gitignored in this worktree; no prepack/sync was executed.

| Skill | Group | Trigger/boundary | Input/output/schema | References/examples | Authority/applicability | Runtime discovery | Semantic result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| brainstorming | analysis | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| product-thinking | analysis | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| requirement-analysis | analysis | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| sa | analysis | Driver-only s01-s04 trigger/boundary read | Envelope read; full operative schema pending | Main skill read; operative refs pending | No solution choice; pack availability assertion conflicts with canonical source | Installed present; content differs; precedence unknown | PARTIAL |
| system-design | analysis | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| ta | analysis | Technical-driver-only s01-s04 trigger/boundary read | Envelope read; full operative schema pending | Main skill read; operative refs pending | No solution choice; pack availability assertion conflicts with canonical source | Installed present; content differs; precedence unknown | PARTIAL |
| architecture-modeling | architecture | s05 after acceptance/boundaries; no domain design | Model/render/view envelope and full model contract read | Three operative EN model/routing/quality references read; script/test review pending | One render owner and separate human first-open check; cross-step SA/TA dependency needs review | Installed missing; no current local duplicate | PARTIAL |
| database-design | architecture | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| domain-architecture | architecture | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| frontend-architecture | architecture | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| frontend-experience-design | architecture | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| branch-finish-discipline | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| ci-cd-release | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| code-scan-review | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| containerization-packaging | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| database-change-review | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| delegation-discipline | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| deployment-devops | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| frontend-quality-review | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| implementation | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| platform-runtime-deployment | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| react-best-practices-review | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| react-web-implementation | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| review-discipline | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| task-breakdown-planner | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| testing | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| worktree-discipline | delivery | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| artifact-governance | guardrails | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed missing; precedence unknown | PARTIAL |
| definition-of-done-gate | guardrails | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| definition-of-ready-gate | guardrails | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| input-readiness-assessor | guardrails | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| karpathy-coding-discipline | guardrails | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| step-goal-auditor | guardrails | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| step-goal-contract | guardrails | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| workflow-pack-audit | guardrails | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| notebooklm | notebooklm | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| json-canvas | obsidian | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| obsidian-bases | obsidian | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| obsidian-markdown | obsidian | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| codex-workflow-chain | orchestration | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| goal-griller | orchestration | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | NOT_REVIEWED | Installed present; precedence unknown | PARTIAL |
| workflow-governance-router | orchestration | Delivery versus Q&A boundary and entry trigger read | Seven-field report/status invariant read | Full skill read; operative authority cross-check pending | Human gates explicit; unknown gates fail closed | Installed present; source bytes equal; precedence unknown | PARTIAL |

## Acceptance coverage

| Criterion | Current evidence | Result | Remaining closure |
| --- | --- | --- | --- |
| AC-CF-001 | M1 42 skills / 8 families / exact source digests | PARTIAL | M2 100% semantic review and final recount |
| AC-CF-002 | Protected prior authority retained | PARTIAL | M3/M4 one classification/disposition each |
| AC-CF-003 | Existing approved task dependencies | PARTIAL | M4-M8 finding/child closure contracts |
| AC-CF-004 | M0 six roots and independent receipts | PARTIAL | Final child authority audit |
| AC-CF-005 | Installed 2.3.2/40 observed on both harnesses | FAIL | Exact candidate/release/installed reconciliation M10 |
| AC-CF-006 | No semantic result inferred from mechanical tests | PARTIAL | Semantic-child standard-path negative regression |
| AC-CF-007 | Deterministic review scope pending M7 | PARTIAL | BA rubric + QC evidence |
| AC-CF-008 | No history rewritten | PARTIAL | All legacy/lifecycle classifications and final closure |
| AC-CF-009 | No package generated or hosted identity claimed | PARTIAL | Repeated clean artifact/content/provenance comparison |
| AC-CF-010 | Applicability contract review pending M2 | PARTIAL | Operative policy/runtime semantic fixtures |
| AC-CF-011 | Current/historical document review pending M3 | PARTIAL | Released/installed allowlist parity |

## Mechanical and semantic separation

Mechanical baseline: pack audit PASS (166 resolved skill cross-references); architecture-role-skills-contract.test.js PASS. Workflow naming/governance 181/177 PASS; protocol 9 managed/16 legacy PASS; planning 177 PASS.

M2 has begun with four full canonical SKILL.md reads and three architecture-modeling operative EN references. None is declared fully semantically closed: SA/TA operative references, scripts/tests, runtime/authority cross-checks and the other 38 skills remain.

A successful inventory or pack audit does not make any NOT_REVIEWED semantic cell PASS. No Technical Verification, DoD, merge, publish, tag or install is opened here.

## Initial cross-boundary observations (not original R-* findings)

| Observation | Evidence | Result | Next review |
| --- | --- | --- | --- |
| M2-OBS-01 pack capability wording | SA/TA Out Of Scope says architecture-modeling is not shipped with this pack; canonical source contains it, root manifest maps both harnesses to skills, prepack copies that root | FAIL at source-contract tier; no released package membership asserted | Complete source/package capability contract review and propose bounded correction at M4 |
| M2-OBS-02 lifecycle dependency | SA/TA s01-s04 can commission a landscape; architecture-modeling explicitly requires s05 acceptance/boundaries | PARTIAL: stage/applicability tension, not an automatically approved exception | Read invocation/landscape rules and gate applicability before final finding |
| M2-OBS-03 snapshot separation | Master/main comparator lacks the later Adaptive Admission rule; child branch carries later applicability work | PARTIAL | CF-019 must be revalidated against its named unmerged child, not fabricated as a two-clause contradiction in this older source snapshot |
