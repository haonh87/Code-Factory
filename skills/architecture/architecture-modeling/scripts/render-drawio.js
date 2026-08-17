#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { buildLayout } = require("./drawio-layout");

const SUPPORTED_VIEW_KINDS = new Set(["LANDSCAPE", "INTEGRATION_ARCHITECTURE"]);

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function labelXml(value) {
  return escapeXml(value).replace(/\r?\n/g, "&#xa;");
}

function assertRenderContract(input) {
  const plan = input && input.render_plan;
  const view = input && input.requested_view;
  if (!plan || !plan.render_owner) {
    throw new Error("render_plan.render_owner is required before rendering.");
  }
  if (Array.isArray(plan.render_owners) && plan.render_owners.length !== 1) {
    throw new Error("Drawio rendering requires exactly one render owner.");
  }
  if (Array.isArray(plan.render_owners) && plan.render_owners[0] !== plan.render_owner) {
    throw new Error("Drawio rendering requires exactly one render owner with no conflicting owner list.");
  }
  if (plan.render_owner === "HOUSE_SKILL" || plan.built_in_renderer === "MUST_NOT_RUN") {
    throw new Error("HOUSE_SKILL owns this artifact; built-in renderer MUST_NOT_RUN.");
  }
  if (plan.render_owner !== "ARCHITECTURE_MODELING") {
    throw new Error(`Built-in renderer refuses render_owner='${plan.render_owner}'.`);
  }
  if (plan.owner_skill !== "architecture-modeling" || plan.built_in_renderer !== "REQUIRED") {
    throw new Error("ARCHITECTURE_MODELING ownership requires owner_skill=architecture-modeling and built_in_renderer=REQUIRED.");
  }
  if (plan.exactly_one_render_owner !== true) {
    throw new Error("Drawio rendering requires exactly one render owner.");
  }
  if (!view || !SUPPORTED_VIEW_KINDS.has(view.kind)) {
    throw new Error(`Built-in drawio renderer received unsupported view kind '${view && view.kind}'.`);
  }
  if (view.render_format !== "DRAWIO") {
    throw new Error(`Supported view '${view.kind}' requires render_format=DRAWIO.`);
  }
}

function geometryElement({ x, y, width, height }, relative = false) {
  const relativeAttribute = relative ? ' relative="1"' : "";
  return `<mxGeometry x="${x}" y="${y}" width="${width}" height="${height}"${relativeAttribute} as="geometry"/>`;
}

function buildDrawioXml(input) {
  assertRenderContract(input);
  const layout = buildLayout(input);
  if (layout.automatedStatus !== "PASS") {
    throw new Error(`Automated landscape quality failed: ${JSON.stringify(layout.metrics)}`);
  }

  const model = input.architecture_model;
  const view = input.requested_view;
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<mxfile host="app.diagrams.net" agent="architecture-modeling" version="24.7.17">',
    `  <diagram id="${escapeXml(`diagram:${model.model_id}`)}" name="${escapeXml(view.view_id || view.kind)}">`,
    `    <mxGraphModel dx="${layout.canvas.width}" dy="${layout.canvas.height}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${layout.canvas.width}" pageHeight="${layout.canvas.height}" math="0" shadow="0">`,
    "      <root>",
    '        <mxCell id="0"/>',
    '        <mxCell id="1" parent="0"/>'
  ];

  layout.domains.forEach((domain) => {
    lines.push(
      `        <mxCell id="${escapeXml(`domain:${domain.boundaryId}`)}" value="${labelXml(domain.name)}" style="swimlane;html=1;rounded=1;startSize=32;horizontal=1;fillColor=#f5f5f5;strokeColor=#666666;fontStyle=1;" vertex="1" parent="1">`,
      `          ${geometryElement(domain)}`,
      "        </mxCell>"
    );
  });

  layout.nodes.forEach((node) => {
    const value = `${node.name}\nOwner: ${node.owner}`;
    lines.push(
      `        <mxCell id="${escapeXml(`system:${node.system_id}`)}" value="${labelXml(value)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;align=center;verticalAlign=middle;" vertex="1" parent="${escapeXml(`domain:${node.domain.boundaryId}`)}">`,
      `          ${geometryElement({ x: node.localX, y: node.localY, width: node.width, height: node.height })}`,
      "        </mxCell>"
    );
  });

  layout.edges.forEach((edge) => {
    lines.push(
      `        <mxCell id="${escapeXml(`relationship:${edge.integration_id}`)}" value="${labelXml(edge.business_purpose)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="${escapeXml(`system:${edge.source.system_id}`)}" target="${escapeXml(`system:${edge.target.system_id}`)}">`,
      '          <mxGeometry relative="1" as="geometry">',
      '            <Array as="points">'
    );
    edge.waypoints.forEach((point) => {
      lines.push(`              <mxPoint x="${point.x}" y="${point.y}"/>`);
    });
    lines.push("            </Array>", "          </mxGeometry>", "        </mxCell>");
  });

  lines.push("      </root>", "    </mxGraphModel>", "  </diagram>", "</mxfile>", "");
  const xml = lines.join("\n");
  const manualSteps = ["Open the representative artifact in draw.io for QC first-open confirmation."];
  const report = {
    schema_version: 1,
    status: "PARTIAL",
    automated_status: "PASS",
    model_id: model.model_id,
    model_digest: layout.modelDigest,
    view_id: view.view_id,
    view_kind: view.kind,
    render_owner: input.render_plan.render_owner,
    output_path: "",
    metrics: layout.metrics,
    geometry: {
      canvas: layout.canvas,
      domain_count: layout.domains.length,
      system_count: layout.nodes.length,
      relationship_count: layout.edges.length,
      orthogonal_relationship_count: layout.edges.length
    },
    manual_steps: manualSteps,
    manual_step_count: manualSteps.length,
    manual_review_status: "PENDING_QC_FIRST_OPEN"
  };
  return { xml, report, layout };
}

function renderDrawio({ input, outputPath, reportPath }) {
  if (!outputPath) {
    throw new Error("outputPath is required.");
  }
  const result = buildDrawioXml(input);
  result.report.output_path = outputPath;
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, result.xml, "utf8");
  if (reportPath) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, `${JSON.stringify(result.report, null, 2)}\n`, "utf8");
  }
  return result;
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    args[token.slice(2)] = argv[index + 1];
    index += 1;
  }
  return args;
}

function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (!args.input || !args.output) {
      throw new Error("Usage: render-drawio.js --input <model.json> --output <artifact.drawio> [--report <quality.json>]");
    }
    const input = JSON.parse(fs.readFileSync(path.resolve(args.input), "utf8"));
    const result = renderDrawio({
      input,
      outputPath: args.output,
      reportPath: args.report
    });
    console.log(
      `OK: rendered ${args.output} | model_digest=${result.report.model_digest} | systems=${result.report.geometry.system_count} | relationships=${result.report.geometry.relationship_count}`
    );
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  SUPPORTED_VIEW_KINDS,
  assertRenderContract,
  buildDrawioXml,
  escapeXml,
  renderDrawio
};
