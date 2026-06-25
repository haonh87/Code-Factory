# Workflow Artifact File Naming Convention

The goal of this convention is to block naming files by personal interpretation such as `requirements.md`, `architecture.md`, `assessment.md`, `threshold.md`, `glossary.md`.

In the workflow chain, file names must follow the step. The content inside the file is free to follow the actual scope.

## Standard Formula

```text
<work_item_slug>.sNN.<step-slug>.<ext>
```

Rules:
- `work_item_slug` is `kebab-case`, only `[a-z0-9-]`.
- `sNN` is the fixed step from `s01` to `s08`.
- `step-slug` is a fixed whitelist, not changed by personal interpretation.
- `.md` is the default main artifact.
- `.canvas` and `.base` are only auxiliary artifacts and do not replace the `.md` note as the source of truth.

## Standard File Name By Step

| Step | Short name | Standard file |
|---|---|---|
| `s01` | Clarify | `<work_item_slug>.s01.restate.md` |
| `s02` | Business Goal | `<work_item_slug>.s02.business-goal.md` |
| `s03` | Open Questions | `<work_item_slug>.s03.open-questions.md` |
| `s04` | Acceptance + DoR | `<work_item_slug>.s04.acceptance-criteria.md` |
| `s05` | Technical Approach | `<work_item_slug>.s05.technical-approach.md` |
| `s06` | Task Plan | `<work_item_slug>.s06.task-breakdown.md` |
| `s07` | Implement | `<work_item_slug>.s07.implementation.md` |
| `s08` | Verify + DoD | `<work_item_slug>.s08.verification.md` |

## Allowed Auxiliary Artifacts

| Step | Type | Standard file |
|---|---|---|
| 5 | Architecture canvas | `<work_item_slug>.s05.architecture.canvas` |
| 5 | Execution policy runtime artifact | `<work_item_slug>.s05.execution-policy.md` |
| 6 | Task map canvas | `<work_item_slug>.s06.task-map.canvas` |
| 6 | Task dashboard base | `<work_item_slug>.s06.task-dashboard.base` |
| 6 | Worker assignment runtime artifact | `<work_item_slug>.s06.worker-assignment.md` |
| 7 | Worker handoff runtime artifact | `<work_item_slug>.s07.worker-handoff-report.md` |
| 7 | Merge report runtime artifact | `<work_item_slug>.s07.merge-report.md` |
| 8 | Verification dashboard base | `<work_item_slug>.s08.verification-dashboard.base` |
| 8 | Execution escalation runtime artifact when needed | `<work_item_slug>.s08.execution-escalation.md` |

## Mapping From Vague Names To Standard Names

| Name often used loosely | Which name to use instead |
|---|---|
| `requirements` | Do not use as a step file name. If it is a restate/initial scope, use `s01.restate`; if it is a missing-input slot, use `s03.open-questions`; if it is acceptance criteria, use `s04.acceptance-criteria`. |
| `architecture` | Do not use as the main note. Use `s05.technical-approach.md`; if a diagram is needed, add `s05.architecture.canvas`. |
| `design` | Use `s05.technical-approach.md`. |
| `assessment` | If it is an input readiness assessment, use `s03.open-questions.md`; if it is an after-the-fact assessment, use `s08.verification.md`. |
| `threshold` | Do not use as a separate file. If it is about a pass/not-pass threshold, it belongs in `s04.acceptance-criteria.md`. |
| `glossary` | Not a step file. If really needed, make it a section in a standard note or a shared note outside the work item workflow. |
| `notes`, `final`, `analysis`, `summary` | Do not use as a workflow filename. Map it to the correct actual step. |

## Control Rules

- A step has only one fixed main note name.
- A `.md` runtime artifact may only be used for a whitelisted execution runtime; it does not replace the main note of the step.
- Do not add synonyms to the filename.
- `artifact_id`, `work_item_slug`, `step_id`, `step_slug` in the frontmatter must match the filename.
- If a piece of content is only a sub-part of a step, keep it as a section in the standard note; do not split it into a new file.
- `work-items/` is the canonical artifact root; the repo's real workflow artifacts must be placed under `work-items/<work_item_slug>/`.

## Examples

Correct:
- `fix-login-timeout.s01.restate.md`
- `fix-login-timeout.s04.acceptance-criteria.md`
- `fix-login-timeout.s05.technical-approach.md`
- `fix-login-timeout.s05.architecture.canvas`
- `fix-login-timeout.s08.verification.md`

Wrong:
- `requirements.md`
- `architecture.md`
- `assessment-final.md`
- `threshold.md`
- `glossary.md`
- `design-v2.md`

## How To Check

Authoring recommendation:

```bash
npm run scaffold:workflow -- --work-item <work-item-slug>
```

or:

```bash
npm run scaffold:workflow-step -- --work-item <work-item-slug> --step <sNN>
```

In the scaffold command:

- `--work-item` is currently the short CLI name for `work_item_slug`.
- `work_item_slug` is the identifier of a work item that runs across the workflow, usually locked at `s01 Clarify`.
- Examples: `fix-login-timeout`, `checkout-recovery`, `payment-cutover`.

Then validate:

Run the validator on the directory that only contains workflow artifacts:

```powershell
npm run validate:workflow:naming -- --workflow-root work-items
```

The validator will report an error when:
- the filename does not follow the standard pattern
- the step uses the wrong `step-slug`
- the `.md` is missing the standard frontmatter
- `artifact_id`, `work_item_slug`, `step_id`, `step_slug` do not match the filename