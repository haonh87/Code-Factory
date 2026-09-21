---
artifact_id: "release-workflow-bundle-v2-6-3.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-3"
step_id: "s05"
step_slug: "technical-approach"
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
review_mode: self
verification_owner: "qc"
artifact_shape: adaptive_v1
request_lane: product_delivery
workflow_required: true
routing_reasons:
  - "LANE_PRODUCT_DELIVERY"
escalation_reasons:
  - "HARD_RELEASE"
role_reasons:
  po:
    - "ROLE_PO_PRODUCT_OUTCOME"
  ba:
    - "ROLE_BA_REQUIREMENTS"
  developer:
    - "ROLE_DEVELOPER_DELIVERY"
  qc:
    - "ROLE_QC_VERIFICATION"
  devops:
    - "ROLE_DEVOPS_RELEASE"
gate_reasons:
  spec:
    - "GATE_SPEC_PRODUCT_DELIVERY"
  dor:
    - "GATE_DOR_PRODUCT_DELIVERY"
  approach:
    - "GATE_APPROACH_PRODUCT_DELIVERY"
  task_plan:
    - "GATE_TASK_PLAN_PRODUCT_DELIVERY"
  dod:
    - "GATE_DOD_PRODUCT_DELIVERY"
  release:
    - "GATE_RELEASE_PUBLICATION"
  business_acceptance:
    - "GATE_BUSINESS_ACCEPTANCE_PRODUCT_OUTCOME"
    - "GATE_BUSINESS_ACCEPTANCE_RELEASE_OUTCOME"
adaptive_activation:
  source_version: "2.6.2"
  installed_versions:
    - "2.6.2"
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
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
  - "ci-cd-release"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "release-workflow-bundle-v2-6-3.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Developer đã phê duyệt Option A: chuẩn bị một release-only descendant nhỏ trên nhánh hiện tại, tái dùng version-bump/release-contract/Workflow Guardrails sẵn có, rồi coi artifact từ run `main` sau merge là candidate phát hành có thẩm quyền. Publish đúng bytes đó dưới npm staging tag `candidate-2-6-3`, tạo và kiểm chứng GitHub Release, sau đó mới chuyển npm `latest`. Không thêm release framework hoặc thay đổi hành vi runtime ngoài baseline đã merge.

