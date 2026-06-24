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