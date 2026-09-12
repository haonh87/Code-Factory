---
artifact_id: "code-factory-holistic-audit-remediation.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "code-factory-holistic-audit-remediation"
step_id: "s06"
step_slug: "task-breakdown"
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
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-09-12T05:44:54Z"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
  - "ci-cd-release"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "code-factory-holistic-audit-remediation.s04.acceptance-criteria.md"
  - "code-factory-holistic-audit-remediation.s05.technical-approach.md"
linked_artifacts:
  - "code-factory-holistic-audit-remediation.work-item-report.json"
  - "../../docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Developer's Approach receipt is APPROVED at 2026-09-12T05:51:55.282Z and matches s05
> SHA-256 10b4015018013eebc9a623c5651148f3b4e648c46717f83b1c401b1df2048f8b.
> M0..M11 turn the portfolio into five audit artifacts, complete source-skill semantic coverage,
> independently governed child handoffs, and final exact-identity verification.
> The proposed six write roots cover audit artifacts only. Task Plan approval, a matching receipt,
> and explicit activation remain required; no child implementation or release action is opened.

## Step Contract

```yaml
step: "s06 Task Plan"
goal: "An executable, path-owned audit plan covers all eleven criteria and twenty original findings without absorbing child production work."
value: "Users can see the whole remediation goal, evidence gaps, next human action, and the difference between branch progress and final closure."
scope_in:
  - "Five audit sidecars and current master workflow/report evidence"
  - "All source skills and every authority/workflow/runtime/tooling/integration/delivery/portfolio surface"
  - "Prior-plan, legacy, document, language, and effective-resolution classification"
  - "Existing-child reuse, missing-child proposals, and direct closure dependencies"
scope_out:
  - "Production code, source skill/policy edits, CI changes, or new evaluation engines"
  - "Editing any child work item or creating its workflow without separate materialization authority"
  - "Editing approved digest-bound plan/s03/s04/s05 or s06 after it is sealed"
  - "Deleting WIP, bulk-unignoring directories, retrospective receipts, publish/tag/install/merge/cleanup"
inputs_required:
  - "s04 AC-CF-001..011 and approved OQ-CF-001..005 Option C policies"
  - "Matching BA Spec, QC DoR, and Developer Approach receipts"
  - "Frozen CF-001..020 plan and live read-only repository/child evidence"
outputs_required:
  - "M0..M11 path map, dependencies, evidence schema, review pairs, and final verify commands"
  - "Six proposed audit-only write roots with explicit protected paths"
done_when:
  - "Every AC and EDGE-CF-001..006 maps to executable tasks and named evidence"
  - "Each task specifies paths, outputs, dependencies, reviewer boundary, and verify method"
  - "Full semantic coverage, language sampling, and mechanical checks are distinct"
  - "Child scope, frozen authority, and final identity guards are explicit"
constraints:
  hard_constraints: ["Audit-only writes", "Independent child authority", "Frozen host digests", "Truthful evidence tiers", "Preserve unknown/user-owned inputs"]
  soft_constraints: ["Reuse existing tools and children", "Sequential work in the existing audit worktree"]
  prohibited_actions: ["Production edits", "Child gate inheritance", "Retrospective provenance", "Destructive cleanup", "Unapproved public mutation"]
  compliance_checks: ["Exact write-path review", "Receipt subject/digest review", "Protected SHA-256 comparison", "Tier and closure matrix", "WIP/original evidence comparison"]
risks:
  - { id: "R-M-01", description: "Unmerged fixes or stale prose are reported as released completion.", likelihood: HIGH, impact: HIGH, severity: HIGH, mitigation: "Separate tiers and require direct terminal evidence.", contingency: "Mark affected rows FAIL/PARTIAL; reopen the owning child.", owner: "qc", status: MONITORING }
  - { id: "R-M-02", description: "Source-only audit misses an effective skill override.", likelihood: HIGH, impact: HIGH, severity: HIGH, mitigation: "Inventory discovery paths, duplicate names, and precedence independently.", contingency: "Route a bounded collision child; never delete unknown material.", owner: "developer/qc", status: MONITORING }
  - { id: "R-M-03", description: "Deadline-bound Node24 work waits for CR-008.", likelihood: MEDIUM, impact: HIGH, severity: HIGH, mitigation: "Expose the independent token-only lane and its missing receipts.", contingency: "Escalate the owner's near-2026-09-20 main contingency for explicit action authority.", owner: "devops", status: MONITORING }
timebox:
  target_duration: "One authoring pass for s06; execution proceeds by reviewable audit batches."
  deadline: ""
  escalation_rule: "CR-008's 2026-09-18 stop-and-reassess checkpoint is not a master delivery promise. Do not cut ACs silently; unresolved dependencies keep closure open."
```

