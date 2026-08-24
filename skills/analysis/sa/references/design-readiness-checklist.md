---
language: en
---

# Design Readiness Checklist

This reference supplements normal SA and TA driver analysis. It is not an output block and must never
be emitted as a full checklist. Apply only entries whose trigger is present in the request, then map
the finding into the existing role-owned drivers, input_issues, handoff, verification, and
stop_condition fields.

SA and TA use the same contract. Keep the same-language copies byte-identical. SA owns business,
regulatory, system-boundary, and data-authority concerns. TA owns quality-attribute, integration,
runtime, and operational concerns. Shared output blocks still contain only the invoking role's lens.

## Usage Contract

~~~yaml
advisory_by_default: true
emit_only_applicable: true
not_applicable_behavior: omit
blocking_requires_named_authority: true
map_to_existing_output_only: true
downstream_design_authority:
  - "system-design"
  - "architecture-modeling"
~~~

Omitting a non-applicable checklist entry does not remove any required output block. If evidence is
missing, contested, or ownerless, record it in input_issues and, when it needs a decision, in
stop_condition.pushed_to_s03. A check becomes blocking only when its blocking_authority names a
stakeholder concern, constraint, approved policy, or accepted criterion that applies to this work
item. The checklist identifies design obligations; system-design and architecture-modeling retain
authority to choose solutions and models.

## Portable Checks

