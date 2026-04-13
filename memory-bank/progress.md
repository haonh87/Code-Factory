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
- Đã có materialization đầu tiên của lớp `MCP` với `mcp/github-push` và adapter cài dependency tương ứng.
- Đã có `mcp/notebooklm` như managed upstream integration để Codex gọi NotebookLM MCP qua `uvx`, không cần repo tự mirror 35 tools của upstream; intent chính là hỗ trợ lưu corpus tài liệu và query/search khi workflow cần thêm context cho brainstorming hoặc spec.
- Đã có MCP thứ hai là `mcp/session-search`, read-only wrapper quanh `cass` để tra cứu local coding-agent session history.
- Có Memory Bank để giữ tầm nhìn dự án và giảm mất ngữ cảnh giữa các session.
- Đã có spec orchestration và runtime reference cho `agentic` và `multi-agent` theo hướng `Codex-first`.
- Đã có lớp role-aware workflow trong `codex-workflow-chain`, gồm `execution_roles`, `role_signoffs`, role matrix cho `po|ba|designer|developer|qc|devops`, block `## Role Outputs` và reference riêng `role-aware-workflow.md` để trace contribution theo role.
- Đã làm rõ ranh giới `BRD/SRS` là rollout outputs của quy trình phát triển sản phẩm, còn NotebookLM là lớp lưu corpus và truy hồi tài liệu trong lúc thực thi.
- Đã bổ sung lớp SDD vào workflow chain, gồm lifecycle/status, requirement IDs, spec freeze gate, spec change protocol, spec traceability matrix và spec coverage report.
- Tên hiển thị của workflow 8 bước đã được rút gọn và đồng bộ, còn slug/file naming vẫn giữ ổn định để không phá compatibility.
- Đã có thêm reference `sdd-merge-strategy.md` để định vị rõ phần nào của `spec-kit`, `OpenSpec`, `cc-sdd`, `BMAD-METHOD` nên được mượn vào workflow hiện tại.
- Đã có thêm `target-architecture.md` để chốt mô hình đích theo các lớp backbone, governance, change, execution và adaptive planning trước khi rollout implementation thật.
- Đã cập nhật workflow docs theo hướng `hybrid governance`, với `governance context`, `governance checks`, `governance exception` đi thẳng vào step contract, template note và gate.
- Đã rà và đồng bộ lại các docs workflow để loại bỏ conflict nội dung: metadata governance/runtime dùng cùng enum và naming, mô hình 6 lớp khớp giữa policy và reference, và role-aware workflow đã phản ánh trách nhiệm governance theo từng step.
- Đã có Governance Pack mức project trong `project-context/` để workflow dùng thật, thay vì chỉ mô tả governance ở mức contract.
- Policy Codex đã phản ánh execution runtime ở mức sử dụng thực tế, không còn chỉ nằm trong reference docs.
- Đã có bộ ví dụ end-to-end cho `BUG` agentic, `FEATURE` multi-agent có `notebooklm`, và `CHANGE` database-heavy multi-agent.
- Đã kiểm chứng ngày `2026-04-08` rằng `cass` có thể tra cứu local Codex sessions theo workspace khi chạy ngoài sandbox; truy vấn `status` trên repo này trả hit thực từ session history.

## Việc Còn Thiếu

- Mở rộng lớp `MCP` từ starter đầu tiên sang nhiều server/use case hơn.
- Materialization rõ ràng cho runtime cho `agentic`, runtime cho `multi-agent`, `code factory`.
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
- `github-push` MCP là side-effectful integration, nên cần guardrail tốt cho allowed root, auth và flow publish.
- `cass` có thể báo degraded trong sandbox hạn chế do không mở được DB/index ở Application Support, nên cần phân biệt lỗi quyền môi trường với lỗi cài đặt thật trước khi repair.
- `mcp/notebooklm` phụ thuộc mạnh vào upstream `notebooklm-mcp-cli`; nếu upstream đổi command surface, auth flow hoặc config guidance thì launcher/docs trong repo phải cập nhật theo.
- `session-search` hiện phụ thuộc runtime behavior và JSON contract của `cass`; nếu upstream CLI đổi schema thì MCP wrapper này cần cập nhật theo.

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
