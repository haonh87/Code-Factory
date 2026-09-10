---
artifact_id: "closeout-bundle-repeat-cycle-reconciliation.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-repeat-cycle-reconciliation"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "changes/CR-008/spec-delta/srs.delta.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["ba", "developer", "qc", "devops", "po"]
review_mode: independent
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
  dod: "required"
role_signoffs:
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: ["devops", "qc"]
  business_acceptance: ["po"]
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-09-10T03:09:26Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["ba", "qc"]
  dor_reviewed_at: "2026-09-10T03:09:26Z"
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-09-10T08:12:02Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-09-10T08:56:19Z"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "closeout-bundle-repeat-cycle-reconciliation.s04.acceptance-criteria.md"
  - "closeout-bundle-repeat-cycle-reconciliation.s05.technical-approach.md"
linked_artifacts:
  - "closeout-bundle-repeat-cycle-reconciliation.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s07.implementation.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../packages/workflow-bundle/scripts/work-item-protocol.js"
  - "../../packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "../../packages/workflow-bundle/scripts/workflow-approval-transaction.js"
  - "../../packages/workflow-bundle/test/work-item-protocol.test.js"
  - "../../packages/workflow-bundle/test/workflow-gate-review.test.js"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> The Developer-approved s05 Approach is backed by a trusted receipt at
> `2026-09-10T08:20:46.196Z`; its digest matches s05 SHA-256
> `5635bebed29077d34cec2a8cf0883ea5af6ff59146656e09a5283b6d86f33d5a`.
> Human Developer approved this Task Plan at `2026-09-10T08:56:19Z`. It executes the
> transaction-delta projector in the existing CR-008 worktree through
> three TDD and review batches: shared cycle identity, canonical state projection, then
> failure/compatibility and exact-candidate evidence. The finalized host now awaits its trusted
> receipt; implementation remains closed until that receipt matches and s07 is explicitly activated.

