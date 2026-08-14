---
artifact_id: "architecture-role-skills.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "architecture-role-skills"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/architecture-role-skills.md"
spec_status: frozen
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec: []
  dor: []
  approach:
    - "developer"
  task_plan:
    - "developer"
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-14"
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-14"
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "architecture-role-skills.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.

## Option Analysis
```yaml
options:
  - "O-A: mỗi skill tự đủ, nhân đôi ba file reference dùng chung kèm check chống lệch; cách sinh drawio quyết bằng spike T1 thử D2 CSV import trước rồi rơi về D1 mxGraph XML; quyền sở hữu khối thực thi bằng tài liệu và chạy thử, không sửa validator"
  - "O-B: mỗi skill tự đủ và nhân đôi reference như O-A, nhưng bỏ spike và chốt thẳng D1 mxGraph XML tự tính layout; nhanh hơn một nhịp, đổi lại mất cơ hội dùng engine layout sẵn có của draw.io nếu D2 vốn khả thi"
  - "O-C: đặt ba file reference dùng chung ở cấp repo dưới project-context và cài qua supportPolicies để có một nguồn duy nhất, phần còn lại như O-A; hết lo lệch bản sao, đổi lại nhét tài liệu kiến trúc vào thư mục governance là sai ngữ nghĩa"
recommended_option: "O-A"
trade_offs:
  - "O-A đánh đổi nguy cơ hai bản sao reference trôi khỏi nhau lấy sự độc lập của từng skill khi cài lẻ; chặn bằng check diff trong verify path, lệch thì fail"
  - "O-A tốn thêm một nhịp cho spike T1 so với O-B, đổi lại tránh viết xong mới phát hiện định dạng không đạt REQ-024"
  - "O-C giải quyết triệt để chuyện lệch bản sao nhưng làm sai ngữ nghĩa project-context vốn dành cho governance, nên bị loại dù kỹ thuật chạy được"
decision_detail:
  - id: "OA-1"
    question: "ASM-005 giả định hai skill dùng chung thư mục references. Flat-layout của runtime có cho phép không"
    finding: "Không. Mỗi skill là một thư mục độc lập chứa SKILL.md, SKILL.vi.md và references riêng. Tiền lệ duy nhất về ref ra ngoài là codex-workflow-chain trỏ tới ../../../project-context, tức tài liệu cấp repo cài qua supportPoliciesTargetRoot. Không có tiền lệ cross-skill reference"
    rejected: "Phương án cho ta trỏ sang ../sa/references bị loại vì vỡ khi người dùng cài lẻ một skill, và workflow-pack-audit nhiều khả năng báo file mồ côi"
    rejected_2: "Phương án gộp lại một skill không được xét vì REQ-001 và REQ-002 đã freeze; muốn đổi phải mở spec-change"
    resolution: "Nhân đôi vào cả hai skill, mỗi bản có header ghi canonical source là bản trong sa, kèm check diff trong verify path"
  - id: "OA-2"
    question: "ODC-014 sinh drawio bằng cách nào để đạt REQ-024"
    finding: "Chưa có dữ liệu xác minh cho hướng nào. Không chọn bằng phỏng đoán nên đưa vào spike có timebox"
    candidate_d1: "Sinh mxGraph XML, tự tính layout lưới, nhóm domain là container, cạnh trực giao. Kiểm soát hoàn toàn, không phụ thuộc tính năng công cụ, nhưng phải tự viết thuật toán đặt chỗ. Khả thi vì landscape có hình dạng ràng buộc, không phải bài toán dàn trang đồ thị tổng quát"
    candidate_d2: "Sinh định dạng CSV import của draw.io để engine layout của công cụ dàn trang. Output đơn giản hơn XML nhiều. Ẩn số chính là CSV import có biểu diễn được nhóm hoặc container theo domain hay không; không được thì mất containment và vi phạm REQ-020"
    candidate_d3: "Sinh structurizr-dsl rồi chuyển đổi bằng công cụ ngoài. Có layout sẵn nhưng thêm phụ thuộc vào đường chạy của skill và dễ vượt giới hạn một thao tác tay của REQ-024. Chỉ dùng khi D1 và D2 đều hỏng"
    decision_rule: "Chốt D2 khi và chỉ khi dựng được landscape mẫu có ít nhất 2 nhóm domain, mỗi nhóm từ 2 hệ thống, đạt AC-024. Không đạt thì chuyển D1 ngay, không tinh chỉnh D2 quá timebox"
    spike_result: "T1 chạy ngày 2026-08-14 trên mẫu 2 domain, 4 hệ thống, 3 cạnh. D2 sinh được file CSV import nhưng KHÔNG nghiệm thu được trong môi trường agent vì AC-024 đòi mở trong draw.io. Theo decision rule, không xác nhận được đạt thì chuyển D1. D1 sinh mxGraph XML với layout lưới tự tính và ĐẠT toàn bộ bộ đo hình học: hộp hệ thống chồng nhau 0, container domain chồng nhau 0, hệ thống nằm sai domain 0, cạnh cắt qua hộp 0"
    decision: "Chốt D1 mxGraph XML tự tính layout"
    caveat: "D1 PASS bằng kiểm hình học tính toán trên toạ độ, chưa phải bằng mở mắt trong draw.io. D2 bị loại vì không đánh giá được trong môi trường agent, KHÔNG phải vì thua về chất lượng. Chủ repo có draw.io nên có thể mở hai file mẫu để tự đối chiếu; nếu D2 hoá ra biểu diễn được nhóm thì mở lại OA-2 vì D2 rẻ hơn D1 đáng kể"
    evidence_paths:
      - "/private/tmp/claude-501/-Users-haonguyen87-Documents-workspaces-personal-projects-RnD-AI-Code-Factory/eda15a6d-a335-4e69-ae87-e36394efc8b0/scratchpad/t1-spike/sample-landscape.json"
      - "/private/tmp/claude-501/-Users-haonguyen87-Documents-workspaces-personal-projects-RnD-AI-Code-Factory/eda15a6d-a335-4e69-ae87-e36394efc8b0/scratchpad/t1-spike/d1-candidate.drawio"
      - "/private/tmp/claude-501/-Users-haonguyen87-Documents-workspaces-personal-projects-RnD-AI-Code-Factory/eda15a6d-a335-4e69-ae87-e36394efc8b0/scratchpad/t1-spike/d2-candidate.csv"
  - id: "OA-3"
    question: "REQ-002 quyền sở hữu khối được thực thi bằng gì"
    resolution: "Bảng quyền sở hữu nằm trong reference dùng chung, mỗi SKILL.md nêu khối mình sở hữu và khối bị cấm điền. Kiểm bằng đọc và bằng chạy thử"
    rejected: "Thêm kiểm quyền sở hữu vào validator của bundle bị loại đợt này vì sửa validator nằm ngoài scope đã chốt ở s04; ghi lại làm việc kế tiếp nếu cách tài liệu tỏ ra không đủ sau vài lần dùng thật"
```

