---
artifact_id: "upgrade-guardrails-actions-node24.s01.restate"
artifact_family: workflow-step
work_item_slug: "upgrade-guardrails-actions-node24"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/upgrade-guardrails-actions-node24.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec: ["developer"]
  dor: ["qc"]
  approach: ["developer"]
  task_plan: ["developer"]
  dod: ["qc"]
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
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts:
  - "../../product-specs/cards/upgrade-guardrails-actions-node24.md"
  - "upgrade-guardrails-actions-node24.work-item-report.json"
  - "../../.github/workflows/workflow-guardrails.yml"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Upgrade all checkout and Node setup steps in the guardrails workflow to their Node 24 action
> majors before the GitHub runner cutoff, without changing job topology or the deferred validator
> parallelisation scope. This is a brownfield, medium-risk CI maintenance change using SDD Light.
> PO explicitly approved the work item and its trusted receipt verified at
> `2026-09-11T08:20:11Z`. The compact Spec/DoR/Approach/Task Plan bundle is now authored for
> Developer and QC approved the four readiness decisions at `2026-09-11T08:32:50Z`; implementation
> remains closed until their independent trusted receipts are sealed and s07 is explicitly activated.

## Router Status
```yaml
current_step: "s06 Task Plan"
workflow_status: WAITING_APPROVAL
delivery_context: brownfield
missing_gates: ["Trusted Spec receipt", "Trusted DoR receipt", "Trusted Approach receipt", "Trusted Task Plan receipt"]
next_artifact: "Four independent ready-bundle receipts hosted by s04 and s06"
next_human_action: "Seal the four independent receipts with approve-ready-bundle"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes; humans retain approval authority"
  - "SDD Light reduces authoring volume, not logical gates"
  - "Brownfield changes use the smallest correct delta"
  - "Release-pipeline changes preserve rollback and hosted evidence"
required_reviews:
  - "PO work-item approval"
  - "Developer readiness review for the maintenance specification and approach/plan"
  - "QC readiness and DoD review"
prohibited_actions:
  - "Edit workflow-guardrails.yml before the compact readiness bundle is approved and the item is activated"
  - "Parallelize validators, create a matrix, or change fail-fast behavior"
  - "Infer hosted success or zero annotations from local YAML validation"
open_governance_questions: []
```

## Main Artifact
```yaml
raw_request: "Upgrade actions/checkout@v4 to actions/checkout@v7 and actions/setup-node@v4 to actions/setup-node@v7 in every job of workflow-guardrails.yml, including release-candidate-build; retain fetch-depth: 0 there and verify a hosted green run with zero Node deprecation annotations."
restated_request: >-
  Make a version-only update to all nine checkout uses and all nine setup-node uses in
  .github/workflows/workflow-guardrails.yml. Keep every job, dependency, trigger, Node matrix,
  input, cache/submodule/credential behavior, and release-candidate fetch-depth unchanged. Validate
  locally and then bind one successful hosted run with zero Node deprecation annotations.
request_type: CHANGE
user_problem_initial: "The guardrails pipeline depends on action majors that execute on Node 20 and will become incompatible with GitHub-hosted runners after the announced removal date."
business_context_initial: "A failed guardrails workflow blocks safe delivery and release-candidate evidence across Code-Factory."
scope_draft:
  in:
    - "Nine actions/checkout references: @v4 to @v7"
    - "Nine actions/setup-node references: @v4 to @v7"
    - "All existing jobs, including release-candidate-build"
    - "Local syntax/count/invariant checks and one hosted run"
  out:
    - "Validator matrix conversion or any parallelisation"
    - "Job, needs, trigger, permission, timeout, Node-version, cache, registry, submodule, or credential-policy redesign"
    - "Changes outside workflow-guardrails.yml except this work item's evidence"
constraints_initial:
  - "release-candidate-build checkout keeps fetch-depth: 0"
  - "Use actions/checkout@v7 and actions/setup-node@v7, corresponding to reviewed v7.0.1 and v7.0.0 releases"
  - "The hosted run must finish green with zero Node deprecation annotations"
  - "GitHub's stated Node 20 runner removal date is 2026-09-23"
  - "Do not absorb work item ci-guardrails-parallelisation"
assumptions_initial:
  - "All jobs remain on GitHub-hosted ubuntu-latest runners"
  - "The root manifest does not opt into setup-node automatic npm caching"
  - "No checkout step overrides submodules or credential persistence, so current defaults remain unchanged"
open_questions_initial: []
dependencies_initial:
  - "GitHub-hosted runner support for Node 24 actions"
  - "A hosted workflow run after the branch change is pushed"
risks_initial:
  - "Three-major action jumps may introduce changed defaults or runner compatibility constraints"
  - "A careless bulk edit could miss release-candidate-build or remove its full-history checkout"
  - "Local checks cannot prove hosted annotations are absent"
notes_for_step_2: "Business goal and open questions are compacted into this s01 under the SDD Light physical-note contract."
```

