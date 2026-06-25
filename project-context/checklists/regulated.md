---
language: en
---

# Governance Checklist Profile: `regulated`

This profile inherits all of `strict` and adds checks for scope that needs audit or tight approval.

## When To Use

- a clearer audit trail than usual is needed
- a clear approval chain or waiver approval is needed
- evidence, decision logs or exceptions must be kept across many steps
- there are policy/compliance/control rules outside the usual delivery lane

## Additional Checks Over `strict`

### Clarify And Open Questions

- the source of the rule or policy outside the repo has been stated clearly in evidence or a reference
- the approving owner or review authority has been identified

### Acceptance + DoR

- acceptance, review scope and evidence expectations are described well enough to audit
- important assumptions do not live only in a chat log

### Technical Approach And Implement

- every deviation has a clear `governance-exception` or `waiver` ID
- an exception is not considered approved if `approved_by` or `review_date` is missing

### Verify + DoD

- evidence is enough to audit the main decisions
- release or business acceptance must state residual risk and any open waiver
- the exception register has been updated before step 8 closes

## How To Materialize

- `checklist_name`: `regulated`
- `checklist_refs`: point to this file; you may add the work item's specialized checklist if needed