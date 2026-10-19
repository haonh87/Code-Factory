---
artifact_id: "ci-guardrails-parallelisation.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "ci-guardrails-parallelisation"
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
  approach_reviewed_by:
    - "developer"
    - "devops"
  approach_reviewed_at: "2026-10-19T13:21:50Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-10-19T13:21:50Z"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "ci-guardrails-parallelisation.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> The user accepted the bounded resumption amendment T1-R..T4-R, conditional GOV-EX-002 resolution and publishing candidate/probe branches for GitHub Actions verification. Consolidate only the six validators; preserve the current build-once artifact chain. Approach/Task Plan content is approved; replacement signatures and signed stale-state dispositions are required before resume.

## Step Contract
```yaml
step_goal: "Make the accepted validator-parallelisation amendment executable against current main."
input_summary: ["Approved Spec Card and s04", "Current e5dc98a workflow", "Accepted resumption packet in s07"]
output_summary: ["Bounded matrix approach", "T1-R..T4-R", "Hosted proof and authority boundaries"]
done_when: ["Exact source scope and dependencies defined", "All ACs retain a concrete verify path", "Existing artifact pipeline preserved"]
owner: devops
```

## Option Analysis
```yaml
goal: "Report all independent validator failures in one run while preserving release-candidate gating."
options:
  - "A: One six-entry matrix with fail-fast false; authoring smoke needs the matrix."
  - "B: Remove validator needs edges but retain duplicated job setup."
  - "C: Parallelize artifact consumers before candidate build."
recommended_option: "A"
recommendation_reason: "A meets AC-001 and AC-005 while preserving the actual artifact dependencies. B fails the one-place setup requirement; C violates candidate provenance."
validation_plan:
  - "Compare exact six commands and arguments before/after."
  - "Observe structural matrix assertion fail before edit, then pass."
  - "Hosted green run plus two-real-validator-failure probe; inspect annotations and downstream skip behavior."
```

## Technical Approach
```yaml
recommended_approach: "Replace the six serial validator job blocks with validate matrix.include entries containing name and command; use fail-fast false, ubuntu-latest, Node 22 and a 10-minute timeout. Change only workflow-authoring-smoke.needs to validate outside those blocks."
validator_entries:
  - {name: Fixtures, command: "npm run validate:workflow:fixtures"}
  - {name: Artifacts, command: "npm run validate:workflow -- --workflow-root work-items --project-root ."}
  - {name: SDD, command: "npm run validate:workflow:sdd -- --workflow-root work-items --project-root ."}
  - {name: Changes, command: "npm run validate:workflow:change -- --workflow-root work-items --project-root ."}
  - {name: Execution, command: "npm run validate:workflow:execution -- --workflow-root work-items"}
  - {name: Planning, command: "npm run validate:workflow:planning -- --workflow-root work-items"}
controls:
  - "Retain current checkout/setup-node v7; REQ-002 was delivered by upgrade-guardrails-actions-node24."
  - "One checkout/setup-node contract for the six validator entries; downstream jobs retain their own runner setup."
  - "No continue-on-error; every validator failure still fails the workflow."
explicitly_untouched:
  - "All authoring smoke steps; both complete candidate job definitions, their artifact/digest/environment contracts and Node 18/22 matrix."
  - "Other workflow files, npm scripts, validator behavior, package versions and release artifacts."
  - "Repository settings, branch protection, global installation, release publication and merge."
```

## Brownfield Impact Analysis
```yaml
baseline_commit: "e5dc98aac70196f9d3a391153325049c0402eb17"
existing_graph: "Six serial validators -> workflow-authoring-smoke -> release-candidate-build -> release-candidate Node 18/22."
proposed_graph: "Six parallel validate entries -> unchanged workflow-authoring-smoke -> unchanged release-candidate-build -> unchanged release-candidate Node 18/22."
compatibility_risks: ["Validator check names change", "CI scheduling noise affects wall-clock", "Historical absolute workflow_root requires canonical authoring-host consistency"]
mitigations: ["Recheck branch rules before integration", "Keep 105s acceptance threshold and report measured 158s current comparison separately", "Retain canonical workflow artifacts and verify identical worktree snapshots; never hand-edit protocol paths"]
rollback: "Revert only the isolated workflow change; no artifact or data migration."
```

