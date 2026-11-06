const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const {
  syncProjectPolicy,
  syncGlobalPolicy,
} = require("../scripts/workflow-bundle-utils");
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "wfc-context-"));
  t.after(() => {
    (function writable(p) {
      if (!fs.existsSync(p)) return;
      const st = fs.lstatSync(p);
      if (st.isDirectory()) {
        fs.chmodSync(p, 0o755);
        for (const n of fs.readdirSync(p)) writable(path.join(p, n));
      }
    })(root);
    fs.rmSync(root, { recursive: true, force: true });
  });
  const source = path.join(root, "policy.md");
  fs.writeFileSync(source, "# Workflow\nHuman gates apply.\n");
  return { root, source, project: path.join(root, "project") };
}
test("project upgrade preserves user instructions and installs bounded project context entrypoint", (t) => {
  const { source, project } = fixture(t);
  fs.mkdirSync(project);
  fs.writeFileSync(
    path.join(project, "AGENTS.md"),
    "# Local rules\nUse uv; mask PII.\n",
  );
  const run = () =>
    syncProjectPolicy({
      globalAgentsSource: source,
      projectRoot: project,
      projectAgentsFileName: "AGENTS.md",
    });
  run();
  const content = fs.readFileSync(path.join(project, "AGENTS.md"), "utf8");
  assert.ok(content.startsWith("# Local rules\nUse uv; mask PII.\n"));
  assert.match(content, /project-context\/project-context.md/);
  assert.match(content, /context.cjs/);
  run();
  assert.equal(
    fs.readFileSync(path.join(project, "AGENTS.md"), "utf8"),
    content,
  );
});
test("global Codex has a native AGENTS entrypoint while retaining legacy policy", (t) => {
  const { source, root } = fixture(t);
  const home = path.join(root, "home");
  fs.mkdirSync(home);
  fs.writeFileSync(path.join(home, "AGENTS.md"), "My user policy\n");
  syncGlobalPolicy({
    globalAgentsSource: source,
    globalAgentsDest: path.join(home, "AGENTS.global.md"),
  });
  assert.match(
    fs.readFileSync(path.join(home, "AGENTS.md"), "utf8"),
    /Code Factory/,
  );
  assert.ok(
    fs
      .readFileSync(path.join(home, "AGENTS.md"), "utf8")
      .startsWith("My user policy\n"),
  );
});
test("malformed managed markers fail before changing user bytes", (t) => {
  const { source, project } = fixture(t);
  fs.mkdirSync(project);
  const file = path.join(project, "AGENTS.md");
  const original = "<!-- code-factory:begin -->\nUser changed markers\n";
  fs.writeFileSync(file, original);
  assert.throws(
    () =>
      syncProjectPolicy({
        globalAgentsSource: source,
        projectRoot: project,
        projectAgentsFileName: "AGENTS.md",
      }),
    /marker|conflict/i,
  );
  assert.equal(fs.readFileSync(file, "utf8"), original);
});
test("project destination symlink cannot overwrite outside instruction file", (t) => {
  const { source, project, root } = fixture(t);
  fs.mkdirSync(project);
  const other = path.join(root, "outside.md");
  fs.writeFileSync(other, "outside unchanged");
  fs.symlinkSync(other, path.join(project, "AGENTS.md"));
  assert.throws(
    () =>
      syncProjectPolicy({
        globalAgentsSource: source,
        projectRoot: project,
        projectAgentsFileName: "AGENTS.md",
      }),
    /symlink|symbolic link|contain/i,
  );
  assert.equal(fs.readFileSync(other, "utf8"), "outside unchanged");
});
const { execFileSync } = require("node:child_process");
function brief(project, args = []) {
  return JSON.parse(
    execFileSync(
      process.execPath,
      [
        path.join(project, ".codex/code-factory/context.cjs"),
        "--project-root",
        project,
        ...args,
      ],
      { encoding: "utf8" },
    ),
  );
}
function installed(t) {
  const f = fixture(t);
  fs.mkdirSync(f.project);
  fs.mkdirSync(path.join(f.project, "project-context"));
  fs.writeFileSync(
    path.join(f.project, "project-context/project-context.md"),
    "# Masked support tools\nPurpose: investigate masked UAT logs.\nTests: make check\n",
  );
  syncProjectPolicy({
    globalAgentsSource: f.source,
    projectRoot: f.project,
    projectAgentsFileName: "AGENTS.md",
  });
  return f;
}
function item(project, slug = "repair") {
  const dir = path.join(project, "work-items", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, slug + ".work-item-report.json"),
    JSON.stringify({
      work_item_slug: slug,
      protocol_status: "ACTIVE",
      current_step: "s07",
      approval_status: "APPROVED",
      blockers: [],
      required_actions: ["Run regression before QC"],
    }),
  );
  fs.writeFileSync(
    path.join(dir, slug + ".s07.implementation.md"),
    "# Work\n## Session Handoff\nDecision D17: masked fixtures only. Next: run regression.\n",
  );
}
test("briefing recovers actual context and canonical handoff without creating workflow artifacts", (t) => {
  const { project } = installed(t);
  item(project);
  const b = brief(project);
  assert.equal(b.selected_work_item, "repair");
  assert.match(b.project_context.text, /make check/);
  assert.match(b.work_items[0].handoff.text, /Decision D17/);
  assert.equal(b.approval_verification, "not_verified_by_briefing");
  assert.equal(
    fs.existsSync(path.join(project, ".codex/code-factory/session.json")),
    false,
  );
});
test("multiple active items require selection; unknown item and escaped root fail", (t) => {
  const { project } = installed(t);
  item(project);
  item(project, "second");
  const b = brief(project);
  assert.equal(b.status, "selection_required");
  assert.equal(b.selected_work_item, null);
  assert.equal(
    brief(project, ["--work-item", "second"]).selected_work_item,
    "second",
  );
  assert.throws(() => brief(project, ["--work-item", "../outside"]));
});
test("cross-harness checkpoints retain references; changed source is stale not silently trusted", (t) => {
  const { project, source } = installed(t);
  item(project);
  syncProjectPolicy({
    globalAgentsSource: source,
    projectRoot: project,
    projectAgentsFileName: "CLAUDE.md",
  });
  brief(project, ["--event", "checkpoint"]);
  const b = brief(project);
  assert.equal(b.cache.status, "fresh");
  fs.appendFileSync(
    path.join(project, "project-context/project-context.md"),
    "Changed constraint\n",
  );
  assert.equal(brief(project).cache.status, "stale");
  const other = JSON.parse(
    execFileSync(
      process.execPath,
      [
        path.join(project, ".claude/code-factory/context.cjs"),
        "--project-root",
        project,
      ],
      { encoding: "utf8" },
    ),
  );
  assert.match(other.work_items[0].handoff.text, /Decision D17/);
});
test("context reader denies symlink context; oversized briefing is explicitly truncated", (t) => {
  const { project, root } = installed(t);
  const file = path.join(project, "project-context/project-context.md");
  fs.unlinkSync(file);
  const outside = path.join(root, "secret");
  fs.writeFileSync(outside, "never print");
  fs.symlinkSync(outside, file);
  assert.throws(() => brief(project));
  fs.unlinkSync(file);
  fs.writeFileSync(file, "X".repeat(50000));
  const b = brief(project);
  assert.equal(b.truncated, true);
  assert.ok(Buffer.byteLength(JSON.stringify(b)) < 17000);
});
function claudeInstalled(t) {
  const f = installed(t);
  syncProjectPolicy({
    globalAgentsSource: f.source,
    projectRoot: f.project,
    projectAgentsFileName: "CLAUDE.md",
  });
  const helper = path.join(f.project, ".claude/code-factory/context.cjs");
  const invoke = (args = [], input = {}) =>
    require("node:child_process").spawnSync(
      process.execPath,
      [helper, "--project-root", f.project, ...args],
      {
        encoding: "utf8",
        input: JSON.stringify({ cwd: f.project, session_id: "probe", ...input }),
      },
    );
  return { ...f, helper, invoke };
}
function hookBrief(result) {
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  const envelope = JSON.parse(result.stdout);
  assert.deepEqual(Object.keys(envelope), ["hookSpecificOutput"]);
  assert.equal(envelope.hookSpecificOutput.hookEventName, "SessionStart");
  assert.equal(typeof envelope.hookSpecificOutput.additionalContext, "string");
  assert.ok(Buffer.byteLength(result.stdout) <= 16385, "hook stdout exceeds 16KiB plus newline");
  return JSON.parse(envelope.hookSpecificOutput.additionalContext);
}