## Input Readiness

```yaml
step: "s06 Task Plan"
status: READY
available_inputs:
  - "s04 SHA-256 41078181e9b0e8186c900b8d1908ca9f52820d6b763b37467681325edc389f29; Spec/DoR digest_match=true"
  - "s05 SHA-256 10b4015018013eebc9a623c5651148f3b4e648c46717f83b1c401b1df2048f8b; Approach digest_match=true"
  - "Approved master-plan SHA-256 e9f84613af3ca7b5788ad3d948f56f5c8650fc7d9fbc463076950435d75b7a8d"
  - "AC-CF-001..011, CF-001..020, and existing ownership/sequencing decisions"
missing_inputs: []
invalid_inputs: []
conflicts: []
assumptions:
  - "Baseline counts are snapshots; every execution/final snapshot is recounted."
  - "R-02/R-04/R-06 substance is an audit-recovery task, not guessed input."
risk_level: HIGH
next_action: "Author the bounded plan; human Developer review and trusted evidence precede activation."
```

## Main Artifact

```yaml
implementation_goal: "Produce evidence-backed audit/disposition artifacts and independent remediation handoffs; close the portfolio only after direct child/integration/release/runtime evidence."
ba_lane:
  acceptance_coverage:
    - { ac: "AC-CF-001", tasks: ["M1", "M2", "M10", "M11"], evidence: "inventory + full semantic coverage" }
    - { ac: "AC-CF-002", tasks: ["M3", "M4", "M9", "M11"], evidence: "one authority and disposition per input/finding" }
    - { ac: "AC-CF-003", tasks: ["M4", "M5", "M6", "M8", "M9"], evidence: "owned child/proposal + next gate + closure contract" }
    - { ac: "AC-CF-004", tasks: ["M0", "M4", "M5", "M9", "M11"], evidence: "independent subjects/receipts and zero inherited approvals" }
    - { ac: "AC-CF-005", tasks: ["M5", "M10", "M11"], evidence: "source/hosted/released/installed identity reconciliation" }
    - { ac: "AC-CF-006", tasks: ["M2", "M6", "M9", "M11"], evidence: "semantic-child RED/GREEN + standard-path negative regression" }
    - { ac: "AC-CF-007", tasks: ["M7", "M9", "M11"], evidence: "BA rubric + mandatory surfaces + stratified sample" }
    - { ac: "AC-CF-008", tasks: ["M3", "M4", "M9", "M11"], evidence: "legacy/lifecycle classifications without retrospective receipts" }
    - { ac: "AC-CF-009", tasks: ["M5", "M10", "M11"], evidence: "repeated clean package/content/provenance comparison" }
    - { ac: "AC-CF-010", tasks: ["M2", "M5", "M9", "M11"], evidence: "applicability fixtures across operative policy/runtime copies" }
    - { ac: "AC-CF-011", tasks: ["M3", "M7", "M10", "M11"], evidence: "CURRENT/HISTORICAL register + released docs parity" }
  scope_guards:
    - "Master results never grant a child gate or write path."
    - "Unknown input and historical claims remain exact; missing evidence is a gap, not PASS."
    - "Review production fixes only through their independently approved children."
    - "P0 -> P1 -> P2 -> P3 -> P4 remains the remediation order; read-only evidence collection may proceed without closing an earlier phase."
  human_review_points:
    - "Developer Task Plan; matching receipt and explicit activation"
    - "CF-MB1: QC Spec Compliance, then Developer/QC Code Quality"
    - "CF-MB2: QC Spec Compliance with applicable BA language evidence, then Developer/QC Code Quality"
    - "Each missing child/materialization, optional decision, or destructive/publish/install action remains separately human-controlled"
    - "QC explicit s08 opening, Technical Verification and DoD"
dev_lane:
  path_map:
    - { path: "work-items/code-factory-holistic-audit-remediation", role: "Current s01/report + M0/M9/M11 s07/s08 evidence; frozen hosts protected." }
    - { path: "docs/audits/code-factory-holistic-inventory.json", role: "M1 inventory, source snapshots, evidence tiers and resolution overlays." }
    - { path: "docs/audits/code-factory-holistic-coverage-matrix.md", role: "M2/M9/M10/M11 full semantic and AC/edge coverage." }
    - { path: "docs/audits/code-factory-holistic-finding-disposition.md", role: "M4/M5/M6/M8/M9/M11 findings, child proposals, dependencies and closure." }
    - { path: "docs/audits/code-factory-holistic-legacy-document-classification.md", role: "M3 authority/legacy/CURRENT/HISTORICAL classification." }
    - { path: "docs/audits/code-factory-holistic-language-review.md", role: "M7 mandatory-surface and stratified EN/VI review." }
  technical_sequence: ["M0", "M1", "M2", "M3", "M4", "CF-MB1", "M5", "M6", "M7", "M8", "M9", "CF-MB2", "M10", "M11"]
  tdd_targets:
    - "NOT_APPLICABLE to master documentation/research output; no production behavior is changed."
    - "Every semantic/behavior child must supply its own expected RED before GREEN; M2/M6/M9 collect, not fabricate, that evidence."
task_breakdown:
  - id: "M0"
    owner_role: "developer"
    name: "Verify admission and freeze audit identities"
    objective: "Open only the approved master audit scope and preserve all existing authority/WIP."
    paths_in_scope: ["work-items/code-factory-holistic-audit-remediation"]
    dependencies: ["Human Task Plan decision", "matching receipt", "explicit activation with six approved roots"]
    outputs_expected: ["s07 Delivery Rule Evidence", "protected plan/s03/s04/s05/s06 digests", "initial source/branch/WIP snapshot", "master-only capability scope"]
    review_checkpoint: "No audit-artifact production before activation; no main commit or child mutation."
    verification_hint: "wfc gate status for Spec/DoR/Approach/Task Plan; compare host digests; git status/diff and capability paths; record docs-only TDD exemption and existing worktree."
  - id: "M1"
    owner_role: "developer"
    name: "Inventory clean source and effective-resolution overlays"
    objective: "Enumerate every skill and all eight audit-surface families without mixing tracked source and local overrides."
    paths_in_scope: ["docs/audits/code-factory-holistic-inventory.json", "work-items/code-factory-holistic-audit-remediation"]
    dependencies: ["M0"]
    outputs_expected:
      - "Unique skill rows with path/name/group/digest and every named surface row"
      - "Full source SHA, timestamp, observed count, manifests, installed Codex/Claude version/inventory"
      - "Ignored/untracked/installed discovery paths and duplicate-name/precedence observations separately tiered"
      - "architecture-modeling canonical bundled source versus reported 18KB overlay evidence; unknown material preserved"
    review_checkpoint: "Counts come from tracked snapshot; overlay evidence cannot replace canonical counts or authorize deletion."
    verification_hint: "git ls-tree -r on pinned source; rg --files -g SKILL.md; git status --ignored; read manifests and wfc status --mode codex/claude. JSON.parse and assert unique paths/names, full SHA-256, no blank surface rows."
  - id: "M2"
    owner_role: "developer"
    name: "Audit every source skill and cross-boundary semantic contract"
    objective: "Review trigger, boundary, input/output/schema, references/examples, authority, role relevance, and runtime discovery for 100% of skills."
    paths_in_scope: ["docs/audits/code-factory-holistic-coverage-matrix.md", "docs/audits/code-factory-holistic-inventory.json"]
    dependencies: ["M1"]
    outputs_expected:
      - "One semantic row per inventoried skill, with evidence for all named contract dimensions"
      - "Authority/router/backbone/gate/report/validator/runtime/adapter/hook/MCP/CI and portfolio contract rows"
      - "Mechanical results separated from manual semantic PASS/PARTIAL/FAIL"
      - "Known semantic regression links and missing standard-path coverage, including CF-009/010/019"
    review_checkpoint: "No source skill/policy or production test edit; a green pack audit never clears a semantic conflict."
    verification_hint: "Read every canonical SKILL.md and its relevant schemas/operative references; compare source/runtime manifests. Run existing pack audit and architecture-role-skills-contract.test.js read-only. Match coverage paths to M1 inventory; zero unreviewed skill."
  - id: "M3"
    owner_role: "ba"
    name: "Classify prior authority, legacy lifecycle and public documents"
    objective: "Give every prior input and work-item state one direct-evidence classification without rewriting history."
    paths_in_scope: ["docs/audits/code-factory-holistic-legacy-document-classification.md"]
    dependencies: ["M1"]
    outputs_expected:
      - "Prior inputs: exactly one CURRENT/SUPERSEDED/RETIRED/HISTORICAL_INPUT or governed finding verdict; CURRENT authority must be tracked/resolvable"
      - "Legacy entries: LEGACY_CLOSED/actionable/ambiguous/empty-invalid with evidence and owner"
      - "Managed lifecycle contradictions linked to notes/reports/receipts/Git; no inference from completion-like prose"
      - "CURRENT/HISTORICAL public-document allowlist and replacement/navigation proposals, not source edits"
    review_checkpoint: "Selective promotion/labeling/retirement remains a child proposal; zero retrospective receipt or destructive cleanup."
    verification_hint: "Compare pinned tracked trees, git check-ignore results, work-item list/protocol, host notes and receipt subjects/digests. Recount legacy entries; reject duplicate CURRENT authority and unexplained skips."
  - id: "M4"
    owner_role: "developer"
    name: "Reconcile twenty findings and recover independent-review gaps"
    objective: "Create one truthful disposition and executable closure contract per original or newly evidenced finding."
    paths_in_scope: ["docs/audits/code-factory-holistic-finding-disposition.md", "docs/audits/code-factory-holistic-coverage-matrix.md"]
    dependencies: ["M2", "M3"]
    outputs_expected:
      - "CF-001..020 each has severity/owner/tier/disposition/dependency/child-or-proposal/next gate/verify path/closure evidence"
      - "Historical resolved rows rechecked; reopen on contradictory current evidence"
      - "R-01 and R-03 claims revalidated; R-03 ownership/restructure stays deferred"
      - "Recover original R-02/R-04/R-06 if available; otherwise record unavailable inputs and fresh findings under new IDs, never guessed R-* verdicts"
      - "CF-MB1 artifact/digest-bound Spec Compliance recommendation, then separately opened Code Quality recommendation"
    review_checkpoint: "QC approves CF-MB1 Spec Compliance before Developer/QC Code Quality; M5 waits for the pair."
    verification_hint: "Compare original twenty IDs exactly; zero duplicate/blank disposition or ownerless open row. Cross-check every terminal claim against direct evidence; inventory and source digests match M1/M2/M3."
  - id: "M5"
    owner_role: "developer"
    name: "Reuse P0 and deadline-bound child lanes"
    objective: "Expose the exact next boundary for existing RCR, SA/TA, parent CR-008, diagram and test residual work."
    paths_in_scope: ["docs/audits/code-factory-holistic-finding-disposition.md", "docs/audits/code-factory-holistic-coverage-matrix.md"]
    dependencies: ["CF-MB1 Spec Compliance PASS", "CF-MB1 Code Quality PASS"]
    outputs_expected:
      - "RCR structural child -> already completed branch-level SA/TA integration disposition -> parent AG-01..13 exact-candidate reverify -> diagram/test residual dependencies"
      - "Existing align-adaptive-sa-ta-applicability reused; no duplicate child or claim that unmerged DONE is main/runtime closure"
      - "Node24 independent next gate, 18-token-only commit contract and owner contingency"
      - "Diagram completed prerequisites/environment preflight/alternative approval and test two-tree residual next actions"
    review_checkpoint: "Read-only child evidence; no report normalization, child resume, hosted trigger, merge, or source edit from master authority."
    verification_hint: "Read each existing child report/s04-s08/receipts and branch source. Record current gate/digest and named blocker; confirm nine action references per action on CR-008 before Node24 implementation in its own lane."
  - id: "M6"
    owner_role: "developer"
    name: "Propose only missing P1 and P2 remediation children"
    objective: "Route security, semantic-audit, lifecycle/promotion and language/docs fixes into bounded independent subjects."
    paths_in_scope: ["docs/audits/code-factory-holistic-finding-disposition.md"]
    dependencies: ["M4", "M5"]
    outputs_expected:
      - "Proposal rows with upstream finding/AC, exact owned paths, risk/applicability reason codes, review order, verify path and rollback"
      - "Security scanner/provenance/ephemeral-run proposal; no external scanner execution or auto-fix in the master"
      - "CF-010 standard-path semantic regression proposal and fail-first negative fixture requirement"
      - "Classify-first legacy, selective document promotion, language and CURRENT-doc corrections with separate authority"
      - "Reuse ci-guardrails-parallelisation evidence; never absorb validator matrix or R-03 restructure scope"
    review_checkpoint: "Proposals live in this sidecar only. Human materialization and each child's independent gates precede creating/editing child artifacts."
    verification_hint: "Manual/schema review checks disjoint owned paths, no duplicate existing child, stable role/gate reasons, named verifier, measurable closure evidence, and expected RED/GREEN for behavior."
  - id: "M7"
    owner_role: "ba"
    name: "Run mandatory-surface and stratified language review"
    objective: "Measure naturalness and action/authority clarity independently of UTF-8 and mechanical validation."
    paths_in_scope: ["docs/audits/code-factory-holistic-language-review.md", "docs/audits/code-factory-holistic-coverage-matrix.md"]
    dependencies: ["M1", "M2", "M3"]
    outputs_expected:
      - "Mandatory surface allowlist: root README/docs map, EN/VI quickstart/onboarding/positioning, router/backbone/human gate instructions, user-facing CLI help/approval/error/status messages"
      - "100% mandatory surface review; each skill group sampled separately for detailed EN/VI prose/reference quality"
      - "Sample per group: min(group size, max(2, ceil(group size/4))), sorted path selection plus every newly found high-risk wording surface; approved snapshot gives at least 15 skill pairs across seven groups"
      - "Per-unit five dimensions: clarity/naturalness/next action/terminology/role-gate relevance; binary critical failure checked before numeric scores"
      - "Zero critical authority/action failure, mean >=4.0/5, no per-unit dimension <3.0/5 for PASS; applicable BA review and QC verification evidence"
      - "Failed/missing translations and friction/duplication findings routed to M6 children, not silently fixed"
    review_checkpoint: "AI scores are recommendations, not fabricated human BA/QC verdicts. Sample never substitutes for M2 full semantic coverage."
    verification_hint: "Count reviewed/mandatory units and deterministic per-group sample; recompute means/minima and critical count. Record exact excerpt/path/digest, reason, reviewer applicability, fix proposal and recheck evidence."
  - id: "M8"
    owner_role: "ba"
    name: "Prepare bounded P3 optional-capability decisions"
    objective: "Disposition memory, metrics and Rationalizations backlog without reopening completed delivery or inventing sponsorship."
    paths_in_scope: ["docs/audits/code-factory-holistic-finding-disposition.md"]
    dependencies: ["M3", "M4"]
    outputs_expected:
      - "CF-013 reduced memory contract/split/retirement brief, preserving completed codebase-memory trial"
      - "CF-014 experiment-versus-retirement brief; thresholds stay unvalidated until sponsored calibration evidence"
      - "CF-015 one-skill pilot-versus-supersession brief with current guardrail comparison"
      - "Named decision owner/next human action and closure evidence for each; no automatic productization"
    review_checkpoint: "Owner decisions remain independent; an undecided brief cannot be a terminal finding verdict."
    verification_hint: "Compare original prior-plan checkboxes, trial/rollout evidence and current guardrails; check zero inferred sponsorship or use of uncalibrated people/delivery gates."
  - id: "M9"
    owner_role: "qc"
    name: "Review portfolio handoffs and maintain the closure ledger"
    objective: "Bind current coverage, classifications, language results and child handoffs to one reviewed snapshot."
    paths_in_scope: ["work-items/code-factory-holistic-audit-remediation", "docs/audits/code-factory-holistic-coverage-matrix.md", "docs/audits/code-factory-holistic-finding-disposition.md"]
    dependencies: ["M5", "M6", "M7", "M8"]
    outputs_expected:
      - "CF-MB2 Spec Compliance recommendation across AC-CF-001..011 and applicable BA language evidence; Code Quality opened only after human QC PASS"
      - "Separate human Developer/QC Code Quality verdict, artifact digests and findings"
      - "Per-child committed source/run/receipt/RED-GREEN/standard-path/security/language evidence as it becomes available"
      - "Open findings retain named next gate/dependency; no elapsed-time or branch-DONE shortcut"
    review_checkpoint: "CF-MB2 evaluates audit/handoff fidelity, not final remediation completion. FAIL blocks M10; missing final child evidence keeps M11 closure open."
    verification_hint: "Recompute row coverage; verify receipt subjects and source tiers; inspect semantic-child negative fixture registration and review/verify lineage. UTF-8/diff checks and exact artifact hashes."
  - id: "M10"
    owner_role: "devops"
    name: "Reconcile integrated candidate, release and both harnesses"
    objective: "Collect direct final identity evidence after independent children complete their own authorized delivery paths."
    paths_in_scope: ["docs/audits/code-factory-holistic-inventory.json", "docs/audits/code-factory-holistic-coverage-matrix.md", "docs/audits/code-factory-holistic-finding-disposition.md"]
    dependencies: ["CF-MB2 Spec Compliance PASS", "CF-MB2 Code Quality PASS", "required child integration/hosted/release/activation evidence or correctly authorized exception"]
    outputs_expected:
      - "Full final source SHA, candidate digest/content identity, required hosted run/job outcomes, immutable tag/release mapping"
      - "Repeated clean local/hosted byte equality or one separately approved canonicalization rule with exact content/provenance/reviewer binding"
      - "Installed Codex/Claude released minor, skill inventory and file parity; CURRENT docs match actual release/install state"
      - "Any unavailable permission/service/data is a named gap; no publish/tag/install action executed in the master"
    review_checkpoint: "Release approval is not publish/tag authority; source version is not installed/released evidence."
    verification_hint: "Compare child candidate/checksum/extracted manifests and build/runtime metadata; inspect authoritative hosted jobs/annotations and tag/release; wfc status --mode codex/claude and CURRENT-document allowlist. Pin all observations to the same snapshot."
  - id: "M11"
    owner_role: "qc"
    name: "Run final verification and request portfolio DoD"
    objective: "Conclude only when all eleven ACs and twenty original findings have direct terminal evidence or authorized exceptions."
    paths_in_scope: ["work-items/code-factory-holistic-audit-remediation", "docs/audits/code-factory-holistic-coverage-matrix.md", "docs/audits/code-factory-holistic-finding-disposition.md"]
    dependencies: ["M10", "20/20 original findings terminal with direct evidence", "new accepted findings resolved or authorized exception", "QC explicit s08 opening"]
    outputs_expected:
      - "Final source recount, mechanical/semantic/unit/smoke/security/language/encoding results and zero unexplained lifecycle/authority/runtime/release contradiction"
      - "AC-CF-001..011 coverage plus EDGE-CF-001..006; skipped required checks block PASS"
      - "Separate QC Technical Verification and DoD decisions/receipts"
      - "Research-master terminal gates remain as approved: no master Release/Business Acceptance inheritance or new gate"
      - "Worktree HOLD_OPEN until valid DoD; branch finalization remains a later separately authorized action"
    review_checkpoint: "Do not self-declare done; final matrix FAIL/PARTIAL remains open regardless of mechanical PASS or budget/timebox."
    verification_hint: "Run final checks listed below, verify all row/digest/subject/tier/classification counts and applicable exception authority. Seal s08 only after host finalization; no changes to bound hosts after sealing."
dependencies_global:
  - "Task Plan approval + matching receipt + explicit activation precede M0 and audit-artifact writes."
  - "CF-MB1 gates M5; CF-MB2 gates M10. Review order is Spec Compliance -> Code Quality."
  - "Read-only discovery can expose later-phase gaps without authorizing earlier-phase bypass or child execution."
  - "Child defects, owner decisions, integration and activation are real dependencies, not master-owned tasks."
risk_notes:
  - "Unknown evidence is preserved; failed or skipped checks cannot become PASS."
  - "No proactive subagents; ownership/authority-sensitive collection and core child work remain sequential."
  - "Node24 release notes and date/version claims must be checked against official GitHub sources before its independent implementation."
verification_plan:
  - "Full source-skill/surface inventory and semantic rows; language sample independently complete"
  - "Twenty exact original IDs, one truthful disposition each, owner/next gate/verify path on every open finding"
  - "Prior authority/legacy/document classification coverage; no retrospective receipt"
  - "Two digest-bound, ordered review pairs before final integrated evidence"
  - "Existing mechanical/semantic/unit/smoke checks, independent security child evidence, language rubric and fatal UTF-8"
  - "Exact source/candidate/hosted/release/installed/CURRENT-doc identity and protected snapshot comparison"
notes_for_implementation: "Execute audit-only in the existing master worktree. Child proposal rows are not child materialization/implementation authority; approved snapshots are immutable."
```

