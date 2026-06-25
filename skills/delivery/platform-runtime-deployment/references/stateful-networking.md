---
language: en
---

# Stateful, Networking, And Operational Guards

> Vietnamese: stateful-networking.vi.md

## Stateful Workload

- Lock volume, retention, backup, or snapshot clearly before an important rollout.
- App rollback and data rollback are not the same thing.
- If state migration is irreversible, raise the guard level and the release recommendation.

## Networking

- List the entrypoint, internal service communication, and required dependency networks.
- Lock ingress strategy, TLS termination, and service discovery at the right platform layer.
- Do not leave routing or port mapping vague in a production-like environment.

## Config And Secrets

- Config and secrets must be separated from the image.
- State the source clearly: env file, secret manager, Swarm secret, K8s Secret, or an external secret operator.
- Do not commit real secrets into the repo.

## Scaling And Disruption

- Stateless workloads can scale horizontally if the contract allows.
- Stateful workloads need clear rules on replicas, leader election, or partition tolerance.
- State readiness, liveness, and disruption controls clearly if rollout risks affecting traffic.

## Observability

- After deploy there must be a strong enough post-check: health, log, metric, queue lag, or business smoke.
- If there is no minimum observability, the release recommendation should not be `READY`.