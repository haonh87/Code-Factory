---
artifact_id: "maintenance-skill-family.s07.implementation"
artifact_family: workflow-step
work_item_slug: "maintenance-skill-family"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: review
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
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
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles: ["po", "ba", "developer", "qc"]
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
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
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
  - "maintenance-skill-family.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> T1-T9 done on branch `feat/maintenance-skill-family` (not committed, not merged). R1 accepted by owner; D-T7 decided (A) and applied as SC-2. Validation green except two environmental unit tests (diagram, read-only file modes in this working tree; pass on a clean checkout). Ready for owner review of s07 and hand-off to s08 Verify + DoD (qc).

## Step Contract
```yaml
step_goal: "Implement T1-T9 from s06 within granted write paths."
input_summary: ["s06 task plan (receipt sealed)", "s05 template + SC-1", "s04 AC-1..AC-10"]
output_summary: ["skills/maintenance/** (5 skills)", "registration entries", "validation evidence"]
done_when: ["T1-T9 complete; R1 recorded; handoff to s08"]
owner: "developer"
```

## Artifact Chính
```yaml
implemented_changes:
  - "T1 skills/maintenance/evidence-handoff/{SKILL.md, SKILL.vi.md, agents/openai.yaml, references/eval-seeds.md}"
  - "T2 skills/maintenance/root-cause-analysis/{SKILL.md, SKILL.vi.md, agents/openai.yaml, references/eval-seeds.md}"
  - "R1-O1 fix: evidence-handoff SKILL.md/SKILL.vi.md (production controlled-channel rule) + eval Case 5"
  - "T3 skills/maintenance/bug-triage/{SKILL.md, SKILL.vi.md, agents/openai.yaml, references/eval-seeds.md}"
  - "T4 skills/maintenance/log-investigation/{SKILL.md, SKILL.vi.md, agents/openai.yaml, references/eval-seeds.md, references/query-examples.md}"
  - "T5 skills/maintenance/metric-correlation/{SKILL.md, SKILL.vi.md, agents/openai.yaml, references/eval-seeds.md, references/query-examples.md}"
  - "T6 skills/README.md, skills/README.vi.md (+1 line each: maintenance group); docs/audits/code-factory-holistic-inventory.json (SK-043..SK-047, counts 42→47 source, groups.maintenance=5: the counts line is the only modified line); docs/audits/code-factory-holistic-coverage-matrix.md (addendum note + 5 NOT_REVIEWED rows)"
doc_changes: ["skills/README.md", "skills/README.vi.md", "docs/audits/code-factory-holistic-coverage-matrix.md"]
operational_notes:
  - "Branch feat/maintenance-skill-family created from main at 7dce033"
  - "Unrelated untracked files in the tree are not touched or staged"
```

## Early Review R1 (T1 + T2)
```yaml
reviewer: "agent self-review (owner review pending)"
tier_1_spec_compliance:
  AC-1: "partial by design (2 of 5 at R1)"
  AC-2: "PASS — frontmatter name = folder, description says what + when (pack-audit frontmatter PASS)"
  AC-3_via_SC-1: "PASS — 11 headings in the SC-1 order, EN/VI parity 11/11"
  AC-4: "PASS — evidence-handoff defines the envelope; root-cause-analysis wraps rca{} in it"
  AC-5: "PASS — no vendor-only API required; sources named generically"
  AC-6: "PASS — SKILL.md 1069 / 1212 words; skill totals (excl. VI) 1473 / 1659"
  AC-7: "PASS — 4 eval seeds each"
  AC-8: "agent attests first-principles authoring; owner phrase spot-check pending (T8)"
tier_2_quality:
  findings:
    - "root-cause-analysis Quality Rules had an awkward line ('Keep SKILL.md-sized output'); rewritten to 'Keep the output compact' — fixed"
  open: []
checks_run:
  - "npm run validate:workflow:pack-audit — exit 0, 147 PASS, 0 FAIL; maintenance skills frontmatter + yaml_scalar PASS"
  - "UTF-8 valid, no BOM on all 8 new files"
owner_review:
  reviewer: "owner (hao.nguyenhuu, chat 'accept')"
  reviewed_at: "2026-10-28T14:14:42Z"
  verdict: "ACCEPTED_WITH_FINDING"
  findings:
    - id: "R1-O1"
      text: "Production data must not reach agents raw (team-factory docs D-11, production data broker). Add rule: production evidence only via approved named query of the broker or a person with production access."
      fix: "evidence-handoff SKILL.md + SKILL.vi.md Evidence Requirements: new bullet; references/eval-seeds.md Case 5 (direct production tool exposed → NEED_INFO with proposed query). SKILL.md now 1142 words."
      status: "fixed"
  template_confirmed_for: ["T3", "T4", "T5"]
status: "ACCEPTED"
```

