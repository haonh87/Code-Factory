---
artifact_id: "release-workflow-bundle-v2-6-3.s07.implementation"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-3"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: CHANGE
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
  task_plan_reviewed_at: "2026-09-19T13:50:54Z"
  dod_reviewed_by: []
  dod_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "testing"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "release-workflow-bundle-v2-6-3.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> s07 is ACTIVE with the exact 19-path grant. T0 baseline/worktree isolation and T1 fail-first contracts are complete: both approved tests are RED only because current surfaces still represent v2.6.2 and the old rollback. Historical hashes remain intact. T2 structured version bump is next; no release publication has occurred.

## Step Contract
```yaml
step: "s07 Implement"
step_goal: "Prepare the approved v2.6.3 release-only delta with fail-first contracts, minimal active-surface edits, exact provenance, and early independent review evidence."
input_summary:
  - "Approved s04 Spec/DoR, s05 Approach, and s06 Task Plan trusted receipts all match."
  - "Work item is ACTIVE at s07 with 19 granted write paths."
  - "T0 baseline source is origin/main 3204749e9fac592e9f38e327dbd85a87b84b2325."
output_summary:
  - "T0 baseline, isolation, source inventory, and historical hashes."
  - "T1-T5 implementation and local evidence."
  - "T6 B1/B2/B3 review evidence before s08 handoff."
done_when:
  - "T0-T7 outputs exist with no out-of-scope diff or open review blocker."
  - "Fail-first evidence precedes the version/docs implementation."
  - "Final branch source and PR evidence are ready for independent s08 verification."
  - "No merge, tag, publication, Release, Business Acceptance, or cleanup is inferred."
owner: "developer"
```

## Artifact Chính
```yaml
recommended_design: "Execute approved Option A: minimal release-only preparation, retain PR bytes as pre-merge evidence, and reserve release authority for one post-merge main artifact."
implementation_mode: HARDENING
tasks_completed:
  - "T0 - locked isolated baseline and release inventory"
  - "T1 - wrote failing v2.6.3 release and exact v2.6.2 rollback contracts"
bug_repro_evidence: []
hypothesis_log:
  - assumption: "All active structured release surfaces still identify 2.6.2 before T1."
    status: CONFIRMED
    evidence: "Both manifests, package.json, and the wfc Public Flow label report 2.6.2."
  - assumption: "Historical v2.6.2 release evidence is unchanged from the public tag boundary."
    status: CONFIRMED
    evidence: "docs/releases/workflow-bundle-v2.6.2.md matches tag v2.6.2 byte-for-byte and hashes to 761a67c18b894f398d2b4c17d0b80d6a9fc7ab1e7fff250494212d1a5bc67769."
  - assumption: "The initial release-test failure was an environment bootstrap gap, not a baseline product regression."
    status: CONFIRMED
    evidence: "Both tests initially raised ENOENT for generated runtime skills; npm run build:workflow:bundle-runtime produced 84 mode-skill copies with no retained tracked diff, after which both baseline tests passed."
debug_experiments:
  - goal: "Distinguish a product failure from missing generated runtime in the fresh worktree."
    action: "Run both release tests, synchronize runtime using the repository script, then rerun both tests and inspect runtime diff."
    result: "Initial ENOENT reproduced; synchronized v2.6.2 runtime made release-surface and rollback-source tests PASS; no tracked runtime diff remains."
tdd_evidence:
  - behavior: "Active version, current docs, complete release record, and historical locks advance to v2.6.3."
    failing_test: "release-surface.test.js exits 1 with 41 expected old-state assertions; zero historical-digest assertion failed."
    passing_test: "PENDING_T4 after T2/T3 implementation."
  - behavior: "Exact-artifact rollback advances from v2.6.2->v2.6.1 to v2.6.3->v2.6.2 and distinguishes CR-009 runtime state."
    failing_test: "release-rollback-smoke.test.js exits 1 at source package version: expected 2.6.3, got 2.6.2."
    passing_test: "PENDING_T4 after T2/T3 implementation."
safe_refactor_notes:
  - "No refactor is planned or performed; any need for one requires an Approach/Task Plan amendment."
code_changes:
  - "release-surface.test.js now targets v2.6.3, freezes every v2.0.0-v2.6.2 release record, rejects stale v2.6.2 current claims, and requires full packaged/repository-only release-note separation."
  - "release-rollback-smoke.test.js now targets exact v2.6.3 -> v2.6.2, pins rollback digest af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f, and asserts CR-009 disposition/history is candidate-only."
doc_changes:
  - "Protocol-owned activation updated s01 and the work-item report to ACTIVE/s07 with the exact 19 write roots."
  - "This canonical s07 note records T0 evidence; no parallel baseline report was created."
config_changes: []
review_checkpoints:
  - "B1 metadata/contracts: pending T4, QC Spec Compliance then Developer+QC Code Quality."
  - "B2 active docs/release record: pending T5, same ordered reviewers."
  - "B3 integrated branch candidate: pending B1/B2."
outputs_actual:
  - "Branch codex/release-workflow-bundle-v2-6-3 at d1d6a8208f8bc5dc73bc6e70f27f87e6c5957e34 is 10 governance commits ahead of origin/main 3204749e9fac592e9f38e327dbd85a87b84b2325."
  - "Merge base equals origin/main 3204749e; pre-implementation committed delta contains only CHANGE-007 and this work item's governance artifacts."
  - "Existing in-repo worktree path resolves inside the repository and is covered by .gitignore."
  - "Tag inventory contains v2.6.0, v2.6.1, and v2.6.2; no local v2.6.3 tag exists."
  - "v2.6.2 tag object resolves to commit a9455fa86b13af9f285ea3480728ec951c53286d."
  - "Retained rollback digest af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f is recorded by the immutable v2.6.2 release record and prior hosted verification; fresh artifact download is deferred to exact-artifact rehearsal."
  - "T1 syntax and diff checks pass; intended RED is 41 scoped release-surface assertions plus one rollback version mismatch, with no unrelated or historical-hash failure."
known_limitations:
  - "T0 corroborates the rollback digest from immutable repository/hosted evidence; it does not claim a fresh public download."
  - "Local Node is v26.5.0; required Node 18/22 proof remains hosted evidence."
  - "T2-T7 and all independent review verdicts remain pending."
follow_up_items:
  - "Execute T2 once with npm run bump-version -- 2.6.3 and reject any path outside the five expected outputs."
notes_for_testing: "Bootstrap generated runtime before source-mode release tests in a fresh worktree. Do not treat generated runtime files as owned production changes, and fail if a tracked runtime diff remains."
```

