---
change_id: "CHANGE-006"
artifact_kind: "change-tasks"
status: approved
linked_work_items:
  - "fix-authoring-smoke-bootstrap"
---

# Change Tasks - CHANGE-006

## Tasks
```yaml
tasks:
  - id: "TASK-001"
    owner: "developer"
    action: "After s06 receipts pass, activate s07 and create the required isolated worktree/branch from the governed anchor without importing unrelated main changes."
  - id: "TASK-002"
    owner: "developer"
    action: "Retain stale-case RED evidence, rewrite and rename the one authoring-smoke case, and prove TD-01 bootstrap provenance without touching production approval paths."
  - id: "TASK-003"
    owner: "developer"
    action: "Prepare structured v2.6.1 identity, release tests, reviewed current EN/VI docs, and the v2.6.1 release note while preserving historical v2.6.0 evidence."
  - id: "TASK-004"
    owner: "developer"
    action: "Review spec compliance first and code/content quality second; resolve findings before integrated verification."
  - id: "TASK-005"
    owner: "developer"
    action: "Run 13/13 authoring smoke, TD-01/authority regressions, 39/39 unit, workflow validators, pack audit, bundle smoke, source candidate preflight, syntax/JSON, UTF-8, whitespace, and scoped-diff checks."
  - id: "TASK-006"
    owner: "devops"
    action: "Freeze/hash/inventory one exact v2.6.1 tarball and prove exact candidate plus v2.6.1 to v2.6.0 rollback in all four Codex/Claude global/project scenarios."
  - id: "TASK-007"
    owner: "developer"
    action: "Integrate/push only the approved state and obtain Workflow Guardrails 9/9 for the intended tag target while retaining the branch/worktree."
  - id: "TASK-008"
    owner: "qc"
    action: "Perform s08 spec coverage, Regression & Compatibility Summary, Technical Verification, DoD, and DevOps/QC Release review."
  - id: "TASK-009"
    owner: "devops"
    action: "After Release approval, publish immutable v2.6.1, verify remote digest and v2.6.0 immutability, obtain PO Business Acceptance, disposition REL-F01, reassess CHANGE-004 archive readiness, and finalize branch/worktree only after all gates remain valid."
dependencies:
  - "Spec and DoR trusted receipts are already APPROVED and digest-matched."
  - "Developer Approach and Task Plan receipts must pass before TASK-001."
  - "TASK-001 -> TASK-002 -> TASK-003 -> TASK-004 -> TASK-005 -> TASK-006 -> TASK-007 -> TASK-008 -> TASK-009."
  - "Any package-payload change after TASK-006 invalidates and rebuilds the candidate."
verification_tasks:
  - "TEST-001 through TEST-010 in the canonical s06 note cover AC-001 through AC-008."
  - "Remote evidence must show seven sequential jobs and both Node 18/22 matrix jobs PASS with zero required failures/skips."
  - "Post-release evidence must prove candidate/download digest equality and unchanged v2.6.0 target/digest."
release_tasks:
  - "GitHub-only workflow-bundle-2.6.1.tgz; npm publication is excluded."
  - "QC owns Technical Verification/DoD, DevOps+QC own Release, and PO owns Business Acceptance."
  - "Do not move a published tag; use immutable v2.6.0 rollback or a later governed patch."
source_of_truth: "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s06.task-breakdown.md#Artifact Chính"
human_gate: "Developer approved Task Plan at 2026-08-24T14:25:32.000Z; the trusted s06 receipt remains pending."
```
