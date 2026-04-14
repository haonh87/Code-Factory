# Active Context

## Trạng Thái Làm Việc Hiện Tại

Repository không còn ở pha chỉ củng cố tài liệu nền hoặc rollout baseline. Trọng tâm hiện tại là giữ baseline phase `0-5` ổn định và tăng độ chặt của hardening theo hướng có kiểm soát.

Ở cấp định hướng sản phẩm, project đã được chốt là nền móng để xây dựng một bộ `AI KIT` cho quy trình phát triển sản phẩm số, không chỉ là workflow pack cho Codex.

Trọng tâm hiện tại:

- Giữ `backbone workflow` và `governance layer` ổn định trong vận hành thật.
- Giữ baseline của `SDD`, `change`, `execution`, `adaptive planning` và `hardening` ổn định.
- `Phase 0: Backbone + Governance`, `Phase 1: SDD Materialization`, `Phase 2: Change Layer`, `Phase 3: Execution Layer`, `Phase 4: Adaptive Planning` và `Phase 5: Hardening` đã materialize baseline.
- `workflow-authoring-smoke` đã nằm trong CI; hardening hiện tại chuyển sang drift checks, stale checks và semantic lint sâu hơn.
- Giữ `memory-bank/` phản ánh đúng trạng thái implementation, không để lẫn giữa `DONE`, `PARTIAL` và `target`.

## Thay Đổi Gần Đây

