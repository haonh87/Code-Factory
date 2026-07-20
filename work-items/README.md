# Work Items

This directory is the `canonical artifact root` for the repo's real workflow artifacts.

## Purpose

- hold work items that have been materialized into workflow notes
- be the standard target for `scaffold`, `validate` and CI phase 2
- keep the execution trace along the `s01 -> s08` backbone

## Standard Structure

```text
work-items/
  <work_item_slug>/
    <work_item_slug>.s01.restate.md
    <work_item_slug>.s02.business-goal.md
    <work_item_slug>.s03.open-questions.md
    <work_item_slug>.s04.acceptance-criteria.md
    <work_item_slug>.s05.technical-approach.md
    <work_item_slug>.s06.task-breakdown.md
    <work_item_slug>.s07.implementation.md
    <work_item_slug>.s08.verification.md
```

## Conventions

- the sub-directory name must be exactly the `work_item_slug`
- every note in the same directory must use the same `work_item_slug`
- a step file must follow the standard naming `<work_item_slug>.sNN.<step-slug>.md`
- do not use this directory for loose notes that do not belong to the workflow backbone
- `sample-workflow-item/` is currently the first canonical sample so CI phase 2 has a real artifact to validate
- `sample-sdd-item/` is the canonical sample for `SDD phase 1`, pointing to `product-specs/brd/sample-sdd-item.md` and `product-specs/srs/sample-sdd-item.md`
- `sample-sdd-item/` is also linked to `changes/CHANGE-001/` to be the first canonical sample for `Phase 2: Change Layer`
- `sample-execution-item/` is the canonical sample for `Phase 3: Execution Layer`, illustrating `multi_agent`, runtime artifacts and `review_mode=independent`
- `sample-quick-item/` is the canonical sample for `planning_track=quick`
- `sample-enterprise-item/` is the canonical sample for `planning_track=enterprise`

## Standard Commands

Scaffold the whole workflow:

```bash
npm run scaffold:workflow -- --work-item <work-item-slug>
```

Validate the whole artifact root:

```bash
npm run validate:workflow -- --workflow-root work-items --project-root .
```

Validate the SDD part only:

```bash
npm run validate:workflow:sdd -- --workflow-root work-items --project-root .
```

Validate the change layer only:

```bash
npm run validate:workflow:change -- --workflow-root work-items --project-root .
```

Validate the execution layer only:

```bash
npm run validate:workflow:execution -- --workflow-root work-items
```

Validate the adaptive planning part only:

```bash
npm run validate:workflow:planning -- --workflow-root work-items
```