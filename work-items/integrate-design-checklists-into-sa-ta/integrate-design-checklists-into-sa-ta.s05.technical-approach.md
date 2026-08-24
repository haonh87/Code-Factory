---
artifact_id: "integrate-design-checklists-into-sa-ta.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "integrate-design-checklists-into-sa-ta"
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
change_id: "CHANGE-004"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-004/spec-delta/brd.delta.md"
  - "changes/CHANGE-004/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CHANGE-004/spec-delta/brd.delta.md"
  srs: "changes/CHANGE-004/spec-delta/srs.delta.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
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
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-19T02:53:05Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-08-19T02:53:05Z"
  dor_reviewed_by:
    - "qc"
  dor_reviewed_at: "2026-08-19T02:53:05Z"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-22T15:09:55Z"
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
  - "brainstorming"
  - "system-design"
  - "skill-creator"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "integrate-design-checklists-into-sa-ta.s04.acceptance-criteria.md"
linked_artifacts:
  - "changes/CHANGE-004/proposal.md"
  - "changes/CHANGE-004/spec-delta/brd.delta.md"
  - "changes/CHANGE-004/spec-delta/srs.delta.md"
  - "packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
  - "packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> The Developer approved the amended Option A at `2026-08-22T15:09:55Z`: add a shared, self-contained design-readiness reference to SA and TA, invoke it through a short SKILL.md hook, and map applicable findings into the existing output contract. The verified baseline is v2.5.0 with 42 skills, the approved candidate target is v2.6.0 with 42 skills, and rollback returns to v2.5.0/42. This finalized artifact must now be sealed with a new digest-bound Approach receipt before Task Plan approval or implementation.

## Baseline Amendment
```yaml
amended_at: "2026-08-21T14:55:19Z"
status: APPROVED_BY_DEVELOPER
reason: "CHANGE-003 was integrated after the original CHANGE-004 Approach was approved, making the original v2.4.0/41 baseline and v2.5.0/41 target stale."
prior_approach_receipt:
  status: STALE_AFTER_AMENDMENT
  reviewed_by:
    - "developer"
  reviewed_at: "2026-08-19T06:33:16.469Z"
  artifact_sha256: "396d2b64af497ea53583873a0e12923378a61516d6a485e3492bd0de0f09310d"
verified_baseline:
  main_head: "cdd68ccb10f1cdec5b3301068dd47cbb74175a92"
  integration_commit: "570cb90"
  version: "2.5.0"
  skill_counts:
    canonical: 42
    codex: 42
    claude: 42
  change_003_status: DONE
  former_change_003_worktree_status: CLEAN
amendment:
  selected_option: "Option A - Shared self-contained reference with existing-output mapping"
  option_changed: false
  target_version: "2.6.0"
  managed_skill_count: 42
  rollback_version: "2.5.0"
  foundation_change: false
human_review:
  reviewed_by: "developer"
  reviewed_at: "2026-08-22T15:09:55Z"
  decision: APPROVED
decision_options:
  recommended: "Advance CHANGE-004 as the next additive minor candidate, v2.6.0/42, from the verified v2.5.0/42 baseline."
  rejected_keep_v2_5: "Rejected because v2.5.0/42 is already the integrated CHANGE-003 baseline and cannot also identify the next candidate."
  rejected_defer_release_surfaces: "Rejected because AC-010 explicitly requires internally consistent candidate, compatibility, rollback, and release-gate evidence."
next_human_action: "Seal a new trusted Approach receipt against this finalized artifact digest, then review s06 Task Plan."
```

