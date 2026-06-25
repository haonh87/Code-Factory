---
language: en
---

# Work Item Materialization

> Vietnamese: work-item-materialization.vi.md

Versioning notes:

- this document belongs to the `post-v1` extension layer
- `baseline v1` does not require `Work Item Materialization`
- in `baseline v1`, the human or coordinator pins the `work_item_slug` manually before scaffolding
- the official version boundary lives in `workflow-versioning.md`

This document materializes the authoring layer that sits before `scaffold`.

It answers four questions that the repo currently assumes but has not yet locked into a dedicated protocol:

- whether this raw request should create a new `work item`
- if yes, whether it is one item or multiple items
- what the `work_item_slug` should be
- whether a `change layer` is needed, and if so, whether to `reuse` or `create-new`

Cross-reference date: `2026-04-14`.

## Goal

`Work Item Materialization` is the step that turns a raw request into an actionable authoring decision.

The output of this step must be enough to:

- call `wfc scaffold --work-item <work_item_slug>` or the repo-local alias `npm run scaffold:workflow -- --work-item <work_item_slug>`
- decide whether `wfc scaffold-change --change-id <CHANGE-ID> --work-item <work_item_slug>` or the repo-local alias `npm run scaffold:change -- --change-id <CHANGE-ID> --work-item <work_item_slug>` is needed
- let the human or agentic runtime create new artifacts without duplicating scope, duplicating slugs, or attaching the wrong `change_id`

The lifecycle after the materialization decision is pinned is described further in `work-item-protocol.md`.

This document does not replace `s01 Clarify`.

- `Materialization` pins the authoring unit and naming.
- `s01 Clarify` pins the shared understanding, scope draft, and governance context inside the work item that has been materialized.

## Scope

Apply when:

- receiving a user request, ticket, incident, bug report, change request, or new initiative
- needing to decide whether to scaffold a new work item
- needing to connect the workflow backbone to `changes/`
- wanting to increase autonomy for `agentic` before letting the agent scaffold on its own

Do not apply when:

- only updating content for an existing work item whose scope is unchanged
- only rerunning the validator or fixing artifact naming
- only adding a side note that is not part of the workflow backbone

## Required Output

One pass of materialization must clearly answer:

1. `single`, `split`, or `defer`
2. what `work_item_type` is
3. what `work_item_slug` is
4. whether there is a conflict with existing `work-items/` or `changes/`
5. whether `change_strategy` is `none`, `reuse_existing`, or `create_new`
6. whether auto-scaffold is allowed or human confirmation is needed

## Minimum Input

### Required

- `raw_request`: the raw request description
- `request_source`: user chat, ticket, incident, change request, or doc ref
- `project_context_ref`: at minimum `project-context/project-context.md`
- `existing_work_items`: a list or search result inside `work-items/`
- `existing_changes`: a list or search result inside `changes/`

### Recommended

- `product_spec_refs`: related `BRD/SRS` if already present
- `release_context`: current release window or initiative if any
- `governance_profile_hint`: `default|strict|regulated|custom` if already known
- `owner_hint`: the role or team that will lead
- `environment_scope`: web, mobile, backend, data, runtime if already clear

If `raw_request`, `existing_work_items`, or `existing_changes` is missing, you must not conclude `READY`.

## Output Contract

The standard output of this step should be kept as a logical `materialization report`, whether the runtime persists it as a separate artifact or embeds it into `s01`.

```yaml
materialization_status: PROPOSED|READY|BLOCKED
decision_owner: agent|coordinator
raw_request_summary: ""
request_source: ""
candidate_count: 1
split_decision: single|split|defer
dedup_result: no_conflict|reuse_work_item|reuse_change|needs_review
delivery_context: greenfield|brownfield
work_items:
  - work_item_slug: ""
    work_item_title: ""
    work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
    scope_summary: ""
    primary_outcome: ""
    in_scope: []
    out_of_scope: []
    planning_track: quick|full|enterprise
    sdd_mode: none|light|strict
    governance_profile: default|strict|regulated|custom
    execution_mode: agentic|multi_agent
    existing_refs: []
    collision_notes: []
    change_strategy: none|reuse_existing|create_new
    change_id: ""
    change_reason: ""
    change_refs: []
    scaffold_actions: []
    blockers: []
decision_log: []
bootstrap_gate_status: PENDING_REVIEW|APPROVED|NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
```

Notes:

- `decision_owner` is the owner of the materialization decision produced by the runtime, not the human approval authority.
- For the current baseline, valid `decision_owner` values are `agent` or `coordinator`; human approval is recorded in a separate gate review.
- `delivery_context` must be explicit so the protocol can pick the right `greenfield` or `brownfield` gate.
- `bootstrap_*` is only used when the work item is `greenfield`; this is a project-level gate before opening the first implementation path.

