---
language: vi
---

# Chuẩn chất lượng landscape

> English: landscape-quality-bar.md
>
> **Nguồn chuẩn: `skills/analysis/sa/references/landscape-quality-bar.md`.**
> Bản trong `skills/analysis/ta/references/` là bản sao giống hệt từng byte. Sửa ở bản chuẩn rồi
> chép lại. Verify path có bước `diff` hai bản sao.

Chỉ đọc file này khi khối `landscape` có `applicable: true`. Nó định nghĩa **thế nào là bản vẽ đủ
điều kiện bàn giao**, không dạy cách vẽ.

**Skill này không dựng model và không vẽ view.** Việc đó là của `architecture-modeling`. Skill này
quyết định có cần landscape hay không, và từ chối nhận bản vẽ không đạt chuẩn dưới đây.

## Landscape để làm gì

`question_answered` là trường bắt buộc, và skill từ chối đặt vẽ khi nó còn trống. Mục này là chỗ bạn
lấy nội dung để điền.

Landscape là **công cụ hỗ trợ quyết định**, không phải bức ảnh chụp hệ thống. Mỗi phần tử trên đó có
mặt vì thiếu nó sẽ có người quyết sai. Đây là sáu quyết định mà một landscape thật sự phục vụ — một
`question_answered` hợp lệ là một trường hợp cụ thể của một trong sáu:

| # | Quyết định nó phục vụ | Câu `question_answered` khớp |
|---|---|---|
| 1 | **Ai duyệt thay đổi này** | "Thay đổi contract đơn hàng chạm những hệ thống nào, mỗi hệ ai sở hữu?" |
| 2 | **Cái gì hỏng nếu cái này dừng** | "Nhà cung cấp hoá đơn sập thì luồng nào kẹt?" |
| 3 | **Thay đổi này to cỡ nào** | "Thêm tính năng đặt trước kéo theo bao nhiêu hệ thống và bao nhiêu đội?" |
| 4 | **Xây mới hay dùng lại** | "Hệ thống nào đang giữ thông tin liên hệ của khách?" |
| 5 | **Tiền năm sau rót vào đâu** | "Trong miền này, hệ nào đang được đầu tư, hệ nào sắp bỏ?" |
| 6 | **Có đang nói cùng một thứ không** | "Nghiệp vụ gọi hệ này là gì, còn team gọi nó là gì?" |

Nếu câu bạn định viết không khớp cái nào trong sáu, đó là một tín hiệu — không phải lý do để bịa ra
cái thứ bảy. Thường thì nó có nghĩa là không cần landscape, và profile nên giữ ở `driver-only`.

### Landscape KHÔNG để làm gì

| Ngộ nhận | Vì sao hỏng |
|---|---|
| "Vẽ hết mọi hệ thống đang có" | Đầy đủ là kẻ thù của hữu dụng. Tám mươi ô thì người ta mở đúng một lần |
| "Cho thấy nó triển khai thế nào" | Đó là deployment view. Trộn hai thứ làm hỏng cả hai |
| "Vẽ theo sơ đồ tổ chức" | Conway's Law là thứ để **quan sát**, không phải thứ để thiết kế theo. Vẽ theo phòng ban là hợp thức hoá đúng cái ranh giới sai |
| "Làm một lần cho dự án X" | Landscape lệch thực tế sáu tháng còn tệ hơn không có, vì người ta vẫn tin nó |

### Hai người đọc, hai bản vẽ, một model

Cùng một landscape phục vụ hai đối tượng hỏi hai câu khác nhau. Đừng gộp vào một hình; hãy dẫn xuất
cả hai từ một model.

| | Người đọc nghiệp vụ | Người đọc kỹ thuật |
|---|---|---|
| Câu họ hỏi | "Tiền của tôi nằm ở đâu, cái gì đang cản?" | "Tôi sửa chỗ này thì gãy chỗ nào?" |
| Nhóm theo | Miền nghiệp vụ | Hệ thống và ranh giới sở hữu |
| Nhãn trên đường nối | "đơn hàng chuyển sang kho" | `REST sync`, `Kafka async`, `CDC`, `batch 02:00` |
| Cỡ đọc được | ~12 phần tử. Nhiều hơn là người đọc thôi ra quyết định | ~25 phần tử cho một miền |

