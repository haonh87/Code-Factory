# Governance Role Model

Tài liệu này định nghĩa role model cho `governance layer` của workflow.

Mục tiêu:

- làm rõ role nào sở hữu loại quyết định governance nào
- tách bạch giữa `step signoff` và `waiver authority`
- tránh việc approve `governance-exception` theo cảm tính

## Nguyên Tắc

- `role_signoffs` của workflow note không tự động đồng nghĩa với quyền approve `waiver`.
- Role phát hiện exception có trách nhiệm ghi nhận exception, nhưng không luôn có quyền tự approve.
- Exception ảnh hưởng tới `release`, `business_acceptance` hoặc scope `regulated` không nên do một role tự approve một mình.
- Nếu authority phù hợp chưa hiện diện trong work item, step phải ở trạng thái `BLOCKED` hoặc giữ exception ở `PROPOSED`.

## Vai Trò Governance Cốt Lõi

### `po`

Phạm vi authority:

- business scope
- non-goals
- stakeholder trade-off
- business acceptance risk

Được quyền:

- xác nhận escalation khi `governance_profile` tăng vì ảnh hưởng business/scope/cost
- approve exception hoặc waiver có bản chất business hoặc product trade-off
- chặn `business_acceptance` khi residual risk không chấp nhận được

Không nên tự quyết một mình:

- technical exception thuần kiến trúc
- release/runtime exception thuần vận hành

### `ba`

Phạm vi authority:

- requirement clarity
- policy gap
- traceability giữa context, `BRD`, `SRS` và workflow note

Được quyền:

- đề xuất `governance_profile`
- đánh dấu `governance blocker`
- chốt completeness của `governance context` ở phía requirement/business rule

Không nên tự quyết một mình:

- approve waiver cuối cùng khi exception có ảnh hưởng business, technical hoặc release đáng kể

### `designer`

Phạm vi authority:

- UX rule
- accessibility baseline
- interaction/visual constraint

Được quyền:

- yêu cầu nâng governance khi scope chạm accessibility hoặc UX outcome quan trọng
- approve ngoại lệ UX nhỏ nếu không làm thay đổi business intent và không tạo release risk

Không nên tự quyết một mình:

- waiver có ảnh hưởng release, data, security, business acceptance

### `developer`

Phạm vi authority:

- technical approach
- code path chính
- architecture boundary
- migration/data compatibility ở mức implementation

Được quyền:

- chốt `approach`
- đề xuất và trong một số trường hợp approve technical exception
- yêu cầu nâng `governance_profile` khi phát hiện complexity hoặc compatibility risk

Không nên tự quyết một mình:

- waiver ảnh hưởng trực tiếp `release`
- waiver có business trade-off đáng kể
- waiver `regulated` không có reviewer độc lập

### `qc`

Phạm vi authority:

- verify evidence
- checklist completeness
- DoD readiness
- release recommendation từ góc nhìn kiểm chứng

Được quyền:

- chặn `DoD` khi evidence hoặc checklist chưa đủ
- yêu cầu giữ exception ở trạng thái mở nếu mitigation chưa được kiểm chứng
- yêu cầu reviewer coverage tăng thêm

Không nên tự quyết một mình:

- approve business trade-off
- approve technical direction nếu chưa có owner kỹ thuật

### `devops`

Phạm vi authority:

- runtime deploy
- release gate
- rollback path
- promotion control

Được quyền:

- approve waiver hoặc exception về runtime/release khi scope nằm trong lane DevOps
- chặn `release` khi rollout/rollback/evidence chưa đủ
- yêu cầu nâng `governance_profile` khi scope có packaging/runtime/promotion risk

Không nên tự quyết một mình:

- business waiver
- requirement/policy waiver không có `po` hoặc `ba`

## Ma Trận Quyết Định Governance

| Quyết định | Primary owner | Reviewer hoặc co-approver tối thiểu | Ghi chú |
|---|---|---|---|
| ghi `governance context` ban đầu | `ba` | `po`; `designer`/`developer`/`devops` khi có boundary tương ứng | thường xảy ra ở `s01-s03` |
| chọn `governance_profile` ban đầu | `ba` đề xuất | `po`; `developer` hoặc `devops` nếu có technical/release risk | không nên để trống profile |
| nâng profile từ `default` lên `strict` | role phát hiện risk, thường là `developer` hoặc `devops` | `ba`; `po` nếu ảnh hưởng scope/time/cost | escalation được ưu tiên hơn de-escalation |
| nâng profile lên `regulated` | `po` hoặc role phát hiện yêu cầu audit/compliance | `ba` + role domain liên quan | cần authority rõ trước khi tiếp tục |
| chốt `governance checks` cho `DoR` | `ba`, `qc` | `po`; `designer`/`developer` khi có rule chuyên biệt | thường ở `s04` |
| chốt `governance checks` cho `Task Plan` | `developer` | `qc`, `devops` khi có verify/release impact | thường ở `s06` |
| chốt `governance compliance` ở verify | `qc` | `devops` khi scope chạm release; `po` nếu còn risk business mở | thường ở `s08` |
| đề xuất `governance-exception` | role phát hiện lệch chuẩn | role owner của domain liên quan | phát hiện ở đâu, ghi ở step đó |
| approve `waiver` business | `po` | `ba` | áp cho scope, KPI, non-goal, business trade-off |
| approve `waiver` UX/accessibility | `designer` | `qc`; `po` nếu ảnh hưởng business intent | không dùng cho release/runtime risk |
| approve `waiver` technical/architecture | `developer` | `qc`; `po` nếu ảnh hưởng scope/business | không đủ nếu exception chạm release |
| approve `waiver` runtime/release | `devops` | `qc`; `developer` nếu có code/migration impact | áp cho rollout, rollback, promotion, runtime control |

