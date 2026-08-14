---
artifact_id: "architecture-role-skills.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "architecture-role-skills"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
  spec:
    - "ba"
  dor:
    - "ba"
  approach: []
  task_plan: []
  dod: []
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-14"
  dor_reviewed_by:
    - "ba"
  dor_reviewed_at: "2026-08-14"
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "architecture-role-skills.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Tóm tắt acceptance criteria, edge case, DoR và governance checks cho readiness.

## Existing System Baseline
```yaml
current_behavior_refs:
  - "skills/analysis/requirement-analysis - chuẩn hóa yêu cầu ở tầng nghiệp vụ tại s01"
  - "skills/analysis/product-thinking - xác định mục tiêu nghiệp vụ và giá trị tại s02"
  - "skills/analysis/brainstorming - mở phương án giải pháp trước s05"
  - "skills/guardrails/definition-of-ready-gate - chốt DoR tại s04, nơi nhận đầu ra của skill mới"
  - "skills/orchestration/codex-workflow-chain - hợp đồng đầu vào đầu ra của từng bước"
  - "Pack đang quản 38 skill, phát hành công khai ở workflow-bundle v2.3.1"
impacted_surfaces:
  - "Thư mục skills/ - thêm một thư mục skill mới, không sửa skill hiện có"
  - "Frontmatter description của skill mới - bề mặt mà router dùng để chọn skill"
  - "Khối output trong note s01 - thêm một khối, không đổi schema frontmatter"
compatibility_constraints:
  - "Không đổi schema của workflow note; validator hiện hành phải pass nguyên trạng"
  - "Không đổi hành vi của requirement-analysis và product-thinking; skill mới chỉ bổ sung"
  - "Work item đang chạy dở với chain hiện tại phải không bị ảnh hưởng"
  - "Giữ tương thích ngược của public release surface v2.3.1"
rollback_constraints:
  - "Rollback bằng cách xóa thư mục skill mới; không có migration dữ liệu, không có state cần hoàn nguyên"
  - "Vì scope không chạm manifest và không bump version, rollback không ảnh hưởng người dùng đã cài pack"
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    criterion: "Hai skill sa và ta tồn tại, gọi được bằng /sa và /ta; mỗi SKILL.md nêu rõ vị trí s01-s04 và đầu ra nạp cho s04"
    measure: "Gọi /sa và /ta; đọc mục Position In The Workflow của cả hai"
    status: PENDING
  - id: AC-002
    requirement: REQ-002
    criterion: "Lăng kính chia bằng quyền sở hữu khối; không skill nào điền khối do skill kia sở hữu"
    measure: "Đối chiếu output của /sa và /ta với bảng quyền sở hữu khối: đếm vi phạm quyền sở hữu = 0; với khối dùng chung, kiểm nội dung mỗi bên nằm đúng lăng kính. Không đo bằng đếm trùng văn bản"
    status: PENDING
  - id: AC-019
    requirement: REQ-019
    criterion: "Chạy được từ yêu cầu thô, không cần artifact BA; có artifact BA thì output giàu hơn nhưng không đổi cấu trúc"
    measure: "Chạy /sa 2 lần trên cùng yêu cầu: lần 1 thô, lần 2 kèm output requirement-analysis. Lần 1 không báo thiếu đầu vào bắt buộc; danh sách khối của 2 lần trùng nhau"
    status: PENDING
  - id: AC-020
    requirement: REQ-020
    criterion: "Bản vẽ landscape đạt chuẩn chất lượng tối thiểu, không phải sơ đồ cho có"
    measure: "Trên case driver+landscape: 100% phần tử có chủ sở hữu; đếm mũi tên hai chiều chưa phân tích = 0; đếm hộp gom mơ hồ kiểu middleware hay integration layer = 0; số phần tử trong giới hạn đọc được; mỗi phần tử trả lời được câu hỏi bỏ đi thì ai ra quyết định sai"
    status: PENDING
  - id: AC-021
    requirement: REQ-021
    criterion: "Chỉ thị tùy chọn sau tên skill được nhận và có hiệu lực"
    measure: "Bốn lần chạy trên cùng yêu cầu: /sa không chỉ thị theo profile mặc định; /sa vẽ system landscape làm khối landscape thành applicable=true có nội dung; /sa vẽ system landscape drawio đặt đúng render_format; /sa vẽ system landscape bằng định dạng lạ thì phân giải được thành yêu cầu định dạng rồi báo chưa hỗ trợ kèm đề xuất thay thế"
    status: PENDING
  - id: AC-022
    requirement: REQ-022
    criterion: "Chỉ thị nâng được, không hạ được dưới sàn escalation; chỉ thị mơ hồ thì hỏi lại; mọi phân giải được ghi lại"
    measure: "Ba ca: nâng thì áp dụng được; hạ trên case có escalation cứng thì bị từ chối kèm lý do; chỉ thị vô nghĩa thì hỏi lại đúng một lần. Cả ba ca kiểm khối invocation có phần đã phân giải và phần không phân giải được"
    status: PENDING
  - id: AC-023
    requirement: REQ-023
    criterion: "Định dạng chọn theo loại bản vẽ; mermaid bị từ chối cho landscape và integration architecture"
    measure: "Yêu cầu landscape kèm chỉ định mermaid: kiểm skill từ chối kèm lý do và đề xuất drawio. Yêu cầu sequence kèm mermaid: kiểm được chấp nhận. Với mỗi định dạng hỗ trợ, chạy lại bộ đo AC-020"
    status: PENDING
  - id: AC-024
    requirement: REQ-024
    criterion: "Bản vẽ drawio mở được và đạt chuẩn ngay, hoặc sau đúng một thao tác được nêu tường minh"
    measure: "Trên case driver+landscape: mở file trong draw.io; đếm hộp chồng nhau = 0; đếm cạnh cắt qua hộp = 0; kiểm nhóm domain chứa đúng hệ thống thuộc domain. Nếu cần thao tác tay thì kiểm output có nêu và chỉ đúng một bước"
    status: PENDING
  - id: AC-003
    requirement: REQ-003
    criterion: "100% driver có nguồn gốc dẫn về một stakeholder concern hoặc một ràng buộc, và có ngưỡng số hoặc lý do chưa lượng hóa được"
    measure: "Đếm trên output case thật: driver đạt / tổng driver = 100%"
    status: PENDING
  - id: AC-004
    requirement: REQ-004
    criterion: "Bắt được requirement mồ côi và mục tiêu không có requirement đỡ"
    measure: "Case dựng sẵn có 1 requirement mồ côi + 1 mục tiêu trống; skill phải báo đủ 2"
    status: PENDING
  - id: AC-005
    requirement: REQ-005
    criterion: "Bắt được driver mâu thuẫn, NFR chưa lượng hóa, giả định không chủ"
    measure: "Case dựng sẵn có đủ 3 khuyết tật; skill phải báo đủ 3"
    status: PENDING
  - id: AC-006
    requirement: REQ-006
    criterion: "100% chỉ số trong output có đủ ba phần chỉ số, công thức, bằng chứng"
    measure: "Đếm trên output: chỉ số đủ 3 phần / tổng chỉ số = 100%"
    status: PENDING
  - id: AC-007
    requirement: REQ-007
    criterion: "Bảng chỉ số hợp nhất nằm trong references/ của skill, tự đủ, không trỏ ra tài liệu ngoài pack"
    measure: "Đối chiếu bảng hợp nhất với hai nguồn gốc, đếm ô mâu thuẫn = 0. Kiểm độc lập: tạm ẩn thư mục docs/ rồi chạy lại skill, skill vẫn có đủ bảng chỉ số"
    status: PENDING
  - id: AC-008
    requirement: REQ-008
    criterion: "SKILL.md có điều kiện dừng kiểm tra được; case thiếu dữ liệu cho ra danh sách đẩy sang s03 kèm chủ sở hữu"
    measure: "Chạy case thiếu dữ liệu, kiểm output có mục bàn giao s03 và mỗi mục có owner"
    status: PENDING
  - id: AC-009
    requirement: REQ-009
    criterion: "Out Of Scope nêu tường minh việc chọn giải pháp thuộc system-design; output không chứa quyết định công nghệ cụ thể"
    measure: "Đọc Out Of Scope; rà output case thật tìm tên công nghệ hoặc pattern được chốt"
    status: PENDING
  - id: AC-010
    requirement: REQ-010
    criterion: "Router chọn đúng skill trên 5 prompt gây nhiễu"
    measure: "5 prompt mô phỏng nhầm với requirement-analysis, product-thinking, brainstorming, system-design; đếm lần chọn đúng = 5/5"
    status: PENDING
  - id: AC-011
    requirement: REQ-011
    criterion: "workflow-pack-audit pass: đủ 13 section, có SKILL.vi.md, UTF-8, không file mồ côi"
    measure: "Chạy Skill(workflow-pack-audit); kết quả PASS"
    status: PENDING
  - id: AC-012
    requirement: REQ-012
    criterion: "Case thiếu dữ liệu vẫn đi tiếp được sau khi khai lý do, không dừng cứng"
    measure: "Chạy case thiếu dữ liệu; kiểm skill kết thúc có kết luận thay vì báo lỗi chặn"
    status: PENDING
  - id: AC-013
    requirement: REQ-013
    criterion: "Ba profile chạy đúng; thay đổi không có yếu tố kiến trúc vẫn chạy và kết luận, không trả về none"
    measure: "3 case đại diện 3 profile, đối chiếu selected_profile và các khối có nội dung. Case thứ tư là thay đổi không có yếu tố kiến trúc: kiểm skill kết luận không có driver kiến trúc kèm lý do, không từ chối chạy"
    status: PENDING
  - id: AC-014
    requirement: REQ-014
    criterion: "Escalation cứng ghi đè được lựa chọn tay"
    measure: "Case greenfield và case đổi data contract, cùng chọn tay driver-only; cả hai phải escalate và trả escalation_reasons không rỗng"
    status: PENDING
  - id: AC-015
    requirement: REQ-015
    criterion: "Hình dạng output bất biến giữa các profile; khối defects luôn có mặt"
    measure: "So sánh danh sách khối của output driver-only với full; hai danh sách phải trùng; khối không áp dụng có applicable=false kèm reason không rỗng"
    status: PENDING
  - id: AC-016
    requirement: REQ-016
    criterion: "Đủ bốn khối bàn giao to_ba, to_dev, to_qc, to_devops, mỗi khối đọc độc lập được"
    measure: "Trên case thật, đưa riêng từng khối cho người chưa đọc artifact; người đó nêu được việc phải làm mà không cần hỏi thêm"
    status: PENDING
  - id: AC-017
    requirement: REQ-017
    criterion: "Driver không map vào khối bàn giao nào thì bị báo"
    measure: "Case dựng sẵn có 1 driver mồ côi bàn giao; skill phải báo ra"
    status: PENDING
  - id: AC-018
    requirement: REQ-018
    criterion: "Khối landscape luôn có mặt, đúng trạng thái theo profile, và không chứa model do skill tự dựng"
    measure: "Profile driver-only: applicable=false kèm lý do. Profile driver+landscape: có nội dung, rà không có phần tử model hay view do skill sinh"
    status: PENDING
edge_cases:
  - "Yêu cầu quá nhỏ, không có driver kiến trúc nào - skill phải kết luận không cần phân tích driver thay vì bịa ra driver cho đủ"
  - "Yêu cầu chỉ có mục tiêu, chưa có requirement nào - skill phải trả về danh sách câu hỏi thay vì tự sinh requirement"
  - "Mục tiêu tự mâu thuẫn nhau ngay từ đầu vào - skill phải báo lên chứ không chọn hộ một bên"
  - "Toàn bộ NFR đều chưa lượng hóa được vì chưa có baseline đo - skill phải cho đi tiếp kèm khai báo, đây là ca kiểm REQ-012"
  - "role=SA nhưng yêu cầu thuần kỹ thuật, không có mặt nghiệp vụ - skill phải nêu lệch lăng kính thay vì cố nặn ra phần nghiệp vụ"
  - "Đầu vào đã là spec chi tiết chứ không phải yêu cầu thô - skill phải chuyển sang chế độ kiểm truy vết thay vì trích lại driver"
out_of_scope:
  - "arch-brainstorm và arch-plan - hoãn theo yêu cầu ngày 2026-08-13"
  - "Chốt technical approach hay thiết kế giải pháp - thuộc s05 và system-design"
  - "Đăng ký runtime, manifest, bump bundleVersion, smoke test, release pack"
  - "Sửa nội dung 38 skill đang có, trừ description khi buộc phải phân định overlap"
  - "Hiệu chuẩn ngưỡng chỉ số bằng dữ liệu vận hành thật"
  - "Sửa validator để kiểm tự động khối metric - phụ thuộc ODC-004, nếu chốt là có thì phải mở work item riêng"
done_when:
  - "12 AC đều PASS với bằng chứng ghi tại s08"
  - "Skill chạy trọn vẹn trên case thật do chủ repo chỉ định, không phải sửa tay output"
  - "workflow-pack-audit PASS"
  - "Ba tài liệu bị ảnh hưởng đã ghi chú trạng thái hoãn: architecture-skill-specs-and-plan, sa-ta-competency-map, và phần định hướng ba skill trong s01"
behavioral_invariants:
  - "Skill không bao giờ tự chọn role thay người dùng"
  - "Skill không bao giờ chốt giải pháp hay công nghệ"
  - "Requirement mồ côi và mục tiêu không có gì đỡ luôn bị báo, không im lặng bỏ qua"
  - "Thiếu dữ liệu luôn có đường khai lý do và đi tiếp, không có nhánh dừng cứng"
  - "Mọi ngưỡng chỉ số xuất ra đều mang nhãn chưa hiệu chuẩn cho tới khi có dữ liệu thật"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - id: "GC-01"
    check: "Prefer the smallest solution that is correct"
    verdict: PASS
    evidence: "Scope thu từ 6 skill xuống 3 rồi xuống 1; phương án nhỏ hơn là bổ sung thẳng vào requirement-analysis đã được cân nhắc và ghi ở OQ-06, sẽ chốt tại s06"
  - id: "GC-02"
    check: "Spec/design before code - không tạo file skill trước khi gate mở"
    verdict: PASS
    evidence: "Chưa có file nào dưới skills/ được tạo; git status chỉ có work-items và product-specs"
  - id: "GC-03"
    check: "Disciplined brainstorming - có option analysis trước khi chốt approach"
    verdict: PENDING
    evidence: "Thuộc s06 theo Light gate host contract; hiện mới có hướng đề xuất, chưa so sánh đủ phương án"
  - id: "GC-04"
    check: "Tương thích ngược public release surface v2.3.1"
    verdict: PASS
    evidence: "Scope không chạm manifest, không bump version, không sửa skill hiện có"
  - id: "GC-05"
    check: "Text encoding UTF-8 cho tài liệu thay đổi"
    verdict: PASS
    evidence: "file -I trên 3 note work item và spec card đều charset=utf-8"
blocking_items:
  - "8 open decision trong Spec Card chưa chốt: ODC-002, ODC-003, ODC-004, ODC-006, ODC-007, ODC-008, ODC-009, ODC-010"
  - "Chưa có case thật để chạy thử skill - ODC-006, đây là blocker của AC-003, AC-004, AC-005, AC-009"
  - "Spec chưa freeze, chưa có reviewer và timestamp cho gate spec và dor"
owner: "chủ repo"
next_action: "Chốt 8 open decision, chỉ định case thật, rồi ký gate Spec + DoR để mở s06"
```

