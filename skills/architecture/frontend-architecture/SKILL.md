---
language: en
name: frontend-architecture
description: Design a frontend application architecture in a module-first or feature-first direction to lock feature modules, route ownership, UI/state boundaries, public contracts, shared rules, and interaction boundaries before splitting tasks or implementing. Use when you need a consistent frontend source-code structure, want to stop drift by technical layer, or need to lock the boundary between modules, flows, and the app shell.
---

# Frontend Architecture

> Vietnamese: SKILL.vi.md

Design a frontend application architecture centered on features or modules to lock boundaries, ownership, and sharing rules before implementation.

## Goal

- Identify the feature modules, flows, and app shell of the frontend problem.
- Lock ownership for routes, state, UI, data fetching, and main side effects.
- Design public contracts and import boundaries to reduce coupling between modules.
- Choose the right application level among `MODULE_FIRST`, `MODULE_FIRST_WITH_FLOWS`, and `MICRO_FRONTEND`.
- Produce a blueprint clear enough for `system-design`, `task-breakdown-planner`, and `implementation` to use next.

## When To Use

- When a frontend app starts growing and the boundary between features becomes blurry.
- When you need to decide whether to organize the frontend by `module-first`, whether to add a `flow` layer, or whether to split into a `micro frontend`.
- When many routes, states, and components are being merged into global `shared`, `common`, `hooks`, `services`, or `stores`.
- When you need to lock boundaries before splitting implementation tasks for the frontend.

## Out Of Scope

- Does not design pixel-level UI, UI state, responsive rules, form feedback, motion, colors, or visual spec; use `frontend-experience-design` when these need to be locked before implementation.
- Does not replace `system-design` at the API, cache, infra, or cross-system architecture level.
- Does not directly write production code or split detailed implementation tasks.
- Does not expand the business scope beyond the clarified request on its own.

## Minimum Input

- `business_goal`: the locked business goal or user outcome.
- `acceptance_criteria`: the main functional criteria of the request.
- `frontend_surfaces`: routes, pages, screens, widgets, or user channels involved.
- `user_flows`: the main user flows and important state transition points.
- `current_context`: the current frontend codebase structure, app shell, state management, router, and existing shared areas.
- `known_constraints`: constraints around framework, SSR/SPA, team, performance, accessibility, or release.

If `business_goal` cannot be determined or there are not enough `frontend_surfaces`, stop and ask for more clarification.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
frontend_style: MODULE_FIRST|MODULE_FIRST_WITH_FLOWS|MICRO_FRONTEND
app_shell:
  responsibilities: []
  owns: []
feature_modules:
  - name: ""
    purpose: ""
    owned_routes: []
    owned_state: []
    public_contracts: []
flows:
  - name: ""
    purpose: ""
    composes_modules: []
    owns_state: []
shared_areas:
  - area: ""
    allowed_contents: []
    forbidden_contents: []
interaction_rules:
  - from: ""
    to: ""
    allowed_via: ""
    forbidden_patterns: []
state_ownership_rules:
  - state_area: ""
    owner_module: ""
    notes: ""
routing_rules: []
architecture_risks: []
notes_for_next_step: ""
```

## Meaning Of Each Output

- `frontend_style`: the frontend architecture application level fitting the problem.
- `app_shell`: the shared bootstrap part of the app and what may be owned at the app level.
- `feature_modules`: the main business modules with each module's routes, state, and public contracts.
- `flows`: user journeys composing multiple modules when an orchestration layer is needed.
- `shared_areas`: shared areas allowed to exist and the content limits of each.
- `interaction_rules`: the allowed interaction rules between modules, flows, and the app shell.
- `state_ownership_rules`: ownership of each important state area.
- `routing_rules`: rules for assigning routes to modules or flows.
- `architecture_risks`: risks if the boundary, ownership, or shared rule is chosen wrong.
- `notes_for_next_step`: notes for handing off to `system-design`, `task-breakdown-planner`, or `implementation`.

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 5 template in `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Architecture Details` block.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.
- Only write this block when the problem truly needs to lock frontend modules, routing, state ownership, or the app shell.

## Execution Flow

1. Identify the main routes, screens, actors, and user flows.
2. Group UI and state by responsibility to find `feature_modules`.
3. Check whether `flows` are needed to orchestrate multiple modules or module boundaries suffice.
4. Choose the fitting `frontend_style` among `MODULE_FIRST`, `MODULE_FIRST_WITH_FLOWS`, and `MICRO_FRONTEND`.
5. Assign ownership for routes, state, side effects, data fetching, and public contracts.
6. Write `interaction_rules` to block cross imports and uncontrolled internal access.
7. Write `shared_areas` and `routing_rules` to lock what is truly shared.
8. Record `architecture_risks` and `notes_for_next_step`.

## Frontend Canonical Pattern

Apply this section when `frontend_style = MODULE_FIRST` or `MODULE_FIRST_WITH_FLOWS`.

### 1. Standard Source Code Shape

Default suggestion:

```text
src/
  app/
    router/
    providers/
    layouts/
    guards/
  modules/
    <module-name>/
      public.ts
      api/
      model/
      ui/
      pages/
      lib/
      tests/
  flows/
    <flow-name>/
      public.ts
      model/
      ui/
      tests/
  shared/
    ui/
    lib/
    config/
    assets/
    types/
