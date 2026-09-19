---
artifact_id: "release-workflow-bundle-v2-6-3.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-3"
step_id: "s02"
step_slug: "business-goal"
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "release-workflow-bundle-v2-6-3.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Người dùng đang nhận `v2.6.2`, trong khi các sửa lỗi đã merge sau phiên bản đó chưa có trong artifact công khai. Mục tiêu là phát hành một patch `v2.6.3` có thể kiểm chứng và rollback, không tái sử dụng hoặc làm sai lệch lịch sử `v2.6.2`.

## Step Contract
```yaml
step_goal: "Lock the user and business value of a governed v2.6.3 patch release before deciding publication mechanics."
input_summary:
  - "Approved CHANGE-007 and release-workflow-bundle-v2-6-3 work item."
  - "s01 restatement with baseline 3204749e, immutable v2.6.2 rollback, release constraints, risks, and draft acceptance criteria."
output_summary:
  - "Business goal, user value, observable success outcomes, non-goals, priority, business risks, and candidate metrics."
done_when:
  - "The user problem and release value are concrete and traceable to the post-v2.6.2 gap."
  - "Success is observable without prescribing an implementation approach."
  - "Non-goals prevent the release from absorbing unrelated implementation work."
  - "s03 receives the unresolved decisions that materially affect scope or evidence."
owner: "po"
```

## Artifact Chính
```yaml
restated_request: "Prepare workflow-bundle v2.6.3 from the approved main baseline, preserve v2.6.2 as immutable rollback, and publish only after the exact candidate passes independent QC, DevOps, and PO controls."
user_problem: "Users installing the current public v2.6.2 artifact do not receive the workflow and terminal-state fixes merged afterward, while maintainers cannot safely label those later changes as v2.6.2 because that identity is already public and immutable."
business_goal: "Make the approved post-v2.6.2 workflow-bundle improvements safely consumable as a traceable v2.6.3 patch, with one verified artifact identity across every approved publication channel and a proven path back to v2.6.2."
user_value: "Codex and Claude users can install or update to a version that includes the merged governance and terminal-state fixes, verify what they received, and return to the known-good v2.6.2 package if needed."
success_outcome:
  - "Every approved public channel identifies the same v2.6.3 source and exact artifact bytes."
  - "Supported CLI and Codex/Claude installation paths report and run v2.6.3 successfully."
  - "A release operator can roll the supported installation paths back to immutable v2.6.2 using documented evidence."
  - "Reviewers can trace the complete packaged delta from v2.6.2 to the candidate and distinguish it from unrelated workflow-document history."
  - "No tag, asset, registry version, or latest pointer is published before the independent Release gate."
  - "PO can evaluate the public outcome after publication using exact source, artifact, compatibility, and rollback evidence."
non_goals:
  - "Do not add new workflow behavior solely to make the release appear larger."
  - "Do not implement unrelated open work items, audit recommendations, or documentation cleanup."
  - "Do not rewrite or replace any v2.6.0-v2.6.2 historical tag, release, asset, package, or release record."
  - "Do not change the product name, package name, major/minor compatibility promise, or supported runtime policy without a separate approved decision."
  - "Do not treat a green pre-merge run as publication authority."
priority_reason: "The latest public version lacks already-merged fixes to terminal archive safety and workflow governance. Delaying the patch extends the period in which users receive an older runtime, while reusing v2.6.2 would corrupt traceability."
risks_business:
  - "An incomplete release note could create a false expectation that v2.6.3 contains only CR-009 even though the source delta is broader."
  - "Different GitHub and npm artifacts would undermine reproducibility and rollback confidence."
  - "A failed or unauthorized npm publication could leave channels inconsistent after the GitHub release becomes public."
  - "Stale current documentation could direct users to the wrong candidate, rollback version, or approval state."
  - "Publishing unrelated unfinished behavior from another worktree would expand the patch beyond the approved baseline."
metrics_candidate:
  - "100% of required local and hosted release checks pass for the final candidate."
  - "100% digest equality between the frozen candidate and every approved published download."
  - "100% pass across the approved CLI/Codex/Claude install-update compatibility matrix."
  - "100% pass across the same approved rollback matrix to v2.6.2."
  - "Zero changes to immutable v2.6.2 identities or retained historical evidence."
  - "Zero unresolved release-blocking findings at DevOps/QC Release review."
  - "Rollback rehearsal completes within 15 minutes per supported installation mode, subject to s03 confirmation."
notes_for_next_step: "s03 must decide publication channels, current-versus-historical release surfaces, the mandatory compatibility/rollback matrix, complete delta coverage, registry authentication readiness, and whether the 15-minute rollback target is accepted."
```

## Traceability
```yaml
upstream:
  - "release-workflow-bundle-v2-6-3.s01.restate.md"
  - "changes/CHANGE-007/proposal.md"
next_step: "s03 Open Questions"
```

## Audit
```yaml
step: "s02 Business Goal"
status: PASS
checks:
  - criterion: "The user problem and release value are concrete and traceable to the post-v2.6.2 gap."
    result: PASS
    evidence: "The main artifact distinguishes the public v2.6.2 artifact from fixes merged afterward and explains why a new immutable patch identity is required."
  - criterion: "Success is observable without prescribing an implementation approach."
    result: PASS
    evidence: "Success outcomes and metrics cover artifact identity, installation, rollback, traceability, and gate timing without selecting scripts or file-level mechanics."
  - criterion: "Non-goals prevent the release from absorbing unrelated implementation work."
    result: PASS
    evidence: "Non-goals exclude unrelated work items, new behavior, historical mutation, product renaming, runtime-policy changes, and implicit publication authority."
  - criterion: "s03 receives the unresolved decisions that materially affect scope or evidence."
    result: PASS
    evidence: "notes_for_next_step explicitly routes channels, documentation ownership, compatibility, delta coverage, registry readiness, and rollback threshold to s03."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in the first post-approval authoring pass."
gaps: []
risk_level: MEDIUM
next_action: "Present the s02 Business Goal for PO approval before opening s03."
```

## Handoff
- User problem đã chốt: public `v2.6.2` không chứa các fix đã merge sau đó; phải dùng identity patch mới có evidence và rollback.
- Non-goals: không thêm feature, không kéo scope của work item khác vào release, không sửa lịch sử `v2.6.2`, không publish từ tín hiệu CI đơn lẻ.
- Điều kiện sang step 3: đã đạt bằng PO approval; s03 chốt OQ về channels, release surfaces, compatibility, delta coverage, authentication và rollback target.

## Human Approval Record
```yaml
decision: "APPROVED"
artifact: "release-workflow-bundle-v2-6-3.s02.business-goal.md"
reviewed_by: ["po"]
reviewed_at: "2026-09-19T08:52:58Z"
decision_source: "User explicitly approved the workflow-bundle v2.6.3 Business Goal and authorized proceeding to s03 Open Questions."
authority_boundary: "Approves the Business Goal only; it does not approve any s04-s08 gate, implementation, tag, publication, or release."
```