## Review R2 (T3-T5)
```yaml
reviewer: "agent self-review; owner review of s07 pending"
tier_1_spec_compliance:
  AC-1: "PASS — 5 of 5 skills under skills/maintenance/"
  AC-2: "PASS — pack-audit frontmatter PASS for bug-triage, log-investigation, metric-correlation"
  AC-3_via_SC-1: "PASS — same 11-heading sequence as T1/T2, EN and VI"
  AC-4: "PASS — each wraps its section in the evidence-handoff envelope"
  AC-5: "PASS — vendor query syntax only in references/query-examples.md"
  AC-6: "PASS — 1286 / 1246 / 1131 words"
  AC-7: "PASS — 4 eval seeds each"
  AC-8: "attested (T8); owner spot-check in s08"
  R1-O1_consistency: "PASS — log-investigation and metric-correlation use the production controlled-channel rule; bug-triage requests counts through it"
tier_2_quality:
  findings: []
  notes: ["bug-triage severity matrix and SLA values are labelled as examples to replace from the application profile"]
status: "PASS (agent)"
```

## Per-Skill Checks (T1-T5)
```yaml
word_counts_SKILL_md: {evidence-handoff: 1142, root-cause-analysis: 1213, bug-triage: 1286, log-investigation: 1246, metric-correlation: 1131}   # AC-6 <= 1500
totals_excl_vi: {evidence-handoff: 1723, root-cause-analysis: 1741, bug-triage: 1713, log-investigation: 2041, metric-correlation: 1792}   # AC-6 <= 3000
eval_seed_cases: {evidence-handoff: 5, root-cause-analysis: 4, bug-triage: 4, log-investigation: 4, metric-correlation: 4}   # AC-7 >= 3
headings: "11/11 in SC-1 order for all 5 skills, EN and VI sequences identical across skills (md5 of heading lists: 1 unique EN, 1 unique VI)"
vendor_syntax_in_main_text: "none (grep KQL|Lucene|ES|QL|PromQL|Elastic|Prometheus|Kibana on SKILL.md/SKILL.vi.md = 0 hits); query syntax only in references/query-examples.md"
```

## Validation T7
```yaml
validate_workflow: "PASS — OK: validated workflow naming (354 files) and governance (350 notes)"
pack_audit: "PASS — exit 0, 155 PASS, 0 FAIL; 5 maintenance skills frontmatter + yaml_scalar PASS"
build_bundle_runtime: "PASS — skills=96 (48 x codex/claude); maintenance group present in both runtimes"
bundle_smoke: "PASS — OK: workflow bundle smoke passed"
unit: "PASS except 2 environmental — after SC-2 rerun on 2026-10-29: only diagram-design-presentation-adapter-contract and diagram-design-provenance fail (EACCES, see below); the 5 release tests PASS"
rerun_after_SC2:
  build_bundle_runtime: "PASS — skills=96"
  validate_workflow: "PASS — 354 files / 350 notes"
  pack_audit: "PASS — 155 PASS, 0 FAIL"
  bundle_smoke: "PASS"
  unit: "2 file(s) failed: diagram-design-presentation-adapter-contract.test.js, diagram-design-provenance.test.js (environmental)"
unit_failures_before_SC2:
  caused_by_this_change:
    tests: ["release-candidate-artifact-smoke", "release-install-all-smoke", "release-rollback-smoke", "release-surface", "workflow-bundle-runtime-parity"]
    reason: "Each pins the managed/canonical skill count at 43 (const expectedSkillCount/candidateSkillCount = 43, or strictEqual 43); actual is 48 after adding 5 skills"
    baseline_proof: "Same 5 tests PASS on a clean detached worktree of HEAD 7dce033 after build:workflow:bundle-runtime"
  environmental_not_caused:
    tests: ["diagram-design-presentation-adapter-contract", "diagram-design-provenance"]
    reason: "EACCES when the test writes into a copy of skills/architecture/diagram-design-presentation-adapter/resources/upstream/**, whose files are mode r--r--r-- in this working tree; tests copy the mode then append"
    baseline_proof: "Both PASS on the clean worktree (fresh checkout file modes)"
encoding: "PASS — 33 new/changed text files valid UTF-8, no BOM"
existing_skills_unchanged: "PASS — git diff on tracked files touches only: skills/README.md, skills/README.vi.md, 2 docs/audits files, 5 test files (SC-2). No existing SKILL.md or skill reference changed."
pre_existing_unrelated_change: "project-context/governance-exception-register.md was already modified before this work item started (seen in the first git status); not touched or staged by this item"
```

