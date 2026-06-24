---
language: en
---

# Go

> Vietnamese: go.vi.md

Use this reference when the change touches a Go service, CLI, worker, or library.

## Priority Order

1. Syntax and static baseline
- Prefer `go test ./...` for the related package if the environment allows.
- Run `go vet ./...` for a basic static check.

2. Additional static analysis
- If the project already has `golangci-lint`, prefer that wrapper instead of stitching many loose tools together.

3. Security scan
- Prefer `semgrep`.

4. Performance heuristic
- Review unnecessary allocations, large struct copies in loops, goroutine leaks, blocking I/O on hot paths, missing context propagation, and potential lock contention.

## Mandatory Heuristics When Scope Has Concurrency Or I/O

- Is `context.Context` propagated through the request chain?
- Do channels or goroutines have a clear exit path?
- Do HTTP, DB, or queue calls have a timeout or cancellation path?

## Fallback

- If `go vet` or deep lint cannot run, still record clearly which packages were covered and which parts were skipped.
- Do not claim a benchmark was done when there is no real benchmark.