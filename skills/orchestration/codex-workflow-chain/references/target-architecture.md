# Target Architecture Cho Workflow Backbone

Tài liệu này mô tả kiến trúc đích để hoàn thiện workflow hiện tại của repo, với nguyên tắc:

- workflow hiện tại là `backbone`
- các framework ngoài chỉ là lớp bổ trợ
- không tạo workflow song song
- không thay source-of-truth hiện có bằng artifact của framework ngoài

Trạng thái tài liệu:

- đây là `target architecture` để review
- chưa phải bản implementation hoàn tất trong repo
- dùng làm đầu vào cho các bước rollout tiếp theo

Thời điểm đối chiếu: `2026-04-13`.

## Mục Tiêu

- Giữ workflow 8 bước hiện tại làm `host workflow`
- Bổ sung lớp governance, change management, execution và adaptive planning
- Không biến `governance` thành step riêng; ưu tiên nhúng vào step contract/gate của backbone
- Tách rõ `source-of-truth`, `change`, `execution trace`, `archive`
- Tăng khả năng mở rộng cho cả `FEATURE`, `CHANGE`, `BUG`, `REFACTOR`, `RESEARCH`

## Backbone

Workflow backbone giữ nguyên:

```text
Clarify
-> Business Goal
-> Open Questions
-> Acceptance + DoR
-> Technical Approach
-> Task Plan
-> Implement
-> Verify + DoD
```

Workflow này vẫn là nơi quyết định:

- gate
- signoff
- handoff
- release readiness
- business acceptance

## Mô Hình Governance Hybrid

Target architecture này dùng mô hình `hybrid governance`:

- khoảng `70-80%` governance được nhúng trực tiếp vào step contract, gate, handoff và evidence của từng step
- khoảng `20-30%` nằm ở layer mỏng dùng chung như `constitution`, `project-context`, `governance-checklist`, `governance-exception`

Điều này có nghĩa là:

- không tạo `governance step`
- không tạo workflow governance riêng
- không để governance chỉ nằm ở tài liệu nền mà không đi vào gate của workflow thật
- mọi lệch chuẩn phải xuất hiện trong `governance-exception`, không được ngầm bỏ qua

## Lớp Kiến Trúc

| Lớp | Vai trò | Nguồn chính |
|---|---|---|
| Backbone | step, gate, signoff, handoff, evidence flow | workflow hiện tại |
| Governance | `constitution`, `project-context`, `checklist`, `quality bar` và các rule dùng chung | `spec-kit` |
| Product Spec | `BRD`, `SRS`, traceability, rollout truth | workflow hiện tại |
| Change Layer | proposal, design, tasks, spec delta, archive | `OpenSpec` |
| Execution Layer | implementer/reviewer/fixer loop, task execution autonomy | `cc-sdd` |
| Adaptive Planning | quick/full/enterprise routing, planning depth theo scope | `BMAD-METHOD` |

## Nguyên Tắc Cốt Lõi

- `BRD` và `SRS` là source-of-truth của sản phẩm.
- `changes/` là source-of-truth của thay đổi đang đề xuất hoặc đang rollout.
- note `s01...s08` là execution trace và evidence.
- `governance_ref` là field canonical để trỏ tới governance source đang áp dụng; thông thường nó trỏ tới `constitution` hoặc `project-context`.
- `DoR`, `DoD`, `release`, `business_acceptance` chỉ do backbone workflow quyết định.
- execution loop không được bypass business gate.
- planning artifact kiểu `PRD/story` chỉ được dùng để bổ trợ planning, không thay `BRD/SRS`.

## Framework Contributions

| Framework | Vai trò trong target architecture | Không được làm |
|---|---|---|
| `spec-kit` | governance layer: `constitution`, `checklist`, `clarify/analyze` mindset | thay workflow backbone |
| `OpenSpec` | change layer: `specs/` vs `changes/`, proposal/apply/archive, spec delta | thay `BRD/SRS` bằng OpenSpec spec folders |
| `cc-sdd` | execution layer: `requirements -> design -> tasks -> implementation`, reviewer loop | quyết định thay `DoR/DoD` |
| `BMAD-METHOD` | adaptive planning: `quick/full/enterprise`, role-aware agile planning, story-centric implementation | thay toàn bộ role/artifact hiện tại bằng BMAD roles/artifacts |

