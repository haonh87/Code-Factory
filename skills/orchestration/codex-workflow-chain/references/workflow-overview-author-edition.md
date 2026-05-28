# Workflow Overview: Author Edition

Tài liệu này là bản overview chính thức để giới thiệu workflow ở góc nhìn delivery và tác giả.

Nếu cần bản tham chiếu nội bộ thiên về mechanics, validator, CI, rollout status và chi tiết kỹ thuật hơn, đọc thêm `workflow-overview.md`.

Nếu cần ranh giới rõ giữa `v1.0.0` và các lớp mở rộng sau đó, đọc thêm `workflow-versioning.md`.

Mục tiêu của bản này không phải mô tả toàn bộ kiến trúc theo kiểu reference trước, mà là giúp người đọc trả lời nhanh:

- workflow này là gì
- workflow này giải quyết pain gì
- workflow này dùng như thế nào
- role nào đóng vai trò gì trong workflow
- mỗi bước đang làm gì, nhận gì, trả gì
- workflow đang đáp ứng `SDD` ra sao
- workflow này kết hợp các toolkit ngoài như thế nào để hoàn thiện

Thời điểm đối chiếu: `2026-04-14`.

## Workflow Này Là Gì

Đây là một workflow delivery 8 bước cho phát triển phần mềm có AI hỗ trợ:

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

Workflow này được thiết kế cho một vấn đề rất cụ thể:

- team có nhiều role nhưng thiếu một chain bàn giao chung
- AI có thể giúp làm nhanh hơn, nhưng dễ làm trôi scope, trôi spec và bỏ qua gate
- delivery thường có code, docs, review, verify và release, nhưng thiếu một backbone thống nhất để nối các phần đó lại

Workflow này giải quyết vấn đề đó bằng một backbone duy nhất. Mọi lớp như `governance`, `SDD`, `change layer`, `execution topology` và `adaptive planning` đều bám vào cùng backbone, thay vì tạo thêm workflow song song.

Nói ngắn:

- đây không chỉ là workflow để coding
- đây là một `delivery operating model` cho AI-assisted product delivery

## Workflow Này Dành Cho Ai

Workflow này phù hợp khi:

- cần đi từ yêu cầu thô tới output có thể audit
- muốn dùng AI nhưng không muốn AI bypass scope, gate và spec
- có nhiều role cùng tham gia như `PO`, `BA`, `Designer`, `Developer`, `QC`, `DevOps`
- cần một chain thống nhất từ discovery tới implementation và verification
- muốn `BRD/SRS`, change package, execution artifact và CI guardrail cùng nằm trong một hệ

Workflow này không tối ưu nếu mục tiêu chỉ là:

- ghi nhanh vài note cá nhân
- xử lý một lệnh terminal rất nhỏ không cần traceability
- làm prototype throwaway không cần gate, signoff hay review

## Workflow Này Mang Tới Điều Gì

### 1. Một Backbone Chung Cho Toàn Bộ Delivery

Mọi work item đều đi cùng một chain từ `Clarify` tới `Verify + DoD`. Điều này giúp cả business, design, engineering và QA nhìn cùng một luồng thay vì mỗi role có một quy trình riêng.

### 2. Delivery Có Thể Audit

Workflow không chỉ hỏi "đã làm xong chưa", mà ép phải trả lời:

- đang giải quyết vấn đề gì
- vì sao việc này đáng làm
- requirement nào đang in-scope
- cách làm nào đã được chọn và vì sao
- task nào cover requirement nào
- verify dựa trên evidence nào
- kết quả đã đạt `DoD`, `release readiness`, `business_acceptance` hay chưa

### 3. Spec Điều Khiển Delivery

Khi work item chạy theo `SDD`, `BRD/SRS` không còn là tài liệu để tham khảo. Chúng trở thành source-of-truth để điều khiển design, task plan, implementation và verification.

### 4. AI Có Thể Tham Gia Mạnh Hơn Mà Vẫn Có Guardrail

Workflow có execution support theo `agentic` và `multi_agent` ngay từ public baseline `v1.0.0`, nhưng không bắt buộc mọi work item phải bật execution layer. Khi dùng execution layer, nó vẫn bị giữ trong step contract, `governance`, `SDD`, validation và CI enforcement.

## Workflow Có Những Layer Nào

