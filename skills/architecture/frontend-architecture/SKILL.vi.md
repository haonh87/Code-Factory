---
language: vi
name: frontend-architecture
description: Thiết kế kiến trúc cho frontend application theo hướng module-first hoặc feature-first để chốt feature module, route ownership, UI/state boundary, public contract, shared rule và interaction boundary trước khi chia task hoặc triển khai. Dùng khi cần cấu trúc source code frontend nhất quán, ngăn drift theo technical layer, hoặc chốt ranh giới giữa module, flow và app shell.
---

# Frontend Architecture

> English: SKILL.md

Thiết kế kiến trúc cho frontend application xoay quanh feature hoặc module để chốt boundary, ownership và quy tắc chia sẻ trước khi triển khai.

## Mục Tiêu

- Xác định feature module, flow và app shell của bài toán frontend.
- Chốt ownership cho route, state, UI, data fetching và side effect chính.
- Thiết kế public contract và import boundary để giảm coupling giữa các module.
- Chọn mức áp dụng phù hợp giữa `MODULE_FIRST`, `MODULE_FIRST_WITH_FLOWS` và `MICRO_FRONTEND`.
- Tạo blueprint đủ rõ để `system-design`, `task-breakdown-planner` và `implementation` dùng tiếp.

## Khi Sử Dụng

- Khi frontend app bắt đầu phình to và ranh giới giữa feature bị mờ.
- Khi cần quyết định nên tổ chức frontend theo `module-first`, có cần thêm `flow` layer hay không, hoặc có nên tách `micro frontend`.
- Khi nhiều route, state và component đang bị gom vào `shared`, `common`, `hooks`, `services` hoặc `stores` toàn cục.
- Khi cần khóa boundary trước khi chia task implement cho frontend.
- Chạy `frontend-experience-design` song song hoặc ngay trước skill này khi bài toán còn cần screen-level behavior (layout, UI state, form feedback), không chỉ source-code boundary — không bắt đầu thiết kế module/route/state ownership từ một feature request thô nếu request có UX surface thật mà chưa có input đó.

## Không Thuộc Phạm Vi

- Không thiết kế chi tiết pixel UI, UI state, responsive rule, form feedback, motion, màu sắc hoặc visual spec; dùng `frontend-experience-design` khi cần khóa các điểm này trước khi implement.
- Không thay thế cho `system-design` ở mức API, cache, infra hoặc kiến trúc liên hệ thống.
- Không trực tiếp viết code production hoặc chia task implement chi tiết.
- Không tự mở rộng scope business ngoài yêu cầu đã được làm rõ.

## Đầu Vào Tối Thiểu

- `business_goal`: mục tiêu business hoặc user outcome đã được chốt.
- `acceptance_criteria`: tiêu chí chức năng chính của yêu cầu.
- `frontend_surfaces`: route, page, screen, widget hoặc channel người dùng liên quan.
- `user_flows`: luồng người dùng chính và điểm chuyển trạng thái quan trọng.
- `current_context`: cấu trúc codebase frontend hiện tại, app shell, state management, router và shared area đang có.
- `known_constraints`: ràng buộc về framework, SSR/SPA, team, performance, accessibility hoặc release.

Nếu chưa xác định được `business_goal` hoặc chưa có đủ `frontend_surfaces`, dừng và yêu cầu làm rõ thêm.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
frontend_style: MODULE_FIRST|MODULE_FIRST_WITH_FLOWS|MICRO_FRONTEND
app_shell:
  responsibilities: []
  owns: []
feature_modules:
  - name: ""
    purpose: ""
    owned_routes: []
    owned_state: []
    public_contracts: []
flows:
  - name: ""
    purpose: ""
    composes_modules: []
    owns_state: []
shared_areas:
  - area: ""
    allowed_contents: []
    forbidden_contents: []
interaction_rules:
  - from: ""
    to: ""
    allowed_via: ""
    forbidden_patterns: []
client_state_ownership_rules:
  - state_area: ""
    owner_module: ""
    notes: ""