## Standard Decision Flow

### Step 1. Normalize The Request

Extract from the raw request at minimum:

- the main problem or need
- the desired outcome
- the actor or usage context
- known constraints
- signals about urgency, release, or governance

If the raw request is only a very broad topic such as `do auth`, `upgrade billing`, `build dashboard`, the default result is `PROPOSED` or `BLOCKED`, not auto-scaffold immediately.

### Step 2. Pin The Work Item Boundary

A request is considered good enough for **one** work item when it simultaneously has:

- one clear primary outcome
- a relatively unified acceptance envelope
- one main ownership boundary
- one planning track that fits the whole scope
- a unified change/release cadence

If a request contains multiple independent outcomes, you must `split`.

### Step 3. Choose `work_item_type`

Use the following priority rule:

- `BUG`: restore correct behavior, not intentionally changing the product outcome
- `FEATURE`: add a new capability for users or operators
- `CHANGE`: a change with a clear rollout/change-management lifecycle, usually touching data, contracts, migration, cutover, or release control
- `REFACTOR`: restructure the technical design while preserving `behavioral_invariants`
- `RESEARCH`: exploration, comparison, spike, not yet committing to an implementation path

If a request has both research and implementation, default to splitting:

- `research-...` for discovery
- a separate implementation work item once the scope is clear

### Step 4. Generate `work_item_slug`

Generate the slug from the pinned delivery unit, not mechanically from the user's sentence.

### Step 5. Check For Duplication And Collision

You must search at minimum:

- `work-items/<slug>/`
- work items with near-synonym keywords
- active `changes/` that have `linked_work_items` or a closely matching scope

### Step 6. Decide `change_strategy`

Conclude one of three values:

- `none`
- `reuse_existing`
- `create_new`

### Step 7. Pin Authority

Conclude:

- `READY`: may scaffold automatically
- `PROPOSED`: there is a candidate but human confirmation or further clarification is needed
- `BLOCKED`: not enough input to create a new artifact safely

## Rule For One Or Many Work Items

### Keep One Work Item When

- there is only one main outcome that a stakeholder will see as a complete result
- the expected acceptance criteria still belong to one group
- the same `planning_track`
- the same `governance_profile` or an insignificant difference
- the same release/change cadence

### Must Split Into Multiple Work Items When

- there is more than one independent business outcome
- one part is `RESEARCH`, the rest is implementation
- one part can ship independently, the rest must wait for separate design/spec/change
- the governance profiles clearly differ
- one part is only a quick bug fix, the rest is a large initiative
- one part needs a `change layer`, the rest does not

### Do Not Split Just Because

- it touches many files
- it touches frontend and backend but still serves one outcome
- there are many technical tasks but the same acceptance envelope

## Rule For Generating `work_item_slug`

### Goal Of The Slug

The slug must:

- be stable throughout `s01 -> s08`
- reflect the main outcome or change intent
- be readable by humans
- easily derive artifact paths and search queries

### Required Pattern

- `kebab-case`
- only `[a-z0-9-]`
- compatible with the current tooling regex

### Recommended Naming Shape

Prefer `verb-object` or `verb-domain-object`.

Good examples:

- `user-login`
- `fix-login-timeout`
- `add-google-oauth-login`
- `normalize-customer-phone-index`
- `refactor-auth-session-store`
- `research-oauth-provider-options`

Bad examples:

- `task-123`
- `new-feature`
- `login-screen-final`
- `auth-v2`
- `issue-fix`

### Detailed Rules

- prefer 2-6 tokens
- keep the important domain noun such as `login`, `oauth`, `customer`, `session`, `billing`
- if you need to distinguish a boundary, add a meaningful qualifier such as `web`, `api`, `mobile`, `migration`
- avoid empty-meaning tokens such as `task`, `feature`, `issue`, `ticket`, `new`, `final`, `v2`
- do not use step names or artifact names such as `clarify`, `design`, `implementation`
- do not encode temporary detail or an overly narrow solution if the business scope is wider

### Rule By `work_item_type`

- `FEATURE`: prefer `add-`, `enable-`, `support-`, or a noun-based outcome if more natural such as `user-login`
- `BUG`: prefer `fix-`, `prevent-`, `restore-`
- `CHANGE`: prefer `migrate-`, `normalize-`, `retire-`, `reindex-`, `cutover-`
- `REFACTOR`: prefer `refactor-`, `extract-`, `consolidate-`
- `RESEARCH`: prefer `research-`, `evaluate-`, `spike-`

### Collision Rule

If the candidate slug already exists:

- same scope and only continuing delivery: reuse the existing work item, do not create a new slug
- different scope but the same core noun: add a meaningful qualifier
- only use a numeric suffix such as `-2` when no reasonable business qualifier remains

Example:

- `user-login` already exists and the new scope is a separate Google login: use `add-google-oauth-login`, not `user-login-2`
- `billing-export` already exists for CSV, the new scope is PDF: use `billing-export-pdf`

## Rule For Dedup And Reuse

### Minimum Search

- exact slug match in `work-items/`
- semantic-near match by the main keyword of the request
- active change packages in `changes/` with the same outcome or the same release intent

### Dedup Conclusion

- `no_conflict`: no active scope with a meaningful overlap found
- `reuse_work_item`: the new scope is actually a continuation of an open work item
- `reuse_change`: the new work item should attach to an active change package
- `needs_review`: there is more than one reasonable candidate or the scope overlap is not clear enough

### Signals That Require Manual Review

- the exact slug already exists but the artifact's current scope is unclear
- there are several work items sharing the same main noun such as `login`, `auth`, `session`
- there is a change package that is `approved` or `implementing` with a very similar scope
- the new request looks like a sub-scope of an open initiative but it is not clear whether to merge or split

## Rule For Deciding `change_strategy`

### Use `none` When

- a local bug fix or refactor does not change the truth of `BRD/SRS`
- no `proposal -> design -> tasks -> spec-delta -> archive` package is needed
- there is no significant migration, cutover, rollout governance, or external contract change

### Use `reuse_existing` When

- there is already an active change package that fits the scope
- the change package status is `draft`, `approved`, or `implementing`
- the new work item is only the next delivery part of the same change intent
- the archive lifecycle of the new work item must go with that package

### Use `create_new` When

- this is a change with its own release intent or approval path
- a `spec_delta` is needed
- there is no suitable active change package to reuse
- the old package is already `archived`
- the old package is `verified` but the new scope is the next wave, and should not be silently expanded

### Strong Signals For `create_new`

- adding or changing a capability at a level that needs a clear product-change trace
- migration/backfill/index/cutover
- changing an API contract, policy, compliance, or release sequencing
- the business wants to review/approve the change as a separate package

## Rule For Generating `change_id`

The tooling currently only validates an uppercase token pattern, but the canonical authoring strategy should be narrower:

- use the `CHANGE-NNN` form
- `NNN` is zero-padded to at least 3 digits
- get the next number by scanning `changes/CHANGE-*`

Example:

- `CHANGE-001` already exists
- the next new package is `CHANGE-002`

Do not create a new `change_id` when:

- `change_strategy=none`
- `change_strategy=reuse_existing`

If the repo later needs a different prefix such as `INCIDENT-` or `RFC-`, a separate policy must override this document instead of letting the agent invent it.

## Planning And Governance Preset

Materialization should pin a preset that is enough for the first scaffold.

### `planning_track`

- `quick`: a bug fix or small scope, low risk, one main boundary
- `full`: the default for a normal feature/change
- `enterprise`: large scope, many signoffs, many risks, many boundaries, or a heavy release lane

### `execution_mode`

- default `agentic`
- only choose `multi_agent` from materialization when the complexity signal is already clear and the ownership boundary is cleanly separable

### `governance_profile`

- `default`: the default
- `strict`: a more sensitive scope than usual
- `regulated`: data, compliance, regulated release
- `custom`: only when the project already has real custom governance refs

## Authority Gate For Agentic

### Agent May Auto-Scaffold When

- `split_decision=single` or the split is already clear and every item is clear
- `materialization_status=READY`
- `dedup_result=no_conflict` or an unambiguous `reuse_change`
- the slug passes the naming rules and has no unresolved collision
- `change_strategy` is clear
- `planning_track` and `governance_profile` are solid enough for the first scaffold preset

### Agent May Only Propose, Not Scaffold Yet, When

- the request still has many reasonable interpretations
- it is not clear whether it is one item or many
- it is not clear whether to `reuse_existing` or `create_new`
- there is more than one candidate work item or active change package
- the scope is a broad initiative like `build the login feature`, `do auth`, `improve billing`

### Agent Must Block And Ask For More Input When

- there is no meaningful raw request
- `work-items/` or `changes/` cannot be searched
- the scope is so vague that the slug is only a guess
- there is regulated/custom governance but the authority is unclear
- the request touches a change package that is already `archived`

## Operational Checklist

### Input Checklist

- is there a clear one-sentence summary of the request
- is it known whether this is a desired outcome or only a vague topic
- has `work-items/` been searched by the main noun
- has `changes/` been searched by the main noun or release intent
- has `project-context/` been reviewed to understand the governance baseline

### Boundary Checklist

