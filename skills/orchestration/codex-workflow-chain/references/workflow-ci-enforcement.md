---
language: en
---

# Workflow CI Enforcement Design

> Vietnamese: workflow-ci-enforcement.vi.md

This document describes the design for `CI enforcement` of workflow tooling in the repo.

Cross-reference date: `2026-04-13`.

Status:

- this is a `design + current-state` document
- phase 1 is materialized at `.github/workflows/workflow-guardrails.yml`
- phase 2 is materialized in the same workflow file with the `workflow-artifacts` job
- `workflow-sdd` is materialized as a dedicated CI job for `BRD/SRS`, `Spec Freeze`, `SDD Traceability`, and `Spec Coverage`
- `workflow-changes` is materialized as a dedicated CI job for `change_id`, `spec_delta_refs`, `archive_status`, and the change package root `changes/`
- `workflow-execution` is materialized as a dedicated CI job for `multi_agent`, runtime artifacts, and `review_mode`
- `workflow-planning` is materialized as a dedicated CI job for `planning_track` and the routing presets `quick|full|enterprise`
- `workflow-authoring-smoke` is materialized as a dedicated CI job for the `scaffold -> validate` flow
- the governance validator now enforces a baseline for authority/state and register consistency, not just basic block/metadata checks
- the goal is to pin clearly what CI must do, must not do, which commands it runs, and where it fails

## Goals

- turn workflow tooling from "docs + local command" into "a standard that is enforced automatically"
- use the existing command surface via `npm`
- check `naming`, `governance`, the fixture suite, and real workflow artifacts once materialized
- check the `SDD` contract when the repo has `product-specs/` and a work item with `sdd_mode=light|strict`
- check the `change layer` contract when the repo has `changes/` and a work item with a `change_id`
- check the `execution layer` contract when the repo has runtime artifacts and a work item with `execution_mode=multi_agent`
- check the `adaptive planning` contract when the repo has a `planning_track`
- do not create a new business workflow beyond the eight-step backbone
- `work-items/` is the canonical artifact root for real workflow artifacts from phase 2 onward

## The Role Of CI Enforcement

In this repo:

- the `s01 -> s08` workflow backbone decides steps, gates, signoffs, and handoffs
- `CI enforcement` is the automated operational layer that checks whether workflow artifacts comply with the contract

CI enforcement does not replace:

- `DoR`
- `DoD`
- release signoff
- `business_acceptance`
- the judgment of `po|ba|designer|developer|qc|devops`

CI enforcement only checks what a machine can clearly confirm.

## What CI Must Enforce

### 1. Workflow Tooling Baseline

CI must run the standard command:

```bash
wfc fixtures
```

Purpose:

- protect the validator from regression
- protect the fixture suite from drift
- confirm that `pass cases` still pass and `expected fail cases` still fail

### 2. Workflow Artifact Contract

When the repo has real workflow artifacts, CI must run:

```bash
wfc validate --workflow-root work-items --project-root .
```

Purpose:

- check filenames against the step contract
- check required frontmatter
- check `governance_ref`, `governance_profile`, `governance_status`, `checklist_refs`
- check per-step governance blocks
- check exceptions or waivers and the register when needed

### 3. Change Layer Contract

When the repo has a real change package, CI must run:

```bash
wfc change --workflow-root work-items --project-root .
```

Purpose:

- check `change_id`, `change_status`, `archive_status`
- check that `spec_delta_refs` point to a real delta
- check the change package root `changes/<change-id>/`
- check that `proposal`, `design`, `tasks`, `spec-delta`, and `archive-metadata` are present and match `change_id`

### 4. Authoring Flow Integrity

CI must ensure that artifacts scaffolded or hand-authored still pass the same standard command.

This keeps the flow:

```text
scaffold -> edit -> validate -> review
```

from drifting between local and CI.

## What CI Should Not Enforce

CI should not decide:

- whether the business goal is strong enough
- whether the technical approach is optimal
- whether the acceptance criteria match stakeholder intent
- whether residual risk is acceptable from a business perspective

Reason:

- these are the judgment layer
- they must be concluded by the role owner and the signoff owner

## Standard Command Surface

CI should only call the standard commands via `npm`.

Current command list:

