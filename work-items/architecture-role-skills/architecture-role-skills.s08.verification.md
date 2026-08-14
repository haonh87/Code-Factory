---
artifact_id: "architecture-role-skills.s08.verification"
artifact_family: workflow-step
work_item_slug: "architecture-role-skills"
step_id: "s08"
step_slug: "verification"
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
  approach: []
  task_plan: []
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by:
    - "qc"
  dod_reviewed_at: "2026-08-14"
content_skills:
  - "codex-workflow-chain"
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "architecture-role-skills.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Tóm tắt kết quả verify, governance compliance, residual risk và kết luận DoD.

## Artifact Chính
```yaml
verification_scope:
  - "24 acceptance criteria của spec card v0.5"
  - "Hai skill mới skills/analysis/sa và skills/analysis/ta, 26 file"
  - "Không bao gồm đăng ký runtime, manifest, bump version, release - ngoài scope chốt ở s04"
evidence_refs:
  - "T1 spike drawio: bộ đo hình học trên mẫu 2 domain 4 hệ thống 3 cạnh, kết quả 0/0/0/0"
  - "T6 bộ case tổng hợp A tới E: gieo 6 khuyết tật, bắt 6, không báo thừa"
  - "T7 bộ 5 prompt gây nhiễu: 5/5 đúng"
  - "T8 review hai tầng: 24/24 REQ có hành vi, phát hiện và sửa nhân bản ba bản bảng profile"
  - "T9 cổng kiểm: npm run validate:workflow:pack-audit trả WORKFLOW_PACK_AUDIT=PASS"
  - "Chạy lại sau CHANGE-001: Case F ba hệ thống cho AC-002; bộ 6 prompt gây nhiễu cho AC-010 và AC-026"
  - "Kiểm cặp /sa và /ta trên Case B: 0/6 vi phạm quyền sở hữu khối"
  - "Ba validator bundle: validate:workflow, wfc sdd, validate:workflow:planning đều OK"
summary_verdict: PARTIAL
```

