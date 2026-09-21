---
artifact_id: "release-workflow-bundle-v2-6-3.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-3"
step_id: "s03"
step_slug: "open-questions"
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
spec_status: draft
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
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
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
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "release-workflow-bundle-v2-6-3.s01.restate.md"
  - "release-workflow-bundle-v2-6-3.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Sáu quyết định release đã có option, trade-off, recommendation và reviewer authority. Input hiện **BLOCKED** cho s04 cho đến khi các human owners chấp nhận hoặc sửa recommendation bundle; chưa có quyền chuẩn bị candidate hoặc publish.

## Step Contract
```yaml
step_goal: "Turn the unresolved v2.6.3 publication choices into a decision-ready recommendation bundle before measurable acceptance criteria are frozen."
input_summary:
  - "Approved s02 Business Goal and its outcome metrics."
  - "s01 source/rollback boundary, risks, draft acceptance criteria, and OQ-R263-001..004."
  - "Existing v2.6.2 GitHub/npm publication model and repository release surfaces."
output_summary:
  - "Options and recommendations for publication channels, documentation ownership, compatibility, delta coverage, sequencing/authentication, and rollback SLO."
  - "Named decision owners, unresolved conflicts, validation direction, and s04 readiness verdict."
done_when:
  - "Each open question has at least two options, one recommendation, rationale, validation direction, and authorized reviewers."
  - "The recommendation preserves exact-artifact promotion and immutable v2.6.2 rollback."
  - "The partial-publication failure policy protects the existing latest channel."
  - "All required human owners accept or amend the bundle."
  - "No unresolved conflict remains that would make s04 acceptance criteria ambiguous."
owner: "ba"
```