## Technical Approach
```yaml
recommended_approach: "Hai skill độc lập sa và ta dưới skills/analysis/, mỗi skill tự đủ gồm SKILL.md, SKILL.vi.md và references/ riêng. Ba file reference dùng chung được nhân đôi vào cả hai skill kèm header canonical và check chống lệch. Định dạng bản vẽ chọn theo loại: drawio cho landscape và integration architecture, mermaid cho flow và sequence, structurizr-dsl cho model-as-code. Cách sinh drawio quyết bằng spike trước khi viết phần đó của skill"
why: "Giữ đúng mô hình hiện hành của pack là mỗi skill tự đủ, tránh cross-skill reference vốn không có tiền lệ và nhiều khả năng vỡ khi cài lẻ. Spike đặt trước phần khó nhất để rủi ro lộ sớm thay vì lộ lúc verify"
boundaries:
  - "Chỉ tạo mới dưới skills/analysis/sa/ và skills/analysis/ta/"
  - "Không sửa nội dung 38 skill đang có; nếu buộc phải phân định trigger thì chỉ được sửa trường description và phải ghi rõ ở s07"
  - "Không đụng packages/workflow-bundle/ gồm manifest, validator, script, runtime"
  - "Không đụng docs/, project-context/, work-items/ ngoài chính work item này"
  - "Không dựng model và không vẽ view trong skill; việc đó thuộc architecture-modeling"
file_layout:
  - "skills/analysis/sa/SKILL.md"
  - "skills/analysis/sa/SKILL.vi.md"
  - "skills/analysis/sa/references/output-schema.md"
  - "skills/analysis/sa/references/metric-table.md"
  - "skills/analysis/sa/references/block-ownership.md"
  - "skills/analysis/sa/references/landscape-quality-bar.md"
  - "skills/analysis/ta/ - cấu trúc y hệt"
shared_reference_files:
  - "metric-table.md - bảng chỉ số hợp nhất, tự đủ theo REQ-007"
  - "block-ownership.md - bảng quyền sở hữu khối theo REQ-002"
  - "landscape-quality-bar.md - chuẩn chất lượng bản vẽ theo REQ-020 và REQ-024"
  - "invocation-rules.md - BỔ SUNG NGÀY 2026-08-14 tại T5. Luật chỉ thị, chọn profile, escalation cứng và luật định dạng đều là luật dùng chung cho hai skill. Nhân đôi vào SKILL.md của từng bên sẽ để chúng trôi khỏi nhau, nên tách thành reference dùng chung thứ năm"
  - "output-schema.md - BỔ SUNG NGÀY 2026-08-14 tại T4. Ban đầu liệt kê là file riêng của từng skill, nhưng hai skill xuất cùng một schema nên nó phải là file dùng chung thứ tư, chịu cùng cơ chế chống lệch. Để hai bản khác nhau sẽ sinh đúng loại mâu thuẫn mà bảng quyền sở hữu dựng ra để chặn"
skill_section_contract:
  - "12 mục H2 lõi phải có mặt: Goal, Position In The Workflow, When To Use, Out Of Scope, Minimum Input, Required Output, Meaning Of Each Output, Normalizing Output In A Workflow Note, Execution Flow, Quality Rules, Decision Rule, Completion Conditions"
  - "SỬA NGÀY 2026-08-14 tại T3: pack KHÔNG có số mục cố định. Khảo sát thực tế cho thấy system-design 11 mục, domain-architecture 12, requirement-analysis 14, code-scan-review 15. Tiêu chí đúng là 12 mục lõi có mặt, cho phép mục bổ sung. Tiêu chí cũ đếm đúng bằng 12 được suy từ một mẫu duy nhất là architecture-modeling nên sai"
  - "Ghi chú: REQ-011 viết 13 section, thực tế là 1 tiêu đề H1 cộng 12 mục H2. Không mở spec-change cho khác biệt diễn đạt này, chỉ ghi nhận tại đây"
output_schema_blocks:
  - "invocation - chỉ thị đã phân giải và chưa phân giải, selected_profile, escalation_reasons"
  - "objectives - sa sở hữu"
  - "drivers - cả hai, mỗi bên phần lăng kính mình"
  - "landscape - luôn có mặt, applicable theo profile"
  - "defects - dùng chung, bắt buộc mọi profile"
  - "metrics - dùng chung"
  - "handoff - bốn khối to_ba, to_dev, to_qc, to_devops"
  - "stop_condition - điều kiện dừng theo REQ-008"
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "skills/analysis/ - thêm hai thư mục mới, không sửa bốn skill đang có"
  - "Bề mặt trigger của router - thêm hai description mới vào không gian lựa chọn của 40 skill"
compatibility_risks:
  - "Rủi ro cao nhất: hai description mới làm router chọn sai với requirement-analysis và product-thinking vốn đứng cùng đoạn chain. Kiểm bằng AC-010"
  - "Rủi ro trung bình: hai bản sao reference trôi khỏi nhau. Kiểm bằng check chống lệch"
  - "Rủi ro thấp: pack đi từ 38 lên 40 skill làm không gian chọn rộng thêm"
migration_notes:
  - "Không có migration. Thêm skill mới không đổi hành vi của work item đang chạy"
rollback_notes:
  - "Rollback bằng cách xóa hai thư mục skills/analysis/sa/ và skills/analysis/ta/"
  - "Không chạm manifest và không bump version nên người đã cài pack không bị ảnh hưởng"
  - "Nếu có sửa description của skill cũ để phân định trigger thì phải hoàn nguyên riêng; ghi lại từng file đã sửa ở s07"
```

