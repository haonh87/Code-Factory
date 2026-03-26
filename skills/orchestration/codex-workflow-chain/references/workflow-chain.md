# Tài Liệu Tham Chiếu Workflow Chain

## Nguyên Tắc Mô Hình

- Workflow chain mặc định của gói này là chuỗi delivery 8 bước cho một yêu cầu coding cụ thể.
- Mỗi workflow step là một bước nghiệp vụ thật trong quá trình xử lý yêu cầu, không phải một trường mô tả hay một gate kiểm tra.
- `goal`, `input`, `output`, `done_when`, `constraints`, isks`, `timebox` là bộ metadata chuẩn có thể gắn vào từng step để chi tiết hóa contract thực thi, quality gate và điều kiện handoff khi cần.
- Trong tài liệu workflow, `input` và `output` phải được viết theo ý nghĩa business trước; tên artifact kỹ thuật chỉ đặt trong ngoặc để truy vết, không dùng thay cho nội dung bàn giao.
- Metadata không được xem là step riêng và không được dùng để thay thế workflow 8 bước.
- Skill được gắn vào step để hỗ trợ phân tích, thực thi và kiểm soát chất lượng.
- Một step có thể dùng nhiều skill, và một skill có thể phục vụ nhiều step.

## Vai Trò Của Các Skill Trong Chuỗi

- `codex-workflow-chain`: skill điều phối toàn chuỗi workflow.
- `requirement-analysis`: skill chuẩn hóa yêu cầu, phạm vi, câu hỏi mở và acceptance criteria draft.
- `product-thinking`: skill chốt giá trị business và user value.
- `brainstorming`: skill tạo phương án và phân tích trade-off ở giai đoạn làm rõ giải pháp kỹ thuật.
- `system-design`: skill đề xuất và chọn technical approach.
- `domain-architecture`: skill chốt domain module, bounded context, ownership và layer rule cho kiến trúc backend.
- `frontend-architecture`: skill chốt feature module, route ownership, UI/state boundary, public contract và shared rule cho frontend application.
- `database-design`: skill thiết kế schema, relationship, ownership, retention và audit ở mức design.
- `deployment-devops`: skill điều phối DevOps tổng thể, khóa environment matrix và chọn skill chuyên trách cho `local`, `dev`, `uat`, `prod`.
- `containerization-packaging`: skill khóa contract `Dockerfile`, `.dockerignore`, `compose.yaml`, build artifact và packaging pattern theo ngôn ngữ hoặc workload.
- `platform-runtime-deployment`: skill khóa runtime deploy trên `docker`, `swarm`, `k8s`, cùng topology, networking, secrets, storage, scaling và rollout/rollback.
- `ci-cd-release`: skill khóa pipeline CI/CD, registry, tagging, promotion flow, approval control và release guard.
- `task-breakdown-planner`: skill chia thiết kế thành các task nhỏ để thực thi.
- `implementation`: skill triển khai thay đổi thực tế trong codebase.
- `testing`: skill verify theo acceptance criteria và quality gates, với chiến lược rõ giữa unit test, integration/database test và feature test.
- `code-scan-review`: skill quét code theo ngôn ngữ để kiểm tra syntax, static analysis, security scan và performance heuristic.
- `database-change-review`: skill rà soát migration safety, compatibility, query risk và release recommendation cho thay đổi database.
- `step-goal-contract`: skill chốt contract cho từng step trước khi thực thi.
- `input-readiness-assessor`: skill đánh giá mức sẵn sàng đầu vào (`READY|BLOCKED`).
- `step-goal-auditor`: skill kiểm định output thực tế so với contract của step.
- `definition-of-ready-gate`: skill chốt Definition of Ready ở mức work item trước khi sang technical approach và implementation planning.
- `definition-of-done-gate`: skill chốt Definition of Done ở mức work item sau khi verify kỹ thuật.
- `obsidian-markdown`: skill tạo và chỉnh sửa note/report `.md` theo Obsidian Flavored Markdown.
- `obsidian-bases`: skill tạo và chỉnh sửa `.base` khi cần index hoặc dashboard cho note/artifact.
- `json-canvas`: skill tạo và chỉnh sửa `.canvas` khi cần sơ đồ, flow hoặc task map trực quan.
- `notebooklm`: skill tích hợp NotebookLM qua CLI/MCP khi cần tổng hợp hoặc query corpus lớn ngoài codebase; output của nó chỉ là context phụ, không thay cho note workflow.

## Giải Nghĩa Nhanh Cách Đọc Chuỗi

Chuỗi này nên được đọc theo 4 lớp song song:

- Lớp step: 8 bước delivery từ restate đến verify.
- Lớp skill nghiệp vụ: skill nào chịu trách nhiệm phân tích, thiết kế, triển khai hoặc kiểm định cho step đó.
- Lớp artifact: nếu step được lưu thành file, phải áp đúng skill Obsidian tương ứng với loại file.
- Lớp execution topology: step đang được vận hành theo kiểu `agentic` hay `multi-agent`, ai giữ ownership và handoff ra sao.

Điều này có nghĩa là:

- Một step không chỉ có 1 skill duy nhất.
- `codex-workflow-chain` và `step-goal-contract` là lớp nền để điều phối và khóa contract.
- Skill như `requirement-analysis`, `system-design`, `testing` là lớp nghiệp vụ.
- `obsidian-markdown`, `json-canvas`, `obsidian-bases` là lớp artifact, chỉ bật khi step thực sự sinh ra file tương ứng.
- `agentic` và `multi-agent` là lớp execution topology; chúng quyết định cách step được chạy, không đổi ý nghĩa business của step.
- Chi tiết execution policy, role contract, handoff/merge protocol và tích hợp `notebooklm` xem thêm tại eferences/execution-runtime.md`.
- Ví dụ áp dụng end-to-end xem tại eferences/end-to-end-examples.md`.

## Lớp Execution Topology: `agentic` Và `multi-agent`

Execution topology trả lời câu hỏi: cùng một workflow step sẽ được vận hành bởi một agent hay nhiều agent, theo loop nào, và ai chịu trách nhiệm đóng step.

Nguyên tắc chung:

- Execution topology không tạo step mới và không được bypass workflow 8 bước.
- Execution topology không thay thế skill; nó chỉ quyết định cách skill được tổ chức để thực thi.
- `step-goal-contract` vẫn là contract gốc cho mọi topology.
- `step-goal-auditor`, `definition-of-ready-gate`, `definition-of-done-gate` vẫn là lớp guardrail; đổi topology không làm đổi gate.
- Khi nhiều agent cùng tham gia, note `.md` của step vẫn là nguồn sự thật duy nhất cho kết luận của step đó.

### `agentic`: một agent tự vận hành một step

`agentic` dùng khi một agent có thể giữ trọn ownership của step và tự chạy vòng điều khiển nội bộ trước khi handoff.

Loop chuẩn của `agentic`:

1. Đọc `step-goal-contract` để khóa goal, scope, input, output, constraint và risk.
2. Tự đánh giá readiness của input; nếu thiếu thì báo `BLOCKED` hoặc nêu assumption được chấp nhận.
3. Chọn và dùng các `content_skills` phù hợp với step.
4. Tạo output hoặc artifact của step.
5. Tự đối chiếu output với contract và guardrail liên quan.
6. Kết luận `COMPLETE|REWORK|BLOCKED`, rồi handoff cho step sau hoặc trả blocker.

`agentic` phù hợp khi:

- Scope của step nhỏ hoặc vừa.
- Không có nhiều boundary độc lập cần chia ownership.
- Chi phí phối hợp nhiều agent lớn hơn lợi ích song song hóa.

### `multi-agent`: coordinator điều phối nhiều agent quanh một step

`multi-agent` dùng khi một step có nhiều nhánh độc lập, nhiều boundary chuyên môn hoặc cần tách rõ execution với verification.

Loop chuẩn của `multi-agent`:

1. `Coordinator` đọc `step-goal-contract` và khóa shared goal cho cả step.
2. Coordinator chia work theo ole`, `owned_scope` hoặc `owned_paths`.
3. Mỗi worker dùng skill phù hợp trong phạm vi được giao; không được vượt ownership.
4. Worker trả partial output, evidence hoặc artifact phụ về cho coordinator.
5. Coordinator merge kết quả vào output chuẩn của step và cập nhật note `.md` nguồn sự thật.
6. `Verifier` hoặc chính coordinator chạy audit/gate để quyết định `COMPLETE|PARTIAL|BLOCKED`.

`multi-agent` phù hợp khi:

- Step có nhiều phần việc độc lập có thể làm song song.
- Cần tách vai trò `analyst`, `architect`, `builder`, `tester`, eviewer`.
- Context của step quá lớn nếu dồn hết vào một agent.
- Cần giữ ownership rõ theo module, file path hoặc boundary kiến trúc.

Luật tối thiểu cho `multi-agent`:

- Mọi worker phải dùng cùng shared contract của step.
- `Coordinator` là đầu mối duy nhất được kết luận handoff cuối step.
- Worker không tự đóng step nếu chưa qua merge và audit.
- `owned_scope` hoặc `owned_paths` giữa các worker nên rời nhau để giảm conflict.
- Nếu có artifact phụ như `.canvas` hoặc `.base`, chúng vẫn phải được link về note `.md` chính.

## Đối Ứng Giữa Execution Topology Với Workflow

| Step | Mode mặc định | Khi nào cân nhắc `multi-agent` | Vai trò thường gặp |
|---|---|---|---|
| 1. Restate yêu cầu và discovery framing | `agentic` | Khi phải đọc nhiều nguồn input, nhiều tài liệu hoặc nhiều stakeholder context | `coordinator`, `context-reader`, `restatement-owner` |
| 2. Xác định mục tiêu business | `agentic` | Khi cần tách product angle và delivery angle để đối chiếu | `coordinator`, `product-owner-proxy`, `delivery-challenger` |
| 3. Liệt kê phần còn mơ hồ | `agentic` | Khi phải song song đọc codebase, tài liệu và dependency ngoài | `coordinator`, `codebase-reader`, `question-synthesizer` |
| 4. Viết acceptance criteria và chốt DoR | `agentic` | Khi cần một agent viết criteria và một agent khác kiểm tra testability/readiness | `coordinator`, `criteria-author`, `ready-gate-checker` |
| 5. Đề xuất technical approach | `agentic` hoặc `multi-agent` | Khi solution đụng nhiều backend/frontend/data boundary hoặc cần so sánh nhiều option sâu | `coordinator`, `solution-designer`, `backend-architect`, `frontend-architect`, `data-architect` |
| 6. Chia task | `agentic` hoặc `multi-agent` | Khi cần tách planning theo track thực thi, verify hoặc release | `coordinator`, `planner`, `dependency-reviewer` |
| 7. Implement | `agentic` cho change nhỏ; `multi-agent` cho change lớn | Khi có nhiều module/file ownership có thể triển khai song song | `coordinator`, `builder`, `migration-owner`, `doc-owner` |
| 8. Verify với criteria và chốt DoD | `agentic` hoặc `multi-agent` | Khi cần tách testing, code scan, database review, deployment review và final audit | `coordinator`, `tester`, `scan-reviewer`, `database-reviewer`, `deployment-reviewer`, `auditor` |

## Đối Ứng Giữa Execution Topology Với Skill

| Nhóm skill hoặc skill | Vai trò điển hình trong `agentic` | Vai trò điển hình trong `multi-agent` |
|---|---|---|
| `requirement-analysis`, `product-thinking` | Agent chính tự phân tích và khóa ý nghĩa business của step | Worker kiểu `analyst` hoặc `product-owner-proxy` cung cấp input cho coordinator |
| `brainstorming`, `system-design` | Agent chính tự so sánh phương án rồi chốt recommendation | Worker kiểu `solution-designer`; nhiều worker có thể đại diện cho các option khác nhau |
| `domain-architecture`, `frontend-architecture`, `database-design` | Agent chính gọi sâu theo boundary thật sự bị tác động | Specialist worker sở hữu từng boundary kiến trúc riêng |
| `task-breakdown-planner` | Agent chính tự chia task và kiểm tra dependency | `planner` worker tạo plan, `dependency-reviewer` kiểm tra đường găng |
| `deployment-devops` | Agent chính tự khóa scope DevOps tổng, environment matrix và hướng phối hợp giữa packaging, runtime, release | Worker kiểu `platform-architect`, `release-planner` hoặc `deployment-reviewer` cung cấp plan tổng và evidence cho coordinator |
| `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` | Agent chính tự khóa contract sâu theo từng layer packaging, runtime hoặc pipeline/release | Specialist worker kiểu `image-packager`, `platform-architect` hoặc `release-engineer` sở hữu output DevOps theo layer |
| `implementation` | Agent chính tự sửa code trong phạm vi nhỏ hoặc vừa | Nhiều `builder` worker chia theo module hoặc path ownership |
| `testing`, `code-scan-review`, `database-change-review` | Agent chính tự verify và ghi evidence | Verifier worker tách riêng theo loại kiểm định |
| `notebooklm` | Agent chính tự dùng để tóm lược/query corpus lớn khi step có nhiều nguồn ngoài | Worker kiểu `notebooklm-researcher` gom insight từ notebook rồi handoff về coordinator; output chỉ là context phụ |
| `step-goal-contract`, `input-readiness-assessor`, `step-goal-auditor`, `definition-of-ready-gate`, `definition-of-done-gate` | Guardrail nội bộ của cùng agent | Lớp contract/audit chung cho coordinator và worker; không thuộc ownership riêng của business skill |

## Cách Đọc Input/Output Theo Ngôn Ngữ Business

- `Input` là thông tin, quyết định hoặc bằng chứng mà step cần nhận để có thể bắt đầu an toàn.
- `Output` là thứ step phải bàn giao cho bước sau hoặc cho stakeholder; mô tả theo giá trị business trước, rồi mới ghi tên artifact trong ngoặc khi cần trace.
- Nếu phải giải thích nhanh cho người không quan tâm tên spec, hãy đọc mỗi step theo mẫu: "nhận gì -> trả ra gì -> câu hỏi nào được trả lời".

| Step | Nhận vào theo ngôn ngữ business | Trả ra theo ngôn ngữ business | Câu hỏi được trả lời |
|---|---|---|---|
| 1. Restate yêu cầu và discovery framing | Yêu cầu thô từ user/ticket và bối cảnh ban đầu của project | Bản hiểu chung về yêu cầu và khung phạm vi ban đầu để không hiểu sai | "Chúng ta đang được yêu cầu giải quyết việc gì?" |
| 2. Xác định mục tiêu business | Bản hiểu chung về yêu cầu và ý định của stakeholder | Mục tiêu business, giá trị mong đợi và phần chủ động không làm | "Vì sao việc này đáng làm và kết quả mong muốn là gì?" |
| 3. Liệt kê phần còn mơ hồ | Mục tiêu business cùng mọi thông tin hiện có | Danh sách điểm còn thiếu, mâu thuẫn hoặc cần quyết định thêm trước khi đi tiếp | "Còn thiếu gì để không làm sai?" |
| 4. Viết acceptance criteria và chốt DoR | Mục tiêu business đã rõ và câu trả lời cho phần mơ hồ | Bộ tiêu chí chấp nhận đo được và kết luận đã sẵn sàng bắt đầu thiết kế/chia task hay chưa | "Làm thế nào thì được xem là làm đúng?" |
| 5. Đề xuất technical approach | Tiêu chí chấp nhận đã chốt và bối cảnh hệ thống hiện tại | Cách làm kỹ thuật được chọn, cùng lý do chọn và boundary bị tác động | "Sẽ giải quyết bằng cách nào?" |
| 6. Chia task | Cách làm kỹ thuật đã chọn | Kế hoạch triển khai thành các việc nhỏ có thứ tự và có thể kiểm chứng | "Cần làm những việc gì, theo thứ tự nào?" |
| 7. Implement | Kế hoạch triển khai và codebase hiện tại | Thay đổi thực tế trong code/config/doc theo đúng phạm vi đã chốt | "Giải pháp đã được tạo ra chưa?" |
| 8. Verify với criteria và chốt DoD | Thay đổi thực tế và tiêu chí chấp nhận | Bằng chứng đạt/chưa đạt, kết luận mức độ hoàn tất và phần còn lại nếu có | "Kết quả có thật sự đáp ứng yêu cầu không?" |

## Sơ Đồ Workflow-Skill-Step Ngắn Gọn

```text
S1 Restate + Discovery Framing
-> requirement-analysis
-> product-thinking
-> output: bản hiểu chung về yêu cầu + khung phạm vi ban đầu (restatement-spec + discovery-framing-spec)

S2 Business Goal
-> product-thinking
-> output: mục tiêu business + phần không làm (business-goal-spec)

S3 Open Questions
-> requirement-analysis
-> input-readiness-assessor
-> step-goal-auditor
-> output: danh sách phần còn thiếu + trạng thái sẵn sàng đầu vào + audit step (readiness-spec + input-readiness-report + step-audit)

S4 Acceptance Criteria + Definition of Ready
-> requirement-analysis
-> definition-of-ready-gate
-> output: acceptance criteria đo được + kết luận DoR (acceptance-criteria-spec + definition-of-ready)

S5 Technical Approach
-> brainstorming
-> system-design
-> khi cần: domain-architecture | frontend-architecture | database-design | deployment-devops | containerization-packaging | platform-runtime-deployment | ci-cd-release
-> output: phương án kỹ thuật khuyến nghị + chi tiết kiến trúc cần khóa + deployment topology khi scope có runtime delivery (option-analysis-spec + technical-approach-spec + architecture-detail-spec khi cần)

