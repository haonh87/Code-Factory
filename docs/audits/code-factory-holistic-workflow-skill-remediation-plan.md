---
language: en
artifact_id: "code-factory-holistic-workflow-skill-remediation-plan"
artifact_family: audit-plan
work_item_slug: "code-factory-holistic-audit-remediation"
artifact_role: supporting
artifact_kind: portfolio-plan
source_of_truth: true
status: approved-for-authoring
approval: human-approved
approval_receipt: approved
approved_by: po
approved_at: 2026-09-03T01:34:46.476Z
human_decision_at: 2026-09-03T01:32:13Z
date: 2026-09-02
last_updated: 2026-09-11
delivery_context: brownfield
planning_track: full
governance_profile: strict
content_skills:
  - "workflow-pack-audit"
  - "requirement-analysis"
  - "sa"
  - "ta"
artifact_skills:
  - "obsidian-markdown"
tags:
  - "code-factory"
  - "workflow-audit"
  - "skill-audit"
  - "remediation-portfolio"
---

# Code-Factory Holistic Workflow and Skill Review Plan

> [!warning] Proposal boundary
> This is the missing portfolio-level plan. Approval of this document authorizes prioritization and
> further authoring only. It does not approve any child work item, implementation, Release,
> Business Acceptance, DoD, exception or waiver.

> [!info] Current navigation
> Vietnamese companion: [[code-factory-holistic-workflow-skill-remediation-plan.vi]]. The governed
> workflow record is in `work-items/code-factory-holistic-audit-remediation/`. OQ-CF-001..005 now
> have explicit Option C decisions from their assigned authorities, so the master work item has
> produced `s04 Acceptance + DoR`. BA approved its Spec and BA/QC approved its DoR on 2026-09-11;
> two digest-bound receipts remain before s05. These decisions do not approve any child work item,
> Approach, Task Plan or implementation.

## 1. Why This Plan Exists

Previous review work is split across `docs/plans/`, `docs/research/`, audit reports, change
packages, work-item notes and Git history. There was no single tracked artifact that answered:

- what parts of the workflow and skill pack were reviewed;
- which findings are proven closed, partial, stale or open;
- what order the remaining work should follow;
- who owns each decision and which evidence closes it.

This plan makes that portfolio visible without pretending that a mechanical validator pass proves
semantic quality or delivery completion.

## 2. Audit Boundary

The review covers all of these surfaces:

1. Authority: `AGENTS.md`, `policies/codex/AGENTS.global.md`, governance decision and role models.
2. Workflow: router, s01-s08 backbone, SDD full/light, step contracts, gates, receipts and protocol.
3. Skills: all 42 source `SKILL.md` files, their trigger, scope boundary, input/output, schema,
   references, examples, EN/VI language and runtime discoverability.
4. Runtime: workflow-bundle manifests, generated runtime copies, Codex and Claude installations.
5. Tooling: scaffolder, materializer, validators, approval transaction, telemetry and test fixtures.
6. Integrations: adapters, hooks, MCP configuration and external-skill provenance.
7. Delivery: Git branches/worktrees, GitHub Actions, release candidate identity, tags and rollback.
8. Portfolio integrity: prior plans, current work items, legacy notes, ignored documents and status
   reconciliation.

## 3. Current Baseline — 2026-09-02

| Evidence | Current result | Interpretation |
|---|---:|---|
| Source skill inventory | 42 | Mechanical audit sees all source skills. |
| Workflow pack audit | `PASS` | Frontmatter, names, hard-rule headings and known cross-references pass. |
| Workflow validator | 197 files / 193 notes `PASS` | Naming and embedded governance are mechanically valid. |
| Planning validator | 193 notes `PASS` | Declared planning-track structures pass. |
| Protocol validator | 10 managed `PASS`; 17 legacy skipped | A major part of historical state is outside protocol validation. |
| Work-item list | 27 entries; `wfc-demo` invalid | Portfolio has one empty invalid item and misleading legacy statuses. |
| Source bundle version | 2.6.1 | Current `main` package baseline. |
| Installed Codex/Claude version | 2.3.2, 40 managed skills | Installed runtime is stale and lacks two source skills. |
| Local `main` versus `origin/main` | local ahead by 45 commits | Hosted CI and local evidence do not yet share one head. |
| CR-008 dedicated worktree | evidence commit `5807611`, protocol `VERIFIED`; hosted runs `33636308233` and `33703233050` each passed 10/10 jobs | Hosted `.tgz` is stable at `8ddcb...` across both runs but differs from the local QC-bound digest despite identical extracted content; QC artifact re-binding, Release and Business Acceptance remain. |
| Main working tree | unrelated untracked WIP present | Avoid broad cleanup or accidental inclusion. |

