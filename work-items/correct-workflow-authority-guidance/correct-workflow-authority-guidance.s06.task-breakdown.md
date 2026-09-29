---
artifact_id: "correct-workflow-authority-guidance.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "correct-workflow-authority-guidance"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "correct-workflow-authority-guidance.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Review proposal only. Protocol remains MATERIALIZED at s01; work-item and authoring gate approvals are pending. No implementation grant is open.

## Step Contract

```yaml
step_goal: "Make proposed option A executable by path, dependency, evidence and human checkpoints."
input_summary:
  - "correct-workflow-authority-guidance.s04.acceptance-criteria.md"
  - "correct-workflow-authority-guidance.s05.technical-approach.md"
output_summary:
  - "Ordered T1–T8, proposed write scope and exact verification commands."
done_when:
  - "Every task has an objective, owner, exact paths, dependency, review checkpoint and verify method."
owner: "developer"
```

## Main Artifact

```yaml
implementation_goal: "Satisfy AC-AUTH-001..006 for eight EN/VI sources with a focused regression; preserve current runtime authority."
ba_lane:
  acceptance_coverage:
    - "T3 -> AC-AUTH-001; T4 -> 002/003; T5 -> 004; T7/T8 -> 005; T2/T6 -> 006."
  scope_guards:
    - "All other M7 units, missing VI files and CLI bump wording."
    - "Runtime gate implementation, approval model, schemas, public contracts, policy source and lifecycle semantics."
    - "Master protected finding register and frozen s04/s05/s06; parent review/DoD decisions."
    - "P-HOOKS, P-MCP, P-INSTALL and CURRENT release/publication corrections."
    - "Global installs, registry publication, tagging, merging and branch/worktree cleanup."
  human_review_points:
    - "Work-item approval; independent Spec, DoR, Approach and Task Plan decisions before T1."
    - "BA bounded language review and QC verification/DoD after source evidence."
dev_lane:
  path_map:
    - path: "skills/analysis/requirement-analysis/SKILL.md"
      ownership: "proposed tracked source grant; not active"
    - path: "skills/analysis/requirement-analysis/SKILL.vi.md"
      ownership: "proposed tracked source grant; not active"
    - path: "skills/guardrails/definition-of-done-gate/SKILL.md"
      ownership: "proposed tracked source grant; not active"
    - path: "skills/guardrails/definition-of-done-gate/SKILL.vi.md"
      ownership: "proposed tracked source grant; not active"
    - path: "skills/orchestration/codex-workflow-chain/SKILL.md"
      ownership: "proposed tracked source grant; not active"
    - path: "skills/orchestration/codex-workflow-chain/SKILL.vi.md"
      ownership: "proposed tracked source grant; not active"
    - path: "skills/orchestration/codex-workflow-chain/references/work-item-protocol.md"
      ownership: "proposed tracked source grant; not active"
    - path: "skills/orchestration/codex-workflow-chain/references/work-item-protocol.vi.md"
      ownership: "proposed tracked source grant; not active"
    - path: "packages/workflow-bundle/test/workflow-authority-guidance.test.js"
      ownership: "proposed new tracked regression"
    - path: "work-items/correct-workflow-authority-guidance/"
      ownership: "authoring/evidence; report and protocol block remain CLI-owned"
  technical_sequence:
    - "T1 approvals/grant -> T2 RED -> T3 read-only -> T4 prerequisites/lifecycle -> T5 DoD/GREEN -> T6 ordered review/regression -> T7 BA -> T8 QC/DoD."
  tdd_targets:
    - "Static guidance regression uses RED -> minimal prose correction -> GREEN; runtime behavior is unchanged."
    - "The original source defects and targeted mutations must fail for their actual boundary, not a missing file or mere filename count."
task_breakdown:
  - id: "T1"
    owner_role: "developer"
    name: "Verify authority and open the exact implementation grant"
    objective: "Re-read signed work-item and Spec/DoR/Approach/Task Plan evidence against current hosts; require ACTIVE/s07 and exact authorized paths before touching source."
    paths_in_scope:
      - "work-items/correct-workflow-authority-guidance/"
    dependencies:
      - "Human authoring decisions and normal trusted receipt sealing"
    outputs_expected:
      - "s07 Delivery Rule Evidence identifies host/receipt checks, isolated branch, scope and no delegation."
    review_checkpoint: "QC checks entry evidence; no draft/parent approval substitution."
    verification_hint: "Use read-only work-item/gate/capability status; compare source digests with s04. If baseline drift affects acceptance/design, stop and refresh approvals rather than silently reuse them."
  - id: "T2"
    owner_role: "developer"
    name: "Reproduce four authority defects in both languages"
    objective: "Create the focused regression before correcting any guidance. Report each boundary separately so one failure cannot hide the other originals."
    paths_in_scope:
      - "packages/workflow-bundle/test/workflow-authority-guidance.test.js"
      - "work-items/correct-workflow-authority-guidance/correct-workflow-authority-guidance.s07.implementation.md"
    dependencies:
      - "T1"
    outputs_expected:
      - "Node/assert-only test for relevant source sections, original-defect RED log, positive controls and targeted negative mutation cases."
    review_checkpoint: "Spec compliance against AC-AUTH-001..004/006 before code-quality review of the test."
    verification_hint: "Run node packages/workflow-bundle/test/workflow-authority-guidance.test.js. Expect nonzero specifically for the original read-only exception, prerequisite disjunction/applicability, s01 activation and unqualified DoD conclusion; no missing-file/syntax false RED."
  - id: "T3"
    owner_role: "developer"
    name: "Correct requirement-analysis authority"
    objective: "Remove the permissive summary/analysis exception in EN/VI Out Of Scope; keep the rest of the skill contract."
    paths_in_scope:
      - "skills/analysis/requirement-analysis/SKILL.md"
      - "skills/analysis/requirement-analysis/SKILL.vi.md"
    dependencies:
      - "T2"
    outputs_expected:
      - "Paired correction satisfying AC-AUTH-001."
    review_checkpoint: "Compare both meanings and verify no source-write permission arises from clarity."
    verification_hint: "Focused test now passes the read-only boundary; reinstating an exception in memory must fail. Record remaining expected failures separately."
  - id: "T4"
    owner_role: "developer"
    name: "Correct applicable prerequisite and lifecycle guidance"
    objective: "Align backbone and protocol EN/VI with all applicable full/Light gates, materialize at s01 and activate at s07; reconcile operative list and bounded legacy read/approve statements."
    paths_in_scope:
      - "skills/orchestration/codex-workflow-chain/SKILL.md"
      - "skills/orchestration/codex-workflow-chain/SKILL.vi.md"
      - "skills/orchestration/codex-workflow-chain/references/work-item-protocol.md"
      - "skills/orchestration/codex-workflow-chain/references/work-item-protocol.vi.md"
    dependencies:
      - "T3"
    outputs_expected:
      - "Paired corrections satisfying AC-AUTH-002/003, with existing runtime as read-only reference."
    review_checkpoint: "Human-readable spec compliance first: enumerate every relevant ACTIVE/prerequisite occurrence; then check clarity and duplication."
    verification_hint: "Full s04/s05/s06 and Light s04/s06 controls pass; each omitted applicable prerequisite, draft-as-pass, s01 activation, unrestricted legacy read and scaffold-as-approval mutation is rejected. Runtime gate source stays byte-identical."
  - id: "T5"
    owner_role: "developer"
    name: "Clarify advisory DoD and finish focused GREEN"
    objective: "Distinguish AI assessment from human QC DoD and protocol completion in both DoD skill files while preserving the output schema and evidence requirements."
    paths_in_scope:
      - "skills/guardrails/definition-of-done-gate/SKILL.md"
      - "skills/guardrails/definition-of-done-gate/SKILL.vi.md"
    dependencies:
      - "T4"
    outputs_expected:
      - "AC-AUTH-004 correction; all focused source checks GREEN and each negative mutation rejected."
    review_checkpoint: "Spec compliance checks authority across goal/evaluation/decision/completion; code quality checks minimal delta and unchanged schema."
    verification_hint: "Run the focused test and node --check on the new test. Compare schema keys/enums and all six checks to s04 baseline; inject self-approval wording in memory and require rejection."
  - id: "T6"
    owner_role: "developer"
    name: "Run targeted review and pack regression"
    objective: "Complete s07 review and reproduce the standard checks without editing another owner's source or installation."
    paths_in_scope:
      - "work-items/correct-workflow-authority-guidance/correct-workflow-authority-guidance.s07.implementation.md"
      - "packages/workflow-bundle/runtime/ (derived local verification only)"
      - "packages/workflow-bundle/workflow-bundle.manifest.json (derived local verification only)"
    dependencies:
      - "T5"
    outputs_expected:
      - "Ordered spec-compliance then code-quality review with findings resolved or explicitly blocking."
      - "Focused test, complete standard unit suite, pack audit, syntax, UTF-8 and diff evidence."
    review_checkpoint: "No handoff to s08 with an unresolved critical authority defect or unattributed check failure."
    verification_hint: "Run the exact commands below using Node 22.23.2. Generate only local runtime/ and the package manifest in this child. runtime/ is ignored; the tracked package manifest must remain byte-identical to the baseline. The legacy workflow-pack.manifest.json must be absent at preflight. Do not commit generated output or run install/publish; stop on unexpected deltas."
  - id: "T7"
    owner_role: "ba"
    name: "Review bounded EN/VI meaning and next action"
    objective: "Assess all eight repaired source scopes using the parent five-dimension rubric; keep the human decision separate from the agent's proposed scores."
    paths_in_scope:
      - "work-items/correct-workflow-authority-guidance/correct-workflow-authority-guidance.s08.verification.md"
    dependencies:
      - "T6"
    outputs_expected:
      - "Per-file source hash, exact read ranges/excerpts, five scores, critical flag, BA reviewer/time and explicit decision."
    review_checkpoint: "Zero critical; mean >=4/5; every unit dimension >=3/5. Failing units return to their source task."
    verification_hint: "Read the changed sections plus related prerequisite/decision statements in both languages; verify materialize/activate, advisory/approval and full/Light distinctions. Do not score unread portions or claim whole-M7 PASS."
  - id: "T8"
    owner_role: "qc"
    name: "Verify acceptance, decide DoD and hand off bounded evidence"
    objective: "Aggregate AC-AUTH-001..006 coverage, regression/compatibility and BA decision into s08 for human QC verification and DoD."
    paths_in_scope:
      - "work-items/correct-workflow-authority-guidance/correct-workflow-authority-guidance.s08.verification.md"
      - "work-items/correct-workflow-authority-guidance/correct-workflow-authority-guidance.work-item-report.json (CLI transitions only)"
    dependencies:
      - "T7"
    outputs_expected:
      - "s08 evidence and explicit human DoD decision when justified; normal trusted receipts/transitions only."
      - "Bounded evidence reference for P-SEM/P-LANGUAGE; parent decides its own integration and findings."
    review_checkpoint: "No DONE, merge or cleanup before s08 human DoD; unresolved findings remain blocking."
    verification_hint: "Run applicable validators, verify final source/report identities and receipt freshness; compare changes against exact tracked allowlist. No master AC/CF-MB2, release or cleanup decision is inherited."
dependencies_global:
  - "All authoring approvals and exact s07 grants; these draft notes do not provide them."
  - "Human BA and QC review of bounded source evidence."
  - "Existing Node 22.23.2 toolchain; no new dependency, harness install or network fetch for the repair."
risk_notes:
  - "Static prose assertions do not prove arbitrary natural-language meaning; explicit BA/QC assessment remains required."
  - "If the baseline, scope, assertions or AC need a material change, re-review the affected host before using prior approval."
  - "Parent M7 remains FAIL until all required repairs/reviews and its own completion criteria are satisfied."
verification_plan:
  - "Use the commands and negative matrix below; capture exit codes and exact source hashes in s07/s08."
  - "No unit suite is claimed run at authoring time; syntax/pack/runtime checks are scheduled for T6."
notes_for_implementation: "A plan draft is not the same as Task Plan pass. T1 is blocked until work-item and authoring gates are explicitly approved, hosts finalized before sealing, and current trusted receipts verified. Do not implement merely because this plan is detailed."
```

