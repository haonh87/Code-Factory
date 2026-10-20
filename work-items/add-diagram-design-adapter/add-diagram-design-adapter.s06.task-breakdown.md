---
artifact_id: "add-diagram-design-adapter.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "add-diagram-design-adapter"
step_id: "s06"
step_slug: "task-breakdown"
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
  approach_reviewed_by: []
  approach_reviewed_at: ""
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-10-20T09:31:30Z"
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
  - "task-breakdown-planner"
  - "deployment-devops"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "add-diagram-design-adapter.s05.technical-approach.md"
linked_artifacts:
  - "changes/CHANGE-005/tasks.md"
  - "changes/CHANGE-005/design.md"
  - "changes/CHANGE-005/spec-delta/brd.delta.md"
  - "changes/CHANGE-005/spec-delta/srs.delta.md"
  - "work-items/add-diagram-design-adapter/add-diagram-design-adapter.work-item-report.json"
tags: ["agent-ops", "workflow/s06"]
---

# Step 6 - Task Plan

> [!summary]
> The user accepted Amendment A1 and its isolated PNG provisioning plan on 2026-10-20; the decision was recorded at 09:31:30Z. Rebase the existing T0-T9 plan onto main `fa9ad237f8179e58b16ca6c6c589bdd0728ec476` (bundle 2.6.4), nominate 2.7.0, and pin an isolated PNG toolchain. Spec, Contract, DoR, Approach, AC-001..011 and upstream provenance remain unchanged. The prior Task Plan signature does not approve these edited bytes; a new trusted Task Plan signature is pending. Isolated provisioning is explicitly authorized. Production implementation remains gated by T0, signature/state reconciliation and activation.

## Step Contract
~~~yaml
step: "s06 Task Plan"
goal: "Produce an execution-oriented plan that can implement the approved adapter without re-deciding ownership, distribution, contract, output, packaging, rollback, or verification behavior."
value: "Developer can execute in dependency order with exact owned paths and verify methods, while BA, QC, and DevOps can trace every acceptance criterion and governance guard."
scope_in:
  - "Map APPROACH-005-A to exact canonical, test, generated-runtime, release, and evidence paths."
  - "Split behavior changes into fail-first TDD batches."
  - "Lock worktree isolation, CHANGE-004 sequencing, PNG provisioning, targeted review, lifecycle, rollback, and s08 handoff."
scope_out:
  - "Creating a branch/worktree or editing production/test/runtime/release paths before s07 activation."
  - "Installing Playwright/Chromium or downloading/importing upstream content in s06."
  - "Delegating tasks, publishing a package, changing a live managed home, merging, cleaning worktrees, or passing human gates."
inputs_required:
  - "Approved s04 Spec, Contract, and DoR receipts."
  - "Approved s05 Approach receipt a84a9fff7d312f23dab337e534e7a2e1963bade35a2ab2456901bb805890084d."
  - "AC-001 through AC-011 and OQ-009-DIGEST-001."
  - "Current 2.6.4 bundle baseline, recursive skill discovery/sync, architecture-role/modeling tests, and lifecycle smokes."
  - "CHANGE-004 status and its declared SA/TA/runtime ownership."
outputs_required:
  - "Ten tasks with exact paths, dependencies, outputs, review checkpoints, and verification hints."
  - "AC-to-task/test traceability, TDD targets, worktree/ownership controls, Brownfield Delivery Plan, and DevOps plan."
  - "A review-ready Task Plan gate artifact with explicit blockers and no placeholders."
done_when:
  - "Every AC-001 through AC-011 maps to one or more tasks and executable evidence."
  - "Every behavior change names a red test before minimum implementation and a green rerun."
  - "Worktree, branch, owned roots, main-governance root, merge path, and cleanup guard are explicit."
  - "CHANGE-004 and PNG prerequisites are placed before affected source work."
  - "Every risky batch has a spec-compliance review before code-quality review."
  - "Install/update/disable/rollback, Codex/Claude parity, offline output, release-candidate, and s08 reader checks have owners and commands."
  - "No implementation or downstream gate is implied by plan authoring."
constraints:
  hard_constraints:
    - "Do not enter s07 without a trusted Task Plan receipt and explicit activation/write grants."
    - "Do not grant overlapping SA/TA/runtime paths until CHANGE-004 is VERIFIED and its baseline has been re-read."
    - "Use one ignored in-repo worktree because the change spans many boundaries and vendors 155 logical files."
    - "Use test fail -> minimum change -> test pass for behavior and contract changes."
    - "Review spec compliance before code quality for each risky batch."
    - "Do not auto-install browser tooling, fetch at adapter invocation, hand-edit generated runtimes, or publish partial output."
    - "Do not merge, clean the worktree, tag, publish, or alter a live managed home before s08 and applicable human gates."
  soft_constraints:
    - "Reuse CommonJS, existing runtime sync, pack audit, lifecycle, and release smokes."
    - "Keep SA/TA and architecture-modeling deltas additive and bilingual."
  prohibited_actions:
    - "Changing SA/TA schema or moving rendering into s01-s04."
    - "Making diagram-design a canonical render owner or leaving a nested discoverable upstream SKILL.md."
    - "Using npx/pip install or network access inside adapter execution."
    - "Treating local review/test evidence as DoD, Release, or Business Acceptance."
  compliance_checks:
    - "Verify trusted receipts and activation before source writes."
    - "Verify worktree isolation and changed-path allowlist."
    - "Record red/green and two-tier review evidence per batch."
    - "Verify upstream digest, semantic/security/accessibility contract, runtime parity, candidate identity, rollback, workflow, and UTF-8."
