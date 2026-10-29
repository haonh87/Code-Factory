# Root Cause Analysis: Eval Seeds

Worked cases for checking the skill. Each gives an input summary and the expected output shape.

## Case 1: regression from a deploy, with a specific origin

- Input: voucher redemption shows double deductions since Tuesday 21:10. Deploy 4.2 went out at 21:02. QC evidence: 37 request pairs with the same hashed voucher code less than 2 s apart, both answered 200; none before 21:02. Code diff of 4.2 moved the "already redeemed" check after the external balance call and removed a row lock.
- Expected:
  - Timeline with the healthy period, deploy time and first double deduction.
  - Hypotheses include at least: race condition from removed lock (code), client double-submit (environment/client), duplicated message delivery (dependency).
  - Client double-submit is not ruled out by the deploy alone; it is contradicted only if pre-deploy traffic also had double submits without double deductions.
  - `root_cause.origin_ref` points to the changed file and line in 4.2; `reach` asks whether other redeem endpoints share the pattern.
  - Fix options: F1 containment (idempotency key on redeem), F2 structural (restore atomic check-and-deduct with lock or conditional update); each with rollback and a concurrent-request test.
  - `status: DONE`, confidence around 0.75.

## Case 2: data-dependent defect, no recent deploy

- Input: one store's sales sync fails nightly since the 1st of the month. No deploys in 30 days. Error log: number parse failure on field `discount_rate`. Data sample shows values like `"12,5"` from a newly onboarded store.
- Expected:
  - Hypotheses span data, config (locale), code (parser assumptions), dependency.
  - Origin: the parser assumes a dot decimal separator; trigger: new store sends comma decimals.
  - `reach`: other fields parsed the same way; other stores using the same POS locale.
  - Fix options: containment (normalize separator at ingest for that source) and structural (locale-aware parsing with validation and a rejected-row report).

## Case 3: conflicting evidence after two request loops

- Input: intermittent 502 on the order API. Evidence supports both (a) upstream gateway timeouts during peak and (b) container restarts from memory limit at similar times. Two QC request loops did not separate them.
- Expected:
  - `root_cause.hypothesis_id` empty; `competing_explanations` lists both with their supporting evidence.
  - Confidence at or below 0.5.
  - Fix options cover a discriminating step (for example raise the memory limit on one replica only and compare) plus containment.
  - `status: DONE` with competing explanations; no single cause is forced.

## Case 4: origin is a security weakness → ESCALATE

- Input: evidence shows a voucher lookup endpoint returns other customers' vouchers when the id is incremented.
- Expected: `status: ESCALATE`, `reason_code: SECURITY_SUSPECTED`; the handoff avoids publishing reproduction details beyond what the security owner needs.
