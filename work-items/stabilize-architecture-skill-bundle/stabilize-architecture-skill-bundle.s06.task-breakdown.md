---
artifact_id: "stabilize-architecture-skill-bundle.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "stabilize-architecture-skill-bundle"
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
  approach_reviewed_by: []
  approach_reviewed_at: ""
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-14T14:52:36Z"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
  - "worktree-discipline"
  - "review-discipline"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "stabilize-architecture-skill-bundle.s05.technical-approach.md"
linked_artifacts:
  - "changes/CHANGE-002/tasks.md"
  - "changes/CHANGE-002/design.md"
  - "stabilize-architecture-skill-bundle.s04.acceptance-criteria.md"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Execute nine ordered batches in one isolated worktree: establish the baseline, fix permissions,
> correct sa/ta, strengthen evidence validation, add the architecture-modeling contract and drawio
> tools, regenerate runtimes, align v2.4.0 release surfaces, then build a retained candidate. Each
> behavior batch starts red and receives `spec compliance -> code quality` review before handoff.

## Step Contract
```yaml
step: "s06 Task Plan"
goal: "Produce an execution-ready, path-owned, test-first plan that implements the approved s05 design and proves AC-001 through AC-010 without reopening design decisions during s07."
value: "The implementer can work batch by batch in an isolated worktree, and reviewers can identify the exact red test, code boundary, verification command, and rollback point for every acceptance criterion."
scope_in:
  - "Worktree setup and capability-control write roots"
  - "Installer/runtime-sync permission behavior"
  - "sa/ta public skill contract corrections"
  - "Workflow semantic and protocol-state validation"
  - "Canonical architecture-modeling skill and deterministic drawio tools"
  - "Runtime generation, inventory, release docs, candidate packaging, review, and rollback evidence"
scope_out:
  - "Production implementation before Task Plan receipt and work-item activation"
  - "Registry publication, immutable tag creation, or live global installation before Release approval"
  - "Editing the user-owned .claude/skills/architecture-modeling candidate"
  - "Editing the user's existing workflow-trusted-approval-utils.js change"
  - "Rewriting historical reviewer identities or old trusted receipts"
  - "Multi-agent or subagent execution"
inputs_required:
  - "Approved s04 Spec, Contract, and DoR receipts"
  - "Approved s05 Approach receipt with digest 744be8686c369aedf6c38e9787954d4433234373172b59777638aa132070cfda"
  - "CHANGE-002 approved deltas and design"
  - "Current main-worktree dirty-file inventory"
  - "Existing unit, smoke, governance fixture, audit, runtime sync, and version tooling"
outputs_required:
  - "Nine tasks with exact paths, dependencies, outputs, review checkpoints, and verification hints"
  - "TDD, worktree, review, brownfield regression, compatibility, rollback, and candidate controls"
  - "AC-to-task and requirement-to-task traceability"
  - "A human-reviewable Task Plan gate artifact"
done_when:
  - "Every AC-001 through AC-010 maps to at least one implementation task and one verification path"
  - "Every behavior or contract change names its failing test before implementation"
  - "The isolated worktree, branch, write roots, and dirty-file exclusion guards are explicit"
  - "Full-track targeted reviews are split by risky batch in the required order"
  - "Release candidate, first-open check, rollback smoke, and no-publication boundary are explicit"
  - "No placeholder or unresolved execution choice remains"
constraints:
  hard_constraints:
    - "Do not enter s07 before the Task Plan receipt passes and the work item is activated"
    - "Use an in-repo ignored worktree for all production/source edits"
    - "Keep workflow artifacts in the main governance root and user-owned dirty paths out of the implementation branch"
    - "Use TDD for permission, validator, renderer, and public-contract behavior changes"
    - "Review each risky batch as spec compliance before code quality"
    - "Do not tag, publish, or touch live global installations before Release approval"
  soft_constraints:
    - "Prefer focused CommonJS utilities and existing test conventions over new dependencies"
  prohibited_actions:
    - "Copying the untracked candidate wholesale without adapting the approved contract"
    - "Broad chmod, broad recursive deletion, or broad rollback at a runtime root"
    - "Replacing required drawio output with Mermaid"
    - "Closing or removing the worktree before s08 DoD"
  compliance_checks:
    - "Task Plan trusted receipt and activation status before any production edit"
    - "Worktree path resolves inside the repository and is gitignored"
    - "Red/green log for every TDD target"
    - "Batch review evidence in the order spec compliance then code quality"
    - "Unmanaged digest/mode checks and unrelated dirty-path diff checks"
risks:
  - id: "S06-R01"
    description: "The isolated branch does not contain the uncommitted governance artifacts from the main worktree."
    likelihood: HIGH
    impact: MEDIUM
    severity: HIGH
    mitigation: "Keep s01-s08 and CHANGE-002 artifacts in the main governance root, treat them as read-only inputs from the implementation worktree, and run new validator code against the main workflow root via explicit absolute project/workflow arguments."
    contingency: "Stop before source edits if receipt discovery or workflow validation cannot operate across the declared roots."
    owner: "developer"
    status: MONITORING
  - id: "S06-R02"
    description: "Generated runtime fan-out can create a large diff or overwrite stale read-only runtime content."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Fix and test managed permission preparation before runtime regeneration; review source changes before running sync and require recursive source/runtime equality afterward."
    contingency: "Discard generated runtime changes in the isolated branch and rerun only after the focused sync test passes."
    owner: "developer"
    status: MONITORING
  - id: "S06-R03"
    description: "A candidate can be built before the required manual drawio check is available."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "A candidate may be retained for inspection, but Release remains blocked until QC records first-open evidence against that candidate's representative artifact."
    contingency: "Invalidate the candidate if renderer source changes, rebuild once, and repeat candidate inspection."
    owner: "qc"
    status: MONITORING
timebox:
  target_duration: "One implementation session plus one verification/review session"
  deadline: ""
  escalation_rule: "Return to s05 for re-review if a task requires an external renderer, a different ownership boundary, or a broad permission surface; return to s04 through CHANGE-002 if an acceptance threshold must change."
```

