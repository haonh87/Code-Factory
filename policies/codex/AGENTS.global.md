# Chính Sách Workflow Toàn Cục Cho Codex

Tài liệu này định nghĩa workflow chain toàn cục cho các tác vụ coding.

Nếu cần bản giới thiệu tổng thể theo góc nhìn tác giả trước khi đi vào policy vận hành, đọc thêm:
`skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md`

Nếu cần bản tham chiếu nội bộ thiên về mechanics, validator, CI và rollout status, đọc thêm:
`skills/orchestration/codex-workflow-chain/references/workflow-overview.md`

## Chính Sách Ngôn Ngữ Và Mã Hóa

- Mặc định trao đổi với người dùng bằng tiếng Việt.
- Mặc định nội dung tài liệu hướng dẫn và báo cáo bàn giao bằng tiếng Việt, trừ khi người dùng yêu cầu ngôn ngữ khác.
- Khi cập nhật file văn bản (`.md`, `.txt`, `.yml`, `.yaml`, `.json`), lưu dưới dạng UTF-8.
- Trong bước Xác Minh, bắt buộc kiểm tra lỗi mã hóa tiếng Việt cho các file văn bản vừa thay đổi.

## Chuỗi Workflow Bắt Buộc

Với mọi yêu cầu coding, workflow đầy đủ vẫn đi theo chain 8 bước.
Danh sách 5 ý dưới đây chỉ là bản tóm tắt điều hành, không thay cho định nghĩa step-by-step:

Với mọi yêu cầu coding:
1. Làm rõ yêu cầu và ràng buộc.
2. Lập kế hoạch triển khai ngắn gọn.
3. Triển khai thay đổi nhỏ, tập trung.
4. Xác minh bằng các kiểm tra phù hợp, bao gồm kiểm tra mã hóa tiếng Việt cho tài liệu thay đổi.
5. Báo cáo thay đổi, rủi ro và bước tiếp theo.

Diễn giải theo workflow chain hiện tại:
- `s01` Clarify: làm rõ yêu cầu, `work_item_type`, context, scope draft, assumption, dependency, risk ban đầu và `governance context` liên quan.
- `s04` Acceptance + DoR: chốt acceptance criteria, `Definition of Ready` và mức độ phù hợp với `governance` trước khi sang `Technical Approach` và implementation planning.
- `s08` Verify + DoD: chốt `Definition of Done` và mức độ `governance compliance`; khi có packaging/rollout phải nêu rõ release readiness và handoff sang lane deploy tương ứng.

## Rule Cứng: Spec/Design Trước Code

- Không được vào `s07 Implement` trước khi đã đi qua `s04 Acceptance + DoR`, `s05 Technical Approach` và `s06 Task Plan`.
- Điều kiện tối thiểu để bắt đầu code production:
  - `s04` đã có acceptance criteria đo được và verdict `DoR` rõ.
  - `s05` đã có technical approach đủ để khóa boundary bị tác động và validation plan.
  - `s06` đã có task plan đủ để biết thứ tự thực hiện và verify path.
- Với `planning_track=quick`, design có thể ngắn, nhưng vẫn phải có `s05` và `s06`; không được nhảy thẳng từ clarify sang code.
- Với work item chạy theo `SDD`, không được implement nếu `spec` chưa ở trạng thái `approved|frozen`, trừ khi đã có `spec-change` hoặc `governance-exception` được ghi nhận đúng rule.
- Nếu có tình huống khẩn cấp buộc phải rút ngắn authoring trước code, phải ghi rõ exception hoặc waiver theo `project-context/governance-decision-model.md`; không được bỏ qua im lặng rồi backfill tài liệu như thể chưa từng lệch quy trình.

## Rule Cứng: Brainstorming Có Kỷ Luật

- Trước khi chốt `s05 Technical Approach`, phải có `option analysis` ở mức phù hợp với độ phức tạp của work item.
- Mức tối thiểu của `option analysis`:
  - mục tiêu cần giải quyết đã rõ
  - có phương án để so sánh
  - có 1 phương án khuyến nghị với lý do rõ
  - có điều cần kiểm chứng trước hoặc trong implement
