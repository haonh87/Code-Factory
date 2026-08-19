---
artifact_id: "artifact-governance-enforcement.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "artifact-governance-enforcement"
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
change_id: "CHANGE-003"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-003/spec-delta/brd.delta.md"
  - "changes/CHANGE-003/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: []
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
    - "ba"
    - "developer"
  dor:
    - "po"
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release:
    - "qc"
    - "devops"
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
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-18T03:14:18.971Z"
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
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "artifact-governance-enforcement.s05.technical-approach.md"
linked_artifacts:
  - "changes/CHANGE-003/proposal.md"
  - "changes/CHANGE-003/design.md"
  - "changes/CHANGE-003/tasks.md"
  - "changes/CHANGE-003/spec-delta/brd.delta.md"
  - "changes/CHANGE-003/spec-delta/srs.delta.md"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> The approved T0-T7 P2 plan remains intact. CHANGE-003 adds T8-T13 for fail-first release
> contracts, bilingual skill/runtime parity, v2.5.0 surfaces, targeted review, one immutable
> candidate, and exact rollback evidence.

## Step Contract
```yaml
step_goal: "Produce an ordered plan specific enough to execute without re-deriving the design, with a verify path per task and the reader migration isolated so it cannot fail silently."
input_summary:
  - "s05 recommended approach O-A write-new-read-both, and its resolutions for Q2 and Q3"
  - "s04 acceptance AC-001 to AC-010"
output_summary:
  - "Ordered tasks with paths, outputs, review checkpoint and verify method"
  - "Worktree and review plan"
  - "Regression checkpoints against the 17-work-item floor"
done_when:
  - "No task uses a placeholder without naming what it touches and how it is checked"
  - "Every removed field is in a task that also migrates its reader"
owner: "developer"
```