test("installed Claude SessionStart delivers context and handoff through the documented envelope", (t) => {
  const { project, invoke } = claudeInstalled(t);
  item(project);
  const unicode = 'Tiếng Việt: "đúng" \\ đường dẫn\nDòng hai 🚀';
  fs.appendFileSync(path.join(project, "project-context/project-context.md"), unicode);
  for (const source of ["startup", "resume", "clear", "compact"]) {
    for (const args of [["--hook"], ["--hook", "--event", "start"]]) {
      const b = hookBrief(invoke(args, { hook_event_name: "SessionStart", source }));
      assert.ok(b.project_context.text.includes(unicode));
      assert.equal(b.selected_work_item, "repair");
      assert.equal(b.work_items[0].reported_status, "ACTIVE");
      assert.match(b.work_items[0].handoff.text, /Decision D17/);
      assert.equal(b.approval_verification, "not_verified_by_briefing");
    }
  }
  const direct = JSON.parse(invoke().stdout);
  assert.equal(direct.schema_version, 1);
  assert.equal(direct.hookSpecificOutput, undefined);
  assert.deepEqual(direct, brief(project));
});

test("Claude hook output accounts for JSON escaping in its total byte budget", (t) => {
  const { project, invoke } = claudeInstalled(t);
  // Below the context text cap: the raw briefing fits, but an escaped string
  // inside the hook envelope would exceed 16KiB without transport-aware sizing.
  fs.writeFileSync(path.join(project, "project-context/project-context.md"), '"'.repeat(6000));
  const direct = JSON.parse(invoke().stdout);
  assert.equal(direct.truncated, false);
  assert.equal(direct.project_context.text.length, 6000);
  const b = hookBrief(invoke(["--hook", "--event", "start"]));
  assert.equal(b.truncated, true);
  assert.equal(b.project_context.text, "Read source; context budget exceeded");
  assert.match(b.project_context.sha256, /^[a-f0-9]{64}$/);
});

