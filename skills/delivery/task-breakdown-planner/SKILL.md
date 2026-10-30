---
language: en
name: task-breakdown-planner
description: Turn a technical approach into an execution-oriented plan in the spirit of Superpowers writing-plans, with a clear BA lane and DEV lane. Use it when a technical direction has been chosen and a plan specific enough to execute safely is needed, with ownership, main touch paths, a verify path and no placeholders.
---

# Task Breakdown Planner

> Vietnamese: SKILL.vi.md

Turn the locked technical approach into a task plan that can be executed immediately without forcing the implementer to reinvent the design while coding.

<HARD-GATE>
Do not use this skill to legitimize jumping straight to implement when `s05 Technical Approach` is not clear enough.

A plan draft is not the same as `Task Plan pass`; the plan still must go through human review or gate review per the workflow.
</HARD-GATE>

## When To Use

- After a `recommended_design` or technical approach is clear enough.
- Before entering `implementation`.
- When the change is large enough to need splitting tasks, dependencies, review checkpoints and a verify path.

## Out Of Scope

- Does not redesign the architecture.
- Does not directly edit production code.
- Does not replace final testing.
- Does not create placeholder plans like "do the rest".

## Minimum Input

- `recommended_design`
- `acceptance_criteria`
- `constraints`
- `repo_context`
- `delivery_context`

If the main paths, modules or boundaries to touch are not yet known, reflect that back instead of planning vaguely.

## BA Lane And DEV Lane

### BA lane

Focus on:

- tracing tasks back to acceptance criteria and business rules
- scope guards, non-goals, business dependencies
- the human review points needed before continuing
- situations needing business clarification or contract clarification

### DEV lane

Focus on:

- files or modules to touch
- owned scope and dependency order
- verify path for each task or batch
- TDD targets for behavior changes
- technical or governance review checkpoints

## Required Output

Emit a YAML artifact per the following schema:

```yaml
implementation_goal: ""
ba_lane:
  acceptance_coverage: []
  scope_guards: []
  human_review_points: []
dev_lane:
  path_map: []
  technical_sequence: []
  tdd_targets: []
task_breakdown:
  - id: T1
    owner_role: developer
    name: ""
    objective: ""
    paths_in_scope: []
    dependencies: []
    outputs_expected: []
    review_checkpoint: ""
    verification_hint: ""
dependencies_global: []
risk_notes: []
verification_plan: []
notes_for_implementation: ""
```

## Normalize Output In Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:

- Use the step 6 template at `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Main Artifact` block.
- Keep field names in the schema verbatim; do not rename fields when writing into the note.
- `verification_plan` and rollout notes can be summarized further in a prose section, but do not replace the YAML block.

## Mandatory Process

1. Re-read the technical approach, acceptance criteria and constraints.
2. Build the `path_map` before splitting tasks.
3. Use the `BA lane` to check acceptance criteria coverage and scope guards.
4. Use the `DEV lane` to determine owned scope, dependency chain, TDD targets and verify path.
5. Split tasks small enough to review and verify separately.
6. For behavior changes, record which task or batch must follow `test fail -> code -> test pass`.
7. Attach a `review_checkpoint` to risky tasks, contract-touching tasks, or governance/release-touching tasks.
8. Scan the plan again to remove every placeholder.
9. Hand off to `implementation`.

## Quality Rules

- Do not accept placeholders like `handle edge case`, `add validation`, `write test`, `fix the related part` without stating what is touched and how it is checked.
- Each task must have an `objective`, `paths_in_scope`, `outputs_expected` and `verification_hint`.
- The `BA lane` must ensure acceptance criteria are not lost while splitting tasks.
- The `DEV lane` must ensure the implementer does not have to guess paths or dependencies again.
- Default to communicating and documenting in English.
- Text files must be stored as UTF-8.

## Decision Rules

- If a task is too large to verify separately, split it further.
- If a dependency blocks all implementation, push it earlier.
- If a part is only nice-to-have, move it out of the main plan.
- If scope touches release, deploy, migration or rollback, split the corresponding checkpoint instead of hiding it inside a shared task.
- This repo does not require stuffing full code blocks into the plan like Superpowers; here, prefer a plan that is executable enough, with clear ownership and verify path.

## Completion Conditions

- `BA lane` and `DEV lane` are enough for an unambiguous handoff.
- `task_breakdown` is clear enough for implementation to start safely.
- `verification_plan` and `risk_notes` exist.
- `notes_for_implementation` is enough that the implement step does not have to re-infer the design.

## Opt-in Task Contract v1

Legacy YAML remains the default. To opt an s06 note (including Light) into v1,
set the integer `task_contract_version: 1` in frontmatter; a quoted string or any
other explicit value is invalid. Replace its task and trace payloads together:
`## Main Artifact` owns one JSON object and `## Traceability` owns one JSON object.
Do not keep an authoritative YAML duplicate. Other step blocks and gates remain.

Keep every task's existing fields; add `kind` (`behavior`, `documentation`, or
`verification`) and `verification` with `cwd`, `argv`, and `test_refs`. Declare
explicit repository-relative files, including planned files, without directory,
glob, traversal or symlink-escape grants. Dependencies must resolve within the
plan, be unique, exclude self and form an acyclic graph.

Every behavior task names at least one test file in its own `paths_in_scope`.
For other kinds, explain an empty test list in `verification_hint`. Use concrete
outputs, objectives and review checkpoints. `argv` is a token array, never a shell
command string; shell `-c` equivalents and standalone control operators are invalid.
The validator never executes these tokens or grants permission to run them.

Declare changed AC IDs in `acceptance_refs`; resolve them exactly in the existing
`spec_refs.card` or `spec_refs.srs`. Each has one mapping to nonempty valid task IDs.
The human reviewer still checks whether the changed-AC set and task classification
are complete and whether the proposed tests actually establish the behavior.

The following paired payloads illustrate one owner each; the referenced AC must
exist in the project's owning specification. They are not additional artifacts.

Main Artifact payload:
```json
{
  "implementation_goal": "Preserve the first accepted event for duplicate IDs",
  "task_breakdown": [
    {
      "id": "T1",
      "owner_role": "developer",
      "name": "Reject duplicate events",
      "objective": "Preserve the first accepted event",
      "kind": "behavior",
      "paths_in_scope": [
        "src/events.js",
        "test/events.test.js"
      ],
      "dependencies": [],
      "outputs_expected": [
        "Duplicate event regression passes"
      ],
      "review_checkpoint": "Review AC-001 then code quality",
      "verification_hint": "Run the duplicate-event regression",
      "verification": {
        "cwd": ".",
        "argv": [
          "node",
          "test/events.test.js"
        ],
        "test_refs": [
          "test/events.test.js"
        ]
      }
    }
  ]
}
```

Traceability payload:
```json
{
  "acceptance_refs": [
    "AC-001"
  ],
  "task_refs": [
    {
      "acceptance_ref": "AC-001",
      "task_ids": [
        "T1"
      ]
    }
  ]
}
```

Run `wfc plan --workflow-root work-items --project-root .` and the applicable SDD
and governance checks with the same project root. Older readers cannot consume v1;
retain the legacy authoring path for rollback and never silently downgrade a signed
v1 note. Malformed JSON, duplicate decoded keys/owners and wrong field types fail.
