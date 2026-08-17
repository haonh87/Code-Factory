# Contract Model Kiến Trúc

Bất biến là **một model, nhiều derived view**. Model lưu stable fact; view chỉ chọn, nhóm và gắn nhãn
fact cho audience. View không được tạo system, relationship, owner, boundary hoặc state không có
trong model.

## Cấu Trúc Canonical

```yaml
architecture_model:
  model_id: ""
  architecture_state: baseline|transition|target|vision
  model_format: ARCHITECTURE_YAML|STRUCTURIZR_DSL
  model_source: ""
  evidence_refs: []
  elements:
    - system_id: ""
      name: ""
      kind: person|software_system|service|platform|container|component|external_system
      responsibility: ""
      domain: ""
      boundary_id: ""
      parent_system_id: ""
      owner: ""
      owner_kind: internal_team|vendor|unknown
      technology: ""
      tags: []
      evidence_state: CONFIRMED|INFERRED|OPEN
      evidence_ref: ""
  relationships:
    - integration_id: ""
      from_system_id: ""
      to_system_id: ""
      direction: DIRECTED
      business_purpose: ""
      protocol: ""
      interaction: SYNC|ASYNC|BATCH
      contract_owner: ""
      error_policy: ""
      data_classification: ""
      evidence_state: CONFIRMED|INFERRED|OPEN
      evidence_ref: ""
views:
  business_views:
    - view_id: ""
      kind: landscape|capability_context
      audience: business_owner
      source_fact_ids: []
      render_format: ""
      artifact_path: ""
  engineering_views:
    - view_id: ""
      kind: landscape|integration_architecture|container|deployment_topology|flow|sequence
      audience: engineering
      source_fact_ids: []
      render_format: ""
      artifact_path: ""
gaps:
  - gap_id: ""
    fact_id: ""
    missing_field: ""
    owner_to_resolve: ""
    effect: ANNOTATE|BLOCK_MODEL|BLOCK_RENDER
```

## Luật Stable Fact

- `system_id` và `integration_id` là stable ID do input cung cấp. Không suy domain hoặc ownership từ
  prefix của ID.
- Boundary, domain, owner và technology là các field độc lập. Không rút gọn field này thành field kia.
- Relationship có hướng. Hai luồng ngược chiều cần hai `integration_id` và hai lý do; không rút gọn
  thành mũi tên hai chiều chưa phân tích.
- `architecture_state` áp dụng cho toàn model. Baseline và target là model/version riêng, không trộn
  node vào cùng một view.
- `ARCHITECTURE_YAML` là mặc định portable. Dùng `STRUCTURIZR_DSL` khi nhiều model-as-code view phải
  được DSL toolchain giữ đồng bộ.

## Sinh View

- Business và engineering view đọc cùng `elements` và `relationships`.
- Mỗi view liệt kê toàn bộ element/relationship ID đã dùng trong `source_fact_ids`.
- Business view có thể ẩn fact chỉ dành cho kỹ thuật, nhưng không đổi responsibility thành fact mới.
- Engineering view có thể thêm protocol/technology label đã có sẵn trong model.
- Loại một fact phải ghi lý do rõ trong view note; không được âm thầm bỏ.

## Input Chưa Đầy Đủ

Không dừng chỉ vì chưa biết owner, domain, protocol hoặc contract field. Giữ fact, đặt
`evidence_state: OPEN`, rồi thêm gap có `owner_to_resolve`. Dùng effect:

- `ANNOTATE`: view vẫn render và đánh dấu gap.
- `BLOCK_MODEL`: fact đầu vào mâu thuẫn hoặc stable ID/direction không dùng được.
- `BLOCK_RENDER`: model dùng được nhưng render ownership hoặc constraint render bắt buộc còn mở.

Unknown không cho phép đoán. Human có thể xử lý gap; fact bịa sẽ không còn phân biệt được với sự thật.

## Kiểm Tra Hoàn Tất Model

- Đúng một `model_id`, `architecture_state`, `model_format` và `model_source`.
- Mọi element có stable ID và responsibility một câu, hoặc blocking gap.
- Mọi relationship trỏ tới element ID tồn tại và có hướng rõ.
- Mọi derived view liệt kê `source_fact_ids` và chỉ dùng ID có trong model.
- Mọi governed field trống có gap, evidence state và resolution owner.
