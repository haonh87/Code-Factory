---
change_id: "CR-008"
artifact_kind: "change-archive-metadata"
status: verified
linked_work_items:
  - "adaptive-governance-human-approval-ux"
  - "closeout-bundle-legacy-dod-compatibility"
  - "align-adaptive-sa-ta-applicability"
  - "closeout-bundle-repeat-cycle-reconciliation"
---

# Archive Metadata - CR-008

## Archive Status
```yaml
archive_status: archived
verified_by:
  - "qc"
  - "devops"
  - "po"
business_acceptance: DONE
release_status: DONE
notes:
  - "QC approved exact-candidate Technical Verification and DoD for source af70276fe14317417365c06dd06186da1996c401, hosted run 34802149041, and candidate SHA-256 af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f; AG-01..AG-13 passed 13/13."
  - "The parent DoD, Release, and Business Acceptance trusted receipts are APPROVED and digest_match=true against finalized s08 SHA-256 e994f4292829e77d06ba809e897c3efd6d2c6cff562b579ed1536f5e92d0cc93."
  - "DevOps/QC approved Release and PO approved Business Acceptance for v2.6.2 with rollback v2.6.1 SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9."
  - "PR #2 merged the reviewed branch into main at a9455fa86b13af9f285ea3480728ec951c53286d on 2026-09-16T02:37:32Z."
  - "Post-merge Workflow Guardrails run 35048705559 passed 10/10 jobs with zero annotations."
  - "Annotated tag v2.6.2 object 7cd3e9dde74fee50e80f40f9a73a9e38aa192cca resolves to main merge commit a9455fa86b13af9f285ea3480728ec951c53286d."
  - "GitHub Release v2.6.2 was published at 2026-09-16T02:54:15Z with asset workflow-bundle-2.6.2.tgz SHA-256 af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f."
  - "npm workflow-bundle@2.6.2 is public and latest points to 2.6.2; the registry tarball is byte-identical to the approved candidate and passed CLI plus Codex/Claude global/project smoke 4/4."
  - "The parent and all three CR-008 child work items transitioned DONE -> ARCHIVED after downstream release actions completed. The branch-scoped Node24 maintenance item was archived separately."
  - "Two historical legacy blocker strings remain byte-preserved as opaque compatibility input in the parent report. Core transitions do not interpret them; transaction-bound reconciliation, current receipts, DONE, and ARCHIVED events are authoritative."
  - "Post-release review classified the remaining legacy entries inside blockers[] as F-CR008-ARCH-001: the compatibility contract preserves their bytes, but the current projection is still misleading and the archive transition does not require explicit disposition."
```

## Branch Finish Audit
```yaml
finish_target: "codex/adaptive-governance-human-approval-ux"
workspace_kind: BOTH
verify_inputs:
  - "Hosted run 34802149041 and candidate SHA-256 af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f"
  - "Post-merge run 35048705559: 10/10 jobs PASS, zero annotations"
  - "Digest-matched DoD, Release, and Business Acceptance receipts"
  - "GitHub Release v2.6.2 and npm workflow-bundle@2.6.2"
finish_gate_checks:
  verify_complete: PASS
  dod_complete: PASS
  findings_closed: FAIL
  exceptions_resolved: PASS
allowed_actions:
  - "Record and route F-CR008-ARCH-001 into a separately approved behavior-change work item"
  - "Retain the published v2.6.2 release and its immutable evidence"
blocked_actions:
  - "Delete the branch or worktree before F-CR008-ARCH-001 is explicitly dispositioned and handed off"
  - "Silently delete, regex-match, or reinterpret the two opaque legacy strings"
cleanup_sequence:
  - "Materialize and approve the F-CR008-ARCH-001 follow-up boundary"
  - "Record an explicit handoff that preserves the exact legacy text and owns terminal-state reconciliation"
  - "Confirm the follow-up no longer depends on this CR-008 worktree"
  - "Remove the dedicated worktree"
  - "Delete the merged local and remote branch"
merge_conditions:
  - "The follow-up must not mutate the immutable v2.6.2 release or historical signed receipts"
  - "The new contract must preserve unknown legacy text while preventing ARCHIVED plus active blockers ambiguity"
residual_risks:
  - "Automatic static/security scanners were unavailable in the approved candidate verification and remain disclosed scan gaps"
  - "F-CR008-ARCH-001: protocol_status=ARCHIVED currently coexists with two opaque legacy entries in blockers[]"
final_recommendation: HOLD_OPEN
notes_for_closeout: "Release and archive evidence remain valid, but branch/worktree cleanup is held until F-CR008-ARCH-001 has an explicit approved handoff. The finding cannot be fixed by silently clearing unknown legacy text."
```
