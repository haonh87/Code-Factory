---
artifact_id: "add-diagram-design-adapter.s07.implementation"
artifact_family: workflow-step
work_item_slug: "add-diagram-design-adapter"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CHANGE-005"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-005/spec-delta/brd.delta.md"
  - "changes/CHANGE-005/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CHANGE-005/spec-delta/brd.delta.md"
  srs: "changes/CHANGE-005/spec-delta/srs.delta.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["po", "ba", "developer", "qc", "devops"]
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec: ["ba"]
  contract: ["developer"]
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: ["devops", "qc"]
  business_acceptance: ["po"]
  dod: ["qc"]
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
  - "codex-workflow-chain"
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "add-diagram-design-adapter.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.

## Step Contract
```yaml
step_goal: "Execute accepted A1 T0-T9 without changing canonical ownership or human gates."
input_summary: ["Signed s04/s05/s06", "CHANGE-004 DONE", "Pinned PNG preflight"]
output_summary: ["One optional adapter", "Focused tests", "Generated candidate and lifecycle evidence"]
done_when: ["T9 evidence ready for QC; no unresolved blocking implementation findings"]
owner: "developer"
```

## Main Artifact
```yaml
recommended_design: "APPROACH-005-A / accepted A1"
implementation_mode: FEATURE
tasks_completed: [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9]
bug_repro_evidence: []
hypothesis_log: []
debug_experiments: []
tdd_evidence:
  - behavior: "Pinned provenance and no nested discovery"
    failing_test: "diagram-design-provenance.test.js: missing verifier"
    passing_test: "155 files / 2113085 bytes / approved digest; tamper, symlink and nested skill rejection"
  - behavior: "Request admission"
    failing_test: "diagram-design-presentation-adapter-contract.test.js: missing validator"
    passing_test: "Four role/audience combinations and fail-closed cases"
  - behavior: "Offline atomic output"
    failing_test: "diagram-design-presentation-adapter-output.test.js: missing exporter"
    passing_test: "Two layouts; semantic/static/accessibility cases; actual pinned PNG; missing tool/browser and forced rename rollback"
  - behavior: "SA/TA and modeling optional handoff"
    failing_test: "Role suite: eight missing hooks/refs; modeling suite: six missing optional contract assertions"
    passing_test: "Role/modeling/Draw.io suites pass; SA/TA schema bytes unchanged"
  - behavior: "Review fixes"
    failing_test: "Bidi control accepted; model-level constraint not visibly emitted"
    passing_test: "Unsafe canonical text rejects; all model metadata retained visibly"
safe_refactor_notes: ["Existing canonical renderer implementation unchanged"]
code_changes: ["Adapter provenance, request, static export, PNG and output validation scripts"]
doc_changes: ["Bilingual adapter contracts", "SA/TA intent", "Modeling optional derivative guidance"]
config_changes: ["Adapter agents/openai.yaml"]
review_checkpoints: ["T6 spec compliance then code quality, recorded below"]
outputs_actual: ["Implementation in codex/add-diagram-design-adapter-v2.7.0"]
known_limitations: ["Closed one/two-column layouts", "Local JSON model projection", "AI reader assessment is not human usability evidence"]
follow_up_items: ["Human DoD, Release and Business Acceptance", "Accepted later business-layout and fixture-label improvements"]
notes_for_testing: "Positive PNG needs the pinned task-local interpreter/browser; normal unit runs explicitly report absence of positive integration coverage."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs: ["diagram-design-provenance.test.js", "diagram-design-presentation-adapter-contract.test.js", "diagram-design-presentation-adapter-output.test.js", "architecture-role-skills-contract.test.js", "architecture-modeling-contract.test.js"]
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs: [".claude/worktrees/add-diagram-design-adapter-v2.7.0"]
worktree_reason: "Full plan, vendored resources, multiple skills and candidate packaging"
review_status: DONE
review_refs: ["T6 Targeted Review", "T7-T9 Candidate and Handoff — 2026-10-21", "AI-R01 Rework Completion — 2026-10-24"]
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Keep branch/worktree until s08 DoD and separate integration decision"
verify_path: ["Focused suites", "Runtime parity", "Full unit suite", "Exact candidate lifecycle", "Independent reader review"]
```