## Artifact Chính
```yaml
implementation_goal: "Make the runtime emit role contributions as sections, migrate every reader in the same change with a failing test first, and add duplication, placement and resolver checks driven by declared configuration - without editing any note that carries a sealed receipt."
# Paths are stated once per task. Not restated as a lane map: ownership-table.md row 2.

tasks:
  - id: T0
    owner_role: developer
    name: "Establish the worktree and the baseline"
    objective: "Isolate from stabilize-architecture-skill-bundle and record the exact pre-change numbers every later task compares against."
    paths_in_scope:
      - ".claude/worktrees/artifact-governance-enforcement"
    outputs_expected:
      - "Worktree created and gitignored, branched from local main"
      - "Baseline: validator counts, unit and fixture suite results, per-work-item validate status for all 17, and the digest_match state of all 9 sealed receipts"
    review_checkpoint: "Confirm the worktree is inside the repo and ignored, and that the baseline records receipt digests so any accidental note edit is detectable later."
    verification_hint: "git worktree list; git check-ignore; run the four validators and the two suites; loop wfc gate status over the 9 receipts."
    dependencies: []
  - id: T1
    owner_role: developer
    name: "Reference resolver, as a shared helper"
    objective: "Implement the resolver specified in ownership-table.md so the duplication check and future consumers share one implementation."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
      - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
    outputs_expected:
      - "resolveArtifactReference supporting same-note and cross-file targets"
      - "Loud failure on each of: missing file, missing heading, missing yaml block, missing path"
    review_checkpoint: "SPEC_COMPLIANCE: matches the five-step specification. CODE_QUALITY: failures are distinguishable, not a single generic throw."
    verification_hint: "AC-010. Four negative tests must fail before implementation and pass after; two positive tests resolve a real reference from this work item's own s01."
    dependencies: ["T0"]
    sequencing_reason: "First because the duplication check depends on it, and because it is the one piece with no legacy interaction."
  - id: T2
    owner_role: developer
    name: "Declared layer roots in configuration"
    objective: "Make the six layer roots configuration with Code-Factory's values as the shipped default, and confirm existing config readers tolerate the new key."
    paths_in_scope:
      - "workflow-contracts.config.json"
      - "packages/workflow-bundle/scripts/validate-workflow-governance.js"
      - "packages/workflow-bundle/test/validate-workflow-governance.test.js"
    outputs_expected:
      - "artifactGovernance.layerRoots read from config with a default"
      - "Q6 confirmed: every existing reader of the config file tolerates an unknown top-level key, with the grep recorded"
    review_checkpoint: "SPEC_COMPLIANCE: the default reproduces the six roots from SKILL.md Rule 3 exactly. CODE_QUALITY: the default lives in one place."
    verification_hint: "AC-007. Fixture with custom roots passes on its own layout; fixture with no declaration inherits the default."
    dependencies: ["T0"]
  - id: T3
    owner_role: developer
    name: "Placement check and escape hatch"
    objective: "Reject a file in no declared layer, and accept one exempted with a stated reason."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-workflow-governance.js"
      - "packages/workflow-bundle/tests/fixtures/workflow-governance/**"
      - "packages/workflow-bundle/test/validate-workflow-governance.test.js"
    outputs_expected:
      - "Placement check over declared roots"
      - "Frontmatter exemption requiring a non-empty reason, echoed into validation output"
      - "Negative fixtures: unplaced file, exemption without reason"
    review_checkpoint: "SPEC_COMPLIANCE: exemption is per-artifact frontmatter, not a central registry, per the s05 resolution. CODE_QUALITY: the reason appears in output, so a widened exemption is visible."
    verification_hint: "AC-006, AC-008. Then AC-009: all 17 work items still pass. A false positive here means the roots are wrong, not that the check should be loosened."
    dependencies: ["T2"]
  - id: T4
    owner_role: developer
    name: "Duplication check driven by the ownership table"
    objective: "Reject a note that restates a fact owned by another block."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-workflow-governance.js"
      - "packages/workflow-bundle/tests/fixtures/workflow-governance/**"
      - "packages/workflow-bundle/test/validate-workflow-governance.test.js"
    outputs_expected:
      - "Check covering the fields the ownership table assigns an owner"
      - "Five negative fixtures, one per F9 duplication, each message naming the owning block"
      - "A false-positive sweep result across all 17 work items"
    review_checkpoint: "SPEC_COMPLIANCE: every rejection message names the owner, so the fix is obvious. CODE_QUALITY: the field-to-owner map is data, not branching logic."
    verification_hint: "AC-005. Five negatives rejected, deduplicated equivalents accepted, zero false positives across 17 work items. A false positive means ownership-table.md gains a row."
    dependencies: ["T1", "T2"]
  - id: T5
    owner_role: developer
    name: "Reader migration - the highest-risk task"
    objective: "Move each reader from the per-role artifact to the owning section, keeping the legacy path, with a failing test per field before the change."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-workflow-execution.js"
      - "packages/workflow-bundle/test/validate-workflow-execution.test.js"
    outputs_expected:
      - "A recorded grep listing every reader of assignment_id, role, owned_scope, done_when and status before any edit"
      - "Per field: a test that fails before migration and passes after"
      - "Legacy per-role file still accepted, covered by exactly one fixture"
    review_checkpoint: "SPEC_COMPLIANCE: no field lost a reader; the grep is the evidence, not a claim. CODE_QUALITY: the legacy branch is clearly marked and gets no new behaviour."
    verification_hint: "AC-004. The red state per field is the deliverable. A test that was never red proves nothing - see s05 R-1."
    dependencies: ["T1"]
    sequencing_reason: "Isolated in its own task, after the resolver exists and before the generator changes, so a silent-pass regression is attributable to one commit."
  - id: T6
    owner_role: developer
    name: "Generator emits sections with plural schemas"
    objective: "Emit role contributions into ## Role Outputs with assignments[] and handoffs[], and stop emitting per-role files."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-execution-definitions.js"
      - "packages/workflow-bundle/test/scaffold-workflow.test.js"
      - "skills/orchestration/codex-workflow-chain/references/workflow-chain.md"
    outputs_expected:
      - "Sections replace execution-policy, worker-assignment, worker-handoff-report and merge-report files"
      - "Plural schemas; every id in merged_assignments resolves to a handoff entry"
      - "## Role Outputs and the role-indexed escape-hatch filename registered in the naming convention"
    review_checkpoint: "SPEC_COMPLIANCE: destinations match worked-example.md section 5 exactly. CODE_QUALITY: no orphaned assignment is representable."
    verification_hint: "AC-001, AC-002, AC-003. Generate the sample at 2, 4 and 8 roles; file counts identical; a fixture with an unmatched merged_assignments id is rejected."
    dependencies: ["T5"]
    sequencing_reason: "After T5. Readers must accept the new location before anything writes to it, otherwise the first generated artifact is unreadable."
  - id: T7
    owner_role: developer
    name: "Full regression and receipt integrity"
    objective: "Prove nothing existing broke, including the audit trail."
    paths_in_scope:
      - "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s08.verification.md"
    outputs_expected:
      - "Four validators plus unit, fixtures and pack-audit, compared against the T0 baseline"
      - "All 17 work items still pass"
      - "All 9 sealed receipts still report digest_match=true"
      - "Encoding check on changed text files"
    review_checkpoint: "SPEC_COMPLIANCE: AC-009 satisfied and no receipt digest moved."
    verification_hint: "Compare against T0 numbers, not against expectation. Record output, not summaries."
    dependencies: ["T3", "T4", "T6"]

execution_order: "T0 -> {T1, T2} -> T3, T4, T5 -> T6 -> T7. T1 and T2 are independent of each other. T5 gates T6 strictly."
dependencies:
  - "T5 before T6: readers must accept the section before the generator writes it"
  - "T1 before T4: the duplication check uses the resolver"
  - "T2 before T3: the placement check needs declared roots"
  - "T7 after everything, compared against the T0 baseline"
handoff_points:
  - "After T0: baseline numbers exist; without them T7 has nothing to compare against"
  - "After T5: the riskiest change is isolated and reviewed before the generator moves"
  - "After T7: handoff to s08 for the DoD decision"
delegation: "None. T5 and T6 are strictly ordered and share files; the independence test for a subagent is not met."
```

