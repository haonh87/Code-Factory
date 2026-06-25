---
language: en
---

# Implementation Blueprint For The Workflow Backbone

> Vietnamese: implementation-blueprint.vi.md

This document turns `target-architecture.md` into a deployable rollout plan.

Goals:

- state which layers are materialized
- state which layers are only at reference level
- pin the rollout order so the workflow reaches a state that supports `SDD` and the agreed layers
- help control scope, artifacts, validators, CI, and done criteria per phase

Cross-reference date: `2026-04-13`.

## How To Read

- `DONE`: materialized at real-use level in the repo
- `PARTIAL`: a contract/reference or foundational metadata exists, but not the full artifact + validator + CI
- `NOT STARTED`: only at the target architecture or merge-strategy level

## Current Status Table

| Layer | Status | Has | Missing |
|---|---|---|---|
| Backbone workflow | `DONE` | eight-step workflow, naming, frontmatter, step contract, `work-items/` canonical root | further hardening in later phases |
| Governance layer | `DONE` baseline | `project-context/`, `constitution`, checklists, role model, decision model, validator, scaffold, fixtures, authority/state enforcement baseline, and CI phases 1-2 | deeper semantic lint and stale-register checks |
| SDD layer | `DONE` baseline | `product-specs/`, `BRD/SRS` template, `sdd_mode`, `spec_refs`, `spec_status`, a strict sample work item, SDD validator, SDD CI | further hardening for SDD fixtures and deeper semantic lint |
| Change layer | `DONE` baseline | `changes/`, a sample change package, `change_*` metadata, change scaffold, change validator, change CI | further hardening for archive lifecycle, delta semantics, and deeper fixtures |
| Execution layer | `DONE` baseline | `execution_mode`, `review_mode`, execution runtime reference, real runtime artifacts, a `multi_agent` sample, execution validator, execution CI | further hardening for multi-worker depth, escalation flow, and runner semantics |
| Adaptive planning | `DONE` baseline | `planning_track`, routing matrix, scaffold preset, planning validator, planning CI, quick/enterprise samples | further hardening for semantic routing and depth-specific lint |
| Automation guardrail | `DONE` baseline | `npm` command surface, Node validators, fixture suite, CI jobs for artifact/governance/SDD/change/execution/planning, and authoring smoke | deeper drift checks, deeper semantic lint |

## Rollout Principles

- the workflow backbone is the single spine
- do not roll out a new layer if the prior layer has no clear source-of-truth
- a validator is only added after the contract is pinned
- CI only enforces what already has a stable local command
- do not use an external framework to replace the repo's main artifact

## Phase 0. Backbone And Governance

### Goal

- stabilize the eight-step workflow
- materialize governance as real rules, not just prose
- create the standard command surface and foundational CI for workflow artifacts

### Status

`DONE`

### Artifacts / source-of-truth

- `work-items/`
- `project-context/constitution.md`
- `project-context/project-context.md`
- `project-context/governance-role-model.md`
- `project-context/governance-decision-model.md`
- `project-context/checklists/*.md`
- `project-context/governance-exception-register.md`

### Tooling / validators

- `scripts/scaffold-workflow.js`
- `scripts/validate-workflow.js`
- `scripts/validate-workflow-artifact-names.js`
- `scripts/validate-workflow-governance.js`
- `scripts/run-workflow-governance-fixtures.js`

### CI

- `.github/workflows/workflow-guardrails.yml`
- Job `workflow-tooling`
- Job `workflow-artifacts`

### Done criteria

- scaffold and validate workflow run via `npm`
- governance metadata/blocks are enforced
- `work-items/` is validated in CI
- a canonical sample work item exists

## Phase 1. SDD Materialization

### Goal

- turn `SDD` from a contract layer into a real, operable artifact
- make `BRD/SRS` the official source-of-truth for spec-driven delivery work items

### Framework / source

- the repo-native workflow backbone
- `spec-kit` thinking for quality/spec discipline

### Status

`DONE`

### Artifacts to materialize

- `product-specs/brd/<scope>.md`
- `product-specs/srs/<scope>.md`
- the `BRD` template
- the `SRS` template
- at least one work item with `sdd_mode=strict`

