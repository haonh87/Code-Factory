# Bug Triage: Eval Seeds

Worked cases for checking the skill. Each gives an input summary and the expected output shape.

## Case 1: clear duplicate

- Input: new ticket "Voucher lookup returns error 504 for store S12 since this morning". An open ticket from yesterday reports error 504 on the same lookup screen for stores S12 and S15, with the same gateway timeout message.
- Expected:
  - `classification: defect`.
  - The open ticket appears in `duplicates` with high signature, component and time scores and `proposal: likely_duplicate` (score at or above 0.75).
  - The agent does not close or link the ticket; the handoff asks the intake approver to confirm.
  - Severity is still assessed, because the new report may widen the scope (another morning, same store).

## Case 2: vague report → NEED_INFO

- Input: "System is wrong, please fix ASAP!!!" with no screen, time, store or screenshot.
- Expected:
  - `status: NEED_INFO`, `reason_code: AMBIGUOUS_REPORT`.
  - `missing_info` lists in one message: which system and screen, what was done, what was expected, what happened, when, which store or account, a screenshot if available.
  - Severity is not raised because of the exclamation marks; it stays unset until impact is known.

## Case 3: payment outage → ESCALATE

- Input: alert plus three tickets within ten minutes: card payments at all stores fail with a timeout from the payment hub; cash sales still work.
- Expected:
  - Severity Sev1 (money movement, most users, ongoing).
  - `status: ESCALATE`, `reason_code: SEV1`; the restricted tier of the payment system is also noted.
  - `route.human_owner` comes from the escalation contacts in the application profile.
  - The three tickets are grouped as related or duplicate proposals of one case.

## Case 4: feature request filed as a bug

- Input: "Bug: report does not show sales by hour". The report screen has never had an hourly breakdown.
- Expected:
  - `classification: feature_request`; routing suggestion to the product owner's backlog; no severity.
  - `status: DONE` for triage with `next_action: {type: stop}` and a note that the intake approver may convert the ticket type.
