---
language: vi
name: branch-finish-discipline
description: Chốt có được cleanup, close, remove hoặc merge branch/worktree chưa, dựa trên verify, `DoD` và finding mở. Dùng ở `s08 Verify + DoD` hoặc sau verify khi work item có branch/worktree cần đóng an toàn.
---

# Branch Finish Discipline

> English: SKILL.md

Chốt rule closeout cho branch hoặc worktree sau verify, để không cleanup hoặc merge sớm chỉ vì workspace đã sạch.

<HARD-GATE>
Không được cleanup, close, remove hoặc merge branch/worktree trước khi `s08 Verify + DoD` có verdict đủ rõ.

`review pass`, `test pass` cục bộ, diff sạch hoặc worktree sạch không phải bằng chứng đủ để chốt closeout.

Nếu còn finding mở, exception mở hoặc evidence chưa đủ, recommendation phải giữ trạng thái `HOLD_OPEN`.
</HARD-GATE>

## Khi Sử Dụng

- Khi work item dùng branch hoặc worktree riêng.
- Khi verify đã gần xong và cần quyết định cleanup hoặc merge.
- Khi có nhiều worktree hoặc nhiều nhánh cần chốt theo thứ tự an toàn.
- Khi cần chốt precondition closeout cho release-sensitive change.

## Không Thuộc Phạm Vi

- Không thay `testing` hoặc `definition-of-done-gate`.
- Không thay branch strategy của repo.
- Không tự chạy lệnh `git merge`, `git worktree remove` hoặc cleanup destructive nếu chưa được yêu cầu.
- Không dùng để hợp thức hóa closeout sớm.

## Đầu Vào Tối Thiểu

- `finish_target`
- `workspace_context`
- `verify_status`
- `dod_status`
- `open_findings`
- `constraints`

`workspace_context` nên nêu ít nhất:

- đang dùng `branch`, `worktree` hay cả hai
- path hoặc branch name liên quan
- có nhiều workspace cần dọn theo thứ tự hay không

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
finish_target: ""
workspace_kind: BRANCH|WORKTREE|BOTH
verify_inputs: []
finish_gate_checks:
  verify_complete: PASS|FAIL|PENDING
  dod_complete: PASS|FAIL|PENDING
  findings_closed: PASS|FAIL|PENDING
  exceptions_resolved: PASS|FAIL|PENDING
allowed_actions: []
blocked_actions: []
cleanup_sequence: []
merge_conditions: []
residual_risks: []
final_recommendation: CLEANUP_ALLOWED|MERGE_ALLOWED|HOLD_OPEN
notes_for_closeout: ""
```

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:

- Dùng template step 8 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Audit`.
- Nếu closeout ảnh hưởng verdict cuối, liên kết thêm sang `## Definition of Done`.

## Quy Trình Bắt Buộc

1. Đọc `verify_status`, `dod_status`, `open_findings` và `workspace_context`.
2. Đánh giá `finish_gate_checks`.
3. Tách rõ `allowed_actions` và `blocked_actions`.
4. Nếu cleanup hoặc merge được phép, ghi `cleanup_sequence` và `merge_conditions`.
5. Nếu chưa được phép, ghi `residual_risks` và `notes_for_closeout` đủ rõ để giữ workspace mở đúng lý do.

## Quy Tắc Chất Lượng

- `final_recommendation` không được là `MERGE_ALLOWED` khi `dod_complete != PASS`.
- `blocked_actions` không được để trống khi recommendation là `HOLD_OPEN`.
- Nếu có nhiều workspace, `cleanup_sequence` phải nêu thứ tự.
- Nếu verify chưa hoàn tất hoặc finding còn mở, không dùng wording mập mờ như “có thể cân nhắc merge”.
- Mặc định viết và trao đổi bằng tiếng Việt có dấu.
- File văn bản phải lưu UTF-8.

## Luật Ra Quyết Định

- `HOLD_OPEN` là default bất cứ khi nào điều kiện finalize trong `codex-workflow-chain § Hard Rule: Branch/Worktree Only Finalized After Verify` chưa đạt — map `finish_gate_checks` vào Hard Rule đó thay vì suy diễn lại điều kiện ở đây.
- `CLEANUP_ALLOWED` phù hợp khi workspace có thể dọn nhưng merge hoặc close cuối còn phụ thuộc điều kiện khác của repo — một trạng thái riêng, nhẹ hơn `MERGE_ALLOWED`, không nằm trong Hard Rule.
- `MERGE_ALLOWED` chỉ phù hợp khi mọi điều kiện trong Hard Rule đó đã đạt.
- Nếu dùng nhiều worktree hoặc multi-agent handoff, closeout chỉ hợp lệ sau khi `verify path` và `handoff path` đã kết thúc rõ, theo cùng Hard Rule.

## Điều Kiện Hoàn Tất

- Có `finish_gate_checks` với verdict đọc được.
- Có `allowed_actions`, `blocked_actions` và `final_recommendation` rõ ràng.
- Có `cleanup_sequence` hoặc `merge_conditions` khi closeout được phép.
- Có `residual_risks` và `notes_for_closeout` khi phải giữ workspace mở.
