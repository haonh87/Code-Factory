---
language: en
name: testing
description: Verify software changes against acceptance criteria and quality gates in a risk-ranked, evidence-first way, inheriting the verify discipline of Superpowers such as negative-case coverage, regression targeting, manual exploration and release-blocker clarity. Use it when you need to design or run a test strategy across levels such as unit test, integration test, database test and feature test; compare criteria against actual output, record pass or fail evidence, and lock residual risks for the final review or handoff.
---

# Testing

> Vietnamese: SKILL.vi.md

Verify actual changes against the locked criteria before handoff, with a clear boundary between unit test, integration/database test and feature test.

<HARD-GATE>
Do not conclude `PASS` without mapping evidence to acceptance criteria, without surfacing `release_blockers`, or while there are large gaps in `negative_cases` and `regression_targets` for the behavior just changed.

Do not use a "test command pass" output as the only evidence for a high-risk change.
</HARD-GATE>

## Goal

- Prove the actual change meets acceptance criteria and quality gates.
- Rank risks to know which tests are mandatory and which are supporting.
- Choose the right test level for the right kind of change instead of dumping everything into one test type.
- Prefer unit tests for pure business logic, fast and not database-dependent.
- Require `negative_cases`, `regression_targets` and `manual_exploration` when automation is not enough to prove it.
- Surface gaps, residual risks and next actions when evidence is not enough.

## When To Use

- After implementation has completed a change scope large enough to verify.
- When deciding whether to write or run unit test, integration test, database test or feature test.
- When evidence must be consolidated before the final review or handoff.
- When the change touches domain logic, persistence, transactions, queries, relations or acceptance criteria.
- When scope has deploy, use this skill for application behavior tests and `deployment-devops` for packaging or rollout readiness review.
- When scope touches screens, forms, navigation, responsive layout, accessibility or motion, combine with `frontend-quality-review` to review screen-level quality.
- When the stack is React or Next.js and the change touches hooks, context, server/client split, data fetching or render path, combine with `react-best-practices-review`.

## Out Of Scope

- Does not redefine acceptance criteria.
- Does not change the business goal or technical approach.
- Does not hide skipped checks; every skipped check must be stated.
- Does not use unit tests to replace verification for behavior that depends on real persistence.
- Does not replace deployment readiness review; if scope touches packaging or rollout, combine with `deployment-devops`.
- Does not replace frontend review at the level of accessibility, responsive layout, interaction feedback or visual consistency; use `frontend-quality-review` when scope touches the UI surface.
- Does not replace React-specific review at the level of render boundary, effect hygiene or client/server split; use `react-best-practices-review` when scope touches React web or Next.js.

## Test Layering Principle

- `unit_test`:
  - Used to cover the smallest business logic that can be tested independently.
  - Prefer tests on domain objects, pure-logic services, policies, validators, calculators.
  - Does not require creating a database, migration or seeding data.
  - Test data only needs objects, value objects, fake input or mock/fake dependencies.
- `integration_test`:
  - Used when logic depends on a repository, database access, query, transaction, relation or external adapter.
  - Can use a database test double or a real database depending on stack capability.
  - Used to prove persistence behavior is correct.
- `database_test`:
  - Used when a change touches schema, migration, foreign key, unique constraint, index, query plan or transaction boundary.
  - Does not replace `database-change-review`, but provides evidence for that review step.
- `feature_test`:
  - Used when an end-to-end flow or acceptance criteria must be proven at system behavior level.
  - Usually touches HTTP/API/command bus/app service or the whole use case.

## Minimum Input

- `acceptance_criteria`
- `outputs_actual`
- `available_test_commands`
- `quality_gates`
- `change_characteristics`
- `constraints`
- `risk_focus`

`change_characteristics` must describe at least:
- whether there is a pure business logic change
- whether there is a database/query/relation/transaction change
- whether end-to-end behavior must be proven

`risk_focus` should state at least:
- which user or system path is most important
- which negative path can break if the patch is wrong
- which regression is most likely to recur after this change

If there are no acceptance criteria or the main quality gates cannot be determined, state that clearly before concluding.

## Required Output

Emit a YAML artifact per the following schema:

```yaml
verification_target: ""
risk_ranked_test_matrix:
  - risk: ""
    severity: HIGH|MEDIUM|LOW
    required_evidence: []
test_strategy:
  unit_test:
    required: true|false
    rationale: ""
  integration_test:
    required: true|false
    rationale: ""
  database_test:
    required: true|false
    rationale: ""
  feature_test:
    required: true|false
    rationale: ""
negative_cases: []
regression_targets: []
manual_exploration:
  flows_checked: []
  issues_found: []
criteria_results:
  - criterion: ""
    result: PASS|FAIL|PARTIAL
    evidence: ""
test_evidence:
  unit_test: []
  integration_test: []
  database_test: []
  feature_test: []
commands_run: []
skipped_checks: []
release_blockers: []
status: PASS|FAIL|PARTIAL
gaps: []
residual_risks: []
recommendation: ""
notes_for_review: ""
```

## Normalize Output In Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 8 template at `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Main Artifact` block.
- Keep field names in the schema verbatim; do not rename fields when writing into the note.
- The `PASS|FAIL|PARTIAL` conclusion in the `summary` callout must match `status` in the YAML block.

## Execution Flow

1. List the acceptance criteria and the main risks to verify.
2. Build `risk_ranked_test_matrix` to know which evidence is mandatory for each risk.
3. Classify `change_characteristics` to choose the right `test_strategy`.
4. If the change is pure business logic, prefer writing or running `unit_test` first.
5. If the change touches persistence, query, relation, transaction or schema, add `integration_test` or `database_test`.
6. If system behavior at the use-case level must be proven, add `feature_test`.
7. Record `negative_cases` and `regression_targets`; do not test only the happy path.
8. Run the relevant test/lint/build/check commands.
9. If automation is not enough, record `manual_exploration` with the flows checked and issues found.
10. Record `criteria_results`, `test_evidence`, `commands_run`, `skipped_checks`.
11. Produce `release_blockers`, `gaps`, `residual_risks`, `recommendation`.
12. Conclude the overall `status` and hand off to review/handoff.

## Quality Rules

- Default to writing and communicating in English.
- Text documents must be stored as UTF-8 and checked for encoding errors when text files change.
- Do not mark `PASS` without evidence.
- Do not skip an important check without recording the reason in `skipped_checks`.
- If a test cannot run because of the environment, state clearly that it is a limit of the current verify.
- Do not create a real database only to unit test pure business logic.
- Do not use mocks to prove the behavior of a real database, real relations or real migrations.
- For a change with regression risk, `negative_cases` and `regression_targets` must not be empty.
- If an important behavior cannot be automated, there must be a `manual_exploration` readable enough instead of silence.
- `release_blockers` must be explicit; do not use vague wording like "needs more checking" when release is actually blocked.

## Decision Rules

- Choose `unit_test` when proving business rules, state transitions, calculations, validations or policies at the pure object/service level.
- Choose `integration_test` when logic depends on a repository, ORM mapping, query, adapter or transaction.
- Choose `database_test` when a change touches schema, migration, FK, unique, index or query behavior depending on persistence.
- Choose `feature_test` when acceptance criteria must be proven through a complete flow from entrypoint to output.
- `PASS` when all mandatory acceptance criteria have passing evidence, the mandatory test levels in `test_strategy` are covered, and `release_blockers` is empty.
- `PARTIAL` when there is partial passing evidence but non-critical gaps remain, or residual risk does not block release right now.
- `FAIL` when a mandatory criterion is not met, evidence is not strong enough, or `release_blockers` are still open.
- If technical output passes but an important database-related check is missing in a change that touches persistence, the conclusion must not be `PASS`.
- If the patch just fixed a bug or regression, missing `negative_cases` or `regression_targets` means the conclusion must not be `PASS`.

## Completion Conditions

- A clear `risk_ranked_test_matrix` for the current change.
- A clear `test_strategy` for the current change.
- `negative_cases`, `regression_targets` and `manual_exploration` at a level fitting the scope.
- Complete `criteria_results` for the part to verify.
- Clear `test_evidence`, `commands_run` and `skipped_checks`.
- Specific `release_blockers`, `status` and `recommendation` for the next step.