## Business Goal
```yaml
business_goal: "Keep the Code-Factory guardrails and release-candidate evidence path operational on GitHub-hosted runners after Node 20 removal."
success_metrics:
  - "9/9 checkout uses are actions/checkout@v7 and 0 remain at @v4"
  - "9/9 setup-node uses are actions/setup-node@v7 and 0 remain at @v4"
  - "release-candidate-build retains fetch-depth: 0"
  - "Job and dependency topology are unchanged apart from the 18 action-version tokens"
  - "One hosted run is green with zero Node deprecation annotations"
non_goals:
  - "Faster workflow execution"
  - "Matrix refactoring or fail-fast changes"
  - "Node application-runtime upgrade"
  - "Release publication or tagging"
```

## Open Questions
```yaml
open_questions: []
missing_inputs: []
conflicts:
  - id: "CI-N24-CONFLICT-001"
    status: RESOLVED_BY_SCOPE
    statement: "The separate ci-guardrails-parallelisation item also intends to edit this workflow."
    resolution: "This branch owns only the action-version delta; topology restructuring remains deferred until this branch merges."
decisions:
  - { id: "CI-N24-DEC-001", decision: "Use checkout@v7 and setup-node@v7 in every existing job.", source: "Explicit transferred request" }
  - { id: "CI-N24-DEC-002", decision: "Keep release-candidate-build fetch-depth: 0 and preserve all other behavior.", source: "Explicit transferred request" }
  - { id: "CI-N24-DEC-003", decision: "Require a hosted green run with zero Node deprecation annotations.", source: "Explicit transferred request" }
```

## SA/TA Architecture Drivers
```yaml
sa_profile: driver_only
ta_profile: driver_only
landscape_change: false
sa_drivers:
  - id: "DRV-SA-CI-N24-001"
    objective: "Preserve the repository's mandatory guardrails capability beyond 2026-09-23."
    measure: "One hosted run passes every existing job with zero Node deprecation annotations."
    ownership: "workflow-guardrails.yml continues to own orchestration; individual validators retain current ownership."
    handoff: ["developer", "qc"]
  - id: "DRV-SA-CI-N24-002"
    objective: "Avoid scope collision with ci-guardrails-parallelisation."
    measure: "0 jobs, needs edges, matrix definitions, or fail-fast settings changed."
    ownership: "The parallelisation item remains sole owner of topology restructuring after merge."
    handoff: ["developer", "qc"]
ta_drivers:
  - id: "DRV-TA-CI-N24-001"
    scenario: "When GitHub-hosted runners stop providing Node 20, every checkout/setup step still starts successfully."
    threshold: "18/18 action references use the Node 24-backed v7 major; 0 Node deprecation annotations."
    constraint: "Hosted runner image satisfies action runner >= 2.327.1; no self-hosted runner is in scope."
    handoff: ["developer", "qc"]
  - id: "DRV-TA-CI-N24-002"
    scenario: "When the release candidate job checks out source, artifact identity still includes full repository history."
    threshold: "fetch-depth remains exactly 0 in release-candidate-build."
    constraint: "Default fetch-depth remains 1 elsewhere; submodules=false and persist-credentials=true remain implicit defaults."
    handoff: ["developer", "qc"]
  - id: "DRV-TA-CI-N24-003"
    scenario: "When the upgrade is reviewed, the version bump can be distinguished from topology work."
    threshold: "Only 18 uses tokens change in the workflow source; all other normalized YAML structure is unchanged."
    constraint: "No cache input is added; no always-auth or registry-url behavior is introduced."
    handoff: ["developer", "qc"]
```

