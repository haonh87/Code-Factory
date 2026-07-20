---
language: en
---

# Runtime Targets

> Vietnamese: runtime-targets.vi.md

## Cross-Environment Immutability

- The same image contract should be promoted from `dev` to `uat` and `prod`.
- Environment differences live in config, secrets, replicas, resources, ingress, and operational guards.
- A health check must exist at a level fitting the target runtime.
- Rollout and rollback must be described by the runtime's actual deployment unit.

## Runtime Matrix

| Runtime | When it fits | Common deployment unit | Config and secrets | Rollout / rollback |
|---|---|---|---|---|
| `docker` | Single machine, simple environment, few services | container or compose project | env file, mounted file, external secret manager if any | recreate or controlled script |
| `swarm` | Moderate multi-host, team wants Docker-native ops | service or stack | Swarm config/secret, overlay network | rolling update, rollback service or stack |
| `k8s` | Needs full orchestration, autoscaling, policies, strong ecosystem | Deployment, StatefulSet, Job, Helm release | ConfigMap, Secret, external secret operator, service account | rolling update, canary/blue-green by controller |

## Hints By Environment

- `local`: always start with `docker` using a `Dockerfile` and `compose.yaml`.
- `dev`: may use `docker`, `swarm`, or `k8s` depending on maturity and available infrastructure.
- `uat`: prefer a topology as close to `prod` as possible to verify the release.
- `prod`: use a runtime the team operates fluently; do not switch platforms just because of a trend.

## Mapping To Lock In environment_matrix

- `runtime`: `docker|swarm|k8s`
- `deployment_unit`: e.g. `compose project`, `swarm stack`, `k8s deployment`
- `artifacts_expected`: e.g. `Dockerfile`, `compose.yaml`, `stack.yaml`, `helm values`, `k8s manifests`
- `config_sources`: env file, mounted config, ConfigMap, parameter store
- `secret_sources`: secret manager, Swarm secret, K8s Secret, external secret operator

## Runtime Selection Rule

- Choose `docker` when the scope is small, operations are single-host, and orchestration needs are low.
- Choose `swarm` when the team is on a Docker-native multi-host setup and does not need the full K8s ecosystem.
- Choose `k8s` when you need scheduling, autoscaling, policies, diverse workload types, or a platform standard locked at the organization level.
- If `uat` and `prod` use different runtimes, state the reason and compatibility risk clearly.