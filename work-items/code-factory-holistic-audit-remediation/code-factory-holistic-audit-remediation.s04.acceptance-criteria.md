---
artifact_id: "code-factory-holistic-audit-remediation.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "code-factory-holistic-audit-remediation"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
  - "qc"
  - "devops"
  - "po"
  - "maintainer"
review_mode: independent
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
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
  - "requirement-analysis"
  - "sa"
  - "ta"
  - "step-goal-contract"
  - "definition-of-ready-gate"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "code-factory-holistic-audit-remediation.s01.restate.md"
  - "code-factory-holistic-audit-remediation.s02.business-goal.md"
  - "code-factory-holistic-audit-remediation.s03.open-questions.md"
linked_artifacts:
  - "code-factory-holistic-audit-remediation.work-item-report.json"
  - "../../docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
  - "../../docs/audits/code-factory-holistic-workflow-skill-remediation-plan.vi.md"
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> This draft converts the approved OQ-CF-001..005 policies and the canonical master plan into an
> evidence-based portfolio Spec. It defines eleven measurable closure criteria while preserving the
> boundary that every remediation child keeps independent human gates. Input readiness is `READY`;
> human BA Spec and human BA/QC DoR decisions remain pending.

## Step Contract
```yaml
step: "s04 Acceptance + DoR"
goal: >-
  Lock a testable portfolio-level requirement baseline for reviewing and remediating the complete
  Code-Factory workflow and skill pack without turning portfolio approval into child authority.
value: >-
  Give BA, Developer, QC, DevOps, and Maintainer one measurable definition of portfolio closure,
  so mechanical PASS, stale lifecycle prose, or candidate drift cannot be mistaken for completion.
scope_in:
  - "All 42 source skills and every authority, workflow, runtime, adapter, CI/release, language, and portfolio surface named in the master plan"
  - "Finding register CF-001..020 and prior-artifact dispositions"
  - "Approved Option C policies for document authority, legacy truth, language ownership, SA/TA applicability, and current/historical docs"
  - "Child ownership, sequencing, gate separation, verification, and final portfolio evidence"
scope_out:
  - "Implementing any remediation child inside this authoring step"
  - "Granting a child work-item, Spec, Contract, DoR, Approach, Task Plan, DoD, Release, or Business Acceptance gate"
  - "Rewriting historical approvals, receipts, release evidence, or ignored WIP"
  - "Selecting child implementation mechanisms before s05/s06"
inputs_required:
  - "PO-approved master boundary, CF-001..020 register, and P0-to-P4 sequence"
  - "s01 SA/TA drivers and s02 KPI-CF-001..012 plus INV-CF-001..005"
  - "Human-approved OQ-CF-001..005 Option C policies"
  - "Live tracked-main inventory refreshed at 2e3aaded1779787d993b7e5cacc96bfae008b3bc"
outputs_required:
  - "Proposed requirement baseline AC-CF-001..011"
  - "Brownfield baseline and compatibility boundaries"
  - "Governance checks, edge cases, DoR verdict, and independent human gate proposal"
done_when:
  - "Every master outcome has deterministic evidence and a named verification owner"
  - "Every approved OQ policy maps to at least one acceptance criterion"
  - "No open question blocks technical approach authoring"
  - "Spec and DoR reviewers can approve or reject without re-inferring scope"
owner: "ba/qc"
```

