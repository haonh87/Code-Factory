const fs = require("fs");
const crypto = require("crypto");
const os = require("os");
const path = require("path");
const {
  loadAdapter,
  listAvailableHarnesses,
  detectActiveHarness,
  getRuntimeConfigFromAdapter,
  normalizeInstallState,
  getManifestBundleVersion,
  getManifestCrSchemaVersion,
  getManifestWorkflowSchemaVersion,
  syncGlobalPolicy,
  syncProjectPolicy,
  syncSkills,
  syncSupportPolicies,
  writeInstallState,
  writeManagedSkillsManifest
} = require("../scripts/workflow-bundle-utils");

const repoRoot = path.resolve(__dirname, "..", "..", "..");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function assertThrows(fn, pattern, message) {
  try {
    fn();
    failures += 1;
    console.error(`  FAIL: ${message} (không throw)`);
  } catch (error) {
    if (!pattern.test(error.message)) {
      failures += 1;
      console.error(`  FAIL: ${message} (message không khớp: '${error.message}')`);
    }
  }
}

function assertDoesNotThrow(fn, message) {
  try {
    fn();
  } catch (error) {
    failures += 1;
    console.error(`  FAIL: ${message} (${error.code || error.message})`);
  }
}

function chmodTreeWritable(targetPath) {
  if (!fs.existsSync(targetPath)) {
    return;
  }

  const stat = fs.lstatSync(targetPath);
  fs.chmodSync(targetPath, stat.isDirectory() ? 0o755 : 0o644);
  if (stat.isDirectory()) {
    fs.readdirSync(targetPath).forEach((name) => chmodTreeWritable(path.join(targetPath, name)));
  }
}

function digestFile(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function makeTempAdapters(spec) {
  // spec: { harnessId: adapterObjectOrRawString }
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "wfc-adapter-test-"));
  for (const [id, adapter] of Object.entries(spec)) {
    const dir = path.join(root, "adapters", id);
    fs.mkdirSync(dir, { recursive: true });
    const body = typeof adapter === "string" ? adapter : JSON.stringify(adapter, null, 2);
    fs.writeFileSync(path.join(dir, "adapter.json"), body);
  }
  return root;
}

function minimalAdapter(id, overrides) {
  return Object.assign(
    {
      harnessId: id,
      harnessLabel: id.toUpperCase(),
      version: "1",
      detection: { homeDirMarker: `.${id}-khong-ton-tai`, envVar: `WFC_TEST_${id.toUpperCase()}_HOME`, defaultHomeDir: `.${id}-khong-ton-tai` },
      naming: { globalAgentsFileName: `${id}.md` },
      content: { globalAgentsSourceRel: `policies/${id}/g.md`, skillsSourceRootRel: "skills", supportPoliciesSourceRootRel: `policies/${id}` }
    },
    overrides || {}
  );
}

// ---------- T-2: characterization — loadAdapter ----------

function testLoadAdapterValid() {
  const adapter = loadAdapter("codex", repoRoot);
  assert(adapter.harnessId === "codex", "loadAdapter codex trả đúng harnessId");
  assert(adapter.detection && adapter.naming && adapter.content, "adapter codex có đủ detection/naming/content");
  const claude = loadAdapter("claude", repoRoot);
  assert(claude.runtime && claude.runtime.installStateHomeKey === "claude_home", "adapter claude có installStateHomeKey=claude_home");
  console.log("  PASS: loadAdapter hợp lệ cho codex + claude");
}

function testLoadAdapterErrors() {
  assertThrows(() => loadAdapter("khong-ton-tai", repoRoot), /Adapter not found/, "loadAdapter thiếu adapter phải throw 'Adapter not found'");
  assertThrows(() => loadAdapter("", repoRoot), /Invalid harnessId/, "loadAdapter harnessId rỗng phải throw");

  const brokenRoot = makeTempAdapters({ hong: "{not-json" });
  assertThrows(() => loadAdapter("hong", brokenRoot), /JSON|Unexpected/, "loadAdapter JSON hỏng phải throw parse error");

  const mismatchRoot = makeTempAdapters({ sai: minimalAdapter("khac") });
  assertThrows(() => loadAdapter("sai", mismatchRoot), /mismatch/, "loadAdapter harnessId mismatch phải throw");

  const thieuRoot = makeTempAdapters({ thieu: { harnessId: "thieu" } });
  assertThrows(() => loadAdapter("thieu", thieuRoot), /missing required sections/, "loadAdapter thiếu section phải throw");
  console.log("  PASS: loadAdapter error paths (not-found, invalid id, JSON hỏng, mismatch, thiếu section)");
}

