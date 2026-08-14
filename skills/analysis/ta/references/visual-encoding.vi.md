---
language: vi
---

# Phân bổ kênh thị giác

> English: visual-encoding.md
>
> **Nguồn chuẩn: `skills/analysis/sa/references/visual-encoding.md`.**
> Bản trong `skills/analysis/ta/references/` là bản sao giống hệt từng byte. Sửa ở bản chuẩn rồi
> chép lại. Verify path có bước `diff` hai bản sao; lệch là fail.

Cách phân bổ kênh thị giác **trước khi** vẽ landscape.

Đây không phải cổng nghiệm thu — cổng đó là `landscape-quality-bar.md`, dùng để chấm một bản vẽ đã
xong. File này quyết định mỗi kênh **được phép mang nghĩa gì** ngay từ đầu.

> **Quy ước của tổ chức thắng.** Nếu tổ chức đã có chuẩn mô hình hoá hay chuẩn hình vẽ riêng thì
> chuẩn đó áp dụng, và file này chỉ là dự phòng cho những phần chuẩn đó chưa quy định. Không bao giờ
> áp mặc định lên một luật mà tổ chức đã quyết.

## Nguyên tắc gốc

Mỗi kênh thị giác **hoặc mang một thuộc tính, hoặc để đồng nhất**. Màu trang trí tệ hơn không màu:
người đọc tốn công giải mã rồi mới phát hiện không có gì để giải.

## Thứ hạng kênh

Mắt không đọc mọi kênh như nhau. Thứ tự này quyết định thuộc tính nào được kênh nào.

| Hạng | Kênh | Đọc được ở mức |
|---|---|---|
| 1 | **Vị trí / nhóm** | Thấy ngay, không cần giải mã |
| 2 | **Kích thước** | Thấy ngay, so sánh được |
| 3 | **Độ sáng màu** | Thấy nhanh, xếp thứ tự được |
| 4 | **Hue** | Thấy nhanh, **không** xếp thứ tự được |
| 5 | **Hình khối** | Phải giải mã, cần chú giải |
| 6 | **Nét đường** | Phải giải mã, cần chú giải |
| 7 | **Độ dày** | Yếu, dễ nhầm với mức quan trọng |

**Luật phân bổ:** câu hỏi được hỏi nhiều nhất lấy kênh hạng cao nhất còn trống.

## Chín rule

### R1 — Một kênh, một thuộc tính
Mỗi kênh mã hoá đúng một thuộc tính, nhất quán trên mọi view.
- **Kiểm:** lập bảng `kênh → thuộc tính`. Kênh nào có hai dòng thì **FAIL**.
- **Chặn lỗi:** người đọc học một cách mã hoá rồi áp sai ở hình sau.

### R2 — Một thuộc tính, một kênh
Không thuộc tính nào chiếm hai kênh.
- **Kiểm:** thuộc tính nào xuất hiện hai lần trong bảng thì **FAIL**.
- **Chặn lỗi:** đốt một kênh mạnh để nói lại thứ đã nói — đã nhóm theo domain còn tô màu theo domain.

### R3 — Kênh không được giao thì để đồng nhất
Kênh chưa mang thuộc tính nào phải để đồng nhất. Không phải "tool làm sao thì để vậy".
- **Kiểm:** với mỗi kênh trống, đếm số giá trị khác nhau trên hình. Lớn hơn một thì **FAIL**.
- **Chặn lỗi:** màu trang trí.

### R4 — Kiểu dữ liệu quyết kiểu kênh

| Dữ liệu | Kênh đúng | Kênh sai |
|---|---|---|
| **Thứ tự** (lifecycle) | Độ sáng, một hue | Nhiều hue — mắt không xếp thứ tự hue được |
| **Phân loại** (domain, loại phần tử) | Vị trí, hình khối, hue | Độ sáng — tạo ra thứ hạng không có thật |
| **Nhị phân** (nội bộ / vendor) | Viền, hình khối | Hue — lãng phí |
| **Định lượng** | Kích thước, độ sáng | Hue |

- **Chặn lỗi:** nhiều hue cho dữ liệu thứ tự làm người đọc không biết giá trị nào "hơn"; độ sáng cho
  dữ liệu phân loại làm người đọc thấy một thứ bậc không tồn tại.

### R5 — Kích thước không bao giờ do layout quyết
Kích thước hoặc mã hoá một thuộc tính có chủ ý, hoặc đồng nhất tuyệt đối.
- **Kiểm:** đo hộp. Kích thước khác nhau mà không thuộc tính nào giải thích thì **FAIL**.
- **Chặn lỗi:** tên dài làm hộp to, người đọc hiểu thành "quan trọng hơn".
- **Cách xử lý đúng:** xuống dòng, không phóng hộp.

### R6 — Không kênh nào một mình mang thông tin quyết định
Thứ gì ảnh hưởng tới quyết định thì phải có dự phòng bằng chữ.
- **Kiểm:** chuyển sang xám và mô phỏng mù màu. Còn ra quyết định được không?
- **Chặn lỗi:** mất thông tin khi in; 8% nam giới không phân biệt được các cặp hue thông dụng.
- **Ghi chú:** thang một hue theo độ sáng đã thoả rule này — nhưng vẫn phải có nhãn chữ.

