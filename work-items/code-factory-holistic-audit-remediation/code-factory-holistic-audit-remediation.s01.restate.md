---
artifact_id: "code-factory-holistic-audit-remediation.s01.restate"
artifact_family: workflow-step
work_item_slug: "code-factory-holistic-audit-remediation"
step_id: "s01"
step_slug: "restate"
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
  - "sa"
  - "ta"
  - "developer"
  - "qc"
  - "devops"
review_mode: targeted
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
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
  - "product-thinking"
  - "sa"
  - "ta"
  - "step-goal-contract"
  - "workflow-pack-audit"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts:
  - "docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Code-Factory needs one canonical portfolio that covers the entire eight-step workflow, all 42
> source skills, runtime mirrors, adapters, CI/release controls, language quality and every open
> finding. Existing plans are fragmented, several are ignored by Git, and the mechanical audit can
> pass while semantic and lifecycle contradictions remain.
> OQ-CF-001..005 now have explicit Option C decisions from their assigned human authorities, so
> the master work item has a review-ready s04 draft without opening any child implementation gate.

## Step Contract
```yaml
step_goal: >-
  Lock the complete audit boundary, consolidate prior plans and findings without claiming they are
  already resolved, and expose the exact decisions needed before remediation work is opened.
input_summary:
  - "User request to process the proposed sequence and make the holistic workflow/skill plan visible"
  - "42 source skills, the s01-s08 backbone, policy, runtime, validators, adapters and CI/release files"
  - "Prior plan, audit, work-item, change-package and Git evidence"
output_summary:
  - "Requirement-analysis record"
  - "SA and TA architecture-driver records"
  - "Canonical portfolio plan with finding coverage, sequencing, ownership, gates and verification"
done_when:
  - "Every known prior plan maps to completed, superseded, open or unverified"
  - "Every open finding has a severity, owner, dependency, next gate and verify path"
  - "No remediation implementation is opened by this s01 artifact"
owner: "ba"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes and humans approve applicable gates"
  - "One canonical source of truth per decision and lifecycle state"
  - "Brownfield work uses the smallest correct delta"
  - "Mechanical PASS does not override a semantic FAIL or missing evidence"
required_reviews:
  - "PO or delegated portfolio owner approves the work item and remediation sequencing"
  - "BA reviews scope and acceptance coverage"
  - "Developer reviews the later approach and task plan"
  - "QC independently verifies closure evidence"
prohibited_actions:
  - "Treat this plan as approval of its child work items"
  - "Self-approve Release, Business Acceptance, DoD, exceptions or waivers"
  - "Mark legacy items complete only because their files exist"
  - "Publish or install a runtime that does not match the verified source candidate"
open_governance_questions:
  - "OQ-CF-001: Should ignored planning/research documents become tracked portfolio inputs or be retired? Owner: PO/maintainer"
  - "OQ-CF-002: What migration policy should convert 17 legacy scaffolds into truthful protocol status? Owner: Developer/QC"
  - "OQ-CF-003: Which human role owns natural-language quality for public EN/VI workflow prompts? Owner: PO/BA"
  - "OQ-CF-004: Which rule has authority when adaptive role applicability omits SA/TA but the generic Skill Requirement includes them? Owner: PO/BA/Developer/QC"
  - "OQ-CF-005: Which public version/inventory documents are current versus historical? Owner: PO/BA/DevOps"
```