- Đã tái khẳng định mục tiêu sản phẩm ở cấp AI KIT, vượt ra ngoài phạm vi workflow pack cho Codex.
- Đã thêm Memory Bank làm lớp tài liệu phục hồi ngữ cảnh.
- Cần giữ `README.md` và `memory-bank/` nhất quán, trong đó `memory-bank/` là nguồn sự thật.
- Đã formalize `agentic` và `multi-agent` ở mức orchestration spec như lớp `execution topology` trong `codex-workflow-chain`.
- Đã thêm runtime reference cho `agentic`/`multi-agent` theo hướng `Codex-first` và ghi nhận skill `notebooklm` như external research/tooling integration.
- Đã đồng bộ `policies/codex/AGENTS.global.md` để policy Codex phản ánh execution runtime, handoff tối thiểu và quy tắc dùng `notebooklm`.
- Đã thêm bộ ví dụ end-to-end gồm `agentic`, `multi-agent` có `notebooklm`, và `database-heavy multi-agent` trong orchestration references.
- Đã tách DevOps thành `deployment-devops` làm skill điều phối tổng, cùng `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` làm các skill chuyên trách.
- Đã giữ DevOps delivery lane xuyên step 5 -> 8 cho local, dev, uat, prod; local có baseline bằng `Dockerfile` và `compose.yaml`, còn runtime đích ở môi trường xa là `docker`, `docker swarm` hoặc `k8s`.
- Đã materialize lớp `MCP` đầu tiên bằng `mcp/github-push`, kèm adapter cài dependency trong `adapters/mcp/`.
- Đã materialize thêm `mcp/notebooklm` theo hướng launcher mỏng để Codex gọi upstream `notebooklm-mcp-cli` qua `uvx`, thay vì re-implement toàn bộ tool surface của NotebookLM trong repo; mục tiêu chính là lưu corpus tài liệu phụ trợ và query/search ngữ cảnh cho brainstorming, spec và research-heavy step.
- Đã materialize thêm `mcp/session-search` như MCP read-only bọc `cass` để list/search/view local coding-agent sessions theo workspace, kèm adapter cài dependency và config.
- Đã kiểm chứng `cass` CLI truy cập được local Codex session history theo workspace khi chạy ngoài sandbox; lỗi degraded quan sát trong sandbox là do quyền mở DB/index ở Application Support, không phải lỗi cài đặt cục bộ.
- Đã mở rộng `codex-workflow-chain` theo hướng role-aware workflow với `execution_roles`, `role_signoffs`, matrix mặc định cho `po|ba|designer|developer|qc|devops`, block `## Role Outputs` và reference riêng `role-aware-workflow.md` để trace input/output/signoff theo role trong cùng note step.
- Đã bổ sung lớp SDD vào `codex-workflow-chain` với `spec-driven-development.md`, `sdd_mode`, `spec_refs`, `spec_status`, spec freeze ở step 4, spec change protocol ở step 5-7 và spec coverage report ở step 8.
- Đã chuẩn hóa tên hiển thị ngắn cho workflow 8 bước: `Clarify`, `Business Goal`, `Open Questions`, `Acceptance + DoR`, `Technical Approach`, `Task Plan`, `Implement`, `Verify + DoD`, trong khi giữ nguyên `step_id`, `step_slug` và file naming chuẩn.
- Đã thêm và mở rộng `sdd-merge-strategy.md` để chốt cách kết hợp workflow hiện tại với `github/spec-kit`, `Fission-AI/OpenSpec`, `gotalab/cc-sdd` và `bmad-code-org/BMAD-METHOD` mà không thay toàn bộ host workflow.
- Đã thêm `target-architecture.md` để mô tả kiến trúc đích: workflow hiện tại làm backbone, còn `spec-kit`, `OpenSpec`, `cc-sdd`, `BMAD-METHOD` lần lượt bổ sung governance, change, execution và adaptive planning layer.
- Đã cập nhật workflow docs theo hướng `hybrid governance`: không tạo step riêng, nhưng nhúng `governance context`, `governance checks`, `governance exception` vào các step và gate phù hợp.
- Đã đồng bộ lại contract giữa `workflow-chain.md`, `AGENTS.global.md`, `role-aware-workflow.md` và `target-architecture.md`: mô hình đọc theo 6 lớp đã thống nhất, `governance_ref` là field canonical, `governance_status` dùng enum chuẩn uppercase, còn `execution_mode` dùng `agentic|multi_agent` với `sequential_multi_role` chỉ là runtime fallback.
- Đã materialize Governance Pack ở mức project tại `project-context/`, gồm `constitution`, `project-context`, checklist profile `default|strict|regulated` và `governance-exception-register`.
- Đã thêm `governance-role-model.md` để chốt authority giữa `po|ba|designer|developer|qc|devops`, tách rõ `step signoff` với `waiver authority`.
- Đã thêm `governance-decision-model.md` để chốt rule chọn `governance_profile`, state transition cho `governance_status` và trigger mở `governance-exception`.
- Đã thêm command surface chuẩn bằng `npm` ở root repo và port workflow validators sang Node.js, gồm `validate-workflow.js`, `validate-workflow-artifact-names.js`, `validate-workflow-governance.js`, để workflow tooling không phụ thuộc PowerShell.
- Đã thêm fixture suite `tests/fixtures/workflow-governance/` với case `pass/fail` cho `default`, `regulated`, `custom`, exception register và `WAIVER_APPROVED` để test governance validator.
- Đã thêm workflow scaffolder chạy bằng `npm`, gồm `scaffold:workflow` và `scaffold:workflow-step`, để materialize note workflow đúng naming, frontmatter, governance metadata và block chuẩn rồi validate lại ngay sau khi sinh file.
- Đã thêm `workflow-ci-enforcement.md` để chốt vai trò, scope, job design, trigger và rollout phases cho CI enforcement của workflow tooling trước khi materialize `.github/workflows/`.
- Đã implement CI phase 1 tại `.github/workflows/workflow-guardrails.yml`; workflow này hiện chạy job `workflow-tooling` và enforce `npm run validate:workflow:fixtures` trên PR, push `main` và manual dispatch.
- Đã chốt `work-items/` là canonical artifact root cho workflow artifacts thật và thêm `work-items/README.md` làm entrypoint cho directory convention này.
- Đã implement CI phase 2 trong cùng workflow GitHub Actions; job `workflow-artifacts` hiện validate trực tiếp root `work-items/`, và `sample-workflow-item/` đang là canonical sample đầu tiên trong root này.
- Đã thêm `implementation-blueprint.md` để tách rõ phần nào đã implementation, phần nào mới ở mức target architecture, và phase nào phải làm tiếp theo.
- Đã materialize `product-specs/` với template `BRD/SRS`, sample `BRD/SRS` thật cho `sample-sdd-item`, validator `validate-workflow-sdd.js` và CI job `workflow-sdd`; `Phase 1: SDD Materialization` hiện đã có baseline chạy được.
- Đã materialize `changes/` với sample change package `CHANGE-001`, scaffold `scaffold:change`, validator `validate-workflow-change.js` và CI job `workflow-changes`; `sample-sdd-item` hiện nối qua `change_id` và `spec_delta_refs` tới change package này.
- Đã materialize execution runtime baseline: metadata `review_mode`, `verification_owner`, runtime artifacts `execution-policy`, `worker-assignment`, `worker-handoff-report`, `merge-report`, validator `validate-workflow-execution.js`, CI job `workflow-execution` và sample canonical `sample-execution-item/`.
- Đã materialize adaptive planning baseline: metadata `planning_track`, scaffold preset `quick|full|enterprise`, validator `validate-workflow-planning.js`, CI job `workflow-planning` và sample canonical `sample-quick-item/`, `sample-enterprise-item/`.
- Đã materialize hardening baseline: `run-workflow-authoring-smoke.js`, command `validate:workflow:authoring-smoke`, CI job `workflow-authoring-smoke`, governance authority/state enforcement baseline và fixture authority/gate mới cho validator governance.
- Đã chốt `workflow-overview-author-edition.md` làm landing overview chính thức cho delivery/onboarding ở góc nhìn tác giả.
- Đã chốt `workflow-overview.md` làm technical/internal reference cho mechanics, validator, CI, rollout status và các nội dung thuần kỹ thuật hơn.
- Đã đồng bộ các entrypoint chính để người đọc vào repo thấy ngay thứ tự đọc workflow: author overview trước, technical reference sau, rồi mới tới contract/schema docs.
- Đã tối ưu landing `README.md` theo hướng ít lặp hơn, nhóm lại command surface và workflow docs theo mục đích sử dụng thay vì để một danh sách reference dài ngay từ đầu.

