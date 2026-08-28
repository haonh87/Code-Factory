---
artifact_id: "integrate-design-checklists-into-sa-ta.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "integrate-design-checklists-into-sa-ta"
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
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CHANGE-004"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-004/spec-delta/brd.delta.md"
  - "changes/CHANGE-004/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CHANGE-004/spec-delta/brd.delta.md"
  srs: "changes/CHANGE-004/spec-delta/srs.delta.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "developer"
  - "qc"
  - "devops"
  - "po"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release:
    - "devops"
    - "qc"
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-19T02:53:05Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-08-19T02:53:05Z"
  dor_reviewed_by:
    - "qc"
  dor_reviewed_at: "2026-08-19T02:53:05Z"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-22T15:09:55Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-24T03:52:04Z"
  uat_reviewed_by: []
  uat_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "workflow-governance-router"
  - "codex-workflow-chain"
  - "task-breakdown-planner"
  - "ci-cd-release"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "integrate-design-checklists-into-sa-ta.s05.technical-approach.md"
linked_artifacts:
  - "integrate-design-checklists-into-sa-ta.s04.acceptance-criteria.md"
  - "changes/CHANGE-004/design.md"
  - "changes/CHANGE-004/tasks.md"
  - "packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
  - "packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
  - "packages/workflow-bundle/test/release-surface.test.js"
  - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> The former release-baseline collision is resolved: CHANGE-003 is integrated into `main`, which now
> provides the verified v2.5.0/42-skill baseline. This plan is rebased to target v2.6.0/42 while
> preserving Option A and rollback to v2.5.0/42. The amended s05 Approach is now trusted: Developer
> approval is sealed with `digest_match=true` against SHA-256 `1a8c335a047741421fd7d2d91e9f45a1ab95a7e23f3c35d76dea96f15fa1887a`.
> The Developer explicitly approved this Task Plan at `2026-08-22T15:24:17Z`. The finalized artifact
> opened s07 after its trusted receipt matched. S06-AMEND-002 added five bilingual release-document
> siblings and was sealed at SHA-256 `35aa0ae29a38e75a7cac22a853b7f139ce19e89dd0547c6063c5d31c1ed4bd3f`.
> T0 through T7 then passed. T8 exposed three unchanged regression tests whose frozen expectations no
> longer match the approved v2.6.0/v2.5.0 release transition or the current live protocol fixture. The
> Developer explicitly approved S06-AMEND-003 at `2026-08-24T03:52:04Z`. s07 recovery remains closed
> until a new trusted Task Plan receipt is sealed against this amended artifact with `digest_match=true`.

## T5 Scope Amendment
```yaml
amendment_id: "S06-AMEND-002"
status: APPROVED_AND_RECEIPT_SEALED
approved_by: "developer"
approved_at: "2026-08-24T02:28:03Z"
trigger: "T5 release-surface RED retained 15 current-candidate failures exclusively in five Vietnamese public-document siblings omitted from the original paths_in_scope."
added_paths:
  - "README.vi.md"
  - "packages/workflow-bundle/README.vi.md"
  - "docs/publish-surface.vi.md"
  - "docs/workflow-docs-map.vi.md"
  - "docs/workflow-bundle-quickstart.vi.md"
allowed_delta: "Mirror only the reviewed English v2.6.0 current-candidate, additive SA/TA guidance, compatibility, rollback, and unpublished-state changes; preserve unrelated Vietnamese content and UTF-8."
unchanged_contract:
  - "Option A and the SA/TA s01-s04 authority boundary"
  - "AC-001 through AC-010"
  - "v2.6.0 candidate, 42 managed skills, and v2.5.0/42 rollback"
  - "No tag, registry publication, live global mutation, T6 execution, merge, or cleanup before its gate"
previous_task_plan_receipt:
  artifact_sha256: "501654aa07058776c4b4a9429cfbfdc16f7df3f60b8e9ea0d0e0cf3baeddb1e6"
  disposition: STALE_AFTER_AMENDMENT
sealed_task_plan_receipt:
  reviewed_by: "developer"
  reviewed_at: "2026-08-24T02:37:26.240Z"
  artifact_sha256: "35aa0ae29a38e75a7cac22a853b7f139ce19e89dd0547c6063c5d31c1ed4bd3f"
  digest_match: true
next_human_action: "NONE - the amendment receipt was sealed before T5 resumed."
```

## T8 Recovery Scope Amendment
```yaml
amendment_id: "S06-AMEND-003"
status: APPROVED_BY_DEVELOPER_RECEIPT_PENDING
approved_by: "developer"
approved_at: "2026-08-24T03:52:04Z"
trigger: "T8 full-unit RED retained three failures in unchanged regression tests whose expected release transition or live protocol lifecycle state is stale."
added_paths:
  - "packages/workflow-bundle/test/release-install-all-smoke.test.js"
  - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
allowed_delta:
  - "Align install-all source identity with the approved v2.6.0 candidate and unchanged 42-skill inventory."
  - "Align rollback coverage with the approved v2.6.0/42 candidate -> retained v2.5.0/42 artifact at SHA-256 36615668ad2bcc752998d33e4e7e6f837aef3f1feabf83b04aecd612cabb92ec."
  - "Make the live protocol resolver assertion compare with its current source-of-truth instead of freezing one lifecycle status."
recovery_sequence:
  - "Reuse the recorded T8 RED evidence, then apply the smallest test-only fix in exactly the added paths."
  - "Run the three focused tests and the complete workflow-bundle unit suite."
  - "Invalidate the prior source-to-candidate provenance, rebuild the candidate exactly once after source freeze, and rerun exact candidate plus rollback smoke."
  - "Repeat T7 two-tier review and T8 integrated checks before handing evidence to QC."
unchanged_contract:
  - "Option A, the SA/TA s01-s04 authority boundary, and AC-001 through AC-010"
  - "No production runtime, dependency, API, event, database, schema, stack, or deployment behavior change"
  - "v2.6.0 candidate, 42 managed skills, and v2.5.0/42 rollback"
  - "No tag, registry publication, live global mutation, s08, DoD, Release, Business Acceptance, merge, or cleanup"
previous_task_plan_receipt:
  artifact_sha256: "35aa0ae29a38e75a7cac22a853b7f139ce19e89dd0547c6063c5d31c1ed4bd3f"
  disposition: STALE_AFTER_AMENDMENT
next_human_action: "Reseal the Task Plan trusted receipt as Developer against this amended artifact digest, verify digest_match=true, then resume bounded s07 recovery."
```

