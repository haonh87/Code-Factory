---
language: en
---

# Governance Checklist Profile: `default`

This is the default checklist for most work items.

## When To Use

- ordinary bug, feature or change
- scope has no special audit requirement
- no migration or release risk that is too large

## Suggested Checklist

### Clarify And Open Questions

- intent, scope boundary and non-goals are clear enough
- `governance context` has been recorded in the step note when a related rule exists
- any remaining blocker or `governance blocker` has an owner or a resolution path

### Acceptance + DoR

- acceptance criteria are measurable and verifiable
- the needed role sign-offs have been identified
- requirements or foundational rules have been reflected into `SRS` or the workflow note when needed

### Task Plan

- the task plan covers build, verify and docs for the scope that is genuinely needed
- if scope touches release or rollout, there is at least a minimal task for packaging/runtime/release checks
- if a deviation seems possible, the way to record a `governance-exception` has been determined in advance

### Verify + DoD

- pass/not-pass evidence has been recorded clearly
- related docs/spec have been synced if behavior changed
- remaining gaps have an owner and a next action

## How To Materialize

- `checklist_name`: `default`
- `checklist_refs`: point to this file
- only copy the checks that actually apply into the step's `## Governance Checks` block