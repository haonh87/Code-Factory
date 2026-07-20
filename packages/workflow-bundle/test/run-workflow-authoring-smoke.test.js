// T1 fix (review S4): golden Light baseline phải tồn tại trong authoring smoke.
// Case light-golden-budget scaffold sdd_mode=light thật và đo artifact/line budget
// trên output thật (không phải hằng số tự khớp). Test này khóa contract: case
// được export, được đăng ký trong case list, và chạy pass trên fixture riêng.

const fs = require("fs");
const os = require("os");
const path = require("path");
const smoke = require("../scripts/run-workflow-authoring-smoke");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function rmrfWritable(target) {
  if (!fs.existsSync(target)) {
    return;
  }
  // capability-control có thể set read-only; mở quyền trước khi xóa.
  const restore = (p) => {
    const stat = fs.lstatSync(p);
    if (stat.isSymbolicLink()) {
      return;
    }
    fs.chmodSync(p, stat.mode | 0o200);
    if (stat.isDirectory()) {
      fs.readdirSync(p).forEach((entry) => restore(path.join(p, entry)));
    }
  };
  restore(target);
  fs.rmSync(target, { recursive: true, force: true });
}

// ---------- Contract: case light-golden-budget được export ----------

function testLightGoldenCaseExported() {
  const before = failures;
  assert(
    typeof smoke.runCaseLightGoldenBudget === "function",
    "runCaseLightGoldenBudget must be exported from run-workflow-authoring-smoke"
  );
  if (failures === before) {
    console.log("  PASS: runCaseLightGoldenBudget exported");
  }
}

// ---------- Contract: case được đăng ký trong case list của main() ----------

function testLightGoldenCaseRegistered() {
  const before = failures;
  const source = fs.readFileSync(
    path.join(__dirname, "..", "scripts", "run-workflow-authoring-smoke.js"),
    "utf8"
  );
  assert(
    /name:\s*"light-golden-budget"/.test(source),
    "case list in main() must register 'light-golden-budget'"
  );
  if (failures === before) {
    console.log("  PASS: light-golden-budget registered in case list");
  }
}

// ---------- Behavior: golden case pass trên fixture thật ----------

function testLightGoldenCaseRuns() {
  if (typeof smoke.runCaseLightGoldenBudget !== "function") {
    failures += 1;
    console.error("  FAIL: cannot run golden case (not exported)");
    return;
  }
  const repoRoot = path.resolve(__dirname, "..");
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "light-golden-"));
  try {
    smoke.seedProjectContext(projectRoot);
    smoke.runCaseLightGoldenBudget(repoRoot, projectRoot);
    console.log("  PASS: light-golden-budget case runs green on fresh fixture");
  } catch (error) {
    failures += 1;
    console.error(`  FAIL: light-golden-budget case threw: ${error.message}`);
  } finally {
    rmrfWritable(projectRoot);
  }
}

console.log("Running authoring-smoke golden Light baseline tests...\n");
testLightGoldenCaseExported();
testLightGoldenCaseRegistered();
testLightGoldenCaseRuns();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in run-workflow-authoring-smoke.test.js`);
  process.exit(1);
}
console.log("\nAll authoring-smoke golden Light baseline tests passed.");
