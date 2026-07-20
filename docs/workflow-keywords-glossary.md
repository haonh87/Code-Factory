---
language: en
---

# Workflow Keyword Glossary

> Vietnamese: workflow-keywords-glossary.vi.md

This document explains the semantics of the key keywords in the current workflow.

Goals:

- provide one centralized place to look up recurring keywords and terms
- reduce the situation where every document explains a term differently
- help readers understand keywords in the correct context of this repo's workflow

Cross-reference date: `2026-04-20`.

## How To Read

- Each keyword is explained across three facets:
  - `meaning`: what the keyword denotes
  - `not to be understood as`: the boundary that prevents misreading
  - `used where`: where the keyword typically appears in the workflow

## Backbone Terms

| Keyword | Meaning | Not to be understood as | Used where |
|---|---|---|---|
| `Clarify` | the step that clarifies requirements, drafts scope, gathers context and initial risk | not a coding or detailed design step | `s01` |
| `Business Goal` | the step that pins business value, KPIs, and non-goals | not a technical approach | `s02` |
| `Open Questions` | the step that collects blockers, assumptions, conflicts, and missing input | not the place to force a solution when data is still missing | `s03` |
| `Acceptance + DoR` | the step that pins acceptance criteria and readiness | not just a formal checklist | `s04` |
| `Technical Approach` | the step that pins the technical direction to take | not raw brainstorming, and not implementation | `s05` |
| `Task Plan` | the step that breaks the approach into ordered tasks with a verify path | not a vague TODO-style list | `s06` |
| `Implement` | the step that produces real changes in code/config/doc | must not begin before design meets its preconditions | `s07` |
| `Verify + DoD` | the step that concludes evidence, compliance, and completion | not just "a test pass means done" | `s08` |

## Gate Terms

| Keyword | Meaning | Not to be understood as | Used where |
|---|---|---|---|
| `Spec` | the gate that pins a human-approved requirement/spec baseline to serve as the source of truth | not merely the existence of a spec draft file | mostly `s04` |
| `Contract` | the gate that pins a human-approved `API contract` or `UX contract`, or an explicit `not_applicable` ruling | not a preliminary interface mock | mostly `s04` |
| `DoR` | `Definition of Ready`: the verdict stating the work item is clear enough to move into design/planning/implementation | not a gut-feel approval | mostly `s04` |
| `Foundation Decision` | the gate that pins the solution class, stack, runtime, or deployment model that a human selects as final | not an AI recommendation | mostly `s05` |
| `UAT` | `User Acceptance Testing`: the gate confirming the actual result matches the approved spec/contract in a user-facing scenario | not a replacement for `DoD` | mostly `s08` |
| `Release` | the gate confirming the work item is ready to ship, roll out, and roll back per the actual release scope | not merely a technical release recommendation | mostly `s08` |
| `Business Acceptance` | the gate confirming the final outcome matches the approved business intent | not a technical review or pure UAT | mostly `s08` |
| `approval_gates` | the map indicating which gate is `required` or `not_applicable` for each note/work item | not evidence that a human reviewed | workflow frontmatter |
| `approval_status` | the approval state of a protocol-managed work item/change, such as `PENDING_REVIEW`, `APPROVED`, `REJECTED` | not the verdict of a step note; `NOT_REQUIRED` is only a compatibility enum, not a valid path for a protocol-managed item | protocol report |
| `review_required` | the flag indicating whether the protocol's approval gate is a genuine review | for a protocol-managed work item/change it must not be set to `false` at present | protocol report |
| `delivery_context` | the delivery context of a work item: `greenfield` or `brownfield` | not a planning depth such as `quick|full|enterprise` | workflow frontmatter |
| `capability control` | the filesystem-level enforcement layer that locks the implementation path until the protocol grants the correct write permission | not a substitute for human approval, business review, or the validator | runtime, protocol, `s07` |
| `DoD` | `Definition of Done`: the verdict stating the work item has enough evidence to close | not a code review pass | mostly `s08` |
| `role_signoffs` | the authority map stating which role is responsible for signing off each gate | not evidence of an actual review | workflow frontmatter |
| `gate_reviews` | the audit trail recording the reviewer role and review time for each gate | not a replacement for `role_signoffs`, nor for a waiver's `approved_by` | workflow frontmatter |
| `Missing Gates` | the list of gates or artifacts still missing in the router status block, so a human can see why the workflow may not proceed | not cosmetic status text; if it differs from `NONE` the workflow is not considered execution-ready | router status block, handoff |
| `Next Human Action` | the specific review, approval, or confirmation action a human must take next to open the gate | not a placeholder; if `Missing Gates` differs from `NONE` it must not be `NONE` | router status block, handoff |
| `trusted approval receipt` | a signed receipt stored outside the project root proving a human gate has been genuinely sealed | not metadata inside a note/report, and not a plain review comment | protocol, gate commands |
| `spec/design before code` | hard rule: no implementation until `s04-s06` meet their preconditions | not a hint or a preference | policy, `s07` gate |
| `brainstorming with discipline` | hard rule: do not pin `s05` without option comparison at a level suited to the work item | not a license to extend discovery indefinitely | `s05` gate |
| `planning execution-oriented` | hard rule: do not enter `s07` with a task plan that is still vague, full of placeholders, or unclear enough to execute | not just "having a task list is enough" | `s06` gate |
| `TDD for behavior change` | hard rule: a change that touches behavior must prefer test-first, then code | not just "having tests is enough" | `s07` gate |
| `worktree for large or risky change` | workspace-isolation rule: large or high-risk change must prefer a separate workspace before implementing | not mandatory for every quick fix | `s07` gate |
| `early review, not deferred to the end` | review rule: review of risky batches/tasks or critical parts must occur within `s07` | not waiting until `s08` to review the entire diff | `s07` gate |
| `two-tier review` | review-ordering rule: check `spec compliance` first, then `code quality` | not a pure code review that ignores whether the spec is met | `s07` gate |
| `subagent only for independent tasks` | delegation rule: only split workers when the task is independent enough to assign, merge, and verify without conflict or drift | not "parallelize whenever you feel like it" | `s07` gate |
| `no premature done declaration` | conclusion rule: only `s08` with a clear `DoD` verdict may consider the work item complete | not "code merged, local test pass, or review pass means done" | `s08` gate |
| `branch/worktree closed only after verify` | execution-closing rule: `cleanup`, `close`, `remove`, or `merge` is only valid after `s08` has a clear `DoD` verdict | not "a clean branch/worktree means it can be closed early" | `s08` gate |
| `safe default` | fallback rule: when not certain, choose the more conservative direction (e.g. `full`), do not spin up a `subagent` casually, do not open new boundaries casually, and do not assume a gate has passed | not an excuse to delay indefinitely or to bypass hard rules | across steps |
| `verification_owner` | the person or role responsible for the final verification | does not imply that person must code | execution runtime, `s08` |

