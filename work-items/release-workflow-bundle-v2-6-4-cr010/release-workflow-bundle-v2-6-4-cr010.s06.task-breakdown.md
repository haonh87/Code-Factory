---
artifact_id: "release-workflow-bundle-v2-6-4-cr010.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-4-cr010"
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
  approach: []
  foundation: []
  task_plan: ["developer"]
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
  approach_reviewed_by: []
  approach_reviewed_at: ""
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-10-16T06:59:48Z"
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
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "release-workflow-bundle-v2-6-4-cr010.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.

## Step Contract
```yaml
step_goal: "Prepare s06 for release review"
input_summary: ["Accepted release direction", "Integrated baseline cbf6c095b303f6979ac135b08c063bfdf2ad9fb2"]
output_summary: ["Bounded reviewable release packet"]
done_when: ["Applicable content reviewed and receipts recorded separately"]
owner: "developer"
```

## Main Artifact
```yaml
implementation_goal: "Prepare and verify v2.6.4, then publish only the approved candidate."
ba_lane:
  acceptance_coverage: ["AC-REL-01..09"]
  scope_guards: ["Separate source and package inventory", "No historical rewrite or parent audit completion"]
  human_review_points: ["Change/work-item", "Spec/DoR", "Approach/Task Plan", "DoD/Release", "Business Acceptance"]
dev_lane:
  path_map: ["workflow-bundle.manifest.json", "packages/workflow-bundle/workflow-bundle.manifest.json", "packages/workflow-bundle/package.json", "packages/workflow-bundle/bin/wfc.js", "packages/workflow-bundle/test/release-*.test.js", "Active release docs listed below"]
  technical_sequence: ["R1", "R2", "R3", "R4", "R5"]
  tdd_targets: ["2.6.4 identity", "Historical record immutability", "2.6.4-to-2.6.3 rollback boundary", "Tagged source installer hashes"]
task_breakdown:
  - id: R1
    owner_role: developer
    name: "In isolated release worktree, pin new release and rollback test expectations and observe correct failures before metadata changes."
    verify: "release-surface, release-install-all, release-candidate-artifact and release-rollback tests fail for old identity/fallback."
  - id: R2
    owner_role: developer
    name: "Use version bump with explicit --repo-root; update reviewed active EN/VI docs and new v2.6.4 release note."
    verify: "Identity, complete delta inventory, unchanged historical records, UTF-8; spec compliance then code quality review."
  - id: R3
    owner_role: qc
    name: "Build runtime and one candidate tarball from reviewed commit; verify same bytes on Node 18/22 and rollback using retained v2.6.3."
    verify: "Full unit, authoring/fixture checks, pack audit/parity, install/update/status and exact-artifact hashes."
  - id: R4
    owner_role: devops
    name: "Run hosted guardrails and native installer matrix; record exact commit/hash evidence in s08 for human DoD and Release."
    verify: "No failed or missing required job; all three platforms evidenced; 54243b7 and integrated recovery are ancestors."
  - id: R5
    owner_role: devops
    name: "After Release receipt, tag approved commit and publish retained verified assets; download and verify public source and tarball."
    verify: "Remote tag points exactly to approved commit, source adapter hashes match, assets match digest, old tag untouched; Business Acceptance before close."
verification_owner: qc
execution_mode: agentic
```

## Verification Plan
R1 pins current v2.6.4 expectations and immutable historical v2.6.3 documentation hashes before metadata updates. R3 runs npm run validate:workflow:unit, pack audit and source/runtime parity in the isolated release worktree. Hosted candidate is built once and tested using the explicit tarball/digest variables on Node 18 and 22. Retained fallback digest is AC-REL-01. Native installer workflow must cover the final candidate source, including its unchanged accepted blobs. No global HOME override or live profile write. Capture every command/run/digest in s08; absence is a gap, not a pass.

## Governance Checks
User accepted authoring packet; trusted receipts pending, no implementation yet. TDD for updated release contract expectations, worktree REQUIRED, early review by metadata/docs/artifact batches, sequential agentic execution. No new dependency or pipeline redesign. Final tag/publication is separately gated.

## Brownfield Delivery Plan
Owned scope after activation: root/package manifests, package.json and bin/wfc.js; four release tests (release-surface, release-install-all-smoke, release-candidate-artifact-smoke, release-rollback-smoke); README.md/README.vi.md; package README pair; docs/publish-surface pair; docs/workflow-docs-map pair; docs/workflow-bundle-quickstart pair; .claude/CLAUDE.md current-release label; new docs/releases/workflow-bundle-v2.6.4.md; this work item, SRS and CR-010. Preserve every historical release record and unrelated untracked file. Existing workflows should be reused unchanged; expand their scope only if an actual verification gap requires a reviewed adjustment. Derived runtime generated by standard sync only. Keep v2.6.3 fallback and source tag unchanged.

Publication preflight must record exact intended target SHA, asset digest and available distribution credentials without exposing secrets. Registry ownership/authentication is not inferred from local npm pack. On failure, retain evidence and candidate and inspect remote partial state; do not overwrite immutable artifacts.

## Traceability
SRS product-specs/srs/release-workflow-bundle-v2-6-4.md owns AC-REL-01..09. CR-010 and this work item own execution; candidate evidence belongs in s08.

## Handoff
User accepted this preparation packet in chat at 2026-10-16T06:59:48Z. Seal and verify the preparation receipts before activation. Candidate-specific Release approval remains separate.