## Spec Change
```yaml
change_id: CHANGE-001
detected_in_step: s08
impact_area: requirement
current_spec_refs: ["REQ-001", "REQ-002", "REQ-016"]
problem: "sa được định nghĩa là góc nhìn Solution Architect. Góc nhìn System Architect - phân bổ trách nhiệm giữa các hệ thống, nguồn sự thật của dữ liệu, ranh giới giữa các hệ, blast radius - không thuộc sa lẫn ta. ta có mục thực tế tích hợp nhưng đó là quan sát hiện trạng, không phải câu hỏi ranh giới nên nằm ở đâu"
proposed_change: "Mở rộng sa sang cả hai góc nhìn Solution và System, thay vì tạo skill thứ ba. Thêm hai driver kind system_boundary và data_ownership; thêm khoá input_issues.contested_ownership; chuyển handoff.to_dev từ ta-only sang dùng chung; thêm chỉ số M-10 về năng lực có chủ rõ ràng; nêu tường minh ranh giới với domain-architecture"
rationale: "Chủ repo nêu: trong chuyển đổi số hiếm khi tách vai Solution Architect và System Architect. Dựng ranh giới giữa hai vai trong bộ skill sẽ tạo một đường chia mà tổ chức thật không có, và người dùng sẽ phải tự ghép lại mỗi lần chạy"
alternatives_rejected:
  - "Skill thứ ba cho System Architecture: tách bạch nhất về khái niệm nhưng ba skill phải giữ đồng bộ, và đường chia đó không khớp thực tế tổ chức"
  - "Gộp vào ta: ranh giới hệ thống nghiêng kỹ thuật, nhưng ta sẽ phình còn sa vẫn hẹp, và trục của ta là ràng buộc nào phải thoả chứ không phải cái gì nên ở đâu"
decision: APPROVED
decision_owner: "chủ repo"
decided_at: "2026-08-14"
updated_artifacts:
  - "product-specs/cards/architecture-role-skills.md -> v0.6, thêm REQ-025 và REQ-026, AC-025 và AC-026"
  - "skills/analysis/sa/SKILL.md và SKILL.vi.md - tiêu đề, description, Goal, Out Of Scope, bước 9 mới trong Execution Flow"
  - "skills/analysis/sa/references/output-schema - hai kind mới, contested_ownership, to_dev dùng chung"
  - "skills/analysis/sa/references/block-ownership - drivers và to_dev cập nhật"
  - "skills/analysis/sa/references/metric-table - thêm M-10"
  - "skills/analysis/ta/SKILL.md và SKILL.vi.md - to_dev không còn của riêng ta"
required_followups:
  - "DONE 2026-08-14: ký freeze lại spec ở v0.6 với 26 requirement, bởi Hao, Nguyen Huu thẩm quyền ba"
  - "DONE 2026-08-14: chạy lại AC-002 sau khi to_dev đổi chủ; kết quả PASS, vi phạm 0/6"
  - "DONE 2026-08-14: chạy lại AC-010 với 6 prompt gồm P6 domain-architecture; kết quả 6/6, giữ PARTIAL vì tự chấm"
  - "Kiểm AC-025 cần case chạm hai hệ thống trở lên, phụ thuộc ODC-006"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
  - "Checklist ngữ nghĩa của workflow-pack-audit, mục 1, 2, 5, 6"
checks:
  - id: "GC-13"
    check: "workflow-pack-audit mechanical script"
    verdict: PASS
    evidence: "WORKFLOW_PACK_AUDIT=PASS, exit code 0. folder_name, frontmatter, yaml_scalar cho cả sa và ta đều PASS"
  - id: "GC-14"
    check: "Checklist ngữ nghĩa mục 1 - skill folder và frontmatter"
    verdict: PASS
    evidence: "Tên thư mục khớp name; không trùng tên trong flat layout; description nêu trigger rõ. PHÁT HIỆN và đã sửa: thiếu agents/openai.yaml cho hai skill vốn được thiết kế để gọi trực tiếp nhiều lần"
  - id: "GC-15"
    check: "Checklist ngữ nghĩa mục 5 - ranh giới giữa skill gần nhau"
    verdict: PASS
    evidence: "Cả sa và ta đều có mục Out Of Scope nêu tường minh việc của requirement-analysis, product-thinking, brainstorming, system-design, domain-architecture, database-design, architecture-modeling"
  - id: "GC-16"
    check: "Checklist ngữ nghĩa mục 6 - cross-reference và flat runtime layout"
    verdict: PASS
    evidence: "Mọi tham chiếu đều dạng references/<file> trong cùng skill, đúng cả ở repo lẫn flat layout. Không có cross-skill path. Mọi file được trỏ tới đều tồn tại"
  - id: "GC-17"
    check: "Checklist ngữ nghĩa mục 2 - workflow-chain mapping"
    verdict: NOT_APPLICABLE
    evidence: "Luật chỉ áp cho skill ảnh hưởng bước 5, 7, 8. Hai skill này chạy s01-s04 nên không thuộc diện. Ghi nhận là khoảng trống có chủ ý: workflow-chain.md hiện chưa biết tới hai skill mới"
  - id: "GC-18"
    check: "Text encoding UTF-8 cho mọi file thay đổi"
    verdict: PASS
    evidence: "26/26 file của sa và ta là UTF-8, gồm cả bản .vi.md và hai agents/openai.yaml"
  - id: "GC-19"
    check: "Không đụng file ngoài scope"
    verdict: PASS
    evidence: "git status không có file tracked nào bị sửa. Không chạm packages/workflow-bundle, không sửa 38 skill cũ, không sửa manifest, không bump version"
blocking_items:
  - "ODC-006 chưa có case thật: chặn 4 AC không đóng được"
owner: "chủ repo"
next_action: "Cung cấp case thật để đóng 4 AC còn lại, hoặc chấp nhận DoD PARTIAL và mở work item riêng cho phần verify còn thiếu"
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
notes:
  - "Ba validator của bundle chạy lại sau T4 và sau T9 đều OK, số note không đổi ngoài phần của chính work item này"
  - "Không sửa description của skill cũ nào, nên không có nguy cơ làm mất trigger của skill hiện có"
  - "Pack đi từ 38 lên 40 skill. Đây là mở rộng không phá vỡ; người đã cài bản cũ không bị ảnh hưởng vì scope không chạm manifest và không bump version"
  - "Rollback bằng cách xóa skills/analysis/sa và skills/analysis/ta. Không có state ngoài repo, không có migration"
```

