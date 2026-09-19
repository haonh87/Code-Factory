---
artifact_id: "release-workflow-bundle-v2-6-3.s01.restate"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-3"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: review
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CHANGE-007"
change_status: draft
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Tóm tắt yêu cầu, phạm vi ban đầu, ràng buộc và governance context mở đầu.

## Step Contract
```yaml
step_goal: "Establish an auditable boundary for preparing workflow-bundle v2.6.3 from the approved main baseline without mutating v2.6.2 or publishing before the independent Release gate."
input_summary:
  - "Human approval to open a v2.6.3 release work item from main 3204749e9fac592e9f38e327dbd85a87b84b2325."
  - "v2.6.2 is the immutable GitHub/npm rollback baseline."
  - "DevOps and QC own the Release gate."
output_summary:
  - "Normalized release scope, constraints, open questions, dependencies, risks, and draft acceptance criteria."
  - "CHANGE-007 and one protocol-managed work item with HARD_RELEASE routing."
done_when:
  - "The release request is distinguishable from earlier role-skill and governance work items."
  - "The source baseline, rollback baseline, publication boundary, and human gates are explicit."
  - "Unresolved publication choices are routed to s03 instead of inferred."
owner: "agent"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes; humans approve every applicable gate."
  - "A release is a hard product-delivery escalation."
  - "Build once and promote the exact verified artifact."
  - "Published tags, releases, assets, and rollback evidence are immutable."
required_reviews:
  - "BA: Spec"
  - "BA and QC: DoR"
  - "Developer: Approach and Task Plan"
  - "QC: DoD"
  - "DevOps and QC: Release"
  - "PO: Business Acceptance"
prohibited_actions:
  - "Do not publish, tag, or move npm latest before the Release gate passes."
  - "Do not recreate, retarget, overwrite, or edit v2.6.2 release history."
  - "Do not describe baseline commit 3204749e as the final candidate after release-only edits create a descendant commit."
  - "Do not include unrelated unfinished implementation merely because it exists in another worktree."
open_governance_questions:
  - "Whether publication must cover both GitHub Release and npm, or GitHub only."
  - "Which release-surface files are current authored content versus immutable historical evidence."
```

