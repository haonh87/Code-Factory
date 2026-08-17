---
language: vi
name: architecture-modeling
description: Dựng một model kiến trúc có governance rồi sinh các view nghiệp vụ và kỹ thuật nhất quán cho system landscape, overall architecture, integration architecture hoặc deployment topology. Dùng ở s05 sau khi acceptance criteria và boundary đã rõ. Chọn DRAWIO cho landscape/integration, MERMAID chỉ cho flow/sequence, và STRUCTURIZR_DSL cho model-as-code nhiều view. Phát hiện house presentation skill và gán đúng một render owner. Không quyết định bounded context, không chọn technical approach, không sinh manifest triển khai, không tạo diagram cạnh tranh.
---

# Architecture Modeling

> English: `SKILL.md`

Dựng một text model chứa các fact kiến trúc ổn định, rồi sinh mọi view được yêu cầu từ chính model
đó. Tách quyền sở hữu model khỏi quyền sở hữu công cụ trình bày để hai skill không bao giờ render
hai artifact cạnh tranh.

## Vị Trí Trong Workflow

- Chạy ở `s05 Technical Approach`, sau khi acceptance criteria s04 và boundary hệ thống/domain đã rõ.
- Tiêu thụ quyết định boundary từ `domain-architecture`; không dựng lại hoặc ghi đè quyết định đó.
- Cấp đầu vào cho technical approach, review, testing và documentation lane.
- Mô tả deployment topology khi được yêu cầu, nhưng không sinh manifest triển khai, Compose,
  Kubernetes YAML, Terraform hay pipeline config.

## Khi Nào Dùng

- Cần system landscape hoặc overall architecture.
- Integration architecture phải thể hiện hướng, owner và hành vi contract.
- Business và engineering cần hai view khác nhau trên cùng một tập fact.
- Cần mô tả deployment topology mà không sinh cấu hình có thể deploy.
- Diagram hiện tại đã drift và cần source of truth dựa trên model.

## Ngoài Phạm Vi

- Không quyết định bounded context, domain module hay data ownership; đó là `domain-architecture`.
- Không chọn architecture style, stack hay technical approach.
- Không tự bịa system, integration, owner, boundary hoặc contract fact.
- Không sinh implementation task, manifest triển khai hoặc release pipeline.
- Không dùng Mermaid cho landscape hoặc integration architecture.
- Không render diagram-tool artifact khi house skill đã sở hữu lane đó.

## Đầu Vào Tối Thiểu

- Loại view, audience được yêu cầu.
- `architecture_state`: `baseline`, `transition`, `target` hoặc `vision`—một state cho mỗi model.
- System inventory có `system_id` ổn định, responsibility, boundary, domain và owner nếu đã biết.
- Integration inventory có `integration_id` ổn định, hướng, business purpose và contract owner nếu biết.
- Quyết định domain/boundary hiện hữu và evidence ref.
- House convention và house presentation/modeling skill hiện có, nếu có.
- Ngôn ngữ output và destination path.

Thiếu fact là trạng thái bình thường. Ghi gap cùng owner cần xử lý; không tự tạo fact.

## Đầu Ra Bắt Buộc

Sinh một result envelope:

```yaml
architecture_model:
  architecture_state: baseline|transition|target|vision
  model_format: ARCHITECTURE_YAML|STRUCTURIZR_DSL
  model_source: ""
  elements: []
  relationships: []
views:
  business_views: []
  engineering_views: []
render_plan:
  ownership_status: RESOLVED|UNRESOLVED
  render_owner: HOUSE_SKILL|ARCHITECTURE_MODELING|UNRESOLVED
  owner_skill: ""
  built_in_renderer: REQUIRED|MUST_NOT_RUN|BLOCKED
  exactly_one_render_owner: true|false
  requested_artifacts: []
  emitted_artifacts: []
  handoff: {}
quality:
  status: PASS|FAIL|PARTIAL|NOT_RUN
  metrics: {}
gaps: []
notes_for_next_step: ""
```

Field contract đầy đủ nằm ở `references/model-contract.vi.md`.

## Luồng Thực Hiện

1. Phát hiện convention model/visual canonical và house skill sở hữu Draw.io, Visio, slide hoặc
   presentation artifact tương đương. Ghi source; không suy quyền sở hữu từ tên mơ hồ.
