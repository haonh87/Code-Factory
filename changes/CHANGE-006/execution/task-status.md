---
change_id: "CHANGE-006"
artifact_kind: "change-task-status"
status: draft
linked_work_items:
  - "fix-authoring-smoke-bootstrap"
---

# Task Status - CHANGE-006

## Status
```yaml
task_status:
  - task_id: "TASK-001"
    status: PASS
    evidence: "Protocol ACTIVE; anchor 7fe68b3; branch codex/fix-authoring-smoke-bootstrap in the required clean in-repo worktree."
  - task_id: "TASK-002"
    status: PASS
    evidence: "Unchanged RED captured; corrected authoring smoke 13/13 PASS; TD-01 through TD-04 PASS; B1 spec-compliance and code-quality reviews PASS."
  - task_id: "TASK-003"
    status: PASS
    evidence: "Structured version 2.6.1; reviewed EN/VI current docs; v2.6.1 release note; release/candidate/rollback preflights PASS; immutable v2.6.0 note digest unchanged."
  - task_id: "TASK-004"
    status: PASS
    evidence: "B1 and B2 both passed SPEC_COMPLIANCE before CODE_QUALITY with no open finding."
  - task_id: "TASK-005"
    status: PASS
    evidence: "Clean-runtime and no-rollback-binary RED cases are both corrected. Full local rerun passes unit 39/39, authoring 13/13, TD-01..04, pack audit, bundle smoke, source candidate/rollback, release surface, all workflow validators, syntax/JSON/UTF-8/diff, immutable v2.6.0 digests, and scoped-path checks; B4 Spec Compliance then Code Quality PASS."
  - task_id: "TASK-006"
    status: IN_PROGRESS
    evidence: "Candidate 7c1d2c7b... was explicitly invalidated and moved out of the worktree because release-rollback-smoke.test.js is package payload. A new single retained candidate must be packed and reverified after the reviewed source commit."
  - task_id: "TASK-007"
    status: IN_PROGRESS
    evidence: "Run 32822390088 at 8de5a8d failed both Node jobs on absent runtime. Run 32824019750 at db4315e proved the runtime bootstrap, then both Node jobs failed only release-rollback-smoke because the ignored v2.6.0 tarball was absent. A new commit/run is required; neither failed run will be rerun as remediation."
  - task_id: "TASK-008"
    status: PENDING
    evidence: "s08 not opened."
  - task_id: "TASK-009"
    status: PENDING
    evidence: "Publication and closeout remain prohibited before s08 approvals."
blocking_items: []
next_action: "Commit the reviewed source-vs-exact rollback correction, rebuild one retained candidate, repeat exact candidate/rollback proof, then push a new target for remote 9/9."
```