risks:
  - id: "S06-RISK-001"
    description: "CHANGE-004 is DONE with matching DoD; any new baseline change could invalidate the recorded compatibility check."
    likelihood: "HIGH"
    impact: "HIGH"
    severity: "HIGH"
    mitigation: "T0 preserves the observed DONE/DoD evidence and rechecks baseline identity before granting overlapping paths; return only affected gates to review on drift."
    contingency: "Return affected CHANGE-005 artifacts to review and reseal changed receipts."
    owner: "developer/devops"
    status: "OPEN"
  - id: "S06-RISK-002"
    description: "The local environment lacks Python Playwright and Chromium for mandatory PNG evidence."
    likelihood: "HIGH"
    impact: "HIGH"
    severity: "HIGH"
    mitigation: "T0 requires DevOps to record and explicitly provision an approved version-pinned Python/Playwright/Chromium tuple outside adapter execution before T3."
    contingency: "Keep T3, s08, and Release blocked; negative missing-tool behavior must still pass."
    owner: "devops"
    status: "OPEN"
  - id: "S06-RISK-003"
    description: "Large vendored resources or generated runtime sync may hide unrelated changes."
    likelihood: "MEDIUM"
    impact: "HIGH"
    severity: "HIGH"
    mitigation: "Use an importer/path map, pre/post inventories, exactly-one-new-skill assertion, generated-only runtime sync, unaffected-path digests, and changed-path allowlists."
    contingency: "Discard the candidate worktree delta and repeat from the verified baseline."
    owner: "developer"
    status: "MONITORING"
  - id: "S06-RISK-004"
    description: "A candidate version may collide if the post-CHANGE-004 baseline is not 2.6.4."
    likelihood: "LOW"
    impact: "HIGH"
    severity: "MEDIUM"
    mitigation: "Target 2.7.0 only when T0 proves the verified baseline is 2.6.4; otherwise stop and return the release portion of s06 to review."
    contingency: "Select the next compatible minor version through human Task Plan re-review."
    owner: "developer/devops"
    status: "MONITORING"
timebox:
  target_duration: "Two focused implementation sessions plus one targeted-review/evidence session"
  deadline: ""
  escalation_rule: "Return to s05 for any ownership/distribution/runtime-boundary change; return through spec control for changed formats, thresholds, or fail-closed behavior."
~~~

## Approach Receipt
~~~yaml
gate: "approach"
status: "APPROVED"
reviewed_by: "developer"
reviewed_at: "2026-08-21T08:45:59.847Z"
artifact_ref: "work-items/add-diagram-design-adapter/add-diagram-design-adapter.s05.technical-approach.md"
artifact_sha256: "a84a9fff7d312f23dab337e534e7a2e1963bade35a2ab2456901bb805890084d"
digest_match: true
~~~

## Artifact Chính
~~~yaml
implementation_goal: "Deliver one optional, reversible diagram-design presentation adapter that preserves SA/TA and canonical architecture behavior while producing validated offline HTML/SVG/PNG derivatives."
ba_lane:
  acceptance_coverage: []
  scope_guards:
    - "AC-001 through AC-011 and BR/FR/NFR remain unchanged."
    - "SA/TA only declare intent; architecture-modeling owns canonical facts/views."
    - "Presentation artifacts are separate, non-canonical, fully traced, and fail closed."
    - "No URL onboarding, animation, remote required asset, active script, pixel-equality criterion, or direct publication."
  human_review_points: []
dev_lane:
  path_map: []
  technical_sequence: []
  tdd_targets: []
