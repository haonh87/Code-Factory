# Global Workflow Policy For Codex

This document defines the global workflow chain for coding tasks.

If you need a high-level introduction from the author's perspective before going into the operational policy, read:
`skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md`

If you need the internal reference that leans toward mechanics, validator, CI and rollout status, read:
`skills/orchestration/codex-workflow-chain/references/workflow-overview.md`

<CRITICAL>

- A feature request is NEVER equivalent to permission to implement right away.
- The default entry point of every new coding request is `s01 Clarify`.
- If the current step, gate status, approval status or artifact status is unclear, missing or only inferred, it must be treated as NOT PASSED.
- `AI proposes, human approves` is the mandatory model; AI must never infer approval from a comment, a pre-existing artifact, a technical review or existing progress.
- You must not write production code, scaffold a project, lock the final stack or open the implementation path if a mandatory workflow gate has not been opened explicitly.

</CRITICAL>

## Multi-Block Prompt Model

This repo runs on a multi-block model, not a single monolithic prompt.

- `Block 1 - Authority layer`: this `AGENTS.global.md` file holds the hard rules, hard gates, conflict resolution and safe defaults.
- `Block 2 - Entry router`: the `workflow-governance-router` skill is the meta-skill that routes; it decides the current step, delivery context, gate status and whether the implementation path is locked.
- `Block 3 - Workflow backbone`: the `codex-workflow-chain` skill holds the `s01 -> s08` chain, the state machine and the detailed governance rules.
- `Block 4 - Step skills`: the skills in `skills/analysis`, `skills/architecture`, `skills/delivery`, `skills/guardrails`, `skills/obsidian` may only be used after the entry router has locked the step and the action boundary.
- `Block 5 - Runtime + validator`: `workflow-bundle`, support policy, validator and capability control are responsible for materializing, validating and enforcing the workflow state in the release runtime.

## Hard Rule: Router Before Action

- For any coding request or workflow-governed delivery task, you must route through `workflow-governance-router` before giving a substantive answer or taking action.
- `workflow-governance-router` must determine at minimum:
  - `Current Step`
  - `Workflow Status`
  - `Delivery Context`
  - `Missing Gates`
  - `Next Artifact`
  - `Next Human Action`
- If the entry router cannot lock the items above, the correct behavior is `BLOCKED` or going back to `s01`, not jumping to implementation.
- Only tasks that do not belong to the delivery workflow, such as pure Q&A, translation, summarization or ordinary conversation, may skip this router.

## Hard Rule: Generic Coding Defaults Do Not Open A Gate

- Any default heuristic or prompt of the kind:
  - `feature request` means you should code right away
  - by default assume the user wants code changes unless they say otherwise
  - do not stop at analysis or planning
  - just implement first and backfill the workflow later
  is only an execution convenience heuristic, NOT an approval.
- The heuristics above may only be applied after the entry router has clearly locked:
  - `Current Step: s07 Implement`
  - `Workflow Status: ACTIVE`
  - `Missing Gates: NONE`
  - `Next Human Action: NONE`
- Before that point, if there is a conflict between a generic coding default and workflow governance, the generic default must be treated as fully overridden.
- You must not infer that the user "wants to code right away" just because the wording is a feature request, the scope seems clear, or the agent can come up with an approach on its own.
- When it cannot be shown that the gate has opened, the correct behavior is to return a `router status block`, state the `Missing Gates` and stop before code/scaffold.

## Language And Encoding Policy

- Default to communicating with the user in English.
- Default documentation and handoff reports to English, unless the user requests another language.
- When updating text files (`.md`, `.txt`, `.yml`, `.yaml`, `.json`), store as UTF-8 and preserve accented characters in any `*.vi.md` supplement files.
- In the Verify step, you must check text encoding for the changed text files.

## Mandatory Workflow Chain

For any coding request, the full workflow still follows the 8-step chain.
The list of 5 items below is only an executive summary, not a replacement for the step-by-step definition.

For any coding request:
1. Clarify the request and constraints.
2. Draft a short implementation plan.
3. Implement a small, focused change.
4. Verify with the appropriate checks, including text encoding checks for changed documentation.
5. Report changes, risks and next steps.

Interpreted per the current workflow chain:
- `s01` Clarify: clarify the request, `work_item_type`, context, draft scope, assumptions, dependencies, initial risks and the related `governance context`.
- `s04` Acceptance + DoR: lock the acceptance criteria, the `Definition of Ready` and the level of fit with `governance` before moving to `Technical Approach` and implementation planning.
- `s08` Verify + DoD: lock the `Definition of Done` and the level of `governance compliance`; when there is packaging/rollout, state the release readiness and the handoff to the corresponding deploy lane clearly.

