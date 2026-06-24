---
language: en
---

# Workflow Overview: Author Edition

> Vietnamese: workflow-overview-author-edition.vi.md

This document is the official overview that introduces the workflow from a delivery and author perspective.

If you need the internal reference that leans toward mechanics, validator, CI, rollout status, and more technical detail, read `workflow-overview.md` instead.

If you need the clear boundary between `v1.0.0` and the extension layers that came after, read `workflow-versioning.md`.

The goal of this document is not to describe the entire architecture in a reference style, but to help a reader answer quickly:

- what this workflow is
- what pain this workflow solves
- how to use this workflow
- which role plays which part in the workflow
- what each step is doing, what it receives, what it returns
- how the workflow supports `SDD`
- how this workflow combines with external toolkits to complete itself

Cross-reference date: `2026-04-14`.

## What This Workflow Is

This is an eight-step delivery workflow for AI-assisted software development:

```text
Clarify
-> Business Goal
-> Open Questions
-> Acceptance + DoR
-> Technical Approach
-> Task Plan
-> Implement
-> Verify + DoD
```

This workflow is designed for a very specific problem:

- the team has many roles but lacks a shared handoff chain
- AI can help move faster, but it easily erodes scope, erodes spec, and skips gates
- delivery usually involves code, docs, review, verify, and release, but lacks a unified backbone to connect those parts

This workflow solves that problem with a single backbone. Every layer such as `governance`, `SDD`, `change layer`, `execution topology`, and `adaptive planning` attaches to the same backbone instead of creating parallel workflows.

In short:

- this is not only a workflow for coding
- this is a `delivery operating model` for AI-assisted product delivery

## Who This Workflow Is For

This workflow fits when:

- you need to go from a raw request to an auditable output
- you want to use AI without letting AI bypass scope, gates, and spec
- many roles participate together such as `PO`, `BA`, `Designer`, `Developer`, `QC`, `DevOps`
- you need a unified chain from discovery to implementation and verification
- you want `BRD/SRS`, change packages, execution artifacts, and CI guardrails to live in one system

This workflow is not optimal if the goal is only:

- jotting down a few personal notes
- running a very small terminal command that needs no traceability
- building a throwaway prototype with no gates, signoffs, or reviews

## What This Workflow Brings

### 1. A Shared Backbone For The Entire Delivery

Every work item runs through the same chain from `Clarify` to `Verify + DoD`. This lets business, design, engineering, and QA look at the same flow instead of each role having its own process.

### 2. Auditable Delivery

The workflow does not only ask "is it done yet"; it forces you to answer:

- what problem is being solved
- why this work is worth doing
- which requirements are in scope
- which approach was chosen and why
- which tasks cover which requirements
- what evidence the verification relies on
- whether the result has reached `DoD`, `release readiness`, and `business_acceptance`

### 3. Spec Drives Delivery

When a work item runs under `SDD`, `BRD/SRS` are no longer reference documents. They become the source-of-truth that drives design, task plan, implementation, and verification.

### 4. AI Can Participate More Strongly While Still Having Guardrails

The workflow has execution support for `agentic` and `multi_agent` from the public baseline `v1.0.0`, but it does not force every work item to turn on the execution layer. When the execution layer is used, it is still kept inside the step contract, `governance`, `SDD`, validation, and CI enforcement.

## What Layers The Workflow Has

| Layer | Role | What the user gets |
|---|---|---|
| `backbone` | the eight-step chain from request to `DoD` | a single delivery flow |
| `governance` | rules, checklists, exceptions, authority | a clear quality bar and guardrails |
| `SDD` | `BRD/SRS`, spec freeze, spec change, coverage | spec drives delivery instead of standing outside it |
| `change layer` | `proposal -> design -> tasks -> spec-delta -> archive` | a clear split between the product source-of-truth and the change source-of-truth |
| `execution layer` | `agentic|multi_agent`, runtime artifacts, review mode | flexible operation by scope without losing control |
| `adaptive planning` | `quick|full|enterprise` | the same workflow but able to scale by complexity |
| `automation guardrail` | scaffold, validator, fixtures, CI | the workflow runs for real, not just as docs |

## Role Model In The Workflow

This workflow is a `role-aware workflow`. That means the same eight-step backbone still preserves ownership by specialty for:

- `PO`
- `BA`
- `Designer`
- `Developer`
- `QC`
- `DevOps`

The important point is to separate three different role layers:

| Role layer | What it is used for | Example |
|---|---|---|
| `execution_roles` | who is actually contributing business work to the step | `po`, `ba`, `designer`, `developer`, `qc`, `devops` |
| `role_signoffs` | who is responsible for signing off a gate | `dor`, `approach`, `task_plan`, `release`, `business_acceptance`, `dod` |
| runtime roles | which topology the step is running under | `coordinator`, `worker`, `tester`, `auditor`, `notebooklm-researcher` |

In short:

- `PO/BA/Designer/Developer/QC/DevOps` answer: who owns which business decision
- `gate_reviews` is not a role layer; it is the audit trail that records the actual human reviewer and the review time for a gate that has passed
- `coordinator/worker/verifier` answer: how is this step being run

### The Role Of Each Role

| Role | Main role in the workflow | Notable steps | Typical output | Default signoff |
|---|---|---|---|---|
| `PO` | holds business intent, scope, trade-offs, and `business_acceptance` | `s01`, `s02`, `s04`, `s08` | business problem, success target, scope decision, BRD update, business acceptance verdict | `dor`, `business_acceptance` |
| `BA` | clarifies requirements, creates `SRS`, traceability, and readiness | `s01`, `s03`, `s04` | requirement brief, open questions, governance blocker, acceptance criteria, SRS update | support `dor` |
| `Designer` | holds UX behavior, interaction rules, accessibility baseline | `s01`, `s02`, `s04`, `s05`, `s08` | user flow, UX constraint, UX acceptance note, SRS UX behavior update | `approach` when there is a UX surface; support `business_acceptance` |
| `Developer` | pins the technical approach, task plan, implementation, and technical exceptions | `s05`, `s06`, `s07` | technical approach, architecture boundary, task breakdown, code/config/doc changes | `approach`, `task_plan` |
| `QC` | holds verify evidence, checklist completeness, `DoD`, and release recommendation | `s04`, `s06`, `s08` | test strategy, verification evidence, review findings, DoD verdict | `dod`, `release` |
| `DevOps` | holds packaging, runtime, rollout, and release control | `s05`, `s06`, `s07`, `s08` | deployment plan, runtime contract, pipeline/release plan, deployment review | `release` |

### Role Map By Step

| Step | Lead role | The role's part at that step |
|---|---|---|
| `s01 Clarify` | `PO`, `BA` | pin the shared understanding, scope draft, context, and the initial `BRD` frame |
| `s02 Business Goal` | `PO` | pin the business goal, KPI, non-goals, and business priority |
| `s03 Open Questions` | `BA` | gather missing input, conflicts, policy gaps, governance blockers, and owners that need resolution |
| `s04 Acceptance + DoR` | `BA`, `QC`, `PO` | pin requirements, acceptance criteria, testability, readiness, and `Spec Freeze` if running `SDD` |
| `s05 Technical Approach` | `Developer` | choose the technical solution; `Designer` and `DevOps` add UX/runtime rules when the scope touches the corresponding boundary |
| `s06 Task Plan` | `Developer` | split tasks; `QC` adds verify checkpoints; `DevOps` adds release/rollout tasks; `Designer` adds UX refinement tasks |
| `s07 Implement` | `Developer` | implement code/config/doc; `DevOps` creates deployment artifacts if any; `Designer` and `QC` support when the scope needs it |
| `s08 Verify + DoD` | `QC` | pin evidence, compliance, `DoD`; `DevOps` pins release readiness; `PO` pins `business_acceptance` when needed |

### Role And Governance

Roles do not only produce output. They also decide who has authority where.

- `PO` holds business scope, trade-offs, and `business_acceptance`
- `BA` holds requirement clarity, policy gaps, and traceability
- `Designer` holds UX/accessibility rules
- `Developer` holds the technical approach and technical exceptions
- `QC` holds verify evidence, checklist completeness, and `DoD`
- `DevOps` holds the runtime/release gate

`role_signoffs` does not automatically mean the right to approve a `waiver`. When there is a `governance-exception`, authority must follow the governance role model, not be inferred only from whoever is doing the step.

## How To Use This Workflow

### Quick Usage

Public baseline `v1.0.0`:

1. The human or coordinator pins the `work_item_slug`.
2. If there is a `change layer`, scaffold the change package first.
3. Scaffold the workflow into `work-items/`.
4. Fill in real content for each step.
5. Run the appropriate validator.

If the work item uses execution metadata or runtime artifacts, also run the execution lane.

Extension after `v1.0.0`:

