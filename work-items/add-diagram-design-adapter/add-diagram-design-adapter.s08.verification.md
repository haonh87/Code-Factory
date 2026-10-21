---
artifact_id: "add-diagram-design-adapter.s08.verification"
artifact_family: workflow-step
work_item_slug: "add-diagram-design-adapter"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: CHANGE
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
change_id: "CHANGE-005"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-005/spec-delta/brd.delta.md"
  - "changes/CHANGE-005/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CHANGE-005/spec-delta/brd.delta.md"
  srs: "changes/CHANGE-005/spec-delta/srs.delta.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["po", "ba", "developer", "qc", "devops"]
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec: ["ba"]
  contract: ["developer"]
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: ["devops", "qc"]
  business_acceptance: ["po"]
  dod: ["qc"]
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
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "add-diagram-design-adapter.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---


# Step 8 - Verify + DoD

> [!summary]
> Automated verification passes for the final 2.7.0 candidate. Overall verdict is PARTIAL:
> READER-TASK-001 is not measured; QC scan disposition, canonical Draw.io first-open review,
> and human DoD/Release/Business Acceptance remain pending. No publication is authorized.

## Step Contract
```yaml
step_goal: "Verify accepted A1 against AC-001..011 using the exact candidate and independent reader evidence."
input_summary: ["Signed s04/s05/s06", "s07 T0-T9 implementation", "Final candidate SHA-256 below"]
output_summary: ["Acceptance matrix", "Reader review packet", "Explicit residual risks and gate ownership"]
done_when: ["AC-007 measured and passed", "QC resolves review gaps", "Required human gates are signed"]
owner: "qc"
```

## Main Artifact
```yaml
verification_scope: ["Adapter and role/modeling hooks", "Provenance", "Static HTML/SVG and offline PNG", "Runtime packaging and rollback", "Workflow evidence"]
evidence_refs: ["s07 implementation", "Candidate Identity", "Acceptance Evidence", "READER-TASK-001 Review Packet"]
summary_verdict: PARTIAL
```

## Candidate Identity

Evidence was measured on 2026-10-20/21. The canonical governance workspace owns this
note; relative artifact links below resolve from that workspace. Outputs and raw logs
remain in the isolated worktree's ignored `artifacts/` directory, not in the npm package.
Keep that directory until review and integration are complete.

| Artifact | Identity |
| --- | --- |
| Final candidate | `workflow-bundle-2.7.0.tgz`; 1,556,920 bytes; 901 files |
| Candidate SHA-256 | `1a0f6f5ee468f531cc81ec1b116819a266cf96381812a6839538ace0590b7538` |
| Published fallback | `workflow-bundle-2.6.4.tgz`; SHA-256 `9d7c5395ff5fb3ae2a64d26089a2c4c62122fb769a7cacd2e3bcea3f6fa35e84` |
| Source baseline | `fa9ad237f8179e58b16ca6c6c589bdd0728ec476`; worktree base `d43ef61` adds governance only |
| Upstream commit | `5f1b6ddc66036554dd68701798bd12aa5e3ef3f9` |
| Upstream manifest | 155 files / 2,113,085 bytes; `97c4979fcbb92f4b0e1af8ef6fa79728ed2fa9cffccf838c6a0fa2e11738de96` |
| Runtime inventory | 43 skills each for Codex and Claude; 86 total |
| PNG environment | Isolated CPython 3.14.6 / Playwright 1.64.0 / Chromium Headless Shell 156.0.8078.4 revision 1248; exact lock and executable hash in s07 |

[Final candidate](../../.claude/worktrees/add-diagram-design-adapter-v2.7.0/artifacts/workflow-bundle-2.7.0.tgz),
[output execution evidence](../../.claude/worktrees/add-diagram-design-adapter-v2.7.0/artifacts/reader-review-final/execution-evidence.json),
[retained verification log index](../../.claude/worktrees/add-diagram-design-adapter-v2.7.0/artifacts/verification-final/index.json).
The candidate before the header-contrast fix is superseded and must not be promoted.

## Acceptance Evidence

| Criterion | Observed result | Evidence |
| --- | --- | --- |
| AC-001/002 | PASS: optional SA/TA intent for both audiences; schemas unchanged | Role contract suite; four role/audience fixtures and final output sets |
| AC-003 | PASS: invalid input fails closed | Missing facts, unsafe/control text, traversal/symlinks, ownership/destination collisions, missing tool/browser tests |
| AC-004/005 | PASS: distinct canonical ownership; complete semantic coverage | Modeling/Draw.io suites; reconstructed HTML/SVG validation; two layouts; canonical source recheck before atomic publication |
| AC-006 | PASS for packaged checks and producer visual review; independent review pending | HTML/SVG/PNG sets; static/accessibility assertions; actual offline PNG, transparent margin/opaque header pixels; failure cleanup tests |
| AC-007 | NOT_MEASURED — blocking | Two independent reviewers and 20 answers pending below |
| AC-008 | PASS | Pinned provenance verifier, key hashes, 155-file digest, tamper/symlink/nested-skill rejection |
| AC-009 | PASS in isolated supported matrix | Node 18 and 22 exact-candidate installs, 4/4 each; exact 2.6.4 update/disable/re-enable/rollback, 4/4; parity and unmanaged-file preservation |
| AC-010 | PASS | s07 T0 admission: CHANGE-004 DONE, signed dispositions, baseline re-read and authorized grants; SA/TA schemas and canonical renderer implementation preserved |
| AC-011 | PARTIAL — named review blockers remain | Automated lanes below pass; dedicated SAST unavailable; reader, QC first-open and human gates pending |

