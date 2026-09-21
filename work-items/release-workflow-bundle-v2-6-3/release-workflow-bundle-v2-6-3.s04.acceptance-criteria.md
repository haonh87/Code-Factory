---
artifact_id: "release-workflow-bundle-v2-6-3.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-3"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
  approach_reviewed_by: []
  approach_reviewed_at: ""
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "release-workflow-bundle-v2-6-3.s01.restate.md"
  - "release-workflow-bundle-v2-6-3.s02.business-goal.md"
  - "release-workflow-bundle-v2-6-3.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Spec v2.6.3 gồm 13 acceptance criteria có thể kiểm chứng, bao phủ exact artifact, full-delta release note, CLI/Codex/Claude compatibility, rollback v2.6.2 trong 15 phút và staged cross-channel publication. BA đã phê duyệt Spec; BA và QC đã phê duyệt DoR. Các approval này không mở Approach, Task Plan hoặc implementation.

## Step Contract
```yaml
step: "s04 Acceptance + DoR"
goal: "Freeze a measurable v2.6.3 release specification and prove that the release-preparation work is ready for technical design without granting implementation or publication authority."
value: "BA, Developer, QC, and DevOps can design, execute, and verify one exact patch artifact against an unambiguous release contract."
scope_in:
  - "Convert approved OQ-R263-001..006 Option A decisions into testable release criteria."
  - "Lock the brownfield baseline, exact-artifact rule, compatibility matrix, rollback target, publication ordering, and approval boundaries."
  - "Assess requirement, dependency, testability, compatibility, release, and governance readiness."
scope_out:
  - "Selecting file-level implementation mechanics or release commands."
  - "Preparing, tagging, publishing, or promoting a candidate."
  - "Approving Spec, DoR, Approach, Task Plan, DoD, Release, or Business Acceptance on behalf of a human."
inputs_required:
  - "Approved s02 Business Goal."
  - "Approved Option A decisions for OQ-R263-001..006."
  - "Brownfield baseline 3204749e9fac592e9f38e327dbd85a87b84b2325."
  - "Immutable rollback release v2.6.2 and existing exact-candidate guardrail model."
outputs_required:
  - "Measurable acceptance criteria and edge cases."
  - "Existing System Baseline and compatibility/rollback constraints."
  - "Strict governance checks and a Definition of Ready recommendation."
  - "Traceability from the six approved decisions to acceptance evidence."
done_when:
  - "Every approved s03 decision maps to at least one acceptance criterion."
  - "Candidate, publication, compatibility, rollback, and approval timing are objectively verifiable."
  - "Historical v2.6.2 evidence and unrelated work remain outside the mutable scope."
  - "No unresolved requirement blocker prevents s05 authoring."
  - "The Spec and DoR are presented for independent human approval."
constraints:
  hard_constraints:
    - "v2.6.2 identities and retained historical release evidence are immutable."
    - "GitHub and npm must receive the same frozen candidate bytes."
    - "npm latest must not move before exact GitHub/npm verification and DevOps+QC Release approval."
    - "No implementation, tag, publication, or gate approval is inferred from this draft."
  soft_constraints:
    - "Keep the release delta minimal and limited to release preparation beyond baseline 3204749e."
    - "Reuse existing candidate-build and installation verification capabilities where they satisfy the criteria."
  prohibited_actions:
    - "Rebuild independently per publication channel."
    - "Rewrite v2.6.0-v2.6.2 release records."
    - "Describe the artifact as CR-009-only."
    - "Publish directly to npm latest before the staged cross-channel checks pass."
  compliance_checks:
    - "Hash-lock historical release records before and after implementation."
    - "Bind source SHA, hosted run, tarball SHA-256, tag, GitHub asset, and npm download."
    - "Record reviewer receipts for every required gate."
risks:
  - id: "R-R263-S04-01"
    description: "GitHub and npm can reach different externally visible states during a partial failure."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Stage npm under a non-latest dist-tag, publish and verify GitHub, then promote latest only after both exact artifacts pass."
    contingency: "Keep npm latest on v2.6.2 and retry the failed channel without rebuilding or overwriting v2.6.3."
    owner: "devops"
    status: OPEN
  - id: "R-R263-S04-02"
    description: "A broad version-string update can mutate historical evidence."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Classify active versus historical surfaces and compare historical hashes before and after the change."
    contingency: "Reject the candidate and restore only the unintended release-preparation delta before review."
    owner: "developer"
    status: OPEN
  - id: "R-R263-S04-03"
    description: "Registry authentication can fail after other release preparation succeeds."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Require a non-publishing npm identity/authentication preflight before Release review."
    contingency: "Do not create a public release or move latest until authentication is restored and evidence is refreshed."
    owner: "devops"
    status: OPEN
timebox:
  target_duration: "One authoring and human-review cycle before s05."
  deadline: ""
  escalation_rule: "Return to s03 if a reviewer changes any accepted decision or identifies an unmeasurable release requirement."
```

