---
artifact_id: "sdd-scenario-task-contract.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "sdd-scenario-task-contract"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: "CR-011"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "product-specs/brd/sdd-scenario-task-contract.md"
  srs: "product-specs/srs/sdd-scenario-task-contract.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
  - "qc"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
  dod: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
    - "qc"
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
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-10-30T13:47:34Z"
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-scenario-task-contract.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Tóm tắt option được khuyến nghị, trade-off và boundary kỹ thuật cần giữ.

## Step Contract

```yaml
step_goal: "Record the accepted s05 authoring outcome for A1-A2 receipt sealing."
input_summary:
  - "docs/audits/code-factory-sdd-kit-adoption-plan.md"
  - "product-specs/brd/sdd-scenario-task-contract.md"
  - "product-specs/srs/sdd-scenario-task-contract.md"
output_summary:
  - "Human chat acceptance recorded; trusted receipts remain required before activation."
done_when:
  - "Scope, evidence and dependent decisions are explicit."
owner: "developer"
```

## Option Analysis

```yaml
goal: "Machine-check bounded tasks without changing old artifacts."
options:
  - "A: Prose-only; rejected because graph/reference negatives cannot be enforced."
  - "B: Mandatory migration of YAML plans; rejected because it rewrites signed history and broadens rollout."
  - "C: Opt-in v1 JSON payload in existing owners; smallest deterministic reader with legacy compatibility."
recommended_option: "C: Opt-in v1 JSON payload in existing owners, accepted by the human maintainer."
validation: "Negative and compatibility fixtures, then isolated pack parity."
```

## Foundation Decision

```yaml
status: "NOT_APPLICABLE"
reason: "No architecture, stack, runtime or deployment replacement."
```

## Main Artifact

```yaml
design_problem: "Existing planning validation checks track metadata but not executable task graphs."
business_rule_trace:
  - "BRD-001"
  - "BRD-002"
recommended_design_ref: "product-specs/srs/sdd-scenario-task-contract.md#Contract Proposal"
recommendation_reason: "Reuse existing owners and field semantics, gate new validation by an explicit version."
component_changes:
  - "Extend planning reader and task/trace validation; keep source skill guidance aligned."
data_flow:
  - "s06 version -> single owner parser -> graph/path/check/reference validation -> diagnostics; no execution side effects."
interface_changes:
  - "product-specs/srs/sdd-scenario-task-contract.md#Contract Proposal"
failure_modes:
  - scenario: "Unknown version or malformed payload"
    guardrail: "Fail before fallback; stable diagnostic."
  - scenario: "Reader silently ignores new payload"
    guardrail: "Inventory every reader; new/legacy end-to-end negative fixtures."
  - scenario: "Misleading declared AC/test mapping"
    guardrail: "Structural checks plus explicit semantic review; no automatic correctness claim."
compatibility_impact:
  - "Legacy reader remains default; versioned artifacts require a reader supporting v1."
rollback_impact:
  - "Keep the old verified bundle and legacy authoring path; v1 artifacts must not be silently consumed by old readers. Do not discard signed history."
observability_hooks:
  - "Validator diagnostics identify note/task/field; fixture summary reports old/new contract outcomes."
validation_plan:
  - "TDD per behavior-changing batch; current child has no implementation results."
```

## Architecture Details

No architecture-modeling, database, frontend or DevOps design is required. Contract schema is owned by the approved SRS; affected paths are owned only by s06 tasks.

## Brownfield Impact Analysis

```yaml
baseline_ref: "docs/audits/code-factory-sdd-kit-adoption-plan.md"
affected_boundary:
  explicitly_untouched:
    - "Trusted approvals"
    - "Materializer and protocol lifecycle"
    - "Installed harnesses"
    - "Existing signed work items"
    - "Delegation runtime"
readers_to_inventory:
  - "validate-workflow-planning.js"
  - "validate-workflow-governance.js"
  - "validate-workflow-sdd.js"
  - "workflow-gate-evidence-utils.js"
  - "workflow-step-definitions.js"
  - "workflow execution readers"
compatibility_note: "If any consumer needs a change outside approved paths, return to the Approach/Task Plan gate rather than widening the patch."
```

## Traceability

```yaml
upstream:
  - "docs/audits/code-factory-sdd-kit-adoption-plan.md"
  - "product-specs/brd/sdd-scenario-task-contract.md"
  - "product-specs/srs/sdd-scenario-task-contract.md"
next_step: "Seal amended Approach and Task Plan receipts, then resume T2-T6."
```

## Accepted Amendment A1A2-AMEND-001

The maintainer explicitly approved the presented amendment with `accept, duyệt`.
Recorded at: `2026-10-30T13:47:34Z`. The maintainer acts as the authorized developer reviewer.
This records the chat decision; it does not mint a trusted receipt.

The retained diagnostic in s07 shows that the shared semantic evidence and artifact
reference reader rejects the accepted JSON v1 owner. Keeping the original path
boundary cannot satisfy the contract; duplicating authoritative JSON into YAML
would violate its single-owner rule. Extend the existing reader under explicit v1
opt-in, using the additional owned paths listed only in s06 task T4.

Bounded behavior: finalized s06 semantic task checks and exact task artifact-reference
resolution accept the single JSON owner. Reuse deterministic duplicate-key rejection
from the planning reader where feasible without circular imports. Unknown versions,
malformed JSON and duplicate owners/keys fail without YAML fallback. Unversioned
YAML retains its existing behavior. Signatures, reviewer authority, receipt hashing
and protocol transitions remain outside this implementation boundary.

Verification: convert the retained diagnostic into failing consumer tests before
production changes; check accepted JSON lookup/readiness, malformed/duplicate
rejection and legacy parity. The nine acceptance criteria remain unchanged.
The original s04 host and its Spec/Contract/DoR receipts remain unchanged. The
changed s05/s06 hosts require new Approach/Task Plan receipts before A2 resumes.

## Handoff

Human chat acceptance is recorded below. This note creates no trusted receipt; implementation remains locked until CLI approval checks pass.


## Human Review Record

- Decision source: repository maintainer's explicit `accept` after the A1-A2 scope,
  nine acceptance criteria and six-task packet were presented.
- Recorded at: `2026-10-30T07:15:09Z`.
- Scope: A1 scenario guidance then A2 opt-in task/trace validation, explicit file
  paths and structured checks; legacy compatibility retained; no validator execution.
- Reviewer labels `ba` and `developer` identify the applicable roles fulfilled by
  the same human maintainer in this self-review item, not separate independent reviewers.
- Trust status: chat decision recorded; CLI receipts have not been minted and
  protocol approval/activation have not been changed by this authoring edit.
