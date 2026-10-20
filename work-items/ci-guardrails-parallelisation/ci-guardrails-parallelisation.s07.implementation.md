---
artifact_id: "ci-guardrails-parallelisation.s07.implementation"
artifact_family: workflow-step
work_item_slug: "ci-guardrails-parallelisation"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/ci-guardrails-parallelisation.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec: []
  dor: []
  approach: []
  task_plan: []
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "ci-guardrails-parallelisation.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Resumed after the accepted amendment, two replacement gate signatures and two signed state dispositions. GOV-EX-002 is RESOLVED. T3-R implemented with structural RED/GREEN; six local validators pass. Ordered self-review PASS. T4-R hosted green/double-failure verification is complete; s08 owns final criteria and human DoD handoff. Historical blocked sections below preserve earlier observations; current evidence is in the implementation checkpoint at the end.

## Artifact Chính
```yaml
implemented_changes: []
doc_changes:
  - "This s07 note: T1 evidence, collision finding, GOV-EX-002 proposal"
operational_notes:
  - "T1 DONE. Baseline from run 32825477258, main, 2026-08-25, green: 105s wall-clock over 9 jobs. Per-job: Tooling 13s, Artifacts 9s, SDD 5s, Changes 8s, Execution 8s, Planning 5s, Authoring Smoke 9s, Release Candidate Node18 21s, Node22 13s."
  - "Baseline correction: an earlier reading of run 34322150024 was discarded. That run is on the Codex branch, whose workflow has 10 jobs, so it is not a baseline for main's 8-job file."
  - "Estimate correction: the six validators total 48s serial and about 13s parallel, so the projected wall-clock is roughly 55-60s, a 40-45% reduction. The 60% figure stated during authoring was overstated and is withdrawn."
  - "AC-001 premise confirmed by evidence rather than argument: run 34216520563 failed at Workflow Execution and skipped four downstream jobs - Authoring Smoke, Planning, Build Exact Release Candidate, Release Candidate. One failure, four checks never run."
  - "T2 not started. It stays in scope for the deferred parallelisation, and its finding will apply to whoever performs the action upgrade."
  - "T3 BLOCKED - see GOV-EX-002."
  - "T4 BLOCKED - depends on T3."
```

## Governance Exception
```yaml
exception_id: GOV-EX-002
work_item_ref: "ci-guardrails-parallelisation"
step_ref: "s07"
principle_ref: "Hard Rule: Spec/Design Before Code - the sealed Task Plan T3 cannot execute as written"
reason: >-
  The approved Task Plan assumed .github/workflows/workflow-guardrails.yml was uncontested. It is
  not. Branch codex/adaptive-governance-human-approval-ux, 62 commits ahead of main, modifies the
  same file with 60 insertions and 2 deletions, adding a release-candidate-build job whose output
  later jobs consume as an artifact. A full restructure on main would collide with that work. The
  ownership analysis performed during authoring checked the working tree rather than the branch
  diff, and missed it.
impact: >-
  REQ-002, the checkout and setup-node upgrade from v4 to v7, is deadline-bound: GitHub removes
  Node 20 from runners on 2026-09-23, twelve days from this note. Holding it inside this work item
  until the Codex branch merges risks missing that date and breaking CI. REQ-001, REQ-003 and
  REQ-004 - the parallelisation - are not deadline-bound and can wait.
mitigation:
  - "REQ-002 is transferred to branch codex/adaptive-governance-human-approval-ux, which owns the file and will land first. A boundary notice carrying the exact version numbers is handed to that agent."
  - "REQ-001, REQ-003 and REQ-004 stay in this work item and resume once the branch merges."
  - "T3 will be redesigned at that point around the release-candidate-build job and its artifact dependency, which did not exist when the Task Plan was sealed."
  - "AC-002's baseline is already captured, so the deferral does not lose it."
owner: "devops"
approved_by: ""
status: PROPOSED
review_date: ""
notes: >-
  This exception stays open past s07 and blocks DoD for this work item, so it meets the register
  criteria in project-context/governance-exception-register.md and needs a row there. The
  implementing agent's granted_write_paths do not include project-context/, so the register entry
  must be added by a human or under a widened write scope. Next free id is GOV-EX-002; GOV-EX-001
  is RESOLVED.
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "/private/tmp/cf-ci-verify-20261019/T3-red.log"
  - "/private/tmp/cf-ci-verify-20261019/verify-structure.cjs"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: STANDARD
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/ci-guardrails-resumption"
worktree_reason: "Multi-session CI change; source edits isolated, canonical workflow hosts synchronized for legacy absolute workflow_root."
review_status: COMPLETED
review_refs:
  - "Implementation checkpoint: Spec Compliance then Code Quality"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Not authorized; retain candidate/probe branches and worktrees."
verify_path:
  - "T4-R hosted green and real double-failure runs; s08 criteria/annotation/timing evidence"
  - "Separate human QC DoD"
```

