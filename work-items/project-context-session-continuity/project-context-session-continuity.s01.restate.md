---
artifact_id: "project-context-session-continuity.s01.restate"
artifact_family: workflow-step
work_item_slug: "project-context-session-continuity"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CR-013"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "product-specs/srs/project-context-session-continuity.md"
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "required"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
    - "qc"
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat:
    - "qc"
  release:
    - "devops"
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  uat_reviewed_by: []
  uat_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

> Maintainer accepted this packet in chat on 2026-11-04 (Asia/Ho_Chi_Minh): “accpet, hãy tiếp tục”. Content approval is recorded; trusted terminal signatures are still pending. Draft frontmatter is retained for proposal recovery; no ACTIVE state or receipt is inferred.

# Step 1 — Clarify

## Step Contract

Deliver a reviewable urgent release scope for project context, native instructions, memory and harness integration. Owner: developer; reviewer: maintainer. Done for authoring means the release scenario, boundaries, acceptance references, design and execution plan are concrete; it does not mean implementation admission passed.

## Main Artifact

The maintainer explicitly requested: “Đóng gói tôi phần instructions, memory, harness vào bản release luôn, để tôi fix các vấn đề này trên các project đang dùng”, then prioritized packaging the complete lifecycle for immediate project upgrades. The desired outcome is a working cross-session project experience in Codex and Claude, delivered through the existing Code Factory release channel.

Priority: HIGH. Proposed release: **2.10.0**, subject to availability/version review before tagging. One coordinated release with a core workflow tarball and a pinned optional history-retrieval companion; no silent Node engine bump. This is a proposal, not an existing release.

The lifecycle is: **install/upgrade → open a fresh session → establish project context → perform authorized work → persist handoff → reopen or switch harness → resume from authoritative state → diagnose/repair or roll back**.

In scope: native instruction discovery; project purpose/code map/build/test/rules; durable decisions with provenance; session handoff and compaction recovery; project-scoped history retrieval; supported harness integration; non-destructive upgrades; operational diagnostics; release packaging and rollout guidance. Requirements and measurable outcomes belong to the linked SRS.

Out of scope: a new agent framework or vector service; automatic promotion of transcripts into policy or approvals; copying raw logs/tickets into memory; bulk editing all sibling projects; reopening approved SDD artifacts; claiming that installing skills alone delivers continuity.

## Evidence And Existing System Baseline

Read-only investigation on 2026-11-03 found:

- Stable source inspected at `.claude/worktrees/security-main-integration` is workflow bundle 2.9.0; the current root checkout has older package source. Build the candidate from the reviewed stable main baseline in an isolated worktree, never from the older root checkout by accident.
- `adapters/codex/adapter.json` installs global `AGENTS.global.md`. Native global discovery must be verified against `AGENTS.md`/override precedence; the observed Codex home has no native AGENTS entrypoint. This is an integration defect hypothesis with strong filesystem evidence, not proof that every Codex client has no instructions.
- `workflow-bundle-utils.js::syncProjectPolicy` copies the entire global policy over the project entrypoint. It does not safely merge project-specific context.
- `init-workflow-bundle.js` creates workflow/governance starter files but does not wire the full project lifecycle.
- `ai-maintainer` has `workflow-bundle.config.json` and `project-context`, but lacks root AGENTS.md/CLAUDE.md and project harness settings/hooks. Existing unrelated dirty files must be preserved.
- Global Claude SessionStart/SessionEnd hooks observed are collision-study probes, not project context recovery. Code Factory's own local hooks are not evidence that downstream projects received them.
- Session Search observed earlier in this investigation was unhealthy/stale, watcher inactive, and allowed only the Code-Factory root. Do not extend that scope to all workspaces implicitly.
- Core package declares Node >=18; `mcp/session-search` declares Node >=20, depends on cass and currently uses an unpinned SDK `latest` dependency. Its source is outside the core npm package allowlist.

Native vendor memory and Code Factory integration are different capabilities. Missing Code Factory wiring does not prove that Claude's native auto memory or a client's native session history is absent.

## Admission And Dedup Review

The CLI proposal flags `code-factory-holistic-audit-remediation`, `sdd-light-code-factory`, and `arch-role-skills-release` as near matches. Recommendation: create a bounded release work item, link the holistic audit as parent evidence, and do not reopen SDD Light or the historical SA/TA skills release. The previous onboarding-only candidate also matched Claude hooks adoption, legacy installer containment and the diagram adapter; reuse their relevant tests/patterns, not their closed approvals.

`docs/plans/memory-standardization-plan.md` is historical proposal input. Promote only the minimal authority/freshness/recovery requirements into the SRS; do not claim its entire roadmap is approved or complete. A3–A4 remains independently VERIFIED awaiting QC; this request neither approves its DoD nor makes it an unconditional dependency. Include A3–A4 only if its own closeout passes before release freeze.

The generated report is the sole protocol owner. These six draft notes prepare review while that report remains PROPOSED. No production scaffolding, runtime change, gate receipt, CR-013 materialization, tag, publication or project installation is claimed.

## Authoring Verification

2026-11-03: the stable 2.9.0 validator scripts passed workflow/naming, governance, planning and execution checks for all six draft notes. SDD validation selected zero notes because this proposal uses `sdd_mode: none`; that result is not spec-approval evidence. Strict UTF-8 decoding and trailing-whitespace checks passed for the six notes, SRS and CLI report. The report remains PROPOSED/PENDING_REVIEW with no reviewer or timestamp. No runtime tests, package build, live pilot or release verification have run for this proposal. The initial general-validation invocation used a nonexistent script name; the corrected `validate-workflow.js` invocation passed.

