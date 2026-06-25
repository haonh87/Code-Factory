---
artifact_id: "community-pack-i18n.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "community-pack-i18n"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach:
    - "developer"
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-06-24"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  uat_reviewed_by: []
  uat_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "community-pack-i18n.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach (Stage 5 — Project-context governance)

> [!summary]
> Continue Combo A i18n: translate the 9 `project-context/` files to EN as the single source of truth (100% EN).
> EN becomes the operative baseline of the governance layer — the highest semantic-drift risk.
> Recommendation: tiered — the 4 hard-rule files (constitution + 3 model files) translated + independent review per file; the remaining 5 files (project-context, README, 3 checklists) translated as a batch + a sampled review.
> Do not change paths, do not change the validator contract, do not add new abstraction/foundation.

> [!warning] Convention update (2026-06-24, human directive — supersedes per-file `.vi.md` for project-context)
> New human decision: **100% EN is the single source of truth**; VI appears only in README/docs as a learning supplement, **not** as a per-file mirror.
> Applied to Stage 5:
> - Project-context = **EN-only**, do not create per-file `.vi.md` (only add `language: en` frontmatter, no crosslink).
> - VI supplement = `README.vi.md` (root + packages, already present from Stage 2 — keep) + `docs/vi/` onboarding landing (new).
> - Keep the `.vi.md` committed in Stage 2-4 (skills/docs/workflow-refs) — do not delete.
> - Tiered review (Option B) for the 4 hard-rule files is kept — independent semantic-preservation review is mandatory.
> The approach gate was human-approved (human: Hao, Nguyen Huu — repo owner, acting in the `developer` role — 2026-06-24). The validator only accepts role codes in role_signoffs/gate_reviews, so `developer` is recorded; the real human identity is recorded here.

## Step Contract
```yaml
step_goal: "Translate the 9 project-context governance files to EN as the single source of truth (100% EN, no per-file .vi.md), so EN becomes the operative baseline, paths stay unchanged for the validator, and hard-rule semantics are preserved per the Stage 0 glossary. Add the VI onboarding layer (README.vi.md already present + new docs/vi/ landing)."
input_summary:
  - "9 VI source files in project-context/ (no frontmatter, no .vi.md): constitution.md (67), governance-decision-model.md (288), governance-role-model.md (210), governance-exception-register.md (40), project-context.md (77), README.md (61), checklists/default.md (41), checklists/strict.md (39), checklists/regulated.md (38). Total ~861 lines, 605 lines across the 4 hard-rule files."
  - "New convention (human, 2026-06-24): 100% EN single source; VI only in README/docs (README.vi.md + docs/vi/); keep .vi.md committed in Stage 2-4."
  - "Stage 0 glossary: docs/research/governance-glossary-en.md (gitignored, the semantic-preservation contract)."
  - "Validator analysis: validate-workflow-governance.js reads project-context/governance-exception-register.md by PATH (L172); parseRegisterEntries parses by column position (slice(2), drops _none_, reads status/reviewDate as code identifiers) — it does not match header text; governance_ref must start with project-context/ (path prefix). Consequence: changing the content to EN is safe as long as the 8-column table shape, the _none_ sentinel and the status enum stay verbatim."
output_summary:
  - "9 EN-only `<name>.md` files (add language: en frontmatter; NO .vi.md, NO crosslink; body translated per the glossary; identifiers/yaml/enum/path verbatim). The original VI survives only in git history."
  - "docs/vi/ onboarding landing (VI) — new; root + packages README.vi.md already present (keep)."
  - "Validator green; UTF-8/us-ascii; two-tier review (spec compliance -> content quality)."
  - "Independent semantic-preservation sign-off for the 4 hard-rule files."
done_when:
  - "Approach gate human-passed (approach_reviewed_by: Hao, Nguyen Huu — 2026-06-24). DONE."
  - "After implementation: 9 EN files, docs/vi/ landing, validator green, semantic-preservation review pass."
owner: "developer (DEV-led); human keeps the independent review authority for the 4 hard-rule files"
```