## T0 Baseline Evidence
```yaml
captured_at: "2026-09-19T13:58:13Z"
source:
  branch: "codex/release-workflow-bundle-v2-6-3"
  head: "d1d6a8208f8bc5dc73bc6e70f27f87e6c5957e34"
  origin_main: "3204749e9fac592e9f38e327dbd85a87b84b2325"
  merge_base: "3204749e9fac592e9f38e327dbd85a87b84b2325"
  commits_ahead: 10
pre_implementation_delta:
  classification: "GOVERNANCE_ONLY"
  roots:
    - "changes/CHANGE-007/**"
    - "work-items/release-workflow-bundle-v2-6-3/**"
  production_paths_changed: 0
structured_versions:
  workflow-bundle.manifest.json: "2.6.2"
  packages/workflow-bundle/workflow-bundle.manifest.json: "2.6.2"
  packages/workflow-bundle/package.json: "2.6.2"
  packages/workflow-bundle/bin/wfc.js: "Public v2.6.2 Flow"
historical_release_sha256:
  workflow-bundle-v2.0.0.md: "2305427a8a6aea5e54c046ac3951fcc8a5b93ac5c2201d548b2b8e7d94e317c8"
  workflow-bundle-v2.0.1.md: "fc4bb384e41db5588db47bcd76eb81c4ff82ada9e3344dfe22bb7a3093b11a9e"
  workflow-bundle-v2.0.2.md: "3bad363ef358875311dd67bb29e95704cc88f7458e3903abe2cbf7bf10bc27a4"
  workflow-bundle-v2.2.0.md: "887b53947eba084b8ed17dae326d8c4be21238f80bb22a9a0b2b5266db1da97e"
  workflow-bundle-v2.2.1.md: "a9dccebb33a2b8e63516c59afd98d8f7fb8ec0a2281cb9a2c9aba63f0edccee1"
  workflow-bundle-v2.3.0.md: "299b4cedd5fcb0fbd9fdf3dd97f17f057e279e6f7904fcf6ef4f617e7185f9a5"
  workflow-bundle-v2.3.1.md: "8017d38477643d0a9e5eece0299c9595653cc67128ed6505e0ca2cd0d6c1d050"
  workflow-bundle-v2.3.2.md: "476b3804e3fb901feb0ede4f817c31475072b1c578de4bdeab8c2d2a10fed98d"
  workflow-bundle-v2.4.0.md: "2b84621cccae1e0126287d9de48fa425dada7fd833b92d722fac33e2c15755a5"
  workflow-bundle-v2.5.0.md: "ff383e19db45d43888627c46a332aba85f24aca45eb3edb6e4d3f1cae7b3da4d"
  workflow-bundle-v2.6.0.md: "12e2e49d61d7145a71e12eaf6c2c82e7fcdc46d349ce16716daa9b858dc45151"
  workflow-bundle-v2.6.1.md: "e5fd05b23ce86184309429e5ad7228cb618c008da215ed96424aff0e59bd6d2d"
  workflow-bundle-v2.6.2.md: "761a67c18b894f398d2b4c17d0b80d6a9fc7ab1e7fff250494212d1a5bc67769"
rollback:
  version: "2.6.2"
  artifact: "workflow-bundle-2.6.2.tgz"
  sha256: "af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f"
  evidence: "v2.6.2 immutable release record plus hosted run 34959637638 evidence"
baseline_tests:
  first_run: "EXPECTED_ENVIRONMENT_FAILURE: generated runtime/codex/skills absent"
  bootstrap: "npm run build:workflow:bundle-runtime -> bundle_version=2.6.2, modes=claude,codex, skills=84"
  release_surface: PASS
  rollback_source_contract: PASS
  retained_runtime_diff: NONE
activation_side_effect:
  observation: "Capability control created zero-byte docs/releases/workflow-bundle-v2.6.3.md because an approved file write root did not yet exist."
  disposition: "Removed the untracked empty placeholder; T2 bump utility must create the real stub and T3 must replace it."
```

