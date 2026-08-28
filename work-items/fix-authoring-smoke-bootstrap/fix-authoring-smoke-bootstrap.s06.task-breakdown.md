---
artifact_id: "fix-authoring-smoke-bootstrap.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "fix-authoring-smoke-bootstrap"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: BUG
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
change_id: "CHANGE-006"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-006/proposal.md"
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/fix-authoring-smoke-bootstrap.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
interaction_mode: self
execution_roles:
  - "developer"
  - "qc"
  - "devops"
  - "po"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
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
  spec_reviewed_at: "2026-08-24T10:42:16.000Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-08-24T10:42:16.000Z"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-24T14:25:32.000Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-24T14:25:32.000Z"
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
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "brainstorming"
  - "system-design"
  - "task-breakdown-planner"
  - "ci-cd-release"
  - "worktree-discipline"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s04.acceptance-criteria.md"
  - "product-specs/cards/fix-authoring-smoke-bootstrap.md"
  - "changes/CHANGE-006/proposal.md"
linked_artifacts:
  - "changes/CHANGE-006/design.md"
  - "changes/CHANGE-006/tasks.md"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Proposed SDD Light design and delivery plan: rewrite and rename the stale authoring-smoke case
> so it proves approved TD-01 bootstrap provenance, preserve all approval controls, prepare one exact
> v2.6.1 GitHub artifact, and release only after complete local and remote evidence. The shared main
> worktree is dirty, so s07 uses an isolated worktree. Developer approval of both Approach and Task
> Plan is still required; this note does not open implementation.

## Step Contract
```yaml
step: "s06 Task Plan hosting s05 Technical Approach"
goal: "Produce one human-reviewable technical direction and execution plan that can correct the stale smoke contract, prepare v2.6.1, and verify/release the exact artifact without changing TD-01 or contaminating the patch."
value: "Developer, QC, DevOps, and PO can execute and review the patch from explicit paths, dependencies, evidence thresholds, approval points, and rollback controls instead of re-inferring the design during s07."
scope_in:
  - "Resolve ODC-001 by comparing rewrite, remove/rely-on-unit, and production-reversal directions."
  - "Lock the smallest smoke-harness change that proves legacy-scaffold bootstrap, REPORT_BOOTSTRAPPED provenance, and explicit approval state."
  - "Define the v2.6.0 to v2.6.1 metadata, documentation, candidate, rollback, GitHub CI, tag, release, and evidence path."
  - "Map every REQ-001 through REQ-007 and AC-001 through AC-008 to implementation, verification, release, or closeout tasks."
  - "Require isolated-worktree execution, a fail-first harness correction cycle, early two-tier review, and exact-artifact controls."
scope_out:
  - "Editing production approval-path logic, trusted-receipt behavior, workflow topology, public API/event/data contracts, schema, runtime deployment, or npm publication."
  - "Executing s07, changing version/release files, creating a branch/worktree, pushing, tagging, publishing, or updating CHANGE-004 in this step."
  - "Moving or recreating v2.6.0, rewriting its historical failed run, or including unrelated dirty main-worktree changes."
inputs_required:
  - "Digest-matched Spec receipt by BA and DoR receipt by QC for the approved s04 host."
  - "Approved CHANGE-006 and work-item receipts plus the approved Spec Card."
  - "Approved TD-01 implementation/regression evidence and the stale 13-case authoring-smoke source."
  - "Workflow Guardrails dependency graph, 39-file unit baseline, release-candidate and rollback harnesses, retained v2.6.0 artifact, and immutable v2.6.0 identity."
  - "Current dirty-worktree inventory and existing in-repo worktree convention."
outputs_required:
  - "Completed Option Analysis and Technical Approach in this Light s06 host."
  - "Brownfield Impact Analysis, CI/CD Release Controls, and Brownfield Delivery Plan."
  - "Execution-oriented task breakdown with owned paths, dependencies, review checkpoints, and per-task verification hints."
  - "Complete SDD traceability, governance checks, and step audit ready for Developer review."
done_when:
  - "One smallest-correct option is recommended with alternatives and validation conditions."
  - "Component, interface, compatibility, failure, rollback, observability, worktree, and release boundaries are explicit."
  - "Every requirement and acceptance criterion has at least one task and test/evidence path."
  - "The task sequence includes isolation, fail-first correction, early spec-compliance then code-quality review, full local verification, exact candidate/rollback proof, remote 9/9, human gates, publication, and post-release evidence."
  - "Workflow, SDD, change, planning, UTF-8, and whitespace validation pass for the proposed artifacts."
constraints:
  hard_constraints:
    - "Approved TD-01 is the production source of truth and zero production approval-path files may change."
    - "v2.6.0 target 7c88f7d564f4c49daecc6eaec345002163f9e9ec and artifact SHA-256 5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9 remain immutable."
    - "The release boundary is GitHub-only and all nine required Workflow Guardrails job instances must pass before Release approval."
    - "Approach and Task Plan remain human-controlled Developer gates; s07 is forbidden until both trusted receipts match this note."
  soft_constraints:
    - "Keep one end-to-end smoke case and the 13-case total instead of duplicating the dedicated TD-01 unit fixture."
    - "Reuse the current CLI, package, GitHub Actions, release-candidate, and rollback paths."
  prohibited_actions:
    - "Do not weaken or delete approval authority checks to make the smoke green."
    - "Do not mutate user-owned dirty paths or clean any existing branch/worktree before s08."
    - "Do not call the verification-harness correction strict production TDD; retain honest RED-to-GREEN evidence instead."
    - "Do not create or move v2.6.0/v2.6.1 tags before the Release gate."
  compliance_checks:
    - "Compare the proposed behavior directly with REQ-001/AC-001 and TD-01 evidence."
    - "Audit owned paths against git status and package inventory before candidate freeze."
    - "Require two-tier review verdicts in the order spec compliance then code quality."
    - "Bind release approval to the frozen candidate digest, rollback digest, and remote 9/9 evidence."
risks:
  - id: "S06-RISK-001"
    description: "A shallow test edit could go green without proving bootstrap provenance or explicit approval."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "The recommended case asserts no report after read-only status, then request_source, REPORT_BOOTSTRAPPED, approval_status, and reviewed_by after explicit approve."
    contingency: "Fail spec-compliance review and return to the locked AC-001/AC-002 boundary."
    owner: "developer/qc"
    status: OPEN
  - id: "S06-RISK-002"
    description: "Version and release-surface changes could enlarge the patch or make the artifact internally inconsistent."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Use the existing version-bump tool, enumerate manual review paths, and run release-surface plus exact-artifact checks."
    contingency: "Discard the candidate, restore only owned release surfaces, and rebuild from the reviewed source."
    owner: "developer/devops"
    status: OPEN
  - id: "S06-RISK-003"
    description: "Unrelated main-worktree changes could contaminate the commit or tarball."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Use the required in-repo worktree, explicit owned paths, clean commit, npm pack inventory, and source fingerprint."
    contingency: "Stop before packaging or push and recreate the candidate from the governed anchor commit."
    owner: "developer"
    status: OPEN
  - id: "S06-RISK-004"
    description: "Publication could occur after partial CI or with an artifact different from the reviewed candidate."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Release requires remote 9/9, exact candidate/rollback 4/4, immutable SHA-256 evidence, and DevOps/QC approval."
    contingency: "Do not publish; if already published, keep the tag immutable and issue a new governed patch."
    owner: "devops/qc"
    status: OPEN
timebox:
  target_duration: "One s06 authoring and validation pass; s07-s08 execute in subsequent gated turns."
  deadline: ""
  escalation_rule: "Return to s04/spec change if implementation would require a production approval-path, public-contract, runtime-topology, or npm-scope change."
```

