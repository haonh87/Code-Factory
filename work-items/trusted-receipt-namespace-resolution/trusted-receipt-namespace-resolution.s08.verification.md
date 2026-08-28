---
artifact_id: "trusted-receipt-namespace-resolution.s08.verification"
artifact_family: workflow-step
work_item_slug: "trusted-receipt-namespace-resolution"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
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
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "trusted-receipt-namespace-resolution.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Tóm tắt kết quả verify, governance compliance, residual risk và kết luận DoD.

## Step Contract
```yaml
step_goal: "Verify AC-001..AC-006 against measured evidence, state regression and compatibility for a brownfield change to the approval-trust machinery, and hand a DoD decision to a human without pre-empting it."
input_summary:
  - "s04 AC-001..AC-006 and their recorded baselines"
  - "s06 T0..T6 and the T6 regression recorded in s07"
  - "The E-A and E-B test suites, and the eight validators"
output_summary:
  - "Per-criterion verdict with the command and the number it produced"
  - "Regression & Compatibility Summary, including the one narrowing change"
  - "An unset Definition of Done and a named list of what a human still decides"
done_when:
  - "Every criterion cites evidence, not intent"
  - "Any criterion that is not fully closed says so in its own verdict"
owner: "developer"
```

## Artifact Chính
```yaml
verification_scope:
  - "AC-001 receipts resolve for one logical project from any checkout"
  - "AC-002 every existing receipt stays readable, valid and in place"
  - "AC-003 a different project's receipt is still refused"
  - "AC-004 DONE is refused over a dirty declared scope, exemption visible"
  - "AC-005 the four approval controls are unchanged"
  - "AC-006 identity resolution is deterministic and non-fatal for every project shape"

evidence_refs:
  - criterion: "AC-001"
    evidence: "wfc protocol from inside the worktree: exit 0, 0 'Missing trusted approval receipt' lines, 0 ERROR lines of any kind. Baseline was exit 1 with 6 such lines (2026-08-19). Fixture side: 'the SAME receipt is readable from the worktree - this is the whole defect' passes, plus the canonical-root and SM-3 namespace assertions."
    verdict: PASS
    note: "This is the full closure of the original defect. The sibling work item could only reach 'the workflow_root mismatch line is gone', because F-02 fenced the namespace off into this work item."
  - criterion: "AC-002"
    evidence: "Subset method per F-07. 56 of 56 gate receipts digest_match=true, 0 stale, 0 missing, 0 digest changed. Cross-namespace inventory 93 entries versus 89 recorded on 2026-08-26; the +4 are gate receipts sealed today. Two fixture assertions cover the mechanism: the new namespace equals the legacy one for a plain main-tree checkout, and a legacy-written receipt is readable from a worktree after the change."
    verdict: PASS
    measurement_error_disclosed: "A first count read 70 against 89 and looked like 19 receipts vanishing. The cause was my own scoping - the 89 counted the whole approvals tree, mine counted one namespace. Recorded in s07 rather than quietly corrected, because AC-002 exists to catch exactly the symptom that alarm produced."
  - criterion: "AC-003"
    evidence: "Three assertions: an independent repository resolves to a different canonical root; two repositories never share an approval namespace; and a different project cannot read a planted receipt - a refused lookup, not merely an unequal string."
    verdict: PASS
    note: "Mirrors EDGE-003 from the sibling work item: fixing over-strictness must not create over-permissiveness."
  - criterion: "AC-004"
    evidence: "E-B delivered. T4's matrix observed RED with 5 assertions before T5 existed, then green: dirty declared path refused at the DONE TRANSITION naming the path; hatch with a reason permits and echoes 'WAIVED: ... Reason: ...'; hatch without a reason refused; empty granted_write_paths refused rather than passing vacuously; a non-git project stays silent."
    verdict: PASS
    gated_on_resolved: "SIBLING-MERGE cleared 2026-08-28 when codex/worktree-and-closure-integrity sealed its DoD and merged (4b04fb2). GOV-Q2 was already cleared prospective-only on 2026-08-21."
    wiring_proved_separately: "A CLI-level assertion drives the real close command, because the unit tests call applyAction directly and bypass parseCliArgs. The sibling work item first placed an equivalent guard in a function the approve path never called; that lesson is now a permanent test here."
  - criterion: "AC-005"
    evidence: "Four explicit non-regression assertions, all green: an inline passphrase is refused in normal mode; the fixture hatch is gated rather than removed; every gate still gets its own independent receipt path; a receipt still binds to the host artifact sha256 so a post-seal edit is detectable."
    verdict: PASS
    why_explicit: "This work item edits the file implementing all four controls. An unasserted control is an untested control."
  - criterion: "AC-006"
    evidence: "Determinism asserted across four project shapes - plain repo, worktree, nested worktree, non-git - plus a separate-git-dir layout that falls back rather than guessing. None throws."
    verdict: PASS
    bug_this_caught: "The first implementation was wrong and the fixture caught it, not a reviewer: git resolves symlinks when reporting the common dir, so on macOS one repository produced two identities via /var versus /private/var. Fixed by realpath on the git branch only, leaving the fallback byte-for-byte."

suite_results:
  unit_suite: "43 files, 0 failing"
  t0_worktree_baseline: "1 failing file - workflow-gate-evidence-utils.test.js (F-01)"
  delta_not_absorbed: "The improvement is NOT this work item's. F-01 was fixed by the sibling as its D-E and arrived through the main merge. T6's instruction was to say so rather than absorb it."
  validators: "All eight - validate, naming, governance, sdd, change, exec, plan, protocol - exit 0"
  fixtures: "10 governance fixture cases, exit 0"
  pack_audit: "exit 0"

summary_verdict: PASS
summary_verdict_scope: "TECHNICAL verification over AC-001..AC-006. It is not a DoD verdict and does not attempt to be one."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - check: "pass/not-pass evidence recorded clearly"
    status: PASS
    evidence: "Every criterion names the command and the number it produced, with baselines from s04 rather than from expectation."
  - check: "contract gate honoured"
    status: PASS
    evidence: "OQ-3 was answered yes, which made approval_gates.contract required and made AC-002 a first-class compatibility criterion rather than a regression footnote. The contract gate is sealed with digest_match=true."
  - check: "remaining gaps have an owner and a next action"
    status: PASS
    evidence: "No criterion is deferred. The only open items are the DoD decision itself and branch closure, both human."
blocking_items: []
owner: "developer"
next_action: "Human reviews, sets Definition of Done.status, fills gate_reviews.dod_reviewed_by/_at, then seals the dod gate - in that order, because the receipt binds to this note's content hash."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
regression_evidence:
  - "Unit suite 43 files 0 failing; no file regressed relative to the T0 worktree baseline of 1."
  - "All eight validators exit 0, with the same pre-existing CHANGE-003 legacy WARNING as T0."
  - "56 of 56 gate receipts still digest-match after the change; 0 stale, 0 missing."
  - "wfc protocol from the worktree improved from exit 1 with 6 errors to exit 0 with none."
compatibility_status: PASS
compatibility_evidence:
  - "For a plain main-tree checkout the new namespace EQUALS the legacy one, so no receipt moves - asserted, not assumed."
  - "A receipt written under the legacy scheme is readable from a worktree after the change."
  - "A non-git directory falls back to the projectRoot it was given, preserving legacy behaviour."
  - "No migration command exists or is needed; s04 explicitly names a migration as an unacceptable way to satisfy AC-002."
breaking_changes:
  - "E-B makes the DONE transition stricter: it now refuses while a path inside granted_write_paths is uncommitted. Mitigated by a reason-bearing hatch echoed on its own WAIVED line. Prospective only per GOV-Q2 - no closed work item is reopened."
rollback_readiness: READY
rollback_notes:
  - "E-B is the last commit (2694562) and is the only change that makes the tool stricter, so reverting it alone restores previous DONE behaviour while leaving E-A in place."
  - "E-A is two commits (7b7a5bc implementation, 82aeb18 fixtures) and reverts independently."
  - "No package version bump and no release inside this work item."
baseline_caveat: "T0 pinned this worktree at cdd68cc. Delivering E-B required merging main (2b4a01d, +43 commits), so T6 does not compare like-for-like against that pin. Every delta is attributed in s07 rather than assumed."
```

