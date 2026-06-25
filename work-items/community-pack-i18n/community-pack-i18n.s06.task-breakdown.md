---
artifact_id: "community-pack-i18n.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "community-pack-i18n"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
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
  approach: []
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
  approach_reviewed_by: []
  approach_reviewed_at: ""
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "community-pack-i18n.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan (Stage 5 — Project-context governance)

> [!summary]
> Task plan for Stage 5: 9 project-context files -> EN-only (100% EN, no .vi.md) + docs/vi/ onboarding landing.
> Tier 1 (4 hard-rule) file-by-file + independent review checkpoint; Tier 2 (5 files) batch; Tier 3 docs/vi/ + verify README.vi.md.

## Step Contract
```yaml
step_goal: "Implement Stage 5 per the approved s05: 9 project-context files EN-only + docs/vi/ landing, validator green, semantic-preservation review of the 4 hard-rule files."
input_summary:
  - "s05 approved (approach_reviewed_by: Hao, Nguyen Huu — 2026-06-24)."
  - "New convention: 100% EN, no per project-context .vi.md, VI lives in README.vi.md + docs/vi/."
  - "The Stage 0 glossary is the preservation contract."
output_summary:
  - "9 project-context files EN-only (language: en, no crosslink)."
  - "docs/vi/README.md onboarding landing (VI)."
  - "Validator green; two-tier review; 4 hard-rule independent sign-off."
done_when:
  - "9 EN files + docs/vi/ landing; validator green; human review of the 4 hard-rule files passes."
owner: "developer (DEV-led); human = independent reviewer for the 4 hard-rule files"
```

## Main Artifact
```yaml
tasks:
  - id: T1
    owner_role: developer
    name: "Tier 1 — constitution.md EN"
    objective: "Translate constitution.md (67 lines, GOV-01..GOV-08 + waiver rule) to EN-only, keeping the GOV-xx identifiers and path refs verbatim."
    paths_in_scope: ["project-context/constitution.md"]
    dependencies: []
    outputs_expected: ["project-context/constitution.md EN with language: en frontmatter, no .vi.md"]
    review_checkpoint: "independent semantic-preservation review (human) before moving to T2"
    verification_hint: "git-show HEAD:constitution.md vs EN; glossary alignment; non-ascii=0"
  - id: T2
    owner_role: developer
    name: "Tier 1 — governance-decision-model.md EN"
    objective: "Translate the decision-model (288 lines: precedence, profile rule, state model, transition, trigger, gate rule, step mapping) to EN-only, keeping enum/profile/step-name verbatim."
    paths_in_scope: ["project-context/governance-decision-model.md"]
    dependencies: ["T1"]
    outputs_expected: ["EN decision-model, language: en, enum verbatim"]
    review_checkpoint: "independent review (human) before T3"
    verification_hint: "enum CHECKS_PENDING/ALIGNED/... verbatim; state transition list verbatim; non-ascii=0"
  - id: T3
    owner_role: developer
    name: "Tier 1 — governance-role-model.md EN"
    objective: "Translate the role-model (210 lines: role authority, decision matrix, exception authority matrix, regulated/release rules, step mapping) to EN-only, keeping the role code po/ba/.../devops verbatim."
    paths_in_scope: ["project-context/governance-role-model.md"]
    dependencies: ["T2"]
    outputs_expected: ["EN role-model, language: en, role code verbatim"]
    review_checkpoint: "independent review (human) before T4"
    verification_hint: "role code + matrix cell shape verbatim; non-ascii=0"
  - id: T4
    owner_role: developer
    name: "Tier 1 — governance-exception-register.md EN"
    objective: "Translate the exception-register (40 lines) to EN-only, KEEPING the 8-column table shape + the _none_ sentinel + the status enum + the YAML template verbatim (the validator parses by position)."
    paths_in_scope: ["project-context/governance-exception-register.md"]
    dependencies: ["T3"]
    outputs_expected: ["EN register, the 8-column shape unchanged, the _none_ row kept, the status enum verbatim"]
    review_checkpoint: "independent review (human) + validator green before Tier 2"
    verification_hint: "parseRegisterEntries still parses (run the validator); 8 columns, _none_, enum verbatim"
  - id: T5
    owner_role: developer
    name: "Tier 2 — project-context.md + README.md EN batch"
    objective: "Translate project-context.md (77) + README.md (61) to EN-only."
    paths_in_scope: ["project-context/project-context.md", "project-context/README.md"]
    dependencies: ["T4"]
    outputs_expected: ["2 EN files, language: en"]
    review_checkpoint: "structural verify + sampled review"
    verification_hint: "path ref verbatim; non-ascii=0"
  - id: T6
    owner_role: developer
    name: "Tier 2 — 3 checklist profiles EN batch"
    objective: "Translate checklists/default.md, strict.md, regulated.md to EN-only."
    paths_in_scope: ["project-context/checklists/default.md", "project-context/checklists/strict.md", "project-context/checklists/regulated.md"]
    dependencies: ["T5"]
    outputs_expected: ["3 EN files, language: en"]
    review_checkpoint: "structural verify + sampled review"
    verification_hint: "checklist item shape verbatim; non-ascii=0"
  - id: T7
    owner_role: developer
    name: "Tier 3 — docs/vi/ onboarding landing + verify README.vi.md"
    objective: "Create docs/vi/README.md (a VI onboarding landing: what the repo is, the 8-step workflow, governance, a pointer to the EN source + the existing VI supplement). Verify the root + packages README.vi.md are still present (Stage 2)."
    paths_in_scope: ["docs/vi/README.md"]
    dependencies: ["T6"]
    outputs_expected: ["docs/vi/README.md VI landing; README.vi.md (root+packages) confirmed present"]
    review_checkpoint: "structural verify"
    verification_hint: "links resolve; non-ascii OK (VI); no broken ref"
dependencies:
  - "T1->T2->T3->T4 (Tier 1 sequential because the review is per-file)"
  - "T4->T5->T6 (Tier 2 batch)"
  - "T6->T7 (Tier 3)"
handoff_points:
  - "After T4: human independent review of the 4 hard-rule files (gate) -> approve to Tier 2."
  - "After T7: s08 verify (validator green + two-tier review sample + DoD)."
```