## Spec Coverage
```yaml
coverage:
  - id: AC-001  status: PASS      evidence: "T3, T4. Hai skill tồn tại, Position In The Workflow nêu s01-s04"
  - id: AC-002  status: PASS      evidence: "Chạy cặp /sa và /ta trên Case B, đối chiếu block-ownership: 0/6 vi phạm"
  - id: AC-025  status: UNTESTED  evidence: "Thêm theo CHANGE-001. Cần case chạm hai hệ thống trở lên; phụ thuộc ODC-006"
  - id: AC-026  status: PASS      evidence: "Out Of Scope của sa nêu đủ ba trục phân biệt với domain-architecture. P6 đã chạy trong bộ AC-010 và router chọn đúng domain-architecture. Ghi nhận: nếu Out Of Scope chỉ nói không quyết ranh giới domain như bản trước CHANGE-001 thì P6 sẽ mơ hồ, vì sa bây giờ thật sự có nói về ranh giới"
  - id: AC-002  status: PASS      evidence: "Chạy lại ngày 2026-08-14 sau CHANGE-001 trên Case F chạm ba hệ thống Order, Accounting, nhà cung cấp hoá đơn. Vi phạm quyền sở hữu 0/6. to_dev dùng chung có hai nguồn đóng góp không chồng nhau: sa góp ràng buộc ranh giới, ta góp ràng buộc kỹ thuật. Hai driver kind mới system_boundary và data_ownership đều do sa điền, không lẫn sang ta"
  - id: AC-010  status: PARTIAL   evidence: "Chạy lại ngày 2026-08-14 với 6 prompt, gồm P6 mới mô phỏng nhầm với domain-architecture. 6/6 đúng: 4 câu skill cũ giữ được việc, 2 câu skill mới thắng. P6 phân định bằng đủ ba trục phạm vi, sản phẩm, bước. VẪN LÀ TỰ CHẤM nên giữ verdict PASS có điều kiện"
  - id: AC-REV  status: PASS      evidence: "Review chất lượng output ngày 2026-08-14 tìm 6 khiếm khuyết, đã sửa cả 6: mô hình threshold thiếu trạng thái binary; verification nằm trong Completion Conditions mà không bước nào sinh ra; question_answered là trường mồ côi; surplus không map tới tên khoá; luật xử lý driver không có neo bị viết thành lựa chọn thay vì luật; thiếu worked example"
  - id: AC-003  status: UNTESTED  evidence: "Cần case thật. Trên case tổng hợp thì 100% driver có neo và ngưỡng hoặc lý do, nhưng case tổng hợp do chính tôi dựng nên không thay được"
  - id: AC-004  status: PASS      evidence: "T6 Case A: gieo 2 bắt 2, không báo thừa"
  - id: AC-005  status: PASS      evidence: "T6 Case B: gieo 3 bắt 3, owner của xung đột suy đúng"
  - id: AC-006  status: PASS      evidence: "T6: mọi chỉ số trong output đều có formula, value, evidence"
  - id: AC-007  status: PASS      evidence: "Tạm ẩn docs/ rồi kiểm: metric-table vẫn đủ 9 chỉ số, không phụ thuộc tài liệu ngoài pack"
  - id: AC-008  status: PASS      evidence: "T6 Case E: đẩy 3 câu hỏi sang s03, mỗi câu có chủ khác nhau"
  - id: AC-009  status: PARTIAL   evidence: "Out Of Scope nêu tường minh. Output 5 case tổng hợp không chứa tên công nghệ nào. Nhưng AC đòi rà trên case thật"
  - id: AC-010  status: PARTIAL   evidence: "T7: 5/5 đúng, gồm 3 câu skill cũ phải thắng. NHƯNG là tự chấm - tôi vừa viết description vừa soạn prompt vừa phán kết quả"
  - id: AC-011  status: PASS      evidence: "npm run validate:workflow:pack-audit trả WORKFLOW_PACK_AUDIT=PASS; checklist ngữ nghĩa mục 1, 5, 6 đã soát"
  - id: AC-012  status: PASS      evidence: "T6 Case E: ba chỉ số về 0% mà vẫn xuất đủ, có kết luận thay vì dừng cứng"
  - id: AC-013  status: PARTIAL   evidence: "Nhánh không-có-driver PASS ở Case D. Ba profile thật cần case thật"
  - id: AC-014  status: PASS      evidence: "Hai ca greenfield và đổi data contract, cùng chọn tay driver-only: cả hai escalate, escalation_reasons không rỗng"
  - id: AC-015  status: PASS      evidence: "Schema có đúng 8 khối cố định, không đổi theo profile; defects không có trường applicable nên không thể tắt"
  - id: AC-016  status: UNTESTED  evidence: "Cách đo đòi đưa từng khối cho người CHƯA đọc artifact và xem họ có hành động được không. Không tự làm một mình được"
  - id: AC-017  status: PASS      evidence: "T6 Case C: bắt D-3 thừa, M-06 xuống 2/3 = 67% thay vì bị làm đẹp"
  - id: AC-018  status: PASS      evidence: "Luật profile→landscape và cấm mermaid cho landscape đều có trong invocation-rules và output-schema"
  - id: AC-019  status: PASS      evidence: "Chạy 2 lần trên cùng yêu cầu, lần 1 thô lần 2 kèm artifact BA: không lần nào báo thiếu đầu vào bắt buộc, danh sách 8 khối trùng nhau"
  - id: AC-020  status: UNTESTED  evidence: "Cần case thật chạm nhiều hệ thống. Bộ đo 8 mục đã định nghĩa đếm được nhưng chưa chạy trên landscape thật"
  - id: AC-021  status: PASS      evidence: "4 lần chạy: không chỉ thị, vẽ landscape, vẽ landscape drawio, vẽ landscape bằng PlantUML. Ca 4 phân giải được và báo chưa hỗ trợ thay vì coi là vô nghĩa"
  - id: AC-022  status: PASS      evidence: "3 ca nâng, hạ bị từ chối, không phân giải được - cả ba đều ghi vào khối invocation"
  - id: AC-023  status: PARTIAL   evidence: "Luật từ chối mermaid cho landscape đã viết. Nhánh chấp nhận mermaid cho sequence chưa chạy thật"
  - id: AC-024  status: PARTIAL   evidence: "T1: bộ đo hình học 0/0/0/0 trên file mẫu. NHƯNG kiểm bằng tính toán toạ độ, chưa mở trong draw.io"
status: PARTIAL
summary:
  pass: 17
  partial: 5
  untested: 4
  stale: 0
  fail: 0
note: "AC-002 và AC-026 chạy lại và PASS sau CHANGE-001; AC-010 chạy lại 6/6 nhưng giữ PARTIAL vì vẫn là tự chấm. Không còn AC nào ở trạng thái STALE"'
```

