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
  approach_reviewed_at: "2026-09-15T10:17:29Z"
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-09-15T10:17:29Z"
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
> Amended Approach and Task Plan for hosted finding `F-N24-H1`. The reviewed 18-token commit remains
> historical PASS evidence, but run `34947061938` proved that two artifact-action selectors also
> require Node 24 majors to satisfy unchanged AC-04. Developer/QC approved the finding and Developer
> approved Option A/T4a at `2026-09-15T09:14:23Z`. This draft adds exactly one upload-artifact@v6,
> one download-artifact@v7, the Spec Card authoring path, refreshed review, and a second hosted run;
> Developer approved the amended Approach and Task Plan T4a at `2026-09-15T09:27:44Z`. During T4a,
> the full unit suite exposed `F-N24-T4A-001`: two existing release-contract tests still assert the
> superseded v4 artifact selectors. Amendment T4b adds only those two existing test files and four
> expectation-token updates; because Approach and Task Plan share this physical s06 host, both need
> fresh Developer approval and digest-bound receipts before test edits or resume. Developer and QC
> approved finding `F-N24-T4A-001`, and Developer approved the unchanged-semantic Approach plus Task
> Plan amendment T4b at `2026-09-15T10:17:29Z`; trusted receipts and resume remain separate.

## Main Artifact
```yaml
implementation_goal: "Move every JavaScript action used by Guardrails off Node 20 using the smallest compatible majors, without changing workflow semantics or the deferred topology scope."
ba_lane:
  acceptance_coverage:
    - "CI-N24-T1/T2 cover AC-01..03 and AC-05 for checkout/setup-node."
    - "CI-N24-T4A covers AC-03, AC-04, and AC-06 for the hosted artifact-action finding."
    - "CI-N24-T3 covers AC-01..03 and AC-05 through local regression evidence."
    - "CI-N24-T4 covers AC-04 and final DoD evidence."
  scope_guards:
    - "Exactly one production path: .github/workflows/workflow-guardrails.yml; Spec Card and work-item notes are authoring/evidence only."
    - "Exactly 20 selector changes from the original baseline: the reviewed 18 plus upload@v6 and download@v7."
    - "Exactly two existing test paths may change, limited to four v4-to-approved-major expectation tokens; no test logic, fixtures, or coverage boundary changes."
    - "No matrix, parallelisation, fail-fast, job, needs, trigger, Node-version, action-input, cache, submodule, or credential changes."
    - "No release or tag action."
  human_review_points:
    - "Fresh amended ready bundle before s07 resume."
    - "Refreshed Spec Compliance before refreshed Code Quality after the two-token recovery edit."
    - "QC Technical Verification and DoD after hosted evidence."
dev_lane:
  path_map:
    - { path: ".github/workflows/workflow-guardrails.yml", purpose: "20 action-major replacements from original baseline; preserve every other token (18 reviewed, 2 amendment-pending)." }
    - { path: "product-specs/cards/upgrade-guardrails-actions-node24.md", purpose: "Amended Spec Card v0.2 for F-N24-H1; no production behavior." }
    - { path: "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js", purpose: "Update the existing exact-candidate action-version expectations from artifact v4 to the approved v6/v7 majors." }
    - { path: "packages/workflow-bundle/test/release-surface.test.js", purpose: "Update the existing release-surface tokens from artifact v4 to the approved v6/v7 majors." }
    - { path: "work-items/upgrade-guardrails-actions-node24/upgrade-guardrails-actions-node24.s07.implementation.md", purpose: "Lazy-created implementation and fail-first/review evidence." }
    - { path: "work-items/upgrade-guardrails-actions-node24/upgrade-guardrails-actions-node24.s08.verification.md", purpose: "Lazy-created local/hosted evidence and DoD proposal." }
  technical_sequence:
    - "Preserve T0-T3 and commit 5baea95 as historical completed evidence."
    - "Materialize amended Spec/DoR/Approach/Task Plan and reseal all four receipts."
    - "Resume with the Spec Card, workflow, and work-item roots; record RED for the two artifact selectors."
    - "Replace only upload-artifact@v4 with @v6 and download-artifact@v4 with @v7."
    - "Run the full unit suite, capture F-N24-T4A-001 RED, then update only four stale version expectations across the two approved existing test files."
    - "Run local invariant, syntax, diff, and workflow-pack checks; complete refreshed two-tier review."
    - "Commit/push the two-token recovery and bind a second hosted run with zero annotations."
  tdd_targets:
    - "Command-level fail-first: exact v7 counts fail on the v4 baseline, then pass after the token-only edit."
    - "No new persistent test file is added; the two existing release-contract tests are updated because they already own the action-version contract and fail on the approved selector majors."
    - "T4A adds a RED assertion expecting upload@v6/download@v7 and zero v4 artifact selectors; run unchanged after the two-token edit for GREEN."
    - "T4B uses the full unit suite failure as RED, then reruns the same suite after only four existing expectation tokens are updated."
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
    verification_hint: "Historical T3 evidence: focused assertions, YAML parse, npm workflow validators, and the reviewed 18-selector diff at commit 5baea95."
  - id: "CI-N24-T4"
    owner_role: "qc"
    name: "Hosted evidence and DoD proposal"
    objective: "Bind the exact source commit to one successful Workflow Guardrails run with zero Node deprecation annotations."
    paths_in_scope: ["work-items/upgrade-guardrails-actions-node24/upgrade-guardrails-actions-node24.s08.verification.md"]
    dependencies: ["CI-N24-T3", "CI-N24-T4A", "amended source commit pushed"]
    outputs_expected: ["source commit SHA", "hosted run ID/URL", "all required jobs PASS", "zero Node deprecation annotations", "Regression & Compatibility Summary"]
    review_checkpoint: "QC Technical Verification and DoD remain separate from the hosted run itself."
    verification_hint: "Inspect the exact run conclusion, per-job conclusions, and annotations through GitHub; compare source SHA before proposing DoD."
  - id: "CI-N24-T4A"
    owner_role: "developer"
    name: "Resolve hosted artifact-action deprecation finding"
    objective: "Close F-N24-H1 with the smallest two-token Node 24-default artifact-action delta and no artifact-flow change."
    paths_in_scope: ["product-specs/cards/upgrade-guardrails-actions-node24.md", "work-items/upgrade-guardrails-actions-node24", ".github/workflows/workflow-guardrails.yml"]
    dependencies: ["F-N24-H1 human-approved", "amended Spec/DoR/Approach/Task Plan receipts digest-match", "explicit work-item resume with all three roots"]
    outputs_expected: ["1 upload-artifact@v6", "1 download-artifact@v7", "0 v4 artifact selectors", "unchanged artifact inputs/order", "refreshed two-tier PASS", "second exact hosted run with 0 Node deprecation annotations"]
    review_checkpoint: "Developer/QC approve refreshed Spec Compliance before refreshed Code Quality for the two-token source digest."
    verification_hint: "RED/GREEN exact selector assertion; normalize all four action selectors; compare upload/download step maps and order; full local checks; inspect annotations for every check-run."
  - id: "CI-N24-T4B"
    owner_role: "developer"
    name: "Rebind existing release-contract expectations"
    objective: "Resolve F-N24-T4A-001 by aligning two existing test contracts to the already-approved upload v6/download v7 selectors without changing their logic or coverage."
    paths_in_scope: ["packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js", "packages/workflow-bundle/test/release-surface.test.js", "work-items/upgrade-guardrails-actions-node24"]
    dependencies: ["F-N24-T4A-001 recorded", "Developer approves amended Approach and Task Plan T4b", "fresh s06 approach/task_plan receipts digest-match", "explicit resume grants both test paths"]
    outputs_expected: ["2 upload-artifact expectations use @v6", "2 download-artifact expectations use @v7", "0 other test-line changes", "full unit suite PASS"]
    review_checkpoint: "Refreshed Spec Compliance confirms test-only contract alignment before refreshed Code Quality."
    verification_hint: "Use the captured full-suite RED; inspect a zero-context four-line test diff; rerun the same full suite plus pack, authoring, scoped validators, YAML, diff, and UTF-8 checks."
dependencies_global:
  - "The work item must be activated with .github/workflows/workflow-guardrails.yml as the granted write root."
  - "Resume after amendment with product-specs/cards/upgrade-guardrails-actions-node24.md, the workflow, and work-items/upgrade-guardrails-actions-node24 as granted roots."
  - "Resume after T4b with both packages/workflow-bundle/test release-contract files added to the granted roots."
  - "Hosted verification requires a pushed source commit and GitHub Actions availability."
risk_notes:
  - "Direct three-major jump is bounded by release-note review and exact invariant tests."
  - "upload-artifact@v6 and download-artifact@v7 are intentionally selected instead of latest majors because they are the first Node 24-default releases and avoid unrelated v7/v8 behavior surface."
  - "Major aliases track later patches; this preserves repo convention but is weaker than immutable SHA pinning."
  - "After the Node 20 cutoff, rollback to v4 is non-operational; use fix-forward."
verification_plan:
  - "CI-N24-V1: pre/post exact action-count assertion."
  - "CI-N24-V2: normalized topology/fetch-depth/input invariants and focused diff."
  - "CI-N24-V3: YAML/action validation, workflow validators, and diff hygiene."
  - "CI-N24-V4: exact hosted run success plus zero Node deprecation annotations."
  - "CI-N24-V4A: exact artifact-selector counts plus unchanged name/path/retention/digest/order and a second hosted annotation audit."
notes_for_implementation: "One sequential agentic recovery batch in the existing CR-008 worktree; no delegation. Preserve 5baea95 as the reviewed 18-token commit, add a separate two-token recovery commit only after fresh receipts, review Spec Compliance before Code Quality, and stop before DoD unless hosted annotations are zero."
```