~~~yaml
checks:
  - id: "DR-C01"
    trigger: "The scope introduces, shares, migrates, or changes a business data class."
    owner_lens: "sa"
    concern_or_invariant: "Each data class needs one authoritative write owner; consumers must not create a competing source of truth."
    expected_evidence: "An ownership statement or matrix naming the data class, authoritative writer, consumers, and decision owner for gaps."
    handoff: "drivers; input_issues.contested_ownership when unresolved; handoff.to_dev and handoff.to_qc"
    verification: "Inspect every in-scope data class for exactly one named write authority and an evidence path for consumers."
    mandatory_when: "A named ownership concern, data contract, policy, or accepted single-source criterion applies."
    blocking_authority: "The named data-governance policy, approved ownership decision, or accepted source-of-truth criterion."

  - id: "DR-C02"
    trigger: "Two or more systems or teams can change the same business object, or no owner is identified."
    owner_lens: "sa"
    concern_or_invariant: "Contested or ownerless write authority must remain an explicit issue rather than an implicit allocation."
    expected_evidence: "The competing claims, affected object, decision owner, decision deadline, and impact of leaving the conflict open."
    handoff: "input_issues.contested_ownership; stop_condition.pushed_to_s03; handoff.to_dev"
    verification: "Confirm every contested object is unresolved or backed by an approved ownership decision; never infer a winner."
    mandatory_when: "The conflict can change an in-scope boundary, source of truth, or acceptance outcome."
    blocking_authority: "The named stakeholder concern, approved ownership matrix, or accepted boundary criterion affected by the conflict."

  - id: "DR-C03"
    trigger: "A notification, derived view, or asynchronously received state may be used to authorize, reserve, approve, or commit an action."
    owner_lens: "ta"
    concern_or_invariant: "A fact notification and the authoritative decision point must be distinguishable, including freshness and failure assumptions."
    expected_evidence: "The decision authority, required consistency or freshness, failure behavior, and proof that stale evidence cannot silently decide."
    handoff: "drivers; handoff.to_dev and handoff.to_qc"
    verification: "For each consequential decision, identify the authoritative state and test the stale, delayed, duplicated, or unavailable-evidence path."
    mandatory_when: "A named correctness concern, integration contract, or accepted decision-integrity criterion applies."
    blocking_authority: "The named correctness constraint, approved integration contract, or accepted decision-integrity criterion."

  - id: "DR-C04"
    trigger: "State, totals, or records cross a system boundary asynchronously, periodically, or through a high-integrity transfer."
    owner_lens: "ta"
    concern_or_invariant: "Delivery acknowledgement alone is not proof that both sides converge; reconciliation needs an owner and acceptance rule."
    expected_evidence: "Compared populations or totals, cadence, tolerance, mismatch owner, correction path, and retained audit evidence."
    handoff: "drivers; handoff.to_dev, handoff.to_qc, and handoff.to_devops when operational"
    verification: "Exercise missing, duplicated, delayed, and mismatched records and prove detection, ownership, and correction."
    mandatory_when: "A named accuracy, financial-integrity, audit, or cross-system convergence criterion applies."
    blocking_authority: "The approved interface contract, reconciliation policy, audit obligation, or accepted accuracy criterion."

  - id: "DR-C05"
    trigger: "A reporting, analytical, search, simulation, or other derived store is connected to transactional behavior."
    owner_lens: "sa"
    concern_or_invariant: "A derived store must not become an unreviewed write authority for operational records."
    expected_evidence: "A boundary statement naming the transactional authority, derived consumers, allowed feedback path if any, and owner of exceptions."
    handoff: "drivers; input_issues.contested_ownership when unclear; handoff.to_dev and handoff.to_qc"
    verification: "Trace every write path from the derived store and confirm any operational mutation returns through an approved authority."
    mandatory_when: "A named data-boundary concern, governance policy, or accepted no-write-back criterion applies."
    blocking_authority: "The named data-governance policy, approved system boundary, or accepted no-write-back criterion."

  - id: "DR-C06"
    trigger: "Operational allocation, approval, eligibility, settlement, or reservation may consume reporting, analytical, simulated, or stale data."
    owner_lens: "ta"
    concern_or_invariant: "Decision inputs need an explicit authority and freshness contract; analytical convenience must not silently become operational truth."
    expected_evidence: "The decision source, freshness threshold or reason none exists, fallback behavior, and validation of stale or unavailable inputs."
    handoff: "drivers; handoff.to_dev and handoff.to_qc"
    verification: "Run the decision path with stale, delayed, contradictory, and unavailable derived data and confirm the declared fallback."
    mandatory_when: "A named decision-integrity, safety, compliance, or consistency criterion applies."
    blocking_authority: "The named operational policy, approved decision-source contract, or accepted correctness criterion."

  - id: "DR-C07"
    trigger: "The same named metric, score, or eligibility measure appears in more than one report, workflow, or decision."
    owner_lens: "sa"
    concern_or_invariant: "A shared measure needs one approved definition, owner, version, and effective period."
    expected_evidence: "Metric definition, accountable owner, formula or rule reference, version, effective period, and known consumers."
    handoff: "drivers; handoff.to_ba, handoff.to_dev, and handoff.to_qc"
    verification: "Compare every consumer of the named measure and flag conflicting definitions, versions, or effective dates."
    mandatory_when: "A named reporting, audit, business-consistency, or accepted metric-governance criterion applies."
    blocking_authority: "The approved metric-governance policy, accountable metric owner, or accepted definition-consistency criterion."

  - id: "DR-C08"
    trigger: "Development, test, training, analytics, support, or another environment may receive personal or sensitive production data."
    owner_lens: "ta"
    concern_or_invariant: "Environment boundaries must prevent uncontrolled replication of personal or sensitive production data."
    expected_evidence: "Data classification, allowed environment, approved transformation or synthetic-data rule, access owner, retention, and deletion proof."
    handoff: "drivers; handoff.to_dev, handoff.to_qc, and handoff.to_devops"
    verification: "Inspect environment data flows and test that prohibited copies, retained extracts, and bypass paths are rejected or detected."
    mandatory_when: "A named privacy, security, residency, or environment-isolation policy applies."
    blocking_authority: "The named privacy or security policy, approved data-classification rule, or accepted environment-isolation criterion."

  - id: "DR-C09"
    trigger: "Automation, optimization, scoring, or generated advice can materially influence a person, financial result, entitlement, safety outcome, or regulated action."
    owner_lens: "sa"
    concern_or_invariant: "Material recommendations remain advisory until an authorized human or approved decision process accepts them with an audit trail."
    expected_evidence: "Decision owner, review point, override path, explanation requirement, approval record, and affected stakeholder."
    handoff: "drivers; handoff.to_ba, handoff.to_dev, and handoff.to_qc"
    verification: "Demonstrate reject, override, unavailable-advice, and disputed-outcome paths and trace the final accountable decision."
    mandatory_when: "A named human-oversight, risk, ethics, regulatory, or accepted material-decision criterion applies."
    blocking_authority: "The approved oversight policy, named accountable decision owner, or accepted human-approval criterion."

  - id: "DR-C10"
    trigger: "A generated number, score, forecast, recommendation, or simulation is presented as evidence."
    owner_lens: "ta"
    concern_or_invariant: "Every consequential generated value needs traceable authoritative inputs, transformation identity, and freshness."
    expected_evidence: "Source identifiers, data version or timestamp, transformation or model version, lineage owner, and reproduction method."
    handoff: "drivers; handoff.to_dev and handoff.to_qc"
    verification: "Select representative outputs and reproduce their source, version, transformation, timestamp, and accountable owner."
    mandatory_when: "A named auditability, explainability, data-lineage, or accepted evidence criterion applies."
    blocking_authority: "The approved provenance policy, audit obligation, or accepted traceability criterion."

  - id: "DR-C11"
    trigger: "A legal, safety, certification, eligibility, consent, or policy condition governs whether an allocation or commitment may occur."
    owner_lens: "sa"
    concern_or_invariant: "The governing condition must be evaluated before commitment, with owner, effective period, and exception authority."
    expected_evidence: "Applicable rule, jurisdiction or scope, effective dates, decision owner, exception path, and rejected-action behavior."
    handoff: "drivers; handoff.to_ba, handoff.to_dev, and handoff.to_qc"
    verification: "Test eligible, ineligible, expiring, expired, exception, and boundary-time cases before the commitment point."
    mandatory_when: "A named law, regulation, safety rule, approved policy, or accepted eligibility criterion applies."
    blocking_authority: "The named legal or policy authority, approved compliance interpretation, or accepted eligibility criterion."

  - id: "DR-C12"
    trigger: "A system, service, workflow, report, interface, or manual process is proposed for retirement or replacement."
    owner_lens: "sa"
    concern_or_invariant: "Retirement requires a named successor for every in-scope capability, data obligation, consumer, and operational duty."
    expected_evidence: "Capability and consumer inventory, successor owner, migration or coexistence boundary, unresolved obligations, and rollback owner."
    handoff: "drivers; input_issues.missing_capability when incomplete; stop_condition.pushed_to_s03; handoff.to_dev"
    verification: "Trace every retiring responsibility to an accepted successor or keep retirement blocked with an owner and resolution path."
    mandatory_when: "A named retirement, migration, continuity, audit, or accepted capability-coverage criterion applies."
    blocking_authority: "The approved decommission policy, capability owner, continuity obligation, or accepted retirement criterion."

  - id: "DR-C13"
    trigger: "Delivery is split into phases, migrations, cutovers, pilots, or rollout waves."
    owner_lens: "sa"
    concern_or_invariant: "Entry and exit gates need measurable evidence; calendar dates alone do not prove readiness."
    expected_evidence: "Metric, threshold, measurement window, evidence owner, decision authority, rollback condition, and unresolved dependencies."
    handoff: "drivers; handoff.to_ba, handoff.to_dev, and handoff.to_qc"
    verification: "Recompute the gate from recorded evidence and confirm the next phase cannot start when the criterion is not met."
    mandatory_when: "A named readiness, migration, release, continuity, or accepted phase-exit criterion applies."
    blocking_authority: "The approved rollout plan, release policy, accountable gate owner, or accepted readiness criterion."
