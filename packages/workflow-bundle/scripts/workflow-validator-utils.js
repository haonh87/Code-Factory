const fs = require("fs");
const path = require("path");

function parseCliArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      if (Object.prototype.hasOwnProperty.call(args, key)) {
        const currentValue = args[key];
        args[key] = Array.isArray(currentValue) ? [...currentValue, true] : [currentValue, true];
      } else {
        args[key] = true;
      }
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(args, key)) {
      const currentValue = args[key];
      args[key] = Array.isArray(currentValue) ? [...currentValue, next] : [currentValue, next];
    } else {
      args[key] = next;
    }
    index += 1;
  }

  return args;
}

function resolveExistingPath(inputPath, label) {
  if (!inputPath) {
    throw new Error(`Missing required argument '${label}'.`);
  }

  const resolvedPath = path.resolve(inputPath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Path does not exist for '${label}': ${resolvedPath}`);
  }

  return resolvedPath;
}

function collectFilesRecursive(rootPath, allowedExtensions) {
  const results = [];
  const entries = fs.readdirSync(rootPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(rootPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFilesRecursive(fullPath, allowedExtensions));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (allowedExtensions.has(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }

  return results;
}

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readUtf8(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  return content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
}

function getFrontmatterLines(filePath) {
  const content = readUtf8(filePath);
  const lines = content.split(/\r?\n/);

  if (lines.length < 3 || lines[0].trim() !== "---") {
    return null;
  }

  let closingIndex = -1;
  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === "---") {
      closingIndex = index;
      break;
    }
  }

  if (closingIndex < 1) {
    return null;
  }

  return lines.slice(1, closingIndex);
}

function normalizeYamlScalar(value) {
  if (value == null) {
    return null;
  }

  const trimmed = String(value).trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function getFrontmatterValue(frontmatterLines, key) {
  const escapedKey = escapeRegExp(key);
  const pattern = new RegExp(`^${escapedKey}:\\s*(.+?)\\s*$`);

  for (const line of frontmatterLines) {
    const match = line.match(pattern);
    if (match) {
      return normalizeYamlScalar(match[1]);
    }
  }

  return null;
}

function getFrontmatterList(frontmatterLines, key) {
  const escapedKey = escapeRegExp(key);
  const inlinePattern = new RegExp(`^${escapedKey}:\\s*\\[(.*)\\]\\s*$`);
  const multilinePattern = new RegExp(`^${escapedKey}:\\s*$`);

  for (let index = 0; index < frontmatterLines.length; index += 1) {
    const line = frontmatterLines[index];

    const inlineMatch = line.match(inlinePattern);
    if (inlineMatch) {
      const inlineValue = inlineMatch[1].trim();
      if (!inlineValue) {
        return [];
      }

      return inlineValue
        .split(",")
        .map((part) => normalizeYamlScalar(part))
        .filter((part) => part);
    }

    if (multilinePattern.test(line)) {
      const items = [];

      for (let next = index + 1; next < frontmatterLines.length; next += 1) {
        const candidate = frontmatterLines[next];
        const listMatch = candidate.match(/^\s*-\s*(.+?)\s*$/);

        if (listMatch) {
          const normalized = normalizeYamlScalar(listMatch[1]);
          if (normalized) {
            items.push(normalized);
          }
          continue;
        }

        if (/^\s*$/.test(candidate) || /^\s*#/.test(candidate)) {
          continue;
        }

        break;
      }

      return items;
    }
  }

  return null;
}

function getFrontmatterNestedValue(frontmatterLines, parentKey, childKey) {
  const parentPattern = new RegExp(`^${escapeRegExp(parentKey)}:\\s*$`);
  const childPattern = new RegExp(`^\\s+${escapeRegExp(childKey)}:\\s*(.+?)\\s*$`);

  for (let index = 0; index < frontmatterLines.length; index += 1) {
    if (!parentPattern.test(frontmatterLines[index])) {
      continue;
    }

    for (let next = index + 1; next < frontmatterLines.length; next += 1) {
      const candidate = frontmatterLines[next];
      const childMatch = candidate.match(childPattern);
      if (childMatch) {
        return normalizeYamlScalar(childMatch[1]);
      }

      if (/^\S/.test(candidate)) {
        break;
      }
    }
  }

  return null;
}

function getFrontmatterNestedList(frontmatterLines, parentKey, childKey) {
  const parentPattern = new RegExp(`^${escapeRegExp(parentKey)}:\\s*$`);
  const childInlinePattern = new RegExp(`^\\s+${escapeRegExp(childKey)}:\\s*\\[(.*)\\]\\s*$`);
  const childMultilinePattern = new RegExp(`^\\s+${escapeRegExp(childKey)}:\\s*$`);

  for (let index = 0; index < frontmatterLines.length; index += 1) {
    if (!parentPattern.test(frontmatterLines[index])) {
      continue;
    }

    for (let next = index + 1; next < frontmatterLines.length; next += 1) {
      const candidate = frontmatterLines[next];

      if (/^\S/.test(candidate)) {
        break;
      }

      const inlineMatch = candidate.match(childInlinePattern);
      if (inlineMatch) {
        const inlineValue = inlineMatch[1].trim();
        if (!inlineValue) {
          return [];
        }

        return inlineValue
          .split(",")
          .map((part) => normalizeYamlScalar(part))
          .filter((part) => part);
      }

      if (!childMultilinePattern.test(candidate)) {
        continue;
      }

      const items = [];
      for (let listIndex = next + 1; listIndex < frontmatterLines.length; listIndex += 1) {
        const listCandidate = frontmatterLines[listIndex];
        const listMatch = listCandidate.match(/^\s{4,}-\s*(.+?)\s*$/);

        if (listMatch) {
          const normalized = normalizeYamlScalar(listMatch[1]);
          if (normalized) {
            items.push(normalized);
          }
          continue;
        }

        if (/^\s*$/.test(listCandidate) || /^\s*#/.test(listCandidate)) {
          continue;
        }

        break;
      }

      return items;
    }
  }

  return null;
}

function getMarkdownSectionContent(fileContent, heading) {
  const lines = fileContent.split(/\r?\n/);
  const headingTrimmed = heading.trim();
  const startIndex = lines.findIndex((line) => line.trim() === headingTrimmed);

  if (startIndex < 0) {
    return null;
  }

  const sectionLines = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^##\s+/.test(line.trim())) {
      break;
    }
    sectionLines.push(line);
  }

  return sectionLines.join("\n").trim();
}

function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function formatErrors(errors) {
  return errors.map((errorLine) => `ERROR: ${errorLine}`).join("\n");
}

module.exports = {
  collectFilesRecursive,
  ensureDirectory,
  formatErrors,
  getFrontmatterLines,
  getFrontmatterList,
  getFrontmatterNestedList,
  getFrontmatterNestedValue,
  getFrontmatterValue,
  getMarkdownSectionContent,
  normalizeYamlScalar,
  parseCliArgs,
  readUtf8,
  resolveExistingPath
};
