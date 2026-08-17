#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { buildDrawioXml } = require("./render-drawio");

function validateXmlEnvelope(xml) {
  if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    throw new Error("Drawio XML must declare UTF-8.");
  }
  ["<mxfile", "<diagram", "<mxGraphModel", "<root>", "</root>", "</mxGraphModel>", "</diagram>", "</mxfile>"].forEach(
    (token) => {
      if (!xml.includes(token)) throw new Error(`Drawio XML missing '${token}'.`);
    }
  );
  if (/compressed="true"/.test(xml)) {
    throw new Error("Drawio XML must stay uncompressed.");
  }

  const cellIds = [...xml.matchAll(/<mxCell\s+id="([^"]+)"/g)].map((match) => match[1]);
  const uniqueIds = new Set(cellIds);
  if (cellIds.length !== uniqueIds.size) {
    throw new Error("Drawio XML contains duplicate mxCell IDs.");
  }
  if (!uniqueIds.has("0") || !uniqueIds.has("1")) {
    throw new Error("Drawio XML is missing mxGraph root cells 0/1.");
  }
}

function validateDrawio({ input, xml }) {
  validateXmlEnvelope(xml);
  const expected = buildDrawioXml(input);
  if (xml !== expected.xml) {
    throw new Error("Drawio XML deterministic structure mismatch against the supplied model.");
  }
  return {
    ...expected.report,
    status: "PARTIAL",
    automated_status: "PASS",
    deterministic_match: true
  };
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
    if (!args.input || !args.drawio) {
      throw new Error("Usage: validate-drawio.js --input <model.json> --drawio <artifact.drawio> [--report <quality.json>]");
    }
    const input = JSON.parse(fs.readFileSync(path.resolve(args.input), "utf8"));
    const xml = fs.readFileSync(path.resolve(args.drawio), "utf8");
    const report = validateDrawio({ input, xml });
    report.output_path = args.drawio;
    if (args.report) {
      fs.mkdirSync(path.dirname(args.report), { recursive: true });
      fs.writeFileSync(args.report, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    }
    console.log(
      `OK: validated ${args.drawio} | deterministic_match=true | overlaps=${report.metrics.overlap_count} | intersections=${report.metrics.non_endpoint_intersection_count}`
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
  validateDrawio,
  validateXmlEnvelope
};