## Step Contract
```yaml
step: "s05 Technical Approach"
goal: "Lock the smallest technical release path that produces and promotes one verifiable v2.6.3 artifact while preserving v2.6.2 as immutable rollback."
value: "The implementation plan can name exact release surfaces, evidence boundaries, failure handling, and promotion order without reinventing the design."
scope_in:
  - "Choose how version metadata, active docs, release tests, and the v2.6.3 release record advance."
  - "Lock source-to-artifact provenance from branch review through the authoritative post-merge main run."
  - "Lock npm staging, GitHub Release, latest promotion, rollback, and post-publication verification controls."
scope_out:
  - "Create a new release orchestration framework or restructure Workflow Guardrails."
  - "Modify runtime behavior already present in baseline 3204749e."
  - "Run version bump, change production files, tag, publish, or promote."
inputs_required:
  - "Approved s04 Spec and DoR receipts with digest_match=true."
  - "AC-R263-01..13 and EC-R263-01..07."
  - "Current v2.6.2 package/release surfaces and Workflow Guardrails build-once jobs."
  - "Immutable rollback artifact workflow-bundle-2.6.2.tgz SHA-256 af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f."
outputs_required:
  - "Option comparison and one recommended design."
  - "Component boundaries, artifact flow, compatibility, failure, rollback, and observability design."
  - "CI/CD promotion and approval controls."
  - "Traceability sufficient for an execution-oriented s06 plan."
done_when:
  - "At least one smaller/rejected direction is compared with the recommendation."
  - "Every acceptance-criteria group has a technical validation path."
  - "The authoritative release candidate and pre-merge evidence are unambiguously separated."
  - "Partial npm/GitHub publication states have retry and rollback controls without rebuilding."
  - "The approach is presented for Developer approval without opening s07."
constraints:
  hard_constraints:
    - "One exact tarball is reused for npm and GitHub publication."
    - "The public v2.6.2 tag, release, package, asset, record, and digest remain immutable."
    - "The authoritative release candidate comes from the final main source after the release-preparation branch is merged."
    - "No public action occurs before exact-candidate QC DoD and DevOps+QC Release approval."
  soft_constraints:
    - "Reuse the current bump-version utility, release tests, and guardrail workflow."
    - "Keep the release-only production diff small enough for one targeted review stream."
  prohibited_actions:
    - "Do not build separate npm and GitHub tarballs."
    - "Do not tag a PR merge ref or a source that is not the final main release source."
    - "Do not move npm latest before both public downloads match the frozen digest."
    - "Do not mass-replace historical version references."
  compliance_checks:
    - "Classify every changed release surface as active, historical, test contract, or new release record."
    - "Verify source SHA, hosted run, tarball SHA-256, tag target, GitHub asset, and npm download."
    - "Verify separate trusted receipts for Approach, Task Plan, DoD, Release, and Business Acceptance."
risks:
  - id: "R-R263-S05-01"
    description: "A PR run can build a merge-ref artifact that is not the final source later tagged on main."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Treat PR artifacts as pre-merge evidence only and bind Release to the post-merge main run artifact."
    contingency: "If main changes or artifact bytes differ, refresh QC verification and all exact-candidate terminal evidence before Release."
    owner: "qc"
    status: OPEN
  - id: "R-R263-S05-02"
    description: "npm staging can succeed while GitHub publication fails."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Keep latest on v2.6.2, retain the staged immutable v2.6.3 version, and retry GitHub with the same tarball."
    contingency: "Record the partial state and do not promote latest until GitHub and npm downloads match."
    owner: "devops"
    status: OPEN
  - id: "R-R263-S05-03"
    description: "The generic bump utility can create an inaccurate release-note stub or leave manually owned surfaces stale."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Treat bump output as a starting delta, replace the stub with the approved full-delta record, and let release-surface tests enforce active/historical ownership."
    contingency: "Reject the batch during Spec Compliance and amend only the release-preparation files."
    owner: "developer"
    status: OPEN
timebox:
  target_duration: "One Developer review cycle before s06 planning."
  deadline: ""
  escalation_rule: "Return to s04 if the approach requires new runtime behavior, a public-contract change, a different rollback version, or fewer compatibility modes."
```

