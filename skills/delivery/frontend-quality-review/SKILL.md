---
language: en
name: frontend-quality-review
description: Review frontend changes at the level of accessibility, responsive layout, interaction feedback, form behavior, navigation clarity, motion and performance heuristic before handoff. Use it when reviewing frontend PRs, verifying UI flows after implementation, or when `testing` and `code-scan-review` are not enough to conclude screen-level quality of a change.
---

# Frontend Quality Review

> Vietnamese: SKILL.vi.md

Review frontend quality at the level of user experience and technical heuristic before handoff.

## Goal

- Assess frontend quality beyond pure behavior testing and pure static scanning.
- Surface problems in accessibility, responsive layout, interaction feedback, form behavior, navigation and performance heuristic.
- Record findings with severity, affected surface and handling direction.
- Conclude the handoff readiness of a frontend change with clear enough evidence.

## When To Use

- After frontend implementation has reached a scope large enough to review screen-level quality.
- When a PR changes a page, screen, form, component interaction, navigation, modal, drawer, chart or responsive layout.
- When `testing` already covers behavior but a conclusion is still needed on accessibility, clarity, usability or frontend performance heuristic.
- When `code-scan-review` is done but not enough to say the UI actually works well at the user level.
- When the stack is React or Next.js and screen-level quality review must be separated from React render/data boundary review, combine with `react-best-practices-review`.

## Out Of Scope

- Does not replace `testing` for behavior correctness or system-level acceptance criteria.
- Does not replace `code-scan-review` for syntax, static analysis or security scan.
- Does not replace benchmarking, deep runtime profiling or a performance lab with standardized measurements.
- Does not replace React-specific review at the level of server/client split, effect hygiene, state placement or render stability; use `react-best-practices-review` when the stack is React web or Next.js.
- Does not self-conclude that visual identity matches brand without clear brand input.

## Minimum Input

- `acceptance_criteria`
- `review_scope`
- `changed_surfaces`
- `device_targets`
- `available_checks`
- `constraints`

`available_checks` should state at least:
- whether a browser or review environment can actually run
- whether Storybook, Playwright, screenshot diff, Lighthouse or manual QA is available
- any limits on devices, viewports or seed data

If `changed_surfaces` cannot be determined, infer it from the change or state clearly which review scope is still missing.

## Required Output

Emit a YAML artifact per the following schema:

```yaml
review_target: ""
review_scope:
  surfaces: []
  devices: []
  critical_flows: []
quality_gates:
  accessibility: REQUIRED|OPTIONAL
  responsive_layout: REQUIRED|OPTIONAL
  interaction_feedback: REQUIRED|OPTIONAL
  form_and_validation: REQUIRED|OPTIONAL
  navigation_clarity: REQUIRED|OPTIONAL
  performance_heuristic: REQUIRED|OPTIONAL
  visual_consistency: REQUIRED|OPTIONAL
findings:
  - severity: HIGH|MEDIUM|LOW
    area: ACCESSIBILITY|RESPONSIVE|INTERACTION|FORM|NAVIGATION|PERFORMANCE|VISUAL
    surface: ""
    issue: ""
    evidence: ""
    recommendation: ""
criteria_results:
  - criterion: ""
    result: PASS|FAIL|PARTIAL
    evidence: ""
checks_run: []
checks_skipped: []
overall_status: PASS|FAIL|PARTIAL
residual_risks: []
handoff_recommendation: ""
notes_for_review: ""
```

## Meaning Of Each Output

- `review_target`: describes the frontend change being reviewed.
- `review_scope`: surfaces, devices and critical flows that must be checked.
- `quality_gates`: which quality groups are mandatory in the current review.
- `findings`: specific problems with severity, affected surface, evidence and fix direction.
- `criteria_results`: compares acceptance criteria with screen-level evidence.
- `checks_run`: manual or automated checks that were run.
- `checks_skipped`: checks not run and why.
- `overall_status`: overall conclusion of the frontend review.
- `residual_risks`: risks remaining despite the review.
- `handoff_recommendation`: recommendation before merge, demo or handoff.
- `notes_for_review`: handoff notes for the final review, `testing` or `step-goal-auditor`.

## Normalize Output In Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 8 template at `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Main Artifact` block, or in `## Review Findings` if the note already has another verify block.
- Keep field names in the schema verbatim; do not rename fields when writing into the note.
- If a note already exists from `testing` or `code-scan-review`, cross-link instead of repeating evidence.

## Execution Flow

1. Determine `review_target`, `review_scope` and the mandatory `quality_gates`.
2. List `changed_surfaces`, viewports and devices to check.
3. Review accessibility at the level of semantics, keyboard flow, focus handling, labels, contrast and touch targets when in scope.
4. Review responsive layout at the level of overflow, wrapping, sticky areas, spacing, density and readability across main viewports.
5. Review interaction feedback at the level of loading, empty, error, success, disabled, validation and recovery paths.
6. Review navigation clarity for route changes, breadcrumbs, modal/drawer transitions, back paths or step progression when present.
7. Review performance heuristic for large lists, charts, media, or network-heavy surfaces when risk signals exist — virtualization, lazy loading, and image/media weight are in scope here; for React-specific causes such as hot rerenders, hydration cost, or client bundle bloat, defer to `react-best-practices-review`'s `render_stability`/`hydration_bundle_cost` gates instead of re-diagnosing them in this skill.
8. Record `findings` with severity, evidence and specific recommendation.
9. Reconcile acceptance criteria in `criteria_results`.
10. Conclude `overall_status`, `residual_risks` and `handoff_recommendation`.

## Quality Rules

- Default to writing and communicating in English.
- Do not mark `PASS` without evidence for a primary surface or flow.
- Do not treat a static analysis pass as sufficient evidence for frontend quality.
- If a browser or manual check cannot run, record the limit clearly in `checks_skipped`.
- Modals, drawers, popovers and route-changing flows must have clear focus handling or navigation rules; otherwise treat them as a review risk by default.
- Forms must not only validate correctly; they must also provide feedback, a recovery path and messages clear enough for the user to fix the input.
- Store documents as UTF-8 and preserve accented characters in `*.vi.md` supplement files.

## Decision Rules

- `HIGH` when a problem blocks the main task, breaks keyboard/screen-reader flow, collapses layout on a main viewport, loses entered data or misleads a key action.
- `MEDIUM` when a problem does not block the main task but reduces clarity, increases friction or raises the chance of wrong actions.
- `LOW` when a problem is mostly polish, consistency or mild readability.
- `PASS` when all mandatory quality gates are met and no `HIGH` finding remains.
- `PARTIAL` when functionality is met but `MEDIUM` findings remain or an important check has not run.
- `FAIL` when a `HIGH` finding remains or evidence is missing for a core flow/surface.
- If the change is heavy on logic or data correctness, add `testing`; if heavy on static quality/security, add `code-scan-review`; if heavy on React render/data boundary, add `react-best-practices-review`.

## Completion Conditions

- `quality_gates` and `findings` are clear enough for the review scope.
- `criteria_results`, `checks_run` and `checks_skipped` carry specific evidence.
- `overall_status` and `handoff_recommendation` are enough to decide merge or handoff.
- `residual_risks` cover every point not fully closed.