## Approach Clarifications
```yaml
clarifications:
  - id: "S06-CLAR-001"
    source_ref: "stabilize-architecture-skill-bundle.s05.technical-approach.md#Architecture-Modeling-Ownership-And-Drawio-Contract"
    observation: "The approved s05 runtime_paths examples omit the architecture category, while the actual recursive runtime sync preserves canonical relative directories."
    corrected_execution_paths:
      - "packages/workflow-bundle/runtime/codex/skills/architecture/architecture-modeling"
      - "packages/workflow-bundle/runtime/claude/skills/architecture/architecture-modeling"
    classification: "Planning-time path correction; no change to recommended option, source ownership, public interface, quality thresholds, or release controls."
    approval_effect: "Do not edit the sealed s05 artifact. Human Task Plan review explicitly accepts these executable paths."
    accepted_by: "developer"
    accepted_at: "2026-08-14T14:52:36Z"
spec_change_required: false
governance_exception_required: false
```

## Main Artifact
```yaml
implementation_goal: "Deliver a tested v2.4.0 candidate that safely updates hardened managed content, exposes corrected sa/ta and architecture-modeling contracts, rejects misleading evidence, contains 41 identical canonical/runtime skills per mode, and remains unpublished until release gates pass."
ba_lane:
  acceptance_coverage:
    - "AC-001 -> T1 and T8"
    - "AC-002, AC-003, AC-005 -> T2 and T8"
    - "AC-004 and protocol portion of AC-010 -> T3 and T8"
    - "AC-006 and AC-007 -> T4, T6, and T8"
    - "AC-008 -> T5 and T8 plus QC first-open handoff"
    - "AC-009 and release-evidence portion of AC-010 -> T7 and T8"
  scope_guards:
    - "Only CHANGE-002 requirements and reviewed finding paths are changed"
    - "Historical v2.3.2 gate notes stay unmodified; a CHANGE-002 correction record supersedes misleading evidence"
    - "The v2.3.2 release note may receive only a clearly dated supersession pointer, not rewritten historical claims"
    - "No global installation, tag, registry publication, or worktree cleanup before the corresponding human gates"
    - "No edits to workflow-trusted-approval-utils.js or the untracked .claude skill candidate"
  human_review_points:
    - "Developer approves this Task Plan before activation"
    - "Developer performs targeted s07 batch reviews in the order spec compliance then code quality"
    - "QC performs the first-open drawio check and owns s08 verification"
    - "DevOps/QC approve Release; PO approves Business Acceptance; QC approves DoD"
dev_lane:
  path_map:
    - "Permission lane: packages/workflow-bundle/scripts/workflow-bundle-utils.js, workflow-bundle-cli.js, sync-workflow-bundle-runtime.js and focused tests"
    - "SA/TA lane: skills/analysis/sa/**, skills/analysis/ta/** and architecture-role contract tests"
    - "Evidence lane: validate-workflow-governance.js, workflow-gate-evidence-utils.js, validate-work-item-protocol.js, governance fixtures and tests"
    - "Modeling lane: skills/architecture/architecture-modeling/** and architecture-modeling contract/drawio tests"
    - "Generated lane: packages/workflow-bundle/runtime/codex/skills/** and runtime/claude/skills/**"
    - "Release lane: manifests, package metadata, wfc help, public docs, release notes, CHANGE-002 correction evidence, smoke/audit/version tests"
    - "Governance lane: main-root work-items/stabilize-architecture-skill-bundle/** and changes/CHANGE-002/** only"
  technical_sequence:
    - "T0 establish isolation and baseline"
    - "T1 fix permission primitives before any runtime regeneration"
    - "T2 and T3 close existing contract/evidence defects"
    - "T4 establish the public architecture-modeling contract"
    - "T5 implement deterministic drawio against that contract"
    - "T6 regenerate and audit both runtimes"
    - "T7 align version and release surfaces"
    - "T8 run integrated verification and retain the candidate"
  tdd_targets:
    - "T1: hardened managed destination currently fails or is not normalized; test fails first, then passes with unchanged unmanaged hashes/modes"
    - "T2: current sa/ta YAML, ownership, example, metric, and count assertions fail first, then pass in EN/VI"
    - "T3: empty/placeholder/stale/coverage/protocol contradiction fixtures are accepted before the validator change, then rejected"
    - "T4: architecture-modeling presence, trigger, resource, EN/VI, render-owner, and no-house/house contract assertions fail before the skill exists"
    - "T5: render-owner refusal and representative drawio XML/geometry quality tests fail before helper implementation"
    - "T6: inventory expectation for 41 and canonical/runtime equality fails before sync"
    - "T7: v2.4.0/version/inventory/release-truth assertions fail before metadata and docs are aligned"
task_breakdown:
  - id: T0
    owner_role: developer
    name: "Activate and isolate the implementation baseline"
    objective: "Open s07 only after the Task Plan receipt, create the ignored in-repo worktree, and record the exact baseline without carrying unrelated dirty files into the branch."
    paths_in_scope:
      - ".claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0"
      - "work-items/stabilize-architecture-skill-bundle"
      - "changes/CHANGE-002"
    dependencies:
      - "Task Plan trusted receipt APPROVED with digest_match=true"
    outputs_expected:
      - "ACTIVE protocol status at s07 with three explicit write roots"
      - "Branch codex/stabilize-architecture-skill-bundle-v2.4.0 at the recorded main HEAD"
      - "Baseline git status, Node/npm versions, 40-skill counts, focused-test results, and dirty-path exclusion list"
    review_checkpoint: "Confirm the worktree path is inside the repo and ignored; confirm workflow-trusted-approval-utils.js and .claude/skills are absent from the implementation diff."
    verification_hint: "Run git worktree list, git status --short in both roots, git check-ignore .claude/worktrees, and baseline skill-count/test commands."
  - id: T1
    owner_role: developer
    name: "Make managed install, update, and runtime sync permission-safe"
    objective: "Recover owner-write access only for explicit managed targets so hardened repeat operations succeed without touching unmanaged siblings."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-bundle-utils.js"
      - "packages/workflow-bundle/scripts/workflow-bundle-cli.js"
      - "packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js"
      - "packages/workflow-bundle/test/workflow-bundle-utils.test.js"
      - "packages/workflow-bundle/test/run-workflow-bundle-smoke.test.js"
      - "packages/workflow-bundle/test/sync-workflow-bundle-runtime.test.js"
    dependencies: ["T0"]
    outputs_expected:
      - "Reusable managed-path write-preparation/copy behavior"
      - "Four Codex/Claude x global/project hardened update fixtures"
      - "Repeat runtime-sync fixture against hardened generated content"
      - "Unmanaged file content and mode digest assertions"
    review_checkpoint: "SPEC_COMPLIANCE: allowlist contains only selected managed destinations. CODE_QUALITY: permission recursion, error paths, and platform mode handling are minimal and readable."
    verification_hint: "Observe focused tests fail for the current EACCES/read-only behavior, implement the minimum change, then rerun the three focused test files and the isolated four-scenario smoke."
  - id: T2
    owner_role: developer
    name: "Correct sa and ta contracts, examples, metrics, and bilingual parity"
    objective: "Make every owned YAML/example/metric claim parseable, lens-correct, distinct, and mechanically reproducible as M-01 through M-10."
    paths_in_scope:
      - "skills/analysis/sa/SKILL.md"
      - "skills/analysis/sa/SKILL.vi.md"
      - "skills/analysis/sa/references/**"
      - "skills/analysis/sa/agents/openai.yaml"
      - "skills/analysis/ta/SKILL.md"
      - "skills/analysis/ta/SKILL.vi.md"
      - "skills/analysis/ta/references/**"
      - "skills/analysis/ta/agents/openai.yaml"
      - "packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
    dependencies: ["T1"]
    outputs_expected:
      - "Exact threshold enum quantified|binary|not_quantified in all owned schemas"
      - "Valid YAML fences with no compact-map defect"
      - "Complementary SA/TA examples that obey block ownership"
      - "Exactly M-01..M-10 with consistent counts, denominators, formula/value/evidence/threshold/calibration"
      - "EN/VI semantic-parity evidence"
    review_checkpoint: "SPEC_COMPLIANCE: CR-REQ-002/003/005 and block ownership pass. CODE_QUALITY: duplicated shared references remain byte-identical where declared, while worked examples remain intentionally distinct."
    verification_hint: "Create the contract test first and confirm current failures; after edits run it, pack audit, reference drift diffs, YAML fence checks, and UTF-8 checks for every changed EN/VI file."
  - id: T3
    owner_role: developer
    name: "Reject semantic evidence defects and contradictory protocol state"
    objective: "Make finalized step and protocol validation reject the reviewed empty, placeholder, stale, inconsistent, and receipt-contradicting cases with actionable errors."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-workflow-governance.js"
      - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
      - "packages/workflow-bundle/scripts/validate-work-item-protocol.js"
      - "packages/workflow-bundle/test/validate-workflow-governance.test.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "packages/workflow-bundle/test/run-workflow-authoring-smoke.test.js"
      - "packages/workflow-bundle/tests/fixtures/workflow-governance/**"
      - "changes/CHANGE-002/evidence-correction.md"
    dependencies: ["T2"]
    outputs_expected:
      - "Step-specific required-field and placeholder checks for finalized gate hosts"
      - "Coverage total/status consistency checks"
      - "Protocol blocker/required-action checks against trusted work-item, change, and gate receipts"
      - "Named red/green negative fixtures"
      - "A CHANGE-002 correction record that supersedes misleading v2.3.2 notes without changing their historical approval metadata"
    review_checkpoint: "SPEC_COMPLIANCE: all CR-REQ-004/010 defect classes are rejected and historical facts remain append-only. CODE_QUALITY: semantic checks are field-scoped and paired with valid controls to prevent broad false positives."
    verification_hint: "Capture the current false-pass for each fixture, implement one rule at a time, rerun focused tests, then validate the live main-root work item with explicit --project-root and --workflow-root."
  - id: T4
    owner_role: developer
    name: "Create the canonical architecture-modeling public skill contract"
    objective: "Adapt the read-only candidate into a self-contained canonical skill with correct triggers, inputs, model/view rules, conditional render ownership, references, metadata, and EN/VI parity."
    paths_in_scope:
      - "skills/architecture/architecture-modeling/SKILL.md"
      - "skills/architecture/architecture-modeling/SKILL.vi.md"
      - "skills/architecture/architecture-modeling/agents/openai.yaml"
      - "skills/architecture/architecture-modeling/references/**"
      - "packages/workflow-bundle/test/architecture-modeling-contract.test.js"
    dependencies: ["T2", "T3"]
    outputs_expected:
      - "Canonical skill with no orphan resource reference"
      - "One text model and business/engineering views from the same stable facts"
      - "DRAWIO for landscape/integration, MERMAID only for flow/sequence, STRUCTURIZR_DSL for multi-view model-as-code"
      - "Mutually exclusive house-owned and built-in-owned render paths"
      - "Valid agents metadata and bilingual contract parity"
    review_checkpoint: "SPEC_COMPLIANCE: CR-REQ-006/007, trigger boundaries, and exactly-one-owner cases pass. CODE_QUALITY: instructions are concise, resource routing is explicit, and the skill does not absorb domain design or deployment generation."
    verification_hint: "Write the skill contract test first, prove missing-skill failures, create only the canonical tree, then run skill validation, pack audit, trigger tests, reference scan, and UTF-8 parity checks."
  - id: T5
    owner_role: developer
    name: "Implement and validate deterministic drawio rendering"
    objective: "Generate constrained uncompressed mxGraph XML for supported landscape/integration views and emit all approved quality evidence without an external dependency."
    paths_in_scope:
      - "skills/architecture/architecture-modeling/scripts/render-drawio.js"
      - "skills/architecture/architecture-modeling/scripts/validate-drawio.js"
      - "skills/architecture/architecture-modeling/scripts/drawio-layout.js"
      - "packages/workflow-bundle/test/architecture-modeling-drawio.test.js"
      - "packages/workflow-bundle/tests/fixtures/architecture-modeling/representative-model.json"
    dependencies: ["T4"]
    outputs_expected:
      - "Stable mxGraph cell IDs, domain containers, grid geometry, containment, and orthogonal routed relationships"
      - "Explicit refusal for house-owned, missing-owner, multiple-owner, and unsupported-view invocations"
      - "JSON quality report with model digest, output path, eight landscape counts, geometry results, and manual steps"
      - "Representative .drawio fixture retained for QC first-open review"
    review_checkpoint: "SPEC_COMPLIANCE: AC-007/008 thresholds and D1 ownership rules pass. CODE_QUALITY: renderer is deterministic, bounded to allowlisted view kinds, escapes XML safely, and shares calculations with the validator without hidden state."
    verification_hint: "Run red tests for owner refusal, XML structure, overlap, intersections, containment, node limits, delete tests, and deterministic output; implement minimum D1 behavior; repeat twice and compare output digests."
  - id: T6
    owner_role: developer
    name: "Regenerate both runtimes and enforce 41-skill inventory"
    objective: "Fan out the corrected canonical skill tree to Codex and Claude and prove exact source/runtime equality and package inclusion."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js"
      - "packages/workflow-bundle/scripts/audit-workflow-pack.js"
      - "packages/workflow-bundle/test/sync-workflow-bundle-runtime.test.js"
      - "packages/workflow-bundle/test/audit-workflow-pack.test.js"
      - "packages/workflow-bundle/runtime/codex/skills/**"
      - "packages/workflow-bundle/runtime/claude/skills/**"
    dependencies: ["T1", "T2", "T3", "T5"]
    outputs_expected:
      - "Exactly 41 SKILL.md files in canonical source and each runtime"
      - "Correct architecture-modeling paths under runtime/<mode>/skills/architecture/architecture-modeling"
      - "Recursive equality for the full canonical skill tree and both runtime skill trees"
      - "Audit checks for architecture-role contracts, bilingual resources, references, inventory, and runtime drift"
    review_checkpoint: "SPEC_COMPLIANCE: AC-006 and inventory clauses pass. CODE_QUALITY: generated diffs contain only canonical fan-out; no runtime-only manual edit exists."
    verification_hint: "Make the 41-count/drift test red, run runtime sync only after focused permission tests pass, then count, diff -qr, audit, and inspect package file inclusion."
  - id: T7
    owner_role: developer
    name: "Align v2.4.0 metadata, public docs, and correction history"
    objective: "Make every current public surface report the same release, inventory, limitations, verification, and rollback story while preserving prior releases as history."
    paths_in_scope:
      - "workflow-bundle.manifest.json"
      - "packages/workflow-bundle/workflow-bundle.manifest.json"
      - "packages/workflow-bundle/package.json"
      - "packages/workflow-bundle/bin/wfc.js"
      - "packages/workflow-bundle/scripts/bump-version.js"
      - "packages/workflow-bundle/README.md"
      - "README.md"
      - "docs/publish-surface.md"
      - "docs/workflow-docs-map.md"
      - "docs/workflow-bundle-quickstart.md"
      - "docs/releases/workflow-bundle-v2.3.2.md"
      - "docs/releases/workflow-bundle-v2.4.0.md"
      - "packages/workflow-bundle/test/bump-version.test.js"
      - "packages/workflow-bundle/test/run-workflow-bundle-smoke.test.js"
    dependencies: ["T3", "T6"]
    outputs_expected:
      - "Consistent v2.4.0 and 41-skill values on all current surfaces"
      - "A completed, placeholder-free v2.4.0 release note with CHANGE-002, compatibility, limitations, evidence, rollback, and gate boundaries"
      - "A dated supersession pointer in the v2.3.2 release note without rewriting original verification history"
      - "Version-bump and smoke assertions that catch conflicting current-release values"
    review_checkpoint: "SPEC_COMPLIANCE: AC-009/010 and historical-evidence policy pass. CODE_QUALITY: no blind version replacement changes historical references; links and package metadata remain valid."
    verification_hint: "Write failing version/inventory/release assertions first, run the bump tool in the isolated branch, review every replacement, fill the release note, then scan for stale current-release claims and placeholders."
  - id: T8
    owner_role: developer
    name: "Run integrated verification and retain the release candidate"
    objective: "Aggregate implementation evidence, complete early review handoff, exercise rollback in isolated roots, and build one inspectable candidate without publishing it."
    paths_in_scope:
      - "packages/workflow-bundle/**"
      - "skills/analysis/sa/**"
      - "skills/analysis/ta/**"
      - "skills/architecture/architecture-modeling/**"
      - "policies/codex/**"
      - "docs/**"
      - "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s07.implementation.md"
      - "changes/CHANGE-002/execution/task-status.md"
    dependencies: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"]
    outputs_expected:
      - "Focused and full test/validator/audit/smoke evidence"
      - "Four install/update scenarios plus v2.3.2 managed rollback smoke in isolated roots"
      - "Two-tier review results for every risky batch with no open blocker"
      - "npm pack dry-run inventory and one retained tarball with SHA-256 and source commit"
      - "Representative drawio path and quality report handed to QC for first-open review"
      - "s07 Delivery Rule Evidence and handoff to s08; no DoD claim"
    review_checkpoint: "SPEC_COMPLIANCE: AC matrix has no uncovered criterion or unrecorded drift. CODE_QUALITY: full diff scan, security/performance heuristics, generated-file provenance, and unrelated-dirty-file exclusion pass."
    verification_hint: "Run the full command matrix from Verification Plan, compare candidate contents/digest, run rollback smoke, update only s07/task-status evidence, and stop before tag/publication/DoD."
dependencies_global:
  - "Critical path: Task Plan receipt -> activation -> T0 -> T1 -> T2 -> T3 -> T4 -> T5 -> T6 -> T7 -> T8"
  - "T3 may begin after T1, but agentic execution remains sequential to avoid overlapping validator/test edits"
  - "T6 must not run before T1 permission behavior and T5 canonical skill content pass"
  - "T7 version bump must occur after runtime inventory is stable"
  - "T8 candidate creation is invalidated by any later tracked source change"
risk_notes:
  - "Main governance notes are not automatically present in the clean implementation worktree; use explicit main-root references and never copy unrelated dirty files."
  - "The drawio first-open check is human/QC evidence and remains a Release blocker until recorded."
  - "A stricter validator can reject legacy artifacts; valid-control fixtures and explicit CHANGE-002 correction evidence are mandatory."
  - "No broad chmod, runtime-root deletion, or live global test is allowed."
verification_plan:
  - "Focused Node tests for every changed script plus new architecture-role and architecture-modeling tests"
  - "npm run validate:workflow:unit"
  - "npm run validate:workflow:pack-audit"
  - "npm run build:workflow:bundle-runtime followed by 41-count and diff -qr for both complete skill trees"
  - "npm run validate:workflow, governance, planning, execution, protocol, change, SDD, authoring smoke, fixtures, and bundle smoke with explicit roots where required"
  - "Four isolated Codex/Claude x project/global install-update cases, unmanaged digest/mode comparison, and isolated v2.3.2 rollback smoke"
  - "architecture-modeling no-house, house-owner, invalid-owner, XML, geometry, deterministic digest, and quality-report tests"
  - "QC first-open draw.io review against the retained representative artifact"
  - "npm pack --dry-run JSON inspection, one retained tarball, SHA-256, package-content inventory, and no post-candidate source changes"
  - "UTF-8, EN/VI semantic parity, JSON validity, broken links/references, git diff --check, security heuristics, and unrelated dirty-path exclusion"
notes_for_implementation: "Run sequentially in the approved worktree. Record fail/pass commands and outputs in s07. Do not infer approval from passing tests, do not merge or clean the worktree before s08 DoD, and do not tag, publish, or update live global installations before Release approval."
```

