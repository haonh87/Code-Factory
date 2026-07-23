---
language: en
name: code-scan-review
description: "Scan code at the Verify step across 4 fixed lanes: syntax, static analysis, security, and performance heuristics. Use when you need to scan a diff or affected module in a wrapper-first, evidence-based way with a clear false-positive policy, and pick the right reference by language such as PHP, TypeScript/JavaScript, Python, Go, and Java."
---

# Code Scan Review

> Vietnamese: SKILL.vi.md

Scan code against the current stack to catch syntax errors, static analysis issues, security risks, and performance risk signals before closing verify.
This skill is the scan coordinator at step 8, using 4 fixed lanes to keep results consistent across many languages and projects.

## Goal

- Choose the right scan tool for the current language and stack.
- Check syntax and static analysis before concluding a change is safe at the code-quality level.
- Run a static security scan with a fitting tool when available.
- Record performance risks at the heuristic level; do not fabricate runtime benchmarks.
- Produce a scan report clear enough for the `Verify` and `Review` steps to use next.

## Position In The Workflow

- Used by default at `s08` `Verify + DoD`.
- Does not create a new workflow step just for code scanning; this is a specialized verify skill within the existing chain.
- Step 7 `Implement` should only hand off scan context via `notes_for_testing` or an implementation handoff when needed.
- If the user wants to scan during coding for self-check, still record clearly that it is pre-handoff evidence; the formal `PASS|FAIL|PARTIAL` conclusion belongs to step 8.

## Scan Philosophy

- Default to `diff-aware`: prefer `changed_files` or `affected_modules`; only scan the full repo when the user asks or risk forces it.
- `wrapper-first`: prefer an existing script, task runner, composer script, workspace command, or build wrapper in the project before calling a raw tool.
- `evidence-based`: every conclusion must have a command, scope, finding, or a clear skip reason.
- `explicit-skip`: if a tool is unavailable or the environment cannot run it, record `SKIP` and state the remaining verify gap.
- `false-positive-aware`: especially in the security lane, a dismissed finding must have a specific reason instead of vanishing from the output.
- Do not fake certainty: benchmarks, profiling, or deep manual security assessment must not be disguised as output of this skill.

## When To Use

- After implementation is done and before final handoff.
- When the change touches backend logic, framework, queries, templates, or sensitive dependencies.
- When you need to pick tools by language instead of one fixed scan checklist for every stack.
- When you need to separate test behavior from code quality/security scanning.

## Out Of Scope

- Does not replace unit, integration, or feature tests.
- Does not replace performance benchmarks or runtime profiling.
- Does not replace penetration testing or deep manual security assessment.
- Does not replace frontend review at the accessibility, responsive layout, interaction feedback, or visual consistency level; use `frontend-quality-review` when the scope touches the UI surface.
- Does not replace React-specific review at the data fetching, effect hygiene, state placement, or render stability level; use `react-best-practices-review` when the stack is React web or Next.js.
- Does not install a new tool on its own if it is not in the environment and not clearly requested.

## Minimum Input

- `scan_target`
- `changed_files`
- `affected_modules`
- `language_stack`
- `available_scan_tools`
- `constraints`
- `risk_focus`

`risk_focus` should state at least:
- whether syntax should be prioritized
- whether there is a change to a security-sensitive part
- whether there is suspected performance regression in queries, loops, serialization, allocation, or I/O

If `language_stack` cannot be determined, infer it from the changed files or state clearly that there is not enough data.
If there are no `changed_files`, infer them from the diff or state clearly why you must fall back to `AFFECTED_MODULES` or `FULL_REPO`.

## Four Fixed Lanes

### 1. `syntax`

- Goal: block parse, compile, or syntax-invalid errors as early as possible.
- Nature: a blocker lane; a syntax fail usually pulls `overall_status` to `FAIL`.
- Prefer the language's native parser or compiler, or an existing project wrapper.
- This lane's output must record the command, covered scope, evidence, and `blocker_files` if any.

### 2. `static_analysis`

- Goal: catch semantic errors such as type issues, nullability, API misuse, unreachable paths, or rule violations.
- Nature: a correctness lane at the code-semantics level.
- Prefer the project's wrapper and existing config such as `phpstan.neon`, eslint config, mypy config, or an equivalent build task.
- If the project has a baseline or old technical debt, clearly separate new findings in the diff from old debt; a baseline is not a reason to skip a new blocker.

### 3. `security`

- Goal: find risk patterns in the changed code, especially in auth, permissions, file handling, SQL, command execution, deserialization, or secrets.
- Nature: a risk-focused lane that must be `diff-aware` with a clear false-positive policy.
- Prefer tool-backed scanning such as `semgrep` or an equivalent scanner; manual review is only a supplement and must not pretend to be a deterministic scanner.
- Every security finding should have at least `severity`, `confidence`, `category`, `evidence`, `recommendation`, and if dismissed a `false_positive_reason`.

### 4. `performance_heuristic`

- Goal: detect performance risks by code pattern such as N+1, queries in loops, blocking I/O on hot paths, render churn, or large object churn.
- Nature: an advisory lane but mandatory to be present; do not use this lane to fabricate benchmarks.
- If there is no automatic performance tool, still review heuristics and record `expected_impact`, `confidence`, `trigger_condition`.
- This lane usually pulls `PARTIAL` or a remediation note; it rarely pulls `FAIL` on its own unless the risk is very clear and touches a critical path.

## Choosing The Reference By Language

- Determine `language_stack` from `changed_files`, the build path, and the project context.
- Only read the reference directly related to the current change:
  - `PHP`: `references/php.md`
  - `TypeScript/JavaScript`: `references/typescript-javascript.md`
  - `Python`: `references/python.md`
  - `Go`: `references/go.md`
  - `Java`: `references/java.md`