## Ma Trận Authority Theo Loại Exception

| Loại exception | Người đề xuất thường gặp | Approver chính | Reviewer bắt buộc | Khi nào cần escalation thêm |
|---|---|---|---|---|
| business scope hoặc non-goal | `po`, `ba` | `po` | `ba` | khi kéo theo technical/release risk lớn |
| requirement clarity hoặc policy gap | `ba` | `po` | `ba` | khi gap chặn `DoR` hoặc ảnh hưởng nhiều role |
| UX/accessibility | `designer` | `designer` | `qc` | khi tác động KPI, compliance hoặc release |
| technical approach hoặc architecture | `developer` | `developer` | `qc` | khi ảnh hưởng `release`, `business_acceptance` hoặc `regulated` |
| data change, migration, compatibility | `developer` | `developer` | `qc`; `devops` nếu rollout impact | khi rollback khó hoặc promote rủi ro cao |
| runtime deploy hoặc release control | `devops` | `devops` | `qc`; `developer` nếu code path liên quan | khi business risk mở hoặc profile `regulated` |
| cross-cutting nhiều domain | role phát hiện đầu tiên | owner domain chịu ảnh hưởng lớn nhất | ít nhất 2 role gồm `qc` và 1 domain owner khác | luôn cần nếu chạm `regulated`, `release` hoặc `business_acceptance` |

## Rule Bổ Sung Cho `regulated`

Khi `governance_profile=regulated`:

- không role nào được là sole approver cho exception của chính mình
- phải có ít nhất 2 vai trò tham gia approval:
  - 1 domain owner
  - 1 reviewer độc lập như `qc`, hoặc `po` nếu rủi ro nằm ở business
- exception còn mở phải được ghi vào `governance-exception-register.md`

## Rule Bổ Sung Cho `release` Và `business_acceptance`

- Exception ảnh hưởng `release` không được xem là đóng nếu thiếu `devops` hoặc `qc`.
- Exception ảnh hưởng `business_acceptance` không được xem là đóng nếu thiếu `po`.
- Nếu cùng một exception chạm cả `release` và `business_acceptance`, cần ít nhất:
  - `po`
  - `qc`
  - `devops` hoặc `developer` tùy miền rủi ro chính

## Mapping Nhanh Theo Step

| Step | Governance owner mặc định | Điều cần chốt |
|---|---|---|
| `s01 Clarify` | `ba`, `po` | `governance context`, rule nền, profile đề xuất |
| `s02 Business Goal` | `po` | alignment với business scope, non-goals, trade-off |
| `s03 Open Questions` | `ba` | `governance blocker`, policy gap, owner resolution |
| `s04 Acceptance + DoR` | `ba`, `qc` | readiness checks, reviewer coverage, domain constraints |
| `s05 Technical Approach` | `developer` | technical exception, boundary rule, waiver need |
| `s06 Task Plan` | `developer` | coverage cho review, verify, release và mitigation task |
| `s07 Implement` | `developer`; `devops` nếu runtime/release scope | exception phát sinh và evidence hook |
| `s08 Verify + DoD` | `qc`; `devops` khi có release | compliance verdict, residual risk, release/business acceptance impact |

## Nguyên Tắc Phân Biệt

- `signoff owner` là người chịu trách nhiệm đóng gate của step.
- `waiver approver` là người có authority chấp nhận lệch chuẩn.
- Hai vai trò này có thể trùng, nhưng không được mặc định xem là luôn trùng.

## Hành Động Tối Thiểu Khi Có Exception

1. Role phát hiện lệch chuẩn ghi `governance-exception` trong step note.
2. Xác định approver theo ma trận ở tài liệu này.
3. Nếu exception còn mở quá một step hoặc chạm `release`, `business_acceptance`, `regulated`, cập nhật thêm `governance-exception-register.md`.
4. Không chuyển `governance_status` sang `WAIVER_APPROVED` nếu authority chưa đúng theo role model này.
