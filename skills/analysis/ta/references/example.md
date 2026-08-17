---
language: en
---

# Worked Example

> Vietnamese: example.vi.md
>
> This example is TA-owned. It uses the objectives from an existing SA artifact as read-only trace
> anchors and fills only technical driver and handoff content.

## The Call

```
/ta Add pre-ordering to the customer app; pre-orders must appear on the kitchen display
```

No directives. Brownfield. The SA artifact supplies `OBJ-1` and `OBJ-2`; the current kitchen-order
contract and ownership register are available as baseline evidence.

## The Artifact

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
  reason: "owned by /sa; OBJ-1 and OBJ-2 are read-only trace anchors from sa_output"
  items: []

drivers:
  applicable: true
  reason: ""
  items:
    - id: DRV-1
      kind: quality_attribute
      statement: "Available-slot lookup responds within 300 ms at p95 under 200 requests per second"
      origin:
        stakeholder: "Product owner"
        concern: "A slow slot picker increases abandonment at the most fragile step"
        constraint_ref: "Current peak forecast 200 requests/second"
      traces_to: [OBJ-2]
      threshold:
        status: quantified
        value: "p95 <= 300 ms at 200 requests/second"
        reason: ""
      verification: "Replay the peak profile for 15 minutes and calculate p95 from the complete result set"
      architectural_significance: "Rules out a request path that depends on multiple slow synchronous lookups"
      priority: high

    - id: DRV-2
      kind: integration
      statement: "A confirmed pre-order reaches the kitchen display no later than 60 seconds after acceptance"
      origin:
        stakeholder: "Kitchen lead"
        concern: "Late visibility removes the preparation window promised by pre-ordering"
        constraint_ref: "Existing kitchen-order contract v3"
      traces_to: [OBJ-1]
      threshold:
        status: quantified
        value: "delivery lag <= 60 seconds at p99"
        reason: ""
      verification: "Replay 500 contract-v3 messages, correlate acceptance and display timestamps, and calculate p99"
      architectural_significance: "Constrains the integration path and its observable delivery semantics without choosing a transport"
      priority: high

    - id: DRV-3
      kind: integration
      statement: "The existing kitchen-order contract remains backward compatible for current orders"
      origin:
        stakeholder: "Order platform owner"
        concern: "Pre-order fields must not break current kitchen clients"
        constraint_ref: "Kitchen-order contract v3 compatibility policy"
      traces_to: [OBJ-1, OBJ-2]
      threshold:
        status: binary
        value: ""
        reason: ""
      verification: "Run the v3 consumer compatibility suite and obtain the contract owner's approval"
      architectural_significance: "Rules out a breaking replacement of the current contract"
      priority: high

    - id: DRV-4
      kind: quality_attribute
      statement: "The pre-order path recovers after kitchen-display unavailability without losing accepted orders"
      origin:
        stakeholder: "Operations lead"
        concern: "A display restart must not silently discard already accepted pre-orders"
        constraint_ref: "No measured recovery baseline exists"
      traces_to: [OBJ-1]
      threshold:
        status: not_quantified
        value: ""
        reason: "No recovery-time baseline or approved target exists for the current display integration"
      verification: "Measure recovery and loss during three controlled display restarts, then ask Operations to set the target"
      architectural_significance: "Requires explicit failure and recovery behavior before an approach can be accepted"
      priority: high

landscape:
  applicable: false
  reason: "driver-only profile; the integration boundary and current contract are already named"
  question_answered: ""
  render_format: ""
  view_axis: ""
  quality_checks: []
  manual_steps: []
  produced_by: ""

input_issues:
  unanchored_drivers: []
  contested_ownership:
    - "CAP-3 slot-capacity calculation has no single owning system in the current ownership register"
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers: []
  unquantified_nfrs:
    - "DRV-4: recovery target is absent; Operations must decide after baseline measurement"
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability: []

