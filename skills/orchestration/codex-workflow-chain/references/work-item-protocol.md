---
language: en
---

# Work Item Protocol

> Vietnamese: work-item-protocol.vi.md

Versioning notes:

- this document belongs to the `post-v1` extension layer
- `baseline v1` does not require `Work Item Protocol`
- in `baseline v1`, the work-item-level lifecycle is tracked mainly through the workflow note, the artifact validator, and manual review
- the official version boundary lives in `workflow-versioning.md`

This document defines the operating protocol of a `work item` after the materialization decision has been made.

If `work-item-materialization.md` answers the questions:

- whether to open a new work item
- what the slug is
- whether a `change layer` is needed

then this document answers:

- what state the work item is in
- who is allowed to change that state
- what handoff or evidence is needed to continue
- which command or action corresponds to each state

Cross-reference date: `2026-04-14`.

## Goal

`Work Item Protocol` is the contract at the operating layer between:

- the raw request and materialization
- scaffold and the `s01 -> s08` workflow backbone
- the change lifecycle in `changes/`
- the authority of the human, the coordinator, and the agentic runtime

The goal of this protocol is to:

- stop new work items from being opened arbitrarily
- stop scaffolding without clear ownership, state, or handoff
- allow `agentic` to open a work item on its own when conditions are met
- keep a consistent audit trail from proposal to close or archive

Important notes:

- `work item approval` does not replace the `bootstrap gate` of an `empty/greenfield project`
- for a new project, before materializing the first implementation work item, there must be evidence that `Spec`, `Contract` when present, `Approach`, and `Foundation Decision` when present have been human-passed
- for `brownfield`, the protocol still allows materialize/scaffold for authoring, but the work item must declare `delivery_context=brownfield` and follow enough of the backbone's baseline/impact/regression output before implementing
- if there is no bootstrap evidence yet, the correct handoff is to go back to clarify/spec/approach, not to scaffold and legitimize afterward
- `list` and `status` may bootstrap a read-only report from old `s01` to observe the state of legacy scaffolding
- mutating actions such as `approve`, `reject`, `activate`, `block`, `resume`, `verify`, `close`, `archive`, `cancel` must use an already-existing report; they must not bootstrap from `s01` on their own
- human gates are considered trusted only when there is a signed receipt outside the project root; metadata in a note/report is no longer enough to open a gate on its own

## Scope

Applies to the lifecycle of **one** work item.

Does not apply to:

- an initiative, epic, or portfolio of many work items
- the state of each individual step in `s01 -> s08`
- the separate state of a `change package`

This protocol does not create a new step.

- `Materialization` remains the gate before `scaffold`
- the `Workflow backbone` remains the main delivery chain
- the `Execution runtime` remains how each step is run

## Relationship With Other Documents

- `work-item-materialization.md`: pins boundary, slug, dedup, `change_strategy`
- `workflow-chain.md`: governs the steps, artifacts, gates, and handoffs of `s01 -> s08`
- `execution-runtime.md`: governs `agentic|multi_agent` at the step level
- `spec-driven-development.md`: governs the lifecycle of `BRD/SRS` when `SDD` applies
- `changes/README.md`: governs the lifecycle of a change package

A short line to remember:

- `Materialization` opens the door
- `Work Item Protocol` holds the state
- `Workflow Chain` does the delivery

## Core Entities

A work item under this protocol consists of the following logical parts:

- `raw_request`
- `materialization_report`
- `work_item_slug`
- `workflow_root`
- `change_strategy`
- `change_id`
- `protocol_status`
- `current_step`
- `handoff_target`
- `audit_events`

## Protocol Status

`protocol_status` is the state at the work-item level, not the state of a step.

Standard enum:

- `INTAKE`
- `PROPOSED`
- `READY_TO_MATERIALIZE`
- `MATERIALIZED`
- `ACTIVE`
- `BLOCKED`
- `VERIFIED`
- `DONE`
- `ARCHIVED`
- `CANCELLED`

## Meaning Of Each Status

### `INTAKE`

- the raw request has just been received
- no stable slug yet
- not yet allowed to scaffold

### `PROPOSED`