## Evidence Contract and Owned Scope

```yaml
scope_status: PROPOSED_NOT_GRANTED
grant_condition: "Human Task Plan approval, matching receipt, explicit master activation"
proposed_write_roots:
  - "work-items/code-factory-holistic-audit-remediation"
  - "docs/audits/code-factory-holistic-inventory.json"
  - "docs/audits/code-factory-holistic-coverage-matrix.md"
  - "docs/audits/code-factory-holistic-finding-disposition.md"
  - "docs/audits/code-factory-holistic-legacy-document-classification.md"
  - "docs/audits/code-factory-holistic-language-review.md"
protected_paths:
  - "docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
  - "work-items/code-factory-holistic-audit-remediation/code-factory-holistic-audit-remediation.s03.open-questions.md"
  - "work-items/code-factory-holistic-audit-remediation/code-factory-holistic-audit-remediation.s04.acceptance-criteria.md"
  - "work-items/code-factory-holistic-audit-remediation/code-factory-holistic-audit-remediation.s05.technical-approach.md"
  - "work-items/code-factory-holistic-audit-remediation/code-factory-holistic-audit-remediation.s06.task-breakdown.md after finalization/sealing"
excluded_write_roots: ["skills", "policies", ".github", "packages/workflow-bundle", "adapters", "other work-items", "public docs/README outside the five sidecars"]
record_fields: ["id", "subject", "expected", "observed", "result", "evidence_tier", "source_ref", "source_identity", "artifact_sha256", "observed_at", "owner", "child_or_proposal", "next_gate", "closure_evidence"]
result_values: ["PASS", "PARTIAL", "FAIL", "NOT_APPLICABLE"]
evidence_tiers: ["clean-main", "unmerged-child", "effective-resolution-overlay", "hosted-candidate", "released", "installed-harness", "historical-input"]
missing_evidence_rule: "Record a named gap/PARTIAL/FAIL; do not invent run, digest, reviewer, precedence, release or installed identity."
identity_rule: "Full digests/source SHA/run IDs when applicable; absent identity is explicit unknown, never a completed claim."
artifact_generation: "Existing read-only tools plus bounded Markdown/JSON authoring; no new production schema validator or engine."
```

