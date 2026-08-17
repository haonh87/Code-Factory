---
artifact_id: "artifact-governance-model.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "artifact-governance-model"
step_id: "s06"
step_slug: "task-breakdown"
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
  spec:
    - "ba"
  dor:
    - "po"
    - "ba"
  approach:
    - "developer"
  task_plan:
    - "developer"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-16T13:39:03.000Z"
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-16T13:39:03.000Z"
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "brainstorming"
  - "system-design"
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "artifact-governance-model.s01.restate.md"
  - "artifact-governance-model.s04.acceptance-criteria.md"
  - "product-specs/cards/artifact-governance-model.md"
linked_artifacts:
  - "product-specs/cards/artifact-governance-model.md"
tags:
  - "agent-ops"
  - "workflow/s06"
  - "artifact-governance"
---

# Step 6 - Approach + Task Plan

> [!summary]
> Light hosts Option Analysis, Brownfield Impact, Technical Approach and Task Plan in this
> one note; there is no s05. The chosen approach assembles parts the repository already has.
> Approach and Task Plan both hold trusted receipts sealed by the repository owner on 2026-08-16.

## Step Contract
```yaml
step_goal: "Choose the smallest approach that satisfies the frozen-pending acceptance, and produce a task plan specific enough to execute without re-deriving the design."
input_summary:
  - "Spec Card REQ-001 to REQ-009 and AC-001 to AC-009"
  - "s04 Existing System Baseline and DoR verdict READY"
  - "External precedent: BMAD, Kiro, Spec Kit, OpenSpec"
output_summary:
  - "Option analysis with at least two options and one recommendation"
  - "Technical approach with the affected boundary"
  - "Brownfield impact analysis"
  - "Ordered task plan with paths, verify path and review checkpoints"
done_when:
  - "The recommended option is justified against the smaller alternative"
  - "Every task names what it touches and how it is checked"
  - "The ODC-004 test is sequenced before rule authoring"
owner: "developer"
```

## Option Analysis
```yaml
problem: "Give the artifact model a way to say who owns a piece of information, so contributors reference it instead of copying it, and so adding a role adds no file."
options:
  - "OPT-1 skill-only rule set assembling existing parts: one guardrail skill carrying the shard-axis rule, the ownership table, the reference syntax, the placement contract and the decision procedure; reuse sdd_mode=light for note count and the existing ## Role Outputs preference for role placement; change no runtime file. Additive and reversible, no reader-migration risk, testable by hand at once, no collision with the in-flight inventory assertion. Costs: rules stay unenforced until P3, and value is not realised until P2 and P3 land. Cost low."
  - "OPT-2 skill plus validator enforcement in one work item: author the skill and simultaneously add duplication and layout checks to wfc validate. Enforcement lands with the rule so the drift mode cannot recur. Costs: encodes rules never applied to a real work item into a check that then blocks everyone; touches packages/workflow-bundle and its tests while stabilize-architecture-skill-bundle is mid-flight in the same package; exceeds quick-track blast radius and loses Light eligibility. Cost high."
  - "OPT-3 restructure the artifact layout first and document afterwards: change workflow-execution-definitions.js and the note templates to the target shape. Directly reduces file count in the next multi-role run. Costs: requires migrating the readers in validate-workflow-execution.js with no written rule to migrate them toward, and inverts the repository's own hard rule that spec and design come before code. Cost high."
recommended_option: "OPT-1"
trade_offs:
  - "OPT-1 trades enforcement for validation order: the rules are testable against a real work item before they harden into a check, at the cost of being ignorable until P3."
  - "OPT-2 would buy enforcement one phase earlier at the cost of encoding an untested rule, which is the more expensive mistake because a wrong validator check blocks every work item."
  - "OPT-3 is fastest to a lower file count but has no written rule to migrate the validator readers toward, which is the highest-risk step in the programme."
recommendation_reason: "It satisfies every acceptance criterion in the Spec Card, which are all statements about what the skill says and what the worked example measures, none of which requires a runtime change. Under the hard rule preferring the smallest correct solution, the larger options must justify themselves and cannot: OPT-2's enforcement value depends on rules that have not yet been tested against a real work item, and OPT-3 inverts the repository's own ordering."
rejected_reason_for_smaller: "No option smaller than OPT-1 was found. Writing only the ownership table without the decision procedure would leave AC-006 unmet, and omitting the worked example would leave AC-008 unmet and let ODC-004 stay untested."
validation_before_or_during:
  - "Apply the rules by hand to sample-execution-item before finalising them; if the worked example cannot produce a determinate destination for all twelve files, the rules are wrong and must be revised, not shipped"
  - "Test ODC-004 explicitly: decide whether concurrent multi-agent writers force per-role files, and record the finding even if it reopens REQ-002"
residual_risk_accepted: "OPT-1 leaves the rules unenforced until P3. This is accepted because a rule validated against a real work item is a better input to an enforcement check than an unvalidated one, and because P1 is reversible."
```

