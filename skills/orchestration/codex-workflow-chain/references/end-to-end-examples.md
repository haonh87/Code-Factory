---
language: en
---

# End-To-End Workflow Examples

> Vietnamese: end-to-end-examples.vi.md

This document illustrates how to apply `workflow-chain.md` and `execution-runtime.md` to real situations.

- Example A: a small work item, one main ownership boundary, running `agentic`.
- Example B: a feature with many boundaries and external documents, running `multi-agent` from step 5 onward and using `notebooklm` as a supporting research skill.
- Example C: a `CHANGE` with migration/backfill/index rollout, running `multi-agent` in a database-heavy style.

## How To Read The Examples

- Each example goes through all eight steps.
- Not every step has to materialize into a file in practice, but this example assumes a workflow note exists for traceability.
- The `.md` note of each step remains the source of truth; output from a worker or `notebooklm` is only supporting input to that note.

## Example A: A Small `BUG` Running `agentic`

### Context

- `work_item_slug`: `fix-profile-phone-validation`
- `work_item_type`: `BUG`
- Short description: the profile update form accepts Vietnamese phone numbers with spaces or a `+84` prefix incorrectly, so valid users still fail to save.
- Reason for `agentic`: it touches only one main boundary — validation + formatter within the same profile module; small context; verification can be done safely by the same agent.

### Sample Artifacts

- `fix-profile-phone-validation.s01.restate.md`
- `fix-profile-phone-validation.s02.business-goal.md`
- `fix-profile-phone-validation.s03.open-questions.md`
- `fix-profile-phone-validation.s04.acceptance-criteria.md`
- `fix-profile-phone-validation.s05.technical-approach.md`
- `fix-profile-phone-validation.s06.task-breakdown.md`
- `fix-profile-phone-validation.s07.implementation.md`
- `fix-profile-phone-validation.s08.verification.md`

### The Eight-Step Chain

| Step | Main skill | Execution | Sample output |
|---|---|---|---|
| `s01` Clarify | `requirement-analysis`, `product-thinking` | `agentic` | Pins this as a `BUG`; scope is profile form validation; risk is unintentionally changing input behavior |
| `s02` Business Goal | `product-thinking` | `agentic` | Goal: users entering a valid VN number are not wrongly blocked; do not change the auth flow or historical data |
| `s03` Open Questions | `requirement-analysis`, `input-readiness-assessor`, `step-goal-auditor` | `agentic` | Pins which formats to support, whether backend or frontend is rejecting, whether data migration is needed |
| `s04` Acceptance + DoR | `requirement-analysis`, `definition-of-ready-gate` | `agentic` | Sample criteria: `0901234567`, `090 123 4567`, `+84901234567` all pass; input missing digits still fails; DoR=`READY` |
| `s05` Technical Approach | `brainstorming`, `system-design` | `agentic` | Choose to normalize input in a shared validation util, not scatter private rules across components |
| `s06` Task Plan | `task-breakdown-planner` | `agentic` | Task 1 fix normalize util; Task 2 update tests; Task 3 verify regression on the profile form |
| `s07` Implement | `implementation` | `agentic` | Fix the validator/formatter util, update unit tests, update the implementation note |
| `s08` Verify + DoD | `testing`, `code-scan-review`, `step-goal-auditor`, `definition-of-done-gate` | `agentic` | Run unit tests + lint + audit; confirm evidence is enough to close DoD |

### Sample Delivery Narrative

- Step 5 does not need `multi-agent` because there are not many modules or ownership boundaries.
- Step 7 has only one logic builder: the agent itself.
- Step 8 does not need a separate tester because the verify path is short, risk is low, and evidence is clear.
- If Step 3 finds the validator lives across multiple services or app shells, this example no longer fits `agentic` and the mode must be re-evaluated.

## Example B: A Medium/Large `FEATURE` Running `multi-agent`

### Context

- `work_item_slug`: `add-google-oauth-login`
- `work_item_type`: `FEATURE`
- Short description: add Google login to the customer portal while keeping the existing email/password flow.
- Complexity signals: `multi_boundary`, `large_context`, `separate_verification`, `tool_specialization`.
- Why `multi-agent` fits: it touches the frontend login UI, backend auth flow, security rules, callback config, and integration verification; it also has external Google docs that need structured reading.

### Execution Policy Snapshot

```yaml
execution_mode: multi_agent
selection_reason:
  - "Feature touches many backend/frontend/security boundaries"
  - "External docs need research before design is pinned"
complexity_signals:
  - multi_boundary
  - large_context
  - separate_verification
  - tool_specialization
shared_contract_ref: "add-google-oauth-login.s05.technical-approach#step-contract"
parallel_budget: 3
coordinator_role: "coordinator"
verification_owner: "auditor"
fallback_mode: sequential_multi_role
external_research:
  notebooklm: OPTIONAL
  expected_outputs:
    - notebooklm-research-capture
notes: "Turn on multi-agent only from step 5 onward; steps 1-4 stay agentic to lock scope first."
```