## Resolved Planning Blocker
```yaml
id: "S06-BLOCK-001"
status: RESOLVED
detected_at: "2026-08-19T07:06:20Z"
resolved_at: "2026-08-21T14:55:19Z"
evidence:
  - "main HEAD is cdd68ccb10f1cdec5b3301068dd47cbb74175a92 and contains integration commit 570cb90 for CHANGE-003."
  - "Structured root and package versions report 2.5.0."
  - "Canonical, Codex, and Claude managed skill inventories each report 42 skills."
  - "The former artifact-governance-enforcement worktree is clean and its commit is an ancestor of main."
impact:
  - "The pre-integration s05 digest and its Approach receipt are stale after rebasing to the real baseline."
  - "The amended Approach gate now passes and this plan can be reviewed."
verified_approach_receipt:
  status: APPROVED
  reviewed_by: "developer"
  reviewed_at: "2026-08-22T15:09:55Z"
  artifact_sha256: "1a8c335a047741421fd7d2d91e9f45a1ab95a7e23f3c35d76dea96f15fa1887a"
  digest_match: true
remaining_gates:
  - "Seal a separate matching Task Plan receipt for this approved artifact."
next_human_action: "Developer seals the trusted Task Plan receipt and verifies digest_match=true."
```

## Step Contract
```yaml
step: "s06 Task Plan"
goal: "CHANGE-004 has an execution-ready, path-owned, test-first plan that implements the approved Option A and proves AC-001 through AC-010 without reopening the SA/TA contract or release boundary during s07."
value: "The implementer can execute sequentially without re-inferring design, while Developer, QC, DevOps, and PO can identify each review, evidence, release, and rollback boundary."
scope_in:
  - "Dedicated worktree, branch, write-root, merge-path, and dirty-file isolation controls"
  - "Fail-first architecture-role contract tests for checklist completeness, behavior, confidentiality, compatibility, and parity"
  - "Canonical SA/TA EN/VI references and concise SKILL.md hooks"
  - "Generated Codex/Claude runtime synchronization and unaffected-skill digest evidence"
  - "v2.6.0 candidate metadata, public release docs, package evidence, rollback, and human release controls"
  - "Full-track targeted reviews in the order spec compliance then code/content quality"
scope_out:
  - "Any production or generated-runtime edit before Task Plan receipt and s07 activation"
  - "A new output block, skill, trigger, owner, service, dependency, stack, model, or deployment topology"
  - "Editing the private source document or copying private provenance into distributable files"
  - "Registry publication, tag creation, live global installation, merge, or worktree cleanup before their human gates"
  - "Multi-agent or subagent execution"
inputs_required:
  - "Approved and digest-matched Spec, Contract, and DoR receipts for s04"
  - "A new approved and digest-matched Approach receipt for the amended v2.5.0/42 baseline and v2.6.0/42 target"
  - "Approved Option A, v2.6.0 target, 42-skill inventory, compatibility boundary, and validation plan from s05"
  - "Current canonical SA/TA trees, contract test, runtime sync/parity, pack audit, smoke, package, and release tooling"
  - "Current main-worktree dirty inventory and the ignored .claude/worktrees location"
outputs_required:
  - "Nine tasks with exact paths, dependencies, outputs, review checkpoints, and verification hints"
  - "AC-to-task, release, worktree, TDD, review, compatibility, and rollback traceability"
  - "A strict-governance Brownfield Delivery Plan and release pipeline controls"
  - "A human-reviewable Task Plan gate artifact with no execution placeholders"
done_when:
  - "Every AC-001 through AC-010 maps to at least one task and one verification path"
  - "Every behavior or contract change names a fail-first test before its implementation task"
  - "The worktree branch, root split, owned paths, merge path, and cleanup guard are explicit"
  - "The two risky batches each have separate spec-compliance and code/content-quality checkpoints"
  - "The exact v2.6.0 candidate, 42-skill inventory, package digest, rollback, and no-publication controls are explicit"
  - "No placeholder or unresolved execution choice remains"
  - "A Developer reviews the final plan and its trusted Task Plan receipt matches the artifact digest"
constraints:
  hard_constraints:
    - "Do not enter s07 before the trusted Task Plan receipt passes and the work item is activated"
    - "Use one ignored in-repo worktree for all canonical, generated, test, metadata, and public-doc edits"
    - "Keep workflow/change artifacts in the main governance root and unrelated dirty files out of the implementation branch"
    - "Use test fail -> minimum change -> test pass for the public skill behavior and release-surface behavior"
    - "Run spec compliance before code/content quality for each targeted review batch"
    - "Keep private source paths, private R-IDs, names, decisions, thresholds, and prose out of distributable content"
    - "Do not tag, publish, update live global installations, merge, or clean the worktree before the applicable human gate"
  soft_constraints:
    - "Reuse CommonJS tests, runtime sync, pack audit, bundle smoke, version bump, and package smoke without new dependencies"
    - "Prefer byte-identical shared references and concise SKILL.md hooks over duplicated inline guidance"
  prohibited_actions:
    - "Adding design_readiness as a required top-level output block"
    - "Hand-editing generated runtime copies"
    - "Broad search-and-replace over historical releases or unrelated public documentation"
    - "Treating a local test pass, review pass, or retained tarball as DoD or Release approval"
  compliance_checks:
    - "Verify all authoring receipts and Task Plan digest before activation"
    - "Verify the worktree path is in-repo, ignored, clean, and based on the recorded main HEAD"
    - "Record red/green commands and outputs for T1/T2 and T5"
    - "Record targeted reviews in the order spec compliance then code/content quality"
    - "Compare unaffected-skill digests and canonical/runtime bytes after sync"
    - "Record one retained candidate digest and prohibit rebuild after release evidence is attached"
risks:
  - id: "S06-R01"
    description: "The clean implementation branch does not contain untracked CHANGE-004 workflow artifacts from the dirty main root."
    likelihood: HIGH
    impact: MEDIUM
    severity: HIGH
    mitigation: "Keep s01-s08 and CHANGE-004 artifacts in the main root, use them as read-only inputs from the worktree, and run governance validation with explicit main-root paths."
    contingency: "Stop before source edits if receipt or workflow evidence cannot be resolved across the declared roots."
    owner: "developer"
    status: MONITORING
  - id: "S06-R02"
    description: "A generalized reference can still leak private provenance or introduce an unanchored blocking mandate."
    likelihood: LOW
    impact: HIGH
    severity: HIGH
    mitigation: "Make denylist, private-ID/path, mandatory-authority, and representative negative assertions fail before canonical content is added; require targeted human content review."
    contingency: "Rewrite or exclude the item and block the release batch until the scoped scan and review both pass."
    owner: "developer/qc"
    status: MONITORING
  - id: "S06-R03"
    description: "Whole-tree runtime synchronization can hide unrelated generated changes."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Capture unaffected-skill digests before sync, regenerate only through the canonical sync command, require recursive parity, and compare the post-sync diff allowlist."
    contingency: "Discard generated runtime changes in the worktree and rerun after the canonical or sync cause is corrected."
    owner: "developer"
    status: MONITORING
  - id: "S06-R04"
    description: "A candidate can be rebuilt after verification or public docs can imply publication before the Release gate."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Build one retained tarball only after source freeze, record its SHA-256 and contents, test that exact artifact, and assert candidate/unpublished wording across release surfaces."
    contingency: "Invalidate the old digest, repeat candidate verification once, and keep Release blocked until the new immutable evidence is complete."
    owner: "devops/qc"
    status: MONITORING
timebox:
  target_duration: "One focused implementation session plus one independent verification/review session"
  deadline: ""
  escalation_rule: "Return to s05 if implementation requires a schema/owner/trigger/new-skill change; return through CHANGE-004 spec control if any acceptance threshold or confidentiality boundary must change."
```

