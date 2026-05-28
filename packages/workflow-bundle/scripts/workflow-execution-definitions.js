const EXECUTION_MODES = ["agentic", "multi_agent"];
const REVIEW_MODES = ["self", "independent", "auto_fix_loop"];

const EXECUTION_RUNTIME_ARTIFACTS = [
  {
    stepId: "s05",
    stepSlug: "execution-policy",
    extension: "md",
    title: "Execution Policy",
    artifactKind: "execution-policy",
    summary: "Ghi lại lý do chọn execution mode, coordinator, verification owner và fallback cho step.",
    buildSections(context) {
      return [
        yamlSection("## Artifact Chính", [
          "execution_mode: multi_agent",
          "selection_reason: []",
          "complexity_signals: []",
          `shared_contract_ref: "${context.workItemSlug}.s05.technical-approach.md#step-contract"`,
          "parallel_budget: 1|2|3|4",
          'coordinator_role: ""',
          `verification_owner: "${context.verificationOwner}"`,
          "fallback_mode: agentic|sequential_multi_role",
          "external_research:",
          "  notebooklm: NONE|OPTIONAL|REQUIRED",
          "  expected_outputs: []",
          'notes: ""'
        ]),
        markdownSection("## Links", [
          `- Parent note: ${context.workItemSlug}.s05.technical-approach.md`,
          `- Shared contract ref: ${context.workItemSlug}.s05.technical-approach.md#step-contract`
        ])
      ];
    }
  },
  {
    stepId: "s06",
    stepSlug: "worker-assignment",
    extension: "md",
    title: "Worker Assignment",
    artifactKind: "worker-assignment",
    summary: "Ghi lại phân công worker, owned scope và done_when cho execution runtime.",
    buildSections(context) {
      return [
        yamlSection("## Artifact Chính", [
          'assignment_id: ""',
          "step_id: s06",
          `shared_contract_ref: "${context.workItemSlug}.s06.task-breakdown.md#step-contract"`,
          'role: ""',
          "owned_scope: []",
          "owned_paths: []",
          "skills: []",
          "inputs: []",
          "done_when: []",
          "depends_on: []",
          "status: PLANNED|READY|IN_PROGRESS|HANDOFF|MERGED|BLOCKED|CANCELLED",
          "handoff_format: worker-handoff-report"
        ]),
        markdownSection("## Links", [
          `- Parent note: ${context.workItemSlug}.s06.task-breakdown.md`,
          `- Shared contract ref: ${context.workItemSlug}.s06.task-breakdown.md#step-contract`
        ])
      ];
    }
  },
  {
    stepId: "s07",
    stepSlug: "worker-handoff-report",
    extension: "md",
    title: "Worker Handoff Report",
    artifactKind: "worker-handoff-report",
    summary: "Ghi lại handoff từ worker về coordinator cùng evidence và open issues.",
    buildSections(context) {
      return [
        yamlSection("## Artifact Chính", [
          'assignment_id: ""',
          'role: ""',
          "status: HANDOFF|BLOCKED|PARTIAL",
          'summary: ""',
          "outputs_produced: []",
          "artifact_refs: []",
          "code_refs: []",
          "evidence: []",
          "external_tools_used:",
          "  - tool: \"\"",
          "    purpose: \"\"",
          "    refs: []",
          "open_issues: []",
          'recommended_next_action: ""'
        ]),
        markdownSection("## Links", [
          `- Parent note: ${context.workItemSlug}.s07.implementation.md`
        ])
      ];
    }
  },
  {
    stepId: "s07",
    stepSlug: "merge-report",
    extension: "md",
    title: "Merge Report",
    artifactKind: "merge-report",
    summary: "Ghi lại output đã merge, conflict đã xử lý và readiness cho audit cuối step.",
    buildSections(context) {
      return [
        yamlSection("## Artifact Chính", [
          "step_id: s07",
          "execution_mode: multi_agent",
          'coordinator_role: ""',
          "merged_assignments: []",
          "rejected_assignments: []",
          "conflicts_resolved: []",
          "source_of_truth_updated: true|false",
          "final_artifacts: []",
          "residual_risks: []",
          "ready_for_audit: true|false"
        ]),
        markdownSection("## Links", [
          `- Parent note: ${context.workItemSlug}.s07.implementation.md`
        ])
      ];
    }
  },
  {
    stepId: "s08",
    stepSlug: "execution-escalation",
    extension: "md",
    title: "Execution Escalation",
    artifactKind: "execution-escalation",
    summary: "Ghi lại escalation khi runtime execution không thể đóng step theo contract hiện tại.",
    buildSections(context) {
      return [
        yamlSection("## Artifact Chính", [
          "step_id: s08",
          'raised_by_role: ""',
          'severity: LOW|MEDIUM|HIGH|CRITICAL',
          'reason: ""',
          "blocking_items: []",
          "requested_actions: []",
          `verification_owner: "${context.verificationOwner}"`,
          "status: OPEN|ACKNOWLEDGED|RESOLVED|REJECTED"
        ]),
        markdownSection("## Links", [
          `- Parent note: ${context.workItemSlug}.s08.verification.md`
        ])
      ];
    }
  }
];

