---
artifact_id: "correct-light-router-vietnamese-guidance.s08.verification"
artifact_family: workflow-step
work_item_slug: "correct-light-router-vietnamese-guidance"
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
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
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
execution_roles:
  - "developer"
  - "qc"
  - "ba"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "ba"
  contract: []
  dor:
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
  business_acceptance: []
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
  - "correct-light-router-vietnamese-guidance.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Verification is PARTIAL: technical checks pass; explicit human BA/QC review of the bounded language packet is pending. The step-exit audit is FAIL solely for missing mandatory human decisions; DoD is BLOCKED. Parent M7 remains FAIL.

## Step Contract

```yaml
step: "s08"
step_goal: "Verify AC-LR-001..005, obtain bounded human language review and a separate human QC DoD."
value: "Prove the VI correction without weakening approval authority or extrapolating to other M7 units."
input_summary: ["Frozen s04 criteria", "s07 actual implementation and review"]
output_summary: ["AC coverage", "Exact two-unit review packet", "Separate human decisions"]
done_when:
  - "Required technical checks pass and their limits are disclosed."
  - "Human BA/QC accepts the exact two-unit evidence and scores."
  - "Human QC separately passes DoD with a valid trusted receipt before normal CLI close."
owner: "qc"
constraints: ["No frozen-host edits", "No agent-issued human approval", "No whole-M7 pass"]
risks: ["Static prose guards do not prove arbitrary meaning equivalence."]
timebox:
  target_duration: "One bounded verification pass, then human review."
  deadline: "No external deadline."
  escalation_rule: "Reopen source review if the human identifies meaning drift."
```

## Main Artifact

```yaml
verification_target: "correct-light-router-vietnamese-guidance"
risk_ranked_test_matrix:
  - risk: "Invented Light s05 requirement or weakened approvals"
    severity: HIGH
    required_evidence: ["Source RED/GREEN", "22 mutation controls", "Human BA/QC reading"]
  - risk: "Unintended source or signed-host drift"
    severity: HIGH
    required_evidence: ["Tracked-file hashes", "Two-insertion diff", "Five valid trusted receipts"]
  - risk: "Regression in pack or workflow artifacts"
    severity: MEDIUM
    required_evidence: ["47-file unit suite", "Pack/workflow checks", "UTF-8 and YAML checks"]
test_strategy:
  unit_test:
    required: true
    rationale: "Focused static-guidance regression and existing standard suite."
  integration_test:
    required: true
    rationale: "Existing suite covers CLI/runtime integration; local generation and pack parity."
  database_test:
    required: false
    rationale: "No persistence, query or migration change."
  feature_test:
    required: false
    rationale: "No application feature flow; manual review targets exact router reading units."
negative_cases:
  - "Remove either Light mapping; require separate s05 note/receipt; wrong hosts; omit each of four gates."
  - "Allow Foundation without full escalation; remove/force Contract; append a contradictory host."
  - "Remove each of the eight logical steps."
regression_targets:
  - "Full-track list, explicit evidence requirement, fail-closed consistency and language preference."
  - "Unchanged EN/policy/runtime implementation and signed authoring hosts."
manual_exploration:
  flows_checked:
    - "Light with s04/s06 receipts and no physical s05: inspect Approach in s06."
    - "Missing Approach or Task Plan: shared host does not supply missing approval."
    - "Foundation needed: escalate to full; applicable Contract retained at s04."
    - "Full-track work retains its existing hosts and fail-closed status."
  issues_found: []
criteria_results:
  - criterion: AC-LR-001
    result: PARTIAL
    evidence: "Technical PASS: Step 3 and eight-step controls. Required BA reading pending."
  - criterion: AC-LR-002
    result: PARTIAL
    evidence: "Technical PASS: four gates/hosts, Foundation/Contract controls; BA reading pending."
  - criterion: AC-LR-003
    result: PASS
    evidence: "Two insertions only; other source/manifest/signed-host hashes preserved."
  - criterion: AC-LR-004
    result: PASS
    evidence: "Original 2-failure RED; 31-check GREEN; 22 mutations; 47 test files and required validators pass."
  - criterion: AC-LR-005
    result: PARTIAL
    evidence: "Two hashed reading units and proposed scores below; no human BA/QC verdict yet."
test_evidence:
  unit_test: ["Focused 31/31 checks; 22 mutations rejected; full suite 47 files PASS"]
  integration_test: ["Existing CLI integration tests in full suite", "Runtime generation and pack audit PASS"]
  database_test: []
  feature_test: []
commands_run:
  - "node --check packages/workflow-bundle/test/workflow-light-router-guidance.test.js"
  - "node packages/workflow-bundle/test/workflow-light-router-guidance.test.js"
  - "node packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js"
  - "node packages/workflow-bundle/test/run-all.js"
  - "node packages/workflow-bundle/scripts/audit-workflow-pack.js --repo-root ."
  - "wfc naming/governance/exec/plan/protocol through source CLI, whole work-items root"
  - "Ruby safe YAML parse; strict UTF-8; preserved source hashes; git diff --check"
skipped_checks:
  - "ESLint and Semgrep unavailable; no configured lint wrapper. See Scan Summary."
  - "No application build/typecheck, database, deployment, global install or release test: outside source-only scope."
release_blockers: []
status: PARTIAL
gaps: ["Human BA/QC language decision", "Separate human QC DoD"]
residual_risks: ["Static prose tests cover named patterns only; human meaning review is mandatory."]
recommendation: "Review the bounded packet; retain ACTIVE/s07 protocol until required human review."
notes_for_review: "Release is not applicable; absence of release blockers is not a DoD pass."
```

