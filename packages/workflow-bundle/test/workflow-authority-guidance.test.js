const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// Bounded static prose guards, not a natural-language engine or runtime gate test.
// Human EN/VI review remains necessary. All negative mutations stay in memory.
const root = path.resolve(__dirname, "../../..");
const quoted = value => "\x60" + value + "\x60";
const paths = {
  analysis: "skills/analysis/requirement-analysis/SKILL",
  chain: "skills/orchestration/codex-workflow-chain/SKILL",
  protocol: "skills/orchestration/codex-workflow-chain/references/work-item-protocol",
  dod: "skills/guardrails/definition-of-done-gate/SKILL"
};
const languages = {
  en: {
    scope: "Out of Scope", prerequisites: "Hard Rule: Spec/Design Before Code",
    human: "Hard Rule: Human-Controlled Gates", output: "Required Output",
    evaluation: "Evaluation Flow", decision: "Decision Rule",
    noWrite: /does not modify code/, readOnly: /Summary or analysis requests remain read-only even when/,
    all: /all applicable.*prerequisites.*human review/, draft: /draft artifact is not a passed gate/,
    full: /For full\/non-Light work items:/, light: /For \x60sdd_mode=light\x60:/,
    noS05: /no separate \x60s05\x60 physical note or receipt/,
    legacy: /only when.*legacyScaffoldPolicy=allow_readonly/,
    pending: /\x60approve\x60 may.*pending report.*before.*human/,
    noScaffold: /never treats the scaffold itself as approval/,
    advisory: /AI prepares an advisory assessment/,
    humanDod: /Only an authorized human QC reviewer can approve DoD/,
    receipt: /applicable trusted receipt and valid protocol transitions/,
    testsAlone: /Passing tests or an AI \x60DONE\x60 recommendation alone never closes/,
    recommend: /Recommend \x60DONE\x60, \x60PARTIAL\x60, or \x60BLOCKED\x60/,
    doneRule: /Recommend \x60DONE\x60 when every mandatory check passes/
  },
  vi: {
    scope: "Không Thuộc Phạm Vi", prerequisites: "Quy Tắc Cứng: Spec/Design Trước Code",
    human: "Quy Tắc Cứng: Human-Controlled Gates", output: "Đầu Ra Bắt Buộc",
    evaluation: "Luồng Đánh Giá", decision: "Quy Tắc Ra Quyết Định",
    noWrite: /không trực tiếp sửa code/, readOnly: /Yêu cầu tóm tắt hoặc phân tích luôn chỉ đọc, kể cả khi/,
    all: /tất cả.*điều kiện tiên quyết.*human review/, draft: /Artifact nháp không phải gate đã pass/,
    full: /Với work item full\/không dùng Light:/, light: /Với \x60sdd_mode=light\x60:/,
    noS05: /không có note vật lý hoặc receipt riêng tại \x60s05\x60/,
    legacy: /chỉ khi.*legacyScaffoldPolicy=allow_readonly/,
    pending: /\x60approve\x60 có thể.*report pending.*trước.*human/,
    noScaffold: /không bao giờ coi scaffold là approval/,
    advisory: /AI lập đánh giá đề xuất/,
    humanDod: /Chỉ human reviewer có thẩm quyền QC mới được approve DoD/,
    receipt: /trusted receipt tương ứng và các transition protocol hợp lệ/,
    testsAlone: /Test pass hoặc đề xuất \x60DONE\x60 của AI không tự đóng/,
    recommend: /Đề xuất \x60DONE\x60, \x60PARTIAL\x60 hoặc \x60BLOCKED\x60/,
    doneRule: /Đề xuất \x60DONE\x60 khi mọi check bắt buộc đạt/
  }
};
function section(text, title) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex(line => /^#{2,3} /.test(line) && line.replace(/^#+ /, "") === title);
  assert.notEqual(start, -1, "Missing section: " + title);
  const level = lines[start].match(/^#+/)[0].length;
  const rest = lines.slice(start + 1);
  const end = rest.findIndex(line => {
    const m = line.match(/^(#+) /);
    return m && m[1].length <= level;
  });
  return rest.slice(0, end < 0 ? undefined : end).join("\n");
}
function rule(text, pattern) {
  const result = text.split(/\r?\n/).find(line => pattern.test(line));
  assert.ok(result, "Missing rule: " + pattern);
  return result;
}
function command(text, name) {
  const marker = quoted(name) + ":";
  const start = text.indexOf(marker);
  assert.notEqual(start, -1, "Missing command contract: " + name);
  return text.slice(start + marker.length).split(/\n\x60wfc |\n### /)[0];
}
const hostMap = /full.*\x60s04\x60.*\x60s05\x60.*\x60s06\x60.*Light.*\x60s04\x60.*\x60s06\x60/i;
const validators = {
  analysis(text, l) {
    const s = section(text, l.scope);
    assert.doesNotMatch(s, /unless the user only asks|trừ khi người dùng chỉ yêu cầu/i, "Read-only exception grants edits");
    assert.match(s, l.noWrite, "Analysis must exclude code edits");
    assert.match(s, l.readOnly, "Clarity must preserve read-only scope");
  },
  chain(text, l) {
    const s = section(text, l.prerequisites);
    assert.match(s, l.all, "Every applicable prerequisite needs human review");
    assert.match(s, l.draft, "Drafts must not count as passed gates");
    const full = rule(s, l.full), light = rule(s, l.light);
    for (const step of ["s04", "s05", "s06"]) assert.ok(full.includes(quoted(step)), "Full prerequisite missing: " + step);
    for (const [step, gates] of [["s04", ["Spec", "DoR"]], ["s06", ["Approach", "Task Plan"]]]) {
      const host = light.split(quoted(step))[1];
      assert.ok(host, "Light host missing: " + step);
      for (const gate of gates) assert.ok(host.split(";")[0].includes(quoted(gate)), "Light gate missing: " + gate);
    }
    assert.match(s, l.noS05, "Light must not invent an s05 host/receipt");
    assert.match(rule(section(text, l.human), /^- \x60ACTIVE\x60/), hostMap, "ACTIVE must qualify full/Light hosts");
  },
  protocol(text, l) {
    const activate = section(text, quoted("activate"));
    assert.doesNotMatch(activate, /\x60s01\x60/, "Activation must not target s01");
    assert.match(activate, /\x60s07\x60/, "Activation goal must open s07");
    assert.match(activate, /current_step=s07/, "Activation output must remain s07");
    assert.match(section(text, quoted("materialize")), /\x60s01\x60/, "Materialize must begin authoring at s01");
    for (const h of ["ACTIVE", "MATERIALIZED -> ACTIVE"]) {
      assert.match(section(text, quoted(h)), hostMap, "Applicable hosts missing in " + h);
    }
    const intro = text.split(/^## (Scope|Phạm Vi)$/m)[0];
    assert.match(rule(intro, /^- \x60list\x60/), l.legacy, "Legacy read condition missing");
    assert.match(intro, l.pending, "Approve must allow pending bootstrap before human approval");
    assert.match(intro, l.noScaffold, "Scaffold itself must not imply approval");
    assert.match(command(text, "wfc work-item list|status"), l.legacy, "CLI legacy read condition missing");
    assert.match(command(text, "wfc work-item approve|reject|activate|block|resume|verify|close|archive|cancel|dispose-state"), l.pending, "CLI approve bootstrap missing");
    assert.ok(text.includes("- " + quoted("wfc work-item list")), "list must be documented as current");
    assert.ok(!section(text, "Target Extension").includes("wfc work-item list"), "list must not be future-only");
  },
  dod(text, l) {
    for (const key of ["advisory", "humanDod", "receipt", "testsAlone"]) assert.match(text, l[key], "DoD authority boundary: " + key);
    assert.match(section(text, l.evaluation), l.recommend, "Evaluation must recommend, not self-approve");
    assert.match(section(text, l.decision), l.doneRule, "DONE must remain a recommendation");
    const output = section(text, l.output).match(/\x60{3}yaml\n([\s\S]*?)\n\x60{3}/);
    assert.ok(output, "DoD output schema missing");
    assert.equal(output[1], schema, "DoD schema and six evidence checks must remain compatible");
  }
};
const schema = [
  'work_item_slug: ""', "status: DONE|PARTIAL|BLOCKED", "checks:",
  "  acceptance_criteria_evidenced: PASS|FAIL", "  implementation_recorded: PASS|FAIL",
  "  required_verification_completed: PASS|FAIL", "  code_scan_completed_or_justified: PASS|FAIL",
  "  traceability_complete: PASS|FAIL", "  residual_risks_documented: PASS|FAIL",
  "gaps: []", "residual_risks: []", "follow_up_items: []", 'next_action: ""'
].join("\n");
let failures = 0, passed = 0, mutations = 0;
function check(name, action) {
  try { action(); passed++; console.log("PASS " + name); return true; }
  catch (error) { failures++; console.error("FAIL " + name + ": " + error.message.split("\n")[0]); return false; }
}
for (const [lang, l] of Object.entries(languages)) {
  const docs = Object.fromEntries(Object.entries(paths).map(([key, file]) =>
    [key, fs.readFileSync(path.join(root, file + (lang === "vi" ? ".vi.md" : ".md")), "utf8")]));
  const good = {};
  for (const [key, validate] of Object.entries(validators)) {
    good[key] = check(lang + " / " + key + " source contract", () => validate(docs[key], l));
  }
  function mutate(key, name, from, to) {
    if (!good[key]) return; // Original RED is reported above; mutations need a passing source control.
    check(lang + " / " + name, () => {
      assert.ok(docs[key].includes(from), "Mutation target missing: " + from);
      assert.notEqual(from, to);
      assert.throws(() => validators[key](docs[key].replace(from, to), l), { name: "AssertionError" });
      mutations++;
    });
  }
  mutate("analysis", "old read-only exception", lang === "en" ? "does not modify code" : "không trực tiếp sửa code",
    lang === "en" ? "does not modify code, unless the user only asks for a summary/analysis" : "không trực tiếp sửa code, trừ khi người dùng chỉ yêu cầu tóm tắt/phân tích");
  mutate("analysis", "clarity grants writes", lang === "en" ? "requests remain read-only even when" : "luôn chỉ đọc, kể cả khi",
    lang === "en" ? "requests allow code edits when" : "cho phép sửa code khi");
  if (good.chain) {
    const s = section(docs.chain, l.prerequisites), full = rule(s, l.full), light = rule(s, l.light);
    const entry = rule(s, l.all);
    mutate("chain", "optional prerequisites", entry, entry.replace(lang === "en" ? "all applicable" : "tất cả",
      lang === "en" ? "any one of the applicable" : "một trong các"));
    for (const step of ["s04", "s05", "s06"]) mutate("chain", "full missing " + step, full, full.replace(quoted(step), "(omitted)"));
    for (const token of ["s04", "s06", "Spec", "DoR", "Approach", "Task Plan"]) mutate("chain", "Light missing " + token, light, light.replace(quoted(token), "(omitted)"));
    const active = rule(section(docs.chain, l.human), /^- \x60ACTIVE\x60/);
    mutate("chain", "unqualified ACTIVE hosts", active, "- " + quoted("ACTIVE") + ": " + quoted("s04") + ", " + quoted("s05") + ", " + quoted("s06"));
  }
  mutate("chain", "draft grants approval", lang === "en" ? "draft artifact is not a passed gate" : "Artifact nháp không phải gate đã pass",
    lang === "en" ? "draft artifact is a passed gate" : "Artifact nháp là gate đã pass");
  mutate("chain", "extra Light s05 host", lang === "en" ? "no separate " + quoted("s05") + " physical note or receipt" : "không có note vật lý hoặc receipt riêng tại " + quoted("s05"),
    lang === "en" ? "a required separate s05 physical note and receipt" : "phải có note vật lý và receipt riêng tại s05");
  if (good.protocol) {
    const active = section(docs.protocol, quoted("activate"));
    mutate("protocol", "activation at s01", active, active.replace(quoted("s07"), quoted("s01")));
    const read = rule(docs.protocol, /^- \x60list\x60/);
    mutate("protocol", "unconditional legacy read", read, read.replace("legacyScaffoldPolicy=allow_readonly", "legacyScaffoldPolicy=forbid"));
    const cli = command(docs.protocol, "wfc work-item list|status");
    mutate("protocol", "CLI legacy condition omitted", cli, cli.replace("legacyScaffoldPolicy=allow_readonly", "legacyScaffoldPolicy=forbid"));
  }
  mutate("protocol", "scaffold is approval", lang === "en" ? "never treats the scaffold itself as approval" : "không bao giờ coi scaffold là approval",
    lang === "en" ? "treats the scaffold itself as approval" : "coi scaffold là approval");
  mutate("protocol", "list future-only", "### Target Extension", "### Target Extension\n\n- " + quoted("wfc work-item list"));
  mutate("dod", "AI self-approval", lang === "en" ? "Only an authorized human QC reviewer can approve DoD" : "Chỉ human reviewer có thẩm quyền QC mới được approve DoD",
    lang === "en" ? "The AI can approve DoD" : "AI được approve DoD");
  mutate("dod", "unqualified evaluation", lang === "en" ? "Recommend " + quoted("DONE") + ", " + quoted("PARTIAL") + ", or " + quoted("BLOCKED") : "Đề xuất " + quoted("DONE") + ", " + quoted("PARTIAL") + " hoặc " + quoted("BLOCKED"),
    lang === "en" ? "Conclude DONE, PARTIAL or BLOCKED" : "Kết luận DONE, PARTIAL hoặc BLOCKED");
  mutate("dod", "evidence check removed", "  required_verification_completed: PASS|FAIL\n", "");
  mutate("dod", "schema enum drift", "status: DONE|PARTIAL|BLOCKED", "status: APPROVED|PARTIAL|BLOCKED");
}
console.log("Guidance checks: " + passed + " passed, " + failures + " failed; " + mutations + " negative mutations rejected.");
if (failures) process.exitCode = 1;
