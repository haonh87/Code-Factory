---
artifact_id: "workflow-pack-security-baseline.s08.verification"
artifact_family: workflow-step
work_item_slug: "workflow-pack-security-baseline"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: RESEARCH
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: WAIVER_APPROVED
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
  card: "product-specs/cards/workflow-pack-security-baseline.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["po", "ba", "ta", "developer", "qc"]
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
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
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
  business_acceptance_reviewed_by: ["po"]
  business_acceptance_reviewed_at: "2026-10-28T09:30:05.103Z"
  dod_reviewed_by: ["qc"]
  dod_reviewed_at: "2026-10-28T09:30:05.103Z"
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
  - "workflow-pack-security-baseline.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 — Security Baseline Verification

This is a bounded audit of commit `7dce0335c7339ba6f3859e1bc34aaa1168f40971`, not a security
certification or remediation release. The technical recommendation is **ready for human closure under GOV-EX-003**. Scan, inventory and
finding triage evidence are available. AC-SEC-008 retains a historical evidence gap covered only by
the explicitly accepted evidence-method exception; it is not a literal hash-verification PASS.
Human QC/PO content review is recorded in frontmatter when the human signing helper runs.
The two current-host trusted receipts establish gate approval; text alone never does.

## Step Contract
```yaml
step_goal: "Reconcile approved security-baseline criteria against actual evidence and disclose gaps."
input_summary: ["Approved Spec Card and s04-s06", "s07 implementation and sanitized evidence"]
output_summary: ["AC mapping", "Scan and compatibility summaries", "Owned remediation proposals", "Preservation-evidence blocker"]
done_when: ["Every criterion has evidence or a named gap", "Human QC and PO decide applicable closure gates"]
owner: "qc"
```

## Main Artifact
```yaml
verification_scope: ["498 pinned tracked files", "43 skill entrypoints", "Offline scanner controls and findings", "Targeted executable trust boundaries"]
evidence_refs: ["evidence/source-manifest.json", "evidence/tool-manifest.json", "evidence/coverage.json", "evidence/controls.json", "evidence/syntax.json", "evidence/findings.json", "evidence/findings.sarif", "evidence/preservation.json", "evidence/verification-checks.json"]
summary_verdict: PASS
```

## Acceptance Evidence

| Criterion | Technical assessment | Evidence and limit |
|---|---|---|
| AC-SEC-001 | PASS | Manifest: 498 paths with Git modes/blob IDs/SHA-256; 43 skill entrypoints. Coverage ledger supplies eligibility. |
| AC-SEC-002 | PASS | Exact Semgrep 1.182.0 and Gitleaks 8.30.1 image digests, immutable rule commit, rule/config/license hashes. Registry digest verification, not an independent publisher-signature claim. |
| AC-SEC-003 | PASS | UID 65534, dropped capabilities, no-new-privileges, read-only root/source, denied network and writes; no home/Git/socket/credential mounts. |
| AC-SEC-004 | PASS, bounded classes | Six upstream rule fixture pairs; synthetic credential-token/private-key positives and environment-reference negative; sanitizer negative cases. No parser errors; ignored files explicitly rescanned. Not exhaustive provider-rule testing. |
| AC-SEC-005 | PASS, declared exclusions | All 498 rows accounted for; 58 JS files scanned; other languages explicitly outside selected SAST. 43 skill entries and executable roots screened for trust boundaries. PS/CMD native parsing unavailable and assigned to QC. |
| AC-SEC-006 | PASS for baseline triage | 420 retained advisories at 295 source sites with owning-function hints/categories; six manual findings with preconditions, severity, confidence, evidence and developer/QC owners. No suppression or false-positive approval. |
| AC-SEC-007 | PASS | Synthetic markers absent from retained artifacts; sanitizer rejects unmanifested/private paths and drops raw match fields. Raw output hashes retained separately from private outputs. |
| AC-SEC-008 | ACCEPTED EXCEPTION: GOV-EX-003 | 498 source hashes match main/worktree/export; 1,186 pre-existing tracked main files unchanged. Historical hashes for installed harnesses and unrelated untracked files are missing. Isolation is supporting evidence, not a substitute for the required hashes. |
| AC-SEC-009 | PARTIAL pending humans | Criteria, residual gaps and separate high-risk remediation scopes documented. QC DoD and PO business acceptance remain unsigned; no parent closure. |

