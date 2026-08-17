# Render Routing Và Ownership

Chốt format và ownership trước khi tạo diagram-tool artifact.

## Format Matrix

```yaml
LANDSCAPE: DRAWIO
INTEGRATION_ARCHITECTURE: DRAWIO
DEPLOYMENT_TOPOLOGY: DRAWIO
FLOW: MERMAID
SEQUENCE: MERMAID
MULTI_VIEW_MODEL_AS_CODE: STRUCTURIZR_DSL
```

`MERMAID` chỉ được dùng cho flow hoặc sequence. Nó không thay thế landscape hay integration
architecture vì không giữ được domain containment có governance và orthogonal geometry xác định.
`STRUCTURIZR_DSL` sở hữu text model-as-code; nó không cho skill thứ hai quyền sinh Draw.io artifact
cạnh tranh.

Bundled deterministic renderer hỗ trợ `LANDSCAPE` và `INTEGRATION_ARCHITECTURE`.
`DEPLOYMENT_TOPOLOGY` vẫn cần `DRAWIO`, nhưng release này bàn giao cho house owner đã xác nhận; nếu
không có, trả `BLOCK_RENDER`. Không hạ xuống Mermaid.

## Phát Hiện House Owner

Tìm trong repo instruction, skill inventory, visual standard, Draw.io validator hiện hữu và generated
artifact. Chỉ xác nhận house owner khi authoritative source giao rõ lane diagram-tool được yêu cầu.

Ghi:

```yaml
house_detection:
  status: PRESENT|ABSENT|AMBIGUOUS
  owner_skill: ""
  evidence_refs: []
  conflicting_claims: []
```

- `PRESENT`: dùng house path.
- `ABSENT`: dùng bundled path `ARCHITECTURE_MODELING`.
- `AMBIGUOUS`: đặt ownership `UNRESOLVED`, không sinh diagram-tool artifact và nêu decision owner.
  Im lặng hoặc tên skill tương tự không phải bằng chứng absent/present.

## Luật Đúng-Một-Owner

```yaml
render_plan:
  render_owner: HOUSE_SKILL|ARCHITECTURE_MODELING|UNRESOLVED
  owner_skill: ""
  built_in_renderer: REQUIRED|MUST_NOT_RUN|BLOCKED
  exactly_one_render_owner: true|false
  handoff:
    model_source: ""
    requested_views: []
    destination_paths: []
    format_contract: ""
    convention_refs: []
    quality_contract_ref: "references/quality-contract.vi.md"
  emitted_artifacts: []
```

Model luôn do architecture-modeling sở hữu. Chỉ quyền render diagram-tool được chuyển.

## Các Case Xác Định

```yaml
cases:
  - case_id: no-house
    house_detection: ABSENT
    render_owner: ARCHITECTURE_MODELING
    owner_skill: architecture-modeling
    built_in_renderer: REQUIRED
    exactly_one_render_owner: true
    handoff_required: false
    competing_artifact_count: 0
  - case_id: house
    house_detection: PRESENT
    render_owner: HOUSE_SKILL
    owner_skill: ggg-architecture-design
    built_in_renderer: MUST_NOT_RUN
    exactly_one_render_owner: true
    handoff_required: true
    competing_artifact_count: 0
  - case_id: unresolved
    house_detection: AMBIGUOUS
    render_owner: UNRESOLVED
    owner_skill: ""
    built_in_renderer: BLOCKED
    exactly_one_render_owner: false
    handoff_required: false
    competing_artifact_count: 0
```

## Handoff Đầy Đủ

House path phải nhận đúng `model_source`, requested view ID cùng `source_fact_ids`, destination path,
quyết định format, convention source và quality threshold. Sau handoff, architecture-modeling không
sinh Draw.io/Visio/slide artifact và không validate private implementation của house tool; nó
validate artifact trả về theo shared output contract.

Built-in path phải ghi `owner_skill: architecture-modeling`, chỉ dùng bundled renderer và liệt kê
đúng emitted artifact path. Không gọi presentation skill như renderer thứ hai.

## Kiểm Tra Hoàn Tất Ownership

- `render_owner` thuộc một trong ba state đã khai.
- Ownership đã chốt đặt `exactly_one_render_owner: true`.
- `HOUSE_SKILL` kéo theo `MUST_NOT_RUN` và handoff đầy đủ.
- `ARCHITECTURE_MODELING` kéo theo `REQUIRED` cho output DRAWIO được yêu cầu và không có house handoff.
- `UNRESOLVED` kéo theo `BLOCKED` và emitted-artifact list rỗng.
- `competing_artifact_count` luôn bằng 0.
