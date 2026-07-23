---
language: en
name: ci-cd-release
description: Design and standardize CI/CD pipelines, artifact flow, and release promotion across local, dev, uat, prod. Use when you need to lock build pipelines, quality gates, image registries, tagging strategy, promotion flow, approval controls, release checklists, rollback controls, or map the process for GitHub Actions, GitLab CI, Jenkins, Azure DevOps, or equivalent platforms.
---

# CI/CD Release

> Vietnamese: SKILL.vi.md

Lock the pipeline and controls for the build, verify, publish, promote, and release flow.

## Goal

- Standardize quality gates from build to release.
- Lock the tagging strategy and artifact immutability.
- Describe promotion across `dev`, `uat`, `prod` clearly.
- Lock approval, rollout controls, rollback controls, and release evidence.

## When To Use

- When you need to design or fix a CI/CD pipeline.
- When you need to decide registry, tagging, provenance, or promotion strategy.
- When you need to map release controls onto GitHub Actions, GitLab CI, Jenkins, Azure DevOps, or equivalent tools.
- When you need to separate pre-merge, pre-release, and post-deploy gates.

## Out Of Scope

- Does not choose the Dockerfile pattern by language; that belongs to `containerization-packaging`.
- Does not choose the runtime topology; that belongs to `platform-runtime-deployment`.
- Does not replace real technical verification on the codebase.

## Minimum Input

- `source_control_context`
- `artifact_contract`
- `quality_gate_requirements`
- `environment_promotion_targets`
- `release_constraints`

## Required Output

Emit a YAML artifact using the following schema:

```yaml
pipeline_scope: ""
source_strategy:
  branch_model: ""
  triggers: []
build_and_verify:
  stages: []
  cache_strategy: []
  required_checks: []
artifact_flow:
  registry: ""
  artifact_types: []
  tagging_strategy: []
  provenance_controls: []
promotion_flow:
  - from: local|dev|uat
    to: dev|uat|prod
    conditions: []
    automation_level: ""
approval_controls: []
release_controls:
  pre_release: []
  post_release: []
rollback_controls: []
pipeline_risks: []
pipeline_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation_or_ops: ""
```

## Main Rules

- Release tags must be immutable; do not use `latest` as the source of truth.
- Promotion should run on the same artifact contract that was built and verified.
- Approval and rollout controls for `prod` must be recorded clearly, not left as vague "manual".
- Pre-merge gates and pre-release gates are two different tiers; do not merge them if the risks differ.

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:

- At step 5, place this skill's YAML schema inside `## Architecture Details` alongside any other DevOps schema in scope.
- At step 8, when the scope has packaging or rollout, place this skill's schema inside `## Deployment Review` next to `deployment-devops` and the other specialized DevOps schemas present.
- Do not replace `## Main Artifact`; this skill's output is always a supporting DevOps block, never the step's main artifact.

## Decision Rule

- `READY` when quality gates, tagging strategy, promotion flow, and rollback controls are all locked with evidence, and none of the `BLOCKED` triggers below apply.
- `READY_WITH_GUARDS` when the pipeline can run but only with an explicit guard recorded in `approval_controls` or `release_controls` (for example a temporary manual approval step, a staged rollout, or a tracked follow-up).
- `BLOCKED` when there is no immutable tag/registry strategy yet, no clear runtime target for the promotion destination, no post-deploy verification check, or no viable rollback path for an important environment — see `references/promotion-controls.md` and `../deployment-devops/references/promotion-flow.md § Signs Of BLOCKED` for the canonical trigger list.

## Reference Docs

- `references/pipeline-stages.md`: pipeline structure, build, test, publish.
- `references/promotion-controls.md`: tagging, promotion, approval, rollback, release checklist.

## Completion Conditions

- A clear `build_and_verify`.
- A clear `artifact_flow` and `promotion_flow`.
- `approval_controls`, `release_controls`, `rollback_controls`.
- A `pipeline_recommendation` and `pipeline_risks`.