# Tài Liệu Tham Chiếu Execution Runtime

Tài liệu này bổ sung cho `workflow-chain.md`.

- `workflow-chain.md` trả lời: step nào, skill nào, artifact nào, gate nào.
- Tài liệu này trả lời: chọn `agentic` hay `multi-agent`, chia role ra sao, handoff thế nào, merge thế nào và fallback thế nào để chạy thực tế theo hướng `Codex-first`.
- Ví dụ thực thi cụ thể nằm ở `end-to-end-examples.md`.

## Phạm Vi

- Áp dụng cho execution runtime của workflow coding 8 bước.
- Ưu tiên Codex trước; giữ cấu trúc đủ trung lập để sau này port sang Claude hoặc agent runtime khác.
- `NotebookLM` là skill tích hợp tool ngoài để nghiên cứu/tóm lược corpus lớn; không thay thế note `.md` nguồn sự thật.

## Nguyên Tắc Runtime

- Mặc định mọi step bắt đầu ở `execution_mode=agentic`.
- Chỉ nâng lên `multi_agent` khi step contract đã đủ rõ và có lợi ích phối hợp thực sự.
- `step-goal-contract` là contract gốc; execution runtime không được đổi goal, scope, done criteria của step.
- `step-goal-auditor`, `definition-of-ready-gate`, `definition-of-done-gate` vẫn là guardrail bắt buộc khi step yêu cầu.
- Note `.md` chính của step là nơi duy nhất được xem là nguồn sự thật cho kết luận của step.
- Output từ `notebooklm` chỉ là context phụ trợ; mọi kết luận chính thức phải được chốt lại vào note `.md` hoặc artifact workflow chuẩn.

## Chính Sách Chọn Execution Mode Theo Codex-First

### Cửa Vào `agentic`

Dùng `agentic` khi thỏa phần lớn các điều kiện sau:

- Step chỉ có một ownership boundary chính.
- Context đủ nhỏ để một agent giữ được sự nhất quán.
- Không cần song song hóa để giảm thời gian hoặc giảm tải ngữ cảnh.
- Verify của step không cần tách người làm và người kiểm chứng.

### Cửa Vào `multi_agent`

Chỉ dùng `multi_agent` khi đồng thời thỏa cả 2 nhóm điều kiện dưới đây.

Nhóm 1, readiness tối thiểu:

- Đã có `step-goal-contract` ổn định cho step.
- Đã xác định được `coordinator_role`.
- Đã xác định được `verification_owner` hoặc cách audit cuối step.
- Đã có `merge_strategy` cho output cuối.
- Đã chia được `owned_scope` hoặc `owned_paths` tương đối rời nhau.

Nhóm 2, complexity signal:

- `multi_boundary`: step đụng nhiều backend/frontend/data boundary.
- `parallelizable_work`: có nhiều phần việc độc lập có thể làm song song.
- `large_context`: số lượng nguồn hoặc code area quá lớn với một agent.
- `separate_verification`: cần tách execution với review/verify để giảm bias.
- `tool_specialization`: có role phải dùng tool ngoài hoặc skill chuyên biệt như `notebooklm`, `database-change-review`.

### Parallel Budget Mặc Định

Để rollout an toàn trên Codex trước, dùng budget bảo thủ:

- Step 1-4: `coordinator + tối đa 2 worker`.
- Step 5-6: `coordinator + tối đa 3 worker`.
- Step 7-8: `coordinator + tối đa 4 worker` khi ownership rõ và verify path tách bạch.

Nếu chưa chứng minh được lợi ích song song, giảm về `agentic` hoặc `sequential multi-role`.

### Fallback Rules

- Nếu `owned_paths` chồng lấn nhiều, fallback về `agentic` hoặc `sequential multi-role`.
- Nếu worker trả output thiếu evidence, coordinator không merge; worker phải làm lại hoặc escalation.
- Nếu external tool như `NotebookLM` unavailable do auth/network, fallback về đọc tay hoặc flow research khác và ghi rõ limitation.
- Nếu final audit không thể xác nhận traceability hoặc quality gate, step không được đóng dù partial outputs đã có.

## Role Contract Chuẩn

### `coordinator`