## Requirement Analysis Spec
```yaml
raw_request: >-
  Process the previously recommended remediation sequence and provide the missing plan that covers
  the entire Code-Factory workflow and skill pack.
restated_request: >-
  Establish a tracked, evidence-backed portfolio for reviewing and remediating all Code-Factory
  workflow and skill surfaces, then execute its independently governed child work items in the
  approved order, starting with the existing CR-008 release boundary.
request_type: RESEARCH
business_context: >-
  Prior reviews produced useful but fragmented plans and work items. The maintainer cannot see one
  trustworthy answer to what was reviewed, what is done, what remains, and which approval or
  verification closes each gap.
scope_in:
  - "All 42 source skills and their trigger, boundary, input/output, schema, references and language"
  - "The eight-step workflow, router, governance policy, SDD profiles, templates and validators"
  - "Source-to-runtime parity for Codex and Claude, adapters, hooks, MCP and CI/release controls"
  - "Prior review plans, active changes, legacy artifacts, status contradictions and ignored documents"
  - "A sequenced remediation portfolio with child-work-item boundaries and closure evidence"
scope_out:
  - "Bulk-fixing every finding inside this research item"
  - "Treating portfolio approval as child-work-item gate approval"
  - "Changing immutable release tags or rewriting historical evidence"
  - "Adopting an external tool before its security and governance review"
open_questions:
  - "OQ-CF-001: tracked-or-retired policy for docs/plans and docs/research"
  - "OQ-CF-002: legacy work-item migration and truthful status policy"
  - "OQ-CF-003: owner and measurable rubric for natural EN/VI language"
  - "OQ-CF-004: conditional authority policy for SA/TA applicability"
  - "OQ-CF-005: current-versus-historical policy for version and skill-inventory claims"
assumptions:
  - "The current repository, CR-008 worktree, installed runtime status and hosted CI are separate evidence domains"
  - "A child finding remains open unless current authoritative evidence proves closure"
dependencies:
  - "CR-008 child trusted closeout receipts and repeated parent terminal review"
  - "Human review of this portfolio and each new child work item"
  - "Network and GitHub authentication for hosted checks"
risks_initial:
  - "The portfolio becomes another stale document unless status updates are tied to child evidence"
  - "Mechanical validation masks semantic contradictions"
  - "Runtime/source/version drift makes local and hosted evidence incomparable"
  - "Broad scope encourages bulk changes that bypass independent review"
acceptance_criteria_draft:
  - id: "AC-CF-001"
    description: "Inventory 100% of source skills and all workflow authority/runtime surfaces."
    measurable: true
  - id: "AC-CF-002"
    description: "Map every prior plan and open finding to one status, owner, child boundary, gate and verify path."
    measurable: true
  - id: "AC-CF-003"
    description: "Keep completed evidence distinct from inferred, stale, partial or missing evidence."
    measurable: true
  - id: "AC-CF-004"
    description: "Produce a deterministic execution sequence that does not let portfolio approval bypass child gates."
    measurable: true
  - id: "AC-CF-005"
    description: "Finish with mechanical and semantic audit evidence, runtime parity and zero unexplained lifecycle contradiction."
    measurable: true
  - id: "AC-CF-006"
    description: "Add semantic regression evidence for every known policy or schema conflict that a mechanical validator can miss."
    measurable: true
  - id: "AC-CF-007"
    description: "Apply an approved EN/VI language rubric to all mandatory public entry surfaces and a stratified skill sample."
    measurable: true
  - id: "AC-CF-008"
    description: "End with zero unexplained lifecycle contradiction across current work items, changes, receipts and releases."
    measurable: true
  - id: "AC-CF-009"
    description: "Use a reproducible artifact digest or one explicitly governed canonical content identity for release."
    measurable: true
  - id: "AC-CF-010"
    description: "Prevent generic skill instructions from re-adding roles omitted by the authoritative applicability decision."
    measurable: true
  - id: "AC-CF-011"
    description: "Make every current-facing public document identify one actually released version and managed-skill inventory while labeling historical claims."
    measurable: true
notes_for_next_step: >-
  s02 must lock the maintainer value, success measures and priority. s03 must resolve document
  authority, legacy migration, language-quality ownership, role applicability and current-facing
  version/inventory classification before formal acceptance is frozen.
```

