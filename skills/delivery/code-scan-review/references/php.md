---
language: en
---

# PHP

> Vietnamese: php.vi.md

Use this reference when `language_stack` has PHP or a PHP framework such as Laravel, Symfony, Magento, a WordPress plugin, or a pure PHP service.

## Priority Order

1. Syntax
- Prefer `php -l` for the changed PHP files or the related path.

2. Static analysis
- Prefer the project's wrapper if present, such as `composer phpstan`.
- If there is no wrapper, prefer `vendor/bin/phpstan analyse`.
- If the project has `phpstan.neon`, `phpstan.neon.dist`, or `phpstan-baseline.neon`, use the existing config instead of guessing parameters.

3. Security scan
- Prefer `semgrep` if available in the environment or repo.
- If not available, record `SKIP` instead of replacing it with a manual review and calling it a security scan.

4. Performance heuristic
- Review queries in loops, ORM N+1, missing eager loading, large collection materialization, and heavy serialization or hydration.

## Mandatory Heuristics When Scope Is Sensitive

- Auth or permissions: guards, policies, middleware, role mapping, bypass via a default branch.
- File handling: upload validation, mime/extension mismatch, path traversal, user-supplied file names.
- SQL or query builder: raw SQL, missing bindings, dynamic filters, wrong pagination or eager loading.
- Command execution or queue jobs: shell invocation, unserialize, dynamic class resolution, payloads from external input.

## Fallback

- If there is no `phpstan`, at minimum still run `php -l` and record clearly that static analysis is missing.
- If the repo uses Laravel and has Larastan, prefer the project's existing tool/config over calling bare `phpstan`.
- Do not call a test suite a replacement for static analysis.