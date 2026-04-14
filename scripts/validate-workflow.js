const { formatErrors, parseCliArgs } = require("./workflow-validator-utils");
const { validateWorkflowArtifactNames } = require("./validate-workflow-artifact-names");
const { validateWorkflowGovernance } = require("./validate-workflow-governance");

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  try {
    const workflowRoot = args["workflow-root"];
    const projectRoot = args["project-root"];
    const namingResult = validateWorkflowArtifactNames({ workflowRoot });
    const governanceResult = validateWorkflowGovernance({ workflowRoot, projectRoot });
    const errors = [...namingResult.errors, ...governanceResult.errors];

    if (errors.length > 0) {
      console.error(formatErrors(errors));
      process.exit(1);
    }

    console.log(
      `OK: validated workflow naming (${namingResult.validatedCount} files) and governance (${governanceResult.validatedCount} notes) under ${namingResult.workflowRoot}`
    );
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}
