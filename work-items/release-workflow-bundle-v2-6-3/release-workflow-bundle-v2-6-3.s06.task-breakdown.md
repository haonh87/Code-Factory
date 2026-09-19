---
artifact_id: "release-workflow-bundle-v2-6-3.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-3"
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
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CHANGE-007"
change_status: approved
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "developer"
  - "qc"
  - "devops"
review_mode: independent
verification_owner: "qc"
artifact_shape: adaptive_v1
request_lane: product_delivery
workflow_required: true
routing_reasons:
  - "LANE_PRODUCT_DELIVERY"
escalation_reasons:
  - "HARD_RELEASE"
role_reasons:
  po: ["ROLE_PO_PRODUCT_OUTCOME"]
  ba: ["ROLE_BA_REQUIREMENTS"]
  developer: ["ROLE_DEVELOPER_DELIVERY"]
  qc: ["ROLE_QC_VERIFICATION"]
  devops: ["ROLE_DEVOPS_RELEASE"]
gate_reasons:
  spec: ["GATE_SPEC_PRODUCT_DELIVERY"]
  dor: ["GATE_DOR_PRODUCT_DELIVERY"]
  approach: ["GATE_APPROACH_PRODUCT_DELIVERY"]
  task_plan: ["GATE_TASK_PLAN_PRODUCT_DELIVERY"]
  dod: ["GATE_DOD_PRODUCT_DELIVERY"]
  release: ["GATE_RELEASE_PUBLICATION"]
  business_acceptance:
    - "GATE_BUSINESS_ACCEPTANCE_PRODUCT_OUTCOME"
    - "GATE_BUSINESS_ACCEPTANCE_RELEASE_OUTCOME"
adaptive_activation:
  source_version: "2.6.2"
  installed_versions: ["2.6.2"]
  parity_passed: true
approval_gates:
  spec: "required"
  contract: "not_applicable"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
  dod: "required"
role_signoffs:
  spec: ["ba"]
  dor: ["ba","qc"]
  approach: ["developer"]
  task_plan: ["developer"]
  dod: ["qc"]
  release: ["devops","qc"]
  business_acceptance: ["po"]
gate_reviews:
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-09-19T09:10:05Z"
  dor_reviewed_by: ["ba","qc"]
  dor_reviewed_at: "2026-09-19T09:10:06Z"
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-09-19T10:34:59Z"
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-09-19T14:24:49Z"
  dod_reviewed_by: []
  dod_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "task-breakdown-planner"
  - "worktree-discipline"
  - "review-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "ci-cd-release"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "release-workflow-bundle-v2-6-3.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Developer approved this ordered plan and bounded amendment T5a: lock the baseline, drive version and rollback contracts red first, prepare only approved release surfaces, rebind the three stale v2.6.2 regression expectations discovered by T5, verify and review the branch, merge only after QC DoD, bind the authoritative candidate to the post-merge `main` run, then publish the exact bytes through npm staging and GitHub before promoting `latest`. The amended trusted receipt and protocol resume remain separate actions; approval does not authorize public mutation.

## Step Contract
```yaml
step: "s06 Task Plan"
step_goal: "Produce an execution-oriented v2.6.3 release plan whose owned paths, TDD order, independent reviews, exact-candidate handoffs, publication gates, rollback controls, and cleanup conditions are explicit."
input_summary:
  - "Approved s04 Spec and DoR for AC-R263-01..13 and EC-R263-01..07."
  - "Approved s05 Option A using one post-merge main artifact."
  - "Baseline source 3204749e9fac592e9f38e327dbd85a87b84b2325 and immutable v2.6.2 rollback SHA-256 af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f."
output_summary:
  - "Fourteen ordered release tasks plus bounded recovery task T5a, with exact paths, dependencies, outputs, review checkpoints, and verification hints."
  - "Required worktree, TDD, two-tier review, main candidate binding, staged publication, rollback, and finalization plans."
  - "Traceability from every acceptance-criteria group to an execution checkpoint."
done_when:
  - "Every task names an owner, objective, paths, dependency, expected output, review checkpoint, and verify path."
  - "Release preparation, s08 verification, Release, publication, Business Acceptance, and cleanup are separate boundaries."
  - "No task permits a PR artifact, rebuilt tarball, inferred approval, historical mutation, or premature public state change."
  - "The draft is validated and presented for Developer approval without opening s07."
owner: "developer"
```

