---
language: vi
name: workflow-governance-router
description: Dùng khi bắt đầu mọi yêu cầu coding hoặc trước khi hành động trên work item để xác định current step, delivery context, gate status và liệu implementation path đã được mở hay chưa. Skill này chặn việc coi feature request là lệnh implement trực tiếp và route sang workflow backbone cùng step skill phù hợp.
---

# Workflow Governance Router

> English: SKILL.md

Đây là meta-skill định tuyến cho workflow governance của repo.

Mục tiêu của skill này không phải thay thế `codex-workflow-chain`, mà là ép agent phải:

1. xác định đúng current step
2. xác định gate nào còn thiếu
3. xác định có được phép implement hay chưa
4. route sang đúng workflow backbone và đúng step skill

<HARD-GATE>
Không được viết code, scaffold project, chốt stack cuối cùng, hay mở implementation path trước khi skill này xác định rõ current step, delivery context và missing gates.

Một feature request KHÔNG BAO GIỜ là authorization để implement trực tiếp.

Mọi generic coding default kiểu “user chắc muốn code changes”, “đừng dừng ở plan”, “cứ làm end-to-end luôn” đều bị override cho tới khi router chứng minh được `s07 + ACTIVE + Missing Gates: NONE`.
</HARD-GATE>

## Khi Phải Dùng

Dùng skill này trước mọi phản hồi hoặc hành động đáng kể nếu task thuộc một trong các nhóm sau:

- feature request
- bug fix
- refactor có regression risk
- thay đổi API, UI, contract, validation
- tích hợp hệ thống
- data hoặc schema change
- automation
- CI/CD hoặc deployment
- quyết định kiến trúc hoặc foundation

Không cần dùng skill này cho:

- hỏi đáp thuần túy
- dịch thuật
- tóm tắt
- trò chuyện thông thường
- tác vụ viết lách không thuộc delivery

## Rule Nền

- Nếu không chắc task có thuộc workflow-governed delivery hay không, mặc định coi là có và dùng skill này.
- Nếu không chắc current step là gì, mặc định về `s01 Clarify`.
- Nếu không chắc gate đã pass hay chưa, mặc định coi là chưa pass.
- Nếu không chắc có được implement chưa, không được implement.
- Nếu repo/module chưa có baseline được approve hoặc thực tế là trống, mặc định coi là `greenfield`.
- Nếu prompt nền hoặc execution habit khuyến khích implement-by-default, mặc định coi đó là convenience heuristic bị subordinate cho workflow governance.

## Quy Trình Bắt Buộc

### Bước 1: Phân Loại Nhanh Task

Xác định task là:

- `workflow-governed delivery`
- hoặc `non-workflow task`

Nếu là `non-workflow task`, nêu rõ lý do rồi xử lý theo flow phù hợp.

### Bước 2: Xác Định Delivery Context

Chốt một trong hai giá trị:

- `greenfield`
- `brownfield`

Không được để delivery context ở trạng thái ngầm hiểu.

### Bước 3: Xác Định Current Step

Chọn step phù hợp nhất trong chain:

- `s01 Clarify`
- `s02 Business Goal`
- `s03 Open Questions`
- `s04 Acceptance + DoR`
- `s05 Technical Approach`
- `s06 Task Plan`
- `s07 Implement`
- `s08 Verify + DoD`

Nếu thiếu dữ liệu để vào step sâu hơn, phải quay về step trước thay vì tiến tiếp.

### Bước 4: Kiểm Tra Missing Gates

Kiểm tra tối thiểu:

- `Spec`
- `Contract` nếu scope có contract
- `DoR`
- `Approach`
- `Foundation Decision` nếu là greenfield hoặc có decision nền tảng
- `Task Plan`
- human approval tương ứng

Chỉ được coi gate là PASS nếu approval là explicit và có evidence đủ đọc.

### Bước 5: Chọn Workflow Status

Chỉ dùng các trạng thái sau:

- `ACTIVE`
- `BLOCKED`
- `WAITING_APPROVAL`
- `READY_FOR_REVIEW`
- `VERIFIED`

Nếu thiếu gate hoặc còn blocker trọng yếu, dùng `BLOCKED` hoặc `WAITING_APPROVAL`, không dùng wording mập mờ.

