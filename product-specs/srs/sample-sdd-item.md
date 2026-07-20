---
artifact_id: "sample-sdd-item.srs"
artifact_family: product-spec
spec_type: SRS
spec_status: frozen
spec_version: "1.0"
owner: "ba"
reviewers:
  - "developer"
  - "qc"
  - "devops"
source_of_truth: true
linked_work_items:
  - "work-items/sample-sdd-item"
linked_changes: []
---

# SRS - Sample SDD Item

## Metadata
```yaml
scope_slug: "sample-sdd-item"
source_refs:
  - "product-specs/brd/sample-sdd-item.md"
dependency_refs: []
```

## Requirement Spec
```yaml
functional_requirements:
  - id: SRS-FR-001
    description: "The search flow must accept a workspace filter as a normalized path."
    source_refs: [BRD-001]
    acceptance_refs: [AC-001]
  - id: SRS-FR-002
    description: "The returned results must only contain sessions that belong to the requested workspace."
    source_refs: [BRD-001, BRD-002]
    acceptance_refs: [AC-002]
non_functional_requirements:
  - id: SRS-NFR-001
    category: compatibility
    description: "When no workspace filter is present, the behavior and output shape must be compatible with the current flow."
    acceptance_refs: [AC-003]
ux_system_behavior:
  - id: SRS-UX-001
    description: "If the workspace path is invalid, the system must return a clear error message so the operator role knows how to fix the input."
    acceptance_refs: [AC-004]
constraints:
  - "Do not change the existing session schema"
dependencies:
  - "cass read-only query layer"
open_questions: []
```