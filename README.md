# AI Agent Ops

Repository này lưu trữ policy, workflow, skill và adapter cài đặt cho các tác vụ AI agent. Hiện tại repo ưu tiên Codex, nhưng cấu trúc đã được chia để sau này mở rộng thêm tool hoặc agent khác.

## Tài Liệu Định Hướng

Nguồn sự thật để lưu và phục hồi ngữ cảnh dự án là `memory-bank/`.

Bắt đầu từ [`memory-bank/projectbrief.md`](memory-bank/projectbrief.md), sau đó đọc lần lượt các file core còn lại trong `memory-bank/`.

## Thành Phần Trong Repository

- `policies/codex/AGENTS.global.md`: chính sách workflow toàn cục cho Codex.
- `skills/orchestration/`: skill điều phối workflow tổng.
- `skills/analysis/`: skill phân tích yêu cầu, product thinking và technical approach.
- `skills/architecture/`: skill kiến trúc domain và thiết kế dữ liệu.
- `skills/delivery/`: skill chia task, implement, testing, DevOps packaging/deploy và review thay đổi dữ liệu/code.
- `skills/guardrails/`: skill contract, readiness, audit và gate DoR/DoD để khóa chất lượng.
- `skills/obsidian/`: skill soạn thảo artifact theo hệ Obsidian như note Markdown, Bases và JSON Canvas.
- `skills/notebooklm/`: skill tích hợp NotebookLM qua CLI/MCP cho các tác vụ research-heavy hoặc corpus lớn.
- `adapters/codex/install-codex-workflow.ps1`: script cài đặt cho Windows.
- `adapters/codex/install-codex-global.cmd`: launcher Windows để cài global nhanh.
- `adapters/codex/install-codex-workflow.sh`: script cài đặt cho Linux/macOS.

## Khả Năng DevOps Theo Môi Trường

- `local`: chuẩn đóng gói bằng `Dockerfile` và `compose.yaml`.
- `dev`, `uat`, `prod`: workflow hiện có thể khóa runtime target theo `docker`, `docker swarm` hoặc `k8s`.
- Cùng một image contract nên được promote giữa các môi trường; khác biệt nên nằm ở config/secrets và rollout strategy.
- `deployment-devops` là skill umbrella để điều phối DevOps tổng từ `local` tới `prod`.
- `containerization-packaging` khóa `Dockerfile`, `.dockerignore`, `compose.yaml` và packaging pattern theo ngôn ngữ hoặc workload.
- `platform-runtime-deployment` và `ci-cd-release` lần lượt khóa runtime deploy và pipeline hoặc promotion hoặc approval cho `dev`, `uat`, `prod`.

## Obsidian Skills Hiện Có

Bộ skill này được vendor từ `kepano/obsidian-skills`, hiện lấy vào repo 3 skill phục vụ authoring artifact:

- `obsidian-markdown`: tạo và chỉnh sửa Obsidian Flavored Markdown (`.md`).
- `obsidian-bases`: tạo và chỉnh sửa Obsidian Bases (`.base`).
- `json-canvas`: tạo và chỉnh sửa JSON Canvas (`.canvas`).

Ghi chú:
- Chưa bundle `obsidian-cli` trong vòng này.
- Script cài đặt hiện tại tự đồng bộ toàn bộ thư mục `skills/` theo đệ quy vào `~/.codex/skills/<skill-name>`, nên không cần thêm bước cài đặt riêng cho nhóm skill này.

## Đưa Lên GitHub

1. Tạo repository mới trên GitHub.
2. Đẩy thư mục này lên repository:

```bash
git init
git add .
git commit -m "init ai agent ops"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Cài Đặt Trên Máy Windows

```powershell
git clone <your-github-repo-url> $env:USERPROFILE\codex-workflow-pack
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-pack\adapters\codex\install-codex-workflow.ps1"
```

Hoặc dùng launcher Windows:

```cmd
%USERPROFILE%\codex-workflow-pack\adapters\codex\install-codex-global.cmd
```

Launcher này là cách cài khuyến nghị nếu muốn toàn bộ project trên máy Windows đều nhận workflow pack:
- đồng bộ policy global vào `%USERPROFILE%\.codex`
- đồng bộ toàn bộ skill vào `%USERPROFILE%\.codex\skills`
- tạo `AGENTS.md` ở root các ổ đĩa filesystem để mọi project nằm dưới các ổ đó đều nhận workflow

Nếu muốn workflow áp dụng cho toàn bộ thư mục trên máy Windows, tạo `AGENTS.md` ở root tất cả ổ đĩa filesystem:

```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-pack\adapters\codex\install-codex-workflow.ps1" -CreateDriveRootLinks
```

Nếu muốn cập nhật lại root `AGENTS.md` đã tồn tại trước đó bằng bản mới nhất từ workflow pack:

```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-pack\adapters\codex\install-codex-workflow.ps1" -CreateDriveRootLinks -OverwriteExistingDriveRootFiles
```

Ghi chú:
- Skill trong `%USERPROFILE%\.codex\skills` là global cho mọi session Codex.
- `AGENTS.md` chỉ dùng để áp policy workflow cho project; path tham chiếu bên trong skill phải khớp layout cài trong `%USERPROFILE%\.codex\skills`.
- `AGENTS.md` ở root mỗi ổ đĩa giúp policy workflow áp dụng cho mọi project nằm dưới ổ đó.
- Script sẽ tự quét các ổ đĩa filesystem thay vì cố định `C`, `D`, `E`.
- Nếu máy không cho tạo symlink, script sẽ thử copy `AGENTS.md` thay thế.
- Nếu một ổ đã có `AGENTS.md`, script sẽ giữ nguyên và bỏ qua ổ đó.
- Muốn ghi đè `AGENTS.md` đã tồn tại, truyền thêm `-OverwriteExistingDriveRootFiles`.

## Giải Nghĩa Nhanh Cho Cài Global

Mô hình cài global của gói này có 2 lớp khác nhau:

- Lớp policy: `AGENTS.md` ở root ổ đĩa hoặc thư mục project để Codex biết phải áp workflow nào khi làm việc trong vùng đó.
- Lớp skill: các thư mục skill được cài vào `%USERPROFILE%\.codex\skills\<skill-name>` để mọi session Codex đều có thể gọi.

Điểm quan trọng:

- `AGENTS.md` không chứa toàn bộ nội dung skill; nó chỉ là điểm kích hoạt policy workflow.
- Skill path được resolve từ thư mục skill đã cài trong `%USERPROFILE%\.codex\skills`, không resolve từ vị trí của `AGENTS.md`.
- Vì installer hiện cài theo dạng phẳng `~/.codex/skills/<skill-name>`, mọi tham chiếu chéo giữa skill phải khớp với layout phẳng này.

Ví dụ:

- `step-goal-auditor` sẽ được cài vào `%USERPROFILE%\.codex\skills\step-goal-auditor`
- `codex-workflow-chain` sẽ được cài vào `%USERPROFILE%\.codex\skills\codex-workflow-chain`
- Từ đó, path tham chiếu đúng từ `step-goal-auditor` sang tài liệu workflow chain là `../codex-workflow-chain/references/workflow-chain.md`

## Cài Đặt Trên Linux/macOS

```bash
git clone <your-github-repo-url> ~/codex-workflow-pack
bash ~/codex-workflow-pack/adapters/codex/install-codex-workflow.sh
```

## Cập Nhật Trên Máy Đã Cài

```bash
cd <repo-local-path>
git pull
```

Sau đó chạy lại script cài đặt để đồng bộ toàn bộ skill mới nhất vào `~/.codex/skills`.
Trên Windows, nếu muốn đồng bộ và cài global nhanh, chạy lại `adapters\codex\install-codex-global.cmd`.
Trên Linux/macOS, nếu chỉ muốn cập nhật policy và skill mới vào Codex global đã cài sẵn, chạy `bash adapters/codex/update-codex-workflow.sh`.

Ghi chú:
- Script update `.sh` đồng bộ `~/.codex/AGENTS.global.md` và `~/.codex/skills`.
- Trên Windows, nếu máy đang dùng `AGENTS.md` root-level theo kiểu file copy thay vì symlink, chạy lại full install flow với `-CreateDriveRootLinks -OverwriteExistingDriveRootFiles` cho ổ cần refresh.

## Quy Ước Mở Rộng

- Thêm policy mới theo tool tại `policies/<tool>/`.
- Thêm adapter cài đặt hoặc bootstrap theo tool tại `adapters/<tool>/`.
- Thêm skill mới vào đúng nhóm trong `skills/` để tránh repo thành một thư mục phẳng khó quản lý.
- Chỉ tách thêm nhóm skill mới khi số lượng skill trong một nhóm hiện tại bắt đầu quá lớn hoặc khác hẳn về mục tiêu sử dụng.

Ghi chú vận hành:

- Cấu trúc nhóm trong repo chỉ phục vụ quản trị nguồn và đọc hiểu.
- Layout runtime sau khi cài global cho Codex hiện là flat theo `skill-name`.
- Khi thêm skill mới, nên kiểm tra tên skill là duy nhất ở mức toàn repo để tránh ghi đè lúc cài global.
