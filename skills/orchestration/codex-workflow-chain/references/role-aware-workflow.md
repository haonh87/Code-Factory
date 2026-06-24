---
language: en
---

# Role-Aware Workflow Reference

> Vietnamese: role-aware-workflow.vi.md

This document describes how to overlay business roles onto the eight-step workflow without splitting it into several separate workflows.

## Principles

- The eight-step workflow remains the single backbone for a work item.
- A role only adds ownership, domain-specific input/output, and signoff.
- `BRD` and `SRS` are the rollout/source-of-truth output of the product development process.
- `NotebookLM` is a corpus storage and document-retrieval layer during execution, not a rollout output.
- Conclusions drawn from NotebookLM are only operationally valid once normalized back into `BRD`, `SRS`, or the main workflow note.
- The `.md` workflow note of each step remains where the step's contract, role output, handoff, and evidence are traced.
- `governance` is a thin shared layer; role output must reflect `governance context`, `governance checks`, or `governance-exception` at the relevant step, not be detached from the workflow note.
- Authority for a `waiver` or `approved_by` must not be inferred only from `role_signoffs`; it must follow `project-context/governance-role-model.md`.
- When a work item runs under SDD, also use `spec-driven-development.md` to manage lifecycle, requirement IDs, spec freeze, spec change, and the coverage report.

## Artifact Model

| Artifact | Role | Owner | Notes |
|---|---|---|---|
| `BRD` | Business rollout output | `po`, `ba` support | Holds business context, stakeholders, problem, goal, KPI, scope, out-of-scope, business rules, assumptions, decision log, and `BRD-*` IDs when running SDD. |
| `SRS` | Requirement rollout output | `ba`, delivery-role review | Holds functional requirements, NFRs, UX/system behavior, acceptance criteria, traceability, dependencies, constraints, and `SRS-*` IDs when running SDD. |
| NotebookLM notebook | Corpus storage/retrieval | the role doing research, usually `ba` or `po` | Stores and queries supporting sources such as meeting notes, tickets, policies, research, old requirements. Not used as the final source of truth. |
| Workflow step note | Execution trace | the step's primary role or coordinator | Holds the contract, role outputs, topology, traceability, and handoff for the current step. |

If you need to materialize a separate file for a work item, use a clear name keyed by `work_item_slug`:

```text
<work_item_slug>.brd.md
<work_item_slug>.srs.md
```

Do not create `BRD/SRS` if the scope is small and the workflow note is enough; when you do create them, link them from the step note via `linked_artifacts`.

## Role Cards

### `po`

Common inputs:

- vision, roadmap, stakeholder priority
- KPI, scope boundary, business constraints
- BRD draft or historical decisions
- NotebookLM query results when cross-referencing documents/stakeholder context

Main outputs:

- business problem and success target
- business scope decision
- BRD section/update
- governance alignment or a decision on scope/non-goals when a foundational rule needs pinning
- business acceptance verdict

Accompanying skills:

- `product-thinking`
- `requirement-analysis`
- `step-goal-contract`
- `notebooklm` when supporting corpus retrieval is needed

Default signoff:

- `dor`
- `business_acceptance`

### `ba`

Common inputs:

- stakeholder notes, business rules, as-is flow
- glossary, existing docs, policy/compliance context
- NotebookLM/project search results
- upstream BRD or decision log

Main outputs:

- SRS section/update
- requirement brief
- open questions and missing inputs
- governance context for requirements, or a governance blocker needing an owner/resolution
- clarified business rules
- acceptance criteria and traceability

Accompanying skills:

- `requirement-analysis`
- `product-thinking`
- `step-goal-contract`
- `input-readiness-assessor`
- `notebooklm` when supporting corpus retrieval is needed

Default signoff:

- support `dor`

### `designer`

Common inputs:

- user journey, screen context, interaction needs
- brand/UI constraints, content constraints
- accessibility baseline, device/platform constraints
- BRD/SRS rules related to the UX outcome

Main outputs:

- user flow or screen behavior
- interaction/visual constraints
- UX/accessibility rules to reflect in governance checks when the scope touches UI
- UX acceptance note
- SRS UX behavior update when needed

Accompanying skills:

- `frontend-experience-design`
- `product-thinking`
- `requirement-analysis`
- `brainstorming`

Default signoff:

- `approach` when the scope has a UX surface
- support `business_acceptance`

### `developer`

Common inputs:

- DoR, acceptance criteria, SRS
- codebase context, conventions, technical constraints
- NFRs, architecture boundaries, deployment constraints when present

Main outputs:

- technical approach
- architecture boundary or design decision
- task breakdown
- governance-exception when the approach or implementation must deviate from a standard rule
- code/config/doc changes
- implementation note or SRS exception when behavior changes

Accompanying skills:

- `system-design`
- `domain-architecture`
- `frontend-architecture`
- `database-design`
- `task-breakdown-planner`
- `implementation`
- `react-web-implementation` when the stack is React web or Next.js

Default signoff:

- `approach`

### `qc`

Common inputs:

- SRS, acceptance criteria, business rules
- changed scope, changed files, environment matrix
- known risks, testability constraints

Main outputs:

- test strategy or scenario matrix
- verification evidence
- governance checklist evidence and a compliance verdict at the verify step
- defect list or review findings
- DoD verdict
- release recommendation when needed

Accompanying skills:

