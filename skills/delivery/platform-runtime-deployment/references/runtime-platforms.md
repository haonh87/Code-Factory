---
language: en
---

# Runtime Platforms

> Vietnamese: runtime-platforms.vi.md

## Docker

- Fits simple, single-host environments with little orchestration.
- The deployment unit is usually a container or compose project.
- Rollout is usually recreate or a controlled script.
- Needs clear guards for restart policy, mounted config, and log collection.

## Docker Swarm

- Fits when the team runs multi-host but wants to stay in the Docker-native ecosystem.
- The deployment unit is usually a service or stack.
- Rolling update is built in, but you must lock update config, rollback config, and health behavior.
- Secrets and configs should use Swarm native primitives when possible.

## Kubernetes

- Fits when you need scheduling, policies, autoscaling, and diverse workload types.
- The deployment unit can be a Deployment, StatefulSet, DaemonSet, Job, CronJob, or Helm release.
- Config, secret, service account, ingress, and autoscaling should be described clearly instead of just "deploy to k8s".
- Rollout strategy can be rolling, blue-green, or canary depending on the controller and tooling.

## Platform Selection Rule

- Choose a platform the team can operate; do not choose one only because it is popular.
- If the workload is simple and small in scale, `docker` may suffice.
- If you need multi-host but not the full complexity of K8s, consider `swarm`.
- If you need policies, autoscaling, a service mesh, diverse workloads, or a locked organizational standard, use `k8s`.