## Step Contract
```yaml
step: "s05 Technical Approach"
goal: "CHANGE-004 has one human-confirmed, smallest-correct technical direction that preserves the current SA/TA contract while making the approved design-readiness guidance discoverable, testable, distributable, and reversible."
value: "The implementation plan can name exact canonical, test, runtime, and release touch points without re-deciding representation or risking role drift."
scope_in:
  - "Option analysis for checklist placement and contract representation"
  - "Brownfield boundary, compatibility, failure, rollback, observability, and validation design"
  - "Release/version recommendation before Task Plan approval"
scope_out:
  - "Editing canonical skills, tests, runtimes, manifests, or release files"
  - "Task sequencing and effort assignment"
  - "Passing Approach or Task Plan without explicit human approval and trusted receipts"
  - "Adding a new architecture role, output owner, system, service, framework, or runtime"
inputs_required:
  - "Approved and digest-matched Spec, Contract, and DoR receipts"
  - "AC-001 through AC-010 and the Existing System Baseline"
  - "Current SA/TA SKILL.md, shared references, metadata, contract tests, runtime sync, and parity tests"
outputs_required:
  - "A user-confirmed option analysis"
  - "A complete system-design artifact"
  - "Brownfield Impact Analysis and release/version decision"
  - "An explicit human-controlled Approach handoff"
done_when:
  - "At least two viable options and one rejected larger direction are compared"
  - "The user confirms the recommended representation"
  - "The final approach names component, interface, data-flow, failure, compatibility, rollback, observability, and validation impacts"
  - "The smallest correct solution is justified against the alternatives"
  - "A Developer reviews the final artifact and its trusted Approach receipt matches the artifact digest"
constraints:
  hard_constraints:
    - "Preserve every required output block and its owner meaning."
    - "Keep SA/TA at s01-s04 and keep solution/model selection in downstream s05 skills."
    - "Keep HCP source paths, R-IDs, names, decisions, exact thresholds, and confidential prose out of publishable skill/runtime files."
    - "Canonical skills own generated Codex and Claude runtime copies."
    - "Do not edit production artifacts before Approach and Task Plan approvals and s07 activation."
  soft_constraints:
    - "Prefer one concise shared reference family over repeated prose in SKILL.md."
    - "Reuse current contract, parity, sync, pack-audit, smoke, and version tooling."
  prohibited_actions:
    - "Adding a new required output block merely to expose checklist bookkeeping."
    - "Creating a new checklist service, plugin, skill, validator framework, or cross-runtime hand-edit path."
    - "Publishing, installing globally, or modifying unrelated skills."
  compliance_checks:
    - "Compare at least Options A, B, and C against AC-001 through AC-010."
    - "Keep Foundation Decision not applicable because no stack, runtime, or deployment baseline changes."
    - "Treat the user's Option A selection as design input only; it does not pass the human-controlled Approach gate."
risks:
  - id: "S05-R01"
    description: "A schema-visible checklist block could break existing consumers and create a second ownership contract."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Prefer mapping checklist findings into existing drivers, input_issues, handoff, and verification fields."
    contingency: "Reject schema extension and use the reference-only approach."
    owner: "developer"
    status: MONITORING
  - id: "S05-R02"
    description: "Embedding all guidance in two SKILL.md files could increase context cost and drift."
    likelihood: HIGH
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Keep only invocation guidance in SKILL.md and place detailed rules in byte-identical references."
    contingency: "Extract duplicated content before Approach approval."
    owner: "developer"
    status: MONITORING
  - id: "S05-R03"
    description: "A new standalone checklist skill could duplicate SA/TA orchestration and create unclear invocation ownership."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Treat a new skill as an explicitly rejected larger direction unless current ACs cannot be met within SA/TA."
    contingency: "Open a separate work item if later evidence proves independent invocation is a real requirement."
    owner: "developer/ba"
    status: MONITORING
timebox:
  target_duration: "One option-confirmation turn followed by one focused system-design pass"
  deadline: ""
  escalation_rule: "Return to s03 or open a spec change if the selected representation requires a new output owner, incompatible schema, or public HCP provenance."
```

