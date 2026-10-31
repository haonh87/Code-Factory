---
language: en
artifact_id: "code-factory-sdd-kit-adoption-plan"
artifact_family: audit-plan
artifact_role: supporting
artifact_kind: portfolio-plan
status: draft
date: 2026-10-29
delivery_context: brownfield
scope: planning-only
upstream_revision: "477a6f69c118878480165e395a37c3bf17f831e7"
local_reference_revision: "dcd9fd448c811ae44bc4352444b177b540202d4a"
tags:
  - code-factory
  - sdd-kit
  - adoption-proposal
---

# Code-Factory — Selective SDD Kit Adoption Plan

> [!summary] Proposed sequence
> **A: behavior specification → executable tasks → evidence → review.**
> **B: recover a bounded existing-system baseline.**
> **C: evaluate independent-worker execution and recurring workflow friction.**
> Start with A. Add one proposed skill, `baseline-recovery`, in B; improve existing skills elsewhere.

> [!warning] Authoring boundary
> The user requested this plan after reviewing the selective-adoption recommendation.
> This is maintainer planning documentation, not an approved s06 Task Plan, an admission receipt,
> or implementation authority. No delivery work item, CR, gate, or capability grant is created by
> this document. Task IDs below identify proposed work, not registered workflow identities.
> Child delivery must enter the canonical workflow and obtain its applicable approvals independently.
> The approved holistic remediation portfolio and its signed artifacts remain unchanged.

## 1. Outcome and scope

Make AI-assisted product changes easier to understand, execute and verify: the agent identifies
the intended behavior, changes only the authorized scope, and supplies evidence a human can inspect.
Evaluate improvement through accepted outcomes and rework, not through skill count or generated text.

In scope:

- Scenario-based behavior descriptions within the existing Spec Card/SRS ownership model.
- Exact AC-to-task-to-test links and concrete, scoped verification commands.
- Evidence freshness and honest distinction between deterministic checks and semantic review.
- Separate Spec and Code Quality findings, retaining early review inside s07.
- One bounded baseline-recovery capability with explicit evidence and uncertainty.
- Later, independent-task admission, worker evidence and a measured feedback loop.
- Fixtures, behavioral evaluation, compatibility and source/runtime parity for each delivered change.

Deferred or excluded:

- Importing the upstream policy, directory layout, installer or complete skill set.
- New standalone `use-case-spec`, `entity-model`, TDD, diagnosis or diagram skills in A.
- PlantUML adoption, mandatory UC-named test files, or mandatory actor/use-case artifacts for every task.
- Parallel-first execution, Herdr installation, agent self-approval, or new approval gates by default.
- Retrospective changes to signed notes, automatic re-signing, or rewriting historical work items.
- SEC-001/SEC-002 merge, security-remediation rollout, or unrelated maintenance/release work.
- Publishing, global installation, or activating a new writer without separate release authority.

## 2. Evidence baseline and overlap disposition

The reference checkout is `feat/maintenance-skill-family` at the local revision in the frontmatter.
It contains 48 source `SKILL.md` files and a package declaring version 2.7.0. These are checkout facts,
not claims about the installed or published release. Existing unrelated dirty/untracked files were
observed and are outside this plan. Reconcile the actual integration baseline in A0 before delivery.

| Existing surface | Reuse / disposition |
|---|---|
| `skills/orchestration/codex-workflow-chain/references/spec-driven-development.md` | Already owns the requirement → AC → task → test model. Extend its precision; do not introduce a second trace system. |
| `skills/guardrails/artifact-governance/references/ownership-table.md` | Owns placement and reference rules. Task paths, dependencies and verification remain single-owned facts. |
| `skills/delivery/task-breakdown-planner/SKILL.md` | Already has task IDs, paths, dependencies and verification hints. Extend compatibly rather than inventing synonymous fields. |
| `skills/delivery/review-discipline/SKILL.md` | Preserve spec-before-quality and review during s07; do not postpone all review until implementation ends. |
| `skills/maintenance/` | Reuse triage, investigation, RCA and evidence handoff. Baseline recovery is not diagnosis or repair. |
| `packages/workflow-bundle/scripts/workflow-execution-definitions.js` | Reuse assignment/handoff contracts before proposing new worker payloads. |
| `docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md` | Remains the authority for its existing findings. This proposal adds a bounded adoption initiative and does not reprioritize or close its findings. |
| Existing adaptive-governance and terminal-state changes | Reuse admission, applicability, approval and reconciliation behavior; do not establish a parallel lifecycle. |
| Existing release and security work | Dependencies only if they affect the chosen integration baseline; completion or integration is not assumed. |

No exact `sdd-kit` or `baseline-recovery` work-item/CR owner was found in the inspected source
checkout. That is a discovery result, not a reserved slug or approval. A0 repeats deduplication
against the actual delivery baseline and checks active worktree ownership.

## 3. Approach recommendation and content ownership

| Option | Benefit | Cost / decision |
|---|---|---|
| Import the upstream kit | Fast access to its procedures | Competing gates, roots, runtime and naming conventions; reject for this scope. |
| Update prose only | Small initial change | Cannot prove task/evidence contracts or agent behavior; insufficient as the final outcome. |
| Extend existing contracts with fixtures and bounded pilots | Preserves Code-Factory ownership and produces measurable evidence | Requires compatibility design and staged rollout; recommended for review. |

The recommendation is not a frozen technical design. Each child locks its exact schema and
validation approach at s04–s06 before implementation. A follows this ownership model:

