---
artifact_id: "stabilize-architecture-skill-bundle.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "stabilize-architecture-skill-bundle"
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
change_id: "CHANGE-002"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
  - "changes/CHANGE-002/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CHANGE-002/spec-delta/brd.delta.md"
  srs: "changes/CHANGE-002/spec-delta/srs.delta.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "developer"
  - "ba"
  - "qc"
  - "devops"
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
    - "ba"
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
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-14T14:40:17Z"
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
  - "step-goal-contract"
  - "skill-creator"
  - "ci-cd-release"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "stabilize-architecture-skill-bundle.s04.acceptance-criteria.md"
linked_artifacts:
  - "changes/CHANGE-002/design.md"
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
  - "changes/CHANGE-002/spec-delta/srs.delta.md"
  - "product-specs/cards/architecture-role-skills.md"
  - "work-items/architecture-role-skills/architecture-role-skills.s06.task-breakdown.md"
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Use the existing canonical-source/runtime-sync architecture, add one self-contained
> `architecture-modeling` skill with a deterministic mxGraph drawio path, and harden the existing
> installer and evidence validators with narrow, test-first changes. No new runtime dependency,
> service, or framework is introduced.

## Step Contract
```yaml
step: "s05 Technical Approach"
goal: "Lock the smallest technical direction that satisfies AC-001 through AC-010 without changing the bundle's canonical-source model or bypassing human release controls."
value: "The implementation plan can name exact ownership boundaries, failure guards, compatibility checks, and rollback evidence without re-inventing the design."
scope_in:
  - "Managed-path permission recovery for repeat install and update"
  - "sa/ta contract and documentation corrections"
  - "Semantic workflow evidence and protocol-state validation"
  - "Canonical architecture-modeling skill with conditional drawio ownership"
  - "Runtime synchronization, v2.4.0 consistency, package verification, and release controls"
scope_out:
  - "Registry publication or global installation before Release approval"
  - "A general-purpose graph layout engine"
  - "A new architecture repository, service, framework, or external converter"
  - "Changes to unrelated workflow behavior or user-owned dirty files"
inputs_required:
  - "Approved s04 artifact and digest-bound Spec, Contract, and DoR receipts"
  - "CHANGE-002 BRD and SRS deltas"
  - "Current v2.3.2 installer, validator, runtime sync, audit, and release code"
  - "Read-only architecture-modeling candidate and the prior D1/D2 drawio spike evidence"
outputs_required:
  - "Option analysis with one recommended and two rejected directions"
  - "Component, interface, failure, compatibility, rollback, and observability design"
  - "Architecture-modeling render ownership and helper contracts"
  - "Release artifact and approval-control design"
done_when:
  - "The recommended option covers every approved acceptance criterion"
  - "The no-house and house presentation paths have exactly one render owner"
  - "Managed and unmanaged install paths are unambiguously separated"
  - "The first-open visual check and immutable release artifact controls have named owners"
  - "A developer can approve or reject the approach without implementation evidence"
constraints:
  hard_constraints:
    - "skills/ remains canonical and both runtime trees remain generated"
    - "Node.js 18+ and the existing zero-dependency runtime remain sufficient"
    - "Only managed paths may have permissions or contents changed by install, update, or rollback"
    - "Historical trusted approval identity and timestamps are not fabricated or rewritten"
    - "No s07 production change begins before Approach and Task Plan trusted receipts"
  soft_constraints:
    - "Reuse existing validator utilities and the proven D1 geometry rather than opening a new abstraction"
  prohibited_actions:
    - "Editing the untracked .claude/skills/architecture-modeling candidate in place"
    - "Adding an external drawio, Structurizr conversion, or graph-layout dependency"
    - "Treating XML structure alone as first-open visual evidence"
  compliance_checks:
    - "Strict Technical Approach checklist"
    - "Brownfield smallest-correct-delta rule"
    - "Human-controlled Approach, Task Plan, Release, Business Acceptance, and DoD gates"
risks:
  - id: "S05-R01"
    description: "A permission helper could recursively touch unmanaged siblings."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Resolve destinations from managed-skill state and explicit managed policy/state files, and assert unmanaged hashes before and after."
    contingency: "Reject the installer batch and restore the isolated v2.3.2 managed snapshot."
    owner: "developer"
    status: MONITORING
  - id: "S05-R02"
    description: "A valid mxGraph file may still open with poor visual geometry."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Combine deterministic geometry checks with a QC-owned first-open draw.io inspection before Release."
    contingency: "Block Release; do not substitute Mermaid for landscape or integration views."
    owner: "qc"
    status: MONITORING
  - id: "S05-R03"
    description: "Generic placeholder detection could reject legitimate prose."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Apply semantic checks only to required fields and finalized gate-host sections, with valid and invalid fixtures."
    contingency: "Narrow the field rule while retaining the failing reviewed fixture."
    owner: "developer"
    status: MONITORING
timebox:
  target_duration: "90 minutes"
  deadline: ""
  escalation_rule: "Return to s04 through a recorded CHANGE-002 spec delta if implementation planning reveals a contract conflict; do not weaken an acceptance threshold in s06."
```