## SDD Traceability
```yaml
requirement_refs:
  - "REQ-001 -> T3, T4 - DEFERRED"
  - "REQ-002 -> transferred out under GOV-EX-002"
  - "REQ-003 -> T3 - DEFERRED"
  - "REQ-004 -> T3 - DEFERRED"
acceptance_refs:
  - "AC-002 baseline captured at T1; the comparison half is deferred"
  - "AC-001, AC-003, AC-004, AC-005, AC-006 - not yet exercised"
task_refs:
  - "T1 DONE"
  - "T2 NOT_STARTED"
  - "T3 BLOCKED"
  - "T4 BLOCKED"
test_refs: []
```

## Traceability
```yaml
upstream:
  - "ci-guardrails-parallelisation.s06.task-breakdown.md"
next_step: "Blocked. Resume at s07 once codex/adaptive-governance-human-approval-ux merges."
```

## Handoff
- Done: T1. Baseline is `105s` over 9 jobs, run `32825477258`, main, 2026-08-25.
- Blocked: T3 and T4, by `GOV-EX-002`. Nothing was written to the workflow file.
- Human action needed: approve or reject `GOV-EX-002`, and add its row to `project-context/governance-exception-register.md` - outside this work item's write scope.
- Condition to resume: `codex/adaptive-governance-human-approval-ux` merged, then T3 redesigned around `release-candidate-build` and its artifact dependency.


## Resumption Assessment and Proposed Amendment — 2026-10-19

The user accepted preparing the remaining CI work, followed by diagram-adapter readiness and parent-audit reconciliation. This authorizes the assessment and concrete proposal below. It does not approve the newly detailed amendment or GOV-EX-002 disposition. The sealed Spec Card/s04/s06 and CLI report are preserved. This section is the proposal handoff; after acceptance, the revised design/task content belongs in s06 and must receive fresh Approach/Task Plan receipts before resume.

### Current evidence

