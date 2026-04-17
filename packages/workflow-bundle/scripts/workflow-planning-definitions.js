const PLANNING_TRACKS = ["quick", "full", "enterprise"];

const DEFAULTS_BY_TRACK = {
  quick: {
    governanceProfile: "default",
    sddMode: "none",
    executionMode: "agentic",
    reviewMode: "self",
    verificationOwner: ""
  },
  full: {
    governanceProfile: "default",
    sddMode: "none",
    executionMode: "agentic",
    reviewMode: "self",
    verificationOwner: ""
  },
  enterprise: {
    governanceProfile: "strict",
    sddMode: "none",
    executionMode: "agentic",
    reviewMode: "independent",
    verificationOwner: "auditor"
  }
};

function getPlanningDefaults(planningTrack) {
  return DEFAULTS_BY_TRACK[planningTrack] || DEFAULTS_BY_TRACK.full;
}

module.exports = {
  PLANNING_TRACKS,
  DEFAULTS_BY_TRACK,
  getPlanningDefaults
};
