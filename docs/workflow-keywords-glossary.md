# Từ Điển Thuật Ngữ Workflow

Tài liệu này giải thích ngữ nghĩa của các keyword chính trong workflow hiện tại.

Mục tiêu:

- có một chỗ tra cứu tập trung cho keyword và thuật ngữ hay lặp lại
- giảm tình trạng mỗi tài liệu giải thích một kiểu
- giúp người đọc hiểu keyword theo đúng ngữ cảnh workflow của repo

Thời điểm đối chiếu: `2026-04-18`.

## Cách Đọc

- Mỗi keyword được giải thích theo 3 ý:
  - `nghĩa`: keyword này dùng để chỉ điều gì
  - `không nên hiểu là`: ranh giới để tránh hiểu sai
  - `dùng ở đâu`: vị trí keyword thường xuất hiện trong workflow

## Thuật Ngữ Backbone

| Keyword | Nghĩa | Không nên hiểu là | Dùng ở đâu |
|---|---|---|---|
| `Clarify` | bước làm rõ yêu cầu, scope draft, context, risk ban đầu | không phải bước code hay design chi tiết | `s01` |
| `Business Goal` | bước chốt giá trị business, KPI, non-goals | không phải technical approach | `s02` |
| `Open Questions` | bước gom blocker, assumption, conflict, missing input | không phải nơi ép chọn giải pháp khi còn thiếu dữ liệu | `s03` |
| `Acceptance + DoR` | bước chốt acceptance criteria và readiness | không phải chỉ là checklist hình thức | `s04` |
| `Technical Approach` | bước chốt hướng kỹ thuật sẽ làm | không phải brainstorming thô, cũng không phải implementation | `s05` |
| `Task Plan` | bước bẻ approach thành task có thứ tự và verify path | không phải danh sách việc mơ hồ kiểu TODO | `s06` |
| `Implement` | bước tạo thay đổi thật trong code/config/doc | không được bắt đầu khi design chưa đủ điều kiện | `s07` |
| `Verify + DoD` | bước kết luận evidence, compliance và completion | không phải chỉ là “test pass là xong” | `s08` |

## Thuật Ngữ Gate

| Keyword | Nghĩa | Không nên hiểu là | Dùng ở đâu |
|---|---|---|---|
| `Spec` | gate chốt requirement/spec baseline đã được human approve để dùng làm source-of-truth | không phải chỉ là có file spec draft tồn tại | chủ yếu `s04` |
| `Contract` | gate chốt `API contract` hoặc `UX contract` đã được human approve hoặc chốt `not_applicable` rõ | không phải chỉ là mock interface sơ bộ | chủ yếu `s04` |
| `DoR` | `Definition of Ready`: verdict cho biết work item đủ rõ để sang design/planning/implementation | không phải approval cảm tính | chủ yếu `s04` |
| `Foundation Decision` | gate chốt solution class, stack, runtime hoặc deployment model do human chọn cuối | không phải recommendation của AI | chủ yếu `s05` |
| `UAT` | `User Acceptance Testing`: gate xác nhận kết quả thực tế khớp approved spec/contract trong scenario người dùng | không phải thay thế cho `DoD` | chủ yếu `s08` |
| `Release` | gate xác nhận work item đủ điều kiện ship, rollout và rollback theo scope release thực tế | không phải chỉ là release recommendation của kỹ thuật | chủ yếu `s08` |
| `Business Acceptance` | gate xác nhận outcome cuối khớp business intent đã approved | không phải review kỹ thuật hay UAT thuần | chủ yếu `s08` |
| `approval_gates` | map chỉ ra gate nào là `required` hoặc `not_applicable` cho từng note/work item | không phải bằng chứng human đã review | frontmatter workflow |
| `approval_status` | trạng thái approval của protocol-managed work item/change như `PENDING_REVIEW`, `APPROVED`, `REJECTED` | không phải verdict của step note; `NOT_REQUIRED` chỉ là compatibility enum, không phải đường hợp lệ cho item do protocol quản lý | protocol report |
| `review_required` | cờ cho biết approval gate của protocol có phải review thật hay không | với protocol-managed work item/change hiện tại không được đặt `false` | protocol report |
| `delivery_context` | context delivery của work item: `greenfield` hoặc `brownfield` | không phải planning depth như `quick|full|enterprise` | frontmatter workflow |
| `DoD` | `Definition of Done`: verdict cho biết work item đủ evidence để đóng | không phải code review pass | chủ yếu `s08` |
| `role_signoffs` | map authority cho biết role nào có trách nhiệm signoff từng gate | không phải bằng chứng đã review thực tế | frontmatter workflow |
| `gate_reviews` | audit trail ghi role reviewer và thời điểm review cho từng gate | không thay `role_signoffs`, cũng không thay `approved_by` của waiver | frontmatter workflow |
| `spec/design before code` | rule cứng: không implement khi `s04-s06` chưa đủ điều kiện | không phải gợi ý hay preference | policy, `s07` gate |
| `brainstorming có kỷ luật` | rule cứng: không chốt `s05` nếu chưa có so sánh phương án ở mức phù hợp | không phải kéo dài discovery vô hạn | `s05` gate |
| `planning execution-oriented` | rule cứng: không vào `s07` với task plan còn mơ hồ, còn placeholder hoặc chưa đủ rõ để thi công | không phải chỉ là “có list task là đủ” | `s06` gate |
| `TDD cho behavior change` | rule cứng: change tác động behavior phải ưu tiên test trước rồi mới code | không phải chỉ là “có test là đủ” | `s07` gate |
| `worktree cho change lớn hoặc rủi ro` | rule cô lập workspace: change lớn hoặc risk cao phải ưu tiên tách workspace riêng trước khi implement | không phải bắt buộc cho mọi quick fix | `s07` gate |
| `review sớm, không đợi cuối` | rule review: review cho batch/task rủi ro hoặc phần quan trọng phải diễn ra trong `s07` | không phải đợi tới `s08` mới review toàn bộ diff | `s07` gate |
| `review hai tầng` | rule thứ tự review: phải kiểm `spec compliance` trước, rồi mới tới `code quality` | không phải review code thuần túy mà bỏ qua việc có đúng spec hay không | `s07` gate |
| `subagent chỉ cho task độc lập` | rule delegation: chỉ tách worker khi task đủ độc lập để giao việc, merge và verify mà không gây conflict hoặc drift | không phải cứ muốn song song hóa là được bật | `s07` gate |
| `không tự tuyên bố done` | rule kết luận: chỉ `s08` với verdict `DoD` rõ mới được coi work item là hoàn tất | không phải code merge xong, test pass cục bộ hay review pass là xong | `s08` gate |
| `branch/worktree chỉ chốt sau verify` | rule kết thúc execution: `cleanup`, `close`, `remove` hoặc `merge` chỉ hợp lệ sau khi `s08` có verdict `DoD` rõ | không phải thấy branch/worktree sạch là được chốt sớm | `s08` gate |
| `default an toàn` | rule fallback: khi chưa đủ chắc chắn, chọn hướng bảo thủ hơn như `full`, không bật `subagent` bừa, không mở boundary mới bừa và không coi gate là đã qua | không phải cớ để trì hoãn vô hạn hoặc bỏ qua rule cứng | xuyên step |
| `verification_owner` | người hoặc role chịu trách nhiệm verify cuối | không đồng nghĩa người đó phải code | execution runtime, `s08` |

