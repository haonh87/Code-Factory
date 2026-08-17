---
artifact_id: "artifact-governance-model.s01.restate"
artifact_family: workflow-step
work_item_slug: "artifact-governance-model"
step_id: "s01"
step_slug: "restate"
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
sdd_mode: light
spec_refs:
  card: "product-specs/cards/artifact-governance-model.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec: []
  dor: []
  approach: []
  task_plan: []
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts:
  - "product-specs/cards/artifact-governance-model.md"
tags:
  - "agent-ops"
  - "workflow/s01"
  - "artifact-governance"
---

# Step 1 - Clarify

> [!summary]
> Every working round leaves new files in repository areas that have no placement rule, so the
> same content lands in two or three homes and nobody can tell which copy is authoritative.
> This work item declares one home per content layer and makes an unplaced file a validation
> failure instead of a habit.

## Step Contract
```yaml
step_goal: "Pin the real driver of artifact sprawl with measured evidence, and lock the scope boundary between the governed zone that already works and the ungoverned zone that leaks."
input_summary:
  - "User report, stated three times: too many files per round, hard to follow, content may duplicate"
  - "Measured repository census: work-items/, changes/, product-specs/, docs/, repository root"
  - "Existing controls: wfc scaffold, wfc validate, workflow-step-definitions.js"
output_summary:
  - "Restated request and request type"
  - "Root-cause finding separating governed from ungoverned zones"
  - "Draft scope with explicit in/out boundary"
  - "Assumptions taken on behalf of the human, flagged for rejection at the gate"
done_when:
  - "The sprawl driver is stated as a measured fact, not an impression"
  - "The scope boundary names which existing roots are touched and which are not"
  - "Every decision taken without human input is recorded as a numbered assumption"
owner: "ba"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Prefer the smallest solution that is correct"
  - "Brownfield baseline and delta discipline"
  - "AI proposes, human approves"
required_reviews:
  - "Spec at s04"
  - "DoR at s04"
  - "Approach at s05"
  - "Task Plan at s06"
prohibited_actions:
  - "Deleting or moving any existing document during discovery"
  - "Editing workflow-step-definitions.js or the 8-note layout before an approved Approach"
  - "Treating this note as approval to start migration"
open_governance_questions:
  - "Does shrinking changes/ require a governance-exception, given CHANGE-001 and CHANGE-002 already exist in the current shape?"
  - "Is the published bundle contract affected, which would escalate governance_profile from default to strict?"
```

