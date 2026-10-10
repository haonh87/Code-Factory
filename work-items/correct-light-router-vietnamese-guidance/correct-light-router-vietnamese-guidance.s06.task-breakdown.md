---
artifact_id: "correct-light-router-vietnamese-guidance.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "correct-light-router-vietnamese-guidance"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
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
  task_plan_reviewed_by: [developer]
  task_plan_reviewed_at: "2026-10-06T06:28:40Z"
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
  - "correct-light-router-vietnamese-guidance.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> The user explicitly accepted the work item, Spec + DoR, Approach A and Task Plan at checkpoint `ef8bf47`. Acceptance was recorded at 2026-10-06T06:28:40Z; this is the recording time, not an inferred chat timestamp. Trusted receipt sealing and CLI activation are still required before source implementation.

## Step Contract

```yaml
step: "s06"
step_goal: "Offer an executable bounded plan with paths, order and verification checkpoints."
value: "Remove incorrect Light next-action guidance without changing approval authority."
input_summary:
  - "correct-light-router-vietnamese-guidance.s04.acceptance-criteria.md"
  - "correct-light-router-vietnamese-guidance.s05.technical-approach.md"
output_summary:
  - "T1–T6, accepted scope awaiting activation grants, exact fixture boundaries and verification commands."
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

## Main Artifact

```yaml
implementation_goal: "Satisfy AC-LR-001..005 under option A after its independent human approvals."
ba_lane:
  acceptance_coverage:
    - "T2/T3 -> AC-LR-001/002; T3/T4 -> AC-LR-003/004; T5/T6 -> AC-LR-005 and final coverage."
  scope_guards:
    - "No other M7 units, EN edits, source runtime changes, global install, release or cleanup."
  human_review_points:
    - "Work-item approval; Spec and DoR; Approach; Task Plan before T1."
    - "Bounded BA language review and separate QC DoD after evidence."
dev_lane:
  path_map:
    - path: "skills/orchestration/workflow-governance-router/SKILL.vi.md"
      ownership: "Human-accepted source scope; activation required: only two Step 3/4 insertions."
    - path: "packages/workflow-bundle/test/workflow-light-router-guidance.test.js"
      ownership: "Human-accepted new focused regression; no runner edits."
    - path: "work-items/correct-light-router-vietnamese-guidance/"
      ownership: "Authoring/evidence; report and s01 protocol block remain CLI-owned."
    - path: "packages/workflow-bundle/runtime"
      ownership: "Human-accepted derived-only local verification; activation required; ignored output, never committed or installed."
    - path: "packages/workflow-bundle/workflow-bundle.manifest.json"
      ownership: "Human-accepted derived-only local verification; activation required; must be byte-identical after generation, no version/metadata change."
  technical_sequence:
    - "T1 -> T2 RED -> T3 GREEN -> T4 review/regression -> T5 BA -> T6 QC/DoD."
  tdd_targets:
    - "Fail-first static guidance regression is required by the human-accepted plan; no runtime behavior change is claimed."
    - "Capture the original source omissions before the two VI insertions. Do not backfill a claimed RED."
