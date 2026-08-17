const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const expectedMetricIds = Array.from({ length: 10 }, (_, index) => `M-${String(index + 1).padStart(2, "0")}`);
let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function extractYamlFences(markdown) {
  return [...markdown.matchAll(/```yaml\n([\s\S]*?)\n```/g)].map((match) => match[1]);
}

function validateYamlFenceSyntax(yaml, relativePath) {
  assert(yaml.trim().length > 0, `${relativePath}: YAML fence must not be empty`);
  yaml.split(/\r?\n/).forEach((line, index) => {
    if (!line.trim() || line.trim().startsWith("#")) {
      return;
    }
    assert(!/^\s*[^#\n]+:\{/.test(line), `${relativePath}:${index + 1}: mapping value needs whitespace after ':'`);
    assert(!/^\s*[^#\n]+:\[/.test(line), `${relativePath}:${index + 1}: sequence value needs whitespace after ':'`);
    const withoutComment = line.replace(/\s+#.*$/, "");
    const opens = (withoutComment.match(/[\[{]/g) || []).length;
    const closes = (withoutComment.match(/[\]}]/g) || []).length;
    assert(opens === closes, `${relativePath}:${index + 1}: unbalanced inline collection`);
  });
}

function section(text, startPattern, endPattern) {
  const start = text.search(startPattern);
  if (start < 0) {
    return "";
  }
  const tail = text.slice(start);
  const endMatch = tail.slice(1).search(endPattern);
  return endMatch < 0 ? tail : tail.slice(0, endMatch + 1);
}

function handoffBlock(artifact, blockName) {
  const handoff = section(artifact, /^handoff:/m, /^stop_condition:/m);
  return section(handoff, new RegExp(`^  ${blockName}:`, "m"), /^  to_(?:ba|dev|qc|devops):/m);
}

function metricRows(artifact) {
  const metrics = section(artifact, /^metrics:/m, /^handoff:/m);
  const rows = new Map();
  metrics.split(/^    - id: /m).slice(1).forEach((chunk) => {
    const newline = chunk.indexOf("\n");
    if (newline > 0) {
      rows.set(chunk.slice(0, newline).trim(), chunk.slice(newline + 1));
    }
  });
  return rows;
}

function metricValue(row) {
  const match = row.match(/^      value: "([^"]*)"/m);
  return match ? match[1] : "";
}

function driverRows(artifact) {
  const drivers = section(artifact, /^drivers:/m, /^landscape:/m);
  return drivers.split(/^    - id: /m).slice(1).map((chunk) => {
    const newline = chunk.indexOf("\n");
    return { id: chunk.slice(0, newline).trim(), body: chunk.slice(newline + 1) };
  });
}

function ratioValue(numerator, denominator) {
  return `${numerator}/${denominator} = ${denominator === 0 ? "n/a" : `${Math.round((numerator / denominator) * 100)}%`}`;
}

function recomputeCoverageMetrics(artifact, lens) {
  const drivers = driverRows(artifact);
  const handoff = section(artifact, /^handoff:/m, /^stop_condition:/m);
  const pushed = section(artifact, /^stop_condition:/m, /(?![\s\S])/);
  const traced = drivers.filter(({ body }) => !/^      traces_to: \[\]$/m.test(body)).length;
  const anchored = drivers.filter(({ body }) =>
    /^        (?:concern|constraint_ref): "[^"]+"$/m.test(body)
  ).length;
  const quantified = drivers.filter(({ body }) => /^        status: quantified\s*(?:#.*)?$/m.test(body)).length;
  const meaningful = drivers.filter(({ body }) => !/^        status: binary\s*(?:#.*)?$/m.test(body)).length;
  const verified = drivers.filter(({ body }) => /^      verification: "[^"]+"$/m.test(body)).length;
  const handedOff = drivers.filter(({ id }) => handoff.includes(id)).length;
  const pushedCount = (pushed.match(/^    - question:/gm) || []).length;
  const ownedPushed = (pushed.match(/^      owner: "[^"]+"$/gm) || []).length;
  const rows = metricRows(artifact);
  const recomputed = {
    "M-01": ratioValue(traced, drivers.length),
    "M-03": ratioValue(anchored, drivers.length),
    "M-04": ratioValue(quantified, meaningful),
    "M-05": ratioValue(verified, drivers.length),
    "M-06": ratioValue(handedOff, drivers.length),
    "M-07": ratioValue(ownedPushed, pushedCount)
  };
  for (const [id, value] of Object.entries(recomputed)) {
    assert(metricValue(rows.get(id) || "") === value, `${lens} ${id}: declared value must equal recomputed '${value}'`);
  }
}

function assertMetricContract(artifact, lens, expectedValues) {
  const rows = metricRows(artifact);
  assert(JSON.stringify([...rows.keys()]) === JSON.stringify(expectedMetricIds), `${lens}: metrics must be exactly M-01 through M-10`);
  for (const id of expectedMetricIds) {
    const row = rows.get(id) || "";
    for (const field of ["name", "formula", "value", "threshold", "calibration", "evidence"]) {
      assert(new RegExp(`^      ${field}:`, "m").test(row), `${lens} ${id}: missing ${field}`);
    }
    if (expectedValues[id]) {
      assert(metricValue(row) === expectedValues[id], `${lens} ${id}: expected value '${expectedValues[id]}', got '${metricValue(row)}'`);
    }
  }
}

function testYamlSchemasAndExamples() {
  const files = [];
  for (const lens of ["sa", "ta"]) {
    for (const languageSuffix of ["", ".vi"]) {
      files.push(`skills/analysis/${lens}/references/output-schema${languageSuffix}.md`);
      files.push(`skills/analysis/${lens}/references/example${languageSuffix}.md`);
    }
  }
  for (const relativePath of files) {
    const fences = extractYamlFences(read(relativePath));
    assert(fences.length > 0, `${relativePath}: expected at least one YAML fence`);
    fences.forEach((yaml) => validateYamlFenceSyntax(yaml, relativePath));
  }

  for (const lens of ["sa", "ta"]) {
    for (const languageSuffix of ["", ".vi"]) {
      const schema = read(`skills/analysis/${lens}/references/output-schema${languageSuffix}.md`);
      assert(
        schema.includes("status: quantified|binary|not_quantified"),
        `${lens}${languageSuffix}: threshold status enum must be quantified|binary|not_quantified`
      );
      assert(schema.includes("exactly M-01 through M-10") || schema.includes("đúng M-01 tới M-10"), `${lens}${languageSuffix}: schema must declare the ten-row metric inventory`);
    }
  }
  console.log("  PASS: YAML schema/example fences and threshold enum contract checked");
}

function testLensOwnershipAndExamples() {
  const saArtifact = extractYamlFences(read("skills/analysis/sa/references/example.md"))[0] || "";
  const taArtifact = extractYamlFences(read("skills/analysis/ta/references/example.md"))[0] || "";
  assert(saArtifact.includes("skill: sa"), "SA example must invoke sa");
  assert(taArtifact.includes("skill: ta"), "TA example must invoke ta");
  assert(saArtifact !== taArtifact, "SA and TA examples must be intentionally distinct");

  assert(!/^      kind: (quality_attribute|integration)$/m.test(saArtifact), "SA example emits no TA-owned driver kinds");
  assert(!/^      kind: (business_goal|regulatory|system_boundary|data_ownership)$/m.test(taArtifact), "TA example emits no SA-owned driver kinds");
  assert(/^objectives:\n  applicable: false$/m.test(taArtifact), "TA objectives block must be non-applicable");

  const saDev = handoffBlock(saArtifact, "to_dev");
  const saDevops = handoffBlock(saArtifact, "to_devops");
  const taBa = handoffBlock(taArtifact, "to_ba");
  const taDev = handoffBlock(taArtifact, "to_dev");
  assert(saDev.includes("applicable: true") && /(boundary|ranh giới|nguồn sự thật)/i.test(saDev), "SA to_dev contains only actionable boundary constraints");
  assert(saDevops.includes("applicable: false") && !/^      - /m.test(saDevops), "SA emits no to_devops content");
  assert(taBa.includes("applicable: false") && !/^      - /m.test(taBa), "TA emits no to_ba content");
  assert(taDev.includes("applicable: true") && /(constraint|contract|ràng buộc)/i.test(taDev), "TA to_dev contains technical constraints/contracts");

  for (const key of ["unanchored_drivers", "contested_ownership", "untraceable_drivers", "unsupported_objectives", "surplus_drivers", "missing_capability"]) {
    assert(saArtifact.includes(`  ${key}:`), `SA example input_issues includes ${key}`);
    assert(taArtifact.includes(`  ${key}:`), `TA example input_issues includes ${key}`);
  }
  console.log("  PASS: SA/TA driver and handoff ownership contract checked");
}

function testMetricInventoryAndCoverageValues() {
  const saArtifact = extractYamlFences(read("skills/analysis/sa/references/example.md"))[0] || "";
  const taArtifact = extractYamlFences(read("skills/analysis/ta/references/example.md"))[0] || "";
  assertMetricContract(saArtifact, "SA", {
    "M-01": "4/4 = 100%", "M-02": "2/2 = 100%", "M-03": "4/4 = 100%",
    "M-04": "2/3 = 67%", "M-05": "4/4 = 100%", "M-06": "4/4 = 100%",
    "M-07": "3/3 = 100%", "M-08": "0/0 = n/a", "M-09": "n/a", "M-10": "1/2 = 50%"
  });
  assertMetricContract(taArtifact, "TA", {
    "M-01": "4/4 = 100%", "M-02": "2/2 = 100%", "M-03": "4/4 = 100%",
    "M-04": "2/3 = 67%", "M-05": "4/4 = 100%", "M-06": "4/4 = 100%",
    "M-07": "2/2 = 100%", "M-08": "0/0 = n/a", "M-09": "n/a", "M-10": "2/3 = 67%"
  });
  recomputeCoverageMetrics(saArtifact, "SA");
  recomputeCoverageMetrics(taArtifact, "TA");

  for (const relativePath of ["skills/analysis/sa/SKILL.md", "skills/analysis/ta/SKILL.md"]) {
    assert(!read(relativePath).includes("the nine metrics"), `${relativePath}: stale nine-metric claim removed`);
    assert(read(relativePath).includes("the ten metrics"), `${relativePath}: declares ten metrics`);
  }
  for (const relativePath of ["skills/analysis/sa/SKILL.vi.md", "skills/analysis/ta/SKILL.vi.md"]) {
    assert(!read(relativePath).includes("chín chỉ số"), `${relativePath}: stale nine-metric claim removed`);
    assert(read(relativePath).includes("mười chỉ số"), `${relativePath}: declares ten metrics`);
  }
  console.log("  PASS: M-01..M-10 inventory and worked coverage values checked");
}

function testSharedReferenceParityAndMetadata() {
  const shared = ["output-schema", "metric-table", "block-ownership", "invocation-rules", "landscape-quality-bar", "visual-encoding"];
  for (const name of shared) {
    for (const suffix of [".md", ".vi.md"]) {
      assert(
        read(`skills/analysis/sa/references/${name}${suffix}`) === read(`skills/analysis/ta/references/${name}${suffix}`),
        `${name}${suffix}: declared shared reference must stay byte-identical across SA/TA`
      );
    }
  }
  const saMeta = read("skills/analysis/sa/agents/openai.yaml");
  const taMeta = read("skills/analysis/ta/agents/openai.yaml");
  assert(saMeta.includes("$sa"), "SA default prompt names $sa");
  assert(taMeta.includes("$ta"), "TA default prompt names $ta");
  assert(!/\$sa[^\n]*DevOps/.test(saMeta), "SA metadata does not assign the TA-owned DevOps handoff");
  console.log("  PASS: shared-reference and agents metadata contract checked");
}

function structuralSummary(artifact) {
  const handoffApplicability = {};
  for (const block of ["to_ba", "to_dev", "to_qc", "to_devops"]) {
    const match = handoffBlock(artifact, block).match(/^    applicable: (true|false)$/m);
    handoffApplicability[block] = match ? match[1] : "missing";
  }
  return {
    topLevel: [...artifact.matchAll(/^([a-z_]+):$/gm)].map((match) => match[1]),
    driverKinds: [...artifact.matchAll(/^      kind: ([a-z_]+)$/gm)].map((match) => match[1]),
    thresholdStatuses: [...artifact.matchAll(/^        status: ([a-z_]+)$/gm)].map((match) => match[1]),
    metricIds: [...metricRows(artifact).keys()],
    handoffApplicability
  };
}

function testBilingualSemanticParity() {
  for (const lens of ["sa", "ta"]) {
    const enArtifact = extractYamlFences(read(`skills/analysis/${lens}/references/example.md`))[0] || "";
    const viArtifact = extractYamlFences(read(`skills/analysis/${lens}/references/example.vi.md`))[0] || "";
    assert(
      JSON.stringify(structuralSummary(enArtifact)) === JSON.stringify(structuralSummary(viArtifact)),
      `${lens}: EN/VI examples must have the same blocks, driver kinds, threshold statuses, metrics, and handoff applicability`
    );
  }
  console.log("  PASS: EN/VI example semantic structure checked");
}

console.log("Running architecture role skills contract tests...\n");
testYamlSchemasAndExamples();
testLensOwnershipAndExamples();
testMetricInventoryAndCoverageValues();
testSharedReferenceParityAndMetadata();
testBilingualSemanticParity();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in architecture-role-skills-contract.test.js`);
  process.exit(1);
}
console.log("\nOK: architecture-role-skills-contract.test.js passed");
