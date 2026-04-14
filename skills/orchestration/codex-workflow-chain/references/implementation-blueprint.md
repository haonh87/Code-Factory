# Implementation Blueprint Cho Workflow Backbone

Tài liệu này chuyển `target-architecture.md` thành rollout plan có thể triển khai.

Mục tiêu:

- cho biết lớp nào đã materialize
- cho biết lớp nào mới ở mức reference
- chốt thứ tự rollout để workflow tiến tới trạng thái đáp ứng `SDD` và các layer đã thống nhất
- giúp kiểm soát scope, artifact, validator, CI và done criteria theo từng phase

Thời điểm đối chiếu: `2026-04-13`.

## Cách Đọc

- `DONE`: đã materialize ở mức sử dụng thật trong repo
- `PARTIAL`: đã có contract/reference hoặc metadata nền, nhưng chưa có full artifact + validator + CI tương ứng
- `NOT STARTED`: mới ở mức target architecture hoặc merge strategy

## Bảng Trạng Thái Hiện Tại

| Lớp | Trạng thái | Đã có | Còn thiếu |
|---|---|---|---|
| Backbone workflow | `DONE` | workflow 8 bước, naming, frontmatter, step contract, `work-items/` canonical root | hardening thêm theo phase sau |
| Governance layer | `DONE` baseline | `project-context/`, `constitution`, checklist, role model, decision model, validator, scaffold, fixture, authority/state enforcement baseline và CI phase 1-2 | semantic lint và stale register checks sâu hơn |
| SDD layer | `DONE` baseline | `product-specs/`, template `BRD/SRS`, `sdd_mode`, `spec_refs`, `spec_status`, sample strict work item, validator SDD, CI SDD | hardening thêm cho fixture SDD và semantic lint sâu hơn |
| Change layer | `DONE` baseline | `changes/`, sample change package, metadata `change_*`, scaffold change, validator change, CI change | hardening thêm cho archive lifecycle, delta semantics và fixture sâu hơn |
| Execution layer | `DONE` baseline | `execution_mode`, `review_mode`, execution runtime reference, runtime artifacts thật, sample `multi_agent`, validator execution, CI execution | hardening thêm cho multi-worker depth, escalation flow và runner semantics |
| Adaptive planning | `DONE` baseline | `planning_track`, routing matrix, scaffold preset, validator planning, CI planning, sample quick/enterprise | hardening thêm cho semantic routing và depth-specific lint |
| Automation guardrail | `DONE` baseline | `npm` command surface, Node validators, fixture suite, CI jobs cho artifact/governance/SDD/change/execution/planning và authoring smoke | drift checks sâu hơn, semantic lint sâu hơn |

## Nguyên Tắc Rollout

- workflow backbone là trục xương sống duy nhất
- không rollout layer mới nếu layer trước đó chưa có source-of-truth rõ
- validator chỉ được thêm sau khi contract đã chốt
- CI chỉ enforce thứ đã có local command ổn định
- không dùng framework ngoài để thay artifact chính của repo

## Phase 0. Backbone Và Governance

### Mục tiêu

- ổn định workflow 8 bước
- materialize governance thành rule thật, không chỉ là prose
- tạo command surface chuẩn và CI nền cho workflow artifacts

### Trạng thái

`DONE`

### Artifact/source-of-truth

- `work-items/`
- `project-context/constitution.md`
- `project-context/project-context.md`
- `project-context/governance-role-model.md`
- `project-context/governance-decision-model.md`
- `project-context/checklists/*.md`
- `project-context/governance-exception-register.md`

### Tooling/validator

- `scripts/scaffold-workflow.js`
- `scripts/validate-workflow.js`
- `scripts/validate-workflow-artifact-names.js`
- `scripts/validate-workflow-governance.js`
- `scripts/run-workflow-governance-fixtures.js`

### CI

- `.github/workflows/workflow-guardrails.yml`
- Job `workflow-tooling`
- Job `workflow-artifacts`

### Done criteria

- scaffold và validate workflow chạy qua `npm`
- governance metadata/block được enforce
- `work-items/` được validate trong CI
- có sample canonical work item

## Phase 1. SDD Materialization

### Mục tiêu

- biến `SDD` từ layer contract thành artifact thật có thể vận hành
- đưa `BRD/SRS` thành source-of-truth chính thức cho work item chạy theo spec-driven delivery

### Framework/source

- repo-native workflow backbone
- tư duy `spec-kit` cho quality/spec discipline

### Trạng thái

`DONE`

### Artifact cần materialize

- `product-specs/brd/<scope>.md`
- `product-specs/srs/<scope>.md`
- template `BRD`
- template `SRS`
- ít nhất một work item `sdd_mode=strict`