## Scan Summary
```yaml
status: NOT_RUN
reason: "No new external surface, dependency or input parsing was introduced. The change is path derivation plus a transition guard, both covered by unit and CLI-level assertions."
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reason: "approval_gates.uat is not_applicable. Developer-facing CLI behaviour with no end-user surface."
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reason: "approval_gates.release is not_applicable. No version bump, no publish, no change to live global installs inside this work item."
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE
reason: "approval_gates.business_acceptance is not_applicable for an internal defect fix."
```

## Audit
```yaml
audit_status: PASS
notes:
  - "All six acceptance criteria closed with measured evidence; none deferred."
  - "Two self-caught errors are recorded rather than smoothed over: a symlink identity bug found by T1's fixture before any reviewer saw it, and an AC-002 inventory scoping error that first looked like 19 missing receipts."
  - "One improvement is explicitly NOT claimed: the unit suite going from 1 failure to 0 came from the sibling work item, not this one."
  - "No gate has been claimed, proposed or passed by this note. dod is still MISSING."
```

## Definition of Done
```yaml
status: ""
status_note: "DELIBERATELY UNSET. An agent may gather evidence and give a technical verdict; it may not pass DoD. A human sets this field, fills gate_reviews.dod_reviewed_by and _reviewed_at, then seals - in that order. Note the validator couples finalization and attestation: a finalized s08 note must carry both fields, so they are done together, not in two steps."
evidence_is_complete: true
what_a_human_still_decides:
  - "The DoD verdict itself."
  - "Whether the branch may merge to main, which per branch-finish-discipline only happens after that verdict."
residual_risks:
  - id: "F-06"
    risk: "Baseline comparability: T0's per-tree pin at cdd68cc was broken by the main merge required to unblock E-B."
    owner: "recorded in s07; no action outstanding"
    status: "Accepted and disclosed"
  - id: "residual-cross-file"
    risk: "Inherited note: workflow-gate-evidence-utils.test.js still references a live work item in its cross-file assertion. Stable while that work item exists; breaks if renamed or archived."
    owner: "test-hygiene work item (decouple-tests-from-tree-layout)"
    status: "Open, out of scope here"
owners:
  - "qc or developer - dod verdict"
```