task_breakdown:
  - id: "T1"
    owner_role: "developer"
    name: "Verify approvals and activate the exact scope"
    objective: "Require human work-item approval and four independently valid Spec/DoR/Approach/Task Plan receipts on the final hosts. Activate s07 through normal CLI using exactly the five path_map entries."
    paths_in_scope:
      - "work-items/correct-light-router-vietnamese-guidance/"
    dependencies:
      - "Human authoring decisions and trusted sealing."
    outputs_expected:
      - "ACTIVE/s07 with exact grants and matching source baselines; s07 entry evidence."
    review_checkpoint: "No implementation from drafts, parent grants or admission signatures."
    verification_hint: "Read work-item/gate/capability status, verify current receipt host digests, compare EN/VI hashes to s04 and capture package manifest hash. Legacy workflow-pack.manifest.json must be absent; stop on baseline drift."
  - id: "T2"
    owner_role: "developer"
    name: "Reproduce both VI omissions with focused tests"
    objective: "Write section-scoped checks and positive controls before editing VI. Report Step 3 and Step 4 failures independently so one failure cannot hide the other."
    paths_in_scope:
      - "packages/workflow-bundle/test/workflow-light-router-guidance.test.js"
      - "work-items/correct-light-router-vietnamese-guidance/correct-light-router-vietnamese-guidance.s07.implementation.md"
    dependencies:
      - "T1"
    outputs_expected:
      - "Focused RED for both actual omissions; positive control and all specified in-memory negative fixtures."
    review_checkpoint: "Spec compliance against AC-LR-001/002/004 before test code quality."
    verification_hint: "Run the new test and record both missing-instruction diagnostics. Read EN as a positive authority control and use corrected in-memory VI as a fixture only. Syntax or missing-file errors are invalid RED."
  - id: "T3"
    owner_role: "developer"
    name: "Restore the two VI Light instructions"
    objective: "Insert the missing Step 3 host explanation and Step 4 mapping/conditions, preserving other VI bytes and all read-only references."
    paths_in_scope:
      - "skills/orchestration/workflow-governance-router/SKILL.vi.md"
      - "work-items/correct-light-router-vietnamese-guidance/correct-light-router-vietnamese-guidance.s07.implementation.md"
    dependencies:
      - "T2"
    outputs_expected:
      - "Minimal two-insertion diff; focused GREEN and rejected mutations."
    review_checkpoint: "Review semantic parity and each independent approval first, then wording clarity and minimal diff."
    verification_hint: "Run focused test; compare EN and unchanged VI regions against captured baseline; inspect no extra s05 requirement, no dropped gate, correct Foundation escalation and conditional Contract."
  - id: "T4"
    owner_role: "developer"
    name: "Review and run the standard verification path"
    objective: "Complete ordered spec-compliance then code-quality review, followed by local runtime generation, standard tests and pack/workflow checks."
    paths_in_scope:
      - "work-items/correct-light-router-vietnamese-guidance/correct-light-router-vietnamese-guidance.s07.implementation.md"
      - "packages/workflow-bundle/runtime"
      - "packages/workflow-bundle/workflow-bundle.manifest.json"
    dependencies:
      - "T3"
    outputs_expected:
      - "Command evidence, full-suite discovery of the new test, review findings and preservation checks."
    review_checkpoint: "No unresolved critical defect or unattributed delta is allowed into s08."
    verification_hint: "Use Verification Plan commands. Generated runtime is local only, package manifest must retain its preflight hash. Do not commit generated output or bypass a failing check."
  - id: "T5"
    owner_role: "ba"
    name: "Review the exact EN/VI reading scopes"
    objective: "Assess the two source units from AC-LR-005 using hashes, precise read ranges, excerpts and five dimensions; record explicit human BA review separately from proposed AI scores."
    paths_in_scope:
      - "work-items/correct-light-router-vietnamese-guidance/correct-light-router-vietnamese-guidance.s08.verification.md"
    dependencies:
      - "T4"
    outputs_expected:
      - "Bounded language evidence and human BA verdict, with any corrective feedback attributed."
    review_checkpoint: "Critical flags zero, mean >=4 and every dimension >=3; no extrapolation to the full M7 ledger."
    verification_hint: "Read Steps 3–4 and immediate Step 5 context in both source files. QC independently checks arithmetic and the reviewed hashes."
  - id: "T6"
    owner_role: "qc"
    name: "Verify AC coverage and request human DoD"
    objective: "Map every AC to evidence, disclose limitations and obtain a separate explicit human QC DoD decision and valid trusted receipt before normal CLI close."
    paths_in_scope:
      - "work-items/correct-light-router-vietnamese-guidance/"
    dependencies:
      - "T5"
    outputs_expected:
      - "s08 AC coverage, compatibility summary, human DoD and normal protocol close if approved."
    review_checkpoint: "Test/review success is not human DoD. Branch integration/archive/cleanup is a later separate decision."
    verification_hint: "Recheck receipts and host hashes, workflow/protocol validation and exact owned delta. Keep unresolved gaps BLOCKED/PARTIAL; do not close parent M7 or reopen release."