## Verification Plan

- Authoring: `wfc validate`, `wfc protocol`, `wfc plan` with `--workflow-root work-items --project-root .`; run `sdd`, `change`, `exec`, and `fixtures` as supported.
- Read-only pack/semantic baseline: `node packages/workflow-bundle/scripts/audit-workflow-pack.js --repo-root .`; `node packages/workflow-bundle/test/architecture-role-skills-contract.test.js`.
- Final unit/smoke: `node packages/workflow-bundle/test/run-all.js`; existing authoring/bundle/candidate smoke in a controlled copy if scripts generate runtime artifacts. Do not run source-mutating prepack/sync in a pinned snapshot or adopt generated drift.
- Security: direct independently approved scanner/provenance/triage evidence; no absent scan reported as clean.
- Artifact integrity: JSON.parse inventory, match skill/path counts to the pinned tracked tree, verify unique rows and full digest fields, count 20 original finding IDs, and check all AC/edge mappings.
- Language: recompute mandatory coverage, per-group sample, critical failure count, per-unit dimension minima and aggregate mean. Human BA/QC evidence remains distinct from AI scoring.
- Encoding: fatal UTF-8 decode of every changed text file and `git diff --check`.
- Final identity: compare full child source/run/candidate/content/tag/release/harness/public-document evidence. Recount rather than reuse the 42-skill/9-managed/16-legacy snapshot.

