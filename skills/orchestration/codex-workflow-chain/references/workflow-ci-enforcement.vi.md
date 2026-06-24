---
language: vi
---

# Workflow CI Enforcement Design

> Tiếng Anh / English: workflow-ci-enforcement.md

Tài liệu này mô tả bản thiết kế cho `CI enforcement` của workflow tooling trong repo.

Thời điểm đối chiếu: `2026-04-13`.

Trạng thái:

- đây là tài liệu `design + trạng thái hiện hành`
- phase 1 đã materialize tại `.github/workflows/workflow-guardrails.yml`
- phase 2 đã materialize trong cùng workflow file với job `workflow-artifacts`
- `workflow-sdd` đã được materialize như CI job riêng cho `BRD/SRS`, `Spec Freeze`, `SDD Traceability` và `Spec Coverage`
- `workflow-changes` đã được materialize như CI job riêng cho `change_id`, `spec_delta_refs`, `archive_status` và change package root `changes/`
- `workflow-execution` đã được materialize như CI job riêng cho `multi_agent`, runtime artifacts và `review_mode`
- `workflow-planning` đã được materialize như CI job riêng cho `planning_track` và routing presets `quick|full|enterprise`
- `workflow-authoring-smoke` đã được materialize như CI job riêng cho flow `scaffold -> validate`
- governance validator hiện đã enforce baseline cho authority/state và register consistency, không chỉ block/metadata cơ bản
- mục tiêu là chốt rõ CI phải làm gì, không làm gì, chạy lệnh nào và fail ở đâu

## Mục Tiêu

- biến workflow tooling từ "docs + command local" thành "chuẩn được enforce tự động"
- dùng đúng command surface hiện có qua `npm`
- kiểm được `naming`, `governance`, fixture suite và workflow artifacts thật khi đã materialize
- kiểm được cả contract `SDD` khi repo có `product-specs/` và work item `sdd_mode=light|strict`
- kiểm được cả contract `change layer` khi repo có `changes/` và work item gắn `change_id`
- kiểm được cả contract `execution layer` khi repo có runtime artifacts và work item gắn `execution_mode=multi_agent`
- kiểm được cả contract `adaptive planning` khi repo có `planning_track`
- không tạo thêm workflow business mới ngoài backbone 8 bước
- `work-items/` là canonical artifact root cho workflow artifacts thật từ phase 2 trở đi

## Vai Trò Của CI Enforcement

Trong repo này:

- workflow backbone `s01 -> s08` quyết định step, gate, signoff, handoff
- `CI enforcement` là lớp vận hành tự động để kiểm artifact workflow có tuân thủ contract hay không

CI enforcement không thay:

- `DoR`
- `DoD`
- `release signoff`
- `business_acceptance`
- judgment của `po|ba|designer|developer|qc|devops`

CI enforcement chỉ kiểm những gì máy có thể xác nhận rõ ràng.

## Những Gì CI Phải Enforce

### 1. Workflow Tooling Baseline

CI phải chạy được command chuẩn:

```bash
wfc fixtures
```

Mục đích:

- bảo vệ validator khỏi regression
- bảo vệ fixture suite khỏi drift
- xác nhận `pass cases` vẫn pass và `expected fail cases` vẫn fail

### 2. Workflow Artifact Contract

Khi repo có workflow artifacts thật, CI phải chạy:

```bash
wfc validate --workflow-root work-items --project-root .
```

Mục đích:

- kiểm filename theo step contract
- kiểm frontmatter bắt buộc
- kiểm `governance_ref`, `governance_profile`, `governance_status`, `checklist_refs`
- kiểm block governance theo step
- kiểm exception hoặc waiver và register khi cần

### 3. Change Layer Contract

Khi repo có change package thật, CI phải chạy:

```bash
wfc change --workflow-root work-items --project-root .
```

Mục đích:

- kiểm `change_id`, `change_status`, `archive_status`
- kiểm `spec_delta_refs` trỏ tới delta thật
- kiểm change package root `changes/<change-id>/`
- kiểm `proposal`, `design`, `tasks`, `spec-delta`, `archive-metadata` có đủ và khớp `change_id`

### 4. Authoring Flow Integrity

CI phải đảm bảo các artifact được scaffold hoặc author bằng tay vẫn pass cùng một command chuẩn.

Điều này giữ flow:

```text
scaffold -> edit -> validate -> review
```

không bị lệch giữa local và CI.

## Những Gì CI Không Nên Enforce

CI không nên tự quyết:

- business goal có đủ mạnh hay không
- technical approach có tối ưu hay không
- acceptance criteria có hợp ý stakeholder hay không
- residual risk có chấp nhận được về mặt business hay không

Lý do:

- đây là judgment layer
- phải do role owner và signoff owner kết luận

## Command Surface Chuẩn

CI chỉ nên gọi command chuẩn qua `npm`.

Danh sách command hiện có:

- `npm run scaffold:change`
- `npm run scaffold:workflow`
- `npm run scaffold:workflow-step`
- `npm run validate:workflow`
- `npm run validate:workflow:naming`
- `npm run validate:workflow:governance`
- `npm run validate:workflow:sdd`
- `npm run validate:workflow:change`
- `npm run validate:workflow:execution`
- `npm run validate:workflow:planning`
- `npm run validate:workflow:fixtures`