### Metadata / schema to add or pin

- `spec_refs.brd`
- `spec_refs.srs`
- `spec_status`
- requirement IDs such as `BRD-*`, `SRS-FR-*`, `SRS-NFR-*`, `SRS-UX-*`

### Integration into the workflow

- `s01-s02`: create or update `BRD`
- `s03-s04`: create or update `SRS`
- `s04`: pin `Spec Freeze`
- `s05-s07`: use `Spec Change` when a gap is found after freeze
- `s06`: materialize `SDD Traceability`
- `s08`: materialize `Spec Coverage`

### Tooling materialized

- `scripts/validate-workflow-sdd.js`
- `npm run validate:workflow:sdd`
- a strict sample work item at `work-items/sample-sdd-item/`

### CI materialized

- Job `workflow-sdd`

### Done criteria

- a real `product-specs/` exists in the repo
- `BRD/SRS` can be linked from `work-items/`
- requirement IDs are valid
- `Spec Freeze` is not bypassed at `s04`
- `Spec Coverage` can be concluded at `s08`

### Depends on

- Phase 0 complete

## Phase 2. Change Layer

### Goal

- materialize the `OpenSpec-style change management` layer
- clearly separate the current spec truth from the change package

### Framework / source

- `OpenSpec`

### Status

`DONE` baseline

### Artifacts to materialize

- `changes/<change-id>/proposal.md`
- `changes/<change-id>/design.md`
- `changes/<change-id>/tasks.md`
- `changes/<change-id>/spec-delta/brd.delta.md`
- `changes/<change-id>/spec-delta/srs.delta.md`
- `changes/<change-id>/execution/task-status.md`
- `changes/<change-id>/archive-metadata.md`

### Metadata / schema to add or pin

- `change_id`
- `change_status`
- `spec_delta_refs`
- `archive_status`

### Integration into the workflow

- `s01-s03`: determine the intent/change scope
- `s05`: `design.md` and `spec-delta` as input
- `s06`: `tasks.md` must trace to `change_id`
- `s08`: conclude `ready_to_archive` or not

### Tooling materialized

- `scripts/scaffold-change-package.js`
- `scripts/validate-workflow-change.js`
- `npm run scaffold:change`
- `npm run validate:workflow:change`

### CI materialized

- Job `workflow-changes`

### Done criteria baseline

- at least one complete change package
- `work-items/` and `changes/` connect via `change_id`
- `spec_delta_refs` point to a real delta
- archive readiness is reflected consistently in the note and the change package

### Depends on

- Phase 1 should complete first so a real `BRD/SRS` exists

## Phase 3. Execution Layer

### Goal

- turn the `execution runtime` from a reference into a runtime contract with real artifacts
- prepare for a `cc-sdd`-style implementer/reviewer/fixer rollout without breaking the backbone

### Framework / source

- `cc-sdd`

### Status

`DONE` baseline

### Artifacts to materialize

- `execution-policy`
- `worker-assignment`
- `worker-handoff-report`
- `merge-report`
- `execution-escalation` when needed

### Metadata / schema to add or pin

- `review_mode`
- `execution_roles`
- `verification_owner`
- entry conditions for `multi_agent`

### Integration into the workflow

- `s05`: may add `execution-policy`
- `s06`: split assignments if `multi_agent`
- `s07`: worker handoff and merge report
- `s08`: independent review or `auto_fix_loop`

### Tooling materialized

- `scripts/validate-workflow-execution.js`
- `npm run validate:workflow:execution`
- a `multi_agent` sample work item

### CI materialized

- Job `workflow-execution`

### Done criteria baseline

- at least one work item runs `multi_agent`
- `execution-policy` and `merge-report` are valid
- `review_mode` is actually used at `s08`

### Depends on

- Phase 1 stable
- Phase 2 can run the tail in parallel once the change package is clear

## Phase 4. Adaptive Planning

### Goal

- materialize the `BMAD` layer at routing and planning-depth level
- keep one backbone but vary artifact/gate depth by scope

### Framework / source

- `BMAD-METHOD`

### Status

`DONE` baseline

### Metadata / schema to add or pin

- `planning_track: quick|full|enterprise`

