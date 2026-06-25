---
language: en
---

# Packaging By Language Stack

> Vietnamese: language-stacks.vi.md

## Node.js

- Prefer multi-stage when there is a TypeScript, Next.js, NestJS, Vite, or bundler build step.
- Use a lock file consistent with the real package manager (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`).
- Separate `npm ci` or equivalent from the source copy step to leverage cache.
- For apps that build into a `dist` or `.next` directory, the runtime stage copies only the needed artifact.
- If using Prisma, native modules, or node-gyp, mind the difference between the build image and the runtime image.

## Python

- Lock clearly whether you use `pip`, `poetry`, `pipenv`, or `uv`.
- If there are wheel builds or native dependencies, separate the build and runtime stages.
- For a web API, lock the real server such as `gunicorn`, `uvicorn`, `hypercorn`.
- For a worker or cron, the runtime command usually differs from the web entrypoint; do not force one entrypoint if it does not fit.

## Java

- Separate the build stage (`maven` or `gradle`) from the minimal runtime JRE/JDK.
- Lock clearly whether the artifact is a `jar`, `war`, or native image.
- If the app needs JVM tuning, state it via env or command; do not hard-code it vaguely.
- For a Spring Boot fat jar, the runtime stage usually only needs the final artifact and a JRE.

## .NET

- Use an `sdk` stage to publish and an `aspnet` or matching runtime stage to run.
- Lock the target framework and the `publish` artifact.
- If the solution has many projects, copy the csproj files first to leverage restore cache.

## Go

- Usually fits a multi-stage build with the binary built in the first stage and a minimal image in the later stage.
- Lock clearly whether CGO is needed.
- If the static binary qualifies, the runtime stage can be very small.

## PHP

- Lock clearly whether the runtime is `php-fpm`, Apache, or a CLI worker.
- If using Composer, separate the dependency install stage from runtime.