## Input Readiness
```yaml
step: "s06 Task Plan hosting s05 Technical Approach"
status: READY
available_inputs:
  - "Spec receipt APPROVED by BA with digest_match=true."
  - "DoR receipt APPROVED by QC with digest_match=true; BA remains the recorded co-reviewer."
  - "Approved Spec Card REQ-001 through REQ-007 and AC-001 through AC-008."
  - "Approved TD-01 regression showing legacy-scaffold, REPORT_BOOTSTRAPPED, and explicit approval fields."
  - "Deterministic v2.6.0 authoring-smoke failure and current stale case implementation."
  - "Existing 9-job Workflow Guardrails graph, version bump tool, release-surface tests, exact candidate harness, rollback harness, and retained v2.6.0 tarball."
  - "Dirty main-worktree inventory and ignored in-repo .claude/worktrees convention."
missing_inputs: []
invalid_inputs: []
conflicts: []
assumptions:
  - "The v2.6.1 package retains 42 managed skills and changes no public CLI semantics."
  - "The retained immutable v2.6.0 GitHub artifact is the immediate rollback artifact for v2.6.1."
  - "Release-surface documentation may be updated to the v2.6.1 candidate boundary, while the historical v2.6.0 release note and GitHub record stay immutable."
risk_level: MEDIUM
next_action: "Seal the independently digest-bound Approach and Task Plan trusted receipts for the recorded Developer approval."
```

## Option Analysis
```yaml
goal: "Make the authoring smoke prove approved TD-01 behavior and restore a trustworthy release gate with the smallest correct brownfield delta."
ba_lane:
  business_goal: "Replace the contradictory release signal with end-to-end evidence that matches the already-approved approval behavior, then publish a traceable v2.6.1 patch."
  user_scenarios:
    - "A maintainer runs the 13-case authoring smoke and sees a controlled scaffold-only item bootstrap and approve successfully with auditable provenance."
    - "A release reviewer sees complete local, remote, candidate, rollback, tag, and digest evidence before accepting v2.6.1."
  business_rules:
    - "Persistence alone never implies prior human approval; approval fields appear only during the explicit approve action."
    - "Missing reviewed-by and non-interactive approval remain refused."
    - "A required failed or skipped job blocks release."
    - "Published tags and assets are immutable."
  scope_notes:
    - "Verification and release evidence only; no production approval semantic change."
    - "GitHub Release only; npm excluded."
  open_questions: []
dev_lane:
  repo_constraints:
    - "The stale function currently calls approve without --reviewed-by and expects a missing-report refusal."
    - "The authoring-smoke main already supplies isolated approval-root, non-interactive-fixture, and passphrase environment values."
    - "TD-01 regression already proves the detailed production contract; the smoke should add end-to-end CLI/protocol coverage without a second production implementation."
    - "The v2.6.1 package identity requires structured version, release-surface, exact-candidate, and rollback-harness alignment."
  technical_risks:
    - "Deleting the case reduces coverage from the required 13 cases."
    - "Reversing production behavior violates the approved baseline."
    - "Broad version-string replacement could rewrite historical evidence."
  integration_points:
    - "work-item-protocol approve command"
    - "workflow authoring smoke runner"
    - "workflow-bundle version/release-surface harnesses"
    - "GitHub Workflow Guardrails and GitHub Release"
  nfr_notes:
    - "13/13 local authoring smoke; 39/39 unit files; remote 9/9; exact candidate and rollback 4/4."
    - "Zero production approval-path files changed and zero required remote jobs skipped."
  baseline_context: "Brownfield v2.6.0/42 is published and immutable; its required run is red only because this verification case contradicts approved TD-01."
options:
  - "Option A - Rewrite and rename the existing smoke case"
  - "Option B - Remove the stale case and rely on TD-01 unit regression"
  - "Option C - Restore the old production refusal"
option_details:
  - name: "Option A - Rewrite and rename the existing smoke case"
    summary: "Keep one case in the 13-case suite, rename it to describe bootstrap, add the required reviewer argument, assert no report after read-only status, then assert legacy-scaffold provenance and explicit approval after approve."
    pros:
      - "Smallest delta on the failing end-to-end path."
      - "Preserves 13-case coverage and directly satisfies AC-001/AC-002."
      - "Reuses the existing fixture environment and production behavior."
    cons:
      - "Some assertion overlap with the dedicated TD-01 regression remains."
      - "The case/function name changes in logs, so release evidence must use the new name."
    risks:
      - "Assertions could become too detailed or brittle if they inspect implementation-only fields."
  - name: "Option B - Remove the stale case and rely on TD-01 unit regression"
    summary: "Delete the failing authoring-smoke case and treat approval-path-defects.test.js as the only bootstrap proof."
    pros:
      - "Very small source diff."
      - "Avoids duplicate assertions."
    cons:
      - "Drops the required smoke inventory from 13 to 12."
      - "Loses end-to-end authoring CLI/protocol coverage in the release gate."
    risks:
      - "A wiring or environment regression could escape while the focused unit fixture remains green."
  - name: "Option C - Restore the old production refusal"
    summary: "Change approve so a missing report is rejected again and preserve the old smoke expectation."
    pros:
      - "The old smoke case would pass with little test change."
    cons:
      - "Directly violates approved TD-01 and the current Spec Card."
      - "Reopens a production approval defect and would require a new spec change."
    risks:
      - "Scaffold-created work items become unapprovable again."
recommended_option: "Option A - Rewrite and rename the existing smoke case"
recommendation_reason: "Option A is the only direction that preserves the approved behavior, the 13-case end-to-end signal, and the existing component boundary with a one-function harness delta. Option B weakens coverage and Option C violates the frozen baseline."
validation_plan:
  - "Retain the unchanged v2.6.0 failure as RED evidence."
  - "Run the rewritten case through the full 13-case smoke and confirm request_source, REPORT_BOOTSTRAPPED, approval_status, and reviewed_by."
  - "Run TD-01 plus negative reviewed-by/non-interactive fixtures to prove authority controls remain intact."
  - "Run full local and remote release gates before publication."
notes_for_next_step: "Ready for system design and task planning in this same Light host; Developer must approve the recommendation before s07."
```

