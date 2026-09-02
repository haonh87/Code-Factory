---
language: en
---

# Adaptive Planning

> Vietnamese: adaptive-planning.vi.md

This document materializes `Phase 4: Adaptive Planning` along a `BMAD-inspired routing` direction, while keeping the eight-step workflow backbone as the single axis.

## Goals

- add `planning_track` to the workflow note
- route authoring depth by `quick|full|enterprise`
- keep one workflow backbone; do not spawn parallel workflows
- use the validator and CI to lock the planning preset

## Adaptive Admission Contract

This is the canonical documentation contract for CR-008. The executable source is `packages/workflow-bundle/scripts/workflow-adaptive-governance.js`. The adaptive writer is active only when all installed harnesses match the source bundle minor and canonical/runtime parity passes; otherwise readers remain dual-shape and writes use the legacy path.

### Request lanes

| Request lane | Delivery workflow by default | Default applicability |
|---|---:|---|
| `qa` | no | no delivery roles or gates |
| `translation` | no | no delivery roles or gates |
| `summarization` | no | no delivery roles or gates |
| `research` | no | no delivery roles or gates |
| `documentation` | no | no delivery roles or gates |
| `read_only_analysis` | no | no delivery roles or gates |
| `maintenance` | yes | `developer`, `qc`; `task_plan`, `dod` |
| `product_delivery` | yes | product delivery base plus trigger-selected architecture/release entries |

A non-delivery lane returns before report, scaffold, protocol, capability-control, or telemetry writes. A human may override materialization only with `actor`, `reason`, and UTC `timestamp`; the stable routing reason is `HUMAN_MATERIALIZATION_OVERRIDE`. The override preserves the classified lane and does not approve any gate.

### Hard escalation precedence

| Trigger | Stable escalation reason |
|---|---|
| public API/event/data contract | `HARD_PUBLIC_CONTRACT` |
| migration, backfill, cutover, or equivalent data movement | `HARD_MIGRATION` |
| security-sensitive behavior or evidence | `HARD_SECURITY_SENSITIVE` |
| regulated evidence or control | `HARD_REGULATED` |
| greenfield or foundation decision | `HARD_GREENFIELD_FOUNDATION` |
| release, rollout, or production publication | `HARD_RELEASE` |
| ambiguous mixed intent | `HARD_AMBIGUOUS_MIXED_INTENT` |
| unknown request-lane value | `HARD_UNKNOWN_REQUEST_LANE` |

Any hard trigger wins over the requested lane, planning preset, and ordinary override. The effective lane is `product_delivery`; `workflow_required=true`; every reason is retained in deterministic table order.

Hard triggers are structured classifier/CLI inputs. Raw request keywords are not sufficient by themselves because phrases such as “document the adapter contract” do not prove that a public contract changes. Trigger booleans accept only `true|false`; a typo is rejected rather than treated as a downgrade.

### Role and gate trigger matrix

