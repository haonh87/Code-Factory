---
artifact_id: "add-diagram-design-adapter.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "add-diagram-design-adapter"
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
change_id: "CHANGE-005"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-005/spec-delta/brd.delta.md"
  - "changes/CHANGE-005/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CHANGE-005/spec-delta/brd.delta.md"
  srs: "changes/CHANGE-005/spec-delta/srs.delta.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["po", "ba", "developer", "qc", "devops"]
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
  spec: ["ba"]
  contract: ["developer"]
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: ["devops", "qc"]
  business_acceptance: ["po"]
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-21T08:42:34Z"
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
  - "step-goal-contract"
  - "brainstorming"
  - "system-design"
  - "deployment-devops"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "add-diagram-design-adapter.s04.acceptance-criteria.md"
linked_artifacts:
  - "changes/CHANGE-005/design.md"
  - "changes/CHANGE-005/spec-delta/brd.delta.md"
  - "changes/CHANGE-005/spec-delta/srs.delta.md"
  - "work-items/add-diagram-design-adapter/add-diagram-design-adapter.s03.open-questions.md"
  - "work-items/add-diagram-design-adapter/add-diagram-design-adapter.work-item-report.json"
tags: ["agent-ops", "workflow/s05"]
---

# Step 5 - Technical Approach

> [!summary]
> The human approved APPROACH-005-A as Developer. The first-party presentation adapter vendors the reviewed, commit-pinned diagram-design capability inside one managed skill; SA and TA only declare intent, architecture-modeling remains the canonical model/view owner, and the adapter emits a separately identified, fail-closed HTML/SVG/PNG derivative. The source note is finalized, but s06 remains closed until a trusted Approach receipt matches this exact content.

## Step Contract
~~~yaml
step: "s05 Technical Approach"
goal: "Select the smallest correct and reversible adapter approach while preserving the approved contract, canonical architecture ownership, SA/TA boundaries, and strict release controls."
value: "Developer, QC, and DevOps receive a reviewable boundary, data flow, failure model, compatibility plan, and validation direction before execution tasks are authorized."
scope_in:
  - "Resolve OQ-005 through option analysis."
  - "Lock adapter, ownership, output, provenance, packaging, runtime, security, accessibility, and rollback boundaries."
  - "Define an atomic fail-closed realization of diagram-design-presentation-adapter-v1."
scope_out:
  - "Production skills, runtime copies, tests, vendored files, dependencies, or generated artifacts."
  - "File-level execution order and write grants, which belong to s06."
  - "Any human-controlled gate approval."
inputs_required:
  - "Approved BRD/SRS deltas and trusted Spec, Contract, and DoR receipts."
  - "OQ-009-DIGEST-001."
  - "Current SA, TA, architecture-modeling, skill discovery, runtime sync, parity, and lifecycle baselines."
outputs_required:
  - "Option analysis and recommendation."
  - "Technical boundary, data flow, failure model, brownfield impact, rollback, deployment, and validation strategy."
done_when:
  - "The option meets AC-001 through AC-011 without weakening the approved contract."
  - "Canonical and presentation ownership are distinct and deterministic."
  - "Pinned provenance is reproducible without a second discoverable skill or runtime network access."
  - "PNG prerequisites and atomic no-partial-output behavior are explicit."
  - "No implementation permission is implied."
constraints:
  hard:
    - "SA/TA do not draw, model, select a renderer, or choose a solution."
    - "architecture-modeling owns the canonical model and governed views."
    - "HTML is primary; SVG and PNG are mandatory for ACCEPTED."
    - "Semantic fact coverage is 100% and normalized semantic diff is zero."
    - "No arbitrary URL fetch, auto-update, global install, remote required asset, or unapproved active content."
    - "Overlapping s07 paths wait for CHANGE-004 VERIFIED plus baseline re-read."
  prohibited:
    - "No competing canonical renderer."
    - "No nested discoverable upstream SKILL.md."
    - "No automatic browser installation."
    - "No partially published output set."
