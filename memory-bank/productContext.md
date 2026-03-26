# Product Context

## Vì Sao Project Này Tồn Tại

Project này tồn tại để xây dựng một bộ `AI KIT` có thể ứng dụng thực tế vào quy trình phát triển sản phẩm số, thay vì dùng AI theo kiểu rời rạc, khó lặp lại và khó kiểm soát.

Trong tầm nhìn này, coding chỉ là một phần của bài toán lớn hơn. Bộ AI KIT cần giúp đội ngũ đưa AI vào nhiều lớp công việc như discovery, design, implementation, verify, tài liệu hóa, truy xuất ngữ cảnh, điều phối agent và tăng tốc tạo lập artifact.

Nếu chỉ dựa vào prompt rời rạc:

- Mỗi session agent có thể hiểu quy trình khác nhau.
- Chất lượng discovery, thiết kế và verify dễ lệch pha.
- Traceability giữa business, design, implementation và verify dễ bị mất.
- Việc cài cùng một workflow trên nhiều máy hoặc nhiều project trở nên thủ công.
- Khó kết nối AI với ngữ cảnh hệ thống và tool theo cách chuẩn hóa.
- Khó phối hợp nhiều agent với vai trò khác nhau trong cùng một delivery flow.

Project biến các nguyên tắc đó thành một gói có thể cài đặt, đọc lại và mở rộng.

## Vấn Đề Mà Project Giải Quyết

- Chuẩn hóa cách agent nhận yêu cầu coding và tránh lao vào code khi chưa rõ scope.
- Tạo một quy trình bắt buộc có gate Definition of Ready và Definition of Done.
- Giảm chênh lệch chất lượng giữa các session Codex.
- Bảo toàn tài liệu và artifact kỹ thuật theo dạng truy vết được.
- Giảm chi phí bootstrap khi muốn áp cùng workflow cho nhiều project.
- Tạo nền tảng để đóng gói các capability AI theo module như workflow, skill, MCP, agentic và multi-agent.
- Hướng tới một code factory có thể tái sử dụng để tăng tốc delivery cho sản phẩm số.

## Project Nên Hoạt Động Như Thế Nào

Luồng kỳ vọng hiện tại trên Codex:

1. Người dùng clone repo này.
2. Chạy installer phù hợp với hệ điều hành.
3. Policy và skill được đồng bộ vào môi trường Codex.
4. Khi Codex làm việc trong project nằm dưới vùng có `AGENTS.md`, workflow chuẩn được áp vào.
5. Mỗi yêu cầu coding được xử lý qua chain 8 bước, có quality gate và có quy ước artifact rõ ràng.

Roadmap triển khai mong muốn là: áp dụng ổn định trên Codex trước, sau đó trừu tượng hóa và mở rộng sang Claude, rồi mới tiếp tục cho các agent/tool khác. Ở mức tầm nhìn đầy đủ hơn, AI KIT nên hoạt động như một platform kit:

1. Cung cấp workflow và skill tái sử dụng được cho từng loại công việc trong delivery lifecycle.
2. Cung cấp lớp MCP để model lấy ngữ cảnh và dùng tool/hệ thống ngoài theo chuẩn.
3. Cung cấp các pattern agentic để agent xử lý task có cấu trúc và có handoff rõ.
4. Cung cấp khả năng multi-agent khi bài toán cần tách vai trò hoặc chạy song song.
5. Cung cấp code factory để chuẩn hóa đầu ra như code, tài liệu, template, checklist hoặc artifact.

## Người Dùng Chính

- Developer hoặc operator dùng Codex để làm tác vụ coding.
- Người duy trì workflow nội bộ muốn chuẩn hóa cách agent làm việc giữa nhiều project.
- Team cần lưu lại cách làm nhất quán thay vì phụ thuộc vào trí nhớ từng session agent.
- Team phát triển sản phẩm số muốn đóng gói AI thành capability vận hành được, không chỉ dừng ở thử nghiệm prompt.

## Giá Trị Người Dùng

Người dùng nhận được:

- Một cách làm nhất quán khi giao việc coding cho Codex ở giai đoạn đầu, đồng thời tạo nền để mở rộng sang Claude ở giai đoạn sau.
- Một bộ skill chuyên biệt để tách requirement, business goal, design, task breakdown, implement và verify.
- Một mô hình cài đặt đơn giản để bật workflow trên máy mới.
- Một nguồn sự thật bằng tài liệu để agent có thể phục hồi ngữ cảnh sau khi mất memory.
- Một nền tảng có thể phát triển tiếp thành AI KIT hoàn chỉnh cho nhiều lớp công việc trong phát triển sản phẩm số.

## Trải Nghiệm Kỳ Vọng

Trải nghiệm tốt của project này nên có các đặc điểm sau:

- Đọc vào là hiểu repo này làm gì mà không cần đoán.
- Cài vào là dùng được, không phải ghép prompt thủ công.
- Workflow đủ chặt để nâng chất lượng, nhưng đủ rõ để người dùng theo được.
- Tài liệu tiếng Việt hiển thị đúng và không bị hỏng encoding.
- Khi cần mở rộng sang agent/tool khác, cấu trúc hiện tại không cản trở.
- Người dùng nhìn thấy rõ roadmap từ workflow/skills hiện tại sang MCP, agentic, multi-agent và code factory.
