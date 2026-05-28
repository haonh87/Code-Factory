const path = require("path");
const { loadPackageModule, runPackageScript } = require("./_workflow-bundle-shim");

const scriptName = path.basename(__filename);

module.exports = loadPackageModule(scriptName);

if (require.main === module) {
  runPackageScript(scriptName);
}
