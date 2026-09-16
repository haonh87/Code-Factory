---
artifact_id: "trusted-receipt-namespace-resolution.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "trusted-receipt-namespace-resolution"
step_id: "s02"
step_slug: "business-goal"
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
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
  dor: []
  approach: []
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "trusted-receipt-namespace-resolution.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> The goal is not "make `wfc protocol` green in a worktree". It is that audit evidence stays
> addressable for one logical project regardless of which checkout reads it — because a governance
> layer that cannot be read where the work happens is not a governance layer.

## Step Contract
```yaml
step_goal: "State why this defect is worth fixing in business terms, what success looks like as a number, and what is deliberately not being solved - before any approach is considered."
input_summary:
  - "s01 restate: mechanism, measured evidence, invariants, OQ-1..OQ-4"
  - "The repo's own mandatory-worktree rule, which is what turns a lookup bug into a governance failure"
output_summary:
  - "Business goal and the user cost it removes"
  - "Success metrics that can be checked by command, not by opinion"
  - "Non-goals, especially the tempting adjacent fixes"
done_when:
  - "Every success metric is measurable without judgement"
  - "The non-goals name the specific things a reviewer would otherwise expect to see fixed"
owner: "developer"
```

## Artifact Chính
```yaml
user_problem: "An adopter is told by policy to use a worktree for any large or risky change. Inside that worktree every gate receipt and every work-item receipt reads as MISSING, so `wfc protocol` cannot pass and no gate state can be confirmed. The receipts are demonstrably APPROVED and digest-matched from the main tree, so what the operator sees is not 'lookup failed' but 'your audit evidence is gone' - in the workspace the policy just told them to create."

business_goal: "Trusted approval receipts resolve for the same logical project from any checkout of it, so the governance layer is readable wherever the work legitimately happens, and the mandatory-worktree rule stops contradicting the approval model. Secondarily, close the last window in which a work item can be certified DONE over a delivery that is not committed."

why_it_matters_now:
  - "workflow-bundle v2.5.0 is published. This is on the first large change any adopter makes, because the worktree rule is not optional for that class of change."
  - "It is the second half of a defect whose first half was just fixed. worktree-and-closure-integrity T2 removed the workflow_root mismatch that used to be the first error; that fix leaves this one fully exposed and now unmasked."
  - "The cost of the workaround is worse than it looks: setting WORKFLOW_BUNDLE_APPROVAL_ROOT per worktree makes receipt location depend on operator discipline, which is precisely the property audit evidence must not have."

value_if_fixed:
  - "The mandatory-worktree rule and the approval model stop being mutually exclusive"
  - "wfc protocol becomes usable as a pre-merge check from the workspace where the change actually is"
  - "DONE stops being reachable over an uncommitted delivery, closing the residual window left by L-01"

cost_if_not_fixed:
  - "Every worktree-based work item runs blind on gate state, or runs with an operator-set env var that relocates audit evidence by hand"
  - "The next work item that follows policy re-discovers this and pays the same diagnosis cost - this one already cost a full T0 baseline to isolate"

success_metrics:
  - id: "SM-1"
    metric: "wfc protocol run from inside a git worktree exits 0"
    baseline: "exit 1, 6 errors (5 gate receipts + 1 work-item receipt reported MISSING), measured 2026-08-19"
    target: "exit 0, 0 receipt-missing errors"
  - id: "SM-2"
    metric: "Existing receipts still valid after the change"
    baseline: "43 receipts on disk; 34 gate receipts digest_match=true"
    target: "Unchanged: 34 of 34 digest_match=true, 43 on disk, none moved or rewritten"
  - id: "SM-3"
    metric: "The same receipt resolves from two different absolute paths for one project"
    baseline: "No - main and worktree compute different namespaces (code-factory-916d1d6e915b vs worktree-and-closure-integrity-e9691c40f465)"
    target: "Yes, and a fixture proves it"
  - id: "SM-4"
    metric: "A receipt belonging to a genuinely different project is still refused"
    baseline: "n/a - today the namespace is over-specific rather than over-permissive"
    target: "Refused, proved by a negative fixture. Mirrors EDGE-003 from the sibling work item: fixing over-strictness must not create over-permissiveness."
  - id: "SM-5"
    metric: "Transitioning to DONE while the declared scope is dirty"
    baseline: "Permitted - the dod seal guard exists, but nothing re-checks at the transition (L-01)"
    target: "Refused, with a visible reason-bearing hatch"
  - id: "SM-6"
    metric: "The four approval controls are unchanged"
    baseline: "TTY refusal, passphrase requirement, one independent receipt per gate, receipt bound to artifact sha256"
    target: "All four assert unchanged as explicit non-regression checks"

non_goals:
  - "Making receipts portable between machines or shareable across users. This is about one machine reading one project from several paths, not about distributing trust."
  - "Changing receipt format, signature scheme, or digest binding. The file is being opened for namespace resolution only."
  - "Relaxing the rule that the approval root lives outside the project root - that is an anti-tampering control, not an inconvenience."
  - "Migrating, relocating or rewriting the 43 existing receipts as the means of fixing lookup."
  - "Re-opening or re-sealing any closed work item, including the four that closed under the looser DoD rule."
  - "Fixing the tdd-enforce hook, the workflow_root comparison, or anything else already delivered by worktree-and-closure-integrity."
  - "Making wfc commands work from an unrelated directory that merely happens to contain a work-items folder."

constraints:
  - "No approval control weakens. This work item edits the file that implements them, which raises the bar."
  - "No existing receipt moves on disk or loses digest validity."
  - "A fix that requires a manual migration step is worse than the defect for anyone who does not run it."
  - "Behaviour change in both defects, so TDD applies - each gets a fixture observed failing first."

assumptions:
  - "Inherited from s01 A1..A3: receipts stay outside the project root; a path-independent project identity exists; backward compatibility is achievable by read-fallback rather than migration. Each carries its own reject_if in s01."
```

## Traceability
```yaml
upstream:
  - "trusted-receipt-namespace-resolution.s01.restate.md"
next_step: "s03 Open Questions"
metric_ownership:
  - "SM-1, SM-3, SM-4, SM-6: developer"
  - "SM-2: developer, confirmed at s08 against the T0-style baseline"
  - "SM-5: developer, but gated on GOV-Q2 being reconfirmed by po"
```

## Handoff
- **User problem settled:** the mandatory-worktree rule and the approval model currently contradict each other; receipts that are APPROVED from one path read as MISSING from another.
- **Non-goals settled:** notably no format/signature/digest change, no receipt migration, no relaxing the outside-the-project-root control, and no cross-machine portability.
- **Condition to enter step 3:** none blocking. `s03` consolidates `OQ-1`..`OQ-4` and `GOV-Q1`/`GOV-Q2` with owners and the step each blocks.
- **Deliberately not decided here:** how the identity is derived, and whether compatibility comes from read-fallback or migration. Those are `OQ-1` and `OQ-2` and belong to `s05`, not to a business-goal note.