const REQUIRED_EXECUTION_ARTIFACTS_BY_STEP = {
  s05: ["execution-policy"],
  s06: ["worker-assignment"],
  s07: ["worker-handoff-report", "merge-report"]
};

function yamlSection(heading, lines) {
  return {
    heading,
    language: "yaml",
    lines
  };
}

function markdownSection(heading, lines) {
  return {
    heading,
    language: null,
    lines
  };
}

function getExecutionArtifactDefinitions(stepId) {
  return EXECUTION_RUNTIME_ARTIFACTS.filter((artifact) => artifact.stepId === stepId);
}

function getRequiredExecutionArtifacts(stepId, executionMode) {
  if (executionMode !== "multi_agent") {
    return [];
  }

  const requiredSlugs = new Set(REQUIRED_EXECUTION_ARTIFACTS_BY_STEP[stepId] || []);
  return getExecutionArtifactDefinitions(stepId).filter((artifact) => requiredSlugs.has(artifact.stepSlug));
}

function buildExecutionArtifactFrontmatter(definition, context) {
  return [
    "---",
    `artifact_id: "${context.workItemSlug}.${definition.stepId}.${definition.stepSlug}"`,
    "artifact_family: workflow-runtime-artifact",
    `work_item_slug: "${context.workItemSlug}"`,
    `step_id: "${definition.stepId}"`,
    `step_slug: "${definition.stepSlug}"`,
    'workflow_stage: "delivery"',
    "artifact_role: secondary",
    `artifact_kind: "${definition.artifactKind}"`,
    "source_of_truth: false",
    "status: draft",
    `execution_mode: "${context.executionMode}"`,
    `review_mode: "${context.reviewMode}"`,
    `verification_owner: "${context.verificationOwner}"`,
    "---"
  ].join("\n");
}

function renderExecutionArtifactBody(definition, context) {
  const parts = [
    `# Step ${Number(definition.stepId.slice(1))} - ${definition.title}`,
    "",
    "> [!summary]",
    `> ${definition.summary}`,
    ""
  ];

  definition.buildSections(context).forEach((section, index, list) => {
    parts.push(section.heading);
    if (section.language) {
      parts.push(`\`\`\`${section.language}`);
      parts.push(...section.lines);
      parts.push("```");
    } else {
      parts.push(...section.lines);
    }

    if (index < list.length - 1) {
      parts.push("");
    }
  });

  return `${buildExecutionArtifactFrontmatter(definition, context)}\n\n${parts.join("\n")}\n`;
}

module.exports = {
  EXECUTION_MODES,
  REVIEW_MODES,
  EXECUTION_RUNTIME_ARTIFACTS,
  getExecutionArtifactDefinitions,
  getRequiredExecutionArtifacts,
  renderExecutionArtifactBody
};
