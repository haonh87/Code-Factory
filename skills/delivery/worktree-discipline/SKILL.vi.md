---
language: vi
name: worktree-discipline
description: Chốt khi nào phải dùng worktree, cách cô lập workspace và guard cleanup cho change lớn hoặc rủi ro. Dùng ở `s07 Implement` khi scope chạm nhiều boundary/file, kéo dài hơn một session, có conflict risk, merge/branch/release risk hoặc `planning_track=full|enterprise`.
---

# Worktree Discipline

> English: SKILL.md

Chốt quyết định dùng hay không dùng `worktree` trước hoặc trong `s07 Implement`, để implementation path được cô lập đúng mức thay vì dựa vào thói quen.

<HARD-GATE>
Không được dùng skill này để bypass `s04-s06`.

`worktree` là lớp cô lập workspace, không phải bằng chứng `done`, không thay cho review, verify hay `DoD`.

Nếu change đã thuộc nhóm nên hoặc phải dùng `worktree` mà vẫn bỏ qua, phải ghi `skip_reason` rõ và phản ánh trong implementation note.
</HARD-GATE>

## Khi Sử Dụng

- Khi `planning_track=enterprise`.
- Khi change kéo dài hơn một session hoặc nhiều người có thể chạm cùng vùng code.
- Khi scope chạm nhiều boundary/module/file với conflict risk đáng kể.
- Khi có `merge risk`, `branch risk` hoặc `release risk` cao.
- Khi cần quyết định có thể bỏ qua `worktree` cho quick fix hay không.

## Không Thuộc Phạm Vi

- Không thay `implementation` để viết code.
- Không thay `branch-finish-discipline` để chốt cleanup/merge sau verify.
- Không tự chạy lệnh `git worktree` thay người dùng nếu chưa được yêu cầu.
- Không thay review hoặc testing.

## Đầu Vào Tối Thiểu

- `worktree_target`
- `planning_track`
- `change_scope`
- `risk_signals`
- `repo_context`
- `constraints`

`risk_signals` nên nêu ít nhất:

- có kéo dài hơn một session hay không
- có nhiều boundary hoặc nhiều file chạm chính hay không
- có merge/conflict/release risk hay không
- có nhiều implementer hoặc worker có khả năng đụng cùng path hay không

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
worktree_target: ""
planning_track: quick|full|enterprise
risk_signals: []
worktree_decision: REQUIRED|RECOMMENDED|OPTIONAL|NOT_NEEDED
decision_reason: []
isolation_strategy:
  branch_name: ""
  worktree_path: ""
  owned_paths: []
  expected_duration: ""
execution_guards: []
skip_reason: ""
cleanup_preconditions: []
notes_for_implementation: ""
```

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:

- Dùng template step 7 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Implementation Notes`.
- Không thay block `## Artifact Chính`; block đó vẫn dùng schema `implementation`.

## Quy Trình Bắt Buộc

1. Đọc `planning_track`, `change_scope` và `risk_signals`.
2. Xác định change có thuộc nhóm `change lớn hoặc rủi ro` hay không.
3. Kết luận `worktree_decision` là `REQUIRED`, `RECOMMENDED`, `OPTIONAL` hoặc `NOT_NEEDED`.
4. Nếu dùng `worktree`, chốt `isolation_strategy` đủ để người triển khai không phải tự đoán.
5. Ghi `execution_guards` để tránh drift giữa main workspace và workspace cô lập.
6. Nếu bỏ qua `worktree`, ghi `skip_reason` tường minh.
7. Ghi `cleanup_preconditions` để bàn giao sang `branch-finish-discipline`.

## Quy Tắc Chất Lượng

- `enterprise` không được kết luận dưới mức `REQUIRED` nếu không có waiver rõ.
- Nếu `worktree_decision != NOT_NEEDED`, `isolation_strategy` không được để trống.
- Nếu `worktree_decision=OPTIONAL|NOT_NEEDED`, phải giải thích vì sao main workspace vẫn an toàn.
- Nếu `worktree_path` đi ra ngoài working tree của repo mà không ghi lý do trong `decision_reason`, phải coi `isolation_strategy` là chưa hoàn chỉnh.
- Mặc định viết và trao đổi bằng tiếng Việt có dấu.
- File văn bản phải lưu UTF-8.

## Ràng Buộc Vị Trí

- Mặc định và bắt buộc: `worktree_path` phải nằm trong working tree của chính repo, ví dụ `.claude/worktrees/<name>` — đúng convention mà tool `EnterWorktree` đang dùng. Không được dựng `worktree_path` bằng các đoạn `..` đi ra khỏi repo root.
- Trước khi chốt `isolation_strategy`, phải resolve `worktree_path` thành absolute path và xác nhận nó vẫn nằm trong boundary của repo. Một relative path chưa được resolve hoặc chưa kiểm tra là không chấp nhận được.
- Vị trí nằm ngoài working tree của repo chỉ hợp lệ như một exception có lý do rõ (ví dụ runtime không có convention worktree trong repo). Phải ghi lý do vào `decision_reason`, và dù vậy vẫn chỉ được là sibling trực tiếp một cấp so với repo root — không phải relative path tùy ý.
- Ràng buộc này áp dụng bất kể runtime hay agent nào thực thi; luật quan tâm đến worktree nằm ở đâu, không phải tool nào tạo ra nó.

## Luật Ra Quyết Định

- Điều kiện chọn `REQUIRED` vs `RECOMMENDED` bám theo `codex-workflow-chain § Hard Rule: Worktree For Large Or Risky Changes` trực tiếp — đối chiếu `planning_track` và `risk_signals` với rule đó thay vì suy diễn lại danh sách trigger ở đây.
- `OPTIONAL` khi change trung bình nhưng ownership đủ rõ và conflict risk thấp — thấp hơn `RECOMMENDED` một bậc, không phải từ đồng nghĩa.
- `NOT_NEEDED` chỉ phù hợp với bug nhỏ hoặc quick fix, ít file, xong trong một session và conflict risk thấp.
- Nếu có nhiều worker hoặc người cùng chạm vùng path gần nhau, thiên về `REQUIRED` hoặc `RECOMMENDED` dù không có trigger đơn lẻ nào trong Hard Rule tự kích hoạt.

## Điều Kiện Hoàn Tất

- Có `worktree_decision` và `decision_reason` rõ ràng.
- Có `isolation_strategy` khi cần dùng `worktree`.
- Có `skip_reason` nếu không dùng dù change có tín hiệu rủi ro.
- Có `cleanup_preconditions` đủ để bàn giao sang closeout ở `s08`.
