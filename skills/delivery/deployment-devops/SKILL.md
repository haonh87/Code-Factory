---
language: en
name: deployment-devops
description: Coordinate DevOps end-to-end from local to dev, uat, prod by selecting and combining the packaging, runtime deployment, and CI/CD release skills. Use when you need to lock the overall DevOps direction, split scope between Dockerfile or compose, runtime deploy on Docker or Swarm or Kubernetes, and pipeline or promotion or rollback controls for release.
---

# Deployment DevOps

> Vietnamese: SKILL.vi.md

Coordinate the overall DevOps direction so the application can be packaged, deployed, and promoted consistently from local to the target environments.

## Goal

- Lock the overall DevOps scope at the work-item level.
- Force local to have a standard containerized baseline when the scope requires it.
- Choose the right specialized skill for packaging, runtime deploy, and pipeline release.
- Tie together the environment matrix, promotion flow, rollout strategy, rollback strategy, and release readiness.
- Produce a clear handoff for the design, task breakdown, implement, and verify steps.

## When To Use

- When the user asks to "do DevOps" at an overall level without splitting layers clearly.
- When you need to determine which scope belongs to packaging, which layer to runtime deploy, and which to CI/CD release.
- When a work item has both local containers, runtime deploy, and a promotion or approval flow.
- When the verify step needs to conclude overall release readiness instead of only one narrow area.

## Out Of Scope

- Does not replace `implementation` for writing the real files in the codebase.
- Does not replace `testing` for unit, integration, database, or feature tests.
- Does not impose an infrastructure platform if the project lacks clear constraints.
- Does not replace the specialized skills when the layer to handle is already clear.
- Does not treat a production rollout as safe just because a manifest, compose, or pipeline already exists.

## Minimum Input

- `recommended_design`
- `acceptance_criteria`
- `application_runtime_requirements`
- `environment_constraints`
- `delivery_targets`
- `operational_context`

## Required Output

Emit a YAML artifact using the following schema:

```yaml
deployment_scope: ""
devops_objectives: []
environment_matrix:
  - environment: local|dev|uat|prod
    concerns: []
    runtime_target: ""
specialized_followups:
  - skill: containerization-packaging|platform-runtime-deployment|ci-cd-release
    reason: ""
    outputs_expected: []
cross_cutting_guards: []
evidence_or_gaps: []
release_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation_or_release: ""
```

## Meaning Of Each Output

- `deployment_scope`: the DevOps part being handled at an overall level.
- `devops_objectives`: the main DevOps objectives of the work item.
- `environment_matrix`: maps each environment to its main concerns and expected runtime target.
- `specialized_followups`: the specialized skills to call next.
- `cross_cutting_guards`: guards applied across packaging, runtime, and release.
- `evidence_or_gaps`: existing evidence or gaps that block release.
- `release_recommendation`: the final readiness conclusion.
- `notes_for_implementation_or_release`: handoff for the implement step or execution release.

## Normalizing Output In A Workflow Note

- If deployment is only part of step 5, use this skill to lock the overall DevOps scope and link to a sub-note of the specialized skill if needed.
- At step 6, use this skill's output to decide which task belongs to packaging, which to runtime, and which to pipeline.
- At step 8, when the scope has packaging or rollout, you may place this skill's schema as the overview block for `## Deployment Review`, with related detailed schemas as needed.
- If materializing a separate `.md` note, use `obsidian-markdown` and link from the matching step instead of replacing the main workflow note.

## Execution Flow

1. Determine which environments are truly in scope: `local`, `dev`, `uat`, `prod`.
2. Split concerns by 3 layers: packaging, runtime deploy, CI/CD release.
3. Call the right specialized skill for each layer that needs deep locking.
4. Aggregate the environment matrix, promotion flow, and operational guards across the whole.
5. Conclude `READY`, `READY_WITH_GUARDS`, or `BLOCKED`.

## Decision Rule

- `READY` when `environment_matrix` is complete, every `specialized_followups` entry has resolved with no open item in `evidence_or_gaps` affecting release.
- `READY_WITH_GUARDS` when release is possible but `cross_cutting_guards` carries an explicit condition (for example a manual gate before `prod`, or a temporary monitoring-only rollback while a full rollback path is being built).
- `BLOCKED` when any specialized skill's own `packaging_recommendation`/`runtime_recommendation`/`pipeline_recommendation` is `BLOCKED`, or `evidence_or_gaps` has an unresolved item that affects release.

## Environment Rules

- `local` must have a containerized baseline if the work item requires running by container.
- `dev` should favor fast, observable, easy-to-reset rollouts.
- `uat` must follow the same artifact contract as `prod` when the release flow needs near-production verification.
- `prod` must have a clear rollout strategy, rollback strategy, and post-deploy verification.
- Do not bake secrets or environment-specific values into the image.
- Do not create a separate build per environment without a very clear compliance reason.

## Reference Docs

Read the right file as needed:

- `references/devops-skill-map.md`: when you need to choose the right specialized skill.
- `references/local-docker.md`: when you need the local container baseline pattern.
- `references/runtime-targets.md`: when you need to pick a runtime target per environment.
- `references/promotion-flow.md`: when you need the canonical environment gates, rollout strategy, rollback rule, and BLOCKED signs (also owns tagging cross-reference to `../ci-cd-release/references/promotion-controls.md`).
- `../containerization-packaging/SKILL.md`: when you need to lock packaging by language and workload.
- `../platform-runtime-deployment/SKILL.md`: when you need to lock runtime deploy by platform.
- `../ci-cd-release/SKILL.md`: when you need to lock pipeline, tagging, promotion, and approval.

## Completion Conditions

- A complete `environment_matrix` for every environment in scope.
- Clear `specialized_followups` with no vague overlap.
- `cross_cutting_guards` sufficient for the next step to implement and verify.
- A clear `release_recommendation` that states the `evidence_or_gaps`.