## Verification Plan
- Mandatory per task: the `verification_hint` on each task above is the verify path; no task ships without it.
- Mandatory before leaving `s07`: four validators, unit, fixtures, pack-audit, all 17 work items, all 9 receipt digests, encoding.
- Risk note: `T5` is the only task that can fail silently. Its deliverable is the **red** state per field, not the green one. A test that was never red is not evidence.
- Rollout note: none. This work item ships no release and bumps no version. `Q5` resolved as minor-when-released, in `s05`.

## Governance Checks
```yaml
checklist_applied: "project-context/checklists/default.md"
checks:
  - id: "GOV-08"
    check: "Execution-oriented planning, no placeholders"
    result: PASS
    evidence: "Each of T0 to T7 names paths, outputs, a review checkpoint and a verify method tied to an acceptance criterion."
  - id: "GOV-09"
    check: "TDD for behaviour change"
    result: PASS
    evidence: "T1 and T5 require the failing state as a deliverable. T3, T4 and T6 carry negative fixtures."
  - id: "GOV-10"
    check: "Worktree for large or risky change"
    result: PASS
    evidence: "T0 creates it. Required by planning_track=full, multiple boundaries, and the overlapping active work item."
  - id: "GOV-11"
    check: "Review early, two-tier"
    result: PASS
    evidence: "Every task carries a SPEC_COMPLIANCE then CODE_QUALITY checkpoint; T5 is reviewed before T6 opens."
  - id: "GOV-12"
    check: "Subagent only for independent tasks"
    result: PASS
    evidence: "Delegation declined; T5 and T6 are strictly ordered and share files."
  - id: "GOV-13"
    check: "Approach and Task Plan are human gates"
    result: PENDING
    evidence: "Both receipts empty."
blocking_items:
  - "Approach receipt not granted"
  - "Task Plan receipt not granted"
  - "Write-root collision with stabilize-architecture-skill-bundle unresolved"
owner: "developer"
next_action: "Human Approach and Task Plan review, then resolve the collision before s07 opens."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "After T3 and after T4: all 17 work items still pass, because a new check is the most likely source of a false positive"
  - "After T6: regenerate the sample and confirm no existing artifact changed shape unexpectedly"
  - "T7: full sweep against the T0 baseline"
compatibility_checkpoints:
  - "After T2: a fixture with no declared roots inherits the default, so an adopter who upgrades without touching config is unaffected"
  - "After T5: the legacy per-role fixture still passes, which is the whole point of write-new-read-both"
  - "T7: all 9 sealed receipt digests unchanged - the constraint that eliminated options O-B and O-C"
migration_or_backfill_steps:
  - "None by design. No note is edited, no data is converted. This is why O-A was chosen."
rollback_or_restore_steps:
  - "git revert the whole change set from the worktree branch. Partial rollback is forbidden: a generator emitting sections against readers expecting files is worse than either end state."
  - "Because no existing note is edited, rollback cannot damage the audit trail."
```

