---
artifact_id: "architecture-role-skills.s01.restate"
artifact_family: workflow-step
work_item_slug: "architecture-role-skills"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
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
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Tóm tắt yêu cầu, phạm vi ban đầu, ràng buộc và governance context mở đầu.

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes, human approves - mọi gate skill-pack là human-controlled"
  - "Prefer the smallest solution that is correct - chọn trục 3 skill thay vì 6"
  - "Spec/design before code - không tạo file skill trước khi s04/s06 có receipt"
required_reviews:
  - "spec: chủ repo duyệt content contract của skill pilot"
  - "dor: chủ repo duyệt Definition of Ready trước khi mở s06"
  - "approach + task_plan: chủ repo duyệt tại s06 theo Light gate host contract"
prohibited_actions:
  - "Tạo thư mục skill dưới skills/ trước khi s06 có receipt"
  - "Đăng ký runtime, bump bundleVersion, chạy release - nằm ngoài scope work item này"
  - "Sửa nội dung 38 skill đang có - chỉ được sửa description khi phân định overlap, và phải là work item riêng"
open_governance_questions:
  - "Skill pack là public release surface v2.3.1 - thêm skill mới có cần change package riêng khi tới bước release không"
```

## Artifact Chính
```yaml
raw_request: "Tôi muốn tạo skill role SA, TA cho mục đích brainstorming, specification, plan, sử dụng cú pháp /{skill_name}. Output của skill chính là các skill metrics, công thức và bằng chứng. Tạm thời chưa cần giai đoạn pilot, tôi muốn tập trung cho khâu làm rõ yêu cầu dưới role SA, TA, phục vụ và bổ sung cho chi tiết workflow phát triển sản phẩm, đảm bảo spec và giải pháp đúng mục đích, mục tiêu yêu cầu."
restated_request: "Bổ sung vào skill pack một skill làm rõ yêu cầu ở tầng kiến trúc, chạy được dưới cả hai lăng kính SA và TA, cắm vào đoạn s01-s04 của workflow chain hiện có. Nhiệm vụ của skill: biến một yêu cầu nghiệp vụ thô thành tập architecture driver có ngưỡng đo được, truy vết ngược được về mục tiêu, để spec chốt ở s04 và giải pháp chốt ở s05 không trôi khỏi mục đích ban đầu. Output bắt buộc kèm khối chỉ số gồm ba phần: chỉ số, công thức tính, bằng chứng."
request_type: FEATURE
user_problem_initial: "Đoạn s01-s04 của chain hiện do requirement-analysis và product-thinking phụ trách, cả hai đứng ở lăng kính BA/PO. Không có skill nào ép yêu cầu đi qua lăng kính kiến trúc: không tách được driver nào thực sự định hình kiến trúc, không lượng hóa NFR, không truy vết requirement ngược về mục tiêu, không phát hiện driver mâu thuẫn. Hệ quả thường gặp: spec chốt ở s04 trông đầy đủ nhưng tới s05 mới lộ ra ràng buộc kỹ thuật đảo ngược cả hướng giải pháp, hoặc giải pháp làm đúng spec mà lệch mục tiêu."
business_context_initial: "Repo đã có corpus nghiên cứu SA/TA gồm bản đồ 18 năng lực kèm chỉ số, khung học sâu 6 nhóm năng lực với hệ leading/lagging, và proposal 9 skill theo trục artifact vòng đời. Corpus ở trạng thái proposal, chưa hiện thực hóa. Năng lực A2 trong bản đồ - chuyển yêu cầu thành bài toán kiến trúc với driver có số - chính là ô mà work item này lấp."
scope_draft:
  in:
    - "Hai skill tên ngắn sa và ta, gọi bằng /sa và /ta; tên mang luôn ngữ nghĩa vai, không dùng tham số role"
    - "Hai skill chạy độc lập, chỉ cần yêu cầu thô; artifact BA nếu có là đầu vào bổ trợ chứ không phải điều kiện"
    - "Cổng chất lượng nghiệm thu bản vẽ landscape khi profile đòi, việc vẽ giao cho architecture-modeling"
    - "Chỉ thị tùy chọn bằng ngôn ngữ tự nhiên sau tên skill, ví dụ /sa vẽ system landscape drawio; không có chỉ thị thì chạy theo profile mặc định"
    - "Chỉ thị chỉ nâng được độ sâu, không hạ dưới sàn escalation; chỉ thị không phân giải được thì hỏi lại một lần, không đoán"
    - "Trích architecture driver từ yêu cầu thô: stakeholder, concern, ràng buộc, quality attribute scenario có ngưỡng số"
    - "Truy vết hai chiều: mọi requirement về được mục tiêu, mọi mục tiêu có ít nhất một requirement đỡ"
    - "Phát hiện driver mâu thuẫn, NFR chưa lượng hóa, giả định không có chủ"
    - "Content contract bắt buộc: khối metric + công thức + bằng chứng"
    - "Bảng chỉ số hợp nhất chép vào references/ của skill kèm ghi nguồn từng dòng, vì hai nguồn gốc nằm dưới docs/ đang bị gitignore"
    - "Điểm cắm vào chain: bổ sung cho s01-s03, nạp đầu vào cho s04, bàn giao sang s05"
    - "Phân định trigger với requirement-analysis, product-thinking, brainstorming, system-design"
    - "architecture_profile ba mức driver-only, driver+landscape, full quyết định độ sâu output; không có mức none, quyết định có gọi skill hay không thuộc router bên ngoài"
    - "Escalation cứng ghi đè profile chọn tay, theo đúng pattern hard trigger của SDD Light"
    - "Hình dạng output bất biến theo profile: khối không áp dụng mang applicable=false kèm lý do, không được vắng mặt"
    - "Hợp đồng bàn giao riêng cho BA, DEV, QC, DevOps - mỗi vai đọc độc lập được phần của mình"
    - "Khối landscape tiêu thụ output của architecture-modeling khi profile đòi, không tự dựng model"
  out:
    - "arch-brainstorm và arch-plan - hoãn theo yêu cầu ngày 2026-08-13, chưa bỏ khỏi định hướng"
    - "Giao hàng theo pilot nhiều đợt - đã bỏ theo yêu cầu ngày 2026-08-13"
    - "Đăng ký runtime, cập nhật manifest, bump bundleVersion, smoke test, release pack"
    - "Chín skill theo trục artifact vòng đời trong architecture-skill-specs-and-plan - hoãn, không bỏ"
    - "Sửa nội dung 38 skill đang có, trừ phần description khi buộc phải phân định overlap"
    - "Chốt technical approach hay thiết kế giải pháp - đó là việc của system-design ở s05"
    - "Hiệu chuẩn ngưỡng chỉ số bằng dữ liệu vận hành thật - cần 1-2 quý, thuộc work item sau"
