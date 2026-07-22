---
language: en
name: codex-workflow-chain
description: Apply the 8-step coding workflow to software development tasks using Codex. Use for coding, debugging, refactoring, writing tests, automation scripts, feature delivery, and the local -> dev -> uat -> prod DevOps flow. The workflow keeps a single chain with short names: Clarify, Business Goal, Open Questions, Acceptance + DoR, Technical Approach, Task Plan, Implement, Verify + DoD; with business -> design -> code -> verify traceability, a governance overlay, an SDD overlay, role signoff, release readiness, and a clear split between business skills and artifact skills.
---

# Coding Workflow Chain For Codex

> Vietnamese: SKILL.vi.md

Follow the 8-step delivery workflow for coding tasks.

## Model Principle

- The workflow chain in this skill is the 8-step delivery chain for a specific coding request.
- Each step in the workflow is a real business step, not a descriptive field.
- `goal`, `input`, `output`, `done_when`, `constraints`, `risks`, `timebox` are metadata of each step used to lock the contract and control handoff.
- When describing `input` and `output`, always write the business meaning first; keep technical spec names in parentheses only for traceability.
- Metadata is not a separate workflow step.
- Skills are attached to a step to support execution and quality control; they do not replace the step.
- `agentic` and `multi-agent` are the execution topology layer of a step; they describe how a step is operated, they are not new workflow steps and do not replace business skills.
- Discovery and delivery live in one chain; they are not split into a separate workflow, but are layered using `workflow_stage`.

## Language Gate And Encoding

- Default to communicating with the user in English.
- Default to document content and reports in English, unless another language is requested.
- When editing text files, store as UTF-8 and check for encoding errors before handoff, including Vietnamese diacritics in `*.vi.md` supplement files.

## Obsidian Artifact Rule

- The standard artifact for a workflow doc is a `.md` note; if a step is scaffolded into a file, the default file is `.md` and `obsidian-markdown` must be used.
- For a `.canvas` artifact used for architecture diagrams, flows, or task maps, apply `json-canvas`.
- For a `.base` artifact used as an index, dashboard, or note summary table, apply `obsidian-bases`.
- `.canvas` and `.base` are only auxiliary artifacts; they do not replace the `.md` note as the source of truth for decisions and conclusions.
- `obsidian-cli` is not currently required in this workflow chain.
- If a step is saved as a `.md` note, use the standard output template per step in `references/workflow-chain.md`, including naming, frontmatter, and the matching contract/spec block.

## Metadata And Traceability Rule

- For a workflow note, prefer splitting `content_skills` and `artifact_skills` instead of merging everything into one shared skill field.
- `content_skills` records skills that create business content or quality gates.
- `artifact_skills` records skills used to create `.md`, `.canvas`, `.base` notes.
- Each scaffolded workflow note should have `work_item_type`, `workflow_stage`, `upstream_artifacts`, `linked_artifacts`.
- Each scaffolded workflow note should have a `## Traceability` block to trace business -> readiness -> design -> implementation -> verify.

## Execution Topology Rule

