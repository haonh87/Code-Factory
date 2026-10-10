const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// Known prose contracts only. Human EN/VI meaning review remains necessary.
// Fixtures and negative mutations stay in memory; no shell, network or writes.
const root = path.resolve(__dirname, "../../..");
const quote = value => "\x60" + value + "\x60";
const languages = {
  en: {
    step: "Step",
    noNote: /no separate \x60s05\x60 physical note/,
    hosted: /hosted inside \x60s06\x60/,
    nextAction: /Do not report \x60Missing Gates: s05\x60.*check the Approach content and receipt inside \x60s06\x60/,
    noReceipt: /do not check a separate \x60s05\x60 receipt/,
    foundation: /not supported for Light.*hard escalation.*full chain/,
    contract: /when present.*at \x60s04\x60/,
    inventedHost: /must have a separate \x60s05\x60 (?:note|receipt)/,
    evidence: /PASS if the approval is explicit and has enough evidence/,
    missing: /if \x60Missing Gates\x60 is not \x60NONE\x60/,
    waiting: /may only be \x60BLOCKED\x60 or \x60WAITING_APPROVAL\x60/
  },
  vi: {
    step: "Bước",
    noNote: /không có note vật lý riêng cho \x60s05\x60/,
    hosted: /được đặt trong \x60s06\x60/,
    nextAction: /Không báo \x60Missing Gates: s05\x60.*kiểm tra nội dung và receipt \x60Approach\x60 tại \x60s06\x60/,
    noReceipt: /không kiểm tra receipt riêng của \x60s05\x60/,
    foundation: /không được hỗ trợ trong Light.*hard escalation.*chain full/,
    contract: /khi có.*tại \x60s04\x60/,
    inventedHost: /phải có (?:note vật lý|receipt) riêng (?:cho|tại) \x60s05\x60/,
    evidence: /PASS nếu approval là explicit và có evidence đủ đọc/,
    missing: /nếu \x60Missing Gates\x60 khác \x60NONE\x60/,
    waiting: /chỉ được là \x60BLOCKED\x60 hoặc \x60WAITING_APPROVAL\x60/
  }
};
function section(text, lang, step) {
  const heading = "### " + languages[lang].step + " " + step + ":";
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex(line => line.startsWith(heading));
  assert.notEqual(start, -1, "Missing section: " + heading);
  const tail = lines.slice(start + 1);
  const end = tail.findIndex(line => /^#{1,3} /.test(line));
  return tail.slice(0, end < 0 ? undefined : end).join("\n");
}
function step3(text, lang) {
  for (let i = 1; i <= 8; i++) assert.ok(text.includes("- " + quote("s0" + i + " ").slice(0, -1)), "Logical step missing: s0" + i);
  const start = text.indexOf(quote("sdd_mode: light"));
  assert.notEqual(start, -1, "Step 3: missing Light host instruction");
  const light = text.slice(start).replace(/\s+/g, " ");
  for (const name of ["Option Analysis", "Brownfield Impact", "Technical Approach"]) assert.ok(light.includes(name), "Light content missing: " + name);
  for (const key of ["noNote", "hosted", "nextAction"]) assert.match(light, languages[lang][key], "Step 3: " + key);
  assert.doesNotMatch(light, languages[lang].inventedHost, "Invented Light s05 requirement");
}
function step4(text, lang) {
  const start = text.indexOf(quote("sdd_mode: light"));
  assert.notEqual(start, -1, "Step 4: missing Light gate mapping");
  const light = text.slice(start);
  const rows = light.split(/\r?\n/).filter(line => line.startsWith("- "));
  for (const [gate, host] of [["Spec", "s04"], ["DoR", "s04"], ["Approach", "s06"], ["Task Plan", "s06"]]) {
    const row = rows.find(line => line.includes(quote(gate)));
    assert.ok(row, "Required Light gate missing: " + gate);
    assert.ok(row.includes(quote(host)), "Wrong host for " + gate);
    assert.ok(!row.includes(quote(host === "s04" ? "s06" : "s04")), "Conflicting host for " + gate);
  }
  assert.match(light, languages[lang].noReceipt, "Separate s05 receipt must not be required");
  assert.match(rows.find(line => line.includes(quote("Foundation Decision"))) || "", languages[lang].foundation, "Foundation must escalate to full");
  assert.match(rows.find(line => line.includes(quote("Contract"))) || "", languages[lang].contract, "Conditional Contract must stay at s04");
  assert.doesNotMatch(light, languages[lang].inventedHost, "Invented Light s05 requirement");
}
let passed = 0, failed = 0, rejected = 0;
function check(name, run) {
  try { run(); passed++; console.log("PASS " + name); }
  catch (e) { failed++; console.error("FAIL " + name + ": " + e.message.split("\n")[0]); }
}
for (const lang of ["en", "vi"]) {
  const file = "skills/orchestration/workflow-governance-router/SKILL" + (lang === "vi" ? ".vi" : "") + ".md";
  const text = fs.readFileSync(path.join(root, file), "utf8");
  // Independent source checks: the original Step 3 failure must not hide Step 4.
  check(lang + " Step 3 source", () => step3(section(text, lang, 3), lang));
  check(lang + " Step 4 source", () => step4(section(text, lang, 4), lang));
  check(lang + " explicit approval and fail-closed status", () => {
    assert.match(section(text, lang, 4), languages[lang].evidence);
    const status = section(text, lang, 5);
    assert.match(status, languages[lang].missing);
    assert.match(status, languages[lang].waiting);
  });
}

// Independent corrected VI controls let mutations run even on the original RED.
const logicalSteps = Array.from({ length: 8 }, (_, i) => "- " + quote("s0" + (i + 1) + " Step")).join("\n");
const light3 = "Nếu note khai báo `sdd_mode: light`, không có note vật lý riêng cho `s05`: Option Analysis, Brownfield Impact, Technical Approach được đặt trong `s06`. Không báo `Missing Gates: s05`; kiểm tra nội dung và receipt `Approach` tại `s06`.";
const control3 = logicalSteps + "\n\n" + light3;
const control4 = [
  "Với `sdd_mode: light`, mỗi gate cần approval riêng:",
  "- `Spec` + `DoR` tại `s04`.",
  "- `Approach` + `Task Plan` tại `s06` (không kiểm tra receipt riêng của `s05`).",
  "- `Foundation Decision` không được hỗ trợ trong Light; cần hard escalation sang chain full.",
  "- `Contract`, khi có, áp dụng tại `s04`."
].join("\n");
check("VI Step 3 positive control", () => step3(control3, "vi"));
check("VI Step 4 positive control", () => step4(control4, "vi"));
check("CRLF controls", () => {
  step3(control3.replace(/\n/g, "\r\n"), "vi");
  step4(control4.replace(/\n/g, "\r\n"), "vi");
});
function mutation(name, validate, original, from, to) {
  check("reject " + name, () => {
    assert.ok(original.includes(from), "Mutation target missing");
    const changed = original.replace(from, to);
    assert.notEqual(changed, original, "Mutation made no change");
    assert.throws(() => validate(changed, "vi"), { name: "AssertionError" });
    rejected++;
  });
}
mutation("removed Step 3 Light paragraph", step3, control3, light3, "");
mutation("required separate s05 physical note", step3, control3, "không có note vật lý riêng", "phải có note vật lý riêng");
mutation("required separate s05 receipt", step4, control4, "không kiểm tra receipt riêng của `s05`", "phải có receipt riêng tại `s05`");
mutation("Spec/DoR moved to s06", step4, control4, "`Spec` + `DoR` tại `s04`", "`Spec` + `DoR` tại `s06`");
mutation("Approach/Task Plan moved to s05", step4, control4, "`Approach` + `Task Plan` tại `s06`", "`Approach` + `Task Plan` tại `s05`");
for (const gate of ["Spec", "DoR", "Approach", "Task Plan"]) mutation("missing " + gate, step4, control4, quote(gate), "(omitted)");
mutation("Foundation without full escalation", step4, control4, "không được hỗ trợ trong Light; cần hard escalation sang chain full", "được hỗ trợ trong Light");
mutation("dropped conditional Contract", step4, control4, "- `Contract`, khi có, áp dụng tại `s04`.", "");
mutation("unconditional Contract", step4, control4, "khi có", "luôn luôn");
mutation("removed Step 4 Light mapping", step4, control4, "`sdd_mode: light`", "(omitted)");
mutation("appended contradictory s05 requirement", step3, control3, light3, light3 + " Light phải có note vật lý riêng cho `s05`.");
for (let i = 1; i <= 8; i++) mutation("missing logical s0" + i, step3, control3, "- " + quote("s0" + i + " Step"), "");
console.log(`Light router checks: ${passed} passed, ${failed} failed; ${rejected} negative mutations rejected.`);
if (failed) process.exitCode = 1;