## Worktree Strategy
```yaml
worktree_target: "stabilize-architecture-skill-bundle v2.4.0 implementation"
planning_track: full
risk_signals:
  - "Crosses installer, validators, public skill contracts, generated runtimes, docs, and release metadata"
  - "Touches many files and is expected to span implementation and verification sessions"
  - "Main worktree already contains user-owned dirty and untracked files"
  - "Generated runtime, merge, and release risk are material"
  - "Execution remains one agent; no independent path delegation is approved"
worktree_decision: REQUIRED
decision_reason:
  - "The work item is full-track, cross-cutting, release-sensitive, and explicitly classified as requiring isolation in s01/s05."
  - "The selected location is inside the repo and covered by the existing .gitignore entry .claude/worktrees/."
isolation_strategy:
  branch_name: "codex/stabilize-architecture-skill-bundle-v2.4.0"
  worktree_path: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0"
  owned_paths:
    - ".claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0"
    - "work-items/stabilize-architecture-skill-bundle"
    - "changes/CHANGE-002"
  expected_duration: "Implementation plus verification; keep until s08 DoD and branch-finish decision"
execution_guards:
  - "Activate s07 with each owned path passed as a separate --write-root."
  - "Record main and implementation git status before edits."
  - "All production/source edits occur in the implementation worktree; governance note/protocol edits occur only in the main root."
  - "Read sealed s04/s05 artifacts and trusted receipts from the main project root using explicit paths."
  - "Never stage, copy, or modify main-root workflow-trusted-approval-utils.js, .claude/skills, AGENTS.md, CLAUDE.md, Meeting.md, Untitled.base, or docs/release/community-pack-readme-en.md."
  - "Do not merge, remove, or prune the worktree during s07."
skip_reason: ""
cleanup_preconditions:
  - "s08 verification evidence complete"
  - "DoD receipt passed"
  - "No open findings, exceptions, candidate drift, or release blocker"
  - "Branch/worktree finish decision recorded"
notes_for_implementation: "The implementation branch starts from current HEAD, not from the main worktree's uncommitted files. Governance artifacts remain authoritative in the main root and are not silently copied into the code branch."
```

