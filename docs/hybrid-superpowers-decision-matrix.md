# Hybrid Superpowers Decision Matrix

Tài liệu này là bản quyết định nhanh cho policy hybrid giữa `codex-workflow-chain` và `Superpowers`.

Nếu cần rule đầy đủ, đọc:
- `docs/hybrid-superpowers-policy.md`

Nếu cần contract workflow gốc, đọc:
- `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`

## Mục Tiêu

- quyết định nhanh có bật `TDD`, `worktree`, `subagent`, `review mode` hay không
- giữ cùng một backbone `s01 -> s08`
- tránh tranh luận lại policy mỗi lần mở work item mới

## Cách Dùng

1. Xác định `planning_track`.
2. Xác định `work_item_type`.
3. Xác định change có tạo `behavior production` hay không.
4. Xác định scope có tách ownership rõ hay không.
5. Dùng các bảng dưới đây để bật hoặc tắt capability.

## Matrix A: Gate Trước Khi Chốt Approach

| Điều kiện | Quyết định |
|---|---|
| chưa rõ goal hoặc constraint chính | `BLOCK approach` |
| chưa có `option analysis` ở mức phù hợp | `BLOCK approach` |
| có phương án nhỏ hơn đã là `giải pháp nhỏ nhất đủ đúng` nhưng vẫn chọn phương án lớn hơn không có lý do cụ thể | `BLOCK approach` |
| có nhiều hướng hợp lý nhưng chưa nêu trade-off | `BLOCK approach` |
| hướng khuyến nghị là giải pháp nhỏ nhất đủ đúng trong scope hiện tại | `ALLOW approach` |
| `quick` và đã có 1 hướng chính + 1 hướng bị loại ngắn gọn | `ALLOW approach` |
| `full/enterprise` và đã có `option analysis` + recommendation rõ | `ALLOW approach` |

Rule chốt:

- không nhảy thẳng vào technical approach theo cảm tính
- nếu chưa đủ dữ liệu để brainstorm, quay lại `s03`
- brainstorming ngắn được phép; brainstorming bị bỏ hẳn thì không được phép
- nếu một phương án nhỏ hơn đã là `giải pháp nhỏ nhất đủ đúng`, không mở rộng design chỉ vì nhu cầu giả định

## Matrix B: Gate Trước Khi Code

| Điều kiện | Quyết định |
|---|---|
| `s04` chưa có acceptance criteria hoặc `DoR` chưa rõ | `BLOCK code` |
| `s05` chưa có technical approach tối thiểu | `BLOCK code` |
| `s06` chưa có task plan tối thiểu | `BLOCK code` |
| `s06` chưa rõ phần chạm chính hoặc `owned_scope` | `BLOCK code` |
| `s06` chưa rõ thứ tự thực hiện hoặc dependency | `BLOCK code` |
| `s06` còn placeholder hoặc chưa có verify path đủ dùng | `BLOCK code` |
| `quick` nhưng đã có `s04-s06` ở mức ngắn gọn | `ALLOW code` |
| `SDD` mà spec chưa `approved|frozen` | `BLOCK code` |
| có `spec-change` hoặc `governance-exception` hợp lệ cho trường hợp khẩn cấp | `ALLOW code with exception path` |

Rule chốt:

- không nhảy thẳng từ clarify sang implement
- `s04 -> s05 -> s06 -> s07` là đường vào code chuẩn
- change nhỏ chỉ được rút gọn artifact, không được bỏ hẳn design hoặc task plan
- task plan thiếu phần chạm chính, thiếu thứ tự/dependency, có placeholder hoặc thiếu verify path thì xem như chưa đủ điều kiện

## Matrix 1: Chọn Baseline Theo Track

| Tín hiệu | Chọn track |
|---|---|
| một boundary chính, scope nhỏ, review nhẹ | `quick` |
| feature hoặc change thông thường, có vài task và cần verify rõ | `full` |
| nhiều boundary, nhiều role, release risk, verify độc lập | `enterprise` |

## Matrix 2: Capability Baseline Theo Track

| Track | Brainstorming | Writing plans | Worktree | TDD | Review | Subagent |
|---|---|---|---|---|---|---|
| `quick` | `light` | `light` | `optional` | `required` nếu đổi behavior | `self` + final review khi cần | `off` mặc định |
| `full` | `standard` | `standard` | `recommended` | `required` nếu đổi behavior | `targeted` theo batch hoặc task rủi ro | `optional` |
| `enterprise` | `standard` | `strict` | `mandatory` | `required` nếu đổi behavior | `independent` | `conditional` |

## Matrix 3: Quyết Định TDD

