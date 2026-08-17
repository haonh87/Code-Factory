const crypto = require("crypto");

const LAYOUT = Object.freeze({
  canvasPadding: 40,
  domainY: 100,
  domainWidth: 300,
  domainGap: 100,
  domainHeader: 32,
  domainPaddingX: 40,
  domainPaddingTop: 60,
  domainPaddingBottom: 40,
  systemWidth: 220,
  systemHeight: 70,
  systemGapY: 30,
  outsideLane: 20,
  corridorStartY: 70,
  corridorGapY: 10
});
const MAX_ENGINEERING_ELEMENTS = 25;

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function modelDigest(input) {
  return crypto.createHash("sha256").update(stableStringify(input)).digest("hex");
}

function assertModelShape(input) {
  const model = input && input.architecture_model;
  if (!model || !Array.isArray(model.elements) || model.elements.length === 0) {
    throw new Error("architecture_model.elements must be a non-empty array.");
  }
  if (!Array.isArray(model.relationships)) {
    throw new Error("architecture_model.relationships must be an array.");
  }
  if (model.elements.length > MAX_ENGINEERING_ELEMENTS) {
    throw new Error(`architecture_model.elements supports at most ${MAX_ENGINEERING_ELEMENTS} engineering elements.`);
  }

  const elementIds = new Set();
  model.elements.forEach((element) => {
    if (!element.system_id) {
      throw new Error("Every element requires system_id.");
    }
    if (elementIds.has(element.system_id)) {
      throw new Error(`Duplicate system_id '${element.system_id}'.`);
    }
    elementIds.add(element.system_id);
    if (!element.boundary_id || !element.domain) {
      throw new Error(`Element '${element.system_id}' requires boundary_id and domain.`);
    }
  });

  const relationshipIds = new Set();
  model.relationships.forEach((relationship) => {
    if (!relationship.integration_id) {
      throw new Error("Every relationship requires integration_id.");
    }
    if (relationshipIds.has(relationship.integration_id)) {
      throw new Error(`Duplicate integration_id '${relationship.integration_id}'.`);
    }
    relationshipIds.add(relationship.integration_id);
    if (!elementIds.has(relationship.from_system_id) || !elementIds.has(relationship.to_system_id)) {
      throw new Error(`Relationship '${relationship.integration_id}' references an unknown endpoint.`);
    }
  });
}

function rectanglesOverlap(first, second) {
  return (
    first.x < second.x + second.width &&
    first.x + first.width > second.x &&
    first.y < second.y + second.height &&
    first.y + first.height > second.y
  );
}

function isContained(child, parent) {
  return (
    child.x >= parent.x &&
    child.y >= parent.y + LAYOUT.domainHeader &&
    child.x + child.width <= parent.x + parent.width &&
    child.y + child.height <= parent.y + parent.height
  );
}

function segmentIntersectsRectangle(first, second, rectangle) {
  if (first.y === second.y) {
    const minX = Math.min(first.x, second.x);
    const maxX = Math.max(first.x, second.x);
    return (
      first.y > rectangle.y &&
      first.y < rectangle.y + rectangle.height &&
      maxX > rectangle.x &&
      minX < rectangle.x + rectangle.width
    );
  }
  if (first.x === second.x) {
    const minY = Math.min(first.y, second.y);
    const maxY = Math.max(first.y, second.y);
    return (
      first.x > rectangle.x &&
      first.x < rectangle.x + rectangle.width &&
      maxY > rectangle.y &&
      minY < rectangle.y + rectangle.height
    );
  }
  throw new Error(`Only orthogonal segments are supported: ${JSON.stringify({ first, second })}`);
}

function buildDomains(elements) {
  const grouped = new Map();
  elements.forEach((element) => {
    const existing = grouped.get(element.boundary_id);
    if (existing && existing.name !== element.domain) {
      throw new Error(`Boundary '${element.boundary_id}' has conflicting domain names.`);
    }
    if (!existing) {
      grouped.set(element.boundary_id, { boundaryId: element.boundary_id, name: element.domain, elements: [] });
    }
    grouped.get(element.boundary_id).elements.push(element);
  });

  return [...grouped.values()]
    .sort((first, second) => first.boundaryId.localeCompare(second.boundaryId))
    .map((domain, index) => {
      domain.elements.sort((first, second) => first.system_id.localeCompare(second.system_id));
      const height =
        LAYOUT.domainPaddingTop +
        domain.elements.length * LAYOUT.systemHeight +
        Math.max(0, domain.elements.length - 1) * LAYOUT.systemGapY +
        LAYOUT.domainPaddingBottom;
      return {
        ...domain,
        x: LAYOUT.canvasPadding + index * (LAYOUT.domainWidth + LAYOUT.domainGap),
        y: LAYOUT.domainY,
        width: LAYOUT.domainWidth,
        height
      };
    });
}

function buildNodes(domains) {
  const nodes = [];
  domains.forEach((domain) => {
    domain.elements.forEach((element, index) => {
      const localX = LAYOUT.domainPaddingX;
      const localY = LAYOUT.domainPaddingTop + index * (LAYOUT.systemHeight + LAYOUT.systemGapY);
      nodes.push({
        ...element,
        domain,
        localX,
        localY,
        x: domain.x + localX,
        y: domain.y + localY,
        width: LAYOUT.systemWidth,
        height: LAYOUT.systemHeight
      });
    });
  });
  return nodes;
}

function nodeCenterY(node) {
  return node.y + node.height / 2;
}

