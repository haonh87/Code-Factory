---
artifact_id: "adaptive-governance-human-approval-ux.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "adaptive-governance-human-approval-ux"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CR-008"
change_status: approved
spec_delta_refs:
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CR-008/spec-delta/brd.delta.md"
  srs: "changes/CR-008/spec-delta/srs.delta.md"
spec_status: approved
planning_track: enterprise
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
  - "qc"
  - "devops"
review_mode: independent
verification_owner: "auditor"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release:
    - "devops"
    - "qc"
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-28T14:23:15Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-08-28T14:23:15Z"
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-08-28T14:23:15Z"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-28T14:50:08Z"
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
  - "system-design"
  - "brainstorming"
  - "deployment-devops"
  - "ci-cd-release"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "adaptive-governance-human-approval-ux.s04.acceptance-criteria.md"
linked_artifacts:
  - "changes/CR-008/design.md"
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
  - "adaptive-governance-human-approval-ux.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Spec, Contract và DoR đã có trusted receipts hợp lệ. S05 đề xuất một policy kernel thuần,
> các adapter trên runtime hiện hữu và transaction coordinator cho approval bundle; Approach
> đã được Developer phê duyệt; trusted receipt riêng vẫn phải được seal trước khi gate là PASS.

## Step Contract
```yaml
step_goal: >-
  Chọn delta kỹ thuật nhỏ nhất đáp ứng AG-01..AG-13: routing deterministic, role/gate theo
  applicability, bundle không partial, trạng thái nhất quán, telemetry riêng tư và rollout có thể đảo.
input_summary:
  - "Spec/Contract/DoR receipts APPROVED với digest_match=true"
  - "AG-01..AG-13 và adaptive-governance-v1 public behavior contract"
  - "Brownfield Node.js/CommonJS workflow-bundle 2.6.1"
  - "Existing materialize, scaffold, protocol, gate review, trusted receipt and telemetry modules"
  - "Source runtime 2.6.1 versus installed Codex runtime 2.3.2"
output_summary:
  - "Option analysis với ba phương án và một recommendation"
  - "Component boundary, data flow, interface, failure and compatibility model"
  - "Approval transaction and state-reconciliation contract"
  - "Telemetry privacy/retention design"
  - "Runtime parity, CI, rollout and rollback design"
done_when:
  - "Có 2-3 options, lý do chọn và rejected directions rõ ràng"
  - "Brownfield impact, failure modes, compatibility, rollback và observability đủ để lập s06"
  - "Không mở stack, service, database hoặc signer-session boundary mới"
  - "Developer có đủ evidence để review Approach"
owner: "developer"
```