- For a multi-language repo, only load the reference for a language present in `changed_files` or the affected build path.
- If a tool in the reference is unavailable, record it in `skipped_scans`, pick the nearest fallback, and state clearly where reliability drops.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
scan_target: ""
scan_scope:
  mode: DIFF_ONLY|AFFECTED_MODULES|FULL_REPO
  changed_files: []
  affected_modules: []
language_stack: []
available_scan_tools: []
false_positive_policy: "Diff-aware, evidence-based, dismiss only with reason"
scan_plan:
  syntax: []
  static_analysis: []
  security: []
  performance_heuristic: []
syntax_scan_results:
  - command: ""
    scope: []
    status: PASS|FAIL|SKIP
    evidence: ""
    blocker_files: []
static_analysis_results:
  - command: ""
    config_used: ""
    scope: []
    status: PASS|FAIL|SKIP
    findings: []
    new_blockers: []
security_scan_results:
  - command_or_check: ""
    scope: []
    status: PASS|FAIL|SKIP
    findings:
      - severity: HIGH|MEDIUM|LOW
        confidence: HIGH|MEDIUM|LOW
        category: ""
        file: ""
        line: 0
        issue: ""
        evidence: ""
        recommendation: ""
        false_positive_reason: ""
performance_heuristic_results:
  - check: ""
    scope: []
    status: PASS|FAIL|SKIP
    expected_impact: HIGH|MEDIUM|LOW
    confidence: HIGH|MEDIUM|LOW
    trigger_condition: ""
    evidence: ""
skipped_scans: []
overall_status: PASS|FAIL|PARTIAL
remediation_actions: []
notes_for_verify: ""
```

## Meaning Of Each Output

- `scan_target`: the code scope being scanned.
- `scan_scope`: the actual scan mode, the changed file list, and the affected modules.
- `language_stack`: the main language or framework related to the change.
- `available_scan_tools`: tools actually present in the environment or current project path.
- `false_positive_policy`: how dismissed findings are handled, especially in the security lane.
- `scan_plan`: the scans to run by each goal group.
- `syntax_scan_results`: syntax check results.
- `static_analysis_results`: static analysis results, the config used, and new blockers in the diff.
- `security_scan_results`: static security scan results with severity, confidence, and a dismiss reason when present.
- `performance_heuristic_results`: performance warnings at the heuristic level based on code patterns with expected impact.
- `skipped_scans`: scans that could not run and the reason.
- `overall_status`: the overall conclusion for the code scan step.
- `remediation_actions`: actions needed before release or review.
- `notes_for_verify`: handoff notes to `testing`, `database-change-review`, or `step-goal-auditor`.

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 8 template in `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Scan Summary` block.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.
- Do not move standard findings into loose prose and drop the YAML block; the `## Scan Summary` block is the source of truth for scan results.

## Execution Flow

1. Determine `scan_scope`; default to `DIFF_ONLY`.
2. Infer `language_stack` from `changed_files`, the build path, and the project context.
3. Open the right reference by language instead of reading every variant.
4. Choose a `scan_plan` by the `wrapper-first` principle, the project's existing config, and the tools available in the environment.
5. Run the `syntax` lane first to block raw errors.
6. Run the `static_analysis` lane with existing config or baseline if the project uses one.
7. Run the `security` lane in a `diff-aware` way, record findings by severity and confidence, and dismiss false positives with a reason.
8. Run the `performance_heuristic` lane at the pattern-based review level; do not fake benchmarks.
9. Record all results in each lane and in `skipped_scans`.
10. Conclude `overall_status` and list `remediation_actions`.

## Quality Rules

- Default to writing and communicating in English.
- Default to scanning only `changed_files` or `affected_modules`; a full-repo scan needs a clear reason.
- Prefer the project's existing wrappers, scripts, and config over raw tools.
- Do not mark `PASS` if an important static analysis or security scan was skipped without a clear reason.
- Do not call `performance heuristic` a proof of performance.
- If a tool is unavailable, record `SKIP` and state the missing tool name specifically.
- If a scan only ran as a self-check in the implement step, do not treat it as the final verify conclusion.
- If a security finding is dismissed, record a `false_positive_reason`; do not remove the finding from the report without a reason.
- If the project has a static analysis baseline, clearly separate new blockers in the diff from old debt.
- If the change touches security-sensitive code such as auth, permissions, file handling, SQL, command execution, or serialization, always prioritize the security scan.
- Store documents as UTF-8 and preserve accented characters in `*.vi.md` supplement files.

## Decision Rule

- `PASS` when mandatory syntax passes, static analysis has no new blockers, the security lane has covered the needed sensitive parts, and no unhandled `HIGH` finding remains.
- `PARTIAL` when most scans pass but a lane was legitimately skipped, medium findings remain that do not block release right away, or the performance heuristic notes a notable risk needing follow-up.
- `FAIL` when syntax fails, static analysis has a new blocker, a serious security finding is unhandled, or the security lane was skipped in a sensitive scope without a strong justification.
- If there is no automatic performance tool, use `performance_heuristic_results` to record the risk clearly instead of skipping silently.
- If the change is pure business logic that does not touch persistence, the performance heuristic may be minimal but must still state what was reviewed.

## Completion Conditions

- A clear `scan_plan` and `overall_status`.
- A clear `scan_scope`, `available_scan_tools`, and `false_positive_policy`.
- Results for syntax, static analysis, and security scanning at a level fitting the stack.
- `performance_heuristic_results` or a valid reason to minimize it.
- `remediation_actions` for every unclosed finding.