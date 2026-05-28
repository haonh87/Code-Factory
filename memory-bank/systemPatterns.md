# System Patterns

## Kiến Trúc Repository

Repository được tổ chức theo các lớp trách nhiệm rõ ràng:

- `policies/`: chứa policy theo từng tool hoặc agent.
- `skills/`: chứa skill theo nhóm chức năng.
- `mcp/`: chứa MCP server hoặc capability runtime để model dùng tool và hệ thống ngoài.
- `adapters/`: chứa script cài đặt hoặc cập nhật theo từng tool.
- `memory-bank/`: chứa bộ nhớ dự án chuẩn để phục hồi ngữ cảnh.

- `README.md`: entrypoint ở mức repo cho cấu trúc, cài đặt và quy ước mở rộng.

## Mẫu Hình Workflow Chính

Pattern cốt lõi của project là workflow coding 8 bước:

1. Clarify.
2. Business Goal.
3. Open Questions.
4. Acceptance + DoR.
5. Technical Approach.
6. Task Plan.
7. Implement.
8. Verify + DoD.

Điểm quan trọng của pattern này:

- Discovery và delivery ở trong cùng một chain.
- Mỗi step có thể có contract, audit và gate riêng.
- Bước verify không chỉ là chạy test mà còn là khóa traceability và evidence.
- Khi scope có packaging hoặc rollout, có một DevOps delivery lane chạy xuyên step 5 -> 8; `deployment-devops` điều phối tổng, còn `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` khóa sâu từng lớp packaging, runtime, pipeline/release.

## Mẫu Hình Execution Topology

Workflow hiện không chỉ có lớp step và skill; orchestration đã bắt đầu formalize thêm lớp execution topology:

- `agentic`: một agent tự vận hành một step theo loop `contract -> readiness -> execute -> self-check -> audit -> handoff`.
- `multi-agent`: một coordinator chia việc cho nhiều worker/verifier trên cùng step contract, rồi merge kết quả để đóng step.
- Execution topology là lớp vận hành của workflow/skill, không phải workflow step mới.
- Guardrail như `step-goal-contract`, `step-goal-auditor`, `definition-of-ready-gate`, `definition-of-done-gate` vẫn là xương sống kiểm soát của cả hai topology.
- Note `.md` của step vẫn là nguồn sự thật dù step chạy theo `agentic` hay `multi-agent`.

## Mẫu Hình Tổ Chức Skill

Skill được chia theo vai trò:

- `orchestration`: điều phối chain tổng.
- `analysis`: làm rõ yêu cầu, business value, lựa chọn phương án.
- `architecture`: khóa boundary và thiết kế ở các mặt backend, frontend, data.
- `delivery`: lập task, implement, testing, DevOps packaging/runtime/release và review chất lượng đổi thay.
- `guardrails`: contract, readiness, audit và gate DoR/DoD.
- `obsidian`: materialize artifact theo hệ Obsidian khi cần.

Guardrails là lớp cross-cutting, không chỉ là một bước độc lập.

## Mẫu Hình Artifact

Project dùng một nguyên tắc artifact nhất quán:

- Note `.md` là nguồn sự thật.
- `.canvas` chỉ dùng để minh họa sơ đồ hoặc flow.
- `.base` chỉ dùng để tổng hợp hoặc dashboard.
- `content_skills` và `artifact_skills` phải được hiểu là hai lớp khác nhau.

Điều này giúp tránh việc quyết định kỹ thuật bị nằm rải rác ở artifact phụ.

## Mẫu Hình Runtime

Runtime model sau khi cài được chốt như sau:

- `AGENTS.global.md` được đặt vào `~/.codex/`.
- Skill được copy vào `~/.codex/skills/<skill-name>`.
- `AGENTS.md` ở root ổ đĩa hoặc thư mục project chỉ làm nhiệm vụ kích hoạt policy.
- Cấu trúc thư mục trong repo không phản ánh trực tiếp layout runtime; runtime là flat theo tên skill.

Hệ quả thiết kế:

- Tên skill phải duy nhất toàn repo.
- Cross-reference giữa các skill phải viết theo layout runtime phẳng.
- Repo có thể nhóm skill theo domain để dễ quản trị nguồn mà không đổi runtime behavior.

## Mẫu Hình MCP

Khi materialize một MCP capability:

- Server implementation nằm trong `mcp/<server-name>/`.
- Bootstrap hoặc dependency install nằm trong `adapters/mcp/`.
- MCP server nên nhỏ, tập trung vào một luồng nghiệp vụ rõ ràng.
- Server phải có guardrail phạm vi thao tác, nhất là khi đụng Git, filesystem hoặc external API.
- README riêng của từng server phải nêu rõ env vars, flow dùng tool và giới hạn an toàn.

## Mẫu Hình Mở Rộng

Khi mở rộng project:

- Thêm policy mới vào `policies/<tool>/`.
- Thêm adapter mới vào `adapters/<tool>/`.
- Thêm MCP server mới vào `mcp/<server-name>/`.
- Thêm skill mới vào nhóm phù hợp trong `skills/`.
- Chỉ tách nhóm skill mới khi nhóm hiện tại trở nên quá lớn hoặc khác hẳn về mục tiêu sử dụng.

## Mẫu Hình Tích Hợp Đặc Biệt

- `frontend-architecture` có file `agents/openai.yaml` để bật implicit invocation.
- Nhóm Obsidian hiện được vendor một phần từ `kepano/obsidian-skills`.
- `notebooklm` là skill tích hợp tool ngoài ở mức CLI/MCP để hỗ trợ research-heavy workflow; output của nó được xem là supporting input, không phải source of truth.




