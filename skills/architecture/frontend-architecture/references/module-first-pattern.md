---
language: en
---

# Frontend Canonical Pattern

> Vietnamese: module-first-pattern.vi.md

Apply this reference only when `frontend_style = MODULE_FIRST` or `MODULE_FIRST_WITH_FLOWS`. If `MICRO_FRONTEND` was chosen, skip this file entirely.

## 1. Standard Source Code Shape

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

## 2. Standard Dependency Rule

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

## 3. Standard Ownership Rule

- Each main business route must have exactly one `owner_module` or `owner_flow`.
- Each main business state area must have exactly one `owner_module`.
- A `flow` may only own short-lived orchestration state of a user journey; it must not become a long-term `source of truth` for a domain.
- `app/` only owns app-wide state and concerns such as auth bootstrap, theme, locale, or session shell when they are truly shared.

## 4. Standard Public Contract Rule

- Other modules or flows may only use what is exposed via `public.ts`.
- Do not expose internal components, internal hooks, or internal selectors unless they need to be a public contract.
- If a module needs to read data from another module, prefer a query contract, selector contract, or clearly exposed read model.
- If a module needs to write or trigger a side effect in another module, go through a clearly exposed action, client-side use case, or mutation contract.

## 5. Standard Shared Rule

- `shared/ui` only holds generic components, with no business wording or specific workflow.
- `shared/lib` only holds domain-neutral utilities.
- `shared/config`, `shared/types`, `shared/assets` only hold truly shared content.
- Do not push a component, hook, validation, or state into `shared` just because two places temporarily use it.