- `npm run scaffold:change`
- `npm run scaffold:workflow`
- `npm run scaffold:workflow-step`
- `npm run validate:workflow`
- `npm run validate:workflow:naming`
- `npm run validate:workflow:governance`
- `npm run validate:workflow:sdd`
- `npm run validate:workflow:change`
- `npm run validate:workflow:execution`
- `npm run validate:workflow:planning`
- `npm run validate:workflow:fixtures`

Principles:

- do not call the PowerShell validator as the main runtime
- do not let local and CI use two different command surfaces
- `npm` is the single entrypoint for workflow tooling

## Job Design

### Job 1. `workflow-tooling`

Goal:

- check workflow tooling itself

Minimum command:

```bash
npm run validate:workflow:fixtures
```

Passes when:

- all `valid-*` fixtures pass
- all `invalid-*` fixtures fail as expected

Fails when:

- validator logic changes incorrectly
- a fixture is broken
- naming/governance contract drift occurs

### Job 2. `workflow-artifacts`

Goal:

- check the repo's real workflow artifacts

Enable condition:

- the repo has pinned `work-items/` as the canonical artifact root and started materializing real workflow artifacts there

Minimum command:

```bash
npm run validate:workflow -- --workflow-root work-items --project-root .
```

Passes when:

- artifact naming is correct
- frontmatter matches the contract
- governance metadata and blocks pass the validator

Fails when:

- a newly created artifact has wrong naming
- a note lacks frontmatter
- governance is not materialized per the rule

### Job 3. `workflow-sdd`

Goal:

- check `BRD/SRS` and the `SDD` contract on work items with `sdd_mode`

Minimum command:

```bash
npm run validate:workflow:sdd -- --workflow-root work-items --project-root .
```

Passes when:

- `spec_refs.brd` and `spec_refs.srs` point to real product specs
- `spec_status` is valid
- the `Spec Freeze`, `SDD Traceability`, and `Spec Coverage` blocks are present on the right steps
- the canonical SDD sample passes the validator

Fails when:

- an SDD work item points to a non-existent spec
- `BRD/SRS` lacks IDs or minimum metadata
- step 4 or step 8 is missing a required SDD block

### Job 4. `workflow-changes`

Goal:

- check the change package and the link from the work item to `changes/`

Minimum command:

```bash
npm run validate:workflow:change -- --workflow-root work-items --project-root .
```

Passes when:

- the work item has a `change_id` pointing to a real package
- `spec_delta_refs` exist
- archive readiness is not contradictory between the workflow note and the change package

Fails when:

- a required file is missing in the change package
- `change_id` has the wrong pattern or no corresponding root
- a `verified` change still has `archive_status=not_ready`

### Job 5. `workflow-execution`

Goal:

- check the `multi_agent` runtime contract and real runtime artifacts

Minimum command:

```bash
npm run validate:workflow:execution -- --workflow-root work-items
```

Passes when:

- `multi_agent` only appears on rolled-out steps
- `review_mode` and `verification_owner` are valid
- required runtime artifacts exist and link back from the main note

Fails when:

- `execution-policy`, `worker-assignment`, `worker-handoff-report`, or `merge-report` is missing
- `multi_agent` has no execution roles or verification owner
- step 8 uses `multi_agent` but still has `review_mode=self`

### Job 6. `workflow-planning`

Goal:

- check `planning_track` and the `quick|full|enterprise` routing preset

Minimum command:

```bash
npm run validate:workflow:planning -- --workflow-root work-items
```

Passes when:

- `planning_track` is valid and consistent within each work item
- `quick` does not escalate into heavy ceremony
- `enterprise` has the governance/review lane appropriate at delivery steps

Fails when:

- a single work item has multiple `planning_track` values
- `quick` uses `multi_agent` or `review_mode=self` in a way that breaks the rule
- `enterprise` still has governance or review lanes that are too light

### Job 7. `workflow-authoring-smoke`

This job was materialized in the hardening phase after the scaffold contract stabilized across `change`, `execution`, and `planning`.

Goal:

- protect the scaffolder

Sample smoke flow:

1. stand up a minimal temp project root
2. scaffold representative cases:
   - full baseline
   - quick single-step
   - enterprise multi-agent
   - strict SDD + change
3. run the matching validator on each case's output

Goals:

- confirm the scaffold template always produces valid output from the start
- catch regressions when scaffold, validator, or default presets drift apart

## Trigger Design

### Pull Request

The current implementation runs:

- `workflow-tooling`
- `workflow-artifacts`
- `workflow-sdd`
- `workflow-changes`
- `workflow-execution`
- `workflow-planning`
- `workflow-authoring-smoke`