## Option Analysis
```yaml
goal: "Choose the smallest representation that makes the approved design-readiness guidance usable and verifiable in both SA and TA without changing their public output ownership contract."
ba_lane:
  business_goal: "Surface ownership, authority, lifecycle, integration, compliance, and measurable-transition concerns earlier so architecture review discovers fewer blocking gaps after solution selection."
  user_scenarios:
    - "A practitioner invokes SA or TA from a raw request and receives only the applicable design-readiness concerns, not a generic checklist dump."
    - "A downstream Developer, QC, or DevOps owner can trace each surfaced concern to evidence, a handoff, and a verification obligation."
    - "A bundle user receives identical approved behavior in English/Vietnamese and Codex/Claude runtimes without learning private HCP context."
  business_rules:
    - "Checks are supplementary and advisory unless a named stakeholder concern, constraint, approved policy, or accepted criterion makes them blocking."
    - "Private source provenance and public generalized guidance remain separate."
    - "SA/TA surface concerns; system-design and architecture-modeling select the solution and model."
  scope_notes:
    - "Existing required output blocks and role ownership are compatibility boundaries."
    - "Packaging is in scope only after the version is locked and Release remains human-gated."
  open_questions:
    - "None blocking for s05; Developer review must confirm the representation, compatibility, validation, and v2.6.0 release target."
dev_lane:
  repo_constraints:
    - "SA and TA already share byte-identical output-schema, ownership, invocation, metric, landscape, and visual references."
    - "Each skill is self-contained in canonical source and is copied wholesale into both generated runtimes."
    - "architecture-role-skills-contract.test.js already verifies shared-reference parity, ownership, metadata, schema, metrics, and bilingual examples."
    - "workflow-bundle-runtime-parity.test.js recursively compares all 42 canonical skills with Codex and Claude runtimes."
    - "The bundle baseline is 2.5.0 and contains 42 skills."
  technical_risks:
    - "Schema extension can break existing consumers or require ownership and example changes."
    - "Inline duplication can bloat context and cause SA/TA or EN/VI drift."
    - "A new skill can create trigger overlap, inventory/version churn, and orchestration ambiguity."
  integration_points:
    - "skills/analysis/sa and skills/analysis/ta canonical sources"
    - "architecture-role-skills-contract.test.js"
    - "sync-workflow-bundle-runtime.js and generated Codex/Claude runtime trees"
    - "workflow pack audit, runtime parity, bundle smoke, package/version, and release surfaces"
  nfr_notes:
    - "34/34 private route coverage, 13/13 adopted-check completeness, zero leakage, 6/6 representative behavior cases, and zero parity drift are mandatory."
    - "Rollback must restore the complete managed 2.5.0 baseline without changing unmanaged or global files."
  baseline_context: "Brownfield public skill contract with fixed output blocks, paired bilingual resources, deterministic canonical-to-runtime generation, and an existing 2.5.0 release baseline."
options:
  - { name: "Option A - Shared self-contained reference with existing-output mapping", summary: "Add concise EN/VI references to both SA and TA, keep each language pair byte-identical, add short SKILL.md hooks, and map applicable findings into existing fields.", pros: ["schema-compatible", "progressive disclosure", "fits canonical-to-runtime sync", "small testable delta"], cons: ["no dedicated checklist output block", "mapping rules must stay explicit"], risks: ["the hook must make reference use mandatory when relevant"] }
  - { name: "Option B - Add a design_readiness output block", summary: "Extend the public schema and examples with a new checklist-results block.", pros: ["machine-visible checklist state", "centralized evidence"], cons: ["schema and ownership change", "consumer migration", "duplicates existing fields"], risks: ["compatibility break and role ambiguity"] }
  - { name: "Option C - Embed the full guidance directly in both SKILL.md files", summary: "Place all portable checks and converted questions inline in SA and TA instructions.", pros: ["no reference-resolution path", "always loaded"], cons: ["context bloat", "four-way lens/language duplication", "higher drift risk"], risks: ["contradictory future edits"] }
recommended_option: "Option A - Shared self-contained reference with existing-output mapping"
recommendation_reason: "Option A is the only option that satisfies the approved evidence, confidentiality, role-boundary, bilingual, runtime, and compatibility outcomes without adding a new output block or capability boundary. It follows the repo's existing byte-identical shared-reference pattern and the skill-creator progressive-disclosure rule."
rejected_larger_direction: "Option D - Create a standalone architecture-readiness skill; rejected because it adds a trigger, inventory item, orchestration boundary, and owner without an approved independent-invocation requirement."
validation_plan:
  - "Prove the new reference exists in EN/VI under both canonical skills and is byte-identical across SA/TA for each language."
  - "Extend architecture-role-skills-contract.test.js with 13-check completeness, authority, forbidden-leakage, role-boundary, and six representative-case assertions."
  - "Run existing schema, ownership, metrics, metadata, and bilingual regression assertions unchanged."
  - "Regenerate both runtimes through the existing sync command and require recursive parity plus workflow pack audit and bundle smoke."
  - "Verify version, inventory, package dry-run, rollback, and release surfaces only after the release target is approved."
notes_for_next_step: "The Developer approved the baseline amendment and unchanged Option A. Seal the new digest-bound Approach receipt before s06 Task Plan review."
decision_status: APPROVED_BY_DEVELOPER
confirmed_option: "Option A - Shared self-contained reference with existing-output mapping"
confirmed_by: "user"
confirmed_at: "2026-08-19T06:19:17Z"
approach_approved_by: "developer"
approach_approved_at: "2026-08-22T15:09:55Z"
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: "Existing workflow-bundle skill/reference model"
selected_stack: []
selected_runtime: []
decision_notes:
  - "No stack, runtime, deployment model, service boundary, or foundation architecture changes."
  - "The work item extends two existing skill contracts and their generated copies."
```