## Step Contract
```yaml
step: "s06 Task Plan"
goal: >-
  Convert the approved transaction-delta projector into an ordered, path-owned, TDD-first plan that
  can close F-AG11-001 without re-inferring cycle, projection, transaction, or release semantics.
value: >-
  Give Developer, QC, DevOps, and PO an unambiguous execution and evidence path while preserving
  human authority, immutable history, atomicity, compatibility, and parent CR-008 release controls.
scope_in:
  - "Shared transaction identity for a real committed closeout cycle"
  - "Receipt/pre-event state-delta classification before event construction"
  - "Canonical closeout projection for report and synchronized s01 state"
  - "First/later/retry, semantic, failure/recovery, concurrency, and compatibility tests"
  - "Mandatory early review in Spec Compliance then Code Quality order"
  - "One corrected v2.6.2 candidate and child-to-parent re-verification handoff"
scope_out:
  - "Public CLI, receipt-v1, protocol-event, artifact, config, runtime, or deployment schema changes"
  - "New lifecycle state, persisted cycle ledger, generic prose engine, service, or dependency"
  - "Legacy terminal-gate selection already owned by closeout-bundle-legacy-dod-compatibility"
  - "Publication, tag creation, merge, install, cleanup, or branch/worktree finalization"
inputs_required:
  - "Digest-matched Spec and DoR receipts for s04 SHA-256 b50db12a977a007b8785baff4153ad54d8049e0003d030deaf4329bebff9f60b"
  - "Digest-matched Approach receipt for s05 SHA-256 5635bebed29077d34cec2a8cf0883ea5af6ff59146656e09a5283b6d86f33d5a"
  - "AC-RCR-01..08, EDGE-RCR-01..06, and approved OQ-RCR-001=B/OQ-RCR-002=A/OQ-RCR-003=A"
  - "Approved Option A and the existing closeout transaction, report/s01, and fixture boundaries"
outputs_required:
  - "Exact tasks, owned paths, dependencies, RED/GREEN points, review checkpoints, and verify commands"
  - "Brownfield regression, rollback, exact-candidate, and parent re-verification sequence"
done_when:
  - "Every AC and edge class maps to a task and deterministic verification path"
  - "Every behavior change has a fail-first test before its minimum production delta"
  - "Batch boundaries and Spec Compliance before Code Quality review are explicit"
  - "No placeholder, unresolved design choice, or unowned release checkpoint remains"
constraints:
  hard_constraints:
    - "T1/T3/T5 RED evidence must precede the corresponding T2/T4/T6 production change"
    - "A cycle is receipt_delta OR pre-event state_delta; the new event is never its own trigger"
    - "One validated transaction ID is shared by the event and existing journal/summary"
    - "An unchanged retry has no ID allocation, event, operation, journal, lock, or file mutation"
    - "Only mutable report/s01 current state changes; historical notes, receipts, markers, and events remain immutable"
    - "The existing CR-008 worktree stays open until child and parent s08 decisions permit finalization"
  soft_constraints:
    - "Prefer small pure helpers and existing fixture builders over a new abstraction surface"
    - "Keep source deltas within the three approved internal modules"
  prohibited_actions:
    - "Code before Task Plan approval, receipt verification, and explicit s07 activation"
    - "Use CLOSEOUT_BUNDLE_APPROVED history or command invocation as cycle identity"
    - "Make transaction_id mandatory for existing callers"
    - "Delete, rewrite, reorder, or backfill historical authority or audit evidence"
    - "Use a subagent for the tightly coupled coordinator/projector/test path"
  compliance_checks:
    - "TDD evidence records expected RED and GREEN for each behavior batch"
    - "Independent review records Spec Compliance before Code Quality for B1, B2, and B3"
    - "Strict workflow validators, compatibility, security, performance, and UTF-8 checks pass"
    - "Child and parent evidence bind one corrected exact candidate before terminal decisions repeat"
risks:
  - id: "R-S06-RC-001"
    description: "An event operation enters the classifier and converts unchanged retries into commits."
    mitigation: "Classify only receipt and pre-event report/s01 operations; assert two byte-identical NOOP retries."
  - id: "R-S06-RC-002"
    description: "Semantic cleanup removes an unrelated blocker or rewrites immutable history."
    mitigation: "Use selected-gate semantics only on mutable fields and retain unrelated/history digest canaries."
  - id: "R-S06-RC-003"
    description: "Event, journal, and CLI transaction identities diverge."
    mitigation: "Preallocate one validated ID and assert exact equality across all observable surfaces."
  - id: "R-S06-RC-004"
    description: "Concurrent or recovered retries commit duplicate cycles."
    mitigation: "Retain the live lock, expected digests, rollback/recovery matrix, and at-most-one-commit assertion."
  - id: "R-S06-RC-005"
    description: "The parent is closed using stale pre-finding candidate evidence."
    mitigation: "Build once after review, bind full SHA-256 locally and hosted, rerun AG-01..13, and repeat terminal gates."
timebox:
  target_duration: "One focused TDD and review batch at a time"
  deadline: "Before any corrected v2.6.2 publication or branch finalization"
  escalation_rule: "Return to s05/s04 before changing a public contract, persisted schema, lifecycle state, or accepted behavior."
```

