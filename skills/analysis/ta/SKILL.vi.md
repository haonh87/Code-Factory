---
language: vi
name: ta
description: Biến một yêu cầu sản phẩm hoặc yêu cầu thay đổi thành architecture driver kỹ thuật — quality attribute scenario có ngưỡng số, ràng buộc kỹ thuật, thực tế tích hợp và giới hạn của hệ cũ — mỗi driver neo vào một stakeholder concern hoặc một ràng buộc có tên, có ngưỡng hoặc lý do tường minh vì sao chưa có, và map vào khối bàn giao cho DEV, QC, DevOps. Dùng ở bước s01 tới s04, trước khi chốt acceptance criteria và trước khi chọn bất kỳ technical approach nào. Chạy độc lập từ yêu cầu thô; output của requirement-analysis, product-thinking hay skill sa là đầu vào bổ trợ tùy chọn. Không chọn technical approach, stack hay pattern, không quyết ranh giới domain, không thiết kế schema, không review code, và không dựng model hay vẽ view kiến trúc.
---

# TA — Góc nhìn Technical Architect

> English: SKILL.md

Biến một yêu cầu thành tập ràng buộc kỹ thuật mà thiết kế sau này phải sống bên trong, phát biểu
bằng số, rồi giao từng cái cho vai phải đáp ứng nó.

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

- Biến mong muốn về chất lượng thành quality attribute scenario có ngưỡng số.
- Gọi tên ràng buộc kỹ thuật giới hạn mọi thiết kế tương lai: contract đang có, giới hạn runtime,
  quyền sở hữu dữ liệu, cam kết vận hành.
- Làm lộ thực tế tích hợp — cái gì đang nói chuyện với cái gì, qua cơ chế nào, ai sở hữu.
- Làm lộ giới hạn của hệ cũ sẽ bó approach, trước khi có ai đề xuất approach.
- Cho mỗi driver một ngưỡng, hoặc lý do tường minh vì sao chưa có.
- Báo cáo vấn đề của đầu vào thay vì làm mượt nó đi.
- Giao cho DEV, QC, DevOps mỗi vai một khối tự đọc được mà không cần đọc phần còn lại.
- Đo bản phân tích bằng chỉ số ở `references/metric-table.md` và công bố con số.

## Position In The Workflow

- Chạy suốt `s01` tới `s04`, kết thúc trước khi `s04` chốt acceptance criteria.
- Nạp cho `s04`: ngưỡng quality attribute thành tiêu chí kiểm được, `input_issues` nạp cho verdict `DoR`.
- **Nạp cho `s05` nhưng không bao giờ thay `s05`.** `handoff.to_dev` là khung ràng buộc mà
  `system-design` phải thiết kế bên trong. Chọn cái gì đặt vào trong khung đó là việc của `s05`, không
  phải ở đây.
- Đi cặp với `sa`, vốn phụ trách góc nhìn nghiệp vụ của cùng yêu cầu. Quyền sở hữu từng khối cố
  định ở `references/block-ownership.md`.
- Độc lập với lane BA và với `sa`. Đọc output của họ khi có, chạy được khi không.

## When To Use

- Kỳ vọng chất lượng mới chỉ tồn tại dưới dạng câu chữ — "nhanh", "sẵn sàng cao", "phải co giãn".
- Một thay đổi chạm vào tích hợp mà không ai gọi tên được chủ contract hay hành vi khi lỗi.
- Ràng buộc hệ cũ nằm trong đầu người ta, không viết ở đâu cả.
- Sắp có một quyết định thiết kế mà khung ràng buộc kỹ thuật chưa từng được phát biểu.
- DEV, QC hay DevOps cứ phát hiện ràng buộc muộn, lúc đang code hoặc lúc rollout.

## Out Of Scope

- **Không chọn technical approach, stack, pattern hay công nghệ**; đó là `system-design` ở `s05`.
  Đây là ranh giới gần nhất và dễ vượt nhất — gọi tên một giải pháp trong output là vấn đề đầu vào của
  chính skill này.