- Local and remote main are `e5dc98aac70196f9d3a391153325049c0402eb17`. Both `adaptive-governance-human-approval-ux` and `upgrade-guardrails-actions-node24` are ARCHIVED/s08. The former active-owner collision has ended; current workflow already contains actions checkout/setup-node v7 and the build-once candidate dependency. CI remains BLOCKED until the amendment and disposition are completed.
- All four CI authoring receipts remain valid and match their hosts. They approve the historical plan, not this amendment.
- Latest successful main Workflow Guardrails run: [38919485042](https://github.com/haonh87/Code-Factory/actions/runs/38919485042), head `e5dc98a`, started `2026-10-16T14:53:48Z`, updated `14:56:26Z`: **158 seconds** by run start/update timestamps. Ten job executions passed: six validators, authoring smoke, candidate build, Node 18 and Node 22 consumers. First job start to last job completion is 153 seconds. Keep the duration definition consistent in the post-change comparison.
- Original AC-002 baseline remains **105 seconds**, run `32825477258`. Do not silently replace this stricter approved threshold with 158 seconds. Record both comparisons; AC-002 only passes below 105 seconds unless BA explicitly amends the criterion. A slower result is PARTIAL/FAIL, not a retrospective waiver.
- GitHub read-only check on 2026-10-19: main protection endpoint returns `404 Branch not protected`; repository rulesets returns `count=0`. Renamed validator checks currently have no configured protection dependency. Recheck immediately before any integration; no repository settings are changed.
- Current six validator commands and arguments are unchanged from the accepted plan. `workflow-authoring-smoke` currently depends on `workflow-planning`; `release-candidate-build` depends on authoring smoke; `release-candidate` depends on that build and verifies the downloaded SHA-256. Other workflow files, including installer checks, are outside this change.

### Proposed decision

Recommend preserving option A: one six-entry validator matrix, `fail-fast: false`. Only replace the six validator job blocks and point existing `workflow-authoring-smoke.needs` to the matrix job. Keep the authoring smoke steps and both candidate job definitions byte-for-byte, including Node 18/22, checkout depth, upload/download versions, artifact name, digest validation, environment variables, timeout and commands. Keep current v7 actions; REQ-002 is inherited evidence from its completed owner, not another upgrade task. The single checkout/setup-node contract in AC-005 refers to the validator matrix, as in the original option A; downstream jobs still need their own runners.

Rejected alternatives: removing six dependency edges keeps duplicated validator setup and fails AC-005; parallelizing candidate consumers before the build would violate the artifact dependency. No validator behavior, npm scripts, package versions or release artifact logic changes.

### Proposed task amendment for s06

| Task | Owned scope and output | Verification and dependency |
| --- | --- | --- |
| T1-R — refresh baseline | Read-only source, run and protection data; evidence in child s07/s08. Preserve the historical 105s threshold and add the measured current 158s context. | Pin the workflow SHA and exact six-command list before edits; recheck remote/main and protection at execution. |
| T2-R — inherit action upgrade | Read-only Node24 owner and current action references. No action version edits. | Confirm owner closure and existing v7 references; AC-003 still requires a new green hosted run and inspection of annotations. |
| T3-R — parallelize validators | Only `.github/workflows/workflow-guardrails.yml`: consolidate six validators into matrix `validate` with the existing commands, Node 22, 10-minute timeout and fail-fast false; set existing authoring smoke to need `validate`. | First run a scratch structural assertion against the serial baseline and observe failure for matrix absence. After editing require six exact commands, no per-entry needs, fail-fast false, authoring gate, and unchanged candidate-job structures. Parse YAML; run available actionlint or document its absence. Review Spec Compliance before Code Quality. |
| T4-R — hosted proof and handoff | Accepted child evidence plus two disposable probe branches; source mutations for fault injection only in isolated temporary copies. | First run a green candidate through GitHub Actions. Then in a separate probe copy remove the required Governance Checks section from `packages/workflow-bundle/tests/fixtures/workflow-governance/valid-default/workflow/customer-search.s04.acceptance-criteria.md` and change the SRS reference in `work-items/sample-sdd-item/sample-sdd-item.s04.acceptance-criteria.md` to a nonexistent probe path. First confirm the real Fixtures and SDD commands each fail locally for those reasons. Publish only the probe branch and dispatch its workflow; require both named entries to fail and all other validator entries to reach a terminal result, with authoring smoke/build/consumers skipped. Keep validator command strings unchanged and record any additional expected validation failures. Keep deliberate failures out of the candidate branch. Record both run IDs, annotations, duration definitions and AC results in s08. |

The hosted proof requires publishing the candidate/probe branches and running GitHub Actions; accepting this amendment must explicitly cover those bounded operations. Do not merge, publish a release, change branch protection or install globally. Retain the two probe branches until evidence is captured and cleanup is authorized; deletion is not implicit. Historical date/deprecation language in sealed source is not a newly verified platform claim; no new action-upgrade decision depends on it.

T3-R is now multi-session work, so use the isolated `.claude/worktrees/ci-guardrails-resumption` worktree on `docs/ci-guardrails-resumption`, based at `e5dc98a`. Only authoring occurs before gate reapproval. The same worktree may be retained for implementation after the normal CLI resume grants the exact scope. No delegation is needed.

### GOV-EX-002 disposition proposal

The active collision is resolved by integration, and the upgrade is delivered by its transferred owner. Recommend **RESOLVED after** Developer/DevOps accepts this amendment, the revised s06 receives matching Approach and Task Plan signatures, and the register records the accepted disposition. This resolves a historical coordination exception; it does not waive AC-001..006, approve CI DoD, or claim T3/T4 are complete. Keep PROPOSED until those conditions hold. The register owns the exception status; this section owns the task proposal. Admission/resume must be performed by the supported CLI, not by manually clearing the report.

### Handoff and boundaries

Current route: maintenance, brownfield, s06 amendment / WAITING_APPROVAL. Next human decision: Developer/DevOps accepts T1-R..T4-R and the bounded hosted proof; DevOps accepts the conditional GOV-EX-002 resolution. Then finalize s06, reseal only its affected gates, record the disposition and resume with explicit roots for the workflow, child evidence and exception-register update. Existing Spec/DoR are not requested again. If an AC or Spec Card must change instead of preserving it as above, return that specific change to BA review.

No workflow YAML, production source, signed host, protocol report or trusted receipt changed in this assessment. Test implementation and hosted probe execution remain unopened. The test-decoupling child is DONE on `test/decouple-tests-from-tree-layout` at `db8365b` but is not integrated into main; this proposal neither merges nor counts it as main evidence.


Proposal validation: scoped naming/governance, planning and execution passed for four CI notes. UTF-8 and whitespace checks passed. Only this unsealed progress note and the exception register proposal changed in the isolated authoring worktree; signed hosts and CI YAML remain unchanged. No implementation/unit/hosted test result is claimed for this proposal-only delta.


## Accepted Amendment and Signing Handoff — 2026-10-19

The user explicitly accepted the concrete T1-R..T4-R packet, conditional GOV-EX-002 resolution and publishing candidate/probe branches for GitHub Actions verification. The revised s06 now owns the accepted approach and task plan; the preceding proposal remains historical submission evidence. Decision recording time is 2026-10-19T13:21:50Z. Source implementation remains unopened pending replacement Approach/Task Plan signatures and two signed protocol dispositions.

The normal CLI refuses resume while the obsolete GOV-EX-002 blocker and opaque legacy follow-up remain. The prepared `/private/tmp/cf-ci-resume-sign-20261019.cjs` signs only the two amended gates and retires only those exact entries under Maintainer authority. It pins existing approval/source hashes, checks every prior signature and existing disposition on retries, and uses normal interactive commands. It performs no source edit, resume, push, dispatch, merge, release or cleanup. After signing, the agent verifies all receipts/history, records GOV-EX-002 RESOLVED, and resumes the approved scope via CLI. No further content approval is needed for this accepted packet.

The historical report's absolute workflow_root remains canonical; revised s06 is byte-identical in the main checkout and isolated authoring tree. No report path is hand-edited. Source edits stay in the worktree; transition-time gate hosts must match exactly. Normal CLI projections are retained in the delivery branch and synchronized only for this item's canonical notes when needed. This avoids a new protocol implementation change inside the CI task.


## Implementation Checkpoint — 2026-10-19

All new Approach/Task Plan receipts and both Maintainer state-disposition signatures verified. GOV-EX-002 is RESOLVED under its accepted conditional decision. The first resume attempt from the isolated project root failed artifact-ref binding because the inherited report's absolute workflow_root points to canonical main. No transition occurred on failure. Copying the exact CLI-generated report/projection to that existing canonical location and running the normal CLI there succeeded; its output was copied unchanged back into this delivery branch. No report field or receipt was patched, and no additional approval was needed.

Remote main remains `e5dc98a`; repository ruleset count is zero. T1-R preserves 105s historical acceptance and 158s current comparison. T2-R inherits v7 actions from the ARCHIVED upgrade owner. T3-R replaces six serial jobs with `validate`, fail-fast false and six fixed command values; authoring smoke now needs `validate`. Authoring steps, both full candidate job definitions, triggers and permissions are unchanged.

Structural RED: exit 1, `Expected six-validator matrix is absent`, before modifying YAML. GREEN: the same scratch check passes after the edit, proving six exact commands, one setup contract, failure semantics, downstream gate and byte-identical candidate blocks. All six exact npm validator commands pass locally. YAML parsed with the existing js-yaml module; actionlint is unavailable, so no actionlint PASS is claimed. No dependency was installed. UTF-8/whitespace checks apply before commit.

Early review (agent self-review): **Spec Compliance PASS** first — accepted T3-R only, all six ACs retain their hosted checks, no artifact-flow drift, AC-002 still requires <105s. **Code Quality PASS** second — matrix values are fixed repository literals, no user/PR metadata is interpolated, no continue-on-error, no per-entry needs, one bounded setup path, no production or secret-handling change. No finding requires a source amendment. Hosted T4-R remains required; local passing checks are not DoD.

Raw supporting checks: `/private/tmp/cf-ci-verify-20261019/T3-red.log`, `verify-structure.cjs`, `baseline.yml`, and `local-{fixtures,artifacts,sdd,changes,execution,planning}.log`. This canonical note records the verdicts so temporary log expiry does not erase the conclusions. The candidate branch is `docs/ci-guardrails-resumption`; fault injection will use a separate branch and will never enter the candidate commit.


## T4-R Verification Handoff — 2026-10-20

Candidate `80bc20b` is pushed to `docs/ci-guardrails-resumption`; run 39261539913 succeeds in 92s. Probe `e453f13` is on separate `test/ci-guardrails-double-failure`; run 39368831066 reports the intended Fixtures/SDD failures, four remaining validator successes and skipped downstream jobs. Exact fixture failures reproduced locally before probe publication. The candidate retains original fixtures and unchanged artifact job blocks. s08 owns AC-001..006, annotations, timestamps, disclosed API inconsistency, scan limits and the pending human QC DoD. No merge, release or cleanup occurred.

## Protocol Closeout — 2026-10-20

Human QC DoD acceptance and the trusted signature were verified against the committed s08 host. The normal CLI transitioned VERIFIED -> DONE at `2026-10-20T04:40:30.968Z`; no blockers remain. The signed s08 is retained unchanged as the decision snapshot. Its signing-pending language describes the moment it was sealed; the CLI-owned report is authoritative for current lifecycle status.

Candidate publication remains authorized. Integration, merge, release, archiving and branch/worktree cleanup are separate lifecycle actions and were not performed.
