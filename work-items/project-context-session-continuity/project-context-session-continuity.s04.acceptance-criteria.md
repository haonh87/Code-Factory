---
artifact_id: "project-context-session-continuity.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "project-context-session-continuity"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
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
spec_status: approved
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
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-11-04T02:07:36.349Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-11-04T02:07:36.349Z"
  dor_reviewed_by:
    - "qc"
  dor_reviewed_at: "2026-11-04T02:07:36.349Z"
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
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "project-context-session-continuity.s01.restate.md"
  - "project-context-session-continuity.s02.business-goal.md"
  - "project-context-session-continuity.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

> Maintainer accepted this packet in chat on 2026-11-04 (Asia/Ho_Chi_Minh): “accpet, hãy tiếp tục”. Content approval is recorded; trusted terminal signatures are still pending. Draft frontmatter is retained for proposal recovery; no ACTIVE state or receipt is inferred.

# Step 4 — Acceptance + DoR

## Step Contract

Review the SRS as the requirement and integration contract. Owner: BA + QC. All criteria are proposed; none are claimed verified.

## Requirement Baseline

```yaml
status: APPROVED
approved_spec_refs:
  - "product-specs/srs/project-context-session-continuity.md"
approved_spec_digests:
  - "product-specs/srs/project-context-session-continuity.md:sha256:29083daf820511c8a580a7559658190f2e60dab7b0b3b705434165d31c383a05"
decision_notes:
  - "Maintainer accepted this packet in chat; trusted terminal receipt remains pending."
```

## Contract Baseline

```yaml
status: APPROVED
api_contract_refs:
  - "product-specs/srs/project-context-session-continuity.md#Installation And Diagnostic Contract"
ux_contract_refs: []
notes:
  - "Maintainer accepted installation, status and history boundaries; no Foundation change."
```

## Existing System Baseline

```yaml
current_behavior_refs:
  - "s01 Evidence And Existing System Baseline"
impacted_surfaces:
  - "Codex/Claude adapters, install/update/init/status, hooks, runtime packaging, history companion"
compatibility_constraints:
  - "Node18 core; Node20 companion; preserve unmanaged files and existing receipts"
rollback_constraints:
  - "Restore only managed bytes with matching hashes; preserve canonical history and subsequent user edits"
```

## Main Artifact

