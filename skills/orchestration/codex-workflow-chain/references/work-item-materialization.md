# Work Item Materialization

Lưu ý versioning:

- tài liệu này thuộc lớp mở rộng `post-v1`
- `baseline v1` không yêu cầu `Work Item Materialization`
- trong `baseline v1`, human hoặc coordinator chốt `work_item_slug` thủ công trước khi scaffold
- ranh giới version chính thức nằm ở `workflow-versioning.md`

Tài liệu này materialize lớp authoring nằm trước `scaffold`.

Nó trả lời 4 câu hỏi mà repo hiện đã giả định nhưng chưa khóa thành protocol riêng:

- raw request này có nên tạo `work item` mới không
- nếu có thì là 1 item hay nhiều item
- `work_item_slug` nên là gì
- có cần `change layer` hay không, và nếu cần thì `reuse` hay `create-new`

Thời điểm đối chiếu: `2026-04-14`.

## Mục Tiêu

`Work Item Materialization` là bước chuyển từ yêu cầu thô sang quyết định authoring có thể thi hành.

Kết quả của bước này phải đủ để:

- gọi `npm run scaffold:workflow -- --work-item <work_item_slug>`
- quyết định có cần `npm run scaffold:change -- --change-id <CHANGE-ID> --work-item <work_item_slug>` hay không
- cho phép human hoặc agentic runtime tạo artifact mới mà không trùng scope, trùng slug hoặc gắn sai `change_id`

Lifecycle sau khi quyết định materialization đã được chốt được mô tả tiếp ở `work-item-protocol.md`.

Tài liệu này không thay `s01 Clarify`.

- `Materialization` chốt đơn vị authoring và naming.
- `s01 Clarify` chốt bản hiểu chung, scope draft và governance context bên trong work item đã được materialize.

## Phạm Vi

Áp dụng khi:

- nhận user request, ticket, incident, bug report, change request hoặc initiative mới
- cần quyết định có scaffold work item mới không
- cần nối workflow backbone với `changes/`
- muốn tăng autonomy cho `agentic` trước khi cho agent tự scaffold

Không áp dụng khi:

- chỉ cập nhật nội dung cho work item đã tồn tại và scope không đổi
- chỉ chạy lại validator hoặc sửa artifact naming
- chỉ thêm note phụ không thuộc workflow backbone

## Kết Quả Bắt Buộc

Một lần materialization phải trả lời rõ:

1. `single`, `split` hay `defer`
2. `work_item_type` là gì
3. `work_item_slug` là gì
4. có conflict với `work-items/` hoặc `changes/` hiện có không
5. `change_strategy` là `none`, `reuse_existing` hay `create_new`
6. có được phép auto-scaffold hay cần human confirm

## Input Tối Thiểu

### Bắt Buộc

- `raw_request`: mô tả yêu cầu thô
- `request_source`: user chat, ticket, incident, change request hoặc doc ref
- `project_context_ref`: tối thiểu `project-context/project-context.md`
- `existing_work_items`: danh sách hoặc kết quả search trong `work-items/`
- `existing_changes`: danh sách hoặc kết quả search trong `changes/`

### Khuyến Nghị

- `product_spec_refs`: `BRD/SRS` liên quan nếu đã có
- `release_context`: release window hoặc initiative hiện tại nếu có
- `governance_profile_hint`: `default|strict|regulated|custom` nếu đã biết
- `owner_hint`: role hoặc team sẽ dẫn dắt
- `environment_scope`: web, mobile, backend, data, runtime nếu đã rõ

Nếu thiếu `raw_request`, `existing_work_items` hoặc `existing_changes`, không được kết luận `READY`.

## Output Contract

Output chuẩn của bước này nên được giữ dưới dạng `materialization report` logic, dù runtime có lưu thành artifact riêng hay nhúng vào `s01`.

```yaml
materialization_status: PROPOSED|READY|BLOCKED
decision_owner: human|agent|coordinator
raw_request_summary: ""
request_source: ""
candidate_count: 1
split_decision: single|split|defer
dedup_result: no_conflict|reuse_work_item|reuse_change|needs_review
work_items:
  - work_item_slug: ""
    work_item_title: ""
    work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
    scope_summary: ""
    primary_outcome: ""
    in_scope: []
    out_of_scope: []
    planning_track: quick|full|enterprise
    sdd_mode: none|light|strict
    governance_profile: default|strict|regulated|custom
    execution_mode: agentic|multi_agent
    existing_refs: []
    collision_notes: []
    change_strategy: none|reuse_existing|create_new
    change_id: ""
    change_reason: ""
    change_refs: []
    scaffold_actions: []
    blockers: []
decision_log: []
```

