---
artifact_id: "contain-legacy-codex-installer-paths.card"
artifact_family: "product-spec"
spec_type: "SPEC_CARD"
spec_status: "approved"
spec_version: "0.2"
owner: "ba"
reviewers:
  - "developer"
  - "qc"
  - "ta"
source_of_truth: true
linked_work_items:
  - "contain-legacy-codex-installer-paths"
linked_crs: []
---

# Spec Card — Legacy Codex Installer Containment

APPROVED CONTENT: one requirements owner for this full/strict-governance work item. The CLI retains `sdd_mode=none`; this compact document does not select Light or change the protocol. The user accepted this spec and the work-item/DoR/Approach A/Task Plan packet at `89131d9`. Decision recorded at 2026-10-13T13:22:58Z; trusted receipts and activation remain pending.

## Scope

```yaml
in_scope:
  - "Direct Bash and PowerShell installer preflight for managed names, manifests, source inventory and destination topology."
  - "Isolated fixtures exercising the real scripts and sentinel preservation."
  - "A dedicated GitHub Actions verification workflow with Windows PowerShell 5.1 and Bash compatibility jobs; no release or deployment."
out_of_scope:
  - "Central wfc runtime changes, installer retirement, README/drive-root wrapper changes, live user-profile installation, package generation, publication or release."
  - "Concurrent hostile filesystem replacement during an invocation; an expanded threat model requires new review."
  - "P-PUBLIC/current-doc, whole-pack security scan and unrelated remediation ownership."
threat_model: "Malformed or tampered local state exists before invocation; no concurrent hostile writer. Input/preflight errors are no-mutation failures; an unrelated I/O failure after a valid preflight is not promised to roll back all successful writes."
```

## Requirements

```yaml
requirements:
  - id: "REQ-PI-001"
    statement: "Validate the entire selected manifest and source skill inventory before any installation mutation; reject malformed or duplicate/equivalent destination names."
    provenance: "BASELINE"
    source: "Parent P-INSTALL / M2-OBS-23, scope accepted at audit 9c81d53"
  - id: "REQ-PI-002"
    statement: "Constrain every managed write/delete to its intended physical destination and reject alias topology before mutation."
    provenance: "BASELINE"
    source: "Parent P-INSTALL / M2-OBS-23, scope accepted at audit 9c81d53"
  - id: "REQ-PI-003"
    statement: "Preserve valid current/legacy manifest behavior, installation and stale managed cleanup while retaining unrelated data."
    provenance: "BASELINE"
    source: "Parent P-INSTALL / M2-OBS-23, scope accepted at audit 9c81d53"
  - id: "REQ-PI-004"
    statement: "Prove rejection and valid behavior through source-bound real-entry-point integration tests on disposable GitHub-hosted Windows PowerShell 5.1 and Linux/macOS Bash jobs."
    provenance: "BASELINE"
    source: "Parent P-INSTALL / M2-OBS-23, scope accepted at audit 9c81d53"
```

## Acceptance Criteria

```yaml
acceptance_criteria:
  - id: "AC-PI-001"
    requirement: "REQ-PI-001"
    description: "Every invalid-name fixture exits nonzero before any target write; an invalid entry after a valid entry still leaves the entire destination snapshot unchanged."
  - id: "AC-PI-002"
    requirement: "REQ-PI-002"
    description: "Every destination-alias or containment fixture exits nonzero with byte-identical inside/outside sentinels, original link metadata and no created/deleted target paths."
  - id: "AC-PI-003"
    requirement: "REQ-PI-003"
    description: "Valid current-manifest precedence, legacy fallback, LF/CRLF/UTF-8 BOM handling, first install, repeat install and stale managed removal pass; unmanaged sibling hashes remain unchanged."
  - id: "AC-PI-004"
    requirement: "REQ-PI-001"
    description: "Duplicate source basenames across categories or platform-equivalent destinations fail before mutation of policy, manifests or skills."
  - id: "AC-PI-005"
    requirement: "REQ-PI-004"
    description: "Record meaningful RED then GREEN real-entry-point results, including Windows names/reparse points, in the dedicated Windows PowerShell 5.1, Linux Bash and macOS Bash jobs. Final PASS requires all three job summaries/artifacts for one commit and zero missing mandatory cases."
  - id: "AC-PI-006"
    requirement: "REQ-PI-003"
    description: "Malformed-state failures identify the rejected input category and stop before policy copy, manifest rewrite, skill replacement/cleanup and optional drive-root actions; ordinary valid entry points remain usable."
```

