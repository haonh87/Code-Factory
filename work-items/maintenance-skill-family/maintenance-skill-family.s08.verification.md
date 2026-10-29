---
artifact_id: "maintenance-skill-family.s08.verification"
artifact_family: workflow-step
work_item_slug: "maintenance-skill-family"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
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
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
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
  dod_reviewed_by: ["qc"]
  dod_reviewed_at: "2026-10-29T02:41:38Z"
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
  - "maintenance-skill-family.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Verify of the five `skills/maintenance` skills against AC-1..AC-10: all PASS (unit 50/50 on a clean checkout with the change; originality search 0 copies). DoD accepted by QC (owner) on 2026-10-29. Delivered in commit 248feb4 on `feat/maintenance-skill-family`; merge to main after the DoD receipt is sealed.

## Step Contract
```yaml
step_goal: "Evidence AC-1..AC-10 for the maintenance skill family and prepare the DoD decision for QC."
input_summary: ["s04 AC-1..AC-10 (sealed)", "s05 SC-1", "s07 (accepted by owner 2026-10-29, SC-2, R1, R2, T7)"]
output_summary: ["AC coverage with evidence", "regression/compatibility summary", "DoD proposal"]
done_when: ["every AC has a verdict with evidence", "QC signs DoD"]
owner: "qc"
```

## Artifact Chính
```yaml
verification_scope:
  - "skills/maintenance/{evidence-handoff,root-cause-analysis,bug-triage,log-investigation,metric-correlation}/**"
  - "skills/README.md, skills/README.vi.md, docs/audits inventory + coverage matrix"
  - "5 release tests (SC-2 count 43→48)"
ac_coverage:
  AC-1: {verdict: PASS, evidence: "5 folders under skills/maintenance; each has SKILL.md (language: en), SKILL.vi.md, agents/openai.yaml"}
  AC-2: {verdict: PASS, evidence: "pack-audit frontmatter PASS x5; name = folder; descriptions state what + when"}
  AC-3: {verdict: PASS, evidence: "via SC-1 (s05): 11 headings in SC-1 order for all 5 skills; EN and VI heading sequences identical across skills"}
  AC-4: {verdict: PASS, evidence: "each skill wraps its section in the evidence-handoff envelope (status, summary, claims, evidence[], confidence, open_issues, next_action, reason_code)"}
  AC-5: {verdict: PASS, note: "N1", evidence: "no vendor-only API required; vendor query syntax (KQL, Lucene, ES|QL, PromQL) only in references/query-examples.md; grep of SKILL.md/SKILL.vi.md for vendor names = 0"}
  AC-6: {verdict: PASS, evidence: "SKILL.md words 1142/1213/1286/1246/1131 (<=1500); totals excl. VI 1713-2041 (<=3000)"}
  AC-7: {verdict: PASS, evidence: "eval seeds 5/4/4/4/4 (>=3)"}
  AC-8: {verdict: PASS, evidence: "originality_check below; owner confirmed in chat 'accept DoD' at 2026-10-29T02:41:38Z"}
originality_check:
  run_at: "2026-10-29"
  approved_by_owner_to_run: "yes (chat: 'Tôi đồng ý, a và b')"
  web_search: "50/50 phrases from s07 '## Originality T8' searched as exact quotes: 0 POSSIBLE_COPY, 6 GENERIC_IDIOM (same engineering idea in different words: #4 untrusted input as data, #13 falsifiable hypotheses, #33 healthy vs failed trace, #39 clock skew, #45 averages and tails, #47 deploy timing as lead), 44 NO_MATCH; no hit in anthropics/skills, obra/superpowers, wshobson/agents, mattpocock/skills, Elastic, skills.sh/agent-skills.md mirrors"
  github_code_search: "gh search code exact phrase, 6 most distinctive (#1, #2, #6, #25, #29, #37): 0 results each; tool sanity-checked with a known public string (returned results)"
  limitation: "Search engines and GitHub code search do not index all repositories; NO_MATCH supports originality, it is not proof"
  AC-9: {verdict: PASS, evidence: "README EN/VI maintenance line; inventory SK-043..SK-047 + counts; coverage matrix addendum + 5 rows"}
  AC-10: {verdict: PASS, note: "N2", evidence: "clean detached worktree of HEAD 7dce033 + this change applied (2026-10-29T02:28Z): build runtime OK, validate:workflow:unit 'OK: 50 workflow-bundle unit test file(s) passed', pack-audit 155/0, bundle-smoke OK; main tree validate:workflow OK; 33 files UTF-8 no BOM"}
notes:
  N1: "Skills describe capabilities generically (ticket search, log search, named query, controlled channel) instead of the literal issues.*/logs.* namespaces mentioned as examples in AC-5; intent (no vendor lock) is met. QC to confirm."
  N2: "In the governed main working tree, 2 diagram tests fail with EACCES because files under skills/architecture/diagram-design-presentation-adapter/resources/upstream are read-only there; on the clean checkout with the same change all 50 pass. Not caused by this item."
evidence_refs:
  - "maintenance-skill-family.s07.implementation.md#Validation T7"
  - "maintenance-skill-family.s07.implementation.md#Review R2 (T3-T5)"
  - "maintenance-skill-family.s07.implementation.md#Originality T8"
summary_verdict: PASS
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "AI proposes, human approves: all gates sealed by owner receipts (work item, spec, dor, approach, task_plan); R1 and s07 accepted by owner in chat"
  - "Scope drift recorded and decided: SC-1 (s05), SC-2 (s07, owner D-T7=A, write roots re-granted via block/dispose/resume)"
  - "No external skill text (owner constraint) — attestation recorded; spot-check pending"
  - "Encoding: UTF-8 without BOM on all new/changed text files"
blocking_items: []
owner: "qc"
next_action: "QC seals DoD receipt → work-item verify → close → merge feat/maintenance-skill-family to main (owner approval)"
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
regression_notes:
  - "No existing SKILL.md or skill reference changed (git diff)"
  - "Additive group skills/maintenance; runtime keeps group layout; installers manage 48 skills (release-install-all-smoke PASS)"
breaking_changes:
  - "None for users. Pack count changes 43 → 48; release tests updated (SC-2). Next release notes must state 48 managed skills."
rollback_readiness: READY
rollback_path: "Revert the branch commit (or the merge commit after merge): removes skills/maintenance and restores 4 registration files and 5 test constants; rebuild runtime"
```

