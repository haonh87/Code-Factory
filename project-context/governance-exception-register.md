---
language: en
---

# Governance Exception Register

This register is used to track `governance-exception` or `waiver` still open, or that needs audit across many steps.

## When An Entry Must Be Added To The Register

- the exception stays open past the step being handled
- the exception affects `DoD`, `release` or `business_acceptance`
- the exception must be tracked across many steps or many roles
- the work item runs profile `regulated`

## Minimum Process

1. Record the `governance-exception` in the related step note.
2. Add a row to this register.
3. Determine `approved_by` per `governance-role-model.md`.
4. Update the status when mitigation is complete, the waiver is approved or the exception is closed.

## Quick Template

```yaml
exception_id: GOV-EX-001
work_item_ref: ""
step_ref: ""
principle_ref: ""
reason: ""
impact: ""
mitigation: []
owner: ""
approved_by: ""
status: PROPOSED|APPROVED|REJECTED|EXPIRED|RESOLVED
review_date: ""
notes: ""
```

## Register

| Exception ID | Work Item | Step | Principle | Owner | Status | Review Date | Notes |
|---|---|---|---|---|---|---|---|
| GOV-EX-001 | none - that is the exception | n/a | Spec/Design Before Code | developer | RESOLVED | 2026-08-28 | Approved by developer; residual debt paid - readStdinByteSync exported and the EAGAIN retry covered by 5 assertions. |
| GOV-EX-002 | ci-guardrails-parallelisation | s07 | Spec/Design Before Code | devops | PROPOSED | 2026-09-18 | Sealed Task Plan T3 cannot execute; REQ-002 transferred to the Codex branch which owns the file. |

### `GOV-EX-001`

```yaml
exception_id: GOV-EX-001
work_item_ref: "none - the absence of one IS the exception"
step_ref: "n/a - the change predates any work item that could host it"
principle_ref: "Spec/Design Before Code; TDD For Behavior Change"
reason: "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js carried an uncommitted +26/-1 change belonging to no work item: a retry around fs.readSync when it throws EAGAIN in the hidden-passphrase prompt. On some macOS + Node/libuv combinations setRawMode leaves fd 0 non-blocking, so the first read throws EAGAIN before any byte arrives, and the whole approval prompt fails. Without it, `wfc gate approve` is unreliable on this machine - an approval you cannot give is a control that does not work."
impact: "It blocked a merge rather than merely being untidy. codex/trusted-receipt-namespace-resolution edits the same file. Measured: the two COMMITS merge cleanly - the hunks do not overlap (@@121/@@502 versus @@138/@@155) - but git refuses the merge outright while the file is dirty: 'Your local changes would be overwritten by merge.' Leaving it uncommitted keeps a published package carrying an invisible modification."
mitigation:
  - "Committed as its own isolated commit so it is visible, attributable and revertable on its own."
  - "No behaviour beyond the retry is touched: TTY enforcement, passphrase requirement, signing, digest binding and receipt layout are unchanged."
  - "The retry is bounded to the EAGAIN code only; any other error still throws."
  - "A test is owed and is scheduled, not waived - see residual_debt."
residual_debt:
  - "No test covers the retry. tdd-enforce REFUSED an edit to that file on main because packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js does not exist there - it exists only on codex/trusted-receipt-namespace-resolution. The guard worked; the correct place to add the test is the merged tree, not main today."
  - "readStdinByteSync is not exported, so it cannot be unit-tested until it is. That one-line change belongs with the test."
  - "Owed immediately after codex/trusted-receipt-namespace-resolution merges."
owner: "developer"
approved_by: "developer (human, interactive, 2026-08-28). Authority checked against governance-role-model.md rather than assumed: `developer` may 'propose and, in some cases, approve a technical exception', and `po` is explicitly NOT the authority for 'a purely architectural technical exception'. The role model's carve-outs - a waiver affecting release, a significant business trade-off, a regulated waiver - none apply: no version bump, no publish, no control weakened."
status: RESOLVED
resolved_at: "2026-08-28"
review_date: "2026-08-28 - the scheduled review fired exactly as written, at the merge of codex/trusted-receipt-namespace-resolution (a0f8140)"
resolution_evidence:
  debt_1_test:
    was: "No test covered the retry."
    now: "packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js - testEagainRetryIsCoveredGovEx001, 5 assertions green: a byte returned after two transient EAGAINs; the read retried (calls=3) rather than failing on the first; a non-EAGAIN error (EBADF) still throws instead of looping; a zero-byte read returned rather than retried forever."
    method: "fs.readSync stubbed. The real call needs fd 0 in raw mode, which a test runner does not have, and the behaviour under test is the retry decision rather than the terminal."
    verifies_the_mitigation_claim: "The exception claimed 'the retry is bounded to the EAGAIN code only; any other error still throws'. That claim is now asserted, not just stated."
  debt_2_export:
    was: "readStdinByteSync not exported, so untestable."
    now: "Exported. One line, added together with the test as the register required."
  debt_3_timing:
    was: "Owed immediately after codex/trusted-receipt-namespace-resolution merges."
    now: "Paid the same day as that merge."
  observed_first_red: "The test was written before the export and observed failing on 'readStdinByteSync is exported...' - the exact blocker the register named, reproduced before being fixed."
why_it_was_not_paid_earlier: "tdd-enforce genuinely refused an edit to workflow-trusted-approval-utils.js on main, because its test file existed only on the namespace branch. The guard was correct and the debt was scheduled rather than waived. Re-probed after the merge: the hook now returns exit 0 for that path."
notes: "Recorded rather than hidden. This work item family exists precisely because undocumented shortcuts around governance produced the defects it fixes; absorbing this change silently into an unrelated work item would have repeated that pattern. The namespace work item's own s05 lists promptHiddenInput under explicitly_untouched, so folding it there would have breached a boundary sealed hours earlier."
```