## Spec Coverage

```yaml
status: PARTIAL
summary:
  total: 9
  pass: 8
  partial: 1
  fail: 0
coverage:
  - id: AC-SEC-001
    requirement: REQ-SEC-001
    status: PASS
    evidence: "498-file manifest and coverage ledger; 43 entrypoints"
  - id: AC-SEC-002
    requirement: REQ-SEC-002
    status: PASS
    evidence: "Pinned images/rules/licenses in tool-manifest.json"
  - id: AC-SEC-003
    requirement: REQ-SEC-002
    status: PASS
    evidence: "Isolation controls: non-root, no network, read-only source"
  - id: AC-SEC-004
    requirement: REQ-SEC-001
    status: PASS
    evidence: "Six rule fixtures and credential/private-key/redaction controls"
  - id: AC-SEC-005
    requirement: REQ-SEC-001
    status: PASS
    evidence: "All paths accounted for; unsupported native parsers explicitly excluded"
  - id: AC-SEC-006
    requirement: REQ-SEC-003
    status: PASS
    evidence: "420 retained advisories and six manual findings with owned dispositions"
  - id: AC-SEC-007
    requirement: REQ-SEC-002
    status: PASS
    evidence: "Allowlisted sanitized evidence and negative sanitizer controls"
  - id: AC-SEC-008
    requirement: REQ-SEC-002
    status: PARTIAL
    evidence: "Historical hash gap retained; accepted GOV-EX-003 covers this evidence-method limit"
  - id: AC-SEC-009
    requirement: REQ-SEC-003
    status: PASS
    evidence: "AC map and separate high-risk remediation proposals; Human QC/PO reviewed this bounded baseline; corresponding signatures must match these bytes"
```

The literal historical AC-SEC-008 evidence remains PARTIAL under approved GOV-EX-003. This is
compatible with a bounded-baseline DoD recommendation; it is not converted into a factual hash PASS.
AC-SEC-009 closes only through human QC/PO receipts.

## Verification Results

- Detector controls: six Semgrep rule tests passed; Gitleaks detected synthetic generic API key,
  GitLab PAT and private-key classes, without the negative environment-reference hit.
- Source SAST: 54 files in the initial run plus four byte-identical supplemental test files; 420
  low-confidence path-flow alerts, zero parser errors. Other five rules reported zero alerts.
- Secret scan: initial scope plus four lockfiles excluded by the default path allowlist; zero alerts.
  Regex, stopword and rule-specific allowlists remain enabled and limit interpretation.
- Native syntax: 20 YAML, 11 JSON, 11 Bash and four Python files passed. PowerShell/CMD native checks
  skipped because their parsers were unavailable; source screening is not runtime validation.
- Artifact validation, UTF-8, sanitizer, receipts and preservation: `evidence/verification-checks.json`.
- Production unit/integration tests, target execution, build/deployment and dependency-CVE tests were
  not run: production is unchanged and the approved scope excludes executing hooks/MCP services.
  Scanner fixtures and syntax checks are the applicable tests for this evidence-only change.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Readiness receipts remain signature-valid and bound to current hosts", "Production and sealed artifacts unchanged", "No source upload or real credential use", "No scanner alert silently suppressed", "No human closure gate self-approved"]