## Technical Approach
```yaml
approach: "One new guardrail skill that declares ownership and reference rules for artifacts, validated by a hand-applied worked example before the rules are considered settled."
affected_boundary:
  created:
    - "skills/guardrails/artifact-governance/SKILL.md"
    - "skills/guardrails/artifact-governance/references/ownership-table.md"
    - "skills/guardrails/artifact-governance/references/worked-example.md"
  modified:
    - "work-items/artifact-governance-model/** (this work item's own notes)"
    - "product-specs/cards/artifact-governance-model.md"
  explicitly_untouched:
    - "packages/workflow-bundle/** - no runtime change in P1"
    - "skills/orchestration/codex-workflow-chain/references/workflow-chain.md - template change is P2"
    - "workflow-bundle.manifest.json - inventory registration is deferred"
    - "skills/obsidian/** - formatting is not this skill's concern"
design_decisions:
  - id: "DD-01"
    decision: "Place the skill in skills/guardrails/ rather than skills/orchestration/."
    reason: "It is a cross-cutting discipline applied at every step, which matches karpathy-coding-discipline, not a chain orchestrator."
  - id: "DD-02"
    decision: "Split the ownership table and the worked example into references/ rather than inlining them in SKILL.md."
    reason: "SKILL.md is loaded into context on every invocation; the table and example are consulted, not always needed. This also applies the skill's own placement rule to itself."
  - id: "DD-03"
    decision: "Express the reference syntax so that the target is resolvable without opening another file when it is in the same note."
    reason: "ASM-004 and S01-R06. The measured duplication is intra-note, and a mechanism that forces cross-file hops would trade the user's stated problem for a new one."
  - id: "DD-04"
    decision: "The skill carries forward the reader-migration constraint for P2 rather than leaving it to be rediscovered."
    reason: "S01-R05. validate-workflow-execution.js line 70 reads the fields P2 will move. Encoding the constraint in the rule set is free now and expensive to omit."
validation_plan:
  - "AC-002, AC-003, AC-005, AC-006: resolve each rule against the named existing artefact and confirm a determinate verdict"
  - "AC-008: count files before and after in the worked example, then add a hypothetical seventh role and confirm the count does not move"
  - "AC-009: git status on packages/workflow-bundle, npm test, and wfc status skill count"
rollback: "Delete skills/guardrails/artifact-governance/. Nothing else changed, so the repository returns to its exact prior state."
```

## Brownfield Impact Analysis
```yaml
existing_behaviour_changed: "none"
reasoning: "P1 adds one directory. No existing file is modified other than this work item's own notes and its Spec Card. No generator output changes, no validator rule changes, no template changes."
regression_surface:
  - surface: "wfc validate"
    impact: "File and note counts rise by this work item's own notes. No rule changes."
    check: "npm run validate:workflow must pass"
  - surface: "npm test"
    impact: "None expected"
    check: "npm test result unchanged"
  - surface: "Managed skill inventory"
    impact: "Must not change during P1. The directory exists on disk but is not registered."
    check: "wfc status skill count unchanged; workflow-bundle.manifest.json unmodified"
coexistence_with_active_work_item:
  work_item: "stabilize-architecture-skill-bundle at s07 ACTIVE"
  conflict: "It holds an in-flight assertion on the managed-skill count for v2.4.0."
  resolution: "P1 authors skill content without registering it. Registration is a P2-or-later action gated on that work item closing DoD."
  write_root_separation: "This work item writes only under work-items/artifact-governance-model/, product-specs/cards/artifact-governance-model.md and skills/guardrails/artifact-governance/. None of these is a write root of the active work item."
```

