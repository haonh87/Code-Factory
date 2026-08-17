# Worked Example - sample-execution-item

Test of the artifact-governance rules against a real multi-role work item, performed
**before** the rules were written down, so that a rule which cannot produce a determinate
answer gets revised rather than shipped.

Subject: `work-items/sample-execution-item/`, the only work item in the repository running
a multi-role execution topology. Measured 2026-08-16.

---

## 1. Baseline measurement

12 files, 1212 lines.

| File | Lines | Kind |
|---|---|---|
| `s01.restate.md` | 115 | step note |
| `s02.business-goal.md` | 98 | step note |
| `s03.open-questions.md` | 111 | step note |
| `s04.acceptance-criteria.md` | 117 | step note |
| `s05.technical-approach.md` | 147 | step note |
| `s05.execution-policy.md` | 46 | runtime artifact |
| `s06.task-breakdown.md` | 140 | step note |
| `s06.worker-assignment.md` | 49 | runtime artifact |
| `s07.implementation.md` | 134 | step note |
| `s07.worker-handoff-report.md` | 48 | runtime artifact |
| `s07.merge-report.md` | 42 | runtime artifact |
| `s08.verification.md` | 165 | step note |

Overhead carried by the four runtime artifacts:

| Artifact | Total | Frontmatter | `## Links` | Real content |
|---|---|---|---|---|
| `execution-policy` | 46 | 15 | 3 | 28 |
| `worker-assignment` | 49 | 15 | 3 | 31 |
| `worker-handoff-report` | 48 | 15 | 2 | 31 |
| `merge-report` | 42 | 15 | 2 | 25 |
| **Total** | **185** | **60** | **10** | **115** |

**38% of those four files is frontmatter and back-pointers that exist only because the
content lives in a separate file.** Each also carries a `shared_contract_ref` pointing back
at its parent note — a pointer that is unnecessary when the content sits inside that note.

---

## 2. The defect this example was meant to test, found inside the sample itself

`F12` predicted that a singular schema plus a fixed filename cannot represent more than one
role. The reference sample demonstrates the failure directly:

| Evidence | Value |
|---|---|
| `execution-policy.parallel_budget` | **3** |
| `worker-assignment` files present | **1** |
| `assignment_id` values in them | **1** (`S06-ASSIGN-001`) |
| `merge-report.merged_assignments` | **2** — `S07-BACKEND-001`, `S07-FRONTEND-001` |
| `worker-handoff-report` files present | **1** (`S07-BACKEND-001`) |
| Where `S07-FRONTEND-001` appears | **Only inside merge-report.** No artifact exists for it. |

`S07-FRONTEND-001` is an orphan. The merge report claims to have merged a handoff that has
no artifact, because `<slug>.s07.worker-handoff-report.md` is a single fixed filename already
occupied by the backend worker.

The repository's own reference sample cannot represent the execution policy it declares.
This is not a defect in the sample; it is the naming contract making a valid state
unrepresentable.

---

## 3. The threshold test, as applied

A contribution earns its own file only if **at least one** answer is yes. Otherwise it is a
section in the step's primary note.

1. **Concurrent writers** — will two actors write this artifact at the same time, in separate
   processes or worktrees, such that one file would produce a write conflict?
2. **Independent addressability** — must an external mechanism hash, sign, or resolve this
   artifact by its own path?
3. **Independent lifecycle** — is it created, superseded, or archived at a different time by a
   different actor than the host note?

### Applied to the four runtime artifact kinds

| Artifact | Q1 concurrent | Q2 addressable | Q3 lifecycle | Verdict |
|---|---|---|---|---|
| `execution-policy` | No — one coordinator writes it once | No | No — same step, same actor | **Section** |
| `worker-assignment` | No — the **coordinator** assigns; workers do not write it | No — referenced by `assignment_id`, never by path | No | **Section** (schema becomes plural: `assignments[]`) |
| `worker-handoff-report` | See §4 | No | No | **Section** (`handoffs[]`) |
| `merge-report` | No — written once by the coordinator after all handoffs land | No | No | **Section** |

All four are determinate. No case required a judgement call.

Note the contrast with a genuine yes: a **step note** answers yes to Q2, because
`wfc gate approve` hashes it by path into a trusted receipt. That is why step notes are files
and role contributions are not.

---

## 4. ODC-004 resolved — do concurrent writers force per-role handoff files?

