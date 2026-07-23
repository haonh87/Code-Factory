---
name: requirement-analysis
language: vi
description: Phân tích và chuẩn hóa yêu cầu cho tác vụ phát triển phần mềm trước khi thiết kế hoặc triển khai. Dùng khi nhận feature request, bug report, change request, task mới hoặc yêu cầu còn mơ hồ; tạo restated request, phạm vi, câu hỏi mở, giả định và acceptance criteria draft để chuyển sang product thinking, system design hoặc implementation planning.
---

# Requirement Analysis

> English: SKILL.md

Phân tích yêu cầu để biến đầu bài thô thành đầu bài có thể hiểu, có phạm vi rõ ràng và có thể kiểm chứng.

## Mục Tiêu

- Diễn giải lại yêu cầu theo cách ngắn gọn, đúng ý và tránh hiểu sai.
- Chốt phạm vi làm và không làm ở mức đủ để chuyển sang bước tiếp theo.
- Tách rõ phần còn mơ hồ, thông tin còn thiếu và giả định đang dùng.
- Tạo bản nháp acceptance criteria để các bước sau có cơ sở kiểm chứng.

## Khi Sử Dụng

- Khi vừa nhận yêu cầu mới từ người dùng, stakeholder, ticket hoặc tài liệu.
- Khi yêu cầu hiện tại còn mơ hồ, thiếu phạm vi, thiếu tiêu chí hoàn thành.
- Khi cần phân biệt rõ bug, feature mới, refactor hay thay đổi hành vi.
- Khi cần chuyển từ ngôn ngữ business sang ngôn ngữ đủ rõ cho technical workflow.

## Không Thuộc Phạm Vi

- Không chọn kiến trúc hoặc technical approach chi tiết.
- Không estimate effort chi tiết hoặc chia task thực thi.
- Không trực tiếp sửa code, trừ khi người dùng chỉ yêu cầu tóm tắt/phân tích trong bối cảnh thay đổi đã rõ.
- Không tự ý suy diễn để lấp khoảng trống cho thông tin quan trọng.

## Đầu Vào Tối Thiểu

- `raw_request`: yêu cầu gốc từ người dùng hoặc ticket.
- `context_sources`: các nguồn context đang có như chat, issue, tài liệu, hình ảnh, code liên quan.
- `known_constraints`: ràng buộc đã biết về business, kỹ thuật, bảo mật, deadline hoặc phạm vi.

Nếu thiếu `raw_request` hoặc không xác định được vấn đề chính cần giải quyết, dừng và yêu cầu làm rõ.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
raw_request: ""
restated_request: ""
request_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
business_context: ""
scope_in: []
scope_out: []
open_questions: []
assumptions: []
dependencies: []
risks_initial: []
acceptance_criteria_draft:
  - id: AC1
    description: ""
    measurable: true
notes_for_next_step: ""
```

## Ý Nghĩa Từng Output

- `restated_request`: diễn giải lại yêu cầu theo cách rõ, ngắn và kiểm tra được.
- `request_type`: phân loại yêu cầu để chọn workflow tiếp theo phù hợp.
- `business_context`: lý do tồn tại của yêu cầu ở mức business hoặc user problem.
- `scope_in`: phần phải xử lý trong phạm vi hiện tại.
- `scope_out`: phần không thuộc phạm vi để tránh trượt scope.
- `open_questions`: các điểm mơ hồ chưa thể quyết định.
- `assumptions`: các giả định tạm dùng, phải nói rõ để không ngầm hiểu.
- `dependencies`: hệ thống, team, API, dữ liệu hoặc quyết định bên ngoài ảnh hưởng tới yêu cầu.
- `risks_initial`: rủi ro nhìn thấy sớm từ góc độ requirement.
- `acceptance_criteria_draft`: bản nháp tiêu chí chấp nhận, sẽ hoàn thiện ở step chuyên trách.
- `notes_for_next_step`: ghi chú để bàn giao sang `product-thinking`, `system-design` hoặc `task planning`.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Khi skill này là artifact requirement-analysis đầy đủ, ưu tiên đặt schema YAML trong block `## Requirement Analysis Spec`; nếu template step không có block riêng thì đặt trong `## Artifact Chính`.
- Trong workflow mặc định, cách dùng này phù hợp nhất với step 1 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Nếu step khác chỉ cần schema rút gọn ở mức workflow, ưu tiên theo template step tương ứng; không đổi nghĩa field gốc khi cần artifact requirement-analysis đầy đủ.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.

