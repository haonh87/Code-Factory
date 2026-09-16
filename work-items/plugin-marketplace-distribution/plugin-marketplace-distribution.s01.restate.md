---
artifact_id: "plugin-marketplace-distribution.s01.restate"
artifact_family: workflow-step
work_item_slug: "plugin-marketplace-distribution"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
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
  - "ba"
  - "developer"
  - "qc"
  - "devops"
  - "po"
review_mode: independent
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "required"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec: ["ba"]
  contract: ["ba", "devops"]
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: ["developer", "devops"]
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
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "../../docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Code-Factory currently ships its skill pack with a self-built push installer that copies source
> into `~/.claude`. That mechanism has no consumer-side pin, so installed runtime silently drifts
> from source; `wfc status` reports source `2.6.1` against installed `2.3.2` with 40 of 42 skills.
> This CHANGE replaces the distribution layer with the native Claude Code plugin + marketplace
> mechanism so that a consuming repository declares its pack version in committed configuration.
> The authoring, scaffold, and validation layers of `wfc` are explicitly retained. No gate has
> opened; this note only clarifies scope and constraints.

## Step Contract
```yaml
step_goal: >-
  Clarify what replacing the distribution layer means, fix the scope boundary against the
  authoring layer that must be retained, and surface the blockers that prevent this work item
  from starting, without selecting a technical approach.
input_summary:
  - "Independent review findings R-01..R-06 dated 2026-09-11"
  - "docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md finding CF-003"
  - "wfc status --mode claude output on 2026-09-11"
  - "workflow-bundle.manifest.json and .claude-workflow-bundle.install-state.json"
output_summary:
  - "Restated request with an explicit retain/replace boundary"
  - "Draft scope in/out"
  - "Constraints, assumptions, dependencies, initial risks"
  - "Open questions that block DoR"
done_when:
  - "The retain/replace boundary is unambiguous"
  - "Every blocker has a named human owner"
  - "No technical approach is selected in this note"
owner: "ba"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Hard Rule: Spec/Design Before Code"
  - "Hard Rule: Brownfield Baseline And Delta Discipline"
  - "Hard Rule: Human-Controlled Gates"
  - "Hard Rule: Prefer The Smallest Solution That Is Correct"
required_reviews:
  - "Spec at s04"
  - "Contract at s04 - the pack consumption contract changes"
  - "DoR at s04"
  - "Approach at s05"
  - "Foundation Decision at s05 - the deployment model changes"
  - "Task Plan at s06"
prohibited_actions:
  - "Do not restructure skills/** before Foundation Decision passes"
  - "Do not modify packages/workflow-bundle/** while branch codex/adaptive-governance-human-approval-ux is open"
  - "Do not remove the wfc authoring, scaffold, or validation layers"
open_governance_questions:
  - "OQ-01: does this require a change package (CR) rather than a bare work item?"
  - "OQ-02: should governance_profile escalate from default to strict given blast radius?"
  - "OQ-03: do SA and TA apply here, given the CF-019 authority conflict on applicability?"
```