## Option Analysis
```yaml
goal: "Release the full post-v2.6.2 packaged delta as v2.6.3 with exact-artifact identity and reversible public-channel promotion."
ba_lane:
  business_goal: "Make merged fixes consumable without rewriting v2.6.2 history or presenting inconsistent GitHub/npm releases."
  user_scenarios:
    - "A user installs v2.6.3 through npm or the GitHub asset and receives identical package bytes."
    - "Codex and Claude users update in global/project scope and can return to v2.6.2."
  business_rules:
    - "One version identifies one immutable artifact."
    - "Latest remains v2.6.2 until v2.6.3 is verified on both public channels."
    - "Human gates are independent and candidate-specific."
  scope_notes:
    - "Release preparation may change metadata, active release docs, release contract tests, and the new release record only."
    - "The release note covers the complete packaged delta from v2.6.2."
  open_questions: []
dev_lane:
  baseline_context: "The existing bump-version utility changes three structured version fields and the CLI label, while Workflow Guardrails already builds once and tests the same artifact on Node 18/22. Active public docs and release/rollback tests still target v2.6.2/v2.6.1 and require reviewed updates."
  repo_constraints:
    - "packages/workflow-bundle/package.json requires Node >=18 and npm >=9."
    - "release-candidate-build uploads one tarball plus SHA-256; downstream Node lanes download it."
    - "The final tag must resolve to a source reachable from main."
    - "The version bump utility intentionally does not rewrite public docs."
  technical_risks:
    - "PR merge-ref evidence can be mistaken for the final main candidate."
    - "Historical version strings can be changed accidentally."
    - "Registry and GitHub publication are not atomic."
  integration_points:
    - "wfc version bump and release-surface/rollback test contracts"
    - "Workflow Guardrails release-candidate artifact"
    - "npm registry dist-tags"
    - "Git annotated tag and GitHub Release asset"
  nfr_notes:
    - "Digest mismatch tolerance is zero."
    - "Rollback target is 15 minutes per supported mode."
options:
  - "Option A - Minimal existing-path release: reuse bump-version, release tests, Workflow Guardrails, and staged promotion of the post-merge main artifact."
  - "Option B - Add a dedicated automated release workflow now: centralize versioning and publication but introduce a new permission and recovery surface."
  - "Option C - Local rebuild and direct latest publication: fewer commands but violates exact-artifact and latest-protection invariants."
recommended_option: "Option A - Minimal existing-path release"
trade_offs:
  - "Option A keeps the production delta smallest and reuses proven Node 18/22 build-once lanes, at the cost of a controlled manual publication sequence and a post-merge candidate rebind."
  - "Option B could reduce future operator steps but makes an unproven release mechanism larger than this patch-release scope."
  - "Option C is operationally shorter but cannot prove channel byte equality or recover safely before latest moves."
recommendation_reason: "It is the smallest approach that satisfies all 13 criteria using proven repository capabilities; Option B creates unnecessary release-system scope, while Option C violates exact-artifact and latest-protection invariants."
validation_plan:
  - "Review release-only source delta and historical hashes before merge."
  - "Use PR hosted evidence for pre-merge quality only."
  - "After merge, download the main-run artifact and bind source/run/full SHA-256 as the sole release candidate."
  - "Exercise candidate and v2.6.2 rollback matrices before terminal approval."
  - "Stage npm, verify GitHub/npm downloads, then promote latest and run post-publication smoke."
notes_for_next_step: "READY for system-design consolidation and then s06 planning; no unresolved option question remains."
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: "Existing Node CLI package release path"
selected_stack: ["Node.js >=18", "npm >=9", "GitHub Actions", "GitHub Releases", "npm registry"]
selected_runtime: ["Existing workflow-bundle package and wfc CLI"]
decision_notes:
  - "No stack, runtime, deployment topology, API, schema, or architectural baseline changes."
  - "The work is a brownfield release-only delta, so no Foundation gate is opened."
```

