const {
  EXECUTION_RUNTIME_ARTIFACTS
} = require("./workflow-execution-definitions");

const STEP_DEFINITIONS = [
  {
    stepId: "s01",
    stepSlug: "restate",
    title: "Clarify",
    workflowStage: "discovery",
    contentSkills: [
      "codex-workflow-chain",
      "requirement-analysis",
      "product-thinking",
      "step-goal-contract"
    ],
    artifactSkills: ["obsidian-markdown"],
    summary: "Tóm tắt yêu cầu, phạm vi ban đầu, ràng buộc và governance context mở đầu.",
    buildSections(context) {
      const sections = [
        yamlSection("## Step Contract", [
          'step_goal: ""',
          "input_summary: []",
          "output_summary: []",
          "done_when: []",
          'owner: ""'
        ]),
        yamlSection("## Governance Context", [
          'governance_ref: "project-context/project-context.md"',
          "applicable_principles: []",
          "required_reviews: []",
          "prohibited_actions: []",
          "open_governance_questions: []"
        ]),
        yamlSection("## Artifact Chính", [
          'raw_request: ""',
          'restated_request: ""',
          "request_type: FEATURE|BUG|CHANGE|REFACTOR|RESEARCH",
          'user_problem_initial: ""',
          'business_context_initial: ""',
          "scope_draft:",
          "  in: []",
          "  out: []",
          "constraints_initial: []",
          "assumptions_initial: []",
          "open_questions_initial: []",
          "dependencies_initial: []",
          "risks_initial: []",
          'notes_for_step_2: ""'
        ])
      ];

      if (context.sddMode !== "none") {
        sections.push(
          yamlSection("## SDD Traceability", [
            "requirement_refs: []",
            "acceptance_refs: []",
            "task_refs: []",
            "test_refs: []"
          ])
        );
      }

      sections.push(
        yamlSection("## Traceability", [
          "source_inputs: []",
          'next_step: ""'
        ]),
        markdownSection("## Handoff", [
          "- Điều đã rõ:",
          "- Điều còn cần theo dõi:",
          "- Điều kiện sang step 2:"
        ])
      );

      return sections;
    }
  },
  {
    stepId: "s02",
    stepSlug: "business-goal",
    title: "Business Goal",
    workflowStage: "discovery",
    contentSkills: ["codex-workflow-chain", "product-thinking", "step-goal-contract"],
    artifactSkills: ["obsidian-markdown"],
    summary: "Tóm tắt user problem, business outcome, success metric và non-goals.",
    buildSections(context) {
      const sections = [
        yamlSection("## Step Contract", [
          'step_goal: ""',
          "input_summary: []",
          "output_summary: []",
          "done_when: []",
          'owner: ""'
        ]),
        yamlSection("## Artifact Chính", [
          'user_problem: ""',
          'business_goal: ""',
          "success_metrics: []",
          "non_goals: []",
          "constraints: []",
          "assumptions: []"
        ])
      ];

      if (context.sddMode !== "none") {
        sections.push(
          yamlSection("## SDD Traceability", [
            "requirement_refs: []",
            "acceptance_refs: []",
            "task_refs: []",
            "test_refs: []"
          ])
        );
      }

      sections.push(
        yamlSection("## Traceability", [
          "upstream: []",
          'next_step: ""'
        ]),
        markdownSection("## Handoff", [
          "- User problem đã chốt:",
          "- Non-goals:",
          "- Điều kiện sang step 3:"
        ])
      );

      return sections;
    }
  },
  {
    stepId: "s03",
    stepSlug: "open-questions",
    title: "Open Questions",
    workflowStage: "discovery",
    contentSkills: [
      "codex-workflow-chain",
      "requirement-analysis",
      "step-goal-contract",
      "input-readiness-assessor",
      "step-goal-auditor"
    ],
    artifactSkills: ["obsidian-markdown"],
    summary: "Tóm tắt câu hỏi mở, missing input, conflict và readiness verdict.",
    buildSections(context) {
      const sections = [
        yamlSection("## Step Contract", [
          'step_goal: ""',
          "input_summary: []",
          "output_summary: []",
          "done_when: []",
          'owner: ""'
        ]),
        yamlSection("## Artifact Chính", [
          "open_questions: []",
          "missing_inputs: []",
          "conflicts: []",
          "assumptions: []"
        ]),
        yamlSection("## Input Readiness", [
          "status: READY|BLOCKED|PARTIAL",
          "blocking_items: []",
          "owner_actions: []"
        ]),
        yamlSection("## Audit", [
          "audit_status: PASS|FAIL|PARTIAL",
          "notes: []"
        ])
      ];

      if (context.sddMode !== "none") {
        sections.push(
          yamlSection("## SDD Traceability", [
            "requirement_refs: []",
            "acceptance_refs: []",
            "task_refs: []",
            "test_refs: []"
          ])
        );
      }

      sections.push(
        yamlSection("## Traceability", [
          "upstream: []",
          'next_step: ""'
        ]),
        markdownSection("## Handoff", [
          "- Trạng thái readiness:",
          "- Điều cần làm để sang step 4:"
        ])
      );

      return sections;
    }
  },
  {
    stepId: "s04",
    stepSlug: "acceptance-criteria",
    title: "Acceptance + DoR",
    workflowStage: "discovery",
    contentSkills: [
      "codex-workflow-chain",
      "requirement-analysis",
      "step-goal-contract",
      "definition-of-ready-gate"
    ],
    artifactSkills: ["obsidian-markdown"],
    summary: "Tóm tắt acceptance criteria, edge case, DoR và governance checks cho readiness.",
    buildSections(context) {
      const sections = [
        yamlSection("## Step Contract", [
          'step_goal: ""',
          "input_summary: []",
          "output_summary: []",
          "done_when: []",
          'owner: ""'
        ]),
        yamlSection("## Requirement Baseline", [
          "status: APPROVED|BLOCKED|PARTIAL",
          "approved_spec_refs: []",
          "decision_notes: []"
        ]),
        yamlSection("## Contract Baseline", [
          "status: NOT_APPLICABLE|APPROVED|BLOCKED|PARTIAL",
          "api_contract_refs: []",
          "ux_contract_refs: []",
          "notes: []"
        ]),
        yamlSection("## Artifact Chính", [
          "acceptance_criteria: []",
          "edge_cases: []",
          "out_of_scope: []",
          "done_when: []",
          "behavioral_invariants: []"
        ]),
        yamlSection("## Governance Checks", [
          "checklist_applied: []",
          "checks: []",
          "blocking_items: []",
          'owner: ""',
          'next_action: ""'
        ]),
        yamlSection("## Definition of Ready", [
          "status: READY|BLOCKED|PARTIAL",
          "blockers: []",
          "owners: []",
          "notes: []"
        ])
      ];

      if (context.deliveryContext === "brownfield") {
        sections.splice(3, 0, yamlSection("## Existing System Baseline", [
          "current_behavior_refs: []",
          "impacted_surfaces: []",
          "compatibility_constraints: []",
          "rollback_constraints: []"
        ]));
      }

      if (context.sddMode !== "none") {
        sections.push(
          yamlSection("## Spec Freeze", [
            "status: READY|BLOCKED|PARTIAL",
            "requirement_ids: []",
            "accepted_assumptions: []",
            "blockers: []"
          ]),
          yamlSection("## SDD Traceability", [
            "requirement_refs: []",
            "acceptance_refs: []",
            "task_refs: []",
            "test_refs: []"
          ])
        );
      }

      sections.push(
        yamlSection("## Traceability", [
          "upstream: []",
          'next_step: ""'
        ]),
        markdownSection("## Handoff", [
          "- Criteria bắt buộc:",
          "- Edge case phải giữ:",
          "- Điều kiện sang step 5:"
        ])
      );

      return sections;
    }
  },
  {
    stepId: "s05",
    stepSlug: "technical-approach",
    title: "Technical Approach",
    workflowStage: "delivery",
    contentSkills: [
      "codex-workflow-chain",
      "system-design",
      "brainstorming",
      "step-goal-contract"
    ],
    artifactSkills: ["obsidian-markdown"],
    summary: "Tóm tắt option được khuyến nghị, trade-off và boundary kỹ thuật cần giữ.",
    buildSections(context) {
      const sections = [
        yamlSection("## Step Contract", [
          'step_goal: ""',
          "input_summary: []",
          "output_summary: []",
          "done_when: []",
          'owner: ""'
        ]),
        yamlSection("## Option Analysis", [
          "options: []",
          'recommended_option: ""',
          "trade_offs: []"
        ]),
        yamlSection("## Foundation Decision", [
          "status: NOT_APPLICABLE|APPROVED|BLOCKED|PARTIAL",
          'solution_class: ""',
          "selected_stack: []",
          "selected_runtime: []",
          "decision_notes: []"
        ]),
        yamlSection("## Artifact Chính", [
          'recommended_approach: ""',
          'why: ""',
          "boundaries: []",
          "risk_notes: []"
        ]),
        yamlSection("## Architecture Details", [
          "domain_boundaries: []",
          "integration_points: []",
          "data_or_runtime_notes: []"
        ])
      ];

      if (context.deliveryContext === "brownfield") {
        sections.push(
          yamlSection("## Brownfield Impact Analysis", [
            "impacted_modules: []",
            "compatibility_risks: []",
            "migration_notes: []",
            "rollback_notes: []"
          ])
        );
      }

      sections.push(...buildExecutionContextSectionsIfNeeded("s05", context));

      if (context.sddMode !== "none") {
        sections.push(
          yamlSection("## Spec Change", [
            'change_id: "CHANGE-001"',
            "detected_in_step: s05",
            "impact_area: business|requirement|ux|technical|test|release",
            "current_spec_refs: []",
            'problem: ""',
            'proposed_change: ""',
            "decision: APPROVED|REJECTED|DEFERRED|BLOCKED",
            'decision_owner: ""',
            "updated_artifacts: []",
            "required_followups: []"
          ]),
          yamlSection("## SDD Traceability", [
            "requirement_refs: []",
            "acceptance_refs: []",
            "task_refs: []",
            "test_refs: []"
          ])
        );
      }

      sections.push(
        ...buildGovernanceExceptionSectionsIfNeeded(context),
        yamlSection("## Traceability", [
          "upstream: []",
          'next_step: ""'
        ]),
        markdownSection("## Handoff", [
          "- Recommended option:",
          "- Trade-off chấp nhận:",
          "- Điều kiện sang step 6:",
          "- Deployment note khi có:"
        ])
      );

      return sections;
    }
  },
  {
    stepId: "s06",
    stepSlug: "task-breakdown",
    title: "Task Plan",
    workflowStage: "delivery",
    contentSkills: ["codex-workflow-chain", "task-breakdown-planner", "step-goal-contract"],
    artifactSkills: ["obsidian-markdown"],
    summary: "Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.",
    buildSections(context) {
      const sections = [
        yamlSection("## Step Contract", [
          'step_goal: ""',
          "input_summary: []",
          "output_summary: []",
          "done_when: []",
          'owner: ""'
        ]),
        yamlSection("## Artifact Chính", [
          "tasks: []",
          "dependencies: []",
          "handoff_points: []"
        ]),
        markdownSection("## Verification Plan", [
          "- Check bắt buộc:",
          "- Risk note:",
          "- Rollout note nếu có:"
        ]),
        yamlSection("## Governance Checks", [
          "checklist_applied: []",
          "checks: []",
          "blocking_items: []",
          'owner: ""',
          'next_action: ""'
        ])
      ];

      if (context.deliveryContext === "brownfield") {
        sections.push(
          yamlSection("## Brownfield Delivery Plan", [
            "regression_checkpoints: []",
            "compatibility_checkpoints: []",
            "migration_or_backfill_steps: []",
            "rollback_or_restore_steps: []"
          ])
        );
      }

      sections.push(...buildExecutionContextSectionsIfNeeded("s06", context));

      if (context.sddMode !== "none") {
        sections.push(
          yamlSection("## SDD Traceability", [
            "requirement_refs: []",
            "acceptance_refs: []",
            "task_refs: []",
            "test_refs: []"
          ])
        );
      }

      sections.push(
        yamlSection("## Traceability", [
          "upstream: []",
          'next_step: ""'
        ]),
        markdownSection("## Handoff", [
          "- Task thực hiện trước:",
          "- Phụ thuộc chặn:",
          "- Điều kiện sang step 7:"
        ])
      );

      return sections;
    }
  },
  {
    stepId: "s07",
    stepSlug: "implementation",
    title: "Implement",
    workflowStage: "delivery",
    contentSkills: ["codex-workflow-chain", "implementation", "step-goal-contract"],
    artifactSkills: ["obsidian-markdown"],
    summary: "Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.",
    buildSections(context) {
      const sections = [
        yamlSection("## Step Contract", [
          'step_goal: ""',
          "input_summary: []",
          "output_summary: []",
          "done_when: []",
          'owner: ""'
        ]),
        yamlSection("## Artifact Chính", [
          "implemented_changes: []",
          "doc_changes: []",
          "operational_notes: []"
        ]),
        yamlSection("## Delivery Rule Evidence", [
          "behavior_change: YES|NO",
          "tdd_status: DONE|NOT_REQUIRED|EXCEPTION",
          "tdd_test_refs: []",
          'tdd_exception_reason: ""',
          "tdd_alternative_verify_path: []",
          "change_risk_profile: QUICK_FIX|STANDARD|LARGE_OR_RISKY",
          "worktree_status: USED|NOT_REQUIRED|SKIPPED_WITH_REASON",
          "worktree_refs: []",
          'worktree_reason: ""',
          "review_status: COMPLETED|PARTIAL|BLOCKED",
          "review_refs: []",
          "spec_compliance_status: PASS|FAIL|PARTIAL|NOT_RUN",
          "code_quality_status: PASS|FAIL|PARTIAL|NOT_RUN",
          "delegation_mode: agentic|multi_agent|subagent|sequential_multi_role",
          "independence_status: PASS|FAIL|NOT_APPLICABLE",
          "independence_refs: []",
          'merge_path: ""',
          "verify_path: []"
        ]),
        yamlSection("## Implementation Notes", [
          "framework_notes: []",
          "known_limitations: []"
        ])
      ];

      sections.push(...buildExecutionContextSectionsIfNeeded("s07", context));

      if (context.sddMode !== "none") {
        sections.push(
          yamlSection("## Spec Change", [
            'change_id: "CHANGE-001"',
            "detected_in_step: s07",
            "impact_area: business|requirement|ux|technical|test|release",
            "current_spec_refs: []",
            'problem: ""',
            'proposed_change: ""',
            "decision: APPROVED|REJECTED|DEFERRED|BLOCKED",
            'decision_owner: ""',
            "updated_artifacts: []",
            "required_followups: []"
          ]),
          yamlSection("## SDD Traceability", [
            "requirement_refs: []",
            "acceptance_refs: []",
            "task_refs: []",
            "test_refs: []"
          ])
        );
      }

      sections.push(
        ...buildGovernanceExceptionSectionsIfNeeded(context),
        yamlSection("## Traceability", [
          "upstream: []",
          'next_step: ""'
        ]),
        markdownSection("## Handoff", [
          "- Outputs actual:",
          "- Known limitations:",
          "- Notes for testing:",
          "- Notes for deployment khi có:"
        ])
      );

      return sections;
    }
  },
  {
    stepId: "s08",
    stepSlug: "verification",
    title: "Verify + DoD",
    workflowStage: "delivery",
    contentSkills: [
      "codex-workflow-chain",
      "testing",
      "code-scan-review",
      "step-goal-contract",
      "step-goal-auditor",
      "definition-of-done-gate"
    ],
    artifactSkills: ["obsidian-markdown"],
    summary: "Tóm tắt kết quả verify, governance compliance, residual risk và kết luận DoD.",
    buildSections(context) {
      const sections = [
        yamlSection("## Step Contract", [
          'step_goal: ""',
          "input_summary: []",
          "output_summary: []",
          "done_when: []",
          'owner: ""'
        ]),
        yamlSection("## Artifact Chính", [
          "verification_scope: []",
          "evidence_refs: []",
          "summary_verdict: PASS|FAIL|PARTIAL"
        ]),
        yamlSection("## Governance Checks", [
          "checklist_applied: []",
          "checks: []",
          "blocking_items: []",
          'owner: ""',
          'next_action: ""'
        ])
      ];

      sections.push(...buildExecutionContextSectionsIfNeeded("s08", context));

      if (context.sddMode !== "none") {
        sections.push(
          yamlSection("## Spec Coverage", [
            "coverage: []",
            "status: PASS|FAIL|PARTIAL|UNTESTED"
          ])
        );
      }

      sections.push(
        yamlSection("## Scan Summary", [
          "status: PASS|FAIL|PARTIAL",
          "notes: []"
        ]),
        yamlSection("## UAT Summary", [
          "status: NOT_APPLICABLE|PASS|FAIL|PARTIAL",
          "reviewers: []",
          "notes: []"
        ]),
        yamlSection("## Release Summary", [
          "status: NOT_APPLICABLE|PASS|FAIL|PARTIAL",
          "reviewers: []",
          "notes: []"
        ]),
        yamlSection("## Business Acceptance Summary", [
          "status: NOT_APPLICABLE|PASS|FAIL|PARTIAL",
          "reviewers: []",
          "notes: []"
        ]),
        ...buildGovernanceExceptionSectionsIfNeeded(context),
        yamlSection("## Audit", [
          "audit_status: PASS|FAIL|PARTIAL",
          "notes: []"
        ]),
        yamlSection("## Definition of Done", [
          "status: DONE|BLOCKED|PARTIAL",
          "residual_risks: []",
          "owners: []"
        ])
      );

      if (context.deliveryContext === "brownfield") {
        sections.splice(3, 0, yamlSection("## Regression & Compatibility Summary", [
          "regression_status: PASS|FAIL|PARTIAL",
          "compatibility_status: PASS|FAIL|PARTIAL",
          "breaking_changes: []",
          "rollback_readiness: READY|BLOCKED|PARTIAL"
        ]));
      }

      if (context.sddMode !== "none") {
        sections.push(
          yamlSection("## SDD Traceability", [
            "requirement_refs: []",
            "acceptance_refs: []",
            "task_refs: []",
            "test_refs: []"
          ])
        );
      }

      sections.push(
        yamlSection("## Traceability", [
          "upstream: []",
          'next_step: ""'
        ]),
        markdownSection("## Handoff", [
          "- Overall status:",
          "- Residual risks:",
          "- Recommendation:",
          "- Release recommendation khi có:",
          "- Next action:"
        ])
      );

      return sections;
    }
  }
];

