---
artifact_id: "decouple-tests-from-tree-layout.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "decouple-tests-from-tree-layout"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
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
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-10-19T03:09:32Z"
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-10-19T03:09:32Z"
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "decouple-tests-from-tree-layout.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> The user accepted the bounded fixture approach and T0/T2/T3. This Light host owns Approach and Task Plan. Human content approval is complete; trusted signatures and child activation remain pending. Implementation has not started.

## Step Contract
```yaml
step_goal: "Make the accepted one-file fixture change executable and verifiable."
input_summary: ["Spec Card 0.2", "s04 READY", "Known ENOENT reproduction"]
output_summary: ["Fixture approach", "Ordered tasks", "Review and two-tree verification boundary"]
done_when: ["Owned scope and checks are explicit", "No production or unrelated work-item edit is needed"]
owner: developer
```

## Option Analysis
```yaml
goal: "Remove the live-data dependency while keeping the intended protocol/materialization regression."
options:
  - "A: Replace the live block with synthetic note/report fixtures and changed-value/missing-target controls; preserves the checks with one test-file change."
  - "B: Delete the live block and rely on the separate cross-file test; smaller but loses the explicit protocol/materialization coverage. Rejected."
  - "C: Copy the real work-item record into a fixture; retains irrelevant lifecycle detail and remains unnecessarily coupled. Rejected."
recommended_option: "A"
reason: "Smallest change preserving the approved acceptance criteria and negative controls."
validation_needed: "No-live-data RED before the fix; changed-value and missing-target controls must exercise actual file reads."
```

## Technical Approach
```yaml
recommended_approach: "Use existing test helpers to create temporary protocol/materialization note data and a matching report. Keep same-note/report and cross-file assertions, re-resolve a changed field, then remove the fixture target and assert the missing-file error. Clean only test-owned temporary paths in finally."
explicitly_untouched: ["Production scripts/bin", "Rollback test implementation", "Real work items", "CI/releases/global installations"]
failure_model: "A constant assertion can mask a broken read; a missing fixture must fail through the expected resolver error, never skip."
compatibility: "No resolver API or production behavior changes."
rollback: "Revert the isolated test-source commit; no state migration."
```

## Brownfield Impact Analysis
```yaml
existing_baseline: "e5dc98aac70196f9d3a391153325049c0402eb17"
impacted_modules: ["workflow-bundle resolver unit test"]
compatibility_risks: ["Accidentally dropping same-note/report or cross-file coverage", "Comparing different source/runtime trees"]
mitigations: ["Retain both assertions and negative controls", "Pin identical source and runtime prerequisites for both full-suite runs"]
migration_notes: ["None"]
rollback_notes: ["Revert only the test change; retain evidence and separate approval history"]
```

## Artifact Chính
```yaml
task_breakdown:
  - id: T0
    owner_role: developer
    name: "Finalize readiness and capture baseline"
    objective: "Establish child admission and reproduce the current dependency before modifying the test."
    paths_in_scope: ["work-items/decouple-tests-from-tree-layout", "product-specs/cards/decouple-tests-from-tree-layout.md"]
    dependencies: ["Trusted work-item and Spec/DoR/Approach/Task Plan receipts before implementation activation"]
    outputs_expected: ["Same-source baseline and runtime prerequisites", "Focused absent-live-data RED", "T1 predecessor evidence retained"]
    verification_hint: "Record node version, source SHA, focused test verdicts and full-suite counts/identities in two equivalent source trees. Real work items must remain untouched."
    review_checkpoint: "Confirm approved scope and valid receipts before s07."
  - id: T1
    owner_role: developer
    name: "Historical rollback-layout fix"
    status: SUPERSEDED
    objective: "Preserve a9888a9 as the owner of the completed rollback independence change."
    paths_in_scope: []
    dependencies: []
    outputs_expected: ["No new rollback implementation"]
    verification_hint: "Run the unchanged rollback source check under T3; do not claim a new exact-artifact rehearsal."
    review_checkpoint: "No modification of release-rollback-smoke.test.js."
  - id: T2
    owner_role: developer
    name: "Isolate resolver test inputs"
    objective: "Replace the real-work-item block with temporary synthetic fixtures while retaining both regression assertions."
    paths_in_scope: ["packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"]
    dependencies: ["T0"]
    outputs_expected: ["Temporary note/report pair", "Retained same-note/report and cross-file assertions", "Changed-value and missing-target controls", "Finally cleanup"]
    verification_hint: "Observe absent-live-data RED first, then GREEN. Repeat with absent, present and independently changed real-work-item data in scratch copies. Verify zero references to the real artifact-governance-enforcement subject; generic fixture-owned work-items paths remain valid."
    review_checkpoint: "Spec Compliance against AC-002, then Code Quality for fixture ownership, useful negative controls and cleanup."
  - id: T3
    owner_role: qc
    name: "Verify equal-source portability and record handoff"
    objective: "Prove fixture independence and compare full-suite results without misreporting unrelated failures."
    paths_in_scope: ["work-items/decouple-tests-from-tree-layout"]
    dependencies: ["T2"]
    outputs_expected: ["AC-001..003 evidence", "Two source/runtime identities and full-suite counts/identities", "Ordered review findings", "s08 ready for separate QC DoD"]
    verification_hint: "Run the focused test, unchanged rollback source test and run-all.js in two identical post-change trees with equivalent generated runtimes. Require no new failures; report equal nonzero counts honestly. Run node --check, git diff --check and strict UTF-8 decoding."
    review_checkpoint: "Technical verification is separate from human QC DoD, merge and cleanup."
delegation_decision:
  mode: agentic
  subagent: false
  reason: "One coupled test file and a sequential verify path."
```

