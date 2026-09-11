---
artifact_id: "upgrade-guardrails-actions-node24.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "upgrade-guardrails-actions-node24"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
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
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-09-11T08:32:50Z"
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-09-11T08:32:50Z"
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "brainstorming"
  - "system-design"
  - "task-breakdown-planner"
  - "step-goal-contract"
  - "ci-cd-release"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "upgrade-guardrails-actions-node24.s04.acceptance-criteria.md"
linked_artifacts:
  - "../../product-specs/cards/upgrade-guardrails-actions-node24.md"
  - "upgrade-guardrails-actions-node24.work-item-report.json"
  - "../../.github/workflows/workflow-guardrails.yml"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Recommend a direct, version-only v4-to-v7 update after reviewing the intermediate major changes.
> The plan records command-level fail-first evidence, one 18-token production edit, two-tier review,
> and exact hosted verification. Developer approved Approach and Task Plan at
> `2026-09-11T08:32:50Z`; trusted ready-bundle receipts and explicit s07 activation remain pending,
> so no line of the workflow is authorized for editing yet.

## Main Artifact
```yaml
implementation_goal: "Move every guardrails checkout/setup-node step to the Node 24-backed v7 majors without changing workflow semantics or the deferred topology scope."
ba_lane:
  acceptance_coverage:
    - "CI-N24-T1/T2 cover AC-01..03 and AC-05."
    - "CI-N24-T3 covers AC-01..03 and AC-05 through local regression evidence."
    - "CI-N24-T4 covers AC-04 and final DoD evidence."
  scope_guards:
    - "Exactly one production path: .github/workflows/workflow-guardrails.yml."
    - "No matrix, parallelisation, fail-fast, job, needs, trigger, Node-version, cache, submodule, or credential changes."
    - "No release or tag action."
  human_review_points:
    - "Ready bundle before s07 activation."
    - "Spec Compliance before Code Quality after the source edit."
    - "QC Technical Verification and DoD after hosted evidence."
dev_lane:
  path_map:
    - { path: ".github/workflows/workflow-guardrails.yml", purpose: "18 action-major replacements; preserve every other token." }
    - { path: "work-items/upgrade-guardrails-actions-node24/upgrade-guardrails-actions-node24.s07.implementation.md", purpose: "Lazy-created implementation and fail-first/review evidence." }
    - { path: "work-items/upgrade-guardrails-actions-node24/upgrade-guardrails-actions-node24.s08.verification.md", purpose: "Lazy-created local/hosted evidence and DoD proposal." }
  technical_sequence:
    - "Capture source baseline and a normalized topology fingerprint."
    - "Run the v7 count assertion before editing and record the expected failure."
    - "Replace only checkout@v4/setup-node@v4 tokens with @v7."
    - "Run local invariant, syntax, diff, and workflow-pack checks."
    - "Complete two-tier review, then commit/push and bind one hosted run."
  tdd_targets:
    - "Command-level fail-first: exact v7 counts fail on the v4 baseline, then pass after the token-only edit."
    - "A persistent test file is intentionally not added because the selected major is release metadata and the hosted runner is the behavior harness; s07 must preserve the RED command/output as alternative TDD evidence."
task_breakdown:
  - id: "CI-N24-T0"
    owner_role: "developer"
    name: "Freeze workflow baseline"
    objective: "Record exact action counts, job IDs, needs edges, triggers, Node versions, release-candidate fetch-depth, and a normalized topology fingerprint before editing."
    paths_in_scope: [".github/workflows/workflow-guardrails.yml", "work-items/upgrade-guardrails-actions-node24/upgrade-guardrails-actions-node24.s07.implementation.md"]
    dependencies: []
    outputs_expected: ["9 checkout@v4", "9 setup-node@v4", "same-job baseline map", "release-candidate fetch-depth 0", "normalized baseline fingerprint"]
    review_checkpoint: "Confirm baseline covers every invariant in CI-N24-AC-01..05."
    verification_hint: "Use rg/count assertions plus YAML parsing or actionlint if available; store commands and outputs in s07."
  - id: "CI-N24-T1"
    owner_role: "developer"
    name: "Record expected RED"
    objective: "Prove the desired v7 state is absent before the production edit."
    paths_in_scope: ["work-items/upgrade-guardrails-actions-node24/upgrade-guardrails-actions-node24.s07.implementation.md"]
    dependencies: ["CI-N24-T0"]
    outputs_expected: ["A focused assertion that expects 9 checkout@v7 and 9 setup-node@v7", "Expected failure showing current counts are zero"]
    review_checkpoint: "RED must fail only on action-major counts, not YAML parsing or an unrelated command error."
    verification_hint: "Run the exact same assertion planned for CI-N24-T3 and capture non-zero exit plus the count mismatch."
  - id: "CI-N24-T2"
    owner_role: "developer"
    name: "Apply the 18-token action-major delta"
    objective: "Replace all baseline v4 selectors with v7 while preserving the full-history release-candidate checkout and every other workflow token."
    paths_in_scope: [".github/workflows/workflow-guardrails.yml"]
    dependencies: ["CI-N24-T1"]
    outputs_expected: ["9 checkout@v7", "9 setup-node@v7", "0 old v4 selectors", "fetch-depth 0 retained"]
    review_checkpoint: "Spec Compliance checks exact scope/counts before any Code Quality conclusion."
    verification_hint: "Run the T1 assertion, focused git diff, and normalized pre/post topology comparison."
  - id: "CI-N24-T3"
    owner_role: "developer"
    name: "Local verification and two-tier review"
    objective: "Prove the token-only change is syntactically valid, scope-clean, and compatible with the existing workflow contract."
    paths_in_scope: [".github/workflows/workflow-guardrails.yml", "work-items/upgrade-guardrails-actions-node24/upgrade-guardrails-actions-node24.s07.implementation.md"]
    dependencies: ["CI-N24-T2"]
    outputs_expected: ["Count/invariant PASS", "YAML/action validation PASS", "git diff --check PASS", "workflow validators PASS", "Spec Compliance verdict before Code Quality verdict"]
    review_checkpoint: "Developer/QC inspect v5-v7 compatibility, exact diff, security implications of major aliases, and rollback boundary."
    verification_hint: "Run focused assertions, available actionlint/YAML parse, npm workflow validators, and inspect that the diff changes only 18 uses values."
  - id: "CI-N24-T4"
    owner_role: "qc"
    name: "Hosted evidence and DoD proposal"
    objective: "Bind the exact source commit to one successful Workflow Guardrails run with zero Node deprecation annotations."
    paths_in_scope: ["work-items/upgrade-guardrails-actions-node24/upgrade-guardrails-actions-node24.s08.verification.md"]
    dependencies: ["CI-N24-T3", "source commit pushed"]
    outputs_expected: ["source commit SHA", "hosted run ID/URL", "all required jobs PASS", "zero Node deprecation annotations", "Regression & Compatibility Summary"]
    review_checkpoint: "QC Technical Verification and DoD remain separate from the hosted run itself."
    verification_hint: "Inspect the exact run conclusion, per-job conclusions, and annotations through GitHub; compare source SHA before proposing DoD."
dependencies_global:
  - "The work item must be activated with .github/workflows/workflow-guardrails.yml as the granted write root."
  - "Hosted verification requires a pushed source commit and GitHub Actions availability."
risk_notes:
  - "Direct three-major jump is bounded by release-note review and exact invariant tests."
  - "Major aliases track later v7 patches; this preserves repo convention but is weaker than immutable SHA pinning."
  - "After the Node 20 cutoff, rollback to v4 is non-operational; use fix-forward."
verification_plan:
  - "CI-N24-V1: pre/post exact action-count assertion."
  - "CI-N24-V2: normalized topology/fetch-depth/input invariants and focused diff."
  - "CI-N24-V3: YAML/action validation, workflow validators, and diff hygiene."
  - "CI-N24-V4: exact hosted run success plus zero Node deprecation annotations."
notes_for_implementation: "One sequential agentic batch in the existing CR-008 worktree; no delegation. Record RED before editing, review Spec Compliance before Code Quality, and stop before DoD if hosted annotations cannot be inspected."
```

