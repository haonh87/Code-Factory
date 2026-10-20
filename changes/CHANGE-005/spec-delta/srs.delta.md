---
change_id: "CHANGE-005"
artifact_kind: "spec-delta-srs"
status: approved
linked_work_items:
  - "add-diagram-design-adapter"
---

# SRS Delta - CHANGE-005

## Delta
```yaml
base_spec_ref: "skills/architecture/architecture-modeling/references/model-contract.md; skills/architecture/architecture-modeling/references/render-routing.md; skills/architecture/architecture-modeling/references/quality-contract.md"
adds:
  - id: "FR-001"
    statement: "The behavioral contract accepts presentation intent only after the requesting role, audience profile, declared question, canonical model and view references, source_fact_ids, destination reference, and requested first-release formats are present."
  - id: "FR-002"
    statement: "SA and TA output a presentation request and emit no diagram artifact, canonical model mutation, renderer selection, or solution decision."
  - id: "FR-003"
    statement: "The presentation lane fails closed when the canonical model or view is missing, ownership is unresolved, destination is invalid, source_fact_ids are incomplete, or requested content is not represented by canonical facts."
  - id: "FR-004"
    statement: "A successful result identifies a separate presentation artifact ID, exactly one presentation render owner, canonical source, audience, declared question, complete source_fact_ids, output references, and validation evidence references."
  - id: "FR-005"
    statement: "The presentation lane may select, group, label, and restyle canonical facts for the chosen audience, but it must not add, reverse, merge, or reinterpret a fact or relationship into a different architecture meaning."
  - id: "FR-006"
    statement: "The mandatory output set is one self-contained static HTML primary artifact plus SVG and PNG exports; SVG and HTML retain accessible names and descriptions, and PNG is handed off with an accessible HTML or SVG counterpart."
  - id: "FR-007"
    statement: "The first-release path performs no arbitrary URL onboarding or fetched-page interpretation, requires no remote asset to convey meaning, and emits no unapproved script or active content."
  - id: "FR-008"
    statement: "The upstream capability identity is repository cathrynlavery/diagram-design at commit 5f1b6ddc66036554dd68701798bd12aa5e3ef3f9 and capability manifest digest sha256:97c4979fcbb92f4b0e1af8ef6fa79728ed2fa9cffccf838c6a0fa2e11738de96."
  - id: "FR-009"
    statement: "Any dependency content, commit, capability, license, or update change requires a new digest, capability/security review, compatibility evidence, and the applicable human gate receipt; default-branch tracking and auto-update are rejected."
  - id: "FR-010"
    statement: "Whichever distribution option s05 selects must support isolated install, update, disable, and rollback checks and restore the previous canonical/runtime baseline without modifying canonical architecture artifacts."
  - id: "FR-011"
    statement: "No CHANGE-004-owned SA/TA path or overlapping runtime surface may be implemented or activated until CHANGE-004 is verified and its resulting baseline has been re-read."
  - id: "NFR-001"
    statement: "100% of visible architecture facts and relationships map to canonical source_fact_ids, with zero unsupported or contradictory semantic content."
  - id: "NFR-002"
    statement: "100% of representative reviewers identify the canonical artifact, derivative purpose, and artifact owner correctly."
  - id: "NFR-003"
    statement: "At least 18 of 20 binary-scored representative reader tasks answer the declared question correctly, with 10 tasks for each approved audience profile and zero semantic contradictions."
  - id: "NFR-004"
    statement: "100% of representative HTML/SVG/PNG output sets pass the applicable packaged static, accessibility, security, and semantic checks with zero blocking findings."
  - id: "NFR-005"
    statement: "Presentation layout variation is allowed; semantic comparison is deterministic and pixel equality is never used as a release criterion."
  - id: "NFR-006"
    statement: "Supported source/runtime and install/update/disable/rollback scenarios have zero parity diff and 100% pass evidence before Release review."
updates: []
removes: []
```