## Option Analysis
```yaml
goal: >-
  Giảm ceremony cho non-delivery/maintenance trong khi giữ nguyên authority và làm cho routing,
  approval bundle, compatibility và telemetry có thể kiểm chứng bằng deterministic fixtures.
ba_lane:
  business_goal: >-
    Giảm ít nhất 50% median interaction từ intake đến ACTIVE mà không phát sinh irrelevant action,
    unsafe downgrade, partial approval hoặc trạng thái approval mâu thuẫn.
  user_scenarios:
    - "Q&A, research, translation, documentation và read-only analysis không bị kéo vào delivery workflow."
    - "Maintenance chỉ hiển thị role/gate có trigger thực tế."
    - "Delivery readiness và closeout được review trong tối đa một interaction mỗi phase."
  business_rules:
    - "Hard escalation luôn thắng lane default, preset và agent inference."
    - "Bundle giảm interaction, không gộp authority hoặc receipt."
    - "Not applicable tạo zero pending action."
    - "Telemetry opt-in, local-only và allowlist-only."
  scope_notes:
    - "CR-008 giữ signer và receipt schema hiện hữu."
    - "Historical artifacts không bị rewrite."
  open_questions: []
dev_lane:
  repo_constraints:
    - "Runtime hiện tại là Node.js >=18, CommonJS và filesystem-backed artifacts."
    - "Trusted approval root nằm ngoài project root."
    - "Materialize, scaffold, validator và protocol hiện có nhiều derived surfaces."
    - "Installed Codex runtime 2.3.2 chưa parity với source 2.6.1."
  technical_risks:
    - "Inline rule duplication gây decision drift giữa materialize, scaffold và validator."
    - "Sequential receipt writes hiện có thể tạo partial bundle."
    - "Sửa gate-host note sau seal làm trusted receipt stale."
    - "Telemetry hiện dùng raw work_item_slug và chưa có retention purge."
  integration_points:
    - "wfc CLI and materialize admission"
    - "scaffold/frontmatter and governance validation"
    - "trusted approval and work-item protocol"
    - "telemetry and release-candidate pipeline"
  nfr_notes:
    - "Equivalent normalized inputs must produce byte-equivalent decisions."
    - "Caught write failures must roll back; crash recovery must be idempotent."
    - "Legacy/new readers remain supported for the accepted compatibility window."
  baseline_context: "Brownfield workflow package; preserve current runtime, receipt and artifact contracts where possible."
options:
  - { name: "Option A - Patch existing scripts inline", summary: "Add lane checks, role filters and bundle branches directly to existing scripts.", pros: ["Fewest new modules", "Fastest initial coding path", "Minimal CLI re-plumbing"], cons: ["Duplicates semantics across writers and validators", "Makes determinism and reconciliation harder to prove", "Leaves atomicity distributed"], risks: ["High regression and drift risk"] }
  - { name: "Option B - Pure policy kernel plus existing-runtime adapters", summary: "Add one pure decision kernel and one approval transaction coordinator while retaining current adapters.", pros: ["One canonical decision", "Side-effect-free fixtures", "One atomicity owner", "Individual approval fallback"], cons: ["Two focused internal modules", "Adapter parity tests required"], risks: ["Kernel boundary must stay narrow"] }
  - { name: "Option C - External declarative policy engine", summary: "Move lanes, triggers, roles and gates into a versioned configuration DSL.", pros: ["Highly configurable", "Potentially reusable"], cons: ["New schema, parser and migration", "More complex policy provenance", "Exceeds scope"], risks: ["Configuration drift"] }
recommended_option: "Option B - Pure policy kernel plus existing-runtime adapters"
recommendation_reason: >-
  Option B is the smallest design that centralizes a decision consumed by at least materialize,
  scaffold, validator and protocol while giving bundle atomicity one clear owner. Option A is smaller
  only by file count but cannot meet current determinism/reconciliation risk cleanly; Option C opens
  an unnecessary platform boundary.
trade_offs:
  - "Accept two small internal modules to avoid semantic duplication across at least four consumers."
  - "Keep filesystem transaction recovery instead of introducing a database."
  - "Keep receipt schema v1 and individual commands; adaptive bundle is orchestration, not a signer redesign."
validation_plan:
  - "Golden matrix for all eight lanes and hard escalation reasons"
  - "Adapter parity test: identical kernel decision across materialize, scaffold and validator"
  - "Failure injection for every staged/commit/reconcile boundary"
  - "Legacy/adaptive artifact and receipt compatibility matrix"
  - "Telemetry allowlist, secret canary, retention and purge tests"
notes_for_next_step: "READY for system design and s06 planning; no discovery question needs reopening."
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: "Brownfield extension of the existing workflow-bundle"
selected_stack:
  - "Existing Node.js/CommonJS toolchain"
selected_runtime:
  - "Existing wfc CLI, local filesystem artifacts and external trusted approval root"
decision_notes:
  - "No framework, service, database, runtime platform or deployment topology change."
  - "The two proposed modules are internal boundaries forced by current determinism and atomicity criteria."
```

