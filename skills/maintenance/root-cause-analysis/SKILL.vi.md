---
language: vi
name: root-cause-analysis
description: Tìm nguyên nhân gốc của bug production từ bằng chứng đã thu thập bằng cách dựng timeline, kiểm các giả thuyết có thể bác bỏ, truy nguyên nhân còn đứng vững về nguồn gốc, và đề xuất ít nhất hai phương án sửa kèm blast radius và rollback. Dùng sau triage và thu thập bằng chứng, khi role TechLead phải giải thích vì sao lỗi xảy ra trước khi chọn cách sửa.
---

# Root Cause Analysis

> English: SKILL.md

Biến bằng chứng về một lỗi production thành lời giải thích có cơ sở về vì sao lỗi xảy ra và có thể thay đổi gì để chặn nó. Output là đề xuất để TechLead (người) duyệt, không phải quyết định.

## Mục Tiêu

- Giải thích lỗi bằng một nguyên nhân có bằng chứng và đứng vững trước các nỗ lực bác bỏ.
- Phân biệt yếu tố kích hoạt (điều làm lỗi xảy ra) với nguồn gốc (điều kiện về code, config, dữ liệu, phụ thuộc hoặc năng lực hệ thống khiến lỗi có thể xảy ra).
- Đưa cho người duyệt ít nhất hai phương án sửa kèm rủi ro, để lựa chọn vẫn thuộc về con người.
- Nói rõ khi bằng chứng chưa đủ, thay vì ép ra một đáp án duy nhất.

## Khi Sử Dụng

- Sau khi `bug-triage` nhận case và `log-investigation` hoặc `metric-correlation` đã có bằng chứng.
- Khi lỗi tái diễn sau một lần sửa trước đó.
- Khi nhiều team hoặc service có thể sở hữu vấn đề và ranh giới phải được lập luận bằng bằng chứng.

## Không Thuộc Phạm Vi

- Không viết hay merge bản sửa.
- Không tự thu thập bằng chứng thô từ đầu; gửi `request_info` cho QC khi một giả thuyết cần dữ liệu chưa có.
- Không đổ lỗi cho người. Nguồn gốc là một điều kiện của hệ thống, không phải một cá nhân.

## Đầu Vào Tối Thiểu

- Section triage (triệu chứng, severity, component, hệ thống bị ảnh hưởng).
- Các bằng chứng từ QC hoặc DevOps theo dạng `evidence-handoff`.
- Lịch sử deploy và thay đổi cấu hình quanh khung thời gian lỗi.
- Quyền đọc code và cấu hình liên quan.

Nếu không có bằng chứng nào cho thấy chính triệu chứng, trả `NEED_INFO` với `NEEDS_MORE_EVIDENCE` cho QC.

## Luồng Thực Hiện

1. **Nêu triệu chứng chính xác.** Cái gì hỏng, với ai, từ khi nào, tần suất ra sao, và thế nào là "đúng" (lấy từ section của BA nếu có).
2. **Dựng timeline.** Sắp xếp các sự kiện liên quan: lần xuất hiện đầu tiên, deploy, thay đổi config, thay đổi lưu lượng, sự cố phụ thuộc, nạp dữ liệu, và giai đoạn khỏe trước đó. Gắn mỗi mục với evidence id.
3. **Liệt kê giả thuyết.** Viết 3-5 nguyên nhân ứng viên trải qua các nhóm: thay đổi code, cấu hình, hình dạng hoặc khối lượng dữ liệu, phụ thuộc hoặc mạng, năng lực hoặc tranh chấp đồng thời, khác biệt môi trường. Có ít nhất một giả thuyết không liên quan tới lần deploy gần nhất.
4. **Làm cho mỗi giả thuyết có thể bác bỏ.** Với mỗi giả thuyết, ghi điều sẽ thấy nếu nó đúng và điều sẽ chứng minh nó sai (ví dụ "nếu cache cũ, tỷ lệ lỗi phải giảm ngay sau lần làm mới cache lúc 03:00").
5. **Kiểm với bằng chứng.** Đánh dấu mỗi giả thuyết `supported`, `contradicted` hoặc `untested`. Với giả thuyết `untested` quan trọng, gửi một `request_info` chính xác cho QC (khung thời gian, service, bộ lọc, tín hiệu mong đợi). Tối đa hai vòng yêu cầu mỗi case, sau đó quyết định với những gì đang có.
6. **Truy về nguồn gốc.** Với giả thuyết còn đứng vững, đi ngược chuỗi từ dòng lỗi hoặc metric hỏng tới điều kiện cho phép nó xảy ra: commit, khóa config, giả định về dữ liệu, chốt chặn bị thiếu, hợp đồng với phụ thuộc. Dừng khi thay đổi tại điểm đó sẽ chặn được cả lớp lỗi, không chỉ trường hợp này.
7. **Kiểm phạm vi lan.** Hỏi nguồn gốc này còn áp dụng ở đâu khác (endpoint khác, service khác, cửa hàng hoặc vùng khác) và đã xuất hiện ở đó chưa.
8. **Chấm độ tin cậy** kèm cơ sở: số nguồn độc lập, nguyên nhân có tái hiện được không, còn bằng chứng mâu thuẫn không.
9. **Đề xuất phương án sửa.** Ít nhất hai, ví dụ một phương án khoanh vùng tối thiểu và một phương án sửa gốc. Với mỗi phương án: thay đổi gì, blast radius, rủi ro hồi quy, rollback, và test nào chứng minh.
10. **Gói kết quả** bằng `evidence-handoff`.

