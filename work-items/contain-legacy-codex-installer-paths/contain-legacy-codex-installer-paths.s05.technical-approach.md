---
artifact_id: "contain-legacy-codex-installer-paths.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "contain-legacy-codex-installer-paths"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
  card: "product-specs/cards/contain-legacy-codex-installer-paths.md"
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "ta"
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract: []
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "contain-legacy-codex-installer-paths.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 — Technical Approach

> [!summary]
> Reviewable approach: complete native preflight, plus an isolated source-bound hosted integration matrix. No implementation gate is opened.

## Step Contract

```yaml
step: "s05"
step_goal: "Describe the minimum local containment approach without claiming readiness."
input_summary:
  - "Accepted parent containment scope and three verified Maintainer admission dispositions."
  - "Existing scripts at main 5a81126; user-selected Windows CI and the proposed source-bound fixture contract."
output_summary:
  - "Concrete draft artifact with owner, evidence and remaining gates."
done_when:
  - "The draft is reviewable and its missing inputs are explicit; this does not mean the human gate passed."
owner: "developer"
constraints:
  - "No production/test implementation, installer execution or signing by the agent."
timebox: "One authoring pass; unresolved external verification input remains explicit."
```

## Option Analysis

```yaml
options:
  - "A: native preflight in each direct script; preserves direct entry points and existing packaging."
  - "B: retire direct routes; expands into wrapper and P-PUBLIC documentation ownership."
  - "C: delegate to central wfc; adds a runtime/dependency contract to standalone scripts."
  - "D: only validate stale deletion immediately before rm/Remove-Item; leaves earlier writes and replacement hazards."
recommended_option: "A"
trade_offs:
  - "Some validation is duplicated across languages; common behavioral fixtures must keep them aligned."
  - "Reject unsafe aliases instead of inventing safe traversal through them."
  - "The standalone integration file is invoked only by its dedicated workflow; the normal unit runner remains read-only with respect to this destructive fixture."
```

## Foundation Decision

```yaml
status: "NOT_APPLICABLE"
solution_class: "Existing standalone installer scripts"
selected_stack: []
selected_runtime: []
decision_notes:
  - "No stack/runtime redesign or deployment baseline change."
```

## Main Artifact

```yaml
design_problem: "Stop malformed state from influencing destructive or in-place writes outside intended managed targets."
business_rule_trace:
  - "REQ-PI-001..004"
  - "AC-PI-001..006"
recommended_design: "A: parse, validate, inspect and freeze a complete read-only operation plan, then execute only validated literal targets."
recommendation_reason: "Fits the proposed four-path scope without a new runtime abstraction or install option."
component_changes:
  - "Bash: move directory creation and policy copy after manifest/source/topology preflight."
  - "PowerShell: inspect raw entries before Sort-Object -Unique; defer New-Item/Copy-Item; use literal operations after validation."
data_flow:
  - "Read source inventory and selected manifest without mutation."
  - "Validate complete raw names, portable grammar, reserved forms and uniqueness."
  - "Resolve physical root; validate all intended writes/deletes, types, links/reparse points and in-place output inode safety without following aliases."
  - "Freeze names/paths/actions; execute plan in existing semantic order; write selected current manifest last."
interface_changes:
  - "No new installation parameter; existing direct calls remain. Unsafe names/topology become explicit failures as detailed in the draft spec."
failure_modes:
  - scenario: "Invalid final entry after valid names"
    impact: "Earlier mutation would violate the zero-write contract"
    guardrail: "Validate every input before entering mutation phase."
  - scenario: "Alias within a recursively removed subtree"
    impact: "Recursive platform behavior may escape the intended boundary"
    guardrail: "Reject alias/reparse nodes during non-following inspection before any delete."
  - scenario: "Hard-linked policy/manifest destination"
    impact: "In-place overwrite may change external data"
    guardrail: "Reject detected multi-link output regular files or revise the replacement design with evidence."
  - scenario: "Concurrent hostile replacement after preflight"
    impact: "Time-of-check/time-of-use guarantee is absent"
    guardrail: "Explicitly excluded threat model; broaden design before claiming resistance."
  - scenario: "I/O error after valid preflight"
    impact: "Partial valid installation remains possible"
    guardrail: "Nonzero error and clear operation context; no transactional rollback promise."
compatibility_impact:
  - "product-specs/cards/contain-legacy-codex-installer-paths.md#Input and Compatibility Contract"
rollback_impact:
  - "Source revert only; preserve installed state; no unsafe reinstall to demonstrate rollback."
observability_hooks:
  - "Nonzero exit and stable input/category context before mutation; successful installer output remains usable."
constraints_applied:
  - "Four delivery paths: two installer scripts, one standalone integration runner, one dedicated workflow; no central runtime or installer destination option."
validation_plan:
  - "Execute the spec fixture matrix through the exact CI Verification Contract below; require all final platform jobs on one tested source SHA."
specialized_followups: []
notes_for_next_step: "s06 task ordering owns RED before production repair and final source/evidence reconciliation."
```

