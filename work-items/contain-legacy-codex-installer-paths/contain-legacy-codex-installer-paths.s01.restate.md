---
artifact_id: "contain-legacy-codex-installer-paths.s01.restate"
artifact_family: workflow-step
work_item_slug: "contain-legacy-codex-installer-paths"
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
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
  card: "product-specs/cards/contain-legacy-codex-installer-paths.md"
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "ta"
  - "developer"
  - "qc"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
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
  release: []
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

# Step 1 — Clarify

> [!summary]
> Admission signatures verified; normal recovery completed. This proposal is ready for discovery review, with Windows/isolation inputs still open.

## Step Contract

```yaml
step: "s01"
step_goal: "Restate the bounded correction and keep admission separate from implementation authority."
input_summary:
  - "Accepted parent containment scope and three verified Maintainer admission dispositions."
  - "Existing scripts at main 5a81126; spec card and named environment gaps."
output_summary:
  - "Concrete draft artifact with owner, evidence and remaining gates."
done_when:
  - "The draft is reviewable and its missing inputs are explicit; this does not mean the human gate passed."
owner: "ba"
constraints:
  - "No production/test implementation, installer execution or signing by the agent."
timebox: "One authoring pass; unresolved external verification input remains explicit."
```

## Governance Context

```yaml
governance_ref: "project-context/project-context.md"
request_lane: "product_delivery"
routing_reasons:
  - "LANE_PRODUCT_DELIVERY"
  - "HARD_SECURITY_SENSITIVE"
triggers:
  security_sensitive: true
  public_contract: false
  migration: false
  regulated: false
  greenfield_foundation: false
  release: false
  mixed_intent: false
profile: "full / strict governance / agentic; CLI sdd_mode=none retained"
required_reviews:
  - "PO outcome, BA spec/readiness, TA security envelope, Developer approach/plan, QC verification."
prohibited_actions:
  - "Infer execution from admission signatures; enable adaptive writes without activation parity; run a live installer."
```

## Requirement Analysis Spec

```yaml
raw_request: "Continue after the human ran the P-INSTALL admission helper."
restated_request: "Contain direct-installer mutation within validated destinations and preserve unrelated data."
request_type: "BUG"
business_context: "Malformed pre-existing state can redirect stale cleanup outside skillsHome."
scope_in:
  - "product-specs/cards/contain-legacy-codex-installer-paths.md#Scope"
scope_out:
  - "product-specs/cards/contain-legacy-codex-installer-paths.md#Scope"
open_questions:
  - "OQ-PI-ENV"
  - "OQ-PI-ISOLATION"
assumptions:
  - "Single writer during invocation; unsafe legacy/custom input fails explicitly."
dependencies:
  - "Independent child authoring approval and isolated two-platform verification."
risks_initial:
  - "Destructive cleanup, aliases/hard links, Windows differences, early writes before validation."
acceptance_criteria_draft:
  - id: "AC-PI-001"
    description: "product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria.acceptance_criteria[AC-PI-001]"
    measurable: true
  - id: "AC-PI-002"
    description: "product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria.acceptance_criteria[AC-PI-002]"
    measurable: true
  - id: "AC-PI-003"
    description: "product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria.acceptance_criteria[AC-PI-003]"
    measurable: true
  - id: "AC-PI-004"
    description: "product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria.acceptance_criteria[AC-PI-004]"
    measurable: true
  - id: "AC-PI-005"
    description: "product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria.acceptance_criteria[AC-PI-005]"
    measurable: true
  - id: "AC-PI-006"
    description: "product-specs/cards/contain-legacy-codex-installer-paths.md#Acceptance Criteria.acceptance_criteria[AC-PI-006]"
    measurable: true
notes_for_next_step: "Use the card as the only requirement/AC text owner."
```

## Admission Evidence

```yaml
proposal_commit: "5a86e91d4187cf5a1d77ab7629b20686d42e05ee"
accepted_parent_proposal: "9c81d535daaca2f0281412b72d6e5b5fd914d02a"
verified_at: "2026-10-13T07:30:54.175Z"
verification: "Production verifyRecordedDisposition checked all three exact reasons and operation IDs against the trusted public key."
signed_operations:
  - "7772a610-5aeb-4c87-9bd9-739b8f3aeb8b"
  - "c229d905-b274-42f7-b39c-cd835cba19cc"
  - "1b317897-5993-4c91-aa25-6f2a0ba5bf48"
recovery_operation: "c490c032-89ee-48c7-959b-c9f59ebd4bad"
recovery_source_sha256: "77bd35cd05ad20c8009a28494cee54e31a81059c7fd861a372c33a5096e29dcc"
recovery_completed_at: "2026-10-13T07:31:15.669Z"
authority_limit: "Admission only; no work-item/authoring/DoD receipt exists from this recovery."
```

## Work Item Protocol
```yaml
protocol_status: MATERIALIZED
approval_status: PENDING_REVIEW
review_required: true
work_item_slug: "contain-legacy-codex-installer-paths"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/legacy-codex-installer-containment/work-items/contain-legacy-codex-installer-paths"
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
last_transition_at: "2026-10-13T07:31:15.669Z"
required_actions:
  - {"id":"se:dc3eb37d0f5a693bebefaf8be74fd8fbbde93de63747a073ec0c2fe026f3df69","kind":"workflow_followup","text":"wfc work-item approve --work-item contain-legacy-codex-installer-paths --reviewed-by <role>"}
  - {"id":"se:8e59f8007ab8bd934bd0946479ac45bc7bf7c077ffdc7636b8b8bce8a183ef37","kind":"gate_approval","text":"wfc gate approve --work-item contain-legacy-codex-installer-paths --gate spec --reviewed-by <role>","gate":"spec"}
  - {"id":"se:a6893cd79f5d9236ee3ede11fc1064b748b18ac346345dfe45d0bbdf67829a3d","kind":"gate_approval","text":"wfc gate approve --work-item contain-legacy-codex-installer-paths --gate dor --reviewed-by <role>","gate":"dor"}
  - {"id":"se:1d411a7e1c912f183895809e6dda59216292f6a1e34a682d2bcd0d43fd3b1871","kind":"gate_approval","text":"wfc gate approve --work-item contain-legacy-codex-installer-paths --gate approach --reviewed-by <role>","gate":"approach"}
  - {"id":"se:8dff546ad1ad651bb46eed07e2a1c6da6d2bf7c9efa49cd57412191238aae5d0","kind":"gate_approval","text":"wfc gate approve --work-item contain-legacy-codex-installer-paths --gate task_plan --reviewed-by <role>","gate":"task_plan"}
  - {"id":"se:23929d9fe8e209583741d375a1314e0ba7b9e4ee8fc4a4b91f42b5f63168ebd9","kind":"work_item_activation","text":"wfc work-item activate --work-item contain-legacy-codex-installer-paths --step s07 --write-root <path>"}
blockers: []
review_notes: []
refs:
  - "work-items/decouple-tests-from-tree-layout"
  - "work-items/stabilize-architecture-skill-bundle"
  - "work-items/contain-legacy-codex-installer-paths"
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
spec_ref: "product-specs/cards/contain-legacy-codex-installer-paths.md"
next_step: "s02"
```

## Handoff

Draft authoring only. The work item remains MATERIALIZED/s01 with no implementation grants. Close the named readiness gaps and request the applicable human review; no gate is self-approved.