## Requirement Baseline
```yaml
status: APPROVED
gate_status: APPROVED
approved_spec_refs:
  - "release-workflow-bundle-v2-6-3.s01.restate.md"
  - "release-workflow-bundle-v2-6-3.s02.business-goal.md"
  - "release-workflow-bundle-v2-6-3.s03.open-questions.md"
approved_spec_digests:
  - ref: "release-workflow-bundle-v2-6-3.s01.restate.md"
    sha256: "e036fa3fa47fa45afe9bb38619c548413a3f14ea1f924e4d3b4a6078629d3250"
  - ref: "release-workflow-bundle-v2-6-3.s02.business-goal.md"
    sha256: "b0a4b14062d975310a4d11551dfddd4765490a351693f9b5a15cd93b32f49b35"
  - ref: "release-workflow-bundle-v2-6-3.s03.open-questions.md"
    sha256: "cf801504a063340341e308273405f8f7f51435fa0f9438e5ac129aec862ff867"
decision_notes:
  - "OQ-R263-001 Option A requires GitHub Releases plus npm using the same artifact."
  - "OQ-R263-002 Option A permits updates only to active surfaces and a new v2.6.3 record."
  - "OQ-R263-003 Option A requires Node 18/22 plus CLI and Codex/Claude global/project verification."
  - "OQ-R263-004 Option A requires complete packaged-delta release notes."
  - "OQ-R263-005 Option A requires auth preflight, npm staging, GitHub verification, then latest promotion."
  - "OQ-R263-006 Option A requires rollback to v2.6.2 within 15 minutes per supported mode."
  - "BA approved this Spec on 2026-09-19; the s04 gate receipt must remain bound to the finalized note digest."
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
ux_contract_refs: []
notes:
  - "The work item changes release identity and distribution state but introduces no new API, event, schema, or UX contract."
  - "Package/install compatibility is governed directly by AC-R263-05..08 rather than by a separate Contract gate."
```

