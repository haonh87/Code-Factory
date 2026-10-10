---
artifact_id: "correct-light-router-vietnamese-guidance.s01.restate"
artifact_family: workflow-step
work_item_slug: "correct-light-router-vietnamese-guidance"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
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
change_id: ""
change_status: draft
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
  - "developer"
  - "qc"
  - "ba"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "ba"
  contract: []
  dor:
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
  business_acceptance: []
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
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
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
> The user explicitly accepted the work item, Spec + DoR, Approach A and Task Plan at checkpoint `ef8bf47`. Acceptance was recorded at 2026-10-06T06:28:40Z; this is the recording time, not an inferred chat timestamp. Trusted receipt sealing and CLI activation are still required before source implementation.

## Step Contract

```yaml
step: "s01"
step_goal: "Clarify the independent VI Light router correction and its admission boundary."
value: "Remove incorrect Light next-action guidance without changing approval authority."
input_summary:
  - "User accepted the next bounded M7 repair and reported completing the admission helper."
  - "Three signed Maintainer admission dispositions; integrated main f27093d06ecab43f40d481542e1be5f49bf279cc"
output_summary:
  - "Single-outcome scope, reasoned route, ownership and pending trusted sealing."
done_when:
  - "Human authoring approval is recorded; trusted sealing and activation remain required before execution."
owner: "developer"
constraints:
  - "English authoring; preserve Vietnamese source accents."
  - "No source or test edits before independent child activation."
  - "No parent approval or previous child receipt substitutes for this child."
risks:
  - "Content approval can be confused with runtime authority; retain the separate trusted receipt and activation requirements."
timebox:
  target_duration: "One authoring pass, then one bounded implementation/review pass after gates."
  deadline: "No external deadline."
  escalation_rule: "Stop and refresh scope/approval if the two source sections cannot satisfy the criteria."
```

## Governance Context

```yaml
governance_ref: "project-context/project-context.md"
request_lane: "maintenance"
delivery_context: "brownfield"
planning_track: "full"
sdd_mode: "none"
risk: "medium"
hard_triggers:
  public_contract: false
  migration: false
  security_sensitive: false
  regulated: false
  greenfield_foundation: false
  release: false
mixed_intent: false
applicable_principles:
  - "LANE_MAINTENANCE: one bounded guidance/test repair."
  - "ADAPTIVE_RUNTIME_PARITY_REQUIRED: parity is not attested; the legacy writer and its existing authoring gate set remain authoritative."
  - "Full/default/agentic was retained in the signed admission reason for critical entry guidance, EN/VI review and multiple sessions. This child corrects Light guidance; it is not itself a Light work item."
role_reasons:
  developer: "ROLE_DEVELOPER_BOUNDED_CHANGE: source guidance, regression and approach/task planning."
  qc: "ROLE_QC_DOD_VERIFICATION: verification and final technical DoD."
  ba: "ROLE_BA_REQUIREMENTS: named M7-L14 / CF-012 EN/VI meaning review and legacy Spec authority; no product expansion."
required_reviews:
  - "Work-item approval: Maintainer, legacy protocol requires it."
  - "Spec: BA; DoR: QC, with BA meaning evidence. Approach and Task Plan: Developer. Legacy authoring requirements remain under ADAPTIVE_RUNTIME_PARITY_REQUIRED."
  - "Task Plan: GATE_TASK_PLAN_BOUNDED_CHANGE. DoD: QC, GATE_DOD_TECHNICAL_CLOSEOUT."
  - "No PO, SA, TA or DevOps role is introduced. Contract/Foundation/UAT/Release/Business Acceptance are not applicable and create no pending action."
prohibited_actions:
  - "No implementation before work-item approval, four independent authoring receipts and activation."
  - "No manual report or Work Item Protocol editing; normal CLI owns both."
  - "No protected parent register, frozen parent hosts, M7 score ledger, global installation or release changes."
open_governance_questions: []
```

## Main Artifact

```yaml
raw_request: "Continue the accepted bounded M7 router VI follow-up after the human ran its admission helper."
restated_request: "Restore the two omitted Light host instructions in VI router steps 3 and 4 against canonical EN, with a focused regression and bounded BA/QC language evidence."
request_type: "BUG"
user_problem_initial: "A VI reader can be directed to seek a nonexistent separate s05 host/receipt for a Light work item."
business_context_initial: "P-LANGUAGE / CF-012 owns M7-L14, with P-SEM / CF-010 semantic review first. No new portfolio proposal or finding is opened."
scope_draft:
  in:
    - "Two VI router insertions; one standard-discovered regression; child evidence and derived local verification defined in s06."
  out:
    - "Other router sections, EN source edits, runtime/CLI/policy behavior, all other M7 repairs, release/install and worktree cleanup."
constraints_initial:
  - "Use integrated main baseline and exact EN semantics."
  - "Source grants are currently empty. Admission does not approve delivery gates."
assumptions_initial:
  - "Canonical EN and policy are the authority for this bounded mapping; drift reopens review."
open_questions_initial: []
dependencies_initial:
  - "correct-light-router-vietnamese-guidance.s04.acceptance-criteria.md"
  - "correct-light-router-vietnamese-guidance.s05.technical-approach.md"
  - "correct-light-router-vietnamese-guidance.s06.task-breakdown.md"
risks_initial:
  - "Wrong host wording causes a false blocker; omitted approvals could imply permission."
notes_for_step_2: "Measure correctness and actionable EN/VI parity only within the declared scopes."
```