## Hard Rule: Spec/Design Before Code

- You must not enter `s07 Implement` before going through `s04 Acceptance + DoR`, `s05 Technical Approach` and `s06 Task Plan`.
- Minimum conditions to start writing production code:
  - `s04` has measurable acceptance criteria and a clear `DoR` verdict.
  - `s05` has a technical approach enough to lock the affected boundary and a validation plan.
  - `s06` has a task plan enough to know the execution order and the verify path.
- With `planning_track=quick`, the design may be short, but `s05` and `s06` are still required; you must not jump straight from clarify to code.
- For a work item running under `SDD`, you must not implement if the `spec` is not in `approved|frozen`, unless a `spec-change` or `governance-exception` has been recorded per the rules.
- If an emergency forces shortening authoring before code, you must record the exception or waiver per `project-context/governance-decision-model.md`; you must not silently skip and then backfill documentation as if the process had never drifted.

## Hard Rule: Disciplined Brainstorming

- Before locking `s05 Technical Approach`, there must be an `option analysis` at a level that fits the complexity of the work item.
- Minimum of `option analysis`:
  - the goal to solve is clear
  - there are options to compare
  - there is 1 recommended option with a clear reason
  - there is something to validate before or during implementation
- If the problem is not an obvious straight line, you must state at least 2 options.
- With `planning_track=quick`, you may write it short, but you must still have at least 1 alternative direction or 1 rejected direction to show comparison.
- You must not lock an approach only by feeling or "muscle memory".
- You must not use brainstorming as an excuse to extend discovery indefinitely; the output must serve `s05` and `s06` directly.
- If there is not enough data to brainstorm seriously, you must reflect the blocker or assumption in `s03 Open Questions` instead of forcing a choice.

## Hard Rule: Prefer The Smallest Solution That Is Correct

- At `s05 Technical Approach`, if a smaller option still meets the acceptance criteria, the current constraints, the related `governance` and the main validation needs, you must prefer that option.
- You must not add a new abstraction, layer, service, framework, schema split, queue, cache or config surface only for hypothetical future needs.
- If you choose a larger option, the `technical approach` must state clearly why the smaller option is not enough:
  - it does not meet the current acceptance criteria or quality constraint
  - it does not meet safety, operational or `governance` requirements
  - an in-scope requirement forces opening a larger boundary right now
- With `planning_track=quick`, default to the smallest delta on the existing path; do not rewrite or redesign a boundary without a concrete reason.
- `Smallest solution that is correct` does not mean doing shoddy work or cutting tests, verify, review, docs or `governance`.

## Hard Rule: Execution-Oriented Planning

- Before starting `s07 Implement`, the `s06 Task Plan` must be clear enough to execute without having to reinvent the design.
- Minimum of an `execution-oriented task plan`:
  - state the `owned_scope` or the main file/path to create or edit when it can be determined
  - have a clear execution order or dependency
  - have a `verify path` sufficient for each task or each batch
  - have a review or governance checkpoint when the scope needs it
- You must not use a placeholder-style task plan like:
  - `handle edge case`
  - `add appropriate validation`
  - `write tests`
  - `fix the related part`
  without stating clearly what it will touch and how it will be checked
- With `planning_track=quick`, the task plan may be short, but it must still state at least the main touch point and the main verify method.
- If the task plan still forces the implementer to re-infer the approach, you must go back to `s05` or rewrite `s06` before code.

## Hard Rule: TDD For Behavior Change

- At `s07 Implement`, if the change creates or modifies a `behavior change`, you must follow `TDD`.
- `behavior change` in this workflow includes:
  - fixing a bug behavior
  - adding a production feature behavior
  - changing a validation rule or contract
  - a refactor with significant regression risk
- Minimum cycle of `TDD`:
  - write a test for the desired behavior or the bug to reproduce
  - run it to see the test fail for the right reason
  - write the minimum code to pass
  - run the test again to confirm pass
- `TDD` is not required for `docs-only`, rename, format, metadata-only or artifact workflow that does not affect production behavior.
- If strict `TDD` is blocked by legacy, harness or test environment, you must state the reason and the alternative `verify path` in the implementation note; you must not write the code first and add the test later while still calling it `TDD`.

