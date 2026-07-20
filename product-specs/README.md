# Product Specs

This directory is the source of truth for `BRD/SRS` when a work item runs under `SDD`.

## Structure

```text
product-specs/
  brd/
    <scope>.md
  srs/
    <scope>.md
  templates/
    brd.template.md
    srs.template.md
```

## Conventions

- `brd/` holds the rollout-level business truth.
- `srs/` holds the rollout-level requirement truth.
- `work-items/` only holds the execution trace; it does not replace `BRD/SRS`.
- if a work item has `sdd_mode=light|strict`, `spec_refs.brd` and `spec_refs.srs` should point to the real artifact in this directory.

## Sample

- `brd/sample-sdd-item.md`
- `srs/sample-sdd-item.md`

These two files are the first `SDD` sample so the validator and CI phase 1 have a real artifact to check.