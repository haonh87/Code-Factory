---
language: vi
name: log-investigation
description: Thu thập bằng chứng log tái hiện được cho một lỗi production bằng cách khoanh khung thời gian lỗi và một mốc khỏe để so sánh, xếp hạng dấu hiệu lỗi theo mức thay đổi, lần theo request mẫu qua các service bằng correlation id, lọc nhiễu và rút ra điều kiện tái hiện. Dùng khi role QC phải biến triệu chứng đã triage thành bằng chứng để phân tích nguyên nhân gốc kiểm giả thuyết.
---

# Log Investigation

> English: SKILL.md

Tìm xem log nói gì về một triệu chứng, và chứng minh bằng query mà người khác chạy lại được. Output là bằng chứng, không phải chẩn đoán: cho biết điều gì thay đổi, ở đâu, với request nào, và lỗi xuất hiện trong điều kiện nào.

## Mục Tiêu

- Chỉ ra dấu hiệu lỗi nào thuộc về triệu chứng bằng cách so khung lỗi với mốc khỏe.
- Lần theo request lỗi thật qua các service và tìm điểm đầu tiên chúng đi sai.
- Tách tín hiệu khỏi nhiễu nền vốn có cả khi hệ thống khỏe.
- Đưa ra điều kiện đủ chính xác để thử tái hiện ngoài production.

## Khi Sử Dụng

- Sau khi `bug-triage` chuyển một lỗi cho QC.
- Khi `root-cause-analysis` gửi `request_info` cho một khung thời gian, service hoặc tín hiệu cụ thể.
- Khi bản sửa đã phát hành và cần xác nhận dấu hiệu lỗi đã biến mất.

## Không Thuộc Phạm Vi

- Không quyết định nguyên nhân gốc; chuyển bằng chứng cho `root-cause-analysis`.
- Không đọc sâu dashboard metric; việc đó thuộc `metric-correlation`.
- Không query thẳng kho log production. Truy cập production theo quy tắc kênh có kiểm soát của `evidence-handoff`.

## Đầu Vào Tối Thiểu

- Section triage: hệ thống, component, lần đầu thấy, định danh, phạm vi ảnh hưởng.
- Quyền tìm log ở các môi trường liên quan: named log query đã duyệt cho production, quyền query cho môi trường test.
- Application profile: tên service, tên index hoặc stream log, trường correlation id, các thông điệp nhiễu đã biết, múi giờ của timestamp log.

Nếu không có mốc thời gian lẫn định danh nào, trả `NEED_INFO` với `MISSING_IDENTIFIER` cho người báo thông qua role PM.

## Luồng Thực Hiện

1. **Gom định danh.** Từ section triage và tệp đính kèm, lấy request id, correlation id, mã khách hàng hoặc mã voucher đã hash, mã cửa hàng và thời điểm. Đổi mọi thời điểm sang UTC và ghi múi giờ gốc.
2. **Khoanh khung lỗi.** Bắt đầu trước lần lỗi đầu tiên một khoảng đệm (mặc định 30 phút) và kết thúc ở lần lỗi cuối hoặc hiện tại. Nếu chưa biết lần đầu, bắt đầu từ hai giờ trước thời điểm báo và mở rộng một lần nếu không thấy gì.
3. **Chọn mốc so sánh.** Dùng một khung cùng độ dài khi hệ thống còn khỏe: cùng giờ tuần trước, hoặc giai đoạn ngay trước khi lỗi bắt đầu. Tránh khung có sự cố hoặc deploy đã biết, trừ khi chính lần deploy đó là thứ cần so.
4. **Xếp hạng dấu hiệu.** Ở cả hai khung, gom các sự kiện error và warning theo service, mã lỗi và mẫu thông điệp (thông điệp đã thay phần biến đổi). Xếp theo mức thay đổi: dấu hiệu mới xuất hiện trong khung lỗi lên trước, rồi tới dấu hiệu có tần suất tăng nhiều nhất. Giữ số đếm của cả hai khung.
5. **Lọc nhiễu.** Đánh dấu là nhiễu mọi dấu hiệu có tần suất tương tự ở mốc khỏe, và mọi thông điệp được liệt kê là nhiễu trong profile. Giữ danh sách dấu hiệu bị loại; không âm thầm bỏ đi.
6. **Lần theo mẫu.** Chọn ba đến năm request lỗi và một hoặc hai request thành công cùng loại. Với mỗi request, lần theo correlation id qua các service theo thứ tự thời gian: service, kết quả, độ trễ, và sự kiện đầu tiên mà đường đi khác với request thành công.
7. **Định lượng.** Với mỗi dấu hiệu được giữ: số lần, tần suất mỗi phút, số định danh bị ảnh hưởng (đếm khác nhau), lần đầu và lần cuối xuất hiện.
8. **Rút điều kiện tái hiện.** Từ các request đã lần theo, nêu điểm chung của request lỗi: endpoint, dạng tham số, kích thước payload, mẫu thời gian (ví dụ hai request trong vòng một giây), cửa hàng hoặc vùng, phiên bản client. Thử tái hiện ở môi trường test khi có thể và ghi kết quả.
9. **Ghi lại điều không thấy.** Với mỗi tín hiệu mong đợi mà không tìm thấy, giữ query và khung thời gian đã trả về rỗng.
10. **Gói kết quả** bằng `evidence-handoff` (`role: qc`).

