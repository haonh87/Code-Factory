---
name: codex-workflow-chain
description: Áp dụng workflow coding 8 bước cho tác vụ phát triển phần mềm bằng Codex. Dùng cho coding, debug, refactor, viết test, script automation, bàn giao tính năng và luồng DevOps local -> dev -> uat -> prod. Workflow giữ một chain duy nhất với tên ngắn Clarify, Business Goal, Open Questions, Acceptance + DoR, Technical Approach, Task Plan, Implement, Verify + DoD; có traceability business -> design -> code -> verify, governance overlay, SDD overlay, role signoff, release readiness và tách rõ skill nghiệp vụ với skill artifact.
---

# Chuỗi Workflow Coding Cho Codex

Tuân thủ workflow delivery 8 bước cho các tác vụ coding.

## Nguyên Tắc Mô Hình

- Workflow chain trong skill này là chuỗi delivery 8 bước cho một yêu cầu coding cụ thể.
- Mỗi step trong workflow là một bước nghiệp vụ thực sự, không phải một trường mô tả.
- `goal`, `input`, `output`, `done_when`, `constraints`, `risks`, `timebox` là metadata của từng step để khóa contract và kiểm soát handoff.
- Khi mô tả `input` và `output`, luôn viết theo ý nghĩa business trước; tên spec kỹ thuật chỉ để trong ngoặc để trace.
- Metadata không phải workflow step riêng.
- Skill được gắn vào step để hỗ trợ thực thi và kiểm soát chất lượng, không thay thế step.
- `agentic` và `multi-agent` là lớp execution topology của step; chúng mô tả cách vận hành step, không phải workflow step mới và không thay thế skill nghiệp vụ.
- Discovery và delivery cùng nằm trong một chain; không tách thành workflow khác, nhưng được phân lớp bằng `workflow_stage`.

## Quy Tắc Ngôn Ngữ Và Mã Hóa

- Mặc định trao đổi với người dùng bằng tiếng Việt.
- Mặc định nội dung tài liệu và báo cáo bằng tiếng Việt, trừ khi có yêu cầu khác.
- Khi sửa tài liệu văn bản, lưu UTF-8 và kiểm tra lỗi mã hóa trước khi bàn giao.

## Quy Tắc Artifact Obsidian

- Artifact chuẩn của workflow doc là note `.md`; nếu một step được scaffold thành file thì mặc định file chuẩn là `.md` và phải dùng `obsidian-markdown`.
- Với artifact `.canvas` dùng cho sơ đồ kiến trúc, flow hoặc task map, áp dụng `json-canvas`.
- Với artifact `.base` dùng làm index, dashboard hoặc bảng tổng hợp note, áp dụng `obsidian-bases`.
- `.canvas` và `.base` chỉ là artifact phụ; không thay thế note `.md` làm nguồn sự thật cho quyết định và kết luận.
- Hiện tại chưa yêu cầu `obsidian-cli` trong workflow chain này.
- Nếu một step được lưu thành note `.md`, dùng template output chuẩn theo step tại `references/workflow-chain.md`, bao gồm naming, frontmatter và block contract/spec tương ứng.

## Quy Tắc Metadata Và Truy Vết

- Với note workflow, ưu tiên tách `content_skills` và `artifact_skills` thay vì gộp tất cả vào một field skill chung.
- `content_skills` ghi các skill tạo nội dung nghiệp vụ hoặc gate chất lượng.
- `artifact_skills` ghi các skill dùng để tạo note `.md`, `.canvas`, `.base`.
- Mỗi note workflow được scaffold nên có `work_item_type`, `workflow_stage`, `upstream_artifacts`, `linked_artifacts`.
- Mỗi note workflow được scaffold nên có block `## Traceability` để truy vết business -> readiness -> design -> implementation -> verify.

## Quy Tắc Execution Topology

