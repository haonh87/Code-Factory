---
language: vi
name: sa
description: Biến một yêu cầu sản phẩm hoặc yêu cầu thay đổi thành architecture driver ở tầng giải pháp và tầng hệ thống — mục tiêu kèm cách đo, ràng buộc thương mại và pháp lý, năng lực nào nên thuộc hệ thống nào, ranh giới giữa các hệ thống nằm ở đâu, dữ liệu nào cần nguồn sự thật duy nhất, và tiêu chí sau này dùng để chọn hướng — mỗi driver truy vết được về một mục tiêu, có ngưỡng số hoặc lý do tường minh vì sao chưa có, và map vào khối bàn giao cho BA, DEV, QC, DevOps. Dùng ở bước s01 tới s04, trước khi chốt acceptance criteria và trước khi chọn bất kỳ technical approach nào. Chạy độc lập từ yêu cầu thô; output của requirement-analysis hay product-thinking là đầu vào bổ trợ tùy chọn. Không chuẩn hóa lại yêu cầu, không làm product discovery, không mở hay chọn hướng giải pháp, không thiết kế technical approach, và không dựng model hay vẽ view kiến trúc.
---

# SA — Góc nhìn Solution và System Architect

> English: SKILL.md

Biến một yêu cầu thành tập nhỏ những driver thật sự định hình giải pháp và landscape hệ thống, rồi
giao từng cái cho đúng vai cần nó tiếp theo.

Skill này mang cả hai góc nhìn Solution và System. Trong công việc chuyển đổi số, hai vai này hiếm
khi có người riêng, nên tách chúng ở đây sẽ vạch ra một đường chia mà phần lớn tổ chức không thật sự
có.

## Driver là gì

**`architecture driver`** là phần trong một yêu cầu mà một quyết định thiết kế buộc phải đáp ứng. Nó
không phải mọi requirement — phần lớn requirement không phải driver.

Phép thử chỉ có một câu: **nếu điều này đổi, thiết kế có phải đổi theo không?**

| Câu | Thiết kế đổi? | Nó là gì |
|---|---|---|
| "Nút đặt hàng dùng màu xanh thương hiệu" | Không | Requirement. Vẫn phải làm, nhưng không định hình gì |
| "Thanh toán xong dưới 3 giây ở p95" | Có — loại các chuỗi gọi đồng bộ nhiều chặng | Driver |
| "Dữ liệu cá nhân phải lưu trong nước" | Có — loại phương án hosting nước ngoài | Driver |
| "Đơn đặt trước hiện ở màn hình bếp trước 30 phút" | Có — loại cơ chế chỉ đồng bộ theo phiên | Driver |

Một work item có thể mang năm mươi requirement mà chỉ có năm driver. Tách được năm cái đó ra chính
là toàn bộ giá trị của skill này; phần còn lại đi tiếp sang `s04` nguyên vẹn.

## Goal

- Nêu các mục tiêu mà yêu cầu này phục vụ, mỗi mục tiêu có cách đo và nguồn phát biểu.
- Trích ra driver nghiệp vụ, thương mại và pháp lý định hình kiến trúc — không phải mọi requirement,
  chỉ những cái mà một quyết định thiết kế buộc phải đáp ứng.
- Trích ra driver tầng hệ thống: năng lực nào nên thuộc hệ thống nào, ranh giới giữa các hệ thống
  nằm ở đâu, dữ liệu nào cần nguồn sự thật duy nhất, và thay đổi kéo theo hệ thống hay đội nào.
- Phát biểu mọi driver tầng hệ thống dưới dạng **ràng buộc**, không bao giờ dưới dạng phân bổ.
  "Dữ liệu đơn hàng cần đúng một nguồn sự thật" là trong phạm vi; gọi tên hệ thống đó là việc `s05`.
- Cho mỗi driver một ngưỡng số, hoặc một lý do tường minh vì sao chưa có.
- Truy vết hai chiều: mọi driver về được mục tiêu, mọi mục tiêu có driver đỡ.
- Báo cáo vấn đề của đầu vào thay vì làm mượt nó đi.
- Giao cho BA, DEV, QC, DevOps mỗi vai một khối tự đọc được mà không cần đọc phần còn lại.
- Đo bản phân tích bằng chỉ số ở `references/metric-table.md` và công bố con số.

## Position In The Workflow