## Architecture Details

```yaml
domain_boundaries:
  - "Direct adapter scripts only; central wfc unchanged."
integration_points:
  - "Current/legacy local manifests and canonical source skills."
data_or_runtime_notes:
  - "No database or deployment. New isolated CI verification workflow is the user-selected environment; no container provisioning is needed."
ci_cd_release:
  pipeline_scope: "Pre-merge verification only"
  source_strategy:
    branch_model: "Existing isolated fix branch; separate PR integration after child DoD"
    triggers:
      - "push on fix/legacy-codex-installer-containment (supports pre-merge RED without default-branch workflow registration)"
      - "pull_request for the four delivery paths"
  build_and_verify:
    stages:
      - "Checkout exact event SHA with persisted credentials disabled"
      - "Setup Node 22 and preflight exact native engine/runner"
      - "Run fixture safety checks then integration matrix"
      - "Upload scoped evidence even on failure"
    cache_strategy:
      - "No caches for profiles or fixtures"
    required_checks:
      - "windows-powershell51"
      - "linux-bash"
      - "macos-bash"
  artifact_flow:
    registry: "No registry; scoped GitHub workflow evidence artifacts only"
    artifact_types:
      - "JSON summaries and case logs"
    tagging_strategy:
      - "No release tag; names bind tested SHA/run ID/attempt/platform"
    provenance_controls:
      - "Record source/workflow/script hashes and action run URLs; require same final commit across all jobs"
  promotion_flow: []
  approval_controls:
    - "Work-item/Spec/DoR/Approach/Task Plan before test/workflow implementation"
    - "contents:read only; no secrets, deployment environment or pull_request_target"
    - "No branch-protection edits; QC explicitly checks all three jobs at final verify"
    - "Pin new action references to reviewed immutable upstream SHAs during T1; record versions and avoid inheriting new versions without review"
  release_controls:
    pre_release:
      - "Not applicable: no packaging/publication/deployment"
    post_release: []
  rollback_controls:
    - "Revert the reviewed source/workflow delta; do not run an unsafe legacy installer on a real profile"
  pipeline_risks:
    - "Runner images drift; assert actual versions/capabilities and retain provenance"
    - "Pre-existing managed home causes an intentional preflight failure"
    - "Local or self-hosted execution is refused"
  pipeline_recommendation: "READY_WITH_GUARDS"
  notes_for_implementation_or_ops: "Reviewable design only; do not publish workflow or run hosted jobs before authoring approval/activation."
```

## Brownfield Impact Analysis

```yaml
impacted_modules:
  - "Direct Bash and PowerShell installer behavior."
compatibility_risks:
  - "Existing custom names, destination aliases and manifest quirks; compare against the explicit card contract."
migration_notes:
  - "No backfill; legacy manifest fallback retained."
rollback_notes:
  - "Revert source/test delta with reviewed state; never delete user files to simulate restoration."
```

## Traceability

```yaml
spec_ref: "product-specs/cards/contain-legacy-codex-installer-paths.md"
next_step: "s06 after Approach"
```

## Handoff

Review packet only. Lifecycle remains MATERIALIZED/s01 with no implementation grants. Environment selection and the proposed isolation plan are now concrete; request the work-item and authoring gates. No gate is self-approved.

## CI Verification Contract