## Luồng Quyết Định Chuẩn

### Bước 1. Chuẩn Hóa Request

Rút từ yêu cầu thô ra tối thiểu:

- vấn đề hoặc nhu cầu chính
- outcome mong muốn
- actor hoặc bối cảnh sử dụng
- constraint đã biết
- tín hiệu về urgency, release hoặc governance

Nếu raw request chỉ là một chủ đề quá rộng như `làm auth`, `nâng cấp billing`, `làm dashboard`, kết quả mặc định là `PROPOSED` hoặc `BLOCKED`, không auto-scaffold ngay.

### Bước 2. Chốt Boundary Của Work Item

Một request được coi là đủ tốt cho **một** work item khi đồng thời có:

- một primary outcome đủ rõ
- một acceptance envelope tương đối thống nhất
- một ownership boundary chính
- một planning track hợp lý cho toàn bộ scope
- một nhịp change/release đủ thống nhất

Nếu một request chứa nhiều outcome độc lập, phải `split`.

### Bước 3. Chọn `work_item_type`

Dùng rule ưu tiên sau:

- `BUG`: khôi phục behavior đúng, không chủ đích thay outcome sản phẩm
- `FEATURE`: thêm capability mới cho user hoặc operator
- `CHANGE`: thay đổi có lifecycle rollout/change management rõ, thường chạm dữ liệu, contract, migration, cutover hoặc release control
- `REFACTOR`: cải tổ cấu trúc kỹ thuật nhưng giữ `behavioral_invariants`
- `RESEARCH`: khám phá, so sánh, spike, chưa cam kết implementation path ngay

Nếu request vừa có research vừa có implementation, mặc định tách:

- `research-...` cho discovery
- work item implementation riêng khi scope đã rõ

### Bước 4. Sinh `work_item_slug`

Sinh slug từ đơn vị delivery đã chốt, không sinh trực tiếp từ câu người dùng theo kiểu máy móc.

### Bước 5. Kiểm Tra Trùng Và Collision

Phải search tối thiểu:

- `work-items/<slug>/`
- các work item có từ khóa gần nghĩa
- `changes/` đang active có `linked_work_items` hoặc scope gần trùng

### Bước 6. Quyết Định `change_strategy`

Kết luận một trong ba giá trị:

- `none`
- `reuse_existing`
- `create_new`

### Bước 7. Chốt Authority

Kết luận:

- `READY`: được scaffold tự động
- `PROPOSED`: đã có candidate nhưng cần human confirm hoặc clarify thêm
- `BLOCKED`: chưa đủ input để tạo artifact mới an toàn

## Rule Chốt Một Hay Nhiều Work Item

### Giữ Một Work Item Khi

- chỉ có một outcome chính mà stakeholder sẽ nhìn như một kết quả hoàn chỉnh
- acceptance criteria dự kiến vẫn cùng một nhóm
- cùng một `planning_track`
- cùng một `governance_profile` hoặc chênh lệch không đáng kể
- cùng một release/change cadence

### Bắt Buộc Tách Nhiều Work Item Khi

- có hơn một outcome business độc lập
- một phần là `RESEARCH`, phần còn lại là implementation
- một phần có thể ship độc lập, phần còn lại phải chờ design/spec/change riêng
- governance profile khác nhau rõ rệt
- một phần chỉ là bug fix nhanh, phần còn lại là initiative lớn
- một phần cần `change layer`, phần còn lại không cần

### Không Tách Chỉ Vì

- chạm nhiều file
- chạm frontend và backend nhưng vẫn phục vụ một outcome duy nhất
- có nhiều task kỹ thuật nhưng cùng một acceptance envelope

## Rule Sinh `work_item_slug`

### Mục Tiêu Của Slug

Slug phải:

- ổn định trong suốt `s01 -> s08`
- phản ánh outcome hoặc change intent chính
- đọc được bởi human
- suy ra được artifact path và search query một cách dễ dàng