## Artifact Chính
```yaml
raw_request: "Phê duyệt mở work item phát hành workflow-bundle v2.6.3 từ main 3204749e…, rollback v2.6.2; Release gate thuộc DevOps và QC."
restated_request: "Prepare and, only after all independent gates pass, publish workflow-bundle v2.6.3 from baseline main commit 3204749e9fac592e9f38e327dbd85a87b84b2325. Preserve v2.6.2 as immutable rollback, bind publication to one exact candidate artifact, verify supported CLI/Codex/Claude installation paths, and require DevOps plus QC approval at the Release gate."
request_type: CHANGE
business_context: "The fixes merged after v2.6.2, including the CR-009 terminal-state reconciliation, are not present in the currently published npm/GitHub artifact. Users need a traceable patch release rather than an invalid reuse of the existing v2.6.2 identity."
scope_in:
  - "Use 3204749e9fac592e9f38e327dbd85a87b84b2325 as the exact brownfield baseline."
  - "Prepare a minimal release-only descendant candidate identified as workflow-bundle v2.6.3."
  - "Align package metadata, active release tests, current EN/VI release surfaces, and a new v2.6.3 release record."
  - "Build one tarball, record its SHA-256, and reuse those exact bytes for verification and publication."
  - "Verify Node 18 and Node 22 candidate lanes and supported CLI/Codex/Claude install or update modes."
  - "Verify rollback to immutable v2.6.2."
  - "Require QC DoD, DevOps+QC Release, and PO Business Acceptance as independent decisions."
scope_out:
  - "No new product behavior or refactor beyond the merged baseline and the minimum release-surface delta."
  - "No mutation, retargeting, replacement, or deletion of the v2.6.2 tag, GitHub Release, asset, or npm version."
  - "No implementation of unrelated open work items or audit-plan tasks."
  - "No automatic tag, GitHub publication, npm publication, or latest dist-tag movement before Release approval."
  - "No major or minor version change."
open_questions:
  - id: "OQ-R263-001"
    question: "Must v2.6.3 publish to both GitHub Releases and npm latest, or GitHub Releases only?"
    owner: "PO and DevOps"
    recommendation: "Publish both, matching the existing v2.6.2 public surfaces."
  - id: "OQ-R263-002"
    question: "Which current documentation surfaces should advance to v2.6.3 while historical v2.6.0-v2.6.2 records remain byte-stable?"
    owner: "BA and Developer"
    recommendation: "Update only active current-release surfaces plus a new v2.6.3 release record; hash-lock historical release notes."
  - id: "OQ-R263-003"
    question: "What compatibility matrix is mandatory for candidate and rollback evidence?"
    owner: "Developer and QC"
    recommendation: "Verify CLI plus Codex/Claude global/project installation paths, Node 18/22 hosted candidate lanes, and exact rollback to v2.6.2."
  - id: "OQ-R263-004"
    question: "Should the release note cover the complete v2.6.2..candidate production delta rather than only CR-009?"
    owner: "BA, Developer, and QC"
    recommendation: "Yes; the tag represents the complete artifact delta, with unrelated workflow-document history summarized separately from packaged behavior."
assumptions:
  - "v2.6.3 is a backward-compatible patch release unless verification discovers a breaking public contract."
  - "The final candidate will be a descendant of 3204749e because the version and release surfaces must change."
  - "The npm package name remains workflow-bundle and v2.6.2 remains available as rollback."
  - "No release command will run until an exact candidate source SHA, hosted run, tarball digest, and rollback digest are bound in s08."
dependencies:
  - "GitHub Actions Workflow Guardrails and exact release-candidate artifact upload."
  - "GitHub tag/Release permissions."
  - "npm publication credentials satisfying registry 2FA or a granular token with bypass-2FA permission."
  - "Retained immutable v2.6.2 tag, GitHub asset, npm package, and recorded digest."
risks_initial:
  - "The delta from v2.6.2 to main contains more than CR-009; incomplete release notes could misrepresent the artifact."
  - "Active documentation contains stale v2.6.1/v2.6.2 wording and requires deliberate ownership classification."
  - "Publishing is externally visible and difficult to reverse; a wrong tag or npm version cannot be safely overwritten."
  - "npm authentication previously blocked publication and must be proven before Release approval."
  - "Rebuilding separately for GitHub and npm could produce non-identical artifacts."
acceptance_criteria_draft:
  - id: "AC-R263-01"
    description: "All structured package metadata and approved current release surfaces identify 2.6.3, while immutable v2.6.2 evidence remains unchanged."
    measurable: true
  - id: "AC-R263-02"
    description: "The final source is a reviewed descendant of baseline 3204749e with only approved release preparation changes beyond that baseline."
    measurable: true
  - id: "AC-R263-03"
    description: "Workflow Guardrails passes every required job for the final source, including exact candidate build and Node 18/22 verification."
    measurable: true
  - id: "AC-R263-04"
    description: "One candidate tarball has a recorded SHA-256 and the GitHub/npm published downloads, when applicable, match that exact digest."
    measurable: true
  - id: "AC-R263-05"
    description: "Candidate installation/update passes for the approved CLI and Codex/Claude global/project compatibility matrix."
    measurable: true
  - id: "AC-R263-06"
    description: "Rollback to immutable v2.6.2 passes the same approved compatibility matrix without changing retained v2.6.2 identity."
    measurable: true
  - id: "AC-R263-07"
    description: "The annotated v2.6.3 tag resolves to the approved candidate source and the release record identifies the exact artifact digest."
    measurable: true
  - id: "AC-R263-08"
    description: "No publication occurs before QC DoD and DevOps+QC Release receipts are approved and digest-valid."
    measurable: true
  - id: "AC-R263-09"
    description: "The v2.6.3 release note describes the complete packaged delta from v2.6.2, compatibility, known residual risks, and rollback instructions."
    measurable: true
  - id: "AC-R263-10"
    description: "Post-publication verification records GitHub/npm identities, exact downloaded digests, install smoke results, and PO Business Acceptance."
    measurable: true
notes_for_next_step: "s02 should lock the user value of making post-v2.6.2 fixes safely consumable. s03 must decide publication surfaces, current-vs-historical documentation ownership, compatibility matrix, and full-delta release-note coverage before Spec/DoR."
```

