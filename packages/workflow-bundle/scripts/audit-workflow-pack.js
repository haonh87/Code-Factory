#!/usr/bin/env node
// Workflow pack audit — Node port of the workflow-pack-audit skill's
// audit-workflow-pack.ps1.
//
// Why a Node port: the PowerShell version parsed frontmatter with a single
// order-dependent regex (`^---\nname:\ndescription:\n---`) that false-failed
// every skill whose frontmatter leads with `language:`. It also never checked
// Hard Rule heading equality or cross-reference resolution, both of which the
// checklist requires. This port parses frontmatter independent of field order,
// validates YAML scalar safety, and adds the two missing checks. It runs in the
// same Node toolchain as the rest of workflow-bundle (no pwsh dependency).
//
// Usage:
//   node packages/workflow-bundle/scripts/audit-workflow-pack.js [--repo-root <path>]
//   npm run validate:workflow:pack-audit
// Exits 1 when any check fails.

"use strict";

const fs = require("fs");
const path = require("path");

const ROUTER_EXCEPTION_RULES = [
  "Router Before Action",
  "Generic Coding Defaults Do Not Open A Gate"
];

// ---------------------------------------------------------------------------
// Frontmatter parsing (field-order independent, YAML-scalar aware)
// ---------------------------------------------------------------------------

// Parse the leading `---` frontmatter block into { ok, data, issues }.
// - data: top-level scalar keys in any order.
// - issues: YAML-safety problems (e.g. an unquoted plain scalar containing
//   ": ", which a standard YAML parser rejects).
// Supports double/single quoted scalars and folded/literal block scalars
// (`>-`, `>`, `|`, `|-`), so a long description with colons stays valid.
function parseFrontmatter(text) {
  const norm = String(text).replace(/\r\n/g, "\n");
  const lines = norm.split("\n");
  if (lines[0].trim() !== "---") {
    return { ok: false, error: "missing-frontmatter-open", data: {}, issues: [] };
  }
  let close = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      close = i;
      break;
    }
  }
  if (close === -1) {
    return { ok: false, error: "missing-frontmatter-close", data: {}, issues: [] };
  }

  const body = lines.slice(1, close);
  const data = {};
  const issues = [];

  for (let i = 0; i < body.length; i++) {
    const line = body[i];
    if (line.trim() === "") continue;
    const m = line.match(/^([A-Za-z0-9_-]+):(.*)$/);
    if (!m) continue; // indented continuation or non-key line
    const key = m[1];
    const trimmed = m[2].trim();

    // Block scalar: gather subsequent indented lines.
    if (/^[|>][+-]?$/.test(trimmed)) {
      const collected = [];
      let j = i + 1;
      while (j < body.length) {
        const l = body[j];
        if (l.trim() === "") {
          collected.push("");
          j++;
          continue;
        }
        if (/^\s+/.test(l)) {
          collected.push(l.replace(/^\s+/, ""));
          j++;
          continue;
        }
        break;
      }
      const folded = trimmed.startsWith(">");
      data[key] = folded
        ? collected.join(" ").replace(/\s+/g, " ").trim()
        : collected.join("\n").trim();
      i = j - 1;
      continue;
    }

    // Quoted scalar (closed on the same line).
    const quoted =
      (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2);
    if (quoted) {
      data[key] = trimmed.slice(1, -1);
      continue;
    }

    // Opened a quote but did not close it on this line.
    if (trimmed.startsWith('"') || trimmed.startsWith("'")) {
      issues.push({ key, kind: "unterminated-quote" });
      data[key] = trimmed;
      continue;
    }

    // Plain scalar: a standard YAML parser rejects ": " inside a plain scalar.
    if (/:\s/.test(trimmed)) {
      issues.push({ key, kind: "unquoted-colon" });
    }
    data[key] = trimmed;
  }

  return { ok: true, data, issues };
}

// ---------------------------------------------------------------------------
// Hard Rule heading equality
// ---------------------------------------------------------------------------

