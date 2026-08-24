const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const expectedMetricIds = Array.from({ length: 10 }, (_, index) => `M-${String(index + 1).padStart(2, "0")}`);
const expectedDesignReadinessCheckIds = Array.from(
  { length: 13 },
  (_, index) => `DR-C${String(index + 1).padStart(2, "0")}`
);
const expectedDesignReadinessQuestionIds = Array.from(
  { length: 10 },
  (_, index) => `DR-Q${String(index + 1).padStart(2, "0")}`
);
const expectedDesignReadinessCases = [
  "data_authority",
  "contested_resource_authority",
  "reconciliation",
  "compliance_timing",
  "lifecycle_retirement",
  "offline_online_invariant"
];
const expectedDesignReadinessCheckLenses = [
  "sa", "sa", "ta", "ta", "sa", "ta", "sa", "ta", "sa", "ta", "sa", "sa", "sa"
];
const expectedDesignReadinessQuestionLenses = [
  "ta", "ta", "ta", "ta", "ta", "ta", "ta", "ta", "sa", "ta"
];
const expectedDesignReadinessCaseContracts = {
  data_authority: {
    ownerLens: "sa",
    references: ["DR-C01", "DR-C02"],
    destinations: ["input_issues.contested_ownership", "handoff.to_dev", "handoff.to_qc"]
  },
  contested_resource_authority: {
    ownerLens: "ta",
    references: ["DR-C03", "DR-Q01"],
    destinations: ["handoff.to_dev", "handoff.to_qc"]
  },
  reconciliation: {
    ownerLens: "ta",
    references: ["DR-C04", "DR-Q02"],
    destinations: ["handoff.to_dev", "handoff.to_qc", "handoff.to_devops"]
  },
  compliance_timing: {
    ownerLens: "sa",
    references: ["DR-C11"],
    destinations: ["handoff.to_ba", "handoff.to_dev", "handoff.to_qc"]
  },
  lifecycle_retirement: {
    ownerLens: "sa",
    references: ["DR-C12", "DR-C13"],
    destinations: ["input_issues.missing_capability", "stop_condition.pushed_to_s03", "handoff.to_dev"]
  },
  offline_online_invariant: {
    ownerLens: "ta",
    references: ["DR-Q08"],
    destinations: ["handoff.to_dev", "handoff.to_qc", "handoff.to_devops"]
  }
};
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