## Artifact Model Đích

```text
project-context/
  constitution.md
  project-context.md
  checklists/
    default.md
    strict.md
    regulated.md
  governance-exception-register.md

product-specs/
  brd/
    <scope>.md
  srs/
    <scope>.md

changes/
  <change-id>/
    proposal.md
    design.md
    tasks.md
    spec-delta/
      brd.delta.md
      srs.delta.md
    execution/
      task-status.md
    archive-metadata.md

workflow/
  <work-item>/
    <work-item>.s01.restate.md
    <work-item>.s02.business-goal.md
    <work-item>.s03.open-questions.md
    <work-item>.s04.acceptance-criteria.md
    <work-item>.s05.technical-approach.md
    <work-item>.s06.task-breakdown.md
    <work-item>.s07.implementation.md
    <work-item>.s08.verification.md
```

## Ý Nghĩa Từng Vùng Artifact

| Vùng | Vai trò |
|---|---|
| `project-context/` | nơi giữ rule dùng chung của dự án như `constitution`, coding standards, collaboration preference và `quality bar` |
| `product-specs/` | nơi giữ `BRD/SRS` chính thức sau khi đã review/approve |
| `changes/` | nơi đóng gói từng thay đổi theo proposal, design, tasks, delta và archive lifecycle |
| `workflow/` | nơi giữ step note, traceability, role outputs, DoR/DoD evidence và execution topology |

## Planning Track Từ BMAD

| Track | Khi dùng | Tác động lên workflow backbone |
|---|---|---|
| `quick` | bug nhỏ, change nhỏ, scope rõ | rút gọn chiều sâu `s01-s06`, nhưng vẫn giữ verify/evidence ở `s08` |
| `full` | feature vừa hoặc lớn | chạy đủ 8 bước với `BRD/SRS`, design và task plan đầy đủ |
| `enterprise` | có security/devops/compliance/release phức tạp | tăng chiều sâu `s04-s08`, thêm review/signoff lane và planning artifact bổ sung |

Planning track là metadata điều chỉnh độ sâu planning, không tạo workflow mới.

## Mapping Nguồn Ngoài Vào Từng Step

| Step | Backbone owner | Lớp bổ sung chính |
|---|---|---|
| `s01 Clarify` | workflow hiện tại | `spec-kit clarify`, `BMAD project-context`, `OpenSpec` proposal intent; ghi `governance context` ban đầu |
| `s02 Business Goal` | workflow hiện tại | `BMAD` role collaboration mindset, `spec-kit` goal/checklist discipline; chốt alignment cơ bản với nguyên tắc nền |
| `s03 Open Questions` | workflow hiện tại | `spec-kit analyze/checklist`, `OpenSpec` proposal refinement; làm lộ `governance blocker` nếu có |
| `s04 Acceptance + DoR` | workflow hiện tại | gate trung tâm; khóa `DoR`, `spec-freeze`, reviewer coverage và `governance checks` cho readiness |
| `s05 Technical Approach` | workflow hiện tại | `OpenSpec design`, `cc-sdd` design contract, `BMAD` planning depth; ghi `governance exception` khi lệch chuẩn |
| `s06 Task Plan` | workflow hiện tại | `cc-sdd requirements -> design -> tasks`, `BMAD` story slicing; bảo đảm coverage cho review/verify/governance |
| `s07 Implement` | workflow hiện tại | `cc-sdd` implementer/reviewer/fixer loop, `BMAD quick-dev/story-centric loop`; không đi lệch rule mà không ghi exception |
| `s08 Verify + DoD` | workflow hiện tại | `spec-kit` checklist, `cc-sdd` independent review, `OpenSpec archive` readiness; kết luận rõ `governance compliance` |

## Role Architecture

| Role hiện tại | Giữ nguyên | Mượn thêm từ framework ngoài |
|---|---|---|
| `po` | owner business value, scope, acceptance | PM mindset từ `BMAD`, checklist discipline từ `spec-kit` |
| `ba` | owner requirement, rule, traceability | analyst exploration từ `BMAD`, clarify/analyze mindset từ `spec-kit` |
| `designer` | owner UX/interaction/experience rule | UX planning depth từ `BMAD` |
| `developer` | owner approach, task, implementation coherence | execution contract từ `cc-sdd`, story slicing từ `BMAD` |
| `qc` | owner verify, evidence, DoD | checklist/analyze từ `spec-kit`, test-architect mindset từ `BMAD` |
| `devops` | owner packaging/runtime/release contract | enterprise planning depth từ `BMAD` |

