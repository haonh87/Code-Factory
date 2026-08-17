const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  ROUTER_HARDSTOP_SNIPPET,
  NEXT_HUMAN_ACTION_SNIPPET,
  QR_VOUCHER_SNIPPET,
  runHardenedUpdateMatrix
} = require("../scripts/run-workflow-bundle-smoke");

const repoRoot = path.resolve(__dirname, "..", "..", "..");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

// ---------- Regression guard: smoke assertions must stay in sync with source content ----------
// The smoke test hardcodes snippets it expects to find in the installed global policy and
// codex-workflow-chain skill. If those source files are edited (e.g. re-translated) without
// updating the snippet constants, bundle-smoke fails with a confusing "Expected installed
// global AGENTS to hard-stop..." error far from the actual root cause. This test catches that
// drift directly against the SOURCE files, before install/sync is even involved.

function testRouterHardstopSnippetPresentInSource() {
  const agentsGlobal = fs.readFileSync(path.join(repoRoot, "policies/codex/AGENTS.global.md"), "utf8");
  assert(
    agentsGlobal.includes(ROUTER_HARDSTOP_SNIPPET),
    `policies/codex/AGENTS.global.md must contain ROUTER_HARDSTOP_SNIPPET ('${ROUTER_HARDSTOP_SNIPPET}')`
  );
  assert(
    agentsGlobal.includes(NEXT_HUMAN_ACTION_SNIPPET),
    `policies/codex/AGENTS.global.md must contain NEXT_HUMAN_ACTION_SNIPPET ('${NEXT_HUMAN_ACTION_SNIPPET}')`
  );

  const skillMd = fs.readFileSync(
    path.join(repoRoot, "skills/orchestration/codex-workflow-chain/SKILL.md"),
    "utf8"
  );
  assert(
    skillMd.includes(ROUTER_HARDSTOP_SNIPPET),
    `skills/orchestration/codex-workflow-chain/SKILL.md must contain ROUTER_HARDSTOP_SNIPPET`
  );
  assert(
    skillMd.includes(QR_VOUCHER_SNIPPET),
    `skills/orchestration/codex-workflow-chain/SKILL.md must retain the greenfield QR Voucher hard-stop example`
  );
  console.log("  PASS: router hard-stop + QR Voucher snippets present in source policy/skill files");
}

function testHardenedUpdateMatrix() {
  assert(typeof runHardenedUpdateMatrix === "function", "hardened Codex/Claude x global/project matrix helper must be exported");
  if (typeof runHardenedUpdateMatrix !== "function" || process.platform === "win32") {
    return;
  }

  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "wfc-hardened-matrix-"));
  try {
    const results = runHardenedUpdateMatrix({
      wfcBin: path.join(repoRoot, "packages", "workflow-bundle", "bin", "wfc.js"),
      tempRoot
    });
    assert(results.length === 4, `expected 4 hardened update scenarios, got ${results.length}`);
    assert(results.every((result) => result.exit_ok), "all hardened update scenarios exit without EACCES");
    assert(results.every((result) => result.unmanaged_unchanged), "all unmanaged content and mode snapshots remain unchanged");
    console.log("  PASS: hardened Codex/Claude x global/project update matrix");
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

console.log("Running run-workflow-bundle-smoke (source snippet sync) tests...\n");
testRouterHardstopSnippetPresentInSource();
testHardenedUpdateMatrix();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in run-workflow-bundle-smoke.test.js`);
  process.exit(1);
}
console.log("\nOK: run-workflow-bundle-smoke.test.js passed");
