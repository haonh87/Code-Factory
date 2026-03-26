# Progress

## Trạng Thái Hiện Tại

Project đang ở trạng thái usable internal platform cho Codex, không còn là ý tưởng thô.

Ở góc nhìn roadmap, đây là pha nền móng của AI KIT chứ chưa phải đích cuối.

Đã có đủ các thành phần nền:

- Policy toàn cục cho Codex.
- Workflow chain 8 bước.
- Taxonomy skill tương đối đầy đủ cho analysis, architecture, delivery, DevOps delivery dạng umbrella + specialized và guardrails.
- Installer/updater để đồng bộ vào môi trường Codex.
- Overview repo và Memory Bank để phục hồi ngữ cảnh.

## Những Gì Đang Hoạt Động

- Có thể mô tả project rõ như một workflow pack cho Codex.
- Có thể cài policy và skill vào `~/.codex`.
- Có thể tổ chức tác vụ coding theo 8 bước với DoR/DoD rõ ràng.
- Có DevOps delivery lane cho local -> dev -> uat -> prod, với local baseline bằng Dockerfile và compose.yaml.
- Có bộ skill DevOps gồm `deployment-devops`, `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` để khóa lần lượt scope tổng, packaging, runtime deploy và pipeline/release.
- Có bộ skill Obsidian để materialize artifact khi cần.
- Có skill `notebooklm` để hỗ trợ research/query corpus lớn qua NotebookLM.
- Có quy ước mở rộng repo theo `policies/<tool>` và `adapters/<tool>`.
- Có Memory Bank để giữ tầm nhìn dự án và giảm mất ngữ cảnh giữa các session.
- Đã có spec orchestration và runtime reference cho `agentic` và `multi-agent` theo hướng `Codex-first`.
- Policy Codex đã phản ánh execution runtime ở mức sử dụng thực tế, không còn chỉ nằm trong reference docs.
- Đã có bộ ví dụ end-to-end cho `BUG` agentic, `FEATURE` multi-agent có `notebooklm`, và `CHANGE` database-heavy multi-agent.

## Việc Còn Thiếu

- Materialization rõ ràng cho các lớp mục tiêu còn lại của AI KIT: `MCP`, runtime cho `agentic`, runtime cho `multi-agent`, `code factory`.
- Template runtime artifact hoặc ví dụ end-to-end cụ thể hơn cho docker, swarm, k8s nếu muốn đẩy DevOps từ guideline sang starter pack.
- Lộ trình và materialization chính thức để mở rộng từ Codex sang Claude, rồi các tool hoặc agent khác.
- Cơ chế kiểm tra hoặc automation riêng để phát hiện drift giữa các tài liệu nguồn.
- Tài liệu release/maintenance rõ hơn nếu project bắt đầu có nhiều người cùng duy trì.

## Giới Hạn Và Rủi Ro Đã Biết

- Runtime flat layout tạo rủi ro trùng tên skill.
- Nhiều nguồn tài liệu có thể bị lệch nhau nếu không cập nhật đồng thời.
- Chưa có automation xác nhận tính đầy đủ của workflow pack sau mỗi lần chỉnh sửa.
- Phạm vi hiện tại còn Codex-centric, nên chưa kiểm chứng khả năng đa-agent ở mức thực chiến.
- Tầm nhìn AI KIT rộng hơn hiện trạng repo, nên nếu không cập nhật roadmap rõ ràng thì dễ tạo kỳ vọng vượt quá phần đã hiện thực.
- `agentic` và `multi-agent` đã có orchestration spec, runtime reference và policy Codex tương ứng, nhưng chưa có runner hoặc adapter runtime riêng để chứng minh behavior end-to-end.
- `notebooklm` là external integration nên còn phụ thuộc auth, network và cách team quản lý notebook/query thực tế.

## Quyết Định Đã Chốt

- Memory Bank được thêm vào như lớp tài liệu chuẩn để phục hồi ngữ cảnh giữa các session.

- README cần trỏ người đọc vào Memory Bank trước khi đi sâu vào các tài liệu khác.
- Mục tiêu sản phẩm của project là xây dựng AI KIT cho quy trình phát triển sản phẩm số, trong đó workflow pack cho Codex là bước hiện thực đầu tiên, còn Claude là đích mở rộng kế tiếp.

## Bước Tiếp Theo Hợp Lý

- Duy trì cập nhật Memory Bank mỗi khi thay đổi policy, skill, adapter hoặc scope dự án.
- Chọn lớp tiếp theo của AI KIT để materialize trong repo sau workflow/skills hiện tại.
- Khi phần nền trên Codex đủ ổn định, lập kế hoạch port hoặc trừu tượng hóa để mở rộng sang Claude.
- Mở rộng bộ ví dụ end-to-end cho thêm case `RESEARCH` hoặc release-heavy integration ngoài code/data flow hiện có.
- Khi mở rộng sang agent/tool mới, tạo đủ cả policy, adapter và tài liệu tiến độ tương ứng.