## Option Analysis
```yaml
goal: "Reach the Node 24-compatible action baseline with the smallest behavior-preserving delta."
ba_lane:
  business_goal: "Keep mandatory guardrails available beyond the Node 20 runner cutoff."
  user_scenarios: ["A contributor pushes or opens a PR and receives the same guardrail results without Node runtime deprecation or startup failure."]
  business_rules: ["Every existing job is covered", "release-candidate keeps full history", "parallelisation remains separate"]
  scope_notes: ["One workflow file and evidence artifacts only"]
  open_questions: []
dev_lane:
  repo_constraints: ["9 checkout + 9 setup-node uses", "ubuntu-latest hosted runners", "release-candidate fetch-depth 0", "no setup-node cache opt-in"]
  technical_risks: ["v5-v7 runtime/default changes", "missed job", "topology drift"]
  integration_points: ["GitHub Actions runner", "checkout", "setup-node", "release-candidate artifact build"]
  nfr_notes: ["0 deprecation annotations", "0 topology changes", "18/18 selectors updated"]
  baseline_context: "Brownfield workflow is already green and owns sequential validation plus a Node 18/22 release-candidate matrix."
options:
  - "Option A - direct token-only v7 bump"
  - "Option B - staged v5, v6, then v7 migration"
  - "Option C - combine v7 bump with workflow parallelisation"
option_details:
  - name: "Option A - direct token-only v7 bump"
    summary: "Replace all 18 @v4 selectors with @v7 in one focused diff."
    pros: ["Smallest final delta", "One hosted candidate", "Easy review and revert", "Meets deadline directly"]
    cons: ["Crosses v5 and v6 without intermediate hosted runs"]
    risks: ["A release-note incompatibility could surface only on the hosted run"]
  - name: "Option B - staged v5, v6, then v7 migration"
    summary: "Create and verify an intermediate commit/run for each major."
    pros: ["Narrows which major introduces a failure"]
    cons: ["Three transient states and hosted runs", "Larger review/merge surface", "Only v7 is an acceptable final state"]
    risks: ["Consumes deadline without improving the final compatibility contract"]
  - name: "Option C - combine v7 bump with workflow parallelisation"
    summary: "Upgrade actions while restructuring validators into a matrix."
    pros: ["Could reduce runtime"]
    cons: ["Direct ownership conflict", "Obscures whether a failure comes from runtime or topology"]
    risks: ["High merge and attribution risk"]
recommended_option: "Option A - direct token-only v7 bump"
recommendation_reason: "It is the smallest sufficient solution; reviewed release notes plus exact invariant and hosted checks address the three-major risk without creating disposable intermediate states."
validation_plan: ["Expected RED on v7 counts", "18-token focused diff", "local invariant/syntax checks", "one exact hosted run with zero annotations"]
notes_for_next_step: "Ready for system-design normalization in the Technical Approach block; no unresolved question requires s03."
```