- Mục tiêu: khóa shared contract, chia việc, gom output, chốt handoff cuối step.
- Sở hữu: `execution_policy`, `worker_assignment`, `merge_report`, note `.md` nguồn sự thật.
- Không được: giao việc mà không có `owned_scope` rõ; merge output thiếu evidence; bỏ qua final audit.
- Input tối thiểu: `step-goal-contract`, upstream artifacts, execution mode đã chọn.
- Output bắt buộc: assignment rõ, merge report, handoff rõ cho step sau hoặc blocker.

### `analyst`

- Mục tiêu: bóc tách requirement, business goal, open questions, acceptance criteria draft.
- Sở hữu: phần phân tích nội dung ở step 1-4 hoặc input phân tích cho step 5.
- Không được: tự chốt approach kỹ thuật hoặc đóng step nếu không phải coordinator.
- Skill thường dùng: `requirement-analysis`, `product-thinking`.

### `architect`

- Mục tiêu: chốt option analysis, architecture detail và boundary bị tác động.
- Sở hữu: phần thiết kế ở step 5 và input cho step 6.
- Không được: lấn sang implementation path ngoài scope design đã giao.
- Skill thường dùng: `brainstorming`, `system-design`, `domain-architecture`, `frontend-architecture`, `database-design`.

### `builder`

- Mục tiêu: thực thi code/config/doc trong boundary được giao.
- Sở hữu: `owned_paths`, `owned_scope`, implementation evidence.
- Không được: sửa path ngoài ownership nếu chưa được reassignment; tự merge vào output cuối của step.
- Skill thường dùng: `implementation`.

### `tester`

- Mục tiêu: chạy verify và thu thập evidence test/scan/review.
- Sở hữu: verification evidence theo assignment.
- Không được: tự kết luận DoD cuối step nếu không phải verification owner/coordinator.
- Skill thường dùng: `testing`, `code-scan-review`, `database-change-review`.

### `auditor`

- Mục tiêu: đối chiếu output cuối với contract và gate.
- Sở hữu: audit verdict, gap list, recommendation.
- Không được: viết lại output nghiệp vụ thay cho coordinator hoặc worker.
- Skill thường dùng: `step-goal-auditor`, `definition-of-ready-gate`, `definition-of-done-gate`.

### `notebooklm-researcher`

- Mục tiêu: dùng `notebooklm` để đọc/tóm lược corpus lớn, nhiều nguồn ngoài hoặc knowledge notebook.
- Sở hữu: notebook/query/output nghiên cứu, không sở hữu kết luận cuối của step.
- Không được: coi output NotebookLM là source of truth; mọi kết luận phải được chuẩn hóa lại trong artifact workflow.
- Step thường áp dụng: step 1, 3, 5 và khi cần ở step 8.
- Skill thường dùng: `notebooklm`.

## Handoff Protocol

### Luật Chung

- Mọi assignment phải trỏ về cùng một `shared_contract_ref`.
- Worker chỉ được handoff về `coordinator`, không handoff trực tiếp sang step tiếp theo.
- Handoff phải có `status`, `summary`, `outputs_produced` và `evidence`.
- Coordinator chỉ merge output khi `done_when` của assignment đã được đối chiếu tối thiểu.
- Nếu worker dùng tool ngoài như `NotebookLM`, phải log lại nguồn, notebook hoặc query liên quan.
- Final audit luôn chạy trên output đã merge, không audit từng mảnh rời như thể đó là output cuối step.

### Trạng Thái Assignment

- `PLANNED`: đã xác định assignment nhưng chưa phát cho worker.
- `READY`: input cho assignment đã đủ.
- `IN_PROGRESS`: worker đang xử lý.
- `HANDOFF`: worker đã trả output về coordinator.
- `MERGED`: coordinator đã nhận và tích hợp output.
- `BLOCKED`: assignment bị chặn bởi input, tool, conflict hoặc constraint.
- `CANCELLED`: assignment bị hủy do replan hoặc fallback.

## Tích Hợp `NotebookLM` Trong Workflow

`NotebookLM` là optional integration skill, không phải gate bắt buộc.

Dùng `NotebookLM` khi có ít nhất một tín hiệu sau:

- Có trên 3 nguồn tài liệu dài cần tổng hợp nhanh.
- Cần query lặp lại trên cùng một corpus.
- Cần bóc tách insight từ tài liệu ngoài codebase như spec, research, docs hoặc transcripts.

