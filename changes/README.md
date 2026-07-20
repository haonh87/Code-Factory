# Changes

This directory is the source of truth for the repo's `change layer`.

## Purpose

- package each change in the style `proposal -> design -> tasks -> spec-delta -> archive`
- connect `work-items/` with `BRD/SRS` without replacing them
- be the artifact root for the validator and CI of `Phase 2`

## Standard Structure

```text
changes/
  <change-id>/
    proposal.md
    design.md
    tasks.md
    spec-delta/
      brd.delta.md
      srs.delta.md
    execution/
      task-status.md
    archive-metadata.md
```

## Standard Commands

Scaffold a change package:

```bash
npm run scaffold:change -- --change-id CHANGE-001 --work-item <work-item-slug>
```

Approve a change package materialized by the agent:

```bash
npm run change-item -- approve --change-id CHANGE-001 --reviewed-by <role>
```

Validate the change layer:

```bash
npm run validate:workflow:change -- --workflow-root work-items --project-root .
```

## Sample

- `CHANGE-001` is currently the first canonical sample for phase 2 and is linked to `work-items/sample-sdd-item/`.