## Verification Plan
- Check bắt buộc:
  - `Skill(workflow-pack-audit)` PASS — đủ mục, có `SKILL.vi.md`, UTF-8, không file references mồ côi
  - Check chống lệch: 3 file reference dùng chung ở `sa` và `ta` phải giống hệt nhau, lệch thì fail
  - AC-010: 5 prompt gây nhiễu, router chọn đúng 5/5
  - AC-024: bản vẽ drawio trên case landscape — hộp chồng nhau = 0, cạnh cắt qua hộp = 0, nhóm domain chứa đúng hệ thống
  - AC-002: đối chiếu output `/sa` và `/ta` với bảng quyền sở hữu, vi phạm = 0
  - AC-007: tạm ẩn `docs/` rồi chạy lại skill, skill vẫn tự đủ bảng chỉ số
  - AC-015: danh sách khối của profile `driver-only` trùng danh sách khối của `full`
  - Encoding UTF-8 cho mọi file tạo mới
- Risk note:
  - 6 AC (003, 009, 013, 014, 016, 020) **không đóng được** cho tới khi `ODC-006` có case thật — đã chấp nhận mang sang `s08`
  - Spike T1 là điểm rủi ro lớn nhất; nếu cả D2 và D1 đều không đạt `REQ-024` thì phải quay lại `s06` chứ không được nới chuẩn
