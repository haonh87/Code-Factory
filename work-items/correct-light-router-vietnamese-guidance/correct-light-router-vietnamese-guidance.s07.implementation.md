---
artifact_id: "correct-light-router-vietnamese-guidance.s07.implementation"
artifact_family: workflow-step
work_item_slug: "correct-light-router-vietnamese-guidance"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: BUG
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "correct-light-router-vietnamese-guidance.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> T1–T4 implementation and technical review are complete. Both original VI omissions were reproduced before the two insertions; the full suite passes. T5 human BA/QC language review and T6 human DoD remain pending. This is not a DONE declaration.

## Step Contract

```yaml
step: "s07"
step_goal: "Implement the accepted two-section VI correction and focused regression after trusted activation."
value: "Route Light work correctly while preserving human approval authority."
input_summary:
  - "Frozen s04 acceptance, s05 option A and s06 T1–T6."
output_summary:
  - "Two VI insertions, one focused test and actual RED/GREEN/ordered-review evidence."
done_when:
  - "Exact grants activated; actual omissions reproduced; scoped correction and targeted review complete."
  - "Technical evidence handed to s08 without declaring human language approval or DoD."
owner: "developer"
constraints:
  - "Preserve signed s04/s05/s06, EN, policy, runtime implementation and package manifest."
  - "No delegation, release, install, merge, archive or cleanup."
risks:
  - "Static prose checks cannot replace human meaning review."
timebox:
  target_duration: "One bounded implementation and verification pass after authoring gates."
  deadline: "No external deadline."
  escalation_rule: "Stop if repair requires a third source section or a changed authority boundary."
```

## Main Artifact

```yaml
recommended_design: "Accepted s05 option A: restore only the two missing VI Light instructions."
implementation_mode: BUGFIX
tasks_completed: [T1, T2, T3, T4]
bug_repro_evidence:
  - "Before VI edits, focused test exited 1: Step 3 missing Light host instruction; Step 4 missing Light gate mapping."
hypothesis_log:
  - hypothesis: "VI omitted two existing EN instructions; runtime behavior needs no change."
    status: CONFIRMED
debug_experiments:
  - "Original EN checks pass; corrected VI controls pass; actual VI sections fail independently."
tdd_evidence:
  - "Actual source RED: 29 passed, 2 failed; 22 negative mutations rejected."
  - "After two insertions GREEN: 31 passed, 0 failed; 22 negative mutations rejected."
safe_refactor_notes:
  - "No refactor. Full-track list and all pre-existing VI bytes remain unchanged."
code_changes:
  - "packages/workflow-bundle/test/workflow-light-router-guidance.test.js"
doc_changes:
  - "skills/orchestration/workflow-governance-router/SKILL.vi.md: Step 3 host instruction and Step 4 gate mapping."
config_changes: []
review_checkpoints:
  - "T2: spec compliance of independent failure checks, then test code quality."
  - "T3/T4: authority/scope compliance, then wording and minimal-diff quality."
outputs_actual:
  - "Standard runner discovers 47 unit test files, all PASS."
  - "Derived runtime generation and pack audit PASS; manifest unchanged."
known_limitations:
  - "Regex checks cover known prose contracts; BA/QC human review remains required."
  - "ESLint and Semgrep unavailable; s08 explicitly discloses skipped scans."
follow_up_items:
  - "T5: human BA/QC review of the two hashed EN/VI reading units in s08."
  - "T6: separate explicit human QC DoD and trusted receipt before normal CLI close."
notes_for_testing: "Use the evidence and reproducible commands in s08; no further source change is proposed."
```

## Trusted Entry Evidence

Recorded 2026-10-10. The repaired human helper completed; the agent independently verified production trusted signatures with `hasApprovedReceipt` and gate host digests with `resolveGateArtifact`. All five receipts are APPROVED; the recorded human acceptance time is `2026-10-06T06:28:40Z` (the time the acceptance was recorded, not a claimed chat timestamp).

| Receipt | Human role | Signed/recorded UTC |
| --- | --- | --- |
| Work item | maintainer | 2026-10-10T05:50:54.490Z |
| Spec | ba | 2026-10-10T06:03:32.765Z |
| DoR | qc | 2026-10-10T06:03:32.783Z |
| Approach | developer | 2026-10-10T06:03:32.794Z |
| Task Plan | developer | 2026-10-10T06:03:32.803Z |

Frozen host SHA-256 values match the receipts:

- s04: `582b0b3c71ab3dd1784184ce9aca75a342df12833310ee7b88cd3ea6535cf657`
- s05: `6be6146b3c982e4fe841d2d968188594e67f69aceace4f919a455398e74f758c`
- s06: `715c8eb8071e75c12027723b5072ba65068b6f7b47f1d6239151f9ebc2073b9e`

Normal source CLI activation at `2026-10-10T06:04:27.108Z` set ACTIVE/s07, APPROVED, actor developer, no blockers, and exactly the five s06 path grants. The report and s01 protocol projection were written only by the CLI. This child remains full-profile/`sdd_mode=none`; it repairs guidance about Light. The signing helper's preactivation checks are now historical and must not be rerun as a postimplementation state validator.

## RED/GREEN Evidence

Commands ran under Node 22.23.2 in the child worktree, before and after the source correction:

```sh
node packages/workflow-bundle/test/workflow-light-router-guidance.test.js
node --check packages/workflow-bundle/test/workflow-light-router-guidance.test.js
```