## Artifact Chính
```yaml
goal: "Lock the smallest release policy that makes v2.6.3 reproducible, truthful across channels, and safely reversible."
ba_lane:
  business_goal: "Deliver post-v2.6.2 fixes under one trustworthy patch identity without misrepresenting scope or weakening approval authority."
  user_scenarios:
    - "A user installs or updates workflow-bundle through an approved public channel and receives v2.6.3."
    - "A user installs the bundle for Codex or Claude in global or project scope and verifies the reported version."
    - "An operator rolls back a supported installation to immutable v2.6.2 after a release problem."
  business_rules:
    - "v2.6.2 history is immutable."
    - "Every approved channel must identify the same source and exact artifact."
    - "Release and Business Acceptance remain independent human gates."
  scope_notes:
    - "This work item prepares a release-only descendant of baseline 3204749e."
    - "The release note describes the complete packaged delta; it does not authorize additional feature work."
  open_questions: ["OQ-R263-001", "OQ-R263-002", "OQ-R263-003", "OQ-R263-004", "OQ-R263-005", "OQ-R263-006"]
dev_lane:
  baseline_context: "v2.6.2 is already an immutable GitHub release, tag, and npm latest; main 3204749e contains later changes and package metadata still reports 2.6.2."
  repo_constraints:
    - "The final candidate must be a reviewed descendant of 3204749e because release metadata must change."
    - "Workflow Guardrails builds one exact tarball and verifies it on Node 18 and Node 22."
    - "Historical release notes and tag identities cannot be rewritten."
    - "npm requires working 2FA or a granular publish token with bypass-2FA permission."
  technical_risks:
    - "Separate builds for GitHub and npm can drift."
    - "Direct publication to npm latest can expose a partial release if the GitHub step fails."
    - "A CR-009-only note would under-report the actual package delta."
    - "Mass version replacement can corrupt historical evidence."
  integration_points:
    - "GitHub Actions candidate artifact"
    - "Git annotated tag and GitHub Release asset"
    - "npm package version and dist-tags"
    - "Codex and Claude global/project installation paths"
  nfr_notes:
    - "Digest equality is zero-tolerance."
    - "Rollback evidence must use retained v2.6.2 bytes."
    - "No publication before DevOps+QC Release approval."
open_questions:
  - id: "OQ-R263-001"
    topic: "Public release channels"
    status: "APPROVED"
    selected_option: "A"
    reviewers: ["po", "devops", "qc"]
    options:
      - id: "A"
        summary: "Publish the same v2.6.3 artifact to GitHub Releases and npm, then verify both downloads."
        pros: ["Matches v2.6.2 distribution", "Serves repository and registry users", "Supports channel-to-channel digest evidence"]
        cons: ["More credentials and partial-failure handling", "Requires post-publication verification on two systems"]
        risks: ["One channel may succeed while the other fails"]
      - id: "B"
        summary: "Publish GitHub Release only and leave npm latest at v2.6.2."
        pros: ["Smaller operational surface", "Avoids npm authentication risk"]
        cons: ["npm users remain on old behavior", "Public channels intentionally disagree"]
        risks: ["Users may reasonably assume npm latest contains the announced release"]
    recommended_option: "A"
    recommendation_reason: "v2.6.2 already establishes both channels as public product surfaces; omitting npm would not solve the primary user problem."
    validation_plan: ["Compare registry and GitHub download SHA-256 to the frozen candidate", "Run install/update smoke from each published source"]
    if_unresolved: "s04 cannot define publication-completeness acceptance criteria."
  - id: "OQ-R263-002"
    topic: "Current versus historical release-surface ownership"
    status: "APPROVED"
    selected_option: "A"
    reviewers: ["ba", "developer", "qc"]
    options:
      - id: "A"
        summary: "Update only active current-release surfaces and create a new v2.6.3 record; hash-lock all historical release notes."
        pros: ["Preserves audit history", "Keeps the delta reviewable", "Follows artifact-governance ownership"]
        cons: ["Requires classifying current versus historical references"]
        risks: ["A stale active surface can be missed without an explicit scan"]
      - id: "B"
        summary: "Replace old version strings broadly across documentation and tests."
        pros: ["Mechanically simple"]
        cons: ["Rewrites historical evidence", "Creates misleading release history"]
        risks: ["Silent corruption of immutable release records"]
    recommended_option: "A"
    recommendation_reason: "Release history has an independent lifecycle; only current surfaces and the new record should advance."
    validation_plan: ["Inventory version references by owning layer", "Hash historical v2.6.0-v2.6.2 release notes before and after the change", "Scan current surfaces for stale candidate wording"]
    if_unresolved: "s04 cannot define the allowed documentation and test delta."
  - id: "OQ-R263-003"
    topic: "Compatibility and rollback matrix"
    status: "APPROVED"
    selected_option: "A"
    reviewers: ["developer", "qc", "devops"]
    options:
      - id: "A"
        summary: "Verify Node 18/22 candidate lanes plus CLI and Codex/Claude global/project install-update and rollback modes."
        pros: ["Covers the supported user paths", "Proves rollback symmetrically", "Matches prior release evidence"]
        cons: ["Higher verification time and fixture complexity"]
        risks: ["Environment-specific failures can delay Release"]
      - id: "B"
        summary: "Rely on package unit tests and Node candidate lanes only."
        pros: ["Faster feedback"]
        cons: ["Does not prove installed harness behavior", "Leaves rollback user paths untested"]
        risks: ["A package can pass tests but fail installation or adapter discovery"]
    recommended_option: "A"
    recommendation_reason: "The bundle is consumed through CLI, Codex, and Claude installation modes; package-only evidence is insufficient for the user outcome."
    validation_plan: ["Run candidate install/update matrix", "Run exact v2.6.2 rollback matrix", "Record version and managed-skill parity for every mode"]
    if_unresolved: "s04 cannot freeze compatibility or rollback coverage."
  - id: "OQ-R263-004"
    topic: "Release-note delta boundary"
    status: "APPROVED"
    selected_option: "A"
    reviewers: ["ba", "developer", "qc"]
    options:
      - id: "A"
        summary: "Describe the complete packaged v2.6.2-to-candidate behavior delta, while separating non-packaged workflow-document history."
        pros: ["Truthful artifact scope", "Reviewers can reconcile note to package contents", "Avoids a CR-009-only claim"]
        cons: ["Requires a package-aware delta review"]
        risks: ["Important behavior can be omitted if only commit titles are used"]
      - id: "B"
        summary: "Describe v2.6.3 as only the CR-009 terminal archive fix."
        pros: ["Short release note"]
        cons: ["Under-reports other packaged changes since v2.6.2"]
        risks: ["Misleading compatibility and risk assessment"]
    recommended_option: "A"
    recommendation_reason: "A version tag represents the complete artifact, not the last merged work item."
    validation_plan: ["Compare v2.6.2 tag to final package file set", "Map every packaged behavior change to a release-note entry or explicit internal-only classification"]
    if_unresolved: "s04 cannot make release-note completeness measurable."
  - id: "OQ-R263-005"
    topic: "Cross-channel publication sequencing and authentication"
    status: "APPROVED"
    selected_option: "A"
    reviewers: ["devops", "qc"]
    options:
      - id: "A"
        summary: "Preflight credentials; publish the frozen npm artifact under a non-latest staging dist-tag; create and verify the immutable GitHub release; then promote npm latest only after both channels pass."
        pros: ["Protects the current latest pointer", "Uses the same artifact", "Allows retry of GitHub publication without rebuilding"]
        cons: ["Adds a staged dist-tag and cleanup/check steps"]
        risks: ["v2.6.3 may briefly exist on npm under a non-latest tag if GitHub publication fails"]
      - id: "B"
        summary: "Publish npm directly to latest, then create the GitHub release."
        pros: ["Fewer commands"]
        cons: ["Exposes users before cross-channel verification", "A later GitHub failure leaves latest inconsistent"]
        risks: ["Partial release becomes immediately user-visible"]
    recommended_option: "A"
    recommendation_reason: "External systems cannot be made truly atomic; staging prevents a partial publication from moving the existing latest channel."
    validation_plan: ["Run npm identity/auth preflight before Release review", "Assert staging and latest dist-tags before and after promotion", "Never rebuild or overwrite the published version on retry"]
    if_unresolved: "s04 cannot define safe publication failure behavior."
  - id: "OQ-R263-006"
    topic: "Rollback service-level objective"
    status: "APPROVED"
    selected_option: "A"
    reviewers: ["po", "devops", "qc"]
    options:
      - id: "A"
        summary: "Require each supported installation mode to return to verified v2.6.2 within 15 minutes during rehearsal."
        pros: ["Creates an operationally meaningful rollback measure", "Makes recovery expectations explicit"]
        cons: ["Timing may vary by network and local environment"]
        risks: ["A noisy environment can fail the time target despite functional rollback"]
      - id: "B"
        summary: "Require functional rollback evidence without a time target."
        pros: ["Less environment-sensitive"]
        cons: ["Does not show that rollback is usable during an incident"]
        risks: ["A technically possible but slow recovery path may be accepted"]
    recommended_option: "A"
    recommendation_reason: "Fifteen minutes is a practical patch-release recovery target; the evidence can record network-related exclusions without weakening functional correctness."
    validation_plan: ["Measure each rehearsal mode separately", "Record functional result and elapsed time", "Treat functional failure as blocking and environmental timing variance as a reviewed exception"]
    if_unresolved: "s04 cannot freeze the rollback performance criterion."
missing_inputs: []
conflicts:
  - id: "CONFLICT-R263-001"
    statement: "3204749e is the approved baseline, but version preparation necessarily creates a different final candidate SHA."
    resolution_direction: "Treat 3204749e as the immutable baseline and bind Release to its reviewed release-only descendant."
    status: "RESOLVED"
  - id: "CONFLICT-R263-002"
    statement: "GitHub and npm cannot be published atomically."
    resolution_direction: "Stage npm without moving latest, verify GitHub, then promote latest."
    status: "RESOLVED"
  - id: "CONFLICT-R263-003"
    statement: "Release notes must cover the full artifact without pulling unrelated work into implementation scope."
    resolution_direction: "Document the complete packaged delta; do not modify behavior outside the release-only descendant."
    status: "RESOLVED"
assumptions:
  - "npm supports a non-latest staging dist-tag and later dist-tag promotion."
  - "GitHub Release can attach the exact tarball built by Workflow Guardrails."
  - "The retained v2.6.2 registry and GitHub artifacts remain downloadable for rollback verification."
  - "A registry-authentication preflight can be performed without publishing."
validation_plan:
  - "Translate accepted decisions into measurable s04 criteria and DoR checks."
  - "Keep publication commands and file-level design out of s03; lock them in s05/s06."
  - "Reject any approach that rebuilds per channel, edits historical evidence, or moves latest before cross-channel verification."
notes_for_next_step: "OQ-R263-001..006 are approved as Option A; s04 may freeze measurable acceptance criteria and assess DoR without inferring any later gate approval."
```