### Worker Assignment Snapshot For Step 5

```yaml
assignment_id: "s05-design-pack"
step_id: "s05"
shared_contract_ref: "add-google-oauth-login.s05.technical-approach#step-contract"
role: "coordinator"
owned_scope:
  - "merge option analysis"
  - "pin recommendation"
owned_paths: []
skills:
  - codex-workflow-chain
  - system-design
inputs:
  - "pinned acceptance criteria"
  - "current security constraints"
done_when:
  - "a technical approach is chosen"
  - "backend/frontend boundaries are clear"
depends_on: []
status: READY
handoff_format: worker-handoff-report
```

### Roles By Step

| Step | Mode | Main roles | Sample output |
|---|---|---|---|
| `s01` Clarify | `agentic` | `coordinator` | Pin scope: add a new provider, no account migration change |
| `s02` Business Goal | `agentic` | `coordinator` | Pin goal: reduce login friction, do not weaken the security policy |
| `s03` Open Questions | `agentic` + optional `notebooklm` | `coordinator`, optional `notebooklm-researcher` | Collect questions on callback URL, session model, account linking, compliance |
| `s04` Acceptance + DoR | `agentic` | `coordinator` | Criteria: a new user logging in with Google creates an account per the rules; an existing user can link or reject per policy; DoR=`READY` |
| `s05` Technical Approach | `multi-agent` | `coordinator`, `notebooklm-researcher`, `backend-architect`, `frontend-architect` | Pin OAuth callback flow, token exchange, UI state, and risk map |
| `s06` Task Plan | `multi-agent` | `coordinator`, `planner`, `dependency-reviewer` | Split tasks for backend auth, frontend CTA/state, config/secret, verify plan |
| `s07` Implement | `multi-agent` | `coordinator`, `backend-builder`, `frontend-builder`, `doc-owner` | Backend auth provider + callback + UI login button + docs/config changes |
| `s08` Verify + DoD | `multi-agent` | `coordinator`, `tester`, `scan-reviewer`, `auditor` | Integration evidence, code scan, security notes, final audit and DoD |

### Sample Handoff Report From `notebooklm-researcher`

```yaml
assignment_id: "s05-notebooklm-google-oauth"
role: "notebooklm-researcher"
status: HANDOFF
summary: "Summarized callback constraints, consent-screen notes, and provider flow from the Google docs corpus + internal auth notes."
outputs_produced:
  - notebooklm-research-capture
artifact_refs:
  - "add-google-oauth-login.s05.technical-approach.md"
code_refs: []
evidence:
  - "Notebook query: Required redirect URI rules"
  - "Notebook query: Account linking constraints"
external_tools_used:
  - tool: "notebooklm"
    purpose: "Summarize provider docs and internal auth notes"
    refs:
      - "google-oauth-notebook"
open_issues:
  - "Product must decide auto-link vs explicit link for matching emails"
recommended_next_action: "Coordinator moves this issue into option analysis and AC refinement if it still blocks"
```

### Sample Delivery Narrative

- Steps 1-4 stay `agentic` to avoid paying coordination cost too early while scope is still vague.
- `notebooklm` only supports step 3 and step 5 for reading large corpora; every conclusion must still be pinned in the step note.
- Step 5 is the first sensible point to turn on `multi-agent` because parallel boundaries start to appear.
- Step 7 splits builders by `owned_paths` or module boundary; if two builders must edit the same core auth module, the coordinator must reduce parallelism or fall back to `sequential multi-role`.
- Step 8 separates `tester`, `scan-reviewer`, and `auditor` to avoid the bias of "the coder self-confirms completion".

## Example C: A Database-Heavy `CHANGE` Running `multi-agent`

### Context

- `work_item_slug`: `normalize-customer-phone-index`
- `work_item_type`: `CHANGE`
- Short description: add a `normalized_phone` column and roll out a unique index on the customer table to support search/dedup by a normalized phone, without breaking the existing write path.
- Complexity signals: `multi_boundary`, `parallelizable_work`, `separate_verification`, `tool_specialization`.
- Why `multi-agent` fits: this change touches the application write path, schema migration, legacy data backfill, index rollout, and release-safety review; the database implementer and the database reviewer must be separated.

### Sample Artifacts