function extractHardRuleHeadings(text) {
  const out = [];
  const re = /^## Hard Rule:\s*(.+?)\s*$/gm;
  let m;
  while ((m = re.exec(String(text))) !== null) {
    out.push(m[1]);
  }
  return out;
}

// Compare a target file's Hard Rule headings against the authority list.
// Rules that live only in the router (the entry-level exception) are allowed to
// be absent from the target as long as they exist in the router file.
function diffHardRules({ authority, target, router, exceptions }) {
  const targetSet = new Set(target);
  const routerSet = new Set(router);
  const exceptionSet = new Set(exceptions);
  const missing = [];
  const missingButRouterCovered = [];
  for (const rule of authority) {
    if (targetSet.has(rule)) continue;
    if (exceptionSet.has(rule) && routerSet.has(rule)) {
      missingButRouterCovered.push(rule);
    } else {
      missing.push(rule);
    }
  }
  const authoritySet = new Set(authority);
  const extra = target.filter((rule) => !authoritySet.has(rule));
  return { missing, extra, missingButRouterCovered };
}

// ---------------------------------------------------------------------------
// Cross-reference resolution for the flat runtime layout
// ---------------------------------------------------------------------------

// Resolve a skill-relative reference as it would resolve after a flat install
// (~/.codex/skills/<skill>/...). Returns { targetSkill, rest, escapes }.
function resolveSkillReference(token, { skillName, relDir }) {
  const base = "/" + [skillName, relDir].filter((p) => p && p !== ".").join("/");
  const resolved = path.posix.resolve(base, token);
  const segs = resolved.split("/").filter(Boolean);
  if (segs.length === 0) {
    return { targetSkill: null, rest: "", escapes: true };
  }
  return { targetSkill: segs[0], rest: segs.slice(1).join("/"), escapes: false };
}

// A reference is skill-relative (resolvable in the flat runtime) when it uses
// sibling traversal or points inside the skill's own references/scripts. Other
// tokens (repo-root paths like policies/..., URLs) are out of scope here.
function isSkillRelativeReference(token) {
  if (!/\.md$/.test(token)) return false;
  return /^\.\.\//.test(token) || /^(references|scripts)\//.test(token);
}