- Chạy suốt `s01` tới `s04`, kết thúc trước khi `s04` chốt acceptance criteria.
- Nạp cho `s04`: `handoff.to_ba` là cơ sở để viết acceptance criteria, `input_issues` là đầu vào cho verdict
  `DoR`.
- Nạp cho `s05`: `handoff.to_dev` là tập ràng buộc mà `system-design` phải tôn trọng. Skill dừng ở
  đó — nó không bao giờ chọn approach.
- Đi cặp với `ta`, vốn phụ trách góc nhìn kỹ thuật của cùng yêu cầu. Quyền sở hữu từng khối cố định
  ở `references/block-ownership.md`.
- Độc lập với lane BA. Nó đọc output của `requirement-analysis` hay `product-thinking` khi có, và
  chạy được khi không có.

## When To Use

- Yêu cầu đã tới mà chưa ai tách được phần định hình kiến trúc khỏi phần không.
- Mong muốn phi chức năng đang viết bằng câu chữ — "nhanh", "ổn định", "co giãn được" — không có số.
- Bạn nghi tập requirement và mục tiêu đã phát biểu đang trôi khỏi nhau.
- Một thay đổi chạm nhiều hệ thống mà chưa ai gọi tên phạm vi ảnh hưởng.
- Các vai hạ nguồn cứ hỏi đi hỏi lại cùng một câu vì không ai viết ràng buộc ra dạng họ dùng được.

## Out Of Scope

- Không chuẩn hóa, không viết lại, không khoanh phạm vi yêu cầu; đó là `requirement-analysis`.
- Không làm product discovery và không tranh luận giá trị người dùng; đó là `product-thinking`.
- Không mở hay so sánh phương án giải pháp; đó là `brainstorming`.
- **Không chọn technical approach, stack, pattern hay công nghệ**; đó là `system-design` ở `s05`.
  Gọi tên một công nghệ trong output là vấn đề đầu vào của chính skill này.
- Không thiết kế bên trong một hệ thống — module, bounded context, layer rule; đó là
  `domain-architecture` ở `s05`. Góc nhìn hệ thống ở đây làm việc **giữa** các hệ thống, ở
  `s01`–`s04`, và cho ra **ràng buộc**, không phải thiết kế.
- Không dựng model và không vẽ view; đó là `architecture-modeling`. Skill này quyết định có cần
  landscape hay không, và nghiệm thu theo `references/landscape-quality-bar.md`.
  **`architecture-modeling` là phụ thuộc tùy chọn và KHÔNG đi kèm pack này.** Khi nó chưa được cài,
  đừng tự vẽ và cũng đừng bỏ qua câu hỏi: vẫn quyết định có cần landscape hay không, ghi quyết định
  đó vào `landscape`, và báo phần năng lực còn thiếu vào `input_issues`. Xem
  `references/landscape-quality-bar.md` để biết đường lui cụ thể.
- Không điền khối do `ta` sở hữu; xem `references/block-ownership.md`.
- Không đo người. Mọi chỉ số ở đây đo artifact.

## Minimum Input

- `request`: yêu cầu thô, ở bất kỳ dạng nào nó tới. Chỉ cần cái này là bắt đầu được.

Mọi thứ dưới đây là tùy chọn và làm kết quả tốt hơn khi có. Không cái nào là blocker; thiếu thì ghi
nhận, không chờ.

- `ba_artifacts`: output của `requirement-analysis` hay `product-thinking`.
- `stakeholders`: ai quan tâm tới việc này và mỗi người lo điều gì.
- `constraints`: ngân sách, thời hạn, quy định, cam kết hợp đồng.
- `existing_baseline`: với brownfield, các hệ thống và chủ sở hữu đang có.
- `landscape_model`: model sẵn có từ `architecture-modeling`, khi landscape nằm trong phạm vi.
- `directives`: chỉ thị ngôn ngữ tự nhiên tùy chọn ngay trong lệnh gọi.

## Required Output

Một artifact YAML theo `references/output-schema.md`, luôn có đủ các khối: `invocation`,
`objectives`, `drivers`, `landscape`, `input_issues`, `metrics`, `handoff`, `stop_condition`.

Khối không áp dụng thì xuất với `applicable: false` kèm `reason`. `input_issues` không bao giờ được
`applicable: false`.

## Meaning Of Each Output

