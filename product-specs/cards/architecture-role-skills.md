---
artifact_id: "architecture-role-skills.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: frozen
spec_version: "0.6"
owner: "ba"
reviewers:
  - "developer"
source_of_truth: true
linked_work_items:
  - "architecture-role-skills"
linked_crs: []
---

# Spec Card - Architecture Role Skills

> Spec Card cho work item `architecture-role-skills` chạy `sdd_mode=light`.
> Trạng thái: **FROZEN tại `v0.6` ngày 2026-08-14**, người duyệt `Hao, Nguyen Huu` với thẩm quyền `ba`.
>
> Mọi thay đổi nội dung requirement từ đây phải đi qua `spec-change`, không sửa trực tiếp.
>
> `v0.2` thu hẹp scope từ ba skill theo giai đoạn xuống khâu làm rõ yêu cầu,
> theo yêu cầu chủ repo ngày 2026-08-13. `arch-brainstorm` và `arch-plan` chuyển sang hoãn.
>
> `v0.3` tách thành hai skill `/sa` và `/ta`, bỏ tham số role, cho chạy độc lập với BA,
> thêm `architecture_profile`, hợp đồng bàn giao hạ nguồn và chỉ thị tùy chọn.
>
> `v0.4` sửa 4 điểm phát hiện khi chủ repo review ngày 2026-08-14:
> `REQ-021` không còn lấy `drawio` làm ví dụ định dạng vì `REQ-023` đã hoãn `drawio`;
> `REQ-007` chuyển bảng chỉ số vào `references/` của skill vì hai nguồn gốc nằm dưới `docs/` bị gitignore;
> `REQ-013` bỏ mức `none` khỏi `architecture_profile`, còn ba mức;
> `REQ-002` đổi cách phân định lăng kính từ so trùng văn bản sang quyền sở hữu khối.
>
> `v0.6` mở rộng `sa` sang góc nhìn System Architecture theo `CHANGE-001`, chủ repo duyệt và ký
> freeze ngày 2026-08-14. Lý do: trong chuyển đổi số hiếm khi tách vai Solution Architect và System
> Architect, nên dựng ranh giới giữa hai vai sẽ tạo một đường chia mà tổ chức thật không có.
> Thêm `REQ-025`, `REQ-026`.
>
> `v0.5` đảo quyết định hoãn `drawio` sau khi chủ repo nêu lý do kỹ thuật ngày 2026-08-14:
> mermaid dùng dagre theo tầng, hợp flow và sequence nhưng không đạt chuẩn cho system landscape
> và integration architecture. `REQ-023` viết lại theo hướng chọn định dạng theo loại bản vẽ,
> `drawio` là bắt buộc cho landscape và integration architecture. Thêm `REQ-024` làm cổng chất lượng
> cho bản vẽ drawio, và `ODC-014` để chốt cách sinh ở `s06`.

