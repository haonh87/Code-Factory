# Project Brief

Đây là file đầu tiên cần đọc trong `memory-bank/`.

Thứ tự đọc chuẩn của bộ nhớ dự án:

1. `projectbrief.md`
2. `productContext.md`
3. `activeContext.md`
4. `systemPatterns.md`
5. `techContext.md`
6. `progress.md`

## Tóm Tắt Dự Án

`AI Agent Ops` / `Code-Factory` là repository nền móng để xây dựng một bộ `AI KIT` phục vụ quy trình phát triển sản phẩm số. Bộ AI KIT mà project hướng tới bao gồm các lớp năng lực như `workflows`, `skills`, `MCP (Model Context Protocol)`, `agentic patterns`, `multi-agent orchestration` và `code factory`.

Ở trạng thái hiện tại, project mới triển khai rõ nhất phần workflow pack cho Codex, gồm policy, workflow chain, skills, guardrails, DevOps delivery lane đã tách thành 1 skill điều phối và 3 skill chuyên trách, cùng adapter cài đặt. Đây là bước áp dụng đầu tiên theo chiến lược `Codex-first`, trước khi tổng quát hóa để phát triển lên Claude và các agent/tool khác.

Đây là một repo hạ tầng vận hành, không phải một sản phẩm business runtime.

## Phạm Vi Cốt Lõi

Project hiện bao phủ 5 lớp chính:

- Policy toàn cục để áp workflow bắt buộc cho Codex.
- Bộ skill tổ chức theo từng giai đoạn phân tích, thiết kế, delivery và quality gate.
- Bộ skill delivery hiện đã bao gồm DevOps packaging, runtime deploy, CI/CD release và deploy readiness theo local -> dev -> uat -> prod.
- Tài liệu tham chiếu mô tả workflow chain, template note và schema output.
- Adapter cài đặt/cập nhật để đồng bộ policy và skill vào môi trường Codex trên máy người dùng.

Phạm vi mục tiêu dài hạn của project lớn hơn phần đang hiện thực:

- Workflows chuẩn hóa cách AI tham gia vào delivery lifecycle.
- Skills tái sử dụng được cho các bước phân tích, thiết kế, triển khai, verify và tài liệu.
- MCP để kết nối AI với nguồn ngữ cảnh, tool và hệ thống ngoài.
- Agentic patterns để tổ chức cách agent suy nghĩ, handoff và tự vận hành theo task.
- Multi-agent orchestration để tách vai trò và phối hợp nhiều agent.
- Code factory để tăng tốc tạo lập, chuẩn hóa và vận hành artifact/code phục vụ phát triển sản phẩm số.

## Mục Tiêu Cốt Lõi

- Xây dựng một bộ AI KIT có thể áp dụng thực tế vào quy trình phát triển sản phẩm số.
- Chuẩn hóa các khối nền như workflow, skill, context access, orchestration và factory pattern thay vì chỉ gom prompt rời rạc.
- Tạo một workflow coding dùng lại được giữa nhiều project khi làm việc với Codex như bước triển khai đầu tiên của roadmap.
- Ép các tác vụ coding đi qua đủ discovery, design, implementation, verify và handoff.
- Làm cho policy và skill có thể cài đặt được theo cách nhất quán trên nhiều máy.
- Giữ cấu trúc repo đủ rõ để mở rộng tiếp sang Claude, rồi các tool hoặc agent khác sau đó.

## Mục Tiêu Chất Lượng

- Bảo đảm workflow không chỉ là prompt mà là một hệ có policy, gate, template và installer.
- Bảo đảm mọi bước quan trọng đều truy vết được từ business đến verify.
- Bảo đảm tài liệu tiếng Việt giữ đúng UTF-8 và không hỏng mã hóa khi chỉnh sửa.

## Không Thuộc Phạm Vi Hiện Tại

- Không phát triển business feature cho người dùng cuối.
- Không đóng vai trò application runtime, backend service hay frontend app.
- Chưa cung cấp framework đa-agent hoàn chỉnh; hiện mới có nền tảng ban đầu để tiến tới mục tiêu đó.
- Chưa bundle `obsidian-cli`.

## Tài Sản Hiện Có

Snapshot hiện tại của repository:

- 1 policy toàn cục cho Codex tại `policies/codex/AGENTS.global.md`.
- 26 skill trong `skills/`, gồm các nhóm chức năng chính, 4 skill DevOps delivery và skill tích hợp tool như `notebooklm`.
- 4 adapter/script cài đặt và cập nhật trong `adapters/codex/`.
- 3 tài liệu tham chiếu workflow/runtime/examples tại `skills/orchestration/codex-workflow-chain/references/`.

- 1 bộ Memory Bank chuẩn tại `memory-bank/`.

Các lớp mục tiêu đã được hiện thực một phần:

- `workflows`: đã có.
- `skills`: đã có.
- `MCP`: chưa materialize trong repo hiện tại.
- `agentic`: đã có orchestration spec và runtime reference theo hướng `Codex-first`, nhưng chưa materialize thành runtime framework riêng.
- `multi-agent`: đã có orchestration spec và runtime reference theo hướng `Codex-first`, nhưng chưa materialize thành framework/chính sách riêng.
- `code factory`: đang là định hướng của repo hơn là capability hoàn chỉnh đã bàn giao.

## Định Nghĩa Thành Công Ở Mức Dự Án

Project được xem là đang đi đúng hướng khi:

- AI KIT có thể được mô tả như một hệ hoàn chỉnh phục vụ delivery của sản phẩm số, không chỉ là một workflow pack đơn lẻ.
- Một máy mới có thể cài workflow pack và dùng Codex theo cùng một chuẩn làm việc, làm nền cho bước mở rộng sang Claude sau đó.
- Một tác vụ coding có thể được dẫn dắt xuyên suốt bằng workflow 8 bước với gate DoR và DoD rõ ràng.
- Project mở rộng được từ workflow/skill sang MCP, agentic và multi-agent mà không phá vỡ cấu trúc nền hiện có.
- Skill mới có thể được thêm vào mà không phá vỡ layout runtime phẳng của Codex.
- Tài liệu đủ tốt để một agent mất toàn bộ ngữ cảnh vẫn đọc vào và hiểu đúng project đang làm gì.




