---
artifact_id: "capability-grant-granularity.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "capability-grant-granularity"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: CHANGE
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
  spec:
    - "ba"
  contract:
    - "ba"
    - "devops"
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release:
    - "devops"
    - "qc"
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
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-09-12T07:57:37.000Z"
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
  - "capability-grant-granularity.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> The recommended approach does not add a check on top of typing paths. It removes the typing.
> `activate` derives a proposed grant from the `s06` Task Plan, auto-adds the four legitimate
> directory classes, and asks the human to confirm or amend. A source directory added by hand needs
> a reason. This makes the correct declaration the cheap one, which is the only way s02 R3 does not
> happen - authors routing around cost by declaring a bigger box.

## Step Contract
```yaml
step_goal: "Choose the smallest approach that makes a narrow grant cheaper to produce than a broad one, and lock the affected boundary."
input_summary:
  - "s04 acceptance AC-04, AC-06, AC-07"
  - "s03 five directory classes"
  - "s02 R3 - authors route around cost by declaring broadly"
output_summary: ["Option analysis with three options", "Chosen approach", "Affected boundary", "Validation plan"]
done_when: ["The chosen option is justified against the smaller rejected one", "Every touched file is named"]
owner: "developer"
```

## Option Analysis
```yaml
goal: "Make a source-directory grant carry a reason, and make the grant correspond to the Task Plan, without making activation more work than it is today."
options:
  - "Option A - validate the grant at activation and refuse a bare source directory"
  - "Option B - accept any grant at activation and flag it later in wfc validate"
  - "Option C - derive a proposed grant from s06 and ask the human to confirm or amend"
option_details:
  - name: "Option A - validate at activation and refuse a bare source directory"
    summary: "activate classifies each --write-root. A source directory without an accompanying reason is refused."
    pros:
      - "Enforced at the moment the declaration is made, which is the only moment it is cheap to fix."
      - "Smallest code change: one classifier and one refusal."
    cons:
      - "Makes activation strictly more work than today, with no compensating benefit to the author."
      - "The predictable response is a pro-forma reason. s02 R3 exactly."
      - "Does nothing for AC-07; the divergence between s06 and the grant stays unmeasured."
    risks: ["Produces a repository of narrow grants with meaningless reasons, which is worse than broad grants with none because it looks solved."]
  - name: "Option B - accept anything, flag later in wfc validate"
    summary: "Activation is unchanged. The validator reports source-directory grants without reasons."
    pros: ["Zero friction at activation.", "No refusal path to design."]
    cons:
      - "Reports after the grant is already in use, when amending it means a protocol transition."
      - "A report with no gate behind it is the CF-010 shape - a mechanism that observes and does not act."
    risks: ["Becomes a permanently amber signal nobody clears."]
    verdict: REJECTED
  - name: "Option C - derive from s06, confirm or amend"
    summary: >-
      activate with no explicit --write-root reads owned_paths from the s06 Task Plan, auto-adds the
      four legitimate directory classes for this work item, prints the proposed grant, and asks for
      confirmation. An explicit --write-root still works and overrides. A source directory the human
      adds by hand requires --write-root-reason.
    pros:
      - "The correct declaration becomes the cheapest one. Typing nothing produces a file-level grant; producing a broad one now costs more than producing a narrow one, which inverts today's incentive."
      - "AC-07 is satisfied by construction rather than by a comparison report: the grant is derived from s06, so divergence is visible at the moment it is introduced."
      - "Uses information that already exists and is currently discarded."
    cons:
      - "The quality of s06 owned_paths becomes load-bearing. A vague Task Plan produces a vague grant."
      - "Larger change than Option A: activate gains a derivation path and a confirmation step."
    risks:
      - "A work item with no s06, or an s06 whose owned_paths are empty, has nothing to derive from and must fall back to explicit paths."
recommended_option: "Option C - derive from s06, confirm or amend"
recommendation_reason: >-
  Option A is smaller and is the obvious answer, but it is not the smallest solution that is
  correct. It adds cost to the author and buys a reason field that s02 R3 predicts will be filled
  with nothing. Option C moves the cost to the tool: the author types nothing and gets a narrow
  grant, or types a directory and pays for it. That is the only version where a narrow grant is the
  path of least resistance rather than the virtuous one. It also absorbs AC-07 - there is no need
  to compare two declarations when there is one declaration derived from the other.
validate_before_or_during:
  - "Confirm owned_paths is populated in enough existing s06 notes for derivation to be useful rather than usually empty - before T1"
  - "Confirm the four legitimate classes can be derived from the work item slug alone, without a lookup table"
```