### R7 — Ngân sách chú giải: 5 dòng
- **Kiểm:** đếm số dòng chú giải. Quá năm thì **FAIL**.
- **Chặn lỗi:** mã hoá quá tay. Người đọc ngước lên chú giải quá hai lần là bỏ hình.

### R8 — Hết kênh nghĩa là sai view, không phải sai bảng màu
Đây là rule quan trọng nhất và hay bị bỏ nhất.

Khi cần mã hoá thêm một thuộc tính mà không còn kênh nào trống, **đừng đi tìm kênh thứ tám**. Nó có
nghĩa là một hình đang bị bắt trả lời hai câu hỏi.
- **Kiểm:** đếm số quyết định mà hình này phục vụ. Lớn hơn một thì **FAIL**.
- **Cách xử lý:** tách thành hai view dẫn xuất từ cùng một model.
- **Chặn lỗi:** đúng cơ chế sinh ra bản vẽ tám mươi ô không ai mở.

> Khan hiếm kênh là **tín hiệu**, không phải vấn đề cần khắc phục bằng kỹ thuật.

### R9 — Thứ tự ưu tiên khi mâu thuẫn

```
1. Quy ước sẵn có của tổ chức       ← thắng tất cả
2. Yêu cầu tiếp cận (R6)            ← không được đánh đổi
3. Rule set này
4. Mặc định của tool                ← thua tất cả
```

## Thang màu cho lifecycle

`lifecycle` là dữ liệu thứ tự — hệ thống còn bao nhiêu tương lai — nên theo R4 nó lấy độ sáng trên
một hue duy nhất.

| Giá trị | Nền sáng | Chữ | Nền tối |
|---|---|---|---|
| `invest` | `#0d366b` | trắng | `#184f95` |
| `tolerate` | `#1c5cab` | trắng | `#2a78d6` |
| `migrate` | `#3987e5` | đen | `#5598e7` |
| `eliminate` | `#86b6ef` | đen | `#9ec5f4` |

Cả hai chiều đã chạy qua validator bảng màu: độ sáng đơn điệu, khoảng cách mỗi bậc ≥ 0.06, bậc nhạt
nhất vẫn tách khỏi nền 2.06:1 ở chế độ sáng và 2.15:1 ở chế độ tối, hue lệch ≤ 4°.

**Vì sao một hue hơn bốn màu ở đây.** In đen trắng thành miễn phí — thang độ sáng đơn điệu **chính
là** thang xám. Mù màu cũng thành miễn phí — một hue thì không có cặp hue nào để nhầm, và thông tin
nằm ở độ sáng, thứ mà mọi dạng mù màu đều giữ nguyên.

## Bảng phân bổ hiện tại

| Kênh | View A — Business Owner | View B — team |
|---|---|---|
| Vị trí / nhóm | **domain** | **tags** |
| Kích thước | *đồng nhất* | *đồng nhất* |
| Độ sáng | **lifecycle** | *đồng nhất* |
| Hue | *đồng nhất — một màu xanh* | *đồng nhất* |
| Hình khối | *đồng nhất — một hình* | **loại phần tử**, tối đa 3 |
| Nét đường | *không vẽ quan hệ kỹ thuật* | **sync / async / tùy chọn** |
| Viền | *đồng nhất* | **nội bộ / vendor** |
| Độ dày | *đồng nhất* | *đồng nhất* |

View B **cố ý không** đặt `lifecycle` lên độ sáng. Team hỏi "sửa chỗ này thì gãy chỗ nào", không hỏi
"hệ nào sắp bị bỏ". Mã hoá lifecycle ở đó là R8 theo chiều ngược: nhét thông tin của một câu hỏi khác
vào view này.

## Quy trình kiểm

```
1. Lập bảng kênh → thuộc tính
2. R1: kênh nào có hai dòng?            → FAIL
3. R2: thuộc tính nào ở hai kênh?       → FAIL
4. R3: mọi kênh trống có đồng nhất?     → FAIL nếu không
5. R4: kiểu dữ liệu khớp kiểu kênh?     → FAIL nếu lệch
6. R5: mọi khác biệt kích thước có lý do? → FAIL nếu không
7. R6: xám hoá + mô phỏng mù màu        → còn quyết định được không
8. R7: đếm dòng chú giải                → quá 5 thì FAIL
9. R8: hình phục vụ mấy quyết định?     → quá 1 thì FAIL, tách view
```

Bước 1–6 và 8 làm được bằng máy khi bản vẽ sinh từ model. **Bước 7 và 9 cần người.**

## Điểm chưa xác minh

- **Thứ hạng kênh** dựa trên nghiên cứu tri giác về visual variables, nhưng thứ tự chính xác khác
  nhau giữa các nguồn và phụ thuộc loại tác vụ. Coi là hướng dẫn mạnh, không phải hằng số.
- **Chín rule là một hệ được tổng hợp ở đây**, không trích từ một chuẩn đã công bố. R6 bám theo yêu
  cầu tiếp cận và R9 bám theo `diagram-quality.md`; bảy rule còn lại suy ra từ nguyên tắc gốc.
- **Ngưỡng 5 dòng chú giải là con số đề xuất**, chưa được đo.
- **Thứ tự của lifecycle** — `invest` cao nhất, `eliminate` thấp nhất — là một cách đọc. Tổ chức nào
  coi `migrate` khẩn hơn `tolerate` thì phải xếp lại thang.