2. Chuẩn hóa fact được cung cấp thành element/relationship ID ổn định. Giữ boundary, owner và domain
   là ba fact riêng. Đánh dấu giá trị thiếu thành gap.
3. Xác nhận một `architecture_state`. Tách baseline và target thành model/view riêng nếu cần cả hai.
4. Sinh business và engineering view từ cùng tập element/relationship. Mỗi view liệt kê
   `source_fact_ids`; nội dung view không được tạo fact mới.
5. Route format chính xác:
   - system landscape, integration architecture và deployment topology → `DRAWIO`;
   - flow và sequence → chỉ `MERMAID`;
   - nhiều view duy trì dưới dạng model-as-code → `STRUCTURIZR_DSL`.
   Bundled deterministic renderer của release này chỉ allowlist landscape và integration
   architecture. Deployment topology vẫn route sang `DRAWIO` nhưng cần house renderer đã xác nhận;
   nếu không có, ghi `BLOCK_RENDER` thay vì fallback sang Mermaid.
6. Chốt render ownership trước khi render:
   - phát hiện house owner → `HOUSE_SKILL`; sinh handoff đầy đủ và đặt built-in renderer thành
     `MUST_NOT_RUN`;
   - xác nhận không có house owner → `ARCHITECTURE_MODELING`; bundled renderer sở hữu artifact
     `DRAWIO` được yêu cầu;
   - owner mơ hồ/xung đột → `UNRESOLVED`; không render và nêu decision owner.
7. Validate traceability model/view và threshold chất lượng áp dụng. Báo dữ liệu thiếu; chỉ block khi
   ownership hoặc structural correctness chưa được giải quyết.
8. Sinh model, derived views, một render plan, quality report, gaps và next-step notes.

Đọc `references/render-routing.vi.md` trước bước 5 và `references/quality-contract.vi.md` trước bước 7.

## Bất Biến Cứng

- Một invocation có đúng một model source và tối đa một render owner cho mỗi artifact được yêu cầu.
- Business và engineering view dùng cùng stable fact và liệt kê `source_fact_ids`.
- `HOUSE_SKILL` và `ARCHITECTURE_MODELING` là hai render path loại trừ lẫn nhau.
- Ownership `UNRESOLVED` không sinh diagram-tool artifact.
- `DRAWIO` là bắt buộc cho system landscape và integration architecture.
- `MERMAID` chỉ được dùng cho flow và sequence.
- `STRUCTURIZR_DSL` là lựa chọn model-as-code khi nhiều view phải đồng bộ.
- Gap luôn hiển thị cùng evidence state và owner; unknown không được âm thầm nâng thành confirmed.

## Bản Đồ Resource

- `references/model-contract.vi.md` — stable fact, schema model/view, chính sách input thiếu.
- `references/render-routing.vi.md` — format matrix, phát hiện house skill, case render owner loại trừ.
- `references/quality-contract.vi.md` — threshold geometry và semantic cho landscape.

## Bundled Renderer

Chỉ dùng zero-dependency renderer khi `render_owner: ARCHITECTURE_MODELING` và requested view là
`LANDSCAPE` hoặc `INTEGRATION_ARCHITECTURE`:

```bash
node scripts/render-drawio.js --input model.json --output landscape.drawio --report landscape.quality.json
node scripts/validate-drawio.js --input model.json --drawio landscape.drawio
```

`scripts/drawio-layout.js` là engine layout/metric deterministic dùng chung. Quality report giữ
`PARTIAL` khi `manual_review_status: PENDING_QC_FIRST_OPEN`; automated success không được tự phê duyệt
human first-open check.

## Điều Kiện Hoàn Tất

- Một model source chứa mọi stable fact được cung cấp ở một architecture state.
- Mọi view trace được về model fact ID và khai audience, kind, format.
- Render ownership được chốt đúng một owner, hoặc block rõ là `UNRESOLVED`.
- House-owned path có handoff đầy đủ và không có built-in diagram artifact.
- Built-in-owned path không có house artifact cạnh tranh.
- Mọi metric chất lượng áp dụng đều được báo, kể cả failure và gap.
- Không hấp thụ trách nhiệm domain design hoặc deployment generation.