## Implementation Notes
```yaml
worktree_target: ".claude/worktrees/add-diagram-design-adapter-v2.7.0"
planning_track: full
risk_signals: ["Multiple boundaries", "Vendored resources", "Release candidate"]
worktree_decision: REQUIRED
decision_reason: ["Accepted A1 isolation"]
isolation_strategy:
  branch_name: "codex/add-diagram-design-adapter-v2.7.0"
  worktree_path: ".claude/worktrees/add-diagram-design-adapter-v2.7.0"
  owned_paths: ["Adapter", "SA/TA/modeling hooks", "Tests", "Generated runtimes", "Candidate surfaces"]
  expected_duration: "Accepted multi-session plan"
execution_guards: ["Canonical governance root remains main workspace", "No delegation", "No tag, push, live install or cleanup"]
skip_reason: ""
cleanup_preconditions: ["s08 DoD", "Branch-finish decision"]
notes_for_implementation: "Worktree based on d43ef61; source baseline is fa9ad23 and d43 adds governance notes only."
```

## T6 Targeted Review

Spec compliance PASS for implemented AC-001..006/008/010 behavior: distinct optional
ownership, no SA/TA schema change, exact provenance, complete output, fail-closed input,
canonical preservation and no invocation-time provisioning. AC-007 reader outcomes are
unmeasured; AC-009/011 candidate lifecycle and final gates remain pending T7-T9/s08.

Code quality review followed spec review. Fixed two actual semantic issues test-first:
bidirectional control text could obscure labels; model-level metadata/constraints were
not emitted. Added safe recursive canonical text checks, visible model metadata and
conservative Unicode wrapping. Forced browser and publication failures leave no staging
or partial destination. Closed template reconstruction checks emitted markup rather than
trusting a self-reported fact manifest; two layouts pass without pixel comparisons.

Pack audit initially found two skill-root-relative pointers inside immutable vendored
resources. Added two first-party reference entry points to their actual vendored owners;
no upstream byte changed and no validator bypass was introduced. Pack audit now passes.
This is a small adapter-local reference compatibility repair within T6, not a new dependency.

JS/Python syntax and manual static/security/performance review pass for the first-party
scripts. No dedicated ESLint/Semgrep result is claimed. Inputs/canvas are bounded; no
network, shell execution or installation occurs in adapter execution. Browser context is
offline with JavaScript disabled; no OS-wide network-isolation claim. Publication assumes
a trusted single-writer destination parent, not an adversarial concurrent filesystem.

## Traceability

- Source requirements: CHANGE-005 BRD/SRS and signed s04 AC-001..011.
- Design/plan: signed s05 and s06 Amendment A1.
- Implementation evidence: focused suites above; s08 owns final exact-artifact evidence.
- Next step: independent s08 reader verification and human decisions.

## Handoff

Implementation T0-T9 is complete; s08 remains PARTIAL, not DONE. No merge/push/publication/cleanup is authorized
by a test pass. Historical sections below are retained as dated evidence; current state
and T0 admission are recorded in the latest execution section.

## T0 Readiness Reassessment — 2026-10-19

The user accepted continuing the remaining plans, with CI first and diagram adapter next. This is a prerequisite assessment within the existing item, not source implementation or activation. The approved s04/s05/s06 hosts, CHANGE-005 authoring documents, CLI report and trusted receipts are unchanged. Existing placeholder implementation fields above remain unexecuted.

| Prerequisite | Current observation | Decision boundary |
| --- | --- | --- |
| Authoring signatures | Spec, Contract, DoR, Approach and Task Plan signatures are valid and all host digests match. | Do not request unchanged approvals again. |
| CHANGE-004 owner | `integrate-design-checklists-into-sa-ta` is DONE/s08 and its DoD signature is valid/current on main. | The report's old MATERIALIZED/s01 prerequisite is stale. Full post-change compatibility remains a T0 check, not automatically passed. |
| Source version | Main `e5dc98aac70196f9d3a391153325049c0402eb17`; root/bundle manifests and package report 2.6.4. | Signed s06 only permits target 2.6.0 on baseline 2.5.0. S06-RISK-004 explicitly requires Task Plan re-review otherwise. |
| PNG environment | `/opt/homebrew/bin/python3.14`, Python 3.14.6; `importlib.util.find_spec('playwright')` returns None. No browser launch attempted. | A compatible pinned Python/Playwright/Chromium tuple and explicit isolated provisioning are still required. |
| Implementation admission | Report remains MATERIALIZED/s06, zero granted write paths. | Do not activate or import upstream resources until T0 passes. |