## Hard Rule: Worktree For Large Or Risky Changes

- At `s07 Implement`, you must use a `worktree` when the change falls in the `large or risky change` group.
- `large or risky change` in this workflow includes at minimum:
  - `planning_track=enterprise`
  - implementation that spans more than one session
  - touching many boundaries or many files with significant conflict risk
  - high merge risk, branch risk or release risk
- With `planning_track=full`, if the change is no longer a quick fix, default to using a `worktree`.
- You may skip the `worktree` for a small bug, a quick fix, few files, finished in one session and low conflict risk.
- If a change already falls in the group that should or must use a `worktree` and still does not, the implementation note must state the reason.
- `worktree` is a workspace isolation layer; it does not replace review, verify or `DoD`.

## Hard Rule: Review Early, Do Not Wait Until The End

- At `s07 Implement`, you must not push all review to `s08 Verify + DoD`.
- Review must happen early, by batch, by risky task or for the important logic/contract part, within `s07`.
- Minimum:
  - `quick`: at least one review pass for the implementation part before leaving `s07`
  - `full`: a `targeted review` by batch or by risky task
  - `enterprise`: an `independent review` for the main parts in `s07`
- Default review order:
  - `spec compliance`
  - `code quality`
- Early review does not replace `testing`, `verify` or `DoD`; `s08` is still where the final conclusion happens.

## Hard Rule: Two-Tier Review

- Every review that happens in `s07 Implement` must check `spec compliance` first, then `code quality`.
- `spec compliance` must answer at minimum:
  - does the change match the locked acceptance criteria, approach, spec and scope
  - is there a `governance` drift or a spec drift that has not been recorded
- Only after `spec compliance` has passed or has a clear exception may you move to `code quality`.
- With `planning_track=enterprise` or for the main logic/contract part, the two-tier review must be shown as two clear steps, not merged vaguely.
- With `quick` and `full`, you may review in the same pass, but the verdict must still follow the order `spec compliance -> code quality`.
- `code quality` does not replace `spec compliance`; clean code that drifts from the spec is still a fail.

## Hard Rule: Subagent Only For Independent Tasks

- At `s07 Implement`, you may only enable `subagent` or `multi_agent` when the task falls in the `independent task` group.
- `independent task` in this workflow must satisfy at minimum:
  - `s06 Task Plan` is clear enough to assign the work
  - `owned_scope` or `owned_paths` are relatively disjoint
  - the `merge path` or handoff path is clear
  - the `verify path` or `verification_owner` is clear
- Do not enable `subagent` for a small but tightly coupled task, a task that just finished exploring context, a task with strong ownership overlap, or a task without a clear verify path.
- `agentic` is still the default mode; if the conditions for `independent task` are not met, you must fall back to `agentic` or `sequential_multi_role`.
- `subagent` must not bypass `review`, `testing`, `verify` or `DoD`.

## Hard Rule: Do Not Self-Declare Done

- No agent, worker or implementer may declare `done` before `s08 Verify + DoD` has a clear `DoD` verdict.
- `review pass`, local `test pass`, `code done`, `merge done` or a clean `worktree` is not equivalent to `DoD`.
- With `multi_agent` or `subagent`, you may only aggregate evidence in `s07`; the completion verdict is only valid when `s08` concludes.
- If there are still checks skipped, open exceptions, gaps without a clear owner or insufficient evidence, you may only report `PARTIAL` or not complete; you must not report `done`.
- `DoD` is the gate that closes a work item at the delivery level, not a subjective state of the implementer.

## Hard Rule: Branch/Worktree Only Finalized After Verify

- When a work item uses a `branch` or `worktree`, the decision to `cleanup`, `close`, `remove` or `merge` is only valid after `s08 Verify + DoD` has a clear `DoD` verdict.
- A clean `branch`, a clean `worktree`, a reviewed diff or a locally merged code is not evidence to finalize the branch/worktree early.
- If verify is still pending, a finding is still open, an exception is still open or evidence is insufficient, the branch/worktree must stay in a waiting state; it must not be treated as ready to finalize.
- With `multi_agent` or multiple `worktree`, you may only merge or clean up after the `verify path` and handoff path have ended in `s08`.
- This rule only tightens the timing of branch/worktree finalization; it does not replace the repo's branch strategy.

## Default Rule: Safe Default

