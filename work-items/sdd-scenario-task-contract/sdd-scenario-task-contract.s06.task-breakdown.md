---
artifact_id: "sdd-scenario-task-contract.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "sdd-scenario-task-contract"
step_id: "s06"
step_slug: "task-breakdown"
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
  approach_reviewed_by: []
  approach_reviewed_at: ""
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-10-30T13:47:34Z"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-scenario-task-contract.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.

## Step Contract

```yaml
step_goal: "Record the accepted s06 authoring outcome for A1-A2 receipt sealing."
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

## Main Artifact

```yaml
implementation_goal: "Deliver the reviewed A1-A2 contract as a minimal opt-in extension."
scope_guards_ref: "product-specs/brd/sdd-scenario-task-contract.md#Business Context.scope"
task_breakdown:
  - id: "T1"
    owner_role: "developer"
    name: "Refine optional scenario guidance and explicit decision handling in existing owners."
    objective: "Refine optional scenario guidance and explicit decision handling in existing owners."
    paths_in_scope:
      - "skills/analysis/requirement-analysis/SKILL.md"
      - "skills/analysis/requirement-analysis/SKILL.vi.md"
      - "skills/analysis/brainstorming/SKILL.md"
      - "skills/analysis/brainstorming/SKILL.vi.md"
      - "skills/guardrails/definition-of-ready-gate/SKILL.md"
      - "skills/guardrails/definition-of-ready-gate/SKILL.vi.md"
      - "product-specs/templates/spec-card.template.md"
      - "product-specs/templates/srs.template.md"
    dependencies: []
    outputs_expected:
      - "Scoped source/tests and inspectable evidence for AC-001"
    review_checkpoint: "Spec compliance first, then code quality, before the next batch."
    verification_hint: "Review AC-001 examples for normal/failure/inapplicable/ambiguous cases; run node packages/workflow-bundle/scripts/audit-workflow-pack.js --repo-root .; UTF-8 and EN/VI semantic review."
  - id: "T2"
    owner_role: "developer"
    name: "Add opt-in version reader, deterministic JSON parsing, duplicate-key/owner rejection and graph validation."
    objective: "Add opt-in version reader, deterministic JSON parsing, duplicate-key/owner rejection and graph validation."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-workflow-planning.js"
      - "packages/workflow-bundle/test/validate-workflow-planning.test.js"
      - "packages/workflow-bundle/test/run-all.js"
    dependencies:
      - "T1"
    outputs_expected:
      - "Scoped source/tests and inspectable evidence for AC-002, AC-003, AC-007"
    review_checkpoint: "Spec compliance first, then code quality, before the next batch."
    verification_hint: "Create the focused test file; run node packages/workflow-bundle/test/validate-workflow-planning.test.js RED for unknown versions/malformed data/duplicate IDs/cycles, then GREEN; register it in run-all."
  - id: "T3"
    owner_role: "developer"
    name: "Enforce bounded file paths, focused argv/cwd and test-reference subset rules without executing commands."
    objective: "Enforce bounded file paths, focused argv/cwd and test-reference subset rules without executing commands."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-workflow-planning.js"
      - "packages/workflow-bundle/test/validate-workflow-planning.test.js"
    dependencies:
      - "T2"
    outputs_expected:
      - "Scoped source/tests and inspectable evidence for AC-004, AC-005"
    review_checkpoint: "Spec compliance first, then code quality, before the next batch."
    verification_hint: "Run the T2 focused file with traversal/drive/UNC/glob/symlink/planned-leaf and inert-command sentinel fixtures RED then GREEN; sentinel must never be created."
  - id: "T4"
    owner_role: "developer"
    name: "Resolve exact AC mappings and adapt existing readers only where the opt-in owner format requires it."
    objective: "Resolve exact AC mappings and adapt existing readers only where the opt-in owner format requires it."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-workflow-planning.js"
      - "packages/workflow-bundle/scripts/validate-workflow-sdd.js"
      - "packages/workflow-bundle/scripts/validate-workflow-governance.js"
      - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
      - "packages/workflow-bundle/test/validate-workflow-planning.test.js"
      - "packages/workflow-bundle/test/validate-workflow-sdd.test.js"
      - "packages/workflow-bundle/test/validate-workflow-governance.test.js"
      - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
    dependencies:
      - "T3"
    outputs_expected:
      - "Scoped source/tests and inspectable evidence for AC-006, AC-007, AC-008"
    review_checkpoint: "Spec compliance first, then code quality, before the next batch."
    verification_hint: "Run all four named Node test files. Before shared reader edits, promote evidence/reader-compatibility-repro.cjs into RED tests for JSON s06 semantic readiness and exact task lookup, then GREEN. Missing/duplicate/unknown AC and task references, malformed JSON, duplicate keys/owners and unknown versions must fail without fallback. Legacy YAML and Spec Card/SRS/governance fixtures must pass unchanged."
  - id: "T5"
    owner_role: "developer"
    name: "Document v1 opt-in examples and compatibility; preserve default scaffold behavior and avoid duplicate owner fields."
    objective: "Document v1 opt-in examples and compatibility; preserve default scaffold behavior and avoid duplicate owner fields."
    paths_in_scope:
      - "skills/delivery/task-breakdown-planner/SKILL.md"
      - "skills/delivery/task-breakdown-planner/SKILL.vi.md"
      - "skills/orchestration/codex-workflow-chain/references/spec-driven-development.md"
      - "skills/orchestration/codex-workflow-chain/references/spec-driven-development.vi.md"
      - "packages/workflow-bundle/scripts/workflow-step-definitions.js"
      - "packages/workflow-bundle/test/scaffold-workflow.test.js"
    dependencies:
      - "T4"
    outputs_expected:
      - "Scoped source/tests and inspectable evidence for AC-001, AC-002, AC-008"
    review_checkpoint: "Spec compliance first, then code quality, before the next batch."
    verification_hint: "Run node packages/workflow-bundle/test/scaffold-workflow.test.js and pack audit; inspect emitted legacy notes and documented v1 example against focused contract tests; compare EN/VI meaning."
  - id: "T6"
    owner_role: "developer"
    name: "Close targeted review and isolated verification, collecting compatibility and runtime parity evidence."
    objective: "Close targeted review and isolated verification, collecting compatibility and runtime parity evidence."
    paths_in_scope:
      - "packages/workflow-bundle/test/validate-workflow-planning.test.js"
    dependencies:
      - "T5"
    outputs_expected:
      - "Scoped source/tests and inspectable evidence for AC-009"
    review_checkpoint: "Spec compliance first, then code quality, before the next batch."
    verification_hint: "In a clean implementation worktree run node packages/workflow-bundle/test/run-all.js after isolated runtime generation, then pack audit and runtime parity; run owned note validators and UTF-8 checks. No publish/global update."
