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

## Quyết Định Đang Có Hiệu Lực

- Memory Bank là bộ nhớ dự án chuẩn để dùng lại giữa các session.
- `memory-bank/` là nơi lưu trữ và phục hồi ngữ cảnh dự án; không duy trì thêm file overview song song làm nguồn sự thật thứ hai.
- Tầm nhìn sản phẩm của repo là AI KIT gồm `workflows`, `skills`, `MCP`, `agentic`, `multi-agent` và `code factory` để phục vụ phát triển sản phẩm số.
- Project đi theo chiến lược `Codex-first`: áp dụng và ổn định trên Codex trước; sau đó phát triển lên Claude, rồi mới mở rộng tiếp cho các agent/tool khác.
- Tài liệu tiếng Việt là mặc định và phải giữ UTF-8.
- Khi người dùng nhắc đến "formatter obsidian", hiểu đó là preference dùng skill `obsidian-markdown` cho note Obsidian `.md`.

## Mẫu Hình Quan Trọng Cần Nhớ

- Workflow cốt lõi là chain 8 bước, không tách discovery và delivery thành hai workflow riêng.
- Gate readiness nằm ở step 4; gate done nằm ở step 8.
- DevOps là delivery lane chạy xuyên step 5 -> 8; không tạo step 9 riêng.
- `.md` là nguồn sự thật cho artifact workflow; `.canvas` và `.base` chỉ là lớp hỗ trợ.
- Orchestration hiện nên được đọc theo 4 lớp: `step`, `content skill`, `artifact`, `execution topology`.
- Với scope container hóa, local phải có Dockerfile và compose.yaml.
- Với dev, uat, prod, runtime target phải được khai báo rõ là docker, docker swarm hoặc k8s.
- `agentic` là loop một agent tự chạy `contract -> readiness -> execute -> self-check -> audit -> handoff`.
- `multi-agent` là topology có `coordinator` điều phối nhiều worker/verifier quanh cùng một step contract.
- `notebooklm` là skill tích hợp tool ngoài để research/query corpus lớn; output của nó không thay thế note `.md` nguồn sự thật.
- Layout runtime sau khi cài là flat theo `skill-name`, nên tên skill phải duy nhất toàn repo.
- Với tác vụ chỉnh sửa note theo hệ Obsidian, ưu tiên `obsidian-markdown`; chỉ dùng `obsidian-bases` cho `.base` và `json-canvas` cho `.canvas`.

## Việc Nên Làm Tiếp Theo

- Giữ `progress.md` cập nhật khi thêm policy, skill, adapter hoặc thay đổi scope.
- Khi thêm skill mới, cập nhật đồng thời projectbrief.md, systemPatterns.md và progress.md.
- Khi mở rộng DevOps tiếp theo, nên bổ sung ví dụ end-to-end hoặc template runtime artifact cho docker, swarm, k8s.
- Khi có thay đổi mục tiêu sản phẩm hoặc lý do tồn tại của repo, cập nhật `productContext.md`.
- Duy trì ví dụ end-to-end đồng bộ với policy, runtime reference và workflow chain khi spec thay đổi.
- Khi bắt đầu materialize lớp mới của AI KIT, ghi rõ lớp nào đang vào repo trước: `MCP`, `agentic`, `multi-agent` hay `code factory`.
- Nếu bắt đầu hiện thực runner hoặc adapter cho `agentic`/`multi-agent`, cần tách rõ phần nào là spec orchestration và phần nào là runtime behavior.
- Khi bắt đầu pha mở rộng ngoài Codex, ghi rõ phạm vi nào được port sang Claude trước và phần nào còn giữ riêng cho Codex.

## Rủi Ro Tài Liệu Hiện Tại

- Có nguy cơ drift giữa `README.md` và `memory-bank/` nếu chỉ sửa một nơi.
- Repo hiện thiên về policy và docs, nên chất lượng tài liệu chính là chất lượng sản phẩm.
- Chưa có automation riêng để phát hiện lệch nội dung giữa các tài liệu nguồn.