### Metadata/schema cần thêm hoặc chốt

- `spec_refs.brd`
- `spec_refs.srs`
- `spec_status`
- requirement IDs như `BRD-*`, `SRS-FR-*`, `SRS-NFR-*`, `SRS-UX-*`

### Tích hợp vào workflow

- `s01-s02`: tạo hoặc cập nhật `BRD`
- `s03-s04`: tạo hoặc cập nhật `SRS`
- `s04`: chốt `Spec Freeze`
- `s05-s07`: dùng `Spec Change` khi phát hiện gap sau freeze
- `s06`: materialize `SDD Traceability`
- `s08`: materialize `Spec Coverage`

### Tooling đã materialize

- `scripts/validate-workflow-sdd.js`
- `npm run validate:workflow:sdd`
- sample strict work item tại `work-items/sample-sdd-item/`

### CI đã materialize

- Job `workflow-sdd`

### Done criteria

- có `product-specs/` thật trong repo
- `BRD/SRS` liên kết được từ `work-items/`
- requirement IDs hợp lệ
- `Spec Freeze` không bị bypass ở `s04`
- `Spec Coverage` kết luận được ở `s08`

### Phụ thuộc

- Phase 0 hoàn tất

## Phase 2. Change Layer

### Mục tiêu

- materialize lớp `OpenSpec-style change management`
- tách rõ current truth của spec với package của thay đổi

### Framework/source

- `OpenSpec`

### Trạng thái

`DONE` baseline

### Artifact cần materialize

- `changes/<change-id>/proposal.md`
- `changes/<change-id>/design.md`
- `changes/<change-id>/tasks.md`
- `changes/<change-id>/spec-delta/brd.delta.md`
- `changes/<change-id>/spec-delta/srs.delta.md`
- `changes/<change-id>/execution/task-status.md`
- `changes/<change-id>/archive-metadata.md`

### Metadata/schema cần thêm hoặc chốt

- `change_id`
- `change_status`
- `spec_delta_refs`
- `archive_status`

### Tích hợp vào workflow

- `s01-s03`: xác định intent/change scope
- `s05`: `design.md` và `spec-delta` làm input
- `s06`: `tasks.md` phải trace được về `change_id`
- `s08`: kết luận `ready_to_archive` hay chưa

### Tooling đã materialize

- `scripts/scaffold-change-package.js`
- `scripts/validate-workflow-change.js`
- `npm run scaffold:change`
- `npm run validate:workflow:change`

### CI đã materialize

- Job `workflow-changes`

### Done criteria baseline

- ít nhất một change package đầy đủ
- `work-items/` và `changes/` nối được qua `change_id`
- `spec_delta_refs` trỏ được về delta thật
- archive readiness được phản ánh nhất quán ở note và change package

### Phụ thuộc

- Phase 1 nên hoàn tất trước để có `BRD/SRS` thật

## Phase 3. Execution Layer

### Mục tiêu

- biến `execution runtime` từ reference thành runtime contract có artifact thật
- chuẩn bị cho rollout `cc-sdd` kiểu implementer/reviewer/fixer mà không phá backbone

### Framework/source

- `cc-sdd`

### Trạng thái

`DONE` baseline

### Artifact cần materialize

- `execution-policy`
- `worker-assignment`
- `worker-handoff-report`
- `merge-report`
- `execution-escalation` khi cần

### Metadata/schema cần thêm hoặc chốt

- `review_mode`
- `execution_roles`
- `verification_owner`
- điều kiện vào `multi_agent`

### Tích hợp vào workflow

- `s05`: có thể thêm `execution-policy`
- `s06`: chia assignment nếu `multi_agent`
- `s07`: worker handoff và merge report
- `s08`: independent review hoặc `auto_fix_loop`

### Tooling đã materialize

- `scripts/validate-workflow-execution.js`
- `npm run validate:workflow:execution`
- sample `multi_agent` work item

### CI đã materialize

- Job `workflow-execution`

### Done criteria baseline

- có ít nhất một work item chạy `multi_agent`
- `execution-policy` và `merge-report` hợp lệ
- `review_mode` được dùng thật ở `s08`

### Phụ thuộc

- Phase 1 ổn định
- Phase 2 có thể làm song song phần cuối nếu change package đã rõ

## Phase 4. Adaptive Planning

### Mục tiêu

- materialize lớp `BMAD` ở mức routing và planning depth
- giữ một backbone duy nhất nhưng thay đổi độ sâu artifact/gate theo scope

### Framework/source

- `BMAD-METHOD`

### Trạng thái

`DONE` baseline

### Metadata/schema cần thêm hoặc chốt

- `planning_track: quick|full|enterprise`

### Artifact và rule cần materialize