- Nếu bài toán không phải một đường thẳng hiển nhiên, phải nêu ít nhất 2 phương án.
- Với `planning_track=quick`, được phép viết ngắn, nhưng vẫn phải có ít nhất 1 hướng thay thế hoặc 1 hướng bị loại để chứng minh đã so sánh.
- Không được chốt approach chỉ theo cảm tính hoặc “quen tay”.
- Không được dùng brainstorming như cớ để kéo dài discovery vô hạn; đầu ra phải phục vụ trực tiếp cho `s05` và `s06`.
- Nếu chưa đủ dữ liệu để brainstorm nghiêm túc, phải phản ánh blocker hoặc assumption ở `s03 Open Questions` thay vì ép chọn phương án.

## Rule Cứng: Ưu Tiên Giải Pháp Nhỏ Nhất Đủ Đúng

- Ở `s05 Technical Approach`, nếu một phương án nhỏ hơn vẫn đạt acceptance criteria, constraint hiện tại, `governance` liên quan và nhu cầu kiểm chứng chính, phải ưu tiên phương án đó.
- Không được mở thêm abstraction, layer, service, framework, schema split, queue, cache hoặc config surface mới chỉ vì nhu cầu giả định trong tương lai.
- Nếu chọn phương án lớn hơn, `technical approach` phải nêu rõ vì sao phương án nhỏ hơn không đủ:
  - không đạt acceptance criteria hoặc quality constraint hiện tại
  - không đạt yêu cầu an toàn, vận hành hoặc `governance`
  - requirement in-scope buộc phải mở boundary lớn hơn ngay bây giờ
- Với `planning_track=quick`, mặc định ưu tiên delta nhỏ nhất trên đường đi hiện có; không rewrite hoặc redesign boundary nếu chưa có lý do cụ thể.
- `Giải pháp nhỏ nhất đủ đúng` không có nghĩa là làm tạm bợ hoặc cắt bớt test, verify, review, docs hay `governance`.

## Rule Cứng: Planning Execution-Oriented

- Trước khi bắt đầu `s07 Implement`, `s06 Task Plan` phải đủ rõ để triển khai mà không cần tự phát minh lại design.
- Mức tối thiểu của `execution-oriented task plan`:
  - nêu rõ `owned_scope` hoặc file/path chính sẽ tạo hoặc sửa khi có thể xác định
  - có thứ tự thực hiện hoặc dependency rõ
  - có `verify path` đủ dùng cho từng task hoặc từng batch
  - có checkpoint review hoặc governance khi scope cần
- Không được dùng task plan kiểu placeholder như:
  - `xử lý edge case`
  - `thêm validation phù hợp`
  - `viết test`
  - `sửa phần liên quan`
  nếu không nêu rõ sẽ chạm đâu và kiểm thế nào
- Với `planning_track=quick`, task plan có thể ngắn, nhưng vẫn phải nêu ít nhất phần chạm chính và cách verify chính.
- Nếu task plan vẫn buộc implementer phải tự suy diễn lại approach, phải quay lại `s05` hoặc viết lại `s06` trước khi code.

## Rule Cứng: TDD Cho Behavior Change

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

## Rule Cứng: Worktree Cho Change Lớn Hoặc Rủi Ro

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

## Rule Cứng: Review Sớm, Không Đợi Cuối

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

## Rule Cứng: Review Hai Tầng

- Mọi review diễn ra trong `s07 Implement` phải kiểm `spec compliance` trước, rồi mới tới `code quality`.
- `spec compliance` phải trả lời tối thiểu:
  - change có đúng acceptance criteria, approach, spec và scope đã chốt không
  - có lệch `governance` hoặc spec drift chưa được ghi nhận không
