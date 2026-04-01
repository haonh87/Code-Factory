# Chính Sách Workflow Toàn Cục Cho Codex

Tài liệu này định nghĩa workflow chain toàn cục cho các tác vụ coding.

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
- Step 1 không chỉ restate yêu cầu mà còn phải làm `discovery framing` ở mức đủ cho developer, bao gồm `work_item_type`, user/business context ban đầu, scope draft, assumption, dependency và risk ban đầu.
- Step 4 là điểm chốt `Definition of Ready` trước khi chuyển hẳn sang technical approach và implementation planning.
- Step 8 là điểm chốt `Definition of Done` cho phạm vi technical work item; khi scope có packaging hoặc rollout, step này đồng thời phải nêu rõ release readiness và handoff sang lane deploy tương ứng.

Cách đọc nhanh theo ngôn ngữ business:
- Step 1 nhận yêu cầu thô và bối cảnh ban đầu, trả ra bản hiểu chung về yêu cầu và phạm vi ban đầu.
- Step 2 nhận bản hiểu chung từ step 1, trả ra mục tiêu business, giá trị mong đợi và phần không làm.
- Step 3 nhận mục tiêu business cùng thông tin hiện có, trả ra danh sách điểm còn thiếu hoặc cần quyết định thêm.
- Step 4 nhận mục tiêu business và câu trả lời cho phần mơ hồ, trả ra acceptance criteria đo được và kết luận đã sẵn sàng hay chưa.
- Step 5 nhận acceptance criteria đã chốt, trả ra cách làm kỹ thuật được chọn và boundary bị tác động.
- Step 6 nhận cách làm kỹ thuật đã chọn, trả ra kế hoạch triển khai thành các task nhỏ có thứ tự.
- Step 7 nhận kế hoạch triển khai, trả ra thay đổi thực tế trong code/config/doc.
- Step 8 nhận thay đổi thực tế và acceptance criteria, trả ra bằng chứng đạt/chưa đạt và kết luận mức độ hoàn tất.

## Cổng Chất Lượng Bắt Buộc

Trước khi bàn giao cuối cùng, chạy các kiểm tra phù hợp:
- Kiểm thử đơn vị/tích hợp.
- Lint hoặc phân tích tĩnh.
- Build/type check.
- Kiểm tra bảo mật khi áp dụng.
- Kiểm tra mã hóa tiếng Việt cho file văn bản thay đổi.
- Khi scope có container hoặc deploy: kiểm tra build image, validate `compose.yaml` hoặc manifest tương ứng, và nêu rõ smoke hoặc rollback plan.

Nếu không thể chạy kiểm tra nào, phải nêu rõ phần bị bỏ qua và lý do.

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
- Nếu materialize workflow note, nên khai báo `execution_mode`, `execution_roles` và block `## Execution Topology` theo tài liệu tham chiếu runtime.

## Giải Nghĩa Nhanh Cách Áp Skill

Chính sách này được đọc theo 4 lớp:

- Lớp điều phối: `codex-workflow-chain` ép tác vụ coding đi theo workflow chain chuẩn.
- Lớp execution runtime: chọn `agentic`, `multi-agent` hoặc `sequential multi-role` để vận hành step.
- Lớp skill nghiệp vụ: các skill phân tích, kiến trúc, delivery và guardrail được gọi theo step.
- Lớp artifact: khi một step được materialize thành tài liệu hoặc artifact Obsidian, phải gọi thêm skill đúng loại file.

Diễn giải thực tế:

- `codex-workflow-chain` luôn là lớp bắt buộc cho tác vụ coding.
- `agentic` là mode mặc định; `multi-agent` chỉ bật khi có lý do phối hợp thật sự.
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
