---
artifact_id: "correct-workflow-authority-guidance.s01.restate"
artifact_family: workflow-step
work_item_slug: "correct-workflow-authority-guidance"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: BUG
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
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - developer
  - qc
  - ba
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
  spec: [ba]
  contract: []
  dor: [qc]
  approach: [developer]
  foundation: []
  task_plan: [developer]
  uat: []
  release: []
  business_acceptance: []
  dod: [qc]
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
> Review proposal only. Protocol remains MATERIALIZED at s01; work-item and authoring gate approvals are pending. No implementation grant is open.

Review packet: [Acceptance + DoR](correct-workflow-authority-guidance.s04.acceptance-criteria.md), [Technical Approach](correct-workflow-authority-guidance.s05.technical-approach.md), [Task Plan](correct-workflow-authority-guidance.s06.task-breakdown.md).

## Step Contract

```yaml
step_goal: "Capture one bounded authority-guidance repair and preserve the admission-versus-approval boundary."
input_summary:
  - "User selected priority 1 and continued; three maintainer admission dispositions signed on 2026-09-29."
  - "Master P-SEM / CF-010 with P-LANGUAGE / CF-012 coordination; main baseline a36b1852ca13dd5209fad319400e769c5b22cabf."
output_summary:
  - "This proposal packet; canonical acceptance in s04 and prospective path ownership in s06."
done_when:
  - "Scope, source defects, ownership, gate applicability and unresolved approvals are explicit."
owner: "developer"
```

## Governance Context

```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Router before action; authoring is permitted at MATERIALIZED/s01."
  - "Legacy writer remains authoritative until installed minor agreement AND canonical/runtime parity are proven."
  - "No inferred gate approval, manual protocol/report edits or inherited parent grants."
required_reviews:
  - "Maintainer: work-item admission/approval."
  - "BA: authority/EN-VI meaning and Spec; QC: DoR and bounded language verification/DoD."
  - "Developer: Approach/Task Plan; s07 spec compliance precedes code quality."
prohibited_actions:
  - "All other M7 units, missing VI files and CLI bump wording."
  - "Runtime gate implementation, approval model, schemas, public contracts, policy source and lifecycle semantics."
  - "Master protected finding register and frozen s04/s05/s06; parent review/DoD decisions."
  - "P-HOOKS, P-MCP, P-INSTALL and CURRENT release/publication corrections."
  - "Global installs, registry publication, tagging, merging and branch/worktree cleanup."
open_governance_questions: []
```

## Main Artifact

```yaml
raw_request: "User selected priority 1 for M7 authority/action guidance defects, accepted admission, then confirmed running the human helper."
restated_request: "Correct four existing instruction boundaries in eight EN/VI files, preserve runtime authority, and prove the bounded repair with regression and human language review."
request_type: "BUG"
business_context: "Incorrect prose can direct agents or maintainers to the wrong action even while higher policy/runtime still blocks it. The parent audit observed wording defects, not an executed bypass."
scope_in:
  - "Eight existing guidance files identified in s06."
  - "One focused regression file; child implementation and verification evidence after gates."
scope_out:
  - "All other M7 units, missing VI files and CLI bump wording."
  - "Runtime gate implementation, approval model, schemas, public contracts, policy source and lifecycle semantics."
  - "Master protected finding register and frozen s04/s05/s06; parent review/DoD decisions."
  - "P-HOOKS, P-MCP, P-INSTALL and CURRENT release/publication corrections."
  - "Global installs, registry publication, tagging, merging and branch/worktree cleanup."
open_questions:
  - "Human review of the proposed work item, Spec/DoR, Approach and Task Plan is pending."
assumptions:
  - "No runtime behavior change is needed; re-route if implementation evidence disproves this."
  - "Default governance and full planning apply; this is not SDD Light authoring."
dependencies:
  - "Parent baseline/observations at audit commit 8e817a88f5a00c97af027aab5304f1085c4c65da."
  - "Applicable human approvals and CLI-granted source paths before s07."
risks_initial:
  - "A passing prose regression cannot certify language meaning or runtime enforcement."
  - "Broader M7 failures and pending parent CF-MB2 reviews remain open."
acceptance_criteria_draft:
  - id: "AC-AUTH-001"
    description: "See canonical proposed criterion in s04; M7-H01, M2-OBS-05"
    measurable: true
  - id: "AC-AUTH-002"
    description: "See canonical proposed criterion in s04; M7-L15, M7-L14"
    measurable: true
  - id: "AC-AUTH-003"
    description: "See canonical proposed criterion in s04; M7-H05, M2-OBS-15"
    measurable: true
  - id: "AC-AUTH-004"
    description: "See canonical proposed criterion in s04; M7-L10, M2-OBS-10"
    measurable: true
  - id: "AC-AUTH-005"
    description: "See canonical proposed criterion in s04; AC-CF-007"
    measurable: true
  - id: "AC-AUTH-006"
    description: "See canonical proposed criterion in s04; AC-CF-006"
    measurable: true
notes_for_next_step: "s02-s06 are forward proposals for a single human review packet. Protocol remains s01; none is a passed gate."
```