- Không quyết domain module hay bounded context; đó là `domain-architecture`.
- Không thiết kế schema, bảng hay index; đó là `database-design`.
- Không review code hay diff; đó là `code-scan-review` và `review-discipline`.
- Không chuẩn hóa lại yêu cầu; đó là `requirement-analysis`.
- Không làm product discovery; đó là `product-thinking`.
- Không dựng model và không vẽ view; đó là `architecture-modeling`. Skill này quyết định có cần
  landscape hay không, và nghiệm thu theo `references/landscape-quality-bar.md`.
  **`architecture-modeling` là phụ thuộc tùy chọn và KHÔNG đi kèm pack này.** Khi nó chưa được cài,
  đừng tự vẽ và cũng đừng bỏ qua câu hỏi: vẫn quyết định có cần landscape hay không, ghi quyết định
  đó vào `landscape`, và báo phần năng lực còn thiếu vào `input_issues`. Xem
  `references/landscape-quality-bar.md` để biết đường lui cụ thể.
- Không điền khối do `sa` sở hữu — `objectives` và `handoff.to_ba`. `handoff.to_dev` là khối dùng
  chung: điền phần ràng buộc kỹ thuật, để phần ràng buộc ranh giới cho `sa`. Xem
  `references/block-ownership.md`.
- Không đo người. Mọi chỉ số ở đây đo artifact.

## Minimum Input

- `request`: yêu cầu thô, ở bất kỳ dạng nào nó tới. Chỉ cần cái này là bắt đầu được.

Mọi thứ dưới đây là tùy chọn và làm kết quả tốt hơn khi có. Không cái nào là blocker; thiếu thì ghi
nhận, không chờ.

- `sa_output`: artifact của `sa` cho cùng yêu cầu, khi có.
- `ba_artifacts`: output của `requirement-analysis` hay `product-thinking`.
- `existing_baseline`: hệ thống, chủ sở hữu, runtime và contract đang có.
- `current_measurements`: độ trễ, thông lượng, tỷ lệ lỗi, khối lượng dữ liệu hiện tại.
- `operational_commitments`: SLO, cửa sổ bảo trì, yêu cầu lưu trữ theo quy định.
- `landscape_model`: model sẵn có từ `architecture-modeling`.
- `directives`: chỉ thị ngôn ngữ tự nhiên tùy chọn ngay trong lệnh gọi.

## Required Output

Một artifact YAML theo `references/output-schema.md`, luôn có đủ các khối: `invocation`,
`objectives`, `drivers`, `landscape`, `input_issues`, `metrics`, `handoff`, `stop_condition`.

`objectives` và `handoff.to_ba` do `sa` sở hữu; xuất chúng với `applicable: false` và
`reason: "owned by /sa"`. Khối không áp dụng thì xuất `applicable: false` kèm lý do. `input_issues` không
bao giờ được `applicable: false`.

## Meaning Of Each Output

| Khối | Trả lời câu gì |
|---|---|
| `invocation` | Skill hiểu gì từ lệnh gọi, và chạy ở độ sâu nào |
| `objectives` | Không điền ở đây — thuộc `sa` |
| `drivers` | Quality attribute, ràng buộc kỹ thuật và thực tế tích hợp mà thiết kế phải đáp ứng |
| `landscape` | Thay đổi này có cần bản vẽ không, và bản vẽ đó đủ tốt chưa |
| `input_issues` | Đầu vào kỹ thuật sai hay thiếu chỗ nào — nêu ra, không làm mượt đi |
| `metrics` | Bản phân tích này đầy đủ tới đâu, theo chính con số của nó |
| `handoff` | DEV, QC và DevOps làm gì với kết quả này |
| `stop_condition` | Phân tích xong chưa, và đã đẩy gì sang `s03` |

## Normalizing Output In A Workflow Note