## Option Analysis
```yaml
goal: "Resolve F-N24-H1 and reach zero hosted Node deprecation annotations with the smallest behavior-preserving recovery."
ba_lane:
  business_goal: "Keep mandatory guardrails available beyond the Node 20 runner cutoff."
  user_scenarios: ["A contributor pushes or opens a PR and receives the same guardrail results without Node runtime deprecation or startup failure."]
  business_rules: ["Every existing job is covered", "release-candidate keeps full history", "parallelisation remains separate"]
  scope_notes: ["One workflow file, amended Spec Card, and work-item evidence only"]
  open_questions: []
dev_lane:
  repo_constraints: ["reviewed 9 checkout@v7 + 9 setup-node@v7", "1 upload-artifact@v4", "1 download-artifact@v4 used by two matrix jobs", "ubuntu-latest hosted runners", "release-candidate fetch-depth 0"]
  technical_risks: ["artifact action path/digest behavior", "unnecessary latest-major behavior change", "topology drift"]
  integration_points: ["GitHub Actions runner", "checkout", "setup-node", "upload-artifact", "download-artifact", "release-candidate artifact build"]
  nfr_notes: ["0 deprecation annotations", "0 topology or action-input changes", "20/20 original-baseline selectors updated"]
  baseline_context: "Source ae6df04 passed 10/10 jobs but emitted three Node 20 warnings from the two artifact-action selectors."
options:
  - "Option A - first Node 24-default artifact majors"
  - "Option B - latest artifact majors"
  - "Option C - waive or narrow the zero-annotation criterion"
option_details:
  - name: "Option A - first Node 24-default artifact majors"
    summary: "Change upload-artifact@v4 to @v6 and download-artifact@v4 to @v7."
    pros: ["Only two additional tokens", "Both actions run on Node 24 by default", "No current input migration", "Avoids download v8 behavior change"]
    cons: ["upload-artifact remains one major behind latest"]
    risks: ["A hosted-only incompatibility still requires the second exact run"]
  - name: "Option B - latest artifact majors"
    summary: "Change upload-artifact to @v7 and download-artifact to @v8."
    pros: ["Latest supported releases"]
    cons: ["Download v8 changes digest mismatch to error and adds direct-download behavior", "More change than AC-04 requires"]
    risks: ["A previously warning-only digest mismatch could fail the workflow"]
  - name: "Option C - waive or narrow zero annotations"
    summary: "Keep artifact actions on v4 and ignore their Node 20 warnings."
    pros: ["No extra source tokens today"]
    cons: ["Known pipeline outage remains at the Node 20 cutoff", "Contradicts the approved business goal and AC-04"]
    risks: ["Guardrails becomes non-operational after runner removal"]
recommended_option: "Option A - first Node 24-default artifact majors"
recommendation_reason: "It is the smallest sufficient recovery and preserves the artifact contract while eliminating every observed Node 20 action."
validation_plan: ["Expected RED on artifact selector counts", "two-token focused diff", "20-token normalized original-baseline comparison", "unchanged artifact inputs/order", "second exact hosted run with zero annotations"]
notes_for_next_step: "Developer/QC approved this direction only; amended Spec, DoR, Approach, and Task Plan gates remain pending."
```