risks:
  - id: "S05-RISK-001"
    description: "A vendored upstream SKILL.md is recursively discovered as a second skill."
    severity: "HIGH"
    mitigation: "Store it under a non-discoverable evidence filename, retain a logical original-path map, and test exactly one new skill."
    owner: "developer"
    status: "DESIGN_MITIGATED"
  - id: "S05-RISK-002"
    description: "The mandatory PNG exporter is absent from the current local reference environment."
    severity: "HIGH"
    mitigation: "Require a version-pinned, pre-provisioned Playwright/Chromium toolchain and preflight it before staging."
    contingency: "REJECT the request and emit no output set; keep Release blocked."
    owner: "devops/developer"
    status: "OPEN_RELEASE_BLOCKER"
  - id: "S05-RISK-003"
    description: "Upstream export behavior may introduce remote font imports."
    severity: "HIGH"
    mitigation: "Use inline CSS/system fonts and reject external references, imports, scripts, handlers, and active content."
    owner: "developer/security"
    status: "DESIGN_MITIGATED"
  - id: "S05-RISK-004"
    description: "Presentation simplification may change canonical meaning."
    severity: "HIGH"
    mitigation: "Bind visible semantic items to source_fact_ids and compare a normalized derivative manifest before publication."
    owner: "developer/qc"
    status: "DESIGN_MITIGATED"
  - id: "S05-RISK-005"
    description: "CHANGE-004 may change shared SA/TA or runtime surfaces."
    severity: "HIGH"
    mitigation: "Make verified status and baseline re-read an activation precondition."
    owner: "developer/devops"
    status: "OPEN_ACTIVATION_BLOCKER"
timebox:
  target_duration: "One design pass and one Developer review"
  escalation_rule: "If the full formats/offline/semantic/rollback contract requires wider scope, return through a governed spec change."
~~~

## Upstream Gate Evidence
~~~yaml
trusted_receipts:
  spec:
    status: "APPROVED"
    reviewed_by: "ba"
    reviewed_at: "2026-08-21T07:45:25.934Z"
  contract:
    status: "APPROVED"
    reviewed_by: "developer"
    reviewed_at: "2026-08-21T07:45:42.342Z"
  dor:
    status: "APPROVED"
    reviewed_by: "qc"
    reviewed_at: "2026-08-21T07:45:57.051Z"
artifact_digest: "sha256:d6a4b4236c517e355a91e0f30e201de8a0c529fbb9d223aea2b24e1ef4c763bd"
digest_match: true
implementation_path_open: false
~~~

## Option Analysis
~~~yaml
goal: "Add the pinned presentation capability without changing canonical ownership, requiring runtime network access, or creating an unmanaged lifecycle."
criteria:
  - "Complete approved fail-closed/offline HTML/SVG/PNG contract."
  - "One presentation owner and unchanged canonical ownership."
  - "Reproducible pinned identity with no silent update."
  - "Managed install, update, disable, rollback, and Codex/Claude parity."
  - "Smallest operational surface."
options:
  - "A: First-party adapter with vendored pinned capability"
  - "B: Pinned external checkout during install/build"
  - "C: Separately installed upstream plugin with local glue"