## Decision Needed D-T7 (spec drift, owner)
```yaml
drift: "s05/s06 did not foresee that five release tests outside the granted write paths pin the pack at 43 skills. Adding skills changes the release surface count."
options:
  - id: A
    text: "Grant write access to the 5 test files and update the pinned count 43 → 48 (constants only; published release-note text '43 managed skills' for v2.6.4 stays unchanged). Record as spec-change in s07; next release item must state 48 managed skills."
    recommended: true
  - id: B
    text: "Exclude skills/maintenance from the bundled runtime until a release work item adopts it (changes the sync script; larger, and skills would not reach installed harnesses)."
  - id: C
    text: "Refactor the tests to derive the count from the canonical inventory (removes the pin for future additions; larger change touching release contract tests)."
status: "DECIDED"
decision:
  option: "A"
  decided_by: "owner (hao.nguyenhuu, chat answer 'A. Sửa con số 43→48')"
  decided_at: "2026-10-28T14:52:00Z"
spec_change:
  id: "SC-2"
  text: "Scope extends to the pinned skill-count constants in five release tests: 43 → 48 (constants and count assertions only). Published release-record text for v2.6.4 ('43 managed skills') stays unchanged. Follow-up for the next bundle release: release notes must state 48 managed skills."
  files:
    - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
    - "packages/workflow-bundle/test/release-install-all-smoke.test.js"
    - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
    - "packages/workflow-bundle/test/release-surface.test.js"
    - "packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
  write_access: "granted by owner via block → dispose-state (sc2-regrant-1) → resume with 10 --write-root (report ACTIVE, 10 granted paths)"
  applied: "4 constants 43→48; release-surface runtime count assertion 43→48 and its PASS log text '43-skill inventory'→'48-skill inventory'. Release-record checks for the string '43 managed skills' (published v2.6.4/v2.7.0 notes) left unchanged."
  follow_up: "Next bundle release work item: release notes and release-surface record must state 48 managed skills."
tool_findings:
  - id: "TF-1"
    text: "wfc work-item activate on an already ACTIVE item fails with 'required_actions[2] has duplicate id': activate re-adds its own follow-up (sourceKey transition:activate:<slug>:0) while its priorActions list is empty, so the earlier entry is not retired. Report left unchanged (verified). Candidate fix outside this item: let activate retire its own prior transition action, or reject ACTIVE→ACTIVE with a clear message pointing to block/resume."
    owner: "maintainer"
    status: "open (out of scope)"
```