- Chỉ sau khi `spec compliance` đã pass hoặc đã có exception rõ mới được chuyển sang `code quality`.
- Với `planning_track=enterprise` hoặc phần logic/contract chính, review hai tầng phải được thể hiện thành hai bước rõ ràng, không gộp mơ hồ.
- Với `quick` và `full`, có thể review trong cùng một lượt, nhưng verdict vẫn phải theo thứ tự `spec compliance -> code quality`.
- `code quality` không thay cho `spec compliance`; code sạch nhưng lệch spec vẫn là fail.

## Rule Cứng: Subagent Chỉ Cho Task Độc Lập

- Ở `s07 Implement`, chỉ được bật `subagent` hoặc `multi_agent` khi task thuộc nhóm `task độc lập`.
- `task độc lập` trong workflow này phải thỏa tối thiểu:
  - `s06 Task Plan` đã đủ rõ để giao việc
  - `owned_scope` hoặc `owned_paths` tương đối rời nhau
  - `merge path` hoặc handoff path rõ
  - `verify path` hoặc `verification_owner` rõ
- Không bật `subagent` cho task nhỏ nhưng tightly coupled, task vừa khám phá context xong, task có ownership chồng lấn mạnh hoặc task chưa có đường verify rõ.
- `agentic` vẫn là mode mặc định; nếu chưa đạt điều kiện của `task độc lập`, phải fallback về `agentic` hoặc `sequential_multi_role`.
- `subagent` không được bypass `review`, `testing`, `verify` hay `DoD`.

## Rule Cứng: Không Tự Tuyên Bố Done

- Không agent, worker hay implementer nào được tuyên bố `done` trước khi `s08 Verify + DoD` có verdict `DoD` rõ.
- `review pass`, `test pass` cục bộ, `code xong`, `merge xong` hoặc `worktree` đã sạch không tương đương `DoD`.
- Với `multi_agent` hoặc `subagent`, chỉ được tổng hợp evidence trong `s07`; verdict hoàn tất chỉ hợp lệ khi `s08` kết luận.
- Nếu còn check bị bỏ qua, exception còn mở, gap chưa có owner rõ hoặc evidence chưa đủ, chỉ được báo `PARTIAL` hoặc chưa hoàn tất; không được báo `done`.
- `DoD` là gate đóng work item ở mức delivery, không phải trạng thái cảm tính của implementer.

## Rule Cứng: Branch/Worktree Chỉ Chốt Sau Verify

- Khi work item dùng `branch` hoặc `worktree`, quyết định `cleanup`, `close`, `remove` hoặc `merge` chỉ hợp lệ sau khi `s08 Verify + DoD` có verdict `DoD` rõ.
- `branch` sạch, `worktree` sạch, diff đã review hoặc code đã merge cục bộ không phải evidence để chốt branch/worktree sớm.
- Nếu verify còn pending, finding còn mở, exception còn mở hoặc evidence chưa đủ, branch/worktree phải giữ trạng thái đang chờ; không được coi là sẵn sàng chốt.
- Với `multi_agent` hoặc nhiều `worktree`, chỉ được hợp nhất hoặc dọn sau khi `verify path` và handoff path đã kết thúc ở `s08`.
- Rule này chỉ siết thời điểm chốt branch/worktree; không thay cho branch strategy của repo.

## Rule Mặc Định: Default An Toàn

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

## Rule Cứng: Human-Controlled Gates

- Workflow này vận hành theo model `AI proposes, human approves`.
- AI được quyền phân tích, draft artifact, propose option, propose approach, propose task plan, implement, chạy test, tổng hợp evidence và nêu recommendation.
- AI không được tự:
  - approve work item hoặc change package
  - pass `DoR`
  - pass `Approach`
  - pass `Task Plan`
  - pass `DoD`
  - pass `Release`
  - pass `Business Acceptance`
  - approve `governance-exception` hoặc `waiver` nếu authority thuộc human role khác
- Mọi human-controlled gate chỉ được xem là pass khi đồng thời có:
  - artifact nguồn sự thật của step hoặc protocol đã được cập nhật
  - evidence đủ để reviewer kiểm
  - owner hoặc approver đúng authority đã chốt rõ