## Traceability
```yaml
upstream:
  - "artifact-governance-enforcement.s05.technical-approach.md#Artifact Chính"
  - "artifact-governance-enforcement.s04.acceptance-criteria.md#Artifact Chính"
acceptance_to_task:
  - "AC-001, AC-002, AC-003 -> T6"
  - "AC-004 -> T5"
  - "AC-005 -> T4"
  - "AC-006, AC-008 -> T3"
  - "AC-007 -> T2"
  - "AC-009 -> T3, T4, T7"
  - "AC-010 -> T1"
coverage: "10 of 10 acceptance criteria map to a task; 8 of 8 tasks carry at least one criterion or a baseline obligation"
next_step: "s07 Implement, blocked pending the Approach and Task Plan receipts and the collision resolution"
```

## Handoff
- First task: T8 freezes historical evidence and records the fail-first delta tests.
- Blocking dependency: fresh developer Task Plan receipt for this revised artifact.
- Condition to move to step 7: Task Plan `APPROVED` with `digest_match=true`; no implementation starts earlier.

## CHANGE-003 Task Plan Delta

> [!warning]
> This addendum supersedes only the original statements that P2 ships no release and has no
> rollout work. T0-T7 and their evidence remain historical; CHANGE-003 execution starts at T8.

### Step Contract Delta
```yaml
step: "s06 Task Plan"
goal: "Produce an executable T8-T13 plan that delivers and verifies v2.5.0 without re-deriving scope, paths, TDD order, review order, or rollback provenance."
value: "s07 can resume in the existing worktree with one ordered path from fail-first contracts to a clean candidate handoff."
scope_in:
  - "AC-011 through AC-016 and the approved CHANGE-003 s05 design"
  - "Source/runtime parity, current bilingual release surfaces, targeted reviews, exact candidate, and exact rollback"
scope_out:
  - "Reworking completed T0-T7 behavior, P4, unrelated defects, publication, tag creation, and live global updates"
inputs_required:
  - "Spec, Contract, DoR, and Approach receipts with digest_match=true"
  - "Existing P2 worktree and retained v2.4.0 tarball"
outputs_required:
  - "Path map, TDD targets, ordered task breakdown, verification matrix, review checkpoints, and brownfield delivery plan"
done_when:
  - "Every task names owned paths, dependencies, outputs, review checkpoint, and verification hint"
  - "All AC-011 through AC-016 have task and verification coverage"
  - "Candidate-input freeze and no-publication boundaries are explicit"
constraints:
  hard_constraints:
    - "Reuse the existing artifact-governance-enforcement worktree and agentic execution"
    - "Tests change before behavior/current surfaces, then fail for the expected reason"
    - "Review order is spec compliance then code quality for each risky batch"
    - "Candidate and rollback tests use exact tarballs and recorded digests"
  soft_constraints:
    - "Prefer the existing sync, version-bump, unit, audit, smoke, and pack commands"
  prohibited_actions:
    - "Editing historical release claims, unrelated dirty files, or generated runtimes by hand"
    - "Creating a second implementation worktree or delegating tightly coupled tasks"
    - "Tagging, publishing, updating live global roots, merging, or cleaning worktrees before gates"
  compliance_checks:
    - "Task-plan coverage, planning validator, canonical/worktree note parity, and human Task Plan receipt"
risks:
  - id: "R-P1"
    description: "Broad public-doc edits overwrite historical or actual-public-release context."
    likelihood: "MEDIUM"
    impact: "HIGH"
    severity: "HIGH"
    mitigation: "Edit only prepared-candidate/current-surface claims and add explicit bilingual tests for old version/count pairs."
    contingency: "Stop T10 and restore the affected historical/public claim before review."
    owner: "developer"
    status: "OPEN"
  - id: "R-P2"
    description: "The candidate is packed before tracked candidate inputs and s07 implementation evidence are frozen."
    likelihood: "MEDIUM"
    impact: "HIGH"
    severity: "HIGH"
    mitigation: "T11 must pass and freeze candidate inputs before T12 starts."
    contingency: "Discard the tarball, reopen T11, and rebuild after full reverification."
    owner: "developer"
    status: "OPEN"
timebox:
  target_duration: "One s06 authoring and developer-review cycle"
  deadline: ""
  escalation_rule: "Return to s05 if an implementation task needs a new architecture boundary or cannot use exact-artifact rollback."
```

