---
name: react-web-implementation
description: Triển khai frontend React web hoặc Next.js theo pattern an toàn về component boundary, server/client split, data fetching, state placement, effect usage, loading path, list rendering và bundle-sensitive composition. Dùng khi bước implement chạm React web hoặc Next.js và cần framework-specific guidance mà skill `implementation` chung chưa đủ chi tiết.
---

# React Web Implementation

Triển khai thay đổi React web hoặc Next.js theo pattern ổn định, dễ review và bám sát boundary đã chốt.

## Mục Tiêu

- Chuyển thiết kế frontend thành code React web hoặc Next.js với boundary rõ ràng và ít nợ kỹ thuật tránh được.
- Chốt cách đặt component, data fetching, state, context và effect trước khi sửa sâu vào cây UI.
- Giảm rủi ro phát sinh bundle phình, hydration thừa, rerender nóng hoặc client hóa quá mức ngay trong lúc code.
- Tạo handoff rõ cho `testing`, `frontend-quality-review` và `react-best-practices-review`.

## Khi Sử Dụng

- Khi bước implement chạm component React web hoặc Next.js sau khi design và task breakdown đã đủ rõ.
- Khi thay đổi liên quan App Router, Server Components, Client Components, route segment, Suspense/loading path hoặc fetch boundary.
- Khi cần quyết định state nên ở local, module, context hay query layer trong lúc code.
- Khi refactor component tree, form flow, list, table, dashboard hoặc screen data-heavy có nguy cơ render nóng.
- Khi skill `implementation` chung chưa đủ để khóa pattern React-specific một cách nhất quán.

## Không Thuộc Phạm Vi

- Không thay thế `frontend-architecture` cho module ownership, route ownership hoặc import boundary ở mức kiến trúc.
- Không thay thế `frontend-experience-design` cho layout, screen behavior, responsive rule hoặc visual direction.
- Không thay thế `testing`, `frontend-quality-review` hoặc `react-best-practices-review` ở bước verify.
- Không dùng cho React Native; skill này chỉ dành cho React web hoặc Next.js.
- Không tự đổi technical approach lớn nếu design step chưa chốt.

## Đầu Vào Tối Thiểu

- `recommended_design`
- `task_breakdown`
- `framework_context`
- `files_in_scope`
- `constraints`
- `existing_frontend_context`

`framework_context` nên nêu ít nhất:
- React hay Next.js
- App Router hay Pages Router nếu là Next.js
- rendering mode chính như Server Components, SSR, SSG hay CSR
- state/query layer đang dùng nếu có

Nếu chưa xác định `files_in_scope` hoặc chưa rõ boundary server/client hiện tại, phải làm rõ trước khi sửa hàng loạt.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
implementation_target: ""
framework_context:
  stack: ""
  routing_mode: ""
  rendering_mode: []
component_boundary_notes: []
server_client_split_plan: []
data_fetching_plan: []
state_and_context_plan: []
effect_usage_rules: []
rendering_and_loading_plan: []
performance_guards_applied: []
files_or_modules_touched: []
notes_for_review: ""
```

## Ý Nghĩa Từng Output

- `implementation_target`: mô tả phần React đang được triển khai.
- `framework_context`: stack và mode render liên quan tới phần code đang sửa.
- `component_boundary_notes`: ghi chú boundary giữa component, route segment hoặc subtree quan trọng.
- `server_client_split_plan`: kế hoạch giữ phần nào ở server, phần nào ở client.
- `data_fetching_plan`: nơi đặt fetch/query/mutation và lý do.
- `state_and_context_plan`: cách đặt local state, lifted state, context hoặc query cache.
- `effect_usage_rules`: rule áp dụng cho effect, subscription hoặc side effect thật sự cần thiết.
- `rendering_and_loading_plan`: cách xử lý loading path, suspense boundary, empty/error branch hoặc progressive rendering.
- `performance_guards_applied`: guard áp dụng để tránh rerender nóng, hydration thừa hoặc bundle phình.
- `files_or_modules_touched`: file hoặc module dự kiến đụng tới.
- `notes_for_review`: ghi chú bàn giao sang `react-best-practices-review`, `frontend-quality-review` hoặc `testing`.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 7 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Implementation Notes`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Không thay thế block `## Artifact Chính`; block đó vẫn dùng schema `implementation`.

## Luồng Thực Thi

1. Đọc `recommended_design`, `task_breakdown` và `framework_context`.
2. Xác định boundary component hoặc route segment thực sự cần sửa trước.
3. Chốt `server_client_split_plan` trước khi đẩy logic sang client theo quán tính.
4. Chốt `data_fetching_plan`, `state_and_context_plan` và `effect_usage_rules` trước khi code sâu.
5. Viết hoặc refactor code theo boundary đã chốt, giữ thay đổi tập trung trong `files_or_modules_touched`.
6. Ghi `rendering_and_loading_plan` cho loading, error, empty hoặc suspense path có liên quan.
7. Áp dụng `performance_guards_applied` ở những path có list lớn, chart, media hoặc hydration-sensitive UI.
8. Chuẩn bị `notes_for_review` để bàn giao sang `react-best-practices-review`, `frontend-quality-review` hoặc `testing`.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt; code theo convention của project.
- Không chuyển subtree sang client chỉ vì tiện dùng hook nếu vẫn giải được ở server hoặc qua props/data contract.
- Không dùng `useEffect` để tính derived state hoặc đồng bộ dữ liệu có thể giải quyết bằng render, event hoặc fetch layer phù hợp.
- Context chỉ dùng cho dữ liệu cần chia sẻ thật sự rộng; tránh biến context thành global dumping ground.
- Với list hoặc table lớn, xử lý key, render branch và data mapping ổn định ngay từ đầu.
- Nếu codebase đã theo React Compiler hoặc không khuyến khích `useMemo`/`useCallback` mặc định, bám convention đó.
- Tài liệu phải lưu UTF-8 và giữ nguyên tiếng Việt có dấu.

## Luật Ra Quyết Định

- Nếu một concern chỉ phục vụ đúng một surface hoặc component group, ưu tiên local state trước khi nâng lên context/global store.
- Nếu dữ liệu chỉ cần để render initial UI và không đòi hỏi client interactivity sớm, ưu tiên server boundary.
- Nếu fetch được lặp lại theo component tree hoặc gây waterfall rõ, kéo nó lên boundary phù hợp hơn.
- Nếu component API bắt đầu phình bởi nhiều boolean prop hoặc branching khó hiểu, tách component hoặc chuyển sang composition pattern rõ hơn.
- Nếu loading path, error path hoặc suspense path chưa rõ, chốt chúng trước khi mở rộng logic feature.
- Nếu pattern React đang implement đi lệch design hoặc boundary đã chốt, dừng và phản hồi thay vì vá tạm.

## Điều Kiện Hoàn Tất

- Có `server_client_split_plan`, `data_fetching_plan` và `state_and_context_plan` đủ rõ cho phần đã sửa.
- Có `performance_guards_applied` cho những path nhạy cảm.
- Có `files_or_modules_touched` và `notes_for_review` đủ để bước verify tiếp nhận.
- Không còn decision React quan trọng bị để ngầm trong code mà chưa ghi rõ rationale.