1. Run `Work Item Materialization` to pin the boundary, `work_item_slug`, dedup, and `change_strategy`.
2. Bring the work item into `Work Item Protocol` to pin state and authority at the work-item level.
3. If `materialization_status=READY` and the work item has a `change layer`, scaffold the change package first.
4. Scaffold or auto-scaffold the workflow into `work-items/`.
5. Human review of the protocol happens before the work item enters the delivery backbone if the project turns on the approval gate.

The version boundary details are in `workflow-versioning.md`. Details for the extension layer before and around `scaffold` are in `work-item-materialization.md` and `work-item-protocol.md`.

### Standard Command Surface

```bash
wfc scaffold-change --change-id <CHANGE-ID> --work-item <work-item-slug>
wfc scaffold --work-item <work-item-slug> --planning-track <quick|full|enterprise>
wfc scaffold-step --work-item <work-item-slug> --step <sNN>

wfc validate --workflow-root work-items --project-root .
wfc sdd --workflow-root work-items --project-root .
wfc change --workflow-root work-items --project-root .
wfc plan --workflow-root work-items
wfc smoke
```

If the work item uses execution metadata or runtime artifacts, also run:

```bash
wfc exec --workflow-root work-items
```

The extension after `v1.0.0` may also use:

```bash
wfc materialize --request "<raw-request>"
wfc work-item approve --work-item <work-item-slug> --reviewed-by <role>
wfc protocol
```

### Standard Artifact Roots

| Root | Role |
|---|---|
| `work-items/` | canonical artifact root for the workflow execution trace |
| `product-specs/` | source-of-truth for `BRD/SRS` when a work item runs under `SDD` |
| `changes/` | source-of-truth for change packages |
| `project-context/` | the default governance pack of the project |

## Step Title And Canonical Artifact

This workflow deliberately separates `step title` and `canonical artifact slug`.

- `step title` answers: what is this step for
- `canonical artifact` answers: what is the main file of this step named

| Step title | Canonical artifact slug | Standard file | Meaning |
|---|---|---|---|
| `Clarify` | `restate` | `<work_item_slug>.s01.restate.md` | the main artifact is the restated request |
| `Business Goal` | `business-goal` | `<work_item_slug>.s02.business-goal.md` | the main artifact is the business goal note |
| `Open Questions` | `open-questions` | `<work_item_slug>.s03.open-questions.md` | the main artifact is the list of open points |
| `Acceptance + DoR` | `acceptance-criteria` | `<work_item_slug>.s04.acceptance-criteria.md` | the step pins both acceptance and readiness, but the main file is the acceptance criteria |
| `Technical Approach` | `technical-approach` | `<work_item_slug>.s05.technical-approach.md` | the main artifact is the technical approach note |
| `Task Plan` | `task-breakdown` | `<work_item_slug>.s06.task-breakdown.md` | the step is planning, the main file is the breakdown into tasks |
| `Implement` | `implementation` | `<work_item_slug>.s07.implementation.md` | the main artifact is the implementation note |
| `Verify + DoD` | `verification` | `<work_item_slug>.s08.verification.md` | the step pins verify and `DoD`, but the main file is the verification note |

## How The 8 Steps Run

| Step | The point the step must answer | Goal | Main input | Main output | Gates and how to validate | Canonical artifact |
|---|---|---|---|---|---|---|
| `s01 Clarify` | What are we asked to solve, and under which constraints? | clarify the request, scope draft, constraints, initial `governance context` | raw request, ticket, initial context | restated request, scope draft, assumptions, initial risks, governance context | required block, naming/frontmatter, governance context present when needed | `s01.restate` |
| `s02 Business Goal` | Why is this worth doing and what is the expected outcome? | pin business value, KPI, non-goals | the clarified request | business goal, success metrics, non-goals, business scope | contract completeness, traceability with `s03-s04` | `s02.business-goal` |
| `s03 Open Questions` | What is still missing so we do not do it wrong or drift from the rules? | surface blockers, conflicts, missing input, readiness gaps | business goal and current context | open questions, readiness verdict, blocker owners, governance blockers if any | readiness/audit block, clear owners, blockers classified | `s03.open-questions` |
| `s04 Acceptance + DoR` | What does "done right" mean, and are we ready enough to continue? | pin acceptance criteria, readiness, `governance checks`, `Spec Freeze` when needed | the goal is clear, key open questions have a handling direction | measurable AC, `DoR`, governance checks, `Spec Freeze` if running SDD | governance gate, `DoR` gate, SDD validator, matching checklist profile | `s04.acceptance-criteria` |
| `s05 Technical Approach` | How will we solve it while staying true to the rules and spec? | choose the solution, trade-offs, impacted boundaries | AC, governance context, system context, frozen spec if any | technical approach, option analysis, boundaries, architecture detail, `Spec Change` if a gap is found | governance checks, trace to spec/change, clear exception if deviating | `s05.technical-approach` |
| `s06 Task Plan` | What work needs doing, in what order, and where do we verify? | break it into ordered tasks with coverage and verify/review checkpoints | the pinned technical approach | task breakdown, verification plan, review checkpoints, rollout coverage | planning validator, governance checks, traceability to AC/spec | `s06.task-breakdown` |
| `s07 Implement` | Has the solution been implemented in the right scope and per the contract? | make real changes in code/config/doc | task plan, codebase, execution policy if any | code/config/doc changes, implementation notes, runtime artifacts when needed | execution validator, change validator, spec alignment, exception handling | `s07.implementation` |
| `s08 Verify + DoD` | Does the result truly meet the requirements and is it high-quality enough to close? | conclude evidence, compliance, completion, `DoD` | implementation output, AC, spec, checklist, review findings | verification evidence, `DoD`, spec coverage, governance compliance, release/business acceptance input | testing, review, governance validator, `DoD` gate, CI enforcement | `s08.verification` |