- Rollout note nếu có:
  - Không có rollout. Đăng ký runtime, manifest, bump version và release đều nằm ngoài scope đã chốt ở `s04`

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - id: "GC-06"
    check: "Disciplined brainstorming - có option analysis đủ mức trước khi chốt approach"
    verdict: PASS
    evidence: "Ba option analysis OA-1, OA-2, OA-3; OA-1 có 4 phương án với 3 phương án bị loại kèm lý do; OA-2 có 3 phương án và một decision rule kiểm được"
  - id: "GC-07"
    check: "Prefer the smallest solution that is correct"
    verdict: PASS
    evidence: "OA-1 chọn O1 vì không đụng layout; OA-3 chọn P1 vì không phải sửa validator; OA-2 thử D2 rẻ nhất trước"
  - id: "GC-08"
    check: "Execution-oriented planning - task plan không có placeholder"
    verdict: PASS
    evidence: "Mỗi task có owned_paths cụ thể và verify riêng; không có task dạng viết test hay xử lý edge case chung chung"
  - id: "GC-09"
    check: "Spec/design before code"
    verdict: PASS
    evidence: "Spec freeze v0.5 ngày 2026-08-14, DoR READY; s07 chỉ mở sau khi s06 có receipt Approach và Task Plan"
  - id: "GC-10"
    check: "TDD for behavior change"
    verdict: NOT_APPLICABLE
    evidence: "Scope là tài liệu skill dạng markdown, không có behavior production. Verify thay bằng chạy thử skill trên case và bộ check ở Verification Plan. Ngoại lệ này ghi nhận tại đây, không cần waiver"
  - id: "GC-11"
    check: "Worktree cho thay đổi lớn hoặc rủi ro"
    verdict: NOT_APPLICABLE
    evidence: "planning_track=quick, chỉ thêm 2 thư mục mới, không sửa file đang có, rủi ro conflict thấp. Làm trực tiếp trên nhánh chính"
  - id: "GC-12"
    check: "Subagent chỉ cho task độc lập"
    verdict: NOT_APPLICABLE
    evidence: "execution_mode=agentic. T3 và T4 tuy owned_paths tách rời nhưng phụ thuộc chung T2, và ranh giới hai lăng kính cần một người giữ nhất quán"