| Layer | Vai trò | Người dùng nhận được gì |
|---|---|---|
| `backbone` | chain 8 bước từ yêu cầu tới `DoD` | một luồng delivery duy nhất |
| `governance` | rule, checklist, exception, authority | quality bar và guardrail rõ ràng |
| `SDD` | `BRD/SRS`, spec freeze, spec change, coverage | spec điều khiển delivery thay vì đứng ngoài |
| `change layer` | `proposal -> design -> tasks -> spec-delta -> archive` | tách rõ source-of-truth của sản phẩm và của thay đổi |
| `execution layer` | `agentic|multi_agent`, runtime artifact, review mode | vận hành linh hoạt theo scope nhưng không mất kiểm soát |
| `adaptive planning` | `quick|full|enterprise` | cùng một workflow nhưng scale được theo độ phức tạp |
| `automation guardrail` | scaffold, validator, fixture, CI | workflow chạy được thật, không chỉ là docs |

## Role Model Trong Workflow

Workflow này là `role-aware workflow`. Điều đó có nghĩa là cùng một backbone 8 bước vẫn giữ được ownership theo chuyên môn của:

- `PO`
- `BA`
- `Designer`
- `Developer`
- `QC`
- `DevOps`

Điểm quan trọng là phải tách 3 lớp vai trò khác nhau:

| Lớp role | Dùng để làm gì | Ví dụ |
|---|---|---|
| `execution_roles` | ai đang đóng góp nghiệp vụ thật cho step | `po`, `ba`, `designer`, `developer`, `qc`, `devops` |
| `role_signoffs` | ai chịu trách nhiệm signoff gate | `dor`, `approach`, `task_plan`, `release`, `business_acceptance`, `dod` |
| runtime roles | step đang được vận hành theo topology nào | `coordinator`, `worker`, `tester`, `auditor`, `notebooklm-researcher` |

Nói ngắn:

- `PO/BA/Designer/Developer/QC/DevOps` trả lời câu hỏi: ai đang sở hữu phần quyết định nghiệp vụ nào
- `gate_reviews` không phải role layer; nó là audit trail ghi human reviewer thực tế và thời điểm review cho gate đã pass
- `coordinator/worker/verifier` trả lời câu hỏi: step này đang được chạy như thế nào

### Vai Trò Của Từng Role

| Role | Vai trò chính trong workflow | Step nổi bật | Output điển hình | Signoff mặc định |
|---|---|---|---|---|
| `PO` | giữ business intent, scope, trade-off và `business_acceptance` | `s01`, `s02`, `s04`, `s08` | business problem, success target, scope decision, BRD update, business acceptance verdict | `dor`, `business_acceptance` |
| `BA` | làm rõ requirement, tạo `SRS`, traceability và readiness | `s01`, `s03`, `s04` | requirement brief, open questions, governance blocker, acceptance criteria, SRS update | support `dor` |
| `Designer` | giữ UX behavior, interaction rule, accessibility baseline | `s01`, `s02`, `s04`, `s05`, `s08` | user flow, UX constraint, UX acceptance note, SRS UX behavior update | `approach` khi có UX surface; support `business_acceptance` |
| `Developer` | chốt technical approach, task plan, implementation và technical exception | `s05`, `s06`, `s07` | technical approach, architecture boundary, task breakdown, code/config/doc changes | `approach`, `task_plan` |
| `QC` | giữ verify evidence, checklist completeness, `DoD` và release recommendation | `s04`, `s06`, `s08` | test strategy, verification evidence, review findings, DoD verdict | `dod`, `release` |
| `DevOps` | giữ packaging, runtime, rollout, release control | `s05`, `s06`, `s07`, `s08` | deployment plan, runtime contract, pipeline/release plan, deployment review | `release` |

### Role Map Theo Step

