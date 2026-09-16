---
artifact_id: "trusted-receipt-namespace-resolution.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "trusted-receipt-namespace-resolution"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
  dor:
    - "po"
    - "ba"
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-21T14:49:34Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-08-21T14:49:34Z"
  dor_reviewed_by:
    - "po"
  dor_reviewed_at: "2026-08-21T14:49:34Z"
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "trusted-receipt-namespace-resolution.s01.restate.md"
  - "trusted-receipt-namespace-resolution.s02.business-goal.md"
  - "trusted-receipt-namespace-resolution.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Six acceptance criteria, every one checkable by command, traced to `SM-1`..`SM-6`. `AC-002`
> is the compatibility clause `OQ-3` made first-class when `po` ruled the receipt address a
> contract. Eight edge cases, weighted toward the negative ones that stop the fix from turning
> over-strictness into over-permissiveness. `DoR` is **READY**: its one blocker, `GOV-Q2`, was answered
> prospective-only by `po` on 2026-08-21. No gate is sealed; nothing here authorises implementation.

## Step Contract
```yaml
step_goal: "Turn the measured defect into acceptance criteria that can be checked by command rather than by opinion, pin the requirement and contract baselines by digest, and give a DoR verdict that names its blocker instead of averaging it away."
input_summary:
  - "s01 restate: E-A mechanism measured 2026-08-19, E-B folded in from L-01, invariants, A1..A3, S01-R01..R04"
  - "s02 business goal: SM-1..SM-6 with baselines and targets, non_goals, constraints"
  - "s03 open questions: OQ-3/GOV-Q1 ANSWERED yes by po 2026-08-20; GOV-Q2 ANSWERED prospective-only by po 2026-08-21; OQ-1, OQ-2, OQ-4 remain as decisions s05 produces"
  - "Live measurement of the approval root taken while writing this note (see Contract Baseline)"
output_summary:
  - "AC-001..AC-006, each traced to a success metric and to the defect it closes"
  - "EDGE-001..EDGE-008, weighted toward negative cases; EDGE-008 is a named limit rather than a criterion"
  - "Requirement and Contract baselines pinned by sha256"
  - "Governance checks for the strict profile, and a DoR verdict with a named blocker"
done_when:
  - "Every acceptance criterion states the command or fixture that decides it and the number it must produce"
  - "The compatibility clause is an acceptance criterion, not a regression footnote - as OQ-3's answer requires"
  - "No criterion presumes the s05 approach decisions OQ-1, OQ-2 or OQ-4"
owner: "developer"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "work-items/trusted-receipt-namespace-resolution/trusted-receipt-namespace-resolution.s01.restate.md"
  - "work-items/trusted-receipt-namespace-resolution/trusted-receipt-namespace-resolution.s02.business-goal.md"
  - "work-items/trusted-receipt-namespace-resolution/trusted-receipt-namespace-resolution.s03.open-questions.md"
approved_spec_digests:
  - ref: "work-items/trusted-receipt-namespace-resolution/trusted-receipt-namespace-resolution.s02.business-goal.md"
    sha256: "77307dea2d7e525a134aee9725d2fd3a479adc734d500ac183ed6a87a3b32784"
  - ref: "work-items/trusted-receipt-namespace-resolution/trusted-receipt-namespace-resolution.s03.open-questions.md"
    sha256: "366091de5881481595ebbc332c503897750214f54eafb7149ffc9f61e2ea892b"
unpinned_spec_refs:
  - ref: "work-items/trusted-receipt-namespace-resolution/trusted-receipt-namespace-resolution.s01.restate.md"
    reason: "s01 hosts the Work Item Protocol anchor, so wfc rewrites it on every protocol transition. A digest pin on s01 is structurally unstable, not merely inconvenient."
    measured: "s01 changed twice in a row on 2026-08-22 without a single human edit to its content: 2157c9c1 (when this note was written) -> eceebaf9 (after a work-item activate attempt) -> e842d459 (after work-item approve). The activate transition still to come would make it three."
    consequence_if_pinned: "Every protocol transition would silently invalidate this baseline, and nothing would catch it - approved_spec_digests is only checked for non-emptiness, never against the live files. A wrong digest inside a sealed note is exactly the silent lie this repo exists to prevent."
    still_part_of_the_baseline: "Yes. s01 stays in approved_spec_refs because the restated defect, the invariants and A1..A3 all live there. Only the digest pin is dropped."
decision_notes:
  - "sdd_mode=none, so there is no BRD/SRS pair and no Spec Card. The requirement baseline is the s01/s02/s03 chain. s02 and s03 are pinned by digest so a later edit to either makes this baseline visibly stale instead of silently wrong; s01 is referenced but deliberately not pinned - see unpinned_spec_refs."
  - "s03 is included, not just s01/s02, because OQ-3's answer lives there and it is what turned approval_gates.contract from not_applicable to required. Omitting it would leave the contract gate resting on an unreferenced decision."
  - "LESSON, recorded so it is not repeated: do not digest-pin s01 in a protocol-managed work item. The protocol anchor lives in s01 by design (see the repo policy on the Light physical note mapping), which makes s01 a tool-managed file. Pin only the notes that no tool writes to. The same trap is visible on the sibling work item, whose s01 also shows as modified."
  - "This note was re-sealed once for exactly this reason: dropping the s01 pin changed s04, which invalidated the spec, contract and dor receipts hosted here. That was a deliberate one-time cost, chosen over updating the s01 digest and paying it again at every future transition."
  - "Condition history: status reached APPROVED when a human finalized this note and sealed spec, contract and dor on 2026-08-21, all three digest_match=true."
```