## Technical Approach
```yaml
design_problem: "Upgrade action runtimes without altering the guardrails control flow or release-candidate source identity."
business_rule_trace:
  - "CI-N24-REQ-001/002 -> preserve the reviewed 18 checkout/setup-node selectors."
  - "CI-N24-REQ-006 -> replace the two hosted-warning artifact selectors with upload@v6/download@v7."
  - "CI-N24-REQ-003/005 -> preserve masked workflow topology and keep parallelisation absent."
  - "CI-N24-REQ-004 -> bind exact hosted success and annotation evidence."
design_options:
  - { name: "First Node 24-default artifact majors", summary: "Selected from amended Option Analysis.", pros: ["two-token recovery", "input-compatible"], cons: ["upload one major behind latest"], risks: ["hosted incompatibility"] }
rejected_options:
  - { name: "Latest upload@v7/download@v8", reason: "Download v8 changes digest-mismatch failure semantics beyond the requirement." }
  - { name: "Annotation waiver", reason: "Contradicts AC-04 and leaves the cutoff outage unresolved." }
recommended_design: "Preserve the reviewed checkout/setup-node@v7 selectors, change only upload-artifact to @v6 and download-artifact to @v7, preserve all inputs/topology, then verify the amended exact source locally and on GitHub-hosted runners."
recommendation_reason: "The existing workflow boundary already meets the functional need; no abstraction or job redesign is required."
component_changes:
  - ".github/workflows/workflow-guardrails.yml: 20 version tokens from original baseline (18 complete, 2 pending amendment)"
data_flow:
  - "GitHub event -> unchanged guardrail jobs -> checkout@v7 -> setup-node@v7 -> unchanged validators -> upload-artifact@v6 -> download-artifact@v7 -> unchanged release-candidate artifact flow"
interface_changes: []
failure_modes:
  - { scenario: "A runner is older than the Node 24 action requirement.", impact: "Action startup failure.", guardrail: "Scope uses GitHub-hosted ubuntu-latest; hosted run is mandatory before DoD." }
  - { scenario: "One v4 selector is missed.", impact: "Partial future outage/deprecation.", guardrail: "Exact 9/9 and zero-old-selector assertions." }
  - { scenario: "fetch-depth 0 is removed.", impact: "Release-candidate identity/reproducibility drift.", guardrail: "Dedicated invariant plus focused diff review." }
  - { scenario: "Local validation passes but deprecation remains hosted.", impact: "False readiness.", guardrail: "Zero hosted annotation criterion blocks Technical Verification." }
  - { scenario: "Latest download major changes digest mismatch behavior.", impact: "Unexpected release-candidate failure semantics.", guardrail: "Use download-artifact@v7; v8 remains explicitly out of scope." }
compatibility_impact:
  - "checkout v7 uses Node 24; v6 moved credentials to a separate file, but no workflow-input change is required for this hosted non-container usage."
  - "setup-node v7 uses ESM and removes the dummy NODE_AUTH_TOKEN fallback; this workflow supplies no registry/auth inputs."
  - "setup-node v6 limits automatic caching to npm; the root manifest has no package-manager declaration, so no cache is auto-enabled."
  - "checkout defaults for shallow depth, submodules, and credential persistence remain unchanged; release-candidate retains its explicit depth 0."
  - "upload-artifact@v6 and download-artifact@v7 run on Node 24 by default; the existing artifact name/path/retention and name-based download need no migration."
rollback_impact:
  - "Revert the bounded action-selector commits before 2026-09-23 if hosted compatibility fails."
  - "After the cutoff, do not restore Node 20-backed v4; fix forward to a compatible v7 patch or supported runner."
observability_hooks:
  - "Workflow run conclusion and per-job conclusions."
  - "Run annotation list filtered for Node/runtime deprecation."
  - "Release-candidate job completion on both Node 18 and 22 matrix entries."
constraints_applied: ["smallest correct delta", "20 original-baseline selector changes only", "no topology or action-input change", "fetch-depth 0", "no parallelisation", "hosted evidence required"]
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
  - "artifact upload/download major compatibility and digest behavior"
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
  - { id: "CI-N24-GOV-06", check: "Smallest correct solution", result: PASS, evidence: "One production file and 20 original-baseline version tokens; the two-token amendment uses the first Node 24-default artifact majors and adds no setting." }
  - { id: "CI-N24-GOV-07", check: "Execution plan names paths/order/verify", result: PASS, evidence: "T0..T4 each name paths, dependencies, outputs, checkpoint, and verification." }
  - { id: "CI-N24-GOV-08", check: "Delivery disciplines are explicit", result: PASS, evidence: "Existing worktree, command-level fail-first, two-tier review, no delegation, and hosted DoD evidence are recorded." }
  - { id: "CI-N24-GOV-09", check: "Human readiness gates", result: PASS_PENDING_RECEIPTS, evidence: "Developer approved amended Spec/Approach/Task Plan and QC approved amended DoR at 2026-09-15T09:27:44Z; fresh receipts remain separate." }
blocking_items:
  - "Four fresh independent trusted readiness receipts"
owner: "developer/qc"
next_action: "Review amended Spec/DoR/Approach/Task Plan, record Developer/QC provenance, then seal one fresh ready bundle and explicitly resume with all three roots."
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
  - "Review upload-artifact v5/v6 and download-artifact v5/v6/v7 changes against the current name/path inputs; keep download v8 outside scope."
  - "Confirm release-candidate Node 18/22 matrix remains application runtime only and works with the Node 24-backed action runtime."
migration_or_backfill_steps: ["None."]
rollback_or_restore_steps:
  - "Revert the action-version commit before the cutoff if required."
  - "After the cutoff, select a supported v7 patch/runner and fix forward."
```

