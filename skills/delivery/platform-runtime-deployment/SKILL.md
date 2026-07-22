---
language: en
name: platform-runtime-deployment
description: Design and standardize runtime deployment for dev, uat, prod environments on Docker, Docker Swarm, or Kubernetes. Use when you need to lock deployment units, networking, config/secrets, storage, scaling, ingress, rollout/rollback strategy, observability guards, or deployment topology by workload and statefulness level.
---

# Platform Runtime Deployment

> Vietnamese: SKILL.vi.md

Lock the topology and operational guards for runtime deployment by target platform.

## Goal

- Choose the right runtime deployment among `docker`, `swarm`, `k8s`.
- Lock deployment units, networking, config/secrets, storage, and scaling strategy.
- Determine rollout, rollback, and observability guards for each environment.
- Clearly distinguish stateless and stateful workloads at the runtime level.

## When To Use

- When you need to map `dev`, `uat`, `prod` to a concrete runtime.
- When you need to standardize manifests/stacks/deployment topology.
- When you need to lock ingress, service discovery, secret sources, volumes, or autoscaling.
- When rollout depends heavily on stateful concerns, health policies, or workload behavior.

## Out Of Scope

- Does not decide how to package artifacts by language; that belongs to `containerization-packaging`.
- Does not design the build/promote/approval pipeline; that belongs to `ci-cd-release`.
- Does not replace real execution rollout on infrastructure.

## Minimum Input

- `environment_targets`
- `workload_profile`
- `statefulness_profile`
- `network_requirements`
- `operational_constraints`

## Required Output

Emit a YAML artifact using the following schema:

```yaml
deployment_scope: ""
runtime_matrix:
  - environment: dev|uat|prod
    runtime: docker|swarm|k8s
    deployment_unit: ""
    topology: ""
    networking: []
    config_strategy: []
    secret_strategy: []
    storage_strategy: []
    scaling_strategy: []
runtime_artifacts:
  - environment: ""
    files_expected: []
operational_policies:
  health_policies: []
  observability_controls: []
  resource_controls: []
  disruption_controls: []
rollout_and_rollback:
  - environment: ""
    rollout_strategy: ""
    preconditions: []
    post_deploy_checks: []
    rollback_steps: []
platform_risks: []
runtime_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation_or_ops: ""
```

## Main Rules

- `uat` should follow a topology as close to `prod` as possible if the goal is release verification.
- Different runtimes between `uat` and `prod` must be explained clearly.
- Stateful workloads must have a `storage_strategy`, `rollback_steps`, and data guards.
- Do not use the same pattern for `docker`, `swarm`, `k8s` if the platform semantics differ.

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:

- At step 5, place this skill's YAML schema inside `## Architecture Details` alongside any other DevOps schema in scope.
- At step 8, when the scope has packaging or rollout, place this skill's schema inside `## Deployment Review` next to `deployment-devops` and the other specialized DevOps schemas present.
- Do not replace `## Main Artifact`; this skill's output is always a supporting DevOps block, never the step's main artifact.

## Decision Rule

- `READY` when `runtime_matrix` is complete for every environment in scope, `rollout_and_rollback` is defined for each of them, and every stateful workload has a `storage_strategy` and `rollback_steps`.
- `READY_WITH_GUARDS` when runtime deploy is possible but carries an explicit guard (for example `uat` diverging from `prod` topology with a recorded reason, a manual scaling step, or autoscaling deferred with a tracked follow-up).
- `BLOCKED` when a stateful workload has no `storage_strategy` or `rollback_steps`, or an in-scope environment's runtime target (`docker`/`swarm`/`k8s`) cannot yet be determined.

## Reference Docs

- `references/runtime-platforms.md`: patterns for Docker, Swarm, Kubernetes.
- `references/stateful-networking.md`: guards for storage, networking, ingress, secrets, scaling.

## Completion Conditions

- A `runtime_matrix` for every environment in scope.
- A `rollout_and_rollback` clear enough for the target environment.
- `operational_policies` and `platform_risks`.