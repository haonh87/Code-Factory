---
language: en
---

# TypeScript/JavaScript

> Vietnamese: typescript-javascript.vi.md

Use this reference when the change touches TypeScript, JavaScript, Node.js, a frontend bundle, or JS/TS automation scripts.

## Priority Order

1. Syntax or type
- TypeScript: prefer `tsc --noEmit` or an equivalent project script.
- Plain JavaScript: use `node --check` for a fitting file or entry if the project has no typecheck.

2. Static analysis
- Prefer `eslint` via a project script if present.
- If the repo has many packages, run the affected workspace or package instead of unconditionally linting the whole monorepo.

3. Security scan
- Prefer `semgrep`.
- Dependency audit is a separate track; do not mix it into this skill unless the change touches dependencies or the project policy requires it.

4. Performance heuristic
- Review heavy render loops, large object clones, repeated network calls, synchronous I/O on hot paths, large serialize or parse operations, and cache misses from wrong scoped state.

## Mandatory Heuristics When Scope Is Frontend

- React or Next.js: render churn, wrong effect dependencies, state placed too high, list rendering missing stable keys.
- Client bundle: heavy imports on hot paths, large libraries pulled into the client unnecessarily.
- Forms or API calls: missing debounce, retries causing request storms, race conditions when updating state.

## Fallback

- If there is no `eslint`, still run a fitting typecheck or syntax check and record the remaining verify gap.
- Do not treat a build pass as evidence of having covered lint or static analysis.