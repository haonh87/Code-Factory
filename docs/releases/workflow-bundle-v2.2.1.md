# workflow-bundle v2.2.1

Released: `DRAFT — chưa tag` (branch cắt 2026-07-20)
Tag: `v2.2.1`
Branch: `release/v2.2.1`

## Changelog

`workflow-bundle v2.2.1` là release nối tiếp v2.2.0, đang mở — integration target cho work item `claude-hooks-instincts-adoption`. Changelog chốt khi scope đóng.

### Added

- (planned) Session-persistence hooks + TDD hooks + instincts adoption — work item `claude-hooks-instincts-adoption`

### Changed

- (điền)

### Fixed

- (điền)

## Scope

- Chỉ gồm claude-hooks-instincts-adoption (đi đủ chain s01-s08 trước khi merge vào branch này).
- Base: release/v2.2.0 (harness-adapter-refactor).

## Verification

- Tại thời điểm cắt branch + bump: `wfc bundle-smoke` PASS (2026-07-20).
- Trước khi tag: re-run bundle-smoke + validate + release checklist; tag CHỈ sau khi human pass Release gate, và sau khi v2.2.0 đã tag.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Notes

- `v2.2.0` là previous release.
- `v2.2.1` là current release.
