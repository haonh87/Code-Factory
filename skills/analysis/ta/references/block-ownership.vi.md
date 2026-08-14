---
language: vi
---

# Quyền sở hữu khối

> English: block-ownership.md
>
> **Nguồn chuẩn: `skills/analysis/sa/references/block-ownership.md`.**
> Bản trong `skills/analysis/ta/references/` là bản sao giống hệt từng byte. Sửa ở bản chuẩn rồi
> chép lại. Verify path có bước `diff` hai bản sao; lệch là fail.

`sa` và `ta` đứng cùng một điểm trong chain và xuất cùng một schema. Không có luật sở hữu thì chúng
sinh ra hai tài liệu chồng lấn và người đọc phải tự đối chiếu. File này là luật đó.

## Luật

Mỗi khối có đúng một trong ba chế độ sở hữu:

| Chế độ | Nghĩa |
|---|---|
| `sa` | Chỉ `sa` điền. `ta` vẫn xuất khối đó với `applicable: false, reason: "owned by /sa"` |
| `ta` | Chỉ `ta` điền. `sa` vẫn xuất khối đó với `applicable: false, reason: "owned by /ta"` |
| `shared` | Cả hai cùng điền, mỗi bên **chỉ phần góc nhìn của mình** |

Skill điền khối nó không sở hữu là **vấn đề đầu vào**, không phải phần bổ sung có cũng được. Đây đúng là
kiểu hỏng mà `REQ-002` sinh ra để chặn.

## Bảng quyền sở hữu

| Khối | Chủ | `sa` đóng góp | `ta` đóng góp |
|---|---|---|---|
| `invocation` | `shared` | Chỉ thị và profile của chính nó | Chỉ thị và profile của chính nó |
| `objectives` | `sa` | Mục tiêu nghiệp vụ, giá trị, cách đo, nguồn phát biểu | — |
| `drivers` | `shared` | Loại `business_goal`, `constraint`, `regulatory`, `system_boundary`, `data_ownership` | Loại `quality_attribute`, `integration` |
| `landscape` | `shared` | Có cần view cho người nghiệp vụ không, nhóm theo domain | Có cần view hệ thống không, cạnh tích hợp |
| `input_issues` | `shared` | Vấn đề đầu vào nhìn thấy từ góc nhìn nghiệp vụ | Vấn đề đầu vào nhìn thấy từ góc nhìn kỹ thuật |
| `metrics` | `shared` | Chỉ số trên các khối mình đã điền | Chỉ số trên các khối mình đã điền |
| `handoff.to_ba` | `sa` | Cơ sở để viết acceptance criteria, kèm ngưỡng | — |
| `handoff.to_dev` | `shared` | Ràng buộc ranh giới: hệ nào sở hữu gì, đường nối nào không được dịch | Ràng buộc kỹ thuật và contract không được vỡ |
| `handoff.to_qc` | `shared` | Cách đo thành công ở tầng mục tiêu | Cách kiểm chứng từng driver |
| `handoff.to_devops` | `ta` | — | Driver chạm availability, scaling, rollback, môi trường |
| `stop_condition` | `shared` | Góc nhìn của mình đã soát hết chưa | Góc nhìn của mình đã soát hết chưa |

## Chạy cả hai trên một work item

Thứ tự thường dùng là `sa` trước rồi `ta`, vì driver kỹ thuật dễ đánh giá hơn khi đã có mục tiêu.
Đó là **tiện lợi, không phải phụ thuộc** — `REQ-019` bắt mỗi skill phải chạy độc lập được từ yêu cầu
thô.

Khi `ta` chạy sau `sa`, nó **đọc** output của `sa` như đầu vào bổ trợ tùy chọn. Nó vẫn không ghi vào
khối do `sa` sở hữu. Nó được phép nêu vấn đề đầu vào về khối đó: một mục tiêu mà nó cho là không kiểm
được thì đưa vào `input_issues`, không phải sửa thẳng vào khối `objectives`.

## Hai ranh giới rất dễ nhầm

**Quality attribute có ngưỡng mang màu nghiệp vụ thì vẫn là `ta`.** Câu "thanh toán phải xong dưới
hai giây vì khách bỏ giỏ hàng" nghe như ngôn ngữ nghiệp vụ, nhưng driver ở đây là quality attribute.
`sa` sở hữu mục tiêu mà nó phục vụ — tỷ lệ bỏ giỏ hàng — còn `ta` sở hữu driver độ trễ. Cả hai đều
tồn tại, là hai dòng khác nhau.

**Ràng buộc chi phí là `sa` kể cả khi diễn đạt bằng từ hạ tầng.** Câu "không đủ tiền cho cụm database
thứ hai" là ràng buộc thương mại tình cờ gọi tên công nghệ. `sa` sở hữu nó. `ta` sở hữu phần hệ quả
của ràng buộc đó lên thiết kế.

## Tự kiểm trước khi xuất

- Mọi khối tôi đã điền đều mang tên tôi hoặc `shared` trong bảng trên.
- Khối tôi không sở hữu, tôi đã xuất `applicable: false` kèm lý do — không bỏ đi.
- Ở khối `shared`, không có gì tôi viết thuộc về góc nhìn bên kia.
- Chỗ tôi không đồng ý với output của skill kia đã vào `input_issues`, không phải sửa thẳng.