## Artifact Chính
```yaml
raw_request: "Tôi có bộ workflow và skill quy trình phát triển sản phẩm, sử dụng khái niệm, quy tắc spec driven development và test driven development, có role: po, ba, techlead, sa, ta, dev, qc. Có skill obsidian để formatter doc. Nhưng trong quá trình làm brainstorming và plan, tài liệu khiến tôi chưa hài lòng, quá nhiều file và chồng chéo, khó kiểm soát."
restated_request: "Give the artifact model a reference mechanism so that a skill contributing to a step note can point at a sibling block instead of restating it, and declare one authoritative home per content layer so a round cannot leave files in places no rule accounts for. Brainstorming and planning are the phases to fix first."
request_type: CHANGE
user_problem_initial: "During brainstorming and planning the user cannot control what the notes contain. Seven roles and their skills each contribute a self-contained schema to the same note, so the same paths, task ids, acceptance ids and gate owners appear several times in one file and diverge as the work is refined. Across rounds, files also land in destinations that have no placement rule. The cost is not disk space, it is that no statement can be trusted as the current one."
business_context_initial: "Code-Factory is published as workflow-bundle v2.3.2 for others to adopt. A workflow product whose own repository demonstrates artifact sprawl cannot credibly sell artifact governance to its users."

measured_evidence:
  census_date: "2026-08-16"
  governed_zone:
    root: "work-items/"
    files_per_work_item_agentic: "8 notes + 1 report JSON, fixed"
    files_per_work_item_multi_role: "12 in the one multi-role sample, and unbounded in real use - see F12"
    controls: "wfc scaffold fixes filenames; wfc validate checks structure; no skill owns a filename"
    verdict: "Stable for single-role agentic runs. NOT stable once several roles participate, which is the user's actual usage."
    measurement_correction: "An earlier reading of this census concluded the governed zone was fully stable. That conclusion was drawn from fourteen work items all running execution_mode=agentic with one role. It does not hold for multi-role runs and is corrected by F12."
  ungoverned_zone_findings:
    - id: "F1"
      finding: "One in-flight round produced 27 new files spread across 4 roots"
      detail: "work-items/ 9, changes/CHANGE-002/ 7, .claude/skills/architecture-modeling/ 6, docs/release/ 1, repository root 4"
    - id: "F2"
      finding: "Two directories with near-identical names coexist"
      detail: "docs/release/ holds 5 positioning and readme files; docs/releases/ holds 8 release notes"
      interpretation: "Evidence that each round guesses a destination rather than following a rule"
    - id: "F3"
      finding: "Same-topic reports accumulate instead of superseding"
      detail: "docs/skill-pack-audit-report.md, .vi.md, -2026-07-23-post-fix.md, and docs/skill-pack-review-2026-07-23.md"
    - id: "F4"
      finding: "21 loose .md files sit directly in docs/ with no subdirectory"
    - id: "F5"
      finding: "The plan layer has two homes"
      detail: "docs/plans/sdd-light-code-factory-plan-review.md alongside work-items/sdd-light-code-factory/*.s06.task-breakdown.md"
    - id: "F6"
      finding: "changes/ duplicates three layers that work-items/ already owns"
      detail: "CHANGE-002/design.md vs s05.technical-approach.md; CHANGE-002/tasks.md vs s06.task-breakdown.md; CHANGE-002/execution/task-status.md vs s07.implementation.md"
    - id: "F7"
      finding: "Six loose files at repository root, all untracked"
      detail: "AGENTS.md and CLAUDE.md are two identical 524-line copies of the same policy; Meeting.md, Booking.md, Daily.md, Untitled.base are personal notes under no governance"
    - id: "F8"
      finding: "Test scratch directories left in the repository root"
      detail: "tmp-codex-home/, tmp-wfc-init-check/"
  note_internal_context: "The user named brainstorming and planning as the dissatisfying phases. Those are s05 and s06, the two largest notes at 601 and 701 lines. The duplication there is inside a single note, not across files."
  note_internal_findings:
    - id: "F9"
      finding: "The s06 Main Artifact restates itself three times before reaching the task list"
      detail: "Within one 259-line YAML block: dev_lane.technical_sequence lists T0 to T8, then task_breakdown lists T0 to T8 again in full; dev_lane.path_map names the same six files that T1.paths_in_scope names; dev_lane.tdd_targets repeats what each task's verification_hint already states; ba_lane.acceptance_coverage duplicates the SDD Traceability block; ba_lane.human_review_points duplicates approval_gates and role_signoffs, which the frontmatter already repeats across all eight notes."
    - id: "F10"
      finding: "Each contributing skill supplies a self-contained schema, so shared context is restated once per skill"
      detail: "workflow-chain.md Required Blocks By Step composes s05 from step-goal-contract plus brainstorming plus system-design plus one of eight architecture schemas; s06 from step-goal-contract plus task-breakdown-planner plus governance-checklist plus spec-traceability-matrix; s08 requires fourteen blocks. No rule permits one skill's schema to reference another block instead of restating it."
    - id: "F11"
      finding: "Adding a role skill grows an existing note rather than adding a file"
      detail: "Commit 4f3e7ab added the sa and ta skills; s01 gained 287 lines as ## SA Architecture Drivers at 148 lines and ## TA Architecture Drivers at 139 lines. With seven roles this is growth proportional to steps times roles, realised as blocks inside notes instead of separate files."
  role_multiplication_findings:
    - id: "F12"
      finding: "The role artifact schema is singular but its filename has no slot for a role, so more than one role forces filenames the convention does not define"
      detail: "workflow-execution-definitions.js generates the fixed names <slug>.s06.worker-assignment.md and <slug>.s07.worker-handoff-report.md, while the schemas inside carry a single assignment_id and a single role. workflow-chain.md naming conventions list exactly those fixed names with no role or index segment. The sample multi-role work item contains exactly one assignment per file, confirming one artifact per role is the intended shape."
      consequence: "With seven roles a step cannot be represented without either violating the singular schema by cramming several assignments into one file, or inventing filenames outside the declared convention. The second is what happens in practice, which is why files multiply, why nothing links them, and why each invented file carries its own drifting copy of shared context."
      arithmetic: "One step with N roles yields one primary note plus N assignment artifacts plus N handoff artifacts. Files grow as steps times roles, which matches the user's report exactly."
    - id: "F13"
      finding: "Multi-role mode adds artifacts at the same step rather than replacing them"
      detail: "sample-execution-item holds two s05 files, two s06 files and three s07 files: technical-approach plus execution-policy, task-breakdown plus worker-assignment, implementation plus merge-report plus worker-handoff-report."
  root_cause_role_multiplication: "The execution runtime models a role's contribution as its own artifact, but the naming convention models a step as a single file. The two models contradict each other, and the contradiction is resolved ad hoc at authoring time, differently on each round."
  root_cause_placement: "Placement rules exist only inside work-items/. Every other destination a round can write to has no declared owner, no naming rule, and no supersede rule, so the agent picks a plausible path each time and the picks diverge across rounds."
  root_cause_duplication: "Every skill output schema is designed to be self-contained. When N skills contribute to one step note, context shared between them - paths, task ids, acceptance ids, gate owners - is written N times. Nothing in the model lets a schema reference a sibling block instead of restating it, so duplication is not a drafting mistake, it is what the template asks for."
  primary_driver: "root_cause_role_multiplication. The user reported that many roles produce many files that are hard to control, and F12 shows the model makes that unavoidable rather than accidental. Duplication inside notes (F9 to F11) is the second driver and shares a cause: shared context is copied because nothing lets an artifact reference it. Placement across roots (F1 to F8) is the third."
  driver_ranking:
    - "1. Role multiplication (F12, F13) - files grow as steps times roles because a role's contribution is modelled as its own artifact while the naming convention allows one file per step"
    - "2. Intra-note duplication (F9 to F11) - shared context is restated once per contributing skill because no schema may reference a sibling block"
    - "3. Placement (F1 to F8) - destinations outside work-items/ have no declared owner, naming rule or supersede rule"
  unifying_cause: "In all three, a piece of information has no single declared owner, so each contributor writes its own copy. The fix is the same shape in all three cases: name the owner, and give everyone else a way to point at it."

scope_narrowed_2026_08_16: "The user approved narrowing this work item to P1 only: author the skill and its rule set. The three priority groups below record the full problem space for traceability; P2 to P4 are carried as out-of-scope phases and belong to a follow-up work item. The authoritative in-scope list is spec_refs.card in_scope, not this block."
phase_plan:
  - id: P1
    scope: "Author the artifact-governance skill, the ownership table, the reference syntax, the placement contract and the worked example"
    touches: "skills/ only, docs-only, no runtime change"
    status: "this work item"
  - id: P2
    scope: "Make ## Role Outputs a required block, change workflow-execution-definitions.js, migrate the readers in validate-workflow-execution.js"
    touches: "packages/workflow-bundle"
    status: "deferred, separate work item"
    hard_constraint: "TDD required; the reader migration is the highest-risk step in the whole programme, see S01-R05"
  - id: P3
    scope: "Duplication check and layout check inside wfc validate"
    touches: "validator plus fixtures"
    status: "deferred, separate work item"
  - id: P4
    scope: "docs/ taxonomy, archive changes/ deltas into product-specs/, clean the repository root"
    touches: "migration across roots"
    status: "deferred, separate work item"
sequencing_constraint: "Registering the new skill into the bundle inventory must wait until stabilize-architecture-skill-bundle closes DoD, because that work item holds an in-flight assertion on the managed-skill count. P1 may author the skill content; it may not change the inventory."
problem_space_full:
  in:
    priority_1_role_multiplication:
      - "Resolve the F12 contradiction: decide whether a role's contribution is its own artifact or a section in the step's primary note, and make schema, naming convention and generator agree on that one answer"
      - "If contributions stay in the primary note, define the Role Outputs block so N roles add N sections and zero files, and define what a role section owns versus references"
      - "If contributions stay separate, define the filename slot for role and index, and register it in the naming convention so the validator covers it and the primary note links every one of them"
      - "State the threshold at which a role's contribution earns its own file, so the choice is a rule rather than an authoring-time judgement"
    priority_2_duplication:
      - "Define block ownership for step notes: for each field that more than one skill schema wants, name the single block that owns it"
      - "Define the reference mechanism a schema uses to point at a sibling block instead of restating it, expressed so both a human reader and the validator can follow it"
      - "Apply it to s05 and s06 first, the phases the user named, and remove the self-restating fields measured in F9"
      - "State the rule that a new role skill must declare which existing block it contributes to before it may request a new block, so F11 growth stops"
      - "Add a duplication check to wfc validate for the owned fields"
    priority_3_placement:
      - "Declare one authoritative home per content layer across work-items/, changes/, product-specs/, docs/, and repository root"
      - "Define end-of-round hygiene rules: supersede versus accumulate, scratch cleanup, personal-note placement"
      - "Add a repository-layout check so an unplaced file fails validation"
      - "Reconcile the docs/release and docs/releases collision"
    deliverable:
      - "Author the artifact-governance skill carrying both rule sets"
  out:
    - "Redesigning the 8-note work-item layout; the governed zone is already disciplined and is explicitly not the problem"
    - "Changing SDD Light note mapping or gate host contract"
    - "Reducing governance evidence, receipts, or gate coverage; deduplication must move a statement, never delete the only copy"
    - "Rewriting the individual role skills' analytical content; only their output schema shape is in scope"
    - "Migrating or deleting historical documents; discovery proposes the target layout only"
    - "Changing the obsidian-markdown skill, which formats content and does not decide what content exists"

constraints_initial:
  - "Brownfield: two CHANGE packages and sixteen work items already exist in the current shape and must remain readable"
  - "workflow-bundle v2.3.2 is published; any change to the validator contract affects downstream adopters"
  - "The repository is bilingual; .vi.md siblings are a deliberate convention, not duplication"
  - "Existing controls must be extended, not replaced; wfc validate is the enforcement point"

assumptions_initial:
  - id: "A1"
    assumption: "work-items/ is the execution source of truth. changes/ shrinks to proposal plus spec-delta only, dropping design.md, tasks.md, and execution/task-status.md because work-items/ already owns those layers."
    taken_because: "The user declined to answer the changes/ versus work-items/ question twice; F6 shows the overlap is real and measured."
    reject_if: "changes/ is meant to be readable standalone by someone who never opens work-items/."
  - id: "A2"
    assumption: "product-specs/ remains the spec source of truth; work-items/ references it by ID and does not restate requirement text."
    taken_because: "Matches the existing spec_refs frontmatter field and the SDD overlay already in the chain."
    reject_if: "Spec cards are intended to be snapshots frozen inside the work item."
  - id: "A3"
    assumption: "Enforcement is a validator rule, not skill guidance alone."
    taken_because: "docs/ drifted precisely because it had guidance-level conventions and no check; repeating that pattern would not change the outcome."
    reject_if: "The user wants a documentation-only deliverable with no change to packages/workflow-bundle."
  - id: "A4"
    assumption: "Personal notes such as Meeting.md, Booking.md, Daily.md and Untitled.base are out of workflow scope and belong in .gitignore or a declared scratch location, not in a governed root."
    taken_because: "They are untracked, in Vietnamese free form, and reference work unrelated to this repository."
    reject_if: "These are intended as project inputs that should be captured as work items."
  - id: "A5"
    assumption: "planning_track stays full rather than quick."
    taken_because: "Safe default. The change spans five roots plus the validator plus a migration of existing documents, which exceeds quick-track blast radius."
    reject_if: "The user wants only the skill authored now and the layout reconciliation deferred to a later work item."
  - id: "A6"
    assumption: "The fix is a management layer over documentation, not a change to how many skills or roles contribute."
    status: "CONFIRMED by the user in session on 2026-08-16: not fewer and not more skills, a skill that keeps documentation coherent end to end without producing many files carrying different information."
    taken_because: "The seven roles carry genuinely different lenses; the measured defects are repeated and scattered context, not excess analysis."
  - id: "A8"
    assumption: "For the F12 contradiction the default resolution is sections in the primary note, with a separate file only above a declared threshold."
    taken_because: "It is the smaller change, it makes N roles cost zero extra files, and workflow-chain.md already states the preference for tracing role contribution via a Role Outputs block before splitting a per-role artifact. Making that stated preference the enforced default is a smaller delta than designing a role-indexed filename scheme."
    reject_if: "Real multi-agent runs need per-role files because separate agents write concurrently and would conflict inside one note. This is a genuine possibility and s05 must test it rather than assume it away."
  - id: "A7"
    assumption: "Reference targets are intra-note block references first, cross-file wikilinks second."
    taken_because: "F9 duplication is inside a single note, so an intra-note mechanism fixes the measured defect without making any note less self-contained to read."
    reject_if: "The user wants the Obsidian graph to carry traceability across files, which would favour wikilinks even inside one note."

open_questions_initial:
  - id: "Q1"
    question: "Does the layout check apply to the adopting project's repository as well, or only to Code-Factory itself?"
    blocks: "s04 acceptance criteria and the shape of the validator rule"
  - id: "Q2"
    question: "Supersede policy for recurring reports: overwrite in place, or keep dated versions under a declared archive path?"
    blocks: "s04 acceptance criteria"
  - id: "Q3"
    question: "Is docs/ intended as public documentation for bundle adopters, internal working notes, or both? The current mix of quickstart guides and audit reports suggests both."
    blocks: "s05 taxonomy design"
  - id: "Q4"
    question: "Does shrinking changes/ require a governance-exception given CHANGE-001 and CHANGE-002 already exist?"
    blocks: "s05 approach"

dependencies_initial:
  - "work item stabilize-architecture-skill-bundle is ACTIVE at s07 and is writing into changes/CHANGE-002/ and work-items/; layout changes must not collide with it"
  - "packages/workflow-bundle validator and its test suite"
  - "project-context/governance-decision-model.md for the exception path in Q4"

risks_initial:
  - id: "S01-R01"
    description: "A layout rule strict enough to stop sprawl could also block legitimate one-off artifacts, pushing users to disable the check."
    severity: HIGH
    mitigation: "Design an explicit escape hatch with a declared reason rather than an all-or-nothing rule."
  - id: "S01-R02"
    description: "Shrinking changes/ could break the existing change validators and the two live CHANGE packages."
    severity: HIGH
    mitigation: "Treat migration as a separate task with its own verify path; keep the current shape readable."
  - id: "S01-R03"
    description: "This work item can itself become an example of the sprawl it is meant to fix."
    severity: MEDIUM
    mitigation: "Scaffold notes lazily one step at a time rather than creating all eight up front."
  - id: "S01-R04"
    description: "Fixing placement without a supersede rule leaves the accumulation problem in F3 unsolved."
    severity: MEDIUM
    mitigation: "Treat supersede policy as a first-class acceptance criterion, not a footnote."
  - id: "S01-R05"
    description: "Existing validator and gate-evidence checks may read the very fields that deduplication removes, so removing a restated field could turn a passing gate into a false failure or, worse, a silent pass."
    severity: HIGH
    mitigation: "Before removing any field, grep the validator and gate-evidence utilities for readers of it; migrate the reader to the owning block in the same change, with a test that fails first."
  - id: "S01-R06"
    description: "A reference mechanism can make each note cheaper to write but more expensive to read, trading the user's stated problem for a new one."
    severity: MEDIUM
    mitigation: "Set a read-cost acceptance criterion at s04 alongside the duplication criterion, so s05 cannot optimise one at the other's expense."

notes_for_step_2: "The business goal must separate three outcomes the user merged into one complaint: less duplicated content inside a note, one findable home per file, and control over what a round is allowed to produce. Duplication carries the value and is the phase the user named; placement is real but secondary. State the goal so that success is not measurable by line count alone, because cutting lines by deleting evidence would satisfy a naive metric while breaking governance."
```