## Technical Approach
```yaml
design_problem: "The required end-to-end authoring smoke encodes an obsolete missing-report refusal and now fails before reaching that assertion because reviewed-by is mandatory, while approved production behavior intentionally bootstraps the missing report during explicit approval."
business_rule_trace:
  - "REQ-001/AC-001 -> the smoke observes no persisted report after read-only status, then successful explicit approval with legacy-scaffold and REPORT_BOOTSTRAPPED provenance."
  - "REQ-002/AC-002 -> only the smoke/release verification surfaces change; reviewed-by, interactive-human, passphrase, trusted receipt, and digest controls remain unchanged and are regression-tested."
  - "REQ-003/AC-003 -> preserve 13 cases and execute TD-01, 39-file unit, pack audit, and bundle smoke."
  - "REQ-004/AC-004 -> Release stays blocked until the seven sequential jobs plus Node 18/22 both pass."
  - "REQ-005/AC-005/AC-008 -> version and publish one exact GitHub-only v2.6.1 tarball with candidate/rollback 4/4 and remote digest equality."
  - "REQ-006/AC-006 -> never modify v2.6.0 tag, asset, release, or retained identity."
  - "REQ-007/AC-007 -> update REL-F01 and archive readiness only after v2.6.1 evidence exists."
design_options:
  - name: "Option A - Rewrite and rename the existing smoke case"
    summary: "Replace the obsolete negative expectation with one controlled successful-bootstrap scenario in the same suite."
    pros:
      - "Smallest correct source delta."
      - "Preserves end-to-end coverage and production boundaries."
    cons:
      - "Requires targeted assertions and a log-name update."
    risks:
      - "Overfitting the smoke to internal report structure."
  - name: "Option B - Remove the smoke case"
    summary: "Rely only on the dedicated TD-01 regression."
    pros:
      - "Small diff."
    cons:
      - "Fails the 13-case and end-to-end requirements."
    risks:
      - "Release wiring regression is no longer covered."
rejected_options:
  - name: "Option B - Remove the smoke case"
    reason: "It violates AC-003 and weakens the release guardrail."
  - name: "Option C - Restore the old production refusal"
    reason: "It violates REQ-001/REQ-002 and approved TD-01."
recommended_design: "Rename runCaseMutatingActionRequiresReport and its case label to a bootstrap-oriented name; preserve the scaffold and read-only status precondition; prove status did not persist a report; invoke the existing approve path with reviewed-by under the existing isolated approval fixture; assert the persisted report has request_source=legacy-scaffold, audit_events containing REPORT_BOOTSTRAPPED, approval_status=APPROVED, and reviewed_by=ba. Keep all production approval-path files unchanged. Then use the existing version/release toolchain to prepare and verify v2.6.1/42 against immutable v2.6.0 rollback."
recommendation_reason: "This design corrects the contradictory test at its source, adds no abstraction or production branch, preserves both detailed unit and end-to-end coverage, and reuses the current package and GitHub release architecture."
component_changes:
  - component: "Workflow authoring smoke"
    paths:
      - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"
    change: "Rewrite and rename one stale case; add explicit approval/provenance assertions."
  - component: "Structured v2.6.1 identity"
    paths:
      - "workflow-bundle.manifest.json"
      - "packages/workflow-bundle/workflow-bundle.manifest.json"
      - "packages/workflow-bundle/package.json"
      - "packages/workflow-bundle/bin/wfc.js"
    change: "Advance the package identity from 2.6.0 to 2.6.1 with the existing bump tool."
  - component: "Release verification and public candidate surfaces"
    paths:
      - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
      - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
      - "packages/workflow-bundle/test/release-surface.test.js"
      - "docs/releases/workflow-bundle-v2.6.1.md"
      - "reviewed English/Vietnamese current-release documentation listed in TASK-003"
    change: "Align current-candidate claims and exact rollback from v2.6.1 to retained v2.6.0 without rewriting historical v2.6.0 evidence."
  - component: "Governance and finding evidence"
    paths:
      - "work-items/fix-authoring-smoke-bootstrap/"
      - "changes/CHANGE-006/"
      - "changes/CHANGE-004/tasks.md"
      - "changes/CHANGE-004/archive-metadata.md"
    change: "Record execution, verification, release, REL-F01 disposition, and archive reassessment at the appropriate gated step."
data_flow:
  - "Scaffold-only fixture -> read-only status -> confirm no persisted report -> explicit approve with reviewed-by -> bootstrapped report and trusted approval evidence."
  - "Reviewed source commit -> version-aligned package payload -> npm pack tarball -> SHA-256 -> exact install/update smoke and exact v2.6.1 to v2.6.0 rollback smoke."
  - "Approved commit -> GitHub Workflow Guardrails 9/9 -> QC/DevOps release decision -> annotated v2.6.1 tag and exact asset -> remote download digest verification."
  - "v2.6.1 evidence -> REL-F01 resolved -> CHANGE-004 archive readiness reassessed -> PO Business Acceptance and final closeout."
interface_changes:
  - "No public CLI command, flag, report, receipt, API, event, data, schema, or runtime-deployment contract changes."
  - "Only the public version/help label advances to v2.6.1 and the authoring-smoke case log name reflects bootstrap behavior."
failure_modes:
  - scenario: "The smoke turns green without proving bootstrap provenance."
    impact: "REL-F01 appears resolved while the end-to-end contract remains untested."
    guardrail: "Require the four observable report/approval assertions and preserve TD-01 regression."
  - scenario: "Approval authority is bypassed in the fixture."
    impact: "A green test could normalize unsafe non-interactive approval."
    guardrail: "Use only the existing test-only environment switch and passphrase; keep reviewed-by and negative normal-mode fixtures green."
  - scenario: "Version/docs/tests disagree about 2.6.1 or historical text is blindly rewritten."
    impact: "Candidate identity or release claims become unreliable."
    guardrail: "Use structured bump first, manually review named current surfaces, protect prior release-note digest, and run release-surface tests."
  - scenario: "Dirty main files enter the patch or package."
    impact: "Unapproved changes ship."
    guardrail: "Required isolated worktree, exact owned paths, clean commit, npm pack inventory, and source fingerprint."
  - scenario: "A required GitHub job fails or is skipped."
    impact: "Release evidence is incomplete."
    guardrail: "Block Release unless all 9 required job instances conclude success."
  - scenario: "Uploaded bytes differ from the frozen candidate."
    impact: "The released artifact was not verified."
    guardrail: "Download the final asset and compare SHA-256 before closeout; never move the tag to hide a mismatch."
compatibility_impact:
  - "Node 18 and Node 22 remain required and are both verified."
  - "Managed inventory remains 42 for canonical, Codex, and Claude surfaces."
  - "Existing approval semantics and persisted report/receipt formats are unchanged."
  - "The v2.6.0 historical release note, tag target, asset bytes, and failed-run evidence remain unchanged."
rollback_impact:
  - "Before publication, discard the v2.6.1 candidate and restore only owned patch surfaces."
  - "After publication, install the retained immutable v2.6.0 tarball and verify version 2.6.0, 42 skills, and unmanaged-file preservation in all four Codex/Claude global/project scenarios."
  - "Never retarget v2.6.1 or v2.6.0; a failed published patch is followed by another governed patch."
observability_hooks:
  - "Authoring smoke prints 13 PASS case lines and a 13-case success summary."
  - "TD-01 and authority-negative regression output."
  - "39/39 unit-file summary, 42/42/42 inventory, pack audit, and source bundle smoke."
  - "Exact candidate and rollback 4/4 output plus SHA-256 values."
  - "GitHub run ID, commit SHA, and 9/9 successful required jobs."
  - "Annotated tag object/target, release URL, downloaded asset digest, and unchanged v2.6.0 identity."
constraints_applied:
  - "SDD Light brownfield/quick/default/agentic/self eligibility remains valid."
  - "Smallest correct delta and zero production approval-path changes."
  - "AI proposes; Developer, QC, DevOps, and PO retain their human-controlled gates."
  - "GitHub-only release and immutable semantic-version tags."
validation_plan:
  - "Retain failing v2.6.0 authoring-smoke evidence, then run the same suite after the minimal case rewrite."
  - "Run TD-01, approval authority negatives, full unit, workflow validators, pack audit, source bundle smoke, and release-surface checks."
  - "Build once from clean reviewed source, hash/inventory, and run exact candidate plus v2.6.1 to v2.6.0 rollback 4/4."
  - "Require GitHub Workflow Guardrails 9/9 on the approved commit before Release approval."
  - "After publication, verify tag target, remote asset digest, and unchanged v2.6.0 target/digest."
specialized_followups:
  - skill: "ci-cd-release"
    reason: "Lock immutable artifact, remote job, approval, publication, and rollback controls."
  - skill: "worktree-discipline"
    reason: "Apply at s07 because shared-main contamination and release risk make isolation mandatory."
notes_for_next_step: "Task breakdown may proceed from Option A; no implementation starts until Developer seals Approach and Task Plan and the protocol activates s07."
```

