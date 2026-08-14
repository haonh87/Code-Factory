---
language: en
---

# Worked Example

> Vietnamese: example.vi.md
>
> **Canonical source: `skills/analysis/sa/references/example.md`.**
> `skills/analysis/ta/references/example.md` is a byte-identical copy. Edit the canonical file,
> then re-copy. A `diff` between the two copies runs in the verify path; drift fails.

One complete artifact, filled. The schema in `output-schema.md` tells you the shape; this file
shows what a good fill actually looks like — including the parts most runs get wrong.

## The Call

```
/sa Thêm tính năng đặt hàng trước cho ứng dụng khách hàng, đơn đặt trước phải hiện ở màn hình bếp
```

No directives. Brownfield, one customer app plus the existing kitchen display. No contract change.

## The Artifact

```yaml
invocation:
  skill: sa
  directives_parsed: []
  directives_unresolved: []
  selected_profile: driver-only
  profile_source: default
  escalation_reasons: []

objectives:
  applicable: true
  items:
    - id: OBJ-1
      statement: "Giảm tải bếp giờ cao điểm"
      measure: "số đơn tồn tại quầy lúc 12h, so với trung bình 4 tuần trước"
      source: "PO, họp planning 2026-08-10"
      confidence: stated
    - id: OBJ-2
      statement: "Khách biết trước thời điểm nhận hàng"
      measure: "tỷ lệ đơn đặt trước giao đúng khung giờ đã hẹn"
      source: "suy ra từ chính yêu cầu; chưa ai phát biểu"
      confidence: inferred          # <-- không ai nói ra, nên phải đánh dấu

drivers:
  applicable: true
  items:
    - id: DRV-1
      kind: business_goal
      statement: "Khách chọn được khung giờ nhận hàng trong các khung còn năng lực phục vụ"
      origin:
        stakeholder: "PO"
        concern: "Đặt trước mà bếp không kham nổi thì làm hỏng cả trải nghiệm lẫn mục tiêu giảm tải"
        constraint_ref: ""
      traces_to: [OBJ-1, OBJ-2]
      threshold:
        status: quantified
        value: "mỗi khung 30 phút nhận tối đa 12 đơn đặt trước"
        reason: ""
      verification: "Đặt thử 13 đơn vào cùng khung; đơn thứ 13 phải bị từ chối kèm gợi ý khung khác"
      architectural_significance: "Buộc phải có mô hình năng lực theo khung giờ, tức một nguồn sự thật về sức chứa mà cả app và bếp cùng đọc"
      priority: high

    - id: DRV-2
      kind: constraint
      statement: "Đơn đặt trước hiện ở màn hình bếp trước giờ hẹn ít nhất 30 phút"
      origin:
        stakeholder: "Bếp trưởng"
        concern: "Dưới 30 phút thì không kịp chuẩn bị nguyên liệu, đặt trước thành vô nghĩa"
        constraint_ref: ""
      traces_to: [OBJ-1]
      threshold:
        status: quantified
        value: "hiện trên màn hình bếp >= 30 phút trước giờ hẹn, ở p99"
        reason: ""
      verification: "Đo khoảng cách giữa thời điểm hiển thị và giờ hẹn trên 200 đơn liên tiếp"
      architectural_significance: "Đặt sàn thời gian cho đường đưa dữ liệu tới màn hình bếp, loại các cơ chế chỉ đồng bộ theo phiên làm việc"
      priority: high

    - id: DRV-3
      kind: regulatory
      statement: "Thông tin liên hệ của khách trong đơn đặt trước chịu nghĩa vụ bảo vệ dữ liệu cá nhân"
      origin:
        stakeholder: "Pháp chế"
        concern: "Đơn đặt trước lưu lâu hơn đơn tại quầy nên rơi vào diện lưu trữ có nghĩa vụ"
        constraint_ref: "Chính sách bảo vệ dữ liệu nội bộ, mục 4"
      traces_to: [OBJ-2]
      threshold:
        status: binary               # <-- thoả hoặc không; không con số nào có nghĩa
        value: ""
        reason: ""
      verification: "Rà trường dữ liệu cá nhân trong đơn đặt trước, đối chiếu mục 4 của chính sách, có chữ ký Pháp chế"
      architectural_significance: "Ràng buộc nơi được lưu và thời hạn lưu thông tin liên hệ; loại phương án nhân bản đơn sang hệ thống không nằm trong phạm vi chính sách"
      priority: high

    - id: DRV-4
      kind: quality_attribute
      statement: "Màn hình chọn khung giờ phản hồi đủ nhanh để khách không bỏ giữa chừng"
      origin:
        stakeholder: "PO"
        concern: "Chọn khung giờ là bước dễ rơi nhất trong luồng đặt hàng"
        constraint_ref: ""
      traces_to: [OBJ-2]
      threshold:
        status: not_quantified       # <-- LẼ RA phải có số, nhưng chưa có
        value: ""
        reason: "Chưa có số đo tỷ lệ rơi hiện tại ở bước này, nên mọi ngưỡng đưa ra bây giờ đều là bịa"
      verification: "Chưa xác định được cho tới khi có baseline tỷ lệ rơi theo bước"
      architectural_significance: "Nếu ngưỡng cuối cùng đủ chặt thì năng lực theo khung giờ phải đọc được mà không gọi vòng sang hệ thống khác"
      priority: medium

landscape:
  applicable: false
  reason: "profile driver-only: một ứng dụng khách hàng cộng màn hình bếp sẵn có, không đổi contract, ranh giới tích hợp không dịch chuyển"
  question_answered: ""
  render_format: ""
  view_axis: ""
  quality_checks: []
  manual_steps: []
  produced_by: ""

input_issues:
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers: []
  unquantified_nfrs:
    - "DRV-4: chưa có baseline tỷ lệ rơi ở bước chọn khung giờ. Cần số đo trước khi đặt ngưỡng"
  ownerless_assumptions:
    - "Giả định màn hình bếp hiện tại nhận được đơn có giờ hẹn trong tương lai. Chưa ai đứng tên xác nhận; nếu sai thì DRV-2 đổi hoàn toàn về độ khó"
  surplus_drivers: []

metrics:
  applicable: true
  items:
    - id: M-01
      name: "Objective traceability"
      formula: "drivers tracing to >=1 objective / total drivers"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "DRV-1 [OBJ-1,OBJ-2]; DRV-2 [OBJ-1]; DRV-3 [OBJ-2]; DRV-4 [OBJ-2]"
    - id: M-02
      name: "Objective support"
      formula: "objectives supported by >=1 driver / total objectives"
      value: "2/2 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "OBJ-1 có DRV-1, DRV-2; OBJ-2 có DRV-1, DRV-3, DRV-4"
    - id: M-03
      name: "Driver provenance"
      formula: "drivers with a stakeholder concern or a named constraint / total drivers"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "PO, Bếp trưởng, Pháp chế kèm chính sách mục 4, PO"
    - id: M-04
      name: "NFR quantification"
      formula: "drivers with status quantified / drivers where a number is meaningful"
      value: "2/3 = 67%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "DRV-1 và DRV-2 quantified; DRV-4 not_quantified. DRV-3 là binary nên KHÔNG nằm trong mẫu số"
    - id: M-05
      name: "Verification coverage"
      formula: "drivers with a stated measurement method / total drivers"
      value: "3/4 = 75%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "DRV-4 chưa có cách kiểm vì phụ thuộc baseline chưa có"
    - id: M-06
      name: "Handoff coverage"
      formula: "drivers mapped to >=1 downstream block / total drivers"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "xem khối handoff"
    - id: M-07
      name: "Open-item ownership"
      formula: "items pushed to s03 carrying a named owner / total items pushed"
      value: "2/2 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "xem stop_condition.pushed_to_s03"
    - id: M-08
      name: "Option discipline"
      formula: "direction choices with >=1 rejected alternative and reason / total direction choices"
      value: "0/0 = n/a"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "Lần chạy này không chốt hướng nào; chọn hướng thuộc s05"
    - id: M-09
      name: "Landscape element ownership"
      formula: "landscape elements with a named owner / total elements"
      value: "n/a"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "landscape applicable=false ở profile driver-only"

handoff:
  to_ba:
    applicable: true
    reason: ""
    items:
      - "DRV-1 → tiêu chí: đặt đơn thứ 13 vào một khung 30 phút phải bị từ chối kèm gợi ý khung còn chỗ"
      - "DRV-2 → tiêu chí: đơn đặt trước xuất hiện trên màn hình bếp >= 30 phút trước giờ hẹn, đo ở p99"
      - "DRV-3 → tiêu chí: đơn đặt trước không chứa trường cá nhân nào ngoài danh sách ở chính sách mục 4"
  to_dev:
    applicable: false
    reason: "owned by /ta"
  to_qc:
    applicable: true
    reason: ""
    items:
      - "DRV-1: đặt thử 13 đơn cùng khung, kỳ vọng đơn 13 bị từ chối"
      - "DRV-2: đo khoảng cách hiển thị so với giờ hẹn trên 200 đơn liên tiếp"
      - "DRV-3: rà trường dữ liệu, cần chữ ký Pháp chế, không phải test tự động"
      - "DRV-4: CHƯA test được. Cần baseline tỷ lệ rơi trước. Đừng viết test giả cho nó"
  to_devops:
    applicable: false
    reason: "owned by /ta"

stop_condition:
  met: false
  reason: "DRV-4 chưa lượng hóa được và một giả định nền chưa có chủ. Cả hai chặn việc chốt acceptance criteria ở s04, nên phân tích dừng và bàn giao thay vì đoán tiếp"
  pushed_to_s03:
    - question: "Tỷ lệ rơi hiện tại ở bước chọn khung giờ là bao nhiêu, đo ở đâu"
      owner: "po"
    - question: "Màn hình bếp hiện tại có nhận được đơn có giờ hẹn trong tương lai không"
      owner: "developer"
```

