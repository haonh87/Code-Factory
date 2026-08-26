---
artifact_id: "trusted-receipt-namespace-resolution.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "trusted-receipt-namespace-resolution"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: BUG
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
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
  dor: []
  approach:
    - "developer"
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-21T14:49:34Z"
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
  - "trusted-receipt-namespace-resolution.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Three options for `OQ-1`, all measured rather than argued. **Option A wins on a fact:**
> deriving the project identity from `dirname(resolved git-common-dir)` reproduces the existing
> namespace `code-factory-916d1d6e915b` **byte for byte** from the main tree and all four
> worktree directories. `AC-002` is then satisfied by construction - no fallback, no migration,
> no receipt touched - and `OQ-2` collapses: there is nothing left to decide between. `E-B` has
> a clean insertion point reusing helpers already written, but it carries a hard dependency on
> another work item's branch.

## Step Contract
```yaml
step_goal: "Choose the identity derivation for OQ-1 and the waiver location for OQ-4 by measurement, lock the affected boundary, and state what must be validated - without writing any production code."
input_summary:
  - "s04 AC-001..AC-006 and EDGE-001..EDGE-008, digest-pinned to the s01/s02/s03 chain"
  - "s03 OQ-1, OQ-2, OQ-4 open at authoring time; GOV-Q2 since ANSWERED prospective-only by po on 2026-08-21"
  - "Direct reading of workflow-trusted-approval-utils.js and work-item-protocol.js on main"
  - "Live measurement of git identity candidates across all five checkouts of this repo, plus a synthetic two-repo control"
output_summary:
  - "Three options for OQ-1, each with its measured outcome"
  - "A recommended approach with the reason stated as evidence, not preference"
  - "OQ-2 resolved by design under the recommended option; OQ-4 resolved without touching receipt format"
  - "Boundary, non-goals, validation plan and the one hard dependency"
done_when:
  - "The recommendation names the measurement that decides it"
  - "The compatibility criterion AC-002 is shown to hold by construction or is explicitly at risk"
  - "Every file that will be edited is named, and every file deliberately not edited is named"
owner: "developer"
```

## Option Analysis
```yaml
goal: "OQ-1 - find a project identity that is stable across every checkout of one repository, distinct between repositories, and deterministic when there is no repository at all."
measurement_method: "For each candidate the identity was computed from the main tree and from every directory under .claude/worktrees/, then from two synthetic sibling repos and one plain directory. Commands run live on 2026-08-20; every number in Option Details is observed output, not prediction."
options:
  - "Opt-A: canonical project root - hash dirname of the resolved git-common-dir, legacy path hash as fallback"
  - "Opt-B: hash the resolved git-common-dir itself, plus a permanent read-fallback to the legacy namespace"
  - "Opt-C: explicit projectId key in workflow-contracts.config.json, path hash as fallback"
recommended_option: "Opt-A"
trade_offs:
  - "Accepted: a basename check for .git plus a legacy fallback branch, rather than one unconditional rule. The alternative is either breaking separate-git-dir setups or throwing where the code currently returns a value."
  - "Accepted: path dependence is not eliminated, only made irrelevant for worktrees. Moving the repository directory still changes the namespace. In scope was one machine, one project, several paths - see s02 non_goals."
  - "Accepted: one git subprocess per command invocation where there used to be pure string work. These are CLI commands, not a server loop."
  - "Rejected Opt-B despite it being the more semantically pure identity: it converts a compatibility criterion that Opt-A satisfies for free into a mechanism that must be built, tested and maintained, and it lands on a worse steady state of two addresses per project."
  - "Rejected Opt-C outright: it fails a constraint already locked at s02 - no manual step - and it moves control of the audit address to the operator, which is the property s02 says audit evidence must not have."
  - "One consequence for po: OQ-2 needs no answer under Opt-A. That question closes by design rather than by decision, so it is recorded for acknowledgement rather than silently dropped."
```

### Trap Found Before Any Option Was Scored

`git rev-parse --git-common-dir` prints a **relative** `.git` from the main tree and an **absolute**
`/Users/.../Code-Factory/.git` from a worktree. Hashing its raw output therefore yields two different
identities and does **not** fix the defect. Every option below resolves it with `path.resolve(cwd, output)`
first. This is the same shape as the `D-A` defect in the sibling work item — a tool comparing two spellings
of one location — so a naive fix here would have reproduced `D-A` inside `D-A`'s own remedy.

### Option Details

**Opt-A — canonical project root (recommended)**