S6 Task Breakdown
-> task-breakdown-planner
-> khi cần: deployment-devops | containerization-packaging | platform-runtime-deployment | ci-cd-release
-> output: kế hoạch task có thứ tự + rollout/promotion notes khi có (task-breakdown-spec)

S7 Implement
-> implementation
-> khi cần: deployment-devops | containerization-packaging | platform-runtime-deployment | ci-cd-release
-> output: thay đổi thực tế đã được thực hiện, gồm Dockerfile/compose/manifests/pipeline khi thuộc phạm vi (implementation-spec)

S8 Verify + Definition of Done
-> testing
-> code-scan-review
-> step-goal-auditor
-> definition-of-done-gate
-> khi cần: database-change-review | deployment-devops | containerization-packaging | platform-runtime-deployment | ci-cd-release
-> output: bằng chứng verify + deployment review khi có + kết luận DoD (verification-spec + scan-summary + database-review khi có + deployment-review khi có + step-audit + definition-of-done)
```

Ghi chú:

- Mọi step đều đi qua `codex-workflow-chain`.
- Theo workflow chuẩn hiện tại, mọi step đều có `step-goal-contract`.
- Nếu step được materialize thành note `.md`, phải cộng thêm `obsidian-markdown` dù cột skill nghiệp vụ không lặp lại điều đó ở mọi dòng.
- Khi work item phụ thuộc nhiều tài liệu ngoài hoặc corpus lớn, có thể dùng `notebooklm` ở step 1, 3, 5 hoặc khi cần ở step 8; output phải được chuẩn hóa lại vào note `.md` của step.

## Làn DevOps Và Promotion Giữa Môi Trường

Làn DevOps không thay workflow 8 bước; nó là một delivery lane chạy xuyên step 5 -> 8 khi work item có packaging hoặc rollout.

- Step 5: khóa environment matrix, runtime target và packaging contract.
- Step 6: tách task build image, compose, manifest, promotion, smoke và rollback.
- Step 7: materialize artifact thực tế như `Dockerfile`, `compose.yaml`, manifest hoặc pipeline config.
- Step 8: verify packaging, deploy readiness và release recommendation trước khi promote.
- Rollout thật lên `dev`, `uat`, `prod` chỉ nên diễn ra sau khi step 8 đã có đủ evidence hoặc đã chấp nhận guard rõ ràng.

| Environment | Mục tiêu | Runtime hợp lệ | Artifact tối thiểu | Gate tối thiểu |
|---|---|---|---|---|
| `local` | Chạy được trên máy developer với baseline gần production | `docker` | `Dockerfile`, `compose.yaml` | image build pass, `docker compose config` pass, boot hoặc smoke pass |
| `dev` | Xác nhận artifact deploy được và dễ quan sát | `docker`, `swarm`, `k8s` | image contract + artifact runtime tương ứng | deploy pass, health pass |
| `uat` | Kiểm chứng gần production và phục vụ sign-off | `docker`, `swarm`, `k8s` | cùng image contract với luồng promote | smoke pass, guard theo môi trường |
| `prod` | Rollout an toàn, có rollback | `docker`, `swarm`, `k8s` | artifact runtime production + plan rollback | rollout strategy rõ, verification sau deploy, rollback path |

## Phân Loại Work Item

`work_item_type` là metadata bắt buộc khi materialize note workflow để giữ routing nhất quán giữa discovery và delivery.

- `FEATURE`: thêm capability hoặc hành vi mới.
- `BUG`: sửa hành vi sai so với kỳ vọng hiện có.
- `CHANGE`: đổi hành vi hiện có theo yêu cầu mới.
- `REFACTOR`: đổi cấu trúc nội bộ, không chủ đích đổi behavior business.
- `RESEARCH`: điều tra hoặc spike kỹ thuật, có thể chưa đi tới implement production.

## Workflow 8 Bước

Quy ước:
- Bảng dưới đây liệt kê skill nền bắt buộc của từng step; skill điều kiện sẽ được ghi rõ bằng cụm `khi ...`.
- Nếu step sinh ra artifact theo hệ Obsidian, phải áp dụng thêm skill Obsidian tương ứng theo mục `Quy Tắc Bắt Buộc Cho Artifact Obsidian`.

| Step | Nhiệm vụ | Input | Output | Skill bắt buộc | Gate chuyển bước |
|---|---|---|---|---|---|
| 1. Restate yêu cầu và discovery framing | Diễn giải lại yêu cầu theo cách ngắn gọn, đúng ý, tránh hiểu sai; đồng thời khóa `work_item_type`, user/business context ban đầu, scope draft, assumption, dependency và risk ban đầu ở mức đủ cho developer đi tiếp | Yêu cầu gốc từ user/ticket/chat và bối cảnh project hiện có | Bản hiểu chung về yêu cầu và khung phạm vi ban đầu (`restatement-spec`, `discovery-framing-spec`) | `codex-workflow-chain`, `requirement-analysis`, `product-thinking`, `step-goal-contract` | Chỉ chuyển khi yêu cầu đã được restate rõ, không mâu thuẫn với yêu cầu gốc và discovery framing đã đủ để bước 2 khóa business intent |
| 2. Xác định mục tiêu business | Chốt giá trị nghiệp vụ và kết quả mong muốn | Bản hiểu chung về yêu cầu, business context và stakeholder intent | Mục tiêu business, kết quả mong muốn và phần không làm (`business-goal-spec`) | `codex-workflow-chain`, `product-thinking`, `step-goal-contract` | Chỉ chuyển khi mục tiêu business và phần không làm đã rõ |
| 3. Liệt kê phần còn mơ hồ | Xác định câu hỏi mở, input còn thiếu, xung đột thông tin | Bản hiểu chung về yêu cầu, mục tiêu business, tài liệu hiện có và codebase context | Danh sách phần còn thiếu hoặc mâu thuẫn, trạng thái sẵn sàng đầu vào và audit bước (`readiness-spec`, `input-readiness-report`, `step-audit`) | `codex-workflow-chain`, `requirement-analysis`, `step-goal-contract`, `input-readiness-assessor`, `step-goal-auditor` | Chỉ chuyển khi `status=READY` hoặc có quyết định xử lý rõ ràng cho phần thiếu |
| 4. Viết acceptance criteria và chốt DoR | Chuyển mục tiêu thành tiêu chí kiểm chứng được và khóa `Definition of Ready` trước khi đi vào design hoặc implementation planning | Mục tiêu business, phạm vi dự kiến và câu trả lời từ bước 3 | Bộ acceptance criteria đo được và kết luận `Definition of Ready` (`acceptance-criteria-spec`, `definition-of-ready`) | `codex-workflow-chain`, `requirement-analysis`, `step-goal-contract`, `definition-of-ready-gate` | Chỉ chuyển khi acceptance criteria đo được, có thể verify và DoR kết luận `READY` hoặc có quyết định xử lý blocker rõ ràng |
| 5. Đề xuất technical approach | Đưa ra phương án kỹ thuật, so sánh trade-off, chọn hướng làm | Acceptance criteria đã chốt, codebase context và constraints kỹ thuật | Phương án kỹ thuật khuyến nghị, phân tích lựa chọn, chi tiết kiến trúc cần khóa và deployment topology khi phạm vi chạm runtime delivery (`option-analysis-spec`, `technical-approach-spec`, `architecture-detail-spec` khi cần) | `codex-workflow-chain`, `brainstorming`, `system-design`, `step-goal-contract`; thêm `domain-architecture` khi cần khóa backend boundary; thêm `frontend-architecture` khi cần khóa frontend boundary; thêm `database-design` khi cần khóa data boundary; thêm `deployment-devops` khi cần chốt DevOps tổng; thêm `containerization-packaging` khi cần khóa `Dockerfile` hoặc `compose`; thêm `platform-runtime-deployment` khi cần khóa runtime `docker` hoặc `swarm` hoặc `k8s`; thêm `ci-cd-release` khi cần khóa pipeline hoặc promotion flow | Chỉ chuyển khi có phương án khuyến nghị, boundary kiến trúc rõ ở nơi thật sự bị tác động và deployment/runtime contract đủ để bước sau chia task nếu scope có rollout |
| 6. Chia task | Tách implementation thành việc nhỏ có thứ tự | Phương án kỹ thuật đã chọn, acceptance criteria, constraints, repo context, output kiến trúc liên quan và rollout notes khi có | Kế hoạch triển khai chia thành các task nhỏ có thứ tự và kiểm chứng được, gồm packaging, promotion, smoke và rollback task khi scope có DevOps (`task-breakdown-spec`) | `codex-workflow-chain`, `task-breakdown-planner`, `step-goal-contract`; thêm `deployment-devops` khi cần tách lane DevOps tổng; thêm `containerization-packaging` khi task cần tách build image, `.dockerignore` hoặc `compose`; thêm `platform-runtime-deployment` khi task cần tách manifest, stack hoặc runtime rollout; thêm `ci-cd-release` khi task cần tách pipeline, publish, promotion hoặc approval | Chỉ chuyển khi task đủ nhỏ để thực thi và kiểm chứng, bao gồm task riêng cho boundary kiến trúc, thay đổi dữ liệu hoặc release lane khi có |
| 7. Implement | Thực hiện thay đổi đúng phạm vi và đúng hướng đã chốt | Kế hoạch triển khai, codebase hiện tại, conventions, constraints và rollout notes nếu có | Thay đổi thực tế trong code/config/doc, gồm Dockerfile, compose, manifest hoặc pipeline config khi thuộc phạm vi (`implementation-spec`) | `codex-workflow-chain`, `implementation`, `step-goal-contract`; thêm `deployment-devops` khi cần giữ contract DevOps tổng; thêm `containerization-packaging` khi materialize artifact đóng gói; thêm `platform-runtime-deployment` khi materialize artifact runtime deploy; thêm `ci-cd-release` khi materialize pipeline hoặc release config | Chỉ chuyển khi outputs thực tế đáp ứng contract của step và artifact deploy trong phạm vi đã được materialize hoặc ghi rõ limitation |
| 8. Verify với criteria và chốt DoD | Đối chiếu kết quả thực tế với criteria và quality gates, sau đó khóa `Definition of Done` cho technical work item và kết luận release readiness khi có scope deploy | Acceptance criteria, thay đổi thực tế, test/lint/build logs, constraints, risks và output từ `database-design` hoặc các skill DevOps liên quan khi có | Bằng chứng verify, kết quả scan, review database khi có, deployment review khi có, audit step và kết luận `Definition of Done` (`verification-spec`, `scan-summary`, `database-review` khi có, `deployment-review` khi có, `step-audit`, `definition-of-done`) | `codex-workflow-chain`, `testing`, `code-scan-review`, `step-goal-contract`, `step-goal-auditor`, `definition-of-done-gate`; thêm `database-change-review` khi thay đổi thực sự chạm schema/query/migration/retention/rollback của database; thêm `deployment-devops` khi cần review DevOps tổng; thêm `containerization-packaging` khi cần review packaging; thêm `platform-runtime-deployment` khi cần review runtime rollout; thêm `ci-cd-release` khi cần review pipeline hoặc promotion readiness | Hoàn tất khi audit đủ bằng chứng, mức test phù hợp đã được cover, code scan theo ngôn ngữ đã hoàn tất, deployment review đã rõ `READY|READY_WITH_GUARDS|BLOCKED` nếu có scope deploy, DoD kết luận `DONE|PARTIAL|BLOCKED` rõ ràng và mọi thay đổi database quan trọng đã có khuyến nghị release |

## Quy Tắc Bắt Buộc Cho Artifact Obsidian

- Note `.md` là artifact chuẩn cho workflow doc; khi một step được lưu thành file thì `.md` là nguồn sự thật mặc định.
- `json-canvas` và `obsidian-bases` chỉ được dùng làm artifact phụ; chúng không được chứa quyết định chuẩn mà note `.md` không có.
- `obsidian-cli` chưa nằm trong scope mặc định của workflow này.

## Giải Nghĩa Lớp Obsidian

Luật artifact không thay thế workflow step; nó chỉ quy định cách materialize kết quả của step.

- Nếu không lưu step ra file, workflow vẫn có thể chạy như bình thường.
- Nếu đã lưu step thành tài liệu, `.md` là lựa chọn chuẩn và đi kèm `obsidian-markdown`.
- Nếu cần trực quan hóa kiến trúc hoặc task map, `.canvas` chỉ đóng vai trò phụ trợ cho note `.md`.
- Nếu cần bảng tổng hợp hoặc dashboard, `.base` chỉ tổng hợp từ các note/artifact đã có, không tự trở thành nguồn quyết định chính.

Một cách nhớ ngắn:

- Viết: `.md` -> `obsidian-markdown`
- Vẽ: `.canvas` -> `json-canvas`
- Tổng hợp: `.base` -> `obsidian-bases`

## Ma Trận Artifact Theo Step

| Step | Artifact chuẩn | Artifact phụ được phép | Skill bắt buộc thêm | Không được dùng mặc định |
|---|---|---|---|---|
| 1. Restate yêu cầu và discovery framing | `.md` | Không có | `obsidian-markdown` nếu lưu artifact | `.canvas`, `.base` |
| 2. Xác định mục tiêu business | `.md` | Không có | `obsidian-markdown` nếu lưu artifact | `.canvas`, `.base` |
| 3. Liệt kê phần còn mơ hồ | `.md` | Không có | `obsidian-markdown` nếu lưu artifact | `.canvas`, `.base` |
| 4. Viết acceptance criteria và chốt DoR | `.md` | Không có | `obsidian-markdown` nếu lưu artifact | `.canvas`, `.base` |
| 5. Đề xuất technical approach | `.md` | `.canvas` | `obsidian-markdown` cho note chuẩn; `json-canvas` nếu có sơ đồ | `.base` |
| 6. Chia task | `.md` | `.canvas`, `.base` | `obsidian-markdown` cho note chuẩn; `json-canvas` nếu có task map; `obsidian-bases` nếu có dashboard | Không có ngoài danh sách cho phép |
| 7. Implement | Không có artifact workflow bắt buộc; source of truth là thay đổi code/config/doc thực tế | `.md` chỉ khi có doc_changes hoặc handoff doc trong scope | `obsidian-markdown` nếu tạo/sửa `.md` | `.canvas`, `.base` |
| 8. Verify với criteria và chốt DoD | `.md` | `.base` | `obsidian-markdown` cho report chuẩn; `obsidian-bases` nếu có dashboard tổng hợp | `.canvas` |

## Luật Áp Dụng

- Nếu một step có `artifact chuẩn = .md`, không được chỉ giao `.canvas` hoặc `.base` mà thiếu note `.md`.
- Nếu có cả artifact chuẩn và artifact phụ, mọi quyết định chuẩn, acceptance criteria, risk kết luận và next action phải xuất hiện trong note `.md` trước.
- `.canvas` chỉ dùng để trực quan hóa cấu trúc, flow, task map hoặc dependency map.
- `.base` chỉ dùng để tổng hợp, lọc, xem bảng hoặc dashboard từ các note/artifact đã có.
- Step 7 chỉ dùng Obsidian skill khi thay đổi thực tế chạm vào tài liệu `.md`; không ép tạo note workflow riêng nếu không có giá trị.
- Trong frontmatter note workflow, tách `content_skills` và `artifact_skills`; không gộp chung để tránh nhầm giữa skill tạo nội dung với skill materialize artifact.
- `upstream_artifacts` dùng để khai báo đầu vào trực tiếp; `## Traceability` dùng để nối mạch business -> readiness -> design -> implementation -> verify.

