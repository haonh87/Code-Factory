---
artifact_id: "release-workflow-bundle-v2-6-4-cr010.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-4-cr010"
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
change_id: "CR-010"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "product-specs/srs/release-workflow-bundle-v2-6-4.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["developer", "qc", "devops"]
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach: ["developer"]
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
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-10-16T06:59:48Z"
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
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "release-workflow-bundle-v2-6-4-cr010.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Tóm tắt option được khuyến nghị, trade-off và boundary kỹ thuật cần giữ.

## Step Contract
```yaml
step_goal: "Prepare s05 for release review"
input_summary: ["Accepted release direction", "Integrated baseline cbf6c095b303f6979ac135b08c063bfdf2ad9fb2"]
output_summary: ["Bounded reviewable release packet"]
done_when: ["Applicable content reviewed and receipts recorded separately"]
owner: "developer"
```

## Option Analysis
```yaml
options:
  - {name: new_patch, summary: "New immutable v2.6.4 from integrated main", pros: ["Complete accepted source", "Existing pipeline"], cons: ["Full delta verification"]}
  - {name: retag_old, summary: "Move v2.6.3", pros: [], cons: ["Violates immutable release identity; rejected"]}
  - {name: installer_only, summary: "Cherry-pick only installer", pros: ["Narrow diff"], cons: ["Unneeded separate release line, omits integrated fixes; rejected"]}
recommended_option: new_patch
trade_offs: ["Source archive and npm artifact expose different existing surfaces; verify each explicitly"]
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: "Existing workflow bundle"
selected_stack: []
selected_runtime: []
decision_notes: ["No architecture foundation change"]
```

## Main Artifact
```yaml
design_problem: "Release integrated fixes with immutable provenance and correct package/source distinction."
business_rule_trace: ["AC-REL-01..09"]
design_options:
  - name: new_patch
    summary: "Cut v2.6.4 from integrated main, retain v2.6.3 fallback."
    pros: ["Immutable history", "Includes all accepted fixes"]
    cons: ["Requires complete delta verification"]
rejected_options:
  - name: retag_old
    reason: "Violates accepted immutability requirement."
  - name: installer_only_cherry_pick
    reason: "Would omit other integrated fixes and create a separate release line without need."
recommended_design: new_patch
recommendation_reason: "Existing build-once pipeline and package allowlist suffice."
component_changes: ["Version metadata", "Release-specific test expectations", "Active EN/VI onboarding docs", "New historical release record"]
data_flow: ["Isolated source worktree", "Fail-first release contracts", "Metadata/docs update", "Reviewed commit", "One hosted tarball", "Node 18/22 verification", "Human Release", "Publish same bytes", "Public checks"]
interface_changes: ["Patch version identity only; existing command families retained"]
failure_modes:
  - scenario: "Stale candidate source or digest"
    impact: "Unverified release"
    guardrail: "Bind approval to commit/hash, refuse mismatch, never rebuild at publish"
  - scenario: "Partial publication"
    impact: "Inconsistent public state"
    guardrail: "Record completed steps; inspect remote refs/assets; resume only matching immutable bytes, never overwrite old version"
compatibility_impact: ["Node >=18/npm >=9, five modes and 42 skills retained"]
rollback_impact: ["Use retained v2.6.3 tarball; preserve reports/signatures/unmanaged content", "Recovery extension unavailable after downgrade"]
observability_hooks: ["CI run IDs", "Candidate SHA-256", "Remote tag/source/artifact verification"]
constraints_applied: ["No new packaging surface", "No global install", "Human release authority"]
validation_plan: ["Task-specific checks in s06 and AC evidence in s08"]
specialized_followups: ["ci-cd-release: immutable candidate promotion"]
notes_for_next_step: "Approach accepted by user; independent trusted preparation receipts are still required."
```

## Architecture Details
```yaml
pipeline_scope: "v2.6.4 candidate verification and approved GitHub publication"
source_strategy:
  branch_model: "Isolated release worktree based on main cbf6c09; final approved source must be on main"
  triggers: ["Release branch CI", "Main CI", "Explicit human Release receipt"]
build_and_verify:
  stages: ["Unit/contract", "Runtime parity", "Pack once", "Same tarball Node 18/22", "Rollback", "Native installer matrix"]
  cache_strategy: ["Use existing dependency cache; never substitute mutable cache for candidate provenance"]
  required_checks: ["Workflow Guardrails", "Windows/Linux/macOS installer containment", "UTF-8", "Exact rollback"]
artifact_flow:
  registry: "GitHub Release assets; npm registry publication only if separately pinned in Release approval"
  artifact_types: ["workflow-bundle-2.6.4.tgz", "SHA-256 checksum", "GitHub tagged source archives"]
  tagging_strategy: ["Immutable v2.6.4", "Exact approved commit", "Preserve v2.6.3"]
  provenance_controls: ["Source commit", "Build run ID", "SHA-256", "Package inventory", "Tag ancestry and installer blob hashes"]
promotion_flow:
  - from: local
    to: prod
    conditions: ["Exact candidate verified", "Human DoD and Release receipts"]
    automation_level: "Human-gated publication; no environment deploy"
approval_controls: ["Maintainer change/work-item", "Authoring gates", "QC DoD", "DevOps/QC Release", "PO Business Acceptance"]
release_controls:
  pre_release: ["Version/tag collision checks", "Candidate/fallback digest checks", "Main source identity", "No rebuild at publish"]
  post_release: ["Download assets and source", "Compare hashes", "Verify old/new tags", "Record Business Acceptance"]
rollback_controls: ["Retained immutable v2.6.3 tarball", "Isolated downgrade proof", "Preserve reports and unmanaged files"]
pipeline_risks: ["Interrupted publication", "Stale docs/test assertions", "Different source/package surfaces"]
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: "Draft controls; no publication before exact candidate Release approval."
```

## Brownfield Impact Analysis
Metadata and active documentation advance to v2.6.4. Existing source/runtime behavior comes from reviewed main. Complete package delta since v2.6.3 includes materialize-work-item, scaffold-workflow, scaffold-change-package, work-item-protocol(-utils), workflow-trusted-approval-utils and canonical guidance/runtime copies. Source-only delta includes both direct Codex installers, native containment CI and repository governance evidence. Inventory exact tar contents during build. No historical release note or signed host is rewritten. No database/API migration or live environment change. Use bump-version with explicit --repo-root so a nested worktree cannot resolve to the outer repository.

## Traceability
SRS product-specs/srs/release-workflow-bundle-v2-6-4.md owns AC-REL-01..09. CR-010 and this work item own execution; candidate evidence belongs in s08.

## Handoff
User accepted this preparation packet in chat at 2026-10-16T06:59:48Z. Seal and verify the preparation receipts before activation. Candidate-specific Release approval remains separate.