### Artifacts and rules to materialize

- a routing matrix by `work_item_type`, boundary count, release/runtime risk, and governance profile
- a scaffold preset for each track
- `quick`, `full`, `enterprise` samples

### Integration into the workflow

- `quick`: condense the depth of `s01-s06`
- `full`: run the full `BRD/SRS`
- `enterprise`: add review/signoff lanes and evidence at `s04-s08`

### Tooling materialized

- `scripts/validate-workflow-planning.js`
- `npm run validate:workflow:planning`

### CI materialized

- Job `workflow-planning`

### Done criteria baseline

- scaffold can pick a planning track
- the validator catches artifact depth that does not match the track
- one workflow backbone produces different depth under `quick/full/enterprise` per the rule

### Depends on

- Phase 1 should complete first
- Phase 3 should have basic execution/runtime metadata

## Phase 5. Hardening

### Goal

- lock long-term quality
- reduce drift across docs, scaffold, validators, and CI

### Status

`DONE` baseline

### Items materialized at baseline

- CI phase 3 `workflow-authoring-smoke`
- deeper authority enforcement for `approved_by`
- deeper state/gate enforcement for `governance_status`
- regression fixtures for the new authority/state rules

### Remaining items

- deeper stale `governance-exception` checks
- drift checks across docs/reference/scaffold/validator when needed
- deeper semantic lint for evidence and traceability

### Rollout Decision

- `workflow-authoring-smoke` was implemented after `change`, `execution`, and `planning` stabilized at baseline.
- Current hardening locks drift at the mechanical level first; deeper semantic lint is a later phase.

### Tooling materialized at baseline

- a smoke script for `scaffold -> validate`
- deeper validator rules for governance authority/state
- fixture fail cases for the new authority/state rules

### CI materialized at baseline

- Job `workflow-authoring-smoke`
- optional drift-check jobs

### Done criteria

- scaffold regressions are caught in CI
- governance exceptions/waivers are not forgotten
- contract drift between docs and tooling drops to an acceptable level

## Target Command Surface

| Command | Role | Phase |
|---|---|---|
| `npm run scaffold:workflow` | scaffold the workflow backbone | 0 |
| `npm run scaffold:workflow-step` | scaffold each step | 0 |
| `npm run validate:workflow` | naming + governance + canonical root validation | 0 |
| `npm run validate:workflow:fixtures` | regression suite for governance tooling | 0 |
| `npm run validate:workflow:sdd` | validate `BRD/SRS`, freeze, traceability, coverage | 1 |
| `npm run scaffold:change` | create a change package | 2 |
| `npm run validate:workflow:change` | validate a change package and its link to a work item/spec | 2 |
| `npm run validate:workflow:execution` | validate the execution runtime contract | 3 |
| `npm run validate:workflow:planning` | validate the planning track | 4 |
| `npm run validate:workflow:authoring-smoke` | smoke test `scaffold -> validate` across representative cases | 5 |

## Control Board By Phase

| Phase | Name | Current priority | Current status |
|---|---|---|---|
| 0 | Backbone + Governance | done | `DONE` |
| 1 | SDD Materialization | baseline done | `DONE` |
| 2 | Change Layer | baseline done | `DONE` |
| 3 | Execution Layer | baseline done | `DONE` |
| 4 | Adaptive Planning | baseline done | `DONE` |
| 5 | Hardening | baseline done | `DONE` |

## Operational Conclusion

If the goal is to bring the current workflow to the target architecture and control the roadmap:

- do not add more governance first
- `Phase 1: SDD Materialization` has a real baseline in the repo
- `Phase 2: Change Layer` also has a real baseline in the repo
- `Phase 3: Execution Layer` also has a real baseline in the repo
- `Phase 4: Adaptive Planning` also has a real baseline in the repo
- `Phase 5: Hardening` has a real baseline in the repo
- `workflow-authoring-smoke` is in CI and the authoring flow is smoke-tested end-to-end
- only after the spec and change layers are stable should autonomy increase at the execution layer

Read this document together with:

- `references/target-architecture.md`
- `references/spec-driven-development.md`
- `references/sdd-merge-strategy.md`
- `references/workflow-ci-enforcement.md`