| Khối | Trả lời câu gì |
|---|---|
| `invocation` | Skill hiểu gì từ lệnh gọi, và chạy ở độ sâu nào |
| `objectives` | Yêu cầu này để làm gì, và làm sao biết là đã đạt |
| `drivers` | Vài thứ mà một quyết định thiết kế buộc phải đáp ứng |
| `landscape` | Thay đổi này có cần bản vẽ không, và bản vẽ đó đủ tốt chưa |
| `input_issues` | Đầu vào sai chỗ nào — nêu ra, không làm mượt đi |
| `metrics` | Bản phân tích này đầy đủ tới đâu, theo chính con số của nó |
| `handoff` | Mỗi vai hạ nguồn làm gì với kết quả này |
| `stop_condition` | Phân tích xong chưa, và đã đẩy gì sang `s03` |

## Normalizing Output In A Workflow Note

- Ghi artifact vào note `s01` dưới một khối riêng. Không tạo file rời.
- Với `sdd_mode: light`, `s01` vốn đã chứa Clarify, Business Goal và Open Questions; artifact này
  nằm cạnh chúng.
- `input_issues` và `stop_condition.pushed_to_s03` trở thành mục trong `open_questions` của note, mỗi mục
  giữ nguyên chủ sở hữu.
- `handoff.to_ba` mang tiếp sang acceptance criteria ở `s04`.
- `handoff.to_dev` mang tiếp sang `s05` làm ràng buộc cho approach.

## Execution Flow

1. **Đọc lệnh gọi.** Phân giải chỉ thị nếu có; ghi vào `invocation`. Thứ không phân giải được cho
   vào `directives_unresolved` — hỏi một lần, không bao giờ đoán.
2. **Chốt độ sâu.** Chọn profile và ghi `escalation_reasons` khi có trigger cứng đẩy lên. Xem
   Decision Rule.
3. **Nêu mục tiêu.** Mỗi cái có cách đo và nguồn. Nếu mục tiêu là bạn suy ra chứ không ai phát biểu,
   đánh dấu `confidence: inferred` — đừng trình bày như thể đã có sẵn.
4. **Trích driver.** Với từng ứng viên, hỏi: *một quyết định thiết kế có buộc phải đáp ứng nó
   không?* Không thì nó là requirement, không phải driver — để ngoài.
5. **Chỉ rõ ai đứng sau mỗi driver.** Gắn nó vào một stakeholder concern hoặc một ràng buộc có tên. Driver không có cả hai
   là ý kiến, không phải driver: để nó ngoài `drivers` và ghi vào `input_issues.unanchored_drivers` kèm
   lý do. Không bao giờ âm thầm bỏ đi.
   Đây là lỗi khác với bước 8 — không ai yêu cầu nó, so với nó không phục vụ mục tiêu nào.
6. **Đặt trạng thái ngưỡng.** `quantified` khi có số. `binary` khi driver chỉ thoả hoặc không và
   không con số nào có nghĩa — nghĩa vụ pháp lý, contract không được vỡ. `not_quantified` khi lẽ ra
   *phải* có số mà chưa có; viết vì sao — chưa có baseline, cần dữ liệu production, chưa ai quyết.
7. **Nêu cách kiểm chứng từng driver.** Mọi driver đều mang một `verification`, bất kể trạng thái
   ngưỡng. Với driver `binary` thì đây là bằng chứng duy nhất sẽ có, nên `verification` rỗng ở đó
   không phải là chỗ thiếu — đó là một driver không kiểm được.
8. **Truy vết hai chiều.** Có hai kiểu đứt, cả hai vào thẳng `input_issues`:
   driver không về được mục tiêu nào, tức `traces_to` rỗng, thì vào `input_issues.untraceable_drivers`;
   mục tiêu không có driver nào đỡ thì vào `input_issues.unsupported_objectives`.
9. **Làm góc nhìn hệ thống.** Với từng năng lực trong phạm vi, hỏi nó nên thuộc hệ thống nào, và dữ
   liệu nào cần nguồn sự thật duy nhất. Chỗ nào hai hệ cùng nhận một năng lực, hoặc không hệ nào
   nhận, thì ghi vào `input_issues.contested_ownership` — đừng bao giờ tự phân xử bằng cách chọn một
   bên.
10. **Quyết chuyện landscape.** Nếu profile đòi, trước hết viết `question_answered` — quyết định mà
   bản vẽ phải phục vụ. Không nêu được thì đừng đặt vẽ. Nêu được thì đặt hàng `architecture-modeling`
   và chỉ nghiệm thu theo `references/landscape-quality-bar.md`.
