# Project Context

Tài liệu này mô tả `governance context` đang có hiệu lực cho repo tại thời điểm hiện tại.

## Định Danh

- Project: `AI Agent Ops / Code-Factory`
- Mục tiêu hiện tại: chuẩn hóa workflow, skills, MCP và orchestration theo hướng `Codex-first`
- Governance source nền:
  - `project-context/constitution.md`
  - `project-context/governance-decision-model.md`
  - `project-context/governance-role-model.md`
  - `memory-bank/`
  - `policies/codex/AGENTS.global.md`
  - `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`

## Default Governance Setup

- `governance_ref` mặc định:
  - `project-context/project-context.md`
- `governance_profile` mặc định:
  - `default`
- `checklist_refs` mặc định:
  - `project-context/checklists/default.md`

## Khi Nào Nâng Profile

Chuyển sang `strict` khi có một hoặc nhiều tín hiệu sau:

- change đụng nhiều boundary hoặc nhiều role signoff
- có migration, compatibility risk hoặc rollback risk
- có packaging/runtime/release impact
- có external integration hoặc stateful data impact
- cần reviewer coverage chặt hơn bình thường

Chuyển sang `regulated` khi có một hoặc nhiều tín hiệu sau:

- cần audit trail hoặc approval chain rõ
- phải lưu evidence hoặc exception xuyên nhiều step
- có policy/compliance/control ngoài team delivery thông thường

## Required Reviews Theo Scope

| Scope tín hiệu | Review hoặc owner tối thiểu nên có |
|---|---|
| business rule đổi đáng kể | `po`, `ba` |
| UX/UI hoặc accessibility outcome | `designer`, `qc` |
| technical approach hoặc code path chính | `developer` |
| data change, migration hoặc compatibility | `developer`, `qc` |
| packaging, runtime, release, rollback | `devops`, `qc` |

## Shortcut Bị Cấm

- Bỏ qua `Clarify` hoặc `Acceptance + DoR` chỉ để đi nhanh sang code.
- Để kết luận chính thức chỉ nằm trong NotebookLM, search result hoặc chat log mà không chuẩn hóa vào artifact nguồn sự thật.
- Đổi behavior ngoài spec mà không ghi `spec-change` hoặc `governance-exception` khi cần.
- Đóng `DoD` hoặc `release` khi evidence vẫn thiếu mà không nói rõ limitation.
- Tạo workflow song song làm lệch backbone 8 bước.
- Silent rename step, slug hoặc artifact naming chuẩn mà không cập nhật policy và reference đồng thời.

## Cách Điền Metadata Trong Note Workflow

- `governance_ref`:
  thường trỏ `project-context/project-context.md`; chỉ trỏ thẳng `constitution.md` khi step cần nhấn mạnh nguyên tắc nền hơn bối cảnh vận hành.
- `governance_profile`:
  chọn `default`, `strict`, `regulated` hoặc `custom` theo `governance-decision-model.md`.
- `checklist_refs`:
  trỏ tới checklist profile đang áp dụng; có thể cộng thêm checklist riêng của work item theo rule trong `governance-decision-model.md`.
- `governance_status`:
  dùng enum chuẩn `ALIGNED|CHECKS_PENDING|EXCEPTION_RECORDED|WAIVER_APPROVED|BLOCKED|NOT_APPLICABLE` theo state model trong `governance-decision-model.md`.

## Ghi Chú Vận Hành

- Nếu scope chỉ là change nhỏ, vẫn nên dùng profile `default` thay vì để trống.
- Nếu có `governance-exception` còn mở tới step 8, phải ghi thêm vào `project-context/governance-exception-register.md`.
- `approved_by` của waiver hoặc exception phải theo authority trong `project-context/governance-role-model.md`.
- Trigger mở `governance-exception` và điều kiện cập nhật register phải theo `project-context/governance-decision-model.md`.