### Current Delta — 2026-09-07

The 2026-09-02 table is retained as the audit snapshot. The authoritative delta is:

| Surface | Current evidence | Portfolio effect |
|---|---|---|
| Master plan visibility | Commit `569f48f` tracks this artifact, its Vietnamese companion and governed work item, with links from the README and docs maps. | `CF-001` is resolved; future portfolio updates now have one repository-visible authority. |
| CR-008 correction | Parent CR-008 remains `VERIFIED` with finding `F-AG08-001`; child `closeout-bundle-legacy-dod-compatibility` reached `DONE` at commit `eb3aeec`. Its DoD, Release and Business Acceptance receipts all match finalized s08 SHA-256 `acdd6b392f2661efcfe636c8916fde5207d0fe19c41633200e276e1d5b20dde9`. | Keep the branch/worktree `HOLD_OPEN`; record the child evidence and CF-019 disposition, then repeat parent Technical Verification, DoD, Release and Business Acceptance against the final candidate. |
| Candidate source | Production candidate source remains `373d91072dcc8dd02371bb4a37289c81d7299788`; local release-branch HEAD is `eb3aeec` after child closeout while origin remains at the production source commit. Hosted Guardrails run `33867082744` passed all 10 jobs. | Candidate behavior is hosted and reproducible by content; CF-019 remediation and the parent receipt lifecycle must finish before parent closeout or promotion. |
| Installed runtimes | `wfc status --mode codex|claude` reports source `2.6.2`, installed `2.3.2`, and 40 managed skills for both harnesses. | Adaptive governance is not yet the active user runtime; the original role/gate friction remains observable until release, install and parity activation finish. |
| Authority wording | `Hard Rule: Adaptive Admission And Applicability` forbids adding SA/TA to maintenance without a trigger, while `Skill Requirement` still says to use SA and TA at every `s01-s04`. | OQ-CF-004 Option C is approved: router applicability and stable reason codes are authoritative; a separate child must repair and verify the source/runtime wording. |
| Public docs freshness | `docs/vi/README.md` and `docs/release/community-pack-*` still present `v2.1.1` and 36 skills as current-facing claims. | These surfaces need a current-vs-historical disposition (`CF-020`) before the next public handoff. |
| Generated runtime hygiene | Ignored local runtime output contains duplicate category directories such as `analysis 2` and `orchestration 3`; the hosted candidate's 545-file tree did not show a content mismatch. | Treat as local generated-output hygiene and audit coverage, not proof that the approved hosted artifact is corrupted. |

## 4. Prior Plan Coverage

| Prior artifact | Delivery evidence | Portfolio verdict |
|---|---|---|
| SDD Light Plan v5 | T1-T9 completed through two DoD-approved work items | `CLOSED_WITH_ACCEPTED_RESIDUAL` |
| Skill Pack Review 2026-07-23 | Seven findings fixed; post-fix audit passed | `CLOSED` |
| SA/TA productization | v2.3.2 SA/TA release and v2.6.0 design-readiness integration | `PRODUCT_SCOPE_CLOSED` |
| SA/TA metrics deep dive | Draft 12-week learning plan; thresholds unvalidated | `OPEN_EXPERIMENT` |
| Memory standardization | Codebase-memory trial and team rollout done; umbrella contract unapproved | `PARTIAL` |
| Trending AI application | WI-2 done; WI-1 security scan and WI-3 Rationalizations pilot absent | `PARTIAL` |
| Adaptive approval UX | Corrected child candidate passed hosted Guardrails; child terminal receipts match and its protocol is `DONE`; parent re-verification remains | `IN_PROGRESS_PARENT_REVERIFY` |
| Diagram-design adapter | Authoring gates approved, but stored protocol remains s06 with stale blockers | `RECONCILE_BEFORE_EXECUTION` |
| Test/tree decoupling | G-A superseded by another fix; cross-file G-B and two-tree evidence remain | `OPEN` |