## Contract Baseline
```yaml
status: APPROVED
api_contract_refs: []
ux_contract_refs: []
storage_contract_refs:
  - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js - resolveTrustedApprovalRoot (approval root and the outside-the-project-root refusal)"
  - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js - buildProjectApprovalNamespace (the address under contract)"
contract_surface:
  address_shape: "basename(projectRoot) + '-' + sha256(projectRoot).slice(0,12)"
  layout: "<approvalRoot>/<namespace>/{gates/<slug>/<gate>.json, work-items/<slug>.json, changes/<CR>.json}"
  approval_root_default: "~/.workflow-bundle/trusted-approvals"
measured_live_2026_08_20:
  approval_root_contents: "2 project namespaces plus approver-private.pem and approver-public.pem"
  this_project: "code-factory-916d1d6e915b - 43 receipts: 34 gates, 6 work-items, 3 changes"
  other_project_sharing_the_root: "product-roadmap-66c025db9523 - 23 receipts, gates only"
  method: "find over the approval root, grouped by first path segment"
notes:
  - "approval_gates.contract=required because po answered OQ-3 / GOV-Q1 YES on 2026-08-20: the on-disk address of audit evidence is a data contract even though nothing consumes it over a wire, because it is how every future reader finds the evidence and 43 receipts are already published to it. Precedent recorded in s03 so a later work item touching receipt storage does not re-litigate it."
  - "A second, unrelated project already shares this approval root. That is not a hypothetical - it is the live negative case behind AC-003. Any identity derivation that widens the namespace must still refuse product-roadmap's receipts when reading code-factory, and vice versa."
  - "The contract under change is the ADDRESS only. Receipt schema, signature, digest binding, TTY and passphrase enforcement are outside this work item by s02 non_goals and are asserted unchanged by AC-005."
  - "status is PARTIAL for the same reason as the Requirement Baseline: the surface is measured and pinned, the contract gate is unsealed. Same pre-seal flip condition applies."
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "s01 Existing System Baseline - resolveTrustedApprovalRoot, buildProjectApprovalNamespace, layout, 43 receipts, DONE requires an APPROVED dod receipt digest-matched to the s08 note"
  - "worktree-and-closure-integrity s07 debug_experiments - main resolves to code-factory-916d1d6e915b (exists), the worktree to worktree-and-closure-integrity-e9691c40f465 (absent)"
  - "worktree-and-closure-integrity s07 known_limitations L-01 - the dod seal guard exists; nothing re-checks cleanliness at the DONE transition"
  - "worktree-and-closure-integrity s07 known_limitations L-02 - the dirty-scope guard is deliberately silent outside a git repository"
impacted_surfaces:
  - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js - namespace resolution; every read and write path for receipts flows through it"
  - "Every wfc command that reads or seals a receipt: protocol, gate approve, work-item approve/activate/close, change-item approve"
  - "The DONE transition path (E-B) - work-item-protocol.js and/or the gate-review path, boundary to be fixed at s05"
  - "The on-disk approval root, shared with at least one other project on this machine"
  - "packages/workflow-bundle/test and tests/fixtures - new fixtures for both defects"
compatibility_constraints:
  - "All 43 receipts stay at their current on-disk path. No move, no rename, no rewrite - AC-002."
  - "34 of 34 gate receipts keep digest_match=true. Same ASM-001-class constraint that governed the sibling work item."
  - "No manual migration step may be required for the fix to work. s02 constraints: a fix that needs a manual step is worse than the defect for anyone who does not run it."
  - "The approval root stays outside the project root. It is an anti-tampering control, not an inconvenience (A1)."
  - "WORKFLOW_BUNDLE_APPROVAL_ROOT keeps working for operators who already set it - EDGE-007."
  - "A project with no git repository must still resolve deterministically, because A2's reject_if is exactly that case - EDGE-002."
  - "Prospective only for E-B. The four work items that closed under the looser DoD rule are not reopened or re-sealed. CONFIRMED by po 2026-08-21 via GOV-Q2, no longer an assumption."
rollback_constraints:
  - "The change must be revertable without touching disk state. If reverting the code re-orphans receipts written under a new address, the fix is not revertable - so the write address must be decided with rollback in mind at s05."
  - "E-A and E-B land as separate commits so E-B, the only tightening change, can be reverted alone. Same ordering discipline the sibling work item used for D-D."
  - "No release is cut inside this work item, so rollback is a git revert plus a re-run of the receipt inventory, not a package rollback."
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: "AC-001"
    criterion: "Trusted receipts resolve for the same logical project from any checkout of it."
    traces_to: ["SM-1", "SM-3", "E-A"]
    verification: "Run `wfc protocol --workflow-root work-items --project-root .` from inside a git worktree of this repo. Expect exit 0 and zero lines matching 'Missing trusted approval receipt' or 'Missing trusted work-item approval receipt'."
    baseline: "exit 1, 6 such lines (5 gate + 1 work-item), measured 2026-08-19"
    plus_fixture: "A fixture resolves one sealed receipt from two different absolute paths of one project and asserts the same file is read in both."
  - id: "AC-002"
    criterion: "Every existing receipt stays readable, valid and where it is. This is the compatibility clause the contract answer to OQ-3 made first-class."
    traces_to: ["SM-2", "OQ-3", "S01-R01"]
    verification: "Inventory the approval root before and after: 43 json files under code-factory-916d1d6e915b (34 gates / 6 work-items / 3 changes), 34 of 34 gate receipts digest_match=true, and no file's path or mtime changed by the fix. Compare the two inventories directly, not by re-reading a target number."
    baseline: "43 on disk, 34 gate receipts digest_match=true, measured 2026-08-20"
    fail_condition: "Any receipt unreadable, relocated, rewritten, or reporting digest_match=false. A migration command is not an acceptable way to satisfy this criterion."
  - id: "AC-003"
    criterion: "A receipt belonging to a genuinely different project is still refused. Fixing over-strictness must not create over-permissiveness."
    traces_to: ["SM-4", "S01-R04"]
    verification: "Negative fixture: two independent projects, each with its own sealed receipt; reading project A must not resolve project B's receipt, in either direction. The live case exists already - product-roadmap-66c025db9523 shares the approval root with this project."
    baseline: "n/a today - the namespace is over-specific, not over-permissive"
    pattern_ref: "Mirrors EDGE-003 from worktree-and-closure-integrity, where over-broad workflow_root normalisation was caught by five explicit rejection cases."
  - id: "AC-004"
    criterion: "A work item cannot transition to DONE while its declared delivery scope is dirty, and the exemption is visible when used."
    traces_to: ["SM-5", "E-B", "L-01"]
    verification: "Fixture: seal dod on a clean tree, dirty a path inside granted_write_paths, then attempt the DONE transition. Expect refusal naming the offending path. Re-run with the hatch and a non-empty reason: expect success, and the reason echoed on its own line in the output."
    baseline: "Permitted today - the seal guard exists, the transition does not re-check"
    gated_on: "GOV-Q2 CLEARED - po confirmed prospective-only on 2026-08-21. AC-004 remains gated on SIBLING-MERGE: the helpers T5 calls live on codex/worktree-and-closure-integrity, which cannot merge before its own s08 DoD."
  - id: "AC-005"
    criterion: "The four approval controls are unchanged, asserted rather than claimed."
    traces_to: ["SM-6", "S01-R02"]
    verification: "Four explicit non-regression assertions: (1) sealing refuses without a TTY, (2) sealing requires the passphrase, (3) one independent receipt per gate is still written, (4) a receipt still binds to the sha256 of its host artifact and reports stale when that artifact changes."
    baseline: "All four hold today"
    why_explicit: "This work item edits the file that implements all four. An unasserted control is an untested control."
  - id: "AC-006"
    criterion: "Identity resolution is deterministic and non-fatal for every project shape, including the ones with no git repository."
    traces_to: ["A2", "EDGE-002", "SM-1"]
    verification: "Fixture matrix over: a plain git repo, a worktree of it, a nested worktree, and a directory that is not a git repo at all. Every case returns a namespace deterministically - same input, same output across runs - and none throws."
    baseline: "Deterministic today, because it derives from the path; the defect is that determinism is on the wrong key"
    approach_neutral: "Deliberately worded to hold whichever identity derivation s05 picks for OQ-1. It constrains the outcome, not the mechanism."

edge_cases:
  - id: "EDGE-001"
    case: "Two independent clones of the same remote on one machine."
    required_outcome: "They stay separate. Two clones are two logical projects with two sets of local audit evidence; merging them because they share a remote would let one clone read approvals sealed in the other."
    why_it_matters: "It is the boundary between AC-001 and AC-003, and it is the case that rules a remote-URL-based identity out or forces a qualifier on it."
  - id: "EDGE-002"
    case: "A project with no git repository at all."
    required_outcome: "Resolves deterministically without throwing. AC-006 covers it. This is A2's reject_if, so it must be answered by design and not discovered at runtime."
  - id: "EDGE-003"
    case: "A worktree of a worktree, and a worktree whose path lies inside the main tree - which is this repo's own layout, .claude/worktrees/ is gitignored but inside the root."
    required_outcome: "All resolve to the same namespace as the main tree. The repo's own worktree convention must be the case that works, not the case that breaks."
  - id: "EDGE-004"
    case: "The namespace directory resolves but is empty, or holds a gates/ tree with no receipt for the gate being read."
    required_outcome: "Reports MISSING for that specific gate, exactly as today. An empty namespace must not be reported as a resolution failure, and a resolution failure must not be reported as an approved gate."
  - id: "EDGE-005"
    case: "E-B on a work item whose granted_write_paths is empty."
    required_outcome: "Refuse rather than pass vacuously. Inherited directly from ODC-001 in the sibling work item, where an empty declared scope would otherwise make a scope-based check trivially true."
  - id: "EDGE-006"
    case: "E-B on a project that is not a git repository."
    required_outcome: "Silent, consistent with L-02's precedent: a non-git project has no history a delivery could be missing from. Recorded so the inconsistency with EDGE-005 is deliberate rather than accidental."
  - id: "EDGE-007"
    case: "An operator has WORKFLOW_BUNDLE_APPROVAL_ROOT set, or WORKFLOW_BUNDLE_ALLOW_INSECURE_APPROVAL_ROOT=true."
    required_outcome: "Both keep their current meaning. The override is the documented escape hatch and some operator may already depend on it; this fix removes the NEED for it as a worktree workaround without removing the hatch."
  - id: "EDGE-008"
    case: "An orphan change - a file modified outside every work item's granted_write_paths - at the DONE transition."
    required_outcome: "Not flagged, and that is a known gap rather than a criterion. Recorded in the sibling work item's s07 as a genuine limit of a scope-based check. Named here so a reviewer does not read AC-004 as broader than it is."

out_of_scope:
  - "Making receipts portable between machines or shareable across users. One machine, one project, several paths."
  - "Changing receipt format, signature scheme or digest binding."
  - "Relaxing the rule that the approval root lives outside the project root."
  - "Migrating, relocating or rewriting the 43 existing receipts as the means of fixing lookup."
  - "Re-opening or re-sealing any closed work item, including the four that closed under the looser DoD rule."
  - "The tdd-enforce hook, the workflow_root comparison, and anything else already delivered by worktree-and-closure-integrity."
  - "Making wfc work from an unrelated directory that merely happens to contain a work-items folder."
  - "Choosing the identity derivation, the compatibility mechanism, or the waiver location. Those are OQ-1, OQ-2 and OQ-4 and they belong to s05."

done_when:
  - "AC-001..AC-006 each have recorded evidence with a real number or a real command output, compared against the baseline stated beside them"
  - "Both defects were observed failing first - E-A and E-B each get a fixture committed RED before its fix, as the s01 and s02 constraints require"
  - "E-A and E-B are separate commits, E-B last, so the only tightening change is revertable alone"
  - "The receipt inventory taken at the start of s07 and at the end of s08 match on every field AC-002 names"
  - "GOV-Q2 answered - done, prospective-only, 2026-08-21. E-B stays gated only on SIBLING-MERGE."
  - "s08 records a Regression & Compatibility Summary - mandatory for brownfield - and a DoD verdict sealed by a human"

behavioral_invariants:
  - "Receipts live outside the project root."
  - "One independent receipt per gate."
  - "A receipt binds to the sha256 of its host artifact and reads stale when that artifact changes."
  - "Sealing requires a TTY and a passphrase."
  - "gate_reviews and role_signoffs are filled by a human before sealing, never by the agent."
  - "No sealed receipt is ever moved, rewritten or invalidated by this work item."
  - "Widening resolution never widens trust: a different project's receipt stays unreadable."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
  - "project-context/checklists/default.md (inherited)"
checks:
  - check: "acceptance criteria are measurable and verifiable"
    profile: default
    status: PASS
    evidence: "Each of AC-001..AC-006 names the command or fixture that decides it, the number it must produce, and the baseline it is compared against. AC-002 is checked by comparing two inventories rather than by re-reading a target constant."
  - check: "the needed role sign-offs have been identified"
    profile: default
    status: PASS
    evidence: "role_signoffs: spec=ba, contract=developer. dor, approach, task_plan and dod are still empty and must be filled by the humans who review them - not pre-filled here."
  - check: "requirements or foundational rules have been reflected into the workflow note"
    profile: default
    status: PASS
    evidence: "sdd_mode=none, so the Requirement Baseline pins the s01/s02/s03 chain by digest instead of pointing at a BRD/SRS."
  - check: "reviewer coverage has been specified per main boundary"
    profile: strict
    status: PARTIAL
    evidence: "Two boundaries: namespace resolution inside workflow-trusted-approval-utils.js (E-A) and the DONE transition (E-B). E-A's reviewer is the contract signoff (developer). E-B's boundary is not fixed until s05 answers OQ-4, so its reviewer cannot be assigned yet."
    owner: "developer at s05"
  - check: "backward compatibility or migration assumptions have been recorded"
    profile: strict
    status: PASS
    evidence: "AC-002 is the compatibility criterion, not a footnote. A1/A2/A3 carry reject_if clauses. OQ-2 keeps fallback-versus-migration an open decision instead of an assumed one, and s02's constraints already rule out a fix that requires a manual step."
  - check: "release impact and rollback expectations have been identified before implementation"
    profile: strict
    status: PASS
    evidence: "Recorded in Existing System Baseline.rollback_constraints: revert must not re-orphan receipts, which makes the WRITE address an s05 decision with rollback as an input; E-A and E-B commit separately so the tightening change reverts alone. No release is cut inside this work item."
  - check: "governance-exception path determined in advance"
    profile: default
    status: PASS
    evidence: "None open. If s05 has to narrow the 'no receipt format change' non-goal to house E-B's waiver - conflict CF-1 in s03 - that is a scope amendment needing po sign-off, not a silent widening. The route is named before it is needed."
blocking_items: []
resolved_blocking_items:
  - id: "GOV-Q2"
    item: "Does the tightened DONE transition apply to the four work items that already closed under the looser rule?"
    owner: "po"
    blocked: "E-B / AC-004 only. E-A was never affected."
    status: RESOLVED
    answer: "PROSPECTIVE ONLY - the four already-DONE work items are not reopened, not re-sealed, not re-verified."
    answered_by: "po (human, interactive)"
    answered_at: "2026-08-21"
    full_record: "s03 open_questions.GOV-Q2 carries the reasoning, the scope of the answer, the consulted lens and the precedent."
    precedent_to_reconfirm: "worktree-and-closure-integrity resolved the equivalent question as prospective-only: no closed work item reopened, because reopening would invalidate sealed receipts to enforce a rule that did not exist when they were sealed."
    why_raised_again: "It is a governance decision. A sibling work item answering it once is not the same as it being answered for this one."
    signing_authority: "po"
    consulted_lens:
      - "sa - whether an invariant tightened after the fact may reach back over already-sealed audit evidence is a solution-level integrity question"
      - "ta - the compatibility consequence for the four closed work items and their 22 receipts is a technical-architecture question"
    why_po_signs_rather_than_sa_or_ta: "Decided with the human on 2026-08-21, option A. sa and ta are SKILLS in this repo, not governance roles: GOVERNANCE_ROLES at workflow-governance-definitions.js:15 is exactly [po, ba, designer, developer, qc, devops], and governance-role-model.md defines the same six with no architect entry. Verified empirically - putting 'ta' in role_signoffs.approach fails with 'Unknown governance role'. Naming sa or ta as owner here would assert an authority that cannot sign any gate, which is worse than naming the role that can. The underlying gap is recorded separately as F-04."
    architecture_input_is_not_optional: "Recording po as the signer does not make this a product-only call. The reconfirmation should carry the sa/ta reasoning above; a bare yes without it repeats the drift this question exists to prevent."
owner: "developer"
next_action: "GOV-Q2 is answered. Remaining: a human reviews this note, flips frontmatter status/spec_status/governance_status and the two baseline statuses, fills gate_reviews.spec/contract/dor, then seals those three gates. Order matters - see Handoff."
```