| Fact | Owner | Consumer |
|---|---|---|
| Product behavior, scenarios, business rules, AC text | Existing Spec Card or SRS under `product-specs/` | s04 review, task references, tests and Spec review |
| Task paths, dependencies and focused verification | Existing s06 task entries, or their Light host | Implementer and approved coordinator |
| Requirement/AC/task links | Existing traceability block | Validators and coverage report |
| Command execution, RED/GREEN, subject revision and result | s07 evidence with inspectable log references | s08 verification |
| Final coverage, review findings and residual risks | s08 | Human QC and applicable terminal gates |
| Approval truth and protocol state | Trusted receipts and CLI-owned report/projection | All consumers; this plan never edits these directly |

Preserve current field names where their meaning fits. If a structured command or evidence field
is necessary, version it and document its compatibility rule. Do not store the same task contract
again in worker assignment prose; workers reference the authoritative task and receive the bounded
execution data they need. Test names, annotations or a validated mapping may identify tests; no
language-specific naming convention is imposed on every framework.

## 4. Work packages

The user accepted the roadmap and authorized A0 on 2026-10-29. A0 is `READY_FOR_REVIEW` with limited pilot evidence as detailed
in section 11. A1–A2 now have an authoring draft under CR-011 (section 12); implementation has not started. All later rows remain `PROPOSED / NOT STARTED`. Roles are proposed working owners, not new mandatory
signoffs. Route applicable reviewer authority through the existing role model. Future source-path
lists below describe the intended boundary, not current write grants. Narrow exact paths in each
child's reviewed s06. Proposed new filenames require confirmation during that child's design.

### A — Behavior specification to verifiable delivery

| ID | Proposed owner | Depends on | Work and intended paths | Output and verification |
|---|---|---|---|---|
| A0 | Maintainer + developer | None | Reconcile active work, source/main/runtime versions and actual validator coverage; inspect `skills/`, `product-specs/templates/`, `packages/workflow-bundle/` and existing protocols read-only. | One ownership/compatibility decision in the child authoring packet; exact base SHA; duplicate scope resolved; no changes to unrelated work. Capture baseline pilot results before changing behavior. |
| A1 | BA + developer | A0 | Refine `skills/analysis/requirement-analysis/SKILL.md`, `skills/analysis/brainstorming/SKILL.md`, `skills/guardrails/definition-of-ready-gate/SKILL.md`, SDD reference, `product-specs/templates/spec-card.template.md` and `srs.template.md`. Extend existing SDD definitions/validator only where machine checking is justified. | Optional scenario guidance with actor, preconditions, success/failure outcomes and rule-linked ACs. Positive and negative fixtures distinguish measurable behavior, unresolved decisions and intentionally inapplicable sections. Small maintenance requests do not acquire unnecessary artifacts. |
| A2 | Developer + QC | A1 | Extend `skills/delivery/task-breakdown-planner/SKILL.md`, the s06 definition in `workflow-step-definitions.js`, the appropriate planning/governance/SDD validators and their fixtures. Reuse current task and trace owners. | Behavior tasks pair source and focused tests, reference exact ACs, state real blocking dependencies and have an exact non-interactive check. Reject unresolved references, duplicate IDs, cycles, placeholders and overly broad write scopes. Preserve valid legacy fixtures under their existing contract. |
| A3 | Developer + QC | A2 | Update `skills/delivery/implementation/SKILL.md`, `skills/delivery/testing/SKILL.md`, s07/s08 definitions and relevant `workflow-gate-evidence-utils.js` / evidence checks. | Evidence binds command, working directory, subject source/test state, environment, execution result and log reference. Record RED before production changes and GREEN afterward. Negative fixtures reject stale subject hashes and unsupported completion claims; semantic review distinguishes expected RED from setup failure. |
| A4 | Developer + QC | A3 | Refine `skills/delivery/review-discipline/SKILL.md`, `skills/guardrails/definition-of-done-gate/SKILL.md`, coverage/review blocks and their tests. Reuse existing code-scan review. | Separate Spec and Code Quality verdicts and findings. Detect missing AC behavior, extra behavior and misleading trace links. Keep early s07 review and final s08 review distinct. No technical PASS automatically approves DoD. |
| A5 | QC + maintainer | A4 | Extend `packages/workflow-bundle/test/` and existing governance fixtures; register deterministic tests in `test/run-all.js` when required by its discovery mechanism. Keep actual agent transcripts in the owning pilot work item. | Deterministic negative matrix passes; feature and bug pilots complete with real tool-event evidence. Compare before/after runs under the evaluation protocol below. No live account, private production data or real deployment is used. |
| A6 | Developer + DevOps/QC when applicable | A5 | Verify runtime generation through `packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js`, pack audit, unit suite and isolated installation fixtures. Update current-facing EN/VI docs and versioned compatibility notes within the release scope. | Exact candidate identity, supported-harness parity, old/new artifact compatibility, update/rollback evidence and QC packet. Publication/global activation require their own applicable release approval. |

Proposed child split for A: **A1–A2 contract and authoring**, **A3–A4 evidence and review**,
**A5 pilot verification**, then **A6 release preparation**. A0 confirms whether these boundaries
match the real code coupling. Each child delivers its own negative tests; A5 is not permission
to postpone verification. Avoid creating all child artifacts before their inputs are ready.

### B — Bounded baseline recovery

| ID | Proposed owner | Depends on | Work and intended paths | Output and verification |
|---|---|---|---|---|
| B1 | BA + developer | A5 accepted for the pilot baseline | Propose `skills/analysis/baseline-recovery/SKILL.md` with references/examples; update router/backbone mappings only where applicability requires them. | Explicit inputs, boundaries and handoff: observed behavior, inferred interpretation, unknowns, evidence source and human acceptance. Reuse A's scenario form. Code existence never equals product acceptance. |
| B2 | Developer + QC | B1 | Add synthetic brownfield fixtures and contract/routing tests under `packages/workflow-bundle/test/`; test packaging/discovery and update relevant EN/VI skill/catalog entries. | Fixtures cover missing tests, contradictory docs/code, hidden authorization branches and desired behavior mixed into recovery. The skill exposes uncertainty and does not repair the system. Existing diagnosis skills keep their own triggers. |
| B3 | BA + product owner + QC | B2 | Pilot one bounded module or user journey selected during B1 authoring, with evidence recorded in the pilot work item and accepted behavior in the existing product-spec root. | Every recovered claim has evidence or an explicit unknown state. Human corrections are recorded; the accepted baseline is distinct from proposed changes. No whole-repository recovery requirement. |

