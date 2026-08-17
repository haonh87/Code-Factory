const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const skillRoot = path.join(repoRoot, "skills", "architecture", "architecture-modeling");
const expectedFiles = [
  "SKILL.md",
  "SKILL.vi.md",
  "agents/openai.yaml",
  "references/model-contract.md",
  "references/model-contract.vi.md",
  "references/render-routing.md",
  "references/render-routing.vi.md",
  "references/quality-contract.md",
  "references/quality-contract.vi.md"
];
let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(skillRoot, relativePath), "utf8");
}

function assertIncludesAll(content, tokens, label) {
  tokens.forEach((token) => assert(content.includes(token), `${label}: missing '${token}'`));
}

function frontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return match ? match[1] : "";
}

function assertFilesPresent() {
  expectedFiles.forEach((relativePath) => {
    assert(fs.existsSync(path.join(skillRoot, relativePath)), `missing canonical file ${relativePath}`);
  });
}

function assertTriggerAndBoundaryContract() {
  const en = read("SKILL.md");
  const vi = read("SKILL.vi.md");
  const enFrontmatter = frontmatter(en);
  const viFrontmatter = frontmatter(vi);

  assert(/name:\s*architecture-modeling/.test(enFrontmatter), "English frontmatter name must be architecture-modeling");
  assert(/language:\s*en/.test(enFrontmatter), "English frontmatter language must be en");
  assert(/name:\s*architecture-modeling/.test(viFrontmatter), "Vietnamese frontmatter name must be architecture-modeling");
  assert(/language:\s*vi/.test(viFrontmatter), "Vietnamese frontmatter language must be vi");

  [enFrontmatter, viFrontmatter].forEach((metadata, index) => {
    const label = index === 0 ? "English description" : "Vietnamese description";
    assertIncludesAll(
      metadata.toLowerCase(),
      ["system landscape", "overall architecture", "integration architecture", "deployment topology"],
      label
    );
  });

  assertIncludesAll(en, ["s05 Technical Approach", "domain-architecture", "deployment manifests"], "English boundary");
  assertIncludesAll(vi, ["s05 Technical Approach", "domain-architecture", "manifest triển khai"], "Vietnamese boundary");
}

function assertResourceMapAndNoOrphans() {
  for (const skillFile of ["SKILL.md", "SKILL.vi.md"]) {
    const content = read(skillFile);
    assert(content.includes("references/model-contract"), `${skillFile}: model contract resource missing`);
    assert(content.includes("references/render-routing"), `${skillFile}: render routing resource missing`);
    assert(content.includes("references/quality-contract"), `${skillFile}: quality contract resource missing`);
    const refs = [...content.matchAll(/references\/[a-z0-9.-]+\.md/g)].map((match) => match[0]);
    assert(refs.length >= 3, `${skillFile}: expected at least three explicit resource refs`);
    refs.forEach((reference) => {
      assert(fs.existsSync(path.join(skillRoot, reference)), `${skillFile}: orphan resource ref ${reference}`);
    });
  }
}

function assertModelAndViewContract() {
  const pair = [read("references/model-contract.md"), read("references/model-contract.vi.md")];
  pair.forEach((content, index) => {
    const label = index === 0 ? "model contract EN" : "model contract VI";
    assertIncludesAll(
      content,
      [
        "architecture_state",
        "model_source",
        "model_format",
        "system_id",
        "integration_id",
        "business_views",
        "engineering_views",
        "source_fact_ids",
        "ARCHITECTURE_YAML",
        "STRUCTURIZR_DSL"
      ],
      label
    );
    assert(/one model|một model/i.test(content), `${label}: must state one-model invariant`);
  });
}

function assertRenderOwnershipContract() {
  const pair = [read("references/render-routing.md"), read("references/render-routing.vi.md")];
  pair.forEach((content, index) => {
    const label = index === 0 ? "render routing EN" : "render routing VI";
    assertIncludesAll(
      content,
      [
        "LANDSCAPE: DRAWIO",
        "INTEGRATION_ARCHITECTURE: DRAWIO",
        "FLOW: MERMAID",
        "SEQUENCE: MERMAID",
        "MULTI_VIEW_MODEL_AS_CODE: STRUCTURIZR_DSL",
        "render_owner",
        "HOUSE_SKILL",
        "ARCHITECTURE_MODELING",
        "UNRESOLVED",
        "exactly_one_render_owner",
        "built_in_renderer",
        "handoff"
      ],
      label
    );
    assertIncludesAll(content, ["case_id: no-house", "case_id: house", "case_id: unresolved"], `${label} cases`);
    assert(/MERMAID[^\n]*(?:only|chỉ)[^\n]*(?:flow|sequence)/i.test(content), `${label}: Mermaid must be flow/sequence only`);
  });
}

function assertQualityContract() {
  const pair = [read("references/quality-contract.md"), read("references/quality-contract.vi.md")];
  pair.forEach((content, index) => {
    assertIncludesAll(
      content,
      [
        "named_ownership_rate",
        "overlap_count",
        "non_endpoint_intersection_count",
        "unanalyzed_two_way_arrow_count",
        "vague_aggregate_box_count",
        "engineering_element_count",
        "delete_test_failure_count",
        "containment_error_count",
        "manual_step_count"
      ],
      index === 0 ? "quality contract EN" : "quality contract VI"
    );
  });
}

function assertAgentsMetadata() {
  const metadata = read("agents/openai.yaml");
  assertIncludesAll(metadata, ["display_name:", "short_description:", "default_prompt:", "$architecture-modeling"], "agents metadata");
  const shortDescription = metadata.match(/^\s*short_description:\s*["']?([^"'\n]+)["']?\s*$/m);
  assert(shortDescription && shortDescription[1].trim().length >= 25, "agents short_description must be at least 25 characters");
  assert(shortDescription && shortDescription[1].trim().length <= 64, "agents short_description must be at most 64 characters");
}

function assertBilingualContractParity() {
  const pairs = [
    ["SKILL.md", "SKILL.vi.md"],
    ["references/model-contract.md", "references/model-contract.vi.md"],
    ["references/render-routing.md", "references/render-routing.vi.md"],
    ["references/quality-contract.md", "references/quality-contract.vi.md"]
  ];
  const contractTokens = [
    "ARCHITECTURE_YAML",
    "STRUCTURIZR_DSL",
    "DRAWIO",
    "MERMAID",
    "HOUSE_SKILL",
    "ARCHITECTURE_MODELING",
    "UNRESOLVED"
  ];
  pairs.forEach(([enPath, viPath]) => {
    const en = read(enPath);
    const vi = read(viPath);
    contractTokens.forEach((token) => {
      assert(en.includes(token) === vi.includes(token), `${enPath}/${viPath}: token parity mismatch for ${token}`);
    });
  });
}

console.log("Running architecture-modeling public contract tests...\n");
assertFilesPresent();
if (expectedFiles.every((relativePath) => fs.existsSync(path.join(skillRoot, relativePath)))) {
  assertTriggerAndBoundaryContract();
  assertResourceMapAndNoOrphans();
  assertModelAndViewContract();
  assertRenderOwnershipContract();
  assertQualityContract();
  assertAgentsMetadata();
  assertBilingualContractParity();
}

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in architecture-modeling-contract.test.js`);
  process.exit(1);
}
console.log("OK: architecture-modeling-contract.test.js passed");