## 5. Finding Register

| ID | Severity | Finding | Evidence | Owner | Status | Closure evidence |
|---|---|---|---|---|---|---|
| CF-001 | HIGH | No canonical pack-wide review/remediation plan was visible in tracked repository state. | The approved artifact and workflow existed only as untracked local files. | PO/BA | `RESOLVED` | This plan and its workflow are tracked and linked from the README/docs map. |
| CF-002 | HIGH | CR-008 closeout was reopened by `F-AG08-001`; its linked correction is now `DONE`, while parent re-verification and finalization remain. The real closeout also exposed phrase-dependent reconciliation of custom pending metadata, which required explicit normalization before protocol close. | Parent/child s08 reports, commits `373d910`, `fc08bfd`, `8b250c2`, `eb3aeec`, run `33867082744`, hosted candidate `da49e511...`. | Developer/QC/DevOps/PO | `IN_PROGRESS_PARENT_REVERIFY` | Parent records child evidence, resolves the reconciliation residual, repeats terminal review with fresh digest-matching receipts, then finalizes the branch. |
| CF-003 | HIGH | Source candidate, installed runtimes and final public state are materially out of sync. | Candidate source 2.6.2/42; installed Codex/Claude 2.3.2/40; release branch source `373d910...`. | DevOps | `OPEN` | One immutable candidate; source/runtime/origin version and skill parity after governed release/install activation. |
| CF-004 | HIGH | CHANGE-005 contains stale prerequisite claims and has not reached a truthful execution state. | Report says CHANGE-004 not verified although it is `DONE`; Playwright remains missing; s08 is draft. | Developer/QC | `OPEN` | Reconciled report, re-run T0, explicit route decision and valid transition. |
| CF-005 | MEDIUM | `decouple-tests-from-tree-layout` still reads a live work-item note in the cross-file assertion. | `workflow-gate-evidence-utils.test.js`; s06 T2/T3. | Developer/QC | `OPEN` | Fixture-controlled test, negative test and equal two-tree result. |
| CF-006 | HIGH | No current security baseline covers skills, hooks, MCP and adapters. | Trending plan WI-1 has no work item, report or scan artifact. | Security reviewer/QC | `OPEN` | Approved ephemeral scan, SARIF/Markdown evidence and triage. |
| CF-007 | MEDIUM | Sixteen legacy work items in clean tracked main are skipped by protocol validation and can display misleading pending status. | `wfc protocol` and `wfc work-item list` at `2e3aade`; OQ-CF-002 Option C approved on 2026-09-11. | Developer/QC | `ACCEPTED_PENDING_CHILD` | Apply the classify-first policy with zero retrospective receipts and zero unexplained legacy status. |
| CF-008 | LOW | The prior empty `work-items/wfc-demo/` entry made listing invalid. | At clean tracked main `2e3aade`, the path is absent and `wfc work-item list` reports 25 valid entries. | Maintainer | `RESOLVED` | Absence check and valid list output are captured in the s04 baseline. |
| CF-009 | HIGH | SA/TA threshold schema previously contradicted its binary-threshold rule. | Canonical EN/VI schemas now declare `quantified|binary|not_quantified`; the contract test asserts the enum. | Developer/QC | `RESOLVED` | Source schemas and semantic contract test agree at `2e3aade`. |
| CF-010 | HIGH | The pack-audit command can still pass without running the existing SA/TA semantic contract test. | `architecture-role-skills-contract.test.js` detects the corrected enum, while `validate:workflow:pack-audit` remains a narrower mechanical command. | Developer/QC | `PARTIAL` | Wire the semantic contract into the standard pack-audit/hosted validation path and prove a negative fixture fails. |
| CF-011 | MEDIUM | Three live planning/research artifacts are hidden by `docs/plans/` and `docs/research/` ignore rules. | `.gitignore`; memory, SA/TA metrics and trending plans; OQ-CF-001 Option C approved on 2026-09-11. | PO/maintainer | `ACCEPTED_PENDING_CLASSIFICATION` | Selectively promote current authority and explicitly disposition every superseded or historical input. |
| CF-012 | MEDIUM | Public EN/VI language has no systematic naturalness, duplication or role-friction quality gate. | Encoding is checked; semantic language quality is not; OQ-CF-003 Option C approved on 2026-09-11. | PO/BA/QC | `ACCEPTED_PENDING_CHILD` | Apply the BA-owned rubric, full entry-path review, sampled skill review and QC evidence. |
| CF-013 | MEDIUM | Memory authority, freshness, retention and retrieval contracts remain unapproved. | Memory Standardization Plan P0-P2 checkboxes open. | PO/Developer/QC | `OPEN_DECISION` | Approve a reduced contract, split child items, or retire the umbrella plan. |
| CF-014 | LOW | SA/TA competency thresholds and scoring weights are unvalidated proposals. | Deep-dive §9 and five unchecked follow-ups. | Architecture lead/PO | `OPEN_EXPERIMENT` | One-quarter calibration or explicit retirement as non-product guidance. |
| CF-015 | LOW | Rationalizations/anatomy pilot has no matching implementation evidence. | Trending plan WI-3; repository search finds no pilot block. | Developer | `OPEN_DECISION` | Governed pilot with review evidence or recorded supersession. |
| CF-016 | MEDIUM | Main working tree contains duplicate/untracked WIP that can contaminate release or audit evidence. | `git status` lists CHANGE-005, CR-008, work items, runtime copy and release doc. | Maintainer/DevOps | `OPEN` | Each path attributed, committed in its owning branch, moved, or recoverably cleaned. |
| CF-017 | HIGH | Exact `.tgz` bytes are not reproducible across local and GitHub-hosted packaging environments, so content-equivalent builds receive different release digests. | Local SHA `ec000...`; hosted SHA `8ddcb...`; identical extracted trees and uncompressed tar SHA `e82afa...`. | Developer/DevOps/QC | `OPEN` | One deterministic packaging environment or canonical content identity, plus a release policy/test that prevents ambiguous digest binding. |
| CF-018 | MEDIUM | Hosted Guardrails relies on `actions/checkout@v4` and `actions/setup-node@v4` actions whose Node 20 runtime is deprecated; GitHub currently forces Node 24 and emits warnings in every job. | Run `33703233050` annotations. | DevOps | `OPEN` | Upgrade to supported action majors, pin/update policy as appropriate, and obtain one warning-free hosted run. |
| CF-019 | HIGH | Authority prose conflicts on SA/TA applicability: the adaptive hard rule says maintenance must not add SA/TA without a trigger, but the generic Skill Requirement says to use both throughout `s01-s04`. | `policies/codex/AGENTS.global.md` under `Adaptive Admission And Applicability` and `Skill Requirement`; OQ-CF-004 Option C approved by PO/BA/Developer/QC on 2026-09-08. | PO/BA/Developer/QC | `ACCEPTED_PENDING_CHILD` | Approve an independent child; rewrite the generic rule as applicability-conditional, add a semantic regression fixture, sync both runtimes, and verify zero irrelevant maintenance SA/TA actions. |
| CF-020 | MEDIUM | Current-facing documentation still carries stale `v2.1.1`/36-skill claims beside the `v2.6.2`/42-skill candidate surface. | `docs/vi/README.md`, `docs/release/community-pack-readme*.md`, and `docs/release/community-pack-positioning*.md`; OQ-CF-005 Option C approved on 2026-09-11. | PO/BA/DevOps | `ACCEPTED_PENDING_CLASSIFICATION` | Classify affected files as current or historical; align current files only to released state and label/remove historical files from current onboarding. |

