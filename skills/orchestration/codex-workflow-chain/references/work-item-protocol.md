# Work Item Protocol

Lưu ý versioning:

- tài liệu này thuộc lớp mở rộng `post-v1`
- `baseline v1` không yêu cầu `Work Item Protocol`
- trong `baseline v1`, lifecycle ở cấp work item được theo dõi chủ yếu qua note workflow, validator artifact và review thủ công
- ranh giới version chính thức nằm ở `workflow-versioning.md`

Tài liệu này định nghĩa protocol vận hành của một `work item` sau khi đã có quyết định materialization.

Nếu `work-item-materialization.md` trả lời câu hỏi:

- có nên mở work item mới không
- slug là gì
- có cần `change layer` không

thì tài liệu này trả lời:

- work item đang ở trạng thái nào
- ai được phép đổi trạng thái đó
- cần handoff hoặc evidence gì để đi tiếp
- command hoặc action nào tương ứng với từng trạng thái

Thời điểm đối chiếu: `2026-04-14`.

## Mục Tiêu

`Work Item Protocol` là contract ở lớp vận hành nằm giữa:

- raw request và materialization
- scaffold và workflow backbone `s01 -> s08`
- change lifecycle trong `changes/`
- authority của human, coordinator và agentic runtime

Mục tiêu của protocol này là:

- chặn việc mở work item mới một cách ngẫu hứng
- chặn việc scaffold xong nhưng không rõ ownership, state hoặc handoff
- cho phép `agentic` tự mở work item khi đủ điều kiện
- giữ audit trail nhất quán từ lúc đề xuất tới lúc đóng hoặc archive

## Phạm Vi

Áp dụng cho lifecycle của **một** work item.

Không áp dụng cho:

- initiative, epic hoặc portfolio nhiều work item
- state của riêng từng step trong `s01 -> s08`
- state riêng của `change package`

Protocol này không tạo step mới.

- `Materialization` vẫn là gate trước `scaffold`
- `Workflow backbone` vẫn là chain delivery chính
- `Execution runtime` vẫn là cách từng step được chạy

## Mối Quan Hệ Với Các Tài Liệu Khác

- `work-item-materialization.md`: chốt boundary, slug, dedup, `change_strategy`
- `workflow-chain.md`: quy định step, artifact, gate và handoff của `s01 -> s08`
- `execution-runtime.md`: quy định `agentic|multi_agent` ở cấp step
- `spec-driven-development.md`: govern lifecycle của `BRD/SRS` khi có `SDD`
- `changes/README.md`: govern lifecycle của `change package`

Một câu ngắn để nhớ:

- `Materialization` mở cửa
- `Work Item Protocol` giữ trạng thái
- `Workflow Chain` làm delivery

## Thực Thể Cốt Lõi

Một work item theo protocol này gồm các thành phần logic sau:

- `raw_request`
- `materialization_report`
- `work_item_slug`
- `workflow_root`
- `change_strategy`
- `change_id`
- `protocol_status`
- `current_step`
- `handoff_target`
- `audit_events`

## Protocol Status

`protocol_status` là state ở cấp work item, không phải state của step.

Enum chuẩn:

- `INTAKE`
- `PROPOSED`
- `READY_TO_MATERIALIZE`
- `MATERIALIZED`
- `ACTIVE`
- `BLOCKED`
- `VERIFIED`
- `DONE`
- `ARCHIVED`
- `CANCELLED`

## Ý Nghĩa Từng Status

### `INTAKE`

- mới nhận raw request
- chưa có slug ổn định
- chưa được quyền scaffold

### `PROPOSED`

- đã có candidate work item hoặc candidate split
- materialization chưa đủ chắc để scaffold
- có thể cần human confirm hoặc clarify thêm

### `READY_TO_MATERIALIZE`

- `materialization_status=READY`
- dedup đã rõ
- `change_strategy` đã rõ
- đủ điều kiện gọi command scaffold

