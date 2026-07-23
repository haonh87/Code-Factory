// Regression tests for the Node port of the workflow-pack audit.
// Drives the defects the old PowerShell script missed:
//  - frontmatter that leads with `language:` (field-order false-fail)
//  - description containing ": " (quoted = valid, plain = YAML-unsafe)
//  - Hard Rule heading equality with the router exception
//  - cross-reference depth for the flat runtime layout (../ vs ../../)
// Plus an integration pass over the real repo (must not FAIL after fixes).

const path = require("path");
const {
  parseFrontmatter,
  extractHardRuleHeadings,
  diffHardRules,
  resolveSkillReference,
  isSkillRelativeReference,
  auditWorkflowPack,
  ROUTER_EXCEPTION_RULES
} = require("../scripts/audit-workflow-pack");

let failures = 0;
function assert(cond, msg) {
  if (!cond) {
    failures += 1;
    console.error(`  FAIL: ${msg}`);
  }
}

// ---------- frontmatter: field order independence ----------

function testFieldOrderIndependent() {
  const langFirst = parseFrontmatter("---\nlanguage: en\nname: code-scan-review\ndescription: \"x\"\n---\nbody");
  assert(langFirst.ok, "language-first frontmatter parses");
  assert(langFirst.data.name === "code-scan-review", "name extracted when language comes first");
  const nameFirst = parseFrontmatter("---\nname: a\ndescription: b\nlanguage: vi\n---\n");
  assert(nameFirst.data.name === "a" && nameFirst.data.language === "vi", "name extracted when language comes last");
  console.log("  PASS: frontmatter parsed independent of field order");
}

// ---------- frontmatter: colon-in-description YAML safety ----------

function testColonScalarSafety() {
  const plain = parseFrontmatter("---\nname: x\ndescription: Scan lanes: syntax, security\n---\n");
  assert(plain.issues.some((i) => i.key === "description" && i.kind === "unquoted-colon"),
    "unquoted plain scalar with ': ' is flagged");
  const quoted = parseFrontmatter("---\nname: x\ndescription: \"Scan lanes: syntax, security\"\n---\n");
  assert(quoted.issues.length === 0, "double-quoted scalar with ':' is safe");
  assert(quoted.data.description === "Scan lanes: syntax, security", "quoted value preserved exactly");
  const block = parseFrontmatter("---\nname: x\ndescription: >-\n  Scan lanes: syntax,\n  security\n---\n");
  assert(block.issues.length === 0, "folded block scalar with ':' is safe");
  assert(block.data.description === "Scan lanes: syntax, security", "block scalar folds newlines to spaces");
  console.log("  PASS: colon-in-scalar YAML safety detected correctly");
}

// ---------- Hard Rule equality + router exception ----------

function testHardRuleRouterException() {
  const authority = extractHardRuleHeadings(
    "## Hard Rule: Router Before Action\n## Hard Rule: TDD For Behavior Change\n## Hard Rule: Two-Tier Review\n"
  );
  assert(authority.length === 3, "extracted 3 hard-rule headings");
  const target = ["TDD For Behavior Change", "Two-Tier Review"]; // missing the router rule
  const router = ["Router Before Action"];
  const ok = diffHardRules({ authority, target, router, exceptions: ROUTER_EXCEPTION_RULES });
  assert(ok.missing.length === 0, "router-only rule absent from target is not a failure when router covers it");
  assert(ok.missingButRouterCovered.includes("Router Before Action"), "router coverage recorded");

  const bad = diffHardRules({
    authority: ["TDD For Behavior Change", "Two-Tier Review"],
    target: ["TDD For Behavior Change"], // genuinely missing a non-exception rule
    router: [],
    exceptions: ROUTER_EXCEPTION_RULES
  });
  assert(bad.missing.includes("Two-Tier Review"), "genuine drift (missing non-exception rule) is flagged");
  console.log("  PASS: hard-rule equality applies router exception, still catches real drift");
}

// ---------- cross-reference depth for flat runtime ----------

function testCrossRefDepth() {
  // From <skill>/SKILL.md, sibling skill needs one ../
  const fromSkillRoot = resolveSkillReference("../deployment-devops/references/promotion-flow.md", {
    skillName: "ci-cd-release",
    relDir: ""
  });
  assert(fromSkillRoot.targetSkill === "deployment-devops", "SKILL.md-level ../ resolves to sibling skill");
  assert(fromSkillRoot.rest === "references/promotion-flow.md", "rest path preserved");

  // From <skill>/references/foo.md, ONE ../ stays inside the same skill (wrong target).
  const oneDotDot = resolveSkillReference("../deployment-devops/references/promotion-flow.md", {
    skillName: "ci-cd-release",
    relDir: "references"
  });
  assert(oneDotDot.targetSkill === "ci-cd-release", "one ../ from references/ wrongly stays in own skill");

  // From <skill>/references/foo.md, TWO ../ correctly reaches the sibling skill.
  const twoDotDot = resolveSkillReference("../../deployment-devops/references/promotion-flow.md", {
    skillName: "ci-cd-release",
    relDir: "references"
  });
  assert(twoDotDot.targetSkill === "deployment-devops", "two ../ from references/ reaches sibling skill");
  assert(twoDotDot.rest === "references/promotion-flow.md", "sibling rest path preserved");

  assert(isSkillRelativeReference("../../x/references/y.md"), "sibling traversal is skill-relative");
  assert(isSkillRelativeReference("references/y.md"), "own references path is skill-relative");
  assert(!isSkillRelativeReference("policies/codex/AGENTS.global.md"), "repo-root path is out of scope");
  console.log("  PASS: cross-reference depth resolves correctly for flat runtime");
}

// ---------- integration: real repo must not FAIL after fixes ----------

function testRealRepoNotFailing() {
  const repoRoot = path.resolve(__dirname, "../../..");
  const result = auditWorkflowPack({ repoRoot });
  const failing = result.checks.filter((c) => c.status === "FAIL");
  assert(
    result.overall !== "FAIL",
    `real repo audit must not FAIL; failing checks: ${failing.map((c) => c.id + " (" + c.evidence + ")").join(" | ")}`
  );
  console.log(`  PASS: real repo audit overall = ${result.overall}`);
}

console.log("Running audit-workflow-pack tests...\n");
testFieldOrderIndependent();
testColonScalarSafety();
testHardRuleRouterException();
testCrossRefDepth();
testRealRepoNotFailing();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in audit-workflow-pack.test.js`);
  process.exit(1);
}
console.log("\nOK: audit-workflow-pack.test.js passed");