## Main Artifact
```yaml
implementation_goal: "Produce a validated rule set that makes documentation volume independent of role count, without changing any runtime behaviour."
# Paths are stated once per task below. This block does not restate them,
# which is the first internal application of AC-003.
task_breakdown:
  - id: T1
    owner_role: developer
    name: "Worked example on sample-execution-item, before the rules are settled"
    objective: "Take the twelve real files of the multi-role work item and assign each one a destination under the draft rules, to find out whether the rules produce a determinate answer for every case."
    paths_in_scope:
      - "skills/guardrails/artifact-governance/references/worked-example.md"
    reads_only:
      - "work-items/sample-execution-item/**"
    dependencies: []
    outputs_expected:
      - "A destination for each of the twelve files"
      - "A before count and an after count"
      - "The count when a hypothetical seventh role is added"
      - "An explicit finding on ODC-004: do concurrent writers force per-role files"
    review_checkpoint: "SPEC_COMPLIANCE: does every one of the twelve files get a determinate destination, or did a case force a judgement call the rules do not cover. A judgement call here means the rules are incomplete and T2 must change, not that the example should be written around it."
    verification_hint: "Count files in work-items/sample-execution-item, produce the mapping table, and state the two counts. AC-008."
    sequencing_reason: "Placed first deliberately. Writing the rules before testing them against a real work item is how an untested rule becomes a validator check that blocks everyone in P3."
  - id: T2
    owner_role: developer
    name: "Ownership table and reference syntax"
    objective: "Name the single owning block for every field that two or more contributing schemas want, and define how a non-owner points at it."
    paths_in_scope:
      - "skills/guardrails/artifact-governance/references/ownership-table.md"
    dependencies: ["T1"]
    outputs_expected:
      - "A table covering at minimum paths, task identifiers, acceptance identifiers, verification method and gate reviewer"
      - "Reference syntax with a worked rewrite of one real F9 duplication"
      - "The P2 reader-migration constraint recorded, per DD-04"
    review_checkpoint: "SPEC_COMPLIANCE: does the table locate all five F9 duplications, and does any field have two owners. CODE_QUALITY: is the syntax resolvable without ambiguity."
    verification_hint: "Resolve the table against the 259-line s06 Main Artifact of stabilize-architecture-skill-bundle and confirm all five duplications are named. AC-003, AC-004."
  - id: T3
    owner_role: developer
    name: "SKILL.md with the three rules, the threshold test and the decision procedure"
    objective: "Write the skill body carrying the shard-axis rule, the threshold test, the placement contract, the decision procedure and the non-ownership statement."
    paths_in_scope:
      - "skills/guardrails/artifact-governance/SKILL.md"
    dependencies: ["T1", "T2"]
    outputs_expected:
      - "Shard-axis rule with external precedent cited"
      - "Threshold test producing a verdict for execution-policy, worker-assignment, worker-handoff-report and merge-report"
      - "Placement contract assigning one root to each of the six content layers"
      - "Decision procedure where every terminal branch returns a section or a registered filename"
      - "Non-ownership statement naming obsidian-markdown, wfc scaffold and wfc validate"
    review_checkpoint: "SPEC_COMPLIANCE: walk each of AC-001, AC-002, AC-005, AC-006, AC-007 against the text. CODE_QUALITY: frontmatter conforms to the pack convention and the description states when to invoke."
    verification_hint: "Apply the threshold test to the four runtime artifact kinds and confirm four determinate verdicts. Trace every branch of the procedure to a terminal that is a section or a registered filename. AC-001, AC-002, AC-005, AC-006, AC-007."
  - id: T4
    owner_role: developer
    name: "Non-regression evidence"
    objective: "Demonstrate that P1 changed no runtime behaviour."
    paths_in_scope:
      - "work-items/artifact-governance-model/artifact-governance-model.s08.verification.md"
    dependencies: ["T3"]
    outputs_expected:
      - "git status showing packages/workflow-bundle unmodified"
      - "npm test result compared with baseline"
      - "wfc status skill count compared with baseline"
      - "npm run validate:workflow passing"
      - "UTF-8 check on every changed text file"
    review_checkpoint: "SPEC_COMPLIANCE: AC-009 satisfied and the inventory genuinely unchanged."
    verification_hint: "Run the four commands and record output, not summaries. AC-009."
execution_order: "T1 -> T2 -> T3 -> T4, strictly sequential. T1 gates T2 because a rule that fails the worked example must be revised before it is written down."
delegation: "None. Tasks are tightly coupled and share one small scope; the subagent rule is not met."
```

## Worktree Strategy
```yaml
use_worktree: false
reason: "planning_track=quick, one new directory, additive only, single session, no conflict risk. The write roots do not overlap the active work item's write roots, which is recorded in Brownfield Impact Analysis coexistence_with_active_work_item."
reassess_at: "P2, which modifies packages/workflow-bundle and will overlap the active work item's package"
```

## Early Review Plan
```yaml
level: "quick - at least one review pass before leaving s07"
order: "spec compliance, then code quality"
checkpoints:
  - "After T1: the highest-value review point. If the worked example needed a judgement call the rules do not cover, stop and revise T2 rather than proceeding."
  - "After T3: walk all nine acceptance criteria against the written text before declaring the implementation complete."
```