## CI/CD Release Controls
```yaml
pipeline_scope: "GitHub-only patch release of workflow-bundle v2.6.1 from one reviewed source state and one exact tarball; no application runtime deployment or npm publication."
source_strategy:
  branch_model: "Isolated codex/fix-authoring-smoke-bootstrap worktree branch integrated into main only after local review and verification; branch/worktree retained until s08 closeout."
  triggers:
    - "Local focused and integrated verification on the isolated branch."
    - "GitHub Workflow Guardrails on push to main; workflow_dispatch only for additional evidence, never as a substitute for a changed commit."
build_and_verify:
  stages:
    - "pre-merge: stale-case RED evidence, minimal harness correction, two-tier review, authoring smoke 13/13, TD-01, 39/39 unit, workflow validators, UTF-8, whitespace."
    - "build-publish candidate: version/release-surface alignment, runtime sync where required by prepack, npm pack, inventory, and SHA-256."
    - "pre-release: exact candidate install/update 4/4, exact rollback to v2.6.0 4/4, pack audit, bundle smoke, remote Workflow Guardrails 9/9, QC DoD, DevOps/QC Release approval."
    - "post-release: resolve annotated tag target, download the GitHub asset, compare digest, recheck v2.6.0 immutability, disposition REL-F01, and obtain PO Business Acceptance."
  cache_strategy:
    - "Use a fresh isolated npm cache for candidate and rollback proof."
    - "Do not treat cached tarballs or mutable aliases as artifact identity."
  required_checks:
    - "Workflow Tooling"
    - "Workflow Artifacts"
    - "Workflow SDD"
    - "Workflow Changes"
    - "Workflow Execution"
    - "Workflow Planning"
    - "Workflow Authoring Smoke"
    - "Release Candidate Node 18"
    - "Release Candidate Node 22"
artifact_flow:
  registry: "GitHub Release asset only"
  artifact_types:
    - "workflow-bundle-2.6.1.tgz"
    - "annotated tag v2.6.1"
    - "SHA-256 and npm pack inventory evidence"
  tagging_strategy:
    - "Create immutable semantic tag v2.6.1 only after Release approval."
    - "Never use latest as the source of truth and never move v2.6.0 or v2.6.1."
  provenance_controls:
    - "Record candidate source commit, package-payload fingerprint, tarball SHA-256, rollback SHA-256, and GitHub run ID."
    - "Require the uploaded/downloaded asset digest to equal the frozen local candidate digest."
promotion_flow:
  - from: local
    to: prod
    conditions:
      - "Reviewed isolated source and exact local candidate/rollback evidence pass."
      - "Approved commit has remote 9/9 success."
      - "QC passes Technical Verification and DoD."
      - "DevOps and QC approve Release."
    automation_level: "Human-gated GitHub tag and release creation; no automatic publication."
approval_controls:
  - "Developer approves Approach and Task Plan before s07."
  - "QC approves Technical Verification and DoD from s08 evidence."
  - "DevOps and QC approve Release only after exact artifact and remote 9/9 evidence."
  - "PO approves Business Acceptance after published-asset identity and REL-F01 evidence are available; if post-release evidence changes the s08 host digest, affected trusted receipts must be resealed before DONE."
release_controls:
  pre_release:
    - "No required job failed or skipped."
    - "Candidate source/payload and tarball digests are frozen and unchanged."
    - "v2.6.0 retained artifact digest is rechecked as rollback input."
    - "No npm credentials or npm publish action is used."
  post_release:
    - "Tag dereferences to the approved commit."
    - "Downloaded asset SHA-256 equals the frozen candidate."
    - "v2.6.0 tag target and asset digest remain unchanged."
    - "REL-F01 and CHANGE-004 archive readiness are updated without editing the sealed CHANGE-004 s08 note."
rollback_controls:
  - "Before release, discard the candidate and restore only owned source/release surfaces."
  - "After release, use the immutable v2.6.0 tarball as the known-good artifact and run Codex/Claude global/project rollback 4/4."
  - "If the published v2.6.1 artifact is wrong, do not retarget the tag; open a new patch."
pipeline_risks:
  - "Sequential GitHub dependencies skip Node matrix jobs after an upstream failure."
  - "Evidence-only commits after a green source commit can change the intended tag target."
  - "A manual upload can select bytes other than the frozen candidate."
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: "The existing workflow file is read-only for this change. Treat every final tag-target commit as needing its own complete 9/9 run; rebuild/reverify the candidate whenever a package-payload file changes."
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "One authoring-smoke scenario and its case label."
  - "Structured bundle version/help identity and release verification tests."
  - "Current-candidate English/Vietnamese public docs plus a new v2.6.1 release note."
  - "CHANGE-006 execution evidence and CHANGE-004 REL-F01/archive evidence."
compatibility_risks:
  - "The test rewrite must not alter work-item approval code or normalize unsafe fixture-only approval in production."
  - "Current-release docs must advance deliberately without editing historical v2.6.0 release evidence."
  - "Rollback expectations must use v2.6.0/42 while preserving unmanaged files and modes."
  - "Evidence-only changes after candidate freeze must not alter package payload bytes."
migration_notes:
  - "No API, schema, data, configuration, runtime, or consumer migration."
  - "Version metadata advances from 2.6.0 to 2.6.1; installed users may explicitly install/update or roll back with immutable artifacts."
rollback_notes:
  - "Before publication, discard v2.6.1 and keep v2.6.0 current."
  - "After publication, reinstall retained workflow-bundle-2.6.0.tgz and verify four install scopes."
  - "A published tag is never moved; remediation is roll-forward with another patch."
```