## Command Và Skill Architecture

- chỉ nên có một command surface nội bộ cho repo
- command nội bộ có thể bọc behavior của nhiều framework, nhưng không expose nguyên 4 bộ command
- command/skill mapping khuyến nghị:

| Hành vi | Nguồn cảm hứng chính |
|---|---|
| governance command | `spec-kit` |
| change proposal/apply/archive | `OpenSpec` |
| task execution loop | `cc-sdd` |
| planning track selection | `BMAD-METHOD` |

## Luồng Vận Hành Đích

```text
1. Chọn planning track: quick/full/enterprise
2. Nạp project-context hoặc constitution
3. Tạo hoặc cập nhật BRD/SRS context
4. Tạo change package trong changes/<change-id>/
5. Chạy workflow backbone 8 bước
6. Ở s07-s08 dùng execution loop kiểu cc-sdd
7. Verify xong thì sync spec delta vào BRD/SRS
8. Chỉ archive khi DoD + release + business_acceptance rõ
```

## Metadata Nên Có Trong Target Model

| Metadata | Vai trò |
|---|---|
| `planning_track: quick|full|enterprise` | điều chỉnh độ sâu planning |
| `governance_ref` | field canonical, link tới `constitution` hoặc `project-context` dùng cho work item hoặc step |
| `governance_profile` | mức độ governance áp dụng: `default`, `strict`, `regulated`, `custom` |
| `governance_status` | dùng enum chuẩn: `ALIGNED|CHECKS_PENDING|EXCEPTION_RECORDED|WAIVER_APPROVED|BLOCKED|NOT_APPLICABLE` |
| `checklist_refs` | link tới checklist hoặc review pack liên quan |
| `change_id` | nối backbone workflow với change package |
| `change_status` | draft, approved, implementing, verified, archived |
| `spec_delta_refs` | link tới phần delta của `BRD/SRS` |
| `archive_status` | chưa archive, ready_to_archive, archived |
| `execution_mode` | dùng enum note-level: `agentic|multi_agent`; nếu runtime cần fallback thì theo `sequential_multi_role` trong execution policy |
| `review_mode` | dùng enum thống nhất: `self|independent|auto_fix_loop` |

Quy ước đồng bộ:

- Trong prose có thể viết `multi-agent`, nhưng trong schema và frontmatter dùng `multi_agent`.
- `sequential_multi_role` là runtime fallback, không phải execution mode mặc định của note frontmatter.
- Governance Pack mức project đã được materialize ở `project-context/`; `governance_ref` mặc định nên trỏ `project-context/project-context.md`.

## Boundary Cần Giữ Rất Chặt

| Boundary | Quy tắc |
|---|---|
| Product spec vs change | `BRD/SRS` không bị thay bởi `proposal/tasks` |
| Workflow vs framework | framework ngoài không được tạo workflow cạnh tranh |
| Change vs execution | `changes/` không thay `workflow/` |
| Execution vs governance | execution loop không thay `DoR/DoD` |
| Governance vs step | governance không được trôi thành tài liệu nền thuần túy; phải đi vào gate hoặc exception của step tương ứng |
| Planning aid vs rollout truth | `PRD/story` chỉ là planning aid, không thay artifact chính |

## Điều Chưa Nên Làm Ngay

- chưa nên import nguyên command set của bất kỳ framework nào
- chưa nên rename role hiện tại theo BMAD
- chưa nên đổi `BRD/SRS` sang naming scheme của framework ngoài
- chưa nên archive/change-sync automation khi change protocol chưa ổn định

## Kết Luận

Target architecture khuyến nghị cho repo này là:

- workflow hiện tại làm `backbone`
- `spec-kit` làm `governance layer`
- `OpenSpec` làm `change layer`
- `cc-sdd` làm `execution layer`
- `BMAD-METHOD` làm `adaptive planning layer`

Tài liệu này nên được đọc cùng:

- `references/workflow-chain.md`
- `references/spec-driven-development.md`
- `references/sdd-merge-strategy.md`
- `references/execution-runtime.md`
