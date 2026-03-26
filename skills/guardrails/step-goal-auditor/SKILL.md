---
name: step-goal-auditor
description: Kiểm định output thực tế của từng bước workflow coding so với Step Goal Contract. Dùng ở cuối mỗi step để đánh giá PASS, FAIL hoặc PARTIAL, ghi bằng chứng, chỉ ra khoảng trống và quyết định có được chuyển bước tiếp theo hay không.
---

# Step Goal Auditor

Đánh giá mức độ đạt mục tiêu của step dựa trên contract đã chốt.

## Mục Tiêu

- Kiểm tra xem output thực tế có khớp với contract của step hay không.
- Tạo kết luận có bằng chứng thay vì đánh giá cảm tính.
- Chỉ ra khoảng trống, vi phạm constraint và rủi ro còn mở trước khi chuyển bước.

## Khi Sử Dụng

- Ở cuối mỗi step có contract rõ ràng.
- Khi cần quyết định có được chuyển sang step tiếp theo hay không.
- Khi cần tổng hợp bằng chứng trước review hoặc handoff.

## Không Thuộc Phạm Vi

- Không định nghĩa lại goal của step.
- Không thay thế testing chi tiết; audit dùng kết quả verify làm evidence.
- Không che giấu gaps hoặc tự hợp thức hóa một step chưa đạt.

## Đầu Vào Tối Thiểu

- Step Goal Contract của step hiện tại.
- Artifact thực tế tạo ra trong step.
- Log kiểm tra (test, lint, build, encoding) nếu có.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
step: ""
status: PASS|FAIL|PARTIAL
checks:
  - criterion: ""
    result: PASS|FAIL
    evidence: ""
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: true|false
timebox_evidence: ""
gaps: []
risk_level: LOW|MEDIUM|HIGH
next_action: ""
```

## Ý Nghĩa Từng Output

- `checks`: kết quả theo từng tiêu chí `done_when`.
- `constraint_violations`: vi phạm hard constraint nếu có.
- `unmitigated_high_risks`: rủi ro HIGH chưa có xử lý hợp lệ.
- `timebox_breach`: step có vượt timebox hay không.
- `gaps`: phần chưa đạt hoặc chưa có bằng chứng.
- `risk_level`: mức rủi ro tổng thể sau audit.
- `next_action`: hành động cần làm trước khi chuyển bước.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Đặt schema YAML của skill này trong block `## Audit`.
- Block này thường xuất hiện ở step 3 và step 8 theo template tại `../codex-workflow-chain/references/workflow-chain.md`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Kết luận prose `PASS|FAIL|PARTIAL` phải khớp với `status` trong block YAML.

## Luồng Đánh Giá

1. Tải contract và tách danh sách `done_when`.
2. Ánh xạ từng tiêu chí với bằng chứng thực tế.
3. Ghi `PASS/FAIL` cho từng tiêu chí.
4. Đối chiếu `hard_constraints` với bằng chứng để phát hiện vi phạm.
5. Rà soát rủi ro `severity=HIGH` xem đã có `mitigation` và `owner` thực thi hay chưa.
6. Kiểm tra vi phạm `timebox` và ghi bằng chứng.
7. Tổng hợp `gaps`, mức rủi ro và hành động khắc phục.
8. Kết luận trạng thái tổng thể.

## Quy Tắc Chấm Trạng Thái

- `PASS` khi:
  - Tất cả tiêu chí `done_when` bắt buộc đều đạt và có bằng chứng.
  - Không có `constraint_violations`.
  - Không còn `unmitigated_high_risks`.

- `PARTIAL` khi:
  - Có phần đạt nhưng còn thiếu tiêu chí không nghiêm trọng.
  - Hoặc có `timebox_breach` đã được giải thích và chấp nhận.

- `FAIL` khi:
  - Thiếu tiêu chí bắt buộc.
  - Có vi phạm `hard_constraints`.
  - Còn rủi ro `HIGH` chưa có phương án xử lý hợp lệ.

## Quy Tắc Chất Lượng

- Mặc định báo cáo bằng tiếng Việt.
- Mọi kết luận phải có evidence, không dùng nhận xét cảm tính.
- Không gắn `PASS` khi chưa đủ dữ liệu chứng minh.
- Nếu có check bị skip, phải phản ánh vào `gaps` hoặc `next_action`.

## Điều Kiện Hoàn Tất

- Báo cáo audit đầy đủ theo schema.
- Trạng thái và bằng chứng rõ ràng, truy vết được.
- Đã kết luận rõ có được chuyển bước tiếp theo hay không.
