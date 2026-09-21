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
> Master activated at s07 with six approved audit-only roots. M0 admission and M1 inventory
> are complete: 42 canonical skills, seven groups, 227 supporting files and eight surface families.
> M2 now records 25/42 canonical skill reads, 25/69 operative English refs, 13 agent files
> and three scripts; M3 classifies 16 legacy entries and starts a 27-document allowlist. Both
> installed harnesses remain 2.3.2/40; full semantic, prior-plan, language and final identity review remain open. No child production or release authority is inherited.

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