## Main Artifact
```yaml
design_problem: >-
  Current workflow behavior is distributed across admission, scaffolding, validation, approval and
  protocol state. CR-008 must make applicability adaptive without letting those surfaces disagree or
  weakening human-controlled gates.
business_rule_trace:
  - "BR-AG-001/AG-01 -> non-delivery short-circuits before any delivery write"
  - "BR-AG-002/AG-02..AG-05 -> applicability is derived from named triggers only"
  - "BR-AG-003/AG-06..AG-08 -> one interaction, independent receipts, atomic failure semantics"
  - "BR-AG-004/AG-12 -> baseline plus interaction/retry/lead-time measurement"
  - "BR-AG-005/AG-09/AG-13 -> dual-read, runtime parity and bounded compatibility"
  - "BR-AG-006/AG-10 -> opt-in allowlisted local telemetry with retention"
  - "REQ-AG-009/AG-11 -> trusted receipt and every derived state surface agree"
design_options:
  - name: "Inline patch"
    summary: "Branch inside existing scripts."
    pros: ["Low initial file count"]
    cons: ["Duplicated semantics", "Weak atomicity ownership"]
    risks: ["Decision drift"]
  - name: "Policy kernel plus adapters"
    summary: "Pure decision core, existing-runtime adapters and focused transaction coordinator."
    pros: ["Deterministic", "Testable", "Backward-compatible"]
    cons: ["Two internal modules"]
    risks: ["Boundary creep if new policy DSL is added"]
  - name: "Declarative policy engine"
    summary: "Versioned external rules and generic evaluation runtime."
    pros: ["Highly configurable"]
    cons: ["New public schema and migration"]
    risks: ["Governance/config drift"]
rejected_options:
  - name: "Inline patch"
    reason: "Does not give AG-03, AG-07 and AG-11 one enforceable source of truth."
  - name: "Declarative policy engine"
    reason: "Adds a larger boundary not required by current acceptance criteria."
recommended_design: >-
  Introduce a pure adaptive-governance policy kernel for normalized lane/applicability decisions and
  a filesystem-backed approval transaction coordinator. Existing materialize, scaffold, validator,
  protocol, trusted-receipt and telemetry modules remain adapters and compatibility surfaces.
recommendation_reason: >-
  The current scope already has multiple consumers and multi-file failure semantics; centralizing
  these two responsibilities is necessary, while retaining the existing stack and public receipt model
  keeps the delta bounded.
component_changes:
  - component: "adaptive-governance policy kernel"
    responsibility: "Normalize input; classify lane; apply hard escalation; derive roles/gates/reason codes."
    touchpoints: ["new pure CommonJS module", "materialize adapter", "scaffold adapter", "validator adapter"]
  - component: "materialization and scaffold adapters"
    responsibility: "Short-circuit non-delivery writes or render the compact applicable delivery shape."
    touchpoints: ["materialize-work-item.js", "scaffold-workflow.js", "workflow-step-definitions.js"]
  - component: "approval transaction coordinator"
    responsibility: "Preflight, summarize, stage, commit/recover receipts and reconcile derived state."
    touchpoints: ["workflow-gate-review.js", "workflow-trusted-approval-utils.js", "work-item-protocol.js"]
  - component: "governance compatibility reader"
    responsibility: "Dual-read legacy fixed-shape and adaptive applicability while enforcing required evidence."
    touchpoints: ["validate-workflow-governance.js", "workflow-gate-evidence-utils.js", "protocol validator"]
  - component: "privacy-bounded telemetry"
    responsibility: "Record allowlisted categorical/count/bucket metrics; purge expired local data."
    touchpoints: ["workflow-telemetry.js", "materialize/approve/activate/verify/close adapters"]
  - component: "release parity lane"
    responsibility: "Sync canonical runtime, audit pack, test exact candidate tarball and block mismatched harness activation."
    touchpoints: ["runtime sync", "Guardrails workflow", "release candidate smoke", "public docs"]
data_flow:
  - "CLI/request -> normalize -> policy kernel -> immutable normalized routing decision"
  - "workflow_required=false -> display decision/audit result -> zero delivery writes"
  - "workflow_required=true -> materialize/scaffold adapters -> adaptive note/report/protocol shape"
  - "bundle request -> derive applicable gates -> preflight authority/finalization/digests -> one complete human summary"
  - "accepted summary -> stage signed receipt payloads and derived-state files -> journaled commit -> verify -> reconcile"
  - "workflow events -> allowlist mapper -> pseudonymous local telemetry -> retention/purge"
interface_changes:
  - "Materialization output adds request_lane, workflow_required, routing_reasons and escalation_reasons."
  - "Each required role/gate carries stable reason codes; not_applicable produces no action."
  - "A bundle command derives readiness or closeout gates, previews all reviewer/digest/consequence rows and prompts once."
  - "Existing individual gate commands remain supported as fallback."
  - "Telemetry exposes explicit enablement, visible local output and purge behavior; raw slug/request text are absent."
failure_modes:
  - scenario: "Equivalent inputs produce different decisions across adapters."
    impact: "Unsafe downgrade or inconsistent artifact shape."
    guardrail: "Pure kernel, normalized serialization, golden matrix and adapter parity tests."
  - scenario: "Bundle preflight finds stale digest, missing reviewer or unfinalized host."
    impact: "Authority or evidence could be invalid."
    guardrail: "Fail before staging; write zero receipts and zero derived state."
  - scenario: "Write fails after one or more files are staged or committed."
    impact: "Partial approval or contradictory status."
    guardrail: "Per-work-item lock, transaction journal, same-directory temp files, backups and deterministic rollback/recovery."
  - scenario: "Process crashes during bundle commit."
    impact: "Partial files may be visible until recovery."
    guardrail: "Journal state is recovered before any next read/write; recovery rolls back or completes idempotently, then re-verifies all digests."
  - scenario: "Gate-host note changes after sealing."
    impact: "Trusted receipt becomes stale."
    guardrail: "Host note must be receipt-neutral and finalized before staging; post-seal reconciliation never edits hashed host content."
  - scenario: "Adaptive writer runs on an older installed harness."
    impact: "Unreadable artifacts or broken workflow."
    guardrail: "Matching source minor and runtime parity are activation/Release blockers."
  - scenario: "Telemetry records sensitive identifiers or grows indefinitely."
    impact: "Privacy leak and unmanaged local data."
    guardrail: "Strict allowlist, per-install pseudonymous identifier, secret canary, 30/90-day retention and purge."
compatibility_impact:
  - "Receipt schema and historical signatures remain unchanged and verifiable."
  - "New readers dual-read legacy fixed-shape and adaptive applicability for at least 3 minor releases or 180 days."
  - "New writer emits adaptive shape only after runtime parity activation; legacy writer remains rollback-capable during the window."
  - "Old runtimes are not promised forward-read; supported harnesses must upgrade before adaptive writes."
  - "approve-ready-bundle remains a compatible alias or fallback until its deprecation window completes."
rollback_impact:
  - "Disable adaptive routing/writer through one activation flag while retaining dual-read."
  - "Fall back to current individual gate commands and fixed-shape writer."
  - "Do not rewrite or delete receipts created before rollback."
  - "Recover any in-progress transaction journal before rollback or upgrade."
  - "Roll back by reviewed batch: kernel/adapters, bundle coordinator, telemetry, then docs/runtime payload."
observability_hooks:
  - "Normalized route preview includes lane, applicable roles/gates and reason codes."
  - "Bundle summary and journal expose transaction id, phase, gate count and categorical outcome without secret data."
  - "Metrics include lane, role/gate/artifact/interaction/override/retry counts and bucketed ready/done duration."
  - "Runtime parity check reports source, candidate and installed harness versions."
  - "Release smoke verifies exact tarball digest and Codex/Claude global/project install matrix."
constraints_applied:
  - "AI proposes, human approves; no authority inference."
  - "Hard trigger precedence cannot be overridden by a normal preset."
  - "No database, remote service, remote telemetry or signer-session caching."
  - "No changes to immutable v2.6.1 tag/artifact."
  - "Preserve unrelated CHANGE-005 and diagram-design-adapter WIP."
validation_plan:
  - "TDD RED/GREEN for routing, hard escalation, not_applicable and bundle atomicity behavior."
  - "At least 20 repeated evaluations per golden input for deterministic decisions."
  - "Failure injection at every transaction boundary plus crash recovery/idempotency."
  - "Legacy/adaptive artifact and trusted receipt matrix."
  - "Approval-state reconciliation across note, report, protocol, blockers and actions."
  - "Telemetry disabled no-op, allowlist, pseudonym, retention, purge and secret-canary tests."
  - "Full unit, validators, pack audit, authoring smoke, runtime parity and exact-candidate install smoke."
specialized_followups:
  - skill: "deployment-devops"
    reason: "Runtime parity, activation, rollback and release readiness span source, candidate and installed harnesses."
  - skill: "ci-cd-release"
    reason: "Guardrails, immutable candidate artifact, tag and promotion controls must be locked."
notes_for_next_step: >-
  S06 should preserve T0-T9 but refine owned paths around the policy kernel and approval transaction
  coordinator, with TDD and independent two-tier review checkpoints. Approach receipt is still required.
```