## Đầu Ra Bắt Buộc

```yaml
rca:
  symptom: ""
  timeline:
    - at: ""                  # ISO-8601
      event: ""
      evidence_ids: []
  hypotheses:
    - id: H1
      statement: ""
      category: code|config|data|dependency|capacity|environment
      expected_if_true: ""
      disproved_if: ""
      result: supported|contradicted|untested
      evidence_ids: []
  root_cause:
    hypothesis_id: ""         # để trống khi bằng chứng chưa đủ
    trigger: ""
    origin: ""                # đường code / khóa config / giả định dữ liệu / hợp đồng phụ thuộc
    origin_ref: ""            # file:dòng, commit, đường dẫn config, ticket
    reach: []                 # những nơi khác cùng nguồn gốc
  competing_explanations: []  # điền khi còn nhiều hơn một giả thuyết được ủng hộ
  confidence: 0.0
  confidence_basis: ""
  fix_options:
    - id: F1
      kind: containment|structural
      change: ""
      blast_radius: ""
      regression_risk: low|medium|high
      rollback: ""
      proof_test: ""          # test fail trước và pass sau khi sửa
  recommended_option: ""      # chỉ là gợi ý; người duyệt quyết định
```

Gói bằng phong bì `evidence-handoff` (`role: techlead`).

## Yêu Cầu Bằng Chứng

- Mỗi mục timeline và mỗi kết quả `supported` hoặc `contradicted` đều dẫn evidence id.
- `origin_ref` trỏ tới thứ người review mở được (dòng code, commit, khóa config, id bản ghi dữ liệu).
- Nguyên nhân chỉ "nghe hợp lý" mà không có quan sát ủng hộ thì giữ `untested`; không được thành `root_cause`.
- Tái hiện (test fail, request phát lại, query cho thấy dữ liệu sai) là bằng chứng mạnh nhất và nên nêu trong `confidence_basis` khi có.

## Quy Tắc Quyết Định

- `DONE` khi một giả thuyết được ủng hộ, các giả thuyết khác bị bác bỏ hoặc rõ ràng yếu hơn, nguồn gốc có tham chiếu, và có hai phương án sửa.
- `DONE` với `competing_explanations` được điền và confidence không quá 0.5 khi sau hai vòng yêu cầu vẫn còn hai giả thuyết được ủng hộ; người duyệt quyết định theo hướng nào.
- `NEED_INFO` (target `qc`) khi một giả thuyết quyết định chưa được kiểm và vẫn còn vòng yêu cầu.
- `ESCALATE` khi nguồn gốc là điểm yếu bảo mật, hỏng hoặc mất dữ liệu, hệ thống bị hạn chế, hoặc lỗi severity 1 vẫn đang diễn ra.
- `BLOCKED` khi không truy cập được code hoặc cấu hình cần để truy nguồn gốc.

## Quy Tắc Chất Lượng

- Tương quan không phải nhân quả. "Bắt đầu sau deploy 4.2" là sự kiện trong timeline; nguyên nhân là thay đổi cụ thể trong deploy đó tạo ra triệu chứng.
- Ưu tiên lời giải thích bao được mọi bằng chứng, kể cả giai đoạn khỏe và các trường hợp không bị lỗi.
- Giữ lại các giả thuyết đã bị bác bỏ trong output; chúng cho người review thấy điều gì đã được loại trừ.
- Không đề xuất cách sửa chỉ che triệu chứng (retry, tăng timeout, bắt lỗi rồi bỏ qua) mà không gọi rõ đó là khoanh vùng.
- Giữ output gọn: đặt link tới trace dài thay vì dán vào.
- Mặc định viết tiếng Anh; lưu UTF-8.

## Dùng Trong Lane Maintenance Và s01-s08

- Agent maintenance khi chạy: agent TechLead ở giai đoạn điều tra; kết quả được đăng lên để người duyệt cách sửa.
- Trong Code-Factory với work item loại `BUG`: hỗ trợ `s03` (câu hỏi mở về nguyên nhân) và `s05` (technical approach). `fix_options` là đầu vào cho khối `## Option Analysis`; người duyệt vẫn là người pass gate Approach.

## Điều Kiện Hoàn Thành

- `rca` theo `Đầu Ra Bắt Buộc` và được gói trong phong bì `evidence-handoff` hợp lệ.
- Có timeline, đã xét ít nhất ba giả thuyết, mỗi giả thuyết có kết quả.
- Có root cause kèm `origin_ref`, hoặc có `competing_explanations` rõ ràng.
- Liệt kê ít nhất hai phương án sửa kèm blast radius, rollback và test chứng minh.

Xem `references/eval-seeds.md` cho các ví dụ.