### Pattern Bắt Buộc

- `kebab-case`
- chỉ gồm `[a-z0-9-]`
- tương thích regex hiện tại của tooling

### Dạng Đặt Tên Khuyến Nghị

Ưu tiên `verb-object` hoặc `verb-domain-object`.

Ví dụ tốt:

- `user-login`
- `fix-login-timeout`
- `add-google-oauth-login`
- `normalize-customer-phone-index`
- `refactor-auth-session-store`
- `research-oauth-provider-options`

Ví dụ xấu:

- `task-123`
- `new-feature`
- `login-screen-final`
- `auth-v2`
- `issue-fix`

### Rule Chi Tiết

- ưu tiên 2-6 token
- giữ domain noun quan trọng như `login`, `oauth`, `customer`, `session`, `billing`
- nếu cần phân biệt boundary, thêm qualifier có nghĩa như `web`, `api`, `mobile`, `migration`
- tránh token rỗng ý nghĩa như `task`, `feature`, `issue`, `ticket`, `new`, `final`, `v2`
- không dùng tên step hoặc tên artifact như `clarify`, `design`, `implementation`
- không encode chi tiết tạm thời hoặc solution quá hẹp nếu scope business rộng hơn

### Rule Theo `work_item_type`

- `FEATURE`: ưu tiên `add-`, `enable-`, `support-`, hoặc noun-based outcome nếu tự nhiên hơn như `user-login`
- `BUG`: ưu tiên `fix-`, `prevent-`, `restore-`
- `CHANGE`: ưu tiên `migrate-`, `normalize-`, `retire-`, `reindex-`, `cutover-`
- `REFACTOR`: ưu tiên `refactor-`, `extract-`, `consolidate-`
- `RESEARCH`: ưu tiên `research-`, `evaluate-`, `spike-`

### Rule Collision

Nếu slug candidate đã tồn tại:

- cùng scope và chỉ là tiếp tục delivery: reuse work item hiện có, không tạo slug mới
- khác scope nhưng cùng noun lõi: thêm qualifier có nghĩa
- chỉ dùng suffix số như `-2` khi không còn qualifier business nào hợp lý

Ví dụ:

- `user-login` đã tồn tại và scope mới là login Google riêng: dùng `add-google-oauth-login`, không dùng `user-login-2`
- `billing-export` đã tồn tại cho CSV, scope mới là PDF: dùng `billing-export-pdf`

## Rule Kiểm Tra Trùng Và Reuse

### Search Tối Thiểu

- exact slug match trong `work-items/`
- semantic-near match theo keyword chính của request
- change package active trong `changes/` có cùng outcome hoặc cùng release intent

### Kết Luận Dedup

- `no_conflict`: không thấy scope active nào trùng đáng kể
- `reuse_work_item`: scope mới thực chất là tiếp tục work item đang mở
- `reuse_change`: work item mới nên gắn vào change package đang active
- `needs_review`: có hơn một candidate hợp lý hoặc scope chồng lấn chưa đủ rõ

### Tín Hiệu Phải Review Thủ Công

- exact slug đã tồn tại nhưng artifact đang ở trạng thái chưa rõ scope hiện tại
- có nhiều work item cùng chia sẻ noun chính như `login`, `auth`, `session`
- có change package đang `approved` hoặc `implementing` với scope gần giống
- request mới có vẻ là sub-scope của initiative đang mở nhưng chưa rõ nên merge hay tách

## Rule Quyết Định `change_strategy`

### Dùng `none` Khi

- bug fix hoặc refactor cục bộ không làm đổi truth của `BRD/SRS`
- không cần package `proposal -> design -> tasks -> spec-delta -> archive`
- không có migration, cutover, rollout governance hoặc external contract change đáng kể

### Dùng `reuse_existing` Khi

- đã có change package active phù hợp với scope
- status của change package là `draft`, `approved` hoặc `implementing`
- work item mới chỉ là phần delivery tiếp theo của cùng change intent
- archive lifecycle của work item mới phải đi cùng package đó

### Dùng `create_new` Khi

- đây là một thay đổi có release intent hoặc approval path riêng
- cần `spec_delta`
- không có active change package phù hợp để reuse
- package cũ đã `archived`
- package cũ đã `verified` nhưng scope mới là wave tiếp theo, không nên mở rộng ngầm

