---
language: vi
---

# Adaptive Planning

> Tiếng Anh / English: adaptive-planning.md

Tài liệu này materialize `Phase 4: Adaptive Planning` theo hướng `BMAD-inspired routing`, nhưng vẫn giữ workflow backbone 8 bước là trục duy nhất.

## Mục Tiêu

- thêm `planning_track` vào workflow note
- route độ sâu authoring theo `quick|full|enterprise`
- giữ cùng một workflow backbone, không sinh workflow song song
- dùng validator và CI để khóa planning preset

## Contract Adaptive Admission

Đây là tài liệu chuẩn của CR-008. Source thực thi nằm ở `packages/workflow-bundle/scripts/workflow-adaptive-governance.js`. Adaptive writer chỉ được bật khi mọi runtime được hỗ trợ cùng minor version với source bundle và canonical/runtime parity đã pass; nếu chưa, hệ thống vẫn đọc được cả hai shape nhưng chỉ ghi theo legacy path.

### Request lane

| Request lane | Mặc định vào delivery workflow | Applicability mặc định |
|---|---:|---|
| `qa` | không | không có role hoặc gate delivery |
| `translation` | không | không có role hoặc gate delivery |
| `summarization` | không | không có role hoặc gate delivery |
| `research` | không | không có role hoặc gate delivery |
| `documentation` | không | không có role hoặc gate delivery |
| `read_only_analysis` | không | không có role hoặc gate delivery |
| `maintenance` | có | `developer`, `qc`; `task_plan`, `dod` |
| `product_delivery` | có | bộ product delivery cơ bản, cộng role/gate theo trigger |

Lane phi-delivery phải return trước khi ghi report, scaffold, protocol, capability control hoặc telemetry. Human chỉ được override materialization khi ghi đủ `actor`, `reason` và `timestamp` UTC; reason ổn định là `HUMAN_MATERIALIZATION_OVERRIDE`. Override giữ nguyên lane đã phân loại và không phê duyệt bất kỳ gate nào.

### Thứ tự ưu tiên hard escalation

| Trigger | Escalation reason ổn định |
|---|---|
| public API/event/data contract | `HARD_PUBLIC_CONTRACT` |
| migration, backfill, cutover hoặc data movement tương đương | `HARD_MIGRATION` |
| behavior hoặc evidence nhạy cảm về bảo mật | `HARD_SECURITY_SENSITIVE` |
| evidence hoặc control có quản lý | `HARD_REGULATED` |
| greenfield hoặc foundation decision | `HARD_GREENFIELD_FOUNDATION` |
| release, rollout hoặc publication lên production | `HARD_RELEASE` |
| mixed intent không rõ ràng | `HARD_AMBIGUOUS_MIXED_INTENT` |
| request lane không hợp lệ | `HARD_UNKNOWN_REQUEST_LANE` |

Chỉ cần một hard trigger xuất hiện, effective lane phải là `product_delivery`, `workflow_required=true` và mọi reason phải được giữ theo thứ tự ổn định. Requested lane, planning preset hoặc override thông thường không được hạ mức.

Hard trigger phải đến từ classifier/CLI input có cấu trúc. Keyword trong raw request không đủ để kết luận vì câu “document the adapter contract” không chứng minh public contract thay đổi. Boolean của trigger chỉ nhận `true|false`; typo phải bị reject thay vì bị xem như hạ mức.

### Ma trận role và gate