## Design And Planning Terms

| Keyword | Meaning | Not to be understood as | Used where |
|---|---|---|---|
| `option analysis` | the option comparison done before pinning an approach | not the final technical approach | `s05`, brainstorming |
| `recommended option` | the option recommended after comparison | not "personal preference" | `option analysis` |
| `smallest sufficient solution` | the smallest option that still meets the ACs, current constraints, relevant `governance`, and the key verification need | not a shoddy solution or one that cuts quality gates | `s05` |
| `behavior change` | a change that alters the observable behavior of the system, such as a bug fix, feature behavior, validation rule, contract change, or a refactor with significant regression risk | not docs-only, format-only, or metadata-only | mostly `s07` |
| `large or risky change` | a change that should use a `worktree`, typically with one of: `enterprise`, lasting more than one session, touching many boundaries/files with significant conflict risk, or high merge/branch/release risk | not every `full` change automatically belongs to this group | mostly `s07` |
| `independent task` | a task clear enough to assign to a separate worker, typically with relatively disjoint `owned_scope` or `owned_paths`, a clear `merge path`, and a clear `verify path` or `verification_owner` | not a small but tightly coupled task, or one whose context was just discovered | mostly `s07` |
| `validation plan` | what must be verified before or during implementation | not a full test report | `s05`, `s08` |
| `technical approach` | the chosen technical direction for delivery | not a task list | `s05` |
| `foundation decision` | a project's foundational decision such as solution class, stack, runtime, or deployment model | not a small implementation detail of one task | mostly `s05` in `empty/greenfield project` |
| `bootstrap gate` | the project-level gate layer before materializing or implementing the first work item in an `empty/greenfield project` | not the same meaning as `work item approval` | intake, materialization, `s04-s05` |
| `brownfield` | the delivery context where the existing system is a running baseline and the change must respect compatibility/regression constraints | not an excuse to drop the spec or skip review gates | across `s04-s08` |
| `task plan` | ordered execution tasks with the main touch points or ownership and a verify path | not a placeholder like "handle edge cases" | `s06` |
| `Delivery Rule Evidence` | the structured evidence block at `s07` that pins `TDD`, `worktree`, two-tier review, and delegation conditions | not freeform prose notes or a generic changelog | `s07` |
| `write-root` | the path granted when activating or resuming into `s07` so capability control opens write permission for implementation | not permission to edit any file in the repo | protocol CLI, `s07` |
| `granted_write_paths` | the list of implementation paths the protocol has granted write permission to for an `ACTIVE` work item | not the authoring path or the source of truth for approval | protocol report, capability control |
| `approval passphrase` | a secret held by a human to sign trusted approval receipts | not `reviewed_by`, and should not be treated as repo config | trusted approval flow |
| `authoring roots` | workflow/artifact roots that remain writable even when the implementation path is locked | not the implementation path, nor a special bypass for code | capability control config |
| `protected roots` | roots that capability control locks for writing by default until a suitable grant exists | not a fixed list for every repo; may be affected by config and project structure | capability control config |
| `execution-oriented task plan` | a task plan clear enough on main touch points, order or dependencies, verify path, and required checkpoints that the implementer can deliver without reinventing the design | not a vague idea-level plan | `s06` |
| `verify path` | how to verify a task or change after the work | not just a sentence saying "will test" | `s06`, `s08` |
| `placeholder` | a vague description that does not state what it touches, what it does, or how it is verified | not a valid task plan | mostly `s06` |
| `empty project` / `greenfield project` | a project with no approved stack/runtime baseline, or a nearly empty repo, so solution-class and stack decisions are foundation decisions | must not be treated as a normal project where the AI picks a stack and implements right away | runtime hard stop |