## Brownfield Delivery Plan

```yaml
regression_checkpoints: ["M0 protected snapshots", "M1/M2 complete inventory + semantic baseline", "CF-MB1", "M7 language", "CF-MB2", "M10 exact identity", "M11 final coverage"]
compatibility_checkpoints: ["Existing authority and WIP unchanged", "No inherited child receipt", "No legacy provenance rewrite", "Source/branch/released/installed tiers separate", "CURRENT docs match actual release"]
migration_or_backfill_steps: []
rollback_or_restore_steps: ["Revert only isolated owned audit commits if needed; preserve original authority/WIP.", "Child production rollback stays independently governed; CR-008 retains v2.6.1 guarded rollback."]
rollout_note: "No dev/uat/prod server environments are invented; this pack has independently governed candidate/release/harness activation lanes."
```

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks:
  - { id: "GOV-M-01", status: PASS, evidence: "Eleven criteria and six edge classes mapped to twelve named tasks." }
  - { id: "GOV-M-02", status: PASS, evidence: "Six exact audit roots proposed; frozen hosts and all production/child paths excluded." }
  - { id: "GOV-M-03", status: PASS, evidence: "CF-MB1/2 require Spec Compliance before Code Quality." }
  - { id: "GOV-M-04", status: PASS, evidence: "Full semantic coverage, mechanical checks, language rubric and security evidence are separate." }
  - { id: "GOV-M-05", status: PASS, evidence: "Final twenty-finding/eleven-AC/identity closure is not inferred from branch progress." }