## SA Architecture Drivers
```yaml
invocation:
  skill: sa
  directives_parsed: []
  directives_unresolved: []
  selected_profile: driver+landscape
  profile_source: escalated
  escalation_reasons:
    - "The source repo, Codex runtime, Claude runtime and hosted CI are distinct operational boundaries."
objectives:
  applicable: true
  reason: ""
  items:
    - id: OBJ-CF-001
      statement: "Give the maintainer one complete and auditable view of Code-Factory quality debt."
      measure: "100% of source skills, workflow surfaces and known prior plans appear in the portfolio."
      source: "User request"
      confidence: stated
    - id: OBJ-CF-002
      statement: "Make remediation executable without re-inferring ownership or order."
      measure: "100% of open findings have an owner, dependency, gate and verification path."
      source: "User request and execution-oriented planning policy"
      confidence: stated
    - id: OBJ-CF-003
      statement: "Prevent false claims that the workflow pack or a work item is complete."
      measure: "Zero unexplained conflicts between canonical artifacts, protocol state, Git state, runtime state and hosted checks."
      source: "Human-controlled gates and DoD policy"
      confidence: inferred
drivers:
  applicable: true
  reason: ""
  items:
    - id: DRV-SA-CF-001
      kind: data_ownership
      statement: "Each plan, finding and lifecycle state needs exactly one canonical authority."
      origin: { stakeholder: "maintainer", concern: "Fragmented plans cannot answer what is actually open.", constraint_ref: "source_of_truth policy" }
      traces_to: [OBJ-CF-001, OBJ-CF-003]
      threshold: { status: quantified, value: "exactly 1 canonical authority per record", reason: "" }
      verification: "Check every portfolio row for one canonical artifact and compare it with protocol/Git/runtime evidence."
      architectural_significance: "Authority ownership determines which state downstream automation may trust."
      priority: high
    - id: DRV-SA-CF-002
      kind: system_boundary
      statement: "Repo source, installed runtimes and hosted CI evidence must remain distinct and reconcilable."
      origin: { stakeholder: "maintainer", concern: "A local PASS can coexist with stale installed skills or missing hosted checks.", constraint_ref: "release evidence contract" }
      traces_to: [OBJ-CF-001, OBJ-CF-003]
      threshold: { status: quantified, value: "100% version, skill-count and candidate-digest parity at release", reason: "" }
      verification: "Compare source manifest, both runtime status reports, immutable candidate SHA and hosted workflow result."
      architectural_significance: "These boundaries publish or execute different copies of the workflow pack."
      priority: high
    - id: DRV-SA-CF-003
      kind: constraint
      statement: "The master portfolio coordinates child work but never grants their human-controlled gates."
      origin: { stakeholder: "governance owner", concern: "A broad approval could silently authorize unrelated remediation.", constraint_ref: "Human-Controlled Gates" }
      traces_to: [OBJ-CF-002, OBJ-CF-003]
      threshold: { status: quantified, value: "0 child gates inferred from portfolio approval", reason: "" }
      verification: "Each child starts with its own router block, artifact and explicit human receipt."
      architectural_significance: "This preserves the authority seam between portfolio coordination and delivery execution."
      priority: high
landscape:
  applicable: true
  reason: "Multiple execution boundaries must be reconciled."
  question_answered: "Which authority and runtime boundary owns each quality and lifecycle claim?"
  render_format: drawio
  view_axis: system
  quality_checks: []
  manual_steps: []
  produced_by: ""
input_issues:
  unanchored_drivers: []
  contested_ownership:
    - "Planning authority is split between ignored docs/plans files and work-items/."
    - "CR-008 differs between the main working tree and its dedicated worktree."
    - "Source bundle 2.6.1 exposes 42 skills while installed runtimes report 2.3.2 and 40 managed skills."
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers: []
  unquantified_nfrs: []
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability:
    - "architecture-modeling exists in source but is not present in the installed 40-skill runtime, so no landscape is produced in s01."
metrics:
  applicable: true
  items:
    - { id: M-01, name: "Objective traceability", formula: "drivers with objective / all drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-SA-CF-001..003" }
    - { id: M-02, name: "Objective support", formula: "supported objectives / all objectives", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "OBJ-CF-001..003" }
    - { id: M-03, name: "Driver provenance", formula: "anchored drivers / all drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "origin fields on DRV-SA-CF-001..003" }
    - { id: M-04, name: "NFR quantification", formula: "quantified numeric drivers / numeric drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "threshold fields on DRV-SA-CF-001..003" }
    - { id: M-05, name: "Verification coverage", formula: "drivers with verification / all drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "verification fields on DRV-SA-CF-001..003" }
    - { id: M-06, name: "Handoff coverage", formula: "drivers mapped to handoff / all drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "handoff.to_ba/to_dev/to_qc" }
    - { id: M-07, name: "Open-item ownership", formula: "owned pushed items / pushed items", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "OQ-CF-001..005" }
    - { id: M-08, name: "Option discipline", formula: "direction choices compared / direction choices", value: "not applicable at s01", threshold: "100%", calibration: uncalibrated, evidence: "No approach choice is allowed at s01" }
    - { id: M-09, name: "Landscape element ownership", formula: "owned elements / all elements", value: "not run", threshold: "100%", calibration: uncalibrated, evidence: "Landscape not produced because installed capability is missing" }
    - { id: M-10, name: "Capability ownership clarity", formula: "capabilities with one owner / capabilities reviewed", value: "0/3 = 0%", threshold: "100%", calibration: uncalibrated, evidence: "Three contested_ownership entries" }
handoff:
  to_ba:
    applicable: true
    reason: ""
    items:
      - "Turn complete inventory, per-finding ownership and zero false-closure into s04 criteria."
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Preserve authority separation between repo source, runtime copies, CI evidence and child work items."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Require direct evidence for every status row and independently check contradiction count."
  to_devops:
    applicable: false
    reason: "owned by /ta"
    items: []
stop_condition:
  met: false
  reason: "Document authority, legacy migration and language ownership remain unresolved."
  pushed_to_s03:
    - { question: "Should ignored plan/research documents be tracked or retired?", owner: "po/maintainer" }
    - { question: "How should legacy scaffolds acquire truthful protocol state?", owner: "developer/qc" }
    - { question: "Who owns public EN/VI language quality?", owner: "po/ba" }
```

