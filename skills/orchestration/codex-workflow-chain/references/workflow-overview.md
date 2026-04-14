# Workflow Overview: Technical Reference

Tài liệu này là bản tham chiếu nội bộ thiên về kỹ thuật cho workflow của repo.

Mục tiêu của bản này là làm rõ:

- mechanics của workflow theo từng layer
- `SDD` lifecycle, gating và traceability ở mức kỹ thuật
- validator, CI enforcement và automation guardrail
- execution/change/planning metadata và rollout status hiện tại

Nếu cần bản overview chính thức để giới thiệu workflow ở góc nhìn delivery và tác giả, đọc `workflow-overview-author-edition.md`.

Thời điểm đối chiếu: `2026-04-14`.

## Phạm Vi Technical Reference

Workflow vẫn dùng cùng backbone 8 bước cho phát triển phần mềm có AI hỗ trợ:

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

Trong file này, trọng tâm không phải product narrative mà là cách workflow được materialize thành:

- layer và artifact có thể kiểm chứng
- rule và metadata có thể validate
- source-of-truth refs rõ ràng
- execution/change/planning contract rõ ràng
- CI và rollout status có thể đối chiếu

Điểm cần giữ rõ trong bản technical reference:

- workflow chỉ có **một backbone duy nhất**
- mọi lớp như `governance`, `SDD`, `change`, `execution`, `adaptive planning` đều bám vào backbone này
- không tạo workflow song song cho từng framework hay từng role

## Workflow Có Gì

Workflow hiện tại đã materialize baseline theo implementation blueprint:

- `backbone` 8 bước
- `governance layer`
- `SDD layer`
- `change layer`
- `execution layer`
- `adaptive planning`
- `automation guardrail`

### 1. Backbone 8 Bước

Backbone là nơi quyết định:

- step
- gate
- handoff
- signoff
- `release readiness`
- `business_acceptance`

Backbone không thay đổi khi scope thay đổi. Thứ thay đổi là độ sâu của artifact, checklist, review lane và execution mode.

### 2. Governance Layer

Workflow dùng mô hình `hybrid governance`:

- phần lớn `governance` đi thẳng vào step contract, gate, handoff và evidence
- phần còn lại nằm ở `constitution`, `project-context`, `checklist`, `governance-exception`

Điều này giúp workflow:

- không bị phình thêm step riêng cho governance
- nhưng vẫn có quality bar, exception, waiver, role authority và validator rõ ràng

### 3. SDD Layer

Workflow đã đáp ứng `Spec Driven Development` theo đúng tinh thần:

- `BRD` và `SRS` là source-of-truth khi work item chạy theo spec
- `Spec Freeze` ở cuối `s04`
- `Spec Change` khi step 5-7 phát hiện lệch spec
- `SDD Traceability` nối từ requirement tới task/test
- `Spec Coverage` ở `s08`

Nói ngắn:

- workflow vẫn giữ 8 bước
- nhưng `BRD/SRS` thật sự điều khiển design, task, implementation và verification

### 4. Change Layer

Workflow có `OpenSpec-style change layer` để tách rõ:

- source-of-truth của sản phẩm
- source-of-truth của thay đổi

`BRD/SRS` vẫn là truth của sản phẩm.
`changes/<change-id>/` là truth của package thay đổi:

- `proposal`
- `design`
- `tasks`
- `spec-delta`
- `archive`

### 5. Execution Layer

Workflow không ép mọi step đều chạy một kiểu.

Nó hỗ trợ:

- `agentic`: một agent giữ trọn ownership của step
- `multi_agent`: coordinator + worker + verifier cho step có nhiều boundary

Execution topology không thay step business; nó chỉ thay cách step được vận hành.

### 6. Adaptive Planning

Workflow có `planning_track` để scale theo độ phức tạp:

- `quick`
- `full`
- `enterprise`

Điều này cho phép cùng một backbone phục vụ:

- bug nhỏ
- feature vừa hoặc lớn
- scope enterprise có review hoặc release lane phức tạp

### 7. Automation Guardrail

Workflow không dừng ở docs. Nó có:

- scaffold
- validator
- fixture suite
- CI enforcement
- authoring smoke

