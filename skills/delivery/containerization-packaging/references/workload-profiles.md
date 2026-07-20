---
language: en
---

# Packaging By Workload

> Vietnamese: workload-profiles.vi.md

## web_api

- Needs `exposed_ports`, a `healthcheck`, and a startup command that serves traffic.
- If the app depends on migrations, do not mix auto-running migrations into startup if it can cause downtime.

## worker

- Lock clearly the queue backend, concurrency model, and graceful shutdown behavior.
- A worker does not necessarily expose a port; avoid copying the web API pattern wholesale.

## cron

- Lock clearly whether the scheduler lives inside the container or is triggered by platform orchestration.
- If using a sidecar-style cron or a platform job, do not fake it with a vague sleep loop.

## frontend_static

- Lock the build artifact and a fitting static server.
- If the app is only static assets, the runtime image should be minimal; do not pull the whole toolchain into runtime.

## monolith

- List clearly the main process and any auxiliary processes that need separating.
- If one image must serve multiple roles, use a clear command or profile; do not make the entrypoint too clever.

## microservice

- Keep the image and compose service slim around one bounded responsibility.
- Declare only the local helpers the service truly needs to boot or verify.