## TA Architecture Drivers
```yaml
invocation:
  skill: ta
  directives_parsed: []
  directives_unresolved: []
  selected_profile: driver+landscape
  profile_source: escalated
  escalation_reasons:
    - "Source, two installed runtimes and hosted CI are integration boundaries."
objectives:
  applicable: false
  reason: "owned by /sa"
  items: []
drivers:
  applicable: true
  reason: ""
  items:
    - id: DRV-TA-CF-001
      kind: quality_attribute
      statement: "The audit must cover every source skill and every mandatory workflow authority surface."
      origin: { stakeholder: "maintainer", concern: "A partial scan can produce a false PASS.", constraint_ref: "workflow-pack-audit completion conditions" }
      traces_to: [OBJ-CF-001]
      threshold: { status: quantified, value: "42/42 source skills and 100% named authority surfaces", reason: "" }
      verification: "Generate the source inventory and reconcile it against the audit output and manifests."
      architectural_significance: "Coverage defines whether the portfolio can be trusted as the pack-wide control plane."
      priority: high
    - id: DRV-TA-CF-002
      kind: integration
      statement: "Source-to-runtime synchronization must preserve version, skill inventory and semantics."
      origin: { stakeholder: "runtime user", concern: "Installed Codex/Claude behavior differs from the reviewed source.", constraint_ref: "runtime mirror contract" }
      traces_to: [OBJ-CF-003]
      threshold: { status: quantified, value: "100% parity for version, skill count and relevant file hashes", reason: "" }
      verification: "Run build/install smoke and compare source, Codex and Claude runtime manifests and files."
      architectural_significance: "The runtime boundary executes a copied pack rather than the source tree."
      priority: high
    - id: DRV-TA-CF-003
      kind: quality_attribute
      statement: "Lifecycle reports must not contradict step artifacts, receipts or Git state."
      origin: { stakeholder: "reviewer", concern: "Stale status causes false pending or false completion.", constraint_ref: "work-item protocol state machine" }
      traces_to: [OBJ-CF-003]
      threshold: { status: quantified, value: "0 unexplained contradictions", reason: "" }
      verification: "Run protocol validators and a semantic reconciliation matrix across all protocol and legacy items."
      architectural_significance: "Lifecycle truth controls write authority and release decisions."
      priority: high
    - id: DRV-TA-CF-004
      kind: integration
      statement: "Hosted Guardrails must verify the same immutable candidate that release reviewers inspect."
      origin: { stakeholder: "devops/qc", concern: "Local checks or a different SHA cannot authorize release.", constraint_ref: "CI/release evidence contract" }
      traces_to: [OBJ-CF-003]
      threshold: { status: quantified, value: "100% required hosted checks on the exact candidate SHA", reason: "" }
      verification: "Bind GitHub workflow run, artifact and release decision to the candidate commit digest."
      architectural_significance: "CI is an external trust boundary in the promotion flow."
      priority: high
    - id: DRV-TA-CF-005
      kind: quality_attribute
      statement: "Skill, hook, MCP and adapter attack surfaces require an explicit security baseline."
      origin: { stakeholder: "maintainer", concern: "Semantic or supply-chain risks are not covered by frontmatter/cross-reference checks.", constraint_ref: "mandatory security check when applicable" }
      traces_to: [OBJ-CF-001, OBJ-CF-003]
      threshold: { status: quantified, value: "100% target paths scanned; 0 untriaged CRITICAL findings", reason: "" }
      verification: "Run the approved scanner ephemerally, preserve SARIF/Markdown evidence and manually triage high-severity output."
      architectural_significance: "External skill and MCP content can influence agent execution and persisted context."
      priority: high
    - id: DRV-TA-CF-006
      kind: quality_attribute
      statement: "Public instructions and prompts need a measurable natural-language quality baseline in EN and VI."
      origin: { stakeholder: "workflow user", concern: "Literal, repetitive or role-heavy language causes friction and misinterpretation.", constraint_ref: "language and encoding policy" }
      traces_to: [OBJ-CF-001, OBJ-CF-002]
      threshold: { status: not_quantified, value: "", reason: "No approved natural-language rubric or sample baseline exists yet." }
      verification: "Define a rubric, review every public entry path and sample all skill groups with independent human feedback."
      architectural_significance: "Language is the public control interface through which humans grant or withhold authority."
      priority: medium
landscape:
  applicable: true
  reason: "Integration boundaries span source, runtimes and CI."
  question_answered: "Where can reviewed source diverge from the behavior actually executed or released?"
  render_format: drawio
  view_axis: system
  quality_checks: []
  manual_steps: []
  produced_by: ""
input_issues:
  unanchored_drivers: []
  contested_ownership: []
  untraceable_drivers: []
  unsupported_objectives: []
  conflicting_drivers: []
  unquantified_nfrs:
    - "Natural-language quality has no approved rubric or baseline."
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability:
    - "architecture-modeling is missing from the installed runtime, so the required landscape is deferred."
metrics:
  applicable: true
  items:
    - { id: M-01, name: "Objective traceability", formula: "drivers with objective / all drivers", value: "6/6 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-TA-CF-001..006" }
    - { id: M-02, name: "Objective support", formula: "not owned by TA", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "owned by /sa" }
    - { id: M-03, name: "Driver provenance", formula: "anchored drivers / all drivers", value: "6/6 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "origin fields on DRV-TA-CF-001..006" }
    - { id: M-04, name: "NFR quantification", formula: "quantified drivers / numeric drivers", value: "5/6 = 83%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-TA-CF-006 explicitly records the missing baseline" }
    - { id: M-05, name: "Verification coverage", formula: "drivers with verification / all drivers", value: "6/6 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "verification fields on DRV-TA-CF-001..006" }
    - { id: M-06, name: "Handoff coverage", formula: "drivers mapped to handoff / all drivers", value: "6/6 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "handoff.to_dev/to_qc/to_devops" }
    - { id: M-07, name: "Open-item ownership", formula: "owned pushed items / pushed items", value: "1/1 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "Natural-language rubric question assigned to PO/BA" }
    - { id: M-08, name: "Option discipline", formula: "direction choices compared / direction choices", value: "not applicable at s01", threshold: "100%", calibration: uncalibrated, evidence: "No approach choice at s01" }
    - { id: M-09, name: "Landscape element ownership", formula: "owned elements / all elements", value: "not run", threshold: "100%", calibration: uncalibrated, evidence: "Landscape not produced" }
    - { id: M-10, name: "Capability ownership clarity", formula: "capabilities with one owner / capabilities reviewed", value: "not concluded at s01", threshold: "100%", calibration: uncalibrated, evidence: "Ownership reconciliation is a portfolio task" }
handoff:
  to_ba:
    applicable: false
    reason: "owned by /sa"
    items: []
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Preserve source/runtime/CI trust boundaries and close semantic audit blind spots."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Verify 42-skill coverage, zero lifecycle contradictions, exact-SHA CI and security triage."
  to_devops:
    applicable: true
    reason: ""
    items:
      - "Own installed-runtime parity, hosted Guardrails evidence and immutable release linkage."
stop_condition:
  met: false
  reason: "The language baseline and several lifecycle ownership questions remain open."
  pushed_to_s03:
    - { question: "What natural-language rubric and sample size will gate public EN/VI content?", owner: "po/ba" }
```

