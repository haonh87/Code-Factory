# Tài Liệu Tham Chiếu Workflow Chain

## Nguyên Tắc Mô Hình

- Workflow chain mặc định của gói này là chuỗi delivery 8 bước cho một yêu cầu coding cụ thể.
- Mỗi workflow step là một bước nghiệp vụ thật trong quá trình xử lý yêu cầu, không phải một trường mô tả hay một gate kiểm tra.
- `goal`, `input`, `output`, `done_when`, `constraints`, `risks`, `timebox` là bộ metadata chuẩn có thể gắn vào từng step để chi tiết hóa contract thực thi, quality gate và điều kiện handoff khi cần.
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
- `frontend-experience-design`: skill chốt screen behavior, UI state, responsive rule, accessibility baseline và visual direction ở mức đủ để handoff cho delivery.
- `database-design`: skill thiết kế schema, relationship, ownership, retention và audit ở mức design.
- `deployment-devops`: skill điều phối DevOps tổng thể, khóa environment matrix và chọn skill chuyên trách cho `local`, `dev`, `uat`, `prod`.
- `containerization-packaging`: skill khóa contract `Dockerfile`, `.dockerignore`, `compose.yaml`, build artifact và packaging pattern theo ngôn ngữ hoặc workload.
- `platform-runtime-deployment`: skill khóa runtime deploy trên `docker`, `swarm`, `k8s`, cùng topology, networking, secrets, storage, scaling và rollout/rollback.
- `ci-cd-release`: skill khóa pipeline CI/CD, registry, tagging, promotion flow, approval control và release guard.
- `task-breakdown-planner`: skill chia thiết kế thành các task nhỏ để thực thi.
- `implementation`: skill triển khai thay đổi thực tế trong codebase.
- `react-web-implementation`: skill triển khai React web hoặc Next.js với server/client split, data fetching, state placement và loading path rõ ràng.
- `testing`: skill verify theo acceptance criteria và quality gates, với chiến lược rõ giữa unit test, integration/database test và feature test.
- `code-scan-review`: skill quét code ở step 8 verify để kiểm tra syntax, static analysis, security scan và performance heuristic; chi tiết từng ngôn ngữ được tách trong reference của skill.
- `frontend-quality-review`: skill rà soát screen-level quality của frontend ở mức accessibility, responsive layout, interaction feedback và UX heuristic.
- `react-best-practices-review`: skill rà soát render/data boundary, effect hygiene, state placement và performance heuristic đặc thù của React web hoặc Next.js.
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

Chuỗi này nên được đọc theo 6 lớp song song:

- Lớp step: 8 bước delivery từ `Clarify` đến `Verify + DoD`.
- Lớp governance: `constitution`, `project-context`, `checklist`, `exception/waiver` và các ràng buộc chất lượng dùng chung cho toàn workflow.
- Lớp SDD: `BRD/SRS`, requirement IDs, spec freeze, spec change và spec coverage khi work item cần spec-driven delivery.
- Lớp skill nghiệp vụ: skill nào chịu trách nhiệm phân tích, thiết kế, triển khai hoặc kiểm định cho step đó.
- Lớp artifact: nếu step được lưu thành file, phải áp đúng skill Obsidian tương ứng với loại file.
- Lớp execution topology: step đang được vận hành theo kiểu `agentic` hay `multi-agent`, ai giữ ownership và handoff ra sao; nếu runtime không hỗ trợ delegation ổn định thì fallback `sequential_multi_role` được mô tả ở tài liệu runtime.

Điều này có nghĩa là:

- Một step không chỉ có 1 skill duy nhất.
- `codex-workflow-chain` và `step-goal-contract` là lớp nền để điều phối và khóa contract.
- `governance` là lớp mỏng dùng chung: phần lớn được nhúng trực tiếp vào step contract/gate, phần còn lại nằm ở `constitution`, `project-context`, `checklist` và `exception`.
- SDD là lớp ràng buộc thêm khi cần, không tạo workflow riêng hoặc step mới.
- Skill như `requirement-analysis`, `system-design`, `testing` là lớp nghiệp vụ.
- `obsidian-markdown`, `json-canvas`, `obsidian-bases` là lớp artifact, chỉ bật khi step thực sự sinh ra file tương ứng.
- `agentic` và `multi-agent` là lớp execution topology; chúng quyết định cách step được chạy, không đổi ý nghĩa business của step. Trong schema/frontmatter dùng `multi_agent`; `sequential_multi_role` chỉ là runtime fallback.
- Chi tiết SDD xem thêm tại `references/spec-driven-development.md`; cách merge workflow hiện tại với `spec-kit`, `OpenSpec`, `cc-sdd` và `BMAD-METHOD` xem tại `references/sdd-merge-strategy.md`; target architecture để hoàn thiện workflow backbone xem tại `references/target-architecture.md`; rollout cụ thể theo phase, artifact, validator và CI xem tại `references/implementation-blueprint.md`; chi tiết execution policy, role contract, handoff/merge protocol và tích hợp `notebooklm` xem thêm tại `references/execution-runtime.md`; routing `planning_track=quick|full|enterprise` xem tại `references/adaptive-planning.md`.
- Ví dụ áp dụng end-to-end xem tại `references/end-to-end-examples.md`.

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
| `s01` Clarify | `agentic` | Khi phải đọc nhiều nguồn input, nhiều tài liệu hoặc nhiều stakeholder context | `coordinator`, `context-reader`, `restatement-owner` |
| `s02` Business Goal | `agentic` | Khi cần tách product angle và delivery angle để đối chiếu | `coordinator`, `product-owner-proxy`, `delivery-challenger` |
| `s03` Open Questions | `agentic` | Khi phải song song đọc codebase, tài liệu và dependency ngoài | `coordinator`, `codebase-reader`, `question-synthesizer` |
| `s04` Acceptance + DoR | `agentic` | Khi cần một agent viết criteria và một agent khác kiểm tra testability/readiness | `coordinator`, `criteria-author`, `ready-gate-checker` |
| `s05` Technical Approach | `agentic` hoặc `multi-agent` | Khi solution đụng nhiều backend/frontend/data boundary hoặc cần so sánh nhiều option sâu | `coordinator`, `solution-designer`, `backend-architect`, `frontend-architect`, `data-architect` |
| `s06` Task Plan | `agentic` hoặc `multi-agent` | Khi cần tách planning theo track thực thi, verify hoặc release | `coordinator`, `planner`, `dependency-reviewer` |
| `s07` Implement | `agentic` cho change nhỏ; `multi-agent` cho change lớn | Khi có nhiều module/file ownership có thể triển khai song song | `coordinator`, `builder`, `migration-owner`, `doc-owner` |
| `s08` Verify + DoD | `agentic` hoặc `multi-agent` | Khi cần tách testing, code scan, database review, deployment review và final audit | `coordinator`, `tester`, `scan-reviewer`, `database-reviewer`, `deployment-reviewer`, `auditor` |

## Đối Ứng Giữa Execution Topology Với Skill

| Nhóm skill hoặc skill | Vai trò điển hình trong `agentic` | Vai trò điển hình trong `multi-agent` |
|---|---|---|
| `requirement-analysis`, `product-thinking` | Agent chính tự phân tích và khóa ý nghĩa business của step | Worker kiểu `analyst` hoặc `product-owner-proxy` cung cấp input cho coordinator |
| `brainstorming`, `system-design` | Agent chính tự so sánh phương án rồi chốt recommendation | Worker kiểu `solution-designer`; nhiều worker có thể đại diện cho các option khác nhau |
| `domain-architecture`, `frontend-architecture`, `frontend-experience-design`, `database-design` | Agent chính gọi sâu theo boundary thật sự bị tác động | Specialist worker sở hữu từng boundary kiến trúc hoặc screen behavior riêng |
| `task-breakdown-planner` | Agent chính tự chia task và kiểm tra dependency | `planner` worker tạo plan, `dependency-reviewer` kiểm tra đường găng |
| `deployment-devops` | Agent chính tự khóa scope DevOps tổng, environment matrix và hướng phối hợp giữa packaging, runtime, release | Worker kiểu `platform-architect`, `release-planner` hoặc `deployment-reviewer` cung cấp plan tổng và evidence cho coordinator |
| `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` | Agent chính tự khóa contract sâu theo từng layer packaging, runtime hoặc pipeline/release | Specialist worker kiểu `image-packager`, `platform-architect` hoặc `release-engineer` sở hữu output DevOps theo layer |
| `implementation`, `react-web-implementation` | Agent chính tự sửa code trong phạm vi nhỏ hoặc vừa, có thể gọi sâu framework-specific guidance khi cần | Nhiều `builder` worker chia theo module hoặc path ownership; frontend builder có thể sở hữu riêng boundary React |
| `testing`, `code-scan-review`, `frontend-quality-review`, `react-best-practices-review`, `database-change-review` | Agent chính tự verify và ghi evidence | Verifier worker tách riêng theo loại kiểm định hoặc framework review |
| `notebooklm` | Agent chính tự dùng để tóm lược/query corpus lớn khi step có nhiều nguồn ngoài | Worker kiểu `notebooklm-researcher` gom insight từ notebook rồi handoff về coordinator; output chỉ là context phụ |
| `step-goal-contract`, `input-readiness-assessor`, `step-goal-auditor`, `definition-of-ready-gate`, `definition-of-done-gate` | Guardrail nội bộ của cùng agent | Lớp contract/audit chung cho coordinator và worker; không thuộc ownership riêng của business skill |

## Cách Đọc Input/Output Theo Ngôn Ngữ Business

- `Input` là thông tin, quyết định hoặc bằng chứng mà step cần nhận để có thể bắt đầu an toàn.
- `Output` là thứ step phải bàn giao cho bước sau hoặc cho stakeholder; mô tả theo giá trị business trước, rồi mới ghi tên artifact trong ngoặc khi cần trace.
- Nếu phải giải thích nhanh cho người không quan tâm tên spec, hãy đọc mỗi step theo mẫu: "nhận gì -> trả ra gì -> câu hỏi nào được trả lời".