// ---------- T-2: characterization — listAvailableHarnesses ----------

function testListHarnesses() {
  const list = listAvailableHarnesses(repoRoot);
  const ids = list.map((h) => h.harnessId);
  assert(JSON.stringify(ids) === JSON.stringify(["claude", "codex"]), `repo trả [claude, codex] sorted, got ${JSON.stringify(ids)}`);

  assert(listAvailableHarnesses(path.join(os.tmpdir(), "khong-ton-tai-root")).length === 0, "không có adapters/ -> []");

  // T-4 edge: adapter hỏng bị bỏ qua im lặng, adapter tốt vẫn được liệt kê
  const mixedRoot = makeTempAdapters({ tot: minimalAdapter("tot"), hong: "{broken" });
  const mixed = listAvailableHarnesses(mixedRoot).map((h) => h.harnessId);
  assert(JSON.stringify(mixed) === JSON.stringify(["hong", "tot"]) || JSON.stringify(mixed) === JSON.stringify(["tot"]),
    `adapter hỏng: skip im lặng khi parse fail, got ${JSON.stringify(mixed)}`);
  // Hành vi hiện tại: parse fail -> skip; ghi nhận chính xác:
  assert(JSON.stringify(mixed) === JSON.stringify(["tot"]), `chỉ adapter parse được mới được liệt kê, got ${JSON.stringify(mixed)}`);
  console.log("  PASS: listAvailableHarnesses (sorted, adapters/ vắng, adapter hỏng skip im lặng)");
}

// ---------- T-2 + T-4: detectActiveHarness ----------

function testDetectExplicitAndFallback() {
  assert(detectActiveHarness(repoRoot, "CLAUDE") === "claude", "explicit mode được lowercase + chấp nhận");
  assertThrows(() => detectActiveHarness(repoRoot, "gemini"), /Invalid mode/, "explicit mode không có adapter phải throw 'Invalid mode'");
  assert(detectActiveHarness(path.join(os.tmpdir(), "khong-ton-tai-root"), "") === "codex", "không có adapters/ -> default codex (backward compat)");
  console.log("  PASS: detectActiveHarness explicit + fallback codex");
}

function testDetectByEnvAndAmbiguity() {
  const root = makeTempAdapters({ alpha: minimalAdapter("alpha"), beta: minimalAdapter("beta") });
  const envA = "WFC_TEST_ALPHA_HOME";
  const envB = "WFC_TEST_BETA_HOME";
  const saved = { a: process.env[envA], b: process.env[envB] };
  try {
    delete process.env[envA];
    delete process.env[envB];
    assert(detectActiveHarness(root, "") === "codex", "0 harness detect được -> default codex");

    process.env[envA] = "/tmp/x";
    assert(detectActiveHarness(root, "") === "alpha", "1 harness detect qua envVar -> trả harness đó");

    process.env[envB] = "/tmp/y";
    if (process.stdin.isTTY) {
      assert(detectActiveHarness(root, "") === null, "nhiều harness + TTY -> null (caller prompt)");
    } else {
      assertThrows(() => detectActiveHarness(root, ""), /Multiple harnesses detected.*--mode/, "nhiều harness + non-TTY -> throw có hướng dẫn --mode");
    }
  } finally {
    if (saved.a === undefined) delete process.env[envA]; else process.env[envA] = saved.a;
    if (saved.b === undefined) delete process.env[envB]; else process.env[envB] = saved.b;
  }
  console.log("  PASS: detectActiveHarness env detection + ambiguity (0/1/nhiều)");
}

// ---------- T-2 + T-5: getRuntimeConfigFromAdapter (fixture new-format, SCOPE-A) ----------

