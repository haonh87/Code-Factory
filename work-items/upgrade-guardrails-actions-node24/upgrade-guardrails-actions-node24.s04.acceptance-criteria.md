---
artifact_id: "upgrade-guardrails-actions-node24.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "upgrade-guardrails-actions-node24"
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
  card: "product-specs/cards/upgrade-guardrails-actions-node24.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec: ["developer"]
  dor: ["qc"]
  approach: ["developer"]
  task_plan: ["developer"]
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: ["developer"]
  spec_reviewed_at: "2026-09-11T08:32:50Z"
  dor_reviewed_by: ["qc"]
  dor_reviewed_at: "2026-09-11T08:32:50Z"
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
  - "ci-cd-release"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "upgrade-guardrails-actions-node24.s01.restate.md"
linked_artifacts:
  - "../../product-specs/cards/upgrade-guardrails-actions-node24.md"
  - "upgrade-guardrails-actions-node24.work-item-report.json"
  - "../../.github/workflows/workflow-guardrails.yml"
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> The Spec Card and this host make the version-only maintenance delta measurable. Input readiness
> is `READY`: scope, counts, compatibility invariants, rollback, and hosted evidence are explicit.
> Developer approved Spec and QC approved DoR at `2026-09-11T08:32:50Z`. These decisions finalize
> the s04 host for receipt sealing but do not imply Approach, Task Plan, implementation, or DoD.

## Step Contract
```yaml
step: "s04 Acceptance + DoR"
goal: "Lock a testable version-only contract and determine whether the Node 24 action upgrade is ready for compact design and planning."
value: "Prevent the deadline fix from silently changing workflow behavior or absorbing the deferred parallelisation work item."
scope_in: ["Spec Card v0.1", "existing workflow baseline", "compatibility and hosted-run criteria"]
scope_out: ["technical implementation", "gate approval", "workflow execution"]
done_when:
  - "Every requirement has a measurable acceptance criterion."
  - "Brownfield behavior and rollback constraints are explicit."
  - "No unresolved input blocks Developer Spec or QC DoR review."
```

## Existing System Baseline
```yaml
baseline_date: "2026-09-11"
current_behavior_refs:
  - "workflow-guardrails.yml has 9 checkout@v4 and 9 setup-node@v4 references."
  - "Eight ordinary jobs use node-version 22; release-candidate-build keeps the existing Node 18/22 matrix."
  - "release-candidate-build explicitly checks out with fetch-depth: 0; other checkout steps use the default shallow depth."
  - "The workflow triggers on pull_request, push to main, and workflow_dispatch; it does not use pull_request_target or workflow_run."
impacted_surfaces:
  - ".github/workflows/workflow-guardrails.yml action selectors only"
compatibility_constraints:
  - "Keep all 9 job identifiers, needs edges, triggers, permissions, runners, Node versions, environment, and commands unchanged."
  - "Keep fetch-depth: 0 in release-candidate-build and add no submodules or persist-credentials override."
  - "Add no setup-node cache, registry-url, always-auth, or dependency-file inputs."
  - "Keep ci-guardrails-parallelisation outside this diff."
rollback_constraints:
  - "Before 2026-09-23, one revert may restore @v4 if a v7 incompatibility is discovered."
  - "After Node 20 removal, reverting to @v4 is not an operational rollback; fix forward to a compatible v7 patch or runner image."
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: "CI-N24-AC-01"
    criterion: "Every baseline checkout step uses actions/checkout@v7."
    verification: "Assert exactly 9 @v7 references, zero @v4 references, and the same containing job IDs as baseline."
  - id: "CI-N24-AC-02"
    criterion: "Every baseline Node setup step uses actions/setup-node@v7."
    verification: "Assert exactly 9 @v7 references, zero @v4 references, and the same containing job IDs as baseline."
  - id: "CI-N24-AC-03"
    criterion: "The workflow source changes only the 18 action-major tokens and retains release-candidate-build fetch-depth: 0."
    verification: "Review the focused diff and compare a normalized pre/post workflow with action versions masked; assert identical output."
  - id: "CI-N24-AC-04"
    criterion: "The exact changed source has one successful hosted Workflow Guardrails run with zero Node deprecation annotations."
    verification: "Inspect the run conclusion, required job conclusions, and run annotations for the source commit."
  - id: "CI-N24-AC-05"
    criterion: "Validator parallelisation and matrix restructuring remain untouched."
    verification: "Assert no new strategy matrix or fail-fast key and no job/needs topology change in the source diff."
edge_cases:
  - id: "CI-N24-EDGE-01"
    case: "A bulk replacement updates ordinary jobs but misses release-candidate-build."
    expected: "Count and job-coverage assertions fail before review."
  - id: "CI-N24-EDGE-02"
    case: "The release-candidate checkout loses fetch-depth: 0."
    expected: "The invariant check fails even if YAML remains syntactically valid."
  - id: "CI-N24-EDGE-03"
    case: "setup-node enables automatic caching unexpectedly."
    expected: "Manifest/input inspection proves no packageManager opt-in and no cache input was added."
  - id: "CI-N24-EDGE-04"
    case: "Local checks pass but GitHub emits a Node deprecation annotation."
    expected: "Technical Verification remains incomplete until hosted annotation count is zero."
out_of_scope:
  - "ci-guardrails-parallelisation"
  - "Application Node runtime changes"
  - "Release/tag publication"
done_when:
  - "CI-N24-AC-01..05 have PASS evidence."
  - "The exact hosted source run is green with zero Node deprecation annotations."
behavioral_invariants:
  - "Same triggers, jobs, needs edges, runners, Node versions, commands, and artifact flow."
  - "Only checkout/setup-node action majors change."
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - { id: "CI-N24-GOV-01", check: "Scope and non-goals are explicit", result: PASS, evidence: "Spec Card separates the 18-token bump from parallelisation and publication." }
  - { id: "CI-N24-GOV-02", check: "Acceptance is measurable", result: PASS, evidence: "CI-N24-AC-01..05 cover counts, topology, full history, hosted status, and annotations." }
  - { id: "CI-N24-GOV-03", check: "Brownfield compatibility and rollback are explicit", result: PASS, evidence: "Baseline, unchanged inputs, pre-cutoff revert, and post-cutoff fix-forward are recorded." }
  - { id: "CI-N24-GOV-04", check: "Human gates are not inferred", result: PASS, evidence: "Developer Spec and QC DoR decisions are explicitly recorded; trusted receipts remain separate." }
blocking_items:
  - "Trusted ready-bundle receipts for the two s04 gates"
owner: "developer/qc"
next_action: "Seal four independent readiness receipts in one ready-bundle interaction against unchanged s04 and s06 hosts."
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners: ["developer", "qc"]
notes:
  - "Request, scope, baseline, acceptance, dependencies, rollback, and hosted verify path are complete."
  - "No acceptance-changing open question remains."
  - "READY is an authoring verdict, not a human gate pass."
```