- does this item have exactly one primary outcome
- do the expected acceptance criteria belong to one group
- does `research` need to be split from implementation
- can part of the scope ship independently
- is the change/release cadence uniform

### Slug Checklist

- is the slug `kebab-case`
- does the slug use a real domain noun instead of empty tokens
- is the slug stable if the implementation detail changes
- is the slug distinct enough from an existing similar item
- does the slug avoid unnecessary numeric suffixes

### Change Checklist

- does this scope need a `spec_delta` trace
- is there an active change package that fits to reuse
- is the candidate package in a status that allows reuse
- is this a new wave/change intent
- has `change_id` been chosen per the canonical strategy

### Autonomy Checklist

- is the status `READY`
- is the dedup result `no_conflict` or a clear `reuse_change`
- is there any blocker that forces a human decision
- is the scaffold command fully derivable
- can the agent explain why it chose the slug/change in 3-5 lines

## Integration Into The Current Workflow

Recommended flow:

1. run `Work Item Materialization`
2. if conditions are met, move the protocol status to `READY_TO_MATERIALIZE`
3. if `change_strategy=create_new`, scaffold the change package first
4. scaffold the workflow
5. copy the materialization decision into `s01 Clarify`
6. author `s01 -> s06`, getting human pass for the required gates
7. only `activate` when the approval gate, the bootstrap gate when present, and the `s04-s06` evidence are ready for execution
8. continue `s07 -> s08`

The current baseline can run directly through:

```bash
wfc materialize --request "<raw-request>"
wfc materialize --request "<raw-request>" --auto-scaffold
```

When running `--auto-scaffold`, the tooling will:

- scaffold the change package if `change_strategy=create_new`
- scaffold the workflow notes
- insert the `Work Item Materialization` and `Work Item Protocol` blocks into `s01`
- write a JSON report to `<workflow_root>/<work_item_slug>.work-item-report.json`

When `s01` has been scaffolded, you should keep a block like the following for audit:

````md
## Work Item Materialization
```yaml
materialization_status: PROPOSED|READY|BLOCKED
decision_owner: agent|coordinator
raw_request_summary: ""
split_decision: single|split|defer
dedup_result: no_conflict|reuse_work_item|reuse_change|needs_review
delivery_context: greenfield|brownfield
work_item_slug: ""
work_item_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH
change_strategy: none|reuse_existing|create_new
change_id: ""
decision_reason:
  - ""
existing_refs: []
blockers: []
bootstrap_gate_status: PENDING_REVIEW|APPROVED|NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
```
````

This block does not replace `## Step Contract`.

It only keeps the audit trail for the initial authoring decision.

## Examples

### Example 1. Vague Request

Input:

- `I want to build a login feature`

Recommended conclusion:

```yaml
materialization_status: PROPOSED
split_decision: defer
dedup_result: needs_review
work_items:
  - work_item_slug: "user-login"
    work_item_type: FEATURE
    change_strategy: create_new
    change_id: "CHANGE-002"
    blockers:
      - "Not clear whether email/password or social login"
      - "Not clear whether forgot password, MFA, session policy are in scope"
```

Meaning:

- `user-login` can be proposed as the first candidate
- do not auto-scaffold unless the agent has more context

### Example 2. Clear Bug

Input:

- `Fix timeout when a user logs in with email/password on web`

Recommended conclusion:

```yaml
materialization_status: READY
split_decision: single
dedup_result: no_conflict
work_items:
  - work_item_slug: "fix-login-timeout"
    work_item_type: BUG
    planning_track: quick
    execution_mode: agentic
    change_strategy: none
    scaffold_actions:
      - "npm run scaffold:workflow -- --work-item fix-login-timeout --planning-track quick"
```

### Example 3. Feature With A Change Layer

Input:

- `Add Google login for the customer portal`

Recommended conclusion:

```yaml
materialization_status: READY
split_decision: single
dedup_result: no_conflict
work_items:
  - work_item_slug: "add-google-oauth-login"
    work_item_type: FEATURE
    planning_track: full
    execution_mode: agentic
    change_strategy: create_new
    change_id: "CHANGE-002"
    scaffold_actions:
      - "npm run scaffold:change -- --change-id CHANGE-002 --work-item add-google-oauth-login"
      - "npm run scaffold:workflow -- --work-item add-google-oauth-login --planning-track full --change-id CHANGE-002"
```

## Conclusion

`Work Item Materialization` is the authoring gate before `scaffold`.

Without this layer:

- `agentic` can only run steps on its own
- it cannot yet open a new work item safely

If this layer is kept as a clear protocol:

- the slug is pinned with a reason
- the change decision has evidence
- dedup is checked before generating artifacts
- scaffold can be automated without eroding the governance of authoring