test("Claude hook keeps missing context and work-item selection explicit", (t) => {
  const { project, invoke } = claudeInstalled(t);
  item(project);
  item(project, "second");
  const multiple = hookBrief(invoke(["--hook"]));
  assert.equal(multiple.status, "selection_required");
  assert.equal(multiple.selected_work_item, null);
  assert.equal(multiple.work_items.length, 2);
  fs.unlinkSync(path.join(project, "project-context/project-context.md"));
  const missing = hookBrief(invoke(["--hook", "--work-item", "repair"]));
  assert.equal(missing.status, "context_missing");
  assert.equal(missing.project_context, null);
});

test("Claude checkpoint hooks stay silent and rejected hook input emits no context", (t) => {
  const { project, helper, invoke } = claudeInstalled(t);
  for (const event of ["PreCompact", "SessionEnd"]) {
    const result = invoke(["--hook", "--event", "checkpoint"], {
      hook_event_name: event,
      session_id: event,
    });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout, "");
    assert.equal(result.stderr, "");
  }
  const caches = fs.readdirSync(path.dirname(helper)).filter((n) => /^session-.*\.json$/.test(n));
  assert.equal(caches.length, 2);
  const sessions = caches.map((name) => JSON.parse(fs.readFileSync(path.join(path.dirname(helper), name))).session_id);
  assert.deepEqual(sessions.sort(), ["PreCompact", "SessionEnd"]);
  const rejected = invoke(["--hook"], { cwd: path.dirname(project) });
  assert.equal(rejected.status, 1);
  assert.equal(rejected.stdout, "");
  assert.match(rejected.stderr, /Hook project mismatch/);
});