| Effective lane or trigger | Required roles | Required gates | Stable reason family |
|---|---|---|---|
| non-delivery, no override | none | none | `LANE_*` |
| non-delivery, audited materialization override | `developer`, `qc` | `task_plan`, `dod` | `HUMAN_MATERIALIZATION_OVERRIDE`, `ROLE_*_BOUNDED_CHANGE`, `GATE_*_BOUNDED_CHANGE` |
| `maintenance` | `developer`, `qc` | `task_plan`, `dod` | `LANE_MAINTENANCE`, bounded-change and technical-closeout reasons |
| `product_delivery` base | `po`, `ba`, `developer`, `qc` | `spec`, `dor`, `approach`, `task_plan`, `dod`, `business_acceptance` | product-outcome, requirement, delivery, verification, and business-outcome reasons |
| `public_contract` | add `sa`, `ta` | add `contract` | `ROLE_SA_PUBLIC_CONTRACT_BOUNDARY`, `ROLE_TA_PUBLIC_CONTRACT_RISK`, `GATE_CONTRACT_PUBLIC_CONTRACT` |
| `migration` | add `ta` | no extra gate by itself | `ROLE_TA_MIGRATION_RISK` |
| `security_sensitive` | add `ta` | no extra gate by itself | `ROLE_TA_SECURITY_RISK` |
| `regulated` | add `sa`, `ta` | no extra gate by itself | `ROLE_SA_REGULATED_BOUNDARY`, `ROLE_TA_REGULATED_RISK` |
| `greenfield_foundation` | add `sa`, `ta` | add `foundation` | `ROLE_SA_FOUNDATION_BOUNDARY`, `ROLE_TA_FOUNDATION_RISK`, `GATE_FOUNDATION_GREENFIELD` |
| `release` | add `devops` | add `release`, `business_acceptance` | `ROLE_DEVOPS_RELEASE`, `GATE_RELEASE_PUBLICATION`, `GATE_BUSINESS_ACCEPTANCE_RELEASE_OUTCOME` |

Reviewer authority remains explicit: `spec→ba`, `contract→developer`, `dor→ba+qc`, `approach→developer`, `foundation→developer`, `task_plan→developer`, `dod→qc`, `release→devops+qc`, and `business_acceptance→po`. Applicability chooses whether an entry exists; it never self-approves an applicable gate.

### Stable routing and activation reasons

- Lane reasons use `LANE_<UPPER_SNAKE_LANE>`.
- Role reasons use `ROLE_<ROLE>_<TRIGGER_OR_RESPONSIBILITY>`.
- Gate reasons use `GATE_<GATE>_<TRIGGER_OR_SCOPE>`.
- Runtime activation uses `ADAPTIVE_RUNTIME_VERSION_INVALID`, `ADAPTIVE_RUNTIME_MINOR_SKEW`, and `ADAPTIVE_RUNTIME_PARITY_REQUIRED`.
- Adding or renaming a reason is a contract change and requires golden-fixture, adapter-parity, docs, and runtime updates in the same release.

## Planning Track

| Track | When to use | Default preset |
|---|---|---|
| `quick` | small bug, small change, narrow scope, one main boundary | `governance_profile=default`, `execution_mode=agentic`, `review_mode=self`, `sdd_mode=none` |
| `full` | ordinary feature/change that needs full discovery + delivery | `governance_profile=default`, `execution_mode=agentic`, `review_mode=self`, `sdd_mode=none` |
| `enterprise` | scope with many roles, a heavy review lane, high compliance/runtime risk | `governance_profile=strict`, `execution_mode=agentic`, `review_mode=independent`, `verification_owner=auditor`, `sdd_mode=none` |

## Routing Matrix

| Signal | Recommended track |
|---|---|
| one boundary, low risk, no separate review needed | `quick` |
| many requirements but not yet compliance-heavy | `full` |
| many role signoffs, high release risk, verification must be independent | `enterprise` |

## Rule Baseline Enforced

### `quick`

- `execution_mode` must be `agentic`
- `review_mode` must be `self`
- `sdd_mode` must not be `strict`

### `full`

- is the default baseline
- no additional guardrails in this phase beyond the common contract

### `enterprise`

- `governance_profile` must not be `default`
- delivery steps `s05-s08` must not use `review_mode=self`
- delivery steps `s05-s08` must have a `verification_owner`

## Standard Commands

Scaffold by track:

```bash
wfc scaffold --work-item <work-item-slug> --planning-track quick
wfc scaffold --work-item <work-item-slug> --planning-track full
wfc scaffold --work-item <work-item-slug> --planning-track enterprise
```

Validate planning:

```bash
wfc plan --workflow-root work-items
```

## Canonical Samples

- `work-items/sample-quick-item/`
- `work-items/sample-enterprise-item/`
- older work items without `planning_track` are currently treated by the validator as `full` to preserve backward compatibility during this rollout phase