## Existing System Baseline
```yaml
baseline_source: "3204749e9fac592e9f38e327dbd85a87b84b2325"
current_release: "v2.6.2"
current_behavior_refs:
  - "The v2.6.2 tag, GitHub Release, asset, npm version, and release record are already public and immutable."
  - "The main baseline contains post-v2.6.2 fixes while active package metadata still reports 2.6.2."
  - "Workflow Guardrails builds an exact candidate artifact and verifies supported Node lanes."
impacted_surfaces:
  - "workflow-bundle package version and generated package identity"
  - "active release-facing documentation and release contract tests"
  - "new immutable docs/releases/v2.6.3.md release record"
  - "Git annotated tag, GitHub Release/asset, npm version and dist-tags"
  - "CLI, Codex global/project, and Claude global/project installation paths"
compatibility_constraints:
  - "Patch compatibility must hold on Node 18 and Node 22."
  - "CLI plus Codex and Claude global/project modes must install or update from the same frozen tarball and report v2.6.3."
  - "Managed skill/runtime parity must not regress relative to the approved baseline."
rollback_constraints:
  - "Rollback uses retained v2.6.2 bytes; it must never rebuild or relabel v2.6.2."
  - "Each supported installation mode must return to verified v2.6.2 within 15 minutes during rehearsal."
  - "A functional rollback failure is release-blocking; environmental timing variance requires explicit QC/DevOps review."
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: "AC-R263-01"
    criterion: "The final source is a reviewed release-only descendant of baseline 3204749e9fac592e9f38e327dbd85a87b84b2325."
    verification: "A source-delta inventory classifies every changed path as approved release preparation; zero unrelated behavior changes remain."
    evidence_owner: "developer"
  - id: "AC-R263-02"
    criterion: "All active package and current-release surfaces identify v2.6.3 while v2.6.0-v2.6.2 historical release records remain unchanged."
    verification: "An ownership inventory has zero stale active version surfaces, and pre/post SHA-256 values for every historical release record are identical."
    evidence_owner: "developer"
  - id: "AC-R263-03"
    criterion: "The v2.6.3 release note describes the complete packaged behavior delta from v2.6.2 and separates non-packaged workflow-document history."
    verification: "Every changed packaged behavior is mapped to a release-note entry or an explicit internal-only classification; zero CR-009-only scope claims remain."
    evidence_owner: "ba"
  - id: "AC-R263-04"
    criterion: "One candidate tarball is built once and becomes the only artifact eligible for verification and publication."
    verification: "Source SHA, hosted run ID, filename, size, and full SHA-256 are recorded; every downstream comparison equals that SHA-256."
    evidence_owner: "qc"
  - id: "AC-R263-05"
    criterion: "All required local package, workflow, audit, release-contract, and encoding checks pass for the final source."
    verification: "The approved verification manifest records zero failing required checks and explicitly records any unavailable non-blocking scanner."
    evidence_owner: "qc"
  - id: "AC-R263-06"
    criterion: "Workflow Guardrails passes for the final source, including exact candidate construction and Node 18/22 candidate verification."
    verification: "Every required hosted job concludes success and all check-run annotations are reviewed with zero unresolved release blocker."
    evidence_owner: "qc"
  - id: "AC-R263-07"
    criterion: "The candidate passes install or update verification for CLI, Codex global/project, and Claude global/project modes."
    verification: "All five modes install the exact candidate bytes, report v2.6.3, and pass managed skill/runtime parity checks."
    evidence_owner: "qc"
  - id: "AC-R263-08"
    criterion: "The same five supported modes roll back to immutable v2.6.2."
    verification: "All five modes report v2.6.2 and pass parity checks within 15 minutes per mode using a retained artifact whose digest matches the v2.6.2 rollback record."
    evidence_owner: "qc"
  - id: "AC-R263-09"
    criterion: "GitHub and npm publication authority and authentication are proven before Release approval without publishing the candidate."
    verification: "Preflight evidence identifies the authenticated GitHub/npm principals, required permissions, current npm latest=v2.6.2, and no public v2.6.3 collision."
    evidence_owner: "devops"
  - id: "AC-R263-10"
    criterion: "No tag, GitHub Release, npm latest movement, or public publication occurs before QC DoD and DevOps+QC Release approval for the exact candidate."
    verification: "Trusted receipts bind those gates to the final source and artifact; public-state checks show no premature release action."
    evidence_owner: "qc"
  - id: "AC-R263-11"
    criterion: "Cross-channel publication uses the approved staged sequence without rebuilding."
    verification: "The frozen artifact is published under a non-latest npm staging dist-tag, the GitHub Release is created and verified, and npm latest moves only after both downloads match the candidate SHA-256."
    evidence_owner: "devops"
  - id: "AC-R263-12"
    criterion: "The final public release identity is internally consistent."
    verification: "Annotated tag v2.6.3 resolves to the approved source; GitHub and npm downloads match the frozen SHA-256; npm latest resolves to 2.6.3; staging-tag disposition is recorded."
    evidence_owner: "devops"
  - id: "AC-R263-13"
    criterion: "Business Acceptance evaluates the actual published candidate rather than a local or pre-publication substitute."
    verification: "PO approval names the exact source SHA, hosted run, candidate SHA-256, GitHub/npm identities, compatibility result, rollback result, and residual risks."
    evidence_owner: "po"
edge_cases:
  - id: "EC-R263-01"
    case: "npm staging succeeds but GitHub publication fails."
    expected: "npm latest remains v2.6.2; retain or remove the staging tag by an audited disposition and retry without rebuilding."
  - id: "EC-R263-02"
    case: "GitHub Release succeeds but npm latest promotion fails."
    expected: "Do not rebuild or overwrite v2.6.3; record partial state, restore publication consistency by promoting the already verified npm artifact, and reverify both channels."
  - id: "EC-R263-03"
    case: "npm 2.6.3 or GitHub tag/release v2.6.3 already exists before authorized publication."
    expected: "Stop; treat the collision as a release blocker and do not overwrite an immutable identity."
  - id: "EC-R263-04"
    case: "A v2.6.1 or v2.6.2 string belongs to historical evidence rather than an active surface."
    expected: "Preserve it byte-for-byte and classify it as historical; do not mass-replace version strings."
  - id: "EC-R263-05"
    case: "A downstream digest differs from the frozen candidate."
    expected: "Block Release or latest promotion immediately; investigate the artifact path without accepting a rebuilt substitute under the same version."
  - id: "EC-R263-06"
    case: "Rollback is functionally correct but exceeds 15 minutes because of an external network delay."
    expected: "Record functional PASS and timing evidence separately; QC and DevOps must explicitly disposition the environmental variance before Release."
  - id: "EC-R263-07"
    case: "Required registry or GitHub authentication fails during preflight."
    expected: "Keep all public state unchanged and return to credential remediation; no Release approval may rely on assumed access."
out_of_scope:
  - "New workflow-bundle product behavior beyond the approved main baseline."
  - "Validator parallelisation or unrelated CI restructuring."
  - "Rewriting historical release notes, tags, assets, or npm versions."
  - "Changing the package name, support policy, runtime baseline, or major/minor version."
  - "Publishing from another branch, local unreviewed bytes, or a separately rebuilt artifact."
done_when:
  - "AC-R263-01..13 have named evidence and all mandatory criteria pass for one exact candidate."
  - "EC-R263-01..07 have been exercised or explicitly demonstrated by controls."
  - "Required human gates are independently approved in their prescribed order."
behavioral_invariants:
  - "v2.6.2 remains immutable and available as rollback."
  - "A candidate identity is source SHA plus artifact SHA-256; neither value may be inferred from prose."
  - "Human approval of one gate never implies approval of a later gate."
  - "The `latest` pointer moves only after exact-artifact cross-channel verification."
  - "Historical evidence is never interpreted as an active release surface solely because it contains a version string."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - id: "GOV-R263-01"
    check: "Reviewer coverage is specified for each main boundary."
    result: PASS
    evidence: "BA owns Spec; BA+QC own DoR; Developer owns Approach/Task Plan; QC owns DoD; DevOps+QC own Release; PO owns Business Acceptance."
  - id: "GOV-R263-02"
    check: "Backward compatibility and rollback assumptions are recorded."
    result: PASS
    evidence: "AC-R263-06..08 and the Existing System Baseline require Node 18/22, five installation modes, immutable v2.6.2, and the 15-minute target."
  - id: "GOV-R263-03"
    check: "Release impact and rollback expectations are known before implementation."
    result: PASS
    evidence: "AC-R263-09..12 and EC-R263-01..07 define authentication, partial states, immutable identities, staged promotion, and rollback handling."
  - id: "GOV-R263-04"
    check: "The release does not absorb unrelated implementation scope."
    result: PASS
    evidence: "AC-R263-01 requires a release-only descendant and out_of_scope excludes new behavior and unrelated CI restructuring."
  - id: "GOV-R263-05"
    check: "Known deviations have an approved exception or remain blocking."
    result: PASS
    evidence: "No deviation is accepted at s04 and no governance exception is open."
blocking_items: []
owner: "ba,qc"
next_action: "BA reviews Spec first; BA and QC then independently review DoR."
```

