---
artifact_id: "integrate-design-checklists-into-sa-ta.s01.restate"
artifact_family: workflow-step
work_item_slug: "integrate-design-checklists-into-sa-ta"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
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
change_id: "CHANGE-004"
change_status: draft
spec_delta_refs:
  - "changes/CHANGE-004/spec-delta/brd.delta.md"
  - "changes/CHANGE-004/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles: []
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
  - "workflow-governance-router"
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "sa"
  - "ta"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "work-items/architecture-role-skills/architecture-role-skills.s08.verification.md"
  - "work-items/arch-role-skills-release/arch-role-skills-release.s08.verification.md"
  - "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s08.verification.md"
linked_artifacts:
  - "changes/CHANGE-004/proposal.md"
  - "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Tóm tắt yêu cầu, phạm vi ban đầu, ràng buộc và governance context mở đầu.

## Step Contract
```yaml
step: "s01 Clarify"
goal: "Establish one reviewable change boundary for deriving domain-neutral pre-design guidance from the selected internal architecture document into the SA and TA skills without transferring HCP-specific decisions or moving s05 authority upstream."
value: "Reviewers can decide whether the proposed skill change is safe, reusable, confidentially redacted, and correctly owned before any skill contract or runtime file is edited."
scope_in:
  - "Normalize the request and materialize CHANGE-004 as a new brownfield work item."
  - "Classify all 34 source rules by SA, TA, downstream design, or exclusion route."
  - "Record SA and TA architecture drivers, handoffs, risks, and draft acceptance criteria."
  - "Identify source/runtime, English/Vietnamese, confidentiality, and compatibility constraints."
scope_out:
  - "Editing SA, TA, generated runtimes, tests, manifests, or release files."
  - "Choosing the checklist storage shape, schema extension, or release version."
  - "Copying HCP-specific products, thresholds, system names, or decisions into the public bundle."
  - "Approving any human-controlled gate."
inputs_required:
  - "User request and confirmation of the domain-neutral CHANGE-004 boundary."
  - "/Users/haonguyen87/Documents/workspaces/ggg/systems/enterprise/human-capability-documents/docs/design.md"
  - "Current canonical SA/TA skill contracts and shared references."
  - "Completed architecture-role-skills, arch-role-skills-release, and stabilize-architecture-skill-bundle evidence."
outputs_required:
  - "A materialized CHANGE-004 proposal and protocol report."
  - "A complete s01 requirement-analysis artifact."
  - "SA and TA driver artifacts with owned handoffs and artifact-quality metrics."
  - "An auditable R-01 through R-34 routing matrix."
done_when:
  - "The work item is singular, distinct from frozen or completed predecessors, and linked to CHANGE-004."
  - "All 34 source rules have exactly one primary routing outcome."
  - "The confidentiality boundary and s01-s04 versus s05 authority boundary are explicit."
  - "Draft acceptance criteria are measurable and no implementation or gate approval is implied."
constraints:
  hard_constraints:
    - "AI proposes and humans approve every work-item, change, Spec, Contract, DoR, Approach, Task Plan, DoD, Release, and Business Acceptance gate."
    - "The internal source is reference input only; public artifacts must use generalized wording and must not reproduce HCP-specific confidential content."
    - "SA and TA remain pre-design driver skills for s01-s04; system-design and architecture-modeling retain s05 design and modeling authority."
    - "Existing canonical skill output blocks and their meanings must not be silently removed or renamed."
  soft_constraints:
    - "Prefer the smallest additive change and keep detailed reusable guidance in references rather than inflating SKILL.md."
    - "Avoid duplicating rules that current SA/TA references already enforce."
  prohibited_actions:
    - "Do not edit production skill or runtime files before s04-s06 approvals and s07 activation."
    - "Do not treat the source document's draft status as architecture approval."
    - "Do not reopen or rewrite prior frozen/DONE work items."
  compliance_checks:
    - "Trace every adopted rule to a source R-ID in private workflow evidence."
    - "Verify 34/34 classification coverage and zero HCP-specific leakage in publishable skill content."
    - "Require Contract review because public skill behavior is affected."
    - "Run strict workflow, planning, change, protocol, reference, parity, and UTF-8 checks at the applicable steps."
risks:
  - id: "RISK-001"
    description: "An internal draft could be promoted into a public universal policy without sufficient review."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Generalize and classify each rule; keep source provenance in workflow evidence and require human Contract review."
    contingency: "Reject or defer any rule whose portability or publication authority cannot be established."
    owner: "ba/developer"
    status: OPEN
  - id: "RISK-002"
    description: "SA/TA may start selecting patterns or modeling views that belong to s05."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Encode downstream-only items as questions and handoffs, then add negative contract tests for solution selection."
    contingency: "Remove prescriptive wording and return the item to system-design or architecture-modeling."
    owner: "developer"
    status: OPEN
  - id: "RISK-003"
    description: "New guidance may duplicate or contradict existing output-schema, ownership, metric, and landscape rules."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Build a rule-to-existing-contract matrix before choosing the s05 design."
    contingency: "Reference the existing rule instead of adding a duplicate."
    owner: "developer"
    status: OPEN
  - id: "RISK-004"
    description: "Canonical, bilingual, and generated runtime copies may drift."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Use canonical-source fan-out, semantic parity checks, recursive runtime diff, pack audit, and UTF-8 validation."
    contingency: "Block Release until all parity differences are resolved or explicitly excluded."
    owner: "developer/qc"
    status: OPEN
timebox:
  target_duration: "One s01 authoring and validation pass"
  deadline: ""
  escalation_rule: "Move unresolved publication authority, release scope, or normative wording to s03 with a named human owner; do not guess."
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "AI proposes; humans approve."
  - "Spec and design before code."
  - "Brownfield baseline and smallest correct delta."
  - "Strict governance for public skill contracts, generated runtimes, compatibility, and release impact."
  - "Internal source material must not become public bundle content without redaction and review."
required_reviews:
  - "po for work-item/change boundary and Business Acceptance"
  - "ba for Spec and rule portability"
  - "developer for Contract and Technical Approach"
  - "qc for DoR, verification evidence, and DoD"
  - "devops or qc for Release if a publishable bundle version is produced"
prohibited_actions:
  - "Do not edit SA/TA or runtime files before the implementation path is activated."
  - "Do not copy the internal document verbatim into a publishable skill reference."
  - "Do not convert context-specific technologies, system names, or thresholds into universal architecture rules."
  - "Do not let SA/TA choose a technical pattern, stack, schema, or model."
open_governance_questions:
  - "Which release/version boundary, if any, will carry this public skill contract change?"
  - "Which named humans will approve Work Item, CHANGE-004, Spec, Contract, DoR, Approach, Task Plan, DoD, Release, and Business Acceptance?"
```

