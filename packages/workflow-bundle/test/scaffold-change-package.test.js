const fs = require("fs");
const os = require("os");
const path = require("path");
const { scaffoldChangePackage } = require("../scripts/scaffold-change-package");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function rmrf(target) {
  try { fs.chmodSync(target, 0o755); } catch (_e) { /* ignore */ }
  try {
    for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
      const child = path.join(target, entry.name);
      if (entry.isDirectory()) rmrf(child);
      else { try { fs.chmodSync(child, 0o644); } catch (_e) { /* ignore */ } fs.rmSync(child, { force: true }); }
    }
  } catch (_e) { /* ignore */ }
  fs.rmSync(target, { recursive: true, force: true });
}

function buildProject() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "scaffold-cr-"));
  fs.mkdirSync(path.join(projectRoot, "changes"), { recursive: true });
  fs.mkdirSync(path.join(projectRoot, "work-items"), { recursive: true });
  return projectRoot;
}

function listFiles(dir) {
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md") || fs.statSync(path.join(dir, f)).isDirectory()).sort();
}

// ---------- Output: cr_profile compact/full + one-file CR request contract ----------

function testCompactScaffoldsOnlyRequestMd() {
  const projectRoot = buildProject();
  try {
    const result = scaffoldChangePackage({
      args: {
        "change-id": "CR-001",
        "cr-profile": "compact",
        "work-item": "add-export-button",
        "project-root": projectRoot,
        "change-root": path.join(projectRoot, "changes", "CR-001"),
        "request-summary": "add export button"
      }
    });
    assert(result.profile === "compact", `result.profile must be compact, got ${result.profile}`);
    const changeRoot = path.join(projectRoot, "changes", "CR-001");
    const files = listFiles(changeRoot);
    assert(files.length === 1 && files[0] === "request.md", `compact must create only request.md, got ${JSON.stringify(files)}`);
    const content = fs.readFileSync(path.join(changeRoot, "request.md"), "utf8");
    assert(/^cr_id: "CR-001"$/m.test(content), "request.md must have canonical cr_id");
    assert(/^cr_profile: compact$/m.test(content), "request.md must have cr_profile: compact");
    assert(/^cr_status: DRAFT$/m.test(content), "request.md must have cr_status: DRAFT");
    assert(/## Structured Delta/.test(content), "request.md must have ## Structured Delta section");
    assert(/## Aggregate Coverage/.test(content), "request.md must have ## Aggregate Coverage section");
    assert(/## Accepted Spec Version/.test(content), "request.md must have ## Accepted Spec Version section");
    console.log("  PASS: compact scaffolds only request.md with canonical contract");
  } finally {
    rmrf(projectRoot);
  }
}

function testFullScaffoldsSevenFiles() {
  const projectRoot = buildProject();
  try {
    const result = scaffoldChangePackage({
      args: {
        "change-id": "CHANGE-001",
        "work-item": "add-export-button",
        "project-root": projectRoot,
        "change-root": path.join(projectRoot, "changes", "CHANGE-001"),
        "request-summary": "legacy full"
      }
    });
    assert(result.profile === "full", `default profile must be full, got ${result.profile}`);
    const changeRoot = path.join(projectRoot, "changes", "CHANGE-001");
    // Full giữ 7-file package (AC-09: full CR giữ package hiện tại).
    assert(fs.existsSync(path.join(changeRoot, "proposal.md")), "full must scaffold proposal.md");
    assert(fs.existsSync(path.join(changeRoot, "design.md")), "full must scaffold design.md");
    assert(fs.existsSync(path.join(changeRoot, "archive-metadata.md")), "full must scaffold archive-metadata.md");
    assert(!fs.existsSync(path.join(changeRoot, "request.md")), "full must NOT create request.md");
    console.log("  PASS: full (default) scaffolds 7-file package, no request.md");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Output: compact eligibility violation escalates full (verification_hint) ----------

function testCompactEligibilityViolationEscalatesFull() {
  const projectRoot = buildProject();
  try {
    const result = scaffoldChangePackage({
      args: {
        "change-id": "CR-002",
        "cr-profile": "compact",
        "work-item": "migrate-customer-index",
        "project-root": projectRoot,
        "change-root": path.join(projectRoot, "changes", "CR-002"),
        "request-summary": "migrate customer index backfill"
      }
    });
    // Migration/backfill là hard trigger -> compact không đủ eligibility -> escalate full.
    assert(result.profile === "full", `migration request must escalate to full, got ${result.profile}`);
    assert(result.escalated === true, "escalation must be flagged");
    const changeRoot = path.join(projectRoot, "changes", "CR-002");
    assert(fs.existsSync(path.join(changeRoot, "proposal.md")), "escalated full must scaffold proposal.md");
    console.log("  PASS: compact eligibility violation (migration) escalates to full");
  } finally {
    rmrf(projectRoot);
  }
}

function testCompactEligibilityViolationPolicyToken() {
  const projectRoot = buildProject();
  try {
    const result = scaffoldChangePackage({
      args: {
        "change-id": "CR-003",
        "cr-profile": "compact",
        "project-root": projectRoot,
        "change-root": path.join(projectRoot, "changes", "CR-003"),
        "request-summary": "change public api contract policy"
      }
    });
    assert(result.profile === "full", `api/contract/policy token must escalate to full, got ${result.profile}`);
    console.log("  PASS: compact eligibility violation (api/contract/policy) escalates to full");
  } finally {
    rmrf(projectRoot);
  }
}

function testCompactHighRiskLevelEscalatesFull() {
  const projectRoot = buildProject();
  try {
    const result = scaffoldChangePackage({
      args: {
        "change-id": "CR-004",
        "cr-profile": "compact",
        "risk-level": "high",
        "project-root": projectRoot,
        "change-root": path.join(projectRoot, "changes", "CR-004"),
        "request-summary": "small delta"
      }
    });
    assert(result.profile === "full", `risk-level high must escalate to full, got ${result.profile}`);
    console.log("  PASS: compact + risk-level high escalates to full");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Output: dual-read/canonical-write — legacy input normalized cho compact ----------

function testCompactNormalizesLegacyChangeIdToCanonical() {
  const projectRoot = buildProject();
  try {
    const result = scaffoldChangePackage({
      args: {
        "change-id": "CHANGE-005",
        "cr-profile": "compact",
        "project-root": projectRoot,
        "change-root": path.join(projectRoot, "changes", "CHANGE-005"),
        "request-summary": "add export"
      }
    });
    // Compact canonical-write: dir + cr_id phải là CR-005.
    const canonicalRoot = path.join(projectRoot, "changes", "CR-005");
    assert(fs.existsSync(path.join(canonicalRoot, "request.md")), "compact must normalize CHANGE-005 -> CR-005 dir");
    const content = fs.readFileSync(path.join(canonicalRoot, "request.md"), "utf8");
    assert(/^cr_id: "CR-005"$/m.test(content), "request.md cr_id must be canonical CR-005");
    console.log("  PASS: compact normalizes legacy CHANGE-### -> canonical CR-###");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Review fix M3: explicit --change-root với canonical ID được tôn trọng ----------

function testCompactRespectsExplicitChangeRoot() {
  const projectRoot = buildProject();
  try {
    const customRoot = path.join(projectRoot, "my-changes", "custom-dir");
    const result = scaffoldChangePackage({
      args: {
        "change-id": "CR-010",
        "cr-profile": "compact",
        "project-root": projectRoot,
        "change-root": customRoot,
        "request-summary": "small delta"
      }
    });
    assert(
      result.changeRoot === customRoot,
      `explicit --change-root must be respected for compact, got ${result.changeRoot}`
    );
    assert(fs.existsSync(path.join(customRoot, "request.md")), "request.md must land in explicit change-root");
    console.log("  PASS: compact respects explicit --change-root");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Review fix M5: token inflections (plurals/gerunds) vẫn escalate ----------

function testCompactTokenInflectionsEscalate() {
  const inflected = [
    "run database migrations",
    "migrating user data",
    "update the apis",
    "renegotiate contracts",
    "apply retention policies"
  ];
  inflected.forEach((summary, idx) => {
    const projectRoot = buildProject();
    try {
      const result = scaffoldChangePackage({
        args: {
          "change-id": `CR-02${idx}`,
          "cr-profile": "compact",
          "project-root": projectRoot,
          "change-root": path.join(projectRoot, "changes", `CR-02${idx}`),
          "request-summary": summary
        }
      });
      assert(
        result.profile === "full" && result.escalated === true,
        `"${summary}" must escalate to full, got profile=${result.profile}`
      );
    } finally {
      rmrf(projectRoot);
    }
  });
  console.log("  PASS: token inflections (plurals/gerunds) escalate to full");
}

console.log("Running scaffold-change-package (compact CR) tests...\n");
testCompactScaffoldsOnlyRequestMd();
testFullScaffoldsSevenFiles();
testCompactEligibilityViolationEscalatesFull();
testCompactEligibilityViolationPolicyToken();
testCompactHighRiskLevelEscalatesFull();
testCompactNormalizesLegacyChangeIdToCanonical();
testCompactRespectsExplicitChangeRoot();
testCompactTokenInflectionsEscalate();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in scaffold-change-package-compact.test.js`);
  process.exit(1);
}
console.log("\nAll scaffold-change-package (compact CR) tests passed.");