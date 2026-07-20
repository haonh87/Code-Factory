---
language: en
---

# Governance Role Model

This document defines the role model for the `governance layer` of the workflow.

Goals:

- make clear which role owns which kind of governance decision
- separate `step sign-off` from `waiver authority`
- avoid approving a `governance-exception` by feeling

## Principles

- `role_signoffs` of a workflow note do not automatically mean the right to approve a `waiver`.
- The role that discovers an exception is responsible for recording it, but does not always have the right to approve it.
- An exception affecting `release`, `business_acceptance` or `regulated` scope should not be approved by a single role alone.
- If the suitable authority is not present in the work item, the step must be in `BLOCKED` state or keep the exception at `PROPOSED`.

State transitions, triggers for opening an exception and rules for choosing a profile do not live in this file; use `governance-decision-model.md`.

## Core Governance Roles

### `po`

Authority scope:

- business scope
- non-goals
- stakeholder trade-offs
- business acceptance risk

Allowed to:

- confirm escalation when `governance_profile` rises because of business/scope/cost impact
- approve an exception or waiver that is essentially a business or product trade-off
- block `business_acceptance` when residual risk is not acceptable

Should not decide alone:

- a purely architectural technical exception
- a purely operational release/runtime exception

### `ba`

Authority scope:

- requirement clarity
- policy gaps
- traceability between context, `BRD`, `SRS` and the workflow note

Allowed to:

- propose `governance_profile`
- flag a `governance blocker`
- lock the completeness of `governance context` on the requirement/business-rule side

Should not decide alone:

- final waiver approval when the exception has significant business, technical or release impact

### `designer`

Authority scope:

- UX rules
- accessibility baseline
- interaction/visual constraints

Allowed to:

- request raising governance when scope touches accessibility or an important UX outcome
- approve a minor UX exception if it does not change business intent and creates no release risk

Should not decide alone:

- a waiver with release, data, security or business-acceptance impact

### `developer`

Authority scope:

- technical approach
- main code path
- architecture boundary
- migration/data compatibility at the implementation level

Allowed to:

- lock `approach`
- propose and, in some cases, approve a technical exception
- request raising `governance_profile` when complexity or compatibility risk is found

Should not decide alone:

- a waiver directly affecting `release`
- a waiver with significant business trade-off
- a `regulated` waiver without an independent reviewer

### `qc`

Authority scope:

- verify evidence
- checklist completeness
- DoD readiness
- release recommendation from a verification perspective

Allowed to:

- block `DoD` when evidence or checklist is not enough
- request keeping an exception open if mitigation has not been verified
- request increased reviewer coverage

Should not decide alone:

- approve a business trade-off
- approve a technical direction when there is no technical owner

### `devops`

Authority scope:

- runtime deploy
- release gate
- rollback path
- promotion control

Allowed to:

- approve a runtime/release waiver or exception when scope is inside the DevOps lane
- block `release` when rollout/rollback/evidence is not enough
- request raising `governance_profile` when scope has packaging/runtime/promotion risk

Should not decide alone:

- a business waiver
- a requirement/policy waiver without `po` or `ba`

## Governance Decision Matrix

| Decision | Primary owner | Minimum reviewer or co-approver | Notes |
|---|---|---|---|
| record initial `governance context` | `ba` | `po`; `designer`/`developer`/`devops` when there is a corresponding boundary | usually occurs at `s01-s03` |
| choose initial `governance_profile` | `ba` proposes | `po`; `developer` or `devops` if there is technical/release risk | profile should not be left empty |
| raise profile from `default` to `strict` | the role finding the risk, usually `developer` or `devops` | `ba`; `po` if scope/time/cost is affected | escalation is preferred over de-escalation |
| raise profile to `regulated` | `po` or the role finding the audit/compliance need | `ba` + the relevant domain role | clear authority is needed before continuing |
| lock `governance checks` for `DoR` | `ba`, `qc` | `po`; `designer`/`developer` for specific rules | usually at `s04` |
| lock `governance checks` for `Task Plan` | `developer` | `qc`, `devops` when there is verify/release impact | usually at `s06` |
| lock `governance compliance` at verify | `qc` | `devops` when scope touches release; `po` if business risk is still open | usually at `s08` |
| propose `governance-exception` | the role finding the deviation | the domain owner of the related area | found wherever, recorded in that step |
| approve `waiver` business | `po` | `ba` | applies to scope, KPI, non-goals, business trade-off |
| approve `waiver` UX/accessibility | `designer` | `qc`; `po` if it affects business intent | not for release/runtime risk |
| approve `waiver` technical/architecture | `developer` | `qc`; `po` if it affects scope/business | not enough if the exception touches release |
| approve `waiver` runtime/release | `devops` | `qc`; `developer` if there is code/migration impact | applies to rollout, rollback, promotion, runtime control |