## Main Artifact
```yaml
raw_request: "Tôi muốn sử dụng rule, checklist của human-capability-documents/docs/design.md cho skill role SA, TA như bổ trợ việc thiết kế kiến trúc hệ thống."
restated_request: "Create one governed change that derives reusable, domain-neutral pre-design checks from the selected internal design document for the SA and TA skills, preserves their s01-s04 driver boundary, hands technical choices and models to s05 skills, and keeps bilingual canonical source and generated runtimes consistent."
request_type: CHANGE
user_problem_initial: "The current SA/TA contracts extract architecture drivers but do not yet expose a reusable checklist for several design-readiness concerns demonstrated by the source document, including authority, lifecycle, integration invariants, compliance timing, and measurable transition gates."
business_context_initial: "Architecture reviews should surface these concerns before a design is selected, while avoiding HCP-specific leakage and avoiding a second design authority inside SA or TA."
scope_draft:
  in:
    - "A domain-neutral rule/checklist derivation for SA and TA."
    - "Explicit routing of source rules to SA, TA, downstream s05, or exclusion."
    - "Confidentiality-safe public wording and private R-ID provenance."
    - "Existing output-contract compatibility, EN/VI parity, both generated runtimes, tests, pack audit, and UTF-8 checks."
  out:
    - "HCP-specific systems, products, ownership assignments, exact thresholds, and rollout dates."
    - "A new architecture framework or a redesign of system-design/architecture-modeling."
    - "Editing the external source document."
    - "Registry publication or global installation before Release approval."
    - "Multi-agent execution."
constraints_initial:
  - "The source frontmatter says draft, not architecture-reviewed, and internal circulation only."
  - "The source contains 34 coded rules, some portable and some HCP-specific or solution-prescriptive."
  - "SA and TA share a fixed output shape and block-ownership contract."
  - "Canonical skills live under skills/; Codex and Claude runtime trees are generated outputs."
  - "Prior SA/TA work items are frozen or DONE and must not be silently reopened."
assumptions_initial:
  - "The user's confirmation selects generalized, redaction-safe guidance rather than verbatim reuse."
  - "The checklist is supplementary: it becomes blocking only when a named constraint, approved policy, or acceptance criterion makes a check mandatory."
  - "CHANGE-004 is a new change layer because it changes public skill behavior after the v2.4.0 stabilization work item closed."
open_questions_initial:
  - "Which bundle version or release vehicle should carry the change?"
  - "Should the public skill contract expose checklist evidence in the existing blocks or through an additive field? This is an s05 design choice."
  - "Which human reviewers will seal each required gate?"
dependencies_initial:
  - "Internal source: /Users/haonguyen87/Documents/workspaces/ggg/systems/enterprise/human-capability-documents/docs/design.md"
  - "Canonical SA/TA skills and byte-identical shared references."
  - "Canonical-to-runtime sync, architecture role contract tests, workflow pack audit, and bundle smoke suites."
  - "CHANGE-004 trusted approval and work-item protocol."
risks_initial:
  - "Confidential or contextual HCP content could leak into a reusable bundle."
  - "Prescriptive rules could make SA/TA choose solutions before s05."
  - "New checklist concepts could duplicate or contradict the current fixed schema."
  - "EN/VI or source/runtime copies could drift."
notes_for_step_2: "Lock the business value and success measures for earlier architecture-risk discovery without deciding the checklist representation."
```