blocking_items: ["Signed disposition of the historical protocol blocker", "QC DoD and PO business-acceptance receipts"]
owner: "qc"
next_action: "Record the exact signed blocker disposition, then request separate QC DoD and PO business-acceptance receipts."
```

## Accepted Evidence-Method Decision

The user explicitly accepted recommended option 1 after reviewing the reported gap: for this baseline
only, retain the missing historical hashes and accept demonstrated scanner non-access plus tracked-source
preservation as supporting evidence. Record GOV-EX-003 in the exception register. Require scoped
non-secret pre/post snapshots for a future authorized scan. This does not reconstruct hashes, waive
security findings, authorize fixes or pass closure gates. The original aggregate invocation log remains
incomplete; raw output hashes and reconstructed reproduction instructions remain disclosed.

The canonical protocol blocker still requires a signed Maintainer disposition through the normal CLI.
QC DoD and PO business acceptance will be signed as independent gate receipts after reviewing this
final packet. The human signer confirms the applicable role authority in that interaction.

## Governance Exceptions
```yaml
exception_id: GOV-EX-003
work_item_ref: "work-items/workflow-pack-security-baseline"
step_ref: "s07,s08"
principle_ref: "AC-SEC-008 preservation evidence"
reason: "Historical pre-scan hashes were not captured for installed harnesses and unrelated untracked files; they cannot be reconstructed."
impact: "Accept a bounded evidence-method limitation for this baseline; do not assert hash preservation for the excluded locations."
mitigation: ["Retain the historical gap and isolation evidence", "Retain 498 pinned source hashes and 1186 pre-existing tracked-main hash checks", "Require explicitly scoped non-secret pre/post snapshots before any future authorized scan", "Keep all six findings and 420 advisories open for separate remediation"]
owner: "developer"
approved_by: "developer,qc,po"
status: APPROVED
review_date: "2026-10-28"
decision_recorded_at: "2026-10-28T08:31:58.975803+00:00"
human_decision: "User explicitly replied accept to the proposed limited evidence exception and remediation priority in this conversation. Approval applies to the evidence-method trade-off described in s08, including technical/QC/product authority requirements; it is one human decision, not an assertion of independent reviews."
limits: ["No historical hashes invented", "No vulnerability waiver", "No DoD or business-acceptance gate receipt created by this record", "No production fix, merge, release or parent closure authorized by this exception"]
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
```

This verdict covers unchanged production bytes and evidence-only artifacts. It does not assert runtime
regression tests passed. Preserve the existing worktree and signed receipts; evidence removal would be
limited to owned artifacts after an explicit finalization decision. Run-owned containers use `--rm`;
private raw outputs/rules remain available for reviewer reproduction. Shared images, OrbStack and
unrelated containers are retained; no global cleanup is authorized.

## Scan Summary
```yaml
status: PARTIAL
notes: ["Syntax: available parsers pass; PS/CMD explicitly skipped", "Static analysis: six JS rules, 58 files, 420 retained low-confidence advisories", "Security: two HIGH and four MEDIUM manual findings remain open; zero Gitleaks alerts is not a clean-security verdict", "Performance: source heuristics only; process output/timeout boundaries merit later review, no benchmark claim"]
```

## Prioritized Follow-up Proposals

| Priority | Finding | Separate child scope | Owner / verification |
|---|---|---|---|
| 1 | SEC-001 HIGH | Encode hook path data outside `node -e` source; fail closed on parser errors. | Developer; QC quote/newline/fail-closed tests. |
| 2 | SEC-002 HIGH | Enforce physical MCP root containment for Git/session operations. | Developer; QC symlink/junction/sibling and valid-child tests. |
| 3 | SEC-005 MEDIUM | Validate the actual fetch/push remote URL for the requested operation. | Developer; QC distinct-host/multiple-push-URL cases. |
| 4 | SEC-006 MEDIUM | Correct spec-reference sibling-prefix containment. | Developer; QC traversal/sibling/symlink cases. |
| 5 | SEC-003 MEDIUM | Pin NotebookLM upstream execution dependency and update policy. | Developer; QC reproducible launch/provision checks. |
| 6 | SEC-004 MEDIUM | Encode installer TOML values and validate before replacement. | Developer; QC quoting and existing-config preservation. |

These are proposals, not newly admitted or approved work items. Findings are based on static inspection
with preconditions documented in the detailed findings appendix below; no exploit or target hook/service was run.

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No user-facing runtime behavior change"]
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No packaging, deployment, publishing or merge in this baseline"]
```