| Step | Role dẫn dắt | Vai trò của role ở step đó |
|---|---|---|
| `s01 Clarify` | `PO`, `BA` | chốt bản hiểu chung, scope draft, context và khung `BRD` ban đầu |
| `s02 Business Goal` | `PO` | chốt mục tiêu business, KPI, non-goals và business priority |
| `s03 Open Questions` | `BA` | gom missing input, conflict, policy gap, governance blocker và owner cần xử lý |
| `s04 Acceptance + DoR` | `BA`, `QC`, `PO` | chốt requirement, acceptance criteria, testability, readiness và `Spec Freeze` nếu chạy `SDD` |
| `s05 Technical Approach` | `Developer` | chọn solution kỹ thuật; `Designer` và `DevOps` bổ sung rule UX/runtime khi scope chạm boundary tương ứng |
| `s06 Task Plan` | `Developer` | tách task; `QC` thêm verify checkpoint; `DevOps` thêm release/rollout task; `Designer` thêm UX refinement task |
| `s07 Implement` | `Developer` | triển khai code/config/doc; `DevOps` tạo deployment artifact nếu có; `Designer` và `QC` hỗ trợ khi scope cần |
| `s08 Verify + DoD` | `QC` | chốt evidence, compliance, `DoD`; `DevOps` chốt release readiness; `PO` chốt `business_acceptance` khi cần |

### Role Và Governance

Role không chỉ tạo output. Chúng còn quyết định ai có authority ở đâu.

- `PO` giữ business scope, trade-off và `business_acceptance`
- `BA` giữ requirement clarity, policy gap và traceability
- `Designer` giữ UX/accessibility rule
- `Developer` giữ technical approach và technical exception
- `QC` giữ verify evidence, checklist completeness và `DoD`
- `DevOps` giữ runtime/release gate

`role_signoffs` không tự động đồng nghĩa với quyền approve `waiver`. Khi có `governance-exception`, authority phải theo governance role model, không suy ra chỉ từ người đang làm step.

## Cách Dùng Workflow Này

### Cách Dùng Nhanh

Public baseline `v1.0.0`:

1. Human hoặc coordinator tự chốt `work_item_slug`.
2. Nếu có `change layer`, scaffold change package trước.
3. Scaffold workflow vào `work-items/`.
4. Điền nội dung thật cho từng step.
5. Chạy validator phù hợp.

Nếu work item dùng execution metadata hoặc runtime artifacts, chạy thêm lane execution.

Extension sau `v1.0.0`:

1. Chạy `Work Item Materialization` để chốt boundary, `work_item_slug`, dedup và `change_strategy`.
2. Đưa work item vào `Work Item Protocol` để chốt state và authority ở cấp work item.
3. Nếu `materialization_status=READY` và work item có `change layer`, scaffold change package trước.
4. Scaffold hoặc auto-scaffold workflow vào `work-items/`.
5. Human review protocol rồi mới đưa work item vào delivery backbone nếu project bật approval gate.

Chi tiết ranh giới version nằm ở `workflow-versioning.md`. Chi tiết cho lớp mở rộng trước và quanh `scaffold` nằm ở `work-item-materialization.md` và `work-item-protocol.md`.

### Command Surface Chuẩn

```bash
wfc scaffold-change --change-id <CHANGE-ID> --work-item <work-item-slug>
wfc scaffold --work-item <work-item-slug> --planning-track <quick|full|enterprise>
wfc scaffold-step --work-item <work-item-slug> --step <sNN>

wfc validate --workflow-root work-items --project-root .
wfc sdd --workflow-root work-items --project-root .
wfc change --workflow-root work-items --project-root .
wfc plan --workflow-root work-items
wfc smoke
```

Nếu work item dùng execution metadata hoặc runtime artifacts, chạy thêm:

```bash
wfc exec --workflow-root work-items
```

Lớp mở rộng sau `v1.0.0` có thể dùng thêm:

```bash
wfc materialize --request "<raw-request>"
wfc work-item approve --work-item <work-item-slug> --reviewed-by <role>
wfc protocol
```

### Root Artifact Chuẩn

| Root | Vai trò |
|---|---|
| `work-items/` | canonical artifact root cho execution trace của workflow |
| `product-specs/` | source-of-truth cho `BRD/SRS` khi work item chạy theo `SDD` |
| `changes/` | source-of-truth cho package thay đổi |
| `project-context/` | governance pack mặc định của project |

## Step Title Và Canonical Artifact

Workflow này cố ý tách `step title` và `canonical artifact slug`.

- `step title` trả lời: bước này dùng để làm gì
- `canonical artifact` trả lời: file chính của bước này tên gì