| Step | Nhận vào theo ngôn ngữ business | Trả ra theo ngôn ngữ business | Câu hỏi được trả lời |
|---|---|---|---|
| `s01` Clarify | Yêu cầu thô từ user/ticket, bối cảnh ban đầu và các ràng buộc đã biết | Bản hiểu chung về yêu cầu, khung phạm vi ban đầu và `governance context` liên quan để không hiểu sai | "Chúng ta đang được yêu cầu giải quyết việc gì, dưới những ràng buộc nào?" |
| `s02` Business Goal | Bản hiểu chung về yêu cầu và ý định của stakeholder | Mục tiêu business, giá trị mong đợi, chỉ số thành công và phần chủ động không làm | "Vì sao việc này đáng làm và kết quả mong muốn là gì?" |
| `s03` Open Questions | Mục tiêu business cùng mọi thông tin hiện có | Danh sách điểm còn thiếu, mâu thuẫn, `governance blocker` hoặc quyết định còn mở trước khi đi tiếp | "Còn thiếu gì để không làm sai hoặc làm lệch nguyên tắc?" |
| `s04` Acceptance + DoR | Mục tiêu business đã rõ và câu trả lời cho phần mơ hồ | Bộ tiêu chí chấp nhận đo được, mức độ sẵn sàng thực thi và kết quả `governance checks` cần có trước khi sang design/chia task | "Làm thế nào thì được xem là làm đúng và đủ sẵn sàng?" |
| `s05` Technical Approach | Tiêu chí chấp nhận đã chốt, `governance context` và bối cảnh hệ thống hiện tại | Cách làm kỹ thuật được chọn, lý do chọn, boundary bị tác động và `governance exception` nếu có lệch chuẩn | "Sẽ giải quyết bằng cách nào mà vẫn bám đúng nguyên tắc?" |
| `s06` Task Plan | Cách làm kỹ thuật đã chọn | Kế hoạch triển khai thành các việc nhỏ có thứ tự, có checkpoint review/verify và có coverage cho yêu cầu `governance` liên quan | "Cần làm những việc gì, theo thứ tự nào và cần kiểm ở đâu?" |
| `s07` Implement | Kế hoạch triển khai, codebase hiện tại và các rule đã chốt | Thay đổi thực tế trong code/config/doc theo đúng phạm vi đã chốt, cùng `governance exception` nếu phát sinh | "Giải pháp đã được tạo ra đúng hướng và đúng rule chưa?" |
| `s08` Verify + DoD | Thay đổi thực tế, tiêu chí chấp nhận và các checklist liên quan | Bằng chứng đạt/chưa đạt, mức độ hoàn tất, mức độ tuân thủ `governance` và phần còn lại nếu có | "Kết quả có thật sự đáp ứng yêu cầu và đạt mức chất lượng cần thiết không?" |

## Sơ Đồ Workflow-Skill-Step Ngắn Gọn

```text
S1 Clarify
-> requirement-analysis
-> product-thinking
-> output: bản hiểu chung về yêu cầu + khung phạm vi ban đầu + governance context ban đầu (restatement-spec + discovery-framing-spec + governance-context khi cần)

S2 Business Goal
-> product-thinking
-> output: mục tiêu business + phần không làm (business-goal-spec)

S3 Open Questions
-> requirement-analysis
-> input-readiness-assessor
-> step-goal-auditor
-> output: danh sách phần còn thiếu + governance blocker nếu có + trạng thái sẵn sàng đầu vào + audit step (readiness-spec + input-readiness-report + step-audit)

S4 Acceptance + DoR
-> requirement-analysis
-> definition-of-ready-gate
-> output: acceptance criteria đo được + kết luận DoR + governance checks cho readiness (acceptance-criteria-spec + definition-of-ready + governance-checklist khi cần)

S5 Technical Approach
-> brainstorming
-> system-design
-> khi cần: domain-architecture | frontend-architecture | frontend-experience-design | database-design | deployment-devops | containerization-packaging | platform-runtime-deployment | ci-cd-release
-> output: phương án kỹ thuật khuyến nghị + chi tiết kiến trúc cần khóa + deployment topology khi scope có runtime delivery (option-analysis-spec + technical-approach-spec + architecture-detail-spec khi cần)

S6 Task Plan
-> task-breakdown-planner
-> khi cần: deployment-devops | containerization-packaging | platform-runtime-deployment | ci-cd-release
-> output: kế hoạch task có thứ tự + checkpoint review/verify/governance + rollout/promotion notes khi có (task-breakdown-spec + governance-checklist khi cần)

S7 Implement
-> implementation
-> khi cần: react-web-implementation
-> khi cần: deployment-devops | containerization-packaging | platform-runtime-deployment | ci-cd-release
-> output: thay đổi thực tế đã được thực hiện, gồm Dockerfile/compose/manifests/pipeline khi thuộc phạm vi và implementation notes khi stack là React web hoặc Next.js (implementation-spec + implementation-notes khi cần)

S8 Verify + DoD
-> testing
-> code-scan-review
-> khi cần: frontend-quality-review | react-best-practices-review
-> step-goal-auditor
-> definition-of-done-gate
-> khi cần: database-change-review | deployment-devops | containerization-packaging | platform-runtime-deployment | ci-cd-release
-> output: bằng chứng verify + governance compliance/checklist + review findings khi có + deployment review khi có + kết luận DoD (verification-spec + governance-checklist khi cần + scan-summary + review-findings khi có + database-review khi có + deployment-review khi có + step-audit + definition-of-done)
```

Ghi chú:

- Mọi step đều đi qua `codex-workflow-chain`.
- Theo workflow chuẩn hiện tại, mọi step đều có `step-goal-contract`.
- Nếu step được scaffold thành note `.md`, phải cộng thêm `obsidian-markdown` dù cột skill nghiệp vụ không lặp lại điều đó ở mọi dòng.
- Khi work item phụ thuộc nhiều tài liệu ngoài hoặc corpus lớn, có thể dùng `notebooklm` ở step 1, 3, 5 hoặc khi cần ở step 8; output phải được chuẩn hóa lại vào note `.md` của step.

## Làn DevOps Và Promotion Giữa Môi Trường

Làn DevOps không thay workflow 8 bước; nó là một delivery lane chạy xuyên step 5 -> 8 khi work item có packaging hoặc rollout.

- Step 5: khóa environment matrix, runtime target và packaging contract.
- Step 6: tách task build image, compose, manifest, promotion, smoke và rollback.
- Step 7: triển khai artifact thực tế như `Dockerfile`, `compose.yaml`, manifest hoặc pipeline config.
- Step 8: verify packaging, deploy readiness và release recommendation trước khi promote.
- Rollout thật lên `dev`, `uat`, `prod` chỉ nên diễn ra sau khi step 8 đã có đủ evidence hoặc đã chấp nhận guard rõ ràng.

| Environment | Mục tiêu | Runtime hợp lệ | Artifact tối thiểu | Gate tối thiểu |
|---|---|---|---|---|
| `local` | Chạy được trên máy developer với baseline gần production | `docker` | `Dockerfile`, `compose.yaml` | image build pass, `docker compose config` pass, boot hoặc smoke pass |
| `dev` | Xác nhận artifact deploy được và dễ quan sát | `docker`, `swarm`, `k8s` | image contract + artifact runtime tương ứng | deploy pass, health pass |
| `uat` | Kiểm chứng gần production và phục vụ sign-off | `docker`, `swarm`, `k8s` | cùng image contract với luồng promote | smoke pass, guard theo môi trường |
| `prod` | Rollout an toàn, có rollback | `docker`, `swarm`, `k8s` | artifact runtime production + plan rollback | rollout strategy rõ, verification sau deploy, rollback path |

## Phân Loại Work Item

`work_item_type` là metadata bắt buộc khi scaffold note workflow để giữ routing nhất quán giữa discovery và delivery.

- `FEATURE`: thêm capability hoặc hành vi mới.
- `BUG`: sửa hành vi sai so với kỳ vọng hiện có.
- `CHANGE`: đổi hành vi hiện có theo yêu cầu mới.
- `REFACTOR`: đổi cấu trúc nội bộ, không chủ đích đổi behavior business.
- `RESEARCH`: điều tra hoặc spike kỹ thuật, có thể chưa đi tới implement production.

## Workflow 8 Bước

Quy ước:
- Bảng này là contract ngắn của 8 step; chi tiết skill nằm ở phần `Sơ Đồ Workflow-Skill-Step Ngắn Gọn` và `Spec Phát Sinh Và Contract Cấp Step`.
- Tên ngắn chỉ là display name; `step_id`, `step_slug` và naming file chuẩn không đổi.
- Nếu step sinh artifact Obsidian, vẫn áp dụng thêm skill Obsidian tương ứng theo mục `Quy Tắc Bắt Buộc Cho Artifact Obsidian`.

