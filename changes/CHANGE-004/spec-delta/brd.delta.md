---
change_id: "CHANGE-004"
artifact_kind: "spec-delta-brd"
status: approved
spec_reviewed_by: "ba"
spec_reviewed_at: "2026-08-19T02:53:05Z"
linked_work_items:
  - "integrate-design-checklists-into-sa-ta"
---

# BRD Delta - CHANGE-004

## Delta
```yaml
base_spec_ref: "product-specs/cards/architecture-role-skills.md@0.6"
related_base_spec_refs:
  - "product-specs/cards/arch-role-skills-release.md@0.1"
adds:
  - id: "BRD-DELTA-001"
    business_need: "Architecture practitioners need ownership, authority, lifecycle, integration, compliance, and measurable-transition concerns to surface before a technical direction is selected."
    outcome: "SA and TA provide conditional, evidence-oriented architecture-readiness guidance that reduces late discovery without selecting a solution."
    traces_to:
      - "OBJ-001"
  - id: "BRD-DELTA-002"
    business_need: "Reusable bundle guidance must not expose confidential HCP decisions or promote one internal draft into universal architecture policy."
    outcome: "Only independently worded, domain-neutral concerns are distributable; source-specific names, thresholds, decisions, and confidential prose remain excluded."
    traces_to:
      - "OBJ-002"
  - id: "BRD-DELTA-003"
    business_need: "The supplementary guidance must behave consistently for current SA/TA consumers across languages and installed runtimes."
    outcome: "Existing block ownership and downstream design authority remain compatible, while canonical EN/VI and Codex/Claude runtime copies remain aligned."
    traces_to:
      - "OBJ-003"
updates:
  - target: "architecture-role-skills Business Goal.in_scope"
    change: "Add portable, conditional architecture-readiness questions and checks as supplementary s01-s04 guidance for SA and TA."
  - target: "architecture-role-skills Business Goal.out_scope"
    change: "Clarify that the supplementary guidance may surface a design concern but may not choose the technology, pattern, schema, domain boundary, diagram, or model."
  - target: "arch-role-skills-release distribution contract"
    change: "Require any approved SA/TA guidance delta to remain aligned across canonical EN/VI sources, Codex and Claude runtimes, inventory, compatibility notes, and release evidence."
removes: []
```