```

Where:

- `app/` holds bootstrap, router registration, providers, and the app shell; it does not hold each module's business rules.
- `modules/<module-name>/` is the main boundary of a feature or business area on the frontend.
- `public.ts` is the only public entry for another module or flow to import.
- `api/` holds queries, mutations, request/response mappers, and server communication helpers.
- `model/` holds client state, selectors, schemas, validation, view-models, and client-side business rules.
- `ui/` holds components carrying the module's or flow's business meaning.
- `pages/` holds the pages or route entries the module owns.
- `lib/` holds the module's internal helpers; it is not automatically a system-wide shared area.
- `flows/` is only used when a user journey composes multiple modules and needs its own orchestration layer.
- `shared/` only holds technical primitives, generic UI, config, and domain-neutral types.

### 2. Standard Dependency Rule

Valid dependencies:

- `app -> modules/public`
- `app -> flows/public`
- `flows -> modules/public`
- `modules -> shared`
- `flows -> shared`
- `modules/ui|pages -> modules/model|api|lib`

Forbidden dependencies:

- `module A -> internal file` of `module B` without going through `public.ts`
- `shared -> modules` or `shared -> flows`
- `app -> internal file` of any module
- `flow -> internal file` of another module outside the public contract
- A global store holding many modules' state just for convenience

### 3. Standard Ownership Rule

- Each main business route must have exactly one `owner_module` or `owner_flow`.
- Each main business state area must have exactly one `owner_module`.
- A `flow` may only own short-lived orchestration state of a user journey; it must not become a long-term `source of truth` for a domain.
- `app/` only owns app-wide state and concerns such as auth bootstrap, theme, locale, or session shell when they are truly shared.

### 4. Standard Public Contract Rule

- Other modules or flows may only use what is exposed via `public.ts`.
- Do not expose internal components, internal hooks, or internal selectors unless they need to be a public contract.
- If a module needs to read data from another module, prefer a query contract, selector contract, or clearly exposed read model.
- If a module needs to write or trigger a side effect in another module, go through a clearly exposed action, client-side use case, or mutation contract.

### 5. Standard Shared Rule

- `shared/ui` only holds generic components, with no business wording or specific workflow.
- `shared/lib` only holds domain-neutral utilities.
- `shared/config`, `shared/types`, `shared/assets` only hold truly shared content.
- Do not push a component, hook, validation, or state into `shared` just because two places temporarily use it.

## Quality Rules

- Default to writing and communicating in English.
- Do not organize the frontend by global `components`, `hooks`, `services`, `stores` as the root business structure.
- Do not put business rules in `shared`, `common`, `core`, `app`, or utility folders.
- Do not name modules by technical concern such as `api`, `modal`, `table`, `hook`, `store`.
- If the same business term carries multiple meanings by route or user flow, consider splitting the module or upgrading the style.
- Store documents as UTF-8 and do not corrupt Vietnamese diacritics in `*.vi.md` supplement files.

## Decision Rule

- Choose `MODULE_FIRST` for most SPA, SSR apps, or dashboards with a moderate-to-large number of features.
- Choose `MODULE_FIRST_WITH_FLOWS` when many user journeys cross multiple modules and need their own orchestration layer but do not yet need to split into many independent apps.
- Choose `MICRO_FRONTEND` only when deploy boundaries, team autonomy, runtime isolation, or compliance are strong enough to justify the added complexity.
- If a state serves only one module, do not put it in a global store.
- If a component has its own business wording or business behavior, keep it in the module instead of moving it to `shared/ui`.
- If an import boundary is violated only for quick reuse, mark it as an `architecture_risk` instead of legitimizing it immediately.

## Completion Conditions

- A `frontend_style` and a clear enough reason for the choice.
- `feature_modules`, `state_ownership_rules`, and `routing_rules` clear enough that the next step is not vague about ownership.
- `interaction_rules` and `shared_areas` sufficient to control import boundaries and reuse.
- `architecture_risks` for points not yet locked or still disputed.