test("Claude custom hooks survive repeat installation and edited managed hook conflicts", (t) => {
  const { source, project } = fixture(t);
  fs.mkdirSync(path.join(project, ".claude"), { recursive: true });
  const p = path.join(project, ".claude/settings.json");
  const custom = { hooks: [{ type: "command", command: "echo custom" }] };
  fs.writeFileSync(p, JSON.stringify({ hooks: { SessionStart: [custom] } }));
  const run = () =>
    syncProjectPolicy({
      globalAgentsSource: source,
      projectRoot: project,
      projectAgentsFileName: "CLAUDE.md",
    });
  run();
  run();
  let s = JSON.parse(fs.readFileSync(p));
  assert.deepEqual(s.hooks.SessionStart[0], custom);
  assert.equal(s.hooks.SessionStart.length, 2);
  s.hooks.SessionStart[1].hooks[0].command += " edited";
  fs.writeFileSync(p, JSON.stringify(s));
  assert.throws(run, /hook conflict/);
});
test("rollback restores previous user instructions and refuses subsequent user edits", (t) => {
  const { project } = installed(t);
  const { rollback } = require("../scripts/workflow-project-context");
  const p = path.join(project, "AGENTS.md");
  fs.appendFileSync(p, "later user edit");
  assert.throws(() => rollback(project, "codex"), /Rollback conflict/);
});
test("integration upgrades a read-only project root and restores original permission", (t) => {
  if (process.platform === "win32") return;
  const { source, project } = fixture(t);
  fs.mkdirSync(project);
  fs.chmodSync(project, 0o555);
  try {
    syncProjectPolicy({
      globalAgentsSource: source,
      projectRoot: project,
      projectAgentsFileName: "AGENTS.md",
    });
    assert.equal(fs.statSync(project).mode & 0o777, 0o555);
  } finally {
    fs.chmodSync(project, 0o755);
  }
});
test("install bootstraps project context from sources without inventing project facts", (t) => {
  const { source, project } = fixture(t);
  fs.mkdirSync(project);
  fs.writeFileSync(
    path.join(project, "README.md"),
    "# Voucher maintenance\nOnly masked UAT input.\n",
  );
  fs.writeFileSync(
    path.join(project, "package.json"),
    JSON.stringify({ scripts: { test: "node --test" } }),
  );
  syncProjectPolicy({
    globalAgentsSource: source,
    projectRoot: project,
    projectAgentsFileName: "AGENTS.md",
  });
  const c = fs.readFileSync(
    path.join(project, "project-context/project-context.md"),
    "utf8",
  );
  assert.match(c, /README.md/);
  assert.match(c, /node --test/);
  assert.match(c, /unreviewed|Unknown/i);
});
test("status diagnoses explicit unregistered project without writing and without claiming live verification", (t) => {
  const { project, root } = installed(t);
  const home = path.join(root, "home");
  fs.mkdirSync(home);
  const cli = path.join(__dirname, "../scripts/workflow-bundle-cli.js");
  const output = execFileSync(
    process.execPath,
    [
      cli,
      "status",
      "--mode",
      "codex",
      "--runtime-home",
      home,
      "--project-root",
      project,
      "--json",
    ],
    { encoding: "utf8" },
  );
  const data = JSON.parse(output.slice(output.indexOf("{")));
  assert.equal(
    data.project_context[0].lifecycle_verification.status,
    "not_verified",
  );
  assert.equal(data.project_context[0].instructions.status, "discoverable");
  assert.equal(fs.readdirSync(home).length, 0);
});
test("init installs project lifecycle for both supported harnesses and preserves existing context", (t) => {
  const { project } = fixture(t);
  fs.mkdirSync(project);
  fs.mkdirSync(path.join(project, "project-context"));
  const context = path.join(project, "project-context/project-context.md");
  fs.writeFileSync(context, "Reviewed context owned by project\n");
  require("../scripts/init-workflow-bundle").initWorkflowBundle({
    projectRoot: project,
    mode: "both",
  });
  assert.ok(fs.existsSync(path.join(project, "AGENTS.md")));
  assert.ok(fs.existsSync(path.join(project, "CLAUDE.md")));
  assert.equal(
    fs.readFileSync(context, "utf8"),
    "Reviewed context owned by project\n",
  );
});
test("rollback after a version upgrade restores prior manifest so reinstall stays idempotent", (t) => {
  const { source, project } = installed(t);
  const p = path.join(project, "AGENTS.md");
  const before = fs.readFileSync(p);
  const oldPolicy = fs.readFileSync(source);
  fs.appendFileSync(source, "Updated rule\n");
  syncProjectPolicy({
    globalAgentsSource: source,
    projectRoot: project,
    projectAgentsFileName: "AGENTS.md",
  });
  require("../scripts/workflow-project-context").rollback(project, "codex");
  assert.deepEqual(fs.readFileSync(p), before);
  fs.writeFileSync(source, oldPolicy);
  assert.doesNotThrow(() =>
    syncProjectPolicy({
      globalAgentsSource: source,
      projectRoot: project,
      projectAgentsFileName: "AGENTS.md",
    }),
  );
});
test("opt-in companion config uses exact project scope and preserves other MCP servers", (t) => {
  const { source, project, root } = fixture(t);
  fs.mkdirSync(project);
  const companion = path.join(root, "companion");
  fs.mkdirSync(path.join(companion, "src"), { recursive: true });
  fs.writeFileSync(path.join(companion, "src/index.js"), "// fixture server");
  fs.writeFileSync(
    path.join(companion, "package.json"),
    JSON.stringify({
      name: "@code-factory/session-search-mcp",
      version: "0.2.0",
    }),
  );
  fs.writeFileSync(
    path.join(project, ".mcp.json"),
    JSON.stringify({ mcpServers: { existing: { command: "existing" } } }),
  );
  const { install } = require("../scripts/workflow-project-context");
  if (Number(process.versions.node.split(".")[0]) < 20) {
    assert.throws(
      () =>
        install({
          root: project,
          mode: "claude",
          entry: "CLAUDE.md",
          policy: fs.readFileSync(source),
          historyCompanion: companion,
        }),
      /Node >=20/,
    );
    return;
  }
  install({
    root: project,
    mode: "claude",
    entry: "CLAUDE.md",
    policy: fs.readFileSync(source),
    historyCompanion: companion,
  });
  const config = JSON.parse(fs.readFileSync(path.join(project, ".mcp.json")));
  assert.equal(config.mcpServers.existing.command, "existing");
  assert.equal(
    config.mcpServers["code-factory-history-codex"].env
      .SESSION_SEARCH_ALLOWED_ROOT,
    fs.realpathSync(project),
  );
  assert.match(
    config.mcpServers["code-factory-history-claude"].env
      .SESSION_SEARCH_SESSIONS_ROOT,
    /.claude/,
  );
});
test("read-only briefing exposes a pending proposal without inferring approval", (t) => {
  const { project } = installed(t);
  item(project);
  const p = path.join(
    project,
    "work-items/repair/repair.work-item-report.json",
  );
  fs.writeFileSync(
    p,
    JSON.stringify({
      work_item_slug: "repair",
      protocol_status: "PROPOSED",
      current_step: "s01",
      approval_status: "PENDING_REVIEW",
      blockers: ["Needs acceptance"],
      required_actions: ["Human review"],
    }),
  );
  const b = brief(project);
  assert.equal(b.selected_work_item, "repair");
  assert.equal(b.work_items[0].reported_approval_status, "PENDING_REVIEW");
});
test("an in-progress managed installation blocks a concurrent writer before file changes", (t) => {
  const { source, project } = fixture(t);
  fs.mkdirSync(path.join(project, ".codex/code-factory"), { recursive: true });
  const p = path.join(project, "AGENTS.md");
  fs.writeFileSync(p, "User policy\n");
  fs.writeFileSync(
    path.join(project, ".codex/code-factory/install.lock"),
    "owner",
  );
  assert.throws(
    () =>
      syncProjectPolicy({
        globalAgentsSource: source,
        projectRoot: project,
        projectAgentsFileName: "AGENTS.md",
      }),
    /lock|progress/,
  );
  assert.equal(fs.readFileSync(p, "utf8"), "User policy\n");
});
test("explicit project update does not mutate or preflight other registered projects", (t) => {
  const { root } = fixture(t);
  const a = path.join(root, "a"),
    b = path.join(root, "b"),
    home = path.join(root, "home");
  const { applyInstallOrUpdate } = require("../scripts/workflow-bundle-cli");
  const common = {
    mode: "codex",
    "runtime-home": home,
    scope: "project",
    skill: "requirement-analysis",
  };
  applyInstallOrUpdate({
    action: "install",
    args: { ...common, "project-root": [a, b] },
  });
  const target = path.join(b, "AGENTS.md");
  fs.writeFileSync(
    target,
    "<!-- code-factory:begin -->\nconflicting user edit",
  );
  const before = fs.readFileSync(target);
  assert.doesNotThrow(() =>
    applyInstallOrUpdate({
      action: "update",
      args: { ...common, "project-root": a },
    }),
  );
  assert.deepEqual(fs.readFileSync(target), before);
});

