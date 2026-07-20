# workflow-bundle v2.2.1

Released: `DRAFT — chưa tag` (scope đóng 2026-07-20, chờ Release gate)
Tag: `v2.2.1` (sẽ tag khi human pass Release gate, sau khi `v2.2.0` đã tag)
Branch: `release/v2.2.1`

## Changelog

`workflow-bundle v2.2.1` commit nốt bộ Claude Code hooks + instincts vốn đã chạy thật trên máy tác giả nhưng chưa vào git — hết reference gãy giữa `CLAUDE.md` và filesystem, teammate pull về là dùng được ngay.

### Added

- Commit 4 hook script trước đó untracked: `load-workflow-context.sh` (SessionStart), `persist-context.sh` (PreCompact), `tdd-track.sh` (Stop), `tdd-track-write.sh` (PostToolUse). `tdd-enforce.sh` (PreToolUse) đã được tracked từ trước.
- `.claude/settings.json`: đăng ký đủ 5 hook, auto-on cho mọi teammate pull repo về (`CF_HOOK_PROFILE=strict` là default).
- `.claude/instincts.yaml`: 5 instinct kỹ thuật dùng chung (chmod sau copyFileSync, parse `wfc status --json`, tìm project root trong hook, xử lý JSON qua temp file, assertion version trong smoke test).

### Changed

- `.gitignore`: thêm `scripts/.claude/` (junk state rơi rớt từ lần chạy hook cũ) và `.claude/worktrees/` (thư mục worktree cá nhân) để không bao giờ commit nhầm.
- `load-workflow-context.sh`: thêm `exit 0` tường minh ở cuối, nhất quán với cam kết non-blocking của 4 hook còn lại.

### Fixed

- Không có trong phạm vi release này (bug fix của `normalizeInstallState` thuộc `v2.2.0`).

### Compatibility

- Hooks auto-on nghĩa là teammate pull về sẽ bị `tdd-enforce` chặn Edit/Write lên file production thiếu test tương ứng (`exit 2`, `CF_HOOK_PROFILE=strict` mặc định) — đây là enforce đúng rule TDD đã có sẵn trong `CLAUDE.md`, không phải hành vi mới.
- Opt-out có sẵn 3 lớp, không cần sửa file chung: `CF_HOOK_PROFILE=minimal|standard`, `CF_DISABLED_HOOKS=<hook-id>,...`, hoặc `disabledMcpjsonServers`-style override trong `.claude/settings.local.json`.
- Máy chưa cài `node`: hook command fail nhưng Claude Code bỏ qua hook lỗi, không block session hay tool khác (hành vi platform, chưa tự kiểm chứng trên máy thật — ghi nhận residual).

## Scope

- Work item `claude-hooks-instincts-adoption` — DONE, DoD passed 2026-07-20.
- Base: `release/v2.2.0` (đã merge vào branch này) — mọi thay đổi của `harness-adapter-refactor` đi kèm, xem changelog riêng của `v2.2.0`.
- Không gồm: đổi behavior của 5 hook, đổi `CF_HOOK_PROFILE` default, đưa hooks vào bundle publish surface (đây là tooling nội bộ repo, không phải phần cài đặt cho user ngoài).

## Verification

- Degrade matrix — cả 5 hook, 2 input hỏng (stdin rỗng, JSON gãy): toàn bộ `exit 0`.
- Profile matrix — `tdd-enforce` trên file production thiếu test: `minimal`→0, `standard`→0, `strict` (default)→2 (block đúng thiết kế), `CF_DISABLED_HOOKS=tdd-enforce`→0.
- `grep /Users/` trên diff staged trước commit = 0 kết quả (không leak path máy cá nhân).
- `wfc validate --workflow-root work-items` PASS khớp baseline trước/sau, cả trong worktree lẫn sau khi stack `release/v2.2.0` vào branch này.
- Rollback rehearsal: revert commit trong worktree tạm — 6 file rời tracking sạch, `.gitignore` khôi phục, `wfc validate` vẫn PASS ở trạng thái revert.
- Residual risk đã chấp nhận: chưa test trên máy thật thiếu `node`; ma sát TDD strict với teammate mới — theo dõi sau rollout, đổi default (nếu cần) là work item riêng dựa trên dữ liệu thật.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Notes

- `v2.2.0` là previous release.
- `v2.2.1` là current release — scope đã đóng, chờ tag (sau khi `v2.2.0` tag).
- Release gate (tag + publish) là human-controlled gate — chỉ tag sau khi human pass Release.
