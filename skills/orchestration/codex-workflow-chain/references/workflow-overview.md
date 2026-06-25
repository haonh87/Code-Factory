---
language: en
---

# Workflow Overview: Technical Reference

> Vietnamese: workflow-overview.vi.md

This document is the internal technical reference for the repo workflow.

The goal of this document is to clarify:

- the mechanics of the workflow by layer
- the `SDD` lifecycle, gating, and traceability at a technical level
- the validator, CI enforcement, and automation guardrail
- the current execution/change/planning metadata and rollout status

If you need the official overview that introduces the workflow from a delivery and author perspective, read `workflow-overview-author-edition.md`.

If you need to pin the boundary between `v1.0.0` and the extensions after it, read `workflow-versioning.md`.

Cross-reference date: `2026-04-14`.

## Scope Of The Technical Reference

The workflow still uses the same eight-step backbone for AI-assisted software development:

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

In this document, the focus is not the product narrative but how the workflow is implemented as:

- layers and artifacts that can be checked
- rules and metadata that can be validated
- clear source-of-truth refs
- clear execution/change/planning contracts
- CI and rollout status that can be cross-referenced

Points to keep clear in this technical reference:

- the workflow has only **one backbone**
- every layer such as `governance`, `SDD`, `change`, `execution`, and `adaptive planning` attaches to this backbone
- no parallel workflow is created per framework or per role

## What The Workflow Has

The repo currently contains the public baseline `v1.0.0` plus some extensions after it.

Speaking only of the public baseline `v1.0.0`, the scope is:

- the eight-step `backbone`
- the `governance layer`
- the `SDD layer`
- the `change layer`
- the `execution layer`
- `adaptive planning`
- manual scaffold + validator

The layers below may exist in the repo but do not belong to the public baseline `v1.0.0`:

- `Work Item Materialization`
- `Work Item Protocol`
- the approval gate and lifecycle at the work-item level

Looking at the current repo surface, the capabilities already present include:

- the eight-step `backbone`
- the `governance layer`
- the `SDD layer`
- the `change layer`
- the `execution layer`
- `adaptive planning`
- the `automation guardrail`

### 1. The Eight-Step Backbone

The backbone is what decides:

- the step
- the gate
- the handoff
- the signoff
- `release readiness`
- `business_acceptance`

The backbone does not change when scope changes. What changes is the depth of artifacts, checklists, review lanes, and the execution mode.

### 2. Governance Layer

The workflow uses a `hybrid governance` model:

- most `governance` goes directly into the step contract, gate, handoff, and evidence
- the rest sits in `constitution`, `project-context`, `checklist`, and `governance-exception`

This lets the workflow:

- not bloat a separate step for governance
- while still having a clear quality bar, exceptions, waivers, role authority, and validator

### 3. SDD Layer

The workflow already supports `Spec Driven Development` in the right spirit:

- `BRD` and `SRS` are the source-of-truth when a work item runs spec-driven
- `Spec Freeze` at the end of `s04`
- `Spec Change` when steps 5-7 find a spec drift
- `SDD Traceability` connecting requirements to tasks/tests
- `Spec Coverage` at `s08`

In short:

- the workflow still keeps eight steps
- but `BRD/SRS` actually drive design, tasks, implementation, and verification

### 4. Change Layer

The workflow has an `OpenSpec-style change layer` to clearly separate:

- the source-of-truth of the product
- the source-of-truth of the change

`BRD/SRS` remains the truth of the product.
`changes/<change-id>/` is the truth of the change package:

- `proposal`
- `design`
- `tasks`
- `spec-delta`
- `archive`

### 5. Execution Layer

The workflow does not force every step to run one way.

It supports:

- `agentic`: one agent holds the full ownership of the step
- `multi_agent`: coordinator + worker + verifier for steps with many boundaries

The execution topology does not change the step's business; it only changes how the step is run.

### 6. Adaptive Planning

The workflow has a `planning_track` to scale by complexity:

- `quick`
- `full`
- `enterprise`

This lets the same backbone serve:

- a small bug
- a medium or large feature
- an enterprise scope with a complex review or release lane

### 7. Automation Guardrail

The workflow does not stop at docs. It has:

- scaffold
- validator
- a fixture suite
- CI enforcement
- authoring smoke

This turns the workflow from "guidance on what to do" into "a contract that can run and can fail if done wrong".

## What The Workflow Brings

### 1. A Common Language For The Entire Delivery

This workflow lets `PO`, `BA`, `Designer`, `Developer`, `QC`, and `DevOps` look at the same single chain.

Instead of each role having a different process, this workflow keeps:

- the same `work item`
- the same `source-of-truth`
- the same `handoff`
- the same way to pin `DoR`, `DoD`, `release`, and `business_acceptance`