option_details:
  A:
    shape:
      - "One new managed adapter skill owns the derivative contract."
      - "The reviewed 155-file upstream capability is stored with original bytes, license, provenance, and logical paths."
      - "The upstream root SKILL.md uses a non-discoverable stored filename and maps back to its original path for digest verification."
      - "Existing recursive bundle packaging supplies Codex and Claude."
    strengths:
      - "Offline, pinned, reviewable, reversible, and compatible with the current lifecycle."
      - "Exactly one public adapter skill is discoverable."
      - "No install-time or invocation-time repository fetch."
    weaknesses:
      - "Adds approximately 2.1 MB and 155 provenance-scoped upstream files."
      - "Updates are deliberately manual and require renewed review."
    verdict: "RECOMMENDED"
  B:
    strengths: ["Smaller repository delta."]
    weaknesses:
      - "Adds network, availability, cache, and supply-chain behavior to installation."
      - "Makes parity and rollback harder to prove."
    verdict: "REJECTED"
    reason: "Expands trust and operational surfaces without improving an approved outcome."
  C:
    strengths: ["Closest to upstream distribution."]
    weaknesses:
      - "Separate user/runtime version, permission, enable/disable, and update lifecycle."
      - "Cannot guarantee one reviewed identity, one owner, or runtime parity."
    verdict: "REJECTED"
    reason: "Does not meet the managed identity, ownership, parity, and rollback contract."
recommended_option: "A"
why: "A is the smallest option satisfying every mandatory criterion through the existing managed bundle."
accepted_trade_offs:
  - "Approximately 2.1 MB/155 logical upstream files in source and package."
  - "Manual reviewed updates only."
  - "External but explicit and pre-provisioned browser prerequisite for PNG."
~~~

## Foundation Decision
~~~yaml
status: "NOT_APPLICABLE"
solution_class: "Additive managed skill and contract extension"
selected_stack: ["Existing Node.js and workflow-bundle tooling"]
selected_runtime: ["Existing managed Codex and Claude skill runtimes"]
decision_notes:
  - "No application stack, runtime model, deployment platform, or canonical renderer is replaced."
  - "The browser exporter is a capability prerequisite, not a new application platform."
~~~

## Recommended Approach
~~~yaml
approach_id: "APPROACH-005-A"
recommended_approach: "Introduce diagram-design-presentation-adapter as the sole first-party presentation-derivative skill; vendor the reviewed upstream capability as non-discoverable resources; reuse existing SA/TA fields; add a post-canonical architecture-modeling handoff; stage, validate, and atomically publish self-contained HTML, SVG, and PNG."
owns:
  - "Presentation request/result validation."
  - "Audience-aware styling of an approved canonical fact subset."
  - "Derivative staging, validation, metadata, and atomic publication."
  - "Vendored upstream provenance and update evidence."
does_not_own:
  - "SA/TA drivers or architecture decisions."
  - "Canonical model/view construction or Draw.io/Mermaid/Structurizr rendering."
  - "Browser installation, arbitrary retrieval, or upstream update."
  - "Workflow gates."
~~~

## Architecture And Ownership
~~~yaml
components:
  - id: "C-SA-TA"
    responsibility: "Capture role, audience intent, declared question, and constraints without rendering."
    delta: "Instruction/reference only; reuse invocation.directives_parsed, landscape.question_answered, and handoff fields."
    schema_change: false
  - id: "C-ARCH-MODEL"
    responsibility: "Own canonical model/view and assemble a presentation request only after facts, view, and canonical ownership validate."
    delta: "Optional presentation_derivative handoff/result outside canonical render_plan."
  - id: "C-ADAPTER"
    responsibility: "Validate, render, export, verify, and return ACCEPTED or REJECTED."
    delta: "One bilingual managed skill with references, provenance resources, allowlisted helpers, and tests."
  - id: "C-UPSTREAM"
    responsibility: "Pinned diagram-design knowledge/assets/scripts as reviewed resources."
    delta: "155 logical files; stored root SKILL.md is renamed to prevent discovery."
  - id: "C-BUNDLE"
    responsibility: "Recursively copy the adapter to Codex and Claude and preserve lifecycle behavior."
    delta: "No root manifest schema or package-manager change."
ownership:
  canonical_model_owner: "architecture-modeling"
  canonical_render_owner: "Existing render_plan resolution remains unchanged."
  presentation_owner: "diagram-design-presentation-adapter"
  artifact_identity: "Presentation ID differs from every canonical ID."
  disabled_behavior: "Canonical behavior remains complete and unchanged."
