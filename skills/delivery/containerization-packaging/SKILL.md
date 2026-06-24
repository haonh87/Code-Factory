---
language: en
name: containerization-packaging
description: Design and standardize application packaging by language, build system, and workload type. Use when you need to create or update a Dockerfile, .dockerignore, or compose.yaml for local use, choose a base image, multi-stage build, entrypoint, healthcheck, build cache, or a packaging contract for Node.js, Python, Java, .NET, Go, PHP, and workloads such as web API, worker, cron, or static frontend.
---

# Containerization Packaging

> Vietnamese: SKILL.vi.md

Lock the contract for packaging an application into a container by language stack and actual workload.

## Goal

- Choose a `Dockerfile` strategy that fits the language and build system.
- Standardize `compose.yaml` for local use if the scope needs containers on a dev machine.
- Lock entrypoint, command, port, healthcheck, artifact copy, and cache strategy.
- Reduce drift between local build, CI, and deploy environments.
- Produce input clear enough for the implement step to materialize runtime container files.

## When To Use

- When you need to create or edit a `Dockerfile`, `.dockerignore`, or `compose.yaml`.
- When you need to decide base image, multi-stage build, the user running the container, entrypoint, or healthcheck.
- When packaging depends heavily on language, framework, build artifact, or workload.
- When you need a local baseline for a web app, API, worker, cron, static frontend, or monolith.

## Out Of Scope

- Does not choose runtime deployment for `dev`, `uat`, `prod`; that belongs to `platform-runtime-deployment`.
- Does not design the CI/CD pipeline; that belongs to `ci-cd-release`.
- Does not replace `implementation` for writing the real files in the repo.

## Minimum Input

- `language_stack`
- `build_system`
- `application_type`
- `runtime_requirements`
- `local_dependency_needs`

## Required Output

Emit a YAML artifact using the following schema:

```yaml
packaging_scope: ""
language_profile:
  primary_language: ""
  framework: ""
  build_system: ""
  artifact_type: ""
workload_profile: web_api|worker|cron|frontend_static|monolith|microservice
dockerfile_contract:
  file_path: ""
  build_context: ""
  base_images: []
  stages: []
  build_args: []
  artifact_paths: []
  entrypoint: ""
  command: ""
  exposed_ports: []
  run_as_non_root: true|false
dockerignore_rules: []
local_compose_contract:
  required: true|false
  file_path: ""
  services: []
  env_files: []
  volumes: []
  profiles: []
build_optimizations: []
security_guards: []
verification_checks: []
packaging_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation: ""
```

## Main Rules

- The `Dockerfile` must reflect the real build artifact and startup command of the application.
- Prefer multi-stage builds when there is a separate compile or bundle step.
- Do not copy the whole workspace into the image if only a part is needed.
- Do not bake secrets into the image.
- If local needs helpers like a database, cache, or queue, describe them in `compose.yaml` instead of just noting "run by hand".
- `frontend_static` and `web_api` should not use the same entrypoint pattern if the runtime artifact differs.

## Reference Docs

- `references/language-stacks.md`: choose a packaging pattern by Node.js, Python, Java, .NET, Go, PHP.
- `references/workload-profiles.md`: choose a pattern by web API, worker, cron, static frontend, monolith.

## Completion Conditions

- A clear `language_profile` and `workload_profile`.
- A `dockerfile_contract` sufficient to implement the real file.
- A `local_compose_contract` when local needs to run by container.
- `verification_checks` sufficient for step 8 to verify packaging.