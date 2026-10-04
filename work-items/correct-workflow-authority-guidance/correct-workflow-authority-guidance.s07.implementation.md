---
artifact_id: "correct-workflow-authority-guidance.s07.implementation"
artifact_family: workflow-step
work_item_slug: "correct-workflow-authority-guidance"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
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
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: [developer, qc, ba]
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
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: [qc]
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "correct-workflow-authority-guidance.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> Implementation and developer review are complete for T1–T6. T7 human BA review and T8 QC/DoD remain pending; no completion or cleanup is authorized.

## Step Contract
```yaml
step_goal: "Implement AC-AUTH-001..004/006 within the accepted eight-source boundary and prepare bounded evidence for AC-AUTH-005."
input_summary:
  - "Frozen s04 acceptance, s05 option A, s06 T1–T8; current trusted authoring receipts."
output_summary:
  - "Eight corrected guidance sources and one auto-discovered regression test."
  - "Ordered developer review and verification handoff to s08."
done_when:
  - "T1–T6 have evidence; remaining human review is explicit."
owner: "developer"
```

## Main Artifact
```yaml
recommended_design: "s05 option A: correct existing guidance; preserve runtime authority and schemas."
implementation_mode: BUGFIX
tasks_completed: [T1, T2, T3, T4, T5, T6]
bug_repro_evidence:
  - "Original sources: focused regression exits 1 with eight source-contract failures, one per boundary/language; no missing-file or syntax failures."
hypothesis_log:
  - assumption: "The defects are contradictory guidance, not a demonstrated runtime bypass."
    status: CONFIRMED
    evidence: "Original source assertions fail; prose-only corrections pass; existing runtime tests remain green."
debug_experiments:
  - goal: "Isolate each authority boundary."
    action: "Run source controls independently before each boundary's in-memory mutations."
    result: "Initial RED: 0 passed / 8 failed; after requirement-analysis correction: 6 passed / 6 failed, four mutations rejected."
  - goal: "Exercise every approved counterexample."
    action: "Correct lifecycle/list placement and target the VI optional-prerequisite mutation at its entry sentence."
    result: "Final GREEN: 56 checks passed, zero failed, 48 negative mutations rejected."
tdd_evidence:
  - behavior: "Bounded guidance contract; production runtime behavior unchanged."
    failing_test: "packages/workflow-bundle/test/workflow-authority-guidance.test.js before source corrections: eight expected original-defect failures."
    passing_test: "Same test after corrections: 56 checks PASS; full existing runner discovers and passes it."
safe_refactor_notes:
  - "No runtime validator, CLI, public contract, dependency or output-schema change."
code_changes:
  - "One Node built-in-only regression: fixed source reads, section checks, unchanged DoD schema, positive controls and in-memory negative mutations."
doc_changes:
  - "T3: remove summary/analysis write exception in requirement-analysis EN/VI."
  - "T4: require all applicable full/Light gates; distinguish s01 authoring from s07 activation; reconcile operative list and bounded legacy read/approve behavior."
  - "T5: make AI DoD advisory throughout both skills; retain all schema fields/enums and six evidence checks."
config_changes: []
review_checkpoints:
  - "See Ordered Developer Review below; spec compliance precedes code quality in every batch."
outputs_actual:
  - "Source hashes and bounded human review packet in s08."
known_limitations:
  - "Static prose assertions cover known counterexamples, not arbitrary natural-language correctness."
follow_up_items:
  - "T7: human BA assessment of all eight repaired scopes."
  - "T8: human QC verification and DoD after T7; normal trusted receipt flow."
notes_for_testing:
  - "s08 owns command results, AC coverage, source identities, scan limitations and human review decisions."
```

## Entry Authority Evidence

Read-only checks confirmed the work-item receipt and all four independent authoring receipts against the current hosts before source edits. The CLI report owns their reviewer/timestamp history and the exact twelve write grants; no receipt or protocol block was hand-authored. Activation was performed through the source CLI on 2026-09-30. The authoring hosts remain frozen:

| Host | SHA-256 |
| --- | --- |
| s04 | 921d250fb1544499c5e847227871ee6f3df7ee7691d4fb7a40463111a39fc237 |
| s05 | d9fb8858e68f52159f98f47776658ed96984c7e8b052a811b42b7397ac5e44d1 |
| s06 | 9ce0dd76a18c2089cac4da80c157aae820dbaf7ef85e9a856251c511bb8912ec |

## Delivery Rule Evidence
```yaml
behavior_change: NO
tdd_status: DONE
tdd_test_refs:
  - "packages/workflow-bundle/test/workflow-authority-guidance.test.js"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/correct-workflow-authority-guidance"
worktree_reason: "Full-track work spanning sessions; isolated from parent audit and root WIP."
review_status: COMPLETED
review_refs:
  - "correct-workflow-authority-guidance.s07.implementation.md#ordered-developer-review"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "HOLD_OPEN; no merge or cleanup before child s08 human DoD."
verify_path:
  - "correct-workflow-authority-guidance.s08.verification.md"
```

NO refers to production runtime behavior. The approved static-guidance RED → minimal correction → GREEN cycle was still performed and is recorded above.

## Ordered Developer Review

Review by the implementing agent on 2026-10-04; this is targeted self-review, not an independent agent review or human signoff.

| Batch | First: spec compliance | Then: code quality |
| --- | --- | --- |
| T2–T3 | PASS: AC-AUTH-001/006; both original read-only defects fail before correction; clarity grants no write authority. | PASS: minimal paired scope change; controls run before mutations; no dependency or disk mutation in negative cases. |
| T4 | PASS: AC-AUTH-002/003; enumerate full s04/s05/s06 versus Light s04/s06, independent gates and all affected ACTIVE/entry statements. Author at s01, activate s07; legacy exceptions remain bounded. | PASS after correction: list belongs in Current Baseline, not Target Extension. VI mutation now targets the actual prerequisite sentence, avoiding unrelated earlier wording. |
| T5 | PASS: AC-AUTH-004; description, goals, status interpretation, evaluation and completion consistently reserve DoD for authorized human QC. | PASS: output schema/enums and six checks preserved exactly; EN/VI preserve the same authority distinctions. |
| T6 | PASS: eight sources plus accepted regression and child artifacts only; AC-AUTH-005 is explicitly pending human review. | PASS: syntax, focused and full suite, local runtime generation, pack audit and whitespace checks; scan limitations are recorded in s08. |

No unresolved critical implementation finding remains in this bounded developer review. This does not supersede the parent language ledger or human BA/QC assessment.

## Implementation Notes
```yaml
framework_notes:
  - "Node 22.23.2; existing auto-discovery in test/run-all.js; no runner edit."
  - "Local runtime generation only: 84 derived skill entries across Codex/Claude; ignored runtime output is not a deliverable."
known_limitations:
  - "The tracked package manifest remains byte-identical; no global installation or release operation."
  - "Parent M7 still FAIL. Other M7 units, protected register, root WIP and unrelated worktrees remain with their existing owners."
```

## Traceability
```yaml
upstream:
  - "correct-workflow-authority-guidance.s04.acceptance-criteria.md"
  - "correct-workflow-authority-guidance.s05.technical-approach.md"
  - "correct-workflow-authority-guidance.s06.task-breakdown.md"
next_step: "correct-workflow-authority-guidance.s08.verification.md"
```

## Handoff

T1–T6 are complete at the implementation-evidence level. The s08 draft contains technical verification and the concrete bounded language packet for T7; its scores are agent proposals only. T8 depends on the human T7 decision. Keep the protocol ACTIVE/s07 until that dependency is resolved; do not use a technical test pass to jump to DONE or finalize this branch.