candidate_s06_paths:
  - "skills/architecture/diagram-design-presentation-adapter/**"
  - "skills/analysis/sa/**"
  - "skills/analysis/ta/**"
  - "skills/architecture/architecture-modeling/**"
  - "packages/workflow-bundle/test/**"
  - "runtime/codex/skills/** and runtime/claude/skills/** through existing sync only"
explicit_non_touch:
  - "No CHANGE-004-owned path before its VERIFIED baseline re-read."
  - "No canonical generated artifact, database, API, event, container, platform, or pipeline."
~~~

## Contract Realization
~~~yaml
contract: "diagram-design-presentation-adapter-v1"
flow:
  - order: 1
    actor: "SA/TA"
    action: "Record intent and question in existing fields; emit no diagram or renderer decision."
  - order: 2
    actor: "architecture-modeling"
    action: "Validate canonical model/view and source_fact_ids, then assemble an optional derivative request."
  - order: 3
    actor: "adapter preflight"
    action: "Validate request fields, unique owner/ID, destination, formats, provenance, CHANGE-004 guard, and exporters."
    failure: "REJECT before creating destination output."
  - order: 4
    actor: "adapter"
    action: "Create static HTML with inline SVG/CSS in isolated staging, derive SVG and PNG from the same validated offline source."
    failure: "Abort the entire staged set."
  - order: 5
    actor: "validators"
    action: "Validate semantic trace, inventory, provenance, accessibility, static security, offline behavior, and hashes."
    failure: "REJECT and publish nothing."
  - order: 6
    actor: "publisher"
    action: "Atomically move the complete validated set to destination and return ACCEPTED metadata."
outputs:
  - "Self-contained HTML primary"
  - "Standalone SVG"
  - "PNG with equivalent accessible HTML/SVG"
  - "Manifest binding request, canonical refs, fact IDs, output hashes, and evidence"
atomicity: "No destination output is visible until every format and mandatory validator passes."
~~~

## Output, Security, And Semantics
~~~yaml
html:
  shape: "Static HTML with inline SVG and CSS"
  scripts_allowed: false
  font_policy: "System-font stack or reviewed embedded assets; no import or remote font URL."
svg:
  shape: "Standalone export with inline approved styles and no external dependency"
png:
  source: "Same validated offline HTML/SVG"
  runtime: "Approved, version-pinned, pre-provisioned Playwright plus Chromium-compatible browser"
  auto_install: false
accessibility:
  - "HTML/SVG accessible name and description."
  - "Visible non-canonical label, canonical reference, and owner."
  - "PNG always paired with accessible HTML/SVG."
semantic_binding:
  attribute: "data-source-fact-id on every visible semantic node/relationship"
  decorative_rule: "Explicitly marked and carries no architecture meaning."
  expected_set: "Canonical subset in request source_fact_ids."
  comparison: "IDs, relationship endpoints/direction, meaningful labels, ownership, boundary, constraint, and state."
  pass_rule: "100% coverage; zero added, removed, reversed, merged, or contradictory meaning."
  pixel_equality: false
reject_static_content:
  - "script or executable payload"
  - "event handler"
  - "external URL, CSS import, or remote asset"
  - "arbitrary URL onboarding or fetched instructions"
  - "unapproved active/embedded content"
~~~

## Dependency And Provenance
~~~yaml
identity:
  repository: "https://github.com/cathrynlavery/diagram-design.git"
  commit: "5f1b6ddc66036554dd68701798bd12aa5e3ef3f9"
  scope: "skills/diagram-design"
  logical_file_count: 155
  logical_bytes: 2113085
  digest: "sha256:97c4979fcbb92f4b0e1af8ef6fa79728ed2fa9cffccf838c6a0fa2e11738de96"
  license: "MIT"
  capabilities: ["Read", "Write"]
