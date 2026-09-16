---
artifact_id: "terminal-archive-legacy-state-reconciliation.s01.restate"
artifact_family: workflow-step
work_item_slug: "terminal-archive-legacy-state-reconciliation"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: BUG
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
change_id: "CR-009"
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
  - "developer"
  - "qc"
review_mode: self
verification_owner: ""
artifact_shape: adaptive_v1
request_lane: maintenance
workflow_required: true
routing_reasons:
  - "LANE_MAINTENANCE"
escalation_reasons: []
role_reasons:
  developer:
    - "ROLE_DEVELOPER_BOUNDED_CHANGE"
  qc:
    - "ROLE_QC_DOD_VERIFICATION"
gate_reasons:
  task_plan:
    - "GATE_TASK_PLAN_BOUNDED_CHANGE"
  dod:
    - "GATE_DOD_TECHNICAL_CLOSEOUT"
adaptive_activation:
  source_version: "2.6.2"
  installed_versions:
    - "2.6.2"
    - "2.6.2"
  parity_passed: true
approval_gates:
  spec: "not_applicable"
  contract: "not_applicable"
  dor: "not_applicable"
  approach: "not_applicable"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
  dod: "required"
role_signoffs:
  task_plan: ["developer"]
  dod: ["qc"]
gate_reviews:
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "sa"
  - "ta"
  - "step-goal-contract"
artifact_skills:
  - "artifact-governance"
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts:
  - "changes/CR-009/proposal.md"
  - "changes/CR-008/archive-metadata.md"
  - "changes/CR-008/execution/task-status.md"
  - "work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Tóm tắt yêu cầu, phạm vi ban đầu, ràng buộc và governance context mở đầu.

## Step Contract
```yaml
step_goal: "Define the F-CR008-ARCH-001 defect boundary without choosing an implementation mechanism."
input_summary:
  - "Human-approved linked defect direction: explicit ID-based disposition."
  - "An archive transition must reject active blockers."
  - "Opaque legacy text must remain byte-preserved in resolved-state history."
  - "Regex, substring, fuzzy, normalization-based, or other text inference is prohibited."
  - "CR-008 and v2.6.2 are already archived and published."
output_summary:
  - "One brownfield BUG work item linked to F-CR008-ARCH-001 and CR-009."
  - "Initial scope, non-goals, risks, dependencies, and draft acceptance criteria."
  - "SA and TA driver sets for later readiness and design work."
done_when:
  - "The request is restated without weakening the human direction."
  - "The terminal-state invariant and preservation invariant are explicit."
  - "Unresolved design choices are owned and routed to s03."
  - "No production implementation, final schema, or command shape is selected."
owner: "maintainer"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
applicable_principles:
  - "Brownfield smallest-correct-delta discipline"
  - "Compatibility and audit-history preservation"
  - "AI proposes; human approves"
  - "No implementation before the applicable authoring gates"
required_reviews:
  - "Maintainer approves the work item and CR-009 boundary"
  - "Developer owns the technical direction and task plan"
  - "QC owns independent behavior verification and DoD"
prohibited_actions:
  - "Do not mutate the immutable v2.6.2 release, tag, package, or signed receipts"
  - "Do not silently remove, reinterpret, normalize, regex-match, or substring-match opaque text"
  - "Do not archive a work item while active blockers remain"
  - "Do not use this approval as approval of Spec, DoR, Approach, Task Plan, or implementation"
open_governance_questions:
  - "OQ-TAR-003: which authorized role may execute and attest an explicit disposition"
profile_reason: "The change affects persisted protocol state, compatibility, terminal transitions, and audit history."
```