## Artifact Chính
```yaml
design_problem: "Advance active workflow-bundle surfaces from 2.6.2 to 2.6.3 and publish the complete baseline delta through GitHub and npm without rebuilding, mutating history, confusing PR evidence with final-main evidence, or moving latest prematurely."
business_rule_trace:
  - "AC-R263-01..03 -> release-only source inventory, active/historical classification, and full packaged-delta release note."
  - "AC-R263-04..06 -> one hosted tarball, full SHA-256 binding, local checks, and Node 18/22 guardrails."
  - "AC-R263-07..08 -> CLI plus Codex/Claude global/project candidate and v2.6.2 rollback matrices."
  - "AC-R263-09..12 -> auth/collision preflight, independent gates, staged npm publication, GitHub verification, and latest promotion."
  - "AC-R263-13 -> post-publication evidence for PO Business Acceptance."
design_options:
  - name: "Minimal existing-path release"
    summary: "Update current release surfaces and tests, reuse guardrails, and promote one post-merge main artifact manually under controlled gates."
    pros: ["Small delta", "Existing tested pipeline", "Clear rollback and retry"]
    cons: ["Manual controlled publication", "Requires post-merge candidate rebind"]
    risks: ["Operator sequencing error", "External partial state"]
  - name: "New automated release workflow"
    summary: "Add a new publisher/orchestrator before v2.6.3."
    pros: ["Future automation"]
    cons: ["New permission and recovery surface", "Out-of-scope runtime change"]
    risks: ["Unproven automation can publish incorrectly"]
rejected_options:
  - name: "New automated release workflow"
    reason: "The current pipeline already satisfies build-once verification; adding publication automation is not required by any v2.6.3 acceptance criterion."
  - name: "Local rebuild and direct latest publication"
    reason: "It cannot preserve exact hosted bytes or protect latest during a cross-channel partial failure."
recommended_design: "Prepare and review a minimal release-only branch; merge only after implementation review and DoD; use the subsequent main Workflow Guardrails run to build the authoritative v2.6.3 tarball once; bind QC evidence to its source/run/SHA-256; after DevOps+QC Release approval, publish those bytes to npm under candidate-2-6-3, create an annotated tag and GitHub Release using the same bytes, verify both downloads, promote npm latest, remove or record the staging tag, and collect PO acceptance evidence."
recommendation_reason: "This path reuses proven components, keeps branch-review evidence separate from release authority, and creates recoverable intermediate states without weakening any human gate."
component_changes:
  - component: "Structured version surfaces"
    change: "Use the existing bump-version path to change root/package bundleVersion, package version, and the public CLI flow label to 2.6.3."
  - component: "Active public release documentation"
    change: "Update only active EN/VI candidate/onboarding/publish surfaces and replace the generated stub with a complete docs/releases/workflow-bundle-v2.6.3.md record."
  - component: "Release contract tests"
    change: "Advance current candidate expectations to 2.6.3, add v2.6.2 to immutable historical hashes, and change exact rollback expectations from v2.6.1 to v2.6.2."
  - component: "Workflow Guardrails"
    change: "No design change; reuse release-candidate-build plus Node 18/22 consumers and retain fetch-depth 0 on candidate verification."
  - component: "External publication"
    change: "Use npm candidate-2-6-3 staging, annotated Git tag v2.6.3, GitHub Release assets, digest verification, and explicit latest promotion."
data_flow:
  - "Approved s04 -> release-only branch edits -> local checks -> targeted Spec Compliance and Code Quality review."
  - "PR Workflow Guardrails -> pre-merge artifact evidence only -> QC DoD -> merge approved branch."
  - "Main push Workflow Guardrails -> authoritative source SHA/run -> one workflow-bundle-2.6.3.tgz plus workflow-bundle.sha256."
  - "Downloaded main artifact -> candidate/rollback install matrices -> QC exact-candidate verification -> QC DoD refresh if binding changed -> DevOps+QC Release."
  - "Frozen tarball -> npm candidate-2-6-3 -> annotated tag/GitHub Release -> download digest comparison -> npm latest -> staging-tag disposition -> PO Business Acceptance."
interface_changes:
  - "Package identity advances from workflow-bundle@2.6.2 to workflow-bundle@2.6.3."
  - "Public CLI commands, options, exit semantics, Node/npm support policy, and installed layout do not change."
  - "npm dist-tag state temporarily adds candidate-2-6-3; latest changes only after cross-channel verification."
failure_modes:
  - scenario: "PR artifact is treated as the release artifact."
    impact: "Tag/source provenance can differ from the bytes approved for Release."
    guardrail: "Authoritative binding requires a main push run whose source SHA is the exact tag target."
  - scenario: "Historical v2.6.2 files are changed by broad replacement."
    impact: "Audit and rollback evidence become untrustworthy."
    guardrail: "Pre/post SHA-256 inventory plus release-surface tests reject historical mutation."
  - scenario: "npm staging succeeds and GitHub creation fails."
    impact: "v2.6.3 exists publicly under a non-latest tag but channels are incomplete."
    guardrail: "Keep latest at v2.6.2; retry GitHub with retained exact bytes; never republish or rebuild 2.6.3."
  - scenario: "GitHub succeeds and latest promotion fails."
    impact: "GitHub advertises v2.6.3 while npm default remains v2.6.2."
    guardrail: "Retry only dist-tag promotion after verifying the already published npm 2.6.3 tarball; record partial state."
  - scenario: "Any downloaded digest differs."
    impact: "The public version no longer represents the approved artifact."
    guardrail: "Stop promotion, preserve evidence, and block Release/Business Acceptance; do not overwrite immutable identities."
compatibility_impact:
  - "No breaking API, schema, event, CLI-command, or install-layout change is introduced by release preparation."
  - "Node 18/22 and npm >=9 remain supported."
  - "CLI plus Codex and Claude global/project modes must retain unmanaged files and permissions."
  - "Legacy reports and receipt-v1 files remain readable because runtime behavior comes unchanged from the reviewed baseline."
rollback_impact:
  - "Installed environments downgrade with immutable workflow-bundle-2.6.2.tgz SHA-256 af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f."
  - "Registry incident rollback moves npm latest back to workflow-bundle@2.6.2; it does not delete or overwrite 2.6.3."
  - "GitHub tag/release v2.6.3 remains immutable; operators install the retained v2.6.2 asset and the release record documents the rollback."
  - "Each supported installation-mode rehearsal must finish within 15 minutes or receive explicit QC/DevOps timing disposition."
observability_hooks:
  - "Workflow Guardrails source SHA, run ID, job conclusions, and check-run annotations."
  - "Tarball filename, byte size, full SHA-256, package version, file count, and managed skill counts."
  - "npm whoami, version collision query, dist-tags before/after, and downloaded tarball digest."
  - "Git tag target, GitHub Release URL/asset identity, downloaded asset digest, and release visibility."
  - "Per-mode installed_bundle_version, managed parity, unmanaged hash/mode preservation, and elapsed rollback time."
constraints_applied:
  - "Approved OQ-R263-001..006 Option A."
  - "AC-R263-01..13 and EC-R263-01..07."
  - "Strict governance and independent human-controlled gates."
  - "No validator parallelisation or unrelated CI restructuring."
validation_plan:
  - "Local: version/release-surface tests, full unit suite, workflow validators, pack audit, candidate smoke, rollback smoke, UTF-8, YAML, secret and network-surface checks."
  - "Review: release-only source inventory, historical hashes, Spec Compliance first, then Code Quality."
  - "Hosted: all Workflow Guardrails jobs on PR for pre-merge evidence and on main for authoritative release binding."
  - "Artifact: compare declared and actual SHA-256 through build, download, installed matrices, npm download, and GitHub download."
  - "Publication: verify stage tag, tag target, GitHub release, npm latest, staging-tag disposition, and post-publication install smoke."
specialized_followups:
  - skill: "ci-cd-release"
    reason: "Lock the cross-channel build, approval, promotion, partial-failure, and rollback controls in this same s05 note."
notes_for_next_step: "s06 must order release-surface edits, red/green release-contract tests, local checks, two-tier review, PR evidence, merge, main candidate binding, terminal gates, staged publication, and post-publication evidence without mixing gate authority."
```