## Requirement Analysis Spec
```yaml
raw_request: "Tôi muốn sử dụng rule, checklist của human-capability-documents/docs/design.md cho skill role SA, TA như bổ trợ việc thiết kế kiến trúc hệ thống."
restated_request: "Derive a reviewed, domain-neutral, confidentiality-safe architecture-readiness checklist from the selected internal design document and integrate it into SA/TA as supplementary s01-s04 guidance, with downstream design authority and bundle parity preserved."
request_type: CHANGE
business_context: "Improve architecture readiness by exposing ownership, authority, lifecycle, integration, compliance, and measurable-transition concerns before solution selection."
scope_in:
  - "Classify and trace R-01 through R-34."
  - "Adopt portable pre-design checks, convert prescriptive content to questions/handoffs, defer s05 choices, and exclude HCP-only decisions."
  - "Preserve SA/TA block ownership and downstream system-design/architecture-modeling authority."
  - "Update canonical EN/VI skill resources and both generated runtimes after gates pass."
  - "Add contract, parity, reference, pack, UTF-8, and representative behavior verification."
scope_out:
  - "Publishing confidential HCP details or copying the document verbatim."
  - "Treating the source document as approved architecture policy."
  - "Choosing stacks, products, integration patterns, schemas, or diagram notation inside SA/TA."
  - "Changing the external source document or unrelated workflow capabilities."
open_questions:
  - "Release/version target for the bundle change."
  - "The smallest compatible representation of checklist evidence, to be selected at s05."
  - "Named reviewers for human-controlled gates."
assumptions:
  - "The user's `ok` confirms one new CHANGE-004 and the domain-neutral, redaction-safe boundary."
  - "Supplementary means advisory by default and mandatory only when grounded in a named constraint or approved policy."
  - "Private workflow evidence may retain source path and R-IDs; publishable skill content may not expose HCP-specific details."
dependencies:
  - "The selected internal design document and its R-01 through R-34 rule set."
  - "Existing SA/TA output schema, ownership, metrics, invocation, and landscape references."
  - "Bundle runtime sync and audit/test tooling."
risks_initial:
  - "Universalizing project-specific rules."
  - "Moving s05 decisions into s01-s04."
  - "Breaking existing consumers of the SA/TA output contract."
  - "Confidentiality or bilingual/runtime drift."
acceptance_criteria_draft:
  - id: "AC-001"
    description: "Every source rule R-01 through R-34 has exactly one documented primary route: adopted pre-design check, converted driver question/handoff, deferred to s05+, or excluded as HCP-specific."
    measurable: true
  - id: "AC-002"
    description: "Every adopted SA/TA check names its trigger, owner lens, expected evidence, downstream handoff, and verification method, with no unanchored universal mandate."
    measurable: true
  - id: "AC-003"
    description: "Publishable SA/TA content contains zero HCP system/product names, exact HCP operational thresholds, or verbatim confidential passages."
    measurable: true
  - id: "AC-004"
    description: "Representative prompts prove SA and TA identify relevant drivers and questions but do not select a technology, pattern, schema, domain boundary, or model."
    measurable: true
  - id: "AC-005"
    description: "Existing required output blocks and ownership meanings remain compatible; any additive contract surface is independently reviewed under the Contract gate."
    measurable: true
  - id: "AC-006"
    description: "Canonical EN/VI content is semantically aligned, both generated runtimes match canonical source recursively, and all new references resolve."
    measurable: true
  - id: "AC-007"
    description: "Architecture-role contract tests, representative forward cases, workflow pack audit, bundle smoke, static/reference checks, diff checks, and UTF-8 decoding pass or record an explicit blocker."
    measurable: true
  - id: "AC-008"
    description: "Public metadata, inventory, version/release notes when applicable, compatibility notes, and rollback guidance state one consistent scope without claiming publication before Release approval."
    measurable: true
notes_for_next_step: "Proceed to Business Goal and Open Questions after Work Item and CHANGE-004 review; do not treat this draft as Spec, Contract, or DoR approval."
```