## Main Artifact
```yaml
implementation_goal: >-
  Make every real repeated closeout cycle canonical and transaction-attributable while unchanged
  retries remain byte-stable NOOPs, then re-establish child and parent evidence on one candidate.
ba_lane:
  acceptance_coverage:
    - "AC-RCR-01/02/EDGE-RCR-01/02/05 -> T3, T4, B1 review"
    - "AC-RCR-03/05/EDGE-RCR-03/04 -> T5, T6, B2 review"
    - "AC-RCR-04/06/EDGE-RCR-06 -> T3, T5, T7"
    - "AC-RCR-07 -> T7 compatibility and full workflow-bundle regression"
    - "AC-RCR-08 -> T8 exact candidate, hosted evidence, child s08, and parent re-verification"
  scope_guards:
    - "Do not change gate selection, reviewer authority, receipt-v1 signing, or trusted-root behavior."
    - "Do not introduce a public field, action, flag, schema, config value, database, service, or dependency."
    - "Do not edit finalized s04/s05 or historical parent/child receipts as implementation output."
    - "Do not absorb unrelated CR-008 scope or reopen the resolved legacy-DoD selector defect."
    - "Do not publish, tag, install, merge, clean, or finalize the branch/worktree in s07."
  human_review_points:
    - "Developer approves and seals this Task Plan before s07 activation."
    - "QC reviews B1/B2/B3 Spec Compliance before Developer/QC review Code Quality."
    - "QC controls child Technical Verification and DoD."
    - "QC re-verifies parent Technical Verification/DoD; DevOps/QC repeat Release; PO repeats Business Acceptance."
dev_lane:
  path_map:
    - owner: "Closeout current-state projector and event construction"
      paths: ["packages/workflow-bundle/scripts/work-item-protocol.js"]
    - owner: "Cycle classifier, operation sequencing, and transaction binding"
      paths: ["packages/workflow-bundle/scripts/workflow-gate-review.js"]
    - owner: "Optional validated transaction identity"
      paths: ["packages/workflow-bundle/scripts/workflow-approval-transaction.js"]
    - owner: "Real CLI repeat-cycle, projection, failure, and compatibility fixtures"
      paths: ["packages/workflow-bundle/test/work-item-protocol.test.js"]
    - owner: "Coordinator identity, atomicity, and compatibility fixtures"
      paths: ["packages/workflow-bundle/test/workflow-gate-review.test.js"]
    - owner: "Child and parent trace/evidence"
      paths:
        - "work-items/closeout-bundle-repeat-cycle-reconciliation/*.s07.*"
        - "work-items/closeout-bundle-repeat-cycle-reconciliation/*.s08.*"
        - "work-items/adaptive-governance-human-approval-ux/*.s07.*"
        - "work-items/adaptive-governance-human-approval-ux/*.s08.*"
  technical_sequence:
    - "T0 baseline -> T1 RED -> T2 GREEN -> T3 RED -> T4 GREEN -> B1 review -> T5 RED -> T6 GREEN -> B2 review -> T7 matrix/B3 review -> T8 candidate and s08 handoff"
  tdd_targets:
    - "T1 proves supplied transaction ID validation/reuse is absent before T2."
    - "T3 proves second-cycle event attribution and unchanged retry semantics fail before T4."
    - "T5 proves prose/case/whitespace cleanup, canonical handoff, and report/s01 parity fail before T6."
    - "Any new behavior discovered in T7 receives its own RED before a correction."
task_breakdown:
  - id: "T0"
    owner_role: "developer"
    name: "Freeze receipt, source, and worktree baseline"
    objective: "Record the trusted authoring inputs, existing test baseline, dirty paths, and the exact implementation boundary before any production edit."
    paths_in_scope:
      - ".claude/worktrees/cr-008-adaptive-governance"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation/*.s07.*"
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/scripts/workflow-gate-review.js"
      - "packages/workflow-bundle/scripts/workflow-approval-transaction.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "packages/workflow-bundle/test/workflow-gate-review.test.js"
    dependencies: ["Developer Task Plan approval", "digest-matched Task Plan receipt", "explicit s07 activation"]
    outputs_expected:
      - "All work-item, Spec, DoR, Approach, and Task Plan receipts verified against their current hosts"
      - "Branch/worktree, source SHA, and dirty-path inventory preserving unrelated CR-008 evidence"
      - "Focused pre-change tests and Delivery Rule Evidence baseline"
    review_checkpoint: "Confirm the five code/test paths and child/parent evidence paths are the only writable defect scope."
    verification_hint: "Run wfc work-item/gate status, git status/diff, both focused tests, and record exact results in child s07."
  - id: "T1"
    owner_role: "developer"
    name: "Write failing optional transaction-identity tests"
    objective: "Prove the coordinator cannot yet validate and reuse one caller-supplied transaction ID while preserving generated-ID defaults."
    paths_in_scope:
      - "packages/workflow-bundle/test/workflow-gate-review.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation/*.s07.*"
    dependencies: ["T0"]
    outputs_expected:
      - "Expected RED for valid supplied ID reuse"
      - "Expected RED for malformed supplied ID rejection before writes"
      - "Compatibility assertion that omitted ID still generates the existing transaction shape"
    review_checkpoint: "B1 Spec Compliance seed: tests must express AC-RCR-02/06 without creating a new public contract."
    verification_hint: "Run workflow-gate-review.test.js and retain failures naming supplied-ID behavior rather than syntax or fixture setup."
  - id: "T2"
    owner_role: "developer"
    name: "Add optional validated coordinator identity"
    objective: "Accept and reuse one internal transaction ID while leaving every existing caller and output shape unchanged."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-approval-transaction.js"
      - "packages/workflow-bundle/test/workflow-gate-review.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation/*.s07.*"
    dependencies: ["T1 expected RED"]
    outputs_expected:
      - "Validated optional transaction_id input"
      - "Exact ID reuse in journal and transaction result"
      - "Generated-ID default and failure-before-write behavior remain green"
    review_checkpoint: "B1 Code Quality later checks that identity validation is narrow and no authority or schema surface changes."
    verification_hint: "Rerun workflow-gate-review.test.js to GREEN and node --check the changed coordinator."
  - id: "T3"
    owner_role: "developer"
    name: "Write failing cycle and event-attribution fixtures"
    objective: "Reproduce first cycle, later committed cycle, and unchanged retry through the real closeout CLI before changing classification."
    paths_in_scope:
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation/*.s07.*"
    dependencies: ["T2"]
    outputs_expected:
      - "Historical marker without event and marker with older event fixtures"
      - "Expected RED: later commit lacks exactly one current event sharing the transaction ID and ordered gates"
      - "Expected RED or guard assertion proving unchanged retries must not allocate identity or append evidence"
    review_checkpoint: "B1 Spec Compliance maps the three outcomes to AC-RCR-01/02/04 and EDGE-RCR-01/02/05."
    verification_hint: "Run work-item-protocol.test.js and preserve the second-cycle/event failures plus pre/post counts and digests."
  - id: "T4"
    owner_role: "developer"
    name: "Implement pre-event cycle classification and event sequencing"
    objective: "Classify a committed cycle from receipt or pre-event state operations, then allocate one ID and append one attributable event only for that cycle."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-gate-review.js"
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "packages/workflow-bundle/test/workflow-gate-review.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation/*.s07.*"
    dependencies: ["T3 expected RED"]
    outputs_expected:
      - "receipt_delta and pre-event state_delta decide committed_cycle before event construction"
      - "One event note contains the shared transaction ID and deterministic selected-gate order"
      - "The coarse CLOSEOUT_BUNDLE_APPROVED marker stays deduplicated"
      - "An unchanged retry produces no transaction residue"
    review_checkpoint: "B1 requires QC Spec Compliance PASS before Developer/QC Code Quality review begins."
    verification_hint: "Run both focused tests, assert event ID equals transaction result, and run two unchanged retries with byte-digest comparison."
  - id: "T5"
    owner_role: "developer"
    name: "Write failing canonical-state and parity fixtures"
    objective: "Reproduce stale literal/prose/case/whitespace approval instructions, unrelated blocker canaries, old handoff, and report/s01 divergence."
    paths_in_scope:
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation/*.s07.*"
    dependencies: ["B1 Spec Compliance PASS", "B1 Code Quality PASS"]
    outputs_expected:
      - "Expected RED for semantic selected-gate cleanup"
      - "Expected RED for exact work-item close action and protocol-close handoff"
      - "Expected RED for report/s01 parity while preserving unrelated blockers and history digests"
    review_checkpoint: "B2 Spec Compliance seed: fixture variants must cover EDGE-RCR-03/04 and immutable-history canaries."
    verification_hint: "Run work-item-protocol.test.js and retain only failures attributable to AC-RCR-03/05 rather than B1 behavior."
  - id: "T6"
    owner_role: "developer"
    name: "Implement the canonical approved-closeout projection"
    objective: "Project selected terminal gates to the exact close action and protocol-close handoff on both mutable surfaces without rewriting history."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/scripts/workflow-gate-review.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation/*.s07.*"
    dependencies: ["T5 expected RED"]
    outputs_expected:
      - "Selected terminal approval blockers/actions removed by bounded semantics"
      - "required_actions equals the exact close command and handoff_target equals protocol-close"
      - "s01 is rendered from the normalized report projection in the same transaction"
      - "Unrelated current blockers and every historical byte/order canary remain unchanged"
    review_checkpoint: "B2 requires QC Spec Compliance PASS before Developer/QC Code Quality review begins."
    verification_hint: "Rerun the semantic matrix to GREEN, parse report/s01 for parity, and compare immutable history digests and event prefixes."
  - id: "T7"
    owner_role: "developer/qc"
    name: "Prove atomicity, concurrency, compatibility, and repeat determinism"
    objective: "Exercise the complete delta at every transaction boundary and across all supported brownfield protocol shapes before candidate creation."
    paths_in_scope:
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "packages/workflow-bundle/test/workflow-gate-review.test.js"
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/scripts/workflow-gate-review.js"
      - "packages/workflow-bundle/scripts/workflow-approval-transaction.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation/*.s07.*"
    dependencies: ["B2 Spec Compliance PASS", "B2 Code Quality PASS"]
    outputs_expected:
      - "Receipt/event/report/s01 failure matrix with zero partial state and deterministic recovery"
      - "Concurrent retry permits at most one commit and leaves later attempts as NOOP"
      - "Twenty repeated-cycle executions have zero report/s01 mismatch or stale approval prompt"
      - "First-cycle, legacy, adaptive, readiness, rejection, receipt-v1, reviewer, and public CLI regressions remain green"
      - "Separate B3 Spec Compliance and Code Quality verdicts with no unresolved high finding"
    review_checkpoint: "QC performs B3 Spec Compliance first; Developer/QC perform Code Quality only after that PASS or an explicit exception."
    verification_hint: "Run both focused suites, enumerate every supported transaction failure point, execute 20 controlled runs, then run full unit and workflow validators."
  - id: "T8"
    owner_role: "developer/qc/devops/po"
    name: "Build one corrected candidate and hand off child-to-parent verification"
    objective: "Bind all remaining release evidence to one immutable corrected v2.6.2 candidate without publishing it."
    paths_in_scope:
      - "packages/workflow-bundle/**"
      - ".github/workflows/workflow-guardrails.yml (verify unchanged unless approved drift is required)"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation/*.s07.*"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation/*.s08.*"
      - "work-items/adaptive-governance-human-approval-ux/*.s07.*"
      - "work-items/adaptive-governance-human-approval-ux/*.s08.*"
    dependencies: ["T7 matrix PASS", "B3 Spec Compliance PASS", "B3 Code Quality PASS"]
    outputs_expected:
      - "Workflow validators, full unit, pack audit, bundle smoke, candidate smoke, static/security/performance, and UTF-8 results"
      - "One corrected v2.6.2 tarball with full SHA-256 reused by local and hosted Node 18/22"
      - "Child AC-RCR-01..08 Technical Verification and DoD evidence"
      - "Parent AG-01..AG-13 at 13/13 for the same candidate and F-AG11-001 disposition"
      - "Separate QC DoD, DevOps/QC Release, and PO Business Acceptance decision points"
      - "Immutable v2.6.1 rollback SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
    review_checkpoint: "Reject any evidence with candidate-digest drift, a failed/skipped required job, or an inferred terminal approval."
    verification_hint: "Build once after B3, verify supplied checksum and extracted payload, run hosted Guardrails on the same source/candidate, then bind child and parent s08 evidence before human gates."
dependencies_global:
  - "T0 cannot start until the Developer-approved Task Plan has a digest-matched receipt and s07 is explicitly activated."
  - "Each RED task gates its paired production task: T1->T2, T3->T4, and T5->T6."
  - "B1 and B2 each require Spec Compliance before Code Quality; both gate the next behavior batch."
  - "B3 closes early review before T8 creates the exact candidate."
  - "Child Technical Verification/DoD precedes parent AG-01..13 re-verification and repeated terminal decisions."
risk_notes:
  - "The event itself must never count as a state delta."
  - "Semantic cleanup is bounded to selected terminal-gate meaning in mutable current-state fields."
  - "No subagent is planned because the classifier, projector, coordinator, and shared fixtures are tightly coupled."
  - "v2.6.1 remains rollback-only; bundled closeout stays guarded there and individual terminal approvals are used."
verification_plan:
  - "Focused TDD RED/GREEN for optional ID, cycle/event, and canonical-state behavior"
  - "Real CLI first/second/retry, semantic variants, report/s01 parity, immutable history, failure/recovery, and concurrency"
  - "Legacy/adaptive/readiness/rejection/receipt-v1/reviewer/public-CLI compatibility"
  - "Separate B1/B2/B3 Spec Compliance then Code Quality review evidence"
  - "wfc validate/plan/protocol, full unit, pack audit, authoring/bundle/candidate smoke, diff and syntax checks"
  - "Security/performance heuristics and UTF-8 decoding for changed text"
  - "One full corrected v2.6.2 SHA-256 across local/hosted Node 18/22 plus immutable v2.6.1 rollback"
  - "Child AC-RCR-01..08 then parent AG-01..13 and separate terminal human gates"
notes_for_implementation: >-
  Execute sequentially in the existing dedicated CR-008 worktree. Preserve unrelated parent evidence,
  record each expected RED before the paired minimum production change, stop on spec/governance drift,
  and keep the worktree open. The plan intentionally uses one agentic implementation lane because its
  production paths and fixtures share one transaction boundary; QC/Developer reviews remain independent.
```