## Option Analysis
```yaml
options:
  - id: A
    name: "Translate-all-then-review"
    desc: "Translate all 9 files to EN as a batch, then run one independent semantic review at the end."
    pros: ["Shortest wall-clock", "Simple sequencing"]
    cons: ["Drift in a hard-rule file can be caught late, costing rework", "Hard to isolate a semantic error per file", "Does not treat hard-rule vs prose differently"]
  - id: B
    name: "Tiered: hard-rule per-file independent review, low-risk batch + sampled review"
    desc: "Tier 1 (4 hard-rule files: constitution, governance-decision-model, governance-role-model, governance-exception-register): translate each file + an independent semantic-preservation review per file before moving to the next file. Tier 2 (5 files: project-context, README, 3 checklists): translate as a batch + a sampled review + a structural verify of all."
    pros: ["Hard-rule drift is caught early per file", "Semantic errors can be isolated", "Matches the different risk levels", "Still uses the same glossary and the same cp-VI-then-overwrite-EN pattern — no new abstraction"]
    cons: ["Wall-clock is a bit longer than A because reviews interleave", "Needs a second reviewer for the 4 hard-rule files"]
  - id: C
    name: "Parallel bilingual dual-maintenance (VI operative + EN mirror)"
    desc: "Keep VI operative, with EN only as a parallel mirror, do not flip the baseline."
    pros: ["Does not touch the governance baseline", "Drift risk is low because VI stays the source of truth"]
    cons: ["Contradicts the locked decision: EN must be the active/loaded file for the international community and the EN-first runtime agent", "Runtime skill discovery/validator still loads the base file — if the base stays VI the community release is not EN-first", "Must maintain 2 operative texts long-term = higher drift, not lower"]
recommended_option: B
trade_offs:
  - "Accept a slightly longer wall-clock than A in exchange for catching drift early in the 4 hard-rule files — this trades min-effort for max-semantic-safety, appropriate because EN becomes the operative baseline."
  - "Needs a second reviewer for the 4 hard-rule files (independent) — this is the plan and global policy requirement for touching the baseline; an AI self-review is not considered enough."
  - "Reject C because it contradicts the locked human decision (EN-default); it is not a trade-off, it is a hard constraint."
  - "New convention (2026-06-24): drop the per-file .vi.md mirror for project-context -> EN-only; the VI supplement moves to README.vi.md + docs/vi/. This reduces the dual-maintenance burden and fits '100% EN'."
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: ""
selected_stack: []
selected_runtime: []
decision_notes:
  - "Stage 5 is a content translation of the governance layer; it does not touch the solution class/stack/runtime/deployment model. The Foundation Decision is not opened."
  - "Do not open a new abstraction, layer, service, schema split or config surface. The governance boundary keeps its shape; only the operative text language changes."
  - "approval_gates.foundation = not_applicable (matches the frontmatter)."
```

## Main Artifact
```yaml
recommended_approach: "Tiered EN-only migration (Option B) for the 9 project-context files: (1) Overwrite <name>.md with EN: add the language: en frontmatter (NO crosslink, NO .vi.md) + body translated per the glossary, keeping identifiers/yaml keys/enum/file path/step name/role code verbatim. The original VI survives only in git history. (2) Tier 1 (4 hard-rule files): an independent semantic-preservation review per file (a second reviewer compares EN vs the glossary + vs git-show HEAD:VI) before moving to the next file. (3) Tier 2 (the remaining 5 files): translate as a batch + structural verify + sampled review. (4) Run the validator after each tier. (5) Add the docs/vi/ onboarding landing (VI) as the learning supplement layer; root + packages README.vi.md are already present — keep them."
why:
  - "Smallest correct solution: EN-only single-source reduces dual-maintenance; the glossary is the preservation contract; no new boundary/abstraction is added."
  - "Tiered because the 4 hard-rule files carry the exact wording of the hard rules — a wrong translation = a governance change; per-file independent review is the minimum guard for touching the baseline, not over-engineering."
  - "Validator-safe because only the content changes; path/shape/enum stay unchanged (verified that parseRegisterEntries parses by column position and the governance_ref prefix does not change)."
boundaries:
  - "Do not change the path of any project-context/ file (the validator depends on the project-context/ prefix)."
  - "Do not change the exception register table shape (8 columns, the _none_ sentinel, the status enum PROPOSED|APPROVED|REJECTED|EXPIRED|RESOLVED, review_date) — parseRegisterEntries parses by position."
  - "Do not change yaml keys, frontmatter keys (except adding language: en), enum values, role codes (po/ba/designer/developer/qc/devops), step names (s01-s08), the governance_status enum, the governance_profile enum."
  - "Do not create a per-file .vi.md for project-context (new convention: 100% EN). The VI supplement lives only in README.vi.md + docs/vi/."
  - "Do not flip the authority layer (.claude/CLAUDE.md) in Stage 5 — that is a separate Stage 6, after the Stage 5 sign-off."
  - "Do not self-approve DoD — human-controlled. The approach gate was human-passed."
risk_notes:
  - "Risk #1 (highest): hard-rule semantic drift -> an implicit governance change. Mitigate: glossary lock + independent review of the 4 hard-rule files + compare EN vs git-show HEAD:<file> (original VI)."
  - "Risk #2: lose the original VI from the working tree (only git history remains). Mitigate: commit a VI snapshot before overwriting (VI is already tracked); git-show HEAD recovers it; docs/vi/ summarizes VI for VI readers."
  - "Risk #3: validator breaks because the shape changes. Mitigate: keep the table shape + enum + path; run the validator after each tier."
  - "Risk #4: drift between EN project-context and references in CLAUDE.md/workflow notes (which still point to the path). Mitigate: the path does not change so references still resolve; the EN content syncs in the Stage 6 authority flip."
```