## SDD Traceability
```yaml
requirement_refs: ["CI-N24-REQ-001", "CI-N24-REQ-002", "CI-N24-REQ-003"]
acceptance_refs: ["CI-N24-AC-01", "CI-N24-AC-02", "CI-N24-AC-03", "CI-N24-AC-04"]
task_refs: ["CI-N24-T1", "CI-N24-T2", "CI-N24-T3"]
test_refs: ["CI-N24-V1", "CI-N24-V2", "CI-N24-V3"]
```

## Work Item Materialization
```yaml
materialization_status: READY
decision_owner: "agent"
raw_request_summary: "Upgrade all checkout/setup-node uses in workflow-guardrails.yml to v7 while preserving behavior and proving hosted Node 24 compatibility."
split_decision: single
dedup_result: no_conflict
work_item_slug: "upgrade-guardrails-actions-node24"
work_item_type: CHANGE
delivery_context: brownfield
sdd_preset: "light"
selected_profile: "sdd-light"
sdd_mode: light
sdd_escalation_reasons: []
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
change_strategy: none
change_id: ""
decision_reason:
  - "split_decision=single"
  - "work_item_type=CHANGE"
  - "delivery_context=brownfield"
  - "dedup_result=no_conflict"
  - "change_strategy=none"
  - "planning_track=quick"
  - "governance_profile=default"
  - "sdd_preset=light"
  - "selected_profile=sdd-light"
  - "sdd_mode=light"
  - "sdd_escalation_reasons="
existing_refs: []
blockers: []
```