## T1 Fail-First Evidence
```yaml
captured_at: "2026-09-19T14:03:24Z"
changed_paths:
  - "packages/workflow-bundle/test/release-surface.test.js"
  - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
syntax:
  release_surface: PASS
  rollback_smoke: PASS
red_results:
  release_surface:
    exit_code: 1
    assertion_failures: 41
    expected_categories:
      - "four structured version/CLI surfaces still identify 2.6.2"
      - "active EN/VI docs still identify v2.6.2 and lack CR-009 current-release claims"
      - "v2.6.3 release record does not yet exist"
      - "stale v2.6.2 current-candidate claims remain"
    unrelated_failures: 0
    historical_digest_failures: 0
  rollback_source_contract:
    exit_code: 1
    failure: "source package version must be 2.6.3, got 2.6.2"
    failure_stage: "preflight before exact-artifact execution"
scope_check:
  approved_test_paths_only: true
  production_edits: 0
  historical_release_edits: 0
result: PASS
next_task: "T2 structured version bump"
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: RED_CONFIRMED_GREEN_PENDING
tdd_test_refs:
  - "packages/workflow-bundle/test/release-surface.test.js"
  - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/release-workflow-bundle-v2-6-3"
worktree_reason: "Full-track public release work spans multiple sessions and exact branch/main/public identities."
review_status: PARTIAL
review_refs:
  - "s06 Review Plan B1/B2/B3; T1 contract diff is ready for later B1 after T4 GREEN."
spec_compliance_status: NOT_RUN
code_quality_status: NOT_RUN
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs:
  - "No delegation: all tasks share one release identity and strict gate chain."
merge_path: "Reviewed release branch -> PR -> QC DoD -> main; main run becomes authoritative candidate."
verify_path:
  - "T1/T4 targeted RED/GREEN release contracts"
  - "T5 full local release verification"
  - "T6 ordered B1/B2/B3 independent reviews"
  - "T7 hosted PR evidence, then s08"
```

## Implementation Notes
```yaml
worktree:
  decision: REQUIRED
  status: USED
  branch: "codex/release-workflow-bundle-v2-6-3"
  path: ".claude/worktrees/release-workflow-bundle-v2-6-3"
  inside_repo: true
  cleanup_guard: "DoD + Release + Business Acceptance + terminal archive + clean tree"
review:
  mode: INDEPENDENT
  order: [SPEC_COMPLIANCE, CODE_QUALITY]
  batches: ["B1 identity/contracts", "B2 docs/release record", "B3 integrated branch candidate"]
  blocker_rule: "Spec drift, historical mutation, identity ambiguity, premature public state, secret exposure, required-check failure, or unverifiable rollback blocks s08."
framework_notes:
  - "Existing Node/npm workflow-bundle release path only; no framework or pipeline redesign."
known_limitations:
  - "Public auth/collision and exact hosted artifact checks belong to later approved tasks and are not inferred from T0."
```

## Traceability
```yaml
upstream:
  - "release-workflow-bundle-v2-6-3.s04.acceptance-criteria.md"
  - "release-workflow-bundle-v2-6-3.s05.technical-approach.md"
  - "release-workflow-bundle-v2-6-3.s06.task-breakdown.md"
task_status:
  T0: COMPLETE
  T1: COMPLETE_RED_CONFIRMED
  T2: NEXT
  T3: BLOCKED_BY_T2
  T4: BLOCKED_BY_T2_T3
  T5: BLOCKED_BY_T4
  T6: BLOCKED_BY_T5
  T7: BLOCKED_BY_T6
  T8_T13: LATER_GATES
acceptance_coverage_current:
  AC-R263-01: PARTIAL
  AC-R263-02: PARTIAL
  AC-R263-08: PARTIAL
next_step: "T2 structured version bump"
```

## Handoff
- Outputs actual: ACTIVE s07, exact write grant, T0 isolation/inventory/hashes, and T1 intended RED on the two approved contract tests.
- Known limitations: T2-T7 and every review/hosted gate remain pending; local Node 26 is not Node 18/22 release evidence.
- Notes for testing: T1 RED is preserved in this note; T2 may now change only the five bump outputs, followed by T3 active docs and T4 GREEN.
- Notes for deployment: none; tag, publication, latest movement, merge, and cleanup remain unauthorized.
