# Quy Ước Tên File Workflow Artifact

Mục tiêu của quy ước này là chặn việc đặt tên file theo cách hiểu cá nhân như `requirements.md`, `architecture.md`, `assessment.md`, `threshold.md`, `glossary.md`.

Trong workflow chain, tên file phải bám theo step. Nội dung nằm trong file mới được tự do theo scope thực tế.

## Công Thức Chuẩn

```text
<work_item_slug>.sNN.<step-slug>.<ext>
```

Quy tắc:
- `work_item_slug` viết `kebab-case`, chỉ gồm `[a-z0-9-]`.
- `sNN` là step cố định từ `s01` đến `s08`.
- `step-slug` là whitelist cố định, không tự đổi theo ngữ nghĩa cá nhân.
- `.md` là artifact chính mặc định.
- `.canvas` và `.base` chỉ là artifact phụ, không thay note `.md` làm nguồn sự thật.

## Tên File Chuẩn Theo Step

| Step | Vai trò | File chuẩn |
|---|---|---|
| 1 | Restate yêu cầu và discovery framing | `<work_item_slug>.s01.restate.md` |
| 2 | Mục tiêu business | `<work_item_slug>.s02.business-goal.md` |
| 3 | Phần còn mơ hồ, câu hỏi mở, readiness | `<work_item_slug>.s03.open-questions.md` |
| 4 | Acceptance criteria và Definition of Ready | `<work_item_slug>.s04.acceptance-criteria.md` |
| 5 | Technical approach và kiến trúc được chọn | `<work_item_slug>.s05.technical-approach.md` |
| 6 | Task breakdown và verification plan | `<work_item_slug>.s06.task-breakdown.md` |
| 7 | Implementation note khi thực sự cần materialize | `<work_item_slug>.s07.implementation.md` |
| 8 | Verification, audit, Definition of Done | `<work_item_slug>.s08.verification.md` |

## Artifact Phụ Được Phép

| Step | Loại | File chuẩn |
|---|---|---|
| 5 | Architecture canvas | `<work_item_slug>.s05.architecture.canvas` |
| 6 | Task map canvas | `<work_item_slug>.s06.task-map.canvas` |
| 6 | Task dashboard base | `<work_item_slug>.s06.task-dashboard.base` |
| 8 | Verification dashboard base | `<work_item_slug>.s08.verification-dashboard.base` |

## Mapping Từ Tên Mơ Hồ Sang Tên Chuẩn

| Tên hay bị đặt lung tung | Dùng tên nào thay thế |
|---|---|
| `requirements` | Không dùng làm tên file step. Nếu là restate/scope ban đầu thì dùng `s01.restate`; nếu là chỗ còn thiếu thì dùng `s03.open-questions`; nếu là tiêu chí chấp nhận thì dùng `s04.acceptance-criteria`. |
| `architecture` | Không dùng làm note chính. Dùng `s05.technical-approach.md`; nếu cần sơ đồ thì thêm `s05.architecture.canvas`. |
| `design` | Dùng `s05.technical-approach.md`. |
| `assessment` | Nếu là đánh giá readiness đầu vào thì dùng `s03.open-questions.md`; nếu là đánh giá sau khi làm xong thì dùng `s08.verification.md`. |
| `threshold` | Không dùng làm file riêng. Nếu đang nói ngưỡng đạt/chưa đạt thì nó thuộc `s04.acceptance-criteria.md`. |
| `glossary` | Không phải step file. Nếu cần thật, để thành section trong note chuẩn hoặc một note dùng chung ngoài workflow của work item. |
| `notes`, `final`, `analysis`, `summary` | Không dùng làm filename workflow. Phải map về đúng step thực tế. |

## Rule Kiểm Soát

- Một step chỉ có một tên note chính cố định.
- Không thêm synonym vào filename.
- `artifact_id`, `work_item_slug`, `step_id`, `step_slug` trong frontmatter phải khớp với filename.
- Nếu một nội dung chỉ là phần con của step, giữ nó thành section trong note chuẩn, không tách thành file mới.
- Nếu cần kiểm soát chặt, gom toàn bộ workflow artifact của work item vào một thư mục riêng, ví dụ `work-items/`.

## Ví Dụ

Đúng:
- `fix-login-timeout.s01.restate.md`
- `fix-login-timeout.s04.acceptance-criteria.md`
- `fix-login-timeout.s05.technical-approach.md`
- `fix-login-timeout.s05.architecture.canvas`
- `fix-login-timeout.s08.verification.md`

Sai:
- `requirements.md`
- `architecture.md`
- `assessment-final.md`
- `threshold.md`
- `glossary.md`
- `design-v2.md`

## Cách Kiểm Tra

Chạy validator trên thư mục chỉ chứa workflow artifact:

```powershell
powershell -File scripts/validate-workflow-artifact-names.ps1 -WorkflowRoot .\work-items
```

Validator sẽ báo lỗi khi:
- filename không bám mẫu chuẩn
- step dùng sai `step-slug`
- `.md` thiếu frontmatter chuẩn
- `artifact_id`, `work_item_slug`, `step_id`, `step_slug` không khớp tên file