## Verification Plan

- Focused TDD: `node packages/workflow-bundle/test/workflow-gate-review.test.js` and `node packages/workflow-bundle/test/work-item-protocol.test.js` at each RED/GREEN boundary.
- Syntax/static: `node --check` for changed JavaScript, `git diff --check`, and changed-file inspection.
- Workflow: `npm run validate:workflow -- --workflow-root work-items --project-root .`, `validate:workflow:planning`, `validate:workflow:protocol`, `validate:workflow:fixtures`, and SDD/change/execution validators.
- Package: `npm run validate:workflow:unit`, `validate:workflow:pack-audit`, `validate:workflow:authoring-smoke`, `validate:workflow:bundle-smoke`, and `validate:workflow:release-candidate`.
- Security/performance: inspect ID validation, path/lock ownership, fixture-only failure injection, secret logging, dependency drift, repeated file reads/writes, and unbounded matching.
- Encoding: decode every changed Markdown, JSON, YAML, and JavaScript file as UTF-8 and reject replacement bytes.
- Release: build once after B3; bind the same full candidate digest to local/hosted Node 18/22 and retain the immutable v2.6.1 rollback. No publication or tag in s07.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
checks:
  - id: "GOV-S06-RC-001"
    result: PASS
    evidence: "Every AC-RCR criterion and EDGE-RCR class maps to a named task and deterministic verification."
  - id: "GOV-S06-RC-002"
    result: PASS
    evidence: "T1/T3/T5 enforce RED before T2/T4/T6, and B1/B2/B3 enforce Spec Compliance before Code Quality."
  - id: "GOV-S06-RC-003"
    result: PASS
    evidence: "The existing dedicated worktree is retained; exact owned paths, rollback, and finalization hold are explicit."
  - id: "GOV-S06-RC-004"
    result: PASS
    evidence: "Agentic sequential execution is selected because the shared transaction and fixture boundary is not independently delegable."
  - id: "GOV-S06-RC-005"
    result: PASS
    evidence: "No public contract, dependency, migration, lifecycle, runtime, deployment, or governance exception is planned."
  - id: "GOV-S06-RC-006"
    result: PASS
    evidence: "T8 preserves exact-candidate provenance, v2.6.1 rollback, parent re-verification, and independent human terminal gates."
