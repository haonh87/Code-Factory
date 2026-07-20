# workflow-bundle v2.2.0

Released: `DRAFT — chưa tag` (scope đóng 2026-07-20, chờ Release gate)
Tag: `v2.2.0` (sẽ tag khi human pass Release gate)
Branch: `release/v2.2.0`

## Changelog

`workflow-bundle v2.2.0` thay hardcode danh sách harness `["codex","claude"]` bằng registry `adapters/<harnessId>/adapter.json`, mở đường cho harness mới mà không phải sửa code lõi.

### Added

- Harness adapter registry: `adapters/codex/adapter.json`, `adapters/claude/adapter.json` — mỗi adapter khai báo `detection` (env var / home-dir marker), `naming`, `paths`, `content`, `runtime`.
- `workflow-bundle-utils.js`: `loadAdapter` (validate + cache), `listAvailableHarnesses`, `detectActiveHarness` (auto-detect qua env var hoặc home-dir marker; ambiguity trả lỗi rõ kèm hướng dẫn `--mode`), `getRuntimeConfigFromAdapter`.
- Unit test mới: `packages/workflow-bundle/test/workflow-bundle-utils.test.js` (7 nhóm: adapter hợp lệ/lỗi, list harness, detect ambiguity, fixture new-format), `sync-workflow-bundle-runtime.test.js` (hành vi chmod khi copy).

### Changed

- `sync-workflow-bundle-runtime.js`: fan-out harness khi bundle runtime giờ đọc từ adapter registry thay vì list hardcode; tự fallback về hành vi cũ khi thư mục `adapters/` không tồn tại.
- `copyDirectory` / file-copy helper: chuẩn hóa quyền `644` (file) / `755` (dir) sau khi copy, để runtime bundle luôn ghi được kể cả khi file nguồn ở chế độ read-only.
- `wfc` CLI: tự động detect harness đang chạy (qua env var hoặc home-dir marker) thay vì luôn hỏi; help text đổi mô tả `<harness>` thay vì liệt kê cứng `codex|claude`.

### Fixed

- `normalizeInstallState`: lỗi độ ưu tiên toán tử JS khiến tham số `context.repoRoot` của caller bị bỏ qua, luôn resolve adapter theo repo root mặc định. Tái hiện bằng test fail trước, fix sau (TDD).

### Compatibility

- Root `workflow-bundle.manifest.json` giữ nguyên format legacy (`codex`/`claude` ở top-level) — format mới `content + harnesses` mới chỉ được kiểm bằng fixture test trong release này, chưa kích hoạt production (SCOPE-A, quyết định có ghi trong work item).
- Repo không có thư mục `adapters/` (dùng bundle version cũ hơn) không bị ảnh hưởng — hành vi fallback y hệt trước khi có registry.
- Không đổi interface `wfc install|update|status|skills` hay các shim gọi CLI.

## Scope

- Work item `harness-adapter-refactor` — DONE, DoD passed 2026-07-20.
- Không gồm: kích hoạt manifest format mới end-to-end (SCOPE-B, work item tương lai); `claude-hooks-instincts-adoption` (chuyển sang `release/v2.2.1`, nối tiếp branch này); codebase-memory MCP rollout (repo-level config, đã vào main trực tiếp trước đó, không thuộc bundle publish surface).

## Verification

- `wfc bundle-smoke` PASS tại 4 mốc: trước khi sửa (WIP baseline trên v2.2.0), sau khi fix bug, sau merge vào `release/v2.2.0`, và sau khi `release/v2.2.1` merge ngược branch này.
- `npm test`-equivalent: `workflow-bundle-utils.test.js` + `sync-workflow-bundle-runtime.test.js` PASS (chạy trực tiếp qua node, theo convention test hiện có của package — không dùng test framework ngoài).
- `wfc validate --workflow-root work-items` PASS khớp baseline (không lệch file/notes ngoài dự kiến) trước và sau toàn bộ thay đổi.
- Residual risk đã chấp nhận: 2 file test mới trùng tên với bản nháp đang nằm trong worktree `sdd-light-t1` (chưa land) — cần đối chiếu nội dung khi branch đó merge.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Notes

- `v2.1.1` là previous release.
- `v2.2.0` là current release — scope đã đóng, chờ tag.
- Release gate (tag + publish) là human-controlled gate — chỉ tag sau khi human pass Release.