| Step | Tên ngắn | Mục tiêu | Output chính | Gate chuyển bước |
|---|---|---|---|---|
| `s01` | Clarify | Làm rõ yêu cầu, bối cảnh, phạm vi, giả định ban đầu và `governance context` liên quan | `restatement-spec`, `discovery-framing-spec`, `governance-context` khi cần; `brd-spec` khi SDD | Context rõ; `governance context` ban đầu đã được ghi nhận; evidence quan trọng đã chuẩn hóa vào note hoặc `BRD` |
| `s02` | Business Goal | Chốt mục tiêu business, KPI, scope boundary, non-goals và mức độ phù hợp với các nguyên tắc nền | `business-goal-spec`, `brd-spec` khi SDD | Goal, KPI/success metric, scope và phần không làm đã rõ; xung đột với `governance` nếu có đã được ghi nhận |
| `s03` | Open Questions | Gom missing input, conflict, blocker, `governance gap` và gap `BRD/SRS` | `readiness-spec`, `input-readiness-report`, `step-audit`; decision log `BRD/SRS`; `governance-context` update khi cần | `READY` hoặc mọi blocker trọng yếu, kể cả `governance blocker`, đều có owner/resolution rõ |
| `s04` | Acceptance + DoR | Chốt requirement/AC, testability, readiness, `governance alignment` và spec freeze khi SDD | `acceptance-criteria-spec`, `definition-of-ready`, `governance-checklist` khi cần, `srs-spec`, `spec-freeze-gate` khi SDD | AC đo được; DoR ready; `governance checks` đạt hoặc đã có waiver/owner rõ; spec `approved|frozen` hoặc có lý do chưa freeze rõ |
| `s05` | Technical Approach | Chọn approach, trade-off và boundary kỹ thuật/UX/DevOps trong các ràng buộc `governance` đang áp dụng | `option-analysis-spec`, `technical-approach-spec`, `architecture-detail-spec`; `governance-exception` khi có lệch chuẩn; `spec-change` khi có gap | Approach trace được về requirement/AC; không vi phạm `governance` hoặc đã ghi rõ `exception/waiver`; spec gap không bị bỏ qua |
| `s06` | Task Plan | Lập task plan build/verify/release có traceability, checkpoint review và coverage cho các yêu cầu `governance` liên quan | `task-breakdown-spec`, `governance-checklist` khi cần, `spec-traceability-matrix` khi SDD | Task đủ nhỏ, có thứ tự, có coverage cho requirement in-scope và các task review/verify/governance cần thiết |
| `s07` | Implement | Thực thi đúng approach, frozen spec, change đã approve và các rule `governance` đã chốt | Code/config/doc changes, `implementation-spec`, `implementation-notes`; `governance-exception` khi cần; `spec-change` khi cần | Output đáp ứng contract; không có spec drift hoặc `governance drift` chưa được ghi nhận/approve |
| `s08` | Verify + DoD | Kiểm chứng evidence, coverage, `governance compliance`, DoD, release và business acceptance khi cần | `verification-spec`, `governance-checklist` khi cần, `spec-coverage-report`, review reports, `definition-of-done`, `governance-exception` khi còn điểm lệch mở | Coverage/evidence rõ; DoD kết luận rõ; mức độ tuân thủ `governance` minh bạch; gap còn lại có owner/next action |

## Lớp Governance

`Governance` trong workflow này là lớp mỏng dùng chung, không phải step riêng.

Nguyên tắc áp dụng:

- Không tạo `step 0` hoặc một workflow governance riêng.
- Phần lớn `governance` được nhúng trực tiếp vào `step-goal-contract`, gate và handoff của từng step.
- Chỉ giữ một số artifact dùng chung ở mức project hoặc work item như `constitution`, `project-context`, `governance-checklist`, `governance-exception`.
- `Clarify` phải ghi nhận `governance context` trước khi đi sâu vào `Technical Approach`.
- `Acceptance + DoR` và `Task Plan` là hai điểm tự nhiên để kiểm xem yêu cầu `governance` đã được phản ánh vào acceptance, verify direction và task coverage hay chưa.
- `Implement` không được âm thầm đi lệch nguyên tắc; mọi lệch chuẩn phải được ghi bằng `governance-exception` hoặc `waiver`.
- `Verify + DoD` phải kết luận rõ mức độ `governance compliance`, không chỉ kết luận feature pass.

Artifact nền khuyến nghị:

- `project-context/constitution.md`: nguyên tắc nền của dự án hoặc team.
- `project-context/project-context.md`: bối cảnh, ràng buộc và preference đang có hiệu lực.
- `project-context/governance-decision-model.md`: decision rule cho profile, status và exception.
- `project-context/governance-role-model.md`: authority model cho role, signoff, exception và waiver.
- `project-context/checklists/*.md`: checklist profile dùng lại cho readiness, review hoặc DoD.
- `project-context/governance-exception-register.md`: register theo dõi exception hoặc waiver còn mở ở mức project/work item.

### Governance Pack Mặc Định Của Repo

Governance Pack của repo đã được triển khai tại `project-context/`.

Quy ước dùng ngay:

- `governance_ref` mặc định trỏ `../../../../project-context/project-context.md`.
- `governance_profile=default`:
  dùng `../../../../project-context/checklists/default.md`.
- `governance_profile=strict`:
  dùng `../../../../project-context/checklists/strict.md`.
- `governance_profile=regulated`:
  dùng `../../../../project-context/checklists/regulated.md`.
- `governance_profile=custom`:
  vẫn nên kế thừa ít nhất một checklist profile nền và nêu rõ ref bổ sung.
- nếu `governance-exception` còn mở quá một step hoặc ảnh hưởng `DoD`, `release`, `business_acceptance`, phải cập nhật thêm `../../../../project-context/governance-exception-register.md`.

Thứ tự đọc tối thiểu:

1. `../../../../project-context/constitution.md`
2. `../../../../project-context/project-context.md`
3. `../../../../project-context/governance-decision-model.md`
4. `../../../../project-context/governance-role-model.md`
5. checklist profile tương ứng
6. `../../../../project-context/governance-exception-register.md` nếu work item có exception hoặc waiver đang mở

## Lớp SDD: Spec Driven Development

Chi tiết SDD đầy đủ nằm ở `references/spec-driven-development.md`.

Nguyên tắc áp dụng:

- SDD không tạo workflow mới; nó thêm ràng buộc lên artifact, gate và traceability của cùng workflow 8 bước.
- Khi work item đủ lớn để cần spec chính thức, `BRD` và `SRS` là source-of-truth rollout; note workflow step là execution trace.
- Cuối step 4 là điểm spec review/`spec-freeze-gate` tự nhiên trước khi đi sâu vào technical approach.
- Từ step 5 trở đi, design/task/implementation/test phải reference `BRD-*`, `SRS-*`, `AC-*`, `TASK-*`, `TEST-*` khi work item chạy theo SDD.
- Nếu code hoặc design phát hiện spec gap sau khi spec đã frozen, phải tạo `spec-change` thay vì âm thầm làm lệch `SRS`.
- Step 8 phải có `spec-coverage-report` khi work item có `SRS` chính thức.

## Workflow Theo Role

Chi tiết vận hành đầy đủ cho role, BRD/SRS và NotebookLM retrieval nằm ở `references/role-aware-workflow.md`.

Nguyên tắc chung:

- Vẫn giữ một workflow 8 bước duy nhất; role chỉ là lớp overlay ownership và handoff, không phải workflow riêng.
- Chỉ tách output riêng theo role khi role đó thật sự có owner, handoff hoặc signoff cần audit.
- Nếu không cần artifact riêng, role outputs nên được ghi trong note step chính dưới block `## Role Outputs`.
- `execution_roles` chỉ liệt kê role thực sự tham gia step; không liệt kê role mặc định cho đủ bộ.
- `notebooklm` là lớp lưu corpus và tra cứu trong khi thực thi; kết quả query chỉ là input/evidence tạm thời cho PO/BA và phải được chuẩn hóa lại vào artifact chính nếu dùng để ra quyết định.
- `BRD` và `SRS` là product rollout artifacts của quy trình phát triển sản phẩm, không phải storage backend; workflow step có thể tạo mới, cập nhật hoặc signoff các artifact này.

### BRD/SRS Trong Workflow Rollout

| Artifact | Owner chính | Sinh/cập nhật ở step | Nội dung nên chứa | Quan hệ với NotebookLM |
|---|---|---|---|---|
| `BRD` | `po`, `ba` support | `s01`, `s02`, `s03`, `s04`; signoff ở `s08` khi cần business acceptance | business context, stakeholder, problem, goal, KPI, scope, out-of-scope, business rule, assumption, decision log | NotebookLM có thể lưu và query nguồn tham khảo, meeting note, ticket, research; kết luận phải được ghi lại vào `BRD` nếu dùng làm quyết định |
| `SRS` | `ba`, `developer/qc/designer` review | `s03`, `s04`, `s05`, `s06`; verify ở `s08` | functional requirement, NFR, UX/system behavior, acceptance criteria, traceability, dependency, constraint | NotebookLM có thể giúp tìm requirement cũ, policy, user flow, tài liệu dự án; requirement cuối cùng phải nằm trong `SRS` hoặc note workflow nguồn sự thật |

Mapping nhanh:

- `s01`: tạo khung `BRD` ban đầu từ yêu cầu và context đã tra cứu.
- `s02`: cập nhật `BRD` với business goal, KPI, priority và scope boundary.
- `s03`: dùng search/project docs/NotebookLM để gom missing info, rồi cập nhật open questions hoặc decision log cho `BRD/SRS`.
- `s04`: tạo hoặc cập nhật `SRS` với requirement, business rule, acceptance criteria và DoR.
- `s05`: dùng `SRS` làm input cho technical approach; chỉ cập nhật `SRS` nếu design phát hiện requirement/constraint cần đổi.
- `s06`: trace task breakdown về requirement và AC trong `SRS`.
- `s07`: implementation phải bám `SRS`; nếu behavior đổi ngoài spec thì cập nhật `SRS` hoặc ghi exception trước khi verify.
- `s08`: verify theo `SRS`; `business_acceptance` xác nhận implementation đáp ứng `BRD/SRS`, còn `release` xác nhận đủ điều kiện ship.

### Ma Trận Vai Trò Mặc Định