## How Input And Output Are Understood

This workflow uses a very pragmatic principle:

- `Input` is the information or decision the current step needs to receive in order to start safely
- `Output` is what the step must hand off to the next step or to a stakeholder
- `Output` must be described by business value first; the artifact name is only used for tracing

This keeps the workflow from falling into:

- having files but no clear handoff
- having artifacts but not being able to say which decision they serve
- having code but not knowing which requirement it covers

## How The Workflow Validates Output And Process

The workflow validates at three layers:

### 1. Authoring Layer

The scaffolder forces notes to be generated correctly:

- naming
- frontmatter
- governance metadata
- step blocks
- optional blocks for `SDD`, `change`, `execution`, `planning`

### 2. Validation Layer

The validator checks the workflow against the contract:

- `validate:workflow`
- `validate:workflow:sdd`
- `validate:workflow:change`
- `validate:workflow:execution`
- `validate:workflow:planning`
- `validate:workflow:fixtures`
- `validate:workflow:authoring-smoke`

### 3. CI Enforcement Layer

CI already has the baseline jobs:

- `workflow-tooling`
- `workflow-artifacts`
- `workflow-sdd`
- `workflow-changes`
- `workflow-execution`
- `workflow-planning`
- `workflow-authoring-smoke`

This means the workflow does not only say "what should be done"; it already has a checking mechanism:

- whether artifacts match the contract
- whether governance is applied correctly
- whether the work item follows the spec/change/execution/planning rules
- whether the authoring flow drifts between docs, scaffold, and validator

## How Role Model And Execution Topology Connect

This workflow deliberately does not mix `business roles` with `runtime roles`.

| Question | The layer that answers |
|---|---|
| Who is responsible for business, requirements, design, implementation, quality, release? | `execution_roles` |
| Who has the signoff duty for `DoR`, `approach`, `task_plan`, `release`, `business_acceptance`, `DoD`? | `role_signoffs` |
| Is this step running with one agent or many agents? | `execution_mode` |
| If running many agents, who coordinates, who executes, who verifies? | runtime roles in `execution topology` |

Example:

- a step can have `execution_roles = [ba, qc, developer]`
- but the runtime is still just `agentic`
- or a step can have `execution_roles = [developer, qc, devops]`
- and the runtime is `multi_agent` with `coordinator + builder + tester`

The important points:

- business roles hold ownership and signoff
- runtime roles hold how things run
- these two layers complement each other; they do not replace each other

## How The Workflow Supports SDD

This workflow does not create a separate workflow for `SDD`. Instead, `SDD` is attached to the same eight-step backbone.

### Core Claim

When a work item runs under `SDD`, the workflow forces:

- `BRD` to lock the business problem
- `SRS` to lock the system requirements
- step 4 to pin `Spec Freeze`
- steps 5-7 to open `Spec Change` if the frozen spec drifts
- step 8 to conclude `Spec Coverage`

This turns spec from a reference document into a delivery control mechanism.

### Mapping By Step

| Step | Role with `SDD` |
|---|---|
| `s01-s02` | form or update `BRD` |
| `s03-s04` | form or update `SRS`, map acceptance, and freeze spec |
| `s05-s07` | every design/task/implementation must trace to requirements; if it drifts, open `Spec Change` |
| `s08` | conclude `Spec Coverage` as `PASS|FAIL|PARTIAL|UNTESTED` |