## Main Artifact
```yaml
design_problem: "Integrate approved design-readiness guidance into SA/TA without schema breakage, role drift, confidential leakage, or canonical/runtime divergence."
business_rule_trace:
  - "CR-001/CR-002 -> a public, domain-neutral checklist contract covers all 13 adopted portable checks and routes all 10 converted items into driver questions or downstream handoffs."
  - "CR-003 -> private provenance and publishable content remain physically separated; public files contain no private source path, private rule ID, source-specific name, decision, exact source threshold, or confidential prose."
  - "CR-004/CR-005 -> SA and TA only surface architecture drivers and unresolved concerns at s01-s04; system-design and architecture-modeling retain solution and model selection at s05."
  - "CR-006/CR-007 -> every applicable check has evidence, handoff, verification, and blocking-authority semantics and maps into the existing output blocks without inventing a second owner."
  - "CR-008/CR-009 -> bilingual, canonical/runtime, behavior, audit, smoke, and UTF-8 evidence must be deterministic and complete."
  - "CR-010 -> if packaged, v2.6.0 metadata, inventory, compatibility, rollback, and release evidence remain consistent and publication remains blocked until human Release approval."
design_options:
  - name: "Option A - Shared self-contained reference with existing-output mapping"
    decision: SELECTED
    boundary: "One domain-neutral EN/VI reference family duplicated byte-identically under canonical SA and TA, short SKILL.md invocation hooks, existing output blocks, existing runtime sync, and existing test/release tooling."
  - name: "Option B - Add a design_readiness output block"
    decision: REJECTED
    boundary: "Public output schema, ownership contract, examples, consumers, and migrations would expand beyond the approved need."
  - name: "Option C - Embed the full guidance directly in both SKILL.md files"
    decision: REJECTED
    boundary: "Repeated prose would increase context cost and lens/language drift."
  - name: "Option D - Create a standalone architecture-readiness skill"
    decision: REJECTED
    boundary: "A new invocation and ownership boundary is not required by the approved criteria."
rejected_options:
  - "Reject a schema-visible design_readiness block because existing drivers, input_issues, handoff, threshold, origin, and verification fields already carry the required evidence."
  - "Reject full inline duplication because progressive disclosure and byte-identical shared references are the established brownfield pattern."
  - "Reject a standalone skill because it adds capability inventory, trigger overlap, and orchestration ambiguity without user value required by CHANGE-004."
recommended_design: "Adopt Option A. Add design-readiness-checklist.md and design-readiness-checklist.vi.md to both canonical SA and TA reference directories; keep each language pair byte-identical across the two roles; add a concise invocation step to both EN/VI SKILL.md files; filter checks by relevance and map results into the current owned output fields. Keep the private 34-rule route matrix only in CHANGE-004 workflow artifacts. Extend the existing architecture-role contract test first, then implement the canonical content, regenerate both runtimes from canonical source, and prepare a v2.6.0 candidate without changing the 42-skill inventory."
recommendation_reason: "This direction meets all approved criteria with the fewest new surfaces: four canonical reference copies, four concise SKILL.md hooks, one extended contract test, generated runtime copies, and existing release metadata. It preserves output compatibility and role authority while making the guidance discoverable, testable, distributable, and reversible."
component_changes:
  - component: "Canonical SA references"
    paths:
      - "skills/analysis/sa/references/design-readiness-checklist.md"
      - "skills/analysis/sa/references/design-readiness-checklist.vi.md"
    change: "Add the public checklist contract and generalized guidance."
  - component: "Canonical TA references"
    paths:
      - "skills/analysis/ta/references/design-readiness-checklist.md"
      - "skills/analysis/ta/references/design-readiness-checklist.vi.md"
    change: "Add byte-identical per-language copies so each skill remains self-contained."
  - component: "SA/TA execution instructions"
    paths:
      - "skills/analysis/sa/SKILL.md"
      - "skills/analysis/sa/SKILL.vi.md"
      - "skills/analysis/ta/SKILL.md"
      - "skills/analysis/ta/SKILL.vi.md"
    change: "Add a short hook after initial driver extraction and before handoff/metrics; do not change frontmatter triggers or required output blocks."
  - component: "Architecture-role contract verification"
    paths:
      - "packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
    change: "Add completeness, mapping, authority, leakage, representative behavior, no-solution-selection, and reference-parity assertions."
  - component: "Generated runtimes"
    paths:
      - "packages/workflow-bundle/runtime/codex/skills/analysis/sa"
      - "packages/workflow-bundle/runtime/codex/skills/analysis/ta"
      - "packages/workflow-bundle/runtime/claude/skills/analysis/sa"
      - "packages/workflow-bundle/runtime/claude/skills/analysis/ta"
    change: "Regenerate from canonical sources through the existing runtime sync command; no hand editing."
  - component: "Candidate release surfaces"
    paths:
      - "workflow-bundle.manifest.json"
      - "packages/workflow-bundle/workflow-bundle.manifest.json"
      - "packages/workflow-bundle/package.json"
      - "packages/workflow-bundle/bin/wfc.js"
      - "packages/workflow-bundle/test/release-surface.test.js"
      - "docs/releases/workflow-bundle-v2.6.0.md"
      - "README.md"
      - "packages/workflow-bundle/README.md"
      - "docs/publish-surface.md"
      - "docs/workflow-docs-map.md"
      - "docs/workflow-bundle-quickstart.md"
    change: "Prepare one internally consistent v2.6.0 candidate while keeping the inventory at 42 and avoiding publication claims before Release approval."
data_flow:
  - "Raw request plus optional requirement/product inputs -> existing SA/TA driver extraction."
  - "Driver candidates -> applicability filter against the public design-readiness reference."
  - "Applicable and role-owned concern -> existing drivers entry with origin, threshold or explicit no-threshold reason, verification, and handoff."
  - "Missing, contested, or unknown evidence -> existing input_issues and stop_condition.pushed_to_s03."
  - "Downstream design choice or operational obligation -> existing handoff for Developer, QC, or DevOps; SA/TA do not choose the solution."
  - "Canonical skill tree -> existing sync script -> Codex and Claude runtime trees -> recursive runtime parity verification."
interface_changes:
  - interface: "SA/TA output schema"
    change: "No new required block, no renamed field, no owner change, and no incompatible consumer migration."
  - interface: "Reference contract"
    change: "Each portable check exposes a stable public ID, trigger, owner_lens, concern_or_invariant, expected_evidence, handoff, verification, mandatory_when, and blocking_authority. Each converted item exposes a stable question/handoff ID, trigger, question, destination, expected_evidence, and non-selection guard."
  - interface: "Skill invocation"
    change: "Existing triggers remain unchanged; the skill loads the new reference only when performing its normal architecture-driver analysis."
  - interface: "Release package"
    change: "Minor version advances from 2.5.0 to 2.6.0 because public skill behavior is additively expanded; managed skill count remains 42."
failure_modes:
  - mode: "The skill does not load or apply the new reference."
    handling: "Require an explicit SKILL.md hook and contract-test the hook plus six representative behavior cases."
  - mode: "The skill emits a generic checklist dump or marks irrelevant checks blocking."
    handling: "Require trigger-based applicability, explicit non-applicability handling, named authority, and no unanchored blocking rule."
  - mode: "SA/TA selects a solution, stack, pattern, model, or schema."
    handling: "Retain the existing authority boundary and add negative assertions for forbidden solution-selection language and behavior."
  - mode: "Private source material leaks into canonical or runtime files."
    handling: "Run denylist and source-specific identifier/path checks over publishable files and require a targeted human content review."
  - mode: "SA and TA or EN and VI drift semantically."
    handling: "Require byte equality across each SA/TA reference pair and semantic coverage assertions across language variants."
  - mode: "Generated runtime content diverges from canonical source."
    handling: "Use only the existing sync script and require recursive Codex/Claude runtime parity."
  - mode: "Release surfaces disagree on version, inventory, publication state, or rollback."
    handling: "Advance the release-surface test to v2.6.0, verify all structured/public surfaces, and block Release on any mismatch."
compatibility_impact:
  classification: "Backward-compatible additive behavior"
  rationale: "Existing valid SA/TA inputs, required output blocks, block owners, invocation triggers, and runtime layout remain valid. The new guidance enriches how existing fields are populated."
  migration_required: false
  compatibility_guards:
    - "Run existing schema, ownership, metric, metadata, bilingual-example, and runtime-parity tests unchanged."
    - "Do not add a design_readiness top-level block or modify existing ownership kinds."
rollback_impact:
  before_publication: "Revert only CHANGE-004-managed canonical skill files, generated runtime copies, tests, metadata, and v2.6.0 candidate docs to the verified 2.5.0 baseline."
  after_publication: "Keep the verified v2.5.0 artifact as fallback and test a scoped reinstall/downgrade in isolation before any managed installation is changed."
  prohibited: "Do not use rollback to delete unrelated user files, rewrite historical approval evidence, or mutate global installations without the applicable human Release authority."
observability_hooks:
  - "Contract test reports 13/13 portable checks, 10/10 converted questions/handoffs, 6/6 representative cases, and zero leakage/role-boundary violations."
  - "Runtime parity reports zero canonical/Codex/Claude differences."
  - "Workflow pack audit reports reference, frontmatter, cross-reference, and runtime-layout status."
  - "Bundle smoke and package dry-run report version, managed skill count, installation state, and package contents without publishing."
  - "Release-surface verification reports a single v2.6.0 candidate, 42 managed skills, compatibility, rollback, and unpublished status."
  - "No production telemetry is added because this change is a static skill-bundle behavior contract."
constraints_applied:
  - "Human-controlled gates remain authoritative: Option A confirmation is not Approach approval, and candidate preparation is not Release approval."
  - "Private HCP provenance remains confined to work-item/change evidence and is not copied to distributable content."
  - "SA and TA remain architecture-driver skills at s01-s04; downstream design skills own s05 decisions and models."
  - "Canonical skill files are authoritative; generated runtime copies are build outputs."
  - "The implementation uses a dedicated worktree because planning_track=full and the change spans canonical, generated, test, and release surfaces."
  - "No delegation or subagent execution is authorized."
validation_plan:
  - "TDD red: extend architecture-role-skills-contract.test.js for the approved checklist/reference behavior and confirm failures are caused by the missing reference and hooks."
  - "TDD green: add the minimum canonical references and SKILL.md hooks to pass completeness, mapping, confidentiality, and representative behavior checks."
  - "Regression: run the unchanged architecture-role schema, ownership, metric, metadata, and bilingual assertions."
  - "Generation: run the existing workflow-bundle runtime sync, then recursive runtime parity for Codex and Claude."
  - "Early review batch 1: spec compliance against AC-001 through AC-007, followed by content/code quality for canonical and contract-test changes."
  - "Early review batch 2: spec compliance against AC-008 through AC-010, followed by generated-runtime and release-surface quality review."
  - "Static/release checks: run workflow pack audit, focused Node tests, full relevant unit suite, bundle smoke, package dry-run, diff scan, source-leakage scan, and UTF-8/whitespace checks."
  - "s08: testing and DoD evidence map every AC to a pass or an explicit release blocker; QC alone owns the DoD verdict."
specialized_followups:
  - skill: "task-breakdown-planner"
    step: "s06"
    reason: "Convert this boundary into ordered owned paths, red/green verify paths, early-review checkpoints, release preparation, and worktree handoff."
  - skill: "implementation"
    step: "s07"
    reason: "Execute TDD and minimal-delta canonical changes only after Approach and Task Plan receipts pass."
  - skill: "review-discipline"
    step: "s07"
    reason: "Run spec-compliance review before code/content quality for each risky batch."
  - skill: "workflow-pack-audit"
    step: "s07/s08"
    reason: "Detect frontmatter, reference, runtime-flat-layout, schema, and cross-reference drift."
  - skill: "testing"
    step: "s08"
    reason: "Produce risk-ranked acceptance and regression evidence before QC considers DoD."
  - skill: "ci-cd-release"
    step: "s06/s08"
    reason: "Lock candidate metadata, package verification, promotion prohibition, rollback evidence, and the human Release handoff."
notes_for_next_step:
  - "The Developer approved the reconciled v2.5.0/42 baseline, v2.6.0/42 target, rollback boundary, and unchanged Option A at 2026-08-22T15:09:55Z."
  - "Seal a new trusted Approach receipt against this finalized artifact before Task Plan review."
  - "Task Plan must not re-open Option A or the v2.6.0/42-skill release boundary after that trusted Approach receipt is sealed."
  - "Task Plan must identify exact owned canonical/test/runtime/release paths, the dedicated worktree/merge path, TDD red evidence, early two-tier reviews, and final verification ownership."
  - "Do not activate s07 until the digest-bound Approach and Task Plan receipts both match their artifacts."
```