## Option Analysis
```yaml
goal: "Close all v2.3.2 findings and add a release-safe architecture-modeling lane without changing the bundle's fundamental packaging model."
ba_lane:
  business_goal: "Restore trust that a clean or upgraded bundle has the capabilities, evidence, and public claims advertised by v2.4.0."
  user_scenarios:
    - "A user installs and updates the bundle in Codex or Claude without manual chmod recovery."
    - "An architect requests a landscape with no house renderer and receives a governed drawio artifact."
    - "An architect with a house presentation skill receives one model handoff and one house-owned diagram artifact."
    - "A reviewer rejects finalized workflow evidence that is empty, placeholder-based, stale, or arithmetically inconsistent."
  business_rules:
    - "Exactly one source skill and one render owner exist for each architecture invocation."
    - "Unmanaged content and historical approval facts remain untouched."
    - "Release claims must match the exact package candidate and its verification evidence."
  scope_notes:
    - "One CHANGE-002 and one v2.4.0 corrective release"
    - "No registry publication before the human Release gate"
  open_questions: []
dev_lane:
  repo_constraints:
    - "skills/ is canonical; sync-workflow-bundle-runtime.js fans out to Codex and Claude."
    - "workflow-bundle supports Node.js 18+ and currently has no runtime dependencies."
    - "The architecture-modeling candidate is user-owned, untracked reference material."
    - "The prior D1 spike already produced uncompressed mxGraph XML with passing computed geometry."
  technical_risks:
    - "Managed permission recovery can escape scope if based on broad runtime roots."
    - "Regex-only evidence checks can miss placeholders or create false positives."
    - "A renderer duplicated outside the skill can drift from its contract."
    - "Rebuilding a package after approval can invalidate release evidence."
  integration_points:
    - "workflow-bundle-utils install/update file operations"
    - "workflow governance and work-item protocol validators"
    - "canonical skill tree, runtime sync, manifest, pack audit, and bundle smoke"
    - "npm package candidate and human Release gate"
  nfr_notes:
    - "0 EACCES in four isolated scenarios and 0 unmanaged mutations"
    - "0 source/runtime drift and exactly 41 skills per runtime"
    - "Deterministic drawio geometry with all AC-008 quality counts exposed"
    - "No new runtime dependency or network requirement"
  baseline_context: "Brownfield v2.3.2 bundle with 40 canonical skills, two generated runtimes, a known repeat-update permission defect, incomplete semantic validation, and no bundled architecture-modeling skill."
options:
  - { name: "Option A - Canonical skill with built-in deterministic mxGraph tools", summary: "Canonicalize the candidate under skills/architecture/architecture-modeling, extend its ownership contract, and ship small zero-dependency render and validation scripts inside the skill; keep existing bundle sync and CLI boundaries.", pros: ["Satisfies both render-owner paths", "Reuses D1 and Node.js", "Keeps the public skill self-contained", "Supports deterministic offline tests"], cons: ["Maintains one constrained layout", "Retains a QC first-open check"], risks: ["Scope creep beyond allowlisted landscape and integration views"] }
  - { name: "Option B - Canonicalize the candidate unchanged and always hand off rendering", summary: "Bundle the current text-model skill but require another presentation skill or manual drawing for all diagram-tool output.", pros: ["Smallest file delta", "No renderer code"], cons: ["Clean bundle still cannot emit mandatory drawio", "AC-007 and AC-008 remain open"], risks: ["Release capability claim remains false"] }
  - { name: "Option C - Add an external layout or conversion toolchain", summary: "Generate CSV or Structurizr input and depend on draw.io CLI, Structurizr conversion, or a graph library to create the final artifact.", pros: ["Potentially broader layouts", "Less custom geometry for unconstrained graphs"], cons: ["Adds platform and offline compatibility surfaces", "D2 containment remains unproven"], risks: ["A dependency failure blocks a clean-install capability"] }
recommended_option: "Option A - Canonical skill with built-in deterministic mxGraph tools"
recommendation_reason: "It is the smallest option that satisfies all approved contracts: it preserves the existing source/runtime architecture, requires no new dependency, reuses the proven D1 geometry, and makes render ownership testable in both house and no-house cases."
validation_plan:
  - "Red/green installer tests for Codex and Claude across global and project scopes with hardened managed files and unmanaged digests"
  - "Red/green semantic validator fixtures for reviewed placeholder, stale-digest, coverage, and protocol-state defects"
  - "Skill contract tests for no-house, house-skill, and conflicting/missing render-owner cases"
  - "XML, geometry, containment, intersection, ownership, node-count, delete-test, and manual-step checks for a representative drawio fixture"
  - "Runtime sync, 41-skill inventory, recursive diff, pack audit, smoke, package dry-run, and UTF-8 checks"
notes_for_next_step: "READY for system-design and, after human Approach approval, an execution-oriented s06 plan."
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: "Existing Node.js workflow bundle"
selected_stack:
  - "Existing CommonJS Node.js 18+ scripts"
  - "Uncompressed drawio mxGraph XML"
selected_runtime:
  - "Existing Codex and Claude bundle adapters"
decision_notes:
  - "The change adds a skill and narrow utilities; it does not replace the stack, runtime, deployment model, or application boundary."
  - "No Foundation gate is opened for this brownfield corrective release."
```

