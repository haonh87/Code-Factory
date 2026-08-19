---
artifact_id: "approval-path-defects.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: approved
spec_version: "0.1"
owner: "ba"
reviewers:
  - "developer"
source_of_truth: true
linked_work_items:
  - "approval-path-defects"
linked_crs: []
---

# Spec Card - Approval Path Defects

> Spec Card for work item `approval-path-defects` running `sdd_mode=light`.
> Status: **APPROVED at `v0.1`**, not frozen. Spec and DoR receipts pending a human seal;
> spec_status was advanced ahead of sealing deliberately, per the TD-02 lesson that
> finalizing after sealing guarantees a stale digest.
>
> Four defects on the `wfc` approval path, all found by using it. Three share one
> cause: the CLI does not carry work-item state forward into the artifacts it
> generates or persists. The fourth is a documented order that cannot be followed.
>
> Every defect below was hit in a real session, not read out of the code. The
> observed error text is recorded so a fix can be verified against the symptom.

## Business Goal
```yaml
business_goal: "Make the documented approval path actually work end to end, so that opening and closing a work item costs one attempt per command instead of several, and so that the manual authoring path the policy recommends is not a dead end."
in_scope:
  - "TD-01 persist the bootstrap report so a scaffolded work item can be approved"
  - "TD-02 document and enforce the correct order so sealing does not guarantee a stale receipt"
  - "TD-03 inherit spec_refs, work_item_type and spec_status into a lazily created note"
  - "TD-04 inherit planning_track, sdd_mode and work_item_type into a scaffolded step note"
  - "One regression fixture per defect, reproducing the observed error before the fix"
out_scope:
  - "Any change to gate semantics, receipt format, signing, or the TTY requirement - the controls are correct and stay untouched"
  - "The artifact-governance enforcement work (P2/P3) - separate work item, already planned"
  - "P4 placement migration of docs/, repository root, changes/"
  - "Release or version bump"
```

## Requirements
```yaml
requirements:
  - id: REQ-001
    description: "A work item created with wfc scaffold or wfc scaffold-step can be approved without a manual workaround. Today wfc work-item approve fails with 'Missing work item report' because only wfc materialize --auto-scaffold writes .work-item-report.json, while buildBootstrapReport at work-item-protocol-utils.js:283 can produce the correct report but is never persisted - work-item-protocol.js:691 permits bootstrap only for action=status, and scaffold-workflow.js contains no reference to work-item-report."
    provenance: BASELINE
    cr_required: false
  - id: REQ-002
    description: "The documented approval order can be followed without invalidating receipts. wfc.js lists step 8 seal gates at line 320 and step 9 activate at line 322 with nothing between them, but activate additionally requires note status to be non-draft (workflow-gate-evidence-utils.js:264) and spec_status to be approved or frozen (:282), and editing those fields changes the note hash so every receipt goes stale (:312). The order must be documented, and the tool should refuse to seal a note that is not yet finalized rather than sealing one that is about to change."
    provenance: BASELINE
    cr_required: false
  - id: REQ-003
    description: "A note created lazily by wfc work-item activate inherits the work item's spec_refs, work_item_type and spec_status. Today it emits spec_refs.card empty and work_item_type FEATURE, so wfc sdd fails immediately on the note the CLI just generated."
    provenance: BASELINE
    cr_required: false
  - id: REQ-004
    description: "A note created by wfc scaffold-step inherits planning_track, sdd_mode and work_item_type from the work item's existing notes. Today it defaults to planning_track full, sdd_mode none and work_item_type FEATURE, which produced 'Inconsistent planning_track within work item' on a quick-track work item and required hand-editing five notes on a full-track one."
    provenance: BASELINE
    cr_required: false
  - id: REQ-005
    description: "Each of the four defects has a regression fixture that reproduces the observed error before the fix and passes after, so the symptom rather than the implementation is what is verified."
    provenance: BASELINE
    cr_required: false
  - id: REQ-006
    description: "No gate control weakens. The TTY requirement, the passphrase requirement, the per-gate receipt, the digest binding and the human-fills-gate_reviews rule are all unchanged. This work item removes friction from the path, not authority from the gates."
    provenance: BASELINE
    cr_required: false
  - id: REQ-007
    description: "wfc protocol works inside a git worktree. Every .work-item-report.json stores workflow_root as an absolute path, and validate-work-item-protocol.js:121 compares it against the currently resolved path, so the check fails in any worktree - and the failure message names a different work item's file, which reads as data corruption rather than path resolution. CLAUDE.md:192 mandates a worktree for large or risky changes, so the policy requires the condition the validator mishandles. Covers T0-F2."
    provenance: BASELINE
    cr_required: false
    spec_change_ref: "work-items/approval-path-defects/approval-path-defects.s07.implementation.md#Spec Change"
    added_at: "2026-08-17, after T0-F2 was observed during s07 and held at the spec boundary rather than absorbed"
    scope_note: "An earlier draft of this requirement also covered a claimed defect in scripts/hooks/tdd-enforce.sh path resolution. That claim was WITHDRAWN: the hook resolves worktree test files correctly, because a worktree under .claude/worktrees/ is nested inside the main tree and the relative path still resolves. See the correction in s07 finding T4-F1."
```

