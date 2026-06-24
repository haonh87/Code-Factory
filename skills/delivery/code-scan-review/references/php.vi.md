---
language: vi
---

# PHP

> English: php.md

Dùng reference này khi `language_stack` có PHP hoặc framework PHP như Laravel, Symfony, Magento, WordPress plugin hoặc service thuần PHP.

## Thứ Tự Ưu Tiên

1. Syntax
- Ưu tiên `php -l` cho file PHP thay đổi hoặc path liên quan.

2. Static analysis
- Ưu tiên wrapper của project nếu có như `composer phpstan`.
- Nếu không có wrapper, ưu tiên `vendor/bin/phpstan analyse`.
- Nếu project có `phpstan.neon`, `phpstan.neon.dist` hoặc `phpstan-baseline.neon`, dùng cấu hình hiện có thay vì tự đoán tham số.

3. Security scan
- Ưu tiên `semgrep` nếu có trong môi trường hoặc repo.
- Nếu không có, ghi `SKIP` thay vì thay bằng review tay rồi gọi là security scan.

4. Performance heuristic
- Rà query trong loop, N+1 ORM, eager loading thiếu, collection materialize lớn, serialization hoặc hydration nặng.

## Heuristic Bắt Buộc Khi Scope Nhạy Cảm

- Auth hoặc permission: guard, policy, middleware, role mapping, bypass qua default branch.
- File handling: upload validation, mime/extension mismatch, path traversal, tên file người dùng nhập.
- SQL hoặc query builder: raw SQL, binding thiếu, filter động, pagination hoặc eager loading sai.
- Command execution hoặc queue job: shell invocation, unserialize, dynamic class resolution, payload từ input ngoài.

## Fallback

- Nếu không có `phpstan`, tối thiểu vẫn chạy `php -l` và ghi rõ static analysis bị thiếu.
- Nếu repo dùng Laravel và có Larastan, ưu tiên tool/config hiện có của project thay vì gọi `phpstan` trần.
- Không gọi test suite là thay thế cho static analysis.