| Role | Step chính | Input chính | Output chính | Skill nền | Signoff mặc định |
|---|---|---|---|---|---|
| `po` | `s01`, `s02`, `s04`, `s08` | vision, roadmap, stakeholder priority, KPI, scope boundary, business constraint, BRD draft | BRD sections, scope decision, success target, business decision, business acceptance verdict | `product-thinking`, `requirement-analysis`, `step-goal-contract` | `dor`, `business_acceptance` |
| `ba` | `s01`, `s03`, `s04`; hỗ trợ `s02`, `s05`, `s06` | stakeholder notes, business rules, as-is flow, glossary, existing docs, policy/compliance context, NotebookLM/project search results, BRD | SRS sections, requirement brief, open questions, clarified rules, acceptance criteria, traceability | `requirement-analysis`, `product-thinking`, `step-goal-contract`, `notebooklm` khi cần corpus retrieval | hỗ trợ `dor` |
| `designer` | `s01`, `s02`, `s04`, `s05` khi scope chạm UX/UI; hỗ trợ `s08` | user journey, screen context, brand/UI constraint, accessibility baseline, device/platform constraint | user flow, screen behavior, visual/interaction constraint, UX acceptance note | `frontend-experience-design`, `product-thinking`, `requirement-analysis`, `brainstorming` | `approach` cho UX surface, hỗ trợ `business_acceptance` |
| `developer` | `s05`, `s06`, `s07`; hỗ trợ `s08` | DoR, acceptance criteria, codebase context, technical constraint, NFR, architecture boundary | technical approach, task breakdown, code/config changes, migration note, implementation note | `system-design`, `task-breakdown-planner`, `implementation`, `react-web-implementation` khi cần | `approach` |
| `qc` | `s04`, `s08`; hỗ trợ `s06`, `s07` | acceptance criteria, business rules, changed scope, environment matrix, testability risk | test strategy, scenario matrix, evidence, defect list, DoD verdict, release recommendation | `testing`, `code-scan-review`, `definition-of-done-gate`, `frontend-quality-review`, `react-best-practices-review`, `database-change-review` | `dod`, `release` |
| `devops` | `s05`, `s06`, `s07`, `s08` khi có packaging/runtime/release scope | runtime target, environment matrix, secrets/network/storage constraint, rollback requirement | deployment plan, packaging/runtime contract, pipeline/release plan, rollout note, rollback note, deployment review | `deployment-devops`, `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` | `release` |

### Ma Trận Vai Trò Theo Step

| Step | Primary role mặc định | Supporting role thường gặp | Role outputs chính |
|---|---|---|---|
| `s01` Clarify | `po`, `ba` | `designer` khi scope chạm UX/UI; `developer` khi cần khóa codebase context sớm | bản restate chung, discovery framing, khung `BRD` ban đầu, assumption ban đầu, stakeholder context |
| `s02` Business Goal | `po` | `ba`; `designer` khi cần xác nhận user value hoặc UX objective | `BRD` update cho business goal, KPI, out-of-scope, business priority |
| `s03` Open Questions | `ba` | `po`, `designer`, `developer`, `qc`, `devops` tùy loại blocker | open questions theo business, UX, technical, verify, release; NotebookLM/project-search evidence khi dùng; readiness status; `BRD/SRS` decision log update |
| `s04` Acceptance + DoR | `ba`, `qc` | `po`; `designer` khi criteria có UX rule; `developer` khi cần check implementability | `SRS` update cho requirement, business rule, acceptance criteria đo được, testability note, DoR decision |
| `s05` Technical Approach | `developer` | `designer` khi có UX/UI surface; `devops` khi có runtime/release scope; `ba` để trace business rule | technical approach, boundary kiến trúc, UX interaction contract, deployment contract, `SRS` update nếu requirement/constraint đổi |
| `s06` Task Plan | `developer` | `qc`, `devops`; `designer` khi có track UX refinement | task plan theo track build, verify, release; dependency, handoff, traceability về requirement trong `SRS` |
| `s07` Implement | `developer` | `devops` khi tạo delivery artifact; `designer` khi có asset/interaction polish; `qc` để chuẩn bị evidence hook | code/config/doc changes, implementation note, packaging/runtime/pipeline artifact trong scope, `SRS` exception/update nếu behavior đổi |
| `s08` Verify + DoD | `qc` | `developer`, `devops`; `po` cho `business_acceptance`; `designer` khi cần review UX outcome | evidence pack, findings, DoD verdict, release readiness, business acceptance decision dựa trên `BRD/SRS` |

### Owner Mặc Định Cho `role_signoffs`

| Signoff | Owner mặc định | Khi nào mở rộng |
|---|---|---|
| `dor` | `po`, `ba` | Thêm `designer` khi scope phụ thuộc UX/UI để được xem là ready; thêm `qc` khi testability là rủi ro chính |
| `approach` | `developer` | Thêm `designer` khi technical approach có interaction hoặc visual contract; thêm `devops` khi approach chạm runtime, pipeline hoặc rollout |
| `release` | `qc`, `devops` | Thêm `developer` khi chưa có lane DevOps riêng hoặc release risk nằm ở migration/code path |
| `business_acceptance` | `po` | `ba` và `designer` chỉ nên đóng vai trò review/support, không thay PO chốt acceptance cuối nếu PO tồn tại |
| `dod` | `qc` | `developer` hoặc `devops` cung cấp remediation evidence nhưng không thay ownership verify cuối |

### Best Practice Cho Role-Aware Workflow

- `PO` nên signoff business value và scope boundary, không signoff chi tiết technical approach thay cho `developer`.
- `BA` nên giữ traceability xuyên `s01 -> s04`; không để business rule chỉ tồn tại trong step 5 trở đi.
- `Designer` nên vào từ discovery nếu feature có screen, interaction, content flow hoặc accessibility implication; không đẩy toàn bộ UX decision sang cuối step 7.
- `QC` nên tham gia từ `s04` để criteria có thể verify, thay vì chỉ xuất hiện ở `s08`.
- `DevOps` nên vào từ `s05` nếu feature có packaging, runtime, promotion hoặc rollback impact; không để release lane xuất hiện muộn ở cuối verify.
- `Developer` chịu trách nhiệm technical coherence giữa step 5, 6, 7; không chia task khi approach còn mơ hồ.
- Chỉ tạo artifact riêng theo role khi thật sự có owner và handoff; mặc định nên giữ một note step chính làm nguồn sự thật.
- `business_spec` nên được thể hiện rõ bằng `BRD`/`SRS` hoặc section tương đương trong note workflow; `business_acceptance` là signoff xác nhận implementation cuối cùng đáp ứng tập artifact đó.
- `notebooklm` dùng để lưu corpus và tra cứu trong quá trình thực thi; không coi notebook/query result là output rollout cuối nếu chưa được đưa vào `BRD`, `SRS` hoặc note workflow chính.

## Quy Tắc Bắt Buộc Cho Artifact Obsidian

- Note `.md` là artifact chuẩn cho workflow doc; khi một step được lưu thành file thì `.md` là nguồn sự thật mặc định.
- `json-canvas` và `obsidian-bases` chỉ được dùng làm artifact phụ; chúng không được chứa quyết định chuẩn mà note `.md` không có.
- `obsidian-cli` chưa nằm trong scope mặc định của workflow này.

## Giải Nghĩa Lớp Obsidian

Luật artifact không thay thế workflow step; nó chỉ quy định cách scaffold và ghi nhận kết quả của step.

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
| `s01` Clarify | `.md` | Không có | `obsidian-markdown` nếu lưu artifact | `.canvas`, `.base` |
| `s02` Business Goal | `.md` | Không có | `obsidian-markdown` nếu lưu artifact | `.canvas`, `.base` |
| `s03` Open Questions | `.md` | Không có | `obsidian-markdown` nếu lưu artifact | `.canvas`, `.base` |
| `s04` Acceptance + DoR | `.md` | Không có | `obsidian-markdown` nếu lưu artifact | `.canvas`, `.base` |
| `s05` Technical Approach | `.md` | `.canvas` | `obsidian-markdown` cho note chuẩn; `json-canvas` nếu có sơ đồ | `.base` |
| `s06` Task Plan | `.md` | `.canvas`, `.base` | `obsidian-markdown` cho note chuẩn; `json-canvas` nếu có task map; `obsidian-bases` nếu có dashboard | Không có ngoài danh sách cho phép |
| `s07` Implement | Không có artifact workflow bắt buộc; source of truth là thay đổi code/config/doc thực tế | `.md` chỉ khi có doc_changes hoặc handoff doc trong scope | `obsidian-markdown` nếu tạo/sửa `.md` | `.canvas`, `.base` |
| `s08` Verify + DoD | `.md` | `.base` | `obsidian-markdown` cho report chuẩn; `obsidian-bases` nếu có dashboard tổng hợp | `.canvas` |

## Luật Áp Dụng

- Nếu một step có `artifact chuẩn = .md`, không được chỉ giao `.canvas` hoặc `.base` mà thiếu note `.md`.
- Nếu có cả artifact chuẩn và artifact phụ, mọi quyết định chuẩn, acceptance criteria, risk kết luận và next action phải xuất hiện trong note `.md` trước.
- `.canvas` chỉ dùng để trực quan hóa cấu trúc, flow, task map hoặc dependency map.
- `.base` chỉ dùng để tổng hợp, lọc, xem bảng hoặc dashboard từ các note/artifact đã có.
- Step 7 chỉ dùng Obsidian skill khi thay đổi thực tế chạm vào tài liệu `.md`; không ép tạo note workflow riêng nếu không có giá trị.
- Trong frontmatter note workflow, tách `content_skills` và `artifact_skills`; không gộp chung để tránh nhầm giữa skill tạo nội dung với skill tạo artifact.
- `upstream_artifacts` dùng để khai báo đầu vào trực tiếp; `## Traceability` dùng để nối mạch business -> readiness -> design -> implementation -> verify.

## Template Output Chuẩn Theo Step

### Quy Ước Chung Cho Note `.md`

- Nếu một step được lưu thành file, note `.md` là artifact chuẩn và là nguồn sự thật.
- Dùng cấu trúc note theo thứ tự cố định:
  1. frontmatter
  2. tiêu đề `# Step N - <tên step>`
  3. callout `summary`
  4. block bắt buộc theo step
  5. `## Role Outputs` khi cần trace rõ đóng góp của từng role nghiệp vụ
  6. `## Spec Freeze`, `## Spec Change`, `## SDD Traceability` hoặc `## Spec Coverage` khi work item chạy theo SDD và step tương ứng cần block đó
  7. `## Execution Topology` khi cần trace cách step được vận hành
  8. `## Traceability`
  9. `## Handoff`
  10. `## Links` nếu có artifact phụ
