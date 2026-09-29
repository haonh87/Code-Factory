---
artifact_id: "correct-workflow-authority-guidance.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "correct-workflow-authority-guidance"
step_id: "s04"
step_slug: "acceptance-criteria"
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
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "correct-workflow-authority-guidance.s01.restate.md"
  - "correct-workflow-authority-guidance.s02.business-goal.md"
  - "correct-workflow-authority-guidance.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Review proposal only. Protocol remains MATERIALIZED at s01; work-item and authoring gate approvals are pending. No implementation grant is open.

## Step Contract

```yaml
step_goal: "Propose measurable acceptance and readiness evidence without passing Spec or DoR."
input_summary:
  - "correct-workflow-authority-guidance.s01.restate.md"
  - "correct-workflow-authority-guidance.s02.business-goal.md"
  - "correct-workflow-authority-guidance.s03.open-questions.md"
output_summary:
  - "AC-AUTH-001..006, baseline, invariants and review requirements."
done_when:
  - "Each criterion has a concrete negative/positive verification path and bounded owner."
owner: "ba (Spec proposal); qc (DoR recommendation)"
```

## Requirement Baseline

```yaml
status: "BLOCKED"
approved_spec_refs: []
decision_notes:
  - "This note is the canonical proposed spec for sdd_mode=none. No separate BRD/SRS/Spec Card is required."
  - "Human Spec and DoR decisions remain pending; this is not a frozen baseline."
```

## Contract Baseline

```yaml
status: "NOT_APPLICABLE"
api_contract_refs: []
ux_contract_refs: []
notes:
  - "No public API/event/data/UX contract change. Prose will describe the existing authority rather than alter it."
```

## Existing System Baseline

```yaml
current_behavior_refs:
  - "main a36b1852ca13dd5209fad319400e769c5b22cabf; workflow-bundle 2.6.3."
  - "policies/codex/AGENTS.global.md: Human-Controlled Gates, SDD Light, Spec/Design Before Code."
  - "packages/workflow-bundle/scripts/work-item-protocol.js: current list/status legacy policy, approve bootstrap and activation."
  - "packages/workflow-bundle/scripts/workflow-gate-review.js: finalized host before sealing; hash-bound receipts."
  - "Parent M7 source-unit evidence at audit commit 8e817a88f5a00c97af027aab5304f1085c4c65da."
impacted_surfaces:
  - path: "skills/analysis/requirement-analysis/SKILL.md"
    sha256: "41970076eb955cb17272f17193d58a5a268dd1e6ebb291c3c305b67afb020263"
  - path: "skills/analysis/requirement-analysis/SKILL.vi.md"
    sha256: "80cfadc4668d8dbaa23e8e1507196b62228808ad978548c281b922ad66bf5b99"
  - path: "skills/guardrails/definition-of-done-gate/SKILL.md"
    sha256: "bf3c6b9508794cb11a8a262fe5b742c0df834fb913d15b762e82517e59dc8e9d"
  - path: "skills/guardrails/definition-of-done-gate/SKILL.vi.md"
    sha256: "5a75be0a2e7650c7f8350b0be7bbcf49809df05303e6101d4c9a64ff8dbae0ef"
  - path: "skills/orchestration/codex-workflow-chain/SKILL.md"
    sha256: "83138352a6800b87dfacd776e3fac5440295b94194d7f47a144e569ee69f2f8a"
  - path: "skills/orchestration/codex-workflow-chain/SKILL.vi.md"
    sha256: "4d133a1b83447d45f1845785b3db4cc1f373eaa9be80fdba63e6ef0f2e003cac"
  - path: "skills/orchestration/codex-workflow-chain/references/work-item-protocol.md"
    sha256: "32a8363fd15c38da700284b7077da860aac4fceee175f5e28302e4ec3dc80bde"
  - path: "skills/orchestration/codex-workflow-chain/references/work-item-protocol.vi.md"
    sha256: "356dd1ff5dd3918c934687ea014f39de28244033869f56d0078f439aec8dc328"
compatibility_constraints:
  - "Keep current output schema fields/enums and protocol semantics."
  - "Keep full and Light logical gates distinct from their physical host layout."
  - "Existing test/run-all.js auto-discovers *.test.js; no runner or CI change."
rollback_constraints:
  - "Revert only the owned correction commit if needed; retain workflow evidence."
  - "Never restore stale approvals or modify another work item's report/receipt."
```

## Main Artifact