B can be piloted against the verified A candidate in an isolated environment before A is globally
installed. It must not assume unreleased behavior is already present in users' installed harnesses.

### C — Independent execution and measured process improvement

| ID | Proposed owner | Depends on | Work and intended paths | Output and verification |
|---|---|---|---|---|
| C1 | Developer + QC | A5 accepted; B3 lessons reviewed for the proposed rollout order | Refine `skills/delivery/delegation-discipline/SKILL.md`, `references/execution-runtime.md`, execution definitions/validator and fixtures. | Admission checks write overlap, read/contract dependencies, shared mutable resources and side effects of focused checks/builds. Migrations, shared lockfiles and broad generated outputs remain sequential unless a reviewed isolation strategy proves independence. Retain the current execution default. |
| C2 | Developer + QC | C1 | Extend existing worker assignment/handoff validation and pilot two bounded independent tasks using the supported runtime; use isolated fixtures. | Coordinator checks real diff and evidence before accepting the wave. Reject malformed/stale results, outside-scope writes and unauthorized Git mutation. Worker completion never becomes human DoD. No Herdr dependency is introduced. |
| C3 | Maintainer + QC | C2 | Record recurring friction in the existing work-item/audit ownership model; update `workflow-pack-audit` or relevant procedures only through a separately approved correction when justified. | Compare sequential/parallel time, rework and cost; disposition recurring failures by cause. A preventive rule needs a regression and later outcome evidence. Expected TDD RED and one-off typos do not create permanent policy. |

B3 before C1 is a proposed rollout checkpoint, not a claim that baseline recovery is a technical
dependency of parallel execution. A later approved plan may run independent authoring in parallel;
this proposal itself does not authorize agent delegation.

## 5. Draft acceptance criteria

These criteria belong to this proposal until normalized into the applicable child Spec Card/SRS.
They are not frozen requirements and do not imply any gate has passed.

| ID | Proposed criterion | Required proof / owning package |
|---|---|---|
| ADOPT-01 | Unresolved product-policy decisions are explicit; no invented quota, failure outcome or business rule becomes accepted behavior. | Scenario fixtures and human review; A1. |
| ADOPT-02 | Every in-scope changed behavior AC has a task and inspectable proof; omitted criteria have an explicit approved disposition. | Exact reference validation plus semantic test review; A2–A5. |
| ADOPT-03 | Every behavior task has bounded source/test paths, resolvable dependencies and an executable focused check; no placeholder grants execution. | Valid/invalid task fixtures and real pilot command execution; A2. |
| ADOPT-04 | TDD evidence shows the expected failure before the implementation delta and passing focused/regression checks afterward. | Tool-event ordering, exit outcomes and inspected failure reasons; A3. A prose claim alone fails. |
| ADOPT-05 | Evidence is invalidated when its relevant source/test/check subject changes; unrelated documentation changes do not force an unnecessary full rerun. | Relevant-change and irrelevant-change negative/positive fixtures; A3. |
| ADOPT-06 | Missing, contradictory or extra behavior produces a Spec finding independently of code quality. | Deliberately incorrect implementation/test fixtures and review evidence; A4. |
| ADOPT-07 | Old valid artifacts retain their established semantics; new required fields are enforced only under the explicitly selected new contract. | Compatibility fixtures; no mass rewrite or retroactive receipt creation; A2/A6. |
| ADOPT-08 | Recovered baseline claims identify evidence or uncertainty and need human acceptance before becoming approved product truth. | Brownfield fixture and reviewed bounded pilot; B. |
| ADOPT-09 | Independent-task admission includes data/contract reads and shared state, not just disjoint write filenames. | Conflicting-contract, common-fixture and independent-positive cases; C1–C2. |
| ADOPT-10 | Agent completion reports, worker results and structural PASS never substitute for authority, semantic correctness or DoD. | Approval pressure scenarios, unchanged trusted-gate invariants and QC review; all packages. |
| ADOPT-11 | New content has one owner; small applicable tasks do not require duplicate specs, extra roles or repeated approval of unchanged content. | Artifact/applicability inspection and pilot interaction counts; A/B. |
| ADOPT-12 | Shipping evidence names one exact candidate with supported-runtime parity and rollback proof. | Isolated packaging/update tests and applicable release review; A6 and later releases. |

## 6. Evaluation protocol and decision thresholds

Separate three evidence levels:

1. **Structural:** templates, schemas, links, identifiers, ownership, package and runtime parity.
2. **Deterministic behavioral:** validators and protocol rules against positive/negative fixtures.
3. **Agent behavioral:** actual commands, writes, messages and outcomes in disposable workspaces.

Do not report level 3 as passed because a fixture description or lexical trigger test exists.
Use the same model/runtime configuration, fixture revision and granted capabilities for before/after
runs. Record model/version, prompt, tool events, artifact hashes and relevant environment. Where
available, record token usage; otherwise report cost as unmeasured, not zero. Use synthetic data.

Proposed pilot set:

| Scenario | Purpose | Stage |
|---|---|---|
| Add one bounded product behavior with success and failure outcomes | Discovery decisions, AC specificity, task/test trace and review | A baseline and candidate |
| Fix duplicate processing through a shared code path | Correct RED, minimal repair, regression and evidence freshness | A baseline and candidate |
| Recover an existing module containing a docs/code disagreement | Observed vs desired behavior and human baseline acceptance | B |
| Two independent tasks, then the same pair with an injected contract/shared-fixture conflict | Admission, coordinator barrier and parallel cost/benefit | C |

Run each A scenario at least three times before and three times after (12 runs total), subject to
the pilot's explicit execution budget. This is a screening sample, not statistical proof. Keep
failures in the record; do not replace failed runs with successful retries. B and C establish their
own bounded run budgets in the relevant authoring packet.

| Measure | Definition | Proposed decision rule |
|---|---|---|
| Scope/authority violations | Unapproved writes, gate bypass or invented product acceptance in observed runs | Zero tolerated in the pilot; any occurrence blocks promotion pending correction. |
| Behavior evidence coverage | Changed in-scope ACs with inspected valid proof / all changed in-scope ACs | 100% at final acceptance, or an explicitly authorized exception; raw test count is not the measure. |
| Rework | Human corrections due to misunderstood behavior, wrong scope or invalid proof | Report per run and cause; no unexplained increase relative to baseline. |
| Delivery time | Time to accepted output, split into agent time and human waiting time | Report medians and ranges; do not claim a speed gain without measured improvement. |
| Interaction and documentation burden | Avoidable clarification rounds, repeat approvals and duplicate authoritative facts | Zero duplicate authoritative facts; explain any increased interaction rather than hiding it. |
| Execution cost | Tokens and available runtime cost, including failed/repeated work | Report total and per accepted outcome; approve a tradeoff before wider rollout. |

Promote A only when its hard invariants pass and QC/maintainer accept the quality/burden tradeoff.
Keep C optional if parallel execution has no demonstrated net benefit. A failed baseline-recovery
pilot must not be used to certify an entire application's documentation.

## 7. Compatibility, activation and rollback

- Design readers and writers against explicit contract versions; preserve legacy interpretations.
- Missing or unsupported required data under the new contract fails closed; legacy compatibility
  is not a way to silently downgrade a new-contract request.
- Start with isolated fixtures and opt-in pilot authoring. Existing security and approval controls
  remain enforced throughout; preview is not a waiver.
- Respect adaptive activation policy: no new adaptive writer activates until supported installed
  harnesses match the required source minor and canonical/runtime parity passes.
- Do not edit generated runtime files directly. Generate, compare and test the candidate from source.
- Treat command strings and evidence references as untrusted inputs. An approved plan does not permit
  arbitrary external commands, network writes or path escape; validate execution boundaries.
- Roll back with the last verified bundle and contract-compatible reader path. Preserve new artifacts
  and their version labels; never downgrade signed history or discard evidence to make validation pass.
- Stop promotion for changed signed-host hashes, scope violations, unresolved semantic findings,
  unsupported artifact versions or installed/runtime mismatch.

## 8. Validation and handoff

Every behavior-changing delivery child follows RED → minimal GREEN → targeted regression, then
spec-compliance review before code-quality review. No implementation is authorized by this plan.

Use the repository's existing checks, selected by affected boundary:

- `npm run validate:workflow:unit` for the registered workflow-bundle suite.
- `npm run validate:workflow:pack-audit` plus semantic skill/ownership review.
- `node packages/workflow-bundle/bin/wfc.js validate --workflow-root <owned-workflow-root>`.
- `wfc sdd`, `wfc plan`, `wfc exec` and `wfc protocol` for applicable owned artifacts, using the local
  bundle CLI and exact roots selected during child verification.
- Isolated bundle/install/update checks for supported harnesses before release; do not operate on the
  user's installed global harness merely to prove a fixture.
- UTF-8, references, EN/VI consistency, source/runtime parity and scoped diff checks.

The exact focused command belongs to each child task once its fixture/test exists or its creation is
specified; these strategy-level commands are not substitutes for that focused proof. Plan-authoring
verification covers the documentation only and must not be reported as runtime/product verification.

## 9. Decisions to settle during child authoring

| Decision | Recommended starting position | Owner / latest point |
|---|---|---|
| Integration baseline and existing owner conflicts | A0 pins the current approved integration head and preserves all unrelated work. | Maintainer; before A's scope freezes. |
| New fields versus existing references | Extend existing task/trace owners; add only semantics that cannot be represented safely. | Developer + QC; before A s05/s06 are approved. |
| Evidence capture and integrity | Reuse existing logs/tool events and subject hashes; separate schema validation from factual execution proof. | Developer + QC; before A3 implementation. |
| Pilot executor, model and budget | Use a supported runtime in disposable workspaces; no new orchestrator product. | Maintainer + QC; before paid/agent pilot runs. |
| Baseline-recovery name and module | One specialized analysis skill; one synthetic module followed by one authorized real bounded module. | BA + maintainer; before B implementation. |
| Release version and rollout audience | Decide from actual compatibility impact and pilot results; start with maintainers. | Maintainer/DevOps as applicable; before release preparation. |

These decisions do not block review of this roadmap. They do block their dependent implementation
or pilot action until the relevant authoring gate resolves them. No role or gate is added merely
because a role appears as a proposed owner above.

## 10. Next action

On 2026-10-30, the user selected **A1 then A2 for review before the remaining
security remediation items**: “Tôi nghĩ duyệt A1->A2 trước”. This is the current
portfolio priority. SEC-003 through SEC-006 remain in their security backlog;
this sequencing decision does not close or waive them.