## Approach Clarifications
```yaml
clarifications:
  - id: "S06-CLAR-001"
    observation: "The approved CHANGE-004 proposal lists generated SA/TA paths without the analysis category, while the actual canonical-to-runtime sync preserves skills/analysis/{sa,ta}."
    executable_paths:
      - "packages/workflow-bundle/runtime/codex/skills/analysis/sa"
      - "packages/workflow-bundle/runtime/codex/skills/analysis/ta"
      - "packages/workflow-bundle/runtime/claude/skills/analysis/sa"
      - "packages/workflow-bundle/runtime/claude/skills/analysis/ta"
    classification: "Planning-time path correction only; no design, contract, inventory, or runtime-direction change."
  - id: "S06-CLAR-002"
    observation: "The existing bump-version tool flags .claude/CLAUDE.md for manual release review and the tracked file carries a v2.5.0 public-release label."
    executable_paths:
      - ".claude/CLAUDE.md"
    classification: "Add this tracked release-label surface to T5 manual review; do not alter user-global ~/.claude content."
spec_change_required: false
governance_exception_required: false
```

## Main Artifact
```yaml
implementation_goal: "Deliver a reviewed v2.6.0/42-skill candidate that adds domain-neutral design-readiness behavior to canonical SA/TA, preserves their existing schema and authority, matches both generated runtimes, contains no private source leakage, and remains unpublished until the human Release gate."
ba_lane:
  acceptance_coverage:
    - "AC-001 -> T0 and T8 private routing-matrix reconciliation"
    - "AC-002/AC-006/AC-007 -> T1, T2, and T3 checklist-contract and authority evidence"
    - "AC-003 -> T1, T2, T3, and T8 confidentiality scans and review"
    - "AC-004/AC-005 -> T1, T2, and T3 representative behavior, no-solution-selection, and compatibility regression"
    - "AC-008 -> T2, T4, and T8 bilingual/reference/runtime/unaffected-skill parity"
    - "AC-009 -> T3, T4, T5, T6, T7, and T8 integrated evidence"
    - "AC-010 -> T5, T6, T7, and T8 candidate/version/rollback/no-publication evidence"
  scope_guards:
    - "Public checklist IDs are domain-neutral DR-C01 through DR-C13 and DR-Q01 through DR-Q10; private R-IDs stay only in CHANGE-004 evidence."
    - "SA/TA output block names, owner meanings, triggers, ten metrics, landscape handoff, and downstream design authority do not change."
    - "No source-specific name, decision, exact threshold, path, R-ID, or verbatim confidential passage enters canonical, runtime, package, or public release files."
    - "Only SA, TA, their generated copies, the focused contract test, and approved v2.6.0 release surfaces are production-owned."
    - "No tag, registry publication, live global install/update, merge, or worktree cleanup occurs in s07."
  human_review_points:
    - "Developer approves this Task Plan before s07 activation."
    - "Developer performs T3 and T7 targeted reviews in the order spec compliance then code/content quality."
    - "QC independently verifies AC-001 through AC-010 and owns DoD at s08."
    - "DevOps or QC approves Release; PO approves Business Acceptance; these approvals are not inferred from candidate checks."
dev_lane:
  path_map:
    - "Governance lane in main root: work-items/integrate-design-checklists-into-sa-ta/** and changes/CHANGE-004/**"
    - "Contract test lane: packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
    - "Canonical lane: skills/analysis/sa/{SKILL.md,SKILL.vi.md,references/design-readiness-checklist*.md} and TA equivalents"
    - "Generated lane: packages/workflow-bundle/runtime/{codex,claude}/skills/analysis/{sa,ta}/**"
    - "Release test lane: release-surface.test.js and release-candidate-artifact-smoke.test.js"
    - "Release metadata/docs lane: root/package manifests, package.json, wfc help, .claude/CLAUDE.md, EN/VI README/public-doc pairs, and workflow-bundle-v2.6.0.md"
    - "Candidate lane: ignored worktree tarball plus digest/install-smoke evidence; no registry destination before Release approval"
  technical_sequence:
    - "T0 activate and isolate a clean implementation baseline"
    - "T1 add fail-first public contract assertions"
    - "T2 add the minimum canonical references and hooks to turn T1 green"
    - "T3 review canonical/test behavior as spec compliance then code/content quality"
    - "T4 regenerate and prove canonical/runtime parity"
    - "T5 add fail-first release assertions and prepare consistent v2.6.0 surfaces"
    - "T6 freeze, retain, hash, and smoke the exact candidate artifact"
    - "T7 review runtime/release behavior as spec compliance then code/content quality"
    - "T8 run integrated pre-verify checks and hand evidence to QC"
  tdd_targets:
    - "T1/T2: missing reference files, missing SKILL.md hooks, incomplete 13/10 contract, representative cases, leakage, authority, and forbidden solution selection fail before canonical content and pass afterward."
    - "T5: v2.6.0 metadata, candidate wording, release-note, compatibility, rollback, inventory, and exact-artifact expectations fail before version/docs changes and pass afterward."
task_breakdown:
  - id: T0
    owner_role: developer
    name: "Activate s07 and isolate the baseline"
    objective: "After Task Plan receipt approval, create one ignored worktree from the recorded main HEAD and prove no unrelated dirty files are carried into the implementation branch."
    paths_in_scope:
      - ".claude/worktrees/integrate-design-checklists-into-sa-ta-v2.6.0"
      - "work-items/integrate-design-checklists-into-sa-ta"
      - "changes/CHANGE-004"
    dependencies:
      - "Task Plan receipt APPROVED with digest_match=true"
      - "Work item activation grants the implementation worktree plus main governance paths"
    outputs_expected:
      - "Branch codex/integrate-design-checklists-into-sa-ta-v2.6.0 at the recorded main HEAD"
      - "Clean ignored implementation worktree and unchanged main dirty inventory"
      - "Baseline Node/npm versions, 42-skill counts, focused tests, route totals, and receipt digests"
    review_checkpoint: "Confirm the worktree is inside the repo and ignored, source edits are still absent, and unrelated main-root changes are excluded."
    verification_hint: "Run git worktree list --porcelain, git check-ignore -v for the target, git status --short in both roots, node/npm version checks, focused baseline tests, and a read-only R-01..R-34 unique-route count over s01."
  - id: T1
    owner_role: developer
    name: "Write the failing architecture-readiness contract"
    objective: "Extend the existing architecture-role test so every approved public behavior fails for the right missing-reference or missing-hook reason before canonical implementation."
    paths_in_scope:
      - "packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
    dependencies:
      - "T0"
    outputs_expected:
      - "Assertions for four canonical reference paths and byte-identical SA/TA pairs per language"
      - "Exactly 13 DR-C checks and 10 DR-Q question/handoff entries with all required fields"
      - "Six named cases: data authority, contested resource authority, reconciliation, compliance timing, lifecycle/retirement, and offline/online invariant"
      - "Negative assertions for private path/R-ID/source terms, unanchored blocking, checklist dumps, and solution selection"
      - "Existing schema, ownership, metrics, metadata, and bilingual regression assertions retained"
    review_checkpoint: "SPEC_COMPLIANCE: assertions map to AC-002 through AC-007 without prescribing a solution. CODE_QUALITY: failures are focused, readable, deterministic, and use existing plain-assert conventions."
    verification_hint: "Run node packages/workflow-bundle/test/architecture-role-skills-contract.test.js and record non-zero exit where only new reference/hook/behavior assertions fail; existing assertions must remain green."
  - id: T2
    owner_role: developer
    name: "Add canonical design-readiness references and hooks"
    objective: "Create the minimum domain-neutral EN/VI reference contract and concise SA/TA invocation steps that satisfy T1 while mapping findings only into existing owned output fields."
    paths_in_scope:
      - "skills/analysis/sa/SKILL.md"
      - "skills/analysis/sa/SKILL.vi.md"
      - "skills/analysis/sa/references/design-readiness-checklist.md"
      - "skills/analysis/sa/references/design-readiness-checklist.vi.md"
      - "skills/analysis/ta/SKILL.md"
      - "skills/analysis/ta/SKILL.vi.md"
      - "skills/analysis/ta/references/design-readiness-checklist.md"
      - "skills/analysis/ta/references/design-readiness-checklist.vi.md"
    dependencies:
      - "T1 red evidence"
    outputs_expected:
      - "13 portable checks DR-C01..DR-C13 with trigger, owner_lens, concern_or_invariant, expected_evidence, handoff, verification, mandatory_when, and blocking_authority"
      - "10 converted prompts DR-Q01..DR-Q10 with trigger, question, destination, expected_evidence, and non-selection guard"
      - "Explicit relevance filter, advisory-default rule, not-applicable behavior, and existing-field mapping"
      - "Short EN/VI SKILL.md hooks after driver extraction and before handoff/metrics"
      - "Byte-identical EN SA/TA references and byte-identical VI SA/TA references"
    review_checkpoint: "SPEC_COMPLIANCE: SA/TA remain s01-s04 driver skills and emit no solution/model choice. CODE_QUALITY: reference wording is concise, domain-neutral, self-contained, and contains no duplicated contradictions."
    verification_hint: "Rerun the focused contract test to green; compare each SA/TA language pair with cmp; scan canonical paths for human-capability-documents, docs/design.md, HCP, private R-IDs, source-specific terms, and forbidden solution-selection language."
  - id: T3
    owner_role: developer
    name: "Perform targeted review of the canonical contract batch"
    objective: "Review T1-T2 against the approved spec first, then review content/test quality and resolve all findings before runtime generation."
    paths_in_scope:
      - "packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
      - "skills/analysis/sa/SKILL.md"
      - "skills/analysis/sa/SKILL.vi.md"
      - "skills/analysis/sa/references/design-readiness-checklist.md"
      - "skills/analysis/sa/references/design-readiness-checklist.vi.md"
      - "skills/analysis/ta/SKILL.md"
      - "skills/analysis/ta/SKILL.vi.md"
      - "skills/analysis/ta/references/design-readiness-checklist.md"
      - "skills/analysis/ta/references/design-readiness-checklist.vi.md"
    dependencies:
      - "T2"
    outputs_expected:
      - "Recorded AC-001..AC-007 spec-compliance verdict"
      - "Recorded code/content-quality verdict after spec compliance"
      - "Zero unresolved HIGH/MEDIUM findings and explicit disposition for LOW findings"
    review_checkpoint: "Do not start code/content-quality review until spec compliance passes or a governance exception is opened; no exception is planned."
    verification_hint: "Rerun the focused contract test, byte comparisons, denylist scan, existing architecture-role regressions, YAML/reference checks, and UTF-8/whitespace checks after review fixes."
  - id: T4
    owner_role: developer
    name: "Regenerate both runtimes and prove scoped parity"
    objective: "Fan out the approved canonical delta through the existing sync command and prove only SA/TA generated copies changed while all 42 skills remain byte-equal to canonical source."
    paths_in_scope:
      - "packages/workflow-bundle/runtime/codex/skills/analysis/sa"
      - "packages/workflow-bundle/runtime/codex/skills/analysis/ta"
      - "packages/workflow-bundle/runtime/claude/skills/analysis/sa"
      - "packages/workflow-bundle/runtime/claude/skills/analysis/ta"
    dependencies:
      - "T3"
    outputs_expected:
      - "Generated SA/TA copies in both runtimes including the two new references per skill"
      - "Exactly 42 canonical, 42 Codex, and 42 Claude skills"
      - "Recursive canonical/runtime equality and zero unaffected-skill digest changes"
      - "No runtime-only manual edit"
    review_checkpoint: "SPEC_COMPLIANCE: AC-008 and the canonical-ownership rule pass. CODE_QUALITY: generated diff is allowlisted to SA/TA copies and contains no unrelated fan-out."
    verification_hint: "Capture unaffected-skill digests, run npm run build:workflow:bundle-runtime, rerun workflow-bundle-runtime-parity.test.js and pack audit, compare skill counts, then prove unaffected digests are unchanged."
  - id: T5
    owner_role: developer
    name: "Prepare consistent v2.6.0 release surfaces test-first"
    objective: "Make release tests fail on the v2.5.0 baseline, then align structured metadata, public candidate wording, compatibility, rollback, inventory, and release notes without rewriting unrelated history."
    paths_in_scope:
      - "workflow-bundle.manifest.json"
      - "packages/workflow-bundle/workflow-bundle.manifest.json"
      - "packages/workflow-bundle/package.json"
      - "packages/workflow-bundle/bin/wfc.js"
      - "packages/workflow-bundle/test/release-surface.test.js"
      - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
      - ".claude/CLAUDE.md"
      - "README.md"
      - "README.vi.md"
      - "packages/workflow-bundle/README.md"
      - "packages/workflow-bundle/README.vi.md"
      - "docs/publish-surface.md"
      - "docs/publish-surface.vi.md"
      - "docs/workflow-docs-map.md"
      - "docs/workflow-docs-map.vi.md"
      - "docs/workflow-bundle-quickstart.md"
      - "docs/workflow-bundle-quickstart.vi.md"
      - "docs/releases/workflow-bundle-v2.6.0.md"
    dependencies:
      - "T4"
    outputs_expected:
      - "Fail-first v2.6.0/42-skill/candidate/unpublished/compatibility/rollback assertions"
      - "Structured version 2.6.0 in root and package manifests, package.json, and wfc help"
      - "Reviewed English/Vietnamese public candidate docs that name the additive SA/TA guidance and preserve 42 skills"
      - "Placeholder-free v2.6.0 release note with CHANGE-004, compatibility, verification, known limitations, rollback, and human gates"
      - "No current-public-release claim, tag, publication, or live installation"
    review_checkpoint: "SPEC_COMPLIANCE: AC-009/010 and the v2.6.0 release boundary pass. CODE_QUALITY: version edits are scoped to current surfaces; historical release facts remain unchanged."
    verification_hint: "Update release tests first and record the expected v2.5.0 failures; run npm run bump-version -- 2.6.0 in the worktree; manually review every generated/manual EN/VI surface; rerun release-surface and release-candidate smoke tests plus stale-version, placeholder, UTF-8, and EN/VI semantic-parity scans."
  - id: T6
    owner_role: devops
    name: "Freeze and smoke the exact candidate artifact"
    objective: "Build one retained tarball from the reviewed source, record its immutable digest and contents, and test that exact artifact in an isolated install without publishing it."
    paths_in_scope:
      - "packages/workflow-bundle/workflow-bundle-2.6.0.tgz"
      - "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.s07.implementation.md"
    dependencies:
      - "T5 focused tests green"
      - "Source diff frozen for candidate build"
    outputs_expected:
      - "One retained workflow-bundle-2.6.0.tgz in the ignored implementation worktree"
      - "SHA-256, npm pack file inventory, wfc version, 42-skill counts, and isolated install/update smoke evidence"
      - "Candidate rebuild prohibition after its digest is referenced by release evidence"
    review_checkpoint: "Confirm the installed artifact digest equals the retained tarball, both runtimes contain the new references, and no registry or global path was contacted."
    verification_hint: "Run npm pack --json to the ignored worktree destination, hash the tarball, install that exact path under a fresh temporary prefix with audit/fund/scripts disabled, run its wfc version/status and managed-skill checks, and retain command output for s08."
  - id: T7
    owner_role: developer
    name: "Perform targeted review of runtime and release batches"
    objective: "Review T4-T6 against AC-008..AC-010 first, then review generated diff, release truthfulness, package evidence, and rollback quality before s08 handoff."
    paths_in_scope:
      - "packages/workflow-bundle/runtime/codex/skills/analysis/sa"
      - "packages/workflow-bundle/runtime/codex/skills/analysis/ta"
      - "packages/workflow-bundle/runtime/claude/skills/analysis/sa"
      - "packages/workflow-bundle/runtime/claude/skills/analysis/ta"
      - "workflow-bundle.manifest.json"
      - "packages/workflow-bundle"
      - ".claude/CLAUDE.md"
      - "README.md"
      - "docs/publish-surface.md"
      - "docs/workflow-docs-map.md"
      - "docs/workflow-bundle-quickstart.md"
      - "docs/releases/workflow-bundle-v2.6.0.md"
    dependencies:
      - "T6"
    outputs_expected:
      - "Recorded AC-008..AC-010 spec-compliance verdict"
      - "Recorded generated/release/package quality verdict after spec compliance"
      - "Frozen candidate digest and zero unresolved release blockers from s07 review"
    review_checkpoint: "Review pass is not Release or DoD; any source fix invalidates T6 and requires one rebuilt/retested candidate."
    verification_hint: "Rerun runtime parity, pack audit, release-surface, exact-candidate install smoke, package inventory/digest checks, stale claim scans, and rollback command review after resolving findings."
  - id: T8
    owner_role: developer
    name: "Run integrated pre-verify checks and hand off to QC"
    objective: "Aggregate complete s07 evidence for all ten ACs without declaring DoD, Release, Business Acceptance, merge, or cleanup."
    paths_in_scope:
      - "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.s07.implementation.md"
      - "changes/CHANGE-004/tasks.md"
      - "packages/workflow-bundle/test/release-install-all-smoke.test.js"
      - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
      - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
    dependencies:
      - "T7"
      - "S06-AMEND-003 is Developer-approved and its amended Task Plan receipt has digest_match=true"
    outputs_expected:
      - "AC-001..AC-010 implementation evidence matrix with commands, exit codes, and artifact/digest refs"
      - "Delivery Rule Evidence for TDD, worktree, targeted review, and no delegation"
      - "Recorded skipped human gates and residual risks for independent s08 verification"
      - "QC handoff with the retained candidate digest and rollback path"
      - "Recovered full-unit evidence plus one rebuilt/retested candidate after the approved test-only delta"
    review_checkpoint: "Confirm the note says implementation/review complete but does not self-declare DoD, Release, Business Acceptance, branch merge, or worktree cleanup."
    verification_hint: "Run the focused contract test, full workflow-bundle unit suite, runtime parity, pack audit, bundle smoke, release-surface, release-candidate smoke, targeted workflow/planning/change/protocol validators, git diff --check, scoped leakage/stale-version scans, and UTF-8 checks; record any failure as a blocker."
dependencies_global:
  - "T0 -> T1 -> T2 -> T3 -> T4 -> T5 -> T6 -> T7 -> T8"
  - "Any canonical fix after T4 requires rerunning T4."
  - "Any source or release fix after T6 invalidates the retained digest and requires rerunning T6 before T7."
  - "s08 begins only after T8 evidence is reviewable; s07 checks do not substitute for QC verification."
risk_notes:
  - "Main-root governance artifacts are untracked and must not be copied wholesale into the clean implementation branch."
  - "Public confidentiality needs both mechanical scans and human semantic review; neither alone is sufficient."
  - "Runtime sync is whole-tree generation, so unaffected-skill digest evidence is required."
  - "The exact retained candidate, not a later rebuild, is the artifact eligible for Release review."
verification_plan:
  - "Private trace: 34 unique primary routes with totals 13 adopted, 10 converted, 8 deferred, and 3 excluded."
  - "Focused behavior: architecture-role contract test proves 13/10 completeness, six cases, authority, confidentiality, compatibility, and language/reference parity."
  - "Regression: all existing architecture-role schema, ownership, metrics, metadata, and example assertions stay green."
  - "Generation: canonical/Codex/Claude inventories remain 42 and recursive bytes match; unaffected-skill digests do not change."
  - "Static/audit: workflow pack audit, reference scan, diff check, whitespace, YAML, and UTF-8 checks pass."
  - "Release: structured/public surfaces say v2.6.0 candidate and 42 skills, retained package digest and contents are recorded, rollback targets v2.5.0, and publication/global installs remain zero."
  - "Integrated: focused and full unit tests, bundle smoke, exact candidate install smoke, and targeted workflow validators exit zero before QC handoff."
notes_for_implementation: "Execute sequentially in the approved worktree. Preserve red/green and two-tier review evidence in s07, keep governance artifacts in the main root, never hand-edit runtime copies, never copy private provenance into publishable files, and stop before tag/publication/live install/merge/worktree cleanup until s08 human gates decide them."
```