## Scan Summary
```yaml
status: PASS
notes: ["Docs-only skill content; no executable code added. pack-audit yaml_scalar/frontmatter PASS. No secrets or real customer data in examples (identifiers are placeholders or hashed)."]
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["approval_gates marks this not_applicable for the work item"]
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["approval_gates marks this not_applicable for the work item"]
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["approval_gates marks this not_applicable for the work item"]
```

## Audit
```yaml
audit_status: PASS
notes: ["AC-1..AC-10 evidenced; AC-8 confirmed by owner", "Tool finding TF-1 (wfc re-activate duplicate id) recorded in s07, out of scope"]
```

## Definition of Done
```yaml
status: DONE
dod_decision: {decided_by: "qc (owner, chat 'accept DoD')", decided_at: "2026-10-29T02:41:38Z", basis: "AC-1..AC-10 PASS; notes N1, N2 accepted"}
residual_risks:
  - "Originality evidence is search-based (supporting, not proof)"
  - "Skill quality on real cases is unmeasured until the ai-maintainer-spike eval (S1b)"
  - "Next bundle release must state 48 managed skills (SC-2 follow-up)"
  - "Two diagram tests fail in the governed working tree (read-only modes); environment issue outside this item"
owners: ["qc (DoD)", "po/owner (AC-8 spot-check, commit/merge approval)"]
```

## Traceability
```yaml
upstream: ["maintenance-skill-family.s04.acceptance-criteria.md", "maintenance-skill-family.s07.implementation.md"]
next_step: "DoD seal by qc, then work-item verify/close and merge"
```

## Handoff
- Overall status: DONE (QC/owner accept 2026-10-29) — 10/10 AC PASS; commit 248feb4.
- Residual risks: originality dựa trên cam kết cho tới khi dò thử; chất lượng thực tế đo ở spike S1b; release kế tiếp ghi 48 skill.
- Recommendation: đủ điều kiện DoD sau khi AC-8 xong và delivery được commit trên branch.
- Release recommendation khi có: không phát hành trong item này; gom vào release work item kế tiếp.
- Next action: QC seal receipt DoD → verify → close → merge (hỏi owner trước khi merge).