### 2. From Raw Request To Auditable Output

The workflow does not only ask "is the code done yet".
It forces you to answer:

- what problem is being solved
- what the expected business outcome is
- which requirements are in scope
- why this solution was chosen
- which tasks cover which requirements
- what evidence the verification relies on
- what gaps or residual risks remain

### 3. Both Compact And Scalable

The workflow does not try to turn every change into heavy ceremony.

- `quick` for small changes
- `full` for ordinary features
- `enterprise` for scope with many risks or many signoffs

### 4. Suited For AI-Assisted Delivery

The workflow is designed so AI does not only "write code", but also:

- understands scope
- knows the gates
- stays on spec
- does not bypass governance
- produces artifacts that match the contract
- validates its own output

## How The Workflow Supports SDD

The workflow applies `SDD` as a constraint layer, not a separate workflow.

### Source-of-Truth

- `BRD`: locks problem, goal, KPI, scope, business rules
- `SRS`: locks functional requirements, NFRs, UX/system behavior, acceptance mapping

### Lifecycle

```text
draft -> reviewed -> approved -> frozen -> implemented -> verified -> accepted
```

### Gating

- `s04`: pins `Spec Freeze`
- `s05-s07`: if spec drifts, open `Spec Change`
- `s08`: pins `Spec Coverage`

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

### Practical Meaning

This stops the workflow from letting:

- spec be only a reference document
- code silently change behavior without updating spec
- verification be only subjective testing without mapping back to requirements

## How The 8 Steps Appear

| Step | Goal | Main input | Main output | How to validate |
|---|---|---|---|---|
| `s01 Clarify` | clarify the request, scope draft, constraints, `governance context` | raw request, initial context | restated request, scope draft, assumptions, governance context | step contract, required block, naming/frontmatter |
| `s02 Business Goal` | pin business value, KPI, non-goals | the clarified request | business goal, success metrics, non-goals | traceability with the next step, contract completeness |
| `s03 Open Questions` | surface blockers, conflicts, missing input | goal + current context | open questions, blockers, readiness verdict | readiness block, audit block, owner resolution |
| `s04 Acceptance + DoR` | pin acceptance criteria, readiness, and `Spec Freeze` | goal + answers to open questions | measurable AC, DoR, governance checks, spec freeze if any | governance validator, DoR gate, SDD validator |
| `s05 Technical Approach` | choose the solution and the matching technical boundary | AC, governance, system context, frozen spec | recommended approach, trade-offs, boundaries, spec change if any | governance checks, trace to spec/change |
| `s06 Task Plan` | break it into ordered tasks with coverage | technical approach | task plan, review/verify checkpoints, rollout coverage | planning validator, traceability, governance checks |
| `s07 Implement` | make real changes | task plan, codebase, pinned rules | code/config/doc changes, runtime artifacts if any | execution validator, change validator, spec alignment |
| `s08 Verify + DoD` | conclude evidence, completion, compliance | implementation output, AC, spec, checklist | verification evidence, DoD, spec coverage, compliance verdict | testing/review, governance validator, DoD gate, CI |

## Goal, Input, And Output Of Each Step

### `s01 Clarify`

- Goal:
  clarify the request, initial scope, constraints, and `governance context`
- Input:
  raw request, ticket, bug report, change ask, initial context
- Output:
  shared understanding of the request, scope draft, assumptions, dependencies, initial risks

### `s02 Business Goal`

- Goal:
  pin why this work is worth doing
- Input:
  the shared understanding from `Clarify`
- Output:
  business goal, success metrics, non-goals, business constraints

### `s03 Open Questions`

- Goal:
  surface what is still missing before committing to acceptance and design
- Input:
  business goal + current context
- Output:
  open questions, missing inputs, conflicts, readiness verdict, governance blockers if any

### `s04 Acceptance + DoR`

- Goal:
  turn intent into measurable criteria and decide readiness to go deeper
- Input:
  business goal + the results of handling open questions
- Output:
  acceptance criteria, edge cases, DoR verdict, governance checks, `Spec Freeze` if running SDD

### `s05 Technical Approach`

- Goal:
  choose the technical solution that best fits the requirements and boundaries
- Input:
  AC, governance, system context, frozen spec
- Output:
  option analysis, recommended approach, trade-offs, boundaries, `Spec Change` if any

### `s06 Task Plan`

- Goal:
  turn the approach into a plan that is executable and verifiable
- Input:
  the pinned technical approach
- Output:
  task breakdown, dependency path, verify/release tasks, reviewer coverage

### `s07 Implement`

- Goal:
  execute real changes, staying on spec and plan
- Input:
  task plan, codebase, execution policy if any