## Main Artifact
```yaml
design_problem: "The v2.3.2 bundle has a cross-surface trust gap: managed updates can fail on permissions, sa/ta and workflow evidence can pass despite semantic defects, and the required architecture-modeling/drawio capability is absent from a clean install."
business_rule_trace:
  - "AC-001 and CR-REQ-001 -> permission changes are limited to paths explicitly managed by install state or the active operation."
  - "AC-002, AC-003, and AC-005 -> canonical sa/ta EN/VI contracts are corrected first and then fan out through runtime sync."
  - "AC-004 and AC-010 -> finalized evidence requires populated step-specific semantics plus valid receipts and non-contradictory derived protocol state."
  - "AC-006 through AC-008 -> one canonical architecture-modeling skill owns the model and conditionally owns or hands off drawio rendering."
  - "AC-009 -> one verified v2.4.0 package artifact supplies the release claims and is not rebuilt after approval."
design_options:
  - name: "Built-in deterministic mxGraph tools"
    summary: "Self-contained skill scripts generate and validate constrained landscape/integration drawio views."
    pros: ["no new dependency", "deterministic", "clean-install complete", "runtime-sync compatible"]
    cons: ["bounded custom layout", "manual first-open gate remains"]
    risks: ["scope creep into general diagram layout"]
  - name: "Handoff-only architecture-modeling"
    summary: "Bundle the model contract but require another renderer."
    pros: ["minimal code"]
    cons: ["no-house path incomplete"]
    risks: ["contract and release claim remain false"]
  - name: "External converter or layout dependency"
    summary: "Use another CLI or library for drawio output."
    pros: ["potentially broader layouts"]
    cons: ["new dependency and compatibility surface"]
    risks: ["offline and platform failure"]
rejected_options:
  - name: "Handoff-only architecture-modeling"
    reason: "Rejected because the approved no-house contract requires the clean bundle itself to emit drawio."
  - name: "External converter or layout dependency"
    reason: "Rejected because the existing constrained D1 path is sufficient and avoids a new runtime boundary."
recommended_design: "Implement five focused batches on the existing architecture: managed-path permission recovery; canonical sa/ta corrections; step-specific semantic/protocol validation; a self-contained architecture-modeling skill with conditional render ownership and deterministic mxGraph tools; then generated runtimes and one verified v2.4.0 release candidate."
recommendation_reason: "This design changes only the failing seams, retains the zero-dependency Node runtime and generated-runtime model, and provides direct evidence for every acceptance criterion."
component_changes:
  - "packages/workflow-bundle/scripts/workflow-bundle-utils.js: add reusable owner-write preparation and writable-copy behavior scoped to selected managed skill directories, managed policy files, support-policy source-relative files, and install-state manifests."
  - "packages/workflow-bundle/scripts/workflow-bundle-cli.js: apply the managed mutation boundary consistently to install, update, and skill add/remove flows without changing command syntax."
  - "skills/analysis/sa and skills/analysis/ta: correct YAML, threshold status, ownership, examples, M-01..M-10, counts, coverage, and EN/VI parity at the canonical source only."
  - "packages/workflow-bundle/scripts/validate-workflow-governance.js and workflow-gate-evidence-utils.js: add finalized-step required-field and placeholder semantics using the existing narrow section utilities."
  - "packages/workflow-bundle/scripts/validate-work-item-protocol.js: reject blocker and required-action text that contradicts approved work-item, change, or gate receipts."
  - "packages/workflow-bundle/scripts/audit-workflow-pack.js: add architecture-skill contract, sa/ta metric/ownership, bilingual counterpart, reference, and inventory checks without a general YAML dependency."
  - "skills/architecture/architecture-modeling: add the canonical EN/VI skill, references, agents metadata, normalized model/render ownership contract, and deterministic render/validate scripts."
  - "packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js: retain canonical fan-out and assert per-runtime inventory rather than introducing another source tree."
  - "Bundle tests, smoke fixtures, manifests, README surfaces, release note, and version metadata: update to v2.4.0 and 41 skills only after behavior and contract tests pass."
data_flow:
  - "Canonical source change -> pack audit -> runtime sync -> Codex/Claude runtime copies -> isolated install/update smoke."
  - "Architecture request -> normalized text model -> house-skill detection -> either handoff-only or built-in drawio render -> quality report; only one branch emits a diagram-tool artifact."
  - "Workflow gate note -> step-specific semantic checks -> trusted receipt digest/authority checks -> protocol derived-state checks -> transition decision."
  - "Verified source tree -> npm pack dry-run -> retained candidate tarball and SHA-256 -> human Release approval -> tag/publication of the same artifact."
interface_changes:
  - "No existing wfc command or flag is removed or renamed."
  - "Installer behavior changes so repeat managed writes recover safely from read-only destinations while unmanaged siblings remain untouched."
  - "architecture-modeling adds a public skill contract with model_format, render_format, render_owner, output paths, handoff, and quality evidence fields."
  - "The built-in helper accepts only normalized landscape/integration model input and emits uncompressed mxGraph drawio plus a JSON quality report; unsupported view kinds fail explicitly."
  - "Finalized workflow validation becomes stricter for required step fields, placeholders, coverage arithmetic, stale receipts, and contradictory protocol messages."
failure_modes:
  - scenario: "Permission preparation resolves a broad runtime root instead of a managed target."
    impact: "Unmanaged user files have modes changed."
    guardrail: "Construct an explicit managed-path allowlist from selected skills, source-relative support-policy files, policy destinations, and state files; assert unmanaged hashes and modes."
  - scenario: "A copy or update fails after permissions are opened."
    impact: "A managed target is partially replaced."
    guardrail: "Use isolated test roots, operate per managed target, surface the exact failed path, and verify rollback from a v2.3.2 managed snapshot before release."
  - scenario: "Both architecture-modeling and a house skill emit drawio."
    impact: "Two diagrams drift from one model."
    guardrail: "Resolve render_owner before rendering; validator rejects zero or multiple owners and the built-in helper refuses the house-owned branch."
  - scenario: "Drawio XML parses but has visual overlap or bad containment."
    impact: "The release passes automation with an unusable landscape."
    guardrail: "Block on geometry counters and require QC first-open confirmation against the retained fixture."
  - scenario: "Placeholder validation rejects legitimate narrative text."
    impact: "Valid workflow notes cannot progress."
    guardrail: "Inspect only named required fields in finalized gate-host sections and maintain paired valid/invalid fixtures."
  - scenario: "Release metadata is changed after the package was verified."
    impact: "The approved evidence no longer describes the published artifact."
    guardrail: "Record candidate SHA-256 and rerun digest/status checks; any post-candidate change invalidates the candidate and requires re-verification."
compatibility_impact:
  - "CLI syntax, adapters, workflow step names, and the existing 40 skill paths remain backward compatible."
  - "sa/ta output retains its top-level structure; binary is added as a legal threshold status and lens-owned fields are corrected."
  - "Stricter finalized-note validation can reject artifacts previously accepted without substantive evidence; this is an intentional corrective compatibility change documented in v2.4.0."
  - "architecture-modeling is additive; a detected house presentation skill keeps ownership of its current diagram artifact."
  - "Generated runtime contents change from 40 to 41 skills per mode; install-state handling must accept the new managed skill without deleting unmanaged directories."
rollback_impact:
  - "Before publication, discard the candidate and restore only the isolated v2.3.2 managed snapshot; no live global root is used."
  - "After publication, reinstall the retained v2.3.2 package into a test root first, then restore v2.3.2 managed skills, policies, manifests, and state without deleting unmanaged siblings."
  - "Workflow artifacts created under stricter v2.4.0 validation are not rewritten on rollback; validators may be rolled back, but approval history remains append-only."
  - "A failed first-open drawio check is roll-forward blocked: keep v2.4.0 unpublished and correct the renderer rather than substituting another format."
observability_hooks:
  - "Installer test report records runtime mode, scope, managed target, exit code, EACCES count, and unmanaged before/after digests."
  - "Validator fixtures record the failing rule and artifact path for every rejected semantic defect."
  - "Drawio quality JSON records render owner, model digest, output path, node/edge/container counts, overlaps, intersections, containment errors, ownership gaps, two-way analysis, vague boxes, delete-test failures, and manual steps."
  - "Runtime sync and smoke report bundle version, mode, skill count, and recursive source/runtime drift."
  - "Release evidence records tarball path, filename, package manifest values, SHA-256, tag, required gate receipts, and QC first-open result."
constraints_applied:
  - "Brownfield smallest-correct-delta"
  - "Node.js 18+ zero-dependency runtime"
  - "Canonical source with generated runtimes"
  - "TDD for installer, validator, and renderer behavior changes"
  - "Dedicated worktree for the full, cross-cutting, release-sensitive s07 change"
  - "Spec compliance review before code quality review by implementation batch"
  - "UTF-8 and EN/VI semantic-parity verification"
  - "Human-controlled Approach, Task Plan, Release, Business Acceptance, and DoD gates"
validation_plan:
  - "Run focused red/green tests per behavior batch, then the full workflow-bundle unit suite."
  - "Run workflow, governance, planning, execution, protocol, change, and authoring smoke validators."
  - "Run skill pack audit, runtime sync, recursive diffs, bundle smoke, isolated four-scenario install/update tests, and rollback smoke."
  - "Run architecture-modeling structure, ownership, helper, drawio XML, geometry, containment, and negative-contract fixtures."
  - "Run version/inventory consistency, npm pack dry-run, retained-candidate inspection, SHA-256, text encoding, and whitespace checks."
  - "Require QC to open the representative drawio file before Release approval."
specialized_followups:
  - skill: "skill-creator"
    reason: "Create and validate the public architecture-modeling skill, its metadata, scripts, references, and trigger boundary."
  - skill: "ci-cd-release"
    reason: "Lock the immutable package candidate, staged checks, approvals, tagging, and rollback controls."
  - skill: "worktree-discipline"
    reason: "Isolate the full-track cross-cutting implementation after s06 approval."
  - skill: "implementation"
    reason: "Apply TDD and minimal-delta behavior changes only after the implementation gate opens."
  - skill: "testing"
    reason: "Own AC-ranked verification and the final evidence matrix at s08."
notes_for_next_step: "At s06, split execution into permission, sa/ta, evidence-validator, architecture-modeling, runtime/release, and verification batches; name owned paths, red tests, two-tier review checkpoints, worktree setup, candidate digest, QC visual check, and rollback smoke."
```