## Thuật Ngữ Thiết Kế Và Lập Kế Hoạch

| Keyword | Nghĩa | Không nên hiểu là | Dùng ở đâu |
|---|---|---|---|
| `option analysis` | phần so sánh phương án trước khi chốt approach | không phải technical approach cuối cùng | `s05`, brainstorming |
| `recommended option` | phương án được khuyến nghị sau khi so sánh | không phải “ý thích cá nhân” | `option analysis` |
| `giải pháp nhỏ nhất đủ đúng` | phương án nhỏ nhất vẫn đạt AC, constraint hiện tại, `governance` liên quan và nhu cầu kiểm chứng chính | không phải giải pháp tạm bợ hoặc cắt bớt quality gate | `s05` |
| `behavior change` | thay đổi làm đổi behavior observable của hệ thống như bug fix, feature behavior, validation rule, contract change hoặc refactor có regression risk đáng kể | không phải docs-only, format-only hay metadata-only | chủ yếu `s07` |
| `change lớn hoặc rủi ro` | change nên dùng `worktree`, thường có một trong các dấu hiệu: `enterprise`, kéo dài hơn một session, chạm nhiều boundary/file với conflict risk đáng kể, hoặc merge/branch/release risk cao | không phải mọi change ở `full` đều tự động thuộc nhóm này | chủ yếu `s07` |
| `task độc lập` | task đủ rõ để giao cho worker riêng, thường có `owned_scope` hoặc `owned_paths` tương đối rời nhau, `merge path` rõ và `verify path` hoặc `verification_owner` rõ | không phải task nhỏ nhưng tightly coupled hoặc vừa khám phá context xong | chủ yếu `s07` |
| `validation plan` | điều cần kiểm chứng trước hoặc trong implement | không phải full test report | `s05`, `s08` |
| `technical approach` | hướng kỹ thuật đã chọn để triển khai | không phải danh sách task | `s05` |
| `foundation decision` | quyết định nền tảng của project như solution class, stack, runtime hoặc deployment model | không phải chi tiết implement nhỏ của một task | chủ yếu `s05` ở `empty/greenfield project` |
| `bootstrap gate` | lớp gate cấp project trước khi materialize hoặc implement work item đầu tiên ở `empty/greenfield project` | không phải cùng một nghĩa với `work item approval` | intake, materialization, `s04-s05` |
| `brownfield` | context delivery khi hệ thống hiện có là baseline đang vận hành và change phải tôn trọng compatibility/regression constraints | không phải cớ để bỏ spec hay bỏ review gate | xuyên `s04-s08` |
| `task plan` | các task thực thi có thứ tự, phần chạm chính hoặc ownership và verify path | không phải placeholder như “xử lý edge case” | `s06` |
| `Delivery Rule Evidence` | block evidence có cấu trúc ở `s07` để chốt `TDD`, `worktree`, review hai tầng và điều kiện delegation | không phải ghi chú prose tự do hay changelog chung chung | `s07` |
| `execution-oriented task plan` | task plan đủ rõ về phần chạm chính, thứ tự hoặc dependency, verify path và checkpoint cần thiết để implementer triển khai mà không phải tự phát minh lại design | không phải kế hoạch mơ hồ ở mức ý tưởng | `s06` |
| `verify path` | cách kiểm chứng task hoặc change sau khi làm | không phải chỉ một câu “sẽ test” | `s06`, `s08` |
| `placeholder` | câu mô tả mơ hồ chưa nói rõ chạm đâu, làm gì, kiểm thế nào | không phải task plan hợp lệ | chủ yếu `s06` |
| `empty project` / `greenfield project` | project chưa có baseline stack/runtime đã approved, hoặc repo gần như trống nên các quyết định solution class và stack đều là quyết định nền tảng | không được coi như project bình thường để AI tự chọn stack rồi implement luôn | runtime hard stop |