storage:
  root: "skills/architecture/diagram-design-presentation-adapter/resources/upstream/diagram-design/"
  bytes: "Preserve imported bytes and all 155 logical files."
  discovery_guard: "Store logical skills/diagram-design/SKILL.md under a non-SKILL.md evidence filename."
  path_map: "Map stored name back to original logical path for digest verification."
  digest_scope: "Exclude adapter-authored wrappers and metadata."
verification:
  - "Reconstruct logical path list in bytewise order and recompute sha256-manifest-v1."
  - "Check commit, key files, license, capabilities, count, and approved aggregate digest."
  - "Assert one new discoverable adapter skill and zero vendored skills."
update:
  auto_update: false
  default_branch_tracking: false
  required: "New identity/digest plus capability, security, compatibility, parity, lifecycle, and human-gate review."
~~~

## Runtime, Deployment, And Rollback
~~~yaml
scope: "Managed workflow-bundle packaging only"
containerization: "NOT_APPLICABLE"
platform_deployment: "NOT_APPLICABLE"
pipeline_change: "NOT_REQUIRED_BY_APPROACH"
package_flow:
  source: "skills/architecture/diagram-design-presentation-adapter"
  codex: "runtime/codex/skills/architecture/diagram-design-presentation-adapter"
  claude: "runtime/claude/skills/architecture/diagram-design-presentation-adapter"
  mechanism: "Existing recursive runtime sync"
  manifest_schema_change: false
environment_matrix:
  local_source:
    purpose: "TDD, provenance, contracts, static scans, and runtime generation."
    png_status: "BLOCKED: Playwright and Chromium were not found in the inspected environment."
  dev_isolated:
    purpose: "Lifecycle and negative-preflight tests in temporary managed homes."
  uat_candidate:
    purpose: "Parity, offline three-format smoke, security/accessibility, and rollback rehearsal."
  prod_managed:
    purpose: "Install only after Release approval; fail closed if prerequisite preflight fails."
config_secrets:
  new_secret: false
  remote_credential: false
activation_guards:
  - "Approach and Task Plan receipts."
  - "CHANGE-004 VERIFIED and baseline re-read."
  - "Pinned digest and one-skill discovery pass."
  - "Pinned browser prerequisite passes in supported environments."
  - "Codex/Claude parity and lifecycle smoke pass."
rollback:
  unit: "Adapter skill, managed copies, and adapter tool configuration."
  action: "Disable/remove through existing managed lifecycle and restore prior inventory."
  invariants:
    - "No canonical or SA/TA behavior change."
    - "No partial derivative survives failure."
    - "Previous inventory restored with zero parity diff."
release_readiness:
  verdict: "BLOCKED"
  blockers:
    - "Approach and Task Plan are not approved."
    - "CHANGE-004 checkpoint has not passed."
    - "PNG toolchain is absent locally and not yet pinned/proven."
    - "Implementation, verification, Release, and Business Acceptance evidence do not exist."
  owner: "devops/qc"
~~~

## Brownfield Impact Analysis
~~~yaml
impacted_modules:
  - module: "SA/TA"
    delta: "Presentation-intent guidance via existing fields."
    compatibility: "No schema or authority change."
  - module: "architecture-modeling"
    delta: "Optional post-canonical derivative lane."
    compatibility: "Canonical formats and owner resolution unchanged."
  - module: "workflow bundle"
    delta: "One additional recursively packaged managed skill."
    compatibility: "No manifest schema/dependency change."
  - module: "verification"
    delta: "Provenance, offline output, browser preflight, parity, and lifecycle evidence."
risks:
  - "Nested skill discovery."
  - "Competing ownership."
  - "Optional-field consumer regression."
  - "Large-resource parity drift."
  - "PNG-only partial success."
migration:
  - "No data, schema, API, event, or canonical-artifact migration."
  - "No presentation request means current behavior."
  - "Disable/rollback returns to pre-CHANGE-005 inventory."
