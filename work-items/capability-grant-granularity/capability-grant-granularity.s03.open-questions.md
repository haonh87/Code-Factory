---
artifact_id: "capability-grant-granularity.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "capability-grant-granularity"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: CHANGE
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
  - "ba"
  - "developer"
  - "qc"
review_mode: independent
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
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
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "capability-grant-granularity.s01.restate.md"
  - "capability-grant-granularity.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> The s02 assumption was tested and holds, but the s01 framing does not. All 13 work items carrying
> a grant declare at least one directory; none declares files only. That rules out laziness as the
> explanation, because a universal behaviour is a property of the rule, not of the people following
> it. Inspecting what those directories are shows most of them are legitimate and could not be
> enumerated. The work item therefore narrows: the target is source directories, not directories.

## Step Contract
```yaml
step_goal: "Test the s02 assumption that one measured case is representative, and correct the s01 framing where the data contradicts it."
input_summary:
  - "granted_write_paths of all 13 work items holding a grant, main and the CR-008 worktree, read 2026-09-12"
output_summary: ["Measurement", "Corrected assumption A1", "Refined open questions"]
done_when: ["The assumption is confirmed or refuted by data", "Questions that the data already answers are closed"]
owner: "ba"
```

## Artifact Chính
```yaml
measurement:
  command: "read granted_write_paths from every *.work-item-report.json under work-items and the CR-008 worktree; classify each path as directory or file"
  measured_at: "2026-09-12"
  result:
    work_items_with_a_grant: 13
    declaring_at_least_one_directory: 13
    declaring_files_only: 0
  most_declared_directories:
    - "packages/workflow-bundle/test - 3 work items"
    - "work-items/<own slug> - 2 work items"
    - "packages/workflow-bundle/tests/fixtures - 2 work items"
    - "packages/workflow-bundle/scripts - 1 work item"
    - "skills/orchestration - 1 work item"
    - "packages/workflow-bundle/runtime - 1 work item"

interpretation: >-
  100 percent is not a behaviour, it is a property of the rule. If every author without exception
  declares a directory, the explanation is not that every author is careless; it is that the current
  contract offers no workable alternative for the cases where new files appear during execution. The
  s01 assumption A1 - that most directory grants are convenience rather than necessity - is too
  broad and is corrected below.

directory_taxonomy:
  - class: "own artifact directory"
    example: "work-items/<slug>"
    verdict: LEGITIMATE
    reason: "Which notes exist changes as the work item progresses. Light creates s07 and s08 lazily on transition, so the file set is unknowable at activation by design."
  - class: "own worktree"
    example: ".claude/worktrees/<slug>"
    verdict: LEGITIMATE
    reason: "A worktree is a whole tree. Enumerating it is meaningless."
  - class: "generated output"
    example: "packages/workflow-bundle/runtime"
    verdict: LEGITIMATE
    reason: "Contents are produced by a build step, not authored."
  - class: "test and fixture directories"
    example: "packages/workflow-bundle/test, packages/workflow-bundle/tests/fixtures"
    verdict: LEGITIMATE_WITH_CAVEAT
    reason: "TDD creates fixtures that cannot be named before the defect is reproduced. But a grant here also covers every existing test, which is how a work item acquires the ability to weaken another work item's regression fixture without declaring it."
  - class: "source directories"
    example: "packages/workflow-bundle/scripts, skills/orchestration"
    verdict: SUSPICIOUS
    reason: "The file set is knowable at planning time. s06 already requires owned_paths per task, so the information exists one step before activation and is discarded rather than used."

counter_evidence:
  - finding: "fix-authoring-smoke-bootstrap declares 27 paths: 25 files and 2 directories."
    significance: >-
      Enumeration of source files is feasible and has already been done once in this repository, at
      a scale larger than any current work item needs. It is not the default, but it is not novel
      either. This removes the argument that file-level declaration is impractical.

corrected_assumption:
  id: A1
  original: "Most directory grants are convenience, not necessity."
  status: CORRECTED
  replacement: >-
    Most directory grants are necessary for the class of directory they name. Four of the five
    classes cannot be enumerated at activation. Only source directories can, and only they are the
    target. The scope of this work item narrows accordingly, from all directory grants to source
    directory grants.
  effect_on_scope: >-
    s01 scope_draft.in says validation of granted_write_paths shape. That is now too broad. The rule
    is conditional on directory class, and the taxonomy above becomes an input to s05.

open_questions:
  - id: OQ-03
    question: "When implementation needs a source file the grant did not list, is it refused or allowed with a recorded amendment?"
    status: OPEN
    note: "Still the design crux. Refusing punishes an honest forecast; allowing silently makes the grant decorative. M-04 in s02 is the counter-metric that detects the wrong choice after the fact, but the choice itself has to be made in s05."
  - id: OQ-07
    question: "Is the directory taxonomy a fixed list in the validator, or a declared class per path in the grant itself?"
    status: OPEN
    note: "New, arising from this step. A fixed list is simpler and cannot be gamed; a declared class travels with the work item and handles directories the list does not anticipate. This did not exist as a question before the taxonomy was found."
  - id: OQ-08
    question: "Does a test-directory grant need to distinguish creating a new fixture from modifying an existing test?"
    status: OPEN
    note: "New. The LEGITIMATE_WITH_CAVEAT class is the only one where a legitimate need also confers an illegitimate power - the ability to alter another work item's regression evidence without declaring it. Relevant to CF-010 and to the R-01 class of blind spot."
  - id: OQ-04
    question: "Warn-then-enforce over a period, or enforce for new work items only?"
    status: OPEN
  - id: OQ-06
    question: "Is a declared-versus-actual mismatch a validator failure or a report a human reads?"
    status: OPEN
    note: "M-03 in s02 requires it to be reported. Whether it also blocks is separate."

closed_questions:
  - id: OQ-01
    question: "Is a directory grant ever legitimate, or always a smell?"
    answer: "Legitimate for four of five classes. Closed by the taxonomy."
  - id: OQ-05
    question: "Should the rule apply to test directories, where new files are routine?"
    answer: "No, not as a straight prohibition. Test directories are LEGITIMATE_WITH_CAVEAT, and the caveat becomes OQ-08 rather than a blanket exemption."

missing_inputs:
  - "Declared-versus-actually-touched file counts for completed work items. Only the parent was measured, because attributing commits to work items requires reading each branch. Needed before s04 locks M-02 target."

conflicts: []

assumptions:
  - "The five classes are exhaustive for this repository today. A sixth may appear; OQ-07 exists partly to make that survivable."
```

## Input Readiness
```yaml
status: READY
blocking_items: []
owner_actions:
  - "None blocking. The missing declared-versus-touched measurement refines the M-02 target but does not block s04 authoring."
```

## Audit
```yaml
step_goal_met: true
evidence:
  - "13 of 13 work items measured, not sampled"
  - "A1 corrected against the data rather than defended"
  - "Two questions closed by measurement, two new ones raised by it"
gaps:
  - "Declared-versus-touched ratio measured for one work item only"
verdict: PASS
```

## Traceability
```yaml
upstream: ["capability-grant-granularity.s01.restate.md", "capability-grant-granularity.s02.business-goal.md"]
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Assumption tested: 13 of 13 work items declare a directory. The s02 assumption that the measured case is representative holds; the s01 assumption about why does not.
- Scope narrowed: source directories only. Four of five directory classes are legitimate and stay untouched.
- Crux unchanged: OQ-03. Two new questions, OQ-07 and OQ-08, exist only because the taxonomy was found here.
- Condition to enter s04: none.
