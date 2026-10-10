---
artifact_id: "code-factory-holistic-audit-remediation.s07.implementation"
artifact_family: workflow-step
work_item_slug: "code-factory-holistic-audit-remediation"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: RESEARCH
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
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["developer", "ba", "qc"]
review_mode: independent
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "code-factory-holistic-audit-remediation.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Master remains at s07 with six approved audit-only roots. M2/M3/M4 passed the human CF-MB1
> review pair; M5 handoffs and M6/M8 proposals retain explicit open decisions. M7 collection
> now covers 147 scored units and records AI language FAIL; applicable BA/QC review is pending.
> The latest M9 packet below owns the current review request. M10 final identity and M11 closure
> remain unopened. Historical 2.3.2/40 observations below were superseded by M2's 2.6.3/42 evidence.
> No child production, release, DoD or cleanup authority is inherited.

## Step Contract

```yaml
step: "s07 Implement"
goal: "Produce a complete, evidence-backed portfolio audit and independent remediation handoffs."
value: "Replace fragmented and potentially stale claims with one truthful closure ledger."
scope_in: ["M0..M11 audit-only outputs", "Six granted roots", "Read-only source/runtime/child evidence"]
scope_out: ["Production fixes", "Child lifecycle mutations", "Main commits", "Merge/publish/tag/install/cleanup"]
inputs_required: ["Approved s04", "Approved s05", "Approved s06", "Matching receipts", "Explicit Developer activation", "Pinned source/child/WIP"]
outputs_required: ["M0 baseline", "Five audit sidecars", "CF-MB1/2 ordered review evidence", "Final AC/finding closure evidence"]
done_when: ["Approved batch evidence complete", "All eleven ACs and original twenty findings have direct terminal evidence or authorized exceptions", "s08 QC Technical Verification and DoD remain separate"]
constraints:
  hard_constraints: ["Six audit-only roots", "Frozen hosts immutable", "No inferred child approval", "Unknown evidence preserved"]
  soft_constraints: ["Sequential evidence collection", "Use existing read-only tools"]
  prohibited_actions: ["Production edits", "Child activation", "CI parallelisation", "R-03 restructure", "Publish/tag/install/merge"]
  compliance_checks: ["Grant comparison", "Protected digest comparison", "Receipt subject checks", "Named evidence gaps"]
risks:
  - id: "M-RISK-01"
    description: "Mechanical success could mask semantic or runtime drift."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Separate inventory, mechanical, semantic, installed and hosted tiers."
    contingency: "Keep PARTIAL/FAIL rows and named next gate; never declare done."
    owner: "developer/qc"
    status: OPEN
timebox:
  target_duration: "One bounded evidence batch per admission/review boundary"
  deadline: ""
  escalation_rule: "Stop at CF-MB1/2 or missing authority; CR-008 retains its independent 2026-09-18 reassessment checkpoint."
```

## Input Readiness

```yaml
step: "s07 M0/M1"
status: READY
available_inputs: ["Four matching authoring receipts", "Explicit Developer activation", "Six exact grants", "Tracked master/main source", "RCR WIP digest"]
missing_inputs: []
invalid_inputs: []
conflicts: []
assumptions: ["M1 observations do not close M2/M10 semantics or identity"]
risk_level: HIGH
next_action: "Continue M2 full semantic and M3 direct lifecycle/document classification."
```

## Main Artifact

```yaml
recommended_design: "Evidence-led audit-only portfolio with independent remediation children."
implementation_mode: HARDENING
tasks_completed: ["M0 admission and protected snapshot", "M1 42-skill/eight-family inventory", "Bounded M2 25 canonical skills/25 EN refs/13 agents/3 scripts read", "M3 16 legacy entries and starter 27-document allowlist classified; full M3 not complete"]
bug_repro_evidence: ["M0 lifecycle activation consulted stale repo-root notes despite matching worktree gate receipts; anchor metadata corrected, no production fix."]
hypothesis_log:
  - { assumption: "Installed state differs from source.", status: CONFIRMED, evidence: "Both harnesses 2.3.2/40; source 2.6.1/42." }
debug_experiments:
  - { goal: "Verify canonical count", action: "Pinned git ls-tree/show and SHA-256", result: "42 unique skills; all SKILL.md bytes equal tracked main comparator." }
tdd_evidence: []
safe_refactor_notes: ["Documentation/research only; no behavior change or production refactor."]
code_changes: []
doc_changes: ["M0 baseline", "Five audit sidecars", "Current s01/report/s07 metadata", "66-file M2 source read log and 11 observations", "M3 exact legacy/current/historical/receipt classifications"]
config_changes: []
review_checkpoints: ["CF-MB1 after M2/M3/M4; QC Spec Compliance before Developer/QC Code Quality", "CF-MB2 later"]
outputs_actual: ["42 exact skill identities", "227 supporting file identities", "Eight surface families", "Manifest snapshots", "Both installed inventories", "Nine local discovery-root observations", "15-pair language sample scope"]
known_limitations: ["17 canonical skills and 44 operative English refs unread; cross-boundary M2 pending", "Full prior-plan/successor M3 and original twenty M4 dispositions pending", "No effective discovery trace", "No hosted/released identity observed", "No human language score"]
follow_up_items: ["Continue M2/M3/M4", "CF-MB1 ordered review pair", "Independent child dependencies"]
notes_for_testing: "Inventory assertions, UTF-8, protected hashes, standard workflow/planning/protocol and read-only pack tests. No whole-portfolio PASS/DoD."
```

## Delivery Rule Evidence

```yaml
behavior_change: NO
tdd_status: NOT_REQUIRED
tdd_test_refs: []
tdd_exception_reason: ""
tdd_alternative_verify_path: ["Inventory JSON/count/digest assertions", "Standard artifact validators", "UTF-8 and diff checks"]
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs: ["/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/code-factory-holistic-audit-remediation"]
worktree_reason: "Multi-session portfolio with concurrent root/RCR ownership."
review_status: PARTIAL
review_refs: ["Approved s06 CF-MB1 and CF-MB2"]
spec_compliance_status: NOT_RUN
code_quality_status: NOT_RUN
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "No merge/finalization in s07; HOLD_OPEN until valid DoD and separate authority."
verify_path: ["M2 mechanical/semantic evidence", "CF-MB1/2", "M11 final criteria/identity/encoding"]
```

## Implementation Notes

```yaml
worktree_target: "code-factory-holistic-audit-remediation"
planning_track: full
risk_signals: ["Multi-session", "Concurrent root/RCR ownership", "Cross-boundary release evidence"]
worktree_decision: REQUIRED
decision_reason: ["Existing isolated in-repo worktree preserves unrelated owner changes."]
isolation_strategy:
  branch_name: "codex/code-factory-holistic-audit-remediation"
  worktree_path: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/code-factory-holistic-audit-remediation"
  owned_paths: ["work-items/code-factory-holistic-audit-remediation","docs/audits/code-factory-holistic-inventory.json","docs/audits/code-factory-holistic-coverage-matrix.md","docs/audits/code-factory-holistic-finding-disposition.md","docs/audits/code-factory-holistic-legacy-document-classification.md","docs/audits/code-factory-holistic-language-review.md"]
  expected_duration: "Multiple governed evidence/review sessions"
execution_guards: ["Do not modify five frozen hosts", "No production or child write from master authority", "RCR partial T7 WIP remains unchanged"]
skip_reason: ""
cleanup_preconditions: ["QC Technical Verification", "QC DoD", "No open blocking finding", "Separate branch finalization authority"]
notes_for_implementation: "Generated empty sidecar files created by activation capability materialization were populated only after ACTIVE."
```

```yaml
review_target: "M0..M4 audit snapshot"
planning_track: full
review_mode: INDEPENDENT
review_order: [SPEC_COMPLIANCE, CODE_QUALITY]
review_batches:
  - { batch: "CF-MB1", scope: ["M0", "M1", "M2", "M3", "M4"], trigger: "Completed evidence/classification/disposition snapshot", reviewer_role: "qc then developer/qc" }
  - { batch: "CF-MB2", scope: ["M5", "M6", "M7", "M8", "M9"], trigger: "Completed handoff/language snapshot", reviewer_role: "qc with applicable BA evidence then developer/qc" }
required_checks:
  spec_compliance: ["All approved coverage and evidence-tier constraints", "No child authority inheritance"]
  code_quality: ["Evidence fidelity", "Stable identities", "No concealed gap"]
finding_policy:
  blocker_threshold: "Any authority drift, silent evidence loss or incomplete required coverage blocks next batch."
  reopen_conditions: ["New contradictory direct evidence", "Changed bound source/artifact"]
handoff_to_verify: ["M10 direct integrated identity", "M11 explicit QC s08 opening and final checks"]
notes_for_implementation_or_verify: "AI recommendations never fabricate independent human verdicts."
```

## Admission and Identity Evidence

[portfolio-m0-baseline.json](portfolio-m0-baseline.json) records protected digests, actual root/main/master/RCR identities and WIP file/diff hashes. Source inventory is pinned to `5b85d7f943fff4fc9e0f559faed43e79f9483b12`; main comparator is `2e3aaded1779787d993b7e5cacc96bfae008b3bc`. This is an unmerged audit worktree, not a claim of clean installed/released parity.

## Bounded Artifact Verification

```yaml
scope: "M0/M1 inventory, bounded M2 25-skill reads and partial M3 classifications; not final portfolio verification"
checks:
  - { id: "workflow", result: PASS, evidence: "181 naming files / 177 governance notes" }
  - { id: "protocol", result: PASS, evidence: "9 managed / 16 legacy; ACTIVE with six roots" }
  - { id: "planning", result: PASS, evidence: "177 notes" }
  - { id: "inventory", result: PASS, evidence: "JSON.parse; 42 unique names/paths/full source SHA-256; 227 supporting files; 8 families; installed 2.3.2/40 x2" }
  - { id: "encoding", result: PASS, evidence: "Initial nine admission artifacts and current five M2/M3 changed artifacts pass fatal UTF-8 decode; git diff --check PASS." }
  - { id: "M2-read-log", result: PASS, evidence: "66 unique source paths/hashes; 25 SKILL.md and 25 operative EN refs; remaining 17 skill rows retain NOT_REVIEWED." }
  - { id: "M3-legacy", result: PASS, evidence: "16 unique legacy rows: 8 LEGACY_CLOSED, 1 actionable, 7 ambiguous; 0 empty-invalid; no retrospective receipt." }
  - { id: "targeted-tests", result: PASS, evidence: "Existing architecture-role-skills-contract.test.js and architecture-modeling-drawio.test.js PASS; in-memory off-canvas diagnostic exposes missing automated geometry coverage." }
  - { id: "protected", result: PASS, evidence: "Five protected master digests match baseline; RCR source and quarantined T7 file/diff digests unchanged" }
pending: ["Full semantic M2", "M3/M4", "CF-MB1/2", "Independent child verification/security/language", "M10 exact integrated identity", "M11 s08/DoD"]
skipped_checks: ["Full unit/build/hosted/security execution not part of this docs-only bounded audit delta; independently required child/final checks remain pending, not waived."]
```

## Pack Audit (Admission/Inventory Scope)

```yaml
audit_scope: "Read-only mechanical baseline and admission/inventory artifact consistency; full M2 semantic audit in progress"
checks:
  - { id: "mechanical", status: PASS, evidence: "WORKFLOW_PACK_AUDIT=PASS; 166 resolved cross-references" }
  - { id: "SA-TA-contract", status: PASS, evidence: "architecture-role-skills-contract.test.js PASS" }
  - { id: "artifact-template", status: PASS, evidence: "Standard s07 Step Contract/Main Artifact/Implementation Notes/Delivery Rule Evidence retained" }
  - { id: "semantic-completeness", status: WARN, evidence: "25 canonical skill reads, 25 EN refs, 13 agent metadata, 3 scripts; full cross-boundary M2 and remaining 17 skills/44 refs pending. Known semantic observations retain FAIL/PARTIAL." }
findings:
  - { severity: MEDIUM, area: SKILL, path: "skills/analysis/sa/references/landscape-quality-bar.md", issue: "Pack availability claim conflicts with canonical source", recommendation: "M4 bounded capability-wording proposal; keep installed/released tiers distinct" }
  - { severity: MEDIUM, area: SCRIPT, path: "skills/architecture/architecture-modeling/scripts/drawio-layout.js", issue: "12 cross-domain route diagnostic admits 8 off-canvas points while automated PASS", recommendation: "Bounded negative fixture/layout-canvas repair in independent owner scope" }
  - { severity: MEDIUM, area: SKILL, path: "skills/guardrails/artifact-governance/SKILL.md", issue: "Blanket machine enforcement not-built wording is stale", recommendation: "Evidence-bound enforcement matrix and source wording proposal" }
overall_status: FAIL
follow_up_actions: ["Finish M2 full semantic coverage", "Disposition M2 observations at M4", "No green mechanical audit clears installed/source drift"]
notes: "Mechanical baseline remains PASS; current source semantic observations include FAIL. This is an AI evidence assessment, not a human CF-MB1 verdict or DoD. M2/M3/M4 remain incomplete."
```

## Traceability

```yaml
upstream: ["Approved s04 SHA-256 41078181e9b0e8186c900b8d1908ca9f52820d6b763b37467681325edc389f29", "Approved s05", "Approved s06", "Explicit Developer activation 2026-09-12T07:45:40.860Z"]
outputs: ["portfolio-m0-baseline.json", "Five audit sidecars"]
next_step: "M2/M3/M4; CF-MB1 only after complete snapshot"
```

## Handoff

- Master ACTIVE at s07; six audit-only roots, no missing authoring gate.
- M0/M1 complete. M2 has 25/42 main skill reads and 25/69 operative EN reference reads; 17 skills/44 refs plus cross-boundary contracts remain. Known semantic observations are not cleared by mechanical PASS.
- M3: 16/16 legacy classified (8 LEGACY_CLOSED, 1 actionable, 7 ambiguous); 27-document starter allowlist and eight managed DoD + eight terminal receipts checked. Full prior-plan/navigation/child state coverage remains.
- Canonical architecture-modeling is the tracked 7697-byte source with three Draw.io scripts and agents/openai.yaml. The reported local 18KB duplicate is absent from current observed roots; historical provenance and effective precedence are unresolved.
- Both harnesses lack architecture-modeling/artifact-governance and differ from source in codex-workflow-chain/sa/ta. Independent release/installation evidence remains required.
- No child source was edited by master authority. RCR and deadline-bound Node24 stay in their independent governed lanes.

## Continued M2/M3 Evidence — 2026-09-13

A zero-write representative-model diagnostic with twelve distinct cross-domain relationships returns automated PASS while eight route points are outside the computed canvas (min_y=-40). Existing Draw.io and SA/TA contract tests still pass; QC first-open is not claimed. All 66 source read-log identities match the pinned audit SHA.

M3 has eight historical LEGACY_CLOSED, one actionable and seven ambiguous entries. Eight historical managed DoD receipts and eight applicable Release/Business Acceptance receipts match their exact s08 hosts. Current-facing documentation can be stale even when those receipts are valid; no terminal receipt is revoked or fabricated.

RCR remains independently BLOCKED at RCR-SB1 Code Quality: QC Spec Compliance for source 964e1c7cf879c6d244253b3ee294f9cdaff60f77 is retained, proposed F-RCR-SB1-001/FAIL and TS2a repair authority remain human-pending. 'Continue' does not approve that verdict or open TS3. No RCR or Node24 production file is edited here.

## Prioritized Detailed Execution Plan — 2026-09-14

> [!info] Current supporting execution view
> This section and [portfolio-execution-plan.json](portfolio-execution-plan.json) expand the existing approved portfolio plan. They do not replace the frozen [s06 Task Plan](code-factory-holistic-audit-remediation.s06.task-breakdown.md), change any gate or authorize a new child. The user explicitly requested CR-008 first. Earlier dated s07 paragraphs are historical observations; current child status is the exact snapshot below.

### 1. Goal, priority and authority

Deliver a coherent, secure and usable Code-Factory pack: one authoritative workflow, applicable-role interaction, natural EN/VI language, truthful lifecycle state, complete skill semantics and exact source/release/installed identity. Audit first, fix through bounded independently governed children, and prove the outcome rather than equating green mechanical checks with quality.

- Priority 1: finish existing CR-008 child/parent closure; do not reopen optional backlog or start another production rewrite.
- Priority 2: finish master semantic/classification/triage evidence and existing adapter/test residuals after CR-008.
- Priority 3: P1 security, semantic standard-path and legacy/authority fixes; then P2 language and current documentation.
- Priority 4: explicit P3 optional-capability dispositions, followed by P4 integrated/released/installed proof and portfolio DoD.
- Deadline exception: the independent Node24 token-only lane must not wait indefinitely for CR-008. Its own readiness receipts and activation remain required.