- Chuỗi này nên được hiểu theo 6 lớp song song: `step`, `governance`, `SDD`, `content skill`, `artifact` và `execution topology`.
- `agentic` dùng khi một agent đủ ownership để tự đi trọn vòng `contract -> readiness -> execute -> self-check -> audit -> handoff`.
- `multi-agent` dùng khi cần tách rõ `coordinator`, `worker` và `verifier`, hoặc khi có nhiều ownership boundary có thể chạy song song.
- Execution topology luôn phải bám cùng `step-goal-contract`, không được tạo logic điều phối làm lệch goal, scope hoặc gate của step.
- `governance` là lớp mỏng dùng chung: phần lớn được nhúng vào step contract/gate, phần còn lại nằm ở `constitution`, `project-context`, `checklist` và `exception`.
- Trong prose có thể viết `multi-agent`, nhưng trong schema và frontmatter dùng `multi_agent`; nếu runtime không hỗ trợ delegation ổn định thì fallback `sequential_multi_role` theo execution policy.
- Nếu scaffold workflow note, nên khai báo `execution_mode`, `execution_roles`, `review_mode`, `verification_owner`, `approval_gates`, `role_signoffs` và `gate_reviews`; `execution_roles` phản ánh role nghiệp vụ như `po`, `ba`, `designer`, `developer`, `qc`, `devops`, còn `role_signoffs` nên theo dõi tối thiểu `spec`, `contract`, `dor`, `approach`, `foundation`, `task_plan`, `uat`, `release`, `business_acceptance`, `dod`. `gate_reviews` dùng để ghi human reviewer thực tế và thời điểm review của gate. Role vận hành như `coordinator` hoặc `verifier` được trace ở block `## Execution Topology` hoặc runtime artifacts.
- Nếu work item cần route theo độ sâu planning, nên khai báo `planning_track=quick|full|enterprise` ngay từ lúc scaffold để preset governance/review phù hợp.
- Nếu step có nhiều role nghiệp vụ cùng tham gia hoặc cần audit handoff/signoff theo role, ưu tiên thêm block `## Role Outputs` dùng schema `role-output-map` trong note chính thay vì tách note riêng quá sớm.
- Nếu work item chạy theo SDD, khai báo `sdd_mode`, `spec_refs` và `spec_status`; step 4 phải chốt `spec-freeze-gate`, step 5-7 phải dùng spec change protocol khi phát hiện lệch spec, và step 8 phải có `spec-coverage-report`.
- Mapping theo step, quy tắc handoff và schema workflow nằm ở `references/workflow-chain.md`.
- Chính sách runtime, role contract, handoff protocol và rollout `Codex-first` nằm ở `references/execution-runtime.md`.

## Quy Tắc Governance

- Không tạo step governance riêng; `governance` phải đi vào đúng step nơi quyết định được đưa ra.
- Nếu không có chỉ định khác, `governance_ref` mặc định trỏ `project-context/project-context.md`, còn `checklist_refs` lấy từ `project-context/checklists/<governance_profile>.md`.
- `governance_profile`, `governance_status` và trigger mở `governance-exception` phải theo `project-context/governance-decision-model.md`.
- `Clarify` phải ghi nhận `governance context` ban đầu trước khi sang `Technical Approach`.
- `Acceptance + DoR`, `Task Plan` và `Verify + DoD` là ba điểm tự nhiên để gắn `governance checks`.
- Nếu implementation hoặc approach đi lệch nguyên tắc chuẩn, phải ghi `governance-exception` hoặc `waiver`, không được ngầm bỏ qua.
- `governance` chỉ có giá trị khi đi vào gate, evidence và handoff; không nên để nó chỉ nằm ở tài liệu nền.
- Khi tạo workflow note thành file, ưu tiên scaffold bằng `wfc scaffold --work-item <work_item_slug>` hoặc `wfc scaffold-step --work-item <work_item_slug> --step <sNN>`; chỉ copy tay template khi thực sự cần tùy biến sâu. Nếu repo có root scripts tương ứng thì `npm run scaffold:workflow` và `npm run scaffold:workflow-step` là alias hợp lệ.
- Nếu work item có `execution_mode=multi_agent`, chạy thêm `wfc exec --workflow-root work-items` sau khi scaffold hoặc chỉnh tay. Nếu repo đã map root script thì `npm run validate:workflow:execution -- --workflow-root work-items` là alias tương đương.
- Nếu work item dùng `planning_track` khác mặc định hoặc muốn khóa routing rule, chạy thêm `wfc plan --workflow-root work-items`. Nếu repo đã map root script thì `npm run validate:workflow:planning -- --workflow-root work-items` là alias tương đương.
- `work-items/` là canonical artifact root cho workflow artifacts thật; nếu không có chỉ định khác, workflow note được scaffold nên nằm dưới `work-items/<work_item_slug>/`.

