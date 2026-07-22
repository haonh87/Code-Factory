---
language: en
---

# Promotion Flow

> Vietnamese: promotion-flow.vi.md

## Standard Order

`local -> dev -> uat -> prod`

Each promotion should keep the same image contract; only change config, secrets, replicas, resources, and guards.

## Tag Strategy

- Canonical owner of tagging/approval/evidence is `ci-cd-release/references/promotion-controls.md § Tagging`; use that reference directly instead of re-deriving a tag policy here.
- What matters at this level: whichever tag strategy is chosen, every environment in `Standard Order` must promote the same immutable artifact/image contract — only config, secrets, replicas, resources, and guards change between environments.

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