## Requirement Baseline
```yaml
status: PROPOSED
spec_refs:
  - "../../docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
  - "code-factory-holistic-audit-remediation.s01.restate.md"
  - "code-factory-holistic-audit-remediation.s02.business-goal.md"
  - "code-factory-holistic-audit-remediation.s03.open-questions.md"
approved_policy_decisions:
  - { id: "OQ-CF-001", option: "C", reviewed_by: ["po", "maintainer"], reviewed_at: "2026-09-11T11:40:59Z" }
  - { id: "OQ-CF-002", option: "C", reviewed_by: ["developer", "qc"], reviewed_at: "2026-09-11T11:40:59Z" }
  - { id: "OQ-CF-003", option: "C", reviewed_by: ["ba", "po", "qc"], reviewed_at: "2026-09-11T11:40:59Z" }
  - { id: "OQ-CF-004", option: "C", reviewed_by: ["po", "ba", "developer", "qc"], reviewed_at: "2026-09-08T02:23:55Z" }
  - { id: "OQ-CF-005", option: "C", reviewed_by: ["po", "ba", "devops"], reviewed_at: "2026-09-11T11:40:59Z" }
decision_notes:
  - "Selectively promote only live shared authority; ignored drafts require one explicit disposition."
  - "Classify legacy items before migration and never mint retrospective trusted receipts."
  - "BA owns the language rubric; supporting roles participate only when their authority applies."
  - "The applicability router and stable reason codes govern SA/TA admission."
  - "Classify public documents as current or historical before changing version/inventory claims."
  - "These policy approvals do not approve this Spec, DoR, any child, or implementation."
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
ux_contract_refs: []
notes:
  - "This portfolio research item changes no public API, event, data, or UX contract."
  - "A child that changes a contract must open and pass its own Contract gate."
```

