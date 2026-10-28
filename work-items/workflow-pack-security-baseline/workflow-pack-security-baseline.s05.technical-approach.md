---
artifact_id: "workflow-pack-security-baseline.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "workflow-pack-security-baseline"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: RESEARCH
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
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
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-10-27T14:39:32.499Z"
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "workflow-pack-security-baseline.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 — Technical Approach

Human content review is recorded below. Actual gate approval is established only by valid trusted receipts bound to these bytes; scanning also requires explicit s07 activation.

## Option Analysis

```yaml
options:
  - "A: Pinned local Semgrep CE + Gitleaks + manual trust-boundary review in a network-disabled container. Complementary reproducible evidence and no source upload; requires isolated acquisition and control fixtures."
  - "B: Gitleaks plus manual review only. Smaller setup, rejected because it leaves the automated SAST gap identified by CF-006."
  - "C: Cloud scanner with source upload. Managed execution, rejected because it adds an unnecessary external data boundary."
recommended_option: "A"
decision_status: "APPROVED"
trade_offs: ["Semgrep does not prove prompt semantics or full cross-file correctness; manual review is mandatory."]
```

## Technical Approach

```yaml
design_problem: "Acquire reproducible evidence without expanding scanner access to the working repository or credentials."
recommended_design: "Credential-free, no-network scan against an immutable allowlist export; sanitize before evidence leaves scratch."
tool_candidates: {"semgrep": "CE 1.182.0 from official release; verify downloaded artifact against publisher/package metadata and record engine/image digest before execution.", "gitleaks": "8.30.1; local installation observed, but use a separately pinned isolated Linux artifact rather than mounting the host binary.", "rules": "Select applicable JavaScript security and generic configuration rules from one immutable semgrep-rules commit; record exact file list, hashes and each license. No p/auto or remote config at scan time."}
acquisition_boundary: "After readiness, download only public engine/rule artifacts from official GitHub/PyPI or official image repository into dedicated scratch; no source mounted during acquisition. Record dependencies/image digest. Unsupported or unapproved licenses stop execution for review."
execution_boundary: "Container with --network none, non-root UID, read-only root and source, dropped capabilities/no-new-privileges, dedicated tmp/output, no home/env credentials/.git/socket mounts; never execute target scripts. A runtime failure blocks scanning."
scanner_options: ["Semgrep scan --oss-only --metrics off --disable-version-check --config <local pinned rules> --sarif; confirm exact version help before execution.", "Gitleaks dir --redact=100 --report-format sarif --ignore-gitleaks-allow with explicit config and empty controlled ignore file; no git-history or symlink following."]
manual_review: ["Instruction and tool permission boundaries in all 43 skills", "Command injection, path traversal, unsafe file writes, environment/secret handling, install/download provenance and external transport in executable roots", "Use file/line evidence; do not label a text match as an exploit without a reachable data/control path."]
failure_modes: ["Digest or license mismatch: stop before scan", "Unsupported/failed parse, timeout or skipped file: explicit ledger gap and PARTIAL until reviewed", "Positive control miss: invalidate affected detector lane", "Secret in synthetic evidence: block retention and repair sanitizer before real outputs are exported"]
compatibility_impact: "No production behavior or schema change."
rollback_impact: "Delete only recorded owned scratch/container resources; keep sanitized evidence and hashes."
observability_hooks: ["Version/help capture", "Exact argv and exit status", "Control results", "Coverage/error counts", "Before/after source hashes"]
```

## Brownfield Impact Analysis

```yaml
impacted_modules: ["Read-only target roots from Spec Card"]
compatibility_risks: ["Scanner executing target code or following external symlinks; prohibited by export and isolation"]
migration_notes: ["None"]
rollback_notes: ["No source rollback expected because source mutation is prohibited."]
```

## Sources and Provenance

Consulted 2026-10-27: [Semgrep CLI](https://docs.semgrep.dev/cli-reference),
[Semgrep 1.182.0 release](https://github.com/semgrep/semgrep/releases/tag/v1.182.0),
[metrics controls](https://github.com/semgrep/semgrep/blob/develop/metrics.md), and
[Gitleaks 8.30.1 release](https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1).
The local `gitleaks version` returned 8.30.1 and its help exposes directory scanning, redaction and SARIF.
Semgrep is not installed. Downloaded artifact digests, rule commit and licenses are acquisition outputs
of T2, not claims already verified. Persist these before any source scan; a mismatch blocks execution.