## Artifact Chính
```yaml
implementation_goal: "Correct the one stale end-to-end smoke contract and deliver an internally consistent, fully verified, human-gated v2.6.1 GitHub patch without touching production approval behavior or unrelated user work."
ba_lane:
  acceptance_coverage:
    - "REQ-001/AC-001 -> TASK-002 and TEST-001/TEST-002."
    - "REQ-002/AC-002 -> TASK-002, TASK-004, TASK-005 and TEST-002/TEST-003."
    - "REQ-003/AC-003 -> TASK-005 and TEST-001 through TEST-006."
    - "REQ-004/AC-004 -> TASK-007 and TEST-007."
    - "REQ-005/AC-005/AC-008 -> TASK-003, TASK-006, TASK-008, TASK-009 and TEST-005/TEST-006/TEST-008."
    - "REQ-006/AC-006 -> TASK-006 and TASK-009 with TEST-009."
    - "REQ-007/AC-007 -> TASK-009 and TEST-010."
  scope_guards:
    - "Zero production approval-path files and zero .github workflow files change."
    - "No npm publication, public-contract change, migration, runtime deployment, or extra managed skill."
    - "Do not stage .gitignore, trusted-receipt-namespace, worktree-and-closure-integrity, diagram adapter, community-pack, CHANGE-005, or other unrelated dirty paths."
    - "Do not edit docs/releases/workflow-bundle-v2.6.0.md or mutate the v2.6.0 tag/release/asset."
  human_review_points:
    - "Developer approves Approach and Task Plan before activation."
    - "Developer performs s07 spec-compliance review before code-quality review."
    - "QC approves Technical Verification and DoD."
    - "DevOps and QC approve Release after remote 9/9 and exact-artifact evidence."
    - "PO approves Business Acceptance after final release evidence; stale receipts are resealed if the s08 host changes."
dev_lane:
  path_map:
    - area: "smoke_contract"
      paths:
        - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"
    - area: "structured_version"
      paths:
        - "workflow-bundle.manifest.json"
        - "packages/workflow-bundle/workflow-bundle.manifest.json"
        - "packages/workflow-bundle/package.json"
        - "packages/workflow-bundle/bin/wfc.js"
    - area: "release_verification"
      paths:
        - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
        - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
        - "packages/workflow-bundle/test/release-surface.test.js"
    - area: "current_release_docs"
      paths:
        - ".claude/CLAUDE.md"
        - "README.md"
        - "README.vi.md"
        - "docs/publish-surface.md"
        - "docs/publish-surface.vi.md"
        - "docs/workflow-docs-map.md"
        - "docs/workflow-docs-map.vi.md"
        - "docs/workflow-bundle-quickstart.md"
        - "docs/workflow-bundle-quickstart.vi.md"
        - "packages/workflow-bundle/README.md"
        - "packages/workflow-bundle/README.vi.md"
        - "docs/releases/workflow-bundle-v2.6.1.md"
    - area: "governance_evidence"
      paths:
        - "work-items/fix-authoring-smoke-bootstrap/"
        - "changes/CHANGE-006/"
        - "changes/CHANGE-004/tasks.md"
        - "changes/CHANGE-004/archive-metadata.md"
  technical_sequence:
    - "TASK-001 -> activate only after receipts, record s07, create governed anchor, and isolate the worktree."
    - "TASK-002 -> retain RED evidence and apply the one-case smoke correction."
    - "TASK-003 -> prepare v2.6.1 structured identity, release tests, current docs, and release note."
    - "TASK-004 -> review spec compliance first, then code/content quality."
    - "TASK-005 -> run focused and full local verification."
    - "TASK-006 -> freeze/hash/inventory and prove the exact candidate and rollback."
    - "TASK-007 -> integrate/push the approved commit and require remote 9/9."
    - "TASK-008 -> conduct s08 Technical Verification, DoD, and pre-publication Release review."
    - "TASK-009 -> publish only after Release approval, verify remote identity, close Business Acceptance/REL-F01, then finalize branch/worktree only after all required s08 gates."
  tdd_targets:
    - "Verification-harness correction only: retain the unchanged stale 13-case run as RED for the contractual mismatch, apply the minimum test/harness edit, and rerun the same suite GREEN. Strict production TDD is not claimed because production behavior does not change."
task_breakdown:
  - id: TASK-001
    owner_role: developer
    name: "Open s07 and isolate the approved scope"
    objective: "After both s06 receipts pass, activate the protocol, materialize s07, preserve a clean governed anchor, and create the required in-repo worktree/branch without importing unrelated main changes."
    paths_in_scope:
      - "work-items/fix-authoring-smoke-bootstrap/"
      - "product-specs/cards/fix-authoring-smoke-bootstrap.md"
      - "changes/CHANGE-006/"
      - ".claude/worktrees/fix-authoring-smoke-bootstrap"
    dependencies:
      - "Approach receipt APPROVED with digest_match=true."
      - "Task Plan receipt APPROVED with digest_match=true."
    outputs_expected:
      - "Protocol ACTIVE at s07 with the approved write roots."
      - "Branch codex/fix-authoring-smoke-bootstrap in an isolated, clean worktree based on the governed main commit."
      - "Unrelated dirty main paths remain byte-untouched and unstaged."
    review_checkpoint: "Confirm worktree path stays inside the repo and compare its baseline commit/owned paths with this plan before any code edit."
    verification_hint: "Run gate status for approach/task_plan, protocol status, git worktree list, git status --short in both worktrees, and a scoped diff/name-only audit."
  - id: TASK-002
    owner_role: developer
    name: "Correct the stale bootstrap smoke contract"
    objective: "Turn the deterministic stale-case failure into one end-to-end successful-bootstrap proof while changing no production approval-path file."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"
    dependencies:
      - "TASK-001"
    outputs_expected:
      - "Bootstrap-oriented function and case name in the existing 13-case list."
      - "Pre-approve no-report assertion plus post-approve legacy-scaffold, REPORT_BOOTSTRAPPED, APPROVED, and reviewed_by=ba assertions."
      - "Explicit --reviewed-by argument using the existing test-only approval environment."
    review_checkpoint: "Preserve RED output before edit; after edit verify REQ-001/REQ-002 scope before looking at style."
    verification_hint: "Run npm run validate:workflow:authoring-smoke and node packages/workflow-bundle/test/approval-path-defects.test.js; confirm 13/13 and TD-01 PASS with normal authority-negative fixtures unchanged."
  - id: TASK-003
    owner_role: developer
    name: "Prepare the internally consistent v2.6.1 release surface"
    objective: "Advance structured package identity and deliberately align current-candidate docs/tests, exact candidate expectations, and v2.6.0 rollback expectations without rewriting historical evidence."
    paths_in_scope:
      - "workflow-bundle.manifest.json"
      - "packages/workflow-bundle/workflow-bundle.manifest.json"
      - "packages/workflow-bundle/package.json"
      - "packages/workflow-bundle/bin/wfc.js"
      - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
      - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
      - "packages/workflow-bundle/test/release-surface.test.js"
      - ".claude/CLAUDE.md"
      - "README.md"
      - "README.vi.md"
      - "docs/publish-surface.md"
      - "docs/publish-surface.vi.md"
      - "docs/workflow-docs-map.md"
      - "docs/workflow-docs-map.vi.md"
      - "docs/workflow-bundle-quickstart.md"
      - "docs/workflow-bundle-quickstart.vi.md"
      - "packages/workflow-bundle/README.md"
      - "packages/workflow-bundle/README.vi.md"
      - "docs/releases/workflow-bundle-v2.6.1.md"
    dependencies:
      - "TASK-002"
    outputs_expected:
      - "Structured version 2.6.1, wfc public version label, and reviewed release-note/current-doc claims."
      - "Release tests target v2.6.1/42 and exact rollback to retained v2.6.0/42."
      - "Historical v2.6.0 release note remains unchanged and gains digest protection in the current release-surface test."
    review_checkpoint: "Review generated bump output and every manual doc/test change; reject blind global replacement or any claim that publication already occurred."
    verification_hint: "Run node packages/workflow-bundle/test/bump-version.test.js, release-surface.test.js, release-candidate-artifact-smoke.test.js source preflight, release-rollback-smoke.test.js source preflight, JSON parse checks, and rg for stale current-candidate claims."
  - id: TASK-004
    owner_role: developer
    name: "Run the required early two-tier review"
    objective: "Review the implementation before integrated verification in the mandatory order: spec compliance, then code/content quality."
    paths_in_scope:
      - "All TASK-002 and TASK-003 changed paths"
    dependencies:
      - "TASK-002"
      - "TASK-003"
    outputs_expected:
      - "Spec-compliance verdict covering AC-001/AC-002, release boundary, historical immutability, and owned-path scope."
      - "Code/content-quality verdict covering assertion clarity, duplication, error handling, version consistency, and maintainability."
      - "Findings resolved or explicitly blocking before TASK-005."
    review_checkpoint: "Do not begin code-quality review until spec compliance passes or an approved exception exists."
    verification_hint: "Inspect git diff --check, git diff --name-only, the one-function smoke diff, release-surface diffs, and trace each changed path to this plan."
  - id: TASK-005
    owner_role: developer
    name: "Run focused and integrated local verification"
    objective: "Prove the corrected smoke, approval regressions, complete unit baseline, workflow artifacts, package integration, and text quality before freezing an artifact."
    paths_in_scope:
      - "Repository verification commands; evidence recorded in s07 and changes/CHANGE-006/execution/task-status.md"
    dependencies:
      - "TASK-004"
    outputs_expected:
      - "Authoring smoke 13/13, TD-01 PASS, full unit 39/39, pack audit, source bundle smoke, and source release-candidate preflight PASS."
      - "Workflow, SDD, change, execution/planning as applicable, UTF-8, whitespace, JSON, and syntax checks PASS."
      - "Zero production approval-path and unrelated-path changes."
    review_checkpoint: "Any failure blocks candidate freeze; fix only within approved scope or return for spec/approach change."
    verification_hint: "Run the named npm validation commands plus node --check on changed JavaScript, UTF-8 decoding for changed text files, git diff --check, and scoped path audit."
  - id: TASK-006
    owner_role: devops
    name: "Freeze and verify the exact v2.6.1 candidate and v2.6.0 rollback"
    objective: "Create one retained tarball from clean reviewed source, record identity/inventory, and prove install/update and rollback in all four supported mode/scope combinations."
    paths_in_scope:
      - "packages/workflow-bundle/workflow-bundle-2.6.1.tgz"
      - "packages/workflow-bundle/workflow-bundle-2.6.0.tgz"
      - "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s07.implementation.md"
      - "changes/CHANGE-006/execution/task-status.md"
    dependencies:
      - "TASK-005"
    outputs_expected:
      - "Candidate source commit/payload fingerprint, tarball SHA-256, size, and npm pack inventory."
      - "Exact candidate install/update 4/4 and exact v2.6.1 to v2.6.0 rollback 4/4 with unmanaged markers preserved."
      - "Rechecked v2.6.0 digest 5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9."
    review_checkpoint: "Any package-payload change after freeze invalidates the candidate and repeats TASK-005/TASK-006."
    verification_hint: "Use one successful npm pack with an isolated cache; hash the exact files; run release-candidate-artifact-smoke.test.js and release-rollback-smoke.test.js with absolute artifact paths/digests and offline temporary installs."
  - id: TASK-007
    owner_role: developer
    name: "Integrate the reviewed patch and prove remote Workflow Guardrails 9/9"
    objective: "Push only the approved candidate/evidence state to main, preserve branch/worktree for later closeout, and obtain a complete successful GitHub run for the intended tag target."
    paths_in_scope:
      - "Approved TASK-002 through TASK-006 tracked paths"
      - ".github/workflows/workflow-guardrails.yml as a read-only verification reference"
    dependencies:
      - "TASK-006"
    outputs_expected:
      - "Main commit SHA and GitHub run ID tied to the approved patch."
      - "7/7 sequential jobs plus Node 18 and Node 22 Release Candidate jobs PASS; zero required failures/skips."
      - "Branch/worktree retained because DoD and Release are not yet complete."
    review_checkpoint: "Do not treat a rerun of the unchanged v2.6.0 commit, a partial chain, or skipped matrix as remediation."
    verification_hint: "Inspect the exact GitHub run job list/conclusions for the commit SHA; if an evidence-only commit becomes the tag target, require its own 9/9 run."
  - id: TASK-008
    owner_role: qc
    name: "Perform s08 Technical Verification, DoD, and Release readiness review"
    objective: "Independently map AC-001 through AC-008 to local, exact-artifact, and remote evidence and obtain the required QC and DevOps/QC human decisions before publication."
    paths_in_scope:
      - "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s08.verification.md"
      - "changes/CHANGE-006/execution/task-status.md"
      - "changes/CHANGE-006/tasks.md"
    dependencies:
      - "TASK-007"
    outputs_expected:
      - "Spec coverage and Regression & Compatibility Summary."
      - "QC Technical Verification and DoD decision."
      - "DevOps/QC Release decision bound to candidate/rollback/remote evidence."
    review_checkpoint: "Release remains blocked for any FAIL/PARTIAL/UNTESTED mandatory criterion, stale receipt, digest drift, or non-9/9 remote run."
    verification_hint: "Run independent risk-ranked verification, workflow/SDD/change validators, gate preflight/status, source and artifact digest rechecks, then seal only explicit human approvals."
  - id: TASK-009
    owner_role: devops
    name: "Publish, verify, accept, disposition REL-F01, and finalize"
    objective: "After Release approval, create immutable v2.6.1, verify remote identity, close business/finding evidence, and only then finalize branch/worktree and archive readiness."
    paths_in_scope:
      - "Annotated Git tag v2.6.1"
      - "GitHub Release v2.6.1 and workflow-bundle-2.6.1.tgz asset"
      - "changes/CHANGE-006/tasks.md"
      - "changes/CHANGE-006/archive-metadata.md"
      - "changes/CHANGE-004/tasks.md"
      - "changes/CHANGE-004/archive-metadata.md"
      - "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s08.verification.md when post-release evidence requires an amendment"
    dependencies:
      - "TASK-008 Release approval"
    outputs_expected:
      - "Annotated v2.6.1 tag target, release URL, asset identity, and remote-download SHA-256 equal to the frozen candidate."
      - "Unchanged v2.6.0 target and artifact digest."
      - "REL-F01 resolved with complete linkage and CHANGE-004 archive readiness reassessed."
      - "PO Business Acceptance plus valid trusted receipts after any s08 amendment."
      - "Branch/worktree finalization only after final s08 DoD and all required release/business gates remain valid."
    review_checkpoint: "A digest mismatch or tag-target mismatch blocks acceptance; never move a published tag to repair evidence."
    verification_hint: "Dereference both tags, download both GitHub assets, hash them, compare release metadata/run IDs, validate changed artifacts, verify trusted receipts, then run branch-finish-discipline before cleanup."
dependencies_global:
  - "Spec and DoR receipts -> s06 proposal -> Developer Approach/Task Plan receipts -> s07 activation."
  - "TASK-001 -> TASK-002 -> TASK-003 -> TASK-004 -> TASK-005 -> TASK-006 -> TASK-007 -> TASK-008 -> TASK-009."
  - "Any package-payload edit after TASK-006 repeats candidate freeze and exact checks."
  - "Any s08 edit after a trusted receipt invalidates that receipt and requires resealing before DONE."
risk_notes:
  - "Release risk and unrelated dirty main state make an isolated worktree REQUIRED despite planning_track=quick."
  - "The current release-surface suite is tied to v2.6.0 candidate wording; v2.6.1 alignment is deliberate release work, not a production behavior change."
  - "The retained v2.6.0 artifact is usable rollback identity even though its historical required CI run remains red; the finding is preserved, not erased."
  - "External GitHub tag/release mutations are authorized only by the later Release gate."
verification_plan:
  - "TEST-001: stale authoring-smoke RED then corrected full smoke 13/13 GREEN."
  - "TEST-002: approval-path-defects TD-01 bootstrap/provenance regression."
  - "TEST-003: reviewed-by and normal non-interactive approval refusals plus receipt/digest regressions."
  - "TEST-004: full workflow unit suite 39/39."
  - "TEST-005: workflow pack audit and source bundle smoke."
  - "TEST-006: exact v2.6.1 candidate install/update 4/4 and v2.6.1 to v2.6.0 rollback 4/4."
  - "TEST-007: GitHub Workflow Guardrails 9/9 on the approved/tag-target commit."
  - "TEST-008: downloaded v2.6.1 asset SHA-256 equals the frozen local candidate."
  - "TEST-009: v2.6.0 dereferenced target and asset SHA-256 remain the approved constants."
  - "TEST-010: REL-F01 evidence linkage and CHANGE-004 archive reassessment."
notes_for_implementation: "Use one agent sequentially; do not delegate this tightly coupled quick patch. At s07 record Delivery Rule Evidence honestly: production behavior_change=false, strict production TDD not applicable, stale-test RED-to-GREEN completed, worktree REQUIRED/used, review order spec compliance then code quality, delegation_mode=agentic."
```

