---
language: vi
name: react-best-practices-review
description: Rà soát thay đổi React hoặc Next.js ở mức component boundary, server/client split, data fetching, effect hygiene, state placement, context scope, render stability, list rendering, hydration và bundle-cost heuristic trước khi bàn giao. Dùng khi stack là React web hoặc Next.js, khi `testing`, `code-scan-review` và `frontend-quality-review` chưa đủ để kết luận chất lượng kỹ thuật đặc thù của React.
---

# React Best Practices Review

> English: SKILL.md

Rà soát thay đổi React web hoặc Next.js ở mức pattern đặc thù của React trước khi bàn giao.

## Mục Tiêu

- Phát hiện vấn đề đặc thù React mà test hành vi, static analysis và screen-level review thường bỏ sót.
- Đánh giá server/client boundary, data fetching placement, effect hygiene, state placement, context scope và render stability.
- Chỉ ra performance risk đặc thù React như waterfall, rerender nóng, hydration cost, client bundle phình và list rendering kém.
- Kết luận mức sẵn sàng kỹ thuật của thay đổi React với finding và hướng xử lý đủ cụ thể.

## Khi Sử Dụng

- Sau khi implementation dùng React web hoặc Next.js đã xong một phạm vi đủ để review.
- Khi thay đổi chạm component tree, hook, context, Suspense boundary, server component, client component, route segment, data fetching hoặc state management phía client.
- Khi PR có dấu hiệu fetch trong client không cần thiết, effect làm việc của derived state, prop drilling nặng, context quá rộng hoặc rerender khó kiểm soát.
- Khi `frontend-quality-review` đã cover UX/surface quality nhưng chưa đủ để kết luận render/data boundary của React.

## Không Thuộc Phạm Vi

- Không thay thế `frontend-quality-review` cho accessibility, responsive layout, form feedback hoặc navigation clarity.
- Không thay thế `testing` cho behavior correctness hay acceptance criteria.
- Không thay thế `code-scan-review` cho syntax, typecheck, static analysis hoặc security scan.
- Không thay thế guidance implement ở step 7; dùng `react-web-implementation` nếu đang cần chốt cách code React hoặc Next.js trước khi verify.
- Không dùng cho React Native; skill này tập trung vào React web hoặc Next.js.
- Không tự benchmark runtime sâu hay dựng profiling lab nếu môi trường chưa cho phép.

## Đầu Vào Tối Thiểu

- `review_scope`
- `changed_files`
- `framework_context`
- `available_checks`
- `critical_user_flows`
- `constraints`

`framework_context` nên nêu ít nhất:
- React hay Next.js, phiên bản hoặc major line nếu biết
- dùng App Router hay Pages Router nếu là Next.js
- có Server Components, SSR, SSG hay CSR chủ đạo hay không
- state/query layer đang dùng như React state, Context, Zustand, Redux, TanStack Query hoặc tương đương

`available_checks` nên nêu ít nhất:
- có chạy được build, typecheck, test, eslint hay không
- có React DevTools profiler, Lighthouse hoặc browser manual check hay không
- có giới hạn nào về dữ liệu, auth hoặc môi trường render hay không

Nếu không xác định được `framework_context`, phải suy ra từ codebase hoặc nêu rõ giới hạn trước khi kết luận.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
review_target: ""
framework_context:
  stack: ""
  rendering_mode: []
  routing_mode: ""
review_gates:
  server_client_boundary: REQUIRED|OPTIONAL
  data_fetching: REQUIRED|OPTIONAL
  effect_hygiene: REQUIRED|OPTIONAL
  state_placement: REQUIRED|OPTIONAL
  context_scope: REQUIRED|OPTIONAL
  render_stability: REQUIRED|OPTIONAL
  list_rendering: REQUIRED|OPTIONAL
  hydration_bundle_cost: REQUIRED|OPTIONAL
  component_api_shape: REQUIRED|OPTIONAL
findings:
  - severity: HIGH|MEDIUM|LOW
    area: SERVER_CLIENT|DATA_FETCHING|EFFECT|STATE|CONTEXT|RENDER|LIST|HYDRATION|COMPONENT_API
    component_or_route: ""
    issue: ""
    evidence: ""
    recommendation: ""
criteria_results:
  - criterion: ""
    result: PASS|FAIL|PARTIAL
    evidence: ""