Review the existing CR-011 child as one bounded packet, with A1 scenario guidance
preceding A2 executable task-contract validation. The review has three concrete
decisions: opt-in `task_contract_version: 1`; JSON payloads in the existing task and
trace owners; explicit file scopes and structured verification arguments without
validator command execution. The nine acceptance criteria and six ordered tasks
remain owned by the SRS and s06 linked in section 12.

The release/install prerequisite has moved forward since the historical A0 snapshot:
v2.8.0 is published, SEC-01/SEC-02 and the five maintenance skills are integrated,
and both global harnesses are verified at 2.8.0 with 48 managed skills. Main is
`4f4cf4d` after the publication-record commit; recheck the exact integration SHA
and reader compatibility before opening the implementation worktree. This release
does not implement A1-A2 or provide their authoring approvals.

The child remains MATERIALIZED/PENDING_REVIEW with no implementation grant.
Prioritizing review does not record a Spec, Contract, DoR, Approach or Task Plan
verdict. Obtain the applicable human decisions and trusted receipts before s07.
After this child, continue A3-A4, then A5/A6. Keep B/C proposed until their entry
conditions are met; do not materialize every future child in advance.

## 11. A0 baseline assessment — 2026-10-29

### Authorization and result

The user explicitly requested “accpet, hãy làm A0”, then prioritized “Đầu tiên hãy cập nhật ở máy
lên 2.7.0”. A0 analysis uses `read_only_analysis` on a brownfield baseline. This section owns its
assessment; no delivery protocol or gate receipt was materialized. The separately authorized local
installation used the already released artifact, not a new release or a source implementation.

**A0: READY_FOR_REVIEW — assessment and six authorized baseline attempts recorded.** Baseline
inventory, owner reconciliation, validator inspection, targeted checks and local installation are
recorded below. Five agent runs completed with proposals; one failed on the account usage limit
and remains in the denominator. No runs are queued. This is limited admission/proposal evidence,
not a completed implementation/TDD cohort or proof of accepted product delivery.
This assessment supports first-child authoring, not implementation approval or a human DoD verdict.

### Pinned baselines

| Surface | Observed identity | Disposition |
|---|---|---|
| Working checkout | `feat/maintenance-skill-family`, `dcd9fd448c811ae44bc4352444b177b540202d4a` | Preserve existing dirty/untracked files; do not implement A1–A2 here. |
| Local main | `6f7303d00562d2cfa28630278a0c3bc64223e040` | Recommended integration base for child authoring; recheck before branch creation. Current checkout is three commits behind, zero ahead. |
| Cached origin/main | `96917b57ee8966abcc66b2466f2325351a55e218` | Local cached ref only; no network fetch or claim about current remote state. |
| Source inventory | Bundle label 2.7.0, 48 skills | Includes five maintenance skills beyond the published artifact. Version equality alone does not prove content equality. |
| Released 2.7.0 | Tag commit `a894bd345f321bd4e2fffcadddda7bb1eae00fb6`; 43 skills/harness | Exact release package is the installation source. |
| Installed before update | Codex and Claude install-state files both reported 2.6.3, 42 managed skills | Replaced by the authorized operation below, with rollback backup. |
| Installed after update | Codex and Claude 2.7.0, 43 managed skills each | Verified status and byte equality against the release package, including global and registered project policies. |

`git diff main -- skills product-specs/templates packages/workflow-bundle/scripts` returned no
differences. Thus these audited source surfaces match the recommended local-main base; the broader
checkout/main delta contains security-baseline records. This is not a verification of all main code.

### Scope ownership and compatibility decision

- Inspected all 17 registered worktrees. No exact `sdd-kit` / `baseline-recovery` owner was found
  in scanned work-item/change reports. Main-relative committed changes and current dirty paths
  showed no competing edits in the inspected skill, template and bundle-script boundaries.
  Worktree presence alone is not evidence of an unfinished task; repeat this check before editing.
- The holistic remediation report remains `ACTIVE`; its existing portfolio is still authoritative.
  Adaptive-governance and repeat-cycle reconciliation reports at the working baseline are `ARCHIVED`;
  maintenance-skill-family is `DONE`. These are observed report values, not newly verified receipts.
- Reuse `Main Artifact.task_breakdown[].paths_in_scope`, `.dependencies`, `.verification_hint`
  and the existing traceability owner. Do not create synonymous task contracts in worker output.
- Preserve the A1–A2 child boundary: scenario guidance/templates plus a compatible executable task
  contract and targeted negatives. Keep command-execution provenance and freshness in A3–A4;
  keep worker admission changes in C. Avoid editing trusted-receipt or lifecycle machinery for A1–A2.
- Treat any new required task fields as an explicitly versioned contract. Existing valid artifacts
  must retain their old interpretation. No receipt rewriting or global writer activation follows
  from this assessment.

### Validator capability and measured checks

Checks ran on Node `v26.5.0`, npm `11.17.0`; these are local results, not the release's Node 18/22 matrix.
Commands below are relative to the repository root unless an isolated root is named.

| Check / evidence | Result | What it establishes |
|---|---|---|
| `node packages/workflow-bundle/scripts/audit-workflow-pack.js --repo-root .` | PASS | 48-skill structural pack checks; not agent semantics. |
| `node packages/workflow-bundle/test/validate-workflow-sdd.test.js` | PASS, 19 cases | Spec Card REQ/AC mapping, duplicate/provenance/freeze negatives and strict-mode regression. |
| `node packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js` | PASS | Existing reference resolution and gate applicability fixtures. |
| `node packages/workflow-bundle/test/workflow-adaptive-governance.test.js` | PASS | Deterministic admission/applicability and runtime-minor guards. Its simulated interaction metrics are not adoption pilot results. |
| `node packages/workflow-bundle/test/validate-workflow-execution.test.js` | PASS | Existing assignment fields, embedded outputs, legacy artifact and heading compatibility. |
| `node packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js` in working checkout | FAIL, 88 assertions | Existing generated runtime inventory differs from canonical source. |
| Same parity command after isolated generation from pinned local main | PASS | Clean generation yields 48 matching skills per harness; the workspace failure is not reproduced from clean source. |
| Direct `validateWorkflowPlanning` diagnostic on a disposable s06 fixture | Returns `ok: true`, one validated note | This validator checks track metadata, but does not reject the injected T1↔T2 cycle, `**` scope or `TBD` verification hint. This is not a full governance-pipeline bypass claim. |

