---
language: en
name: react-best-practices-review
description: Review React or Next.js changes at the level of component boundary, server/client split, data fetching, effect hygiene, state placement, context scope, render stability, list rendering, hydration and bundle-cost heuristic before handoff. Use it when the stack is React web or Next.js, and when `testing`, `code-scan-review` and `frontend-quality-review` are not enough to conclude the React-specific technical quality of a change.
---

# React Best Practices Review

> Vietnamese: SKILL.vi.md

Review React web or Next.js changes at the level of React-specific patterns before handoff.

## Goal

- Surface React-specific problems that behavior tests, static analysis and screen-level review usually miss.
- Assess server/client boundary, data fetching placement, effect hygiene, state placement, context scope and render stability.
- Point out React-specific performance risks such as waterfalls, hot rerenders, hydration cost, client bundle bloat and poor list rendering.
- Conclude the technical readiness of a React change with findings and handling directions specific enough.

## When To Use

- After implementation using React web or Next.js has reached a scope large enough to review.
- When a change touches the component tree, hooks, context, Suspense boundary, server component, client component, route segment, data fetching or client-side state management.
- When a PR shows signs of unnecessary client-side fetching, effects doing the job of derived state, heavy prop drilling, an overly broad context or rerenders that are hard to control.
- When `frontend-quality-review` already covers UX/surface quality but is not enough to conclude the React render/data boundary.

## Out Of Scope

- Does not replace `frontend-quality-review` for accessibility, responsive layout, form feedback or navigation clarity.
- Does not replace `testing` for behavior correctness or acceptance criteria.
- Does not replace `code-scan-review` for syntax, typecheck, static analysis or security scan.
- Does not replace implementation guidance at step 7; use `react-web-implementation` if you need to lock how to code React or Next.js before verifying.
- Not for React Native; this skill focuses on React web or Next.js.
- Does not self-run deep runtime benchmarks or build a profiling lab when the environment does not allow it.

## Minimum Input

- `review_scope`
- `changed_files`
- `framework_context`
- `available_checks`
- `critical_user_flows`
- `constraints`

`framework_context` should state at least:
- React or Next.js, and the version or major line if known
- App Router or Pages Router if it is Next.js
- whether Server Components, SSR, SSG or CSR is the dominant mode
- the state/query layer in use, such as React state, Context, Zustand, Redux, TanStack Query or equivalent

`available_checks` should state at least:
- whether build, typecheck, test and eslint can run
- whether React DevTools profiler, Lighthouse or browser manual check is available
- any limits on data, auth or rendering environment

If `framework_context` cannot be determined, infer it from the codebase or state the limit clearly before concluding.

## Required Output

Emit a YAML artifact per the following schema:

```yaml
review_target: ""
framework_context:
  stack: ""
  rendering_mode: []
  routing_mode: ""
review_gates:
  server_client_boundary: REQUIRED|OPTIONAL
  data_fetching: REQUIRED|OPTIONAL
  effect_hygiene: REQUIRED|OPTIONAL
  state_placement: REQUIRED|OPTIONAL
  context_scope: REQUIRED|OPTIONAL
  render_stability: REQUIRED|OPTIONAL
  list_rendering: REQUIRED|OPTIONAL
  hydration_bundle_cost: REQUIRED|OPTIONAL
  component_api_shape: REQUIRED|OPTIONAL
findings:
  - severity: HIGH|MEDIUM|LOW
    area: SERVER_CLIENT|DATA_FETCHING|EFFECT|STATE|CONTEXT|RENDER|LIST|HYDRATION|COMPONENT_API
    component_or_route: ""
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
notes_for_verify: ""
```

## Meaning Of Each Output

- `review_target`: describes the React change being reviewed.
- `framework_context`: the stack and main rendering modes relevant to the review.
- `review_gates`: which React review groups are mandatory for the current change.
- `findings`: specific problems by React area, affected component/route, evidence and how to fix.
- `criteria_results`: compares acceptance criteria with evidence at the React technical level.
- `checks_run`: automated or manual checks run to support the review.
- `checks_skipped`: checks not run and why.
- `overall_status`: overall conclusion of the React-specific review.
- `residual_risks`: risks remaining if findings are not all handled.
- `handoff_recommendation`: recommendation before merge or handoff.
- `notes_for_verify`: handoff notes for `frontend-quality-review`, `testing` or `step-goal-auditor`.

## Normalize Output In Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 8 template at `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Review Findings` block.
- Keep field names in the schema verbatim; do not rename fields when writing into the note.
- If a note already exists from `frontend-quality-review`, cross-link by surface or flow instead of repeating the same evidence.

## Execution Flow

1. Determine `framework_context`, `review_target` and the mandatory `review_gates`.
2. Review `server_client_boundary` to see what should stay on the server, what must be on the client, and whether things are over-clientified.
3. Review `data_fetching` to find fetch waterfalls, repeated fetches, fetches placed in the wrong layer or unnecessary client-side fetches.
4. Review `effect_hygiene` to find effects used for derived state, sync loops, unstable dependencies or side effects placed in the wrong spot.
5. Review `state_placement` and `context_scope` to avoid needless globalization of state or contexts that rerender too broadly.
6. Review `render_stability` and `list_rendering` to find prop churn, unstable keys, inline objects/functions heating up a path or expensive render loops.
7. Review `hydration_bundle_cost` to find an oversized client bundle, unnecessary hydration or heavy imports on the critical path.
8. Review `component_api_shape` to find boolean prop explosion, hard-to-understand coupling APIs or component contracts leaking internals.
9. Record `findings`, `criteria_results`, `checks_run` and `checks_skipped`.
10. Conclude `overall_status`, `residual_risks` and `handoff_recommendation`.

## Quality Rules

- Default to writing and communicating in English.
- Do not mark `PASS` when a change touches an important React boundary without evidence that the corresponding gate was reviewed correctly.
- Do not use `useEffect` as the default place to compute derived data or sync state if it can be done directly in render or via an event.
- If the codebase already follows React Compiler or a guideline against sprawling `useMemo`/`useCallback`, do not turn the absence of those two hooks into a finding purely out of habit.
- With Next.js, every client boundary must have a clear reason; if a subtree exists only to fetch or format data, treat that as a risk by default.
- Context should only carry data that truly needs to be shared broadly; a context that widens the render region must be recorded as a finding when it has impact.
- Store documents as UTF-8 and preserve accented characters in `*.vi.md` supplement files.

## Decision Rules

- `HIGH` when there is a clear fetch waterfall, a wrong client/server split that bloats bundle or hydration, an effect causing a loop/failed sync, state placement that breaks correctness or a hot render path affecting a main flow.
- `MEDIUM` when a pattern does not break the main flow but creates notable technical debt, increases rerenders, widens context too much or makes the component API hard to maintain.
- `LOW` when a problem is mostly cleanup, naming, API shape or a minor optimization without meaningful impact.
- `PASS` when all mandatory gates are met and no `HIGH` finding remains.
- `PARTIAL` when functionality is met but `MEDIUM` findings remain or an important React check has not run.
- `FAIL` when a `HIGH` finding remains or evidence is missing for a core React boundary of the change.
- If the issue is at the UX/surface level, add `frontend-quality-review`; if at the type/static/security level, add `code-scan-review`; if the issue reveals an unclear implementation pattern, update `react-web-implementation`.

## Completion Conditions

- `framework_context`, `review_gates` and `findings` are clear enough for the review scope.
- `criteria_results`, `checks_run` and `checks_skipped` carry specific evidence.
- `overall_status` and `handoff_recommendation` are enough to decide merge or handoff.
- `residual_risks` cover every point not fully closed.