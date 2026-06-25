---
language: en
name: workflow-pack-audit
description: Audit a workflow pack or skill pack in the local repo to detect drift across skills, the workflow-chain, frontmatter, the runtime flat-layout, schemas, template blocks, and cross-references. Use after adding or editing a skill, workflow reference, script, or adapter, or before publishing/updating the workflow pack for Codex.
---

# Workflow Pack Audit

> Vietnamese: SKILL.vi.md

Audit the consistency of a workflow pack on two layers: mechanical checks via a script and a semantic review via a checklist.

## Goal

- Detect drift across the skill folder, frontmatter, the workflow-chain, template blocks, and reference schemas.
- Safety-check the Codex runtime flat-layout, especially skill-name uniqueness.
- Detect mismatches between a newly added skill and its place in the step mapping or workflow template.
- Produce an audit report clear enough to decide whether the workflow pack can be handed off or published.

## When To Use

- After adding or editing a skill in `skills/`.
- After editing `workflow-chain.md`, a step template, a schema block, or a runtime reference.
- Before installing globally or publishing a new version of the workflow pack.
- When the repo is suspected of drift between skill docs, workflow docs, and the Codex runtime layout.

## Out Of Scope

- Does not replace `step-goal-auditor` for auditing a specific work item.
- Does not replace app or MCP-server behavior testing.
- Does not replace a manual review of deep business or technical-correctness content.
- Does not bulk-fix things outside the audit scope without a clear decision.

## Minimum Input

- `repo_root`
- `audit_scope`
- `recent_changes` if any

`audit_scope` should state at least:
- whether the audit covers the whole repo or only one skill group
- whether a new skill was just added
- whether `workflow-chain` or a step template was edited

## Companion Resources

- Run the script `scripts/audit-workflow-pack.ps1` first to get deterministic checks.
- Then read `references/checklist.md` and review the remaining semantic items for the area just changed.
- If you need a sample note to record the audit result, use `templates/audit-report.sample.md`.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
audit_scope: ""
checks:
  - id: ""
    status: PASS|FAIL|WARN
    evidence: ""
findings:
  - severity: HIGH|MEDIUM|LOW
    area: SKILL|WORKFLOW_CHAIN|TEMPLATE|SCHEMA|RUNTIME_LAYOUT|SCRIPT|DOC
    path: ""
    issue: ""
    recommendation: ""
overall_status: PASS|FAIL|PARTIAL
follow_up_actions: []
notes: ""
```

## Meaning Of Each Output

- `audit_scope`: the repo area or skill group being audited.
- `checks`: the result of each mechanical or semantic check.
- `findings`: specific drift or mismatches with paths and handling direction.
- `overall_status`: the overall conclusion of the audit.
- `follow_up_actions`: work to do before installing globally, merging, or publishing.
- `notes`: limitations or extra notes for this audit pass.

## Normalizing Output

- If the audit is saved as a `.md` note, use `obsidian-markdown`.
- Keep the audit YAML block as the source of truth; do not split findings into loose prose and lose the schema.
- When the audit touches this workflow pack, reference paths must follow the Codex flat runtime layout.

## Execution Flow

1. Run `scripts/audit-workflow-pack.ps1 -RepoRoot <repo_root>` to get deterministic checks.
2. Load `references/checklist.md` and review the semantic items for the area just changed.
3. Collect `checks` from the script and add `findings` for drift the script cannot catch.
4. Conclude `overall_status`:
   - `PASS` if there is no `FAIL`
   - `PARTIAL` if only `WARN` or minor semantic gaps remain
   - `FAIL` if there is a blocking mismatch
5. Record clear `follow_up_actions` before handoff.

## Quality Rules

- Default to writing and communicating in English.
- Every conclusion must point to a specific path or marker.
- Do not mark `PASS` if you only grepped the skill name without checking the matching template/schema.
- If the script passes but the semantic checklist fails, the conclusion must not be `PASS`.
- Text files must be stored as UTF-8 and preserve accented characters in `*.vi.md` supplement files.

## Completion Conditions

- The mechanical audit script has run.
- The semantic checklist has been reviewed for the changed area.
- An `overall_status` and `follow_up_actions` clear enough for the maintainer to decide the next step.