**No, under this repository's declared topology.** The reason is a rule the repository already
has, in `AGENTS.global.md`:

> A worker may only hand off to the `coordinator`, not directly to the next step.
> Worker output must not be treated as the final output of the step until it has been merged
> into the source-of-truth `.md` note.

Workers hand off **to the coordinator**, not to the filesystem. The concurrency is in the agent
conversation, not in file writes. The coordinator is a single writer, and a single writer
cannot conflict with itself.

**Escape hatch, kept open honestly.** If a future topology has workers writing to the repository
directly and in parallel — for example each in its own worktree — Q1 becomes yes and the verdict
flips to file. In that case the filename must carry the discriminator and be registered:

```
<work_item_slug>.s07.worker-handoff-report.<assignment-id>.md
```

`REQ-002` reopens if that topology is adopted. It is not adopted today, and the sample above
shows the current single-filename form already fails at two workers, so the flip would be a
strict improvement over the status quo either way.

---

## 5. Destination for all twelve files

| # | Current file | Destination | Owning section |
|---|---|---|---|
| 1 | `s01.restate.md` | `s01` | stays as host |
| 2 | `s02.business-goal.md` | `s01` | `## Business Goal` |
| 3 | `s03.open-questions.md` | `s01` | `## Open Questions` |
| 4 | `s04.acceptance-criteria.md` | `s04` | stays as host |
| 5 | `s05.technical-approach.md` | `s06` | `## Technical Approach` |
| 6 | `s05.execution-policy.md` | `s06` | `## Execution Topology` |
| 7 | `s06.task-breakdown.md` | `s06` | stays as host |
| 8 | `s06.worker-assignment.md` | `s06` | `## Role Outputs` → `assignments[]` |
| 9 | `s07.implementation.md` | `s07` | stays as host |
| 10 | `s07.worker-handoff-report.md` | `s07` | `## Role Outputs` → `handoffs[]` |
| 11 | `s07.merge-report.md` | `s07` | `## Merge Summary` |
| 12 | `s08.verification.md` | `s08` | stays as host |

Twelve of twelve have a determinate destination. **No file required an invented path, and no
content had to be forced into a section where it did not belong.**

Items 2 and 3 follow the existing `sdd_mode=light` note mapping, which the repository already
supports. Items 6, 8, 10 and 11 follow the threshold test in §3.

---

## 6. Result

| Measure | Before | After |
|---|---|---|
| Files | **12** | **5** |
| Lines | 1212 | ~1097 |
| Frontmatter blocks | 12 | 5 |
| Lines removed as pure overhead | — | 115 (7 frontmatters + 10 link lines) |
| Orphaned assignments | 1 (`S07-FRONTEND-001`) | 0 |

Nothing was deleted. Every statement in the 1212 lines has a destination. The 115 lines removed
are frontmatter and back-pointers that only existed to make separate files addressable.

### The number that matters: adding a role

| | Current model | Under these rules |
|---|---|---|
| Add a 7th role | **+2 files** — and neither has a valid filename, so the round invents one or drops the content, which is how `S07-FRONTEND-001` became an orphan | **+0 files** — one entry in `assignments[]`, one in `handoffs[]` |
| Add an 8th role | +2 files | +0 files |

File count becomes a function of the work, not of the team.

---

## 7. What this example proves and what it does not

**Proves**

- The threshold test returns a determinate verdict for all four runtime artifact kinds (`AC-002`).
- All twelve files map to a destination with no invented path (`AC-008`).
- File count is flat under added roles (`AC-008`).
- `ODC-004` is resolved against the repository's declared topology, with the escape hatch stated.

**Does not prove**

- That merging is mechanically safe. `validate-workflow-execution.js:70` reads `assignment_id`,
  `role`, `owned_scope`, `done_when` and `status` from the per-role artifact. Moving them into a
  section requires migrating that reader **in the same change**, with a test that fails first.
  That is P2, and this example is the written rule P2 migrates toward.
- That the after-count holds for a work item with genuinely concurrent repo writers. See §4.
- Anything about `docs/`, the repository root, or `changes/`. Those are the placement contract,
  measured separately as `F1` to `F8`.

**Rule revision triggered by this example:** none. The threshold test survived contact with all
twelve files unchanged. Had any file required a judgement call, the rule would have been revised
here rather than written down as-is.