Quy tắc production: ở production, chỉ chạy named log query đã duyệt qua data broker; kết quả là mẫu thông điệp, số đếm và mẫu đã che. Khi câu hỏi cần trả lời chưa có named query, đề xuất query cho người có quyền production thay vì tự ứng biến. Query tự do chỉ dành cho môi trường test. Ví dụ cú pháp của các ngôn ngữ tìm log phổ biến nằm trong `references/query-examples.md`.

## Đầu Ra Bắt Buộc

```yaml
investigation:
  windows:
    failing: {from: "", to: ""}        # UTC
    baseline: {from: "", to: "", why: ""}
  identifiers: []                      # đã che hoặc đã hash
  signatures:
    - id: S1
      service: ""
      template: ""
      failing_count: 0
      baseline_count: 0
      change: new|increased|unchanged
      first_seen: ""
      last_seen: ""
      distinct_affected: 0
      evidence_ids: []
  noise_excluded:
    - template: ""
      reason: in_baseline|known_noise
  traces:
    - correlation_id: ""
      outcome: failed|succeeded
      hops:
        - {service: "", status: "", latency_ms: 0}
      divergence: ""                   # điểm đầu tiên khác với trace thành công
      evidence_ids: []
  repro:
    conditions: []
    steps: []
    attempted_in: test|none
    result: reproduced|not_reproduced|not_attempted
  gaps: []                             # câu hỏi log không trả lời được
```

Gói bằng phong bì `evidence-handoff` (`role: qc`).

## Yêu Cầu Bằng Chứng

- Mỗi dấu hiệu và mỗi trace dẫn một bằng chứng có `query_or_ref` là id của named query hoặc query chính xác, kèm khung thời gian.
- Số đếm có cho cả hai khung, để người đọc thấy mức thay đổi chứ không chỉ con số trong khung lỗi.
- Mẫu log đã che; trace dài đặt sau `link`.
- Mỗi mục trong `gaps` nêu query đã trả về rỗng hoặc nguồn không truy cập được.

## Quy Tắc Quyết Định

- `DONE` khi có ít nhất một dấu hiệu được giữ gắn với triệu chứng kèm so sánh với mốc khỏe, có ít nhất một trace lỗi, và đã thử tái hiện hoặc nêu lý do không thử.
- `NEED_INFO` với `MISSING_IDENTIFIER` khi không có mốc thời gian lẫn định danh; với `NEEDS_MORE_EVIDENCE` (target: người có quyền production) khi câu hỏi cần query production mà broker chưa cung cấp.
- `BLOCKED` với `SOURCE_UNAVAILABLE` khi log của khung thời gian đã quá hạn lưu trữ hoặc kho log không truy cập được; với `POLICY_DENIED` khi query bị từ chối.
- `ESCALATE` với `SECURITY_SUSPECTED` khi log cho thấy lộ thông tin xác thực hoặc truy cập dữ liệu của khách hàng khác; với `DATA_LOSS_RISK` khi log cho thấy ghi dữ liệu thất bại hoặc bản ghi bị bỏ mất.

## Quy Tắc Chất Lượng

- Không bao giờ đưa số đếm khung lỗi mà thiếu mốc so sánh.
- Một dòng log là ví dụ, không phải quy luật; hãy nêu số đếm.
- Lần theo cả request thành công lẫn request lỗi; sự khác biệt chính là bằng chứng.
- Ghi múi giờ ở mọi chỗ và lưu ý lệch đồng hồ giữa các service khi timestamp không khớp.
- Ưu tiên gom theo mẫu thông điệp thay vì thông điệp thô, để id và số tiền không tách một dấu hiệu thành hàng nghìn dấu hiệu.
- Mặc định viết tiếng Anh; lưu UTF-8.

## Dùng Trong Lane Maintenance Và s01-s08

- Agent maintenance khi chạy: agent QC ở giai đoạn điều tra; handoff chuyển cho agent TechLead, và các vòng `request_info` quay lại đây.
- Trong Code-Factory với work item loại `BUG`: bằng chứng hỗ trợ `s03` (sự kiện giúp đóng câu hỏi mở) và điều kiện tái hiện trở thành test lỗi mà `s07` viết trước theo TDD.

## Điều Kiện Hoàn Thành

- `investigation` theo `Đầu Ra Bắt Buộc` và được gói trong phong bì `evidence-handoff` hợp lệ.
- Đã xác định cả hai khung, và mỗi dấu hiệu được giữ có số đếm cho cả hai.
- Có ít nhất một trace lỗi và một trace thành công, hoặc lý do nằm trong `gaps`.
- Các dấu hiệu bị loại vì nhiễu và các query rỗng đã được ghi lại.

Xem `references/eval-seeds.md` cho các ví dụ và `references/query-examples.md` cho cú pháp query.