## Source Rule Classification

| Route | Count | Source rules | Intended treatment |
|---|---:|---|---|
| Adopt as portable pre-design checks | 13 | R-01, R-04, R-07, R-14, R-19, R-20, R-21, R-23, R-25, R-26, R-29, R-30, R-31 | Express as conditional ownership, authority, compliance, provenance, reconciliation, lifecycle, and measurable-gate checks. |
| Convert to driver questions and s05 handoff | 10 | R-05, R-06, R-12, R-15, R-16, R-22, R-27, R-28, R-33, R-34 | Capture the invariant or concern; do not prescribe the mechanism. |
| Defer to s05 or implementation policy | 8 | R-08, R-09, R-10, R-11, R-13, R-17, R-18, R-32 | Keep solution/pattern/tool choices downstream; reference existing smallest-correct-solution policy where applicable. |
| Exclude as HCP-specific | 3 | R-02, R-03, R-24 | Do not place HCP ownership or analytics-layout decisions in a reusable bundle. |

The routing matrix covers 34/34 rules. Exact wording and normative strength remain draft until Spec and Contract review.

## SA Architecture Drivers
```yaml
invocation:
  skill: sa
  directives_parsed: []
  directives_unresolved: []
  selected_profile: driver-only
  profile_source: default
  escalation_reasons: []
objectives:
  applicable: true
  reason: ""
  items:
    - id: OBJ-001
      statement: "Make SA/TA surface reusable architecture-readiness concerns before solution selection."
      measure: "34/34 source rules classified and every adopted check has an owned, verifiable handoff."
      source: "user request and confirmed CHANGE-004 boundary"
      confidence: stated
    - id: OBJ-002
      statement: "Preserve confidentiality and prevent HCP-specific decisions from becoming universal bundle policy."
      measure: "Zero HCP-specific names, exact thresholds, or verbatim confidential passages in publishable skill content."
      source: "source confidentiality status and user-confirmed redaction-safe scope"
      confidence: stated
    - id: OBJ-003
      statement: "Keep the architecture role lane compatible and internally consistent across all distributed copies."
      measure: "Zero ownership violations, broken references, EN/VI semantic mismatches, or canonical/runtime diffs."
      source: "existing SA/TA and workflow-bundle contracts"
      confidence: stated
drivers:
  applicable: true
  reason: ""
  items:
    - id: SA-DRV-001
      kind: constraint
      statement: "Only domain-neutral concerns may become reusable checks; HCP-specific decisions remain excluded."
      origin:
        stakeholder: "user"
        concern: "reuse the source as architecture-design support without leaking project-specific content"
        constraint_ref: "CHANGE-004 scope confirmation"
      traces_to: [OBJ-001, OBJ-002]
      threshold:
        status: quantified
        value: "34/34 rules classified; 0 unclassified; 0 HCP-specific leakage"
        reason: ""
      verification: "Compare the private R-ID routing matrix with publishable skill content and run a source-specific-term scan."
      architectural_significance: "Controls whether the checklist is portable and safe to distribute."
      priority: high
    - id: SA-DRV-002
      kind: system_boundary
      statement: "SA and TA may identify constraints and readiness gaps in s01-s04, while system-design and architecture-modeling retain s05 solution and modeling authority."
      origin:
        stakeholder: "architecture role owners"
        concern: "avoid competing design authorities"
        constraint_ref: "current SA/TA Out Of Scope and workflow step ownership"
      traces_to: [OBJ-001, OBJ-003]
      threshold:
        status: binary
        value: "no solution or model selection in SA/TA"
        reason: "Authority separation is pass/fail."
      verification: "Run negative contract prompts and inspect handoffs for downstream ownership."
      architectural_significance: "Moving design decisions upstream would break the workflow chain and role contracts."
      priority: high
    - id: SA-DRV-003
      kind: data_ownership
      statement: "Private workflow evidence owns source provenance; approved canonical skill references own publishable generalized guidance; runtime copies remain derived."
      origin:
        stakeholder: "bundle maintainer"
        concern: "one authoritative source without publishing confidential provenance"
        constraint_ref: "canonical source/runtime ownership and source confidentiality"
      traces_to: [OBJ-002, OBJ-003]
      threshold:
        status: quantified
        value: "100% adopted checks trace privately to an R-ID; recursive runtime diff count = 0"
        reason: ""
      verification: "Audit the private trace matrix, canonical references, and generated runtime comparisons."
      architectural_significance: "Separates confidential evidence from the distributable contract and prevents copy drift."
      priority: high
    - id: SA-DRV-004
      kind: constraint
      statement: "Checklist items are supplementary by default and become blocking only when grounded in a named constraint, approved policy, or accepted criterion."
      origin:
        stakeholder: "user"
        concern: "use the checklist as design support rather than a universal one-size-fits-all policy"
        constraint_ref: "confirmed proposal boundary"
      traces_to: [OBJ-001, OBJ-003]
      threshold:
        status: binary
        value: "every blocking check cites its authority"
        reason: "Authority provenance is categorical."
      verification: "Inspect each blocking rule for a stakeholder concern, named constraint, policy, or AC reference."
      architectural_significance: "Prevents context-derived heuristics from silently becoming universal mandates."
      priority: high
    - id: SA-DRV-005
      kind: constraint
      statement: "Existing SA/TA rules are referenced rather than duplicated when they already cover the same concern."
      origin:
        stakeholder: "skill maintainer"
        concern: "avoid contradictory rule copies and context bloat"
        constraint_ref: "skill-creator concise/reference guidance"
      traces_to: [OBJ-003]
      threshold:
        status: quantified
        value: "0 conflicting duplicate normative rules"
        reason: ""
      verification: "Run a rule-to-existing-contract overlap review before finalizing the s05 approach."
      architectural_significance: "Duplicate contracts drift independently and create ambiguous authority."
      priority: medium
landscape:
  applicable: false
  reason: "The change affects one bundle capability under one owning team and does not move a system or integration boundary."
  question_answered: ""
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
  unquantified_nfrs: []
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability: []
metrics:
  applicable: true
  items:
    - { id: M-01, applicable: true, reason: "", name: "Objective traceability", formula: "drivers tracing to objectives / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "SA-DRV-001 through SA-DRV-005" }
    - { id: M-02, applicable: true, reason: "", name: "Objective support", formula: "supported objectives / total objectives", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "OBJ-001 through OBJ-003 traces" }
    - { id: M-03, applicable: true, reason: "", name: "Driver provenance", formula: "anchored drivers / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "origin fields on SA-DRV-001 through SA-DRV-005" }
    - { id: M-04, applicable: true, reason: "", name: "NFR quantification", formula: "quantified drivers / drivers where numbers are meaningful", value: "3/3 = 100%; binary drivers excluded", threshold: "100%", calibration: uncalibrated, evidence: "SA-DRV-001, SA-DRV-003, SA-DRV-005 quantified" }
    - { id: M-05, applicable: true, reason: "", name: "Verification coverage", formula: "drivers with verification / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "verification on all SA drivers" }
    - { id: M-06, applicable: true, reason: "", name: "Handoff coverage", formula: "drivers in at least one handoff / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "handoff.to_ba, to_dev, and to_qc" }
    - { id: M-07, applicable: true, reason: "", name: "Open-item ownership", formula: "owned s03 items / total s03 items", value: "2/2 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "stop_condition.pushed_to_s03" }
    - { id: M-08, applicable: false, reason: "Technical options are not selected at s01.", name: "Option discipline", formula: "direction choices with rejected alternatives / total choices", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "No s05 choice exists" }
    - { id: M-09, applicable: false, reason: "No landscape is required for this single-capability textual change.", name: "Landscape element ownership", formula: "owned elements / total elements", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "landscape.applicable = false" }
    - { id: M-10, applicable: true, reason: "", name: "Capability ownership clarity", formula: "capabilities with exactly one owner / capabilities in scope", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "SA lane, TA lane, and downstream design/modeling lane are explicit" }
handoff:
  to_ba:
    applicable: true
    reason: ""
    items:
      - "Turn portability, confidentiality, authority, and 34/34 routing into measurable s04 criteria."
      - "Keep checklist checks advisory unless an approved authority makes them mandatory."
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Preserve the s01-s04 versus s05 authority seam and canonical-to-runtime ownership."
      - "At s05 choose the smallest representation that avoids duplicate rules."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Verify classification coverage, leakage prevention, ownership, and negative no-solution-selection cases."
  to_devops:
    applicable: false
    reason: "owned by /ta"
    items: []
stop_condition:
  met: false
  reason: "SA drivers are complete for s01; release scope and named gate reviewers remain open."
  pushed_to_s03:
    - question: "Which bundle version or release vehicle should carry CHANGE-004?"
      owner: "po/devops"
    - question: "Who will sign each required human-controlled gate?"
      owner: "po"
```