## Technical Approach
```yaml
design_problem: "Upgrade action runtimes without altering the guardrails control flow or release-candidate source identity."
business_rule_trace:
  - "CI-N24-REQ-001/002 -> replace all 18 selectors."
  - "CI-N24-REQ-003/005 -> preserve masked workflow topology and keep parallelisation absent."
  - "CI-N24-REQ-004 -> bind exact hosted success and annotation evidence."
design_options:
  - { name: "Direct token-only v7 bump", summary: "Selected from Option Analysis.", pros: ["minimal delta"], cons: ["one-step major jump"], risks: ["hosted incompatibility"] }
rejected_options:
  - { name: "Staged v5/v6/v7", reason: "Creates disposable states and more hosted cycles without changing the required final contract." }
  - { name: "Combined parallelisation", reason: "Outside scope and conflicts with the deferred owner's merge path." }
recommended_design: "Change only the uses selectors for actions/checkout and actions/setup-node to @v7, preserve all inputs/topology, then verify the exact source locally and on GitHub-hosted runners."
recommendation_reason: "The existing workflow boundary already meets the functional need; no abstraction or job redesign is required."
component_changes:
  - ".github/workflows/workflow-guardrails.yml: 18 version tokens"
data_flow:
  - "GitHub event -> unchanged guardrail jobs -> checkout@v7 -> setup-node@v7 -> unchanged validators -> unchanged release-candidate artifact flow"
interface_changes: []
failure_modes:
  - { scenario: "A runner is older than the Node 24 action requirement.", impact: "Action startup failure.", guardrail: "Scope uses GitHub-hosted ubuntu-latest; hosted run is mandatory before DoD." }
  - { scenario: "One v4 selector is missed.", impact: "Partial future outage/deprecation.", guardrail: "Exact 9/9 and zero-old-selector assertions." }
  - { scenario: "fetch-depth 0 is removed.", impact: "Release-candidate identity/reproducibility drift.", guardrail: "Dedicated invariant plus focused diff review." }
  - { scenario: "Local validation passes but deprecation remains hosted.", impact: "False readiness.", guardrail: "Zero hosted annotation criterion blocks Technical Verification." }
compatibility_impact:
  - "checkout v7 uses Node 24; v6 moved credentials to a separate file, but no workflow-input change is required for this hosted non-container usage."
  - "setup-node v7 uses ESM and removes the dummy NODE_AUTH_TOKEN fallback; this workflow supplies no registry/auth inputs."
  - "setup-node v6 limits automatic caching to npm; the root manifest has no package-manager declaration, so no cache is auto-enabled."
  - "checkout defaults for shallow depth, submodules, and credential persistence remain unchanged; release-candidate retains its explicit depth 0."
rollback_impact:
  - "Revert the single 18-token commit before 2026-09-23 if hosted compatibility fails."
  - "After the cutoff, do not restore Node 20-backed v4; fix forward to a compatible v7 patch or supported runner."
observability_hooks:
  - "Workflow run conclusion and per-job conclusions."
  - "Run annotation list filtered for Node/runtime deprecation."
  - "Release-candidate job completion on both Node 18 and 22 matrix entries."
constraints_applied: ["smallest correct delta", "no topology change", "fetch-depth 0", "no parallelisation", "hosted evidence required"]
validation_plan: ["counts", "normalized topology", "YAML/action validation", "workflow validators", "two-tier review", "exact hosted run"]
specialized_followups:
  - { skill: "ci-cd-release", reason: "Locks hosted run, annotation, rollback, and source-binding evidence; no publish action is in scope." }
notes_for_next_step: "Task plan is executable without re-inferring paths or sequence; implementation waits for ready-bundle receipts and explicit activation."
```