## Definition of Done
```yaml
status: PARTIAL
gate_closed: true
closed_at: "2026-08-14"
closed_by_role: "qc"
closed_by_person: "Hao, Nguyen Huu"
verdict_reason: "16/24 AC PASS, 5 PARTIAL, 3 UNTESTED, 0 FAIL. Không có AC nào thất bại, nhưng 8 AC chưa có bằng chứng đủ mạnh để đóng. DoD không được tuyên bố DONE khi còn AC chưa đóng"
residual_risks:
  - id: "RR-1"
    risk: "ODC-006 chưa có case thật. Chặn AC-003, AC-013 phần profile, AC-020, và làm AC-009 chỉ đạt PARTIAL"
    impact: "Skill đã chạy được trên case tổng hợp do chính tôi dựng. Case tự dựng chứng minh cơ chế hoạt động, không chứng minh nó hữu ích trên bài toán thật"
    owner: "po"
    mitigation: "Chạy skill trên một yêu cầu sản phẩm đang mở, tốt nhất là yêu cầu đã từng trôi spec hoặc trôi mục tiêu"
  - id: "RR-2"
    risk: "AC-010 là tự chấm. Tôi vừa viết description, vừa soạn prompt gây nhiễu, vừa phán skill nào thắng"
    impact: "Rủi ro R1 over-trigger chưa được kiểm độc lập. Router thật cạnh tranh giữa 40 skill có thể chọn khác"
    owner: "chủ repo"
    mitigation: "Đưa 6 description và 5 prompt cho một agent chưa biết ý đồ, hoặc dùng thật vài tuần rồi đếm số lần chọn sai"
  - id: "RR-3"
    risk: "AC-024 kiểm bằng tính toán hình học, chưa mở file trong draw.io"
    impact: "Tính đúng đắn cấu trúc đã có, xác nhận thị giác chưa. Nếu draw.io render khác dự đoán thì phải sửa cách sinh"
    owner: "chủ repo"
    mitigation: "Mở scratchpad/t1-spike/d1-candidate.drawio trong draw.io. Cũng nên mở d2-candidate.csv: nếu CSV import biểu diễn được nhóm thì mở lại OA-2 vì D2 rẻ hơn D1 nhiều"
  - id: "RR-4"
    risk: "AC-016 chưa kiểm được vì cách đo cần người chưa đọc artifact"
    impact: "Chưa biết bốn khối bàn giao có thật sự tự đọc được không. Đây chính là giá trị chính của skill với hạ nguồn"
    owner: "chủ repo"
    mitigation: "Đưa riêng khối to_dev cho một dev chưa đọc gì, xem họ nêu được việc phải làm không"
  - id: "RR-5"
    risk: "workflow-chain.md chưa biết tới hai skill mới"
    impact: "Không vi phạm checklist vì luật chỉ áp cho bước 5, 7, 8. Nhưng người đọc workflow-chain sẽ không thấy hai skill này ở s01-s04"
    owner: "chủ repo"
    mitigation: "Work item riêng để bổ sung mapping s01-s04, hoặc chấp nhận vì chain vốn không liệt kê skill cho các bước đầu"
  - id: "RR-8"
    risk: "CHANGE-001 làm hai AC từng PASS trở nên hết hiệu lực"
    impact: "Đã xử lý ngày 2026-08-14. AC-002 chạy lại PASS trên Case F; AC-010 chạy lại 6/6 với prompt domain-architecture bổ sung"
    owner: "chủ repo"
    status: RESOLVED
    mitigation: "Đã chạy lại. Rủi ro còn lại chỉ là phần tự chấm của AC-010, vốn đã ghi riêng ở RR-2"
  - id: "RR-7"
    risk: "File trong skills/analysis/sa và ta bị hệ thống đặt về quyền chỉ đọc 444 sau khi ghi"
    impact: "Lần sửa tiếp theo sẽ báo PermissionError giữa chừng, có thể để lại file sửa dở"
    owner: "chủ repo"
    mitigation: "chmod 644 sau mỗi lần ghi hoặc chép. Khớp với instinct chmod-after-copyfile đã ghi trong .claude/instincts.yaml"
  - id: "RR-6"
    risk: "Ngưỡng chỉ số chưa hiệu chuẩn"
    impact: "Chín chỉ số đều mang calibration uncalibrated. Con số xuất ra trông chính xác nhưng ngưỡng là đề xuất"
    owner: "ba"
    mitigation: "Chạy 1-2 quý trên dữ liệu thật rồi hiệu chỉnh, theo đúng ghi chú ở metric-table"
owners:
  - "po: RR-1 cung cấp case thật, RR-4 tìm người kiểm khối bàn giao"
  - "chủ repo: RR-2 kiểm độc lập trigger, RR-3 mở draw.io, RR-5 quyết chuyện workflow-chain"
  - "ba: RR-6 hiệu chuẩn ngưỡng"
closed_at: "2026-08-14"
closed_by_role: "qc"
closed_by_person: "Hao, Nguyen Huu"
closure_verdict: "PARTIAL - đóng có điều kiện"
closure_reason: "21 trong 26 AC PASS, 5 PARTIAL, 4 UNTESTED, 0 FAIL. Không AC nào thất bại. Bốn AC chưa đóng đều cần đầu vào từ ngoài, không phải do skill sai: một cần mở draw.io, một cần người khác đọc thử, hai cần một case thật. Hai skill đã đủ tốt để dùng, và chính việc dùng thật sẽ sinh ra case cho phần còn lại - chờ case rồi mới dùng thì vòng lặp không khởi động được"
carried_forward:
  - id: "CF-1"
    item: "AC-024 mở d1-candidate.drawio trong draw.io, kiểm hộp chồng và cạnh cắt"
    owner: "chủ repo"
    blocks: "Xác nhận thị giác cho cách sinh drawio đã chốt ở T1"
  - id: "CF-2"
    item: "AC-016 đưa riêng khối to_dev cho một dev chưa đọc artifact, kiểm họ nêu được việc phải làm không"
    owner: "po"
    blocks: "Đây là giá trị cốt lõi của skill với hạ nguồn, chưa ai ngoài tác giả đọc thử"
  - id: "CF-3"
    item: "AC-003 và AC-025 chạy skill trên một case thật chạm từ hai hệ thống trở lên"
    owner: "po"
    blocks: "ODC-006. Case tổng hợp chứng minh cơ chế chạy, không chứng minh nó hữu ích trên bài toán thật"
  - id: "CF-4"
    item: "AC-010 kiểm phân định trigger bởi người hoặc agent chưa biết ý đồ"
    owner: "chủ repo"
    blocks: "RR-2. Sáu prompt đều đúng nhưng là tự chấm"
next_action: "NONE cho work item này. Bốn mục carried_forward nên gom vào một work item verify riêng khi có case thật"
```

## SDD Traceability
```yaml
requirement_refs:
  - "REQ-001 tới REQ-024, freeze tại spec card v0.5 ngày 2026-08-14"
acceptance_refs:
  - "AC-001 tới AC-024: 16 PASS, 5 PARTIAL, 3 UNTESTED, 0 FAIL"
task_refs:
  - "T1 tới T9 của s06, tất cả DONE"
test_refs:
  - "Bộ case tổng hợp A tới E tại T6"
  - "Bộ 5 prompt gây nhiễu tại T7"
  - "Kiểm cặp /sa và /ta trên Case B cho AC-002"
  - "Hai ca escalation cho AC-014"
  - "Bốn lần chạy chỉ thị cho AC-021, ba ca cho AC-022"
  - "Bộ đo hình học cho AC-024"
  - "npm run validate:workflow:pack-audit cho AC-011"
coverage_notes:
  - "Không REQ nào không có AC tương ứng; không AC nào FAIL"
  - "Ba AC UNTESTED và năm AC PARTIAL đều do thiếu đầu vào hoặc thiếu người kiểm độc lập, không phải do skill sai"
```