## TA Architecture Drivers
```yaml
invocation:
  skill: ta
  directives_parsed: []
  directives_unresolved: []
  selected_profile: driver-only
  profile_source: default
  escalation_reasons: []
objectives:
  applicable: false
  reason: "owned by /sa"
  items: []
drivers:
  applicable: true
  reason: ""
  items:
    - id: TA-DRV-001
      kind: quality_attribute
      statement: "The source-rule routing must be complete, reproducible, and auditable."
      origin:
        stakeholder: "ba/qc"
        concern: "no source rule silently disappears or becomes universal without review"
        constraint_ref: "R-01 through R-34 source set"
      traces_to: [OBJ-001, OBJ-002]
      threshold:
        status: quantified
        value: "34/34 rules have one primary route; 0 unclassified"
        reason: ""
      verification: "Parse the classification matrix, assert unique R-IDs, and compare against the source set."
      architectural_significance: "Classification is the control boundary between reusable constraints, questions, downstream choices, and exclusions."
      priority: high
    - id: TA-DRV-002
      kind: quality_attribute
      statement: "Existing SA/TA output blocks and ownership meanings must remain compatible for current consumers."
      origin:
        stakeholder: "skill consumer"
        concern: "a supplementary checklist must not silently break the public output contract"
        constraint_ref: "current output-schema and block-ownership references"
      traces_to: [OBJ-003]
      threshold:
        status: quantified
        value: "0 required blocks removed or renamed; 0 ownership violations"
        reason: ""
      verification: "Run current contract fixtures plus negative ownership cases against both skills."
      architectural_significance: "The output schema is the integration contract between architecture analysis and downstream workflow steps."
      priority: high
    - id: TA-DRV-003
      kind: quality_attribute
      statement: "Publishable checklist content must be confidentiality-safe and context-neutral."
      origin:
        stakeholder: "bundle maintainer"
        concern: "internal HCP content must not leak into a distributable runtime"
        constraint_ref: "source confidentiality and CHANGE-004 scope"
      traces_to: [OBJ-002, OBJ-003]
      threshold:
        status: quantified
        value: "0 HCP-specific proper names, exact HCP thresholds, or verbatim source passages"
        reason: ""
      verification: "Run a denylist/context scan and conduct human Contract review of the derived wording."
      architectural_significance: "The public runtime and private evidence have different disclosure boundaries."
      priority: high
    - id: TA-DRV-004
      kind: integration
      statement: "Canonical EN/VI skill resources and both generated runtime copies must resolve the same guidance without drift."
      origin:
        stakeholder: "bundle operator"
        concern: "installed Codex and Claude behavior must match canonical source"
        constraint_ref: "canonical runtime sync contract"
      traces_to: [OBJ-003]
      threshold:
        status: quantified
        value: "0 broken references; 0 semantic parity findings; recursive runtime diff count = 0"
        reason: ""
      verification: "Run reference validation, EN/VI semantic checks, runtime sync, recursive diff, pack audit, and bundle smoke."
      architectural_significance: "Generated runtimes are the user-facing copies of the skill contract."
      priority: high
    - id: TA-DRV-005
      kind: quality_attribute
      statement: "Representative use cases must surface the right concerns without selecting downstream solutions."
      origin:
        stakeholder: "developer/qc"
        concern: "guidance should improve analysis without taking over system design"
        constraint_ref: "SA/TA Out Of Scope and s05 authority"
      traces_to: [OBJ-001, OBJ-003]
      threshold:
        status: quantified
        value: "6/6 representative cases route correctly; 0 solution selections"
        reason: ""
      verification: "Run cases for data authority, contested resources, reconciliation, compliance timing, system retirement, and offline/online invariants."
      architectural_significance: "Behavior tests prove the checklist changes analysis quality rather than role ownership."
      priority: high
landscape:
  applicable: false
  reason: "No system or integration boundary moves in this single-bundle textual contract change."
  question_answered: ""
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
  unquantified_nfrs: []
  ownerless_assumptions: []
  surplus_drivers: []
  missing_capability: []
metrics:
  applicable: true
  items:
    - { id: M-01, applicable: true, reason: "", name: "Objective traceability", formula: "drivers tracing to objectives / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "TA-DRV-001 through TA-DRV-005" }
    - { id: M-02, applicable: false, reason: "Objectives are owned and measured by SA.", name: "Objective support", formula: "supported objectives / total objectives", value: "not applicable in TA-owned output", threshold: "100%", calibration: uncalibrated, evidence: "objectives.reason = owned by /sa" }
    - { id: M-03, applicable: true, reason: "", name: "Driver provenance", formula: "anchored drivers / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "origin fields on TA-DRV-001 through TA-DRV-005" }
    - { id: M-04, applicable: true, reason: "", name: "NFR quantification", formula: "quantified drivers / drivers where numbers are meaningful", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "threshold fields on all TA drivers" }
    - { id: M-05, applicable: true, reason: "", name: "Verification coverage", formula: "drivers with verification / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "verification on all TA drivers" }
    - { id: M-06, applicable: true, reason: "", name: "Handoff coverage", formula: "drivers in at least one handoff / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "handoff.to_dev, to_qc, and to_devops" }
    - { id: M-07, applicable: true, reason: "", name: "Open-item ownership", formula: "owned s03 items / total s03 items", value: "2/2 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "stop_condition.pushed_to_s03" }
    - { id: M-08, applicable: false, reason: "No technical option is selected at s01.", name: "Option discipline", formula: "direction choices with rejected alternatives / total choices", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "s05 not opened" }
    - { id: M-09, applicable: false, reason: "No landscape is required.", name: "Landscape element ownership", formula: "owned elements / total elements", value: "not applicable", threshold: "100%", calibration: uncalibrated, evidence: "landscape.applicable = false" }
    - { id: M-10, applicable: false, reason: "Capability ownership clarity is measured by the SA system lens.", name: "Capability ownership clarity", formula: "capabilities with exactly one owner / total capabilities", value: "not applicable in TA-owned output", threshold: "100%", calibration: uncalibrated, evidence: "SA metric M-10" }
handoff:
  to_ba:
    applicable: false
    reason: "owned by /sa"
    items: []
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Preserve required output blocks and choose only additive or non-schema guidance at s05."
      - "Keep private provenance separate from publishable generalized content."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Assert 34/34 unique routing, zero leakage, six representative behavior cases, and all parity/reference checks."
  to_devops:
    applicable: true
    reason: ""
    items:
      - "Define the candidate package/version, install/update smoke, compatibility statement, and rollback evidence if Release is in scope."
stop_condition:
  met: false
  reason: "TA drivers are complete for s01; the release target and Contract representation remain gated downstream decisions."
  pushed_to_s03:
    - question: "Which release/version boundary carries the packaged change?"
      owner: "po/devops"
    - question: "Which compatible checklist representation will be evaluated at s05?"
      owner: "developer"
```