task_breakdown:
  - id: "T0"
    owner_role: "developer/devops"
    name: "Clear activation prerequisites and isolate the baseline"
    objective: "After Task Plan approval, prove CHANGE-004 is VERIFIED, re-read the resulting baseline, confirm the 2.6.4 version, provision an approved PNG toolchain explicitly, then create one clean ignored worktree."
    paths_in_scope:
      - ".claude/worktrees/add-diagram-design-adapter-v2.7.0"
      - "work-items/add-diagram-design-adapter/**"
      - "changes/CHANGE-005/**"
    dependencies:
      - "Task Plan receipt APPROVED with digest_match=true"
      - "CHANGE-004 status VERIFIED and baseline evidence available"
      - "Explicit work-item activation and write grants"
    outputs_expected:
      - "Branch codex/add-diagram-design-adapter-v2.7.0 from verified post-CHANGE-004 main HEAD"
      - "Clean ignored worktree and unchanged unrelated main-root inventory"
      - "Baseline SA/TA, architecture-modeling, skill-count, runtime-parity, version, and receipt record"
      - "Recorded Python, Playwright package, Chromium revision/executable, and preflight result; installation is explicit and outside adapter execution"
      - "Compatibility verdict for Contract, AC, Approach, and Plan after baseline re-read"
    review_checkpoint: "Block source edits unless every prerequisite passes; any changed contract/boundary returns to review."
    verification_hint: "Check CHANGE-004 report/receipts, git worktree/list/check-ignore/status, Node/npm/Python versions, python import playwright, Chromium launch smoke, bundle version 2.6.4, focused baseline tests, and runtime parity."
  - id: "T1"
    owner_role: "developer"
    name: "Import and verify the pinned upstream capability test-first"
    objective: "Make provenance/discovery assertions fail on the absent resource, then import exactly the approved logical tree and turn them green without exposing a nested skill."
    paths_in_scope:
      - "packages/workflow-bundle/test/diagram-design-provenance.test.js"
      - "skills/architecture/diagram-design-presentation-adapter/scripts/verify-upstream-provenance.js"
      - "skills/architecture/diagram-design-presentation-adapter/resources/upstream/diagram-design/**"
      - "skills/architecture/diagram-design-presentation-adapter/references/upstream-provenance.md"
    dependencies: ["T0"]
    outputs_expected:
      - "Fail-first assertions for repository, commit, MIT license, Read/Write capability, 155 logical files, 2,113,085 bytes, and approved aggregate digest"
      - "Deterministic stored-to-logical path map with logical SKILL.md stored under a non-discoverable filename"
      - "Imported original bytes and a passing sha256-manifest-v1 verifier"
      - "Exactly one future adapter skill discovery slot and zero vendored SKILL.md files"
    review_checkpoint: "SPEC_COMPLIANCE checks AC-008 and no-auto-update first; CODE_QUALITY checks deterministic path/hash behavior and readable failure reasons."
    verification_hint: "Run the new provenance test red before import and green after import; run find/rg for nested SKILL.md, recompute count/bytes/digest, and compare the allowlisted imported tree."
  - id: "T2"
    owner_role: "developer"
    name: "Implement the adapter request/result contract test-first"
    objective: "Define the public bilingual adapter skill and executable request validation so every accepted and fail-closed case is deterministic before rendering."
    paths_in_scope:
      - "packages/workflow-bundle/test/diagram-design-presentation-adapter-contract.test.js"
      - "packages/workflow-bundle/test/fixtures/diagram-design-presentation-adapter/requests/**"
      - "skills/architecture/diagram-design-presentation-adapter/SKILL.md"
      - "skills/architecture/diagram-design-presentation-adapter/SKILL.vi.md"
      - "skills/architecture/diagram-design-presentation-adapter/agents/openai.yaml"
      - "skills/architecture/diagram-design-presentation-adapter/references/request-result-contract.md"
      - "skills/architecture/diagram-design-presentation-adapter/references/request-result-contract.vi.md"
      - "skills/architecture/diagram-design-presentation-adapter/scripts/validate-request.js"
    dependencies: ["T1"]
    outputs_expected:
      - "Fail-first positive contract and one negative fixture per approved fail_closed_conditions row"
      - "Required role/audience/question/canonical refs/facts/destination/formats validation"
      - "Distinct presentation ID and exactly-one-owner validation"
      - "ACCEPTED/REJECTED result envelope with zero emitted artifacts on rejection"
      - "Bilingual skill boundary that never claims canonical rendering or gate authority"
    review_checkpoint: "SPEC_COMPLIANCE checks AC-001/002/003/010; CODE_QUALITY checks deterministic validation, path safety, error aggregation, and bilingual parity."
    verification_hint: "Run the contract test red before files/scripts and green after minimum implementation; run each negative fixture and assert REJECTED plus zero destination files."
  - id: "T3"
    owner_role: "developer/devops"
    name: "Implement offline output, semantic validation, and atomic export test-first"
    objective: "Prove required HTML/SVG/PNG, semantic/security/accessibility, missing-tool, and atomic-failure behavior using representative fixtures and the explicitly provisioned exporter."
    paths_in_scope:
      - "packages/workflow-bundle/test/diagram-design-presentation-adapter-output.test.js"
      - "packages/workflow-bundle/test/fixtures/diagram-design-presentation-adapter/models/**"
      - "packages/workflow-bundle/test/fixtures/diagram-design-presentation-adapter/outputs/**"
      - "skills/architecture/diagram-design-presentation-adapter/references/output-contract.md"
      - "skills/architecture/diagram-design-presentation-adapter/references/output-contract.vi.md"
      - "skills/architecture/diagram-design-presentation-adapter/scripts/export-svg.js"
      - "skills/architecture/diagram-design-presentation-adapter/scripts/export-png.py"
      - "skills/architecture/diagram-design-presentation-adapter/scripts/validate-output.js"
    dependencies:
      - "T2"
      - "T0 PNG toolchain preflight passes for the positive PNG fixture"
    outputs_expected:
      - "Fail-first tests for three-format inventory, missing Playwright, browser launch/export failure, semantic drift, remote/active content, accessibility failure, and atomic rollback"
      - "Static HTML with inline SVG/CSS, system fonts, non-canonical label, canonical reference, and no script/network dependency"
      - "Standalone SVG with title/description and no remote font import"
      - "Transparent PNG from the validated local HTML source using pinned Python Playwright/Chromium"
      - "data-source-fact-id coverage 100%, normalized semantic diff zero, output manifest/hashes, and staging-before-atomic-move"
    review_checkpoint: "SPEC_COMPLIANCE checks AC-004/005/006; CODE_QUALITY checks parser safety, offline determinism, temp cleanup, atomic move/restore, and exporter diagnostics."
    verification_hint: "Run output tests red then green; run with network disabled, static forbidden-content scan, semantic added/removed/reversed fixtures, accessibility assertions, missing-tool PATH/PYTHON isolation, positive PNG smoke, and forced export/move failures."
  - id: "T4"
    owner_role: "developer"
    name: "Add SA/TA presentation-intent handoff without schema change"
    objective: "Teach SA and TA to express role/audience/question intent through existing fields and hand it downstream while retaining the pre-design stop condition."
    paths_in_scope:
      - "packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
      - "skills/analysis/sa/SKILL.md"
      - "skills/analysis/sa/SKILL.vi.md"
      - "skills/analysis/sa/references/presentation-intent.md"
      - "skills/analysis/sa/references/presentation-intent.vi.md"
      - "skills/analysis/ta/SKILL.md"
      - "skills/analysis/ta/SKILL.vi.md"
      - "skills/analysis/ta/references/presentation-intent.md"
      - "skills/analysis/ta/references/presentation-intent.vi.md"
      - "packages/workflow-bundle/test/fixtures/diagram-design-presentation-adapter/role-audience/**"
    dependencies:
      - "T3"
      - "T0 post-CHANGE-004 baseline compatibility verdict"
    outputs_expected:
      - "Four fail-first SA/TA x business/engineering fixtures"
      - "Existing-field mapping for directives_parsed, landscape.question_answered, and handoff targets"
      - "Zero new top-level schema fields and zero direct diagram/model/renderer/solution output"
      - "Byte-identical shared EN and shared VI intent references across SA/TA"
    review_checkpoint: "SPEC_COMPLIANCE checks AC-001 and BR-001/002; CODE_QUALITY checks concise hooks, shared-reference parity, and absence of duplicated authority."
    verification_hint: "Run architecture-role and adapter contract tests red/green; compare output-schema structure before/after, run four fixtures, cmp shared references, and scan for direct rendering/solution-selection language."
  - id: "T5"
    owner_role: "developer"
    name: "Add the post-canonical architecture-modeling derivative lane"
    objective: "Extend the existing model contract with an optional adapter request/result after canonical validation without changing canonical format routing or owner resolution."
    paths_in_scope:
      - "packages/workflow-bundle/test/architecture-modeling-contract.test.js"
      - "packages/workflow-bundle/test/architecture-modeling-drawio.test.js"
      - "skills/architecture/architecture-modeling/SKILL.md"
      - "skills/architecture/architecture-modeling/SKILL.vi.md"
      - "skills/architecture/architecture-modeling/references/model-contract.md"
      - "skills/architecture/architecture-modeling/references/model-contract.vi.md"
      - "skills/architecture/architecture-modeling/references/render-routing.md"
      - "skills/architecture/architecture-modeling/references/render-routing.vi.md"
      - "skills/architecture/architecture-modeling/references/presentation-derivative-contract.md"
      - "skills/architecture/architecture-modeling/references/presentation-derivative-contract.vi.md"
    dependencies: ["T4"]
    outputs_expected:
      - "Fail-first optional presentation_derivative request/result assertions"
      - "Adapter call only after canonical model/view/source_fact_ids and canonical ownership pass"
      - "Canonical render_plan remains DRAWIO/MERMAID/STRUCTURIZR with existing exactly-one-owner cases"
      - "Adapter absence/disable/rejection leaves the canonical result valid and byte-unchanged"
    review_checkpoint: "SPEC_COMPLIANCE checks AC-002/004/010; CODE_QUALITY checks optional backward compatibility, owner separation, and no competing artifact."
    verification_hint: "Run architecture-modeling contract/drawio tests red then green, compare canonical output fixtures byte-for-byte, test adapter absent/disabled/rejected, and assert presentation IDs never enter canonical render_plan."
  - id: "T6"
    owner_role: "developer"
    name: "Perform targeted review of provenance, adapter, and integration batches"
    objective: "Review T1-T5 against the approved Spec/Contract/Approach first, then resolve code/content/security findings before runtime generation."
    paths_in_scope:
      - "skills/architecture/diagram-design-presentation-adapter/**"
      - "skills/analysis/sa/**"
      - "skills/analysis/ta/**"
      - "skills/architecture/architecture-modeling/**"
      - "packages/workflow-bundle/test/diagram-design-*.test.js"
      - "packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
      - "packages/workflow-bundle/test/architecture-modeling-*.test.js"
    dependencies: ["T5"]
    outputs_expected:
      - "Recorded AC-001 through AC-008/010 spec-compliance verdict"
      - "Recorded code/content/security quality verdict after spec compliance"
      - "Zero unresolved HIGH/MEDIUM findings and explicit LOW dispositions"
    review_checkpoint: "Code-quality review cannot start until spec compliance passes or a human-approved exception exists; no exception is planned."
    verification_hint: "Rerun T1-T5 focused suites, provenance, semantic/security/accessibility, canonical byte diff, bilingual/reference, syntax/static, UTF-8, and changed-path checks after review fixes."
  - id: "T7"
    owner_role: "developer"
    name: "Generate runtime copies and prepare the 2.7.0 candidate surfaces test-first"
    objective: "Fan out the reviewed canonical skill through existing sync, then update additive-capability inventory/version/release surfaces only if T0 confirmed a 2.6.4 baseline."
    paths_in_scope:
      - "packages/workflow-bundle/runtime/codex/skills/**"
      - "packages/workflow-bundle/runtime/claude/skills/**"
      - "workflow-bundle.manifest.json"
      - "packages/workflow-bundle/workflow-bundle.manifest.json"
      - "packages/workflow-bundle/package.json"
      - "packages/workflow-bundle/bin/wfc.js"
      - "packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
      - "packages/workflow-bundle/test/release-surface.test.js"
      - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
      - "README.md"
      - "packages/workflow-bundle/README.md"
      - "docs/releases/workflow-bundle-v2.7.0.md"
    dependencies: ["T6"]
    outputs_expected:
      - "Fail-first discovery/inventory/2.7.0 candidate assertions"
      - "Generated Codex/Claude adapter trees byte-equal to canonical source"
      - "Exactly one new installed skill and zero nested vendored skills"
      - "2.7.0 candidate metadata and truthful additive/compatibility/known-limit/rollback release note"
      - "No registry publication, tag, live install, or hand-edited runtime file"
    review_checkpoint: "SPEC_COMPLIANCE checks AC-008/009/011; CODE_QUALITY checks generated allowlist, version consistency, release truthfulness, and no unrelated fan-out."
    verification_hint: "Run release assertions red, run existing runtime sync, run parity/skill-count/pack audit/release-surface tests, compare unaffected paths, scan versions/placeholders, and verify only generated/runtime and approved release surfaces changed."
  - id: "T8"
    owner_role: "devops"
    name: "Build and exercise one exact candidate lifecycle"
    objective: "Freeze one 2.7.0 tarball, hash it, test offline output plus install/update/disable/rollback in isolated homes, and retain the exact evidence without publication."
    paths_in_scope:
      - ".claude/worktrees/add-diagram-design-adapter-v2.7.0/artifacts/workflow-bundle-2.7.0.tgz"
      - "work-items/add-diagram-design-adapter/add-diagram-design-adapter.s07.implementation.md"
      - "changes/CHANGE-005/tasks.md"
    dependencies:
      - "T7 focused and parity tests green"
      - "Source diff frozen"
    outputs_expected:
      - "One retained candidate tarball, SHA-256, package inventory, version, and discovered-skill inventory"
      - "Isolated 2.6.4 -> 2.7.0 update, disable, reinstall, rollback-to-2.6.4, and clean-install evidence for Codex and Claude modes"
      - "Offline representative HTML/SVG/PNG smoke using the exact supported exporter tuple"
      - "Zero canonical/SA/TA regression after disable/rollback and zero network call during adapter invocation"
    review_checkpoint: "Candidate rebuild is forbidden after its digest is referenced; a source fix invalidates the candidate and repeats T8."
    verification_hint: "Use npm pack --json into ignored artifacts, hash it, run existing isolated release/install/rollback smokes against exact paths, compare inventories/digests, instrument no-network invocation, and rerun canonical/role/modeling regressions after rollback."
  - id: "T9"
    owner_role: "developer"
    name: "Review release batch and hand complete evidence to s08"
    objective: "Review T7-T8 in two tiers, run integrated pre-verify checks, and hand QC all evidence without declaring DoD, Release, Business Acceptance, merge, or cleanup."
    paths_in_scope:
      - "work-items/add-diagram-design-adapter/add-diagram-design-adapter.s07.implementation.md"
      - "changes/CHANGE-005/tasks.md"
    dependencies: ["T8"]
    outputs_expected:
      - "Recorded AC-009/011 spec-compliance verdict, then runtime/release/code-quality verdict"
      - "AC-001 through AC-011 implementation evidence matrix with commands, exits, hashes, and refs"
      - "Delivery Rule Evidence for TDD, required worktree, targeted reviews, and no delegation"
      - "QC handoff for READER-TASK-001, independent verify, rollback, Release, Business Acceptance, and DoD"
    review_checkpoint: "Implementation/review evidence is not DoD or Release; branch/worktree remain open through s08."
    verification_hint: "Run focused and full unit suites, runtime parity, pack audit, bundle/release/lifecycle smokes, workflow/change/planning/protocol validators, static/security/performance heuristics, git diff --check, UTF-8, provenance, and candidate-digest checks; record every skip/blocker."
