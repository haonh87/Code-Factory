---
artifact_id: "recover-proposals-with-new-change.s08.verification"
artifact_family: workflow-step
work_item_slug: "recover-proposals-with-new-change"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: verified
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "product-specs/srs/recover-proposals-with-new-change.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: []
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
  dod_reviewed_by: ["qc"]
  dod_reviewed_at: "2026-10-15T13:59:34Z"
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
  - "recover-proposals-with-new-change.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Tóm tắt kết quả verify, governance compliance, residual risk và kết luận DoD.

## Step Contract
Verify SRS AC-RC-01..07 and expose evidence/limitations for human DoD. No release authority is implied.

## Main Artifact
```yaml
verification_scope: ["create_new recovery", "no-change regression", "canonical change output", "authority and retry invariants"]
evidence_refs:
  - "/tmp/change-recovery-red.log"
  - "/tmp/change-recovery-edges.log"
  - "/tmp/change-recovery-unit.log"
  - "/tmp/change-recovery-protocol.log"
  - "/tmp/change-recovery-audit.log"
  - "packages/workflow-bundle/test/materialize-work-item.test.js"
  - "packages/workflow-bundle/test/scaffold-change-package.test.js"
summary_verdict: PASS
```

| Criterion | Evidence | Result |
|---|---|---|
| AC-RC-01 | testResumeNewChange: READY and signed-PROPOSED, consistent note/change links, pending approval and empty grants | PASS |
| AC-RC-02 | Signed history preserved; forged signature and snapshot/tampering refusal tests | PASS |
| AC-RC-03 | 12 new refusal scenarios including unowned, symlink, hardlink, invalid ID, compact/reuse, changed manifest/content and missing output | PASS |
| AC-RC-04 | Six injection points; original report preserved before commit; same-operation NOOP and conflicting UUID refusal | PASS |
| AC-RC-05 | Competing recovery child process observes exclusive lock; winner retains ownership and loser report bytes | PASS |
| AC-RC-06 | Existing materializer, protocol and ordinary scaffold tests; pure/full content parity; all 47 unit files | PASS |
| AC-RC-07 | EN/VI scope aligned; runtime sync and pack audit PASS; UTF-8/whitespace/native syntax PASS | PASS |

Reviewed delivery diff SHA-256 before commit: b27d5ae8529c572f4505fe39cb64f1dbf0f32335aef212e4dc1d0e0c22b53666. Node 22.23.2 full unit run: 47/47 files. New scenarios are executable fixtures, not an execution of the real release intake.

## Spec Coverage
```yaml
status: PASS
coverage:
  - id: AC-RC-01
    status: PASS
    evidence: "testResumeNewChange for READY and signed-PROPOSED, pending approvals and empty grants"
  - id: AC-RC-02
    status: PASS
    evidence: "Preserved signed history; signature and snapshot refusal fixtures"
  - id: AC-RC-03
    status: PASS
    evidence: "testNewChangeRefusals: 12 conflicting and unsupported-state scenarios"
  - id: AC-RC-04
    status: PASS
    evidence: "testNewChangeFailureRecovery: six failure points and same-operation retry"
  - id: AC-RC-05
    status: PASS
    evidence: "testNewChangeCompetingClaim: competing process lock refusal and retained winner ownership"
  - id: AC-RC-06
    status: PASS
    evidence: "47 unit files and testPureFullPreparationParity"
  - id: AC-RC-07
    status: PASS
    evidence: "EN/VI review, runtime sync, pack audit, UTF-8 and syntax checks"
```

## Governance Checks
Implementation receipts verified; only granted delivery paths changed. Signed host bytes and original release report remain unchanged. User accepted DoD and the stated limitations; trusted sealing remains pending. Root-wide protocol validation reports the known missing s01 for the still-PROPOSED release-workflow-bundle-v2-6-4; no other error was reported. This is not claimed as a global protocol pass.

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
```
Revert code to restore refusal of create_new recovery. Preserve already created drafts, ownership manifests and signed history; never downgrade reports or erase evidence automatically.

## Scan Summary
```yaml
status: PARTIAL
notes:
  - "Syntax: node --check on changed scripts PASS"
  - "Static analysis: ESLint unavailable; no scanner pass claimed"
  - "Security: Semgrep unavailable; targeted manual review plus path/signature/refusal fixtures PASS"
  - "Performance heuristic: bounded canonical seven-file preparation; synchronous per-change lock; no benchmark claim"
```

## UAT Summary
NOT_APPLICABLE: internal bounded CLI prerequisite; fixtures cover the operator paths.

## Release Summary
NOT_APPLICABLE for this work item. No version, tag, npm or GitHub Release changes. v2.6.4 release retains its own gates.

## Business Acceptance Summary
NOT_APPLICABLE for this standalone technical prerequisite.

## Audit
```yaml
finish_target: fix/recover-proposals-with-new-change
workspace_kind: BOTH
verify_inputs: ["47 unit files PASS", "AC-RC-01..07 evidence", "Explicit human DoD acceptance"]
finish_gate_checks:
  verify_complete: PASS
  dod_complete: PENDING
  findings_closed: PASS
  exceptions_resolved: PASS
allowed_actions: ["Commit accepted evidence", "Seal DoD"]
blocked_actions: ["Merge before trusted DoD receipt", "Publish release", "Cleanup worktree"]
cleanup_sequence: []
merge_conditions: ["Trusted DoD signature and hash verified", "Normal guarded close completed", "Scoped source and evidence commits retained"]
residual_risks: ["Scan/tool and filesystem limitations explicitly accepted"]
final_recommendation: HOLD_OPEN
notes_for_closeout: "Human content verdict is approved; trusted sealing and CLI close remain pending. No parent audit closure."
```

## Definition of Done
```yaml
work_item_slug: recover-proposals-with-new-change
status: DONE
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: []
residual_risks: ["Unowned pre-manifest directory and stale locks require inspection", "No hostile concurrent filesystem mutation guarantee", "Old writers do not participate in recovery lock"]
follow_up_items: ["Integrate after DoD", "Resume v2.6.4 intake preserving all signatures"]
next_action: "Seal the user-approved DoD verdict, verify the receipt, then close and integrate through normal CLI/Git controls"
```

## Traceability
SRS -> s04/s05/s06 -> s07 -> this AC evidence matrix. Source baseline main 54243b7; worktree branch fix/recover-proposals-with-new-change.

## Human Decision Record
```yaml
human_actor: user
source: "Explicit accept following the DoD question in this conversation"
decision: APPROVED
observed_at: "2026-10-15T13:59:34Z"
approved_gates: ["dod"]
review_contexts: ["qc"]
reviewed_revision: "377b0088bbf164d3b534258f4fba54ad3dd6cccd"
accepted_limits: ["ESLint/Semgrep unavailable", "Unowned partial directories and stale locks require inspection", "No hostile concurrent filesystem protection", "Older writers ignore this recovery lock"]
trusted_receipts_at_authoring: PENDING
```
The current commit contains the same reviewed six-file delivery diff. This records the user's decision, not an agent approval or a claim that the signed receipt exists. Release scope and v2.6.3 remain unchanged.

## Handoff
Commit this accepted host, seal DoD in the human terminal, verify its signature/hash and commit CLI reconciliation before guarded close. Then integrate the bounded repair and continue the separate release authoring. Retain the worktree; no publication is authorized by this DoD.