## Existing System Baseline
```yaml
baseline_at: "2026-09-11"
source_commit: "2e3aaded1779787d993b7e5cacc96bfae008b3bc"
current_behavior_refs:
  - { id: "BASE-CF-001", fact: "The clean tracked-main source contains 42 SKILL.md files.", evidence: "find skills -name SKILL.md -type f => 42" }
  - { id: "BASE-CF-002", fact: "Workflow validation passes 181 files and 177 notes.", evidence: "wfc validate --workflow-root work-items" }
  - { id: "BASE-CF-003", fact: "Protocol validation passes 9 managed items and skips 16 legacy items.", evidence: "wfc protocol --workflow-root work-items" }
  - { id: "BASE-CF-004", fact: "Planning validation passes 177 workflow notes.", evidence: "wfc plan --workflow-root work-items" }
  - { id: "BASE-CF-005", fact: "Source is v2.6.1 while installed Codex and Claude runtimes are v2.3.2 with 40 managed skills.", evidence: "wfc status --mode codex|claude" }
  - { id: "BASE-CF-006", fact: "wfc-demo is absent from clean tracked main.", evidence: "test ! -e work-items/wfc-demo" }
  - { id: "BASE-CF-007", fact: "SA/TA output schemas and their contract test include quantified|binary|not_quantified.", evidence: "skills/analysis/{sa,ta}/references/output-schema*.md and architecture-role-skills-contract.test.js" }
impacted_surfaces:
  - "Canonical audit/master-plan and governed work-item artifacts"
  - "Independently materialized remediation children across policy, skills, runtime, CI, docs, security, and release"
  - "Final cross-boundary coverage and lifecycle reconciliation evidence"
compatibility_constraints:
  - "Preserve human-controlled gate authority and existing historical evidence."
  - "Preserve user-owned untracked WIP unless an owned child explicitly disposes it."
  - "Do not make installed or released-state claims from a source candidate alone."
rollback_constraints:
  - "Portfolio authoring is documentation-only and can be reverted without production state change."
  - "Each behavior-changing child must define its own rollback boundary."
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: "AC-CF-001"
    traces_to: ["KPI-CF-001", "DRV-TA-CF-001"]
    criterion: "The portfolio inventories every source skill and every named audit surface."
    given: "The canonical source tree and §2 audit boundary are fixed for a verification snapshot."
    when: "The inventory and coverage matrix are generated."
    then: "42/42 source skills and 100% of authority, workflow, runtime, adapter, CI/release, language, and portfolio surfaces have an evidence row."
    verification: "Compare generated inventories with manifests, source paths, and the coverage matrix; reject blanks or duplicate rows."
  - id: "AC-CF-002"
    traces_to: ["KPI-CF-002", "INV-CF-002", "OQ-CF-001"]
    criterion: "Every prior plan, research artifact, and finding has exactly one truthful disposition and one canonical authority."
    given: "Tracked, ignored, superseded, historical, and active inputs are enumerated."
    when: "Portfolio reconciliation runs."
    then: "100% receive exactly one CURRENT, SUPERSEDED, RETIRED, HISTORICAL_INPUT, or governed finding verdict; every CURRENT authority is tracked and resolvable."
    verification: "Check disposition completeness, repository visibility, replacement pointers, and duplicate source_of_truth claims."
  - id: "AC-CF-003"
    traces_to: ["KPI-CF-001", "OBJ-CF-002"]
    criterion: "Every non-terminal finding has an executable ownership and verification contract."
    given: "CF-001..020 and any newly accepted finding are listed."
    when: "The portfolio is reviewed at a checkpoint."
    then: "100% of open findings name severity, owner, dependency, child boundary, next gate, verify path, and closure evidence."
    verification: "Schema/manual review reports zero ownerless or unverifiable open rows."
  - id: "AC-CF-004"
    traces_to: ["INV-CF-001", "DRV-SA-CF-003"]
    criterion: "Portfolio decisions never grant child authority."
    given: "A portfolio decision and one or more child work items exist."
    when: "Receipts, protocol events, and transitions are inspected."
    then: "Zero child work-item or gate approval is inferred from the portfolio receipt; every child has its own explicit reviewer and trusted receipt when required."
    verification: "Compare receipt subjects, reviewer roles, timestamps, artifact digests, and protocol-event provenance."
  - id: "AC-CF-005"
    traces_to: ["KPI-CF-004", "KPI-CF-006", "INV-CF-004", "DRV-SA-CF-002"]
    criterion: "Source, runtime, CI, release, and public state reconcile to one truthful released identity."
    given: "The boundaries may initially carry different versions, counts, commits, or candidate digests."
    when: "A release-bound child or final portfolio verification runs."
    then: "One immutable candidate binds source commit, package digest, required hosted run, released version, installed Codex/Claude inventory, and current public docs; differences are historical or explicitly governed."
    verification: "Compare version, count, file parity, commit SHA, candidate SHA-256, hosted checks, tag/release, and installed runtime status."
  - id: "AC-CF-006"
    traces_to: ["KPI-CF-005", "INV-CF-003"]
    criterion: "A known semantic conflict cannot hide behind a green mechanical audit."
    given: "A finding identifies contradictory authority, schema, lifecycle, or runtime behavior."
    when: "The finding is remediated."
    then: "A fail-first semantic fixture reproduces it, passes after the fix, and executes in the appropriate standard validation path."
    verification: "For each semantic finding, link RED/GREEN evidence and prove the regression runs in local and hosted checks where applicable."
  - id: "AC-CF-007"
    traces_to: ["KPI-CF-009", "OQ-CF-003", "DRV-TA-CF-006"]
    criterion: "Public EN/VI language has measurable quality evidence with applicable-role review only."
    given: "Mandatory public surfaces and a stratified sample across every skill group are identified."
    when: "BA-led language review and QC verification run."
    then: "100% mandatory surfaces are reviewed; there are zero critical authority/action failures, average score is at least 4.0/5, and no dimension is below 3.0/5."
    verification: "Record clarity, naturalness, next action, terminology, and role/gate relevance scores plus reviewer applicability."
  - id: "AC-CF-008"
    traces_to: ["KPI-CF-003", "KPI-CF-010", "OQ-CF-002", "DRV-TA-CF-003"]
    criterion: "Protocol and legacy portfolio state contains zero unexplained lifecycle contradiction."
    given: "Protocol-managed and legacy entries are classified from direct evidence."
    when: "Lifecycle reconciliation completes."
    then: "Every legacy entry is LEGACY_CLOSED, actionable, ambiguous, or empty-invalid; zero retrospective receipt exists and zero unexplained skip/pending/completion claim remains."
    verification: "Compare work-item notes, reports, trusted receipts, Git evidence, classification register, and list/protocol output."
  - id: "AC-CF-009"
    traces_to: ["KPI-CF-011", "DRV-TA-CF-004"]
    criterion: "Release artifact identity is reproducible or governed by one explicit canonical content rule."
    given: "Local and hosted clean builds run from the same source."
    when: "Their packages and extracted trees are compared repeatedly."
    then: "Exact digests match, or an approved canonicalization contract explains byte differences while canonical content identity, provenance, and reviewer binding remain exact."
    verification: "Run repeated clean builds and compare package bytes, canonical extracted content, metadata, source SHA, and hosted artifact provenance."
  - id: "AC-CF-010"
    traces_to: ["KPI-CF-008", "OQ-CF-004"]
    criterion: "Role-skill instructions respect authoritative adaptive applicability."
    given: "Maintenance, public-contract, regulated, cross-system, and greenfield-foundation fixtures exist."
    when: "Routing and source/runtime semantic checks execute."
    then: "Zero omitted role is re-added by generic wording; named high-risk triggers still require SA and/or TA; source, Codex, and Claude policies are semantically aligned."
    verification: "Run the applicability matrix and the semantic conflict regression across all operative policy copies."
  - id: "AC-CF-011"
    traces_to: ["KPI-CF-002", "KPI-CF-004", "OQ-CF-005"]
    criterion: "Current-facing documentation reports one released version and managed-skill inventory while historical material stays truthful."
    given: "Every affected public document is classified CURRENT or HISTORICAL."
    when: "Release promotion or final portfolio verification runs."
    then: "CURRENT surfaces agree with actual released and installed state; HISTORICAL surfaces retain original claims, carry a visible label, and are excluded from current onboarding."
    verification: "Run an allowlisted version/inventory scan and compare it with release and runtime evidence."
edge_cases:
  - { id: "EDGE-CF-001", case: "An ignored plan is still actionable.", expected: "Promote it to governed tracked authority before use; do not bulk-unignore its directory." }
  - { id: "EDGE-CF-002", case: "A legacy item has completion-like prose but no trusted receipt.", expected: "Classify from evidence without minting retrospective approval." }
  - { id: "EDGE-CF-003", case: "A historical release document contains an old but correct version.", expected: "Label and exclude it from current navigation rather than rewrite history." }
  - { id: "EDGE-CF-004", case: "A mechanical audit passes while a semantic fixture fails.", expected: "The semantic FAIL blocks closure." }
  - { id: "EDGE-CF-005", case: "Untracked WIP appears in the main working tree but not clean tracked main.", expected: "Preserve it, attribute ownership, and exclude it from canonical counts until governed." }
  - { id: "EDGE-CF-006", case: "A child is complete on an unmerged branch.", expected: "Record branch evidence as pending integration; do not claim main or installed-runtime closure." }
out_of_scope:
  - "Bulk implementation in the master portfolio item"
  - "Retrospective receipt creation"
  - "Destructive cleanup of user-owned WIP"
  - "CI validator parallelisation owned by ci-guardrails-parallelisation"
  - "Publication, tag, install, or release without a separately approved delivery path"
done_when:
  - "AC-CF-001..011 have direct PASS evidence or an approved exception."
  - "20/20 original findings have a terminal, evidence-backed disposition."
  - "The final coverage matrix contains zero unexplained lifecycle, authority, runtime, or release contradiction."
behavioral_invariants:
  - "One canonical authority per decision or state claim."
  - "Portfolio approval never substitutes for child approval."
  - "Mechanical PASS never overrides semantic FAIL."
  - "Source, installed runtime, hosted candidate, and release remain separate identities until reconciled."
  - "Unknown or user-owned material is preserved until attributed and governed."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - { id: "GOV-CF-01", check: "Intent, scope, non-goals, and owner boundaries are explicit.", status: PASS, evidence: "Step Contract plus master plan §2/§7." }
  - { id: "GOV-CF-02", check: "Approved OQ policies map into measurable criteria.", status: PASS, evidence: "OQ-CF-001..005 map to AC-CF-002/008/007/010/011." }
  - { id: "GOV-CF-03", check: "Human gate independence is preserved.", status: PASS, evidence: "AC-CF-004 and prohibited scope require per-child receipts." }
  - { id: "GOV-CF-04", check: "Brownfield compatibility and untracked ownership are protected.", status: PASS, evidence: "Existing System Baseline and EDGE-CF-005 preserve live state and WIP." }
  - { id: "GOV-CF-05", check: "Verification direction covers semantic, security, runtime, hosted, release, language, and encoding concerns.", status: PASS, evidence: "AC-CF-005..011 plus final DoD checks." }
  - { id: "GOV-CF-06", check: "No governance exception is required for authoring.", status: PASS, evidence: "The portfolio uses existing child gates and does not bypass authority." }
blocking_items:
  - "Human BA Spec review and human BA/QC DoR review remain pending."
owner: "ba/qc"
next_action: "Review the proposed Spec first, then DoR; seal independent receipts only after explicit human decisions."
```

