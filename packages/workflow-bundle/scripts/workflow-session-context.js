"use strict";
// Installed as context.cjs: builtin-only, portable, no network and no transcript execution.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");
const hash = (b) => crypto.createHash("sha256").update(b).digest("hex");
function contained(root, relative) {
  if (
    typeof relative !== "string" ||
    path.isAbsolute(relative) ||
    relative.split(/[\\/]/).includes("..")
  )
    throw new Error("Context path must stay inside the project");
  let p = root;
  for (const part of relative.split("/").filter(Boolean)) {
    p = path.join(p, part);
    try {
      const st = fs.lstatSync(p);
      if (
        st.isSymbolicLink() ||
        (!st.isFile() && !st.isDirectory()) ||
        (st.isFile() && st.nlink !== 1)
      )
        throw new Error("Refusing linked context path: " + relative);
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
    }
  }
  return p;
}
function read(root, relative) {
  const file = contained(root, relative);
  if (!fs.existsSync(file)) return null;
  const st = fs.statSync(file);
  if (!st.isFile() || st.size > 2 * 1024 * 1024)
    throw new Error("Invalid or oversized context source: " + relative);
  const bytes = fs.readFileSync(file);
  return { path: relative, sha256: hash(bytes), text: bytes.toString("utf8") };
}
function git(root) {
  try {
    return execFileSync(
      "git",
      ["rev-parse", "--show-toplevel", "--abbrev-ref", "HEAD", "HEAD"],
      {
        cwd: root,
        encoding: "utf8",
        timeout: 1500,
        stdio: ["ignore", "pipe", "ignore"],
      },
    ).trim();
  } catch {
    return "unavailable";
  }
}
function render({ projectRoot, workItem, cacheDir, sessionId = "default" }) {
  const root = fs.realpathSync(projectRoot);
  if (workItem && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(workItem))
    throw new Error("Invalid work-item selection");
  const sources = [];
  const track = (rel) => {
    const s = read(root, rel);
    if (s) sources.push({ path: s.path, sha256: s.sha256 });
    return s;
  };
  const context = track("project-context/project-context.md"),
    readme = track("README.md");
  const out = {
    schema_version: 1,
    project_root: root,
    status: context ? "context_available" : "context_missing",
    approval_verification: "not_verified_by_briefing",
    history: {
      status: "not_checked",
      action:
        "Use project-scoped companion status; no indexing is performed by startup",
    },
    project_context: context,
    readme: readme ? { path: readme.path, sha256: readme.sha256 } : null,
    selected_work_item: null,
    work_items: [],
    warnings: [],
    truncated: false,
  };
  const workRoot = contained(root, "work-items");
  if (fs.existsSync(workRoot)) {
    const entries = fs.readdirSync(workRoot, { withFileTypes: true });
    if (entries.length > 1000)
      throw new Error("Too many work items; scope the project");
    for (const entry of entries) {
      if (
        !entry.isDirectory() ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name)
      )
        continue;
      const rel =
        "work-items/" +
        entry.name +
        "/" +
        entry.name +
        ".work-item-report.json";
      const source = track(rel);
      if (!source) continue;
      let report;
      try {
        report = JSON.parse(source.text);
      } catch {
        throw new Error("Malformed canonical report: " + rel);
      }
      if (report.work_item_slug !== entry.name)
        throw new Error("Canonical report owner mismatch: " + rel);
      if (
        ![
          "PROPOSED",
          "READY_TO_MATERIALIZE",
          "ACTIVE",
          "BLOCKED",
          "MATERIALIZED",
          "VERIFIED",
          "READY_FOR_REVIEW",
        ].includes(report.protocol_status) &&
        entry.name !== workItem
      )
        continue;
      const step = report.current_step;
      let handoff = null;
      if (/^s0[1-8]$/.test(step || "")) {
        const dir = path.dirname(contained(root, rel));
        const names = fs
          .readdirSync(dir)
          .filter(
            (n) =>
              n.startsWith(entry.name + "." + step + ".") && n.endsWith(".md"),
          );
        if (names.length > 1)
          throw new Error("Ambiguous owning step note: " + rel);
        if (names.length) {
          const note = track("work-items/" + entry.name + "/" + names[0]);
          const match = note.text.match(
            /^## Session Handoff\s*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m,
          );
          handoff = {
            path: note.path,
            sha256: note.sha256,
            text: match
              ? match[1].trim()
              : "No saved Session Handoff; read the owning note.",
          };
        }
      }
      out.work_items.push({
        slug: entry.name,
        source: rel,
        reported_status: report.protocol_status,
        current_step: step || null,
        reported_approval_status: report.approval_status || null,
        blockers: report.blockers || [],
        next_actions: report.required_actions || [],
        handoff,
      });
    }
  }
  if (workItem && !out.work_items.some((x) => x.slug === workItem))
    throw new Error("Requested work item not found");
  out.selected_work_item =
    workItem || (out.work_items.length === 1 ? out.work_items[0].slug : null);
  if (!workItem && out.work_items.length > 1) out.status = "selection_required";
  const branch = git(root);
  const fingerprint = hash(JSON.stringify({ root, branch, sources }));
  const cacheName =
    sessionId === "default"
      ? "session.json"
      : "session-" + hash(sessionId).slice(0, 24) + ".json";
  const cacheRelative = cacheDir
    ? path
        .relative(root, path.join(cacheDir, cacheName))
        .split(path.sep)
        .join("/")
    : null;
  let cache = null;
  try {
    cache = cacheRelative ? read(root, cacheRelative) : null;
    if (cache) cache = JSON.parse(cache.text);
  } catch (e) {
    cache = null;
    out.warnings.push("Cache unavailable or corrupt: " + e.message);
  }
  out.cache = {
    status: cache
      ? cache.project_root === root && cache.fingerprint === fingerprint
        ? "fresh"
        : "stale"
      : "missing",
    authority: "hint_only",
  };
  out.source_fingerprint = fingerprint;
  out.sources = sources;
  out.branch = branch;
  // Bound all dynamic text, including corrupt/adversarial report fields, without hiding that data was cut.
  for (const item of out.work_items) {
    if (item.handoff && Buffer.byteLength(item.handoff.text) > 2048) {
      item.handoff.text =
        item.handoff.text.slice(0, 512) + "\n[truncated: read owning note]";
      out.truncated = true;
    }
  }
  if (context && Buffer.byteLength(context.text) > 6144) {
    context.text =
      context.text.slice(0, 1536) + "\n[truncated: read project context]";
    out.truncated = true;
  }
  if (Buffer.byteLength(JSON.stringify(out)) > 16384) {
    out.project_context = context
      ? {
          path: context.path,
          sha256: context.sha256,
          text: "Read source; context budget exceeded",
        }
      : null;
    out.work_items = out.work_items.map((x) => ({
      slug: x.slug,
      source: x.source,
      reported_status: x.reported_status,
      current_step: x.current_step,
      blockers: "Read source: not fully rendered",
      next_actions: "Read source: not fully rendered",
    }));
    out.sources = [];
    out.truncated = true;
  }
  if (Buffer.byteLength(JSON.stringify(out)) > 16384) {
    out.work_items = [];
    out.status = "context_budget_exceeded";
    out.warnings = [
      "Too many items for bounded briefing; select one and read canonical sources.",
    ];
  }
  return {
    out,
    cacheRelative,
    checkpoint: {
      schema_version: 1,
      project_root: root,
      session_id: sessionId,
      branch,
      fingerprint,
      sources,
      saved_at: new Date().toISOString(),
    },
  };
}
function main() {
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const key = process.argv[i];
    if (
      !["--project-root", "--work-item", "--event", "--hook"].includes(key) ||
      args[key] !== undefined
    )
      throw new Error("Unknown or repeated context option");
    args[key] = key === "--hook" ? true : process.argv[++i];
    if (args[key] === undefined) throw new Error("Missing option value");
  }
  const root = fs.realpathSync(args["--project-root"] || process.cwd());
  const installed =
    path.basename(__dirname) === "code-factory" &&
    [".codex", ".claude"].includes(path.basename(path.dirname(__dirname)));
  if (installed && fs.realpathSync(path.resolve(__dirname, "../..")) !== root)
    throw new Error("Installed helper cannot read a different project root");
  let sessionId = "default";
  if (args["--hook"]) {
    const buf = Buffer.alloc(65537);
    let length = 0,
      n;
    while (
      length < buf.length &&
      (n = fs.readSync(0, buf, length, buf.length - length, null)) > 0
    )
      length += n;
    if (length > 65536) throw new Error("Oversized hook input");
    if (length) {
      const input = JSON.parse(buf.subarray(0, length).toString("utf8"));
      if (input.cwd && fs.realpathSync(input.cwd) !== root)
        throw new Error("Hook project mismatch");
      if (
        typeof input.session_id === "string" &&
        input.session_id.length <= 1024
      )
        sessionId = input.session_id;
    }
  }
  const event = args["--event"] || "start";
  if (!["start", "checkpoint"].includes(event))
    throw new Error("Unsupported context event");
  const cacheDir = installed ? __dirname : null;
  const result = render({
    projectRoot: root,
    workItem: args["--work-item"],
    cacheDir,
    sessionId,
  });
  if (event === "checkpoint") {
    if (!cacheDir)
      throw new Error("Checkpoint requires installed project helper");
    const dest = contained(root, result.cacheRelative);
    const tmp = dest + "." + crypto.randomUUID();
    try {
      fs.writeFileSync(tmp, JSON.stringify(result.checkpoint) + "\n", {
        flag: "wx",
        mode: 0o600,
      });
      fs.renameSync(tmp, dest);
    } finally {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    }
  }
  if (!args["--hook"] || event === "start")
    console.log(JSON.stringify(result.out));
}
if (require.main === module) {
  try {
    main();
  } catch (e) {
    console.error("Code Factory context unavailable: " + e.message);
    process.exitCode = 1;
  }
}
module.exports = { render };
