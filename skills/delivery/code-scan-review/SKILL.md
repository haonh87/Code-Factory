---
name: code-scan-review
description: Quét code theo ngôn ngữ để kiểm tra syntax, static analysis, security scan và performance heuristic trước khi bàn giao. Dùng khi cần chọn tool scan phù hợp với stack hiện tại, ví dụ PHP dùng php -l, phpstan, semgrep; TypeScript dùng tsc, eslint, semgrep; Python dùng py_compile, ruff, mypy, semgrep.
---

# Code Scan Review

Quét code theo ngôn ngữ để phát hiện lỗi cú pháp, vấn đề static analysis, rủi ro bảo mật và dấu hiệu performance risk trước khi bàn giao.

## Mục Tiêu

- Chọn đúng tool scan theo ngôn ngữ và stack hiện tại.
- Kiểm tra syntax và static analysis trước khi kết luận thay đổi an toàn ở mức code quality.
- Chạy security scan tĩnh bằng tool phù hợp nếu có.
- Ghi nhận performance risk ở mức heuristic, không ngụy tạo benchmark runtime.
- Tạo báo cáo scan đủ rõ để bước `Verify` và `Review` dùng tiếp.

## Khi Sử Dụng

- Sau khi implementation hoàn thành và trước khi bàn giao cuối.
- Khi thay đổi có chạm logic backend, framework, query, template hoặc dependency nhạy cảm.
- Khi cần chọn tool theo ngôn ngữ thay vì dùng một checklist scan cố định cho mọi stack.
- Khi cần tách rõ test behavior và scan code quality/security.

## Không Thuộc Phạm Vi

- Không thay thế unit test, integration test hay feature test.
- Không thay thế benchmark hiệu năng hoặc profiling runtime.
- Không thay thế penetration test hoặc security assessment thủ công chuyên sâu.
- Không thay thế review frontend ở mức accessibility, responsive layout, interaction feedback hoặc visual consistency; dùng `frontend-quality-review` khi scope chạm surface UI.
- Không thay thế review React-specific ở mức data fetching, effect hygiene, state placement hoặc render stability; dùng `react-best-practices-review` khi stack là React web hoặc Next.js.
- Không tự cài tool mới nếu chưa có trong môi trường và chưa được yêu cầu rõ.

## Đầu Vào Tối Thiểu

- `changed_files`
- `language_stack`
- `available_scan_tools`
- `constraints`
- `risk_focus`

`risk_focus` nên nêu ít nhất:
- có cần ưu tiên syntax hay không
- có thay đổi phần nhạy cảm về security hay không
- có nghi ngờ performance regression ở query, loop, serialization, allocation hoặc I/O hay không

Nếu không xác định được `language_stack`, phải suy ra từ file thay đổi hoặc nêu rõ chưa đủ dữ liệu.

## Ma Trận Tool Theo Ngôn Ngữ

- `PHP`
  - syntax: `php -l`
  - static analysis: `phpstan`
  - security scan: `semgrep`
  - performance heuristic: rà query trong loop, eager loading thiếu, collection xử lý lớn, serialization nặng
- `TypeScript/JavaScript`
  - syntax/type: `tsc --noEmit`, `eslint`, `node --check` cho JS thuần
  - security scan: `semgrep`
  - performance heuristic: render loop nặng, object clone lớn, query/network call lặp, blocking I/O
- `Python`
  - syntax: `python -m py_compile`
  - static analysis: `ruff`, `mypy`
  - security scan: `semgrep`
  - performance heuristic: query trong loop, list materialization lớn, sync I/O nặng, serialization lặp
- `Go`
  - syntax/static: `go test ./...`, `go vet ./...`
  - security scan: `semgrep`
  - performance heuristic: allocation dư, loop copy lớn, blocking call nóng
- `Java`
  - syntax/static: `./gradlew test`, `./gradlew check` hoặc tool build tương đương
  - security scan: `semgrep`
  - performance heuristic: N+1 ORM, object churn, blocking I/O, scan collection lớn