## Architecture Details
```yaml
domain_boundaries:
  - name: "Decision policy"
    owns: ["lane classification", "hard escalation", "role/gate applicability", "stable reason codes"]
    must_not_own: ["filesystem writes", "receipt signing", "CLI prompting"]
  - name: "Delivery adapters"
    owns: ["materialize/scaffold rendering", "legacy/adaptive reading", "protocol projection"]
    must_not_own: ["duplicate policy decisions"]
  - name: "Approval transaction"
    owns: ["preflight", "summary", "staging", "journal", "commit/recovery", "state reconciliation"]
    must_not_own: ["human authority policy", "signer-session caching"]
  - name: "Telemetry"
    owns: ["allowlist mapping", "pseudonymization", "retention", "purge", "aggregate report"]
    must_not_own: ["raw request/slug persistence", "remote export"]
integration_points:
  - "wfc materialize -> policy kernel"
  - "scaffold/validator/protocol -> normalized applicability decision"
  - "wfc gate bundle -> transaction coordinator -> existing signer"
  - "workflow lifecycle commands -> telemetry recorder"
  - "runtime sync and Guardrails -> release candidate"
data_or_runtime_notes:
  - "Decision objects are immutable JSON-compatible values with stable ordering before comparison."
  - "Transaction journals live under the external trusted-approval project namespace, not in the repo."
  - "Gate host artifacts are finalized and receipt-neutral before hashing."
  - "Derived repo-state files are staged and reconciled without editing signed host artifacts."
  - "No database migration or historical backfill is introduced."
```

