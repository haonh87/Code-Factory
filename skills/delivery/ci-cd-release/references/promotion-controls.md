---
language: en
---

# Promotion And Release Controls

> Vietnamese: promotion-controls.vi.md

## Tagging

- Use immutable tags based on commit SHA, build number, or semantic version.
- Convenience tags like `dev` or `stable` may exist, but do not use them as the only source of truth.

## Promotion

- Canonical owner of the per-environment promotion goal and minimum gate is `../../deployment-devops/references/promotion-flow.md § Gates By Environment`; use that table directly instead of re-deriving per-stage goals here.
- What matters at this level: the pipeline must actually enforce that table's minimum gate before letting an artifact move to the next environment — a pipeline stage that skips a gate is a pipeline defect, not a policy gap.

## Approval

- Approval should be tied to environment and risk level, especially for `prod`.
- If approval is manual, record who is responsible and what conditions must be seen before approving.

## Rollback

- Canonical owner of the rollback rule (known-good artifact, app-layer vs data-layer distinction for migrations, stop/trigger conditions) is `../../deployment-devops/references/promotion-flow.md § Rollback Rule`.
- What matters at this level: the "known-good artifact" a rollback points to must resolve to one of this file's immutable tags, never a convenience tag.

## Evidence

- Build log
- Test/scan result
- Artifact digest or immutable image tag
- Deploy result
- Post-deploy smoke or health evidence