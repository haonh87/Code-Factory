# Hybrid Policy: Codex Workflow Chain + Superpowers

Tài liệu này định nghĩa chính sách hybrid giữa workflow backbone của repo và execution discipline của `obra/superpowers`.

Thời điểm đối chiếu: `2026-04-18`.

Nếu cần bản quyết định nhanh để chọn `TDD`, `worktree`, `subagent` và `review mode`, đọc thêm:
- `docs/hybrid-superpowers-decision-matrix.md`

## Mục Tiêu

- giữ `codex-workflow-chain` làm source-of-truth cho delivery
- mượn các phần mạnh nhất của Superpowers ở tầng execution
- tránh trộn hai workflow như hai hệ ngang hàng
- tăng chất lượng implement mà không làm mất `governance`, `DoR`, `DoD`, `SDD` và `work-item protocol`

## Mô Hình Prompt Nhiều Khối

Mô hình hybrid hiện tại nên được triển khai theo nhiều khối prompt, không dồn mọi rule vào một file duy nhất.

- `Authority layer`: `AGENTS.global.md`
- `Entry router`: skill `workflow-governance-router`
- `Workflow backbone`: skill `codex-workflow-chain`
- `Step skills`: các skill trong `analysis`, `architecture`, `delivery`, `guardrails`, `obsidian`
- `Runtime enforcement`: `workflow-bundle`, validator, capability control và support policies

Quy tắc đọc:

- `Authority layer` chốt rule cứng, conflict resolution và default an toàn.
- `Entry router` là block phải chạy trước để quyết định current step, delivery context, missing gates và quyền implement.
- `Workflow backbone` giữ state machine `s01 -> s08`; không cho phép entry router hay step skill tự tạo workflow riêng.
- `Step skills` chỉ được bật sau khi entry router đã route đúng step.
- `Runtime enforcement` giữ vai trò evidence và capability control; không thay governance prompt nhưng là lớp cưỡng chế thực thi.

## Vị Trí Của Tài Liệu Này

Tài liệu này là `supplemental policy`.

- không thay `policies/codex/AGENTS.global.md`
- không thay `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`
- không thay `project-context/` hoặc `work-item protocol`
- chỉ trả lời câu hỏi: khi dùng workflow của repo, thì phần nào của Superpowers được phép bật, bật ở step nào, và ở mức nào

## Rule Nền

1. Workflow chính luôn là:
   `s01 Clarify -> s02 Business Goal -> s03 Open Questions -> s04 Acceptance + DoR -> s05 Technical Approach -> s06 Task Plan -> s07 Implement -> s08 Verify + DoD`
2. `Superpowers` chỉ được dùng như `execution pack`, không được thay backbone 8 bước.
3. Không được dùng `Superpowers` để bypass `s04` hoặc `s08`.
4. `Spec/design before code` là gate cứng:
   không được vào `s07` trước khi `s04`, `s05`, `s06` đã đủ điều kiện.
5. `Brainstorming có kỷ luật` là gate chất lượng của `s05`:
   không được chốt approach nếu chưa có `option analysis` ở mức phù hợp.
6. `Ưu tiên giải pháp nhỏ nhất đủ đúng` là rule chọn approach của `s05`:
   nếu một phương án nhỏ hơn đã là `giải pháp nhỏ nhất đủ đúng`, không chọn phương án lớn hơn chỉ vì nhu cầu giả định.
7. `Planning execution-oriented` là gate chất lượng của `s06`:
   không được vào implement với task plan còn mơ hồ hoặc đầy placeholder.
8. `TDD cho behavior change` là rule thực thi của `s07`:
   bug fix, feature behavior, validation rule, contract change và refactor có regression risk phải ưu tiên test trước rồi mới code.
9. `Worktree cho change lớn hoặc rủi ro` là rule cô lập workspace của `s07`:
   `enterprise`, change kéo dài, nhiều boundary/file hoặc risk cao phải ưu tiên tách workspace.
10. `Review sớm, không đợi cuối` là rule review của `s07`:
   review cho batch/task rủi ro hoặc phần quan trọng phải diễn ra trong implement, không được dồn hết sang `s08`.
11. `Review hai tầng` là rule thứ tự review của `s07`:
   review phải kiểm `spec compliance` trước, rồi mới tới `code quality`.