## Artifact Chính
```yaml
implementation_goal: "Advance only approved active release surfaces to v2.6.3, prove the release contract fail-first, preserve all historical releases, and publish exactly one artifact built by the final main source after all candidate-specific gates pass."
ba_lane:
  acceptance_coverage:
    - "AC-R263-01..03: release-only delta, active/historical ownership, and complete packaged-delta release note."
    - "AC-R263-04..08: one artifact, local/hosted verification, five candidate modes, and five v2.6.2 rollback modes."
    - "AC-R263-09..12: authority preflight, independent gates, staged cross-channel publication, and consistent public identity."
    - "AC-R263-13: PO evaluates the published GitHub/npm candidate, not a local or PR substitute."
  scope_guards:
    - "No new bundle behavior beyond baseline 3204749e and no validator parallelisation or unrelated CI restructuring."
    - "Historical release records v2.0.0 through v2.6.2 are read-only and retain their pre-change SHA-256 values."
    - "The v2.6.3 note covers the complete packaged delta from v2.6.2 and classifies workflow-only history separately."
    - "Public mutation is forbidden until exact-main QC DoD and DevOps+QC Release receipts pass."
  human_review_points:
    - "Developer approves Task Plan before s07 activation."
    - "Developer approves T5a and the amended Task Plan receipt must match before the blocked s07 path resumes."
    - "QC Spec Compliance precedes Developer+QC Code Quality for every s07 batch."
    - "QC approves branch DoD before merge and refreshes verification/DoD for the exact main binding."
    - "DevOps+QC approve Release before publication; PO approves Business Acceptance afterward."
dev_lane:
  owned_paths:
    - "workflow-bundle.manifest.json"
    - "packages/workflow-bundle/workflow-bundle.manifest.json"
    - "packages/workflow-bundle/package.json"
    - "packages/workflow-bundle/bin/wfc.js"
    - ".claude/CLAUDE.md"
    - "README.md"
    - "README.vi.md"
    - "docs/publish-surface.md"
    - "docs/publish-surface.vi.md"
    - "docs/workflow-bundle-quickstart.md"
    - "docs/workflow-bundle-quickstart.vi.md"
    - "docs/workflow-docs-map.md"
    - "docs/workflow-docs-map.vi.md"
    - "packages/workflow-bundle/README.md"
    - "packages/workflow-bundle/README.vi.md"
    - "docs/releases/workflow-bundle-v2.6.3.md"
    - "packages/workflow-bundle/test/release-surface.test.js"
    - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
    - "packages/workflow-bundle/test/materialize-work-item.test.js"
    - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
    - "packages/workflow-bundle/test/release-install-all-smoke.test.js"
    - "work-items/release-workflow-bundle-v2-6-3/**"
  read_only_validation_surfaces:
    - ".github/workflows/workflow-guardrails.yml"
    - "packages/workflow-bundle/runtime/**; build commands may rewrite deterministically, but any retained diff is blocking."
    - "docs/releases/workflow-bundle-v2.0.0.md through docs/releases/workflow-bundle-v2.6.2.md"
  technical_sequence:
    - "T0 baseline -> T1 failing contracts -> T2 version bump -> T3 active docs/full record -> T4 targeted green tests."
    - "T5 local verification finding -> T5a bounded regression-test rebind and sequential rerun -> T6 independent review -> T7 PR evidence -> T8 branch DoD and merge."
    - "T9 main artifact/matrices -> T10 QC rebind -> T11 preflight/Release -> T12 staged publish -> T13 acceptance/finalize."
  tdd_targets:
    - "release-surface.test.js first fails because active surfaces are still 2.6.2 while the contract expects 2.6.3 and freezes v2.6.2 history."
    - "release-rollback-smoke.test.js first fails because source still represents 2.6.2 -> 2.6.1 while the contract expects 2.6.3 -> 2.6.2."
    - "Record expected red reasons before T2; unrelated failures stop implementation."
    - "T5 independently reproduced three unchanged v2.6.2 expectations; T5a may change only those version expectations plus the candidate temp-prefix label before focused and full GREEN reruns."
task_breakdown:
  - id: "T0"
    owner_role: "developer"
    name: "Lock isolated baseline and release inventory"
    objective: "Confirm worktree, ancestry, clean state, active/historical ownership, and immutable rollback evidence before production edits."
    paths_in_scope:
      - ".claude/worktrees/release-workflow-bundle-v2-6-3"
      - "work-items/release-workflow-bundle-v2-6-3/**"
      - "docs/releases/workflow-bundle-v2.0.0.md through v2.6.2 (read-only hash inventory)"
    dependencies: []
    outputs_expected:
      - "Recorded branch/worktree, baseline 3204749e ancestry, and tracked-file inventory."
      - "Active, historical, test-contract, new-record, and governance path classifications."
      - "Historical SHA-256 inventory and confirmed v2.6.2 rollback digest af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f."
    review_checkpoint: "Every prospective changed path is approved release preparation; all historical paths are read-only."
    verification_hint: "Use git status/diff/merge-base, git ls-files, SHA-256 inventory, package metadata, and baseline release tests; record exact outputs in s07."
  - id: "T1"
    owner_role: "developer"
    name: "Write failing v2.6.3 release and rollback contracts"
    objective: "Express the desired active version, immutable historical set, exact rollback identity, and candidate/rollback behavior before changing release surfaces."
    paths_in_scope:
      - "packages/workflow-bundle/test/release-surface.test.js"
      - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
    dependencies: ["T0"]
    outputs_expected:
      - "Release expectations target v2.6.3, freeze v2.6.2 history, and reject stale or premature-public claims."
      - "Rollback targets v2.6.3 -> exact v2.6.2 and asserts behavior derived from the packaged delta."
      - "Both tests fail before implementation for intended old-state reasons; red evidence is recorded."
    review_checkpoint: "SPEC_COMPLIANCE: AC-R263-02/03/08 without weakening history. CODE_QUALITY: constants are explicit and failures identify the mismatched surface."
    verification_hint: "Run each test independently before T2; classify every failure and stop on unrelated failure."
  - id: "T2"
    owner_role: "developer"
    name: "Apply the structured version bump"
    objective: "Advance exactly four structured version surfaces to 2.6.3 with the existing utility and capture its release-note stub for replacement."
    paths_in_scope:
      - "workflow-bundle.manifest.json"
      - "packages/workflow-bundle/workflow-bundle.manifest.json"
      - "packages/workflow-bundle/package.json"
      - "packages/workflow-bundle/bin/wfc.js"
      - "docs/releases/workflow-bundle-v2.6.3.md"
    dependencies: ["T1"]
    outputs_expected:
      - "Both manifests, package version, and CLI flow label identify 2.6.3."
      - "The bump changes no unapproved path and creates only the expected note stub."
    review_checkpoint: "Compare command output and diff to the five-path expectation; any additional path or behavior change stops the batch."
    verification_hint: "Run npm run bump-version -- 2.6.3 once, inspect fields/help, then enforce the expected git diff name set."
  - id: "T3"
    owner_role: "developer"
    name: "Update active bilingual surfaces and full-delta record"
    objective: "Move all current release-facing docs to v2.6.3 and replace the stub with an accurate complete packaged-delta release record."
    paths_in_scope:
      - ".claude/CLAUDE.md"
      - "README.md"
      - "README.vi.md"
      - "docs/publish-surface.md"
      - "docs/publish-surface.vi.md"
      - "docs/workflow-bundle-quickstart.md"
      - "docs/workflow-bundle-quickstart.vi.md"
      - "docs/workflow-docs-map.md"
      - "docs/workflow-docs-map.vi.md"
      - "packages/workflow-bundle/README.md"
      - "packages/workflow-bundle/README.vi.md"
      - "docs/releases/workflow-bundle-v2.6.3.md"
    dependencies: ["T2"]
    outputs_expected:
      - "Zero stale 2.6.2 current claims and zero false claims that v2.6.3 is public."
      - "English/Vietnamese surfaces stay aligned and UTF-8 valid."
      - "Release note maps the full packaged delta, separates internal-only history, and has compatibility, limitations, verification, rollback, and gates with no placeholder/generated branch claim."
      - "All older release records remain byte-identical."
    review_checkpoint: "BA checks full-delta scope; QC checks historical hashes and unpublished-state wording."
    verification_hint: "Run version searches, bilingual checks, UTF-8 decode, placeholder scan, historical hash comparison, and release-surface diagnostics."
  - id: "T4"
    owner_role: "developer"
    name: "Close the targeted red-green cycle"
    objective: "Prove contracts pass only after T2/T3 and preserve the exact v2.6.2 boundary."
    paths_in_scope:
      - "packages/workflow-bundle/test/release-surface.test.js"
      - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
      - "approved T2/T3 surfaces"
    dependencies: ["T2", "T3"]
    outputs_expected:
      - "Both targeted source-mode tests pass."
      - "No assertion deletion or broad relaxation was used to turn red green."
      - "Historical v2.6.2 and rollback digest locks remain explicit."
    review_checkpoint: "Review the red-to-green delta before broader checks; reduced coverage is blocking."
    verification_hint: "Re-run both tests, compare assertions with T1, and run git diff --check plus path-boundary inspection."
  - id: "T5"
    owner_role: "developer"
    name: "Run integrated local release verification"
    objective: "Establish local correctness, packaging parity, encoding, and non-authoritative candidate/rollback rehearsal before review."
    paths_in_scope:
      - "all approved release-preparation paths"
      - "packages/workflow-bundle/runtime/** (verification-generated only; retained diff forbidden)"
      - "work-items/release-workflow-bundle-v2-6-3/**"
    dependencies: ["T4"]
    outputs_expected:
      - "Runtime sync, full tests, fixtures, workflow validators, pack audit, bundle/candidate smoke, release contracts, YAML, secret/network, and UTF-8 checks pass."
      - "Local tarball is labeled pre-host evidence; version, contents, counts, and digest are recorded without release authority."
      - "Exact local candidate and retained v2.6.2 artifacts rehearse CLI plus Codex/Claude global/project modes."
      - "No unexpected runtime diff remains."
    review_checkpoint: "QC receives raw evidence, scan gaps, identities, and a clean approved-scope diff."
    verification_hint: "Run package.json verification scripts and exact-artifact smoke in isolated temp homes; compare diff and historical hashes to T0."
  - id: "T5a"
    owner_role: "developer"
    name: "Rebind stale release regression expectations and complete T5"
    objective: "Resolve F-R263-T5-001 with the smallest test-only delta, then rerun integrated verification sequentially without changing production behavior or rollback identity."
    paths_in_scope:
      - "packages/workflow-bundle/test/materialize-work-item.test.js"
      - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
      - "packages/workflow-bundle/test/release-install-all-smoke.test.js"
      - "work-items/release-workflow-bundle-v2-6-3/**"
    dependencies: ["T5"]
    outputs_expected:
      - "Telemetry runtime-version expectation advances from 2.6.2 to 2.6.3."
      - "Candidate source/installed expectation and diagnostic temp prefix advance from 2.6.2 to 2.6.3."
      - "Install-all source expectation advances from 2.6.2 to 2.6.3."
      - "The three focused tests and full unit suite pass; local candidate and immutable v2.6.2 artifact rehearse exact rollback in isolated Codex/Claude global/project homes."
      - "Runtime writers are serialized and no generated runtime diff remains."
    review_checkpoint: "Compare the patch to the three recorded RED failures; any production edit, assertion removal, rollback change, new path, or broad relaxation is blocking."
    verification_hint: "Run node --check and each amended test, then rerun T5 sequentially, record candidate and rollback digests, inspect tarball contents, and enforce clean runtime/approved-path diffs."
  - id: "T6"
    owner_role: "qc"
    name: "Perform independent two-tier s07 review"
    objective: "Review each risk boundary in Spec Compliance -> Code Quality order before hosted verification."
    paths_in_scope:
      - "B1: metadata and release/rollback contracts"
      - "B2: active bilingual docs and v2.6.3 release note"
      - "B3: integrated release-only delta, local evidence, and historical hashes"
    dependencies: ["T5a"]
    outputs_expected:
      - "For B1/B2/B3, QC Spec Compliance precedes Developer+QC Code Quality."
      - "Every finding has ID, severity, owner, source, disposition, and reopen condition."
      - "No open blocker or unrecorded drift remains."
    review_checkpoint: "B1 and B2 pass before B3; Code Quality cannot compensate for failed Spec Compliance."
    verification_hint: "Compare batches to AC-R263 and owned paths, then inspect maintainability, assertions, error clarity, secrets, and operator safety."
  - id: "T7"
    owner_role: "developer"
    name: "Freeze branch candidate and collect PR evidence"
    objective: "Commit only approved paths, open/update the PR, and prove existing Workflow Guardrails passes without workflow edits."
    paths_in_scope:
      - "approved release-preparation paths"
      - "work-items/release-workflow-bundle-v2-6-3/**"
      - ".github/workflows/workflow-guardrails.yml (read-only)"
    dependencies: ["T6"]
    outputs_expected:
      - "Final reviewed branch SHA and clean worktree."
      - "All PR checks and Node 18/22 consumers pass with no unresolved annotation."
      - "PR artifact identity is recorded as pre-merge evidence only and cannot be published."
    review_checkpoint: "QC reopens s07 for any source/evidence change after review."
    verification_hint: "Inspect PR checks, jobs, annotations, and downloaded artifact; compare final diff to T0/B3."
  - id: "T8"
    owner_role: "qc"
    name: "Complete branch Technical Verification and DoD, then merge"
    objective: "Conclude branch s08 and allow merge only after QC DoD while Release and publication remain closed."
    paths_in_scope:
      - "release-workflow-bundle-v2-6-3.s08.verification.md"
      - "trusted QC DoD receipt"
      - "release PR and branch"
    dependencies: ["T7"]
    outputs_expected:
      - "Technical Verification records coverage, compatibility, scan gaps, risks, and PR artifact pre-merge status."
      - "QC DoD binds the reviewed branch note; later gates stay independent."
      - "Branch merges to main without edit drift; cleanup stays deferred."
    review_checkpoint: "Branch-finish audit requires DoD PASS, no finding, and exact reviewed head before merge."
    verification_hint: "Validate receipt digest, PR head/merge identity, required checks, and ancestry; do not tag or publish."
  - id: "T9"
    owner_role: "qc"
    name: "Bind and exercise authoritative main candidate"
    objective: "Use the first qualifying final-main run artifact as the sole release candidate and prove candidate plus rollback compatibility without rebuild."
    paths_in_scope:
      - "main Workflow Guardrails run and downloaded candidate"
      - "retained workflow-bundle-2.6.2.tgz"
      - "trusted verification evidence"
    dependencies: ["T8"]
    outputs_expected:
      - "Full source SHA, run ID, job/annotation results, filename, size, version, and candidate SHA-256."
      - "Five candidate modes report 2.6.3 and pass parity/unmanaged-file checks."
      - "Five rollback modes use exact af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f, report 2.6.2, and record functional/timing evidence separately."
      - "Any main move, failure, annotation, digest mismatch, or rebuild invalidates binding."
    review_checkpoint: "QC confirms main-push event, intended tag target, build-once artifact, and equal downstream bytes."
    verification_hint: "Download/verify artifact, inspect payload, run exact candidate and rollback matrices in isolated homes, and compare all five modes."
  - id: "T10"
    owner_role: "qc"
    name: "Refresh exact-candidate Technical Verification and DoD"
    objective: "Replace pre-merge authority with an explicit QC conclusion for the exact main source/run/digest."
    paths_in_scope:
      - "trusted Technical Verification evidence"
      - "trusted QC DoD receipt"
      - "work item only if correction is required; any tracked edit forces a new main run"
    dependencies: ["T9"]
    outputs_expected:
      - "QC names exact source, run, digest, AC-R263-01..10 coverage, scan gaps, rollback, and risks."
      - "QC DoD is refreshed; no tracked edit occurs after binding unless T9/T10 repeat."
      - "Release and publication remain closed."
    review_checkpoint: "Identity drift or tracked correction invalidates the conclusion and returns to T9."
    verification_hint: "Check receipt status/digest, identities, coverage, findings/exceptions, and retained candidate."
  - id: "T11"
    owner_role: "devops"
    name: "Run authority/collision preflight and obtain Release approval"
    objective: "Prove GitHub/npm principals, permissions, collision-free identity, latest protection, and rollback readiness without publishing."
    paths_in_scope:
      - "GitHub auth/tag/release/permissions (read-only)"
      - "npm identity/version/dist-tags (read-only)"
      - "trusted DevOps+QC Release receipt"
    dependencies: ["T10"]
    outputs_expected:
      - "Authenticated principals/permissions recorded without secrets."
      - "No v2.6.3 collision and npm latest remains 2.6.2."
      - "Rollback and partial-state recovery commands are ready."
      - "DevOps+QC approve Release for exact T9 identity; approval does not publish."
    review_checkpoint: "Auth/collision/latest/main/candidate/receipt drift blocks publication."
    verification_hint: "Use read-only gh/npm/git queries immediately before Release, then verify receipt binding."
  - id: "T12"
    owner_role: "devops"
    name: "Publish frozen candidate through staged sequence"
    objective: "Create public v2.6.3 identities from approved bytes and move latest only after cross-channel equality."
    paths_in_scope:
      - "npm workflow-bundle@2.6.3 and candidate-2-6-3/latest tags"
      - "annotated Git tag v2.6.3"
      - "GitHub Release v2.6.3 and tarball/checksum assets"
    dependencies: ["T11"]
    outputs_expected:
      - "Frozen tarball publishes under candidate-2-6-3 without rebuild; latest remains 2.6.2."
      - "Annotated tag points to approved main source and GitHub uses exact bytes."
      - "Fresh npm/GitHub downloads match before latest moves to 2.6.3."
      - "Staging-tag disposition and partial-state retries are audited; immutable identities are never overwritten."
    review_checkpoint: "One state transition at a time; stop in the defined partial state on mismatch/failure."
    verification_hint: "Compare frozen/npm/GitHub SHA-256 and resolve tag target, package version, visibility, latest, and staging tag after each step."
  - id: "T13"
    owner_role: "po"
    name: "Verify public outcome, accept, archive, and finalize"
    objective: "Evaluate actual public v2.6.3, preserve rollback evidence, archive, and clean branch/worktree only after terminal gates."
    paths_in_scope:
      - "public npm and GitHub release surfaces"
      - "trusted PO Business Acceptance receipt"
      - "work-items/release-workflow-bundle-v2-6-3/**"
      - "release branch/worktree finalization"
    dependencies: ["T12"]
    outputs_expected:
      - "Public install smoke resolves to exact approved v2.6.3 bytes."
      - "PO acceptance names source, run, digest, public identities, compatibility/rollback, and risks."
      - "Work item/change archive is terminal with no active blocker/action."
      - "Cleanup occurs only after all terminal checks and clean-tree confirmation."
    review_checkpoint: "Branch-finish discipline rejects cleanup if any receipt, public digest, archive, or rollback evidence is missing."
    verification_hint: "Re-query public identities, run public install smoke, validate receipts/report/archive, confirm reachability and clean tree, then clean up."
dependencies_global:
  - "Strict sequence: T0 -> T1 -> T2 -> T3 -> T4 -> T5 finding -> T5a recovery/T5 completion -> T6 -> T7 -> T8 -> T9 -> T10 -> T11 -> T12 -> T13."
  - "No implementation before Developer Task Plan receipt and explicit s07 activation with approved write roots."
  - "T1 red precedes T2/T3; T6 precedes hosted handoff; T8 DoD precedes merge."
  - "T9 supersedes PR authority; T10 precedes T11 Release; T11 precedes T12 public mutation; T13 cleanup is terminal."
risk_notes:
  - "The authoritative candidate exists only after merge; PR evidence is non-releasable."
  - "A tracked correction after T9 requires a new main run and QC refresh."
  - "npm/GitHub publication is non-atomic; latest remains v2.6.2 until both downloads match."
  - "Auth, 2FA, or collision failure blocks publication without public changes."
  - "Historical version text is ownership-sensitive and must never be mass-replaced."
verification_plan:
  - "Use each task's verification_hint and record raw evidence."
  - "After amendment, serialize every command that writes generated runtime; parallel read-only checks may run only after runtime sync completes."
  - "Local checks cover tests, static/audit equivalents, pack, release contracts, candidate smoke, security heuristics, YAML, diff, and UTF-8."
  - "Hosted checks cover every guardrail job, Node 18/22 consumers, and annotations."
  - "Compatibility covers five candidate and five rollback modes with exact identities and timing."
  - "Public checks cover tag target, channel downloads, latest/staging state, and install smoke."
notes_for_implementation: "Use sequential agentic execution in the existing worktree. T5a is limited to three version expectations and one diagnostic temp-prefix label across the three added test paths. Do not delegate because every task shares one release identity and gate chain. Any further mutable root requires another approved amendment."
```