- This chain should be understood along 6 parallel layers: `step`, `governance`, `SDD`, `content skill`, `artifact`, and `execution topology`.
- `agentic` is used when one agent has enough ownership to run the full loop `contract -> readiness -> execute -> self-check -> audit -> handoff`.
- `multi-agent` is used when you need to separate `coordinator`, `worker`, and `verifier`, or when there are many ownership boundaries that can run in parallel.
- Execution topology must always follow the same `step-goal-contract`; do not create coordination logic that drifts the goal, scope, or gate of the step.
- `governance` is a thin shared layer: most of it is embedded in the step contract/gate, the rest lives in `constitution`, `project-context`, `checklist`, and `exception`.
- In prose you may write `multi-agent`, but in schemas and frontmatter use `multi_agent`; if the runtime does not support stable delegation, fall back to `sequential_multi_role` per the execution policy.
- If you scaffold a workflow note, declare `execution_mode`, `execution_roles`, `review_mode`, `verification_owner`, `approval_gates`, `role_signoffs`, and `gate_reviews`; `execution_roles` reflects business roles such as `po`, `ba`, `designer`, `developer`, `qc`, `devops`, while `role_signoffs` should track at minimum `spec`, `contract`, `dor`, `approach`, `foundation`, `task_plan`, `uat`, `release`, `business_acceptance`, `dod`. `gate_reviews` records the actual human reviewer and review time for each gate. Operational roles such as `coordinator` or `verifier` are traced in the `## Execution Topology` block or runtime artifacts.
- If a work item needs planning-depth routing, declare `planning_track=quick|full|enterprise` at scaffold time to preset the right governance/review.
- If a step has multiple business roles participating or needs role-based handoff/signoff audit, prefer adding a `## Role Outputs` block using the `role-output-map` schema in the main note instead of splitting a separate note too early.
- If a work item runs under SDD, declare `sdd_mode`, `spec_refs`, and `spec_status`; step 4 must close the `spec-freeze-gate`, steps 5-7 must use the spec change protocol when spec drift is detected, and step 8 must have a `spec-coverage-report`.
- Step mapping, handoff rules, and workflow schemas live in `references/workflow-chain.md`.
- Runtime policy, role contract, handoff protocol, and `Codex-first` rollout live in `references/execution-runtime.md`.

## Governance Rule

- Do not create a separate governance step; `governance` must go into the right step where the decision is made.
- If there is no other instruction, `governance_ref` defaults to `project-context/project-context.md`, and `checklist_refs` comes from `project-context/checklists/<governance_profile>.md`.
- `governance_profile`, `governance_status`, and the trigger to open a `governance-exception` must follow `project-context/governance-decision-model.md`.
- `Clarify` must record the initial `governance context` before moving to `Technical Approach`.
- `Acceptance + DoR`, `Task Plan`, and `Verify + DoD` are the three natural points to attach `governance checks`.
- If implementation or approach drifts from the standard principle, a `governance-exception` or `waiver` must be recorded; do not skip it silently.
- `governance` only has value when it goes into gates, evidence, and handoff; it should not stay only in background docs.
- When materializing a workflow note into a file, prefer scaffolding with `wfc scaffold --work-item <work_item_slug>` or `wfc scaffold-step --work-item <work_item_slug> --step <sNN>`; only copy a template by hand when deep customization is truly needed. If the repo has matching root scripts, `npm run scaffold:workflow` and `npm run scaffold:workflow-step` are valid aliases.
- If a work item has `execution_mode=multi_agent`, also run `wfc exec --workflow-root work-items` after scaffolding or manual editing. If the repo maps a root script, `npm run validate:workflow:execution -- --workflow-root work-items` is an equivalent alias.
- If a work item uses a non-default `planning_track` or you want to lock the routing rules, also run `wfc plan --workflow-root work-items`. If the repo maps a root script, `npm run validate:workflow:planning -- --workflow-root work-items` is an equivalent alias.
- `work-items/` is the canonical artifact root for real workflow artifacts; unless instructed otherwise, a scaffolded workflow note should live under `work-items/<work_item_slug>/`.

## Hard Rule: Spec/Design Before Code

- Do not start `s07 Implement` until `s04 Acceptance + DoR`, `s05 Technical Approach`, or `s06 Task Plan` meet the minimum conditions.
- Minimum conditions for production code to begin:
  - `s04` has measurable acceptance criteria and a clear `DoR`.
  - `s05` has locked the approach, the affected boundary, and a sufficient validation plan.
  - `s06` has a task plan clear enough to know execution order and verify path.
- `planning_track=quick` only allows reducing the detail level of artifacts; it does not allow dropping `s05` or `s06` entirely.
- When a work item runs under `SDD`, do not implement if the `spec` is not yet `approved|frozen`, unless a `spec-change` or `governance-exception` exists per the rules.
- If an emergency forces a deviation, record the exception or waiver clearly; do not code first and backfill docs as if the workflow had never been shortened.

## Hard Rule: SDD Light Profile