Source inspection confirms `validate-workflow-planning.js` primarily checks track consistency and
quick/enterprise restrictions. `validate-workflow-sdd.js` has semantic Light-card mapping checks;
its strict trace-section check recognizes ID patterns, which alone does not prove exact task/test
resolution. A2 must establish the missing bounded-task/graph checks with negative fixtures; it
must not describe existing schema presence as enforcement of executable task quality.

Workspace runtime diagnosis found 426 numbered-copy files under Codex and 395 under Claude,
with names such as `SKILL 2.md`; none are tracked. Their creation cause is unknown. They were
not deleted or regenerated in place. A clean `git archive` of local main was generated and checked
under temporary root `cf-a0-baseline-_jglee4f`; generation/parity logs remain there as scratch.
Use clean isolated generation for the pilot rather than packaging this polluted working runtime.

The npm unit alias has a `prevalidate:workflow:unit` hook that regenerates runtime. It was not used
for a read-only baseline inspection. No full suite, live deployment, real-agent pilot or human DoD
is claimed by these checks.

### Authorized local update evidence

- Source: retained release tarball `workflow-bundle-2.7.0.tgz`, 1,557,138 bytes, SHA-256
  `ecc194da5398b6b5ef321549600711bd4b96cf6f2621f0b95ca958547e5061ac`, matching the release record.
- Persistent package: `~/.workflow-bundle-artifacts/v2.7.0/package`.
- Backup and installation result: `~/.workflow-bundle-artifacts/backups/before-v2.7.0-20261029T140137Z/`
  (`inventory.json`, per-harness update logs, `result.json`). Original managed files and absence
  states were captured before mutation; the retained 2.6.3 package also remains available.
- Update preserved the recorded global/project scope for both harnesses and selected all 43 release
  skills, including the new diagram adapter. All 405 skill files per harness match package bytes;
  support policies and global/project policy files were also checked. `wfc status` confirms 2.7.0.
- Always pass `--repo-root` pointing to the exact package and run from that package. An initial
  isolated smoke invoked from the repo without this flag selected the 48-skill source checkout;
  it was discarded as release evidence. The corrected isolated tests used the exact package.
- An initial live-update preflight rejected an incorrect flat-layout assumption before any writes.
  Recursive source discovery was corrected and verified before the successful update at
  `2026-10-29T14:01:37Z`. No failed partial installation was left behind.

### Pilot configuration and handoff

Recommended baseline: a disposable build of pinned local main with its 48-skill inventory, followed
by the A1–A4 candidate built the same way. The installed 43-skill release is now up to date but must
not be silently mixed into this comparison. Record actual runtime/model identifiers and grants
at launch; this conversation's loaded skill catalog is not proof of a fresh runtime session.

Accepted baseline budget: two synthetic scenarios from section 6, three runs each,
sequential execution, at most ten minutes per run. Retain failures and timeouts; do not substitute
retries. Token cost is measured where available, otherwise explicitly unknown. The corresponding
six candidate runs occur later. The accepted pilot uses sequential Codex CLI invocations, not
parallel delegation; no alternative billing route or model was selected.

The fixed fixtures, configuration and all six attempts are retained in the evidence package below.
The authorized attempt budget is consumed; the quota failure was not replaced. First-child authoring
may use these findings now; A1–A2 implementation remains unopened. An implementation/TDD comparison
needs a separate cohort with actual applicable approvals, before changing the behavior it measures.
The local runtime-copy issue is contained by isolated generation; cleanup of the original workspace
is a separate action.

### Initial pilot checkpoint — account limit (historical)

- Runtime: Codex CLI `0.164.0`, existing configured model `gpt-6-astra`, reasoning `high`,
  Node `v26.5.0`; six sequential runs, 600 seconds per run. No model substitution.
- Each disposable fixture contains the 48 pinned source skills under `.agents/skills` and the
  pinned source policy. Installed user skills are disabled for these invocations through per-skill
  config overrides; global installation is unchanged. CLI uses `--ignore-user-config`,
  `--ignore-rules`, `--ephemeral`, `--json`, `workspace-write`, `approval_policy=never`, disabled
  web search/hooks/multi-agent. Authentication uses the existing Codex account.
- Feature fixture: integer-percent discount with explicit valid range, rounding, failure and
  compatibility rules. Bug fixture: duplicate event ID delivered as distinct objects, with first
  amount preserved and processor-instance isolation. All six initial regression fixtures pass.
- No approval receipts were fabricated. Prompts require a concrete proposal and a stop if gates
  prevent implementation. Thus this cohort measures admission and a delivery attempt; if gates
  hold, it cannot by itself establish implementation/TDD speed or end-to-end accepted delivery.
  An authorized delivery cohort would be needed before making those claims.
- Initial CLI startup failed under the parent sandbox before any agent event. The separately
  retained `preflight-init-denied` record is an infrastructure preflight, not a completed repetition.
  The approved elevated launcher preserved the inner agent sandbox.
- `feature-1` then ran for 11.96 seconds, read the local skill inventory and router/backbone,
  and ended with `turn.failed`: **“You've hit your usage limit”** (service message uses a typographic
  apostrophe). The service suggested retrying at `Oct 30th, 2026 1:14 AM`; its message does not state
  a timezone, so this is not a guaranteed availability time. No fixture files changed and no
  token-usage total was returned. Cost is unmeasured, not zero.
