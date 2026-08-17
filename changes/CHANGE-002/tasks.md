---
change_id: "CHANGE-002"
artifact_kind: "change-tasks"
status: approved
task_plan_reviewed_by: "developer"
task_plan_reviewed_at: "2026-08-14T14:52:36Z"
linked_work_items:
  - "stabilize-architecture-skill-bundle"
---

# Change Tasks - CHANGE-002

## Tasks
```yaml
tasks:
  - { id: "T0", name: "Activate and isolate implementation", owner: "developer", acceptance_refs: ["governance"] }
  - { id: "T1", name: "Fix managed permission lifecycle", owner: "developer", acceptance_refs: ["AC-001"] }
  - { id: "T2", name: "Correct sa/ta contracts and metrics", owner: "developer", acceptance_refs: ["AC-002", "AC-003", "AC-005"] }
  - { id: "T3", name: "Strengthen evidence and protocol validation", owner: "developer", acceptance_refs: ["AC-004", "AC-010"] }
  - { id: "T4", name: "Create architecture-modeling skill contract", owner: "developer", acceptance_refs: ["AC-006", "AC-007"] }
  - { id: "T5", name: "Implement deterministic drawio tools", owner: "developer", acceptance_refs: ["AC-007", "AC-008"] }
  - { id: "T6", name: "Regenerate and audit both runtimes", owner: "developer", acceptance_refs: ["AC-006", "AC-009"] }
  - { id: "T7", name: "Align v2.4.0 release surfaces", owner: "developer", acceptance_refs: ["AC-009", "AC-010"] }
  - { id: "T8", name: "Integrate, review, package, and hand off", owner: "developer", acceptance_refs: ["AC-001", "AC-002", "AC-003", "AC-004", "AC-005", "AC-006", "AC-007", "AC-008", "AC-009", "AC-010"] }
dependencies:
  - "Task Plan receipt -> activation -> T0 -> T1 -> T2 -> T3 -> T4 -> T5 -> T6 -> T7 -> T8"
verification_tasks:
  - "Focused red/green tests and R1-R4 two-tier reviews"
  - "Full workflow unit/validator/audit/smoke suite"
  - "41-skill source/runtime count and equality"
  - "Four isolated install/update cases and v2.3.2 rollback smoke"
  - "Drawio automated quality report and QC first-open review"
  - "UTF-8, EN/VI parity, security heuristics, package inventory, SHA-256, and unrelated-dirty-path exclusion"
release_tasks:
  - "Create and retain one v2.4.0 tarball after verification"
  - "Record source commit, package inventory, and SHA-256"
  - "Do not tag, publish, or update live global installations before Release approval"
  - "Invalidate the candidate after any tracked source change"
plan_ref: "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s06.task-breakdown.md"
```