const SECONDARY_ARTIFACTS = [
  { stepId: "s05", stepSlug: "architecture", extension: "canvas" },
  { stepId: "s06", stepSlug: "task-map", extension: "canvas" },
  { stepId: "s06", stepSlug: "task-dashboard", extension: "base" },
  { stepId: "s08", stepSlug: "verification-dashboard", extension: "base" },
  ...EXECUTION_RUNTIME_ARTIFACTS.map((artifact) => ({
    stepId: artifact.stepId,
    stepSlug: artifact.stepSlug,
    extension: artifact.extension
  }))
];

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

function buildGovernanceExceptionSectionsIfNeeded(context) {
  if (!["EXCEPTION_RECORDED", "WAIVER_APPROVED"].includes(context.governanceStatus)) {
    return [];
  }

  const lines = [
    'exception_id: "GOV-EX-001"',
    'principle_ref: ""',
    'reason: ""',
    'impact: ""',
    "mitigation: []",
    'owner: ""'
  ];

  if (context.governanceStatus === "WAIVER_APPROVED") {
    lines.push('approved_by: "REQUIRED_APPROVER"', 'review_date: "YYYY-MM-DD"');
  }

  lines.push("status: PROPOSED|APPROVED|REJECTED|RESOLVED");

  return [yamlSection("## Governance Exceptions", lines)];
}

