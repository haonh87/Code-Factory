---
language: vi
---

# Ví dụ đã điền

> English: example.md
>
> Ví dụ này thuộc lens TA. Nó dùng các mục tiêu từ artifact SA sẵn có làm mốc truy vết chỉ đọc và
> chỉ điền nội dung driver cùng bàn giao kỹ thuật.

## Lệnh gọi

```
/ta Thêm tính năng đặt hàng trước cho ứng dụng khách hàng; đơn phải hiện ở màn hình bếp
```

Không có chỉ thị. Brownfield. Artifact SA cung cấp `OBJ-1` và `OBJ-2`; contract đơn bếp cùng sổ
ownership hiện tại là bằng chứng baseline.

## Artifact

```yaml
invocation:
  skill: ta
  directives_parsed: []
  directives_unresolved: []
  selected_profile: driver-only
  profile_source: default
  escalation_reasons: []

objectives:
  applicable: false
  reason: "owned by /sa; OBJ-1 và OBJ-2 là mốc truy vết chỉ đọc từ sa_output"
  items: []

drivers:
  applicable: true
  reason: ""
  items:
    - id: DRV-1
      kind: quality_attribute
      statement: "Tra cứu khung còn chỗ phản hồi trong 300 ms ở p95 dưới tải 200 request mỗi giây"
      origin:
        stakeholder: "Product owner"
        concern: "Màn hình chọn khung chậm làm tăng bỏ dở ở bước mong manh nhất"
        constraint_ref: "Dự báo đỉnh hiện tại 200 request/giây"
      traces_to: [OBJ-2]
      threshold:
        status: quantified
        value: "p95 <= 300 ms ở 200 request/giây"
        reason: ""
      verification: "Phát lại profile tải đỉnh 15 phút và tính p95 trên toàn bộ kết quả"
      architectural_significance: "Loại đường request phụ thuộc nhiều lượt tra cứu đồng bộ chậm"
      priority: high

    - id: DRV-2
      kind: integration
      statement: "Đơn đặt trước đã nhận tới màn hình bếp không muộn hơn 60 giây sau khi xác nhận"
      origin:
        stakeholder: "Bếp trưởng"
        concern: "Hiển thị muộn làm mất khoảng chuẩn bị mà tính năng đặt trước đã hứa"
        constraint_ref: "Contract đơn bếp v3 hiện hữu"
      traces_to: [OBJ-1]
      threshold:
        status: quantified
        value: "độ trễ giao <= 60 giây ở p99"
        reason: ""
      verification: "Phát lại 500 message contract v3, đối chiếu thời điểm nhận và hiển thị rồi tính p99"
      architectural_significance: "Ràng buộc đường tích hợp và semantics giao có quan sát mà không chọn transport"
      priority: high

    - id: DRV-3
      kind: integration
      statement: "Contract đơn bếp hiện tại vẫn tương thích ngược cho đơn đang chạy"
      origin:
        stakeholder: "Chủ nền tảng đơn hàng"
        concern: "Trường đặt trước không được làm hỏng client bếp hiện hữu"
        constraint_ref: "Chính sách tương thích contract đơn bếp v3"
      traces_to: [OBJ-1, OBJ-2]
      threshold:
        status: binary
        value: ""
        reason: ""
      verification: "Chạy bộ tương thích consumer v3 và lấy phê duyệt của chủ contract"
      architectural_significance: "Loại phương án thay thế phá vỡ contract hiện tại"
      priority: high

    - id: DRV-4
      kind: quality_attribute
      statement: "Đường đặt trước phục hồi sau khi màn hình bếp mất sẵn sàng mà không làm mất đơn đã nhận"
      origin:
        stakeholder: "Trưởng vận hành"
        concern: "Khởi động lại màn hình không được âm thầm bỏ đơn đã nhận"
        constraint_ref: "Chưa có baseline phục hồi đã đo"
      traces_to: [OBJ-1]
      threshold:
        status: not_quantified
        value: ""
        reason: "Tích hợp màn hình hiện tại chưa có baseline thời gian phục hồi hay target được duyệt"
      verification: "Đo phục hồi và mất đơn qua ba lần restart có kiểm soát, rồi để Vận hành đặt target"
      architectural_significance: "Buộc nêu rõ hành vi lỗi và phục hồi trước khi approach được chấp nhận"
      priority: high

landscape:
  applicable: false
  reason: "profile driver-only; ranh giới tích hợp và contract hiện tại đã được gọi tên"
  question_answered: ""
  render_format: ""
  view_axis: ""
  quality_checks: []
  manual_steps: []
  produced_by: ""

input_issues:
  unanchored_drivers: []
  contested_ownership:
    - "CAP-3 tính năng lực khung giờ chưa có đúng một hệ thống sở hữu trong sổ hiện tại"
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers: []
  unquantified_nfrs:
    - "DRV-4: thiếu target phục hồi; Vận hành phải quyết sau khi đo baseline"
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability: []

metrics:
  applicable: true
  items:
    - id: M-01
      name: "Truy vết về mục tiêu"
      formula: "driver truy vết tới >=1 mục tiêu / tổng driver"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "DRV-1 [OBJ-2]; DRV-2 [OBJ-1]; DRV-3 [OBJ-1,OBJ-2]; DRV-4 [OBJ-1]"
    - id: M-02
      name: "Mục tiêu có driver đỡ"
      formula: "mục tiêu có >=1 driver đỡ / tổng mục tiêu trong sa_output"
      value: "2/2 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "OBJ-1 có DRV-2, DRV-3, DRV-4; OBJ-2 có DRV-1, DRV-3"
    - id: M-03
      name: "Nguồn gốc driver"
      formula: "driver có stakeholder concern hoặc ràng buộc nêu tên / tổng driver"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "Product owner, Bếp trưởng, Chủ nền tảng đơn hàng và Trưởng vận hành đều được nêu"
    - id: M-04
      name: "Lượng hóa NFR"
      formula: "driver status quantified / driver mà một con số là có nghĩa"
      value: "2/3 = 67%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "DRV-1 và DRV-2 quantified; DRV-4 not_quantified; DRV-3 binary bị loại"
    - id: M-05
      name: "Phủ cách đo"
      formula: "driver có cách đo / tổng driver"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "DRV-1..DRV-4 đều có verification"
    - id: M-06
      name: "Phủ bàn giao"
      formula: "driver map vào >=1 khối hạ nguồn / tổng driver"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "Mọi driver nằm trong to_dev và to_qc; driver vận hành còn nằm trong to_devops"
    - id: M-07
      name: "Mục treo có chủ"
      formula: "mục đẩy sang s03 có chủ / tổng mục đẩy sang"
      value: "2/2 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "Hai dòng pushed_to_s03 đều nêu developer hoặc devops"
    - id: M-08
      name: "Kỷ luật phương án"
      formula: "lựa chọn hướng có >=1 phương án bị loại kèm lý do / tổng lựa chọn hướng"
      value: "0/0 = n/a"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "TA chỉ ghi ràng buộc; chọn hướng thuộc s05"
    - id: M-09
      name: "Phần tử landscape có chủ"
      applicable: false
      reason: "landscape applicable=false ở profile driver-only"
      formula: "phần tử landscape có chủ / tổng phần tử"
      value: "n/a"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "landscape applicable=false ở profile driver-only"
    - id: M-10
      name: "Năng lực có chủ rõ ràng"
      formula: "năng lực có đúng một hệ thống sở hữu / tổng năng lực trong phạm vi"
      value: "2/3 = 67%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "CAP-1 nhận đơn thuộc Order Management; CAP-2 hiển thị bếp thuộc Kitchen Display; CAP-3 tính năng lực còn contested"

handoff:
  to_ba:
    applicable: false
    reason: "owned by /sa"
    items: []
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Ràng buộc kỹ thuật DRV-1: giữ p95 <= 300 ms ở 200 request/giây"
      - "Ràng buộc contract DRV-2/DRV-3: giữ v3 tương thích và quan sát được với độ trễ p99 <= 60 giây"
      - "Ràng buộc lỗi DRV-4: approach phải nêu cách không mất đơn và hành vi phục hồi"
  to_qc:
    applicable: true
    reason: ""
    items:
      - "DRV-1: phát tải đỉnh 15 phút và tính p95"
      - "DRV-2: đối chiếu 500 message và tính p99 giao"
      - "DRV-3: bộ tương thích consumer v3 cùng phê duyệt chủ contract"
      - "DRV-4: ba lần restart có kiểm soát trước khi duyệt target"
  to_devops:
    applicable: true
    reason: ""
    items:
      - "DRV-1: giữ profile đỉnh 200 request/giây để kiểm năng lực"
      - "DRV-2: phơi số đo độ trễ từ nhận đến hiển thị"
      - "DRV-4: sở hữu baseline restart và đề xuất target phục hồi"

stop_condition:
  met: false
  reason: "Target phục hồi và ownership tính năng lực còn treo; cả hai phải sang s03 thay vì bị đoán"
  pushed_to_s03:
    - question: "Hệ thống nào sở hữu tính năng lực khung giờ và contract của nó"
      owner: "developer"
    - question: "Target thời gian phục hồi và mất đơn nào áp dụng sau khi màn hình bếp mất sẵn sàng"
      owner: "devops"
```

## Ví dụ này đang cho thấy gì

- `objectives` và `to_ba` vẫn có mặt nhưng không áp dụng vì SA sở hữu chúng.
- `DRV-3` là binary nên nằm ngoài M-04, còn verification tương thích vẫn bắt buộc.
- `to_dev`, `to_qc`, `to_devops` tự hành động được và chỉ mang lens kỹ thuật.
- M-10 làm lộ owner năng lực còn thiếu thay vì tự phân bổ trong pha tiền thiết kế.

## Cố ý không có gì ở đây

Không stack, sản phẩm, transport, pattern, schema hay thiết kế module nào được chọn. Các quyết định
đó thuộc `system-design` và các skill kiến trúc chuyên biệt ở s05.