- Human pass phải explicit; không suy diễn từ comment, `review pass` kỹ thuật, `test pass` cục bộ hoặc việc artifact đã tồn tại.
- Nếu human-controlled gate chưa pass, workflow phải `BLOCKED`, quay lại step trước, hoặc dừng trước gate tiếp theo; không được đi tiếp chỉ vì AI đánh giá là “đủ tốt”.
- `role_signoffs` ghi role có authority signoff cho `dor`, `approach`, `task_plan`, `release`, `business_acceptance`, `dod`.
- `gate_reviews` ghi human reviewer thực tế và thời điểm review cho từng gate; note finalized ở `s04`, `s05`, `s06`, `s08` phải có reviewer + timestamp cho gate chính của step.

Cách đọc nhanh theo ngôn ngữ business:
- `s01` Clarify: nhận yêu cầu thô và context, trả ra bản hiểu chung, scope ban đầu và `governance context`.
- `s02` Business Goal: nhận bản hiểu chung, trả ra mục tiêu business, giá trị mong đợi và non-goals.
- `s03` Open Questions: nhận mục tiêu cùng thông tin hiện có, trả ra missing input, conflict, `governance blocker` và owner cần quyết định.
- `s04` Acceptance + DoR: nhận business goal và câu trả lời, trả ra acceptance criteria đo được, readiness verdict và `governance checks` cho readiness.
- `s05` Technical Approach: nhận acceptance criteria, trả ra approach nhỏ nhất đủ đúng, boundary bị tác động và `governance exception` nếu có lệch chuẩn.
- `s06` Task Plan: nhận approach, trả ra task plan nhỏ, có thứ tự, có thể verify và có đủ checkpoint review/governance.
- `s07` Implement: nhận task plan, trả ra thay đổi thực tế trong code/config/doc, test cho behavior change, `worktree` khi change lớn hoặc rủi ro, review sớm cho phần chính, subagent chỉ khi task độc lập và exception nếu implementation cần lệch chuẩn.
- `s08` Verify + DoD: nhận thay đổi và criteria, trả ra evidence, coverage, mức độ `governance compliance`, verdict cuối cùng về việc work item đã `done` hay chưa, và quyết định chốt `branch/worktree` khi có.
- Nếu còn bất định về track, capability hoặc gate: quay về `default an toàn`, không tự ý chọn đường rủi ro hơn.

## Cổng Chất Lượng Bắt Buộc

Trước khi bàn giao cuối cùng, chạy các kiểm tra phù hợp:
- Kiểm thử đơn vị/tích hợp.
- Lint hoặc phân tích tĩnh.
- Build/type check.
- Kiểm tra bảo mật khi áp dụng.
- Kiểm tra mã hóa tiếng Việt cho file văn bản thay đổi.
- Khi scope có container hoặc deploy: kiểm tra build image, validate `compose.yaml` hoặc manifest tương ứng, và nêu rõ smoke hoặc rollback plan.

Nếu không thể chạy kiểm tra nào, phải nêu rõ phần bị bỏ qua và lý do.

## Governance Pack Mặc Định

- Nếu không có chỉ định khác, `governance_ref` mặc định trỏ `project-context/project-context.md`.
- `governance_profile=default|strict|regulated` nên dùng checklist tương ứng trong `project-context/checklists/`.
- `governance_profile`, `governance_status` và trigger mở `governance-exception` phải theo `project-context/governance-decision-model.md`.
- `approved_by` của exception hoặc waiver phải theo `project-context/governance-role-model.md`, không suy diễn chỉ từ `role_signoffs`.
- Nếu có `governance-exception` còn mở quá một step hoặc ảnh hưởng `DoD`, `release`, `business_acceptance`, phải cập nhật thêm `project-context/governance-exception-register.md`.
- `work-items/` là canonical artifact root cho workflow artifacts thật; khi materialize note workflow vào repo, mặc định đặt dưới `work-items/<work_item_slug>/`.
- Khi materialize workflow note thành file, ưu tiên scaffold qua `wfc scaffold --work-item <work_item_slug>` hoặc `wfc scaffold-step --work-item <work_item_slug> --step <sNN>` để giữ naming, frontmatter và governance block đồng nhất ngay từ đầu. Nếu repo có root scripts tương ứng thì `npm run scaffold:workflow` và `npm run scaffold:workflow-step` vẫn là alias hợp lệ.
- Nếu work item chạy `multi_agent`, authoring flow phải chạy thêm `wfc exec --workflow-root work-items`. Nếu repo đã map root script thì `npm run validate:workflow:execution -- --workflow-root work-items` là alias tương đương.
- Nếu work item có `planning_track`, authoring flow nên chạy thêm `wfc plan --workflow-root work-items`. Nếu repo đã map root script thì `npm run validate:workflow:planning -- --workflow-root work-items` là alias tương đương.
- Khi materialize workflow note thành file, nên chạy validator workflow chuẩn qua `wfc validate --workflow-root work-items --project-root <repo-root>` trước khi bàn giao cuối. Nếu repo đã map root script thì `npm run validate:workflow -- --workflow-root work-items --project-root <repo-root>` là alias tương đương.