## Spec Phát Sinh Và Contract

- Spec chuẩn do skill này sinh ra là `requirement-analysis-spec`.
- Nếu input trọng tâm là ticket, issue, BRD, chat log hoặc tài liệu hiện có, skill này vẫn sinh cùng một `requirement-analysis-spec`; không tạo format riêng cho từng loại tài liệu.
- Nếu lưu artifact đầy đủ trong workflow note, đặt spec này trong block `## Requirement Analysis Spec` hoặc `## Artifact Chính` tùy template step đang dùng.
- Contract tối thiểu của `requirement-analysis-spec` là:
  - có `restated_request`
  - có `request_type`
  - có `scope_in` và `scope_out`
  - có `open_questions` hoặc nêu rõ không còn câu hỏi mở
  - có `assumptions`
  - có `acceptance_criteria_draft` ở mức sơ bộ
- Khi workflow step chỉ cần schema rút gọn để chuyển bước, note step vẫn có thể dùng artifact workflow-level; nhưng nếu cần truy vết phân tích tài liệu đầy đủ thì phải sinh `requirement-analysis-spec` theo đúng schema của skill này.

## Luồng Thực Thi

1. Đọc kỹ yêu cầu gốc và xác định vấn đề cốt lõi.
2. Restate yêu cầu bằng ngôn ngữ rõ ràng, bỏ mơ hồ và từ chung chung.
3. Phân loại yêu cầu là feature, bug, change, refactor hay research.
4. Tách phạm vi `scope_in` và `scope_out`.
5. Liệt kê phần còn thiếu thông tin vào `open_questions`.
6. Nêu rõ các `assumptions` đang tạm dùng.
7. Viết `acceptance_criteria_draft` ở mức có thể kiểm chứng sơ bộ.
8. Ghi lại phụ thuộc, rủi ro ban đầu và ghi chú bàn giao.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt.
- Nội dung tài liệu phải lưu UTF-8 và không được làm hỏng dấu tiếng Việt.
- Không dùng từ mơ hồ như “tối ưu”, “đầy đủ”, “ổn định” nếu không có nghĩa đo được.
- Mỗi mục trong `scope_out` phải đủ rõ để chặn hiểu nhầm.
- Mỗi `acceptance_criteria_draft` phải có khả năng được verify sau này.
- Nếu yêu cầu có nhiều cách hiểu, phải nêu ra thay vì chọn ngầm một cách hiểu.

## Luật Ra Quyết Định

- Nếu yêu cầu còn thiếu dữ liệu quan trọng, ưu tiên ghi `open_questions` thay vì tự chốt.
- Nếu yêu cầu chứa nhiều mục tiêu trộn lẫn, tách chúng thành nhiều scope hoặc nhiều task.
- Nếu phát hiện yêu cầu thực chất là bug nhưng đang mô tả như feature, phải ghi rõ.
- Nếu có xung đột giữa yêu cầu mới và hành vi hiện tại của hệ thống, ghi vào `risks_initial`.

## Điều Kiện Hoàn Tất

- Có `restated_request` rõ ràng và không mâu thuẫn với yêu cầu gốc.
- Có `scope_in` và `scope_out` đủ để bước sau không bị trượt phạm vi.
- Các điểm mơ hồ quan trọng đã được đưa vào `open_questions`.
- Có `acceptance_criteria_draft` ở mức đủ để chuyển sang bước refinement tiếp theo.

## Bàn Giao Cho Step Tiếp Theo

- Nếu cần chốt giá trị user/business: chuyển sang `product-thinking`.
- Nếu cần đề xuất hướng kỹ thuật: chuyển sang `system-design`.
- Nếu yêu cầu đã đủ rõ để lập kế hoạch: chuyển sang bước viết acceptance criteria chính thức hoặc chia task.

## Ví Dụ Ngắn

Xem `references/example.vi.md` để có ví dụ minh hoạ đầy đủ (từ yêu cầu đăng nhập tới artifact mong đợi). Đọc khi dùng skill này lần đầu hoặc khi chưa rõ ý nghĩa schema; bỏ qua khi đã quen schema.