## Execution Topology
```yaml
execution_mode: agentic
delegation_mode: none
worktree_decision: REQUIRED
branch: "codex/integrate-design-checklists-into-sa-ta-v2.6.0"
worktree_path: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/integrate-design-checklists-into-sa-ta-v2.6.0"
governance_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory"
owned_scope:
  - "Implementation worktree: only T1-T7 canonical/test/generated/release paths"
  - "Main governance root: CHANGE-004 and integrate-design-checklists-into-sa-ta workflow notes only"
write_guards:
  - "The worktree path is covered by .gitignore .claude/worktrees/."
  - "No source edit until activation reports s07 and the declared write roots."
  - "Unrelated dirty main-root files remain untouched."
merge_path:
  - "Implementation branch -> T3/T7 targeted reviews -> T8 handoff -> independent s08 Verify + DoD"
  - "Only after DoD: branch-finish review decides merge and worktree cleanup"
verification_owner: "qc"
```

## Release Pipeline Controls
```yaml
pipeline_scope: "Local/CI verification and human-gated npm package candidate for workflow-bundle v2.6.0; no runtime environment deployment."
source_strategy:
  branch_model: "One isolated codex/integrate-design-checklists-into-sa-ta-v2.6.0 branch; immutable v2.6.0 tag only after Release approval."
  triggers:
    - "Focused checks per T1-T7"
    - "Full pre-verify checks after source freeze"
    - "Human Release approval before any tag or registry publication"
build_and_verify:
  stages:
    - "architecture-role contract red/green"
    - "canonical/runtime sync and recursive parity"
    - "full unit, pack audit, bundle smoke, and release-surface verification"
    - "retained tarball build, digest, inventory, and isolated exact-artifact install smoke"
  cache_strategy:
    - "Use an isolated npm cache for package smoke; cache output is not release evidence."
  required_checks:
    - "AC-001 through AC-010 evidence or explicit blocker"
    - "Zero leakage, zero runtime drift, 42 skills per inventory, UTF-8, and diff check"
artifact_flow:
  registry: "npm registry is a prohibited destination until the trusted Release receipt passes"
  artifact_types:
    - "workflow-bundle-2.6.0.tgz"
    - "SHA-256 digest and npm pack file inventory"
    - "test, audit, smoke, compatibility, and rollback evidence"
  tagging_strategy:
    - "Version 2.6.0 is the immutable candidate identity; do not use latest as source of truth."
    - "Create v2.6.0 tag only after Release approval against the same retained candidate/source digest."
  provenance_controls:
    - "Record branch HEAD, package digest, package contents, Node/npm versions, and exact commands."
    - "Invalidate evidence if source changes after candidate build."
promotion_flow:
  - from: local
    to: dev
    conditions:
      - "T8 pre-verify checks pass"
      - "Exact candidate digest retained"
    automation_level: "Candidate evidence handoff only; no registry publication"
  - from: dev
    to: uat
    conditions:
      - "QC independently verifies the same digest at s08"
      - "DoD evidence is complete"
    automation_level: "Human-reviewed evidence promotion"
  - from: uat
    to: prod
    conditions:
      - "Trusted Release receipt APPROVED by devops or qc"
      - "Trusted Business Acceptance receipt APPROVED by po"
      - "No open release blocker"
    automation_level: "Explicit human authorization required; publication is a separate post-gate action"
approval_controls:
  - "Developer Task Plan receipt before s07"
  - "QC DoD, DevOps/QC Release, and PO Business Acceptance at s08"
release_controls:
  pre_release:
    - "Freeze source, retain one candidate, verify exact digest, compatibility, rollback, and candidate wording"
    - "No tag, publish, latest alias, or live global update"
  post_release:
    - "If publication is authorized, verify registry version/digest and perform a scoped install smoke of the same artifact"
    - "Record rollback owner and preserve v2.5.0 fallback"
rollback_controls:
  - "Before publication, revert only CHANGE-004-managed worktree batches to the verified v2.5.0 source baseline."
  - "After publication, install the retained v2.5.0 fallback in isolation before any authorized managed downgrade."
  - "Never roll back unrelated dirty files, historical receipts, or unmanaged/global content."
pipeline_risks:
  - "Rebuilding after evidence invalidates artifact provenance."
  - "Candidate wording can be mistaken for publication without negative release assertions."
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: "The s07 pipeline stops at a retained, verified, unpublished candidate. Production registry promotion is not authorized by Task Plan approval or local checks."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - { id: "GOV-001", status: PASS, evidence: "All ACs map to tasks and verification paths in the Main Artifact." }
  - { id: "GOV-002", status: PASS, evidence: "Compatibility and rollback are split into T3/T4/T5/T6/T7 and the Brownfield Delivery Plan." }
  - { id: "GOV-003", status: PASS, evidence: "Targeted reviews are explicit tasks and are not hidden inside implementation." }
  - { id: "GOV-004", status: PASS, evidence: "Worktree, TDD, no-delegation, immutable candidate, and human-gate guards are explicit." }
  - { id: "GOV-005", status: PASS, evidence: "No governance exception or waiver is required by the approved Option A plan." }
  - { id: "GOV-006", status: PASS, evidence: "The former release-baseline collision is resolved by CHANGE-003 integration into the verified v2.5.0/42 main baseline." }
  - { id: "GOV-007", status: PASS, evidence: "Amended s05 Approach receipt is APPROVED by developer with digest_match=true at SHA-256 1a8c335a..." }
  - { id: "GOV-008", status: PASS, evidence: "The user explicitly approved the original Task Plan, S06-AMEND-002, and the exact three-path S06-AMEND-003 as Developer; gate_reviews records the latest authority at 2026-08-24T03:52:04Z." }
  - { id: "GOV-009", status: PENDING, evidence: "The prior Task Plan receipt at SHA-256 35aa0ae2... is stale after S06-AMEND-003; the amended artifact needs a new digest-matched trusted receipt." }
blocking_items:
  - "Reseal the trusted Task Plan receipt against the amended s06 digest."
owner: "developer"
next_action: "Developer reseals and verifies the amended Task Plan receipt; only afterward resume bounded T8 recovery in the isolated s07 worktree."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "T1/T2 retain all existing architecture-role contract assertions while adding the new fail-first behavior."
  - "T3 proves schema, owner meanings, ten metrics, metadata, examples, downstream authority, YAML, and UTF-8 remain valid."
  - "T4 proves 42-skill inventory, recursive runtime equality, and unchanged unaffected-skill digests."
  - "T5-T7 prove current v2.6.0 release truth without rewriting v2.5.0 history."
  - "T8 runs focused and full regression suites before independent QC verification."
compatibility_checkpoints:
  - "No design_readiness top-level block, required-field rename, owner reassignment, trigger change, or consumer migration."
  - "Existing valid SA/TA fixtures remain valid; new guidance enriches existing fields only."
  - "No API, event, database, runtime deployment, or user configuration migration."
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "Before T4, revert only the owning canonical/test batch in the worktree."
  - "After T4 and before T6, revert canonical changes and regenerate runtimes; never hand-revert generated copies alone."
  - "After T6, invalidate the retained digest before any fix, rebuild once after the source is frozen, and repeat exact-artifact checks."
  - "Keep the branch/worktree until s08 DoD and branch-finish review; do not merge, remove, or prune during s07."
```