- When you are not sure enough to choose a `planning_track`, a capability or an intervention level, you must choose the safer fallback rather than optimizing early.
- The `safe default` of this workflow:
  - not sure which `planning_track`: choose `full`
  - not sure whether a gate has passed: treat it as not passed and go back to the corresponding step
  - not sure whether a `subagent` is needed: do not use one
  - not sure whether to open a new boundary, abstraction or service: do not open if the existing path still meets the need
  - not sure whether a `worktree` is needed: use one if the change shows signs of `large or risky change`
  - not sure whether `TDD` is needed: use it if production behavior is affected
  - not sure what review level: start with `targeted review`
- `safe default` does not allow skipping hard rules; it only decides the fallback direction when there is still uncertainty after reading the context.

## Hard Rule: Human-Controlled Gates

- This workflow runs on the `AI proposes, human approves` model.
- AI is allowed to analyze, draft artifacts, propose options, propose an approach, propose a task plan, implement, run tests, aggregate evidence and give recommendations.
- The right to `implement` only opens after the corresponding human gates have passed; AI must not infer that a draft artifact is enough to treat a gate as passed.
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
  - approve a `governance-exception` or `waiver` if the authority belongs to another human role
- A human-controlled gate is only considered passed when there is simultaneously:
  - the source-of-truth artifact of the step or protocol has been updated
  - enough evidence for the reviewer to check
  - the owner or approver with the right authority has locked it clearly
- `work item approval` and `change package approval` are always human-controlled gates; a protocol-managed item must not use `review_required=false` or `approval_status=NOT_REQUIRED` to bypass review.
- A `legacy scaffold` without a `.work-item-report.json` is only treated as a read-only-reference artifact when the repo or project config clearly allows it; the strict default of the bundle is `protocolControl.legacyScaffoldPolicy=forbid`.
- You must not use a `legacy scaffold`, a draft note or a pre-existing artifact as implicit evidence that execution has been opened.
- Human pass must be explicit; it must not be inferred from a comment, a technical `review pass`, a local `test pass` or the fact that an artifact already exists.
- If a human-controlled gate has not passed, the workflow must `BLOCKED`, go back to the previous step, or stop before the next gate; it must not continue just because AI judges it "good enough".
- `ACTIVE` is only valid when `work item approval`, `change package approval` when present, the `bootstrap gate` of `greenfield` when present, and the evidence `s04`, `s05`, `s06` have been human-passed.
- `VERIFIED` is only valid when `s08` has verify evidence.
- `DONE` is only valid when `s08` has passed `DoD`, and if the scope requires it, `UAT`, `Release`, `Business Acceptance` have also passed in `s08`.
- Invariant for the router status block:
  - if `Missing Gates` is not `NONE`, `Workflow Status` must not be `ACTIVE`, `READY_FOR_REVIEW` or `VERIFIED`; only `BLOCKED` or `WAITING_APPROVAL` are valid
  - if `Missing Gates` is not `NONE`, `Next Human Action` must not be `NONE`; it must state a specific review, approval or confirmation from a human
- `approval_gates` records which gate is `required` or `not_applicable` for the work item or step note.
- `role_signoffs` records the role with signoff authority for `spec`, `contract`, `dor`, `approach`, `foundation`, `task_plan`, `uat`, `release`, `business_acceptance`, `dod`.
- `gate_reviews` records the actual human reviewer and the review time for each gate; a note finalized at `s04`, `s05`, `s06`, `s08` must have a reviewer + timestamp for the main gate of the step.

## Hard Rule: Empty Project / Greenfield Hard Stop

- If the project is in an `empty` or `greenfield` state, AI must not jump straight to scaffolding a framework, choosing the final stack, or implementing production code just because the user says "do it" or "build it".
- When `delivery_context` is not passed explicitly, infer it from the real baseline of the repo: an empty repo or one without an implementation baseline defaults to `greenfield`; it must not be implicitly treated as `brownfield`.
- `empty` or `greenfield` in this workflow means at least one of these signs:
  - the repo is nearly empty or has no main execution source tree
  - no stack or framework baseline has been locked
  - no runtime/deployment baseline has been locked
  - no source-of-truth artifact enough to consider a foundation architecture decision approved
- In this state, AI may only:
  - clarify the request, business goal, open questions
  - draft the needed spec or contract
  - run `option analysis` for the solution class, stack, runtime or deployment model
  - propose a `technical approach`
  - propose a `task plan`
  - propose a work item or change structure