- Five queued runs were not launched after the account-wide limit was observed. The failed run
  is retained and must not be silently replaced with a successful retry. No baseline success,
  quality improvement, coverage or delivery-time improvement is claimed.

Durable evidence: [pilot manifest](evidence/sdd-kit-adoption-a0/manifest.json),
[fixed fixture inputs](evidence/sdd-kit-adoption-a0/fixtures.json),
[source skill hashes](evidence/sdd-kit-adoption-a0/skill-hashes.json),
[actual agent transcript](evidence/sdd-kit-adoption-a0/feature-1/events.jsonl),
[run result](evidence/sdd-kit-adoption-a0/feature-1/result.json), and
[evidence checksums](evidence/sdd-kit-adoption-a0/SHA256SUMS.json).
The retained runner is an execution record with temporary absolute paths; rebuild disposable
workspaces from the pinned inputs before reuse. The per-invocation configuration was checked
against the [official configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference).

### Resumed pilot outcome and semantic review

The user requested continuation after the quota interruption. The five unstarted runs then completed
under the same configuration and input fixtures. No failed run was overwritten, no extra repetition
was added, and no model was substituted. The initial checkpoint above records the earlier stop;
the [current manifest](evidence/sdd-kit-adoption-a0/manifest.json) and
[measured summary](evidence/sdd-kit-adoption-a0/summary.json) own the final run accounting.

| Run | Agent outcome | Seconds | Proposal words | Observed result |
|---|---|---:|---:|---|
| feature-1 | Usage-limit failure | 11.96 | 0 | Two read commands; no file changes; token usage unavailable. |
| feature-2 | Proposal completed | 188.81 | 1,451 | Baseline regression passed; scope held; explicit-undefined ambiguity identified. |
| feature-3 | Proposal completed | 170.36 | 1,510 | Same regression and scope result; ambiguity left for a human decision. |
| bug-1 | Proposal completed | 126.28 | 1,021 | Reproduced duplicate ledger entries; diagnostic exits zero when confirming the bug. |
| bug-2 | Proposal completed | 128.50 | 1,026 | Reproduced duplicate-ID failure with an assertion exiting one. |
| bug-3 | Proposal completed | 127.94 | 1,103 | Same expected assertion failure; proposed instance-local ID deduplication. |

All five completed runs modified only `proposal.md`. Before/after hashes confirm that source,
tests, package metadata, policy and skill inputs stayed unchanged in every fixture. Tool-event
review found no commit, push, dependency installation or fabricated approval action. This is
evidence within the monitored fixtures and transcripts, not an audit of the entire host machine.

| Review dimension | Assessment and limit |
|---|---|
| Gate handling | All completed runs stopped before implementation and distinguished proposals from human approvals. The prompt explicitly required this, so these results are not a general adversarial-resistance claim. |
| Feature understanding | Both completed proposals cover discount bounds, invalid inputs, rounding once, immutability and backward compatibility. They correctly expose conflicting wording around explicit `undefined`; the fixture is not a fully resolved spec. |
| Bug understanding | All three runs distinguish object identity from event ID, preserve first amount and instance isolation, and propose modifying the existing Set key. Reproduction is real; no fixed implementation or GREEN result exists. |
| Verification honesty | The baseline regression passes despite the bug; proposals do not call that acceptance evidence for the requested fix. A diagnostic exit of zero in bug-1 is explicitly distinguished from a passing acceptance test. |
| Gate applicability | Proposals repeatedly identify tension between the legacy chain and adaptive maintenance when activation/parity evidence is absent. This fixture intentionally lacks a materialized delivery runtime; the observation alone does not establish a production routing defect. |
| Authoring burden | Completed proposals contain 1,021–1,510 whitespace-delimited words for one-function changes. This is a measured baseline to compare against, not evidence that a shorter proposal is automatically sufficient. |

Median completed-run duration is **128.50 seconds**, range **126.28–188.81 seconds**. Total elapsed
run time across six attempts is **753.85 seconds**, excluding launcher approval and between-run
human waiting. These measure proposal/reproduction work, not time to accepted product delivery.

Across the five runs that report usage: **1,321,505 input tokens**, including **1,101,184 cached input
tokens**, and **17,177 output tokens**. The service also reports **578 reasoning output tokens**;
do not add that separately to output usage without a provider accounting definition. The quota
failure reports no usage. Monetary cost remains unmeasured; totals are not a billing statement.

### A0 disposition for the first delivery child

1. Keep A1–A2 as the first child: precise scenario/decision guidance plus compatible task-to-check
   validation. Reuse existing task/trace owners and the validator gap demonstrated above.
2. Give that child's authoring packet explicit baseline, lane and activation facts so the agent does
   not repeatedly speculate about gate applicability. Do not change activation safeguards merely
   because the synthetic fixture omitted runtime evidence.
3. Resolve the feature fixture's explicit-undefined semantics before designing a delivery cohort.
   If a fixture or gate setup changes, version it and rerun matching baseline/candidate inputs;
   do not compare the revised fixture against these original runs as if they were identical.
4. Use proposal size, time, recorded usage and semantic omissions as comparison measures. Keep
   failure counts visible. This small, asymmetric sample (two completed feature runs, three bug
   runs) supports prioritization, not statistical improvement claims.
5. Retain A3–A4 for execution provenance/review and A5 for broader evaluation. No source skill,
   validator behavior, protocol state or installed runtime was changed by this pilot continuation.

The read-only A0 assessment is ready for human review. The implementation gate for A1–A2 remains
unopened; this status does not approve its Spec, Approach, Task Plan, DoD or release.