## Worktree Decision
```yaml
worktree_target: decouple-tests-from-tree-layout
worktree_decision: REQUIRED
risk_signals: ["Existing multi-session work item", "Other worktrees hold unrelated work"]
isolation_strategy:
  branch_name: "test/decouple-tests-from-tree-layout"
  worktree_path: ".claude/worktrees/decouple-tests-from-tree-layout"
  base_commit: "e5dc98aac70196f9d3a391153325049c0402eb17"
notes: "Created for authoring after the user's acceptance. A second same-source verification tree is required for T0/T3; retain all trees until lawful closeout. No production scaffold was created."
```

## Verification Plan

Run the checks owned by T0/T2/T3 in that order. A missing live fixture should first reproduce ENOENT, then the completed test must work without any real work-item records. Preserve changed-value and missing-target controls. Full-suite comparisons use identical source and equivalent generated runtime prerequisites; source mode rollback is not exact-artifact release verification. No new dependencies, browser, database, release or global-install tests are needed for the one-file test change.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - {check: "Accepted packet preserved", status: PASS, evidence: "Fixture option A and T0/T2/T3 match the accepted parent packet; T1 remains superseded."}
  - {check: "Execution boundary", status: PASS, evidence: "One test file plus child evidence; no parent-grant inheritance or production write."}
  - {check: "Review/verification", status: PASS, evidence: "Spec Compliance precedes Code Quality; independent QC DoD remains required."}
blocking_items: []
owner: developer
next_action: "Human signs the already accepted work-item/readiness package; agent verifies signatures and activates only the declared child paths."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints: ["T0 source/runtime identities", "T2 RED then GREEN", "T3 full-suite counts and identities"]
compatibility_checkpoints: ["Both original assertions retained", "Production resolver and rollback behavior unchanged"]
migration_or_backfill_steps: []
rollback_or_restore_steps: ["Revert the test-source change; do not delete unrelated files or signed history"]
```

## Human Authoring Decision — 2026-10-19

The user replied **accept** to the explicit fixture/T0/T2/T3 review request and reiterated acceptance during preparation. Decision recording time: `2026-10-19T03:09:32Z` (UTC recording time, not a claimed chat timestamp). Reviewer: Hao, Nguyen Huu. Existing reviewer roles are used: work-item owner PO, Spec/DoR BA, Approach/Task Plan Developer. Content acceptance covers this bounded child, Spec Card 0.2, READY, option A and T0/T2/T3. It excludes DoD, release, merge and cleanup. The later repeated accept is confirmation, not a separate scope expansion.

The accepted upstream packet is parent s07, section `Current continuation checkpoint — 2026-10-19`, in the retained audit worktree. Its whole-file SHA-256 at handoff is `b8c5c2658de32481b32d1d486bab5d433170d9e1e92412d98ccd252771b13b08`. This finalization removes obsolete rollback questions and records implementation isolation; it adds no production scope. Normal CLI `work-item approve` provides supported legacy-report bootstrap, then `gate approve-ready-bundle` signs four independent receipts. No agent signer, hand-written report or test-only approval override may replace that path.

## Signing Handoff

The content decision above is final; do not request it again. Normal approval requires a human-controlled terminal because `workflow-trusted-approval-utils.js` rejects noninteractive passphrases. The prepared temporary helper `/private/tmp/cf-decouple-sign-20261019.cjs` checks exact authoring/source hashes and reviewer authority before executing the two normal commands below. Its `--check` mode is read-only. A retry verifies existing signatures and skips already signed matching work-item/readiness approval. It does not activate, implement, close, commit, merge or clean up.

If the temporary helper is unavailable, ask the agent to regenerate its hash-bound preflight from these unchanged hosts before running approval. The underlying operations, run only in this child worktree's human terminal, are:

```bash
node packages/workflow-bundle/bin/wfc.js work-item approve --work-item decouple-tests-from-tree-layout --reviewed-by po --reviewed-at 2026-10-19T03:09:32Z --note 'Accepted bounded fixture packet T0/T2/T3; no DoD, release, merge or cleanup.' --project-root . --telemetry off
node packages/workflow-bundle/bin/wfc.js gate approve-ready-bundle --work-item decouple-tests-from-tree-layout --reviewed-at 2026-10-19T03:09:32Z --note 'Accepted Spec/DoR and fixture Approach/Task Plan; independent receipts required.' --project-root . --telemetry off
```

After signing, the agent must verify five signatures and current host hashes, confirm the normal CLI report and applicable capability boundary, then activate only `packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js`, `work-items/decouple-tests-from-tree-layout` and `product-specs/cards/decouple-tests-from-tree-layout.md`. No source test edits occur before that verification.

## Traceability
```yaml
upstream: ["s04 READY", "Spec Card 0.2", "Accepted parent continuation packet"]
next_step: "Verify trusted receipts, activate child, then T0/T2/T3."
```

## SDD Traceability
```yaml
requirement_refs: ["REQ-001", "REQ-002", "REQ-003"]
acceptance_refs: ["AC-001", "AC-002", "AC-003"]
task_refs: ["REQ-001 -> T1 SUPERSEDED / T3", "REQ-002 -> T0/T2/T3", "REQ-003 -> T0/T3"]
test_refs: ["workflow-gate-evidence-utils.test.js", "release-rollback-smoke.test.js", "run-all.js"]
```