```yaml
workflow_path: ".github/workflows/legacy-installer-containment.yml"
test_path: "packages/workflow-bundle/test/legacy-installer-containment.integration.js"
source_basis: "User selected option 1 (Windows GitHub Actions), then instructed continuation, recorded 2026-10-13T07:54:18Z; authoring approvals remain pending."
jobs:
  - id: "windows-powershell51"
    runner: "windows-2022"
    shell: "powershell"
    engine: "Resolve powershell.exe; require PSEdition Desktop and version 5.1 before any fixture write."
    command: "node packages/workflow-bundle/test/legacy-installer-containment.integration.js --engine powershell51 --ci-disposable --evidence-dir .artifacts/installer-containment/windows"
  - id: "linux-bash"
    runner: "ubuntu-24.04"
    shell: "bash"
    engine: "Resolve /bin/bash; record version."
    command: "node packages/workflow-bundle/test/legacy-installer-containment.integration.js --engine bash --ci-disposable --evidence-dir .artifacts/installer-containment/linux"
  - id: "macos-bash"
    runner: "macos-14"
    shell: "bash"
    engine: "Invoke /bin/bash explicitly; require stock Bash 3.2 for the existing macOS entry point."
    command: "node packages/workflow-bundle/test/legacy-installer-containment.integration.js --engine bash --ci-disposable --evidence-dir .artifacts/installer-containment/macos"
ci_limits: "Three independent hosted jobs, maximum 15 minutes each, fail-fast disabled so one platform failure does not suppress other evidence. No self-hosted runner, shared profile, environment credentials or caches."
execution_contract:
  - "Require explicit --ci-disposable, GITHUB_ACTIONS=true, RUNNER_ENVIRONMENT=github-hosted, platform match and engine preflight. Without these, fail before mutation; this script is not matched by run-all.js test/*.test.js discovery."
  - "Do not redefine HOME, home, CODEX_HOME or the operating-system profile. Use the fresh job VM account native home as the disposable target; compare Node/native shell home observations and reject mismatches."
  - "Before fixture setup, lstat the managed .codex root. Require absence, with no symlink or dangling alias; if pre-existing, abort the job without removing it. Confirm all fixture/control roots and their parents are ordinary directories."
  - "Copy the unchanged candidate installer bytes into a minimal synthetic repository under RUNNER_TEMP, preserving adapters/codex placement and dummy policies/skills. Hash the executed script against checkout source; invoke the normal Bash or PowerShell -NoProfile -File entry point; no destination parameter or transformed installer source."
  - "Create fixture-owned .codex content plus unique outside/unmanaged sentinels only in the disposable account/temporary roots. Never use system-root, actual user-data or remote-network targets as malicious inputs; rooted/drive negative cases must point only at designated local fixture endpoints. UNC syntax is checked at the lexical validator boundary without filesystem access; do not execute a legacy installer against UNC targets. The integration runner may load only the pure validation function for these cases, with no installer entry-point execution."
  - "Before invoking a legacy RED candidate, resolve the expected cleanup endpoints and alias targets in the harness and assert membership in the fixture-owned set; refuse a case that could target anything else. A setup/permission/network/engine failure is not a valid RED observation."
  - "Execute cases sequentially in each job; compare before/after node inventories, regular-file hashes, link counts and alias targets without following symlinks/reparse points. Failure is nonzero and records the affected case."
  - "Reset only marker-owned paths with no-follow cleanup and recheck canonical containment; never recursively remove an unknown home subtree. On ambiguous ownership, stop and let the hosted VM be discarded. Do not enable optional drive-root links."
  - "Require successful setup of Windows symlink/junction and hard-link fixtures before claiming coverage; missing privilege/capability fails the job. Record runtime/image versions rather than assuming a label guarantees them."
evidence_contract:
  - "Each job writes a machine-readable summary and case logs with head/source/workflow SHA, run ID/attempt, engine/OS/image versions, script hash, case inventory, exit codes, before/after hashes and unexecuted cases."
  - "Upload only the designated evidence directory on success or failure, retention 14 days, artifact name includes platform, full tested SHA, run ID and attempt. Never upload home contents, credentials or unrelated files."
  - "A job can PASS only with its complete expected case inventory; a missing engine, skipped mandatory case, empty summary or absent artifact is a verification failure."
  - "Capture a real focused RED test commit before production repair and later GREEN commits. All three final jobs must pass for the same final commit; aggregate their direct evidence in s08."
```

## CI Source References

Checked on 2026-10-13: [GitHub-hosted runner reference](https://docs.github.com/en/actions/reference/runners/github-hosted-runners) lists the selected labels and fresh-VM model. [Workflow shell syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsshell) distinguishes `powershell` (Desktop) from the default `pwsh`. These support the proposed environment; they do not prove this repository has executed a job or that a future image passes its runtime assertions.
