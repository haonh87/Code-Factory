---
language: en
---

# Execution Runtime Reference

> Vietnamese: execution-runtime.vi.md

Versioning notes:

- this document belongs to the public baseline `v1.0.0`
- `v1.0.0` has execution support via `agentic|multi_agent`, but it does not require every work item to turn on the execution layer
- the official version boundary lives in `workflow-versioning.md`

This document supplements `workflow-chain.md`.

- `workflow-chain.md` answers: which step, which skill, which artifact, which gate.
- This document answers: choose `agentic` or `multi-agent`, how to split roles, how to hand off, how to merge, and how to fall back, to actually run in a `Codex-first` direction.
- If a work item runs under SDD, `spec-driven-development.md` is the reference for the spec lifecycle, requirement IDs, spec freeze, spec change, and the coverage report; the runtime must not bypass those gates.
- Concrete execution examples live in `end-to-end-examples.md`.

Current rollout state in the repo:

- the execution runtime is already in the public baseline
- the repo already has the `review_mode` and `verification_owner` metadata
- the repo already has the `execution-policy`, `worker-assignment`, `worker-handoff-report`, and `merge-report` runtime artifacts
- the standard validator is `wfc exec --workflow-root work-items`; if the repo has mapped a root script, `npm run validate:workflow:execution -- --workflow-root work-items` is the equivalent alias
- the current canonical sample is `work-items/sample-execution-item/`

## Scope

- Applies to the execution runtime of the eight-step coding workflow.
- Prefer Codex first; keep the structure neutral enough to later port to Claude or another agent runtime.
- `NotebookLM` is an external-tool integration skill for researching/summarizing large corpora; it does not replace the `.md` note as source of truth.

## Runtime Principles

- In this baseline, when there is no clear reason to split ownership, choose `execution_mode=agentic`.
- The work-item-level lifecycle does not live in the execution runtime. If a project turns on `Work Item Protocol` in a later version, the runtime must respect that protocol's state machine.
- In the public baseline `v1.0.0`, creating a work item still follows the manual scaffold flow; the execution runtime does not open a new work item on its own.
- Only escalate to `multi_agent` when the step contract is clear enough and there is a real coordination benefit.
- `step-goal-contract` is the root contract; the execution runtime must not change the step's goal, scope, or done criteria.
- `step-goal-auditor`, `definition-of-ready-gate`, and `definition-of-done-gate` remain mandatory guardrails when the step requires them.
- The main `.md` note of a step is the only place considered the source of truth for the step's conclusion.
- Output from `notebooklm` is only supporting context; every official conclusion must be pinned back into the `.md` note or a standard workflow artifact.
- When `sdd_mode` is not `none`, the coordinator or main agent must keep the trace from `BRD/SRS` to approach, tasks, implementation, and verification; the step must not close if a spec gap is left unaddressed.

## Execution Mode Selection Policy, Codex-First

### Gate Into `agentic`

Use `agentic` when most of the following hold:

- The step has only one main ownership boundary.
- The context is small enough for one agent to stay consistent.
- Parallelization is not needed to save time or reduce context load.
- The step's verification does not need to separate the doer from the checker.

### Gate Into `multi_agent`

Use `multi_agent` only when both groups of conditions below hold at the same time.

Group 1, minimum readiness:

- A stable `step-goal-contract` exists for the step.
- A `coordinator_role` is identified.
- A `verification_owner` or an end-of-step audit path is identified.
- A `merge_strategy` for the final output exists.
- `owned_scope` or `owned_paths` can be split into relatively disjoint parts.

Group 2, complexity signals:

- `multi_boundary`: the step touches many backend/frontend/data boundaries.
- `parallelizable_work`: there are several independent pieces of work that can run in parallel.
- `large_context`: the number of sources or code areas is too large for one agent.
- `separate_verification`: execution must be separated from review/verify to reduce bias.
- `tool_specialization`: a role must use an external tool or a specialized skill such as `notebooklm`, `database-change-review`.

### Default Parallel Budget

To roll out safely on Codex first, use a conservative budget:

- Steps 1-4: `coordinator + at most 2 workers`.
- Steps 5-6: `coordinator + at most 3 workers`.
- Steps 7-8: `coordinator + at most 4 workers` when ownership is clear and the verify path is separate.

If the parallel benefit is not proven, reduce to `agentic` or `sequential multi-role`.

### Fallback Rules

- If `owned_paths` overlap heavily, fall back to `agentic` or `sequential multi-role`.
- If a worker returns output without evidence, the coordinator does not merge; the worker must redo or escalate.
- If an external tool such as `NotebookLM` is unavailable due to auth/network, fall back to manual reading or another research flow and record the limitation.
- If the final audit cannot confirm traceability or a quality gate, the step must not close even if partial outputs exist.

## Standard Role Contract

### `coordinator`

- Goal: lock the shared contract, split work, collect output, pin the end-of-step handoff.
- Owns: `execution_policy`, `worker_assignment`, `merge_report`, the source-of-truth `.md` note.
- Must not: assign work without a clear `owned_scope`; merge output lacking evidence; skip the final audit.
- Minimum input: `step-goal-contract`, upstream artifacts, the chosen execution mode.
- Required output: clear assignments, a merge report, a clear handoff to the next step or a blocker.

### `analyst`

- Goal: break down requirements, business goals, open questions, and draft acceptance criteria.
- Owns: the content analysis in steps 1-4, or analysis input for step 5.
- Must not: pin a technical approach or close a step unless it is the coordinator.
- Common skills: `requirement-analysis`, `product-thinking`.

### `architect`

- Goal: pin the option analysis, architecture detail, and impacted boundaries.
- Owns: the design in step 5 and input for step 6.
- Must not: drift into the implementation path outside the assigned design scope.
- Common skills: `brainstorming`, `system-design`, `domain-architecture`, `frontend-architecture`, `database-design`.

### `builder`

- Goal: execute code/config/doc within the assigned boundary.
- Owns: `owned_paths`, `owned_scope`, implementation evidence.
- Must not: edit paths outside ownership without reassignment; self-merge into the step's final output.
- Common skills: `implementation`.

### `tester`

- Goal: run verification and collect test/scan/review evidence.
- Owns: verification evidence per assignment.
- Must not: conclude the step's final DoD unless it is the verification owner/coordinator.
- Common skills: `testing`, `code-scan-review`, `database-change-review`.

### `auditor`

- Goal: compare the final output against the contract and gates.
- Owns: the audit verdict, gap list, recommendation.
- Must not: rewrite the business output in place of the coordinator or a worker.
- Common skills: `step-goal-auditor`, `definition-of-ready-gate`, `definition-of-done-gate`.

### `notebooklm-researcher`

- Goal: use `notebooklm` to read/summarize large corpora, many external sources, or a knowledge notebook.
- Owns: the research notebook/query/output, not the step's final conclusion.
- Must not: treat NotebookLM output as the source of truth; every conclusion must be normalized back into a workflow artifact.
- Common steps: step 1, 3, 5, and when needed at step 8.
- Common skills: `notebooklm`.

## Handoff Protocol

### General Rules

- Every assignment must point to the same `shared_contract_ref`.
- A worker may only hand off to the `coordinator`, not directly to the next step.
- A handoff must have `status`, `summary`, `outputs_produced`, and `evidence`.
- The coordinator only merges output once the assignment's `done_when` has been compared at minimum.
- If a worker uses an external tool such as `NotebookLM`, the related source, notebook, or query must be logged.
- The final audit always runs on merged output, not on separate fragments as if they were the step's final output.

### Assignment States

- `PLANNED`: the assignment is defined but not yet dispatched to a worker.
- `READY`: inputs for the assignment are sufficient.
- `IN_PROGRESS`: the worker is processing.
- `HANDOFF`: the worker has returned output to the coordinator.
- `MERGED`: the coordinator has accepted and integrated the output.
- `BLOCKED`: the assignment is blocked by input, tool, conflict, or constraint.
- `CANCELLED`: the assignment is canceled due to replan or fallback.