- `sdd_mode=light` (`SDD Light`) reduces authoring ceremony; it does not add a new SDD mode, remove a lifecycle step, or weaken any control invariant — it only changes how much gets written and where. Full authority for this rule is `policies/codex/AGENTS.global.md § Hard Rule: SDD Light Profile`.
- A work item may run Light only when it is `delivery_context=brownfield`, `planning_track=quick`, `governance_profile=default`, `execution_mode=agentic`, `interaction_mode=self`, and risk is `low` or `medium`.
- Hard escalation to full/strict overrides an explicit Light preset when the item is greenfield, needs a `Foundation Decision`, touches a public API/event/data contract, involves a database migration/backfill/cutover, needs regulated or security-sensitive evidence, requires multi-agent delegation, has `defect_source=UNKNOWN` or unclassified spec impact, has high blast radius or spans multiple systems, or needs a complex UAT/release gate.
- Physical note mapping for Light: `s01` hosts Clarify + Business Goal + Open Questions + classification; `s04` hosts Acceptance + DoR + Spec Freeze/approved CR; `s06` hosts Option Analysis + Brownfield Impact + Technical Approach + Task Plan (there is no separate `s05` physical note for Light); `s07` and `s08` are created lazily when the item transitions to `ACTIVE`/Verify starts. The 8 logical steps still exist in the trace model; only the physical note count is reduced.
- Gate host contract for Light: `Spec + DoR` at `s04`; `Approach + Task Plan` at `s06` (no separate `s05` gate check); `Foundation Decision` is not supported — a work item that needs one must auto-escalate to full; `Delivery Rule Evidence` stays at `s07`; `DoD` at `s08`.
- Light uses one Spec Card (`spec_refs.card`) instead of separate `BRD`/`SRS`; see `references/spec-driven-development.md` for the Spec Card contract.
- A `ready-bundle` interaction may seal the Spec, DoR, Approach, and Task Plan receipts in one step, but each gate still gets its own independent trusted receipt with its own reviewer and timestamp; bundling the interaction never weakens gate semantics.
- `ACTIVE` for a Light work item still requires the `s04` and `s06` receipts (in place of `s04`+`s05`+`s06`); every other human-controlled-gate invariant in this skill applies unchanged.

## Hard Rule: Disciplined Brainstorming

- Before closing `s05 Technical Approach`, there must be an `option analysis` at a level fitting the work item's complexity.
- Minimum `option analysis`:
  - the goal to solve is clear
  - there are options to compare
  - there is 1 recommended option with a clear reason
  - there is something to verify before or during implementation
- If the problem has multiple reasonable directions, state at least 2 options.
- If the problem has one nearly obvious direction, still state at least 1 alternative or rejected direction to prove a comparison was made.
- `planning_track=quick` only allows reducing the detail level of `option analysis`; it does not allow dropping the option comparison entirely.
- If there is not enough data to brainstorm seriously, reflect the blocker or assumption in `s03 Open Questions` instead of forcing an approach.

## Hard Rule: Prefer The Smallest Solution That Is Correct

- At `s05 Technical Approach`, if a smaller option still meets the acceptance criteria, current constraints, related `governance`, and the main verification need, prefer that option.
- Do not open a new abstraction, layer, service, framework, schema split, queue, cache, or config surface only for hypothetical future needs.
- If a larger option is chosen, the `technical approach` must state clearly why the smaller option is not enough:
  - it does not meet current acceptance criteria or quality constraints
  - it does not meet safety, operational, or `governance` requirements
  - an in-scope requirement forces opening a larger boundary right now
- `planning_track=quick` defaults to the smallest delta on the existing path; do not rewrite or redesign a boundary without a specific reason.
- `Smallest sufficient solution` does not mean doing shoddy work or cutting tests, verify, review, docs, or `governance`.

## Hard Rule: Execution-Oriented Planning

- Before starting `s07 Implement`, `s06 Task Plan` must be clear enough to execute without reinventing the design.
- Minimum `execution-oriented task plan`:
  - state the `owned_scope` or main files/paths to create or edit when identifiable
  - have a clear execution order or dependency
  - have a sufficient `verify path` for each task or batch
  - have review or governance checkpoints when the scope needs them
- Do not write placeholder task plans like `handle edge case`, `add suitable validation`, `write tests`, `fix the related part` without stating what they touch and how they are verified.
- `planning_track=quick` only allows reducing the detail level of the task plan; it does not allow dropping the main touch points or main verify approach.
- If the task plan still forces the implementer to reinvent the approach, go back to `s05` or rewrite `s06` before coding.