blocking_items:
  - "Digest-matched trusted Task Plan receipt"
  - "Explicit s07 activation with bounded write paths"
owner: "developer/qc"
next_action: "Seal and verify the Developer-approved Task Plan receipt against this finalized host, then explicitly activate s07."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "T0 source, receipt, focused-test, and dirty-path baseline before production edits"
  - "T1/T2 optional identity RED/GREEN"
  - "T3/T4 cycle/event RED/GREEN followed by B1 review"
  - "T5/T6 canonical projection RED/GREEN followed by B2 review"
  - "T7 atomicity, recovery, concurrency, 20x determinism, compatibility, and B3 review"
  - "T8 full repository/package matrix and exact-candidate handoff"
compatibility_checkpoints:
  - "First-cycle maintenance and product closeout retain exact gate/reviewer behavior"
  - "Legacy mandatory DoD and adaptive declared-gate selection remain unchanged"
  - "Readiness approval and readiness/closeout rejection remain unchanged"
  - "Receipt-v1 signature, digest, reviewer authority, trusted-root, and public CLI behavior remain unchanged"
  - "Existing coordinator callers continue to receive generated transaction IDs by default"
  - "Historical notes, receipts, markers, events, and v2.6.1 artifacts remain byte/order stable"
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "Before publication, revert only the focused source/test delta if a required regression or review fails."
  - "Do not rewrite or delete historical receipts, events, markers, notes, or prior candidate evidence."
  - "For runtime rollback, reinstall immutable v2.6.1, guard or disable bundled closeout, and use individual terminal gate commands."
  - "Keep F-AG11-001 and branch/worktree HOLD_OPEN until corrected child and parent evidence pass."