## Work Item Materialization
```yaml
materialization_status: READY
decision_owner: "agent"
raw_request_summary: "Derive domain-neutral, confidentiality-safe design-readiness rules and checklists from human-capability-documents/docs/design.md for SA and TA while preserving their s01-s04 authority boundary and bundle parity."
split_decision: single
dedup_result: no_conflict
work_item_slug: "integrate-design-checklists-into-sa-ta"
work_item_type: CHANGE
delivery_context: brownfield
sdd_preset: "full"
selected_profile: "full"
sdd_mode: none
sdd_escalation_reasons: []
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
change_strategy: create_new
change_id: "CHANGE-004"
decision_reason:
  - "The user confirmed one new domain-neutral CHANGE-004 boundary."
  - "architecture-role-skills and arch-role-skills-release are frozen/completed predecessor scopes."
  - "stabilize-architecture-skill-bundle is DONE and did not derive this new source checklist."
  - "planning_track=full and governance_profile=strict because public skill contracts, bilingual resources, generated runtimes, compatibility, and release evidence may change."
existing_refs:
  - "work-items/architecture-role-skills"
  - "work-items/arch-role-skills-release"
  - "work-items/stabilize-architecture-skill-bundle"
blockers: []
```

## Work Item Protocol
```yaml
protocol_status: DONE
approval_status: APPROVED
review_required: true
work_item_slug: "integrate-design-checklists-into-sa-ta"
work_item_type: CHANGE
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/integrate-design-checklists-into-sa-ta"
current_step: "s08"
granted_write_paths:
  - ".claude/worktrees/integrate-design-checklists-into-sa-ta-v2.6.0"
  - "work-items/integrate-design-checklists-into-sa-ta"
  - "changes/CHANGE-004"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: create_new
change_id: "CHANGE-004"
decision_owner: "agent"
protocol_owner: "coordinator"
reviewed_by: "po"
reviewed_at: "2026-08-20T08:52:31.424Z"
handoff_target: "branch-and-release-finalization"
last_transition_action: "close"
last_transition_at: "2026-08-24T06:23:09.530Z"
required_actions:
  - "Archive the work item when all downstream lifecycle actions are complete."
blockers: []
review_notes:
  - "Human review approved."
refs:
  - "changes/CHANGE-004"
  - "work-items/integrate-design-checklists-into-sa-ta"
  - "work-items/architecture-role-skills"
  - "work-items/arch-role-skills-release"
  - "work-items/stabilize-architecture-skill-bundle"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "CHANGE_CREATED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "WORK_ITEM_APPROVED"
  - "BASELINE_RECONCILED"
  - "GATE_REVIEW_RECORDED"
  - "GATE_RECEIPT_VERIFIED"
  - "STEP_OPENED"
  - "GATE_REVIEW_RECORDED"
  - "WORK_ITEM_ACTIVATED"
  - "WORK_ITEM_BLOCKED"
  - "WORK_ITEM_RESUMED"
  - "STEP_OPENED"
  - "VERIFICATION_CONFIRMED"
  - "GATE_REVIEW_RECORDED"
  - "GATE_REVIEW_RECORDED"
  - "DONE_CONFIRMED"
```

