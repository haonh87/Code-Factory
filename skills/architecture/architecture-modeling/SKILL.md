---
language: en
name: architecture-modeling
description: Build one governed architecture model and derive consistent business and engineering views for system landscape, overall architecture, integration architecture, or deployment topology work. Use at s05 after acceptance criteria and boundaries are known. Selects DRAWIO for landscape/integration, MERMAID only for flow/sequence, and STRUCTURIZR_DSL for multi-view model-as-code. Detects a house presentation skill and assigns exactly one render owner. Does not decide bounded contexts, choose the technical approach, generate deployment manifests, or create competing diagram artifacts.
---

# Architecture Modeling

> Vietnamese: `SKILL.vi.md`

Build one text model of stable architecture facts, then derive every requested view from that model.
Keep model ownership separate from presentation-tool ownership so two skills never render competing
artifacts.

## Position In The Workflow

- Run at `s05 Technical Approach`, after s04 acceptance criteria and system/domain boundaries are known.
- Consume boundary decisions from `domain-architecture`; never recreate or override them.
- Feed the approved technical approach, review, testing, and documentation lanes.
- Describe deployment topology when requested, but never generate deployment manifests, Compose,
  Kubernetes YAML, Terraform, or pipeline configuration.

## When To Use

- A system landscape or overall architecture view is needed.
- Integration architecture must show direction, ownership, and contract behavior.
- Business and engineering readers need different views over the same facts.
- A deployment topology must be described without generating deployable configuration.
- Existing diagrams have drifted and need a model-backed source of truth.

## Out Of Scope

- Do not decide bounded contexts, domain modules, or data ownership; that is `domain-architecture`.
- Do not select an architecture style, stack, or technical approach.
- Do not invent system, integration, owner, boundary, or contract facts.
- Do not produce implementation tasks, deployment manifests, or release pipelines.
- Do not use Mermaid for a landscape or integration architecture.
- Do not render a diagram-tool artifact when a detected house skill owns that lane.

## Minimum Input

- Requested view kinds and audiences.
- `architecture_state`: `baseline`, `transition`, `target`, or `vision`—one state per model.
- System inventory with stable `system_id`, responsibility, boundary, domain, and owner where known.
- Integration inventory with stable `integration_id`, direction, business purpose, and contract owner
  where known.
- Existing domain/boundary decisions and evidence references.
- House conventions and available house presentation/modeling skills, if any.
- Output language and destination paths.

Missing facts are normal. Record them as gaps with an owner to resolve; never manufacture them.

## Required Output

Emit one result envelope:

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

The full field contract is in `references/model-contract.md`.

## Execution Flow

1. Detect canonical model/visual conventions and any house skill that owns Draw.io, Visio, slides,
   or equivalent presentation artifacts. Record sources; do not infer ownership from a vague name.
2. Normalize supplied facts into stable element and relationship IDs. Keep boundary, owner, and
   domain as separate facts. Mark missing values as gaps.
3. Confirm one `architecture_state`. Split baseline and target into separate models/views if both
   are requested.
4. Derive business and engineering views from the same element/relationship set. Every view lists
   `source_fact_ids`; view text cannot introduce a new fact.
5. Route formats exactly:
   - system landscape, integration architecture, and deployment topology → `DRAWIO`;
   - flow and sequence → `MERMAID` only;
   - multiple views maintained as model-as-code → `STRUCTURIZR_DSL`.
   The bundled deterministic renderer in this release allowlists landscape and integration
   architecture only. Deployment topology still routes to `DRAWIO`, but requires a confirmed house
   renderer; without one, record `BLOCK_RENDER` instead of falling back to Mermaid.
6. Resolve render ownership before rendering:
   - detected house owner → `HOUSE_SKILL`; emit a complete handoff and set the built-in renderer to
     `MUST_NOT_RUN`;
   - confirmed no house owner → `ARCHITECTURE_MODELING`; the bundled renderer owns requested
     `DRAWIO` artifacts;
   - ambiguous/conflicting owner → `UNRESOLVED`; render nothing and name the decision owner.
7. Validate model/view traceability and the applicable quality thresholds. Report incomplete data;
   block only when ownership or structural correctness is unresolved.
8. Emit the model, derived views, one render plan, quality report, gaps, and next-step notes.

Read `references/render-routing.md` before step 5 and `references/quality-contract.md` before step 7.

## Hard Invariants

- One invocation has exactly one model source and at most one render owner per requested artifact.
- Business and engineering views use the same stable facts and list their `source_fact_ids`.
- `HOUSE_SKILL` and `ARCHITECTURE_MODELING` are mutually exclusive render paths.
- `UNRESOLVED` ownership emits no diagram-tool artifact.
- `DRAWIO` is mandatory for system landscape and integration architecture.
- `MERMAID` is allowed only for flow and sequence.
- `STRUCTURIZR_DSL` is the model-as-code option when several views must remain synchronized.
- Gaps stay visible with evidence state and owner; unknown is never silently converted to confirmed.

## Resource Map

- `references/model-contract.md` — stable facts, model/view schema, incomplete-input policy.
- `references/render-routing.md` — format matrix, house detection, exclusive render-owner cases.
- `references/quality-contract.md` — landscape geometry and semantic quality thresholds.

## Bundled Renderer

Use the zero-dependency renderer only when `render_owner: ARCHITECTURE_MODELING` and the requested
view is `LANDSCAPE` or `INTEGRATION_ARCHITECTURE`:

```bash
node scripts/render-drawio.js --input model.json --output landscape.drawio --report landscape.quality.json
node scripts/validate-drawio.js --input model.json --drawio landscape.drawio
```

`scripts/drawio-layout.js` is the shared deterministic layout/metric engine. A quality report stays
`PARTIAL` while `manual_review_status: PENDING_QC_FIRST_OPEN`; automated success never self-approves
the human first-open check.

## Completion Conditions

- One model source contains all supplied stable facts at one architecture state.
- Every view is traceable to model fact IDs and declares audience, kind, and format.
- Render ownership is resolved to exactly one owner, or explicitly blocked as `UNRESOLVED`.
- A house-owned path contains a complete handoff and no built-in diagram artifact.
- A built-in-owned path contains no competing house artifact.
- All applicable quality metrics are reported, including failures and gaps.
- No domain design or deployment-generation responsibility was absorbed.