## Worktree Plan
```yaml
worktree_target: "workflow-bundle v2.6.3 release preparation and controlled finalization"
planning_track: full
risk_signals:
  - "Public release and immutable identities"
  - "Multi-session work across branch, PR, main, npm, and GitHub"
  - "High risk if PR and main artifacts are confused"
worktree_decision: REQUIRED
decision_reason:
  - "Full-track work spans source, hosted verification, merge, rebind, publication, and cleanup."
  - "Existing isolation must remain until terminal gates pass."
isolation_strategy:
  branch_name: "codex/release-workflow-bundle-v2-6-3"
  worktree_path: ".claude/worktrees/release-workflow-bundle-v2-6-3"
  owned_paths:
    - "Exact dev_lane.owned_paths; no extra production root is implied."
  expected_duration: "Multiple controlled sessions through public verification and archive."
execution_guards:
  - "Start s07 only after task_plan digest_match=true and exact write-root activation."
  - "Stop on ownership collision and preserve unrelated user changes."
  - "No merge before DoD; no cleanup before Business Acceptance/archive."
skip_reason: ""
cleanup_preconditions:
  - "DoD, Release, and Business Acceptance receipts match."
  - "v2.6.3 public identities/digests verify and v2.6.2 rollback remains available."
  - "Archive has no active blocker/action."
  - "Worktree is clean and branch reachable from main/tag history."
notes_for_implementation: "T0 verifies the existing worktree; no second worktree is created."
```

