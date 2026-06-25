---
language: en
---

# Target Architecture For The Workflow Backbone

> Vietnamese: target-architecture.vi.md

This document describes the target architecture for completing the repo's current workflow, with these principles:

- the current workflow is the `backbone`
- external frameworks are only a supporting layer
- do not create parallel workflows
- do not replace the existing source-of-truth with an external framework's artifacts

Document status:

- this is a `target architecture` for review
- it is not yet a completed implementation in the repo
- it is input for the next rollout steps
- the concrete rollout by phase, artifact, validator, and CI lives in `implementation-blueprint.md`

Cross-reference date: `2026-04-13`.

## Goals

- Keep the current eight-step workflow as the `host workflow`
- Add governance, change management, execution, and adaptive planning layers
- Do not turn `governance` into a separate step; prefer embedding it into the backbone's step contract/gate
- Separate clearly `source-of-truth`, `change`, `execution trace`, and `archive`
- Increase extensibility for `FEATURE`, `CHANGE`, `BUG`, `REFACTOR`, and `RESEARCH`

## Backbone

The workflow backbone stays:

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

This workflow still decides:

- gates
- signoffs
- handoffs
- release readiness
- business acceptance

## Hybrid Governance Model

This target architecture uses a `hybrid governance` model:

- about `70-80%` of governance is embedded directly into each step's step contract, gate, handoff, and evidence
- about `20-30%` sits in a thin shared layer such as `constitution`, `project-context`, `governance-checklist`, `governance-exception`

This means:

- do not create a `governance step`
- do not create a separate governance workflow
- do not leave governance only in foundational documents without entering the real workflow gates
- every deviation must appear in `governance-exception`; it must not be silently bypassed

## Architecture Layers

| Layer | Role | Main source |
|---|---|---|
| Backbone | step, gate, signoff, handoff, evidence flow | current workflow |
| Governance | `constitution`, `project-context`, `checklist`, `quality bar`, and shared rules | `spec-kit` |
| Product Spec | `BRD`, `SRS`, traceability, rollout truth | current workflow |
| Change Layer | proposal, design, tasks, spec delta, archive | `OpenSpec` |
| Execution Layer | implementer/reviewer/fixer loop, task execution autonomy | `cc-sdd` |
| Adaptive Planning | quick/full/enterprise routing, planning depth by scope | `BMAD-METHOD` |
| Automation Guardrail | validator, fixture suite, scaffold smoke, PR/push enforcement | repo-native CI design |

## Core Principles

- `BRD` and `SRS` are the product source-of-truth.
- `changes/` is the source-of-truth for a change being proposed or rolled out.
- `s01...s08` notes are the execution trace and evidence.
- `governance_ref` is the canonical field pointing to the governance source in effect; it usually points to `constitution` or `project-context`.
- `DoR`, `DoD`, `release`, and `business_acceptance` are decided only by the backbone workflow.
- the execution loop must not bypass a business gate.
- planning artifacts like `PRD/story` are only for planning support; they do not replace `BRD/SRS`.

## Framework Contributions

| Framework | Role in the target architecture | Must not do |
|---|---|---|
| `spec-kit` | governance layer: `constitution`, `checklist`, `clarify/analyze` mindset | replace the workflow backbone |
| `OpenSpec` | change layer: `specs/` vs `changes/`, proposal/apply/archive, spec delta | replace `BRD/SRS` with OpenSpec spec folders |
| `cc-sdd` | execution layer: `requirements -> design -> tasks -> implementation`, reviewer loop | decide in place of `DoR/DoD` |
| `BMAD-METHOD` | adaptive planning: `quick/full/enterprise`, role-aware agile planning, story-centric implementation | replace all current roles/artifacts with BMAD roles/artifacts |

## Target Artifact Model

```text
project-context/
  constitution.md
  project-context.md
  checklists/
    default.md
    strict.md
    regulated.md
  governance-exception-register.md

product-specs/
  brd/
    <scope>.md
  srs/
    <scope>.md

changes/
  <change-id>/
    proposal.md
    design.md
    tasks.md
    spec-delta/
      brd.delta.md
      srs.delta.md
    execution/
      task-status.md
    archive-metadata.md

work-items/
  <work_item_slug>/
    <work_item_slug>.s01.restate.md
    <work_item_slug>.s02.business-goal.md
    <work_item_slug>.s03.open-questions.md
    <work_item_slug>.s04.acceptance-criteria.md
    <work_item_slug>.s05.technical-approach.md
    <work_item_slug>.s06.task-breakdown.md
    <work_item_slug>.s07.implementation.md
    <work_item_slug>.s08.verification.md
```

## Meaning Of Each Artifact Zone

| Zone | Role |
|---|---|
| `project-context/` | holds project-wide shared rules such as `constitution`, coding standards, collaboration preferences, and `quality bar` |
| `product-specs/` | holds formal `BRD/SRS` after review/approval |
| `changes/` | packages each change by proposal, design, tasks, delta, and archive lifecycle |
| `work-items/` | canonical artifact root for step notes, traceability, role outputs, DoR/DoD evidence, and execution topology |

## Planning Track From BMAD

| Track | When to use | Impact on the workflow backbone |
|---|---|---|
| `quick` | small bug, small change, clear scope | condense the depth of `s01-s06`, but keep verify/evidence at `s08` |
| `full` | medium or large feature | run all eight steps with `BRD/SRS`, design, and a full task plan |
| `enterprise` | complex security/devops/compliance/release | deepen `s04-s08`, add a review/signoff lane and supplementary planning artifacts |

A planning track is metadata that adjusts planning depth; it does not create a new workflow.

## Mapping External Sources Onto Each Step

