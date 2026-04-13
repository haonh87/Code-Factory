# Active Context

## Trạng Thái Làm Việc Hiện Tại

Repository đang ở pha củng cố tài liệu nền để agent có thể phục hồi ngữ cảnh qua Memory Bank thay vì dựa vào trí nhớ phiên làm việc.

Ở cấp định hướng sản phẩm, project đã được chốt là nền móng để xây dựng một bộ `AI KIT` cho quy trình phát triển sản phẩm số, không chỉ là workflow pack cho Codex.

Trọng tâm hiện tại:

- Xác lập `memory-bank/` theo đúng phương pháp Cline.
- Chốt lại mô tả chuẩn về project: là gì, đã có gì, mục tiêu là gì.
- Giữ một đường đọc rõ ràng giữa các file core trong `memory-bank/`.

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

- Giữ `progress.md` cập nhật khi thêm policy, skill, adapter hoặc thay đổi scope.
- Khi thêm skill mới, cập nhật đồng thời projectbrief.md, systemPatterns.md và progress.md.
- Khi mở rộng DevOps tiếp theo, nên bổ sung ví dụ end-to-end hoặc template runtime artifact cho docker, swarm, k8s.
- Khi có thay đổi mục tiêu sản phẩm hoặc lý do tồn tại của repo, cập nhật `productContext.md`.
- Duy trì ví dụ end-to-end đồng bộ với policy, runtime reference và workflow chain khi spec thay đổi.
- Với `MCP`, tiếp tục chọn server nhỏ có guardrail tốt thay vì cố tạo một integration quá rộng ngay vòng đầu.
- Nếu bắt đầu hiện thực runner hoặc adapter cho `agentic`/`multi-agent`, cần tách rõ phần nào là spec orchestration và phần nào là runtime behavior.
- Khi bắt đầu pha mở rộng ngoài Codex, ghi rõ phạm vi nào được port sang Claude trước và phần nào còn giữ riêng cho Codex.

## Rủi Ro Tài Liệu Hiện Tại

- Có nguy cơ drift giữa `README.md` và `memory-bank/` nếu chỉ sửa một nơi.
- Repo hiện thiên về policy và docs, nên chất lượng tài liệu chính là chất lượng sản phẩm.
- Chưa có automation riêng để phát hiện lệch nội dung giữa các tài liệu nguồn.