### Tín Hiệu Mạnh Cho `create_new`

- thêm hoặc đổi capability ở mức cần trace sản phẩm-thay đổi rõ
- migration/backfill/index/cutover
- thay đổi API contract, policy, compliance hoặc release sequencing
- business muốn review/approve change như một package riêng

## Rule Sinh `change_id`

Tooling hiện chỉ validate pattern uppercase token, nhưng canonical strategy nên hẹp hơn cho authoring:

- dùng dạng `CHANGE-NNN`
- `NNN` zero-pad tối thiểu 3 chữ số
- lấy số kế tiếp bằng cách scan `changes/CHANGE-*`

Ví dụ:

- đã có `CHANGE-001`
- package mới tiếp theo là `CHANGE-002`

Không tạo `change_id` mới khi:

- `change_strategy=none`
- `change_strategy=reuse_existing`

Nếu repo sau này cần prefix khác như `INCIDENT-` hoặc `RFC-`, policy riêng phải override tài liệu này thay vì để agent tự invent.

## Planning Và Governance Preset

Materialization nên chốt preset đủ dùng cho scaffold đầu tiên.

### `planning_track`

- `quick`: bug fix hoặc scope nhỏ, risk thấp, một boundary chính
- `full`: mặc định cho feature/change thông thường
- `enterprise`: scope lớn, nhiều signoff, nhiều risk, nhiều boundary hoặc release lane nặng

### `execution_mode`

- mặc định `agentic`
- chỉ chọn `multi_agent` ngay từ materialization khi complexity signal đã rất rõ và ownership boundary đủ tách bạch

### `governance_profile`

- `default`: mặc định
- `strict`: scope nhạy cảm hơn bình thường
- `regulated`: dữ liệu, compliance, regulated release
- `custom`: chỉ khi project đã có custom governance refs thật

## Authority Gate Cho Agentic

### Agent Được Auto-Scaffold Khi

- `split_decision=single` hoặc split đã rõ ràng và từng item đều rõ
- `materialization_status=READY`
- `dedup_result=no_conflict` hoặc `reuse_change` không mơ hồ
- slug pass naming rules và không collision chưa xử lý
- `change_strategy` rõ
- `planning_track` và `governance_profile` đủ chắc để scaffold preset đầu tiên

### Agent Chỉ Được Đề Xuất, Chưa Được Scaffold Khi

- request còn nhiều cách hiểu hợp lý
- chưa rõ nên 1 item hay nhiều item
- chưa rõ `reuse_existing` hay `create_new`
- thấy hơn một candidate work item hoặc change package active
- scope là initiative rộng kiểu `làm chức năng đăng nhập`, `làm auth`, `cải thiện billing`

### Agent Phải Chặn Và Xin Thêm Input Khi

- không có raw request đủ nghĩa
- không search được `work-items/` hoặc `changes/`
- scope mơ hồ đến mức slug chỉ còn là phỏng đoán
- có regulated/custom governance mà authority chưa rõ
- request chạm change package đã `archived`

## Checklist Vận Hành

### Checklist Input

- đã có tóm tắt request một câu rõ nghĩa chưa
- đã biết đây là outcome mong muốn hay chỉ là chủ đề mơ hồ chưa
- đã search `work-items/` theo noun chính chưa
- đã search `changes/` theo noun chính hoặc release intent chưa
- đã nhìn `project-context/` để hiểu governance baseline chưa

### Checklist Boundary

- item này có đúng một primary outcome không
- acceptance criteria dự kiến có cùng một nhóm không
- có cần tách `research` khỏi implementation không
- một phần của scope có thể ship độc lập không
- change/release cadence có đồng nhất không

### Checklist Slug

- slug đã theo `kebab-case` chưa
- slug có dùng noun domain thật thay vì token rỗng không
- slug có ổn định nếu implementation detail đổi không
- slug có phân biệt đủ với item gần giống đang tồn tại không
- slug có tránh suffix số không cần thiết không

### Checklist Change

- scope này có cần trace `spec_delta` không
- có active change package nào phù hợp để reuse không
- package candidate có đang ở status cho phép reuse không
- đây có phải wave/change intent mới không
- `change_id` đã được chọn theo canonical strategy chưa

### Checklist Autonomy