### Deployment Overview
```yaml
deployment_scope: "Workflow-bundle source, release candidate and installed Codex/Claude runtime parity; no application container/runtime deployment."
devops_objectives:
  - "Promote the same verified package artifact from candidate smoke to release."
  - "Block adaptive writes until every supported harness matches the source minor."
  - "Keep legacy writer and dual-read as rollback controls."
environment_matrix:
  - environment: local
    concerns: ["TDD", "validators", "fixture isolation", "UTF-8", "unrelated WIP preservation"]
    runtime_target: "Node.js 18/22 source checkout"
  - environment: dev
    concerns: ["Pull-request Guardrails", "unit/regression", "pack audit", "runtime parity"]
    runtime_target: "GitHub Actions candidate from source commit"
  - environment: uat
    concerns: ["Exact npm pack tarball", "SHA-256", "Codex/Claude global/project install/update smoke"]
    runtime_target: "Isolated candidate installation matrix"
  - environment: prod
    concerns: ["Immutable version/tag", "release receipts", "matching installed runtime", "rollback evidence"]
    runtime_target: "Published workflow-bundle and supported installed harnesses"
specialized_followups:
  - skill: "ci-cd-release"
    reason: "Artifact, tag, promotion and approval controls are in scope."
    outputs_expected: ["required checks", "immutable candidate digest", "release/rollback gates"]
cross_cutting_guards:
  - "One candidate artifact is tested and promoted; no environment-specific rebuild."
  - "Adaptive writer activation is disabled on version skew or parity failure."
  - "DevOps/QC Release and QC DoD remain human-controlled."
evidence_or_gaps:
  - "Gap: installed Codex runtime 2.3.2 differs from source 2.6.1."
  - "Gap: CR-008 behavior and rollback fixtures do not exist yet."
release_recommendation: BLOCKED
notes_for_implementation_or_release: "Resolve parity and all AG-01..AG-13 evidence before Release review."
```

