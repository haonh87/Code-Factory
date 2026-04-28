---
name: frontend-architecture
description: Thiết kế kiến trúc cho frontend application theo hướng module-first hoặc feature-first để chốt feature module, route ownership, UI/state boundary, public contract, shared rule và interaction boundary trước khi chia task hoặc triển khai. Dùng khi cần cấu trúc source code frontend nhất quán, ngăn drift theo technical layer, hoặc chốt ranh giới giữa module, flow và app shell.
---

# Frontend Architecture

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
state_ownership_rules:
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
- `state_ownership_rules`: ownership của từng vùng state quan trọng.
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

Áp dụng mục này khi `frontend_style = MODULE_FIRST` hoặc `MODULE_FIRST_WITH_FLOWS`.

### 1. Source Code Shape Chuẩn

Mặc định đề xuất:

```text
src/
  app/
    router/
    providers/
    layouts/
    guards/
  modules/
    <module-name>/
      public.ts
      api/
      model/
      ui/
      pages/
      lib/
      tests/
  flows/
    <flow-name>/
      public.ts
      model/
      ui/
      tests/
  shared/
    ui/
    lib/
    config/
    assets/
    types/
```

Trong đó:

- `app/` chứa bootstrap, router registration, provider và app shell; không chứa business rule của từng module.
- `modules/<module-name>/` là boundary chính của feature hoặc vùng nghiệp vụ trên frontend.
- `public.ts` là public entry duy nhất để module hoặc flow khác import.
- `api/` chứa query, mutation, mapper request hoặc response và helper giao tiếp server.
- `model/` chứa client state, selector, schema, validation, view-model và business rule phía client.
- `ui/` chứa component mang meaning nghiệp vụ của module hoặc flow.
- `pages/` chứa page hoặc route entry mà module sở hữu.
- `lib/` chứa helper nội bộ của module; không tự động là vùng dùng chung toàn hệ thống.
- `flows/` chỉ dùng khi một user journey ghép nhiều module và cần orchestration layer riêng.
- `shared/` chỉ chứa primitive kỹ thuật, UI generic, config và type trung tính domain.

### 2. Dependency Rule Chuẩn

Phụ thuộc hợp lệ:

- `app -> modules/public`
- `app -> flows/public`
- `flows -> modules/public`
- `modules -> shared`
- `flows -> shared`
- `modules/ui|pages -> modules/model|api|lib`

Phụ thuộc bị cấm:

- `module A -> internal file` của `module B` mà không đi qua `public.ts`
- `shared -> modules` hoặc `shared -> flows`
- `app -> internal file` của bất kỳ module nào
- `flow -> internal file` của module khác ngoài public contract
- Global store chứa state của nhiều module chỉ vì tiện

### 3. Ownership Rule Chuẩn

- Mỗi route business chính phải có đúng một `owner_module` hoặc `owner_flow`.
- Mỗi vùng state business chính phải có đúng một `owner_module`.
- `flow` chỉ được sở hữu state điều phối ngắn hạn của user journey; không được trở thành `source of truth` lâu dài của domain.
- `app/` chỉ sở hữu state và concern toàn ứng dụng như auth bootstrap, theme, locale hoặc session shell nếu thực sự dùng chung.

### 4. Public Contract Rule Chuẩn

- Module hoặc flow khác chỉ được dùng những gì được expose qua `public.ts`.
- Không expose internal component, internal hook hoặc internal selector nếu chưa cần là contract công khai.
- Nếu một module cần đọc dữ liệu từ module khác, ưu tiên query contract, selector contract hoặc read model được expose rõ.
- Nếu một module cần ghi hoặc trigger side effect ở module khác, đi qua action, use case client-side hoặc mutation contract được expose rõ.

### 5. Shared Rule Chuẩn

- `shared/ui` chỉ chứa component generic, không gắn business wording hoặc workflow đặc thù.
- `shared/lib` chỉ chứa utility trung tính domain.
- `shared/config`, `shared/types`, `shared/assets` chỉ chứa nội dung dùng chung thật sự.
- Không đẩy component, hook, validation hoặc state vào `shared` chỉ vì đang có từ hai nơi dùng tạm thời.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt.
- Không tổ chức frontend theo `components`, `hooks`, `services`, `stores` toàn cục như business structure gốc.
- Không đặt business rule trong `shared`, `common`, `core`, `app` hoặc utility folder.
- Không đặt tên module theo concern kỹ thuật như `api`, `modal`, `table`, `hook`, `store`.
- Nếu cùng một thuật ngữ nghiệp vụ mang nhiều nghĩa theo route hoặc user flow, phải cân nhắc tách module hoặc nâng cấp style.
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
- Có `feature_modules`, `state_ownership_rules` và `routing_rules` đủ để bước sau không bị mơ hồ về ownership.
- Có `interaction_rules` và `shared_areas` đủ để kiểm soát import boundary và tái sử dụng.
- Có `architecture_risks` cho các điểm chưa chốt hoặc còn tranh chấp.