- Tên file, frontmatter và link artifact phải bám cùng một `work_item_slug`.
- Với step có artifact phụ, link artifact phụ trong `## Links`; không chôn quyết định chuẩn trong artifact phụ.
- `## Role Outputs` là block tùy chọn; chỉ bật khi một step có nhiều role cùng ownership, có role-specific handoff, hoặc cần audit rõ signoff contribution.
- Trong `## Role Outputs`, mô tả contribution thực tế của từng role cho step; không lặp lại nguyên văn summary hoặc output tổng của step nếu role không thêm ownership riêng.
- Các block SDD là tùy chọn theo scope; khi `sdd_mode=strict`, step 4 nên có `## Spec Freeze`, step 5-7 có `## Spec Change` nếu phát hiện gap, step 6 có `## SDD Traceability`, và step 8 có `## Spec Coverage`.

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
  - step 5 execution runtime: `<work_item_slug>.s05.execution-policy.md`
  - step 6 canvas: `<work_item_slug>.s06.task-map.canvas`
  - step 6 base: `<work_item_slug>.s06.task-dashboard.base`
  - step 6 execution runtime: `<work_item_slug>.s06.worker-assignment.md`
  - step 7 execution runtime: `<work_item_slug>.s07.worker-handoff-report.md`
  - step 7 execution runtime: `<work_item_slug>.s07.merge-report.md`
  - step 8 base: `<work_item_slug>.s08.verification-dashboard.base`
  - step 8 execution runtime khi cần: `<work_item_slug>.s08.execution-escalation.md`
- Không dùng tên file mơ hồ kiểu `analysis.md`, `final.md`, `design-v2.md`, `notes.base`.
- Không đặt tên file workflow theo loại nội dung cảm tính như `requirements.md`, `architecture.md`, `assessment.md`, `threshold.md`, `glossary.md`.
- Mapping chuẩn:
  - `requirements` -> map về `s01.restate`, `s03.open-questions` hoặc `s04.acceptance-criteria` tùy ý nghĩa thực tế.
  - `architecture` hoặc `design` -> `s05.technical-approach.md`; nếu là sơ đồ thì `s05.architecture.canvas`.
  - `assessment` -> `s03.open-questions.md` nếu đánh giá readiness đầu vào, hoặc `s08.verification.md` nếu đánh giá sau implement.
  - `threshold` -> không tách file riêng; gộp vào `s04.acceptance-criteria.md`.
- `glossary` -> không phải step file; chỉ là section hoặc note dùng chung ngoài workflow step.
- Nếu team cần rule ngắn gọn và validator riêng, xem `policies/codex/workflow-artifact-naming.md`, dùng `wfc naming`, `wfc governance` hoặc chạy command chuẩn `wfc validate --workflow-root work-items --project-root <repo-root>`. Nếu repo đã map root scripts thì `npm run validate:workflow*` là alias tương đương.
- Nếu cần automation ở mức PR/push thay vì chỉ local validate, xem thêm `workflow-ci-enforcement.md`.

### Workflow Authoring Chuẩn

Public baseline `v1.0.0` dùng flow manual scaffold:

1. Human hoặc coordinator chốt `work_item_slug`.
2. Nếu work item gắn với một thay đổi đã được tách package, scaffold change package trước:
   - `wfc scaffold-change --change-id <CHANGE-ID> --work-item <work_item_slug>`
3. Scaffold note bằng command chuẩn:
   - `wfc scaffold --work-item <work_item_slug> --planning-track <quick|full|enterprise>`
   - `wfc scaffold-step --work-item <work_item_slug> --step <sNN>`
4. Điền nội dung thực tế vào các block đã sinh.
5. Chạy validator:
   - `wfc validate --workflow-root work-items --project-root <repo-root>`
   - nếu work item chạy theo SDD, chạy thêm `wfc sdd --workflow-root work-items --project-root <repo-root>`
   - nếu work item có `change_id`, chạy thêm `wfc change --workflow-root work-items --project-root <repo-root>`
   - nếu work item có execution metadata hoặc runtime artifacts, chạy thêm `wfc exec --workflow-root work-items`
   - nếu work item dùng `planning_track` khác mặc định hoặc muốn enforce routing rule, chạy thêm `wfc plan --workflow-root work-items`

Extension sau `v1.0.0` có thể thêm một gate trước bước 1:

1. Chạy `Work Item Materialization` để chốt `split_decision`, `work_item_slug`, dedup result và `change_strategy`.
2. Nếu dự án dùng `Work Item Protocol`, chốt `protocol_status`, authority và handoff ở cấp work item trước khi scaffold.

Ghi chú:

- `Work Item Materialization` và `Work Item Protocol` không thuộc public baseline `v1.0.0`; chỉ đọc chúng khi muốn bật extension sau này.
- `scaffold:workflow` mặc định sinh vào `work-items/<work_item_slug>/` nếu không truyền `--workflow-root`.
- `work-items/` là canonical artifact root cho workflow artifacts thật của repo.
- `product-specs/` là root mặc định cho `BRD/SRS` thật khi work item chạy theo SDD.
- `changes/` là root mặc định cho change package thật khi work item cần `change layer`.
- `planning_track` mặc định là `full`; nếu không có field này trong artifact cũ, validator hiện treat như `full` để giữ backward compatibility.
- `scaffold:workflow-step` sinh note tối giản nhưng đúng contract cho step được chọn; block `Governance Exceptions` và block SDD sẽ được thêm khi option tương ứng yêu cầu.
- Nếu `execution_mode=multi_agent`, scaffold sẽ tự sinh runtime artifacts cho `s05`, `s06`, `s07` và thêm chúng vào `linked_artifacts` của note chính.
- Nếu cần `governance_profile=custom`, scaffold phải truyền thêm `--governance-ref` và ít nhất một `--checklist-ref`.
- `--work-item` hiện là tên CLI ngắn cho `work_item_slug`.
- `work_item_slug` là định danh của một đơn vị công việc chạy xuyên toàn bộ workflow 8 bước, không phải tên step; nó nên được chốt trước khi scaffold từ user request, ticket hoặc change request, rồi được phản ánh lại ở `s01 Clarify`.
- Nếu note thuộc change package đã được scaffold hoặc liên kết với package có thật, `change_id`, `change_status`, `spec_delta_refs` và `archive_status` phải nhất quán với `changes/<change-id>/`.
- Nếu step chạy `multi_agent`, `review_mode`, `verification_owner` và `linked_artifacts` phải nhất quán với runtime artifacts tương ứng.
- Ví dụ: user request "fix login timeout" có thể map thành `work_item_slug=fix-login-timeout`, từ đó tạo ra các file như `fix-login-timeout.s01.restate.md`, `fix-login-timeout.s04.acceptance-criteria.md`, `fix-login-timeout.s08.verification.md`.

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
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft|proposed|approved|in_progress|verified|archived|blocked
spec_delta_refs: []
archive_status: not_ready|ready_to_archive|archived
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
planning_track: quick|full|enterprise
execution_mode: agentic|multi_agent
execution_roles: []
  # liệt kê các role nghiệp vụ thực sự tham gia step, ưu tiên vocabulary chuẩn như `po`, `ba`, `designer`, `developer`, `qc`, `devops`