## Definition of Ready
```yaml
status: READY
verdict_scope: "Readiness to enter s05 Technical Approach. It says nothing about any gate having passed - spec, contract, dor, approach and task_plan are all unsealed."
verdict_history:
  - "PARTIAL as first written, on GOV-Q2, scoped to E-B only"
  - "READY after po answered GOV-Q2 = prospective-only on 2026-08-21. The blocker was removed by a decision, not by re-grading it."
ready_for:
  - "E-A - the namespace defect. Mechanism measured, invariants written, criteria checkable, compatibility clause locked. OQ-1 and OQ-2 are decisions s05 PRODUCES, not inputs it lacks."
  - "E-B - governance axis clear after GOV-Q2. Still gated on SIBLING-MERGE, which is a delivery dependency on another work item's s08 closure, not a readiness gap in this note."
blockers: []
owners:
  - "po - GOV-Q2 answered 2026-08-21; OQ-2 is moot under the s05 recommendation and needs acknowledgement rather than a decision"
  - "developer - OQ-1 and OQ-4 at s05, both to be answered by option analysis rather than by assertion"
notes:
  - "This note was authored at PARTIAL and is now READY. The upgrade came from po answering GOV-Q2, recorded in s03 with its reasoning - not from re-grading the same evidence, which is what the safe-default rule exists to prevent."
  - "SIBLING-MERGE is deliberately NOT a DoR blocker. It is a delivery dependency on another work item reaching s08, so it belongs in the task plan sequencing, not in a readiness verdict about this note."
  - "MI-1 - whether any adopter outside this machine depends on the current namespace - is de-risked, not answered. The read-fallback direction is correct whether or not other installations exist, so it does not block."
  - "No worktree exists for this work item yet, and none is needed before s07. Note that reproducing E-A at all requires one, and this repo's worktrees live at .claude/worktrees/ inside the root - EDGE-003's case."
```