~~~

## Driver Questions And Handoffs

Use a question when the concern shapes architecture but the answer would choose a mechanism. Capture the
invariant and evidence need now; leave the choice to the downstream owner.

~~~yaml
questions_and_handoffs:
  - id: "DR-Q01"
    trigger: "Concurrent actors may claim one indivisible resource or mutually exclusive outcome."
    question: "Where is the authoritative single-winner decision, what concurrency invariant must hold, and how will losing and retrying actors observe the result?"
    destination: "drivers (ta lens); handoff.to_dev; handoff.to_qc"
    expected_evidence: "A named authority, contention scenario, invariant, response expectation, retry behavior, and concurrency verification."
    non_selection_guard: "Record the invariant and proof obligation; do not choose a locking, protocol, persistence, or coordination mechanism."

  - id: "DR-Q02"
    trigger: "Money, regulated totals, balances, or other high-integrity values cross a boundary."
    question: "Which accuracy, completeness, cut-off, duplicate, and reconciliation guarantees matter more than immediacy, and who accepts mismatches?"
    destination: "drivers (ta lens); handoff.to_dev; handoff.to_qc; handoff.to_devops when operational"
    expected_evidence: "Control totals, cut-off rule, tolerance, mismatch owner, correction path, audit retention, and timeliness objective."
    non_selection_guard: "State integrity and timeliness requirements; do not choose batch, messaging, ledger, or settlement technology."

  - id: "DR-Q03"
    trigger: "An event or notification crosses a trust, ownership, privacy, or regulatory boundary."
    question: "What is the minimum payload needed to identify the fact, and how will authorized consumers obtain additional current details from the source?"
    destination: "drivers (ta lens); handoff.to_dev; handoff.to_qc"
    expected_evidence: "Data classification, minimum fields, authorization boundary, source lookup contract, retention, and denied-access behavior."
    non_selection_guard: "Define minimization and access obligations; do not choose an event schema, broker, gateway, or retrieval implementation."

  - id: "DR-Q04"
    trigger: "A consumer can receive related facts late, more than once, or in a different order."
    question: "What ordering scope is actually required, what duplicate identity exists, and which state transitions must remain safe under replay?"
    destination: "drivers (ta lens); handoff.to_dev; handoff.to_qc"
    expected_evidence: "Ordering key, duplicate identity, replay scenarios, state-transition invariant, recovery owner, and verification cases."
    non_selection_guard: "Specify ordering and replay behavior; do not choose partitioning, deduplication storage, or messaging technology."

  - id: "DR-Q05"
    trigger: "A message name or contract can be read either as a fact that occurred or an instruction to act."
    question: "Is the contract reporting an accepted fact or requesting work, who owns the requested outcome, and how are rejection and retry represented?"
    destination: "drivers (ta lens); input_issues.conflicting_drivers when ambiguous; handoff.to_dev"
    expected_evidence: "Contract intent, tense and semantics, outcome owner, rejection behavior, retry ownership, and consumer expectations."
    non_selection_guard: "Separate fact and command semantics; do not choose a transport, queue, orchestration, or naming framework."

  - id: "DR-Q06"
    trigger: "Cached or replicated data participates in a correctness-sensitive path or has effective dates."
    question: "Which authoritative source decides correctness, how stale may the copy be, and how are effective-time changes, invalidation, and source unavailability handled?"
    destination: "drivers (ta lens); handoff.to_dev; handoff.to_qc"
    expected_evidence: "Authority, freshness threshold or reason none exists, effective-time key, invalidation rule, fallback, and stale-data tests."
    non_selection_guard: "Capture authority and freshness constraints; do not choose a cache product, key format, invalidation mechanism, or storage topology."

  - id: "DR-Q07"
    trigger: "Heavy processing, maintenance, or release activity can collide with a business-critical operating window."
    question: "Which windows are protected, what workload and error thresholds apply, who can authorize an exception, and what rollback evidence is required?"
    destination: "drivers (ta lens); handoff.to_devops; handoff.to_qc"
    expected_evidence: "Protected window, workload baseline, error and rollback thresholds, exception owner, observability signals, and recovery test."
    non_selection_guard: "Record operating and rollout constraints; do not choose a scheduler, deployment strategy, monitoring product, or platform."

  - id: "DR-Q08"
    trigger: "Some user actions must continue during disconnection while others require a live authoritative decision."
    question: "Which actions may be captured offline, which require online authority, and what conflict, replay, user-feedback, and recovery invariants apply?"
    destination: "drivers (ta lens); handoff.to_dev; handoff.to_qc; handoff.to_devops"
    expected_evidence: "Action classification, authority boundary, offline duration, replay and conflict behavior, user feedback, and recovery verification."
    non_selection_guard: "Define offline and online invariants; do not choose local storage, synchronization, conflict-resolution, or networking technology."

  - id: "DR-Q09"
    trigger: "A business rule changes by jurisdiction, policy version, product, tenant, or effective period."
    question: "Who owns the rule, how are versions and effective dates approved, and how can a past decision be reproduced under the rule active at that time?"
    destination: "drivers (sa lens); handoff.to_ba; handoff.to_dev; handoff.to_qc"
    expected_evidence: "Rule owner, approval authority, version, effective period, applicability scope, audit trail, and historical-reproduction case."
    non_selection_guard: "Capture lifecycle and audit obligations; do not choose a rules engine, configuration schema, storage model, or administration interface."

  - id: "DR-Q10"
    trigger: "Records with validity intervals may overlap for the same business key."
    question: "Which intervals must be mutually exclusive, what boundary semantics apply, and how is the invariant preserved under concurrent writes and corrections?"
    destination: "drivers (ta lens); handoff.to_dev; handoff.to_qc"
    expected_evidence: "Business key, interval inclusivity, permitted adjacency, correction rule, concurrency case, and invariant verification."
    non_selection_guard: "State the temporal invariant and proof obligation; do not choose a database constraint, transaction pattern, validation layer, or persistence model."
