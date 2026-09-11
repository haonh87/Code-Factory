---
artifact_id: "ci-guardrails-parallelisation.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "ci-guardrails-parallelisation"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: CHANGE
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
  card: "product-specs/cards/ci-guardrails-parallelisation.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
execution_roles:
  - "devops"
  - "developer"
review_mode: self
verification_owner: "devops"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "ba"
  contract: []
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
    - "devops"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
  business_acceptance: []
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-09-11T04:49:59.000Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-09-11T04:49:59.000Z"
  approach_reviewed_by: []
  approach_reviewed_at: ""
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  uat_reviewed_by: []
  uat_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "ci-guardrails-parallelisation.s01.restate.md"
  - "ci-guardrails-parallelisation.s02.business-goal.md"
  - "ci-guardrails-parallelisation.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Six criteria, all observable from a hosted run rather than from reading YAML. DoR is READY:
> nothing blocks authoring or implementation. Two open questions exist; OQ-01 blocks merge, not
> start. Spec Card `v0.1` is drafted and awaits its human seal.

## Step Contract
```yaml
step_goal: "Lock measurable acceptance for the pipeline reshape and state whether the work item is ready to plan."
input_summary: ["s01 restate", "product-specs/cards/ci-guardrails-parallelisation.md"]
output_summary: ["Six acceptance criteria", "Existing system baseline", "DoR verdict"]
done_when: ["Every criterion is checkable from a run, not from a diff", "DoR verdict recorded"]
owner: "ba"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs: ["product-specs/cards/ci-guardrails-parallelisation.md"]
decision_notes:
  - "REQ-001..REQ-004 carried from the Spec Card without amendment"
  - "Spec Card is at draft v0.1; the seal is requested as part of the ready-bundle"
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
ux_contract_refs: []
notes:
  - "No API or UX surface. The only externally visible names are CI check names, handled as ODC-001."
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - ".github/workflows/workflow-guardrails.yml at commit 2e3aade"
impacted_surfaces:
  - "Eight jobs in one needs: chain: workflow-tooling, workflow-artifacts, workflow-sdd, workflow-changes, workflow-execution, workflow-planning, workflow-authoring-smoke, release-candidate"
  - "Each job repeats an identical checkout + setup-node@v4 + version-echo preamble"
  - "release-candidate runs a two-version matrix over node 18 and 22, with fetch-depth: 0 and four steps"
compatibility_constraints:
  - "Every validator command and its arguments must survive unchanged - see AC-006"
  - "release-candidate must keep fetch-depth: 0; the artifact smoke depends on full history"
  - "node-version 18 and 22 in the release-candidate matrix is a product support claim, not a CI convenience; it does not change"
rollback_constraints:
  - "Single-file change. Rollback is a revert of one commit; no state, no artifact, no migration."
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: AC-001
    description: "A hosted run with two validators deliberately broken reports both as failed in the same run."
    measurable: true
  - id: AC-002
    description: "Wall-clock of a green run is below the recorded pre-change baseline. The baseline is read from the last green run before the change; the post-change figure is recorded, not predicted."
    measurable: true
  - id: AC-003
    description: "One hosted green run completes with zero Node deprecation annotations."
    measurable: true
  - id: AC-004
    description: "release-candidate does not start while any validator is running or failed, confirmed from the run graph."
    measurable: true
  - id: AC-005
    description: "The checkout and setup-node contract appears once in the file."
    measurable: true
  - id: AC-006
    description: "The set of validator commands and arguments after the change is identical to the set before it."
    measurable: true
edge_cases:
  - "A validator that fails only when run after another would now pass or fail differently. Treated as a latent defect the change exposes rather than causes; if seen, it is recorded as a new finding, not patched inside this work item."
  - "workflow_dispatch and push-to-main triggers must behave the same as pull_request."
out_of_scope:
  - "Validator behaviour, npm caching, package.json, packages/workflow-bundle/**"
done_when:
  - "AC-001 through AC-006 all hold on hosted runs"
behavioral_invariants:
  - "No validator is dropped"
  - "release-candidate stays terminal"
  - "A red validator still fails the workflow"
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "Brownfield baseline recorded - PASS"
  - "Smallest correct option required at s06 - PENDING"
  - "TDD applicability: no production behaviour change; verification is by hosted run - N/A with reason"
  - "Worktree applicability: single file, one session, low conflict risk - not required"
blocking_items: []
owner: "devops"
next_action: "Seal Spec and DoR via ready-bundle, then author s06"
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners: ["devops"]
notes:
  - "OQ-01 - branch protection required checks - blocks merge, not start. Recorded as a release control in s06."
  - "OQ-02 - whether authoring-smoke joins the parallel group - is an approach question, resolved in s06 option analysis."
```

## Spec Freeze
```yaml
work_item_slug: "ci-guardrails-parallelisation"
status: APPROVED_WITH_ASSUMPTIONS
checks:
  brd_owner_present: NOT_APPLICABLE
  srs_owner_present: NOT_APPLICABLE
  spec_card_owner_present: PASS
  requirement_ids_present: PASS
  acceptance_criteria_mapped: PASS
  blocking_questions_resolved: PASS
  role_reviewers_recorded: PASS
accepted_assumptions:
  - "ASM-001: the six validators are independent - each passed standalone on 2026-09-11 and none uploads or consumes an artifact."
  - "ASM-002: renaming CI check names is acceptable, conditional on ODC-001 being answered before merge."
blocking_gaps: []
next_action: "Seal Spec with BA and DoR with QC via the Light ready-bundle; both receipts must bind to this finalized s04 note."
```

## SDD Traceability
```yaml
requirement_refs:
  - "product-specs/cards/ci-guardrails-parallelisation.md#REQ-001 through REQ-004"
acceptance_refs:
  - "product-specs/cards/ci-guardrails-parallelisation.md#AC-001 through AC-006"
task_refs: []
test_refs:
  - "TEST-001 proposed: hosted run with two deliberately broken validators reports both"
  - "TEST-002 proposed: hosted green run carries zero Node deprecation annotations"
  - "TEST-003 proposed: extracted run: line sets before and after are identical"
  - "TEST-004 proposed: run graph shows release-candidate starting only after every validator"
```

## Traceability
```yaml
upstream: ["ci-guardrails-parallelisation.s01.restate.md", "product-specs/cards/ci-guardrails-parallelisation.md"]
next_step: "s06 Task Plan (Light: no separate s05)"
```

## Handoff
- Mandatory criteria: AC-001 and AC-003 are the two that justify the work item; the rest guard against regression.
- Edge case to preserve: order-dependent validator behaviour must be reported, not silently fixed.
- Condition to enter s06: Spec and DoR sealed. Under Light these seal together in one ready-bundle interaction, each with its own receipt.
