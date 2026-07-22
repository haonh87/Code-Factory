---
language: en
---

# Workflow Chain Reference

> Vietnamese: workflow-chain.vi.md

## Model Principles

- The default workflow chain of this bundle is an eight-step delivery chain for a specific coding request.
- Each workflow step is a real business step in the process of handling a request, not a description field or a check gate.
- `goal`, `input`, `output`, `done_when`, `constraints`, `risks`, `timebox` is the standard metadata set that can be attached to each step to detail the execution contract, quality gate, and handoff conditions when needed.
- In the workflow document, `input` and `output` must be written by business meaning first; the technical artifact name is only placed in parentheses for tracing, not used in place of the handoff content.
- Metadata is not treated as a separate step and must not be used to replace the eight-step workflow.
- Skills attach to steps to support analysis, execution, and quality control.
- A step may use many skills, and a skill may serve many steps.

## Role Of Skills In The Chain

- `codex-workflow-chain`: the skill that coordinates the entire workflow chain.
- `requirement-analysis`: the skill that standardizes requirements, scope, open questions, and the acceptance criteria draft.
- `product-thinking`: the skill that pins business value and user value.
- `brainstorming`: the skill that generates options and analyzes trade-offs at the technical solution clarification stage.
- `system-design`: the skill that proposes and selects the technical approach.
- `domain-architecture`: the skill that pins domain modules, bounded contexts, ownership, and layer rules for backend architecture.
- `frontend-architecture`: the skill that pins feature modules, route ownership, UI/state boundaries, public contracts, and shared rules for frontend applications.
- `frontend-experience-design`: the skill that pins screen behavior, UI state, responsive rules, accessibility baselines, and visual direction at a level enough to hand off to delivery.
- `database-design`: the skill that designs schema, relationships, ownership, retention, and audit at the design level.
- `deployment-devops`: the skill that coordinates overall DevOps, locks the environment matrix, and selects the specialized skill for `local`, `dev`, `uat`, `prod`.
- `containerization-packaging`: the skill that locks the `Dockerfile`, `.dockerignore`, `compose.yaml`, build artifact, and packaging pattern contract by language or workload.
- `platform-runtime-deployment`: the skill that locks runtime deploy on `docker`, `swarm`, `k8s`, including topology, networking, secrets, storage, scaling, and rollout/rollback.
- `ci-cd-release`: the skill that locks the CI/CD pipeline, registry, tagging, promotion flow, approval control, and release guard.
- `task-breakdown-planner`: the skill that splits the design into small tasks for execution.
- `implementation`: the skill that executes real changes in the codebase.
- `worktree-discipline`: the skill that pins when a `worktree` is required, how to isolate the workspace, and the cleanup guard for large or risky changes.
- `review-discipline`: the skill that organizes early review in `s07` in the order `spec compliance -> code quality`.
- `delegation-discipline`: the skill that pins whether delegation is allowed and locks `owned_scope`, `merge path`, and `verify path` for independent tasks.
- `react-web-implementation`: the skill that implements React web or Next.js with a clear server/client split, data fetching, state placement, and loading path.
- `testing`: the skill that verifies against acceptance criteria and quality gates, with a clear strategy between unit tests, integration/database tests, and feature tests.
- `code-scan-review`: the skill that scans code at step 8 verify to check syntax, static analysis, security scan, and performance heuristics; per-language detail is separated in the skill reference.
- `frontend-quality-review`: the skill that reviews screen-level frontend quality at the level of accessibility, responsive layout, interaction feedback, and UX heuristics.
- `react-best-practices-review`: the skill that reviews the render/data boundary, effect hygiene, state placement, and performance heuristics specific to React web or Next.js.
- `database-change-review`: the skill that reviews migration safety, compatibility, query risk, and release recommendation for a database change.
- `branch-finish-discipline`: the skill that pins cleanup, close, or merge of a branch/worktree only after verify and `DoD` are sufficient.
- `step-goal-contract`: the skill that pins the contract for each step before execution.
- `input-readiness-assessor`: the skill that assesses the input readiness level (`READY|BLOCKED`).
- `step-goal-auditor`: the skill that audits the actual output against the step contract.
- `definition-of-ready-gate`: the skill that pins the Definition of Ready at the work-item level before moving to technical approach and implementation planning.
- `definition-of-done-gate`: the skill that pins the Definition of Done at the work-item level after technical verification.
- `obsidian-markdown`: the skill that creates and edits `.md` notes/reports in Obsidian Flavored Markdown.
- `obsidian-bases`: the skill that creates and edits `.base` when an index or dashboard for notes/artifacts is needed.
- `json-canvas`: the skill that creates and edits `.canvas` when a visual diagram, flow, or task map is needed.
- `notebooklm`: the skill that integrates NotebookLM via CLI/MCP when summarizing or querying large corpora outside the codebase is needed; its output is only supporting context and does not replace the workflow note.

## Quick Reading Guide For The Chain

This chain should be read across six parallel layers:

- Step layer: the eight delivery steps from `Clarify` to `Verify + DoD`.
- Governance layer: `constitution`, `project-context`, `checklist`, `exception/waiver`, and the shared quality constraints for the whole workflow.
- SDD layer: `BRD/SRS`, requirement IDs, spec freeze, spec change, and spec coverage when a work item needs spec-driven delivery.
- Business skill layer: which skill is responsible for analysis, design, execution, or verification for that step.
- Artifact layer: if a step is saved as a file, the matching Obsidian skill for that file type must be applied.
- Execution topology layer: whether the step is run in `agentic` or `multi-agent` style, who holds ownership, and how the handoff works; if the runtime does not support stable delegation, the `sequential_multi_role` fallback is described in the runtime document.

This means:

- A step does not have only one skill.
- `codex-workflow-chain` and `step-goal-contract` are the base layer for coordination and contract locking.
- `governance` is a thin shared layer: most is embedded directly into the step contract/gate, the rest sits in `constitution`, `project-context`, `checklist`, and `exception`.
- SDD is an additional constraint layer when needed; it does not create a separate workflow or a new step.
- Skills such as `requirement-analysis`, `system-design`, and `testing` are the business layer.
- `obsidian-markdown`, `json-canvas`, and `obsidian-bases` are the artifact layer, turned on only when the step actually produces the corresponding file.
- `agentic` and `multi-agent` are the execution topology layer; they decide how a step is run and do not change the business meaning of the step. In schemas/frontmatter use `multi_agent`; `sequential_multi_role` is only a runtime fallback.
- For SDD detail see `references/spec-driven-development.md`; for how to merge the current workflow with `spec-kit`, `OpenSpec`, `cc-sdd`, and `BMAD-METHOD` see `references/sdd-merge-strategy.md`; for the target architecture to complete the workflow backbone see `references/target-architecture.md`; for the per-phase rollout of artifacts, validators, and CI see `references/implementation-blueprint.md`; for execution policy, role contracts, handoff/merge protocol, and `notebooklm` integration see `references/execution-runtime.md`; for `planning_track=quick|full|enterprise` routing see `references/adaptive-planning.md`.
- For end-to-end application examples see `references/end-to-end-examples.md`.

## Execution Topology Layer: `agentic` And `multi-agent`

Execution topology answers the question: will the same workflow step be run by one agent or many agents, under which loop, and who is responsible for closing the step.

General principles:

- Execution topology does not create a new step and must not bypass the eight-step workflow.
- Execution topology does not replace skills; it only decides how skills are organized for execution.
- `step-goal-contract` remains the root contract for any topology.
- `step-goal-auditor`, `definition-of-ready-gate`, and `definition-of-done-gate` remain the guardrail layer; changing topology does not change the gate.
- When many agents participate, the `.md` note of the step remains the single source of truth for that step's conclusion.

### `agentic`: one agent runs a step on its own

`agentic` is used when one agent can hold full ownership of the step and run the internal control loop before handoff.

Standard loop of `agentic`:

1. Read `step-goal-contract` to lock goal, scope, input, output, constraints, and risks.
2. Assess input readiness on its own; if anything is missing, report `BLOCKED` or state accepted assumptions.
3. Select and use the `content_skills` that fit the step.
4. Produce the output or artifact of the step.
5. Compare the output against the contract and related guardrails.
6. Conclude `COMPLETE|REWORK|BLOCKED`, then hand off to the next step or return a blocker.

`agentic` fits when:

- The step scope is small or medium.
- There are not many independent boundaries that need split ownership.
- The cost of coordinating many agents outweighs the benefit of parallelization.

### `multi-agent`: a coordinator orchestrates many agents around a step

`multi-agent` is used when a step has many independent branches, many specialty boundaries, or needs a clear separation between execution and verification.

Standard loop of `multi-agent`:

1. The `Coordinator` reads `step-goal-contract` and locks the shared goal for the whole step.
2. The coordinator splits work by role, `owned_scope`, or `owned_paths`.
3. Each worker uses the fitting skill within the assigned scope; it must not exceed ownership.
4. Workers return partial output, evidence, or auxiliary artifacts to the coordinator.
5. The coordinator merges results into the standard output of the step and updates the `.md` note as source of truth.
6. A `Verifier` or the coordinator itself runs the audit/gate to decide `COMPLETE|PARTIAL|BLOCKED`.

`multi-agent` fits when:

- The step has many independent pieces of work that can run in parallel.
- The roles `analyst`, `architect`, `builder`, `tester`, `reviewer` need to be separated.
- The step context is too large to put into a single agent.
- Ownership needs to be clear by module, file path, or architecture boundary.

Minimum rules for `multi-agent`:

- Every worker must use the same shared contract of the step.
- The `Coordinator` is the only endpoint that concludes the final handoff of the step.
- A worker must not close the step before merge and audit.
- `owned_scope` or `owned_paths` between workers should be disjoint to reduce conflict.
- If there are auxiliary artifacts such as `.canvas` or `.base`, they must still link back to the main `.md` note.

## Mapping Execution Topology To Workflow

| Step | Default mode | When to consider `multi-agent` | Common roles |
|---|---|---|---|
| `s01` Clarify | `agentic` | When many input sources, many documents, or many stakeholder contexts must be read | `coordinator`, `context-reader`, `restatement-owner` |
| `s02` Business Goal | `agentic` | When the product angle and the delivery angle need to be separated for comparison | `coordinator`, `product-owner-proxy`, `delivery-challenger` |
| `s03` Open Questions | `agentic` | When codebase, documents, and external dependencies must be read in parallel | `coordinator`, `codebase-reader`, `question-synthesizer` |
| `s04` Acceptance + DoR | `agentic` | When one agent writes criteria and another checks testability/readiness | `coordinator`, `criteria-author`, `ready-gate-checker` |
| `s05` Technical Approach | `agentic` or `multi-agent` | When the solution touches many backend/frontend/data boundaries or needs deep comparison of many options | `coordinator`, `solution-designer`, `backend-architect`, `frontend-architect`, `data-architect` |
| `s06` Task Plan | `agentic` or `multi-agent` | When planning needs to be split by execution track, verify, or release | `coordinator`, `planner`, `dependency-reviewer` |
| `s07` Implement | `agentic` for small changes; `multi-agent` for large changes | When there are many module/file ownerships that can be implemented in parallel | `coordinator`, `builder`, `migration-owner`, `doc-owner` |
| `s08` Verify + DoD | `agentic` or `multi-agent` | When testing, code scan, database review, deployment review, and final audit need to be separated | `coordinator`, `tester`, `scan-reviewer`, `database-reviewer`, `deployment-reviewer`, `auditor` |

## Mapping Execution Topology To Skill

| Skill or skill group | Typical role in `agentic` | Typical role in `multi-agent` |
|---|---|---|
| `requirement-analysis`, `product-thinking` | The main agent analyzes and locks the business meaning of the step | A worker like `analyst` or `product-owner-proxy` provides input to the coordinator |
| `brainstorming`, `system-design` | The main agent compares options then pins the recommendation | A worker like `solution-designer`; multiple workers may represent different options |
| `domain-architecture`, `frontend-architecture`, `frontend-experience-design`, `database-design` | The main agent calls deep by the boundary actually impacted | Specialist workers own each architecture boundary or screen behavior |
| `task-breakdown-planner` | The main agent splits tasks and checks dependencies | A `planner` worker creates the plan, a `dependency-reviewer` checks the critical path |
| `deployment-devops` | The main agent locks overall DevOps scope, environment matrix, and the coordination direction across packaging, runtime, release | Workers like `platform-architect`, `release-planner`, or `deployment-reviewer` provide the overall plan and evidence to the coordinator |
| `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` | The main agent locks the deep contract per packaging, runtime, or pipeline/release layer | Specialist workers like `image-packager`, `platform-architect`, or `release-engineer` own the DevOps output per layer |
| `implementation`, `worktree-discipline`, `review-discipline`, `delegation-discipline`, `react-web-implementation` | The main agent edits code or pins execution discipline within a small or medium scope, may call framework-specific guidance when needed | Many `builder` workers split by module or path ownership; a frontend builder may own the React boundary separately; the coordinator can use output discipline to lock workspace, review, and delegation |
| `testing`, `code-scan-review`, `frontend-quality-review`, `react-best-practices-review`, `database-change-review`, `branch-finish-discipline` | The main agent verifies, records evidence, and pins closeout discipline after verify | Verifier workers separated by check type or framework review; a closeout owner uses `branch-finish-discipline` to lock cleanup/merge timing |
| `notebooklm` | The main agent uses it to summarize/query large corpora when the step has many external sources | A worker like `notebooklm-researcher` gathers insight from the notebook then hands off to the coordinator; the output is only supporting context |
| `step-goal-contract`, `input-readiness-assessor`, `step-goal-auditor`, `definition-of-ready-gate`, `definition-of-done-gate` | Internal guardrail of the same agent | The shared contract/audit layer for coordinator and workers; not under the separate ownership of a business skill |

## Reading Input/Output In Business Language

- `Input` is the information, decision, or evidence a step needs to receive to start safely.
- `Output` is what the step must hand off to the next step or to a stakeholder; describe by business value first, then record the artifact name in parentheses when tracing is needed.
- If you must explain quickly to someone who does not care about spec names, read each step by the pattern: "what it receives -> what it returns -> which question is answered".

| Step | Receives in business language | Returns in business language | Question answered |
|---|---|---|---|
| `s01` Clarify | The raw request from user/ticket, initial context, and known constraints | A shared understanding of the request, an initial scope frame, and the related `governance context` so it is not misunderstood | "What are we asked to solve, and under which constraints?" |
| `s02` Business Goal | The shared understanding of the request and stakeholder intent | The business goal, expected value, success metrics, and the parts deliberately not done | "Why is this worth doing and what is the expected outcome?" |
| `s03` Open Questions | The business goal and all current information | A list of missing points, conflicts, `governance blockers`, or open decisions before continuing | "What is still missing so we do not do it wrong or drift from the rule?" |
| `s04` Acceptance + DoR | The clear business goal and answers for the vague parts | A measurable acceptance criteria set, the execution readiness level, and the `governance checks` result needed before design/task split | "What counts as done right and ready enough?" |
| `s05` Technical Approach | The pinned acceptance criteria, `governance context`, and current system context | The chosen technical approach, the reason for choosing it, the impacted boundary, and a `governance exception` if there is a deviation | "How will we solve it while staying true to the rule?" |
| `s06` Task Plan | The chosen technical approach | An implementation plan broken into ordered small tasks, with review/verify checkpoints and coverage for the related `governance` requirements | "What work needs doing, in what order, and where do we verify?" |
| `s07` Implement | The implementation plan, the current codebase, and the pinned rules | Real changes in code/config/doc within the pinned scope, plus a `governance exception` if one arises | "Has the solution been produced in the right direction and per the rule?" |
| `s08` Verify + DoD | The real changes, the acceptance criteria, and the related checklists | Pass/fail evidence, the completion level, the `governance` compliance level, and any remaining part | "Does the result truly meet the requirement and reach the needed quality level?" |