function buildExecutionContextSectionsIfNeeded(stepId, context) {
  const sections = [];

  if (context.executionMode === "multi_agent" && ["s05", "s06", "s07"].includes(stepId)) {
    sections.push(
      yamlSection("## Execution Runtime", [
        "execution_mode: multi_agent",
        `review_mode: ${context.reviewMode}`,
        `verification_owner: "${context.verificationOwner}"`,
        "runtime_artifacts:",
        ...getRuntimeArtifactListLines(stepId, context.workItemSlug)
      ])
    );
  }

  if (stepId === "s08" && (context.executionMode === "multi_agent" || context.reviewMode !== "self")) {
    sections.push(
      yamlSection("## Review Mode", [
        `review_mode: ${context.reviewMode}`,
        `verification_owner: "${context.verificationOwner}"`,
        "expected_outputs: []",
        "fallback_mode: self|independent|auto_fix_loop"
      ])
    );
  }

  return sections;
}

function getRuntimeArtifactListLines(stepId, workItemSlug) {
  return EXECUTION_RUNTIME_ARTIFACTS
    .filter((artifact) => artifact.stepId === stepId && artifact.stepId !== "s08")
    .map((artifact) => `  - "${workItemSlug}.${artifact.stepId}.${artifact.stepSlug}.md"`);
}