## Verification Plan

Run from the isolated child worktree using Node 22.23.2. Run the focused regression after T2 and each correction batch; the initial RED is expected and must identify the original defects. Run the full suite once the batch is ready for T6.

```sh
node packages/workflow-bundle/test/workflow-authority-guidance.test.js
node --check packages/workflow-bundle/test/workflow-authority-guidance.test.js
node packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js
node packages/workflow-bundle/test/run-all.js
node packages/workflow-bundle/scripts/audit-workflow-pack.js --repo-root .
node packages/workflow-bundle/bin/wfc.js naming --workflow-root work-items/correct-workflow-authority-guidance
node packages/workflow-bundle/bin/wfc.js governance --workflow-root work-items/correct-workflow-authority-guidance
node packages/workflow-bundle/bin/wfc.js exec --workflow-root work-items/correct-workflow-authority-guidance
node packages/workflow-bundle/bin/wfc.js plan --workflow-root work-items/correct-workflow-authority-guidance
node packages/workflow-bundle/bin/wfc.js protocol --workflow-root work-items --project-root .
git diff --check
```

Use strict UTF-8 decoding for every changed text file, reject replacement characters, and inspect VI accents. Review the new Node test's file/path handling; it must read only the declared sources, mutate strings in memory, use Node built-ins and require no network or shell execution. Existing unit/pack checks cover the applicable build/static validation; there is no deployment, migration or separate application type-check in this scope. A failed or skipped check is recorded with its reason and owner, never converted silently to PASS.