## Hard Rule: TDD For Behavior Change

- At `s07 Implement`, if the change creates or modifies a `behavior change`, follow `TDD`.
- `behavior change` in this workflow includes:
  - fixing a bug behavior
  - adding production feature behavior
  - changing a validation rule or contract
  - a refactor with significant regression risk
- Minimum `TDD` cycle:
  - write a test for the desired behavior or the bug to reproduce
  - run it to see the test fail for the right reason
  - write the minimum code to pass
  - run the test again to confirm it passes
- `TDD` is not required for `docs-only`, rename, format, metadata-only, or workflow artifacts that do not affect production behavior.
- If strict `TDD` is blocked by legacy, harness, or test environment, record the reason and an alternate `verify path` in the implementation note; do not write code first and add tests after while still calling it `TDD`.

## Hard Rule: Worktree For Large Or Risky Changes

- At `s07 Implement`, use a `worktree` when the change falls under `large or risky change`.
- `large or risky change` in this workflow includes at minimum:
  - `planning_track=enterprise`
  - implementation spanning more than one session
  - touching many boundaries or many files with significant conflict risk
  - high merge risk, branch risk, or release risk
- For `planning_track=full`, if the change is no longer a quick fix, default to using a `worktree`.
- A `worktree` may be skipped for a small bug, quick fix, few files, done in one session, and low conflict risk.
- If a change belongs to the should-use or must-use `worktree` category but no worktree is used, the implementation note must state the reason.
- A `worktree` is a workspace isolation layer; it does not replace review, verify, or `DoD`.

## Hard Rule: Review Early, Do Not Wait Until The End

- At `s07 Implement`, do not push all review into `s08 Verify + DoD`.
- Review must happen early by batch, risky task, or important logic/contract part within `s07`.
- Minimum level:
  - `quick`: at least one review pass on the implementation before leaving `s07`
  - `full`: `targeted review` by batch or risky task
  - `enterprise`: `independent review` for the main parts in `s07`
- Default review order:
  - `spec compliance`
  - `code quality`
- Early review does not replace `testing`, `verify`, or `DoD`; `s08` is still the final conclusion.

## Hard Rule: Two-Tier Review

- Every review in `s07 Implement` must check `spec compliance` first, then `code quality`.
- `spec compliance` must answer at minimum:
  - does the change match the locked acceptance criteria, approach, spec, and scope
  - is there unrecorded `governance` drift or spec drift
- Only after `spec compliance` has passed or has a clear exception may you move to `code quality`.
- For `planning_track=enterprise` or main logic/contract parts, the two-tier review must be shown as two clear steps, not merged vaguely.
- For `quick` and `full`, you may review in one pass, but the verdict must still follow the order `spec compliance -> code quality`.
- `code quality` does not replace `spec compliance`; clean code that drifts from the spec is still a fail.

## Hard Rule: Subagent Only For Independent Tasks

- At `s07 Implement`, only enable `subagent` or `multi_agent` when the task falls under `independent task`.
- `independent task` in this workflow must satisfy at minimum:
  - `s06 Task Plan` is clear enough to assign work
  - `owned_scope` or `owned_paths` are reasonably disjoint
  - `merge path` or handoff path is clear
  - `verify path` or `verification_owner` is clear
- Do not enable `subagent` for small but tightly coupled tasks, tasks that just finished exploring context, tasks with strong ownership overlap, or tasks without a clear verify path.
- `agentic` remains the default mode; if the conditions for `independent task` are not met, fall back to `agentic` or `sequential_multi_role`.
- `subagent` must not bypass `review`, `testing`, `verify`, or `DoD`.

## Hard Rule: Do Not Self-Declare Done

- No agent, worker, or implementer may declare `done` before `s08 Verify + DoD` has a clear `DoD` verdict.
- `review pass`, local `test pass`, `code done`, `merge done`, or a clean `worktree` are not equivalent to `DoD`.
- For `multi_agent` or `subagent`, you may only aggregate evidence in `s07`; the completion verdict is only valid when `s08` concludes.
- If checks were skipped, exceptions are still open, gaps have no clear owner, or evidence is insufficient, you may only report `PARTIAL` or not-complete; do not report `done`.
- `DoD` is the delivery-level gate that closes a work item, not a subjective state of the implementer.

