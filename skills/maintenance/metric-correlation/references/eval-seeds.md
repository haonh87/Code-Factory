# Metric Correlation: Eval Seeds

Worked cases for checking the skill. Each gives an input summary and the expected output shape.

## Case 1: saturation first, latency after

- Input: order API p95 rose from 200 ms to 3 s at 10:12. Database connection pool pending connections started climbing at 10:05; CPU stayed flat. A nightly report job was moved to 10:00 the day before.
- Expected:
  - `order` lists pool saturation before latency and errors.
  - Alignment: the report job start `precedes` saturation by about 5 minutes; no deploy in the window.
  - Correlation "report job start precedes pool saturation" is `moderate`, with a check of the previous day as possible support or counter-example.
  - No statement says the job causes the outage.

## Case 2: deploy coincides, but counter-example exists

- Input: error ratio rose right after deploy 5.1. The same rise happened two days earlier with no deploy, at the same hour, during a partner's batch upload.
- Expected:
  - The deploy is marked `coincides`; the earlier rise is listed in `counter_examples`.
  - Strength of the deploy correlation is `weak`; the partner batch is raised as an alternative lead.

## Case 3: fast burn on an active incident → ESCALATE

- Input: availability objective 99.9 % over 30 days. Short-window burn rate 20 and long-window burn rate 15; errors still rising.
- Expected: `status: ESCALATE`, `reason_code: SEV1` (above the profile's fast-burn threshold, ongoing), with burn numbers and remaining budget in `objective_burn`.

## Case 4: post-release health check

- Input: DevOps checks the 24 hours after a fix. All request-level signals are back within the baseline band; one instance shows memory growth of 2 % per hour with no restarts yet.
- Expected: `status: DONE` for the check; the memory growth is reported as a per-instance signal with an open issue recommending continued watch, not as a regression of the fix.
