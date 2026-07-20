const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  loadAdapter,
  listAvailableHarnesses,
  detectActiveHarness,
  getRuntimeConfigFromAdapter,
  normalizeInstallState
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

console.log("Running workflow-bundle adapter tests...\n");
testLoadAdapterValid();
testLoadAdapterErrors();
testListHarnesses();
testDetectExplicitAndFallback();
testDetectByEnvAndAmbiguity();
testRuntimeConfigFromAdapter();
testNormalizeInstallStateRespectsRepoRoot();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in workflow-bundle-utils.test.js`);
  process.exit(1);
}
console.log("\nOK: workflow-bundle-utils.test.js passed");
