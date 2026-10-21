---
change_id: "CHANGE-005"
artifact_kind: "change-tasks"
status: approved
linked_work_items:
  - "add-diagram-design-adapter"
---

# Change Tasks - CHANGE-005

## Tasks
~~~yaml
plan_ref: "work-items/add-diagram-design-adapter/add-diagram-design-adapter.s06.task-breakdown.md"
review_state: "APPROVED"
reviewed_by: "developer"
reviewed_at: "2026-10-20T09:31:30Z"
execution_mode: "agentic"
worktree: "REQUIRED at .claude/worktrees/add-diagram-design-adapter-v2.7.0"
tasks:
  - "T0: Accept/sign amended plan, provision approved PNG tuple, verify prerequisites, reconcile protocol state, activate and isolate baseline."
  - "T1: Import and verify pinned upstream capability test-first."
  - "T2: Implement adapter request/result contract test-first."
  - "T3: Implement offline HTML/SVG/PNG validation/export atomically test-first."
  - "T4: Add SA/TA intent handoff without schema change."
  - "T5: Add optional post-canonical architecture-modeling derivative lane."
  - "T6: Targeted spec-compliance then code-quality review."
  - "T7: Generate runtime copies and prepare proposed 2.7.0 candidate surfaces test-first."
  - "T8: Build/hash/test one exact isolated lifecycle candidate."
  - "T9: Review release batch and hand evidence to s08."
dependencies:
  - "T0 -> T1 -> T2 -> T3 -> T4 -> T5 -> T6 -> T7 -> T8 -> T9"
  - "Source change after T8 invalidates and rebuilds the candidate."
verification_tasks:
  - "Provenance, contract, semantic, accessibility, security, offline, canonical compatibility, parity, lifecycle, workflow, and UTF-8 evidence."
  - "READER-TASK-001 remains an independent s08 verification task."
release_tasks:
  - "A1 proposes 2.7.0 from main fa9ad237f8179e58b16ca6c6c589bdd0728ec476 (bundle 2.6.4); recheck tag/release availability before T7."
  - "Update/rollback uses the recorded published 2.6.4 artifact; source baseline and release bytes are separate identities."
  - "Retain one exact candidate; no tag, publication, live install, merge or cleanup is authorized by plan authoring."
task_plan_gate: "SIGNED; T0 admission completed 2026-10-20"
~~~

## Execution Status — 2026-10-21

T0 admission completed through normal CLI activation at 2026-10-20T14:18:33.874Z after
A1 signature verification and all five signed state dispositions. Accepted isolated PNG
provisioning and baseline compatibility passed. T1-T9 implementation, targeted reviews,
packaging and exact-candidate lifecycle verification are complete. Independent s08
verification and human closeout remain pending; the work item is not DONE.

- Execution evidence: `work-items/add-diagram-design-adapter/add-diagram-design-adapter.s07.implementation.md`.
- Acceptance matrix, exact artifact identity, reader packet and residual gates: `work-items/add-diagram-design-adapter/add-diagram-design-adapter.s08.verification.md`.
- The signed s06 remains the plan owner; this file mirrors execution order and links progress.
- Spec/Contract/DoR/Approach/Task Plan hosts and accepted upstream provenance are unchanged.
- No tag, publication, live managed install, push, merge or cleanup is authorized by this update.