## Traceability
```yaml
source_inputs:
  - "User request and domain-neutral scope confirmation"
  - "/Users/haonguyen87/Documents/workspaces/ggg/systems/enterprise/human-capability-documents/docs/design.md"
  - "skills/analysis/sa and skills/analysis/ta canonical contracts"
  - "completed architecture role and v2.4.0 stabilization work items"
business_to_design:
  - "OBJ-001 -> SA-DRV-001/002/004 -> AC-001/002/004"
  - "OBJ-002 -> SA-DRV-001/003 and TA-DRV-003 -> AC-003"
  - "OBJ-003 -> SA-DRV-002/003/005 and TA-DRV-002/004/005 -> AC-005/006/007/008"
next_step: "Protocol is DONE and branch finalization is complete at merge commit af29ed3c89d8e45a8e84cb7b4c17458744c5d181. Execute the separately scoped guarded release with the retained exact candidate, or explicitly conclude the no-publication path before archive."
```

## Handoff
- Clear: CHANGE-003 is integrated and the real CHANGE-004 brownfield baseline is v2.5.0/42; Option A remains unchanged and the next candidate is v2.6.0/42.
- Passed gate: amended s05 Approach receipt is `APPROVED` by Developer with `digest_match=true`.
- Current gate: Technical Verification and DoD were approved by QC; Release was approved by DevOps and QC; Business Acceptance was approved by PO. All three trusted receipts match frozen s08 SHA-256 `89f0b65a37d8cf63147c6152526024635a93eedda437fb8499c761759eb4c017`, and the protocol closed as `DONE` at `2026-08-24T06:23:09.530Z`.
- Branch finalization: reviewed commit `26591a2301999b433a3fec58bbe8af2ef8c637fa` was merged into `main` as `af29ed3c89d8e45a8e84cb7b4c17458744c5d181`; post-merge unit, parity, pack, exact candidate/rollback, receipt, and UTF-8 checks passed. The dedicated worktree and local branch were removed after verification, while unrelated dirty `main` paths were preserved.
- Downstream state: exact candidate SHA-256 `5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9` is retained at `packages/workflow-bundle/workflow-bundle-2.6.0.tgz`; no tag, publication, registry promotion, global install, or archive action was performed.