```yaml
acceptance_criteria:
  - id: "AC-AUTH-001"
    finding_refs:
      - "M7-H01"
      - "M2-OBS-05"
    description: "Requirement-analysis EN/VI explicitly excludes source edits for summary/analysis-only requests; clarity or a pre-existing implementation idea cannot open write authority."
    verify: "Read the Out Of Scope section in each language. A clear analysis-only request must still yield no source write. Regression rejects the original exception and an equivalent permissive mutation."
  - id: "AC-AUTH-002"
    finding_refs:
      - "M7-L15"
      - "M7-L14"
    description: "Backbone EN/VI requires every applicable prerequisite before s07. Full uses s04/s05/s06; Light uses s04/s06 hosts without inventing an s05 file or receipt. Independent human gate evidence remains mandatory."
    verify: "Check the entry rule and every ACTIVE prerequisite statement together. Remove each applicable prerequisite in turn or substitute a draft artifact: each case remains blocked. Full and Light positive controls retain their correct host sets."
  - id: "AC-AUTH-003"
    finding_refs:
      - "M7-H05"
      - "M2-OBS-15"
    description: "Protocol EN/VI consistently distinguishes s01 authoring/materialization from s07 activation. list is operative, legacy read bootstrap is limited to allow_readonly, and approve may create a pending report before an explicit trusted human decision."
    verify: "Compare activate goal/output, current/future command lists, legacy rules and full/Light prerequisites with work-item-protocol.js. Reject wrong-step, unconditional legacy-read and scaffold-equals-approval mutations."
  - id: "AC-AUTH-004"
    finding_refs:
      - "M7-L10"
      - "M2-OBS-10"
    description: "DoD EN/VI treats AI output as an advisory assessment. Actual completion requires authorized human QC DoD approval, applicable trusted evidence and protocol transitions. Preserve the existing output schema identifiers and six evidence checks."
    verify: "Check evaluation, decision and completion sections together. Local tests passing or AI proposing DONE cannot itself close delivery. Regression rejects self-approval wording and ensures the schema/evidence checks remain."
  - id: "AC-AUTH-005"
    finding_refs:
      - "AC-CF-007"
    description: "Recheck the repaired authority/action scopes in all eight files with BA assessment and QC verification: zero critical flags, cohort mean at least 4/5, each of the five dimensions in every unit at least 3/5."
    verify: "Record exact file SHA-256, read ranges, excerpts, five scores, critical flag and human BA/QC decisions in child s08. Dimensions: clarity, naturalness, next action, terminology, role/gate relevance. This is a bounded contribution, not a whole-M7 PASS."
  - id: "AC-AUTH-006"
    finding_refs:
      - "AC-CF-006"
    description: "A focused regression is discovered by the existing unit runner and protects the four corrected authority boundaries in both languages without changing runtime gate behavior."
    verify: "Capture RED on original defective files, GREEN on corrections, and rejection of each targeted in-memory mutation. Run the complete existing unit suite after generating local runtime; report any unrelated failure separately. File-name counts alone are insufficient."
edge_cases:
  - "A clear summary/analysis-only request still grants no source write."
  - "A complete draft plan, review pass or test pass is not a human gate."
  - "Light keeps eight logical steps but has no separate s05 physical host/receipt."
  - "An old scaffold may be read under allow_readonly, or approved through the explicit pending-report path; neither implies ACTIVE."
  - "Advisory DONE is not protocol DONE; missing applicable evidence blocks actual completion."
out_of_scope:
  - "All other M7 units, missing VI files and CLI bump wording."
  - "Runtime gate implementation, approval model, schemas, public contracts, policy source and lifecycle semantics."
  - "Master protected finding register and frozen s04/s05/s06; parent review/DoD decisions."
  - "P-HOOKS, P-MCP, P-INSTALL and CURRENT release/publication corrections."
  - "Global installs, registry publication, tagging, merging and branch/worktree cleanup."
done_when:
  - "All six criteria have evidence, ordered s07 review and human s08 DoD before child closeout."
behavioral_invariants:
  - "No new runtime behavior, approval bypass, gate reduction or receipt substitution."
  - "One source owner per fact: s04 acceptance, s05 design, s06 tasks, s07 implementation, s08 verification."
  - "Parent thresholds and finding IDs/severities remain unchanged."
```

## Governance Checks

```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Admission disposition signatures verified; materialization recovered via CLI."
  - "Eight source paths and new test proposed only; granted_write_paths remains empty."
  - "No independent agent/delegation; human BA participation has the named M7 trigger."
blocking_items:
  - "Work-item approval, Spec and DoR are pending; Approach/Task Plan drafts cannot open implementation."
owner: "qc"
next_action: "Human review of the concrete packet; then record decisions and seal each applicable gate through normal trusted CLI flow."
```

## Definition of Ready

```yaml
status: "BLOCKED"
blockers:
  - "Human Spec and DoR decisions have not been recorded or sealed."
owners:
  - "ba"
  - "qc"
notes:
  - "Evidence/content is ready for review. BLOCKED describes unpassed readiness authority, not a missing technical proposal."
  - "No exception, waiver or inherited parent approval is asserted."
```

## Traceability

```yaml
upstream:
  - "correct-workflow-authority-guidance.s01.restate.md"
  - "correct-workflow-authority-guidance.s02.business-goal.md"
  - "correct-workflow-authority-guidance.s03.open-questions.md"
next_step: "correct-workflow-authority-guidance.s05.technical-approach.md"
parent_contribution:
  - "P-SEM / CF-010: authority semantics."
  - "P-LANGUAGE / CF-012: coordinated EN/VI meaning."
  - "AC-CF-006/007: bounded regression and language evidence only."
```

## Handoff

Review AC-AUTH-001..006 as one bounded spec and assess DoR separately. The s05/s06 documents are conditional proposals; keep them draft until the appropriate human decisions.