## Behavioral Contract
```yaml
contract_id: "diagram-design-presentation-adapter-v1"
contract_kind: "public skill behavior"
source_of_truth: "changes/CHANGE-005/spec-delta/srs.delta.md"
implementation_location: "DEFERRED_TO_S05"
review_owner_role: "developer"
request:
  required_fields:
    - "requesting_role: SA|TA"
    - "audience_profile: AUD-BUSINESS|AUD-ENGINEERING"
    - "declared_question"
    - "canonical_model_ref"
    - "canonical_view_ref"
    - "source_fact_ids"
    - "destination_ref"
    - "requested_formats"
  allowed_formats: ["HTML", "SVG", "PNG"]
  primary_format: "HTML"
result:
  states: ["ACCEPTED", "REJECTED"]
  accepted_fields:
    - "presentation_artifact_id"
    - "render_owner"
    - "canonical_source_ref"
    - "audience_profile"
    - "declared_question"
    - "source_fact_ids"
    - "output_refs"
    - "validation_evidence_refs"
  rejected_fields:
    - "rejection_reasons"
    - "blocking_input_refs"
fail_closed_conditions:
  - "canonical model or requested view missing"
  - "source_fact_ids empty, missing, unknown, or incomplete"
  - "presentation artifact ID or render ownership unresolved or duplicated"
  - "destination missing, outside granted scope, or colliding with a canonical artifact"
  - "requested content introduces or contradicts a canonical fact or relationship"
  - "requested format is outside HTML, SVG, or PNG"
  - "request attempts arbitrary URL onboarding, remote instruction interpretation, or unapproved active content"
  - "dependency identity does not match the pinned commit and digest"
  - "request would touch CHANGE-004-owned or unverified overlapping runtime paths"
semantic_comparison:
  required_fact_coverage: "100%"
  allowed_semantic_diff_count: 0
  layout_variation_allowed: true
  pixel_equality_required: false
accessibility_contract:
  html_svg: "accessible name and description are required"
  png: "must be delivered with an equivalent accessible HTML or SVG artifact"
security_contract:
  arbitrary_url_fetch_count: 0
  unapproved_active_content_count: 0
  required_remote_assets_for_meaning: 0
```

## Reader Review Protocol
```yaml
protocol_id: "READER-TASK-001"
profiles:
  - id: "AUD-BUSINESS"
    representative_role: "business decision-maker"
    task_count: 10
    question_focus: "decision, boundary, ownership, or risk named by the request"
  - id: "AUD-ENGINEERING"
    representative_role: "engineering reviewer"
    task_count: 10
    question_focus: "systems, relationships, ownership, or constraints named by the request"
reviewer_independence: "Reviewer does not generate the evaluated derivative."
source_of_truth_check: "Every representative reviewer identifies the canonical artifact, derivative purpose, and owner correctly."
scoring: "Each task is binary correct/incorrect against canonical facts and the declared question."
pass_rule: ">=18/20 correct tasks, 2/2 source-of-truth checks correct, and 0 semantic contradictions."
observed_baseline: "NOT_MEASURED; this is a verification protocol and target, not an achieved result."
```

## Dependency Evidence
```yaml
repository: "https://github.com/cathrynlavery/diagram-design.git"
commit: "5f1b6ddc66036554dd68701798bd12aa5e3ef3f9"
capability_scope: "skills/diagram-design"
file_count: 155
manifest_digest: "sha256:97c4979fcbb92f4b0e1af8ef6fa79728ed2fa9cffccf838c6a0fa2e11738de96"
license: "MIT"
plugin_capabilities: ["Read", "Write"]
version_observation:
  plugin_manifest: "2.5.6"
  skill_metadata: "2.4"
  governing_identity: "commit plus manifest digest"
update_rule: "No auto-update; repeat provenance, capability, security, compatibility, and gate review for every changed identity."
distribution_mechanism: "DEFERRED_TO_S05_OPTION_ANALYSIS"
evidence_ref: "work-items/add-diagram-design-adapter/add-diagram-design-adapter.s03.open-questions.md#Main Artifact"
```

## Contract Review State
```yaml
review_state: "APPROVED"
gate_status: "APPROVED_PENDING_TRUSTED_RECEIPT"
required_reviewer_role: "developer"
spec_review_support: "ba"
reviewed_by:
  - "developer"
reviewed_at: "2026-08-21T07:40:03Z"
notes:
  - "This contract fixes observable behavior and failure rules but does not select the implementation location, dependency distribution mechanism, stack, package layout, or release version."
  - "No API, database, event, deployment, or UX contract is introduced."
```