### `MATERIALIZED`

- change package cần thiết đã được scaffold hoặc reuse xong
- workflow artifact root cho work item đã được tạo
- frontmatter/naming ban đầu đã tồn tại

### `ACTIVE`

- work item đang được vận hành trong backbone `s01 -> s08`
- ít nhất `s01` đã có owner hoặc đã bắt đầu được điền nội dung

### `BLOCKED`

- work item có blocker chặn tiến độ
- blocker có thể đến từ input, governance, spec, authority, tool hoặc change package

### `VERIFIED`

- `s08` đã có verification evidence đủ để kết luận kỹ thuật
- chưa đồng nghĩa `DONE` nếu còn signoff hoặc release/business acceptance

### `DONE`

- work item đã đạt `DoD`
- các signoff bắt buộc đã hoàn tất hoặc được kết luận `NOT_APPLICABLE`

### `ARCHIVED`

- nếu có change package, `archive_status=archived`
- nếu không có change package, work item được đóng và không còn action delivery mở

### `CANCELLED`

- work item bị hủy có chủ đích
- không tiếp tục chain delivery hiện tại
- phải có lý do và ref thay thế nếu bị supersede

## Transition Chuẩn

### Transition Hợp Lệ

- `INTAKE -> PROPOSED`
- `PROPOSED -> READY_TO_MATERIALIZE`
- `READY_TO_MATERIALIZE -> MATERIALIZED`
- `MATERIALIZED -> ACTIVE`
- `ACTIVE -> BLOCKED`
- `BLOCKED -> ACTIVE`
- `ACTIVE -> VERIFIED`
- `VERIFIED -> DONE`
- `DONE -> ARCHIVED`
- `PROPOSED -> CANCELLED`
- `READY_TO_MATERIALIZE -> CANCELLED`
- `MATERIALIZED -> CANCELLED`
- `ACTIVE -> CANCELLED`
- `BLOCKED -> CANCELLED`

### Transition Không Hợp Lệ

- `INTAKE -> MATERIALIZED` nếu không qua materialization
- `PROPOSED -> ACTIVE` nếu chưa scaffold
- `ACTIVE -> DONE` nếu không có `VERIFIED`
- `DONE -> ACTIVE` trừ khi mở work item mới hoặc có explicit re-open protocol
- `ARCHIVED -> ACTIVE` bằng cách sửa tay artifact cũ; phải tạo protocol event mới hoặc work item mới

## Điều Kiện Cho Mỗi Transition

### `INTAKE -> PROPOSED`

Yêu cầu:

- có `raw_request`
- có tóm tắt request tối thiểu
- đã xác định candidate đầu tiên hoặc quyết định `defer/split`

### `PROPOSED -> READY_TO_MATERIALIZE`

Yêu cầu:

- `materialization_status=READY`
- `work_item_slug` đã pass naming rule
- `dedup_result` không còn mơ hồ
- `change_strategy` đã kết luận
- không còn blocker ở mức authoring

### `READY_TO_MATERIALIZE -> MATERIALIZED`

Yêu cầu:

- command scaffold cần thiết đã chạy thành công
- nếu `change_strategy=create_new`, change package phải tồn tại trước hoặc trong cùng transaction logic
- validator baseline tối thiểu không fail ở mức naming/frontmatter ban đầu

### `MATERIALIZED -> ACTIVE`

Yêu cầu:

- `s01` đã được mở để authoring
- đã có `decision_owner` hoặc `protocol_owner`
- handoff vào backbone đã rõ

### `ACTIVE -> BLOCKED`

Yêu cầu:

- blocker được mô tả rõ
- owner hoặc action để gỡ blocker được ghi lại
- nếu blocker là governance/spec/change, phải có ref tương ứng

### `BLOCKED -> ACTIVE`

Yêu cầu:

- blocker đã được giải quyết hoặc accepted assumption đã được ghi rõ
- handoff quay lại step owner rõ

### `ACTIVE -> VERIFIED`

Yêu cầu:

- `s08` có evidence verify
- residual risks đã được ghi minh bạch
- quality gate kỹ thuật đã hoàn tất hoặc limitation đã được nêu

### `VERIFIED -> DONE`

Yêu cầu:

- `definition-of-done` đã pass
- `release` và `business_acceptance` đã xong nếu scope yêu cầu
- không còn blocker mở ở cấp work item

### `DONE -> ARCHIVED`

Yêu cầu:

- nếu có `change_id`, archive lifecycle của change package đã hoàn tất
- nếu không có `change_id`, work item được kết luận đóng và không còn pending delivery

## Operation Protocol

### `propose`

Mục tiêu:

- biến raw request thành candidate work item

Output tối thiểu:

- `materialization_report`
- `protocol_status=PROPOSED`

### `materialize`

Mục tiêu:

- khóa `work_item_slug`
- khóa `change_strategy`
- scaffold artifact ban đầu

Output tối thiểu:

- `workflow_root`
- `protocol_status=MATERIALIZED`

### `activate`

Mục tiêu:

- handoff work item đã scaffold vào backbone `s01`

Output tối thiểu:

- `current_step=s01`
- `protocol_status=ACTIVE`

### `block`

Mục tiêu:

- dừng tiến độ một cách explicit, không để state ngầm

Output tối thiểu:

- `blockers`
- `handoff_target`
- `protocol_status=BLOCKED`

### `resume`

Mục tiêu:

- quay lại `ACTIVE` sau khi blocker được gỡ

### `verify`

Mục tiêu:

- kết luận technical verification ở cấp work item

Output tối thiểu:

- `current_step=s08`
- `protocol_status=VERIFIED`

### `close`

Mục tiêu:

- đóng work item sau khi `VERIFIED`

Output tối thiểu:

- `protocol_status=DONE`

### `archive`

Mục tiêu:

- kết thúc lifecycle của work item

Output tối thiểu:

- `protocol_status=ARCHIVED`

### `cancel`

Mục tiêu:

- hủy work item có chủ đích

Output tối thiểu:

- `protocol_status=CANCELLED`
- `reason`
- `superseded_by` nếu có

### `split`

`split` là operation đặc biệt, không phải status.

Rule:

- ưu tiên split ở `PROPOSED` hoặc `READY_TO_MATERIALIZE`
- nếu split sau `MATERIALIZED`, parent phải ghi rõ giữ residual scope hay bị supersede
- nếu parent không còn scope thực thi, parent nên chuyển `CANCELLED`

## Authority Model

### Human

Có authority mặc định để:

- approve hoặc reject candidate work item
- yêu cầu split, merge logic hoặc cancel
- quyết định initiative mơ hồ có được auto-scaffold hay không

### Coordinator

Có authority để:

- vận hành protocol trong flow delivery
- chuyển `MATERIALIZED -> ACTIVE`
- chuyển `ACTIVE <-> BLOCKED`
- đề xuất `DONE` hoặc `CANCELLED`

Coordinator không tự override governance authority hoặc business acceptance authority.

### Agentic

Chỉ được tự:

- `propose`
- `materialize`
- scaffold work item mới

khi đồng thời thỏa:

- `materialization_status=READY`
- `protocol_status=READY_TO_MATERIALIZE`
- không có ambiguity về `reuse_work_item` hoặc `reuse_change`
- command scaffold suy ra được đầy đủ

Agentic không được tự:

- split initiative mơ hồ thành nhiều item nếu chưa có rule rõ
- reuse hoặc reopen work item archived mà không có human/coordinator decision
- mark `DONE` hoặc `ARCHIVED` chỉ dựa vào scaffold hay code changes

## Handoff Protocol

### Handoff Bắt Buộc Ở Cấp Work Item

