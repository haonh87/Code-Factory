const fs = require("fs");
const path = require("path");
const {
  collectFilesRecursive,
  formatErrors,
  getFrontmatterLines,
  getFrontmatterValue,
  getFrontmatterNestedValue,
  normalizeYamlScalar,
  parseCliArgs,
  resolveExistingPath
} = require("./workflow-validator-utils");
const { PLANNING_TRACKS } = require("./workflow-planning-definitions");

const filePattern =
  /^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<step_id>s0[1-8])\.(?<step_slug>[a-z-]+)\.md$/;
const allowedPlanningTracks = new Set(PLANNING_TRACKS);
const enterpriseDeliverySteps = new Set(["s05", "s06", "s07", "s08"]);

function getTrackValue(frontmatterLines) {
  return getFrontmatterValue(frontmatterLines, "planning_track") || "full";
}

// Shared by planning and its existing consumers. This module never executes
// verification argv and does not depend on gate/protocol readers.
function contractError(filePath, field, reason) {
  const error = new Error(`${filePath}: ${field}: ${reason}`);
  error.code = 'TASK_CONTRACT_INVALID';
  return error;
}
function parseUniqueJson(text) {
  // Validate grammar first, then walk tokens to reject duplicate decoded keys.
  const value = JSON.parse(text);
  const tokens = text.match(/"(?:\\[\s\S]|[^"\\])*"|true|false|null|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[{}\[\],:]/g) || [];
  let i = 0;
  function walk(depth) {
    if (depth > 256) throw new Error('JSON nesting exceeds 256 levels');
    const token = tokens[i++];
    if (token === '{') {
      const keys = new Set();
      while (tokens[i] !== '}') {
        const key = JSON.parse(tokens[i++]);
        if (keys.has(key)) throw new Error(`duplicate JSON key '${key}'`);
        keys.add(key);
        i++; // colon (grammar already validated)
        walk(depth + 1);
        if (tokens[i] !== ',') break;
        i++;
      }
      i++;
    } else if (token === '[') {
      while (tokens[i] !== ']') {
        walk(depth + 1);
        if (tokens[i] !== ',') break;
        i++;
      }
      i++;
    }
  }
  walk(0);
  return value;
}
function markdownOwners(content) {
  const sections = new Map();
  let section = null;
  let fence = null;
  for (const line of content.split(/\r?\n/)) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})([^\r\n]*)$/);
    if (fence) {
      if (marker && marker[1][0] === fence.char && marker[1].length >= fence.length && !marker[2].trim()) {
        fence.complete = true;
        fence = null;
      } else fence.lines.push(line);
      continue;
    }
    if (marker) {
      fence = { char: marker[1][0], length: marker[1].length, language: marker[2].trim(), lines: [], complete: false };
      if (section) section.push(fence);
      continue;
    }
    const heading = line.match(/^ {0,3}##\s+(.+?)\s*#*\s*$/);
    if (heading) {
      section = [];
      const owners = sections.get(heading[1]) || [];
      owners.push(section);
      sections.set(heading[1], owners);
    } else if (/^ {0,3}#\s/.test(line)) section = null;
  }
  return sections;
}
function isObject(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function concrete(value) {
  return typeof value === 'string' && value.trim().length > 0 &&
    !/^(?:tbd|todo|write tests|handle edge case|add appropriate validation|fix the related part|\.{3}|<[^>]+>)$/i.test(value.trim());
}
function stringList(value, nonempty = true) {
  return Array.isArray(value) && (!nonempty || value.length > 0) && value.every(concrete);
}
function readTaskContract({ content, filePath }) {
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  const versions = frontmatter ? frontmatter[1].split(/\r?\n/).filter(line => /^(?:task_contract_version|"task_contract_version"|'task_contract_version')\s*:/.test(line)) : [];
  if (!versions.length) return null;
  if (versions.length !== 1 || !/^task_contract_version:\s*1\s*(?:#.*)?$/.test(versions[0])) {
    throw contractError(filePath, 'task_contract_version', 'expected the integer 1 exactly once; absence selects legacy');
  }
  const owners = markdownOwners(content);
  function owner(heading) {
    const sections = owners.get(heading) || [];
    if (sections.length !== 1) throw contractError(filePath, heading, 'expected exactly one owner heading');
    const fences = sections[0];
    if (fences.length !== 1 || fences[0].language !== 'json' || !fences[0].complete)
      throw contractError(filePath, heading, 'expected one complete JSON fence and no second owner payload');
    let value;
    try { value = parseUniqueJson(fences[0].lines.join('\n')); }
    catch (error) { throw contractError(filePath, heading, `JSON: ${error.message}`); }
    if (!isObject(value)) throw contractError(filePath, heading, 'expected an object');
    return value;
  }
  return { version: 1, main: owner('Main Artifact'), trace: owner('Traceability') };
}
function boundedPath(root, value, directory = false) {
  if (!concrete(value) || value !== value.trim() || /[\\\x00-\x1f\x7f*?\[\]{}]/.test(value) || /^[A-Za-z]:/.test(value) || path.posix.isAbsolute(value))
    throw new Error('expected an explicit repository-relative path');
  if (!(directory && value === '.') && value.split('/').some(part => !part || part === '.' || part === '..'))
    throw new Error('root, empty and traversal segments are not allowed');
  const physicalRoot = fs.realpathSync(root);
  const target = path.resolve(root, value);
  let ancestor = target;
  while (true) {
    let stat;
    try { stat = fs.lstatSync(ancestor); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (stat) break;
    const parent = path.dirname(ancestor);
    if (parent === ancestor) throw new Error('no existing ancestor');
    ancestor = parent;
  }
  const physicalAncestor = fs.realpathSync(ancestor); // broken links fail closed
  const relative = path.relative(physicalRoot, physicalAncestor);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) throw new Error('symlink escapes repository');
  const stat = fs.statSync(ancestor);
  if (ancestor !== target && !stat.isDirectory()) throw new Error('planned parent is not a directory');
  if (ancestor === target && (directory ? !stat.isDirectory() : !stat.isFile())) throw new Error(directory ? 'cwd must be a directory' : 'scope must name a file, not a directory');
  return target;
}
function validateTaskPaths(task, root, fail) {
  const label = `task ${task.id}`;
  if (!stringList(task.paths_in_scope)) fail(`${label}.paths_in_scope`, 'expected explicit file paths');
  else {
    if (new Set(task.paths_in_scope).size !== task.paths_in_scope.length) fail(`${label}.paths_in_scope`, 'duplicate path');
    task.paths_in_scope.forEach(value => {
      try { boundedPath(root, value); } catch (error) { fail(`${label}.paths_in_scope`, `${value}: ${error.message}`); }
    });
  }
  const verification = task.verification;
  if (!isObject(verification)) { fail(`${label}.verification`, 'expected cwd, argv and test_refs'); return; }
  try { boundedPath(root, verification.cwd, true); } catch (error) { fail(`${label}.verification.cwd`, error.message); }
  const argv = verification.argv;
  if (!stringList(argv)) fail(`${label}.verification.argv`, 'expected nonempty concrete string tokens');
  else {
    const program = path.posix.basename(argv[0].replace(/\\/g, '/')).toLowerCase();
    const shell = /^(?:ba|da|z|k|c|tc|fi)?sh(?:\.exe)?$/.test(program);
    const cmd = /^(?:cmd|command)(?:\.exe|\.com)?$/.test(program);
    const powershell = /^(?:pwsh|powershell)(?:\.exe)?$/.test(program);
    if (argv.some(token => /^(?:&&|\|\||[|;&<>]|>>|<<|\d?>&\d?)$/.test(token)) ||
        (shell && argv.slice(1).some(token => /^-[^-]*c/.test(token))) ||
        (cmd && argv.slice(1).some(token => /^\/[ck]$/i.test(token))) ||
        (powershell && argv.slice(1).some(token => /^-(?:c|command|commandwithargs|e|ec|enc|encodedcommand)$/i.test(token))))
      fail(`${label}.verification.argv`, 'shell command strings and standalone control operators are not allowed');
  }
  const refs = verification.test_refs;
  if (!stringList(refs, task.kind === 'behavior')) fail(`${label}.verification.test_refs`, 'behavior tasks require nonempty test references');
  else {
    if (new Set(refs).size !== refs.length) fail(`${label}.verification.test_refs`, 'duplicate test reference');
    refs.forEach(ref => {
      if (!Array.isArray(task.paths_in_scope) || !task.paths_in_scope.includes(ref)) fail(`${label}.verification.test_refs`, `${ref} is not in paths_in_scope`);
    });
  }
}
function validateTaskTrace({ trace, ids, content, root, fail }) {
  if (!stringList(trace.acceptance_refs)) { fail('Traceability.acceptance_refs', 'expected nonempty changed AC IDs'); return; }
  const changed = new Set(trace.acceptance_refs);
  if (changed.size !== trace.acceptance_refs.length) fail('Traceability.acceptance_refs', 'duplicate AC ID');
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1].split(/\r?\n/);
  const refs = ['card', 'srs'].map(key => [key, getFrontmatterNestedValue(frontmatter, 'spec_refs', key)]).filter(([, ref]) => ref);
  if (refs.length !== 1) fail('spec_refs', 'expected exactly one owning card or srs reference');
  const acIds = new Set();
  if (refs.length === 1) {
    try {
      const specPath = boundedPath(root, refs[0][1]);
      const specContent = fs.readFileSync(specPath, 'utf8');
      const owners = markdownOwners(specContent).get('Acceptance Criteria') || [];
      if (owners.length !== 1 || owners[0].length !== 1 || !owners[0][0].complete || !['yaml', 'yml'].includes(owners[0][0].language))
        throw new Error('expected one Acceptance Criteria YAML owner');
      // Read IDs only from the canonical acceptance_criteria list, never prose,
      // descriptions, requirements or another section's incidental mentions.
      const lines = owners[0][0].lines;
      const start = lines.findIndex(line => /^acceptance_criteria:\s*$/.test(line));
      if (start < 0) throw new Error('missing acceptance_criteria list');
      let itemIndent = null;
      let item = null;
      function finishAc() {
        if (!item) return;
        if (!concrete(item.id)) throw new Error('acceptance criterion missing ID');
        if (acIds.has(item.id)) throw new Error(`duplicate acceptance criterion ${item.id}`);
        acIds.add(item.id);
      }
      function setAcId(raw) {
        if (item.id !== undefined) throw new Error('duplicate acceptance criterion id field');
        item.id = normalizeYamlScalar(raw.replace(/\s+#.*$/, ''));
      }
      for (const line of lines.slice(start + 1)) {
        if (/^\S/.test(line) && !line.startsWith('#')) break;
        const entry = line.match(/^( +)-\s+(.*)$/);
        if (entry && (itemIndent === null || entry[1].length === itemIndent)) {
          finishAc();
          itemIndent = entry[1].length;
          item = {};
          const id = entry[2].match(/^id:\s*(.*?)\s*$/);
          if (id) setAcId(id[1]);
        } else if (item) {
          const field = line.match(/^( +)id:\s*(.*?)\s*$/);
          if (field && field[1].length === itemIndent + 2) setAcId(field[2]);
        }
      }
      finishAc();
      if (!acIds.size) throw new Error('no acceptance criterion IDs');
    } catch (error) { fail('spec_refs', error.message); }
  }
  for (const id of changed) if (!acIds.has(id)) fail('Traceability.acceptance_refs', `unresolved AC ${id}`);
  if (!Array.isArray(trace.task_refs)) { fail('Traceability.task_refs', 'expected mapping array'); return; }
  const mapped = new Set();
  trace.task_refs.forEach((entry, index) => {
    const label = `Traceability.task_refs[${index}]`;
    if (!isObject(entry)) { fail(label, 'expected acceptance_ref and task_ids'); return; }
    if (!changed.has(entry.acceptance_ref)) fail(label, `${entry.acceptance_ref} is not a declared changed AC`);
    if (mapped.has(entry.acceptance_ref)) fail(label, `duplicate mapping for ${entry.acceptance_ref}`);
    mapped.add(entry.acceptance_ref);
    if (!stringList(entry.task_ids)) fail(`${label}.task_ids`, 'expected nonempty task IDs');
    else {
      if (new Set(entry.task_ids).size !== entry.task_ids.length) fail(`${label}.task_ids`, 'duplicate task ID');
      entry.task_ids.forEach(id => { if (!ids.has(id)) fail(`${label}.task_ids`, `unknown task ${id}`); });
    }
  });
  for (const id of changed) if (!mapped.has(id)) fail('Traceability.task_refs', `missing mapping for ${id}`);
}

function validateTaskContract({ content, filePath, projectRoot }) {
  let contract;
  try { contract = readTaskContract({ content, filePath }); }
  catch (error) { return [error.message]; }
  if (!contract) return [];
  const errors = [];
  const fail = (field, reason) => errors.push(contractError(filePath, field, reason).message);
  const { main, trace } = contract;
  if (!concrete(main.implementation_goal)) fail('Main Artifact.implementation_goal', 'expected concrete text');
  if (!Array.isArray(main.task_breakdown) || !main.task_breakdown.length) {
    fail('Main Artifact.task_breakdown', 'expected a nonempty task array');
    return errors;
  }
  const tasks = main.task_breakdown;
  const ids = new Set();
  tasks.forEach((task, index) => {
    const label = `Main Artifact.task_breakdown[${isObject(task) && task.id || index}]`;
    if (!isObject(task)) { fail(label, 'expected an object'); return; }
    for (const field of ['id', 'owner_role', 'name', 'objective', 'review_checkpoint', 'verification_hint']) {
      if (!concrete(task[field])) fail(`${label}.${field}`, 'expected concrete text, not a placeholder');
    }
    if (ids.has(task.id)) fail(`${label}.id`, `duplicate task ID ${task.id}`);
    ids.add(task.id);
    if (!stringList(task.outputs_expected)) fail(`${label}.outputs_expected`, 'expected concrete output strings');
    if (!['behavior', 'documentation', 'verification'].includes(task.kind)) fail(`${label}.kind`, 'expected behavior|documentation|verification');
    if (!stringList(task.dependencies, false)) fail(`${label}.dependencies`, 'expected a string array');
    else if (new Set(task.dependencies).size !== task.dependencies.length) fail(`${label}.dependencies`, 'duplicate dependency');
  });
  const graph = new Map();
  tasks.filter(isObject).forEach(task => {
    const deps = Array.isArray(task.dependencies) ? task.dependencies : [];
    graph.set(task.id, deps);
    deps.forEach(dep => {
      if (!ids.has(dep)) fail(`${task.id}.dependencies`, `unknown task ${dep}`);
      if (dep === task.id) fail(`${task.id}.dependencies`, 'self dependency');
    });
  });
  // Kahn's algorithm avoids a recursion limit for large but valid plans.
  const indegree = new Map([...graph.keys()].map(id => [id, 0]));
  const dependents = new Map([...graph.keys()].map(id => [id, []]));
  for (const [id, deps] of graph) for (const dep of deps) if (graph.has(dep)) {
    indegree.set(id, indegree.get(id) + 1);
    dependents.get(dep).push(id);
  }
  const queue = [...indegree].filter(([, n]) => n === 0).map(([id]) => id);
  for (let i = 0; i < queue.length; i++) for (const id of dependents.get(queue[i])) {
    indegree.set(id, indegree.get(id) - 1);
    if (indegree.get(id) === 0) queue.push(id);
  }
  if (queue.length !== graph.size) fail('task_breakdown.dependencies', 'dependency cycle');
  const root = path.resolve(projectRoot || process.cwd());
  tasks.filter(isObject).forEach(task => validateTaskPaths(task, root, fail));
  validateTaskTrace({ trace, ids, content, root, fail });
  return errors;
}

function validateWorkflowPlanning(options) {
  const workflowRoot = resolveExistingPath(options.workflowRoot, "workflow-root");
  const files = collectFilesRecursive(workflowRoot, new Set([".md"]));
  const errors = [];
  const workItemTrackMap = new Map();
  let validatedCount = 0;

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    const match = fileName.match(filePattern);
    if (!match || !match.groups) {
      continue;
    }

    const frontmatterLines = getFrontmatterLines(filePath);
    if (!frontmatterLines) {
      continue;
    }

    const artifactFamily = getFrontmatterValue(frontmatterLines, "artifact_family");
    const artifactRole = getFrontmatterValue(frontmatterLines, "artifact_role");
    if (artifactFamily !== "workflow-step" || artifactRole !== "primary") {
      continue;
    }

    validatedCount += 1;

    const workItemSlug = match.groups.work_item_slug;
    const stepId = match.groups.step_id;
    const content = fs.readFileSync(filePath, "utf8");
    if (stepId === "s06") errors.push(...validateTaskContract({ content, filePath, projectRoot: options.projectRoot || process.cwd() }));
    const planningTrack = getTrackValue(frontmatterLines);
    const executionMode = getFrontmatterValue(frontmatterLines, "execution_mode") || "agentic";
    const reviewMode = getFrontmatterValue(frontmatterLines, "review_mode") || "self";
    const verificationOwner = getFrontmatterValue(frontmatterLines, "verification_owner") || "";
    const governanceProfile = getFrontmatterValue(frontmatterLines, "governance_profile") || "default";
    const sddMode = getFrontmatterValue(frontmatterLines, "sdd_mode") || "none";

    if (!allowedPlanningTracks.has(planningTrack)) {
      errors.push(`Invalid planning_track '${planningTrack}' in ${filePath}`);
      continue;
    }

    const existingTrack = workItemTrackMap.get(workItemSlug);
    if (!existingTrack) {
      workItemTrackMap.set(workItemSlug, planningTrack);
    } else if (existingTrack !== planningTrack) {
      errors.push(`Inconsistent planning_track within work item '${workItemSlug}': ${filePath}`);
    }

    if (planningTrack === "quick") {
      if (executionMode !== "agentic") {
        errors.push(`quick planning_track requires execution_mode 'agentic': ${filePath}`);
      }

      if (reviewMode !== "self") {
        errors.push(`quick planning_track requires review_mode 'self': ${filePath}`);
      }

      if (sddMode === "strict") {
        errors.push(`quick planning_track cannot use sdd_mode 'strict': ${filePath}`);
      }
    }

    if (planningTrack === "enterprise") {
      if (governanceProfile === "default") {
        errors.push(`enterprise planning_track requires stricter governance_profile than 'default': ${filePath}`);
      }

      if (enterpriseDeliverySteps.has(stepId) && reviewMode === "self") {
        errors.push(`enterprise planning_track requires delivery-step review_mode not equal to 'self': ${filePath}`);
      }

      if (enterpriseDeliverySteps.has(stepId) && !verificationOwner) {
        errors.push(`enterprise planning_track requires verification_owner on delivery steps: ${filePath}`);
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    validatedCount,
    workflowRoot
  };
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  try {
    const result = validateWorkflowPlanning({
      workflowRoot: args["workflow-root"],
      projectRoot: args["project-root"]
    });

    if (!result.ok) {
      console.error(formatErrors(result.errors));
      process.exit(1);
    }

    console.log(`OK: validated planning track for ${result.validatedCount} workflow note files under ${result.workflowRoot}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  validateWorkflowPlanning,
  readTaskContract,
  validateTaskContract
};