baseline_recheck:
  timing: "Before s07 path grant."
  evidence:
    - "CHANGE-004 is VERIFIED."
    - "Post-change SA/TA/runtime baseline was read."
    - "Contract, AC, Approach, and Plan remain compatible or were re-reviewed."
~~~

## Failure Model
~~~yaml
failure_modes:
  - id: "FM-001"
    condition: "Vendored upstream skill is discoverable."
    response: "Fail inventory/package validation."
  - id: "FM-002"
    condition: "Pinned path/bytes/license/commit/digest mismatch."
    response: "Reject dependency and require reviewed update."
  - id: "FM-003"
    condition: "Invalid request, owner, destination, facts, format, or sequencing."
    response: "REJECT before staging."
  - id: "FM-004"
    condition: "Browser prerequisite missing or fails to launch."
    response: "REJECT with prerequisite evidence and publish zero outputs."
  - id: "FM-005"
    condition: "Remote/active content or accessibility blocker."
    response: "Reject staged set."
  - id: "FM-006"
    condition: "Semantic diff is nonzero."
    response: "Reject and name affected fact IDs."
  - id: "FM-007"
    condition: "An export or atomic move fails."
    response: "Remove staging, restore prior destination, publish nothing."
  - id: "FM-008"
    condition: "Source/runtime/candidate/rollback parity differs."
    response: "Block Release and restore prior runtime."
evidence:
  - "Request validation reason codes."
  - "Commit/digest verification."
  - "Exporter identities/preflight."
  - "Semantic expected/observed/diff counts."
  - "Security/accessibility findings."
  - "Output hashes and commit/abort state."
  - "Parity and lifecycle results."
~~~

## Validation Strategy
~~~yaml
tdd:
  required: true
  reason: "Public skill behavior, validation, routing, and failure behavior change."
  cycle: "Focused failing test, smallest implementation, passing test, then early two-tier review."
lanes:
  - covers: ["AC-001", "AC-010"]
    evidence: "Four SA/TA-audience fixtures, zero prohibited actions, and CHANGE-004 path guard."
  - covers: ["AC-002", "AC-003"]
    evidence: "Positive request/result tests and one negative fixture per fail-closed condition, including absent PNG tool."
  - covers: ["AC-004", "AC-005"]
    evidence: "Canonical byte diff zero, distinct ownership/labels, fact coverage 100%, semantic diff zero."
  - covers: ["AC-006", "AC-011"]
    evidence: "HTML/SVG/PNG inventory, offline smoke, no-network/static security, accessibility, PNG preflight, atomic failure."
  - covers: ["AC-007"]
    evidence: "READER-TASK-001 at s08: 2/2 source checks, >=18/20 tasks, zero contradiction."
  - covers: ["AC-008"]
    evidence: "155-file digest/commit/license/capability verification and exactly one new discoverable skill."
  - covers: ["AC-009", "AC-011"]
    evidence: "Codex/Claude recursive parity and isolated install/update/disable/rollback/release-candidate smokes."
  - covers: ["AC-010", "AC-011"]
    evidence: "Workflow/change/plan validators, pack audit, JSON/YAML, UTF-8, review, and trusted receipts."
review_order:
  - "Spec compliance against Contract, AC, Approach, path grants, and sequencing."
  - "Code quality including security, determinism, atomicity, maintainability, and performance heuristic."
release_block: "Any missing mandatory format/evidence, blocking finding, provenance mismatch, parity diff, lifecycle failure, or missing receipt keeps the applicable gate blocked."
~~~

## Governance
~~~yaml
status: "ALIGNED"
checks:
  option_analysis: "PASS: three viable distribution directions compared; smallest correct option selected."
  spec_contract: "PASS: formats, fail-closed behavior, semantics, ownership, security, provenance, and rollback preserved."
  brownfield: "PASS: additive/removable; existing schema, routing, and behavior preserved."
  dependency: "PASS: pinned vendoring, digest verification, no update/network, and renewed identity review."
  release: "PASS: PNG, CHANGE-004, verification, and human blockers are visible."
  authority: "PASS: Human Developer approval is recorded; the trusted receipt and all downstream gates remain independent."