- Mechanism: resolve the git common dir to an absolute path. When its basename is `.git`, the parent
  directory is the main worktree's toplevel — the canonical project root. Feed that to the existing
  namespace builder instead of the current tree's root. Anything else, including no repository at all,
  falls back to today's behaviour of hashing the given `projectRoot`.
- Measured across every checkout of this repo, all five resolving to **`code-factory-916d1d6e915b`**:
  main tree; `worktree-and-closure-integrity`; `artifact-governance-enforcement`;
  `stabilize-architecture-skill-bundle-v2.4.0`; and `release-v2-3-0`, a stale worktree directory that is
  not even registered in `git worktree list` and still resolves correctly.
- That string is **exactly** the namespace the 43 existing receipts already live at.
- Synthetic control: `repoA` -> `repoa-10813f04b1e1`; a worktree of `repoA` -> the same;
  `repoB` -> `repob-7191a4032593`; a plain directory -> not a git repository, legacy fallback.
- Pros: `AC-002` holds by construction rather than by mechanism — no fallback, no migration, no receipt
  read or written at a new address. `OQ-2` disappears because there is only ever one address. Rollback is
  a pure code revert, so it cannot orphan anything, which is what `s04` `rollback_constraints` demanded.
  Smallest diff of the three: one helper plus one changed argument.
- Cons: depends on the convention that the git common dir sits directly inside the project root.
  `git init --separate-git-dir` or a hand-set `core.worktree` breaks that, which is why the basename guard
  and the legacy fallback are part of the option rather than an afterthought.

**Opt-B — hash the resolved git-common-dir, with a read-fallback**

- Mechanism: identity is the resolved common dir. Reads try the new namespace then fall back to the legacy
  path-derived one; writes always go to the new namespace.
- Measured: stable at `code-factory-17683c22bdb9` across main and every worktree, so it does fix `E-A` —
  but that is **not** where the 43 receipts live, so they are only reachable through the fallback.
- Pros: semantically the most direct reading of "same repository", since the common dir *is* the shared
  object store. Does not depend on the common dir being named `.git` or sitting inside the project root.
- Cons: two addresses for one logical project, permanently — the ambiguity `OQ-2` flagged and that `s01`
  `A3.reject_if` names as a possible dealbreaker for audit evidence. New receipts land at the new address
  while old ones stay at the old one, so one work item's audit trail can straddle two directories, which is
  worse than the split being fixed. Reverting the code after any new receipt is written orphans it, failing
  `s04`'s rollback constraint. And it is strictly more code than `Opt-A` to reach a worse end state.

**Opt-C — explicit projectId in config**

- Mechanism: the project declares its own identity; the namespace derives from that string, with the path
  hash as fallback when the key is absent.
- Measured: stable by definition. Matches the existing on-disk namespace only if an operator is told to set
  the key to a value reproducing the current hash — a manual migration in a config-file costume.
- Pros: no git dependency, so `EDGE-002` needs no special case. Fully predictable and greppable.
- Cons: every existing adopter must add the key or stay broken, which `s02` constraints already rule out and
  `S01-R01` warns about. It makes the audit address operator-controlled — the same reason the
  `WORKFLOW_BUNDLE_APPROVAL_ROOT` workaround was rejected. And it adds a config surface for a defect that
  needs none, against the smallest-correct-solution rule.

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: ""
selected_stack: []
selected_runtime: []
decision_notes:
  - "approval_gates.foundation=not_applicable. Brownfield defect fix inside one existing module. No boundary is rewritten, no stack, runtime or deployment model changes."
  - "Per the brownfield rule, foundation may only open when the change actually touches the architectural baseline. Changing how one string is computed does not."
```

## Artifact Chính
```yaml
recommended_approach: "Introduce a single helper that resolves the canonical project root - dirname of the resolved git common dir when its basename is '.git', otherwise the projectRoot given - and feed it to the existing buildProjectApprovalNamespace. Everything downstream is unchanged because buildReceiptPath is the only consumer of the namespace, for both reads and writes. Separately, add an assert-style gate for the DONE transition that reuses the uncommitted-delivery helpers already written for the sibling work item, with a transition-time hatch so no waiver is ever stored."

why: "Because the measurement says the address does not have to move. Every other option treats compatibility as something to engineer; Opt-A makes it a property of the computation. The whole diff is one helper, one call-site argument, one new assert function and its wiring - with the 43 receipts, the receipt format, the signature scheme and all four approval controls untouched."

