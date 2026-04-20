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

Lưu ý quan trọng:

- `work item approval` không thay cho `bootstrap gate` của `empty/greenfield project`
- với project mới, trước khi materialize work item implementation đầu tiên phải có evidence rằng `Spec`, `Contract` khi có, `Approach` và `Foundation Decision` khi có đã được human pass
- với `brownfield`, protocol vẫn cho phép materialize/scaffold để authoring, nhưng work item phải khai báo `delivery_context=brownfield` và bám đủ output baseline/impact/regression của backbone trước khi implement
- nếu chưa có bootstrap evidence, handoff đúng là quay về clarify/spec/approach, không được scaffold rồi hợp thức hóa sau
- `list` và `status` có thể bootstrap report read-only từ `s01` cũ để quan sát trạng thái legacy scaffold
- các action mutating như `approve`, `reject`, `activate`, `block`, `resume`, `verify`, `close`, `archive`, `cancel` phải dùng report đã tồn tại; không được tự bootstrap từ `s01`
- các human gate được coi là trusted chỉ khi có signed receipt ngoài project root; metadata trong note/report không còn đủ để mở gate một mình

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

- work item đã mở execution path trong backbone `s07 -> s08`
- gate authoring trước code ở `s04`, `s05`, `s06` đã có evidence phù hợp để runtime cho phép implement

### `BLOCKED`

- work item có blocker chặn tiến độ
- blocker có thể đến từ input, governance, spec, authority, tool hoặc change package

### `VERIFIED`

- `s08` đã có verification evidence đủ để kết luận kỹ thuật
- chưa đồng nghĩa `DONE` nếu còn signoff hoặc release/business acceptance

### `DONE`

- work item đã đạt `DoD`
- các signoff bắt buộc trong `s08` đã hoàn tất; nếu scope yêu cầu thì gồm cả `UAT`, `Release`, `Business Acceptance`

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
- `PROPOSED` hoặc `READY_TO_MATERIALIZE` -> `ACTIVE` nếu chưa materialize và chưa có gate evidence bắt buộc
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

- `work item approval` đã `APPROVED`
- nếu có `change_id`, `change package approval` đã `APPROVED`
- nếu `delivery_context=greenfield`, `bootstrap gate` đã `APPROVED`
- `s04`, `s05`, `s06` đã có evidence gate đủ để mở execution
- `granted_write_paths` đã được khai báo để capability control biết implementation path nào được mở ghi
- trusted signed receipt cho `work-item`, `change` và các gate step bắt buộc đã tồn tại và còn khớp artifact hiện tại
- handoff vào execution path đã rõ

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

- `s08` có evidence verify và source-of-truth đã được cập nhật
- residual risks đã được ghi minh bạch
- quality gate kỹ thuật đã hoàn tất hoặc limitation đã được nêu

### `VERIFIED -> DONE`

Yêu cầu:

- `definition-of-done` đã pass trong `s08`
- `uat`, `release` và `business_acceptance` đã xong trong `s08` nếu scope yêu cầu
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

- `current_step=s07`
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
review_required: true
work_item_slug: ""
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
workflow_root: ""
current_step: s01|s02|s03|s04|s05|s06|s07|s08|""
materialization_status: PROPOSED|READY|BLOCKED
change_strategy: none|reuse_existing|create_new
change_id: ""
delivery_context: greenfield|brownfield
decision_owner: agent|coordinator
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
bootstrap_gate_status: PENDING_REVIEW|APPROVED|NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
```

Ghi chú:

- `NOT_REQUIRED` được giữ trong enum để tương thích artifact cũ; protocol-managed work item mới không được dùng giá trị này.
- `review_required` luôn phải là `true` với work item do protocol quản lý.
- `decision_owner` là owner của quyết định materialization/protocol do runtime tạo ra, không thay human approval authority.

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
- `wfc gate approve --work-item <slug> --gate <spec|dor|approach|task_plan|bootstrap|dod|...> --reviewed-by <role>`
- `wfc work-item activate --work-item <slug> --step s07 --write-root <path>`
- `wfc work-item block --work-item <slug> --blocker "<reason>"`
- `wfc work-item resume --work-item <slug>`
- `wfc work-item verify --work-item <slug>`
- `wfc work-item close --work-item <slug>`
- `wfc work-item archive --work-item <slug>`
- `wfc work-item cancel --work-item <slug> --reason "<reason>"`
- `wfc capability status`
- `wfc capability sync`
- `wfc capability check --path <path>`
- `wfc protocol --workflow-root work-items --project-root .`
- `wfc scaffold-change --change-id <CHANGE-ID> --work-item <work-item-slug>`
- `wfc scaffold --work-item <work-item-slug> --planning-track <quick|full|enterprise>`
- `wfc scaffold-step --work-item <work-item-slug> --step <sNN>`
- `wfc validate --workflow-root work-items --project-root .`

`wfc materialize` ở baseline hiện tại:

- sinh materialization + protocol report ở dạng JSON
- suy ra slug candidate, `change_strategy`, `change_id`, `planning_track`, `governance_profile`
- hỗ trợ `--auto-scaffold` khi status đạt `READY_TO_MATERIALIZE`
- nhúng block `Work Item Materialization` và `Work Item Protocol` vào `s01` sau khi scaffold thành công
- tự đặt `approval_status=PENDING_REVIEW`, buộc human review trước khi vào `ACTIVE`
- không mở `ACTIVE` chỉ vì scaffold xong; `s04-s06` phải có evidence gate phù hợp trước khi execute

`wfc work-item list|status`:

- có thể bootstrap report read-only từ `s01` nếu work item cũ chưa có `.work-item-report.json`
- không được sync bootstrap report này ngược lại xuống filesystem

`wfc work-item approve|reject|activate|block|resume|verify|close|archive|cancel`:

- phải dùng `.work-item-report.json` đã tồn tại
- nếu chỉ có `s01` legacy mà chưa có report, phải materialize lại hoặc tạo report theo flow chính thức trước
- `activate` và `resume` vào `ACTIVE` ở `s07` phải có ít nhất một `write-root` để capability control mở đúng implementation path

`wfc gate approve|reject|status`:

- dùng để seal trusted receipt cho các gate human review bắt buộc
- với gate step như `spec`, `dor`, `approach`, `task_plan`, receipt sẽ bám digest của note hiện tại; sửa note sau khi approve sẽ làm receipt stale
- với `bootstrap`, receipt bám artifact được truyền qua `--ref`
- lần approve đầu tiên trong một trusted approval root sẽ tạo keypair approver và yêu cầu human nhập approval passphrase

`wfc capability status|sync|check`:

- `status`: xem policy capability control đang coi path nào là authoring roots, protected roots và granted write roots
- `sync`: áp policy capability control vào quyền ghi filesystem của project
- `check --path <path>`: kiểm path cụ thể có được phép ghi theo policy hiện tại hay không

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
7. author `s01 -> s06`, ghi block protocol + materialization và hoàn tất gate human cần thiết
8. chuyển `ACTIVE`
9. đi qua `s07 -> s08`
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
current_step: s07
granted_write_paths: []
materialization_status: PROPOSED|READY|BLOCKED
change_strategy: none|reuse_existing|create_new
change_id: ""
delivery_context: greenfield|brownfield
decision_owner: agent|coordinator
protocol_owner: ""
reviewed_by: ""
reviewed_at: ""
handoff_target: ""
required_actions: []
blockers: []
review_notes: []
refs: []
bootstrap_gate_status: PENDING_REVIEW|APPROVED|NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
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