## Command Evidence

Recorded 2026-10-10 in the isolated child with Node 22.23.2. Commands use the absolute Node binary at /Users/haonguyen87/.nvm/versions/node/v22.23.2/bin/node; node below is shorthand.

| Check | Actual result |
| --- | --- |
| Original-source focused test | Exit 1, two expected independent failures; see s07 RED diagnostics |
| Corrected focused test | Exit 0; 31 passed, zero failed, 22 mutations rejected |
| JavaScript syntax | Exit 0 |
| Local runtime generation | Exit 0; bundle 2.6.3, claude/codex, 84 language skill files |
| Standard unit runner | Exit 0; **47 test files passed**, including the new test |
| Workflow pack audit | PASS; 42 canonical skills; 171 cross-references resolve, four non-skill pointers outside mechanical scope |
| Workflow naming/governance/execution/planning/protocol | All exit 0: naming 296 artifacts; governance/execution/planning 292 notes each; protocol 22 managed items, 21 configured legacy skips |
| YAML/UTF-8/preservation/whitespace | PASS: eight child notes parse; six changed files are strict UTF-8 without BOM/replacement characters; exact two VI insertions; git diff --check clean |

Reproduce workflow validation from the child root:

```sh
node packages/workflow-bundle/bin/wfc.js naming --workflow-root work-items --project-root . --telemetry off
node packages/workflow-bundle/bin/wfc.js governance --workflow-root work-items --project-root . --telemetry off
node packages/workflow-bundle/bin/wfc.js exec --workflow-root work-items --project-root . --telemetry off
node packages/workflow-bundle/bin/wfc.js plan --workflow-root work-items --project-root . --telemetry off
node packages/workflow-bundle/bin/wfc.js protocol --workflow-root work-items --project-root . --telemetry off
```

Protocol validation uses the whole work-items root. Private signer material was not read or used by the agent; receipt verification uses the normal trusted public API. The authoring hosts retain the s07 recorded hashes.

Preservation comparison against the preactivation snapshot covers all 933 tracked child files: exactly five changed tracked files (VI, CLI-owned s01/report, s07/s08) plus the new test; the other 928 tracked files are byte-identical. This includes EN, policy, runtime implementation, signed s04/s05/s06 and package manifest. Both ignored derived VI copies match the source. At the technical checkpoint, all 915 parent tracked files, 19 root untracked files and main/backup/eval refs were unchanged. Only the separately owned parent s07/disposition progress records may subsequently change to link this child packet.

## Bounded Language Review

**Assessment mode: AI_PROPOSED; HUMAN BA/QC REVIEW PENDING.** These are exactly two reading units: Steps 3–4 plus immediate Step 5 authority context. They are neither a rescore nor a pass of either entire file, the earlier M7-L14 unit, or the 147-unit parent ledger.

The proposed scores use the locked rubric. Each dimension is 1–5. Proposed critical flags are zero, mean 4.6/5 and minimum 4/5; these remain proposals until human BA/QC review.

| Unit | Clarity | Naturalness | Next action | Terminology | Role/gate relevance | Mean | Critical flags |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EN Steps 3–5 | 4 | 4 | 5 | 5 | 5 | 4.6 | 0 proposed |
| VI Steps 3–5 | 4 | 4 | 5 | 5 | 5 | 4.6 | 0 proposed |

Arithmetic: (4+4+5+5+5)/5 = 4.6 per unit; combined 46/10 = 4.6, minimum 4. Human QC must check arithmetic and source/unit hashes; the agent's calculation does not substitute for that decision.