## Quy Tắc Cứng: Spec/Design Trước Code

- Không được bắt đầu `s07 Implement` khi `s04 Acceptance + DoR`, `s05 Technical Approach` hoặc `s06 Task Plan` chưa đủ điều kiện tối thiểu.
- Điều kiện tối thiểu để code production được phép bắt đầu:
  - `s04` đã có acceptance criteria đo được và `DoR` rõ.
  - `s05` đã khóa approach, boundary bị tác động và validation plan ở mức đủ dùng.
  - `s06` đã có task plan đủ để biết thứ tự thực hiện và verify path.
- `planning_track=quick` chỉ cho phép rút gọn mức chi tiết của artifact; không cho phép bỏ hẳn `s05` hoặc `s06`.
- Khi work item chạy theo `SDD`, không được implement nếu `spec` chưa `approved|frozen`, trừ khi đã có `spec-change` hoặc `governance-exception` theo đúng rule.
- Nếu có tình huống khẩn cấp buộc phải đi lệch, phải ghi rõ exception hoặc waiver; không được code trước rồi backfill tài liệu như thể workflow chưa từng bị rút ngắn.

## Quy Tắc Cứng: Brainstorming Có Kỷ Luật

- Trước khi chốt `s05 Technical Approach`, phải có `option analysis` ở mức phù hợp với độ phức tạp của work item.
- Mức tối thiểu của `option analysis`:
  - mục tiêu cần giải quyết đã rõ
  - có phương án để so sánh
  - có 1 hướng khuyến nghị với lý do rõ
  - có điều cần kiểm chứng trước hoặc trong implement
- Nếu bài toán có nhiều hướng xử lý hợp lý, phải nêu ít nhất 2 phương án.
- Nếu bài toán có một hướng gần như hiển nhiên, vẫn phải nêu ít nhất 1 hướng thay thế hoặc hướng bị loại để chứng minh đã so sánh.
- `planning_track=quick` chỉ cho phép rút gọn mức chi tiết của `option analysis`; không cho phép bỏ hẳn phần so sánh phương án.
- Nếu chưa đủ dữ liệu để brainstorm nghiêm túc, phải phản ánh blocker hoặc assumption ở `s03 Open Questions` thay vì ép chọn approach.

## Quy Tắc Cứng: Ưu Tiên Giải Pháp Nhỏ Nhất Đủ Đúng

- Ở `s05 Technical Approach`, nếu một phương án nhỏ hơn vẫn đạt acceptance criteria, constraint hiện tại, `governance` liên quan và nhu cầu kiểm chứng chính, phải ưu tiên phương án đó.
- Không được mở thêm abstraction, layer, service, framework, schema split, queue, cache hoặc config surface mới chỉ vì nhu cầu giả định trong tương lai.
- Nếu chọn phương án lớn hơn, `technical approach` phải nêu rõ vì sao phương án nhỏ hơn không đủ:
  - không đạt acceptance criteria hoặc quality constraint hiện tại
  - không đạt yêu cầu an toàn, vận hành hoặc `governance`
  - requirement in-scope buộc phải mở boundary lớn hơn ngay bây giờ
- `planning_track=quick` mặc định ưu tiên delta nhỏ nhất trên đường đi hiện có; không rewrite hoặc redesign boundary nếu chưa có lý do cụ thể.
- `Giải pháp nhỏ nhất đủ đúng` không có nghĩa là làm tạm bợ hoặc cắt bớt test, verify, review, docs hay `governance`.

## Quy Tắc Cứng: Planning Execution-Oriented

- Trước khi bắt đầu `s07 Implement`, `s06 Task Plan` phải đủ rõ để triển khai mà không cần tự phát minh lại design.
- Mức tối thiểu của `execution-oriented task plan`:
  - nêu rõ `owned_scope` hoặc file/path chính sẽ tạo hoặc sửa khi có thể xác định
  - có thứ tự thực hiện hoặc dependency rõ
  - có `verify path` đủ dùng cho từng task hoặc từng batch
  - có checkpoint review hoặc governance khi scope cần