## Verification Plan

- Mandatory local checks: 13/13 authoring smoke, TD-01 and authority negatives, 39/39 unit files, workflow/SDD/change/planning validation, pack audit, bundle smoke, release-surface, syntax/JSON, UTF-8, whitespace, and scoped-diff audit.
- Exact artifact checks: one retained `workflow-bundle-2.6.1.tgz`, source/payload fingerprint, SHA-256, npm pack inventory, install/update 4/4, rollback to immutable v2.6.0 at 4/4, and unchanged unmanaged files/modes.
- Mandatory remote checks: all seven sequential Workflow Guardrails jobs plus Node 18 and Node 22 Release Candidate jobs pass for the intended tag target.
- Post-release checks: tag target, release URL, downloaded v2.6.1 digest, unchanged v2.6.0 target/digest, REL-F01 linkage, archive reassessment, and receipt freshness.
- Risk note: no local green, review pass, merge, or partial remote chain is equivalent to DoD, Release, or Business Acceptance.
- Rollout note: GitHub-only manual publication after DevOps/QC approval; npm remains excluded.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - id: GOV-S06-001
    check: "Approach uses disciplined option analysis and the smallest correct delta."
    result: PASS
    evidence: "Three directions are compared; Option A preserves TD-01 and 13-case end-to-end coverage with one smoke-function change."
  - id: GOV-S06-002
    check: "Brownfield impact, compatibility, failure, rollback, and observability are explicit."
    result: PASS
    evidence: "Technical Approach and Brownfield Impact Analysis cover production invariants, version surfaces, exact artifacts, remote jobs, and post-release identity."
  - id: GOV-S06-003
    check: "Task Plan is execution-oriented and fully traceable."
    result: PASS
    evidence: "TASK-001 through TASK-009 have owners, paths, dependencies, outputs, review checkpoints, verification hints, and REQ/AC mappings."
  - id: GOV-S06-004
    check: "TDD/review/worktree/delegation rules are planned honestly."
    result: PASS
    evidence: "The plan records harness-only RED-to-GREEN without claiming production TDD, mandates spec-compliance then code-quality review, requires isolation, and keeps agentic execution."
  - id: GOV-S06-005
    check: "Release promotion and rollback controls are sufficient."
    result: PASS
    evidence: "CI/CD controls require exact candidate/rollback, remote 9/9, human Release approval, immutable tags, remote digest, and v2.6.0 rollback."
  - id: GOV-S06-006
    check: "Human-controlled gates are not inferred."
    result: PASS
    evidence: "The explicit Developer approval is recorded with reviewer and timestamp; Approach and Task Plan trusted receipts remain required before implementation may open."