### Lifecycle

```text
draft -> reviewed -> approved -> frozen -> implemented -> verified -> accepted
```

### Traceability

The workflow traces at minimum the chain:

```text
BRD-###
-> SRS-FR|SRS-NFR|SRS-UX
-> AC-###
-> TASK-###
-> TEST-###
-> PASS|FAIL|PARTIAL|UNTESTED
```

This keeps the workflow from falling into three common situations:

- spec only exists for reference
- code changes behavior but does not update spec
- verification does not map back to requirements

### Source-of-Truth

| Artifact | Role |
|---|---|
| `product-specs/brd/` | source-of-truth for business problem, goal, KPI, scope, business rules |
| `product-specs/srs/` | source-of-truth for requirements, NFRs, UX/system behavior, and acceptance mapping |
| `work-items/` | execution trace of the work item |
| `changes/` | change packages being proposed or executed |

## How The Workflow Combines With External Toolkits

This workflow does not copy any framework wholesale. It uses the internal backbone as the host workflow and only borrows the strongest part of each toolkit.

### From `spec-kit`

The workflow borrows:

- `constitution`
- checklist discipline
- `clarify/analyze` mindset
- governance-first delivery

Result in the current workflow:

- `project-context/`
- `constitution`
- governance checks inside steps
- a clearer quality bar, exception handling, and authority model

### From `OpenSpec`

The workflow borrows:

- the change-centric model
- the `proposal -> design -> tasks -> spec-delta -> archive` package

Result in the current workflow:

- `changes/`
- `change_id`
- `spec_delta_refs`
- `archive_status`

### From `cc-sdd`

The workflow borrows:

- the `requirements -> design -> tasks -> implementation` execution loop
- the implementer/reviewer/fixer mindset
- runtime artifacts and the multi-agent contract

Result in the current workflow:

- `execution_mode`
- `review_mode`
- `verification_owner`
- runtime artifacts for `execution-policy`, `worker-assignment`, `worker-handoff-report`, `merge-report`

### From `BMAD-METHOD`

The workflow borrows:

- `quick|full|enterprise`
- role-aware planning depth
- scale-adaptive routing

Result in the current workflow:

- `planning_track`
- the same backbone but different planning depth
- the workflow still keeps a single chain instead of splitting into several flows

The final result for the user is not "using many frameworks", but a single workflow that still has enough:

- governance
- spec
- change
- execution
- planning depth

## Why You Should Use This Workflow

### 1. It Solves The Right Pain Of AI-Assisted Delivery

The hardest part of AI-assisted delivery is not writing more code, but keeping:

- scope from eroding
- spec from being bypassed
- handoffs from being vague
- verification from being subjective

This workflow is designed directly to solve those pains.

### 2. It Does Not Trade Off Fast Versus Strict

`quick|full|enterprise` lets the same backbone serve many complexity levels, instead of being either too light or too heavy.

### 3. It Is Usable For Real

This workflow has been implemented as real tooling and CI:

- artifact roots
- scaffold
- validators
- fixtures
- CI jobs

That means this is no longer a set of ideas on paper.

## How To Read Documents After This Overview

If you want to go deeper after this document:

- read `workflow-chain.md` to see templates, naming, schemas, and block detail
- read `role-aware-workflow.md` to see role cards, role outputs, and the role map by step
- read `spec-driven-development.md` to see the `SDD` lifecycle
- read `target-architecture.md` to understand the layers of the workflow
- read `implementation-blueprint.md` to see how far the workflow has rolled out
- read `workflow-ci-enforcement.md` to understand the CI guardrail

## Current Delivery Status

As of `2026-04-14`, phases `0-5` of the implementation blueprint have been rolled out at the public baseline level. This means:

- `Phase 0: Backbone + Governance`: done
- `Phase 1: SDD Materialization`: done baseline
- `Phase 2: Change Layer`: done baseline
- `Phase 3: Execution Layer`: done baseline
- `Phase 4: Adaptive Planning`: done baseline
- `Phase 5: Hardening`: done baseline

That means the workflow is already enough to:

- author
- validate
- CI enforce
- run under `SDD`
- manage changes
- support execution topology
- scale by planning track

This public baseline does not include `Work Item Materialization` and `Work Item Protocol`; those two layers are extensions after `v1.0.0`.

What remains is mostly:

- stale exception checks
- deeper drift checks
- deeper semantic lint for evidence and traceability

This is why the workflow can be introduced as a product that is already operable, rather than a design proposal.