- Không được viết task plan kiểu placeholder như `xử lý edge case`, `thêm validation phù hợp`, `viết test`, `sửa phần liên quan` nếu không nêu rõ sẽ chạm đâu và kiểm thế nào.
- `planning_track=quick` chỉ cho phép rút gọn mức chi tiết của task plan; không cho phép bỏ hẳn phần chạm chính hoặc cách verify chính.
- Nếu task plan vẫn buộc implementer phải tự suy diễn lại approach, phải quay lại `s05` hoặc viết lại `s06` trước khi code.

## Quy Tắc Cứng: TDD Cho Behavior Change

- Ở `s07 Implement`, nếu change tạo hoặc sửa `behavior change`, phải đi theo `TDD`.
- `behavior change` trong workflow này bao gồm:
  - sửa bug behavior
  - thêm feature behavior production
  - đổi validation rule hoặc contract
  - refactor có regression risk đáng kể
- Chu kỳ tối thiểu của `TDD`:
  - viết test cho behavior mong muốn hoặc bug cần tái hiện
  - chạy để thấy test fail đúng lý do
  - viết code tối thiểu để pass
  - chạy lại test để xác nhận pass
- `TDD` không bắt buộc cho `docs-only`, rename, format, metadata-only hoặc artifact workflow không tác động behavior production.
- Nếu strict `TDD` bị chặn bởi legacy, harness hoặc môi trường test, phải ghi rõ lý do và `verify path` thay thế trong implementation note; không được viết xong code rồi thêm test sau mà vẫn gọi đó là `TDD`.

## Quy Tắc Cứng: Worktree Cho Change Lớn Hoặc Rủi Ro

- Ở `s07 Implement`, phải dùng `worktree` khi change thuộc nhóm `change lớn hoặc rủi ro`.
- `change lớn hoặc rủi ro` trong workflow này bao gồm tối thiểu:
  - `planning_track=enterprise`
  - implementation kéo dài hơn một session
  - chạm nhiều boundary hoặc nhiều file với conflict risk đáng kể
  - merge risk, branch risk hoặc release risk cao
- Với `planning_track=full`, nếu change không còn là quick fix, mặc định nên dùng `worktree`.
- Có thể bỏ qua `worktree` cho bug nhỏ, quick fix, ít file, xong trong một session và conflict risk thấp.
- Nếu change đã thuộc nhóm nên hoặc phải dùng `worktree` mà vẫn không dùng, implementation note phải nêu rõ lý do.
- `worktree` là lớp cô lập workspace; không thay cho review, verify hay `DoD`.

## Quy Tắc Cứng: Review Sớm, Không Đợi Cuối

- Ở `s07 Implement`, không được dồn toàn bộ review sang `s08 Verify + DoD`.
- Review phải diễn ra sớm theo batch, task rủi ro hoặc phần logic/contract quan trọng ngay trong `s07`.
- Mức tối thiểu:
  - `quick`: có ít nhất một lượt review cho phần implement trước khi rời `s07`
  - `full`: có `targeted review` theo batch hoặc task rủi ro
  - `enterprise`: có `independent review` cho các phần chính trong `s07`
- Thứ tự review mặc định:
  - `spec compliance`
  - `code quality`
- Review sớm không thay cho `testing`, `verify` hay `DoD`; `s08` vẫn là nơi kết luận cuối cùng.

## Quy Tắc Cứng: Review Hai Tầng

- Mọi review diễn ra trong `s07 Implement` phải kiểm `spec compliance` trước, rồi mới tới `code quality`.
- `spec compliance` phải trả lời tối thiểu:
  - change có đúng acceptance criteria, approach, spec và scope đã chốt không
  - có lệch `governance` hoặc spec drift chưa được ghi nhận không
- Chỉ sau khi `spec compliance` đã pass hoặc đã có exception rõ mới được chuyển sang `code quality`.
- Với `planning_track=enterprise` hoặc phần logic/contract chính, review hai tầng phải được thể hiện thành hai bước rõ ràng, không gộp mơ hồ.
- Với `quick` và `full`, có thể review trong cùng một lượt, nhưng verdict vẫn phải theo thứ tự `spec compliance -> code quality`.
- `code quality` không thay cho `spec compliance`; code sạch nhưng lệch spec vẫn là fail.

## Quy Tắc Cứng: Subagent Chỉ Cho Task Độc Lập