blocking_items: []
owner: "developer"
next_action: "Seal both independent trusted receipts against this unchanged approved s06 digest."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "Authoring smoke stays at 13 cases and proves approved bootstrap provenance."
  - "TD-01 and reviewed-by/non-interactive negative controls remain green."
  - "Full unit remains 39/39 and managed inventory remains 42/42/42."
  - "Existing .github Workflow Guardrails topology remains byte-unchanged and executes 9/9."
compatibility_checkpoints:
  - "No production approval-path file, public CLI contract, schema, runtime, or deployment change."
  - "Node 18/22 and Codex/Claude global/project support remain green."
  - "Historical v2.6.0 release note/tag/asset/run evidence remains unchanged."
  - "Current v2.6.1 docs/tests/package metadata agree and do not claim publication before it occurs."
migration_or_backfill_steps:
  - "None; no schema, data, configuration, or consumer migration."
rollback_or_restore_steps:
  - "Pre-publication: discard the exact v2.6.1 candidate and restore only owned paths."
  - "Post-publication: install retained immutable v2.6.0 and verify 4/4 mode/scope scenarios plus unmanaged preservation."
  - "Never retarget a published tag; issue a new patch for roll-forward remediation."
worktree_decision: REQUIRED
worktree_reason:
  - "The shared main worktree contains unrelated user changes."
  - "The scope includes version, artifact, remote integration, tag, and release risk."
  - "An exact candidate must be provably composed only from reviewed paths."
