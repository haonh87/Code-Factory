---
artifact_id: "code-factory-holistic-audit-remediation.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "code-factory-holistic-audit-remediation"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: RESEARCH
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
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["ba", "developer", "qc", "devops"]
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
  release: "not_applicable"
  business_acceptance: "not_applicable"
  dod: "required"
role_signoffs:
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: []
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-09-11T13:51:45Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["ba", "qc"]
  dor_reviewed_at: "2026-09-11T13:51:45Z"
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
  - "system-design"
  - "brainstorming"
  - "ci-cd-release"
  - "step-goal-contract"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "code-factory-holistic-audit-remediation.s04.acceptance-criteria.md"
linked_artifacts:
  - "../../docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
  - "code-factory-holistic-audit-remediation.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> BA Spec and QC DoR receipts both verify against s04 SHA-256
> 41078181e9b0e8186c900b8d1908ca9f52820d6b763b37467681325edc389f29.
> The recommended approach is an evidence-led portfolio coordinator, not a pack-wide rewrite:
> freeze approved snapshots, record live coverage/disposition in supporting audit artifacts, reuse
> existing remediation children, and propose only missing bounded children. Each child retains its
> own gates. Source, unmerged branch, hosted candidate, release, and installed runtime are separate
> evidence tiers until reconciled. Developer Approach approval is pending.

## Step Contract

```yaml
step: "s05 Technical Approach"
goal: "Lock a complete but bounded audit/remediation coordination design for AC-CF-001..011."
value: "Make the whole Code-Factory goal visible and executable without replacing child governance with a mega-item."
scope_in:
  - "Repository-visible inventory, semantic coverage, finding disposition, and evidence provenance"
  - "Selective document promotion, classify-first legacy policy, BA language rubric"
  - "Existing-child reuse and missing-child proposals with exact boundaries"
  - "Current/historical and branch/main/runtime/release identity separation"
scope_out:
  - "Production changes, CI parallelisation, architecture restructure, or bulk skill rewrites in the master"
  - "Retrospective receipts or inherited child approval"
  - "Deletion of untracked/ignored user material"
  - "Release, tag, publish, global install, or branch finalization"
done_when:
  - "All audit surfaces and eleven criteria map to evidence artifacts and independent child lanes"
  - "Every original finding has one owner, disposition, next gate, and verification direction"
  - "Approved snapshots remain digest-stable while current progress can advance"
  - "No mechanical PASS or unmerged child DONE is reported as final portfolio closure"
constraints:
  hard: ["One authority per claim", "No invented external findings", "No child gate inheritance", "No destructive cleanup", "No release/runtime identity conflation"]
  prohibited: ["Bulk-fix in the research master", "Edit finalized s04 after receipt", "Use candidate version as released version", "Mint legacy approval provenance"]
```

## Input Readiness

```yaml
step: "s05 Technical Approach"
status: READY
available_inputs:
  - "Spec receipt BA 2026-09-11T14:33:43.972Z, digest_match=true"
  - "DoR receipt QC 2026-09-11T14:33:56.365Z, digest_match=true"
  - "s04 AC-CF-001..011, approved OQ-CF-001..005 Option C, and clean-main baseline"
  - "Tracked portfolio CF-001..020 and prior-plan disposition"
missing_inputs: []
audit_gaps_to_resolve_during_execution:
  - "Independent R-02/R-04/R-06 were not materialized; recover their original evidence or freshly audit, never invent their substance."
  - "Independent R-01/R-03 claims require live effective-skill-resolution and ownership evidence; no deletion/restructure authority is inferred."
invalid_inputs:
  - "Untracked main WIP and unmerged CR-008 files are overlays, not clean-main baseline."
  - "Candidate v2.6.2 is not proof of released/installed v2.6.2."
next_action: "Developer reviews the master Approach before s06 authoring."
```

## Option Analysis