- `testing`
- `code-scan-review`
- `frontend-quality-review`
- `react-best-practices-review`
- `database-change-review`
- `definition-of-done-gate`

Default signoff:

- `dod`
- `release`

### `devops`

Common inputs:

- runtime target, environment matrix
- secrets/network/storage constraints
- packaging requirements
- promotion and rollback requirements

Main outputs:

- deployment plan
- packaging/runtime contract
- pipeline/release plan
- runtime or release governance checks when the scope touches rollout
- rollout note and rollback note
- deployment review

Accompanying skills:

- `deployment-devops`
- `containerization-packaging`
- `platform-runtime-deployment`
- `ci-cd-release`

Default signoff:

- `release`

## Step Mapping

| Step | BRD/SRS output | Required role outputs when the role is present | Governance by role | NotebookLM usage |
|---|---|---|---|---|
| `s01` Clarify | create the initial `BRD` frame | `po`: problem/scope draft; `ba`: restatement and context; `designer`: UX context if any | `po` and `ba` record initial `governance context`; `designer` adds UX/accessibility rules if any | query request sources, meeting notes, tickets, or project corpora to avoid restating incorrectly |
| `s02` Business Goal | update `BRD` with goal, KPI, out-of-scope | `po`: business goal and priority; `ba`: rule/context support; `designer`: UX objective if any | `po` pins goals and non-goals without violating foundational principles, or records the trade-off explicitly | query benchmarks, user context, or old decisions if the business goal depends on documents |
| `s03` Open Questions | update the decision log or open questions for `BRD/SRS` | `ba`: missing inputs/conflicts; other roles: questions within their own boundary | `ba` collects `governance blocker` or policy gaps; other roles surface blockers within their domain | search NotebookLM/project docs to gather evidence, but do not close a question until the conclusion is recorded in the note/BRD/SRS |
| `s04` Acceptance + DoR | create/update `SRS` with requirements, rules, ACs, DoR | `ba`: requirement/AC; `qc`: testability; `po`: DoR/scope; `designer`: UX AC; `developer`: implementability | `ba`, `qc`, `po` pin `governance checks` for readiness; `designer` and `developer` add UX/implementability constraints to check | query policy, old requirements, old scenarios to increase AC coverage |
| `s05` Technical Approach | use `SRS` as input; update it if requirements/constraints change | `developer`: approach; `designer`: UX interaction contract; `devops`: runtime/release contract; `ba`: business-rule trace | `developer` records a `governance-exception` if the approach deviates; `designer` and `devops` add boundary rules for UX/runtime/release | query technical notes or old design rationale if a relevant corpus exists |
| `s06` Task Plan | trace tasks to requirement/AC in `SRS` | `developer`: build tasks; `qc`: verify tasks; `devops`: release tasks; `designer`: UX refinement tasks | `developer`, `qc`, `devops` ensure the task plan covers review, verify, release, and `governance checks` | usually not needed, unless tasks depend on large project documents |
| `s07` Implement | record an `SRS` exception/update if behavior changes | `developer`: implementation note; `devops`: deployment artifact; `designer`: interaction polish; `qc`: evidence hook | `developer` or `devops` must record a `governance-exception` if implementation deviates; `qc` ensures the evidence hook is sufficient for verify | usually not used, except to look up old decisions during implementation |
| `s08` Verify + DoD | verify against `SRS`; business acceptance based on `BRD/SRS` | `qc`: evidence/DoD; `devops`: release readiness; `developer`: remediation; `po`: business acceptance; `designer`: UX outcome review | `qc` aggregates `governance checks`; `devops` closes release governance; `po` looks at `business_acceptance` when waivers or risks are still open | query the corpus when cross-referencing old requirements or evidence outside the repo |

## Role Outputs Block

Use this block in a step note when multiple roles participate or signoff must be traced by role:

````md
## Role Outputs
```yaml
roles:
  - role: po
    involvement: approve
    inputs:
      - "<BRD section or stakeholder input used>"
    outputs:
      - "<scope/business decision pinned>"
    skills:
      - product-thinking
    signoffs:
      - dor
    upstream_artifacts:
      - "<work_item_slug>.brd.md"
    downstream_artifacts:
      - "<work_item_slug>.srs.md"
    notes: ""
```
````

Rules:

- `role` must be in the note's `execution_roles`.
- `signoffs` only use `dor`, `approach`, `release`, `business_acceptance`, `dod`.
- `signoffs` do not automatically imply waiver authority; if there is an `approved_by`, authority must follow `project-context/governance-role-model.md`.
- If an output comes from a NotebookLM query, record it as `input` or `evidence`, then link the normalized conclusion in `BRD/SRS`.
- Do not use this block to copy back the entire common output of the step.

## Governance Authority

When you need to determine who may approve an exception or waiver:

- see `project-context/governance-role-model.md`
- do not infer it from that role being the primary owner of the step
- do not infer it from that role currently holding `dor|approach|release|business_acceptance|dod`

## Minimum Traceability

A work item with `BRD/SRS` should be able to trace the following chain:

```text
NotebookLM/project docs evidence
-> BRD decision or SRS requirement
-> acceptance criteria
-> technical approach
-> task
-> implementation evidence
-> verification evidence
-> business_acceptance/release decision
```

If a decision exists only in a NotebookLM query result and does not appear in `BRD`, `SRS`, or the workflow note, that decision is not yet considered part of the record.