## Definition of Ready
```yaml
work_item_slug: "release-workflow-bundle-v2-6-3"
status: READY
gate_status: APPROVED
checks:
  restated_request_clear: PASS
  business_goal_clear: PASS
  scope_defined: PASS
  open_questions_non_blocking: PASS
  acceptance_criteria_testable: PASS
  dependencies_known: PASS
  verification_direction_present: PASS
blocking_gaps: []
accepted_assumptions:
  - "npm continues to support a non-latest staging dist-tag followed by explicit latest promotion."
  - "GitHub Release can attach the exact Workflow Guardrails tarball without rebuilding."
  - "Retained v2.6.2 GitHub/npm artifacts remain available and digest-verifiable."
residual_risks:
  - "External credentials may expire; AC-R263-09 makes preflight evidence mandatory."
  - "GitHub/npm publication is not atomic; AC-R263-11 and EC-R263-01..02 constrain partial states."
  - "The final candidate SHA does not exist until release preparation is reviewed; all later evidence must rebind to that exact descendant."
next_action: "After Spec and DoR trusted receipts both show digest_match=true, author s05 Technical Approach for Developer approval."
authority_boundary: "Spec and DoR are approved only; Approach, Task Plan, implementation, DoD, Release, Business Acceptance, tag creation, and publication remain separate."
```