## Work Item Materialization
```yaml
materialization_status: READY
decision_owner: "agent"
raw_request_summary: "Process the recommended sequence and create the missing holistic Code-Factory workflow/skill review plan."
split_decision: single
dedup_result: no_conflict
work_item_slug: "code-factory-holistic-audit-remediation"
work_item_type: RESEARCH
delivery_context: brownfield
sdd_preset: "full"
selected_profile: "full"
sdd_mode: none
sdd_escalation_reasons: []
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
change_strategy: none
change_id: ""
decision_reason:
  - "split_decision=single"
  - "work_item_type=RESEARCH"
  - "delivery_context=brownfield"
  - "dedup_result=no_conflict"
  - "change_strategy=none"
  - "planning_track=full"
  - "governance_profile=strict"
  - "sdd_preset=full"
  - "selected_profile=full"
  - "sdd_mode=none"
  - "sdd_escalation_reasons="
existing_refs:
  - "docs/plans/sdd-light-code-factory-plan-review.md"
  - "docs/skill-pack-review-2026-07-23.md"
  - "docs/plans/apply-trending-ai-research-2026-06.md"
  - "docs/plans/memory-standardization-plan.md"
  - "docs/plans/sa-ta-skill-metrics-deep-dive.md"
  - "work-items/adaptive-governance-human-approval-ux"
  - "work-items/add-diagram-design-adapter"
  - "work-items/decouple-tests-from-tree-layout"
blockers: []
```