Nguyên tắc:

- không gọi PowerShell validator làm runtime chính
- không để local và CI dùng hai command surface khác nhau
- `npm` là entrypoint duy nhất cho workflow tooling

## Thiết Kế Job

### Job 1. `workflow-tooling`

Mục tiêu:

- kiểm bản thân workflow tooling

Lệnh tối thiểu:

```bash
npm run validate:workflow:fixtures
```

Pass khi:

- toàn bộ `valid-*` fixtures pass
- toàn bộ `invalid-*` fixtures fail đúng kỳ vọng

Fail khi:

- validator logic đổi sai
- fixture bị hỏng
- naming/governance contract drift

### Job 2. `workflow-artifacts`

Mục tiêu:

- kiểm workflow artifacts thật của repo

Điều kiện bật:

- repo đã chốt `work-items/` là canonical artifact root và bắt đầu materialize workflow artifacts thật vào đó

Lệnh tối thiểu:

```bash
npm run validate:workflow -- --workflow-root work-items --project-root .
```

Pass khi:

- artifact naming đúng
- frontmatter đúng contract
- governance metadata và block pass validator

Fail khi:

- artifact mới tạo sai naming
- note thiếu frontmatter
- governance chưa được materialize đúng rule

### Job 3. `workflow-sdd`

Mục tiêu:

- kiểm `BRD/SRS` và contract `SDD` trên các work item có `sdd_mode`

Lệnh tối thiểu:

```bash
npm run validate:workflow:sdd -- --workflow-root work-items --project-root .
```

Pass khi:

- `spec_refs.brd` và `spec_refs.srs` trỏ tới product specs thật
- `spec_status` hợp lệ
- các block `Spec Freeze`, `SDD Traceability`, `Spec Coverage` có mặt đúng step
- sample SDD canonical pass validator

Fail khi:

- work item SDD trỏ tới spec không tồn tại
- `BRD/SRS` không có ID hoặc metadata tối thiểu
- step 4 hoặc step 8 thiếu block SDD bắt buộc

### Job 4. `workflow-changes`

Mục tiêu:

- kiểm change package và liên kết từ work item sang `changes/`

Lệnh tối thiểu:

```bash
npm run validate:workflow:change -- --workflow-root work-items --project-root .
```

Pass khi:

- work item có `change_id` trỏ tới package có thật
- `spec_delta_refs` tồn tại
- archive readiness không mâu thuẫn giữa note workflow và change package

Fail khi:

- thiếu file bắt buộc trong change package
- `change_id` sai pattern hoặc không có root tương ứng
- `verified` change vẫn để `archive_status=not_ready`

### Job 5. `workflow-execution`

Mục tiêu:

- kiểm `multi_agent` runtime contract và runtime artifacts thật

Lệnh tối thiểu:

```bash
npm run validate:workflow:execution -- --workflow-root work-items
```

Pass khi:

- `multi_agent` chỉ xuất hiện trên step được rollout
- `review_mode` và `verification_owner` hợp lệ
- runtime artifacts bắt buộc tồn tại và link lại từ note chính

Fail khi:

- thiếu `execution-policy`, `worker-assignment`, `worker-handoff-report` hoặc `merge-report`
- `multi_agent` không có execution roles hoặc verification owner
- step 8 dùng `multi_agent` nhưng vẫn để `review_mode=self`

### Job 6. `workflow-planning`

Mục tiêu:

- kiểm `planning_track` và routing preset `quick|full|enterprise`

Lệnh tối thiểu:

```bash
npm run validate:workflow:planning -- --workflow-root work-items
```

Pass khi:

- `planning_track` hợp lệ và nhất quán trong từng work item
- `quick` không tự leo lên ceremony nặng
- `enterprise` có governance/review lane phù hợp ở step delivery

Fail khi:

- cùng một work item có nhiều `planning_track`
- `quick` dùng `multi_agent` hoặc `review_mode=self` bị lệch rule
- `enterprise` vẫn để governance hoặc review lane quá nhẹ

### Job 7. `workflow-authoring-smoke`

Job này đã được materialize ở phase hardening sau khi contract của scaffold ổn định qua `change`, `execution` và `planning`.

Mục tiêu:

- bảo vệ scaffolder

Ví dụ flow smoke:

1. dựng temp project root tối giản
2. scaffold các case đại diện:
   - full baseline
   - quick single-step
   - enterprise multi-agent
   - strict SDD + change
3. chạy validator tương ứng trên output của từng case

Mục tiêu:

- xác nhận template scaffold luôn sinh ra output hợp lệ ngay từ đầu
- bắt regression khi scaffold, validator hoặc default preset bị lệch nhau

## Trigger Design

### Pull Request

Bản implement hiện tại chạy:

- `workflow-tooling`
- `workflow-artifacts`
- `workflow-sdd`
- `workflow-changes`
- `workflow-execution`
- `workflow-planning`
- `workflow-authoring-smoke`