## Brownfield Impact Analysis
```yaml
impacted_modules: [".github/workflows/workflow-guardrails.yml"]
compatibility_risks:
  - "Node 24 action runner minimum"
  - "checkout v6 credential-file behavior"
  - "setup-node v6/v7 cache/auth/ESM behavior"
migration_notes: ["No data, schema, secret, cache, or job-topology migration."]
rollback_notes: ["Single-commit revert before cutoff; fix-forward after cutoff."]
```

## Verification Plan
- `CI-N24-V1`: expected RED then GREEN exact-count assertion.
- `CI-N24-V2`: normalized workflow invariants, including release-candidate `fetch-depth: 0`.
- `CI-N24-V3`: YAML/action validation, repository workflow validators, UTF-8, and `git diff --check`.
- `CI-N24-V4`: exact hosted run with all required jobs green and zero Node deprecation annotations.
- Risk: local PASS cannot substitute for hosted annotation evidence.
- Rollout: push the reviewed source commit only; no release or tag operation.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - { id: "CI-N24-GOV-05", check: "Option analysis compares a real smaller/direct path against alternatives", result: PASS, evidence: "Direct, staged, and combined-topology options are compared; direct is selected on scope and evidence." }
  - { id: "CI-N24-GOV-06", check: "Smallest correct solution", result: PASS, evidence: "One production file and 18 version tokens; no new abstraction or setting." }
  - { id: "CI-N24-GOV-07", check: "Execution plan names paths/order/verify", result: PASS, evidence: "T0..T4 each name paths, dependencies, outputs, checkpoint, and verification." }
  - { id: "CI-N24-GOV-08", check: "Delivery disciplines are explicit", result: PASS, evidence: "Existing worktree, command-level fail-first, two-tier review, no delegation, and hosted DoD evidence are recorded." }
  - { id: "CI-N24-GOV-09", check: "Human readiness gates", result: PASS_PENDING_RECEIPTS, evidence: "Developer explicitly approved Approach and Task Plan; digest-bound receipts remain empty." }
blocking_items:
  - "Four independent trusted readiness receipts"
owner: "developer/qc"
next_action: "Review s04 and s06, record Developer/QC gate provenance, then seal one ready bundle."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "After T2: exact counts, same job coverage, normalized topology, fetch-depth, and no parallelisation."
  - "After T3: full local workflow checks and ordered two-tier review."
  - "After T4: exact hosted source/run/annotation evidence."
compatibility_checkpoints:
  - "Review checkout v5/v6/v7 changes against current inputs and trigger types."
  - "Review setup-node v5/v6/v7 cache/auth/ESM changes against current manifest and inputs."
  - "Confirm release-candidate Node 18/22 matrix remains application runtime only and works with the Node 24-backed action runtime."
migration_or_backfill_steps: ["None."]
rollback_or_restore_steps:
  - "Revert the action-version commit before the cutoff if required."
  - "After the cutoff, select a supported v7 patch/runner and fix forward."
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
approach: { status: "HUMAN_APPROVED_PENDING_RECEIPT", reviewer: "developer", reviewed_at: "2026-09-11T08:32:50Z", host: "s06" }
task_plan: { status: "HUMAN_APPROVED_PENDING_RECEIPT", reviewer: "developer", reviewed_at: "2026-09-11T08:32:50Z", host: "s06" }
ready_bundle_reviewers:
  spec: "developer"
  dor: "qc"
  approach: "developer"
  task_plan: "developer"
```

## Handoff
- Human reviews for the compact s04+s06 bundle are complete; four trusted receipts remain pending.
- Implementation remains closed until the four receipts are sealed and verified, then the work item is explicitly activated with `.github/workflows/workflow-guardrails.yml` as its write root.
- `ci-guardrails-parallelisation` remains untouched and must rebase only after this branch merges.