## Work Item Materialization
```yaml
materialization_status: READY
decision_owner: "agent"
raw_request_summary: "Promote v263-3204749e with v262 fallback."
split_decision: single
dedup_result: no_conflict
work_item_slug: "release-workflow-bundle-v2-6-3"
work_item_type: CHANGE
delivery_context: brownfield
sdd_preset: "full"
selected_profile: "full"
sdd_mode: none
sdd_escalation_reasons: []
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
change_strategy: create_new
change_id: "CHANGE-007"
decision_reason:
  - "split_decision=single"
  - "work_item_type=CHANGE"
  - "delivery_context=brownfield"
  - "dedup_result=no_conflict"
  - "change_strategy=create_new"
  - "planning_track=full"
  - "governance_profile=strict"
  - "sdd_preset=full"
  - "selected_profile=full"
  - "sdd_mode=none"
  - "sdd_escalation_reasons="
existing_refs: []
blockers: []
```

## Work Item Protocol
```yaml
protocol_status: MATERIALIZED
approval_status: APPROVED
review_required: true
artifact_shape: adaptive_v1
request_lane: product_delivery
workflow_required: true
routing_reasons:
  - "LANE_PRODUCT_DELIVERY"
escalation_reasons:
  - "HARD_RELEASE"
role_applicability:
  - "{\"role\":\"po\",\"reasons\":[\"ROLE_PO_PRODUCT_OUTCOME\"]}"
  - "{\"role\":\"ba\",\"reasons\":[\"ROLE_BA_REQUIREMENTS\"]}"
  - "{\"role\":\"developer\",\"reasons\":[\"ROLE_DEVELOPER_DELIVERY\"]}"
  - "{\"role\":\"qc\",\"reasons\":[\"ROLE_QC_VERIFICATION\"]}"
  - "{\"role\":\"devops\",\"reasons\":[\"ROLE_DEVOPS_RELEASE\"]}"
gate_applicability:
  - "{\"gate\":\"spec\",\"reasons\":[\"GATE_SPEC_PRODUCT_DELIVERY\"],\"reviewer_roles\":[\"ba\"]}"
  - "{\"gate\":\"dor\",\"reasons\":[\"GATE_DOR_PRODUCT_DELIVERY\"],\"reviewer_roles\":[\"ba\",\"qc\"]}"
  - "{\"gate\":\"approach\",\"reasons\":[\"GATE_APPROACH_PRODUCT_DELIVERY\"],\"reviewer_roles\":[\"developer\"]}"
  - "{\"gate\":\"task_plan\",\"reasons\":[\"GATE_TASK_PLAN_PRODUCT_DELIVERY\"],\"reviewer_roles\":[\"developer\"]}"
  - "{\"gate\":\"dod\",\"reasons\":[\"GATE_DOD_PRODUCT_DELIVERY\"],\"reviewer_roles\":[\"qc\"]}"
  - "{\"gate\":\"release\",\"reasons\":[\"GATE_RELEASE_PUBLICATION\"],\"reviewer_roles\":[\"devops\",\"qc\"]}"
  - "{\"gate\":\"business_acceptance\",\"reasons\":[\"GATE_BUSINESS_ACCEPTANCE_PRODUCT_OUTCOME\",\"GATE_BUSINESS_ACCEPTANCE_RELEASE_OUTCOME\"],\"reviewer_roles\":[\"po\"]}"
work_item_slug: "release-workflow-bundle-v2-6-3"
work_item_type: CHANGE
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/release-workflow-bundle-v2-6-3/work-items/release-workflow-bundle-v2-6-3"
current_step: "s01"
granted_write_paths: []
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: create_new
change_id: "CHANGE-007"
decision_owner: "agent"
protocol_owner: "po"
reviewed_by: "po"
reviewed_at: "2026-09-19T08:48:27.806Z"
handoff_target: "human-review"
last_transition_action: "approve"
last_transition_at: "2026-09-19T08:48:27.807Z"
required_actions:
  - {"id":"se:6ee5e91f9895141bedc6ec73409d18cbc52d86cef1ab943cb4e41bc4bf5bc0f9","kind":"workflow_followup","text":"wfc change-item approve --change-id CHANGE-007 --reviewed-by <role>"}
  - {"id":"se:440f5d1de06856e1a6cf03220e543abc0984c14b227573a442b72455b7724d69","kind":"gate_approval","text":"wfc gate approve --work-item release-workflow-bundle-v2-6-3 --gate spec --reviewed-by ba","gate":"spec"}
  - {"id":"se:9ed41867a24f911cb6089bd8f75ee756bc93f66023befa368582adbb2d5ba461","kind":"gate_approval","text":"wfc gate approve --work-item release-workflow-bundle-v2-6-3 --gate dor --reviewed-by ba","gate":"dor"}
  - {"id":"se:6bf1a66609a55cd10ce75383d6ff424fc1424448e593c3a578c6aa2af8e2ed70","kind":"gate_approval","text":"wfc gate approve --work-item release-workflow-bundle-v2-6-3 --gate approach --reviewed-by developer","gate":"approach"}
  - {"id":"se:ea6d7fbe5bfa918c9e2cbe647194dce33781afccbd2d203117137bd337985330","kind":"gate_approval","text":"wfc gate approve --work-item release-workflow-bundle-v2-6-3 --gate task_plan --reviewed-by developer","gate":"task_plan"}
  - {"id":"se:755d52a4ebc203c62805ff31f8972f258ba7d2e57c4e157e4182928eb4bc7895","kind":"work_item_activation","text":"wfc work-item activate --work-item release-workflow-bundle-v2-6-3 --step s07 --write-root <path>"}
blockers: []
review_notes:
  - "PO approved opening the workflow-bundle v2.6.3 release work item; later gates remain independent."
refs:
  - "work-items/release-workflow-bundle-v2-6-3"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "CHANGE_CREATED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "WORK_ITEM_APPROVED"
```