## Acceptance Criteria
```yaml
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    description: "Given a work item created only by wfc scaffold-step, wfc work-item approve succeeds without any manual file creation. The persisted report carries request_source legacy-scaffold, approval_status PENDING_REVIEW and empty reviewed_by, so persistence does not imply approval."
  - id: AC-002
    requirement: REQ-002
    description: "wfc.js documents the step between sealing and activating. A fixture that seals a gate on a draft note is rejected with a message naming status and spec_status, rather than sealing a receipt that activate will then call stale."
  - id: AC-003
    requirement: REQ-003
    description: "A note created by wfc work-item activate on an sdd_mode=light work item passes wfc sdd with no hand editing: spec_refs.card, work_item_type and spec_status all match the work item."
  - id: AC-004
    requirement: REQ-004
    description: "wfc scaffold-step on an existing work item produces a note whose planning_track, sdd_mode and work_item_type match the sibling notes. wfc validate passes with no hand editing."
  - id: AC-005
    requirement: REQ-005
    description: "Four fixtures exist, one per defect, each reproducing the recorded error text before the fix and passing after. Each was observed red."
  - id: AC-006
    requirement: REQ-006
    description: "The 15 existing trusted receipts still report digest_match=true. The TTY refusal still fires for a non-interactive approve. validateSnapshotAuthority still requires gate_reviews and role_signoffs filled by a human. Zero of the 26 unit test files and 10 governance fixtures regress."
  - id: AC-007
    requirement: REQ-007
    description: "The report writer stores a project-relative workflow_root, or validate-work-item-protocol.js normalises before comparing, so wfc protocol passes inside a worktree. Covers T0-F2. No task is proposed for it in this work item; the requirement is recorded so it is not lost."
    withdrawn_sibling: "A second criterion covering tdd-enforce path resolution was drafted and withdrawn with the claim it tested. The hook was verified to resolve worktree test files correctly."
```

## Assumptions And Open Decisions
```yaml
assumptions:
  - id: ASM-001
    assumption: "Persisting the bootstrap report is additive and does not change any existing behaviour, because today the same report is already built in memory for wfc work-item status."
    owner: "developer"
  - id: ASM-002
    assumption: "REQ-002 is satisfied by refusing to seal an unfinalized note, rather than by making the receipt tolerate later edits."
    taken_because: "The digest binding is the property that makes a receipt worth anything. Loosening it to fit a bad order would trade a real control for convenience."
    owner: "developer"
  - id: ASM-003
    assumption: "Light is eligible: brownfield, quick, default profile, agentic, self, medium risk, and no hard escalation trigger fires. This is a defect fix that makes the tool match its own documentation; it changes no spec, no data contract and no gate semantic."
    owner: "ba"
open_decisions:
  - id: ODC-001
    description: "Should persisting the bootstrap report be gated on protocolControl.legacyScaffoldPolicy, or unconditional? Gating preserves the strict-default posture; unconditional makes the documented manual path work out of the box. The policy text says the strict default is forbid, which argues for gating - but then the recommended manual path stays broken under the default."
    owner: "po"
  - id: ODC-002
    description: "Does the fix for REQ-002 belong in the tool, the documentation, or both? Refusing to seal is a behaviour change for anyone who currently seals early and edits after."
    owner: "developer"
```

## Spec Freeze
```yaml
# authority names the role holding freeze authority. Declaring it is not freezing.
status: draft
authority: "ba"
decided_at: ""
frozen_by_person: ""
freeze_requested_at: "2026-08-17"
spec_version_requested: "0.1"
```