- Ghi artifact vào note `s01` dưới một khối riêng. Không tạo file rời.
- Khi `sa` đã ghi khối của nó, thêm khối của bạn bên cạnh; không gộp và không sửa khối của họ.
- `input_issues` và `stop_condition.pushed_to_s03` trở thành mục trong `open_questions` của note, mỗi mục
  giữ nguyên chủ sở hữu.
- `handoff.to_dev` mang tiếp sang `s05` làm khung ràng buộc cho approach.
- `handoff.to_qc` mang tiếp sang acceptance criteria ở `s04` và chiến lược test ở `s08`.
- `handoff.to_devops` mang tiếp sang kế hoạch runtime và rollout.

## Execution Flow

1. **Đọc lệnh gọi.** Phân giải chỉ thị nếu có; ghi vào `invocation`. Thứ không phân giải được cho
   vào `directives_unresolved` — hỏi một lần, không bao giờ đoán.
2. **Chốt độ sâu.** Chọn profile và ghi `escalation_reasons` khi có trigger cứng đẩy lên. Xem
   Decision Rule.
3. **Đọc output của `sa` nếu có.** Dùng làm ngữ cảnh. Không sửa nó. Không đồng ý thì thành khuyết
   tật, không phải sửa.
4. **Viết quality attribute scenario.** Với mỗi mong muốn về chất lượng, nêu tác nhân kích hoạt,
   điều kiện và phản hồi đo được. "Ổn định" không phải scenario; "không quá 5 đơn lỗi trên 10.000
   trong lúc restart một node" mới là.
5. **Gọi tên ràng buộc kỹ thuật.** Contract đang có không được vỡ, giới hạn runtime, quyền sở hữu dữ
   liệu, cam kết vận hành. Mỗi cái có nguồn.
6. **Vẽ ra thực tế tích hợp.** Cái gì nói chuyện với cái gì, qua cơ chế nào, ai sở hữu, và chuyện gì
   xảy ra khi lỗi. Tích hợp không nêu hành vi khi lỗi là một vấn đề đầu vào.
7. **Chỉ rõ ai đứng sau mỗi driver** bằng một stakeholder concern hoặc một ràng buộc có tên. Không có cả hai nghĩa
   là sở thích, không phải driver: để nó ngoài `drivers` và ghi vào
   `input_issues.unanchored_drivers` kèm lý do. Không bao giờ âm thầm bỏ đi. Đây là lỗi khác với
   bước 9 — không ai yêu cầu nó, so với nó không phục vụ mục tiêu nào.
8. **Đặt trạng thái ngưỡng.** `quantified` khi có số. `binary` khi driver chỉ thoả hoặc không và
   không con số nào có nghĩa — nghĩa vụ pháp lý, contract không được vỡ. `not_quantified` khi lẽ ra
   *phải* có số mà chưa có; chỗ chưa có baseline thì nói rõ — đó là một phát hiện đáng có.
   Mọi driver cũng mang một `verification`, bất kể trạng thái ngưỡng. Với driver `binary` thì đó là
   bằng chứng duy nhất sẽ có.
9. **Truy vết.** Mọi driver phải về được một mục tiêu. Driver không về được cái nào, tức `traces_to`
   rỗng, thì vào `input_issues.untraceable_drivers`. Khi `sa` chưa chạy, mục tiêu có thể suy ra từ yêu cầu;
   đánh dấu `inferred` và vẫn để khối `objectives` cho `sa`.
10. **Quyết chuyện landscape.** Nếu profile đòi, trước hết viết `question_answered` — quyết định mà
    bản vẽ phải phục vụ. Không nêu được thì đừng đặt vẽ. Nêu được thì đặt hàng
    `architecture-modeling` và chỉ nghiệm thu theo `references/landscape-quality-bar.md`.
11. **Điền khối bàn giao** mà mình sở hữu. Mọi driver phải rơi vào ít nhất một khối. Cái nào không
    rơi vào đâu thì vào `input_issues.surplus_drivers`, gắn nhãn là thừa hay chưa xong.