review_mode: self|independent|auto_fix_loop
verification_owner: ""
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance: []
  dod: []
  # ghi role nào giữ trách nhiệm signoff cho DoR, technical approach, release readiness, business acceptance và DoD ở mức work item
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
- `sdd_mode` dùng `none` khi work item không chạy theo SDD, `light` khi chỉ cần trace BRD/SRS ở mức gọn, và `strict` khi bắt buộc requirement IDs, spec freeze, spec change protocol và coverage report.
- `spec_refs` trỏ tới `BRD/SRS` thật nếu đã có file thật; để trống khi chỉ dùng section trong note workflow.
- `spec_status` phản ánh trạng thái spec tại thời điểm note được cập nhật; với SDD strict, step 5-7 không nên đi sâu khi spec vẫn chỉ ở `draft` nếu chưa có accepted assumptions.
- `planning_track` dùng `quick` cho scope nhỏ/risk thấp, `full` cho baseline thông thường và `enterprise` khi cần review lane, governance và planning depth nặng hơn.
- `execution_mode` dùng `agentic` khi một agent giữ trọn ownership của step; dùng `multi_agent` khi step được điều phối bởi coordinator và nhiều worker/verifier.
- `execution_roles` phải phản ánh đúng role nghiệp vụ thực sự đã tham gia vào step; ưu tiên dùng vocabulary chuẩn `po|ba|designer|developer|qc|devops` và chỉ thêm role khác khi thật sự cần.
- `review_mode` dùng `self` cho self-check thông thường, `independent` khi reviewer tách khỏi worker chính, và `auto_fix_loop` khi verify có vòng fix lặp được ghi nhận rõ.
- `verification_owner` phải ghi role hoặc owner chịu trách nhiệm kết luận verify; với `review_mode != self` hoặc `execution_mode=multi_agent`, field này không nên để trống.
- `role_signoffs` ghi rõ role nào giữ trách nhiệm signoff cho `dor`, `approach`, `release`, `business_acceptance`, `dod`; cho phép để trống khi work item chưa được gán owner, nhưng không được khai báo role không tồn tại.
- `business_spec` là artifact mô tả intent, rule và scope ở phía business; `business_acceptance` là hành động signoff xác nhận implementation đã đáp ứng artifact đó và acceptance criteria liên quan, nên hai lớp này không thay thế nhau.
- Vai trò execution topology như `coordinator`, `worker`, `verifier` nên nằm trong block `## Execution Topology`, không thay thế `execution_roles` trong frontmatter chính.
- `content_skills` phải liệt kê đủ skill nghiệp vụ và skill gate đã dùng cho step đó.
- `artifact_skills` phải liệt kê đủ skill tạo artifact đã dùng cho step đó.
- `upstream_artifacts` chỉ liệt kê artifact thực sự được dùng làm đầu vào hoặc tham chiếu quyết định.
- `linked_artifacts` liệt kê tên file artifact phụ có thật, không để link chết.
- `tags` nên có tối thiểu `agent-ops` và `workflow/<step-id>`.
- Nếu không có chỉ định khác, `governance_ref` nên trỏ `project-context/project-context.md` và `checklist_refs` nên trỏ checklist theo `governance_profile`.
- `governance_profile`, `governance_status` và trigger mở `governance-exception` phải theo `project-context/governance-decision-model.md`.
- `change_id` để trống khi work item không dùng `change layer`; nếu có giá trị, phải dùng pattern như `CHANGE-001`.
- `change_status` chỉ dùng các giá trị `draft|proposed|approved|in_progress|verified|archived|blocked`.
- `spec_delta_refs` chỉ điền khi `change_id` đã được gắn và phải trỏ tới delta thật dưới `changes/<change-id>/spec-delta/`.
- `archive_status` dùng `not_ready|ready_to_archive|archived` và phải nhất quán với trạng thái archive của change package.
- `multi_agent` ở rollout hiện tại chỉ nên bật trên `s05-s08`; nếu đã bật ở `s05-s07`, runtime artifacts tương ứng phải tồn tại và được link trong `linked_artifacts`.
- `quick` không nên dùng `multi_agent`, `review_mode != self` hoặc `sdd_mode=strict`; `enterprise` nên có `governance_profile` chặt hơn `default` và review owner rõ ở step delivery.

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
| `s01` Clarify | `<work_item_slug>.s01.restate.md` | `## Step Contract`, `## Governance Context`, `## Artifact Chính`, `## Requirement Analysis Spec` khi cần, `## SDD Traceability` khi cần, `## Traceability`, `## Handoff` | `step-goal-contract`, `governance-context`, artifact step 1, `brd-spec` khi cần |
| `s02` Business Goal | `<work_item_slug>.s02.business-goal.md` | `## Step Contract`, `## Artifact Chính`, `## SDD Traceability` khi cần, `## Traceability`, `## Handoff` | `step-goal-contract`, `product-thinking`, `brd-spec` khi cần |
| `s03` Open Questions | `<work_item_slug>.s03.open-questions.md` | `## Step Contract`, `## Artifact Chính`, `## Input Readiness`, `## Audit`, `## Governance Context` khi có `governance blocker`, `## SDD Traceability` khi cần, `## Traceability`, `## Handoff` | `step-goal-contract`, artifact step 3, `input-readiness-assessor`, `step-goal-auditor`, `governance-context` khi cần, `brd-spec` hoặc `srs-spec` update khi cần |
| `s04` Acceptance + DoR | `<work_item_slug>.s04.acceptance-criteria.md` | `## Step Contract`, `## Artifact Chính`, `## Governance Checks`, `## Definition of Ready`, `## Spec Freeze` khi SDD, `## SDD Traceability`, `## Traceability`, `## Handoff` | `step-goal-contract`, artifact step 4, `governance-checklist`, `definition-of-ready-gate`, `srs-spec`, `spec-freeze-gate` khi SDD |
| `s05` Technical Approach | `<work_item_slug>.s05.technical-approach.md` | `## Step Contract`, `## Option Analysis`, `## Artifact Chính`, `## Architecture Details`, `## Governance Exceptions` khi có, `## Spec Change` khi có, `## SDD Traceability`, `## Traceability`, `## Handoff` | `step-goal-contract`, `brainstorming`, `system-design`, `governance-exception` khi có, `spec-change` khi có, `domain-architecture` hoặc `frontend-architecture` hoặc `frontend-experience-design` hoặc `database-design` hoặc `deployment-devops` hoặc `containerization-packaging` hoặc `platform-runtime-deployment` hoặc `ci-cd-release` khi có |
| `s06` Task Plan | `<work_item_slug>.s06.task-breakdown.md` | `## Step Contract`, `## Artifact Chính`, `## Verification Plan`, `## Governance Checks`, `## SDD Traceability`, `## Traceability`, `## Handoff` | `step-goal-contract`, `task-breakdown-planner`, `governance-checklist`, `spec-traceability-matrix` khi SDD |
| `s07` Implement | `<work_item_slug>.s07.implementation.md` nếu có note | `## Step Contract`, `## Artifact Chính`, `## Implementation Notes` khi có, `## Governance Exceptions` khi có, `## Spec Change` khi có, `## SDD Traceability`, `## Traceability`, `## Handoff` | `step-goal-contract`, `implementation`, `react-web-implementation` khi có, `governance-exception` khi có, `spec-change` khi có |
| `s08` Verify + DoD | `<work_item_slug>.s08.verification.md` | `## Step Contract`, `## Artifact Chính`, `## Governance Checks`, `## Spec Coverage`, `## Scan Summary`, `## Review Findings` khi có, `## Database Review` khi có, `## Deployment Review` khi có, `## Governance Exceptions` khi có, `## Audit`, `## Definition of Done`, `## SDD Traceability`, `## Traceability`, `## Handoff` | `step-goal-contract`, `testing`, `governance-checklist`, `spec-coverage-report` khi SDD, `code-scan-review`, `frontend-quality-review` khi có, `react-best-practices-review` khi có, `database-change-review` khi có, `governance-exception` khi có, `deployment-devops` hoặc `containerization-packaging` hoặc `platform-runtime-deployment` hoặc `ci-cd-release` khi có, `step-goal-auditor`, `definition-of-done-gate` |

Ghi chú:
- `artifact step 1`, `artifact step 3`, `artifact step 4` là schema tối giản ở workflow level, không thay cho schema chi tiết của skill nếu team muốn lưu chi tiết hơn.
- Ở step 5, chọn `domain-architecture`, `frontend-architecture`, `frontend-experience-design`, `database-design` theo phạm vi thật; không ép gọi tất cả nếu không liên quan.
- Ở step 7, chỉ tạo note khi implementation có `doc_changes`, cần handoff riêng, hoặc người dùng yêu cầu artifact doc.
- Với `work_item_type=REFACTOR`, step 4 nên điền rõ `behavioral_invariants` để khóa phạm vi không đổi behavior.
- Với `work_item_type=RESEARCH`, step 8 nên kết luận recommendation rõ thay vì chỉ log findings.

### Spec Phát Sinh Và Contract Cấp Step

| Step | Spec chính phát sinh | Block chuẩn | Contract tối thiểu |
|---|---|---|---|
| 1 | `restatement-spec`, `discovery-framing-spec` | `## Artifact Chính` | `restated_request`, `work_item_type`, `user_problem_initial`, `business_context_initial`, `scope_draft`, `constraints_initial`, `assumptions_initial`, `open_questions_initial`, `dependencies_initial`, `risks_initial` |
| 1-3 khi có governance đáng kể | `governance-context` | `## Governance Context` | `governance_ref`, `applicable_principles`, `required_reviews`, `prohibited_actions`, `open_governance_questions` |
| 1-2 khi chạy SDD | `brd-spec` | `## Artifact Chính` hoặc artifact `<work_item_slug>.brd.md` | business context, stakeholders, problem, goal, KPI, scope, out-of-scope, business rules, assumptions, decision log |
| 1 nếu phân tích ticket/tài liệu sâu | `requirement-analysis-spec` | `## Requirement Analysis Spec` | schema đầy đủ của `requirement-analysis` |
| 2 | `business-goal-spec` | `## Artifact Chính` | schema `product-thinking` |
| 3 | `readiness-spec` | `## Artifact Chính`, `## Input Readiness`, `## Audit` | `open_questions`, `missing_inputs`, `conflicts`, `assumptions`, trạng thái `READY|BLOCKED` |
| 3-4 khi chạy SDD | `srs-spec` | `## Artifact Chính` hoặc artifact `<work_item_slug>.srs.md` | functional requirements, NFR, UX/system behavior, constraints, dependencies, acceptance refs |
| 4 | `acceptance-criteria-spec` | `## Artifact Chính` | `acceptance_criteria`, `edge_cases`, `out_of_scope`, `done_when`, `behavioral_invariants` khi `work_item_type=REFACTOR` |
| 4, 6, 8 khi governance cần được chốt | `governance-checklist` | `## Governance Checks` | checklist áp dụng, kết quả từng check, evidence, blocking items, owner/next action |
| 4 | `definition-of-ready` | `## Definition of Ready` | schema `definition-of-ready-gate` |
| 4 khi chạy SDD | `spec-freeze-gate` | `## Spec Freeze` | BRD/SRS owner, requirement IDs, AC mapping, blockers, accepted assumptions, reviewer coverage |
| 5 | `option-analysis-spec` | `## Option Analysis` | schema `brainstorming`; tối thiểu 2 options, 1 recommended option |
| 5 | `technical-approach-spec` | `## Artifact Chính` | schema `system-design` |
| 5 khi cần khóa boundary sâu | `architecture-detail-spec` | `## Architecture Details` | một hoặc nhiều schema kiến trúc chuyên biệt, gồm `frontend-experience-design`, `deployment-devops`, `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` khi có runtime delivery |
| 5, 7, 8 khi có lệch chuẩn | `governance-exception` | `## Governance Exceptions` | principle bị lệch, lý do, tác động, mitigation, owner, trạng thái approve/waiver |
| 5-7 khi phát hiện spec gap | `spec-change` | `## Spec Change` | schema `spec-change`; không để code/design lệch frozen spec nếu change chưa được xử lý |
| 6 | `task-breakdown-spec` | `## Artifact Chính` | schema `task-breakdown-planner` |
| 6 khi chạy SDD | `spec-traceability-matrix` | `## SDD Traceability` | requirement refs -> AC refs -> task refs -> test refs |
| 7 | `implementation-spec` | `## Artifact Chính` | schema `implementation` |
| 7 khi cần framework-specific handoff | `implementation-notes` | `## Implementation Notes` | schema `react-web-implementation` khi stack là React web hoặc Next.js |
| 8 | `verification-spec` | `## Artifact Chính`, `## Scan Summary`, `## Review Findings`, `## Database Review`, `## Deployment Review`, `## Audit` | schema `testing`; cộng thêm schema scan/review/audit khi có |
| 8 khi chạy SDD | `spec-coverage-report` | `## Spec Coverage` | requirement refs -> AC refs -> task refs -> test refs -> `PASS|FAIL|PARTIAL|UNTESTED` |
| 8 khi scope có packaging hoặc rollout | `deployment-review` | `## Deployment Review` | schema `deployment-devops` và có thể cộng thêm `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` |
| 8 | `definition-of-done` | `## Definition of Done` | schema `definition-of-done-gate` |

