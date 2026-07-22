---
language: en
name: review-discipline
description: Organize early review inside `s07 Implement` in the order `spec compliance -> code quality`, by batch or risky task, then lock the handoff to verify. Use it when implementation touches logic, contracts, hard-to-read diffs, many batches or release risk where review should not be pushed to the end.
---

# Review Discipline

> Vietnamese: SKILL.vi.md

Coordinate early review inside `s07` so errors and drift surface before stepping into `s08 Verify + DoD`.

<HARD-GATE>
Do not push all review to `s08`.

Do not review `code quality` before locking `spec compliance`.

This skill coordinates the timing, order and scope of review; it does not replace `testing`, `code-scan-review`, `frontend-quality-review` or `react-best-practices-review`.
</HARD-GATE>

## When To Use

- When implementation has important batches of logic, contracts or integration.
- When the diff is long, spans many files, is hard to read or carries high risk.
- When `planning_track=full|enterprise`.
- When reviewer, review batches and blocker rules must be locked before verify.

## Out Of Scope

- Does not replace `testing` for behavior verification.
- Does not replace specialized reviews such as `frontend-quality-review`, `react-best-practices-review`, `database-change-review`.
- Does not self-legitimize a merge just because review passed.
- Does not replace `branch-finish-discipline`.

## Minimum Input

- `review_target`
- `planning_track`
- `change_scope`
- `risk_signals`
- `available_reviewers`
- `constraints`

`risk_signals` should state at least:

- whether there is important logic or contracts
- whether any high-risk batch needs early review
- whether the diff is hard to read or spans many files
- whether any requirement is easy to drift from spec

## Required Output

Emit a YAML artifact per the following schema:

```yaml
review_target: ""
planning_track: quick|full|enterprise
review_mode: SELF|TARGETED|INDEPENDENT
review_order:
  - SPEC_COMPLIANCE
  - CODE_QUALITY
review_batches:
  - batch: ""
    scope: []
    trigger: ""
    reviewer_role: ""
required_checks:
  spec_compliance: []
  code_quality: []
finding_policy:
  blocker_threshold: ""
  reopen_conditions: []
handoff_to_verify: []
notes_for_implementation_or_verify: ""
```

## Normalize Output In Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:

- Use the step 7 template at `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Implementation Notes` block.
- If the step already created a separate review artifact at `s08`, cross-link instead of repeating full findings.

## Mandatory Process

1. Determine `review_target` and the batch or risky task that needs early review.
2. Choose `review_mode` based on `planning_track` and actual risk.
3. Lock `review_order` in the sequence `SPEC_COMPLIANCE -> CODE_QUALITY`.
4. Split `review_batches` small enough for a reviewer to read and respond early.
5. Record `required_checks` for each review lane.
6. Lock `finding_policy` so it is clear which findings block verify.
7. Prepare `handoff_to_verify` for the `s08` step.

## Quality Rules

- `quick` still must have at least one review pass before leaving `s07`.
- `full` and `enterprise` must not leave `review_batches` empty when there is medium or high risk.
- `INDEPENDENT` should be used when the review owner is separate from the implementer or release risk is high.
- `finding_policy.blocker_threshold` must be explicit; do not use vague wording.
- Default to writing and communicating in English.
- Text files must be stored as UTF-8.

## Decision Rules

- The baseline level mapping (`quick`→`SELF`, `full`→`TARGETED`, `enterprise`→`INDEPENDENT`) follows `codex-workflow-chain § Hard Rule: Review Early, Do Not Wait Until The End` directly — do not re-derive the per-track minimum here.
- `SELF` still must follow the correct `review_order` even at the baseline level.
- `TARGETED` also applies to `quick` when there is a clear logic/contract batch, above that track's baseline.
- `INDEPENDENT` also applies when release risk is high or the review owner must be separate from the implementer, regardless of track.
- If there is important logic/contracts, `review_batches` must split that part out instead of mixing it into a large batch.
- If a finding touches spec or requirements, return to `spec compliance` before debating `code quality`.

## Completion Conditions

- `review_mode`, `review_order` and `review_batches` are clear.
- `required_checks` and `finding_policy` are enough for review to operate.
- `handoff_to_verify` lets `s08` receive the correct context.