checks_run: []
checks_skipped: []
overall_status: PASS|FAIL|PARTIAL
residual_risks: []
handoff_recommendation: ""
notes_for_verify: ""
```

## Ý Nghĩa Từng Output

- `review_target`: mô tả thay đổi React đang được review.
- `framework_context`: stack và mode render chính liên quan tới review.
- `review_gates`: nhóm review React nào là bắt buộc với thay đổi hiện tại.
- `findings`: vấn đề cụ thể theo area React, component/route bị ảnh hưởng, bằng chứng và cách sửa.
- `criteria_results`: đối chiếu acceptance criteria với bằng chứng ở mức kỹ thuật React.
- `checks_run`: các check tự động hoặc thủ công đã chạy để hỗ trợ review.
- `checks_skipped`: check chưa chạy và lý do.
- `overall_status`: kết luận tổng thể của React-specific review.
- `residual_risks`: rủi ro còn lại nếu chưa xử lý hết finding.
- `handoff_recommendation`: khuyến nghị trước khi merge hoặc bàn giao.
- `notes_for_verify`: ghi chú bàn giao sang `frontend-quality-review`, `testing` hoặc `step-goal-auditor`.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 8 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Review Findings`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Nếu đã có note từ `frontend-quality-review`, liên kết chéo theo surface hoặc flow thay vì lặp lại cùng một evidence.

## Luồng Thực Thi

1. Xác định `framework_context`, `review_target` và `review_gates` bắt buộc.
2. Rà `server_client_boundary` để xem phần nào nên ở server, phần nào buộc phải ở client, và có client hóa quá mức hay không.
3. Rà `data_fetching` để tìm fetch waterfall, fetch lặp, fetch đặt sai layer hoặc fetch client-side không cần thiết.
4. Rà `effect_hygiene` để tìm effect dùng cho derived state, sync vòng lặp, dependency không ổn định hoặc side effect đặt sai nơi.
5. Rà `state_placement` và `context_scope` để tránh global hóa state không cần thiết hoặc context làm rerender quá rộng.
6. Rà `render_stability` và `list_rendering` để tìm prop churn, key không ổn định, inline object/function gây nóng path hoặc render loop tốn kém.
7. Rà `hydration_bundle_cost` để tìm client bundle quá lớn, hydration không cần thiết hoặc import nặng trên critical path.
8. Rà `component_api_shape` để tìm boolean prop explosion, coupling API khó hiểu hoặc contract component rò rỉ nội bộ.
9. Ghi `findings`, `criteria_results`, `checks_run` và `checks_skipped`.
10. Kết luận `overall_status`, `residual_risks` và `handoff_recommendation`.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt.
- Không đánh dấu `PASS` nếu thay đổi chạm React boundary quan trọng mà chưa có evidence rà đúng gate tương ứng.
- Không dùng `useEffect` như nơi mặc định để tính toán dữ liệu dẫn xuất hoặc đồng bộ state nếu có thể làm ngay trong render hoặc qua event.
- Nếu codebase đã theo React Compiler hoặc có guideline tránh `useMemo`/`useCallback` tràn lan, không biến việc thiếu hai hook này thành finding chỉ vì thói quen.
- Với Next.js, mọi client boundary phải có lý do rõ; nếu một subtree chỉ để fetch hoặc format dữ liệu, mặc định xem đó là risk.
- Context chỉ nên mang dữ liệu thật sự cần chia sẻ rộng; context khiến vùng render rộng ra phải được ghi nhận thành finding nếu có impact.
- Tài liệu phải lưu UTF-8 và giữ nguyên tiếng Việt có dấu.

## Luật Ra Quyết Định

- `HIGH` khi có fetch waterfall rõ, client/server split sai làm tăng mạnh bundle hoặc hydration, effect gây loop/sync lỗi, state placement làm hỏng correctness hoặc render path nóng ảnh hưởng flow chính.
- `MEDIUM` khi pattern chưa làm hỏng flow chính nhưng tạo nợ kỹ thuật đáng kể, tăng rerender, mở rộng context quá mức hoặc làm component API khó bảo trì.
- `LOW` khi vấn đề chủ yếu là cleanup, naming, API shape hoặc tối ưu nhẹ chưa ảnh hưởng đáng kể.
- `PASS` khi các gate bắt buộc đều đạt và không còn finding `HIGH`.
- `PARTIAL` khi functionality đạt nhưng còn finding `MEDIUM` hoặc còn check React quan trọng chưa chạy.
- `FAIL` khi còn finding `HIGH` hoặc thiếu evidence cho boundary React cốt lõi của thay đổi.
- Nếu issue ở mức UX/surface, dùng thêm `frontend-quality-review`; nếu issue ở mức type/static/security, dùng thêm `code-scan-review`; nếu issue lộ ra vì implement pattern chưa rõ, cập nhật lại `react-web-implementation`.

## Điều Kiện Hoàn Tất

- Có `framework_context`, `review_gates` và `findings` đủ rõ cho phạm vi review.
- Có `criteria_results`, `checks_run` và `checks_skipped` với evidence cụ thể.
- Có `overall_status` và `handoff_recommendation` đủ để quyết định merge hoặc bàn giao.
- Có `residual_risks` cho mọi điểm chưa đóng hoàn toàn.