### Main Artifact Delta
```yaml
implementation_goal: "Deliver a reviewable v2.5.0/42-skill delta in the existing P2 worktree, then verify one immutable candidate and exact v2.4.0 rollback without touching frozen release evidence or unmanaged state."
ba_lane:
  acceptance_coverage:
    - "AC-011 -> T8, T9, T11"
    - "AC-012 -> T8, T9, T11, T12"
    - "AC-013 -> T8, T10, T11"
    - "AC-014 -> T8, T12"
    - "AC-015 -> T8, T13"
    - "AC-016 -> T11, T12, T13"
  scope_guards:
    - "Do not edit docs/releases/workflow-bundle-v2.4.0.md or its 41-skill evidence."
    - "Do not edit v2.3.2 historical count/evidence."
    - "Do not touch main-tree workflow-trusted-approval-utils.js or unrelated untracked root/docs artifacts."
    - "Do not publish, tag, merge, clean worktrees, or update live global installations."
  human_review_points:
    - "Developer approves this Task Plan before T8."
    - "Targeted developer review follows T9 and T10 in order: SPEC_COMPLIANCE then CODE_QUALITY."
    - "QC or DevOps Release, QC DoD, and PO Business Acceptance occur only after T12/T13 evidence."
dev_lane:
  path_map:
    - owner: "Fail-first release contracts"
      paths:
        - "packages/workflow-bundle/test/release-surface.test.js"
        - "packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
        - "packages/workflow-bundle/test/release-install-all-smoke.test.js"
        - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
        - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
    - owner: "Canonical skill and generated runtimes"
      paths:
        - "skills/guardrails/artifact-governance/SKILL.vi.md"
        - "packages/workflow-bundle/runtime/{codex,claude}/skills/guardrails/artifact-governance/**"
        - "packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js (execute; modify only if a proven sync defect appears and return to s05 first)"
    - owner: "Structured current release identity"
      paths:
        - "workflow-bundle.manifest.json"
        - "packages/workflow-bundle/workflow-bundle.manifest.json"
        - "packages/workflow-bundle/package.json"
        - "packages/workflow-bundle/bin/wfc.js"
    - owner: "Reviewed bilingual current surfaces"
      paths:
        - "README.md and README.vi.md"
        - "packages/workflow-bundle/README.md and README.vi.md"
        - "docs/publish-surface.md and publish-surface.vi.md"
        - "docs/workflow-docs-map.md and workflow-docs-map.vi.md"
        - "docs/workflow-bundle-quickstart.md and workflow-bundle-quickstart.vi.md"
        - "docs/releases/workflow-bundle-v2.5.0.md"
    - owner: "Candidate and workflow evidence"
      paths:
        - ".claude/worktrees/artifact-governance-enforcement/packages/workflow-bundle/workflow-bundle-2.5.0.tgz"
        - "work-items/artifact-governance-enforcement/*.s07.* and *.s08.*"
        - "changes/CHANGE-003/execution/task-status.md"
  technical_sequence:
    - "T8 fail-first contract -> T9 skill/runtime -> targeted review -> T10 current release surfaces -> targeted review -> T11 integrated source gate/freeze -> T12 candidate/install-update -> T13 rollback/final handoff"
  tdd_targets:
    - "T8 changes the five failing release files to the approved v2.5.0/42 contract and records expected RED before T9/T10."
    - "T9 adds canonical SKILL.vi.md and runs canonical sync only after runtime-parity/completeness assertions fail."
    - "T10 uses T8 release-surface RED, applies the minimum metadata/docs delta, and reruns to GREEN."
    - "T12/T13 are verification-harness changes rather than production behavior; exact-artifact assertions must fail if paths or digests do not resolve."
task_breakdown:
  - id: "T8"
    owner_role: "developer"
    name: "Lock fail-first v2.5.0 contracts and frozen-history guards"
    objective: "Translate AC-011 through AC-015 into version-scoped executable assertions before changing source or current surfaces."
    paths_in_scope:
      - "packages/workflow-bundle/test/{release-surface,workflow-bundle-runtime-parity,release-install-all-smoke,release-candidate-artifact-smoke,release-rollback-smoke}.test.js"
      - "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s07.implementation.md"
    dependencies: ["Task Plan receipt"]
    outputs_expected:
      - "Assertions for v2.5.0/42, artifact-governance EN/VI/parity, bilingual current surfaces, frozen v2.4.0=41 and v2.3.2=40, exact candidate, and exact rollback digest"
      - "RED evidence from each affected test for the expected pre-implementation reason"
      - "Recorded SHA-256 of both frozen release notes and retained v2.4.0 tarball"
    review_checkpoint: "SPEC_COMPLIANCE: all delta criteria and history guards are asserted. CODE_QUALITY: failures identify version, mode/scope, path, or digest precisely."
    verification_hint: "Run the five files individually; each must fail only on the approved delta, never on syntax or missing harness plumbing."
  - id: "T9"
    owner_role: "developer"
    name: "Complete artifact-governance EN/VI and regenerate both runtimes"
    objective: "Make canonical source complete and both generated copies byte-equal at 42/42/42."
    paths_in_scope:
      - "skills/guardrails/artifact-governance/SKILL.vi.md"
      - "packages/workflow-bundle/runtime/{codex,claude}/skills/guardrails/artifact-governance/**"
    dependencies: ["T8 RED"]
    outputs_expected:
      - "Complete Vietnamese sibling matching the public English contract"
      - "Runtime copies generated by the existing sync command, not hand-edited"
      - "42/42/42 inventories and recursive diff count 0"
    review_checkpoint: "SPEC_COMPLIANCE: AC-011/012 and canonical ownership pass. CODE_QUALITY: EN/VI headings, links, frontmatter, and references are complete and UTF-8."
    verification_hint: "Run runtime sync, runtime-parity test, pack audit, recursive artifact-governance diff, link/frontmatter checks, and encoding checks."
  - id: "T10"
    owner_role: "developer"
    name: "Apply v2.5.0 identity and align current bilingual surfaces"
    objective: "Make every current candidate surface report v2.5.0/42 while preserving all version-scoped history."
    paths_in_scope:
      - "workflow-bundle.manifest.json"
      - "packages/workflow-bundle/{workflow-bundle.manifest.json,package.json,bin/wfc.js,README.md,README.vi.md}"
      - "README.md"
      - "README.vi.md"
      - "docs/{publish-surface,workflow-docs-map,workflow-bundle-quickstart}.{md,vi.md}"
      - "docs/releases/workflow-bundle-v2.5.0.md"
    dependencies: ["T8 RED", "T9 review PASS"]
    outputs_expected:
      - "Structured version bump through wfc version bump 2.5.0 followed by explicit doc review"
      - "Placeholder-free v2.5.0 release note with CHANGE-003, compatibility, verification, rollback, and gate boundaries"
      - "Bilingual current-candidate surfaces at v2.5.0/42; frozen historical version/count pairs unchanged"
    review_checkpoint: "SPEC_COMPLIANCE: AC-013 and no-publication boundary pass. CODE_QUALITY: no broad replacement, placeholder, broken link, or EN/VI contradiction."
    verification_hint: "Run release-surface and bump-version tests, grep version/count claims by file, compare frozen-note SHA-256, and run UTF-8/link checks."
  - id: "T11"
    owner_role: "developer"
    name: "Integrated source verification, two-tier review, and candidate-input freeze"
    objective: "Close source-level regressions and freeze a clean package input before any candidate exists."
    paths_in_scope:
      - "All T8-T10 paths"
      - "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s07.implementation.md"
      - "changes/CHANGE-003/execution/task-status.md"
    dependencies: ["T9 review PASS", "T10 review PASS"]
    outputs_expected:
      - "36/36 unit files plus workflow validators, fixtures, planning, pack audit, source bundle smoke, syntax, security heuristics, UTF-8, and diff checks green"
      - "Final s07 spec-compliance then code-quality review with no HIGH finding"
      - "Clean candidate-input commit or explicit immutable source-state identifier; no tracked candidate-input mutation after this point"
    review_checkpoint: "SPEC_COMPLIANCE first across AC-001 through AC-016; CODE_QUALITY second across the complete delta. Any FAIL returns to the owning task."
    verification_hint: "Run the complete pre-candidate matrix, verify unrelated dirty paths unchanged, finalize s07 evidence, then freeze candidate inputs."
  - id: "T12"
    owner_role: "developer"
    name: "Build one retained candidate and run exact-artifact install/update"
    objective: "Prove the exact v2.5.0 tarball installs and updates correctly in every supported mode/scope."
    paths_in_scope:
      - "packages/workflow-bundle/workflow-bundle-2.5.0.tgz"
      - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
      - "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s08.verification.md"
    dependencies: ["T11 PASS and candidate inputs frozen"]
    outputs_expected:
      - "One retained candidate with filename, source identifier, package inventory, and SHA-256"
      - "Exact-artifact Codex/Claude x global/project install/update 4/4"
      - "42 managed skills, artifact-governance present, unmanaged hash/mode changes 0"
    review_checkpoint: "SPEC_COMPLIANCE: AC-014/016 and immutable-artifact rule pass. CODE_QUALITY: smoke consumes the retained path and reports exact digest."
    verification_hint: "npm pack once; run package inspection and exact-artifact smoke with the retained path; any candidate-input change invalidates and returns to T11."
  - id: "T13"
    owner_role: "qc"
    name: "Prove exact v2.5.0-to-v2.4.0 rollback and hand off to gates"
    objective: "Establish known-good rollback and aggregate final evidence without publishing or self-approving."
    paths_in_scope:
      - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
      - "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s08.verification.md"
      - "changes/CHANGE-003/execution/task-status.md"
    dependencies: ["T12 PASS"]
    outputs_expected:
      - "Retained v2.4.0 digest match before execution"
      - "Rollback 4/4, 42-to-41, artifact-governance absent, unmanaged hash/mode changes 0"
      - "Regression/compatibility summary and separate DoD, Release, and Business Acceptance handoff"
    review_checkpoint: "SPEC_COMPLIANCE: AC-015 and exact known-good artifact pass. CODE_QUALITY: no checkout, tag, or convenience alias substitutes for either tarball."
    verification_hint: "Run serialized rollback matrix with absolute candidate and rollback tarball paths plus expected SHA-256; then rerun candidate digest and no-mutation checks."
dependencies_global:
  - "Task Plan receipt -> T8 -> T9 -> review -> T10 -> review -> T11 -> T12 -> T13"
  - "T12 and T13 are sequential because they share isolated install roots and immutable artifact evidence."
risk_notes:
  - "No subagent: release tests, runtime sync, version surfaces, and candidate evidence share ownership and strict ordering."
  - "Reuse the existing worktree; keep the v2.4.0 worktree/tarball until T13 and DoD finish."
  - "Any spec drift, historical digest change, unmanaged mutation, or candidate-input drift blocks the next task."
verification_plan:
  - "Per-task verification_hint is mandatory; T8 RED and T9/T10 GREEN evidence are recorded."
  - "Pre-candidate T11 runs unit, validators, fixtures, planning, audit, smoke, syntax/security heuristics, UTF-8, and diff checks."
  - "Post-freeze T12/T13 use exact retained artifacts for 4/4 install/update and 4/4 rollback."
notes_for_implementation: "Execute sequentially in the existing worktree. Do not touch unrelated main-tree dirt, do not hand-edit generated runtimes, and stop at s08 human gates without tag/publication/merge/cleanup."
```