Đây chính là `view_axis` trong schema: `domain` cho bản đầu, `system` cho bản sau.

## Định dạng chọn theo loại bản vẽ

| Loại bản vẽ | Định dạng | Vì sao |
|---|---|---|
| System landscape, integration architecture | `drawio` | Cần containment theo domain và định tuyến cạnh trực giao |
| Flow, sequence | `mermaid` | Layout `dagre` theo tầng hợp với luồng tuần tự |
| Model-as-code, nhiều view một nguồn | `structurizr-dsl` | Có engine dàn trang và dẫn xuất nhiều view |

`mermaid` **không được chấp nhận** cho system landscape và integration architecture. Khi người gọi
yêu cầu hai loại đó bằng `mermaid`, hãy từ chối, nêu lý do, và đề xuất `drawio`. Sinh ra bản vẽ dưới
chuẩn chỉ vì người gọi nêu sai định dạng còn tệ hơn là không sinh gì.

## Chuẩn — đếm được, không cảm tính

Mọi mục dưới đây đều là một phép đếm. "Nhìn ổn" không phải một kết luận.

| # | Mục kiểm | Giá trị đạt |
|---|---|---|
| 1 | Phần tử có chủ sở hữu | 100% |
| 2 | Hộp phần tử chồng lên nhau | 0 |
| 3 | Cạnh cắt qua hộp không phải hai đầu | 0 |
| 4 | Mũi tên hai chiều chưa phân tích | 0 |
| 5 | Hộp gom mơ hồ — `middleware`, `integration layer`, `backend` | 0 |
| 6 | Phần tử vượt giới hạn đọc được | ≤ 12 view nghiệp vụ · ≤ 25 view kỹ thuật |
| 7 | Phần tử không qua được phép thử xóa | 0 |
| 8 | Thao tác tay cần làm sau khi mở file | ≤ 1, và phải nêu trong output |

Mục 2, 3, 8 đến từ `REQ-024`; các mục còn lại từ `REQ-020`. Giới hạn số phần tử ở mục 6 là **đề xuất
có lập luận, không phải chuẩn đã đo** — coi là đích hiệu chuẩn, không phải luật.

## Ba mục cần giải thích thêm

**Mục 4 — mũi tên hai chiều.** Hướng phụ thuộc là thông tin giá trị nhất trên một landscape. Mũi tên
hai chiều gần như luôn có nghĩa là hướng chưa được phân tích, chứ không phải hai hệ thống thật sự
gọi nhau. Khi cả hai hướng đều có thật, vẽ hai mũi tên và ghi nhãn từng cái.

**Mục 5 — hộp gom mơ hồ.** Một hộp tên `Integration Layer` là dấu hiệu quyền sở hữu chưa từng được
xác định, nên mọi thứ chưa rõ bị gom vào một hình. Nó che đúng cái ranh giới mà landscape sinh ra để
chỉ ra. Hãy tách thành các phần tử có chủ thật, hoặc ghi nhận chỗ thiếu một cách tường minh.

**Mục 7 — phép thử xóa.** Với từng phần tử, hỏi: *bỏ hộp này đi thì có ai ra quyết định sai không?*
Không thì phần tử đó là trang trí. Một landscape 15 phần tử người ta thật sự dùng hơn hẳn một bản 60
phần tử không ai mở.

## Sinh file `drawio` bằng cách nào

Chốt bằng spike ngày 2026-08-14. `drawio` không có engine dàn trang sẵn — file mang toạ độ tuyệt đối
— nên toạ độ phải được tính ra chứ không phó mặc cho công cụ.

**File sinh ra phải đạt mục 2, 3 và 8 mà không cần sắp lại thủ công.** Layout tính được vì landscape
có hình dạng ràng buộc: container domain chứa hộp hệ thống, cạnh nối giữa các hộp. Đây không phải bài
toán dàn trang đồ thị tổng quát.

| Bước | Luật |
|---|---|
| 1 | Mỗi domain thành một container `swimlane`; hệ thống là cell con có geometry tương đối với nó |
| 2 | Hệ thống xếp lưới bên trong domain — cỡ hộp cố định, khoảng cách cố định, padding cố định |
| 3 | Container domain xếp theo một trục với khoảng cách cố định |
| 4 | Cạnh dùng `orthogonalEdgeStyle`, neo vào mép hộp, định tuyến qua đường giữa hai đầu |
| 5 | Trước khi xuất, tính các phép kiểm: chồng lấn hộp với hộp, chồng lấn container, containment, và giao cắt đoạn thẳng với mọi hộp không phải hai đầu của từng cạnh |

