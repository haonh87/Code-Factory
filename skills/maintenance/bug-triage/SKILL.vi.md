---
language: vi
name: bug-triage
description: Biến một báo lỗi thô thành case bảo trì đã được phân loại bằng cách chuẩn hóa báo lỗi, phân loại, chấm điểm khả năng trùng, suy ra severity từ mức ảnh hưởng và độ khẩn, đặt priority và SLA theo application profile, rồi chuyển cho role kế tiếp hoặc cho người. Dùng khi có ticket Bug hoặc cảnh báo mới và role PM phải quyết định case có vào luồng bảo trì không và vào như thế nào.
---

# Bug Triage

> English: SKILL.md

Xác định báo lỗi mới là gì, nghiêm trọng đến đâu, đã có người báo chưa, và ai cần làm tiếp. Kết quả là đề xuất cho người duyệt cổng tiếp nhận; triage không bao giờ tự đóng, gộp hay từ chối ticket.

## Mục Tiêu

- Đưa mọi báo lỗi về cùng một dạng có cấu trúc để các role sau không phải đọc lại văn bản tự do.
- Tách lỗi thật khỏi yêu cầu tính năng, câu hỏi hỗ trợ và yêu cầu cấp quyền.
- Tìm ticket có khả năng trùng bằng điểm số nhìn thấy được, không theo cảm giác.
- Suy ra severity từ mức ảnh hưởng và độ khẩn, có nêu cơ sở, không phụ thuộc giọng điệu của người báo.
- Chuyển case cho đúng role kế tiếp, hoặc dừng lại và hỏi chính xác thông tin còn thiếu.

## Khi Sử Dụng

- Có ticket loại Bug mới, hoặc ticket cũ được mở lại.
- Một cảnh báo được chuyển thành case và cần severity cùng hướng xử lý.
- Người yêu cầu agent triage lại sau khi có thông tin mới.

## Không Thuộc Phạm Vi

- Không điều tra log hay metric, ngoài một phép đếm nhanh để xác định phạm vi ảnh hưởng; việc đó thuộc `log-investigation` và `metric-correlation`.
- Không giải thích nguyên nhân; việc đó thuộc `root-cause-analysis`.
- Không đóng, gộp hay đổi trường priority của ticket; skill chỉ đề xuất, người áp dụng quyết định tại cổng tiếp nhận.

## Đầu Vào Tối Thiểu

- Ticket: tiêu đề, mô tả, người báo, thời điểm tạo, tệp đính kèm và comment.
- Application profile: các component, chủ sở hữu, tier mức quan trọng, ma trận severity và SLA, đầu mối escalate.
- Quyền tìm kiếm ticket đang mở và ticket mới đóng của cùng hệ thống.

Nếu thiếu application profile, trả `BLOCKED` với `MISSING_CONTEXT`; không thể đặt severity và hướng xử lý khi thiếu nó.

## Luồng Thực Hiện