Quy tắc:
- Mọi spec cấp step đều chịu ràng buộc bởi `## Step Contract`.
- `governance_ref` nên trỏ về `constitution` hoặc `project-context` ở mức project/work item; không ép mỗi step phải tạo artifact governance riêng nếu không có giá trị.
- `brainstorming` không tự tạo ra design spec cuối; nó chỉ tạo `option-analysis-spec` để làm đầu vào cho `system-design`.
- Với phân tích tài liệu/ticket, không sinh format riêng; nếu cần artifact đầy đủ thì sinh `requirement-analysis-spec` theo đúng schema của skill `requirement-analysis`.

### Template Step 1. Clarify

Ghi chú:

- Các template step bên dưới kế thừa đầy đủ frontmatter chuẩn ở mục `Frontmatter Chuẩn Cho Note Chính`.
- Nếu work item dùng `change layer`, các field `change_id`, `change_status`, `spec_delta_refs`, `archive_status` phải được giữ trong frontmatter của từng step note dù ví dụ rút gọn bên dưới không lặp lại toàn bộ phần diễn giải.
- Nếu work item dùng `multi_agent`, các field `review_mode`, `verification_owner` và runtime artifacts phải được giữ đồng bộ với execution validator dù ví dụ rút gọn bên dưới không lặp lại toàn bộ file runtime.
- Nếu work item dùng `planning_track` khác `full`, các preset và guardrail của track đó phải được giữ đồng bộ với planning validator dù ví dụ rút gọn bên dưới không lặp lại toàn bộ routing matrix.

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
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # liệt kê các role nghiệp vụ thực sự tham gia step, ưu tiên vocabulary chuẩn như `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance: []
  dod: []
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

# Step 1 - Clarify

> [!summary]
> Tóm tắt ngắn yêu cầu đã được làm rõ cùng phạm vi, ràng buộc và `governance context` ban đầu.

## Step Contract
```yaml
# dùng schema `step-goal-contract`
```

## Governance Context
```yaml
# dùng schema `governance-context`
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

### Template Step 2. Business Goal

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
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # liệt kê các role nghiệp vụ thực sự tham gia step, ưu tiên vocabulary chuẩn như `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance: []
  dod: []
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

# Step 2 - Business Goal

> [!summary]
> Tóm tắt vấn đề người dùng, mục tiêu business, success metric và phần không làm.

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

### Template Step 3. Open Questions

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
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # liệt kê các role nghiệp vụ thực sự tham gia step, ưu tiên vocabulary chuẩn như `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance: []
  dod: []
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

# Step 3 - Open Questions

> [!summary]
> Tóm tắt các câu hỏi mở, giả định tạm dùng, `governance blocker` nếu có và quyết định readiness.

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

## Governance Context
```yaml
# dùng schema `governance-context` khi blocker hoặc policy gap ảnh hưởng readiness
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

### Template Step 4. Acceptance + DoR

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
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # liệt kê các role nghiệp vụ thực sự tham gia step, ưu tiên vocabulary chuẩn như `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance: []
  dod: []
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

# Step 4 - Acceptance + DoR

> [!summary]
> Tóm tắt phạm vi kiểm chứng, edge case quan trọng, kết luận `DoR` và mức độ phù hợp với `governance`.

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

## Governance Checks
```yaml
# dùng schema `governance-checklist`
```

## Definition of Ready
```yaml
# dùng schema `definition-of-ready-gate`
```

## Spec Freeze
```yaml
# dùng schema `spec-freeze-gate` khi `sdd_mode=light|strict`
```

## SDD Traceability
```yaml
# dùng schema `spec-traceability-matrix` khi `sdd_mode=light|strict`
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

### Template Step 5. Technical Approach

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
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # liệt kê các role nghiệp vụ thực sự tham gia step, ưu tiên vocabulary chuẩn như `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance: []
  dod: []
content_skills:
  - codex-workflow-chain
  - system-design
  - brainstorming
  - step-goal-contract
  # thêm `domain-architecture` khi dùng
  # thêm `frontend-architecture` khi dùng
  # thêm `frontend-experience-design` khi cần khóa screen behavior, UI state hoặc responsive rule
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

# Step 5 - Technical Approach

> [!summary]
> Tóm tắt phương án khuyến nghị, trade-off chính, boundary kiến trúc cần giữ và các lệch chuẩn nếu có.

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
# `frontend-experience-design`
# `database-design`
# `deployment-devops` khi cần chốt DevOps tổng
# `containerization-packaging` khi khóa `Dockerfile`, `.dockerignore`, `compose.yaml`
# `platform-runtime-deployment` khi khóa runtime `docker`, `swarm`, `k8s`
# `ci-cd-release` khi khóa pipeline, promotion hoặc approval
```

## Governance Exceptions
```yaml
# dùng schema `governance-exception` khi approach cần lệch chuẩn hoặc cần waiver
```

## Spec Change
```yaml
# dùng schema `spec-change` khi phát hiện spec gap hoặc behavior cần đổi
```

## SDD Traceability
```yaml
# dùng schema `spec-traceability-matrix` khi `sdd_mode=light|strict`
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

### Template Step 6. Task Plan

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
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # liệt kê các role nghiệp vụ thực sự tham gia step, ưu tiên vocabulary chuẩn như `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance: []
  dod: []
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

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, checkpoint verify/review và rollout note khi có.

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

## Governance Checks
```yaml
# dùng schema `governance-checklist`
```

## SDD Traceability
```yaml
# dùng schema `spec-traceability-matrix` khi `sdd_mode=light|strict`
```

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
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # liệt kê các role nghiệp vụ thực sự tham gia step, ưu tiên vocabulary chuẩn như `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance: []
  dod: []
content_skills:
  - codex-workflow-chain
  - implementation
  - step-goal-contract
  # thêm `react-web-implementation` khi stack là React web hoặc Next.js
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
> Tóm tắt thay đổi thực tế đã làm, giới hạn còn lại và `governance exception` nếu có.

## Step Contract
```yaml
# dùng schema `step-goal-contract`
```

## Artifact Chính
```yaml
# dùng schema `implementation`
```

## Implementation Notes
```yaml
# dùng schema `react-web-implementation` khi step 7 chạm React web hoặc Next.js
```

## Governance Exceptions
```yaml
# dùng schema `governance-exception` khi implementation phát sinh lệch chuẩn cần ghi nhận
```

## Spec Change
```yaml
# dùng schema `spec-change` khi implementation phát hiện frozen spec cần đổi
```

## SDD Traceability
```yaml
# dùng schema `spec-traceability-matrix` khi `sdd_mode=light|strict`
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

### Template Step 8. Verify + DoD

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
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # liệt kê các role nghiệp vụ thực sự tham gia step, ưu tiên vocabulary chuẩn như `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance: []
  dod: []
content_skills:
  - codex-workflow-chain
  - testing
  - code-scan-review
  - step-goal-contract
  - step-goal-auditor
  - definition-of-done-gate
  # thêm `frontend-quality-review` khi thay đổi chạm surface UI
  # thêm `react-best-practices-review` khi stack là React web hoặc Next.js và cần review render/data boundary
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

# Step 8 - Verify + DoD

> [!summary]
> Tóm tắt trạng thái PASS|FAIL|PARTIAL, mức độ `governance compliance`, khoảng trống còn lại và kết luận `DoD`.

## Step Contract
```yaml
# dùng schema `step-goal-contract`
```

## Artifact Chính
```yaml
# dùng schema `testing`
```

## Governance Checks
```yaml
# dùng schema `governance-checklist`
```

## Spec Coverage
```yaml
# dùng schema `spec-coverage-report` khi `sdd_mode=light|strict`
```

## Scan Summary
```yaml
# dùng schema `code-scan-review`
```

## Review Findings
```yaml
# dùng schema `frontend-quality-review` hoặc `react-best-practices-review` khi step có review frontend hoặc React
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

## Governance Exceptions
```yaml
# dùng schema `governance-exception` khi vẫn còn lệch chuẩn mở tại thời điểm verify
```

## Audit
```yaml
# dùng schema `step-goal-auditor`
```

## Definition of Done
```yaml
# dùng schema `definition-of-done-gate`
```

## SDD Traceability
```yaml
# dùng schema `spec-traceability-matrix` khi `sdd_mode=light|strict`
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

### `governance-context`

```yaml
governance_ref: "project-context/project-context.md"
applicable_principles: []
constraints: []
prohibited_actions: []
required_reviews: []
mandatory_evidence: []
open_governance_questions: []
notes: ""
```

### `governance-checklist`

```yaml
checklist_name: ""
status: PASS|FAIL|PARTIAL|NOT_APPLICABLE
checks:
  - item: ""
    result: PASS|FAIL|PARTIAL|NOT_APPLICABLE
    evidence: ""
    owner: ""
    next_action: ""
blocking_items: []
notes: ""
```

### `governance-exception`

```yaml
exception_id: GOV-EX-001
principle_ref: ""
reason: ""
impact: ""
mitigation: []
approved_by: ""
status: PROPOSED|APPROVED|REJECTED|EXPIRED|RESOLVED
review_date: ""
notes: ""
```

### `brd-spec`

```yaml
business_context: ""
stakeholders: []
problem_statement: ""
business_goals:
  - id: BRD-001
    description: ""
    kpi_refs: []
scope:
  in: []
  out: []
business_rules:
  - id: BRD-002
    rule: ""
assumptions: []
decision_log: []
acceptance_notes: []
```

### `srs-spec`

```yaml
functional_requirements:
  - id: SRS-FR-001
    description: ""
    source_refs: []
    acceptance_refs: []
non_functional_requirements:
  - id: SRS-NFR-001
    category: performance|security|reliability|compatibility|compliance|observability|other
    description: ""
    acceptance_refs: []
ux_system_behavior:
  - id: SRS-UX-001
    description: ""
    acceptance_refs: []
constraints: []
dependencies: []
open_questions: []
```