Actual original-source diagnostics (exit 1; VI SHA-256 `b55ba5cd9682e0d1091ff893a0e638bcab4638f57649824c7c62bbd4fd21236c`):

```text
FAIL vi Step 3 source: Step 3: missing Light host instruction
FAIL vi Step 4 source: Step 4: missing Light gate mapping
Light router checks: 29 passed, 2 failed; 22 negative mutations rejected.
```

Both EN source controls, VI in-memory corrected controls, explicit-approval/fail-closed checks and mutations passed during RED. Missing files or parse errors were not counted as reproduction. After the two source insertions, exit 0:

```text
Light router checks: 31 passed, 0 failed; 22 negative mutations rejected.
```

The test label was clarified from “CRLF and whitespace controls” to “CRLF controls”; no assertion behavior changed. The standard full-suite run subsequently passed the final test bytes. Logs remain at `/private/tmp/cf-router-vi-implement-4j4sw53j/{red,green,unit,pack}.log`; this note retains the material results and s08 retains the commands, so temporary logs are not the sole evidence.

## Delivery Rule Evidence

```yaml
behavior_change: "NO"
tdd_status: DONE
tdd_test_refs:
  - "packages/workflow-bundle/test/workflow-light-router-guidance.test.js"
  - "#redgreen-evidence"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/correct-light-router-vietnamese-guidance"
worktree_reason: "Full-track, multi-session entry-guidance maintenance uses the existing isolated child."
review_status: COMPLETED
review_refs:
  - "#ordered-review"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Separate integration decision only after child s08 human DoD."
verify_path:
  - "correct-light-router-vietnamese-guidance.s08.verification.md"
```

`behavior_change=NO` describes unchanged production runtime code. The fail-first guidance regression was nevertheless required by the accepted plan and was actually executed.

## Implementation Notes

```yaml
worktree_target: "correct-light-router-vietnamese-guidance"
planning_track: full
risk_signals: ["Multiple sessions", "Critical entry guidance"]
worktree_decision: REQUIRED
decision_reason: ["Keep the parent audit, signed hosts and main isolated."]
isolation_strategy:
  branch_name: "fix/light-router-vietnamese-guidance"
  worktree_path: ".claude/worktrees/correct-light-router-vietnamese-guidance"
  owned_paths: ["The five exact activated s06 path_map entries"]
  expected_duration: "Through human verification and a later finish decision."
execution_guards: ["No writes outside granted scope", "No edits to signed authoring hosts"]
skip_reason: ""
cleanup_preconditions: ["Human DoD", "No open findings", "Separate finish decision"]
notes_for_implementation: "Resolved worktree path is inside the Code-Factory root."
```

```yaml
review_target: "VI Steps 3/4 and the new focused regression"
review_mode: TARGETED
review_order: [SPEC_COMPLIANCE, CODE_QUALITY]
review_batches:
  - batch: T2
    scope: ["Focused regression"]
    trigger: "Independent reproduction of both omissions before source repair"
    reviewer_role: "developer (agent self-review)"
  - batch: T3-T4
    scope: ["Two VI insertions", "Final focused test"]
    trigger: "Critical router guidance and bounded source preservation"
    reviewer_role: "developer (agent self-review)"
required_checks:
  spec_compliance: ["AC-LR-001..004 technical coverage", "Independent approvals and exact scope"]
  code_quality: ["Readable fixed-input checks", "No test writes/network/exec", "Minimal accented VI diff"]
finding_policy:
  blocker_threshold: "Any authority drift, out-of-scope edit, false reproduction or failing required check."
  reopen_conditions: ["Changed source/host hash", "Human meaning-review correction"]
handoff_to_verify: ["s08 technical evidence and two-unit BA/QC review packet"]
notes_for_implementation_or_verify: "Targeted review is not an independent human review or DoD."
```

### Ordered Review

1. **T2 spec compliance — PASS:** separate Step 3/4 source checks reveal both real defects; EN is a positive control; all eleven planned mutations are present, plus additional logical-step/conditional/contradictory-host checks. Four gates and both host pairs are checked independently.
2. **T2 code quality — PASS:** Node built-ins only, repository-relative fixed files, in-memory mutation fixtures, deterministic diagnostics and no writes/network/shell. CRLF normalization is covered. The label correction above improves the accuracy of the test description.
3. **T3/T4 spec compliance — PASS:** eight logical steps remain; the Light physical-host exception is conditional; independent trusted receipts remain explicit; Foundation escalates to full and conditional Contract remains at s04. EN/policy/runtime sources and finalized gate hosts are untouched. Human language acceptance is still pending.
4. **T3/T4 code quality — PASS:** the VI delta is two insertions only. Existing terminology is retained to match the surrounding bilingual technical documentation. Long policy sentences are a bounded readability risk for the human reviewer. The new tests scan small static files; synchronous reads stay in the test process.

## Traceability

```yaml
upstream:
  - "correct-light-router-vietnamese-guidance.s04.acceptance-criteria.md"
  - "correct-light-router-vietnamese-guidance.s05.technical-approach.md"
  - "correct-light-router-vietnamese-guidance.s06.task-breakdown.md"
next_step: "s08"
```

## Handoff

The [s08 review packet](correct-light-router-vietnamese-guidance.s08.verification.md) owns technical verification, bounded language scores and the pending human decisions. No source rework is currently proposed. Keep the child open and parent M7 FAIL until their separate required decisions and evidence exist.