## Quyết Định Đang Có Hiệu Lực

- Memory Bank là bộ nhớ dự án chuẩn để dùng lại giữa các session.
- `memory-bank/` là nơi lưu trữ và phục hồi ngữ cảnh dự án; không duy trì thêm file overview song song làm nguồn sự thật thứ hai.
- Tầm nhìn sản phẩm của repo là AI KIT gồm `workflows`, `skills`, `MCP`, `agentic`, `multi-agent` và `code factory` để phục vụ phát triển sản phẩm số.
- Project đi theo chiến lược `Codex-first`: áp dụng và ổn định trên Codex trước; sau đó phát triển lên Claude, rồi mới mở rộng tiếp cho các agent/tool khác.
- Tài liệu tiếng Việt là mặc định và phải giữ UTF-8.
- Khi người dùng nhắc đến "formatter obsidian", hiểu đó là preference dùng skill `obsidian-markdown` cho note Obsidian `.md`.
- MCP nên được materialize theo server nhỏ, có guardrail rõ, có adapter cài dependency và có tài liệu vận hành tối thiểu.

## Mẫu Hình Quan Trọng Cần Nhớ

- Workflow cốt lõi là chain 8 bước, không tách discovery và delivery thành hai workflow riêng.
- SDD cũng không tạo workflow riêng; nó là lớp ràng buộc artifact/gate/traceability trên cùng 8 bước.
- Gate readiness nằm ở step 4; gate done nằm ở step 8.
- DevOps là delivery lane chạy xuyên step 5 -> 8; không tạo step 9 riêng.
- `.md` là nguồn sự thật cho artifact workflow; `.canvas` và `.base` chỉ là lớp hỗ trợ.
- Orchestration hiện nên được đọc theo 6 lớp: `step`, `governance`, `SDD`, `content skill`, `artifact`, `execution topology`.
- Khi cần trace ownership nghiệp vụ sâu hơn trong cùng một step, dùng thêm lớp `role outputs` trong note chính; không tách workflow thành nhiều workflow riêng theo role.
- Khi materialize `MCP`, server implementation nằm trong `mcp/`, còn script bootstrap hoặc install nằm trong `adapters/mcp/`.
- Với scope container hóa, local phải có Dockerfile và compose.yaml.
- Với dev, uat, prod, runtime target phải được khai báo rõ là docker, docker swarm hoặc k8s.
- `agentic` là loop một agent tự chạy `contract -> readiness -> execute -> self-check -> audit -> handoff`.
- `multi-agent` là topology có `coordinator` điều phối nhiều worker/verifier quanh cùng một step contract.
- `notebooklm` là skill tích hợp tool ngoài để research/query corpus lớn; output của nó không thay thế note `.md` nguồn sự thật.
- `mcp/notebooklm` nên được hiểu là managed upstream integration; guardrail chủ yếu nằm ở cách bật/tắt MCP, auth và phạm vi sử dụng, không nằm ở việc repo này re-wrap lại từng upstream tool.
- Trong product-development workflow, `BRD` và `SRS` là rollout outputs/source-of-truth; NotebookLM chỉ là lớp lưu corpus và truy hồi tài liệu trong lúc thực thi.
- `cass` phù hợp để tìm lại session Codex cũ theo workspace; nếu sandbox chặn data dir của `cass`, cần verify ngoài sandbox trước khi kết luận DB hỏng.
- `session-search` nên giữ hẹp ở mức read-only retrieval; không nên expose repair/index/export flows của `cass` trong cùng server.
- Layout runtime sau khi cài là flat theo `skill-name`, nên tên skill phải duy nhất toàn repo.
- Với tác vụ chỉnh sửa note theo hệ Obsidian, ưu tiên `obsidian-markdown`; chỉ dùng `obsidian-bases` cho `.base` và `json-canvas` cho `.canvas`.

## Việc Nên Làm Tiếp Theo

- Giữ `progress.md` cập nhật theo phase rollout, không chỉ theo danh sách đã làm rời rạc.
- Giữ `progress.md` phản ánh đúng việc phase 0-5 đã có baseline, tránh ghi Phase 5 như hạng mục còn treo.
- Nếu tiếp tục hardening, ưu tiên kế tiếp là stale register checks, drift checks sâu hơn và semantic lint cho evidence/traceability.
- Chỉ pilot `multi_agent` ở mức artifact/runtime sau khi `SDD` và `change layer` đã có source-of-truth ổn định.
- Duy trì ví dụ end-to-end đồng bộ với policy, runtime reference và workflow chain khi spec thay đổi.
- Với `MCP`, tiếp tục chọn server nhỏ có guardrail tốt thay vì cố tạo một integration quá rộng ngay vòng đầu.

## Rủi Ro Tài Liệu Hiện Tại

- Có nguy cơ drift giữa `README.md` và `memory-bank/` nếu chỉ sửa một nơi.
- Repo hiện thiên về policy và docs, nên chất lượng tài liệu chính là chất lượng sản phẩm.
- Chưa có drift check sâu để đối chiếu mọi docs nguồn với scaffold, validator và CI ngoài baseline hiện tại.