- In this state, AI must not, on its own:
  - choose a `static site`, SPA, SSR, backend-first, CMS or a specific framework as a locked decision
  - scaffold an app skeleton, dependency tree, build system, Dockerfile, CI/CD or deploy manifest as if the stack were approved
  - implement the first feature of the project as if the foundation decision were done
- Example of a request that must still be hard-stopped:
  - a raw request like `build a QR Voucher`, with UI, brand tone and a voucher service API integration in an empty repo, must still stop at the proposal stage; it must not choose a stack, scaffold an app or generate production code on its own
- For an `empty/greenfield project`, before `s07 Implement` there must be at minimum:
  - `s04` pass `Spec`
  - if the scope touches an `API contract` or `UX contract`, `s04` pass `Contract`
  - `s04` pass `DoR`
  - `s05` pass `Approach`
  - if `s05` contains a foundation decision like solution class, stack, runtime or deployment model, `s05` pass `Foundation Decision`
  - `s06` pass `Task Plan`
- If AI does not see clear evidence that the gates above have been human-passed, the correct behavior is to stop at `proposal stage`, present options/trade-offs/recommendations, then wait for human review.
- The `safe default` for an `empty/greenfield project` is: do not implement; do not scaffold; do not choose the final stack on behalf of the human.
- The `bootstrap gate` for a new project must follow the order: `Spec -> Contract if present -> Approach -> Foundation if present -> work item approval -> Task Plan -> Implement`.

## Hard Rule: Brownfield Baseline And Delta Discipline

- Each work item must declare `delivery_context: greenfield|brownfield`; it must not be left implicit at the inference level once a workflow note has been materialized.
- For `brownfield`, AI must treat the existing system as the running baseline; the default is to change by the `smallest delta that is correct`, and not to open a `Foundation Decision` on its own without a clear reason.
- For `brownfield`, before `s07 Implement`, the step output must have at minimum:
  - `s04` has `Existing System Baseline`
  - `s05` has `Brownfield Impact Analysis`
  - `s06` has `Brownfield Delivery Plan`
- For `brownfield`, `s08` must have a `Regression & Compatibility Summary` before locking `DoD`.
- For `brownfield`, `approval_gates.foundation` may only open when the change actually touches the architectural baseline such as rewriting a boundary, changing the stack, changing the runtime or changing the deployment model.

Quick read in business language:
- `s01` Clarify: take the raw request and context, return a shared understanding, the initial scope and the `governance context`.
- `s02` Business Goal: take the shared understanding, return the business goal, the expected value and the non-goals.
- `s03` Open Questions: take the goal and the current information, return the missing input, conflicts, `governance blocker` and the owner who needs to decide.
- `s04` Acceptance + DoR: take the business goal and the answers, return measurable acceptance criteria, a readiness verdict and `governance checks` for readiness.
- `s05` Technical Approach: take the acceptance criteria, return the smallest approach that is correct, the affected boundary and a `governance exception` if there is a drift.
- `s06` Task Plan: take the approach, return a small, ordered, verifiable task plan with enough review/governance checkpoints.
- `s07` Implement: take the task plan, return the actual change in code/config/doc, tests for behavior change, a `worktree` for large or risky changes, early review for the main part, a `subagent` only for independent tasks, `Delivery Rule Evidence` for `TDD/worktree/review/delegation`, and an exception if the implementation needs to drift.
- `s08` Verify + DoD: take the change and the criteria, return evidence, coverage, the level of `governance compliance`, the final verdict on whether the work item is `done`, and the decision to finalize `branch/worktree` when present.
- If there is still uncertainty about the track, capability or gate: go back to `safe default`, do not pick a riskier path on your own.

## Mandatory Quality Gate

Before the final handoff, run the appropriate checks:
- Unit/integration testing.
- Lint or static analysis.
- Build/type check.
- Security check when applicable.
- Text encoding check for changed documentation.
- When the scope has containers or deploy: check the image build, validate `compose.yaml` or the corresponding manifest, and state the smoke or rollback plan clearly.

If a check cannot be run, state the skipped part and the reason clearly.

## Default Governance Pack