## Foundation Decision
```yaml
required: false
reason: >-
  No architectural baseline changes. This modifies how one existing field is populated at one
  existing transition. No new component, no new persisted object, no change to the deployment or
  runtime model. approval_gates.foundation stays not_applicable, as declared at s01.
```

## Artifact Chính
```yaml
approach_summary: >-
  activate derives, the human confirms, and only a hand-added source directory needs a reason.
  Classification of a path into one of the five s03 classes is a pure function of the path and the
  work item slug, so it needs no configuration and cannot drift.

classification_rule:
  own_artifact_directory: "work-items/<slug> - derived from the slug"
  own_worktree: ".claude/worktrees/<slug>* - derived from the slug"
  generated_output: "a fixed short list, currently packages/workflow-bundle/runtime"
  test_or_fixture: "a path segment named test, tests, or fixtures"
  source: "everything else that is a directory"
note_on_oq_07: >-
  s03 OQ-07 asked whether the taxonomy is a fixed list or declared per path. Four of the five classes
  are derivable from the slug or from a path segment, so only generated_output needs a list, and it
  currently has one entry. Fixed list wins on the evidence; a declared class would be a configuration
  surface nobody needs yet.

affected_boundary:
  - "packages/workflow-bundle/scripts/workflow-capability-control.js - classification and the reason requirement"
  - "packages/workflow-bundle/scripts/work-item-protocol.js - resolveGrantedWritePaths gains a derivation path"
  - "packages/workflow-bundle/bin/wfc.js - the --write-root-reason argument"
  - "packages/workflow-bundle/test/work-item-protocol.test.js - derivation and refusal fixtures"
  - "packages/workflow-bundle/test/workflow-capability-control.test.js - classification fixtures, file may not exist yet"

not_touched:
  - "Gate semantics, receipts, digests, reviewer identity"
  - "Anything reconciliation-related; that is capability-grant-reconciliation and it runs after this"

validation_plan:
  - "Classification is a pure function: a table test over one path per class plus three ambiguous paths."
  - "Derivation: a fixture work item with a populated s06 produces the expected grant, and one with an empty s06 falls back to requiring explicit paths."
  - "Refusal: a hand-added source directory without a reason is refused; with a reason it is accepted and the reason is persisted."
  - "Regression: the five measured work items' existing grants still load and their protocol still validates. Enforcement applies to new activations only."
  - "Counter-metric M-05 is observable after the change: the share of source-directory grants carrying a reason."
```

## Architecture Details
```yaml
data_shape:
  granted_write_paths: "unchanged - a list of strings"
  new_field: "granted_write_path_reasons - a map from path to reason, present only for hand-added source directories"
  compatibility: "A report with no reasons map is valid and means no source directory was hand-added. No migration."
failure_modes:
  - mode: "s06 owned_paths is empty or absent"
    handling: "Fall back to today's behaviour - explicit --write-root required. Derivation is an improvement, not a precondition."
  - mode: "Derived grant is wrong because the Task Plan was wrong"
    handling: "The human sees the proposal before confirming. This is the point of the confirmation step and not a defect."
  - mode: "A path matches two classes, for example work-items/<slug>/tests"
    handling: "First match wins in the order listed. The order puts the work item's own directory first, which is the more specific claim."
```

## Brownfield Impact Analysis
```yaml
existing_behaviour: "activate requires explicit --write-root and accepts any path shape without comment."
change: "activate gains a derivation path and a reason requirement for one class of path."
backwards_compatibility:
  - "Explicit --write-root continues to work exactly as today."
  - "Existing reports load unchanged; the reasons map is optional."
  - "Enforcement is prospective. The five measured work items are unaffected."
regression_surface:
  - "Every future activation. This is the transition that grants capability, so a defect here blocks work rather than corrupting data."
rollback: "Revert. Reports written with a reasons map remain valid because the field is optional."
```

## Traceability
```yaml
upstream:
  - "capability-grant-granularity.s04.acceptance-criteria.md"
  - "capability-grant-granularity.s03.open-questions.md"
next_step: "s06 Task Plan"
```

## Handoff
- Chosen: derive from s06, confirm, and charge only for a hand-added source directory. The smaller Option A was rejected because it adds cost to the author and buys a field s02 R3 predicts will be filled with nothing.
- AC-07 is absorbed rather than implemented. There is no comparison to run when the grant is derived from the thing it would have been compared against.
- OQ-07 from s03 answered on evidence: a fixed classification wins, because four of five classes derive from the slug or a path segment and the fifth has one entry.
- Foundation stays not_applicable, restated with a reason rather than inherited.
- Condition to enter s06: Approach sealed.
