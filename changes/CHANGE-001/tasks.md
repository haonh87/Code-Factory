---
change_id: "CHANGE-001"
artifact_kind: "change-tasks"
status: verified
linked_work_items:
  - "sample-sdd-item"
---

# Change Tasks - CHANGE-001

## Tasks
```yaml
tasks:
  - "TASK-001: add the workspace filter to the query flow"
  - "TASK-002: keep backward compatibility for a request without a filter"
  - "TASK-003: add a test for an invalid workspace path"
dependencies:
  - "SRS frozen"
verification_tasks:
  - "TEST-001"
  - "TEST-002"
  - "TEST-003"
  - "TEST-004"
release_tasks: []
```