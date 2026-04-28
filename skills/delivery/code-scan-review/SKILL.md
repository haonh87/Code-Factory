---
name: code-scan-review
description: Quét code ở step Verify theo 4 lane cố định gồm syntax, static analysis, security và performance heuristic. Dùng khi cần scan diff hoặc module bị tác động theo hướng wrapper-first, evidence-based, có false-positive policy rõ và chọn đúng reference theo ngôn ngữ như PHP, TypeScript/JavaScript, Python, Go và Java.
---

# Code Scan Review

Quét code theo stack hiện tại để phát hiện lỗi cú pháp, vấn đề static analysis, rủi ro bảo mật và dấu hiệu performance risk trước khi chốt verify.
Skill này là bộ điều phối scan ở step 8, dùng 4 lane cố định để giữ kết quả nhất quán giữa nhiều ngôn ngữ và nhiều project.

## Mục Tiêu

- Chọn đúng tool scan theo ngôn ngữ và stack hiện tại.
- Kiểm tra syntax và static analysis trước khi kết luận thay đổi an toàn ở mức code quality.
- Chạy security scan tĩnh bằng tool phù hợp nếu có.
- Ghi nhận performance risk ở mức heuristic, không ngụy tạo benchmark runtime.
- Tạo báo cáo scan đủ rõ để bước `Verify` và `Review` dùng tiếp.

## Vị Trí Trong Workflow

- Mặc định dùng ở `s08` `Verify + DoD`.
- Không tạo workflow step mới chỉ cho scan code; đây là skill verify chuyên biệt trong chain hiện có.
- Step 7 `Implement` chỉ nên bàn giao context scan qua `notes_for_testing` hoặc implementation handoff khi cần.
- Nếu người dùng muốn scan ngay trong lúc coding để self-check, vẫn phải ghi rõ đó là pre-handoff evidence; kết luận chính thức `PASS|FAIL|PARTIAL` thuộc step 8.

## Triết Lý Scan

- Mặc định `diff-aware`: ưu tiên `changed_files` hoặc `affected_modules`, chỉ quét full repo khi người dùng yêu cầu hoặc risk bắt buộc.
- `wrapper-first`: ưu tiên script, task runner, composer script, workspace command hoặc build wrapper đã có trong project trước khi gọi raw tool.
- `evidence-based`: mọi kết luận phải có command, scope, finding hoặc lý do skip rõ ràng.
- `explicit-skip`: nếu tool không có sẵn hoặc môi trường không cho chạy, ghi `SKIP` và nêu rõ lỗ hổng verify còn lại.
- `false-positive-aware`: đặc biệt với security lane, finding bị dismiss phải có lý do cụ thể thay vì biến mất khỏi output.
- Không giả độ chắc chắn: benchmark, profiling hoặc security assessment thủ công chuyên sâu không được trá hình thành output của skill này.

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

- `scan_target`
- `changed_files`
- `affected_modules`
- `language_stack`
- `available_scan_tools`
- `constraints`
- `risk_focus`

`risk_focus` nên nêu ít nhất:
- có cần ưu tiên syntax hay không
- có thay đổi phần nhạy cảm về security hay không
- có nghi ngờ performance regression ở query, loop, serialization, allocation hoặc I/O hay không

Nếu không xác định được `language_stack`, phải suy ra từ file thay đổi hoặc nêu rõ chưa đủ dữ liệu.
Nếu chưa có `changed_files`, phải suy ra từ diff hoặc nêu rõ vì sao phải fallback sang `AFFECTED_MODULES` hoặc `FULL_REPO`.

## Bốn Lane Cố Định

### 1. `syntax`

- Mục tiêu: chặn lỗi parse, compile hoặc syntax-invalid sớm nhất.
- Tính chất: lane blocker; syntax fail thường kéo `overall_status` về `FAIL`.
- Ưu tiên tool parser hoặc compiler native của ngôn ngữ, hoặc wrapper project đã có.
- Output lane này phải ghi rõ command, scope đã cover, evidence và `blocker_files` nếu có.

### 2. `static_analysis`