test("status binds a recorded lifecycle observation to installed bytes, sources and evidence", (t) => {
  const { project } = installed(t);
  const { diagnose } = require("../scripts/workflow-project-context");
  const initial = diagnose(project, "codex");
  assert.equal(initial.installed_version, require("../package.json").version);
  assert.match(initial.configuration_sha256, /^[a-f0-9]{64}$/);
  const evidence = "project-context/lifecycle-evidence.md";
  fs.writeFileSync(
    path.join(project, evidence),
    "Observed fresh native session and cross-harness handoff.\n",
  );
  const crypto = require("node:crypto");
  const sha = (p) =>
    crypto
      .createHash("sha256")
      .update(fs.readFileSync(path.join(project, p)))
      .digest("hex");
  const proof = {
    schema_version: 1,
    mode: "codex",
    bundle_version: initial.installed_version,
    harness_version: "fixture-1",
    observed_at: "2026-11-04T03:00:00Z",
    observed_by: "test-reviewer",
    configuration_sha256: initial.configuration_sha256,
    source_fingerprint: initial.context.source_fingerprint,
    evidence: { path: evidence, sha256: sha(evidence) },
  };
  const file = path.join(
    project,
    "project-context/lifecycle-verification.codex.json",
  );
  fs.writeFileSync(file, JSON.stringify(proof));
  const before = fs.readFileSync(file);
  let result = diagnose(project, "codex");
  assert.equal(result.lifecycle_verification.status, "recorded_current");
  assert.equal(
    result.lifecycle_verification.authority,
    "observation_only_not_gate_approval",
  );
  assert.equal(result.lifecycle_verification.observed_at, proof.observed_at);
  assert.deepEqual(fs.readFileSync(file), before);
  fs.appendFileSync(path.join(project, evidence), "Changed evidence\n");
  assert.equal(
    diagnose(project, "codex").lifecycle_verification.status,
    "recorded_stale",
  );
  fs.appendFileSync(
    path.join(project, ".codex/code-factory/policy.md"),
    "Changed policy\n",
  );
  result = diagnose(project, "codex");
  assert.equal(result.instructions.policy, "conflict");
  assert.notEqual(result.configuration_sha256, initial.configuration_sha256);
  assert.equal(result.lifecycle_verification.status, "recorded_stale");
  fs.writeFileSync(
    file,
    JSON.stringify({ ...proof, evidence: { path: "../outside", sha256: "x" } }),
  );
  assert.equal(
    diagnose(project, "codex").lifecycle_verification.status,
    "invalid",
  );
});