- If there is no other indication, `governance_ref` defaults to `project-context/project-context.md`.
- `governance_profile=default|strict|regulated` should use the corresponding checklist in `project-context/checklists/`.
- `governance_profile`, `governance_status` and the trigger to open a `governance-exception` must follow `project-context/governance-decision-model.md`.
- The `approved_by` of an exception or waiver must follow `project-context/governance-role-model.md`, not inferred only from `role_signoffs`.
- If a `governance-exception` stays open for more than one step or affects `DoD`, `release`, `business_acceptance`, you must also update `project-context/governance-exception-register.md`.
- `work-items/` is the canonical artifact root for real workflow artifacts; when materializing a workflow note into the repo, default to placing it under `work-items/<work_item_slug>/`.
- When materializing a workflow note into a file, prefer scaffolding via `wfc scaffold --work-item <work_item_slug>` or `wfc scaffold-step --work-item <work_item_slug> --step <sNN>` to keep naming, frontmatter and the governance block consistent from the start. If the repo has corresponding root scripts, `npm run scaffold:workflow` and `npm run scaffold:workflow-step` are still valid aliases.
- If a work item runs `multi_agent`, the authoring flow must also run `wfc exec --workflow-root work-items`. If the repo has a mapped root script, `npm run validate:workflow:execution -- --workflow-root work-items` is the equivalent alias.
- If a work item has a `planning_track`, the authoring flow should also run `wfc plan --workflow-root work-items`. If the repo has a mapped root script, `npm run validate:workflow:planning -- --workflow-root work-items` is the equivalent alias.
- When materializing a workflow note into a file, you should run the standard workflow validator via `wfc validate --workflow-root work-items --project-root <repo-root>` before the final handoff. If the repo has a mapped root script, `npm run validate:workflow -- --workflow-root work-items --project-root <repo-root>` is the equivalent alias.

## Skill Requirement

For coding tasks, always apply the `codex-workflow-chain` skill.
If the output has Obsidian-system artifacts, also apply the corresponding skill per the rules below.
When a work item depends on many external documents or a large corpus, you may also apply `notebooklm` as a supporting research/tooling skill.
When the scope touches `Dockerfile`, `compose.yaml`, image contract, runtime deploy, release pipeline, `dev/uat/prod` promotion, rollout or rollback, apply the corresponding DevOps lane: use `deployment-devops` when you need to lock the overall picture; use `containerization-packaging` for packaging; use `platform-runtime-deployment` for runtime deploy; use `ci-cd-release` for pipeline, tagging, promotion and approval.
When the scope is frontend, also use the specialized skill for the right step: at step 5 use `frontend-experience-design` when you need to lock screen behavior, UI state, responsive rules or visual direction; at step 7 use `react-web-implementation` when the stack is React web or Next.js and you need framework-specific guidance; at step 8 use `frontend-quality-review` when the change touches the UI surface and use `react-best-practices-review` when you need to review the render/data boundary, effect hygiene or the server/client split of React.

## Execution Runtime Requirement

- By default every step starts at `execution_mode=agentic`.
- Only raise it to `multi-agent` when the step contract is clear enough, there is a `coordinator`, there is a verification owner or a clear audit path, and the `owned_scope` or `owned_paths` can be split relatively disjointly.
- If the runtime does not support stable delegation, still stick to the same spec but run in `sequential multi-role` mode; do not skip the contract, handoff or audit just because there is no real sub-agent.
- When `multi-agent` or `sequential multi-role` is used, the `coordinator` is the only endpoint that concludes the final handoff of the step.
- Worker output must not be treated as the final output of the step until it has been merged into the source-of-truth `.md` note and gone through the corresponding audit/gate.
- If you materialize a workflow note, you should declare `execution_mode`, `execution_roles`, `review_mode`, `verification_owner`, `approval_gates`, `role_signoffs`, `gate_reviews` and the `## Execution Topology` block or runtime artifacts per the runtime reference; `role_signoffs` should cover at minimum `spec`, `contract`, `dor`, `approach`, `foundation`, `task_plan`, `uat`, `release`, `business_acceptance`, `dod`.
- If you need to route the workflow at different depths while keeping the 8-step backbone, use `planning_track=quick|full|enterprise`; do not create a new parallel workflow.
- When several business roles participate in the same step, prefer tracing contribution via the `## Role Outputs` block in the main note before splitting a separate artifact per role.
- When a work item runs under SDD, the workflow note should declare `sdd_mode`, `spec_refs` and `spec_status`; step 4 must handle the `spec-freeze-gate`, steps 5-7 must use `spec-change` when drifting from the frozen spec, and step 8 must have a `spec-coverage-report` or a clear reason to skip it.

## Quick Guide To Applying Skills

This policy is read in 6 layers:

- Step layer: the 8 delivery steps from `Clarify` to `Verify + DoD`.
- Governance layer: `constitution`, `project-context`, `checklist`, `exception/waiver` and the shared rules embedded in the step gates.
- SDD layer: use `BRD/SRS`, requirement IDs, spec freeze, spec change and spec coverage so the spec drives design/code/test when the scope requires it.
- Business skill layer: the analysis, architecture, delivery and guardrail skills are called per step.
- Artifact layer: when a step is materialized into an Obsidian document or artifact, the correct file-type skill must also be called.
- Execution topology layer: a step is run as `agentic` or `multi_agent`; if the runtime does not support stable delegation, fall back to `sequential_multi_role`.

Practical interpretation:

- `codex-workflow-chain` is the mandatory orchestration skill to force a coding task through the 8 steps above.
- `agentic` is the default mode; `multi_agent` is only enabled when there is a real coordination reason; if the runtime does not support stable delegation, fall back to `sequential_multi_role`.
- `spec/design before code` is the hard gate of the execution runtime: the execution loop must not decide on its own to skip `s04-s06`.
- `disciplined brainstorming` is the quality gate of `s05`: the agent must not jump straight into a technical approach without comparing options at a fitting level.
- `prefer the smallest solution that is correct` is the option-selection rule of `s05`: if a smaller option already meets the current scope, do not widen the design only for hypothetical needs.
- `execution-oriented planning` is the quality gate of `s06`: the agent must not enter implementation with a vague or placeholder-heavy task plan.
- `TDD for behavior change` is the execution rule of `s07`: bug fix, feature behavior, validation rule, contract change and refactor with regression risk must test first, then code.
- `worktree for large or risky changes` is the workspace isolation rule of `s07`: `enterprise`, long-running changes, many boundaries/files or high risk must prefer a separate workspace over working directly in the main working tree.
- `review early, do not wait until the end` is the review rule of `s07`: review for risky batches/tasks or important parts must happen during implementation, not be pushed entirely to `s08`.
- `two-tier review` is the review order rule of `s07`: confirm the spec/approach first, then go deeper into code quality.
- `subagent only for independent tasks` is the delegation rule of `s07`: only split a worker when the task plan, ownership, merge path and verify path are clear enough to avoid conflict or drift.
- `do not self-declare done` is the conclusion rule of `s08`: without a `DoD` verdict, it is not complete, even if implementation or review is done.
- `governance` is not a separate step; `governance context` usually appears at `Clarify` or `Open Questions`, `governance checks` are usually locked at `Acceptance + DoR`, `Task Plan`, `Verify + DoD`, and `governance exception` must appear clearly at `Technical Approach` or `Implement` when there is a drift.
- `notebooklm` is a supporting research/tooling skill when a step needs to query or aggregate a large corpus outside the codebase.
- `deployment-devops` is the overall DevOps orchestration skill when a step touches many DevOps layers at once.
- `containerization-packaging` is the delivery skill for `Dockerfile`, `.dockerignore`, `compose.yaml` and the packaging contract per language or workload.
- `platform-runtime-deployment` is the delivery skill for the deploy topology on `docker`, `docker swarm`, `k8s`.
- `ci-cd-release` is the delivery skill for the CI/CD pipeline, registry, tagging, promotion, approval and release gate.
- If a step is saved as a `.md` note, `obsidian-markdown` is mandatory.
- If a step has an additional `.canvas` diagram, you must add `json-canvas`.
- If a step has an additional dashboard or index `.base`, you must add `obsidian-bases`.
- `.canvas` and `.base` are only auxiliary artifacts; they must not replace the `.md` note as the source of truth.

Operational consequences:

- The business skill column in the workflow chain does not replace the artifact law.
- A step may need both a business skill and an Obsidian skill.
- When reading this policy, understand that `codex-workflow-chain` is the mandatory layer for the workflow, the execution runtime decides how a step is run, and the Obsidian skill is the mandatory layer for the artifact form.
- For a materialized workflow note, the metadata should clearly separate `content_skills` and `artifact_skills` instead of merging them, to avoid confusing the content-creation skill with the artifact-form skill.

## Multi-Agent And Handoff Rules

- `multi-agent` may only be used when the coordinator can state clearly the reason for choosing the mode, which roles participate, which worker owns which part, and who is the final verifier.
- A worker may only hand off to the `coordinator`, not directly to the next step.
- Each worker handoff must have at minimum: `status`, `summary`, `outputs_produced`, `evidence`, `open_issues`, `recommended_next_action`.
- If `owned_paths` or `owned_scope` overlap strongly and there is no clear merge strategy, you must fall back to `agentic` or `sequential multi-role`.
- The final audit always runs on the merged output; do not close a step based on separate partial output.
- For step 7 and step 8, if the verification owner is not clearly identified, do not enable `multi-agent`.