12. `Subagent chỉ cho task độc lập` là rule delegation của `s07`:
   chỉ tách worker khi task plan, ownership, merge path và verify path đủ rõ.
13. `Không tự tuyên bố done` là rule kết luận của `s08`:
   chưa có verdict `DoD` thì chưa được coi là hoàn tất, dù implementation hay review đã xong.
14. `Branch/worktree chỉ chốt sau verify` là rule kết thúc execution của `s08`:
   cleanup, close, remove hoặc merge chỉ hợp lệ sau verdict `DoD` rõ ở `s08`.
15. `Default an toàn` là rule fallback của workflow:
   khi chưa đủ chắc chắn, chọn `full`, không bật `subagent` bừa, không mở boundary mới bừa và không coi gate là đã qua.
16. `governance`, `SDD`, `work-item protocol`, `planning_track` và `verification_owner` vẫn theo rule của repo này.
17. Nếu có xung đột giữa policy này và policy nền của repo, ưu tiên policy nền của repo.

## Thành Phần Được Import Từ Superpowers

Các phần dưới đây được phép dùng trong mô hình hybrid:

- `brainstorming`
- `writing-plans`
- `using-git-worktrees`
- `test-driven-development`
- `subagent-driven-development`
- `requesting-code-review`
- `finishing-a-development-branch`

Các phần này được hiểu như sau:

- `brainstorming`: pattern đặt câu hỏi và ép rõ solution trước khi code
- `writing-plans`: pattern viết task plan execution-oriented
- `using-git-worktrees`: pattern cô lập workspace cho change có rủi ro hoặc thời lượng dài
- `test-driven-development`: pattern `Red -> Green -> Refactor`
- `subagent-driven-development`: pattern giao worker theo task độc lập
- `requesting-code-review`: pattern review sớm, review nhiều vòng
- `finishing-a-development-branch`: pattern chốt branch sau verify

## Phần Không Import Nguyên Xi

Các rule dưới đây không được bê nguyên từ Superpowers:

- không biến `brainstorming` thành workflow thay cho `s01-s05`
- không bắt mọi work item phải dùng `worktree`
- không bắt mọi task đều phải có subagent riêng
- không áp `TDD` như luật tuyệt đối cho `docs-only`, `config-only` hoặc change không tạo behavior production
- không thay `DoD` bằng việc review pass

## Ma Trận Hybrid Theo Planning Track

| Track | Brainstorming style | Writing-plans style | Worktree | TDD | Subagent per task | Review mode |
|---|---|---|---|---|---|---|
| `quick` | `lightweight` | `lightweight` | `optional` | `required` cho behavior change | `off` mặc định | `self` + ít nhất 1 review trước khi rời `s07` |
| `full` | `standard` | `standard` | `recommended` | `required` cho behavior change | `optional` khi task độc lập | review theo batch hoặc task rủi ro |
| `enterprise` | `standard` | `strict` | `mandatory` | `required` cho behavior change | `conditional` nhưng phải có ownership rõ | `independent` và verify owner rõ |

Quy tắc đọc bảng:

- `lightweight`: áp dụng tinh thần, không mở pha riêng hoặc artifact riêng nếu không cần
- `standard`: áp dụng rõ ở step tương ứng và phản ánh vào artifact của step
- `strict`: áp dụng như gate bắt buộc trước khi sang step sau
- `conditional`: chỉ bật khi thỏa entry condition của execution runtime

## Gate Vào Code

Muốn bắt đầu `s07 Implement`, tối thiểu phải thỏa cả 3 điều kiện:

- `s04` có acceptance criteria đo được và `DoR` rõ
- `s05` có technical approach đủ khóa boundary và validation plan
- `s06` có task plan đủ để biết thứ tự thực hiện và verify path

Rule theo track:

- `quick`: cho phép artifact ngắn hơn, nhưng không được bỏ `s05` hoặc `s06`
- `full`: phải có design và task plan viết rõ trong artifact step tương ứng
- `enterprise`: xem đây là gate cứng; nếu thiếu một trong ba, execution phải bị chặn

Rule theo SDD:

- nếu work item chạy theo `SDD`, code chỉ được bắt đầu khi `spec` ở trạng thái `approved|frozen`
- nếu behavior cần lệch spec, phải mở `spec-change` hoặc `governance-exception` trước khi implement

