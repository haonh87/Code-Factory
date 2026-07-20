# Product Specs

This directory is the source of truth for `BRD/SRS` when a work item runs under `SDD`.

## Structure

```text
product-specs/
  brd/
    <scope>.md
  srs/
    <scope>.md
  cards/
    <scope>.md
  templates/
    brd.template.md
    srs.template.md
    spec-card.template.md
```

## Conventions

- `brd/` holds the rollout-level business truth.
- `srs/` holds the rollout-level requirement truth.
- `cards/` holds the Spec Card — the single source-of-truth for `sdd_mode=light` work items (replaces separate BRD + SRS).
- `work-items/` only holds the execution trace; it does not replace `BRD/SRS` or the Spec Card.
- if a work item has `sdd_mode=strict`, `spec_refs.brd` and `spec_refs.srs` should point to the real artifact in this directory.
- if a work item has `sdd_mode=light`, `spec_refs.card` points to the real Spec Card in `cards/`; the validator checks semantic REQ/AC mapping, provenance (`BASELINE|CR-###`), freeze authority, and no-duplicate-trace.

## Sample

- `brd/sample-sdd-item.md`
- `srs/sample-sdd-item.md`

These two files are the first `SDD` sample so the validator and CI phase 1 have a real artifact to check.