## Artifact Chính
```yaml
raw_request: >-
  Replace the Code-Factory distribution mechanism so that the installed runtime cannot silently
  drift from source, and so the pack can be consumed by many repositories and eventually by
  people outside the organisation.
restated_request: >-
  Move pack distribution from the self-built push installer to the native Claude Code plugin and
  marketplace mechanism, split the pack into plugins along the grouping that already exists under
  skills/, and have every consuming repository declare its pack version in committed
  configuration. Retain the wfc authoring, scaffold, and validation layers unchanged.
request_type: CHANGE
user_problem_initial: >-
  Installation is a manual push with no consumer-side pin, so forgetting to install is
  indistinguishable from being up to date, and no repository can state which pack version it runs.
business_context_initial: >-
  Code-Factory is being taken toward a product. A product cannot ship a distribution channel in
  which the publisher and the consumer have no shared record of the installed version. The Team
  plan also provides an organisation-level plugin distribution channel that the current mechanism
  cannot use.
scope_draft:
  in:
    - "Marketplace catalogue at .claude-plugin/marketplace.json"
    - "Per-plugin manifests at .claude-plugin/plugin.json with semantic versions"
    - "Split into six plugins: a required core merging orchestration and guardrails, plus optional analysis, architecture, delivery, obsidian and notebooklm"
    - "Consumer-side pinning through committed .claude/settings.json"
    - "Local development flow using claude --plugin-dir"
    - "Retirement or repositioning of the wfc install and update commands"
    - "Migration of the current single project target and the global install"
  out:
    - "wfc authoring, scaffold, materialize, and all validate subcommands - retained unchanged"
    - "R-01 duplicate architecture-modeling resolution - separate work item, must land first"
    - "R-02 behavioural eval suite - separate work item"
    - "R-05 CI parallelisation - separate work item, may land first"
    - "Any change to skill content, prose, or the workflow chain itself"
    - "Public marketplace submission - a later decision once the internal channel is proven"
constraints_initial:
  - "C1: branch codex/adaptive-governance-human-approval-ux is 62 commits ahead and actively edits packages/workflow-bundle/scripts; this work item must not start until it merges"
  - "C2: account is Claude Team under organisation GGG Developer Team; organisation plugin distribution requires a private repository read through the Claude GitHub App"
  - "C3: organisation-distributed plugins must not carry a top-level bin/ directory; scripts/ must be used instead"
  - "C4: loading a folder of plugins with a single --plugin-dir flag requires Claude Code v2.1.265 or later; the workstation runs v2.1.236"
  - "C5: existing consumers currently rely on the global install; the migration must not strand them mid-transition"
assumptions_initial:
  - "A1 REVISED 2026-09-11: the source grouping is the right starting point but not the final boundary. orchestration and guardrails merge into one required core, giving six plugins rather than seven."
  - "A2: wfc remains the authoring and validation tool; only its install responsibility is withdrawn"
  - "A3: the marketplace repository is Code-Factory itself rather than a separate catalogue repository"
  - "A4: CF-003 closes as a consequence of this work item rather than needing its own remediation"
open_questions_initial:
  - "OQ-01 RESOLVED 2026-09-11: no change package required. The CR was proposed on the belief that this breaks a contract many repositories consume. Measured: 21 git repositories in the workspace, 7 carry a .claude/ directory holding only settings.local.json, worktrees, or a local skills folder, and zero declare enabledPlugins or extraKnownMarketplaces. There is no consumed contract to break."
  - "OQ-04 RESOLVED 2026-09-11: six plugins. orchestration and guardrails merge into one required core; analysis, architecture, delivery, obsidian and notebooklm stay optional. This closes risk R3 below, where a consumer could install the pack without the router or the gate skills and reach a partially governed state."
  - "OQ-06 RESOLVED 2026-09-11: zero consumers today. All 20 non-factory repositories, including four running GGG systems, read the shared global install at ~/.claude, currently v2.3.2 against source 2.6.1. Nothing is pinned anywhere."
  - "OQ-07 RESOLVED 2026-09-11: private first. The repository is currently public, and organisation distribution through GGG requires private or internal, so the two paths are mutually exclusive at repository level. Move to private, onboard internally, make it public once the pack has been proven by a real consumer."
  - "PILOT RESOLVED 2026-09-11: one personal RnD-AI repository, chatbot-ai or wiki-llm-based. Both already carry .claude/, neither affects GGG work, and the cost of the first onboarding going wrong falls on the author."
  - "OQ-02 OPEN: escalate governance_profile from default to strict?"
  - "OQ-03 OPEN: do SA and TA apply, given CF-019 records an unresolved authority conflict on applicability?"
  - "OQ-05 OPEN: during migration, does the wfc installer stay available as a fallback, and for how long?"
dependencies_initial:
  - "D1: branch codex/adaptive-governance-human-approval-ux merged and its worktree finalised per Hard Rule: Branch/Worktree Only Finalized After Verify"
  - "D2: R-01 canonical architecture-modeling decision taken, so the split does not carry a duplicate forward"
  - "D3: Claude Code upgraded to v2.1.265 or later on the authoring workstation"
  - "D4: an organisation Owner decision on whether Code-Factory may be distributed through organisation settings"
risks_initial:
  - "R1: restructuring skills/** collides with any open branch that touches the same tree; mitigated by C1"
  - "R2: consumers on the global install lose the pack during migration if the cutover is not staged"
  - "R3: the plugin namespace prefixes every skill invocation, so existing muscle memory and any documentation referencing bare skill names breaks"
  - "R4 MITIGATED by the OQ-04 decision: the required core carries the router and the gate skills, so an incomplete install cannot reach a partially governed state"
  - "R5: CF-017 records non-reproducible archive digests; a marketplace pinned by digest inherits that defect unless packaging is made deterministic first"
notes_for_step_2: >-
  Step 2 must state the business goal in terms of what a consumer can do that they cannot do
  today, and must name the non-goal explicitly: this work item does not improve any skill, it
  only changes how skills reach a machine.
```

## Traceability
```yaml
source_inputs:
  - "docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md#CF-003"
  - "Independent review R-01..R-06, 2026-09-11"
  - "wfc status --mode claude, 2026-09-11"
next_step: "s02 Business Goal"
```

## Handoff
- Settled: the retain/replace boundary. `wfc` keeps authoring, scaffold and validation; only the install layer is replaced. The plugin boundary follows the grouping that already exists under `skills/`.
- Still open: seven questions OQ-01 to OQ-07, of which OQ-01, OQ-04 and OQ-06 must be answered before DoR can be assessed.
- Condition to enter step 2: none. Step 2 may be authored now; it does not depend on any open question.
- Condition to start execution: dependency D1 must clear first. This work item is `BLOCKED` on the open Codex branch, not on any missing authoring.
