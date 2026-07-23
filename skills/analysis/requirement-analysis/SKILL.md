---
name: requirement-analysis
language: en
description: Analyze and normalize requirements for software development tasks before design or implementation. Use when receiving a feature request, bug report, change request, new task, or vague request; produces a restated request, scope, open questions, assumptions, and a draft of acceptance criteria to hand off to product thinking, system design, or implementation planning.
---

# Requirement Analysis

> Vietnamese: SKILL.vi.md

Requirement analysis turns a rough brief into one that is understandable, clearly scoped, and verifiable.

## Objectives

- Restate the request concisely, faithfully, and without ambiguity.
- Pin down what is in scope and out of scope well enough to move to the next step.
- Separate the parts that remain vague, the information still missing, and the assumptions currently in use.
- Draft acceptance criteria so later steps have a basis for verification.

## When to Use

- When a new request arrives from a user, stakeholder, ticket, or document.
- When the current request is vague, lacks scope, or lacks completion criteria.
- When you need to distinguish clearly between a bug, a new feature, a refactor, or a behavior change.
- When you need to move from business language to language clear enough for the technical workflow.

## Out of Scope

- Choosing architecture or a detailed technical approach.
- Detailed effort estimation or splitting execution tasks.
- Directly modifying code, unless the user only asks for a summary/analysis in a context where the change is already clear.
- Filling gaps in important information by inference.

## Minimum Inputs

- `raw_request`: the original request from the user or ticket.
- `context_sources`: available context sources such as chat, issue, documents, images, related code.
- `known_constraints`: known constraints around business, technology, security, deadlines, or scope.

If `raw_request` is missing or the core problem to solve cannot be identified, stop and ask for clarification.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
raw_request: ""
restated_request: ""
request_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
business_context: ""
scope_in: []
scope_out: []
open_questions: []
assumptions: []
dependencies: []
risks_initial: []
acceptance_criteria_draft:
  - id: AC1
    description: ""
    measurable: true
notes_for_next_step: ""
```

## Meaning of Each Output

- `restated_request`: a clear, concise, and checkable restatement of the request.
- `request_type`: classification of the request to select the appropriate next workflow.
- `business_context`: the reason the request exists at the business or user-problem level.
- `scope_in`: the parts that must be handled in the current scope.
- `scope_out`: the parts that are not in scope, to prevent scope creep.
- `open_questions`: ambiguous points that cannot yet be decided.
- `assumptions`: assumptions temporarily in use, stated explicitly so they are not implied.
- `dependencies`: systems, teams, APIs, data, or external decisions that affect the request.
- `risks_initial`: risks seen early from the requirement perspective.
- `acceptance_criteria_draft`: a draft of acceptance criteria, to be finalized in the dedicated step.
- `notes_for_next_step`: notes for handing off to `product-thinking`, `system-design`, or `task planning`.

## Normalizing Output in a Workflow Note

If this skill's output is saved as a `.md` note within the workflow chain:
- When this skill serves as the full requirement-analysis artifact, prefer placing the YAML schema in the `## Requirement Analysis Spec` block; if the step template has no dedicated block, place it under `## Main Artifact`.
- In the default workflow, this usage fits best with step 1 at `../codex-workflow-chain/references/workflow-chain.md`.
- If a different step only needs a reduced workflow-level schema, follow the corresponding step template; do not change the meaning of the original fields when the full requirement-analysis artifact is needed.
- Keep the field names in the schema; do not rename fields when writing them into the note.

## Generated Spec and Contract

- The standard spec produced by this skill is `requirement-analysis-spec`.
- If the input focus is a ticket, issue, BRD, chat log, or existing document, this skill still produces the same `requirement-analysis-spec`; it does not create a separate format for each document type.
- If the full artifact is stored in a workflow note, place this spec in the `## Requirement Analysis Spec` or `## Main Artifact` block depending on the step template in use.
- The minimum contract of `requirement-analysis-spec` is:
  - it has `restated_request`
  - it has `request_type`
  - it has `scope_in` and `scope_out`
  - it has `open_questions`, or states explicitly that there are no open questions
  - it has `assumptions`
  - it has an `acceptance_criteria_draft` at a preliminary level
- When a workflow step only needs a reduced schema to transition between steps, the step note may use the workflow-level artifact; but if full document-analysis traceability is needed, it must generate `requirement-analysis-spec` according to this skill's schema.

## Execution Flow

1. Read the original request carefully and identify the core problem.
2. Restate the request in clear language, removing ambiguity and vague wording.
3. Classify the request as feature, bug, change, refactor, or research.
4. Separate `scope_in` and `scope_out`.
5. List the missing information under `open_questions`.
6. State the `assumptions` currently in use.
7. Write `acceptance_criteria_draft` at a preliminarily verifiable level.
8. Record dependencies, initial risks, and handoff notes.

## Quality Rules

- Default to writing and communicating in English.
- Document content must be stored as UTF-8 and must not corrupt text, including Vietnamese diacritics in `*.vi.md` supplement files.
- Do not use vague terms such as "optimal," "complete," or "stable" unless they carry a measurable meaning.
- Each item in `scope_out` must be clear enough to prevent misunderstandings.
- Each `acceptance_criteria_draft` must be verifiable later.
- If a request can be interpreted in multiple ways, state them instead of silently picking one interpretation.

## Decision Rules

- If the request is missing important data, prefer recording `open_questions` over deciding unilaterally.
- If the request mixes multiple objectives, split them into multiple scopes or multiple tasks.
- If a request is actually a bug but is described as a feature, state so explicitly.
- If there is a conflict between the new request and the current behavior of the system, record it under `risks_initial`.

## Completion Criteria

- There is a clear `restated_request` that does not contradict the original request.
- There are `scope_in` and `scope_out` sufficient to keep the next step from slipping scope.
- Important ambiguities have been captured in `open_questions`.
- There is an `acceptance_criteria_draft` sufficient to move on to the next refinement step.

## Handoff to the Next Step

- If user/business value needs to be pinned down: hand off to `product-thinking`.
- If a technical direction needs to be proposed: hand off to `system-design`.
- If the request is clear enough to plan: hand off to the step that writes the formal acceptance criteria or splits the work into tasks.

## Short Example

See `references/example.md` for a full worked example (login feature request through to the expected artifact). Read it on first use of this skill or when the schema's intent is unclear; skip it once the schema is familiar.