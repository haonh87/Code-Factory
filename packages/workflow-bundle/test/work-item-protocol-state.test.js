const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");
const utils = require("../scripts/work-item-protocol-utils");

const entry = { id: "opaque-1", kind: "approval_pending", text: "Release awaits review", gate: "release" };
const report = (blockers = [], required_actions = []) => ({ blockers, required_actions });

test("typed entries survive normalization, including display whitespace", () => {
  const display = { ...entry, text: "  Chờ phê duyệt – 漢字\nexact  " };
  const raw = report([display], [{ id: "opaque-2", kind: "workflow_followup", text: "Continue" }]);
  assert.deepEqual(utils.normalizeProtocolReport(raw).blockers, [display]);
  assert.deepEqual(utils.normalizeProtocolReport(raw).required_actions, raw.required_actions);
  assert.deepEqual(raw.blockers, [display], "load does not mutate input");
});

test("unknown legacy strings retain exact text and stay legacy on repeated loads", () => {
  const values = ["Peer review of the migration script is outstanding", " Pending release ", "pending RELEASE", "réview\u00a0release", "", "wfc gate approve --gate release trailing-prose"];
  for (const key of ["blockers", "required_actions"]) {
    const normalized = utils.normalizeProtocolReport({ [key]: values })[key];
    assert.deepEqual(normalized, values.map(text => ({ kind: "legacy", text })));
    assert.deepEqual(utils.normalizeProtocolReport({ [key]: normalized })[key], normalized);
  }
});

test("one constructor creates deterministic full SHA-256 opaque IDs from a JSON tuple", () => {
  assert.equal(typeof utils.createStateEntry, "function", "state constructor is available");
  const args = { collection: "blockers", kind: "approval_pending", gate: "release", sourceKey: "release-receipt", text: "First wording" };
  const first = utils.createStateEntry(args);
  const expected = crypto.createHash("sha256").update(JSON.stringify(["blockers", "approval_pending", "release", "release-receipt"])).digest("hex");
  assert.equal(first.id, "se:" + expected);
  assert.deepEqual(first, { id: "se:" + expected, kind: args.kind, text: args.text, gate: args.gate });
  assert.equal(utils.createStateEntry({ ...args, text: "Other wording" }).id, first.id);
  for (const delta of [{ collection: "required_actions" }, { gate: "dod" }, { sourceKey: "other" }]) {
    assert.notEqual(utils.createStateEntry({ ...args, ...delta }).id, first.id);
  }
  const nonGate = utils.createStateEntry({ collection: "required_actions", kind: "work_item_close", sourceKey: "close", text: "Close" });
  assert.equal(Object.hasOwn(nonGate, "gate"), false);
  assert.throws(() => utils.createStateEntry({ ...args, sourceKey: "" }), /sourceKey/);
});

test("typed shape validation rejects missing fields, unknown kinds, invalid gates and duplicate IDs", () => {
  const invalid = [
    { ...entry, id: "" }, { ...entry, id: 1 }, { ...entry, kind: "unknown" },
    { ...entry, text: "" }, { ...entry, text: null }, { ...entry, gate: undefined },
    { ...entry, gate: "unknown" }, { ...entry, kind: "workflow_followup" },
    { kind: "legacy", text: "unknown", id: "invented" },
    { kind: "legacy", text: "unknown", gate: "release" }, null, 7, ["nested"]
  ];
  for (const value of invalid) assert.throws(() => utils.normalizeProtocolReport(report([value])), /blockers\[0\]/);
  assert.throws(() => utils.normalizeProtocolReport(report([entry, { ...entry, text: "different" }])), /duplicate.*id/i);
  assert.doesNotThrow(() => utils.normalizeProtocolReport(report([entry], [entry])), "uniqueness is per collection");
  assert.throws(() => utils.normalizeProtocolReport({ blockers: entry }), /blockers.*array/);
});

test("exact known values and fully consumed command grammar are adapted only at load", () => {
  const known = [
    ["Continue active execution from the current step.", "workflow_followup"],
    ["Resolve blockers before resuming the work item.", "blocker_resolution"],
    ["wfc gate approve-ready-bundle --work-item demo", "readiness_bundle_approval"],
    ["wfc gate approve-closeout-bundle --work-item demo", "closeout_bundle_approval"],
    ["wfc work-item close --work-item demo", "work_item_close"],
    ["wfc work-item activate --work-item demo --step s07 --write-root <path>", "work_item_activation"],
    ["wfc work-item resume --work-item demo --step s07", "work_item_resume"]
  ];
  for (const [text, kind] of known) {
    const first = utils.normalizeProtocolReport(report([], [text])).required_actions[0];
    assert.equal(first.kind, kind);
    assert.match(first.id, /^se:[a-f0-9]{64}$/);
    assert.equal(first.text, text);
    for (const changed of [text + " extra prose", "Comment: " + text, text.toUpperCase()]) {
      assert.deepEqual(utils.normalizeProtocolReport(report([], [changed])).required_actions[0], { kind: "legacy", text: changed });
    }
  }
  const command = "wfc gate approve --work-item demo --gate release --workflow-root work-items --project-root . --reviewed-by qc";
  const imported = utils.normalizeProtocolReport(report([], [command])).required_actions[0];
  assert.equal(imported.kind, "gate_approval");
  assert.equal(imported.gate, "release");
  assert.equal(utils.normalizeProtocolReport(report([], [command + " --gate dod"])).required_actions[0].kind, "legacy", "duplicate flags are not guessed");
  assert.equal(utils.normalizeProtocolReport(report([], [command.replace("--gate release", "--gate unknown")])).required_actions[0].kind, "legacy");
  const typedUnknown = { kind: "legacy", text: known[0][0] };
  assert.deepEqual(utils.normalizeProtocolReport(report([typedUnknown])).blockers[0], typedUnknown, "already emitted objects are never reinterpreted");
});