## Template Output Chuẩn Theo Step

### Quy Ước Chung Cho Note `.md`

- Nếu một step được lưu thành file, note `.md` là artifact chuẩn và là nguồn sự thật.
- Dùng cấu trúc note theo thứ tự cố định:
  1. frontmatter
  2. tiêu đề `# Step N - <tên step>`
  3. callout `summary`
  4. block bắt buộc theo step
  5. `## Execution Topology` khi cần trace cách step được vận hành
  6. `## Traceability`
  7. `## Handoff`
  8. `## Links` nếu có artifact phụ
- Tên file, frontmatter và link artifact phải bám cùng một `work_item_slug`.
- Với step có artifact phụ, link artifact phụ trong `## Links`; không chôn quyết định chuẩn trong artifact phụ.

### Quy Ước Naming

- `work_item_slug` là định danh chuẩn cho một work item, viết `kebab-case`, chỉ gồm `[a-z0-9-]`.
- `step_id` luôn theo dạng `s01` đến `s08`.
- `step_slug` là slug cố định của step:
  - `s01 = restate`
  - `s02 = business-goal`
  - `s03 = open-questions`
  - `s04 = acceptance-criteria`
  - `s05 = technical-approach`
  - `s06 = task-breakdown`
  - `s07 = implementation`
  - `s08 = verification`
- Tên file chuẩn cho artifact note chính:
  - `<work_item_slug>.s01.restate.md`
  - `<work_item_slug>.s02.business-goal.md`
  - `<work_item_slug>.s03.open-questions.md`
  - `<work_item_slug>.s04.acceptance-criteria.md`
  - `<work_item_slug>.s05.technical-approach.md`
  - `<work_item_slug>.s06.task-breakdown.md`
  - `<work_item_slug>.s07.implementation.md`
  - `<work_item_slug>.s08.verification.md`
- Tên file chuẩn cho artifact phụ:
  - step 5 canvas: `<work_item_slug>.s05.architecture.canvas`
  - step 6 canvas: `<work_item_slug>.s06.task-map.canvas`
  - step 6 base: `<work_item_slug>.s06.task-dashboard.base`
  - step 8 base: `<work_item_slug>.s08.verification-dashboard.base`