## Verification Plan
- Mandatory check:
  - `npm run validate:workflow -- --workflow-root work-items` green after T4 and after T7.
  - Each EN file: non-ascii=0 (except docs/vi/ which is VI), `language: en` frontmatter, no crosslink, identifiers/enum/path verbatim.
  - Exception register: 8-column shape + `_none_` + status enum verbatim (parseRegisterEntries still parses).
  - `git-show HEAD:<file>` original VI recoverable; compare the hard-rule semantics vs the glossary.
- Risk note: hard-rule semantic drift (highest) -> independent review of the 4 files; validator break -> keep shape/enum/path.
- Rollout note if any: none — docs/governance content, no runtime.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "9 EN-only files, language: en, no .vi.md per project-context"
  - "4 hard-rule independent semantic-preservation review (human)"
  - "validator green; exception register shape verbatim"
  - "docs/vi/ landing created; README.vi.md (root+packages) still present"
blocking_items:
  - "No human independent review of the 4 hard-rule files yet -> Tier 2 blocked until it passes"
owner: "developer; human = reviewer of the 4 hard-rule files"
next_action: "Implement T1-T4 (Tier 1), present for human review, then T5-T7."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "validator green after each tier (no naming/governance regression)."
  - "skill discovery 37/37 unchanged (Stage 5 does not touch skills/)."
compatibility_checkpoints:
  - "the governance_ref prefix project-context/ does not change -> workflow notes still resolve."
  - "parseRegisterEntries parses the register by position -> if the shape is kept it is OK."
migration_or_backfill_steps:
  - "Overwrite 9 files VI -> EN; the original VI is recoverable via git-show HEAD."
  - "Create the new docs/vi/README.md."
rollback_or_restore_steps:
  - "Per-file git revert; the original VI is recoverable."
  - "Revert a tier if the validator breaks."
```

## Traceability
```yaml
upstream: ["community-pack-i18n.s05.technical-approach.md (approved 2026-06-24)"]
next_step: "s07 Implement Tier 1 (T1-T4) -> human review -> Tier 2 (T5-T6) -> Tier 3 (T7) -> s08 Verify + DoD."
```

## Handoff
- Tasks to do first: T1-T4 (Tier 1, 4 hard-rule files EN).
- Blocking dependencies: human independent review of the 4 hard-rule files after T4 (gate to Tier 2).
- Conditions to move to step 7: s05 approved; s06 task plan proposed (human reviews the task plan + Tier 1 in the same pass).