Nếu tool trong ma trận không có sẵn, ghi vào `skipped_scans` và chọn fallback gần nhất.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
scan_target: ""
language_stack: []
scan_plan:
  syntax: []
  static_analysis: []
  security: []
  performance_heuristic: []
syntax_scan_results:
  - command: ""
    status: PASS|FAIL|SKIP
    evidence: ""
static_analysis_results:
  - command: ""
    status: PASS|FAIL|SKIP
    findings: []
security_scan_results:
  - command: ""
    status: PASS|FAIL|SKIP
    findings: []
performance_heuristic_results:
  - check: ""
    status: PASS|FAIL|SKIP
    evidence: ""
skipped_scans: []
overall_status: PASS|FAIL|PARTIAL
remediation_actions: []
notes_for_verify: ""
```

## Ý Nghĩa Từng Output

- `scan_target`: phạm vi code được quét.
- `language_stack`: ngôn ngữ hoặc framework chính liên quan tới thay đổi.
- `scan_plan`: các scan sẽ chạy theo từng nhóm mục tiêu.
- `syntax_scan_results`: kết quả kiểm tra cú pháp.
- `static_analysis_results`: kết quả phân tích tĩnh và warning/finding chính.
- `security_scan_results`: kết quả security scan tĩnh.
- `performance_heuristic_results`: cảnh báo performance ở mức heuristic dựa trên pattern code.
- `skipped_scans`: scan không chạy được và lý do.
- `overall_status`: kết luận tổng thể cho bước scan code.
- `remediation_actions`: hành động cần làm trước khi release hoặc review.
- `notes_for_verify`: ghi chú bàn giao sang `testing`, `database-change-review` hoặc `step-goal-auditor`.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 8 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Scan Summary`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Không chuyển finding chuẩn sang prose rời rạc rồi bỏ block YAML; block `## Scan Summary` là nguồn sự thật cho kết quả scan.

## Luồng Thực Thi

1. Xác định `language_stack` từ file thay đổi và context project.
2. Chọn `scan_plan` theo ma trận tool và khả năng thực tế của môi trường.
3. Chạy syntax scan trước để chặn lỗi thô.
4. Chạy static analysis cho ngôn ngữ tương ứng.
5. Chạy security scan bằng `semgrep` hoặc tool tương đương nếu có.
6. Rà performance risk ở mức heuristic theo pattern code và thay đổi query/I/O.
7. Ghi đầy đủ kết quả vào từng nhóm output.
8. Kết luận `overall_status` và liệt kê `remediation_actions`.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt.
- Không đánh dấu `PASS` nếu static analysis hoặc security scan quan trọng bị bỏ qua mà không có lý do rõ.
- Không gọi `performance heuristic` là chứng minh hiệu năng.
- Nếu tool không có sẵn, phải ghi `SKIP` và nêu cụ thể tên tool thiếu.
- Nếu thay đổi chạm code nhạy cảm về auth, permission, file handling, SQL, command execution hoặc serialization, luôn ưu tiên security scan.
- Tài liệu phải lưu UTF-8 và giữ nguyên tiếng Việt có dấu.

## Luật Ra Quyết Định

- `PASS` khi syntax scan bắt buộc đều đạt, static/security scan quan trọng đã chạy và không còn finding blocker.
- `PARTIAL` khi phần lớn scan đạt nhưng còn scan bị skip hoặc còn finding mức trung bình chưa chặn release ngay.
- `FAIL` khi syntax fail, static analysis blocker fail hoặc security finding nghiêm trọng chưa xử lý.
- Nếu không có tool performance tự động, dùng `performance_heuristic_results` để ghi rõ risk thay vì bỏ qua im lặng.
- Nếu thay đổi chỉ là business logic thuần không chạm persistence, performance heuristic có thể tối giản nhưng vẫn phải nêu rõ đã rà gì.

## Điều Kiện Hoàn Tất

- Có `scan_plan` và `overall_status` rõ ràng.
- Có kết quả cho syntax, static analysis và security scan ở mức phù hợp với stack.
- Có `performance_heuristic_results` hoặc lý do hợp lệ để tối giản.
- Có `remediation_actions` cho mọi finding chưa đóng.