## Architecture Details
```yaml
pipeline_scope: "Prepare, verify, and promote workflow-bundle v2.6.3 through the existing GitHub Actions, npm, and GitHub Release surfaces."
source_strategy:
  branch_model: "Release-only worktree branch reviewed by PR; final authoritative candidate is built from the merged main source that the annotated v2.6.3 tag will reference."
  triggers:
    - "pull_request for pre-merge guardrails"
    - "push to main for authoritative candidate"
    - "human-controlled terminal commands after Release approval"
build_and_verify:
  stages:
    - "pre-merge local checks and two-tier review"
    - "PR hosted guardrails as pre-merge evidence"
    - "post-merge main build-once candidate and Node 18/22 verification"
    - "downloaded candidate/rollback compatibility matrix"
    - "exact-candidate QC Technical Verification and DoD"
  cache_strategy:
    - "Do not cache or reconstruct the candidate tarball across channels."
    - "Registry or package-manager cache may be isolated for smoke tests but never defines artifact identity."
  required_checks:
    - "All required local release checks"
    - "All Workflow Guardrails jobs and annotations reviewed"
    - "Five candidate install/update modes"
    - "Five v2.6.2 rollback modes within target"
artifact_flow:
  registry: "GitHub Actions artifact storage -> npm registry staging tag -> GitHub Release asset -> npm latest"
  artifact_types:
    - "workflow-bundle-2.6.3.tgz"
    - "workflow-bundle.sha256"
    - "source/run/job/digest evidence"
    - "immutable workflow-bundle-2.6.2.tgz rollback artifact"
  tagging_strategy:
    - "Candidate identity: full main source SHA plus full tarball SHA-256."
    - "Release identity: annotated Git tag v2.6.3 pointing to the exact main source."
    - "Temporary npm dist-tag: candidate-2-6-3; convenience latest is promoted only after verification."
  provenance_controls:
    - "Pack exactly once in release-candidate-build."
    - "Downstream jobs and public channels consume the retained tarball."
    - "Record full SHA-256 at every boundary; never accept abbreviated identity for a gate."
promotion_flow:
  - from: local
    to: dev
    conditions:
      - "Local checks and targeted s07 reviews pass."
      - "PR guardrails pass and QC approves DoD for the reviewed release delta."
    automation_level: "PR checks automated; merge remains human-controlled."
  - from: dev
    to: uat
    conditions:
      - "Merged main run passes and produces the authoritative exact artifact."
      - "QC binds Technical Verification/DoD to the main source/run/digest."
    automation_level: "Artifact build and checks automated; identity binding and terminal gates human-controlled."
  - from: uat
    to: prod
    conditions:
      - "Authentication/collision preflight passes."
      - "DevOps and QC approve Release for the exact artifact."
      - "npm staging and GitHub publication use the frozen bytes."
    automation_level: "Manual controlled publication and dist-tag promotion."
approval_controls:
  - "Developer Approach receipt before s06."
  - "Developer Task Plan receipt before s07 activation."
  - "QC Spec Compliance then Developer+QC Code Quality during s07."
  - "QC exact-candidate binding, Technical Verification, and DoD."
  - "DevOps+QC Release before tag/publication."
  - "PO Business Acceptance after public verification."
release_controls:
  pre_release:
    - "npm/GitHub auth and v2.6.3 collision preflight."
    - "Final main source, run, artifact, rollback, compatibility, and residual-risk evidence."
    - "No tag, GitHub Release, npm 2.6.3, or latest movement before Release receipt."
  post_release:
    - "Verify annotated tag target and GitHub asset digest."
    - "Download npm 2.6.3 and compare digest before latest promotion."
    - "Verify npm latest=2.6.3, record staging-tag disposition, and run public install smoke."
rollback_controls:
  - "Keep v2.6.2 immutable artifact and digest available before promotion."
  - "Move npm latest back to 2.6.2 on a release incident; never overwrite either version."
  - "Reinstall v2.6.2 for all supported modes and verify parity within 15 minutes per mode."
  - "Preserve v2.6.3 GitHub/tag history and add an incident notice rather than retargeting."
pipeline_risks:
  - "The authoritative candidate exists only after merge; pre-merge artifact evidence cannot authorize Release."
  - "External publication is non-atomic and can stop in a staged partial state."
  - "Credentials or 2FA policy can change between preflight and publication."
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: "Reuse Workflow Guardrails unchanged unless implementation proves a criterion cannot be met. Any pipeline edit beyond release-version expectations requires an Approach amendment."
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "workflow-bundle.manifest.json"
  - "packages/workflow-bundle/workflow-bundle.manifest.json"
  - "packages/workflow-bundle/package.json"
  - "packages/workflow-bundle/bin/wfc.js public flow label"
  - "active EN/VI release-facing docs and new v2.6.3 release record"
  - "packages/workflow-bundle/test/release-surface.test.js"
  - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
compatibility_risks:
  - "Stale candidateVersion/rollbackVersion or historical digest expectations can make tests validate the wrong release."
  - "Active and historical documentation share version strings but have different ownership."
  - "A main commit after candidate binding invalidates source authority even if package bytes happen to match."
migration_notes:
  - "No data, schema, runtime, or installed-state migration is introduced."
  - "Version preparation advances metadata and test contracts; existing v2.6.2 installations remain valid until users opt in."
rollback_notes:
  - "Known-good package is public v2.6.2 SHA-256 af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f."
  - "Rollback tests must advance from the old v2.6.2->v2.6.1 contract to v2.6.3->v2.6.2."
  - "Historical v2.6.2 records remain immutable even after latest moves."
```

