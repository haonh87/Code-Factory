---
language: en
name: react-web-implementation
description: Implement React web or Next.js frontend following safe patterns for component boundary, server/client split, data fetching, state placement, effect usage, loading path, list rendering and bundle-sensitive composition. Use it when the implementation step touches React web or Next.js and needs framework-specific guidance that the generic `implementation` skill does not detail enough.
---

# React Web Implementation

> Vietnamese: SKILL.vi.md

Implement React web or Next.js changes following stable, reviewable patterns that stay close to the locked boundary.

## Goal

- Turn frontend design into React web or Next.js code with clear boundaries and avoidable technical debt minimized.
- Lock how to place components, data fetching, state, context and effects before editing deep into the UI tree.
- Reduce the risk of bundle bloat, redundant hydration, hot rerenders or over-clientification while coding.
- Produce a clear handoff for `testing`, `frontend-quality-review` and `react-best-practices-review`.

## When To Use

- When the implementation step touches React web or Next.js components after design and task breakdown are clear enough.
- When a change involves App Router, Server Components, Client Components, route segments, Suspense/loading paths or fetch boundaries.
- When deciding during coding whether state should be local, module-level, in context or in the query layer.
- When refactoring the component tree, form flow, list, table, dashboard or a data-heavy screen with rerender risk.
- When the generic `implementation` skill is not enough to lock React-specific patterns consistently.

## Out Of Scope

- Does not replace `frontend-architecture` for module ownership, route ownership or import boundaries at the architecture level.
- Does not replace `frontend-experience-design` for layout, screen behavior, responsive rules or visual direction.
- Does not replace `testing`, `frontend-quality-review` or `react-best-practices-review` at the verify step.
- Not for React Native; this skill is only for React web or Next.js.
- Does not self-change a major technical approach before the design step has locked it.

## Minimum Input

- `recommended_design`
- `task_breakdown`
- `framework_context`
- `files_in_scope`
- `constraints`
- `existing_frontend_context`

`framework_context` should state at least:
- React or Next.js
- App Router or Pages Router if it is Next.js
- the main rendering mode, such as Server Components, SSR, SSG or CSR
- the state/query layer in use, if any

If `files_in_scope` is not yet determined or the current server/client boundary is unclear, clarify it before editing in bulk.

## Required Output

Emit a YAML artifact per the following schema:

```yaml
implementation_target: ""
framework_context:
  stack: ""
  routing_mode: ""
  rendering_mode: []
component_boundary_notes: []
server_client_split_plan: []
data_fetching_plan: []
state_and_context_plan: []
effect_usage_rules: []
rendering_and_loading_plan: []
performance_guards_applied: []
files_or_modules_touched: []
notes_for_review: ""
```

## Meaning Of Each Output

- `implementation_target`: describes the part of React being implemented.
- `framework_context`: the stack and rendering modes relevant to the code being edited.
- `component_boundary_notes`: notes on the boundary between components, route segments or important subtrees.
- `server_client_split_plan`: plan for what stays on the server and what goes to the client.
- `data_fetching_plan`: where fetch/query/mutation calls go and why.
- `state_and_context_plan`: how local state, lifted state, context or query cache are placed.
- `effect_usage_rules`: rules applied to effects, subscriptions or side effects that are truly needed.
- `rendering_and_loading_plan`: how loading paths, suspense boundaries, empty/error branches or progressive rendering are handled.
- `performance_guards_applied`: guards applied to avoid hot rerenders, redundant hydration or bundle bloat.
- `files_or_modules_touched`: files or modules expected to be touched.
- `notes_for_review`: handoff notes for `react-best-practices-review`, `frontend-quality-review` or `testing`.

## Normalize Output In Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 7 template at `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Implementation Notes` block.
- Keep field names in the schema verbatim; do not rename fields when writing into the note.
- Do not replace the `## Main Artifact` block; that block still uses the `implementation` schema.

## Execution Flow

1. Read `recommended_design`, `task_breakdown` and `framework_context`.
2. Identify the component boundary or route segment that actually needs editing first.
3. Lock the `server_client_split_plan` before pushing logic to the client out of habit.
4. Lock `data_fetching_plan`, `state_and_context_plan` and `effect_usage_rules` before coding deep.
5. Write or refactor code against the locked boundary, keeping changes focused within `files_or_modules_touched`.
6. Record the `rendering_and_loading_plan` for loading, error, empty or suspense paths involved.
7. Apply `performance_guards_applied` on paths with large lists, charts, media or hydration-sensitive UI.
8. Prepare `notes_for_review` to hand off to `react-best-practices-review`, `frontend-quality-review` or `testing`.

## Quality Rules

- Default to writing and communicating in English; follow project conventions for code.
- Do not move a subtree to the client just because a hook is convenient if it can still be solved on the server or via props/data contracts.
- Do not use `useEffect` to compute derived state or sync data that can be solved through render, events or a suitable fetch layer.
- Use context only for data that truly needs to be shared broadly; avoid turning context into a global dumping ground.
- For large lists or tables, handle keys, render branches and data mapping stably from the start.
- If the codebase already follows React Compiler or discourages default `useMemo`/`useCallback`, follow that convention.
- Store documents as UTF-8 and preserve accented characters in `*.vi.md` supplement files.

## Decision Rules

- If a concern serves only one surface or component group, prefer local state before lifting it to context/global store.
- If data is only needed to render initial UI and does not demand early client interactivity, prefer a server boundary.
- If a fetch is repeated across the component tree or causes a clear waterfall, lift it to a more suitable boundary.
- If a component API starts bloating with many boolean props or hard-to-follow branching, split the component or switch to a clearer composition pattern.
- If loading, error or suspense paths are unclear, lock them before expanding feature logic.
- If the React pattern being implemented drifts from the locked design or boundary, stop and report instead of patching ad hoc.

## Completion Conditions

- `server_client_split_plan`, `data_fetching_plan` and `state_and_context_plan` are clear enough for the edited part.
- `performance_guards_applied` covers the sensitive paths.
- `files_or_modules_touched` and `notes_for_review` are enough for the verify step to take over.
- No important React decision is left implicit in code without a recorded rationale.