## Business Acceptance Summary
```yaml
status: PASS
reviewers: ["po"]
notes: ["Human PO accepts the bounded evidence baseline under GOV-EX-003; findings remain separate remediation, no product-security certification"]
```

## Audit
```yaml
audit_status: PASS
notes: ["Source and finding traceability supplied", "AC-SEC-008 accepted as a limited evidence-method exception, not literal hash PASS", "Human gates remain open"]
```

## Definition of Done
```yaml
work_item_slug: workflow-pack-security-baseline
status: DONE
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: ["Historical evidence gap remains explicitly accepted under GOV-EX-003; current-host gate receipts are required for protocol closure"]
residual_risks: ["Two HIGH and four MEDIUM manual findings", "420 retained path-flow advisories", "Bounded language/rule coverage", "Incomplete original command transcript"]
follow_up_items: ["Separate SEC-001 through SEC-006 remediation proposals", "Signed blocker disposition and human closure receipts"]
next_action: "Obtain the exact signed disposition plus separate QC DoD and PO business-acceptance receipts before protocol closure."
```

The DONE value above is an AI recommendation for the evidence-only scope under GOV-EX-003. It is not
a human gate receipt, a clean-security verdict or a protocol completion decision.

## Traceability
```yaml
upstream: ["product-specs/cards/workflow-pack-security-baseline.md", "workflow-pack-security-baseline.s04.acceptance-criteria.md", "workflow-pack-security-baseline.s05.technical-approach.md", "workflow-pack-security-baseline.s06.task-breakdown.md", "workflow-pack-security-baseline.s07.implementation.md"]
next_step: "Signed disposition, technical VERIFIED transition and human QC/PO gate receipts"
```

## Handoff

Retain the branch/worktree, source baseline and private raw outputs. Do not merge, close this child,
close parent P-SECURITY or claim product security is resolved. The evidence-method exception is accepted. The remaining human interaction seals the exact blocker
disposition and separate DoD/business-acceptance receipts; it does not merge or close the parent.

## Detailed Findings and Reproduction Appendix

The sanitized Markdown report is hosted here to comply with the workflow artifact naming validator;
`evidence/findings.json` and SARIF remain the machine-readable exports. The initially proposed
`evidence/findings.md` had no allowed workflow-note filename and was folded into its owning s08 note.

### Baseline details

Source: `7dce0335c7339ba6f3859e1bc34aaa1168f40971`. This is an evidence baseline, not a clean-security certification.

498 tracked files are accounted for, including 43 skill entrypoints. Gitleaks reported zero alerts. Its default path allowlist skipped four package lockfiles;
byte-identical renamed copies were scanned separately, also with zero alerts. The original-path map
is retained in coverage.json; rule-level token/regex/stopword allowlists remain enabled.
Semgrep parsed 58 JavaScript files with zero parser errors and reported 420 low-confidence path-flow
advisories. Four test files omitted by its default ignores were scanned separately with identical bytes
and an explicit original-path map; they produced zero alerts. Native syntax checks passed for 20 YAML,
11 JSON, 11 Bash and four Python files. PowerShell/CMD native parsing was unavailable.

### Prioritized manual findings

| ID | Severity | Finding | Proposed owner |
|---|---|---|---|
| SEC-001 | HIGH | Hook path values enter JavaScript source without data encoding | developer / QC review |
| SEC-002 | HIGH | MCP allowed-root checks do not resolve filesystem links | developer / QC review |
| SEC-003 | MEDIUM | NotebookLM launcher resolves an unversioned external package | developer / QC review |
| SEC-004 | MEDIUM | MCP installer substitutions are not TOML string encoding | developer / QC review |
| SEC-005 | MEDIUM | GitLab host selection can validate a different URL from the operation | developer / QC review |
| SEC-006 | MEDIUM | Spec-reference containment accepts sibling prefix paths | developer / QC review |

### SEC-001 — Hook path values enter JavaScript source without data encoding

A quote can break parsing and trigger a permissive fallback in tdd-enforce; a crafted path can change the JavaScript program executed with hook privileges.