## 6. Execution Sequence

The ordering below preserves the previously recommended order. Every row is an independent child
boundary; completion of one does not approve the next.

### Phase 0 — Make Current State Truthful

1. **P0.1 — Close the CR-008 linked defect** (`CF-002`, `CF-017`, part of `CF-003`) — `DONE_CHILD_ONLY`.
   - Child protocol reached `DONE` at `eb3aeec`; DoD, Release and Business Acceptance receipts all match finalized s08 SHA-256 `acdd6b392f2661efcfe636c8916fde5207d0fe19c41633200e276e1d5b20dde9`.
   - Parent CR-008 and its branch/worktree remain `HOLD_OPEN`.
2. **P0.2 — Remediate adaptive role applicability** (`CF-019`; OQ-CF-004 Option C approved).
   - PO/BA/Developer/QC accepted the finding and conditional authority rule on 2026-09-08.
   - Propose and independently approve a child work item before changing the generic SA/TA rule, policy/runtime copies or semantic fixtures.
   - After its authoring gates pass, make the generic SA/TA skill rule conditional on the router's applicability decision and stable reason codes, add a semantic regression fixture, and produce a new candidate binding.
   - Keep SA/TA mandatory for named public-contract, regulated, cross-system and greenfield-foundation triggers; do not infer implementation authority from the OQ decision.