- routing matrix theo `work_item_type`, boundary count, release/runtime risk, governance profile
- scaffold preset cho từng track
- sample `quick`, `full`, `enterprise`

### Tích hợp vào workflow

- `quick`: rút gọn depth `s01-s06`
- `full`: chạy đầy đủ `BRD/SRS`
- `enterprise`: tăng review/signoff lane và evidence ở `s04-s08`

### Tooling đã materialize

- `scripts/validate-workflow-planning.js`
- `npm run validate:workflow:planning`

### CI đã materialize

- Job `workflow-planning`

### Done criteria baseline

- scaffold chọn được planning track
- validator bắt được artifact depth không khớp track
- cùng một workflow backbone nhưng `quick/full/enterprise` cho ra chiều sâu khác nhau đúng rule

### Phụ thuộc

- Phase 1 nên hoàn tất trước
- Phase 3 nên có execution/runtime metadata cơ bản

## Phase 5. Hardening

### Mục tiêu

- khóa chất lượng dài hạn
- giảm drift giữa docs, scaffold, validator và CI

### Trạng thái

`DONE` baseline

### Hạng mục đã materialize baseline

- CI phase 3 `workflow-authoring-smoke`
- authority enforcement sâu cho `approved_by`
- state/gate enforcement sâu cho `governance_status`
- fixture regression cho authority/state rule mới

### Hạng mục còn lại

- stale `governance-exception` checks sâu hơn
- drift checks giữa docs/reference/scaffold/validator khi cần
- semantic lint sâu hơn cho evidence và traceability

### Quyết Định Rollout

- `workflow-authoring-smoke` đã được implement sau khi `change`, `execution` và `planning` ổn định baseline.
- Hardening hiện tại khóa drift ở mức mechanical trước; semantic lint sâu hơn là phase sau.

### Tooling đã materialize baseline

- smoke script cho `scaffold -> validate`
- validator rule sâu hơn cho governance authority/state
- fixture fail cases cho authority/state rule mới

### CI đã materialize baseline

- Job `workflow-authoring-smoke`
- optional drift check jobs

### Done criteria

- scaffold regression bị bắt trong CI
- governance exception/waiver không bị bỏ quên
- contract drift giữa docs và tooling giảm xuống mức chấp nhận được

## Command Surface Đích

| Command | Vai trò | Phase |
|---|---|---|
| `npm run scaffold:workflow` | scaffold workflow backbone | 0 |
| `npm run scaffold:workflow-step` | scaffold từng step | 0 |
| `npm run validate:workflow` | naming + governance + canonical root validation | 0 |
| `npm run validate:workflow:fixtures` | regression suite cho governance tooling | 0 |
| `npm run validate:workflow:sdd` | validate `BRD/SRS`, freeze, traceability, coverage | 1 |
| `npm run scaffold:change` | tạo change package | 2 |
| `npm run validate:workflow:change` | validate change package và link sang work item/spec | 2 |
| `npm run validate:workflow:execution` | validate execution runtime contract | 3 |
| `npm run validate:workflow:planning` | validate planning track | 4 |
| `npm run validate:workflow:authoring-smoke` | smoke test `scaffold -> validate` qua các case đại diện | 5 |

## Control Board Theo Phase

| Phase | Tên | Mức ưu tiên hiện tại | Trạng thái hiện tại |
|---|---|---|---|
| 0 | Backbone + Governance | đã xong | `DONE` |
| 1 | SDD Materialization | đã xong baseline | `DONE` |
| 2 | Change Layer | đã xong baseline | `DONE` |
| 3 | Execution Layer | đã xong baseline | `DONE` |
| 4 | Adaptive Planning | đã xong baseline | `DONE` |
| 5 | Hardening | đã xong baseline | `DONE` |

## Kết Luận Điều Hành

Nếu mục tiêu là đưa workflow hiện tại đáp ứng target architecture và kiểm soát được roadmap:

- đừng làm thêm governance trước
- `Phase 1: SDD Materialization` đã có baseline thật trong repo
- `Phase 2: Change Layer` cũng đã có baseline thật trong repo
- `Phase 3: Execution Layer` cũng đã có baseline thật trong repo
- `Phase 4: Adaptive Planning` cũng đã có baseline thật trong repo
- `Phase 5: Hardening` đã có baseline thật trong repo
- `workflow-authoring-smoke` đã nằm trong CI và authoring flow đã được smoke test end-to-end
- chỉ sau khi spec và change layer ổn định mới nên tăng autonomy ở execution layer

Tài liệu nên đọc cùng:

- `references/target-architecture.md`
- `references/spec-driven-development.md`
- `references/sdd-merge-strategy.md`
- `references/workflow-ci-enforcement.md`
