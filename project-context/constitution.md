---
language: en
---

# Constitution

This document defines the foundational principles of the workflow for the `AI Agent Ops / Code-Factory` repo.

## Scope

- Applies to the 8-step coding workflow.
- Applies to policy, skills, MCP, adapters and operational documentation in this repo.
- Applies to every `governance_profile`, unless a valid `waiver` is clearly recorded.

## Foundational Principles

### `GOV-01` Backbone First

- Every work item must go through the backbone `Clarify -> Business Goal -> Open Questions -> Acceptance + DoR -> Technical Approach -> Task Plan -> Implement -> Verify + DoD`.
- Do not create parallel workflows to bypass the main gates.

### `GOV-02` Clear Source Of Truth

- The step `.md` note is the source of truth for the execution trace.
- `BRD/SRS` is the source of truth for the rollout spec when a work item runs under SDD.
- `project-context/` is the source of truth for the governance layer at the project level.

### `GOV-03` Clarify Before Committing To A Solution

- Do not push ahead to `Technical Approach` before intent, scope, assumptions and key blockers are clear.
- `governance context` must be recorded before the solution goes deep.

### `GOV-04` Traceability Across Delivery

- Requirement, acceptance, task, implementation and verify must be traceable across steps when scope is large enough.
- If NotebookLM, project search or corpora outside the repo are used, conclusions must be normalized back into the main artifact.

### `GOV-05` Exceptions And Waivers Must Be Explicit

- Do not silently deviate from a foundational principle.
- Every `governance-exception` or `waiver` must have a clear reason, impact, mitigation, owner and status.

### `GOV-06` Evidence Before Concluding Done

- `DoD`, `release` and `business_acceptance` may only be locked when evidence is clear enough or the limitation is stated transparently.
- If a required check cannot be run, the skipped part and the reason must be stated clearly.

### `GOV-07` Keep Docs, Policy And Runtime Reality In Sync

- Do not let workflow docs, policy and note templates drift too far from each other.
- When a contract or metadata changes, the main entrypoints must be updated at the same time.

### `GOV-08` Control Secrets, Environment And Side Effects

- Do not commit secrets or write secrets into docs/templates.
- For a change with runtime or release side effects, the environment boundary, rollback path and owner must be made clear.

## Rule For A Waiver

A `waiver` is only valid when it has all of:

- `principle_ref`
- `reason`
- `impact`
- `mitigation`
- `approved_by`
- `review_date` or an expiry condition

If any of these fields is missing, the exception is treated as not approved.

The authority to determine `approved_by` must follow `project-context/governance-role-model.md`; it must not be inferred solely from the role editing the note or the step's role sign-off.