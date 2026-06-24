---
language: en
---

# Local Docker Baseline

> Vietnamese: local-docker.vi.md

## Goal

Create a local baseline close enough to production that a developer can build, boot, debug, and verify quickly by container.

## Dockerfile Checklist

- Use a multi-stage build if the project has a separate build step.
- Build a minimal image containing only the needed runtime.
- Do not run the process as the `root` user unless there is a forced reason.
- Do not copy the whole workspace if you can limit it with `.dockerignore`.
- Do not put secrets into fixed `ARG` or `ENV` in the image.
- Record `WORKDIR`, entrypoint, or startup command clearly.
- Declare `EXPOSE` for the port that actually serves internal traffic or debugging.
- Add a `HEALTHCHECK` if the runtime supports it and the service has a fitting endpoint.

## compose.yaml Checklist

- Use the standard file name `compose.yaml`.
- Declare the main service and the helper dependencies needed locally, such as a database, cache, or fake queue.
- Only map ports that truly need to be exposed to the developer.
- Use named volumes or intentional bind mounts; avoid blindly mounting the whole filesystem unless hot reload needs it.
- Use `depends_on` with a sensible health behavior; do not assume a helper service is ready the moment the container starts.
- Use `env_file` or runtime environment variables for non-secret config.
- Do not commit real secrets into the compose file.
- Use `profiles` when local has multiple modes such as `app-only`, `full-stack`, `worker`.

## Minimum Verification

- `docker build` succeeds from the locked `build_context`.
- `docker compose config` renders successfully.
- `docker compose up` boots the main service and dependencies in the default profile.
- A local health endpoint or smoke check confirms the app actually receives requests or processes jobs.
- Startup logs show no clear blocking errors.

## Handoff To Step 7

- Files to materialize: `Dockerfile`, `compose.yaml`, `.dockerignore`, an env template file if any.
- If local needs a bootstrap script, treat it as an auxiliary artifact; it does not replace `compose.yaml`.