### Proposed bounded plan revision

Recommend rebase the delivery plan onto the then-current verified 2.6.x main baseline and nominate **2.7.0** as a provisional next-minor candidate, subject to checking tag/package availability before finalization. Do not reuse the already released 2.6.0 identity. Preserve the approved capability boundary, upstream commit `5f1b6ddc66036554dd68701798bd12aa5e3ef3f9`, provenance contract, HTML/SVG/PNG formats, AC-001..011 and T1..T9 sequencing.

Before modifying signed s06, prepare its exact baseline/version delta together with `changes/CHANGE-005/tasks.md`, verify current SA/TA and architecture-modeling contracts against the approved handoff, and select an executable version-pinned PNG environment in a task-local virtual environment/browser cache. Record the Python executable, package version, Chromium revision, license/provenance and launch probe. Missing-tool failure behavior remains mandatory. No global installation or automatic dependency download from adapter execution is permitted.

This is a proposal, not a release/version decision or compatibility PASS. The current user acceptance opens preparation of this delta; it does not override the signed s06 version condition. Task Plan must be re-reviewed and re-signed if changed. Spec/Contract/DoR/Approach receipts may be reused only if the compatibility comparison shows their hosts and meaning remain unchanged; otherwise return only affected gates to review.

### Handoff

CI amendment review is the immediate next decision. Adapter implementation stays unopened while the baseline/version delta and PNG tuple are prepared. Protocol blockers must be reconciled through the supported CLI after prerequisites are actually met; do not edit the report by hand. No upstream code, generated runtime, browser environment, version file, publication or live install changed in this assessment.


## A1 Preparation Handoff — 2026-10-20

CI parallelisation and fixture isolation are integrated into main `fa9ad237f8179e58b16ca6c6c589bdd0728ec476`; Workflow Guardrails run 39392788611 passed ten jobs. The user accepted preparation of the next diagram-adapter planning revision. Current s06 Amendment A1 now owns the baseline/version delta, compatibility findings, exact exporter tuple, wheel hashes and ordered provisioning/activation plan. CHANGE-005 tasks mirrors that plan; no new delivery artifact was created.

Spec/Contract/DoR/Approach signatures remain valid and their hosts are unchanged. The old Task Plan signature was checked before editing and its exact host preserved in scratch; it is historical after A1 edits. Human acceptance and a new Task Plan signature are required. Toolchain metadata is verified, but installation and launch/PNG success are not claimed. No toolchain, production source, generated runtime or package version was changed. The CLI-owned report remains MATERIALIZED/s06 with zero write grants; historical blocker/action entries await supported signed reconciliation after prerequisites are satisfied.

A1 authoring verification: scoped naming/governance, planning, execution and change validators PASS for all eight workflow notes. SDD validator exits 0 with zero applicable notes because this item uses `sdd_mode=none`; it is not claimed as SDD coverage. Baseline role/modeling/Draw.io tests PASS. Strict UTF-8, whitespace and preservation checks cover the three edited notes, while the report and signed upstream hosts remain unchanged. Installation and browser launch are deferred to the explicitly approved T0 provisioning step.


## Accepted A1 and PNG Prerequisite Evidence — 2026-10-20

The user explicitly accepted A1 and isolated provisioning; the decision recording time is `2026-10-20T09:31:30Z`. s06 is now finalized with Developer gate-review fields, pending its new trusted signature. The accepted independent scratch provisioning was completed while production activation remained closed.