## Brownfield Impact Analysis
```yaml
status: APPROVED
impacted_modules:
  - "Canonical SA/TA instruction and reference surfaces"
  - "Architecture-role skill contract tests"
  - "Generated Codex/Claude runtime copies"
  - "v2.6.0 package/version/release candidate surfaces"
unchanged_boundaries:
  - "SA/TA required output blocks and ownership meanings"
  - "Skill invocation triggers and metadata unless validation exposes a pre-existing mismatch"
  - "42-skill managed inventory"
  - "Runtime sync direction from canonical source to generated Codex/Claude copies"
  - "No API, event, database, deployment, or global-install mutation"
compatibility_risks:
  - "A new output block or owner meaning would break the selected compatibility boundary and requires returning to s04/s05."
  - "Duplicated references may drift unless byte parity is enforced across SA and TA."
  - "Candidate docs may overstate publication unless release-surface assertions preserve the human Release gate."
migration_notes:
  - "No data, API, event, database, user configuration, or runtime deployment migration is required."
  - "Existing skill consumers may continue using the current schema without changes."
rollback_notes:
  - "Restore only the CHANGE-004-managed canonical, generated, test, metadata, and candidate-document surfaces to the verified 2.5.0 baseline."
  - "Keep unrelated dirty files, historical approval receipts, and unmanaged/global installations untouched."
```