### CI/CD Release Design
```yaml
pipeline_scope: "Workflow Guardrails plus exact workflow-bundle candidate packaging, install smoke and immutable release promotion."
source_strategy:
  branch_model: "Dedicated CR-008 worktree/branch -> reviewed pull request -> main -> immutable release tag"
  triggers: ["pull_request", "push to main", "manual release candidate invocation"]
build_and_verify:
  stages:
    - "workflow fixtures and artifact validators"
    - "SDD/change/execution/planning/protocol validators"
    - "unit and regression suite on Node 18 and 22"
    - "pack audit, source install/update smoke and runtime parity"
    - "exact npm tarball digest and install matrix smoke"
  cache_strategy: ["Use standard Node/npm cache only; do not cache trusted approval secrets or telemetry payloads."]
  required_checks: ["All Workflow Guardrails jobs", "UTF-8", "security/static scan", "rollback smoke"]
artifact_flow:
  registry: "GitHub release plus the existing workflow-bundle distribution path"
  artifact_types: ["npm pack tarball", "SHA-256 digest", "runtime manifest", "release notes"]
  tagging_strategy: ["Exact semantic version", "immutable git tag", "no latest as source of truth"]
  provenance_controls: ["Source commit", "candidate SHA-256", "package version", "runtime parity result"]
promotion_flow:
  - from: local
    to: dev
    conditions: ["TDD and targeted validators pass", "two-tier review evidence present"]
    automation_level: "Automatic on pull request"
  - from: dev
    to: uat
    conditions: ["All Guardrails pass", "exact candidate tarball created once"]
    automation_level: "Automated build; controlled candidate invocation"
  - from: uat
    to: prod
    conditions: ["Exact artifact smoke passes", "runtime parity passes", "QC DoD and DevOps/QC Release approvals"]
    automation_level: "Human-controlled promotion"
approval_controls:
  - "Developer Approach and Task Plan before implementation"
  - "QC Technical Verification and DoD before release"
  - "DevOps/QC Release approval before publication"
  - "PO Business Acceptance for the approved product outcome"
release_controls:
  pre_release: ["No stale receipt", "No uncommitted delivery", "No version skew", "Rollback rehearsal passes"]
  post_release: ["Install/update smoke", "Route/bundle canary", "Telemetry privacy check", "No contradictory pending state"]
rollback_controls:
  - "Disable adaptive writer and retain dual-read."
  - "Reinstall previous immutable package version."
  - "Retain all historical trusted receipts."
pipeline_risks:
  - "A candidate rebuilt after UAT would break artifact provenance."
  - "Hard-coded release fixture version must be updated consistently at release time."
pipeline_recommendation: BLOCKED
notes_for_implementation_or_ops: "Pipeline becomes READY only after CR-008 tests, parity, exact-artifact smoke and human closeout receipts pass."
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "packages/workflow-bundle/bin/wfc.js"
  - "materialize-work-item.js and request analysis"
  - "scaffold-workflow.js and workflow-step-definitions.js"
  - "validate-workflow-governance.js and workflow-gate-evidence-utils.js"
  - "workflow-gate-review.js, workflow-trusted-approval-utils.js and work-item-protocol.js"
  - "workflow-telemetry.js and lifecycle call sites"
  - "policy/router/workflow docs and Codex/Claude runtime payloads"
  - "Workflow Guardrails and release candidate tests"
compatibility_risks:
  - "Legacy notes omit adaptive decision/applicability fields."
  - "Existing approve-ready-bundle assumes a fixed gate set and sequential writes."
  - "Existing receipt consumers expect per-gate schema v1 files."
  - "Old installed runtimes cannot forward-read the adaptive writer output."
  - "Changing a signed host note during reconciliation invalidates its receipt."
migration_notes:
  - "Dual-read legacy and adaptive shapes; no bulk rewrite or receipt re-signing."
  - "Canonical adaptive writes begin only after source/installed minor parity."
  - "Ship deprecation warning for at least one minor before legacy writer removal."
  - "Retain the compatibility window for 3 minor releases or 180 days, whichever is longer."
rollback_notes:
  - "Feature/activation flag restores fixed-shape routing and individual approval commands."
  - "Transaction recovery runs before any downgrade/reinstall."
  - "Dual-read remains enabled after rollback."
  - "No historical receipt or immutable v2.6.1 artifact is changed."
```

## Spec Change
```yaml
status: NOT_REQUIRED
detected_in_step: "s05"
current_spec_refs:
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
reason: "Recommended design implements the approved contract without changing business or acceptance semantics."
updated_artifacts: []
required_followups: []
```