## Work Item Materialization
```yaml
# Mirrors artifact-governance-model.work-item-report.json. The report was produced by the
# bundle's own buildBootstrapReport path, not hand-authored, because this work item was
# created with wfc scaffold-step rather than wfc materialize. See the finding recorded in
# tooling_gap_found below.
materialization_status: READY
decision_owner: coordinator
request_source: "legacy-scaffold"
raw_request_summary: "Author an artifact-governance skill that keeps documentation coherent across roles without producing many files carrying different information."
split_decision: single
dedup_result: no_conflict
delivery_context: brownfield
work_item_slug: "artifact-governance-model"
work_item_type: CHANGE
change_strategy: none
change_id: ""
decision_reason:
  - "No change package is opened. P1 is additive and docs-only, and a CHANGE package would add seven files to a work item whose purpose is to stop file proliferation."
existing_refs:
  - "work-items/stabilize-architecture-skill-bundle"
blockers: []
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
```

## Work Item Protocol
```yaml
protocol_status: DONE
approval_status: APPROVED
review_required: true
work_item_slug: "artifact-governance-model"
work_item_type: CHANGE
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/artifact-governance-model"
current_step: "s08"
granted_write_paths:
  - "skills/guardrails/artifact-governance"
  - "work-items/artifact-governance-model"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "coordinator"
protocol_owner: "ba"
reviewed_by: "ba"
reviewed_at: "2026-08-16T13:33:30.880Z"
handoff_target: "archive-lifecycle"
last_transition_action: "close"
last_transition_at: "2026-08-17T06:08:19.819Z"
required_actions:
  - "Archive the work item when all downstream lifecycle actions are complete."
blockers: []
review_notes:
  - "Human review approved."
refs:
  - "work-items/artifact-governance-model"
audit_events:
  - "REPORT_BOOTSTRAPPED"
  - "WORK_ITEM_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "VERIFICATION_CONFIRMED"
  - "DONE_CONFIRMED"
```