## Business Goal
```yaml
business_goal: "Chặn sớm hai kiểu trôi tốn kém nhất của quy trình phát triển sản phẩm: spec chốt xong mới lộ ràng buộc kỹ thuật đảo ngược hướng giải pháp, và giải pháp làm đúng spec nhưng lệch mục tiêu. Cách chặn: ép yêu cầu đi qua lăng kính kiến trúc ngay ở khâu làm rõ, tách ra tập driver có ngưỡng đo được và truy vết ngược về mục tiêu, trước khi s04 chốt spec và s05 chốt giải pháp."
in_scope:
  - "Hai skill tên ngắn sa và ta, gọi bằng /sa và /ta, tên mang luôn ngữ nghĩa vai"
  - "Hai skill chạy độc lập, chỉ cần yêu cầu thô; artifact BA nếu có là đầu vào bổ trợ"
  - "Cổng chất lượng nghiệm thu bản vẽ landscape khi profile đòi"
  - "Chỉ thị tùy chọn bằng ngôn ngữ tự nhiên sau tên skill, ví dụ /sa vẽ system landscape drawio"
  - "Trích architecture driver: stakeholder, concern, ràng buộc, quality attribute scenario có ngưỡng"
  - "Truy vết hai chiều giữa mục tiêu và requirement"
  - "Phát hiện driver mâu thuẫn, NFR chưa lượng hóa, giả định không có chủ"
  - "Khối metric bắt buộc: chỉ số, công thức, bằng chứng"
  - "Điểm cắm vào chain: bổ sung s01-s03, nạp đầu vào s04, bàn giao s05"
  - "Phân định trigger với requirement-analysis, product-thinking, brainstorming, system-design"
  - "architecture_profile ba mức quyết định độ sâu output, kèm escalation cứng ghi đè lựa chọn tay"
  - "Hợp đồng bàn giao riêng cho từng vai hạ nguồn BA, DEV, QC, DevOps"
  - "Khối landscape tiêu thụ output của architecture-modeling khi profile đòi"
out_scope:
  - "Dựng model hoặc vẽ view system landscape - việc của architecture-modeling, skill này chỉ tiêu thụ"
  - "Đưa architecture-modeling vào workflow-bundle - nó đang là skill cục bộ ngoài pack, thuộc work item riêng"
  - "arch-brainstorm và arch-plan - hoãn, chưa bỏ khỏi định hướng"
  - "Giao hàng theo pilot nhiều đợt - đã bỏ"
  - "Chốt technical approach hay thiết kế giải pháp - việc của system-design ở s05"
  - "Đăng ký runtime, manifest, bump bundleVersion, smoke test, release pack"
  - "Chín skill theo trục artifact vòng đời - hoãn, không bỏ"
  - "Sửa nội dung 38 skill đang có, trừ description khi buộc phải phân định overlap"
  - "Hiệu chuẩn ngưỡng chỉ số bằng dữ liệu vận hành thật"
```