| Step title | Canonical artifact slug | File chuẩn | Ý nghĩa |
|---|---|---|---|
| `Clarify` | `restate` | `<work_item_slug>.s01.restate.md` | artifact chính là bản hiểu lại yêu cầu |
| `Business Goal` | `business-goal` | `<work_item_slug>.s02.business-goal.md` | artifact chính là business goal note |
| `Open Questions` | `open-questions` | `<work_item_slug>.s03.open-questions.md` | artifact chính là các điểm còn mở |
| `Acceptance + DoR` | `acceptance-criteria` | `<work_item_slug>.s04.acceptance-criteria.md` | step chốt cả acceptance và readiness, nhưng file chính là acceptance criteria |
| `Technical Approach` | `technical-approach` | `<work_item_slug>.s05.technical-approach.md` | artifact chính là technical approach note |
| `Task Plan` | `task-breakdown` | `<work_item_slug>.s06.task-breakdown.md` | step là planning, file chính là breakdown thành task |
| `Implement` | `implementation` | `<work_item_slug>.s07.implementation.md` | artifact chính là implementation note |
| `Verify + DoD` | `verification` | `<work_item_slug>.s08.verification.md` | step chốt verify và `DoD`, nhưng file chính là verification note |

## 8 Bước Được Vận Hành Ra Sao

| Step | Luận điểm bước phải trả lời | Mục tiêu | Input chính | Output chính | Gate và cách validate | Canonical artifact |
|---|---|---|---|---|---|---|
| `s01 Clarify` | Chúng ta đang được yêu cầu giải quyết việc gì, dưới ràng buộc nào? | làm rõ yêu cầu, scope draft, constraint, `governance context` ban đầu | raw request, ticket, context ban đầu | restated request, scope draft, assumptions, initial risks, governance context | required block, naming/frontmatter, governance context hiện diện khi cần | `s01.restate` |
| `s02 Business Goal` | Vì sao việc này đáng làm và kết quả mong muốn là gì? | chốt giá trị business, KPI, non-goals | yêu cầu đã clarify | business goal, success metrics, non-goals, business scope | contract completeness, traceability với `s03-s04` | `s02.business-goal` |
| `s03 Open Questions` | Còn thiếu gì để không làm sai hoặc làm lệch nguyên tắc? | lộ blocker, conflict, missing input, readiness gap | business goal và context hiện có | open questions, readiness verdict, blocker owner, governance blocker nếu có | readiness/audit block, owner rõ, blocker được phân loại | `s03.open-questions` |
| `s04 Acceptance + DoR` | Thế nào là làm đúng và đủ sẵn sàng để đi tiếp? | chốt acceptance criteria, readiness, `governance checks`, `Spec Freeze` khi cần | goal đã rõ, các open question trọng yếu đã có hướng xử lý | AC đo được, `DoR`, governance checks, `Spec Freeze` nếu chạy SDD | governance gate, `DoR` gate, SDD validator, checklist profile phù hợp | `s04.acceptance-criteria` |
| `s05 Technical Approach` | Sẽ giải quyết bằng cách nào mà vẫn bám đúng rule và spec? | chọn solution, trade-off, boundary bị tác động | AC, governance context, system context, frozen spec nếu có | technical approach, option analysis, boundary, architecture detail, `Spec Change` nếu phát hiện gap | governance checks, trace về spec/change, exception rõ nếu lệch chuẩn | `s05.technical-approach` |
| `s06 Task Plan` | Cần làm những việc gì, theo thứ tự nào và kiểm ở đâu? | bẻ nhỏ thành task có thứ tự, có coverage và checkpoint verify/review | technical approach đã chốt | task breakdown, verification plan, review checkpoints, rollout coverage | planning validator, governance checks, traceability tới AC/spec | `s06.task-breakdown` |
| `s07 Implement` | Giải pháp đã được triển khai đúng phạm vi và đúng contract chưa? | thực hiện thay đổi thật trong code/config/doc | task plan, codebase, execution policy nếu có | code/config/doc changes, implementation notes, runtime artifacts khi cần | execution validator, change validator, spec alignment, exception handling | `s07.implementation` |
| `s08 Verify + DoD` | Kết quả có thật sự đạt yêu cầu và đủ chất lượng để đóng chưa? | kết luận evidence, compliance, completion, `DoD` | implementation output, AC, spec, checklist, review findings | verification evidence, `DoD`, spec coverage, governance compliance, release/business acceptance input | testing, review, governance validator, `DoD` gate, CI enforcement | `s08.verification` |

## Input Và Output Được Hiểu Theo Cách Nào

