# Render Routing And Ownership

Resolve format and ownership before creating any diagram-tool artifact.

## Format Matrix

```yaml
LANDSCAPE: DRAWIO
INTEGRATION_ARCHITECTURE: DRAWIO
DEPLOYMENT_TOPOLOGY: DRAWIO
FLOW: MERMAID
SEQUENCE: MERMAID
MULTI_VIEW_MODEL_AS_CODE: STRUCTURIZR_DSL
```

`MERMAID` is allowed only for flow or sequence. It is not a substitute for a landscape or
integration architecture because it cannot preserve governed domain containment and deterministic
orthogonal geometry. `STRUCTURIZR_DSL` owns text model-as-code; it does not grant a second skill
permission to emit a competing Draw.io artifact.

The bundled deterministic renderer supports `LANDSCAPE` and `INTEGRATION_ARCHITECTURE`. A
`DEPLOYMENT_TOPOLOGY` still requires `DRAWIO`, but this release hands it to a confirmed house owner;
without one, return `BLOCK_RENDER`. Never downgrade it to Mermaid.

## Detecting A House Owner

Search repository instructions, skill inventories, visual standards, existing Draw.io validators,
and generated artifacts. A house owner is confirmed only when an authoritative source explicitly
assigns it the requested diagram-tool lane.

Record:

```yaml
house_detection:
  status: PRESENT|ABSENT|AMBIGUOUS
  owner_skill: ""
  evidence_refs: []
  conflicting_claims: []
```

- `PRESENT`: use the house path.
- `ABSENT`: use the bundled `ARCHITECTURE_MODELING` path.
- `AMBIGUOUS`: set ownership to `UNRESOLVED`, emit no diagram-tool artifact, and name the decision
  owner. Silence or a similar skill name is not evidence of absence/presence.

## Exactly-One-Owner Rule

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
    quality_contract_ref: "references/quality-contract.md"
  emitted_artifacts: []
```

The model stays owned by architecture-modeling in every case. Only diagram-tool rendering moves.

## Deterministic Cases

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

## Handoff Completeness

The house path must receive the exact `model_source`, requested view IDs with `source_fact_ids`,
destination paths, format decision, convention sources, and quality thresholds. After handoff,
architecture-modeling emits no Draw.io/Visio/slide artifact and does not validate the house tool's
private implementation; it validates the returned artifact against the shared output contract.

The built-in path must record `owner_skill: architecture-modeling`, use only the bundled renderer,
and list exactly the emitted artifact paths. It must not invoke a presentation skill as a second
renderer.

## Ownership Completion Check

- `render_owner` is one of the three declared states.
- Resolved ownership sets `exactly_one_render_owner: true`.
- `HOUSE_SKILL` implies `MUST_NOT_RUN` and a complete handoff.
- `ARCHITECTURE_MODELING` implies `REQUIRED` for requested DRAWIO output and no house handoff.
- `UNRESOLVED` implies `BLOCKED` and an empty emitted-artifact list.
- `competing_artifact_count` is always zero.
