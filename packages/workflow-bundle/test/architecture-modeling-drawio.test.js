const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const skillRoot = path.join(repoRoot, "skills", "architecture", "architecture-modeling");
const fixturePath = path.join(
  repoRoot,
  "packages",
  "workflow-bundle",
  "tests",
  "fixtures",
  "architecture-modeling",
  "representative-model.json"
);
const requiredPaths = [
  path.join(skillRoot, "scripts", "drawio-layout.js"),
  path.join(skillRoot, "scripts", "render-drawio.js"),
  path.join(skillRoot, "scripts", "validate-drawio.js"),
  fixturePath
];
let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function expectThrow(fn, pattern, message) {
  try {
    fn();
    assert(false, `${message}: expected an error`);
  } catch (error) {
    assert(pattern.test(error.message), `${message}: got '${error.message}'`);
  }
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function testRequiredFiles() {
  requiredPaths.forEach((targetPath) => assert(fs.existsSync(targetPath), `missing ${path.relative(repoRoot, targetPath)}`));
}

function runBehaviorTests() {
  const { buildDrawioXml, renderDrawio } = require(path.join(skillRoot, "scripts", "render-drawio.js"));
  const { validateDrawio } = require(path.join(skillRoot, "scripts", "validate-drawio.js"));
  const { modelDigest } = require(path.join(skillRoot, "scripts", "drawio-layout.js"));
  const model = JSON.parse(fs.readFileSync(fixturePath, "utf8"));

  const house = clone(model);
  house.render_plan = {
    render_owner: "HOUSE_SKILL",
    owner_skill: "ggg-architecture-design",
    built_in_renderer: "MUST_NOT_RUN",
    exactly_one_render_owner: true
  };
  expectThrow(() => buildDrawioXml(house), /HOUSE_SKILL|MUST_NOT_RUN/, "house-owned invocation must be refused");

  const missingOwner = clone(model);
  delete missingOwner.render_plan.render_owner;
  expectThrow(() => buildDrawioXml(missingOwner), /render_owner.*required/i, "missing render owner must be refused");

  const missingSystemOwner = clone(model);
  missingSystemOwner.architecture_model.elements[0].owner = "";
  expectThrow(
    () => buildDrawioXml(missingSystemOwner),
    /quality failed.*named_ownership_rate/i,
    "missing system owner must fail the landscape quality gate"
  );

  const multipleOwners = clone(model);
  multipleOwners.render_plan.render_owners = ["HOUSE_SKILL", "ARCHITECTURE_MODELING"];
  expectThrow(() => buildDrawioXml(multipleOwners), /exactly one render owner/i, "multiple render owners must be refused");

  const unsupported = clone(model);
  unsupported.requested_view.kind = "FLOW";
  unsupported.requested_view.render_format = "MERMAID";
  expectThrow(() => buildDrawioXml(unsupported), /unsupported.*FLOW/i, "unsupported view must be refused");

  const first = buildDrawioXml(model);
  const integrationView = clone(model);
  integrationView.requested_view.kind = "INTEGRATION_ARCHITECTURE";
  assert(buildDrawioXml(integrationView).report.view_kind === "INTEGRATION_ARCHITECTURE", "integration view must be supported");
  const second = buildDrawioXml(clone(model));
  assert(first.xml === second.xml, "renderer output must be byte-deterministic");
  assert(sha256(first.xml) === sha256(second.xml), "repeated output digests must match");
  assert(first.xml.startsWith("<?xml version=\"1.0\" encoding=\"UTF-8\"?>"), "output must be UTF-8 XML");
  assert(first.xml.includes("<mxfile"), "output must contain mxfile root");
  assert(first.xml.includes("<mxGraphModel"), "output must contain mxGraphModel");
  assert(!/compressed=\"true\"/.test(first.xml), "output must be uncompressed mxGraph XML");
  assert(first.xml.includes('id="domain:DOM-ORDER"'), "domain cell IDs must be stable");
  assert(first.xml.includes('id="system:SYS-ORDER"'), "system cell IDs must be stable");
  assert(first.xml.includes('id="relationship:INT-POS-ORDER"'), "relationship cell IDs must be stable");

  const metrics = first.report.metrics;
  assert(metrics.named_ownership_rate === 1, `named ownership must be 100%, got ${metrics.named_ownership_rate}`);
  assert(metrics.overlap_count === 0, `overlap count must be 0, got ${metrics.overlap_count}`);
  assert(metrics.non_endpoint_intersection_count === 0, `intersection count must be 0, got ${metrics.non_endpoint_intersection_count}`);
  assert(metrics.unanalyzed_two_way_arrow_count === 0, "two-way arrow count must be 0");
  assert(metrics.vague_aggregate_box_count === 0, "vague aggregate count must be 0");
  assert(metrics.engineering_element_count <= 25, "engineering element count must be <=25");
  assert(metrics.delete_test_failure_count === 0, "delete-test failure count must be 0");
  assert(metrics.containment_error_count === 0, "containment error count must be 0");
  assert(first.report.manual_steps.length <= 1, "manual step count must be <=1");
  assert(/^[a-f0-9]{64}$/.test(first.report.model_digest), "quality report must include model digest");
  assert(
    first.report.model_digest === modelDigest(model.architecture_model),
    "model_digest must hash architecture_model only, not invocation/render-plan state"
  );

  const validation = validateDrawio({ input: model, xml: first.xml });
  assert(validation.automated_status === "PASS", `automated validation must pass, got ${validation.automated_status}`);
  assert(validation.status === "PARTIAL", `overall status must remain PARTIAL before QC first-open, got ${validation.status}`);
  assert(validation.manual_review_status === "PENDING_QC_FIRST_OPEN", "QC first-open must remain pending");
  const tampered = first.xml.replace('id="system:SYS-ORDER"', 'id="system:SYS-ORDER-TAMPERED"');
  expectThrow(() => validateDrawio({ input: model, xml: tampered }), /deterministic|mismatch|missing/i, "tampered XML must fail");

  const escaped = clone(model);
  escaped.architecture_model.elements[0].name = "POS & <Store>";
  const escapedXml = buildDrawioXml(escaped).xml;
  assert(escapedXml.includes("POS &amp; &lt;Store&gt;"), "XML labels must be escaped");
  assert(!escapedXml.includes("POS & <Store>"), "raw unsafe XML label must not appear");

  const tooManyElements = clone(model);
  while (tooManyElements.architecture_model.elements.length <= 25) {
    const index = tooManyElements.architecture_model.elements.length;
    tooManyElements.architecture_model.elements.push({
      ...tooManyElements.architecture_model.elements[0],
      system_id: `SYS-EXTRA-${index}`,
      name: `Extra System ${index}`
    });
  }
  expectThrow(
    () => buildDrawioXml(tooManyElements),
    /at most 25/i,
    "element limit must fail before quadratic geometry analysis"
  );

  const tempRoot = fs.mkdtempSync(path.join(require("os").tmpdir(), "architecture-modeling-"));
  try {
    const outputPath = path.join(tempRoot, "representative.drawio");
    const reportPath = path.join(tempRoot, "representative.quality.json");
    const result = renderDrawio({ input: model, outputPath, reportPath });
    assert(fs.existsSync(outputPath), "renderDrawio must write output artifact");
    assert(fs.existsSync(reportPath), "renderDrawio must write quality report");
    assert(result.report.output_path === outputPath, "quality report must record output path");
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

console.log("Running architecture-modeling deterministic drawio tests...\n");
testRequiredFiles();
if (requiredPaths.every((targetPath) => fs.existsSync(targetPath))) {
  runBehaviorTests();
}

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in architecture-modeling-drawio.test.js`);
  process.exit(1);
}
console.log("OK: architecture-modeling-drawio.test.js passed");