Preconditions: A tool file_path or workspace path contains a quote/control sequence; the hook interpolates it into node -e before its intended validation.

Evidence: `scripts/hooks/tdd-enforce.sh:108`, `scripts/hooks/tdd-enforce.sh:167`, `scripts/hooks/load-workflow-context.sh:66`, `scripts/hooks/persist-context.sh:45`, `scripts/hooks/tdd-track-write.sh:62`, `scripts/hooks/tdd-track.sh:67`. Static inspection only; no exploit or target program was executed.

Proposed separate child: Pass paths through argv or dedicated environment variables and use a literal script/heredoc. Add harmless quote/newline/path and fail-closed negative tests in a separate child.

### SEC-002 — MCP allowed-root checks do not resolve filesystem links

Lexical path.resolve/path.relative checks accept the in-root spelling while Git or file streams follow links; repository operations or session reads can escape the intended boundary. Session workspace metadata is an additional check but does not establish physical containment.

Preconditions: A caller can select or place a symlink below the allowed root/session root that resolves outside it; OS permissions still govern the destination.

Evidence: `mcp/github-push/src/core.js:19`, `mcp/gitlab/src/core.js:21`, `mcp/session-search/src/core.js:65`, `mcp/session-search/src/core.js:358`. Static inspection only; no exploit or target program was executed.

Proposed separate child: Canonicalize existing roots/targets, verify physical containment and define safe creation/TOCTOU handling. Add symlink/junction/sibling-prefix cases without reading real private files.

### SEC-003 — NotebookLM launcher resolves an unversioned external package

The executable dependency can change independently of the reviewed repository, weakening provenance and reproducibility; no compromise is claimed.

Preconditions: A fresh or refreshed uvx resolution occurs and registry/network/cache state supplies a new package version.

Evidence: `mcp/notebooklm/src/core.js:8`, `adapters/mcp/install-notebooklm.sh:136`. Static inspection only; no exploit or target program was executed.

Proposed separate child: Pin a reviewed package version and acquisition digest/lock; separate provisioning from normal launcher execution and document updates.

### SEC-004 — MCP installer substitutions are not TOML string encoding

Literal replacement into quoted config can corrupt the document or introduce unintended config entries. This is a local setup boundary, not a demonstrated remote exploit.

Preconditions: An installation path or configurable value contains TOML-significant quotes/newlines; a user or local actor controls that value.

Evidence: `adapters/mcp/install-github-push.sh:79`, `adapters/mcp/install-notebooklm.sh:90`, `adapters/mcp/install-gitlab.sh:75`, `adapters/mcp/install-session-search.sh:84`. Static inspection only; no exploit or target program was executed.

Proposed separate child: Render values with a TOML-aware encoder, validate the final document and preserve prior config on error. Include quote/backslash/newline cases for both shell and PowerShell adapters.

### SEC-005 — GitLab host selection can validate a different URL from the operation

selectRemoteDetails chooses a matching candidate from either direction, while pull uses the fetch URL and push uses the push URL. A host check can therefore accept the wrong operation endpoint.

Preconditions: A configured remote has different fetch and push hosts, with at least one matching the allowed host; caller can influence repository remote configuration.

Evidence: `mcp/gitlab/src/core.js:271`, `mcp/gitlab/src/core.js:402`. Static inspection only; no exploit or target program was executed.

Proposed separate child: Validate the effective URL for the requested direction, including configured multiple push URLs; add distinct fetch/push-host tests.

### SEC-006 — Spec-reference containment accepts sibling prefix paths

startsWith(projectRoot) without a separator boundary accepts a sibling such as project-extra. SDD may read an out-of-project spec; the change validator performs an existence check rather than proving containment.

Preconditions: An artifact-controlled reference resolves to a sibling whose absolute path starts with the project-root string.

Evidence: `packages/workflow-bundle/scripts/validate-workflow-sdd.js:78`, `packages/workflow-bundle/scripts/validate-workflow-change.js:259`. Static inspection only; no exploit or target program was executed.

