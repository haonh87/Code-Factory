---
change_id: "CHANGE-005"
artifact_kind: "spec-delta-brd"
status: approved
linked_work_items:
  - "add-diagram-design-adapter"
---

# BRD Delta - CHANGE-005

## Delta
```yaml
base_spec_ref: "skills/analysis/sa/SKILL.md; skills/analysis/ta/SKILL.md; skills/architecture/architecture-modeling/SKILL.md"
adds:
  - id: "BR-001"
    statement: "SA and TA may declare presentation intent and a question to be answered, but they must emit no diagram, construct no canonical model, and make no solution decision in s01-s04."
    source: "OBJ-001, SA-DRV-001, OUT-001"
  - id: "BR-002"
    statement: "The first release serves two audience profiles: a business decision-maker and an engineering reviewer, each through an explicit declared-question request."
    source: "OQ-001:A"
  - id: "BR-003"
    statement: "The first release produces self-contained HTML as the primary presentation derivative and supports SVG and PNG exports."
    source: "OQ-002:A"
  - id: "BR-004"
    statement: "The canonical architecture model and governed canonical view remain authoritative; every presentation output has a distinct artifact identity, purpose, and owner and is visibly labeled non-canonical."
    source: "OBJ-002, SA-DRV-002, SA-DRV-003, OUT-002"
  - id: "BR-005"
    statement: "All representative reviewers must identify the canonical artifact, derivative purpose, and owner correctly; at least 90% of representative reader tasks must answer the declared question with zero semantic contradictions."
    source: "OQ-003:A, METRIC-003, METRIC-004"
  - id: "BR-006"
    statement: "Presentation layout may vary, but visible architecture facts and relationships must have 100% canonical traceability, zero semantic diff, and passing accessibility and security checks; pixel equality is not required."
    source: "OQ-006:A, SA-DRV-002, TA-DRV-002, TA-DRV-003"
  - id: "BR-007"
    statement: "The external presentation capability must be reviewable, pinned, secure by default, reversible, and separately releasable; no default-branch tracking, arbitrary URL onboarding, auto-update, global install, or release claim is allowed without its applicable gate."
    source: "OBJ-003, OUT-004, TA-DRV-004, TA-DRV-005, TA-DRV-006, OQ-009-DIGEST-001"
  - id: "BR-008"
    statement: "CHANGE-005 authoring may proceed through s04-s06, but overlapping runtime activation or implementation remains blocked until CHANGE-004 is verified and its resulting baseline is re-read."
    source: "OQ-007:A, SA-DRV-004"
updates: []
removes: []
```

## Business Scope
```yaml
audiences:
  - id: "AUD-BUSINESS"
    profile: "business decision-maker"
    declared_question_pattern: "What architecture decision, boundary, ownership, or risk needs business confirmation?"
  - id: "AUD-ENGINEERING"
    profile: "engineering reviewer"
    declared_question_pattern: "What systems, relationships, ownership, or constraints must engineering review?"
mandatory_formats:
  primary: "HTML"
  exports: ["SVG", "PNG"]
success_measures:
  role_boundary_conformity: "100% representative SA/TA cases; 0 direct diagrams, model decisions, or solution decisions"
  semantic_traceability: "100% visible facts and relationships mapped; 0 unsupported or contradictory facts"
  source_of_truth_clarity: "100% representative reviewers identify canonical artifact, derivative purpose, and owner"
  declared_question_comprehension: ">=90% representative reader tasks correct; 0 semantic contradictions"
  governed_reversibility: "100% supported install, update, disable, and rollback cases pass; 0 unapproved actions"
scope_in:
  - "A governed handoff from SA/TA presentation intent through approved architecture-modeling facts to a separate presentation derivative."
  - "Audience-specific HTML/SVG/PNG output, semantic traceability, accessibility, security, provenance, parity, and rollback evidence."
  - "Representative business and engineering review protocols."
scope_out:
  - "Direct rendering, canonical model construction, or solution selection inside SA/TA."
  - "Replacement or mutation of canonical Draw.io, Mermaid, Structurizr, or architecture-modeling artifacts."
  - "Selection of vendoring, pinned dependency, or separately installed plugin before s05 Approach review."
  - "Website-based brand onboarding, arbitrary URL interpretation, animation, or unapproved active content in the first release."
  - "Implementation, installation, publication, or release activation before all required workflow gates."
```

## Decision Evidence
```yaml
decision_refs:
  - "OQ-001:A"
  - "OQ-002:A"
  - "OQ-003:A"
  - "OQ-004:A"
  - "OQ-006:A"
  - "OQ-007:A"
decision_receipt_ref: "work-items/add-diagram-design-adapter/add-diagram-design-adapter.s03.open-questions.md#Main Artifact"
provenance_evidence_ref: "OQ-009-DIGEST-001"
review_state: "APPROVED"
gate_status: "APPROVED_PENDING_TRUSTED_RECEIPT"
required_reviewer_role: "ba"
reviewed_by:
  - "ba"
reviewed_at: "2026-08-21T07:40:03Z"
```