## Definition of Ready
```yaml
status: READY
approved_by_role: "ba"
approved_by_person: "Hao, Nguyen Huu"
approved_at: "2026-08-14"
blockers: []
residual_risks:
  - "ODC-006 chưa có case thật. Được chấp nhận mang sang s08: nó chặn verify chứ không chặn thiết kế. Sáu AC gồm AC-003, AC-009, AC-013, AC-014, AC-016, AC-020 sẽ không đóng được cho tới khi có case"
  - "ODC-014 chưa chốt cách sinh drawio. Thuộc technical approach nên xử lý tại s06, không chặn DoR"
  - "R17 phạm vi đi từ 8 lên 24 requirement trong một phiên. Spec đã freeze nên biến động tiếp phải đi qua spec-change"
owners:
  - "ba: chủ sở hữu spec, đã ký Spec và DoR ngày 2026-08-14"
  - "developer: chốt ODC-014 tại s06"
  - "po: cung cấp case thật cho ODC-006 trước khi s08 đóng"
notes:
  - "Ký bởi Hao, Nguyen Huu với thẩm quyền ba. Trường role_signoffs và gate_reviews chỉ nhận role theo enum của validator, nên danh tính người ký ghi tại đây"
  - "Đủ chín để mở s06: business goal, phạm vi in/out, 24 cặp REQ-AC có cách đo, baseline hệ thống, và toàn bộ quyết định cấu trúc output"
  - "DoR READY mở đường cho s06 Approach + Task Plan. Nó không mở s07: s07 chỉ mở khi s06 có receipt riêng"
```

