const fs = require("fs");
const path = require("path");
const {
  formatErrors,
  getMarkdownSectionContent,
  parseCliArgs,
  readUtf8
} = require("./workflow-validator-utils");
const {
  APPROVAL_GATE_PASSED,
  APPROVAL_STATUSES,
  BOOTSTRAP_GATE_PASSED,
  BOOTSTRAP_GATE_STATUSES,
  PROTOCOL_STATUSES,
  getWorkItemPaths,
  isAllowedProtocolTransition,
  normalizeProtocolReport,
  normalizeSingleValue,
  quoteYamlString,
  resolveWorkflowRootBase
} = require("./work-item-protocol-utils");
const { getProtocolStepGateErrors } = require("./workflow-gate-evidence-utils");

function collectWorkItemDirs(workflowRootBase) {
  if (!fs.existsSync(workflowRootBase)) {
    return [];
  }

  return fs
    .readdirSync(workflowRootBase, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      slug: entry.name,
      path: path.join(workflowRootBase, entry.name)
    }));
}

function validateProtocolBlockSync(s01Content, report, s01Path, errors) {
  const section = getMarkdownSectionContent(s01Content, "## Work Item Protocol");
  if (!section) {
    errors.push(`Missing '## Work Item Protocol' section in ${s01Path}`);
    return;
  }

  const expectedLines = [
    `protocol_status: ${report.protocol_status}`,
    `approval_status: ${report.approval_status}`,
    `review_required: ${report.review_required ? "true" : "false"}`,
    `work_item_slug: ${quoteYamlString(report.work_item_slug)}`,
    `delivery_context: ${report.delivery_context}`,
    `current_step: ${quoteYamlString(report.current_step)}`,
    `change_id: ${quoteYamlString(report.change_id)}`,
    `bootstrap_gate_status: ${report.bootstrap_gate_status}`
  ];

  expectedLines.forEach((expectedLine) => {
    if (!section.includes(expectedLine)) {
      errors.push(`Protocol block out of sync in ${s01Path}: missing '${expectedLine}'`);
    }
  });
}

function validateProtocolEvents(report, reportPath, errors) {
  if (!Array.isArray(report.protocol_events) || report.protocol_events.length === 0) {
    errors.push(`Missing protocol_events in ${reportPath}`);
    return;
  }

  report.protocol_events.forEach((event, index) => {
    const label = `${reportPath} protocol_events[${index}]`;
    if (!PROTOCOL_STATUSES.includes(event.from_status)) {
      errors.push(`Invalid from_status '${event.from_status}' in ${label}`);
    }
    if (!PROTOCOL_STATUSES.includes(event.to_status)) {
      errors.push(`Invalid to_status '${event.to_status}' in ${label}`);
    }
    if (!event.action) {
      errors.push(`Missing action in ${label}`);
    }
    if (event.from_status !== event.to_status && !isAllowedProtocolTransition(event.from_status, event.to_status)) {
      errors.push(`Illegal transition ${event.from_status} -> ${event.to_status} in ${label}`);
    }
  });

  const lastEvent = report.protocol_events[report.protocol_events.length - 1];
  if (lastEvent.from_status !== lastEvent.to_status && lastEvent.to_status !== report.protocol_status) {
    errors.push(
      `Last transition in ${reportPath} ends at '${lastEvent.to_status}' but report protocol_status is '${report.protocol_status}'`
    );
  }
}