| Điều kiện | Quyết định |
|---|---|
| sửa bug behavior | `MUST use TDD` |
| thêm feature behavior production | `MUST use TDD` |
| đổi validation rule hoặc contract | `MUST use TDD` |
| refactor có regression risk đáng kể | `MUST use TDD` |
| chỉ sửa docs | `DO NOT require TDD` |
| chỉ rename, format hoặc metadata | `DO NOT require TDD` |
| chỉ đổi artifact workflow | `DO NOT require TDD` |

Rule chốt:

- nếu strict `TDD` bị chặn, phải ghi lý do và `verify path` thay thế trong implementation note
- `TDD` nghĩa là có test fail trước rồi mới viết code pass

## Matrix 4: Quyết Định Worktree

| Tín hiệu | Quyết định |
|---|---|
| `enterprise` track | `MUST use worktree` |
| change lớn hoặc rủi ro | `SHOULD use worktree` |
| bug nhỏ, quick fix, ít file, xong trong một session | `MAY skip worktree` |

Rule chốt:

- `change lớn hoặc rủi ro` gồm tối thiểu: kéo dài hơn một session, chạm nhiều boundary hoặc nhiều file với conflict risk đáng kể, hoặc merge/branch/release risk cao
- nếu change đã thuộc nhóm nên hoặc phải dùng `worktree` mà vẫn bỏ qua, phải có lý do rõ
- `worktree` không thay cho review hoặc verify
- nếu đã dùng `branch/worktree`, quyết định `cleanup`, `close`, `remove` hoặc `merge` chỉ hợp lệ sau khi `s08` có verdict `DoD` rõ

## Matrix 5: Quyết Định Review Mode

| Tín hiệu | Review mode |
|---|---|
| `quick` và low risk | `self review` + ít nhất 1 review trước khi rời `s07` |
| `full` và medium risk | `targeted review` theo batch |
| logic quan trọng, contract quan trọng, diff khó đọc | `targeted review` bắt buộc |
| phần chính trong `enterprise` | `independent review` theo hai tầng |
| `enterprise` hoặc release risk cao | `independent review` |
| verification owner tách biệt | `independent review` ưu tiên |

Thứ tự review mặc định:

1. `spec compliance`
2. `code quality`

Rule chốt:

- không dồn toàn bộ review sang `s08`
- `full` và `enterprise` phải review sớm cho batch/task rủi ro hoặc phần quan trọng trong `s07`
- mọi review trong `s07` phải đi theo thứ tự `spec compliance -> code quality`
- review không thay cho `testing` hoặc `verify`

## Matrix 5B: Quyết Định Task Plan Đã Đủ Execution-Oriented Chưa

| Điều kiện | Quyết định |
|---|---|
| chưa rõ phần chạm chính hoặc `owned_scope` | `NOT READY` |
| chưa có thứ tự thực hiện hoặc dependency rõ | `NOT READY` |
| chưa có `verify path` đủ dùng | `NOT READY` |
| có placeholder như `xử lý edge case`, `thêm validation`, `viết test` mà không cụ thể | `NOT READY` |
| `quick` nhưng đã có phần chạm chính hoặc `owned_scope` + thứ tự ngắn + verify chính | `READY` |
| `full/enterprise` và đã có file/path chính hoặc `owned_scope` + thứ tự/dependency + verify path + checkpoint khi cần | `READY` |

Rule chốt:

- plan phải đủ để implementer không cần tự phát minh lại design
- nếu scope yêu cầu review/governance checkpoint mà plan không nêu ra, vẫn xem là `NOT READY`
- `writing-plans` trong hybrid này ưu tiên tính executable, không bắt buộc nhét full code vào plan

## Matrix 6: Quyết Định Subagent

| Điều kiện | Quyết định |
|---|---|
| task plan chưa rõ | `DO NOT use subagent` |
| `owned_paths` hoặc `owned_scope` chồng lấn mạnh | `DO NOT use subagent` |
| verification owner chưa rõ | `DO NOT use subagent` |
| `merge path` hoặc handoff path chưa rõ | `DO NOT use subagent` |
| task nhỏ và tightly coupled | `DO NOT use subagent` |
| task là `task độc lập` | `MAY use subagent` |
| `enterprise` và multi-boundary nhưng vẫn tách được `task độc lập` | `MAY use subagent` |

Rule chốt:

- `agentic` vẫn là mode mặc định
- chỉ bật subagent sau `s06`
- chỉ bật subagent cho `task độc lập`
- subagent không được bypass `review` hoặc `verify`

## Matrix 7: Quyết Định Theo Work Item Type