## Input Readiness
```yaml
step: "s03 -> s04 Acceptance + DoR"
status: READY
available_inputs:
  - "Approved CHANGE-007 and work-item trusted receipts"
  - "Approved s02 Business Goal"
  - "Baseline main 3204749e and immutable v2.6.2 rollback identity"
  - "Existing Workflow Guardrails exact-candidate model"
  - "Decision-ready options and recommendations for OQ-R263-001..006"
missing_inputs: []
invalid_inputs: []
conflicts: []
assumptions:
  - "The accepted Option A decisions constrain s04 but do not approve Spec, DoR, Approach, Task Plan, Release, or Business Acceptance."
risk_level: MEDIUM
next_action: "Author measurable s04 acceptance criteria and present Spec to BA plus DoR to BA and QC for independent approval."
```

## Audit
```yaml
step: "s03 Open Questions"
status: PASS
checks:
  - criterion: "Each question has options, recommendation, rationale, validation direction, and authorized reviewers."
    result: PASS
    evidence: "OQ-R263-001..006 each contain two options, one recommended option, recommendation reason, validation plan, and reviewer list."
  - criterion: "Recommendations preserve exact-artifact promotion and immutable v2.6.2 rollback."
    result: PASS
    evidence: "OQ-R263-001..005 require one frozen artifact, digest verification, historical immutability, and explicit rollback evidence."
  - criterion: "Partial-publication policy protects the existing latest channel."
    result: PASS
    evidence: "OQ-R263-005 Option A stages npm without moving latest until GitHub and registry verification succeed."
  - criterion: "All required human owners accept or amend the bundle."
    result: PASS
    evidence: "The user explicitly approved Option A for OQ-R263-001..006 with every listed PO, BA, Developer, QC, and DevOps authority."
  - criterion: "No unresolved conflict remains before s04."
    result: PASS
    evidence: "CONFLICT-R263-001..003 are resolved by the corresponding approved Option A decisions."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Decision bundle authored in one focused pass."
gaps: []
risk_level: MEDIUM
next_action: "Proceed to s04 Acceptance + DoR authoring; keep Spec and DoR as independent human-controlled gates."
```

