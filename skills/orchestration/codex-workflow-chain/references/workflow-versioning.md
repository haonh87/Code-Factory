---
language: en
---

# Workflow Versioning

> Vietnamese: workflow-versioning.vi.md

This document pins the boundary between the public baseline `v1.0.0` and the extensions that follow it.

Cross-reference date: `2026-04-14`.

## Bottom Line

- `v1.0.0` = manual scaffold backbone + validator lanes + built-in execution support
- post-`v1.0.0` extensions = `Work Item Materialization`, `Work Item Protocol`, and work-item-level lifecycle/approval

## Public Baseline `v1.0.0`

This is the first public release and the default story when onboarding new users.

### Includes

- the `s01 -> s08` workflow backbone
- `work-items/` as the canonical artifact root
- workflow scaffolding by a `work_item_slug` locked by a human or coordinator
- change package scaffolding by a `change_id` locked by a human or coordinator
- the governance layer
- the `SDD` layer
- the change layer
- execution support via `agentic|multi_agent`
- adaptive planning via `quick|full|enterprise`
- validators for naming, governance, `SDD`, change, execution, and planning
- authoring smoke for the `scaffold -> validate` flow

### Does Not Include

- `Work Item Materialization`
- `Work Item Protocol`
- auto-deriving `work_item_slug` from a raw request
- approval gates at the work-item level
- lifecycle commands such as `work-item approve|activate|close`

### Important

- execution support is in scope for `v1.0.0`
- execution support does not mean every work item must turn on `agentic` or `multi_agent`
- the default baseline is still the manual scaffold flow

### Recommended Command Surface

```bash
wfc init
wfc scaffold --work-item <work-item-slug>
wfc scaffold-change --change-id <CHANGE-ID> --work-item <work-item-slug>
wfc
wfc sdd
wfc change
wfc exec
wfc plan
```

### How It Operates

- a human receives the raw request
- a human or coordinator locks the `work_item_slug`
- if a change package is needed, scaffold the change first
- scaffold the workflow
- fill in the `s01 -> s08` content
- run the validator matching the active layer

## Extensions After `v1.0.0`

The following layers are not part of the public baseline.

- `Work Item Materialization`
- `Work Item Protocol`
- approval gates and lifecycle commands at the work-item level

### Purpose

- reduce manual steps before `scaffold`
- let the agent propose or create a work item in a controlled way
- increase auditability at the work-item lifecycle level

### Extended Command Surface

```bash
wfc materialize --request "<raw-request>"
wfc materialize --request "<raw-request>" --auto-scaffold
wfc work-item status --work-item <work-item-slug>
wfc work-item approve --work-item <work-item-slug> --reviewed-by <role>
wfc work-item activate --work-item <work-item-slug>
wfc protocol
```

## Repo State

The current repo may contain both the `v1.0.0` baseline and the code/docs of the extensions that follow.

That does not mean:

- every team must use the extensions immediately
- onboarding should start from the extensions
- `agentic` is considered post-`v1.0.0`

## Communication Rules

When writing docs, quickstarts, or help text:

- if you mention `v1.0.0`, default to the manual `scaffold -> validate` flow
- you may mention `agentic|multi_agent` as execution support within the baseline
- if you mention `materialize`, the `work-item protocol`, or the approval lifecycle, you must state clearly that these are extensions after `v1.0.0`

## Vocabulary Rules

- use `scaffold` for generating a note or package
- use `implemented` or `available` for a capability already present in the repo
- use `materialize` only for the `Work Item Materialization` extension