### Verification Plan Delta
- TDD: T8 records RED; T9 and T10 supply the minimum changes to reach GREEN.
- Targeted review: after T9 and T10, always `SPEC_COMPLIANCE -> CODE_QUALITY`.
- Pre-candidate: `npm run validate:workflow:unit`, workflow validators/fixtures/planning, pack audit, bundle smoke, `node --check`, security heuristics, UTF-8, link and diff checks.
- Candidate: one `workflow-bundle-2.5.0.tgz`, recorded SHA-256 and inventory, exact 4/4 install/update.
- Rollback: exact retained v2.4.0 tarball SHA-256 `44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e`, serialized 4/4.

### Governance Checks Delta
```yaml
checklist_applied: "project-context/checklists/default.md"
checks:
  - { id: "GOV-D1", check: "Execution-oriented paths and verify methods", result: "PASS", evidence: "T8-T13 each name paths, outputs, dependencies, review, and verification." }
  - { id: "GOV-D2", check: "TDD for changed behavior", result: "PASS", evidence: "T8 RED precedes T9/T10 GREEN; exact-artifact harnesses fail loudly on unresolved inputs." }
  - { id: "GOV-D3", check: "Worktree isolation", result: "PASS", evidence: "Existing P2 worktree reused; no second worktree and no main production edits." }
  - { id: "GOV-D4", check: "Early two-tier review", result: "PASS", evidence: "T9/T10 targeted checkpoints and T11 integrated review use spec compliance before code quality." }
  - { id: "GOV-D5", check: "Delegation discipline", result: "PASS", evidence: "Agentic sequential execution retained because paths and evidence are tightly coupled." }
  - { id: "GOV-D6", check: "Human-controlled gate", result: "PASS", evidence: "Developer Task Plan receipt was sealed before T8 and must be resealed after final metadata normalization." }
blocking_items: []
owner: "developer"
next_action: "Proceed through T8-T13 after the trusted Task Plan receipt matches this finalized artifact."
```