## Review Plan
```yaml
review_target: "v2.6.3 release-only source delta and candidate evidence"
planning_track: full
review_mode: INDEPENDENT
review_order: [SPEC_COMPLIANCE, CODE_QUALITY]
review_batches:
  - batch: "B1 - release identity and contracts"
    scope: ["structured metadata and CLI label", "release/rollback tests", "T5a runtime/candidate/install version expectations"]
    trigger: "T4 red-green cycle passes"
    reviewer_role: "QC for Spec Compliance; Developer and QC for Code Quality"
  - batch: "B2 - documentation and release record"
    scope: ["active EN/VI docs", "v2.6.3 note", "historical hash inventory"]
    trigger: "T5 docs, encoding, history, and local release checks pass"
    reviewer_role: "QC for Spec Compliance; Developer and QC for Code Quality"
  - batch: "B3 - integrated branch candidate"
    scope: ["complete release-only diff", "local evidence", "scan gaps and gate boundaries"]
    trigger: "B1 and B2 pass with no blocker"
    reviewer_role: "QC for Spec Compliance; Developer and QC for Code Quality"
required_checks:
  spec_compliance:
    - "Every path maps to AC-R263, approved Approach, and owned scope."
    - "No history mutation, unrelated behavior, workflow restructure, false public claim, or gate bypass."
    - "Candidate/rollback identity and PR/main authority labels are exact."
  code_quality:
    - "Assertions are specific and observed red before green."
    - "Docs are consistent, placeholder-free, UTF-8, and operationally safe."
    - "Diff is minimal, secret-free, actionable, and partial-state handling is explicit."
finding_policy:
  blocker_threshold: "Any spec drift, historical mutation, identity ambiguity, premature state, secret, required-check failure, or unverifiable rollback."
  reopen_conditions:
    - "Any reviewed source change."
    - "Any hosted blocker, identity/main/public-state drift."
    - "Any amendment or new unowned path."
handoff_to_verify:
  - "B1/B2/B3 have ordered PASS verdicts and no open blocker."
  - "Final branch source is clean, committed, and identical to review."
  - "Local manifest, hashes, pre-host digest, rollback digest, and scan gaps are available."
notes_for_implementation_or_verify: "Review is evidence, not DoD; s08 remains a separate QC gate."
```