boundaries:
  in_scope_files:
    - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js - new resolveCanonicalProjectRoot helper, exported for test; buildProjectApprovalNamespace called with it. Single point of change for E-A because buildReceiptPath:323 is the only namespace consumer on both the read and write path."
    - "packages/workflow-bundle/scripts/work-item-protocol.js - new assertUncommittedDeliveryGate(report, toStatus, projectRoot, options) in the existing assertBootstrapGate / assertStepGateEvidence family; wired for toStatus === 'DONE' only; two CLI flags threaded through the close action."
    - "packages/workflow-bundle/test - new fixtures for E-A identity matrix and E-B transition matrix"
    - "packages/workflow-bundle/tests/fixtures - governance fixtures if the E-B refusal needs a behavioural case"
  explicitly_untouched:
    - "Receipt schema, signature scheme, digest binding - serializeSignedReceiptPayload, signReceiptPayload, isTrustedReceiptSignatureValid. CF-1 is resolved by design, not by narrowing the non-goal."
    - "TTY and passphrase enforcement - promptHiddenInput, resolveApprovalPassphrase, isNonInteractiveApprovalFixtureEnabled."
    - "resolveTrustedApprovalRoot and its outside-the-project-root refusal, and both env-var hatches. EDGE-007 keeps its current meaning."
    - "The 43 receipts on disk. Not read for migration, not rewritten, not moved."
    - "The orphan EAGAIN retry change currently uncommitted on main in this same file. It belongs to no work item; s07 must not absorb it into a commit."

validation_plan:
  - "E-A identity matrix, observed failing first: assert one identity across the main tree and a worktree BEFORE the helper exists, so the RED state is a real test failure rather than prose. Then the same matrix green."
  - "AC-002 by inventory diff, not by target number: snapshot every receipt path plus its sha256 before and after, and assert the two sets are equal. A test that re-reads '43' would pass even if the contents changed."
  - "AC-003 negative case with two synthetic sibling repos - proven already at option-analysis time: repoa-10813f04b1e1 vs repob-7191a4032593. A cross-read must resolve nothing."
  - "AC-006 determinism: repeat the derivation twice per shape - plain repo, worktree, nested worktree, non-git directory - and assert stability and no throw. The non-git case must exercise the legacy fallback, and the git failure must be swallowed rather than surfaced as a crash."
  - "AC-005 as four explicit assertions, one per control, in their own test file. An unasserted control is an untested control, and this work item edits the file that implements all four."
  - "E-B transition matrix: clean seal then dirty then DONE must refuse and name the path; with the hatch and a non-empty reason it must pass and echo the reason; empty granted_write_paths must refuse (EDGE-005); non-git must be silent (EDGE-006)."
  - "Regression: full unit suite compared against a T0 baseline measured in the worktree AFTER running sync-workflow-bundle-runtime.js - runtime/ is gitignored, and skipping that step produces six phantom failures (L-03 from the sibling work item)."

risk_notes:
  - id: "S05-R01"
    risk: "The basename('.git') guard silently routes an unusual-but-valid setup down the legacy path, so a --separate-git-dir user keeps the defect and gets no signal."
    severity: MEDIUM
    mitigation: "Deliberate and documented: the fallback is the current behaviour, so nobody is worse off than today. Covered by an explicit fixture rather than left implicit, so the boundary is visible in the test names."
  - id: "S05-R02"
    risk: "Resolving the git common dir means shelling out to git on a hot path that previously did pure string work."
    severity: LOW
    mitigation: "One execFileSync per command invocation, and these are CLI commands, not a server loop. Failure must be caught and fall through to legacy - never throw. Worth memoising per projectRoot inside a single process if a measurement shows it matters; not doing it speculatively."
  - id: "S05-R03"
    risk: "E-B cannot be built on main. getUncommittedDeliveryErrors, evaluateUncommittedDelivery, inspectDeclaredScopeCleanliness and readGrantedWritePaths do not exist there."
    severity: HIGH
    mitigation: "Verified: main's workflow-gate-evidence-utils.js exports none of them; branch codex/worktree-and-closure-integrity has all four at lines 357, 417, 456 and 469. E-B is therefore blocked on that branch merging, which is itself blocked on that work item's s08 DoD. Recorded as a hard dependency in the task plan, not discovered at implementation time."
  - id: "S05-R04"
    risk: "Fixing lookup could widen it, so a receipt from a genuinely different project resolves - the exact failure mode the sibling work item nearly shipped as over-broad workflow_root normalisation."
    severity: MEDIUM
    mitigation: "AC-003 with the two-repo control, already measured before any code exists. Different repositories have different common dirs, so the identities differ by construction - but the assertion stays because 'by construction' is a claim until a test holds it."
  - id: "S05-R05"
    risk: "GOV-Q2 is still unanswered, so implementing E-B would tighten DONE for four already-closed work items without the governance decision that permits it."
    severity: MEDIUM
    status: RESOLVED
    resolved_by: "po answered prospective-only on 2026-08-21 - the four already-DONE work items are not reopened. Recorded in s03 open_questions.GOV-Q2 with the reasoning and the scope."
    mitigation: "Retained as delivered discipline rather than as mitigation: E-A and E-B still split into independent commits with E-B last, so the only tightening change reverts alone."