| Step | Backbone owner | Main added layer |
|---|---|---|
| `s01 Clarify` | current workflow | `spec-kit clarify`, `BMAD project-context`, `OpenSpec` proposal intent; record initial `governance context` |
| `s02 Business Goal` | current workflow | `BMAD` role collaboration mindset, `spec-kit` goal/checklist discipline; pin basic alignment with foundational principles |
| `s03 Open Questions` | current workflow | `spec-kit analyze/checklist`, `OpenSpec` proposal refinement; surface any `governance blocker` |
| `s04 Acceptance + DoR` | current workflow | central gate; pin `DoR`, `spec-freeze`, reviewer coverage, and `governance checks` for readiness |
| `s05 Technical Approach` | current workflow | `OpenSpec design`, `cc-sdd` design contract, `BMAD` planning depth; record a `governance exception` when deviating |
| `s06 Task Plan` | current workflow | `cc-sdd requirements -> design -> tasks`, `BMAD` story slicing; ensure coverage for review/verify/governance |
| `s07 Implement` | current workflow | `cc-sdd` implementer/reviewer/fixer loop, `BMAD quick-dev/story-centric loop`; do not drift off-rule without recording an exception |
| `s08 Verify + DoD` | current workflow | `spec-kit` checklist, `cc-sdd` independent review, `OpenSpec archive` readiness; clearly conclude `governance compliance` |

## Role Architecture

| Current role | Keep | Borrow from external frameworks |
|---|---|---|
| `po` | owns business value, scope, acceptance | PM mindset from `BMAD`, checklist discipline from `spec-kit` |
| `ba` | owns requirements, rules, traceability | analyst exploration from `BMAD`, clarify/analyze mindset from `spec-kit` |
| `designer` | owns UX/interaction/experience rules | UX planning depth from `BMAD` |
| `developer` | owns approach, tasks, implementation coherence | execution contract from `cc-sdd`, story slicing from `BMAD` |
| `qc` | owns verification, evidence, DoD | checklist/analyze from `spec-kit`, test-architect mindset from `BMAD` |
| `devops` | owns packaging/runtime/release contract | enterprise planning depth from `BMAD` |

## Command And Skill Architecture

- keep a single internal command surface for the repo
- internal commands may wrap the behavior of several frameworks, but do not expose all four raw command sets
- recommended command/skill mapping:

| Behavior | Main inspiration source |
|---|---|
| governance command | `spec-kit` |
| change proposal/apply/archive | `OpenSpec` |
| task execution loop | `cc-sdd` |
| planning track selection | `BMAD-METHOD` |

CI enforcement for the internal command surface is described separately in `workflow-ci-enforcement.md`.

## Target Operating Flow

```text
1. Choose a planning track: quick/full/enterprise
2. Load project-context or constitution
3. Create or update BRD/SRS context
4. Create a change package in changes/<change-id>/
5. Run the eight-step workflow backbone
6. At s07-s08 use the cc-sdd-style execution loop
7. After verify, sync the spec delta into BRD/SRS
8. Archive only when DoD + release + business_acceptance are clear
```

## Metadata To Have In The Target Model

| Metadata | Role |
|---|---|
| `planning_track: quick|full|enterprise` | adjusts planning depth |
| `governance_ref` | canonical field linking to the `constitution` or `project-context` used by the work item or step |
| `governance_profile` | governance level applied: `default`, `strict`, `regulated`, `custom` |
| `governance_status` | standard enum: `ALIGNED|CHECKS_PENDING|EXCEPTION_RECORDED|WAIVER_APPROVED|BLOCKED|NOT_APPLICABLE` |
| `checklist_refs` | links to the relevant checklist or review pack |
| `change_id` | connects the backbone workflow to a change package |
| `change_status` | draft, approved, implementing, verified, archived |
| `spec_delta_refs` | links to the `BRD/SRS` delta portion |
| `archive_status` | not archived, ready_to_archive, archived |
| `execution_mode` | note-level enum: `agentic|multi_agent`; if the runtime needs a fallback, use `sequential_multi_role` in the execution policy |
| `review_mode` | unified enum: `self|independent|auto_fix_loop` |

Synchronization conventions:

- In prose you may write `multi-agent`, but in schemas and frontmatter use `multi_agent`.
- `sequential_multi_role` is a runtime fallback, not the default execution mode of a note's frontmatter.
- The project-level Governance Pack has been materialized at `project-context/`; the default `governance_ref` should point to `project-context/project-context.md`.

## Boundaries To Keep Very Tight

| Boundary | Rule |
|---|---|
| Product spec vs change | `BRD/SRS` is not replaced by `proposal/tasks` |
| Workflow vs framework | external frameworks must not create a competing workflow |
| Change vs execution | `changes/` does not replace `work-items/` |
| Execution vs governance | the execution loop does not replace `DoR/DoD` |
| Governance vs step | governance must not drift into pure foundational docs; it must enter the gate or exception of the relevant step |
| Planning aid vs rollout truth | `PRD/story` is only a planning aid, not a replacement for the main artifact |

## What Not To Do Yet

- do not import any framework's raw command set wholesale
- do not rename current roles to BMAD
- do not switch `BRD/SRS` to an external framework's naming scheme
- do not add archive/change-sync automation while the change protocol is not yet stable

## Conclusion

The recommended target architecture for this repo is:

- the current workflow as the `backbone`
- `spec-kit` as the `governance layer`
- `OpenSpec` as the `change layer`
- `cc-sdd` as the `execution layer`
- `BMAD-METHOD` as the `adaptive planning layer`

Read this document together with:

- `references/workflow-chain.md`
- `references/spec-driven-development.md`
- `references/implementation-blueprint.md`
- `references/sdd-merge-strategy.md`
- `references/execution-runtime.md`