Role:

- block drift before merge

### Push To `main`

The current implementation reruns `workflow-tooling`, `workflow-artifacts`, `workflow-sdd`, `workflow-changes`, `workflow-execution`, `workflow-planning`, and `workflow-authoring-smoke` to protect the main branch.

### Manual Dispatch

Should be added later to:

- rerun CI when you only want to audit workflow tooling
- support migration or cleanup of old artifacts

## Fail Policy

CI should fail hard when:

- the fixture suite fails
- a validator script fails
- a real workflow artifact fails the contract

CI should not merely warn on the mechanical rules above, because that defeats the purpose of enforcement.

## Path Scope Design

### Phase 1

Only enforce:

- `scripts/`
- `packages/workflow-bundle/tests/fixtures/workflow-governance/`
- workflow/governance reference docs when they break the tooling contract

In practice this phase mostly runs `validate:workflow:fixtures`.

### Phase 2

Turn on real artifacts as well:

- `work-items/`

### Phase 3

Optionally optimize by changed paths:

- if only workflow tooling or fixtures changed, run `workflow-tooling`
- if real artifacts changed, also run `workflow-artifacts`
- if `product-specs/` changed, also run `workflow-sdd`
- if `changes/` or a work item with `change_id` changed, also run `workflow-changes`
- if runtime artifacts or a work item with `execution_mode=multi_agent` changed, also run `workflow-execution`
- if `planning_track`, the routing doc, or sample planning items changed, also run `workflow-planning`

At the current stage, early optimization is not needed; prioritize simplicity and stability.

## Dependency Design

CI only needs:

- `node`
- `npm`

It should not depend on:

- `pwsh`
- OS-specific local tooling

Reason:

- the repo has unified workflow tooling through Node/npm
- this reduces differences between macOS, Linux, Windows, and the CI runner

## Mapping To The Current Workflow

| Component | Role |
|---|---|
| `s01-s08` | the business workflow backbone |
| `governance pack` | the rule source-of-truth |
| `scaffold` | the authoring entrypoint |
| `validate` | the local guardrail |
| `CI enforcement` | automating the guardrail in PR/push |

In short:

- `scaffold` helps create it correctly from the start
- `validate` helps check locally
- `CI enforcement` ensures no one skips that check on merge

## Rollout Design

### Phase A. Tooling CI

Turn on only:

- `workflow-tooling`

Goal:

- stabilize the validator + fixture suite first

### Phase B. Artifact CI

Once a real artifact directory exists, also turn on:

- `workflow-artifacts`
- `workflow-sdd`
- `workflow-changes`
- `workflow-execution`
- `workflow-planning`

Goal:

- enforce the contract on the workflow's real output, `BRD/SRS`, and change packages

### Phase C. Authoring Smoke

Once the scaffolder is stable, add:

- `workflow-authoring-smoke`

Goal:

- prevent regressions in the template/generator

## Recommended CI File Design

The current phase-1 CI file is:

```text
.github/workflows/workflow-guardrails.yml
```

This name reflects the role correctly:

- it is not a release pipeline
- it is not general app CI
- it is a guardrail for workflow tooling and workflow artifacts

## Definition of Done for CI Enforcement

Phase 1 is considered sufficient when:

- a real CI workflow file exists
- CI can run `npm run validate:workflow:fixtures`
- the main branch fails if the fixture suite fails
- docs point to the correct command and the correct CI scope

Phase 2 is considered sufficient when:

- real workflow artifacts under `work-items/` can be validated
- the local flow and the CI flow use the same command surface

The baseline change layer is considered sufficient when:

- real change packages under `changes/` can be validated
- `work-items/`, `product-specs/`, and `changes/` connect via `change_id` and `spec_delta_refs`

The baseline execution layer is considered sufficient when:

- real runtime artifacts under `work-items/` can be validated
- at least one canonical `multi_agent` sample passes the validator
- `review_mode` and `verification_owner` are actually used at step 8

The baseline adaptive planning is considered sufficient when:

- canonical `quick` and `enterprise` samples exist
- `planning_track` can be scaffolded and validated
- CI catches a routing-preset mismatch before merge

## Conclusion

CI enforcement in this repo should be understood as:

- an `automation guardrail` layer
- using the shared `npm` command
- protecting the `validator`, `fixture`, `scaffold`, and real workflow artifacts
- not replacing the judgment, signoff, or business gate of the workflow backbone