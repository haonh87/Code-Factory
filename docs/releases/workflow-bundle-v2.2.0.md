# workflow-bundle v2.2.0

Released: `DRAFT — chưa tag` (branch cắt 2026-07-20)
Tag: `v2.2.0` (sẽ tag khi scope đóng + release gate pass)
Branch: `release/v2.2.0`

## Changelog

`workflow-bundle v2.2.0` là minor release đang mở, dùng branch này làm integration target cho các work item dưới đây. Changelog chốt lại khi scope đóng.

### Added

- (planned) Harness adapter: manifest format mới `content + harnesses`, sync runtime theo adapter (`adapters/<harness>/adapter.json`) — work item `harness-adapter-refactor`

### Changed

- (điền khi scope đóng)

### Fixed

- (điền khi scope đóng)

## Scope

- Integration branch cho work item harness-adapter-refactor (đi đủ chain s01-s08 trước khi merge).
- claude-hooks-instincts-adoption chuyển sang release/v2.2.1 (nối tiếp branch này).
- Không gồm: codebase-memory MCP rollout (repo-level config, đã vào main trực tiếp, không thuộc bundle surface).

## Verification

- Tại thời điểm cắt branch + bump: `wfc bundle-smoke` PASS (2026-07-20).
- Trước khi tag: chạy lại `wfc bundle-smoke`, `wfc validate`, và release checklist theo lane `ci-cd-release`.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Notes

- `v2.1.1` là previous release.
- `v2.2.0` là current release (đang mở).
- Release gate (tag + publish) là human-controlled gate — chỉ tag sau khi human pass Release.
