---
language: en
---

# Governance Checklist Profile: `strict`

This profile inherits all of `default` and adds stricter checks.

## When To Use

- change touches many boundaries or many owners
- migration, data compatibility, external integration
- significant packaging/runtime/release impact
- high rollback cost or hard to fix hot

## Additional Checks Over `default`

### Acceptance + DoR

- reviewer coverage has been specified per main boundary
- backward compatibility or migration assumptions have been recorded
- release impact and rollback expectations have been identified before implementation

### Technical Approach

- the trade-off states why the chosen approach is still acceptable per `governance`
- if there is a deviation, the `governance-exception` has an owner and mitigation before the step closes

### Task Plan

- the plan has dedicated tasks for migration, compatibility verify or rollout when scope requires it
- review tasks are not implicitly merged into the build task when the boundary is large enough to split

### Verify + DoD

- evidence is enough for the release decision, not only for local correctness
- a rollback path or remediation path is stated if release risk is still open
- an open exception has a clear status and a clear owner

## How To Materialize

- `checklist_name`: `strict`
- `checklist_refs`: point to this file, and may also keep `default.md` if you want to trace the inherited profile clearly