## Governance Exceptions
```yaml
status: NOT_REQUIRED
exceptions: []
reason: "The recommended approach follows the strict checklist, existing pipeline, immutable-artifact rule, and approved human authority model."
```

## Spec Change
```yaml
status: NOT_REQUIRED
changes: []
reason: "The approach implements all approved Option A decisions and AC-R263-01..13 without weakening or expanding the Spec."
```

## Traceability
```yaml
upstream:
  - "release-workflow-bundle-v2-6-3.s03.open-questions.md"
  - "release-workflow-bundle-v2-6-3.s04.acceptance-criteria.md"
gate_evidence:
  spec: { status: "APPROVED", reviewed_by: "ba", digest_match: true, artifact_sha256: "a926341a13b67266e9c9fea95c062fb387ca3698cdeb6ebdfb5098fc3f8d222b" }
  dor: { status: "APPROVED", reviewed_by: "qc", joint_reviewers: ["ba", "qc"], digest_match: true, artifact_sha256: "a926341a13b67266e9c9fea95c062fb387ca3698cdeb6ebdfb5098fc3f8d222b" }
acceptance_to_design:
  - { criteria: ["AC-R263-01", "AC-R263-02", "AC-R263-03"], design: "release-surface ownership and full-delta record" }
  - { criteria: ["AC-R263-04", "AC-R263-05", "AC-R263-06"], design: "main build-once exact candidate" }
  - { criteria: ["AC-R263-07", "AC-R263-08"], design: "candidate and v2.6.2 compatibility/rollback matrices" }
  - { criteria: ["AC-R263-09", "AC-R263-10", "AC-R263-11", "AC-R263-12"], design: "preflight, staged publication, immutable tag, and latest promotion" }
  - { criteria: ["AC-R263-13"], design: "post-publication PO evidence" }
next_step: "s06 Task Plan after Developer approves Approach and its trusted receipt matches this note"
```

