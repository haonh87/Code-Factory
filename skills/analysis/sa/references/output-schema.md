---
language: en
---

# Output Schema

> Vietnamese: output-schema.vi.md

The full artifact `sa` emits. `ta` emits the same schema — ownership of each block is defined in
`block-ownership.md`.

**The shape never changes.** Depth changes with the profile; blocks do not appear and disappear. A
block that does not apply is emitted with `applicable: false` and a `reason`. This is `REQ-015`, and
it exists so a downstream reader can tell *"not needed"* apart from *"nobody looked"*.

## Schema

```yaml
invocation:
  skill: sa|ta
  directives_parsed:                 # what the skill understood from the call
    - raw: ""                        # the caller's words
      interpreted_as: ""             # output request | render format | profile | audience
      effect: ""
  directives_unresolved:             # never guessed — asked once, or reported
    - raw: ""
      why: ""
  selected_profile: driver-only|driver+landscape|full
  profile_source: default|caller|escalated
  escalation_reasons: []             # non-empty whenever profile_source = escalated

objectives:
  applicable: true|false
  reason: ""                         # required when applicable = false
  items:
    - id: OBJ-001
      statement: ""
      measure: ""                    # how anyone knows it was met
      source: ""                     # who stated it
      confidence: stated|inferred    # inferred means nobody said it out loud

drivers:
  applicable: true|false
  reason: ""
  items:
    - id: DRV-001
      kind: business_goal|constraint|regulatory|system_boundary|data_ownership|quality_attribute|integration
      statement: ""
      origin:
        stakeholder: ""              # a driver with no stakeholder and no named
        concern: ""                  # constraint is not a driver — it is an opinion
        constraint_ref: ""
      traces_to: []                  # OBJ ids. Empty = this driver serves no stated objective;
                                     # it must then appear in input_issues.untraceable_drivers
      threshold:
        status: quantified|binary|not_quantified
        value: ""
        reason: ""                   # required when not_quantified
      verification: ""               # how it will be checked later
      architectural_significance: "" # why it shapes architecture, not just a wish
      priority: high|medium|low

landscape:
  applicable: true|false
  reason: ""
  question_answered: ""              # if no one can state this, do not draw
  render_format: drawio|mermaid|structurizr-dsl
  view_axis: domain|system
  quality_checks: []                 # the 8 counts from landscape-quality-bar.md
  manual_steps: []                   # must be <= 1 entry
  produced_by: architecture-modeling # this skill never draws

input_issues:                        # mandatory at every profile — never applicable: false
  unanchored_drivers: []             # no stakeholder concern and no named constraint — fails M-03
  contested_ownership: []            # two systems claim the same capability or data, or none does — fails M-10
  untraceable_drivers: []            # reaches no objective (traces_to empty) — fails M-01
  unsupported_objectives: []
  conflicting_drivers:
    - pair: []
      nature: ""
      owner: ""                      # who has authority to settle it
  unquantified_nfrs: []
  ownerless_assumptions: []
  surplus_drivers: []                # drivers landing in no handoff block — REQ-017
  missing_capability: []             # an optional dependency needed by the profile is not installed

metrics:
  applicable: true|false
  items:                              # exactly M-01 through M-10, never fewer
    - id: M-01
      applicable: true|false
      reason: ""                      # required when applicable = false
      name: ""
      formula: ""
      value: ""
      threshold: ""
      calibration: uncalibrated
      evidence: ""                   # points at the rows the number came from

handoff:
  to_ba:    { applicable: true|false, reason: "", items: [] }
  to_dev:   { applicable: true|false, reason: "", items: [] }   # shared: sa gives boundary
                                                                 # constraints, ta gives technical ones
  to_qc:    { applicable: true|false, reason: "", items: [] }
  to_devops: { applicable: true|false, reason: "", items: [] }

stop_condition:
  met: true|false
  reason: ""
  pushed_to_s03:                     # what analysis could not settle
    - question: ""
      owner: ""                      # an item with no owner is not handed off
```

## Rules That Bind The Schema Together

| Rule | Where it bites |
|---|---|
| Every driver traces to an objective, or appears in `input_issues.untraceable_drivers` | `M-01` |
| Every objective has ≥1 driver, or appears in `input_issues.unsupported_objectives` | `M-02` |
| Every driver has a stakeholder concern or a named constraint, or appears in `input_issues.unanchored_drivers` | `M-03` |
| `not_quantified` requires a `reason` — an empty reason is a schema violation | `M-04` |
| `binary` drivers are excluded from the `M-04` denominator — they will never carry a number | `M-04` |
| Every driver has a `verification`, whatever its threshold status | `M-05` |
| Every driver maps to ≥1 `handoff` block, or appears in `input_issues.surplus_drivers` | `M-06` |
| Every `pushed_to_s03` entry has an owner | `M-07` |
| `input_issues` is never `applicable: false` | `REQ-015` |
| `escalation_reasons` non-empty whenever `profile_source: escalated` | `REQ-014` |

## Filling In Each Handoff Block

A downstream block must be readable on its own. The test is not that the block exists — it is that
a person who has read nothing else can act on it.

| Block | Contains | Reader should be able to |
|---|---|---|
| `to_ba` | Drivers that become acceptance criteria, with thresholds | Write a testable criterion without asking anything |
| `to_dev` | Boundary constraints from `sa`, technical constraints from `ta`, contracts to preserve | Know what the design may not do |
| `to_qc` | The verification method of every driver | Design a check per driver |
| `to_devops` | Availability, scaling, rollback and environment drivers | Size the runtime and the rollout |

A block with no applicable content is emitted `applicable: false` with a reason. An empty `items`
list under `applicable: true` is an issue — it means the lens was opened and nothing was done with
it.
