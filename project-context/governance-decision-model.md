---
language: en
---

# Governance Decision Model

This document defines how decisions are made for the `governance layer`.

Goals:

- unify how `governance_profile` is chosen
- unify how `governance_status` is updated
- unify when a `governance-exception` must be opened
- reduce the situation where each agent or role interprets governance in its own way

## Decision Principles

- Every work item must have a `governance_profile`; it must not be left empty.
- `governance_status` must reflect the real state of the current step, not be used as decoration.
- If a deviation is found but you still want to proceed, a `governance-exception` or `waiver` must be recorded; it must not only be written in prose.
- When there are mixed signals, prefer the stricter profile and state:
  - `regulated` takes precedence over `strict`
  - `strict` takes precedence over `default`
  - `BLOCKED` takes precedence over `CHECKS_PENDING`
  - `EXCEPTION_RECORDED` or `WAIVER_APPROVED` takes precedence over `ALIGNED`

## Decision Order

When materializing or updating a workflow note, use the following order:

1. Determine `governance_ref`
2. Choose `governance_profile`
3. Attach `checklist_refs`
4. Assess `governance_status`
5. If there is a deviation, create a `governance-exception`
6. If the exception stays open and meets the audit condition, also update the register

## Rule For `governance_ref`

- Default:
  - `project-context/project-context.md`
- Only point directly at `constitution.md` when the step needs to emphasize foundational principles over operational context.
- With `custom`, you may point to a work item's own governance note, but it must still trace back to at least one source inside `project-context/`.

## Rule For Choosing `governance_profile`

### Precedence

Choose in this order:

1. `custom`
2. `regulated`
3. `strict`
4. `default`

### When To Use `default`

Use `default` when all of the following conditions hold at the same time:

- scope is small or medium
- no significant migration, compatibility or rollback risk
- no significant packaging/runtime/release impact
- no special approval chain or audit trail needed
- no complex external integration or data impact

### When To Use `strict`

Use `strict` if at least one of the following signals is present and `regulated` is not yet needed:

- the change touches many boundaries or many role sign-offs
- there is migration, compatibility risk or rollback risk
- there is packaging/runtime/release impact
- there is external integration or stateful data impact
- reviewer coverage tighter than usual is needed
- the technical approach has trade-offs that make verify or rollout harder than usual

### When To Use `regulated`

Use `regulated` if at least one of the following signals is present:

- a clear audit trail is needed
- a tight approval chain or waiver approval is needed
- exceptions, evidence or decision logs must be kept across many steps
- there are policy/compliance/control rules outside the usual delivery lane
- an exception touches both `release` and `business_acceptance`

### When To Use `custom`

Use `custom` when:

- the project or work item has its own governance note
- a specialized checklist outside `default|strict|regulated` is needed

Rules for `custom`:

- it must state which base profile it inherits from
- `custom` must not be used to loosely weaken rules
- it must still have clear `checklist_refs`

## Rule For Attaching `checklist_refs`

- `default`:
  - at minimum point to `project-context/checklists/default.md`
- `strict`:
  - at minimum point to `project-context/checklists/strict.md`
- `regulated`:
  - at minimum point to `project-context/checklists/regulated.md`
- `custom`:
  - must point to at least one base checklist and one custom ref if present

Notes:

- `strict.md` is understood to inherit `default`
- `regulated.md` is understood to inherit `strict` and `default`
- repeating the base profile ref is not required if the team does not need explicit file-level tracing

## State Model For `governance_status`

Standard enum:

- `CHECKS_PENDING`
- `ALIGNED`
- `EXCEPTION_RECORDED`
- `WAIVER_APPROVED`
- `BLOCKED`
- `NOT_APPLICABLE`

### Meaning Of Each State

#### `CHECKS_PENDING`

Use when:

- governance context or checklist has not been fully evaluated
- the step just opened and there is not enough information to conclude aligned or blocked

This state should not be kept for long after the main gates.

#### `ALIGNED`

Use when:

- the applicable rules have been checked
- the needed checklists have passed or been justified
- there is no open exception for that step

#### `EXCEPTION_RECORDED`

Use when:

- a deviation has been recorded
- the exception has not yet been approved by the right authority
- or the exception is recorded but mitigation is still open

#### `WAIVER_APPROVED`

Use when:

- the exception has been approved by the right authority
- the step is still operating under waiver conditions or an accepted deviation

If mitigation is done and no deviation is open, it may move back to `ALIGNED`.

#### `BLOCKED`

Use when:

- a suitable authority is missing
- required evidence or checklist is missing and cannot be justified
- a governance blocker prevents the step from transitioning or closing the gate

#### `NOT_APPLICABLE`

Only use when governance genuinely produces no meaningful decision, gate or evidence for the current step.

In ordinary product workflows, this state should be rare.

## Standard State Transition

### Main Flow

- `CHECKS_PENDING -> ALIGNED`
  when checks are complete and no exception is open
- `CHECKS_PENDING -> EXCEPTION_RECORDED`
  when a deviation is found and needs to be recorded
- `CHECKS_PENDING -> BLOCKED`
  when context, checklist or authority is missing and the step cannot proceed
- `ALIGNED -> EXCEPTION_RECORDED`
  when a deviation is found after the step was previously aligned
- `EXCEPTION_RECORDED -> WAIVER_APPROVED`
  when the right authority has approved
- `EXCEPTION_RECORDED -> BLOCKED`
  when the exception touches a gate but there is no approval or enough mitigation yet
- `WAIVER_APPROVED -> ALIGNED`
  when mitigation is complete and no accepted deviation is open
- `BLOCKED -> CHECKS_PENDING`
  when the blocker is removed but checks need to run again

### Forbidden Transitions

- do not jump directly `CHECKS_PENDING -> WAIVER_APPROVED`
- do not use `ALIGNED` when an exception is still open but not resolved or approved
- do not use `NOT_APPLICABLE` to dodge governance evaluation

## Rule By Gate

### Before Passing `s04 Acceptance + DoR`

The `governance_status` of the current step should not still be `CHECKS_PENDING` if:

- acceptance has been locked
- the work item is about to move to approach or task planning

When exiting `s04`, the accepted states are usually:

- `ALIGNED`
- `WAIVER_APPROVED`
- `BLOCKED`

### Before Passing `s06 Task Plan`

If the task plan does not yet cover review, verify, release or the needed mitigation, use:

- `CHECKS_PENDING` if still being completed within the step
- `BLOCKED` if the step cannot proceed

### When Closing `s08 Verify + DoD`

If the work item is considered done:

- prefer `ALIGNED`
- or `WAIVER_APPROVED` if an accepted deviation is still in effect

If done cannot be concluded due to a governance gap:

- use `BLOCKED`

## Triggers That Mandate Opening A `governance-exception`

A `governance-exception` must be created when any of the following holds:

- intentionally deviating from `constitution`, `project-context` or a checklist profile
- accepting a trade-off that weakens the usual guard to proceed
- wanting to proceed even though standard review or evidence is not enough
- behavior, approach or release path goes outside the locked baseline
- mitigation is deferred to a later step but the current step still wants to close

## When A `governance-exception` Is Not Yet Needed

An exception is not yet needed if:

- it is only an open question or a policy gap with no decision yet
- it is a blocker being handled and there is no decision to accept a deviation
- the deviation was fully fixed within the same step before affecting a gate or handoff

In these cases, prefer:

- `governance blocker`
- `open question`
- `CHECKS_PENDING` or `BLOCKED`

## When The Exception Register Must Be Updated

You must add to `governance-exception-register.md` if:

- the exception stays open for more than one step
- the exception touches `release`
- the exception touches `business_acceptance`
- `governance_profile=regulated`
- the approval or mitigation history needs to be audited

## Quick Mapping By Step

| Step | Minimum governance decision |
|---|---|
| `s01 Clarify` | choose `governance_ref`, a preliminary profile, status usually `CHECKS_PENDING` or `ALIGNED` |
| `s02 Business Goal` | confirm whether the goal raises the profile to a higher level |
| `s03 Open Questions` | if there is a blocker, move to `BLOCKED`; if only clarifying, keep `CHECKS_PENDING` |
| `s04 Acceptance + DoR` | must lock profile, checklist and should not leave the gate in a vague state |
| `s05 Technical Approach` | if a deviation is needed, open the `governance-exception` right here |
| `s06 Task Plan` | ensure the plan covers checks, mitigation and reviewer coverage |
| `s07 Implement` | if a new deviation arises, update the exception and status within the step |
| `s08 Verify + DoD` | conclude `ALIGNED`, `WAIVER_APPROVED` or `BLOCKED` transparently |

## Rule For The Validator Later

This decision model is the source the validator checks at least the following:

- the workflow note must not be missing `governance_profile`
- `checklist_refs` must match the chosen profile
- `governance_status` must not be in a state forbidden for the current gate
- if there is a `governance-exception`, the authority and register must match the rules