Vai trò:

- chặn drift trước khi merge

### Push Vào `main`

Bản implement hiện tại chạy lại `workflow-tooling`, `workflow-artifacts`, `workflow-sdd`, `workflow-changes`, `workflow-execution`, `workflow-planning` và `workflow-authoring-smoke` để bảo vệ branch chính.

### Manual Dispatch

Nên có về sau để:

- rerun CI khi chỉ muốn audit workflow tooling
- hỗ trợ migration hoặc cleanup artifact cũ

## Fail Policy

CI nên fail cứng khi:

- fixture suite fail
- validator script fail
- workflow artifact thật fail contract

CI không nên chỉ warning với các rule mechanical ở trên, vì như vậy enforcement mất tác dụng.

## Path Scope Design

### Phase 1

Chỉ enforce:

- `scripts/`
- `packages/workflow-bundle/tests/fixtures/workflow-governance/`
- docs tham chiếu workflow/governance khi chúng làm hỏng contract tooling

Thực tế phase này chủ yếu chạy `validate:workflow:fixtures`.

### Phase 2

Bật thêm artifact thật:

- `work-items/`

### Phase 3

Có thể tối ưu theo changed paths:

- nếu chỉ đổi workflow tooling hoặc fixture thì chạy `workflow-tooling`
- nếu đổi artifact thật thì chạy thêm `workflow-artifacts`
- nếu đổi `product-specs/` thì chạy thêm `workflow-sdd`
- nếu đổi `changes/` hoặc work item có `change_id` thì chạy thêm `workflow-changes`
- nếu đổi runtime artifacts hoặc work item có `execution_mode=multi_agent` thì chạy thêm `workflow-execution`
- nếu đổi `planning_track`, routing doc hoặc sample planning items thì chạy thêm `workflow-planning`

Ở giai đoạn hiện tại, chưa cần tối ưu sớm; ưu tiên đơn giản và ổn định.

## Dependency Design

CI chỉ cần:

- `node`
- `npm`

Không nên phụ thuộc:

- `pwsh`
- tool cục bộ riêng theo OS

Lý do:

- repo đã thống nhất workflow tooling qua Node/npm
- giảm khác biệt giữa macOS, Linux, Windows và CI runner

## Mapping Với Workflow Hiện Tại

| Thành phần | Vai trò |
|---|---|
| `s01-s08` | business workflow backbone |
| `governance pack` | rule source-of-truth |
| `scaffold` | authoring entrypoint |
| `validate` | local guardrail |
| `CI enforcement` | tự động hóa guardrail trong PR/push |

Nói ngắn:

- `scaffold` giúp tạo đúng từ đầu
- `validate` giúp kiểm local
- `CI enforcement` giúp không ai bỏ qua bước kiểm đó khi merge

## Thiết Kế Rollout

### Phase A. Tooling CI

Chỉ bật:

- `workflow-tooling`

Mục tiêu:

- ổn định validator + fixture suite trước

### Phase B. Artifact CI

Sau khi có thư mục artifact thật, bật thêm:

- `workflow-artifacts`
- `workflow-sdd`
- `workflow-changes`
- `workflow-execution`
- `workflow-planning`

Mục tiêu:

- enforce contract trên output thật của workflow, `BRD/SRS` và change package

### Phase C. Authoring Smoke

Sau khi scaffolder ổn định, thêm:

- `workflow-authoring-smoke`

Mục tiêu:

- ngăn regression ở template/generator

## Thiết Kế File CI Khuyến Nghị

File CI phase 1 hiện tại là:

```text
.github/workflows/workflow-guardrails.yml
```

Tên này phản ánh đúng vai trò:

- không phải release pipeline
- không phải app CI chung
- mà là guardrail cho workflow tooling và workflow artifacts

## Definition Of Done Cho CI Enforcement

Phase 1 được xem là đủ khi:

- có workflow file CI thật
- CI chạy được `npm run validate:workflow:fixtures`
- branch chính bị fail nếu fixture suite fail
- docs trỏ về đúng command và đúng CI scope

Phase 2 được xem là đủ khi:

- validate được cả artifact workflow thật dưới `work-items/`
- local flow và CI flow dùng cùng một command surface

Baseline change-layer được xem là đủ khi:

- validate được cả change package thật dưới `changes/`
- `work-items/`, `product-specs/` và `changes/` nối được với nhau qua `change_id` và `spec_delta_refs`

Baseline execution-layer được xem là đủ khi:

- validate được runtime artifacts thật dưới `work-items/`
- có ít nhất một sample `multi_agent` canonical pass validator
- `review_mode` và `verification_owner` được dùng thật ở step 8

Baseline adaptive-planning được xem là đủ khi:

- có sample `quick` và `enterprise` canonical
- `planning_track` được scaffold và validate được
- CI bắt được lệch routing preset trước khi merge

## Kết Luận

CI enforcement trong repo này nên được hiểu là:

- một lớp `automation guardrail`
- dùng chung command `npm`
- bảo vệ `validator`, `fixture`, `scaffold` và workflow artifacts thật
- không thay thế judgment, signoff hay business gate của workflow backbone