## What This Example Is Actually Showing

Read the four drivers against each other — each one is a different case you will hit:

| Driver | The case it demonstrates |
|---|---|
| `DRV-1` | The normal case: a number exists, so `quantified` with a real threshold |
| `DRV-2` | A number from a different stakeholder, with a percentile — `p99`, not "usually" |
| `DRV-3` | **`binary`.** A regulatory duty is satisfied or not. Forcing a number here would be theatre, and it stays out of the `M-04` denominator |
| `DRV-4` | **`not_quantified`.** A number *should* exist and does not. The reason is stated, `M-04` drops to 67%, and the gap is visible instead of hidden |

Three details that separate a real run from a plausible-looking one:

**`OBJ-2` is marked `inferred`.** Nobody stated it; the analysis derived it. Left unmarked it would
be read as a decision the PO made.

**`M-04` is 67%, not 100%.** Two ways to reach 100% were available and both are wrong: invent a
number for `DRV-4`, or quietly drop it. The metric is allowed to be short as long as the shortfall
is visible.

**`M-05` is 75% and `stop_condition.met` is `false`.** The analysis is honest that it is not
finished. Two questions go to `s03` with named owners rather than being answered by guesswork.

## What Is Not Here, On Purpose

No technology, no product, no pattern. `DRV-1` says a single source of truth for capacity is needed
and stops — it does not say which store holds it. `DRV-2` rules out session-bound sync mechanisms by
stating a time floor, not by naming a transport. Choosing any of that is `system-design` at `s05`.
