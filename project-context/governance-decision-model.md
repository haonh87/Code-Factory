# Governance Decision Model

Tài liệu này định nghĩa cách ra quyết định cho `governance layer`.

Mục tiêu:

- thống nhất cách chọn `governance_profile`
- thống nhất cách cập nhật `governance_status`
- thống nhất khi nào phải mở `governance-exception`
- giảm tình trạng mỗi agent hoặc mỗi role tự hiểu governance theo cách riêng

## Nguyên Tắc Quyết Định

- Mọi work item phải có `governance_profile`; không để trống.
- `governance_status` phải phản ánh trạng thái thật của step hiện tại, không dùng như nhãn trang trí.
- Nếu phát hiện lệch chuẩn nhưng vẫn muốn đi tiếp, phải ghi `governance-exception` hoặc `waiver`; không được chỉ ghi trong prose.
- Khi có nhiều tín hiệu khác nhau, ưu tiên profile và state nghiêm ngặt hơn:
  - `regulated` ưu tiên hơn `strict`
  - `strict` ưu tiên hơn `default`
  - `BLOCKED` ưu tiên hơn `CHECKS_PENDING`
  - `EXCEPTION_RECORDED` hoặc `WAIVER_APPROVED` ưu tiên hơn `ALIGNED`

## Thứ Tự Ra Quyết Định

Khi materialize hoặc cập nhật note workflow, dùng thứ tự sau:

1. Xác định `governance_ref`
2. Chọn `governance_profile`
3. Gắn `checklist_refs`
4. Đánh giá `governance_status`
5. Nếu có lệch chuẩn, tạo `governance-exception`
6. Nếu exception còn mở và thỏa điều kiện audit, cập nhật thêm register

## Rule Cho `governance_ref`

- Mặc định:
  - `project-context/project-context.md`
- Chỉ trỏ thẳng `constitution.md` khi step cần nhấn mạnh nguyên tắc nền hơn bối cảnh vận hành.
- Với `custom`, có thể trỏ tới note governance riêng của work item, nhưng vẫn phải trace về ít nhất một nguồn trong `project-context/`.

## Rule Chọn `governance_profile`

### Precedence

Chọn theo thứ tự:

1. `custom`
2. `regulated`
3. `strict`
4. `default`

### Khi Dùng `default`

Dùng `default` khi đồng thời thỏa các điều kiện sau:

- scope nhỏ hoặc vừa
- không có migration, compatibility hoặc rollback risk đáng kể
- không có packaging/runtime/release impact đáng kể
- không cần approval chain hoặc audit trail đặc biệt
- không có external integration hoặc data impact phức tạp

### Khi Dùng `strict`

Dùng `strict` nếu có ít nhất một tín hiệu sau mà chưa cần `regulated`:

- change đụng nhiều boundary hoặc nhiều role signoff
- có migration, compatibility risk hoặc rollback risk
- có packaging/runtime/release impact
- có external integration hoặc stateful data impact
- cần reviewer coverage chặt hơn bình thường
- technical approach có trade-off khiến verify hoặc rollout khó hơn mức thường lệ

### Khi Dùng `regulated`

Dùng `regulated` nếu có ít nhất một tín hiệu sau:

- cần audit trail rõ
- cần approval chain hoặc waiver approval chặt
- cần giữ exception, evidence hoặc decision log xuyên nhiều step
- có rule policy/compliance/control ngoài delivery lane thông thường
- exception chạm đồng thời `release` và `business_acceptance`

### Khi Dùng `custom`

Dùng `custom` khi:

- project hoặc work item có governance note riêng
- cần checklist chuyên biệt ngoài `default|strict|regulated`

Rule cho `custom`:

- phải chỉ ra base profile đang kế thừa từ profile nào
- không được dùng `custom` để làm nhẹ rule một cách mơ hồ
- vẫn phải có `checklist_refs` rõ

## Rule Gắn `checklist_refs`

- `default`:
  - tối thiểu trỏ `project-context/checklists/default.md`
- `strict`:
  - tối thiểu trỏ `project-context/checklists/strict.md`
- `regulated`:
  - tối thiểu trỏ `project-context/checklists/regulated.md`
- `custom`:
  - phải trỏ ít nhất một checklist base và một ref custom nếu có

Ghi chú:

- `strict.md` được hiểu là kế thừa `default`
- `regulated.md` được hiểu là kế thừa `strict` và `default`
- không bắt buộc lặp lại ref base profile nếu team không cần trace tường minh ở mức file

## State Model Cho `governance_status`

Enum chuẩn:

- `CHECKS_PENDING`
- `ALIGNED`
- `EXCEPTION_RECORDED`
- `WAIVER_APPROVED`
- `BLOCKED`
- `NOT_APPLICABLE`

### Ý Nghĩa Trạng Thái

#### `CHECKS_PENDING`

Dùng khi:

- governance context hoặc checklist chưa được đánh giá xong
- step mới mở và chưa đủ thông tin để kết luận aligned hay blocked

Không nên giữ trạng thái này quá lâu sau các gate chính.

#### `ALIGNED`

Dùng khi:

- rule áp dụng đã được kiểm
- checklist cần thiết đã pass hoặc được justify
- không có exception đang mở cho step đó

#### `EXCEPTION_RECORDED`

Dùng khi:

- đã có lệch chuẩn được ghi nhận
- exception chưa được authority đúng approve
- hoặc đã ghi exception nhưng mitigation còn mở

#### `WAIVER_APPROVED`

Dùng khi:

- exception đã được approve đúng authority
- step vẫn còn đang vận hành dưới điều kiện waiver hoặc accepted deviation

Nếu mitigation xong và không còn lệch chuẩn mở, có thể chuyển lại `ALIGNED`.