## Verification Plan
- Before leaving s07: targeted red/green tests, runtime parity, full suite, fixtures, workflow validators, pack audit, bundle/candidate/rollback smoke, path/history checks, YAML, secret/network heuristics, `git diff --check`, and UTF-8.
- Hosted: all Workflow Guardrails jobs pass for reviewed branch and final main; Node 18/22 lanes pass and annotations have no blocker.
- Exact artifact: full source SHA, run, filename, size, candidate digest, five candidate modes, immutable rollback digest, five rollback modes, and timing.
- Public: tag target, GitHub/npm digest equality, npm `latest=2.6.3`, staging disposition, and public install smoke.
- Risk: local/PR bytes never substitute for main; a new main commit invalidates binding even if package bytes match.
- Rollout: npm `candidate-2-6-3` -> annotated GitHub `v2.6.3` -> channel digest verify -> npm `latest`; rollback returns latest/installations to immutable v2.6.2.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks:
  - id: "GOV-R263-S06-01"
    check: "Execution-oriented plan"
    result: PASS
    evidence: "T0..T13 plus bounded T5a name all task fields; 22 mutable roots and read-only validation surfaces are separated."
  - id: "GOV-R263-S06-02"
    check: "TDD for release contracts"
    result: PASS
    evidence: "T1 requires intended RED before T2/T3 and T4 closes GREEN without weakening."
  - id: "GOV-R263-S06-03"
    check: "Required worktree and safe finalization"
    result: PASS
    evidence: "Isolation remains through terminal gates and archive."
  - id: "GOV-R263-S06-04"
    check: "Early independent two-tier review"
    result: PASS
    evidence: "T6 splits B1/B2/B3 with Spec Compliance before Code Quality."
  - id: "GOV-R263-S06-05"
    check: "Dedicated compatibility, rollout, rollback, and release tasks"
    result: PASS
    evidence: "T9, T11, T12, and T13 separate these boundaries."
  - id: "GOV-R263-S06-06"
    check: "Independent human gates"
    result: PASS
    evidence: "Task Plan, DoD, Release, and Business Acceptance have distinct authority."
  - id: "GOV-R263-S06-07"
    check: "No premature implementation/publication"
    result: PASS
    evidence: "s07 awaits Developer receipt/activation; publication awaits T11 Release."