## Câu Canonical

Khi cần viết ngắn mà vẫn giữ đúng ngữ nghĩa, ưu tiên dùng các câu sau:

- `giải pháp nhỏ nhất đủ đúng`: nếu một phương án nhỏ hơn vẫn đạt AC, constraint hiện tại, `governance` liên quan và nhu cầu kiểm chứng chính, phải chọn nó.
- `planning execution-oriented`: task plan phải đủ rõ về phần chạm chính, thứ tự hoặc dependency, verify path và checkpoint cần thiết để implementer không phải tự phát minh lại design.

## Thuật Ngữ Governance

| Keyword | Nghĩa | Không nên hiểu là | Dùng ở đâu |
|---|---|---|---|
| `governance` | lớp rule/checklist/authority dùng chung cho workflow | không phải workflow riêng | xuyên suốt |
| `governance context` | bối cảnh rule, constraint, authority có liên quan đến work item | không phải đoạn văn mô tả chung chung | `s01`, `s03` |
| `governance checks` | các check cần qua trước khi chuyển gate | không phải phần trang trí trong note | `s04`, `s06`, `s08` |
| `governance-exception` | deviation được ghi nhận chính thức khi đi lệch rule | không phải note prose rải rác | `s05`, `s07`, `s08` |
| `waiver` | chấp thuận có authority cho một deviation hoặc rule bypass có kiểm soát | không phải tự quyết định của agent | governance |
| `governance_profile` | mức governance áp dụng như `default`, `strict`, `regulated` | không phải tag tùy hứng | note metadata |

## Thuật Ngữ SDD

| Keyword | Nghĩa | Không nên hiểu là | Dùng ở đâu |
|---|---|---|---|
| `SDD` | `Spec Driven Development`: spec điều khiển design, code và verify | không phải chỉ là viết spec cho có | toàn workflow khi bật |
| `spec_refs` | reference tới spec nguồn như `BRD` hoặc `SRS` | không phải link tham khảo tùy ý | note metadata |
| `spec_status` | trạng thái hiện tại của spec như `approved`, `frozen` | không phải status của code | note metadata |
| `approved` | spec đã được review và chấp nhận để dùng | chưa chắc đã khóa thay đổi | SDD |
| `frozen` | spec được khóa để implementation bám theo | không có nghĩa là không bao giờ đổi nữa | SDD |
| `spec-change` | thay đổi chính thức lên spec khi implementation cần lệch | không phải sửa code trước rồi update spec sau | `s05-s07` |
| `spec-coverage-report` | báo cáo mapping giữa requirement/spec và evidence verify | không phải changelog | `s08` |

## Thuật Ngữ Execution