## Canonical Sentences

When you need to write briefly while preserving semantics, prefer the following sentences:

- `smallest sufficient solution`: if a smaller option still meets the ACs, current constraints, relevant `governance`, and the key verification need, you must choose it.
- `planning execution-oriented`: the task plan must be clear enough on main touch points, order or dependencies, verify path, and required checkpoints that the implementer does not reinvent the design.
- `capability control`: the implementation path may only be written when the work item is `ACTIVE`, is at `s07`, and `granted_write_paths` has been granted explicitly.
- `router status consistency`: if `Missing Gates` differs from `NONE`, `Workflow Status` must not be `ACTIVE`, `READY_FOR_REVIEW`, or `VERIFIED`, and `Next Human Action` must not be `NONE`.

## Governance Terms

| Keyword | Meaning | Not to be understood as | Used where |
|---|---|---|---|
| `governance` | the shared rule/checklist/authority layer for the workflow | not the workflow itself | throughout |
| `governance context` | the rule, constraint, and authority context relevant to a work item | not a generic descriptive paragraph | `s01`, `s03` |
| `governance checks` | the checks that must pass before advancing a gate | not decoration inside a note | `s04`, `s06`, `s08` |
| `governance-exception` | a formally recorded deviation when going off-rule | not scattered prose in notes | `s05`, `s07`, `s08` |
| `waiver` | an authoritative approval for a controlled deviation or rule bypass | not a self-decision by the agent | governance |
| `governance_profile` | the governance level applied, such as `default`, `strict`, `regulated` | not an arbitrary tag | note metadata |

## SDD Terms

| Keyword | Meaning | Not to be understood as | Used where |
|---|---|---|---|
| `SDD` | `Spec Driven Development`: the spec drives design, code, and verification | not merely writing a spec for form's sake | throughout when enabled |
| `spec_refs` | reference to the source spec such as `BRD` or `SRS` | not an arbitrary reference link | note metadata |
| `spec_status` | the current state of the spec, such as `approved`, `frozen` | not the status of the code | note metadata |
| `approved` | the spec has been reviewed and accepted for use | does not necessarily lock changes | SDD |
| `frozen` | the spec is locked so implementation follows it | does not mean it can never change | SDD |
| `spec-change` | a formal change to the spec when implementation needs to deviate | not "edit code first, update spec later" | `s05-s07` |
| `spec-coverage-report` | a report mapping requirement/spec to verify evidence | not a changelog | `s08` |

## Execution Terms

