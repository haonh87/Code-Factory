#!/usr/bin/env node
// Unit-test runner cho workflow-bundle: chạy mọi test/*.test.js trong package.
// Mỗi file .test.js tự assert và exit 1 khi fail; runner tổng hợp exit code.
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const testDir = __dirname;

const testFiles = fs
  .readdirSync(testDir)
  .filter((name) => name.endsWith(".test.js") && name !== path.basename(__filename))
  .sort();

if (testFiles.length === 0) {
  console.error("No .test.js files found under", testDir);
  process.exit(1);
}

const failures = [];

testFiles.forEach((file) => {
  const result = spawnSync(process.execPath, [path.join(testDir, file)], {
    stdio: "inherit"
  });
  if (result.status !== 0) {
    failures.push(file);
  }
});

if (failures.length > 0) {
  console.error(`\n${failures.length} unit test file(s) failed: ${failures.join(", ")}`);
  process.exit(1);
}

console.log(`\nOK: ${testFiles.length} workflow-bundle unit test file(s) passed`);