exceptions: []
waivers: []
blocking_approach_review: []
blocking_implementation:
  - "Approach receipt."
  - "Execution-oriented Task Plan and receipt."
  - "CHANGE-004 VERIFIED baseline checkpoint."
~~~

## Spec Change Assessment
~~~yaml
status: "NOT_REQUIRED"
reason: "The approach realizes the approved contract without changing scope, formats, thresholds, ownership, or failure semantics."
reopen_if:
  - "PNG cannot be supported in any approved runtime."
  - "Logical-path provenance cannot reproduce the approved digest."
  - "Implementation requires an unapproved schema, canonical-renderer, network, plugin, or platform boundary."
~~~

## Audit
~~~yaml
step: "s05 Technical Approach authoring"
status: "PASS"
checks:
  - "PASS: Option A is the smallest direction meeting every mandatory criterion."
  - "PASS: Boundary, ownership, flow, and failure behavior are deterministic."
  - "PASS: Brownfield impact, rollback, CHANGE-004 guard, and PNG blocker are explicit."
  - "PASS: Every AC maps to an executable evidence lane."
  - "PASS: Developer approval came from the human; no implementation path is self-declared."
constraint_violations: []
unmitigated_high_risks:
  - "PNG runtime is absent locally; this blocks Release rather than Approach review because fail-closed behavior and provisioning evidence are mandatory."
risk_level: "MEDIUM"
next_action: "Seal a trusted Approach receipt against this finalized artifact; only a matching receipt may open s06."
~~~

## Traceability
~~~yaml
chains:
  - requirements: ["BR-001", "BR-002", "FR-001", "FR-002"]
    acceptance: ["AC-001", "AC-002"]
    design: ["C-SA-TA", "C-ARCH-MODEL", "flow 1-3"]
  - requirements: ["BR-004", "BR-006", "FR-004", "FR-005", "NFR-001", "NFR-005"]
    acceptance: ["AC-004", "AC-005"]
    design: ["ownership", "semantic_binding", "C-ADAPTER"]
  - requirements: ["BR-003", "FR-006", "FR-007", "NFR-004"]
    acceptance: ["AC-006"]
    design: ["output contract", "flow 4-6", "FM-004/005/007"]
  - requirements: ["BR-005", "NFR-002", "NFR-003"]
    acceptance: ["AC-007"]
    design: ["READER-TASK-001 lane"]
  - requirements: ["BR-007", "FR-008", "FR-009", "FR-010", "NFR-006"]
    acceptance: ["AC-008", "AC-009", "AC-011"]
    design: ["Option A", "provenance", "runtime/rollback"]
  - requirements: ["BR-008", "FR-011"]
    acceptance: ["AC-003", "AC-010"]
    design: ["activation guards", "baseline recheck", "FM-003"]
resolved_question:
  id: "OQ-005"
  selected_option: "A"
next_step: "s06 only after a trusted Approach receipt is bound to this finalized Developer-approved artifact"
~~~

## Handoff
- Recommended option: APPROACH-005-A, a first-party adapter with pinned upstream resources.
- Accepted trade-off: approximately 2.1 MB/155 logical files, manual updates, and pre-provisioned PNG browser tooling.
- Developer approval: APPROACH-005-A approved by the human at 2026-08-21T08:42:34Z; seal a matching trusted Approach receipt before entering s06.
- Enter s07 later only after the Task Plan receipt, CHANGE-004 VERIFIED baseline re-read, and explicit path grants.
- No container, service, or platform is introduced; Release stays blocked until all runtime, parity, lifecycle, verify, and human evidence passes.
