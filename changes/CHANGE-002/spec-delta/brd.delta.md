---
change_id: "CHANGE-002"
artifact_kind: "spec-delta-brd"
status: approved
spec_reviewed_by: "ba"
spec_reviewed_at: "2026-08-14T14:20:25Z"
linked_work_items:
  - "stabilize-architecture-skill-bundle"
---

# BRD Delta - CHANGE-002

## Delta
```yaml
base_spec_ref: "product-specs/cards/architecture-role-skills.md@0.6"
related_base_spec_refs:
  - "product-specs/cards/arch-role-skills-release.md@0.1"
adds:
  - id: "BRD-DELTA-001"
    business_need: "A clean workflow-bundle installation must include the capability that fulfills the landscape production contract already required by sa and ta."
    outcome: "architecture-modeling is a managed bundle skill, available in both runtimes, and can complete the required drawio path when no house presentation skill owns that artifact."
    traces_to:
      - "OBJ-002"
  - id: "BRD-DELTA-002"
    business_need: "A public release must not appear healthy while repeat upgrade, machine-readable contracts, or approval evidence are broken."
    outcome: "v2.4.0 closes every reviewed v2.3.2 finding and reports install, contract, evidence, inventory, and release state consistently."
    traces_to:
      - "OBJ-001"
      - "OBJ-003"
  - id: "BRD-DELTA-003"
    business_need: "Corrective evidence must remain distinguishable from the evidence originally approved for v2.3.2."
    outcome: "Every corrected historical artifact is traced to CHANGE-002, stale approval evidence is superseded, and new review evidence is collected."
    traces_to:
      - "OBJ-003"
updates:
  - target: "architecture-role-skills Business Goal.out_scope"
    change: "Supersede the exclusion that assigned architecture-modeling bundling to a later work item; CHANGE-002 is that separately governed work item."
  - target: "arch-role-skills-release Business Goal.in_scope"
    change: "Supersede the 40-skill/v2.3.2 release target with the corrective 41-skill/v2.4.0 target."
  - target: "arch-role-skills-release Business Goal.out_scope"
    change: "Allow scoped sa/ta corrections and truthful release-note content required by the reviewed findings."
removes: []
```
