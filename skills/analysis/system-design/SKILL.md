---
name: system-design
description: Đề xuất và so sánh các hướng thiết kế kỹ thuật cho backend, frontend application, service hoặc integration trước khi triển khai. Dùng khi đã có mục tiêu business và acceptance criteria, cần chọn technical approach, phân tích trade-off, xác định boundary chính, tác động lên component hoặc module và kế hoạch kiểm chứng trước khi code.
---

# System Design

Chọn hướng kỹ thuật phù hợp trước khi triển khai thay đổi vào hệ thống.

## Mục Tiêu

- Đưa ra nhiều phương án kỹ thuật khả thi cho cùng một bài toán.
- So sánh trade-off về độ phức tạp, rủi ro, khả năng vận hành và khả năng mở rộng.
- Chốt một hướng thiết kế khuyến nghị có lý do rõ ràng.
- Xác định tác động lên component, interface và data flow của hệ thống.
- Chỉ ra khi nào cần gọi thêm skill kiến trúc chuyên biệt như `domain-architecture`, `frontend-architecture`, `frontend-experience-design`, `database-design`, `deployment-devops`, `containerization-packaging`, `platform-runtime-deployment` hoặc `ci-cd-release`.

## Khi Sử Dụng

- Khi đã có yêu cầu rõ ràng, mục tiêu business và acceptance criteria.
- Khi cần chọn giữa nhiều hướng kỹ thuật khác nhau.
- Khi thay đổi có ảnh hưởng tới API, dữ liệu, luồng xử lý hoặc tích hợp liên hệ thống.
- Khi frontend application cần chốt hướng tổ chức module, routing, state ownership hoặc app shell ở mức technical approach.
- Khi frontend application cần chốt screen behavior, UI state, responsive rule, accessibility baseline hoặc visual direction ở mức đủ để handoff cho delivery.
- Khi thay đổi có ảnh hưởng tới packaging, runtime container, config/secrets strategy hoặc promotion giữa môi trường.

## Không Thuộc Phạm Vi

- Không trực tiếp sửa code production.
- Không thay thế bước requirement analysis hoặc product thinking.
- Không đóng vai trò kiểm thử cuối cùng sau implement.
- Không thay thế các skill kiến trúc chuyên biệt khi cần chốt boundary sâu cho backend, frontend hoặc dữ liệu.

## Đầu Vào Tối Thiểu

- `business_goal`
- `acceptance_criteria`
- `repo_context`
- `tech_constraints`
- `nfr_constraints`

Nếu thiếu acceptance criteria hoặc không biết rõ ràng buộc kỹ thuật chính, phải nêu ra trước khi chốt thiết kế.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
design_problem: ""
design_options:
  - name: ""
    summary: ""
    pros: []
    cons: []
    risks: []
recommended_design: ""
recommendation_reason: ""
component_changes: []
data_flow: []
interface_changes: []
constraints_applied: []
validation_plan: []
specialized_followups:
  - skill: ""
    reason: ""
notes_for_next_step: ""
```

## Ý Nghĩa Từng Output

- `design_problem`: bài toán kỹ thuật cần giải.
- `design_options`: các phương án khả thi.
- `recommended_design`: phương án được chọn.
- `recommendation_reason`: lý do chọn phương án đó thay vì phương án khác.
- `component_changes`: component/module sẽ bị tác động.
- `data_flow`: luồng dữ liệu chính thay đổi như thế nào.
- `interface_changes`: thay đổi API, event, schema hoặc contract tích hợp.
- `constraints_applied`: ràng buộc đã được áp vào thiết kế.
- `validation_plan`: cách kiểm chứng thiết kế trước và sau khi code.
- `specialized_followups`: skill kiến trúc hoặc thiết kế chuyên biệt cần gọi tiếp để khóa boundary ở mức sâu hơn, bao gồm cả runtime delivery khi có.
- `notes_for_next_step`: ghi chú để chia task và implement.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 5 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Artifact Chính`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Nếu có thêm artifact kiến trúc chuyên biệt, để chúng ở block `## Architecture Details` hoặc artifact phụ liên kết từ note chuẩn.

## Luồng Thực Thi

1. Tóm tắt `design_problem` từ business goal và acceptance criteria.
2. Xác định trọng tâm thay đổi là backend boundary, frontend boundary, data model, integration hay hỗn hợp.
3. Đề xuất ít nhất 2 phương án kỹ thuật nếu bài toán có nhiều cách làm hợp lý.
4. So sánh trade-off của từng phương án.
5. Chọn `recommended_design` và nêu `recommendation_reason`.
6. Liệt kê `component_changes`, `data_flow`, `interface_changes`.
7. Nếu bài toán chạm boundary sâu của backend, frontend hoặc dữ liệu, ghi `specialized_followups` tương ứng.
8. Ghi rõ `constraints_applied`, `validation_plan` và `notes_for_next_step`.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt.
- Tài liệu phải lưu UTF-8 và giữ đúng dấu tiếng Việt.
- Không chọn phương án chỉ vì quen tay; phải có trade-off rõ ràng.
- Nếu một phương án có rủi ro lớn, phải ghi rõ thay vì ẩn đi.
- `validation_plan` phải đủ để bước testing bám theo sau này.
- Nếu bài toán liên quan boundary source code hoặc ownership, phải nêu rõ boundary nào sẽ được khóa ở bước kế tiếp.

## Luật Ra Quyết Định

- Ưu tiên phương án thỏa acceptance criteria với độ phức tạp phù hợp, không over-engineer.
- Nếu có phương án nhanh hơn nhưng tăng rủi ro vận hành, phải nêu rõ.
- Nếu thay đổi liên quan interface công khai, phải đưa vào `interface_changes`.
- Nếu trọng tâm là backend domain boundary, ownership hoặc dependency rule, dùng `domain-architecture`.
- Nếu trọng tâm là frontend module, route ownership, state ownership hoặc import boundary, dùng `frontend-architecture`.
- Nếu trọng tâm là frontend screen, interaction pattern, surface state, responsive rule hoặc visual constraint trước khi code, dùng `frontend-experience-design`.
- Nếu trọng tâm là schema, table ownership, migration safety hoặc query pattern, dùng `database-design`.
- Nếu trọng tâm là DevOps tổng thể, phạm vi chạm nhiều layer packaging hoặc runtime hoặc release, dùng `deployment-devops`.
- Nếu trọng tâm là `Dockerfile`, `.dockerignore`, `compose.yaml`, image contract hoặc packaging theo ngôn ngữ hoặc workload, dùng `containerization-packaging`.
- Nếu trọng tâm là topology deploy trên `docker`, `docker swarm` hoặc `k8s`, dùng `platform-runtime-deployment`.
- Nếu trọng tâm là pipeline, registry, tagging, promotion, approval hoặc rollback control ở mức release, dùng `ci-cd-release`.

## Điều Kiện Hoàn Tất

- Có `recommended_design` và `recommendation_reason` rõ ràng.
- Có `component_changes` và `data_flow` đủ để bước sau hiểu tác động hệ thống.
- Có `specialized_followups` khi bài toán còn cần khóa boundary sâu ở backend, frontend hoặc dữ liệu.
- Có `validation_plan` đủ để chuyển sang chia task hoặc implement.