constraints_initial:
  - "Pack là EN-first: bắt buộc có cả SKILL.md và SKILL.vi.md, encoding UTF-8"
  - "Skill phải đủ 13 section theo khuôn quy ước đọc từ domain-architecture và code-scan-review"
  - "Mọi file trong references/ phải được SKILL.md trỏ tới, không được có file mồ côi"
  - "Frontmatter description là thứ router dùng để chọn skill - phải nêu rõ tầng artifact và thời điểm"
  - "Gate của skill phải có đường khai lý do và đi tiếp khi thật sự không có dữ liệu, không được chặn cứng"
  - "Skill pack đang ở public release surface v2.3.1 - thay đổi phải giữ tương thích ngược"
assumptions_initial:
  - "Cú pháp /{skill_name} là cơ chế gọi skill sẵn có của Claude Code, tự hoạt động khi skill được đăng ký đúng chỗ - không cần xây thêm gì"
  - "Hai skill đặt dưới skills/analysis/ vì cùng đoạn chain với requirement-analysis và product-thinking, không phải skills/architecture/ như giả định ban đầu"
  - "Không dùng tham số role: tên skill chính là vai, gọi /sa hay /ta là đã xác định lăng kính"
  - "Ranh giới với requirement-analysis giữ bằng output chứ không bằng thứ tự chạy, vì hai skill mới chạy độc lập được từ yêu cầu thô"
  - "Hai skill dùng chung thư mục references cho bảng chỉ số và chuẩn chất lượng landscape, tránh chép đôi rồi lệch nhau"
open_questions_initial:
  - "Toàn bộ open question về thiết kế đã được chủ repo chốt ngày 2026-08-14; xem khối Decisions Resolved trong spec card"
  - "Còn mở duy nhất là ODC-006 chỉ định case thật; nó không chặn thiết kế ở s06 nhưng chặn cứng verify ở s08"
dependencies_initial:
  - "docs/research/sa-ta-competency-map.md - bản chuẩn về phân vai và 18 năng lực kèm chỉ số, ô A2 là ô work item này lấp"
  - "docs/plans/sa-ta-skill-metrics-deep-dive.md - hệ leading/lagging và cặp đối trọng chống Goodhart"
  - "docs/research/architecture-skill-specs-and-plan.md muc 1 - khuôn 13 section, muc 11.4 - bảng audit trigger overlap"
  - "skills/analysis/requirement-analysis và skills/analysis/product-thinking - hai skill sát nhất, phải phân định rõ"
  - "skills/guardrails/definition-of-ready-gate - nơi nhận đầu ra của skill ở s04"
  - "skills/orchestration/codex-workflow-chain references/workflow-chain.md - hợp đồng đầu vào đầu ra từng bước"
  - "Skill workflow-pack-audit - cổng kiểm drift bắt buộc"