### Brownfield Delivery Plan Delta
```yaml
owned_scope: "CHANGE-003 paths listed in T8-T13 inside the existing artifact-governance-enforcement worktree, plus canonical workflow evidence only."
regression_checkpoints:
  - "After T9: runtime parity, pack audit, and unchanged completed P2 tests."
  - "After T10: release-surface GREEN and frozen historical hashes unchanged."
  - "T11: full source gate before candidate creation."
compatibility_checkpoints:
  - "Bilingual current surfaces distinguish prepared v2.5.0 candidate from historical/current published versions."
  - "T12 preserves unmanaged hashes/modes for 4/4 update cases."
  - "T13 proves exact 42-to-41 rollback and artifact-governance removal."
migration_or_backfill_steps: ["None; the installer adds or removes one managed skill directory through existing semantics."]
rollback_or_restore_steps:
  - "Before candidate: revert only the owning task batch inside the worktree."
  - "After candidate: discard invalid v2.5.0 and return to T11; never patch a tarball."
  - "Known-good rollback uses the retained v2.4.0 tarball, never a source checkout."
branch_and_worktree_rule: "No merge, cleanup, or removal until s08 DoD and branch-finish review."
```

### Traceability Delta
```yaml
upstream:
  - "artifact-governance-enforcement.s05.technical-approach.md#CHANGE-003 Technical Approach Delta"
  - "artifact-governance-enforcement.s04.acceptance-criteria.md#CHANGE-003 Acceptance + DoR Delta"
acceptance_to_task:
  - "AC-011 -> T8, T9, T11"
  - "AC-012 -> T8, T9, T11, T12"
  - "AC-013 -> T8, T10, T11"
  - "AC-014 -> T8, T12"
  - "AC-015 -> T8, T13"
  - "AC-016 -> T11, T12, T13"
coverage: "6/6 delta criteria mapped; 6/6 tasks have exact paths and verify hints."
next_step: "s07 CHANGE-003 implementation after developer Task Plan approval"
```