1. **Chuẩn hóa báo lỗi.** Điền một bộ trường cố định: hệ thống, component hoặc màn hình, thao tác của người dùng, kết quả mong đợi, kết quả thực tế, lần đầu thấy, tần suất, ai bị ảnh hưởng (một người, một cửa hàng, một vùng, tất cả), môi trường, định danh (mã đơn, request id, mã voucher đã hash, mã cửa hàng) và tệp đính kèm. Trích lời người báo cho mọi điều được suy ra. Trường nào trống thì ghi `unknown`.
2. **Phân loại.** Chọn một: `defect` (hệ thống không làm đúng như đặc tả hoặc như trước đây), `feature_request` (hệ thống chưa bao giờ làm việc này), `support_question` (người dùng cần hướng dẫn), `access_request` (quyền hoặc tài khoản). Chỉ `defect` đi tiếp trong luồng này; các loại còn lại nhận gợi ý chuyển hướng rồi dừng.
3. **Chấm điểm trùng.** Tìm ticket đang mở và ticket đã đóng trong 30 ngày gần nhất của cùng hệ thống. Với mỗi ứng viên, chấm bốn tín hiệu từ 0 đến 1: cùng dấu hiệu lỗi (mã lỗi, loại exception, mẫu thông điệp); cùng component; khung thời gian trùng nhau; mô tả thao tác và kết quả giống nhau. Gộp điểm (trọng số bằng nhau trừ khi profile quy định khác). Từ 0.75 trở lên, đề xuất `likely_duplicate`; từ 0.5 đến 0.75, đề xuất `related`. Hiện ba ứng viên cao nhất kèm điểm từng tín hiệu.
4. **Đánh giá ảnh hưởng.** Ghi phạm vi người dùng bị ảnh hưởng, chức năng nghiệp vụ (dòng tiền, bán hàng, tra cứu của khách hàng, báo cáo nội bộ), dữ liệu có thể sai hoặc mất không, và có cách làm tạm không. Khi một phép đếm nhanh giúp chốt phạm vi, yêu cầu qua kênh có kiểm soát mà `evidence-handoff` quy định.
5. **Đánh giá độ khẩn.** Lỗi đang diễn ra, đang tăng, hay gắn với một sự kiện kinh doanh sắp tới (ra mắt chiến dịch, chốt sổ cuối tháng)?
6. **Đặt severity** theo ma trận bên dưới và viết một dòng cơ sở.
7. **Đặt priority và SLA** theo ma trận trong application profile. Nếu profile chưa có ma trận, dùng giá trị ví dụ bên dưới và nói rõ điều đó.
8. **Chuyển hướng.** Chọn team sở hữu component theo profile. Role kế tiếp: `ba` khi hành vi mong đợi chưa rõ hoặc đang bị tranh cãi, ngược lại là `qc` để thu thập bằng chứng.
9. **Kiểm tra escalate** theo Quy Tắc Quyết Định.
10. **Gói kết quả** bằng `evidence-handoff` (`role: pm`).

Ma trận severity (ảnh hưởng theo hàng, độ khẩn theo cột):

| Ảnh hưởng \ Độ khẩn | Đang diễn ra hoặc tăng | Ổn định, có hạn | Không gắn thời hạn |
|---|---|---|---|
| Tiền, toàn vẹn dữ liệu, hoặc đa số người dùng bị chặn | Sev1 | Sev1 | Sev2 |
| Một chức năng hoặc một nhóm người dùng bị chặn, không có cách tạm | Sev2 | Sev2 | Sev3 |
| Suy giảm, có cách làm tạm | Sev3 | Sev3 | Sev4 |
| Giao diện hoặc một người dùng, không ảnh hưởng kinh doanh | Sev4 | Sev4 | Sev4 |

Giá trị SLA ví dụ (thay bằng giá trị của profile): Sev1 phản hồi 15 phút, Sev2 2 giờ, Sev3 1 ngày làm việc, Sev4 bản phát hành theo kế hoạch kế tiếp.

## Đầu Ra Bắt Buộc

```yaml
triage:
  normalized:
    system: ""
    component: ""
    action: ""
    expected: ""
    actual: ""
    first_seen: ""            # ISO-8601 hoặc unknown
    frequency: ""             # once|intermittent|always|unknown
    affected_scope: ""        # single_user|store|region|all|unknown
    environment: ""
    identifiers: []           # đã che hoặc đã hash
  classification: defect|feature_request|support_question|access_request
  duplicates:
    - ticket: ""
      score: 0.0
      signals: {signature: 0.0, component: 0.0, time: 0.0, description: 0.0}
      proposal: likely_duplicate|related
  impact: {business_function: "", data_risk: false, workaround: ""}
  urgency: ongoing|growing|time_bound|not_time_bound
  severity: Sev1|Sev2|Sev3|Sev4
  severity_basis: ""
  priority: ""
  sla: ""
  route: {team: "", next_role: ba|qc|none, human_owner: ""}
  missing_info: []            # câu hỏi cụ thể cho người báo
```

