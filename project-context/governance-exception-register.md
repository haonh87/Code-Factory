---
language: en
---

# Governance Exception Register

This register is used to track `governance-exception` or `waiver` still open, or that needs audit across many steps.

## When An Entry Must Be Added To The Register

- the exception stays open past the step being handled
- the exception affects `DoD`, `release` or `business_acceptance`
- the exception must be tracked across many steps or many roles
- the work item runs profile `regulated`

## Minimum Process

1. Record the `governance-exception` in the related step note.
2. Add a row to this register.
3. Determine `approved_by` per `governance-role-model.md`.
4. Update the status when mitigation is complete, the waiver is approved or the exception is closed.

## Quick Template

```yaml
exception_id: GOV-EX-001
work_item_ref: ""
step_ref: ""
principle_ref: ""
reason: ""
impact: ""
mitigation: []
owner: ""
approved_by: ""
status: PROPOSED|APPROVED|REJECTED|EXPIRED|RESOLVED
review_date: ""
notes: ""
```

## Register

| Exception ID | Work Item | Step | Principle | Owner | Status | Review Date | Notes |
|---|---|---|---|---|---|---|---|
| _none_ |  |  |  |  |  |  | No open project-level exceptions |