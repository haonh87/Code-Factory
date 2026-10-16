---
artifact_id: "release-workflow-bundle-v2-6-4-cr010.s08.verification"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-4-cr010"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: CHANGE
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
change_id: "CR-010"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "product-specs/srs/release-workflow-bundle-v2-6-4.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: ["devops", "qc"]
  business_acceptance: []
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
  release_reviewed_by: ["devops"]
  release_reviewed_at: "2026-10-16T13:34:11Z"
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: ["qc"]
  dod_reviewed_at: "2026-10-16T13:34:11Z"
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
  - "release-workflow-bundle-v2-6-4-cr010.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Automated verification PASS for final candidate a50da628efb512dfac65d0f7bd8c18b86f41b460. Human accepted scan gaps and DoD/Release in chat; trusted receipts remain pending. Overall delivery remains PARTIAL until publication verification and Business Acceptance. No release tag/publication.

## Step Contract
```yaml
step_goal: "Bind release evidence to one reviewed candidate and retained artifact."
input_summary: ["CR-010 accepted criteria", "s07 reviewed release preparation"]
output_summary: ["Exact source/artifact evidence", "Human DoD/Release decision packet"]
done_when: ["Mandatory checks evidenced", "Human applicable closure gates decided"]
owner: qc
```

## Main Artifact
```yaml
verification_target: "a50da628efb512dfac65d0f7bd8c18b86f41b460 / release/v2.6.4"
risk_ranked_test_matrix:
  - risk: "Tag omits P-INSTALL or package delta is understated"
    severity: HIGH
    required_evidence: ["Ancestry", "Archive installer SHA-256", "Full package comparison"]
  - risk: "Candidate rebuilt or rollback identity wrong"
    severity: HIGH
    required_evidence: ["One hosted tarball", "Node 18/22 exact bytes", "Retained v2.6.3 rollback"]
test_strategy:
  unit_test: {required: true, rationale: "All packaged recovery/guidance regressions"}
  integration_test: {required: true, rationale: "Install/update/rollback and native containment"}
  database_test: {required: false, rationale: "No database scope"}
  feature_test: {required: true, rationale: "CLI artifact and authoring flows"}
negative_cases: ["Recovery stale hashes, altered files, invalid signatures and retries", "Installer traversal/symlink containment", "Immutable historical release digest assertions"]
regression_targets: ["42 skills", "Unmanaged bytes/modes", "Exact disposition/history retained on rollback"]
manual_exploration:
  flows_checked: ["Source archive contains accepted installers", "Public docs do not imply npm publication", "Six trusted preparation receipts and hashes"]
  issues_found: ["Stale telemetry assertion corrected", "Native CI missing manual trigger corrected"]
criteria_results:
  - {criterion: AC-REL-01, result: PASS, evidence: "Remote v2.6.3 object/peeled SHA and downloaded asset digest match"}
  - {criterion: AC-REL-02, result: PARTIAL, evidence: "Candidate ancestry/archive PASS; public tagged download awaits Release"}
  - {criterion: AC-REL-03, result: PASS, evidence: "545-file archive inventory; 33 changes, no additions/removals; release note lists all 33 paths"}
  - {criterion: AC-REL-04, result: PASS, evidence: "Release surface and 47 unit files PASS"}
  - {criterion: AC-REL-05, result: PASS, evidence: "Final Guardrails 38876201602 builds once; Node 18/22 smoke same retained SHA-256"}
  - {criterion: AC-REL-06, result: PASS, evidence: "Exact candidate smoke 4/4 on Node 18/22; exact fallback rollback 4/4 on Node 22.23.2"}
  - {criterion: AC-REL-07, result: PARTIAL, evidence: "Local/hosted suites and 207 native cases PASS; explicit lint/security scan gaps need human review"}
  - {criterion: AC-REL-08, result: PARTIAL, evidence: "Preparation receipts valid; no tag/publication; human DoD/Release pending"}
  - {criterion: AC-REL-09, result: PARTIAL, evidence: "Intentionally pending authorized publication and Business Acceptance"}
test_evidence:
  unit_test: ["/tmp/v264-unit-final.log: 47 test files PASS on Node 22.23.2"]
  integration_test: ["/tmp/v264-authoring.log: 13 cases PASS", "/tmp/v264-fixtures.log: 10 cases PASS"]
  database_test: []
  feature_test: ["release-surface PASS", "Local source archive SHA checks PASS"]
commands_run: ["npm run validate:workflow:unit", "npm run validate:workflow:pack-audit", "npm run validate:workflow:fixtures", "npm run validate:workflow:authoring-smoke", "git archive HEAD", "node --check", "UTF-8 strict decode", "gh workflow run"]
skipped_checks: ["ESLint and Semgrep unavailable; see Scan Summary"]
release_blockers: ["Human QC scan-gap acceptance and DoD approval missing", "Exact candidate Release receipt missing"]
status: PARTIAL
gaps: ["Human scan-gap review"]
residual_risks: ["CHANGE/CR numeric alias limitation remains documented; no scope expansion"]
recommendation: "Review scan gaps, then seal DoD and exact candidate Release; publication remains separately gated."
notes_for_review: "No tag/publication; root evidence remains authoritative and separate from code worktree. All automated technical checks passed; PARTIAL reflects missing scans and human gates."
```

## Initial Candidate Provenance (Superseded By Final Candidate Below)
- Source commit: `f6766eecd90e7e6e41769dad806981196402ce25`; parent main `cbf6c095b303f6979ac135b08c063bfdf2ad9fb2`.
- `git merge-base --is-ancestor` passed for both cbf6c09 and P-INSTALL merge 54243b7c327c31abf30733ea013afa4c7fb49315.
- Local `git archive HEAD` installer hashes: Bash `20e54a10ef2e3fdadda39623913dd3bec8367a1249bc4207eef35e82a4438ce5`, PowerShell `859c41118ae1a9c3e8d0bf6154e7d00083a999dae08eb81b0eb60f818f475afa`.
- Remote v2.6.3 object `41ae8213a02de994333ddf25993e16ec99644560`, peeled `7f810352ca253b9b8356f9116335cc03713adae4`; v2.6.4 absent at preflight.
- Downloaded fallback `/tmp/v264-retained-fallback/workflow-bundle-2.6.3.tgz`, SHA-256 `f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f`.
- Guardrails: https://github.com/haonh87/Code-Factory/actions/runs/38869204088
- Native installers: https://github.com/haonh87/Code-Factory/actions/runs/38869210012
- Both dispatched against the exact candidate SHA. Candidate is built only by Guardrails; no local self-pack. HTTPS push was rejected for missing workflow scope; configured SSH push succeeded without credential changes.

## Final Candidate And Human Review Packet

