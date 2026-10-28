---
artifact_id: "workflow-pack-security-baseline.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "workflow-pack-security-baseline"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: RESEARCH
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
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
  card: "product-specs/cards/workflow-pack-security-baseline.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["po", "ba", "ta", "developer", "qc"]
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
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: ["po"]
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-10-27T14:39:32.499Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["ba"]
  dor_reviewed_at: "2026-10-27T14:39:32.499Z"
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
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "workflow-pack-security-baseline.s01.restate.md"
  - "workflow-pack-security-baseline.s02.business-goal.md"
  - "workflow-pack-security-baseline.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 — Acceptance + DoR

Human content review is recorded below. Actual gate approval is established only by valid trusted receipts bound to these bytes; scanning also requires explicit s07 activation.

## Requirement Baseline

```yaml
status: APPROVED
approved_spec_refs: ["product-specs/cards/workflow-pack-security-baseline.md"]
approved_spec_digests: ["sha256:4c9eff79dfef6c29fc485b9b4593d8b884c6d76b23594234625b5a673c1d1695"]
decision_notes: ["Human approves the bounded evidence-only scope and nine acceptance criteria. Tool acquisition/isolation must pass T2 before any scan."]
```

## Contract Baseline

```yaml
status: "NOT_APPLICABLE"
notes: ["No API, UX or external data contract is changed."]
```

## Existing System Baseline

```yaml
source_commit: "7dce0335c7339ba6f3859e1bc34aaa1168f40971"
current_behavior_refs: ["CF-006 / P-SECURITY in parent audit", "CF-023 DONE and merged at this commit"]
impacted_surfaces: ["skills/", "scripts/hooks/", "adapters/", "mcp/", "packages/workflow-bundle/scripts/"]
inventory_counts: {"skills": 407, "scripts/hooks": 5, "adapters": 16, "mcp": 31, "packages/workflow-bundle/scripts": 39}
compatibility_constraints: ["Evidence-only child; source byte preservation required."]
rollback_constraints: ["Only owned ephemeral scan resources may be disposed."]
```

## Main Artifact

```yaml
acceptance_criteria_ref: "product-specs/cards/workflow-pack-security-baseline.md#Acceptance Criteria.acceptance_criteria"
acceptance_criteria:
  - id: AC-SEC-001
    criterion: "product-specs/cards/workflow-pack-security-baseline.md#Acceptance Criteria.acceptance_criteria[AC-SEC-001]"
    verification: "Reconcile tracked manifest count, hashes and 43 skill entries."
  - id: AC-SEC-002
    criterion: "product-specs/cards/workflow-pack-security-baseline.md#Acceptance Criteria.acceptance_criteria[AC-SEC-002]"
    verification: "Verify artifact provenance, exact versions, checksums and licenses before tool execution."
  - id: AC-SEC-003
    criterion: "product-specs/cards/workflow-pack-security-baseline.md#Acceptance Criteria.acceptance_criteria[AC-SEC-003]"
    verification: "Run non-destructive network/source-write denial controls in the isolated runtime."
  - id: AC-SEC-004
    criterion: "product-specs/cards/workflow-pack-security-baseline.md#Acceptance Criteria.acceptance_criteria[AC-SEC-004]"
    verification: "Exercise positive/negative cases for every enabled class and record errors/skips."
  - id: AC-SEC-005
    criterion: "product-specs/cards/workflow-pack-security-baseline.md#Acceptance Criteria.acceptance_criteria[AC-SEC-005]"
    verification: "Join coverage ledger against every manifest path and inspect manual review evidence."
  - id: AC-SEC-006
    criterion: "product-specs/cards/workflow-pack-security-baseline.md#Acceptance Criteria.acceptance_criteria[AC-SEC-006]"
    verification: "QC checks each finding and false-positive disposition against reachable local evidence."
  - id: AC-SEC-007
    criterion: "product-specs/cards/workflow-pack-security-baseline.md#Acceptance Criteria.acceptance_criteria[AC-SEC-007]"
    verification: "Search retained allowlisted output for synthetic secret markers and private paths."
  - id: AC-SEC-008
    criterion: "product-specs/cards/workflow-pack-security-baseline.md#Acceptance Criteria.acceptance_criteria[AC-SEC-008]"
    verification: "Compare before/after source and unrelated workspace hashes."
  - id: AC-SEC-009
    criterion: "product-specs/cards/workflow-pack-security-baseline.md#Acceptance Criteria.acceptance_criteria[AC-SEC-009]"
    verification: "Map all nine ACs to s08 evidence; obtain applicable human closeout receipts."
edge_cases: ["No findings with failed positive control", "Unsupported syntax and parser errors", "Symlinks outside target", "Raw report contains source/secret text", "Tool/rule digest mismatch"]
done_when: ["Each criterion has s08 evidence and authorized closeout receipts."]
```

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Scope bounded", "No release/foundation/migration trigger", "Human content review recorded; verify independent receipts before activation"]
blocking_items: []
owner: "ba"
next_action: "Verify independent receipts and scope grants before activation."
```

## Definition of Ready

```yaml
work_item_slug: "workflow-pack-security-baseline"
status: READY
checks:
  restated_request_clear: PASS
  business_goal_clear: PASS
  scope_defined: PASS
  open_questions_non_blocking: PASS
  acceptance_criteria_testable: PASS
  dependencies_known: PASS
  verification_direction_present: PASS
blocking_gaps: []
accepted_assumptions: ["Pinned acquisition and container isolation are mandatory execution preflight checks; failure stops the scan rather than permitting host execution."]
residual_risks: ["Unsupported syntax and manual-review limits must remain explicit.", "Tool/rule licenses and artifact digests must pass T2 before scanning."]
next_action: "Seal and verify four independent readiness receipts; activate only after the isolated write scope is checked."
```