blocking_items: []
owner: "chủ repo"
next_action: "NONE - gate Approach và Task Plan đã ký ngày 2026-08-14 bởi Hao, Nguyen Huu với thẩm quyền developer. Work item chuyển ACTIVE, s07 mở, bắt đầu từ T1"
gate_signoff:
  approach_approved_by_role: "developer"
  task_plan_approved_by_role: "developer"
  approved_by_person: "Hao, Nguyen Huu"
  approved_at: "2026-08-14"
```

## Artifact Chính
```yaml
tasks:
  - id: "T1"
    name: "Spike cách sinh drawio, chốt ODC-014"
    owned_paths:
      - "work-items/architecture-role-skills/ - ghi kết quả spike vào s06 dưới dạng cập nhật OA-2"
      - "Thư mục tạm để thử, không commit"
    steps:
      - "Dựng một landscape mẫu tối thiểu: 2 nhóm domain, mỗi nhóm 2 hệ thống, 3 cạnh giữa các hệ thống"
      - "Thử D2 trước: sinh CSV import của draw.io, kiểm có biểu diễn được nhóm hoặc container không"
      - "D2 không đạt thì chuyển D1: sinh mxGraph XML với layout lưới tự tính"
    verify: "Mở file trong draw.io, chạy bộ đo AC-024: hộp chồng nhau = 0, cạnh cắt qua hộp = 0, nhóm domain chứa đúng hệ thống"
    status: "DONE ngày 2026-08-14. Chốt D1. Xem OA-2 spike_result và caveat"
    timebox: "Dừng D2 ngay khi vượt timebox, chuyển D1, không tinh chỉnh tiếp"
    exit: "Ghi quyết định vào OA-2 kèm bằng chứng file mẫu; ODC-014 đóng"
    blocks: ["T5"]
  - id: "T2"
    name: "Viết ba file reference dùng chung"
    owned_paths:
      - "skills/analysis/sa/references/metric-table.md"
      - "skills/analysis/sa/references/block-ownership.md"
      - "skills/analysis/sa/references/landscape-quality-bar.md"
    steps:
      - "metric-table: hợp nhất chỉ số từ hai nguồn, mỗi dòng ghi nguồn gốc và nhãn uncalibrated, competency map thắng khi lệch"
      - "block-ownership: liệt kê từng khối trong schema kèm đúng một chủ, và danh sách khối mỗi skill bị cấm điền"
      - "landscape-quality-bar: chuẩn REQ-020 và REQ-024 dưới dạng checklist đếm được"
      - "Mỗi file có header ghi canonical source là bản trong sa"
    verify: "Đọc đối chiếu metric-table với hai nguồn gốc, đếm ô hai ngưỡng mâu thuẫn = 0. block-ownership phủ hết khối trong output_schema_blocks"
    exit: "Ba file hoàn chỉnh, chưa nhân bản sang ta"
    blocks: ["T3", "T4"]
  - id: "T3"
    name: "Viết skill sa"
    owned_paths:
      - "skills/analysis/sa/SKILL.md"
      - "skills/analysis/sa/SKILL.vi.md"
      - "skills/analysis/sa/references/output-schema.md"
    steps:
      - "SKILL.md đủ 12 mục H2 theo skill_section_contract"
      - "description nêu rõ tầng kiến trúc và thời điểm s01-s04, phân định với requirement-analysis và product-thinking"
      - "Out Of Scope nêu tường minh: không chọn giải pháp, không dựng model, không vẽ view"
      - "output-schema.md mô tả đủ 8 khối, mỗi khối có applicable và reason"
      - "SKILL.vi.md khớp nội dung"
    verify: "12 mục H2 lõi đều có mặt, cho phép mục bổ sung; mọi file trong references được SKILL.md trỏ tới; file -I cho charset=utf-8"
    status: "DONE ngày 2026-08-14"
    depends_on: ["T2"]
  - id: "T4"
    name: "Viết skill ta và nhân bản reference dùng chung"
    owned_paths:
      - "skills/analysis/ta/SKILL.md"
      - "skills/analysis/ta/SKILL.vi.md"
      - "skills/analysis/ta/references/ - toàn bộ"
    steps:
      - "Cùng khuôn với T3, đổi lăng kính sang quality attribute, ràng buộc kỹ thuật, tích hợp, hệ cũ"
      - "Nhân bản bốn file reference dùng chung từ sa sang ta, giữ nguyên byte, chmod 644 sau khi chép"
    verify: "diff bốn file dùng chung giữa sa và ta phải rỗng, tính cả bản .vi.md là 8 lần diff; 12 mục H2 lõi đều có mặt; UTF-8"
    status: "DONE ngày 2026-08-14"
    depends_on: ["T2", "T3"]
  - id: "T5"
    name: "Viết phần profile, escalation, chỉ thị và landscape vào cả hai skill"
    owned_paths:
      - "skills/analysis/sa/SKILL.md - mục Execution Flow và Decision Rule"
      - "skills/analysis/ta/SKILL.md - mục Execution Flow và Decision Rule"
      - "skills/analysis/sa/references/output-schema.md và bản ta tương ứng"
    steps:
      - "Bảng chọn architecture_profile ba mức theo REQ-013"
      - "Danh sách escalation cứng theo REQ-014, trả selected_profile và escalation_reasons"
      - "Luật chỉ thị theo REQ-021 và REQ-022: chỉ nâng không hạ, hỏi lại một lần, ghi vào khối invocation"
      - "Luật chọn định dạng theo REQ-023 gồm nhánh từ chối mermaid cho landscape"
      - "Cách sinh drawio theo kết quả T1"
    verify: "Chạy tay 4 ca của AC-021 và 3 ca của AC-022; kiểm ca yêu cầu landscape kèm mermaid bị từ chối kèm đề xuất drawio"
    status: "DONE ngày 2026-08-14. Luật viết vào reference dùng chung invocation-rules thay vì nhân đôi vào hai SKILL.md; cách sinh drawio theo kết quả T1 ghi vào landscape-quality-bar"
    depends_on: ["T1", "T3", "T4"]
  - id: "T6"
    name: "Dựng bộ case tổng hợp để kiểm phần không cần case thật"
    owned_paths:
      - "work-items/architecture-role-skills/ - ghi case và kết quả vào s08 khi tới bước verify"
    steps:
      - "Case A: 1 requirement mồ côi + 1 mục tiêu không có driver đỡ, cho AC-004"
      - "Case B: 1 cặp driver mâu thuẫn + 1 NFR chỉ có câu chữ + 1 giả định không chủ, cho AC-005"
      - "Case C: 1 driver không map vào khối bàn giao nào, cho AC-017"
      - "Case D: thay đổi không có yếu tố kiến trúc, cho AC-013 nhánh không có driver"
      - "Case E: thiếu dữ liệu diện rộng, cho AC-008 và AC-012"
    verify: "Chạy từng case qua /sa, kiểm skill báo đúng số khuyết tật đã gieo"
    depends_on: ["T5"]
  - id: "T7"
    name: "Kiểm phân định trigger"
    owned_paths:
      - "skills/analysis/sa/SKILL.md - trường description"
      - "skills/analysis/ta/SKILL.md - trường description"
    steps:
      - "Soạn 5 prompt gây nhiễu bám sát requirement-analysis, product-thinking, brainstorming, system-design"
      - "Chạy và ghi skill được chọn"
      - "Sai thì sửa description của skill mới trước; chỉ khi không đủ mới đụng description skill cũ, và phải ghi rõ file nào bị sửa"
    verify: "Đếm lần chọn đúng = 5/5, đây là AC-010"
    depends_on: ["T3", "T4"]
  - id: "T8"
    name: "Review sớm hai tầng trong s07"
    owned_paths:
      - "Toàn bộ diff của T2 tới T7"
    steps:
      - "Tầng 1 spec compliance: đối chiếu diff với 24 REQ đã freeze, tìm drift"
      - "Tầng 2 code quality: độ rõ của SKILL.md, không lặp giữa hai skill ngoài phần cố ý nhân đôi"
    verify: "Ghi kết quả hai tầng vào s07 dưới Delivery Rule Evidence; drift nào tìm được phải hoặc sửa hoặc mở spec-change"
    depends_on: ["T7"]
  - id: "T9"
    name: "Chạy cổng kiểm pack và chống lệch"
    owned_paths:
      - "Không sở hữu file mới, chỉ chạy kiểm và sửa theo phát hiện"
    steps:
      - "Skill(workflow-pack-audit)"
      - "diff năm file reference dùng chung giữa sa và ta, gồm cả bản .vi.md, tức 10 lần diff"
      - "file -I toàn bộ file tạo mới"
    verify: "audit PASS; diff rỗng; mọi file charset=utf-8"
    depends_on: ["T8"]