| Check | Actual evidence |
| --- | --- |
| Isolation | `/private/tmp/cf-diagram-png-1.64.0/venv` and dedicated `browsers` cache; no global package install or shell configuration change. |
| Interpreter | CPython 3.14.6, ordinary cp314 ABI, macOS 27.0.1 ARM64. |
| Packages | Exact approved lock installed with `--only-binary=:all: --require-hashes --no-cache-dir`: Playwright 1.64.0, greenlet 3.5.6, pyee 14.0.0, typing-extensions 4.16.0. All versions match; `pip check` exits 0. |
| Browser | Installed manifest agrees with Chromium Headless Shell 156.0.8078.4/revision 1248. Actual browser version matches on launch. FFmpeg revision 1013 also installed by the pinned installer. |
| Export | Scratch static HTML/SVG fixture produced a 320x180, 8-bit RGBA PNG. Signature/IHDR and decoded pixel checks pass: transparent corner and opaque diagram content. Visual inspection confirms the expected label. |
| Request blocking | Browser-context route aborted both `http://127.0.0.1:9/cf-probe` and `https://example.invalid/cf-probe`; both fetch attempts rejected. This is browser-context request evidence, not a claim of OS-level network isolation. |
| Provenance | Exact executable/PNG hashes below; package and browser license/NOTICE files retained in the local environment. |

Browser executable: `/private/tmp/cf-diagram-png-1.64.0/browsers/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell`. SHA-256: `77d8278b1ac9d0687fad4e817ea83023ede09b1deef36e1864b49ba194ac9634`.

PNG SHA-256: `167e23f387080be1175b185208a65e38cd26c32ac4c5365be734464167d742cc`. Scratch evidence: `/private/tmp/cf-diagram-png-1.64.0/{requirements.lock,probe.py,fixture.html,probe.png,evidence.json}`; JSON retains version, request and license/NOTICE inventories. This prerequisite probe is not adapter T3 or AC verification; no adapter source has been imported or implemented.

The two blocker entries (CHANGE-004 status and missing PNG tooling) and their first two required-action entries are now factually obsolete/satisfied. A prepared human-terminal helper will seal the accepted Task Plan and use the normal signed state-disposition command for exactly those four entries. The activation follow-up is retained. The report remains MATERIALIZED/s06 with no write grants until the required signatures are verified and normal CLI activation succeeds. No report/signature was hand-edited.


## T0 Admission and Execution — 2026-10-20/21

All five normal signed state dispositions were verified, including the legacy activation
reminder omitted from the first helper. A1 and unchanged Spec/Contract/DoR/Approach
receipts are valid. Normal CLI activation succeeded at 2026-10-20T14:18:33.874Z with
exact worktree/workflow/CHANGE-005 write roots. No protocol report or receipt was hand-edited.
The required worktree was created at the accepted path on branch
codex/add-diagram-design-adapter-v2.7.0, based on d43ef61 (governance-only delta on fa9ad23).
The zero-byte path placeholder was preserved in /private/tmp before worktree creation.
Main's unrelated untracked files and other worktrees remain untouched.

T1 upstream checkout is exactly 5f1b6ddc66036554dd68701798bd12aa5e3ef3f9; verified raw
manifest digest 97c4979fcbb92f4b0e1af8ef6fa79728ed2fa9cffccf838c6a0fa2e11738de96.
Actual PNG integration passed with the accepted task-local tuple after explicit sandbox
escalation for Chromium MachPort; missing browser, missing tool and forced rename failure
also pass. No global packages or managed homes changed. T7 preparation remains unpublished.


## T7-T9 Candidate and Handoff — 2026-10-21

T7 generated 43 skills per Codex/Claude runtime (86 total) using the existing sync path.
Version surfaces nominate 2.7.0, with 2.6.4/42 skills retained as rollback. Mirrored public
README, quickstart, documentation-map, publish-surface and Claude entrypoint metadata
were updated to keep existing release checks coherent; this bounded metadata extension
adds no runtime boundary. Historical release documents and native installers remain unchanged.
GitHub tag/release availability was checked before T7; no publication occurred.

T8 retained one final tarball: `artifacts/workflow-bundle-2.7.0.tgz`, 1,556,920 bytes,
901 files, SHA-256 `1a0f6f5ee468f531cc81ec1b116819a266cf96381812a6839538ace0590b7538`.
The initial candidate was superseded after visual review found dark header text on a
transparent background difficult to read on dark hosts. A failing assertion preceded
opaque header/annotation backplates; margins remain transparent. Actual decoded PNG
pixels confirm transparent corner and opaque header. All final unit and exact-artifact
lifecycle checks were rerun after rebuilding; the old candidate is not promotable.