## Main Artifact
```yaml
implementation_goal: "Implement and prove the accepted six-validator matrix without changing downstream artifact behavior."
task_breakdown:
  - id: T1-R
    owner_role: devops
    name: "Refresh and pin baseline"
    paths_in_scope: ["work-items/ci-guardrails-parallelisation"]
    dependencies: ["Valid amended authoring signatures and signed stale-state dispositions before resume"]
    outputs_expected: ["Exact source SHA/workflow hash", "Six-command list", "Run durations and branch-rule observation"]
    verification_hint: "Recheck main SHA and rules before source edits. Preserve historical run 32825477258 / 105s; record current run 38919485042 / 158s using started_at to updated_at. Do not substitute the larger threshold for AC-002."
    review_checkpoint: "Normal CLI resume only after accepted exception disposition is recorded."
  - id: T2-R
    owner_role: devops
    name: "Inherit completed action upgrade"
    paths_in_scope: ["work-items/ci-guardrails-parallelisation"]
    dependencies: ["T1-R"]
    outputs_expected: ["Node24 owner closure and current action references recorded"]
    verification_hint: "Confirm upgrade owner ARCHIVED and v7 references. No action update. AC-003 still needs a new green run with zero Node deprecation annotations."
    review_checkpoint: "Separate inherited implementation from fresh hosted evidence."
  - id: T3-R
    owner_role: developer
    name: "Parallelize only independent validators"
    paths_in_scope: [".github/workflows/workflow-guardrails.yml", "work-items/ci-guardrails-parallelisation"]
    dependencies: ["T2-R"]
    outputs_expected: ["One matrix with six exact commands", "Authoring smoke gated by validate", "Preserved candidate jobs"]
    verification_hint: "Scratch structural assertion must fail on missing matrix first. After edit parse YAML and require six exact commands, fail-fast false, no per-entry needs, authoring dependency, byte-identical candidate jobs and unchanged authoring steps. Run actionlint if present; otherwise disclose the gap."
    review_checkpoint: "Spec Compliance then Code Quality before any push."
  - id: T4-R
    owner_role: devops
    name: "Hosted green and real double-failure proof"
    paths_in_scope:
      - "work-items/ci-guardrails-parallelisation"
      - "Probe branch only: packages/workflow-bundle/tests/fixtures/workflow-governance/valid-default/workflow/customer-search.s04.acceptance-criteria.md"
      - "Probe branch only: work-items/sample-sdd-item/sample-sdd-item.s04.acceptance-criteria.md"
    dependencies: ["T3-R review PASS"]
    outputs_expected: ["Green run and fault-injection run IDs", "AC-001..006 evidence in s08", "Annotations and timing comparison"]
    verification_hint: "Push candidate and dispatch workflow. In a separate isolated probe remove required Governance Checks from the valid-default fixture and point the sample SDD SRS ref at a nonexistent probe path. Confirm the real Fixtures and SDD commands fail locally, then push/dispatch probe. Both named entries must fail, all other validators must finish, downstream smoke/build/consumers must skip. Keep commands unchanged and fault injection out of candidate branch; record additional expected failures."
    review_checkpoint: "Human QC DoD remains separate. Retain branches pending explicit cleanup authority."
```

## Verification Plan

The historical 105s baseline remains the AC-002 acceptance threshold: a green run must be strictly faster. Also compare against the current 158s run, with matching duration definitions. No estimated speedup, rerun cherry-picking, weakened threshold or post-hoc waiver counts as PASS. If the result misses 105s, report the actual FAIL/PARTIAL and return that criterion to BA without silently changing scope.

Run local YAML/structural/command-preservation checks and bounded validators before hosted execution. The pipeline-shape behavior uses RED then GREEN structural verification; T4-R exercises actual validator failure paths. Record source/runtime context, hosted annotations and scheduling effects. No new dependency, container, deployment, tag or benchmark is required by this change. Text changes require UTF-8 and whitespace checks.

## Architecture Details
```yaml
pipeline_scope: "Existing Workflow Guardrails validator scheduling only"
source_strategy:
  branch_model: "Isolated candidate worktree plus disposable fault-injection probe"
  triggers: ["Existing pull_request and push main unchanged", "Explicit workflow_dispatch on authorized candidate/probe branches"]
build_and_verify:
  stages: ["Six validator matrix entries", "Authoring smoke", "Build exact candidate once", "Consume and verify on Node 18/22"]
  cache_strategy: ["Unchanged; no cache optimization"]
  required_checks: ["All validators", "Existing smoke/build/candidate checks"]
artifact_flow:
  registry: "Existing GitHub Actions artifact store"
  artifact_types: ["workflow-bundle-candidate tarball and SHA-256"]
  tagging_strategy: ["No tag or release created"]
  provenance_controls: ["Preserve build-once upload and downstream digest checks byte-for-byte"]
promotion_flow: []
approval_controls: ["Human content acceptance recorded", "New Approach/Task Plan signatures before resume", "Separate human DoD"]
release_controls:
  pre_release: ["No release operation in scope"]
  post_release: []
rollback_controls: ["Revert isolated workflow commit; no state migration"]
pipeline_risks: ["Renamed check requirements must be rechecked", "105s threshold may not be achieved despite improvement"]
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: "Hosted branch publication/dispatch authorized by acceptance; merge, release, settings changes and cleanup excluded."
```