```yaml
goal: "Close audit blind spots and coordinate bounded remediation with truthful evidence."
ba_lane:
  business_goal: "Users see one clear path, applicable-role interaction, natural language, and trustworthy status."
  user_scenarios: ["Find current authority", "Understand why a gate applies", "See what is complete versus blocked", "Use the verified runtime rather than an unmerged candidate"]
  business_rules: ["Human authority stays explicit", "Current and historical material are distinct", "Semantic quality cannot be inferred from encoding or mechanical checks"]
  scope_notes: ["Master coordinates and audits; independently approved children change behavior."]
  open_questions: []
dev_lane:
  repo_constraints: ["42 source skills in approved snapshot", "Source/runtime/install/origin divergence", "Existing CR-008 and CI child ownership", "Ignored prior plans and user WIP"]
  technical_risks: ["Mega-fix collision", "Stale digests", "Source-only audit misses effective runtime overrides", "Subjective language ceremony"]
  integration_points: ["workflow tools", "source skill catalog", "effective runtime resolution", "child reports/receipts", "hosted/candidate/release evidence"]
  nfr_notes: ["100% inventory coverage", "20/20 original finding dispositions", "0 inherited child gates", "0 unexplained lifecycle contradiction"]
  baseline_context: "Brownfield pack and CLI bundle; use existing tools and records."
options:
  - { name: "Option A - Evidence-led portfolio plus bounded children", summary: "Reuse current validators and child lanes; create audit sidecars and propose only missing children.", pros: ["Smallest complete scope", "Preserves ownership/gates", "Incremental verification"], cons: ["Several independent closure dependencies"], risks: ["Progress can stall if next gate is not made explicit"] }
  - { name: "Option B - One monolithic workflow/skill rewrite", summary: "Repair all policy, runtime, CI, language, and lifecycle surfaces in the master.", pros: ["One branch"], cons: ["Violates master non-goal", "Large conflict and review blast radius"], risks: ["Hidden gate bypass and regressions"] }
  - { name: "Option C - New external policy/evaluation platform", summary: "Replace local validation and governance with a new DSL/platform.", pros: ["Potential automation"], cons: ["New schema, dependencies, migration, and operations"], risks: ["Exceeds current requirements"] }
recommended_option: "Option A - Evidence-led portfolio plus bounded children"
recommendation_reason: "Approved criteria require coverage and truth, not a new platform or a monolithic rewrite; current tools and independently owned children suffice."
validation_plan: ["Recount clean tracked source", "Audit effective resolution overlays", "Cross-check receipts/digests", "Fail semantic conflicts explicitly", "Apply language rubric and final coverage matrix"]
notes_for_next_step: "READY for system design and then s06 after human Approach approval."
```

## Foundation Decision

```yaml
status: NOT_APPLICABLE
reason: "The existing filesystem-backed audit/workflow/receipt and package distribution architecture is retained."
```

## Main Artifact