blocking_items:
  - "Developer approved T5a, but the amended trusted Task Plan receipt is not yet sealed against this artifact and the work item remains BLOCKED."
owner: "developer"
next_action: "Seal the amended Developer Task Plan trusted receipt; after digest_match=true, resume s07 with all 22 exact owned paths."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "T0 baseline/hashes; T4 targeted red-green; T5 finding; T5a focused/full local recovery; T6 review; T7/T9 hosted; T13 public smoke."
compatibility_checkpoints:
  - "Node 18/22 hosted lanes."
  - "CLI plus Codex global/project and Claude global/project candidate modes."
  - "Same five modes on immutable v2.6.2, preserving unmanaged files/modes."
  - "Legacy reports and receipt-v1 stay readable because runtime behavior is unchanged."
migration_or_backfill_steps:
  - "None; no schema, data, runtime, or installed-state migration."
rollback_or_restore_steps:
  - "Before latest: stop in audited partial state and retry with same v2.6.3 bytes."
  - "After incident: move latest to 2.6.2 and reinstall exact v2.6.2."
  - "Never overwrite either version's tag, release, npm version, asset, record, or digest."
```

## Traceability
```yaml
upstream:
  - "release-workflow-bundle-v2-6-3.s04.acceptance-criteria.md"
  - "release-workflow-bundle-v2-6-3.s05.technical-approach.md"