12. **Tính chỉ số** theo `references/metric-table.md` và ghi `evidence` cho từng cái.
13. **Kiểm điều kiện dừng.** Đẩy phần chưa giải quyết sang `s03` kèm chủ.

## Quality Rules

- Quality attribute không có số thì không phải driver, đó là mong muốn. Lượng hóa nó, hoặc ghi vì
  sao không lượng hóa được.
- Không bao giờ gọi tên công nghệ, sản phẩm hay pattern như câu trả lời. Nêu ràng buộc rồi dừng.
- Tích hợp không nêu hành vi khi lỗi là chưa xong — timeout, retry và fallback là một phần của ràng
  buộc, không phải một phần của thiết kế.
- Không bao giờ bịa số đo. Không biết độ trễ hiện tại thì `unknown` chính là phát hiện.
- Không bao giờ bịa chủ sở hữu. `unknown` là một phát hiện; phỏng đoán là kết quả sai mà người ta sẽ
  hành động theo.
- Không điền `objectives` và `handoff.to_ba`. Không đồng ý với `sa` thì đưa vào `input_issues`.
- Mọi chỉ số có đủ `formula`, `value`, `evidence`. Được hai trên ba là không đạt gate.
- Đọc chỉ số theo cặp — xem bảng cặp đối trọng ở `references/metric-table.md`.

## Decision Rule

**Profile, escalation cứng, cách xử lý chỉ thị và chọn định dạng được định nghĩa một lần ở
`references/invocation-rules.md`.** Chúng giống hệt nhau giữa `sa` và `ta`; đừng chép lại ở đây, và
đừng áp dụng một biến thể cục bộ.

Luật riêng của skill này:

**Lằn ranh `s05`.** Khi thấy mình đang viết *nên xây thế nào*, hãy dừng. Chuyển nó về đúng cái ràng
buộc đã khiến bạn nghĩ vậy, rồi để `system-design` chọn.

**Mong muốn về chất lượng chưa phải driver cho tới khi có số.** Hoặc lượng hóa nó, hoặc ghi vì sao
chưa lượng hóa được. Cả hai đều là kết quả; im lặng thì không.

**Tích hợp thiếu hành vi khi lỗi là chưa xong.** Timeout, retry và fallback là một phần của ràng
buộc bạn đang phát biểu, không phải một phần của thiết kế mà người khác sẽ chọn.

## Completion Conditions

- Mọi khối trong schema đều có mặt; khối thuộc `sa` mang `reason: "owned by /sa"`.
- Mọi quality attribute là một scenario có phản hồi đo được, hoặc có lý do đã nêu.
- Mọi tích hợp nêu rõ cơ chế, chủ contract và hành vi khi lỗi.
- Mọi driver đều chỉ ra được ai đứng sau, có trạng thái ngưỡng đúng bản chất, và có `verification`.
- Mọi driver có mặt ở ít nhất một khối bàn giao, hoặc trong `input_issues.surplus_drivers`.
- Mọi chỉ số có `formula`, `value`, `evidence`, và mang `calibration: uncalibrated`.
- Nếu có landscape, `question_answered` đã nêu và cả tám mục kiểm đã đếm.
- `stop_condition` đã quyết, và mọi mục đẩy sang `s03` đều có chủ sở hữu.
- Không có công nghệ, sản phẩm hay pattern nào bị gọi tên như câu trả lời ở bất kỳ đâu trong output.

## References

- `references/output-schema.md` — schema đầy đủ của artifact và các luật ràng buộc nó.
- `references/metric-table.md` — chín chỉ số, công thức và luật đọc theo cặp.
- `references/block-ownership.md` — khối nào của `ta`, của `sa`, hay của cả hai.
- `references/landscape-quality-bar.md` — tám mục kiểm mà một landscape phải qua mới được nhận.
- `references/example.md` — một artifact hoàn chỉnh đã điền, cho thấy driver quantified, binary và not_quantified cạnh nhau.
- `references/invocation-rules.md` — cú pháp chỉ thị, chọn profile, escalation cứng và luật định dạng.