## Traceability
```yaml
requirement_refs:
  - "product-specs cards / s04 REQ-001..REQ-006 equivalents, AC-001..AC-006"
acceptance_refs:
  - "trusted-receipt-namespace-resolution.s04.acceptance-criteria.md AC-001..AC-006"
task_refs:
  - "s06 T0..T6. E-A: T1 82aeb18, T2 7b7a5bc, T3 3bd0792. E-B: T4 0e1bd64, T5 2694562. Merge 2b4a01d."
test_refs:
  - "packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js"
  - "packages/workflow-bundle/test/work-item-protocol.test.js"
```

## Handoff
- **Technical verdict:** `PASS` across `AC-001`..`AC-006`, all closed with measured evidence and none deferred.
- **The headline:** `wfc protocol` from inside a worktree now exits **0** with zero errors, from a baseline of exit 1 with six. That is the defect that started this chain, fully closed.
- **Not claimed:** the unit suite going 1 failing file → 0 is the sibling work item's fix arriving via merge, not this work item's doing.
- **To close:** set `Definition of Done.status`, fill `gate_reviews.dod_reviewed_by` and `_reviewed_at` together, then seal `dod`. The validator couples finalization and attestation, so both fields go in before sealing.
- **Then:** the branch may merge, and E-B will guard every subsequent DONE transition in this repo.
