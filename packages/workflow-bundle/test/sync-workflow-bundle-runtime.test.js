const fs = require("fs");
const os = require("os");
const path = require("path");
const { copyDirectory } = require("../scripts/sync-workflow-bundle-runtime");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

// ---------- AC-5: copyDirectory chmod behavior là chủ đích (644 file / 755 dir) ----------
// Chốt từ s05: source policy files có thể read-only; runtime copy phải writable.
// 644-flat là hành vi chủ đích (0 skill file trong repo có executable bit — đo 2026-07-20).

function testCopyDirectoryNormalizesPermissions() {
  assert(typeof copyDirectory === "function", "copyDirectory phải được export để test hành vi chmod");
  if (typeof copyDirectory !== "function") {
    return;
  }

  const base = fs.mkdtempSync(path.join(os.tmpdir(), "wfc-sync-test-"));
  const src = path.join(base, "src");
  fs.mkdirSync(path.join(src, "nested"), { recursive: true });
  fs.writeFileSync(path.join(src, "readonly.md"), "x");
  fs.chmodSync(path.join(src, "readonly.md"), 0o444); // read-only source
  fs.writeFileSync(path.join(src, "nested", "exec.sh"), "#!/bin/sh\n");
  fs.chmodSync(path.join(src, "nested", "exec.sh"), 0o755); // executable source

  const dest = path.join(base, "dest");
  copyDirectory(src, dest);

  const modeOf = (p) => (fs.statSync(p).mode & 0o777).toString(8);
  assert(modeOf(path.join(dest, "readonly.md")) === "644", `file read-only source -> dest 644 writable, got ${modeOf(path.join(dest, "readonly.md"))}`);
  assert(modeOf(path.join(dest, "nested", "exec.sh")) === "644", `file executable source -> dest 644 (644-flat là chủ đích), got ${modeOf(path.join(dest, "nested", "exec.sh"))}`);
  assert(modeOf(dest) === "755", `dir dest 755, got ${modeOf(dest)}`);
  assert(modeOf(path.join(dest, "nested")) === "755", `nested dir 755, got ${modeOf(path.join(dest, "nested"))}`);
  console.log("  PASS: copyDirectory chuẩn hóa quyền 644/755 (read-only source thành writable)");
}

console.log("Running sync-workflow-bundle-runtime (copy permissions) tests...\n");
testCopyDirectoryNormalizesPermissions();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in sync-workflow-bundle-runtime.test.js`);
  process.exit(1);
}
console.log("\nOK: sync-workflow-bundle-runtime.test.js passed");