## Human Decision Record

```yaml
decision: APPROVED
decision_scope:
  - "Master work-item boundary and finding register CF-001..018"
  - "Portfolio sequence P0 -> P4"
reviewed_by: "po"
reviewed_at: "2026-09-03T01:34:46.476Z"
decision_source: "User explicitly stated: tôi đồng ý master plan"
human_decision_at: "2026-09-03T01:32:13Z"
trusted_receipt_status: APPROVED
trusted_receipt_recorded_at: "2026-09-03T01:34:46.483Z"
subsequent_decisions:
  - "OQ-CF-004 Option C approved by PO/BA/Developer/QC at 2026-09-08T02:23:55Z."
  - "OQ-CF-001 Option C approved by PO/Maintainer at 2026-09-11T11:40:59Z."
  - "OQ-CF-002 Option C approved by Developer/QC at 2026-09-11T11:40:59Z."
  - "OQ-CF-003 Option C approved by BA/PO/QC at 2026-09-11T11:40:59Z."
  - "OQ-CF-005 Option C approved by PO/BA/DevOps at 2026-09-11T11:40:59Z."
not_approved:
  - "Any child work-item or child gate"
  - "Implementation of CF-019, CF-020, AC-CF-010 or AC-CF-011"
  - "CR-008 hosted artifact-binding amendment"
  - "Release, Business Acceptance, DoD, exception or waiver"
next_action: "Proceed to s02 Business Goal; no child gate is implied."
```

