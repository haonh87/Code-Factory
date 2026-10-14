---
artifact_id: "contain-legacy-codex-installer-paths.s08.verification"
artifact_family: workflow-step
work_item_slug: "contain-legacy-codex-installer-paths"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: BUG
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
  card: "product-specs/cards/contain-legacy-codex-installer-paths.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "ta"
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract: []
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
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
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "contain-legacy-codex-installer-paths.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 — Verify + DoD

> [!summary]
> Technical acceptance PASS: 207/207 hosted integration cases at one source commit, plus 47 unit test files across documented environment setup/retry runs. Human DoD and Business Acceptance remain pending. Automated lint/security scanners were unavailable; the scan is PARTIAL with explicit manual-review evidence and limitations.

## Step Contract

```yaml
step_goal: "Verify AC-PI-001..006 against source-bound cross-platform evidence and request human closeout."
input_summary: ["Approved spec and s04/s05/s06", "s07 implementation and RED/GREEN evidence"]
output_summary: ["AC coverage", "regression results", "scan limits", "DoD recommendation"]
done_when: ["Evidence is complete and reviewed; human terminal gates control final closure."]
owner: qc
```

## Main Artifact

```yaml
verification_target: "Direct Bash/PowerShell installer containment at 0e6392f2f3351890f88b40cfd16a3efbd49048f8"
risk_ranked_test_matrix:
  - risk: "Malformed names and aliases reach destructive targets"
    severity: HIGH
    required_evidence: ["Nonzero rejection before all mutations", "Before/after target and sentinel inventory", "Native platform alias fixtures"]
  - risk: "Valid installs regress"
    severity: HIGH
    required_evidence: ["First/repeat installation", "Legacy migration/current precedence", "Encoding compatibility", "Unmanaged preservation"]
test_strategy:
  unit_test:
    required: true
    rationale: "Pure lexical rejection plus existing workflow-bundle regression suite."
  integration_test:
    required: true
    rationale: "Native filesystem operations, link metadata and actual entry points cannot be proved by mocks."
  database_test:
    required: false
    rationale: "No database changes."
  feature_test:
    required: true
    rationale: "Hosted fixtures execute unchanged copies of the actual candidate entry points."
negative_cases: ["Traversal and separators", "Reserved/equivalent names", "Duplicate manifests/source basenames", "Aliases/reparse points/junctions", "Wrong node types", "Hard-linked outputs", "NUL/invalid UTF-8/bare CR"]
regression_targets: ["First/repeat install", "Current precedence", "Legacy fallback", "BOM/LF/CRLF/no-final-newline", "Stale cleanup", "Unmanaged and outside sentinels"]
manual_exploration:
  flows_checked: ["Ordered spec compliance then code quality", "All mutations after preflight", "Fixture ownership and no-follow cleanup", "Unchanged optional drive-root block"]
  issues_found: ["Bare CR accepted by both initial parsers; reproduced RED then corrected and GREEN."]
criteria_results:
  - criterion: "AC-PI-001"
    result: PASS
    evidence: "Run 38515427610: Malformed current/legacy records, duplicate/late-invalid records, byte/encoding negatives."
  - criterion: "AC-PI-002"
    result: PASS
    evidence: "Run 38515427610: Root/skills/policy/manifests/skill/nested/dangling aliases, Windows junction and hard-link fixtures; snapshots unchanged."
  - criterion: "AC-PI-003"
    result: PASS
    evidence: "Run 38515427610: Nine valid-install controls per platform, stale cleanup and sentinel preservation."
  - criterion: "AC-PI-004"
    result: PASS
    evidence: "Run 38515427610: Duplicate source basename and invalid source-name fixtures; raw manifest duplicates."
  - criterion: "AC-PI-005"
    result: PASS
    evidence: "Run 38515427610: Three source-bound job artifacts, complete 69-case inventories, RED/GREEN provenance."
  - criterion: "AC-PI-006"
    result: PASS
    evidence: "Run 38515427610: Negative exit plus error context and complete before/after snapshots, prior to optional drive-root code."
test_evidence:
  unit_test: ["47 workflow-bundle test files PASS across the build/setup/retry runs described below", "Pure lexical UNC/drive tests avoid filesystem/network resolution"]
  integration_test: ["38515427610: 69/69 per platform; no setup errors, cleanup errors or missing cases"]
  database_test: []
  feature_test: ["Actual native script copies hashed against each checkout before execution"]
commands_run: ["node --check integration runner", "bash -n installer", "GitHub hosted integration commands from s05", "runtime sync then unit runner in temporary snapshot", "naming/governance/exec/plan/protocol", "workflow pack audit", "YAML/UTF-8/diff checks"]
skipped_checks: ["Local Windows execution: no local PowerShell; real Desktop 5.1 CI covers it", "ESLint/ShellCheck/Semgrep: unavailable; no lint wrapper or new dependencies installed"]
release_blockers: []
status: PASS
gaps: ["Human DoD and Business Acceptance are pending; scan tooling limitations require reviewer acknowledgement."]
residual_risks: ["No concurrent hostile writer guarantee", "Post-preflight I/O failure can leave partial installation", "Alias/custom-name rejection is intentional compatibility tightening"]
recommendation: "Accept technical evidence and request QC DoD / PO Business Acceptance; keep branch and worktree open."
notes_for_review: "PASS describes acceptance evidence, not human gate approval or a claim of full security assurance."
```