## DevOps Rules

- `deployment-devops` is used to lock the overall DevOps scope, the environment matrix and the cross-layer guards.
- `containerization-packaging` is used when the focus is local containerization or the image build contract.
- `platform-runtime-deployment` is used when the focus is runtime deploy for `dev`, `uat`, `prod`.
- `ci-cd-release` is used when the focus is the pipeline, artifact flow, approval and promotion between environments.
- `local` must have a baseline running with `Dockerfile` and `compose.yaml` if the work item has a containerization goal.
- `dev`, `uat`, `prod` must state the target runtime clearly as `docker`, `docker swarm` or `k8s`; do not leave it vague at the design step.
- Prefer promoting the same image contract across environments; environment differences should live in config, secrets, replica and rollout strategy.
- Do not bake secrets or environment-specific values into the image.
- Every rollout plan must have post-deploy verification and a clear rollback path.

## NotebookLM Rules

- `notebooklm` is a skill that integrates an external tool, only used when you need to research/query a large corpus or many documents outside the codebase.
- `notebooklm` does not replace `step-goal-contract`, does not replace the final decision in the workflow note, and does not replace direct technical verify on the codebase.
- Prefer using `notebooklm` at step 1, 3, 5 and when needed at step 8.
- Output from `notebooklm` is only treated as supporting input; every official conclusion must be normalized into the step `.md` note.
- If `NotebookLM` is blocked by auth, network or tool failure, fall back to manual reading or another research flow and state the limitation clearly.

## Obsidian Artifact Rules

- The standard artifact for workflow documentation is a `.md` note; if a step saves an analysis, design, plan or verify artifact to a file, the default standard file is `.md` and `obsidian-markdown` is mandatory.
- A `.canvas` file is only an auxiliary artifact for visualization; it must not replace the `.md` note as the source of truth for a decision, scope, criteria or verify conclusion.
- A `.base` file is only an auxiliary artifact for aggregation or a dashboard; it must not replace the `.md` note as the source of truth for a request, plan or verify conclusion.
- When a task creates or edits a `.base` file, `obsidian-bases` is mandatory.
- When a task creates or edits a `.canvas` file, `json-canvas` is mandatory.
- `obsidian-cli` is not currently mandatory; only consider it when there is a specific request.

## Artifact Matrix By Step

- Step 1-4: if an artifact is saved, only use `.md`; do not use `.canvas` or `.base`.
- Step 5: `.md` is mandatory; a `.canvas` is allowed to illustrate architecture or flow; do not use `.base`.
- Step 6: `.md` is mandatory; a `.canvas` is allowed for a task map and a `.base` is allowed for a task/index dashboard.
- Step 7: by default no separate Obsidian artifact is required; only use `obsidian-markdown` if you create or edit `.md` documentation within the implementation scope; do not use `.canvas` or `.base` unless there is a clear request.
- Step 8: if a verify report is saved, `.md` is mandatory; a `.base` is allowed for a results-aggregation dashboard; do not use `.canvas` unless the user clearly requests a specific investigation diagram.

Quick memory aid:

- Writing workflow documentation: always think of `obsidian-markdown`.
- Drawing to illustrate: add `json-canvas`.
- Building an aggregation table: add `obsidian-bases`.
- Standard decisions, criteria, risks and verify conclusions: always go back to the `.md` note.

Beyond the per-step business blocks, a workflow note should also have:
- `## Traceability` to trace business -> readiness -> design -> implementation -> verify.
- the `work_item_type` metadata to distinguish `FEATURE|BUG|CHANGE|REFACTOR|RESEARCH`.
- the `workflow_stage` metadata to separate the discovery and delivery parts within the same workflow chain.

If a step is saved as a `.md` file, you must use the standard output template per step in `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`, including naming, frontmatter and the corresponding contract/spec block.
When you need more detailed runtime rules for `agentic`, `multi-agent`, role contract, handoff/merge protocol and `notebooklm`, read:
`skills/orchestration/codex-workflow-chain/references/execution-runtime.md`

## Conflict Rules

Local per-project guidance may add stricter rules.
This global workflow chain is still mandatory, unless the user explicitly requests an override.

## Final Handoff Format

Use the following order:
1. Plan that was executed.
2. Files that changed.
3. Verification results.
4. Remaining risks and next steps.