const path = require("path");
const { validateWorkflowArtifactNames } = require("./validate-workflow-artifact-names");
const { validateWorkflowGovernance } = require("./validate-workflow-governance");

const fixtureRoot = path.resolve(__dirname, "..", "tests", "fixtures", "workflow-governance");

const cases = [
  {
    name: "valid-default",
    workflowRoot: path.join(fixtureRoot, "valid-default", "workflow"),
    expectGovernancePass: true
  },
  {
    name: "valid-regulated-waiver",
    workflowRoot: path.join(fixtureRoot, "valid-regulated-waiver", "workflow"),
    expectGovernancePass: true
  },
  {
    name: "valid-custom",
    workflowRoot: path.join(fixtureRoot, "valid-custom", "workflow"),
    expectGovernancePass: true
  },
  {
    name: "invalid-missing-block",
    workflowRoot: path.join(fixtureRoot, "invalid-missing-block", "workflow"),
    expectGovernancePass: false
  },
  {
    name: "invalid-checklist-mismatch",
    workflowRoot: path.join(fixtureRoot, "invalid-checklist-mismatch", "workflow"),
    expectGovernancePass: false
  },
  {
    name: "invalid-waiver-missing-approval",
    workflowRoot: path.join(fixtureRoot, "invalid-waiver-missing-approval", "workflow"),
    expectGovernancePass: false
  },
  {
    name: "invalid-waiver-wrong-authority",
    workflowRoot: path.join(fixtureRoot, "invalid-waiver-wrong-authority", "workflow"),
    expectGovernancePass: false
  },
  {
    name: "invalid-reviewed-gate-pending",
    workflowRoot: path.join(fixtureRoot, "invalid-reviewed-gate-pending", "workflow"),
    expectGovernancePass: false
  },
  {
    name: "invalid-option-count",
    workflowRoot: path.join(fixtureRoot, "invalid-option-count", "workflow"),
    expectGovernancePass: false
  },
  {
    name: "invalid-s07-rule-evidence",
    workflowRoot: path.join(fixtureRoot, "invalid-s07-rule-evidence", "workflow"),
    expectGovernancePass: false
  }
];

function main() {
  const failures = [];

  cases.forEach((fixtureCase) => {
    const namingResult = validateWorkflowArtifactNames({
      workflowRoot: fixtureCase.workflowRoot
    });

    if (!namingResult.ok) {
      failures.push(`[${fixtureCase.name}] naming validator failed unexpectedly:\n${namingResult.errors.join("\n")}`);
      return;
    }

    const governanceResult = validateWorkflowGovernance({
      workflowRoot: fixtureCase.workflowRoot,
      projectRoot: fixtureRoot
    });

    if (governanceResult.ok !== fixtureCase.expectGovernancePass) {
      const statusLine = fixtureCase.expectGovernancePass
        ? "expected governance validator to pass"
        : "expected governance validator to fail";
      const detailLines = governanceResult.errors.length > 0 ? governanceResult.errors.join("\n") : "(no errors)";
      failures.push(`[${fixtureCase.name}] ${statusLine}.\n${detailLines}`);
      return;
    }

    const expectationLabel = fixtureCase.expectGovernancePass ? "PASS" : "EXPECTED_FAIL";
    console.log(`${expectationLabel}: ${fixtureCase.name}`);
  });

  if (failures.length > 0) {
    failures.forEach((failure) => {
      console.error(`ERROR: ${failure}`);
    });
    process.exit(1);
  }

  console.log(`OK: validated ${cases.length} workflow governance fixture cases under ${fixtureRoot}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  main
};