- there is a candidate work item or a candidate split
- materialization is not solid enough to scaffold
- may need human confirmation or further clarification

### `READY_TO_MATERIALIZE`

- `materialization_status=READY`
- dedup is clear
- `change_strategy` is clear
- conditions to call the scaffold command are met

### `MATERIALIZED`

- the required change package has been scaffolded or reused
- the workflow artifact root for the work item has been created
- the initial frontmatter/naming exists

### `ACTIVE`

- the work item has opened an execution path in the `s07 -> s08` backbone
- the pre-code authoring gates at `s04`, `s05`, `s06` have the right evidence for the runtime to allow implementation

### `BLOCKED`

- the work item has a blocker stopping progress
- the blocker may come from input, governance, spec, authority, tooling, or the change package

### `VERIFIED`

- `s08` has enough verification evidence to conclude technically
- not the same as `DONE` if signoffs or release/business acceptance remain

### `DONE`

- the work item has reached `DoD`
- the required signoffs in `s08` are complete; if the scope requires it, this includes `UAT`, `Release`, and `Business Acceptance`

### `ARCHIVED`

- if there is a change package, `archive_status=archived`
- if there is no change package, the work item is closed and has no open delivery action

### `CANCELLED`

- the work item is intentionally canceled
- it does not continue the current delivery chain
- it must have a reason and a replacement ref if superseded

## Standard Transitions

### Valid Transitions

- `INTAKE -> PROPOSED`
- `PROPOSED -> READY_TO_MATERIALIZE`
- `READY_TO_MATERIALIZE -> MATERIALIZED`
- `MATERIALIZED -> ACTIVE`
- `ACTIVE -> BLOCKED`
- `BLOCKED -> ACTIVE`
- `ACTIVE -> VERIFIED`
- `VERIFIED -> DONE`
- `DONE -> ARCHIVED`
- `PROPOSED -> CANCELLED`
- `READY_TO_MATERIALIZE -> CANCELLED`
- `MATERIALIZED -> CANCELLED`
- `ACTIVE -> CANCELLED`
- `BLOCKED -> CANCELLED`

### Invalid Transitions

- `INTAKE -> MATERIALIZED` without going through materialization
- `PROPOSED` or `READY_TO_MATERIALIZE` -> `ACTIVE` without materializing and without the required gate evidence
- `ACTIVE -> DONE` without `VERIFIED`
- `DONE -> ACTIVE` unless opening a new work item or via an explicit re-open protocol
- `ARCHIVED -> ACTIVE` by hand-editing an old artifact; a new protocol event or a new work item must be created instead

## Conditions For Each Transition

### `INTAKE -> PROPOSED`

Requires:

- a `raw_request`
- a minimum request summary
- a first candidate or a `defer/split` decision has been made

### `PROPOSED -> READY_TO_MATERIALIZE`

Requires:

- `materialization_status=READY`
- `work_item_slug` passes the naming rule
- `dedup_result` is no longer ambiguous
- `change_strategy` is concluded
- no authoring-level blocker remains

### `READY_TO_MATERIALIZE -> MATERIALIZED`

Requires:

- the required scaffold command has run successfully
- if `change_strategy=create_new`, the change package must exist before or within the same logical transaction
- the minimum baseline validator does not fail at the initial naming/frontmatter level

### `MATERIALIZED -> ACTIVE`

Requires:

- `work item approval` is `APPROVED`
- if there is a `change_id`, `change package approval` is `APPROVED`
- if `delivery_context=greenfield`, the `bootstrap gate` is `APPROVED`
- `s04`, `s05`, `s06` have enough gate evidence to open execution
- `granted_write_paths` has been declared so capability control knows which implementation path is open for writing
- a trusted signed receipt for `work-item`, `change`, and the required step gates exists and still matches the current artifact
- the handoff into the execution path is clear

### `ACTIVE -> BLOCKED`

Requires:

- the blocker is clearly described
- the owner or the action to clear the blocker is recorded
- if the blocker is governance/spec/change, the corresponding ref is present

### `BLOCKED -> ACTIVE`

Requires:

- the blocker has been resolved or an accepted assumption has been recorded
- the handoff back to the step owner is clear

### `ACTIVE -> VERIFIED`

Requires:

- `s08` has verify evidence and the source-of-truth has been updated
- residual risks are recorded transparently
- the technical quality gate is complete or the limitation is stated

### `VERIFIED -> DONE`

Requires:

- `definition-of-done` has passed in `s08`
- `uat`, `release`, and `business_acceptance` are done in `s08` if the scope requires
- no open blocker at the work-item level

### `DONE -> ARCHIVED`

Requires:

- if there is a `change_id`, the change package archive lifecycle is complete
- if there is no `change_id`, the work item is concluded as closed with no pending delivery

## Operation Protocol

### `propose`

Goal:

- turn a raw request into a candidate work item

Minimum output:

- `materialization_report`
- `protocol_status=PROPOSED`

### `materialize`

Goal:

- lock the `work_item_slug`
- lock the `change_strategy`
- scaffold the initial artifacts

Minimum output:

- `workflow_root`
- `protocol_status=MATERIALIZED`

### `activate`

Goal:

- hand off the scaffolded work item into the backbone at `s01`

Minimum output:

- `current_step=s07`
- `protocol_status=ACTIVE`

### `block`

Goal:

- stop progress explicitly, not via an implicit state

Minimum output:

- `blockers`
- `handoff_target`
- `protocol_status=BLOCKED`

### `resume`

Goal:

- return to `ACTIVE` after the blocker is cleared

### `verify`

Goal:

- conclude the technical verification at the work-item level

Minimum output:

- `current_step=s08`
- `protocol_status=VERIFIED`

### `close`

Goal:

- close the work item after `VERIFIED`

Minimum output:

- `protocol_status=DONE`

### `archive`

Goal:

- end the lifecycle of the work item

Minimum output:

- `protocol_status=ARCHIVED`

### `cancel`

Goal:

- intentionally cancel the work item

Minimum output:

- `protocol_status=CANCELLED`
- `reason`
- `superseded_by` if any

### `split`

`split` is a special operation, not a status.

Rule:

- prefer splitting at `PROPOSED` or `READY_TO_MATERIALIZE`
- if splitting after `MATERIALIZED`, the parent must clearly state whether it keeps residual scope or is superseded
- if the parent has no executable scope left, the parent should move to `CANCELLED`

## Authority Model

### Human

Has default authority to:

- approve or reject a candidate work item
- request a split, a merge logic, or a cancel
- decide whether a vague initiative may be auto-scaffolded

### Coordinator

Has authority to:

- run the protocol within the delivery flow
- move `MATERIALIZED -> ACTIVE`
- move `ACTIVE <-> BLOCKED`
- propose `DONE` or `CANCELLED`

The coordinator does not override governance authority or business acceptance authority on its own.

### Agentic

May only do the following on its own:

- `propose`
- `materialize`
- scaffold a new work item

when all of the following hold at the same time:

- `materialization_status=READY`
- `protocol_status=READY_TO_MATERIALIZE`
- there is no ambiguity about `reuse_work_item` or `reuse_change`
- the scaffold command is fully derivable

Agentic must not on its own:

- split a vague initiative into many items without a clear rule
- reuse or reopen an archived work item without a human/coordinator decision
- mark `DONE` or `ARCHIVED` based only on scaffolding or code changes

## Handoff Protocol

### Required Handoffs At The Work-Item Level

- `materialization -> scaffold`
- `MATERIALIZED -> s01 Clarify`
- `BLOCKED -> blocker owner`
- `VERIFIED -> signoff owners`
- `DONE -> archive lifecycle`

### Minimum Handoff Payload

Each handoff should have:

- `protocol_status`
- `work_item_slug`
- `current_step`
- `summary`
- `required_actions`
- `blockers`
- `handoff_target`
- `refs`

## Standard Output Contract

The current baseline supports two ways to keep protocol output:

- a JSON report, by default written to `<workflow_root>/<work_item_slug>.work-item-report.json` when running `wfc materialize --auto-scaffold`
- a `## Work Item Protocol` block in `s01` to audit directly inside the workflow note