## Hard Rule: Branch/Worktree Only Finalized After Verify

- When a work item uses a `branch` or `worktree`, the decision to `cleanup`, `close`, `remove`, or `merge` is only valid after `s08 Verify + DoD` has a clear `DoD` verdict.
- A clean `branch`, clean `worktree`, reviewed diff, or locally merged code is not evidence to close a branch/worktree early.
- If verify is still pending, findings are open, exceptions are open, or evidence is insufficient, the branch/worktree must stay in a waiting state; do not treat it as ready to close.
- For `multi_agent` or multiple `worktree`s, only merge or clean up after the `verify path` and handoff path have ended in `s08`.
- This rule only tightens the timing of closing a branch/worktree; it does not replace the repo's branch strategy.

## Default Rule: Safe Default

- When you are not sure enough to choose a `planning_track`, capability, or intervention level, pick the safer fallback instead of optimizing early.
- `safe default` of this workflow:
  - unsure which `planning_track`: choose `full`
  - unsure whether a gate has passed: treat it as not passed and return to the matching step
  - unsure whether a `subagent` is needed: do not use one
  - unsure whether to open a new boundary, abstraction, or service: do not open it if the existing path still suffices
  - unsure whether a `worktree` is needed: use one if the change shows signs of `large or risky change`
  - unsure whether `TDD` is needed: use it if production behavior is affected
  - unsure which review level: start with `targeted review`
- `safe default` does not allow skipping hard rules; it only decides the fallback direction when still uncertain after reading context.

## Hard Rule: Human-Controlled Gates

- This workflow runs on the `AI proposes, human approves` model.
- AI may analyze, draft artifacts, propose options, propose an approach, propose a task plan, implement, run tests, aggregate evidence, and give recommendations.
- The right to `implement` only opens after the matching human gates have passed; an artifact draft does not automatically mean the gate has passed.
- Generic coding defaults like "a feature request should be coded right away", "assume the user wants code changes by default", "do not stop at analysis", "just do it end-to-end" do not open a gate.
- Those defaults may only be applied after the router or protocol has proven `s07`, `ACTIVE`, `Missing Gates: NONE` and the matching approval has passed.
- If this cannot be proven, the correct behavior is to return to `BLOCKED` or the previous step; do not treat a convenience heuristic as authorization.
- AI must not, on its own:
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
- A human-controlled gate is only considered passed when all of these hold:
  - the source-of-truth artifact of the step or protocol has been updated
  - there is enough evidence for a reviewer to check
  - the owner or approver with the right authority has signed off clearly
- `work item approval` and `change package approval` are always human-controlled gates; a protocol-managed item must not use `review_required=false` or `approval_status=NOT_REQUIRED` to bypass review.
- Human pass must be explicit; do not infer it from a comment, technical `review pass`, local `test pass`, or the fact that an artifact exists.
- If a human-controlled gate has not passed, the workflow must be `BLOCKED`, return to the previous step, or stop before the next gate; do not proceed just because the AI judges it "good enough".
- `ACTIVE` is only valid when `work item approval`, `change package approval` when present, the `greenfield` `bootstrap gate` when present, and the `s04`, `s05`, `s06` evidence have been human-passed.
- `VERIFIED` is only valid when `s08` has verify evidence.
- `DONE` is only valid when `s08` has passed `DoD`, and if the scope requires it, `UAT`, `Release`, and `Business Acceptance` have also passed in `s08`.
- Invariants for the router status block:
  - if `Missing Gates` is not `NONE`, `Workflow Status` must not be `ACTIVE`, `READY_FOR_REVIEW`, or `VERIFIED`
  - if `Missing Gates` is not `NONE`, `Next Human Action` must not be `NONE`