metrics:
  applicable: true
  items:
    - id: M-01
      name: "Objective traceability"
      formula: "drivers tracing to >=1 objective / total drivers"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "DRV-1 [OBJ-2]; DRV-2 [OBJ-1]; DRV-3 [OBJ-1,OBJ-2]; DRV-4 [OBJ-1]"
    - id: M-02
      name: "Objective support"
      formula: "objectives supported by >=1 driver / total objectives in sa_output"
      value: "2/2 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "OBJ-1 has DRV-2, DRV-3, DRV-4; OBJ-2 has DRV-1, DRV-3"
    - id: M-03
      name: "Driver provenance"
      formula: "drivers with a stakeholder concern or a named constraint / total drivers"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "Product owner, Kitchen lead, Order platform owner, and Operations lead are named"
    - id: M-04
      name: "NFR quantification"
      formula: "drivers with status quantified / drivers where a number is meaningful"
      value: "2/3 = 67%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "DRV-1 and DRV-2 quantified; DRV-4 not_quantified; binary DRV-3 excluded"
    - id: M-05
      name: "Verification coverage"
      formula: "drivers with a stated measurement method / total drivers"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "DRV-1..DRV-4 each carry a verification method"
    - id: M-06
      name: "Handoff coverage"
      formula: "drivers mapped to >=1 downstream block / total drivers"
      value: "4/4 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "All drivers appear in to_dev and to_qc; operational drivers also appear in to_devops"
    - id: M-07
      name: "Open-item ownership"
      formula: "items pushed to s03 carrying a named owner / total items pushed"
      value: "2/2 = 100%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "Both pushed_to_s03 rows name developer or devops"
    - id: M-08
      name: "Option discipline"
      formula: "direction choices with >=1 rejected alternative and reason / total direction choices"
      value: "0/0 = n/a"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "TA records constraints only; direction choice belongs to s05"
    - id: M-09
      name: "Landscape element ownership"
      applicable: false
      reason: "landscape applicable=false in driver-only profile"
      formula: "landscape elements with a named owner / total elements"
      value: "n/a"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "landscape applicable=false in driver-only profile"
    - id: M-10
      name: "Capability ownership clarity"
      formula: "capabilities in scope with exactly one owning system / total capabilities in scope"
      value: "2/3 = 67%"
      threshold: "100%"
      calibration: uncalibrated
      evidence: "CAP-1 order acceptance belongs to Order Management; CAP-2 kitchen projection belongs to Kitchen Display; CAP-3 slot-capacity calculation is contested"

handoff:
  to_ba:
    applicable: false
    reason: "owned by /sa"
    items: []
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Technical constraint DRV-1: preserve p95 <= 300 ms at 200 requests/second"
      - "Contract constraint DRV-2/DRV-3: keep contract v3 compatible and observable with p99 delivery lag <= 60 seconds"
      - "Failure constraint DRV-4: approach must state loss prevention and recovery behavior"
  to_qc:
    applicable: true
    reason: ""
    items:
      - "DRV-1: 15-minute peak replay and p95 calculation"
      - "DRV-2: 500-message correlation and p99 delivery calculation"
      - "DRV-3: v3 consumer compatibility suite and owner approval"
      - "DRV-4: three controlled restart measurements before target approval"
  to_devops:
    applicable: true
    reason: ""
    items:
      - "DRV-1: retain the 200 requests/second peak profile for capacity validation"
      - "DRV-2: expose acceptance-to-display delivery lag"
      - "DRV-4: own the restart baseline and recovery target proposal"

stop_condition:
  met: false
  reason: "Recovery target and slot-capacity ownership remain unresolved; both must move to s03 instead of being guessed"
  pushed_to_s03:
    - question: "Which system owns slot-capacity calculation and its contract"
      owner: "developer"
    - question: "What recovery-time and loss target applies after kitchen-display unavailability"
      owner: "devops"
```

## What This Example Is Showing

- `objectives` and `to_ba` remain present but non-applicable because SA owns them.
- `DRV-3` is binary and excluded from M-04, while its compatibility verification remains mandatory.
- `to_dev`, `to_qc`, and `to_devops` are independently actionable and contain only the technical lens.
- M-10 exposes the unresolved capacity owner instead of assigning one during pre-design analysis.

## What Is Not Here, On Purpose

No stack, product, transport, pattern, schema, or module design is selected. Those choices belong to
`system-design` and the specialized architecture skills at s05.