## Spec Freeze
```yaml
status: READY
requirement_ids: ["CI-N24-REQ-001", "CI-N24-REQ-002", "CI-N24-REQ-003", "CI-N24-REQ-004", "CI-N24-REQ-005"]
accepted_assumptions:
  - "GitHub-hosted ubuntu-latest runners satisfy the Node 24 action runner requirement."
  - "No setup-node cache opt-in exists in the root manifest."
  - "Major aliases @v7 preserve the repository's existing dependency-pin convention."
blockers: []
```

## SDD Traceability
```yaml
requirement_refs: ["CI-N24-REQ-001", "CI-N24-REQ-002", "CI-N24-REQ-003", "CI-N24-REQ-004", "CI-N24-REQ-005"]
acceptance_refs: ["CI-N24-AC-01", "CI-N24-AC-02", "CI-N24-AC-03", "CI-N24-AC-04", "CI-N24-AC-05"]
task_refs: ["CI-N24-T0", "CI-N24-T1", "CI-N24-T2", "CI-N24-T3", "CI-N24-T4"]
test_refs: ["CI-N24-V1", "CI-N24-V2", "CI-N24-V3", "CI-N24-V4"]
```

## Human Gate Proposal
```yaml
spec: { status: "HUMAN_APPROVED_PENDING_RECEIPT", reviewer: "developer", reviewed_at: "2026-09-11T08:32:50Z", host: "s04" }
dor: { status: "HUMAN_APPROVED_PENDING_RECEIPT", reviewer: "qc", reviewed_at: "2026-09-11T08:32:50Z", host: "s04" }
approach: { status: "HUMAN_APPROVED_PENDING_RECEIPT", reviewer: "developer", reviewed_at: "2026-09-11T08:32:50Z", host: "s06" }
task_plan: { status: "HUMAN_APPROVED_PENDING_RECEIPT", reviewer: "developer", reviewed_at: "2026-09-11T08:32:50Z", host: "s06" }
bundle_note: "One interaction may seal four independent digest-bound receipts; it does not merge their authority."
```

## Handoff
- s04 human reviews: Developer Spec and QC DoR are approved; trusted receipts are pending.
- Next paired artifact: s06 contains option analysis, approach, and execution plan.
- Implementation remains closed until the ready bundle is approved, sealed, verified, and the work item is explicitly activated.
