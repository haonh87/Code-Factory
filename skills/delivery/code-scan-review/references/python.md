# Python

Dùng reference này khi `language_stack` có Python, script automation, backend service hoặc notebook/script được version trong repo.

## Thứ Tự Ưu Tiên

1. Syntax
- Ưu tiên `python -m py_compile` cho file hoặc module bị thay đổi.

2. Static analysis
- Ưu tiên `ruff`.
- Dùng `mypy` khi project có type hint và cấu hình tương ứng.

3. Security scan
- Ưu tiên `semgrep`.

4. Performance heuristic
- Rà query trong loop, list hoặc dict materialization lớn, sync I/O trên request path, JSON hoặc pickle serialize lặp, pandas operation kéo toàn bảng khi không cần.

## Heuristic Bắt Buộc Khi Scope Nhạy Cảm

- File hoặc subprocess: `subprocess`, path người dùng nhập, shell injection, temp file handling.
- Web input: deserialization, template injection, auth bypass, permission check thiếu.
- Data path: ORM query trong loop, batch size không giới hạn, đọc toàn bộ file vào memory.

## Fallback

- Nếu không có `ruff` hoặc `mypy`, vẫn chạy syntax check và ghi rõ static analysis nào bị thiếu.
- Không coi unit test pass là thay thế cho type/static scan.