- `approval_gates` records which gate is `required` or `not_applicable` for the work item or step note.
- `role_signoffs` records the role with signoff authority for `spec`, `contract`, `dor`, `approach`, `foundation`, `task_plan`, `uat`, `release`, `business_acceptance`, `dod`.
- `gate_reviews` records the actual human reviewer and review time for each gate; a note finalized in `s04`, `s05`, `s06`, `s08` must have a reviewer + timestamp for the step's main gate.

## Hard Rule: Empty Project / Greenfield Hard Stop

- If the project is in an `empty` or `greenfield` state, do not jump straight to scaffolding a framework, choosing a final stack, or implementing production code.
- `empty` or `greenfield` in this workflow means at least one of these signs:
  - the repo is nearly empty or has no main executable source tree
  - no stack or framework baseline has been locked
  - no runtime/deployment baseline has been locked
  - no source-of-truth artifact enough to consider the foundation architecture decision approved
- In this state, AI may only:
  - clarify the request, business goal, open questions
  - draft a needed spec or contract
  - do `option analysis` for the solution class, stack, runtime, or deployment model
  - propose a `technical approach`
  - propose a `task plan`
  - propose a work item or change structure
- Example of a request that must still stop at the proposal stage:
  - a greenfield feature like `QR Voucher`, with UI, a voucher service API, and a brand visual tone, in an empty repo, must not jump to scaffolding or production code
- In this state, AI must not, on its own:
  - lock a `static site`, SPA, SSR, backend-first, CMS, or a specific framework as a final decision
  - scaffold an app skeleton, dependency tree, build system, Dockerfile, CI/CD, or deploy manifest as if the stack were approved
  - implement the project's first feature as if the foundation decision were done
- For an `empty/greenfield project`, before `s07 Implement` there must be at minimum:
  - `s04` pass `Spec`
  - if the scope touches an `API contract` or `UX contract`, `s04` pass `Contract`
  - `s04` pass `DoR`
  - `s05` pass `Approach`
  - if `s05` contains a foundation decision such as solution class, stack, runtime, or deployment model, `s05` pass `Foundation Decision`
  - `s06` pass `Task Plan`
- If there is no clear evidence that the gates above have been human-passed, the correct behavior is to stop at the `proposal stage`, present options/trade-offs/recommendations, and wait for human review.
- `safe default` for an `empty/greenfield project` is: do not implement; do not scaffold; do not lock the final stack for the human.
- The `bootstrap gate` for a new project must follow the order: `Spec -> Contract if any -> Approach -> Foundation if any -> work item approval -> Task Plan -> Implement`.
- A background prompt or an implement-by-default agent habit does not weaken the `greenfield hard stop`; if a conflict occurs, still stop at the proposal stage.

## Hard Rule: Brownfield Baseline And Delta Discipline

- Each work item must declare `delivery_context: greenfield|brownfield`; do not leave it implicit at the inference level after materializing a workflow note.
- For `brownfield`, AI must treat the existing system as the running baseline; the default is to change by the `smallest sufficient delta`, and not to open a `Foundation Decision` without a clear reason.
- For `brownfield`, before `s07 Implement`, the minimum output must include:
  - `s04` has an `Existing System Baseline`
  - `s05` has a `Brownfield Impact Analysis`
  - `s06` has a `Brownfield Delivery Plan`
- For `brownfield`, `s08` must have a `Regression & Compatibility Summary` before closing `DoD`.
- For `brownfield`, `approval_gates.foundation` only opens when the change truly touches the architectural baseline such as rewriting a boundary, changing the stack, changing the runtime, or changing the deployment model.

## Core Chain

1. Clarify
- Clarify the request, `work_item_type`, context, initial scope/risk, related `governance context`, and evidence to keep.

2. Business Goal
- Lock the business value, KPI/success metric, scope boundary, non-goals, and the fit with the foundation principles.

3. Open Questions
- Separate missing input, blockers, assumptions, conflicts, and `governance blockers` that need an owner/resolution.

4. Acceptance + DoR
- Turn the goal into measurable acceptance criteria, close readiness, reflect `governance` requirements into the checklist, and use `definition-of-ready-gate` when a clear gate lock is needed.

5. Technical Approach
- Choose the smallest sufficient technical option after disciplined brainstorming; lock trade-offs and the architecture/UX/DevOps boundary within the `governance` constraints in effect.

