const fs = require("fs");
const path = require("path");
const { formatErrors, parseCliArgs } = require("./workflow-validator-utils");
const {
  getWorkItemPaths,
  normalizeArray,
  normalizeProtocolReport,
  normalizeSingleValue,
  quoteYamlString,
  resolveWorkflowRootBase
} = require("./work-item-protocol-utils");

const CONFIG_FILE_NAMES = ["workflow-bundle.config.json", "workflow-contracts.config.json"];
const DEFAULT_AUTHORING_ROOTS = ["work-items", "changes", "product-specs", "project-context", "docs"];
const DEFAULT_ALWAYS_WRITABLE_PATHS = [];
const DEFAULT_IGNORED_ROOTS = [".git", ".codex", ".claude", "node_modules", ".obsidian", ".idea", ".vscode"];
const SUPPORTED_ACTIONS = new Set(["status", "sync", "check"]);

function normalizeRelativeProjectPath(projectRoot, inputPath, label) {
  const raw = String(inputPath || "").trim();
  if (!raw || raw === ".") {
    return "";
  }

  const resolved = path.resolve(projectRoot, raw);
  if (resolved !== projectRoot && !resolved.startsWith(`${projectRoot}${path.sep}`)) {
    throw new Error(`${label} must stay within project root: ${inputPath}`);
  }

  return path.relative(projectRoot, resolved).replace(/\\/g, "/");
}

function uniq(values) {
  return [...new Set(values.filter(Boolean))];
}

function loadCapabilityConfig(projectRoot) {
  let rawConfig = {};

  for (const fileName of CONFIG_FILE_NAMES) {
    const filePath = path.join(projectRoot, fileName);
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error(`Config root must be a JSON object: ${filePath}`);
    }

    rawConfig = parsed;
    break;
  }

  const capabilityControl =
    rawConfig.capabilityControl && typeof rawConfig.capabilityControl === "object" && !Array.isArray(rawConfig.capabilityControl)
      ? rawConfig.capabilityControl
      : {};

  const authoringRoots = uniq(
    normalizeArray(capabilityControl.authoringRoots || DEFAULT_AUTHORING_ROOTS).map((item) =>
      normalizeRelativeProjectPath(projectRoot, item, "authoringRoots")
    )
  );
  const alwaysWritablePaths = uniq(
    normalizeArray(capabilityControl.alwaysWritablePaths || DEFAULT_ALWAYS_WRITABLE_PATHS).map((item) =>
      normalizeRelativeProjectPath(projectRoot, item, "alwaysWritablePaths")
    )
  );
  const ignoredRoots = uniq(
    normalizeArray(capabilityControl.ignoredRoots || DEFAULT_IGNORED_ROOTS).map((item) =>
      normalizeRelativeProjectPath(projectRoot, item, "ignoredRoots")
    )
  );
  const protectedRoots = uniq(
    normalizeArray(capabilityControl.protectedRoots || []).map((item) =>
      normalizeRelativeProjectPath(projectRoot, item, "protectedRoots")
    )
  );

  return {
    enabled: capabilityControl.enabled !== false,
    authoringRoots,
    alwaysWritablePaths,
    ignoredRoots,
    protectedRoots
  };
}

function pathMatchesRoot(relativePath, root) {
  if (!relativePath || !root) {
    return false;
  }

  return relativePath === root || relativePath.startsWith(`${root}/`);
}

function getDefaultProtectedRoots(projectRoot, config) {
  return fs
    .readdirSync(projectRoot, { withFileTypes: true })
    .map((entry) => entry.name)
    .filter((name) => !config.ignoredRoots.includes(name))
    .filter((name) => !config.authoringRoots.includes(name))
    .filter((name) => !config.alwaysWritablePaths.includes(name))
    .sort((left, right) => left.localeCompare(right));
}

function collectProtocolReports({ projectRoot, workflowRootBase }) {
  if (!fs.existsSync(workflowRootBase)) {
    return [];
  }

  return fs
    .readdirSync(workflowRootBase, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right))
    .flatMap((workItemSlug) => {
      const { reportPath } = getWorkItemPaths({ projectRoot, workflowRootBase, workItemSlug });
      if (!fs.existsSync(reportPath)) {
        return [];
      }

      const raw = JSON.parse(fs.readFileSync(reportPath, "utf8"));
      return [normalizeProtocolReport(raw)];
    });
}

function collectActiveCapabilityGrants({ projectRoot, workflowRootBase }) {
  return collectProtocolReports({ projectRoot, workflowRootBase })
    .filter((report) => report.protocol_status === "ACTIVE" && report.current_step === "s07")
    .map((report) => ({
      workItemSlug: report.work_item_slug,
      grantedWritePaths: uniq(
        normalizeArray(report.granted_write_paths).map((item) =>
          normalizeRelativeProjectPath(projectRoot, item, `granted_write_paths for ${report.work_item_slug}`)
        )
      )
    }));
}

