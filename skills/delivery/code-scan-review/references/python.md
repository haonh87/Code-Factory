---
language: en
---

# Python

> Vietnamese: python.vi.md

Use this reference when `language_stack` has Python, automation scripts, a backend service, or a notebook/script versioned in the repo.

## Priority Order

1. Syntax
- Prefer `python -m py_compile` for the changed file or module.

2. Static analysis
- Prefer `ruff`.
- Use `mypy` when the project has type hints and a matching config.

3. Security scan
- Prefer `semgrep`.

4. Performance heuristic
- Review queries in loops, large list or dict materialization, sync I/O on the request path, repeated JSON or pickle serialization, and pandas operations pulling a whole table when not needed.

## Mandatory Heuristics When Scope Is Sensitive

- Files or subprocess: `subprocess`, user-supplied paths, shell injection, temp file handling.
- Web input: deserialization, template injection, auth bypass, missing permission checks.
- Data path: ORM queries in loops, unbounded batch sizes, reading an entire file into memory.

## Fallback

- If there is no `ruff` or `mypy`, still run a syntax check and record clearly which static analysis is missing.
- Do not treat a unit test pass as a replacement for type/static scanning.