## Architecture Details

### Architecture-Modeling Ownership And Drawio Contract
```yaml
canonical_skill_path: "skills/architecture/architecture-modeling"
runtime_paths:
  - "packages/workflow-bundle/runtime/codex/skills/architecture-modeling"
  - "packages/workflow-bundle/runtime/claude/skills/architecture-modeling"
source_policy: "Edit canonical source only; regenerate both runtime copies with sync-workflow-bundle-runtime.js."
candidate_policy: "Read .claude/skills/architecture-modeling as reference input only; do not edit or copy it unchanged."
model_contract:
  source: "One UTF-8 text model with stable IDs, one architecture_state, elements, relationships, gaps, and impacted views."
  view_axes:
    - "Business landscape grouped by domain and free of technical jargon"
    - "Engineering views filtered or grouped from the same model"
  render_formats:
    - "DRAWIO for landscape_by_domain, landscape_by_system, and integration architecture"
    - "MERMAID only for flow and sequence"
    - "STRUCTURIZR_DSL when multiple model-as-code views must stay synchronized"
render_ownership:
  detection: "Resolve applicable house presentation skills and convention conflicts before choosing an emitter."
  no_house_skill: "render_owner=architecture-modeling; invoke the bundled drawio helper."
  house_skill_present: "render_owner=<house-skill>; emit the model and handoff table; do not invoke the bundled drawio helper."
  invalid: "Reject no owner, multiple owners, or a built-in render attempt on a house-owned path."
helper_contract:
  render_entry: "scripts/render-drawio.js"
  validate_entry: "scripts/validate-drawio.js"
  supported_views:
    - "landscape_by_domain"
    - "landscape_by_system"
    - "integration_architecture"
  input: "Normalized JSON projection of the text model, selected view ID, render owner, and output path."
  output: "Uncompressed mxGraph .drawio with stable cell IDs and a JSON quality report linked to the model digest."
  layout: "Domain swimlane containers, systems in a fixed grid with explicit padding/gaps, and orthogonal routed edges using computed waypoints."
  unsupported_behavior: "Fail with an actionable error; do not silently produce Mermaid or an unvalidated generic graph."
quality_gate:
  automated:
    - "valid mxGraph XML and stable model/cell linkage"
    - "100% named ownership and no hidden unknown facts"
    - "0 node/container overlaps"
    - "0 non-endpoint edge/box intersections"
    - "0 containment errors"
    - "0 unanalysed two-way arrows"
    - "0 vague aggregate boxes"
    - "at most 25 engineering elements and the stricter skill-default split at 15 where applicable"
    - "0 delete-test failures"
    - "at most 1 declared manual step"
  manual:
    - "QC opens the retained representative file in draw.io and confirms first-open containment, labels, routing, and usability."
```