function buildEdges(relationships, nodeById) {
  return [...relationships]
    .sort((first, second) => first.integration_id.localeCompare(second.integration_id))
    .map((relationship, index) => {
      const source = nodeById.get(relationship.from_system_id);
      const target = nodeById.get(relationship.to_system_id);
      const sameDomain = source.domain.boundaryId === target.domain.boundaryId;
      const travelsRight = source.domain.x < target.domain.x;
      const sourceY = nodeCenterY(source);
      const targetY = nodeCenterY(target);
      let sourceAnchor;
      let targetAnchor;
      let waypoints;

      if (sameDomain) {
        const laneX = source.domain.x + source.domain.width - LAYOUT.outsideLane;
        sourceAnchor = { x: source.x + source.width, y: sourceY };
        targetAnchor = { x: target.x + target.width, y: targetY };
        waypoints = [
          { x: laneX, y: sourceY },
          { x: laneX, y: targetY }
        ];
      } else {
        const sourceSideX = travelsRight ? source.x + source.width : source.x;
        const targetSideX = travelsRight ? target.x : target.x + target.width;
        const sourceOuterX = travelsRight
          ? source.domain.x + source.domain.width + LAYOUT.outsideLane
          : source.domain.x - LAYOUT.outsideLane;
        const targetOuterX = travelsRight
          ? target.domain.x - LAYOUT.outsideLane
          : target.domain.x + target.domain.width + LAYOUT.outsideLane;
        const corridorY = LAYOUT.corridorStartY - index * LAYOUT.corridorGapY;
        sourceAnchor = { x: sourceSideX, y: sourceY };
        targetAnchor = { x: targetSideX, y: targetY };
        waypoints = [
          { x: sourceOuterX, y: sourceY },
          { x: sourceOuterX, y: corridorY },
          { x: targetOuterX, y: corridorY },
          { x: targetOuterX, y: targetY }
        ];
      }

      return {
        ...relationship,
        source,
        target,
        waypoints,
        path: [sourceAnchor, ...waypoints, targetAnchor]
      };
    });
}

function computeMetrics({ domains, nodes, edges }) {
  let overlapCount = 0;
  for (let first = 0; first < domains.length; first += 1) {
    for (let second = first + 1; second < domains.length; second += 1) {
      if (rectanglesOverlap(domains[first], domains[second])) overlapCount += 1;
    }
  }
  for (let first = 0; first < nodes.length; first += 1) {
    for (let second = first + 1; second < nodes.length; second += 1) {
      if (rectanglesOverlap(nodes[first], nodes[second])) overlapCount += 1;
    }
  }

  const containmentErrorCount = nodes.filter((node) => !isContained(node, node.domain)).length;
  let intersectionCount = 0;
  edges.forEach((edge) => {
    for (let index = 0; index < edge.path.length - 1; index += 1) {
      nodes.forEach((node) => {
        if (node.system_id === edge.source.system_id || node.system_id === edge.target.system_id) return;
        if (segmentIntersectsRectangle(edge.path[index], edge.path[index + 1], node)) intersectionCount += 1;
      });
    }
  });

  const namedOwners = nodes.filter((node) => String(node.owner || "").trim()).length;
  const namedOwnershipRate = nodes.length === 0 ? 0 : namedOwners / nodes.length;
  const vagueAggregateBoxCount = nodes.filter((node) =>
    /^(?:integration layer|middleware|platform)$/i.test(String(node.name || "").trim())
  ).length;
  const deleteTestFailureCount = nodes.filter((node) => !String(node.decision_impact || "").trim()).length;
  const unanalyzedTwoWayArrowCount = edges.filter((edge) => edge.direction !== "DIRECTED").length;

  return {
    named_ownership_rate: namedOwnershipRate,
    overlap_count: overlapCount,
    non_endpoint_intersection_count: intersectionCount,
    unanalyzed_two_way_arrow_count: unanalyzedTwoWayArrowCount,
    vague_aggregate_box_count: vagueAggregateBoxCount,
    engineering_element_count: nodes.length,
    delete_test_failure_count: deleteTestFailureCount,
    containment_error_count: containmentErrorCount
  };
}

function metricsPass(metrics) {
  return (
    metrics.named_ownership_rate === 1 &&
    metrics.overlap_count === 0 &&
    metrics.non_endpoint_intersection_count === 0 &&
    metrics.unanalyzed_two_way_arrow_count === 0 &&
    metrics.vague_aggregate_box_count === 0 &&
    metrics.engineering_element_count <= MAX_ENGINEERING_ELEMENTS &&
    metrics.delete_test_failure_count === 0 &&
    metrics.containment_error_count === 0
  );
}

function buildLayout(input) {
  assertModelShape(input);
  const model = input.architecture_model;
  const domains = buildDomains(model.elements);
  const nodes = buildNodes(domains);
  const nodeById = new Map(nodes.map((node) => [node.system_id, node]));
  const edges = buildEdges(model.relationships, nodeById);
  const metrics = computeMetrics({ domains, nodes, edges });
  const maxDomainBottom = Math.max(...domains.map((domain) => domain.y + domain.height));
  const maxDomainRight = Math.max(...domains.map((domain) => domain.x + domain.width));
  return {
    domains,
    nodes,
    edges,
    metrics,
    automatedStatus: metricsPass(metrics) ? "PASS" : "FAIL",
    canvas: {
      width: maxDomainRight + LAYOUT.canvasPadding,
      height: maxDomainBottom + LAYOUT.canvasPadding
    },
    modelDigest: modelDigest(model)
  };
}

module.exports = {
  LAYOUT,
  MAX_ENGINEERING_ELEMENTS,
  buildLayout,
  computeMetrics,
  metricsPass,
  modelDigest,
  stableStringify
};