isolation_strategy:
  branch_name: "codex/fix-authoring-smoke-bootstrap"
  worktree_path: ".claude/worktrees/fix-authoring-smoke-bootstrap"
  resolved_path: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/fix-authoring-smoke-bootstrap"
  owned_paths:
    - "TASK-002/TASK-003 source and release paths"
    - "fix-authoring-smoke-bootstrap and CHANGE-006 workflow evidence"
    - "CHANGE-004 finding/archive evidence only at TASK-009"
  cleanup_preconditions:
    - "s08 DoD is explicit and valid."
    - "Required Release and Business Acceptance gates are valid."
    - "No open findings, stale receipts, digest mismatch, or unmerged reviewed commit remains."
```

## SDD Traceability
```yaml
requirement_refs:
  - "REQ-001 -> TASK-002"
  - "REQ-002 -> TASK-002, TASK-004, TASK-005"
  - "REQ-003 -> TASK-005"
  - "REQ-004 -> TASK-007"
  - "REQ-005 -> TASK-003, TASK-006, TASK-008, TASK-009"
  - "REQ-006 -> TASK-006, TASK-009"
  - "REQ-007 -> TASK-009"
acceptance_refs:
  - "AC-001 -> TEST-001, TEST-002"
  - "AC-002 -> TEST-002, TEST-003 and scoped diff"
  - "AC-003 -> TEST-001, TEST-002, TEST-004, TEST-005"
  - "AC-004 -> TEST-007"
  - "AC-005 -> TEST-006, TEST-008"
  - "AC-006 -> TEST-009"
  - "AC-007 -> TEST-010"
  - "AC-008 -> release action audit and absence of npm publication"
task_refs:
  - "TASK-001 through TASK-009 in Artifact Chính"
test_refs:
  - "TEST-001 through TEST-010 in verification_plan"
```

## Traceability
```yaml
upstream:
  - "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s01.restate.md"
  - "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s04.acceptance-criteria.md"
  - "product-specs/cards/fix-authoring-smoke-bootstrap.md"
  - "changes/CHANGE-006/proposal.md"
design_decision: "Option A - rewrite and rename the existing smoke case; production behavior stays unchanged."
change_contribution:
  design: "changes/CHANGE-006/design.md"
  tasks: "changes/CHANGE-006/tasks.md"
next_step: "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.s07.implementation.md after Developer Approach and Task Plan receipts pass"
```

## Audit
```yaml
step: "s06 Task Plan hosting s05 Technical Approach"
status: PASS
checks:
  - criterion: "One smallest-correct option is recommended with alternatives and validation conditions."
    result: PASS
    evidence: "Option A is compared against deletion and production reversal, with explicit rejection reasons and a four-tier validation plan."
  - criterion: "Component, interface, compatibility, failure, rollback, observability, worktree, and release boundaries are explicit."
    result: PASS
    evidence: "Technical Approach, CI/CD Release Controls, Brownfield Impact Analysis, and Brownfield Delivery Plan contain each required perspective."
  - criterion: "Every requirement and acceptance criterion has at least one task and test/evidence path."
    result: PASS
    evidence: "BA lane and SDD Traceability map REQ-001 through REQ-007 and AC-001 through AC-008 to TASK-001 through TASK-009 and TEST-001 through TEST-010."
  - criterion: "The task sequence includes all required delivery disciplines and release stages."
    result: PASS
    evidence: "The ordered plan includes isolation, RED-to-GREEN correction, two-tier review, local verification, exact candidate/rollback, remote 9/9, s08 gates, publication, post-release evidence, and finalization."
  - criterion: "Workflow, SDD, change, planning, UTF-8, and whitespace validation pass for the proposed artifacts."
    result: PASS
    evidence: "Validation evidence is collected after this edit and must remain green before handoff."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one s06 authoring and validation pass."
gaps:
  - "The trusted Developer Approach receipt is pending."
  - "The trusted Developer Task Plan receipt is pending."
risk_level: MEDIUM
next_action: "Seal the Approach and Task Plan receipts without changing the approved s06 content."
```

## Handoff

- Approved option: rewrite and rename the existing smoke case; retain one 13-case end-to-end bootstrap proof and all production authority controls.
- Accepted trade-off: retain the small assertion overlap with TD-01 to preserve release-level CLI/protocol coverage.
- Human decision: Developer approved Approach and Task Plan at `2026-08-24T14:25:32.000Z`; independent trusted receipts are not yet sealed.
- First execution task after approval: activate s07 and isolate `.claude/worktrees/fix-authoring-smoke-bootstrap`; do not edit in the dirty main worktree.
- Blocking dependencies: digest-matched Developer Approach and Task Plan receipts.
- Conditions to move to s07: both s06 gate receipts are `APPROVED`, `digest_match=true`, protocol activation succeeds, and the isolated worktree baseline/owned paths match this plan.
- No implementation, branch creation, push, tag, release, or cleanup was performed while authoring this note.