## Release Decision
```yaml
packaging_decision: "IN_SCOPE_AFTER_AUTHORING_APPROVALS"
target_version: "2.6.0"
version_reason: "The change additively expands public behavior in two existing skills without breaking their schema, so a minor version is more accurate than a patch release."
managed_skill_count: 42
baseline_version: "2.5.0"
rollback_version: "2.5.0"
decision_status: "APPROVED_BY_DEVELOPER"
decision_options:
  - "RECOMMENDED: target v2.6.0/42 as the next additive minor candidate after integrated v2.5.0/42."
  - "REJECTED: retain v2.5.0 because that version already identifies the verified baseline."
publication_status: "PROHIBITED_UNTIL_RELEASE_APPROVAL"
release_owner:
  - "devops"
  - "qc"
business_acceptance_owner:
  - "po"
release_conditions:
  - "All AC-001 through AC-010 verification evidence passes or an explicit release blocker remains open."
  - "Candidate metadata, docs, package contents, runtime copies, compatibility, and rollback evidence agree on v2.6.0 and 42 skills."
  - "The trusted Release receipt matches the finalized s08 artifact before publication, tagging, or global installation."
```

## Traceability
```yaml
upstream:
  - "integrate-design-checklists-into-sa-ta.s04.acceptance-criteria.md"
option_coverage:
  - "AC-001/002/006/007 -> reference contract and existing-output mapping"
  - "AC-003 -> private/public separation and publishable-content scans"
  - "AC-004/005 -> no-solution-selection and output-ownership compatibility"
  - "AC-008/009 -> shared-reference parity, generated-runtime parity, audit, smoke, and UTF-8 checks"
  - "AC-010 -> version, packaging, rollback, and Release gate"
next_step: "Seal the matching Approach receipt, then review and approve s06 Task Plan"
```