## Traceability
```yaml
upstream:
  - "release-workflow-bundle-v2-6-3.s01.restate.md"
  - "release-workflow-bundle-v2-6-3.s02.business-goal.md"
  - "release-workflow-bundle-v2-6-3.s03.open-questions.md"
decision_to_acceptance:
  - { decision: "OQ-R263-001-A", criteria: ["AC-R263-04", "AC-R263-10", "AC-R263-11", "AC-R263-12"] }
  - { decision: "OQ-R263-002-A", criteria: ["AC-R263-01", "AC-R263-02"] }
  - { decision: "OQ-R263-003-A", criteria: ["AC-R263-05", "AC-R263-06", "AC-R263-07", "AC-R263-08"] }
  - { decision: "OQ-R263-004-A", criteria: ["AC-R263-03"] }
  - { decision: "OQ-R263-005-A", criteria: ["AC-R263-09", "AC-R263-10", "AC-R263-11", "AC-R263-12"] }
  - { decision: "OQ-R263-006-A", criteria: ["AC-R263-08"] }
next_step: "s05 Technical Approach after independent Spec and DoR approvals"
```

## Audit
```yaml
step: "s04 Acceptance + DoR authoring"
status: PASS
checks:
  - criterion: "Every approved s03 decision maps to at least one acceptance criterion."
    result: PASS
    evidence: "The Traceability block maps OQ-R263-001-A..006-A to AC-R263-01..12."
  - criterion: "Candidate, publication, compatibility, rollback, and approval timing are objectively verifiable."
    result: PASS
    evidence: "AC-R263-01..13 define quantitative or exact-identity evidence and named evidence owners."
  - criterion: "Historical v2.6.2 evidence and unrelated work remain outside mutable scope."
    result: PASS
    evidence: "AC-R263-01..02, out_of_scope, and behavioral invariants prohibit unrelated behavior and historical mutation."
  - criterion: "No unresolved requirement blocker prevents s05 authoring."
    result: PASS
    evidence: "DoR checks are all PASS with no blocking_gaps; three residual risks have explicit controls."
  - criterion: "The Spec and DoR are presented for independent human approval."
    result: PASS
    evidence: "BA explicitly approved Spec and BA+QC explicitly approved DoR; the note records separate reviewer metadata and authority boundaries."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one authoring pass after the six s03 decisions were approved."
gaps: []
risk_level: MEDIUM
next_action: "Seal Spec then DoR trusted receipts against this final content hash; proceed only when both report digest_match=true."
authority_boundary: "Audit PASS and s04 approvals do not pass Approach, Task Plan, implementation, DoD, Release, or Business Acceptance."
```

## Handoff
- Criteria bắt buộc: AC-R263-01..13, với exact source/artifact binding và năm installation modes cho candidate lẫn rollback.
- Edge case phải giữ: partial cross-channel publication, immutable identity collision, historical version references, digest mismatch, auth failure và timing variance.
- Điều kiện sang step 5: đã được human đáp ứng theo thứ tự Spec (BA) rồi DoR (BA+QC); trusted receipts phải được seal vào exact digest trước khi s05 được trình Developer review.

## Human Approval Record
```yaml
decision_source: "User explicitly approved Spec with role BA, then DoR with roles BA and QC for workflow-bundle v2.6.3."
approvals:
  - gate: "spec"
    decision: "APPROVED"
    reviewed_by: ["ba"]
    reviewed_at: "2026-09-19T09:10:05Z"
  - gate: "dor"
    decision: "APPROVED"
    reviewed_by: ["ba", "qc"]
    reviewed_at: "2026-09-19T09:10:06Z"
authority_boundary: "Approves only Spec and DoR; all later gates and every implementation or publication action remain independent."
```