## Spec Freeze
```yaml
status: READY
frozen_at: "2026-08-14"
frozen_by_role: "ba"
frozen_by_person: "Hao, Nguyen Huu"
spec_card_version: "0.6"
requirement_ids:
  - "REQ-001"
  - "REQ-002"
  - "REQ-003"
  - "REQ-004"
  - "REQ-005"
  - "REQ-006"
  - "REQ-007"
  - "REQ-008"
  - "REQ-009"
  - "REQ-010"
  - "REQ-011"
  - "REQ-012"
  - "REQ-013"
  - "REQ-014"
  - "REQ-015"
  - "REQ-016"
  - "REQ-017"
  - "REQ-018"
  - "REQ-019"
  - "REQ-020"
  - "REQ-021"
  - "REQ-022"
  - "REQ-023"
  - "REQ-024"
  - "REQ-025"
  - "REQ-026"
accepted_assumptions:
  - "ASM-001 cú pháp /{skill_name} là cơ chế sẵn có của Claude Code"
  - "ASM-002 hai skill đặt dưới skills/analysis/"
  - "ASM-003 ranh giới với requirement-analysis giữ bằng output chứ không bằng thứ tự chạy"
  - "ASM-004 output ghi vào note s01 dưới một khối riêng"
  - "ASM-005 hai skill dùng chung thư mục references"
blockers: []
notes:
  - "Freeze lần đầu tại v0.5 với 24 requirement ngày 2026-08-14. CHANGE-001 nâng lên v0.6 nên receipt đó hết hiệu lực"
  - "Freeze lại tại v0.6 với 26 requirement ngày 2026-08-14, ký bởi Hao, Nguyen Huu với thẩm quyền ba. Từ đây mọi thay đổi nội dung requirement phải mở spec-change mới"
  - "ODC-006 và ODC-014 còn mở nhưng không phải quyết định nội dung spec: một là cung cấp case kiểm thử, một là cách thực thi thuộc s06"
```

## SDD Traceability
```yaml
requirement_refs: []
acceptance_refs: []
task_refs: []
test_refs: []
```