## Early Review Plan
```yaml
review_target: "CHANGE-002 implementation batches and release candidate"
planning_track: full
review_mode: TARGETED
review_order:
  - SPEC_COMPLIANCE
  - CODE_QUALITY
review_batches:
  - batch: "R1 managed permission behavior"
    scope: ["T1"]
    trigger: "Focused red/green tests pass before sa/ta or runtime regeneration begins"
    reviewer_role: "developer"
  - batch: "R2 public contracts and evidence validation"
    scope: ["T2", "T3", "T4"]
    trigger: "Each contract-focused test passes before drawio implementation"
    reviewer_role: "developer"
  - batch: "R3 drawio renderer and generated runtime"
    scope: ["T5", "T6"]
    trigger: "Geometry/ownership tests and source/runtime diffs pass before version bump"
    reviewer_role: "developer"
  - batch: "R4 release surfaces and candidate"
    scope: ["T7", "T8"]
    trigger: "Full checks and rollback smoke pass before s08 handoff"
    reviewer_role: "developer"
required_checks:
  spec_compliance:
    - "Matches AC/CR requirements and approved s05 ownership, format, compatibility, and release boundaries"
    - "No unrecorded spec, approach, or governance drift"
    - "No out-of-scope or user-owned dirty path in the diff"
  code_quality:
    - "Minimal delta, readable CommonJS, explicit error messages, deterministic outputs, and bounded recursion"
    - "Negative and valid-control tests cover failure and false-positive risks"
    - "Generated runtimes have canonical provenance and docs are UTF-8"
finding_policy:
  blocker_threshold: "Any spec-compliance failure, HIGH finding, unmanaged mutation, non-deterministic renderer result, stale candidate digest, missing TDD red evidence, or source/runtime drift blocks the next batch and s08 handoff."
  reopen_conditions:
    - "A code-quality fix changes a public contract or acceptance behavior"
    - "A post-review edit changes candidate inputs or generated runtimes"
    - "QC first-open review finds a visual defect not represented by automated geometry"
handoff_to_verify:
  - "Batch review verdicts and resolved findings"
  - "AC-to-test evidence matrix"
  - "Candidate digest, package inventory, rollback evidence, and drawio quality report"
  - "Open manual QC/Release/Business Acceptance/DoD gates"
notes_for_implementation_or_verify: "Review pass is not DoD. s08 independently verifies the integrated result and decides whether branch/worktree finalization is allowed."
```

