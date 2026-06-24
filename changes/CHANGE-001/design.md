---
change_id: "CHANGE-001"
artifact_kind: "change-design"
status: approved
linked_work_items:
  - "sample-sdd-item"
---

# Change Design - CHANGE-001

## Design
```yaml
summary: "Push the workspace filter down the read-only query path and keep the old behavior as fallback when the input is empty."
technical_changes:
  - "add an optional workspace filter to request parsing"
  - "apply the filter at the query layer"
ux_or_runtime_changes:
  - "an invalid path must return a clear error"
risk_notes:
  - "a wrong path normalization can cause missed results"
```