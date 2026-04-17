const path = require("path");
const {
  collectFilesRecursive,
  formatErrors,
  getFrontmatterLines,
  getFrontmatterValue,
  parseCliArgs,
  resolveExistingPath
} = require("./workflow-validator-utils");
const { PLANNING_TRACKS } = require("./workflow-planning-definitions");

const filePattern =
  /^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<step_id>s0[1-8])\.(?<step_slug>[a-z-]+)\.md$/;
const allowedPlanningTracks = new Set(PLANNING_TRACKS);
const enterpriseDeliverySteps = new Set(["s05", "s06", "s07", "s08"]);

function getTrackValue(frontmatterLines) {
  return getFrontmatterValue(frontmatterLines, "planning_track") || "full";
}

function validateWorkflowPlanning(options) {
  const workflowRoot = resolveExistingPath(options.workflowRoot, "workflow-root");
  const files = collectFilesRecursive(workflowRoot, new Set([".md"]));
  const errors = [];
  const workItemTrackMap = new Map();
  let validatedCount = 0;

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    const match = fileName.match(filePattern);
    if (!match || !match.groups) {
      continue;
    }

    const frontmatterLines = getFrontmatterLines(filePath);
    if (!frontmatterLines) {
      continue;
    }

    const artifactFamily = getFrontmatterValue(frontmatterLines, "artifact_family");
    const artifactRole = getFrontmatterValue(frontmatterLines, "artifact_role");
    if (artifactFamily !== "workflow-step" || artifactRole !== "primary") {
      continue;
    }

    validatedCount += 1;

    const workItemSlug = match.groups.work_item_slug;
    const stepId = match.groups.step_id;
    const planningTrack = getTrackValue(frontmatterLines);
    const executionMode = getFrontmatterValue(frontmatterLines, "execution_mode") || "agentic";
    const reviewMode = getFrontmatterValue(frontmatterLines, "review_mode") || "self";
    const verificationOwner = getFrontmatterValue(frontmatterLines, "verification_owner") || "";
    const governanceProfile = getFrontmatterValue(frontmatterLines, "governance_profile") || "default";
    const sddMode = getFrontmatterValue(frontmatterLines, "sdd_mode") || "none";

    if (!allowedPlanningTracks.has(planningTrack)) {
      errors.push(`Invalid planning_track '${planningTrack}' in ${filePath}`);
      continue;
    }

    const existingTrack = workItemTrackMap.get(workItemSlug);
    if (!existingTrack) {
      workItemTrackMap.set(workItemSlug, planningTrack);
    } else if (existingTrack !== planningTrack) {
      errors.push(`Inconsistent planning_track within work item '${workItemSlug}': ${filePath}`);
    }

    if (planningTrack === "quick") {
      if (executionMode !== "agentic") {
        errors.push(`quick planning_track requires execution_mode 'agentic': ${filePath}`);
      }

      if (reviewMode !== "self") {
        errors.push(`quick planning_track requires review_mode 'self': ${filePath}`);
      }

      if (sddMode === "strict") {
        errors.push(`quick planning_track cannot use sdd_mode 'strict': ${filePath}`);
      }
    }

    if (planningTrack === "enterprise") {
      if (governanceProfile === "default") {
        errors.push(`enterprise planning_track requires stricter governance_profile than 'default': ${filePath}`);
      }

      if (enterpriseDeliverySteps.has(stepId) && reviewMode === "self") {
        errors.push(`enterprise planning_track requires delivery-step review_mode not equal to 'self': ${filePath}`);
      }

      if (enterpriseDeliverySteps.has(stepId) && !verificationOwner) {
        errors.push(`enterprise planning_track requires verification_owner on delivery steps: ${filePath}`);
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    validatedCount,
    workflowRoot
  };
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  try {
    const result = validateWorkflowPlanning({
      workflowRoot: args["workflow-root"]
    });

    if (!result.ok) {
      console.error(formatErrors(result.errors));
      process.exit(1);
    }

    console.log(`OK: validated planning track for ${result.validatedCount} workflow note files under ${result.workflowRoot}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  validateWorkflowPlanning
};