## Work Item Protocol
```yaml
protocol_status: MATERIALIZED
approval_status: APPROVED
review_required: true
work_item_slug: "correct-light-router-vietnamese-guidance"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/correct-light-router-vietnamese-guidance/work-items/correct-light-router-vietnamese-guidance"
current_step: "s01"
granted_write_paths: []
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "agent"
protocol_owner: "maintainer"
reviewed_by: "maintainer"
reviewed_at: "2026-10-06T06:28:40Z"
handoff_target: "human-review"
last_transition_action: "approve"
last_transition_at: "2026-10-10T05:50:54.484Z"
required_actions:
  - {"id":"se:34ea2b4e91fccc9a3abb2c33080a530ff5051f6775bc2b7a99895ca1f62e8634","kind":"gate_approval","text":"wfc gate approve --work-item correct-light-router-vietnamese-guidance --gate spec --reviewed-by <role>","gate":"spec"}
  - {"id":"se:8210afb101e844775cfe7d9d5a4dd0bb02ea599be6deae197aa535233205d7bb","kind":"gate_approval","text":"wfc gate approve --work-item correct-light-router-vietnamese-guidance --gate dor --reviewed-by <role>","gate":"dor"}
  - {"id":"se:901bf4814975184120b6f0b655760eb657964286718772583dc48a193f654bb0","kind":"gate_approval","text":"wfc gate approve --work-item correct-light-router-vietnamese-guidance --gate approach --reviewed-by <role>","gate":"approach"}
  - {"id":"se:68ad795442118bbabd3d5ef2a2bb1549a13d82b70d80830416b9fe36362a2abb","kind":"gate_approval","text":"wfc gate approve --work-item correct-light-router-vietnamese-guidance --gate task_plan --reviewed-by <role>","gate":"task_plan"}
  - {"id":"se:032f0e2e753911114d8ebc274bda836e0ac66aedc0aa62390897bf6934f63f8c","kind":"work_item_activation","text":"wfc work-item activate --work-item correct-light-router-vietnamese-guidance --step s07 --write-root <path>"}
blockers: []
review_notes:
  - "User explicitly accepted work item, Spec/DoR, Approach A and Task Plan at ef8bf47e3c4b1c1a2450c7f24ce628dacc1cac3f; recorded 2026-10-06T06:28:40Z."
refs:
  - "work-items/correct-workflow-authority-guidance"
  - "work-items/release-workflow-bundle-v2-6-3"
  - "work-items/sdd-light-authority-cutover"
  - "work-items/correct-light-router-vietnamese-guidance"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "WORK_ITEM_APPROVED"
```

## Admission Evidence

```yaml
status: "RECOVERED"
verified_actor: "maintainer"
signed_operation_ids:
  - "0470c6cd-57fd-404e-8592-aab2766f215f"
  - "55dfb4f5-b9a9-4679-9116-39f94c67004e"
  - "76f1da51-4dcd-4b3a-b2e9-09e16e550609"
verification: "Production verifyRecordedDisposition accepted all three signatures and exact original reasons before recovery."
recovery_operation_id: "007fa629-c77a-4d6e-8929-7c0754df3f98"
recovery_source_sha256: "e544b44327ff35170b622edaba0f552292d2e3be77ed6a41ab26e0d927c33fe4"
recovered_at: "2026-10-05T14:33:59.986Z"
projection_status: "SYNCED"
outcome: "MATERIALIZED/s01, PENDING_REVIEW, no current blockers and no granted write paths. The report owns full signed history."
```

## Traceability

```yaml
upstream:
  - "Parent disposition sidecar: Next bounded M7 intake: Light router Vietnamese guidance."
next_step: "s02"
```

## Handoff

The user explicitly accepted the complete authoring packet. The decision record and concrete signing handoff are in s06. The CLI-owned report remains MATERIALIZED/s01 and PENDING_REVIEW until the human-terminal flow records its trusted work-item approval. Source grants remain empty; no admission signature or content metadata substitutes for trusted receipts and activation.