```

## SDD Traceability
```yaml
requirement_refs: ["REQ-AG-009", "RCR-01", "RCR-02", "RCR-03", "RCR-04", "RCR-05", "RCR-06"]
acceptance_refs: ["AC-RCR-01", "AC-RCR-02", "AC-RCR-03", "AC-RCR-04", "AC-RCR-05", "AC-RCR-06", "AC-RCR-07", "AC-RCR-08"]
task_refs: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"]
test_refs:
  - "optional-transaction-id-red-green"
  - "repeat-closeout-first-second-retry-red-green"
  - "closeout-semantic-current-state-matrix-red-green"
  - "closeout-immutable-history-and-s01-parity"
  - "closeout-failure-recovery-concurrency-matrix"
  - "existing-readiness-adaptive-legacy-receipt-regression"
  - "corrected-v2.6.2-candidate-and-parent-ag01-ag13"
```

## Audit
```yaml
step: "s06 Task Plan"
status: PASS
checks:
  - criterion: "Executable ownership and order"
    result: PASS
    evidence: "T0..T8 identify exact source, test, evidence, worktree, dependency, output, review, and verify paths."
  - criterion: "Acceptance and edge coverage"
    result: PASS
    evidence: "The BA lane maps AC-RCR-01..08 and EDGE-RCR-01..06 to behavior, regression, and release tasks."
  - criterion: "TDD and early two-tier review"
    result: PASS
    evidence: "Three explicit RED/GREEN pairs and B1/B2/B3 Spec Compliance before Code Quality are ordered in the critical path."
  - criterion: "Brownfield compatibility and rollback"
    result: PASS
    evidence: "Existing authority, CLI, receipt, gate, readiness, history, coordinator, and v2.6.1 rollback boundaries are preserved."
  - criterion: "Exact candidate and parent handoff"
    result: PASS
    evidence: "T8 binds child and parent evidence to one local/hosted candidate before independent terminal decisions."
  - criterion: "No placeholders or design reinference"
    result: PASS
    evidence: "Every task names its objective, paths, outputs, dependencies, review checkpoint, and deterministic verification hint."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one focused planning pass after the s05 trusted receipt verified."