```yaml
protocol_status: INTAKE|PROPOSED|READY_TO_MATERIALIZE|MATERIALIZED|ACTIVE|BLOCKED|VERIFIED|DONE|ARCHIVED|CANCELLED
approval_status: PENDING_REVIEW|APPROVED|REJECTED|NOT_REQUIRED
review_required: true
work_item_slug: ""
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
workflow_root: ""
current_step: s01|s02|s03|s04|s05|s06|s07|s08|""
materialization_status: PROPOSED|READY|BLOCKED
change_strategy: none|reuse_existing|create_new
change_id: ""
delivery_context: greenfield|brownfield
decision_owner: agent|coordinator
protocol_owner: ""
reviewed_by: ""
reviewed_at: ""
handoff_target: ""
required_actions: []
blockers: []
review_notes: []
refs: []
audit_events: []
protocol_events: []
bootstrap_gate_status: PENDING_REVIEW|APPROVED|NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
```

Notes:

- `NOT_REQUIRED` is kept in the enum for compatibility with old artifacts; a new protocol-managed work item must not use this value.
- `review_required` must always be `true` for a protocol-managed work item.
- `decision_owner` is the owner of the materialization/protocol decision produced by the runtime; it does not replace human approval authority.

## Audit Event Vocabulary

A stable vocabulary is recommended:

- `REQUEST_CAPTURED`
- `CANDIDATE_PROPOSED`
- `SLUG_LOCKED`
- `DEDUP_CONFIRMED`
- `CHANGE_REUSED`
- `CHANGE_CREATED`
- `WORKFLOW_SCAFFOLDED`
- `STEP_OPENED`
- `WORK_ITEM_APPROVED`
- `WORK_ITEM_REJECTED`
- `WORK_ITEM_ACTIVATED`
- `WORK_ITEM_BLOCKED`
- `WORK_ITEM_RESUMED`
- `VERIFICATION_CONFIRMED`
- `DONE_CONFIRMED`
- `ARCHIVE_CONFIRMED`
- `WORK_ITEM_CANCELLED`
- `WORK_ITEM_SPLIT`

## Command Surface Mapping

### Current Baseline

- `wfc materialize --request "<raw-request>"`
- `wfc work-item status --work-item <slug>`
- `wfc work-item approve --work-item <slug> --reviewed-by <role>`
- `wfc work-item reject --work-item <slug> --reviewed-by <role> --note "<reason>"`
- `wfc gate approve --work-item <slug> --gate <spec|dor|approach|task_plan|bootstrap|dod|...> --reviewed-by <role>`
- `wfc work-item activate --work-item <slug> --step s07 --write-root <path>`
- `wfc work-item block --work-item <slug> --blocker "<reason>"`
- `wfc work-item resume --work-item <slug>`
- `wfc work-item verify --work-item <slug>`
- `wfc work-item close --work-item <slug>`
- `wfc work-item archive --work-item <slug>`
- `wfc work-item cancel --work-item <slug> --reason "<reason>"`
- `wfc capability status`
- `wfc capability sync`
- `wfc capability check --path <path>`
- `wfc protocol --workflow-root work-items --project-root .`
- `wfc scaffold-change --change-id <CHANGE-ID> --work-item <work-item-slug>`
- `wfc scaffold --work-item <work-item-slug> --planning-track <quick|full|enterprise>`
- `wfc scaffold-step --work-item <work-item-slug> --step <sNN>`
- `wfc validate --workflow-root work-items --project-root .`

`wfc materialize` in the current baseline:

- generates the materialization + protocol report as JSON
- derives the candidate slug, `change_strategy`, `change_id`, `planning_track`, `governance_profile`
- supports `--auto-scaffold` when the status reaches `READY_TO_MATERIALIZE`
- embeds the `Work Item Materialization` and `Work Item Protocol` blocks into `s01` after scaffolding succeeds
- sets `approval_status=PENDING_REVIEW` on its own, forcing human review before `ACTIVE`
- does not open `ACTIVE` just because scaffolding finished; `s04-s06` must have the right gate evidence before execution

`wfc work-item list|status`:

- may bootstrap a read-only report from `s01` if an old work item has no `.work-item-report.json`
- must not sync this bootstrap report back to the filesystem

`wfc work-item approve|reject|activate|block|resume|verify|close|archive|cancel`:

- must use an existing `.work-item-report.json`
- if there is only a legacy `s01` and no report yet, it must re-materialize or create the report via the official flow first
- `activate` and `resume` into `ACTIVE` at `s07` must have at least one `write-root` so capability control opens the correct implementation path

`wfc gate approve|reject|status`:

- used to seal a trusted receipt for the required human review gates
- for step gates such as `spec`, `dor`, `approach`, `task_plan`, the receipt pins the digest of the current note; editing the note after approval makes the receipt stale
- for `bootstrap`, the receipt pins the artifact passed via `--ref`
- the first approval in a trusted approval root creates an approver keypair and asks the human to enter an approval passphrase

`wfc capability status|sync|check`:

- `status`: see which paths capability control treats as authoring roots, protected roots, and granted write roots
- `sync`: apply the capability control policy to the project's filesystem write permissions
- `check --path <path>`: check whether a specific path may be written under the current policy

### Target Extension

The following commands are still the next target contract:

- `wfc work-item split --work-item <slug>`
- `wfc work-item reopen --work-item <slug>`
- `wfc work-item list`

If implemented later, these commands must follow the enum and transitions in this document; they must not invent new states on their own.

## Integration With The Current Workflow

Recommended flow:

1. `INTAKE`
2. run `Work Item Materialization`
3. if ready, move to `READY_TO_MATERIALIZE`
4. scaffold the change package if needed
5. scaffold the workflow
6. move to `MATERIALIZED`
7. author `s01 -> s06`, recording the protocol + materialization block and completing the required human gates
8. move to `ACTIVE`
9. go through `s07 -> s08`
10. after `s08`, move `VERIFIED -> DONE`
11. if the lifecycle requires it, move to `ARCHIVED`

## Recommended Audit Block In `s01`

````md
## Work Item Protocol
```yaml
protocol_status: ACTIVE
approval_status: APPROVED
review_required: true
work_item_slug: ""
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
workflow_root: ""
current_step: s07
granted_write_paths: []
materialization_status: PROPOSED|READY|BLOCKED
change_strategy: none|reuse_existing|create_new
change_id: ""
delivery_context: greenfield|brownfield
decision_owner: agent|coordinator
protocol_owner: ""
reviewed_by: ""
reviewed_at: ""
handoff_target: ""
required_actions: []
blockers: []
review_notes: []
refs: []
bootstrap_gate_status: PENDING_REVIEW|APPROVED|NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
audit_events:
  - REQUEST_CAPTURED
  - CANDIDATE_PROPOSED
  - SLUG_LOCKED
  - WORKFLOW_SCAFFOLDED
  - STEP_OPENED
```
````

This block does not replace `## Step Contract`.

It only keeps the lifecycle state at the work-item level.

## Examples

### Example 1. Vague Request

Input:

- `I want to build a login feature`

Recommended protocol:

```yaml
protocol_status: PROPOSED
materialization_status: PROPOSED
work_item_slug: "user-login"
change_strategy: create_new
required_actions:
  - "clarify login scope"
  - "confirm split or single work item"
blockers:
  - "scope not clear whether email/password or social login"
```

Meaning:

- there is a candidate
- it has not been scaffolded

### Example 2. Clear Bug

Input:

- `Fix timeout when a user logs in with email/password on web`

Recommended protocol:

```yaml
protocol_status: READY_TO_MATERIALIZE
materialization_status: READY
work_item_slug: "fix-login-timeout"
change_strategy: none
required_actions:
  - "npm run scaffold:workflow -- --work-item fix-login-timeout --planning-track quick"
audit_events:
  - REQUEST_CAPTURED
  - CANDIDATE_PROPOSED
  - SLUG_LOCKED
  - DEDUP_CONFIRMED
```

After scaffolding:

```yaml
protocol_status: MATERIALIZED
workflow_root: "work-items/fix-login-timeout"
audit_events:
  - WORKFLOW_SCAFFOLDED
```

## Conclusion

`Work Item Materialization` helps decide whether to open a work item.

`Work Item Protocol` helps manage that work item after the decision has been made.

When these two layers work together:

- `agentic` can open a work item on its own in a controlled way
- scaffold is no longer an isolated action
- the state, authority, and handoff of a work item become auditable