| Effective lane hoặc trigger | Role bắt buộc | Gate bắt buộc | Nhóm reason ổn định |
|---|---|---|---|
| phi-delivery, không override | không có | không có | `LANE_*` |
| phi-delivery có override hợp lệ | `developer`, `qc` | `task_plan`, `dod` | `HUMAN_MATERIALIZATION_OVERRIDE`, bounded-change reasons |
| `maintenance` | `developer`, `qc` | `task_plan`, `dod` | `LANE_MAINTENANCE`, bounded-change và technical-closeout reasons |
| `product_delivery` cơ bản | `po`, `ba`, `developer`, `qc` | `spec`, `dor`, `approach`, `task_plan`, `dod`, `business_acceptance` | product-outcome, requirement, delivery, verification và business-outcome reasons |
| `public_contract` | thêm `sa`, `ta` | thêm `contract` | public-contract boundary/risk reasons |
| `migration` | thêm `ta` | không tự thêm gate | `ROLE_TA_MIGRATION_RISK` |
| `security_sensitive` | thêm `ta` | không tự thêm gate | `ROLE_TA_SECURITY_RISK` |
| `regulated` | thêm `sa`, `ta` | không tự thêm gate | regulated boundary/risk reasons |
| `greenfield_foundation` | thêm `sa`, `ta` | thêm `foundation` | foundation boundary/risk reasons |
| `release` | thêm `devops` | thêm `release`, `business_acceptance` | release/publication reasons |

Reviewer authority vẫn tường minh: `spec→ba`, `contract→developer`, `dor→ba+qc`, `approach→developer`, `foundation→developer`, `task_plan→developer`, `dod→qc`, `release→devops+qc`, `business_acceptance→po`. Applicability chỉ quyết định entry có xuất hiện hay không; nó không tự phê duyệt gate.

### Reason code ổn định

- Lane dùng `LANE_<UPPER_SNAKE_LANE>`.
- Role dùng `ROLE_<ROLE>_<TRIGGER_OR_RESPONSIBILITY>`.
- Gate dùng `GATE_<GATE>_<TRIGGER_OR_SCOPE>`.
- Activation dùng `ADAPTIVE_RUNTIME_VERSION_INVALID`, `ADAPTIVE_RUNTIME_MINOR_SKEW`, `ADAPTIVE_RUNTIME_PARITY_REQUIRED`.
- Thêm hoặc đổi tên reason là contract change; phải cập nhật golden fixture, adapter parity, docs và runtime trong cùng release.

## Planning Track

| Track | Khi dùng | Preset mặc định |
|---|---|---|
| `quick` | bug nhỏ, change nhỏ, scope hẹp, một boundary chính | `governance_profile=default`, `execution_mode=agentic`, `review_mode=self`, `sdd_mode=none` |
| `full` | feature/change thông thường, cần đủ discovery + delivery | `governance_profile=default`, `execution_mode=agentic`, `review_mode=self`, `sdd_mode=none` |
| `enterprise` | scope có nhiều role, review lane nặng, compliance/runtime risk cao | `governance_profile=strict`, `execution_mode=agentic`, `review_mode=independent`, `verification_owner=auditor`, `sdd_mode=none` |

## Routing Matrix

| Tín hiệu | Track khuyến nghị |
|---|---|
| một boundary, low risk, không cần review tách biệt | `quick` |
| nhiều requirement nhưng chưa tới mức compliance-heavy | `full` |
| nhiều role signoff, release risk cao, verify phải độc lập | `enterprise` |

## Rule Baseline Được Enforce

### `quick`

- `execution_mode` phải là `agentic`
- `review_mode` phải là `self`
- `sdd_mode` không được là `strict`

### `full`

- là baseline mặc định
- không thêm guardrail riêng ở phase này ngoài contract chung

### `enterprise`

- `governance_profile` không được là `default`
- step delivery `s05-s08` không được để `review_mode=self`
- step delivery `s05-s08` phải có `verification_owner`

## Command Chuẩn

Scaffold theo track:

```bash
wfc scaffold --work-item <work-item-slug> --planning-track quick
wfc scaffold --work-item <work-item-slug> --planning-track full
wfc scaffold --work-item <work-item-slug> --planning-track enterprise
```

Validate planning:

```bash
wfc plan --workflow-root work-items
```

## Sample Canonical

- `work-items/sample-quick-item/`
- `work-items/sample-enterprise-item/`
- các work item cũ chưa có `planning_track` hiện được validator xem như `full` để giữ backward compatibility trong rollout phase này
