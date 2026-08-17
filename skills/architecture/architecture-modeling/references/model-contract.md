# Architecture Model Contract

The invariant is **one model, many derived views**. The model stores stable facts; views select,
group, and label those facts for an audience. A view must never introduce a system, relationship,
owner, boundary, or state that is absent from the model.

## Canonical Shape

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

## Stable-Fact Rules

- `system_id` and `integration_id` are supplied stable IDs. Never derive domain or ownership from an
  ID prefix.
- Boundary, domain, owner, and technology are independent fields. Do not collapse one into another.
- A relationship is directional. Two opposite flows require two `integration_id` values and two
  reasons; never abbreviate them as an unexplained two-way arrow.
- `architecture_state` applies to the whole model. Baseline and target are separate models or
  separate model versions, not mixed nodes in one view.
- `ARCHITECTURE_YAML` is the portable default. Use `STRUCTURIZR_DSL` when several model-as-code
  views must remain synchronized by a DSL toolchain.

## View Derivation

- Business and engineering views read the same `elements` and `relationships`.
- Every view lists every used element/relationship ID in `source_fact_ids`.
- A business view may hide technical-only facts but cannot rename responsibility into a new fact.
- An engineering view may add protocol/technology labels already stored in the model.
- Excluding a fact requires an explicit reason in the view notes; it is never silently dropped.

## Incomplete Input

Do not stop merely because an owner, domain, protocol, or contract field is unknown. Keep the fact,
set `evidence_state: OPEN`, and add a gap with `owner_to_resolve`. Use these effects:

- `ANNOTATE`: view can render with the gap visibly marked.
- `BLOCK_MODEL`: supplied facts contradict each other or stable IDs/direction are unusable.
- `BLOCK_RENDER`: model is usable, but render ownership or a mandatory rendering constraint is open.

Unknown data is not permission to guess. A human can resolve a gap; an invented fact cannot be
distinguished from truth later.

## Model Completion Check

- Exactly one `model_id`, `architecture_state`, `model_format`, and `model_source`.
- Every element has a stable ID and one-sentence responsibility, or a blocking gap.
- Every relationship references existing element IDs and has an explicit direction.
- Every derived view lists its `source_fact_ids` and only uses IDs present in the model.
- Every blank governed field has a gap, evidence state, and resolution owner.