## Verification Plan

- Focused behavior checks: run the exact changed/new `.test.js` files after each red/green cycle.
- Full static/unit checks: `npm run validate:workflow:unit`, `npm run validate:workflow:pack-audit`, and the complete workflow validator matrix.
- Runtime checks: `npm run build:workflow:bundle-runtime`, count 41 `SKILL.md` files in source and each runtime, then run `diff -qr skills packages/workflow-bundle/runtime/<mode>/skills` for both modes.
- Install checks: four isolated mode/scope cases, repeat after chmod hardening, compare unmanaged content and mode digests, then test v2.3.2 managed rollback.
- Architecture checks: validate both render-owner branches, negative owner cases, deterministic drawio digest, mxGraph XML, containment, overlaps, intersections, all quality counters, and QC first-open behavior.
- Release checks: scan v2.4.0/41-skill consistency, inspect `npm pack --dry-run --json`, retain one tarball and SHA-256, and invalidate it after any tracked edit.
- Text/security checks: UTF-8 for all changed text, EN/VI parity, `git diff --check`, no dependency addition, package content allowlist, and code-scan security/performance heuristics.
- Skipped until human gate: tag creation, registry publication, live global install/update, Release, Business Acceptance, DoD, merge, and worktree cleanup.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - id: "GC-01"
    check: "Approved Spec, Contract, DoR, and Approach evidence exists"
    verdict: PASS
    evidence: "All four gate receipts are APPROVED and digest-matched; s05 digest is 744be8686c369aedf6c38e9787954d4433234373172b59777638aa132070cfda."
  - id: "GC-02"
    check: "Plan is execution-oriented with owned paths, dependencies, verification, and review checkpoints"
    verdict: PASS
    evidence: "T0-T8 each contain objective, paths, dependency, output, review, and verification fields."
  - id: "GC-03"
    check: "Compatibility, release, rollback, and historical evidence controls are explicit"
    verdict: PASS
    evidence: "T1, T3, T7, T8 and Brownfield Delivery Plan carry the required controls and owners."
  - id: "GC-04"
    check: "Worktree, TDD, and early two-tier review rules are planned"
    verdict: PASS
    evidence: "Worktree Strategy is REQUIRED; tdd_targets and R1-R4 review batches are explicit."
  - id: "GC-05"
    check: "Delegation is safe"
    verdict: NOT_APPLICABLE
    evidence: "Execution remains agentic and sequential; no subagent or multi-agent plan is authorized."
