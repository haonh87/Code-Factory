---
artifact_id: "architecture-role-skills.s07.implementation"
artifact_family: workflow-step
work_item_slug: "architecture-role-skills"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
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
  approach: []
  task_plan: []
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "architecture-role-skills.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.

## Artifact Chính
```yaml
implemented_changes:
  - task: "T1 spike cách sinh drawio"
    status: DONE
    date: "2026-08-14"
    what: "Dựng mẫu landscape 2 domain, 4 hệ thống, 3 cạnh. Sinh thử hai ứng viên D2 CSV import và D1 mxGraph XML. Chạy bộ đo hình học của AC-024 trên D1"
    result: "Chốt D1. D2 không nghiệm thu được trong môi trường agent"
    files_touched: "Không có file nào trong repo. Toàn bộ sản phẩm spike nằm ở scratchpad, cố ý không commit"
  - task: "T2 ba file reference dùng chung"
    status: DONE
    date: "2026-08-14"
    what: "Viết ba reference tại skills/analysis/sa/references/ theo quy ước pack, mỗi file có bản EN chuẩn và bản .vi.md kèm theo"
    result: "6 file. metric-table 9 chỉ số M-01 tới M-09; block-ownership phủ đủ 8 khối schema; landscape-quality-bar 8 mục kiểm đếm được"
    files_touched:
      - "skills/analysis/sa/references/metric-table.md và .vi.md"
      - "skills/analysis/sa/references/block-ownership.md và .vi.md"
      - "skills/analysis/sa/references/landscape-quality-bar.md và .vi.md"
    verify_result: "UTF-8 6/6; đủ cặp EN+VI 3/3; frontmatter language đúng 3 en + 3 vi; block-ownership phủ 8/8 khối; metric-table có nhãn uncalibrated, luật xung đột nguồn và lý do tự đủ; không file nào phụ thuộc docs/ để chạy"
  - task: "T3 viết skill sa"
    status: DONE
    date: "2026-08-14"
    what: "SKILL.md 13 mục H2 gồm đủ 12 mục lõi cộng mục References, SKILL.vi.md song song, và reference output-schema mô tả 8 khối schema"
    result: "4 file mới. description viết để phân định với requirement-analysis, product-thinking, brainstorming, system-design bằng cách nêu đúng phần khác biệt rồi phủ định tường minh việc của từng skill kia"
    files_touched:
      - "skills/analysis/sa/SKILL.md"
      - "skills/analysis/sa/SKILL.vi.md"
      - "skills/analysis/sa/references/output-schema.md và .vi.md"
    verify_result: "12 mục lõi có mặt 12/12; EN và VI cùng 13 mục H2; 4/4 file references được SKILL.md trỏ tới, không mồ côi; 4/4 reference có cặp .vi.md; UTF-8 toàn bộ"
  - task: "Sửa tiêu chí verify sai trong s06"
    status: DONE
    date: "2026-08-14"
    what: "Phát hiện khi chạy T3: tiêu chí đếm mục H2 đúng bằng 12 là sai. Khảo sát pack cho thấy system-design 11 mục, domain-architecture 12, requirement-analysis 14, code-scan-review 15 - không có số cố định"
    result: "Sửa skill_section_contract và verify của T3, T4 thành 12 mục lõi phải có mặt, cho phép mục bổ sung. Ghi lý do ngay trong s06"
    files_touched:
      - "work-items/architecture-role-skills/architecture-role-skills.s06.task-breakdown.md"
    note: "Đây là sửa kế hoạch, không phải spec-change. REQ-011 nêu 13 section vốn đã được ghi nhận là cách diễn đạt, không phải ràng buộc đếm được"
  - task: "T4 viết skill ta và nhân bản reference dùng chung"
    status: DONE
    date: "2026-08-14"
    what: "SKILL.md và SKILL.vi.md cho ta theo cùng khuôn với sa nhưng đổi lăng kính sang quality attribute, ràng buộc kỹ thuật, thực tế tích hợp và giới hạn hệ cũ. Nhân bản bốn file reference dùng chung từ sa, giữ nguyên byte"
    result: "10 file mới. Bổ sung một mục Out Of Scope riêng cho ta là lằn ranh s05, vì system-design là hàng xóm gần nhất và dễ vượt nhất"
    files_touched:
      - "skills/analysis/ta/SKILL.md và SKILL.vi.md"
      - "skills/analysis/ta/references/ - 8 file nhân bản"
    verify_result: "diff 8/8 rỗng; 12/12 mục lõi có mặt; EN và VI cùng 13 mục H2; 4/4 reference được trỏ tới; UTF-8 toàn bộ; permission 644 sau khi chép"
  - task: "Bổ sung output-schema vào danh sách file dùng chung"
    status: DONE
    date: "2026-08-14"
    what: "Phát hiện khi chạy T4: s06 liệt kê ba file dùng chung, nhưng hai skill xuất cùng một schema nên output-schema phải là file dùng chung thứ tư"
    result: "Cập nhật shared_reference_files và verify của T4, T9 từ ba lên bốn file, tương ứng 8 lần diff tính cả bản .vi.md"
    files_touched:
      - "work-items/architecture-role-skills/architecture-role-skills.s06.task-breakdown.md"
    note: "Sửa kế hoạch, không phải spec-change. Nếu để hai bản schema khác nhau sẽ sinh đúng loại mâu thuẫn mà REQ-002 dựng ra để chặn"
  - task: "T5 profile, escalation, chỉ thị và landscape vào cả hai skill"
    status: DONE
    date: "2026-08-14"
    what: "Tách luật lệnh gọi thành reference dùng chung thứ năm invocation-rules thay vì nhân đôi vào hai SKILL.md. Ghi cách sinh drawio theo kết quả T1 vào landscape-quality-bar. Cập nhật mục References của cả bốn file SKILL"
    result: "24 file trong hai skill. Bốn nhóm chỉ thị đã token hóa thành extra_output, render_format, profile, audience để phân giải không mơ hồ"
    files_touched:
      - "skills/analysis/sa/references/invocation-rules.md và .vi.md - mới"
      - "skills/analysis/sa/references/landscape-quality-bar.md và .vi.md - thêm mục sinh drawio"
      - "skills/analysis/sa/SKILL.md, SKILL.vi.md, skills/analysis/ta/SKILL.md, SKILL.vi.md - thêm dòng References"
      - "skills/analysis/ta/references/ - đồng bộ lại toàn bộ 10 file"
    verify_result: "4/4 token nhóm chỉ thị có mặt; 4/4 trigger escalation; 3/3 ca raise, lower bị từ chối, unresolved; mục sinh drawio có kèm ghi chú giới hạn chưa mở draw.io; drift 10/10 diff rỗng; 24/24 UTF-8"
  - task: "Bổ sung invocation-rules vào danh sách file dùng chung"
    status: DONE
    date: "2026-08-14"
    what: "Luật chỉ thị và profile là luật chung cho hai skill; viết riêng vào từng SKILL.md sẽ trôi khỏi nhau"
    result: "shared_reference_files lên năm file, verify T9 lên 10 lần diff"
    files_touched:
      - "work-items/architecture-role-skills/architecture-role-skills.s06.task-breakdown.md"
    note: "Sửa kế hoạch lần thứ ba, cùng loại với hai lần trước. Cả ba đều là chi tiết thực thi lộ ra khi chạy, không đụng tới requirement nào"
  - task: "T6 bộ case tổng hợp A tới E"
    status: DONE
    date: "2026-08-14"
    what: "Dựng 5 case gieo sẵn khuyết tật đã biết, chạy /sa trên từng case theo Execution Flow, đối chiếu số khuyết tật bắt được với số đã gieo"
    result: "5/5 case PASS. Case A gieo 2 bắt 2; Case B gieo 3 bắt 3; Case C gieo 1 bắt 1; Case D không gieo và skill kết luận đúng là không có driver; Case E thiếu diện rộng và skill vẫn kết luận được, đẩy 3 câu hỏi sang s03 với 3 chủ khác nhau. Không case nào báo thừa"
    files_touched:
      - "Case và kết quả nằm ở scratchpad, cố ý không commit vì là fixture kiểm thử"
    verify_result: "AC-004 PASS 2/2; AC-005 PASS 3/3; AC-017 PASS 1/1; AC-013 nhánh không-driver PASS; AC-008 và AC-012 PASS"
  - task: "Sửa lỗ hổng schema do Case C phát hiện"
    status: DONE
    date: "2026-08-14"
    what: "REQ-017 đòi báo driver không map được vào khối bàn giao nào, nhưng output-schema không có khoá tương ứng trong defects. Bổ sung defects.surplus_drivers và sửa dòng luật M-06 cho khớp"
    result: "Schema có chỗ ghi; Case C chạy lại cho M-06 = 2/3 = 67% thay vì bị làm đẹp bằng cách nhét driver thừa vào một khối cho đủ"
    files_touched:
      - "skills/analysis/sa/references/output-schema.md và .vi.md"
      - "skills/analysis/ta/references/ - đồng bộ lại"
    note: "Đây là lỗ hổng thật giữa requirement và schema, chỉ lộ ra khi chạy case. Sửa schema chứ không sửa requirement, nên không phải spec-change"
  - task: "Sửa Case A vì khuyết tật gieo bị mơ hồ"
    status: DONE
    date: "2026-08-14"
    what: "Bản đầu đặt OBJ-1 là tăng doanh thu giờ thấp điểm, nhưng R-1 chọn khung giờ nhận hàng có thể lập luận là đỡ mục tiêu đó"
    result: "Đổi OBJ-1 sang giảm hao hụt nguyên vật liệu vì không R nào chạm tới. Khuyết tật gieo phải không mơ hồ, nếu không thì không phân biệt được skill bỏ sót với case viết nhập nhằng"
    files_touched:
      - "Fixture ở scratchpad"
  - task: "T7 phân định trigger"
    status: DONE
    date: "2026-08-14"
    what: "Soạn 5 prompt gây nhiễu chia 2 câu skill mới phải thắng và 3 câu skill cũ phải thắng, rồi đối chiếu từng câu với description của 6 skill ứng viên"
    result: "5/5 đúng. Ba câu skill cũ giữ được việc; hai câu skill mới thắng ở đúng chỗ khác biệt"
    finding: "Ở P1, P4, P5 chính VẾ PHỦ ĐỊNH của sa và ta là thứ loại chúng ra. Nếu description chỉ có vế khẳng định thì cả ba câu đó đều có nguy cơ bị cướp"
    limitation: "Đây là tự chấm - tôi vừa viết description, vừa soạn prompt, vừa phán ai thắng. Nó chứng minh description chứa đủ tín hiệu phân định, KHÔNG chứng minh router thật với 40 skill cạnh tranh sẽ chọn như vậy. AC-010 nên coi là PASS có điều kiện"
  - task: "T8 review hai tầng"
    status: DONE
    date: "2026-08-14"
    what: "Tầng 1 spec compliance đối chiếu 24 REQ với diff; tầng 2 code quality soát trùng lặp và độ rõ"
    tier1_result: "24/24 REQ có hành vi tương ứng trong skill"
    tier1_finding: "Phép kiểm đầu tiên dùng sai công cụ: đếm số lần REQ-xxx được trích dẫn cho ra 9/24. Nhưng ID requirement là từ vựng của work item, không phải của skill; skill không nên rải ID nội bộ mà phải THỂ HIỆN hành vi. Kiểm lại theo hành vi cho 24/24"
    tier2_result: "PASS sau khi sửa một phát hiện"
    tier2_finding: "Bảng profile và danh sách escalation tồn tại ở BA nơi: sa/SKILL.md, ta/SKILL.md và invocation-rules.md. Đúng loại drift mà invocation-rules sinh ra để chặn, nhưng bản gốc trong hai SKILL.md chưa được xóa khi tách file ở T5"
    tier2_fix: "Viết lại mục Decision Rule của cả bốn file SKILL: trỏ về invocation-rules cho phần dùng chung, chỉ giữ luật riêng của từng skill. Dòng trùng nguyên văn giữa hai SKILL.md giảm từ 61 xuống 49"
  - task: "T9 cổng kiểm pack và chống lệch"
    status: DONE
    date: "2026-08-14"
    what: "Chạy toàn bộ cổng kiểm của verify path"
    verify_result: "drift 10/10 diff rỗng; không file references mồ côi; đủ cặp EN và VI; frontmatter name và language đúng; 24/24 UTF-8; không sửa file tracked nào ngoài scope; ba validator của bundle đều OK"
  - task: "Review chất lượng output skill"
    status: DONE
    date: "2026-08-14"
    what: "Đọc lại toàn bộ SKILL.md và 5 reference, soát tính đúng, tính đủ, tính nhất quán của thuật ngữ và độ rõ của văn phong"
    findings_and_fixes:
      - "HIGH mô hình threshold giả định mọi driver đều là đại lượng đo được. Nghĩa vụ pháp lý hay contract không được vỡ là binary, ép vào not_quantified sẽ nhét vào mẫu số M-04 những mục vĩnh viễn không có số, làm chỉ số không bao giờ đạt được. SỬA: thêm status binary, và M-04 chỉ đếm driver mà một con số là có nghĩa"
      - "HIGH thiếu worked example trong khi skill anh em requirement-analysis có references/example.md. SỬA: thêm example.md và example.vi.md với 4 driver minh hoạ 4 tình huống quantified, percentile, binary, not_quantified"
      - "HIGH verification nằm trong Completion Conditions nhưng không bước nào trong Execution Flow sinh ra nó. SỬA: tách thành bước 7 riêng, nêu rõ với driver binary thì verification là bằng chứng duy nhất"
      - "MEDIUM question_answered là trường mồ côi: có trong schema, không được nhắc ở SKILL.md lẫn landscape-quality-bar. SỬA: đưa vào bước quyết landscape và vào mục nghiệm thu, kèm luật điền TRƯỚC khi đặt vẽ"
      - "MEDIUM surplus dùng trong văn xuôi nhưng không map tới khoá defects.surplus_drivers. SỬA: gọi đúng tên khoá ở cả Execution Flow lẫn Completion Conditions"
      - "MEDIUM luật xử lý driver không có neo viết là bỏ đi HOẶC ghi thành khuyết tật - một lựa chọn thay vì một luật. SỬA: luôn ghi vào defects.orphan_drivers, không bao giờ âm thầm bỏ"
    files_touched:
      - "skills/analysis/sa/ - SKILL.md, SKILL.vi.md, 4 reference sửa, 2 file example mới"
      - "skills/analysis/ta/ - đồng bộ toàn bộ"
    verify_result: "drift 12/12 rỗng; không file mồ côi; 12/12 mục lõi cả hai skill; UTF-8 toàn bộ; WORKFLOW_PACK_AUDIT=PASS"
    note: "Cũng phát hiện file bị đặt về quyền 444 sau khi ghi, gây PermissionError giữa chừng. Ghi thành RR-7 ở s08"
doc_changes:
  - "work-items/architecture-role-skills/architecture-role-skills.s06.task-breakdown.md - cập nhật OA-2 với spike_result, decision, caveat và evidence_paths; đánh dấu T1 DONE"
operational_notes:
  - "Bộ đo hình học kiểm 4 thứ trên toạ độ tính được: chồng lấn hộp hệ thống, chồng lấn container domain, containment hệ thống trong đúng domain, và cạnh cắt qua hộp không phải hai đầu. Kết quả 0/0/0/0"
  - "Thuật toán layout D1: domain xếp dọc thành cột, hệ thống xếp lưới 2 cột bên trong domain, cạnh định tuyến trực giao ba đoạn qua đường giữa. Đơn giản nhưng đủ vì landscape có hình dạng ràng buộc"
  - "GIỚI HẠN CẦN BIẾT: D1 PASS bằng tính toán hình học, chưa bằng mở trong draw.io. Đây là giới hạn của môi trường agent, không phải của phương án"
  - "D2 bị loại do không đánh giá được, không phải do thua chất lượng. Nếu chủ repo mở d2-candidate.csv trong draw.io và thấy nhóm hiển thị đúng thì nên mở lại OA-2 vì D2 rẻ hơn D1 nhiều"
  - "T7 DONE, T8 DONE, T9 DONE - toàn bộ 9 task của s06 đã xong"
```