dependencies_global:
  - "Node 22.23.2 is available; test discovery and pack scripts already exist."
  - "Trusted human authoring gates and exact activation grant."
risk_notes:
  - "Static prose tests cover named failure modes only; human meaning review remains required."
  - "No delegation; one isolated worktree spans the authoring and implementation sessions."
verification_plan:
  - "Known-source RED/GREEN and every mutation in the fixture list below."
  - "Standard full-suite/pack/workflow checks, source/manifest preservation and human bounded language review."
notes_for_implementation: "The user explicitly accepted T1–T6. This records human Task Plan approval, not an inferred draft pass. Finish trusted sealing and verify all receipts before T1 activation; no source/test edit is allowed earlier."
```

## Verification Plan

Use Node 22.23.2 from `/Users/haonguyen87/.nvm/versions/node/v22.23.2/bin/node`; run from this child worktree. Commands below use `node` as shorthand for that binary.

- Remove the entire VI Step 3 Light instruction while retaining the eight-step list.
- Require a separate physical s05 note for Light.
- Require a separate s05 Approach receipt for Light.
- Move Spec/DoR from s04 to s06.
- Move Approach/Task Plan from s06 to s05.
- Omit Spec, DoR, Approach or Task Plan one at a time from the Light mapping (four independent fixtures).
- Allow Foundation Decision inside Light without escalating to full.
- Remove the conditional Contract-at-s04 rule.

```sh
node packages/workflow-bundle/test/workflow-light-router-guidance.test.js
node --check packages/workflow-bundle/test/workflow-light-router-guidance.test.js
node packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js
node packages/workflow-bundle/test/run-all.js
node packages/workflow-bundle/scripts/audit-workflow-pack.js --repo-root .
node packages/workflow-bundle/bin/wfc.js naming --workflow-root work-items --project-root . --telemetry off
node packages/workflow-bundle/bin/wfc.js governance --workflow-root work-items --project-root . --telemetry off
node packages/workflow-bundle/bin/wfc.js exec --workflow-root work-items --project-root . --telemetry off
node packages/workflow-bundle/bin/wfc.js plan --workflow-root work-items --project-root . --telemetry off
node packages/workflow-bundle/bin/wfc.js protocol --workflow-root work-items --project-root . --telemetry off
git diff --check
```

Run the focused command once for RED at T2 and again for GREEN after T3. Runtime generation precedes the full suite; only the two derived grants may receive its output. Require unchanged tracked package manifest and absent legacy `workflow-pack.manifest.json` at preflight. Check changed text with strict UTF-8 decoding, no BOM or replacement character, valid YAML blocks and local links. Review the new test for syntax, static correctness, security and performance; use available scanners and disclose unavailable tooling. No application build/deploy exists in this source-prose/test boundary; local bundle generation and pack audit cover packaging. No install, registry, tag or release command is authorized.

## Governance Checks

```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Every task declares owner, exact paths, dependencies, outputs and verification."
  - "No parallel agent or delegated write scope."
blocking_items:
  - "Trusted work-item/Spec/DoR/Approach/Task Plan receipts and s07 activation; content decisions are already accepted."
owner: "developer"
next_action: "Seal the accepted Task Plan and other authoring decisions through the human-controlled CLI flow, then verify and activate the exact scope."
```

## Brownfield Delivery Plan

```yaml
regression_checkpoints:
  - "T2 actual-defect RED; T3 focused GREEN; T4 full suite and pack audit."
compatibility_checkpoints:
  - "T1 baseline and manifest hashes; T3 unchanged VI regions and EN; T4 exact delta."
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "Stop on any unexpected path delta; attribute it before proceeding."
  - "If rollback is needed later, revert only this child correction through a separately governed change; preserve signed evidence and unrelated work."
```

## Audit

```yaml
audit_status: "PARTIAL"
assessment_mode: "AI_AUTHORING_REVIEW"
notes:
  - "The user accepted the concrete authoring packet; normal trusted receipt sealing remains pending."
  - "Acceptance is owned by s04, the approach by s05, and executable scope/tasks by s06."