## Traceability
```yaml
upstream:
  - "integrate-design-checklists-into-sa-ta.s04.acceptance-criteria.md"
  - "integrate-design-checklists-into-sa-ta.s05.technical-approach.md"
requirement_to_tasks:
  - "CR-REQ-001 -> T0, T8"
  - "CR-REQ-002 -> T1, T2, T3"
  - "CR-REQ-003 -> T1, T2, T3, T8"
  - "CR-REQ-004 -> T1, T2, T3"
  - "CR-REQ-005 -> T1, T2, T3"
  - "CR-REQ-006 -> T1, T2, T3"
  - "CR-REQ-007 -> T1, T2, T3"
  - "CR-REQ-008 -> T2, T4, T8"
  - "CR-REQ-009 -> T3, T4, T5, T6, T7, T8"
  - "CR-REQ-010 -> T5, T6, T7, T8"
next_step: "Reseal and verify the Developer-approved S06-AMEND-003 Task Plan receipt, then resume bounded T8 recovery"
```

## Audit
### Step Goal Audit
```yaml
step: "s06 Task Plan"
status: PASS
checks:
  - criterion: "Every acceptance criterion maps to owned tasks and verification paths."
    result: PASS
    evidence: "T0-T8 and requirement_to_tasks cover AC/CR-REQ-001 through 010, including TDD, review, release, rollback, and QC handoff."
  - criterion: "The plan is execution-oriented and does not require the implementer to reinvent design."
    result: PASS
    evidence: "Exact paths, order, dependencies, outputs, worktree, merge path, review checkpoints, and verification hints are explicit."
  - criterion: "The plan is rebased to the current brownfield baseline."
    result: PASS
    evidence: "CHANGE-003 is integrated; the plan starts from v2.5.0/42, targets v2.6.0/42, and rolls back to v2.5.0/42."
  - criterion: "The upstream Approach passes and a Developer explicitly approves the final Task Plan before trusted receipt sealing."
    result: PASS
    evidence: "The amended Approach receipt passes with digest_match=true; the user explicitly approved the original Task Plan, S06-AMEND-002, and S06-AMEND-003 as Developer, most recently at 2026-08-24T03:52:04Z."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
gaps: []
risk_level: MEDIUM
next_action: "Reseal and verify the amended digest-bound Task Plan receipt; bounded T8 recovery remains closed until digest_match=true."
```

## Handoff
- First recovery action after the gate: resume the blocked s07 protocol, confirm ACTIVE/no missing gates, then apply only the S06-AMEND-003 test delta.
- Passed dependency: amended s05 Approach receipt is `APPROVED` with `digest_match=true`.
- Human gates recorded: Developer approved the original s06 plan at `2026-08-22T15:24:17Z`, S06-AMEND-002 at `2026-08-24T02:28:03Z`, and S06-AMEND-003 at `2026-08-24T03:52:04Z`.
- Blocking dependency: a resealed trusted Task Plan receipt for the amended artifact with `digest_match=true`.
- Condition for s07: work item `ACTIVE` at `s07`, declared write roots granted, clean worktree recorded, and unrelated main-root dirt excluded.
- Stop boundary: no tag, registry publication, live global install/update, DoD claim, merge, or worktree cleanup during s07.
