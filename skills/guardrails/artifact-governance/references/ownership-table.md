# Ownership Table and Reference Syntax

Every fact a workflow note states has exactly one owning block. Every other block that wants
that fact either derives it, references it, or does without it. Nothing copies it.

Grounded in the measured duplications `F9` in
`work-items/artifact-governance-model/artifact-governance-model.s01.restate.md`, all five of
which were verified against
`work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s06.task-breakdown.md`
on 2026-08-16.

---

## Rule 0 — derive or delete before you reference

A reference is not the first answer. Ask in order:

1. **Is the copy derivable from the owner?** Then delete it. A reader who needs the execution
   order reads the task list; restating it as a separate sequence adds a second thing that can
   go stale.
2. **Does a reader genuinely need a pointer to another artifact?** Then reference it.
3. **Neither?** Then it is not duplication — it is a distinct fact, and it needs its own owner
   in this table.

Most of `F9` is case 1. Adding a reference syntax everywhere would have replaced five stale
copies with five stale pointers.

---

## The table

| # | Fact | Owning block | Must not restate it | Action |
|---|---|---|---|---|
| 1 | Execution order and dependency | `## Main Artifact` → `task_breakdown[].id`, `.dependencies` | `dev_lane.technical_sequence` | **delete** — derivable from the task list |
| 2 | Paths a task touches | `## Main Artifact` → `task_breakdown[].paths_in_scope` | `dev_lane.path_map`, `## Technical Approach` → `affected_boundary.created/modified` | **delete** — the boundary is the union of task paths |
| 3 | Paths deliberately **not** touched | `## Technical Approach` → `affected_boundary.explicitly_untouched` | anything else | keep — **not** derivable from tasks |
| 4 | How a task is verified | `## Main Artifact` → `task_breakdown[].verification_hint` | `dev_lane.tdd_targets`, per-task rows in `## Verification Plan` | **delete** from both |
| 5 | Verification levels and what is skipped | `## Verification Plan` | task rows | keep — a strategy fact, not a per-task fact |
| 6 | Requirement and acceptance text | Spec Card `## Requirements`, `## Acceptance Criteria` | every step note | **reference by id** |
| 7 | Requirement / AC → task trace | `## Traceability` → `task_refs` | `ba_lane.acceptance_coverage` | **delete**, fold both legs into `## Traceability` |
| 8 | Who may sign a gate | frontmatter `role_signoffs.<gate>` | `ba_lane.human_review_points`, Handoff prose | **delete** |
| 9 | Who signed, and when | frontmatter `gate_reviews.<gate>_reviewed_by/_at` | prose anywhere | **delete** |
| 10 | Whether a gate actually passed | the trusted receipt under `~/.workflow-bundle/trusted-approvals/` | every note | **reference** — the note is never the authority |
| 11 | Protocol state, granted write paths, audit events | `## Work Item Protocol` — **owned by the `wfc` CLI** | any human or agent | **never hand-write** |
| 12 | Scope in / out | Spec Card `in_scope`, `out_scope` | step notes | **reference by id** |

No fact appears twice in the Owner column. That is the invariant this table has to keep.

### Note on row 11

This row was learned by breaking it. An earlier draft of this work item wrote a findings block
into `## Work Item Protocol` in `s01`; `wfc work-item approve` then rewrote the block and the
findings were lost. The block is generated from `<slug>.work-item-report.json`. Anything a human
or agent writes there is destroyed at the next protocol transition.

---

## Reference syntax

For rows 6, 10 and 12, where a pointer is genuinely needed:

```
<name>_ref: "<artifact-path>#<Section Heading>.<dotted.yaml.path>"
```

- Omit `<artifact-path>` for a target in the same note: `"#Main Artifact.task_breakdown"`.
- `<Section Heading>` is the `##` heading text without the marker.
- `<dotted.yaml.path>` walks the YAML block inside that section. `[]` selects a list; `[id]`
  selects the list item whose `id` matches.

