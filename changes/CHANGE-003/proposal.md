---
change_id: "CHANGE-003"
artifact_kind: "change-proposal"
status: approved
decision_owner: "agent"
review_required: true
approval_status: APPROVED
reviewed_by: "po"
reviewed_at: "2026-08-17T14:42:39.211Z"
materialization_ref: "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s07.implementation.md"
request_summary: "Resolve T7-F1 by adding the deferred artifact-governance bundle registration to active P2 through an approved spec change, with a new release identity and preserved historical release evidence."
defect_source: "n/a"
spec_impact_classified: true
review_notes:
  - "Human review approved this change package."
linked_work_items:
  - "artifact-governance-enforcement"
---

# Change Proposal - CHANGE-003

> [!summary]
> P2 implemented and verified the artifact-governance runtime behavior, but its generated bundle
> now contains the already-authored skill while five release-contract tests still assert the
> frozen v2.4.0 inventory of 41 skills. This proposal adds the deferred registration and release
> delta to P2 without rewriting the approved s04 note or the historical v2.4.0 release record.

## Summary
```yaml
problem: "T7-F1 leaves the repository-wide unit gate red: canonical source and both generated runtimes contain 42 skills, while five release tests and current release surfaces are sealed to the v2.4.0 inventory of 41. P2 s01 carried bundle registration forward, but its approved s04 explicitly excluded release, version bump, and inventory registration."
intent: "Approve a narrow spec change that lets active P2 finish the deferred artifact-governance registration as a new additive release, restore the aggregate unit gate, and keep v2.4.0 and v2.3.2 historical facts intact."
change_scope: "Add artifact-governance EN/VI completeness, register it as managed skill 42 in both runtimes, assign a new release identity, align current package/public surfaces and release tests, prove install/update/rollback behavior, and require fresh Release and Business Acceptance gates before publication."
recommended_release_target: "v2.5.0"
recommendation_reason: "The bundle gains a public managed skill; this is additive capability, not a patch to the already approved v2.4.0 artifact."
impact_areas:
  - "artifact-governance canonical and generated skill content"
  - "Codex and Claude managed-skill inventory and recursive parity"
  - "workflow-bundle version, manifest, package metadata, README, publish surface, and new release note"
  - "release, parity, install-all, update, rollback, and exact-artifact tests"
  - "P2 verification, DoD, Release, and Business Acceptance evidence"
affected_specs:
  - "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s04.acceptance-criteria.md"
  - "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s07.implementation.md#T7-F1"
  - "work-items/artifact-governance-model/artifact-governance-model.s01.restate.md#phase_plan"
  - "changes/CHANGE-002/spec-delta/srs.delta.md#CR-REQ-009"
in_scope:
  - "Supersede only P2's exclusions for artifact-governance bundle registration and the release/version work required to make that registration truthful"
  - "Keep the current inventory exactly 42 in canonical source, Codex runtime, and Claude runtime, with recursive managed-source parity"
  - "Add the missing artifact-governance Vietnamese sibling content required by its declared skill contract"
  - "Update current release surfaces and tests for v2.5.0 and 42 skills"
  - "Prove v2.5.0 to v2.4.0 rollback as 42 to 41 while preserving unmanaged content"
  - "Re-run the full P2 and release verification matrix and collect fresh human-controlled release gates"
out_of_scope:
  - "Editing the frozen v2.4.0 release note to claim 42 skills"
  - "Changing the v2.3.2 historical inventory of 40 or its original evidence"
  - "Publishing to a registry, creating a tag, or updating live global installations before Release approval"
  - "P4 repository-root/docs taxonomy migration or unrelated workflow defects"
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
    - id: OBJ-001
      statement: "Return the repository-wide bundle verification gate to green."
      measure: "36 of 36 workflow-bundle unit test files pass, including the five T7-F1 files."
      source: "T7-F1 verification evidence"
      confidence: stated
    - id: OBJ-002
      statement: "Make artifact-governance available as a truthful managed bundle capability."
      measure: "42 skills exist in canonical source and both runtimes; artifact-governance is present and byte-equivalent in both."
      source: "P1 sequencing constraint and P2 carried scope"
      confidence: stated
    - id: OBJ-003
      statement: "Preserve the audit truth of already-approved releases."
      measure: "v2.4.0 remains documented at 41 skills, v2.3.2 remains 40, and zero historical approved artifacts are rewritten."
      source: "Human-controlled gate policy and CHANGE-002 evidence"
      confidence: inferred
drivers:
  applicable: true
  reason: ""
  items:
    - id: SA-DRV-001
      kind: system_boundary
      statement: "The canonical skill tree remains the single source of truth; Codex and Claude runtimes are generated consumers, not independent owners."
      origin: { stakeholder: "bundle maintainer", concern: "runtime drift", constraint_ref: "existing runtime generation contract" }
      traces_to: [OBJ-001, OBJ-002]
      threshold: { status: quantified, value: "1 canonical owner; recursive runtime diff count = 0", reason: "" }
      verification: "Count canonical/runtime inventories and recursively compare managed files."
      architectural_significance: "Changing the ownership direction would create three competing inventories."
      priority: high
    - id: SA-DRV-002
      kind: constraint
      statement: "An additive public skill requires a release identity distinct from the frozen v2.4.0 candidate."
      origin: { stakeholder: "release owner", concern: "artifact identity and historical truth", constraint_ref: "immutable release evidence" }
      traces_to: [OBJ-002, OBJ-003]
      threshold: { status: binary, value: "new semantic version and immutable candidate digest", reason: "" }
      verification: "Assert version consistency across current surfaces and prove the v2.4.0 release note remains unchanged."
      architectural_significance: "Reusing v2.4.0 would assign two different inventories to one release identity."
      priority: high
    - id: SA-DRV-003
      kind: data_ownership
      statement: "Historical release notes own historical counts; current package metadata owns the new candidate count."
      origin: { stakeholder: "QC and adopters", concern: "rollback and audit evidence must remain interpretable", constraint_ref: "append-only approval history" }
      traces_to: [OBJ-003]
      threshold: { status: quantified, value: "0 conflicting counts for each release identity", reason: "" }
      verification: "Run release-surface assertions partitioned by release version."
      architectural_significance: "Without version-scoped ownership, mechanically replacing 41 with 42 fabricates history."
      priority: high
landscape:
  applicable: false
  reason: "One package and one generated-runtime boundary are involved; no cross-system ownership decision needs a landscape."
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
    - { id: M-01, name: "Objective traceability", formula: "drivers tracing to objectives / total drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "SA-DRV-001..003 traces_to" }
    - { id: M-02, name: "Objective support", formula: "supported objectives / total objectives", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "OBJ-001..003 each referenced" }
    - { id: M-03, name: "Driver provenance", formula: "anchored drivers / total drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "all origin blocks" }
    - { id: M-04, name: "NFR quantification", formula: "quantified drivers / drivers where a number is meaningful", value: "2/2 = 100%; one binary driver excluded", threshold: "100%", calibration: uncalibrated, evidence: "SA-DRV-001 and SA-DRV-003 quantified" }
    - { id: M-05, name: "Verification coverage", formula: "drivers with verification / total drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "all verification fields" }
    - { id: M-06, name: "Handoff coverage", formula: "drivers mapped to downstream blocks / total drivers", value: "3/3 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "handoff items below" }
    - { id: M-07, name: "Open-item ownership", formula: "owned s03 items / total s03 items", value: "1/1 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "release target decision owned by PO" }
    - { id: M-08, name: "Option discipline", formula: "direction choices with a rejected alternative / total direction choices", value: "not applicable at driver analysis; s05 owns option choice", threshold: "100%", calibration: uncalibrated, evidence: "no direction selected by SA" }
    - { id: M-09, name: "Landscape element ownership", formula: "owned elements / total elements", value: "not applicable: no landscape", threshold: "100%", calibration: uncalibrated, evidence: "landscape.applicable=false" }
    - { id: M-10, name: "Capability ownership clarity", formula: "capabilities with one owner / total capabilities", value: "2/2 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "canonical inventory and version-scoped release evidence each have one owner" }
handoff:
  to_ba:
    applicable: true
    reason: ""
    items:
      - "Turn 42/42/42 parity, version-scoped release truth, and historical immutability into delta acceptance criteria."
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Preserve canonical-to-runtime ownership and do not rewrite frozen release evidence."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Verify all three objectives and partition count assertions by release identity."
  to_devops:
    applicable: false
    reason: "owned by /ta"
    items: []
stop_condition:
  met: false
  reason: "Drivers are complete; the PO must accept or reject the proposed v2.5.0 release identity."
  pushed_to_s03:
    - { question: "Approve v2.5.0 as the release identity for the 42-skill additive bundle?", owner: "po" }
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
      statement: "Inventory generation must be deterministic and recursively equal across canonical, Codex, and Claude trees."
      origin: { stakeholder: "developer and QC", concern: "a release can pass count checks while bytes drift", constraint_ref: "runtime parity contract" }
      traces_to: [OBJ-001, OBJ-002]
      threshold: { status: quantified, value: "42/42/42 skills; recursive diff count = 0", reason: "" }
      verification: "Run runtime parity, pack audit, package dry-run, and exact-artifact smoke."
      architectural_significance: "Generated runtime drift would make installed behavior mode-dependent."
      priority: high
    - id: TA-DRV-002
      kind: quality_attribute
      statement: "Install and update must preserve unmanaged content in every supported mode and scope."
      origin: { stakeholder: "bundle adopter", concern: "adding skill 42 must not overwrite local customizations", constraint_ref: "managed-file boundary" }
      traces_to: [OBJ-002]
      threshold: { status: quantified, value: "4/4 Codex/Claude x global/project cases pass; unmanaged hash and mode changes = 0", reason: "" }
      verification: "Run isolated install-all and update smoke with before/after snapshots."
      architectural_significance: "The new inventory is delivered through the installer and therefore exercises its ownership boundary."
      priority: high
    - id: TA-DRV-003
      kind: quality_attribute
      statement: "Rollback must restore the preceding immutable bundle without deleting unmanaged state."
      origin: { stakeholder: "release owner", concern: "the additive skill must be reversible", constraint_ref: "known-good artifact rollback" }
      traces_to: [OBJ-002, OBJ-003]
      threshold: { status: quantified, value: "v2.5.0 to v2.4.0 passes 4/4; managed count 42 to 41; unmanaged changes = 0", reason: "" }
      verification: "Install the retained v2.5.0 candidate, roll back with the retained v2.4.0 artifact, and compare snapshots."
      architectural_significance: "A rollback test tied only to counts could silently use the wrong artifact."
      priority: high
    - id: TA-DRV-004
      kind: integration
      statement: "The verified package artifact is the only object eligible for promotion after human Release approval."
      origin: { stakeholder: "devops and QC", concern: "source changes after testing invalidate release evidence", constraint_ref: "immutable artifact promotion" }
      traces_to: [OBJ-001, OBJ-003]
      threshold: { status: quantified, value: "1 candidate tarball; 1 recorded SHA-256; 0 post-verification mutations", reason: "" }
      verification: "Record package inventory and digest, then reject publication if source or digest changes."
      architectural_significance: "Rebuilding during promotion breaks the link between test evidence and released bytes."
      priority: high
landscape:
  applicable: false
  reason: "No integration boundary moves; this delta changes one package's immutable artifact flow."
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
    - { id: M-01, name: "Objective traceability", formula: "drivers tracing to objectives / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "TA-DRV-001..004 traces_to" }
    - { id: M-02, name: "Objective support", formula: "owned objectives supported / total owned objectives", value: "not applicable: objectives owned by SA", threshold: "100%", calibration: uncalibrated, evidence: "objectives.applicable=false" }
    - { id: M-03, name: "Driver provenance", formula: "anchored drivers / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "all origin blocks" }
    - { id: M-04, name: "NFR quantification", formula: "quantified drivers / drivers where a number is meaningful", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "all threshold blocks" }
    - { id: M-05, name: "Verification coverage", formula: "drivers with verification / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "all verification fields" }
    - { id: M-06, name: "Handoff coverage", formula: "drivers mapped to downstream blocks / total drivers", value: "4/4 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "handoff items below" }
    - { id: M-07, name: "Open-item ownership", formula: "owned s03 items / total s03 items", value: "0/0; no technical question remains", threshold: "100%", calibration: uncalibrated, evidence: "stop_condition.pushed_to_s03=[]" }
    - { id: M-08, name: "Option discipline", formula: "direction choices with a rejected alternative / total direction choices", value: "not applicable at driver analysis; s05 owns option choice", threshold: "100%", calibration: uncalibrated, evidence: "no direction selected by TA" }
    - { id: M-09, name: "Landscape element ownership", formula: "owned elements / total elements", value: "not applicable: no landscape", threshold: "100%", calibration: uncalibrated, evidence: "landscape.applicable=false" }
    - { id: M-10, name: "Capability ownership clarity", formula: "technical capabilities with one owner / total capabilities", value: "2/2 = 100%", threshold: "100%", calibration: uncalibrated, evidence: "runtime generation and artifact promotion have one owner each" }
handoff:
  to_ba:
    applicable: false
    reason: "owned by /sa"
    items: []
  to_dev:
    applicable: true
    reason: ""
    items:
      - "Keep runtime generation deterministic at 42/42/42 and preserve the managed/unmanaged boundary."
      - "Treat the verified tarball and digest as immutable after candidate creation."
  to_qc:
    applicable: true
    reason: ""
    items:
      - "Require 36/36 unit files, 42/42/42 parity, 4/4 install/update, and 4/4 rollback evidence."
  to_devops:
    applicable: true
    reason: ""
    items:
      - "Promote only the verified semantic-versioned tarball after Release approval; rollback only to the retained v2.4.0 artifact."
stop_condition:
  met: true
  reason: "The technical constraint envelope is complete; release-version authority remains the SA/PO question."
  pushed_to_s03: []
```