dependencies:
  - "T1 độc lập, chạy trước hoặc song song T2"
  - "T2 chặn T3 và T4"
  - "T3 chặn T4 vì ta nhân bản reference từ sa"
  - "T1, T3, T4 cùng chặn T5"
  - "T5 chặn T6; T3 và T4 chặn T7; T7 chặn T8; T8 chặn T9"
  - "Đường găng: T2 -> T3 -> T4 -> T5 -> T6, với T1 phải xong trước T5"
handoff_points:
  - "Sau T1: ODC-014 đóng, ghi quyết định và bằng chứng vào OA-2"
  - "Sau T5: hai skill chạy được đầy đủ, chuyển sang giai đoạn kiểm"
  - "Sau T9: bàn giao s08 kèm danh sách AC đã đóng và 6 AC còn treo chờ ODC-006"
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "Sau T4 và sau T9: chạy npm run validate:workflow, wfc sdd, wfc plan để chắc work item đang chạy không bị ảnh hưởng"
  - "Sau T7: nếu có sửa description của skill cũ thì chạy lại 5 prompt gây nhiễu cho chính skill cũ đó, tránh sửa xong nó lại mất trigger của mình"
compatibility_checkpoints:
  - "Không đụng packages/workflow-bundle/; kiểm bằng git status trước khi kết thúc mỗi task"
  - "Không bump bundleVersion; smoke test không nằm trong scope"
  - "Sau T9: git status chỉ được có skills/analysis/sa/, skills/analysis/ta/ và work-items của chính work item này"