- Mục tiêu: bắt lỗi semantic như type issue, nullability, API misuse, unreachable path hoặc rule violation.
- Tính chất: lane correctness ở mức code semantics.
- Ưu tiên wrapper của project và config hiện có như `phpstan.neon`, eslint config, mypy config hoặc task build tương đương.
- Nếu project có baseline hoặc technical debt cũ, phải tách rõ finding mới trong diff với nợ cũ; baseline không phải lý do để bỏ qua blocker mới.

### 3. `security`

- Mục tiêu: tìm pattern rủi ro trên phần code thay đổi, đặc biệt ở auth, permission, file handling, SQL, command execution, deserialization hoặc secrets.
- Tính chất: lane risk-focused, phải `diff-aware` và có false-positive policy rõ.
- Ưu tiên tool-backed scan như `semgrep` hoặc scanner tương đương; review tay chỉ là bổ sung, không được giả là scanner deterministic.
- Mọi finding security nên có ít nhất `severity`, `confidence`, `category`, `evidence`, `recommendation` và nếu dismiss thì có `false_positive_reason`.

### 4. `performance_heuristic`

- Mục tiêu: phát hiện performance risk theo pattern code như N+1, query trong loop, blocking I/O trên hot path, render churn hoặc object churn lớn.
- Tính chất: lane advisory nhưng bắt buộc phải hiện diện; không dùng lane này để ngụy tạo benchmark.
- Nếu không có tool performance tự động, vẫn phải rà heuristic và ghi lại `expected_impact`, `confidence`, `trigger_condition`.
- Lane này thường kéo `PARTIAL` hoặc remediation note, hiếm khi tự nó kéo `FAIL` trừ khi risk quá rõ và chạm critical path.

## Chọn Reference Theo Ngôn Ngữ

- Xác định `language_stack` từ `changed_files`, build path và context project.
- Chỉ đọc reference liên quan trực tiếp với thay đổi hiện tại:
  - `PHP`: `references/php.md`
  - `TypeScript/JavaScript`: `references/typescript-javascript.md`
  - `Python`: `references/python.md`
  - `Go`: `references/go.md`
  - `Java`: `references/java.md`
- Với repo nhiều ngôn ngữ, chỉ load reference cho ngôn ngữ có trong `changed_files` hoặc build path bị tác động.
- Nếu tool trong reference không có sẵn, ghi vào `skipped_scans`, chọn fallback gần nhất và nêu rõ độ tin cậy giảm ở đâu.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
scan_target: ""
scan_scope:
  mode: DIFF_ONLY|AFFECTED_MODULES|FULL_REPO
  changed_files: []
  affected_modules: []
language_stack: []
available_scan_tools: []
false_positive_policy: "Diff-aware, evidence-based, dismiss only with reason"
scan_plan:
  syntax: []
  static_analysis: []
  security: []
  performance_heuristic: []
syntax_scan_results:
  - command: ""
    scope: []
    status: PASS|FAIL|SKIP
    evidence: ""
    blocker_files: []
static_analysis_results:
  - command: ""
    config_used: ""
    scope: []
    status: PASS|FAIL|SKIP
    findings: []
    new_blockers: []
security_scan_results:
  - command_or_check: ""
    scope: []
    status: PASS|FAIL|SKIP
    findings:
      - severity: HIGH|MEDIUM|LOW
        confidence: HIGH|MEDIUM|LOW
        category: ""
        file: ""
        line: 0
        issue: ""
        evidence: ""
        recommendation: ""
        false_positive_reason: ""
performance_heuristic_results:
  - check: ""
    scope: []
    status: PASS|FAIL|SKIP
    expected_impact: HIGH|MEDIUM|LOW
    confidence: HIGH|MEDIUM|LOW
    trigger_condition: ""
    evidence: ""