## Compact Workflow-Skill-Step Diagram

```text
S1 Clarify
-> requirement-analysis
-> product-thinking
-> output: shared understanding of the request + initial scope frame + initial governance context (restatement-spec + discovery-framing-spec + governance-context when needed)

S2 Business Goal
-> product-thinking
-> output: business goal + non-goals (business-goal-spec)

S3 Open Questions
-> requirement-analysis
-> input-readiness-assessor
-> step-goal-auditor
-> output: list of missing parts + governance blocker if any + input readiness state + step audit (readiness-spec + input-readiness-report + step-audit)

S4 Acceptance + DoR
-> requirement-analysis
-> definition-of-ready-gate
-> output: measurable acceptance criteria + DoR conclusion + governance checks for readiness (acceptance-criteria-spec + definition-of-ready + governance-checklist when needed)

S5 Technical Approach
-> brainstorming
-> system-design
-> when needed: domain-architecture | frontend-architecture | frontend-experience-design | database-design | deployment-devops | containerization-packaging | platform-runtime-deployment | ci-cd-release
-> output: recommended technical option + architecture details to lock + deployment topology when the scope has runtime delivery (option-analysis-spec + technical-approach-spec + architecture-detail-spec when needed)

S6 Task Plan
-> task-breakdown-planner
-> when needed: deployment-devops | containerization-packaging | platform-runtime-deployment | ci-cd-release
-> output: ordered task plan + review/verify/governance checkpoints + rollout/promotion notes when present (task-breakdown-spec + governance-checklist when needed)

S7 Implement
-> implementation
-> when needed: react-web-implementation
-> when needed: deployment-devops | containerization-packaging | platform-runtime-deployment | ci-cd-release
-> output: real changes made, including Dockerfile/compose/manifests/pipeline when in scope and implementation notes when the stack is React web or Next.js (implementation-spec + implementation-notes when needed)

S8 Verify + DoD
-> testing
-> code-scan-review
-> when needed: frontend-quality-review | react-best-practices-review
-> step-goal-auditor
-> definition-of-done-gate
-> when needed: database-change-review | deployment-devops | containerization-packaging | platform-runtime-deployment | ci-cd-release
-> output: verify evidence + governance compliance/checklist + review findings when present + deployment review when present + DoD conclusion (verification-spec + governance-checklist when needed + scan-summary + review-findings when present + database-review when present + deployment-review when present + step-audit + definition-of-done)
```

Notes:

- Every step goes through `codex-workflow-chain`.
- Per the current standard workflow, every step has `step-goal-contract`.
- If a step is scaffolded into a `.md` note, `obsidian-markdown` must be added even though the business skill column does not repeat that on every row.
- When a work item depends on many external documents or a large corpus, `notebooklm` may be used at step 1, 3, 5, or when needed at step 8; the output must be normalized back into the step `.md` note.

## DevOps Lane And Cross-Environment Promotion

The DevOps lane does not replace the eight-step workflow; it is a delivery lane that runs across steps 5 -> 8 when the work item has packaging or rollout.

- Step 5: lock the environment matrix, runtime target, and packaging contract.
- Step 6: split tasks for build image, compose, manifest, promotion, smoke, and rollback.
- Step 7: implement the real artifacts such as `Dockerfile`, `compose.yaml`, manifests, or pipeline config.
- Step 8: verify packaging, deploy readiness, and release recommendation before promotion.
- Real rollout to `dev`, `uat`, `prod` should only happen after step 8 has enough evidence or a clear accepted guard.

| Environment | Goal | Valid runtime | Minimum artifact | Minimum gate |
|---|---|---|---|---|
| `local` | Run on a developer machine with a near-production baseline | `docker` | `Dockerfile`, `compose.yaml` | image build pass, `docker compose config` pass, boot or smoke pass |
| `dev` | Confirm the artifact is deployable and easy to observe | `docker`, `swarm`, `k8s` | image contract + matching runtime artifact | deploy pass, health pass |
| `uat` | Verify near production and serve signoff | `docker`, `swarm`, `k8s` | same image contract as the promote flow | smoke pass, guard per environment |
| `prod` | Safe rollout, with rollback | `docker`, `swarm`, `k8s` | production runtime artifact + rollback plan | clear rollout strategy, verification after deploy, rollback path |

## Work Item Classification

`work_item_type` is required metadata when scaffolding a workflow note to keep routing consistent between discovery and delivery.

- `FEATURE`: add a new capability or behavior.
- `BUG`: fix wrong behavior against current expectations.
- `CHANGE`: change current behavior per a new request.
- `REFACTOR`: change internal structure without intending to change business behavior.
- `RESEARCH`: investigation or technical spike, may not reach production implementation.

## Eight-Step Workflow

Conventions:
- This table is the short contract of the eight steps; skill detail is in the `Compact Workflow-Skill-Step Diagram` and `Spec Emergence And Step-Level Contract` sections.
- The short name is only a display name; `step_id`, `step_slug`, and the standard file naming do not change.
- If a step produces an Obsidian artifact, the matching Obsidian skill is also applied per `Mandatory Rules For Obsidian Artifacts`.

| Step | Short name | Goal | Main output | Step transition gate |
|---|---|---|---|---|
| `s01` | Clarify | Clarify the request, context, scope, initial assumptions, and related `governance context` | `restatement-spec`, `discovery-framing-spec`, `governance-context` when needed; `brd-spec` when SDD | Context is clear; initial `governance context` is recorded; key evidence is normalized into the note or `BRD` |
| `s02` | Business Goal | Pin the business goal, KPI, scope boundary, non-goals, and alignment with foundational principles | `business-goal-spec`, `brd-spec` when SDD | Goal, KPI/success metric, scope, and non-goals are clear; any conflict with `governance` is recorded |
| `s03` | Open Questions | Gather missing input, conflicts, blockers, `governance gaps`, and `BRD/SRS` gaps | `readiness-spec`, `input-readiness-report`, `step-audit`; `BRD/SRS` decision log; `governance-context` update when needed | `READY`, or every key blocker including any `governance blocker` has a clear owner/resolution |
| `s04` | Acceptance + DoR | Pin requirements/AC, testability, readiness, `governance alignment`, and spec freeze when SDD | `acceptance-criteria-spec`, `definition-of-ready`, `governance-checklist` when needed, `srs-spec`, `spec-freeze-gate` when SDD | AC is measurable; DoR is ready; `governance checks` pass or have a clear waiver/owner; spec is `approved|frozen` or has a clear reason not to freeze |
| `s05` | Technical Approach | Choose the approach, trade-offs, and technical/UX/DevOps boundary within the `governance` constraints in effect | `option-analysis-spec`, `technical-approach-spec`, `architecture-detail-spec`; `governance-exception` when deviating; `spec-change` when there is a gap | `option analysis` is at a fitting level and the recommendation is clear; the recommended option is the smallest sufficient solution in the current scope; the approach traces to requirements/AC; no `governance` violation or a clear `exception/waiver` is recorded; spec gaps are not ignored |
| `s06` | Task Plan | Build a build/verify/release task plan with traceability, review checkpoints, and coverage for related `governance` requirements | `task-breakdown-spec`, `governance-checklist` when needed, `spec-traceability-matrix` when SDD | Tasks are small enough, ordered, with coverage for in-scope requirements and the needed review/verify/governance tasks; the task plan is clear enough that the implementer does not have to reinvent the design |
| `s07` | Implement | Execute per the approach, frozen spec, approved change, and pinned `governance` rules | Code/config/doc changes, `implementation-spec`, `implementation-notes`; `governance-exception` when needed; `spec-change` when needed | `s04-s06` meet the minimum conditions; behavior change uses `TDD` or has a clear reason plus an alternative `verify path`; large or risky change uses `worktree` or has a clear reason to skip; the main part or risky batch/task is reviewed within `s07` in the order `spec compliance -> code quality`; `subagent` is only used for independent tasks or has a clear fallback; output meets the contract; no unrecorded/unapproved spec drift or `governance drift` |
| `s08` | Verify + DoD | Verify evidence, coverage, `governance compliance`, DoD, and release and business acceptance when needed | `verification-spec`, `governance-checklist` when needed, `spec-coverage-report`, review reports, `definition-of-done`, `governance-exception` when an open deviation remains | Coverage/evidence is clear; DoD conclusion is clear; only this step may declare `done`; if there is a `branch/worktree`, the close decision is only valid after the `s08` verdict; `governance` compliance is transparent; remaining gaps have an owner/next action |

### `sdd_mode=light`: Same Eight Logical Steps, Fewer Physical Notes

The table above describes all eight logical steps; `SDD Light` never removes a logical step or a control invariant, it only changes which physical note hosts each one. Full authority for the eligibility matrix, hard escalation, gate host contract, and rollout flag lives in `policies/codex/AGENTS.global.md § Hard Rule: SDD Light Profile` — read it before authoring or reviewing a Light work item.

Physical note mapping for Light:
- `s01` hosts `Clarify` + `Business Goal` + `Open Questions` + classification + the protocol anchor.
- `s04` hosts `Acceptance + DoR` (Spec Card, not `BRD/SRS`; see `references/spec-driven-development.md`).
- `s06` hosts `Option Analysis` + `Brownfield Impact` + `Technical Approach` + `Task Plan` (there is no separate `s05` note).
- `s07` is created lazily at `ACTIVE` and keeps its own Delivery Rule Evidence boundary; it is never merged into `s08`.
- `s08` is created lazily when Verify starts.

A work item that fails Light eligibility, or hits a hard escalation trigger, auto-escalates to the full eight-note flow above; an explicit `--preset sdd-light` cannot override a hard escalation.

## Governance Layer

`Governance` in this workflow is a thin shared layer, not a separate step.

Application principles:

- Do not create a `step 0` or a separate governance workflow.
- Most `governance` is embedded directly into the `step-goal-contract`, gate, and handoff of each step.
- Keep only a few shared artifacts at the project or work-item level such as `constitution`, `project-context`, `governance-checklist`, `governance-exception`.
- `Clarify` must record `governance context` before going deep into `Technical Approach`.
- `Acceptance + DoR` and `Task Plan` are two natural checkpoints to verify whether `governance` requirements have been reflected in acceptance, verify direction, and task coverage.
- `Implement` must not silently drift from the rule; every deviation must be recorded via `governance-exception` or `waiver`.
- `Verify + DoD` must clearly conclude the `governance compliance` level, not just that the feature passes.

## Hard Rule: Spec/Design Before Code

- `s07 Implement` must not start if `s04`, `s05`, or `s06` do not meet the minimum conditions (for `sdd_mode=light`, read this as `s04` and `s06` per the Light gate host contract — there is no separate `s05` note).
- Minimum conditions to start production code:
  - `s04` has measurable acceptance criteria and a clear `DoR`.
  - `s05` has a technical approach enough to lock the impacted boundary and a validation plan (for Light, this content is hosted inside `s06`, not a separate note).
  - `s06` has a task plan enough to know the execution order and verify path.