## Artifact Chính
```yaml
raw_request: "Phê duyệt tạo linked defect terminal-archive-legacy-state-reconciliation theo hướng explicit ID-based disposition, với role Maintainer, Developer và QC; archive phải từ chối active blockers, legacy text phải được lưu nguyên vẹn trong lịch sử resolved-state, không regex hoặc text inference."
restated_request: "Create a linked defect for F-CR008-ARCH-001 that prevents terminal archive while any active blocker remains and permits legacy-state resolution only through an explicit opaque identifier. Every resolved entry must retain its exact original text in auditable resolved-state history; core transitions must never infer state from that text."
request_type: BUG
business_context: "CR-008 is released and archived, but its parent report still presents two opaque compatibility entries as active blockers. Current archive behavior permits ARCHIVED plus non-empty blockers, creating a misleading terminal projection and preventing safe branch/worktree finalization."
scope_in:
  - "Define a terminal invariant: archive rejects every report that still has active blockers."
  - "Define an explicit identifier-based disposition path for opaque legacy entries."
  - "Preserve exact original legacy text and disposition metadata in append-only resolved-state history."
  - "Make disposition auditable and safe under invalid IDs, retry, and partial failure."
  - "Keep legacy reports readable without bulk migration."
  - "Cover the real F-CR008-ARCH-001 parent-report case and all 14 currently tracked protocol reports."
scope_out:
  - "Changing or republishing v2.6.2, its tag, package, release assets, or signed receipts."
  - "Silently clearing the two CR-008 strings or assigning them meaning from their wording."
  - "Bulk rewriting every historical report before it can be read."
  - "Reopening CR-008 delivery scope or changing already approved CR-008 acceptance evidence."
  - "Selecting the final command, schema field names, storage layout, or transaction mechanism in s01."
open_questions:
  - "OQ-TAR-001 [Developer, QC]: How is a stable opaque ID assigned to pre-contract legacy entries that currently have only kind and text?"
  - "OQ-TAR-002 [Developer]: Is explicit disposition a separate operation, an archive precondition flow, or one atomic operation?"
  - "OQ-TAR-003 [Maintainer, Developer, QC]: Which authority may execute disposition, and which evidence must QC verify?"
  - "OQ-TAR-004 [Developer, QC]: Does resolved-state history cover blockers only, or every state collection including required_actions?"
  - "OQ-TAR-005 [Developer, QC]: What schema/version compatibility rule lets all 14 tracked reports load without migration?"
  - "OQ-TAR-006 [Maintainer]: May CR-008 branch cleanup occur after the approved handoff, or only after this defect reaches DoD?"
assumptions:
  - "The defect restores a protocol invariant and is routed as maintenance, not a new product outcome."
  - "Maintainer is the work-item/change authority; Developer and QC are the applicable delivery roles."
  - "The two current CR-008 legacy entries remain untouched until an approved disposition operation exists."
  - "Resolved-state history is append-only from the perspective of normal protocol transitions."
dependencies:
  - "F-CR008-ARCH-001 in changes/CR-008/execution/task-status.md"
  - "CR-008 branch-finish HOLD_OPEN decision in changes/CR-008/archive-metadata.md"
  - "Current state-entry loader and transition runtime in packages/workflow-bundle/scripts"
  - "Trusted approval and protocol validation behavior"
risks_initial:
  - "A generated ID that depends on normalized text could reintroduce prohibited semantic inference or collide across duplicate entries."
  - "Removing an active entry before history is durably appended could cause silent audit loss."
  - "Adding metadata directly to kind=legacy may break the existing exact legacy-shape contract."
  - "Rejecting archive without a usable disposition path could deadlock valid historical work items."
  - "Changing terminal behavior may expose additional reports that were previously archived with stale blockers."
acceptance_criteria_draft:
  - id: "AC-TAR-01"
    description: "An archive attempt with one or more active blockers is rejected and leaves the report byte-equivalent after normalization, except for no allowed mutation."
    measurable: true
  - id: "AC-TAR-02"
    description: "A disposition request identifies exactly one state entry by opaque ID; missing, unknown, ambiguous, or repeated IDs never fall back to text matching."
    measurable: true
  - id: "AC-TAR-03"
    description: "A successful disposition appends one resolved-state history record containing the exact original text plus entry identity, source collection, actor, UTC timestamp, reason, and operation identity."
    measurable: true
  - id: "AC-TAR-04"
    description: "Core transitions and state assertions perform zero regex, substring, fuzzy alias, Unicode-boundary, normalization, or semantic inference over display text."
    measurable: true
  - id: "AC-TAR-05"
    description: "Unknown legacy strings, including wording containing review, pending, outstanding, approve, or Unicode variants, remain active and byte-preserved until their explicit IDs are dispositioned."
    measurable: true
  - id: "AC-TAR-06"
    description: "Retrying the same disposition is idempotent: it creates no duplicate history record and does not resolve another entry."
    measurable: true
  - id: "AC-TAR-07"
    description: "Failure injection proves atomicity: each attempt leaves either the complete pre-state or the complete post-state, never active-entry removal without matching history."
    measurable: true
  - id: "AC-TAR-08"
    description: "All 14 tracked reports load without pre-migration, and legacy inputs preserve their exact original text."
    measurable: true
  - id: "AC-TAR-09"
    description: "The real CR-008 parent fixture cannot archive before explicit disposition and can archive only after active blockers are empty while resolved history retains both originals."
    measurable: true
  - id: "AC-TAR-10"
    description: "The change does not modify v2.6.2 release artifacts, tags, packages, or existing trusted receipts."
    measurable: true
notes_for_next_step: "s02 must define the operational value of an unambiguous terminal state; s03 must resolve OQ-TAR-001..006 before s04 locks criteria."
```

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
    - id: OBJ-TAR-001
      statement: "Make terminal work-item state unambiguous."
      measure: "100% of archive attempts with active blockers are rejected."
      source: "Human-approved defect direction and F-CR008-ARCH-001"
      confidence: stated
    - id: OBJ-TAR-002
      statement: "Preserve the audit meaning and exact evidence of opaque historical state."
      measure: "100% of disposition records retain exact original text and explicit identity metadata."
      source: "Human-approved defect direction"
      confidence: stated
    - id: OBJ-TAR-003
      statement: "End state transitions based on interpretation of human-readable prose."
      measure: "Zero core state decisions read display text."
      source: "Human-approved defect direction and CR-008 root-cause analysis"
      confidence: stated