- Không dùng tên file mơ hồ kiểu `analysis.md`, `final.md`, `design-v2.md`, `notes.base`.

### Frontmatter Chuẩn Cho Note Chính

````md
```yaml
---
artifact_id: "<work_item_slug>.s01.restate"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
execution_mode: agentic|multi_agent
execution_roles: []
  # với `agentic`: liệt kê đúng 1 vai trò chính; với `multi_agent`: liệt kê coordinator và các worker/verifier thực tế
content_skills:
  - codex-workflow-chain
  # thêm skill nghiệp vụ và skill gate thực tế đã dùng cho step
artifact_skills:
  - obsidian-markdown
upstream_artifacts: []
  # thêm artifact upstream thực sự dùng làm input hoặc trace
linked_artifacts: []
  # chỉ thêm artifact phụ đã được tạo thật
tags:
  - agent-ops
  - workflow/s01
---
```
````

Quy tắc:
- `artifact_id`, `work_item_slug`, `step_id`, `step_slug` phải khớp tên file.
- `workflow_stage` dùng `discovery` cho step 1-4 và `delivery` cho step 5-8.
- `work_item_type` dùng một trong các giá trị `FEATURE|BUG|CHANGE|REFACTOR|RESEARCH`.
- `artifact_role` của note chuẩn luôn là `primary`.
- `artifact_kind` của note chuẩn luôn là `primary-note`.
- `source_of_truth` của note chuẩn luôn là `true`.
- `execution_mode` dùng `agentic` khi một agent giữ trọn ownership của step; dùng `multi_agent` khi step được điều phối bởi coordinator và nhiều worker/verifier.
- `execution_roles` phải phản ánh đúng vai trò thực sự đã tham gia vào step; không khai báo role không tồn tại.
- `content_skills` phải liệt kê đủ skill nghiệp vụ và skill gate đã dùng cho step đó.
- `artifact_skills` phải liệt kê đủ skill materialize artifact đã dùng cho step đó.
- `upstream_artifacts` chỉ liệt kê artifact thực sự được dùng làm đầu vào hoặc tham chiếu quyết định.
- `linked_artifacts` liệt kê tên file artifact phụ có thật, không để link chết.
- `tags` nên có tối thiểu `agent-ops` và `workflow/<step-id>`.

### Block Bổ Sung Khi Muốn Trace Execution Topology

Nếu cần lưu rõ cách step đã được vận hành, thêm block này ngay trước `## Traceability` trong note chính:

````md
## Execution Topology
```yaml
# dùng schema `agentic-execution` hoặc `multi-agent-plan`
```
````

Quy tắc:

- `agentic` dùng schema `agentic-execution`.
- `multi_agent` dùng schema `multi-agent-plan`.
- Block này không thay cho `## Step Contract`; nó chỉ mô tả cách contract được thực thi.

### Block Bắt Buộc Theo Step

| Step | File chuẩn | Block bắt buộc trong note | Schema phải điền |
|---|---|---|---|
| 1. Restate yêu cầu và discovery framing | `<work_item_slug>.s01.restate.md` | `## Step Contract`, `## Artifact Chính`, `## Requirement Analysis Spec` khi cần, `## Traceability`, `## Handoff` | `step-goal-contract`, artifact step 1 |
| 2. Xác định mục tiêu business | `<work_item_slug>.s02.business-goal.md` | `## Step Contract`, `## Artifact Chính`, `## Traceability`, `## Handoff` | `step-goal-contract`, `product-thinking` |
| 3. Liệt kê phần còn mơ hồ | `<work_item_slug>.s03.open-questions.md` | `## Step Contract`, `## Artifact Chính`, `## Input Readiness`, `## Audit`, `## Traceability`, `## Handoff` | `step-goal-contract`, artifact step 3, `input-readiness-assessor`, `step-goal-auditor` |
| 4. Viết acceptance criteria và chốt DoR | `<work_item_slug>.s04.acceptance-criteria.md` | `## Step Contract`, `## Artifact Chính`, `## Definition of Ready`, `## Traceability`, `## Handoff` | `step-goal-contract`, artifact step 4, `definition-of-ready-gate` |
| 5. Đề xuất technical approach | `<work_item_slug>.s05.technical-approach.md` | `## Step Contract`, `## Option Analysis`, `## Artifact Chính`, `## Architecture Details`, `## Traceability`, `## Handoff` | `step-goal-contract`, `brainstorming`, `system-design`, `domain-architecture` hoặc `frontend-architecture` hoặc `database-design` hoặc `deployment-devops` hoặc `containerization-packaging` hoặc `platform-runtime-deployment` hoặc `ci-cd-release` khi có |
| 6. Chia task | `<work_item_slug>.s06.task-breakdown.md` | `## Step Contract`, `## Artifact Chính`, `## Verification Plan`, `## Traceability`, `## Handoff` | `step-goal-contract`, `task-breakdown-planner` |
| 7. Implement | `<work_item_slug>.s07.implementation.md` nếu có note | `## Step Contract`, `## Artifact Chính`, `## Traceability`, `## Handoff` | `step-goal-contract`, `implementation` |
| 8. Verify với criteria và chốt DoD | `<work_item_slug>.s08.verification.md` | `## Step Contract`, `## Artifact Chính`, `## Scan Summary`, `## Database Review` khi có, `## Deployment Review` khi có, `## Audit`, `## Definition of Done`, `## Traceability`, `## Handoff` | `step-goal-contract`, `testing`, `code-scan-review`, `database-change-review` khi có, `deployment-devops` hoặc `containerization-packaging` hoặc `platform-runtime-deployment` hoặc `ci-cd-release` khi có, `step-goal-auditor`, `definition-of-done-gate` |

Ghi chú:
- `artifact step 1`, `artifact step 3`, `artifact step 4` là schema tối giản ở workflow level, không thay cho schema chi tiết của skill nếu team muốn lưu chi tiết hơn.
- Ở step 5, chọn `domain-architecture`, `frontend-architecture`, `database-design` theo phạm vi thật; không ép đủ cả ba nếu không liên quan.
- Ở step 7, chỉ tạo note khi implementation có `doc_changes`, cần handoff riêng, hoặc người dùng yêu cầu artifact doc.
- Với `work_item_type=REFACTOR`, step 4 nên điền rõ `behavioral_invariants` để khóa phạm vi không đổi behavior.
- Với `work_item_type=RESEARCH`, step 8 nên kết luận recommendation rõ thay vì chỉ log findings.

### Spec Phát Sinh Và Contract Cấp Step

| Step | Spec chính phát sinh | Block chuẩn | Contract tối thiểu |
|---|---|---|---|
| 1 | `restatement-spec`, `discovery-framing-spec` | `## Artifact Chính` | `restated_request`, `work_item_type`, `user_problem_initial`, `business_context_initial`, `scope_draft`, `constraints_initial`, `assumptions_initial`, `open_questions_initial`, `dependencies_initial`, `risks_initial` |
| 1 nếu phân tích ticket/tài liệu sâu | `requirement-analysis-spec` | `## Requirement Analysis Spec` | schema đầy đủ của `requirement-analysis` |
| 2 | `business-goal-spec` | `## Artifact Chính` | schema `product-thinking` |
| 3 | `readiness-spec` | `## Artifact Chính`, `## Input Readiness`, `## Audit` | `open_questions`, `missing_inputs`, `conflicts`, `assumptions`, trạng thái `READY|BLOCKED` |
| 4 | `acceptance-criteria-spec` | `## Artifact Chính` | `acceptance_criteria`, `edge_cases`, `out_of_scope`, `done_when`, `behavioral_invariants` khi `work_item_type=REFACTOR` |
| 4 | `definition-of-ready` | `## Definition of Ready` | schema `definition-of-ready-gate` |
| 5 | `option-analysis-spec` | `## Option Analysis` | schema `brainstorming`; tối thiểu 2 options, 1 recommended option |
| 5 | `technical-approach-spec` | `## Artifact Chính` | schema `system-design` |
| 5 khi cần khóa boundary sâu | `architecture-detail-spec` | `## Architecture Details` | một hoặc nhiều schema kiến trúc chuyên biệt, gồm `deployment-devops`, `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` khi có runtime delivery |
| 6 | `task-breakdown-spec` | `## Artifact Chính` | schema `task-breakdown-planner` |
| 7 | `implementation-spec` | `## Artifact Chính` | schema `implementation` |
| 8 | `verification-spec` | `## Artifact Chính`, `## Scan Summary`, `## Database Review`, `## Deployment Review`, `## Audit` | schema `testing`; cộng thêm schema scan/review/audit khi có |
| 8 khi scope có packaging hoặc rollout | `deployment-review` | `## Deployment Review` | schema `deployment-devops` và có thể cộng thêm `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` |
| 8 | `definition-of-done` | `## Definition of Done` | schema `definition-of-done-gate` |