function looksLikeFilePath(relativePath) {
  const baseName = path.basename(relativePath);
  return baseName.includes(".") || baseName.startsWith(".");
}

function setOwnerWrite(targetPath, writable) {
  if (!fs.existsSync(targetPath)) {
    return 0;
  }

  const stat = fs.lstatSync(targetPath);
  if (stat.isSymbolicLink()) {
    return 0;
  }

  const nextMode = writable ? stat.mode | 0o200 : stat.mode & ~0o200;
  let changed = 0;

  if (nextMode !== stat.mode) {
    fs.chmodSync(targetPath, nextMode);
    changed += 1;
  }

  if (!stat.isDirectory()) {
    return changed;
  }

  fs.readdirSync(targetPath, { withFileTypes: true }).forEach((entry) => {
    changed += setOwnerWrite(path.join(targetPath, entry.name), writable);
  });

  return changed;
}

function setOwnerWriteSingle(targetPath, writable) {
  if (!fs.existsSync(targetPath)) {
    return 0;
  }

  const stat = fs.lstatSync(targetPath);
  if (stat.isSymbolicLink()) {
    return 0;
  }

  const nextMode = writable ? stat.mode | 0o200 : stat.mode & ~0o200;
  if (nextMode === stat.mode) {
    return 0;
  }

  fs.chmodSync(targetPath, nextMode);
  return 1;
}

function ensureWritableTargetExists(projectRoot, relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  if (fs.existsSync(absolutePath)) {
    return 0;
  }

  const pathLooksLikeFile = looksLikeFilePath(relativePath);
  const nearestExistingParent = (() => {
    let cursor = pathLooksLikeFile ? path.dirname(absolutePath) : absolutePath;
    while (!fs.existsSync(cursor)) {
      const parent = path.dirname(cursor);
      if (parent === cursor) {
        return projectRoot;
      }
      cursor = parent;
    }
    return cursor;
  })();

  const parentStat = fs.lstatSync(nearestExistingParent);
  const originalMode = parentStat.mode;
  const writableMode = originalMode | 0o200;

  if (writableMode !== originalMode) {
    fs.chmodSync(nearestExistingParent, writableMode);
  }

  try {
    if (pathLooksLikeFile) {
      fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
      fs.writeFileSync(absolutePath, "", { flag: "a" });
    } else {
      fs.mkdirSync(absolutePath, { recursive: true });
    }
  } finally {
    if (writableMode !== originalMode) {
      fs.chmodSync(nearestExistingParent, originalMode);
    }
  }

  return 1;
}

function buildCapabilityPlan({ projectRoot, workflowRootBase }) {
  const config = loadCapabilityConfig(projectRoot);
  const protectedRoots =
    config.protectedRoots.length > 0 ? config.protectedRoots : getDefaultProtectedRoots(projectRoot, config);
  const activeGrants = collectActiveCapabilityGrants({ projectRoot, workflowRootBase });
  const activeGrantErrors = activeGrants
    .filter((entry) => entry.grantedWritePaths.length < 1)
    .map((entry) => `ACTIVE work item '${entry.workItemSlug}' requires at least one granted_write_path.`);

  const grantedWriteRoots = uniq(activeGrants.flatMap((entry) => entry.grantedWritePaths));

  return {
    config,
    protectedRoots,
    activeGrants,
    activeGrantErrors,
    grantedWriteRoots
  };
}

function isAllowedByCapabilityPlan(relativePath, plan) {
  if (!plan.config.enabled) {
    return true;
  }

  if (!relativePath) {
    return false;
  }

  if (plan.config.alwaysWritablePaths.includes(relativePath)) {
    return true;
  }

  if (plan.config.authoringRoots.some((root) => pathMatchesRoot(relativePath, root))) {
    return true;
  }

  if (plan.grantedWriteRoots.some((root) => pathMatchesRoot(relativePath, root))) {
    return true;
  }

  return false;
}

function readOwnerWritable(targetPath) {
  if (!fs.existsSync(targetPath)) {
    return false;
  }

  return Boolean(fs.statSync(targetPath).mode & 0o200);
}

