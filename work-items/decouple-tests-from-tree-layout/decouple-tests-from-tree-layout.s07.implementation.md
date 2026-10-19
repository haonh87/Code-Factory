---
artifact_id: "decouple-tests-from-tree-layout.s07.implementation"
artifact_family: workflow-step
work_item_slug: "decouple-tests-from-tree-layout"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/decouple-tests-from-tree-layout.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec: []
  dor: []
  approach: []
  task_plan: []
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "decouple-tests-from-tree-layout.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> T0 and T2 completed within the accepted one-file scope. Spec Compliance PASS followed by Code Quality PASS. T3 two-tree verification and independent human QC DoD remain at s08.

## Step Contract
```yaml
step_goal: "Replace the residual live-work-item dependency with owned fixtures without dropping regression coverage."
input_summary: ["Approved Spec Card 0.2", "Signed s04/s06", "Accepted T0/T2/T3"]
output_summary: ["One test-file change", "RED/GREEN evidence", "Ordered self-review"]
done_when: ["Absent-live-data reproduction turns green", "Both original checks and negative controls remain", "Review completes before T3"]
owner: developer
```

## Main Artifact
```yaml
implemented_changes:
  - "workflow-gate-evidence-utils.test.js now owns a temporary note/report pair."
  - "Both protocol/report equality and cross-file materialization lookup remain."
  - "Resolve VERIFIED/fixture-before then DONE/fixture-after, assert target identity, remove target and require ARTIFACT_REFERENCE_FILE_MISSING."
  - "finally removes only the mkdtemp-owned fixture root; no skip-if-missing."
doc_changes: ["Accepted child authoring hosts, CLI-generated protocol, and this evidence note"]
operational_notes:
  - "Production resolver, rollback source test, real work items, CI, release and global installations unchanged."
  - "T1 remains SUPERSEDED by a9888a9; no new exact-artifact release rehearsal."
  - "Trusted work-item signature and four readiness signatures verified before activation at 2026-10-19T03:21:39.714Z."
```

## T0 and T2 Evidence

Base: `e5dc98aac70196f9d3a391153325049c0402eb17`; Node `v26.5.0` at `/opt/homebrew/bin/node`. Both implementation and detached comparison worktrees generated bundle 2.6.4 runtime with `node packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js`. Their 462 runtime files matched path-for-path; aggregate SHA-256 `6917d76c26f2a4df0d6f0abde6f4b63950aff8c380e48dffef57abb12c1b6e86`. T0 full suites each passed 47 files, zero failures.

Before the source edit, the focused test copied with its scripts into an isolated tree without real work items failed exit 1 with ENOENT on the artifact-governance-enforcement report. Original test SHA-256: `c5461de2ad24662dbd0ffe66e7243d6abe403d395768698395cbb3bac32c0cd1`.

After the edit, the focused test passed in the implementation tree and in three isolated scenarios: real records absent, present, and independently changed (unrelated Markdown and invalid JSON). All scenario exits were 0; a dedicated TMPDIR was empty after each run. The updated test contains no reference to the real subject. Test SHA-256: `b3dbe2500cd752b6ec4808c05d950c3264c33b7d20dd9afa13aec3b6bf6d4851`. `node --check` and `git diff --check` passed.

Raw logs are local supporting evidence at `/private/tmp/cf-decouple-verify-gd6x4ein`: `baseline.json`, `T0-absent-red.log`, `T0-implementation-suite.log`, `T0-comparison-suite.log`, `T2-results.json`, and `T2-{absent,present,changed}-green.log`. The verdicts and identities above remain in this canonical note even after temporary logs expire.

## Early Review

1. **Spec Compliance — PASS (agent self-review):** AC-002 retains both intended assertions; two distinct statuses and materialization values exercise repeat reads; deletion reaches the required error. Only the accepted test source changes. T1 is not reimplemented. No approved scope or contract drift.
2. **Code Quality — PASS (agent self-review):** existing helpers are reused; fixture root is fresh and private, inputs are deterministic constants, and `finally` handles success and failure cleanup. No production dependency, global state, external input, shell execution or network path is added. Only two bounded small-file iterations occur. Existing general resolver tests remain intact.

These are technical self-review findings, not human signoffs. Automated scanner availability and final verification belong to s08.

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs: ["T0-absent-red.log", "T2-results.json", "workflow-gate-evidence-utils.test.js"]
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: QUICK_FIX
worktree_status: USED
worktree_refs: [".claude/worktrees/decouple-tests-from-tree-layout", ".claude/worktrees/decouple-tests-verify"]
worktree_reason: "Existing multi-session item; isolated implementation and equivalent-source comparison."
review_status: COMPLETED
review_refs: ["s07 Early Review"]
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Retain both worktrees pending s08 and separate lawful closeout. No merge or cleanup authorized by this packet."
verify_path: ["T3 focused + unchanged rollback + full suite in identical post-change trees", "Syntax, UTF-8, diff, workflow checks", "s08 evidence then separate human QC DoD"]
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - {check: "Admission", status: PASS, evidence: "Five genuine signatures checked before normal CLI activation; exactly three declared write roots."}
  - {check: "Signed hosts", status: PASS, evidence: "Spec Card, s04 and s06 remain unchanged after signing."}
  - {check: "Execution", status: PASS, evidence: "TDD, isolated worktrees and ordered early review recorded above; no delegation."}
blocking_items: []
owner: developer
next_action: "Run T3 and record s08; human QC owns DoD."
```

## Audit
```yaml
status: PASS
findings: []
evidence: ["T0 RED precedes T2 source edit", "Three scenario GREEN", "Ordered self-review", "T3 handoff explicit"]
```

## SDD Traceability
```yaml
requirement_refs: ["REQ-001", "REQ-002", "REQ-003"]
acceptance_refs: ["AC-001", "AC-002", "AC-003"]
task_refs: ["T0 completed", "T1 SUPERSEDED", "T2 completed", "T3 handed to s08"]
test_refs: ["workflow-gate-evidence-utils.test.js", "release-rollback-smoke.test.js", "run-all.js"]
```
