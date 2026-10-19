---
artifact_id: "decouple-tests-from-tree-layout.s01.restate"
artifact_family: workflow-step
work_item_slug: "decouple-tests-from-tree-layout"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
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
  spec:
    - "ba"
  dor:
    - "po"
    - "ba"
  approach:
    - "developer"
  task_plan:
    - "developer"
  dod:
    - "qc"
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
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> The user accepted the bounded fixture packet T0/T2/T3 on 2026-10-19. G-A/T1 was fixed by predecessor commit `a9888a9`; the remaining G-B test reads a real work-item note and report. Only its input isolation changes. Human content acceptance is recorded in s06; signed admission/readiness and activation remain separate.

## Step Contract
```yaml
step_goal: "Carry the known live-work-item test dependency into its existing child without reopening the completed rollback fix."
input_summary: ["Accepted parent continuation packet", "Main e5dc98aac70196f9d3a391153325049c0402eb17", "Unchanged-test ENOENT reproduction"]
output_summary: ["Bounded test-only residual", "Current baseline", "Closed historical questions"]
done_when: ["G-A is preserved as predecessor completion", "G-B and the verification boundary are explicit"]
owner: developer
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
request_lane: maintenance
applicability_reason: "Known defect in test input isolation; no production/public contract, migration, security or release change."
applicable_principles: ["Preserve assertions", "Fail before fixing", "Independent child gates"]
required_reviews: ["Existing Light Spec/DoR at s04", "Approach/Task Plan at s06", "QC DoD at s08"]
prohibited_actions: ["Production resolver edits", "Release/CI changes", "Deleting real work items", "Inferring signed approval from content acceptance"]
open_governance_questions: []
```

## Artifact Chính
```yaml
raw_request: "Resume the accepted T0/T2/T3 fixture packet for test/tree decoupling."
restated_request: "Replace the live protocol/report and cross-file lookup inputs with temporary test-owned fixtures while preserving their checks."
request_type: BUG
defect_source: code
spec_impact: NONE
delivery_context: brownfield
user_problem_initial: "The unit test passes only while a particular real work-item note and report exist."
business_context_initial: "Reliable unit evidence should not depend on unrelated delivery records or checkout layout."
scope_ref: "product-specs/cards/decouple-tests-from-tree-layout.md#Scope"
constraints_initial: ["One test-source file", "No skip-if-missing", "No weakened assertions", "No production behavior change"]
assumptions_initial: ["Temporary note/report fixtures can exercise the existing resolver without production changes."]
dependencies_initial: ["Normal legacy admission bootstrap, trusted authoring receipts, then child activation"]
risks_initial:
  - {id: R-01, severity: MEDIUM, description: "A constant-valued assertion could pass without reading its fixture.", mitigation: "Change the fixture value and resolve again; remove its target and require the missing-file error."}
notes_for_step_2: "Keep the suite useful as evidence across checkouts."
```

## Existing System Baseline

At main `e5dc98a`, Node v26.5.0 runs the unchanged resolver test successfully. A byte-identical package copy without real work-item data fails at line 122 with ENOENT on `artifact-governance-enforcement.work-item-report.json`. Test SHA-256: `c5461de2ad24662dbd0ffe66e7243d6abe403d395768698395cbb3bac32c0cd1`. The 2026-10-19 probe establishes the defect; it is not the full two-tree acceptance run. The unchanged rollback source contract passes for v2.6.4 -> v2.6.3.

## Business Goal
```yaml
business_goal: "Make resolver unit evidence independent of real work-item lifecycle and filesystem location."
success_metrics:
  - {id: SM-1, metric: "Real work-item dependencies in the target test", baseline: "Live note/report reads", target: "0"}
  - {id: SM-2, metric: "Same-source full-suite failing-file counts across two trees", baseline: "Historical divergence; fresh baseline required", target: "Equal, with failure identities disclosed"}
non_goals: ["Change production resolver semantics", "Alter rollback behavior", "Close unrelated audit findings"]
```

## Open Questions
```yaml
open_questions: []
resolved_questions:
  - {id: OQ-1, resolution: "Historical rollback-input question superseded by a9888a9."}
  - {id: OQ-2, resolution: "Historical retained-artifact CI question is moot for this test-only residual; the predecessor introduced source/exact-artifact separation."}
missing_inputs: []
conflicts: []
```

## Work Item Protocol
```yaml
protocol_status: ACTIVE
approval_status: APPROVED
review_required: true
work_item_slug: "decouple-tests-from-tree-layout"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/decouple-tests-from-tree-layout/work-items/decouple-tests-from-tree-layout"
current_step: "s07"
granted_write_paths:
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
  - "work-items/decouple-tests-from-tree-layout"
  - "product-specs/cards/decouple-tests-from-tree-layout.md"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "coordinator"
protocol_owner: "developer"
reviewed_by: "po"
reviewed_at: "2026-10-19T03:09:32Z"
handoff_target: "step-s07-owner"
last_transition_action: "activate"
last_transition_at: "2026-10-19T03:21:39.714Z"
required_actions:
  - {"id":"se:59c625c9768efc1c74009edec61fad2b0b44dcef89d4e849bad61d9efcc03194","kind":"workflow_followup","text":"Review and continue workflow backbone s01 -> s08."}
  - {"id":"se:eb937e030d6ce6dc964605f19279888bd361eea4a1cd8b37b3a71e880f589a24","kind":"workflow_followup","text":"Continue active execution from step 7 onward."}
blockers: []
review_notes:
  - "Accepted bounded fixture packet T0/T2/T3; no DoD, release, merge or cleanup."
refs:
  - "work-items/decouple-tests-from-tree-layout"
audit_events:
  - "REPORT_BOOTSTRAPPED"
  - "WORK_ITEM_APPROVED"
  - "READINESS_BUNDLE_APPROVED"
  - "WORK_ITEM_ACTIVATED"
```

## Traceability
```yaml
upstream: ["Parent audit s07 Current continuation checkpoint — 2026-10-19"]
next_step: "Finalize signed Light readiness, then independently activate this child."
```

## SDD Traceability
```yaml
requirement_refs: ["REQ-001", "REQ-002", "REQ-003"]
acceptance_refs: ["AC-001", "AC-002", "AC-003"]
task_refs: ["T0", "T1 SUPERSEDED", "T2", "T3"]
test_refs: ["packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js", "packages/workflow-bundle/test/release-rollback-smoke.test.js"]
```

## Historical baseline

The original August investigations and rejected rollback options remain in Git at `e5dc98a` and in the predecessor's evidence. They are not current blockers. The accepted October packet supersedes the old proposal text without claiming that this child implemented T1.