## Traceability
```yaml
upstream:
  - "release-workflow-bundle-v2-6-3.s01.restate.md"
  - "release-workflow-bundle-v2-6-3.s02.business-goal.md"
  - "changes/CHANGE-007/proposal.md"
decision_to_acceptance_handoff:
  - { decisions: ["OQ-R263-001", "OQ-R263-005"], acceptance_focus: "publication completeness, exact artifact, authentication, and partial-failure safety" }
  - { decisions: ["OQ-R263-002", "OQ-R263-004"], acceptance_focus: "release-surface ownership, history immutability, and complete delta coverage" }
  - { decisions: ["OQ-R263-003", "OQ-R263-006"], acceptance_focus: "compatibility matrix, rollback correctness, and recovery time" }
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Trạng thái readiness: `READY`; OQ-R263-001..006 đều chọn Option A với đầy đủ reviewer authority.
- Điều cần làm để sang step 4: soạn Spec/DoR dựa trên các quyết định đã khóa; BA và QC vẫn phải phê duyệt các gate tương ứng.

## Human Decision Record
```yaml
decision: "APPROVED"
reviewed_at: "2026-09-19T08:59:53Z"
decision_source: "User explicitly approved Option A for OQ-R263-001..006 with the named roles."
decisions:
  - { id: "OQ-R263-001", option: "A", reviewed_by: ["po", "devops", "qc"] }
  - { id: "OQ-R263-002", option: "A", reviewed_by: ["ba", "developer", "qc"] }
  - { id: "OQ-R263-003", option: "A", reviewed_by: ["developer", "qc", "devops"] }
  - { id: "OQ-R263-004", option: "A", reviewed_by: ["ba", "developer", "qc"] }
  - { id: "OQ-R263-005", option: "A", reviewed_by: ["devops", "qc"] }
  - { id: "OQ-R263-006", option: "A", reviewed_by: ["po", "devops", "qc"] }
authority_boundary: "Approves only the six s03 decisions; it does not approve Spec, DoR, Approach, Task Plan, implementation, DoD, Release, Business Acceptance, tag creation, or publication."
```