## Definition of Ready
```yaml
work_item_slug: "code-factory-holistic-audit-remediation"
status: READY
gate_status: WAITING_HUMAN_APPROVAL
checks:
  restated_request_clear: PASS
  business_goal_clear: PASS
  scope_defined: PASS
  open_questions_non_blocking: PASS
  acceptance_criteria_testable: PASS
  dependencies_known: PASS
  verification_direction_present: PASS
blocking_gaps: []
accepted_assumptions:
  - "The master work item coordinates and verifies the portfolio; behavior changes remain in independent children."
  - "Clean tracked main is the canonical live-count baseline; untracked main WIP and unmerged branches are reported separately."
residual_risks:
  - "Live inventory counts will change as child branches merge; final verification must recount rather than reuse this snapshot."
  - "Independent review findings R-02/R-04/R-06 were not materialized into repository evidence and cannot be invented; they require source recovery or fresh audit evidence."
next_action: "BA reviews Spec; BA and QC review DoR. Do not start s05 before explicit decisions and trusted receipts."
```

## Human Gate Proposal
```yaml
decisions:
  - gate: "spec"
    status: "WAITING_APPROVAL"
    reviewer_roles: ["ba"]
    receipt_sealer: "ba"
  - gate: "dor"
    status: "WAITING_APPROVAL"
    reviewer_roles: ["ba", "qc"]
    receipt_sealer: "qc"
receipt_model_note: "QC seals the DoR receipt only after both BA and QC approve; the receipt does not grant Approach or Task Plan."
```

