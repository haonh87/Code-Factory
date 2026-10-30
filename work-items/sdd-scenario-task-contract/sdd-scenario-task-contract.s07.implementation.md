---
artifact_id: "sdd-scenario-task-contract.s07.implementation"
artifact_family: workflow-step
work_item_slug: "sdd-scenario-task-contract"
step_id: "s07"
step_slug: "implementation"
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
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-scenario-task-contract.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

## Step Contract
```yaml
step_goal: "Implement the approved A1-A2 contract and bounded A1A2-AMEND-001."
input_summary: ["CR-011/work-item approval", "Five current-host authoring receipts verified before resume"]
output_summary: ["Optional scenario guidance", "Opt-in task/trace validation and compatible consumers"]
done_when: ["T1-T6 implemented and reviewed; human DoD is owned by s08"]
owner: developer
```

## Main Artifact
```yaml
recommended_design: "Opt-in v1 JSON in existing task and trace owners; absence preserves legacy YAML."
implementation_mode: FEATURE
tasks_completed: [T1, T2, T3, T4, T5, T6]
bug_repro_evidence: ["evidence/reader-compatibility-repro.json", "evidence/t4-consumers-red.log"]
hypothesis_log:
  - assumption: "Shared consumers can read JSON v1 unchanged."
    status: REJECTED
    evidence: "Original JSON semantic/reference diagnostic; approved amendment in s05/s06."
debug_experiments:
  - goal: "Keep legacy behavior and reject invalid opted-in contracts."
    action: "Run focused planning and shared-reader tests, then full suite."
    result: "75 planning cases, 19 added consumer cases plus existing resolver tests; 51 suite files passed."
tdd_evidence:
  - behavior: "Version, unique owners/keys and dependency graph"
    failing_test: "evidence/t2-red.log: unsupported version 2 was accepted"
    passing_test: "T2 intermediate 25-case pass; included in final 75-case suite"
  - behavior: "Paths, inert verification commands and exact AC/task mapping"
    failing_test: "evidence/t3-t4-red.log"
    passing_test: "evidence/t3-t4-green.log: 70 cases"
  - behavior: "Shared consumer compatibility and default-profile gate validation"
    failing_test: "evidence/t4-consumers-red.log"
    passing_test: "evidence/t4-consumers-green.log: legacy plus 19 versioned cases"
  - behavior: "AC ID field ordering and indentation"
    failing_test: "evidence/t4-review-red.log"
    passing_test: "evidence/t4-review-green.log: 75 cases"
safe_refactor_notes: ["No general YAML dependency", "Shared reader imports planning without a reverse gate dependency", "All original resolver tests retained"]
code_changes: ["Planning reader/validator", "SDD and governance adapters", "Shared semantic evidence and artifact reference consumers"]
doc_changes: ["T1 scenario guidance", "T5 EN/VI task contract examples and SDD ownership references"]
config_changes: []
review_checkpoints: ["T1 spec then document quality", "T2 graph/parser review", "T3/T4 path and consumer review", "T5 examples validated", "T6 integration review"]
outputs_actual: ["T1 commit aa55d6b", "A2 implementation commit bf9654b", "s08 verification packet"]
known_limitations: ["Local runtime Node 26.5.0 only", "ESLint and Semgrep unavailable; see s08 scan scope"]
follow_up_items: ["Human QC DoD decision", "Node 18/22 CI before a later release"]
notes_for_testing: "Full suite ran in an isolated source copy with generated runtime; its source hashes match this worktree."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "packages/workflow-bundle/test/validate-workflow-planning.test.js"
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".worktrees/sdd-scenario-task-contract"
worktree_reason: "Full plan, multiple boundaries and sessions."
review_status: COMPLETED
review_refs:
  - "#Targeted Review"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Keep branch open until s08 human DoD and explicit branch finalization."
verify_path: ["evidence/t6-full-suite.log", "evidence/t6-source-fingerprints.json", "sdd-scenario-task-contract.s08.verification.md"]
```

## Implementation Notes

Branch `feat/sdd-scenario-task-contract`, pinned base
`4f4cf4d3234e0b71c220531c36f2b283bce80bdb`. Implementation lives in the in-repo
worktree. Canonical protocol and receipt hosts remain at the original root because
the CLI report stores an absolute workflow_root. Worktree workflow notes/report
are transport copies, never an independent approval authority.

The initial copied-root activation failed before source changes. Canonical activation
then succeeded with mapped signed paths. A subsequent repeated `activate` hit a
CLI duplicate follow-up ID; no report or permissions were manually rewritten.
After A1A2-AMEND-001 was explicitly approved and both changed hosts re-signed,
the supported `resume` action succeeded, granting the two T4 additions and workflow
note transport. The underlying repeated-activate issue was not changed by A1-A2.

The canonical root ignores `.worktrees/`. At closeout, inspect the actual worktree
HEAD/diff in addition to canonical protocol checks. Source commit bf9654b contains
A2; aa55d6b contains T1. s08 owns verification hashes and closeout evidence.

The first isolated full-suite run lacked Git metadata and failed only the protocol
repository census test at `git ls-files`. After initializing/indexing the isolated
copy, all 51 test files passed. No production correction was needed for that failure.
Runtime generation occurred in this scratch copy, not installed harnesses.

## Targeted Review

Spec compliance was checked before code quality for each batch. T1 retains optional
scenario guidance and the Spec Card/SRS owner. T2 enforces explicit integer opt-in,
one owner, duplicate decoded keys and DAG dependencies. T3/T4 enforce bounded paths,
inert argv, exact declared AC/task mappings and preserve legacy behavior. The
consumer boundary matches approved A1A2-AMEND-001. T5 examples in both languages
pass the actual validator. The default scaffold continues to emit legacy notes.

Code quality review found an AC-reader assumption about ID ordering/indentation;
failing fixtures were added and the reader corrected before final verification.
All original shared-reader regression tests remain present. The test runner already
discovers every `*.test.js`, so no runner registration change was needed. No new
dependency, runtime writer, release control or approval authority was introduced.

## Traceability
```yaml
upstream: ["sdd-scenario-task-contract.s06.task-breakdown.md"]
next_step: "s08 technical evidence and human QC DoD review"
```

## Handoff

Implementation and targeted review complete. Technical verification evidence is
in s08; human DoD, merge, release and global installation are not claimed.
