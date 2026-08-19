---
change_id: "CHANGE-003"
artifact_kind: "change-tasks"
status: draft
linked_work_items:
  - "artifact-governance-enforcement"
---

# Change Tasks - CHANGE-003

## Tasks
```yaml
tasks:
  - { id: "T8", name: "Lock fail-first v2.5.0 contracts and frozen-history guards", owner: "developer", acceptance_refs: ["AC-011", "AC-012", "AC-013", "AC-014", "AC-015"] }
  - { id: "T9", name: "Complete artifact-governance EN/VI and regenerate runtimes", owner: "developer", acceptance_refs: ["AC-011", "AC-012"] }
  - { id: "T10", name: "Apply v2.5.0 identity and align current bilingual surfaces", owner: "developer", acceptance_refs: ["AC-013"] }
  - { id: "T11", name: "Integrated source verification, review, and candidate-input freeze", owner: "developer", acceptance_refs: ["AC-011", "AC-012", "AC-013", "AC-016"] }
  - { id: "T12", name: "Build one retained candidate and run exact install/update", owner: "developer", acceptance_refs: ["AC-012", "AC-014", "AC-016"] }
  - { id: "T13", name: "Prove exact rollback and hand off to human gates", owner: "qc", acceptance_refs: ["AC-015", "AC-016"] }
dependencies:
  - "Task Plan receipt -> T8 -> T9 -> targeted review -> T10 -> targeted review -> T11 -> T12 -> T13"
verification_tasks:
  - "Record RED for the five release-contract files before current-source changes."
  - "Run 36/36 units, workflow validators/fixtures/planning, pack audit, source smoke, syntax/security heuristics, UTF-8, and diff checks before packing."
  - "Assert 42/42/42 inventories, recursive diff 0, exact-candidate install/update 4/4, and exact-artifact rollback 4/4 with unmanaged changes 0."
release_tasks:
  - "Retain one workflow-bundle-2.5.0.tgz with source identifier, package inventory, and SHA-256."
  - "Resolve rollback only to the retained v2.4.0 tarball SHA-256 44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e."
  - "Do not tag, publish, update live global installations, merge, or clean worktrees before human gates."
plan_ref: "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s06.task-breakdown.md#CHANGE-003 Task Plan Delta"
```
