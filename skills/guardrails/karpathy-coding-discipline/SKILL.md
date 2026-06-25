---
name: karpathy-coding-discipline
description: Four behavioral principles for coding agents, based on Karpathy's observations of common LLM failures -- silent assumptions, over-engineering, editing adjacent code, and skipping verification. Runs across every step, supplements guardrails and delivery skills, and does not replace the workflow chain or approval gates.
language: en
---

# Karpathy Coding Discipline

> Vietnamese: SKILL.vi.md

Four behavioral principles that reduce common failures when a coding agent does work.

## Origin

Based on Karpathy's observations of systematic failures in LLM coding agents:
1. **Silent assumptions** -- picking one interpretation and running with it, without checking back.
2. **Over-engineering** -- writing 1000 lines when 100 would do.
3. **Editing adjacent code** -- changing unrelated code, comments, or formatting.
4. **No verification** -- finishing the code without checking whether the result matches the intent.

## The Four Principles

### 1. Think Before Coding -- No silent assumptions, no hiding what you don't understand

- State assumptions explicitly before implementing.
- Multiple interpretations exist -> lay out the options; do not pick one silently.
- A simpler approach exists -> say so and propose it.
- Requirements unclear -> stop and ask; do not guess and run.

### 2. Simplicity First -- Minimal code that solves the problem, no speculation

- Do not add features that were not requested.
- Do not create abstractions for one-time-use code.
- Do not add flexibility or configurability that is not needed.
- Do not handle errors for scenarios that cannot occur.
- 200 lines that could be 50 -> rewrite.
- Standard: "Would a senior engineer call this overcomplicated?" -> if yes, simplify.

### 3. Surgical Changes -- Touch only what must be touched, clean up only your own mess

- Do not improve adjacent code, comments, or formatting.
- Do not refactor working code that is unrelated to the task.
- Match the existing style, even when you would choose differently.
- Unrelated dead code -> flag it; do not delete it.
- Orphans caused by your own change -> delete (imports, variables, functions).
- Every changed line must trace back to the user's request.

### 4. Goal-Driven Execution -- Define success criteria, loop until verified

- Turn the task into a measurable goal:
  - Add validation -> write a test for invalid input, pass the test.
  - Fix a bug -> write a test that reproduces the bug (bug repro first), pass the test.
- Multi-step task -> state a short plan plus a per-step verify.
- Clear success criteria -> the agent can loop independently without re-asking the user.
- **Difference from `step-goal-contract`**: Goal-Driven is a behavioral lens -- the agent sets its own success criteria per task. step-goal-contract is a process gate -- a YAML contract for the entire step.

## When to Use

- Across every step -- not only s07, but also s01 clarify, s04 approach, s05 technical approach, s06 task plan.
- When the agent shows signs of over-engineering or editing adjacent code in the diff.
- When a behavioral guardrail is needed alongside the workflow gate.
- When reviewing a diff and the agent violates one of the four principles.

## Out of Scope

- Does not replace `codex-workflow-chain` or the step skills.
- Does not replace `step-goal-contract` -- that skill locks the step contract (YAML schema); this skill locks agent behavior while working inside the step.
- Does not replace `review-discipline` -- that skill coordinates when to review; this skill provides behavioral criteria for the review content.
- Does not replace `definition-of-done-gate` -- that skill locks the work item completion verdict; this skill only provides behavioral-level success criteria.
- Does not bypass workflow gates -- it supplements, it does not replace approval.

## Interaction With Other Skills

| Skill | Relationship |
|---|---|
| `step-goal-contract` | Contract locks WHAT (step goal); karpathy locks HOW (agent behavior while doing). No overlap. |
| `review-discipline` | Discipline coordinates WHEN to review; karpathy provides the review CONTENT (surgical, simplicity). Supplemental. |
| `implementation` | Implementation defines HOW to deliver; karpathy supplements behavior WHILE delivering (surgical, minimal delta). Companion. |
| `definition-of-done-gate` | DoD locks the work item COMPLETION verdict; karpathy provides CANDIDATE success criteria per task. Different level. |

## Trade-off

Leans toward **caution over speed**. Obvious tasks (typo fix, one-liner) -> use judgment; do not apply full rigor.

## Measuring Effectiveness

The principles are working if:
- Diffs contain few changes unrelated to the task.
- Few rewrites due to overcomplication.
- Clarifying questions appear **before** implementing, not after going wrong.

## References

- [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)
- Source: Andrej Karpathy's post on LLM coding pitfalls (January 2026)