## Architecture Details
```yaml
domain_boundaries:
  - "project-context/ is the project-level governance source-of-truth layer, read by the validator (by path) and referenced by workflow notes via governance_ref."
  - "The 4 hard-rule files are the constitution + 3 model files (decision/role/exception-register) — they carry the hard-rule wording."
  - "The 5 prose/checklist files are project-context.md (the operative governance context) + README + 3 profile checklists."
integration_points:
  - "validate-workflow-governance.js: reads governance-exception-register.md by path (L172), parseRegisterEntries by column position, governance_ref must start with project-context/ (L284)."
  - "validate-workflow-governance.js: STANDARD_GOVERNANCE_REFS / CHECKLIST_BY_PROFILE — a set of path strings, independent of EN/VI content."
  - ".claude/CLAUDE.md + workflow notes reference project-context/* by path — the path does not change."
data_or_runtime_notes:
  - "No runtime/data change. The whole change is text content + adding .vi.md siblings + the language frontmatter."
  - "Exception register table: keep 8 columns, the _none_ sentinel, the status enum; only translate the header prose + the last note cell (the 'no open exception' note -> 'No open project-level exceptions')."
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "project-context/* (9 files) — the content flips VI -> EN operative."
  - "The validator reads by path — no validator code change."
  - "Workflow notes + CLAUDE.md reference by path — still resolve."
compatibility_risks:
  - "Hard-rule semantic drift if a term is translated wrong -> the governance baseline changes implicitly. Highest in constitution GOV-01..GOV-08, decision-model state transition + trigger, role-model authority matrix."
  - "If an enum/path/yaml-key is accidentally changed -> the validator breaks. Mitigate: keep verbatim + verify after each tier."
migration_notes:
  - "Per file: (1) git-show HEAD:<name>.md to keep the original VI as a reference; (2) overwrite <name>.md with EN + language: en frontmatter (no .vi.md, no crosslink); (3) git-show HEAD:<name>.md vs the new file to confirm VI is recoverable + semantics are preserved."
  - "Frontmatter: the active file adds language: en (the current files have no frontmatter and start with an H1). Do not create a .vi.md."
  - "docs/vi/: create docs/vi/README.md (a VI onboarding landing) — not a per-file mirror, only an orientation + pointer to the EN source + the existing VI supplement (README.vi.md, workflow-ref .vi.md, glossary)."
rollback_notes:
  - "Per-file git revert; the original VI is recoverable via git-show HEAD:<name>.md."
  - "If the validator breaks after a tier, revert that tier, keep the prior tier that was green."
```

## Traceability
```yaml
upstream:
  - "community-pack-i18n.s04.acceptance-criteria.md (DoR)"
  - "Plan: ~/.claude/plans/unified-wibbling-moore.md (Stage 5 section)"
  - "Glossary: docs/research/governance-glossary-en.md (semantic contract)"
  - "Stage 4 done: 37 skills EN + 33 .vi.md, validator green, discovery 37/37."
next_step: "s06 Task Plan for Stage 5 (approach gate human-passed 2026-06-24) — split tasks: Tier1 4 hard-rule files (file-by-file + review checkpoint), Tier2 5 files batch + structural verify, Tier3 docs/vi/ landing + verify README.vi.md."
```

## Handoff
- Recommended option: B (Tiered — hard-rule per-file independent review + low-risk batch), EN-only single-source + VI onboarding in README.vi.md/docs/vi/.
- Accepted trade-off: wall-clock a bit longer than A; needs a second reviewer for the 4 hard-rule files.
- Conditions to move to step 6: human passes the `approach` gate — ALREADY PASSED (approach_reviewed_by: Hao, Nguyen Huu — 2026-06-24).
- Deployment note if any: none — Stage 5 is docs/governance content and does not touch runtime/deploy. Stage 6 (authority flip) is what touches `.claude/CLAUDE.md` and is a separate lane.
- Open issue: an independent second reviewer for the 4 hard-rule files — the human (repo-owner) reviews or designates one; after the AI translates Tier 1 it presents the files for review before moving to Tier 2.