## Work Item Protocol
```yaml
protocol_status: MATERIALIZED
approval_status: APPROVED
review_required: true
work_item_slug: "code-factory-holistic-audit-remediation"
work_item_type: RESEARCH
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/code-factory-holistic-audit-remediation"
current_step: "s04"
granted_write_paths: []
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "agent"
protocol_owner: "po"
reviewed_by: "po"
reviewed_at: "2026-09-03T01:34:46.476Z"
handoff_target: "s04-spec-dor-human-gates"
last_transition_action: "author-s04-portfolio-spec-dor"
last_transition_at: "2026-09-11T13:29:37Z"
required_actions:
  - "BA reviews the proposed portfolio Spec AC-CF-001..011."
  - "BA and QC review the READY DoR recommendation."
  - "After explicit human decisions, seal independent Spec and DoR receipts against the unchanged finalized host."
  - "wfc gate approve --work-item code-factory-holistic-audit-remediation --gate spec --reviewed-by <role>"
  - "wfc gate approve --work-item code-factory-holistic-audit-remediation --gate dor --reviewed-by <role>"
  - "wfc gate approve --work-item code-factory-holistic-audit-remediation --gate approach --reviewed-by <role>"
  - "wfc gate approve --work-item code-factory-holistic-audit-remediation --gate task_plan --reviewed-by <role>"
  - "wfc work-item activate --work-item code-factory-holistic-audit-remediation --step s07 --write-root <path>"
blockers:
  - "Human Spec and DoR decisions plus trusted receipts are pending."
review_notes:
  - "Human review approved."
  - "The s03 bundle was amended at 2026-09-07T14:33:29Z so proposed findings CF-019/CF-020 and AC-CF-010/011 have explicit OQ-CF-004/005 decisions; no finding or option was self-approved."
  - "The detailed P0 dependency cycle was removed: child closeout precedes CF-019 disposition/remediation, which precedes parent CR-008 re-verification; the approved P0-to-P4 phase order is unchanged."
  - "PO, BA, Developer, and QC approved OQ-CF-004 Option C at 2026-09-08T02:23:55Z. CF-019 is accepted as a policy/runtime defect; this decision does not approve its child work item or implementation."
  - "PO/Maintainer approved OQ-CF-001=C, Developer/QC approved OQ-CF-002=C, BA/PO/QC approved OQ-CF-003=C, and PO/BA/DevOps approved OQ-CF-005=C at 2026-09-11T11:40:59Z. All five master OQs are resolved; child and implementation gates remain independent."
  - "s04 now proposes AC-CF-001..011 and a READY DoR from refreshed clean-main evidence: 42 skills, 181 files/177 notes valid, 9 managed/16 legacy protocol inventory, and source v2.6.1 versus installed v2.3.2/40. Human Spec/DoR gates remain pending."
refs:
  - "work-items/code-factory-holistic-audit-remediation"
  - "docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
  - "docs/audits/code-factory-holistic-workflow-skill-remediation-plan.vi.md"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "WORK_ITEM_APPROVED"
  - "S01_HANDOFF_COMPLETED"
  - "S02_BUSINESS_GOAL_COMPLETED"
  - "OQ_RECOMMENDATION_BUNDLE_PREPARED"
  - "MASTER_PLAN_MADE_DISCOVERABLE"
  - "SEMANTIC_FINDINGS_CF_019_CF_020_PROPOSED"
  - "OQ_RECOMMENDATION_BUNDLE_AMENDED_CF_019_CF_020"
  - "PORTFOLIO_DEPENDENCY_CYCLE_REMOVED"
  - "OQ_CF_004_OPTION_C_APPROVED"
  - "OQ_CF_001_002_003_005_OPTION_C_APPROVED"
  - "S03_OPEN_QUESTIONS_COMPLETED"
  - "S04_PORTFOLIO_SPEC_DOR_DRAFTED"
```

## Traceability
```yaml
source_inputs:
  - "User review and sequencing request"
  - "Current repository, worktree, protocol, Git and runtime evidence captured 2026-09-02"
  - "Prior plan and audit artifacts listed in Work Item Materialization.existing_refs"
next_step: "Human BA reviews s04 Spec; BA/QC review DoR before s05 Technical Approach."
```

## Handoff
- Clear: one master portfolio is a distinct research/control item, not a duplicate of any narrow remediation item.
- Track: OQ-CF-001..005 are all approved as Option C by their assigned human authorities.
- Human decision: master boundary, finding register and P0 → P4 sequencing approved at `2026-09-03T01:32:13Z`.
- Human decision: PO/BA/Developer/QC approved OQ-CF-004 Option C at `2026-09-08T02:23:55Z`; CF-019 implementation remains gated independently.
- Human decision: the remaining OQ-CF-001/002/003/005 Option C policies were approved at
  `2026-09-11T11:40:59Z`; no Spec, DoR, child or implementation approval is inherited.
- Current handoff: s04 is review-ready; BA Spec and BA/QC DoR decisions plus trusted receipts are
  required before s05. No child implementation gate is implied.
