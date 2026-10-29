---
language: en
name: log-investigation
description: Collect reproducible log evidence for a production defect by bounding a failing window and a healthy baseline, ranking error signatures by how much they changed, tracing sample requests across services by correlation id, filtering noise, and deriving reproduction conditions. Use when a QC role must turn a triaged symptom into evidence that root-cause analysis can test hypotheses against.
---

# Log Investigation

> Vietnamese: SKILL.vi.md

Find what the logs say about a symptom, and prove it with queries someone else can rerun. The output is evidence, not a diagnosis: it says what changed, where, for which requests, and under which conditions the failure appears.

## Goal

- Show which error signatures belong to the symptom by comparing a failing window with a healthy baseline.
- Follow real failing requests across services and locate the first point where they go wrong.
- Separate signal from background noise that exists even when the system is healthy.
- Give conditions precise enough to try a reproduction outside production.

## When To Use

- After `bug-triage` routed a defect to QC.
- When `root-cause-analysis` sends `request_info` for a specific window, service or signal.
- When a fix was released and the team needs to confirm the signature disappeared.

## Out Of Scope

- Does not decide the root cause; it hands evidence to `root-cause-analysis`.
- Does not read metrics dashboards in depth; that is `metric-correlation`.
- Does not query production log stores directly. Production access follows the controlled-channel rule of `evidence-handoff`.

## Minimum Input

- The triage section: system, component, first seen, identifiers, affected scope.
- Access to log search for the environments involved: approved named log queries for production, and query access for test environments.
- The application profile: service names, log index or stream names, the correlation id field, known noisy messages, time zone of log timestamps.

If there is no time reference and no identifier at all, return `NEED_INFO` with `MISSING_IDENTIFIER` to the reporter through the PM role.

## Execution Flow

1. **Collect identifiers.** From the triage section and attachments, take request ids, correlation ids, hashed customer or voucher codes, store ids and timestamps. Convert all times to UTC and note the source time zone.
2. **Bound the failing window.** Start a margin before the first known failure (default 30 minutes) and end at the last known failure or now. If first seen is unknown, start two hours before the report and widen once if nothing is found.
3. **Choose a baseline.** Use a window of the same length when the system was healthy: the same hour on the previous week, or the period just before the failure began. Avoid windows with known incidents or deploys unless the deploy itself is under comparison.
4. **Rank signatures.** In both windows, group error and warning events by service, error code and message template (message with variable parts replaced). Rank by change: signatures that are new in the failing window first, then those whose rate grew the most. Keep counts for both windows.
5. **Filter noise.** Mark as noise any signature with a similar rate in the baseline, and any message listed as known noise in the profile. Keep the list of excluded signatures; do not silently drop them.
6. **Trace samples.** Pick three to five failing requests and one or two successful requests of the same kind. For each, follow the correlation id across services in time order: service, outcome, latency, and the first event where the path diverges from the successful one.
7. **Quantify.** For each kept signature: count, rate per minute, distinct affected identifiers, first and last occurrence.
8. **Derive reproduction conditions.** From the traced requests, state what the failing ones share: endpoint, parameter shape, payload size, timing pattern (for example two requests within one second), store or region, client version. Try the reproduction in a test environment when possible and record the result.
9. **Record absences.** For each expected signal that was not found, keep the query and window that returned nothing.
10. **Wrap the result** with `evidence-handoff` (`role: qc`).

Production rule: in production, run only approved named log queries through the data broker; they return message templates, counts and masked samples. When the needed question has no named query, propose one to a person with production access instead of improvising. Free-form queries are for test environments. Query syntax examples for common log search languages are in `references/query-examples.md`.

## Required Output

```yaml
investigation:
  windows:
    failing: {from: "", to: ""}        # UTC
    baseline: {from: "", to: "", why: ""}
  identifiers: []                      # masked or hashed
  signatures:
    - id: S1
      service: ""
      template: ""
      failing_count: 0
      baseline_count: 0
      change: new|increased|unchanged
      first_seen: ""
      last_seen: ""
      distinct_affected: 0
      evidence_ids: []
  noise_excluded:
    - template: ""
      reason: in_baseline|known_noise
  traces:
    - correlation_id: ""
      outcome: failed|succeeded
      hops:
        - {service: "", status: "", latency_ms: 0}
      divergence: ""                   # first point where it differs from a successful trace
      evidence_ids: []
  repro:
    conditions: []
    steps: []
    attempted_in: test|none
    result: reproduced|not_reproduced|not_attempted
  gaps: []                             # questions the logs could not answer
```

Wrap it with the `evidence-handoff` envelope (`role: qc`).

## Evidence Requirements

- Every signature and trace cites an evidence item whose `query_or_ref` is the named query id or the exact query, with its window.
- Counts are given for both windows, so the reader sees the change, not only the failing number.
- Samples are masked; long traces sit behind `link`.
- Each item in `gaps` names the query that came back empty or the source that was unavailable.

## Decision Rules

- `DONE` when at least one kept signature is tied to the symptom with a baseline comparison, at least one failing trace is shown, and reproduction was attempted or the reason it was not is stated.
- `NEED_INFO` with `MISSING_IDENTIFIER` when neither a time reference nor an identifier exists; with `NEEDS_MORE_EVIDENCE` (target: a person with production access) when the question needs a production query that the broker does not offer.
- `BLOCKED` with `SOURCE_UNAVAILABLE` when logs for the window are past retention or the log store is unreachable; with `POLICY_DENIED` when the query is refused.
- `ESCALATE` with `SECURITY_SUSPECTED` when logs suggest exposed credentials or access to other customers' data; with `DATA_LOSS_RISK` when logs show writes failing or records being dropped.

## Quality Rules

- Never present failing-window counts without the baseline.
- One log line is an example, not a pattern; state counts.
- Trace successful requests as well as failing ones; the difference is the evidence.
- State the time zone everywhere and note clock skew between services when timestamps disagree.
- Prefer message templates over raw messages when grouping, so ids and amounts do not split one signature into thousands.
- Write in English by default; store as UTF-8.

## Use In The Maintenance Lane And s01-s08

- Runtime maintenance agents: QC agent at the investigation stage; the handoff goes to the TechLead agent, and `request_info` loops come back here.
- Inside Code-Factory on a `BUG` work item: the evidence supports `s03` (facts that close open questions) and the reproduction conditions become the failing test that `s07` writes first under TDD.

## Completion Conditions

- `investigation` follows `Required Output` and is wrapped in a valid `evidence-handoff` envelope.
- Both windows are defined, and each kept signature has counts for both.
- At least one failing trace and one successful trace are included, or the reason is in `gaps`.
- Noise exclusions and empty queries are recorded.

See `references/eval-seeds.md` for worked cases and `references/query-examples.md` for query syntax.