```

## Architecture Details
```yaml
domain_boundaries:
  - "Identity derivation (new, private to workflow-trusted-approval-utils.js) is separate from address construction (buildProjectApprovalNamespace) and from path assembly (buildReceiptPath). Keeping the three separate is what makes the diff one line at the seam instead of string surgery at every call site."
  - "The DONE gate belongs to work-item-protocol.js, which already owns assertApprovalGate, assertBootstrapGate and assertStepGateEvidence. E-B is a fourth member of that family, not a new concept."
integration_points:
  - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js:323 buildReceiptPath - the single funnel. Both loadTrustedApprovalReceipt (374) and writeTrustedApprovalReceipt (400) go through it, which is why one change covers read and write symmetrically."
  - "Readers of receipts, all inheriting the fix without edits: validate-work-item-protocol.js (222, 231, 242, 277), work-item-protocol.js, materialize-work-item.js:721, change-item.js:305."
  - "work-item-protocol.js close action (~502) is the only route to toStatus DONE."
  - "Signature verification rebuilds its payload from receipt.project_root, the receipt's OWN stored value (workflow-trusted-approval-utils.js:296), not from the live projectRoot. So the stored absolute path is never compared against the current tree, and changing the namespace cannot invalidate a signature. Checked directly rather than assumed - it is the single fact that makes Opt-A safe."
data_or_runtime_notes:
  - "Receipt payloads store project_root as an absolute path, and it stays that way. It is signed data and this work item does not rewrite receipts. Opt-A does not need it to change, because nothing reads it as a lookup key."
  - "Asymmetry worth recording: work-item-protocol.js printStatus (551) already resolves the namespace from report.project_root - the STORED root - so `wfc work-item status` works from a worktree today, while `wfc protocol` fails. Same data, two derivations. Opt-A makes them agree; until then the inconsistency is a live source of confusion about whether receipts exist."
  - "The approval root is shared: code-factory-916d1d6e915b (43 receipts) sits beside product-roadmap-66c025db9523 (23 receipts) and the approver key pair. AC-003 protects a real neighbour, not a hypothetical one."
  - "The identity derivation must never throw. `git rev-parse` in a non-repository exits 128 and writes to stderr; the helper must capture and swallow both, then fall through to the legacy path hash."
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "workflow-trusted-approval-utils.js - namespace derivation for every receipt read and write (E-A)"
  - "work-item-protocol.js - the DONE transition guard and two new CLI flags (E-B)"
  - "Every wfc command that touches a receipt, transitively and without edits: protocol, gate approve, work-item approve/activate/verify/close, change-item approve, materialize"
  - "packages/workflow-bundle/test and tests/fixtures"
compatibility_risks:
  - risk: "Existing receipts become unreachable."
    assessment: "Eliminated under Opt-A, not mitigated. The computed address is byte-identical to the current one, measured from all five checkouts. This is the single reason Opt-A was chosen over the semantically cleaner Opt-B."
  - risk: "A new receipt is written to a different address than an old one for the same work item."
    assessment: "Cannot happen - there is one address. Under Opt-B it would have been the normal case."
  - risk: "Signature verification breaks because the payload embeds an absolute project_root."
    assessment: "Does not apply. Verification rebuilds the payload from the receipt's own stored value; the live root is never compared. Confirmed by reading workflow-trusted-approval-utils.js:296."
  - risk: "An unusual git layout falls through to the legacy derivation and keeps the defect."
    assessment: "Accepted, S05-R01. The fallback is today's behaviour, so it is a non-regression rather than a new failure."
  - risk: "E-B tightens DONE for work items that closed under the looser rule."
    assessment: "Open - GOV-Q2. Prospective-only is the inherited precedent but must be reconfirmed by po, not assumed."