Workflow này dùng một nguyên tắc rất thực dụng:

- `Input` là thông tin hoặc quyết định mà bước hiện tại cần nhận để có thể bắt đầu an toàn
- `Output` là thứ bước đó phải bàn giao cho bước sau hoặc stakeholder
- `Output` phải được mô tả bằng giá trị business trước, tên artifact chỉ dùng để trace

Điều này giúp workflow không bị rơi vào tình trạng:

- có file nhưng không có handoff rõ ràng
- có artifact nhưng không nói được nó phục vụ quyết định gì
- có code nhưng không rõ đang cover requirement nào

## Workflow Validate Output Và Quy Trình Xử Lý Như Thế Nào

Workflow validate ở 3 lớp:

### 1. Authoring Layer

Scaffolder ép note được sinh đúng:

- naming
- frontmatter
- governance metadata
- step blocks
- optional blocks cho `SDD`, `change`, `execution`, `planning`

### 2. Validation Layer

Validator kiểm workflow theo contract:

- `validate:workflow`
- `validate:workflow:sdd`
- `validate:workflow:change`
- `validate:workflow:execution`
- `validate:workflow:planning`
- `validate:workflow:fixtures`
- `validate:workflow:authoring-smoke`

### 3. CI Enforcement Layer

CI hiện đã có sẵn các job baseline:

- `workflow-tooling`
- `workflow-artifacts`
- `workflow-sdd`
- `workflow-changes`
- `workflow-execution`
- `workflow-planning`
- `workflow-authoring-smoke`

Điều này có nghĩa là workflow không chỉ nói “nên làm gì”, mà đã có cơ chế kiểm:

- artifact có đúng contract không
- governance có được áp đúng không
- work item có đúng spec/change/execution/planning rule không
- authoring flow có bị drift giữa docs, scaffold và validator hay không

## Role Model Và Execution Topology Gắn Với Nhau Ra Sao

Workflow này cố ý không trộn `role nghiệp vụ` với `role runtime`.

| Câu hỏi | Lớp trả lời |
|---|---|
| Ai đang chịu trách nhiệm về business, requirement, design, implementation, quality, release? | `execution_roles` |
| Ai có trách nhiệm signoff `DoR`, `approach`, `task_plan`, `release`, `business_acceptance`, `DoD`? | `role_signoffs` |
| Step này đang chạy bằng một agent hay nhiều agent? | `execution_mode` |
| Nếu chạy nhiều agent thì ai điều phối, ai thực thi, ai kiểm chứng? | runtime roles trong `execution topology` |

Ví dụ:

- Một step có thể có `execution_roles = [ba, qc, developer]`
- nhưng runtime vẫn chỉ là `agentic`
- hoặc một step có thể có `execution_roles = [developer, qc, devops]`
- và runtime là `multi_agent` với `coordinator + builder + tester`

Điểm quan trọng là:

- role nghiệp vụ giữ ownership và signoff
- runtime role giữ cách vận hành
- hai lớp này bổ sung cho nhau, không thay thế nhau

## Workflow Đáp Ứng SDD Như Thế Nào

Workflow này không tạo workflow riêng cho `SDD`. Thay vào đó, `SDD` được gắn vào cùng backbone 8 bước.

### Claim Cốt Lõi

Khi một work item chạy theo `SDD`, workflow buộc:

- `BRD` khóa bài toán business
- `SRS` khóa requirement hệ thống
- step 4 chốt `Spec Freeze`
- step 5-7 mở `Spec Change` nếu lệch frozen spec
- step 8 chốt `Spec Coverage`

Điều này biến spec từ tài liệu tham khảo thành cơ chế điều khiển delivery.

### Mapping Theo Bước

| Step | Vai trò với `SDD` |
|---|---|
| `s01-s02` | hình thành hoặc cập nhật `BRD` |
| `s03-s04` | hình thành hoặc cập nhật `SRS`, map acceptance và freeze spec |
| `s05-s07` | mọi design/task/implementation phải trace về requirement; nếu lệch thì mở `Spec Change` |
| `s08` | kết luận `Spec Coverage` theo `PASS|FAIL|PARTIAL|UNTESTED` |

### Lifecycle

```text
draft -> reviewed -> approved -> frozen -> implemented -> verified -> accepted
```

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

Điều này giúp workflow không rơi vào ba tình huống thường gặp:

