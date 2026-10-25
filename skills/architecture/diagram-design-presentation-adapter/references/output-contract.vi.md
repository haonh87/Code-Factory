# Đầu ra offline và xác thực

`node scripts/export-svg.js request.json context.json` tạo nguyên bộ đầu ra.
Context thêm đường dẫn tuyệt đối png_python (venv đã cài riêng) và browser_path
(cache Playwright đã duyệt). Không cài gói hoặc tải browser trong lệnh này.
Tuple hiện tại: Playwright 1.64.0, greenlet 3.5.6, pyee 14.0.0, typing-extensions 4.16.0,
Chromium headless shell revision 1248 / version 156.0.8078.4. Tuple khác cần review.

HTML tĩnh và SVG inline dùng template đóng, escape mọi trường chính tắc, font hệ thống,
title/description có thể truy cập, nhãn NON-CANONICAL PRESENTATION, tham chiếu nguồn và
một owner. Mỗi nhóm fact có data-source-fact-id; giữ đầy đủ giá trị, endpoint có hướng,
state và gap chú thích. Hai bố cục được hỗ trợ là một hoặc hai cột, chọn bằng columns
khi gọi API. Validator dựng lại template từ facts đã xác thực, không tin manifest tự khai.
So sánh markup nguồn, không so pixel; cả hai bố cục đều hợp lệ. Không nhận HTML/SVG tùy ý.

Không script, event handler, tài nguyên từ xa, CSS import hoặc nội dung thực thi.
Browser dùng set_content với JavaScript tắt, service worker bị chặn, context offline và
route hủy mọi request. Đây không phải sandbox mạng cấp hệ điều hành. PNG RGBA trong suốt
luôn đi kèm HTML/SVG có tên/mô tả truy cập được. Giới hạn canvas 1600 x 16000; view lớn hơn
bị từ chối thay vì cắt facts. Dữ liệu chưa biết phải ghi rõ, không được suy diễn.

Dựng và kiểm tra cả bộ trong thư mục staging cùng parent; trước một lần rename atomic,
kiểm tra lại byte nguồn, provenance, đường dẫn và đầu ra. Đích phải chưa tồn tại.
Thiếu công cụ, lỗi browser/export, lệch ngữ nghĩa, nguồn đổi hoặc rename lỗi đều REJECTED,
dọn staging và không công bố một phần. Parent là workspace tin cậy có một bên ghi;
API không chống đối thủ đồng thời tráo thư mục.

Bộ đầu ra: index.html, presentation.svg, presentation.png, manifest.json. Manifest gắn
request, audience/question, hash nguồn chính tắc, fact IDs, provenance, hash đầu ra và
bằng chứng browser. Giữ nguyên byte nguồn. READER-TASK-001 là đánh giá độc lập của người
đọc; kiểm thử tự động không thay thế và không duyệt DoD/Release/Business Acceptance.