gate_evidence:
  spec: { status: "APPROVED", reviewed_by: "ba", artifact_sha256: "a926341a13b67266e9c9fea95c062fb387ca3698cdeb6ebdfb5098fc3f8d222b", digest_match: true }
  dor: { status: "APPROVED", reviewed_by: "qc", joint_reviewers: ["ba", "qc"], artifact_sha256: "a926341a13b67266e9c9fea95c062fb387ca3698cdeb6ebdfb5098fc3f8d222b", digest_match: true }
  approach: { status: "APPROVED", reviewed_by: "developer", artifact_sha256: "cd4e4479e668cc3c00e548fbbc780b8329b03b7620898a358e33cb25d44875c7", digest_match: true }
acceptance_to_tasks:
  - { criteria: ["AC-R263-01", "AC-R263-02", "AC-R263-03"], tasks: ["T0", "T1", "T2", "T3", "T4", "T6"] }
  - { criteria: ["AC-R263-04", "AC-R263-05", "AC-R263-06"], tasks: ["T5", "T5a", "T7", "T8", "T9", "T10"] }
  - { criteria: ["AC-R263-07", "AC-R263-08"], tasks: ["T5", "T5a", "T9", "T10"] }
  - { criteria: ["AC-R263-09", "AC-R263-10"], tasks: ["T10", "T11"] }
  - { criteria: ["AC-R263-11", "AC-R263-12"], tasks: ["T11", "T12"] }
  - { criteria: ["AC-R263-13"], tasks: ["T13"] }