dependencies_global:
  - "Authoring gates and CR/work-item approval."
risk_notes:
  - "Proposed new focused test file does not exist until T2."
  - "Readers discovered outside this boundary require a plan revision."
notes_for_implementation: "This approved design uses the existing legacy authoring format; task_contract_version is deliberately absent until its reader is delivered. Begin implementation only after trusted receipts and activation succeed."
```

## Verification Plan

```yaml
levels:
  - "Focused unit negatives and legacy positives"
  - "Schema/reader integration"
  - "Semantic skill/ownership review"
  - "Isolated full suite and source/runtime parity"
skipped:
  - "Live deployment"
  - "Global installation"
  - "Paid agent comparison"
  - "Database/UI/security scanner not applicable to authoring-only changes"
strategy: "Command-level verification is owned by task_breakdown[].verification_hint; no duplicate task checks here."
```

## Governance Checks

```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Owner references and brownfield constraints recorded."
blocking_items:
  - "Amended Approach/Task Plan receipts pending; original Spec/Contract/DoR receipts remain valid."
owner: "qc"
next_action: "Seal accepted host artifacts in the human terminal; do not activate before receipt verification."
```

## Brownfield Delivery Plan

```yaml
base_sha: "4f4cf4d3234e0b71c220531c36f2b283bce80bdb"
workspace: "Use the existing .worktrees/sdd-scenario-task-contract implementation worktree from the pinned main. Canonical protocol and receipt hosts remain at the original project root; map signed production paths into that worktree. Workflow-note copies are transport only. Verify actual worktree HEAD/diff at closeout."
execution_mode: "agentic"
review: "Targeted review per batch."
rollback: "Disable new-version authoring and retain legacy path; do not silently downgrade v1 artifacts."
```

## Traceability

```yaml
requirement_refs:
  - "SRS-FR-001"
  - "SRS-FR-002"
  - "SRS-FR-003"
  - "SRS-FR-004"
  - "SRS-FR-005"
  - "SRS-FR-006"
  - "SRS-NFR-001"
  - "SRS-NFR-002"
  - "SRS-NFR-003"
task_refs:
  - task_id: "T1"
    acceptance_refs:
      - "AC-001"
  - task_id: "T2"
    acceptance_refs:
      - "AC-002"
      - "AC-003"
      - "AC-007"
  - task_id: "T3"
    acceptance_refs:
      - "AC-004"
      - "AC-005"
  - task_id: "T4"
    acceptance_refs:
      - "AC-006"
      - "AC-007"
      - "AC-008"
  - task_id: "T5"
    acceptance_refs:
      - "AC-001"
      - "AC-002"
      - "AC-008"
  - task_id: "T6"
    acceptance_refs:
      - "AC-009"
spec_ref: "product-specs/srs/sdd-scenario-task-contract.md"
```

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

## Accepted Amendment A1A2-AMEND-001

The maintainer explicitly approved the presented two-path T4 amendment with
`accept, duyệt`; recorded at `2026-10-30T13:47:34Z` under the developer reviewer role.
The design decision is owned by s05. T4 above owns the added paths and verification.
The six-task sequence and nine acceptance criteria are unchanged. T1 checkpoint is
`aa55d6b`; T2-T6 resume only after the amended host receipts match.

## Receipt Sealing Handoff

The human has approved the amendment in chat. Only the two changed hosts need
new trusted signatures. Run these commands in a human-controlled terminal and
enter the existing approval passphrase at the hidden prompts. Do not put the
passphrase in chat, an environment variable or an argument.

```sh
cd "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory" &&
node "$HOME/.workflow-bundle-artifacts/v2.8.0/package/bin/wfc.js" gate approve --work-item sdd-scenario-task-contract --gate approach --reviewed-by developer &&
node "$HOME/.workflow-bundle-artifacts/v2.8.0/package/bin/wfc.js" gate approve --work-item sdd-scenario-task-contract --gate task_plan --reviewed-by developer
```

Do not re-sign CR/work-item approval or the unchanged s04 host. After signing, the
agent verifies all five current-host receipts and resumes with the amended path
grant. No DoD, release, merge or global installation is authorized by these gates.