## SDD Traceability
```yaml
requirement_refs: ["BR-AG-001", "BR-AG-002", "BR-AG-003", "BR-AG-004", "BR-AG-005", "BR-AG-006", "REQ-AG-001", "REQ-AG-002", "REQ-AG-003", "REQ-AG-004", "REQ-AG-005", "REQ-AG-006", "REQ-AG-007", "REQ-AG-008", "REQ-AG-009", "REQ-AG-010", "REQ-AG-011"]
acceptance_refs: ["AG-01", "AG-02", "AG-03", "AG-04", "AG-05", "AG-06", "AG-07", "AG-08", "AG-09", "AG-10", "AG-11", "AG-12", "AG-13"]
task_refs: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"]
test_refs: ["golden-routing-matrix", "adapter-parity", "unsafe-downgrade", "atomic-bundle-failure-injection", "crash-recovery", "approval-state-reconciliation", "legacy-adaptive-compatibility", "telemetry-privacy-retention", "runtime-parity-rollback"]
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - check: "Smallest correct brownfield delta"
    status: PASS
    evidence: "Keeps Node/CommonJS, CLI, signer, receipt schema and filesystem runtime; rejects policy-engine expansion."
  - check: "Human authority is unchanged"
    status: PASS
    evidence: "Applicability and interaction change, but each required gate retains its authorized reviewer and independent receipt."
  - check: "Compatibility and rollback are explicit"
    status: PASS
    evidence: "Dual-read window, activation flag, legacy writer, transaction recovery and immutable receipts are specified."
  - check: "Privacy is enforced by design"
    status: PASS
    evidence: "Allowlist-only local telemetry, pseudonymous identifier, retention and purge are mandatory."
  - check: "Release is not prematurely opened"
    status: PASS
    evidence: "Runtime mismatch and missing implementation evidence keep deployment and pipeline recommendations BLOCKED."
blocking_items:
  - "Developer Approach trusted receipt"
  - "Developer Task Plan review and trusted receipt after s06 is aligned"
owner: "developer"
next_action: "Seal the Developer-approved Approach receipt; no implementation before Approach and Task Plan receipts pass."
```

## Human Gate Decision
```yaml
gate: "approach"
status: "APPROVED_PENDING_RECEIPT"
reviewed_by: ["developer"]
reviewed_at: "2026-08-28T14:50:08Z"
decision_source: "User explicitly approved Approach with role Developer."
decision_scope: "Option B and the technical boundaries recorded in this finalized s05 artifact."
```

## Audit
```yaml
step: "s05 Technical Approach authoring"
status: PASS
checks:
  - criterion: "Option analysis compares viable directions"
    result: PASS
    evidence: "Three options are compared; Option B is recommended and A/C are rejected with current-scope reasons."
  - criterion: "Design is sufficient for task planning"
    result: PASS
    evidence: "Components, flows, interfaces, failure modes, compatibility, rollback, observability and release controls are locked."
  - criterion: "No spec or foundation drift"
    result: PASS
    evidence: "No new stack/platform and no change to approved BR/REQ/AG semantics."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
gaps:
  - "Developer review is complete; the trusted Approach receipt is not sealed yet."
risk_level: HIGH
next_action: "Seal and verify the trusted Approach receipt, then align s06 to this approved design."
```

## Traceability
```yaml
upstream:
  - "adaptive-governance-human-approval-ux.s04.acceptance-criteria.md"
  - "changes/CR-008/design.md"
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
outputs:
  - "Option B policy-kernel-plus-adapters recommendation"
  - "Approval transaction and recovery boundary"
  - "Telemetry privacy/retention boundary"
  - "Runtime parity and release control boundary"
next_step: "Seal the Approach receipt; then align s06 Task Plan to the approved design."
```

## Handoff
- Recommended option: pure policy kernel + existing-runtime adapters + approval transaction coordinator.
- Trade-off chấp nhận: thêm hai internal modules có trách nhiệm hẹp để tránh duplicated policy và partial-state logic.
- Điều kiện sang step 6: seal và verify Approach receipt; s06 chỉ được finalize sau khi trace đúng boundary này.
- Deployment note: release vẫn BLOCKED đến khi Node 18/22 checks, exact candidate smoke và source/installed runtime parity đều PASS.
