---
artifact_id: "contain-legacy-codex-installer-paths.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "contain-legacy-codex-installer-paths"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
  card: "product-specs/cards/contain-legacy-codex-installer-paths.md"
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "ta"
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract: []
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
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
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "contain-legacy-codex-installer-paths.s01.restate.md"
  - "contain-legacy-codex-installer-paths.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 — Open Questions

> [!summary]
> Windows CI is selected; the fixture isolation contract is specified in s05. No remaining discovery input blocks requesting authoring review.

## Step Contract

```yaml
step: "s03"
step_goal: "Expose concrete readiness gaps and their decision owners."
input_summary:
  - "Accepted parent containment scope and three verified Maintainer admission dispositions."
  - "Existing scripts at main 5a81126; user-selected Windows CI and the proposed source-bound fixture contract."
output_summary:
  - "Concrete draft artifact with owner, evidence and remaining gates."
done_when:
  - "The draft is reviewable and its missing inputs are explicit; this does not mean the human gate passed."
owner: "ba"
constraints:
  - "No production/test implementation, installer execution or signing by the agent."
timebox: "One authoring pass; unresolved external verification input remains explicit."
```

## Main Artifact

```yaml
open_questions: []
resolved_questions:
  - "Containment direction and fail-closed symlink/reparse policy accepted in parent 9c81d53."
  - "Normal signed dedup recovery establishes one independent work item; no reuse of near-match scopes."
  - "OQ-PI-ENV: user selected GitHub Actions Windows; s05 names windows-2022/PowerShell Desktop 5.1 plus Linux/macOS Bash compatibility jobs."
  - "OQ-PI-ISOLATION: s05 defines disposable job profiles, unchanged script execution and fixture-only mutation endpoints; it is a proposed design for review, not a proven runtime result."
scope_change_rule: "The new workflow and renamed standalone integration runner are listed in s06 for explicit authoring review. Any further path or installer-parameter change requires re-review."
```

## Input Readiness

```yaml
status: "READY"
ready_inputs:
  - "User-selected CI environment"
  - "Source baseline and exact four-path delta"
  - "s05 isolation/evidence contract"
  - "s06 ordered tasks and fail-closed platform checks"
missing_inputs: []
owner: "ba/developer/qc"
authority_note: "AI assessment of input completeness only; human DoR and other authoring gates remain pending."
```

## Audit

```yaml
verdict: "PASS"
evidence: "Both former questions have explicit source/owner/resolution; failures of future engine/link preflight remain execution blockers."
next_action: "Review the revised authoring packet; do not repeat the environment-selection question."
```

## Traceability

```yaml
spec_ref: "product-specs/cards/contain-legacy-codex-installer-paths.md"
next_step: "s04"
```

## Handoff

Review packet only. Lifecycle remains MATERIALIZED/s01 with no implementation grants. Environment selection and the proposed isolation plan are now concrete; request the work-item and authoring gates. No gate is self-approved.