## Requirements
```yaml
requirements:
  - id: REQ-001
    description: "Skill pack có hai skill làm rõ yêu cầu ở tầng kiến trúc, tên ngắn là sa và ta, chạy trong đoạn s01-s04 và nạp đầu vào cho s04 Acceptance + DoR. sa phủ CẢ HAI góc nhìn Solution Architecture và System Architecture, vì trong chuyển đổi số hai vai này hiếm khi tách. ta phủ góc nhìn Technical Architecture"
    provenance: BASELINE
    cr_required: false
  - id: REQ-002
    description: "Hai skill chia góc nhìn bằng quyền sở hữu khối, không chỉ bằng khác biệt văn phong. Mỗi khối trong schema output có đúng một chủ: sa sở hữu objectives, stakeholder concern, ràng buộc thương mại, tiêu chí chọn hướng, và các driver tầng hệ thống gồm ranh giới và quyền sở hữu dữ liệu; ta sở hữu quality attribute có ngưỡng, ràng buộc kỹ thuật, thực tế tích hợp và hệ cũ. Khối dùng chung là input_issues, metrics, invocation, landscape, handoff.to_ba do sa sở hữu, handoff.to_dev và handoff.to_qc dùng chung, handoff.to_devops do ta sở hữu. Mỗi skill chỉ điền phần thuộc góc nhìn của mình. Không dùng tham số role; tên skill chính là vai"
    provenance: BASELINE
    cr_required: false
  - id: REQ-025
    description: "sa xuất ra driver tầng hệ thống, phát biểu dưới dạng RÀNG BUỘC chứ không phải thiết kế: năng lực nào nên thuộc hệ thống nào, ranh giới giữa các hệ thống nằm ở đâu, dữ liệu nào có nguồn sự thật duy nhất, và thay đổi kéo theo hệ thống hay đội nào. Hai kind mới là system_boundary và data_ownership. Được phép nói dữ liệu đơn hàng phải có đúng một nguồn sự thật; KHÔNG được nói nguồn đó là hệ thống nào - đó là s05 chọn"
    provenance: BASELINE
    cr_required: false
  - id: REQ-026
    description: "Ranh giới với domain-architecture phải nêu tường minh trong Out Of Scope: domain-architecture làm việc BÊN TRONG một hệ thống, ở s05, và cho ra THIẾT KẾ gồm module, bounded context, layer rule. Góc nhìn System của sa làm việc GIỮA các hệ thống, ở s01-s04, và cho ra RÀNG BUỘC. Thiếu ranh giới này thì hai skill chồng lấn và router chọn nhầm"
    provenance: BASELINE
    cr_required: false
  - id: REQ-019
    description: "Hai skill chạy độc lập, chỉ cần yêu cầu thô là đủ để bắt đầu. Output của requirement-analysis, product-thinking hay bất kỳ artifact BA nào là đầu vào tùy chọn có tác dụng bổ trợ; thiếu chúng skill vẫn chạy được và không được coi là blocker"
    provenance: BASELINE
    cr_required: false
  - id: REQ-020
    description: "Khi architecture_profile đòi landscape, output phải kèm bản vẽ đạt chuẩn chất lượng chứ không phải sơ đồ cho có. Chuẩn tối thiểu: mọi phần tử có chủ sở hữu, hướng phụ thuộc một chiều rõ ràng, không có hộp gom mơ hồ kiểu middleware hay integration layer, số phần tử nằm trong giới hạn đọc được, và mỗi phần tử phục vụ một câu hỏi quyết định cụ thể. Việc dựng model và vẽ view giao cho architecture-modeling; hai skill này sở hữu quyết định có cần landscape hay không và cổng chất lượng nghiệm thu bản vẽ"
    provenance: BASELINE
    cr_required: false
  - id: REQ-021
    description: "Lệnh gọi nhận chỉ thị tùy chọn bằng ngôn ngữ tự nhiên sau tên skill, dạng /sa <yêu cầu> <chỉ thị>. Không có chỉ thị thì skill chạy theo architecture_profile mặc định. Bốn nhóm chỉ thị phải nhận được: yêu cầu output bổ sung ví dụ vẽ system landscape, chỉ định định dạng bản vẽ trong danh sách hỗ trợ ở REQ-023 ví dụ drawio, đặt profile bằng tay, và chỉ định đối tượng đọc ví dụ cho business owner. Định dạng ngoài danh sách hỗ trợ vẫn phải phân giải được thành chỉ thị hợp lệ rồi báo chưa hỗ trợ kèm định dạng thay thế phù hợp với loại bản vẽ, không được coi là chỉ thị vô nghĩa"
    provenance: BASELINE
    cr_required: false
  - id: REQ-022
    description: "Chỉ thị chỉ nâng được độ sâu, không hạ được xuống dưới sàn do escalation cứng ở REQ-014 đặt ra. Chỉ thị không phân giải được thì skill hỏi lại một lần, không đoán. Mọi chỉ thị đã phân giải phải được ghi vào khối invocation trong output kèm phần không phân giải được, để người dùng thấy skill hiểu đúng hay sai"
    provenance: BASELINE
    cr_required: false
  - id: REQ-023
    description: "render_format chọn theo loại bản vẽ, không theo tiện lợi khi sinh. drawio là định dạng bắt buộc cho system landscape và integration architecture, vì hai loại này cần containment theo domain và định tuyến cạnh trực giao; mermaid dùng dagre theo tầng nên không đạt chuẩn REQ-020 cho hai loại đó và không được chấp nhận thay thế. mermaid dùng cho flow và sequence. structurizr-dsl dùng khi cần model-as-code sinh nhiều view từ một nguồn. Chuẩn chất lượng REQ-020 áp dụng như nhau cho mọi định dạng"
    provenance: BASELINE
    cr_required: false
  - id: REQ-024
    description: "Bản vẽ drawio sinh ra phải mở được trong draw.io và đạt chuẩn REQ-020 mà không cần người dùng sắp xếp lại thủ công. Nếu cách sinh được chọn cần một thao tác tay ví dụ chạy auto-layout trong ứng dụng, thao tác đó phải được nêu tường minh trong output và phải là một bước duy nhất, không phải sắp lại từng hộp"
    provenance: BASELINE
    cr_required: false
  - id: REQ-003
    description: "Skill trích ra tập architecture driver từ yêu cầu thô, mỗi driver có nguồn gốc là một stakeholder concern hoặc một ràng buộc, và có ngưỡng đo được hoặc được khai tường minh là chưa lượng hóa được kèm lý do"
    provenance: BASELINE
    cr_required: false
  - id: REQ-004
    description: "Skill kiểm truy vết hai chiều: mọi requirement phải về được ít nhất một mục tiêu, mọi mục tiêu phải có ít nhất một requirement đỡ. Requirement mồ côi và mục tiêu không có gì đỡ đều phải bị đánh dấu, không được im lặng bỏ qua"
    provenance: BASELINE
    cr_required: false
  - id: REQ-005
    description: "Skill phát hiện và báo cáo ba loại khuyết tật của đầu vào: driver mâu thuẫn nhau, NFR chỉ có câu chữ mà không có ngưỡng, giả định không có chủ sở hữu"
    provenance: BASELINE
    cr_required: false
  - id: REQ-006
    description: "Output của skill bắt buộc chứa khối metric đủ ba phần cho từng chỉ số: tên chỉ số, công thức tính, bằng chứng dẫn nguồn. Khối này là verify gate của chính skill, không phải phụ lục"
    provenance: BASELINE
    cr_required: false
  - id: REQ-007
    description: "Bảng chỉ số hợp nhất phải nằm trong references/ của chính skill, không được trỏ ra tài liệu ngoài. Lý do: hai nguồn gốc sa-ta-competency-map và sa-ta-skill-metrics-deep-dive đều nằm dưới docs/ đang bị gitignore, nên người cài pack sẽ không có chúng. Nội dung hợp nhất chép vào references kèm ghi nguồn từng dòng; khi hai nguồn lệch ngưỡng thì competency map là bản chuẩn; mọi ngưỡng mang nhãn chưa hiệu chuẩn"
    provenance: BASELINE
    cr_required: false
  - id: REQ-008
    description: "Skill có điều kiện dừng tường minh để việc làm rõ yêu cầu không kéo dài vô hạn; phần chưa giải quyết được đẩy sang s03 Open Questions kèm chủ sở hữu thay vì giữ skill chạy tiếp"
    provenance: BASELINE
    cr_required: false
  - id: REQ-009
    description: "Skill khai rõ ranh giới không lấn sang s05: trích driver và tiêu chí chọn hướng là trong phạm vi, chọn giải pháp và chốt technical approach là ngoài phạm vi"
    provenance: BASELINE
    cr_required: false
  - id: REQ-010
    description: "Frontmatter description phân định được với requirement-analysis, product-thinking, brainstorming, system-design bằng tầng artifact và thời điểm, để router không chọn nhầm"
    provenance: BASELINE
    cr_required: false
  - id: REQ-011
    description: "Skill tuân thủ quy ước pack: EN-first có SKILL.md và SKILL.vi.md, đủ 13 section theo khuôn, encoding UTF-8, không có file references mồ côi"
    provenance: BASELINE
    cr_required: false
  - id: REQ-012
    description: "Gate metric của skill có đường khai lý do và đi tiếp khi thật sự không có dữ liệu; không được chặn cứng không ngoại lệ"
    provenance: BASELINE
    cr_required: false
  - id: REQ-013
    description: "Skill chạy theo architecture_profile gồm ba mức driver-only, driver+landscape, full. Profile quyết định độ sâu output, chọn theo delivery_context, số hệ thống bị chạm, có đổi contract hay không, và có foundation decision hay không. Không có mức none: quyết định có cần gọi skill hay không nằm ở router bên ngoài, không phải một trạng thái bên trong skill. Khi skill được gọi cho một thay đổi không cần phân tích kiến trúc, skill kết luận không có driver kiến trúc kèm lý do, chứ không tự chuyển sang chế độ không chạy"
    provenance: BASELINE
    cr_required: false
  - id: REQ-014
    description: "Có escalation cứng ghi đè profile chọn tay, theo đúng pattern của SDD Light: greenfield hoặc cần Foundation Decision thì tối thiểu driver+landscape; chạm public API, event hoặc data contract thì landscape bắt buộc; có migration, backfill hoặc cutover thì full; chạm nhiều hệ thống hoặc nhiều đội sở hữu thì landscape bắt buộc. Router trả về selected_profile và escalation_reasons"
    provenance: BASELINE
    cr_required: false
  - id: REQ-015
    description: "Hình dạng output không đổi theo profile, chỉ độ sâu đổi. Mọi khối luôn có mặt; khối không áp dụng mang applicable=false kèm reason. Khối defects là bắt buộc ở mọi profile, kể cả driver-only"
    provenance: BASELINE
    cr_required: false
  - id: REQ-016
    description: "Output có khối bàn giao riêng cho từng vai hạ nguồn: to_ba là driver thành acceptance criteria kèm ngưỡng, to_dev là ràng buộc và ranh giới không được vượt, to_qc là cách đo của từng driver, to_devops là driver chạm availability, scaling, rollback và môi trường"
    provenance: BASELINE
    cr_required: false
  - id: REQ-017
    description: "Driver không map được vào ít nhất một khối bàn giao phải bị báo là thừa hoặc chưa phân tích xong, không được để trôi"
    provenance: BASELINE
    cr_required: false
  - id: REQ-018
    description: "Khối landscape luôn có mặt trong schema. Ở profile driver-only mang applicable=false kèm lý do; ở driver+landscape và full thì bắt buộc có nội dung. Skill không dựng model và không vẽ view - việc đó giao cho architecture-modeling; skill sở hữu quyết định cần hay không và nghiệm thu chất lượng theo REQ-020"
    provenance: BASELINE
    cr_required: false
```