Exception path:

- chỉ dùng khi có lý do khẩn cấp thật
- phải ghi exception hoặc waiver đúng rule của repo
- không được bỏ qua im lặng rồi backfill tài liệu như thể chưa từng lệch chuẩn

## Gate Của Brainstorming

Muốn chốt `s05 Technical Approach`, tối thiểu phải thỏa:

- mục tiêu cần giải quyết đã rõ
- đã có `option analysis` ở mức phù hợp
- đã có 1 hướng khuyến nghị, và đó là giải pháp nhỏ nhất đủ đúng trong scope hiện tại
- đã nêu điều cần kiểm chứng trước hoặc trong implement

Rule theo track:

- `quick`: cho phép brainstorming ngắn, nhưng vẫn phải nêu ít nhất 1 hướng thay thế hoặc hướng bị loại
- `full`: nên có ít nhất 2 phương án rõ ràng nếu bài toán không hiển nhiên
- `enterprise`: xem brainstorming là gate cứng của `s05`; thiếu `option analysis` thì không chốt approach

Nếu chưa đủ dữ liệu:

- quay lại `s03 Open Questions`
- không ép chọn approach chỉ để đi tiếp
- không mở rộng design chỉ vì nhu cầu giả định trong tương lai

## Gate Của Task Plan

Muốn bắt đầu `s07 Implement`, `s06 Task Plan` tối thiểu phải thỏa:

- đã nêu phần chạm chính hoặc `owned_scope`
- đã có thứ tự thực hiện hoặc dependency rõ
- đã có `verify path` đủ dùng cho từng task hoặc từng batch
- đã có checkpoint review hoặc governance khi scope yêu cầu

Rule theo track:

- `quick`: task plan có thể ngắn, nhưng vẫn phải nêu phần chạm chính hoặc `owned_scope`, thứ tự ngắn và cách verify chính; thêm checkpoint review/governance nếu scope yêu cầu
- `full`: nên có file/path chính hoặc `owned_scope`, task nhỏ, rõ thứ tự hoặc dependency và `verify path` rõ
- `enterprise`: xem task plan execution-oriented là gate cứng; thiếu phần chạm chính, thứ tự/dependency, `verify path` hoặc checkpoint bắt buộc thì không vào implement

Không chấp nhận placeholder như:

- `xử lý edge case`
- `thêm validation phù hợp`
- `viết test`
- `sửa phần liên quan`

nếu không nói rõ sẽ chạm đâu và kiểm thế nào

## Ma Trận Hybrid Theo Loại Work Item

| `work_item_type` | TDD | Worktree | Review sớm | Subagent |
|---|---|---|---|---|
| `BUG` | `required` nếu fix behavior | `optional` cho quick, `recommended` cho full, `mandatory` cho enterprise | `required` | `optional` |
| `FEATURE` | `required` nếu thêm behavior production | `recommended` | `required` | `optional` hoặc `conditional` |
| `CHANGE` | `required` nếu đổi contract hoặc behavior | `recommended` | `required` | `optional` |
| `REFACTOR` | `required` nếu có regression risk đáng kể | `optional` hoặc `recommended` tùy scope | `required` | `optional` |
| `RESEARCH` | `not_required` | `not_required` trừ khi có prototype riêng | `optional` | `off` mặc định |

## Policy Theo Step

### `s01 Clarify`

Mục tiêu hybrid:

- dùng cách hỏi của `brainstorming` để ép rõ yêu cầu, scope và constraint
- không mở design dài dòng nếu request rất nhỏ

Rule:

- `MUST`: làm rõ yêu cầu theo style hỏi-vặn của `brainstorming`
- `MUST NOT`: viết code hoặc mở implement path ở step này
- `SHOULD`: ghi rõ boundary nào chưa rõ và cần chuyển sang `s03`

### `s02 Business Goal`

Mục tiêu hybrid:

- giữ business intent ngắn, dễ duyệt
- tránh để discussion kỹ thuật nuốt mất mục tiêu business

Rule:

- `MUST`: chốt giá trị người dùng, success metric và non-goals
- `SHOULD`: trình bày ngắn, đọc nhanh, dễ approve
- `MUST NOT`: biến step này thành technical approach

### `s03 Open Questions`

Mục tiêu hybrid:

