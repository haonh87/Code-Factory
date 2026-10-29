---
language: en
name: bug-triage
description: Turn a raw bug report into a triaged maintenance case by normalizing the report, classifying it, scoring possible duplicates, deriving severity from impact and urgency, setting priority and SLA from the application profile, and routing it to the next role or a human. Use when a new bug ticket or alert arrives and a PM role must decide whether and how the case enters the maintenance flow.
---

# Bug Triage

> Vietnamese: SKILL.vi.md

Decide what a new report is, how bad it is, whether it was already reported, and who should act next. The result is a proposal for the human who passes the intake gate; triage never closes, merges or rejects a ticket on its own.

## Goal

- Give every report the same structured shape, so later roles do not re-read free text.
- Separate defects from feature requests, support questions and access requests.
- Find likely duplicates with a visible score, not a hunch.
- Derive severity from impact and urgency, with a stated basis, independent of how loudly the report is written.
- Route the case to the right next role, or stop and ask for exactly what is missing.

## When To Use

- A new ticket of type Bug is created, or an existing ticket is reopened.
- An alert is turned into a case and needs severity and routing.
- A human asks the agent to re-triage after new information arrives.

## Out Of Scope

- Does not investigate logs or metrics beyond a quick count that supports impact; that is `log-investigation` and `metric-correlation`.
- Does not explain the cause; that is `root-cause-analysis`.
- Does not close, merge or change the priority field of the ticket; it proposes, and a human applies the decision at the intake gate.

## Minimum Input

- The ticket: title, description, reporter, created time, attachments and comments.
- The application profile: components, owners, criticality tier, severity and SLA matrix, escalation contacts.
- Search access to open and recently closed tickets of the same system.

If the application profile is missing, return `BLOCKED` with `MISSING_CONTEXT`; severity and routing cannot be set without it.

## Execution Flow

1. **Normalize the report.** Fill a fixed set of fields: system, component or screen, user action, expected result, actual result, first seen, frequency, who is affected (one user, one store, a region, everyone), environment, identifiers (order id, request id, hashed voucher code, store id), and attachments. Quote the reporter for anything inferred. Mark each empty field as `unknown`.
2. **Classify.** Choose one: `defect` (the system does not do what it is specified or used to do), `feature_request` (it never did this), `support_question` (the user needs guidance), `access_request` (permissions or accounts). Only `defect` continues in this flow; the others get a routing suggestion and stop.
3. **Score duplicates.** Search open tickets and tickets closed in the last 30 days of the same system. For each candidate, score four signals from 0 to 1: same error signature (code, exception type, message template); same component; overlapping time window; similar description of action and result. Combine them (equal weights unless the profile says otherwise). At 0.75 or more, propose `likely_duplicate`; from 0.5 to 0.75, propose `related`. Show the top three candidates with their signal scores.
4. **Assess impact.** Record scope of affected users, business function (money movement, sales, customer-facing lookup, internal reporting), whether data may be wrong or lost, and whether a workaround exists. When a quick count would settle the scope, request it through the controlled channel defined in `evidence-handoff`.
5. **Assess urgency.** Is the problem ongoing, growing, or tied to a near business event (campaign launch, month-end close)?
6. **Set severity** with the matrix below and write one line of basis.
7. **Set priority and SLA** from the application profile matrix. If the profile has no matrix, use the example values below and say so.
8. **Route.** Pick the owning component team from the profile. Next role: `ba` when expected behaviour is unclear or disputed, otherwise `qc` for evidence collection.
9. **Check escalation** using the Decision Rules.
10. **Wrap the result** with `evidence-handoff` (`role: pm`).

Severity matrix (impact down, urgency across):

| Impact \ Urgency | Ongoing or growing | Stable, time-bound | Not time-bound |
|---|---|---|---|
| Money, data integrity, or most users blocked | Sev1 | Sev1 | Sev2 |
| A function or a group of users blocked, no workaround | Sev2 | Sev2 | Sev3 |
| Degraded, workaround exists | Sev3 | Sev3 | Sev4 |
| Cosmetic or single user, no business effect | Sev4 | Sev4 | Sev4 |

Example SLA values (replace with the profile's): Sev1 response 15 min, Sev2 2 h, Sev3 1 business day, Sev4 next planned release.

## Required Output

```yaml
triage:
  normalized:
    system: ""
    component: ""
    action: ""
    expected: ""
    actual: ""
    first_seen: ""            # ISO-8601 or unknown
    frequency: ""             # once|intermittent|always|unknown
    affected_scope: ""        # single_user|store|region|all|unknown
    environment: ""
    identifiers: []           # masked or hashed
  classification: defect|feature_request|support_question|access_request
  duplicates:
    - ticket: ""
      score: 0.0
      signals: {signature: 0.0, component: 0.0, time: 0.0, description: 0.0}
      proposal: likely_duplicate|related
  impact: {business_function: "", data_risk: false, workaround: ""}
  urgency: ongoing|growing|time_bound|not_time_bound
  severity: Sev1|Sev2|Sev3|Sev4
  severity_basis: ""
  priority: ""
  sla: ""
  route: {team: "", next_role: ba|qc|none, human_owner: ""}
  missing_info: []            # exact questions for the reporter
```

Wrap it with the `evidence-handoff` envelope (`role: pm`).

## Evidence Requirements

- A duplicate proposal cites the candidate ticket key and the matching signal for each score above zero.
- `severity_basis` points to evidence: the reporter's statement (`source: human`), a count from the controlled channel, or an alert.
- Facts copied from the ticket keep the reporter's words in the excerpt, masked.

## Decision Rules

- `DONE` when the report is classified, severity and route are set with a basis, and no blocking field is unknown.
- `NEED_INFO` (`MISSING_IDENTIFIER`, `MISSING_REPRO` or `AMBIGUOUS_REPORT`) when system, action or actual result is unknown, or nothing identifies the affected user, store or transaction. Send one message with every missing item.
- `ESCALATE` with `SEV1` for Sev1; with `RESTRICTED_SYSTEM` when the system's tier caps automation (for example a payment system) and the defect touches money; with `SECURITY_SUSPECTED` when the report suggests access to another user's data; with `DATA_LOSS_RISK` when records may be lost or corrupted.
- `BLOCKED` with `MISSING_CONTEXT` when the application profile is absent, or `SOURCE_UNAVAILABLE` when ticket search fails.

## Quality Rules

- Severity follows impact and urgency, not capital letters, exclamation marks or the reporter's title.
- Do not lower severity because a workaround is assumed; record the workaround only when someone confirmed it.
- Ask for missing information once, as a complete list, in plain language the reporter can answer.
- A duplicate is a proposal; the human at the intake gate links or closes.
- Triage states symptoms, not causes. "Payment failed after the update" stays a symptom until analysis.
- Write in English by default; store as UTF-8.

## Use In The Maintenance Lane And s01-s08

- Runtime maintenance agents: PM agent at intake; the triage section and handoff are posted for the human who passes the intake gate (accept, duplicate, not a bug, or need info).
- Inside Code-Factory on a `BUG` work item: the normalized fields feed `s01` (restated request) and `missing_info` feeds `s03` (open questions). Severity informs `planning_track` but does not replace the router's lane decision.

## Completion Conditions

- `triage` follows `Required Output` and is wrapped in a valid `evidence-handoff` envelope.
- Classification is set; for defects, severity, priority, SLA and route are set with a basis.
- Duplicate candidates were searched and the search is recorded, even when none was found.
- Every escalation rule was checked and the result is visible in the status.

See `references/eval-seeds.md` for worked cases.