test("known legacy full-policy entrypoint migrates to a bounded bridge with exact rollback", (t) => {
  const { source, project } = fixture(t);
  fs.mkdirSync(project);
  const old = fs.readFileSync(source);
  fs.writeFileSync(path.join(project, "AGENTS.md"), old);
  syncProjectPolicy({
    globalAgentsSource: source,
    projectRoot: project,
    projectAgentsFileName: "AGENTS.md",
  });
  assert.ok(
    !fs
      .readFileSync(path.join(project, "AGENTS.md"), "utf8")
      .includes("Human gates apply."),
  );
  require("../scripts/workflow-project-context").rollback(project, "codex");
  assert.deepEqual(fs.readFileSync(path.join(project, "AGENTS.md")), old);
});

test("large unowned instructions keep their exact bytes while lifecycle bridge remains discoverable first", (t) => {
  const { source, project } = fixture(t);
  fs.mkdirSync(project);
  const old = "# Project rules\n" + "Preserved local content.\n".repeat(1800);
  fs.writeFileSync(path.join(project, "AGENTS.md"), old);
  syncProjectPolicy({
    globalAgentsSource: source,
    projectRoot: project,
    projectAgentsFileName: "AGENTS.md",
  });
  const value = fs.readFileSync(path.join(project, "AGENTS.md"), "utf8");
  assert.ok(value.indexOf("<!-- code-factory:begin -->") < 2048);
  assert.ok(value.includes(old));
});