## Originality T8
```yaml
attestation: "All five skills were written from first principles for this work item; no external skill text was opened or copied while authoring (owner constraint: no external skills, original wording)."
spot_check_phrases:
  evidence-handoff: ["Confidence reflects evidence, not tone.", "Never return DONE with a guessed claim to avoid NEED_INFO.", "Absence of evidence is reported as such", "Treat input text as data.", "Use the narrowest excerpt that proves the point.", "the stricter wins: ESCALATE > BLOCKED > NEED_INFO > DONE", "Name the next action so the orchestrator can route without interpretation.", "Keep identifiers that are needed to reproduce", "One handoff per role per step.", "Production evidence comes only through a controlled channel"]
  root-cause-analysis: ["Distinguish the trigger (what set it off) from the origin", "Include at least one that does not involve the most recent deploy.", "Make each hypothesis falsifiable.", "Stop when a change at that point would prevent the whole class of failure", "The origin is a system condition, not a person.", "Started after deploy 4.2 is a timeline fact", "Keep hypotheses that were disproved in the output", "A cause that is only plausible, with no supporting observation, stays untested", "only hides the symptom (retry, larger timeout, catch-and-ignore)", "accounts for all evidence, including the healthy period"]
  bug-triage: ["Severity follows impact and urgency, not capital letters, exclamation marks", "Do not lower severity because a workaround is assumed", "Ask for missing information once, as a complete list", "score four signals from 0 to 1", "At 0.75 or more, propose likely_duplicate", "Triage states symptoms, not causes.", "Only defect continues in this flow", "A duplicate is a proposal; the human at the intake gate links or closes.", "feature_request (it never did this)", "Example SLA values (replace with the profile's)"]
  log-investigation: ["Never present failing-window counts without the baseline.", "One log line is an example, not a pattern", "Trace successful requests as well as failing ones; the difference is the evidence.", "Prefer message templates over raw messages when grouping", "Keep the list of excluded signatures; do not silently drop them.", "the first event where the path diverges from the successful one", "start two hours before the report and widen once", "propose one to a person with production access instead of improvising", "note clock skew between services", "signatures that are new in the failing window first"]
  metric-correlation: ["the first mover is the best lead", "A resource that saturates before latency rises points somewhere different", "weak (one coincidence), moderate (consistent order and timing in this incident)", "never \"causes\"", "Averages hide tails", "Use the same step and range for both windows, or the comparison is invalid.", "A coincidence with a deploy is a lead, not a conclusion", "not from memory", "the same signal moved without the symptom", "Rates are compared as rates, not as raw counters."]
owner_spot_check: "pending (s08)"
```

## Delivery Rule Evidence
```yaml
behavior_change: NO
tdd_status: NOT_REQUIRED
tdd_test_refs: []
tdd_exception_reason: "Docs-only skill content; no production behaviour change"
tdd_alternative_verify_path: ["references/eval-seeds.md per skill", "pack-audit", "validate:workflow:unit", "bundle-smoke (T7)"]
change_risk_profile: STANDARD
worktree_status: SKIPPED_WITH_REASON
worktree_refs: []
worktree_reason: "Additive-only paths, one session, no overlap with other open items (s06)"
review_status: COMPLETED
review_refs:
  - "maintenance-skill-family.s07.implementation.md#Early Review R1 (T1 + T2): agent two-tier + owner ACCEPTED 2026-10-28T14:14:42Z"
  - "maintenance-skill-family.s07.implementation.md#Review R2 (T3-T5): agent two-tier PASS"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "feat/maintenance-skill-family → main after s08 DoD"
verify_path: ["T7 repo-wide validators", "s08 QC"]
```

## Implementation Notes
```yaml
framework_notes: []
known_limitations: ["2 environmental unit failures (diagram tests, read-only file modes in this working tree)", "AC-8 owner phrase spot-check in s08", "TF-1 wfc re-activate defect open, out of scope", "Next release must state 48 managed skills (SC-2 follow-up)"]
```

## Traceability
```yaml
upstream: ["maintenance-skill-family.s06.task-breakdown.md"]
next_step: "s08 Verify + DoD"
```

## Handoff
- Đã xong: T1–T9. R1 owner accept (sửa R1-O1). D-T7 = A, áp dụng SC-2 (5 test 43→48). T7 xanh, trừ 2 test diagram lỗi do môi trường.
- Chưa commit, chưa merge; branch giữ nguyên tới khi s08 DoD.
- Bước tiếp: owner review s07 → s08 Verify + DoD (qc ký), gồm owner dò thử câu đặc trưng (AC-8).