- Ở `s07 Implement`, chỉ được bật `subagent` hoặc `multi_agent` khi task thuộc nhóm `task độc lập`.
- `task độc lập` trong workflow này phải thỏa tối thiểu:
  - `s06 Task Plan` đã đủ rõ để giao việc
  - `owned_scope` hoặc `owned_paths` tương đối rời nhau
  - `merge path` hoặc handoff path rõ
  - `verify path` hoặc `verification_owner` rõ
- Không bật `subagent` cho task nhỏ nhưng tightly coupled, task vừa khám phá context xong, task có ownership chồng lấn mạnh hoặc task chưa có đường verify rõ.
- `agentic` vẫn là mode mặc định; nếu chưa đạt điều kiện của `task độc lập`, phải fallback về `agentic` hoặc `sequential_multi_role`.
- `subagent` không được bypass `review`, `testing`, `verify` hay `DoD`.

## Quy Tắc Cứng: Không Tự Tuyên Bố Done

- Không agent, worker hay implementer nào được tuyên bố `done` trước khi `s08 Verify + DoD` có verdict `DoD` rõ.
- `review pass`, `test pass` cục bộ, `code xong`, `merge xong` hoặc `worktree` đã sạch không tương đương `DoD`.
- Với `multi_agent` hoặc `subagent`, chỉ được tổng hợp evidence trong `s07`; verdict hoàn tất chỉ hợp lệ khi `s08` kết luận.
- Nếu còn check bị bỏ qua, exception còn mở, gap chưa có owner rõ hoặc evidence chưa đủ, chỉ được báo `PARTIAL` hoặc chưa hoàn tất; không được báo `done`.
- `DoD` là gate đóng work item ở mức delivery, không phải trạng thái cảm tính của implementer.

## Quy Tắc Cứng: Branch/Worktree Chỉ Chốt Sau Verify

- Khi work item dùng `branch` hoặc `worktree`, quyết định `cleanup`, `close`, `remove` hoặc `merge` chỉ hợp lệ sau khi `s08 Verify + DoD` có verdict `DoD` rõ.
- `branch` sạch, `worktree` sạch, diff đã review hoặc code đã merge cục bộ không phải evidence để chốt branch/worktree sớm.
- Nếu verify còn pending, finding còn mở, exception còn mở hoặc evidence chưa đủ, branch/worktree phải giữ trạng thái đang chờ; không được coi là sẵn sàng chốt.
- Với `multi_agent` hoặc nhiều `worktree`, chỉ được hợp nhất hoặc dọn sau khi `verify path` và handoff path đã kết thúc ở `s08`.
- Rule này chỉ siết thời điểm chốt branch/worktree; không thay cho branch strategy của repo.

## Quy Tắc Mặc Định: Default An Toàn

- Khi chưa đủ chắc chắn để chọn `planning_track`, capability hoặc mức can thiệp, phải chọn fallback an toàn hơn thay vì tối ưu hóa sớm.
- `default an toàn` của workflow này:
  - không chắc `planning_track` nào: chọn `full`
  - không chắc gate đã qua chưa: coi như chưa qua gate và quay lại step tương ứng
  - không chắc có cần `subagent`: không dùng
  - không chắc có cần mở boundary, abstraction hoặc service mới: không mở nếu đường hiện có vẫn đủ đáp ứng
  - không chắc có cần `worktree`: dùng nếu change có dấu hiệu của `change lớn hoặc rủi ro`
  - không chắc có cần `TDD`: dùng nếu behavior production bị tác động
  - không chắc review mức nào: bắt đầu bằng `targeted review`
- `default an toàn` không cho phép bỏ qua rule cứng; nó chỉ quyết định hướng fallback khi còn bất định sau khi đã đọc context.

## Quy Tắc Cứng: Human-Controlled Gates