## Yêu Cầu Skill

Với tác vụ coding, luôn áp dụng skill `codex-workflow-chain`.
Nếu output có artifact theo hệ Obsidian, áp dụng thêm skill tương ứng theo quy tắc dưới đây.
Khi work item phụ thuộc nhiều tài liệu ngoài hoặc corpus lớn, có thể áp dụng thêm `notebooklm` như skill research/tooling phụ trợ.
Khi scope chạm `Dockerfile`, `compose.yaml`, image contract, runtime deploy, pipeline release, promotion `dev/uat/prod`, rollout hoặc rollback, áp dụng lane DevOps tương ứng: dùng `deployment-devops` khi cần chốt bức tranh tổng; dùng `containerization-packaging` cho packaging; dùng `platform-runtime-deployment` cho runtime deploy; dùng `ci-cd-release` cho pipeline, tagging, promotion và approval.
Khi scope là frontend, dùng thêm skill chuyên biệt đúng step: ở step 5 dùng `frontend-experience-design` khi cần khóa screen behavior, UI state, responsive rule hoặc visual direction; ở step 7 dùng `react-web-implementation` khi stack là React web hoặc Next.js và cần framework-specific guidance; ở step 8 dùng `frontend-quality-review` khi thay đổi chạm surface UI và dùng `react-best-practices-review` khi cần review render/data boundary, effect hygiene hoặc server/client split của React.

## Yêu Cầu Execution Runtime

- Mặc định mọi step bắt đầu ở `execution_mode=agentic`.
- Chỉ nâng lên `multi-agent` khi step contract đã đủ rõ, có `coordinator`, có `verification owner` hoặc audit path rõ, và có thể chia `owned_scope` hoặc `owned_paths` tương đối rời nhau.
- Nếu runtime không hỗ trợ delegation ổn định, vẫn phải bám cùng spec nhưng chạy ở chế độ `sequential multi-role`; không được bỏ qua contract, handoff hay audit chỉ vì thiếu sub-agent thật.
- Khi `multi-agent` hoặc `sequential multi-role` được dùng, `coordinator` là đầu mối duy nhất được kết luận handoff cuối step.
- Output của worker không được xem là output cuối của step cho tới khi đã merge vào note `.md` nguồn sự thật và đi qua audit/gate tương ứng.
- Nếu materialize workflow note, nên khai báo `execution_mode`, `execution_roles`, `review_mode`, `verification_owner`, `role_signoffs`, `gate_reviews` và block `## Execution Topology` hoặc runtime artifacts theo tài liệu tham chiếu runtime; `role_signoffs` nên cover tối thiểu `dor`, `approach`, `task_plan`, `release`, `business_acceptance`, `dod`.
- Nếu cần route workflow theo độ sâu khác nhau mà vẫn giữ backbone 8 bước, dùng `planning_track=quick|full|enterprise`; không tạo workflow song song mới.
- Khi nhiều role nghiệp vụ cùng tham gia một step, ưu tiên trace contribution theo block `## Role Outputs` trong note chính trước khi tách artifact riêng cho từng role.
- Khi work item chạy theo SDD, workflow note nên khai báo `sdd_mode`, `spec_refs` và `spec_status`; step 4 phải xử lý `spec-freeze-gate`, step 5-7 phải dùng `spec-change` khi lệch frozen spec, và step 8 phải có `spec-coverage-report` hoặc lý do bỏ qua rõ ràng.

