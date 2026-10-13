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
> Windows execution and the safe fixture boundary must be resolved before DoR.

## Step Contract

```yaml
step: "s03"
step_goal: "Expose concrete readiness gaps and their decision owners."
input_summary:
  - "Accepted parent containment scope and three verified Maintainer admission dispositions."
  - "Existing scripts at main 5a81126; spec card and named environment gaps."
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
open_questions:
  - id: "OQ-PI-ENV"
    owner: "maintainer/qc"
    status: "OPEN"
      question: "Which disposable Windows host can execute Windows PowerShell 5.1 used by the existing powershell wrapper? PowerShell 7 may add coverage but does not silently replace that entry point."
    evidence: "No local pwsh/powershell executable; existing workflow jobs all use ubuntu-latest. User asked asynchronously."
    blocks: "DoR and a complete two-platform verification plan."
  - id: "OQ-PI-ISOLATION"
    owner: "developer/qc"
    status: "OPEN"
    question: "How will the real fixed-home entry points execute with an OS-owned disposable profile and zero access to real user installation targets?"
    evidence: "Shell derives destination from HOME; PowerShell derives from its automatic HOME. Both must stay unmodified in each fixture invocation."
    blocks: "DoR and any test invocation of an installer."
resolved_questions:
  - "Containment direction and fail-closed symlink/reparse policy accepted in parent 9c81d53."
  - "Normal signed dedup recovery establishes one independent work item; no reuse of near-match scopes."
scope_change_rule: "If Windows CI or a new destination parameter is needed, propose an exact allowlist/contract amendment before writing it."
```

## Input Readiness

```yaml
status: "BLOCKED"
ready_inputs:
  - "Scope, source baseline, role reasons, proposed ACs and security boundary."
missing_inputs:
  - "OQ-PI-ENV"
  - "OQ-PI-ISOLATION"
owner: "maintainer/developer/qc"
```

## Audit

```yaml
verdict: "PARTIAL"
evidence: "Missing inputs are explicit; no environment availability or platform PASS is invented."
next_action: "Resolve the two listed inputs; continue only reversible drafting in the meantime."
```

## Traceability

```yaml
spec_ref: "product-specs/cards/contain-legacy-codex-installer-paths.md"
next_step: "s04"
```

## Handoff

Draft authoring only. The work item remains MATERIALIZED/s01 with no implementation grants. Close the named readiness gaps and request the applicable human review; no gate is self-approved.