function testRuntimeConfigFromAdapter() {
  const adapter = loadAdapter("claude", repoRoot);
  const manifestNewFormat = {
    bundleName: "codex-workflow-bundle",
    bundleVersion: "2.2.0",
    content: { globalAgentsSource: "policies/manifest-level.md" },
    harnesses: ["codex", "claude"]
  };
  const config = getRuntimeConfigFromAdapter(manifestNewFormat, adapter);
  assert(config.globalAgentsSource === adapter.content.globalAgentsSourceRel,
    "adapter.content thắng manifest.content khi cả hai có");
  assert(config.globalAgentsFileName === "CLAUDE.md", "naming từ adapter claude map đúng globalAgentsFileName");
  assert(config.agentsManifestFileName === null, "claude agentsManifestFileName=null giữ nguyên");

  const adapterKhongContent = minimalAdapter("x");
  delete adapterKhongContent.content.globalAgentsSourceRel;
  const config2 = getRuntimeConfigFromAdapter(manifestNewFormat, adapterKhongContent);
  assert(config2.globalAgentsSource === "policies/manifest-level.md", "fallback manifest.content khi adapter thiếu field");
  console.log("  PASS: getRuntimeConfigFromAdapter (fixture new-format; precedence adapter > manifest)");
}

// ---------- T-3: bug repro — normalizeInstallState phải tôn trọng context.repoRoot ----------

function testNormalizeInstallStateRespectsRepoRoot() {
  const customRoot = makeTempAdapters({
    codex: minimalAdapter("codex", { runtime: { installStateHomeKey: "custom_home" } })
  });
  const normalized = normalizeInstallState({}, {
    manifest: { bundleName: "codex-workflow-bundle" },
    repoRoot: customRoot,
    runtimeHome: "/tmp/wfc-test-home",
    mode: "codex"
  });
  assert(
    normalized.custom_home === "/tmp/wfc-test-home",
    `normalizeInstallState phải load adapter từ context.repoRoot (kỳ vọng custom_home='/tmp/wfc-test-home', got '${normalized.custom_home}')`
  );
  console.log("  PASS: normalizeInstallState tôn trọng context.repoRoot");
}

// ---------- R1: manifest schema-version readers (AC-14 contract surface) ----------

function testReadsSchemaVersions() {
  const manifest = {
    bundleName: "codex-workflow-bundle",
    bundleVersion: "2.1.1",
    workflowSchemaVersion: "2026-07-light-1",
    crSchemaVersion: "2026-07-cr-1"
  };
  assert(
    getManifestWorkflowSchemaVersion(manifest) === "2026-07-light-1",
    `reads workflowSchemaVersion, got '${getManifestWorkflowSchemaVersion(manifest)}'`
  );
  assert(
    getManifestCrSchemaVersion(manifest) === "2026-07-cr-1",
    `reads crSchemaVersion, got '${getManifestCrSchemaVersion(manifest)}'`
  );
  // Existing bundle version reader vẫn hoạt động (no regression).
  assert(getManifestBundleVersion(manifest) === "2.1.1", "getManifestBundleVersion still works");
  console.log("  PASS: manifest schema-version readers return declared values");
}

function testAbsentSchemaVersionsDefaultEmpty() {
  assert(getManifestWorkflowSchemaVersion({}) === "", "absent workflowSchemaVersion must default to empty string");
  assert(getManifestCrSchemaVersion({}) === "", "absent crSchemaVersion must default to empty string");
  assert(getManifestWorkflowSchemaVersion(null) === "", "null manifest must default to empty string");
  assert(getManifestCrSchemaVersion(undefined) === "", "undefined manifest must default to empty string");
  console.log("  PASS: absent schema versions default to empty string (no crash on null/undefined)");
}

// ---------- CHANGE-002 / AC-001: hardened managed destinations are updateable ----------

