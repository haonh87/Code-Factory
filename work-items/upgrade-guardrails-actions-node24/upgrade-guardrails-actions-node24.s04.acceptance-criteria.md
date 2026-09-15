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
  card: "product-specs/cards/upgrade-guardrails-actions-node24.md"
spec_status: draft
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
> Amended Spec/DoR host for finding `F-N24-H1`. Hosted run `34947061938` passed all 10 jobs but
> emitted three Node 20 deprecation annotations from upload/download-artifact@v4, proving that the
> approved 18-token scope and AC-04 cannot both hold. Developer/QC approved the finding and
> Developer approved Option A/T4a at `2026-09-15T09:14:23Z`. This draft expands the original
> baseline by exactly two selectors; amended Spec and DoR human reviews remain pending.

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
  - "Eight non-matrix jobs use node-version 22; release-candidate keeps the existing Node 18/22 matrix."
  - "release-candidate explicitly checks out with fetch-depth: 0; other checkout steps use the default shallow depth."
  - "Hosted source ae6df04 completed 10/10 jobs but emitted one upload-artifact@v4 and two download-artifact@v4 Node deprecation annotations."
  - "The workflow triggers on pull_request, push to main, and workflow_dispatch; it does not use pull_request_target or workflow_run."
impacted_surfaces:
  - ".github/workflows/workflow-guardrails.yml action selectors only"
  - "product-specs/cards/upgrade-guardrails-actions-node24.md amended specification"
compatibility_constraints:
  - "Keep all 9 job identifiers, needs edges, triggers, permissions, runners, Node versions, environment, and commands unchanged."
  - "Keep fetch-depth: 0 in release-candidate-build and add no submodules or persist-credentials override."
  - "Add no setup-node cache, registry-url, always-auth, or dependency-file inputs."
  - "Keep artifact name, path, retention, digest, and upload/download ordering unchanged; do not use direct-upload mode or download v8."
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
    criterion: "Relative to the original baseline, the workflow source changes only 20 action-major tokens and retains release-candidate fetch-depth: 0."
    verification: "Review the focused diff and compare a normalized pre/post workflow with all four approved action versions masked; assert identical output."
  - id: "CI-N24-AC-04"
    criterion: "The exact changed source has one successful hosted Workflow Guardrails run with zero Node deprecation annotations."
    verification: "Inspect the run conclusion, required job conclusions, and run annotations for the source commit."
  - id: "CI-N24-AC-05"
    criterion: "Validator parallelisation and matrix restructuring remain untouched."
    verification: "Assert no new strategy matrix or fail-fast key and no job/needs topology change in the source diff."
  - id: "CI-N24-AC-06"
    criterion: "The artifact transfer uses exactly one actions/upload-artifact@v6 and one actions/download-artifact@v7, with zero v4 artifact-action selectors and unchanged inputs/order."
    verification: "Assert exact counts, compare the two step input maps and ordering to source 5baea95, and confirm the second hosted run has zero Node deprecation annotations."
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
  - id: "CI-N24-EDGE-05"
    case: "A latest-major upgrade selects download-artifact@v8 and silently changes digest-mismatch handling."
    expected: "Scope review rejects the change; the amendment is pinned to download-artifact@v7."
out_of_scope:
  - "ci-guardrails-parallelisation"
  - "Application Node runtime changes"
  - "Release/tag publication"
done_when:
  - "CI-N24-AC-01..06 have PASS evidence."
  - "The exact hosted source run is green with zero Node deprecation annotations."