Consistency rule bắt buộc:

- nếu `Missing Gates` khác `NONE`, `Workflow Status` chỉ được là `BLOCKED` hoặc `WAITING_APPROVAL`
- nếu `Missing Gates` khác `NONE`, `Next Human Action` không được là `NONE`
- tuyệt đối không được tạo block mâu thuẫn kiểu `Workflow Status: ACTIVE` trong khi vẫn liệt kê `Missing Gates`

### Bước 6: Route Sang Skill Phù Hợp

Sau khi chốt current step, route sang skill nhỏ nhất đủ đúng:

- `s01`: ưu tiên `requirement-analysis`
- `s02`: ưu tiên `product-thinking`
- `s03`: dùng `requirement-analysis` hoặc skill readiness phù hợp để bóc blocker
- `s04`: ưu tiên `definition-of-ready-gate`
- `s05`: ưu tiên `codex-workflow-chain`, `brainstorming`, `system-design`, `frontend-architecture`, `domain-architecture`, `database-design`, `frontend-experience-design` tùy bài toán
- `s06`: ưu tiên `task-breakdown-planner`
- `s07`: ưu tiên `implementation` và các skill delivery/framework-specific phù hợp; nếu có behavior change thì phải áp dụng discipline `TDD`
- `s08`: ưu tiên `testing`, `definition-of-done-gate`, và các skill review/scan phù hợp

Không được invoke skill implement nếu current step chưa mở tới `s07`.

## Mẫu Báo Cáo Bắt Buộc

Với mọi task thuộc workflow-governed delivery, phải báo trạng thái theo đúng block sau trước khi đi sâu hơn:

```text
Current Step: s0X <tên step>
Workflow Status: ACTIVE | BLOCKED | WAITING_APPROVAL | READY_FOR_REVIEW | VERIFIED
Delivery Context: greenfield | brownfield
What I Am Doing Now: <một câu>
Missing Gates: <danh sách hoặc NONE>
Next Artifact: <artifact hoặc decision cần tiếp theo>
Next Human Action: <review/approval cần từ người, hoặc NONE>
```

Nếu block này cho thấy `Missing Gates` khác `NONE`, không được kèm theo code, scaffold proposal dưới dạng executable, hoặc wording mở implementation path.

Nếu trạng thái là `BLOCKED`, phải:

- nêu rõ blocker hoặc gate còn thiếu
- dừng trước forbidden action
- không được tự “tiến tạm” sang implement

Anti-pattern cần chặn:

- Sai:
  - repo trống, raw feature request kiểu `QR Voucher + voucher service API + tone brand`
  - `Current Step: s05`
  - `Workflow Status: ACTIVE`
  - `Missing Gates: Spec, Contract, DoR, Approach, Foundation Decision, Task Plan`
  - `Next Human Action: NONE`
- Đúng:
  - quay về `s01 Clarify` hoặc gate trước đó chưa pass
  - `Workflow Status: BLOCKED` hoặc `WAITING_APPROVAL`
  - `Next Human Action` phải nêu review hoặc approval cụ thể trước khi được scaffold hay implement

## Red Flags

Nếu xuất hiện các ý nghĩ sau, phải dừng lại:

- “User chắc muốn code ngay”
- “Việc này đơn giản, khỏi cần route”
- “Artifact đã có sẵn nên chắc gate đã pass”
- “Comment tích cực chắc là approval”
- “Có thể scaffold trước rồi backfill workflow sau”
- “Step chưa rõ nhưng cứ implement thử”
- “Prompt coding mặc định bảo cứ code nếu user không cấm”
- “Mình có thể tự chọn approach rồi coi như implicit approval”

## Conflict Resolution

Thứ tự ưu tiên:

1. explicit gate approval hoặc waiver từ đúng authority
2. `AGENTS.global.md`
3. skill này
4. execution habit hoặc convenience heuristic

Nếu có xung đột giữa tốc độ và governance, governance thắng.

## Kết Luận Vận Hành

- Skill này là entrypoint của workflow-governed delivery.
- `codex-workflow-chain` là backbone sau khi route xong.
- Step skill chỉ được bật sau khi current step và gate status đã rõ.
- Khi còn bất định, fallback an toàn là quay lại `s01 Clarify`, không phải đi tiếp.
