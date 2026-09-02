---
language: vi
---

# workflow-bundle Quickstart

> Tiếng Anh / English: workflow-bundle-quickstart.md

Hướng dẫn này tập trung vào ứng viên phát hành `workflow-bundle v2.6.2`: cài `wfc`, cài workflow bundle cho Codex hoặc Claude Code, định tuyến request bằng adaptive governance, bootstrap một repo mới và chạy flow `agent proposes, human approves`. Không thể cài từ registry cho tới khi human Release gate phê duyệt. Candidate giữ 42 managed skill và giữ nguyên thẩm quyền độc lập của human cho từng gate áp dụng.

## Mục Tiêu

Sau khi làm xong, bạn sẽ:

- có lệnh `wfc` trên máy
- cài được workflow bundle vào `~/.codex`, `~/.claude` hoặc project folder bằng `wfc install`
- bootstrap được một repo dự án mới bằng `wfc init`
- scaffold hoặc materialize được workflow đầu tiên
- hiểu request nào không cần delivery workflow và trigger nào buộc dùng đầy đủ control của product delivery
- approve được readiness hoặc closeout gate áp dụng trong một lần tương tác có transaction journal
- validate được workflow bằng `wfc`

## Requirements

- macOS, Linux hoặc Windows
- `node >= 18`
- `npm >= 9`
- `~/.codex` hoặc `~/.claude` writable, hoặc đường dẫn tương đương trên Windows
- `git` nếu clone source repo thay vì cài từ npm registry

Kiểm tra:

```bash
node -v
npm -v
```

## Cài CLI `wfc`

Cách chuẩn sau khi package đã publish:

```bash
npm install -g workflow-bundle
wfc help
wfc version
```

Nếu đang nâng từ CLI cũ `workflow-contracts`:

```bash
npm uninstall -g workflow-contracts
npm install -g workflow-bundle
wfc version
```

Nếu đang phát triển trực tiếp từ source repo này:

```bash
cd packages/workflow-bundle
npm link
wfc version
```

## Cài Workflow Bundle

Cài global policy và skills cho Codex:

```bash
wfc install --mode codex --scope global
```

Nếu không muốn nhớ cờ ngay từ đầu, có thể chạy:

```bash
wfc install
```

### Recommended Usage

- `interactive terminal`:
  - `wfc install`: chạy trực tiếp `wfc install`; CLI sẽ hỏi `mode` và `scope`
  - nếu chọn `project|both` mà chưa truyền `--project-root`, CLI sẽ hỏi tiếp project root
  - `wfc update`, `wfc status`, `wfc skills list|add|remove`: có thể bỏ `--mode`; CLI sẽ hỏi chọn `mode`
- `automation/CI/scripts`:
  - luôn truyền `--mode` tường minh
  - với `wfc install`, luôn truyền thêm `--scope` tường minh

Cài global memory/policy và skill references cho Claude Code:

```bash
wfc install --mode claude --scope global
```

Cài vào một project cụ thể:

```bash
wfc install --mode codex --scope project --project-root /path/to/your-project
```

Cài cả global lẫn project policy:

```bash
wfc install --mode codex --scope both --project-root /path/to/your-project
```

Kiểm tra trạng thái:

```bash
wfc status --mode codex
wfc status --mode claude
wfc skills list --mode codex
```

Khi có bản bundle mới, overwrite bundle đã cài theo install state hiện có:

```bash
wfc update --mode codex
```

`wfc update` cũng sẽ migrate state legacy `.codex-workflow-pack.*` sang `.codex-workflow-bundle.*` nếu máy đã từng cài flow cũ trong Codex mode.

## Cách Hiểu Runtime Sau Khi Cài

Sau khi cài bundle, agent không được coi feature request là lệnh implement trực tiếp.

Runtime hiện tại vận hành theo mô hình:

- `authority layer`: `AGENTS.global.md`
- `entry router`: skill `workflow-governance-router`
- `workflow backbone`: skill `codex-workflow-chain`
- `step skills`: skill theo từng step phân tích, thiết kế, planning, implement, verify

Với mọi task thuộc delivery workflow, agent phải route trước rồi mới hành động. Tối thiểu phải báo block trạng thái sau:

```text
Current Step: s0X <tên step>
Workflow Status: ACTIVE | BLOCKED | WAITING_APPROVAL | READY_FOR_REVIEW | VERIFIED
Delivery Context: greenfield | brownfield
What I Am Doing Now: <một câu>
Missing Gates: <danh sách hoặc NONE>
Next Artifact: <artifact hoặc decision cần tiếp theo>
Next Human Action: <review/approval cần từ người, hoặc NONE>
```

Nếu còn thiếu gate hoặc còn blocker trọng yếu, agent phải dừng ở `BLOCKED` hoặc `WAITING_APPROVAL`, không được tự đi tiếp sang implement.

Consistency rule:

- nếu `Missing Gates` khác `NONE`, `Workflow Status` không được là `ACTIVE`, `READY_FOR_REVIEW` hoặc `VERIFIED`
- nếu `Missing Gates` khác `NONE`, `Next Human Action` không được là `NONE`
- request greenfield kiểu `QR Voucher + voucher service API + tone brand` trong repo trống phải dừng ở `proposal stage`, không được auto-scaffold

## Định Tuyến Request Thích Ứng

Vocabulary công khai gồm:

- non-delivery: `qa`, `translation`, `summarization`, `research`, `documentation`, `read_only_analysis`
- bounded delivery: `maintenance`
- product delivery: `product_delivery`

Các lane non-delivery kết thúc trước khi ghi report, scaffold, capability grant hoặc telemetry record. Chỉ human mới được yêu cầu materialize tường minh và phải cung cấp override có audit. Maintenance chỉ chọn role Developer/QC cùng gate Task Plan/DoD cần cho bounded change.

Các hard trigger sau luôn route sang `product_delivery`: `public_contract`, `migration`, `security_sensitive`, `regulated`, `greenfield_foundation` và `release`. Intent hỗn hợp hoặc lane không xác định cũng fail-closed. Vì vậy SA và TA chỉ xuất hiện theo trigger, không còn bắt buộc với yêu cầu không liên quan; DevOps và Release chỉ xuất hiện khi scope có release. Thẩm quyền của gate áp dụng không thay đổi.

Adaptive artifact writer có compatibility guard. Muốn bật phải truyền `--adaptive-writes true`, `--request-lane` tường minh, source/runtime đã cài cùng minor version và `--adaptive-parity-passed true`. Nếu một guard fail, hệ thống không ghi adaptive report, scaffold, capability state hay telemetry record. Chỉ bật cờ sau khi parity giữa canonical, Codex, Claude và installed candidate đã thực sự pass.

Approval bundle giảm số lần tương tác nhưng không gộp decision:

```bash
# Trước hết finalize host note và điền gate_reviews cho từng gate áp dụng.
wfc gate approve-ready-bundle --work-item <work-item-slug>
# Hoặc reject cả readiness batch theo cơ chế atomic.
wfc gate reject-ready-bundle --work-item <work-item-slug>

# Sau verify, approve đúng các terminal gate áp dụng.
wfc gate approve-closeout-bundle --work-item <work-item-slug>
```

Mỗi gate vẫn giữ reviewer, timestamp, artifact digest và signed receipt riêng. CLI preflight toàn bộ batch trước khi ký, dùng lock theo work item và transaction journal, rồi recover hoặc rollback interrupted write trước khi chấp nhận retry. Các lệnh `wfc gate approve` riêng lẻ vẫn là compatibility fallback.

Telemetry mặc định tắt. Bật tường minh bằng `--telemetry true` trên lifecycle command được hỗ trợ hoặc `CF_TELEMETRY=on`. Dữ liệu chỉ nằm cục bộ, theo allowlist và dùng mã định danh giả danh; raw record hết hạn sau 30 ngày, aggregate record sau 90 ngày. Xóa record hết hạn bằng:

```bash
wfc telemetry purge
wfc telemetry purge --telemetry-out /path/to/local-telemetry
```

Không có remote telemetry exporter.

## Bootstrap Một Repo Dự Án Mới

```bash
cd /path/to/your-project
wfc init
```

Lệnh này sẽ tạo:

- `workflow-bundle.config.json`
  mặc định có `protocolControl.legacyScaffoldPolicy=forbid` để không coi legacy scaffold là execution path hợp lệ
  và sẽ bị capability control khóa ghi theo strict default sau khi sync
- `work-items/`
- `changes/`
- `product-specs/brd/`
- `product-specs/srs/`
- `project-context/project-context.md`
- `project-context/constitution.md`
- `project-context/governance-exception-register.md`
- `project-context/checklists/default.md`
- `project-context/checklists/strict.md`
- `project-context/checklists/regulated.md`
- `project-context/custom/design-review.md`

## Flow 1: Manual Scaffold

Flow ngắn nhất để bắt đầu một work item do human chủ động chốt:

```bash
wfc scaffold --work-item customer-search
wfc work-item list
wfc work-item status --work-item customer-search
wfc
wfc sdd
wfc change
wfc plan
```

Nếu work item dùng execution metadata hoặc artifacts:

```bash
wfc exec
```

## Flow 2: Agentic Proposal Với Human Approval

Nếu muốn đi từ raw request:

```bash
wfc materialize --request "fix timeout khi user login bang email/password tren web"
```

Nếu muốn để tool tự scaffold khi request đủ rõ:

```bash
wfc materialize --request "them dang nhap Google cho customer portal" --auto-scaffold
```

Nếu work item được agent materialize và có `change_id`, human cần approve cả change package lẫn work item trước khi delivery tiếp tục:

```bash
wfc change-item approve --change-id CHANGE-001 --reviewed-by po
wfc work-item list
wfc work-item status --work-item add-google-oauth-login
wfc work-item approve --work-item add-google-oauth-login --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate spec --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate dor --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate approach --reviewed-by developer
wfc gate approve --work-item add-google-oauth-login --gate task_plan --reviewed-by developer
```

Sau khi ghi cùng các per-gate review đó vào host note đã finalize, readiness bundle là cách ngắn hơn nhưng tương đương về thẩm quyền cho các gate áp dụng:

```bash
wfc gate approve-ready-bundle --work-item add-google-oauth-login
```

Sau đó hoàn tất authoring và human review cho `s04`, `s05`, `s06`, rồi mới mở execution:

```bash
wfc governance
wfc plan
wfc work-item activate --work-item add-google-oauth-login --step s07 --write-root src --write-root public
wfc protocol
```

`wfc work-item activate` hiện là execution gate. Nó chỉ pass khi:

- `work item approval` đã `APPROVED`
- nếu có `change_id`, `change package approval` đã `APPROVED`
- nếu `delivery_context=greenfield`, `bootstrap gate` đã `APPROVED`
- evidence `s04`, `s05`, `s06` đã đủ theo validator
- trusted signed receipts cho `work item`, `change` và các gate bắt buộc đã tồn tại
- có ít nhất một `--write-root` để capability control biết implementation path nào được mở ghi

Ghi chú protocol:

- strict default của repo mới là `protocolControl.legacyScaffoldPolicy=forbid`; chỉ khi project config bật explicit `allow_readonly` thì `wfc work-item list|status` mới nên dùng bootstrap report read-only từ `s01` cũ để quan sát legacy scaffold.
- `list|status` chỉ đọc và không persist report; `approve` tường minh có thể bootstrap item chỉ có scaffold với provenance audit được, còn `activate|verify|close` yêu cầu `.work-item-report.json` đã tồn tại.
- `change-item approve`, `work-item approve` và `gate approve` sẽ ký receipt vào trusted approval root; nếu receipt không hợp lệ hoặc artifact đổi sau khi approve, `activate` sẽ fail.
- các lệnh `approve` vẫn đi qua CLI, nhưng phải do human tự chạy trong interactive TTY; normal mode sẽ reject `--approval-passphrase` và `WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE`.
- lần approve đầu tiên trong một trusted approval root sẽ tạo keypair approver và yêu cầu human nhập approval passphrase trực tiếp trên TTY đó.
- non-interactive approval chỉ dành cho smoke/test fixture, không phải operational path.
- implementation path bị khóa ở mức filesystem cho tới khi work item vào `ACTIVE` ở `s07` và được cấp `write-root`.

## Validate Workflow

Validate workflow chuẩn:

```bash
wfc
```

Các lane bổ sung khi cần:

```bash
wfc naming
wfc governance
wfc sdd
wfc change
wfc exec
wfc plan
wfc protocol
```

## Tạo Change Package Thủ Công

```bash
wfc scaffold-change --change-id CHANGE-001 --work-item customer-search
```

## Luồng Dùng Hằng Ngày

Flow manual:

```bash
wfc init
wfc scaffold --work-item <work-item-slug>
wfc
wfc sdd
wfc change
wfc plan
```

Flow agentic:

```bash
wfc materialize --request "<raw-request>" --auto-scaffold
wfc change-item approve --change-id <CHANGE-ID> --reviewed-by <role>
wfc work-item list
wfc work-item status --work-item <work-item-slug>
wfc work-item approve --work-item <work-item-slug> --reviewed-by <role>
wfc gate approve --work-item <work-item-slug> --gate <spec|dor|approach|task_plan> --reviewed-by <role>
# Hoặc, sau khi finalize mọi host note và gate_reviews áp dụng:
wfc gate approve-ready-bundle --work-item <work-item-slug>
wfc work-item activate --work-item <work-item-slug> --step s07 --write-root <path>
wfc work-item verify --work-item <work-item-slug>
wfc gate approve-closeout-bundle --work-item <work-item-slug>
wfc capability status
wfc protocol
```

## Gắn Vào `package.json` Của Repo Dự Án

```json
{
  "scripts": {
    "wfc": "wfc",
    "validate:workflow": "wfc",
    "validate:workflow:naming": "wfc naming",
    "validate:workflow:governance": "wfc governance",
    "validate:workflow:sdd": "wfc sdd",
    "validate:workflow:change": "wfc change",
    "validate:workflow:execution": "wfc exec",
    "validate:workflow:planning": "wfc plan",
    "validate:workflow:protocol": "wfc protocol"
  }
}
```

Sau đó chạy:

```bash
npm run validate:workflow
```

## Khi Nào Cần Cập Nhật `wfc`

Nếu đã cài package publish:

```bash
npm install -g workflow-bundle@latest
```

Nếu đang dùng `npm link` từ source repo:

```bash
cd packages/workflow-bundle
npm link
```