blocking_items:
  - "Task Plan trusted receipt is pending."
owner: "developer"
next_action: "Seal the Task Plan trusted receipt; after digest_match=true, activate s07 with the declared write roots."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "After T1: first install, hardened repeat update, runtime resync, and unmanaged preservation"
  - "After T2: sa/ta YAML, ownership, metric, reference drift, and EN/VI parity"
  - "After T3: valid-control plus every named negative workflow/protocol fixture"
  - "After T5: deterministic renderer and all automated landscape quality gates"
  - "After T6: 41-count, complete source/runtime equality, audit, and bundle smoke"
  - "After T7: version/inventory/doc/release consistency and no placeholder scan"
  - "At T8: full suite, four install cases, rollback smoke, package inspection, and unrelated-dirty-path exclusion"
compatibility_checkpoints:
  - "No existing CLI command/flag or existing skill path removed"
  - "sa/ta top-level contract retained; only approved enum, ownership, example, and metric semantics change"
  - "House presentation skills retain drawio ownership when present"
  - "Previously accepted evidence-free finalized notes intentionally fail with actionable compatibility notes"
  - "Existing explicit managed-skill subsets stay subsets during update; install-all becomes 41"
migration_or_backfill_steps:
  - "No database, application data, runtime topology, or live installation migration"
  - "Generate both runtime mirrors from canonical source; do not hand-edit derived files"
  - "Create a new CHANGE-002 correction record rather than rewriting historical approval metadata"