## Acceptance Criteria
```yaml
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    description: "Hai skill sa và ta tồn tại trong pack, tên gọi được bằng /sa và /ta; mỗi SKILL.md nêu rõ vị trí trong chain là s01-s04 và đầu ra nạp cho s04"
  - id: AC-002
    requirement: REQ-002
    description: "Có bảng quyền sở hữu khối liệt kê từng khối trong schema kèm đúng một chủ. Chạy /sa và /ta trên cùng một đầu vào: không skill nào điền khối do skill kia sở hữu; với khối dùng chung, nội dung của mỗi bên nằm đúng lăng kính của bên đó. Kiểm bằng đối chiếu output với bảng quyền sở hữu, không kiểm bằng đếm trùng văn bản"
  - id: AC-025
    requirement: REQ-025
    description: "Chạy /sa trên một yêu cầu chạm hai hệ thống trở lên: output có ít nhất một driver kind system_boundary hoặc data_ownership; rà toàn bộ driver tầng hệ thống, không driver nào gọi tên hệ thống cụ thể như câu trả lời"
  - id: AC-026
    requirement: REQ-026
    description: "Out Of Scope của sa nêu đủ ba trục phân biệt với domain-architecture: bên trong một hệ thống so với giữa các hệ thống, s05 so với s01-s04, thiết kế so với ràng buộc. Thêm 1 prompt gây nhiễu mô phỏng nhầm với domain-architecture vào bộ kiểm AC-010, router phải chọn đúng"
  - id: AC-019
    requirement: REQ-019
    description: "Chạy /sa trên một yêu cầu thô chưa qua bất kỳ bước BA nào; skill phải ra được output đầy đủ theo profile mà không báo thiếu đầu vào bắt buộc. Chạy lại cùng yêu cầu đó kèm output của requirement-analysis; output phải giàu hơn nhưng không đổi cấu trúc"
  - id: AC-020
    requirement: REQ-020
    description: "Trên case profile driver+landscape, bản vẽ kèm theo đạt toàn bộ chuẩn tối thiểu: 100% phần tử có chủ sở hữu, không có mũi tên hai chiều chưa phân tích, không có hộp gom mơ hồ, số phần tử trong giới hạn đọc được, và mỗi phần tử trả lời được câu hỏi bỏ đi thì ai ra quyết định sai"
  - id: AC-021
    description: "Chạy /sa không chỉ thị thì output theo profile mặc định; chạy /sa vẽ system landscape trên cùng yêu cầu đó thì khối landscape chuyển sang applicable=true và có nội dung; chạy /sa vẽ system landscape mermaid thì render_format nhận đúng giá trị; chạy /sa vẽ system landscape drawio thì chỉ thị vẫn được phân giải thành yêu cầu định dạng và đi theo nhánh chưa hỗ trợ, không bị coi là vô nghĩa"
    requirement: REQ-021
  - id: AC-022
    description: "Ba ca: chỉ thị nâng độ sâu thì được áp dụng; chỉ thị hạ độ sâu trên case có escalation cứng thì bị từ chối kèm lý do; chỉ thị vô nghĩa thì skill hỏi lại một lần thay vì đoán. Cả ba ca đều ghi vào khối invocation phần đã phân giải và phần không phân giải được"
    requirement: REQ-022
  - id: AC-023
    description: "Yêu cầu system landscape hoặc integration architecture mà chỉ định mermaid thì skill từ chối kèm lý do và đề xuất drawio, không sinh bản vẽ không đạt chuẩn. Yêu cầu flow hoặc sequence thì mermaid được chấp nhận. Với mỗi định dạng hỗ trợ, bản vẽ sinh ra đạt đủ chuẩn AC-020"
    requirement: REQ-023
  - id: AC-024
    description: "Bản vẽ drawio sinh trên case driver+landscape mở được trong draw.io và đạt AC-020 ngay khi mở, hoặc sau đúng một thao tác được nêu tường minh trong output. Đếm hộp chồng lên nhau = 0; đếm cạnh cắt qua hộp = 0; nhóm domain chứa đúng các hệ thống thuộc domain đó"
    requirement: REQ-024
  - id: AC-003
    requirement: REQ-003
    description: "Trên case thật, 100% driver trong output có nguồn gốc dẫn về một stakeholder concern hoặc một ràng buộc, và có ngưỡng số hoặc có lý do chưa lượng hóa được"
  - id: AC-004
    requirement: REQ-004
    description: "Chạy skill trên một đầu vào cố tình có 1 requirement mồ côi và 1 mục tiêu không có requirement đỡ; skill phải bắt ra cả hai"
  - id: AC-005
    requirement: REQ-005
    description: "Chạy skill trên một đầu vào cố tình có 1 cặp driver mâu thuẫn, 1 NFR chỉ có câu chữ, 1 giả định không chủ; skill phải bắt ra cả ba"
  - id: AC-006
    requirement: REQ-006
    description: "100% chỉ số trong output có đủ ba phần chỉ số, công thức, bằng chứng; chỉ số thiếu bất kỳ phần nào làm skill không đạt gate của chính nó"
  - id: AC-007
    requirement: REQ-007
    description: "Bảng chỉ số hợp nhất nằm trong references/ của skill, mỗi dòng ghi nguồn gốc và nhãn hiệu chuẩn, không còn ô nào có hai ngưỡng mâu thuẫn. Kiểm thêm: xoá toàn bộ docs/ khỏi cây thư mục rồi chạy lại skill, skill vẫn có đủ bảng chỉ số"
  - id: AC-008
    requirement: REQ-008
    description: "SKILL.md có mục điều kiện dừng nêu được điều kiện kiểm tra được; chạy trên case thiếu dữ liệu cho ra danh sách đẩy sang s03 kèm chủ sở hữu thay vì vòng lặp phân tích"
  - id: AC-009
    requirement: REQ-009
    description: "Mục Out Of Scope của SKILL.md nêu tường minh việc chọn giải pháp thuộc system-design; chạy trên case thật, output không chứa quyết định công nghệ hay kiến trúc cụ thể"
  - id: AC-010
    requirement: REQ-010
    description: "Năm câu prompt thử nghiệm mô phỏng nhầm lẫn với requirement-analysis, product-thinking, brainstorming, system-design đều được router chọn đúng skill"
  - id: AC-011
    requirement: REQ-011
    description: "workflow-pack-audit pass: đủ 13 section, có SKILL.vi.md khớp nội dung, UTF-8, không file references mồ côi"
  - id: AC-012
    requirement: REQ-012
    description: "Chạy skill trên một case thiếu dữ liệu cho ra kết quả có khai báo lý do thiếu và vẫn đi tiếp được, thay vì dừng cứng"
  - id: AC-013
    requirement: REQ-013
    description: "Chạy skill trên ba case đại diện ba profile; mỗi lần skill khai đúng selected_profile và độ sâu output khớp profile đó. Thêm một case thay đổi không có yếu tố kiến trúc: skill phải kết luận không có driver kiến trúc kèm lý do, không được trả về profile none hay từ chối chạy"
  - id: AC-014
    requirement: REQ-014
    description: "Chạy skill trên case greenfield và case đổi data contract nhưng chọn tay profile driver-only; cả hai lần router phải escalate và trả escalation_reasons không rỗng"
  - id: AC-015
    requirement: REQ-015
    description: "So sánh output của profile driver-only với profile full: mọi khối đều có mặt ở cả hai; khối không áp dụng ở driver-only có applicable=false kèm reason không rỗng; khối defects có mặt ở cả hai"
  - id: AC-016
    requirement: REQ-016
    description: "Output trên case thật có đủ bốn khối to_ba, to_dev, to_qc, to_devops; mỗi khối đọc độc lập được mà không cần đọc phần còn lại của artifact"
  - id: AC-017
    requirement: REQ-017
    description: "Case dựng sẵn có 1 driver không map vào khối bàn giao nào; skill phải báo ra driver đó"
  - id: AC-018
    requirement: REQ-018
    description: "Ở profile driver-only, khối landscape có mặt với applicable=false và lý do; ở profile driver+landscape, khối landscape có nội dung và không chứa model hay view do skill tự dựng"
```

