# Landscape Quality Contract

Apply these checks to a representative `DRAWIO` system landscape or integration architecture.
Business and engineering views may use different labels, but both must trace to the same model facts.

## Required Metrics

```yaml
quality_metrics:
  named_ownership_rate:
    value: 0
    threshold: 1.0
  overlap_count:
    value: 0
    threshold: 0
  non_endpoint_intersection_count:
    value: 0
    threshold: 0
  unanalyzed_two_way_arrow_count:
    value: 0
    threshold: 0
  vague_aggregate_box_count:
    value: 0
    threshold: 0
  engineering_element_count:
    value: 0
    threshold: 25
  delete_test_failure_count:
    value: 0
    threshold: 0
  containment_error_count:
    value: 0
    threshold: 0
  manual_step_count:
    value: 0
    threshold: 1
```

Every metric reports `value`, `threshold`, measurement evidence, and status. Do not omit a failed or
non-applicable metric; use a reason when it cannot be measured.

## Geometry Rules

- Domain/capability boundaries contain their owned child boxes with visible padding.
- Boxes do not overlap. Labels remain inside their owning box or edge-label cell.
- Relationships use directed orthogonal routes.
- An edge may meet its own source/target endpoints; crossing any other box is a
  `non_endpoint_intersection_count` defect.
- A deliberately routed edge crossing another edge is recorded for review even when technically
  valid XML.

## Semantic Rules

- Every visible system has a named owner or a visible `OPEN owner` annotation.
- No unexplained two-way arrow. Opposite behaviors are separate directed relationships.
- No vague box named only `integration layer`, `middleware`, `platform`, or equivalent without a
  stable fact, responsibility, and owner.
- Engineering views contain at most 25 elements. Split along governed boundaries instead of
  shrinking labels.
- The delete test asks, for every box: if removed, who makes a wrong decision? A box that answers no
  decision question fails.
- Containment follows canonical boundary facts, not visual convenience.

## Manual-Step Budget

The output must open as valid mxGraph XML and require no more than one stated manual step. The only
allowed manual step is opening the representative artifact for QC visual confirmation. Manual
re-layout, reconnecting edges, or repairing labels is a quality failure.

## Verdict

- `PASS`: every threshold passes and XML is structurally valid.
- `PARTIAL`: an explicitly manual/QC-only check remains, with all automated thresholds passing.
- `FAIL`: any automated threshold fails, ownership is unresolved, or the artifact requires repair.

The first-open QC check is separate from automated geometry evidence and cannot be self-approved by
the renderer.
