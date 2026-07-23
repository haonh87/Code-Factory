---
language: en
---

# Skill Pack Audit Report

> Vietnamese: skill-pack-audit-report.vi.md

Tracking note for the skill-pack audit of `workflow-bundle v2.3.0` (36 skills across `analysis`, `architecture`, `delivery`, `guardrails`, `orchestration`, `obsidian`). Produced with `workflow-pack-audit`'s method (script-equivalent checks + semantic checklist review), run across 4 parallel analysis passes plus direct `diff`/`grep` verification of every load-bearing claim before acting on it.

Audit date: `2026-07-22`.

## Quick Status

| Priority | Findings | Status |
|---|---|---|
| P0 | 3 | FIXED — commit `6297649` |
| P1 | 6 | FIXED — commit `72c8f70` |
| P2 | 7 | 5 FIXED, 2 NO_CHANGE_NEEDED — not yet committed |

Verification after P0, P1, and P2: `npm run build:workflow:bundle-runtime` (mirror sync), `npm run validate:workflow:bundle-smoke` (PASS), `npm run validate:workflow:unit` (25/25 PASS), UTF-8 check on every changed `*.vi.md` file, and a `comm` diff confirming all 15 `## Hard Rule` headings in `policies/codex/AGENTS.global.md` exist verbatim somewhere in the skill layer.

## Findings