## `NotebookLM` Integration In The Workflow

`NotebookLM` is an optional integration skill, not a mandatory gate.

Use `NotebookLM` when at least one of these signals is present:

- More than 3 long documents need to be summarized quickly.
- Repeated querying of the same corpus is needed.
- Insights must be extracted from documents outside the codebase such as specs, research, docs, or transcripts.

Do not use `NotebookLM` to:

- Replace `step-goal-contract`.
- Replace the final decision in the workflow note.
- Replace direct technical verification on the codebase.

Sample usage by step:

- Step 1: support restating when the user provides many source documents.
- Step 3: gather open questions from a large corpus.
- Step 5: summarize design constraints or comparative research.
- Step 8: only use it to summarize release/compliance documents outside the codebase if truly needed.

## Codex-First Runtime Behavior

- If the Codex runtime supports delegation/sub-agents, the `coordinator` may dispatch assignments in parallel within the budget above.
- If the runtime does not support sub-agents or stable delegation tooling, keep the same spec but run in `sequential multi-role` mode: one agent plays the different roles in turn and records handoffs as if there were several logical agents.
- `multi_agent` must not be turned on just because the user says "parallelize"; the coordinator must still check the entry conditions.
- The coordinator must update the `.md` note at at least 3 checkpoints: choosing execution mode, dispatching assignments, completing the merge.
- For step 7 and step 8, if the verify owner is not yet clear, do not turn on `multi_agent`.

## Recommended Rollout Path

1. Phase 1: turn on `execution_mode`, `execution_roles`, and `execution_policy` for every step, but keep the actual runtime mostly `agentic`.
2. Phase 2: pilot `multi_agent` for steps 5, 7, and 8 on sufficiently large work items.
3. Phase 3: add a `notebooklm-researcher` for research-heavy work items or those with many external documents.
4. Phase 4: after Codex is stable, separate the runtime-neutral part to port to Claude.

## Runtime Output Templates

### `execution-policy`

```yaml
execution_mode: agentic|multi_agent
selection_reason: []
complexity_signals: []
shared_contract_ref: ""
parallel_budget: 1|2|3|4
coordinator_role: ""
verification_owner: ""
fallback_mode: agentic|sequential_multi_role
external_research:
  notebooklm: NONE|OPTIONAL|REQUIRED
  expected_outputs: []
notes: ""
```

### `worker-assignment`

```yaml
assignment_id: ""
step_id: ""
shared_contract_ref: ""
role: ""
owned_scope: []
owned_paths: []
skills: []
inputs: []
done_when: []
depends_on: []
status: PLANNED|READY|IN_PROGRESS|HANDOFF|MERGED|BLOCKED|CANCELLED
handoff_format: worker-handoff-report
```

### `worker-handoff-report`

```yaml
assignment_id: ""
role: ""
status: HANDOFF|BLOCKED|PARTIAL
summary: ""
outputs_produced: []
artifact_refs: []
code_refs: []
evidence: []
external_tools_used:
  - tool: ""
    purpose: ""
    refs: []
open_issues: []
recommended_next_action: ""
```

### `merge-report`

```yaml
step_id: ""
execution_mode: multi_agent
coordinator_role: ""
merged_assignments: []
rejected_assignments: []
conflicts_resolved: []
source_of_truth_updated: true|false
final_artifacts: []
residual_risks: []
ready_for_audit: true|false
```

### `execution-escalation`

```yaml
step_id: ""
raised_by_role: ""
reason_type: INPUT_GAP|OWNERSHIP_CONFLICT|MERGE_CONFLICT|TOOL_FAILURE|QUALITY_GAP|TIMEBOX_BREACH
description: ""
blocking_items: []
fallback_recommendation: AGENTIC|SEQUENTIAL_MULTI_ROLE|REPLAN|USER_DECISION
next_action: ""
```

### `notebooklm-research-capture`

```yaml
skill: notebooklm
notebook_id: ""
objective: ""
source_count: 0
sources: []
queries: []
key_findings: []
citations_or_refs: []
open_questions: []
limitations: []
handoff_target: ""
```