- dùng tinh thần `brainstorming` để bóc blocker thật
- không cho phép agent đoán phần chưa rõ

Rule:

- `MUST`: mỗi open question trọng yếu phải có owner hoặc hướng xử lý
- `MUST`: policy gap hoặc governance blocker phải được nêu rõ
- `MUST NOT`: sang `s05` nếu blocker trọng yếu chưa có owner hoặc assumption được chấp nhận

### `s04 Acceptance + DoR`

Đây là gate quan trọng nhất trong mô hình hybrid.

Rule:

- `MUST`: chốt acceptance criteria đo được
- `MUST`: chốt `DoR`
- `MUST`: phản ánh `governance checks` và `spec-freeze` nếu có `SDD`
- `MUST NOT`: vào `s07` khi `s04` chưa ra verdict `DoR` rõ
- `MUST NOT`: coi `s04` là đủ để code nếu `s05` và `s06` chưa có artifact tối thiểu

Hybrid import:

- dùng tinh thần Superpowers là `spec/design must be approved before code`
- nhưng gate chính thức vẫn là `DoR` của workflow này, không phải chỉ là một lần user nói "go"

### `s05 Technical Approach`

Mục tiêu hybrid:

- mượn `brainstorming` để so option và giữ `YAGNI/DRY`
- không over-engineer trước `s06`

Rule:

- `MUST`: nêu option và trade-off khi có hơn một hướng hợp lý
- `MUST`: chốt boundary bị tác động và validation plan
- `MUST`: ưu tiên giải pháp nhỏ nhất đủ đúng trong scope hiện tại; nếu chọn phương án lớn hơn, nêu rõ vì sao phương án nhỏ hơn không đủ
- `MUST NOT`: nhảy sang code chi tiết production ở step này
- `MUST`: để lại design đủ rõ để `s06` chia task và `s07` implement mà không phải tự đoán
- `MUST NOT`: chốt approach chỉ theo cảm tính hoặc “quen tay”
- `MUST NOT`: mở abstraction hoặc boundary mới chỉ để đón trước nhu cầu giả định
- `MUST`: nếu hướng làm gần như hiển nhiên, vẫn phải nêu ít nhất 1 hướng thay thế hoặc hướng bị loại ở mức ngắn gọn

### `s06 Task Plan`

Đây là step import mạnh nhất từ `writing-plans`.

Rule nền:

- `MUST`: task trace được về requirement hoặc AC
- `MUST`: nêu phần chạm chính hoặc `owned_scope` khi có thể xác định
- `MUST`: có thứ tự thực hiện hoặc dependency rõ
- `MUST`: có verify path
- `MUST`: có checkpoint review khi scope cần
- `MUST`: đủ rõ để `s07` không cần tự phát minh lại design
- `MUST NOT`: dùng placeholder mà implementer phải tự đoán lại hành động cụ thể

Rule hybrid:

- `quick`:
  plan có thể ngắn nhưng vẫn phải nêu phần chạm chính hoặc `owned_scope`, thứ tự ngắn và cách verify chính
- `full`:
  task nên nhỏ, rõ file/path chính hoặc `owned_scope`, rõ thứ tự/dependency và rõ verify path
- `enterprise`:
  task plan phải execution-oriented, rõ ownership, rõ thứ tự/dependency, rõ verify owner và rõ review checkpoint

Khi dùng `writing-plans` style:

- `SHOULD`: nêu file tạo mới và file sửa
- `SHOULD`: nêu command verify chính
- `SHOULD`: chia task thành đơn vị đủ nhỏ để review được
- `MUST NOT`: viết plan kiểu placeholder như `thêm validate phù hợp`, `xử lý edge case`, `viết test`

### `s07 Implement`

Đây là step import mạnh nhất từ Superpowers execution pack.

Entry gate của `s07`:

- `MUST`: chỉ bắt đầu khi `s04`, `s05`, `s06` đã có output tối thiểu theo rule ở trên
- `MUST NOT`: dùng lý do "change nhỏ" để bỏ qua hoàn toàn design hoặc task plan
- `MAY`: giữ design và task plan rất ngắn cho `quick`, nhưng vẫn phải hiện diện và đủ dùng

Các capability có thể bật:

- `using-git-worktrees`
- `test-driven-development`
- `subagent-driven-development`
- `requesting-code-review`

#### Rule Worktree