## Traceability
```yaml
upstream:
  - "trusted-receipt-namespace-resolution.s01.restate.md"
  - "trusted-receipt-namespace-resolution.s02.business-goal.md"
  - "trusted-receipt-namespace-resolution.s03.open-questions.md"
metric_to_criterion:
  - "SM-1 -> AC-001"
  - "SM-2 -> AC-002"
  - "SM-3 -> AC-001 (the two-path fixture)"
  - "SM-4 -> AC-003"
  - "SM-5 -> AC-004"
  - "SM-6 -> AC-005"
  - "A2 / EDGE-002 -> AC-006"
defect_to_criterion:
  - "E-A -> AC-001, AC-002, AC-003, AC-006"
  - "E-B -> AC-004, and EDGE-005 / EDGE-006 for its boundaries"
  - "Both -> AC-005, the controls that must not move"
sibling_work_item_inheritance:
  - "AC-003 mirrors EDGE-003 - fixing over-strictness must not produce over-permissiveness"
  - "EDGE-005 inherits ODC-001 - an empty declared scope must refuse, not pass vacuously"
  - "EDGE-006 inherits L-02 - the guard is deliberately silent outside a git repository"
  - "EDGE-008 inherits the orphan-change gap - named as a known limit, not promoted to a criterion"
next_step: "s05 Technical Approach - option analysis for OQ-1 (identity derivation) and OQ-2 (compatibility mechanism), then OQ-4 (waiver location) if E-B stays in scope"
```