```yaml
design_problem: "Fragmented artifacts and mechanical-only checks hide semantic, ownership, lifecycle, language, and runtime/release contradictions."
business_rule_trace:
  - "AC-CF-001/002/003 -> inventory + coverage + finding/child contract"
  - "AC-CF-004 -> independent child subjects and trusted receipts"
  - "AC-CF-005/009 -> source/branch/candidate/release/install evidence tiers"
  - "AC-CF-006/010 -> conflict-specific RED/GREEN in standard validation paths"
  - "AC-CF-007/011 -> BA rubric and CURRENT/HISTORICAL classification"
  - "AC-CF-008 -> classify-first legacy truth without retrospective receipts"
design_options:
  - { name: "Evidence-led coordinator", summary: "Recommended existing-tool solution." }
  - { name: "Monolithic rewrite", summary: "Rejected scope/ownership expansion." }
  - { name: "External platform", summary: "Rejected unnecessary architecture." }
rejected_options:
  - { name: "Monolithic rewrite", reason: "Conflicts with independent children and the approved research boundary." }
  - { name: "External platform", reason: "No acceptance criterion requires a new engine, service, or DSL." }
recommended_design: >-
  Keep the master plan and finalized host notes as approved digest-bound snapshots. Author current
  supporting audit artifacts for inventory, coverage, finding/child disposition, legacy/document
  classification, and language review. Each claim carries its source tier, full identity, timestamp,
  owner, and direct evidence. Reuse existing RCR, node24, SA/TA, diagram, and test-decoupling children
  where their owned scope matches; propose missing security/semantic-audit/language/lifecycle children
  separately. Child source changes require their own spec/design/plan/TDD/review/verify gates.
recommendation_reason: "It separates frozen authority from changing progress and prevents portfolio approval from becoming implicit implementation approval."
component_changes:
  - { component: "master workflow notes/report", change: "Current routing and verified gate evidence only." }
  - { component: "supporting audit artifacts", change: "Inventory, coverage, findings/children, legacy/document and language evidence; no production code." }
  - { component: "existing child work items", change: "Read-only evidence reuse and next-gate proposals; no master-owned implementation." }
  - { component: "missing child proposals", change: "Concrete finding IDs, owned paths, risk/applicability, verify path, and approval boundary." }
data_flow:
  - "Clean tracked commit -> source inventory + mechanical results"
  - "Ignored/untracked/installed/effective-resolution overlays -> separately attributed observations"
  - "Observations + prior plans -> semantic coverage and single finding disposition"
  - "Open finding -> existing child reuse OR bounded child proposal -> independent human gates"
  - "Child review/verify -> branch evidence -> integrated/hosted/released/installed evidence tiers"
  - "Complete coverage and direct terminal dispositions -> QC portfolio DoD review"
interface_changes: ["No public/runtime/receipt/CLI interface change in this master."]
failure_modes:
  - { scenario: "Audit counts only skills/**.", impact: "Runtime override/collision is missed.", guardrail: "Record effective harness discovery paths and override precedence separately." }
  - { scenario: "Approved plan is edited after spec seal.", impact: "Baseline digests drift.", guardrail: "Freeze approved snapshots; progress goes to current report/sidecars." }
  - { scenario: "Child DONE on branch is claimed as main/runtime closure.", impact: "False completion.", guardrail: "Source-tier labels and explicit integration/install checks." }
  - { scenario: "Legacy prose is treated as approval.", impact: "False provenance.", guardrail: "Classify-first policy; zero retrospective receipt." }
  - { scenario: "Average language score hides wrong authority/action.", impact: "User friction and unsafe instruction.", guardrail: "Binary critical check before numeric score." }
  - { scenario: "Missing independent review is filled from inference.", impact: "Invented issue scope.", guardrail: "Recover original evidence or freshly audit under a new finding ID." }
  - { scenario: "Deadline CI work waits on structural CR-008.", impact: "Urgent work is coupled.", guardrail: "Owner-approved node24 lane remains token-only and independently cherry-pickable; contingency is explicit, not auto-executed." }
compatibility_impact:
  - "Existing source/runtime semantics do not change during master audit authoring."
  - "Legacy/historical materials remain read-only until separately governed."
  - "No duplicate child for the already completed branch-level SA/TA fix."
  - "R-03 restructure/CI parallelisation remain excluded until ownership transfer after CR-008 integration."
rollback_impact:
  - "Audit artifact changes are recoverable in git; no delete/install/publish operation is authorized."
  - "Production rollback remains with each child; CR-008 retains immutable v2.6.1 guarded rollback."
observability_hooks:
  - "Coverage rows expose expected/observed result, tier, source digest, owner, child, next gate."
  - "Inventory separates clean source from effective resolution and installed state."
  - "Language evidence records critical failures and five rubric dimensions."
  - "Final matrix reports PASS/PARTIAL/FAIL/NOT_APPLICABLE with direct evidence."
constraints_applied: ["Smallest complete coordination scope", "Independent child gates", "Approved phase sequencing", "No historical rewrite", "No inferred release"]
validation_plan:
  - "Use current wfc naming/governance/protocol/planning/SDD/change/execution checks and pack/unit/smoke paths."
  - "Semantic review all source skills, not only the language sample; recover missing independent review inputs."
  - "Every semantic child supplies fail-first regression and standard-path negative fixture."
  - "Review 100% public entry/action surfaces plus stratified language sample; zero critical failure, average >=4.0, every dimension >=3.0."
  - "Classify every live legacy/prior/current-historical artifact without retrospective receipts."
  - "Reconcile final commit, candidate digest, hosted checks, released version, both installed harnesses, and public docs."
specialized_followups:
  - { skill: "ci-cd-release", reason: "Supporting identity and promotion guards only; actual release remains in independently approved children." }
notes_for_next_step: "s06 plans audit artifacts and child proposals only, exact owned docs paths, review checkpoints, and closure dependencies."
```

## Architecture Details

```yaml
evidence_artifacts_proposed:
  inventory: "docs/audits/code-factory-holistic-inventory.json"
  coverage: "docs/audits/code-factory-holistic-coverage-matrix.md"
  disposition: "docs/audits/code-factory-holistic-finding-disposition.md"
  legacy_and_documents: "docs/audits/code-factory-holistic-legacy-document-classification.md"
  language: "docs/audits/code-factory-holistic-language-review.md"
evidence_tiers: ["clean-main", "unmerged-child", "effective-resolution-overlay", "hosted-candidate", "released", "installed-harness", "historical-input"]
sequencing:
  - "P0: structural closeout child -> branch SA/TA integration disposition -> parent exact-candidate reverify; then diagram and test residuals."
  - "Owner-requested deadline lane: node24 remains independent and token-only; not validator parallelisation."
  - "P1: security, portfolio/legacy truth, semantic audit coverage; reuse CI child evidence."
  - "P2: language/routing relevance and current docs."
  - "P3: memory/metrics/pilot decisions, not automatic productization."
  - "P4: full semantic coverage and integrated/runtime/release closure."
```