Bước 5 mới là điểm mấu chốt. Vì mọi toạ độ đã biết trước khi ghi file, tám mục kiểm **đếm được bằng
chương trình** thay vì phán bằng mắt. Layout không đạt mục nào thì sửa trước khi xuất, không đẩy ra
cho người dùng tự phát hiện.

Ghi kết quả đã đếm vào `metrics`. `manual_steps` để rỗng trừ khi thật sự cần đúng một bước đã nêu.

**Giới hạn đã biết.** Spike kiểm hình học bằng tính toán, không bằng mở file trong draw.io. Tính đúng
đắn về cấu trúc đã được thiết lập; xác nhận thị giác ngay lần mở đầu thì chưa. Hãy coi lần chạy thật
đầu tiên là lần xác nhận đó, và ghi mọi bất ngờ thành vấn đề đầu vào đối với chính reference này.

## Khi `architecture-modeling` chưa được cài

`architecture-modeling` là **phụ thuộc tùy chọn**. Nó không đi kèm pack này, nên trên một máy vừa
cài mới thì thường là chưa có.

Việc nó vắng mặt đổi thứ bạn **làm ra được**. Nó không đổi thứ bạn **phải quyết**.

| Việc | Có nó | Không có nó |
|---|---|---|
| Quyết có cần landscape hay không | Có | **Có — không đổi** |
| Nêu `question_answered` | Có | **Có — không đổi** |
| Ra được bản vẽ | Đặt hàng nó vẽ | Không có |
| Báo phần còn thiếu | không cần | Bắt buộc |

Xuất khối như sau:

```yaml
landscape:
  applicable: true                    # profile đòi có landscape
  reason: ""
  question_answered: "Thay đổi contract đơn hàng kéo theo những hệ thống nào?"
  render_format: drawio               # định dạng lẽ ra phải dùng
  produced_by: ""                     # không có gì tạo ra nó
  quality_checks: []
input_issues:
  missing_capability:
    - "architecture-modeling chưa được cài. Profile đòi có landscape và câu hỏi mà nó phải trả lời
       đã nêu, nhưng chưa có bản vẽ nào. Hãy cài architecture-modeling, hoặc chuyển câu hỏi cho
       người phụ trách sơ đồ."
```

**Đừng tự vẽ.** Một sơ đồ do chính skill vốn khai là không vẽ tạo ra còn tệ hơn không có sơ đồ: nó
không có chủ, không có model đằng sau, và không có gì để đối chiếu.

**Đừng lặng lẽ đặt `applicable: false`.** Làm vậy là báo "không cần landscape", một phát biểu khác
hẳn và sai. Profile đã nói là cần; chỉ có bản vẽ là thiếu.

Đây là luật chung của `REQ-012` áp cho một ca cụ thể: khi thứ gì đó thật sự không có, hãy khai ra và
đi tiếp — không bao giờ dừng cứng, không bao giờ giả output.

## Chỗ thiếu thì ghi nhận, không đoán

Phần tử không rõ chủ sở hữu là không đạt mục 1. Cách xử lý **không bao giờ** là bịa ra một chủ. Ghi
`owner_kind: unknown` và nêu lên trong `input_issues`. Một chỗ thiếu còn treo mà nhìn thấy được là kết
quả dùng được; một chỗ thiếu đã bị lấp bằng phỏng đoán là kết quả sai mà người ta sẽ tin.

## Trước khi chấp nhận một landscape

- Đã đếm đủ tám mục, số liệu ghi vào `metrics`.
- Mục nào không đạt thì có mặt trong `input_issues` kèm chủ sở hữu.
- `question_answered` được điền TRƯỚC khi đặt vẽ, không phải sau. Nó gọi tên quyết định mà bản vẽ
  phải phục vụ. Không ai nêu được thì bản vẽ đó lẽ ra không nên tồn tại.
- Định dạng khớp loại bản vẽ theo bảng trên.