- Output:
  code/config/doc changes, runtime artifacts, implementation evidence

### `s08 Verify + DoD`

- Goal:
  answer whether this work item is "truly done"
- Input:
  implementation output + AC + spec + checklists
- Output:
  verification evidence, `Spec Coverage`, `DoD verdict`, governance compliance, residual risk

## How The Workflow Validates Output And Process

The workflow has four validation layers:

### 1. Template And Authoring

Baseline `v1.0.0`:

- scaffold workflow
- scaffold step
- scaffold change package

Goal:

- keep the manual flow simple and easy to roll out
- reduce hand-copy errors
- generate files with correct naming, frontmatter, and block schema from the start

Extension after `v1.0.0`:

- work item materialization
- work item protocol

### 2. Validator By Layer

- `validate:workflow`
- `validate:workflow:sdd`
- `validate:workflow:change`
- `validate:workflow:execution`
- `validate:workflow:planning`

Goal:

- check that notes match the contract
- check that metadata uses the right enum
- check that source-of-truth refs exist
- check that runtime artifacts or the change package match the workflow

### 3. Fixture Regression

- `validate:workflow:fixtures`

Goal:

- protect the validator from regression
- prove the pass/fail rules are working correctly

### 4. Authoring Smoke And CI

- `validate:workflow:authoring-smoke`
- GitHub Actions `workflow-tooling`
- `workflow-artifacts`
- `workflow-sdd`
- `workflow-changes`
- `workflow-execution`
- `workflow-planning`
- `workflow-authoring-smoke`

Goal:

- catch regressions when scaffold and validator drift apart
- stop artifacts that break the contract from passing a PR or `main`

## How The Workflow Combines With External Toolkits

This workflow does not copy any framework wholesale.
It uses the current workflow as the `host workflow` and borrows the strongest part of each toolkit.

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
- quality bar and exception handling

### From `OpenSpec`

The workflow borrows:

- the change-centric model
- the `proposal -> design -> tasks -> spec-delta -> archive` package

Result:

- `changes/`
- `change_id`
- `spec_delta_refs`
- `archive_status`

### From `cc-sdd`

The workflow borrows:

- the `requirements -> design -> tasks -> implementation` execution loop
- the implementer/reviewer/fixer mindset
- the multi-agent contract

Result:

- `execution_mode`
- `review_mode`
- runtime artifacts
- `multi_agent` support in the public baseline

### From `BMAD-METHOD`

The workflow borrows:

- `quick|full|enterprise`
- role-aware planning depth
- agile scale-adaptive routing

Result:

- `planning_track`
- routing depth by scope
- the same backbone but different ceremony per track

## Why Others Should Use This Workflow

### 1. Because It Keeps A Single Backbone

The team does not have to learn several different workflows for:

- business
- spec
- change
- execution
- verify

All of them run on the same chain.

### 2. Because It Is Not Only A Template Set

This workflow already has:

- artifact roots
- a scaffolder
- validators
- a fixture suite
- CI jobs

It is an `operating model`, not just a set of sample notes.

### 3. Because It Scales Well

It can serve:

- a small bug
- a normal feature
- a change with many boundaries
- complex runtime/release
- `agentic` or `multi_agent`

without having to switch workflows.

### 4. Because It Fits AI-Assisted Delivery

AI can:

- read the contract correctly
- know what each step is doing
- know when it must block
- know when an exception is needed
- know which spec to trace to
- know what to verify with

This makes the workflow fit both agents and humans.

## Who Should Use This Workflow

This workflow fits:

- teams that want disciplined delivery without overly heavy ceremony
- teams that want `BRD/SRS` to actually drive implementation
- teams that want to use AI without losing control
- teams that need a shared workflow for business, design, code, QA, and DevOps
- teams that want to increase autonomy gradually from `agentic` to `multi_agent` without breaking governance

## Current Delivery Status

Per the implementation blueprint:

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
- run under SDD
- manage changes
- support execution topology
- scale by planning track

What remains is deeper hardening:

- stale exception checks
- deeper drift checks
- deeper semantic lint

## Conclusion

If you had to describe this workflow in one sentence:

> This is an eight-step backbone workflow for AI-assisted software delivery that keeps a single chain from request to `DoD`, yet is strict enough to bring `governance`, `SDD`, `change management`, `execution topology`, `adaptive planning`, and `CI enforcement` into one operating model.

If you had to describe the reason to use it:

> This workflow helps a team keep control when delivering with AI, without trading away the clarity between business, spec, implementation, verify, and release.

Documents to read next:

- `workflow-chain.md`
- `spec-driven-development.md`
- `target-architecture.md`
- `sdd-merge-strategy.md`
- `implementation-blueprint.md`
- `workflow-ci-enforcement.md`