- Workflow này vận hành theo model `AI proposes, human approves`.
- AI được quyền phân tích, draft artifact, propose option, propose approach, propose task plan, implement, chạy test, tổng hợp evidence và nêu recommendation.
- Quyền `implement` chỉ được mở sau khi các gate human tương ứng đã pass; artifact draft không tự động có nghĩa là gate đã qua.
- Các generic coding defaults như “feature request thì nên code ngay”, “mặc định hiểu user muốn code changes”, “đừng dừng ở analysis”, “làm end-to-end luôn” không có giá trị mở gate.
- Các default đó chỉ có thể được áp dụng sau khi router hoặc protocol đã chứng minh `s07`, `ACTIVE`, `Missing Gates: NONE` và approval tương ứng đã pass.
- Nếu không chứng minh được điều này, hành vi đúng là quay lại `BLOCKED` hoặc step trước; không được coi convenience heuristic là authorization.
- AI không được tự:
  - approve work item hoặc change package
  - pass `Spec`
  - pass `Contract`
  - pass `DoR`
  - pass `Approach`
  - pass `Foundation Decision`
  - pass `Task Plan`
  - pass `UAT`
  - pass `DoD`
  - pass `Release`
  - pass `Business Acceptance`
  - approve `governance-exception` hoặc `waiver` nếu authority thuộc human role khác
- Mọi human-controlled gate chỉ được xem là pass khi đồng thời có:
  - artifact nguồn sự thật của step hoặc protocol đã được cập nhật
  - evidence đủ để reviewer kiểm
  - owner hoặc approver đúng authority đã chốt rõ
- `work item approval` và `change package approval` luôn là human-controlled gate; protocol-managed item không được dùng `review_required=false` hoặc `approval_status=NOT_REQUIRED` để bypass review.
- Human pass phải explicit; không suy diễn từ comment, `review pass` kỹ thuật, `test pass` cục bộ hoặc việc artifact đã tồn tại.
- Nếu human-controlled gate chưa pass, workflow phải `BLOCKED`, quay lại step trước, hoặc dừng trước gate tiếp theo; không được đi tiếp chỉ vì AI đánh giá là “đủ tốt”.
- `ACTIVE` chỉ hợp lệ khi `work item approval`, `change package approval` khi có, `bootstrap gate` của `greenfield` khi có, và evidence `s04`, `s05`, `s06` đã được human pass.
- `VERIFIED` chỉ hợp lệ khi `s08` đã có evidence verify.
- `DONE` chỉ hợp lệ khi `s08` đã pass `DoD`, và nếu scope yêu cầu thì `UAT`, `Release`, `Business Acceptance` cũng đã pass trong `s08`.
- Invariant cho block trạng thái router:
  - nếu `Missing Gates` khác `NONE`, `Workflow Status` không được là `ACTIVE`, `READY_FOR_REVIEW` hoặc `VERIFIED`
  - nếu `Missing Gates` khác `NONE`, `Next Human Action` không được là `NONE`
- `approval_gates` ghi gate nào là `required` hoặc `not_applicable` cho work item hoặc step note.
- `role_signoffs` ghi role có authority signoff cho `spec`, `contract`, `dor`, `approach`, `foundation`, `task_plan`, `uat`, `release`, `business_acceptance`, `dod`.
- `gate_reviews` ghi human reviewer thực tế và thời điểm review cho từng gate; note finalized ở `s04`, `s05`, `s06`, `s08` phải có reviewer + timestamp cho gate chính của step.

## Quy Tắc Cứng: Empty Project / Greenfield Hard Stop

- Nếu project đang ở trạng thái `empty` hoặc `greenfield`, không được nhảy thẳng sang scaffold framework, chọn stack cuối cùng hay implement production code.
- `empty` hoặc `greenfield` trong workflow này nghĩa là tối thiểu có một trong các dấu hiệu:
  - repo gần như trống hoặc chưa có source tree thực thi chính
  - chưa có stack hoặc framework baseline đã được chốt
  - chưa có runtime/deployment baseline đã được chốt
  - chưa có artifact source-of-truth đủ để coi quyết định kiến trúc nền đã được approve
- Trong trạng thái này, AI chỉ được:
  - clarify yêu cầu, business goal, open questions
  - draft spec hoặc contract cần thiết
  - làm `option analysis` cho solution class, stack, runtime hoặc deployment model
  - propose `technical approach`
  - propose `task plan`
  - propose work item hoặc change structure
- Ví dụ loại request vẫn phải dừng ở proposal stage:
  - feature greenfield kiểu `QR Voucher`, có UI, voucher service API và visual tone thương hiệu trong repo trống, không được tự nhảy sang scaffold hay code production