## Governance Context

Canonical lane: product_delivery. Structured triggers: release=true, public_contract=true (installer/status integration), security_sensitive=true (history containment); greenfield_foundation=false. Brownfield, full, strict, agentic. Adaptive writes remain disabled until source/installed minor and runtime parity meet activation requirements.

Applicable roles: PO/maintainer for outcome and release scope; developer for integration and task plan; QC for recovery/upgrade acceptance; DevOps for immutable packaging and rollback. BA reviews the requirement contract. No SA/TA or delegation is required for this bounded change.

## Handoff

Review the SRS, s05 and s06 as one packet. Resolve the near-match disposition and create-new CR-013 decision through trusted CLI review. Then seal work-item/change approval and Spec/Contract/DoR/Approach/Task Plan with authorized human receipts. DoD/UAT/Release/Business Acceptance follow evidence in s08, not this intake.

## Accepted Review And Signing Boundary

Recorded at 2026-11-04T02:05:04Z: maintainer explicitly accepted Spec/Contract/DoR/Approach/Task Plan and separate CR-013 with “accpet, hãy tiếp tục”. This records user authorization, not a fabricated CLI receipt. No scope approval is being requested again.

The supported `dispose-state` command was attempted with the exact current blocker ID and returned: `Human approval requires an interactive TTY. Run the approve command in a human-controlled terminal.` No report transition occurred. The signing boundary is implemented in `workflow-trusted-approval-utils.js`; automated/test signing flags must not be used for this real item.

Review packet readiness: s04 now encodes the accepted criteria, baseline and DoR in the machine-readable gate format; s06 encodes the same accepted task table as YAML. These are representation changes only. Recovery requires the workflow notes to retain draft frontmatter until materialization; terminal handoff will finalize the accepted hosts before signing.

Human-terminal handoff prepared at `/private/tmp/code-factory-cr013-sign.cjs` (temporary operational helper; not part of the release). Run `node /private/tmp/code-factory-cr013-sign.cjs` in the maintainer's interactive terminal. The helper resolves only the three known admission concerns using fresh snapshot-bound IDs, invokes supported proposal recovery, fills the accepted change scope, finalizes the accepted gate hosts, then calls change approval, work-item approval and the readiness bundle. Existing CLI prompts handle the signing secret directly; the helper never reads or supplies it. It does not activate, implement, sign terminal gates or publish.

Read-only `--check` and Node syntax checks passed. Full signing cannot be verified from this non-human terminal. Resume by checking trusted receipt validity and current artifact hashes; then create the isolated implementation worktree, activate with explicit owned write roots, and execute T1–T8. Chat scope approval is already given and must not be requested again.

## Signing Verification — 2026-11-04

The maintainer ran the terminal handoff. CLI status confirms CR-013 and work-item approval, resolved admission, and MATERIALIZED state. Spec, DoR, Approach and Task Plan receipts are APPROVED with matching artifact hashes. Contract is still MISSING: `deriveBundleGates` retains only four historical readiness gates for legacy reports, even when s04 requires Contract. The handoff helper omitted this separate signature; this is an assistant handoff error, not a missing scope decision from the maintainer.

The read-only ACTIVE gate preflight returned exactly one error: missing Contract receipt. Prepared `/private/tmp/code-factory-cr013-contract.cjs` to verify the four existing receipts, sign only Contract using the existing human-terminal CLI, then verify all five. Its syntax and read-only preflight pass. Existing s04/s05/s06 hosts remain unchanged so their signatures stay valid. Run `node /private/tmp/code-factory-cr013-contract.cjs` in the maintainer terminal; no repeated scope review or full handoff rerun is needed.

## Work Item Protocol
```yaml
protocol_status: VERIFIED
approval_status: APPROVED
review_required: true
work_item_slug: "project-context-session-continuity"
work_item_type: FEATURE
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/project-context-session-continuity"
current_step: "s08"
granted_write_paths:
  - ".worktrees/project-context-session-continuity"
  - "work-items/project-context-session-continuity/project-context-session-continuity.s07.implementation.md"
  - "work-items/project-context-session-continuity/project-context-session-continuity.s08.verification.md"
  - "work-items/project-context-session-continuity/evidence"
  - "changes/CR-013/execution.md"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: create_new
change_id: "CR-013"
decision_owner: "agent"
protocol_owner: "maintainer"
reviewed_by: "maintainer"
reviewed_at: "2026-11-04T02:07:39.146Z"
handoff_target: "protocol-close"
last_transition_action: "approve-closeout-bundle"
last_transition_at: "2026-11-05T03:11:18.033Z"
required_actions:
  - {"id":"se:d8de27e88726cca9033c819366d8c09f8e69462df72e0fbee04f51d3bce19e41","kind":"workflow_followup","text":"Collect DoD evidence and close the work item when ready."}
  - {"id":"se:15ab5dd89082c94cca0bb936f56d9993087cfc7681cce0d82aa1e0a69c3c2cfd","kind":"work_item_close","text":"wfc work-item close --work-item project-context-session-continuity"}
blockers: []
review_notes:
  - "Maintainer accepted Spec/Contract/DoR/Approach/Task Plan and separate CR-013 in chat on 2026-11-04; one bounded release, historical work retained."
refs:
  - "work-items/code-factory-holistic-audit-remediation"
  - "work-items/sdd-light-code-factory"
  - "work-items/arch-role-skills-release"
  - "work-items/project-context-session-continuity"
  - "changes/CR-013"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "WORK_ITEM_APPROVED"
  - "READINESS_BUNDLE_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "VERIFICATION_CONFIRMED"
  - "CLOSEOUT_BUNDLE_APPROVED"
```