rollback_or_restore_steps:
  - "Before candidate: discard affected implementation-worktree changes by batch; never touch main user-owned dirty files"
  - "After candidate but before release: invalidate and discard the candidate; keep v2.3.2 as current public release"
  - "Rollback smoke: install retained v2.3.2 managed content into isolated roots and assert unmanaged hashes/modes unchanged"
  - "Do not merge, clean, remove, or prune the worktree until s08 DoD and branch-finish decision"
```

## Traceability
```yaml
upstream:
  - "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s04.acceptance-criteria.md"
  - "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s05.technical-approach.md"
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
  - "changes/CHANGE-002/spec-delta/srs.delta.md"
task_refs:
  CR-REQ-001: ["T1", "T8"]
  CR-REQ-002: ["T2", "T8"]
  CR-REQ-003: ["T2", "T8"]
  CR-REQ-004: ["T3", "T8"]
  CR-REQ-005: ["T2", "T8"]
  CR-REQ-006: ["T4", "T6", "T8"]
  CR-REQ-007: ["T4", "T5", "T8"]
  CR-REQ-008: ["T5", "T8"]
  CR-REQ-009: ["T6", "T7", "T8"]
  CR-REQ-010: ["T3", "T7", "T8"]
next_step: "Human Task Plan review, digest-bound receipt, work-item activation at s07, then T0"
```

## Audit
```yaml
step: "s06 Task Plan"
status: PASS
checks:
  - criterion: "Every AC-001 through AC-010 maps to at least one implementation task and one verification path"
    result: PASS
    evidence: "BA lane, task_refs, T1-T8 outputs, and Verification Plan contain all ten AC IDs; the unique-ID scan returns AC-001 through AC-010."
  - criterion: "Every behavior or contract change names its failing test before implementation"
    result: PASS
    evidence: "dev_lane.tdd_targets names red-first assertions for T1 through T7, and every corresponding task names the focused test or fixture path."
  - criterion: "The isolated worktree, branch, write roots, and dirty-file exclusion guards are explicit"
    result: PASS
    evidence: "Worktree Strategy is REQUIRED, the resolved path is inside the repo and matched .gitignore, and the user-owned dirty-path exclusion list is explicit."
  - criterion: "Full-track targeted reviews are split by risky batch in the required order"
    result: PASS
    evidence: "Early Review Plan defines R1-R4 with TARGETED mode and review_order SPEC_COMPLIANCE then CODE_QUALITY."
  - criterion: "Release candidate, first-open check, rollback smoke, and no-publication boundary are explicit"
    result: PASS
    evidence: "T8, Verification Plan, and Brownfield Delivery Plan define the retained digest-bound tarball, QC first-open handoff, isolated rollback, and gated publication."
  - criterion: "No placeholder or unresolved execution choice remains"
    result: PASS
    evidence: "Placeholder scan returned no matches; T0-T8 provide objective, paths, dependencies, outputs, review checkpoints, and verification hints. S06-CLAR-001 resolves the runtime path detail."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "The Task Plan was completed within the current authoring session; no timebox breach was observed."
gaps:
  - "The digest-bound Task Plan trusted receipt is pending."
risk_level: MEDIUM
next_action: "Seal the trusted Task Plan receipt against this finalized artifact before activation."
```

Audit conclusion: **PASS with human developer approval, including S06-CLAR-001, recorded; s07 remains closed until the trusted receipt passes.**

## Handoff
- First task: after the Task Plan receipt, activate s07 with the worktree and governance paths, then execute T0 baseline isolation.
- Blocking dependency: Task Plan trusted receipt; implementation remains closed until it reports `APPROVED` and `digest_match=true`.
- Condition for step 7: work item `ACTIVE`, current step `s07`, declared write roots granted, clean isolated implementation worktree recorded, and no source edit yet.