## Giải Nghĩa Nhanh Cách Áp Skill

Chính sách này được đọc theo 6 lớp:

- Lớp step: 8 bước delivery từ `Clarify` đến `Verify + DoD`.
- Lớp governance: `constitution`, `project-context`, `checklist`, `exception/waiver` và rule dùng chung được nhúng vào gate của step.
- Lớp SDD: dùng `BRD/SRS`, requirement IDs, spec freeze, spec change và spec coverage để spec điều khiển design/code/test khi scope yêu cầu.
- Lớp skill nghiệp vụ: các skill phân tích, kiến trúc, delivery và guardrail được gọi theo step.
- Lớp artifact: khi một step được materialize thành tài liệu hoặc artifact Obsidian, phải gọi thêm skill đúng loại file.
- Lớp execution topology: step được vận hành theo `agentic` hoặc `multi_agent`; nếu runtime không hỗ trợ delegation ổn định thì fallback `sequential_multi_role`.

Diễn giải thực tế:

- `codex-workflow-chain` là skill điều phối bắt buộc để buộc tác vụ coding đi qua 8 step ở trên.
- `agentic` là mode mặc định; `multi_agent` chỉ bật khi có lý do phối hợp thật sự; nếu runtime không hỗ trợ delegation ổn định thì fallback `sequential_multi_role`.
- `spec/design before code` là gate cứng của execution runtime: execution loop không được tự quyết định bỏ qua `s04-s06`.
- `brainstorming có kỷ luật` là gate chất lượng của `s05`: agent không được nhảy thẳng vào technical approach mà không qua so sánh phương án ở mức phù hợp.
- `ưu tiên giải pháp nhỏ nhất đủ đúng` là rule chọn phương án của `s05`: nếu phương án nhỏ hơn đã đủ đáp ứng scope hiện tại thì không mở rộng design chỉ vì nhu cầu giả định.
- `planning execution-oriented` là gate chất lượng của `s06`: agent không được vào implement với task plan còn mơ hồ hoặc còn nhiều placeholder.
- `TDD cho behavior change` là rule thực thi của `s07`: bug fix, feature behavior, validation rule, contract change và refactor có regression risk phải ưu tiên test trước rồi mới code.
- `worktree cho change lớn hoặc rủi ro` là rule cô lập workspace của `s07`: `enterprise`, change kéo dài, nhiều boundary/file hoặc risk cao phải ưu tiên tách workspace thay vì làm trực tiếp trong cây làm việc chính.
- `review sớm, không đợi cuối` là rule review của `s07`: review cho batch/task rủi ro hoặc phần quan trọng phải diễn ra trong implement, không được dồn hết sang `s08`.
- `review hai tầng` là rule thứ tự review của `s07`: phải xác nhận đúng spec/approach trước, rồi mới bàn sâu tới chất lượng code.
- `subagent chỉ cho task độc lập` là rule delegation của `s07`: chỉ được tách worker khi task plan, ownership, merge path và verify path đủ rõ để không tạo conflict hoặc drift.
- `không tự tuyên bố done` là rule kết luận của `s08`: chưa có verdict `DoD` thì chưa được coi là hoàn tất, dù implementation hay review đã xong.
- `governance` không phải step riêng; `governance context` thường xuất hiện ở `Clarify` hoặc `Open Questions`, `governance checks` thường được chốt ở `Acceptance + DoR`, `Task Plan`, `Verify + DoD`, còn `governance exception` phải xuất hiện rõ ở `Technical Approach` hoặc `Implement` khi có lệch chuẩn.
- `notebooklm` là skill research/tooling phụ trợ khi step cần query hoặc tổng hợp corpus lớn ngoài codebase.
- `deployment-devops` là skill điều phối DevOps tổng khi step chạm nhiều layer DevOps cùng lúc.
- `containerization-packaging` là skill delivery cho `Dockerfile`, `.dockerignore`, `compose.yaml` và packaging contract theo ngôn ngữ hoặc workload.
- `platform-runtime-deployment` là skill delivery cho topology deploy trên `docker`, `docker swarm`, `k8s`.
- `ci-cd-release` là skill delivery cho pipeline CI/CD, registry, tagging, promotion, approval và release gate.
- Nếu step được lưu thành note `.md`, `obsidian-markdown` là bắt buộc.
- Nếu step có thêm sơ đồ `.canvas`, phải bổ sung `json-canvas`.
- Nếu step có thêm dashboard hoặc index `.base`, phải bổ sung `obsidian-bases`.
- `.canvas` và `.base` chỉ là artifact phụ; không được thay note `.md` làm nguồn sự thật.