- `materialization -> scaffold`
- `MATERIALIZED -> s01 Clarify`
- `BLOCKED -> owner giải blocker`
- `VERIFIED -> signoff owners`
- `DONE -> archive lifecycle`

### Handoff Payload Tối Thiểu

Mỗi handoff nên có:

- `protocol_status`
- `work_item_slug`
- `current_step`
- `summary`
- `required_actions`
- `blockers`
- `handoff_target`
- `refs`

## Output Contract Chuẩn

Baseline hiện tại hỗ trợ 2 cách giữ output protocol:

- JSON report, mặc định được ghi vào `<workflow_root>/<work_item_slug>.work-item-report.json` khi chạy `wfc materialize --auto-scaffold`
- block `## Work Item Protocol` trong `s01` để audit ngay trong note workflow

```yaml
protocol_status: INTAKE|PROPOSED|READY_TO_MATERIALIZE|MATERIALIZED|ACTIVE|BLOCKED|VERIFIED|DONE|ARCHIVED|CANCELLED
approval_status: PENDING_REVIEW|APPROVED|REJECTED|NOT_REQUIRED
review_required: true|false
work_item_slug: ""
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
workflow_root: ""
current_step: s01|s02|s03|s04|s05|s06|s07|s08|""
materialization_status: PROPOSED|READY|BLOCKED
change_strategy: none|reuse_existing|create_new
change_id: ""
decision_owner: human|agent|coordinator
protocol_owner: ""
reviewed_by: ""
reviewed_at: ""
handoff_target: ""
required_actions: []
blockers: []
review_notes: []
refs: []
audit_events: []
protocol_events: []
```

## Audit Event Vocabulary

Khuyến nghị dùng vocabulary ổn định:

- `REQUEST_CAPTURED`
- `CANDIDATE_PROPOSED`
- `SLUG_LOCKED`
- `DEDUP_CONFIRMED`
- `CHANGE_REUSED`
- `CHANGE_CREATED`
- `WORKFLOW_SCAFFOLDED`
- `STEP_OPENED`
- `WORK_ITEM_APPROVED`
- `WORK_ITEM_REJECTED`
- `WORK_ITEM_ACTIVATED`
- `WORK_ITEM_BLOCKED`
- `WORK_ITEM_RESUMED`
- `VERIFICATION_CONFIRMED`
- `DONE_CONFIRMED`
- `ARCHIVE_CONFIRMED`
- `WORK_ITEM_CANCELLED`
- `WORK_ITEM_SPLIT`

## Command Surface Mapping

### Baseline Hiện Có

- `wfc materialize --request "<raw-request>"`
- `wfc work-item status --work-item <slug>`
- `wfc work-item approve --work-item <slug> --reviewed-by <role>`
- `wfc work-item reject --work-item <slug> --reviewed-by <role> --note "<reason>"`
- `wfc work-item activate --work-item <slug>`
- `wfc work-item block --work-item <slug> --blocker "<reason>"`
- `wfc work-item resume --work-item <slug>`
- `wfc work-item verify --work-item <slug>`
- `wfc work-item close --work-item <slug>`
- `wfc work-item archive --work-item <slug>`
- `wfc work-item cancel --work-item <slug> --reason "<reason>"`
- `wfc protocol --workflow-root work-items --project-root .`
- `npm run scaffold:change -- --change-id <CHANGE-ID> --work-item <work-item-slug>`
- `npm run scaffold:workflow -- --work-item <work-item-slug> --planning-track <quick|full|enterprise>`
- `npm run scaffold:workflow-step -- --work-item <work-item-slug> --step <sNN>`
- `npm run validate:workflow -- --workflow-root work-items --project-root .`

`wfc materialize` ở baseline hiện tại:

- sinh materialization + protocol report ở dạng JSON
- suy ra slug candidate, `change_strategy`, `change_id`, `planning_track`, `governance_profile`
- hỗ trợ `--auto-scaffold` khi status đạt `READY_TO_MATERIALIZE`
- nhúng block `Work Item Materialization` và `Work Item Protocol` vào `s01` sau khi scaffold thành công
- tự đặt `approval_status=PENDING_REVIEW` khi decision owner là `agent`, để human review trước khi vào `ACTIVE`

### Target Extension

Các command sau vẫn là target contract tiếp theo:

- `wfc work-item split --work-item <slug>`
- `wfc work-item reopen --work-item <slug>`
- `wfc work-item list`

Nếu implement sau này, các command này phải bám đúng enum và transition trong tài liệu này, không tự invent state mới.

## Tích Hợp Với Workflow Hiện Tại

Flow khuyến nghị:

1. `INTAKE`
2. chạy `Work Item Materialization`
3. nếu đã đủ, chuyển `READY_TO_MATERIALIZE`
4. scaffold change package nếu cần
5. scaffold workflow
6. chuyển `MATERIALIZED`
7. mở `s01`, ghi block protocol + materialization
8. chuyển `ACTIVE`
9. đi qua `s01 -> s08`
10. sau `s08`, chuyển `VERIFIED -> DONE`
11. nếu lifecycle yêu cầu, chuyển `ARCHIVED`

## Block Audit Khuyến Nghị Trong `s01`

````md
## Work Item Protocol
```yaml
protocol_status: ACTIVE
approval_status: APPROVED
review_required: true
work_item_slug: ""
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
workflow_root: ""
current_step: s01
materialization_status: PROPOSED|READY|BLOCKED
change_strategy: none|reuse_existing|create_new
change_id: ""
decision_owner: human|agent|coordinator
protocol_owner: ""
reviewed_by: ""
reviewed_at: ""
handoff_target: ""
required_actions: []
blockers: []
review_notes: []
refs: []
audit_events:
  - REQUEST_CAPTURED
  - CANDIDATE_PROPOSED
  - SLUG_LOCKED
  - WORKFLOW_SCAFFOLDED
  - STEP_OPENED
```
````

Block này không thay `## Step Contract`.

Nó chỉ giữ lifecycle state ở cấp work item.

## Ví Dụ

### Ví Dụ 1. Request Mơ Hồ

Input:

- `Tôi muốn làm chức năng đăng nhập`

Protocol khuyến nghị:

```yaml
protocol_status: PROPOSED
materialization_status: PROPOSED
work_item_slug: "user-login"
change_strategy: create_new
required_actions:
  - "clarify login scope"
  - "confirm split hay single work item"
blockers:
  - "scope chưa rõ email/password hay social login"
```

Ý nghĩa:

- có candidate
- chưa được scaffold

### Ví Dụ 2. Bug Rõ Ràng

Input:

- `Fix timeout khi user login bằng email/password trên web`

Protocol khuyến nghị:

```yaml
protocol_status: READY_TO_MATERIALIZE
materialization_status: READY
work_item_slug: "fix-login-timeout"
change_strategy: none
required_actions:
  - "npm run scaffold:workflow -- --work-item fix-login-timeout --planning-track quick"
audit_events:
  - REQUEST_CAPTURED
  - CANDIDATE_PROPOSED
  - SLUG_LOCKED
  - DEDUP_CONFIRMED
```

Sau khi scaffold xong:

```yaml
protocol_status: MATERIALIZED
workflow_root: "work-items/fix-login-timeout"
audit_events:
  - WORKFLOW_SCAFFOLDED
```

## Kết Luận

`Work Item Materialization` giúp quyết định có mở work item hay không.

`Work Item Protocol` giúp quản lý work item đó sau khi quyết định đã được đưa ra.

Khi hai lớp này đi cùng nhau:

- `agentic` có thể tự mở work item một cách có kiểm soát
- scaffold không còn là hành vi rời rạc
- state, authority và handoff của work item trở nên audit được
