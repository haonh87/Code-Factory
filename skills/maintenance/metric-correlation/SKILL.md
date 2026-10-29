---
language: en
name: metric-correlation
description: Read service and resource metrics around a production defect by comparing a failing window with a baseline through request-level and resource-level lenses, ordering which signal moved first, aligning changes with deploys, config, traffic and dependency events, and reporting service-objective burn, while stating correlation strength without claiming cause. Use when a QC or DevOps role must add metric evidence to a case or check health after a release.
---

# Metric Correlation

> Vietnamese: SKILL.vi.md

Describe how the system's numbers changed around a defect, in what order, and what else happened at the same time. Metrics show when and where; they rarely show why, so this skill reports correlations with their strength and counter-examples and leaves causation to `root-cause-analysis`.

## Goal

- Quantify the change in request-level and resource-level signals between a failing window and a healthy baseline.
- Establish the order in which signals deviated, because the first mover is the best lead.
- Line up metric changes with deploys, config changes, traffic shifts and dependency incidents.
- Report service-objective burn so the urgency of the case rests on numbers.
- Word every relationship by its strength, never as a cause.

## When To Use

- After `bug-triage`, alongside `log-investigation`, when the symptom involves latency, errors, saturation or availability.
- When `root-cause-analysis` asks which signal moved first or whether a deploy lines up with a change.
- After a release, to confirm health returned to baseline during the monitoring period.

## Out Of Scope

- Does not decide the root cause.
- Does not change alert rules, dashboards or capacity; it may recommend such changes as open issues.
- Does not query production metric stores outside the controlled-channel rule of `evidence-handoff`.

## Minimum Input

- The triage section: system, component, first seen, affected scope.
- Access to metric queries: approved named queries for production, query access for test environments.
- The application profile: service and resource names, metric names and labels, service objectives, deploy and config change sources, known dependencies.

If the time of the symptom is unknown, return `NEED_INFO` with `MISSING_IDENTIFIER`.

## Execution Flow

1. **Set windows.** Use the same failing window and baseline as `log-investigation` when one exists; otherwise bound them the same way. Use UTC.
2. **Read request-level signals** for each involved service: request rate, error ratio, and latency percentiles (p50, p95, p99). Compare failing against baseline.
3. **Read resource-level signals** for the hosts, containers, pools and queues behind those services: utilization, saturation (queue length, pending connections, throttling, load relative to cores) and resource errors (restarts, out-of-memory kills, dropped messages).
4. **Find the first mover.** For every signal that deviated, record when it first left its baseline band. Order them. A resource that saturates before latency rises points somewhere different from latency that rises before anything saturates.
5. **Align with events.** List deploys, config changes, feature flags, traffic shifts (campaigns, batch jobs), and dependency incidents in and around the window. For each, mark whether it precedes, coincides with, follows, or has no relation to each deviated signal.
6. **Check counter-examples.** Look for times when the same signal moved without the symptom, or the symptom appeared without the signal. These weaken a correlation and must be reported.
7. **Compute objective burn** when the profile defines objectives: error-budget burn rate over a short and a long window and the remaining budget.
8. **Write correlation statements** with a strength: `weak` (one coincidence), `moderate` (consistent order and timing in this incident), `strong` (repeats across several incidents with no counter-example). Use words such as "precedes by 4 minutes" or "moves together", never "causes".
9. **Record gaps**: missing scrapes, metrics that do not exist, retention limits.
10. **Wrap the result** with `evidence-handoff` (`role: qc` or `role: devops`).

Production rule: production metrics are read through approved named queries in the data broker. Query syntax examples for a common metric query language are in `references/query-examples.md`.

## Required Output

```yaml
metrics:
  windows:
    failing: {from: "", to: ""}
    baseline: {from: "", to: ""}
  signals:
    - id: M1
      lens: request|resource
      metric: ""
      scope: ""                     # service, instance, pool, queue
      failing_value: ""
      baseline_value: ""
      change: ""                    # for example +340% or p95 180 ms → 2.4 s
      first_deviation_at: ""
      evidence_ids: []
  order: [M3, M1, M2]               # first mover first
  alignment:
    - event: ""                     # deploy 4.2, config key, campaign start
      at: ""
      relation: {M1: precedes|coincides|follows|none}
      evidence_ids: []
  objective_burn:
    - objective: ""
      burn_rate_short: 0.0
      burn_rate_long: 0.0
      budget_remaining: ""
  correlations:
    - statement: ""
      strength: weak|moderate|strong
      counter_examples: []
  gaps: []
```

Wrap it with the `evidence-handoff` envelope.

## Evidence Requirements

- Each signal cites a query id or exact query, the window, the step or resolution used, and a link to the graph when one exists.
- Baseline values are always present next to failing values.
- Event times come from the system of record for that event (pipeline, change log, flag service), not from memory.
- A correlation marked `strong` lists the other incidents that support it.

## Decision Rules

- `DONE` when deviated signals are quantified against baseline, ordered, aligned with events, and every correlation has a strength.
- `NEED_INFO` with `MISSING_IDENTIFIER` when the symptom time is unknown; with `NEEDS_MORE_EVIDENCE` to a person with production access when the needed production query is not available as a named query.
- `BLOCKED` with `SOURCE_UNAVAILABLE` when metrics for the window are missing or past retention.
- `ESCALATE` with `SEV1` when objective burn is above the profile's fast-burn threshold and the symptom is ongoing; with `DATA_LOSS_RISK` when queues drop messages or storage is full while writes continue.

## Quality Rules

- Averages hide tails; report percentiles for latency and per-instance values when one instance stands out.
- Use the same step and range for both windows, or the comparison is invalid.
- Rates are compared as rates, not as raw counters.
- A coincidence with a deploy is a lead, not a conclusion; say what in the deploy would have to be true.
- Keep graphs behind links; the output holds numbers.
- Write in English by default; store as UTF-8.

## Use In The Maintenance Lane And s01-s08

- Runtime maintenance agents: QC agent during investigation and DevOps agent during post-release monitoring; results go to the TechLead agent or into the monitoring section before case closure.
- Inside Code-Factory on a `BUG` work item: supports `s03` (facts about scope and timing) and `s08` (regression and compatibility evidence after the fix).

## Completion Conditions

- `metrics` follows `Required Output` and is wrapped in a valid `evidence-handoff` envelope.
- Request-level and resource-level lenses were both applied, or the reason one was skipped is in `gaps`.
- The order of deviation and the alignment with events are recorded.
- No statement claims cause; each correlation has a strength and its counter-examples.

See `references/eval-seeds.md` for worked cases and `references/query-examples.md` for query syntax.