Score rationale:

- **Clarity 4:** both units name the s04/s06 hosts and next action; long conditional sentences require deliberate reading.
- **Naturalness 4:** EN is readable policy prose; VI preserves established English workflow terms, making it understandable to the technical audience but less fluent for a general reader.
- **Next action 5:** inspect Approach content/receipt at s06; missing approval leads to BLOCKED/WAITING_APPROVAL; Foundation directs full-chain routing.
- **Terminology 5:** gate names and physical-versus-logical step distinctions match the frozen authority baseline.
- **Role/gate relevance 5:** explicit human evidence and fail-closed status remain; VI explicitly requires individual trusted receipts. Shared hosts do not merge approvals.

### Human Decision Record

```yaml
review_scope: "Only the two source reading units reproduced below"
assessment_mode: AI_PROPOSED
human_ba:
  status: PENDING
  reviewed_by: []
  reviewed_at: ""
  verdict: ""
human_qc:
  status: PENDING
  reviewed_by: []
  reviewed_at: ""
  verdict: ""
separate_dod:
  status: PENDING
  reviewed_by: []
  reviewed_at: ""
  trusted_receipt: ""
```

Requested decision: human BA accepts or corrects meaning/scores; human QC verifies exact scopes, hashes and arithmetic. The later QC DoD is separate. Reading-packet approval does not authorize merge, archive, cleanup, global update or whole-M7 PASS.

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "Work-item, Spec, DoR, Approach and Task Plan signatures valid before activation."
  - "Normal CLI activated five exact grants; report/s01 protocol remain CLI-owned."
  - "Signed hosts and all production runtime/CLI sources unchanged."
  - "No install, release, integration, delegation, archive or cleanup."
blocking_items: ["Human BA/QC review and separate human QC DoD pending."]
owner: "qc"
next_action: "Review the bounded packet; preserve signed authoring hosts."
```

## Regression & Compatibility Summary

```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: PASS
notes:
  - "Runtime code, CLI, schemas, versions, metadata and installed harnesses are unchanged."
  - "Derived runtime contains corrected VI; ignored, not installed or committed."
  - "Manifest unchanged: SHA-256 634d3a2c1dbb7e312883c9471958603b959600334e40cf501265e332c60b8e0f."
  - "Rollback only the two VI insertions and focused test through an owning reviewed change; preserve evidence and receipts."
```

## Scan Summary

```yaml
scan_target: "Two VI insertions and focused test"
scan_scope:
  mode: DIFF_ONLY
  changed_files: ["skills/orchestration/workflow-governance-router/SKILL.vi.md", "packages/workflow-bundle/test/workflow-light-router-guidance.test.js"]
  affected_modules: ["Router guidance; static regression test"]
language_stack: [JavaScript, Markdown]
available_scan_tools: ["Node 22.23.2 parser", "Pack/workflow validators"]
false_positive_policy: "Diff-aware, evidence-based, dismiss only with reason"
scan_plan:
  syntax: ["node --check"]
  static_analysis: ["Inspect wrapper/tool availability", "Targeted manual review"]
  security: ["Inspect Semgrep availability", "Supplementary review of fixed inputs and side effects"]
  performance_heuristic: ["Inspect test loops, reads and regex scope"]
syntax_scan_results:
  - command: "node --check packages/workflow-bundle/test/workflow-light-router-guidance.test.js"
    scope: ["New focused test"]
    status: PASS
    evidence: "Exit 0"
    blocker_files: []
static_analysis_results:
  - command: "command -v eslint; inspect package scripts/config"
    config_used: "No configured lint wrapper/config or eslint executable found"
    scope: ["New focused test"]
    status: SKIP
    findings: []
    new_blockers: []
security_scan_results:
  - command_or_check: "command -v semgrep"
    scope: ["New focused test"]
    status: SKIP
    findings: []
performance_heuristic_results:
  - check: "Two fixed small source reads and bounded in-memory fixtures"
    scope: ["New focused test"]
    status: PASS
    expected_impact: LOW
    confidence: HIGH
    trigger_condition: "Runs only in Node test process"
    evidence: "No hot production path, unbounded input, network or writes; no benchmark claimed."