| Verification lane | Result and retained log |
| --- | --- |
| Full unit suite | PASS, 50/50 test files; `cf-adapter-unit-contrast-20261021.log` |
| Exact candidate, Node 18.20.8 | PASS 4/4; `cf-adapter-final-node18-20261021.log` |
| Exact candidate, Node 22.23.2 | PASS 4/4; `cf-adapter-final-node22-20261021.log` |
| Exact published fallback lifecycle | PASS 4/4; `cf-adapter-final-rollback-20261021.log` |
| Bundle smoke / runtime parity | PASS; `cf-adapter-bundle-smoke-20261021.log` and unit runtime-parity suite |
| Workflow fixture cases | PASS, 10 expected positive/negative cases; `cf-adapter-fixtures-20261021.log` |
| Pack audit | PASS; `cf-adapter-pack-audit-final-20261021.log` |
| JS syntax / Python parsing | PASS; first-party scripts; no separate compilation/typecheck applies |
| Workflow authoring / UTF-8 / package-source preservation | PASS: naming/governance/change/execution/planning validate 8 notes; SDD has 0 applicable notes; strict UTF-8 and whitespace checks pass; all 901 package entries match source bytes; five signed gate hosts and work-item/change approvals remain valid |
| Hosted CI | NOT RUN: branch has not been pushed; no hosted result claimed |

## Final Handoff Checks

Normal CLI recorded `BLOCKED/s08` with two precise review blockers and QC handoff.
Protocol validation passes for all 27 managed work items (20 permitted legacy items skipped).
Report and s01 protocol projection were not edited by hand. Five trusted gate receipts
(Spec, Contract, DoR, Approach, Task Plan) still verify against unchanged host bytes.
Work-item and CHANGE-005 approval signatures remain valid. Final tarball SHA and all
901 file contents match current package source. No release source changed after packing.

## READER-TASK-001 Review Packet