Gói bằng phong bì `evidence-handoff` (`role: pm`).

## Yêu Cầu Bằng Chứng

- Đề xuất trùng phải dẫn mã ticket ứng viên và tín hiệu khớp cho mỗi điểm lớn hơn 0.
- `severity_basis` trỏ tới bằng chứng: lời người báo (`source: human`), một phép đếm từ kênh có kiểm soát, hoặc một cảnh báo.
- Thông tin chép từ ticket giữ nguyên lời người báo trong excerpt, đã che.

## Quy Tắc Quyết Định

- `DONE` khi báo lỗi đã được phân loại, severity và hướng xử lý đã đặt kèm cơ sở, và không còn trường chặn nào là unknown.
- `NEED_INFO` (`MISSING_IDENTIFIER`, `MISSING_REPRO` hoặc `AMBIGUOUS_REPORT`) khi chưa biết hệ thống, thao tác hoặc kết quả thực tế, hoặc không có gì xác định người dùng, cửa hàng hay giao dịch bị ảnh hưởng. Gửi một tin duy nhất liệt kê mọi thông tin còn thiếu.
- `ESCALATE` với `SEV1` khi là Sev1; với `RESTRICTED_SYSTEM` khi tier của hệ thống giới hạn mức tự động (ví dụ hệ thống thanh toán) và lỗi chạm tới tiền; với `SECURITY_SUSPECTED` khi báo lỗi cho thấy có thể xem được dữ liệu của người dùng khác; với `DATA_LOSS_RISK` khi bản ghi có thể bị mất hoặc hỏng.
- `BLOCKED` với `MISSING_CONTEXT` khi thiếu application profile, hoặc `SOURCE_UNAVAILABLE` khi không tìm kiếm được ticket.

## Quy Tắc Chất Lượng

- Severity theo ảnh hưởng và độ khẩn, không theo chữ in hoa, dấu chấm than hay tiêu đề của người báo.
- Không hạ severity vì đoán là có cách làm tạm; chỉ ghi cách làm tạm khi đã có người xác nhận.
- Hỏi thông tin còn thiếu một lần, thành danh sách đầy đủ, bằng ngôn ngữ người báo trả lời được.
- Trùng chỉ là đề xuất; người ở cổng tiếp nhận mới liên kết hoặc đóng ticket.
- Triage nêu triệu chứng, không nêu nguyên nhân. "Thanh toán lỗi sau bản cập nhật" vẫn là triệu chứng cho tới khi được phân tích.
- Mặc định viết tiếng Anh; lưu UTF-8.

## Dùng Trong Lane Maintenance Và s01-s08

- Agent maintenance khi chạy: agent PM ở bước tiếp nhận; section triage và handoff được đăng lên cho người duyệt cổng tiếp nhận (nhận, trùng, không phải lỗi, hoặc cần thêm thông tin).
- Trong Code-Factory với work item loại `BUG`: các trường đã chuẩn hóa là đầu vào cho `s01` (restate yêu cầu) và `missing_info` là đầu vào cho `s03` (câu hỏi mở). Severity gợi ý `planning_track` nhưng không thay quyết định lane của router.

## Điều Kiện Hoàn Thành

- `triage` theo `Đầu Ra Bắt Buộc` và được gói trong phong bì `evidence-handoff` hợp lệ.
- Đã phân loại; với lỗi thật, severity, priority, SLA và hướng xử lý đã đặt kèm cơ sở.
- Đã tìm ứng viên trùng và việc tìm được ghi lại, kể cả khi không thấy ứng viên nào.
- Mọi quy tắc escalate đã được kiểm tra và kết quả thể hiện ở status.

Xem `references/eval-seeds.md` cho các ví dụ.
