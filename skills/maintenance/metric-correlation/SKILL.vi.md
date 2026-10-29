---
language: vi
name: metric-correlation
description: Đọc metric của service và tài nguyên quanh một lỗi production bằng cách so khung lỗi với mốc khỏe qua góc nhìn mức request và mức tài nguyên, xác định tín hiệu nào lệch trước, đối chiếu thay đổi với deploy, config, lưu lượng và sự cố phụ thuộc, và báo mức đốt mục tiêu dịch vụ, đồng thời nêu độ mạnh của tương quan mà không khẳng định nhân quả. Dùng khi role QC hoặc DevOps phải bổ sung bằng chứng metric cho case hoặc kiểm tra sức khỏe sau phát hành.
---

# Metric Correlation

> English: SKILL.md

Mô tả các con số của hệ thống đã thay đổi thế nào quanh một lỗi, theo thứ tự nào, và còn điều gì xảy ra cùng lúc. Metric cho biết khi nào và ở đâu, hiếm khi cho biết vì sao; vì vậy skill này báo tương quan kèm độ mạnh và phản ví dụ, còn nhân quả để `root-cause-analysis` quyết định.

## Mục Tiêu

- Định lượng thay đổi của tín hiệu mức request và mức tài nguyên giữa khung lỗi và mốc khỏe.
- Xác định thứ tự các tín hiệu bị lệch, vì tín hiệu lệch đầu tiên là manh mối tốt nhất.
- Đối chiếu thay đổi metric với deploy, thay đổi config, biến động lưu lượng và sự cố phụ thuộc.
- Báo mức đốt mục tiêu dịch vụ để độ khẩn của case dựa trên số liệu.
- Diễn đạt mọi mối liên hệ theo độ mạnh, không bao giờ như nguyên nhân.

## Khi Sử Dụng

- Sau `bug-triage`, song song với `log-investigation`, khi triệu chứng liên quan tới độ trễ, lỗi, bão hòa hoặc khả dụng.
- Khi `root-cause-analysis` hỏi tín hiệu nào lệch trước hoặc một lần deploy có trùng với thay đổi không.
- Sau phát hành, để xác nhận sức khỏe đã về mốc trong giai đoạn theo dõi.

## Không Thuộc Phạm Vi

- Không quyết định nguyên nhân gốc.
- Không đổi alert rule, dashboard hay capacity; có thể đề xuất các thay đổi đó trong open issues.
- Không query kho metric production ngoài quy tắc kênh có kiểm soát của `evidence-handoff`.

## Đầu Vào Tối Thiểu

- Section triage: hệ thống, component, lần đầu thấy, phạm vi ảnh hưởng.
- Quyền query metric: named query đã duyệt cho production, quyền query cho môi trường test.
- Application profile: tên service và tài nguyên, tên metric và label, mục tiêu dịch vụ, nguồn ghi deploy và thay đổi config, các phụ thuộc đã biết.

Nếu chưa biết thời điểm xảy ra triệu chứng, trả `NEED_INFO` với `MISSING_IDENTIFIER`.

## Luồng Thực Hiện

1. **Đặt khung thời gian.** Dùng cùng khung lỗi và mốc khỏe với `log-investigation` khi đã có; nếu chưa, khoanh theo cùng cách. Dùng UTC.
2. **Đọc tín hiệu mức request** cho từng service liên quan: số request mỗi giây, tỷ lệ lỗi và các phân vị độ trễ (p50, p95, p99). So khung lỗi với mốc khỏe.
3. **Đọc tín hiệu mức tài nguyên** cho máy chủ, container, pool và hàng đợi phía sau các service đó: mức sử dụng, mức bão hòa (độ dài hàng đợi, kết nối đang chờ, bị throttle, tải so với số lõi) và lỗi tài nguyên (restart, bị kill do hết bộ nhớ, message bị bỏ).
4. **Tìm tín hiệu lệch đầu tiên.** Với mỗi tín hiệu bị lệch, ghi thời điểm nó rời khỏi dải của mốc khỏe. Sắp xếp theo thứ tự. Tài nguyên bão hòa trước khi độ trễ tăng chỉ về một hướng khác với độ trễ tăng trước khi có gì bão hòa.
5. **Đối chiếu với sự kiện.** Liệt kê deploy, thay đổi config, feature flag, biến động lưu lượng (chiến dịch, batch job) và sự cố phụ thuộc trong và quanh khung lỗi. Với mỗi sự kiện, đánh dấu nó xảy ra trước, trùng, sau, hay không liên quan tới từng tín hiệu bị lệch.
6. **Kiểm phản ví dụ.** Tìm những lúc cùng tín hiệu đó thay đổi mà không có triệu chứng, hoặc triệu chứng xuất hiện mà không có tín hiệu. Những điều này làm yếu tương quan và phải được báo.
7. **Tính mức đốt mục tiêu** khi profile có định nghĩa mục tiêu dịch vụ: tốc độ đốt error budget trên một cửa sổ ngắn và một cửa sổ dài, cùng phần budget còn lại.
8. **Viết các nhận định tương quan** kèm độ mạnh: `weak` (một lần trùng hợp), `moderate` (thứ tự và thời điểm nhất quán trong sự cố này), `strong` (lặp lại qua nhiều sự cố, không có phản ví dụ). Dùng cách nói như "xảy ra trước 4 phút" hoặc "biến động cùng nhau", không bao giờ dùng "gây ra".
9. **Ghi lại khoảng trống**: thiếu lần scrape, metric không tồn tại, giới hạn lưu trữ.
10. **Gói kết quả** bằng `evidence-handoff` (`role: qc` hoặc `role: devops`).

