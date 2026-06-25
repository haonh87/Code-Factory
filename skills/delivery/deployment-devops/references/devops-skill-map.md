---
language: en
---

# DevOps Skill Map

> Vietnamese: devops-skill-map.vi.md

## When To Use `deployment-devops`

Use this skill when you need to look at DevOps as a whole picture:

- the work item touches many environments
- there is packaging, runtime deploy, and pipeline/release at once
- it is not clear which layer to split concerns by

## When To Use `containerization-packaging`

Use when the focus is:

- `Dockerfile`
- `.dockerignore`
- `compose.yaml`
- base image
- build stage
- entrypoint
- healthcheck
- packaging by Node.js, Python, Java, .NET, Go, PHP

## When To Use `platform-runtime-deployment`

Use when the focus is:

- Docker vs Swarm vs Kubernetes
- deployment unit
- ingress
- secrets/config
- volume
- scaling
- stateful concerns
- rollout/rollback at the runtime level

## When To Use `ci-cd-release`

Use when the focus is:

- CI/CD pipeline
- registry
- tagging
- artifact immutability
- promotion flow
- approval
- release gate
- rollback control at the pipeline/release level

## Coordination Rule

- If only one concern stands out, call the matching specialized skill directly.
- If concerns overlap or the user says "do overall DevOps", start with `deployment-devops`.
- `deployment-devops` does not replace the 3 specialized skills; it is used to route and aggregate.