dependencies_global:
  - "T0 -> T1 -> T2 -> T3 -> T4 -> T5 -> T6 -> T7 -> T8 -> T9"
  - "Any canonical fix after T7 requires regenerating and revalidating T7."
  - "Any source fix after T8 invalidates the retained candidate and repeats T8."
  - "s08 starts only after T9; s07 evidence never substitutes for QC verification or human gates."
risk_notes:
  - "CHANGE-004 and PNG provisioning are hard T0 blockers, not assumptions."
  - "Runtime sync is whole-tree generation, so changed-path and unaffected-digest evidence are mandatory."
  - "2.7.0 is conditional on verified post-CHANGE-004 baseline 2.6.4."
  - "Reader outcomes are measured only in s08 by independent reviewers."
verification_plan:
  - "Focused TDD: provenance, request/result, output/atomicity, SA/TA role, architecture-modeling integration, and release-surface tests."
  - "Semantic/security/accessibility: 100% fact IDs, zero semantic diff, no remote/active content, accessible HTML/SVG, PNG counterpart."
  - "Compatibility: canonical byte diff zero; existing architecture-role/modeling/drawio behavior remains green when adapter absent/disabled/rejected."
  - "Packaging: source/Codex/Claude recursive parity, one new skill, no nested skill, candidate inventory/digest."
  - "Lifecycle: isolated install/update/disable/rollback for both runtime modes with prior inventory restored."
  - "Governance: receipts, CHANGE-004 guard, worktree, review order, workflow/change/planning/protocol, pack audit, JSON/YAML, whitespace, and UTF-8."
  - "s08: READER-TASK-001, independent regression/security evidence, Release, Business Acceptance, and DoD decisions."