## Authority Matrix By Exception Type

| Exception type | Usual proposer | Main approver | Required reviewer | When further escalation is needed |
|---|---|---|---|---|
| business scope or non-goal | `po`, `ba` | `po` | `ba` | when it brings large technical/release risk |
| requirement clarity or policy gap | `ba` | `po` | `ba` | when the gap blocks `DoR` or affects many roles |
| UX/accessibility | `designer` | `designer` | `qc` | when it affects KPI, compliance or release |
| technical approach or architecture | `developer` | `developer` | `qc` | when it affects `release`, `business_acceptance` or `regulated` |
| data change, migration, compatibility | `developer` | `developer` | `qc`; `devops` if rollout impact | when rollback is hard or promotion is risky |
| runtime deploy or release control | `devops` | `devops` | `qc`; `developer` if the code path is involved | when business risk is open or profile is `regulated` |
| cross-cutting many domains | the role finding it first | the domain owner with the largest impact | at least 2 roles including `qc` and one other domain owner | always needed if it touches `regulated`, `release` or `business_acceptance` |

## Additional Rule For `regulated`

When `governance_profile=regulated`:

- no role may be the sole approver of its own exception
- at least 2 roles must participate in approval:
  - 1 domain owner
  - 1 independent reviewer such as `qc`, or `po` if the risk is on the business side
- an open exception must be recorded in `governance-exception-register.md`

## Additional Rule For `release` And `business_acceptance`

- An exception affecting `release` is not considered closed without `devops` or `qc`.
- An exception affecting `business_acceptance` is not considered closed without `po`.
- If the same exception touches both `release` and `business_acceptance`, at least:
  - `po`
  - `qc`
  - `devops` or `developer` depending on the main risk domain

## Quick Mapping By Step

| Step | Default governance owner | What to lock |
|---|---|---|
| `s01 Clarify` | `ba`, `po` | `governance context`, foundational rules, proposed profile |
| `s02 Business Goal` | `po` | alignment with business scope, non-goals, trade-off |
| `s03 Open Questions` | `ba` | `governance blocker`, policy gap, owner resolution |
| `s04 Acceptance + DoR` | `ba`, `qc` | readiness checks, reviewer coverage, domain constraints |
| `s05 Technical Approach` | `developer` | technical exception, boundary rule, waiver need |
| `s06 Task Plan` | `developer` | coverage for review, verify, release and mitigation tasks |
| `s07 Implement` | `developer`; `devops` if runtime/release scope | exception arising and evidence hook |
| `s08 Verify + DoD` | `qc`; `devops` when there is release | compliance verdict, residual risk, release/business-acceptance impact |

## Distinction Principle

- The `signoff owner` is responsible for closing the step's gate.
- The `waiver approver` has the authority to accept a deviation.
- These two roles can coincide, but must not be assumed to always coincide.

## Minimum Action When There Is An Exception

1. The role finding the deviation records the `governance-exception` in the step note.
2. Determine the approver using the matrix in this document.
3. If the exception stays open for more than one step or touches `release`, `business_acceptance`, `regulated`, also update `governance-exception-register.md`.
4. Do not move `governance_status` to `WAIVER_APPROVED` if the authority does not match this role model.