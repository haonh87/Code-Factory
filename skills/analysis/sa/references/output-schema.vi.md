---
language: vi
---

# Schema output

> English: output-schema.md

Artifact đầy đủ mà `sa` xuất ra. `ta` xuất cùng schema này — quyền sở hữu từng khối định nghĩa ở
`block-ownership.md`.

**Hình dạng không bao giờ đổi.** Độ sâu đổi theo profile, khối thì không xuất hiện rồi biến mất.
Khối không áp dụng vẫn xuất với `applicable: false` kèm `reason`. Đây là `REQ-015`, và nó tồn tại để
người đọc hạ nguồn phân biệt được *"không cần"* với *"không ai xem"*.

## Schema

```yaml
invocation:
  skill: sa|ta
  directives_parsed:                 # skill hiểu được gì từ lệnh gọi
    - raw: ""                        # nguyên văn người gọi
      interpreted_as: ""             # yêu cầu output | định dạng | profile | đối tượng đọc
      effect: ""
  directives_unresolved:             # không bao giờ đoán — hỏi một lần, hoặc báo lại
    - raw: ""
      why: ""
  selected_profile: driver-only|driver+landscape|full
  profile_source: default|caller|escalated
  escalation_reasons: []             # không rỗng bất cứ khi nào profile_source = escalated

objectives:
  applicable: true|false
  reason: ""                         # bắt buộc khi applicable = false
  items:
    - id: OBJ-001
      statement: ""
      measure: ""                    # làm sao biết là đã đạt
      source: ""                     # ai phát biểu
      confidence: stated|inferred    # inferred nghĩa là không ai nói ra, mình suy

drivers:
  applicable: true|false
  reason: ""
  items:
    - id: DRV-001
      kind: business_goal|constraint|regulatory|system_boundary|data_ownership|quality_attribute|integration
      statement: ""
      origin:
        stakeholder: ""              # driver không có stakeholder và không có
        concern: ""                  # ràng buộc nêu tên thì không phải driver, đó là ý kiến
        constraint_ref: ""
      traces_to: []                  # id OBJ. Rỗng = driver này không phục vụ mục tiêu nào đã nêu;
                                     # khi đó nó phải xuất hiện trong input_issues.untraceable_drivers
      threshold:
        status: quantified|not_quantified
        value: ""
        reason: ""                   # bắt buộc khi not_quantified
      verification: ""               # sau này kiểm bằng cách nào
      architectural_significance: "" # vì sao nó định hình kiến trúc, không chỉ là mong muốn
      priority: high|medium|low

landscape:
  applicable: true|false
  reason: ""
  question_answered: ""              # không ai nêu được câu này thì đừng vẽ
  render_format: drawio|mermaid|structurizr-dsl
  view_axis: domain|system
  quality_checks: []                 # tám phép đếm ở landscape-quality-bar.md
  manual_steps: []                   # tối đa 1 mục
  produced_by: architecture-modeling # skill này không bao giờ vẽ

input_issues:                        # bắt buộc ở mọi profile — không bao giờ applicable: false
  unanchored_drivers: []             # không stakeholder concern và không ràng buộc nêu tên — hỏng M-03
  contested_ownership: []            # hai hệ cùng nhận một năng lực hay dữ liệu, hoặc không ai nhận — hỏng M-10
  untraceable_drivers: []            # không về được mục tiêu nào, traces_to rỗng — hỏng M-01
  unsupported_objectives: []
  conflicting_drivers:
    - pair: []
      nature: ""
      owner: ""                      # ai có thẩm quyền phân xử
  unquantified_nfrs: []
  ownerless_assumptions: []
  surplus_drivers: []                # driver không rơi vào khối bàn giao nào — REQ-017
  missing_capability: []             # phụ thuộc tùy chọn mà profile cần nhưng chưa được cài

metrics:
  applicable: true|false
  items:
    - id: M-01
      name: ""
      formula: ""
      value: ""
      threshold: ""
      calibration: uncalibrated
      evidence: ""                   # trỏ tới đúng dòng đã tạo ra con số

handoff:
  to_ba:    { applicable: true|false, reason: "", items: [] }
  to_dev:   { applicable: true|false, reason: "", items: [] }   # dùng chung: sa góp ràng buộc
                                                                 # ranh giới, ta góp ràng buộc kỹ thuật
  to_qc:    { applicable: true|false, reason: "", items: [] }
  to_devops:{ applicable: true|false, reason: "", items: [] }

stop_condition:
  met: true|false
  reason: ""
  pushed_to_s03:                     # thứ phân tích không giải quyết được
    - question: ""
      owner: ""                      # mục không có chủ thì không phải bàn giao
```

## Các luật buộc schema lại với nhau

| Luật | Chạm vào đâu |
|---|---|
| Mọi driver truy vết về một mục tiêu, hoặc nằm trong `input_issues.untraceable_drivers` | `M-01` |
| Mọi mục tiêu có ≥1 driver, hoặc nằm trong `input_issues.unsupported_objectives` | `M-02` |
| Mọi driver có stakeholder concern hoặc ràng buộc nêu tên, hoặc nằm trong `input_issues.unanchored_drivers` | `M-03` |
| `not_quantified` bắt buộc có `reason` — reason rỗng là vi phạm schema | `M-04` |
| Driver `binary` bị loại khỏi mẫu số của `M-04` — chúng sẽ không bao giờ có số | `M-04` |
| Mọi driver đều có `verification`, bất kể trạng thái threshold | `M-05` |
| Mọi driver map vào ≥1 khối `handoff`, hoặc nằm trong `input_issues.surplus_drivers` | `M-06` |
| Mọi mục `pushed_to_s03` có chủ sở hữu | `M-07` |
| `input_issues` không bao giờ `applicable: false` | `REQ-015` |
| `escalation_reasons` không rỗng bất cứ khi nào `profile_source: escalated` | `REQ-014` |

## Điền từng khối bàn giao

Khối hạ nguồn phải tự đọc được. Phép thử không phải là khối đó có tồn tại — mà là **một người chưa
đọc gì khác vẫn hành động được**.

| Khối | Chứa gì | Người đọc phải làm được gì |
|---|---|---|
| `to_ba` | Driver sẽ thành acceptance criteria, kèm ngưỡng | Viết được một tiêu chí kiểm được mà không phải hỏi ai |
| `to_dev` | Ràng buộc ranh giới từ `sa`, ràng buộc kỹ thuật từ `ta`, contract phải giữ | Biết thiết kế không được phép làm gì |
| `to_qc` | Cách kiểm chứng của từng driver | Thiết kế được một phép kiểm cho mỗi driver |
| `to_devops` | Driver chạm availability, scaling, rollback, môi trường | Ước lượng được runtime và cách rollout |

Khối không có nội dung áp dụng thì xuất `applicable: false` kèm lý do. Danh sách `items` rỗng dưới
`applicable: true` là vấn đề đầu vào — nghĩa là góc nhìn đã mở mà không ai làm gì với nó.
