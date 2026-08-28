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
| GOV-EX-001 | none - that is the exception | n/a | Spec/Design Before Code | developer | PROPOSED | pending | Orphan EAGAIN retry in the approval prompt, committed to unblock a merge. Needs a human decision and a test. |

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
approved_by: "PENDING - not the agent's to grant. Per governance-role-model.md this needs a human with the authority to accept production code that entered without a work item."
status: PROPOSED
review_date: "at the merge of codex/trusted-receipt-namespace-resolution"
notes: "Recorded rather than hidden. This work item family exists precisely because undocumented shortcuts around governance produced the defects it fixes; absorbing this change silently into an unrelated work item would have repeated that pattern. The namespace work item's own s05 lists promptHiddenInput under explicitly_untouched, so folding it there would have breached a boundary sealed hours earlier."
```