## Audit
### Step Goal Audit
```yaml
step: "s05 Technical Approach"
status: PASS
checks:
  - criterion: "The smallest correct option is selected and remains within the approved SA/TA boundary."
    result: PASS
    evidence: "Option A remains selected; it adds references and hooks while preserving schema, triggers, ownership, and downstream design authority."
  - criterion: "The brownfield and release baseline is current, compatible, reversible, and evidence-backed."
    result: PASS
    evidence: "CHANGE-003 integration establishes main at v2.5.0/42; CHANGE-004 targets v2.6.0/42 and rolls back to v2.5.0/42."
  - criterion: "Failure, observability, validation, release, and governance controls are explicit."
    result: PASS
    evidence: "The Main Artifact, Brownfield Impact Analysis, Release Decision, and validation plan cover these boundaries."
  - criterion: "A Developer explicitly approves this amended artifact before trusted receipt sealing."
    result: PASS
    evidence: "The user explicitly approved the amended Approach with role Developer at 2026-08-22T15:09:55Z; gate_reviews records the same authority and time."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
gaps: []
risk_level: MEDIUM
next_action: "Seal the new digest-bound Approach receipt; only then may Developer review s06 Task Plan."
```

## Handoff
- User-confirmed option: Option A, shared self-contained EN/VI reference with existing-output mapping.
- Accepted trade-off: checklist evidence remains distributed across existing owned fields instead of a new top-level block.
- Proposed release boundary: v2.6.0 candidate, 42 managed skills, no registry publication or global installation before the human Release gate.
- Prior human review: Developer approved the pre-amendment Approach; its trusted receipt became stale after CHANGE-003 integration.
- Verified amendment: baseline v2.5.0/42 at main HEAD `cdd68ccb10f1cdec5b3301068dd47cbb74175a92`; proposed next candidate v2.6.0/42; rollback v2.5.0/42; Option A unchanged.
- Current human review: Developer approved the amended Approach at `2026-08-22T15:09:55Z`.
- Current blocker: seal and verify a new digest-bound Approach receipt.
- After receipt verification: review the execution-oriented s06 Task Plan before any s07 activation.
- No production, runtime, version, or release file has been edited.
