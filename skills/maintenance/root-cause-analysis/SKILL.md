---
language: en
name: root-cause-analysis
description: Find the root cause of a production bug from collected evidence by building a timeline, testing falsifiable hypotheses, tracing the surviving cause back to its origin, and proposing at least two fix options with blast radius and rollback. Use after triage and evidence collection, when a TechLead role must explain why a defect happens before any fix is chosen.
---

# Root Cause Analysis

> Vietnamese: SKILL.vi.md

Turn evidence about a production defect into a defensible explanation of why it happens and what could be changed to stop it. The output is a proposal for a human TechLead to approve, not a decision.

## Goal

- Explain the defect with a cause that is supported by evidence and survives attempts to disprove it.
- Distinguish the trigger (what set it off) from the origin (the code, config, data, dependency or capacity condition that made it possible).
- Give the approver at least two fix options with their risk, so the choice stays human.
- Say clearly when the evidence is not enough, instead of forcing a single answer.

## When To Use

- After `bug-triage` accepted the case and `log-investigation` or `metric-correlation` produced evidence.
- When a defect reappears after a previous fix.
- When several teams or services might own the problem and the boundary must be argued with evidence.

## Out Of Scope

- Does not write or merge the fix.
- Does not collect raw evidence from scratch; it asks QC through `request_info` when a hypothesis needs data it does not have.
- Does not assign blame to people. The origin is a system condition, not a person.

## Minimum Input

- The triage section (symptom, severity, component, affected system).
- Evidence items from QC or DevOps, in the `evidence-handoff` shape.
- Deploy and configuration change history around the failing window.
- Read access to the relevant code and configuration.

If there is no evidence item that shows the symptom itself, return `NEED_INFO` with `NEEDS_MORE_EVIDENCE` to QC.

## Execution Flow

1. **State the symptom precisely.** What fails, for whom, since when, how often, and what "correct" looks like (take it from the BA section if present).
2. **Build a timeline.** Order the relevant events: first occurrence, deploys, config changes, traffic shifts, dependency incidents, data loads, and the healthy period before. Mark each entry with its evidence id.
3. **List hypotheses.** Write three to five candidate causes across categories: code change, configuration, data shape or volume, dependency or network, capacity or concurrency, environment difference. Include at least one that does not involve the most recent deploy.
4. **Make each hypothesis falsifiable.** For each, write what you would expect to see if it were true and what would prove it false (for example "if the cache is stale, the error rate should drop right after the 03:00 cache refresh").
5. **Test against evidence.** Mark each hypothesis `supported`, `contradicted` or `untested`. For `untested` ones that matter, send one precise `request_info` to QC (window, service, filter, expected signal). Allow at most two request loops per case, then decide with what you have.
6. **Trace to origin.** For the surviving hypothesis, follow the chain backwards from the failing line or metric to the condition that allowed it: the commit, the config key, the data assumption, the missing guard, the dependency contract. Stop when a change at that point would prevent the whole class of failure, not just this instance.
7. **Check reach.** Ask where else the same origin applies (other endpoints, other services, other stores or regions) and whether it already shows up there.
8. **Score confidence** with a basis: number of independent sources, whether the cause reproduces, whether contradicting evidence remains.
9. **Propose fix options.** At least two, for example a minimal containment and a structural fix. For each: what changes, blast radius, regression risk, rollback, and how a test would prove it.
10. **Wrap the result** with `evidence-handoff`.

## Required Output

```yaml
rca:
  symptom: ""
  timeline:
    - at: ""                  # ISO-8601
      event: ""
      evidence_ids: []
  hypotheses:
    - id: H1
      statement: ""
      category: code|config|data|dependency|capacity|environment
      expected_if_true: ""
      disproved_if: ""
      result: supported|contradicted|untested
      evidence_ids: []
  root_cause:
    hypothesis_id: ""         # empty when evidence is insufficient
    trigger: ""
    origin: ""                # code path / config key / data assumption / dependency contract
    origin_ref: ""            # file:line, commit, config path, ticket
    reach: []                 # other places where the same origin applies
  competing_explanations: []  # filled when more than one hypothesis remains supported
  confidence: 0.0
  confidence_basis: ""
  fix_options:
    - id: F1
      kind: containment|structural
      change: ""
      blast_radius: ""
      regression_risk: low|medium|high
      rollback: ""
      proof_test: ""          # the test that fails before and passes after
  recommended_option: ""      # a suggestion only; the human approver decides
```

Wrap it with the `evidence-handoff` envelope (`role: techlead`).

## Evidence Requirements

- Every timeline entry and every `supported` or `contradicted` result cites evidence ids.
- `origin_ref` points to something a reviewer can open (code line, commit, config key, data record id).
- A cause that is only plausible, with no supporting observation, stays `untested`; it cannot become `root_cause`.
- Reproduction (a failing test, a replayed request, a query that shows the bad data) counts as the strongest evidence and should be named in `confidence_basis` when present.

## Decision Rules

- `DONE` when one hypothesis is supported, the others are contradicted or clearly weaker, the origin is referenced, and two fix options exist.
- `DONE` with `competing_explanations` filled and confidence at or below 0.5 when two hypotheses remain supported after two request loops; the approver decides which to pursue.
- `NEED_INFO` (target `qc`) when a decisive hypothesis is untested and a request loop is still available.
- `ESCALATE` when the origin points to a security weakness, data corruption or loss, a restricted system, or when the defect is severity 1 and still active.
- `BLOCKED` when code or configuration needed to trace the origin cannot be accessed.

## Quality Rules

- Correlation is not cause. "Started after deploy 4.2" is a timeline fact; the cause is the specific change inside that deploy that produces the symptom.
- Prefer the explanation that accounts for all evidence, including the healthy period and the cases that did not fail.
- Keep hypotheses that were disproved in the output; they show the reviewer what was ruled out.
- Do not recommend a fix that only hides the symptom (retry, larger timeout, catch-and-ignore) without naming it as containment.
- Keep the output compact: link long traces instead of pasting them.
- Write in English by default; store as UTF-8.

## Use In The Maintenance Lane And s01-s08

- Runtime maintenance agents: TechLead agent at the investigation stage; the result is posted for the human approval gate on the fix approach.
- Inside Code-Factory on a `BUG` work item: supports `s03` (open questions about the cause) and `s05` (technical approach). The `fix_options` feed the `## Option Analysis` block; the human approver still passes the Approach gate.

## Completion Conditions

- `rca` follows `Required Output` and is wrapped in a valid `evidence-handoff` envelope.
- A timeline exists, at least three hypotheses were considered, and each has a result.
- Either a root cause with `origin_ref` or explicit `competing_explanations` is present.
- At least two fix options with blast radius, rollback and proof test are listed.

See `references/eval-seeds.md` for worked cases.