- Final source: `a50da628efb512dfac65d0f7bd8c18b86f41b460`, branch `release/v2.6.4`. The second commit only completes the source release inventory; no packaged input changed.
- Retained asset: `workflow-bundle-2.6.4.tgz`, 987886 bytes, SHA-256 **`9d7c5395ff5fb3ae2a64d26089a2c4c62122fb769a7cacd2e3bcea3f6fa35e84`**.
- Final [Guardrails run 38876201602](https://github.com/haonh87/Code-Factory/actions/runs/38876201602): all 10 jobs PASS, including 47-file unit suite, audit, source smoke and exact-artifact install/update/status on Node 18 and Node 22. Each environment consumes the build-once artifact; no per-environment rebuild.
- Final [native run 38876205558](https://github.com/haonh87/Code-Factory/actions/runs/38876205558): Linux Bash, macOS stock Bash 3.2, Windows PowerShell 5.1 each PASS 69 cases, zero unexecuted, 207 total. Downloaded summaries bind to final SHA. Windows checkout CRLF hash differs from canonical LF; Git source archive hashes match the approved LF values.
- Exact artifact rollback: `/tmp/v264-exact-rollback.log`, all four Codex/Claude global/project scenarios PASS at Node 22.23.2. Installed version 2.6.3, 42 skills, all unmanaged markers/modes intact. Final tarball is byte-identical to the artifact used in this rehearsal (same SHA-256), so the rollback evidence applies without rebuilding or repeating unchanged tests.
- Candidate and fallback retained under `.claude/worktrees/release-workflow-bundle-v2-6-4-cr010/.artifacts/v2.6.4/`; final downloaded CI payload at `/tmp/v264-candidate-final/`. Checksum companion uses the basename for portable verification. Final logs `/tmp/v264-guardrails-final.log`; native summaries `/tmp/v264-native-final/`.
- Full 545-file inventory below is verified against final identical bytes. No added/deleted package files; 33 content changes. No direct adapter scripts are packaged. Release note includes every changed archive path, including npm's automatically included README.vi.md.
- Local syntax PASS for six changed JS files; strict UTF-8 and whitespace checks PASS for all 22 changed source files. Scoped workflow naming/governance and planning validators PASS for eight current notes. No full local change-pack pass is claimed because the cancelled untracked CHANGE-008 draft still aliases CR-008; it is retained untouched and excluded from this candidate.

Requested review disposition: accept the documented ESLint/Semgrep unavailability and manual-review fallback (or request additional scans), approve DoD for preparation, and approve promotion of this exact source and SHA-256 to GitHub tag/release v2.6.4. This proposal authorizes nothing by itself. Preserve v2.6.3; no npm registry publication or live global installation. Post-publication tag/source/asset verification and human Business Acceptance remain required before work-item closure.

## Governance Checks
Preparation receipts for change, work-item, spec, dor, approach and task_plan passed signature and artifact checks. Signed authoring files remain unchanged. Candidate-specific DoD and Release have not been signed. No automated signing, live global install, npm mutation, tag or release occurred.

## Regression & Compatibility Summary
Source and exact artifact regression suites pass; four exact-artifact rollback scenarios pass, preserving unmanaged hashes and modes. No package allowlist, dependency or skill-count change. Retained v2.6.3 has exact state disposition/history and lacks proposal recovery. Do not use older writers on recovered reports. No database or public API migration.

## Scan Summary
```yaml
scan_target: "22-file final candidate delta cbf6c09..a50da62"
scan_scope: {mode: DIFF_ONLY, changed_files: ["git diff cbf6c09..a50da62 --name-only"], affected_modules: ["Release tests/metadata/docs", "Manual CI trigger"]}
language_stack: [JavaScript, JSON, YAML, Markdown]
available_scan_tools: ["Node 22 parser", "workflow validators", "pack audit"]
false_positive_policy: "Diff-aware, evidence-based, dismiss only with reason"
scan_plan:
  syntax: ["node --check for all six changed JS files"]
  static_analysis: ["Existing validators; inspect ESLint availability"]
  security: ["Inspect Semgrep availability; manual diff review of workflow permissions and package allowlist"]
  performance_heuristic: ["Check production hot-path change"]
syntax_scan_results:
  - {command: "node --check", scope: ["Six changed JavaScript files"], status: PASS, evidence: "All parsers exit 0", blocker_files: []}
static_analysis_results:
  - {command: "eslint", config_used: "Unavailable", scope: ["Changed JS"], status: SKIP, findings: [], new_blockers: []}
security_scan_results:
  - {command_or_check: "semgrep", scope: ["Candidate diff"], status: SKIP, findings: []}
  - {command_or_check: "Manual diff review", scope: ["Read-only workflow permissions unchanged", "No dependencies added", "Package allowlist unchanged", "No production runtime logic modified in candidate commit"], status: PASS, findings: []}
performance_heuristic_results:
  - {check: "Production diff", scope: ["CLI help version and metadata"], status: PASS, expected_impact: LOW, confidence: HIGH, trigger_condition: "No production hot-path change", evidence: "Only label/version delta outside tests/docs/workflow trigger"}
skipped_scans: ["ESLint and Semgrep absent; no tools installed implicitly. Manual review is not equivalent to deterministic scan.", "actionlint unavailable; hosted workflow execution provides parser validation."]
overall_status: PARTIAL
remediation_actions: ["Human QC must explicitly review and accept these scan gaps or request an external scan before DoD."]
notes_for_verify: "Unit/regression and syntax pass do not imply lint/security scanner coverage."
```

## UAT Summary
Not applicable: no end-user UAT requirement in the approved scope.

## Release Summary
PARTIAL: exact artifact evidence complete; human scan-gap/DoD/Release approval pending. Distribution is GitHub tarball/checksum/source archive; npm registry publication is not authorized.

## Business Acceptance Summary
Pending post-publication verification and authorized human decision.

## Audit
Mechanical pack audit PASS and semantic checklist reviewed: no added skill/schema; authority and Light host rules remain consistent. UTF-8 strict decode and absence of replacement characters PASS for all 22 changed files. Historical release digest assertions PASS. This does not close the parent holistic audit.

## Definition of Done
PARTIAL advisory assessment only. Required owners: QC for technical/scan-gap/DoD review, DevOps/QC for exact candidate Release, PO for post-publication Business Acceptance. Branch/worktree remain open.

## Traceability
AC-REL-01..09 -> accepted s04/s05/s06 -> s07 candidate commit -> this evidence. No duplicate role artifacts.

## Handoff
Human QC reviews scan gaps and DoD; DevOps/QC reviews the exact commit/digest for GitHub Release. Keep v2.6.3 immutable and preserve signed history. Do not publish to npm registry or mutate live installs.

## Complete Candidate Archive Inventory

This inventory is derived directly from the retained hosted tarball, not npm dry-run output. 545 files; zero additions/removals and 33 changes versus immutable v2.6.3. The final source-only inventory-note correction does not alter package inputs; final CI artifact SHA-256 is identical to the rollback-tested artifact.

<details>
<summary>All package file SHA-256, size and mode values</summary>

```text
SHA256 BYTES MODE PATH
8f9ca26c341d12a32517d1f73990fd4fd6536a64c761a7d7ae9cf62f4f7310a4 19483 0o644 package/README.md
d6b660b0fd77ac624ff5ab01c2473c05c8b25acf9205a8abd21f8aade566ecbe 18245 0o644 package/README.vi.md
1995d23850f5ed4134e7081257e575d2f81b9533659f1a28eecacb9321d888e2 15518 0o755 package/bin/wfc.js
647cdd5ffb8483a0de40978b301b2a6860cf61e560ef9f9c4263967eb51b3f81 611 0o644 package/package.json
4d8e8c686a266908b1642c829c7daa2ad7572e989e802432ec3dc9e4010435c9 47741 0o644 package/runtime/claude/AGENTS.global.md
76878225fe139b9f3b9448f021fe58788469e7271595a6072bdca62954cc7479 5169 0o644 package/runtime/claude/policies/codex/workflow-artifact-naming.md
36e917df4b053a6c39d360e1396af48f0096760851eed2a8270c3b2ac4fbf847 2012 0o644 package/runtime/claude/skills/README.md
bf5848b5eccc96e56f90135896e77d8d3e7e12c54600e286a28ff03fac296fbf 2027 0o644 package/runtime/claude/skills/README.vi.md
f3a3c71711f284f625d4f4773bce9fbfaaf3a657ff751ce38e7d33f1044acdcf 5599 0o644 package/runtime/claude/skills/analysis/brainstorming/SKILL.md
499a921b275830b46715c6fd858412fd3d05dbe4f68470d0f413f6c9054729a8 6178 0o644 package/runtime/claude/skills/analysis/brainstorming/SKILL.vi.md
e8f6408824d5e4cbeb9bd2efa454139e4bf1067c16be71541d02a3996f7f5cc3 336 0o644 package/runtime/claude/skills/analysis/brainstorming/agents/openai.yaml
6385f2a8a0a7ec9c54e7d0ae8c8c6195c35659490e962cb60f0920f59fcf1dd2 4267 0o644 package/runtime/claude/skills/analysis/product-thinking/SKILL.md
1fd347a66596d9ca4a5899c70e9ff09aae62ed591837d1d9dd97f435745597f7 4870 0o644 package/runtime/claude/skills/analysis/product-thinking/SKILL.vi.md
6c0dad6f45767cce36fe8ff469a42a522812d9985980f64c9fdcb9927a6e9633 7679 0o644 package/runtime/claude/skills/analysis/requirement-analysis/SKILL.md
19a642e6036df5fbf96c273ae787ceee35489a3974e528c1ae19358679a74581 8270 0o644 package/runtime/claude/skills/analysis/requirement-analysis/SKILL.vi.md
946b60807bb6fa687396b626b0e42257c10b385dbcd0676846229d1eeb98eedb 1280 0o644 package/runtime/claude/skills/analysis/requirement-analysis/references/example.md
dfd1259553d31e6681f655727fc29f844e0c66e9ce4147ac4463ff0e5efff9d0 1508 0o644 package/runtime/claude/skills/analysis/requirement-analysis/references/example.vi.md
187bcdf48d657ad31079aa7c09171543b480ec32779ecad41db4ea5812cfb9ca 14796 0o644 package/runtime/claude/skills/analysis/sa/SKILL.md
12b4cb25af4b85e1c01acdb40d7db995714d527e2fcc0bd280a8f32ff358d3b9 17478 0o644 package/runtime/claude/skills/analysis/sa/SKILL.vi.md
39f21b8ed2f076006fea194056b2599f4e83fa42b5392f7d2ddbb81131ba8926 508 0o644 package/runtime/claude/skills/analysis/sa/agents/openai.yaml
288e1cb51ef4deb241fff410c30b4a64c3371c6d0d36ddfab65e30d9f8b85ae3 3921 0o644 package/runtime/claude/skills/analysis/sa/references/block-ownership.md
35e35ea2c18aff3ddea0082677b110895bc2950e227094394960929ec4ea649b 4651 0o644 package/runtime/claude/skills/analysis/sa/references/block-ownership.vi.md
be8635bf063ad6d349d26a1fad2481b2cb4e487ef8a67296135a588f7caccd4d 23986 0o644 package/runtime/claude/skills/analysis/sa/references/design-readiness-checklist.md
2cf6f02e10c6b7c1bebb29c6e1d96060cf11735110b969fcb7b955484c860a19 26662 0o644 package/runtime/claude/skills/analysis/sa/references/design-readiness-checklist.vi.md
3a844c87699f73666bcbf8c0c062b44ce06343aea0e1888477084ebbc833c15a 12854 0o644 package/runtime/claude/skills/analysis/sa/references/example.md
e4474cf1fbef580b530eb275bb8ea627146482243f6de9514ecb5b8cacfaefad 13208 0o644 package/runtime/claude/skills/analysis/sa/references/example.vi.md
818a85c0b2a9fa696df78d0f389398eda48b4438fa4ff0c886fa4d64b740d5fa 5501 0o644 package/runtime/claude/skills/analysis/sa/references/invocation-rules.md
8c209ddbc9d1892a1249e6b881107fc5948d152586853e51be4d9629725da268 6331 0o644 package/runtime/claude/skills/analysis/sa/references/invocation-rules.vi.md
1fb8607e14579d396feb3d1ca8436b79fa9de41c63ffebcfa530ca774dcc7afb 12397 0o644 package/runtime/claude/skills/analysis/sa/references/landscape-quality-bar.md
5648fe6f29fb3b722da4bd466d57e87439b7e4da462c0ef16a640a204d9fd2c8 15131 0o644 package/runtime/claude/skills/analysis/sa/references/landscape-quality-bar.vi.md
0224dd7b257cade7d41347bd29f6581f630ee5584aaf8ca6020c3c16193e7a49 5375 0o644 package/runtime/claude/skills/analysis/sa/references/metric-table.md
af9599244444676374d5cca50d33aaabded8695771a39567eb723f98109b1e9d 6226 0o644 package/runtime/claude/skills/analysis/sa/references/metric-table.vi.md
0fbb698e269f7cb7a31679190daed49c5c4905f34b1af7abb4a344d00f5d411a 6461 0o644 package/runtime/claude/skills/analysis/sa/references/output-schema.md
02f4fc8314e8a22d25336d9b7d7380df54ee7612ba42d53512abbaf478a226e3 7218 0o644 package/runtime/claude/skills/analysis/sa/references/output-schema.vi.md
0f1546b3b6b9f47e0ab41c286772beb1eb42e753cc9825d67ca7926f839b1b55 9221 0o644 package/runtime/claude/skills/analysis/sa/references/visual-encoding.md
8ced209732e9650916f3079481867b90a92e11bca544265dfcd9af5c343db979 10863 0o644 package/runtime/claude/skills/analysis/sa/references/visual-encoding.vi.md
c5d6dd213e11b346c0ab06febdfce9aa2aae08bbbf4c2b6501e1425e2d14e457 7904 0o644 package/runtime/claude/skills/analysis/system-design/SKILL.md
583f49d9a220180be03d15654f40229b75d8470b1e3873f1318c40505d0d93c3 8290 0o644 package/runtime/claude/skills/analysis/system-design/SKILL.vi.md
b76ef4dab50418a68f42628aeaf3ae50dea5e988a5409303526deb21d535489c 411 0o644 package/runtime/claude/skills/analysis/system-design/agents/openai.yaml
4a258ef7eabd584a6e5d99e12f45811f81dd5de262ff8cdb31568bab7dbaf8de 14369 0o644 package/runtime/claude/skills/analysis/ta/SKILL.md
c5510a672891cb470980288e6cf83282da99d24aeb2ce7a04687d920b131778e 16609 0o644 package/runtime/claude/skills/analysis/ta/SKILL.vi.md
150d7904544a16ec4cdc6f47bb1a79dddf69c9aefded391f7a0e561c3496a8d5 512 0o644 package/runtime/claude/skills/analysis/ta/agents/openai.yaml
288e1cb51ef4deb241fff410c30b4a64c3371c6d0d36ddfab65e30d9f8b85ae3 3921 0o644 package/runtime/claude/skills/analysis/ta/references/block-ownership.md
35e35ea2c18aff3ddea0082677b110895bc2950e227094394960929ec4ea649b 4651 0o644 package/runtime/claude/skills/analysis/ta/references/block-ownership.vi.md
be8635bf063ad6d349d26a1fad2481b2cb4e487ef8a67296135a588f7caccd4d 23986 0o644 package/runtime/claude/skills/analysis/ta/references/design-readiness-checklist.md
2cf6f02e10c6b7c1bebb29c6e1d96060cf11735110b969fcb7b955484c860a19 26662 0o644 package/runtime/claude/skills/analysis/ta/references/design-readiness-checklist.vi.md
a9ab09dedb10f0ff7d7d435dcf2c7764b9f99bff67a246f17af4ec3f0e253b6d 9786 0o644 package/runtime/claude/skills/analysis/ta/references/example.md
cd8e4181332eb74364a04751bd9b8c72e86e6bd833acd9e881195cfb994fa0d2 10308 0o644 package/runtime/claude/skills/analysis/ta/references/example.vi.md
818a85c0b2a9fa696df78d0f389398eda48b4438fa4ff0c886fa4d64b740d5fa 5501 0o644 package/runtime/claude/skills/analysis/ta/references/invocation-rules.md
8c209ddbc9d1892a1249e6b881107fc5948d152586853e51be4d9629725da268 6331 0o644 package/runtime/claude/skills/analysis/ta/references/invocation-rules.vi.md
1fb8607e14579d396feb3d1ca8436b79fa9de41c63ffebcfa530ca774dcc7afb 12397 0o644 package/runtime/claude/skills/analysis/ta/references/landscape-quality-bar.md
5648fe6f29fb3b722da4bd466d57e87439b7e4da462c0ef16a640a204d9fd2c8 15131 0o644 package/runtime/claude/skills/analysis/ta/references/landscape-quality-bar.vi.md
0224dd7b257cade7d41347bd29f6581f630ee5584aaf8ca6020c3c16193e7a49 5375 0o644 package/runtime/claude/skills/analysis/ta/references/metric-table.md
af9599244444676374d5cca50d33aaabded8695771a39567eb723f98109b1e9d 6226 0o644 package/runtime/claude/skills/analysis/ta/references/metric-table.vi.md
0fbb698e269f7cb7a31679190daed49c5c4905f34b1af7abb4a344d00f5d411a 6461 0o644 package/runtime/claude/skills/analysis/ta/references/output-schema.md
02f4fc8314e8a22d25336d9b7d7380df54ee7612ba42d53512abbaf478a226e3 7218 0o644 package/runtime/claude/skills/analysis/ta/references/output-schema.vi.md
0f1546b3b6b9f47e0ab41c286772beb1eb42e753cc9825d67ca7926f839b1b55 9221 0o644 package/runtime/claude/skills/analysis/ta/references/visual-encoding.md
8ced209732e9650916f3079481867b90a92e11bca544265dfcd9af5c343db979 10863 0o644 package/runtime/claude/skills/analysis/ta/references/visual-encoding.vi.md
5704eb55f680a7d9ff3d678a9de2ff5e6cd108df53b15b54287c5028f2913049 7697 0o644 package/runtime/claude/skills/architecture/architecture-modeling/SKILL.md
42b59cbee620f5e9571ac44c11ffb6d8b48a5632812aa0723e143a8dec9d3a74 8213 0o644 package/runtime/claude/skills/architecture/architecture-modeling/SKILL.vi.md
7f33ba4bd97d5545e91ab88f657ce320df9869332c30aa4fd56dbb1f8e2cb5c0 297 0o644 package/runtime/claude/skills/architecture/architecture-modeling/agents/openai.yaml
4c76ecd34b1e3232218b4d9c9647f1f99be832a0bca82b8d1cac4baef4f9683f 3976 0o644 package/runtime/claude/skills/architecture/architecture-modeling/references/model-contract.md
448ab64e4e679a323b126a529ad32b5d9ad49796e0227bbd4aeac4cd71a44654 4057 0o644 package/runtime/claude/skills/architecture/architecture-modeling/references/model-contract.vi.md
a9d63158f7a539090ead33ad576fb2921d66c1939d1f326f3d47159c700a5923 2745 0o644 package/runtime/claude/skills/architecture/architecture-modeling/references/quality-contract.md
561158de2c239987004c9ee108c112d66140bd1814530ebc60c25d826fce803b 2875 0o644 package/runtime/claude/skills/architecture/architecture-modeling/references/quality-contract.vi.md
8609f26595caea19a3a0d898239956acdb38b2b5f23a9519b003db51c92208c7 3906 0o644 package/runtime/claude/skills/architecture/architecture-modeling/references/render-routing.md
0617afb71c2599928f13e53a727b8f985679595eb6addb56b75ada703fb99a9b 3934 0o644 package/runtime/claude/skills/architecture/architecture-modeling/references/render-routing.vi.md
877c7e9fac210cbc750ed83e152dff75ae816b9988692989a87b1b6924743edb 10988 0o644 package/runtime/claude/skills/architecture/architecture-modeling/scripts/drawio-layout.js
92f6f8a4750473e8c165a5603c6f17b661ac316c1861c467b94fc6f1afee4e06 7614 0o644 package/runtime/claude/skills/architecture/architecture-modeling/scripts/render-drawio.js
7981af540ec62f1e6202db93e4036592933d790cb03f68df18791f9b50f0df3b 2689 0o644 package/runtime/claude/skills/architecture/architecture-modeling/scripts/validate-drawio.js
3994394bcb9f920c3b8434e351e6c18a249b93325a8575a3ed405af1c2fc3a00 6159 0o644 package/runtime/claude/skills/architecture/database-design/SKILL.md
a2db31d9969abf78e9306680f80be71a1f212ac55897b536ce672c49be5a49fa 6654 0o644 package/runtime/claude/skills/architecture/database-design/SKILL.vi.md
567a646c22a20c8d84c97ae6ba9d7861d355ecde46c469af0fd7ccc1b973cc15 7110 0o644 package/runtime/claude/skills/architecture/domain-architecture/SKILL.md
83abda04dc4eb8748fc83b2189320f94922a4276172d2f4a654161c41ddca68f 7764 0o644 package/runtime/claude/skills/architecture/domain-architecture/SKILL.vi.md
e32f882f50f88274b81dd53c4ed02cf1b7aa62a8c2183f127bf7c621fae214cf 4833 0o644 package/runtime/claude/skills/architecture/domain-architecture/references/dod-pattern.md
a09c27046c30970bc515f2d33f55922a935845eee2f6d4dadd50f571dadbeca8 5308 0o644 package/runtime/claude/skills/architecture/domain-architecture/references/dod-pattern.vi.md
62be931eb633bc492f20aec9f39ee9d5559af4abc2208ceacfd19d2977593bd4 8305 0o644 package/runtime/claude/skills/architecture/frontend-architecture/SKILL.md
3631d829e480ac8b4fab18255a4f754f84034e8fdc72716dcb79c46231d49bb6 8837 0o644 package/runtime/claude/skills/architecture/frontend-architecture/SKILL.vi.md
9198c3ebdee81dc4ae6a362fd25032d6e6faf27bf3992daba267ea4cfe6ac1f2 294 0o644 package/runtime/claude/skills/architecture/frontend-architecture/agents/openai.yaml
fa587523de2e8710c05dfb2ba702f48e275b1c5bc970c92ef3a1e030456f69c6 3447 0o644 package/runtime/claude/skills/architecture/frontend-architecture/references/module-first-pattern.md
7b3fa51a9e612f76ffeae59eff98bcdcb9ac326ecfa395e6e86cad5b59143ba9 3666 0o644 package/runtime/claude/skills/architecture/frontend-architecture/references/module-first-pattern.vi.md
2751993eaae72d7edea2705ca49cd1977aa7c64f8b1b14f14c4d2a5c970c26eb 8326 0o644 package/runtime/claude/skills/architecture/frontend-experience-design/SKILL.md
fb13cc5876a9cbc0eb1ad853ce49cc8c66a8ed7fa5dbb169ebaa419802f77dbc 8903 0o644 package/runtime/claude/skills/architecture/frontend-experience-design/SKILL.vi.md
942856bc663a98305302a29988419aaf49644755a451d24fff6b86ace41e60c9 342 0o644 package/runtime/claude/skills/architecture/frontend-experience-design/agents/openai.yaml
9e0696b94eb03835d17dae04c82374bf2f9e825987130f1ecbffdce64d60a74e 4516 0o644 package/runtime/claude/skills/delivery/branch-finish-discipline/SKILL.md
595f13f970b4846e40acb9731b9fb142bfe25495a8a143c25bed38064c358f4a 4788 0o644 package/runtime/claude/skills/delivery/branch-finish-discipline/SKILL.vi.md
2a0c1427e0af8de136cc4768cfe9ec919a0cc2a9cc1d31ce86b5a4fd5c990662 345 0o644 package/runtime/claude/skills/delivery/branch-finish-discipline/agents/openai.yaml
cafda5b5432d6171e96c4e149a81047e8b68fc74e698a75271b9541d2caea845 4330 0o644 package/runtime/claude/skills/delivery/ci-cd-release/SKILL.md
e2cc2ad40d4311a197cd5a4d87396f2f2de52527460845fbfcb0170dc2cb48a1 4498 0o644 package/runtime/claude/skills/delivery/ci-cd-release/SKILL.vi.md
018db01955a5acbc85cee6d1d7b0a75bfb6bb4ffa45aa4db4d9875aa70059b14 1123 0o644 package/runtime/claude/skills/delivery/ci-cd-release/references/pipeline-stages.md
79819e44522925d2fab997c5a0e760a1c47a413706dcdf793d7a3a12bd4a98a6 1099 0o644 package/runtime/claude/skills/delivery/ci-cd-release/references/pipeline-stages.vi.md
7f7313225b2338a7523e43d3fcdd3f20e262a72c76f6eba8cd8dc5d9fc2a60d8 1470 0o644 package/runtime/claude/skills/delivery/ci-cd-release/references/promotion-controls.md
adae24f96835307dd8772358ed7eecee97f66ea1de02aa80830caf8bfc4c1dda 1675 0o644 package/runtime/claude/skills/delivery/ci-cd-release/references/promotion-controls.vi.md
ba51327aadd63ec95403569c2675cab31ec3f773f878bbc6adf7f9b8afc8e29a 12996 0o644 package/runtime/claude/skills/delivery/code-scan-review/SKILL.md
577bfa474a25181d4d16e6d58331129070732026ec4ef6ab645e4de9cbf74782 13773 0o644 package/runtime/claude/skills/delivery/code-scan-review/SKILL.vi.md
dda02000d706c9b44a61cf3d1cae9988a27361907885ee3ea4114661540a82ba 1124 0o644 package/runtime/claude/skills/delivery/code-scan-review/references/go.md
da0691c3d5ef9c169e88bb0bf01c620db2cb58d5e90091400bc649bbef1c8456 1182 0o644 package/runtime/claude/skills/delivery/code-scan-review/references/go.vi.md
980d005a204ecec0cb863eefe21bb9e9a0f09ad819dcf8099ef8f70551f042b6 1195 0o644 package/runtime/claude/skills/delivery/code-scan-review/references/java.md
8a756f36a5738c2da2fe8e78d8461e1fb0aff02079cba5229e6d3cffe1c58c52 1245 0o644 package/runtime/claude/skills/delivery/code-scan-review/references/java.vi.md
677100ce3becb7e40c1e5a3632fce861b82669f63ed380e04151fa6b659d0348 1712 0o644 package/runtime/claude/skills/delivery/code-scan-review/references/php.md
c54b38ed161999a5460a4c07d66e7d0a2ec4a3f68006900db7f864eda9824e36 1730 0o644 package/runtime/claude/skills/delivery/code-scan-review/references/php.vi.md
2a91ced74611403889f779edfaaa8b9ee2c4be4593557f2080b7c660939c38d4 1182 0o644 package/runtime/claude/skills/delivery/code-scan-review/references/python.md
5c6a5eee4d00c75bb7f6955376c779d7c2166eced9e5d828087cdcc59624a45f 1209 0o644 package/runtime/claude/skills/delivery/code-scan-review/references/python.vi.md
29664790c3a7521404c7325f3d09cca89274aa8798fe8347fa2d1fbc66e0afd2 1592 0o644 package/runtime/claude/skills/delivery/code-scan-review/references/typescript-javascript.md
eaecf9f1687a4e37960cc0039df348f587770a7a4a92d365ac489506d0bcdf1e 1648 0o644 package/runtime/claude/skills/delivery/code-scan-review/references/typescript-javascript.vi.md
d0d2174ce37b500c245f720ecee39c8b83f5d85abfb3634581886594bff7c446 4845 0o644 package/runtime/claude/skills/delivery/containerization-packaging/SKILL.md
74ec780408df7b057ef340c3a549858dac61aaa704879a45c9b7b60648d6ba5c 5042 0o644 package/runtime/claude/skills/delivery/containerization-packaging/SKILL.vi.md
81a11827512c7bed5c65eb79a902190764153b63efdb4c9ee1c5263ae89d6953 1976 0o644 package/runtime/claude/skills/delivery/containerization-packaging/references/language-stacks.md
3317b0e84781201702efc9080b6fd1be5ff0a72d08cd675c14349351288835ae 1935 0o644 package/runtime/claude/skills/delivery/containerization-packaging/references/language-stacks.vi.md
1c38181205e045d3a2cb0ccb87209a6a3de15995a13a12074828f2d65f63e6dc 1264 0o644 package/runtime/claude/skills/delivery/containerization-packaging/references/workload-profiles.md
09072d475442291f1b207c0ffdbf4e1adc7a665a5cb319811a2e4a032e654a5d 1276 0o644 package/runtime/claude/skills/delivery/containerization-packaging/references/workload-profiles.vi.md
85dfbff144c1d767f3e2ef00e3a03723e240810993b4885948c35854191ff486 5695 0o644 package/runtime/claude/skills/delivery/database-change-review/SKILL.md
82ff083a3403e1b06d68ba5db098de9615950aa858269a24414033887e65ef82 6359 0o644 package/runtime/claude/skills/delivery/database-change-review/SKILL.vi.md
f6a78cc19ddbc90005ad93ee67edf021328ee3684cb1e70bac7bfc2ac2583bbb 1938 0o644 package/runtime/claude/skills/delivery/database-change-review/references/mongodb.md
d0c21267fd02b274ba6dd29098228476b2f8707b97ee43d3cd8cf2ebfec5a7f1 2120 0o644 package/runtime/claude/skills/delivery/database-change-review/references/mongodb.vi.md
ba62549ec268ff6458a313142c60a936e7ddd5ceec12d14e25be5fdc3adfd1e0 1927 0o644 package/runtime/claude/skills/delivery/database-change-review/references/mysql.md
5b2ecd9ef03b3b20fc32a52ad60f71884fbe1c50ecf9dc713283f48fdeadf669 2201 0o644 package/runtime/claude/skills/delivery/database-change-review/references/mysql.vi.md
a6775168a3d94c7dcaf915e7ce8318223a681c736505bffc7b21002c8c6c37f2 1859 0o644 package/runtime/claude/skills/delivery/database-change-review/references/postgresql.md
8b8267724b59194c26b202cca15755731df3fba9436269f3a0c49d2c20b0df37 2031 0o644 package/runtime/claude/skills/delivery/database-change-review/references/postgresql.vi.md
38dd305162dcc216728d962d9028893b9c92c76767c4cad2e795dee1afae71b9 4823 0o644 package/runtime/claude/skills/delivery/delegation-discipline/SKILL.md
0b9b74f16f6302d60bb46fd3cfb6395515fbd65d9df9d4d89fad6ff73a5b6876 5122 0o644 package/runtime/claude/skills/delivery/delegation-discipline/SKILL.vi.md
3c76a010c172cd1c9893ede8b209808c0eea3dfed36fd9dbed8bb7c9648f1696 358 0o644 package/runtime/claude/skills/delivery/delegation-discipline/agents/openai.yaml
370075c9c007856fef51dc5b8673b563535274d856ff1fa63a57e28c81ca8045 6572 0o644 package/runtime/claude/skills/delivery/deployment-devops/SKILL.md
df5e903f2ce4a7d077439da9737fa956efff122282959ba2652f2ac17da35c34 7021 0o644 package/runtime/claude/skills/delivery/deployment-devops/SKILL.vi.md
40201368218bacfcea8e7ce9d0a248a6ebeb7a61bbb6d83cfc626e9a65a03d4a 1302 0o644 package/runtime/claude/skills/delivery/deployment-devops/references/devops-skill-map.md
ad65a257b6697c202519df33f3d3333a4a03ef892fb5e1046f8ad66f7f590daa 1359 0o644 package/runtime/claude/skills/delivery/deployment-devops/references/devops-skill-map.vi.md
ac5337677285b3b933919902edbf8e4a642482017b9ea772636b64e676761254 2127 0o644 package/runtime/claude/skills/delivery/deployment-devops/references/local-docker.md
d89db20d8b09c740697624cdc2422cfd59c7c28a6ad770adf88fb1ac6c963087 2206 0o644 package/runtime/claude/skills/delivery/deployment-devops/references/local-docker.vi.md
2fe47a75fc4b546b4f2a68dd3751d370467f931d67a5af46694d59180410b73f 2180 0o644 package/runtime/claude/skills/delivery/deployment-devops/references/promotion-flow.md
bc0e36eb08e0f688c0c67282712679b3191cb0cbdbd82c75c564f990f2ad301c 2407 0o644 package/runtime/claude/skills/delivery/deployment-devops/references/promotion-flow.vi.md
91142518a8c0773c379d47fe77037fa059f9a42c1d651d4228d8ee1a55e74a96 2449 0o644 package/runtime/claude/skills/delivery/deployment-devops/references/runtime-targets.md
a83cd009629d4b36e49f43395bb325c26e4b7ac4d3b10f08c16110860fbf0a19 2600 0o644 package/runtime/claude/skills/delivery/deployment-devops/references/runtime-targets.vi.md
ae66c00839efe1ad1c59f5ea6c127f410bc84790c2b353bcdf0716c2e3c9ca9f 8531 0o644 package/runtime/claude/skills/delivery/frontend-quality-review/SKILL.md
3133c81d2a8e578a8228e7d4b7994a8fe59e1ee9273eb65bd99d12f78200642c 9248 0o644 package/runtime/claude/skills/delivery/frontend-quality-review/SKILL.vi.md
dd0563462ef5cdbc571c6047aa227ed28b9d362056dfb3988b48d8249d34f011 352 0o644 package/runtime/claude/skills/delivery/frontend-quality-review/agents/openai.yaml
2fbd387ace66a3d78f11be37c4638e8e1f757c60927b934d0a86583bd1f69a13 7000 0o644 package/runtime/claude/skills/delivery/implementation/SKILL.md
683e748713fa52efa4cf884569ac5030764dd5258d0768a1e78b9303c30dcba9 7497 0o644 package/runtime/claude/skills/delivery/implementation/SKILL.vi.md
8595a101880430937f5d87c8f43d5dca72243207ab8f65a27d5be3008bd55fc2 416 0o644 package/runtime/claude/skills/delivery/implementation/agents/openai.yaml
5d0760ec314b9c36ed27864e0ff59da70b1838e3a0d317d3aa9f0898c6c21722 4316 0o644 package/runtime/claude/skills/delivery/platform-runtime-deployment/SKILL.md
a623356eba4801255fa0974df4cf6cc60748b9405103f28f18e67bc162f90349 4551 0o644 package/runtime/claude/skills/delivery/platform-runtime-deployment/SKILL.vi.md
ebb720976d3bbe29b10a706d248c96b4efe75df9b8ff545921bbf4bc9a55636e 1489 0o644 package/runtime/claude/skills/delivery/platform-runtime-deployment/references/runtime-platforms.md
0541701b51e20b09407dcaeb53dae8f811e32697b62c1535714aee79beb8d058 1541 0o644 package/runtime/claude/skills/delivery/platform-runtime-deployment/references/runtime-platforms.vi.md
e951f084a81f1569d66fe525cf734a7f7c9e7c1704deb5f37338f2c7294f59c1 1379 0o644 package/runtime/claude/skills/delivery/platform-runtime-deployment/references/stateful-networking.md
9349b6625c5e8a60b4fa295624f31fafa342e965f65f369c4c4b79f2b28831a6 1406 0o644 package/runtime/claude/skills/delivery/platform-runtime-deployment/references/stateful-networking.vi.md
cdb6652fa25e471a563997d678609a77b95a98b03f40d2b55a56ffab2f44e2a0 9077 0o644 package/runtime/claude/skills/delivery/react-best-practices-review/SKILL.md
647d3cc291d8052e6e3cd269c710ae6120938b08a879307023054dd0dcd075ab 9676 0o644 package/runtime/claude/skills/delivery/react-best-practices-review/SKILL.vi.md
9ab923092a5b6d1dfee26a76164c296c7e24d173b55f12337686459bbb0cc7e8 376 0o644 package/runtime/claude/skills/delivery/react-best-practices-review/agents/openai.yaml
6e801975175f546cc84ae8125c025fd25958dbc2750224fd8281efa302356d6f 7399 0o644 package/runtime/claude/skills/delivery/react-web-implementation/SKILL.md
d2cdaa864b8375926d97e182e75eae0120fe842f12d549a2f84f6e0d8c1c1909 7800 0o644 package/runtime/claude/skills/delivery/react-web-implementation/SKILL.vi.md
d7c598e67e5e5264eec7918043a2a35aee23131a8d4c9f869767f06fd27b8189 360 0o644 package/runtime/claude/skills/delivery/react-web-implementation/agents/openai.yaml
5ee9fd8407dbc3d240d1cbf226ad1fa63c06fff388f81789c5dc660bcc264c33 4686 0o644 package/runtime/claude/skills/delivery/review-discipline/SKILL.md
b4946226d117b3ce196727dd376a8df9a09bee32b71989aa53eeffb749794b2c 4888 0o644 package/runtime/claude/skills/delivery/review-discipline/SKILL.vi.md
ed35aca831f20e6ae6f8cc68ada0786cbbf5da91b88db68e60519ab091159249 341 0o644 package/runtime/claude/skills/delivery/review-discipline/agents/openai.yaml
03abd4020b9e19714ebd1925e64b18a54a1cad48e01b8b99180e320d13bd7542 5082 0o644 package/runtime/claude/skills/delivery/task-breakdown-planner/SKILL.md
60a09098db96f288f3404ef675e175960f33a51fc0d2d28b905dd552012298c7 5338 0o644 package/runtime/claude/skills/delivery/task-breakdown-planner/SKILL.vi.md
62ddb24af223c4cca72a7f65773ff68d705e3030d72b09c94e732bad184bc24c 358 0o644 package/runtime/claude/skills/delivery/task-breakdown-planner/agents/openai.yaml
919b5e0d3e9338f67a78750a0106df59635add52b4ffeda14d23dc14616b843a 9894 0o644 package/runtime/claude/skills/delivery/testing/SKILL.md
5a34bb0c7d2567479c34b22f076405bc5a97e3b45e1e5c5c73be94e0e5acc2a0 10845 0o644 package/runtime/claude/skills/delivery/testing/SKILL.vi.md
417bcca926d82274686f3db77756a13872c1ab0afdb99db1f5a29ade85ee29d0 401 0o644 package/runtime/claude/skills/delivery/testing/agents/openai.yaml
740fba02797b8de1d4f92d213267ba4f54dc8ccc8974995a62c9b05091b6fda5 5684 0o644 package/runtime/claude/skills/delivery/worktree-discipline/SKILL.md
cc8df7173b67fb7200235c3fd89f86bdd433db745cd87640cedebefd16b84ac2 6271 0o644 package/runtime/claude/skills/delivery/worktree-discipline/SKILL.vi.md
34efb67e7061c465a8ce23cd671bf4621dbf05140831c2b58866a75d62ec30b7 345 0o644 package/runtime/claude/skills/delivery/worktree-discipline/agents/openai.yaml
8e24ac94092fab8d89936c4a814084855e5bf5060855b2cddf60de5ddc06db5e 7909 0o644 package/runtime/claude/skills/guardrails/artifact-governance/SKILL.md
51f79c0f789fb209bc995dee6432fc2de2096d031f7fba9ee5eaff210752b99b 9252 0o644 package/runtime/claude/skills/guardrails/artifact-governance/SKILL.vi.md
ff8b7a9caf538ea358a81626e447f610389cb6f5ce89b7f20dff6d434aab9e31 8270 0o644 package/runtime/claude/skills/guardrails/artifact-governance/references/ownership-table.md
6409a7def845fe5cee140a1b0f96d70e14a8f6e689fa407346c2ac2e61928c52 8895 0o644 package/runtime/claude/skills/guardrails/artifact-governance/references/worked-example.md
ee4389ed9f0b8271e327a69f82f9200c3a85d585f86402e0c5c4af5ea1c9bd3c 4213 0o644 package/runtime/claude/skills/guardrails/definition-of-done-gate/SKILL.md
93ab5a193174077a86b5b044140d93f9e4575d871355900d6b4ccc4d8a9596ab 4513 0o644 package/runtime/claude/skills/guardrails/definition-of-done-gate/SKILL.vi.md
f876c20b7b9461d98bc574cf90e7e07042be60620e56dd89529e960a96440f52 3285 0o644 package/runtime/claude/skills/guardrails/definition-of-ready-gate/SKILL.md
f442e0954e1469286e6b179fa3186e1903aeb64e264881eed70025f8e6f6e66d 3370 0o644 package/runtime/claude/skills/guardrails/definition-of-ready-gate/SKILL.vi.md
aaf3ee5228ad08140531df6ffeb62df2d76999ead1b971015bfff01f2b9786a0 3710 0o644 package/runtime/claude/skills/guardrails/input-readiness-assessor/SKILL.md
4f89b5a9a78bd775d4752f1d3ff557c5ea5a1e89cc180f9fdb6a799ae6a70294 4272 0o644 package/runtime/claude/skills/guardrails/input-readiness-assessor/SKILL.vi.md
8a7d314f276c7d47d8920269959625412c59de9d05b677b30c10c497bce180ca 5016 0o644 package/runtime/claude/skills/guardrails/karpathy-coding-discipline/SKILL.md
ec18ba0262670bcac54cc280fa39d6de7fc1a9327eea15c988fd22c8122187c4 5083 0o644 package/runtime/claude/skills/guardrails/karpathy-coding-discipline/SKILL.vi.md
9b39f321c336028c027ee62f581f83ae7c693ea46cf1de3995b065391020c5d9 3873 0o644 package/runtime/claude/skills/guardrails/step-goal-auditor/SKILL.md
40e69ec401a6223a8f5eb2d019da3f5294e5b5b19829e2a79975372f43770f8c 4340 0o644 package/runtime/claude/skills/guardrails/step-goal-auditor/SKILL.vi.md
ffdb8723aa1ffdb8af37ad8e9e1a3ca4d1b3f6fc946596b86ec41d70ffdf674a 4146 0o644 package/runtime/claude/skills/guardrails/step-goal-contract/SKILL.md
3d81138cd5e9ca6c61eab772e4e1a60a643d9128d3b7acc0177ac7004f9f3af8 4613 0o644 package/runtime/claude/skills/guardrails/step-goal-contract/SKILL.vi.md
94ca54703e25be687d6e8353277396b79e7222bfef4311f8d73a7e34ea9eaaae 4698 0o644 package/runtime/claude/skills/guardrails/workflow-pack-audit/SKILL.md
c3c9708b326792c46ed9169dcf44830378477c0ccb7e0c993353ea39d4cadb9e 4978 0o644 package/runtime/claude/skills/guardrails/workflow-pack-audit/SKILL.vi.md
0bd2bacf5aa63e1c1ca14e83a4f69b1f955aa03602992be5c1d5106d543e6677 343 0o644 package/runtime/claude/skills/guardrails/workflow-pack-audit/agents/openai.yaml
417e13f34db40119da2d6f0f2ceb362a67b04d2a1311b7e465667efdc6b4f73e 5082 0o644 package/runtime/claude/skills/guardrails/workflow-pack-audit/references/checklist.md
c4d7d5c8e85119cb4fd70350dfaeafaadb8455f702a4db8ff3ed30fe2466634c 5392 0o644 package/runtime/claude/skills/guardrails/workflow-pack-audit/references/checklist.vi.md
64214cc0f918098840876d74c042722413aa4f9f5966288964513d248ba8d510 6568 0o644 package/runtime/claude/skills/guardrails/workflow-pack-audit/scripts/audit-workflow-pack.ps1
f60ec2dd42f466457ef94c8bdde374a995a7cef8115d3fbf9ccca144f0324b61 3222 0o644 package/runtime/claude/skills/guardrails/workflow-pack-audit/templates/audit-report.sample.md
0353c7cd6b78eba50187cf53abb5d38ee071fcdac9a1c327b22d5ff5487b2961 5216 0o644 package/runtime/claude/skills/notebooklm/SKILL.md
3cc9b74a22e804145004c4106be44327f340efcd6cedef7d6031d3485ab08406 8286 0o644 package/runtime/claude/skills/obsidian/json-canvas/SKILL.md
49764781d2cbf7a55a4cde092cb1cb3fbe6fcd5d279f03c7b07302ec046df10c 6746 0o644 package/runtime/claude/skills/obsidian/json-canvas/references/examples.md
3f7722ad1fc4c956e17ae9b5369488c826bbdb8a9bc2f9f245d2b45e2bd94d00 8747 0o644 package/runtime/claude/skills/obsidian/obsidian-bases/SKILL.md
fb40b56d66bdfc1587f14babe03fb9e7eac66b3254d6b1e50d9f030072bcb721 3295 0o644 package/runtime/claude/skills/obsidian/obsidian-bases/references/examples.md
7041e0990c7bab9abdb557d7d85311ab0da2c1c658426c8abd09580c6dd43201 6546 0o644 package/runtime/claude/skills/obsidian/obsidian-bases/references/functions.md
8cea8e83c2503e0438cf5216ce28a6a1a85c86cb97be5788e965cc5ccf6d8d74 8586 0o644 package/runtime/claude/skills/obsidian/obsidian-markdown/SKILL.md
647ff9612e8eff128591df9a6481a0eda0ceca86bbe3d35e4d5d1045571c4151 1008 0o644 package/runtime/claude/skills/obsidian/obsidian-markdown/references/callouts.md
465766a55b960762a25a631e1d5881697b0c104823794d52cbe88a12d2fd422c 2382 0o644 package/runtime/claude/skills/obsidian/obsidian-markdown/references/diagrams-and-extras.md
84d56f1bad1d2885f5c59e1140650f30d57c9f1c62b8bec5d0778e00d4525b1b 34882 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/SKILL.md
bbad7cea83022a322f5a3d72daabd6dc4bff7bd6507c55e98fe923bf327afe22 36811 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/SKILL.vi.md
90c352a7aedfacffe26228b7c2b4fcc95578493878fc4ceea7b6c669346e51ea 7080 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/adaptive-planning.md
4d92b7333c2cbc932ef2faa8d5a453d3b73063cee9cbeab53af52bc3c522d74f 7290 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/adaptive-planning.vi.md
f4abe7f9adc6f8545cbdf00fb093e6ce789afc3a70e28a3b6d0701515ca64317 14468 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/end-to-end-examples.md
2c1474c6fd304766246f17a64a19b062e45656540f97e48c53707cf15d23afb5 14995 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/end-to-end-examples.vi.md
869d0583428db28620ba96f454ea71014e0d44ad0d151f6ddb39d9ac59e2c53e 12845 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/execution-runtime.md
a4ef9150a10e1e4e8ee469dd54931b1d69ef3081879fa8558317e1e799d4bbae 13443 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/execution-runtime.vi.md
db651a8c4d219e8875549467a99ca5ab17d7752fbcd3a0d2a2e943b9978057b3 12515 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/implementation-blueprint.md
d7ac12b8e7407330c0cf3cf00bde713fd02969e684163d5cb19a1b51a947466a 13174 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/implementation-blueprint.vi.md
b5432dba1b0fdf5733e7b430df5da584c07abc0ef7f6ec27f76876872fcb3e2c 12731 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/role-aware-workflow.md
da4cf5c8c4daee9c94903bbfd75c065bebfe7f1adfd7cc16b528693f439e44c4 13174 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/role-aware-workflow.vi.md
bde5feb9fad70e48bd59b63d2f466bceb33a1a6fcfa8e234efbf41800041cf86 8166 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/sdd-merge-strategy.md
29d123904179e1b0d015ecca009968204477a9a5f5050964127601c1a954fe51 8424 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/sdd-merge-strategy.vi.md
2c91d332032e9baec27d28dd9328ded4cfa855ebb8ab6b0e093f6567cd4ac6c7 11734 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/spec-driven-development.md
d0fe8b2ad157e7920b35a77c430b92d3d684632852d20c50cef4c755d1d9dfb3 9358 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/spec-driven-development.vi.md
517611cd66b69746ccf69ef279c904f9fbcd079a25ca77644dcb66aebeabe203 11836 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/target-architecture.md
8fd584a3853b74d0a8f437b6944f814489acd5cd7e6e6a604c946a46daf89167 12384 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/target-architecture.vi.md
f9d02ff186f0f23b27a2735fcc57e60a4e31eff949c7d68e74085276706a0f19 27311 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/work-item-materialization.md
2d68abe65d79c95d0719519b6f581dd7a276aebb0108e03a5846ce0bc7a0caf7 27065 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/work-item-materialization.vi.md
d18f407a2e81ff91e84ab4f80d10cb1838940bcf087508bb837fe1b20e163b43 24836 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/work-item-protocol.md
178628a5433669f6951333f842fa155726abb71f5d6db0483874e44b27fe52fc 23426 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/work-item-protocol.vi.md
4696510c55f48ac97401750034f7bacf8136f310e2f8cb95ab85198641b40618 143397 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/workflow-chain.md
78c30022bbe3a7d8b750ba54203d326b4213f91a23963e432152d8de19797f12 141630 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/workflow-chain.vi.md
de47f5219f9ad79d2fce035ed69fec5fb77b25d65040c326e9fb32c8dc67029e 13964 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/workflow-ci-enforcement.md
62f60aee68c523bea09acb9c2ddabc4e433d3650b856d7b5060fd03e1df44772 14458 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/workflow-ci-enforcement.vi.md
ffd6ea1b2de6d102264ac2926d6cbbce6d1a39a8418d39043a137f3ce9d05f6d 24272 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md
58cebc99965d11e9add6ed4a2438e5998ac56c915d587eecb400833ca1e1c4b1 25613 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.vi.md
3e4a5f6944136838e5c677dd21b5adfb51c1e7cffe1f6223980330df02726fa5 16067 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/workflow-overview.md
73de2170cc828c8157c1a35201873f5186b538ac4dabd85edc6657de78f60aca 16746 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/workflow-overview.vi.md
13d0dacd6738e94cee2ab92dcb335333365aa0a4e4ee08cf72f7357ed8955ce5 3616 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/workflow-versioning.md
0fcae3fa4623fa3201c8c07f660e4d57f4895b95e298146c2b05bb25edd7c8aa 3642 0o644 package/runtime/claude/skills/orchestration/codex-workflow-chain/references/workflow-versioning.vi.md
74bbcb57f9d3ebe3ca39f5f500b02724326963f3bb08a1ab957ab858f874db20 5253 0o644 package/runtime/claude/skills/orchestration/goal-griller/SKILL.md
b8a1e5dea85166673d80f0f7a05e2ad799d97b061f0a793fe56058389cd9c25c 4581 0o644 package/runtime/claude/skills/orchestration/goal-griller/references/claude-code.md
f815eb373babe28f34a9d54a23e0e5fcef27fb4504da1105481df123bcfa2ad1 4232 0o644 package/runtime/claude/skills/orchestration/goal-griller/references/codex.md
71747802077941561cda0604e37fba46de3f1b7268c57aeb5cd4f2317fbfb2ba 2539 0o644 package/runtime/claude/skills/orchestration/goal-griller/references/generic.md
3c473320b0e7eb9213a9e4a0a9eecbce0720bc028693032b098490ab8a5f2e7a 4575 0o644 package/runtime/claude/skills/orchestration/goal-griller/references/opencode.md
884d1aa86ec53d17b26e2c60eac54ff7363ac6102f7f52a5e7d501fc0a4146e9 4269 0o644 package/runtime/claude/skills/orchestration/goal-griller/references/pi.md
400661cac92f7cbc76f3293ca550f77849a689b342f7912246ebc75d690cc625 11195 0o644 package/runtime/claude/skills/orchestration/workflow-governance-router/SKILL.md
0bdf5cb27e2f1426b026da10aa560e77c84fe5e970396b31bb4883d49fd4cea0 12396 0o644 package/runtime/claude/skills/orchestration/workflow-governance-router/SKILL.vi.md
b3bd889e1b9718883ca1f82312a3ccf34dda79735107120673b4d78d371e45cf 565 0o644 package/runtime/claude/skills/orchestration/workflow-governance-router/agents/openai.yaml
4d8e8c686a266908b1642c829c7daa2ad7572e989e802432ec3dc9e4010435c9 47741 0o644 package/runtime/codex/AGENTS.global.md
76878225fe139b9f3b9448f021fe58788469e7271595a6072bdca62954cc7479 5169 0o644 package/runtime/codex/policies/codex/workflow-artifact-naming.md
36e917df4b053a6c39d360e1396af48f0096760851eed2a8270c3b2ac4fbf847 2012 0o644 package/runtime/codex/skills/README.md
bf5848b5eccc96e56f90135896e77d8d3e7e12c54600e286a28ff03fac296fbf 2027 0o644 package/runtime/codex/skills/README.vi.md
f3a3c71711f284f625d4f4773bce9fbfaaf3a657ff751ce38e7d33f1044acdcf 5599 0o644 package/runtime/codex/skills/analysis/brainstorming/SKILL.md
499a921b275830b46715c6fd858412fd3d05dbe4f68470d0f413f6c9054729a8 6178 0o644 package/runtime/codex/skills/analysis/brainstorming/SKILL.vi.md
e8f6408824d5e4cbeb9bd2efa454139e4bf1067c16be71541d02a3996f7f5cc3 336 0o644 package/runtime/codex/skills/analysis/brainstorming/agents/openai.yaml
6385f2a8a0a7ec9c54e7d0ae8c8c6195c35659490e962cb60f0920f59fcf1dd2 4267 0o644 package/runtime/codex/skills/analysis/product-thinking/SKILL.md
1fd347a66596d9ca4a5899c70e9ff09aae62ed591837d1d9dd97f435745597f7 4870 0o644 package/runtime/codex/skills/analysis/product-thinking/SKILL.vi.md
6c0dad6f45767cce36fe8ff469a42a522812d9985980f64c9fdcb9927a6e9633 7679 0o644 package/runtime/codex/skills/analysis/requirement-analysis/SKILL.md
19a642e6036df5fbf96c273ae787ceee35489a3974e528c1ae19358679a74581 8270 0o644 package/runtime/codex/skills/analysis/requirement-analysis/SKILL.vi.md
946b60807bb6fa687396b626b0e42257c10b385dbcd0676846229d1eeb98eedb 1280 0o644 package/runtime/codex/skills/analysis/requirement-analysis/references/example.md
dfd1259553d31e6681f655727fc29f844e0c66e9ce4147ac4463ff0e5efff9d0 1508 0o644 package/runtime/codex/skills/analysis/requirement-analysis/references/example.vi.md
187bcdf48d657ad31079aa7c09171543b480ec32779ecad41db4ea5812cfb9ca 14796 0o644 package/runtime/codex/skills/analysis/sa/SKILL.md
12b4cb25af4b85e1c01acdb40d7db995714d527e2fcc0bd280a8f32ff358d3b9 17478 0o644 package/runtime/codex/skills/analysis/sa/SKILL.vi.md
39f21b8ed2f076006fea194056b2599f4e83fa42b5392f7d2ddbb81131ba8926 508 0o644 package/runtime/codex/skills/analysis/sa/agents/openai.yaml
288e1cb51ef4deb241fff410c30b4a64c3371c6d0d36ddfab65e30d9f8b85ae3 3921 0o644 package/runtime/codex/skills/analysis/sa/references/block-ownership.md
35e35ea2c18aff3ddea0082677b110895bc2950e227094394960929ec4ea649b 4651 0o644 package/runtime/codex/skills/analysis/sa/references/block-ownership.vi.md
be8635bf063ad6d349d26a1fad2481b2cb4e487ef8a67296135a588f7caccd4d 23986 0o644 package/runtime/codex/skills/analysis/sa/references/design-readiness-checklist.md
2cf6f02e10c6b7c1bebb29c6e1d96060cf11735110b969fcb7b955484c860a19 26662 0o644 package/runtime/codex/skills/analysis/sa/references/design-readiness-checklist.vi.md
3a844c87699f73666bcbf8c0c062b44ce06343aea0e1888477084ebbc833c15a 12854 0o644 package/runtime/codex/skills/analysis/sa/references/example.md
e4474cf1fbef580b530eb275bb8ea627146482243f6de9514ecb5b8cacfaefad 13208 0o644 package/runtime/codex/skills/analysis/sa/references/example.vi.md
818a85c0b2a9fa696df78d0f389398eda48b4438fa4ff0c886fa4d64b740d5fa 5501 0o644 package/runtime/codex/skills/analysis/sa/references/invocation-rules.md
8c209ddbc9d1892a1249e6b881107fc5948d152586853e51be4d9629725da268 6331 0o644 package/runtime/codex/skills/analysis/sa/references/invocation-rules.vi.md
1fb8607e14579d396feb3d1ca8436b79fa9de41c63ffebcfa530ca774dcc7afb 12397 0o644 package/runtime/codex/skills/analysis/sa/references/landscape-quality-bar.md
5648fe6f29fb3b722da4bd466d57e87439b7e4da462c0ef16a640a204d9fd2c8 15131 0o644 package/runtime/codex/skills/analysis/sa/references/landscape-quality-bar.vi.md
0224dd7b257cade7d41347bd29f6581f630ee5584aaf8ca6020c3c16193e7a49 5375 0o644 package/runtime/codex/skills/analysis/sa/references/metric-table.md
af9599244444676374d5cca50d33aaabded8695771a39567eb723f98109b1e9d 6226 0o644 package/runtime/codex/skills/analysis/sa/references/metric-table.vi.md
0fbb698e269f7cb7a31679190daed49c5c4905f34b1af7abb4a344d00f5d411a 6461 0o644 package/runtime/codex/skills/analysis/sa/references/output-schema.md
02f4fc8314e8a22d25336d9b7d7380df54ee7612ba42d53512abbaf478a226e3 7218 0o644 package/runtime/codex/skills/analysis/sa/references/output-schema.vi.md
0f1546b3b6b9f47e0ab41c286772beb1eb42e753cc9825d67ca7926f839b1b55 9221 0o644 package/runtime/codex/skills/analysis/sa/references/visual-encoding.md
8ced209732e9650916f3079481867b90a92e11bca544265dfcd9af5c343db979 10863 0o644 package/runtime/codex/skills/analysis/sa/references/visual-encoding.vi.md
c5d6dd213e11b346c0ab06febdfce9aa2aae08bbbf4c2b6501e1425e2d14e457 7904 0o644 package/runtime/codex/skills/analysis/system-design/SKILL.md
583f49d9a220180be03d15654f40229b75d8470b1e3873f1318c40505d0d93c3 8290 0o644 package/runtime/codex/skills/analysis/system-design/SKILL.vi.md
b76ef4dab50418a68f42628aeaf3ae50dea5e988a5409303526deb21d535489c 411 0o644 package/runtime/codex/skills/analysis/system-design/agents/openai.yaml
4a258ef7eabd584a6e5d99e12f45811f81dd5de262ff8cdb31568bab7dbaf8de 14369 0o644 package/runtime/codex/skills/analysis/ta/SKILL.md
c5510a672891cb470980288e6cf83282da99d24aeb2ce7a04687d920b131778e 16609 0o644 package/runtime/codex/skills/analysis/ta/SKILL.vi.md
150d7904544a16ec4cdc6f47bb1a79dddf69c9aefded391f7a0e561c3496a8d5 512 0o644 package/runtime/codex/skills/analysis/ta/agents/openai.yaml
288e1cb51ef4deb241fff410c30b4a64c3371c6d0d36ddfab65e30d9f8b85ae3 3921 0o644 package/runtime/codex/skills/analysis/ta/references/block-ownership.md
35e35ea2c18aff3ddea0082677b110895bc2950e227094394960929ec4ea649b 4651 0o644 package/runtime/codex/skills/analysis/ta/references/block-ownership.vi.md
be8635bf063ad6d349d26a1fad2481b2cb4e487ef8a67296135a588f7caccd4d 23986 0o644 package/runtime/codex/skills/analysis/ta/references/design-readiness-checklist.md
2cf6f02e10c6b7c1bebb29c6e1d96060cf11735110b969fcb7b955484c860a19 26662 0o644 package/runtime/codex/skills/analysis/ta/references/design-readiness-checklist.vi.md
a9ab09dedb10f0ff7d7d435dcf2c7764b9f99bff67a246f17af4ec3f0e253b6d 9786 0o644 package/runtime/codex/skills/analysis/ta/references/example.md
cd8e4181332eb74364a04751bd9b8c72e86e6bd833acd9e881195cfb994fa0d2 10308 0o644 package/runtime/codex/skills/analysis/ta/references/example.vi.md
818a85c0b2a9fa696df78d0f389398eda48b4438fa4ff0c886fa4d64b740d5fa 5501 0o644 package/runtime/codex/skills/analysis/ta/references/invocation-rules.md
8c209ddbc9d1892a1249e6b881107fc5948d152586853e51be4d9629725da268 6331 0o644 package/runtime/codex/skills/analysis/ta/references/invocation-rules.vi.md
1fb8607e14579d396feb3d1ca8436b79fa9de41c63ffebcfa530ca774dcc7afb 12397 0o644 package/runtime/codex/skills/analysis/ta/references/landscape-quality-bar.md
5648fe6f29fb3b722da4bd466d57e87439b7e4da462c0ef16a640a204d9fd2c8 15131 0o644 package/runtime/codex/skills/analysis/ta/references/landscape-quality-bar.vi.md
0224dd7b257cade7d41347bd29f6581f630ee5584aaf8ca6020c3c16193e7a49 5375 0o644 package/runtime/codex/skills/analysis/ta/references/metric-table.md
af9599244444676374d5cca50d33aaabded8695771a39567eb723f98109b1e9d 6226 0o644 package/runtime/codex/skills/analysis/ta/references/metric-table.vi.md
0fbb698e269f7cb7a31679190daed49c5c4905f34b1af7abb4a344d00f5d411a 6461 0o644 package/runtime/codex/skills/analysis/ta/references/output-schema.md
02f4fc8314e8a22d25336d9b7d7380df54ee7612ba42d53512abbaf478a226e3 7218 0o644 package/runtime/codex/skills/analysis/ta/references/output-schema.vi.md
0f1546b3b6b9f47e0ab41c286772beb1eb42e753cc9825d67ca7926f839b1b55 9221 0o644 package/runtime/codex/skills/analysis/ta/references/visual-encoding.md
8ced209732e9650916f3079481867b90a92e11bca544265dfcd9af5c343db979 10863 0o644 package/runtime/codex/skills/analysis/ta/references/visual-encoding.vi.md
5704eb55f680a7d9ff3d678a9de2ff5e6cd108df53b15b54287c5028f2913049 7697 0o644 package/runtime/codex/skills/architecture/architecture-modeling/SKILL.md
42b59cbee620f5e9571ac44c11ffb6d8b48a5632812aa0723e143a8dec9d3a74 8213 0o644 package/runtime/codex/skills/architecture/architecture-modeling/SKILL.vi.md
7f33ba4bd97d5545e91ab88f657ce320df9869332c30aa4fd56dbb1f8e2cb5c0 297 0o644 package/runtime/codex/skills/architecture/architecture-modeling/agents/openai.yaml
4c76ecd34b1e3232218b4d9c9647f1f99be832a0bca82b8d1cac4baef4f9683f 3976 0o644 package/runtime/codex/skills/architecture/architecture-modeling/references/model-contract.md
448ab64e4e679a323b126a529ad32b5d9ad49796e0227bbd4aeac4cd71a44654 4057 0o644 package/runtime/codex/skills/architecture/architecture-modeling/references/model-contract.vi.md
a9d63158f7a539090ead33ad576fb2921d66c1939d1f326f3d47159c700a5923 2745 0o644 package/runtime/codex/skills/architecture/architecture-modeling/references/quality-contract.md
561158de2c239987004c9ee108c112d66140bd1814530ebc60c25d826fce803b 2875 0o644 package/runtime/codex/skills/architecture/architecture-modeling/references/quality-contract.vi.md
8609f26595caea19a3a0d898239956acdb38b2b5f23a9519b003db51c92208c7 3906 0o644 package/runtime/codex/skills/architecture/architecture-modeling/references/render-routing.md
0617afb71c2599928f13e53a727b8f985679595eb6addb56b75ada703fb99a9b 3934 0o644 package/runtime/codex/skills/architecture/architecture-modeling/references/render-routing.vi.md
877c7e9fac210cbc750ed83e152dff75ae816b9988692989a87b1b6924743edb 10988 0o644 package/runtime/codex/skills/architecture/architecture-modeling/scripts/drawio-layout.js
92f6f8a4750473e8c165a5603c6f17b661ac316c1861c467b94fc6f1afee4e06 7614 0o644 package/runtime/codex/skills/architecture/architecture-modeling/scripts/render-drawio.js
7981af540ec62f1e6202db93e4036592933d790cb03f68df18791f9b50f0df3b 2689 0o644 package/runtime/codex/skills/architecture/architecture-modeling/scripts/validate-drawio.js
3994394bcb9f920c3b8434e351e6c18a249b93325a8575a3ed405af1c2fc3a00 6159 0o644 package/runtime/codex/skills/architecture/database-design/SKILL.md
a2db31d9969abf78e9306680f80be71a1f212ac55897b536ce672c49be5a49fa 6654 0o644 package/runtime/codex/skills/architecture/database-design/SKILL.vi.md
567a646c22a20c8d84c97ae6ba9d7861d355ecde46c469af0fd7ccc1b973cc15 7110 0o644 package/runtime/codex/skills/architecture/domain-architecture/SKILL.md
83abda04dc4eb8748fc83b2189320f94922a4276172d2f4a654161c41ddca68f 7764 0o644 package/runtime/codex/skills/architecture/domain-architecture/SKILL.vi.md
e32f882f50f88274b81dd53c4ed02cf1b7aa62a8c2183f127bf7c621fae214cf 4833 0o644 package/runtime/codex/skills/architecture/domain-architecture/references/dod-pattern.md
a09c27046c30970bc515f2d33f55922a935845eee2f6d4dadd50f571dadbeca8 5308 0o644 package/runtime/codex/skills/architecture/domain-architecture/references/dod-pattern.vi.md
62be931eb633bc492f20aec9f39ee9d5559af4abc2208ceacfd19d2977593bd4 8305 0o644 package/runtime/codex/skills/architecture/frontend-architecture/SKILL.md
3631d829e480ac8b4fab18255a4f754f84034e8fdc72716dcb79c46231d49bb6 8837 0o644 package/runtime/codex/skills/architecture/frontend-architecture/SKILL.vi.md
9198c3ebdee81dc4ae6a362fd25032d6e6faf27bf3992daba267ea4cfe6ac1f2 294 0o644 package/runtime/codex/skills/architecture/frontend-architecture/agents/openai.yaml
fa587523de2e8710c05dfb2ba702f48e275b1c5bc970c92ef3a1e030456f69c6 3447 0o644 package/runtime/codex/skills/architecture/frontend-architecture/references/module-first-pattern.md
7b3fa51a9e612f76ffeae59eff98bcdcb9ac326ecfa395e6e86cad5b59143ba9 3666 0o644 package/runtime/codex/skills/architecture/frontend-architecture/references/module-first-pattern.vi.md
2751993eaae72d7edea2705ca49cd1977aa7c64f8b1b14f14c4d2a5c970c26eb 8326 0o644 package/runtime/codex/skills/architecture/frontend-experience-design/SKILL.md
fb13cc5876a9cbc0eb1ad853ce49cc8c66a8ed7fa5dbb169ebaa419802f77dbc 8903 0o644 package/runtime/codex/skills/architecture/frontend-experience-design/SKILL.vi.md
942856bc663a98305302a29988419aaf49644755a451d24fff6b86ace41e60c9 342 0o644 package/runtime/codex/skills/architecture/frontend-experience-design/agents/openai.yaml
9e0696b94eb03835d17dae04c82374bf2f9e825987130f1ecbffdce64d60a74e 4516 0o644 package/runtime/codex/skills/delivery/branch-finish-discipline/SKILL.md
595f13f970b4846e40acb9731b9fb142bfe25495a8a143c25bed38064c358f4a 4788 0o644 package/runtime/codex/skills/delivery/branch-finish-discipline/SKILL.vi.md
2a0c1427e0af8de136cc4768cfe9ec919a0cc2a9cc1d31ce86b5a4fd5c990662 345 0o644 package/runtime/codex/skills/delivery/branch-finish-discipline/agents/openai.yaml
cafda5b5432d6171e96c4e149a81047e8b68fc74e698a75271b9541d2caea845 4330 0o644 package/runtime/codex/skills/delivery/ci-cd-release/SKILL.md
e2cc2ad40d4311a197cd5a4d87396f2f2de52527460845fbfcb0170dc2cb48a1 4498 0o644 package/runtime/codex/skills/delivery/ci-cd-release/SKILL.vi.md
018db01955a5acbc85cee6d1d7b0a75bfb6bb4ffa45aa4db4d9875aa70059b14 1123 0o644 package/runtime/codex/skills/delivery/ci-cd-release/references/pipeline-stages.md
79819e44522925d2fab997c5a0e760a1c47a413706dcdf793d7a3a12bd4a98a6 1099 0o644 package/runtime/codex/skills/delivery/ci-cd-release/references/pipeline-stages.vi.md
7f7313225b2338a7523e43d3fcdd3f20e262a72c76f6eba8cd8dc5d9fc2a60d8 1470 0o644 package/runtime/codex/skills/delivery/ci-cd-release/references/promotion-controls.md
adae24f96835307dd8772358ed7eecee97f66ea1de02aa80830caf8bfc4c1dda 1675 0o644 package/runtime/codex/skills/delivery/ci-cd-release/references/promotion-controls.vi.md
ba51327aadd63ec95403569c2675cab31ec3f773f878bbc6adf7f9b8afc8e29a 12996 0o644 package/runtime/codex/skills/delivery/code-scan-review/SKILL.md
577bfa474a25181d4d16e6d58331129070732026ec4ef6ab645e4de9cbf74782 13773 0o644 package/runtime/codex/skills/delivery/code-scan-review/SKILL.vi.md
dda02000d706c9b44a61cf3d1cae9988a27361907885ee3ea4114661540a82ba 1124 0o644 package/runtime/codex/skills/delivery/code-scan-review/references/go.md
da0691c3d5ef9c169e88bb0bf01c620db2cb58d5e90091400bc649bbef1c8456 1182 0o644 package/runtime/codex/skills/delivery/code-scan-review/references/go.vi.md
980d005a204ecec0cb863eefe21bb9e9a0f09ad819dcf8099ef8f70551f042b6 1195 0o644 package/runtime/codex/skills/delivery/code-scan-review/references/java.md
8a756f36a5738c2da2fe8e78d8461e1fb0aff02079cba5229e6d3cffe1c58c52 1245 0o644 package/runtime/codex/skills/delivery/code-scan-review/references/java.vi.md
677100ce3becb7e40c1e5a3632fce861b82669f63ed380e04151fa6b659d0348 1712 0o644 package/runtime/codex/skills/delivery/code-scan-review/references/php.md
c54b38ed161999a5460a4c07d66e7d0a2ec4a3f68006900db7f864eda9824e36 1730 0o644 package/runtime/codex/skills/delivery/code-scan-review/references/php.vi.md
2a91ced74611403889f779edfaaa8b9ee2c4be4593557f2080b7c660939c38d4 1182 0o644 package/runtime/codex/skills/delivery/code-scan-review/references/python.md
5c6a5eee4d00c75bb7f6955376c779d7c2166eced9e5d828087cdcc59624a45f 1209 0o644 package/runtime/codex/skills/delivery/code-scan-review/references/python.vi.md
29664790c3a7521404c7325f3d09cca89274aa8798fe8347fa2d1fbc66e0afd2 1592 0o644 package/runtime/codex/skills/delivery/code-scan-review/references/typescript-javascript.md
eaecf9f1687a4e37960cc0039df348f587770a7a4a92d365ac489506d0bcdf1e 1648 0o644 package/runtime/codex/skills/delivery/code-scan-review/references/typescript-javascript.vi.md
d0d2174ce37b500c245f720ecee39c8b83f5d85abfb3634581886594bff7c446 4845 0o644 package/runtime/codex/skills/delivery/containerization-packaging/SKILL.md
74ec780408df7b057ef340c3a549858dac61aaa704879a45c9b7b60648d6ba5c 5042 0o644 package/runtime/codex/skills/delivery/containerization-packaging/SKILL.vi.md
81a11827512c7bed5c65eb79a902190764153b63efdb4c9ee1c5263ae89d6953 1976 0o644 package/runtime/codex/skills/delivery/containerization-packaging/references/language-stacks.md
3317b0e84781201702efc9080b6fd1be5ff0a72d08cd675c14349351288835ae 1935 0o644 package/runtime/codex/skills/delivery/containerization-packaging/references/language-stacks.vi.md
1c38181205e045d3a2cb0ccb87209a6a3de15995a13a12074828f2d65f63e6dc 1264 0o644 package/runtime/codex/skills/delivery/containerization-packaging/references/workload-profiles.md
09072d475442291f1b207c0ffdbf4e1adc7a665a5cb319811a2e4a032e654a5d 1276 0o644 package/runtime/codex/skills/delivery/containerization-packaging/references/workload-profiles.vi.md
85dfbff144c1d767f3e2ef00e3a03723e240810993b4885948c35854191ff486 5695 0o644 package/runtime/codex/skills/delivery/database-change-review/SKILL.md
82ff083a3403e1b06d68ba5db098de9615950aa858269a24414033887e65ef82 6359 0o644 package/runtime/codex/skills/delivery/database-change-review/SKILL.vi.md
f6a78cc19ddbc90005ad93ee67edf021328ee3684cb1e70bac7bfc2ac2583bbb 1938 0o644 package/runtime/codex/skills/delivery/database-change-review/references/mongodb.md
d0c21267fd02b274ba6dd29098228476b2f8707b97ee43d3cd8cf2ebfec5a7f1 2120 0o644 package/runtime/codex/skills/delivery/database-change-review/references/mongodb.vi.md
ba62549ec268ff6458a313142c60a936e7ddd5ceec12d14e25be5fdc3adfd1e0 1927 0o644 package/runtime/codex/skills/delivery/database-change-review/references/mysql.md
5b2ecd9ef03b3b20fc32a52ad60f71884fbe1c50ecf9dc713283f48fdeadf669 2201 0o644 package/runtime/codex/skills/delivery/database-change-review/references/mysql.vi.md
a6775168a3d94c7dcaf915e7ce8318223a681c736505bffc7b21002c8c6c37f2 1859 0o644 package/runtime/codex/skills/delivery/database-change-review/references/postgresql.md
8b8267724b59194c26b202cca15755731df3fba9436269f3a0c49d2c20b0df37 2031 0o644 package/runtime/codex/skills/delivery/database-change-review/references/postgresql.vi.md
38dd305162dcc216728d962d9028893b9c92c76767c4cad2e795dee1afae71b9 4823 0o644 package/runtime/codex/skills/delivery/delegation-discipline/SKILL.md
0b9b74f16f6302d60bb46fd3cfb6395515fbd65d9df9d4d89fad6ff73a5b6876 5122 0o644 package/runtime/codex/skills/delivery/delegation-discipline/SKILL.vi.md
3c76a010c172cd1c9893ede8b209808c0eea3dfed36fd9dbed8bb7c9648f1696 358 0o644 package/runtime/codex/skills/delivery/delegation-discipline/agents/openai.yaml
370075c9c007856fef51dc5b8673b563535274d856ff1fa63a57e28c81ca8045 6572 0o644 package/runtime/codex/skills/delivery/deployment-devops/SKILL.md
df5e903f2ce4a7d077439da9737fa956efff122282959ba2652f2ac17da35c34 7021 0o644 package/runtime/codex/skills/delivery/deployment-devops/SKILL.vi.md
40201368218bacfcea8e7ce9d0a248a6ebeb7a61bbb6d83cfc626e9a65a03d4a 1302 0o644 package/runtime/codex/skills/delivery/deployment-devops/references/devops-skill-map.md
ad65a257b6697c202519df33f3d3333a4a03ef892fb5e1046f8ad66f7f590daa 1359 0o644 package/runtime/codex/skills/delivery/deployment-devops/references/devops-skill-map.vi.md
ac5337677285b3b933919902edbf8e4a642482017b9ea772636b64e676761254 2127 0o644 package/runtime/codex/skills/delivery/deployment-devops/references/local-docker.md
d89db20d8b09c740697624cdc2422cfd59c7c28a6ad770adf88fb1ac6c963087 2206 0o644 package/runtime/codex/skills/delivery/deployment-devops/references/local-docker.vi.md
2fe47a75fc4b546b4f2a68dd3751d370467f931d67a5af46694d59180410b73f 2180 0o644 package/runtime/codex/skills/delivery/deployment-devops/references/promotion-flow.md
bc0e36eb08e0f688c0c67282712679b3191cb0cbdbd82c75c564f990f2ad301c 2407 0o644 package/runtime/codex/skills/delivery/deployment-devops/references/promotion-flow.vi.md
91142518a8c0773c379d47fe77037fa059f9a42c1d651d4228d8ee1a55e74a96 2449 0o644 package/runtime/codex/skills/delivery/deployment-devops/references/runtime-targets.md
a83cd009629d4b36e49f43395bb325c26e4b7ac4d3b10f08c16110860fbf0a19 2600 0o644 package/runtime/codex/skills/delivery/deployment-devops/references/runtime-targets.vi.md
ae66c00839efe1ad1c59f5ea6c127f410bc84790c2b353bcdf0716c2e3c9ca9f 8531 0o644 package/runtime/codex/skills/delivery/frontend-quality-review/SKILL.md
3133c81d2a8e578a8228e7d4b7994a8fe59e1ee9273eb65bd99d12f78200642c 9248 0o644 package/runtime/codex/skills/delivery/frontend-quality-review/SKILL.vi.md
dd0563462ef5cdbc571c6047aa227ed28b9d362056dfb3988b48d8249d34f011 352 0o644 package/runtime/codex/skills/delivery/frontend-quality-review/agents/openai.yaml
2fbd387ace66a3d78f11be37c4638e8e1f757c60927b934d0a86583bd1f69a13 7000 0o644 package/runtime/codex/skills/delivery/implementation/SKILL.md
683e748713fa52efa4cf884569ac5030764dd5258d0768a1e78b9303c30dcba9 7497 0o644 package/runtime/codex/skills/delivery/implementation/SKILL.vi.md
8595a101880430937f5d87c8f43d5dca72243207ab8f65a27d5be3008bd55fc2 416 0o644 package/runtime/codex/skills/delivery/implementation/agents/openai.yaml
5d0760ec314b9c36ed27864e0ff59da70b1838e3a0d317d3aa9f0898c6c21722 4316 0o644 package/runtime/codex/skills/delivery/platform-runtime-deployment/SKILL.md
a623356eba4801255fa0974df4cf6cc60748b9405103f28f18e67bc162f90349 4551 0o644 package/runtime/codex/skills/delivery/platform-runtime-deployment/SKILL.vi.md
ebb720976d3bbe29b10a706d248c96b4efe75df9b8ff545921bbf4bc9a55636e 1489 0o644 package/runtime/codex/skills/delivery/platform-runtime-deployment/references/runtime-platforms.md
0541701b51e20b09407dcaeb53dae8f811e32697b62c1535714aee79beb8d058 1541 0o644 package/runtime/codex/skills/delivery/platform-runtime-deployment/references/runtime-platforms.vi.md
e951f084a81f1569d66fe525cf734a7f7c9e7c1704deb5f37338f2c7294f59c1 1379 0o644 package/runtime/codex/skills/delivery/platform-runtime-deployment/references/stateful-networking.md
9349b6625c5e8a60b4fa295624f31fafa342e965f65f369c4c4b79f2b28831a6 1406 0o644 package/runtime/codex/skills/delivery/platform-runtime-deployment/references/stateful-networking.vi.md
cdb6652fa25e471a563997d678609a77b95a98b03f40d2b55a56ffab2f44e2a0 9077 0o644 package/runtime/codex/skills/delivery/react-best-practices-review/SKILL.md
647d3cc291d8052e6e3cd269c710ae6120938b08a879307023054dd0dcd075ab 9676 0o644 package/runtime/codex/skills/delivery/react-best-practices-review/SKILL.vi.md
9ab923092a5b6d1dfee26a76164c296c7e24d173b55f12337686459bbb0cc7e8 376 0o644 package/runtime/codex/skills/delivery/react-best-practices-review/agents/openai.yaml
6e801975175f546cc84ae8125c025fd25958dbc2750224fd8281efa302356d6f 7399 0o644 package/runtime/codex/skills/delivery/react-web-implementation/SKILL.md
d2cdaa864b8375926d97e182e75eae0120fe842f12d549a2f84f6e0d8c1c1909 7800 0o644 package/runtime/codex/skills/delivery/react-web-implementation/SKILL.vi.md
d7c598e67e5e5264eec7918043a2a35aee23131a8d4c9f869767f06fd27b8189 360 0o644 package/runtime/codex/skills/delivery/react-web-implementation/agents/openai.yaml
5ee9fd8407dbc3d240d1cbf226ad1fa63c06fff388f81789c5dc660bcc264c33 4686 0o644 package/runtime/codex/skills/delivery/review-discipline/SKILL.md
b4946226d117b3ce196727dd376a8df9a09bee32b71989aa53eeffb749794b2c 4888 0o644 package/runtime/codex/skills/delivery/review-discipline/SKILL.vi.md
ed35aca831f20e6ae6f8cc68ada0786cbbf5da91b88db68e60519ab091159249 341 0o644 package/runtime/codex/skills/delivery/review-discipline/agents/openai.yaml
03abd4020b9e19714ebd1925e64b18a54a1cad48e01b8b99180e320d13bd7542 5082 0o644 package/runtime/codex/skills/delivery/task-breakdown-planner/SKILL.md
60a09098db96f288f3404ef675e175960f33a51fc0d2d28b905dd552012298c7 5338 0o644 package/runtime/codex/skills/delivery/task-breakdown-planner/SKILL.vi.md
62ddb24af223c4cca72a7f65773ff68d705e3030d72b09c94e732bad184bc24c 358 0o644 package/runtime/codex/skills/delivery/task-breakdown-planner/agents/openai.yaml
919b5e0d3e9338f67a78750a0106df59635add52b4ffeda14d23dc14616b843a 9894 0o644 package/runtime/codex/skills/delivery/testing/SKILL.md
5a34bb0c7d2567479c34b22f076405bc5a97e3b45e1e5c5c73be94e0e5acc2a0 10845 0o644 package/runtime/codex/skills/delivery/testing/SKILL.vi.md
417bcca926d82274686f3db77756a13872c1ab0afdb99db1f5a29ade85ee29d0 401 0o644 package/runtime/codex/skills/delivery/testing/agents/openai.yaml
740fba02797b8de1d4f92d213267ba4f54dc8ccc8974995a62c9b05091b6fda5 5684 0o644 package/runtime/codex/skills/delivery/worktree-discipline/SKILL.md
cc8df7173b67fb7200235c3fd89f86bdd433db745cd87640cedebefd16b84ac2 6271 0o644 package/runtime/codex/skills/delivery/worktree-discipline/SKILL.vi.md
34efb67e7061c465a8ce23cd671bf4621dbf05140831c2b58866a75d62ec30b7 345 0o644 package/runtime/codex/skills/delivery/worktree-discipline/agents/openai.yaml
8e24ac94092fab8d89936c4a814084855e5bf5060855b2cddf60de5ddc06db5e 7909 0o644 package/runtime/codex/skills/guardrails/artifact-governance/SKILL.md
51f79c0f789fb209bc995dee6432fc2de2096d031f7fba9ee5eaff210752b99b 9252 0o644 package/runtime/codex/skills/guardrails/artifact-governance/SKILL.vi.md
ff8b7a9caf538ea358a81626e447f610389cb6f5ce89b7f20dff6d434aab9e31 8270 0o644 package/runtime/codex/skills/guardrails/artifact-governance/references/ownership-table.md
6409a7def845fe5cee140a1b0f96d70e14a8f6e689fa407346c2ac2e61928c52 8895 0o644 package/runtime/codex/skills/guardrails/artifact-governance/references/worked-example.md
ee4389ed9f0b8271e327a69f82f9200c3a85d585f86402e0c5c4af5ea1c9bd3c 4213 0o644 package/runtime/codex/skills/guardrails/definition-of-done-gate/SKILL.md
93ab5a193174077a86b5b044140d93f9e4575d871355900d6b4ccc4d8a9596ab 4513 0o644 package/runtime/codex/skills/guardrails/definition-of-done-gate/SKILL.vi.md
f876c20b7b9461d98bc574cf90e7e07042be60620e56dd89529e960a96440f52 3285 0o644 package/runtime/codex/skills/guardrails/definition-of-ready-gate/SKILL.md
f442e0954e1469286e6b179fa3186e1903aeb64e264881eed70025f8e6f6e66d 3370 0o644 package/runtime/codex/skills/guardrails/definition-of-ready-gate/SKILL.vi.md
aaf3ee5228ad08140531df6ffeb62df2d76999ead1b971015bfff01f2b9786a0 3710 0o644 package/runtime/codex/skills/guardrails/input-readiness-assessor/SKILL.md
4f89b5a9a78bd775d4752f1d3ff557c5ea5a1e89cc180f9fdb6a799ae6a70294 4272 0o644 package/runtime/codex/skills/guardrails/input-readiness-assessor/SKILL.vi.md
8a7d314f276c7d47d8920269959625412c59de9d05b677b30c10c497bce180ca 5016 0o644 package/runtime/codex/skills/guardrails/karpathy-coding-discipline/SKILL.md
ec18ba0262670bcac54cc280fa39d6de7fc1a9327eea15c988fd22c8122187c4 5083 0o644 package/runtime/codex/skills/guardrails/karpathy-coding-discipline/SKILL.vi.md
9b39f321c336028c027ee62f581f83ae7c693ea46cf1de3995b065391020c5d9 3873 0o644 package/runtime/codex/skills/guardrails/step-goal-auditor/SKILL.md
40e69ec401a6223a8f5eb2d019da3f5294e5b5b19829e2a79975372f43770f8c 4340 0o644 package/runtime/codex/skills/guardrails/step-goal-auditor/SKILL.vi.md
ffdb8723aa1ffdb8af37ad8e9e1a3ca4d1b3f6fc946596b86ec41d70ffdf674a 4146 0o644 package/runtime/codex/skills/guardrails/step-goal-contract/SKILL.md
3d81138cd5e9ca6c61eab772e4e1a60a643d9128d3b7acc0177ac7004f9f3af8 4613 0o644 package/runtime/codex/skills/guardrails/step-goal-contract/SKILL.vi.md
94ca54703e25be687d6e8353277396b79e7222bfef4311f8d73a7e34ea9eaaae 4698 0o644 package/runtime/codex/skills/guardrails/workflow-pack-audit/SKILL.md
c3c9708b326792c46ed9169dcf44830378477c0ccb7e0c993353ea39d4cadb9e 4978 0o644 package/runtime/codex/skills/guardrails/workflow-pack-audit/SKILL.vi.md
0bd2bacf5aa63e1c1ca14e83a4f69b1f955aa03602992be5c1d5106d543e6677 343 0o644 package/runtime/codex/skills/guardrails/workflow-pack-audit/agents/openai.yaml
417e13f34db40119da2d6f0f2ceb362a67b04d2a1311b7e465667efdc6b4f73e 5082 0o644 package/runtime/codex/skills/guardrails/workflow-pack-audit/references/checklist.md
c4d7d5c8e85119cb4fd70350dfaeafaadb8455f702a4db8ff3ed30fe2466634c 5392 0o644 package/runtime/codex/skills/guardrails/workflow-pack-audit/references/checklist.vi.md
64214cc0f918098840876d74c042722413aa4f9f5966288964513d248ba8d510 6568 0o644 package/runtime/codex/skills/guardrails/workflow-pack-audit/scripts/audit-workflow-pack.ps1
f60ec2dd42f466457ef94c8bdde374a995a7cef8115d3fbf9ccca144f0324b61 3222 0o644 package/runtime/codex/skills/guardrails/workflow-pack-audit/templates/audit-report.sample.md
0353c7cd6b78eba50187cf53abb5d38ee071fcdac9a1c327b22d5ff5487b2961 5216 0o644 package/runtime/codex/skills/notebooklm/SKILL.md
3cc9b74a22e804145004c4106be44327f340efcd6cedef7d6031d3485ab08406 8286 0o644 package/runtime/codex/skills/obsidian/json-canvas/SKILL.md
49764781d2cbf7a55a4cde092cb1cb3fbe6fcd5d279f03c7b07302ec046df10c 6746 0o644 package/runtime/codex/skills/obsidian/json-canvas/references/examples.md
3f7722ad1fc4c956e17ae9b5369488c826bbdb8a9bc2f9f245d2b45e2bd94d00 8747 0o644 package/runtime/codex/skills/obsidian/obsidian-bases/SKILL.md
fb40b56d66bdfc1587f14babe03fb9e7eac66b3254d6b1e50d9f030072bcb721 3295 0o644 package/runtime/codex/skills/obsidian/obsidian-bases/references/examples.md
7041e0990c7bab9abdb557d7d85311ab0da2c1c658426c8abd09580c6dd43201 6546 0o644 package/runtime/codex/skills/obsidian/obsidian-bases/references/functions.md
8cea8e83c2503e0438cf5216ce28a6a1a85c86cb97be5788e965cc5ccf6d8d74 8586 0o644 package/runtime/codex/skills/obsidian/obsidian-markdown/SKILL.md
647ff9612e8eff128591df9a6481a0eda0ceca86bbe3d35e4d5d1045571c4151 1008 0o644 package/runtime/codex/skills/obsidian/obsidian-markdown/references/callouts.md
465766a55b960762a25a631e1d5881697b0c104823794d52cbe88a12d2fd422c 2382 0o644 package/runtime/codex/skills/obsidian/obsidian-markdown/references/diagrams-and-extras.md
84d56f1bad1d2885f5c59e1140650f30d57c9f1c62b8bec5d0778e00d4525b1b 34882 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/SKILL.md
bbad7cea83022a322f5a3d72daabd6dc4bff7bd6507c55e98fe923bf327afe22 36811 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/SKILL.vi.md
90c352a7aedfacffe26228b7c2b4fcc95578493878fc4ceea7b6c669346e51ea 7080 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/adaptive-planning.md
4d92b7333c2cbc932ef2faa8d5a453d3b73063cee9cbeab53af52bc3c522d74f 7290 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/adaptive-planning.vi.md
f4abe7f9adc6f8545cbdf00fb093e6ce789afc3a70e28a3b6d0701515ca64317 14468 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/end-to-end-examples.md
2c1474c6fd304766246f17a64a19b062e45656540f97e48c53707cf15d23afb5 14995 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/end-to-end-examples.vi.md
869d0583428db28620ba96f454ea71014e0d44ad0d151f6ddb39d9ac59e2c53e 12845 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/execution-runtime.md
a4ef9150a10e1e4e8ee469dd54931b1d69ef3081879fa8558317e1e799d4bbae 13443 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/execution-runtime.vi.md
db651a8c4d219e8875549467a99ca5ab17d7752fbcd3a0d2a2e943b9978057b3 12515 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/implementation-blueprint.md
d7ac12b8e7407330c0cf3cf00bde713fd02969e684163d5cb19a1b51a947466a 13174 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/implementation-blueprint.vi.md
b5432dba1b0fdf5733e7b430df5da584c07abc0ef7f6ec27f76876872fcb3e2c 12731 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/role-aware-workflow.md
da4cf5c8c4daee9c94903bbfd75c065bebfe7f1adfd7cc16b528693f439e44c4 13174 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/role-aware-workflow.vi.md
bde5feb9fad70e48bd59b63d2f466bceb33a1a6fcfa8e234efbf41800041cf86 8166 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/sdd-merge-strategy.md
29d123904179e1b0d015ecca009968204477a9a5f5050964127601c1a954fe51 8424 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/sdd-merge-strategy.vi.md
2c91d332032e9baec27d28dd9328ded4cfa855ebb8ab6b0e093f6567cd4ac6c7 11734 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/spec-driven-development.md
d0fe8b2ad157e7920b35a77c430b92d3d684632852d20c50cef4c755d1d9dfb3 9358 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/spec-driven-development.vi.md
517611cd66b69746ccf69ef279c904f9fbcd079a25ca77644dcb66aebeabe203 11836 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/target-architecture.md
8fd584a3853b74d0a8f437b6944f814489acd5cd7e6e6a604c946a46daf89167 12384 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/target-architecture.vi.md
f9d02ff186f0f23b27a2735fcc57e60a4e31eff949c7d68e74085276706a0f19 27311 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/work-item-materialization.md
2d68abe65d79c95d0719519b6f581dd7a276aebb0108e03a5846ce0bc7a0caf7 27065 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/work-item-materialization.vi.md
d18f407a2e81ff91e84ab4f80d10cb1838940bcf087508bb837fe1b20e163b43 24836 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/work-item-protocol.md
178628a5433669f6951333f842fa155726abb71f5d6db0483874e44b27fe52fc 23426 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/work-item-protocol.vi.md
4696510c55f48ac97401750034f7bacf8136f310e2f8cb95ab85198641b40618 143397 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/workflow-chain.md
78c30022bbe3a7d8b750ba54203d326b4213f91a23963e432152d8de19797f12 141630 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/workflow-chain.vi.md
de47f5219f9ad79d2fce035ed69fec5fb77b25d65040c326e9fb32c8dc67029e 13964 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/workflow-ci-enforcement.md
62f60aee68c523bea09acb9c2ddabc4e433d3650b856d7b5060fd03e1df44772 14458 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/workflow-ci-enforcement.vi.md
ffd6ea1b2de6d102264ac2926d6cbbce6d1a39a8418d39043a137f3ce9d05f6d 24272 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md
58cebc99965d11e9add6ed4a2438e5998ac56c915d587eecb400833ca1e1c4b1 25613 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.vi.md
3e4a5f6944136838e5c677dd21b5adfb51c1e7cffe1f6223980330df02726fa5 16067 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/workflow-overview.md
73de2170cc828c8157c1a35201873f5186b538ac4dabd85edc6657de78f60aca 16746 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/workflow-overview.vi.md
13d0dacd6738e94cee2ab92dcb335333365aa0a4e4ee08cf72f7357ed8955ce5 3616 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/workflow-versioning.md
0fcae3fa4623fa3201c8c07f660e4d57f4895b95e298146c2b05bb25edd7c8aa 3642 0o644 package/runtime/codex/skills/orchestration/codex-workflow-chain/references/workflow-versioning.vi.md
74bbcb57f9d3ebe3ca39f5f500b02724326963f3bb08a1ab957ab858f874db20 5253 0o644 package/runtime/codex/skills/orchestration/goal-griller/SKILL.md
b8a1e5dea85166673d80f0f7a05e2ad799d97b061f0a793fe56058389cd9c25c 4581 0o644 package/runtime/codex/skills/orchestration/goal-griller/references/claude-code.md
f815eb373babe28f34a9d54a23e0e5fcef27fb4504da1105481df123bcfa2ad1 4232 0o644 package/runtime/codex/skills/orchestration/goal-griller/references/codex.md
71747802077941561cda0604e37fba46de3f1b7268c57aeb5cd4f2317fbfb2ba 2539 0o644 package/runtime/codex/skills/orchestration/goal-griller/references/generic.md
3c473320b0e7eb9213a9e4a0a9eecbce0720bc028693032b098490ab8a5f2e7a 4575 0o644 package/runtime/codex/skills/orchestration/goal-griller/references/opencode.md
884d1aa86ec53d17b26e2c60eac54ff7363ac6102f7f52a5e7d501fc0a4146e9 4269 0o644 package/runtime/codex/skills/orchestration/goal-griller/references/pi.md
400661cac92f7cbc76f3293ca550f77849a689b342f7912246ebc75d690cc625 11195 0o644 package/runtime/codex/skills/orchestration/workflow-governance-router/SKILL.md
0bdf5cb27e2f1426b026da10aa560e77c84fe5e970396b31bb4883d49fd4cea0 12396 0o644 package/runtime/codex/skills/orchestration/workflow-governance-router/SKILL.vi.md
b3bd889e1b9718883ca1f82312a3ccf34dda79735107120673b4d78d371e45cf 565 0o644 package/runtime/codex/skills/orchestration/workflow-governance-router/agents/openai.yaml
16dd092e45075aabc2f6abb3b75c43c995068111bc3b7df0a254cc1a9ffbf073 17497 0o644 package/scripts/audit-workflow-pack.js
fd75674a72a7e578f9a51e339ad6708c944c6b8c6e87c5e34bf846c99f82b964 7626 0o644 package/scripts/bump-version.js
de2a7e84bd0c297092d1179f34d6aaf07ac5f4a15b9ab5dfabad48404435f3c7 14523 0o644 package/scripts/change-item-utils.js
c4359155155d9cb209aa58fc53c717bc81bca5e92f7071da48281abe1068b8ff 12115 0o644 package/scripts/change-item.js
773c5b3c974b231503256607c414cfea915ee79c4411d1d535048032294a98f4 17149 0o644 package/scripts/cr-aggregate-reconcile.js
8df867a7c4349106205e283f8e648085a33ddc55677e7fa584316f705e36a391 4470 0o644 package/scripts/init-workflow-bundle.js
d30ed13189b3a8693445d22bcb6a59d45acf3cee36367c243e730a5f02bc3555 75746 0o644 package/scripts/materialize-work-item.js
2574124f70d8245430a4f8646e70f0b228c1fe532efd2f3098ad40f24e112a49 53970 0o644 package/scripts/run-workflow-authoring-smoke.js
2f0c636a9077c7ca48904ce928515347459ac3bddc97161d6981dafc8bf3631f 17386 0o644 package/scripts/run-workflow-bundle-smoke.js
488cf70ae651000078a6d8b78397cd45e6c9b815913cc7fcfe3d267ec9c6b9d9 3320 0o644 package/scripts/run-workflow-governance-fixtures.js
f38c648fb0da799e18a76f20effc416e76483a574b038a83814bec84f6284e35 15252 0o644 package/scripts/scaffold-change-package.js
40375e2905719de414e37fd93f0412572d96ca64b0a92add3c1061c7837c70bc 30180 0o644 package/scripts/scaffold-workflow.js
63fb29d0dcd453fac09edae209af44cd3db0eb323b4599289a8161dabab6880e 9502 0o644 package/scripts/sync-workflow-bundle-runtime.js
26b6bd6be16eb5855a2f4e01e3701677452beea7d4e5cccf84f012a3ef6d0746 25014 0o644 package/scripts/validate-work-item-protocol.js
0056265619ba7e152f49cc343e9ddc13437807f1bed11e061c0dea5fb091df09 5227 0o644 package/scripts/validate-workflow-artifact-names.js
6994740261a16f4e6d3a95984bc0b1792343deda37f7fc42192876fbf41e9959 12051 0o644 package/scripts/validate-workflow-change.js
1e8c91e93f519287ee23ae64a9ef27550c96b47e3496920c344c304652a27040 11855 0o644 package/scripts/validate-workflow-execution.js
bfeeb4f3c4268431a8aa289788846acedb9ece32b476be65a573d7c3a6659da4 41998 0o644 package/scripts/validate-workflow-governance.js
a56a40c58cdd110759f5f6044d7760f7662c61ebada8866e1e1cd30d67d8c681 4345 0o644 package/scripts/validate-workflow-planning.js
7d3b3ad2be82df0a2f6402f863fcdfedd8267813ab66785cb779875740dc996e 16010 0o644 package/scripts/validate-workflow-sdd.js
38cb6ed4fd8cb10b4ac877f57a68879f9c121a0e7db1417af03b324ed570ed9a 1096 0o644 package/scripts/validate-workflow.js
df364cc3e497a14b8a0eaa49305af9e3aca84bfac34ab3af47f04cf50f00737e 36727 0o644 package/scripts/work-item-protocol-utils.js
b76e244067c4a3357d679309131e2ff40b14e1c4fadc4e022597388e5e6c3ba9 43928 0o644 package/scripts/work-item-protocol.js
4244c5c3a257aff065babbfa8ee5bfcb8ff11c12d5653ccbe6edfb66a5dcc885 11841 0o644 package/scripts/workflow-adaptive-governance.js
77d5278edf0fa5e4d7c488c9a9060d41eb00b116f900237a2105e4ff5dc71cdf 16391 0o644 package/scripts/workflow-approval-transaction.js
2e7d89b2b82b10195ab1bc4b37a6d158f7b7ffc7254e3138c90fa2808703b99c 24643 0o644 package/scripts/workflow-bundle-cli.js
33df27d97af98c6a17f995c8a9452b01757e0f112cb93db6fc2c25b77cb6e425 34734 0o644 package/scripts/workflow-bundle-utils.js
1cafa09e3c9b9a30fc684f1a4243a0f37d526b75dd675b634a901b4eb07ffd9f 13088 0o644 package/scripts/workflow-capability-control.js
ee3ae1ecdeb71220e4a1c7e28aab1a23d2c1fe670b7734a88ad138c3ad2ce91f 4398 0o644 package/scripts/workflow-change-definitions.js
0b86543e4052ca9e51b5f59827dfb8ccdf2c4b94b8b18bc3dd6c275bbeee2b7e 9958 0o644 package/scripts/workflow-execution-definitions.js
773a512163349ab07a6077f2a6ab6c1da242afe2c6de8de0845a3518ebbf224a 40438 0o644 package/scripts/workflow-gate-evidence-utils.js
55eafe3495517c6084ad97cb989676e183e6f2c0a0bee29dbe4cf052b9faaf6c 27585 0o644 package/scripts/workflow-gate-review.js
c55ce5657f1af12621ec6d3e6fb29a3bed93cc6fa114f44982c5d69bc68d45fa 1731 0o644 package/scripts/workflow-governance-definitions.js
0fa8503e164d0418715f2f7feedc198cb15d7549d7a7bf9752dfc58b2977dd79 761 0o644 package/scripts/workflow-planning-definitions.js
de0faa653ee99494f43b2fee0bd3fe91d7c5f13700834121eb30a9c6d8cf083c 8558 0o644 package/scripts/workflow-sdd-definitions.js
028ff36aa226169091c5b26feae3f8f8f0d6eb883b37bfdcf0bb50a290fefba0 27324 0o644 package/scripts/workflow-step-definitions.js
3b63266d63eaf72b527343c6b0eed7b290ef3e1b270963ec25378fa34a63f09f 17020 0o644 package/scripts/workflow-telemetry.js
c7e04fbb2a7dd757b01f52d0a862abbf8a6ee9675169c14f6533d408e50a0ab5 22527 0o644 package/scripts/workflow-trusted-approval-utils.js
039876afce63360439f6bd8f609344b15fb5843de50cde681ab3c1625094f60b 7880 0o644 package/scripts/workflow-validator-utils.js
6b6952ba6a2c02e5aca215835b7b7cf04fbbf5433932871f8ce40f09a560d05b 3496 0o644 package/tests/fixtures/workflow-governance/README.md
1b3ce5a8248c3e5b09771dbc9c28197e6aaebdd127f0d5e646c9f2e7b605ba11 448 0o644 package/tests/fixtures/workflow-governance/contradictory-protocol-state.json
525c15dfb33c2b86f5816794ab630974de1421a83e30872605c220629f24045f 206 0o644 package/tests/fixtures/workflow-governance/deduplicated-role-output.s06.md
8d4736616befb3af08092e6c99a930d4f468414e51861c0971dc0660c418eac7 151 0o644 package/tests/fixtures/workflow-governance/duplicate-acceptance-coverage.s06.md
29b22ee41b473ec81bdb4f1bf5fbd49d88e87d4a056c763c51bfc9fdd2a237a4 161 0o644 package/tests/fixtures/workflow-governance/duplicate-human-review-points.s06.md
df0bca00bf13c18876007d87ebfb107d3f76513dc45c18aa652cf427075dfd28 180 0o644 package/tests/fixtures/workflow-governance/duplicate-path-map.s06.md
c083b76f80e2cfa39c63f7f7a5ab005e74d530620064eb53a9bdafb3d548e772 191 0o644 package/tests/fixtures/workflow-governance/duplicate-tdd-targets.s06.md
6deedf3adeee26274c39683eb15694743f4670b0d8115b3ef4b432e1c9b3b74c 164 0o644 package/tests/fixtures/workflow-governance/duplicate-technical-sequence.s06.md
723258a335ece8e6eaf5f80a631988303a86cc68e989c231073a3abadbb04cb9 227 0o644 package/tests/fixtures/workflow-governance/exemption-with-reason.md
37083856d8cde3628dc661069d49026e06d1936a915a8b9da04b0624db969c06 152 0o644 package/tests/fixtures/workflow-governance/exemption-without-reason.md
f34fb454b675a4dff8abf1e744e49cb071e9b3f15bff25e3e44b5e59a2b4f72c 2045 0o644 package/tests/fixtures/workflow-governance/invalid-checklist-mismatch/workflow/billing-export.s06.task-breakdown.md
0c09d67e3319e1fdc32e4b3cacfab012d2b5414abebd12d1f9319b6df693f4fa 237 0o644 package/tests/fixtures/workflow-governance/invalid-coverage-total.s08.md
ebb28828307595e86668b092c08f0746d1c04351645e59846c9127977c948b3b 368 0o644 package/tests/fixtures/workflow-governance/invalid-empty-required-evidence.s04.md
16124231192683abdb03cc8ec3eaf4b13285c82773be48643cba505fe4860f20 1497 0o644 package/tests/fixtures/workflow-governance/invalid-missing-block/workflow/search-filters.s01.restate.md
a15139d739093a1fd1577235e28f0d4e99743e252d9a9dd92b60722828bf71da 2561 0o644 package/tests/fixtures/workflow-governance/invalid-option-count/workflow/stack-choice.s05.technical-approach.md
719f5838bdb895b59af8a8809fdddf2adde57358029b80cbb747c40108c557f1 680 0o644 package/tests/fixtures/workflow-governance/invalid-placeholder-evidence.s04.md
0d6d618864dff71dab0fc9aff2b29857316eb55a10dea8d95592b82aa8100aee 2126 0o644 package/tests/fixtures/workflow-governance/invalid-reviewed-gate-pending/workflow/gate-pending.s04.acceptance-criteria.md
610670aff70e6d59e10b1bc0ef12a488cc7749f8343494dc3370510f80f58e31 2342 0o644 package/tests/fixtures/workflow-governance/invalid-s07-rule-evidence/workflow/search-impl.s07.implementation.md
ecc3a823524dfab1d8fa1617b9f880542c8a184a6e52235725d3de2fb4752076 2349 0o644 package/tests/fixtures/workflow-governance/invalid-waiver-missing-approval/workflow/payment-cutover.s08.verification.md
82265eac486892606c3bf66539874fbb6b837f44b4c9f19a9261fb32c085a190 2525 0o644 package/tests/fixtures/workflow-governance/invalid-waiver-wrong-authority/workflow/approval-authority.s08.verification.md
f99ecdc1fcefa368c83ffc476f0382937c0feeae7967850f195e110e77a234d2 204 0o644 package/tests/fixtures/workflow-governance/project-context/checklists/default.md
56d77f8f470c03a177760ccd2fd219826a30f48533e3e6607b061f0191915fa2 184 0o644 package/tests/fixtures/workflow-governance/project-context/checklists/design-review.md
cb7275cc35f3aced831da04c733182b0460e10e7e24182262ae00fce70ee77d6 170 0o644 package/tests/fixtures/workflow-governance/project-context/checklists/regulated.md
f755da7f63a56e2af34268c5e581096aa0ee379e41a3c908e2a69a7ce52a3220 195 0o644 package/tests/fixtures/workflow-governance/project-context/checklists/strict.md
5e00535e957864da20a1b7f365caf04c6aa4f0f14381aca0360e2165a67990d0 140 0o644 package/tests/fixtures/workflow-governance/project-context/custom/design-review.md
8c74307f9a27e9fcf8a5636839340d2cfcc594d8e2ca7a87ebe5e4d03154296a 646 0o644 package/tests/fixtures/workflow-governance/project-context/governance-exception-register.md
2c8f7d42a422099a5ce6cd213b3654f8edd6ad1f86f5cc51ca8f235216b6304b 352 0o644 package/tests/fixtures/workflow-governance/project-context/project-context.md
ff9f9993015c8848cf423478a3b3bf07ce003f5155d2fc1189e40e6174e46f29 394 0o644 package/tests/fixtures/workflow-governance/stale-gate-receipt.json
c5b583a3de149afba1d511f7c239fdb74265e5f540de396a3dacb4b58d15b4f8 97 0o644 package/tests/fixtures/workflow-governance/unplaced-artifact.md
407e3af449f191d6e74d62d930ee55a4abe067cefe012cea398abfb26c747940 3497 0o644 package/tests/fixtures/workflow-governance/valid-custom/workflow/design-refresh.s05.technical-approach.md
b5958483bc075db826c7dd556f42bfe72fd4e35d726289e6f98849b0d565fb1f 2976 0o644 package/tests/fixtures/workflow-governance/valid-default/workflow/customer-search.s01.restate.md
38411e492f411a9026556e0d2418c8c3c8dcb86498d99c608e9bf34781092a10 4339 0o644 package/tests/fixtures/workflow-governance/valid-default/workflow/customer-search.s04.acceptance-criteria.md
640d8a927f5fedebaab108389a7f342a45c748fee63eb18062b5fb7e8f0a672e 3520 0o644 package/tests/fixtures/workflow-governance/valid-default/workflow/customer-search.s06.task-breakdown.md
9fdc89fd7e58b6b9886483a9fc03815e0e0127857244d8dd236b4496930c1b13 3101 0o644 package/tests/fixtures/workflow-governance/valid-default/workflow/customer-search.s07.implementation.md
3baa93318ae009c3ff2e2cd456208821eae5a8f668ea1dad9d1e1505350002d2 3638 0o644 package/tests/fixtures/workflow-governance/valid-default/workflow/customer-search.s08.verification.md
c9442ff020e19057bc11c0836c726e847ea6794369c06c938a77083d71e3561e 3090 0o644 package/tests/fixtures/workflow-governance/valid-regulated-waiver/workflow/payment-cutover.s05.technical-approach.md
fa03e96fd3d6f85c523614a4f00cab32b4c1f73a2a3109c6c18ee0c4e2cf741f 3667 0o644 package/tests/fixtures/workflow-governance/valid-regulated-waiver/workflow/payment-cutover.s08.verification.md
5eddd48070673edd6e3a11e6588e3b715b1b688f8f045c69af89af44ec26ba2a 733 0o644 package/tests/fixtures/workflow-governance/valid-semantic-evidence.s04.md
0b5f032113bbdabc33afed2ca20c91cd356b0bba31f11252191755f77c2a9655 185 0o644 package/tests/fixtures/workflow-governance/workflow-contracts.config.json
bf54f295b74e496e3d94ab19f5ee20243caa717ebced2bcd59580022feedb969 1422 0o644 package/workflow-bundle.manifest.json
```

</details>

## Human DoD And Release Decision

At `2026-10-16T13:34:11Z`, haonguyen explicitly answered `accept` to the review packet for source `a50da628efb512dfac65d0f7bd8c18b86f41b460` and candidate SHA-256 `9d7c5395ff5fb3ae2a64d26089a2c4c62122fb769a7cacd2e3bcea3f6fa35e84`. This accepts the disclosed ESLint/Semgrep unavailability and manual review fallback, approves technical DoD and authorizes GitHub v2.6.4 tag/release promotion of the exact retained bytes after trusted receipts are sealed and verified. The mapped reviewers are QC for DoD and DevOps for Release; this records the human decision, not an autonomous approval.

Business Acceptance remains pending post-publication verification. Preserve v2.6.3; npm registry publication and live global installation remain outside authorization. Earlier pending-review statements above describe the pre-decision assessment. Scan coverage remains PARTIAL (tools did not run); the human accepted the disclosed limitation rather than converting it into a scan PASS. No publication has occurred.