### Delta Handoff
- First: T8 fail-first contracts and historical digests.
- Implementation boundary: T8-T11; T12-T13 are exact-artifact verification and gate evidence.
- Blocking dependency: fresh Task Plan receipt with `digest_match=true`.
- Stop boundary: no tag, registry publish, live global update, merge, or worktree cleanup.

### Audit Delta
```yaml
step: "s06 Task Plan"
status: "PASS"
checks:
  - criterion: "Every task names owned paths, dependencies, outputs, review checkpoint, and verification hint"
    result: "PASS"
    evidence: "T8-T13 each contain all six execution fields and the path map names each ownership group."
  - criterion: "All AC-011 through AC-016 have task and verification coverage"
    result: "PASS"
    evidence: "BA lane and Traceability Delta map 6/6 criteria; Verification Plan covers source, candidate, and rollback tiers."
  - criterion: "Candidate-input freeze and no-publication boundaries are explicit"
    result: "PASS"
    evidence: "T11 freezes candidate inputs before T12; T12/T13 consume exact artifacts; scope guards prohibit publication, merge, and cleanup."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "The plan was authored and validated in the current s06 cycle."
gaps:
  - "The refreshed Task Plan trusted receipt was approved before implementation; final metadata normalization requires the same human gate to be resealed."
risk_level: "MEDIUM"
next_action: "Continue s07 only while the developer Task Plan receipt matches this finalized digest."
```

Audit conclusion: **PASS for authoring quality; s07 is open only while the human Task Plan receipt is APPROVED with `digest_match=true`.**
