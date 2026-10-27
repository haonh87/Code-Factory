---
artifact_id: "protocol-receipt-binding-check.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "protocol-receipt-binding-check"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: FEATURE
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
  card: "product-specs/cards/protocol-receipt-binding-check.md"
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
  business_acceptance: "not_applicable"
role_signoffs:
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: []
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
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "protocol-receipt-binding-check.s01.restate.md"
  - "protocol-receipt-binding-check.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 — Open Questions and Admission

> [!summary]
> Scope acceptance is already recorded. Admission now has three verified Maintainer signatures. The remaining action is
> work-item approval and four readiness receipts. This packet does not ask the user to accept the same scope again.

## Step Contract

```yaml
step_goal: "Separate accepted scope, concrete recommended decisions and actual pending signatures."
input_summary: ["Current report and signed-history requirements", "s01 diagnostic and dedup evidence"]
output_summary: ["Decision table", "Reviewable signing helper", "Recovery preflight"]
done_when: ["No hidden classification, compatibility or admission assumption remains."]
owner: developer
```

## Main Artifact

| Item | Recommended disposition | Status / owner |
| --- | --- | --- |
| Single vs split / near-match review | Retain this slug, one bounded outcome; preserve three completed owners' scopes and decisions. | Three signed Maintainer dispositions verified; recovery applied. |
| Historical FEATURE vs semantic BUG | Preserve persisted FEATURE for safe recovery and explain semantic BUG; no silent report reclassification or duplicate work item. | Explicit authoring compatibility choice; reviewer may reject before recovery. |
| Public contract or foundation gate | Internal diagnostic correction, no new public API/event/data schema or architectural baseline; Contract/Foundation not applicable. | Draft applicability rationale for readiness review. |
| Prospective vs retrospective | Evaluate binding to the current host on every read; do not rewrite/revoke/reseal any receipt or grandfather stale evidence. | Draft compatibility recommendation in Spec Card. |
| Other approval paths | Keep work-item/change receipt semantics and reviewer policy out of this patch; preserve their existing tests. | Bounded scope; distinct defects require separate findings. |
| Missing host vs I/O failure | Missing evidence cannot count approved; unexpected I/O/corrupt receipt errors stay explicit. | Draft error contract; QC verifies negative cases. |
| Old detached worktree | Preserve it; do not execute old writers. Drafts use main's stored report anchor; later implementation isolates current source. | No merge/reset/cleanup action authorized by authoring. |

The October 26 collector probe shows that correcting membership removes false errors; the earlier
suggestion that this correction necessarily turns green work items red was unproven. Current main
protocol validation passes for 28 managed items. T0/T3 will compare the actual pre/post error set;
this drafting pass does not simulate a production patch or claim zero regressions.

## Admission and Readiness Execution Boundary

Admission is complete. The CLI report owns three valid signed dispositions and recovery operation
`4e41e2d8-13a1-41e3-89ca-3177ea2b63cb`, applied on 2026-10-27. The historical candidate is unchanged.
The next packet is work-item approval (Maintainer) and independent Spec/DoR (BA), Approach and
Task Plan (Developer) decisions. The human operator must hold these review roles; the agent does
not take those roles' approval authority by authoring the notes.

A temporary helper at `/tmp/cf023-readiness-20261027/approve-cf023.cjs` defaults to inspection.
`--sign` is an explicit human instruction to approve the displayed packet in the stated roles.
It uses the normal source CLI for work-item signing, applies the displayed final note revisions
with the actual review timestamp, then calls `gate approve-ready-bundle`. That bundle makes four
independent receipts in one signing interaction. The helper does not activate implementation.
It does not read or store a passphrase; the CLI prompts in the human terminal.

Preview changes live under `/tmp/cf023-readiness-20261027/preview/`; these are conditional review
copies, not approved repository artifacts. The live Spec Card and s04-s06 remain drafts until
the human runs the signing helper. Hash pins reject changes to the reviewed packet or CLI.
If a signing command is interrupted, stop and inspect actual report/receipt state before retrying;
unsigned metadata alone is never proof that a gate passed.

### Authoring verification

- Naming, governance, execution and planning: PASS for eight draft notes.
- Admission recovery: APPLIED and protocol validation PASS for 28 managed items; 21 legacy skips.
- Conditional finalized-note preflight: PASS for naming, governance, execution, planning,
  strict semantic evidence and four gate authority records in an isolated preview project.
- s04 retains reference-only criteria plus explicit verification rows required by the strict
  legacy reader; the Spec Card remains the sole owner of requirement/criterion text.
- Authoring checks do not establish implementation or DoD completion.

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks:
  - "No production code changed; admission was signed by the human and recovered by the source CLI."
  - "Existing proposal, signed-history boundary and scope acceptance preserved."
blocking_items: ["Signed work-item approval", "Applicable readiness decisions and receipts"]
owner: "developer/qc"
next_action: "Review the work-item/readiness packet; seal receipts only after human approval."
```

## Traceability

```yaml
upstream: ["protocol-receipt-binding-check.s01.restate.md", "protocol-receipt-binding-check.s02.business-goal.md"]
next_step: "Human reviews and signs the work-item/readiness packet; agent verifies receipts before activation."
```