## SDD Traceability
```yaml
requirement_refs: ["CI-N24-REQ-001", "CI-N24-REQ-002", "CI-N24-REQ-003", "CI-N24-REQ-004", "CI-N24-REQ-005", "CI-N24-REQ-006"]
acceptance_refs: ["CI-N24-AC-01", "CI-N24-AC-02", "CI-N24-AC-03", "CI-N24-AC-04", "CI-N24-AC-05", "CI-N24-AC-06"]
task_refs: ["CI-N24-T0", "CI-N24-T1", "CI-N24-T2", "CI-N24-T3", "CI-N24-T4A", "CI-N24-T4B", "CI-N24-T4"]
test_refs: ["CI-N24-V1", "CI-N24-V2", "CI-N24-V3", "CI-N24-V4A", "CI-N24-V4B", "CI-N24-V4"]
```

## Human Gate Proposal
```yaml
approach: { status: "HUMAN_APPROVED_PENDING_RECEIPT", reviewer: "developer", reviewed_at: "2026-09-15T10:17:29Z", host: "s06", semantic_delta: "None; receipt refresh is required because T4b changes the shared host artifact." }
task_plan: { status: "HUMAN_APPROVED_PENDING_RECEIPT", reviewer: "developer", reviewed_at: "2026-09-15T10:17:29Z", host: "s06", amendment: "T4b" }
ready_bundle_reviewers:
  spec: "developer"
  dor: "qc"
  approach: "developer"
  task_plan: "developer"
```

## Handoff
- Original compact reviews and receipts are historical; amended Spec, DoR, Approach, and Task Plan are human-approved and await fresh receipts.
- Implementation remains blocked until four fresh receipts are sealed and verified, then the work item is explicitly resumed with the Spec Card, workflow, and work-item roots.
- `ci-guardrails-parallelisation` remains untouched and must rebase only after this branch merges.