function syncCapabilityControl({ projectRoot, workflowRootBase, dryRun = false }) {
  const plan = buildCapabilityPlan({ projectRoot, workflowRootBase });
  if (plan.activeGrantErrors.length > 0) {
    throw new Error(`Capability control cannot sync:\n- ${plan.activeGrantErrors.join("\n- ")}`);
  }

  if (!plan.config.enabled) {
    return {
      capability_enabled: false,
      project_root: projectRoot,
      workflow_root: workflowRootBase,
      protected_roots: plan.protectedRoots,
      authoring_roots: plan.config.authoringRoots,
      granted_write_roots: plan.grantedWriteRoots,
      active_work_items: plan.activeGrants,
      changed_paths: 0
    };
  }

  let changedPaths = 0;

  if (!dryRun) {
    changedPaths += setOwnerWriteSingle(projectRoot, false);

    plan.protectedRoots.forEach((relativePath) => {
      changedPaths += setOwnerWrite(path.join(projectRoot, relativePath), false);
    });

    plan.config.authoringRoots.forEach((relativePath) => {
      changedPaths += setOwnerWrite(path.join(projectRoot, relativePath), true);
    });

    plan.config.alwaysWritablePaths.forEach((relativePath) => {
      changedPaths += setOwnerWrite(path.join(projectRoot, relativePath), true);
    });

    plan.grantedWriteRoots.forEach((relativePath) => {
      ensureWritableTargetExists(projectRoot, relativePath);
      changedPaths += setOwnerWrite(path.join(projectRoot, relativePath), true);
    });
  }

  return {
    capability_enabled: true,
    project_root: projectRoot,
    workflow_root: workflowRootBase,
    protected_roots: plan.protectedRoots,
    authoring_roots: plan.config.authoringRoots,
    always_writable_paths: plan.config.alwaysWritablePaths,
    granted_write_roots: plan.grantedWriteRoots,
    active_work_items: plan.activeGrants,
    project_root_owner_writable: readOwnerWritable(projectRoot),
    changed_paths: changedPaths
  };
}

function printCapabilityStatus(summary, jsonOutput = false) {
  if (jsonOutput) {
    console.log(JSON.stringify(summary, null, 2));
    return;
  }

  console.log(
    [
      `OK: capability control`,
      `enabled=${summary.capability_enabled ? "true" : "false"}`,
      `project_root_owner_writable=${summary.project_root_owner_writable ? "true" : "false"}`,
      `active_work_items=${summary.active_work_items.length}`,
      `granted_write_roots=${summary.granted_write_roots.length}`
    ].join(" | ")
  );
  console.log(JSON.stringify(summary, null, 2));
}

function runCli() {
  const action = process.argv[2];
  if (!SUPPORTED_ACTIONS.has(action)) {
    console.error(
      formatErrors([`Unknown capability action '${action || ""}'. Use one of: ${[...SUPPORTED_ACTIONS].join(", ")}`])
    );
    process.exit(1);
  }

  const args = parseCliArgs(process.argv.slice(3));

  try {
    const projectRoot = path.resolve(normalizeSingleValue(args["project-root"] || process.cwd()));
    const workflowRootBase = resolveWorkflowRootBase(projectRoot, normalizeSingleValue(args["workflow-root"] || ""));

    if (action === "check") {
      const rawPath = normalizeSingleValue(args.path || "");
      if (!rawPath) {
        throw new Error("Missing required argument '--path'.");
      }

      const relativePath = normalizeRelativeProjectPath(projectRoot, rawPath, "path");
      const plan = buildCapabilityPlan({ projectRoot, workflowRootBase });
      if (plan.activeGrantErrors.length > 0) {
        throw new Error(`Capability control check failed:\n- ${plan.activeGrantErrors.join("\n- ")}`);
      }

      const allowed = isAllowedByCapabilityPlan(relativePath, plan);
      const summary = {
        capability_enabled: plan.config.enabled,
        path: relativePath,
        allowed,
        active_work_items: plan.activeGrants,
        granted_write_roots: plan.grantedWriteRoots
      };

      if (!allowed) {
        printCapabilityStatus(summary, Boolean(args.json));
        process.exit(1);
      }

      printCapabilityStatus(summary, Boolean(args.json));
      return;
    }

    const summary = syncCapabilityControl({
      projectRoot,
      workflowRootBase,
      dryRun: action === "status"
    });
    printCapabilityStatus(summary, Boolean(args.json));
  } catch (error) {
    const message = error.message.startsWith("ERROR:") ? error.message : formatErrors([error.message]);
    console.error(message);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  CONFIG_FILE_NAMES,
  DEFAULT_ALWAYS_WRITABLE_PATHS,
  DEFAULT_AUTHORING_ROOTS,
  DEFAULT_IGNORED_ROOTS,
  buildCapabilityPlan,
  isAllowedByCapabilityPlan,
  loadCapabilityConfig,
  normalizeRelativeProjectPath,
  syncCapabilityControl
};