T9 spec compliance review PASS for the implemented scope, followed by code quality PASS.
Final unit suite passes 50/50 files. Exact tarball install passes all four Codex/Claude x
global/project combinations on Node 18.20.8 and 22.23.2; exact update/disable/re-enable/
rollback passes 4/4 combinations and preserves unmanaged bytes/modes. Bundle smoke,
ten workflow fixture cases, runtime parity, pack audit and scoped authoring validators
pass. Actual pinned PNG export and failure cleanup paths pass. s08 owns the acceptance
matrix, retained log index, reader packet and explicit remaining gates.

No independent reader result is inferred from producer visual checks or automated
semantic tests. No DoD, Release or Business Acceptance signature has been recorded.
No push, merge, managed live install, tag, release publication or worktree cleanup occurred.


## Accepted AI-R01 QC Rework — 2026-10-23

User accepted repairing mid-word line breaks after independent SA/BA/TA review. This is
small-delta remediation within the approved presentation contract. The admission below
records the historical 2026-10-23 plan; signed resume and execution are completed below.

- Read-only reproduction: implementation worktree `artifacts/reader-review-golden-gate/qc-followup/wrap-repro.cjs`
  and `wrap-red.log`. Current renderer splits short words; whole-word recovery fails.
  This is reproduction evidence, not a completed TDD cycle.
- After admission, touch only adapter `scripts/export-svg.js` and
  `packages/workflow-bundle/test/diagram-design-presentation-adapter-output.test.js` initially.
- Add regression assertion and run RED; implement word-boundary wrapping with bounded
  fallback for overlong tokens; run GREEN for headers, fact rows, ASCII/Unicode, both
  layouts and semantic/static/accessibility validation.
- Review spec compliance then code quality. Preserve all canonical content, transparent
  margins/opaque headers, closed static template and atomic output.
- Re-sync runtimes, retain superseded tarball, rebuild/hash candidate and rerun parity,
  output/SAST and exact-artifact lifecycle checks. Re-render samples and verify answers
  and meaning remain unchanged; old output hashes do not transfer to new outputs.
- AI-R02 is a later layout enhancement; AI-R03 preserves existing fixture caveats.
- Return to s08 for verification and human closeout. No push, merge, publication or cleanup.

## AI-R01 Rework Completion — 2026-10-24

Both authorized blocker dispositions have trusted signatures and normal CLI resume opened
s07 with the existing three write roots. The helper failure was an identifier mismatch:
`dispose-state` requires the current snapshot's `di:` target, not the stable `se:` entry ID.
The corrected helper refreshes each target immediately before signing and safely recognizes
completed operations. No report or signature was hand-edited; no final gate was approved.

TDD RED reproduced broken short fact words in the actual output suite. GREEN follows the
minimal private `wrap()` change in adapter `scripts/export-svg.js`: keep words together when
they fit a complete row; preserve whitespace and every code point; retain bounded hard-wrap
for overlong tokens. The regression covers headers and fact rows, one/two-column layouts,
ASCII, Vietnamese, emoji and overlong ASCII/CJK/emoji tokens. Existing semantic, static,
accessibility, transparent-margin/opaque-header and atomic-failure checks still pass.

Two-tier targeted review: **spec compliance PASS** first — approved output contract, canonical
facts, ownership, provenance and scope are unchanged. **Code quality PASS** second — bounded
linear token processing, no new dependency or public API, code-point-safe fallback, exact
content preservation, focused regression assertions. Independent AI BA/TA output rechecks
also pass; they review rendering and semantics, not production code or human gates.

Runtime sync, 50/50 unit files, actual pinned PNG/failure paths, pack audit, and Semgrep
(99 rules / 5 first-party files / zero findings or errors) pass. The rebuilt exact candidate
passes Node 18 and 22 install matrices (4/4 each) and published-2.6.4 update/disable/re-enable/
rollback (4/4), preserving unmanaged bytes/modes. S08 owns the current candidate identity,
raw log index, final coverage and residual risks. The prior tarball is retained under
`artifacts/superseded/workflow-bundle-2.7.0-before-word-wrap.tgz`.

All four role/audience output sets were regenerated from the exact new tarball. Canonical
model/view/Draw.io bytes and concatenated primary visible text match the prior fixtures.
BA/TA visual rechecks close AI-R01 with no clipping or semantic regression in inspected PNGs.
This is regression verification, not a new blind 20-task study. Implementation is ready for
s08 human closeout review; the work item is not DONE and the branch/worktree remains retained.