### CI/CD Release
```yaml
pipeline_scope: "Build, verify, retain, approve, tag, and optionally publish workflow-bundle v2.4.0 without rebuilding the approved artifact."
source_strategy:
  branch_model: "Dedicated implementation worktree and branch after s06 approval; immutable v2.4.0 tag only after Release approval."
  triggers:
    - "Implementation batch completion"
    - "Pre-release candidate creation"
    - "Human Release approval"
build_and_verify:
  stages:
    - "Focused TDD tests and two-tier batch review"
    - "Full workflow validator and unit suite"
    - "Skill pack audit and generated-runtime drift checks"
    - "Isolated install, update, rollback, and bundle smoke"
    - "Architecture-modeling contract, drawio geometry, and QC first-open checks"
    - "Version/inventory/doc consistency and package inspection"
  cache_strategy:
    - "Use an isolated npm cache for package verification; cache is not release evidence."
  required_checks:
    - "AC-001 through AC-010 evidence matrix"
    - "UTF-8 and whitespace checks"
    - "No unrelated dirty-file modifications"
artifact_flow:
  registry: "Git tag and release artifact are mandatory; npm registry publication is optional and remains disabled until the Release gate names the target."
  artifact_types:
    - "workflow-bundle npm tarball"
    - "SHA-256 digest and package-content inventory"
    - "v2.4.0 release note and verification evidence"
  tagging_strategy:
    - "Immutable v2.4.0 tag"
    - "No latest tag as source of truth"
  provenance_controls:
    - "Create the tarball once after all source checks pass"
    - "Record the exact commit, filename, SHA-256, manifest version, runtime skill counts, and package contents"
    - "Invalidate and rebuild the candidate if any tracked source changes"
promotion_flow:
  - from: local
    to: dev
    conditions:
      - "Focused and full automated checks pass in the isolated worktree"
    automation_level: "automated candidate build"
  - from: dev
    to: uat
    conditions:
      - "Same candidate SHA-256 passes package inspection, install/update/rollback smoke, and QC first-open drawio review"
    automation_level: "automated evidence with human QC review"
  - from: uat
    to: prod
    conditions:
      - "Release receipt is APPROVED by an authorized devops or qc reviewer"
      - "Business Acceptance and DoD receipts pass when required"
      - "The promoted artifact SHA-256 equals the reviewed candidate"
    automation_level: "human-controlled tag/publication"
approval_controls:
  - "Approach and Task Plan approvals before implementation"
  - "QC first-open evidence before Release review"
  - "Release approval before tag, registry publication, or live global update"
  - "Business Acceptance and DoD remain independent gates"
release_controls:
  pre_release:
    - "All ten acceptance criteria have evidence and no open release blocker"
    - "Version and inventory values are v2.4.0 and 41 skills per runtime everywhere"
    - "Candidate digest matches the reviewed artifact"
  post_release:
    - "Run status and clean-install smoke against the released artifact in isolated Codex and Claude roots"
    - "Record any publication reference without modifying historical approvals"
rollback_controls:
  - "Retain the exact v2.3.2 package or source reference and a managed-file inventory"
  - "Test downgrade in isolated roots before release"
  - "Restore managed content only; preserve unmanaged siblings and approval history"
  - "If a candidate changes after review, invalidate approval evidence and rebuild rather than patching the tarball"
pipeline_risks:
  - "The eventual npm registry target is intentionally not selected before the Release gate."
  - "A manual first-open check is required because geometry automation cannot prove draw.io rendering behavior."
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: "s06 must name exact commands and evidence paths. s07/s08 may build and retain the candidate but must not tag, publish, or update global installations before Release approval."
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "workflow-bundle managed install/update utilities and CLI orchestration"
  - "workflow governance, gate-evidence, protocol, pack-audit, runtime-sync, smoke, and version tooling"
  - "canonical sa and ta skill trees"
  - "new canonical architecture-modeling skill and both generated runtime copies"
  - "bundle manifests, package metadata, public docs, and release notes"
compatibility_risks:
  - "Previously accepted evidence-free finalized notes may now fail validation"
  - "Permission recovery could affect unmanaged content if path resolution is wrong"
  - "New architecture-modeling fields could drift between EN and VI variants"
  - "A runtime regenerated from dirty or stale canonical source could publish inconsistent copies"
migration_notes:
  - "No application, database, or user-data migration is required."
  - "Existing install state is reused; v2.4.0 adds architecture-modeling to the managed selection when installing all skills and preserves explicit subsets on update."
  - "Corrective workflow notes reference CHANGE-002 and receive new reviews; historical v2.3.2 receipt facts remain unchanged."
rollback_notes:
  - "Rollback is a managed-file restore to v2.3.2 in isolated roots, followed by status, inventory, and unmanaged-digest checks."
  - "Do not delete broad skills or policy roots and do not rewrite historical workflow artifacts."
```