Không dùng `NotebookLM` để:

- Thay cho `step-goal-contract`.
- Thay cho quyết định cuối trong note workflow.
- Thay cho verify kỹ thuật trực tiếp trên codebase.

Mẫu áp dụng theo step:

- Step 1: hỗ trợ restate khi user cung cấp nhiều tài liệu nguồn.
- Step 3: gom open questions từ corpus lớn.
- Step 5: tổng hợp design constraints hoặc comparative research.
- Step 8: chỉ dùng để tổng hợp tài liệu release/compliance ngoài codebase nếu thật sự cần.

## Codex-First Runtime Behavior

- Nếu runtime Codex hỗ trợ delegation/sub-agent, `coordinator` có thể phát assignment song song theo budget ở trên.
- Nếu runtime không hỗ trợ sub-agent hoặc tool delegation ổn định, vẫn dùng cùng spec này nhưng chạy ở chế độ `sequential multi-role`: một agent lần lượt đóng các role khác nhau và ghi lại handoff như thể là nhiều agent logic.
- `multi_agent` không được bật chỉ vì user nói “hãy song song hóa”; coordinator vẫn phải kiểm tra entry conditions.
- Coordinator phải cập nhật note `.md` ít nhất ở 3 checkpoint: chọn execution mode, phát assignments, hoàn tất merge.
- Với step 7 và step 8, nếu verify owner chưa rõ thì không bật `multi_agent`.

## Lộ Trình Rollout Khuyến Nghị

1. Phase 1: bật `execution_mode`, `execution_roles`, `execution_policy` cho mọi step nhưng giữ runtime thực tế chủ yếu là `agentic`.
2. Phase 2: pilot `multi_agent` cho step 5, 7 và 8 trên work item đủ lớn.
3. Phase 3: thêm `notebooklm-researcher` cho các work item research-heavy hoặc nhiều tài liệu ngoài.
4. Phase 4: sau khi Codex ổn định, tách phần trung lập runtime để port sang Claude.

## Mẫu Output Theo Runtime

### `execution-policy`

```yaml
execution_mode: agentic|multi_agent
selection_reason: []
complexity_signals: []
shared_contract_ref: ""
parallel_budget: 1|2|3|4
coordinator_role: ""
verification_owner: ""
fallback_mode: agentic|sequential_multi_role
external_research:
  notebooklm: NONE|OPTIONAL|REQUIRED
  expected_outputs: []
notes: ""
```

### `worker-assignment`

```yaml
assignment_id: ""
step_id: ""
shared_contract_ref: ""
role: ""
owned_scope: []
owned_paths: []
skills: []
inputs: []
done_when: []
depends_on: []
status: PLANNED|READY|IN_PROGRESS|HANDOFF|MERGED|BLOCKED|CANCELLED
handoff_format: worker-handoff-report
```

### `worker-handoff-report`

```yaml
assignment_id: ""
role: ""
status: HANDOFF|BLOCKED|PARTIAL
summary: ""
outputs_produced: []
artifact_refs: []
code_refs: []
evidence: []
external_tools_used:
  - tool: ""
    purpose: ""
    refs: []
open_issues: []
recommended_next_action: ""
```

### `merge-report`

```yaml
step_id: ""
execution_mode: multi_agent
coordinator_role: ""
merged_assignments: []
rejected_assignments: []
conflicts_resolved: []
source_of_truth_updated: true|false
final_artifacts: []
residual_risks: []
ready_for_audit: true|false
```

### `execution-escalation`

```yaml
step_id: ""
raised_by_role: ""
reason_type: INPUT_GAP|OWNERSHIP_CONFLICT|MERGE_CONFLICT|TOOL_FAILURE|QUALITY_GAP|TIMEBOX_BREACH
description: ""
blocking_items: []
fallback_recommendation: AGENTIC|SEQUENTIAL_MULTI_ROLE|REPLAN|USER_DECISION
next_action: ""
```

### `notebooklm-research-capture`

```yaml
skill: notebooklm
notebook_id: ""
objective: ""
source_count: 0
sources: []
queries: []
key_findings: []
citations_or_refs: []
open_questions: []
limitations: []
handoff_target: ""
```