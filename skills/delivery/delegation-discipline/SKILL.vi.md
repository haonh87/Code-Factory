---
language: vi
name: delegation-discipline
description: Quyết định có được delegation hoặc subagent không, rồi chốt `owned_scope`, `owned_paths`, `merge path` và `verify path` cho task độc lập. Dùng sau `s06 Task Plan` khi muốn song song hóa nhưng vẫn phải giữ ownership rõ và không bypass review/verify.
---

# Delegation Discipline

> English: SKILL.md

Chốt xem execution nên giữ `agentic`, nâng lên `subagent` hoặc `multi_agent`, hay fallback `sequential_multi_role`, dựa trên mức độc lập thật sự của task.

<HARD-GATE>
Không được dùng skill này trước khi `s06 Task Plan` đủ rõ.

Không được bật delegation chỉ vì muốn song song hóa.

Nếu một trong các điều kiện `owned_scope`, `owned_paths`, `merge_path` hoặc `verify_path` chưa rõ, recommendation không được là `SUBAGENT` hoặc `MULTI_AGENT`.
</HARD-GATE>

## Khi Sử Dụng

- Khi muốn tách worker hoặc subagent cho một phần implementation hoặc verify.
- Khi scope chạm nhiều module nhưng có thể tách ownership rõ.
- Khi cần quyết định `agentic`, `subagent`, `multi_agent` hay `sequential_multi_role` ở `s07-s08`.
- Khi nghi ngờ task có chồng lấn ownership hoặc handoff path chưa rõ.

## Không Thuộc Phạm Vi

- Không thay `task-breakdown-planner`; skill này dùng đầu vào từ task plan chứ không tự lập plan mới.
- Không thay `review-discipline` hay `testing`.
- Không thay governance của runtime orchestrator.
- Không tự spawn worker hay subagent; skill này chỉ chốt decision và guard.

## Đầu Vào Tối Thiểu

- `delegation_target`
- `planning_track`
- `task_plan`
- `candidate_tasks`
- `repo_context`
- `constraints`

`candidate_tasks` nên nêu ít nhất:

- task hoặc batch nào có thể tách
- `owned_scope` dự kiến
- `owned_paths` dự kiến
- merge path và verify path dự kiến

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
delegation_target: ""
planning_track: quick|full|enterprise
execution_mode_recommendation: AGENTIC|SUBAGENT|MULTI_AGENT|SEQUENTIAL_MULTI_ROLE
independence_checks:
  owned_scope_clear: PASS|FAIL
  owned_paths_clear: PASS|FAIL
  merge_path_clear: PASS|FAIL
  verify_path_clear: PASS|FAIL
worker_assignments:
  - role: ""
    task: ""
    owned_scope: []
    owned_paths: []
    outputs_expected: []
merge_strategy: []
verify_strategy: []
blocked_reasons: []
coordination_guards: []
notes_for_execution: ""
```

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:

- Dùng template step 7 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Implementation Notes`.
- Nếu note có block hoặc frontmatter về execution topology, có thể link chéo từ đó thay vì lặp lại prose.

## Quy Trình Bắt Buộc

1. Đọc `task_plan` và xác định `candidate_tasks` có thể tách.
2. Chạy `independence_checks` cho từng hướng delegation.
3. Nếu bất kỳ check nào fail, fallback về `AGENTIC` hoặc `SEQUENTIAL_MULTI_ROLE`.
4. Chỉ tạo `worker_assignments` khi task thật sự độc lập.
5. Ghi `merge_strategy` và `verify_strategy` trước khi chốt recommendation.
6. Ghi `coordination_guards` để tránh drift, conflict hoặc verify gap.

## Quy Tắc Chất Lượng

- `quick` mặc định nghiêng về `AGENTIC`.
- `SUBAGENT` và `MULTI_AGENT` không được dùng khi `owned_paths` chồng lấn mạnh.
- `worker_assignments` không được mơ hồ kiểu “xử lý phần còn lại”.
- `verify_strategy` phải đủ để biết ai chịu trách nhiệm kết luận evidence cuối.
- Mặc định viết và trao đổi bằng tiếng Việt có dấu.
- File văn bản phải lưu UTF-8.

## Luật Ra Quyết Định

- `AGENTIC` là default an toàn khi task nhỏ hoặc tightly coupled.
- `SUBAGENT` phù hợp khi chỉ có một lane hoặc một worker độc lập cần tách ra, nhưng merge path và verify path đã rõ.
- `SEQUENTIAL_MULTI_ROLE` phù hợp khi cần nhiều góc nhìn nhưng chưa đủ điều kiện cho worker song song.
- `MULTI_AGENT` chỉ phù hợp khi có từ hai lane `task độc lập` trở lên, với `owned_scope` hoặc `owned_paths` tương đối rời nhau, `merge_path` rõ và `verify_path` rõ.
- Nếu verification owner chưa rõ, recommendation không được là `SUBAGENT` hoặc `MULTI_AGENT`.
- Nếu task vừa khám phá context xong mà boundary chưa ổn định, giữ `AGENTIC`.

## Điều Kiện Hoàn Tất

- Có `execution_mode_recommendation` rõ ràng.
- Có `independence_checks` với verdict đọc được.
- Có `worker_assignments`, `merge_strategy`, `verify_strategy` khi recommendation không phải `AGENTIC`.
- Có `blocked_reasons` hoặc `coordination_guards` đủ để người triển khai quyết định bước tiếp.