## Traceability
```yaml
upstream:
  - "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s04.acceptance-criteria.md"
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
  - "changes/CHANGE-002/spec-delta/srs.delta.md"
  - "work-items/architecture-role-skills/architecture-role-skills.s06.task-breakdown.md"
acceptance_mapping:
  AC-001: "managed-path permission recovery and four-scenario regression suite"
  AC-002: "sa/ta fenced-YAML and threshold schema corrections"
  AC-003: "lens ownership and distinct example corrections"
  AC-004: "step-specific semantic validator and negative fixtures"
  AC-005: "M-01..M-10 recomputation and audit assertions"
  AC-006: "canonical architecture-modeling plus runtime sync and 41-skill inventory"
  AC-007: "conditional single-render-owner contract and two ownership fixtures"
  AC-008: "D1 mxGraph helper, automated quality report, and QC first-open gate"
  AC-009: "one verified v2.4.0 candidate with consistent docs and metadata"
  AC-010: "CHANGE-002 correction trace, new receipts, and protocol contradiction checks"
next_step: "s06 Task Plan after a developer reviews this artifact and an Approach trusted receipt matches its final digest"
```

## Audit
```yaml
step: "s05 Technical Approach"
status: PASS
checks:
  - criterion: "The recommended option covers every approved acceptance criterion"
    result: PASS
    evidence: "Traceability maps AC-001 through AC-010 to explicit design components and validation paths."
  - criterion: "The no-house and house presentation paths have exactly one render owner"
    result: PASS
    evidence: "Architecture Details defines mutually exclusive no_house_skill, house_skill_present, and invalid ownership outcomes."
  - criterion: "Managed and unmanaged install paths are unambiguously separated"
    result: PASS
    evidence: "Main Artifact limits mutation to selected managed skills, source-relative managed policies, policy destinations, and state files, with unmanaged hash/mode assertions."
  - criterion: "The first-open visual check and immutable release artifact controls have named owners"
    result: PASS
    evidence: "QC owns the first-open gate; CI/CD Release records the retained candidate digest and the devops/qc Release authority."
  - criterion: "A developer can approve or reject the approach without implementation evidence"
    result: PASS
    evidence: "Options, recommendation, component/interface boundaries, failures, compatibility, rollback, observability, and validation are all specified while status remains draft."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "The approach was completed in the current authoring session; no timebox breach was observed."
gaps:
  - "The digest-bound Approach trusted receipt is still pending."
risk_level: MEDIUM
next_action: "Seal the trusted Approach receipt against this finalized artifact before authoring s06."
```

Audit conclusion: **PASS with human developer approval recorded; s06 remains closed until the trusted receipt passes.**

## Handoff
- Recommended option: canonical `architecture-modeling` plus its own deterministic mxGraph renderer/validator, using the existing canonical-to-runtime fan-out.
- Accepted trade-off: maintain a deliberately constrained landscape/integration layout and retain one QC first-open check instead of adding a general external layout engine.
- Condition for step 6: a human developer reviews the final s05 note, its `gate_reviews.approach_*` fields are sealed, and `wfc gate approve --gate approach` returns `APPROVED` with `digest_match=true`.
- Deployment note: this is a package release, not a runtime deployment; tag, publication, and live global updates remain closed until Release approval.
