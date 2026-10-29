---
artifact_id: "mcp-root-containment.s07.implementation"
artifact_family: workflow-step
work_item_slug: "mcp-root-containment"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: BUG
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
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
  card: "product-specs/cards/mcp-root-containment.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "ta"
  - "developer"
  - "qc"
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
  - "mcp-root-containment.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 — Implement

Technical implementation and targeted review are complete. This note records agentic review;
it does not approve human DoD, merge or rollout.

## Step Contract
```yaml
step_goal: "Implement the approved physical-root boundary in three MCPs."
input_summary: ["Approved SEC-002 card", "Five signed readiness receipts", "ACTIVE protocol and bounded write grants"]
output_summary: ["Three core fixes", "Portable isolated regressions", "README policy", "RED/GREEN and review evidence"]
done_when: ["T1-T4 implementation complete", "Behavior regressions green", "Spec compliance reviewed before quality"]
owner: developer
```

## Main Artifact
```yaml
recommended_design: "Module-local synchronous physical resolvers; bounded missing ancestors for GitHub creation and workspace history; validate session file and actual workspace before returning index content."
implementation_mode: BUGFIX
tasks_completed: ["T1 tests and RED", "T2 Git guards", "T3 session guards and filtering", "T4 documentation and verification packet"]
bug_repro_evidence: ["evidence/github-push-red.log: 17 failed", "evidence/gitlab-red.log: 11 failed", "evidence/session-search-red.log: 17 failed"]
hypothesis_log:
  - assumption: "Lexical checks accept outside symlink targets and trust contradictory index workspace metadata."
    status: CONFIRMED
    evidence: "Synthetic escape and mixed-index RED tests against unchanged core modules"
debug_experiments:
  - goal: "Verify rejection before side effects"
    action: "Count stub Git/cass launches and transcript opens; preserve outside fixture sentinels"
    result: "Denials occur before child launch/open; safe local Git creation succeeds"
  - goal: "Check diagnostic privacy on a read failure"
    action: "Inject EACCES with PRIVATE_SENTINEL in a synthetic transcript stream"
    result: "Additional RED reproduced raw error exposure; bounded message fix passes"
tdd_evidence:
  - behavior: "Repository containment and safe creation"
    failing_test: "evidence/github-push-red.log; evidence/gitlab-red.log"
    passing_test: "evidence/github-push-green.log; evidence/gitlab-green.log"
  - behavior: "Session/workspace containment, result filtering and diagnostic privacy"
    failing_test: "evidence/session-search-red.log; evidence/session-read-error-red.log"
    passing_test: "evidence/session-search-green.log"
safe_refactor_notes: ["Kept exported synchronous resolver signatures", "GitLab uses a smaller existing-directory-only resolver", "No shared helper package", "Portable temporary paths replace OS-specific nonexistent fixtures"]
code_changes: ["Three src/core.js files", "Three existing core.test.js files", "Three containment.test.js files"]
doc_changes: ["Three MCP README policy sections", "Owned s07/s08 evidence"]
config_changes: []
review_checkpoints: ["T2 spec compliance PASS then quality PASS", "T3 spec compliance PASS then quality PASS after diagnostic correction"]
outputs_actual: ["Bounded physical path checks", "82 passing package tests", "Readiness/admission and TDD logs"]
known_limitations: ["Non-atomic checks assume trusted filesystem writers", "Native Windows execution unavailable", "Semgrep/ESLint unavailable", "No live MCP or real remote operation"]
follow_up_items: ["Human QC DoD", "Separate merge/rollout decision", "Native Windows verification before Windows rollout"]
notes_for_testing: "Each package npm run check; full workflow suite; syntax/static/security/UTF-8/workflow checks. Read s08 for the read-only fixture environment limitation."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "mcp/github-push/test/containment.test.js"
  - "mcp/gitlab/test/containment.test.js"
  - "mcp/session-search/test/containment.test.js"
  - "work-items/mcp-root-containment/evidence/github-push-red.log"
  - "work-items/mcp-root-containment/evidence/gitlab-red.log"
  - "work-items/mcp-root-containment/evidence/session-search-red.log"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/mcp-physical-root-containment"
  - "fix/mcp-physical-root-containment"
worktree_reason: "Security-sensitive full-track work spanning sessions; isolate the existing workspaces."
review_status: COMPLETED
review_refs:
  - "work-items/mcp-root-containment/mcp-root-containment.s07.implementation.md#implementation-notes"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Retain isolated branch for QC; merge is outside the approved scope."
verify_path:
  - "Three MCP npm run check commands"
  - "Full workflow registered suite"
  - "Syntax, targeted static/security, UTF-8 and workflow validators"
```

## Implementation Notes
```yaml
review_target: "SEC-002 T2 and T3"
planning_track: full
review_mode: TARGETED
review_order: [SPEC_COMPLIANCE, CODE_QUALITY]
review_batches:
  - batch: T2
    spec_compliance: "PASS: existing paths canonical; missing destinations only for GitHub initialization; aliases and ..notes allowed; recheck after mkdir and before each Git child."
    code_quality: "PASS: segment-aware relative paths, lstat distinguishes dangling links, realpath/stat failures bounded; removed unused generality from GitLab resolver."
  - batch: T3
    spec_compliance: "PASS: regular file before open/cass; actual workspace within requested scope; contradictory metadata filtered; history and pagination retained."
    code_quality: "PASS after test-first read-error correction: canonical downstream paths; bounded diagnostics; per-result failures filtered; no new dependency."
finding_policy:
  blocker_threshold: "Outside physical access, fail-open behavior, private diagnostic exposure or scope drift"
  reopen_conditions: ["Failing regression", "Changed signed scope", "Production source changes after verification"]
handoff_to_verify: ["Retain RED/GREEN logs", "Map all ten ACs", "Prepare concrete QC signature packet"]
notes_for_implementation_or_verify: "Agentic targeted review, not independent review or human approval. No unresolved in-scope implementation finding. Git test stubs were corrected to provide a normal main branch before RED was recorded."
```

## Traceability
```yaml
upstream: ["mcp-root-containment.s06.task-breakdown.md", "product-specs/cards/mcp-root-containment.md"]
next_step: "s08 Verify + DoD"
```

## Handoff
- Three MCP implementations, tests and READMEs are ready for verification.
- Signed readiness hosts and the approved card remain unchanged.
- No live installation, dependency, merge, release or delegation.