test("selectors use exact ID or kind+gate and never read display text", () => {
  assert.equal(typeof utils.matchesStateEntry, "function", "exact selector is available");
  const semantic = { id: entry.id, kind: entry.kind, gate: entry.gate };
  Object.defineProperty(semantic, "text", { get() { throw new Error("core read display text"); } });
  assert.equal(utils.matchesStateEntry(semantic, { id: "opaque-1" }), true);
  assert.equal(utils.matchesStateEntry(semantic, { id: "opaque" }), false);
  assert.equal(utils.matchesStateEntry(semantic, { kind: "approval_pending", gate: "release" }), true);
  assert.equal(utils.matchesStateEntry(semantic, { kind: "approval_pending", gate: "dod" }), false);
  assert.equal(utils.matchesStateEntry(semantic, { kinds: ["delivery_blocker", "approval_pending"], gate: "release" }), true);
  assert.equal(utils.matchesStateEntry({ kind: "legacy", text: "release review" }, { kind: "legacy" }), false);
  assert.equal(utils.matchesStateEntry(semantic, { gate: "release" }), false);
});

test("legacy command grammar consumes the whole input and binds commands to their owning subject", () => {
  const command = "wfc gate approve --work-item demo --gate release";
  const normalize = text => utils.normalizeProtocolReport({ work_item_slug: "demo", change_id: "CR-008", required_actions: [text] }).required_actions[0];
  for (const text of [command + "\n", command + " --write-root unrelated", "wfc work-item close --work-item demo --ref unrelated", command.replace("demo", "other")]) {
    assert.deepEqual(normalize(text), { kind: "legacy", text });
  }
  const approve = normalize("wfc work-item approve --work-item demo --reviewed-by <role>");
  assert.equal(approve.kind, "workflow_followup");
  assert.equal(approve.id, utils.createStateEntry({ collection: "required_actions", kind: "workflow_followup", sourceKey: "work-item-approval:demo", text: "Different display" }).id);
  const change = normalize("wfc change-item approve --change-id CR-008 --reviewed-by <role>");
  assert.equal(change.kind, "workflow_followup");
  assert.equal(change.id, utils.createStateEntry({ collection: "required_actions", kind: "workflow_followup", sourceKey: "change-approval:CR-008", text: "Different display" }).id);
  const foreign = "wfc change-item approve --change-id CR-009 --reviewed-by <role>";
  assert.deepEqual(normalize(foreign), { kind: "legacy", text: foreign });
});

test("renderer emits stable YAML flow mappings with normalized report collection equality", () => {
  const raw = report([entry, "Peer review is outstanding"], [{ id: "a2", kind: "workflow_followup", text: "line\nwith \"quotes\" and é" }]);
  const normalized = utils.normalizeProtocolReport(raw);
  const block = utils.renderProtocolBlock(raw);
  for (const key of ["blockers", "required_actions"]) {
    const lines = block.split("\n"), start = lines.indexOf(key + ":");
    const mappings = [];
    for (let i = start + 1; i < lines.length && lines[i].startsWith("  - "); i++) mappings.push(JSON.parse(lines[i].slice(4)));
    assert.deepEqual(mappings, normalized[key]);
  }
  assert.equal(utils.renderProtocolBlock(normalized), block, "rendering is byte-stable after normalization");
  assert.equal(block.includes("[object Object]"), false);
});

test("load-only adapter reads a legacy report without rewriting its bytes", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "rcr-state-read-"));
  const slug = "demo", item = path.join(dir, "work-items", slug);
  fs.mkdirSync(item, { recursive: true });
  const reportPath = path.join(item, slug + ".work-item-report.json");
  const bytes = Buffer.from(JSON.stringify({ work_item_slug: slug, blockers: [" Peer review remains outstanding "], required_actions: ["wfc work-item close --work-item demo"] }, null, 2) + "\n");
  fs.writeFileSync(reportPath, bytes);
  try {
    const loaded = utils.loadProtocolReport({ projectRoot: dir, workflowRootBase: path.join(dir, "work-items"), workItemSlug: slug });
    assert.deepEqual(loaded.report.blockers, [{ kind: "legacy", text: " Peer review remains outstanding " }]);
    assert.equal(loaded.report.required_actions[0].kind, "work_item_close");
    assert.deepEqual(fs.readFileSync(reportPath), bytes);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