## Delivery Rule Evidence
```yaml
behavior_change: NO
tdd_status: NOT_REQUIRED
tdd_test_refs: []
tdd_exception_reason: "T1 là spike sinh file mẫu để chọn phương án, không tạo hay đổi behavior production. Các task viết skill từ T2 trở đi là tài liệu markdown, cũng không có behavior production. Ghi nhận tại GC-10 của s06"
tdd_alternative_verify_path:
  - "Bộ đo hình học tính trên toạ độ cho AC-024"
  - "Chạy thử skill trên bộ case tổng hợp A tới E tại T6"
  - "Bộ 5 prompt gây nhiễu tại T7"
  - "workflow-pack-audit và check chống lệch tại T9"
change_risk_profile: QUICK_FIX
worktree_status: NOT_REQUIRED
worktree_refs: []
worktree_reason: "planning_track=quick; T1 không chạm file nào trong repo ngoài note của chính work item; rủi ro conflict bằng không. Ghi nhận tại GC-11 của s06"
review_status: COMPLETED
review_refs:
  - "T1 tự review: đối chiếu kết quả spike với decision_rule đã chốt ở OA-2 trước khi ghi decision"
  - "T8 review hai tầng theo thứ tự spec compliance rồi code quality, chạy trong s07 chứ không đẩy sang s08"
  - "T8 tầng 1: 24/24 REQ có hành vi tương ứng"
  - "T8 tầng 2: phát hiện nhân bản ba bản bảng profile và escalation, đã sửa ngay trong s07"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Làm trực tiếp trên nhánh main, không dùng branch riêng vì scope chỉ thêm thư mục mới"
verify_path:
  - "Sau T4 và T9: npm run validate:workflow, wfc sdd, wfc plan"
  - "T9: Skill(workflow-pack-audit) và diff ba file reference dùng chung"
  - "s08: đóng các AC không phụ thuộc ODC-006; 6 AC còn lại treo chờ case thật"
```