notes_for_implementation: "Execute sequentially in the approved worktree. T0 must pass before any production edit. Preserve red/green commands and targeted two-tier reviews in s07, never hand-edit runtime copies, never auto-install tooling at invocation, and stop before tag/publication/live install/merge/worktree cleanup."
~~~

## Execution Topology
~~~yaml
execution_mode: "agentic"
delegation_mode: "none"
delegation_reason: "Tasks share contract, fixtures, generated runtime, and candidate state in one strict dependency chain; disjoint merge/verify ownership is not available."
worktree_decision: "REQUIRED"
reason: "Full-track change spans multiple public skill boundaries, tests, generated runtimes, release surfaces, and 155 vendored files with conflict/release risk."
branch: "codex/add-diagram-design-adapter-v2.7.0"
worktree_path: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/add-diagram-design-adapter-v2.7.0"
governance_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory"
write_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/add-diagram-design-adapter-v2.7.0"
owned_scope:
  - "Implementation worktree: T1-T8 canonical, test, generated, release, and ignored candidate paths."
  - "Main governance root: CHANGE-005 and add-diagram-design-adapter workflow notes only."
write_guards:
  - "Worktree path is covered by .gitignore."
  - "No source edit before s07 activation grants exact roots."
  - "Unrelated dirty main-root files and existing worktrees remain untouched."
  - "CHANGE-004 paths are read only until its VERIFIED baseline is the worktree base."
merge_path:
  - "Implementation branch -> T6/T9 targeted reviews -> T9 QC handoff -> s08 Verify + DoD."
  - "Only after DoD may branch-finish review decide merge and worktree cleanup."
verification_owner: "qc"
~~~

## Deployment Plan
~~~yaml
deployment_scope: "Managed workflow-bundle packaging and isolated lifecycle verification; no container or application-platform deployment."
devops_objectives:
  - "Provision and record the PNG exporter outside adapter invocation."
  - "Keep canonical source and both managed runtime modes byte-consistent."
  - "Prove candidate install, update, disable, rollback, and offline invocation before Release review."
environment_matrix:
  - environment: "local"
    concerns: ["clean worktree", "TDD", "explicit exporter preflight", "no invocation-time network"]
    runtime_target: "source tree plus isolated Python/Playwright/Chromium test environment"
  - environment: "dev"
    concerns: ["isolated managed homes", "Codex/Claude parity", "negative missing-tool behavior"]
    runtime_target: "temporary install/update/disable/rollback homes"
  - environment: "uat"
    concerns: ["exact retained tarball", "offline HTML/SVG/PNG", "security/accessibility", "rollback rehearsal"]
    runtime_target: "release-candidate installation using recorded exporter tuple"
  - environment: "prod"
    concerns: ["human Release approval", "managed install", "post-install smoke", "rollback to 2.6.4"]
    runtime_target: "existing managed Codex/Claude skill homes; no action in s07"