routing_rules: []
architecture_risks: []
notes_for_next_step: ""
```

## Ý Nghĩa Từng Output

- `frontend_style`: mức độ áp dụng kiến trúc frontend phù hợp với bài toán.
- `app_shell`: phần khởi tạo chung của ứng dụng và những gì được phép sở hữu ở cấp app.
- `feature_modules`: các module nghiệp vụ chính cùng route, state và contract công khai của từng module.
- `flows`: các user journey ghép nhiều module nếu cần orchestration layer.
- `shared_areas`: vùng dùng chung được phép tồn tại và giới hạn nội dung của từng vùng.
- `interaction_rules`: quy tắc tương tác được phép giữa module, flow và app shell.
- `client_state_ownership_rules`: ownership của từng vùng state quan trọng.
- `routing_rules`: quy tắc gán route cho module hoặc flow.
- `architecture_risks`: rủi ro nếu boundary, ownership hoặc shared rule bị chọn sai.
- `notes_for_next_step`: ghi chú chuyển sang `system-design`, `task-breakdown-planner` hoặc `implementation`.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 5 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Architecture Details`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Chỉ ghi block này khi bài toán thực sự cần khóa frontend module, routing, state ownership hoặc app shell.

## Luồng Thực Thi

1. Xác định route, screen, actor và user flow chính.
2. Gom nhóm UI và state theo responsibility để tìm `feature_modules`.
3. Kiểm tra có cần `flows` để orchestration nhiều module hay chỉ cần module boundary.
4. Chọn `frontend_style` phù hợp giữa `MODULE_FIRST`, `MODULE_FIRST_WITH_FLOWS` và `MICRO_FRONTEND`.
5. Gán ownership cho route, state, side effect, data fetching và public contract.
6. Viết `interaction_rules` để chặn import chéo và truy cập nội bộ không kiểm soát.
7. Viết `shared_areas` và `routing_rules` để khóa chỗ nào thực sự được dùng chung.
8. Ghi lại `architecture_risks` và `notes_for_next_step`.

## Frontend Canonical Pattern

Chỉ áp dụng mục này khi `frontend_style = MODULE_FIRST` hoặc `MODULE_FIRST_WITH_FLOWS`. Đọc `references/module-first-pattern.vi.md` để có đầy đủ source code shape chuẩn, dependency rule, ownership rule, public contract rule và shared rule — không suy diễn lại ở đây. Với `MICRO_FRONTEND`, bỏ qua hoàn toàn reference đó.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt.
- Không tổ chức frontend theo `components`, `hooks`, `services`, `stores` toàn cục như business structure gốc.
- Không đặt business rule trong `shared`, `common`, `core`, `app` hoặc utility folder.
- Không đặt tên module theo concern kỹ thuật như `api`, `modal`, `table`, `hook`, `store`.
- Nếu cùng một thuật ngữ nghiệp vụ mang nhiều nghĩa theo route hoặc user flow, phải cân nhắc tách module hoặc nâng cấp style.
- Khi `domain-architecture` đã chạy cho hệ thống này, mỗi giá trị `owner_module` trong `client_state_ownership_rules` phải trace về đúng entry trong `ownership_map` của nó; nếu owner của vùng state không khớp, ghi mismatch vào `architecture_risks` thay vì để lệch âm thầm.
- Tài liệu phải lưu UTF-8 và không làm hỏng dấu tiếng Việt.

## Luật Ra Quyết Định

- Chọn `MODULE_FIRST` cho phần lớn SPA, SSR app hoặc dashboard có số lượng feature vừa đến lớn.
- Chọn `MODULE_FIRST_WITH_FLOWS` khi nhiều user journey băng qua nhiều module và cần orchestration layer riêng nhưng chưa cần tách thành nhiều app độc lập.
- Chọn `MICRO_FRONTEND` chỉ khi có ranh giới deploy, team autonomy, runtime isolation hoặc compliance đủ mạnh để biện minh cho độ phức tạp tăng thêm.
- Nếu một state chỉ phục vụ một module, không đưa vào global store.
- Nếu một component có business wording hoặc business behavior riêng, giữ nó trong module thay vì chuyển lên `shared/ui`.
- Nếu import boundary bị vi phạm chỉ để tái sử dụng nhanh, đánh dấu thành `architecture_risks` thay vì hợp thức hóa ngay.

## Điều Kiện Hoàn Tất

- Có `frontend_style` và lý do chọn đủ rõ.
- Có `feature_modules`, `client_state_ownership_rules` và `routing_rules` đủ để bước sau không bị mơ hồ về ownership.
- Có `interaction_rules` và `shared_areas` đủ để kiểm soát import boundary và tái sử dụng.
- Có `architecture_risks` cho các điểm chưa chốt hoặc còn tranh chấp.