## Business Goal
```yaml
# sdd_mode=light hosts the s02 Business Goal content here rather than in a separate note.
user_problem: "Adding a role to the workflow adds files, not just a perspective. With seven roles a single step yields one primary note plus one assignment artifact and one handoff artifact per role, so documentation volume scales with the team rather than with the work. The user cannot tell which copy of a fact is current."
business_goal: "Make documentation volume a function of the work, not of how many roles and skills take part, so that the delivery chain can carry seven roles without the user losing the ability to follow what it produced."
user_value: "A reader opens a work item and finds each fact in exactly one place, and the number of places to look does not change when a new role or skill joins the chain."
success_outcome:
  - "A contributor's output has a declared destination before it is written, so no round invents a path"
  - "Every field wanted by more than one contributing schema has exactly one owner, and the others reference it"
  - "Applying the rules to the existing multi-role work item lowers its file count, and adding a hypothetical eighth role raises it by zero"
non_goals:
  - "Reducing the number of roles, skills or perspectives that contribute"
  - "Reducing governance evidence, receipts or gate coverage; deduplication moves a statement, it never deletes the only copy"
  - "Making notes shorter as an end in itself; line count is not the measure and cutting evidence would satisfy it dishonestly"
  - "Changing how content is formatted, which belongs to obsidian-markdown"
priority_reason: "The workflow bundle is published for others to adopt. A delivery chain that produces documentation the author cannot follow undermines the product claim, and the defect grows with every role and skill added."
metrics_candidate:
  - "sample-execution-item: 12 files before, fewer after, and unchanged when a hypothetical seventh role is added"
  - "All five duplications recorded in F9 are located by the ownership table, and no field in the table has two owners"
  - "Every terminal branch of the decision procedure returns an owning section or a registered filename; zero branches return an invented path"
  - "packages/workflow-bundle unmodified in P1 and the managed-skill inventory unchanged"
```

