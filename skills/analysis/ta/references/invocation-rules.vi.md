---
language: vi
---

# Luật lệnh gọi

> English: invocation-rules.md
>
> **Nguồn chuẩn: `skills/analysis/sa/references/invocation-rules.md`.**
> Bản trong `skills/analysis/ta/references/` là bản sao giống hệt từng byte. Sửa ở bản chuẩn rồi
> chép lại. Verify path có bước `diff` hai bản sao; lệch là fail.

Đọc lệnh gọi thế nào, chốt độ sâu ra sao, và skill được phép quyết gì thay người gọi.

## Cú pháp lệnh gọi

```
/sa <yêu cầu> [chỉ thị]
/ta <yêu cầu> [chỉ thị]
```

Chỉ thị là tùy chọn và viết bằng ngôn ngữ thường, theo ngôn ngữ người gọi đang dùng. **Không có chỉ
thị thì skill chạy ở profile mặc định.** Chỉ thị không bao giờ là điều kiện để skill hoạt động.

## Bốn nhóm chỉ thị

| Nhóm (token `interpreted_as`) | Nhận ra | Hiệu lực |
|---|---|---|
| Output bổ sung (`extra_output`) | "vẽ system landscape", "draw the landscape" | Đặt `landscape.applicable: true` kể cả ở `driver-only` |
| Định dạng (`render_format`) | "drawio", "mermaid", "structurizr" | Đặt `landscape.render_format`, chịu luật định dạng bên dưới |
| Profile (`profile`) | "full", "chỉ driver thôi", "just the drivers" | Đặt `selected_profile`, chịu luật sàn bên dưới |
| Đối tượng đọc (`audience`) | "cho business owner", "cho dev" | Đặt `landscape.view_axis` thành `domain` hoặc `system` |

Chỉ thị nêu một định dạng chưa hỗ trợ **vẫn là chỉ thị hợp lệ**. Hãy phân giải nó thành yêu cầu định
dạng rồi đi theo nhánh chưa hỗ trợ. Nó không phải chỉ thị không phân giải được.

## Quy trình phân giải

1. Tách lệnh gọi thành phần yêu cầu và phần đọc như một chỉ dẫn về *cách chạy*.
2. Với từng ứng viên, quyết định nó thuộc nhóm nào trong bốn nhóm.
3. Ghi mọi chỉ thị đã phân giải vào `invocation.directives_parsed` kèm `raw` nguyên văn, nhóm đã
   hiểu, và hiệu lực.
4. Thứ không khớp nhóm nào vào `invocation.directives_unresolved` kèm lý do.
5. **Hỏi một lần về chỉ thị chưa phân giải — không bao giờ đoán.** Không có câu trả lời thì chạy
   tiếp ở profile mặc định và để nguyên mục đó trong `directives_unresolved`.

Ghi lại phần đã hiểu không phải thủ tục giấy tờ. Một chỉ thị bị đọc sai làm lệch cả phiên chạy, và
người gọi chỉ bắt được điều đó nếu skill nói to ra nó nghĩ mình đã nghe thấy gì.

## Profile

| Profile | Dùng khi |
|---|---|
| `driver-only` | Một hệ thống, không đổi contract, không có câu hỏi landscape mới |
| `driver+landscape` | Nhiều hơn một hệ thống hoặc nhiều đội sở hữu, hoặc ranh giới tích hợp dịch chuyển |
| `full` | Greenfield, có foundation decision, hoặc có migration, backfill, cutover |

Không có profile `none`. Việc có gọi skill hay không được quyết ở ngoài skill. Khi skill được gọi
cho một thay đổi không có yếu tố kiến trúc, nó vẫn chạy, kết luận là không có architecture driver và
nói vì sao — nó không từ chối và không trả artifact rỗng.

## Escalation cứng

Những trigger dưới đây nâng profile bất kể người gọi yêu cầu gì. Ghi mọi trigger đã kích hoạt vào
`escalation_reasons` rồi chạy tiếp.

| Trigger | Sàn |
|---|---|
| Greenfield, hoặc cần một foundation decision | `driver+landscape` |
| Đổi public API, event hoặc data contract | bắt buộc có landscape |
| Có migration, backfill hoặc cutover | `full` |
| Chạm nhiều hơn một hệ thống, hoặc nhiều hơn một đội sở hữu | bắt buộc có landscape |

`profile_source` ghi profile cuối cùng đến từ đâu: `default`, `caller`, hay `escalated`. Khi là
`escalated` thì `escalation_reasons` phải không rỗng.

## Chỉ thị chỉ nâng, không hạ

| Ca | Người gọi nói | Kết quả |
|---|---|---|
| Nâng | Ngữ cảnh `driver-only`, "vẽ landscape" | Áp dụng. `landscape.applicable: true` |
| Hạ, bị từ chối | Có đổi data contract, "chỉ driver thôi" | Từ chối. Chạy ở sàn escalation, lý do ghi cả ở `escalation_reasons` lẫn `effect` của chỉ thị |
| Không phân giải được | "làm cho nó xịn vào" | Hỏi một lần. Ghi vào `directives_unresolved`. Chạy tiếp ở mặc định |

Từ chối hạ độ sâu không phải gây khó. Các trigger tồn tại vì những thay đổi đó có hệ quả mà người
gọi có thể chưa nhìn thấy lúc yêu cầu chạy nông — một thay đổi contract mà bỏ qua landscape đúng là
loại ca lộ ra muộn và đắt.

## Định dạng theo loại bản vẽ

| Loại bản vẽ | Định dạng |
|---|---|
| System landscape, integration architecture | `drawio` |
| Flow, sequence | `mermaid` |
| Model-as-code, nhiều view một nguồn | `structurizr-dsl` |

**Landscape hay integration architecture mà yêu cầu bằng `mermaid` thì bị từ chối.** Nêu lý do —
`mermaid` dàn trang theo tầng bằng `dagre` và không diễn đạt được containment theo domain — rồi đề
xuất `drawio`. Không sinh gì cho tới khi người gọi quyết.

Với định dạng nằm ngoài danh sách hỗ trợ, hãy phân giải chỉ thị, nói rõ định dạng đó chưa được hỗ
trợ, nêu tên định dạng thay thế phù hợp với loại bản vẽ, và bàn giao model kèm bảng bàn giao thay vì
một bản vẽ chất lượng thấp.

## Cái gì rơi vào `invocation`

```yaml
invocation:
  skill: sa|ta
  directives_parsed:
    - raw: "vẽ system landscape"
      interpreted_as: extra_output
      effect: "landscape.applicable = true"
    - raw: "drawio"
      interpreted_as: render_format
      effect: "landscape.render_format = drawio"
  directives_unresolved: []
  selected_profile: driver+landscape
  profile_source: escalated
  escalation_reasons:
    - "Contract đơn hàng thay đổi — public data contract kích hoạt landscape"
```
