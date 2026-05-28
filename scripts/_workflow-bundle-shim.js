const path = require("path");
const { execFileSync } = require("child_process");

function getPackageScriptPath(scriptName) {
  return path.resolve(__dirname, "..", "packages", "workflow-bundle", "scripts", scriptName);
}

function loadPackageModule(scriptName) {
  return require(getPackageScriptPath(scriptName));
}

function runPackageScript(scriptName, args = process.argv.slice(2)) {
  try {
    execFileSync(process.execPath, [getPackageScriptPath(scriptName), ...args], {
      stdio: "inherit"
    });
  } catch (error) {
    if (typeof error.status === "number") {
      process.exit(error.status);
    }

    console.error(`ERROR: failed to run ${scriptName}: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  getPackageScriptPath,
  loadPackageModule,
  runPackageScript
};
