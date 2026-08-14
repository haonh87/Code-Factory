---
language: vi
---

# Bảng chỉ số hợp nhất

> English: metric-table.md
>
> **Nguồn chuẩn: `skills/analysis/sa/references/metric-table.md`.**
> Bản trong `skills/analysis/ta/references/` là bản sao giống hệt từng byte. Sửa ở bản chuẩn rồi
> chép lại. Verify path có bước `diff` hai bản sao; lệch là fail.

Mọi chỉ số skill xuất ra đều là chỉ số **chất lượng artifact**. Nó đo bản phân tích, không đo người
chạy skill.

## Mỗi dòng chỉ số phải có gì

Chỉ số chỉ được coi là đủ khi có cả ba phần. Thiếu bất kỳ phần nào là không đạt gate của chính
skill — đây là hợp đồng của `REQ-006`.

| Phần | Nghĩa | Hỏng gì nếu thiếu |
|---|---|---|
| `formula` | Cách tính ra con số, dạng tỷ lệ hoặc đếm | Người đọc không tái lập được con số |
| `value` | Kết quả tính được ở lần chạy này | Chỉ số thành đồ trang trí |
| `evidence` | Trỏ tới đúng những dòng trong output đã tạo ra con số | Không kiểm chứng lại được |

## Danh sách chỉ số

`calibration: uncalibrated` là bắt buộc ở mọi dòng cho tới khi ngưỡng được đo trên dữ liệu giao hàng
thật. Ngưỡng dưới đây là **đề xuất có lập luận, không phải chuẩn ngành đã đo.**

| ID | Tên | Công thức | Ngưỡng | Nguồn |
|---|---|---|---|---|
| `M-01` | Truy vết về mục tiêu | driver truy vết được về ≥1 mục tiêu / tổng driver | 100% | competency-map A2 |
| `M-02` | Mục tiêu có driver đỡ | mục tiêu có ≥1 driver đỡ / tổng mục tiêu | 100% | competency-map A2 |
| `M-03` | Nguồn gốc driver | driver có stakeholder concern hoặc ràng buộc nêu tên / tổng driver | 100% | competency-map C1 |
| `M-04` | Lượng hóa NFR | driver có `status: quantified` / driver mà một con số là có nghĩa | 100% | competency-map E1 |
| `M-05` | Phủ cách đo | driver có nêu cách đo / tổng driver | 100% | competency-map D4, E1 |
| `M-06` | Phủ bàn giao | driver map vào ≥1 khối bàn giao / tổng driver | 100% | `REQ-017` |
| `M-07` | Mục treo có chủ | mục đẩy sang `s03` có chủ sở hữu / tổng mục đẩy sang | 100% | competency-map E2 |
| `M-08` | Kỷ luật phương án | lựa chọn hướng có ≥1 phương án bị loại kèm lý do / tổng lựa chọn hướng | 100% | competency-map A3 |
| `M-09` | Phần tử landscape có chủ | phần tử có chủ sở hữu / tổng phần tử | 100% | competency-map C1 |
| `M-10` | Năng lực có chủ rõ ràng | năng lực trong phạm vi có đúng một hệ thống sở hữu / tổng năng lực trong phạm vi | 100% | competency-map B3 |

`M-10` áp cho góc nhìn hệ thống. Một năng lực bị hai hệ cùng nhận, hoặc không hệ nào nhận, không
phải sai số làm tròn — đó chính là khuyết điểm sinh ra logic trùng lặp và dữ liệu không ai tin. Ghi
vào `input_issues.contested_ownership`; đừng bao giờ giải quyết bằng cách tự chọn một bên.

`M-04` chỉ đếm những driver mà một con số là có nghĩa. Driver `binary` — nghĩa vụ pháp lý, contract
không được vỡ — bị loại khỏi mẫu số, không tính là không đạt. Ép driver binary thành `not_quantified`
sẽ làm `M-04` vĩnh viễn không đạt được, và một chỉ số không bao giờ đạt thì người ta thôi đọc nó.

`M-09` chỉ áp dụng khi khối `landscape` có `applicable: true`. Khi không áp dụng, vẫn xuất dòng đó
với `applicable: false` kèm lý do — không được bỏ dòng. Hình dạng bất biến, theo `REQ-015`.

## Không đạt 100% thì được. Giấu chuyện không đạt thì không.

Nhiều ngưỡng để 100%, nghe như đòi hỏi tuyệt đối. Không phải. Nó không đòi mọi lần chạy đều hoàn
hảo, nó đòi **mọi chỗ thiếu đều nhìn thấy được**.

Một driver chưa có ngưỡng số là chấp nhận được khi có nêu lý do — chưa có baseline để đo, cần dữ
liệu production, hoặc bên liên quan chưa quyết. Thứ không bao giờ chấp nhận được là driver âm thầm
không có ngưỡng và không bị tính vào `M-04`.

Đường thoát là **khai ra chỗ thiếu**, không phải bỏ dòng đi. Đây là `REQ-012`.

## Đọc chỉ số theo cặp

Một chỉ số bị đẩy tới đích chứng minh rất ít, và tối ưu một chỉ số riêng lẻ là cách nhanh nhất để có
số đẹp và bản phân tích tệ. Luôn đọc từng cặp dưới đây cùng nhau:

| Chỉ số | Đọc kèm | Vì sao cần cặp này |
|---|---|---|
| `M-01` truy vết | tổng số driver | Bỏ bớt driver khó xử làm truy vết đẹp lên và bản phân tích teo lại |
| `M-04` lượng hóa NFR | số lý do đã khai | Bịa ngưỡng cho đủ 100% sẽ lộ ra ở chỗ có quá ít lý do được khai |
| `M-06` phủ bàn giao | `M-08` kỷ luật phương án | Nhét mọi driver vào một khối bàn giao che mất chuyện có driver chưa từng được phân tích |

## Luật xử lý xung đột nguồn

Khi `sa-ta-competency-map` và `sa-ta-skill-metrics-deep-dive` nêu ngưỡng khác nhau cho cùng một chỉ
số, **`sa-ta-competency-map` thắng**; đó là tài liệu chủ của repo. Deep-dive đóng góp những chỉ số
mà bản đồ chưa có.

Cả hai tài liệu nguồn nằm dưới `docs/`, vốn bị gitignore. Đó chính là lý do bảng này được chép đầy
đủ vào đây thay vì trỏ ra ngoài: người cài pack có skill nhưng không có cây `docs/`. File này phải
luôn tự đủ — không bao giờ thay một dòng bằng đường dẫn tới `docs/`.