skipped_scans: ["ESLint and Semgrep unavailable; no new tools installed."]
overall_status: PARTIAL
remediation_actions: ["Human QC reviews disclosed limits; no deterministic static/security scan claimed."]
notes_for_verify: "Manual review found no command execution, arbitrary paths, secrets or side effects. It supplements the skipped tools. Production/auth/dependency code unchanged."
```

## Workflow Pack Audit

```yaml
audit_scope: "Mechanical whole-pack audit and semantic review of two VI insertions"
checks:
  - id: mechanical
    status: PASS
    evidence: "Canonical audit PASS: frontmatter, unique names, markers, schemas, hard-rule headings and flat references."
  - id: semantic-scope
    status: PASS
    evidence: "VI hosts match EN/policy; no new skill, template, role, schema or step mapping."
  - id: authority-pointer
    status: PASS
    evidence: "Full-authority pointer names existing policy SDD Light Profile heading in source/derived tree."
findings: []
overall_status: PASS
follow_up_actions: []
notes: "Does not replace human language review; no install/publication."
```

## UAT Summary

```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No application feature flow."]
```

## Release Summary

```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["Release 2.6.3 remains settled; no install, version bump or publication."]
```

## Business Acceptance Summary

```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["Bounded BA language review belongs to AC-LR-005, not business acceptance."]
```

## Audit

```yaml
step: s08
status: FAIL
checks:
  - criterion: "Technical checks and transparent limits"
    result: PASS
    evidence: "Command evidence and scan summary"
  - criterion: "Explicit human BA/QC acceptance"
    result: FAIL
    evidence: "Human decision record PENDING; not inferred from authoring approval."
  - criterion: "Separate human QC DoD and trusted receipt"
    result: FAIL
    evidence: "Not yet requested or signed."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Bounded technical pass completed; human review is a planned dependency."
gaps: ["Human reading review", "Human DoD"]
risk_level: MEDIUM
next_action: "Obtain bounded human review before separate DoD."
```

## Definition of Done

```yaml
work_item_slug: "correct-light-router-vietnamese-guidance"
status: BLOCKED
checks:
  acceptance_criteria_evidenced: FAIL
  implementation_recorded: PASS
  required_verification_completed: FAIL
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: ["Human evidence for AC-LR-001/002/005", "Separate QC DoD and trusted receipt"]
residual_risks: ["Static checks and missing automated scanners have disclosed limitations."]
follow_up_items: ["BA/QC review", "Separate QC DoD", "Later integration/finish decision"]
next_action: "Keep the child open; review exact packet before DoD."
```

## Traceability

```yaml
upstream:
  - "correct-light-router-vietnamese-guidance.s04.acceptance-criteria.md"
  - "correct-light-router-vietnamese-guidance.s05.technical-approach.md"
  - "correct-light-router-vietnamese-guidance.s06.task-breakdown.md"
  - "correct-light-router-vietnamese-guidance.s07.implementation.md"
next_step: "Human BA/QC reading review, then separate QC DoD"
```

## Handoff

Source correction is implemented and technically verified. Protocol remains ACTIVE/s07 while this s08 host is a review draft; the router reports WAITING_APPROVAL for outstanding human review. No DoD is inferred from tests or authoring signatures. Protected parent register, M7 ledger, frozen portfolio gates, release 2.6.3, main, unique branches and root untracked paths remain outside this change.

## Exact Reading Units

Ranges are inclusive. Unit hashes cover UTF-8 bytes from Step 3 heading through the blank line before Step 6; full-file hashes bind excerpts to complete sources. Quotations below are actual current source text.

### EN reading unit

Source: `skills/orchestration/workflow-governance-router/SKILL.md`, lines 107–161.

Full-file SHA-256: `400661cac92f7cbc76f3293ca550f77849a689b342f7912246ebc75d690cc625`.

Unit SHA-256: `4e8dbc5493ce5499f8dd000517d8743d76f953f86cf8a8e3290a44e93ad9fdb3`.

```text
### Step 3: Determine Current Step

Pick the best-fitting step in the chain:

- `s01 Clarify`
- `s02 Business Goal`
- `s03 Open Questions`
- `s04 Acceptance + DoR`
- `s05 Technical Approach`
- `s06 Task Plan`
- `s07 Implement`
- `s08 Verify + DoD`

If data is missing to enter a deeper step, return to the previous step instead of advancing.

If the work item note declares `sdd_mode: light`, there is no separate `s05` physical note: its content (Option Analysis, Brownfield Impact, Technical Approach) is hosted inside `s06`. Do not report `Missing Gates: s05` or wait for an `s05` file for a Light work item — check the Approach content and receipt inside `s06` instead. Full authority for this mapping is `policies/codex/AGENTS.global.md § Hard Rule: SDD Light Profile`.

### Step 4: Check Missing Gates

Check at minimum:

- `Spec`
- `Contract` if the scope has a contract
- `DoR`
- `Approach`
- `Foundation Decision` if it is greenfield or there is a foundation decision
- `Task Plan`
- the matching human approval

