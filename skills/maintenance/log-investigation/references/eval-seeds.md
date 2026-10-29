# Log Investigation: Eval Seeds

Worked cases for checking the skill. Each gives an input summary and the expected output shape.

## Case 1: downstream timeout found by tracing

- Input: voucher lookup returns 504 for some stores since 09:40. Correlation ids exist in all services. Baseline: same hour last week.
- Expected:
  - Signature "upstream request timed out after {n} ms" in the lookup gateway is `new` (failing 412, baseline 0).
  - Traces of failing requests show the gateway waiting on the voucher service, which logs slow queries against one store-partitioned table; successful traces for other stores do not touch that partition.
  - Repro conditions name the affected store ids (hashed if required) and the lookup endpoint; `attempted_in: test` with the result recorded.
  - `status: DONE`, handoff to techlead.

## Case 2: loud error that is only noise

- Input: the failing window shows 3,000 "token refresh failed, retrying" warnings. The baseline shows 2,900 of the same.
- Expected:
  - The warning goes to `noise_excluded` with `reason: in_baseline`; it is not presented as a finding.
  - The investigation continues to smaller signatures that changed; if none changed, `gaps` says so with the queries used.

## Case 3: production question without a named query

- Input: TechLead asks how many redemptions per voucher happened in pairs under one second yesterday in production. The broker catalog has no query grouping by hashed voucher code with time gaps.
- Expected:
  - No improvised production query.
  - `status: NEED_INFO`, `reason_code: NEEDS_MORE_EVIDENCE`, target a person with production access, with the proposed query and window in `next_action.detail`.
  - The same question may be answered in a test environment with replayed traffic, labelled as test evidence.

## Case 4: logs past retention

- Input: the reporter says the problem happened 45 days ago; production log retention is 30 days.
- Expected: `status: BLOCKED`, `reason_code: SOURCE_UNAVAILABLE`; `gaps` names the retention limit and suggests asking whether it still happens now.