## SDD Traceability
```yaml
requirement_refs:
  - "REQ-023 và REQ-024 - T1 chốt cách sinh drawio phục vụ hai requirement này"
  - "REQ-002 quyền sở hữu khối, REQ-006 và REQ-007 bộ chỉ số, REQ-020 chuẩn chất lượng landscape - T2 hiện thực hóa bằng ba file reference"
  - "REQ-004 truy vết hai chiều, REQ-005 ba loại khuyết tật, REQ-008 điều kiện dừng, REQ-012 đường thoát khi thiếu dữ liệu, REQ-017 driver thừa - T6 kiểm bằng case gieo lỗi"
  - "REQ-013 profile ba mức, REQ-014 escalation cứng, REQ-021 bốn nhóm chỉ thị, REQ-022 chỉ nâng không hạ, REQ-023 định dạng theo loại bản vẽ, REQ-024 cổng chất lượng drawio - T5 hiện thực hóa trong invocation-rules và landscape-quality-bar"
  - "REQ-001 và REQ-002 skill sa, REQ-009 ranh giới không lấn s05, REQ-010 phân định trigger, REQ-011 quy ước pack, REQ-015 hình dạng bất biến, REQ-019 chạy độc lập - T3 hiện thực hóa trong SKILL.md và output-schema"
acceptance_refs:
  - "AC-024 - bộ đo hình học đã chạy trên mẫu, PASS bằng tính toán"
task_refs:
  - "T1 DONE"
  - "T7 DONE, T8 DONE, T9 DONE - toàn bộ 9 task của s06 đã xong"
test_refs:
  - "Bộ 5 prompt gây nhiễu tại T7: 5/5 đúng, có ghi giới hạn tự chấm"
  - "Cổng kiểm T9: drift, mồ côi, cặp EN/VI, frontmatter, encoding, validator bundle"
  - "Bộ đo hình học AC-024 trên d1-candidate.drawio: 0/0/0/0"
  - "Bộ case tổng hợp A tới E tại T6: 5/5 PASS, gieo 6 khuyết tật bắt 6, không báo thừa"
```