Quy tắc:
- Mọi spec cấp step đều chịu ràng buộc bởi `## Step Contract`.
- `brainstorming` không tự tạo ra design spec cuối; nó chỉ tạo `option-analysis-spec` để làm đầu vào cho `system-design`.
- Với phân tích tài liệu/ticket, không sinh format riêng; nếu cần artifact đầy đủ thì sinh `requirement-analysis-spec` theo đúng schema của skill `requirement-analysis`.

### Template Step 1. Restate Yêu Cầu

````md
```md
---
artifact_id: "<work_item_slug>.s01.restate"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
execution_mode: agentic|multi_agent
execution_roles: []
  # với `agentic`: liệt kê đúng 1 vai trò chính; với `multi_agent`: liệt kê coordinator và các worker/verifier thực tế
content_skills:
  - codex-workflow-chain
  - requirement-analysis
  - product-thinking
  - step-goal-contract
artifact_skills:
  - obsidian-markdown
upstream_artifacts: []
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s01
---

# Step 1 - Restate yêu cầu và discovery framing

> [!summary]
> Tóm tắt ngắn yêu cầu đã được diễn giải lại cùng framing discovery tối thiểu cho developer.

## Step Contract
```yaml
# dùng schema `step-goal-contract`
```

## Artifact Chính
```yaml
raw_request: ""
restated_request: ""
request_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
user_problem_initial: ""
business_context_initial: ""
scope_draft:
  in: []
  out: []
constraints_initial: []
assumptions_initial: []
open_questions_initial: []
dependencies_initial: []
risks_initial: []
notes_for_step_2: ""
```

## Requirement Analysis Spec
```yaml
# dùng schema `requirement-analysis` khi step 1 thực sự phân tích ticket, issue hoặc tài liệu thành artifact đầy đủ
```

## Traceability
```yaml
# dùng schema `traceability`
```

## Handoff
- Điều đã rõ:
- Điều còn cần theo dõi:
- Điều kiện sang step 2:
```
````

### Template Step 2. Xác Định Mục Tiêu Business

````md
```md
---
artifact_id: "<work_item_slug>.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
execution_mode: agentic|multi_agent
execution_roles: []
  # với `agentic`: liệt kê đúng 1 vai trò chính; với `multi_agent`: liệt kê coordinator và các worker/verifier thực tế
content_skills:
  - codex-workflow-chain
  - product-thinking
  - step-goal-contract
artifact_skills:
  - obsidian-markdown
upstream_artifacts:
  - "<work_item_slug>.s01.restate.md"
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s02
---

# Step 2 - Xác định mục tiêu business

> [!summary]
> Tóm tắt vấn đề người dùng, mục tiêu business và outcome mong muốn.

## Step Contract
```yaml
# dùng schema `step-goal-contract`
```

## Artifact Chính
```yaml
# dùng schema `product-thinking`
```

## Traceability
```yaml
# dùng schema `traceability`
```

## Handoff
- User problem đã chốt:
- Non-goals:
- Điều kiện sang step 3:
```
````

### Template Step 3. Liệt Kê Phần Còn Mơ Hồ

````md
```md
---
artifact_id: "<work_item_slug>.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
execution_mode: agentic|multi_agent
execution_roles: []
  # với `agentic`: liệt kê đúng 1 vai trò chính; với `multi_agent`: liệt kê coordinator và các worker/verifier thực tế
content_skills:
  - codex-workflow-chain
  - requirement-analysis
  - step-goal-contract
  - input-readiness-assessor
  - step-goal-auditor
artifact_skills:
  - obsidian-markdown
upstream_artifacts:
  - "<work_item_slug>.s01.restate.md"
  - "<work_item_slug>.s02.business-goal.md"
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s03
---

# Step 3 - Liệt kê phần còn mơ hồ

> [!summary]
> Tóm tắt các câu hỏi mở, giả định tạm dùng và quyết định readiness.

## Step Contract
```yaml
# dùng schema `step-goal-contract`
```

## Artifact Chính
```yaml
open_questions: []
missing_inputs: []
conflicts: []
assumptions: []
```

## Input Readiness
```yaml
# dùng schema `input-readiness-assessor`
```

## Audit
```yaml
# dùng schema `step-goal-auditor`
```

## Traceability
```yaml
# dùng schema `traceability`
```

## Handoff
- Trạng thái readiness:
- Điều cần làm để sang step 4:
```
````

### Template Step 4. Viết Acceptance Criteria

````md
```md
---
artifact_id: "<work_item_slug>.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
execution_mode: agentic|multi_agent
execution_roles: []
  # với `agentic`: liệt kê đúng 1 vai trò chính; với `multi_agent`: liệt kê coordinator và các worker/verifier thực tế
content_skills:
  - codex-workflow-chain
  - requirement-analysis
  - step-goal-contract
  - definition-of-ready-gate
artifact_skills:
  - obsidian-markdown
upstream_artifacts:
  - "<work_item_slug>.s01.restate.md"
  - "<work_item_slug>.s02.business-goal.md"
  - "<work_item_slug>.s03.open-questions.md"
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s04
---

# Step 4 - Viết acceptance criteria và chốt Definition of Ready

> [!summary]
> Tóm tắt phạm vi kiểm chứng, edge case quan trọng và kết luận Definition of Ready.

## Step Contract
```yaml
# dùng schema `step-goal-contract`
```

## Artifact Chính
```yaml
acceptance_criteria: []
edge_cases: []
out_of_scope: []
done_when: []
behavioral_invariants: []
```

## Definition of Ready
```yaml
# dùng schema `definition-of-ready-gate`
```

## Traceability
```yaml
# dùng schema `traceability`
```

## Handoff
- Criteria bắt buộc:
- Edge case phải giữ:
- Điều kiện sang step 5:
```
````

### Template Step 5. Đề Xuất Technical Approach

````md
```md
---
artifact_id: "<work_item_slug>.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
execution_mode: agentic|multi_agent
execution_roles: []
  # với `agentic`: liệt kê đúng 1 vai trò chính; với `multi_agent`: liệt kê coordinator và các worker/verifier thực tế
content_skills:
  - codex-workflow-chain
  - system-design
  - brainstorming
  - step-goal-contract
  # thêm `domain-architecture` khi dùng
  # thêm `frontend-architecture` khi dùng
  # thêm `database-design` khi dùng
  # thêm `deployment-devops` khi cần chốt DevOps tổng
  # thêm `containerization-packaging` khi cần khóa `Dockerfile`, `.dockerignore`, `compose.yaml`
  # thêm `platform-runtime-deployment` khi cần khóa runtime `docker`, `swarm`, `k8s`
  # thêm `ci-cd-release` khi cần khóa pipeline, promotion hoặc approval
artifact_skills:
  - obsidian-markdown
  # thêm `json-canvas` khi thực sự tạo canvas kiến trúc
upstream_artifacts:
  - "<work_item_slug>.s04.acceptance-criteria.md"
linked_artifacts: []
# thêm "<work_item_slug>.s05.architecture.canvas" nếu canvas thực sự được tạo
tags:
  - agent-ops
  - workflow/s05
---

# Step 5 - Đề xuất technical approach

> [!summary]
> Tóm tắt phương án khuyến nghị, trade-off chính và boundary kiến trúc cần giữ.

## Step Contract
```yaml
# dùng schema `step-goal-contract`
```

## Option Analysis
```yaml
# dùng schema `brainstorming`
```

## Artifact Chính
```yaml
# dùng schema `system-design`
```

## Architecture Details
```yaml
# dùng một hoặc nhiều schema liên quan:
# `domain-architecture`
# `frontend-architecture`
# `database-design`
# `deployment-devops` khi cần chốt DevOps tổng
# `containerization-packaging` khi khóa `Dockerfile`, `.dockerignore`, `compose.yaml`
# `platform-runtime-deployment` khi khóa runtime `docker`, `swarm`, `k8s`
# `ci-cd-release` khi khóa pipeline, promotion hoặc approval
```

## Traceability
```yaml
# dùng schema `traceability`
```

## Handoff
- Recommended option:
- Trade-off chấp nhận:
- Điều kiện sang step 6:
- Deployment note khi có:

## Links
- Thêm link canvas kiến trúc tại đây nếu artifact thực sự được tạo.
```
````

### Template Step 6. Chia Task