next_action: "Seal the accepted decisions against finalized hosts in a human-controlled terminal; verify signatures and host digests before activation."
```

## Traceability

```yaml
upstream:
  - "correct-light-router-vietnamese-guidance.s04.acceptance-criteria.md"
  - "correct-light-router-vietnamese-guidance.s05.technical-approach.md"
next_step: "s07"
```

## Authoring Validation — 2026-10-06

Naming, governance, execution and planning validators each pass for all eight child draft notes. Full-root protocol validation passes for 22 managed items with 21 configured legacy skips; the former missing-s01 admission failure is resolved. YAML frontmatter and fenced blocks parse; strict UTF-8, no BOM/replacement characters, local links and whitespace checks pass. These are authoring checks, not Task Plan approval or implementation verification.

The three signed admission records were reverified with production signature verification against their original IDs and reasons. Recovery used the fresh signed-report hash and operation recorded in s01. The recovered report and its s01 protocol projection remain byte-preserved during authoring; their owner is the normal CLI. The other 924 previously tracked child files retain their captured hashes, including both router sources and the package manifest. The proposed regression does not exist yet. Root WIP (19 untracked files), main, protected backup/evals refs and all six worktree paths remain preserved.

Authoring review checked scope and human-authority boundaries, then task dependencies, concrete fixture cases and verification commands. One draft routing field was corrected to the canonical `mixed_intent` name before handoff. This review does not open s07 or supply the later ordered implementation review. Source unit tests, runtime generation, pack build/scanning and human language scoring have not run for this authoring-only delta; they remain explicit T2–T6 work after approval.

Finalization checks on 2026-10-09: governance initially counted one of the three s05 options because its current section reader stops at a nested object field. The three options were reformatted as scalar list entries, preserving every description/tradeoff and the accepted selection A; governance then passed for all eight notes. This was an authoring-format correction, with no validator/source change or new design decision. The accepted AC block, verification commands, task objectives/dependencies and five-path scope are unchanged. The decision metadata below is ready for trusted sealing; receipt and activation verification remain pending.

## Human Authoring Decision — 2026-10-06

The repository owner replied **“accept”** to the explicit request to approve this work item, Spec + DoR, Approach A and Task Plan. The reviewed packet is commit `ef8bf47e3c4b1c1a2450c7f24ce628dacc1cac3f`; acceptance was recorded at `2026-10-06T06:28:40Z` (recording time, not a claimed chat timestamp). The actor is the user in this conversation. The accepted task objectives, paths, dependencies, test cases and AC-LR-001..005 are unchanged.

| Decision | Human reviewer role | Content decision | Trusted sealing |
| --- | --- | --- | --- |
| Work item | Maintainer | APPROVED | Pending normal CLI work-item approval |
| Spec | BA | APPROVED | Pending independent s04 receipt |
| DoR | QC | READY | Pending independent s04 receipt |
| Approach A | Developer | APPROVED | Pending s05 receipt |
| Task Plan T1–T6 | Developer | APPROVED | Pending s06 receipt |

The gate roles above are the reviewed authority assignments; no agent acts as the human signer. No DoD, later BA language result, Release, parent M7/CF-MB2 decision or cleanup is included. The normal `approve-ready-bundle` command can seal all four authoring receipts in one interaction while retaining each gate's own host, reviewer and signature. Work-item approval is a separate command. Both require the existing approval passphrase entered by the human; the agent does not request, read or supply it.

Freeze the finalized s04/s05/s06 bytes before trusted sealing. The report and s01 protocol block remain CLI-owned. The handoff helper is retained in the parent's existing disposition sidecar so that helper preparation or retry instructions cannot invalidate the accepted s06 host.

## Handoff

T1–T6 are human-accepted and NOT_STARTED. Finish the normal trusted work-item and authoring signing flow, verify signatures/current host digests, then activate exactly the five accepted paths before source work. Keep this worktree open; no merge/archive/cleanup decision is included.