Điều này biến workflow từ “hướng dẫn nên làm” thành “contract có thể chạy và có thể bị fail nếu làm sai”.

## Workflow Mang Tới Điều Gì

### 1. Một Ngôn Ngữ Chung Cho Cả Delivery

Workflow này cho `PO`, `BA`, `Designer`, `Developer`, `QC`, `DevOps` cùng nhìn vào một chain duy nhất.

Thay vì mỗi role có một quy trình khác nhau, workflow này giữ:

- cùng một `work item`
- cùng một `source-of-truth`
- cùng một `handoff`
- cùng một cách chốt `DoR`, `DoD`, `release`, `business_acceptance`

### 2. Từ Yêu Cầu Thô Tới Output Có Thể Audit

Workflow không chỉ hỏi “đã code xong chưa”.
Nó ép phải trả lời:

- đang giải quyết vấn đề gì
- kết quả business mong muốn là gì
- requirement nào đang in-scope
- vì sao chọn solution này
- task nào cover requirement nào
- verify dựa trên evidence gì
- còn gap hay residual risk nào

### 3. Vừa Gọn, Vừa Scale Được

Workflow không cố biến mọi change thành ceremony nặng.

- `quick` cho change nhỏ
- `full` cho feature thông thường
- `enterprise` cho scope nhiều risk hoặc nhiều signoff

### 4. Phù Hợp Với AI-Assisted Delivery

Workflow được thiết kế để AI không chỉ “viết code”, mà còn:

- hiểu scope
- biết gate
- bám spec
- không bypass governance
- tạo artifact đúng contract
- tự validate output

## Workflow Đang Đáp Ứng SDD Như Thế Nào

Workflow áp dụng `SDD` như một lớp ràng buộc, không phải workflow riêng.

### Source-of-Truth

- `BRD`: khóa problem, goal, KPI, scope, business rule
- `SRS`: khóa functional requirement, NFR, UX/system behavior, acceptance mapping

### Lifecycle

```text
draft -> reviewed -> approved -> frozen -> implemented -> verified -> accepted
```

### Gating

- `s04`: chốt `Spec Freeze`
- `s05-s07`: nếu lệch spec thì mở `Spec Change`
- `s08`: chốt `Spec Coverage`

### Traceability

Workflow trace tối thiểu chuỗi:

```text
BRD-###
-> SRS-FR|SRS-NFR|SRS-UX
-> AC-###
-> TASK-###
-> TEST-###
-> PASS|FAIL|PARTIAL|UNTESTED
```

### Ý Nghĩa Thực Tế

Điều này khiến workflow không để:

- spec chỉ là tài liệu tham khảo
- code âm thầm thay đổi behavior nhưng không cập nhật spec
- verification chỉ test cảm tính mà không map về requirement

## 8 Bước Đang Thể Hiện Ra Sao

| Step | Mục tiêu | Input chính | Output chính | Cách validate |
|---|---|---|---|---|
| `s01 Clarify` | làm rõ yêu cầu, scope draft, constraint, `governance context` | raw request, context ban đầu | restated request, scope draft, assumptions, governance context | step contract, required block, naming/frontmatter |
| `s02 Business Goal` | chốt giá trị business, KPI, non-goals | yêu cầu đã clarify | business goal, success metrics, non-goals | traceability với step sau, contract completeness |
| `s03 Open Questions` | làm lộ blocker, conflict, missing input | goal + context hiện có | open questions, blocker, readiness verdict | readiness block, audit block, owner resolution |
| `s04 Acceptance + DoR` | chốt acceptance criteria, readiness và `Spec Freeze` | goal + answers cho open questions | AC đo được, DoR, governance checks, spec freeze nếu có | governance validator, DoR gate, SDD validator |
| `s05 Technical Approach` | chọn solution và boundary kỹ thuật phù hợp | AC, governance, system context, frozen spec | recommended approach, trade-off, boundary, spec change nếu có | governance checks, trace về spec/change |
| `s06 Task Plan` | bẻ nhỏ thành task có thứ tự và coverage | technical approach | task plan, review/verify checkpoints, rollout coverage | planning validator, traceability, governance checks |
| `s07 Implement` | materialize thay đổi thật | task plan, codebase, rules đã chốt | code/config/doc changes, runtime artifacts nếu có | execution validator, change validator, spec alignment |
| `s08 Verify + DoD` | kết luận evidence, completion, compliance | implementation output, AC, spec, checklist | verification evidence, DoD, spec coverage, compliance verdict | testing/review, governance validator, DoD gate, CI |