## Open Questions
```yaml
# sdd_mode=light hosts the s03 Open Questions content here rather than in a separate note.
resolved_in_session:
  - id: "A6"
    question: "Is the fix fewer contributing skills, or a management layer over what they produce?"
    answer: "A management layer. Confirmed by the user on 2026-08-16: not fewer and not more skills."
  - id: "A8"
    question: "Is a role's contribution its own file or a section in the primary note?"
    answer: "A section by default, separate file only above a declared threshold. Approved by the user on 2026-08-16. External evidence: BMAD-METHOD runs nine roles and produces no per-role file."
  - id: "SCOPE"
    question: "Author the skill first, or take the whole programme at once?"
    answer: "P1 only. Approved by the user on 2026-08-16."
blocking_s04: []
non_blocking_carried_to_card:
  - "ODC-001 does the placement contract bind adopter repositories as well as this one"
  - "ODC-002 supersede versus dated archive for recurring reports"
  - "ODC-003 is docs/ public documentation, internal notes, or both"
  - "ODC-004 do concurrent multi-agent writers need per-role files after all"
readiness_verdict: "READY for s04. No question blocks acceptance criteria. ODC-001 to ODC-003 shape P3 and P4, which are out of scope here. ODC-004 can reopen REQ-002 but is testable inside the P1 worked example rather than before it."
tooling_defects_found:
  # Recorded here rather than in ## Work Item Protocol, because that block is owned and
  # rewritten by the wfc CLI. An earlier draft put these findings there and wfc work-item
  # approve overwrote them. That incident is itself evidence for REQ-003: a block with an
  # owner must not be hand-written by anyone else.
  - id: "TD-01"
    summary: "A work item created with wfc scaffold or wfc scaffold-step can never be approved, because wfc work-item approve requires .work-item-report.json and only wfc materialize --auto-scaffold writes it."
    evidence:
      - "wfc work-item approve failed with 'Missing work item report' on a scaffold-step work item"
      - "buildBootstrapReport at work-item-protocol-utils.js:283 produces the correct shape but has no caller outside loadProtocolReport, which never persists"
      - "work-item-protocol.js:691 permits bootstrap only for action=status, so the report stays in memory"
      - "scaffold-workflow.js contains no reference to work-item-report"
    impact: "The manual authoring path that AGENTS.global.md recommends as the default produces a work item that cannot reach ACTIVE."
    workaround: "The report was generated by calling the bundle's own loadProtocolReport with allowBootstrap and persisting the result unchanged."
  - id: "TD-02"
    summary: "The documented approval order guarantees stale receipts. wfc.js lists seal gates then activate, but activate additionally requires status to be non-draft and spec_status to be approved or frozen, and editing those fields breaks the digest the receipts are hashed to."
    evidence:
      - "wfc.js flow lines 320 to 332 contain no step that advances status or spec_status"
      - "workflow-gate-evidence-utils.js:263 rejects status draft at protocol transition"
      - "workflow-gate-evidence-utils.js:281 requires spec_status in approved or frozen"
      - "workflow-gate-evidence-utils.js:310 fails with 'stale after artifact changed' on sha mismatch"
    observed: "All four gates sealed with digest_match=true, then activate failed on three conditions whose fix necessarily invalidates those four digests."
    correct_order: "fill gate_reviews, then set status and spec_status, then seal, then activate. The published flow omits the middle step."
    workaround: "Status advanced after sealing, costing one extra seal run. Unavoidable once the first seal has happened."
tooling_defects_disposition: "Neither TD-01 nor TD-02 is fixed here. Both modify packages/workflow-bundle, which is out of P1 scope and overlaps the active work item. Together they justify a follow-up work item for an end-to-end approval walkthrough."
external_research_used:
  - "BMAD-METHOD: nine roles, zero per-role files, sharding on the story axis"
  - "AWS Kiro: requirements.md, design.md, tasks.md"
  - "GitHub Spec Kit: Specify, Plan, Tasks, Implement"
  - "OpenSpec: specs/ as truth, changes/ as delta, propose-apply-archive lifecycle"
  - "No dedicated artifact-governance skill found in the ecosystem; comparable tools bake the constraint into scaffolding instead, which is why an extensible artifact set like this one needs an explicit rule"
```