11. **Điền khối bàn giao.** Mọi driver phải rơi vào ít nhất một khối. Cái nào không rơi vào đâu thì
    vào `input_issues.surplus_drivers`, gắn nhãn là thừa hay chưa xong — nói rõ là cái nào.
12. **Tính chỉ số** theo `references/metric-table.md` và ghi `evidence` cho từng cái.
13. **Kiểm điều kiện dừng.** Xong hay chưa, vẫn phải đẩy phần chưa giải quyết sang `s03` kèm chủ.

## Quality Rules

- Driver không chỉ ra được ai đứng sau — không stakeholder concern, không ràng buộc nêu tên — thì không phải driver.
- Ngưỡng bịa ra cho đủ 100% tệ hơn một chỗ thiếu đã khai. Hãy khai chỗ thiếu.
- Mục tiêu `inferred` phải được đánh dấu. Một suy luận trình bày như phát biểu sẽ được tin là thật.
- Không bao giờ gọi tên công nghệ, sản phẩm hay pattern như câu trả lời. Ràng buộc thì có, giải pháp
  thì không.
- Không bao giờ bịa chủ sở hữu. `unknown` là một phát hiện; phỏng đoán là kết quả sai mà người ta sẽ
  hành động theo.
- Không điền khối do `ta` sở hữu. Không đồng ý với output của nó thì đưa vào `input_issues`.
- Mọi chỉ số có đủ `formula`, `value`, `evidence`. Được hai trên ba là không đạt gate.
- Đọc chỉ số theo cặp — xem bảng cặp đối trọng ở `references/metric-table.md`.

## Decision Rule

**Profile, escalation cứng, cách xử lý chỉ thị và chọn định dạng được định nghĩa một lần ở
`references/invocation-rules.md`.** Chúng giống hệt nhau giữa `sa` và `ta`; đừng chép lại ở đây, và
đừng áp dụng một biến thể cục bộ.

Luật riêng của skill này:

**Requirement không phải là driver.** Với mỗi ứng viên, hỏi xem một quyết định thiết kế có buộc phải
đáp ứng nó không. Nếu thiết kế không đổi gì cả thì đó là requirement — để ngoài, `s04` sẽ mang nó.

**Mục tiêu suy ra phải được đánh dấu, không bao giờ trình bày như đã có.** Khi không ai phát biểu mà
bạn suy ra, hãy đặt `confidence: inferred`. Một suy luận bị đọc như phát biểu sẽ được tin là thật.

**Ràng buộc thì có, giải pháp thì không.** Khi thấy mình đang gọi tên một công nghệ, sản phẩm hay
pattern, hãy chuyển nó ngược về đúng cái ràng buộc đã khiến bạn nghĩ tới nó, rồi dừng ở đó. Luật này
ràng buộc cả góc nhìn hệ thống: nói rằng một năng lực cần đúng một chủ, không nói chủ đó là hệ nào.

## Completion Conditions

- Mọi khối trong schema đều có mặt; khối không áp dụng có kèm lý do.
- Mọi driver đều chỉ ra được ai đứng sau, có trạng thái ngưỡng đúng bản chất, và có `verification`.
- Truy vết chạy được hai chiều, mọi chỗ đứt đều ghi trong `input_issues`.
- Mọi driver có mặt ở ít nhất một khối bàn giao, hoặc trong `input_issues.surplus_drivers`.
- Mọi chỉ số có `formula`, `value`, `evidence`, và mang `calibration: uncalibrated`.
- Nếu có landscape, `question_answered` đã nêu và cả tám mục kiểm đã đếm.
- `stop_condition` đã quyết, và mọi mục đẩy sang `s03` đều có chủ sở hữu.
- Không có công nghệ, sản phẩm hay pattern nào bị gọi tên như câu trả lời ở bất kỳ đâu trong output.

## References

- `references/output-schema.md` — schema đầy đủ của artifact và các luật ràng buộc nó.
- `references/metric-table.md` — chín chỉ số, công thức và luật đọc theo cặp.
- `references/block-ownership.md` — khối nào của `sa`, của `ta`, hay của cả hai.
- `references/landscape-quality-bar.md` — tám mục kiểm mà một landscape phải qua mới được nhận.
- `references/visual-encoding.md` — kênh thị giác nào được mang thuộc tính nào, quyết trước khi vẽ.
- `references/example.md` — một artifact hoàn chỉnh đã điền, cho thấy driver quantified, binary và not_quantified cạnh nhau.
- `references/invocation-rules.md` — cú pháp chỉ thị, chọn profile, escalation cứng và luật định dạng.
