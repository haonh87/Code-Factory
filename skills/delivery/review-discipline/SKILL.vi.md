---
language: vi
name: review-discipline
description: Tổ chức review sớm trong `s07 Implement` theo thứ tự `spec compliance -> code quality`, theo batch hoặc task rủi ro, rồi chốt handoff sang verify. Dùng khi implementation chạm logic, contract, diff khó đọc, nhiều batch hoặc release risk không nên dồn review về cuối.
---

# Review Discipline

> English: SKILL.md

Điều phối review sớm trong `s07` để lỗi và drift được phát hiện trước khi bước sang `s08 Verify + DoD`.

<HARD-GATE>
Không được dồn toàn bộ review sang `s08`.

Không được review `code quality` trước khi chốt `spec compliance`.

Skill này điều phối thời điểm, thứ tự và scope review; nó không thay `testing`, `code-scan-review`, `frontend-quality-review` hay `react-best-practices-review`.
</HARD-GATE>

## Khi Sử Dụng

- Khi implementation có batch logic, contract hoặc integration quan trọng.
- Khi diff dài, nhiều file, khó đọc hoặc có risk cao.
- Khi `planning_track=full|enterprise`.
- Khi cần chốt reviewer, review batch và blocker rule trước verify.

## Không Thuộc Phạm Vi

- Không thay `testing` cho verify hành vi.
- Không thay các review chuyên biệt như `frontend-quality-review`, `react-best-practices-review`, `database-change-review`.
- Không tự hợp thức hóa merge chỉ vì review pass.
- Không thay `branch-finish-discipline`.

## Đầu Vào Tối Thiểu

- `review_target`
- `planning_track`
- `change_scope`
- `risk_signals`
- `available_reviewers`
- `constraints`

`risk_signals` nên nêu ít nhất:

- có logic hoặc contract quan trọng hay không
- có batch nào rủi ro cao cần review sớm không
- có diff khó đọc hoặc nhiều file không
- có requirement nào dễ lệch spec không

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
review_target: ""
planning_track: quick|full|enterprise
review_mode: SELF|TARGETED|INDEPENDENT
review_order:
  - SPEC_COMPLIANCE
  - CODE_QUALITY
review_batches:
  - batch: ""
    scope: []
    trigger: ""
    reviewer_role: ""
required_checks:
  spec_compliance: []
  code_quality: []
finding_policy:
  blocker_threshold: ""
  reopen_conditions: []
handoff_to_verify: []
notes_for_implementation_or_verify: ""
```

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:

- Dùng template step 7 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Implementation Notes`.
- Nếu step đã tạo review artifact riêng ở `s08`, liên kết chéo thay vì lặp finding đầy đủ.

## Quy Trình Bắt Buộc

1. Xác định `review_target` và batch hoặc task rủi ro cần review sớm.
2. Chọn `review_mode` theo `planning_track` và risk thực tế.
3. Khóa `review_order` theo thứ tự `SPEC_COMPLIANCE -> CODE_QUALITY`.
4. Chia `review_batches` đủ nhỏ để reviewer đọc được và phản hồi sớm.
5. Ghi `required_checks` cho từng lane review.
6. Chốt `finding_policy` để biết finding nào chặn verify.
7. Chuẩn bị `handoff_to_verify` cho bước `s08`.

## Quy Tắc Chất Lượng

- `quick` vẫn phải có ít nhất một lượt review trước khi rời `s07`.
- `full` và `enterprise` không được để `review_batches` trống nếu có risk trung bình hoặc cao.
- `INDEPENDENT` nên dùng khi review owner tách khỏi implementer hoặc release risk cao.
- `finding_policy.blocker_threshold` phải explicit; không dùng wording mơ hồ.
- Mặc định viết và trao đổi bằng tiếng Việt có dấu.
- File văn bản phải lưu UTF-8.

## Luật Ra Quyết Định

- Ánh xạ mức baseline (`quick`→`SELF`, `full`→`TARGETED`, `enterprise`→`INDEPENDENT`) bám theo `codex-workflow-chain § Hard Rule: Review Early, Do Not Wait Until The End` trực tiếp — không suy diễn lại mức tối thiểu theo track ở đây.
- `SELF` vẫn phải theo đúng `review_order` dù ở mức baseline.
- `TARGETED` cũng áp dụng cho `quick` khi có batch logic/contract rõ, cao hơn baseline của track đó.
- `INDEPENDENT` cũng áp dụng khi release risk cao hoặc reviewer owner phải tách biệt khỏi implementer, bất kể track.
- Nếu có logic/contract quan trọng, `review_batches` phải tách phần đó ra thay vì trộn vào batch lớn.
- Nếu finding chạm spec hoặc requirement, phải quay lại `spec compliance` trước khi tranh luận `code quality`.

## Điều Kiện Hoàn Tất

- Có `review_mode`, `review_order` và `review_batches` rõ ràng.
- Có `required_checks` và `finding_policy` đủ để review vận hành được.
- Có `handoff_to_verify` để `s08` nhận đúng context.