function getStepDefinition(stepId) {
  return STEP_DEFINITIONS.find((definition) => definition.stepId === stepId) || null;
}

function getPrimaryArtifactEntries() {
  return STEP_DEFINITIONS.map((definition) => ({
    stepId: definition.stepId,
    stepSlug: definition.stepSlug,
    extension: "md"
  }));
}

function getAllowedArtifactEntries() {
  return [...getPrimaryArtifactEntries(), ...SECONDARY_ARTIFACTS];
}

function getAllStepIds() {
  return STEP_DEFINITIONS.map((definition) => definition.stepId);
}

function renderStepBody(definition, context) {
  let sections = definition.buildSections(context);

  if (
    ["EXCEPTION_RECORDED", "WAIVER_APPROVED"].includes(context.governanceStatus) &&
    !sections.some((section) => section.heading === "## Governance Exceptions")
  ) {
    const insertionIndex = sections.findIndex((section) => section.heading === "## Traceability");
    const exceptionSections = buildGovernanceExceptionSectionsIfNeeded(context);

    if (insertionIndex >= 0) {
      sections = [
        ...sections.slice(0, insertionIndex),
        ...exceptionSections,
        ...sections.slice(insertionIndex)
      ];
    } else {
      sections = [...sections, ...exceptionSections];
    }
  }

  const parts = [
    `# Step ${Number(definition.stepId.slice(1))} - ${definition.title}`,
    "",
    "> [!summary]",
    `> ${definition.summary}`,
    ""
  ];

  sections.forEach((section, index) => {
    parts.push(section.heading);
    if (section.language) {
      parts.push(`\`\`\`${section.language}`);
      parts.push(...section.lines);
      parts.push("```");
    } else {
      parts.push(...section.lines);
    }

    if (index < sections.length - 1) {
      parts.push("");
    }
  });

  return parts.join("\n");
}

module.exports = {
  SECONDARY_ARTIFACTS,
  STEP_DEFINITIONS,
  getAllStepIds,
  getAllowedArtifactEntries,
  getPrimaryArtifactEntries,
  getStepDefinition,
  renderStepBody
};