skipped_scans: []
overall_status: PASS|FAIL|PARTIAL
remediation_actions: []
notes_for_verify: ""
```

## Ý Nghĩa Từng Output

- `scan_target`: phạm vi code được quét.
- `scan_scope`: chế độ quét thực tế, danh sách file đổi và module bị tác động.
- `language_stack`: ngôn ngữ hoặc framework chính liên quan tới thay đổi.
- `available_scan_tools`: tool thực sự có trong môi trường hoặc project path hiện tại.
- `false_positive_policy`: cách xử lý finding bị dismiss, đặc biệt ở security lane.
- `scan_plan`: các scan sẽ chạy theo từng nhóm mục tiêu.
- `syntax_scan_results`: kết quả kiểm tra cú pháp.
- `static_analysis_results`: kết quả phân tích tĩnh, config đã dùng và blocker mới trong diff.
- `security_scan_results`: kết quả security scan tĩnh với severity, confidence và lý do dismiss khi có.
- `performance_heuristic_results`: cảnh báo performance ở mức heuristic dựa trên pattern code cùng impact dự kiến.
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

1. Xác định `scan_scope`; mặc định là `DIFF_ONLY`.
2. Suy ra `language_stack` từ `changed_files`, build path và context project.
3. Mở đúng reference theo ngôn ngữ thay vì đọc toàn bộ biến thể.
4. Chọn `scan_plan` theo nguyên tắc `wrapper-first`, config hiện có của project và tool khả dụng trong môi trường.
5. Chạy lane `syntax` trước để chặn lỗi thô.
6. Chạy lane `static_analysis` với config hoặc baseline hiện có nếu project dùng.
7. Chạy lane `security` theo hướng `diff-aware`, ghi finding theo severity và confidence, đồng thời dismiss false positive có lý do.
8. Chạy lane `performance_heuristic` ở mức pattern-based review, không giả benchmark.
9. Ghi đầy đủ kết quả vào từng lane và `skipped_scans`.
10. Kết luận `overall_status` và liệt kê `remediation_actions`.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt.
- Mặc định chỉ scan `changed_files` hoặc `affected_modules`; quét full repo cần có lý do rõ.
- Ưu tiên wrapper, script và config sẵn có của project trước raw tool.
- Không đánh dấu `PASS` nếu static analysis hoặc security scan quan trọng bị bỏ qua mà không có lý do rõ.
- Không gọi `performance heuristic` là chứng minh hiệu năng.
- Nếu tool không có sẵn, phải ghi `SKIP` và nêu cụ thể tên tool thiếu.
- Nếu scan chỉ chạy ở mức self-check trong step implement, không được coi đó là kết luận verify cuối.
- Nếu finding security bị dismiss, phải ghi `false_positive_reason`; không được xóa finding khỏi báo cáo mà không có lý do.
- Nếu project có baseline static analysis, phải tách rõ blocker mới trong diff với debt cũ.
- Nếu thay đổi chạm code nhạy cảm về auth, permission, file handling, SQL, command execution hoặc serialization, luôn ưu tiên security scan.
- Tài liệu phải lưu UTF-8 và giữ nguyên tiếng Việt có dấu.

## Luật Ra Quyết Định

- `PASS` khi syntax bắt buộc đều đạt, static analysis không còn blocker mới, security lane đã cover phần nhạy cảm cần thiết và không còn finding `HIGH` chưa xử lý.
- `PARTIAL` khi phần lớn scan đạt nhưng còn lane bị skip hợp lệ, còn finding mức trung bình chưa chặn release ngay hoặc performance heuristic nêu risk đáng kể cần follow-up.
- `FAIL` khi syntax fail, static analysis có blocker mới, security finding nghiêm trọng chưa xử lý hoặc security lane bị bỏ qua trong scope nhạy cảm mà không có biện minh mạnh.
- Nếu không có tool performance tự động, dùng `performance_heuristic_results` để ghi rõ risk thay vì bỏ qua im lặng.
- Nếu thay đổi chỉ là business logic thuần không chạm persistence, performance heuristic có thể tối giản nhưng vẫn phải nêu rõ đã rà gì.

## Điều Kiện Hoàn Tất

- Có `scan_plan` và `overall_status` rõ ràng.
- Có `scan_scope`, `available_scan_tools` và `false_positive_policy` rõ ràng.
- Có kết quả cho syntax, static analysis và security scan ở mức phù hợp với stack.
- Có `performance_heuristic_results` hoặc lý do hợp lệ để tối giản.
- Có `remediation_actions` cho mọi finding chưa đóng.