gaps:
  - "The digest-matched trusted Task Plan receipt and explicit s07 activation remain pending."
risk_level: HIGH
next_action: "Seal and verify the Developer-approved Task Plan receipt; no production code is authorized yet."
```

## Traceability
```yaml
upstream:
  - "closeout-bundle-repeat-cycle-reconciliation.s04.acceptance-criteria.md"
  - "closeout-bundle-repeat-cycle-reconciliation.s05.technical-approach.md"
  - "Approach receipt Developer 2026-09-10T08:20:46.196Z / SHA-256 5635bebed29077d34cec2a8cf0883ea5af6ff59146656e09a5283b6d86f33d5a"
  - "F-AG11-001 in parent s07 and s08"
outputs:
  - "T0..T8 execution plan"
  - "Three TDD RED/GREEN pairs and B1/B2/B3 two-tier reviews"
  - "Brownfield regression, rollback, exact-candidate, and child-to-parent verification sequence"
next_step: "s07 only after Developer approval, digest-matched Task Plan receipt, and explicit activation"
```

## Handoff

- First action after activation: T0 verifies every trusted input and freezes the existing worktree/source baseline.
- Behavior sequence: T1/T2 optional identity, T3/T4 cycle/event attribution, then T5/T6 canonical state projection.
- Review sequence: B1, B2, and B3 each record Spec Compliance before Code Quality.
- Final evidence: T7 completes atomic/compatibility regression; T8 builds one candidate and routes child then parent s08 decisions.
- Delegation: none; the coordinator, classifier, projector, and shared fixtures are tightly coupled.
- Current gate: Human Developer approved Task Plan at `2026-09-10T08:56:19Z`; its trusted receipt remains pending and implementation is closed.
- Branch/worktree: `HOLD_OPEN`; no publication, tag, merge, install, cleanup, or finalization is authorized.