Quy tắc production: metric production được đọc qua named query đã duyệt trong data broker. Ví dụ cú pháp của một ngôn ngữ query metric phổ biến nằm trong `references/query-examples.md`.

## Đầu Ra Bắt Buộc

```yaml
metrics:
  windows:
    failing: {from: "", to: ""}
    baseline: {from: "", to: ""}
  signals:
    - id: M1
      lens: request|resource
      metric: ""
      scope: ""                     # service, instance, pool, hàng đợi
      failing_value: ""
      baseline_value: ""
      change: ""                    # ví dụ +340% hoặc p95 180 ms → 2.4 s
      first_deviation_at: ""
      evidence_ids: []
  order: [M3, M1, M2]               # tín hiệu lệch đầu tiên đứng đầu
  alignment:
    - event: ""                     # deploy 4.2, khóa config, bắt đầu chiến dịch
      at: ""
      relation: {M1: precedes|coincides|follows|none}
      evidence_ids: []
  objective_burn:
    - objective: ""
      burn_rate_short: 0.0
      burn_rate_long: 0.0
      budget_remaining: ""
  correlations:
    - statement: ""
      strength: weak|moderate|strong
      counter_examples: []
  gaps: []
```

Gói bằng phong bì `evidence-handoff`.

## Yêu Cầu Bằng Chứng

- Mỗi tín hiệu dẫn id query hoặc query chính xác, khung thời gian, bước hoặc độ phân giải đã dùng, và link tới biểu đồ khi có.
- Giá trị mốc khỏe luôn đứng cạnh giá trị khung lỗi.
- Thời điểm sự kiện lấy từ hệ thống ghi nhận sự kiện đó (pipeline, nhật ký thay đổi, dịch vụ flag), không lấy theo trí nhớ.
- Tương quan đánh dấu `strong` phải liệt kê các sự cố khác ủng hộ nó.

## Quy Tắc Quyết Định

- `DONE` khi các tín hiệu bị lệch đã được định lượng so với mốc khỏe, đã sắp thứ tự, đã đối chiếu với sự kiện, và mọi tương quan đều có độ mạnh.
- `NEED_INFO` với `MISSING_IDENTIFIER` khi chưa biết thời điểm triệu chứng; với `NEEDS_MORE_EVIDENCE` cho người có quyền production khi query production cần dùng chưa có dưới dạng named query.
- `BLOCKED` với `SOURCE_UNAVAILABLE` khi thiếu metric của khung thời gian hoặc đã quá hạn lưu trữ.
- `ESCALATE` với `SEV1` khi mức đốt mục tiêu vượt ngưỡng đốt nhanh của profile và triệu chứng vẫn đang diễn ra; với `DATA_LOSS_RISK` khi hàng đợi bỏ message hoặc bộ lưu trữ đầy trong khi vẫn đang ghi.

## Quy Tắc Chất Lượng

- Trung bình che mất phần đuôi; báo phân vị cho độ trễ và giá trị theo từng instance khi có một instance nổi bật.
- Dùng cùng bước và cùng khoảng cho cả hai khung, nếu không phép so sánh không hợp lệ.
- So tốc độ với tốc độ, không so counter thô.
- Trùng thời điểm với một lần deploy là manh mối, không phải kết luận; nêu điều gì trong lần deploy đó phải đúng.
- Để biểu đồ sau link; output chứa con số.
- Mặc định viết tiếng Anh; lưu UTF-8.

## Dùng Trong Lane Maintenance Và s01-s08

- Agent maintenance khi chạy: agent QC trong giai đoạn điều tra và agent DevOps trong giai đoạn theo dõi sau phát hành; kết quả chuyển cho agent TechLead hoặc vào section theo dõi trước khi đóng case.
- Trong Code-Factory với work item loại `BUG`: hỗ trợ `s03` (sự kiện về phạm vi và thời điểm) và `s08` (bằng chứng hồi quy và tương thích sau bản sửa).

## Điều Kiện Hoàn Thành

- `metrics` theo `Đầu Ra Bắt Buộc` và được gói trong phong bì `evidence-handoff` hợp lệ.
- Đã áp dụng cả góc nhìn mức request và mức tài nguyên, hoặc lý do bỏ qua một góc nhìn nằm trong `gaps`.
- Thứ tự lệch và việc đối chiếu với sự kiện đã được ghi lại.
- Không nhận định nào khẳng định nhân quả; mỗi tương quan có độ mạnh và phản ví dụ.

Xem `references/eval-seeds.md` cho các ví dụ và `references/query-examples.md` cho cú pháp query.