## Audit
```yaml
step: "s05 Technical Approach authoring"
status: PASS
checks:
  - criterion: "At least one smaller or rejected direction is compared with the recommendation."
    result: PASS
    evidence: "Option A is compared against new release automation and unsafe direct publication."
  - criterion: "Every acceptance-criteria group has a technical validation path."
    result: PASS
    evidence: "business_rule_trace, validation_plan, and acceptance_to_design cover AC-R263-01..13."
  - criterion: "The authoritative release candidate and pre-merge evidence are unambiguously separated."
    result: PASS
    evidence: "Source strategy and R-R263-S05-01 reserve Release authority for the post-merge main artifact."
  - criterion: "Partial npm/GitHub publication states have retry and rollback controls without rebuilding."
    result: PASS
    evidence: "Failure modes, release controls, and rollback controls define both ordering failures and immutable retry behavior."
  - criterion: "The approach is presented for Developer approval without opening s07."
    result: PASS
    evidence: "Developer explicitly approved the Approach; s05 records reviewer identity and timestamp while Task Plan and s07 remain unopened."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one focused authoring pass after Spec and DoR receipt verification."
gaps: []
risk_level: MEDIUM
next_action: "Seal the Developer Approach trusted receipt against this finalized note; only after digest_match=true may s06 Task Plan be authored."
authority_boundary: "Audit PASS covers proposal completeness only and does not approve Approach, Task Plan, implementation, Release, or publication."
```

## Handoff
- Recommended option: Option A — minimal existing-path release with the authoritative post-merge main artifact.
- Trade-off chấp nhận: one additional main-run binding and a controlled manual promotion sequence in exchange for exact provenance and recoverable partial states.
- Điều kiện sang step 6: Developer approval đã được ghi nhận; trusted receipt còn phải `digest_match=true`. Chưa được chạy version bump hoặc sửa production surface.
- Deployment note khi có: npm `candidate-2-6-3` -> annotated GitHub `v2.6.3` release -> cross-channel digest verify -> npm `latest`; rollback latest/installations về immutable v2.6.2.

## Human Approval Record
```yaml
decision: "APPROVED"
gate: "approach"
reviewed_by: ["developer"]
reviewed_at: "2026-09-19T10:34:59Z"
decision_source: "User explicitly approved the Approach for workflow-bundle v2.6.3 with role Developer."
authority_boundary: "Approves only the s05 Approach; Task Plan, implementation, DoD, Release, Business Acceptance, tag creation, and publication remain separate."
```