behavioral_invariants:
  - "Same triggers, jobs, needs edges, runners, Node versions, commands, and artifact flow."
  - "Only checkout/setup-node/upload-artifact/download-artifact action majors change."
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - { id: "CI-N24-GOV-01", check: "Scope and non-goals are explicit", result: PASS, evidence: "Spec Card v0.2 separates the exact 20-token action-runtime delta from parallelisation and publication." }
  - { id: "CI-N24-GOV-02", check: "Acceptance is measurable", result: PASS, evidence: "CI-N24-AC-01..05 cover counts, topology, full history, hosted status, and annotations." }
  - { id: "CI-N24-GOV-03", check: "Brownfield compatibility and rollback are explicit", result: PASS, evidence: "Baseline, unchanged inputs, pre-cutoff revert, and post-cutoff fix-forward are recorded." }
  - { id: "CI-N24-GOV-04", check: "Human gates are not inferred", result: PASS, evidence: "The original gate receipts remain historical; amended Spec and DoR reviews and fresh receipts are pending." }
  - { id: "CI-N24-GOV-04A", check: "Hosted scope conflict is resolved without waiver", result: PASS, evidence: "Option A adds the first Node 24-default artifact-action majors and preserves inputs; AC-04 remains unchanged." }
blocking_items:
  - "Developer amended Spec review and QC amended DoR review"
  - "Fresh digest-bound ready-bundle receipts"
owner: "developer/qc"
next_action: "Seal four independent readiness receipts in one ready-bundle interaction against unchanged s04 and s06 hosts."
```

## Definition of Ready
```yaml
status: READY_FOR_REVIEW
blockers: []
owners: ["developer", "qc"]
notes:
  - "Request, scope, baseline, acceptance, dependencies, rollback, and hosted verify path are complete."
  - "No acceptance-changing open question remains after the approved Option A direction."
  - "READY is an authoring verdict, not a human gate pass."
```

## Spec Freeze
```yaml
status: READY
requirement_ids: ["CI-N24-REQ-001", "CI-N24-REQ-002", "CI-N24-REQ-003", "CI-N24-REQ-004", "CI-N24-REQ-005", "CI-N24-REQ-006"]
accepted_assumptions:
  - "GitHub-hosted ubuntu-latest runners satisfy the Node 24 action runner requirement."
  - "No setup-node cache opt-in exists in the root manifest."
  - "Major aliases @v7 preserve the repository's existing dependency-pin convention."
  - "upload-artifact@v6 and download-artifact@v7 are the first majors that run on Node 24 by default; their current step inputs need no migration."
blockers: []
```

## SDD Traceability
```yaml
requirement_refs: ["CI-N24-REQ-001", "CI-N24-REQ-002", "CI-N24-REQ-003", "CI-N24-REQ-004", "CI-N24-REQ-005", "CI-N24-REQ-006"]
acceptance_refs: ["CI-N24-AC-01", "CI-N24-AC-02", "CI-N24-AC-03", "CI-N24-AC-04", "CI-N24-AC-05", "CI-N24-AC-06"]
task_refs: ["CI-N24-T0", "CI-N24-T1", "CI-N24-T2", "CI-N24-T3", "CI-N24-T4", "CI-N24-T4A"]
test_refs: ["CI-N24-V1", "CI-N24-V2", "CI-N24-V3", "CI-N24-V4", "CI-N24-V4A"]
```

## Human Gate Proposal
```yaml
spec: { status: "PENDING_AMENDED_HUMAN_REVIEW", reviewer: "developer", host: "s04" }
dor: { status: "PENDING_AMENDED_HUMAN_REVIEW", reviewer: "qc", host: "s04" }
approach: { status: "PENDING_AMENDED_HUMAN_REVIEW", reviewer: "developer", host: "s06" }
task_plan: { status: "PENDING_AMENDED_HUMAN_REVIEW", reviewer: "developer", host: "s06" }
bundle_note: "One interaction may seal four independent digest-bound receipts; it does not merge their authority."
```

## Handoff
- Finding direction: F-N24-H1 and Option A/T4a are human-approved; this is not an amended gate pass.
- Next review: Developer amended Spec and QC amended DoR, followed by amended s06 Approach and Task Plan.
- Production remains blocked until all four fresh receipts match the amended hosts and the work item is explicitly resumed with the Spec Card path added.