````md
```md
---
artifact_id: "<work_item_slug>.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
execution_mode: agentic|multi_agent
execution_roles: []
  # với `agentic`: liệt kê đúng 1 vai trò chính; với `multi_agent`: liệt kê coordinator và các worker/verifier thực tế
content_skills:
  - codex-workflow-chain
  - task-breakdown-planner
  - step-goal-contract
  # thêm `deployment-devops` khi cần chốt DevOps tổng
  # thêm `containerization-packaging` khi cần khóa `Dockerfile`, `.dockerignore`, `compose.yaml`
  # thêm `platform-runtime-deployment` khi cần khóa runtime `docker`, `swarm`, `k8s`
  # thêm `ci-cd-release` khi cần khóa pipeline, promotion hoặc approval
artifact_skills:
  - obsidian-markdown
  # thêm `json-canvas` khi thực sự tạo task map
  # thêm `obsidian-bases` khi thực sự tạo dashboard
upstream_artifacts:
  - "<work_item_slug>.s05.technical-approach.md"
linked_artifacts: []
# thêm artifact phụ thật sự được tạo, ví dụ task map hoặc dashboard
tags:
  - agent-ops
  - workflow/s06
---

# Step 6 - Chia task

> [!summary]
> Tóm tắt task breakdown, dependency, kế hoạch verify và rollout note khi có.

## Step Contract
```yaml
# dùng schema `step-goal-contract`
```

## Artifact Chính
```yaml
# dùng schema `task-breakdown-planner`
```

## Verification Plan
- Check bắt buộc:
- Risk note:
- Rollout note nếu có:

## Traceability
```yaml
# dùng schema `traceability`
```

## Handoff
- Task thực hiện trước:
- Phụ thuộc chặn:
- Điều kiện sang step 7:

## Links
- Thêm link task map tại đây nếu artifact thực sự được tạo.
- Thêm link dashboard tại đây nếu artifact thực sự được tạo.
```
````

### Template Step 7. Implement

````md
```md
---
artifact_id: "<work_item_slug>.s07.implementation"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
execution_mode: agentic|multi_agent
execution_roles: []
  # với `agentic`: liệt kê đúng 1 vai trò chính; với `multi_agent`: liệt kê coordinator và các worker/verifier thực tế
content_skills:
  - codex-workflow-chain
  - implementation
  - step-goal-contract
  # thêm `deployment-devops` khi cần chốt DevOps tổng
  # thêm `containerization-packaging` khi cần khóa `Dockerfile`, `.dockerignore`, `compose.yaml`
  # thêm `platform-runtime-deployment` khi cần khóa runtime `docker`, `swarm`, `k8s`
  # thêm `ci-cd-release` khi cần khóa pipeline, promotion hoặc approval
artifact_skills:
  - obsidian-markdown
upstream_artifacts: []
  # thêm artifact upstream thực sự được dùng làm input hoặc trace cho step 7
linked_artifacts: []
# thêm Dockerfile, compose, manifest hoặc pipeline artifact khi thực sự được tạo
tags:
  - agent-ops
  - workflow/s07
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi thực tế đã làm và giới hạn còn lại.

## Step Contract
```yaml
# dùng schema `step-goal-contract`
```

## Artifact Chính
```yaml
# dùng schema `implementation`
```

## Traceability
```yaml
# dùng schema `traceability`
```

## Handoff
- Outputs actual:
- Known limitations:
- Notes for testing:
- Notes for deployment khi có:
```
````

### Template Step 8. Verify Với Criteria

````md
```md
---
artifact_id: "<work_item_slug>.s08.verification"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
execution_mode: agentic|multi_agent
execution_roles: []
  # với `agentic`: liệt kê đúng 1 vai trò chính; với `multi_agent`: liệt kê coordinator và các worker/verifier thực tế
content_skills:
  - codex-workflow-chain
  - testing
  - code-scan-review
  - step-goal-contract
  - step-goal-auditor
  - definition-of-done-gate
  # thêm `database-change-review` khi có thay đổi database thuộc phạm vi review
  # thêm `deployment-devops` khi cần chốt DevOps tổng
  # thêm `containerization-packaging` khi cần khóa `Dockerfile`, `.dockerignore`, `compose.yaml`
  # thêm `platform-runtime-deployment` khi cần khóa runtime `docker`, `swarm`, `k8s`
  # thêm `ci-cd-release` khi cần khóa pipeline, promotion hoặc approval
artifact_skills:
  - obsidian-markdown
  # thêm `obsidian-bases` khi thực sự tạo verification dashboard
upstream_artifacts: []
  # thêm artifact upstream thực sự được dùng làm input hoặc trace cho step 8; không giữ link tới note không tồn tại
linked_artifacts: []
# thêm "<work_item_slug>.s08.verification-dashboard.base" nếu dashboard thực sự được tạo
tags:
  - agent-ops
  - workflow/s08
---

# Step 8 - Verify với criteria và chốt Definition of Done

> [!summary]
> Tóm tắt trạng thái PASS|FAIL|PARTIAL, khoảng trống còn lại và kết luận Definition of Done cho technical work item.

## Step Contract
```yaml
# dùng schema `step-goal-contract`
```

## Artifact Chính
```yaml
# dùng schema `testing`
```

## Scan Summary
```yaml
# dùng schema `code-scan-review`
```

## Database Review
```yaml
# dùng schema `database-change-review` khi step có thay đổi database
```

## Deployment Review
```yaml
# dùng schema `deployment-devops` cho góc nhìn DevOps tổng
# cộng thêm `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` khi cần review sâu theo layer
```

## Audit
```yaml
# dùng schema `step-goal-auditor`
```

## Definition of Done
```yaml
# dùng schema `definition-of-done-gate`
```

## Traceability
```yaml
# dùng schema `traceability`
```

## Handoff
- Overall status:
- Residual risks:
- Recommendation:
- Release recommendation khi có:
- Next action:

## Links
- Thêm link verification dashboard tại đây nếu artifact thực sự được tạo.
```
````

## Mẫu Output Theo Skill

Các schema dưới đây là nguồn tham chiếu để điền vào các block YAML trong template note theo step ở phía trên.

### `artifact-step-1-restate`

```yaml
raw_request: ""
restated_request: ""
request_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
user_problem_initial: ""
business_context_initial: ""
scope_draft:
  in: []
  out: []
constraints_initial: []
assumptions_initial: []
open_questions_initial: []
dependencies_initial: []
risks_initial: []
notes_for_step_2: ""
```

### `artifact-step-3-open-questions`

```yaml
open_questions: []
missing_inputs: []
conflicts: []
assumptions: []
```

### `artifact-step-4-acceptance-criteria`

```yaml
acceptance_criteria: []
edge_cases: []
out_of_scope: []
done_when: []
behavioral_invariants: []
```

### `traceability`

```yaml
business_refs: []
readiness_refs: []
acceptance_refs: []
design_refs: []
implementation_refs: []
verification_refs: []
```

### `agentic-execution`

```yaml
execution_mode: agentic
agent_role: ""
step_goal_ref: ""
owned_scope: []
selected_content_skills: []
selected_artifact_skills: []
loop:
  - phase: contract
    objective: ""
  - phase: readiness
    objective: ""
  - phase: execute
    objective: ""
  - phase: self_check
    objective: ""
  - phase: audit
    objective: ""
  - phase: handoff
    objective: ""
self_checks: []
handoff_target: ""
final_decision: COMPLETE|REWORK|BLOCKED
notes: ""
```

### `multi-agent-plan`

```yaml
execution_mode: multi_agent
coordinator_role: ""
shared_goal: ""
step_goal_ref: ""
worker_assignments:
  - role: ""
    owned_scope: []
    owned_paths: []
    skills: []
    outputs_expected: []
    handoff_to: coordinator
merge_strategy: ""
conflict_rules: []
verification_owner: ""
completion_rule: ""
final_decision: COMPLETE|PARTIAL|BLOCKED
residual_risks: []
notes: ""
```

### `brainstorming`

```yaml
goal: ""
options:
  - name: "Phương án A"
    summary: ""
    pros: []
    cons: []
    risks: []
  - name: "Phương án B"
    summary: ""
    pros: []
    cons: []
    risks: []
recommended_option: ""
recommendation_reason: ""
validation_plan: []
```

### `domain-architecture`

```yaml
architecture_style: DOD|DDD_LITE|DDD
domain_modules:
  - name: ""
    purpose: ""
    responsibilities: []
    owned_data: []
bounded_contexts:
  - name: ""
    language_scope: ""
    upstream_dependencies: []
    downstream_dependencies: []
ownership_map: []
interaction_rules: []
layer_rules:
  presentation: []
  application: []
  domain: []
  infrastructure: []
aggregate_candidates: []
architecture_risks: []
notes_for_next_step: ""
```

### `frontend-architecture`

```yaml
frontend_style: MODULE_FIRST|MODULE_FIRST_WITH_FLOWS|MICRO_FRONTEND
app_shell:
  responsibilities: []
  owns: []
feature_modules:
  - name: ""
    purpose: ""
    owned_routes: []
    owned_state: []
    public_contracts: []
flows:
  - name: ""
    purpose: ""
    composes_modules: []
    owns_state: []
shared_areas:
  - area: ""
    allowed_contents: []
    forbidden_contents: []
interaction_rules: []
state_ownership_rules: []
routing_rules: []
architecture_risks: []
notes_for_next_step: ""
```