- Trong trạng thái này, AI không được tự:
  - chốt `site tĩnh`, SPA, SSR, backend-first, CMS hoặc framework cụ thể như một quyết định cuối
  - scaffold app skeleton, dependency tree, build system, Dockerfile, CI/CD hay deploy manifest như thể stack đã approved
  - implement feature đầu tiên của project như thể foundation decision đã xong
- Với `empty/greenfield project`, trước `s07 Implement` phải có tối thiểu:
  - `s04` pass `Spec`
  - nếu scope chạm `API contract` hoặc `UX contract`, `s04` pass `Contract`
  - `s04` pass `DoR`
  - `s05` pass `Approach`
  - nếu `s05` chứa quyết định nền tảng như solution class, stack, runtime hoặc deployment model, `s05` pass `Foundation Decision`
  - `s06` pass `Task Plan`
- Nếu chưa có evidence rõ rằng các gate trên đã được human pass, hành vi đúng là dừng ở `proposal stage`, trình bày option/trade-off/recommendation, rồi chờ human review.
- `default an toàn` cho `empty/greenfield project` là: không implement; không scaffold; không chốt stack cuối cùng thay cho human.
- `bootstrap gate` cho project mới phải đi theo thứ tự: `Spec -> Contract nếu có -> Approach -> Foundation nếu có -> work item approval -> Task Plan -> Implement`.
- Việc prompt nền hoặc agent habit thiên về implement-by-default không làm suy yếu `greenfield hard stop`; nếu xảy ra xung đột, vẫn phải dừng ở proposal stage.

## Quy Tắc Cứng: Brownfield Baseline Và Delta Discipline

- Mỗi work item phải khai báo `delivery_context: greenfield|brownfield`; không để ngầm ở mức suy diễn sau khi đã materialize note workflow.
- Với `brownfield`, AI phải coi hệ thống hiện có là baseline đang vận hành; default là thay đổi theo `delta nhỏ nhất đủ đúng`, không tự mở `Foundation Decision` nếu chưa có lý do rõ.
- Với `brownfield`, trước `s07 Implement`, output tối thiểu phải có:
  - `s04` có `Existing System Baseline`
  - `s05` có `Brownfield Impact Analysis`
  - `s06` có `Brownfield Delivery Plan`
- Với `brownfield`, `s08` phải có `Regression & Compatibility Summary` trước khi chốt `DoD`.
- Với `brownfield`, `approval_gates.foundation` chỉ mở khi change thực sự chạm architectural baseline như rewrite boundary, thay stack, thay runtime hoặc thay deployment model.

## Chuỗi Cốt Lõi

1. Clarify
- Làm rõ yêu cầu, `work_item_type`, context, scope/risk ban đầu, `governance context` liên quan và evidence cần giữ.

2. Business Goal
- Chốt giá trị nghiệp vụ, KPI/success metric, scope boundary, non-goals và mức độ phù hợp với nguyên tắc nền.

3. Open Questions
- Tách missing input, blocker, assumption, conflict và `governance blocker` cần owner/resolution.

4. Acceptance + DoR
- Chuyển mục tiêu thành acceptance criteria đo được, chốt readiness, phản ánh yêu cầu `governance` vào checklist và dùng `definition-of-ready-gate` khi cần khóa gate rõ ràng.

5. Technical Approach
- Chọn phương án kỹ thuật nhỏ nhất đủ đúng sau khi đã brainstorm có kỷ luật; chốt trade-off và boundary kiến trúc/UX/DevOps trong các ràng buộc `governance` đang áp dụng.

6. Task Plan
- Tách implementation thành task nhỏ có thứ tự, trace được về requirement/AC, có kế hoạch verify và có đủ checkpoint review/governance; task plan phải đủ rõ để triển khai mà không cần tự phát minh lại design.

7. Implement
- Chỉ được thực hiện sau khi `s04-s06` đã đủ điều kiện; thay đổi phải tập trung, đúng phạm vi, đúng approach, dùng `TDD` cho behavior change, dùng `worktree` cho change lớn hoặc rủi ro, review sớm cho phần chính và không lệch `spec` hoặc `governance` khi chưa được approve.