- `enterprise`: `MUST` dùng `worktree`
- `full`: `SHOULD` dùng `worktree` cho `change lớn hoặc rủi ro`
- `quick`: `MAY` bỏ qua `worktree` nếu change nhỏ, ít file, xong trong một session và conflict risk thấp
- nếu change đã thuộc nhóm nên hoặc phải dùng `worktree` mà vẫn không dùng, implementation note phải nêu rõ lý do
- `worktree` không thay cho review, verify hay `DoD`

#### Rule TDD

`TDD` là rule bắt buộc khi:

- thêm feature behavior production
- sửa bug behavior
- đổi contract hoặc validation rule
- refactor có regression risk đáng kể

`TDD` không bắt buộc khi:

- chỉ sửa docs
- chỉ rename hoặc reformat không đổi behavior
- chỉ thay metadata hoặc artifact workflow

Nếu strict `TDD` bị chặn bởi legacy, harness hoặc môi trường test, implementation note phải nêu lý do và `verify path` thay thế.

#### Rule Subagent

- chỉ bật `subagent-driven-development` sau khi đã có `s06` đủ rõ
- chỉ bật cho `task độc lập`
- `task độc lập` tối thiểu phải có `owned_scope` hoặc `owned_paths` tương đối rời nhau, `merge path` rõ và `verify path` hoặc `verification_owner` rõ
- không bật cho task nhỏ, tightly coupled, vừa khám phá context xong hoặc chồng lấn ownership mạnh

#### Rule Review Trong `s07`

- `quick`: có ít nhất một lượt review cho phần implement trước khi rời `s07`
- `full`: review sớm sau mỗi batch logic hoặc task rủi ro, không đợi dồn sang `s08`
- `enterprise`: review sớm hai tầng cho các phần chính trong `s07`

Thứ tự review bắt buộc:

1. `spec compliance`
2. `code quality`

Không được coi `review` là thay thế cho `testing`.

### `s08 Verify + DoD`

Mục tiêu hybrid:

- giữ `DoD` và `governance compliance` của repo
- mượn tinh thần `finishing-a-development-branch` để chỉ đóng khi evidence đủ

Rule:

- `MUST`: đối chiếu implementation với AC, spec, checklist và review findings
- `MUST`: nêu rõ test nào đã chạy, scan nào đã chạy, review nào đã qua
- `MUST`: kết luận `DoD` rõ ràng
- `MUST`: chỉ tuyên bố `done` sau khi `DoD` đã được kết luận
- `MUST`: nếu dùng `branch` hoặc `worktree`, chỉ chốt `cleanup`, `close`, `remove` hoặc `merge` sau khi `s08` có verdict `DoD` rõ
- `MUST NOT`: tự tuyên bố `done` chỉ vì `review pass`, `test pass` cục bộ, `code xong`, `merge xong` hoặc `worktree` đã sạch
- `MUST NOT`: coi `branch` sạch, `worktree` sạch hoặc diff đã review là tín hiệu đủ để chốt sớm
- `enterprise`: cần verify owner hoặc audit path độc lập

## Default An Toàn

- nếu không chắc `planning_track` nào: chọn `full`
- nếu không chắc gate đã qua chưa: coi như chưa qua gate
- nếu không chắc có cần `subagent`: không dùng
- nếu không chắc có cần mở boundary, abstraction hoặc service mới: không mở nếu đường hiện có vẫn đủ đáp ứng
- nếu không chắc có cần `worktree`: dùng nếu change có dấu hiệu của `change lớn hoặc rủi ro`
- nếu không chắc có cần `TDD`: dùng nếu behavior production bị tác động
- nếu không chắc review mức nào: bắt đầu bằng `targeted review`
- `default an toàn` là fallback rule, không phải lý do để bỏ qua `DoR`, `DoD`, `review`, `verify` hay `governance`

## Rule TDD Chi Tiết

Chu kỳ chuẩn:

1. viết test cho behavior cần có
2. chạy để thấy test fail đúng lý do
3. viết code tối thiểu để pass
4. chạy lại test để thấy pass
5. refactor khi cần

Rule áp dụng:

- `MUST`: với bug fix, test phải tái hiện bug trước khi fix
- `MUST`: với feature behavior, test phải mô tả behavior mong muốn trước khi implement
- `MUST`: với validation rule hoặc contract change, test phải khóa behavior hoặc contract mong muốn trước khi implement
- `MUST`: với refactor có regression risk đáng kể, test phải khóa behavior cần giữ trước khi đổi cấu trúc
- `MUST`: nếu strict `TDD` bị chặn, implementation note phải nêu lý do và `verify path` thay thế
- `SHOULD`: dùng test gần behavior thật, tránh mock quá mức
- `MUST NOT`: viết xong production code rồi mới thêm test mà vẫn gọi đó là `TDD`

## Rule Review Chi Tiết

Review được chia thành 3 mức:

- `self review`: implementer tự kiểm trước khi handoff
- `targeted review`: review cho task hoặc batch cụ thể
- `independent review`: review bởi owner khác hoặc verification owner

Mapping theo track:

- `quick`: `self review` + final targeted review khi cần
- `full`: `self review` + targeted review theo batch hoặc task rủi ro
- `enterprise`: `self review` + independent review cho các phần chính

Rule chốt:

- không dồn toàn bộ review sang `s08`
- review sớm ưu tiên cho batch, task rủi ro và phần logic/contract quan trọng
- mọi review trong `s07` phải đi theo thứ tự `spec compliance -> code quality`
- `s08` vẫn là step kết luận verify cuối, không phải nơi thay thế toàn bộ review bị bỏ qua trong `s07`

Mức nghiêm trọng:

- `critical`: phải fix trước khi đi tiếp
- `important`: phải fix hoặc có chấp thuận rõ trước khi đi tiếp
- `minor`: có thể note lại nhưng không được che giấu

## Rule Subagent Và Execution Topology

`Superpowers` thiên về `fresh subagent per task`.
Hybrid policy này không mặc định như vậy.

Rule:

- `agentic` vẫn là mode mặc định
- chỉ nâng lên `multi_agent` hoặc pattern subagent theo task khi task là `task độc lập`
- nếu không đạt các điều kiện trên, fallback về `agentic` hoặc `sequential_multi_role`

## Rule Command Và Artifact

Policy này không tạo command mới.

Source-of-truth artifact vẫn là:

- `work-items/`
- `changes/`
- `product-specs/`
- `project-context/`

Nếu dùng pattern từ Superpowers:

- mọi kết luận chính thức vẫn phải quay về artifact chuẩn của workflow hiện tại
- không dùng `docs/superpowers/...` làm nguồn sự thật chính trong repo này

## Rule Cấm

- không bypass `s04` để vào implement
- không bypass `s08` để tự tuyên bố done
- không dùng `review passed` thay cho `DoD`
- không dùng `TDD` như khẩu hiệu nếu không có test fail trước
- không bật subagent chỉ vì muốn song song hóa
- không để rule của Superpowers ghi đè `governance`, `work-item protocol` hoặc `planning_track`

## Preset Khuyến Nghị

### Preset `quick`

- giữ backbone của repo
- mượn `brainstorming` nhẹ ở `s01-s05`
- mượn `TDD` ở `s07` nếu change có behavior
- có ít nhất một lượt review trong `s07`
- không mặc định dùng worktree hoặc subagent

### Preset `full`

- giữ backbone của repo
- dùng `writing-plans` rõ hơn ở `s06`
- dùng `TDD` ở `s07` cho behavior change
- review theo batch hoặc task rủi ro
- dùng `worktree` khi change lớn hoặc rủi ro

### Preset `enterprise`

- giữ nguyên governance/protocol/signoff của repo
- dùng `writing-plans` strict ở `s06`
- worktree là mặc định
- review độc lập ở `s07-s08`
- chỉ bật subagent khi task là `task độc lập`

## Công Thức Nhớ Nhanh

- repo này giữ `backbone + governance + source-of-truth`
- Superpowers tăng lực ở `planning + implementation + review discipline`
- `DoR` quyết định khi nào được code
- `DoD` quyết định khi nào được đóng

## Tài Liệu Liên Quan

- `policies/codex/AGENTS.global.md`
- `docs/hybrid-superpowers-decision-matrix.md`
- `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`
- `skills/orchestration/codex-workflow-chain/references/execution-runtime.md`
- `skills/orchestration/codex-workflow-chain/references/adaptive-planning.md`
- `skills/orchestration/codex-workflow-chain/references/work-item-protocol.md`