### `database-design`

```yaml
data_model:
  entities: []
  aggregates: []
tables:
  - name: ""
    purpose: ""
    owner_module: ""
    columns: []
    primary_key: []
relationships: []
constraints:
  uniques: []
  foreign_keys: []
  checks: []
indexes:
  - table: ""
    columns: []
    purpose: ""
read_write_patterns:
  writes: []
  reads: []
retention_rules: []
audit_rules: []
design_risks: []
notes_for_next_step: ""
```

### `database-change-review`

```yaml
review_scope: []
migration_plan:
  steps: []
  deployment_order: []
backfill_plan:
  required: true|false
  strategy: ""
  safety_controls: []
rollback_plan:
  possible: true|false
  strategy: ""
compatibility_risks: []
lock_risks: []
query_risks: []
retention_risks: []
release_recommendation: GO|GO_WITH_GUARDS|NO_GO
required_actions: []
evidence: []
```

### `deployment-devops`

```yaml
deployment_scope: ""
devops_objectives: []
environment_matrix:
  - environment: local|dev|uat|prod
    concerns: []
    runtime_target: ""
specialized_followups:
  - skill: containerization-packaging|platform-runtime-deployment|ci-cd-release
    reason: ""
    outputs_expected: []
cross_cutting_guards: []
evidence_or_gaps: []
release_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation_or_release: ""
```

### `containerization-packaging`

```yaml
packaging_scope: ""
language_profile:
  primary_language: ""
  framework: ""
  build_system: ""
  artifact_type: ""
workload_profile: web_api|worker|cron|frontend_static|monolith|microservice
dockerfile_contract:
  file_path: ""
  build_context: ""
  base_images: []
  stages: []
  build_args: []
  artifact_paths: []
  entrypoint: ""
  command: ""
  exposed_ports: []
  run_as_non_root: true|false
dockerignore_rules: []
local_compose_contract:
  required: true|false
  file_path: ""
  services: []
  env_files: []
  volumes: []
  profiles: []
build_optimizations: []
security_guards: []
verification_checks: []
packaging_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation: ""
```

### `platform-runtime-deployment`

```yaml
deployment_scope: ""
runtime_matrix:
  - environment: dev|uat|prod
    runtime: docker|swarm|k8s
    deployment_unit: ""
    topology: ""
    networking: []
    config_strategy: []
    secret_strategy: []
    storage_strategy: []
    scaling_strategy: []
runtime_artifacts:
  - environment: ""
    files_expected: []
operational_policies:
  health_policies: []
  observability_controls: []
  resource_controls: []
  disruption_controls: []
rollout_and_rollback:
  - environment: ""
    rollout_strategy: ""
    preconditions: []
    post_deploy_checks: []
    rollback_steps: []
platform_risks: []
runtime_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation_or_ops: ""
```

### `ci-cd-release`

```yaml
pipeline_scope: ""
source_strategy:
  branch_model: ""
  triggers: []
build_and_verify:
  stages: []
  cache_strategy: []
  required_checks: []
artifact_flow:
  registry: ""
  artifact_types: []
  tagging_strategy: []
  provenance_controls: []
promotion_flow:
  - from: local|dev|uat
    to: dev|uat|prod
    conditions: []
    automation_level: ""
approval_controls: []
release_controls:
  pre_release: []
  post_release: []
rollback_controls: []
pipeline_risks: []
pipeline_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation_or_ops: ""
```

### `code-scan-review`

```yaml
scan_target: ""
language_stack: []
scan_plan:
  syntax: []
  static_analysis: []
  security: []
  performance_heuristic: []
syntax_scan_results:
  - command: ""
    status: PASS|FAIL|SKIP
    evidence: ""
static_analysis_results:
  - command: ""
    status: PASS|FAIL|SKIP
    findings: []
security_scan_results:
  - command: ""
    status: PASS|FAIL|SKIP
    findings: []
performance_heuristic_results:
  - check: ""
    status: PASS|FAIL|SKIP
    evidence: ""
skipped_scans: []
overall_status: PASS|FAIL|PARTIAL
remediation_actions: []
notes_for_verify: ""
```

### `step-goal-contract`

```yaml
step: ""
goal: ""
value: ""
scope_in: []
scope_out: []
inputs_required: []
outputs_required: []
done_when: []
constraints:
  hard_constraints: []
  soft_constraints: []
  prohibited_actions: []
  compliance_checks: []
risks:
  - id: ""
    description: ""
    likelihood: LOW|MEDIUM|HIGH
    impact: LOW|MEDIUM|HIGH
    severity: LOW|MEDIUM|HIGH
    mitigation: ""
    contingency: ""
    owner: ""
    status: OPEN|MONITORING|CLOSED
timebox:
  target_duration: ""
  deadline: ""
  escalation_rule: ""
```

### `input-readiness-assessor`

```yaml
step: ""
status: READY|BLOCKED
available_inputs: []
missing_inputs: []
invalid_inputs: []
conflicts: []
assumptions: []
risk_level: LOW|MEDIUM|HIGH
next_action: ""
```

### `step-goal-auditor`

```yaml
step: ""
status: PASS|FAIL|PARTIAL
checks:
  - criterion: ""
    result: PASS|FAIL
    evidence: ""
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: true|false
timebox_evidence: ""
gaps: []
risk_level: LOW|MEDIUM|HIGH
next_action: ""
```

### `definition-of-ready-gate`

```yaml
work_item_slug: ""
status: READY|BLOCKED
checks:
  restated_request_clear: PASS|FAIL
  business_goal_clear: PASS|FAIL
  scope_defined: PASS|FAIL
  open_questions_non_blocking: PASS|FAIL
  acceptance_criteria_testable: PASS|FAIL
  dependencies_known: PASS|FAIL
  verification_direction_present: PASS|FAIL
blocking_gaps: []
accepted_assumptions: []
residual_risks: []
next_action: ""
```

### `definition-of-done-gate`

```yaml
work_item_slug: ""
status: DONE|PARTIAL|BLOCKED
checks:
  acceptance_criteria_evidenced: PASS|FAIL
  implementation_recorded: PASS|FAIL
  required_verification_completed: PASS|FAIL
  code_scan_completed_or_justified: PASS|FAIL
  traceability_complete: PASS|FAIL
  residual_risks_documented: PASS|FAIL
gaps: []
residual_risks: []
follow_up_items: []
next_action: ""
```

## Mapping Giữa Step Và Metadata

- `goal`: mô tả trạng thái kết quả cần đạt của step.
- `input`: dữ liệu cần có để step bắt đầu an toàn.
- `output`: artifact bắt buộc step phải sinh ra.
- `done_when`: điều kiện hoàn tất có thể kiểm chứng.
- `constraints`: giới hạn không được vi phạm khi thực thi.
- isks`: rủi ro cần theo dõi và phương án xử lý.
- `timebox`: giới hạn thời gian hoặc deadline của step.

## Cổng Ngôn Ngữ Và Mã Hóa Tiếng Việt

Chính sách mặc định:
- Trao đổi với người dùng: tiếng Việt.
- Tài liệu và báo cáo bàn giao: tiếng Việt (trừ khi người dùng yêu cầu khác).

Khi thay đổi file văn bản (`.md`, `.txt`, `.yml`, `.yaml`, `.json`):
- Lưu dưới dạng UTF-8.
- Đảm bảo tiếng Việt có dấu hiển thị đúng.
- Đảm bảo không xuất hiện ký tự thay thế (U+FFFD) trong nội dung.

Lệnh kiểm tra nhanh:

```powershell
python -c "from pathlib import Path; import sys; [Path(f).read_text(encoding='utf-8') for f in sys.argv[1:]]; print('UTF-8 OK')" <danh-sach-file-da-thay-doi>
powershell -NoProfile -Command "`$replacement = [char]0xFFFD; Select-String -Path <danh-sach-file-da-thay-doi> -Pattern `$replacement"
```

Nếu bất kỳ kiểm tra nào thất bại:
- Dừng bàn giao.
- Sửa encoding hoặc nội dung trước.
- Chạy lại kiểm tra.

## Gợi Ý Quality Gate Theo Stack

JavaScript/TypeScript:
- `npm test`
- `npm run lint`
- `npm run build`
- `npm run typecheck`

Python:
- `pytest`
- uff check .`
- `mypy .`

PHP:
- `phpunit`
- `phpstan`
- `php -l` để kiểm tra cú pháp

Go:
- `go test ./...`
- `go vet ./...`

Rust:
- `cargo test`
- `cargo clippy -- -D warnings`

## Mẫu Báo Cáo

- Kế hoạch: <các bước đã thực hiện>
- Thay đổi: <file và hành vi thay đổi>
- Xác minh: <lệnh và kết quả>
- Rủi ro: <điểm còn lại cần lưu ý>
- Bước tiếp theo: <tùy chọn>