## Traceability
```yaml
source_inputs:
  - "Human approval in chat to open the v2.6.3 work item with v2.6.2 rollback and DevOps/QC Release authority."
  - "Remote main baseline 3204749e9fac592e9f38e327dbd85a87b84b2325."
  - "Existing immutable GitHub/npm release v2.6.2."
  - "Repository delta v2.6.2..3204749e and current release-surface tests/documentation."
next_step: "s02 Business Goal after trusted approval of CHANGE-007 and the work item."
```

## Audit
```yaml
step: "s01 Clarify"
status: PASS
checks:
  - criterion: "The release request is distinguishable from earlier role-skill and governance work items."
    result: PASS
    evidence: "Dedup review classified align-adaptive-sa-ta-applicability and closeout-bundle-legacy-dod-compatibility as archived, and arch-role-skills-release as a different pending scope; materializer recorded dedup_result=no_conflict."
  - criterion: "The source baseline, rollback baseline, publication boundary, and human gates are explicit."
    result: PASS
    evidence: "The main artifact names baseline 3204749e, immutable rollback v2.6.2, publication prohibitions, and QC/DevOps/PO gate ownership."
  - criterion: "Unresolved publication choices are routed to s03 instead of inferred."
    result: PASS
    evidence: "OQ-R263-001..004 capture channels, documentation ownership, compatibility matrix, and full-delta release-note scope with named owners and recommendations."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed within the opening/materialization session."
gaps:
  - "The repo-wide protocol validator exposes pre-existing stale gate actions in code-factory-holistic-audit-remediation; CHANGE-007 does not own or modify that baseline gap."
risk_level: MEDIUM
next_action: "Obtain trusted human approval for CHANGE-007 and release-workflow-bundle-v2-6-3, then author s02 Business Goal."
```

## Handoff
- Điều đã rõ: v2.6.3 is a patch-release work item from baseline `3204749e…`; v2.6.2 is immutable rollback; DevOps and QC own Release approval.
- Điều còn cần theo dõi: publication channels, current-versus-historical release surfaces, compatibility matrix, and complete release-note delta remain explicit s03 decisions.
- Điều kiện sang step 2: CHANGE-007 and the work item have valid trusted human approval receipts.
