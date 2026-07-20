---
change_id: "CHANGE-001"
artifact_kind: "spec-delta-srs"
status: verified
linked_work_items:
  - "sample-sdd-item"
---

# SRS Delta - CHANGE-001

## Delta
```yaml
base_spec_ref: "product-specs/srs/sample-sdd-item.md"
adds:
  - "SRS-UX-001 for an invalid workspace path error"
updates:
  - "SRS-FR-001 for an optional workspace filter"
  - "SRS-FR-002 for the filtered result set"
  - "SRS-NFR-001 for backward compatibility"
removes: []
```