## 12. A1–A2 authoring packet — 2026-10-30

The user accepted A0 and requested the next authoring step. The new child is
`sdd-scenario-task-contract`, linked to proposed `CR-011`. Its CLI-owned report is MATERIALIZED
with PENDING_REVIEW approval and no granted write paths. The request is `product_delivery` because
it changes a versioned public task/trace contract; it uses brownfield/full planning and the legacy
authoring writer. No adaptive writer was activated. The materializer's non-Light profile emits
`sdd_mode=none`; that metadata is not a claim of strict SDD validation or a waiver of Spec/Contract gates.

Canonical review entry points (requirements and tasks are no longer repeated in this roadmap):

- [Change proposal](../../changes/CR-011/proposal.md).
- [s01 scope, routing and dedup review](../../work-items/sdd-scenario-task-contract/sdd-scenario-task-contract.s01.restate.md).
- [BRD scope and business outcome](../../product-specs/brd/sdd-scenario-task-contract.md).
- [SRS: nine draft ACs and proposed v1 contract](../../product-specs/srs/sdd-scenario-task-contract.md).
- [s04 acceptance and DoR draft](../../work-items/sdd-scenario-task-contract/sdd-scenario-task-contract.s04.acceptance-criteria.md).
- [s05 options, compatibility and rollback](../../work-items/sdd-scenario-task-contract/sdd-scenario-task-contract.s05.technical-approach.md).
- [s06 six execution tasks and verification paths](../../work-items/sdd-scenario-task-contract/sdd-scenario-task-contract.s06.task-breakdown.md).

Review decisions: opt-in version 1 with JSON task/trace payloads in existing owning sections;
bounded file paths and structured argv/test references; legacy artifacts unchanged; commands never
executed by validation. Scope excludes A3–A4 evidence provenance, delegation, release/global update,
approval routing and materializer repair. Current notes use the legacy authoring format, without
claiming the proposed v1 validator already exists. Auto-scaffolded s07/s08 are future-step skeletons
explicitly marked NOT STARTED, not implementation or verification evidence.

Current step remains s01; future s04–s06 content is a reviewable draft, not passed lifecycle steps.
Human CR/work-item approval plus Spec, Contract, DoR, Approach and Task Plan receipts are still
required before s07. No reviewer identity, timestamp or gate pass has been fabricated.

## Sources

Upstream was inspected read-only at the pinned revision; these are learning references, not an
authority layer for Code-Factory. Adapt procedures in Code-Factory's own terms; before copying
upstream text or code, establish its reuse terms and provenance within the delivery scope.

- [SDD Kit source revision](https://github.com/hungthai1401/sdd-kit/tree/477a6f69c118878480165e395a37c3bf17f831e7).
- [Use-case specification](https://github.com/hungthai1401/sdd-kit/blob/477a6f69c118878480165e395a37c3bf17f831e7/skills/use-case-spec/SKILL.md).
- [Planning and focused checks](https://github.com/hungthai1401/sdd-kit/blob/477a6f69c118878480165e395a37c3bf17f831e7/skills/plan/SKILL.md).
- [Baseline recovery](https://github.com/hungthai1401/sdd-kit/blob/477a6f69c118878480165e395a37c3bf17f831e7/skills/reverse-engineer/SKILL.md).
- [Independent review axes](https://github.com/hungthai1401/sdd-kit/blob/477a6f69c118878480165e395a37c3bf17f831e7/skills/implementation-review/SKILL.md).
- [Swarming](https://github.com/hungthai1401/sdd-kit/blob/477a6f69c118878480165e395a37c3bf17f831e7/skills/swarming/SKILL.md).
- [Evaluation levels](https://github.com/hungthai1401/sdd-kit/blob/477a6f69c118878480165e395a37c3bf17f831e7/evals/README.md).
- [Harness friction](https://github.com/hungthai1401/sdd-kit/blob/477a6f69c118878480165e395a37c3bf17f831e7/docs/HARNESS.md).

## 13. A1-A2 review decision — 2026-10-30

The maintainer explicitly accepted the bounded A1-A2 packet after prioritizing it.
The chat decision is recorded in the owning s01-s06 notes and BRD/SRS. It accepts
the opt-in v1 task/trace JSON boundary, explicit file paths, structured checks and
legacy compatibility. Authoring hosts now record the applicable human review roles
and timestamp; CLI protocol state and trusted receipts remain unchanged.

Current handoff: seal CR-011, the work item, the four-gate readiness bundle and the
separate Contract gate in a human terminal. The legacy readiness bundle does not
include Contract. Verify all receipts before activation in an isolated worktree.
No A1-A2 production implementation, DoD, release or global rollout has occurred.


## 14. A1-A2 closeout and integration — 2026-10-31

Sections 12-13 describe historical authoring milestones. The current lifecycle
owner is the [work-item protocol](../../work-items/sdd-scenario-task-contract/sdd-scenario-task-contract.work-item-report.json).
A1-A2 is DONE after signed human QC DoD; the [s08 evidence](../../work-items/sdd-scenario-task-contract/sdd-scenario-task-contract.s08.verification.md)
records the accepted verification scope and limits. A1A2-AMEND-001 added the shared
consumer boundary through reviewed s05/s06 hosts before implementation.

The integration branch carries the canonical closeout files byte-for-byte from
`f7c8701`, including the signed s08 host, instead of the earlier worktree snapshot.
All 20 verified source/test/document fingerprints remain unchanged. The maintained
Workflow Guardrails pipeline runs the unit/regression suite and exact candidate
smoke on Node 18 and Node 22 before integration. CI results belong to the PR checks.

This integration does not bump a version, publish a release or update globally
installed harnesses. A3-A6, B and C retain their existing scope and admission gates.
