---
change_id: "CHANGE-006"
artifact_kind: "change-design"
status: approved
linked_work_items:
  - "fix-authoring-smoke-bootstrap"
---

# Change Design - CHANGE-006

## Design
```yaml
summary: "Propose the smallest brownfield correction: rewrite and rename the one stale authoring-smoke case so it proves approved TD-01 bootstrap provenance, then prepare and verify an immutable GitHub-only v2.6.1/42 patch with v2.6.0/42 as rollback."
technical_changes:
  - "Change only packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js for the smoke contract: preserve scaffold/read-only status, assert no report before approve, pass reviewed-by, then assert legacy-scaffold, REPORT_BOOTSTRAPPED, APPROVED, and reviewed_by."
  - "Use the existing version-bump and release-surface paths to align structured metadata, release tests, current EN/VI docs, and a new v2.6.1 release note."
  - "Build and retain one exact v2.6.1 tarball, prove install/update 4/4 and rollback to the retained immutable v2.6.0 tarball 4/4, then require remote Workflow Guardrails 9/9."
ux_or_runtime_changes:
  - "None; no public CLI behavior, approval protocol, data/schema, runtime topology, or managed-skill inventory change."
risk_notes:
  - "Do not delete the case or reverse production behavior; both violate the approved Spec Card."
  - "Use the required isolated worktree because shared main is dirty and release composition must be exact."
  - "Never move v2.6.0 or v2.6.1; uploaded bytes must match the frozen candidate digest."
source_of_truth: "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s06.task-breakdown.md#Technical Approach"
human_gate: "Developer approved Approach at 2026-08-24T14:25:32.000Z; the trusted s06 receipt remains pending."
```