- status có phải `READY` không
- dedup result có phải `no_conflict` hoặc `reuse_change` rõ ràng không
- có blocker nào buộc human quyết định không
- scaffold command đã suy ra đủ chưa
- agent có thể giải thích vì sao chọn slug/change trong 3-5 dòng không

## Tích Hợp Vào Workflow Hiện Tại

Flow khuyến nghị:

1. chạy `Work Item Materialization`
2. nếu đủ điều kiện, chuyển protocol status sang `READY_TO_MATERIALIZE`
3. nếu `change_strategy=create_new`, scaffold change package trước
4. scaffold workflow
5. copy quyết định materialization vào `s01 Clarify`
6. tiếp tục chain `s01 -> s08`

Baseline hiện tại có thể chạy trực tiếp qua:

```bash
wfc materialize --request "<raw-request>"
wfc materialize --request "<raw-request>" --auto-scaffold
```

Khi chạy `--auto-scaffold`, tooling hiện sẽ:

- scaffold change package nếu `change_strategy=create_new`
- scaffold workflow notes
- chèn block `Work Item Materialization` và `Work Item Protocol` vào `s01`
- ghi JSON report vào `<workflow_root>/<work_item_slug>.work-item-report.json`

Khi `s01` đã được scaffold, nên lưu lại một block như sau để audit:

````md
## Work Item Materialization
```yaml
materialization_status: PROPOSED|READY|BLOCKED
decision_owner: human|agent|coordinator
raw_request_summary: ""
split_decision: single|split|defer
dedup_result: no_conflict|reuse_work_item|reuse_change|needs_review
work_item_slug: ""
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
change_strategy: none|reuse_existing|create_new
change_id: ""
decision_reason:
  - ""
existing_refs: []
blockers: []
```
````

Block này không thay `## Step Contract`.

Nó chỉ giữ audit trail cho quyết định authoring ban đầu.

## Ví Dụ

### Ví Dụ 1. Request Mơ Hồ

Input:

- `Tôi muốn làm chức năng đăng nhập`

Kết luận khuyến nghị:

```yaml
materialization_status: PROPOSED
split_decision: defer
dedup_result: needs_review
work_items:
  - work_item_slug: "user-login"
    work_item_type: FEATURE
    change_strategy: create_new
    change_id: "CHANGE-002"
    blockers:
      - "Chưa rõ email/password hay social login"
      - "Chưa rõ forgot password, MFA, session policy có thuộc scope không"
```

Ý nghĩa:

- có thể đề xuất `user-login` làm candidate đầu tiên
- chưa nên auto-scaffold nếu agent chưa có thêm context

### Ví Dụ 2. Bug Rõ Ràng

Input:

- `Fix timeout khi user login bằng email/password trên web`

Kết luận khuyến nghị:

```yaml
materialization_status: READY
split_decision: single
dedup_result: no_conflict
work_items:
  - work_item_slug: "fix-login-timeout"
    work_item_type: BUG
    planning_track: quick
    execution_mode: agentic
    change_strategy: none
    scaffold_actions:
      - "npm run scaffold:workflow -- --work-item fix-login-timeout --planning-track quick"
```

### Ví Dụ 3. Feature Có Change Layer

Input:

- `Thêm đăng nhập Google cho customer portal`

Kết luận khuyến nghị:

```yaml
materialization_status: READY
split_decision: single
dedup_result: no_conflict
work_items:
  - work_item_slug: "add-google-oauth-login"
    work_item_type: FEATURE
    planning_track: full
    execution_mode: agentic
    change_strategy: create_new
    change_id: "CHANGE-002"
    scaffold_actions:
      - "npm run scaffold:change -- --change-id CHANGE-002 --work-item add-google-oauth-login"
      - "npm run scaffold:workflow -- --work-item add-google-oauth-login --planning-track full --change-id CHANGE-002"
```

## Kết Luận

`Work Item Materialization` là gate authoring trước `scaffold`.

Nếu không có lớp này:

- `agentic` chỉ mới tự chạy step
- chưa thể tự mở work item mới một cách an toàn

Nếu lớp này được giữ thành protocol rõ:

- slug được chốt có lý do
- change decision có evidence
- dedup được kiểm trước khi sinh artifact
- scaffold có thể được tự động hóa mà không làm trôi governance của authoring
