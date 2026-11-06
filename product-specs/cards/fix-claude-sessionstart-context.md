---
artifact_id: "fix-claude-sessionstart-context.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: approved
spec_version: "1.0"
owner: "developer"
reviewers: ["qc"]
source_of_truth: true
linked_work_items: ["fix-claude-sessionstart-context"]
linked_crs: []
---

# Spec Card — Claude SessionStart context delivery

## Business Goal

```yaml
business_goal: "Automatically deliver recorded project context and handoff to Claude at session start"
in_scope: ["SessionStart output adapter", "Installed-helper and native consumer regressions", "Local packaging verification"]
out_scope: ["Release/tag publication", "Update the reported 26 projects", "New public schema or governance semantics", "Session Search companion", "Changes to unrelated A3-A4 work"]
```

## Requirements

```yaml
requirements:
  - id: REQ-001
    description: "Hook start delivers the canonical briefing using the existing documented Claude envelope"
    provenance: BASELINE
    cr_required: false
  - id: REQ-002
    description: "Preserve direct CLI JSON, silent checkpoint hooks, existing boundaries and bounded output"
    provenance: BASELINE
    cr_required: false
  - id: REQ-003
    description: "Prove consumer-visible delivery independently of instruction fallback"
    provenance: BASELINE
    cr_required: false
```

## Acceptance Criteria

```yaml
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    description: "Installed Claude helper with --hook and explicit/default start returns one JSON envelope with hookEventName SessionStart and string additionalContext; its parsed briefing contains context, active work item and handoff. All configured SessionStart sources use this format."
  - id: AC-002
    requirement: REQ-002
    description: "Without --hook, both installed Claude and Codex helpers retain the raw briefing JSON contract."
  - id: AC-003
    requirement: REQ-002
    description: "PreCompact and SessionEnd checkpoint hooks write their correct session cache with exit zero and no stdout."
  - id: AC-004
    requirement: REQ-002
    description: "Unicode/quotes/backslashes round-trip, the complete stdout remains bounded at 16KiB plus its newline, missing-context and selection-required states stay explicit, and rejected input remains nonzero/stderr with no context output."
  - id: AC-005
    requirement: REQ-003
    description: "A fresh real Claude session with tools disabled and no CLAUDE.md fallback returns an unpredictable sentinel supplied only through the hook briefing; evidence records the exact harness version and limitations."
```

## Assumptions And Open Decisions

```yaml
assumptions:
  - id: ASM-001
    description: "The user acceptance covers the diagnosed adapter fix and three-level verification; publication is separate"
    owner: "developer"
open_decisions: []
```

## Spec Freeze

```yaml
status: draft
authority: "developer"
decided_at: ""
frozen_by_person: ""
```