| Keyword | Nghĩa | Không nên hiểu là | Dùng ở đâu |
|---|---|---|---|
| `agentic` | một agent giữ trọn ownership của step | không có nghĩa là không cần gate | execution mode |
| `multi_agent` | nhiều role hoặc worker cùng chạy quanh một step | không phải mặc định cho mọi task | execution mode |
| `sequential_multi_role` | fallback khi không có sub-agent thật nhưng vẫn bám cùng role contract | không phải bỏ execution protocol | runtime fallback |
| `review_mode=self` | implementer tự review là chính | không thay independent review khi policy yêu cầu | execution metadata |
| `spec compliance` | lớp review xác nhận change có đúng AC, approach, spec, scope và không có drift chưa được ghi nhận | không phải code-style review | execution metadata |
| `targeted review` | review tập trung vào batch, task rủi ro hoặc phần logic/contract cụ thể | không phải review toàn bộ diff theo kiểu cuối kỳ | execution metadata |
| `code quality` | lớp review đánh giá chất lượng kỹ thuật sau khi đã xác nhận đúng spec | không phải bước thay thế `spec compliance` | execution metadata |
| `review_mode=independent` | review phải tách khỏi implementer | không đồng nghĩa nhiều người phải code | execution metadata |
| `owned_scope` | phần trách nhiệm logic mà worker được giao | không phải toàn bộ work item | worker assignment |
| `owned_paths` | file/path ownership của worker | không phải quyền sửa mọi file liên quan | worker assignment |
| `merge path` | cách nhập lại output của worker vào flow chính mà không gây conflict hoặc drift | không phải chỉ là “sẽ merge sau” chung chung | execution metadata |
| `worktree` | workspace tách biệt dùng cho implementation để giảm conflict, giữ branch sạch và cô lập change lớn hoặc risk cao | không phải thay thế cho review, verify hoặc `DoD` | chủ yếu `s07` |
| `TDD` | viết test trước để điều khiển implement theo chu kỳ `Red -> Green -> Refactor` | không phải viết code xong rồi thêm test sau | chủ yếu `s07` |

## Thuật Ngữ Planning Track

| Keyword | Nghĩa | Không nên hiểu là | Dùng ở đâu |
|---|---|---|---|
| `planning_track` | mức sâu của authoring và review | không phải workflow khác | scaffold, metadata |
| `quick` | change nhỏ, một boundary chính, authoring rút gọn | không cho phép bỏ design/task plan | planning track |
| `full` | baseline mặc định cho feature/change thông thường | không mặc định enterprise-level review | planning track |
| `enterprise` | scope nhiều boundary, review hoặc release risk cao | không chỉ là “task to” | planning track |

## Thuật Ngữ Artifact

| Keyword | Nghĩa | Không nên hiểu là | Dùng ở đâu |
|---|---|---|---|
| `source-of-truth` | artifact chính dùng để chốt quyết định hoặc kết luận | không phải mọi note tham khảo | `work-items/`, `product-specs/`, `changes/` |
| `work-items/` | root chuẩn cho workflow artifacts của work item | không phải chỗ lưu mọi note tạp | repo root |
| `change package` | gói artifact theo `proposal -> design -> tasks -> spec-delta -> archive` | không phải workflow step | `changes/` |
| `canonical artifact` | file chuẩn đại diện cho step | không phải filename tự đặt theo ý nghĩa cá nhân | workflow naming |
| `option-analysis-spec` | spec sinh ra từ brainstorming/option analysis | không thay `technical-approach-spec` | `s05` |

## Phân Biệt Nhanh

| Cặp keyword | Phân biệt ngắn |
|---|---|
| `option analysis` vs `technical approach` | `option analysis` là so sánh để chọn; `technical approach` là hướng đã chọn |
| `task plan` vs `execution-oriented task plan` | `task plan` là kế hoạch task; `execution-oriented task plan` là task plan đã đủ rõ để triển khai thật |
| `DoR` vs `DoD` | `DoR` trả lời “đủ sẵn sàng để làm chưa”; `DoD` trả lời “đủ evidence để đóng chưa” |
| `governance-exception` vs `waiver` | `exception` là deviation được ghi nhận; `waiver` là chấp thuận có authority cho deviation đó |
| `approved` vs `frozen` | `approved` là spec được chấp nhận; `frozen` là spec đã khóa để implement bám theo |
| `agentic` vs `multi_agent` | `agentic` là một owner chính; `multi_agent` là nhiều ownership cùng tham gia theo protocol |

## Keyword Ưu Tiên Dùng Nhất

Khi viết docs mới, ưu tiên dùng các keyword sau để tránh drift ngữ nghĩa:

- `option analysis`
- `planning execution-oriented`
- `giải pháp nhỏ nhất đủ đúng`
- `technical approach`
- `task plan`
- `default an toàn`
- `DoR`
- `DoD`
- `governance checks`
- `governance-exception`
- `spec-change`
- `approved|frozen`
- `agentic|multi_agent`
- `planning_track`

## Tài Liệu Liên Quan

- `policies/codex/AGENTS.global.md`
- `skills/orchestration/codex-workflow-chain/SKILL.md`
- `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`
- `docs/hybrid-superpowers-policy.md`
- `docs/hybrid-superpowers-decision-matrix.md`