A gate is only considered PASS if the approval is explicit and has enough evidence to read.

For `sdd_mode: light`, apply the Light gate host contract instead of the list above:
- `Spec` + `DoR` hosted at `s04`.
- `Approach` + `Task Plan` hosted together at `s06` (do not check a separate `s05` receipt).
- `Foundation Decision` is not supported for Light — if the work item needs one, treat this as a hard escalation and route it to the full chain rather than reporting a missing Light gate.
- `Contract`, when present, still applies at `s04`, the same as full/strict.

### Step 5: Choose Workflow Status

Use only these statuses:

- `ACTIVE`
- `BLOCKED`
- `WAITING_APPROVAL`
- `READY_FOR_REVIEW`
- `VERIFIED`

If a gate is missing or a key blocker remains, use `BLOCKED` or `WAITING_APPROVAL`; do not use vague wording.

Mandatory consistency rule:

- if `Missing Gates` is not `NONE`, `Workflow Status` may only be `BLOCKED` or `WAITING_APPROVAL`
- if `Missing Gates` is not `NONE`, `Next Human Action` must not be `NONE`
- never create a contradictory block like `Workflow Status: ACTIVE` while still listing `Missing Gates`

```

### VI reading unit

Source: `skills/orchestration/workflow-governance-router/SKILL.vi.md`, lines 107–162.

Full-file SHA-256: `0bdf5cb27e2f1426b026da10aa560e77c84fe5e970396b31bb4883d49fd4cea0`.

Unit SHA-256: `80b2f44f1e3c44de098375857a70b58daacc5d9b7c324b2bb3a72510ae228e30`.

```text
### Bước 3: Xác Định Current Step

Chọn step phù hợp nhất trong chain:

- `s01 Clarify`
- `s02 Business Goal`
- `s03 Open Questions`
- `s04 Acceptance + DoR`
- `s05 Technical Approach`
- `s06 Task Plan`
- `s07 Implement`
- `s08 Verify + DoD`

Nếu thiếu dữ liệu để vào step sâu hơn, phải quay về step trước thay vì tiến tiếp.

Nếu note của work item khai báo `sdd_mode: light`, không có note vật lý riêng cho `s05`: nội dung Option Analysis, Brownfield Impact và Technical Approach được đặt trong `s06`. Không báo `Missing Gates: s05` hoặc chờ file `s05` cho work item Light; hãy kiểm tra nội dung và receipt `Approach` tại `s06`. Cách gộp note này vẫn giữ đủ tám bước logic. Quy tắc đầy đủ nằm tại `policies/codex/AGENTS.global.md § Hard Rule: SDD Light Profile`.

### Bước 4: Kiểm Tra Missing Gates

Kiểm tra tối thiểu:

- `Spec`
- `Contract` nếu scope có contract
- `DoR`
- `Approach`
- `Foundation Decision` nếu là greenfield hoặc có decision nền tảng
- `Task Plan`
- human approval tương ứng

Chỉ được coi gate là PASS nếu approval là explicit và có evidence đủ đọc.

Với `sdd_mode: light`, áp dụng quy tắc đặt gate sau thay cho cách kiểm tra host ở trên. Mỗi gate vẫn cần approval và trusted receipt riêng:

- `Spec` + `DoR` đặt tại `s04`.
- `Approach` + `Task Plan` cùng đặt tại `s06` (không kiểm tra receipt riêng của `s05`).
- `Foundation Decision` không được hỗ trợ trong Light — nếu work item cần quyết định này, phải coi đó là hard escalation và chuyển sang chain full, thay vì báo thiếu gate Light.
- `Contract`, khi có, vẫn áp dụng tại `s04` như full/strict.

### Bước 5: Chọn Workflow Status

Chỉ dùng các trạng thái sau:

- `ACTIVE`
- `BLOCKED`
- `WAITING_APPROVAL`
- `READY_FOR_REVIEW`
- `VERIFIED`

Nếu thiếu gate hoặc còn blocker trọng yếu, dùng `BLOCKED` hoặc `WAITING_APPROVAL`, không dùng wording mập mờ.

Consistency rule bắt buộc:

- nếu `Missing Gates` khác `NONE`, `Workflow Status` chỉ được là `BLOCKED` hoặc `WAITING_APPROVAL`
- nếu `Missing Gates` khác `NONE`, `Next Human Action` không được là `NONE`
- tuyệt đối không được tạo block mâu thuẫn kiểu `Workflow Status: ACTIVE` trong khi vẫn liệt kê `Missing Gates`

```