## Traceability
```yaml
source_inputs:
  - "User request, this session, stated three times"
  - "Repository census 2026-08-16 across work-items/, changes/, product-specs/, docs/, repository root"
  - "packages/workflow-bundle/scripts/workflow-step-definitions.js"
next_step: "s04 Acceptance + DoR"
sdd_light_note: "There is no s02 or s03 physical note. Their content is hosted above under ## Business Goal and ## Open Questions per the Light note mapping. There is likewise no s05 note; Approach is hosted in s06."
spec_card: "product-specs/cards/artifact-governance-model.md"
```

## Handoff
- Established: three drivers, ranked. Role multiplication (F12, F13) is primary, intra-note duplication (F9 to F11) second, placement (F1 to F8) third.
- Established: file count is not fixed. It is stable only for single-role agentic runs. With N roles a step yields one primary note plus N assignment artifacts plus N handoff artifacts, so files grow as steps times roles. An earlier reading of this census said otherwise and is corrected in `measurement_correction`.
- Established: the cause of F12 is a contradiction inside the model itself. `workflow-execution-definitions.js` emits one fixed filename per step while the schema it fills carries a single role, so representing several roles requires filenames the convention never defined.
- Established: all three drivers share one cause. A piece of information has no single declared owner, so every contributor writes its own copy.
- Established by user confirmation: A6 is CONFIRMED. The deliverable is a management layer, not a change to the number of skills or roles.
- Resolved by the user on 2026-08-16: A6 confirmed, A8 approved, and scope narrowed to P1. The work item switched to `sdd_mode=light` and `planning_track=quick` on the same decision, so it runs on five physical notes rather than eight and demonstrates the discipline it is written to establish.
- Still open and carried into the Spec Card as ODC-001 to ODC-004; none of them blocks `s04`.
- Condition to move to `s04`: none outstanding. `s04` is authored and awaiting the Spec and DoR receipts.