This executes the already-approved [Reader Review Protocol](../../changes/CHANGE-005/spec-delta/srs.delta.md#reader-review-protocol).
Use two independent representative people, one business decision-maker and one engineering
reviewer. Neither may have generated the evaluated derivative. Record a reviewer ID,
representative role, UTC review time, and independence confirmation. Keep personal names
outside the repo if needed; stable anonymized IDs suffice.

Open the assigned derivative first and record the ten answers without coaching. Then
identify the canonical source, derivative purpose and render owner using the links and
labels. QC compares answers against the canonical model/view and records binary scores;
producer observations do not count as independent answers. Missing facts, contradictions
and unreadable content must be recorded, not silently corrected during the review.

- Business profile: [SA / BUSINESS HTML](../../.claude/worktrees/add-diagram-design-adapter-v2.7.0/artifacts/reader-review-final/out/sa-aud-business/index.html).
  Declared question: “Who owns the order flow from Store to ERP?”
- Engineering profile: [TA / ENGINEERING HTML](../../.claude/worktrees/add-diagram-design-adapter-v2.7.0/artifacts/reader-review-final/out/ta-aud-engineering/index.html).
  Declared question: “Which systems exchange orders, in which direction, under which protocol and failure policy?”
- Ground truth for QC: [canonical model](../../.claude/worktrees/add-diagram-design-adapter-v2.7.0/artifacts/reader-review-final/models/model.json),
  [governed view](../../.claude/worktrees/add-diagram-design-adapter-v2.7.0/artifacts/reader-review-final/models/view.json),
  [canonical Draw.io](../../.claude/worktrees/add-diagram-design-adapter-v2.7.0/artifacts/reader-review-final/models/canonical.drawio).
  The model owns facts; `architecture-modeling` owns the canonical view/render;
  `diagram-design-presentation-adapter` owns the noncanonical presentation derivative.

| ID | Business task | Reviewer answer | QC score (0/1) |
| --- | --- | --- | --- |
| B01 | Who owns Store? | PENDING | PENDING |
| B02 | Who owns ERP? | PENDING | PENDING |
| B03 | Who owns the orders integration contract? | PENDING | PENDING |
| B04 | Which system captures orders? | PENDING | PENDING |
| B05 | Which system fulfils orders? | PENDING | PENDING |
| B06 | Where does the order flow originate? | PENDING | PENDING |
| B07 | Where does the order flow arrive? | PENDING | PENDING |
| B08 | Which boundary contains Store? | PENDING | PENDING |
| B09 | Which boundary contains ERP? | PENDING | PENDING |
| B10 | Does this view describe a baseline or target state? | PENDING | PENDING |

| ID | Engineering task | Reviewer answer | QC score (0/1) |
| --- | --- | --- | --- |
| E01 | What is the source system ID of orders? | PENDING | PENDING |
| E02 | What is its destination system ID? | PENDING | PENDING |
| E03 | Is the relationship directed or bidirectional? | PENDING | PENDING |
| E04 | Which protocol carries orders? | PENDING | PENDING |
| E05 | Is the interaction synchronous or asynchronous? | PENDING | PENDING |
| E06 | What is the declared failure policy? | PENDING | PENDING |
| E07 | What key must accompany a retry? | PENDING | PENDING |
| E08 | What data classification applies? | PENDING | PENDING |
| E09 | Who owns the integration contract? | PENDING | PENDING |
| E10 | How many systems participate in this view? | PENDING | PENDING |

| Review record | Business reviewer | Engineering reviewer |
| --- | --- | --- |
| Stable ID / representative role | PENDING | PENDING |
| UTC review time / independence confirmation | PENDING | PENDING |
| Canonical artifact identified (answer + QC verdict) | PENDING | PENDING |
| Derivative purpose identified (answer + QC verdict) | PENDING | PENDING |
| Canonical and derivative owners identified (answer + QC verdict) | PENDING | PENDING |
| Correct tasks out of 10 | NOT_MEASURED | NOT_MEASURED |
| Semantic contradictions / readability findings | NOT_MEASURED | NOT_MEASURED |

Pass only with **at least 18/20 correct tasks, 2/2 complete source-of-truth checks,
and zero semantic contradictions**. Current aggregate: NOT_MEASURED. QC must also
open the canonical Draw.io in a compatible viewer and record first-open readability;
automated canonical quality checks passed but do not replace that manual observation.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Accepted scope and trusted upstream hosts preserved", "No self-approval", "No deployment or publication from local checks"]
blocking_items: ["AC-007 independent reader evidence", "QC scan disposition and Draw.io first-open", "Required human closeout gates"]
owner: "qc"
next_action: "Collect reader evidence, resolve findings, then present final s08 for DoD and applicable Release/Business Acceptance review."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
```

The existing canonical renderer code and SA/TA schemas are unchanged. Adapter omission
retains the canonical path. Exact fallback restoration returns 42 skills, removes the
adapter and preserves unmanaged bytes/modes across all four supported targets. Rollback
readiness describes isolated evidence, not permission to modify a managed installation.

## Scan Summary
```yaml
status: PARTIAL
notes:
  - "Syntax PASS; manual static/security/performance review PASS after spec compliance."
  - "ESLint and Semgrep are unavailable; dedicated automated lint/SAST is SKIPPED. QC must accept the documented review path or request additional scans before DoD."
  - "Closed static templates, bounded inputs, no arbitrary URL fetch or invocation-time installation; browser context offline, JavaScript disabled, service workers blocked."
  - "No OS-wide network sandbox claim. Atomic output assumes a trusted single-writer destination parent."
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["Approved plan requires AC-007 reader verification, not a separate UAT gate."]
```

## Release Summary
```yaml
status: PARTIAL
reviewers: []
notes: ["Candidate remains unpublished", "DevOps and QC decisions pending", "No tag, push, merge, managed install or cleanup"]
```

## Business Acceptance Summary
```yaml
status: PARTIAL
reviewers: []
notes: ["PO decision pending independent reader evidence; no achieved readability metric claimed"]
```

## Audit
```yaml
audit_status: PARTIAL
notes: ["Automated evidence tied to exact final artifact", "Independent verification and human closeout still outstanding"]
```

## Definition of Done
```yaml
status: BLOCKED
residual_risks: ["Unmeasured reader comprehension", "Manual canonical first-open pending", "Dedicated SAST unavailable", "Hosted CI not run"]
owners: ["qc", "devops", "po"]
```

## Traceability
```yaml
upstream: ["CHANGE-005 BRD/SRS", "s04 AC-001..011", "s05 APPROACH-005-A", "s06 Amendment A1 T0-T9", "s07 implementation and review"]
next_step: "Independent reader review and QC disposition before human closeout gates; preserve branch/worktree."
```

## Handoff

Implementation and automated verification are ready for independent review. Overall
status remains PARTIAL/BLOCKED. Collect the two reviewer records above, resolve actual
findings, and only then finalize the gate artifact for human signatures. Do not treat
this report, local commits, tests or producer visual inspection as DoD or release approval.