```yaml
acceptance_criteria:
  - id: CTX-01
    criterion: "Requirement CTX-01 in product-specs/srs/project-context-session-continuity.md"
    verification: "A genuinely fresh supported Codex session and Claude session discover the correct native project instructions. Tests cover global/project precedence and overrides; no duplicated conflicting policy. Installed-file existence alone does not pass."
  - id: CTX-02
    criterion: "Requirement CTX-02 in product-specs/srs/project-context-session-continuity.md"
    verification: "Each harness identifies the pilot's purpose, actual source/module paths, test/lint commands and critical constraints with links to inspected project sources; no architecture invented from generic templates."
  - id: CTX-03
    criterion: "Requirement CTX-03 in product-specs/srs/project-context-session-continuity.md"
    verification: "Resume recovers the correct item, step, gate state, blocker, evidence and next action from canonical sources. Tests pass for zero, one and multiple active items, a different branch/worktree and stale source hashes."
  - id: CTX-04
    criterion: "Requirement CTX-04 in product-specs/srs/project-context-session-continuity.md"
    verification: "Save/checkpoint then reopen in the other harness restores a distinctive reviewed decision and unfinished action with source references. Reverse direction, compaction and abrupt-exit recovery are tested. Unknown unsaved work is reported rather than fabricated."
  - id: CTX-05
    criterion: "Requirement CTX-05 in product-specs/srs/project-context-session-continuity.md"
    verification: "Retrieved malicious transcript text cannot approve gates, modify instructions or execute commands. Requests for another project and symlink/path escapes are denied. No raw sensitive fixture contents enter shared memory or release assets."
  - id: CTX-06
    criterion: "Requirement CTX-06 in product-specs/srs/project-context-session-continuity.md"
    verification: "Full history mode on the pilot retrieves a known synthetic historical exchange for both supported transcript sources, with source/time. Missing/stale index or dependency failure is distinguishable from “no matching history”; retrieval does not silently reindex."
  - id: CTX-07
    criterion: "Requirement CTX-07 in product-specs/srs/project-context-session-continuity.md"
    verification: "Upgrade from exact 2.9.0 and legacy managed-file fixtures preserves unrelated bytes/settings/hooks, survives partial failure, detects conflicts and is byte-idempotent on a second run. Unknown content is preserved."
  - id: CTX-08
    criterion: "Requirement CTX-08 in product-specs/srs/project-context-session-continuity.md"
    verification: "Read-only status reports each layer independently, actionable degraded states and version/hash/time of lifecycle proof; tests establish that status performs no write or indexing."
  - id: CTX-09
    criterion: "Requirement CTX-09 in product-specs/srs/project-context-session-continuity.md"
    verification: "Exact release assets install and operate in clean temporary homes/projects with the Code-Factory checkout unavailable. No developer absolute paths, private transcripts or unintended files. SHA-256 manifest identifies the tested assets."
  - id: CTX-10
    criterion: "Requirement CTX-10 in product-specs/srs/project-context-session-continuity.md"
    verification: "Core matrix passes Node18/22; companion passes Node20/22 with declared cass prerequisites. Supported harness/platform versions and fallback differences are explicit. Missing optional history never masquerades as full health."
  - id: CTX-11
    criterion: "Requirement CTX-11 in product-specs/srs/project-context-session-continuity.md"
    verification: "Maintainer/QC observes fresh-session, checkpoint, reopen and cross-harness continuation on ai-maintainer using the candidate artifacts, including preserved dirty-file hashes and its PII constraints. Live pilot writes require approved scope and filesystem access."
  - id: CTX-12
    criterion: "Requirement CTX-12 in product-specs/srs/project-context-session-continuity.md"
    verification: "Exact previous-package rollback plus owned-file restoration is rehearsed. User edits made after installation survive or cause an explicit conflict; canonical history/receipts remain unchanged. Release includes concrete upgrade, verify, repair and rollback instructions."
```

## Governance Checks

Required gates and reasons: work-item/change (new release scope); Spec (project lifecycle behavior); Contract (installation/status and history boundaries); DoR (testable readiness); Approach (cross-harness integration); Task Plan (execution ownership); DoD (verified result); UAT (fresh-session pilot); Release (distributed artifacts); Business Acceptance (maintainer's continuity outcome). Authorized role mappings are in frontmatter. No gate has a reviewer/timestamp yet.

Draft applicability rationale codes (local to this proposal, not new router enums): `CTX_RELEASE_REQUEST` applies to work-item/change, Release and the maintainer/DevOps roles; `CTX_PROJECT_BEHAVIOR` to Spec, DoR and BA; `CTX_INSTALL_HISTORY_CONTRACT` to Contract and developer/QC; `CTX_CROSS_HARNESS_DELIVERY` to Approach, Task Plan and developer; `CTX_LIFECYCLE_EVIDENCE` to DoD, UAT and QC; `CTX_USER_CONTINUITY_OUTCOME` to Business Acceptance and PO. Foundation and SA/TA are not applicable and create no pending approval action.

## Definition of Ready

```yaml
status: READY
blockers: []
owners:
  - "ba"
  - "qc"
notes:
  - "Maintainer accepted measurable criteria, approach and ordered plan; trusted admission/readiness signatures still block execution."
  - "Version support and artifact portability are explicit T1/T6 verification tasks, not assumed successful."
```

## Traceability

s01 → SRS CTX-01..CTX-12 → s05 integration design → s06 T1..T8 → future s08 evidence.

## Handoff

Review this packet once; issue independent receipts for each applicable readiness gate. Do not backfill approval after code changes.