### `GOV-EX-002`

```yaml
exception_id: GOV-EX-002
work_item_ref: "ci-guardrails-parallelisation"
step_ref: "s07"
principle_ref: "Spec/Design Before Code - the sealed Task Plan T3 cannot execute as written"
reason: >-
  The approved Task Plan assumed .github/workflows/workflow-guardrails.yml was uncontested. Branch
  codex/adaptive-governance-human-approval-ux modifies the same file with 60 insertions and 2
  deletions, adding a release-candidate-build job whose output later jobs consume as an artifact. A
  full restructure on main would collide with that work. The ownership analysis performed during
  authoring checked `git status` on the working tree rather than the branch diff, and missed it.
impact: >-
  REQ-002, the checkout and setup-node upgrade from v4 to v7, is deadline-bound: GitHub removes
  Node 20 from runners on 2026-09-23 and both v4 actions run on it, so the pipeline breaks rather
  than warns. REQ-001, REQ-003 and REQ-004 - the validator parallelisation - are not deadline-bound.
mitigation:
  - "REQ-002 transferred to codex/adaptive-governance-human-approval-ux, which owns the file and lands first. Codex accepted and opened work item upgrade-guardrails-actions-node24, whose scope explicitly excludes validator matrix conversion and any parallelisation."
  - "REQ-001, REQ-003 and REQ-004 remain in this work item and resume once that branch merges."
  - "T3 will be redesigned around release-candidate-build and its artifact dependency, which did not exist when the Task Plan was sealed."
  - "AC-002's baseline is already captured - 105s over 9 jobs, hosted run 32825477258 on main, 2026-08-25 - so the deferral loses no evidence."
  - "The work item is BLOCKED in protocol rather than left ACTIVE, so the state is visible instead of inferred."
residual_debt:
  - "T3 and T4 are not merely deferred; T3 must be redesigned against a workflow file that will have gained a job. The current Task Plan text describes a file that will no longer exist in that form when work resumes."
owner: "devops"
approved_by: ""
status: PROPOSED
review_date: "2026-09-18 - the CR-008 stop-and-reassess checkpoint"
contingency: >-
  If CR-008 has not closed by approximately 2026-09-20, bump the two action tokens directly on main
  for main's own jobs and accept a small conflict at merge. A broken pipeline costs more than a
  conflict.
notes: >-
  Recorded at s07 rather than absorbed. The exception exists because an ownership claim was made
  from an incomplete measurement, which is the same shape as CF-022: a determination reached
  without reading an authoritative input that was available. Filed by the independent reviewer who
  made that error; approved_by is deliberately empty because the authority belongs to a human per
  project-context/governance-role-model.md.
```