## Audit
```yaml
step: "s04 Acceptance + DoR"
status: PASS
checks:
  - { criterion: "Criteria are measurable and traceable.", result: PASS, evidence: "AC-CF-001..011 each name threshold and verification." }
  - { criterion: "Every approved OQ has acceptance coverage.", result: PASS, evidence: "OQ-CF-001..005 map to five explicit criteria." }
  - { criterion: "Portfolio/child authority is separated.", result: PASS, evidence: "AC-CF-004 plus scope exclusions." }
  - { criterion: "Brownfield and live-count evidence is explicit.", result: PASS, evidence: "BASE-CF-001..007 and EDGE-CF-005/006." }
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
gaps:
  - "Human Spec and DoR decisions plus trusted receipts are pending."
risk_level: HIGH
next_action: "Stop before s05 until Spec and DoR receipts match this finalized host."
```

## Traceability
```yaml
upstream:
  - "code-factory-holistic-audit-remediation.s01.restate.md"
  - "code-factory-holistic-audit-remediation.s02.business-goal.md"
  - "code-factory-holistic-audit-remediation.s03.open-questions.md"
  - "../../docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
policy_to_acceptance:
  OQ-CF-001: ["AC-CF-002"]
  OQ-CF-002: ["AC-CF-008"]
  OQ-CF-003: ["AC-CF-007"]
  OQ-CF-004: ["AC-CF-010"]
  OQ-CF-005: ["AC-CF-011"]
next_step: "s05 Technical Approach only after human-approved, digest-matched Spec and DoR receipts"
```

## Handoff
- Mandatory criteria: complete inventory/disposition, child gate independence, semantic regression,
  runtime/release truth, lifecycle reconciliation, language rubric, SA/TA applicability, and current
  documentation truth.
- Preserve: historical evidence, user-owned WIP, independent receipts, and separate source/runtime/
  hosted/release identities until reconciliation.
- Condition for step 5: BA approves and seals Spec; BA/QC approve DoR and QC seals its receipt;
  both receipts verify against the unchanged finalized s04 artifact.
