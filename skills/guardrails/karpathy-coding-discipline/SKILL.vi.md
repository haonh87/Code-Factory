---
name: karpathy-coding-discipline
description: 4 nguyên tắc hành vi cho coding agent, dựa trên quan sát Karpathy về lỗi LLM phổ biến: giả định ngầm, over-engineer, sửa lân cận, không verify. Chạy xuyên suốt mọi step, bổ trợ guardrails và delivery skill, không thay workflow chain hay approval gate.
language: vi
---

# Karpathy Coding Discipline

> English: SKILL.md

4 nguyên tắc hành vi giảm lỗi phổ biến khi coding agent làm việc.

## Nguồn Gốc

Dựa trên quan sát Karpathy về lỗi hệ thống của LLM coding agent:
1. **Giả định ngầm** — chọn 1 cách hiểu rồi chạy, không kiểm lại.
2. **Over-engineer** — viết 1000 dòng khi 100 dòng đủ.
3. **Sửa lân cận** — thay đổi code, comment, format không liên quan task.
4. **Không verify** — code xong không kiểm kết quả đúng intent không.

## Bốn Nguyên Tắc

### 1. Think Before Coding — Không giả định ngầm, không giấu điều chưa hiểu

- Nêu assumption tường minh trước khi implement.
- Nhiều cách hiểu → trình bày các lựa chọn, không chọn ngầm.
- Tồn tại cách đơn giản hơn → nói ra, đề xuất.
- Không rõ yêu cầu → dừng hỏi, không đoán rồi chạy.

### 2. Simplicity First — Code tối thiểu giải quyết vấn đề, không speculation

- Không thêm feature không yêu cầu.
- Không tạo abstraction cho code dùng 1 lần.
- Không thêm flexibility hay configurability không cần.
- Không xử lý error cho scenario không thể xảy ra.
- 200 dòng có thể là 50 → viết lại.
- Tiêu chuẩn: "Senior engineer bảo overcomplicated không?" → có thì đơn giản hóa.

### 3. Surgical Changes — Chỉ chạm thứ phải chạm, chỉ dọn mess của mình

- Không cải thiện code, comment hay format lân cận.
- Không refactor code đang chạy nếu không liên quan task.
- Match style hiện có, kể khi mình sẽ chọn khác.
- Dead code không liên quan → nêu ra, không xóa.
- Orphan do thay đổi của mình → xóa (import, variable, function).
- Mọi dòng thay đổi phải truy về yêu cầu của user.

### 4. Goal-Driven Execution — Xác định success criteria, loop đến khi verify

- Biến task thành mục tiêu đo được:
  - Thêm validation → viết test cho input không hợp lệ, pass test.
  - Sửa bug → viết test tái hiện bug, pass test.
- Task nhiều bước → nêu kế hoạch ngắn + verify step từng bước.
- Success criteria rõ → agent loop độc lập, không cần hỏi lại user.
- **Khác `step-goal-contract`**: Goal-Driven là behavioral lens — agent tự đặt success criteria cho từng task. Step-goal-contract là process gate — contract YAML cho cả step.

## Khi Sử Dụng

- Xuyên suốt mọi step — không chỉ s07, mà cả s01 clarify, s04 approach, s05 technical approach, s06 task plan.
- Khi agent có dấu hiệu over-engineer hoặc sửa lân cận trong diff.
- Khi cần behavioral guardrail bên cạnh workflow gate.
- Khi review diff và phát hiện agent vi phạm một trong bốn nguyên tắc.

## Không Thuộc Phạm Vi

- Không thay `codex-workflow-chain` hay step skill.
- Không thay `step-goal-contract` — skill đó khóa contract step (YAML schema), skill này khóa hành vi agent khi làm việc trong step.
- Không thay `review-discipline` — skill đó điều phối thời điểm review, skill này cung cấp tiêu chí behavioral cho nội dung review.
- Không thay `definition-of-done-gate` — skill đó khóa verdict hoàn tất work item, skill này chỉ cung cấp success criteria ở mức hành vi.
- Không bypass workflow gate — bổ trợ, không thay approval.

## Tương Tác Với Skill Khác

| Skill | Quan hệ |
|---|---|
| `step-goal-contract` | Contract khóa WHAT (mục tiêu step), karpathy khóa HOW (hành vi agent khi làm). Không trùng lặp. |
| `review-discipline` | Discipline điều phối KHI NÀO review, karpathy cung cấp NỘI DUNG review (surgical, simplicity). Bổ trợ. |
| `implementation` | Implementation quy trình CÁCH triển khai, karpathy bổ trợ hành vi KHI triển khai (surgical, minimal delta). Song hành. |
| `definition-of-done-gate` | DoD khóa verdict HOÀN TẤT work item, karpathy cung cấp success criteria ỨNG VIÊN trong từng task. Khác cấp. |

## Trade-off

Thiên về **thận trọng hơn tốc độ**. Task hiển nhiên (sửa typo, one-liner) → dùng phán đoán, không áp dụng full rigor.

## Đo Lường Hiệu Quả

Nguyên tắc đang hoạt động nếu:
- Diff ít thay đổi không liên quan task.
- Ít rewrite do overcomplication.
- Clarifying questions xuất hiện **trước** implement, không phải sau khi sai.

## Tham Chiếu

- [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)
- Gốc: Andrej Karpathy's post về LLM coding pitfalls (January 2026)