Hệ quả vận hành:

- Cột skill nghiệp vụ trong workflow chain không thay thế luật artifact.
- Một step có thể vừa cần skill nghiệp vụ, vừa cần skill Obsidian.
- Khi đọc policy này, hiểu rằng `codex-workflow-chain` là lớp bắt buộc cho luồng làm việc, execution runtime quyết định cách step được vận hành, còn skill Obsidian là lớp bắt buộc cho hình thức artifact.
- Với note workflow materialized thành file, metadata nên tách rõ `content_skills` và `artifact_skills` thay vì gộp chung để tránh nhầm giữa skill tạo nội dung và skill tạo hình thức artifact.

## Quy Tắc Multi-Agent Và Handoff

- `multi-agent` chỉ được dùng khi coordinator có thể nêu rõ lý do chọn mode, role nào tham gia, worker nào sở hữu phần nào và ai là người verify cuối.
- Worker chỉ được handoff về `coordinator`, không handoff trực tiếp sang step tiếp theo.
- Mỗi worker handoff phải có tối thiểu: `status`, `summary`, `outputs_produced`, `evidence`, `open_issues`, `recommended_next_action`.
- Nếu `owned_paths` hoặc `owned_scope` chồng lấn mạnh và chưa có merge strategy rõ, phải fallback về `agentic` hoặc `sequential multi-role`.
- Final audit luôn chạy trên output đã merge; không đóng step dựa trên partial output rời.
- Với step 7 và step 8, nếu chưa xác định rõ verification owner thì không bật `multi-agent`.

## Quy Tắc DevOps

- `deployment-devops` dùng để khóa DevOps scope tổng, environment matrix và các guard xuyên layer.
- `containerization-packaging` dùng khi trọng tâm là container hóa local hoặc contract build image.
- `platform-runtime-deployment` dùng khi trọng tâm là runtime deploy cho `dev`, `uat`, `prod`.
- `ci-cd-release` dùng khi trọng tâm là pipeline, artifact flow, approval và promotion giữa môi trường.
- `local` phải có baseline chạy bằng `Dockerfile` và `compose.yaml` nếu work item có mục tiêu container hóa.
- `dev`, `uat`, `prod` phải khai báo rõ runtime mục tiêu là `docker`, `docker swarm` hoặc `k8s`; không để mơ hồ ở step design.
- Ưu tiên promote cùng một image contract qua các môi trường; khác biệt môi trường nên nằm ở config, secrets, replica và rollout strategy.
- Không bake secrets hoặc giá trị môi trường đặc thù vào image.
- Mọi rollout plan phải có verification sau deploy và rollback path rõ ràng.

## Quy Tắc NotebookLM

- `notebooklm` là skill tích hợp tool ngoài, chỉ dùng khi cần research/query corpus lớn hoặc nhiều tài liệu ngoài codebase.
- `notebooklm` không thay cho `step-goal-contract`, không thay cho quyết định cuối trong note workflow và không thay cho verify kỹ thuật trực tiếp trên codebase.
- Ưu tiên dùng `notebooklm` ở step 1, 3, 5 và khi cần ở step 8.
- Output từ `notebooklm` chỉ được xem là supporting input; mọi kết luận chính thức phải được chuẩn hóa lại vào note `.md` của step.
- Nếu `NotebookLM` bị chặn bởi auth, network hoặc tool failure, fallback về đọc tay hoặc flow research khác và phải nêu rõ limitation.