migration_notes:
  - "None. That is the point of Opt-A: no migration command, no relocation, no rewrite, nothing for an adopter to run. Recorded explicitly because 'no migration' is a designed outcome here, not an omission."
  - "Adopters on other machines are unaffected for the same reason - their canonical root resolves to the path their receipts were already written under."
rollback_notes:
  - "E-A reverts as pure code. No disk state diverged while it was in effect, so revert cannot orphan a receipt. This is the property Opt-B could not offer."
  - "E-B lands last and in its own commit, so the only tightening change reverts alone - the same ordering the sibling work item used for D-D, and for the same reason."
  - "No package release inside this work item, so rollback is a git revert plus a re-run of the receipt inventory."
```

## Traceability
```yaml
upstream:
  - "trusted-receipt-namespace-resolution.s01.restate.md"
  - "trusted-receipt-namespace-resolution.s02.business-goal.md"
  - "trusted-receipt-namespace-resolution.s03.open-questions.md"
  - "trusted-receipt-namespace-resolution.s04.acceptance-criteria.md"
open_question_disposition:
  - "OQ-1 - ANSWERED by this note: Opt-A, canonical root from dirname(resolved git-common-dir), legacy fallback otherwise. Decided by measurement across five checkouts plus a two-repo control."
  - "OQ-2 - MOOT under Opt-A. One address means no fallback-versus-migration choice exists. Flagged to po for acknowledgement rather than dropped, since po owned the question."
  - "OQ-4 - ANSWERED: re-evaluate cleanliness at transition time and pass the hatch again there. Nothing is stored, so the receipt-format non-goal stays intact and CF-1 is resolved by design as s03 proposed."
  - "GOV-Q2 - ANSWERED by po on 2026-08-21: prospective only, the four already-DONE work items are not reopened. E-B is no longer blocked on governance, only on SIBLING-MERGE."
  - "MI-1 - remains de-risked rather than answered, and Opt-A makes it fully irrelevant: adopters elsewhere resolve to the address they already use."
criterion_to_mechanism:
  - "AC-001 / AC-006 -> resolveCanonicalProjectRoot + legacy fallback"
  - "AC-002 -> satisfied by construction; verified by inventory diff, not by a target count"
  - "AC-003 -> distinct common dirs; held by the two-repo negative fixture"
  - "AC-004 -> assertUncommittedDeliveryGate at the DONE transition, reusing the sibling work item's helpers"
  - "AC-005 -> four standalone control assertions"
next_step: "s06 Task Plan - order E-A before E-B, gate E-B on the merge of codex/worktree-and-closure-integrity (GOV-Q2 is answered), and give each acceptance criterion a task with a verify path"
```

## Handoff
- **Recommended option:** `Opt-A`. The identity becomes `dirname(resolved git-common-dir)` when that directory is named `.git`, and today's `projectRoot` hash otherwise. Measured: all five checkouts of this repo - main plus four worktree directories, including one stale directory absent from `git worktree list` - resolve to `code-factory-916d1d6e915b`, which is exactly where the 43 receipts already live.
- **Trade-offs accepted:** a `basename('.git')` guard plus a legacy fallback instead of one unconditional rule; path dependence closed for worktrees but not in general; and one `git` subprocess per command invocation where there used to be pure string work.
- **What the measurement changed:** `OQ-2` no longer needs an answer. It was framed as fallback-versus-migration, and `Opt-A` has neither. `po` should acknowledge that closure rather than have the question quietly disappear.
- **The trap this avoided:** `git rev-parse --git-common-dir` prints `.git` from the main tree and an absolute path from a worktree. Hashing its raw output does not fix the bug - it reproduces the D-A defect inside D-A's own fix. Every option here resolves the path first.
- **Hard dependency, `S05-R03`:** `E-B` needs four helpers that exist only on `codex/worktree-and-closure-integrity`, not on `main`. That branch cannot merge until its own `s08` `DoD` is sealed. So `E-B` is downstream of another work item's closure, and `s06` must sequence it that way rather than discovering it mid-implementation.
- **Condition to enter step 6:** none for `E-A`. `E-B` needs `GOV-Q2` answered by `po`; if it is deferred, `E-A` ships alone and `E-B` splits out, which `s01`'s `grouping_rationale` already permits.
- **Next human action:** review this approach, then - edits before sealing, always - finalize and seal the `approach` gate: `wfc gate approve --work-item trusted-receipt-namespace-resolution --gate approach --reviewed-by developer`. `spec`, `contract` and `dor` are still unsealed at `s04` and come first.
- **No code was written.** No file under `packages/` was modified. Nothing here authorises implementation.