## Source-Bound Evidence

Final tested source: `0e6392f2f3351890f88b40cfd16a3efbd49048f8`. [Final GREEN run](https://github.com/haonh87/Code-Factory/actions/runs/38515427610): Linux, macOS and Windows each pass 69/69 cases plus four harness-refusal checks. All report capability preflight PASS and zero unexecuted/setup/cleanup errors. Artifact names include platform, full SHA, run ID and attempt; retention is 14 days per the approved workflow.

| Platform | Summary SHA-256 | Local retained evidence |
| --- | --- | --- |
| Linux | `5ef2d12e69b48e52c5c0d78d2cef017fa9373c0fcb37b21aefa8ad64ed578195` | `/tmp/p-install-green-38515427610` |
| macOS | `a55f508de5d39a852d33d0a36a7fa3b131fa5d286d3860dca426d9f032f4b6ea` | Same artifact download root |
| Windows | `de2c6c549654ebb15883500b0641af9f26363929fb9a2144da4daf5516f23e5e` | Same artifact download root |

The executed-copy hash is checked against the platform checkout. Linux/macOS script and workflow digests match local LF bytes. Windows Git checkout uses CRLF; its recorded script `9144696dfaccbe0fc11ef3eacc4ee5a8a0cecefab0710ae0b9ee63cb67247df2` and workflow `f4dce46dbeb70ed696c1b404fbcef238eef4f1e489452e1628355fa1fdd451c8` match the exact CRLF checkout form of the same committed blobs. No installer source transformation occurs in the fixture.

[Original RED](https://github.com/haonh87/Code-Factory/actions/runs/38512210399) at `5165c9b`: all 62 cases executed per platform, positive controls passed, with containment/encoding failures. [Encoding RED](https://github.com/haonh87/Code-Factory/actions/runs/38515188320) at `71f7014`: exactly the two bare-CR cases failed on every platform. The earlier Windows cross-volume hard-link setup failure at run `38407996492` is explicitly excluded from RED evidence.

## Unit and Build Evidence

The first direct unit-runner invocation in the isolated worktree failed six release/runtime tests because generated `packages/workflow-bundle/runtime` was absent. A clean archive of final source `0e6392f` was extracted to `/tmp/p-install-verify-0rff_p95`, and the standard wrapper's prerequisite `sync-workflow-bundle-runtime.js` was run there before `test/run-all.js`. Runtime generation PASS; 46 of 47 test files PASS. The remaining `validate-work-item-protocol.test.js` requires `git ls-files`, unavailable in a plain archive. A temporary Git index was initialized with the unchanged archived work-items; rerunning that test PASS, including all 23 tracked report checks. No production test was weakened and no generated runtime was written into the governed worktree. Logs: `/tmp/p-install-unit.log`, `/tmp/p-install-unit-built.log`, `/tmp/p-install-protocol-unit.log`. This is aggregate 47-file PASS, not a claim that either initial full invocation returned zero.

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks:
  - "Five human readiness/work-item receipts reverified with production signature validation and host digest checks."
  - "Approved card and s04/s05/s06 remain frozen. CLI alone owns activation/report/projection changes."
  - "Four delivery paths plus owned evidence root; worktree retained, no merge/release/cleanup."
  - "Protocol validator PASS: 23 managed items, 21 configured legacy skips; workflow pack audit PASS."
blocking_items: ["Human DoD", "Human Business Acceptance"]
owner: qc
next_action: "Human review of this evidence and scan limitations, then normal terminal receipt sealing."
```

## Regression & Compatibility Summary

```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes:
  - "Noncanonical uppercase/custom/reserved/malformed managed names and destination aliases now fail closed, as explicitly approved in the spec."
rollback_readiness: READY
```

Both ordinary entry points and the PowerShell parameter list remain usable; the optional drive-root block is byte-preserved. Current-manifest precedence, legacy fallback, valid encoding, repeatability and unmanaged data preservation have native integration evidence. Rollback is a reviewed source revert; do not demonstrate rollback by running an unsafe installer against an actual profile. There is no release or live installation in this work item.

## Scan Summary

```yaml
scan_target: "The four delivery files"
scan_scope:
  mode: DIFF_ONLY
  changed_files: ["adapters/codex/install-codex-workflow.sh", "adapters/codex/install-codex-workflow.ps1", "packages/workflow-bundle/test/legacy-installer-containment.integration.js", ".github/workflows/legacy-installer-containment.yml"]
  affected_modules: ["Direct installer adapters", "Dedicated CI fixture"]
language_stack: [Bash, PowerShell, JavaScript, YAML]
available_scan_tools: ["Bash parser", "Node parser", "Ruby YAML parser", "Native Windows Desktop 5.1 compiler/runtime in CI"]
false_positive_policy: "Diff-aware, evidence-based; no findings dismissed without reason."
scan_plan:
  syntax: ["Native parsers plus hosted compilation/runtime"]
  static_analysis: ["Check installed tools and existing wrappers", "Targeted manual review"]
  security: ["Containment/inode/alias review", "Adversarial native fixtures", "CI permissions/action pins"]
  performance_heuristic: ["Inventory scans and duplicate checks"]
syntax_scan_results:
  - command: "bash -n; node --check; YAML parse; Desktop 5.1 execution including Add-Type compilation"
    scope: ["Four delivery files"]
    status: PASS
    evidence: "Local syntax checks and all three final hosted jobs PASS."
    blocker_files: []
static_analysis_results:
  - command: "command -v shellcheck; command -v eslint"
    config_used: "No applicable configured lint wrapper"
    scope: ["Changed scripts"]
    status: SKIP
    findings: []
    new_blockers: []
security_scan_results:
  - command_or_check: "Semgrep availability"
    scope: ["Changed scripts"]
    status: SKIP
    findings: []
  - command_or_check: "Manual ordered containment review, actual adversarial fixtures and CI permission review"
    scope: ["Four delivery files"]
    status: PASS
    findings: []
performance_heuristic_results:
  - check: "Read-only preflight before mutation"
    scope: ["Installer manifests and managed subtrees"]
    status: PASS
    expected_impact: LOW
    confidence: MEDIUM
    trigger_condition: "Very large source inventories/manifests or deeply nested managed directories"
    evidence: "Bash duplicate checks are quadratic in name count; native metadata/subtree walks add startup work. Current inventory is 42 skills; no hot request path or benchmark claim."
skipped_scans: ["ShellCheck/ESLint/Semgrep not installed; no dependency change or tool installation authorized by this scan. Manual review does not replace a deterministic scanner."]
overall_status: PARTIAL
remediation_actions: []
notes_for_verify: "No observed blocker; human QC must acknowledge these scan limitations. Native regression evidence is complete for the approved threat model."
```

## Spec Coverage

```yaml
status: PASS
coverage:
  - id: "AC-PI-001"
    requirement_id: "REQ-PI-001"
    status: PASS
    evidence: "38515427610 / 0e6392f: Malformed current/legacy records, duplicate/late-invalid records, byte/encoding negatives."
  - id: "AC-PI-002"
    requirement_id: "REQ-PI-002"
    status: PASS
    evidence: "38515427610 / 0e6392f: Root/skills/policy/manifests/skill/nested/dangling aliases, Windows junction and hard-link fixtures; snapshots unchanged."
  - id: "AC-PI-003"
    requirement_id: "REQ-PI-003"
    status: PASS
    evidence: "38515427610 / 0e6392f: Nine valid-install controls per platform, stale cleanup and sentinel preservation."
  - id: "AC-PI-004"
    requirement_id: "REQ-PI-001"
    status: PASS
    evidence: "38515427610 / 0e6392f: Duplicate source basename and invalid source-name fixtures; raw manifest duplicates."
  - id: "AC-PI-005"
    requirement_id: "REQ-PI-004"
    status: PASS
    evidence: "38515427610 / 0e6392f: Three source-bound job artifacts, complete 69-case inventories, RED/GREEN provenance."
  - id: "AC-PI-006"
    requirement_id: "REQ-PI-003"
    status: PASS
    evidence: "38515427610 / 0e6392f: Negative exit plus error context and complete before/after snapshots, prior to optional drive-root code."
summary:
  total: 6
  pass: 6
  fail: 0
  partial: 0
```

## UAT Summary

```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No separate UAT gate in the approved scope."]
```

## Release Summary

```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["CI verification only; no packaging, publication or live installation."]
```

## Business Acceptance Summary

```yaml
status: PARTIAL
reviewers: []
notes: ["PO acceptance pending; technical evidence supports the intended installer safety outcome."]
```

## Audit

```yaml
audit_status: PARTIAL
notes: ["All six technical ACs have evidence; human terminal gates remain pending.", "No parent audit closure or branch finalization follows automatically."]
```

## Definition of Done

```yaml
work_item_slug: contain-legacy-codex-installer-paths
status: PARTIAL
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: ["Human QC DoD and PO Business Acceptance not yet approved or sealed."]
residual_risks: ["Single-writer threat model", "No transactional rollback after successful preflight", "Automated scan tools unavailable"]
follow_up_items: ["Separate branch integration decision after terminal gates; preserve worktree until then."]
next_action: "Request human DoD and Business Acceptance review of this concrete evidence packet."
```

## Traceability

```yaml
upstream: ["Spec card REQ-PI-001..004", "s04 AC-PI-001..006", "s05 Approach A", "s06 T0-T4", "s07 ordered review and RED/GREEN history"]
next_step: "Human DoD / Business Acceptance; no automatic close, merge or cleanup."
```

## Handoff

Technical acceptance PASS with explicit scan limitations. Request human QC DoD and PO Business Acceptance, then seal the corresponding independent terminal receipts. The branch remains open and is not DONE. Evidence-only follow-up commits do not alter the four delivery blobs tested at `0e6392f`; any delivery-byte change requires rerunning the platform matrix.