drivers:
  applicable: true
  reason: ""
  items:
    - id: DRV-SA-TAR-001
      kind: constraint
      statement: "ARCHIVED and a non-empty active blocker collection are mutually exclusive states."
      origin: { stakeholder: "maintainer", concern: "Terminal projection must be truthful", constraint_ref: "F-CR008-ARCH-001" }
      traces_to: [OBJ-TAR-001]
      threshold: { status: binary, value: "Archive rejects any active blocker", reason: "" }
      verification: "Attempt archive with typed, raw-string, and opaque legacy blockers and prove rejection without mutation."
      architectural_significance: "This invariant constrains the terminal state machine and all archive entry points."
      priority: high
    - id: DRV-SA-TAR-002
      kind: data_ownership
      statement: "Active state and resolved history require distinct, authoritative ownership; a resolved entry cannot remain active."
      origin: { stakeholder: "maintainer", concern: "One truthful projection for current versus historical state", constraint_ref: "CR-008 archive HOLD_OPEN" }
      traces_to: [OBJ-TAR-001, OBJ-TAR-002]
      threshold: { status: binary, value: "Each entry is active or resolved, never both", reason: "" }
      verification: "Validate collection membership and history linkage after success, retry, and failure recovery."
      architectural_significance: "Ambiguous ownership is the source of the current archived-plus-blocked contradiction."
      priority: high
    - id: DRV-SA-TAR-003
      kind: constraint
      statement: "Disposition authority acts on explicit identity and never on prose meaning."
      origin: { stakeholder: "maintainer", concern: "No silent deletion of legitimate blockers", constraint_ref: "Human prohibition on regex or text inference" }
      traces_to: [OBJ-TAR-002, OBJ-TAR-003]
      threshold: { status: binary, value: "Only exact opaque identity selects an entry", reason: "" }
      verification: "Use adversarial wording and confirm no text variation changes selection or outcome."
      architectural_significance: "It removes human-readable text from the authorization and state-transition boundary."
      priority: high
    - id: DRV-SA-TAR-004
      kind: constraint
      statement: "Published v2.6.2 artifacts and historical trusted receipts remain immutable."
      origin: { stakeholder: "maintainer", concern: "Preserve released evidence", constraint_ref: "CR-008 archive metadata" }
      traces_to: [OBJ-TAR-002]
      threshold: { status: binary, value: "No historical release or receipt mutation", reason: "" }
      verification: "Compare release/tag/package/receipt identifiers and digests before and after delivery."
      architectural_significance: "The remedy must be forward-only and cannot rewrite the evidence it is meant to preserve."
      priority: high