blocking_items: ["Human Developer Task Plan decision", "matching trusted receipt", "explicit activation"]
owner: "developer/qc"
next_action: "Developer reviews this audit-only Task Plan and its six proposed write roots."
```

## Spec Change

```yaml
status: NOT_REQUIRED
reason: "The plan executes approved AC-CF-001..011 and the evidence-led Approach without adding child production scope, weakening thresholds, or changing gate applicability."
updated_artifacts: []
required_followups: []
```

## Audit

```yaml
step: "s06 Task Plan"
status: PASS
checks:
  - { criterion: "Complete acceptance/edge coverage", result: PASS, evidence: "AC-CF-001..011 task map; EDGE-CF-001/002/003/005 -> M1/M3/M4, EDGE-CF-004 -> M2/M6/M9, EDGE-CF-006 -> M5/M10/M11." }
  - { criterion: "Executable path-owned work", result: PASS, evidence: "M0..M11 each specify objective, paths, dependencies, outputs, review and verify method." }
  - { criterion: "No audit/implementation conflation", result: PASS, evidence: "Audit-only roots, protected hosts, independent child proposals and terminal subject rules." }
  - { criterion: "Semantic and language completeness", result: PASS, evidence: "100% source semantics; full mandatory language surfaces and deterministic stratified detailed sample." }
  - { criterion: "Real closure dependencies", result: PASS, evidence: "Twenty terminal findings, eleven ACs, owner decisions, child security/regressions and exact integrated/released/installed identity required." }
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "s06 completed in one authoring pass; CR-008 checkpoint preserved separately."
gaps: ["Human Task Plan decision, matching receipt and explicit activation remain required; execution results are not claimed."]
risk_level: HIGH
next_action: "Human Developer reviews the draft Task Plan; keep master/child execution closed."
```

## Traceability

```yaml
upstream:
  - "s04 SHA-256 41078181e9b0e8186c900b8d1908ca9f52820d6b763b37467681325edc389f29"
  - "s05 SHA-256 10b4015018013eebc9a623c5651148f3b4e648c46717f83b1c401b1df2048f8b"
  - "Developer Approach receipt 2026-09-12T05:51:55.282Z, digest_match=true"
  - "Frozen master plan/s03 and approved OQ-CF-001..005 policies"
outputs: ["M0..M11", "five audit artifacts", "CF-MB1/2", "six-root proposal", "existing-child handoffs and final closure dependencies"]
next_step: "Developer Task Plan decision, matching trusted receipt, then explicit audit-only activation"
```

## Handoff

- First task after activation: M0 admission and protected-digest snapshot, then M1 inventory.
- Six write roots are proposed, not granted; the audit worktree remains isolated.
- All 42 baseline source skills require semantic review; final verification recounts the live snapshot.
- Read-only evidence may expose later-phase findings, but child remediation follows P0 -> P4 and independent gates.
- RCR requires its own explicit resume; Node24 still requires its own readiness receipts and activation.
- Master closure waits for direct twenty-finding/eleven-AC and released/installed truth; no production/release/cleanup authority is inferred.