risks_initial:
  - "R1 trigger overlap: đây là rủi ro cao nhất. Skill mới nằm đúng chỗ requirement-analysis và product-thinking đang đứng. Không phân định được bằng một câu description thì không nên tạo skill mới mà nên bổ sung vào skill sẵn có"
  - "R2 chỉ số chưa hiệu chuẩn: mọi ngưỡng trong hai nguồn đều là đề xuất, chưa đo trên dữ liệu thật"
  - "R3 hai nguồn chân lý về chỉ số: competency map và deep-dive đặt ngưỡng khác nhau ở vài ô"
  - "R5 gate quá chặt: skill bắt buộc xuất metric mà không có đường thoát sẽ bị chính người dùng bỏ qua"
  - "R6 viết skill mà chưa chạy thật trên case thật"
  - "R7 kéo dài discovery: skill làm rõ yêu cầu dễ biến thành cái cớ phân tích vô hạn. Phải có điều kiện dừng rõ ràng, đúng tinh thần disciplined brainstorming là output phải phục vụ s04 và s05 chứ không mở rộng mãi"
  - "R8 lấn sang s05: trích driver mà sa đà vào chọn giải pháp là lấn việc của system-design. Ranh giới phải nằm trong Out Of Scope của chính skill"
  - "R9 linh hoạt làm mất chất lượng: nếu khối không cần được phép biến mất khỏi output, vai hạ nguồn không phân biệt được không cần với quên. Chặn bằng REQ-015 hình dạng bất biến kèm applicable=false"
  - "R10 profile bị chọn nhẹ tay: người dùng chọn none hoặc driver-only cho một thay đổi thật ra chạm contract. Chặn bằng REQ-014 escalation cứng ghi đè lựa chọn tay"
  - "R11 trùng lặp với architecture-modeling: hai skill này tuyệt đối không dựng model hay vẽ view, chỉ quyết định có cần và nghiệm thu chất lượng. Ranh giới phải nằm trong Out Of Scope và trong description"
  - "R12 hai skill lặp nhau: sa và ta cùng đứng ở một đoạn chain, chạy nối tiếp trên cùng work item dễ sinh output trùng. Chặn bằng ODC-012 phân định phần giao trước khi viết"
  - "R13 chạy độc lập làm tăng chồng lấn với requirement-analysis: bỏ điều kiện chạy sau BA nghĩa là hai skill phải tự đọc yêu cầu thô, dễ lấn sang việc chuẩn hóa của BA. Ranh giới phải giữ bằng output chứ không bằng thứ tự, và phải kiểm được ở AC-010"
  - "R14 tên quá chung: sa và ta trên một pack phát hành công khai rất dễ trùng với skill của người dùng khác. Ghi nhận ở ODC-011"
  - "R15 chỉ thị ngôn ngữ tự nhiên bị hiểu sai: cùng một câu có thể hiểu thành yêu cầu output, đặt profile hay chọn đối tượng đọc. Chặn bằng REQ-022 ghi lại phần đã phân giải và hỏi lại khi không chắc, thay vì đoán rồi chạy sai cả phiên"
  - "R16 dàn trang drawio: drawio không có engine dàn trang sẵn như mermaid hay structurizr, nên cách sinh phải tự lo layout. Rủi ro đã giảm vì landscape có hình dạng ràng buộc là nhóm domain chứa hệ thống, dàn theo lưới được. Vẫn phải chốt cách sinh ở ODC-014 trước khi vào s07, và REQ-024 là cổng chặn"
  - "R17 spec còn đang chạy: phạm vi đã tăng từ 8 lên 23 requirement trong cùng một phiên, chưa gate nào đóng. Đây là tín hiệu DoR chứ không phải lỗi, nhưng freeze spec khi biên độ còn rộng sẽ dẫn tới spec-change ngay ở s06"