| `work_item_type` | TDD | Worktree | Review | Subagent |
|---|---|---|---|---|
| `BUG` | `MUST` nếu fix behavior | `optional` đến `mandatory` theo track | `required` | `optional` |
| `FEATURE` | `MUST` nếu có behavior | `recommended` | `required` | `optional` hoặc `conditional` |
| `CHANGE` | `MUST` nếu đổi contract hoặc behavior | `recommended` | `required` | `optional` |
| `REFACTOR` | `MUST` nếu regression risk đáng kể | `optional` hoặc `recommended` | `required` | `optional` |
| `RESEARCH` | `not required` | `not required` trừ khi có prototype riêng | `optional` | `off` mặc định |

## Matrix 8: Quyết Định Theo Step

| Step | Capability từ Superpowers được bật | Mức mặc định |
|---|---|---|
| `s01` | `brainstorming` style question forcing | `ON` |
| `s02` | trình bày business intent gọn, dễ approve | `ON` |
| `s03` | question forcing cho blocker và assumption | `ON`; thiếu dữ liệu thì block `s05` |
| `s04` | `spec approved before code` mindset | `ON`, nhưng gate thật là `DoR` |
| `s05` | option thinking, `YAGNI/DRY`, giải pháp nhỏ nhất đủ đúng, disciplined brainstorming | `ON` và là gate chất lượng |
| `s06` | `writing-plans` style | `ON` từ `full`, `light` ở `quick` |
| `s07` | `worktree`, `TDD`, `subagent`, `requesting-code-review` | `ON` theo signal |
| `s08` | `finishing-a-development-branch` mindset | `ON`, nhưng verdict thật là `DoD` |

## Công Thức Nhanh

| Nếu | Thì |
|---|---|
| chưa có `option analysis` đủ dùng | không chốt `s05` |
| có phương án nhỏ hơn đã là `giải pháp nhỏ nhất đủ đúng` | chọn phương án nhỏ hơn |
| task plan chưa execution-oriented | không vào `s07` |
| chưa có `s04-s06` | không vào `s07` |
| có behavior change | bật `TDD` |
| có `change lớn hoặc rủi ro` | bật `worktree` |
| task là `task độc lập` | cân nhắc `subagent` |
| có batch/task rủi ro hoặc diff quan trọng | review sớm trong `s07` |
| bắt đầu review trong `s07` | kiểm `spec compliance` trước rồi mới `code quality` |
| diff quan trọng hoặc release risk cao | nâng `review mode` |
| chưa qua `s08` | không tuyên bố `done` |
| dùng `branch/worktree` và `s08` chưa có verdict `DoD` rõ | chưa cleanup/close/merge |

## Default An Toàn

| Trường hợp | Default an toàn |
|---|---|
| không chắc gate đã qua chưa | xem như chưa qua gate và quay lại step tương ứng |
| không chắc có cần subagent không | `không dùng` |
| không chắc có cần mở boundary hoặc abstraction mới không | `không mở nếu đường hiện có vẫn đủ đáp ứng` |
| không chắc có cần worktree không | `dùng nếu change có dấu hiệu của change lớn hoặc rủi ro` |
| không chắc có cần TDD không | `dùng nếu behavior production bị tác động` |
| không chắc review mức nào | bắt đầu bằng `targeted review` |
| không chắc track nào | chọn `full` |

## Phản Mẫu

- dùng `review pass` thay cho `DoD`
- chốt technical approach theo cảm tính mà không có `option analysis`
- mở abstraction, service hoặc boundary mới chỉ để đón trước nhu cầu giả định
- nhảy từ `s01-s03` sang code mà không có `s04-s06`
- dùng task plan toàn placeholder rồi vẫn vào implement
- dồn toàn bộ review sang `s08`
- review `code quality` trước khi chốt `spec compliance`
- viết xong code rồi mới thêm test nhưng vẫn gọi là `TDD`
- bật subagent cho task không độc lập hoặc chồng lấn ownership
- tự tuyên bố `done` trước khi `s08` có verdict `DoD`
- cleanup, close hoặc merge `branch/worktree` trước khi `s08` có verdict `DoD` rõ
- dùng `quick` cho change có nhiều boundary hoặc release risk
- bỏ qua `worktree` trong `enterprise` mà không có lý do

## Kết Luận Thao Tác

Mặc định thực dụng:

- bắt đầu với `full`
- nếu không chắc gate đã qua chưa thì coi như chưa qua gate
- bật `TDD` nếu behavior bị tác động
- bật `worktree` nếu change thuộc nhóm `change lớn hoặc rủi ro`
- chỉ bật `subagent` khi `s06` đủ tốt
- giữ `DoR` ở `s04` và `DoD` ở `s08` làm gate thật