| Keyword | Meaning | Not to be understood as | Used where |
|---|---|---|---|
| `agentic` | a single agent holds full ownership of the step | does not mean no gates are needed | execution mode |
| `multi_agent` | multiple roles or workers run around one step | not the default for every task | execution mode |
| `sequential_multi_role` | the fallback when there is no real sub-agent but the same role contract is still followed | not abandoning the execution protocol | runtime fallback |
| `review_mode=self` | the implementer reviews themselves | not a replacement for independent review when policy requires it | execution metadata |
| `spec compliance` | the review layer confirming the change correctly meets ACs, approach, spec, scope, and has no unrecorded drift | not a code-style review | execution metadata |
| `targeted review` | review focused on a batch, risky task, or specific logic/contract area | not a full-diff end-of-cycle review | execution metadata |
| `code quality` | the review layer that evaluates technical quality after spec correctness is confirmed | not a step that replaces `spec compliance` | execution metadata |
| `review_mode=independent` | the review must be separate from the implementer | does not imply multiple people must code | execution metadata |
| `owned_scope` | the logical responsibility area assigned to a worker | not the entire work item | worker assignment |
| `owned_paths` | a worker's file/path ownership | not permission to edit every related file | worker assignment |
| `merge path` | how a worker's output is brought back into the main flow without conflict or drift | not just a vague "will merge later" | execution metadata |
| `worktree` | a separate workspace used for implementation to reduce conflict, keep the branch clean, and isolate large or high-risk change | not a replacement for review, verify, or `DoD` | mostly `s07` |
| `TDD` | write tests first to drive implementation through a `Red -> Green -> Refactor` cycle | not writing code first and adding tests afterward | mostly `s07` |

## Planning Track Terms

| Keyword | Meaning | Not to be understood as | Used where |
|---|---|---|---|
| `planning_track` | the depth of authoring and review | not a different workflow | scaffold, metadata |
| `quick` | small change, one main boundary, condensed authoring | does not permit skipping design/task plan | planning track |
| `full` | the default baseline for ordinary features/changes | not enterprise-level review by default | planning track |
| `enterprise` | scope across many boundaries, or high review/release risk | not just "a big task" | planning track |

## Artifact Terms

| Keyword | Meaning | Not to be understood as | Used where |
|---|---|---|---|
| `source-of-truth` | the canonical artifact used to pin a decision or conclusion | not every reference note | `work-items/`, `product-specs/`, `changes/` |
| `work-items/` | the canonical root for a work item's workflow artifacts | not a place to dump miscellaneous notes | repo root |
| `change package` | an artifact package following `proposal -> design -> tasks -> spec-delta -> archive` | not a workflow step | `changes/` |
| `canonical artifact` | the standard file representing a step | not a self-named filename based on personal meaning | workflow naming |
| `option-analysis-spec` | the spec produced from brainstorming/option analysis | not a replacement for `technical-approach-spec` | `s05` |

## Quick Disambiguation

| Keyword pair | Short distinction |
|---|---|
| `option analysis` vs `technical approach` | `option analysis` compares to choose; `technical approach` is the chosen direction |
| `task plan` vs `execution-oriented task plan` | `task plan` is the task plan; `execution-oriented task plan` is a task plan clear enough to execute for real |
| `DoR` vs `DoD` | `DoR` answers "is it ready enough to work on"; `DoD` answers "is there enough evidence to close" |
| `governance-exception` vs `waiver` | an `exception` is a recorded deviation; a `waiver` is the authoritative approval of that deviation |
| `approved` vs `frozen` | `approved` means the spec is accepted; `frozen` means the spec is locked for implementation to follow |
| `agentic` vs `multi_agent` | `agentic` has one main owner; `multi_agent` has multiple ownerships participating under a protocol |

## Priority Keywords

When writing new docs, prefer the following keywords to avoid semantic drift:

- `option analysis`
- `planning execution-oriented`
- `smallest sufficient solution`
- `technical approach`
- `task plan`
- `safe default`
- `DoR`
- `DoD`
- `governance checks`
- `governance-exception`
- `spec-change`
- `approved|frozen`
- `agentic|multi_agent`
- `planning_track`

## Related Documents

- `policies/codex/AGENTS.global.md`
- `skills/orchestration/codex-workflow-chain/SKILL.md`
- `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`
- `docs/hybrid-superpowers-policy.md`
- `docs/hybrid-superpowers-decision-matrix.md`