notes_for_step_2: "Bốn quyết định định hình scope do chủ repo chốt ngày 2026-08-13. Ba quyết định đầu: trục phân rã là phase-level với role là mode bên trong; nguồn chỉ số hợp nhất deep-dive với competency map; giao hàng tăng dần. Quyết định thứ tư cùng ngày thu hẹp scope: bỏ giai đoạn pilot nhiều đợt, tập trung vào khâu làm rõ yêu cầu, phục vụ và bổ sung cho chi tiết workflow phát triển sản phẩm, đảm bảo spec và giải pháp đúng mục đích. Hệ quả: arch-brainstorm và arch-plan chuyển sang hoãn, work item còn một skill duy nhất. Không quyết định nào trong bốn cái này là receipt của gate."
```

## Business Goal
```yaml
business_goal: "Chặn sớm hai kiểu trôi tốn kém nhất của quy trình phát triển sản phẩm: spec chốt xong mới lộ ràng buộc kỹ thuật đảo ngược hướng giải pháp, và giải pháp làm đúng spec nhưng lệch mục tiêu. Cách chặn: ép yêu cầu đi qua lăng kính kiến trúc ngay ở khâu làm rõ, tách ra tập driver có ngưỡng đo được và truy vết ngược về mục tiêu, trước khi s04 chốt spec và s05 chốt giải pháp."
success_metrics:
  - "Skill chạy trọn vẹn trên một case thật, output đạt toàn bộ gate của chính nó mà không cần sửa tay"
  - "100% requirement trong output truy vết được về ít nhất một mục tiêu; requirement mồ côi bị skill đánh dấu chứ không im lặng bỏ qua"
  - "100% NFR trong output có ngưỡng số và cách đo; NFR chỉ có câu chữ bị đánh dấu chưa đạt"
  - "100% chỉ số trong output có đủ ba phần chỉ số, công thức, bằng chứng"
  - "Chạy cùng một đầu vào với role=SA và role=TA cho ra hai tập driver khác nhau về trọng tâm"
  - "Router chọn đúng skill trong 5 câu prompt thử nghiệm mô phỏng nhầm lẫn với requirement-analysis, product-thinking, brainstorming, system-design"
  - "workflow-pack-audit pass, không có file mồ côi và không có drift frontmatter"
non_goals:
  - "Không thay thế requirement-analysis hay product-thinking - skill mới lọc phần định hình kiến trúc từ output của hai skill đó, không làm lại việc của chúng"
  - "Không chốt technical approach hay thiết kế giải pháp - đó là s05 và system-design"
  - "Không tự động chấm điểm năng lực cá nhân - chỉ số ở đây đo chất lượng artifact, không đo con người"
  - "Không nhằm phủ hết 18 năng lực trong competency map ngay đợt này - chỉ lấp ô A2"
  - "Không nhằm phát hành pack mới trong phạm vi work item này"
```

## Open Questions
```yaml
open_questions:
  - id: "ODC-006"
    question: "Chỉ định case thật để chạy thử hai skill"
    recommendation: "Hai case: một brownfield nhỏ cho profile driver-only, một chạm nhiều hệ thống cho profile driver+landscape. Ưu tiên yêu cầu đã từng trôi spec hoặc trôi mục tiêu, vì case sạch chỉ chứng minh skill chạy được chứ không chứng minh nó bắt được lỗi"
    owner: "chủ repo"
    blocking: "s08"
    note: "Không chặn thiết kế ở s06. Các case dựng sẵn để kiểm AC-004, AC-005, AC-017 thì đội thực hiện tự dựng được, không cần chờ chủ repo"
missing_inputs:
  - "Case thật để chạy thử skill - cần chủ repo chỉ định một yêu cầu sản phẩm đang mở, tốt nhất là một yêu cầu đã từng trôi spec hoặc trôi mục tiêu để kiểm được skill có bắt ra không"
  - "Xác nhận hợp đồng đầu vào đầu ra của s01 và s04 trong references/workflow-chain.md, để khối output của skill cắm đúng chỗ mà không phải sửa validator"
conflicts:
  - "Trục phân rã: yêu cầu ban đầu là role x phase, proposal đã nghiên cứu là artifact vòng đời. Giải quyết ngày 2026-08-13 bằng trục phase-level với role làm mode, sau đó thu hẹp tiếp còn một khâu duy nhất là làm rõ yêu cầu. Hệ quả: proposal 9 skill và hai skill arch-brainstorm, arch-plan đều chuyển sang hoãn, cần ghi chú lại trong chính các tài liệu đó"
  - "Chỉ số vừa là output của skill vừa là gate của skill. Phải tách rõ ở s04: chỉ số đo chất lượng artifact do skill sinh ra, khác với chỉ số đo năng lực người dùng trong competency map. Nhầm hai loại này sẽ biến skill thành công cụ chấm điểm người"
  - "Ranh giới với s05: trích driver là việc của skill này, chọn giải pháp là việc của system-design. Ranh giới mờ sẽ làm skill lấn sang thiết kế và phá gate spec-before-design"
```

## SDD Traceability
```yaml
requirement_refs: []
acceptance_refs: []
task_refs: []
test_refs: []
```