Master router: `s07 / ACTIVE / brownfield / Missing Gates: NONE` for audit-only authoring, with the same six grants. Next artifact: this supporting plan; no new human gate is needed just to document it. Child fixes, amended applicability, reviews and external actions are not covered by master approval.

CR-008 child router: `s08 / BLOCKED / brownfield`. Missing control: trusted child DoD receipt and a valid shared s08-host boundary. Next human action: Maintainer/QC choose an explicit applicability disposition; do not ask for the same already approved QC DoD again.

### 2. Evidence-backed snapshot, not a new completion claim

| Subject | Observed snapshot | Remaining proof |
|---|---|---|
| Master worktree | 84713be9e95da3c6192034e57e4eddf41c78c5ba; ACTIVE/s07; six audit-only roots | CF-MB1/CF-MB2 and final DoD not passed |
| CR-008 worktree | 832f449cd5012d661b5e5636d801709d7db9ac35; child protocol VERIFIED/s08 | Child receipt, corrected parent verification and new terminal authority |
| M0/M1 | Admission and 42/42 inventory; 227 supporting files, eight surface families, seven skill groups | Effective precedence trace and final recount |
| M2 | 25/42 canonical skill reads; 25/69 operative EN reference reads; 66 read-log paths | 17 skills, 44 references and cross-boundary contracts; reads are not semantic PASS |
| M3 | 16/16 legacy classifications: eight historical closed, one actionable, seven ambiguous; 27-document starter allowlist | Prior-plan/successor/navigation and full managed-state reconciliation |
| Findings/language | Original CF-001..020; eleven existing M2 observations | Complete M4 dispositions and actual BA/QC rubric evidence |
| Child verification | 9/10 AC PASS; QC Technical Verification and child DoD human approval recorded | AC-RCR-08 parent contribution mandatory; DoD receipt MISSING, host draft |
| Installed runtime | Historical M0/M1 observation: Codex and Claude 2.3.2/40, source snapshot 2.6.1/42 | Fresh actual released/installed parity; no install performed |

Pinned master semantic source: `5b85d7f943fff4fc9e0f559faed43e79f9483b12`; comparator: `2e3aaded1779787d993b7e5cacc96bfae008b3bc`. These are audit snapshots, not current main or release identities. Recount and hash a new snapshot whenever integration changes the inventory.

### 3. CR-008 critical path — execute this lane first

Current exact candidate and rollback must remain explicit:

- Hosted source: `af70276fe14317417365c06dd06186da1996c401`.
- Required hosted run: [34802149041](https://github.com/haonh87/Code-Factory/actions/runs/34802149041); recorded 10/10 required jobs PASS.
- Candidate package SHA-256: `af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f`.
- Retained rollback v2.6.1 SHA-256: `7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9`.
- Recorded local/hosted source checks: supported Node18/22, 45 source files and 64 failure/crash-boundary cases; extracted artifact and retained rollback 4/4 each. These are existing evidence, not tests newly run for this documentation update.
- Scan remains PARTIAL: missing automated ESLint/typecheck/Semgrep, no benchmark/native-reader isolation claim. Parent F-AG11-001 remains OPEN.

The frozen child AC-RCR-08 sequence is child Technical Verification/valid DoD first, then full parent AG verification and new parent terminal gates. However, PO-approved s02 also requires parent AG proof before new terminal decisions and says not to reduce independent human decisions. This is a real locked sequencing/scope conflict, not merely missing review text. Only an explicit human-approved scope clarification/amendment may resolve it; neither sequence is silently overridden and historical parent approval is not current authority.

#### CR1 — Confirm existing child DoD decision and receipt boundary

Owner: qc/maintainer. Depends on: none. Current status: CONFIRMED_BLOCKER.
Paths: `work-items/closeout-bundle-repeat-cycle-reconciliation` in the CR-008 worktree, not the master.

- QC human DoD APPROVED retained; trusted receipt MISSING; actual host draft
- Shared s08 finalized-host requires dod/release/business_acceptance
- Verify: Read exact evidence and wfc gate status; never sign or finalize a hypothetical host.
- Authority guard: Read-only diagnosis allowed; no new human finding inferred.
- Active effort estimate: 0–1 hours; waiting for reviewers/services excluded.

#### CR2 — Obtain explicit checkpoint-scope and applicability decision

Owner: PO/BA/Developer/QC. Depends on: CR1. Current status: WAITING_HUMAN_DECISION.
Paths: `work-items/closeout-bundle-repeat-cycle-reconciliation` in the CR-008 worktree, not the master.

- Explicitly decide the PO-approved Business Goal/non-goal and frozen AC-RCR-08 sequencing impact; Option A is not approval-ready under current locked sequencing.
- Option B remains recommended, not approved: child technical checkpoint first, full parent Release/Business Acceptance still mandatory.
- Preserve AC-RCR-08 parent verification and separate parent Release/BA
- Verify: Read the RCR shared-host decision packet, locked s02 success/non-goal and s04 AC-RCR-08; obtain explicit PO/BA/Developer/QC scope decision before any amendment. No automatic waiver.
- Authority guard: Option B recommendation is proposed, not approved; latest priority request is not an applicability amendment.
- Active effort estimate: 1–2 hours; waiting for reviewers/services excluded.

#### CR3 — Prepare only explicitly approved authoring rebinds

Owner: developer/ba/qc. Depends on: CR2. Current status: NOT_AUTHORIZED_YET.
Paths: `work-items/closeout-bundle-repeat-cycle-reconciliation` in the CR-008 worktree, not the master.

- Proven five-receipt impact: Spec BA, Contract Developer, DoR BA/QC, Approach Developer, Task Plan Developer; immutable old approvals retained as history.
- Scope-approved checkpoint/applicability authoring amendment only if Option B accepted; no production/candidate drift.
- Verify: All five current authoring receipts are whole-host digest-bound and become stale after the proposed metadata edit. Review actual amended bytes and renew all five bindings; preview hashes are not final approvals. Preserve the existing qualified QC DoD decision.
- Authority guard: Execute amendments only after explicit approval; no change to frozen hosts now.
- Active effort estimate: 1–3 hours; waiting for reviewers/services excluded.

#### CR4 — Seal valid child technical-checkpoint DoD without premature DONE

Owner: qc. Depends on: CR3. Current status: BLOCKED_RECEIPT.
Paths: `work-items/closeout-bundle-repeat-cycle-reconciliation` in the CR-008 worktree, not the master.

- Trusted QC DoD bound to valid finalized child host
- Consistent child report/s01/s07/s08 authority; checkpoint receipt is not protocol DONE while mandatory AC-RCR-08 parent contribution remains incomplete.
- Verify: Interactive human-controlled signer only; verify receipt digest/subject/role, scope cleanliness and protocol validation.
- Authority guard: Existing QC DoD decision retained; changed reviewed content may require explicit amended binding. No fake TTY/passphrase/receipt.
- Active effort estimate: 1–2 hours; waiting for reviewers/services excluded.

#### CR5 — Reconcile parent child-progress projection

Owner: developer/qc. Depends on: CR4. Current status: WAITING_CHILD_VALID_DOD.
Paths: `work-items/adaptive-governance-human-approval-ux`, `work-items/closeout-bundle-repeat-cycle-reconciliation` in the CR-008 worktree, not the master.

- Parent no longer claims current child waits at s04
- Exact source/run/package and mandatory F-AG11-001 OPEN linked with preserved history
- Verify: Update owned structured state by field/id/kind, never parse prose; preserve unknown legacy strings verbatim and historical events.
- Authority guard: Use existing owned parent roots only after child's valid gate boundary; do not clear unrelated blockers.
- Active effort estimate: 1–2 hours; waiting for reviewers/services excluded.

#### CR6 — Run full exact-candidate parent AG verification

Owner: qc. Depends on: CR5. Current status: NOT_RUN_FOR_CORRECTED_PARENT.
Paths: `work-items/adaptive-governance-human-approval-ux` in the CR-008 worktree, not the master.

- AG-01..AG-13=13/13 PASS or explicit failures against the exact corrected package
- Supported Node18/22 child/source/artifact/rollback lineage and parent coverage; source payload provenance
- Verify: Consume retained af49 package, not a fresh repack; compare checksum and source/run binding. Existing 10/10 hosted child checks are not new parent 13/13 proof.
- Authority guard: AC-RCR-08 requires valid child DoD first. New code/payload change requires its own approved review and candidate evidence.
- Active effort estimate: 3–6 hours; waiting for reviewers/services excluded.

#### CR7 — Obtain fresh parent terminal decisions and receipts

Owner: qc/devops/po. Depends on: CR6. Current status: WAITING_NEW_PARENT_EVIDENCE.
Paths: `work-items/adaptive-governance-human-approval-ux` in the CR-008 worktree, not the master.

- Parent artifact binding if changed, QC Technical Verification -> QC DoD -> DevOps/QC Release -> PO Business Acceptance
- Each receipt binds its actual unchanged reviewed host and exact candidate
- Verify: Review source/run/full digest, roles, timestamps and host hashes; historical 38bb0d... approvals remain historical.
- Authority guard: Independent gates; no inherited child approval, premature parent release, publishing or tag creation.
- Active effort estimate: 1–3 hours; waiting for reviewers/services excluded.

#### CR8 — Close finding/CR ledger and hand off finalization

Owner: developer/qc/maintainer. Depends on: CR7. Current status: WAITING_FULL_CHAIN.
Paths: `work-items/adaptive-governance-human-approval-ux`, `work-items/closeout-bundle-repeat-cycle-reconciliation` in the CR-008 worktree, not the master.

- F-AG11-001 terminal only after complete exact-candidate chain
- Parent/child protocol closure and CR contribution agree; branch readiness decision backed by current DoD
- Verify: Validate notes/reports/receipts/CR contribution and original AC coverage; retain scan gaps and unknown blockers. Check worktree and open findings.
- Authority guard: Actual merge/push/publish/tag/global install/cleanup require separately scoped authority; readiness is not execution permission.
- Active effort estimate: 1–2 hours; waiting for reviewers/services excluded.

#### Shared-host decision recommendation — not yet approved

| Option | Effect | Required authority / consequence |
|---|---|---|
| A — not approval-ready | Keep child Release and Business Acceptance required | HOLD review drafts exist, but locked s02 requires parent AG proof before new terminal decisions and frozen AC-RCR-08 requires valid child DoD first. Human scope clarification is still required; do not approve early child Release/BA. |
| B — recommended, not approved | Separate this correction child's technical checkpoint from mandatory parent delivery | Explicit PO/BA/Developer/QC scope decision includes the PO-approved non-goal impact. After actual authoring amendment, renew all five affected receipt bindings. Existing QC DoD decision and full AC-RCR-08 remain; no automatic protocol DONE. |

Do not solve the boundary by setting status to final without the missing required reviews, inventing reviewer timestamps, changing runtime validators, broad waivers or non-interactive signing. The before/after host preview and receipt-impact matrix are now materialized in the RCR worktree's `rcr-ts8-shared-host-decision.json`: all five authoring receipts are actually affected. If Option B is selected, obtain reviews of the actual amended hosts, not preview hashes. An unchanged production payload does not imply that a changed signed host can reuse its old receipt.

CR-008 technical completion requires CR4–CR8, a full current child/parent evidence chain and truthful finding closure. Branch readiness, actual merge, public release/tag and activation are separate observable outcomes; this plan does not authorize those mutations.

### 4. Independent Node24 deadline guard

Branch count confirmed read-only on 2026-09-14: nine checkout references plus nine setup-node references, all still @v4; release-candidate-build keeps fetch-depth: 0. No action version was edited.

GitHub's updated [Node20 runner deprecation notice](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/) schedules removal for 2026-09-23. Approved targets are published as [checkout v7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1) and [setup-node v7.0.0](https://github.com/actions/setup-node/releases/tag/v7.0.0). Target availability was checked; all v5/v6/v7 breaking changes still require an explicit implementation preflight.

1. Verify the independent upgrade-guardrails-actions-node24 readiness receipts and activation; master approval is not that authority.
2. Read both actions' v5/v6/v7 notes; check minimum runner/OS, fetch/submodules, credential persistence and cache behavior.
3. Create one workflow-only commit changing exactly the 18 action-version tokens. Mask versions and assert normalized before/after content identical; retain fetch-depth: 0.
4. Run one full hosted workflow and inspect every job check-run annotation for zero Node runtime deprecation annotations. A green conclusion alone is insufficient.
5. If CR-008 is still not integrated near 2026-09-20, escalate the owner's independent main contingency for explicit execution authority; do not commit/cherry-pick to main automatically.

Estimated active effort: 2–4 hours plus hosted/reviewer turnaround. Validator parallelisation belongs to ci-guardrails-parallelisation; R-03 restructure stays deferred. Neither is included here.

### 5. Master M0–M11 executable breakdown

The following task-breakdown-planner schema is a supporting view of the already approved s06, not a fresh Task Plan receipt. All paths in this block are relative to the master worktree. Status and effort fields are proposed operational annotations; no required acceptance criterion is added or removed.

```yaml
implementation_goal: "Complete the whole Code-Factory audit/remediation goal, prioritizing CR-008 closure; coordinate independently governed child fixes and final identity/language/security evidence, not a monolithic rewrite."
ba_lane:
  acceptance_coverage:
    -
      ac: "AC-CF-001"
      tasks: ["M1","M2","M10","M11"]
    -
      ac: "AC-CF-002"
      tasks: ["M3","M4","M9","M11"]
    -
      ac: "AC-CF-003"
      tasks: ["M4","M5","M6","M8","M9"]
    -
      ac: "AC-CF-004"
      tasks: ["M0","M4","M5","M9","M11"]
    -
      ac: "AC-CF-005"
      tasks: ["M5","M10","M11"]
    -
      ac: "AC-CF-006"
      tasks: ["M2","M6","M9","M11"]
    -
      ac: "AC-CF-007"
      tasks: ["M7","M9","M11"]
    -
      ac: "AC-CF-008"
      tasks: ["M3","M4","M9","M11"]
    -
      ac: "AC-CF-009"
      tasks: ["M5","M10","M11"]
    -
      ac: "AC-CF-010"
      tasks: ["M2","M5","M9","M11"]
    -
      ac: "AC-CF-011"
      tasks: ["M3","M7","M10","M11"]
  scope_guards: ["Six master audit-only roots retained; frozen master and child authoring hosts unchanged in this plan","Existing child execution remains governed by its own approval and grants","Unknown legacy text preserved exactly; never cleared by prose inference","CR-008 AC-RCR-06 atomicity and AC-RCR-08 full parent verification are not cut","AI recommendations and scores are not human gate verdicts"]
  human_review_points: ["CR2 explicit owner/applicability decision","CF-MB1 QC Spec Compliance then Developer/QC Code Quality","CF-MB2 QC Spec Compliance with applicable BA language evidence then Developer/QC Code Quality","Separate child materialization/readiness/review/verification/terminal receipts","Master QC s08 opening, Technical Verification and DoD; external mutation authority remains separate"]
dev_lane:
  path_map:
    -
      path: "work-items/code-factory-holistic-audit-remediation"
      permission: "Existing approved audit-only root; frozen hosts protected"
    -
      path: "docs/audits/code-factory-holistic-inventory.json"
      permission: "Existing approved audit-only root; frozen hosts protected"
    -
      path: "docs/audits/code-factory-holistic-coverage-matrix.md"
      permission: "Existing approved audit-only root; frozen hosts protected"
    -
      path: "docs/audits/code-factory-holistic-finding-disposition.md"
      permission: "Existing approved audit-only root; frozen hosts protected"
    -
      path: "docs/audits/code-factory-holistic-legacy-document-classification.md"
      permission: "Existing approved audit-only root; frozen hosts protected"
    -
      path: "docs/audits/code-factory-holistic-language-review.md"
      permission: "Existing approved audit-only root; frozen hosts protected"
  technical_sequence: ["CR1","CR2","CR3","CR4","CR5","CR6","CR7","CR8","M2","M3","M4","CF-MB1","M5","M6","M7","M8","M9","CF-MB2","M10","M11"]
  tdd_targets: ["Master plan documentation: not applicable; UTF-8/schema/links/dependency/hash checks instead","Behavior-changing children: named fail-first regression -> minimal change -> pass; verify standard-path execution","Legacy unknown blocker containing review/outstanding must survive; transaction_id is a required event field for approval transactions, not optional prose"]
task_breakdown:
  -
    id: "M0"
    owner_role: "developer"
    name: "Preserve admission and frozen baselines"
    objective: "Confirm master execution grants and preserve approved artifacts and concurrent ownership."
    paths_in_scope: ["work-items/code-factory-holistic-audit-remediation"]
    dependencies: []
    outputs_expected: ["Four current authoring receipts with matching digests","Six audit-only write roots and protected digest snapshot"]
    review_checkpoint: "Existing explicit activation retained; no new approval inferred."
    verification_hint: "Read wfc gate status for spec/dor/approach/task_plan; compare protected hashes and Git status."
    status: "COMPLETE_OBSERVED"
    remaining_effort_hours: [0,1]
    authority: "master audit-only; external child execution is not granted by this task"
  -
    id: "M1"
    owner_role: "developer"
    name: "Refresh full inventory and effective resolution"
    objective: "Maintain a pinned inventory for source, overlays and installed harnesses without conflating tiers."
    paths_in_scope: ["docs/audits/code-factory-holistic-inventory.json","work-items/code-factory-holistic-audit-remediation"]
    dependencies: ["M0"]
    outputs_expected: ["42 unique canonical skill rows and eight surface families on the approved snapshot","Separately attributed Codex/Claude/local overrides, manifests and resolution evidence"]
    review_checkpoint: "Overlay discovery never authorizes deletion; installed observations are not release proof."
    verification_hint: "Match pinned git ls-tree and inventory hashes; recount each new snapshot; record unknown discovery precedence explicitly."
    status: "INVENTORY_COMPLETE_RESOLUTION_PENDING"
    remaining_effort_hours: [2,4]
    authority: "master audit-only; external child execution is not granted by this task"
  -
    id: "M2"
    owner_role: "developer"
    name: "Finish full skill and cross-boundary semantic review"
    objective: "Complete unread source contracts and explain all authority/schema/trigger conflicts."
    paths_in_scope: ["docs/audits/code-factory-holistic-inventory.json","docs/audits/code-factory-holistic-coverage-matrix.md"]
    dependencies: ["M1"]
    outputs_expected: ["Remaining 17 SKILL.md and 44 operative EN references reviewed against the recorded 25/42 and 25/69 baseline","Authority/router/backbone/runtime/validator/adapter/hook/MCP/CI contract rows","Every canonical skill has trigger, boundary, input/output, schema, references, language/role and discovery evidence"]
    review_checkpoint: "Read-only master audit; semantic FAIL remains blocking even if pack-audit passes."
    verification_hint: "Match every row to pinned source digest; run existing mechanical audit and role contract tests; reject unread rows at M2 completion."
    status: "IN_PROGRESS"
    remaining_effort_hours: [12,20]
    authority: "master audit-only; external child execution is not granted by this task"
  -
    id: "M3"
    owner_role: "ba"
    name: "Complete prior-plan, lifecycle and document classifications"
    objective: "Remove ambiguity from authority and CURRENT/HISTORICAL claims without retroactive approvals."
    paths_in_scope: ["docs/audits/code-factory-holistic-legacy-document-classification.md"]
    dependencies: ["M1"]
    outputs_expected: ["Extend the 16/16 legacy classifications and 27-document starter allowlist to all prior authorities and current entry paths","Resolve or explicitly route seven ambiguous and one actionable legacy entries","Replacement/navigation proposals and separately labeled stale child projections"]
    review_checkpoint: "No retrospective receipts, bulk unignore, WIP cleanup or source-doc corrections from master authority."
    verification_hint: "Inspect direct notes/reports/receipts/Git evidence; each input has one classification and traceable successor or named gap."
    status: "PARTIAL"
    remaining_effort_hours: [6,10]
    authority: "master audit-only; external child execution is not granted by this task"
  -
    id: "M4"
    owner_role: "developer"
    name: "Give every finding an executable disposition"
    objective: "Map CF-001..020 and accepted fresh findings to owners, evidence tiers and bounded closure contracts."
    paths_in_scope: ["docs/audits/code-factory-holistic-finding-disposition.md","docs/audits/code-factory-holistic-coverage-matrix.md"]
    dependencies: ["M2","M3"]
    outputs_expected: ["Twenty exact original IDs with severity, owner, dependency, child/proposal, next gate and closure evidence","Eleven existing M2 observations reviewed and deduplicated; fresh observations remain proposals until accepted","R-01/R-03 revalidation and unavailable R-02/R-04/R-06 recovery log"]
    review_checkpoint: "CF-MB1: human QC Spec Compliance before human Developer/QC Code Quality; neither verdict inferred."
    verification_hint: "Check unique original IDs, ownerless count=0, full source identities and direct terminal proof; unavailable external findings are not invented."
    status: "PENDING_FULL_DISPOSITION"
    remaining_effort_hours: [4,8]
    authority: "master audit-only; external child execution is not granted by this task"
  -
    id: "M5"
    owner_role: "developer"
    name: "Coordinate existing P0 and deadline lanes"
    objective: "Reuse CR-008/RCR, SA/TA, adapter/test and independent Node24 lanes instead of duplicating children."
    paths_in_scope: ["docs/audits/code-factory-holistic-finding-disposition.md","docs/audits/code-factory-holistic-coverage-matrix.md"]
    dependencies: ["M4","CF-MB1_SPEC_PASS","CF-MB1_QUALITY_PASS"]
    outputs_expected: ["RCR child -> exact-candidate parent re-verification -> CR-008 terminal evidence","Reuse branch-complete SA/TA child as integration-pending evidence","Adapter and two-tree-test residual next gates","Independent 18-token action upgrade with explicit contingency"]
    review_checkpoint: "Master reads children only. Existing independently approved CR-008 execution can proceed now without waiting for CF-MB1."
    verification_hint: "Inspect each child's actual report and current receipt digest; verify 9+9 action references and fetch-depth: 0 on CR-008 branch."
    status: "PENDING_MASTER_REVIEW_GATE"
    remaining_effort_hours: [2,4]
    authority: "master audit-only; external child execution is not granted by this task"
  -
    id: "M6"
    owner_role: "developer"
    name: "Draft bounded P1/P2 child proposals"
    objective: "Specify missing security, semantic-audit, legacy/authority and language/docs changes in independent child briefs."
    paths_in_scope: ["docs/audits/code-factory-holistic-finding-disposition.md"]
    dependencies: ["M5"]
    outputs_expected: ["Concrete proposal boundaries, upstream CF/AC IDs, applicability reasons, verifier and rollback","Security provenance/ephemeral-scan plan without automatic external scanner execution","Standard-path negative-fixture registration and truthful legacy/doc update proposals"]
    review_checkpoint: "Separate human materialization and every required child gate before touching child artifacts or source."
    verification_hint: "Compare existing ownership first; disjoint paths; measurable RED/GREEN and closure evidence; no duplicated children or hidden parallelisation."
    status: "NOT_STARTED"
    remaining_effort_hours: [4,8]
    authority: "master audit-only; external child execution is not granted by this task"
  -
    id: "M7"
    owner_role: "ba"
    name: "Measure language and interaction quality"
    objective: "Review public EN/VI usability independently of UTF-8 and mechanical PASS."
    paths_in_scope: ["docs/audits/code-factory-holistic-language-review.md","docs/audits/code-factory-holistic-coverage-matrix.md"]
    dependencies: ["M2","M3"]
    outputs_expected: ["100% mandatory entry/approval/error/status surfaces reviewed","Deterministic sample min(n,max(2,ceil(n/4))) per skill group, at least 15 EN/VI pairs across seven approved groups","Five dimension scores, critical authority/action check and applicable BA/QC review"]
    review_checkpoint: "AI scores are proposals; BA owns language judgment, QC verifies evidence; no all-role confirmation by default."
    verification_hint: "Zero critical failures; mean >=4.0/5; no reviewed dimension <3.0/5; missing translations count as gaps; recompute sampling and aggregates."
    status: "NOT_STARTED"
    remaining_effort_hours: [10,16]
    authority: "master audit-only; external child execution is not granted by this task"
  -
    id: "M8"
    owner_role: "ba"
    name: "Resolve optional backlog by explicit decisions"
    objective: "Disposition memory, metrics and Rationalizations without reopening completed trials or inventing sponsorship."
    paths_in_scope: ["docs/audits/code-factory-holistic-finding-disposition.md"]
    dependencies: ["M3","M4"]
    outputs_expected: ["CF-013 reduced-contract/split/retirement brief","CF-014 sponsored experiment or explicit retirement brief","CF-015 one-skill pilot or supersession brief"]
    review_checkpoint: "PO/Maintainer or named original owner decides independently; undecided proposal is not terminal closure."
    verification_hint: "Compare original authority and completed evidence; no unvalidated metrics in people/delivery gates; accepted retirement retains history."
    status: "NOT_STARTED"
    remaining_effort_hours: [2,4]
    authority: "master audit-only; external child execution is not granted by this task"
  -
    id: "M9"
    owner_role: "qc"
    name: "Review handoffs and maintain closure ledger"
    objective: "Create a reviewed portfolio snapshot linking actual child review/verification and language evidence."
    paths_in_scope: ["work-items/code-factory-holistic-audit-remediation","docs/audits/code-factory-holistic-coverage-matrix.md","docs/audits/code-factory-holistic-finding-disposition.md"]
    dependencies: ["M5","M6","M7","M8"]
    outputs_expected: ["CF-MB2 Spec Compliance packet with applicable BA language evidence","Separately opened Developer/QC Code Quality packet","Ledger of child source/run/digest/receipt/RED-GREEN/standard-path security/language evidence"]
    review_checkpoint: "CF-MB2: QC Spec Compliance first, then Developer/QC Code Quality; handoff review is not final remediation completion."
    verification_hint: "Hash reviewed audit artifacts; compare subject/reviewer/source tier; no branch-DONE shortcut; absent evidence stays PARTIAL/FAIL."
    status: "NOT_STARTED"
    remaining_effort_hours: [4,6]
    authority: "master audit-only; external child execution is not granted by this task"
  -
    id: "M10"
    owner_role: "devops"
    name: "Reconcile final integrated/released/installed identities"
    objective: "Collect final exact provenance only after separately authorized child delivery and activation."
    paths_in_scope: ["docs/audits/code-factory-holistic-inventory.json","docs/audits/code-factory-holistic-coverage-matrix.md","docs/audits/code-factory-holistic-finding-disposition.md"]
    dependencies: ["M9","CF-MB2_SPEC_PASS","CF-MB2_QUALITY_PASS","CHILD_DELIVERY_AND_ACTIVATION"]
    outputs_expected: ["Full final source SHA, package SHA-256/content identity, hosted checks, immutable release/tag mapping","Repeated clean-build identity or an independently approved canonicalization rule","Both installed harness versions, inventories and file parity; CURRENT docs match actual released state"]
    review_checkpoint: "No master publish/tag/install/merge; read-only coordination cannot perform external mutation."
    verification_hint: "Compare exact artifact and extracted manifests, hosted required jobs/annotations, tag/release and wfc status for both harnesses on one refreshed snapshot."
    status: "NOT_STARTED"
    remaining_effort_hours: [6,10]
    authority: "master audit-only; external child execution is not granted by this task"
  -
    id: "M11"
    owner_role: "qc"
    name: "Verify complete portfolio and request DoD"
    objective: "Close the broad goal only with final AC/edge/finding evidence and valid human authority."
    paths_in_scope: ["work-items/code-factory-holistic-audit-remediation","docs/audits/code-factory-holistic-coverage-matrix.md","docs/audits/code-factory-holistic-finding-disposition.md"]
    dependencies: ["M10","ALL_REQUIRED_FINDINGS_TERMINAL","QC_S08_OPEN"]
    outputs_expected: ["AC-CF-001..011 and EDGE-CF-001..006 final evidence","20/20 original findings plus accepted new findings have terminal verdict or correctly authorized exception","Separate QC Technical Verification and trusted DoD receipt; branch HOLD until separate finalization"]
    review_checkpoint: "No self-declared DONE. Master research Release/Business Acceptance stay as approved not_applicable; no child authority inheritance."
    verification_hint: "Run appropriate workflow/protocol/planning/SDD/change/execution/unit/smoke/security/language/UTF-8 checks; missing required evidence blocks PASS."
    status: "NOT_STARTED"
    remaining_effort_hours: [4,8]
    authority: "master audit-only; external child execution is not granted by this task"
dependencies_global: ["Existing CR-008 independently opened execution does not wait on master CF-MB1; master child-handoff authoring M5 still does","CR4 valid child DoD -> CR6 full parent verification -> CR7 new parent terminal decisions -> CR8 finding closure","N24 deadline risk remains an independently controlled contingency, not a reason to absorb CI matrix work","New children cannot be created/activated solely from this plan","Final portfolio closure waits for actual integrated/released/installed evidence and accepted optional dispositions"]
risk_notes: ["Shared-host receipt deadlock: explicit scope decision required; no silent runtime or gate change","Evidence-only commits must not cause pointless rebuild/rebinding loops; retain candidate af49 and full history","Scan remains PARTIAL (ESLint/typecheck/Semgrep unavailable); benchmark/native reader isolation not proved","Parent saved s04-child blocker is stale projection, not current child gate truth; preserve history and reconcile lawfully","2026-09-18 is a CR-008 stop-and-reassess checkpoint, not a delivery promise","Missing independent review R-02/R-04/R-06 remains unavailable input, not invented content","Final live skill/legacy/doc counts must be recounted instead of copied from approved historical snapshots"]
verification_plan: ["Plan-only: schema/unique IDs/acyclic dependencies/11AC and20finding coverage/weights sum100/links/UTF-8/protected hashes/diff","Run actual master workflow,protocol,plan,sdd,change,exec validators; report warnings and skipped checks truthfully","CR-008: exact candidate checksum, supported Node18/22 lineage, retained rollback, parent13AG evidence and ordered fresh terminal receipts","Semantic children: RED/GREEN plus standard local/hosted negative fixture","Security child: approved ephemeral scanner provenance,SARIF/Markdown triage; absent tool is not clean scan","BA language: all mandatory units plus deterministic sample, zero critical failures,mean>=4 andall dimensions>=3","Final: one exact source/run/package/release/tag/both installed harness/CURRENT-doc snapshot and master QC DoD"]
notes_for_implementation: "This supporting plan expands visibility and operational sequencing without replacing approved s06, editing frozen authoring hosts, granting child scope, approving gates or authorizing main/release/runtime mutations."
```

Master review order remains M0/M1 → full M2/M3/M4 → CF-MB1 → M5/M6/M7/M8/M9 → CF-MB2 → M10/M11. Prioritizing existing CR-008 execution now does not bypass CF-MB1 for master M5, because CR-008 already has its own independently opened lane.

### 6. Twenty-finding ownership and closure map

Rows preserve original finding IDs/severities and historical dispositions. They are work routing, not new human findings, severity approval or terminal verdicts. Revalidate all twenty at M4. Existing M2-OBS-01..11 must be deduplicated, accepted or explicitly dispositioned from their actual source evidence; do not invent unavailable R-02/R-04/R-06.

| Finding / severity | Owner; current routing | Tasks / existing child or proposal | Closure evidence required |
|---|---|---|---|
| CF-001 HIGH | PO/BA; Historical resolved | M0,M4,M11; Existing master; no duplicate | Tracked canonical plan and current navigation; verify without rewriting sealed plan |
| CF-002 HIGH | Developer/QC/DevOps/PO; CR-008 blocked at child receipt | CR1-CR8; M5,M10,M11; Existing RCR + parent | Valid child DoD, new same-candidate parent13/13 and independent terminal receipts; F-AG11-001 closed truthfully |
| CF-003 HIGH | DevOps; Open identity reconciliation | M1,M5,M10,M11; Existing release/activation lane | Source/run/package/released/tag/both installed harness/public-doc identity agree; branch/source evidence alone insufficient |
| CF-004 HIGH | Developer/QC; Open adapter state/preflight | M3,M5,M9; Existing add-diagram-design-adapter | Refresh completed prerequisite, T0 environment preflight, approved route, receipt/protocol consistency; do not silently install browser dependencies |
| CF-005 MEDIUM | Developer/QC; Open mutable-test residual | M2,M5,M9; Reuse decouple-tests-from-tree-layout after lawful admission | Fixture-controlled cross-file assertion, fail-first negative case and equal results in two different workflow trees |
| CF-006 HIGH | Security reviewer/QC; Open security baseline | M2,M6,M9,M11; Missing bounded security child proposal | Approved scanner provenance and ephemeral execution over skills/hooks/MCP/adapters; SARIF/Markdown, false-positive triage and owned fixes |
| CF-007 MEDIUM | Developer/QC; Accepted; classifications partial | M3,M6,M9,M11; Classify-first legacy child proposal | All legacy statuses truthful; actionable/ambiguous cases routed; zero retrospective receipts |
| CF-008 LOW | Maintainer; Historical resolved; recheck only | M1,M3,M4,M11; No demo cleanup child unless live issue reappears | Pinned absence and valid listing; no deletion of user paths based on old snapshot |
| CF-009 HIGH | Developer/QC; Historical resolved; preserve regression | M2,M4,M9,M11; Existing role schema contract | EN/VI schemas retain quantified/binary/not_quantified; semantic fixture remains registered where required |
| CF-010 HIGH | Developer/QC; Partial semantic standard path | M2,M6,M9,M11; Missing bounded semantic-audit child proposal | Fail-first conflict fixture plus standard pack-audit/hosted registration; mechanical PASS cannot suppress semantic FAIL |
| CF-011 MEDIUM | PO/Maintainer; Accepted; prior-authority classification pending | M3,M6,M8,M9; Selective promotion/retirement proposal | Every actionable ignored prior authority tracked or explicitly retired/superseded with one resolvable successor; no bulk unignore |
| CF-012 MEDIUM | BA/QC; PO for scope decisions; Accepted; language review pending | M7,M6,M9,M11; Bounded language/interaction child proposal | Mandatory surfaces and stratified sample meet five-dimension rubric; no irrelevant roles or duplicated confirmations |
| CF-013 MEDIUM | PO/Developer/QC; Open optional memory decision | M8,M9,M11; Reduced contract/split/retirement brief | Explicit owner decision and evidence; completed codebase-memory trial preserved; no unsponsored implementation |
| CF-014 LOW | Architecture lead/PO; Open experiment decision | M8,M9,M11; Sponsor experiment or retire brief | Explicit decision; thresholds remain unvalidated until actual calibration, not used as people/delivery gates |
| CF-015 LOW | Developer; PO if new product scope; Open pilot decision | M8,M9,M11; One-skill pilot or supersession brief | Explicit decision and pilot review evidence if selected; current guardrail comparison if superseded |
| CF-016 MEDIUM | Maintainer/DevOps; Open WIP ownership/contamination | M0,M1,M3,M6,M10; Owned path disposition proposal | Each root WIP attributed; clean release snapshot excludes unrelated edits; moves/deletes require approved recoverable scope |
| CF-017 HIGH | Developer/DevOps/QC; New child exact equality observed; portfolio repeat proof pending | CR6; M5,M10,M11; Reuse candidate identity lane | Repeated clean same-source package comparison or approved canonicalization contract; old mismatch stays historical |
| CF-018 MEDIUM | DevOps/QC; Open independent deadline lane | N24; M5,M9,M10; Existing upgrade-guardrails-actions-node24 | One commit changing only18 tokens, normalized pre/post identical; fetch-depth0 retained; supported actions/runner and warning-free hosted annotation proof |
| CF-019 HIGH | PO/BA/Developer/QC; SA/TA child branch-complete; integration pending | M2,M5,M9,M10; Reuse align-adaptive-sa-ta-applicability | No duplicate child; source/Codex/Claude operative policies obey router reason codes; maintenance omission and high-risk triggers tested |
| CF-020 MEDIUM | PO/BA/DevOps; Accepted; current/historical classification partial | M3,M7,M9,M10; Bounded current-doc child proposal | CURRENT claims match actual released/installed inventory; HISTORICAL claims preserved and excluded from current onboarding |

Missing-child proposals stay inside the disposition sidecar until separately approved for materialization. Public skill/policy/runtime/test/CI edits are never executed in the audit master. Concrete source-path scopes are selected only after checking current child ownership; unresolved overlap is a blocker, not a guessed write root.

### 7. Language, role-friction and security work contract

For language, review 100% mandatory README/docs-map/quickstart/onboarding/positioning and router/backbone/human-gate surfaces, plus user-facing CLI approval/help/error/status messages. Detailed skill sampling is deterministic per group: min(group size,max(2,ceil(group size/4))), sorted paths and all newly high-risk wording surfaces; the approved snapshot has at least 15 EN/VI pairs across seven groups.

Score clarity, naturalness, next action, terminology and role/gate relevance. A wrong authority or unsafe/unusable action is a critical binary failure before averaging: PASS needs zero critical failures, mean ≥4.0/5 and no reviewed dimension <3.0/5. Missing translations remain gaps. BA owns language judgment; QC verifies the sample and evidence; additional roles participate only for an actual authority boundary. Do not ask users to list PO/SA/TA/etc. for ordinary non-delivery Q&A or low-risk maintenance unless authoritative applicability requires it.

Explicit regression cases: maintenance omits SA/TA without a trigger; named public-contract/regulated/cross-system/greenfield-foundation cases still require the appropriate role; one human message may bundle interactions only if every applicable gate keeps independent authority and receipt; approval errors must say exactly what is missing and provide a valid next action without impossible commands.

For security, proposal evidence must enumerate skills, referenced scripts, hooks, MCP endpoints/configuration and external adapters, pin scanner/dependency provenance, run approved tools ephemerally, retain SARIF/Markdown, triage false positives and name fix owners. No scanner auto-fix, external transmission or installation is authorized by the master plan; absent scans cannot be called clean.

### 8. Progress reporting — distinguish counts from estimates

Previously reported whole-goal 25–30% and CR-008 85–90% were informal remaining-work estimates. They are not a measured weighted score, approved KPI or claim of completion. The exact current indicators are inventory 42/42, skill reads 25/42, EN reference reads 25/69 and child AC 9/10; parent exact-candidate 13/13 and valid child DoD receipt remain pending.

Proposed future workload weights, not yet approved or scored:

| Group | Deliverable | Weight |
|---|---|---:|
| G0 | Complete audit and triage | 15% |
| G1 | CR-008 closeout | 25% |
| G2 | Adapter, mutable-test and ownership residuals | 10% |
| G3 | Security, semantic audit, legacy truth and deadline CI | 20% |
| G4 | Language, applicable-role interaction and CURRENT docs | 15% |
| G5 | Optional capability dispositions | 5% |
| G6 | Final released/installed reconciliation and portfolio DoD | 10% |

Formula: sum(weight × evidenced completed/required subdeliverables). A subdeliverable counts only after its actual required verification and human authority. Reads do not count as semantic PASS; branch-DONE does not count as released/installed closure. Optional items need an explicit owner terminal disposition; elapsed time does not close findings. Rebaseline weights explicitly if scope changes. 100% requires all mandatory AC/finding evidence, valid portfolio DoD and applicable child delivery gates.

### 9. Effort, checkpoints and risks

- CR-008 remaining active engineering: approximately 9–21 hours after the explicit shared-host decision, assuming no new production finding; reviewer/CI/signing waits are excluded. This is not a promised completion date.
- Independent Node24: approximately 2–4 active hours plus CI/review. Do not let structural CR-008 uncertainty consume its deadline.
- Remaining master audit/coordinator work M0–M11: approximately 56–99 active hours; missing security/semantic/legacy/language child implementation is not included and must be estimated after scoped approval. Do not report this as total portfolio delivery time.
- 2026-09-18 remains stop-and-reassess for CR-008, not a delivery promise and not authority to cut AC-RCR-06 atomicity or AC-RCR-08 parent verification.
- Re-estimate the whole goal after CR8 and CF-MB1: actual remaining child scope, accepted optional decisions, review turnaround and release/install authority determine a credible calendar forecast.
- Preserve the existing af49 package and historical local/hosted evidence. Evidence-only commits must not trigger needless repack/hosted-rebinding cycles.
- Preserve untracked root WIP and unknown legacy text; master does not delete, bulk migrate, forge receipts or change another owner's files.

### 10. Verification and handoff

Plan-only checks: required schema fields, twelve unique M IDs, eight unique CR IDs, twenty exact CF IDs, eleven AC mappings, acyclic dependencies, non-empty outputs/verify/paths, weights sum100, local links, fatal UTF-8, protected host digests and git diff --check. Run actual master workflow/protocol/plan/SDD/change/execution validators and retain their genuine warnings.

Behavior tests/build/security/hosted checks are not rerun or waived by this documentation pass. CR6, independent children and M10/M11 own the real verification. Master final DoD requires AC-CF-001..011 and EDGE-CF-001..006 evidence, terminal dispositions for original20 and accepted new findings, no unexplained authority/lifecycle/release/installed conflict, and explicit QC Technical Verification/DoD with valid receipts.

Immediate handoff: obtain CR2's explicit host-boundary decision, then execute CR3–CR8 within the existing CR-008 owned scope and candidate binding. Hold other remediation implementation until CR-008 closes, except the separately activated deadline lane. This section does not finalize or publish anything.

### 11. Bản tóm tắt tiếng Việt cho người sử dụng

Plan này bao phủ toàn goal rà soát và cải tiến Code-Factory, không chỉ CR-008. Đây là phần bổ sung kế hoạch thực thi; Spec/Approach/Task Plan đã ký vẫn giữ nguyên. JSON đi kèm chứa đầu việc, phụ thuộc, bằng chứng, trạng thái và ước lượng.

| Thứ tự | Nhóm việc | Kết quả phải có |
|---|---|---|
| 1 | Hoàn tất CR-008 | Receipt DoD child hợp lệ → parent AG-01..13 trên đúng candidate → Technical Verification/DoD/Release/Business Acceptance mới → đóng finding và CR đúng bằng chứng |
| Ngoại lệ có hạn chót | Nâng GitHub Actions Node24 | Một commit chỉ18 token, giữ fetch-depth0, workflow hosted xanh và không annotation deprecation; không làm parallelisation |
| 2 | Hoàn tất rà soát master và các tồn đọng P0 | Đọc17 skill và44 reference còn lại; hoàn tất phân loại/quyền sở hữu; review CF-MB1; xử lý adapter/test qua child đã duyệt |
| 3 | P1 bảo mật, semantic audit, legacy | Bằng chứng scan/triage, regression fail-first chạy trong đường kiểm tra chuẩn, trạng thái legacy trung thực và không ký phê duyệt hồi tố |
| 4 | P2 ngôn ngữ và trải nghiệm phê duyệt | Review toàn bộ mặt tiền EN/VI và mẫu phân tầng; câu chữ tự nhiên, bước tiếp theo rõ, chỉ role/gate thực sự áp dụng |
| 5 | P3 quyết định backlog tùy chọn | Chủ sở hữu quyết định memory/metrics/pilot: thực hiện có scope, thu gọn, thay thế hoặc nghỉ; không tự mở rộng sản phẩm |
| 6 | P4 nghiệm thu toàn bộ | Source/package/hosted/release/tag/Codex/Claude/docs khớp trạng thái thật;11 AC và20 finding có bằng chứng; QC DoD master hợp lệ |

Điểm nghẽn CR-008 hiện không phải một bài test đang đỏ. QC đã duyệt Technical Verification và DoD child, nhưng DoD chưa ký được receipt vì bản s08 vẫn draft trong lúc Release và Business Acceptance của child đang required mà chưa được duyệt. Parent AG-01..13 trên candidate đã sửa vẫn là nghĩa vụ bắt buộc.

Khuyến nghị đang chờ PO, BA, Developer và QC quyết định: tách checkpoint kỹ thuật của correction child; giữ Release và Business Acceptance tại parent. Đây là thay đổi scope đã được PO duyệt trước đó, không chỉ metadata. Cả năm receipt Spec/Contract/DoR/Approach/Task Plan bị ảnh hưởng bởi hash toàn tài liệu và cần cập nhật sau khi amendment được duyệt. Giữ nguyên phê duyệt DoD kỹ thuật đã ghi nhận, không bỏ AC-RCR-08 và không chuyển child thành DONE khi nghĩa vụ parent còn thiếu.

Ước lượng CR-008: còn khoảng9–21 giờ thao tác kỹ thuật sau khi tháo điểm nghẽn quyền phê duyệt, chưa tính chờ người duyệt/CI và giả định không có finding sản xuất mới. Master còn khoảng56–99 giờ rà soát/điều phối, chưa gồm triển khai các child chưa chốt scope; chưa có ngày hoàn tất toàn goal đáng tin cậy. Ngày18/09 là mốc dừng để đánh giá lại, không phải cam kết giao hàng.

Tỷ lệ25–30% cho toàn goal và85–90% cho CR-008 trước đây là ước lượng sơ bộ. Số chắc chắn hiện có: inventory42/42, đọcskill25/42, đọcENreference25/69, ACchild9/10; không được hiểu thành CR-008 hoặc toàn goal đã DONE. Cách tính trọng số ở trên là đề xuất chưa được chấm.

Không có thay đổi code, GitHub Actions, gate applicability, chữ ký, release, tag, merge, install hoặc cleanup trong lần tạo plan này.

### 12. Actual plan-authoring verification — 2026-09-14

| Check | Actual result | Scope / retained gap |
|---|---|---|
| Schema/YAML/JSON/dependencies/coverage | PASS | 12 M tasks, eight CR steps,20 exact CF IDs,11 AC mappings; DAG acyclic, weights sum100 |
| Links / UTF-8 / git diff --check | PASS | Supporting plan and current s07 delta only |
| Protected authority / history / scope | PASS | Seven master files unchanged, original s07 retained as exact prefix; CR-008 HEAD/report/s08/workflow unchanged and worktree clean |
| Workflow naming/governance | PASS | 181 naming files,177 governance notes |
| Protocol / planning | PASS | Nine managed,16 legacy skipped;177 planning notes. Legacy skip remains reported, not closure. |
| SDD / change | PASS | 41 SDD notes,34 change notes; existing legacy CHANGE-003/006 vocabulary warnings retained |
| Execution | FAIL — pre-existing | Master s01/s02 already declare review_mode: targeted at HEAD84713be9; current runtime rejects both. Complete files match baseline bytes. No suppressing edit. |

`PLAN-VALIDATION-OBS-01` is a direct authoring/runtime contract observation, not a human-approved QC finding. Route its disposition to master M3/M4 after priority CR-008; do not absorb a runtime fix or authoring reapproval into CR-008. Five validator commands pass, one fails on unchanged baseline inputs. The plan's own structure and protected-boundary assertions pass.

Production unit/build/typecheck/security/hosted checks were not rerun for this docs-only delta. They remain required in applicable child/final verification; absence is not a waiver, clean-scan claim or whole-goal PASS.

Tóm tắt kiểm tra: plan và bảo toàn artifact PASS; năm validator PASS; exec còn hai lỗi cũ của master cần xử lý sau CR-008. Không sửa gate, receipt, code hay lịch sử để che lỗi. Plan đã tạo xong; CR-008 và toàn goal chưa DONE.

### 13. Current plan revision and CR-first handoff — 2026-09-14 08:15 UTC

This supporting plan now incorporates the RCR shared-host decision packet. CR2 requires an explicit PO/BA/Developer/QC checkpoint-scope decision, including PO-approved s02 non-goal and frozen s04 sequencing impact. Option A is not approval-ready under the locked sequence; Option B remains a recommendation, not an approval. No frozen host, gate applicability, receipt or production payload was changed.

The proposed authoring-host changes affect all five existing receipts, not a guessed subset: Spec BA, Contract Developer, DoR BA/QC, Approach Developer and Task Plan Developer. Reviews bind actual amended bytes only after explicit amendment approval. Keep the qualified QC child DoD decision; a valid technical checkpoint receipt is not protocol DONE while AC-RCR-08's full parent contribution is pending.

Actual revision checks at 08:15:21 UTC: JSON, frontmatter and ten YAML blocks, twelve task IDs, eight CR steps, twenty finding IDs, eleven AC mappings, acyclic dependency graph, weights100, UTF-8 and git diff --check PASS. Seven protected master artifacts and original s07 history prefix remain exact. CR-owned s08 evidence and report remain byte-identical to their pre-revision state; both worktrees retain their existing two owned dirty artifacts. This is not a claim that either worktree is clean.

Fresh supported-Node22 validators: workflow, protocol, plan, SDD and change PASS. Execution still FAILS on the same unchanged master s01/s02 `review_mode: targeted` baseline; existing legacy-change warnings and sixteen skipped legacy protocol entries remain disclosed. The observation is not waived or silently fixed. Prior verification sections remain historical snapshots, not current clean-worktree claims.

Ưu tiên tiếp theo vẫn là CR-008: quyết định scope → amendment/receipt đúng bằng chứng → checkpoint child hợp lệ → parent AG-01..13 trên đúng candidate → các gate parent mới → đóng finding và CR. Chưa mở triển khai cải tiến khác từ plan này. Chưa sửa code/CI, ký receipt, publish/tag/merge/install hay cleanup; kiểm tra sản xuất và nghiệm thu toàn goal vẫn do các child và M10/M11 thực hiện.

## Working-state reconciliation — 2026-09-21

> [!info] Supersession of the September 14 operational snapshot
> The dated execution section above and its JSON companion are retained historical planning evidence. Their child status, CR-first sequence, runtime versions, estimates and old validator failure are superseded as descriptions of current execution. This does not retire the unfinished master audit, replace its approved s06, or close any CF finding. M4 still owns the complete finding reconciliation.

### Scope and evidence identity

This is an audit progress entry under the existing master grant, requested by the user during repository-state review. The original request entered through `read_only_analysis`; this bounded record uses the already ACTIVE master s07 and its granted work-item directory. The report and frozen s04/s05/s06 hosts were byte-identical between the audit worktree and current main. Current Spec, DoR, Approach and Task Plan receipts were individually checked: APPROVED and digest-matched. Contract is explicitly not applicable.

Authoritative source: `main = origin/main = 0dc985dcabd6c86132cd8c2d4a7a412b3a8014cd`, bundle 2.6.3, after the explicitly requested `git fetch --all --tags`. The newly fetched annotated `v2.6.3` tag resolves to `7f810352ca253b9b8356f9116335cc03713adae4`. Repository reads and validators used `.claude/worktrees/cf-023-receipt-binding`, not the stale root checkout. That worktree now retains the same commit in detached HEAD after the root checkout was safely moved to main.

The September 14 s07 baseline on this branch equals main's 17,471-byte s07. Before this entry, the working s07 was 71,620 bytes with 520 added lines; SHA-256 `31a6ee65831a5c8caaddb6ee27488d651d4a2239af79ce5101e36bc11c27e295`. The JSON is 62,657 bytes / 1,240 lines, SHA-256 `21d6c5819659584ff7db8b3b8071c25e623edf15ebfd007f6e8678f82df29f2f`. Both unique artifacts are absent from main in their working form. This entry appends to s07 and preserves all earlier bytes; the JSON is unchanged.

### Path dispositions

Paths in the first two rows are relative to this work item's directory in the audit worktree; the other five are relative to the primary root checkout.

| Path | Attribution | Disposition |
|---|---|---|
| `code-factory-holistic-audit-remediation.s07.implementation.md` | Existing audit master; granted progress host | Retain all uncommitted planning history. September 14 operational snapshot is superseded by current evidence in this entry; unfinished M2–M11 obligations still derive from approved s06. Do not replay obsolete CR/Node24 blockers as new tasks. |
| `portfolio-execution-plan.json` | Existing audit master; supporting, draft, planning-only, not source of truth | Retain exact bytes as the companion historical snapshot. Superseded as an executable current-status plan, not deleted or treated as proof that remaining audit work is complete. |
| `changes/CHANGE-005/` | Matched change package for `add-diagram-design-adapter`; seven files; CF-004 | Retain together with its work item. The skipped committed sequence does not mean cancellation. No activation, archive or deletion inferred. |
| `work-items/add-diagram-design-adapter/` | Owning adapter work item; nine files | Retain at recorded MATERIALIZED/s06. Its report has no granted write paths and records CHANGE-004 compatibility and Python Playwright/Chromium prerequisites. These dated blockers need current evidence in that owner's lane before continuation; this audit does not rewrite them. |
| `docs/release/community-pack-readme-en.md` | Legacy community documentation; documentary successor `docs/release/community-pack-readme.md` | Retain as a superseded filename variant pending owned disposition. Direct comparison shows only title, bilingual pointer, research-reference and contribution-link differences; not an exact duplicate. The canonical June document is also historical, not a current 2.6.3 version source. |
| `Untitled.md` | User attribution requested; no confirmed work-item owner | Keep unchanged; no inferred disposal authority. |
| `New Core FnB Technical.md` | User attribution requested; no confirmed work-item owner | Keep unchanged; no inferred disposal authority. |

### Release, installed runtime and CLI are distinct

The release work item remains ARCHIVED; its public release is not reopened. A live read of `https://registry.npmjs.org/workflow-bundle/latest` returned version 2.6.3. Both harness install-state records now report 2.6.3, 42 managed skills, scope `both`, and the primary Code-Factory project target. Their recorded update times are `2026-09-21T08:03:20.362Z` (Codex) and `2026-09-21T08:03:14.303Z` (Claude). The supplied handoff's installed-2.6.2 observation has been overtaken by these updates.

For each harness, 228 installed skill/support-policy files match the retained 2.6.3 package byte-for-byte, with no extra files in the managed skill directories. Both global policies and both project policies match the package; its policy also matches main. The retained install source is `~/.workflow-bundle-artifacts/v2.6.3/package`.

One separate mismatch remains: `/opt/homebrew/bin/wfc` resolves to `/opt/homebrew/lib/node_modules/workflow-bundle/bin/wfc.js`, whose package.json version is **2.6.2**. The harness installation is current; the globally installed CLI is not. `wfc --version` is not a reliable version query here: it fell through to workflow validation, so package metadata was inspected instead. No global npm installation was performed. A global CLI update needs its own maintenance owner; it is not part of the audit master's grant or a reopening of the archived release.

### Worktree and branch disposition after the cleanup request

The user subsequently requested cleanup of Done worktrees. Per `branch-finish-discipline`, merge reachability was checked separately from DoD and unresolved findings. All existing worktree branches have zero commits unique to main. No branch or worktree was removed.

| Worktree / branch | Evidence and action |
|---|---|
| Primary root / `docs/work-items-2026-09-11` | Branch is fully merged, 212 commits behind main, but includes planning work without s08 and retains five untracked roots. Preserved the branch and all 19 untracked files; collision preflight also checked 10,705 ignored files outside nested worktrees and found no checkout collision. Switched only the root checkout to main, now 0 commits behind origin/main. This does not declare the planning work Done. |
| `cf-023-receipt-binding` | Kept at 0dc985d in detached HEAD to free main for the root. Its namesake report is still PROPOSED with a dedup blocker, not terminal. Retained its generated runtime and six ignored ` 2.md` copies, each equal to its canonical sibling. |
| `code-factory-holistic-audit-remediation` | HOLD_OPEN: master ACTIVE/s07, outstanding portfolio review/DoD, and unique uncommitted planning. Retained its 218-commits-behind branch and both original working artifacts. |
| `cr-008-adaptive-governance` | HOLD_OPEN: parent and four co-located child reports are ARCHIVED; their DoD receipts are APPROVED/digest-matched and required parent terminal receipts match. However, the parent still carries two legacy blocker entries, including F-AG11-001. The later CR-009 work item explicitly excludes live CR-008 disposition. Do not infer that these entries are disposed merely from ARCHIVED or from the corrective code shipping. All 462 ignored runtime files match their canonical source, but this does not remove the lifecycle hold. |
| `publish-planning-work` | HOLD_OPEN: clean and fully merged, but the published capability-grant-granularity/reconciliation plans have no s08. Its last schema correction also touches the still-active audit master. No independent completion evidence for finalizing this planning worktree was established. |

`backup/local-main-2026-09-16` and `evals/behaviour-axis` remain intact: each has one commit absent from main (`1277f23` and `64833b4`, respectively). No branch deletion, forced cleanup, stash, rebase or history rewrite was performed.

### Protected boundary, review and verification

The protected CF-001..020 register and disposition sidecar were not authored or edited. CF-003/CF-016/CF-018 observations remain inputs for the existing M4 owner, not piecemeal register verdicts. Archived release hosts, approval receipts, protocol reports and frozen authoring hosts are unchanged. Root tracked-file changes came only from checking out the already committed main tree.

Spec-compliance self-check: this entry is audit evidence inside the existing granted s07, retains original WIP, and does not activate a child or approve a gate. Documentation-quality self-check: records source identity, one disposition per requested path, a separate CLI mismatch, and precise reasons for retaining worktrees. This is not the independent CF-MB1/CF-MB2 review or portfolio DoD.

Fresh main checks before the entry: workflow naming/governance PASS (267 artifacts / 263 notes), execution PASS (263 notes), protocol PASS (18 managed items; 21 legacy skipped), and pack audit PASS. The old September 14 execution failure is historical; it was not reproduced on main. Production unit/build/security/hosted release suites were not rerun for this documentation and checkout operation; the handoff's 45-test-file claim is not presented as a new run.

Focused verification PASS: fatal UTF-8 decoding, absence of replacement characters, `git diff --check`, the exact original 71,620-byte s07 prefix, unchanged JSON and all 19 root untracked files, unchanged frozen hosts/reports, and unchanged authoritative protected files. The primary root's protected register now equals the committed main version because of checkout; no register wording was authored. Main's eight master notes were copied into `/private/tmp/cf-state-review-9kq6l4ei`, with this working s07 and its historical JSON overlaid. The 2.6.3 validators passed naming/governance, execution and planning for all eight notes. This checks the proposed note against the current baseline without modifying the clean main reference worktree or silently repairing old audit-branch s01/s02 metadata. The audit worktree remains dirty and behind main; no commit, integration, independent review or master DoD is claimed.

## WIP checkpoint and main synchronization — 2026-09-21

The user selected the proposed checkpoint-and-sync action. This progress entry records that bounded operation within the existing audit work-item grant; it supersedes the preceding dirty/behind snapshot. The September 14 plan remains historical, and the master continues under its existing approved s06 and ACTIVE/s07 report.

### Preservation and synchronization

- Source baseline: `main = origin/main = 0dc985dcabd6c86132cd8c2d4a7a412b3a8014cd`.
- Original WIP checkpoint: `ff9e95705431743395c85607ac381255092d3799`, containing exactly s07 and `portfolio-execution-plan.json`, with 1,819 added lines in total.
- Rebased checkpoint: `cc9a8913ae72873a4eaded7a87a2e6b8609a3f4c`, directly on the main baseline. Rebase completed without conflicts and replayed only the new local checkpoint. Main and remote refs were not updated.
- Before/after hashes confirm that both WIP files were byte-identical through rebase: s07 was 81,927 bytes / SHA-256 `325e2167310cd3e556d85ebb3c4949fbcb0cc0a8c4726757dff7654f26fc0d70`; JSON was 62,657 bytes / SHA-256 `21d6c5819659584ff7db8b3b8071c25e623edf15ebfd007f6e8678f82df29f2f`. This follow-up entry appends to that s07 prefix; JSON stays unchanged.
- Recovery files are retained in `/private/tmp/cf-audit-checkpoint-sr1yd0t3`: `audit-wip-original.tar.gz`, `preservation-manifest.json`, and `audit-checkpoint.bundle`. `git bundle verify` passed. The incremental bundle contains the original checkpoint and requires baseline `84713be9e95da3c6192034e57e4eddf41c78c5ba`, which remains in main history.

Option considered: merging main into the stale branch would also preserve the work, but would add a merge commit. Rebase was selected because every pre-checkpoint audit commit was already reachable from main; only one unpublished, documentation-only checkpoint needed replay. The original checkpoint was independently preserved before replay.

### Verification and review

Actual post-rebase checks, completed by `2026-09-21T08:49:31Z`:

| Check | Result |
|---|---|
| Exact scope | PASS: branch delta from main contains only the two granted audit paths. |
| Preservation | PASS: both original WIP file hashes, all 19 root untracked files, and 11 protected/frozen/main-reference files match the preflight manifest. |
| Workflow / execution / planning | PASS: 267 naming artifacts, 263 governance notes, 263 execution notes, and 263 planning notes. |
| Protocol / SDD | PASS: 18 managed items with 21 legacy skips retained; 52 SDD notes. |
| Authoring receipts | Spec, DoR, Approach and Task Plan remain APPROVED with digest_match=true when queried from the rebased audit worktree. |
| Checkout state | Clean after checkpoint rebase; zero commits behind main and one local checkpoint ahead before this follow-up evidence entry. |

Spec-compliance self-review passed for this bounded operation: the two owned audit artifacts are preserved, no frozen host, protocol control, protected register, child authority or main commit was authored. Documentation-quality self-review passed: the historical plan's supersession remains explicit, original bytes have a recoverable checkpoint, and the new baseline and verification limits are identified. Independent portfolio review and s08 DoD remain outstanding; this operation does not finalize the branch or worktree.

The preceding global-CLI mismatch was resolved by the separately requested installation: `/opt/homebrew/lib/node_modules/workflow-bundle/package.json` now reports 2.6.3, rechecked during this operation. No installation occurred as part of checkpoint/rebase.

This is documentation preservation and synchronization, with no production behavior authored; TDD, production unit/build and hosted release reruns are not applicable to this delta. Final UTF-8, whitespace and preservation checks cover this appended entry before its evidence commit. No push, merge into main, branch deletion or worktree removal is included.

## Current M2/M3 checkpoint — 2026-09-27

The accepted two-part continuation retains its original scope. The two DONE worktrees were archived and removed under their own closeout authority; their exact observed disposition now lives in [the M3 classification](../../docs/audits/code-factory-holistic-legacy-document-classification.md#current-workspace-and-lifecycle-checkpoint). Main is `a36b1852ca13dd5209fad319400e769c5b22cabf`. This audit branch merged that main into the published audit history at `1b2af7be87301c62965f2339b5199aa48ae9e358` without rewriting the original WIP commits. Source synchronization preserved every audit work-item file and both protected register/disposition files.

M2 now records 42/42 full canonical skill reads and 68/68 operative English reference reads, with 126 exact read-log paths. [The coverage matrix](../../docs/audits/code-factory-holistic-coverage-matrix.md) owns the current dimension assessments and M2-OBS-01 through M2-OBS-23. [The inventory](../../docs/audits/code-factory-holistic-inventory.json) separates historical M1 observations from the current source/installed snapshot. Both installed harnesses and the global CLI report 2.6.3; all SKILL bodies match source, while four protocol/materialization reference files differ from later main and match the retained 2.6.3 package. Version equality is not asserted as whole-tree identity.

M3 recount proves 20 managed and 21 legacy tracked items with a passing protocol validator. All legacy entries and required managed terminal receipts are evaluated in its owning sidecar. The four full-read plans, all seventeen research/source-capture inputs and four earlier pack-review records now have one input classification each, with exact hashes and explicit read scope. The current public-document allowlist classifies all 48 subjects (26 CURRENT / 22 HISTORICAL). The final continuation below completes the M2 source assessments, with artifact verification recorded separately. M3 classification is COMPLETE_WITH_OBSERVATIONS; M4 and CF-MB1 remain unopened, and the master has no final DoD.

Spec-compliance self-review: this checkpoint only edits the three owned audit sidecars and this unsealed progress host. No production source, frozen host, report, receipt, archived release, protected CF register or M4 disposition was changed. Documentation-quality review: current and historical evidence have distinct dates/identities, read counts are not semantic PASS, and local cleanup is attributed to its actual owners. Existing pack audit and architecture-role contract tests passed on the synchronized source; new artifact consistency/UTF-8/whitespace and workflow checks are recorded after execution below. This is a docs-only evidence update, so production TDD is not applicable.

Prior checkpoint `bab6b78` verification: naming PASS (280 artifacts), governance/execution/planning PASS (276 notes), protocol PASS (20 managed / 21 legacy skips), exact 112-path read-log hash match, unchanged protected/frozen hashes, fatal UTF-8 decode and `git diff --check` PASS. The English-reference denominator is corrected from the historical 69 to 68 after recounting both pinned trees.

M3 continuation now classifies all 21 legacy entries (8 LEGACY_CLOSED, 6 actionable, 7 ambiguous, 0 empty-invalid); the initial sixteen directories remain byte-identical. All 20 managed states are enumerated, with 33 required terminal receipts on 17 terminal subjects verified APPROVED/digest-matched. Qualified PARTIAL closure and frozen pre-seal wording are distinguished from current protocol state. The existing architecture research note led to recovery of its 18KB prototype archive; exact historical hashes and bounded read scope are recorded in the M3 owner. Prior-plan scope and successors are now distinguished from completed sub-work; research sections and captured READMEs have bounded classification evidence, not unperformed full technical verification. Public-document classification is now complete in its owner, including navigation and release-state observations; no master completion or protected finding disposition is asserted.

Continuation at `2026-09-27T06:18:49.415106Z`: Spec/DoR/Approach/Task Plan receipts rechecked APPROVED and digest-matched. Three more full reference reads are recorded in the inventory and coverage matrix. Root-only research inputs were read in place; no input, protected register, sealed host, report or receipt was edited. Current public starter hashes are explicitly labeled historical until refreshed. Continuation verification: naming PASS (280 artifacts), governance/execution/planning PASS (276 notes), protocol PASS (20 managed / 21 legacy skips), 115 unique read-log hashes matched, and all 21 prior-input hashes matched. The 26 input classifications are unique and use the allowed verdicts. All 19 root untracked file hashes, the two protected branch refs, protected register/disposition and frozen work-item files remain unchanged. UTF-8 and whitespace checks pass; production tests/build are not applicable to this documentation-only delta.


Continuation at `2026-09-27T11:44:55.531626Z` on source `4f37b25efed78512de0202dbb0f34c3b925befac`: ten additional operative English references were fully read and pinned. Protocol activation/list, the worked bug TDD order, and CI manual-dispatch wording produce M2-OBS-15/16/17; they are audit proposals, not accepted CF findings or authorized fixes. M3 completed its 48-document classification and four-deliverable completion check, preserving ambiguous legacy outcomes and settled release history. Source CI/test registration was inspected without triggering a hosted run or generating runtime/package files. The full workflow-chain reference and the remaining cross-boundary/negative-fixture assessment still prevent M2 completion. The overall two-part goal remains active.

Spec-compliance review of this continuation: only the three granted evidence sidecars and this unsealed s07 progress host are edited; no M4, protected CF register, sealed host, report, receipt, source skill/code or cleanup target changes. Documentation-quality review follows that boundary check: exact hashes and read scopes are preserved; CURRENT classification is separate from correctness, audit-task completion is separate from human DoD, and source registration is separate from a passing hosted execution.

Continuation verification: naming PASS (280 artifacts); governance, execution and planning PASS (276 notes each); protocol PASS (20 managed / 21 legacy skips). Integrity checks PASS for 125 unique read-log hashes, 42 skills, 67 of 68 references, 17 unique observations, all 48 public classifications/hashes and all 20 managed report/existing s08 hashes. All 19 root untracked files, both protected branch refs (one unique commit each), protected register/disposition and frozen work-item files remain unchanged. The delta is confined to the four owned paths, with strict UTF-8 decoding and whitespace checks passing. Production unit/build and hosted runs are not repeated for this documentation-only continuation; earlier source mechanical results retain their own identities and limits.


Continuation at `2026-09-27T13:21:15.647416Z` on `72353b029b9fb5d82adca34fef3bdedf789c930c`: the full 3,182-line workflow-chain reference is now read, bringing canonical read coverage to 42/42 skills and 68/68 English references (126 source paths). The owning coverage matrix records two catalog syntax defects and mixed pre-Light authoring guidance as M2-OBS-18/19; 44 syntax blocks and 28 shared skill-schema catalogs were compared with explicit limits. Four cross-boundary assessments and twelve scope-labeled source reads are recorded in the inventory. Pack audit, architecture-role contract and adaptive-governance tests all PASS on this source; in-memory negative diagnostics fail the expected CF-009/019 assertions without changing source. Pack-audit PASS does not clear the catalog defects. M3 classification remains complete with observations; M2 and the overall two-part goal remain active.

Spec-compliance review: this continuation edits only inventory, coverage matrix and this unsealed progress host. M4, source skills/code/tests, frozen approvals, protocols/receipts, release and cleanup state are unchanged. Documentation-quality review: complete reference reads are distinguished from targeted code reads, model-count metrics from observed user behavior, fresh negative diagnostics from historical TDD, and audit findings from human-approved dispositions. Artifact/workflow verification is recorded after execution below.


## M2/M3 final audit-task assessment — 2026-09-27T13:34:22.790725Z

Source `72353b029b9fb5d82adca34fef3bdedf789c930c` retains integrated main `a36b1852ca13dd5209fad319400e769c5b22cabf`. M2 now has 42 assessed skill rows, 68 operative English reference reads and ten cross-boundary contract assessments. The inventory adds scope-labeled adapter/hook/MCP, governance/receipt and validator reads. Four additional observations retain concrete evidence and owners: typed session context, TDD tracking paths, composite publish dry-run scope, and legacy installer destination validation. CF-023 remains linked to its existing proposed/dedup-blocked owner; this audit neither duplicates nor implements it. Exact-source expression and stubbed-effect diagnostics made no live hook, Git, API, install or deletion calls.

Spec-compliance self-review first: all four M2 outputs and all four M3 outputs now have direct evidence in their owners; only inventory, coverage matrix and this unsealed host change in this continuation. No source skill/code/test, protected register, M4 disposition, frozen host, protocol report or receipt is edited. Then documentation-quality self-review: every skill/boundary has an assessment, historical snapshots remain dated, partial discovery/security/compatibility evidence has named owners, and source registration is not represented as live execution. M2 and M3 are COMPLETE_WITH_OBSERVATIONS after the checks below. This is no master DoD, CF-MB1 or branch-finalization verdict.

The two-part task's first part was already completed: the two archived DONE worktrees and local branches were removed with preserved remote refs and path attribution. The second part is this M2/M3 audit output, not all M0..M11 remediation. Master remains ACTIVE/s07; M4 and the review pair remain subsequent portfolio work. Final artifact verification follows after execution.

Verification completed at `2026-09-27T13:35:54.626345Z`: naming PASS (280 artifacts); governance, execution and planning PASS (276 notes each); protocol PASS (20 managed / 21 legacy skips). Integrity PASS covers 126 skill/reference/agent/script hashes, 43 scope-labeled cross-boundary hashes, 42 assessed skills, ten contract rows, 23 observations, all 48 public classifications and 20 managed report/host identities. All 33 terminal and four master authoring receipts remain APPROVED/digest-matched. The 21 root prior inputs, 19 untracked files, two protected refs, protected register/disposition and frozen hosts remain unchanged. Both installed 42-skill bodies and manifest/state identities revalidate; global CLI remains 2.6.3. Strict UTF-8 and whitespace checks PASS. Full production unit/build, live security scans, hosted jobs, install and release reruns are outside this documentation-only delta; the three earlier source tests retain their exact scopes and identities. M2 and M3 are COMPLETE_WITH_OBSERVATIONS as audit tasks; master remains ACTIVE/s07.


## M4 finding reconciliation — 2026-09-27T13:58:47.572995Z

The user accepted the concrete M4 continuation. Router revalidation found this existing materialized research owner ACTIVE/s07, brownfield, all four authoring receipts APPROVED/digest-matched, no missing execution gate, and granted audit-only paths. No non-delivery materialization or new child was created. M2/M3 dependencies are complete with observations; s06 M4 owns finding disposition and coverage, with progress recorded here.

Source `14a5068187a6fecf22e325dfdfcdc98855c7b38a` retains integrated main `a36b1852ca13dd5209fad319400e769c5b22cabf`. M4 now prepares twenty exactly-once dispositions and routes 23 M2 observations, six M3 observations and one previously unnumbered source-label residual. The [disposition owner](../../docs/audits/code-factory-holistic-finding-disposition.md) holds evidence tiers, ownership, child/proposal boundaries, next gates and closure tests; [coverage](../../docs/audits/code-factory-holistic-coverage-matrix.md) records task/AC limits. Existing CF-023/CI owners retain their blockers. Unavailable R-02/R-04/R-06 and partial known-claim revalidation of R-01/R-03 are explicit, with no invented original findings.

Fresh read-only GitHub evidence confirms Node24 run 34959637638 at source 41e7b0187ff97e486b019bb9d69ab2945d7bbf8a has ten successful jobs and zero annotations on all ten checks; release run 35554116040 succeeds at its recorded 7f810352ca253b9b8356f9116335cc03713adae4 source. No hosted run was triggered. Original register, frozen s04/s05/s06, portfolio JSON, production files, child reports/receipts, release/install state and all root untracked/protected branch/worktree contents remain outside the write scope.

Spec-compliance self-assessment: M4's five output obligations are represented; historical closure is not confused with new approval and open defects have testable owner contracts. This is the implementer's recommendation only. Formal CF-MB1 Code Quality is not opened before human QC Spec Compliance; no two-tier approval is fabricated from local checks. Documentation-only change needs no production TDD; integrity, text encoding, whitespace and workflow checks follow.

M4 verification completed at `2026-09-27T14:01:44.653036Z`: naming PASS (280 artifacts); governance, execution and planning PASS (276 notes each); protocol PASS (20 managed/21 legacy). Exact ID/severity/owner/route checks PASS for twenty original findings, 23 M2/six M3 routes and 15 proposal entries. All 33 terminal and four authoring receipts remain APPROVED/digest-matched. Integrity/UTF-8/whitespace PASS; 912 other tracked files, all nineteen root untracked files, 21 prior inputs, installed manifests/state and 84 SKILL bodies, the protected register/hosts/portfolio JSON, two unique-commit refs and four-worktree map remain unchanged. Scope is three audit documents only. M4 is COMPLETE_WITH_OBSERVATIONS as an audit task; master remains ACTIVE/s07 with no final DoD.


### CF-MB1 Spec Compliance review packet

This packet covers M2/M3/M4 output obligations, not remediation completion. The AI recommendation is PASS_WITH_RECORDED_LIMITATIONS: all outputs are represented and verified; missing original review inputs, actual harness precedence, ambiguous legacy outcomes and unresolved source defects retain named owners. The recorded QC decision covers these bounds and recommendations. The user explicitly replied “accept” to the request to approve CF-MB1 Spec Compliance as QC for commit 2cbc8c9. This decision was recorded at 2026-09-28T04:15:21.909852Z, after all four evidence digests and the aggregate binding revalidated. This is the UTC recording time; no platform message timestamp was available. The earlier acceptance to execute M4 was not used as a review verdict.

```yaml
review_target: CF-MB1
planning_track: full
review_mode: INDEPENDENT
review_order: [SPEC_COMPLIANCE, CODE_QUALITY]
current_stage: REVIEW_PAIR_PASSED
recommendation: PASS_WITH_RECORDED_LIMITATIONS
human_spec_compliance: PASS
code_quality: HUMAN_PASS
spec_compliance_reviewer_role: qc
reviewed_by: "human user, acting as QC in the explicit approval request"
reviewed_at: "2026-09-28T04:15:21.909852Z"
reviewed_commit: 2cbc8c9a60ccc94c64e3561ca39bb3c9c664b7ab
reviewed_s07_sha256: 7178ff0724227d05689787d841a515047034582467a54d57db4e61f212185c7b
decision_source: "User replied accept to the explicit CF-MB1 Spec Compliance/QC approval request for commit 2cbc8c9."
approval_scope: "M2/M3/M4 evidence and recorded limitations; excludes Code Quality, M5 execution, child approvals and master DoD."
source_identity: 14a5068187a6fecf22e325dfdfcdc98855c7b38a
integrated_main: a36b1852ca13dd5209fad319400e769c5b22cabf
evidence_set_sha256: 85f5eb35cb314e2b3e367789e005b524fe1911320ce88a6c78e8ea3cf618f25d
evidence_artifacts:
  - path: docs/audits/code-factory-holistic-coverage-matrix.md
    sha256: 0811ad5fe2e3423f5ff33967ca2e6bdf78f11865043477788cb7ee3f62e45e44
  - path: docs/audits/code-factory-holistic-finding-disposition.md
    sha256: 096b79be77c9161a59dec08eda2b77df0c7d15e3ec54ccb9d5a180ebffa03df7
  - path: docs/audits/code-factory-holistic-inventory.json
    sha256: 13ba3b0bb3c5f75bbf3f15bcd5c27d17e6bac4ac315751ee0ba3b4cf23cf5772
  - path: docs/audits/code-factory-holistic-legacy-document-classification.md
    sha256: ca61069c07afbb01ebe3d88a3bfd84fcd05740f0b05bb88e8687dc4fda8d05fc
binding_rule: "SHA-256 of UTF-8 lines sorted by path: <sha256><two spaces><path><LF>; all four files included. Any byte change invalidates this packet."
required_checks:
  spec_compliance:
    - "M2/M3/M4 approved outputs present; complete inventory and exactly-once finding/input authority."
    - "Each nonterminal/new observation has owner, dependency, child/proposal, next gate and closure test."
    - "Historical closure/current runtime evidence reconciled without inherited child or gate approval."
    - "R-* recovery limits, effective discovery and ownership deferral disclosed; no guessed findings."
    - "Only the granted three audit documents changed; protected register, sealed hosts, reports, receipts and root WIP preserved."
  code_quality:
    - "Opened after the recorded QC Spec Compliance PASS; evidence fidelity, stable identities and disclosed gaps."
next_human_action: "NONE for M5 audit execution; downstream child and review gates remain independent."
m5: OPEN_UNDER_APPROVED_S06
```

The binding excludes this hosting s07 file to avoid a self-referential digest; its own bytes are fixed by the review commit. Evidence includes the unchanged inventory and M3 classification as well as the two current M4 sidecars. This is the s07 batch-review decision required by s06, not a new s04 Spec receipt. The gate CLI has no CF-MB1/spec_compliance gate; no lifecycle gate was repurposed, no trusted receipt fabricated and no independent reviewer impersonated. Bound sidecars retain their pre-approval snapshot wording; this owning s07 record is the current review status. Per approved s06: “QC approves CF-MB1 Spec Compliance before Developer/QC Code Quality; M5 waits for the pair.”


#### CF-MB1 Code Quality recommendation — 2026-09-28T04:20:29.285039Z

The human QC Spec Compliance decision above opened this quality assessment. The implementer reviewed evidence fidelity, stable identities, source-of-truth ownership, readable scope and disclosed gaps against the unchanged four-artifact set `85f5eb35cb314e2b3e367789e005b524fe1911320ce88a6c78e8ea3cf618f25d` from commit `2cbc8c9a60ccc94c64e3561ca39bb3c9c664b7ab`. This is an AI self-assessment submitted for the independent human Developer/QC verdict required by s06. No subagent or independent reviewer was invented.

| Quality batch | Checks and direct result | Recommendation |
| --- | --- | --- |
| Evidence fidelity and identity | Four bound artifact hashes and aggregate match. All 126 full-read and 43 cross-boundary source hashes match; 42 inventory results agree with the coverage rows; all ten boundary assessments preserve their scope. Twenty managed reports/available s08 hashes, 48 public-document hashes and fifteen exact legacy terminal-note hashes agree with M3. All 33 terminal and four authoring receipts remain APPROVED/digest-matched. | PASS for the recorded snapshot; this does not re-run every historical diagnostic, external tool or hosted release. |
| Traceability and ownership | Twenty original IDs occur once with unchanged severity and complete owner/dependency/child-or-proposal/next-gate/closure fields. All 23 M2 and six M3 observations route once; all 15 proposal identifiers resolve. CF-023 and CI parallelisation retain their actual owners and blockers. Local Markdown path links resolve. | PASS; proposal contracts do not activate children, and M6 must still perform its bounded proposal/ownership work. |
| Reproducibility and claim limits | Fresh in-memory controls reproduce the geometry, typed-context and path-classification evidence below. The legacy traversal path model agrees with the inspected shell/PowerShell destination joins. No live hook, installer, deletion or external publication was executed. Existing MCP effect simulation remains a pinned historical diagnostic, not a new live test. | PASS_WITH_RECORDED_LIMITATIONS; unresolved source findings remain open, with security-sensitive changes independently governed. |
| Preservation and maintainability | Only this unsealed s07 host changes; all 914 other tracked paths, including the four accepted sidecars, remain unchanged. Nineteen root untracked files, protected unique-commit refs and the four-worktree map retain their exact pre-review state. Dated pending prose in bound sidecars is interpreted through this owning review record. | PASS; editing a bound sidecar later requires rebinding/review rather than silent status normalization. |

Fresh diagnostic reproduction uses the committed `packages/workflow-bundle/tests/fixtures/architecture-modeling/representative-model.json`: replace its relationships in memory with twelve copies of the first relationship, assigning distinct IDs `CQ-ROUTE-00` through `CQ-ROUTE-11`. Call `buildLayout`, flatten `edges[].path`, and compare every point with canvas bounds; call `buildDrawioXml` and `validateDrawio` without file output. The resulting architecture-model digest is `e27b8ab6db3a69d0c18f28845df18b2d309b90fe4b31e1abdbd45d47ebba5c02`, canvas 1180 by 410, eight outside points, minimum y=-40, automated PASS and overall PARTIAL. This is an equivalent fresh control, not a claim that its input is byte-identical to the earlier M2 model. An initial diagnostic used the wrong edge property (`points`); it failed before making a claim, was corrected to the actual `path` property, and the assertions then passed.

For typed context, evaluate the exact `blockers` expression in `load-workflow-context.sh` against the unchanged receipt-binding report: it returns `[object Object]`. Evaluate `tdd-track-write.sh`'s exact `isExempt` expression for `packages/workflow-bundle/scripts/example.js`, `packages/workflow-bundle/test/example.test.js`, `mcp/github-push/src/core.js`, and `scripts/example.js`: results are false/true/true/true. Resolve `../outside-sentinel` against synthetic `/synthetic/home/skills`: it escapes to `/synthetic/home/outside-sentinel`. No whole hook or installer is invoked; these controls validate the audit's bounded assertions and are not child TDD evidence.

```yaml
review_target: CF-MB1
review_stage: CODE_QUALITY
assessment_mode: AI_SELF_REVIEW
human_review_mode: INDEPENDENT
human_reviewer_roles: [developer, qc]
recommendation: PASS_WITH_RECORDED_LIMITATIONS
assessed_at: "2026-09-28T04:20:29.285039Z"
reviewed_evidence_commit: 2cbc8c9a60ccc94c64e3561ca39bb3c9c664b7ab
evidence_set_sha256: 85f5eb35cb314e2b3e367789e005b524fe1911320ce88a6c78e8ea3cf618f25d
spec_compliance_dependency: HUMAN_QC_PASS_RECORDED_ABOVE
new_blocking_quality_findings: []
human_code_quality: PASS
human_reviewed_by: "human user, acting as Developer/QC in the explicit approval request"
human_reviewed_at: "2026-09-28T04:26:38.275548Z"
approved_review_commit: 276c0c10779143fb5742acb236933986cbe195fa
approved_review_host_sha256: 198a2801fcfe0994fa5ef9468bd21f92dea9d8d6f02175e25bb18bcf7de74f18
decision_source: "User replied approve to the explicit CF-MB1 Code Quality request for commit 276c0c1."
approval_scope: "Code Quality of the bound M2/M3/M4 evidence and recorded limitations; opens M5 under s06, not child execution or master DoD."
finding_policy:
  blocker_threshold: "Authority drift, lost evidence, a wrong binding or incomplete required coverage blocks M5."
  reopen_conditions: ["Changed bound artifact", "New contradictory direct evidence", "Human reviewer rejects a stated evidence limit"]
retained_limits:
  - "R-02/R-04/R-06 original review texts unavailable; R-01/R-03 only their recorded claims revalidated."
  - "Effective harness precedence and final identity remain M10; source/source-copy parity does not prove live selection."
  - "Source defects, ambiguous legacy outcomes and language/current-doc remediation remain owned follow-up work."
  - "Historical hosted/registry evidence was not queried again in this quality-only continuation."
next_human_action: "NONE for M5; CF-MB2 and all applicable child gates remain separate."
m5: OPEN_UNDER_APPROVED_S06
```

Verification of this review-record change at `2026-09-28T04:21:00.823114Z`: targeted naming/governance/execution/planning PASS (8 notes); repository-root protocol PASS (20 managed / 21 legacy). Both new review YAML blocks parse with Ruby Psych; strict UTF-8, whitespace, digest/route/link and preservation checks PASS. A first protocol invocation at the item directory enumerated zero items and was not counted as evidence; the corrected work-items root produced the actual 20/21 result. No production behavior changed; production unit/build, new security scans, release/install and worktree-cleanup runs are outside this delta. The evidence-hash, route, receipt and preservation checks above validate the existing review subject; targeted workflow/encoding checks validate this record before handoff. Master remains ACTIVE/s07 with no final DoD.


Code Quality human PASS recorded at `2026-09-28T04:26:38.275548Z` after the explicit “approve” response and read-only revalidation of commit `276c0c1`, its host SHA-256 and the four-artifact set. This UTC timestamp records the decision; no platform message timestamp was available. CF-MB1 now has the required ordered human QC Spec Compliance and Developer/QC Code Quality decisions, opening M5 under the already approved s06.

The immutable CF-MB1 evidence is resolved from reviewed commit `2cbc8c9a60ccc94c64e3561ca39bb3c9c664b7ab`; Code Quality recommendation/approval subject is `276c0c10779143fb5742acb236933986cbe195fa`. Subsequent M5-M9 additions to the owning sidecars are new working evidence, not bytes approved by CF-MB1; CF-MB2 will bind that later snapshot. The recorded four hashes are retained and verified against their Git objects. No prior approval is silently applied to changed content.


## M5 handoff and M6/M8 preparation — 2026-09-28

The explicit CF-MB1 Code Quality approval above opened M5 under sealed s06. The current branch is based on integrated main `a36b1852ca13dd5209fad319400e769c5b22cabf`; collection source is `276c0c10779143fb5742acb236933986cbe195fa`. All collection and authoring stayed in the existing master; no child or deployment lane was activated.

| Task | Current audit-task assessment | Evidence / remaining boundary |
| --- | --- | --- |
| M5 | COMPLETE_WITH_OBSERVATIONS | Read actual child reports, applicable s04–s08 scope/coverage/decisions, 37 applicable matching receipts and source ancestry. RCR/SA-TA/CR-008/Node24 completion retained; adapter's five valid authoring receipts do not provide activation, baseline amendment or Playwright launch proof. Test residual is AC-002/AC-003, not superseded rollback AC-001. Finding-disposition owns exact identities and next gates. |
| M6 | COMPLETE_WITH_OPEN_DECISIONS | Fifteen existing proposal IDs refined with bounded prospective ownership, stable route/role/gate reasons, ordered review, verifier, negatives and rollback. No child files/grants/receipts created. Conditional choices/destinations require independent owner intake, not a placeholder Task Plan pass. |
| M7 | NOT_RUN | Existing deterministic 15-pair sample/rubric retained. Full mandatory public/CLI surfaces, EN/VI scoring and applicable BA/QC evidence remain the next master task; semantic coverage and UTF-8 are not language scores. |
| M8 | COMPLETE_WITH_OPEN_DECISIONS | Three decision-ready briefs for memory, calibration and Rationalizations. Named owner decisions remain pending; trial/rollout closure and prior-plan checkbox truth preserved. |
| M9 / CF-MB2 | NOT_OPENED | Waits for M7 evidence. It reviews handoff fidelity, not final remediation or approval of every proposal. |
| M10/M11 | NOT_OPENED | Independent ordered CF-MB2 pair, child integration/identity and final coverage prerequisites remain. |

The [finding-disposition](../../docs/audits/code-factory-holistic-finding-disposition.md) owns M5 exact handoffs and M6/M8 details; [coverage](../../docs/audits/code-factory-holistic-coverage-matrix.md) links task evidence without creating another ledger. The original register, inventory, legacy classification, language rubric, frozen s04/s05/s06, portfolio JSON, reports, receipts, production source, installed bundle and root WIP are preserved. CF-MB1 hashes are checked through their immutable reviewed Git objects; new sidecar bytes require CF-MB2 binding and do not change the historical human decision.

Early review sequence: AI Spec Compliance checked M5 read-only boundaries, completed-child precedence, M6 proposal-only scope, M8 pending-owner semantics and exact s06 dependency order; then AI Code Quality checked source identities, applicability codes, concrete file paths, links, duplication and preservation. These are implementer assessments for the current audit delta, not the independent human CF-MB2 pair. Review corrected the old CF-005 AC citation and draft proposal filenames before handoff. No blocking scope defect remains in the authored handoff; source defects and unselected owner decisions retain their explicit open status.

No further human approval is required merely to prepare M7 under this already approved master Task Plan. Separate owner decisions in M8 and child admission/authoring gates cannot be supplied by a general master continuation. Master workflow remains ACTIVE/s07; final work-item DoD has not passed and all retained worktrees stay HOLD_OPEN.

Artifact verification at `2026-09-28T04:43:40.286668Z`: full naming PASS (280 artifacts); governance/execution/planning PASS (276 notes each); protocol PASS (20 managed / 21 legacy skips), using Node 22.23.2 and the repository `work-items` root. Integrity PASS: twenty original finding IDs/severities preserved, 23 M2/six M3 routes, fifteen unique proposal contracts, 85 expanded prospective paths checked (three explicitly new tests), 21 stable role/gate/hard-trigger codes checked against the executable router, local Markdown links and strict UTF-8/whitespace valid. All 37 applicable child receipts and four master authoring receipts are APPROVED/digest-matched; the additional legacy Contract probe is explicitly not_applicable. Child report/host hashes, three original optional-plan hashes and both historical CF-MB1 review bindings match. The three owned files are the entire diff; 912 other tracked files, all 19 root untracked files, four-worktree map and main/two protected branch refs retain the captured state. A proposed product-thinking agent metadata path was absent and removed from the final allowlist; its absence did not justify creating it.

Validation reproduction: run `node packages/workflow-bundle/bin/wfc.js <naming|governance|exec|plan|protocol> --workflow-root work-items --project-root .` for each command; query each M5 table gate with `gate status` at its owning project; compare report/host hashes with the M5 ledger and source ancestry with `git merge-base --is-ancestor <source> main`. Resolve the four CF-MB1 files via `git show 2cbc8c9:<path>` before hashing, not their later working copies. Production unit/build, live security scanning, browser launch, hosted jobs, installation and release reruns were not executed for this documentation-only delta. This verifies the audit handoff, not the unresolved source fixes or final DoD.


## M7 results and M9 CF-MB2 Spec Compliance packet — 2026-09-29

The human-passed CF-MB1 pair opened the M5–M9 authoring work already authorized in s06. Source collection for this packet is `f42f4631e20e60b64c489c496bab057f246226b5` on integrated main `a36b1852ca13dd5209fad319400e769c5b22cabf`. This section supersedes the earlier M7 NOT_RUN/M9 NOT_OPENED checkpoint; it does not rewrite historical approval bindings.

M7 evidence collection is COMPLETE_WITH_FINDINGS. The [language assessment](../../docs/audits/code-factory-holistic-language-review.md) owns the mandatory allowlist, sampling, every read scope/hash/excerpt, eight missing VI counterparts and scores. AI result is **FAIL**: 147 scored units, mean 3.5361/5, 41 critical source-unit flags and minimum dimension 2. All 64 declared mandatory source units were inventoried (two N/A); available sample coverage is 40/40 files. These counts do not mean all files were fully read: 68 full-file units, 38 CLI projections and 41 targeted scopes are distinguished. Source repairs remain separately owned; no human BA/QC language verdict is invented.

M9 is now PREPARED_FOR_REVIEW, conditional on applicable BA evidence. The following implementer Spec Compliance recommendation covers audit/handoff fidelity across all eleven ACs. It is not an independent human review, source-quality PASS, final acceptance or DoD. Per sealed s06: “CF-MB2 evaluates audit/handoff fidelity, not final remediation completion.” The [coverage matrix](../../docs/audits/code-factory-holistic-coverage-matrix.md) retains final acceptance status: AC-CF-007/011 FAIL, the other nine PARTIAL.

| Acceptance coverage | Audit-fidelity recommendation and evidence | Outstanding final delivery requirement |
| --- | --- | --- |
| AC-CF-001 | REVIEWABLE: M2 owns 42/42 semantic skill assessments and cross-boundary evidence; M7 supplements language without relabeling scoped reads. | Independent corrections, integrated identity and M11 final recount/verification. |
| AC-CF-002/003 | REVIEWABLE: M3/M4 preserve input authority, twenty original finding rows and severity; M5/M6/M8/M7 enrichment gives existing/proposed owners, decisions, dependencies and closure checks. Fifteen proposal IDs remain stable. | Missing original reviewer text and M8 decisions remain explicit; proposed children need separate admission and actual closure evidence. |
| AC-CF-004 | REVIEWABLE: M5's 37 applicable child receipts stay historical evidence; four master authoring receipts were freshly rechecked. No child grant, report or receipt changed. | Future child activation/integration must retain independent authority; this packet cannot supply it. |
| AC-CF-005/009 | REVIEWABLE: M4/M5 distinguish source, published candidate, hosted runs and installed copies. M7 stale-doc excerpts are wording evidence, not a reopened release or new registry query. | M10 exact identity, effective discovery and repeated build/canonical-content evidence remain unmet. |
| AC-CF-006/010 | REVIEWABLE: M2 negatives/standard-path gaps remain explicit; M6 identifies fail-first child tests. M7 semantic overlap routes to those owners, not a parallel prose fix. | Registered child negatives and operative runtime applicability verification still required. |
| AC-CF-007 | CONDITIONAL_ON_BA: finite mandatory allowlist, deterministic sample, missing translations, critical-first five-dimension scores and reproduction are present; AI rubric FAIL is retained. QC can independently recompute all arithmetic. | Human assessment review, approved corrections and passing language recheck. Audit acceptance must not waive the rubric. Interaction friction is qualitative; user/latency measurements were not performed. |
| AC-CF-008 | REVIEWABLE: M3 classified 21 legacy subjects; M5/M8 distinguish completed, actionable and ambiguous work; root WIP and all four worktrees preserved. | Owned disposition/legacy handling and final zero-unexplained-state evidence. |
| AC-CF-011 | REVIEWABLE: M3's 26 CURRENT/22 HISTORICAL public subjects and M7 exact stale-current claims are reconciled. P-PUBLIC excludes historical rewriting and CLI JS edits. | Independently approved CURRENT-only corrections, EN/VI recheck and actual released/installed parity. |

Requested human review can be handled in one response with **two explicit decisions**: (1) BA accepts or corrects the accuracy/scope of M7's assessment, including its FAIL and missing translations; then (2) QC passes or rejects CF-MB2 Spec Compliance for the bound audit/handoff evidence. This bundles the interaction only; it does not infer one role's decision from the other or open Code Quality before QC PASS. If BA requires changes, rebind the affected evidence and keep QC pending. No approval of new child Task Plans, M8 option selection, Release, remediation completion, M10 or DoD is requested.

### Immutable evidence set for human review

The five sidecars below form the review subject. Hash the sorted UTF-8 lines `<sha256>  <relative-path>\n` to reproduce the aggregate. This s07 host is excluded to avoid a self-referential digest; the final Git commit fixes its bytes and the entire review request. The historical CF-MB1 set is still resolved at its original reviewed commit, not these changed files.

| Artifact | SHA-256 |
| --- | --- |
| `docs/audits/code-factory-holistic-coverage-matrix.md` | `f8ba523fb4b62cc381b41f11bade8515b10a3d993061aeb7637fe5202bbb489f` |
| `docs/audits/code-factory-holistic-finding-disposition.md` | `de57158ede15aac66dbfadc60a2f52d8422a6c664dd52166bc937de8d2ebcdd7` |
| `docs/audits/code-factory-holistic-inventory.json` | `13ba3b0bb3c5f75bbf3f15bcd5c27d17e6bac4ac315751ee0ba3b4cf23cf5772` |
| `docs/audits/code-factory-holistic-language-review.md` | `d86db008e2c03273feafef7a46e654299cdb6c69414a32f32e6e154a61936773` |
| `docs/audits/code-factory-holistic-legacy-document-classification.md` | `ca61069c07afbb01ebe3d88a3bfd84fcd05740f0b05bb88e8687dc4fda8d05fc` |

```yaml
review_target: CF-MB2
review_stage: SPEC_COMPLIANCE
assessment_mode: AI_SELF_REVIEW
human_review_mode: INDEPENDENT
source_commit: f42f4631e20e60b64c489c496bab057f246226b5
evidence_set_sha256: c2ce527e14b26266ead33c44d8e87ff2a8ed7682b57158405ae9a193d74c4986
recommendation: REVIEWABLE_CONDITIONAL_ON_BA_ASSESSMENT_REVIEW
human_ba_assessment: NOT_REVIEWED
human_qc_spec_compliance: NOT_REVIEWED
human_code_quality: NOT_OPENED
language_rubric_ai_result: FAIL
final_acceptance_pass: false
m10: NOT_OPENED
m11: NOT_OPENED
next_human_action: "BA reviews M7 assessment accuracy; then QC decides CF-MB2 Spec Compliance on the bound set."
```

Authoring review first checked the approved scope, no gate inference, unchanged authoring hosts and source-tier distinctions; editorial/integrity checks then found and corrected draft handoff overreach: CLI `bump-version.js` belongs to independent P-LANGUAGE maintenance intake, not P-PUBLIC docs scope; `tdd-track.sh` is a proposed P-HOOKS extension needing its own grant. EN broken catalog/SDD tables were distinguished from the corresponding intact VI table and its separate missing-Light content. These checks prepare a readable packet and do not constitute CF-MB2 Code Quality review. That stage remains closed until the human QC Spec Compliance verdict.

Artifact verification at `2026-09-29T02:05:42Z`: full naming PASS (280 artifacts), governance/execution/planning PASS (276 notes each), protocol PASS (20 managed / 21 legacy skips), using Node 22.23.2 and `work-items` as the root. Fresh Spec/DoR/Approach/Task Plan status reads each return APPROVED and digest_match=true. Coverage/arithmetic/source verification PASS: 147 distinct score rows, exact full-file SHA-256 against source Git objects, exact excerpt lines, bounded read ranges, 64 mandatory inventories, 15 sampled subjects/40 available files/eight disclosed absent counterparts, 2,560 CLI projection rows. No source was changed to improve a score.

Preservation checks PASS: exactly four owned Markdown files changed, all 911 other tracked files and 19 root untracked files retain captured hashes; main, backup/local-main-2026-09-16 and evals/behaviour-axis retain exact refs; the four-worktree map is unchanged before the audit commit. The original protected register, frozen s04/s05/s06, portfolio JSON, child reports/receipts and source/install/release content are untouched. Twenty original finding IDs/severities and fifteen proposal IDs are preserved. Strict UTF-8, local Markdown links and whitespace checks pass. No branch/worktree was finalized or removed.

Reproduce workflow checks with `node packages/workflow-bundle/bin/wfc.js <naming|governance|exec|plan|protocol> --workflow-root work-items --project-root .`; run each command independently. Reproduce source/score and sampling checks by the language owner's method; compare non-owned paths with source commit and captured root-WIP manifests. Read master authoring evidence with `wfc gate status --work-item code-factory-holistic-audit-remediation --gate <spec|dor|approach|task_plan> --project-root . --json`. The status probe with `--help` alone returned a missing-work-item error and is not evidence; four explicit queries above succeeded. No unit/build/security/browser/hosted/install/release run was required or performed for this audit-document delta. Those checks remain independently required where the eventual child or final portfolio scope calls for them.

Master protocol remains ACTIVE/s07; the current router handoff is WAITING_APPROVAL for applicable BA/CF-MB2 Spec Compliance review. No lifecycle transition or trusted receipt is manufactured for an s07 batch review. No CF-MB2 Code Quality or M10/M11 result is claimed.


## Selected priority-one correction intake — 2026-09-29

The user selected incorrect action/authority/approval guidance, then explicitly continued. The existing M6 disposition owner now contains the concrete eight-file correction boundary, six draft acceptance criteria, three-match dedup assessment and exact maintainer actions. Candidate `correct-workflow-authority-guidance` has a separate worktree/branch from main and a CLI-generated PROPOSED report only. It is not ACTIVE, approved or scaffolded into s01–s08; no source correction has started. Existing P-SEM owns semantics with P-LANGUAGE coordination for DoD/EN-VI, preserving all other proposal owners.

The source materializer stopped on a three-item near-match review. Manual evidence distinguishes an empty example and two archived delivery scopes; the runtime still requires signed maintainer disposition of one blocker and two follow-up entries. The [owning proposal](../../docs/audits/code-factory-holistic-finding-disposition.md#selected-authority-guidance-correction--2026-09-29) provides concrete reasons, immutable source hashes and the human-terminal helper. No gate signer was invoked by the agent; no receipt was fabricated or state entry manually removed.

The original CF-MB2 review request remains bound to commit `499ee1cf5c3dee67d262644f3d0a33e4c101c46f`, including that commit's s07 host and five sidecars. This later M6 intake evidence is a separate pending addition; it must be rebound before a revised CF-MB2 request. M7 remains AI FAIL, applicable human language review remains pending, and the child gate path is independent of portfolio audit acceptance. Root WIP, the original four worktrees, protected refs/hosts/register and global 2.6.3 are retained; adding the child authoring worktree makes five, all HOLD_OPEN.


Intake verification at `2026-09-29T09:22:40Z`: master naming/governance/execution/planning PASS against the actual audit worktree (8 notes). An initial invocation resolved the root clone; its result was not used for the changed audit files and the explicit worktree checks above replaced it. Child repository protocol validation is **FAIL / NOT_READY** because the PROPOSED report has no s01 note; this is retained as the current pre-materialization gap, not bypassed by hand-scaffolding or omitted from results. After signed dedup recovery, rerun protocol and all applicable authoring validators against the child before requesting approval.

Preservation/content checks PASS: exactly two owned master files changed and one CLI-generated proposal report was added in the child; all child tracked source bytes and the other 913 master tracked files match the captured source. All 19 root untracked files, the four pre-existing worktree heads, main and both one-unique-commit backup/evals refs are preserved. Three proposed human commands match the report's exact state IDs, have distinct canonical operation UUIDs and bind their stated reasons; no approval passphrase is supplied by the agent. UTF-8, local Markdown links and whitespace pass. No production code, semantic test, generated runtime, installed file, review receipt or original register was edited. Unit/build/hosted tests are not claimed for an intake-only change. The unresolved admission and human gates prevent any implementation or completion verdict.


Final admission-command review caught a concrete draft error before user execution: the three original commands used stable `se:` entry IDs, whereas `selectDispositionTarget` requires snapshot-bound `di:` IDs. The disposition owner now supplies a single reviewable human-terminal helper which reloads the report and resolves each intended entry before every signed CLI call. It retains the three distinct operation UUIDs/reasons and retries already-recorded operations only through CLI verification. The source parser and a read-only simulation verify fresh selection across all three in-memory snapshots; no signer, receipt write or real report mutation is part of that check. The earlier stable-ID comparison alone was insufficient and is superseded by this selector-level check. Actual admission remains PROPOSED and protocol verification remains NOT_READY pending human disposition and materialization.

## Authority-guidance implementation checkpoint — 2026-10-04

Current integration snapshot: 2026-10-05. Child `correct-workflow-authority-guidance` is DONE/s08 at `46d3ef5810b834eda5d4a4541b5cdc47523e5c72`; the normal CLI close completed at 2026-10-05T03:03:52.566Z. Its source checkpoint remains `fcff3b4d53f7fbed76ec78788dd8e20b73447ac6`. Child s07 owns implementation/ordered developer review; signed s08 owns the six-criterion verification and accepted bounded language assessment. The current report owns the later protocol closure. The pre-signature snapshot in immutable s08 is intentionally retained.

[PR #14](https://github.com/haonh87/Code-Factory/pull/14) now proposes integration into main. Fresh `git fetch --all --tags` confirms base `a36b1852ca13dd5209fad319400e769c5b22cabf`, seven child commits ahead with no divergence. The 18-file delta consists of eight declared EN/VI sources, one focused regression and nine child artifact/report files. None collides with the 19 root untracked files. GitHub reports MERGEABLE. Review examined spec compliance first (AC-AUTH-001..006 and the declared boundary), then code quality (fixed local inputs, in-memory mutations, unchanged runtime/CLI contracts); no additional blocking defect was identified in that bounded diff. Static prose guards do not prove arbitrary natural-language equivalence.

Integration checks PASS on that exact head: naming/governance 288 files/284 notes; SDD 57; change 58; execution/planning 284 notes each; protocol 21 managed items and 21 configured legacy skips. Strict UTF-8/no BOM/no replacement characters and git diff --check pass for all 18 incoming files. The six trusted signatures and current host hashes pass again; no repeat signing is needed. Existing source evidence remains 46 unit test files PASS, 56 focused checks PASS/48 negative mutations rejected, local runtime generation and pack audit PASS. The accepted scanner limitation remains explicit in child s08. No local source suite rerun was needed because fetched main and reviewed source bytes are unchanged.

Hosted CI: [Workflow Guardrails run 37317806269](https://github.com/haonh87/Code-Factory/actions/runs/37317806269) completed all ten jobs successfully, including exact-candidate Node 18/22; the last job finished at 2026-10-05T13:36:23Z. GitHub now reports CLEAN/MERGEABLE. The repository owner explicitly replied “accept đề xuất” to the request to review/approve PR #14. This acceptance is recorded at 2026-10-05T13:59:26.616811+00:00 (recording time, not a claimed chat timestamp) against unchanged head `46d3ef5810b834eda5d4a4541b5cdc47523e5c72` and base `a36b1852ca13dd5209fad319400e769c5b22cabf`. It supplies the human integration decision required by CONTRIBUTING.md; the agent does not submit a GitHub review under the human identity. Finish decision is MERGE_ALLOWED for that exact head after all ten CI jobs and all six trusted receipt checks passed. PR #14 was merged at 2026-10-05T13:59:43Z as `f27093d06ecab43f40d481542e1be5f49bf279cc`. Local main was fast-forwarded after a path-collision check. Both merge parents are the reviewed base/head, and the merge tree equals the reviewed child tree. Post-merge [main CI run 37321135379](https://github.com/haonh87/Code-Factory/actions/runs/37321135379) is successful. Archive and cleanup remain separate. Child DoD is complete and needs no repeat approval.

The [disposition sidecar](../../docs/audits/code-factory-holistic-finding-disposition.md#router-vi-signed-recovery-and-authoring-review--2026-10-06) owns the next M7 boundary and its current signed-recovery evidence: M7-L14 router VI Light-host guidance. Child `correct-light-router-vietnamese-guidance` is now MATERIALIZED/s01, PENDING_REVIEW, no_conflict, with no current admission blockers and no granted write paths. Its draft authoring checkpoint is `ef8bf47e3c4b1c1a2450c7f24ce628dacc1cac3f` on `fix/light-router-vietnamese-guidance`, based on integrated main `f27093d`. Three actual Maintainer admission signatures were verified before the normal CLI recovery and reverified on 2026-10-06. The report and s01 protocol projection were not manually edited. The user explicitly accepted work-item approval, Spec, DoR, Approach A and Task Plan at the reviewed packet `ef8bf47`; the decision was recorded at `2026-10-06T06:28:40Z`. Finalized child authoring checkpoint `cd0454738684f2b1bb6d84a05f698f08a6453d7f` records the accepted decisions and gate metadata; the work-item trusted receipt is now valid after the human run, while four authoring receipts remain MISSING pending the corrected signing retry. Admission/general continuation is not used as a substitute for that explicit acceptance. Full/default/agentic remains the admitted profile. No source or test implementation has started. P-INSTALL retains its separate portfolio P0 status and owner decision; this follow-up does not reprioritize that security work.

Only this existing progress section and the granted disposition sidecar change in the parent. Frozen master hosts, protected register, portfolio and M7 score ledger remain unchanged. The original CF-MB2 request remains bound to commit `499ee1cf5c3dee67d262644f3d0a33e4c101c46f`; these later integration/intake records require rebinding before any revised request. M7 remains FAIL and M10/M11 are unopened. All five original worktrees, protected unique-commit refs, 19 root untracked files and installed/released 2.6.3 remain preserved. A sixth in-repository worktree isolates the new proposal; no existing worktree was removed.

Parent checkpoint validation (2026-10-06): naming/governance/execution/planning each PASS for eight notes; YAML, UTF-8, local links and diff checks PASS. Hash comparison permits exactly these two owned progress/disposition changes and preserves the other 913 parent tracked files. No parent source behavior changed.

The earlier pre-recovery missing-s01 protocol failure is resolved: current child full-root protocol validation PASS covers 22 managed items and 21 configured legacy skips. Naming/governance/execution/planning each PASS for eight child draft hosts. The prior zero-item child-folder invocation remains excluded from evidence. Three admission signatures are valid, and all four authoring gate reviewer/timestamp fields now record the explicit acceptance. Their four trusted receipts remain pending; the independent work-item receipt is now valid. Child YAML/UTF-8/local-link/diff checks pass; all 924 other previously tracked child files retain their captured hashes. No unit/build/runtime/install/release check is claimed for this authoring-only delta. The existing successful main CI relates to the already integrated previous child, not the new draft approval. All six worktree paths, root WIP and protected refs are preserved; only owning branch checkpoint commits advance.


Router VI approval checkpoint — 2026-10-09: [the existing disposition sidecar](../../docs/audits/code-factory-holistic-finding-disposition.md#router-vi-accepted-authoring-gates-and-signing-handoff--2026-10-09) retains the concrete human-terminal helper and current missing-receipt state. No additional content approval is requested. The helper's actual read-only preflight and JS/shell syntax pass; no signer was invoked by the agent. The finalized child governance check exposed an option-list shape mismatch, corrected without changing the three options or accepted design. Child s06 owns that format correction and human decision. Source implementation and the child regression remain NOT_STARTED.

Preservation checks allow exactly the eight child note metadata/handoff updates and these two parent progress/disposition paths: the other 925 child tracked files (including the CLI report), 913 parent tracked files, all 19 root untracked files, main/protected backup/evals refs and six worktree identities remain unchanged. The child CLI protocol projection is byte-preserved before human signing. All accepted criteria, exact task definitions and verification commands match the reviewed packet. Parent naming/governance/execution/planning and YAML/UTF-8/link/diff checks pass; no parent source, score, receipt, frozen host or protected register was edited. Current source grants remain empty, so implementation waits for the normal receipt verification and activation path.


Router VI signing checkpoint — 2026-10-10: the real work-item receipt was verified APPROVED with a valid signature, recording time `2026-10-10T05:50:54.490Z`. The user's normal CLI run updated the child's report and s01 protocol projection; the parent preserves those bytes and the unchanged finalized s04/s05/s06 hosts. Spec/DoR/Approach/Task Plan receipts are MISSING, so no implementation grant or source change is opened.

The agent-prepared helper failed after that first signature because legacy CLI normalization removes two duplicate top-level profile fields while preserving the candidate profile. The [disposition owner](../../docs/audits/code-factory-holistic-finding-disposition.md#router-vi-signing-retry-correction--2026-10-10) now records the cause, corrected helper and retry command. The original identity digest remains pinned; the helper reads only the two absent duplicate fields from the unchanged unique candidate and rejects explicit or nested drift. Original failure reproduction, four valid shape controls, ten negative mutations and actual read-only helper preflight pass. The existing work-item signature is skipped on retry; only the four-gate ready bundle requires the human's terminal/passphrase. No repeat content approval is requested.

Current preservation/validation: child naming/governance/execution/planning and full-root protocol checks pass; parent naming/governance/execution/planning, YAML/UTF-8/local-link/diff checks pass. Every captured child file, including the human-written report/projection, is byte-preserved by the agent; exactly the two granted parent progress/disposition files change, preserving 913 other tracked parent files. Root's 19 untracked files, all six worktree identities, main and protected backup/evals refs remain unchanged. No signer, receipt mutation, source test, runtime generation, release/install or cleanup ran. Parent M7 stays FAIL and M10/M11 remain unopened.


Router VI implementation checkpoint — 2026-10-10: the human retry completed all four authoring receipts; together with work-item approval, all five trusted signatures/current host digests verify. Normal source CLI activated the exact five grants at `2026-10-10T06:04:27.108Z`. Child commit `4a3458cefcefe9b3b80542e3d66c4c0deb779692` contains the two VI insertions, new focused test, CLI-owned report/projection and s07/s08 evidence. T1–T4 technical work is complete: actual two-failure RED, 31-check GREEN/22 rejected mutations, 47 unit files PASS, pack/workflow/encoding/preservation checks PASS. The [disposition owner](../../docs/audits/code-factory-holistic-finding-disposition.md#router-vi-implementation-and-bounded-review--2026-10-10) links the exact child s08 packet and attributes every changed path.

The human accepted T5 bounded BA/QC review at implementation checkpoint 4a3458c; the decision is recorded at 2026-10-10T06:22:24Z in child checkpoint `71b0c11e6811c5f276cd04291043fadb3dfa8b60`. The two hashed EN/VI units retain accepted mean 4.6, minimum 4 and zero critical flags; no source, excerpt or score changed. Normal CLI verify at 2026-10-10T06:24:25.503Z set VERIFIED/s08. All five ACs and six technical DoD checks pass. The user subsequently accepted the separate human QC DoD request against 71b0c11 and instructed continuation. Decision-recording time is 2026-10-10T12:12:04Z. Finalized child checkpoint `ed5704d876cf6297b36e27e402bd2267cfebb23c` records approved s08 and the human DONE content verdict; protocol remains VERIFIED/s08 pending the trusted DoD receipt. The disposition owner links the frozen host/hash and the verified signing helper. Next action is human-terminal sealing of the accepted decision, signature/current-digest verification and normal CLI close; no repeat content approval is needed. No authoring reapproval or helper retry is needed. Parent M7 remains FAIL; protected register, frozen parent gates, score ledger, original CF-MB2 binding, release 2.6.3 and all retained user work are unchanged. M10/M11 stay unopened; no merge, archive or cleanup occurs.