#### `BLOCKED`

Dùng khi:

- thiếu authority phù hợp
- thiếu evidence hoặc checklist cần thiết mà không thể justify
- có governance blocker ngăn step chuyển tiếp hoặc đóng gate

#### `NOT_APPLICABLE`

Chỉ dùng khi governance thật sự không tạo ra decision, gate hay evidence có ý nghĩa cho step hiện tại.

Trong workflow sản phẩm thông thường, trạng thái này nên hiếm.

## State Transition Chuẩn

### Luồng Chính

- `CHECKS_PENDING -> ALIGNED`
  khi checks đã hoàn tất và không có exception mở
- `CHECKS_PENDING -> EXCEPTION_RECORDED`
  khi phát hiện lệch chuẩn cần ghi nhận
- `CHECKS_PENDING -> BLOCKED`
  khi thiếu context, checklist hoặc authority mà chưa thể đi tiếp
- `ALIGNED -> EXCEPTION_RECORDED`
  khi phát hiện lệch chuẩn sau khi step đã từng aligned
- `EXCEPTION_RECORDED -> WAIVER_APPROVED`
  khi authority đúng đã approve
- `EXCEPTION_RECORDED -> BLOCKED`
  khi exception chạm gate nhưng chưa có approval hoặc mitigation đủ
- `WAIVER_APPROVED -> ALIGNED`
  khi mitigation hoàn tất và không còn accepted deviation đang mở
- `BLOCKED -> CHECKS_PENDING`
  khi blocker được gỡ nhưng checks cần chạy lại

### Luật Cấm

- không nhảy trực tiếp `CHECKS_PENDING -> WAIVER_APPROVED`
- không dùng `ALIGNED` khi exception còn mở nhưng chưa resolve hoặc chưa approve
- không dùng `NOT_APPLICABLE` để né việc đánh giá governance

## Rule Theo Gate

### Trước Khi Qua `s04 Acceptance + DoR`

`governance_status` của step hiện tại không nên còn `CHECKS_PENDING` nếu:

- acceptance đã được chốt
- work item chuẩn bị sang approach hoặc task planning

Khi exit `s04`, trạng thái chấp nhận được thường là:

- `ALIGNED`
- `WAIVER_APPROVED`
- `BLOCKED`

### Trước Khi Qua `s06 Task Plan`

Nếu task plan chưa cover review, verify, release hoặc mitigation cần thiết, dùng:

- `CHECKS_PENDING` nếu còn đang hoàn thiện trong step
- `BLOCKED` nếu chưa thể đi tiếp

### Khi Đóng `s08 Verify + DoD`

Nếu work item được xem là xong:

- ưu tiên `ALIGNED`
- hoặc `WAIVER_APPROVED` nếu có accepted deviation còn hiệu lực

Nếu không thể kết luận done do governance gap:

- dùng `BLOCKED`

## Trigger Bắt Buộc Mở `governance-exception`

Phải tạo `governance-exception` khi có một trong các trường hợp sau:

- cố ý đi lệch `constitution`, `project-context` hoặc checklist profile
- chấp nhận trade-off làm giảm guard thông thường để đi tiếp
- muốn proceed dù review hoặc evidence chuẩn chưa đủ
- behavior, approach hoặc release path đi ngoài baseline đã chốt
- mitigation bị defer sang step sau nhưng step hiện tại vẫn muốn đóng

## Khi Chưa Cần Mở `governance-exception`

Chưa cần mở exception nếu:

- mới chỉ là câu hỏi mở hoặc policy gap chưa có decision
- đây là blocker đang được xử lý và chưa có quyết định chấp nhận lệch chuẩn
- deviation đã được sửa trọn trong cùng step trước khi ảnh hưởng gate hoặc handoff

Trong các trường hợp này, ưu tiên:

- `governance blocker`
- `open question`
- `CHECKS_PENDING` hoặc `BLOCKED`

## Khi Phải Cập Nhật Exception Register

Phải thêm vào `governance-exception-register.md` nếu:

- exception còn mở quá một step
- exception chạm `release`
- exception chạm `business_acceptance`
- `governance_profile=regulated`
- cần audit lại lịch sử approval hoặc mitigation

## Mapping Nhanh Theo Step

| Step | Quyết định governance tối thiểu |
|---|---|
| `s01 Clarify` | chọn `governance_ref`, profile sơ bộ, status thường là `CHECKS_PENDING` hoặc `ALIGNED` |
| `s02 Business Goal` | xác nhận goal có kéo profile lên mức cao hơn không |
| `s03 Open Questions` | nếu có blocker thì chuyển `BLOCKED`; nếu chỉ đang làm rõ thì giữ `CHECKS_PENDING` |
| `s04 Acceptance + DoR` | phải chốt profile, checklist và không nên để gate ở trạng thái mơ hồ |
| `s05 Technical Approach` | nếu cần lệch chuẩn, mở `governance-exception` ngay tại đây |
| `s06 Task Plan` | bảo đảm plan cover checks, mitigation và reviewer coverage |
| `s07 Implement` | nếu phát sinh deviation mới, cập nhật exception và status ngay trong step |
| `s08 Verify + DoD` | kết luận `ALIGNED`, `WAIVER_APPROVED` hoặc `BLOCKED` một cách minh bạch |

## Quy Tắc Cho Validator Sau Này

Decision model này là nguồn để validator kiểm ít nhất các điều sau:

- note workflow không được thiếu `governance_profile`
- `checklist_refs` phải khớp profile đang chọn
- `governance_status` không được nằm ở state bị cấm theo gate hiện tại
- nếu có `governance-exception`, authority và register phải khớp rule