## Assumptions And Open Decisions
```yaml
assumptions:
  - id: ASM-001
    description: "Cú pháp /{skill_name} là cơ chế gọi skill sẵn có của Claude Code, tự hoạt động khi skill được đăng ký đúng chỗ, không cần xây thêm"
    owner: "ba"
  - id: ASM-002
    description: "Hai skill đặt dưới skills/analysis/ vì cùng đoạn chain với requirement-analysis và product-thinking"
    owner: "developer"
  - id: ASM-003
    description: "Hai skill chạy độc lập với BA. Ranh giới với requirement-analysis giữ bằng output chứ không bằng thứ tự chạy: requirement-analysis xuất yêu cầu chuẩn hóa và scope ở tầng nghiệp vụ, sa và ta xuất architecture driver kèm bàn giao hạ nguồn"
    owner: "developer"
  - id: ASM-004
    description: "Output ghi vào note s01 dưới một khối riêng, không tạo artifact rời, để không phá cấu trúc Light và không phải sửa validator"
    owner: "developer"
  - id: ASM-005
    description: "Hai skill dùng chung thư mục references cho bảng chỉ số hợp nhất và chuẩn chất lượng landscape, tránh chép đôi và lệch nhau"
    owner: "developer"
open_decisions:
  - id: ODC-014
    description: "Chốt cách sinh drawio ở s06. Ba hướng: một là sinh mxGraph XML với layout dạng lưới tự tính, nhóm domain là container, cạnh định tuyến trực giao; hai là sinh định dạng CSV import của draw.io rồi để engine layout của draw.io dàn trang, cần xác minh khả năng chỉ định nhóm; ba là sinh structurizr-dsl rồi chuyển đổi. Hướng nào cũng phải đạt REQ-024"
    owner: "developer"
  - id: ODC-006
    description: "Chỉ định case thật để chạy thử skill, tốt nhất hai case: một brownfield nhỏ cho profile driver-only và một chạm nhiều hệ thống cho profile driver+landscape. Đây là quyết định duy nhất còn mở; nó không chặn thiết kế ở s06 nhưng chặn cứng verify ở s08"
    owner: "po"
```