The focused test must cover these cases in both languages:

| Boundary | Positive control | Negative mutation |
| --- | --- | --- |
| Read-only | Analysis request retains no source-write authority | Reinstate the summary/analysis exception or make clarity grant writes |
| Prerequisites | All applicable full/Light hosts and independent approvals required | Change conjunction to optional/disjunctive, omit each applicable prerequisite, treat draft as pass, or add a required Light s05 host |
| Lifecycle/legacy | s01 authoring, s07 activation; operative list; bounded read/approve behavior | Swap activation to s01, label list future-only, remove allow_readonly condition or treat scaffold as approval |
| DoD | AI recommendation plus explicit human QC authority and applicable receipts | Allow AI/local tests to close delivery; remove human requirement; alter schema/evidence checks |

Tests validate the bounded prose contract and known counterexamples. They are not a new general natural-language validator or evidence of an observed runtime bypass.

## Governance Checks

```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Eight source files plus one new test are proposed; no broad skills/ or scripts/ grant."
  - "Report/protocol mutations use CLI only. Human gate reviews/timestamps remain blank while drafts."
  - "Agentic work; targeted s07 review in order; no subagent or invented independent review."
blocking_items:
  - "Work-item, Spec, DoR, Approach and Task Plan approval pending."
owner: "developer"
next_action: "Present concrete packet for independent human decisions; then finalize approved hosts before signing current hashes."
```

## Brownfield Delivery Plan

```yaml
regression_checkpoints:
  - "T2 original defects RED."
  - "T3–T5 targeted positive/negative cases; T6 full suite/pack audit."
  - "T7 bounded human EN/VI review; T8 AC coverage."
compatibility_checkpoints:
  - "Existing output schema, CLI and runtime source unchanged."
  - "Full/Light receipt semantics preserved; root and other worktrees unaffected."
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "Revert only owned correction commit if needed and preserve evidence."
  - "Regenerate declared local derived runtime from the selected source. No global install, report restore or branch reset."
```

## Traceability

```yaml
upstream:
  - "correct-workflow-authority-guidance.s04.acceptance-criteria.md"
  - "correct-workflow-authority-guidance.s05.technical-approach.md"
next_step: "correct-workflow-authority-guidance.s07.implementation.md"
```

## Handoff

All T1–T8 are NOT_STARTED. This proposal does not open s07. After explicit human decisions, finalize the approved s04/s05/s06 hosts, seal independent trusted receipts using the human-controlled CLI flow, approve the work item and verify exact activation grants. Keep this worktree open until its own s08 decision permits finalization.