~~~

## Representative Routing Cases

These cases prove routing, not a selected design.

~~~yaml
representative_cases:
  - case: "data_authority"
    owner_lens: "sa"
    concern_or_invariant: "Each shared data class has one write authority; missing or competing claims remain explicit."
    expected_evidence: "Ownership matrix, affected consumers, conflict owner, and accepted authority criterion."
    handoff: "DR-C01 and DR-C02; drivers; input_issues.contested_ownership; handoff.to_dev and handoff.to_qc"
    non_selection_guard: "Do not assign an owning system, define a schema, or choose an integration mechanism."

  - case: "contested_resource_authority"
    owner_lens: "ta"
    concern_or_invariant: "A single-winner outcome has one authoritative decision and a verifiable concurrency invariant."
    expected_evidence: "Contention scenario, winner and loser observations, retry behavior, and concurrent verification."
    handoff: "DR-C03 and DR-Q01; drivers; handoff.to_dev and handoff.to_qc"
    non_selection_guard: "Do not choose locking, coordination, database, or protocol technology."

  - case: "reconciliation"
    owner_lens: "ta"
    concern_or_invariant: "Cross-boundary state has a measurable convergence rule, mismatch owner, and correction path."
    expected_evidence: "Compared totals or populations, cadence, tolerance, mismatch evidence, and correction verification."
    handoff: "DR-C04 and DR-Q02; drivers; handoff.to_dev, handoff.to_qc, and handoff.to_devops when operational"
    non_selection_guard: "Do not choose a batch, messaging, ledger, or reconciliation product."

  - case: "compliance_timing"
    owner_lens: "sa"
    concern_or_invariant: "Applicable compliance and eligibility conditions are evaluated before commitment."
    expected_evidence: "Named authority, effective dates, eligible and ineligible cases, exception owner, and audit trail."
    handoff: "DR-C11; drivers; handoff.to_ba, handoff.to_dev, and handoff.to_qc"
    non_selection_guard: "Do not choose a rule engine, workflow, schema, or enforcement component."

  - case: "lifecycle_retirement"
    owner_lens: "sa"
    concern_or_invariant: "Every retiring capability and obligation has an accepted successor or remains blocked."
    expected_evidence: "Capability and consumer inventory, successor owner, unresolved duties, rollback owner, and measurable exit criterion."
    handoff: "DR-C12 and DR-C13; drivers; input_issues.missing_capability; stop_condition.pushed_to_s03; handoff.to_dev"
    non_selection_guard: "Do not choose a replacement product, service boundary, migration design, or rollout model."

  - case: "offline_online_invariant"
    owner_lens: "ta"
    concern_or_invariant: "Offline capture and online authoritative decisions are classified with replay, conflict, and recovery behavior."
    expected_evidence: "Action classification, authority boundary, disconnection scenario, replay and conflict cases, and user feedback."
    handoff: "DR-Q08; drivers; handoff.to_dev, handoff.to_qc, and handoff.to_devops"
    non_selection_guard: "Do not choose local storage, synchronization, networking, or conflict-resolution technology."
~~~

## Completion Check

- Emit only applicable findings, never this full reference.
- Preserve every required output block even when no checklist entry applies.
- Keep SA and TA within their block ownership and driver-kind rules.
- Give every blocking finding a named authority and every driver a verification and handoff.
- Push unresolved ownership, authority, evidence, or downstream choices to the proper existing issue or
  handoff field.
- Leave solution and model choices to system-design and architecture-modeling.