## Routing and Applicability

```yaml
request_lane: "maintenance"
work_item_type: "BUG"
delivery_context: "brownfield"
planning_track: "full"
governance_profile: "default"
execution_mode: "agentic"
sdd_mode: "none"
risk: "medium"
hard_triggers:
  public_contract: false
  migration: false
  security_sensitive: false
  regulated: false
  greenfield_foundation: false
  release: false
  ambiguous_mixed_intent: false
trigger_rationale: "Only guidance about existing authority and a test of that guidance; no change to the security control, public contract or release."
writer: "legacy"
adaptive_activation: "NOT_ATTESTED: 2.6.3 installed/source agreement was observed; canonical/runtime byte parity has not been established. Do not emit adaptive_v1 or remove legacy gates."
role_reasons:
  - role: "developer"
    reason: "AUTH-GUIDANCE-REPAIR: owns source correction and regression."
  - role: "qc"
    reason: "AUTH-EVIDENCE-VERIFY: checks negatives, traceability and DoD."
  - role: "ba"
    reason: "M7-ENVI-AUTHORITY: parent AC-CF-007 requires human authority/action and language assessment."
gate_reasons:
  - gate: "work_item"
    reviewer_roles:
      - "maintainer"
    reason: "PROTOCOL-HUMAN-APPROVAL"
  - gate: "spec"
    reviewer_roles:
      - "ba"
    reason: "AUTH-AC-BOUNDARY"
  - gate: "dor"
    reviewer_roles:
      - "qc"
    reason: "AUTH-READY-EVIDENCE"
  - gate: "approach"
    reviewer_roles:
      - "developer"
    reason: "AUTH-TECHNICAL-BOUNDARY"
  - gate: "task_plan"
    reviewer_roles:
      - "developer"
    reason: "AUTH-EXECUTABLE-PLAN"
  - gate: "dod"
    reviewer_roles:
      - "qc"
    reason: "AUTH-DELIVERY-COMPLETION"
not_applicable:
  - "Contract: no API/UX contract delta."
  - "Foundation: existing architecture unchanged."
  - "UAT, Release, Business Acceptance: no rollout or business acceptance scope."
reason_code_scope: "Local trace labels for this legacy intake; not new runtime enums or adaptive writer evidence."
```

## Admission Evidence

```yaml
status: "ADMISSION_RESOLVED_ONLY"
actor: "maintainer"
authorization_mode: "tty"
decisions:
  - operation_id: "46f57400-61d9-421e-8ebf-cd09e8db1515"
    resolved_at: "2026-09-29T09:48:01.578Z"
    meaning: "Reviewed three near matches; no current owner collision."
  - operation_id: "caf2a087-652e-4400-91fb-0b96e5bf7511"
    resolved_at: "2026-09-29T09:48:04.385Z"
    meaning: "Confirmed one bounded guidance outcome."
  - operation_id: "e4ef8a05-f9bf-4a8c-8f4e-8eca286c37e4"
    resolved_at: "2026-09-29T09:48:07.121Z"
    meaning: "Reviewed existing work/change scopes and portfolio ownership."
verification: "All three recorded signatures verified with production verifyRecordedDisposition and the real trusted approval root."
recovery:
  operation_id: "dfda57c9-b0b5-4573-a088-0fb363a85aee"
  expected_report_sha256: "601c92ffd9774f8140a510a97dfbfe4371ea71160e53cb98069e6b29f93fc29a"
  completed_at: "2026-09-29T09:49:35.962Z"
  result: "APPLIED; MATERIALIZED; READY; projection SYNCED; dedup no_conflict; PENDING_REVIEW; no write grants."
limits:
  - "These signatures resolve admission concerns only. They approve no work item or authoring gate."
  - "Original proposal history stays intact; do not manually clear historical nested blockers."
```