6. Task Plan
- Split implementation into small ordered tasks, traceable to requirements/AC, with a verify plan and enough review/governance checkpoints; the task plan must be clear enough to execute without reinventing the design.

7. Implement
- Only allowed after `s04-s06` meet the conditions; changes must be focused, in scope, and match the approach, use `TDD` for behavior change, use a `worktree` for large or risky change, review early for the main parts, and not drift from `spec` or `governance` before approval.

8. Verify + DoD
- Compare results against criteria/spec, check Vietnamese encoding for changed text files, conclude `governance compliance`, use `definition-of-done-gate` when a conclusion lock is needed, only declare `done` here, only close `branch/worktree` here when present, and state clearly if a check cannot be run.
- If still uncertain about track, capability, or gate, return to the `safe default`; do not pick a riskier path on your own.

DevOps lane when there is runtime delivery scope
- Do not create a step 9; this is a lane that runs across steps 5 -> 8.
- At step 5, use `deployment-devops` to lock the overall DevOps scope; add `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` when you need to lock each layer in depth.
- At step 6, split out the build image, compose, manifest, smoke, promotion, and rollback tasks when present.
- At step 7, implement the Dockerfile, compose, manifest, or pipeline config within the locked scope.
- At step 8, conclude packaging or rollout readiness before promoting to `dev`, `uat`, `prod`.

When explaining the workflow to a reader from a business angle, prefer this pattern:
- What the step receives from the previous step or from a stakeholder.
- What decision, document, or evidence the step produces for the next step.
- Spec names are only used to identify artifacts; they do not replace the handoff meaning.

## Quality Rules

- Prefer fixing the root cause over patching the surface.
- Keep code and documentation consistent.
- Follow the project's existing conventions.

## Command Preference

- Prefer `rg` when searching for files and content.
- Use non-interactive commands in scripts and CI contexts.

## Reference Docs

Read the reference docs in 3 groups:

Public docs:

- `references/workflow-overview-author-edition.md`: the official overview to introduce the workflow from a delivery and author perspective.
- `references/workflow-versioning.md`: locks the public baseline `v1.0.0` boundary and later extensions.
- `references/workflow-chain.md`: the 8-step workflow, step-skill-artifact mapping, note templates, and workflow schemas.
- `references/execution-runtime.md`: execution policy, role contract, handoff/merge protocol, and how to use `agentic|multi_agent` in the baseline.

Extension docs:

- `references/work-item-materialization.md`: the authoring protocol before `scaffold`, used to lock `work_item_slug`, split decisions, dedup, and `change_strategy`.
- `references/work-item-protocol.md`: the work-item-level protocol lifecycle after materialization, including the state machine, transitions, authority, handoff, and command contract.

Maintainer docs:

- `references/workflow-overview.md`: the internal reference focused on mechanics, validator, CI, rollout status, and technical workflow detail.
- `references/role-aware-workflow.md`: the business role overlay, BRD/SRS rollout artifacts, role outputs, and how to use NotebookLM as corpus retrieval during execution.
- `references/spec-driven-development.md`: the SDD lifecycle, requirement IDs, spec freeze, spec change protocol, traceability matrix, and spec coverage report.
- `references/sdd-merge-strategy.md`: how to combine the current workflow with `spec-kit`, `OpenSpec`, `cc-sdd`, and `BMAD-METHOD` by layer and by work item type.
- `references/target-architecture.md`: the target architecture to complete the workflow backbone across the governance, change, execution, and adaptive planning layers.
- `references/implementation-blueprint.md`: the implementation blueprint by phase, artifact, validator, CI, and done criteria to roll out the target architecture.
- `references/workflow-ci-enforcement.md`: CI design for workflow tooling, the fixture suite, workflow artifacts, and automation guardrails.
- `../../../project-context/README.md`: the repo's default Governance Pack, including `constitution`, `project-context`, checklist profiles, and the exception register.
- `../../../project-context/governance-decision-model.md`: the decision rule for `governance_profile`, `governance_status`, and exception triggers.
- `references/end-to-end-examples.md`: real application examples for an `agentic` flow and a `multi-agent` flow.