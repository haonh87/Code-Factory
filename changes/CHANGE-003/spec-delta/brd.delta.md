---
change_id: "CHANGE-003"
artifact_kind: "spec-delta-brd"
status: draft
linked_work_items:
  - "artifact-governance-enforcement"
---

# BRD Delta - CHANGE-003

## Delta
```yaml
base_spec_ref: "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s04.acceptance-criteria.md@2e268cfce45dfad96d465b2e3b57669d03e10439d03c175f4f1b964f4b14dabc"
related_base_spec_refs:
  - "work-items/artifact-governance-model/artifact-governance-model.s01.restate.md#phase_plan"
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
adds:
  - id: "BRD-DELTA-004"
    business_need: "The artifact-governance capability already used to define and enforce P2 must be available to adopters of the managed bundle."
    outcome: "A clean v2.5.0 installation exposes artifact-governance in Codex and Claude as managed skill 42."
    traces_to:
      - "CHANGE-003 OBJ-002"
  - id: "BRD-DELTA-005"
    business_need: "Current release evidence must describe the current artifact without rewriting already-approved release history."
    outcome: "v2.5.0 owns the 42-skill inventory, the frozen v2.4.0 record remains 41, and v2.3.2 remains 40."
    traces_to:
      - "CHANGE-003 OBJ-003"
  - id: "BRD-DELTA-006"
    business_need: "The repository-wide verification gate must be green before P2 can reach DoD."
    outcome: "All 36 workflow-bundle unit files pass, including the five T7-F1 release files."
    traces_to:
      - "CHANGE-003 OBJ-001"
updates:
  - target: "artifact-governance-enforcement s04 Artifact Chính.out_of_scope"
    change: "Supersede only the release/version/bundle-registration exclusion for CHANGE-003; P4 migration and unrelated approval-path defects remain excluded."
  - target: "artifact-governance-enforcement s04 done_when"
    change: "Extend completion evidence from AC-001..AC-010 to AC-001..AC-016 and require the aggregate unit gate to pass."
  - target: "artifact-governance-model P1 sequencing_constraint"
    change: "Mark its condition satisfied: stabilize-architecture-skill-bundle is DONE, so a separately approved change may register artifact-governance."
removes: []
scope_guards:
  - "Do not alter the frozen v2.4.0 release note or its 41-skill evidence."
  - "Do not alter v2.3.2 historical evidence or its 40-skill inventory."
  - "Do not publish, tag, or update live global installations before human Release approval."
```