```yaml
pipeline_scope: "Read-only evidence coordination for existing CLI package candidate/release lanes."
source_strategy:
  branch_model: "Keep master audit worktree isolated; child branches retain ownership."
  triggers: ["approved child review", "candidate verification", "governed release/activation"]
build_and_verify:
  stages: ["source checks", "build one candidate", "local/extracted payload smoke", "hosted required checks", "QC terminal review", "separately authorized release/install", "post-activation parity"]
  cache_strategy: ["Do not use mutable cached payload as candidate identity."]
  required_checks: ["mechanical + semantic regressions", "unit/smoke", "candidate digest/provenance", "both harness parity", "post-release status/docs"]
artifact_flow:
  registry: "Existing hosted candidate artifacts and separately authorized immutable release distribution"
  artifact_types: ["workflow-bundle .tgz", "checksum", "canonical extracted-content manifest", "source/run provenance"]
  tagging_strategy: ["Immutable approved semantic version/source mapping; no tag creation in this master."]
  provenance_controls: ["full source SHA", "run ID", "full tarball digest", "approved canonical content rule if byte-different"]
promotion_flow: []
approval_controls:
  - "This package has candidate/release/harness activation lanes, not provisioned dev/uat/prod server environments."
  - "Publish/tag/install are blocked until the owning child's applicable receipts and explicit action authority."
release_controls:
  pre_release: ["exact candidate binding", "no failed/skipped required hosted job", "QC DoD", "DevOps/QC Release and PO Business Acceptance when applicable"]
  post_release: ["immutable tag/release/source reconciliation", "Codex/Claude version/skill/file parity", "current docs match actual released state"]
rollback_controls: ["Owning child retains known-good immutable artifact; CR-008 v2.6.1 SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9, with bundled closeout guarded."]
pipeline_risks: ["candidate byte identity drift", "unmerged code promoted as released", "stale installed runtime", "deadline work branch coupling"]
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: "Checks/evidence can be authored; no public mutation or runtime activation is opened by this Approach."
```

## Brownfield Impact Analysis

```yaml
impacted_modules: ["master work-item notes/report", "five proposed docs/audits supporting artifacts"]
read_only_dependencies: ["skills/policies/runtime", "existing child/change reports", "Git/hosted/release/install evidence"]
compatibility_risks: ["Snapshot freshness", "effective-resolution overlays", "unmerged versus integrated claims"]
migration_notes: ["No production/data/legacy migration in the master."]
rollback_notes: ["Preserve user WIP and historical inputs; revert only owned audit changes when needed."]
```

## Governance Exceptions

```yaml
status: NOT_REQUIRED
reason: "Existing child governance is retained and no delivery gate is bypassed."
exceptions: []
```

## Audit

```yaml
step: "s05 Technical Approach"
status: PASS
checks:
  - { criterion: "Complete but bounded", result: PASS, evidence: "Eleven criteria map to audit artifacts and independent child lanes." }
  - { criterion: "Smallest sufficient", result: PASS, evidence: "Existing tools/artifacts reused; no platform or mega-rewrite." }
  - { criterion: "Identity and ownership truth", result: PASS, evidence: "Evidence tiers, frozen snapshots, and independent receipts explicit." }
  - { criterion: "Language/legacy safety", result: PASS, evidence: "Approved Option C policies and measurable rubric retained." }
  - { criterion: "Failure/release concerns", result: PASS, evidence: "Missing review, overrides, stale digests, deadline coupling, rollback, and activation guards covered." }
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
gaps: ["Human Developer Approach decision is pending."]
risk_level: HIGH
next_action: "Developer reviews master Approach; no master/child implementation is open."
```

## Traceability

```yaml
upstream: ["s04 SHA-256 41078181e9b0e8186c900b8d1908ca9f52820d6b763b37467681325edc389f29", "Spec receipt BA 2026-09-11T14:33:43.972Z", "DoR receipt QC 2026-09-11T14:33:56.365Z", "approved master plan and Option C policies"]
outputs: ["evidence-led coordinator", "five audit artifacts", "child reuse/proposals", "frozen/current evidence split", "identity and release guards"]
next_step: "Human Developer Approach decision and matching receipt, then s06"
```

## Handoff

- Master s05 is drafted; Developer approval remains independent.
- Approved s04 and its plan/spec digests remain untouched; current progress belongs to unsealed state and sidecars.
- Audit all source skills semantically; language sampling is a separate quality task, not a substitute for semantic coverage.
- Do not duplicate existing children or absorb their production scope.
- No release, tag, install, deletion, architecture restructure, or CI parallelisation is authorized.