## Handoff
- **Criteria that must hold:** `AC-001` receipts resolve from any checkout of one project; `AC-002` all 43 stay readable, valid and unmoved - the compatibility clause `OQ-3`'s answer made first-class; `AC-003` a different project's receipt is still refused, and `product-roadmap-66c025db9523` sharing this approval root makes that a live case rather than a hypothetical one; `AC-004` `DONE` refuses over a dirty declared scope with a visible hatch; `AC-005` the four approval controls asserted unchanged; `AC-006` deterministic resolution for every project shape including non-git.
- **Edge cases that must survive:** `EDGE-001` two clones of one remote stay separate; `EDGE-003` this repo's own `.claude/worktrees/` layout is the case that must work; `EDGE-004` an empty namespace reports a missing gate, not a resolution failure; `EDGE-007` the existing env-var hatches keep their meaning. `EDGE-008` is a named limit of `AC-004`, not a criterion.
- **Deliberately not decided here:** how identity is derived (`OQ-1`), fallback versus migration (`OQ-2`), and where `E-B`'s waiver lives (`OQ-4`). Writing any of them into an acceptance criterion would lock the approach at `s04` and make `s05`'s option analysis ceremonial.
- **Condition to enter step 5:** met. `po` answered `GOV-Q2` prospective-only on 2026-08-21. `E-A` needed nothing further; `E-B` is now gated only on `SIBLING-MERGE`.
- **Next human action - order matters.** `GOV-Q2` is answered (prospective-only, `po`, 2026-08-21) and `DoR` is now `READY`. Review this note, then make every frontmatter and status edit **before** sealing. Sealing first and editing after invalidates the receipt digest - that is precisely how four receipts went stale at once in `worktree-and-closure-integrity` `AMENDMENT-001`. The pre-seal edit list was verified by running the governance validator against a copy of this note with `status: approved`, so it is the actual set the validator demands, not a guess:
	- frontmatter `status: draft` -> `approved`
	- frontmatter `spec_status: draft` -> `approved` (required whenever `approval_gates.spec=required`)
	- frontmatter `governance_status: CHECKS_PENDING` -> `ALIGNED`. A finalized `s04` may not keep `CHECKS_PENDING`, and `ALIGNED` is only honest once `GOV-Q2` is answered - which is why answering it is the first step and not the last.
	- `Requirement Baseline.status` and `Contract Baseline.status`: `PARTIAL` -> `APPROVED`
	- `gate_reviews.spec_reviewed_by` / `_at`, `contract_reviewed_by` / `_at`, `dor_reviewed_by` / `_at` - the real reviewer and the real review moment
	- `role_signoffs.dor` is already declared as `po, ba`. That is a statement of who holds the authority, not a record that they used it; `gate_reviews` is where the act is recorded.
- **Then seal,** one independent receipt per gate: `wfc gate approve --work-item trusted-receipt-namespace-resolution --gate spec --reviewed-by <role>`, and the same for `--gate contract` and `--gate dor`. Sealing needs an interactive TTY and the approver passphrase. Verified against this note as it stands: `wfc gate approve --gate spec --reviewed-by po` is refused with `gate_reviews.spec_reviewed_by ... must include 'po' before sealing trusted approval`. The tool enforces the edit-then-seal order and cross-checks the reviewer against `gate_reviews`, so it will not accept a role the note does not record.
- **Not started:** this work item still has no `.work-item-report.json`, so it is not protocol-managed and no gate has even been proposed. Nothing in this note authorises implementation.