### `spec-freeze-gate`

```yaml
work_item_slug: ""
status: FROZEN|APPROVED_WITH_ASSUMPTIONS|BLOCKED
checks:
  brd_owner_present: PASS|FAIL
  srs_owner_present: PASS|FAIL
  requirement_ids_present: PASS|FAIL
  acceptance_criteria_mapped: PASS|FAIL
  blocking_questions_resolved: PASS|FAIL
  role_reviewers_recorded: PASS|FAIL
accepted_assumptions: []
blocking_gaps: []
next_action: ""
```

### `spec-change`

```yaml
change_id: CHANGE-001
detected_in_step: s05|s06|s07|s08
impact_area: business|requirement|ux|technical|test|release
current_spec_refs: []
problem: ""
proposed_change: ""
decision: APPROVED|REJECTED|DEFERRED|BLOCKED
decision_owner: ""
updated_artifacts: []
required_followups: []
```

### `spec-traceability-matrix`

```yaml
items:
  - business_ref: BRD-001
    requirement_refs: [SRS-FR-001]
    acceptance_refs: [AC-001]
    task_refs: [TASK-001]
    test_refs: [TEST-001]
    status: PLANNED|IMPLEMENTED|VERIFIED|DEFERRED|BLOCKED
gaps: []
```

### `spec-coverage-report`

```yaml
coverage_items:
  - requirement_id: SRS-FR-001
    acceptance_refs: [AC-001]
    task_refs: [TASK-001]
    test_refs: [TEST-001]
    status: PASS|FAIL|PARTIAL|UNTESTED
    evidence: ""
    gaps: []
overall_status: PASS|FAIL|PARTIAL|BLOCKED
untested_requirements: []
residual_risks: []
business_acceptance_readiness: READY|READY_WITH_GUARDS|BLOCKED
release_readiness: READY|READY_WITH_GUARDS|BLOCKED|NOT_APPLICABLE
```

### `traceability`

```yaml
business_refs: []
spec_refs: []
requirement_refs: []
readiness_refs: []
acceptance_refs: []
design_refs: []
task_refs: []
implementation_refs: []
verification_refs: []
```

### `role-output-map`

```yaml
roles:
  - role: po|ba|designer|developer|qc|devops
    involvement: primary|support|approve|observe
    inputs: []
    outputs: []
    skills: []
    signoffs: []
    upstream_artifacts: []
    downstream_artifacts: []
    notes: ""
```

Quy tắc:

- `role` phải là tập con của `execution_roles` ở cùng note.
- `signoffs` chỉ dùng các giá trị `dor`, `approach`, `release`, `business_acceptance`, `dod`.
- `inputs` và `outputs` phải mô tả đúng contribution của role trong step, không lặp lại toàn bộ contract chung của step.
- `upstream_artifacts` và `downstream_artifacts` chỉ link artifact có thật hoặc artifact chuẩn của workflow chain.

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

### `frontend-experience-design`

```yaml
experience_target: ""
primary_user_outcomes: []
frontend_surfaces:
  - surface: ""
    purpose: ""
    priority: CORE|SUPPORTING|AUXILIARY
interaction_model:
  entry_points: []
  navigation_rules: []
  primary_actions: []
  secondary_actions: []
  feedback_rules: []
surface_states:
  - surface: ""
    loading: ""
    empty: ""
    error: ""
    success: ""
    blocked: ""
layout_rules:
  information_hierarchy: []
  responsive_rules: []
  density_rules: []
visual_rules:
  tone_keywords: []
  emphasis_rules: []
  color_constraints: []
  typography_constraints: []
  motion_rules: []
accessibility_baseline:
  keyboard_flow: []
  screen_reader_notes: []
  contrast_rules: []
  touch_target_rules: []
performance_guards: []
design_system_hooks: []
validation_checks: []
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

### `implementation`

```yaml
recommended_design: ""
tasks_completed: []
code_changes: []
doc_changes: []
config_changes: []
outputs_actual: []
known_limitations: []
follow_up_items: []
notes_for_testing: ""
```

### `react-web-implementation`

```yaml
implementation_target: ""
framework_context:
  stack: ""
  routing_mode: ""
  rendering_mode: []
component_boundary_notes: []
server_client_split_plan: []
data_fetching_plan: []
state_and_context_plan: []
effect_usage_rules: []
rendering_and_loading_plan: []
performance_guards_applied: []
files_or_modules_touched: []
notes_for_review: ""
```

### `testing`

```yaml
verification_target: ""
test_strategy:
  unit_test:
    required: true|false
    rationale: ""
  integration_test:
    required: true|false
    rationale: ""
  database_test:
    required: true|false
    rationale: ""
  feature_test:
    required: true|false
    rationale: ""
criteria_results:
  - criterion: ""
    result: PASS|FAIL|PARTIAL
    evidence: ""
test_evidence:
  unit_test: []
  integration_test: []
  database_test: []
  feature_test: []
commands_run: []
skipped_checks: []
status: PASS|FAIL|PARTIAL
gaps: []
residual_risks: []
recommendation: ""
notes_for_review: ""
```

### `code-scan-review`

```yaml
scan_target: ""
scan_scope:
  mode: DIFF_ONLY|AFFECTED_MODULES|FULL_REPO
  changed_files: []
  affected_modules: []
language_stack: []
available_scan_tools: []
false_positive_policy: "Diff-aware, evidence-based, dismiss only with reason"
scan_plan:
  syntax: []
  static_analysis: []
  security: []
  performance_heuristic: []
syntax_scan_results:
  - command: ""
    scope: []
    status: PASS|FAIL|SKIP
    evidence: ""
    blocker_files: []
static_analysis_results:
  - command: ""
    config_used: ""
    scope: []
    status: PASS|FAIL|SKIP
    findings: []
    new_blockers: []
security_scan_results:
  - command_or_check: ""
    scope: []
    status: PASS|FAIL|SKIP
    findings:
      - severity: HIGH|MEDIUM|LOW
        confidence: HIGH|MEDIUM|LOW
        category: ""
        file: ""
        line: 0
        issue: ""
        evidence: ""
        recommendation: ""
        false_positive_reason: ""
performance_heuristic_results:
  - check: ""
    scope: []
    status: PASS|FAIL|SKIP
    expected_impact: HIGH|MEDIUM|LOW
    confidence: HIGH|MEDIUM|LOW
    trigger_condition: ""
    evidence: ""
skipped_scans: []
overall_status: PASS|FAIL|PARTIAL
remediation_actions: []
notes_for_verify: ""
```

### `frontend-quality-review`

```yaml
review_target: ""
review_scope:
  surfaces: []
  devices: []
  critical_flows: []
quality_gates:
  accessibility: REQUIRED|OPTIONAL
  responsive_layout: REQUIRED|OPTIONAL
  interaction_feedback: REQUIRED|OPTIONAL
  form_and_validation: REQUIRED|OPTIONAL
  navigation_clarity: REQUIRED|OPTIONAL
  performance_heuristic: REQUIRED|OPTIONAL
  visual_consistency: REQUIRED|OPTIONAL
findings:
  - severity: HIGH|MEDIUM|LOW
    area: ACCESSIBILITY|RESPONSIVE|INTERACTION|FORM|NAVIGATION|PERFORMANCE|VISUAL
    surface: ""
    issue: ""
    evidence: ""
    recommendation: ""
criteria_results:
  - criterion: ""
    result: PASS|FAIL|PARTIAL
    evidence: ""
checks_run: []
checks_skipped: []
overall_status: PASS|FAIL|PARTIAL
residual_risks: []
handoff_recommendation: ""
notes_for_review: ""
```

### `react-best-practices-review`

```yaml
review_target: ""
framework_context:
  stack: ""
  rendering_mode: []
  routing_mode: ""
review_gates:
  server_client_boundary: REQUIRED|OPTIONAL
  data_fetching: REQUIRED|OPTIONAL
  effect_hygiene: REQUIRED|OPTIONAL
  state_placement: REQUIRED|OPTIONAL
  context_scope: REQUIRED|OPTIONAL
  render_stability: REQUIRED|OPTIONAL
  list_rendering: REQUIRED|OPTIONAL
  hydration_bundle_cost: REQUIRED|OPTIONAL
  component_api_shape: REQUIRED|OPTIONAL
findings:
  - severity: HIGH|MEDIUM|LOW
    area: SERVER_CLIENT|DATA_FETCHING|EFFECT|STATE|CONTEXT|RENDER|LIST|HYDRATION|COMPONENT_API
    component_or_route: ""
    issue: ""
    evidence: ""
    recommendation: ""
criteria_results:
  - criterion: ""
    result: PASS|FAIL|PARTIAL
    evidence: ""
checks_run: []
checks_skipped: []
overall_status: PASS|FAIL|PARTIAL
residual_risks: []
handoff_recommendation: ""
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
governance:
  governance_ref: "project-context/project-context.md"
  applicable_principles: []
  checklist_refs:
    - "project-context/checklists/default.md"
  exception_policy: NONE|RECORD_REQUIRED|WAIVER_REQUIRED
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
  governance_context_recorded: PASS|FAIL|NOT_APPLICABLE
  governance_requirements_reflected: PASS|FAIL|NOT_APPLICABLE
  governance_blockers_resolved_or_owned: PASS|FAIL|NOT_APPLICABLE
  sdd_spec_owner_present: PASS|FAIL|NOT_APPLICABLE
  sdd_requirement_ids_present: PASS|FAIL|NOT_APPLICABLE
  sdd_spec_freeze_ready: PASS|FAIL|NOT_APPLICABLE
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
  governance_checks_completed_or_justified: PASS|FAIL|NOT_APPLICABLE
  governance_exceptions_recorded_or_resolved: PASS|FAIL|NOT_APPLICABLE
  spec_coverage_completed_or_justified: PASS|FAIL|NOT_APPLICABLE
  spec_changes_resolved: PASS|FAIL|NOT_APPLICABLE
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
- `risks`: rủi ro cần theo dõi và phương án xử lý.
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
