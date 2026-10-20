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
task_plan_gate: "ACCEPTED_PENDING_SIGNATURE"
~~~

## T0 Input Readiness

~~~yaml
step: "s07 T0 prerequisite gate"
status: BLOCKED
available_inputs:
  - "Spec, Contract, DoR and Approach trusted receipts match unchanged hosts."
  - "CHANGE-004 owner is DONE with valid DoD; baseline role/modeling/Draw.io suites pass."
  - "A1 owns exact baseline, version proposal, exporter tuple, wheel hashes, provisioning order and acceptance checks."
  - "Approved isolated PNG provisioning passes package/hash, pip check, launch, transparent PNG and HTTP/HTTPS blocking probes; s07 owns measured evidence."
missing_inputs:
  - "Matching new trusted Task Plan signature for accepted A1."

  - "Signed disposition of stale/satisfied protocol prerequisites through supported CLI."
  - "s07 activation and exact write grants, followed by isolated worktree."
invalid_inputs:
  - "Old Task Plan signature applies to the prior host only; it does not approve A1."
conflicts: []
assumptions: []
risk_level: HIGH
next_action: "Complete accepted isolated provisioning, sign the finalized plan and exact satisfied state dispositions, then continue T0."
~~~

## Boundary

- The s06 work-item note owns the plan, exporter lock and compatibility evidence; this file mirrors execution order only.
- Prior Task Plan approval remains historical. A1 is accepted and finalized, requiring a fresh trusted receipt.
- Spec/Contract/DoR/Approach, AC-001..011 and pinned upstream content are unchanged.
- No production/test/runtime/release writes are opened while T0 is BLOCKED.
- The protocol report still contains historical prerequisites and is intentionally untouched until signed disposition is authorized.