3. **P0.3 — Re-verify and close parent CR-008** (`CF-002`, remainder of `CF-003`).
   - Record the closed child evidence and the OQ-CF-004/CF-019 disposition on the parent.
   - Repeat Technical Verification, DoD, Release and Business Acceptance against the final candidate rather than inheriting superseded approvals.
   - Verify: exact SHA, required hosted checks, parent receipt digest match, both protocols `DONE`, post-merge checks, then branch finalization.
4. **P0.4 — Reconcile CHANGE-005 diagram adapter** (`CF-004`, `CF-016`).
   - Refresh completed CHANGE-004 prerequisite and re-run the T0 environment preflight.
   - Keep s07 closed while Playwright/Chromium or an approved alternative remains unavailable.
   - Verify: report/artifacts/receipts agree and the router returns one non-contradictory state.
5. **P0.5 — Close the mutable-test residual** (`CF-005`).
   - Materialize/approve the legacy item correctly before implementation.
   - Execute s06 T0 → T2 → T3 with TDD and two-tree evidence.

### Phase 1 — Close Security and Governance Blind Spots

6. **P1.1 — Security baseline** (`CF-006`).
   - Materialize WI-1 as a separate security research/audit work item.
   - Review the external scanner and run it ephemerally over `skills/`, hooks, MCP and adapters.
   - Do not auto-fix findings; split behavior changes into governed child items.
7. **P1.2 — Protocol and portfolio truth** (`CF-007`, `CF-008`, `CF-011`, `CF-016`).
   - Decide track-or-retire and legacy migration policies.
   - Remove or repair the empty demo item through a recoverable action.
   - Add a portfolio reconciliation check that distinguishes legacy completion evidence from pending protocol.
8. **P1.3 — SA/TA schema and audit coverage** (`CF-009`, `CF-010`).
   - Preserve the resolved canonical `quantified|binary|not_quantified` schema and its contract test.
   - Extend the standard pack-audit/hosted path so the semantic contract cannot regress behind a
     green mechanical-only result.
9. **P1.4 — Hosted action-runtime hygiene** (`CF-018`).
   - Upgrade the deprecated Node 20-based GitHub action majors in a separate CI child work item.
   - Verify the complete Guardrails matrix without runtime-deprecation annotations.

### Phase 2 — Improve Language and Human Usability

10. **P2.1 — Language and interaction quality review** (`CF-012`, `CF-020`).
   - Inventory public entry paths, approval prompts, error messages, README/quickstart and a stratified sample of all skill groups.
   - Score clarity, naturalness, duplication, actionable next step and role/gate relevance in EN and VI.
   - Validate CR-008 outcomes with interaction telemetry; keep authority and UX metrics separate.

### Phase 3 — Decide Optional Capability Backlog

11. **P3.1 — Memory umbrella decision** (`CF-013`).
   - Choose reduced P0-P2 scope, split it, or retire the umbrella plan; do not reopen the completed codebase-memory trial.
12. **P3.2 — SA/TA metrics experiment** (`CF-014`).
   - Keep it as a learning experiment unless a PO explicitly sponsors productization.
   - If sponsored, run the stated one-month/one-quarter calibration before using thresholds for people or delivery gates.
13. **P3.3 — Rationalizations pilot decision** (`CF-015`).
    - Compare the proposed pilot with current guardrails; implement one skill only or record supersession.

### Phase 4 — Pack-Wide Closure

14. Run the mechanical workflow/pack/protocol/planning/unit/smoke/security checks.
15. Perform semantic review across all 42 skills and every authority/runtime boundary.
16. Reconcile source, Codex, Claude, origin, hosted CI, release and portfolio status.
17. Publish a final coverage matrix with `PASS|PARTIAL|FAIL|NOT_APPLICABLE` per finding.
18. Ask QC for DoD only when every required finding has direct closure evidence or an approved exception.

## 7. Child-Work-Item Contract

Every child work item must declare:

- `owned_scope` and concrete `owned_paths`;
- upstream finding IDs and acceptance criteria;
- execution order and dependencies;
- spec-compliance review before code-quality review;
- verify path, verification owner and rollback path;
- applicable roles/gates only, with reasons;
- exact evidence that updates its row in this portfolio.

No child may use this portfolio's approval receipt as its own receipt.

## 8. Portfolio Acceptance Draft

| ID | Criterion | Verification |
|---|---|---|
| AC-CF-001 | 42/42 source skills and every scope item in §2 are inventoried. | Generated inventory plus manual semantic coverage matrix. |
| AC-CF-002 | Every prior plan and finding has exactly one portfolio verdict and canonical evidence pointer. | Zero blank or duplicate-authority rows. |
| AC-CF-003 | Every open finding has owner, priority, child boundary, next gate and verify path. | Schema validation plus human review. |
| AC-CF-004 | Portfolio and child approvals remain independent. | Receipt subjects and protocol events show zero inherited child approvals. |
| AC-CF-005 | Final source/runtime/CI/release evidence refers to one immutable candidate. | Version, skill count, file parity, commit SHA and hosted check reconciliation. |
| AC-CF-006 | Mechanical PASS cannot mask any known semantic conflict. | Regression fixtures cover every semantic conflict found by this review. |
| AC-CF-007 | Public language quality has an approved rubric and review evidence. | EN/VI entry paths plus stratified 42-skill sample report. |
| AC-CF-008 | Final portfolio contains zero unexplained lifecycle contradiction. | Independent QC reconciliation and DoD review. |
| AC-CF-009 | Release artifact identity is reproducible or is governed by one explicit canonicalization rule across local and hosted environments. | Repeated clean builds plus exact-digest/content-identity tests and release-policy review. |
| AC-CF-010 | Role-skill instructions never require a role that the authoritative applicability decision omitted. | Policy/runtime semantic fixture plus maintenance and product-delivery routing matrix. |
| AC-CF-011 | Every current-facing onboarding and positioning document identifies the same released version and managed-skill inventory; historical assets are labeled. | Version/inventory scan with an allowlisted historical scope. |

`AC-CF-010` and `AC-CF-011` were proposed in the 2026-09-05 delta. OQ-CF-004 and OQ-CF-005
subsequently approved their policy directions; the criteria themselves remain subject to the
independent s04 Spec and DoR gates.

## 9. Current Decision Gate

Status: `APPROVED_FOR_AUTHORING`.

The user explicitly approved the master plan on 2026-09-03. That decision approves:

1. the master work-item boundary and finding register;
2. the P0 → P4 sequencing.

The trusted work-item receipt was sealed by `po` at `2026-09-03T01:34:46.476Z`. The five policy
decisions are now closed independently:

1. OQ-CF-001 Option C — PO/Maintainer approved selective promotion on 2026-09-11.
2. OQ-CF-002 Option C — Developer/QC approved classify-first legacy handling on 2026-09-11.
3. OQ-CF-003 Option C — BA/PO/QC approved the BA-owned language rubric on 2026-09-11.
4. OQ-CF-004 Option C — PO/BA/Developer/QC approved conditional SA/TA applicability on 2026-09-08.
5. OQ-CF-005 Option C — PO/BA/DevOps approved current-versus-historical classification on 2026-09-11.

This approval permits further authoring of the master work item. It does not approve implementation,
any child work item, CR-008's artifact amendment, Release, Business Acceptance, DoD, exception or
waiver.

BA approved the portfolio Spec and BA/QC approved DoR on 2026-09-11. The decisions remain
non-operative for s05 until the BA Spec and QC DoR receipts match the finalized s04 host.

## Traceability

```yaml
source_request:
  - "Process the previously recommended sequence."
  - "Provide the missing plan for the entire Code-Factory workflow and skill pack."
requirements:
  - "AC-CF-001..009"
findings:
  - "CF-001..020"
sequence:
  - "P0.1 -> P0.2 -> P0.3 -> P0.4 -> P0.5 -> P1.1 -> P1.2 -> P1.3 -> P1.4 -> P2.1 -> P3.1 -> P3.2 -> P3.3 -> P4"
next_artifact: "Digest-bound BA Spec and QC DoR receipts, then s05 Technical Approach authoring"
```