Live examples already in this repository:

```yaml
# s04 pointing at the Spec Card instead of restating nine acceptance criteria
acceptance_criteria_ref: "product-specs/cards/artifact-governance-model.md#Acceptance Criteria"

# same-note pointer
paths_ref: "#Main Artifact.task_breakdown[T1].paths_in_scope"
```

**How a resolver locates the target** (specification for the P3 check, not built in P1):

1. Split on the first `#`. Empty left side means the current file; otherwise resolve relative to
   the repository root.
2. In that file, find the line matching `^## <Section Heading>\s*$`.
3. Take the first fenced ` ```yaml ` block after it, up to the closing fence.
4. Parse it and walk the dotted path. `[id]` matches a list item by its `id` key.
5. Fail loudly on: file missing, heading missing, no YAML block, path not found. A reference
   that cannot be resolved is a broken reference, not an empty one.

---

## Worked rewrite — duplication F9 #2

The single clearest case, taken verbatim from the real note.

**Before** — the same six files stated twice, once as lossy prose and once precisely:

```yaml
dev_lane:
  path_map:
    - "Permission lane: packages/workflow-bundle/scripts/workflow-bundle-utils.js,
       workflow-bundle-cli.js, sync-workflow-bundle-runtime.js and focused tests"
    # ... five more lanes
task_breakdown:
  - id: T1
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-bundle-utils.js"
      - "packages/workflow-bundle/scripts/workflow-bundle-cli.js"
      - "packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js"
      - "packages/workflow-bundle/test/workflow-bundle-utils.test.js"
      - "packages/workflow-bundle/test/run-workflow-bundle-smoke.test.js"
      - "packages/workflow-bundle/test/sync-workflow-bundle-runtime.test.js"
```

The lane says "and focused tests". The task names three specific test files. They already
disagree in precision, and nothing keeps them together when one is edited.

**After** — `path_map` deleted. `task_breakdown[].paths_in_scope` is the owner. If a lane grouping
is genuinely useful for a reader, it is a derived view, labelled as one:

```yaml
task_breakdown:
  - id: T1
    lane: "permission"        # grouping label, not a second copy of the paths
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-bundle-utils.js"
      # ... unchanged
```

Six lines of prose removed, zero facts lost, one divergence closed.

Applying rows 1, 4, 7 and 8 the same way removes `technical_sequence`, `tdd_targets`,
`acceptance_coverage` and `human_review_points` — the whole `ba_lane` / `dev_lane` scaffold —
and leaves `implementation_goal`, `scope_guards` and `task_breakdown`, which own their content.

---

## Constraint inherited by P2

**Deleting a field is a behaviour change until its readers are migrated.**

`packages/workflow-bundle/scripts/validate-workflow-execution.js:70` reads `assignment_id`,
`role`, `owned_scope`, `done_when` and `status` from the per-role artifact:

```js
"worker-assignment": [/assignment_id:/, /role:/, /owned_scope:/, /done_when:/, /status:/],
```

Any change that moves those fields into a section must, **in the same change**:

1. grep for every reader of the field before removing it;
2. migrate the reader to the owning block;
3. write the test that fails first, per the TDD rule for behaviour change.

Removing a field whose only reader is a validator does not produce a loud failure. It produces
a check that silently passes on everything. That is worse than the duplication being fixed.

This constraint is written here so P2 starts from a rule rather than rediscovering
`validate-workflow-execution.js:70` the hard way.

---

## Self-test

This work item's own `s04` applies row 6: it holds `acceptance_criteria_ref` pointing at the
Spec Card and lists only AC ids, rather than restating nine criteria. Its `s06` still carries
`affected_boundary.created`, which row 2 says is derivable from `task_breakdown[].paths_in_scope`.
That is a live instance of the rule this table sets, recorded rather than quietly cleaned up,
because `s06` is sealed to four trusted receipts and editing it now would invalidate all four.
It is the first entry for the P2 cleanup list.