Proposed separate child: Use a shared separator-aware/realpath containment contract as appropriate, with sibling-prefix, parent-traversal, symlink and valid-child tests. Preserve validator read-only behavior.

### Automated advisory disposition

All 420 records remain in `findings.json` and sanitized SARIF, with stable IDs, source hash/location,
severity, confidence, preconditions and developer/QC owners. They are not silently removed or called
confirmed vulnerabilities. The rule taints function parameters and does not prove caller control.
120 records are in smoke-fixture generators; 300 are in local CLI/library code. All records received a retained-advisory disposition by owning function and trust-boundary category;
category counts are in findings.json. This is baseline triage, not a caller-by-caller proof of safety.
Any future dismissal requires local evidence and human QC; no false-positive waiver is recorded.
SEC-006 identifies a concrete containment defect; SEC-002 covers analogous physical-path risks in MCP.

### Coverage and review limits

The selected rules cover six JavaScript detection classes (command execution, eval, shell-enabled
spawn, path construction, JWT none and GCM tag length). They do not prove all JavaScript vulnerabilities
absent and do not provide SAST for Python, Bash, PowerShell, Markdown or HTML. All executable roots and
43 primary skill entries received targeted boundary screening, with detailed source inspection of
flagged hooks, MCP operations, installers, reference containment and diagram export guards. This is
not exhaustive semantic review of every support document or vendored HTML template. The 110 HTML
assets and other non-executable reference files are inventory/secret-scan coverage, not browser execution.
Runtime behavior, dependency CVEs, history, installed harnesses and external services were excluded.

Six rule controls and synthetic credential/private-key controls passed. Sanitizer controls reject
unmanifested paths and omit source snippets, match text, raw messages, fixes and metavariables. No raw
report or third-party rule is copied into the repository. `raw-output-hashes.json` records private outputs.

### Reproduction

Acquire the exact image digests and immutable rule commit in `tool-manifest.json`; preserve upstream
licenses privately. Export the Git blobs in `source-manifest.json` and verify each SHA-256. Run containers
with no network, non-root UID 65534, read-only root/input/rules, dropped capabilities, no-new-privileges,
and dedicated tmpfs/output only. Use local config; Semgrep flags: `scan --oss-only --metrics off
--disable-version-check --no-git-ignore --no-rewrite-rule-ids --config /rules --json-output /output/report.json
--sarif-output /output/report.sarif /input`. For Gitleaks: `dir /input --config /config/gitleaks.toml
--gitleaks-ignore-path /config/ignore --ignore-gitleaks-allow --redact=100 --report-format sarif`.
Run and validate controls before sources. The original raw command log was replaced by the supplemental
runner; raw stdout/stderr and script history remain in private scratch. These instructions reconstruct
the source scan invocation and are not presented as an intact execution transcript.

### Decision

No production fix, release, merge, installed-harness change or parent-audit closure is included.
The baseline has complete inventory, detector results and retained finding dispositions. AC-SEC-008
has the accepted exception GOV-EX-003 for historical before/after hashes not captured for installed
harnesses and unrelated untracked files. Source/main tracked hashes pass. Scanner isolation gives
supporting non-access evidence; it cannot retroactively create the missing hashes. The initial command
transcript was also overwritten by the supplemental runner; raw outputs and hashes remain available.

The user accepted GOV-EX-003 for the evidence-method gap. DoD and business acceptance still require
their separate human signatures; no agent-approved receipt is created. Keep the branch and evidence. Prioritize separate remediation of SEC-001
and SEC-002, then SEC-005/SEC-006, then SEC-003/SEC-004. Each child needs its own scope, gates and tests.

## Human Closeout Decision

The human signer confirms technical-owner approval and QC/PO review of GOV-EX-003, then QC DoD
and PO business acceptance for this evidence-only baseline. The six findings and 420 advisories remain
open for separately governed remediation. Human review time: `2026-10-28T09:30:05.103Z`.
Branch finalization, merge, release, product-security acceptance and parent closure are excluded.