## Worktree and Protocol Boundary

Use `.claude/worktrees/ci-guardrails-resumption` on `docs/ci-guardrails-resumption`, based at `e5dc98a`. Multi-session work now requires isolation; no subagents are needed. Candidate/probe publishing and GitHub Actions dispatch are explicitly accepted. Retain branches after evidence collection; do not merge, delete or release.

The inherited report has an absolute `workflow_root` pointing to the canonical main checkout. The existing CLI has no relocation action. Preserve that pointer; author the approved workflow hosts canonically and keep byte-identical snapshots in the isolated delivery branch. Production YAML edits remain isolated. Use supported CLI transitions/dispositions only; never patch the report to fake relocation, approval or blocker clearance. Verify host digest equality before each transition. Only this item's canonical workflow notes may be synchronized; unrelated main changes remain untouched.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "Accepted amendment retains all six ACs and the 105s threshold."
  - "Source change confined to validator blocks plus authoring-smoke.needs."
  - "GOV-EX-002 conditional resolution accepted; record RESOLVED only after amended signatures validate."
  - "Only affected s06 gates are resealed. Spec/DoR hosts remain unchanged."
blocking_items: ["Fresh Approach/Task Plan signatures", "Signed retirement of two obsolete protocol state entries"]
owner: devops
next_action: "Human runs one prepared signing helper; agent verifies, records exception resolution and resumes through CLI."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints: ["Six exact command preservation", "Unchanged downstream artifact structures", "Green and double-failure hosted runs"]
compatibility_checkpoints: ["Current branch protection/rulesets", "Canonical/worktree host digest equality"]
migration_or_backfill_steps: []
rollback_or_restore_steps: ["Revert isolated workflow change; preserve accepted evidence and receipts"]
```

## SDD Traceability
```yaml
requirement_refs:
  - "REQ-001 -> T1-R/T3-R/T4-R"
  - "REQ-002 -> inherited upgrade owner and T2-R/T4-R evidence"
  - "REQ-003 -> T3-R/T4-R"
  - "REQ-004 -> T3-R"
acceptance_refs:
  - "AC-001 -> T4-R double-failure run"
  - "AC-002 -> 105s threshold and measured run durations"
  - "AC-003 -> new hosted annotation inspection"
  - "AC-004 -> observed downstream dependency/skip behavior"
  - "AC-005 -> one validator matrix setup contract"
  - "AC-006 -> exact before/after command comparison"
task_refs:
  - "T1-R through T4-R in Main Artifact"
test_refs:
  - "Scratch structural RED/GREEN and YAML/command comparison"
  - "Hosted green and real double-failure runs"
```

## Human Amendment Decision — 2026-10-19

The user replied **accept** to the concrete CI packet, including publishing candidate/probe branches and running GitHub Actions. Reviewer: Hao, Nguyen Huu, acting as Developer/DevOps for the plan and conditional GOV-EX-002 resolution. Decision recording time: `2026-10-19T13:21:50Z` (recording time, not a claimed chat timestamp). Acceptance does not waive ACs or authorize merge, release, global installation, repository-setting changes, branch deletion or DoD.

Normal runtime requires a signed Maintainer disposition of the exact obsolete blocker and its legacy resume follow-up before `resume`. Their retirement implements the accepted unblock decision; no unrelated state is removed. A single human-terminal helper signs Approach and Task Plan, then signs these two narrow dispositions. It refuses any unexpected host, source, report or receipt drift and never activates/implements. Content approval is complete; do not request it again.

Historical s06 is preserved at main `e5dc98a` with SHA-256 `8ab34e3773b01913361c0eb3790838794b2834deceded1b9186df67f5608b97c`; its receipts are intentionally superseded by the newly approved host. No original Spec or DoR host is altered.
