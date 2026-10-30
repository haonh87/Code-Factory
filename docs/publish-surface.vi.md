---
language: vi
---

# Publish Surface

> Tiếng Anh / English: publish-surface.md

Tài liệu này ghim bề mặt phát hành công khai dự kiến cho `workflow-bundle v2.8.0`.

Maintainer đã yêu cầu phát hành `v2.8.0`. Public surface cung cấp:
- khả năng cài vào Codex hoặc Claude Code bằng `wfc install|update|status|skills`
- khả năng author workflow bằng `wfc init|scaffold|validate`
- khả năng để agent chủ động đề xuất `work-item` và `change`
- quyền phê duyệt tiếp tục thuộc về human ở từng gate trước khi delivery tiếp diễn

`v2.0.0` vẫn là first public release. Nếu được phê duyệt, `v2.8.0` tiếp tục trên cùng public surface và không tạo breaking change cho command line:

- `v2.2.x` thêm harness adapter registry và hooks/instincts tooling nội bộ.
- `v2.3.x` thêm English-first public surface, Vietnamese `*.vi.md`, `sdd_mode=light` và hai architecture-driver skill `sa`/`ta`.
- `v2.4.0` sửa repeat update và evidence validation, sửa contract `sa`/`ta`, đồng thời thêm `architecture-modeling` vào hai runtime 41 skill.
- `v2.5.0` thêm `artifact-governance` thành skill được quản lý thứ 42 cùng enforcement cho placement, ownership, execution reader và role-indexed handoff.
- `v2.6.0` thêm hướng dẫn design-readiness dạng additive cho hai skill `sa` và `ta` hiện có, đồng thời giữ 42 managed skill và output contract hiện tại.
- `v2.6.1` đồng bộ authoring smoke đã lỗi thời với hành vi bootstrap legacy-scaffold đã được phê duyệt, đồng thời giữ 42 managed skill và public contract.
- `v2.6.2` thêm định tuyến request thích ứng, role/gate theo mức áp dụng, approval bundle có recovery, telemetry có giới hạn riêng tư và kiểm chứng candidate build một lần mà không làm yếu thẩm quyền human.
- `v2.6.4` thêm state disposition theo ID chính xác, lịch sử resolved-state có chữ ký và terminal archive guard, đồng thời giữ nguyên các nhóm lệnh, năm mode cài đặt và 43 skill được quản lý.

Tất cả thay đổi trên đều additive; public promise bên dưới không đổi.

## Canonical Release Ref

- Tag: `v2.8.0`
- Kết quả publication và immutable tarball digest: `docs/releases/workflow-bundle-v2.8.0.md`

Chỉ publish artifact đã kiểm chứng theo chỉ thị phát hành của maintainer.

## System Requirements

- `node >= 18`
- `npm >= 9`
- `~/.codex` hoặc `~/.claude` writable nếu dùng `wfc install|update|skills`
- `git` nếu clone source repo thay vì cài từ npm registry
- `bash` cho adapter Linux/macOS hoặc `PowerShell` cho adapter Windows nếu không dùng CLI trực tiếp

## Public Docs

Đây là bộ tài liệu nên dùng để public onboarding:

1. [`../README.md`](../README.md)
2. [`workflow-docs-map.md`](workflow-docs-map.md)
3. [`workflow-bundle-quickstart.md`](workflow-bundle-quickstart.md)
4. [`../packages/workflow-bundle/README.md`](../packages/workflow-bundle/README.md)
5. [`../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md`](../skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
6. [`../skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](../skills/orchestration/codex-workflow-chain/references/workflow-chain.md)

## Public Promise Of `v2.8.0`

- Installable workflow bundle cho Codex và Claude Code qua `wfc install|update|status|skills`
- Core authoring CLI qua `wfc init`, `wfc scaffold`, `wfc`, `wfc sdd|change|exec|plan`
- Agentic proposal flow qua `wfc materialize`, `wfc change-item`, `wfc work-item`, `wfc protocol`
- Human approval gates cho `change`, `work-item` và workflow gate receipts
- Trusted signed receipts ngoài project root cho các gate human bắt buộc
- Migration từ state legacy `.codex-workflow-pack.*` sang `.codex-workflow-bundle.*`
- 48 skill được quản lý trong mỗi Codex và Claude runtime, với canonical/runtime byte parity
- Phân tích architecture driver qua `sa` và `ta`, sau đó dựng model/view bằng `architecture-modeling` ở `s05`
- Built-in draw.io renderer deterministic cho landscape và integration view được allowlist khi không có house renderer sở hữu artifact
- Hướng dẫn artifact placement và one-fact/one-owner qua `artifact-governance`, với English/Vietnamese parity
- Hướng dẫn design-readiness có điều kiện qua `sa` và `ta`, được map vào các field driver, question, stop-condition và handoff hiện có mà không chuyển design authority ra khỏi s05
- Quan sát legacy scaffold theo đường read-only và bootstrap khi approve tường minh với provenance audit được; các action lifecycle mutating sau đó vẫn yêu cầu report đã persist

## Not In The Public Promise

- Delivery hoàn toàn autonomous không cần human approve
- Support runtime ngoài `Codex` và `Claude Code`
- Bất kỳ compatibility contract nào rộng hơn:
  - legacy config `workflow-contracts.config.json`
  - legacy state `.codex-workflow-pack.*`

Hai lớp legacy trên hiện vẫn được giữ để migration êm hơn, nhưng không nên coi đó là core public story của `v2.8.0`.

## Tương Thích Và Hoàn Tác

- Các command, flag, state file, output block SA/TA, block ownership, yêu cầu Node `>=18` và npm `>=9` hiện có vẫn tương thích.
- Giữ tarball v2.7.0 bất biến làm baseline rollback workflow (43 skill).
- Dùng artifact v2.7.0 bất biến và `wfc install` để hạ cấp có quản lý; xác minh v2.7.0/43 và bảo toàn file/mode unmanaged.
- Candidate này không có migration database, API, event, deployment, user configuration hoặc global install live.

## Internal Or Maintainer Docs

Các tài liệu dưới đây không nên là entrypoint khi publish public:

- `memory-bank/`
- `skills/orchestration/codex-workflow-chain/references/workflow-overview.md`
- `skills/orchestration/codex-workflow-chain/references/implementation-blueprint.md`
- `skills/orchestration/codex-workflow-chain/references/target-architecture.md`
- `skills/orchestration/codex-workflow-chain/references/workflow-versioning.md`
- `packages/workflow-bundle/tests/fixtures/workflow-governance/`

## Excluded Working Assets

Các file dưới đây là working assets cục bộ, không phải source-of-truth:

- `.obsidian/`
- `docs/workflow-process.canvas`
- `docs/workflow-work-items.canvas`
- `docs/workflow-work-items.canvas.png`
- `docs/workflow-work-items.png`

## Publish Rule

- cho tới khi Release được phê duyệt, gọi `v2.8.0` là ứng viên phát hành thay vì public release hiện tại
- nếu nói về approval model, phải nêu rõ `agent proposes, human approves`
- không dùng tài liệu internal hoặc memory-bank làm public onboarding path

### Phạm Vi Source Và Package v2.8.0

Bản 2.8.0 giữ proposal recovery và diagram-design-presentation-adapter, thêm năm skill bảo trì và CF-023, tổng cộng 48 skill. SEC-01/SEC-02 nằm trong Git tag/source archive; installer trực tiếp và MCP không nằm trong tarball workflow. Fallback workflow là 2.7.0/43. Xem release record để biết checksum và kết quả publication.

## Cập nhật phát hành 2.8.0

Bản 2.8.0 có 48 skill cho mỗi runtime Codex/Claude, thêm năm skill bảo trì và sửa CF-023. SEC-01 đã có từ 2.7.0; SEC-02 được đưa vào source Git của bản này. MCP và installer trực tiếp không nằm trong tarball workflow. Tải tarball cùng SHA256SUMS trên GitHub Release; không mặc định gói đã có trên npm registry. Trạng thái phát hành và bằng chứng nằm trong `docs/releases/workflow-bundle-v2.8.0.md`. Bản dự phòng workflow là 2.7.0/43.