## Release Control Proposal
```yaml
pipeline_scope: "Build, verify, retain, and human-promote one v2.5.0 workflow-bundle package; no registry publication is authorized by this proposal alone."
source_strategy:
  branch_model: "Continue on the existing isolated P2 worktree and merge only after DoD."
  triggers:
    - "CHANGE-003 approval opens delta authoring and implementation."
    - "A verified source state creates exactly one candidate artifact."
build_and_verify:
  stages:
    - "pre-merge: syntax, full unit, workflow validators, fixtures, pack audit, and bundle smoke"
    - "build-publish: npm pack to a retained local candidate, without registry publication"
    - "pre-release: exact-artifact install/update/rollback matrix, inventory, digest, and human gates"
  cache_strategy:
    - "Do not reuse an older tarball or mutate the candidate after verification."
  required_checks:
    - "36/36 unit files"
    - "42/42/42 inventory and recursive parity"
    - "4/4 install/update and 4/4 v2.5.0-to-v2.4.0 rollback"
    - "UTF-8 and release-surface consistency"
artifact_flow:
  registry: "Not selected; registry publication is out of scope until Release approval."
  artifact_types:
    - "workflow-bundle-v2.5.0 npm tarball"
  tagging_strategy:
    - "semantic version v2.5.0"
    - "recorded SHA-256 bound to verification evidence"
  provenance_controls:
    - "record source commit, package inventory, version, and digest"
    - "invalidate the candidate after any tracked source mutation"
promotion_flow:
  - from: local
    to: prod
    conditions:
      - "DoD APPROVED"
      - "Release APPROVED by qc or devops"
      - "Business Acceptance APPROVED by po"
      - "candidate SHA-256 matches verification evidence"
    automation_level: "manual human-controlled publication"
approval_controls:
  - "CHANGE-003 approval before implementation scope expands"
  - "Independent delta Contract/DoR, Approach, and Task Plan approvals"
  - "DoD, Release, and Business Acceptance before publication"
release_controls:
  pre_release:
    - "No tag, registry publication, or live global update before all gates pass."
    - "Promote the exact verified tarball, never a rebuilt artifact."
  post_release:
    - "Clean-install smoke for Codex and Claude and confirm 42 skills."
    - "Confirm published version and digest resolve to the approved candidate."
rollback_controls:
  - "Known-good rollback target is the retained immutable v2.4.0 artifact at 41 skills."
  - "Trigger rollback on install/update smoke failure, digest mismatch, or runtime inventory/parity failure."
  - "Preserve unmanaged hashes and modes during rollback."
pipeline_risks:
  - "Publishing under v2.4.0 would assign two inventories to one immutable release identity."
  - "Rebuilding after approval would sever provenance between tests and released bytes."
pipeline_recommendation: BLOCKED
notes_for_implementation_or_ops: "Blocked only on human approval of CHANGE-003 and the downstream gates; the artifact and rollback contracts are otherwise explicit."
```

## Decision
```yaml
status: draft
owner: "po"
reviewers:
  - "ba"
  - "developer"
  - "qc"
  - "devops"
requested_decision:
  - "Approve CHANGE-003 as a spec change attached to artifact-governance-enforcement."
  - "Approve v2.5.0 as the new release identity for the 42-skill additive bundle."
  - "Keep implementation blocked until this proposal has a trusted APPROVED receipt."
independent_downstream_gates:
  - "Contract/DoR for the delta"
  - "Approach and Task Plan for the delta"
  - "DoD, Release, and Business Acceptance after verification"
```