- `planning_track=quick` only allows shortening authoring detail; it does not allow dropping `s05` or `s06` entirely (for `sdd_mode=light`, `s05`'s content is hosted inside `s06` by design — see `AGENTS.global.md § Hard Rule: SDD Light Profile`).
- When a work item runs under `SDD`, code may only start when `spec` is `approved|frozen`, unless there is a valid `spec-change` or `governance-exception`.
- If an emergency forces shorter authoring before code, the deviation must be recorded as an exception or waiver; you must not code first then backfill artifacts as if the process was never broken.

## Hard Rule: SDD Light Profile

- `sdd_mode=light` (`SDD Light`) reduces authoring ceremony; it does not add a new SDD mode, remove a lifecycle step, or weaken any control invariant — it only changes how much gets written and where. Full authority for this rule is `policies/codex/AGENTS.global.md § Hard Rule: SDD Light Profile`.
- A work item may run Light only when it is `delivery_context=brownfield`, `planning_track=quick`, `governance_profile=default`, `execution_mode=agentic`, `interaction_mode=self`, and risk is `low` or `medium`.
- Hard escalation to full/strict overrides an explicit Light preset when the item is greenfield, needs a `Foundation Decision`, touches a public API/event/data contract, involves a database migration/backfill/cutover, needs regulated or security-sensitive evidence, requires multi-agent delegation, has `defect_source=UNKNOWN` or unclassified spec impact, has high blast radius or spans multiple systems, or needs a complex UAT/release gate.
- Physical note mapping for Light: `s01` hosts Clarify + Business Goal + Open Questions + classification; `s04` hosts Acceptance + DoR + Spec Freeze/approved CR; `s06` hosts Option Analysis + Brownfield Impact + Technical Approach + Task Plan (there is no separate `s05` physical note for Light); `s07` and `s08` are created lazily when the item transitions to `ACTIVE`/Verify starts. The 8 logical steps still exist in the trace model; only the physical note count is reduced.
- Gate host contract for Light: `Spec + DoR` at `s04`; `Approach + Task Plan` at `s06` (no separate `s05` gate check); `Foundation Decision` is not supported — a work item that needs one must auto-escalate to full; `Delivery Rule Evidence` stays at `s07`; `DoD` at `s08`.
- Light uses one Spec Card (`spec_refs.card`) instead of separate `BRD`/`SRS`; see `references/spec-driven-development.md` for the Spec Card contract.
- A `ready-bundle` interaction may seal the Spec, DoR, Approach, and Task Plan receipts in one step, but each gate still gets its own independent trusted receipt with its own reviewer and timestamp; bundling the interaction never weakens gate semantics.
- `ACTIVE` for a Light work item still requires the `s04` and `s06` receipts (in place of `s04`+`s05`+`s06`); every other human-controlled-gate invariant in this reference applies unchanged.

## Hard Rule: Disciplined Brainstorming

- Before pinning `s05 Technical Approach`, there must be an `option analysis` at a level fitting the work item complexity.
- Minimum `option analysis`:
  - the goal to solve is clear
  - there are options to compare
  - there is 1 recommended direction with a clear reason
  - there is something to validate before or during implementation
- If the problem has many reasonable directions, at least 2 options must be stated.
- If the problem has an almost obvious direction, at least 1 alternative or a rejected direction must still be stated to prove comparison.
- `planning_track=quick` only allows shortening the `option analysis` detail; it does not allow dropping the option comparison entirely.
- If there is not enough data to brainstorm seriously, the blocker or assumption must be pushed to `s03 Open Questions` instead of forcing an approach choice.

## Hard Rule: Prefer The Smallest Solution That Is Correct

- At `s05 Technical Approach`, if a smaller option still meets the acceptance criteria, current constraints, related `governance`, and the main validation need, that option must be preferred.
- Do not open a new abstraction, layer, service, framework, schema split, queue, cache, or config surface only for hypothetical future needs.
- If a larger option is chosen, the `technical approach` must clearly state why the smaller option is not enough:
  - it does not meet current acceptance criteria or quality constraints
  - it does not meet safety, operational, or `governance` requirements
  - an in-scope requirement forces a larger boundary right now
- `planning_track=quick` defaults to the smallest delta on the current path; do not rewrite or redesign a boundary without a specific reason.
- `Smallest sufficient solution` does not mean doing shoddy work or cutting tests, verify, review, docs, or `governance`.

## Hard Rule: Execution-Oriented Planning

- Before starting `s07 Implement`, `s06 Task Plan` must be clear enough to execute without reinventing the design.
- Minimum of an `execution-oriented task plan`:
  - clearly state the `owned_scope` or the main files/paths to create or edit when identifiable
  - have a clear execution order or dependency
  - have a sufficient `verify path` for each task or batch
  - have a review or governance checkpoint when the scope needs it
- Do not write placeholder task plans like `handle edge case`, `add suitable validation`, `write tests`, `fix the related part` without stating what will be touched and how it will be checked.
- `planning_track=quick` only allows shortening the task plan detail; it does not allow dropping the main touch points or the main verify approach.
- If the task plan still forces the implementer to re-infer the approach, go back to `s05` or rewrite `s06` before coding.

## Hard Rule: TDD For Behavior Change

- At `s07 Implement`, if the change creates or modifies a `behavior change`, it must follow `TDD`.
- `behavior change` in this workflow includes:
  - fixing a behavior bug
  - adding production feature behavior
  - changing a validation rule or contract
  - a refactor with significant regression risk
- Minimum `TDD` cycle:
  - write a test for the desired behavior or the bug to reproduce
  - run to see the test fail for the right reason
  - write the minimum code to pass
  - run the test again to confirm pass
- `TDD` is not required for `docs-only`, rename, format, metadata-only, or artifact workflow that does not affect production behavior.
- If strict `TDD` is blocked by legacy, harness, or test environment, the reason and an alternative `verify path` must be recorded in the implementation note; you must not write code first then add tests after and still call it `TDD`.

## Hard Rule: Worktree For Large Or Risky Changes

- At `s07 Implement`, a `worktree` must be used when the change is in the `large or risky change` group.
- `large or risky change` in this workflow includes at minimum:
  - `planning_track=enterprise`
  - implementation that spans more than one session
  - touching many boundaries or many files with significant conflict risk
  - high merge risk, branch risk, or release risk
- With `planning_track=full`, if the change is no longer a quick fix, a `worktree` should be used by default.
- A `worktree` may be skipped for a small bug, quick fix, few files, done in one session, and low conflict risk.
- If the change is in the should-use or must-use `worktree` group but a worktree is still not used, the implementation note must state the reason.
- `worktree` is a workspace isolation layer; it does not replace review, verify, or `DoD`.

## Hard Rule: Review Early, Do Not Wait Until The End

- At `s07 Implement`, all review must not be pushed to `s08 Verify + DoD`.
- Review must happen early by batch, by risky task, or for the important logic/contract part within `s07`.
- Minimum:
  - `quick`: at least one review pass for the implemented part before leaving `s07`
  - `full`: `targeted review` by batch or risky task
  - `enterprise`: `independent review` for the main parts in `s07`
- Default review order:
  - `spec compliance`
  - `code quality`
- Early review does not replace `testing`, `verify`, or `DoD`; `s08` is still the final conclusion.

## Hard Rule: Two-Tier Review

- Every review in `s07 Implement` must check `spec compliance` first, then `code quality`.
- `spec compliance` must answer at minimum:
  - does the change match the pinned acceptance criteria, approach, spec, and scope
  - is there an unrecorded `governance` deviation or spec drift
- Only after `spec compliance` has passed or has a clear exception may it move to `code quality`.
- With `planning_track=enterprise` or for the main logic/contract part, the two-tier review must appear as two clear steps, not a vague merge.
- With `quick` and `full`, the review may be in the same pass, but the verdict must still follow the order `spec compliance -> code quality`.
- `code quality` does not replace `spec compliance`; clean code that drifts from spec is still a fail.

## Hard Rule: Subagent Only For Independent Tasks

- At `s07 Implement`, `subagent` or `multi_agent` may only be turned on when the task is in the `independent task` group.
- `independent task` in this workflow must meet at minimum:
  - `s06 Task Plan` is clear enough to assign work
  - `owned_scope` or `owned_paths` are relatively disjoint
  - the `merge path` or handoff path is clear
  - the `verify path` or `verification_owner` is clear
- Do not turn on `subagent` for a small but tightly coupled task, a task that just finished exploring context, a task with strong overlapping ownership, or a task without a clear verify path.
- `agentic` remains the default mode; if the `independent task` conditions are not met, fall back to `agentic` or `sequential_multi_role`.
- `subagent` must not bypass `review`, `testing`, `verify`, or `DoD`.

## Hard Rule: Do Not Self-Declare Done

- No agent, worker, or implementer may declare `done` before `s08 Verify + DoD` has a clear `DoD` verdict.
- A local `review pass`, `test pass`, `code done`, `merge done`, or a clean `worktree` is not equivalent to `DoD`.
- With `multi_agent` or `subagent`, evidence may only be aggregated in `s07`; the completion verdict is only valid when `s08` concludes.
- If a check is skipped, an exception is open, a gap has no clear owner, or evidence is insufficient, only `PARTIAL` or not-complete may be reported; `done` must not be reported.
- `DoD` is the gate that closes a work item at the delivery level, not a subjective state of the implementer.

## Hard Rule: Branch/Worktree Only Finalized After Verify

- When a work item uses a `branch` or `worktree`, the `cleanup`, `close`, `remove`, or `merge` decision is only valid after `s08 Verify + DoD` has a clear `DoD` verdict.
- A clean `branch`, clean `worktree`, reviewed diff, or locally merged code is not evidence to close a branch/worktree early.
- If verify is pending, a finding is open, an exception is open, or evidence is insufficient, the branch/worktree must stay in a waiting state; it must not be treated as ready to close.
- With `multi_agent` or many `worktree`s, merge or cleanup is only allowed after the `verify path` and handoff path have ended in `s08`.
- This rule only tightens the timing of branch/worktree close; it does not replace the repo branch strategy.

## Default Rule: Safe Default

- When there is not enough certainty to choose a `planning_track`, capability, or intervention level, the safer fallback must be chosen instead of early optimization.
- `safe default` of this workflow:
  - unsure which `planning_track`: choose `full`
  - unsure whether a gate has passed: treat it as not passed and go back to the corresponding step
  - unsure whether `subagent` is needed: do not use it
  - unsure whether to open a new boundary, abstraction, or service: do not open it if the current path still meets the need
  - unsure whether `worktree` is needed: use it if the change shows signs of `large or risky change`
  - unsure whether `TDD` is needed: use it if production behavior is affected
  - unsure which review level: start with `targeted review`
- `safe default` does not allow skipping hard rules; it only decides the fallback direction when uncertain after reading context.

## Hard Rule: Human-Controlled Gates

- This workflow runs on the `AI proposes, human approves` model.
- AI may analyze, draft artifacts, propose options, propose approaches, propose task plans, implement, run tests, aggregate evidence, and state recommendations.
- The right to `implement` is only opened after the corresponding human gates pass; a draft artifact does not automatically mean the gate has passed.
- AI must not on its own:
  - approve a work item or change package
  - pass `Spec`
  - pass `Contract`
  - pass `DoR`
  - pass `Approach`
  - pass `Foundation Decision`
  - pass `Task Plan`
  - pass `UAT`
  - pass `DoD`
  - pass `Release`
  - pass `Business Acceptance`
  - approve a `governance-exception` or `waiver` if the authority belongs to a different human role
- Every human-controlled gate is only considered passed when all of these hold:
  - the source-of-truth artifact of the step or protocol has been updated
  - there is enough evidence for the reviewer to check
  - the owner or approver with the right authority has clearly pinned it
- `work item approval` and `change package approval` are always human-controlled gates; a protocol-managed item must not use `review_required=false` or `approval_status=NOT_REQUIRED` to bypass review.
- Human pass must be explicit; do not infer it from a comment, a technical `review pass`, a local `test pass`, or the fact that an artifact exists.
- If a human-controlled gate has not passed, the workflow must be `BLOCKED`, go back to the previous step, or stop before the next gate; it must not continue just because AI judges it "good enough".
- `ACTIVE` is only valid when `work item approval`, `change package approval` when present, `bootstrap gate` of `greenfield` when present, and the `s04`, `s05`, `s06` evidence have been human-passed (for `sdd_mode=light`, `s04` and `s06` — no separate `s05` note to pass).
- `VERIFIED` is only valid when `s08` has verify evidence.
- `DONE` is only valid when `s08` has passed `DoD`, and if the scope requires it, `UAT`, `Release`, and `Business Acceptance` have also passed in `s08`.
- Invariants for the router state block:
  - if `Missing Gates` is not `NONE`, `Workflow Status` must not be `ACTIVE`, `READY_FOR_REVIEW`, or `VERIFIED`
  - if `Missing Gates` is not `NONE`, `Next Human Action` must not be `NONE`
- `approval_gates` records which gate is `required` or `not_applicable` for the work item or step note.
- `role_signoffs` records the role with signoff authority for `spec`, `contract`, `dor`, `approach`, `foundation`, `task_plan`, `uat`, `release`, `business_acceptance`, `dod`.
- `gate_reviews` records the actual human reviewer and review time for each gate; a finalized note at `s04`, `s05`, `s06`, `s08` must have reviewer + timestamp for the main gate of the step.

## Hard Rule: Empty Project / Greenfield Hard Stop

- If the project is in an `empty` or `greenfield` state, do not jump straight to scaffolding a framework, choosing the final stack, or implementing production code.
- `empty` or `greenfield` in this workflow means at least one of:
  - the repo is nearly empty or has no main execution source tree
  - no stack or framework baseline has been pinned
  - no runtime/deployment baseline has been pinned
  - no source-of-truth artifact enough to consider a foundational architecture decision approved
- In this state, AI may only:
  - clarify the request, business goal, open questions
  - draft the needed spec or contract
  - run `option analysis` for the solution class, stack, runtime, or deployment model
  - propose a `technical approach`
  - propose a `task plan`
  - propose a work item or change structure
- Example of a request that must still stop at the proposal stage:
  - a greenfield feature like `QR Voucher`, with UI, a voucher service API, and a brand visual tone in an empty repo, must not jump to scaffold or production code on its own
- In this state, AI must not on its own:
  - pin a `static site`, SPA, SSR, backend-first, CMS, or a specific framework as a final decision
  - scaffold an app skeleton, dependency tree, build system, Dockerfile, CI/CD, or deploy manifest as if the stack were approved
  - implement the first feature of the project as if the foundation decision were done
- For an `empty/greenfield project`, before `s07 Implement` there must be at minimum:
  - `s04` pass `Spec`
  - if the scope touches an `API contract` or `UX contract`, `s04` pass `Contract`
  - `s04` pass `DoR`
  - `s05` pass `Approach`
  - if `s05` holds a foundational decision such as solution class, stack, runtime, or deployment model, `s05` pass `Foundation Decision`
  - `s06` pass `Task Plan`
- If there is no clear evidence that the above gates have been human-passed, the correct behavior is to stop at the `proposal stage`, present options/trade-offs/recommendations, then wait for human review.
- The `safe default` for an `empty/greenfield project` is: do not implement; do not scaffold; do not pin the final stack on behalf of the human.
- The `bootstrap gate` for a new project must follow the order: `Spec -> Contract if present -> Approach -> Foundation if present -> work item approval -> Task Plan -> Implement`.

## Hard Rule: Brownfield Baseline And Delta Discipline

- Each work item must declare `delivery_context: greenfield|brownfield`; it must not be left implicit at the inference level after the workflow note has been materialized.
- For `brownfield`, AI must treat the existing system as the running baseline; the default is to change by the `smallest sufficient delta`, not to open a `Foundation Decision` on its own without a clear reason.
- For `brownfield`, before `s07 Implement`, the minimum output must include:
  - `s04` has an `Existing System Baseline`
  - `s05` has a `Brownfield Impact Analysis`
  - `s06` has a `Brownfield Delivery Plan`
- For `brownfield`, `s08` must have a `Regression & Compatibility Summary` before pinning `DoD`.
- For `brownfield`, `approval_gates.foundation` is only opened when the change actually touches the architectural baseline such as rewriting a boundary, changing the stack, changing the runtime, or changing the deployment model.

Recommended foundational artifacts:

- `project-context/constitution.md`: foundational principles of the project or team.
- `project-context/project-context.md`: the context, constraints, and preferences in effect.
- `project-context/governance-decision-model.md`: the decision rule for profile, status, and exception.
- `project-context/governance-role-model.md`: the authority model for role, signoff, exception, and waiver.
- `project-context/checklists/*.md`: reusable checklist profiles for readiness, review, or DoD.
- `project-context/governance-exception-register.md`: a register tracking open exceptions or waivers at the project/work-item level.

### Default Governance Pack Of The Repo

The repo Governance Pack has been materialized at `project-context/`.

Ready-to-use conventions:

- `governance_ref` defaults to `../../../../project-context/project-context.md`.
- `governance_profile=default`:
  use `../../../../project-context/checklists/default.md`.
- `governance_profile=strict`:
  use `../../../../project-context/checklists/strict.md`.
- `governance_profile=regulated`:
  use `../../../../project-context/checklists/regulated.md`.
- `governance_profile=custom`:
  should still inherit at least one foundational checklist profile and state the additional ref clearly.
- if a `governance-exception` stays open for more than one step or affects `DoD`, `release`, or `business_acceptance`, `../../../../project-context/governance-exception-register.md` must also be updated.

Minimum reading order:

1. `../../../../project-context/constitution.md`
2. `../../../../project-context/project-context.md`
3. `../../../../project-context/governance-decision-model.md`
4. `../../../../project-context/governance-role-model.md`
5. the matching checklist profile
6. `../../../../project-context/governance-exception-register.md` if the work item has an open exception or waiver

## SDD Layer: Spec Driven Development

Full SDD detail is in `references/spec-driven-development.md`.

Application principles:

- SDD does not create a new workflow; it adds constraints to the artifacts, gates, and traceability of the same eight-step workflow.
- When a work item is large enough to need a formal spec, `BRD` and `SRS` are the rollout source-of-truth; the workflow step note is the execution trace.
- The end of step 4 is the natural spec review/`spec-freeze-gate` point before going deep into the technical approach.
- From step 5 on, design/task/implementation/test must reference `BRD-*`, `SRS-*`, `AC-*`, `TASK-*`, `TEST-*` when the work item runs under SDD.
- If code or design finds a spec gap after the spec is frozen, a `spec-change` must be created instead of silently drifting the `SRS`.
- Step 8 must have a `spec-coverage-report` when the work item has a formal `SRS`.

## Workflow By Role

Full operational detail for roles, BRD/SRS, and NotebookLM retrieval is in `references/role-aware-workflow.md`.

General principles:

- A single eight-step workflow is still kept; a role is only an ownership and handoff overlay layer, not a separate workflow.
- Only split output by role when that role actually has an owner, handoff, or signoff that needs auditing.
- If a separate artifact is not needed, role outputs should be recorded in the main step note under a `## Role Outputs` block.
- `execution_roles` lists only roles that actually participate in the step; do not list default roles just to fill the set.
- `notebooklm` is a corpus storage and retrieval layer during execution; query results are only temporary input/evidence for PO/BA and must be normalized back into the main artifact if used for a decision.
- `BRD` and `SRS` are product rollout artifacts of the product development process, not a storage backend; a workflow step may create, update, or sign off these artifacts.

### BRD/SRS In Workflow Rollout

| Artifact | Main owner | Step that produces/updates | Content it should hold | Relationship with NotebookLM |
|---|---|---|---|---|
| `BRD` | `po`, `ba` support | `s01`, `s02`, `s03`, `s04`; signoff at `s08` when business acceptance is needed | business context, stakeholders, problem, goal, KPI, scope, out-of-scope, business rules, assumptions, decision log | NotebookLM may store and query reference sources, meeting notes, tickets, research; the conclusion must be recorded back into `BRD` if used for a decision |
| `SRS` | `ba`, `developer/qc/designer` review | `s03`, `s04`, `s05`, `s06`; verify at `s08` | functional requirements, NFRs, UX/system behavior, acceptance criteria, traceability, dependencies, constraints | NotebookLM may help find old requirements, policy, user flows, project documents; the final requirement must live in `SRS` or the source-of-truth workflow note |

Quick mapping:

- `s01`: create the initial `BRD` frame from the request and the retrieved context.
- `s02`: update `BRD` with business goal, KPI, priority, and scope boundary.
- `s03`: use search/project docs/NotebookLM to gather missing info, then update open questions or the decision log for `BRD/SRS`.
- `s04`: create or update `SRS` with requirements, business rules, acceptance criteria, and DoR.
- `s05`: use `SRS` as input for the technical approach; only update `SRS` if design finds a requirement/constraint that must change.
- `s06`: trace the task breakdown to requirements and AC in `SRS`.
- `s07`: implementation must follow `SRS`; if behavior changes outside spec, update `SRS` or record an exception before verify.
- `s08`: verify against `SRS`; `business_acceptance` confirms the implementation meets `BRD/SRS`, while `release` confirms the ship conditions are met.

### Default Role Matrix

| Role | Main steps | Main input | Main output | Foundational skills | Default signoff |
|---|---|---|---|---|---|
| `po` | `s01`, `s02`, `s04`, `s08` | vision, roadmap, stakeholder priority, KPI, scope boundary, business constraints, BRD draft | BRD sections, scope decision, success target, business decision, business acceptance verdict | `product-thinking`, `requirement-analysis`, `step-goal-contract` | `dor`, `business_acceptance` |
| `ba` | `s01`, `s03`, `s04`; supports `s02`, `s05`, `s06` | stakeholder notes, business rules, as-is flow, glossary, existing docs, policy/compliance context, NotebookLM/project search results, BRD | SRS sections, requirement brief, open questions, clarified rules, acceptance criteria, traceability | `requirement-analysis`, `product-thinking`, `step-goal-contract`, `notebooklm` when corpus retrieval is needed | supports `dor` |
| `designer` | `s01`, `s02`, `s04`, `s05` when the scope touches UX/UI; supports `s08` | user journey, screen context, brand/UI constraints, accessibility baseline, device/platform constraints | user flow, screen behavior, visual/interaction constraints, UX acceptance note | `frontend-experience-design`, `product-thinking`, `requirement-analysis`, `brainstorming` | `approach` for UX surface, supports `business_acceptance` |
| `developer` | `s05`, `s06`, `s07`; supports `s08` | DoR, acceptance criteria, codebase context, technical constraints, NFRs, architecture boundaries | technical approach, task breakdown, code/config changes, migration note, implementation note | `system-design`, `task-breakdown-planner`, `implementation`, `react-web-implementation` when needed | `approach` |
| `qc` | `s04`, `s08`; supports `s06`, `s07` | acceptance criteria, business rules, changed scope, environment matrix, testability risk | test strategy, scenario matrix, evidence, defect list, DoD verdict, release recommendation | `testing`, `code-scan-review`, `definition-of-done-gate`, `frontend-quality-review`, `react-best-practices-review`, `database-change-review` | `dod`, `release` |
| `devops` | `s05`, `s06`, `s07`, `s08` when there is packaging/runtime/release scope | runtime target, environment matrix, secrets/network/storage constraints, rollback requirement | deployment plan, packaging/runtime contract, pipeline/release plan, rollout note, rollback note, deployment review | `deployment-devops`, `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` | `release` |

### Role Matrix By Step

| Step | Default primary role | Common supporting roles | Main role outputs |
|---|---|---|---|
| `s01` Clarify | `po`, `ba` | `designer` when the scope touches UX/UI; `developer` when codebase context must be locked early | shared restatement, discovery framing, initial `BRD` frame, initial assumptions, stakeholder context |
| `s02` Business Goal | `po` | `ba`; `designer` when user value or a UX objective must be confirmed | `BRD` update for business goal, KPI, out-of-scope, business priority |
| `s03` Open Questions | `ba` | `po`, `designer`, `developer`, `qc`, `devops` depending on the blocker type | open questions by business, UX, technical, verify, release; NotebookLM/project-search evidence when used; readiness status; `BRD/SRS` decision log update |
| `s04` Acceptance + DoR | `ba`, `qc` | `po`; `designer` when criteria have a UX rule; `developer` when implementability must be checked | `SRS` update for requirements, business rules, measurable acceptance criteria, testability note, DoR decision |
| `s05` Technical Approach | `developer` | `designer` when there is a UX/UI surface; `devops` when there is runtime/release scope; `ba` to trace business rules | technical approach, architecture boundary, UX interaction contract, deployment contract, `SRS` update if a requirement/constraint changes |
| `s06` Task Plan | `developer` | `qc`, `devops`; `designer` when there is a UX refinement track | task plan by build, verify, release track; dependency, handoff, traceability to requirements in `SRS` |
| `s07` Implement | `developer` | `devops` when creating a delivery artifact; `designer` when there is asset/interaction polish; `qc` to prepare the evidence hook | code/config/doc changes, implementation note, in-scope packaging/runtime/pipeline artifacts, `SRS` exception/update if behavior changes |
| `s08` Verify + DoD | `qc` | `developer`, `devops`; `po` for `business_acceptance`; `designer` when a UX outcome review is needed | evidence pack, findings, DoD verdict, release readiness, business acceptance decision based on `BRD/SRS` |

### Default Owner For `role_signoffs`

| Signoff | Default owner | When to expand |
|---|---|---|
| `dor` | `po`, `ba` | Add `designer` when the scope depends on UX/UI to be considered ready; add `qc` when testability is the main risk |
| `approach` | `developer` | Add `designer` when the technical approach has an interaction or visual contract; add `devops` when the approach touches runtime, pipeline, or rollout |
| `task_plan` | `developer` | Add `qc` when verify coverage is the main risk; add `devops` when the plan has an important release or rollout lane |
| `release` | `qc`, `devops` | Add `developer` when there is no separate DevOps lane or the release risk is in migration/code path |
| `business_acceptance` | `po` | `ba` and `designer` should only review/support, not replace PO for the final acceptance if PO exists |
| `dod` | `qc` | `developer` or `devops` provide remediation evidence but do not replace the final verify ownership |

### Best Practice For Role-Aware Workflow

- `PO` should sign off business value and scope boundary, not sign off detailed technical approach in place of `developer`.
- `BA` should keep traceability across `s01 -> s04`; business rules should not exist only from step 5 on.
- `Designer` should join from discovery if the feature has a screen, interaction, content flow, or accessibility implication; do not push all UX decisions to the end of step 7.
- `QC` should join from `s04` so the criteria are verifiable, not only appear at `s08`.
- `DevOps` should join from `s05` if the feature has packaging, runtime, promotion, or rollback impact; do not let the release lane appear late at the end of verify.
- `Developer` is responsible for technical coherence across steps 5, 6, 7; do not split tasks when the approach is still vague.
- Only create a role-specific artifact when there is a real owner and handoff; by default keep one main step note as the source of truth.
- `business_spec` should be expressed clearly via `BRD`/`SRS` or an equivalent section in the workflow note; `business_acceptance` is the signoff confirming the final implementation meets that artifact set.
- `notebooklm` is used for corpus storage and retrieval during execution; do not treat a notebook/query result as the final rollout output unless it has been brought into `BRD`, `SRS`, or the main workflow note.

## Mandatory Rules For Obsidian Artifacts

- A `.md` note is the standard artifact for workflow docs; when a step is saved as a file, `.md` is the default source of truth.
- `json-canvas` and `obsidian-bases` may only be used as auxiliary artifacts; they must not hold a canonical decision that the `.md` note does not.
- `obsidian-cli` is not in the default scope of this workflow.

## Obsidian Layer Explained

The artifact rule does not replace workflow steps; it only governs how a step's result is scaffolded and recorded.

- If a step is not saved to a file, the workflow can still run normally.
- If a step is saved to a document, `.md` is the standard choice and comes with `obsidian-markdown`.
- If architecture or a task map needs to be visualized, `.canvas` only plays a supporting role for the `.md` note.
- If a summary table or dashboard is needed, `.base` only aggregates existing notes/artifacts; it does not become the main decision source.

A short way to remember:

- Write: `.md` -> `obsidian-markdown`
- Draw: `.canvas` -> `json-canvas`
- Aggregate: `.base` -> `obsidian-bases`

## Artifact Matrix By Step

| Step | Standard artifact | Allowed auxiliary artifacts | Required additional skills | Not used by default |
|---|---|---|---|---|
| `s01` Clarify | `.md` | None | `obsidian-markdown` if an artifact is saved | `.canvas`, `.base` |
| `s02` Business Goal | `.md` | None | `obsidian-markdown` if an artifact is saved | `.canvas`, `.base` |
| `s03` Open Questions | `.md` | None | `obsidian-markdown` if an artifact is saved | `.canvas`, `.base` |
| `s04` Acceptance + DoR | `.md` | None | `obsidian-markdown` if an artifact is saved | `.canvas`, `.base` |
| `s05` Technical Approach | `.md` | `.canvas` | `obsidian-markdown` for the standard note; `json-canvas` if there is a diagram | `.base` |
| `s06` Task Plan | `.md` | `.canvas`, `.base` | `obsidian-markdown` for the standard note; `json-canvas` if there is a task map; `obsidian-bases` if there is a dashboard | None outside the allowed list |
| `s07` Implement | No required workflow artifact; the source of truth is the real code/config/doc change | `.md` only when there are doc_changes or a handoff doc in scope | `obsidian-markdown` if creating/editing `.md` | `.canvas`, `.base` |
| `s08` Verify + DoD | `.md` | `.base` | `obsidian-markdown` for the standard report; `obsidian-bases` if there is an aggregation dashboard | `.canvas` |

## Applicable Laws

- If a step has `standard artifact = .md`, you must not deliver only `.canvas` or `.base` without a `.md` note.
- If both a standard artifact and an auxiliary artifact exist, every canonical decision, acceptance criterion, concluded risk, and next action must appear in the `.md` note first.
- `.canvas` is only used to visualize structure, flow, task map, or dependency map.
- `.base` is only used to aggregate, filter, view as a table, or dashboard from existing notes/artifacts.
- Step 7 only uses an Obsidian skill when the real change touches a `.md` document; do not force a separate workflow note if it adds no value.
- In the workflow note frontmatter, separate `content_skills` and `artifact_skills`; do not merge them to avoid confusing content-creation skills with artifact-creation skills.
- `upstream_artifacts` declares direct inputs; `## Traceability` connects the chain business -> readiness -> design -> implementation -> verify.

## Standard Output Template By Step

### General Conventions For `.md` Notes

- If a step is saved as a file, the `.md` note is the standard artifact and the source of truth.
- Use a fixed note structure in order:
  1. frontmatter
  2. title `# Step N - <step name>`
  3. `summary` callout
  4. required blocks per step
  5. `## Role Outputs` when the contribution of each business role needs clear tracing
  6. `## Spec Freeze`, `## Spec Change`, `## SDD Traceability`, or `## Spec Coverage` when the work item runs under SDD and the corresponding step needs that block
  7. `## Execution Topology` when the way the step is run needs tracing
  8. `## Traceability`
  9. `## Handoff`
  10. `## Links` if there are auxiliary artifacts
- The file name, frontmatter, and artifact links must all follow the same `work_item_slug`.
- For a step with auxiliary artifacts, link the auxiliary artifacts in `## Links`; do not bury canonical decisions in auxiliary artifacts.
- `## Role Outputs` is an optional block; turn it on only when a step has many roles sharing ownership, has role-specific handoff, or needs clear auditing of signoff contribution.
- In `## Role Outputs`, describe the actual contribution of each role to the step; do not repeat the summary verbatim or the overall step output if the role adds no separate ownership.
- SDD blocks are optional by scope; when `sdd_mode=strict`, step 4 should have `## Spec Freeze`, steps 5-7 have `## Spec Change` if a gap is found, step 6 has `## SDD Traceability`, and step 8 has `## Spec Coverage`.

### Naming Conventions

- `work_item_slug` is the standard identifier for a work item, written in `kebab-case`, only `[a-z0-9-]`.
- `step_id` always takes the form `s01` to `s08`.
- `step_slug` is the fixed slug of the step:
  - `s01 = restate`
  - `s02 = business-goal`
  - `s03 = open-questions`
  - `s04 = acceptance-criteria`
  - `s05 = technical-approach`
  - `s06 = task-breakdown`
  - `s07 = implementation`
  - `s08 = verification`
- Standard file names for the main note artifact:
  - `<work_item_slug>.s01.restate.md`
  - `<work_item_slug>.s02.business-goal.md`
  - `<work_item_slug>.s03.open-questions.md`
  - `<work_item_slug>.s04.acceptance-criteria.md`
  - `<work_item_slug>.s05.technical-approach.md`
  - `<work_item_slug>.s06.task-breakdown.md`
  - `<work_item_slug>.s07.implementation.md`
  - `<work_item_slug>.s08.verification.md`
- Standard file names for auxiliary artifacts:
  - step 5 canvas: `<work_item_slug>.s05.architecture.canvas`
  - step 5 execution runtime: `<work_item_slug>.s05.execution-policy.md`
  - step 6 canvas: `<work_item_slug>.s06.task-map.canvas`
  - step 6 base: `<work_item_slug>.s06.task-dashboard.base`
  - step 6 execution runtime: `<work_item_slug>.s06.worker-assignment.md`
  - step 7 execution runtime: `<work_item_slug>.s07.worker-handoff-report.md`
  - step 7 execution runtime: `<work_item_slug>.s07.merge-report.md`
  - step 8 base: `<work_item_slug>.s08.verification-dashboard.base`
  - step 8 execution runtime when needed: `<work_item_slug>.s08.execution-escalation.md`
- Do not use vague file names like `analysis.md`, `final.md`, `design-v2.md`, `notes.base`.
- Do not name workflow files by subjective content type such as `requirements.md`, `architecture.md`, `assessment.md`, `threshold.md`, `glossary.md`.
- Standard mapping:
  - `requirements` -> map to `s01.restate`, `s03.open-questions`, or `s04.acceptance-criteria` depending on the actual meaning.
  - `architecture` or `design` -> `s05.technical-approach.md`; if it is a diagram, `s05.architecture.canvas`.
  - `assessment` -> `s03.open-questions.md` if assessing input readiness, or `s08.verification.md` if assessing after implementation.
  - `threshold` -> do not split into a separate file; merge into `s04.acceptance-criteria.md`.
- `glossary` -> not a step file; only a section or a shared note outside the workflow step.
- If the team needs concise rules and a dedicated validator, see `policies/codex/workflow-artifact-naming.md`, use `wfc naming`, `wfc governance`, or run the standard command `wfc validate --workflow-root work-items --project-root <repo-root>`. If the repo has mapped root scripts, `npm run validate:workflow*` is the equivalent alias.
- If PR/push-level automation is needed instead of only local validate, see `workflow-ci-enforcement.md`.

### Standard Workflow Authoring

The public baseline `v1.0.0` uses the manual scaffold flow:

1. The human or coordinator pins the `work_item_slug`.
2. If the work item attaches to a change that has been split into a package, scaffold the change package first:
   - `wfc scaffold-change --change-id <CHANGE-ID> --work-item <work_item_slug>`
3. Scaffold the note with the standard command:
   - `wfc scaffold --work-item <work_item_slug> --planning-track <quick|full|enterprise>`
   - `wfc scaffold-step --work-item <work_item_slug> --step <sNN>`
4. Fill real content into the generated blocks.
5. Run the validator:
   - `wfc validate --workflow-root work-items --project-root <repo-root>`
   - if the work item runs under SDD, also run `wfc sdd --workflow-root work-items --project-root <repo-root>`
   - if the work item has a `change_id`, also run `wfc change --workflow-root work-items --project-root <repo-root>`
   - if the work item has execution metadata or runtime artifacts, also run `wfc exec --workflow-root work-items`
   - if the work item uses a non-default `planning_track` or you want to enforce the routing rule, also run `wfc plan --workflow-root work-items`

The extension after `v1.0.0` may add a gate before step 1:

1. Run `Work Item Materialization` to pin `split_decision`, `work_item_slug`, dedup result, and `change_strategy`.
2. If the project uses `Work Item Protocol`, pin `protocol_status`, authority, and handoff at the work-item level before scaffolding.

Notes:

- `Work Item Materialization` and `Work Item Protocol` are not part of the public baseline `v1.0.0`; read them only when you want to turn on the extension later.
- `scaffold:workflow` defaults to generating into `work-items/<work_item_slug>/` if `--workflow-root` is not passed.
- `work-items/` is the canonical artifact root for the repo's real workflow artifacts.
- `product-specs/` is the default root for real `BRD/SRS` when a work item runs under SDD.
- `changes/` is the default root for a real change package when a work item needs a `change layer`.
- `planning_track` defaults to `full`; if this field is absent in an old artifact, the validator currently treats it as `full` for backward compatibility.
- `scaffold:workflow-step` generates a minimal but contract-correct note for the chosen step; the `Governance Exceptions` and SDD blocks are added when the corresponding option requires it.
- If `execution_mode=multi_agent`, scaffold will auto-generate runtime artifacts for `s05`, `s06`, `s07` and add them to `linked_artifacts` of the main note.
- If `governance_profile=custom` is needed, scaffold must also pass `--governance-ref` and at least one `--checklist-ref`.
- `--work-item` is currently the short CLI name for `work_item_slug`.
- `work_item_slug` is the identifier of a unit of work that runs across the entire eight-step workflow, not a step name; it should be pinned before scaffolding from a user request, ticket, or change request, then reflected back in `s01 Clarify`.
- If a note belongs to a change package that has been scaffolded or linked to a real package, `change_id`, `change_status`, `spec_delta_refs`, and `archive_status` must be consistent with `changes/<change-id>/`.
- If a step runs `multi_agent`, `review_mode`, `verification_owner`, and `linked_artifacts` must be consistent with the corresponding runtime artifacts.
- Example: the user request "fix login timeout" can be mapped to `work_item_slug=fix-login-timeout`, which then creates files such as `fix-login-timeout.s01.restate.md`, `fix-login-timeout.s04.acceptance-criteria.md`, `fix-login-timeout.s08.verification.md`.

### Standard Frontmatter For The Main Note

````md
```yaml
---
artifact_id: "<work_item_slug>.s01.restate"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
delivery_context: greenfield|brownfield
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
change_status: draft|proposed|approved|in_progress|verified|archived|blocked
spec_delta_refs: []
archive_status: not_ready|ready_to_archive|archived
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
planning_track: quick|full|enterprise
execution_mode: agentic|multi_agent
execution_roles: []
  # list the business roles actually participating in the step, prefer the standard vocabulary like `po`, `ba`, `designer`, `developer`, `qc`, `devops`
review_mode: self|independent|auto_fix_loop
verification_owner: ""
approval_gates:
  spec: required|not_applicable
  contract: required|not_applicable
  foundation: required|not_applicable
  uat: required|not_applicable
  release: required|not_applicable
  business_acceptance: required|not_applicable
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
  # record which role holds the signoff duty for each human-controlled gate at the work-item level
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
  - codex-workflow-chain
  # add the business skills and gate skills actually used for the step
artifact_skills:
  - obsidian-markdown
upstream_artifacts: []
  # add upstream artifacts actually used as input or trace
linked_artifacts: []
  # only add auxiliary artifacts that have actually been created
tags:
  - agent-ops
  - workflow/s01
---
```
````

Rules:
- `artifact_id`, `work_item_slug`, `step_id`, `step_slug` must match the file name.
- `workflow_stage` uses `discovery` for steps 1-4 and `delivery` for steps 5-8.
- `work_item_type` uses one of `FEATURE|BUG|CHANGE|REFACTOR|RESEARCH`.
- `artifact_role` of the standard note is always `primary`.
- `artifact_kind` of the standard note is always `primary-note`.
- `source_of_truth` of the standard note is always `true`.
- `sdd_mode` uses `none` when the work item does not run under SDD, `light` when only light BRD/SRS tracing is needed, and `strict` when requirement IDs, spec freeze, the spec change protocol, and a coverage report are mandatory.
- `spec_refs` point to real `BRD/SRS` if a real file exists; leave empty when only a section in the workflow note is used.
- `spec_status` reflects the spec state at the time the note is updated; for SDD strict, steps 5-7 should not go deep while the spec is still only `draft` unless accepted assumptions exist.
- `planning_track` uses `quick` for small/low-risk scope, `full` for the normal baseline, and `enterprise` when a heavier review lane, governance, and planning depth are needed.
- `execution_mode` uses `agentic` when one agent holds full ownership of the step; uses `multi_agent` when the step is coordinated by a coordinator and multiple workers/verifiers.
- `execution_roles` must reflect the business roles that actually participated in the step; prefer the standard vocabulary `po|ba|designer|developer|qc|devops` and only add other roles when really needed.
- `review_mode` uses `self` for normal self-check, `independent` when the reviewer is separate from the main worker, and `auto_fix_loop` when verify has a recorded repeatable fix loop.
- `verification_owner` must record the role or owner responsible for the verify conclusion; with `review_mode != self` or `execution_mode=multi_agent`, this field should not be empty.
- `role_signoffs` records which role holds the signoff duty for `spec`, `contract`, `dor`, `approach`, `foundation`, `task_plan`, `uat`, `release`, `business_acceptance`, `dod`; it may be empty when the work item has not been assigned an owner, but a non-existent role must not be declared.
- `gate_reviews` records who reviewed a gate and when; for a note finalized at `s04`, `s05`, `s06`, `s08`, the main gate of the step must have both `*_reviewed_by` and `*_reviewed_at`.
- `business_spec` is the artifact describing business-side intent, rules, and scope; `business_acceptance` is the signoff action confirming the implementation meets that artifact and the related acceptance criteria; these two layers do not replace each other.
- Execution topology roles such as `coordinator`, `worker`, `verifier` should live in the `## Execution Topology` block, not replace `execution_roles` in the main frontmatter.
- `content_skills` must list enough business and gate skills used for that step.
- `artifact_skills` must list enough artifact-creation skills used for that step.
- `upstream_artifacts` only lists artifacts actually used as input or decision reference.
- `linked_artifacts` lists real auxiliary artifact file names; do not leave dead links.
- `tags` should have at minimum `agent-ops` and `workflow/<step-id>`.
- Unless specified otherwise, `governance_ref` should point to `project-context/project-context.md` and `checklist_refs` should point to the checklist by `governance_profile`.
- `governance_profile`, `governance_status`, and the trigger to open `governance-exception` must follow `project-context/governance-decision-model.md`.
- `change_id` is empty when the work item does not use a `change layer`; if it has a value, it must use a pattern like `CHANGE-001`.
- `change_status` only uses `draft|proposed|approved|in_progress|verified|archived|blocked`.
- `spec_delta_refs` is only filled when `change_id` is attached and must point to a real delta under `changes/<change-id>/spec-delta/`.
- `archive_status` uses `not_ready|ready_to_archive|archived` and must be consistent with the change package archive state.
- `multi_agent` in the current rollout should only be turned on for `s05-s08`; if it is on for `s05-s07`, the corresponding runtime artifacts must exist and be linked in `linked_artifacts`.
- `quick` should not use `multi_agent`, `review_mode != self`, or `sdd_mode=strict`; `enterprise` should have a stricter `governance_profile` than `default` and a clear review owner at delivery steps.

### Block To Add When Tracing Execution Topology

If the way the step was run needs to be recorded clearly, add this block right before `## Traceability` in the main note:

````md
## Execution Topology
```yaml
# use the `agentic-execution` or `multi-agent-plan` schema
```
````

Rules:

- `agentic` uses the `agentic-execution` schema.
- `multi_agent` uses the `multi-agent-plan` schema.
- This block does not replace `## Step Contract`; it only describes how the contract is executed.

### Required Blocks By Step

| Step | Standard file | Required blocks in the note | Schemas to fill |
|---|---|---|---|
| `s01` Clarify | `<work_item_slug>.s01.restate.md` | `## Step Contract`, `## Governance Context`, `## Main Artifact`, `## Requirement Analysis Spec` when needed, `## SDD Traceability` when needed, `## Traceability`, `## Handoff` | `step-goal-contract`, `governance-context`, step 1 artifact, `brd-spec` when needed |
| `s02` Business Goal | `<work_item_slug>.s02.business-goal.md` | `## Step Contract`, `## Main Artifact`, `## SDD Traceability` when needed, `## Traceability`, `## Handoff` | `step-goal-contract`, `product-thinking`, `brd-spec` when needed |
| `s03` Open Questions | `<work_item_slug>.s03.open-questions.md` | `## Step Contract`, `## Main Artifact`, `## Input Readiness`, `## Audit`, `## Governance Context` when there is a `governance blocker`, `## SDD Traceability` when needed, `## Traceability`, `## Handoff` | `step-goal-contract`, step 3 artifact, `input-readiness-assessor`, `step-goal-auditor`, `governance-context` when needed, `brd-spec` or `srs-spec` update when needed |
| `s04` Acceptance + DoR | `<work_item_slug>.s04.acceptance-criteria.md` | `## Step Contract`, `## Main Artifact`, `## Governance Checks`, `## Definition of Ready`, `## Spec Freeze` when SDD, `## SDD Traceability`, `## Traceability`, `## Handoff` | `step-goal-contract`, step 4 artifact, `governance-checklist`, `definition-of-ready-gate`, `srs-spec`, `spec-freeze-gate` when SDD |
| `s05` Technical Approach | `<work_item_slug>.s05.technical-approach.md` | `## Step Contract`, `## Option Analysis`, `## Main Artifact`, `## Architecture Details`, `## Governance Exceptions` when present, `## Spec Change` when present, `## SDD Traceability`, `## Traceability`, `## Handoff` | `step-goal-contract`, `brainstorming`, `system-design`, `governance-exception` when present, `spec-change` when present, `domain-architecture` or `frontend-architecture` or `frontend-experience-design` or `database-design` or `deployment-devops` or `containerization-packaging` or `platform-runtime-deployment` or `ci-cd-release` when present |
| `s06` Task Plan | `<work_item_slug>.s06.task-breakdown.md` | `## Step Contract`, `## Main Artifact`, `## Verification Plan`, `## Governance Checks`, `## SDD Traceability`, `## Traceability`, `## Handoff` | `step-goal-contract`, `task-breakdown-planner`, `governance-checklist`, `spec-traceability-matrix` when SDD |
| `s07` Implement | `<work_item_slug>.s07.implementation.md` if a note exists | `## Step Contract`, `## Main Artifact`, `## Implementation Notes` when present, `## Governance Exceptions` when present, `## Spec Change` when present, `## SDD Traceability`, `## Traceability`, `## Handoff` | `step-goal-contract`, `implementation`, `worktree-discipline` when present, `review-discipline` when present, `delegation-discipline` when present, `react-web-implementation` when present, `governance-exception` when present, `spec-change` when present |
| `s08` Verify + DoD | `<work_item_slug>.s08.verification.md` | `## Step Contract`, `## Main Artifact`, `## Governance Checks`, `## Spec Coverage`, `## Scan Summary`, `## Review Findings` when present, `## Database Review` when present, `## Deployment Review` when present, `## Governance Exceptions` when present, `## Audit`, `## Definition of Done`, `## SDD Traceability`, `## Traceability`, `## Handoff` | `step-goal-contract`, `testing`, `governance-checklist`, `spec-coverage-report` when SDD, `code-scan-review`, `frontend-quality-review` when present, `react-best-practices-review` when present, `database-change-review` when present, `branch-finish-discipline` when there is branch/worktree closeout, `governance-exception` when present, `deployment-devops` or `containerization-packaging` or `platform-runtime-deployment` or `ci-cd-release` when present, `step-goal-auditor`, `definition-of-done-gate` |

Notes:
- `step 1 artifact`, `step 3 artifact`, `step 4 artifact` are minimal schemas at the workflow level; they do not replace the detailed schema of a skill if the team wants to store more detail.
- At step 5, choose `domain-architecture`, `frontend-architecture`, `frontend-experience-design`, `database-design` by the real scope; do not force calling all if they are not relevant.
- At step 7, only create a note when the implementation has `doc_changes`, needs a separate handoff, or the user requests a doc artifact.
- For `work_item_type=REFACTOR`, step 4 should clearly fill `behavioral_invariants` to lock the scope where behavior does not change.
- For `work_item_type=RESEARCH`, step 8 should conclude a clear recommendation instead of only logging findings.

### Spec Emergence And Step-Level Contract

| Step | Main spec emerged | Standard block | Minimum contract |
|---|---|---|---|
| 1 | `restatement-spec`, `discovery-framing-spec` | `## Main Artifact` | `restated_request`, `work_item_type`, `user_problem_initial`, `business_context_initial`, `scope_draft`, `constraints_initial`, `assumptions_initial`, `open_questions_initial`, `dependencies_initial`, `risks_initial` |
| 1-3 when there is significant governance | `governance-context` | `## Governance Context` | `governance_ref`, `applicable_principles`, `required_reviews`, `prohibited_actions`, `open_governance_questions` |
| 1-2 when running SDD | `brd-spec` | `## Main Artifact` or artifact `<work_item_slug>.brd.md` | business context, stakeholders, problem, goal, KPI, scope, out-of-scope, business rules, assumptions, decision log |
| 1 if analyzing ticket/documents deeply | `requirement-analysis-spec` | `## Requirement Analysis Spec` | full schema of `requirement-analysis` |
| 2 | `business-goal-spec` | `## Main Artifact` | `product-thinking` schema |
| 3 | `readiness-spec` | `## Main Artifact`, `## Input Readiness`, `## Audit` | `open_questions`, `missing_inputs`, `conflicts`, `assumptions`, `READY|BLOCKED` status |
| 3-4 when running SDD | `srs-spec` | `## Main Artifact` or artifact `<work_item_slug>.srs.md` | functional requirements, NFRs, UX/system behavior, constraints, dependencies, acceptance refs |
| 4 | `acceptance-criteria-spec` | `## Main Artifact` | `acceptance_criteria`, `edge_cases`, `out_of_scope`, `done_when`, `behavioral_invariants` when `work_item_type=REFACTOR` |
| 4, 6, 8 when governance needs to be pinned | `governance-checklist` | `## Governance Checks` | applied checklist, per-check result, evidence, blocking items, owner/next action |
| 4 | `definition-of-ready` | `## Definition of Ready` | `definition-of-ready-gate` schema |
| 4 when running SDD | `spec-freeze-gate` | `## Spec Freeze` | BRD/SRS owner, requirement IDs, AC mapping, blockers, accepted assumptions, reviewer coverage |
| 5 | `option-analysis-spec` | `## Option Analysis` | `brainstorming` schema; at least 2 options, 1 recommended option |
| 5 | `technical-approach-spec` | `## Main Artifact` | `system-design` schema |
| 5 when deep boundary locking is needed | `architecture-detail-spec` | `## Architecture Details` | one or more specialized architecture schemas, including `frontend-experience-design`, `deployment-devops`, `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` when there is runtime delivery |
| 5, 7, 8 when there is a deviation | `governance-exception` | `## Governance Exceptions` | principle deviated, reason, impact, mitigation, owner, approve/waiver status |
| 5-7 when a spec gap is found | `spec-change` | `## Spec Change` | `spec-change` schema; do not let code/design drift from frozen spec if the change is not handled |
| 6 | `task-breakdown-spec` | `## Main Artifact` | `task-breakdown-planner` schema |
| 6 when running SDD | `spec-traceability-matrix` | `## SDD Traceability` | requirement refs -> AC refs -> task refs -> test refs |
| 7 | `implementation-spec` | `## Main Artifact` | `implementation` schema |
| 7 when workspace isolation must be pinned | `worktree-plan` | `## Implementation Notes` | `worktree-discipline` schema |
| 7 when early review in implement is needed | `review-plan` | `## Implementation Notes` | `review-discipline` schema |
| 7 when delegation is considered or turned on | `delegation-plan` | `## Implementation Notes` | `delegation-discipline` schema |
| 7 when framework-specific handoff is needed | `implementation-notes` | `## Implementation Notes` | `react-web-implementation` schema when the stack is React web or Next.js |
| 8 | `verification-spec` | `## Main Artifact`, `## Scan Summary`, `## Review Findings`, `## Database Review`, `## Deployment Review`, `## Audit` | `testing` schema; plus scan/review/audit schemas when present |
| 8 when running SDD | `spec-coverage-report` | `## Spec Coverage` | requirement refs -> AC refs -> task refs -> test refs -> `PASS|FAIL|PARTIAL|UNTESTED` |
| 8 when the scope has packaging or rollout | `deployment-review` | `## Deployment Review` | `deployment-devops` schema and possibly plus `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` |
| 8 when a branch/worktree must be closed | `branch-finish-check` | `## Audit` | `branch-finish-discipline` schema |
| 8 | `definition-of-done` | `## Definition of Done` | `definition-of-done-gate` schema |

Rules:
- Every step-level spec is bound by `## Step Contract`.
- `governance_ref` should point to `constitution` or `project-context` at the project/work-item level; do not force every step to create a separate governance artifact if it adds no value.
- `brainstorming` does not produce the final design spec; it only produces `option-analysis-spec` as input for `system-design`.
- For document/ticket analysis, do not generate a separate format; if a full artifact is needed, generate `requirement-analysis-spec` per the `requirement-analysis` skill schema.

### Step 1 Template. Clarify

Notes:

- The step templates below fully inherit the standard frontmatter in the `Standard Frontmatter For The Main Note` section.
- If the work item uses a `change layer`, the `change_id`, `change_status`, `spec_delta_refs`, `archive_status` fields must be kept in the frontmatter of each step note even though the shortened example below does not repeat the full explanation.
- If the work item uses `multi_agent`, the `review_mode`, `verification_owner`, and runtime artifacts fields must be kept in sync with the execution validator even though the shortened example below does not repeat the full runtime file.
- If the work item uses a non-`full` `planning_track`, the presets and guardrails of that track must be kept in sync with the planning validator even though the shortened example below does not repeat the full routing matrix.
- If you copy the template by hand, `wfc scaffold` is still the canonical source for the current frontmatter; at minimum keep `delivery_context`, `approval_gates`, `role_signoffs`, `gate_reviews`, and the required sections by `greenfield|brownfield`.````md
```md
---
artifact_id: "<work_item_slug>.s01.restate"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # list the business roles that actually participate in the step; prefer the standard vocabulary such as `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - codex-workflow-chain
  - requirement-analysis
  - product-thinking
  - step-goal-contract
artifact_skills:
  - obsidian-markdown
upstream_artifacts: []
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s01
---

# Step 1 - Clarify

> [!summary]
> Brief summary of the clarified request, along with the scope, constraints, and initial `governance context`.

## Step Contract
```yaml
# use the `step-goal-contract` schema
```

## Governance Context
```yaml
# use the `governance-context` schema
```

## Main Artifact
```yaml
raw_request: ""
restated_request: ""
request_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
user_problem_initial: ""
business_context_initial: ""
scope_draft:
  in: []
  out: []
constraints_initial: []
assumptions_initial: []
open_questions_initial: []
dependencies_initial: []
risks_initial: []
notes_for_step_2: ""
```

## Requirement Analysis Spec
```yaml
# use the `requirement-analysis` schema when step 1 actually analyzes a ticket, issue, or document into a full artifact
```

## Traceability
```yaml
# use the `traceability` schema
```

## Handoff
- What is clear:
- What still needs tracking:
- Conditions to move to step 2:
```
````

### Step 2 Template. Business Goal

````md
```md
---
artifact_id: "<work_item_slug>.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # list the business roles that actually participate in the step; prefer the standard vocabulary such as `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - codex-workflow-chain
  - product-thinking
  - step-goal-contract
artifact_skills:
  - obsidian-markdown
upstream_artifacts:
  - "<work_item_slug>.s01.restate.md"
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s02
---

# Step 2 - Business Goal

> [!summary]
> Brief summary of the user problem, the business goal, success metrics, and the non-goals.

## Step Contract
```yaml
# use the `step-goal-contract` schema
```

## Main Artifact
```yaml
# use the `product-thinking` schema
```

## Traceability
```yaml
# use the `traceability` schema
```

## Handoff
- Pinned user problem:
- Non-goals:
- Conditions to move to step 3:
```
````

### Step 3 Template. Open Questions

````md
```md
---
artifact_id: "<work_item_slug>.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # list the business roles that actually participate in the step; prefer the standard vocabulary such as `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - codex-workflow-chain
  - requirement-analysis
  - step-goal-contract
  - input-readiness-assessor
  - step-goal-auditor
artifact_skills:
  - obsidian-markdown
upstream_artifacts:
  - "<work_item_slug>.s01.restate.md"
  - "<work_item_slug>.s02.business-goal.md"
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s03
---

# Step 3 - Open Questions

> [!summary]
> Brief summary of the open questions, temporary assumptions in use, any `governance blocker`, and the readiness verdict.

## Step Contract
```yaml
# use the `step-goal-contract` schema
```

## Main Artifact
```yaml
open_questions: []
missing_inputs: []
conflicts: []
assumptions: []
```

## Input Readiness
```yaml
# use the `input-readiness-assessor` schema
```

## Audit
```yaml
# use the `step-goal-auditor` schema
```

## Governance Context
```yaml
# use the `governance-context` schema when a blocker or policy gap affects readiness
```

## Traceability
```yaml
# use the `traceability` schema
```

## Handoff
- Readiness status:
- What is needed to move to step 4:
```
````

### Step 4 Template. Acceptance + DoR

````md
```md
---
artifact_id: "<work_item_slug>.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # list the business roles that actually participate in the step; prefer the standard vocabulary such as `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - codex-workflow-chain
  - requirement-analysis
  - step-goal-contract
  - definition-of-ready-gate
artifact_skills:
  - obsidian-markdown
upstream_artifacts:
  - "<work_item_slug>.s01.restate.md"
  - "<work_item_slug>.s02.business-goal.md"
  - "<work_item_slug>.s03.open-questions.md"
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s04
---

# Step 4 - Acceptance + DoR

> [!summary]
> Brief summary of the verification scope, key edge cases, the `DoR` verdict, and the degree of fit with `governance`.

## Step Contract
```yaml
# use the `step-goal-contract` schema
```

## Main Artifact
```yaml
acceptance_criteria: []
edge_cases: []
out_of_scope: []
done_when: []
behavioral_invariants: []
```

## Governance Checks
```yaml
# use the `governance-checklist` schema
```

## Definition of Ready
```yaml
# use the `definition-of-ready-gate` schema
```

## Spec Freeze
```yaml
# use the `spec-freeze-gate` schema when `sdd_mode=light|strict`
```

## SDD Traceability
```yaml
# use the `spec-traceability-matrix` schema when `sdd_mode=light|strict`
```

## Traceability
```yaml
# use the `traceability` schema
```

## Handoff
- Mandatory criteria:
- Edge cases to preserve:
- Conditions to move to step 5:
```
````

### Step 5 Template. Technical Approach

````md
```md
---
artifact_id: "<work_item_slug>.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # list the business roles that actually participate in the step; prefer the standard vocabulary such as `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - codex-workflow-chain
  - system-design
  - brainstorming
  - step-goal-contract
  # add `domain-architecture` when in use
  # add `frontend-architecture` when in use
  # add `frontend-experience-design` when locking screen behavior, UI state, or responsive rules
  # add `database-design` when in use
  # add `deployment-devops` when pinning the overall DevOps picture
  # add `containerization-packaging` when locking `Dockerfile`, `.dockerignore`, `compose.yaml`
  # add `platform-runtime-deployment` when locking runtime `docker`, `swarm`, `k8s`
  # add `ci-cd-release` when locking pipeline, promotion, or approval
artifact_skills:
  - obsidian-markdown
  # add `json-canvas` only when an architecture canvas is actually created
upstream_artifacts:
  - "<work_item_slug>.s04.acceptance-criteria.md"
linked_artifacts: []
# add "<work_item_slug>.s05.architecture.canvas" if a canvas is actually created
tags:
  - agent-ops
  - workflow/s05
---

# Step 5 - Technical Approach

> [!summary]
> Brief summary of the recommended option, the main trade-offs, the architectural boundary to preserve, and any deviation from standard if present.

## Step Contract
```yaml
# use the `step-goal-contract` schema
```

## Option Analysis
```yaml
# use the `brainstorming` schema
```

## Main Artifact
```yaml
# use the `system-design` schema
```

## Architecture Details
```yaml
# use one or more related schemas:
# `domain-architecture`
# `frontend-architecture`
# `frontend-experience-design`
# `database-design`
# `deployment-devops` when pinning the overall DevOps picture
# `containerization-packaging` when locking `Dockerfile`, `.dockerignore`, `compose.yaml`
# `platform-runtime-deployment` when locking runtime `docker`, `swarm`, `k8s`
# `ci-cd-release` when locking pipeline, promotion, or approval
```

## Governance Exceptions
```yaml
# use the `governance-exception` schema when the approach needs to deviate from standard or needs a waiver
```

## Spec Change
```yaml
# use the `spec-change` schema when a spec gap or a needed behavior change is found
```

## SDD Traceability
```yaml
# use the `spec-traceability-matrix` schema when `sdd_mode=light|strict`
```

## Traceability
```yaml
# use the `traceability` schema
```

## Handoff
- Recommended option:
- Accepted trade-offs:
- Conditions to move to step 6:
- Deployment note when present:

## Links
- Add the architecture canvas link here if the artifact is actually created.
```
````

### Step 6 Template. Task Plan

````md
```md
---
artifact_id: "<work_item_slug>.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # list the business roles that actually participate in the step; prefer the standard vocabulary such as `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - codex-workflow-chain
  - task-breakdown-planner
  - step-goal-contract
  # add `deployment-devops` when pinning the overall DevOps picture
  # add `containerization-packaging` when locking `Dockerfile`, `.dockerignore`, `compose.yaml`
  # add `platform-runtime-deployment` when locking runtime `docker`, `swarm`, `k8s`
  # add `ci-cd-release` when locking pipeline, promotion, or approval
artifact_skills:
  - obsidian-markdown
  # add `json-canvas` only when a task map is actually created
  # add `obsidian-bases` only when a dashboard is actually created
upstream_artifacts:
  - "<work_item_slug>.s05.technical-approach.md"
linked_artifacts: []
# add auxiliary artifacts that are actually created, for example a task map or a dashboard
tags:
  - agent-ops
  - workflow/s06
---

# Step 6 - Task Plan

> [!summary]
> Brief summary of the task plan, dependencies, verify/review checkpoints, and the rollout note when present.

## Step Contract
```yaml
# use the `step-goal-contract` schema
```

## Main Artifact
```yaml
# use the `task-breakdown-planner` schema
```

## Verification Plan
- Mandatory checks:
- Risk note:
- Rollout note if present:

## Governance Checks
```yaml
# use the `governance-checklist` schema
```

## SDD Traceability
```yaml
# use the `spec-traceability-matrix` schema when `sdd_mode=light|strict`
```

## Traceability
```yaml
# use the `traceability` schema
```

## Handoff
- Tasks to do first:
- Blocking dependencies:
- Conditions to move to step 7:

## Links
- Add the task map link here if the artifact is actually created.
- Add the dashboard link here if the artifact is actually created.
```
````

### Step 7 Template. Implement

````md
```md
---
artifact_id: "<work_item_slug>.s07.implementation"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # list the business roles that actually participate in the step; prefer the standard vocabulary such as `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - codex-workflow-chain
  - implementation
  - worktree-discipline
  - review-discipline
  - delegation-discipline
  - step-goal-contract
  # add `react-web-implementation` when the stack is React web or Next.js
  # add `deployment-devops` when pinning the overall DevOps picture
  # add `containerization-packaging` when locking `Dockerfile`, `.dockerignore`, `compose.yaml`
  # add `platform-runtime-deployment` when locking runtime `docker`, `swarm`, `k8s`
  # add `ci-cd-release` when locking pipeline, promotion, or approval
artifact_skills:
  - obsidian-markdown
upstream_artifacts: []
  # add upstream artifacts actually used as input or trace for step 7
linked_artifacts: []
# add Dockerfile, compose, manifest, or pipeline artifacts when actually created
tags:
  - agent-ops
  - workflow/s07
---

# Step 7 - Implement

> [!summary]
> Brief summary of the actual changes made, evidence for `TDD/worktree/review/delegation`, remaining limits, and any `governance exception` if present.

## Step Contract
```yaml
# use the `step-goal-contract` schema
```

## Main Artifact
```yaml
# use the `implementation` schema
```

## Implementation Notes
```yaml
# use the `worktree-discipline`, `review-discipline`, `delegation-discipline` schemas
# when step 7 needs to lock execution discipline
# use the `react-web-implementation` schema when step 7 touches React web or Next.js
```

## Delivery Rule Evidence
```yaml
# record structured evidence for `behavior_change`, `tdd_status`, `worktree_status`,
# `review_status`, `spec_compliance_status`, `code_quality_status`,
# `delegation_mode`, `independence_status`, `merge_path`, `verify_path`
```

## Governance Exceptions
```yaml
# use the `governance-exception` schema when implementation raises a deviation that must be recorded
```

## Spec Change
```yaml
# use the `spec-change` schema when implementation finds that the frozen spec must change
```

## SDD Traceability
```yaml
# use the `spec-traceability-matrix` schema when `sdd_mode=light|strict`
```

## Traceability
```yaml
# use the `traceability` schema
```

## Handoff
- Actual outputs:
- Known limitations:
- Notes for testing:
- Notes for deployment when present:
```
````

### Step 8 Template. Verify + DoD

````md
```md
---
artifact_id: "<work_item_slug>.s08.verification"
artifact_family: workflow-step
work_item_slug: "<work_item_slug>"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none|light|strict
spec_refs:
  brd: ""
  srs: ""
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
execution_mode: agentic|multi_agent
execution_roles: []
  # list the business roles that actually participate in the step; prefer the standard vocabulary such as `po`, `ba`, `designer`, `developer`, `qc`, `devops`
role_signoffs:
  dor: []
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - codex-workflow-chain
  - testing
  - code-scan-review
  - branch-finish-discipline
  - step-goal-contract
  - step-goal-auditor
  - definition-of-done-gate
  # add `frontend-quality-review` when the change touches the UI surface
  # add `react-best-practices-review` when the stack is React web or Next.js and a render/data boundary review is needed
  # add `database-change-review` when a database change falls within the review scope
  # add `deployment-devops` when pinning the overall DevOps picture
  # add `containerization-packaging` when locking `Dockerfile`, `.dockerignore`, `compose.yaml`
  # add `platform-runtime-deployment` when locking runtime `docker`, `swarm`, `k8s`
  # add `ci-cd-release` when locking pipeline, promotion, or approval
artifact_skills:
  - obsidian-markdown
  # add `obsidian-bases` only when a verification dashboard is actually created
upstream_artifacts: []
  # add upstream artifacts actually used as input or trace for step 8; do not keep links to notes that do not exist
linked_artifacts: []
# add "<work_item_slug>.s08.verification-dashboard.base" if a dashboard is actually created
tags:
  - agent-ops
  - workflow/s08
---

# Step 8 - Verify + DoD

> [!summary]
> Brief summary of the PASS|FAIL|PARTIAL status, the level of `governance compliance`, the `UAT/Release/Business Acceptance` results when present, remaining gaps, and the `DoD` conclusion.

## Step Contract
```yaml
# use the `step-goal-contract` schema
```

## Main Artifact
```yaml
# use the `testing` schema
```

## Governance Checks
```yaml
# use the `governance-checklist` schema
```

## Spec Coverage
```yaml
# use the `spec-coverage-report` schema when `sdd_mode=light|strict`
```

## Scan Summary
```yaml
# use the `code-scan-review` schema
```

## UAT Summary
```yaml
# use the `testing` schema; mandatory when `approval_gates.uat=required`
```

## Release Summary
```yaml
# use the `testing` schema; mandatory when `approval_gates.release=required`
```

## Business Acceptance Summary
```yaml
# use the `testing` schema; mandatory when `approval_gates.business_acceptance=required`
```

## Review Findings
```yaml
# use the `frontend-quality-review` or `react-best-practices-review` schema when the step has a frontend or React review
```

## Database Review
```yaml
# use the `database-change-review` schema when the step has a database change
```

## Deployment Review
```yaml
# use the `deployment-devops` schema for the overall DevOps view
# plus `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` when a deeper layer-by-layer review is needed
```

## Governance Exceptions
```yaml
# use the `governance-exception` schema when an open deviation still exists at the time of verify
```

## Audit
```yaml
# use the `step-goal-auditor` schema
# plus `branch-finish-discipline` when step 8 needs to close out or merge a branch/worktree
```

## Definition of Done
```yaml
# use the `definition-of-done-gate` schema
```

## SDD Traceability
```yaml
# use the `spec-traceability-matrix` schema when `sdd_mode=light|strict`
```

## Traceability
```yaml
# use the `traceability` schema
```

## Handoff
- Overall status:
- Residual risks:
- Recommendation:
- Release recommendation when present:
- Next action:

## Links
- Add the verification dashboard link here if the artifact is actually created.
```
````

## Skill Output Templates

The schemas below are the reference for filling in the YAML blocks in the step note templates above.

### `artifact-step-1-restate`

```yaml
raw_request: ""
restated_request: ""
request_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
user_problem_initial: ""
business_context_initial: ""
scope_draft:
  in: []
  out: []constraints_initial: []
assumptions_initial: []
open_questions_initial: []
dependencies_initial: []
risks_initial: []
notes_for_step_2: ""
```

### `artifact-step-3-open-questions`

```yaml
open_questions: []
missing_inputs: []
conflicts: []
assumptions: []
```

### `artifact-step-4-acceptance-criteria`

```yaml
acceptance_criteria: []
edge_cases: []
out_of_scope: []
done_when: []
behavioral_invariants: []
```

### `governance-context`

```yaml
governance_ref: "project-context/project-context.md"
applicable_principles: []
constraints: []
prohibited_actions: []
required_reviews: []
mandatory_evidence: []
open_governance_questions: []
notes: ""
```

### `governance-checklist`

```yaml
checklist_name: ""
status: PASS|FAIL|PARTIAL|NOT_APPLICABLE
checks:
  - item: ""
    result: PASS|FAIL|PARTIAL|NOT_APPLICABLE
    evidence: ""
    owner: ""
    next_action: ""
blocking_items: []
notes: ""
```

### `governance-exception`

```yaml
exception_id: GOV-EX-001
principle_ref: ""
reason: ""
impact: ""
mitigation: []
approved_by: ""
status: PROPOSED|APPROVED|REJECTED|EXPIRED|RESOLVED
review_date: ""
notes: ""
```

### `brd-spec`

```yaml
business_context: ""
stakeholders: []
problem_statement: ""
business_goals:
  - id: BRD-001
    description: ""
    kpi_refs: []
scope:
  in: []
  out: []
business_rules:
  - id: BRD-002
    rule: ""
assumptions: []
decision_log: []
acceptance_notes: []
```

### `srs-spec`

```yaml
functional_requirements:
  - id: SRS-FR-001
    description: ""
    source_refs: []
    acceptance_refs: []
non_functional_requirements:
  - id: SRS-NFR-001
    category: performance|security|reliability|compatibility|compliance|observability|other
    description: ""
    acceptance_refs: []
ux_system_behavior:
  - id: SRS-UX-001
    description: ""
    acceptance_refs: []
constraints: []
dependencies: []
open_questions: []
```

### `spec-freeze-gate`

```yaml
work_item_slug: ""
status: FROZEN|APPROVED_WITH_ASSUMPTIONS|BLOCKED
checks:
  brd_owner_present: PASS|FAIL
  srs_owner_present: PASS|FAIL
  requirement_ids_present: PASS|FAIL
  acceptance_criteria_mapped: PASS|FAIL
  blocking_questions_resolved: PASS|FAIL
  role_reviewers_recorded: PASS|FAIL
accepted_assumptions: []
blocking_gaps: []
next_action: ""
```

### `spec-change`

```yaml
change_id: CHANGE-001
detected_in_step: s05|s06|s07|s08
impact_area: business|requirement|ux|technical|test|release
current_spec_refs: []
problem: ""
proposed_change: ""
decision: APPROVED|REJECTED|DEFERRED|BLOCKED
decision_owner: ""
updated_artifacts: []
required_followups: []
```

### `spec-traceability-matrix`

```yaml
items:
  - business_ref: BRD-001
    requirement_refs: [SRS-FR-001]
    acceptance_refs: [AC-001]
    task_refs: [TASK-001]
    test_refs: [TEST-001]
    status: PLANNED|IMPLEMENTED|VERIFIED|DEFERRED|BLOCKED
gaps: []
```

### `spec-coverage-report`

```yaml
coverage_items:
  - requirement_id: SRS-FR-001
    acceptance_refs: [AC-001]
    task_refs: [TASK-001]
    test_refs: [TEST-001]
    status: PASS|FAIL|PARTIAL|UNTESTED
    evidence: ""
    gaps: []
overall_status: PASS|FAIL|PARTIAL|BLOCKED
untested_requirements: []
residual_risks: []
business_acceptance_readiness: READY|READY_WITH_GUARDS|BLOCKED
release_readiness: READY|READY_WITH_GUARDS|BLOCKED|NOT_APPLICABLE
```

### `traceability`

```yaml
business_refs: []
spec_refs: []
requirement_refs: []
readiness_refs: []
acceptance_refs: []
design_refs: []
task_refs: []
implementation_refs: []
verification_refs: []
```

### `role-output-map`

```yaml
roles:
  - role: po|ba|designer|developer|qc|devops
    involvement: primary|support|approve|observe
    inputs: []
    outputs: []
    skills: []
    signoffs: []
    upstream_artifacts: []
    downstream_artifacts: []
    notes: ""
```

Rules:

- `role` must be a subset of `execution_roles` in the same note.
- `signoffs` only uses the values in `role_signoffs`; at minimum it includes `spec`, `contract`, `dor`, `approach`, `foundation`, `task_plan`, `uat`, `release`, `business_acceptance`, `dod`.
- `inputs` and `outputs` must correctly describe the role's contribution to the step; do not repeat the entire common contract of the step.
- `upstream_artifacts` and `downstream_artifacts` only link real artifacts or standard artifacts of the workflow chain.

### `agentic-execution`

```yaml
execution_mode: agentic
agent_role: ""
step_goal_ref: ""
owned_scope: []
selected_content_skills: []
selected_artifact_skills: []
loop:
  - phase: contract
    objective: ""
  - phase: readiness
    objective: ""
  - phase: execute
    objective: ""
  - phase: self_check
    objective: ""
  - phase: audit
    objective: ""
  - phase: handoff
    objective: ""
self_checks: []
handoff_target: ""
final_decision: COMPLETE|REWORK|BLOCKED
notes: ""
```

### `multi-agent-plan`

```yaml
execution_mode: multi_agent
coordinator_role: ""
shared_goal: ""
step_goal_ref: ""
worker_assignments:
  - role: ""
    owned_scope: []
    owned_paths: []
    skills: []
    outputs_expected: []
    handoff_to: coordinator
merge_strategy: ""
conflict_rules: []
verification_owner: ""
completion_rule: ""
final_decision: COMPLETE|PARTIAL|BLOCKED
residual_risks: []
notes: ""
```

### `brainstorming`

```yaml
goal: ""
ba_lane:
  business_goal: ""
  user_scenarios: []
  business_rules: []
  scope_notes: []
  open_questions: []
dev_lane:
  repo_constraints: []
  technical_risks: []
  integration_points: []
  nfr_notes: []
  baseline_context: ""
options:
  - name: "Option A"
    summary: ""
    pros: []
    cons: []
    risks: []
recommended_option: ""
recommendation_reason: ""
validation_plan: []
notes_for_next_step: ""
```

### `system-design`

```yaml
design_problem: ""
business_rule_trace: []
design_options:
  - name: ""
    summary: ""
    pros: []
    cons: []
    risks: []
rejected_options:
  - name: ""
    reason: ""
recommended_design: ""
recommendation_reason: ""
component_changes: []
data_flow: []
interface_changes: []
failure_modes:
  - scenario: ""
    impact: ""
    guardrail: ""
compatibility_impact: []
rollback_impact: []
observability_hooks: []
constraints_applied: []
validation_plan: []
specialized_followups:
  - skill: ""
    reason: ""
notes_for_next_step: ""
```

### `domain-architecture`

```yaml
architecture_style: DOD|DDD_LITE|DDD
domain_modules:
  - name: ""
    purpose: ""
    responsibilities: []
    owned_data: []
bounded_contexts:
  - name: ""
    language_scope: ""
    upstream_dependencies: []
    downstream_dependencies: []
ownership_map: []
interaction_rules: []
layer_rules:
  presentation: []
  application: []
  domain: []
  infrastructure: []
aggregate_candidates: []
architecture_risks: []
notes_for_next_step: ""
```

### `frontend-architecture`

```yaml
frontend_style: MODULE_FIRST|MODULE_FIRST_WITH_FLOWS|MICRO_FRONTEND
app_shell:
  responsibilities: []
  owns: []
feature_modules:
  - name: ""
    purpose: ""
    owned_routes: []
    owned_state: []
    public_contracts: []
flows:
  - name: ""
    purpose: ""
    composes_modules: []
    owns_state: []
shared_areas:
  - area: ""
    allowed_contents: []
    forbidden_contents: []
interaction_rules: []
state_ownership_rules: []
routing_rules: []
architecture_risks: []
notes_for_next_step: ""
```

### `frontend-experience-design`

```yaml
experience_target: ""
primary_user_outcomes: []
frontend_surfaces:
  - surface: ""
    purpose: ""
    priority: CORE|SUPPORTING|AUXILIARY
interaction_model:
  entry_points: []
  navigation_rules: []
  primary_actions: []
  secondary_actions: []
  feedback_rules: []
surface_states:
  - surface: ""
    loading: ""
    empty: ""
    error: ""
    success: ""
    blocked: ""
layout_rules:
  information_hierarchy: []
  responsive_rules: []
  density_rules: []
visual_rules:
  tone_keywords: []
  emphasis_rules: []
  color_constraints: []
  typography_constraints: []
  motion_rules: []
accessibility_baseline:
  keyboard_flow: []
  screen_reader_notes: []
  contrast_rules: []
  touch_target_rules: []
performance_guards: []
design_system_hooks: []
validation_checks: []
notes_for_next_step: ""
```

### `database-design`

```yaml
data_model:
  entities: []
  aggregates: []
tables:
  - name: ""
    purpose: ""
    owner_module: ""
    columns: []
    primary_key: []
relationships: []
constraints:
  uniques: []
  foreign_keys: []
  checks: []
indexes:
  - table: ""
    columns: []
    purpose: ""
read_write_patterns:
  writes: []
  reads: []
retention_rules: []
audit_rules: []
design_risks: []
notes_for_next_step: ""
```

### `database-change-review`

```yaml
review_scope: []
migration_plan:
  steps: []
  deployment_order: []
backfill_plan:
  required: true|false
  strategy: ""
  safety_controls: []
rollback_plan:
  possible: true|false
  strategy: ""
compatibility_risks: []
lock_risks: []
query_risks: []
retention_risks: []
release_recommendation: GO|GO_WITH_GUARDS|NO_GO
required_actions: []
evidence: []
```

### `deployment-devops`

```yaml
deployment_scope: ""
devops_objectives: []
environment_matrix:
  - environment: local|dev|uat|prod
    concerns: []
    runtime_target: ""
specialized_followups:
  - skill: containerization-packaging|platform-runtime-deployment|ci-cd-release
    reason: ""
    outputs_expected: []
cross_cutting_guards: []
evidence_or_gaps: []
release_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation_or_release: ""
```

### `containerization-packaging`

```yaml
packaging_scope: ""
language_profile:
  primary_language: ""
  framework: ""
  build_system: ""
  artifact_type: ""
workload_profile: web_api|worker|cron|frontend_static|monolith|microservice
dockerfile_contract:
  file_path: ""
  build_context: ""
  base_images: []
  stages: []
  build_args: []
  artifact_paths: []
  entrypoint: ""
  command: ""
  exposed_ports: []
  run_as_non_root: true|false
dockerignore_rules: []
local_compose_contract:
  required: true|false
  file_path: ""
  services: []
  env_files: []
  volumes: []
  profiles: []
build_optimizations: []
security_guards: []
verification_checks: []
packaging_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation: ""
```

### `platform-runtime-deployment`

```yaml
deployment_scope: ""
runtime_matrix:
  - environment: dev|uat|prod
    runtime: docker|swarm|k8s
    deployment_unit: ""
    topology: ""
    networking: []
    config_strategy: []
    secret_strategy: []
    storage_strategy: []
    scaling_strategy: []
runtime_artifacts:
  - environment: ""
    files_expected: []
operational_policies:
  health_policies: []
  observability_controls: []
  resource_controls: []
  disruption_controls: []
rollout_and_rollback:
  - environment: ""
    rollout_strategy: ""
    preconditions: []
    post_deploy_checks: []
    rollback_steps: []
platform_risks: []
runtime_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation_or_ops: ""
```

### `ci-cd-release`

```yaml
pipeline_scope: ""
source_strategy:
  branch_model: ""
  triggers: []
build_and_verify:
  stages: []
  cache_strategy: []
  required_checks: []
artifact_flow:
  registry: ""
  artifact_types: []
  tagging_strategy: []
  provenance_controls: []
promotion_flow:
  - from: local|dev|uat
    to: dev|uat|prod
    conditions: []
    automation_level: ""
approval_controls: []
release_controls:
  pre_release: []
  post_release: []
rollback_controls: []
pipeline_risks: []
pipeline_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation_or_ops: ""
```

### `task-breakdown-planner`

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

### `worktree-discipline`

```yaml
worktree_target: ""
planning_track: quick|full|enterprise
risk_signals: []
worktree_decision: REQUIRED|RECOMMENDED|OPTIONAL|NOT_NEEDED
decision_reason: []
isolation_strategy:
  branch_name: ""
  worktree_path: ""
  owned_paths: []
  expected_duration: ""
execution_guards: []
skip_reason: ""
cleanup_preconditions: []
notes_for_implementation: ""
```

### `review-discipline`

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

### `delegation-discipline`

```yaml
delegation_target: ""
planning_track: quick|full|enterprise
execution_mode_recommendation: AGENTIC|SUBAGENT|MULTI_AGENT|SEQUENTIAL_MULTI_ROLE
independence_checks:
  owned_scope_clear: PASS|FAIL
  owned_paths_clear: PASS|FAIL
  merge_path_clear: PASS|FAIL
  verify_path_clear: PASS|FAIL
worker_assignments:
  - role: ""
    task: ""
    owned_scope: []
    owned_paths: []
    outputs_expected: []
merge_strategy: []
verify_strategy: []
blocked_reasons: []
coordination_guards: []
notes_for_execution: ""
```

### `implementation`

```yaml
recommended_design: ""
implementation_mode: FEATURE|BUGFIX|REFACTOR|HARDENING
tasks_completed: []
bug_repro_evidence: []
hypothesis_log:
  - assumption: ""
    status: CONFIRMED|REJECTED|OPEN
    evidence: ""debug_experiments:
  - goal: ""
    action: ""
    result: ""
tdd_evidence:
  - behavior: ""
    failing_test: ""
    passing_test: ""
safe_refactor_notes: []
code_changes: []
doc_changes: []
config_changes: []
review_checkpoints: []
outputs_actual: []
known_limitations: []
follow_up_items: []
notes_for_testing: ""
```

### `react-web-implementation`

```yaml
implementation_target: ""
framework_context:
  stack: ""
  routing_mode: ""
  rendering_mode: []
component_boundary_notes: []
server_client_split_plan: []
data_fetching_plan: []
state_and_context_plan: []
effect_usage_rules: []
rendering_and_loading_plan: []
performance_guards_applied: []
files_or_modules_touched: []
notes_for_review: ""
```

### `testing`

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

### `branch-finish-discipline`

```yaml
finish_target: ""
workspace_kind: BRANCH|WORKTREE|BOTH
verify_inputs: []
finish_gate_checks:
  verify_complete: PASS|FAIL|PENDING
  dod_complete: PASS|FAIL|PENDING
  findings_closed: PASS|FAIL|PENDING
  exceptions_resolved: PASS|FAIL|PENDING
allowed_actions: []
blocked_actions: []
cleanup_sequence: []
merge_conditions: []
residual_risks: []
final_recommendation: CLEANUP_ALLOWED|MERGE_ALLOWED|HOLD_OPEN
notes_for_closeout: ""
```

### `code-scan-review`

```yaml
scan_target: ""
scan_scope:
  mode: DIFF_ONLY|AFFECTED_MODULES|FULL_REPO
  changed_files: []
  affected_modules: []
language_stack: []
available_scan_tools: []
false_positive_policy: "Diff-aware, evidence-based, dismiss only with reason"
scan_plan:
  syntax: []
  static_analysis: []
  security: []
  performance_heuristic: []
syntax_scan_results:
  - command: ""
    scope: []
    status: PASS|FAIL|SKIP
    evidence: ""
    blocker_files: []
static_analysis_results:
  - command: ""
    config_used: ""
    scope: []
    status: PASS|FAIL|SKIP
    findings: []
    new_blockers: []
security_scan_results:
  - command_or_check: ""
    scope: []
    status: PASS|FAIL|SKIP
    findings:
      - severity: HIGH|MEDIUM|LOW
        confidence: HIGH|MEDIUM|LOW
        category: ""
        file: ""
        line: 0
        issue: ""
        evidence: ""
        recommendation: ""
        false_positive_reason: ""
performance_heuristic_results:
  - check: ""
    scope: []
    status: PASS|FAIL|SKIP
    expected_impact: HIGH|MEDIUM|LOW
    confidence: HIGH|MEDIUM|LOW
    trigger_condition: ""
    evidence: ""
skipped_scans: []
overall_status: PASS|FAIL|PARTIAL
remediation_actions: []
notes_for_verify: ""
```

### `frontend-quality-review`

```yaml
review_target: ""
review_scope:
  surfaces: []
  devices: []
  critical_flows: []
quality_gates:
  accessibility: REQUIRED|OPTIONAL
  responsive_layout: REQUIRED|OPTIONAL
  interaction_feedback: REQUIRED|OPTIONAL
  form_and_validation: REQUIRED|OPTIONAL
  navigation_clarity: REQUIRED|OPTIONAL
  performance_heuristic: REQUIRED|OPTIONAL
  visual_consistency: REQUIRED|OPTIONAL
findings:
  - severity: HIGH|MEDIUM|LOW
    area: ACCESSIBILITY|RESPONSIVE|INTERACTION|FORM|NAVIGATION|PERFORMANCE|VISUAL
    surface: ""
    issue: ""
    evidence: ""
    recommendation: ""
criteria_results:
  - criterion: ""
    result: PASS|FAIL|PARTIAL
    evidence: ""
checks_run: []
checks_skipped: []
overall_status: PASS|FAIL|PARTIAL
residual_risks: []
handoff_recommendation: ""
notes_for_review: ""
```

### `react-best-practices-review`

```yaml
review_target: ""
framework_context:
  stack: ""
  rendering_mode: []
  routing_mode: ""
review_gates:
  server_client_boundary: REQUIRED|OPTIONAL
  data_fetching: REQUIRED|OPTIONAL
  effect_hygiene: REQUIRED|OPTIONAL
  state_placement: REQUIRED|OPTIONAL
  context_scope: REQUIRED|OPTIONAL
  render_stability: REQUIRED|OPTIONAL
  list_rendering: REQUIRED|OPTIONAL
  hydration_bundle_cost: REQUIRED|OPTIONAL
  component_api_shape: REQUIRED|OPTIONAL
findings:
  - severity: HIGH|MEDIUM|LOW
    area: SERVER_CLIENT|DATA_FETCHING|EFFECT|STATE|CONTEXT|RENDER|LIST|HYDRATION|COMPONENT_API
    component_or_route: ""
    issue: ""
    evidence: ""
    recommendation: ""
criteria_results:
  - criterion: ""
    result: PASS|FAIL|PARTIAL
    evidence: ""
checks_run: []
checks_skipped: []
overall_status: PASS|FAIL|PARTIAL
residual_risks: []
handoff_recommendation: ""
notes_for_verify: ""
```

### `step-goal-contract`

```yaml
step: ""
goal: ""
value: ""
scope_in: []
scope_out: []
inputs_required: []
outputs_required: []
done_when: []
constraints:
  hard_constraints: []
  soft_constraints: []
  prohibited_actions: []
  compliance_checks: []
risks:
  - id: ""
    description: ""
    likelihood: LOW|MEDIUM|HIGH
    impact: LOW|MEDIUM|HIGH
    severity: LOW|MEDIUM|HIGH
    mitigation: ""
    contingency: ""
    owner: ""
    status: OPEN|MONITORING|CLOSED
timebox:
  target_duration: ""
  deadline: ""
  escalation_rule: ""
governance:
  governance_ref: "project-context/project-context.md"
  applicable_principles: []
  checklist_refs:
    - "project-context/checklists/default.md"
  exception_policy: NONE|RECORD_REQUIRED|WAIVER_REQUIRED
```

### `input-readiness-assessor`

```yaml
step: ""
status: READY|BLOCKED
available_inputs: []
missing_inputs: []
invalid_inputs: []
conflicts: []
assumptions: []
risk_level: LOW|MEDIUM|HIGH
next_action: ""
```

### `step-goal-auditor`

```yaml
step: ""
status: PASS|FAIL|PARTIAL
checks:
  - criterion: ""
    result: PASS|FAIL
    evidence: ""
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: true|false
timebox_evidence: ""
gaps: []
risk_level: LOW|MEDIUM|HIGH
next_action: ""
```

### `definition-of-ready-gate`

```yaml
work_item_slug: ""
status: READY|BLOCKED
checks:
  restated_request_clear: PASS|FAIL
  business_goal_clear: PASS|FAIL
  scope_defined: PASS|FAIL
  open_questions_non_blocking: PASS|FAIL
  acceptance_criteria_testable: PASS|FAIL
  dependencies_known: PASS|FAIL
  verification_direction_present: PASS|FAIL
  governance_context_recorded: PASS|FAIL|NOT_APPLICABLE
  governance_requirements_reflected: PASS|FAIL|NOT_APPLICABLE
  governance_blockers_resolved_or_owned: PASS|FAIL|NOT_APPLICABLE
  sdd_spec_owner_present: PASS|FAIL|NOT_APPLICABLE
  sdd_requirement_ids_present: PASS|FAIL|NOT_APPLICABLE
  sdd_spec_freeze_ready: PASS|FAIL|NOT_APPLICABLE
blocking_gaps: []
accepted_assumptions: []
residual_risks: []
next_action: ""
```

### `definition-of-done-gate`

```yaml
work_item_slug: ""
status: DONE|PARTIAL|BLOCKED
checks:
  acceptance_criteria_evidenced: PASS|FAIL
  implementation_recorded: PASS|FAIL
  required_verification_completed: PASS|FAIL
  code_scan_completed_or_justified: PASS|FAIL
  traceability_complete: PASS|FAIL
  governance_checks_completed_or_justified: PASS|FAIL|NOT_APPLICABLE
  governance_exceptions_recorded_or_resolved: PASS|FAIL|NOT_APPLICABLE
  spec_coverage_completed_or_justified: PASS|FAIL|NOT_APPLICABLE
  spec_changes_resolved: PASS|FAIL|NOT_APPLICABLE
  residual_risks_documented: PASS|FAIL
gaps: []
residual_risks: []
follow_up_items: []
next_action: ""
```

## Mapping Between Step And Metadata

- `goal`: describes the result state the step must reach.
- `input`: the data needed for the step to start safely.
- `output`: the mandatory artifact the step must produce.
- `done_when`: verifiable completion conditions.
- `constraints`: limits that must not be violated during execution.
- `risks`: risks to monitor and the handling plan.
- `timebox`: the time limit or deadline of the step.

## Language Gate And Encoding

Default policy:
- Communication with users: English.
- Documentation and handoff reports: English (unless the user requests another language).
- Vietnamese is retained as a supplementary reference via `*.vi.md` siblings for the Vietnamese community.

When changing text files (`.md`, `.txt`, `.yml`, `.yaml`, `.json`):
- Save as UTF-8.
- Ensure accented characters (in Vietnamese supplement files) display correctly.
- Ensure no replacement characters (U+FFFD) appear in the content.

Quick check commands:

```powershell
python -c "from pathlib import Path; import sys; [Path(f).read_text(encoding='utf-8') for f in sys.argv[1:]]; print('UTF-8 OK')" <list-of-changed-files>
powershell -NoProfile -Command "`$replacement = [char]0xFFFD; Select-String -Path <list-of-changed-files> -Pattern `$replacement"
```

If any check fails:
- Stop the handoff.
- Fix the encoding or content first.
- Re-run the check.

## Stack-Specific Quality Gate Hints

JavaScript/TypeScript:
- `npm test`
- `npm run lint`
- `npm run build`
- `npm run typecheck`

Python:
- `pytest`
- `ruff check .`
- `mypy .`

PHP:
- `phpunit`
- `phpstan`
- `php -l` to check syntax

Go:
- `go test ./...`
- `go vet ./...`

Rust:
- `cargo test`
- `cargo clippy -- -D warnings`

## Report Template

- Plan: <steps taken>
- Changes: <files and behavior changes>
- Verification: <commands and results>
- Risks: <remaining points to note>
- Next step: <optional>