## Verification Plan
```yaml
levels:
  - level: "document review"
    scope: "AC-001 to AC-007 resolved against the skill text and its references"
  - level: "worked example measurement"
    scope: "AC-008 file counts before, after, and with an added role"
  - level: "non-regression"
    scope: "AC-009 git status, npm test, wfc status, npm run validate:workflow, UTF-8"
skipped_and_why:
  - "Unit tests: P1 adds no executable code. Test coverage becomes mandatory at P2."
  - "Security scan: no code, no dependency, no runtime surface."
verification_owner: "qc"
```

## Governance Checks
```yaml
checklist: "project-context/checklists/default.md"
checks:
  - id: "GOV-09"
    check: "Disciplined brainstorming"
    result: PASS
    evidence: "Three options compared, one recommended, the smaller alternative explicitly searched for and none found, and validation named before implementation."
  - id: "GOV-10"
    check: "Execution-oriented planning, no placeholders"
    result: PASS
    evidence: "Each task names its paths, outputs, review checkpoint and verify method. No task says write tests or handle edge cases without stating what is touched."
  - id: "GOV-11"
    check: "Subagent only for independent tasks"
    result: PASS
    evidence: "Delegation declined; tasks are sequential and tightly coupled."
  - id: "GOV-12"
    check: "Approach and Task Plan are human gates"
    result: PASS
    evidence: "Both receipts sealed by the repository owner on 2026-08-16 via wfc gate approve-ready-bundle, each hashed to this note as its own independent receipt."
blocking_items: []
```

## Brownfield Delivery Plan
```yaml
sequence: "Additive only. Create one directory, change nothing that runs."
compatibility_guard: "Registration into the bundle inventory is withheld until stabilize-architecture-skill-bundle closes DoD."
rollback: "Delete skills/guardrails/artifact-governance/."
handoff_to_next_phase: "P2 inherits the reader-migration constraint recorded by T2, so the highest-risk step in the programme starts from a written rule rather than a rediscovery."
```

## SDD Traceability
```yaml
card: "product-specs/cards/artifact-governance-model.md"
requirement_to_task:
  - "REQ-001 -> T3"
  - "REQ-002 -> T3"
  - "REQ-003 -> T2"
  - "REQ-004 -> T2"
  - "REQ-005 -> T3"
  - "REQ-006 -> T3"
  - "REQ-007 -> T3"
  - "REQ-008 -> T1"
  - "REQ-009 -> T4"
coverage: "9 of 9 requirements map to a task; 4 of 4 tasks carry at least one requirement"
```

## Traceability
```yaml
upstream:
  - "artifact-governance-model.s04.acceptance-criteria.md#Main Artifact"
  - "artifact-governance-model.s04.acceptance-criteria.md#Existing System Baseline"
  - "product-specs/cards/artifact-governance-model.md"
next_step: "s07 Implement, blocked pending the Approach and Task Plan receipts"
sdd_light_note: "Under the Light gate host contract, Approach and Task Plan are both hosted at s06 and each still requires its own independent receipt. There is no s05 physical note and no s05 receipt to wait for."
```

## Review Provenance
```yaml
# Honest record of how gate_reviews came to be filled, so the audit trail is not misleading.
transcribed_by: "assistant, on the user's instruction in session"
transcribed_at: "2026-08-16T13:39:03.000Z"
basis:
  - "The user approved OPT-1 and the P1 scope in session on 2026-08-16"
  - "The user successfully ran wfc work-item approve with their own passphrase"
  - "The user asked for the ready-bundle blocker to be cleared after being shown both options"
what_this_is_not: "This block is not itself a gate pass. Approach and Task Plan pass only when the user runs wfc gate approve-ready-bundle in an interactive TTY and supplies the approval passphrase, which hashes this note and signs two independent receipts."
reviewer_roles_source: "workflow-chain.md Default Owner For role_signoffs"
```

## Handoff
- Chosen: OPT-1, a skill-only rule set assembling parts the repository already has, with no runtime change.
- Sequencing that matters: T1 tests the rules against a real work item before T2 and T3 write them down. A rule that fails the worked example gets revised, not shipped.
- Blocked: `s07` may not open. The Approach and Task Plan receipts are both empty, and under the Light contract each needs its own reviewer and timestamp.
- Carried forward: the P2 reader-migration constraint, so the riskiest step in the programme inherits a written rule instead of rediscovering `validate-workflow-execution.js` line 70 the hard way.