## Work Item Protocol
```yaml
protocol_status: MATERIALIZED
approval_status: PENDING_REVIEW
review_required: true
work_item_slug: "correct-workflow-authority-guidance"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/correct-workflow-authority-guidance/work-items/correct-workflow-authority-guidance"
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
protocol_owner: ""
reviewed_by: ""
reviewed_at: ""
handoff_target: "human-review"
last_transition_action: "materialize"
last_transition_at: "2026-09-29T09:49:35.962Z"
required_actions:
  - {"id":"se:1fa05583f1678e6ecbea1e2deadfc258d0e7398ae4f0468811268908469a767f","kind":"workflow_followup","text":"wfc work-item approve --work-item correct-workflow-authority-guidance --reviewed-by <role>"}
  - {"id":"se:df012924776ee8b04d15e7fb13a158589efd534fe4c65563d177bbd27961ea6a","kind":"gate_approval","text":"wfc gate approve --work-item correct-workflow-authority-guidance --gate spec --reviewed-by <role>","gate":"spec"}
  - {"id":"se:95993f9f81208e6b4acfecdbd4e934ef49e8972ab44fe072bbd5e49712599c3d","kind":"gate_approval","text":"wfc gate approve --work-item correct-workflow-authority-guidance --gate dor --reviewed-by <role>","gate":"dor"}
  - {"id":"se:18f58e29d6c825d395cb1c252924a35bdc68c55927e990ca42c59f9af7191429","kind":"gate_approval","text":"wfc gate approve --work-item correct-workflow-authority-guidance --gate approach --reviewed-by <role>","gate":"approach"}
  - {"id":"se:dfcfb2f961bb581294a5b1d656f8ee14785ccebbd2b5a378bca0ff9c0e5d8025","kind":"gate_approval","text":"wfc gate approve --work-item correct-workflow-authority-guidance --gate task_plan --reviewed-by <role>","gate":"task_plan"}
  - {"id":"se:4056ed4e63efb4280058bbbfaf70427d7750e2604f2da9e68e5bfd2e2b782c6a","kind":"work_item_activation","text":"wfc work-item activate --work-item correct-workflow-authority-guidance --step s07 --write-root <path>"}
blockers: []
review_notes: []
refs:
  - "work-items/sample-workflow-item"
  - "work-items/adaptive-governance-human-approval-ux"
  - "work-items/closeout-bundle-legacy-dod-compatibility"
  - "work-items/correct-workflow-authority-guidance"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
```

## Traceability

```yaml
source_inputs:
  - "Parent audit branch 8e817a88f5a00c97af027aab5304f1085c4c65da: docs/audits/code-factory-holistic-finding-disposition.md#selected-authority-guidance-correction--2026-09-29"
  - "Parent: docs/audits/code-factory-holistic-language-review.md (M7-H01/H05/L10/L14/L15)."
  - "correct-workflow-authority-guidance.work-item-report.json"
next_step: "correct-workflow-authority-guidance.s02.business-goal.md"
```

## Handoff

Admission is resolved. The work item and all authoring gates remain pending. Review the linked s04–s06 proposals before any source activation. The existing five worktrees, two unique-commit branches and root untracked paths remain preserved.

## Authoring Verification

Checked at 2026-09-29T10:02:37Z with Node 22.23.2, from this child worktree. Naming, governance, execution and planning each PASS for eight notes. Repository protocol PASS for 21 managed work items, with 21 legacy references skipped by the configured policy. This resolves the earlier missing-s01 pre-materialization failure.

Strict UTF-8 and YAML checks PASS for all eight notes (51 YAML blocks); every note remains draft and every actual human gate reviewer/timestamp remains empty. s01–s06 contain proposals; s07/s08 are untouched future scaffolds, not implementation or verification evidence. The CLI-owned s01 protocol block is byte-identical to the recovered projection. The current report SHA-256 is `212524dee0eae2940fbd34affe0eadad279e60d877c8a75f693c42c39d592625`; authoring did not edit it.

Preservation checks PASS: no child source/policy/package/audit change; 913 non-owned master tracked hashes and all 19 root untracked hashes retained; main and the backup/evals unique-commit refs retained. No worktree was finalized or removed. Production unit/build/packaged-runtime tests were not run for this authoring-only delta; T2–T8 schedule the applicable source verification. Validator success does not approve a gate or pass M7.