function testHardenedManagedDestinationsRecoverWithoutTouchingUnmanagedFiles() {
  if (process.platform === "win32") {
    console.log("  SKIP: POSIX permission lifecycle fixture on win32");
    return;
  }

  const base = fs.mkdtempSync(path.join(os.tmpdir(), "wfc-hardened-update-"));
  try {
    const sourceSkill = path.join(base, "source-skill");
    const runtimeHome = path.join(base, "runtime-home");
    const skillsHome = path.join(runtimeHome, "skills");
    const managedSkill = path.join(skillsHome, "managed-skill");
    const unmanagedFile = path.join(skillsHome, "unmanaged.keep");
    const globalSource = path.join(base, "AGENTS.source.md");
    const globalDest = path.join(runtimeHome, "AGENTS.md");
    const projectRoot = path.join(base, "project");
    const projectDest = path.join(projectRoot, "AGENTS.md");
    const supportSource = path.join(base, "support-source");
    const supportDest = path.join(runtimeHome, "policies");

    fs.mkdirSync(path.join(sourceSkill, "references"), { recursive: true });
    fs.writeFileSync(path.join(sourceSkill, "SKILL.md"), "new skill\n");
    fs.writeFileSync(path.join(sourceSkill, "references", "contract.md"), "new contract\n");
    fs.mkdirSync(path.join(managedSkill, "references"), { recursive: true });
    fs.writeFileSync(path.join(managedSkill, "SKILL.md"), "old skill\n");
    fs.writeFileSync(path.join(managedSkill, "references", "contract.md"), "old contract\n");
    fs.writeFileSync(unmanagedFile, "user owned\n");
    fs.writeFileSync(globalSource, "new policy\n");
    fs.writeFileSync(globalDest, "old policy\n");
    fs.mkdirSync(projectRoot, { recursive: true });
    fs.writeFileSync(projectDest, "old project policy\n");
    fs.mkdirSync(supportSource, { recursive: true });
    fs.writeFileSync(path.join(supportSource, "rule.md"), "new rule\n");
    fs.mkdirSync(supportDest, { recursive: true });
    fs.writeFileSync(path.join(supportDest, "rule.md"), "old rule\n");

    const bundlePaths = {
      managedSkillsManifestPath: path.join(runtimeHome, ".managed.txt"),
      legacyManagedSkillsManifestPath: path.join(runtimeHome, ".legacy-managed.txt"),
      installStatePath: path.join(runtimeHome, ".state.json"),
      legacyInstallStatePath: path.join(runtimeHome, ".legacy-state.json")
    };
    fs.writeFileSync(bundlePaths.managedSkillsManifestPath, "managed-skill\n");
    fs.writeFileSync(bundlePaths.installStatePath, "{}\n");

    [
      path.join(managedSkill, "SKILL.md"),
      path.join(managedSkill, "references", "contract.md"),
      globalDest,
      projectDest,
      path.join(supportDest, "rule.md"),
      bundlePaths.managedSkillsManifestPath,
      bundlePaths.installStatePath
    ].forEach((filePath) => fs.chmodSync(filePath, 0o444));
    [path.join(managedSkill, "references"), managedSkill, skillsHome, supportDest, runtimeHome, projectRoot]
      .forEach((dirPath) => fs.chmodSync(dirPath, 0o555));
    fs.chmodSync(unmanagedFile, 0o440);
    const unmanagedBefore = {
      digest: digestFile(unmanagedFile),
      mode: fs.statSync(unmanagedFile).mode & 0o777
    };

    assertDoesNotThrow(
      () => syncSkills({
        selectedSkillNames: ["managed-skill"],
        availableSkills: [{ name: "managed-skill", sourceDir: sourceSkill }],
        skillsHome,
        previousManagedSkills: ["managed-skill"]
      }),
      "syncSkills must recover owner-write on the selected managed skill"
    );
    assertDoesNotThrow(
      () => writeManagedSkillsManifest(bundlePaths, ["managed-skill"]),
      "managed-skills manifest must be replaceable after hardening"
    );
    assertDoesNotThrow(
      () => syncSupportPolicies({ supportPoliciesSourceRoot: supportSource, supportPoliciesDestRoot: supportDest }),
      "managed support policies must be replaceable after hardening"
    );
    assertDoesNotThrow(
      () => syncGlobalPolicy({ globalAgentsSource: globalSource, globalAgentsDest: globalDest }),
      "global managed policy must be replaceable after hardening"
    );
    assertDoesNotThrow(
      () => syncProjectPolicy({ globalAgentsSource: globalSource, projectRoot, projectAgentsFileName: "AGENTS.md" }),
      "project managed policy must be replaceable after hardening"
    );
    assertDoesNotThrow(
      () => writeInstallState(bundlePaths, { runtime_mode: "codex" }, {
        manifest: { bundleName: "fixture" },
        repoRoot,
        runtimeHome,
        mode: "codex"
      }),
      "install state must be replaceable after hardening"
    );

    assert(fs.readFileSync(path.join(managedSkill, "SKILL.md"), "utf8") === "new skill\n", "managed skill content updated");
    assert(fs.readFileSync(globalDest, "utf8") === "new policy\n", "global policy content updated");
    assert(fs.readFileSync(projectDest, "utf8") === "new policy\n", "project policy content updated");
    assert(fs.readFileSync(path.join(supportDest, "rule.md"), "utf8") === "new rule\n", "support policy content updated");
    assert(digestFile(unmanagedFile) === unmanagedBefore.digest, "unmanaged file digest remains unchanged");
    assert((fs.statSync(unmanagedFile).mode & 0o777) === unmanagedBefore.mode, "unmanaged file mode remains unchanged");
    console.log("  PASS: hardened managed destinations recover without mutating unmanaged content or mode");
  } finally {
    chmodTreeWritable(base);
    fs.rmSync(base, { recursive: true, force: true });
  }
}