specialized_followups: []
cross_cutting_guards:
  - "No Dockerfile, Compose, Kubernetes, service, secret, or new pipeline."
  - "Build once and test the exact retained candidate; no rebuild after digest attachment."
  - "No tag, registry publication, or live install before Release approval."
  - "Missing exporter rejects the complete output set."
evidence_or_gaps:
  - "CHANGE-004 owner is DONE with valid DoD; post-change SA/TA/modeling comparison and three baseline suites pass."
  - "Playwright/Chromium is absent from the inspected local environment."
  - "Task Plan, implementation, verify, Release, and Business Acceptance evidence are pending."
release_recommendation: "BLOCKED"
notes_for_implementation_or_release: "T0 resolves prerequisites; T7-T8 create candidate evidence only; s08 and human roles decide Release and rollout."
~~~

## Governance Checks
~~~yaml
checklist_applied:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
checks:
  - id: "GOV-S06-001"
    result: "PASS"
    evidence: "Ten tasks name objective, exact paths, dependencies, outputs, review checkpoint, and verification hint."
  - id: "GOV-S06-002"
    result: "PASS"
    evidence: "Every behavior batch is test-first and every risky batch has spec-compliance before code-quality review."
  - id: "GOV-S06-003"
    result: "PASS"
    evidence: "Required worktree, no delegation, main/worktree ownership, merge path, and cleanup guard are explicit."
  - id: "GOV-S06-004"
    result: "PASS"
    evidence: "CHANGE-004, PNG provisioning, version collision, runtime parity, lifecycle, rollback, and human release blockers are explicit."
  - id: "GOV-S06-005"
    result: "PASS"
    evidence: "AC-001 through AC-011 map to task and verification evidence without a spec/approach change."
  - id: "GOV-S06-006"
    result: "PASS"
    evidence: "A1 changes only planning prerequisites/version surfaces; the edited Task Plan is accepted and finalized, with a new matching trusted receipt still required. No production write paths are granted."
blocking_items_for_plan_review: []
blocking_items_for_s07:
  - "Trusted Task Plan receipt."
  - "Recheck the recorded CHANGE-004 DONE/DoD and baseline compatibility if main moves."
  - "Explicit activation and worktree write grants."
  - "Approved PNG toolchain provisioning/preflight."
owner: "developer/qc/devops"
next_action: "Human signs the explicitly accepted Task Plan; recorded content approval does not substitute for the trusted receipt."
exceptions: []
waivers: []
~~~

## Brownfield Delivery Plan
~~~yaml
regression_checkpoints:
  - "T0 baseline and T4/T5/T8/T9 reruns of architecture-role, architecture-modeling, and Draw.io suites."
  - "Canonical artifacts remain byte-identical when adapter is absent, disabled, rejected, or rolled back."
  - "Exactly one new skill in source/Codex/Claude and zero unrelated skill digest changes."
compatibility_checkpoints:
  - "SA/TA top-level schema and s01-s04 authority remain unchanged."
  - "Canonical render_plan owner/format cases remain unchanged."
  - "Optional derivative fields do not break existing consumers."
  - "2.7.0 only follows a verified 2.6.4 baseline."
migration_or_backfill_steps:
  - "No database, API, event, content, or canonical-artifact migration."
  - "Managed runtime sync installs one additive optional skill."
rollback_or_restore_steps:
  - "Disable/remove the adapter from isolated managed homes and restore the recorded 2.6.4 candidate."
  - "Regenerate both runtime trees from the restored canonical source."
  - "Verify prior inventory, canonical/role/modeling behavior, and parity."
  - "Keep branch/worktree until s08 DoD and branch-finish decision."
~~~

## Audit
~~~yaml
step: "s06 Task Plan authoring"
status: "PASS"
checks:
  - criterion: "Every AC maps to a task and verification path."
    result: "PASS"
    evidence: "Traceability maps AC-001 through AC-011 to T0-T9 and named focused/integrated checks."
  - criterion: "Behavior changes use TDD and plan tasks are independently reviewable."
    result: "PASS"
    evidence: "T1-T5/T7 require red evidence before minimum implementation and green reruns; T6/T9 are separate targeted reviews."
  - criterion: "Execution topology and ownership are safe."
    result: "PASS"
    evidence: "One ignored worktree, agentic/no-delegation, exact roots, sequential chain, merge/cleanup guard, and QC owner are locked."
  - criterion: "Brownfield, runtime, release, and rollback controls are executable."
    result: "PASS"
    evidence: "T0/T7/T8 and delivery/deployment blocks name baseline, exporter, parity, candidate, lifecycle, and restore checks."
  - criterion: "No gate or implementation permission is self-declared."
    result: "PASS"
    evidence: "The prior Task Plan approval is historical; explicit A1 acceptance is now recorded with Developer reviewer fields. Existing signed upstream hosts are unchanged, write paths remain empty and T0 blockers are explicit."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one planning pass after verified Approach receipt."
gaps: []
risk_level: "HIGH"
next_action: "Sign accepted A1, verify T0 evidence and reconcile satisfied protocol entries before activation."
~~~

## Traceability
~~~yaml
upstream:
  - "add-diagram-design-adapter.s04.acceptance-criteria.md"
  - "add-diagram-design-adapter.s05.technical-approach.md"
  - "changes/CHANGE-005/spec-delta/brd.delta.md"
  - "changes/CHANGE-005/spec-delta/srs.delta.md"