edge_case_to_tasks:
  - { edge_cases: ["EC-R263-01", "EC-R263-02"], tasks: ["T11", "T12"] }
  - { edge_cases: ["EC-R263-03", "EC-R263-07"], tasks: ["T11"] }
  - { edge_cases: ["EC-R263-04"], tasks: ["T0", "T1", "T3", "T6"] }
  - { edge_cases: ["EC-R263-05"], tasks: ["T7", "T9", "T10", "T12"] }
  - { edge_cases: ["EC-R263-06"], tasks: ["T9", "T10"] }
next_step: "Seal the amended Developer Task Plan trusted receipt, then resume s07 with all 22 approved write roots"
```

## Audit
```yaml
step: "s06 Task Plan authoring"
status: PASS
checks:
  - criterion: "Executable without re-deriving the approach"
    result: PASS
    evidence: "T0..T13 plus T5a lock sequence, 22 paths, dependencies, outputs, reviewers, and verification."
  - criterion: "Fail-first behavior"
    result: PASS
    evidence: "T1 RED precedes T2/T3; T4 closes GREEN."
  - criterion: "Isolation and early review"
    result: PASS
    evidence: "Worktree is REQUIRED and T6 defines B1/B2/B3 before hosted handoff."
  - criterion: "Exact authority and gate sequence"
    result: PASS
    evidence: "T7 PR is pre-merge; T9 main binds; T10 QC refreshes; T11 gates Release; T12 publishes."
  - criterion: "Compatibility, rollback, rollout, cleanup"
    result: PASS
    evidence: "T9/T12/T13 and Brownfield plan cover all five modes, immutable rollback, partial states, archive, and cleanup."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "One focused planning pass after exact Approach receipt verification."
gaps: []
risk_level: HIGH
next_action: "Seal the amended Developer Task Plan trusted receipt; do not resume s07 before digest_match=true."
authority_boundary: "Audit PASS does not approve Task Plan, implementation, DoD, Release, publication, acceptance, merge, or cleanup."
```

## Handoff
- Recovery task after resume: T5a applies only the approved three-test version rebind and completes T5 sequential verification.
- Blocker: Developer approved T5a; the amended trusted `task_plan` receipt must still be sealed with `digest_match=true`.
- s07 condition: explicit resume grants only the 22 `dev_lane.owned_paths`; validation surfaces remain read-only.
- Release boundary: no tag/npm/GitHub Release/latest before T10 QC DoD and T11 DevOps+QC Release for exact main candidate.
- Cleanup boundary: no finalization before T13 public verification, PO Business Acceptance, terminal archive, and clean tree.

## Human Approval Record
```yaml
decision: "APPROVED"
gate: "task_plan"
reviewed_by: ["developer"]
reviewed_at: "2026-09-19T14:24:49Z"
decision_source: "User explicitly approved Task Plan amendment T5a, adding exactly materialize-work-item.test.js, release-candidate-artifact-smoke.test.js, and release-install-all-smoke.test.js to the original 19 owned paths."
authority_boundary: "Approves only the s06 Task Plan; s07 activation, implementation reviews, DoD, merge, Release, publication, Business Acceptance, archive, and cleanup remain separate."
```