function validateProtocolState(report, context, errors) {
  const { slug, workflowRoot, s01Path, s01Content, reportPath } = context;

  if (!PROTOCOL_STATUSES.includes(report.protocol_status)) {
    errors.push(`Invalid protocol_status '${report.protocol_status}' in ${reportPath}`);
  }

  if (!APPROVAL_STATUSES.includes(report.approval_status)) {
    errors.push(`Invalid approval_status '${report.approval_status}' in ${reportPath}`);
  }

  if (!BOOTSTRAP_GATE_STATUSES.includes(report.bootstrap_gate_status)) {
    errors.push(`Invalid bootstrap_gate_status '${report.bootstrap_gate_status}' in ${reportPath}`);
  }

  if (report.work_item_slug !== slug) {
    errors.push(`work_item_slug '${report.work_item_slug}' does not match directory '${slug}' in ${reportPath}`);
  }

  if (!report.workflow_root) {
    errors.push(`Missing workflow_root in ${reportPath}`);
  } else if (path.resolve(report.workflow_root) !== workflowRoot) {
    errors.push(`workflow_root mismatch in ${reportPath}: expected '${workflowRoot}'`);
  }

  if (!fs.existsSync(workflowRoot)) {
    errors.push(`workflow_root does not exist for ${reportPath}: ${workflowRoot}`);
  }

  if (!fs.existsSync(s01Path)) {
    errors.push(`Missing s01 note for protocol-managed work item '${slug}': ${s01Path}`);
    return;
  }

  if (report.review_required && report.approval_status === "NOT_REQUIRED") {
    errors.push(`review_required=true cannot use approval_status=NOT_REQUIRED in ${reportPath}`);
  }

  if (!report.review_required) {
    errors.push(`review_required must stay true for protocol-managed work items: ${reportPath}`);
  }

  if (report.approval_status === "NOT_REQUIRED") {
    errors.push(`approval_status=NOT_REQUIRED is not allowed for protocol-managed work items: ${reportPath}`);
  }

  if (["APPROVED", "REJECTED"].includes(report.approval_status)) {
    if (!report.reviewed_by) {
      errors.push(`approval_status=${report.approval_status} requires reviewed_by in ${reportPath}`);
    }
    if (!report.reviewed_at) {
      errors.push(`approval_status=${report.approval_status} requires reviewed_at in ${reportPath}`);
    }
  }

  if (report.delivery_context === "greenfield" && report.bootstrap_gate_status === "APPROVED") {
    if (!report.bootstrap_gate_ref) {
      errors.push(`greenfield work item requires bootstrap_gate_ref in ${reportPath}`);
    }
    if (!report.bootstrap_reviewed_by) {
      errors.push(`greenfield work item requires bootstrap_reviewed_by in ${reportPath}`);
    }
    if (!report.bootstrap_reviewed_at) {
      errors.push(`greenfield work item requires bootstrap_reviewed_at in ${reportPath}`);
    }
  }

  if (
    ["ACTIVE", "VERIFIED", "DONE", "ARCHIVED"].includes(report.protocol_status) &&
    report.review_required &&
    !APPROVAL_GATE_PASSED.has(report.approval_status)
  ) {
    errors.push(`approval gate not satisfied for protocol_status=${report.protocol_status} in ${reportPath}`);
  }

  if (report.approval_status === "REJECTED" && ["ACTIVE", "VERIFIED", "DONE", "ARCHIVED"].includes(report.protocol_status)) {
    errors.push(`Rejected work item cannot stay at protocol_status=${report.protocol_status} in ${reportPath}`);
  }

  if (
    report.delivery_context === "greenfield" &&
    ["READY_TO_MATERIALIZE", "MATERIALIZED", "ACTIVE", "VERIFIED", "DONE", "ARCHIVED"].includes(report.protocol_status) &&
    !BOOTSTRAP_GATE_PASSED.has(report.bootstrap_gate_status)
  ) {
    errors.push(`bootstrap gate not satisfied for greenfield protocol_status=${report.protocol_status} in ${reportPath}`);
  }

  if (report.protocol_status === "ACTIVE" && !report.current_step) {
    errors.push(`ACTIVE work item requires current_step in ${reportPath}`);
  }

  if (report.protocol_status === "BLOCKED" && report.blockers.length === 0) {
    errors.push(`BLOCKED work item requires blockers in ${reportPath}`);
  }

  if (report.protocol_status === "VERIFIED" && report.current_step !== "s08") {
    errors.push(`VERIFIED work item must use current_step='s08' in ${reportPath}`);
  }

  const protocolGateErrors = getProtocolStepGateErrors({
    workflowRoot,
    workItemSlug: slug,
    toStatus: report.protocol_status
  });
  protocolGateErrors.forEach((error) => {
    errors.push(`${error}: ${reportPath}`);
  });

  validateProtocolEvents(report, reportPath, errors);
  validateProtocolBlockSync(s01Content, report, s01Path, errors);
}

function validateWorkItemProtocol({ args }) {
  const projectRoot = path.resolve(normalizeSingleValue(args["project-root"] || process.cwd()));
  const workflowRootBase = resolveWorkflowRootBase(projectRoot, normalizeSingleValue(args["workflow-root"] || ""));
  const workItemDirs = collectWorkItemDirs(workflowRootBase);
  const errors = [];
  let validatedCount = 0;
  let skippedLegacyCount = 0;

  workItemDirs.forEach((entry) => {
    const paths = getWorkItemPaths({
      projectRoot,
      workflowRootBase,
      workItemSlug: entry.slug
    });
    const hasReport = fs.existsSync(paths.reportPath);
    const hasS01 = fs.existsSync(paths.s01Path);
    const s01Content = hasS01 ? readUtf8(paths.s01Path) : "";
    const hasProtocolBlock = hasS01 && s01Content.includes("## Work Item Protocol");

    if (!hasReport) {
      if (hasProtocolBlock) {
        errors.push(`Missing work-item report for protocol-managed work item '${entry.slug}': ${paths.reportPath}`);
      } else {
        skippedLegacyCount += 1;
      }
      return;
    }

    let rawReport;
    try {
      rawReport = JSON.parse(readUtf8(paths.reportPath));
    } catch (error) {
      errors.push(`Invalid JSON in ${paths.reportPath}: ${error.message}`);
      return;
    }

    const report = normalizeProtocolReport(rawReport);
    validateProtocolState(report, {
      slug: entry.slug,
      workflowRoot: paths.workflowRoot,
      s01Path: paths.s01Path,
      s01Content,
      reportPath: paths.reportPath
    }, errors);
    validatedCount += 1;
  });

  if (errors.length > 0) {
    throw new Error(formatErrors(errors));
  }

  return {
    validatedCount,
    skippedLegacyCount,
    workflowRootBase
  };
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  try {
    const result = validateWorkItemProtocol({ args });
    console.log(
      `OK: validated ${result.validatedCount} protocol-managed work items under ${result.workflowRootBase} (skipped legacy: ${result.skippedLegacyCount})`
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  validateWorkItemProtocol
};