- `normalize-customer-phone-index.s01.restate.md`
- `normalize-customer-phone-index.s02.business-goal.md`
- `normalize-customer-phone-index.s03.open-questions.md`
- `normalize-customer-phone-index.s04.acceptance-criteria.md`
- `normalize-customer-phone-index.s05.technical-approach.md`
- `normalize-customer-phone-index.s06.task-breakdown.md`
- `normalize-customer-phone-index.s07.implementation.md`
- `normalize-customer-phone-index.s08.verification.md`

### The Eight-Step Chain

| Step | Mode | Main roles | Sample output |
|---|---|---|---|
| `s01` Clarify | `agentic` | `coordinator` | Pin this as a `CHANGE`, not a new feature; scope is normalizing phone and supporting safe lookup/dedup |
| `s02` Business Goal | `agentic` | `coordinator` | Pin goal: more accurate search and dedup, without disrupting the existing customer create/update |
| `s03` Open Questions | `agentic` | `coordinator` | Determine how dirty legacy data is, whether duplicates appear after normalize, and the rollback window |
| `s04` Acceptance + DoR | `agentic` | `coordinator` | Criteria: the new write path always produces `normalized_phone`; legacy data is backfilled; the unique index turns on only when data is clean; DoR=`READY` |
| `s05` Technical Approach | `multi-agent` | `coordinator`, `backend-architect`, `data-architect` | Choose an `expand-contract` rollout: add a nullable column, dual-write, backfill, validate, then create the unique index |
| `s06` Task Plan | `multi-agent` | `coordinator`, `planner`, `migration-owner`, `dependency-reviewer` | Split tasks for schema add, app dual-write, backfill job, duplicate handling, verify plan, rollout guards |
| `s07` Implement | `multi-agent` | `coordinator`, `app-builder`, `migration-owner`, `backfill-owner` | Create the column-adding migration, update the dual-write service, write the backfill command/job, add rollout logging/guards |
| `s08` Verify + DoD | `multi-agent` | `coordinator`, `tester`, `database-reviewer`, `auditor` | Run app-path tests, check the backfill dry-run, review migration safety, pin the release recommendation and DoD |

### Database Review Snapshot For Step 8

```yaml
review_scope:
  - "customers.normalized_phone"
  - "backfill command for legacy rows"
  - "unique index rollout"
migration_plan:
  steps:
    - "Add nullable column `normalized_phone`"
    - "Deploy application dual-write"
    - "Run backfill in batches with progress logging"
    - "Resolve duplicate normalized values"
    - "Create unique index after validation"
  deployment_order:
    - "schema-first"
    - "app-dual-write"
    - "backfill"
    - "index"
backfill_plan:
  required: true
  strategy: "batch backfill with checkpointing"
  safety_controls:
    - "limit rows per batch"
    - "progress metrics"
    - "pause/resume support"
rollback_plan:
  possible: true
  strategy: "keep nullable column, disable dual-write, postpone unique index if validation fails"
compatibility_risks:
  - "old app version may not populate normalized_phone if deployed out of order"
lock_risks:
  - "index creation can hold locks if table growth or duplicate cleanup is underestimated"
query_risks:
  - "new lookup path may bypass old phone formatting assumptions"
retention_risks: []
release_recommendation: GO_WITH_GUARDS
required_actions:
  - "ship schema before app dual-write"
  - "complete duplicate cleanup before unique index"
  - "monitor error rate during backfill"
evidence:
  - "dry-run duplicate report"
  - "batch backfill timing sample"
  - "staging verification logs"
```

### Sample Delivery Narrative

- Steps 1-4 should stay `agentic` to correctly pin that this is a `CHANGE` with legacy data, not just "add a column and done."
- Step 5 starts needing `multi-agent` because the boundary between the app write path and the data rollout path is now clear.
- The `migration-owner` owns only the migration/index/backfill mechanics; the `app-builder` owns the dual-write and the compatible read path.
- In Step 7, two workers must not edit the same migration file or the same write-path service without clear ownership; the coordinator must split paths or fall back to `sequential multi-role`.
- Step 8 must include a `database-reviewer`, because here the release recommendation is nearly as important as the application tests.

## Conclusions From The Three Examples

- `agentic` is the default choice for small or medium work items with one main boundary and a short verify path.
- `multi-agent` should be turned on late, usually from step 5 onward, after `DoR` has locked the scope clearly enough.
- `notebooklm` is valuable when a step has a large external corpus, but it does not replace the decision artifact or verification on the codebase.
- For a database-heavy change, `database-design` at step 5 and `database-change-review` at step 8 are effectively the default skill pair.
- An `expand-contract` rollout is the safe pattern when you must add a column, dual-write, backfill, and only then lock a constraint or unique index.
- If `coordinator`, `verification owner`, `owned_scope`, and `merge strategy` are not yet clear, do not turn on `multi-agent`.