task_refs:
  - acceptance: ["AC-001"]
    tasks: ["T2", "T4", "T9"]
    tests: ["diagram-design-presentation-adapter-contract", "architecture-role-skills-contract"]
  - acceptance: ["AC-002", "AC-003"]
    tasks: ["T2", "T5", "T9"]
    tests: ["positive request/result", "one negative fixture per fail-closed condition"]
  - acceptance: ["AC-004", "AC-005"]
    tasks: ["T3", "T5", "T6", "T9"]
    tests: ["canonical byte diff", "fact coverage", "semantic diff"]
  - acceptance: ["AC-006"]
    tasks: ["T0", "T3", "T8", "T9"]
    tests: ["offline HTML/SVG/PNG", "accessibility", "static security", "missing-tool/atomic failure"]
  - acceptance: ["AC-007"]
    tasks: ["T9"]
    tests: ["READER-TASK-001 is reserved for independent s08 execution"]
  - acceptance: ["AC-008"]
    tasks: ["T1", "T6", "T7", "T9"]
    tests: ["sha256-manifest-v1", "license/capability", "one-skill discovery"]
  - acceptance: ["AC-009"]
    tasks: ["T7", "T8", "T9"]
    tests: ["isolated install/update/disable/rollback and parity"]
  - acceptance: ["AC-010"]
    tasks: ["T0", "T4", "T5", "T9"]
    tests: ["CHANGE-004 status/baseline/path ownership"]
  - acceptance: ["AC-011"]
    tasks: ["T6", "T7", "T8", "T9"]
    tests: ["full verification/evidence matrix and human-gate audit"]
next_step: "s07 only after human Developer approval, trusted Task Plan receipt, CHANGE-004 VERIFIED baseline re-read, and explicit activation/write grants"
~~~

## Handoff
- First task: T0; it blocks every source edit until Task Plan, CHANGE-004, baseline, worktree, version, and PNG prerequisites pass.
- Execution: one agent, one required ignored worktree, strict T0 through T9 dependency chain, no subagent.
- Review: T6 and T9 record spec compliance before code quality; their PASS is not DoD.
- Release: target 2.7.0 only on verified 2.6.4 baseline; build one retained candidate and do not publish/install live in s07.
- Condition for s07: Human Developer must approve A1 and seal its finalized host; obtain explicit PNG provisioning approval, pass T0 preflight, reconcile protocol state and obtain router-approved activation/write roots.


## Amendment A1 — Baseline, Version and PNG Toolchain

### Review scope and preserved authority

The user initially authorized preparation, then explicitly replied `accept` to approval of A1 and isolated PNG provisioning. The latter decision is recorded at 2026-10-20T09:31:30Z; it authorizes the bounded plan and toolchain, while trusted sealing and activation remain separate controls. The previous host SHA-256 was `ccbd3b20349e4405bb6a681b45502fabcb0d86e32090cda471eec22533e0a6e5`; its exact bytes are preserved at `/private/tmp/cf-adapter-plan-20261020/before/work-items/add-diagram-design-adapter/add-diagram-design-adapter.s06.task-breakdown.md`. Before editing, its trusted signature matched. That signature now describes the historical plan and must be replaced only after human acceptance of A1.

S06-RISK-004 in that historical host explicitly required plan re-review if the verified baseline was no longer 2.5.0. A1 changes the baseline to 2.6.4 and the proposed next minor to 2.7.0, including branch/worktree, candidate filename, release note, lifecycle update and rollback references. It does not alter T1-T9 ownership, acceptance thresholds, output formats, upstream bytes, canonical rendering authority or release controls.