- spec chỉ tồn tại để tham khảo
- code thay đổi behavior nhưng không cập nhật spec
- verification không map ngược về requirement

### Source-of-Truth

| Artifact | Vai trò |
|---|---|
| `product-specs/brd/` | source-of-truth cho business problem, goal, KPI, scope, business rules |
| `product-specs/srs/` | source-of-truth cho requirement, NFR, UX/system behavior và acceptance mapping |
| `work-items/` | execution trace của work item |
| `changes/` | package thay đổi đang được đề xuất hoặc thực thi |

## Workflow Kết Hợp Với Các Toolkit Ngoài Như Thế Nào

Workflow này không copy nguyên framework nào. Nó dùng backbone nội bộ làm host workflow, rồi chỉ mượn phần mạnh nhất của từng toolkit.

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
- quality bar, exception handling và authority model rõ hơn

### Từ `OpenSpec`

Workflow mượn:

- change-centric model
- package `proposal -> design -> tasks -> spec-delta -> archive`

Kết quả trong workflow hiện tại:

- `changes/`
- `change_id`
- `spec_delta_refs`
- `archive_status`

### Từ `cc-sdd`

Workflow mượn:

- execution loop `requirements -> design -> tasks -> implementation`
- implementer/reviewer/fixer mindset
- runtime artifact và multi-agent contract

Kết quả trong workflow hiện tại:

- `execution_mode`
- `review_mode`
- `verification_owner`
- runtime artifacts cho `execution-policy`, `worker-assignment`, `worker-handoff-report`, `merge-report`

### Từ `BMAD-METHOD`

Workflow mượn:

- `quick|full|enterprise`
- role-aware planning depth
- scale-adaptive routing

Kết quả trong workflow hiện tại:

- `planning_track`
- cùng một backbone nhưng độ sâu planning khác nhau
- workflow vẫn giữ một chain duy nhất thay vì tách nhiều flow riêng

Kết quả cuối cùng cho người dùng không phải là “đang dùng nhiều framework”, mà là một workflow duy nhất nhưng có đủ:

- governance
- spec
- change
- execution
- planning depth

## Vì Sao Nên Dùng Workflow Này

### 1. Nó Giải Quyết Đúng Pain Của AI-Assisted Delivery

Phần khó nhất của AI-assisted delivery không phải viết thêm code, mà là giữ cho:

- scope không trôi
- spec không bị bypass
- handoff không mơ hồ
- verification không cảm tính

Workflow này được thiết kế trực tiếp để giải quyết các pain đó.

### 2. Nó Không Đánh Đổi Giữa Nhanh Và Chặt

`quick|full|enterprise` cho phép cùng một backbone phục vụ nhiều mức độ phức tạp khác nhau, thay vì hoặc quá nhẹ hoặc quá nặng.

### 3. Nó Dùng Được Thật

Workflow này đã được triển khai thành tooling và CI thật:

- artifact roots
- scaffold
- validators
- fixtures
- CI jobs

Nghĩa là đây không còn là một bộ ý tưởng trên giấy.

## Cách Đọc Tài Liệu Sau Overview

Nếu muốn đi sâu hơn sau tài liệu này:

- đọc `workflow-chain.md` để xem template, naming, schema và block chi tiết
- đọc `role-aware-workflow.md` để xem role card, role outputs và role map theo step
- đọc `spec-driven-development.md` để xem lifecycle `SDD`
- đọc `target-architecture.md` để hiểu các layer của workflow
- đọc `implementation-blueprint.md` để xem workflow đã rollout tới đâu
- đọc `workflow-ci-enforcement.md` để hiểu CI guardrail

## Tình Trạng Delivery Hiện Tại

Tới `2026-04-14`, phase `0-5` của implementation blueprint đã được triển khai ở mức public baseline. Điều này có nghĩa:

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
- chạy theo `SDD`
- quản lý change
- hỗ trợ execution topology
- scale theo planning track

Phần public baseline này không bao gồm `Work Item Materialization` và `Work Item Protocol`; hai lớp đó là extension sau `v1.0.0`.

Phần còn lại chủ yếu là:

- stale exception checks
- drift checks sâu hơn
- semantic lint sâu hơn cho evidence và traceability

Đây là lý do workflow có thể được giới thiệu như một sản phẩm đang vận hành được, thay vì một design proposal.