## Input and Compatibility Contract

```yaml
name_contract:
  proposed_grammar: "^[a-z0-9]+(?:-[a-z0-9]+)*$"
  windows_reserved: "Reject con, prn, aux, nul, com1..com9, lpt1..lpt9 case-insensitively, on both scripts."
  reject: "Traversal/dot segments, slash/backslash, rooted/drive/UNC names, wildcard/control/colon forms, leading/trailing spaces or dots, uppercase/custom names outside the grammar; never repair or trim malformed names into valid ones."
  baseline: "All 42 current canonical skill basenames are unique and match the proposed grammar. This is a declared tightening for noncanonical historical/custom manifest names, not a claim of universal backwards compatibility."
manifest_contract:
  selection: "Current manifest takes precedence; use legacy only when current is absent; missing both means first install."
  encoding: "Accept UTF-8, an optional BOM only at the beginning, LF or CRLF, with or without terminal newline. Ignore empty records; reject whitespace-only records, embedded controls/BOM and malformed names."
  duplicates: "Reject repeated names before de-duplication; reject source basename collisions before flattening."
  inactive_legacy: "Do not import stale names from an inactive legacy manifest; still preflight its filesystem node before any planned legacy-manifest removal."
destination_contract:
  - "Anchor to the physical disposable/user home intended by the normal entry point; skill destinations must be immediate children of its managed skills directory."
  - "Reject symlink/reparse points, including dangling ones, at managed home/skills roots, policy/manifest files, affected skill roots and within any subtree scheduled for recursive removal. Inspect without following aliases."
  - "An existing policy/manifest must be a regular file; roots/skill targets must have the expected directory type. Type/read/inspection failures are preflight failures."
  - "Require unique link count for existing policy/manifest files written in place, or otherwise prove replacement cannot mutate a hard-linked external inode; the proposed simple policy rejects detected multi-link regular files."
  - "Preserve every unmanaged sibling and all out-of-root sentinels. Existing ordinary filesystem ancestors outside the managed home are resolved as context, not recursively modified."
failure_contract: "Nonzero exit with category/context on malformed input or unsafe topology, before mkdir/copy/delete/manifest rewrite. Do not echo arbitrary control characters or secrets. No destructive discovery or live-home probes."
```

## Fixture Matrix

```yaml
negative_cases:
  - "Current and legacy manifests independently: ../outside, .., ., absolute POSIX path, drive-root/UNC, both separators, wildcard, colon/stream, controls, duplicate name and valid-then-invalid order."
  - "Platform-equivalent/reserved/trailing-dot-space names and duplicate source basenames; rejection applies before an otherwise valid skill replacement."
  - "Existing managed-root, manifest, global policy, skill-target and nested-deletion symlink/reparse aliases, including dangling links; wrong node type; multi-link output file."
  - "Malformed data alongside pre-existing policy/current+legacy manifests and unmanaged skills; compare entire target inventory plus sentinel hashes/link metadata."
positive_cases:
  - "Missing manifests/first install; repeated valid install; current wins over divergent legacy; legacy-only migration; LF/CRLF/BOM/no-final-newline."
  - "Current skills installed once; stale regular managed directory removed; unrelated sibling and outside sentinels byte-preserved."
evidence_fields:
  - "source commit"
  - "OS/filesystem"
  - "Bash/PowerShell/Node versions"
  - "case identifier"
  - "exit code"
  - "before/after hashes and node inventory"
  - "RED/GREEN log"
  - "platform cases not executed"
```

## Open Decisions

```yaml
open_decisions: []
resolved_inputs:
  - id: "OQ-PI-ENV"
    owner: "maintainer/qc"
    resolution: "User selected GitHub-hosted Windows CI. Exact platform matrix and engine preconditions are proposed in s05 CI Verification Contract; actual capability is checked by T1 before accepting RED."
  - id: "OQ-PI-ISOLATION"
    owner: "developer/qc"
    resolution: "Dedicated one-job VM account, no HOME/profile override, absent managed-root guard, unchanged script copies and fixture-only mutation endpoints; see s05 CI Verification Contract."
    approval_status: "Proposed technical resolution, subject to Approach/Task Plan review."
```

## Spec Freeze

```yaml
status: "draft"
authority: "ba"
decided_at: ""
frozen_by_person: ""
```
