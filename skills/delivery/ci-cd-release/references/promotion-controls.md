---
language: en
---

# Promotion And Release Controls

> Vietnamese: promotion-controls.vi.md

## Tagging

- Use immutable tags based on commit SHA, build number, or semantic version.
- Convenience tags like `dev` or `stable` may exist, but do not use them as the only source of truth.

## Promotion

- `local -> dev`: goal is to confirm the artifact builds and deploys.
- `dev -> uat`: goal is to confirm the artifact is stable enough for near-production verification.
- `uat -> prod`: goal is a controlled release with approval and a rollback path.

## Approval

- Approval should be tied to environment and risk level, especially for `prod`.
- If approval is manual, record who is responsible and what conditions must be seen before approving.

## Rollback

- Rollback must point to a known-good artifact.
- If there is a migration or stateful change, record the rollback control at both the app layer and the data layer.

## Evidence

- Build log
- Test/scan result
- Artifact digest or immutable image tag
- Deploy result
- Post-deploy smoke or health evidence