test("branch switch and lost/corrupt caches recover from canonical sources", (t) => {
  const { project } = installed(t);
  item(project);
  const git = (...args) =>
    execFileSync("git", args, { cwd: project, stdio: "pipe" });
  git("init", "-q");
  git("add", "project-context", "work-items");
  git(
    "-c",
    "user.name=Lifecycle Fixture",
    "-c",
    "user.email=fixture@example.invalid",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "-qm",
    "test: lifecycle fixture",
  );
  brief(project, ["--event", "checkpoint"]);
  assert.equal(brief(project).cache.status, "fresh");
  git("checkout", "-qb", "alternate");
  assert.equal(brief(project).cache.status, "stale");
  const cache = path.join(project, ".codex/code-factory/session.json");
  fs.writeFileSync(cache, "{broken");
  let b = brief(project);
  assert.equal(b.cache.status, "missing");
  assert.match(b.work_items[0].handoff.text, /Decision D17/);
  fs.unlinkSync(cache);
  b = brief(project);
  assert.match(b.work_items[0].handoff.text, /Decision D17/);
});

test("Claude checkpoint events isolate simultaneous session identities and survive missing end hook", async (t) => {
  const { project, source } = installed(t);
  item(project);
  syncProjectPolicy({
    globalAgentsSource: source,
    projectRoot: project,
    projectAgentsFileName: "CLAUDE.md",
  });
  const { execFile } = require("node:child_process");
  const helper = path.join(project, ".claude/code-factory/context.cjs");
  const invoke = (id) =>
    new Promise((resolve, reject) => {
      const child = execFile(
        process.execPath,
        [helper, "--project-root", project, "--hook", "--event", "checkpoint"],
        (error, out) => (error ? reject(error) : resolve(out)),
      );
      child.stdin.end(
        JSON.stringify({
          cwd: project,
          session_id: id,
          hook_event_name: "PreCompact",
        }),
      );
    });
  await Promise.all([invoke("first"), invoke("second")]);
  const dir = path.dirname(helper),
    files = fs.readdirSync(dir).filter((n) => /^session-.*\.json$/.test(n));
  assert.equal(files.length, 2);
  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), "utf8");
    assert.ok(!content.includes("Decision D17"));
    assert.match(content, /fingerprint/);
  }
  const result = JSON.parse(
    execFileSync(process.execPath, [helper, "--project-root", project], {
      encoding: "utf8",
    }),
  );
  assert.match(result.work_items[0].handoff.text, /Decision D17/);
});

test("interrupted managed transaction restores existing bytes and removes partial files", (t) => {
  const { source, project } = fixture(t);
  fs.mkdirSync(project);
  const before = "# Keep my original rules\n";
  fs.writeFileSync(path.join(project, "AGENTS.md"), before);
  const rename = fs.renameSync;
  let calls = 0;
  t.mock.method(fs, "renameSync", (...args) => {
    if (++calls === 3)
      throw Object.assign(new Error("Synthetic disk failure"), { code: "EIO" });
    return rename(...args);
  });
  assert.throws(
    () =>
      syncProjectPolicy({
        globalAgentsSource: source,
        projectRoot: project,
        projectAgentsFileName: "AGENTS.md",
      }),
    /Synthetic disk failure/,
  );
  assert.equal(
    fs.readFileSync(path.join(project, "AGENTS.md"), "utf8"),
    before,
  );
  assert.equal(
    fs.existsSync(path.join(project, ".codex/code-factory/install.json")),
    false,
  );
  assert.equal(
    fs.existsSync(path.join(project, ".codex/code-factory/install.lock")),
    false,
  );
});