## Mục Tiêu, Input Và Output Của Mỗi Bước

### `s01 Clarify`

- Mục tiêu:
  làm rõ yêu cầu, scope ban đầu, ràng buộc và `governance context`
- Input:
  raw request, ticket, bug report, change ask, context ban đầu
- Output:
  bản hiểu chung về yêu cầu, scope draft, assumptions, dependencies, initial risks

### `s02 Business Goal`

- Mục tiêu:
  chốt vì sao việc này đáng làm
- Input:
  bản hiểu chung từ `Clarify`
- Output:
  business goal, success metrics, non-goals, business constraints

### `s03 Open Questions`

- Mục tiêu:
  lộ rõ phần còn thiếu trước khi commit vào acceptance và design
- Input:
  business goal + context hiện có
- Output:
  open questions, missing inputs, conflicts, readiness verdict, governance blocker nếu có

### `s04 Acceptance + DoR`

- Mục tiêu:
  chuyển intent thành tiêu chí đo được và xác định readiness để đi sâu
- Input:
  business goal + kết quả xử lý open questions
- Output:
  acceptance criteria, edge cases, DoR verdict, governance checks, `Spec Freeze` nếu chạy SDD

### `s05 Technical Approach`

- Mục tiêu:
  chọn solution kỹ thuật phù hợp nhất với requirement và boundary
- Input:
  AC, governance, system context, spec frozen
- Output:
  option analysis, recommended approach, trade-offs, boundaries, `Spec Change` nếu có

### `s06 Task Plan`

- Mục tiêu:
  biến approach thành plan có thể thực thi và có thể verify
- Input:
  technical approach đã chốt
- Output:
  task breakdown, dependency path, verify/release tasks, reviewer coverage

### `s07 Implement`

- Mục tiêu:
  thực thi thay đổi thật, bám spec và plan
- Input:
  task plan, codebase, execution policy nếu có
- Output:
  code/config/doc changes, runtime artifacts, implementation evidence

### `s08 Verify + DoD`

- Mục tiêu:
  trả lời work item này đã “xong đúng nghĩa” hay chưa
- Input:
  implementation output + AC + spec + checklists
- Output:
  verification evidence, `Spec Coverage`, `DoD verdict`, governance compliance, residual risk

## Workflow Validate Output Và Quy Trình Xử Lý Như Thế Nào

Workflow có 4 lớp validation:

### 1. Template Và Authoring

- scaffold workflow
- scaffold step
- scaffold change package

Mục tiêu:

- giảm lỗi copy tay
- sinh file đúng naming, frontmatter, block schema ngay từ đầu

### 2. Validator Theo Layer

- `validate:workflow`
- `validate:workflow:sdd`
- `validate:workflow:change`
- `validate:workflow:execution`
- `validate:workflow:planning`

Mục tiêu:

- kiểm note đúng contract
- kiểm metadata đúng enum
- kiểm source-of-truth refs tồn tại
- kiểm runtime artifacts hoặc change package khớp workflow

### 3. Fixture Regression

- `validate:workflow:fixtures`

Mục tiêu:

- bảo vệ validator khỏi regression
- chứng minh rule pass/fail đang hoạt động đúng

### 4. Authoring Smoke Và CI

- `validate:workflow:authoring-smoke`
- GitHub Actions `workflow-tooling`
- `workflow-artifacts`
- `workflow-sdd`
- `workflow-changes`
- `workflow-execution`
- `workflow-planning`
- `workflow-authoring-smoke`

Mục tiêu:

- bắt regression khi scaffold và validator lệch nhau
- không cho artifact sai contract đi qua PR hoặc `main`

## Workflow Đã Kết Hợp Với Các Toolkit Ngoài Như Thế Nào

Workflow này không bê nguyên một framework nào.
Nó dùng workflow hiện tại làm `host workflow`, rồi mượn phần mạnh nhất từ từng toolkit.

### Từ `spec-kit`