landscape:
  applicable: false
  reason: "One existing workflow-bundle boundary is affected; no system or team boundary moves in s01."
  question_answered: ""
  render_format: drawio
  view_axis: system
  quality_checks: []
  manual_steps: []
  produced_by: architecture-modeling
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
    - { id: M-01, applicable: true, reason: "", name: "Objective traceability", formula: "drivers tracing to >=1 objective / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-SA-TAR-001..004" }
    - { id: M-02, applicable: true, reason: "", name: "Objective support", formula: "objectives supported by >=1 driver / total objectives", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "OBJ-TAR-001..003 traces" }
    - { id: M-03, applicable: true, reason: "", name: "Driver provenance", formula: "anchored drivers / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "origin fields on DRV-SA-TAR-001..004" }
    - { id: M-04, applicable: false, reason: "All SA drivers are binary invariants where a numeric threshold is not meaningful.", name: "NFR quantification", formula: "quantified drivers / numerically meaningful drivers", value: "N/A", threshold: "100%", calibration: uncalibrated, evidence: "Binary threshold status on all SA drivers" }
    - { id: M-05, applicable: true, reason: "", name: "Verification coverage", formula: "drivers with verification / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "verification fields on DRV-SA-TAR-001..004" }
    - { id: M-06, applicable: true, reason: "", name: "Handoff coverage", formula: "drivers mapped to >=1 handoff / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "handoff.to_dev and handoff.to_qc" }
    - { id: M-07, applicable: true, reason: "", name: "Open-item ownership", formula: "owned s03 items / total s03 items", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "stop_condition OQ-TAR-003, OQ-TAR-004, OQ-TAR-006" }
    - { id: M-08, applicable: false, reason: "s01 records constraints and does not choose a direction.", name: "Option discipline", formula: "choices with rejected alternative / total choices", value: "N/A", threshold: "100%", calibration: uncalibrated, evidence: "No direction choice in s01" }
    - { id: M-09, applicable: false, reason: "No landscape is required.", name: "Landscape element ownership", formula: "owned elements / total elements", value: "N/A", threshold: "100%", calibration: uncalibrated, evidence: "landscape.applicable=false" }
    - { id: M-10, applicable: true, reason: "", name: "Capability ownership clarity", formula: "capabilities with one existing authority / total capabilities", value: "1/1 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "Existing workflow-bundle protocol runtime owns work-item state transitions" }
handoff:
  to_ba: { applicable: false, reason: "Adaptive maintenance lane has no BA approval action; criteria are carried by the main s01 artifact.", items: [] }
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Preserve DRV-SA-TAR-001..004 as design constraints; do not select a mechanism until s05."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Build independent checks for terminal-state exclusivity, exact preservation, identity-only selection, and immutable history."
  to_devops: { applicable: false, reason: "No release or runtime-deployment scope is opened by this work item.", items: [] }
stop_condition:
  met: true
  reason: "The solution/system constraints are explicit; unresolved choices are routed rather than guessed."
  pushed_to_s03:
    - { question: "See OQ-TAR-003 for disposition authority and evidence ownership.", owner: "maintainer" }
    - { question: "See OQ-TAR-004 for state-collection scope.", owner: "developer and qc" }
    - { question: "See OQ-TAR-006 for CR-008 cleanup timing.", owner: "maintainer" }
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
    - id: DRV-TA-TAR-001
      kind: quality_attribute
      statement: "Archive rejection is deterministic and side-effect free when active blockers exist."
      origin: { stakeholder: "qc", concern: "No false terminal state or failed-attempt mutation", constraint_ref: "AC-TAR-01 draft" }
      traces_to: [OBJ-TAR-001]
      threshold: { status: quantified, value: "100% rejection; 0 state mutations", reason: "" }
      verification: "Exercise blocker kinds and compare canonical pre/post report state."
      architectural_significance: "The archive boundary must fail closed before any terminal write."
      priority: high
    - id: DRV-TA-TAR-002
      kind: quality_attribute
      statement: "Disposition and history recording are atomic under every injected write failure."
      origin: { stakeholder: "developer", concern: "No audit loss or split state", constraint_ref: "Strict compatibility and audit requirement" }
      traces_to: [OBJ-TAR-001, OBJ-TAR-002]
      threshold: { status: quantified, value: "100% pre-state or complete post-state; 0 mixed outcomes", reason: "" }
      verification: "Inject failures at every durable-write boundary and inspect both active and resolved collections."
      architectural_significance: "A partial move would be harder to detect than the current stale projection."
      priority: high
    - id: DRV-TA-TAR-003
      kind: quality_attribute
      statement: "Disposition retry is idempotent and identity-bound."
      origin: { stakeholder: "qc", concern: "Retries must not duplicate history or affect another entry", constraint_ref: "AC-TAR-02 and AC-TAR-06 drafts" }
      traces_to: [OBJ-TAR-002, OBJ-TAR-003]
      threshold: { status: quantified, value: "1 resolved record per operation identity; 0 cross-entry effects", reason: "" }
      verification: "Repeat the same operation and replay it against duplicate-text entries with distinct identities."
      architectural_significance: "Identity and retry behavior constrain the state/event contract."
      priority: high
    - id: DRV-TA-TAR-004
      kind: constraint
      statement: "Display text is write-only evidence for humans and never an input to core transitions or assertions."
      origin: { stakeholder: "maintainer", concern: "Eliminate the shared root cause of prose parsing", constraint_ref: "Human prohibition on regex or text inference" }
      traces_to: [OBJ-TAR-003]
      threshold: { status: binary, value: "No text-dependent state decision", reason: "" }
      verification: "Static scan plus trap-word and Unicode fixtures demonstrate invariant outcomes across text mutations."
      architectural_significance: "This is the hard boundary that prevents a sixth prose-parsing defect."
      priority: high
    - id: DRV-TA-TAR-005
      kind: constraint
      statement: "Readers accept every tracked legacy report without migration while writers produce only the approved forward shape."
      origin: { stakeholder: "developer", concern: "Backward compatibility without historical rewrite", constraint_ref: "CR-008 compatibility contract" }
      traces_to: [OBJ-TAR-002]
      threshold: { status: quantified, value: "14/14 tracked reports load; 0 exact-text changes", reason: "" }
      verification: "Load the tracked report corpus and compare every opaque legacy text field byte-for-byte."
      architectural_significance: "The reader/writer boundary determines whether the repair can ship without bulk migration."
      priority: high
landscape:
  applicable: false
  reason: "The defect remains inside one existing CLI/runtime boundary and moves no integration seam."
  question_answered: ""
  render_format: drawio
  view_axis: system
  quality_checks: []
  manual_steps: []
  produced_by: architecture-modeling
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
    - { id: M-01, applicable: true, reason: "", name: "Objective traceability", formula: "drivers tracing to >=1 objective / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-TA-TAR-001..005" }
    - { id: M-02, applicable: false, reason: "Objective block is owned by /sa.", name: "Objective support", formula: "objectives supported by >=1 driver / total objectives", value: "N/A", threshold: "100%", calibration: uncalibrated, evidence: "SA objective block" }
    - { id: M-03, applicable: true, reason: "", name: "Driver provenance", formula: "anchored drivers / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "origin fields on DRV-TA-TAR-001..005" }
    - { id: M-04, applicable: true, reason: "", name: "NFR quantification", formula: "quantified drivers / numerically meaningful drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "DRV-TA-TAR-001,002,003,005; binary DRV-TA-TAR-004 excluded" }
    - { id: M-05, applicable: true, reason: "", name: "Verification coverage", formula: "drivers with verification / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "verification fields on DRV-TA-TAR-001..005" }
    - { id: M-06, applicable: true, reason: "", name: "Handoff coverage", formula: "drivers mapped to >=1 handoff / total drivers", value: "5/5 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "handoff.to_dev and handoff.to_qc" }
    - { id: M-07, applicable: true, reason: "", name: "Open-item ownership", formula: "owned s03 items / total s03 items", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "stop_condition OQ-TAR-001,002,004,005" }
    - { id: M-08, applicable: false, reason: "s01 does not choose implementation options.", name: "Option discipline", formula: "choices with rejected alternative / total choices", value: "N/A", threshold: "100%", calibration: uncalibrated, evidence: "No direction choice in s01" }
    - { id: M-09, applicable: false, reason: "No landscape is required.", name: "Landscape element ownership", formula: "owned elements / total elements", value: "N/A", threshold: "100%", calibration: uncalibrated, evidence: "landscape.applicable=false" }
    - { id: M-10, applicable: false, reason: "Capability ownership is the SA system-boundary lens.", name: "Capability ownership clarity", formula: "capabilities with one owner / total capabilities", value: "N/A", threshold: "100%", calibration: uncalibrated, evidence: "SA DRV-SA-TAR-002" }
handoff:
  to_ba: { applicable: false, reason: "owned by /sa", items: [] }
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Design inside DRV-TA-TAR-001..005 after OQ-TAR-001, OQ-TAR-002, OQ-TAR-004, and OQ-TAR-005 are resolved."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Verify rejection, atomicity, idempotency, no-text-inference traps, and the 14-report compatibility corpus."
  to_devops: { applicable: false, reason: "No deployment, promotion, or release gate is in this work item.", items: [] }
stop_condition:
  met: true
  reason: "Technical constraints and measurable scenarios are explicit; mechanism choices remain in s03/s05."
  pushed_to_s03:
    - { question: "See OQ-TAR-001 for legacy-entry identity assignment.", owner: "developer and qc" }
    - { question: "See OQ-TAR-002 for operation boundary and atomicity.", owner: "developer" }
    - { question: "See OQ-TAR-004 for collection coverage.", owner: "developer and qc" }
    - { question: "See OQ-TAR-005 for compatibility and schema versioning.", owner: "developer and qc" }
```

## Work Item Materialization
```yaml
materialization_status: READY
decision_owner: "agent"
raw_request_summary: "Prevent terminal completion while unresolved state entries exist; require explicit opaque identifier disposition; preserve exact original text in append-only resolved-state history; prohibit semantic inference."
split_decision: single
dedup_result: no_conflict
work_item_slug: "terminal-archive-legacy-state-reconciliation"
work_item_type: BUG
delivery_context: brownfield
sdd_preset: "strict"
selected_profile: "strict"
sdd_mode: none
sdd_escalation_reasons: []
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
change_strategy: create_new
change_id: "CR-009"
decision_reason:
  - "split_decision=single"
  - "work_item_type=BUG"
  - "delivery_context=brownfield"
  - "dedup_result=no_conflict"
  - "change_strategy=create_new"
  - "planning_track=full"
  - "governance_profile=strict"
  - "sdd_preset=strict"
  - "selected_profile=strict"
  - "sdd_mode=none"
  - "sdd_escalation_reasons="
existing_refs: []
blockers: []
```

## Work Item Protocol
```yaml
protocol_status: MATERIALIZED
approval_status: PENDING_REVIEW
review_required: true
artifact_shape: adaptive_v1
request_lane: maintenance
workflow_required: true
routing_reasons:
  - "LANE_MAINTENANCE"
escalation_reasons: []
role_applicability:
  - "{\"role\":\"developer\",\"reasons\":[\"ROLE_DEVELOPER_BOUNDED_CHANGE\"]}"
  - "{\"role\":\"qc\",\"reasons\":[\"ROLE_QC_DOD_VERIFICATION\"]}"
gate_applicability:
  - "{\"gate\":\"task_plan\",\"reasons\":[\"GATE_TASK_PLAN_BOUNDED_CHANGE\"],\"reviewer_roles\":[\"developer\"]}"
  - "{\"gate\":\"dod\",\"reasons\":[\"GATE_DOD_TECHNICAL_CLOSEOUT\"],\"reviewer_roles\":[\"qc\"]}"
work_item_slug: "terminal-archive-legacy-state-reconciliation"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/terminal-archive-legacy-state-reconciliation/work-items/terminal-archive-legacy-state-reconciliation"
current_step: "s01"
granted_write_paths: []
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: create_new
change_id: "CR-009"
decision_owner: "agent"
protocol_owner: ""
reviewed_by: ""
reviewed_at: ""
handoff_target: "human-review"
last_transition_action: "materialize"
last_transition_at: "2026-09-16T07:24:26.062Z"
required_actions:
  - {"id":"se:6ee5e91f9895141bedc6ec73409d18cbc52d86cef1ab943cb4e41bc4bf5bc0f9","kind":"workflow_followup","text":"wfc change-item approve --change-id CR-009 --reviewed-by <role>"}
  - {"id":"se:e4d1b1b3b3c9fc2a684bb772fef07f569db8f57d44564fd9dcc9084ab91aad88","kind":"workflow_followup","text":"wfc work-item approve --work-item terminal-archive-legacy-state-reconciliation --reviewed-by <role>"}
  - {"id":"se:a1618872daacea133445e05562123bbabad1261b3d8841adb89ceeab80d3d988","kind":"gate_approval","text":"wfc gate approve --work-item terminal-archive-legacy-state-reconciliation --gate task_plan --reviewed-by developer","gate":"task_plan"}
  - {"id":"se:de24ce9b0f5e308bd1d3e574f073236c79b6ec089f9abccbfc6d0c5df7366c44","kind":"work_item_activation","text":"wfc work-item activate --work-item terminal-archive-legacy-state-reconciliation --step s07 --write-root <path>"}
blockers: []
review_notes: []
refs:
  - "work-items/terminal-archive-legacy-state-reconciliation"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "CHANGE_CREATED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
```

## Traceability
```yaml
source_inputs:
  - "User approval in chat on 2026-09-16"
  - "changes/CR-008/archive-metadata.md#Branch Finish Audit"
  - "changes/CR-008/execution/task-status.md#Status"
  - "work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.work-item-report.json"
requirement_ids:
  - "F-CR008-ARCH-001"
  - "AC-TAR-01..AC-TAR-10 (draft)"
architecture_driver_ids:
  - "DRV-SA-TAR-001..004"
  - "DRV-TA-TAR-001..005"
change_ref: "CR-009"
next_step: "s02 Business Goal after Maintainer seals work-item and change-package approvals"
```

## Handoff
- Clear: one linked BUG; terminal archive rejects active blockers; disposition is ID-only; exact text survives in resolved history; no text inference.
- Pending: OQ-TAR-001..006 and every downstream authoring gate.
- Step 2 condition: Maintainer reviews this source-of-truth artifact and seals both the CR-009 and work-item receipts.
