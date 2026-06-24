---
language: en
---

# Governance Pack

This directory is the source of truth for the `governance layer` at the project level.

## Components

- `constitution.md`: the foundational principles that must be respected in the workflow.
- `project-context.md`: the repo's context currently in effect, the default profile, the checklist selection rules and the forbidden shortcuts.
- `governance-role-model.md`: the authority model for roles, sign-offs, exceptions and waivers.
- `governance-decision-model.md`: the rules for choosing a profile, status transitions, exception triggers and the rule to update the register.
- `checklists/default.md`: the default checklist for most work items.
- `checklists/strict.md`: the strengthened checklist for changes with more risk or more boundaries.
- `checklists/regulated.md`: the further strengthened checklist for scope that needs audit, approval or tight compliance.
- `governance-exception-register.md`: the register tracking open `governance-exception` or `waiver` and the handling history.

## How To Use In The Workflow

- `governance_ref`:
  by default points to `project-context/project-context.md`.
- `governance_profile`:
  use one of `default|strict|regulated|custom`.
- `checklist_refs`:
  point to one or more checklists in `project-context/checklists/`.
- `governance_status`:
  assess per `governance-decision-model.md`, do not set it by feeling.
- approval authority:
  look it up in `governance-role-model.md`, do not infer it only from `role_signoffs`.
- `governance-exception`:
  must appear in the related step note, and at the same time be recorded in `governance-exception-register.md` if the exception stays open or needs audit across steps.

## Choosing A Profile

| Profile | When to use |
|---|---|
| `default` | ordinary feature or bug, medium scope, no significant migration/runtime/release risk |
| `strict` | change touches many boundaries, migration, release path, external integration, data change or rollback risk |
| `regulated` | scope needs audit trail, approval chain, evidence retention or tighter compliance/control than usual |
| `custom` | when the project or work item has its own rules; still inherit at least one base profile |

## Minimum Conventions

- Do not create a separate governance workflow.
- Do not use a checklist profile as the source of truth in place of the step note.
- Do not close `DoR`, `DoD`, `release` or `business_acceptance` if a governance requirement is still open without a clear owner or waiver.

## Validator

- Standard command:
  `npm run validate:workflow -- --workflow-root work-items --project-root <repo-root>`
- The governance validator now also enforces:
  - minimum authority for `approved_by`
  - gate/state rules for `governance_status` at `s04` and `s08` once a note passes `draft`
  - minimum consistency between the note and `governance-exception-register.md`
- Run the fixture suite:
  `npm run validate:workflow:fixtures`
- Canonical fixture suite for the governance validator:
  `packages/workflow-bundle/tests/fixtures/workflow-governance/README.md`

Notes:

- `work-items/` is the canonical artifact root for the repo's real workflow artifacts.