```yaml
audit_scope: "Whole skills/ tree, policies/codex/AGENTS.global.md, and skills/orchestration/codex-workflow-chain/references/workflow-chain.md"
findings:
  - id: GOV-01
    priority: P0
    status: FIXED
    fixed_in: "6297649"
    severity: HIGH
    area: WORKFLOW_CHAIN
    path: "skills/orchestration/codex-workflow-chain/SKILL.md"
    issue: "Hard Rule: SDD Light Profile exists in policies/codex/AGENTS.global.md but was completely absent from codex-workflow-chain/SKILL.md, even though workflow-governance-router cites that rule as authority."
    recommendation: "Backfill a full SDD Light Profile section into SKILL.md and references/workflow-chain.md."
  - id: GOV-02
    priority: P0
    status: FIXED
    fixed_in: "6297649"
    severity: MEDIUM
    area: WORKFLOW_CHAIN
    path: "skills/orchestration/codex-workflow-chain/SKILL.md, references/workflow-chain.md"
    issue: "4 Hard Rule headings drifted in wording from AGENTS.global.md: Prefer The Smallest Sufficient Solution vs ...That Is Correct; No Premature Done Declaration vs Do Not Self-Declare Done; Branch/Worktree Closed Only After Verify vs ...Only Finalized After Verify; Worktree For Large Or Risky Change vs ...Changes."
    recommendation: "Rename the 4 skill-layer headings to match AGENTS.global.md verbatim."
  - id: GOV-03
    priority: P0
    status: FIXED
    fixed_in: "6297649"
    severity: MEDIUM
    area: SCRIPT
    path: "skills/guardrails/workflow-pack-audit/references/checklist.md"
    issue: "workflow-pack-audit, the repo's own drift-detection tool, had no check for Hard Rule sync between AGENTS.global.md and the skill layer -- the exact class of drift found in GOV-01/GOV-02."
    recommendation: "Add a Governance Authority Sync checklist section (EN+VI) plus a script-check line."
  - id: DB-01
    priority: P0
    status: FIXED
    fixed_in: "6297649"
    severity: MEDIUM
    area: SKILL
    path: "skills/delivery/database-change-review/"
    issue: "No reference by database engine despite very different lock/rollback/backfill risk profiles across Postgres, MySQL, and MongoDB."
    recommendation: "Add references/{postgresql,mysql,mongodb}.md (+ .vi.md) and a Choosing The Reference By Engine section."
  - id: GOV-04
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: LOW
    area: WORKFLOW_CHAIN
    path: "skills/orchestration/codex-workflow-chain/references/workflow-chain.md"
    issue: "SDD Light Profile was also missing here (same gap as GOV-01, second copy). Separately, Brownfield Baseline And Delta Discipline content existed but a missing newline glued its heading onto the previous bullet, hiding it from any `^## Hard Rule` scan."
    recommendation: "Backfill the SDD Light Profile section; fix the missing newline before the Brownfield heading."
  - id: GOV-05
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: MEDIUM
    area: WORKFLOW_CHAIN
    path: "skills/orchestration/workflow-governance-router/SKILL.md"
    issue: "Hard Rule: Router Before Action and Hard Rule: Generic Coding Defaults Do Not Open A Gate exist only in AGENTS.global.md, with no verbatim skill-layer counterpart anywhere."
    recommendation: "Add both Hard Rule sections (EN+VI), referencing the skill's existing <HARD-GATE>/Red Flags content instead of restating it."
  - id: DEL-01
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: LOW
    area: SKILL
    path: "skills/delivery/{delegation,worktree,review,branch-finish}-discipline/SKILL.md"
    issue: "50-65% of each skill's Decision Rule restated codex-workflow-chain's Hard Rule trigger conditions verbatim instead of only covering the skill's own execution logic."
    recommendation: "Point each Decision Rule's trigger conditions to the matching Hard Rule directly; keep only the skill-specific decision nuance."
  - id: DEVOPS-01
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: MEDIUM
    area: SKILL
    path: "skills/delivery/deployment-devops/references/promotion-flow.md, skills/delivery/ci-cd-release/references/promotion-controls.md"
    issue: "Near-duplicate promotion/rollback/tagging rules across two files with no single owner."
    recommendation: "promotion-flow.md owns Gates/Rollout/Rollback/Guards/BLOCKED signs; promotion-controls.md owns Tagging/Approval/Evidence; each cross-references the other instead of restating."
  - id: DEVOPS-02
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: LOW
    area: SKILL
    path: "skills/delivery/{ci-cd-release,containerization-packaging,platform-runtime-deployment,deployment-devops}/SKILL.md"
    issue: "The *_recommendation enum (READY/READY_WITH_GUARDS/BLOCKED) in all 4 DevOps skills had no Decision Rule explaining the thresholds, and 3 of 4 also lacked a Normalizing Output In A Workflow Note section."
    recommendation: "Add a Decision Rule and Normalizing Output section to each of the 4 skills."
  - id: FE-01
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: MEDIUM
    area: SKILL
    path: "skills/architecture/frontend-architecture/SKILL.md"
    issue: "frontend-experience-design points forward to frontend-architecture twice; frontend-architecture had no reverse pointer, so an agent starting there would not know to run UX design first."
    recommendation: "Add a symmetric handoff line in frontend-architecture's When To Use section."
  - id: FE-02
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: MEDIUM
    area: SKILL
    path: "skills/delivery/frontend-quality-review/SKILL.md"
    issue: "The performance_heuristic execution step listed \"hot rerenders, hydration cost\" -- react-best-practices-review's exact gates (render_stability, hydration_bundle_cost) -- despite frontend-quality-review's own Out Of Scope disclaiming render/hydration."
    recommendation: "Remove the React-specific terms from the execution step; defer explicitly to react-best-practices-review's gates."
  - id: ARCH-01
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: LOW
    area: SKILL
    path: "skills/architecture/domain-architecture/SKILL.md, skills/architecture/frontend-architecture/SKILL.md"
    issue: "~48%/~47% of each SKILL.md was a canonical pattern block that only applies to one architecture_style/frontend_style value, loaded unconditionally on every trigger (247 and 229 lines respectively)."
    recommendation: "Extract to references/dod-pattern.md and references/module-first-pattern.md (+ .vi.md); leave a conditional pointer in SKILL.md."
  - id: OBS-01
    priority: P2
    status: FIXED
    fixed_in: "uncommitted"
    severity: LOW
    area: SKILL
    path: "skills/obsidian/{json-canvas,obsidian-bases,obsidian-markdown}/SKILL.md"
    issue: "3 skills are 600+ lines each with no references/ directory -- the only skills in the repo not using progressive disclosure, despite the pattern being established elsewhere (code-scan-review, deployment-devops, codex-workflow-chain)."
    recommendation: "Extract low-frequency material (Complete Examples, Functions Reference, Callouts/Diagrams tables) into references/; keep SKILL.md to core, high-frequency syntax. Estimated 35-51% size reduction per skill."
    resolution_note: "json-canvas 643->331 (-49%), obsidian-bases 619->356 (-42%), obsidian-markdown 621->471 (-24%). New references/ files: json-canvas/examples.md; obsidian-bases/{functions,examples}.md; obsidian-markdown/{callouts,diagrams-and-extras}.md. These 3 skills have no SKILL.vi.md sibling by existing convention (unlike the rest of the repo), so the new reference files were kept EN-only to match, not split into .vi.md pairs."
  - id: FE-03
    priority: P2
    status: FIXED
    fixed_in: "uncommitted"
    severity: LOW
    area: SKILL
    path: "skills/architecture/frontend-architecture/SKILL.md, skills/architecture/frontend-experience-design/SKILL.md"
    issue: "\"state\" means two different things across the pair: frontend-architecture's state_ownership_rules (module ownership) vs frontend-experience-design's surface_states (loading/empty/error/success) -- same word, different concept."
    recommendation: "Rename one of the two fields to remove the terminology collision."
    resolution_note: "Renamed frontend-architecture's field to client_state_ownership_rules (SKILL.md + .vi.md, plus the schema-catalog copy in codex-workflow-chain/references/workflow-chain.md + .vi.md). frontend-experience-design's surface_states is unchanged."
  - id: NB-01
    priority: P2
    status: FIXED
    fixed_in: "uncommitted"
    severity: LOW
    area: SKILL
    path: "skills/notebooklm/SKILL.md, skills/delivery/frontend-quality-review/SKILL.md, skills/delivery/implementation/SKILL.md"
    issue: "notebooklm has fallback guidance for auth failure but none for MCP/network/uvx failure, despite CLAUDE.md requiring an explicit limitation statement on any tool failure. Separately, React/Next.js is the only framework covered at s07/s08 with no explicit fallback line for Vue/Angular/Svelte."
    recommendation: "Add an MCP/network-failure fallback paragraph to notebooklm; add one non-React fallback line to the React-specific skills' Out Of Scope."
    resolution_note: "Added a Fallback When Unavailable section to notebooklm/SKILL.md (no .vi.md sibling exists for this skill). Added a non-React fallback bullet to frontend-quality-review and implementation (both SKILL.md + .vi.md)."
  - id: AN-01
    priority: P2
    status: FIXED
    fixed_in: "uncommitted"
    severity: LOW
    area: SKILL
    path: "skills/analysis/system-design/SKILL.md"
    issue: "system-design's Mandatory Process re-runs the full option-comparison ritual already performed by brainstorming instead of consuming its locked recommended_option."
    recommendation: "Consume brainstorming's recommended_option directly when present; only re-run comparison if it is missing or weak."
    resolution_note: "Merged the old steps 2-4 of Mandatory Process into one conditional step: consume option_analysis directly when brainstorming already locked a recommended_option that still fits; only fall back to generating the comparison when it is missing/weak (SKILL.md + .vi.md)."
  - id: AN-02
    priority: P2
    status: FIXED
    fixed_in: "uncommitted"
    severity: LOW
    area: SKILL
    path: "skills/analysis/requirement-analysis/SKILL.md"
    issue: "~20% of the file is an illustrative YAML example, not part of the mandatory contract."
    recommendation: "Trim the worked example or move it to a short reference file."
    resolution_note: "Moved to references/example.md (+ .vi.md); SKILL.md keeps a 2-line pointer. 174->141 lines."
  - id: ARCH-02
    priority: P2
    status: FIXED
    fixed_in: "uncommitted"
    severity: LOW
    area: SKILL
    path: "skills/architecture/domain-architecture/SKILL.md, skills/architecture/database-design/SKILL.md, skills/architecture/frontend-architecture/SKILL.md"
    issue: "ownership_map (domain-architecture), owner_module (database-design), and state_ownership_rules (frontend-architecture) are each defined independently with no field forcing them to agree -- a traceability gap, not literal duplication."
    recommendation: "Add a rule requiring owner_module values in database-design/frontend-architecture to trace back to domain-architecture's ownership_map, flagging a mismatch as a design_risk instead of silently allowing drift."
    resolution_note: "Added the trace-back rule to database-design's and frontend-architecture's Quality Rules (EN+VI), and a one-line cross-reference to domain-architecture's ownership_map description (EN+VI)."
  - id: DEVOPS-03
    priority: P2
    status: NO_CHANGE_NEEDED
    severity: LOW
    area: DOC
    path: "skills/delivery/{ci-cd-release,containerization-packaging,platform-runtime-deployment,deployment-devops,code-scan-review}/references/*.vi.md"
    issue: "~15 EN/VI reference file pairs (30 files) confirmed as literal line-for-line translations, not drifted -- but this contradicts the project's own stated convention (\"Vietnamese retained as supplementary reference ... Runtime skills are EN-first\")."
    recommendation: "Decide whether to keep full VI reference duplicates or collapse to a single EN reference with a VI pointer, matching the SKILL.md-level convention already used elsewhere."
    resolution_note: "On review this does NOT contradict the convention: CLAUDE.md explicitly names \"*.vi.md siblings\" as the supplementary-reference mechanism, and every skill added or edited in this repo (including all of P0/P1/P2 above) follows the identical SKILL.md+SKILL.vi.md / references/*.md+*.vi.md pairing. Collapsing DevOps references to EN-only would be inconsistent with the rest of the repo and would reduce VI usability. No change made."
  - id: TAX-01
    priority: P2
    status: NO_CHANGE_NEEDED
    severity: LOW
    area: SKILL
    path: "skills/notebooklm/"
    issue: "notebooklm sits directly under skills/ with no subfolder, unlike every other skill (analysis/architecture/delivery/guardrails/orchestration/obsidian)."
    recommendation: "Move to a new skills/tooling/ (or skills/integrations/) directory; update any registry/manifest paths that reference the old location."
    resolution_note: "README.md, README.vi.md, skills/README.md, and skills/README.vi.md all already document this as a deliberate placement (\"top-level integration skill by design ... not belonging solely to analysis, delivery or guardrails\"), not an oversight. A trial git mv to skills/tooling/notebooklm confirmed the move is mechanically safe (sync-workflow-bundle-runtime.js discovers skills via a generic recursive walk, and the Codex flat runtime keys installs by skill name, not source category), but was reverted since moving it would contradict the recorded rationale and just reassign it to a different single category. No change made."
overall_status: PARTIAL
follow_up_actions:
  - "Commit the P2 changes (currently uncommitted) once reviewed."
  - "Re-run workflow-pack-audit's Governance Authority Sync check once more to confirm no other drift was introduced across P0-P2."
notes: "P0 and P1 are implemented and committed (6297649, 72c8f70). P2 batch is implemented (5 FIXED, 2 NO_CHANGE_NEEDED after re-review) but not yet committed, pending human review per this repo's AI-proposes-human-approves model."
```

## How To Use This Note

- Update the `status` and `fixed_in` fields in place as items move from `OPEN` to `FIXED`; do not delete a finding once it is closed, so the history stays visible.
- If a new drift or overlap is found later (for example by running `workflow-pack-audit` after this note), append a new `id` following the same `<AREA>-<NN>` convention instead of editing an existing entry's meaning.
- The `overall_status` at the bottom should flip to `PASS` once every `P0`/`P1`/`P2` row reads `FIXED` (or is explicitly deferred with a reason recorded in `notes`).