## Quy Tắc Artifact Obsidian

- Artifact chuẩn cho tài liệu workflow là note `.md`; nếu step có lưu artifact phân tích, thiết kế, kế hoạch hoặc verify thành file, mặc định file chuẩn là `.md` và bắt buộc áp dụng `obsidian-markdown`.
- File `.canvas` chỉ là artifact phụ để trực quan hóa; không được thay thế note `.md` làm nguồn sự thật cho quyết định, phạm vi, criteria hoặc kết luận verify.
- File `.base` chỉ là artifact phụ để tổng hợp hoặc dashboard; không được thay thế note `.md` làm nguồn sự thật cho yêu cầu, kế hoạch hoặc kết luận verify.
- Khi task tạo hoặc sửa file `.base`, bắt buộc áp dụng `obsidian-bases`.
- Khi task tạo hoặc sửa file `.canvas`, bắt buộc áp dụng `json-canvas`.
- Hiện tại chưa bắt buộc `obsidian-cli`; chỉ xem xét khi có yêu cầu riêng.

## Ma Trận Artifact Theo Step

- Step 1-4: nếu lưu artifact, chỉ dùng `.md`; không dùng `.canvas` hoặc `.base`.
- Step 5: bắt buộc có `.md`; được phép có thêm `.canvas` để minh họa kiến trúc hoặc flow; không dùng `.base`.
- Step 6: bắt buộc có `.md`; được phép có thêm `.canvas` cho task map và `.base` cho task/index dashboard.
- Step 7: mặc định không yêu cầu artifact Obsidian riêng; chỉ dùng `obsidian-markdown` nếu có tạo hoặc sửa tài liệu `.md` trong phạm vi implement; không dùng `.canvas` hoặc `.base` nếu không có yêu cầu rõ.
- Step 8: nếu lưu report verify, bắt buộc có `.md`; được phép có thêm `.base` cho dashboard tổng hợp kết quả; không dùng `.canvas` trừ khi người dùng yêu cầu rõ một sơ đồ điều tra riêng.

Tóm tắt cách nhớ:

- Viết tài liệu workflow: luôn nghĩ đến `obsidian-markdown`.
- Vẽ để minh họa: thêm `json-canvas`.
- Lập bảng tổng hợp: thêm `obsidian-bases`.
- Quyết định chuẩn, criteria, risk và kết luận verify: luôn phải quay về note `.md`.

Ngoài các block nghiệp vụ theo step, note workflow nên có thêm:
- `## Traceability` để truy vết business -> readiness -> design -> implementation -> verify.
- metadata `work_item_type` để phân biệt `FEATURE|BUG|CHANGE|REFACTOR|RESEARCH`.
- metadata `workflow_stage` để tách phần discovery và delivery ngay trong cùng workflow chain.

Nếu lưu step thành file `.md`, phải dùng template output chuẩn theo step trong `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`, bao gồm naming, frontmatter và block contract/spec tương ứng.
Khi cần rule runtime chi tiết hơn cho `agentic`, `multi-agent`, role contract, handoff/merge protocol và `notebooklm`, đọc thêm:
`skills/orchestration/codex-workflow-chain/references/execution-runtime.md`

## Quy Tắc Xung Đột

Hướng dẫn cục bộ theo project có thể bổ sung quy tắc chặt hơn.
Chuỗi workflow toàn cục này vẫn bắt buộc, trừ khi người dùng yêu cầu ghi đè rõ ràng.

## Định Dạng Bàn Giao Cuối

Dùng thứ tự sau:
1. Kế hoạch đã thực hiện.
2. File đã thay đổi.
3. Kết quả xác minh.
4. Rủi ro còn lại và bước tiếp theo.
