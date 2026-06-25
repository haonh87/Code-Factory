---
language: vi
---

# Go

> English: go.md

Dùng reference này khi thay đổi chạm Go service, CLI, worker hoặc library.

## Thứ Tự Ưu Tiên

1. Syntax và static baseline
- Ưu tiên `go test ./...` cho package liên quan nếu môi trường cho phép.
- Chạy `go vet ./...` cho static check cơ bản.

2. Static analysis bổ sung
- Nếu project đã có `golangci-lint`, ưu tiên wrapper đó thay vì tự ghép nhiều tool rời.

3. Security scan
- Ưu tiên `semgrep`.

4. Performance heuristic
- Rà allocation không cần thiết, copy struct lớn trong loop, goroutine leak, blocking I/O trên hot path, context propagation thiếu, lock contention tiềm ẩn.

## Heuristic Bắt Buộc Khi Scope Đồng Thời Hoặc I/O

- `context.Context` có được truyền xuyên request chain hay không.
- Channel hoặc goroutine có đường thoát rõ hay không.
- HTTP, DB, queue call có timeout hoặc cancellation path hay không.

## Fallback

- Nếu `go vet` hoặc lint chuyên sâu không chạy được, vẫn ghi rõ package đã cover và phần bị bỏ qua.
- Không gọi benchmark là đã làm nếu chưa có benchmark thật.
