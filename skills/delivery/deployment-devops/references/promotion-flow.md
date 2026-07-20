---
language: en
---

# Promotion Flow

> Vietnamese: promotion-flow.vi.md

## Standard Order

`local -> dev -> uat -> prod`

Each promotion should keep the same image contract; only change config, secrets, replicas, resources, and guards.

## Tag Strategy

- Use immutable tags by commit, build number, or release version.
- Do not promote with a vague tag like `latest` as the release standard.
- If you need a convenience tag like `dev` or `stable`, still keep an immutable tag as the source of truth.

## Gates By Environment

| Environment | Goal | Minimum gate |
|---|---|---|
| `dev` | Confirm the artifact builds, deploys, and smoke passes | image build pass, deploy pass, health pass |
| `uat` | Confirm near-production behavior, ready for business validation | same image as the promotion branch, smoke pass, business test or related sign-off |
| `prod` | Safe rollout with rollback capability | approval if needed, rollout plan, observability check, rollback path |

## Rollout Rule

- Choose a clear strategy: `recreate`, `rolling`, `blue-green`, `canary`, `manual phased rollout`.
- The strategy must fit the runtime and the environment's risk tolerance.
- Record verification right after rollout: health, smoke, log, metric, queue lag, or short-term business KPI if any.

## Rollback Rule

- Rollback must be based on a known-good artifact; do not roll back blind.
- If there is a migration or stateful change, app rollback and data rollback are not the same thing.
- State clearly the conditions to stop rollout and the conditions to trigger rollback.

## Common Operational Guards

- Manual approval before `prod`
- Backup or snapshot before a stateful change
- Feature flags
- Monitoring dashboard and alert window
- Maintenance window or communication plan

## Signs Of BLOCKED

- No immutable image or no locked tag strategy yet.
- No clear runtime target for the target environment.
- No post-deploy verification check.
- No viable rollback path for an important environment.