function testManagedWriteRefusesSymbolicLinkTargets() {
  if (process.platform === "win32") {
    console.log("  SKIP: symbolic-link managed target fixture on win32");
    return;
  }
  const base = fs.mkdtempSync(path.join(os.tmpdir(), "wfc-managed-symlink-"));
  try {
    const source = path.join(base, "source.md");
    const outside = path.join(base, "outside.md");
    const destination = path.join(base, "managed.md");
    fs.writeFileSync(source, "replacement\n");
    fs.writeFileSync(outside, "outside\n");
    fs.symlinkSync(outside, destination);
    assertThrows(
      () => syncGlobalPolicy({ globalAgentsSource: source, globalAgentsDest: destination }),
      /Refusing to prepare managed symbolic link/,
      "managed writes must not follow a symbolic-link destination"
    );
    assert(fs.readFileSync(outside, "utf8") === "outside\n", "symbolic-link target remains unchanged");
    console.log("  PASS: managed write refuses symbolic-link targets");
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
}

function testManagedSkillCleanupRejectsPathTraversal() {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), "wfc-managed-traversal-"));
  try {
    const skillsHome = path.join(base, "runtime", "skills");
    const outside = path.join(base, "outside.keep");
    fs.mkdirSync(skillsHome, { recursive: true });
    fs.writeFileSync(outside, "user-owned outside managed skills\n", "utf8");
    const outsideDigest = digestFile(outside);
    assertThrows(
      () => syncSkills({
        selectedSkillNames: [],
        availableSkills: [],
        skillsHome,
        previousManagedSkills: ["../../outside.keep"]
      }),
      /Invalid managed skill name/,
      "managed cleanup must reject path traversal from a tampered manifest"
    );
    assert(fs.existsSync(outside), "path traversal target must remain present");
    if (fs.existsSync(outside)) {
      assert(digestFile(outside) === outsideDigest, "path traversal target content must remain unchanged");
    }
    console.log("  PASS: managed skill cleanup rejects path traversal");
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
}

console.log("Running workflow-bundle adapter tests...\n");
testLoadAdapterValid();
testLoadAdapterErrors();
testListHarnesses();
testDetectExplicitAndFallback();
testDetectByEnvAndAmbiguity();
testRuntimeConfigFromAdapter();
testNormalizeInstallStateRespectsRepoRoot();
testReadsSchemaVersions();
testAbsentSchemaVersionsDefaultEmpty();
testHardenedManagedDestinationsRecoverWithoutTouchingUnmanagedFiles();
testManagedWriteRefusesSymbolicLinkTargets();
testManagedSkillCleanupRejectsPathTraversal();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in workflow-bundle-utils.test.js`);
  process.exit(1);
}
console.log("\nOK: workflow-bundle-utils.test.js passed");