function extractReferenceTokens(text) {
  const tokens = [];
  const re = /`([^`]+)`/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    // Take the path part only, dropping a trailing "§ Section" anchor / prose.
    const first = m[1].trim().split(/\s+/)[0];
    if (isSkillRelativeReference(first)) tokens.push(first);
  }
  return tokens;
}

// ---------------------------------------------------------------------------
// Filesystem helpers
// ---------------------------------------------------------------------------

function walkFiles(root, predicate, acc = []) {
  if (!fs.existsSync(root)) return acc;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, predicate, acc);
    } else if (predicate(full)) {
      acc.push(full);
    }
  }
  return acc;
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

function auditWorkflowPack({ repoRoot }) {
  const repo = path.resolve(repoRoot);
  const skillsRoot = path.join(repo, "skills");
  const checks = [];
  let failCount = 0;
  let warnCount = 0;

  const add = (id, status, evidence) => {
    checks.push({ id, status, evidence });
    if (status === "FAIL") failCount++;
    else if (status === "WARN") warnCount++;
  };

  if (!fs.existsSync(skillsRoot)) {
    add("skills_root", "FAIL", `Missing skills root: ${skillsRoot}`);
    return { overall: "FAIL", checks, failCount, warnCount };
  }

  const skillFiles = walkFiles(skillsRoot, (f) => path.basename(f) === "SKILL.md");
  if (skillFiles.length === 0) {
    add("skill_files_found", "FAIL", "No SKILL.md files found");
    return { overall: "FAIL", checks, failCount, warnCount };
  }
  add("skill_files_found", "PASS", `Found ${skillFiles.length} SKILL.md files`);

  // Map skill name -> skill directory (for cross-reference resolution).
  const skillDirByName = {};
  const nameOccurrences = {};

  for (const file of skillFiles) {
    const rel = path.relative(repo, file);
    const dir = path.dirname(file);
    const folder = path.basename(dir);
    const parsed = parseFrontmatter(fs.readFileSync(file, "utf8"));

    if (!parsed.ok || !parsed.data.name || !parsed.data.description) {
      add(`frontmatter::${rel}`, "FAIL", parsed.error || "missing name/description");
      continue;
    }
    add(`frontmatter::${rel}`, "PASS", "name + description present, parsed field-order independent");

    if (parsed.issues.length > 0) {
      const detail = parsed.issues.map((x) => `${x.key}:${x.kind}`).join(", ");
      add(`yaml_scalar::${rel}`, "FAIL", `YAML-unsafe scalar (${detail})`);
    } else {
      add(`yaml_scalar::${rel}`, "PASS", "scalars are YAML-valid");
    }

    const name = parsed.data.name;
    if (folder !== name) {
      add(`folder_name::${rel}`, "FAIL", `Folder '${folder}' != name '${name}'`);
    } else {
      add(`folder_name::${name}`, "PASS", "folder matches name");
    }

    (nameOccurrences[name] = nameOccurrences[name] || []).push(rel);
    if (!skillDirByName[name]) skillDirByName[name] = dir;
  }

  const dups = Object.entries(nameOccurrences).filter(([, v]) => v.length > 1);
  if (dups.length > 0) {
    for (const [name, files] of dups) {
      add(`skill_name_unique::${name}`, "FAIL", `Duplicate name in: ${files.join(", ")}`);
    }
  } else {
    add("skill_name_unique", "PASS", "all skill names unique");
  }

  // ----- Workflow chain markers -----
  const workflowChain = path.join(
    repo,
    "skills/orchestration/codex-workflow-chain/references/workflow-chain.md"
  );
  let chainText = "";
  if (!fs.existsSync(workflowChain)) {
    add("workflow_chain_exists", "FAIL", "Missing workflow-chain reference file");
  } else {
    chainText = fs.readFileSync(workflowChain, "utf8");
    add("workflow_chain_exists", "PASS", path.relative(repo, workflowChain));
    const markers = [
      { id: "step-contract", re: /^## Step Contract\s*$/m },
      { id: "audit", re: /^## Audit\s*$/m },
      { id: "definition-of-ready", re: /^## Definition of Ready\s*$/m },
      { id: "definition-of-done", re: /^## Definition of Done\s*$/m }
    ];
    for (const marker of markers) {
      const found = marker.re.test(chainText);
      add(`workflow_marker::${marker.id}`, found ? "PASS" : "FAIL", found ? "found" : "missing");
    }
  }

  // ----- Hard Rule heading equality (with router exception) -----
  const agentsGlobal = path.join(repo, "policies/codex/AGENTS.global.md");
  const chainSkill = path.join(repo, "skills/orchestration/codex-workflow-chain/SKILL.md");
  const routerSkill = path.join(repo, "skills/orchestration/workflow-governance-router/SKILL.md");

  if (![agentsGlobal, chainSkill, routerSkill].every((p) => fs.existsSync(p))) {
    add("hard_rule_sync", "FAIL", "Missing one of AGENTS.global.md / codex-workflow-chain / router SKILL.md");
  } else {
    const authority = extractHardRuleHeadings(fs.readFileSync(agentsGlobal, "utf8"));
    const router = extractHardRuleHeadings(fs.readFileSync(routerSkill, "utf8"));
    const targets = [
      ["codex-workflow-chain/SKILL.md", extractHardRuleHeadings(fs.readFileSync(chainSkill, "utf8"))],
      ["codex-workflow-chain/references/workflow-chain.md", extractHardRuleHeadings(chainText)]
    ];
    for (const [label, target] of targets) {
      const { missing, extra } = diffHardRules({
        authority,
        target,
        router,
        exceptions: ROUTER_EXCEPTION_RULES
      });
      if (missing.length === 0 && extra.length === 0) {
        add(`hard_rule_sync::${label}`, "PASS", "matches AGENTS.global.md (router exception applied)");
      } else {
        const parts = [];
        if (missing.length) parts.push(`missing: ${missing.join("; ")}`);
        if (extra.length) parts.push(`extra: ${extra.join("; ")}`);
        add(`hard_rule_sync::${label}`, "FAIL", parts.join(" | "));
      }
    }
  }

  // ----- Cross-reference resolution (flat runtime layout) -----
  const refFiles = walkFiles(skillsRoot, (f) => {
    if (!f.endsWith(".md")) return false;
    const posix = f.replace(/\\/g, "/");
    return (
      path.basename(f).startsWith("SKILL") ||
      /\/references\//.test(posix) ||
      /\/scripts\//.test(posix)
    );
  });
  // Scope: this check validates skill-to-skill links (the checklist §6 concern).
  //  - A `../`-prefixed token is a filesystem traversal resolved from the
  //    mentioning file's directory — the sibling-skill case MEDIUM-01 was about.
  //  - A bare `references/…` or `scripts/…` token is a skill-root-relative prose
  //    pointer (the repo convention), resolved from the skill root regardless of
  //    which file mentions it.
  //  - Tokens that resolve to a first segment that is not a known skill (e.g.
  //    `../../../project-context/…`) are governance/repo-root pointers, not
  //    skill-to-skill links, so they are out of scope here and counted as
  //    skipped rather than failed.
  let brokenRefs = 0;
  let validatedRefs = 0;
  let skippedRefs = 0;
  for (const file of refFiles) {
    const posixFile = file.replace(/\\/g, "/");
    const skillEntry = Object.entries(skillDirByName).find(([, dir]) =>
      posixFile.startsWith(dir.replace(/\\/g, "/") + "/")
    );
    if (!skillEntry) continue;
    const [skillName, skillDir] = skillEntry;
    const fileRelDir = path.relative(skillDir, path.dirname(file)).replace(/\\/g, "/");
    const tokens = extractReferenceTokens(fs.readFileSync(file, "utf8"));
    for (const token of tokens) {
      const relDir = token.startsWith("../") ? fileRelDir : "";
      const { targetSkill, rest, escapes } = resolveSkillReference(token, { skillName, relDir });
      const targetDir = targetSkill ? skillDirByName[targetSkill] : null;
      if (escapes || !targetDir) {
        skippedRefs++; // out of scope: not a skill-to-skill link
        continue;
      }
      if (fs.existsSync(path.join(targetDir, rest))) {
        validatedRefs++;
      } else {
        brokenRefs++;
        add(
          `cross_ref::${path.relative(repo, file)}::${token}`,
          "FAIL",
          `skill-to-skill target not found: ${targetSkill}/${rest}`
        );
      }
    }
  }
  if (brokenRefs === 0) {
    add(
      "cross_ref",
      "PASS",
      `${validatedRefs} skill-to-skill references resolve in flat runtime layout; ${skippedRefs} non-skill pointers skipped (out of scope)`
    );
  }

  const overall = failCount > 0 ? "FAIL" : warnCount > 0 ? "PARTIAL" : "PASS";
  return { overall, checks, failCount, warnCount };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  let repoRoot = ".";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--repo-root" && argv[i + 1]) repoRoot = argv[++i];
  }
  return { repoRoot };
}

if (require.main === module) {
  const { repoRoot } = parseArgs(process.argv.slice(2));
  const result = auditWorkflowPack({ repoRoot });
  console.log(`WORKFLOW_PACK_AUDIT=${result.overall}`);
  for (const c of result.checks.slice().sort((a, b) => a.id.localeCompare(b.id))) {
    console.log(`  [${c.status}] ${c.id} — ${c.evidence}`);
  }
  if (result.failCount > 0) process.exit(1);
}

module.exports = {
  parseFrontmatter,
  extractHardRuleHeadings,
  diffHardRules,
  resolveSkillReference,
  isSkillRelativeReference,
  extractReferenceTokens,
  auditWorkflowPack,
  ROUTER_EXCEPTION_RULES
};