migration_or_backfill_steps:
  - "Không có. Thêm skill mới không cần migration dữ liệu hay backfill"
rollback_or_restore_steps:
  - "Xóa skills/analysis/sa/ và skills/analysis/ta/"
  - "Nếu T7 có sửa description của skill cũ thì hoàn nguyên riêng từng file theo danh sách ghi ở s07"
  - "Không có state ngoài repo cần hoàn nguyên"
```

## SDD Traceability
```yaml
requirement_refs:
  - "REQ-001 tới REQ-024, freeze tại spec card v0.5"
acceptance_refs:
  - "AC-001 tới AC-024 tại s04"
task_refs:
  - "T1 tới T9"
test_refs:
  - "Bộ case tổng hợp A tới E tại T6"
  - "Bộ 5 prompt gây nhiễu tại T7"
  - "workflow-pack-audit và check chống lệch tại T9"
coverage_notes:
  - "REQ-003, REQ-009, REQ-013 phần profile thật, REQ-014, REQ-016, REQ-020 cần case thật của ODC-006; sáu AC tương ứng treo tới s08"
  - "REQ-011 nêu 13 section, thực thi bằng 1 tiêu đề H1 cộng 12 mục H2 theo khuôn hiện hành của pack; ghi nhận khác biệt diễn đạt, không mở spec-change"
```