Workflow mượn:

- `constitution`
- checklist discipline
- `clarify/analyze` mindset
- governance-first delivery

Kết quả trong workflow hiện tại:

- `project-context/`
- `constitution`
- governance checks trong step
- quality bar và exception handling

### Từ `OpenSpec`

Workflow mượn:

- change-centric model
- package `proposal -> design -> tasks -> spec-delta -> archive`

Kết quả:

- `changes/`
- `change_id`
- `spec_delta_refs`
- `archive_status`

### Từ `cc-sdd`

Workflow mượn:

- execution loop `requirements -> design -> tasks -> implementation`
- implementer/reviewer/fixer mindset
- multi-agent contract

Kết quả:

- `execution_mode`
- `review_mode`
- runtime artifacts
- `multi_agent` baseline

### Từ `BMAD-METHOD`

Workflow mượn:

- `quick|full|enterprise`
- role-aware planning depth
- agile scale-adaptive routing

Kết quả:

- `planning_track`
- routing depth theo scope
- cùng một backbone nhưng ceremony khác nhau theo track

## Vì Sao Người Khác Nên Dùng Workflow Này

### 1. Vì Nó Giữ Được Một Backbone Duy Nhất

Team không phải học nhiều workflow khác nhau cho:

- business
- spec
- change
- execution
- verify

Tất cả cùng đi trên một chain.

### 2. Vì Nó Không Chỉ Là Bộ Template

Workflow này đã có:

- artifact roots
- scaffolder
- validators
- fixture suite
- CI jobs

Nó là một `operating model`, không chỉ là một bộ note mẫu.

### 3. Vì Nó Scale Tốt

Nó có thể phục vụ:

- bug nhỏ
- feature bình thường
- change nhiều boundary
- runtime/release phức tạp
- `agentic` hoặc `multi_agent`

mà không phải đổi workflow.

### 4. Vì Nó Phù Hợp Với AI-Assisted Delivery

AI có thể:

- đọc đúng contract
- biết step nào đang làm gì
- biết khi nào phải block
- biết khi nào cần exception
- biết phải trace về spec nào
- biết phải verify bằng gì

Điều này làm workflow phù hợp với cả agent và con người.

## Ai Nên Dùng Workflow Này

Workflow này phù hợp cho:

- team muốn delivery có kỷ luật nhưng không muốn ceremony quá nặng
- team muốn `BRD/SRS` thật sự điều khiển implementation
- team muốn dùng AI nhưng không muốn mất control
- team cần một workflow chung cho business, design, code, QA, DevOps
- team muốn tăng dần autonomy từ `agentic` lên `multi_agent` mà không phá governance

## Tình Trạng Delivery Hiện Tại

Theo implementation blueprint:

- `Phase 0: Backbone + Governance`: done
- `Phase 1: SDD Materialization`: done baseline
- `Phase 2: Change Layer`: done baseline
- `Phase 3: Execution Layer`: done baseline
- `Phase 4: Adaptive Planning`: done baseline
- `Phase 5: Hardening`: done baseline

Điều đó có nghĩa là workflow hiện đã đủ để:

- authoring
- validate
- CI enforce
- chạy theo SDD
- quản lý change
- hỗ trợ execution topology
- scale theo planning track

Phần còn lại là hardening sâu hơn:

- stale exception checks
- drift checks sâu hơn
- semantic lint sâu hơn

## Kết Luận

Nếu phải mô tả workflow này trong một câu:

> Đây là một workflow backbone 8 bước cho AI-assisted software delivery, giữ một chain duy nhất từ yêu cầu tới `DoD`, nhưng đủ chặt để mang `governance`, `SDD`, `change management`, `execution topology`, `adaptive planning` và `CI enforcement` vào cùng một mô hình vận hành.

Nếu phải mô tả lý do nên dùng:

> Workflow này giúp team giữ được control khi delivery bằng AI, mà không đánh đổi sự rõ ràng giữa business, spec, implementation, verify và release.

Tài liệu nên đọc tiếp:

- `workflow-chain.md`
- `spec-driven-development.md`
- `target-architecture.md`
- `sdd-merge-strategy.md`
- `implementation-blueprint.md`
- `workflow-ci-enforcement.md`
