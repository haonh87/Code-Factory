---
language: vi
name: task-breakdown-planner
description: Chuyển technical approach thành execution-oriented plan theo tinh thần Superpowers writing-plans, với BA lane và DEV lane rõ ràng. Dùng khi đã có hướng kỹ thuật được chọn và cần kế hoạch đủ cụ thể để thi công an toàn, có ownership, path chạm chính, verify path và không placeholder.
---

# Task Breakdown Planner

> English: SKILL.md

Biến technical approach đã chốt thành task plan có thể thực thi ngay mà không buộc implementer phải tự phát minh lại design trong lúc code.

<HARD-GATE>
Không được dùng skill này để hợp thức hóa việc nhảy thẳng sang implement khi `s05 Technical Approach` chưa đủ rõ.

Plan draft không đồng nghĩa với `Task Plan pass`; plan vẫn phải qua human review hoặc gate review theo workflow.
</HARD-GATE>

## Khi Sử Dụng

- Sau khi đã có `recommended_design` hoặc technical approach đủ rõ.
- Trước khi bước vào `implementation`.
- Khi thay đổi đủ lớn để cần tách task, dependency, review checkpoint và verify path.

## Không Thuộc Phạm Vi

- Không redesign lại kiến trúc.
- Không trực tiếp sửa code production.
- Không thay testing cuối cùng.
- Không tạo plan placeholder kiểu “làm phần còn lại”.

## Đầu Vào Tối Thiểu

- `recommended_design`
- `acceptance_criteria`
- `constraints`
- `repo_context`
- `delivery_context`

Nếu chưa có path, module hoặc boundary chạm chính, phải phản ánh lại thay vì lập kế hoạch mơ hồ.

## BA Lane Và DEV Lane

### BA lane

Tập trung vào:

- trace task về acceptance criteria và business rule
- scope guard, non-goal, dependency business
- human review point cần có trước khi đi tiếp
- tình huống cần business clarification hoặc contract clarification

### DEV lane

Tập trung vào:

- file hoặc module sẽ chạm
- owned scope và dependency order
- verify path cho từng task hoặc batch
- TDD target cho behavior change
- review checkpoint kỹ thuật hoặc governance

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
implementation_goal: ""
ba_lane:
  acceptance_coverage: []
  scope_guards: []
  human_review_points: []
dev_lane:
  path_map: []
  technical_sequence: []
  tdd_targets: []
task_breakdown:
  - id: T1
    owner_role: developer
    name: ""
    objective: ""
    paths_in_scope: []
    dependencies: []
    outputs_expected: []
    review_checkpoint: ""
    verification_hint: ""
dependencies_global: []
risk_notes: []
verification_plan: []
notes_for_implementation: ""
```

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:

- Dùng template step 6 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Artifact Chính`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- `verification_plan` và rollout note có thể tóm tắt thêm ở section prose, nhưng không thay block YAML.

## Quy Trình Bắt Buộc

1. Đọc lại technical approach, acceptance criteria và constraint.
2. Lập `path_map` trước khi chia task.
3. Dùng `BA lane` để kiểm coverage của acceptance criteria và scope guard.
4. Dùng `DEV lane` để xác định owned scope, dependency chain, TDD target và verify path.
5. Chia task đủ nhỏ để review và verify riêng.
6. Với behavior change, ghi rõ task hoặc batch nào phải đi theo `test fail -> code -> test pass`.
7. Gắn `review_checkpoint` cho task rủi ro, task chạm contract, hoặc task chạm governance/release.
8. Quét lại plan để loại mọi placeholder.
9. Bàn giao sang `implementation`.

## Quy Tắc Chất Lượng

- Không chấp nhận placeholder như `xử lý edge case`, `thêm validation`, `viết test`, `sửa phần liên quan` nếu không nói rõ chạm đâu và kiểm thế nào.
- Mỗi task phải có `objective`, `paths_in_scope`, `outputs_expected` và `verification_hint`.
- `BA lane` phải bảo đảm acceptance criteria không bị rơi mất trong lúc chia task.
- `DEV lane` phải bảo đảm implementer không phải đoán lại path hoặc dependency.
- Mặc định trao đổi và tài liệu bằng tiếng Việt có dấu.
- File văn bản phải lưu UTF-8.