function readIfExists(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : "";
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

function designReadinessEntries(reference) {
  const matches = [
    ...reference.matchAll(/^\s*- (id|case):\s*["']?((?:DR-[CQ]\d{2})|(?:[a-z_]+))["']?\s*$/gm)
  ];
  return matches.map((match, index) => ({
    kind: match[1],
    id: match[2],
    body: reference.slice(match.index + match[0].length, matches[index + 1]?.index ?? reference.length)
  }));
}

function contractEntries(entries, idPrefix) {
  return entries.filter(({ kind, id }) => kind === "id" && id.startsWith(idPrefix));
}

function caseEntries(entries) {
  return entries.filter(({ kind }) => kind === "case");
}

function fieldValue(body, field) {
  const match = body.match(new RegExp(`^\\s+${field}:\\s*(.*?)\\s*$`, "m"));
  return match ? match[1].replace(/^(["'])(.*)\1$/, "$2").trim() : "";
}

function missingFields(entries, fields) {
  return entries.flatMap(({ id, body }) =>
    fields.filter((field) => !fieldValue(body, field)).map((field) => `${id}.${field}`)
  );
}

function placeholderFields(entries, fields) {
  const placeholder = /^(?:none|n\/a|tbd|todo|unknown|not applicable|chưa rõ|không áp dụng|\[\]|\{\})$/i;
  return entries.flatMap(({ id, body }) =>
    fields.filter((field) => placeholder.test(fieldValue(body, field))).map((field) => `${id}.${field}`)
  );
}

function duplicateFieldValues(entries, field) {
  const seen = new Set();
  const duplicates = new Set();
  for (const { body } of entries) {
    const value = fieldValue(body, field);
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }
  return [...duplicates];
}

function universallyMandatoryChecks(checks) {
  const universal = /^(?:always|all cases|every case|unconditional|universal|luôn luôn|mọi trường hợp|vô điều kiện)$/i;
  return checks
    .filter(({ body }) => universal.test(fieldValue(body, "mandatory_when")))
    .map(({ id }) => id);
}

function destinationHasLens(destination, lens) {
  return destination.includes(`(${lens} lens)`) || destination.includes(`(góc nhìn ${lens})`);
}

function assertDesignReadinessInventory(reference, language) {
  const entries = designReadinessEntries(reference);
  const checks = contractEntries(entries, "DR-C");
  const questions = contractEntries(entries, "DR-Q");
  const cases = caseEntries(entries);
  const checkFields = [
    "trigger",
    "owner_lens",
    "concern_or_invariant",
    "expected_evidence",
    "handoff",
    "verification",
    "mandatory_when",
    "blocking_authority"
  ];
  const questionFields = [
    "trigger",
    "question",
    "destination",
    "expected_evidence",
    "non_selection_guard"
  ];
  const representativeCaseFields = [
    "owner_lens",
    "concern_or_invariant",
    "expected_evidence",
    "handoff",
    "non_selection_guard"
  ];

  assert(
    JSON.stringify(checks.map(({ id }) => id)) === JSON.stringify(expectedDesignReadinessCheckIds),
    `${language}: design-readiness checks must be exactly DR-C01 through DR-C13`
  );
  const missingCheckFields = missingFields(checks, checkFields);
  assert(
    missingCheckFields.length === 0,
    `${language}: every DR-C entry must expose the approved fields; missing ${missingCheckFields.join(", ") || "inventory"}`
  );
  const placeholderCheckFields = placeholderFields(checks, checkFields);
  assert(
    placeholderCheckFields.length === 0,
    `${language}: DR-C fields cannot use placeholder authority or evidence (${placeholderCheckFields.join(", ")})`
  );
  const invalidCheckLenses = checks
    .filter(({ body }, index) => fieldValue(body, "owner_lens") !== expectedDesignReadinessCheckLenses[index])
    .map(({ id }) => id);
  assert(
    invalidCheckLenses.length === 0,
    `${language}: DR-C owner-lens routing does not match the approved contract (${invalidCheckLenses.join(", ")})`
  );

  assert(
    JSON.stringify(questions.map(({ id }) => id)) === JSON.stringify(expectedDesignReadinessQuestionIds),
    `${language}: design-readiness questions/handoffs must be exactly DR-Q01 through DR-Q10`
  );
  const missingQuestionFields = missingFields(questions, questionFields);
  assert(
    missingQuestionFields.length === 0,
    `${language}: every DR-Q entry must expose the approved fields; missing ${missingQuestionFields.join(", ") || "inventory"}`
  );
  const placeholderQuestionFields = placeholderFields(questions, questionFields);
  assert(
    placeholderQuestionFields.length === 0,
    `${language}: DR-Q fields cannot use placeholders (${placeholderQuestionFields.join(", ")})`
  );
  const invalidQuestionLenses = questions
    .filter(({ body }, index) =>
      !destinationHasLens(fieldValue(body, "destination"), expectedDesignReadinessQuestionLenses[index])
    )
    .map(({ id }) => id);
  assert(
    invalidQuestionLenses.length === 0,
    `${language}: DR-Q owner-lens routing does not match the approved contract (${invalidQuestionLenses.join(", ")})`
  );

  assert(
    JSON.stringify(cases.map(({ id }) => id).sort()) === JSON.stringify([...expectedDesignReadinessCases].sort()),
    `${language}: representative cases must be exactly the six approved readiness scenarios`
  );
  const missingCaseFields = missingFields(cases, representativeCaseFields);
  assert(
    missingCaseFields.length === 0,
    `${language}: every representative case must preserve routing and non-selection evidence; missing ${missingCaseFields.join(", ") || "inventory"}`
  );
  const placeholderCaseFields = placeholderFields(cases, representativeCaseFields);
  assert(
    placeholderCaseFields.length === 0,
    `${language}: representative-case fields cannot use placeholders (${placeholderCaseFields.join(", ")})`
  );
  for (const { id, body } of cases) {
    const expected = expectedDesignReadinessCaseContracts[id];
    if (!expected) {
      continue;
    }
    const handoff = fieldValue(body, "handoff");
    assert(
      fieldValue(body, "owner_lens") === expected.ownerLens,
      `${language}: ${id} must route through the ${expected.ownerLens.toUpperCase()} lens`
    );
    for (const reference of expected.references) {
      assert(handoff.includes(reference), `${language}: ${id} must route through ${reference}`);
    }
    for (const destination of expected.destinations) {
      assert(handoff.includes(destination), `${language}: ${id} must hand off to ${destination}`);
    }
  }

  const invalidMandatoryChecks = universallyMandatoryChecks(checks);
  assert(
    invalidMandatoryChecks.length === 0,
    `${language}: checks cannot become universally mandatory without named authority (${invalidMandatoryChecks.join(", ")})`
  );
  assert(
    duplicateFieldValues(checks, "concern_or_invariant").length === 0,
    `${language}: DR-C normative concerns must be unique`
  );
  assert(
    duplicateFieldValues(questions, "question").length === 0,
    `${language}: DR-Q normative questions must be unique`
  );
}

function testDesignReadinessNegativeFixtures() {
  const placeholderFixture = [{
    id: "DR-NEGATIVE",
    body: '\n    trigger: "TBD"\n    blocking_authority: "none"'
  }];
  assert(
    JSON.stringify(placeholderFields(placeholderFixture, ["trigger", "blocking_authority"])) ===
      JSON.stringify(["DR-NEGATIVE.trigger", "DR-NEGATIVE.blocking_authority"]),
    "design-readiness validator must reject placeholder evidence and blocking authority"
  );
  const universalFixture = [{ id: "DR-NEGATIVE", body: '\n    mandatory_when: "all cases"' }];
  assert(
    JSON.stringify(universallyMandatoryChecks(universalFixture)) === JSON.stringify(["DR-NEGATIVE"]),
    "design-readiness validator must reject an unanchored universal mandate"
  );
  console.log("  PASS: design-readiness negative validation fixtures checked");
}

function testDesignReadinessReferencesAndContract() {
  const failuresBefore = failures;
  const references = {
    saEn: "skills/analysis/sa/references/design-readiness-checklist.md",
    saVi: "skills/analysis/sa/references/design-readiness-checklist.vi.md",
    taEn: "skills/analysis/ta/references/design-readiness-checklist.md",
    taVi: "skills/analysis/ta/references/design-readiness-checklist.vi.md"
  };
  const content = Object.fromEntries(
    Object.entries(references).map(([key, relativePath]) => [key, readIfExists(relativePath)])
  );

  for (const [key, relativePath] of Object.entries(references)) {
    assert(content[key].trim().length > 0, `${relativePath}: canonical design-readiness reference must exist and be non-empty`);
  }
  assert(content.saEn === content.taEn, "design-readiness-checklist.md must stay byte-identical across SA/TA");
  assert(content.saVi === content.taVi, "design-readiness-checklist.vi.md must stay byte-identical across SA/TA");

  assertDesignReadinessInventory(content.saEn, "EN");
  assertDesignReadinessInventory(content.saVi, "VI");

  for (const [key, reference] of Object.entries(content)) {
    assert(
      /^\s*advisory_by_default:\s*true\s*$/m.test(reference) &&
        /^\s*emit_only_applicable:\s*true\s*$/m.test(reference) &&
        /^\s*not_applicable_behavior:\s*omit\s*$/m.test(reference) &&
        /^\s*blocking_requires_named_authority:\s*true\s*$/m.test(reference) &&
        /^\s*map_to_existing_output_only:\s*true\s*$/m.test(reference),
      `${references[key]}: must declare applicability, advisory-default, named-authority, and existing-output rules`
    );
    assert(
      reference.includes("system-design") && reference.includes("architecture-modeling"),
      `${references[key]}: must preserve downstream design and modeling authority`
    );
    assert(
      !/(?:human-capability-documents|docs\/design\.md|\bHCP\b|\bR-\d{2}\b)/i.test(reference),
      `${references[key]}: private source path, acronym, or rule ID must not leak into public guidance`
    );
    assert(
      !/^\s*design_readiness:\s*$/m.test(reference) &&
        !/\b(?:recommended_solution|selected_technology|chosen_pattern|schema_choice|domain_boundary_choice|diagram_choice|architecture_model_choice)\s*:/i.test(reference) &&
        !/^\s*(?:apply_all_checks|emit_full_checklist):\s*true\s*$/mi.test(reference),
      `${references[key]}: must not add an output block, select a solution, or dump the checklist`
    );
  }

  for (const lens of ["sa", "ta"]) {
    for (const languageSuffix of ["", ".vi"]) {
      for (const relativePath of [
        `skills/analysis/${lens}/SKILL${languageSuffix}.md`,
        `skills/analysis/${lens}/references/output-schema${languageSuffix}.md`
      ]) {
        assert(
          !/^\s*design_readiness:\s*$/m.test(read(relativePath)),
          `${relativePath}: existing output contract must not gain a design_readiness block`
        );
      }
    }
  }
  if (failures === failuresBefore) {
    console.log("  PASS: design-readiness reference inventory, authority, confidentiality, and behavior contract checked");
  }
}

function testDesignReadinessSkillHooks() {
  const failuresBefore = failures;
  const hooks = [
    ["skills/analysis/sa/SKILL.md", "references/design-readiness-checklist.md", "**Anchor every driver", "**Fill the handoff blocks"],
    ["skills/analysis/ta/SKILL.md", "references/design-readiness-checklist.md", "**Anchor every driver", "**Fill the handoff blocks"],
    ["skills/analysis/sa/SKILL.vi.md", "references/design-readiness-checklist.vi.md", "**Chỉ rõ ai đứng sau mỗi driver", "**Điền khối bàn giao"],
    ["skills/analysis/ta/SKILL.vi.md", "references/design-readiness-checklist.vi.md", "**Chỉ rõ ai đứng sau mỗi driver", "**Điền khối bàn giao"]
  ];

  for (const [relativePath, referencePath, driverAnchor, handoffAnchor] of hooks) {
    const skill = read(relativePath);
    const hookIndex = skill.indexOf(referencePath);
    assert(
      !/(?:human-capability-documents|docs\/design\.md|\bHCP\b|\bR-\d{2}\b)/i.test(skill),
      `${relativePath}: private source path, acronym, or rule ID must not leak into skill instructions`
    );
    assert(
      !/\b(?:recommended_solution|selected_technology|chosen_pattern|schema_choice|domain_boundary_choice|diagram_choice|architecture_model_choice)\s*:/i.test(skill) &&
        !/^\s*(?:apply_all_checks|emit_full_checklist):\s*true\s*$/mi.test(skill),
      `${relativePath}: skill hook must not select a solution or dump the checklist`
    );
    assert(hookIndex >= 0, `${relativePath}: execution flow must invoke ${referencePath}`);
    if (hookIndex >= 0) {
      assert(
        hookIndex > skill.indexOf(driverAnchor) && hookIndex < skill.indexOf(handoffAnchor),
        `${relativePath}: design-readiness hook must run after driver extraction and before handoff/metrics`
      );
      const hookTail = skill.slice(hookIndex);
      const nextStepOffset = hookTail.slice(1).search(/^\d+\.\s/m);
      const hookStep = nextStepOffset < 0 ? hookTail : hookTail.slice(0, nextStepOffset + 1);
      assert(
        /(?:applicable|relevant|áp dụng|liên quan)/i.test(hookStep) &&
          /(?:drivers|input_issues|handoff)/.test(hookStep),
        `${relativePath}: hook must filter for relevance and map only to existing output fields`
      );
    }
  }
  if (failures === failuresBefore) {
    console.log("  PASS: concise EN/VI SA/TA design-readiness invocation hooks checked");
  }
}

console.log("Running architecture role skills contract tests...\n");
testYamlSchemasAndExamples();
testLensOwnershipAndExamples();
testMetricInventoryAndCoverageValues();
testSharedReferenceParityAndMetadata();
testBilingualSemanticParity();
testDesignReadinessNegativeFixtures();
testDesignReadinessReferencesAndContract();
testDesignReadinessSkillHooks();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in architecture-role-skills-contract.test.js`);
  process.exit(1);
}
console.log("\nOK: architecture-role-skills-contract.test.js passed");