| Baseline check | Evidence and conclusion |
| --- | --- |
| Source identity | `fa9ad237f8179e58b16ca6c6c589bdd0728ec476`, bundle 2.6.4; hosted run [39392788611](https://github.com/haonh87/Code-Factory/actions/runs/39392788611) passed all ten jobs after fixture isolation integration. |
| Prerequisite owner | `integrate-design-checklists-into-sa-ta` is DONE; its DoD signature matches. DONE satisfies the plan's VERIFIED prerequisite. |
| SA/TA baseline | Comparison from before CHANGE-004 commit `26591a2` to current main changes only EN/VI design-readiness hooks and references in the affected skill roots. Existing output schemas and role boundaries are preserved. |
| Modeling baseline | No change in the architecture-modeling skill root over that comparison. Architecture role contract, modeling contract and deterministic Draw.io tests all pass on current main. |
| Gate impact | Spec/Contract/DoR host `d6a4b4236c517e355a91e0f30e201de8a0c529fbb9d223aea2b24e1ef4c763bd` and Approach host `a84a9fff7d312f23dab337e534e7a2e1963bade35a2ab2456901bb805890084d` remain byte-identical with valid receipts. Only Task Plan requires renewed approval/signing for this delta. |
| Version availability | GitHub matching refs returned no v2.7.0 tag and release lookup returned 404 on 2026-10-20. Recheck exact tag/release and candidate paths before T7; availability today is not a reservation. |
| Runtime parity | The clean worktree for this exact main SHA generated both runtimes without tracked drift and passed 47 unit-test files. T7 must repeat generation/inventory checks after adapter changes. |

The source baseline contains changes after the published v2.6.4 release. T8 must distinguish source SHA from release identity: update/rollback tests use the retained published v2.6.4 artifact and its recorded digest, while source regression uses the pinned main SHA. No claim that they are byte-identical is made.

### Accepted exporter tuple and options

Use the existing `/opt/homebrew/opt/python@3.14/bin/python3.14` (CPython 3.14.6, non-free-threaded) on macOS 27.0.1 ARM64. Recommended tuple: `playwright==1.64.0`, `greenlet==3.5.6`, `pyee==14.0.0`, `typing-extensions==4.16.0`, and the Playwright Chromium headless shell `156.0.8078.4` / revision `1248`. The installer may also provision its manifest-pinned ffmpeg revision `1013`; record the actual installed inventory. Browser and package versions must be checked before launch.

Alternative: provision a separate Python interpreter or use a system Chrome channel. Rejected for this revision because the current interpreter has compatible published wheels, while a new interpreter adds maintenance and a system browser does not give the same revision pin. Metadata compatibility is not runtime success; import/launch/offline PNG smoke remains a hard T0 condition. If the proposed tuple fails, stop and propose a bounded replacement instead of silently upgrading.

[Playwright 1.64.0 package metadata](https://pypi.org/pypi/playwright/1.64.0/json) requires Python >=3.10, greenlet >=3.1.1,<4 and pyee >=13,<15. The selected pyee is deliberately 14.0.0; current 15.0.0 is outside that range. Dependency metadata: [greenlet 3.5.6](https://pypi.org/pypi/greenlet/3.5.6/json), [pyee 14.0.0](https://pypi.org/pypi/pyee/14.0.0/json), [typing-extensions 4.16.0](https://pypi.org/pypi/typing-extensions/4.16.0/json). The [tagged browser manifest](https://raw.githubusercontent.com/microsoft/playwright/v1.64.0/packages/playwright-core/browsers.json) pins the browser revisions. [Official browser setup](https://playwright.dev/python/docs/browsers) supports a dedicated browser cache and headless-only installation. Upstream license/NOTICE files must remain with the installed environment; it is not bundled into the adapter package.

Approved-platform wheel hashes for the accepted lock:

```text
playwright==1.64.0 --hash=sha256:8de42430e9a7c8b04ec963856d484d36ffd452882318ebad2df3e6fb49a8197a
greenlet==3.5.6 --hash=sha256:8cddea1b8339451c2fb3388e138347b6126744f33b611bdb55b7357361cfef46
pyee==14.0.0 --hash=sha256:3ac2d3229a9677f7de2c33d7f52fe25b638a46b19c413fea2edc8c6d0a644e4d
typing-extensions==4.16.0 --hash=sha256:481caa481374e813c1b176ada14e97f1f67a4539ce9cfeb3f350d78d6370c2e8
```

These hashes select macOS ARM64 Playwright, CPython 3.14 universal2 greenlet (ordinary `cp314` ABI), and pure-Python wheels. Other platforms/ABIs need their own reviewed wheel hashes; do not weaken hash checks to reuse this lock.

### T0 execution order after acceptance

1. Finalize/sign A1 Task Plan and verify explicit approval for isolated exporter provisioning. The explicit provisioning approval permits its independent scratch preflight while human signing is pending; production activation still requires the finalized signature. Confirm current main SHA and affected gate hashes again. Preserve report state through supported CLI operations only.
2. Create only the task-local toolchain root `/private/tmp/cf-diagram-png-1.64.0` and a venv there using the existing Python executable. Materialize the lock above as `requirements.lock`. Use the venv Python for all package and browser commands; do not alter global packages or shell configuration.
3. Run `venv/bin/python -m pip install --only-binary=:all: --require-hashes -r requirements.lock` with the working directory set to the toolchain root. Then run `venv/bin/python -m pip check` and confirm all four installed versions and the Python ABI. Network access is limited to this explicitly requested provisioning step.
4. With `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/cf-diagram-png-1.64.0/browsers`, run `venv/bin/python -m playwright install --only-shell chromium`. Read the installed package browser manifest and reject any mismatch against revision 1248/version 156.0.8078.4 before launch. Record actual browser path, version, binary SHA-256 and license/NOTICE inventory in s07 evidence. Do not use system Chrome or automatic downloads at adapter invocation.
5. Run a scratch launch/PNG probe using `chromium.launch(headless=True)` with no channel override, a local static HTML fixture and all browser-context HTTP/HTTPS requests aborted. Write a transparent PNG in the scratch root; verify the PNG signature, IHDR width/height and nonempty content. Capture the browser version, probe exit code and request-blocking evidence. This establishes tool readiness only; T3 still proves adapter semantics, accessibility, atomicity and failure handling.
6. Reconcile the exact obsolete CHANGE-004 blocker/follow-up and the satisfied toolchain blocker/follow-up through the supported signed state-disposition path. Preserve all unrelated actions. A successful preflight is evidence for disposition, never authority to fabricate or hand-edit report state.
7. Revalidate work-item/change approvals and unchanged authoring receipts, activate s07 with the exact owned paths, then create `codex/add-diagram-design-adapter-v2.7.0` and its ignored worktree from the verified baseline. Begin T1 only after those controls pass. If main has moved, inspect its delta and repeat affected checks before choosing the base.

The toolchain directory is disposable scratch. If removed or interpreter/browser versions change, repeat provisioning/preflight before T3, T8 or s08. Positive PNG evidence cannot be replaced by an unavailable-tool skip. T7/T8 remain candidate preparation only; Release, Business Acceptance, DoD, publication and integration require their own applicable decisions.

### Current readiness

A1 content and isolated provisioning are accepted. Implementation remains unopened until the renewed Task Plan signature, passing launch/PNG evidence, signed protocol-state reconciliation and activation/write grants are present. s07 owns actual provisioning evidence; this finalized note records the decision and must remain stable for signing.

### Human A1 Decision — 2026-10-20

The user replied `accept` to the concrete A1 plan and isolated provisioning request. Decision recording timestamp: `2026-10-20T09:31:30Z`; Task Plan reviewer role `developer`, provisioning decision under the proposed Developer/DevOps responsibilities. Approved scope: baseline main fa9ad23/bundle 2.6.4, candidate target 2.7.0 subject to T7 availability recheck, the exact package hashes/browser tuple above, and isolated installation/import/launch/PNG checks under `/private/tmp/cf-diagram-png-1.64.0`.

The user also accepted the A1 T0 sequence for supported signed disposition of the exact satisfied prerequisite entries. No unrelated report entry, acceptance criterion or release gate is waived. Existing Spec/Contract/DoR/Approach hosts stay unchanged. Trusted Task Plan sealing and state-disposition signatures must be entered through the normal human-controlled terminal before agent activation. No new content approval is required for this accepted scope.