## Luật Ra Quyết Định

- Nếu một task quá lớn để verify riêng, phải tách tiếp.
- Nếu có dependency chặn toàn bộ implementation, đẩy lên sớm.
- Nếu có phần chỉ là nice-to-have, đưa ra ngoài plan chính.
- Nếu scope chạm release, deploy, migration hoặc rollback, phải tách checkpoint tương ứng thay vì giấu trong task chung.
- Không bắt buộc nhét full code block vào plan như Superpowers; ở repo này ưu tiên plan đủ thực thi, rõ ownership và verify path.

## Điều Kiện Hoàn Tất

- Có `BA lane` và `DEV lane` đủ để handoff không mơ hồ.
- Có `task_breakdown` đủ rõ để implement bắt đầu an toàn.
- Có `verification_plan` và `risk_notes`.
- Có `notes_for_implementation` đủ để bước implement không phải suy diễn lại design.

## Task contract v1 theo opt-in

YAML legacy vẫn là mặc định. Để s06 (kể cả Light) dùng v1, đặt số nguyên
`task_contract_version: 1` trong frontmatter; chuỗi có dấu nháy và mọi giá trị
khác đều không hợp lệ. Thay đồng thời payload task và trace: `## Main Artifact`
sở hữu một object JSON, `## Traceability` sở hữu một object JSON. Không giữ bản
YAML trùng nguồn sự thật. Các block và gate khác của step vẫn áp dụng.

Giữ các field task hiện có; thêm `kind` (`behavior`, `documentation`, `verification`)
và `verification` gồm `cwd`, `argv`, `test_refs`. Khai báo file cụ thể tương đối với
repo, cho phép file dự kiến chưa tồn tại; không cấp scope thư mục, glob, traversal
hay symlink thoát repo. Dependency phải tồn tại trong plan, không trùng, không tự
tham chiếu và không tạo chu trình.

Task behavior phải có ít nhất một file test thuộc `paths_in_scope` của chính nó.
Kind khác cần giải thích danh sách test rỗng trong `verification_hint`. Objective,
output và checkpoint phải cụ thể. `argv` là mảng token, không phải chuỗi lệnh shell;
không chấp nhận shell `-c` tương đương hoặc toán tử điều khiển đứng riêng. Validator
không chạy lệnh và không cấp quyền thực thi.

`acceptance_refs` khai báo AC thay đổi và phải khớp ID chính xác trong
`spec_refs.card` hoặc `spec_refs.srs`. Mỗi AC có đúng một mapping tới danh sách
ID task hợp lệ không rỗng. Người review vẫn kiểm tra độ đầy đủ của AC, phân loại
kind và việc test có thật sự chứng minh hành vi hay không.

Hai payload dưới đây minh họa hai owner; AC được tham chiếu phải tồn tại trong
spec sở hữu của dự án. Đây không phải artifact mới.

Payload Main Artifact:
```json
{
  "implementation_goal": "Preserve the first accepted event for duplicate IDs",
  "task_breakdown": [
    {
      "id": "T1",
      "owner_role": "developer",
      "name": "Reject duplicate events",
      "objective": "Preserve the first accepted event",
      "kind": "behavior",
      "paths_in_scope": [
        "src/events.js",
        "test/events.test.js"
      ],
      "dependencies": [],
      "outputs_expected": [
        "Duplicate event regression passes"
      ],
      "review_checkpoint": "Review AC-001 then code quality",
      "verification_hint": "Run the duplicate-event regression",
      "verification": {
        "cwd": ".",
        "argv": [
          "node",
          "test/events.test.js"
        ],
        "test_refs": [
          "test/events.test.js"
        ]
      }
    }
  ]
}
```

Payload Traceability:
```json
{
  "acceptance_refs": [
    "AC-001"
  ],
  "task_refs": [
    {
      "acceptance_ref": "AC-001",
      "task_ids": [
        "T1"
      ]
    }
  ]
}
```

Chạy `wfc plan --workflow-root work-items --project-root .` và các kiểm tra SDD,
governance áp dụng với cùng project root. Reader cũ không đọc được v1; giữ đường
viết legacy để rollback, không tự hạ cấp note v1 đã ký. JSON lỗi, key/owner trùng
và kiểu dữ liệu sai đều bị từ chối.