8. Verify + DoD
- Đối chiếu kết quả với criteria/spec, kiểm tra mã hóa tiếng Việt cho file văn bản đã đổi, kết luận `governance compliance`, dùng `definition-of-done-gate` khi cần khóa kết luận, chỉ tuyên bố `done` tại đây, chỉ chốt `branch/worktree` tại đây khi có và nêu rõ nếu không thể chạy kiểm tra.
- Nếu còn bất định về track, capability hoặc gate, quay về `default an toàn`, không tự ý chọn đường rủi ro hơn.

Làn DevOps khi có phạm vi runtime delivery
- Không tạo step 9; đây là lane chạy xuyên step 5 -> 8.
- Ở step 5, dùng `deployment-devops` để khóa DevOps scope tổng; dùng thêm `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` khi cần khóa sâu từng layer.
- Ở step 6, tách riêng task build image, compose, manifest, smoke, promotion và rollback khi có.
- Ở step 7, triển khai Dockerfile, compose, manifest hoặc pipeline config trong phạm vi đã chốt.
- Ở step 8, kết luận readiness cho packaging hoặc rollout trước khi promote lên `dev`, `uat`, `prod`.

Khi giải thích workflow cho người đọc theo góc business, ưu tiên dùng mẫu:
- Step nhận gì từ bước trước hoặc từ stakeholder.
- Step trả ra quyết định, tài liệu hay bằng chứng gì cho bước sau.
- Tên spec chỉ dùng để định danh artifact, không thay cho ý nghĩa bàn giao.

## Quy Tắc Chất Lượng

- Ưu tiên sửa tận gốc nguyên nhân thay vì vá bề mặt.
- Giữ tính nhất quán giữa code và tài liệu.
- Tuân thủ convention hiện có của project.

## Ưu Tiên Lệnh

- Ưu tiên `rg` khi tìm kiếm file và nội dung.
- Dùng lệnh không tương tác trong script và bối cảnh CI.

## Tài Liệu Tham Chiếu

Đọc tài liệu tham chiếu theo 3 nhóm:

Public docs:

- `references/workflow-overview-author-edition.md`: bản overview chính thức để giới thiệu workflow ở góc nhìn delivery và tác giả.
- `references/workflow-versioning.md`: chốt ranh giới public baseline `v1.0.0` và các extension sau đó.
- `references/workflow-chain.md`: workflow 8 bước, step-skill-artifact mapping, template note và schema workflow.
- `references/execution-runtime.md`: execution policy, role contract, handoff/merge protocol và cách dùng `agentic|multi_agent` trong baseline.

Extension docs:

- `references/work-item-materialization.md`: protocol authoring trước `scaffold`, dùng để chốt `work_item_slug`, split decision, dedup và `change_strategy`.
- `references/work-item-protocol.md`: protocol lifecycle ở cấp work item sau materialization, gồm state machine, transition, authority, handoff và command contract.

Maintainer docs:

- `references/workflow-overview.md`: bản tham chiếu nội bộ thiên về mechanics, validator, CI, rollout status và chi tiết kỹ thuật của workflow.
- `references/role-aware-workflow.md`: overlay role nghiệp vụ, BRD/SRS rollout artifacts, role outputs và cách dùng NotebookLM như corpus retrieval trong quá trình thực thi.
- `references/spec-driven-development.md`: SDD lifecycle, requirement IDs, spec freeze, spec change protocol, traceability matrix và spec coverage report.
- `references/sdd-merge-strategy.md`: cách kết hợp workflow hiện tại với `spec-kit`, `OpenSpec`, `cc-sdd` và `BMAD-METHOD` theo từng lớp và từng loại work item.
- `references/target-architecture.md`: target architecture để hoàn thiện workflow backbone theo các lớp governance, change, execution và adaptive planning.
- `references/implementation-blueprint.md`: implementation blueprint theo phase, artifact, validator, CI và done criteria để rollout target architecture.
- `references/workflow-ci-enforcement.md`: CI design cho workflow tooling, fixture suite, workflow artifacts và automation guardrail.
- `../../../project-context/README.md`: Governance Pack mặc định của repo, gồm `constitution`, `project-context`, checklist profile và exception register.
- `../../../project-context/governance-decision-model.md`: decision rule cho `governance_profile`, `governance_status` và exception trigger.
- `references/end-to-end-examples.md`: ví dụ áp dụng thật cho một flow `agentic` và một flow `multi-agent`.