## Work Item Protocol
```yaml
protocol_status: ACTIVE
approval_status: APPROVED
review_required: true
work_item_slug: "upgrade-guardrails-actions-node24"
work_item_type: CHANGE
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/cr-008-adaptive-governance/work-items/upgrade-guardrails-actions-node24"
current_step: "s07"
granted_write_paths:
  - ".github/workflows/workflow-guardrails.yml"
  - "work-items/upgrade-guardrails-actions-node24"
  - "product-specs/cards/upgrade-guardrails-actions-node24.md"
  - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
  - "packages/workflow-bundle/test/release-surface.test.js"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "agent"
protocol_owner: "po"
reviewed_by: "po"
reviewed_at: "2026-09-11T08:20:11.412Z"
handoff_target: "step-s07-t4b-owner"
last_transition_action: "resume"
last_transition_at: "2026-09-15T10:21:15.722Z"
required_actions:
  - {"id":"se:1690cc592156372c298a3dae01726b118dfee7bcee02865a524e5dfb89d23fa1","kind":"workflow_followup","text":"Continue active execution from the current step."}
blockers: []
review_notes:
  - "PO approved the Node 24 guardrails action upgrade; later gates remain independent."
  - "Trusted PO work-item receipt recorded at 2026-09-11T08:20:11.420Z verifies APPROVED for this project root."
  - "Compact s04 and s06 are drafted; no ready-bundle gate or implementation authority is inferred."
  - "Human Developer approved Spec, Approach, and Task Plan; human QC approved DoR at 2026-09-11T08:32:50Z. Receipt sealing and activation remain separate."
  - "Hosted run 34947061938 exposed F-N24-H1: three Node 20 annotations from upload/download-artifact@v4 despite 10/10 job success."
  - "Human Developer/QC approved F-N24-H1 and readiness rework; Developer approved Option A Task Plan amendment T4a and the Spec Card authoring path at 2026-09-15T09:14:23Z. Amended gate approvals and production edits remain separate."
  - "Human Developer approved amended Spec v0.2, Approach, and Task Plan T4a; human QC approved amended DoR at 2026-09-15T09:27:44Z. Fresh receipt sealing and resume remain separate."
  - "Human Developer/QC approved F-N24-T4A-001; Developer approved the unchanged-semantic Approach and Task Plan amendment T4b at 2026-09-15T10:17:29Z. Fresh s06 receipts and resume remain separate."
  - "Fresh T4b Approach and Task Plan receipts match s06 SHA-256 b8e91fe17e5b2fcc46af6c1c712030a336f2f5f849422ef9008f09290656fa43; the work item resumed at 2026-09-15T10:21:15.722Z with all five approved write roots."
  - "Human Developer/QC approved refreshed CI-N24-T4a/T4b Spec Compliance for source 53bab65030dd925d8f814454b504d12c2dec9505, workflow SHA-256 b72a0cb172d8a11c5d2e96acc6a31bdd9c22b00f48b0a8fd0e643ae0d3ad0f30, and source-set SHA-256 7115db15698953da66881d18335ab48b02b4f9102d46e5b2b29a9d3283d5983a at 2026-09-15T10:33:17Z. Code Quality remains independent."
  - "Human Developer/QC approved refreshed CI-N24-T4a/T4b Code Quality for source 53bab65030dd925d8f814454b504d12c2dec9505 and implementation diff SHA-256 4852365ded7042836b4327e3506bdae04e5747200c83c3545afe3df12c9ddedc at 2026-09-15T10:41:09Z. Hosted zero-annotation verification remains separate."
  - "Hosted run 34959637638 for source 41e7b0187ff97e486b019bb9d69ab2945d7bbf8a passed 10/10 jobs with zero annotations across all 10 check-runs; downloaded v2.6.2 candidate SHA-256 af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f matches its declared digest. QC Technical Verification and DoD remain separate."
refs:
  - "work-items/upgrade-guardrails-actions-node24"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "S01_CLARIFY_LIGHT_DRAFTED"
  - "WORK_ITEM_REVIEW_RECORDED_PENDING_RECEIPT"
  - "WORK_ITEM_APPROVED"
  - "TRUSTED_WORK_ITEM_RECEIPT_VERIFIED"
  - "SDD_LIGHT_S04_S06_DRAFTED"
  - "SDD_LIGHT_READY_BUNDLE_HUMAN_APPROVED_PENDING_RECEIPTS"
  - "READINESS_BUNDLE_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "WORK_ITEM_BLOCKED"
  - "F_N24_H1_AND_T4A_DIRECTION_APPROVED"
  - "AMENDED_READINESS_GATES_HUMAN_APPROVED_PENDING_RECEIPTS"
  - "WORK_ITEM_RESUMED"
  - "F_N24_T4A_001_AND_T4B_HUMAN_APPROVED_PENDING_RECEIPTS"
  - "T4B_READINESS_RECEIPTS_VERIFIED_AND_RESUMED"
  - "T4AB_REFRESHED_SPEC_COMPLIANCE_APPROVED"
  - "T4AB_REFRESHED_CODE_QUALITY_APPROVED"
  - "CI_N24_HOSTED_ZERO_ANNOTATION_EVIDENCE_COLLECTED"
```

## Audit
```yaml
step: "s01 Clarify"
status: PASS
checks:
  - { criterion: "Request and scope are exact", result: PASS, evidence: "Nine checkout and nine setup-node references are identified; topology work is excluded." }
  - { criterion: "Delivery context and Light eligibility are explicit", result: PASS, evidence: "Brownfield + quick + default + agentic/self + medium risk; no hard escalation trigger is present." }
  - { criterion: "Architecture drivers are bounded", result: PASS, evidence: "No system seam moves; SA/TA drivers cover capability ownership, compatibility, and hosted evidence." }
  - { criterion: "Open questions block authoring", result: PASS, evidence: "No unresolved acceptance-changing question remains; the verified PO receipt opens compact s04+s06 authoring." }
constraint_violations: []
unmitigated_high_risks: []
gaps: []
risk_level: MEDIUM
next_action: "Review the compact Spec, DoR, Approach, and Task Plan; do not implement until four trusted receipts pass and s07 is activated."
```