## Decisions Resolved
```yaml
# Chủ repo chốt ngày 2026-08-14 bằng cách chấp nhận toàn bộ khuyến nghị đã trình.
# Đây là quyết định về nội dung mở, KHÔNG phải chữ ký gate Spec hay DoR.
resolved:
  - id: ODC-002
    decision: "Không dùng tham số role. Tên skill chính là vai: /sa và /ta"
    supersedes: "Khuyến nghị cũ dùng tham số role, đã bị chính yêu cầu tên ngắn thay thế"
    decided_by: "chủ repo"
    decided_at: "2026-08-14"
  - id: ODC-003
    decision: "sa-ta-competency-map là bản chuẩn khi hai nguồn lệch ngưỡng. sa-ta-skill-metrics-deep-dive chỉ bổ sung chỉ số chưa có. Mọi ngưỡng mang nhãn uncalibrated cho tới khi đo trên dữ liệu thật"
    decided_by: "chủ repo"
    decided_at: "2026-08-14"
  - id: ODC-004
    decision: "Khối metric xuất cả hai dạng: YAML để validator kiểm được về sau, kèm bảng markdown cho người đọc. Đợt này không sửa validator"
    decided_by: "chủ repo"
    decided_at: "2026-08-14"
  - id: ODC-007
    decision: "Tên skill là sa và ta, đặt dưới skills/analysis/"
    decided_by: "chủ repo"
    decided_at: "2026-08-14"
  - id: ODC-008
    decision: "Hai skill chạy độc lập từ yêu cầu thô. Ranh giới với requirement-analysis giữ bằng output chứ không bằng thứ tự chạy"
    decided_by: "chủ repo"
    decided_at: "2026-08-14"
  - id: ODC-009
    decision: "Output ghi vào note s01 dưới một khối riêng, không tạo artifact rời"
    decided_by: "chủ repo"
    decided_at: "2026-08-14"
  - id: ODC-010
    decision: "Điều kiện dừng: mọi driver có ngưỡng hoặc đã khai lý do chưa lượng hóa được, và mọi mục tiêu có ít nhất một driver đỡ. Phần còn thiếu đẩy sang s03 kèm chủ sở hữu, không giữ skill chạy tiếp"
    decided_by: "chủ repo"
    decided_at: "2026-08-14"
  - id: ODC-011
    decision: "Giữ tên ngắn sa và ta. Router chọn skill bằng description chứ không bằng tên, và rủi ro trùng tên chỉ hiện khi phát hành mà release đang ngoài scope. Nếu sau này phát hành công khai thì mở lại quyết định này"
    decided_by: "chủ repo"
    decided_at: "2026-08-14"
  - id: ODC-012
    decision: "sa sở hữu objectives, stakeholder concern, ràng buộc thương mại, tiêu chí chọn hướng. ta sở hữu quality attribute có ngưỡng, ràng buộc kỹ thuật, thực tế tích hợp và hệ cũ. Cả hai cùng xuất defects, metrics và bốn khối bàn giao, nhưng chỉ phần thuộc lăng kính của mình"
    decided_by: "chủ repo"
    decided_at: "2026-08-14"
  - id: ODC-013
    decision: "Đợt này hỗ trợ mermaid và structurizr-dsl. drawio hoãn sang work item sau vì thiếu engine dàn trang, sinh tay mâu thuẫn với chuẩn chất lượng REQ-020"
    decided_by: "chủ repo"
    decided_at: "2026-08-14"
```

## Spec Freeze
```yaml
status: FROZEN
authority: "ba"
decided_at: "2026-08-14"
spec_version_frozen: "0.6"
frozen_by_person: "Hao, Nguyen Huu"
supersedes: "Receipt freeze v0.5 cùng ngày; hết hiệu lực khi CHANGE-001 nâng spec lên v0.6"
scope: "26 requirement REQ-001 tới REQ-026. Mọi thay đổi nội dung requirement từ đây phải mở spec-change mới"
```
